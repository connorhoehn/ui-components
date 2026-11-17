import { d as e } from "./Button-DQoeE5dN.js";
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
}, c = t("overlay"), l = "--dock-height", u = "--dock-inset", d = "--dock-floor";
function f({ composer: t, strip: u, above: f, maxWidth: p = "3xl", label: m = "Composer", className: h, "data-testid": g = "floating-composer-dock" }) {
	let _ = i(null), v = n(c);
	return r(() => {
		if (v !== "overlay") return;
		let e = _.current, t = e?.parentElement;
		if (!e || !t) return;
		let n = (e) => t.style.setProperty(l, `${Math.ceil(e)}px`);
		n(e.getBoundingClientRect().height);
		let r = null;
		return typeof ResizeObserver < "u" && (r = new ResizeObserver(([e]) => {
			e && n(e.target.getBoundingClientRect().height);
		}), r.observe(e)), () => {
			r?.disconnect(), t.style.removeProperty(l);
		};
	}, [v]), r(() => {
		if (v !== "pinned") return;
		let e = _.current, t = e?.parentElement;
		if (!e || !t) return;
		let n = () => {
			let n = 0;
			for (let r of Array.from(t.children)) r !== e && r instanceof HTMLElement && (n += r.offsetHeight);
			let r = getComputedStyle(e);
			n += (parseFloat(r.paddingTop) || 0) + (parseFloat(r.paddingBottom) || 0);
			for (let t of Array.from(e.querySelectorAll("[data-dock-fixed]"))) n += t.offsetHeight;
			let i = e.querySelector("[data-dock-above]");
			i && (n += parseFloat(getComputedStyle(i).marginBottom) || 0), t.style.setProperty(d, `${Math.ceil(n)}px`);
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
			r?.disconnect(), i?.disconnect(), t.style.removeProperty(d);
		};
	}, [v]), /* @__PURE__ */ a("div", {
		ref: _,
		role: "region",
		"aria-label": m,
		"data-floating-composer-dock": !0,
		"data-testid": g,
		"data-placement": v,
		className: e(v === "pinned" ? "relative flex max-h-full min-h-0 w-full min-w-0 shrink flex-col bg-workspace px-[var(--dock-inset,1rem)] pb-[var(--dock-inset,1rem)]" : "pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-workspace via-workspace/85 to-transparent px-4 pb-3 pt-8", h),
		children: /* @__PURE__ */ o("div", {
			"data-uic-keepout": "bottom",
			className: e("pointer-events-auto flex min-h-0 w-full min-w-0 flex-col", v === "pinned" ? "max-w-none" : ["mx-auto", s[p]]),
			children: [
				f && /* @__PURE__ */ a("div", {
					className: "mb-2 min-h-0 shrink overflow-y-auto",
					"data-dock-above": "",
					"data-testid": `${g}-above`,
					children: f
				}),
				u && /* @__PURE__ */ a("div", {
					className: "shrink-0",
					"data-dock-fixed": "",
					"data-testid": `${g}-strip`,
					children: u
				}),
				/* @__PURE__ */ a("div", {
					className: e("shrink-0 rounded-[var(--composer-radius,12px)]", v === "pinned" ? "[--composer-shadow:0_0_#0000]" : "shadow-lg", u && "rounded-t-none [&_.chat-composer]:rounded-t-none"),
					"data-dock-fixed": "",
					"data-testid": `${g}-composer`,
					children: t
				})
			]
		})
	});
}
//#endregion
export { f as i, l as n, u as r, c as t };
