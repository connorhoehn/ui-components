import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./useEventCallback-Cwx9QVSi.js";
import { n } from "./Button-C2OEUpX-.js";
import { t as r } from "./EmptyState-DnbFBYDA.js";
import { t as i } from "./InlinePopover-Nn2oovSj.js";
import { useEffect as a, useRef as o, useState as s } from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/components/ui/SelectableCard.tsx
var d = {
	sm: "p-3",
	md: "p-4",
	lg: "p-6"
};
function f({ children: t, selected: n = !1, onSelect: r, padding: i = "sm", disabled: a = !1, className: o, ...s }) {
	return /* @__PURE__ */ l("button", {
		type: "button",
		"aria-pressed": n,
		disabled: a,
		onClick: r,
		className: e("block w-full text-left font-inherit rounded-lg border transition-colors duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", d[i], n ? "border-primary bg-surface-hover" : "border-border bg-surface hover:border-border-emphasis", a ? "opacity-50 cursor-not-allowed" : "cursor-pointer", o),
		...s,
		children: t
	});
}
//#endregion
//#region src/components/shared/NoAccessState.tsx
function p() {
	return /* @__PURE__ */ u("svg", {
		width: "28",
		height: "28",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.75",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: [/* @__PURE__ */ l("rect", {
			x: "4",
			y: "11",
			width: "16",
			height: "10",
			rx: "2"
		}), /* @__PURE__ */ l("path", { d: "M8 11V7a4 4 0 0 1 8 0v4" })]
	});
}
function m(e, t) {
	return `You don't have access to ${e} — ask ${t?.trim() || "its owner"} to share it.`;
}
function h({ resource: e, ownerName: t, actionLabel: n, onAction: i, size: a, className: o, testId: s = "no-access-state" }) {
	return /* @__PURE__ */ l(r, {
		icon: /* @__PURE__ */ l(p, {}),
		title: `You don't have access to ${e}`,
		body: `Ask ${t?.trim() || "its owner"} to share it with you.`,
		...n && i ? {
			actionLabel: n,
			onAction: i
		} : {},
		...a ? { size: a } : {},
		...o ? { className: o } : {},
		testId: s
	});
}
//#endregion
//#region src/components/shared/FollowBanner.tsx
function g(e, n, { enabled: r = !0, scope: i } = {}) {
	let o = t(n);
	a(() => {
		if (!e || !r) return;
		let t = null, n = setTimeout(() => {
			let e = i ? i.current : window;
			if (!e) return;
			let n = i ? [
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
		i,
		o
	]);
}
function _({ name: t, onStop: r, autoStopOnInteract: i = !0, autoStop: a, autoStopScope: o, location: s, appearance: c = "banner", className: d, "data-testid": f = "follow-banner" }) {
	return g(!!t, r, {
		enabled: a ?? i,
		scope: o
	}), t ? c === "bar" ? /* @__PURE__ */ u("div", {
		"data-testid": f,
		"data-appearance": "bar",
		className: e("flex min-h-10 shrink-0 items-center gap-3 rounded-md border border-info-border bg-info-bg px-3.5 py-1", "text-sm text-text-primary", d),
		children: [/* @__PURE__ */ u("span", {
			className: "min-w-0 flex-1 truncate",
			children: [/* @__PURE__ */ u("span", {
				className: "font-semibold",
				children: ["Following ", t]
			}), s ? /* @__PURE__ */ u("span", {
				className: "text-text-secondary",
				children: [" · ", s]
			}) : null]
		}), /* @__PURE__ */ l(n, {
			variant: "ghost",
			size: "sm",
			onClick: r,
			"data-testid": `${f}-stop`,
			className: "shrink-0 bg-surface",
			children: "Stop following"
		})]
	}) : /* @__PURE__ */ u("div", {
		"data-testid": f,
		className: e("flex items-center justify-center gap-2 px-4 py-1.5 shrink-0", "bg-info-bg border-b border-info-border text-info-fg text-[12.5px] font-medium", d),
		children: [/* @__PURE__ */ u("span", { children: [
			"Following ",
			t,
			s ? /* @__PURE__ */ u("span", {
				className: "font-normal",
				children: [" · ", s]
			}) : null
		] }), /* @__PURE__ */ l("button", {
			type: "button",
			onClick: r,
			className: "text-[11.5px] font-semibold px-2 py-0.5 rounded border border-info-border bg-transparent text-info-fg cursor-pointer",
			children: "Stop"
		})]
	}) : null;
}
//#endregion
//#region src/components/shared/Breadcrumbs.tsx
var v = {
	sm: "text-[13px]",
	md: "text-sm"
};
function y({ item: t, isLast: n, block: r = !1, afterActivate: i, size: a = "md" }) {
	let o = (e) => {
		t.onClick?.(e), i?.();
	}, s = e(v[a], "leading-snug transition-colors duration-100", n ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal", r && "block w-full px-3 py-1.5 rounded-sm hover:bg-[var(--color-surface-hover)]");
	return n || !t.href && !t.onClick ? /* @__PURE__ */ l("span", {
		className: s,
		"aria-current": n ? "page" : void 0,
		children: t.label
	}) : t.href ? /* @__PURE__ */ l("a", {
		href: t.href,
		onClick: o,
		className: e(s, "no-underline"),
		children: t.label
	}) : /* @__PURE__ */ l("button", {
		type: "button",
		onClick: o,
		className: e(s, "border-none bg-transparent cursor-pointer font-[inherit] p-0", r && "text-left px-3 py-1.5"),
		children: t.label
	});
}
function b(e, t) {
	if (e.length <= t) return e;
	let n = e.slice(0, 1), r = e.slice(-(t - 2 > 0 ? t - 2 : 1));
	return [
		...n,
		null,
		...r
	];
}
function x(e, t) {
	let n = t - 2 > 0 ? t - 2 : 1;
	return e.slice(1, e.length - n);
}
function S({ items: t, size: n }) {
	let [r, a] = s(!1), d = o(null);
	return /* @__PURE__ */ u(c, { children: [/* @__PURE__ */ l("button", {
		ref: d,
		type: "button",
		"aria-label": "Show hidden breadcrumbs",
		"aria-expanded": r,
		"aria-haspopup": "true",
		onClick: () => a((e) => !e),
		className: e(v[n], "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] border-none bg-transparent cursor-pointer px-1 py-0 rounded-sm leading-snug"),
		children: "…"
	}), /* @__PURE__ */ l(i, {
		trigger: d,
		open: r,
		onClose: () => a(!1),
		"aria-label": "Hidden breadcrumbs",
		"data-testid": "breadcrumb-overflow",
		className: "min-w-[160px] py-1",
		children: /* @__PURE__ */ l("ol", {
			className: "list-none m-0 p-0",
			children: t.map((e, t) => /* @__PURE__ */ l("li", { children: /* @__PURE__ */ l(y, {
				item: e,
				isLast: !1,
				block: !0,
				size: n,
				afterActivate: () => a(!1)
			}) }, `${e.label}-${t}`))
		})
	})] });
}
function C({ items: t, separator: n = "/", maxItems: r, overflow: i = "ellipsis", minItems: a, lastIsCurrent: o = !0, size: s = "md", className: c, "data-testid": d }) {
	if (t.length === 0 || a != null && t.length < a) return null;
	let f = r == null ? t : b(t, r), p = r == null ? [] : x(t, r);
	return /* @__PURE__ */ l("nav", {
		"aria-label": "Breadcrumb",
		"data-testid": d,
		className: e("flex items-center", c),
		children: /* @__PURE__ */ l("ol", {
			className: "flex items-center gap-1 flex-wrap list-none m-0 p-0",
			children: f.map((t, r) => {
				let a = r === f.length - 1;
				return /* @__PURE__ */ u("li", {
					className: "flex items-center gap-1",
					children: [t === null ? i === "menu" && p.length > 0 ? /* @__PURE__ */ l(S, {
						items: p,
						size: s
					}) : /* @__PURE__ */ l("span", {
						className: e(v[s], "text-[var(--color-text-tertiary)] select-none"),
						"aria-label": "More items",
						title: "Some items are hidden",
						children: "…"
					}) : /* @__PURE__ */ l(y, {
						item: t,
						isLast: a && o,
						size: s
					}), !a && /* @__PURE__ */ l("span", {
						className: e("text-[var(--color-text-tertiary)] select-none", v[s]),
						"aria-hidden": "true",
						children: n
					})]
				}, r);
			})
		})
	});
}
//#endregion
export { m as a, h as i, _ as n, f as o, g as r, C as t };
