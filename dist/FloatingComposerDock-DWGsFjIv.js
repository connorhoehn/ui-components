import { f as e } from "./Button-DwPf_9pb.js";
import { r as t } from "./WorkArea-NowgSN3M.js";
import { createContext as n, useContext as r, useLayoutEffect as i, useRef as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/components/doc-editor/FloatingComposerDock.tsx
var c = {
	md: "max-w-md",
	lg: "max-w-lg",
	xl: "max-w-xl",
	"2xl": "max-w-2xl",
	"3xl": "max-w-3xl",
	"4xl": "max-w-4xl"
}, l = n("overlay"), u = "--dock-height", d = "--dock-inset", f = "--dock-floor";
function p({ composer: n, strip: d, above: p, maxWidth: m = "3xl", label: h = "Composer", className: g, "data-testid": _ = "floating-composer-dock" }) {
	let v = a(null), y = r(l), b = t() && y === "overlay";
	return i(() => {
		if (y !== "overlay" || b) return;
		let e = v.current, t = e?.parentElement;
		if (!e || !t) return;
		let n = (e) => t.style.setProperty(u, `${Math.ceil(e)}px`);
		n(e.getBoundingClientRect().height);
		let r = null;
		return typeof ResizeObserver < "u" && (r = new ResizeObserver(([e]) => {
			e && n(e.target.getBoundingClientRect().height);
		}), r.observe(e)), () => {
			r?.disconnect(), t.style.removeProperty(u);
		};
	}, [y, b]), i(() => {
		if (y !== "pinned") return;
		let e = v.current, t = e?.parentElement;
		if (!e || !t) return;
		let n = () => {
			let n = 0;
			for (let r of Array.from(t.children)) r !== e && r instanceof HTMLElement && (n += r.offsetHeight);
			let r = getComputedStyle(e);
			n += (parseFloat(r.paddingTop) || 0) + (parseFloat(r.paddingBottom) || 0);
			for (let t of Array.from(e.querySelectorAll("[data-dock-fixed]"))) n += t.offsetHeight;
			let i = e.querySelector("[data-dock-above]");
			i && (n += parseFloat(getComputedStyle(i).marginBottom) || 0), t.style.setProperty(f, `${Math.ceil(n)}px`);
		};
		n();
		let r = null, i = null;
		if (typeof ResizeObserver < "u") {
			r = new ResizeObserver(n);
			let a = () => {
				r.disconnect();
				for (let n of Array.from(t.children)) n !== e && r.observe(n);
				for (let t of Array.from(e.querySelectorAll("[data-dock-fixed]"))) r.observe(t);
			};
			a(), typeof MutationObserver < "u" && (i = new MutationObserver(() => {
				a(), n();
			}), i.observe(t, { childList: !0 }), i.observe(e, {
				childList: !0,
				subtree: !0
			}));
		}
		return () => {
			r?.disconnect(), i?.disconnect(), t.style.removeProperty(f);
		};
	}, [y]), /* @__PURE__ */ o("div", {
		ref: v,
		role: "region",
		"aria-label": h,
		"data-floating-composer-dock": !0,
		"data-testid": _,
		"data-placement": y,
		className: e(y === "pinned" ? "relative flex max-h-full min-h-0 w-full min-w-0 shrink flex-col bg-workspace px-[var(--dock-inset,1rem)] pb-[var(--dock-inset,1rem)]" : e("pointer-events-none z-10 bg-gradient-to-t to-transparent px-4 pb-3 pt-8", b ? "relative w-full from-surface-panel via-surface-panel/85" : "absolute inset-x-0 bottom-0 from-workspace via-workspace/85"), g),
		children: /* @__PURE__ */ s("div", {
			"data-uic-keepout": "bottom",
			className: e("pointer-events-auto flex min-h-0 w-full min-w-0 flex-col", y === "pinned" ? "max-w-none" : ["mx-auto", c[m]]),
			children: [
				p && /* @__PURE__ */ o("div", {
					className: "mb-2 min-h-0 shrink overflow-y-auto",
					"data-dock-above": "",
					"data-testid": `${_}-above`,
					children: p
				}),
				d && /* @__PURE__ */ o("div", {
					className: "shrink-0",
					"data-dock-fixed": "",
					"data-testid": `${_}-strip`,
					children: d
				}),
				/* @__PURE__ */ o("div", {
					className: e("shrink-0 rounded-[var(--composer-radius,12px)]", y === "pinned" ? "[--composer-shadow:0_0_#0000]" : "shadow-lg", d && "rounded-t-none [&_.chat-composer]:rounded-t-none"),
					"data-dock-fixed": "",
					"data-testid": `${_}-composer`,
					children: n
				})
			]
		})
	});
}
//#endregion
export { p as i, u as n, d as r, l as t };
