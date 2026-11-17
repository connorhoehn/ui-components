import { createContext as e, useContext as t } from "react";
import { jsx as n } from "react/jsx-runtime";
import { clsx as r } from "clsx";
import { extendTailwindMerge as i } from "tailwind-merge";
//#region src/lib/cn.ts
var a = i({ extend: { classGroups: { "font-family": [{ font: ["[inherit]"] }] } } });
function o(...e) {
	return a(r(e));
}
//#endregion
//#region src/components/shared/Density.tsx
var s = ["comfortable", "compact"], c = e({
	scale: "comfortable",
	form: "comfortable"
});
function l({ density: e, value: r, children: i }) {
	let a = t(c), o = r ?? e ?? a.scale, s = r ?? a.form, l = o === a.scale && s === a.form ? a : {
		scale: o,
		form: s
	};
	return /* @__PURE__ */ n(c.Provider, {
		value: l,
		children: i
	});
}
function u(e) {
	let n = t(c);
	return e ?? n.scale;
}
function d(e) {
	let n = t(c);
	return e ?? n.form;
}
var f = /* @__PURE__ */ new Set();
function p(e, t) {
	process.env.NODE_ENV !== "production" && (f.has(e) || (f.add(e), console.warn(`[${e}] \`size="${t}"\` is deprecated (2.440.0): the compact density draws it. Set \`<DensityProvider density="compact">\` once at the shell and drop the prop; the explicit size stays an override until 2.441.`)));
}
function m(e, t, n) {
	let r = u();
	return t === void 0 ? n[r] : (t === n.compact && n.compact !== n.comfortable && p(e, t), t);
}
//#endregion
//#region src/components/shared/controlMetrics.ts
var h = {
	sm: "h-[var(--ui-control-sm,1.75rem)]",
	md: "h-[var(--ui-control-md,2.25rem)]",
	lg: "h-[var(--ui-control-lg,2.5rem)]"
}, g = {
	sm: "w-[var(--ui-control-sm,1.75rem)]",
	md: "w-[var(--ui-control-md,2.25rem)]",
	lg: "w-[var(--ui-control-lg,2.5rem)]"
}, _ = {
	primary: "bg-primary text-on-primary border-none hover:bg-primary-hover",
	secondary: "bg-primary/5 text-text-primary border border-primary/20 enabled:hover:bg-primary/12 enabled:hover:border-primary/30 aria-pressed:bg-primary/12 aria-pressed:text-primary",
	ghost: "bg-transparent text-text-primary border border-transparent enabled:hover:bg-primary/10 enabled:hover:text-primary aria-pressed:bg-primary/12 aria-pressed:text-primary",
	danger: "bg-transparent text-danger-fg border border-danger-border hover:bg-danger-bg",
	"danger-solid": "bg-danger text-on-danger border-none hover:bg-danger/90",
	success: "bg-transparent text-success-fg border border-success-border hover:bg-success-bg",
	info: "bg-info text-white border-none hover:bg-info/90",
	link: "bg-transparent text-primary border-none p-0 no-underline hover:underline"
}, v = {
	surface: _,
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
}, y = "font-semibold", b = {
	sm: `${h.sm} gap-1.5 px-2.5 text-xs`,
	md: `${h.md} gap-2 px-3 text-sm`,
	lg: `${h.lg} gap-2 px-4 text-sm`
}, x = {
	sm: "text-xs",
	md: "text-sm",
	lg: "text-sm"
};
function S({ variant: e = "primary", size: t, tone: r = "surface", disabled: i = !1, fullWidth: a = !1, children: s, type: c = "button", className: l, ref: d, ...f }) {
	let p = u(), m = t ?? (p === "compact" ? "sm" : "md"), h = e === "link";
	return /* @__PURE__ */ n("button", {
		ref: d,
		type: c,
		disabled: i,
		"data-variant": e,
		"data-size": h ? void 0 : m,
		className: o(h ? "font-[inherit] transition-colors duration-150 ease-in-out" : "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md font-[inherit] transition-colors duration-150 ease-in-out", y, r === "code" ? "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-code-blue" : "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", (v[r] ?? _)[e], !h && b[m], h && t && x[t], i && "opacity-50 cursor-not-allowed", !i && "cursor-pointer", a && "w-full", l),
		...f,
		children: s
	});
}
//#endregion
export { s as a, d as c, o as d, g as i, m as l, S as n, l as o, h as r, u as s, y as t, p as u };
