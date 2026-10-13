import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./Input-DE3zl--S.js";
import { t as n } from "./InlinePopover-MVLSEiUg.js";
import { forwardRef as r, useCallback as i, useRef as a, useState as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/components/shared/Breadcrumbs.tsx
var u = {
	sm: "text-xs",
	md: "text-sm"
};
function d({ item: t, isLast: n, block: r = !1, afterActivate: i, size: a = "md" }) {
	let o = (e) => {
		t.onClick?.(e), i?.();
	}, s = e(u[a], "leading-snug transition-colors duration-100", n ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal", r && "block w-full px-3 py-1.5 rounded-sm hover:bg-[var(--color-surface-hover)]");
	return n || !t.href && !t.onClick ? /* @__PURE__ */ c("span", {
		className: s,
		"aria-current": n ? "page" : void 0,
		children: t.label
	}) : t.href ? /* @__PURE__ */ c("a", {
		href: t.href,
		onClick: o,
		className: e(s, "no-underline"),
		children: t.label
	}) : /* @__PURE__ */ c("button", {
		type: "button",
		onClick: o,
		className: e(s, "border-none bg-transparent cursor-pointer font-[inherit] p-0", r && "text-left px-3 py-1.5"),
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
function m({ items: t, size: r }) {
	let [i, f] = o(!1), p = a(null);
	return /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c("button", {
		ref: p,
		type: "button",
		"aria-label": "Show hidden breadcrumbs",
		"aria-expanded": i,
		"aria-haspopup": "true",
		onClick: () => f((e) => !e),
		className: e(u[r], "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] border-none bg-transparent cursor-pointer px-1 py-0 rounded-sm leading-snug"),
		children: "…"
	}), /* @__PURE__ */ c(n, {
		trigger: p,
		open: i,
		onClose: () => f(!1),
		"aria-label": "Hidden breadcrumbs",
		"data-testid": "breadcrumb-overflow",
		className: "min-w-[160px] py-1",
		children: /* @__PURE__ */ c("ol", {
			className: "list-none m-0 p-0",
			children: t.map((e, t) => /* @__PURE__ */ c("li", { children: /* @__PURE__ */ c(d, {
				item: e,
				isLast: !1,
				block: !0,
				size: r,
				afterActivate: () => f(!1)
			}) }, `${e.label}-${t}`))
		})
	})] });
}
function h({ items: t, separator: n = "/", maxItems: r, overflow: i = "ellipsis", minItems: a, lastIsCurrent: o = !0, size: s = "md", className: h, "data-testid": g }) {
	if (t.length === 0 || a != null && t.length < a) return null;
	let _ = r == null ? t : f(t, r), v = r == null ? [] : p(t, r);
	return /* @__PURE__ */ c("nav", {
		"aria-label": "Breadcrumb",
		"data-testid": g,
		className: e("flex items-center", h),
		children: /* @__PURE__ */ c("ol", {
			className: "flex items-center gap-1 flex-wrap list-none m-0 p-0",
			children: _.map((t, r) => {
				let a = r === _.length - 1;
				return /* @__PURE__ */ l("li", {
					className: "flex items-center gap-1",
					children: [t === null ? i === "menu" && v.length > 0 ? /* @__PURE__ */ c(m, {
						items: v,
						size: s
					}) : /* @__PURE__ */ c("span", {
						className: e(u[s], "text-[var(--color-text-tertiary)] select-none"),
						"aria-label": "More items",
						title: "Some items are hidden",
						children: "…"
					}) : /* @__PURE__ */ c(d, {
						item: t,
						isLast: a && o,
						size: s
					}), !a && /* @__PURE__ */ c("span", {
						className: e("text-[var(--color-text-tertiary)] select-none", u[s]),
						"aria-hidden": "true",
						children: n
					})]
				}, r);
			})
		})
	});
}
//#endregion
//#region src/components/forms/NumberInput.tsx
var g = r(function({ value: e, onChange: n, onClear: r, min: a, max: o, step: s, unit: l, placeholder: u, invalid: d = !1, disabled: f = !1, size: p = "md", id: m, name: h, required: g, "aria-label": _, "aria-labelledby": v, "aria-describedby": y, "aria-invalid": b, "aria-required": x, "data-testid": S }, C) {
	let w = i((e) => {
		let t = e;
		return a !== void 0 && t < a && (t = a), o !== void 0 && t > o && (t = o), t;
	}, [a, o]), T = i((e) => {
		let t = e.target.value;
		if (t === "" && r) {
			r();
			return;
		}
		let i = parseFloat(t);
		Number.isNaN(i) || n(i);
	}, [n, r]), E = i((e) => {
		let t = parseFloat(e.target.value);
		if (!Number.isNaN(t)) {
			let e = w(t);
			e !== t && n(e);
		}
	}, [w, n]);
	return /* @__PURE__ */ c(t, {
		ref: C,
		type: "number",
		size: p,
		value: e ?? "",
		min: a,
		max: o,
		step: s,
		placeholder: u,
		invalid: d,
		disabled: f,
		suffix: l ? /* @__PURE__ */ c("span", {
			className: "text-text-tertiary font-sans text-[12px] select-none",
			children: l
		}) : void 0,
		id: m,
		name: h,
		required: g,
		"aria-label": _,
		"aria-labelledby": v,
		"aria-describedby": y,
		"aria-invalid": b,
		"aria-required": x,
		"data-testid": S,
		onChange: T,
		onBlur: E
	});
});
//#endregion
export { h as n, g as t };
