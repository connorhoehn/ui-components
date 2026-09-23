import { t as e } from "./cn-DhjIN-s0.js";
import { createContext as t, useContext as n, useLayoutEffect as r, useRef as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/doc-editor/FloatingComposerDock.tsx
var s = {
	md: "max-w-md",
	lg: "max-w-lg",
	xl: "max-w-xl",
	"2xl": "max-w-2xl",
	"3xl": "max-w-3xl",
	"4xl": "max-w-4xl"
}, c = t("overlay"), l = "--dock-height", u = "--dock-inset";
function d({ composer: t, strip: u, above: d, maxWidth: f = "3xl", label: p = "Composer", className: m, "data-testid": h = "floating-composer-dock" }) {
	let g = i(null), _ = n(c);
	return r(() => {
		if (_ !== "overlay") return;
		let e = g.current, t = e?.parentElement;
		if (!e || !t) return;
		let n = (e) => t.style.setProperty(l, `${Math.ceil(e)}px`);
		n(e.getBoundingClientRect().height);
		let r = null;
		return typeof ResizeObserver < "u" && (r = new ResizeObserver(([e]) => {
			e && n(e.target.getBoundingClientRect().height);
		}), r.observe(e)), () => {
			r?.disconnect(), t.style.removeProperty(l);
		};
	}, [_]), /* @__PURE__ */ a("div", {
		ref: g,
		role: "region",
		"aria-label": p,
		"data-testid": h,
		"data-placement": _,
		className: e(_ === "pinned" ? "relative flex max-h-full min-h-0 w-full min-w-0 shrink flex-col bg-workspace px-[var(--dock-inset,1rem)] pb-[var(--dock-inset,1rem)]" : "pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-workspace via-workspace/85 to-transparent px-4 pb-3 pt-8", m),
		children: /* @__PURE__ */ o("div", {
			"data-uic-keepout": "bottom",
			className: e("pointer-events-auto flex min-h-0 w-full min-w-0 flex-col", _ === "pinned" ? "max-w-none" : ["mx-auto", s[f]]),
			children: [
				d && /* @__PURE__ */ a("div", {
					className: "mb-2 min-h-0 shrink overflow-y-auto",
					"data-testid": `${h}-above`,
					children: d
				}),
				u && /* @__PURE__ */ a("div", {
					className: "shrink-0",
					"data-testid": `${h}-strip`,
					children: u
				}),
				/* @__PURE__ */ a("div", {
					className: e("shrink-0 rounded-[var(--composer-radius,12px)]", _ === "pinned" ? "[--composer-shadow:0_0_#0000]" : "shadow-lg", u && "rounded-t-none [&_.chat-composer]:rounded-t-none"),
					"data-testid": `${h}-composer`,
					children: t
				})
			]
		})
	});
}
//#endregion
export { d as i, l as n, u as r, c as t };
