import { d as e, i as t, r as n, s as r } from "./Button-DQoeE5dN.js";
import { jsx as i } from "react/jsx-runtime";
//#region src/components/ui/IconButton.tsx
var a = {
	ghost: "bg-transparent text-text-secondary enabled:hover:bg-primary/10 enabled:hover:text-primary aria-pressed:bg-primary/12 aria-pressed:text-primary",
	primary: "bg-primary text-on-primary enabled:hover:bg-primary-hover",
	danger: "bg-danger text-white hover:bg-danger",
	outline: "bg-primary/5 text-text-secondary border border-solid border-primary/20 enabled:hover:bg-primary/12 enabled:hover:text-primary aria-pressed:bg-primary/12 aria-pressed:text-primary"
}, o = {
	surface: a,
	code: {
		ghost: "bg-transparent text-code-subtle hover:bg-code-surface hover:text-code-text",
		primary: "bg-code-blue text-code-bg hover:bg-code-blue",
		danger: "bg-code-red text-code-bg hover:bg-code-red",
		outline: "bg-transparent text-code-subtle border border-solid border-code-border hover:bg-code-surface hover:text-code-text"
	}
}, s = {
	sm: `${n.sm} ${t.sm} shrink-0 text-sm [&_svg]:size-4`,
	md: `${n.md} ${t.md} shrink-0 text-sm [&_svg]:size-4`,
	lg: `${n.lg} ${t.lg} shrink-0 text-sm [&_svg]:size-4`
};
function c({ "aria-label": t, icon: n, children: c, disabled: l = !1, variant: u = "ghost", tone: d = "surface", size: f, className: p, ...m }) {
	let h = r(), g = f ?? (h === "compact" ? "sm" : "md");
	return /* @__PURE__ */ i("button", {
		"data-ui-part": "",
		type: "button",
		"aria-label": t,
		disabled: l,
		"data-variant": u,
		"data-size": g,
		className: e("inline-flex items-center justify-center border-none rounded-md", "transition-colors duration-150 ease-in-out", d === "code" ? "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-code-blue" : "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", (o[d] ?? a)[u], s[g], l && "opacity-50 cursor-not-allowed", !l && "cursor-pointer", p),
		...m,
		children: n ?? c
	});
}
//#endregion
export { c as t };
