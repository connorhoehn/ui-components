import { t as e } from "./cn-DhjIN-s0.js";
import { F as t, L as n, R as r, d as i, h as a } from "./DropdownMenu-DKjyJHNc.js";
import { t as o } from "./Stack-CkiMw5K0.js";
import { t as s } from "./InlinePopover-sx7SpM1v.js";
import { Children as c, useRef as l, useState as u } from "react";
import { Fragment as d, jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/components/ui/SelectableCard.tsx
var m = {
	sm: "p-3",
	md: "p-4",
	lg: "p-6"
};
function h({ children: t, selected: n = !1, onSelect: r, padding: i = "sm", disabled: a = !1, className: o, ...s }) {
	return /* @__PURE__ */ f("button", {
		type: "button",
		"aria-pressed": n,
		disabled: a,
		onClick: r,
		className: e("block w-full text-left font-inherit rounded-lg border transition-colors duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", m[i], n ? "border-primary bg-surface-hover" : "border-border bg-surface hover:border-border-emphasis", a ? "opacity-50 cursor-not-allowed" : "cursor-pointer", o),
		...s,
		children: t
	});
}
//#endregion
//#region src/components/shared/Breadcrumbs.tsx
function g({ item: t, isLast: n, block: r = !1, afterActivate: i }) {
	let a = (e) => {
		t.onClick?.(e), i?.();
	}, o = e("text-sm leading-snug transition-colors duration-100", n ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal", r && "block w-full px-3 py-1.5 rounded-sm hover:bg-[var(--color-surface-hover)]");
	return n || !t.href && !t.onClick ? /* @__PURE__ */ f("span", {
		className: o,
		"aria-current": n ? "page" : void 0,
		children: t.label
	}) : t.href ? /* @__PURE__ */ f("a", {
		href: t.href,
		onClick: a,
		className: e(o, "no-underline"),
		children: t.label
	}) : /* @__PURE__ */ f("button", {
		type: "button",
		onClick: a,
		className: e(o, "border-none bg-transparent cursor-pointer font-[inherit] p-0", r && "text-left px-3 py-1.5"),
		children: t.label
	});
}
function _(e, t) {
	if (e.length <= t) return e;
	let n = e.slice(0, 1), r = e.slice(-(t - 2 > 0 ? t - 2 : 1));
	return [
		...n,
		null,
		...r
	];
}
function v(e, t) {
	let n = t - 2 > 0 ? t - 2 : 1;
	return e.slice(1, e.length - n);
}
function y({ items: e }) {
	let [t, n] = u(!1), r = l(null);
	return /* @__PURE__ */ p(d, { children: [/* @__PURE__ */ f("button", {
		ref: r,
		type: "button",
		"aria-label": "Show hidden breadcrumbs",
		"aria-expanded": t,
		"aria-haspopup": "true",
		onClick: () => n((e) => !e),
		className: "text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] border-none bg-transparent cursor-pointer px-1 py-0 rounded-sm leading-snug",
		children: "…"
	}), /* @__PURE__ */ f(s, {
		trigger: r,
		open: t,
		onClose: () => n(!1),
		"aria-label": "Hidden breadcrumbs",
		"data-testid": "breadcrumb-overflow",
		className: "min-w-[160px] py-1",
		children: /* @__PURE__ */ f("ol", {
			className: "list-none m-0 p-0",
			children: e.map((e, t) => /* @__PURE__ */ f("li", { children: /* @__PURE__ */ f(g, {
				item: e,
				isLast: !1,
				block: !0,
				afterActivate: () => n(!1)
			}) }, `${e.label}-${t}`))
		})
	})] });
}
function b({ items: t, separator: n = "/", maxItems: r, overflow: i = "ellipsis", minItems: a, className: o, "data-testid": s }) {
	if (t.length === 0 || a != null && t.length < a) return null;
	let c = r == null ? t : _(t, r), l = r == null ? [] : v(t, r);
	return /* @__PURE__ */ f("nav", {
		"aria-label": "Breadcrumb",
		"data-testid": s,
		className: e("flex items-center", o),
		children: /* @__PURE__ */ f("ol", {
			className: "flex items-center gap-1 flex-wrap list-none m-0 p-0",
			children: c.map((e, t) => {
				let r = t === c.length - 1;
				return /* @__PURE__ */ p("li", {
					className: "flex items-center gap-1",
					children: [e === null ? i === "menu" && l.length > 0 ? /* @__PURE__ */ f(y, { items: l }) : /* @__PURE__ */ f("span", {
						className: "text-sm text-[var(--color-text-tertiary)] select-none",
						"aria-label": "More items",
						title: "Some items are hidden",
						children: "…"
					}) : /* @__PURE__ */ f(g, {
						item: e,
						isLast: r
					}), !r && /* @__PURE__ */ f("span", {
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
var x = {
	xs: "text-[11px]",
	sm: "text-[12px]"
}, S = {
	tertiary: "text-text-tertiary",
	secondary: "text-text-secondary"
};
function C(e) {
	return e == null || e === !1 || e === !0 ? !1 : typeof e == "string" ? e.trim() !== "" : !Array.isArray(e) || c.toArray(e).some(C);
}
function w({ items: t, separator: n = "·", size: r = "xs", tone: i = "tertiary", className: a, "data-testid": o }) {
	let s = t.filter(C);
	return s.length === 0 ? null : /* @__PURE__ */ f("div", {
		className: e("flex flex-wrap items-center gap-x-1.5 gap-y-0.5", x[r], S[i], a),
		"data-testid": o,
		children: s.map((e, t) => /* @__PURE__ */ p("span", {
			className: "flex items-center gap-1.5",
			children: [t > 0 ? /* @__PURE__ */ f("span", {
				"aria-hidden": "true",
				children: n
			}) : null, e]
		}, t))
	});
}
//#endregion
//#region src/components/shared/FileKindMark.tsx
var T = {
	page: "Page",
	presentation: "Presentation",
	recording: "Recording",
	transcript: "Transcript",
	diagram: "Diagram",
	folder: "Folder"
}, E = {
	page: "bg-info-bg text-info-fg",
	presentation: "bg-accent-bg text-accent-fg",
	recording: "bg-danger-bg text-danger-fg",
	transcript: "bg-warning-bg text-warning-fg",
	diagram: "bg-success-bg text-success-fg",
	folder: "bg-surface-hover text-text-secondary"
}, D = {
	sm: "h-[18px] w-[18px] rounded",
	md: "h-[22px] w-[22px] rounded-[5px]",
	lg: "h-7 w-7 rounded-md"
}, O = {
	sm: 12,
	md: 14,
	lg: 16
};
function k({ size: e }) {
	return /* @__PURE__ */ p("svg", {
		width: e,
		height: e,
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.5,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ f("rect", {
			x: "2",
			y: "3",
			width: "12",
			height: "8.5",
			rx: "1"
		}), /* @__PURE__ */ f("path", { d: "M4.5 6h5M4.5 8.5h3M8 11.5V14M6 14h4" })]
	});
}
function A({ kind: o, size: s = "md", label: c, className: l, "data-testid": u = "file-kind-mark" }) {
	let d = O[s], p = {
		page: /* @__PURE__ */ f(i, { size: d }),
		presentation: /* @__PURE__ */ f(k, { size: d }),
		recording: /* @__PURE__ */ f(n, { size: d }),
		transcript: /* @__PURE__ */ f(t, { size: d }),
		diagram: /* @__PURE__ */ f(r, { size: d }),
		folder: /* @__PURE__ */ f(a, { size: d })
	}[o];
	return /* @__PURE__ */ f("span", {
		"data-testid": u,
		"data-kind": o,
		...c ? {
			role: "img",
			"aria-label": c
		} : { "aria-hidden": !0 },
		className: e("inline-grid shrink-0 place-items-center", D[s], E[o], l),
		children: p
	});
}
//#endregion
//#region src/components/shared/Text.tsx
function j({ as: e = "span", className: t, title: n, children: r, wrap: i = !1, ...a }) {
	return /* @__PURE__ */ f(o, {
		as: e,
		gap: "none",
		wrap: i,
		className: t,
		title: n,
		...a,
		children: r
	});
}
var M = j;
//#endregion
export { w as a, A as i, j as n, b as o, T as r, h as s, M as t };
