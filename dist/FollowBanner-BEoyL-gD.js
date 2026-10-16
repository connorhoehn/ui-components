import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./useEventCallback-Cwx9QVSi.js";
import { n } from "./Button-uREUOWUk.js";
import { t as r } from "./EmptyState-CpS13Gy4.js";
import { useEffect as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/ui/SelectableCard.tsx
var s = {
	sm: "p-3",
	md: "p-4",
	lg: "p-6"
};
function c({ children: t, selected: n = !1, onSelect: r, padding: i = "sm", disabled: o = !1, className: c, ...l }) {
	return /* @__PURE__ */ a("button", {
		type: "button",
		"aria-pressed": n,
		disabled: o,
		onClick: r,
		className: e("block w-full text-left font-inherit rounded-lg border transition-colors duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", s[i], n ? "border-primary bg-surface-hover" : "border-border bg-surface hover:border-border-emphasis", o ? "opacity-50 cursor-not-allowed" : "cursor-pointer", c),
		...l,
		children: t
	});
}
//#endregion
//#region src/components/shared/NoAccessState.tsx
function l() {
	return /* @__PURE__ */ o("svg", {
		width: "28",
		height: "28",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.75",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: [/* @__PURE__ */ a("rect", {
			x: "4",
			y: "11",
			width: "16",
			height: "10",
			rx: "2"
		}), /* @__PURE__ */ a("path", { d: "M8 11V7a4 4 0 0 1 8 0v4" })]
	});
}
function u(e, t) {
	return `You don't have access to ${e} — ask ${t?.trim() || "its owner"} to share it.`;
}
function d({ resource: e, ownerName: t, actionLabel: n, onAction: i, size: o, className: s, testId: c = "no-access-state" }) {
	return /* @__PURE__ */ a(r, {
		icon: /* @__PURE__ */ a(l, {}),
		title: `You don't have access to ${e}`,
		body: `Ask ${t?.trim() || "its owner"} to share it with you.`,
		...n && i ? {
			actionLabel: n,
			onAction: i
		} : {},
		...o ? { size: o } : {},
		...s ? { className: s } : {},
		testId: c
	});
}
//#endregion
//#region src/components/shared/FollowBanner.tsx
function f(e, n, { enabled: r = !0, scope: a } = {}) {
	let o = t(n);
	i(() => {
		if (!e || !r) return;
		let t = null, n = setTimeout(() => {
			let e = a ? a.current : window;
			if (!e) return;
			let n = a ? [
				"keydown",
				"wheel",
				"touchmove"
			] : [
				"mousedown",
				"keydown",
				"wheel"
			], r = () => o();
			for (let t of n) e.addEventListener(t, r, {
				once: !0,
				passive: !0
			});
			t = () => {
				for (let t of n) e.removeEventListener(t, r);
			};
		}, 500);
		return () => {
			clearTimeout(n), t?.();
		};
	}, [
		e,
		r,
		a,
		o
	]);
}
function p({ name: t, onStop: r, autoStopOnInteract: i = !0, autoStop: s, autoStopScope: c, location: l, appearance: u = "banner", className: d, "data-testid": p = "follow-banner" }) {
	return f(!!t, r, {
		enabled: s ?? i,
		scope: c
	}), t ? u === "bar" ? /* @__PURE__ */ o("div", {
		"data-testid": p,
		"data-appearance": "bar",
		className: e("flex min-h-10 shrink-0 items-center gap-3 rounded-md border border-info-border bg-info-bg px-3.5 py-1", "text-sm text-text-primary", d),
		children: [/* @__PURE__ */ o("span", {
			className: "min-w-0 flex-1 truncate",
			children: [/* @__PURE__ */ o("span", {
				className: "font-semibold",
				children: ["Following ", t]
			}), l ? /* @__PURE__ */ o("span", {
				className: "text-text-secondary",
				children: [" · ", l]
			}) : null]
		}), /* @__PURE__ */ a(n, {
			variant: "ghost",
			size: "sm",
			onClick: r,
			"data-testid": `${p}-stop`,
			className: "shrink-0 bg-surface",
			children: "Stop following"
		})]
	}) : /* @__PURE__ */ o("div", {
		"data-testid": p,
		className: e("flex items-center justify-center gap-2 px-4 py-1.5 shrink-0", "bg-info-bg border-b border-info-border text-info-fg text-[12.5px] font-medium", d),
		children: [/* @__PURE__ */ o("span", { children: [
			"Following ",
			t,
			l ? /* @__PURE__ */ o("span", {
				className: "font-normal",
				children: [" · ", l]
			}) : null
		] }), /* @__PURE__ */ a("button", {
			type: "button",
			onClick: r,
			className: "text-[11.5px] font-semibold px-2 py-0.5 rounded border border-info-border bg-transparent text-info-fg cursor-pointer",
			children: "Stop"
		})]
	}) : null;
}
//#endregion
export { c as a, u as i, f as n, d as r, p as t };
