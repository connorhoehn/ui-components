import { t as e } from "./cn-DhjIN-s0.js";
import { h as t, l as n, u as r } from "./overlayStack-CHdlnODN.js";
import { f as i } from "./Icons-BSEVGRI6.js";
import { t as a } from "./Stack-CkiMw5K0.js";
import { t as o } from "./EmptyState-zKbpAhFD.js";
import { t as s } from "./InlinePopover-DtYo8_ZC.js";
import { Children as c, useEffect as l, useRef as u, useState as d } from "react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
//#region src/components/ui/SelectableCard.tsx
var h = {
	sm: "p-3",
	md: "p-4",
	lg: "p-6"
};
function g({ children: t, selected: n = !1, onSelect: r, padding: i = "sm", disabled: a = !1, className: o, ...s }) {
	return /* @__PURE__ */ p("button", {
		type: "button",
		"aria-pressed": n,
		disabled: a,
		onClick: r,
		className: e("block w-full text-left font-inherit rounded-lg border transition-colors duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", h[i], n ? "border-primary bg-surface-hover" : "border-border bg-surface hover:border-border-emphasis", a ? "opacity-50 cursor-not-allowed" : "cursor-pointer", o),
		...s,
		children: t
	});
}
//#endregion
//#region src/components/ui/Disclosure.tsx
function _({ summary: a, children: o, open: s, defaultOpen: c = !1, onToggle: f, tone: h, density: g = "default", variant: _ = "default", hint: v, size: y = "md", className: b, summaryClassName: x, bodyClassName: S, "data-testid": C = "disclosure" }) {
	let w = s !== void 0, [T, E] = d(c), D = w ? s : T, O = u(null);
	l(() => {
		let e = O.current;
		e && e.open !== D && (e.open = D);
	}, [D]);
	let k = (e) => {
		let t = e.currentTarget.open;
		w || E(t), f?.(t);
	}, A = h === void 0 ? void 0 : t(h), j = g === "compact", M = _ === "plain", N = y === "lg" && !j, P = v != null && v !== !1;
	return /* @__PURE__ */ m("details", {
		ref: O,
		open: D,
		onToggle: k,
		"data-testid": C,
		"data-size": N ? "lg" : void 0,
		className: e("group", !M && "rounded-md border overflow-hidden", j ? "text-xs" : "text-sm", !M && (A ? n[A] : "border-border"), b),
		children: [/* @__PURE__ */ m("summary", {
			"data-testid": `${C}-summary`,
			className: e("flex items-center gap-2 cursor-pointer select-none list-none marker:hidden [&::-webkit-details-marker]:hidden", j ? "px-2 py-1" : N ? M ? "gap-3 px-0 py-0.5" : "gap-3 px-3 py-2.5" : "px-3 py-2", M ? e("text-text-primary", !N && "hover:bg-surface-hover") : A ? r[A] : "bg-surface text-text-primary hover:bg-surface-hover", x),
			children: [/* @__PURE__ */ p(i, {
				size: j ? 11 : N ? 16 : 14,
				dir: "right",
				className: e("shrink-0 transition-transform duration-150 group-open:rotate-90", N && "text-text-secondary")
			}), P ? /* @__PURE__ */ m("span", {
				className: "flex min-w-0 flex-1 items-baseline gap-x-6",
				children: [/* @__PURE__ */ p("span", {
					className: e("min-w-0 shrink-0", N && "text-[19px] font-semibold leading-7"),
					children: a
				}), /* @__PURE__ */ p("span", {
					className: e("min-w-0 truncate text-text-tertiary", N ? "text-sm" : "text-xs"),
					"data-testid": `${C}-hint`,
					children: v
				})]
			}) : /* @__PURE__ */ p("span", {
				className: e("min-w-0 flex-1", N && "text-[19px] font-semibold leading-7"),
				children: a
			})]
		}), /* @__PURE__ */ p("div", {
			"data-testid": `${C}-body`,
			className: e(!M && "border-t", j ? "px-2 py-1" : "px-3 py-2", !M && (A ? n[A] : "border-border"), S),
			children: o
		})]
	});
}
//#endregion
//#region src/components/shared/NoAccessState.tsx
function v() {
	return /* @__PURE__ */ m("svg", {
		width: "28",
		height: "28",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.75",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: [/* @__PURE__ */ p("rect", {
			x: "4",
			y: "11",
			width: "16",
			height: "10",
			rx: "2"
		}), /* @__PURE__ */ p("path", { d: "M8 11V7a4 4 0 0 1 8 0v4" })]
	});
}
function y(e, t) {
	return `You don't have access to ${e} — ask ${t?.trim() || "its owner"} to share it.`;
}
function b({ resource: e, ownerName: t, actionLabel: n, onAction: r, size: i, className: a, testId: s = "no-access-state" }) {
	return /* @__PURE__ */ p(o, {
		icon: /* @__PURE__ */ p(v, {}),
		title: `You don't have access to ${e}`,
		body: `Ask ${t?.trim() || "its owner"} to share it with you.`,
		...n && r ? {
			actionLabel: n,
			onAction: r
		} : {},
		...i ? { size: i } : {},
		...a ? { className: a } : {},
		testId: s
	});
}
//#endregion
//#region src/components/shared/Breadcrumbs.tsx
function x({ item: t, isLast: n, block: r = !1, afterActivate: i }) {
	let a = (e) => {
		t.onClick?.(e), i?.();
	}, o = e("text-sm leading-snug transition-colors duration-100", n ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal", r && "block w-full px-3 py-1.5 rounded-sm hover:bg-[var(--color-surface-hover)]");
	return n || !t.href && !t.onClick ? /* @__PURE__ */ p("span", {
		className: o,
		"aria-current": n ? "page" : void 0,
		children: t.label
	}) : t.href ? /* @__PURE__ */ p("a", {
		href: t.href,
		onClick: a,
		className: e(o, "no-underline"),
		children: t.label
	}) : /* @__PURE__ */ p("button", {
		type: "button",
		onClick: a,
		className: e(o, "border-none bg-transparent cursor-pointer font-[inherit] p-0", r && "text-left px-3 py-1.5"),
		children: t.label
	});
}
function S(e, t) {
	if (e.length <= t) return e;
	let n = e.slice(0, 1), r = e.slice(-(t - 2 > 0 ? t - 2 : 1));
	return [
		...n,
		null,
		...r
	];
}
function C(e, t) {
	let n = t - 2 > 0 ? t - 2 : 1;
	return e.slice(1, e.length - n);
}
function w({ items: e }) {
	let [t, n] = d(!1), r = u(null);
	return /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p("button", {
		ref: r,
		type: "button",
		"aria-label": "Show hidden breadcrumbs",
		"aria-expanded": t,
		"aria-haspopup": "true",
		onClick: () => n((e) => !e),
		className: "text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] border-none bg-transparent cursor-pointer px-1 py-0 rounded-sm leading-snug",
		children: "…"
	}), /* @__PURE__ */ p(s, {
		trigger: r,
		open: t,
		onClose: () => n(!1),
		"aria-label": "Hidden breadcrumbs",
		"data-testid": "breadcrumb-overflow",
		className: "min-w-[160px] py-1",
		children: /* @__PURE__ */ p("ol", {
			className: "list-none m-0 p-0",
			children: e.map((e, t) => /* @__PURE__ */ p("li", { children: /* @__PURE__ */ p(x, {
				item: e,
				isLast: !1,
				block: !0,
				afterActivate: () => n(!1)
			}) }, `${e.label}-${t}`))
		})
	})] });
}
function T({ items: t, separator: n = "/", maxItems: r, overflow: i = "ellipsis", minItems: a, lastIsCurrent: o = !0, className: s, "data-testid": c }) {
	if (t.length === 0 || a != null && t.length < a) return null;
	let l = r == null ? t : S(t, r), u = r == null ? [] : C(t, r);
	return /* @__PURE__ */ p("nav", {
		"aria-label": "Breadcrumb",
		"data-testid": c,
		className: e("flex items-center", s),
		children: /* @__PURE__ */ p("ol", {
			className: "flex items-center gap-1 flex-wrap list-none m-0 p-0",
			children: l.map((e, t) => {
				let r = t === l.length - 1;
				return /* @__PURE__ */ m("li", {
					className: "flex items-center gap-1",
					children: [e === null ? i === "menu" && u.length > 0 ? /* @__PURE__ */ p(w, { items: u }) : /* @__PURE__ */ p("span", {
						className: "text-sm text-[var(--color-text-tertiary)] select-none",
						"aria-label": "More items",
						title: "Some items are hidden",
						children: "…"
					}) : /* @__PURE__ */ p(x, {
						item: e,
						isLast: r && o
					}), !r && /* @__PURE__ */ p("span", {
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
var E = {
	xs: "text-[11px]",
	sm: "text-[12px]"
}, D = {
	tertiary: "text-text-tertiary",
	secondary: "text-text-secondary"
};
function O(e) {
	return e == null || e === !1 || e === !0 ? !1 : typeof e == "string" ? e.trim() !== "" : !Array.isArray(e) || c.toArray(e).some(O);
}
function k({ items: t, separator: n = "·", size: r = "xs", tone: i = "tertiary", className: a, "data-testid": o }) {
	let s = t.filter(O);
	return s.length === 0 ? null : /* @__PURE__ */ p("div", {
		className: e("flex flex-wrap items-center gap-x-1.5 gap-y-0.5", E[r], D[i], a),
		"data-testid": o,
		children: s.map((e, t) => /* @__PURE__ */ m("span", {
			className: "flex items-center gap-1.5",
			children: [t > 0 ? /* @__PURE__ */ p("span", {
				"aria-hidden": "true",
				children: n
			}) : null, e]
		}, t))
	});
}
//#endregion
//#region src/components/shared/Text.tsx
function A({ as: e = "span", className: t, title: n, children: r, wrap: i = !1, ...o }) {
	return /* @__PURE__ */ p(a, {
		as: e,
		gap: "none",
		wrap: i,
		className: t,
		title: n,
		...o,
		children: r
	});
}
var j = A;
//#endregion
export { b as a, g as c, T as i, A as n, y as o, k as r, _ as s, j as t };
