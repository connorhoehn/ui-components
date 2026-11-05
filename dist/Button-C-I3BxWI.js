import { t as e } from "./cn-D4QmbyEy.js";
import { createContext as t, useContext as n } from "react";
import { jsx as r } from "react/jsx-runtime";
//#region src/components/shared/Density.tsx
var i = ["comfortable", "compact"], a = t({
	scale: "comfortable",
	form: "comfortable"
});
function o({ density: e, value: t, children: i }) {
	let o = n(a), s = t ?? e ?? o.scale, c = t ?? o.form, l = s === o.scale && c === o.form ? o : {
		scale: s,
		form: c
	};
	return /* @__PURE__ */ r(a.Provider, {
		value: l,
		children: i
	});
}
function s(e) {
	let t = n(a);
	return e ?? t.scale;
}
function c(e) {
	let t = n(a);
	return e ?? t.form;
}
var l = /* @__PURE__ */ new Set();
function u(e, t) {
	process.env.NODE_ENV !== "production" && (l.has(e) || (l.add(e), console.warn(`[${e}] \`size="${t}"\` is deprecated (2.440.0): the compact density draws it. Set \`<DensityProvider density="compact">\` once at the shell and drop the prop; the explicit size stays an override until 2.441.`)));
}
function d(e, t, n) {
	let r = s();
	return t === void 0 ? n[r] : (t === n.compact && n.compact !== n.comfortable && u(e, t), t);
}
//#endregion
//#region src/components/shared/controlMetrics.ts
var f = {
	sm: "h-[var(--ui-control-sm,1.75rem)]",
	md: "h-[var(--ui-control-md,2.25rem)]",
	lg: "h-[var(--ui-control-lg,2.5rem)]"
}, p = {
	sm: "w-[var(--ui-control-sm,1.75rem)]",
	md: "w-[var(--ui-control-md,2.25rem)]",
	lg: "w-[var(--ui-control-lg,2.5rem)]"
}, m = {
	primary: "bg-primary text-on-primary border-none hover:bg-primary-hover",
	secondary: "bg-primary/5 text-text-primary border border-primary/20 enabled:hover:bg-primary/12 enabled:hover:border-primary/30 aria-pressed:bg-primary/12 aria-pressed:text-primary",
	ghost: "bg-transparent text-text-primary border border-transparent enabled:hover:bg-primary/10 enabled:hover:text-primary aria-pressed:bg-primary/12 aria-pressed:text-primary",
	danger: "bg-transparent text-danger-fg border border-danger-border hover:bg-danger-bg",
	"danger-solid": "bg-danger text-on-danger border-none hover:bg-danger/90",
	success: "bg-transparent text-success-fg border border-success-border hover:bg-success-bg",
	info: "bg-info text-white border-none hover:bg-info/90",
	link: "bg-transparent text-primary border-none p-0 no-underline hover:underline"
}, h = {
	surface: m,
	code: {
		primary: "bg-code-blue text-code-bg border-none hover:bg-code-blue/90",
		secondary: "bg-code-surface text-code-text border border-code-border hover:bg-code-raised",
		ghost: "bg-transparent text-code-text border border-code-border hover:bg-code-surface",
		danger: "bg-transparent text-code-red border border-code-red/40 hover:bg-code-surface",
		"danger-solid": "bg-code-red text-code-bg border-none hover:bg-code-red/90",
		success: "bg-transparent text-code-green border border-code-green/40 hover:bg-code-surface",
		info: "bg-code-blue text-code-bg border-none hover:bg-code-blue/90",
		link: "bg-transparent text-code-blue border-none p-0 no-underline hover:underline"
	}
}, g = "font-semibold", _ = {
	sm: `${f.sm} gap-1.5 px-2.5 text-xs`,
	md: `${f.md} gap-2 px-3 text-sm`,
	lg: `${f.lg} gap-2 px-4 text-sm`
}, v = {
	sm: "text-xs",
	md: "text-sm",
	lg: "text-sm"
};
function y({ variant: t = "primary", size: n, tone: i = "surface", disabled: a = !1, fullWidth: o = !1, children: c, type: l = "button", className: u, ref: d, ...f }) {
	let p = s(), y = n ?? (p === "compact" ? "sm" : "md"), b = t === "link";
	return /* @__PURE__ */ r("button", {
		ref: d,
		type: l,
		disabled: a,
		"data-variant": t,
		"data-size": b ? void 0 : y,
		className: e(b ? "font-[inherit] transition-colors duration-150 ease-in-out" : "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md font-[inherit] transition-colors duration-150 ease-in-out", g, i === "code" ? "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-code-blue" : "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", (h[i] ?? m)[t], !b && _[y], b && n && v[n], a && "opacity-50 cursor-not-allowed", !a && "cursor-pointer", o && "w-full", u),
		...f,
		children: c
	});
}
//#endregion
export { i as a, c, p as i, d as l, y as n, o, f as r, s, g as t, u };
