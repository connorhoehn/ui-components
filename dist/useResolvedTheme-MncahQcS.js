import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./PresenceAvatars-BkzMACtv.js";
import { useEffect as n, useState as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/diagram/DiagramPresenceBar.tsx
function o({ participants: n, size: r = 26, className: o, "data-testid": s = "diagram-presence" }) {
	let c = n.map((e) => ({
		id: e.userId || e.clientId,
		name: e.isSelf ? `${e.displayName} (you)` : e.displayName,
		color: e.color,
		online: !0,
		detail: e.isSelf ? "you" : e.pointer ? "drawing" : "viewing"
	}));
	return /* @__PURE__ */ a("div", {
		"data-testid": s,
		"data-participant-count": n.length,
		className: e("pointer-events-auto flex items-center gap-2 rounded-full border border-border bg-surface-panel/95 px-2.5 py-1.5 shadow-sm backdrop-blur", o),
		children: [/* @__PURE__ */ i(t, {
			users: c,
			maxVisible: 6,
			size: r
		}), /* @__PURE__ */ i("span", {
			className: "pr-0.5 text-[11px] font-medium tabular-nums text-text-secondary",
			children: n.length
		})]
	});
}
//#endregion
//#region src/components/diagram/useResolvedTheme.ts
function s(e) {
	if (typeof document > "u") return "light";
	let t = (e?.closest("[data-theme]") ?? document.querySelector("[data-theme]"))?.getAttribute("data-theme");
	return t === "dark" ? "dark" : t === "light" ? "light" : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function c(e) {
	let [t, i] = r("light");
	return n(() => {
		if (typeof document > "u") return;
		let t = () => i(s(e.current));
		t();
		let n = new MutationObserver(t);
		n.observe(document.documentElement, {
			attributes: !0,
			attributeFilter: ["data-theme"],
			subtree: !0
		});
		let r = window.matchMedia?.("(prefers-color-scheme: dark)");
		return r?.addEventListener?.("change", t), () => {
			n.disconnect(), r?.removeEventListener?.("change", t);
		};
	}, [e]), t;
}
//#endregion
export { o as n, c as t };
