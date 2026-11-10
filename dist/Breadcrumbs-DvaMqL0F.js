import { d as e } from "./Button-DQoeE5dN.js";
import { n as t } from "./safeHref-CSAycLWi.js";
import { t as n } from "./InlinePopover-qnf51Wbc.js";
import { useRef as r, useState as i } from "react";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/components/shared/Breadcrumbs.tsx
var c = {
	sm: "text-xs",
	md: "text-sm"
};
function l({ item: n, isLast: r, block: i = !1, afterActivate: a, size: s = "md" }) {
	let l = (e) => {
		n.onClick?.(e), a?.();
	}, u = e(c[s], "leading-snug transition-colors duration-100", r ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal", !i && "block min-w-0 truncate", i && "block w-full px-3 py-1.5 rounded-sm hover:bg-[var(--color-surface-hover)]");
	return r || !n.href && !n.onClick ? /* @__PURE__ */ o("span", {
		title: n.label,
		className: u,
		"aria-current": r ? "page" : void 0,
		children: n.label
	}) : n.href ? /* @__PURE__ */ o("a", {
		title: n.label,
		href: t(n.href) ?? void 0,
		onClick: l,
		className: e(u, "no-underline"),
		children: n.label
	}) : /* @__PURE__ */ o("button", {
		"data-ui-part": "",
		type: "button",
		title: n.label,
		onClick: l,
		className: e(u, "border-none bg-transparent cursor-pointer font-[inherit] p-0", i && "text-left px-3 py-1.5"),
		children: n.label
	});
}
function u(e, t) {
	if (e.length <= t) return e;
	let n = e.slice(0, 1), r = e.slice(-(t - 2 > 0 ? t - 2 : 1));
	return [
		...n,
		null,
		...r
	];
}
function d(e, t) {
	let n = t - 2 > 0 ? t - 2 : 1;
	return e.slice(1, e.length - n);
}
function f({ items: t, size: u }) {
	let [d, f] = i(!1), p = r(null);
	return /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o("button", {
		"data-ui-part": "",
		ref: p,
		type: "button",
		"aria-label": "Show hidden breadcrumbs",
		"aria-expanded": d,
		"aria-haspopup": "true",
		onClick: () => f((e) => !e),
		className: e(c[u], "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] border-none bg-transparent cursor-pointer px-1 py-0 rounded-sm leading-snug"),
		children: "…"
	}), /* @__PURE__ */ o(n, {
		trigger: p,
		open: d,
		onClose: () => f(!1),
		"aria-label": "Hidden breadcrumbs",
		"data-testid": "breadcrumb-overflow",
		className: "min-w-[160px] py-1",
		children: /* @__PURE__ */ o("ol", {
			className: "list-none m-0 p-0",
			children: t.map((e, t) => /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(l, {
				item: e,
				isLast: !1,
				block: !0,
				size: u,
				afterActivate: () => f(!1)
			}) }, `${e.label}-${t}`))
		})
	})] });
}
function p({ items: t, "aria-label": n = "Breadcrumb", separator: r = "/", maxItems: i = 4, overflow: a = "ellipsis", minItems: p, lastIsCurrent: m = !0, size: h = "md", className: g, "data-testid": _ }) {
	if (t.length === 0 || p != null && t.length < p) return null;
	let v = i == null ? t : u(t, i), y = i == null ? [] : d(t, i);
	return /* @__PURE__ */ o("nav", {
		"aria-label": n,
		"data-testid": _,
		"data-ui-breadcrumbs": "",
		className: e("flex min-w-0 max-w-full items-center overflow-hidden", g),
		children: /* @__PURE__ */ o("ol", {
			className: "flex min-w-0 max-w-full items-center gap-1 list-none m-0 p-0",
			children: v.map((t, n) => {
				let i = n === v.length - 1, u = t === null;
				return /* @__PURE__ */ s("li", {
					className: e("flex min-w-0 items-center gap-1", i ? "flex-1" : "shrink-[2]"),
					children: [u ? a === "menu" && y.length > 0 ? /* @__PURE__ */ o(f, {
						items: y,
						size: h
					}) : /* @__PURE__ */ o("span", {
						className: e(c[h], "text-[var(--color-text-tertiary)] select-none"),
						"aria-label": "More items",
						title: "Some items are hidden",
						children: "…"
					}) : /* @__PURE__ */ o(l, {
						item: t,
						isLast: i && m,
						size: h
					}), !i && /* @__PURE__ */ o("span", {
						className: e("shrink-0 text-[var(--color-text-tertiary)] select-none", c[h]),
						"aria-hidden": "true",
						children: r
					})]
				}, n);
			})
		})
	});
}
//#endregion
export { p as t };
