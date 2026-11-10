import { d as e } from "./Button-DQoeE5dN.js";
import { d as t, h as n, p as r, u as i } from "./safeHref-D1tj5kGa.js";
import { m as a } from "./Icons-CqVFbuiZ.js";
import { useEffect as o, useRef as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/components/ui/Disclosure.tsx
function d({ summary: r, children: d, open: f, defaultOpen: p = !1, onToggle: m, tone: h, density: g = "default", variant: _ = "default", hint: v, size: y = "md", className: b, summaryClassName: x, bodyClassName: S, "data-testid": C = "disclosure" }) {
	let w = f !== void 0, [T, E] = c(p), D = w ? f : T, O = s(null);
	o(() => {
		let e = O.current;
		e && e.open !== D && (e.open = D);
	}, [D]);
	let k = (e) => {
		let t = e.currentTarget.open;
		w || E(t), m?.(t);
	}, A = h === void 0 ? void 0 : n(h), j = g === "compact", M = _ === "plain", N = y === "lg" && !j, P = v != null && v !== !1;
	return /* @__PURE__ */ u("details", {
		ref: O,
		open: D,
		onToggle: k,
		"data-testid": C,
		"data-size": N ? "lg" : void 0,
		className: e("group", !M && "rounded-md border overflow-hidden", j ? "text-xs" : "text-sm", !M && (A ? i[A] : "border-border"), b),
		children: [/* @__PURE__ */ u("summary", {
			"data-testid": `${C}-summary`,
			className: e("flex items-center gap-2 cursor-pointer select-none list-none marker:hidden [&::-webkit-details-marker]:hidden", j ? "px-3 py-1" : N ? M ? "gap-3 px-0 py-0.5" : "gap-3 px-3 py-2.5" : "px-3 py-2", M ? e("text-text-primary", !N && "hover:bg-surface-hover") : A ? t[A] : "bg-surface text-text-primary hover:bg-surface-hover", x),
			children: [/* @__PURE__ */ l(a, {
				size: j ? 11 : N ? 16 : 14,
				dir: "right",
				className: e("shrink-0 transition-transform duration-150 group-open:rotate-90", N && "text-text-secondary")
			}), P ? /* @__PURE__ */ u("span", {
				className: "flex min-w-0 flex-1 items-baseline gap-x-6",
				children: [/* @__PURE__ */ l("span", {
					className: e("min-w-0 shrink-0", N && "text-[19px] font-semibold leading-7"),
					children: r
				}), /* @__PURE__ */ l("span", {
					className: e("min-w-0 truncate text-text-tertiary", N ? "text-sm" : "text-xs"),
					"data-testid": `${C}-hint`,
					children: v
				})]
			}) : /* @__PURE__ */ l("span", {
				className: e("min-w-0 flex-1", N && "text-[19px] font-semibold leading-7"),
				children: r
			})]
		}), /* @__PURE__ */ l("div", {
			"data-testid": `${C}-body`,
			className: e(!M && "border-t", j ? "px-3 py-1" : "px-3 py-2", !M && (A ? i[A] : "border-border"), S),
			children: d
		})]
	});
}
//#endregion
//#region src/components/shared/Badge.tsx
var f = {
	accent: "info",
	success: "success",
	danger: "danger",
	muted: "neutral"
};
function p(e) {
	return e == null || e <= 0 ? "0" : e > 99 ? "99+" : String(Math.trunc(e));
}
function m({ variant: n, value: i, color: a = "accent", "aria-label": o, className: s, "data-testid": c }) {
	if (n === "count") {
		let n = p(i);
		return /* @__PURE__ */ l("span", {
			"data-testid": c,
			"data-ui-badge": "count",
			"aria-label": o ?? `${n} items`,
			className: e("inline-flex items-center justify-center min-w-[18px] h-[18px]", "px-1.5 rounded-full text-xs font-semibold leading-none select-none", t[f[a]], s),
			children: n
		});
	}
	return n === "dot" ? /* @__PURE__ */ l("span", {
		"data-testid": c,
		"aria-label": o,
		role: o ? "img" : void 0,
		className: e("inline-block w-2 h-2 rounded-full shrink-0", r[f[a]], s)
	}) : /* @__PURE__ */ u("span", {
		"data-testid": c,
		"aria-label": o,
		role: o ? "img" : void 0,
		className: e("relative inline-flex w-2.5 h-2.5 shrink-0", s),
		children: [/* @__PURE__ */ l("span", {
			"aria-hidden": "true",
			className: e("absolute inset-0 rounded-full animate-ping", e(r[f[a]], "opacity-60"))
		}), /* @__PURE__ */ l("span", {
			"aria-hidden": "true",
			className: e("relative inline-block w-2.5 h-2.5 rounded-full", r[f[a]])
		})]
	});
}
//#endregion
export { d as n, m as t };
