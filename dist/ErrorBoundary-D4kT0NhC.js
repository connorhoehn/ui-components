import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./useEventCallback-Cwx9QVSi.js";
import { n, o as r } from "./Button-C-I3BxWI.js";
import { t as i } from "./Chip-BlpTnjWu.js";
import { t as a } from "./EmptyState-pOG782nO.js";
import { Component as o, useEffect as s, useId as c } from "react";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/components/ui/SelectableCard.tsx
var f = {
	sm: "p-3",
	md: "p-4",
	lg: "p-6"
};
function p({ children: t, selected: n = !1, onSelect: r, padding: i = "sm", disabled: a = !1, className: o, ...s }) {
	return /* @__PURE__ */ u("button", {
		"data-ui-part": "",
		type: "button",
		"aria-pressed": n,
		disabled: a,
		onClick: r,
		className: e("block w-full text-left font-inherit rounded-lg border transition-colors duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", f[i], n ? "border-primary bg-surface-hover" : "border-border bg-surface hover:border-border-emphasis", a ? "opacity-50 cursor-not-allowed" : "cursor-pointer", o),
		...s,
		children: t
	});
}
//#endregion
//#region src/components/shared/NoAccessState.tsx
function m() {
	return /* @__PURE__ */ d("svg", {
		width: "28",
		height: "28",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.75",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: [/* @__PURE__ */ u("rect", {
			x: "4",
			y: "11",
			width: "16",
			height: "10",
			rx: "2"
		}), /* @__PURE__ */ u("path", { d: "M8 11V7a4 4 0 0 1 8 0v4" })]
	});
}
function h(e, t) {
	return `You don't have access to ${e} — ask ${t?.trim() || "its owner"} to share it.`;
}
function g({ resource: e, ownerName: t, actionLabel: n, onAction: r, size: i, className: o, testId: s = "no-access-state" }) {
	return /* @__PURE__ */ u(a, {
		icon: /* @__PURE__ */ u(m, {}),
		title: `You don't have access to ${e}`,
		body: `Ask ${t?.trim() || "its owner"} to share it with you.`,
		...n && r ? {
			actionLabel: n,
			onAction: r
		} : {},
		...i ? { size: i } : {},
		...o ? { className: o } : {},
		testId: s
	});
}
//#endregion
//#region src/components/shared/FollowBanner.tsx
function _(e, n, { enabled: r = !0, scope: i } = {}) {
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
function v({ name: t, onStop: r, autoStopOnInteract: i = !0, autoStop: a, autoStopScope: o, location: s, appearance: c = "banner", className: l, "data-testid": f = "follow-banner" }) {
	return _(!!t, r, {
		enabled: a ?? i,
		scope: o
	}), t ? c === "bar" ? /* @__PURE__ */ d("div", {
		"data-testid": f,
		"data-appearance": "bar",
		className: e("flex min-h-10 shrink-0 items-center gap-3 rounded-md border border-info-border bg-info-bg px-3.5 py-1", "text-sm text-text-primary", l),
		children: [/* @__PURE__ */ d("span", {
			className: "min-w-0 flex-1 truncate",
			children: [/* @__PURE__ */ d("span", {
				className: "font-semibold",
				children: ["Following ", t]
			}), s ? /* @__PURE__ */ d("span", {
				className: "text-text-secondary",
				children: [" · ", s]
			}) : null]
		}), /* @__PURE__ */ u(n, {
			variant: "ghost",
			size: "sm",
			onClick: r,
			"data-testid": `${f}-stop`,
			className: "shrink-0 bg-surface",
			children: "Stop following"
		})]
	}) : /* @__PURE__ */ d("div", {
		"data-testid": f,
		className: e("flex items-center justify-center gap-2 px-4 py-1.5 shrink-0", "bg-info-bg border-b border-info-border text-info-fg text-[12.5px] font-medium", l),
		children: [/* @__PURE__ */ d("span", { children: [
			"Following ",
			t,
			s ? /* @__PURE__ */ d("span", {
				className: "font-normal",
				children: [" · ", s]
			}) : null
		] }), /* @__PURE__ */ u("button", {
			"data-ui-part": "",
			type: "button",
			onClick: r,
			className: "text-[11.5px] font-semibold px-2 py-0.5 rounded border border-info-border bg-transparent text-info-fg cursor-pointer",
			children: "Stop"
		})]
	}) : null;
}
//#endregion
//#region src/components/inbox/InboxSection.tsx
function y({ title: t, count: n, countTone: o = "neutral", hint: s, action: f, empty: p, footer: m, headingLevel: h = 2, children: g, className: _, "data-testid": v }) {
	let y = c(), b = h === 3 ? "h3" : "h2", x = n === 0;
	return /* @__PURE__ */ d("section", {
		"data-ui-part": "",
		"aria-labelledby": y,
		"data-testid": v,
		className: e("overflow-hidden rounded-lg border border-border bg-surface", _),
		children: [
			/* @__PURE__ */ d("div", {
				className: "flex items-center gap-2 border-b border-border bg-surface-panel px-4 py-2.5",
				children: [
					/* @__PURE__ */ u(b, {
						id: y,
						className: "m-0 text-[13px] font-semibold leading-none text-text-primary",
						children: t
					}),
					/* @__PURE__ */ u(i, {
						tone: x ? "neutral" : o,
						size: "xs",
						mono: !0,
						"aria-label": `${n} in ${t}`,
						children: String(n)
					}),
					s != null && /* @__PURE__ */ u("span", {
						className: "min-w-0 truncate text-[11px] text-text-tertiary",
						children: s
					}),
					f != null && /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ u("span", { className: "flex-1" }), /* @__PURE__ */ u("div", {
						className: "flex shrink-0 items-center gap-2",
						children: f
					})] })
				]
			}),
			x && p ? /* @__PURE__ */ u(r, {
				density: "compact",
				children: /* @__PURE__ */ u(a, {
					testId: p.testId ?? (v ? `${v}-empty` : "inbox-section-empty"),
					...p.icon == null ? {} : { icon: p.icon },
					title: p.title,
					...p.body ? { body: p.body } : {}
				})
			}) : /* @__PURE__ */ u("ul", {
				className: "m-0 list-none divide-y divide-border p-0",
				children: g
			}),
			!x && m != null && /* @__PURE__ */ u("div", {
				className: "border-t border-border bg-surface-panel px-4 py-2 text-[11px] text-text-tertiary",
				children: m
			})
		]
	});
}
function b({ children: t, className: n, ...r }) {
	return /* @__PURE__ */ u("li", {
		className: e("px-4 py-3", n),
		...r,
		children: t
	});
}
//#endregion
//#region src/components/misc/ErrorBoundary.tsx
var x = class extends o {
	constructor(e) {
		super(e), this.state = {
			hasError: !1,
			error: null
		};
	}
	static getDerivedStateFromError(e) {
		return {
			hasError: !0,
			error: e
		};
	}
	componentDidCatch(e, t) {
		console.error(`[ErrorBoundary:${this.props.name}]`, e, t.componentStack);
	}
	handleRetry = () => {
		this.setState({
			hasError: !1,
			error: null
		});
	};
	render() {
		return this.state.hasError ? /* @__PURE__ */ d("div", {
			className: "bg-danger-bg border border-danger-border rounded-lg p-6 text-center font-sans",
			children: [
				/* @__PURE__ */ u("p", {
					className: "m-0 mb-2 text-[0.95rem] font-semibold text-danger-fg",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ u("p", {
					className: "m-0 mb-4 text-[0.8rem] text-danger-fg",
					children: this.state.error?.message ?? "An unexpected error occurred."
				}),
				/* @__PURE__ */ u("button", {
					"data-ui-part": "",
					onClick: this.handleRetry,
					className: "bg-danger text-white border-none rounded-md px-4 py-1.5 text-[0.8rem] font-semibold cursor-pointer font-[inherit]",
					children: "Retry"
				})
			]
		}) : this.props.children;
	}
};
//#endregion
export { _ as a, p as c, v as i, y as n, g as o, b as r, h as s, x as t };
