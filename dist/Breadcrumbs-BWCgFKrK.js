import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./InlinePopover-CPu3gKSr.js";
import { useRef as n, useState as r } from "react";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/shared/Breadcrumbs.tsx
var s = {
	sm: "text-xs",
	md: "text-sm"
};
function c({ item: t, isLast: n, block: r = !1, afterActivate: i, size: o = "md" }) {
	let c = (e) => {
		t.onClick?.(e), i?.();
	}, l = e(s[o], "leading-snug transition-colors duration-100", n ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal", !r && "block min-w-0 truncate", r && "block w-full px-3 py-1.5 rounded-sm hover:bg-[var(--color-surface-hover)]");
	return n || !t.href && !t.onClick ? /* @__PURE__ */ a("span", {
		title: t.label,
		className: l,
		"aria-current": n ? "page" : void 0,
		children: t.label
	}) : t.href ? /* @__PURE__ */ a("a", {
		title: t.label,
		href: t.href,
		onClick: c,
		className: e(l, "no-underline"),
		children: t.label
	}) : /* @__PURE__ */ a("button", {
		"data-ui-part": "",
		type: "button",
		title: t.label,
		onClick: c,
		className: e(l, "border-none bg-transparent cursor-pointer font-[inherit] p-0", r && "text-left px-3 py-1.5"),
		children: t.label
	});
}
function l(e, t) {
	if (e.length <= t) return e;
	let n = e.slice(0, 1), r = e.slice(-(t - 2 > 0 ? t - 2 : 1));
	return [
		...n,
		null,
		...r
	];
}
function u(e, t) {
	let n = t - 2 > 0 ? t - 2 : 1;
	return e.slice(1, e.length - n);
}
function d({ items: l, size: u }) {
	let [d, f] = r(!1), p = n(null);
	return /* @__PURE__ */ o(i, { children: [/* @__PURE__ */ a("button", {
		"data-ui-part": "",
		ref: p,
		type: "button",
		"aria-label": "Show hidden breadcrumbs",
		"aria-expanded": d,
		"aria-haspopup": "true",
		onClick: () => f((e) => !e),
		className: e(s[u], "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] border-none bg-transparent cursor-pointer px-1 py-0 rounded-sm leading-snug"),
		children: "…"
	}), /* @__PURE__ */ a(t, {
		trigger: p,
		open: d,
		onClose: () => f(!1),
		"aria-label": "Hidden breadcrumbs",
		"data-testid": "breadcrumb-overflow",
		className: "min-w-[160px] py-1",
		children: /* @__PURE__ */ a("ol", {
			className: "list-none m-0 p-0",
			children: l.map((e, t) => /* @__PURE__ */ a("li", { children: /* @__PURE__ */ a(c, {
				item: e,
				isLast: !1,
				block: !0,
				size: u,
				afterActivate: () => f(!1)
			}) }, `${e.label}-${t}`))
		})
	})] });
}
function f({ items: t, "aria-label": n = "Breadcrumb", separator: r = "/", maxItems: i = 4, overflow: f = "ellipsis", minItems: p, lastIsCurrent: m = !0, size: h = "md", className: g, "data-testid": _ }) {
	if (t.length === 0 || p != null && t.length < p) return null;
	let v = i == null ? t : l(t, i), y = i == null ? [] : u(t, i);
	return /* @__PURE__ */ a("nav", {
		"aria-label": n,
		"data-testid": _,
		"data-ui-breadcrumbs": "",
		className: e("flex min-w-0 max-w-full items-center overflow-hidden", g),
		children: /* @__PURE__ */ a("ol", {
			className: "flex min-w-0 max-w-full items-center gap-1 list-none m-0 p-0",
			children: v.map((t, n) => {
				let i = n === v.length - 1, l = t === null;
				return /* @__PURE__ */ o("li", {
					className: e("flex min-w-0 items-center gap-1", i ? "flex-1" : "shrink-[2]"),
					children: [l ? f === "menu" && y.length > 0 ? /* @__PURE__ */ a(d, {
						items: y,
						size: h
					}) : /* @__PURE__ */ a("span", {
						className: e(s[h], "text-[var(--color-text-tertiary)] select-none"),
						"aria-label": "More items",
						title: "Some items are hidden",
						children: "…"
					}) : /* @__PURE__ */ a(c, {
						item: t,
						isLast: i && m,
						size: h
					}), !i && /* @__PURE__ */ a("span", {
						className: e("shrink-0 text-[var(--color-text-tertiary)] select-none", s[h]),
						"aria-hidden": "true",
						children: r
					})]
				}, n);
			})
		})
	});
}
//#endregion
export { f as t };
