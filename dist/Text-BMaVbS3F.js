import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./useEventCallback-Cwx9QVSi.js";
import { _ as n } from "./overlayStack-CHdlnODN.js";
import { t as r } from "./Stack-CkiMw5K0.js";
import { t as i } from "./EmptyState-zKbpAhFD.js";
import { t as a } from "./InlinePopover-DpXHdWeE.js";
import { Children as o, useEffect as s, useRef as c, useState as l } from "react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/components/ui/SelectableCard.tsx
var p = {
	sm: "p-3",
	md: "p-4",
	lg: "p-6"
};
function m({ children: t, selected: n = !1, onSelect: r, padding: i = "sm", disabled: a = !1, className: o, ...s }) {
	return /* @__PURE__ */ d("button", {
		type: "button",
		"aria-pressed": n,
		disabled: a,
		onClick: r,
		className: e("block w-full text-left font-inherit rounded-lg border transition-colors duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", p[i], n ? "border-primary bg-surface-hover" : "border-border bg-surface hover:border-border-emphasis", a ? "opacity-50 cursor-not-allowed" : "cursor-pointer", o),
		...s,
		children: t
	});
}
//#endregion
//#region src/components/shared/NoAccessState.tsx
function h() {
	return /* @__PURE__ */ f("svg", {
		width: "28",
		height: "28",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.75",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: [/* @__PURE__ */ d("rect", {
			x: "4",
			y: "11",
			width: "16",
			height: "10",
			rx: "2"
		}), /* @__PURE__ */ d("path", { d: "M8 11V7a4 4 0 0 1 8 0v4" })]
	});
}
function g(e, t) {
	return `You don't have access to ${e} — ask ${t?.trim() || "its owner"} to share it.`;
}
function _({ resource: e, ownerName: t, actionLabel: n, onAction: r, size: a, className: o, testId: s = "no-access-state" }) {
	return /* @__PURE__ */ d(i, {
		icon: /* @__PURE__ */ d(h, {}),
		title: `You don't have access to ${e}`,
		body: `Ask ${t?.trim() || "its owner"} to share it with you.`,
		...n && r ? {
			actionLabel: n,
			onAction: r
		} : {},
		...a ? { size: a } : {},
		...o ? { className: o } : {},
		testId: s
	});
}
//#endregion
//#region src/components/shared/FollowBanner.tsx
function v(e, n, { enabled: r = !0, scope: i } = {}) {
	let a = t(n);
	s(() => {
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
			], r = () => a();
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
		a
	]);
}
function y({ name: t, onStop: r, autoStopOnInteract: i = !0, autoStop: a, autoStopScope: o, location: s, appearance: c = "banner", className: l, "data-testid": u = "follow-banner" }) {
	return v(!!t, r, {
		enabled: a ?? i,
		scope: o
	}), t ? c === "bar" ? /* @__PURE__ */ f("div", {
		"data-testid": u,
		"data-appearance": "bar",
		className: e("flex min-h-10 shrink-0 items-center gap-3 rounded-md border border-info-border bg-info-bg px-3.5 py-1", "text-sm text-text-primary", l),
		children: [/* @__PURE__ */ f("span", {
			className: "min-w-0 flex-1 truncate",
			children: [/* @__PURE__ */ f("span", {
				className: "font-semibold",
				children: ["Following ", t]
			}), s ? /* @__PURE__ */ f("span", {
				className: "text-text-secondary",
				children: [" · ", s]
			}) : null]
		}), /* @__PURE__ */ d(n, {
			variant: "ghost",
			size: "sm",
			onClick: r,
			"data-testid": `${u}-stop`,
			className: "shrink-0 bg-surface font-medium",
			children: "Stop following"
		})]
	}) : /* @__PURE__ */ f("div", {
		"data-testid": u,
		className: e("flex items-center justify-center gap-2 px-4 py-1.5 shrink-0", "bg-info-bg border-b border-info-border text-info-fg text-[12.5px] font-medium", l),
		children: [/* @__PURE__ */ f("span", { children: [
			"Following ",
			t,
			s ? /* @__PURE__ */ f("span", {
				className: "font-normal",
				children: [" · ", s]
			}) : null
		] }), /* @__PURE__ */ d("button", {
			type: "button",
			onClick: r,
			className: "text-[11.5px] font-semibold px-2 py-0.5 rounded border border-info-border bg-transparent text-info-fg cursor-pointer",
			children: "Stop"
		})]
	}) : null;
}
//#endregion
//#region src/components/shared/Breadcrumbs.tsx
function b({ item: t, isLast: n, block: r = !1, afterActivate: i }) {
	let a = (e) => {
		t.onClick?.(e), i?.();
	}, o = e("text-sm leading-snug transition-colors duration-100", n ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal", r && "block w-full px-3 py-1.5 rounded-sm hover:bg-[var(--color-surface-hover)]");
	return n || !t.href && !t.onClick ? /* @__PURE__ */ d("span", {
		className: o,
		"aria-current": n ? "page" : void 0,
		children: t.label
	}) : t.href ? /* @__PURE__ */ d("a", {
		href: t.href,
		onClick: a,
		className: e(o, "no-underline"),
		children: t.label
	}) : /* @__PURE__ */ d("button", {
		type: "button",
		onClick: a,
		className: e(o, "border-none bg-transparent cursor-pointer font-[inherit] p-0", r && "text-left px-3 py-1.5"),
		children: t.label
	});
}
function x(e, t) {
	if (e.length <= t) return e;
	let n = e.slice(0, 1), r = e.slice(-(t - 2 > 0 ? t - 2 : 1));
	return [
		...n,
		null,
		...r
	];
}
function S(e, t) {
	let n = t - 2 > 0 ? t - 2 : 1;
	return e.slice(1, e.length - n);
}
function C({ items: e }) {
	let [t, n] = l(!1), r = c(null);
	return /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d("button", {
		ref: r,
		type: "button",
		"aria-label": "Show hidden breadcrumbs",
		"aria-expanded": t,
		"aria-haspopup": "true",
		onClick: () => n((e) => !e),
		className: "text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] border-none bg-transparent cursor-pointer px-1 py-0 rounded-sm leading-snug",
		children: "…"
	}), /* @__PURE__ */ d(a, {
		trigger: r,
		open: t,
		onClose: () => n(!1),
		"aria-label": "Hidden breadcrumbs",
		"data-testid": "breadcrumb-overflow",
		className: "min-w-[160px] py-1",
		children: /* @__PURE__ */ d("ol", {
			className: "list-none m-0 p-0",
			children: e.map((e, t) => /* @__PURE__ */ d("li", { children: /* @__PURE__ */ d(b, {
				item: e,
				isLast: !1,
				block: !0,
				afterActivate: () => n(!1)
			}) }, `${e.label}-${t}`))
		})
	})] });
}
function w({ items: t, separator: n = "/", maxItems: r, overflow: i = "ellipsis", minItems: a, lastIsCurrent: o = !0, className: s, "data-testid": c }) {
	if (t.length === 0 || a != null && t.length < a) return null;
	let l = r == null ? t : x(t, r), u = r == null ? [] : S(t, r);
	return /* @__PURE__ */ d("nav", {
		"aria-label": "Breadcrumb",
		"data-testid": c,
		className: e("flex items-center", s),
		children: /* @__PURE__ */ d("ol", {
			className: "flex items-center gap-1 flex-wrap list-none m-0 p-0",
			children: l.map((e, t) => {
				let r = t === l.length - 1;
				return /* @__PURE__ */ f("li", {
					className: "flex items-center gap-1",
					children: [e === null ? i === "menu" && u.length > 0 ? /* @__PURE__ */ d(C, { items: u }) : /* @__PURE__ */ d("span", {
						className: "text-sm text-[var(--color-text-tertiary)] select-none",
						"aria-label": "More items",
						title: "Some items are hidden",
						children: "…"
					}) : /* @__PURE__ */ d(b, {
						item: e,
						isLast: r && o
					}), !r && /* @__PURE__ */ d("span", {
						className: "text-[var(--color-text-tertiary)] text-sm select-none",
						"aria-hidden": "true",
						children: n
					})]
				}, t);
			})
		})
	});
}
//#endregion
//#region src/components/shared/MetaLine.tsx
var T = {
	xs: "text-[11px]",
	sm: "text-[12px]"
}, E = {
	tertiary: "text-text-tertiary",
	secondary: "text-text-secondary"
};
function D(e) {
	return e == null || e === !1 || e === !0 ? !1 : typeof e == "string" ? e.trim() !== "" : !Array.isArray(e) || o.toArray(e).some(D);
}
function O({ items: t, separator: n = "·", size: r = "xs", tone: i = "tertiary", className: a, "data-testid": o }) {
	let s = t.filter(D);
	return s.length === 0 ? null : /* @__PURE__ */ d("div", {
		className: e("flex flex-wrap items-center gap-x-1.5 gap-y-0.5", T[r], E[i], a),
		"data-testid": o,
		children: s.map((e, t) => /* @__PURE__ */ f("span", {
			className: "flex items-center gap-1.5",
			children: [t > 0 ? /* @__PURE__ */ d("span", {
				"aria-hidden": "true",
				children: n
			}) : null, e]
		}, t))
	});
}
//#endregion
//#region src/components/shared/Text.tsx
function k({ as: e = "span", className: t, title: n, children: i, wrap: a = !1, ...o }) {
	return /* @__PURE__ */ d(r, {
		as: e,
		gap: "none",
		wrap: a,
		className: t,
		title: n,
		...o,
		children: i
	});
}
var A = k;
//#endregion
export { y as a, g as c, w as i, m as l, k as n, v as o, O as r, _ as s, A as t };
