import { d as e, n as t } from "./Button-DQoeE5dN.js";
import { t as n } from "./ProgressBar-BqEAEy4U.js";
import { n as r } from "./Text-fqIvcZp2.js";
import { t as i } from "./IconButton-BgM9MvwA.js";
import { h as a } from "./Icons-CqVFbuiZ.js";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/components/shared/TaskStrip.tsx
var c = {
	queued: "Starting",
	running: "Running",
	paused: "Paused",
	awaiting: "Needs you",
	done: "Done",
	failed: "Failed",
	stopped: "Stopped"
}, l = {
	queued: "bg-info",
	running: "bg-info animate-pulse motion-reduce:animate-none",
	paused: "bg-warning",
	awaiting: "bg-warning",
	done: "bg-success",
	failed: "bg-danger",
	stopped: "bg-border-emphasis"
};
function u(e) {
	return /* @__PURE__ */ s("svg", {
		width: 12,
		height: 12,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		...e,
		children: [/* @__PURE__ */ o("rect", {
			x: "4",
			y: "3",
			width: "3",
			height: "10",
			rx: "0.75"
		}), /* @__PURE__ */ o("rect", {
			x: "9",
			y: "3",
			width: "3",
			height: "10",
			rx: "0.75"
		})]
	});
}
function d(e) {
	return /* @__PURE__ */ o("svg", {
		width: 12,
		height: 12,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		...e,
		children: /* @__PURE__ */ o("path", { d: "M5 3.2v9.6a.6.6 0 0 0 .9.5l7.4-4.8a.6.6 0 0 0 0-1L5.9 2.7a.6.6 0 0 0-.9.5Z" })
	});
}
function f(e) {
	return /* @__PURE__ */ o("svg", {
		width: 12,
		height: 12,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		...e,
		children: /* @__PURE__ */ o("rect", {
			x: "3.5",
			y: "3.5",
			width: "9",
			height: "9",
			rx: "1.25"
		})
	});
}
function p(e) {
	return typeof e != "number" || !Number.isFinite(e) ? null : Math.round(Math.max(0, Math.min(100, e)));
}
function m({ label: r, status: m, phase: h, percent: g, icon: _, onPause: v, onResume: y, onStop: b, onOpen: x, onDismiss: S, className: C, "data-testid": w = "task-strip" }) {
	let T = p(g), E = m === "running" || m === "queued" || m === "paused" || m === "awaiting", D = h ?? c[m];
	return /* @__PURE__ */ s("div", {
		"data-testid": w,
		"data-status": m,
		"aria-busy": m === "running" || m === "queued" || void 0,
		className: e("flex h-[30px] min-w-0 items-center gap-2 rounded-t-lg border border-b-0 border-border bg-surface px-2 text-xs", C),
		children: [
			_ ?? /* @__PURE__ */ o("span", {
				"aria-hidden": "true",
				className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", l[m])
			}),
			/* @__PURE__ */ s("p", {
				role: "status",
				"aria-live": "polite",
				className: "m-0 flex min-w-0 shrink items-center gap-1 truncate",
				"data-testid": `${w}-label`,
				children: [
					/* @__PURE__ */ o("span", {
						className: "truncate font-semibold text-text-primary",
						children: r
					}),
					/* @__PURE__ */ o("span", {
						"aria-hidden": "true",
						className: "text-text-tertiary",
						children: "·"
					}),
					/* @__PURE__ */ o("span", {
						className: "truncate text-text-secondary",
						"data-testid": `${w}-phase`,
						children: D
					}),
					T !== null && /* @__PURE__ */ s("span", {
						className: "shrink-0 text-text-secondary",
						"data-testid": `${w}-percent`,
						children: [
							"· ",
							T,
							"%"
						]
					})
				]
			}),
			T === null ? /* @__PURE__ */ o("span", {
				className: "flex-1",
				"aria-hidden": "true"
			}) : /* @__PURE__ */ o(n, {
				value: T,
				size: "sm",
				"aria-label": `${r}: ${T}%`,
				className: "min-w-[3rem] flex-1",
				"data-testid": `${w}-bar`
			}),
			/* @__PURE__ */ s("span", {
				className: "flex shrink-0 items-center gap-0.5",
				children: [
					x && /* @__PURE__ */ o(t, {
						variant: "ghost",
						size: "sm",
						onClick: x,
						"data-testid": `${w}-open`,
						children: "Open run"
					}),
					m === "paused" && y && /* @__PURE__ */ o(i, {
						size: "sm",
						"aria-label": "Resume task",
						title: "Resume",
						onClick: y,
						"data-testid": `${w}-resume`,
						children: /* @__PURE__ */ o(d, {})
					}),
					E && m !== "paused" && v && /* @__PURE__ */ o(i, {
						size: "sm",
						"aria-label": "Pause task",
						title: "Pause",
						onClick: v,
						"data-testid": `${w}-pause`,
						children: /* @__PURE__ */ o(u, {})
					}),
					E && b && /* @__PURE__ */ o(i, {
						size: "sm",
						"aria-label": "Stop task",
						title: "Stop",
						onClick: b,
						"data-testid": `${w}-stop`,
						children: /* @__PURE__ */ o(f, {})
					}),
					S && /* @__PURE__ */ o(i, {
						size: "sm",
						"aria-label": "Hide task strip",
						title: "Hide",
						onClick: S,
						"data-testid": `${w}-dismiss`,
						children: /* @__PURE__ */ o(a, { size: 12 })
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/shared/DecisionPath.tsx
function h() {
	return /* @__PURE__ */ o("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		className: "h-2.5 w-2.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ o("path", {
			d: "M3.5 8.5l3 3 6-6.5",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function g({ steps: t, current: n, className: i, "aria-label": a = "Decision path", "data-testid": c = "decision-path" }) {
	return /* @__PURE__ */ o("ol", {
		className: e("m-0 flex min-w-0 list-none flex-wrap items-center gap-x-1.5 gap-y-1 p-0", i),
		"aria-label": a,
		"data-decision-path": n >= t.length ? "complete" : String(n),
		"data-testid": c,
		children: t.map((i, a) => {
			let c = a < n, l = a === n;
			return /* @__PURE__ */ s("li", {
				className: "flex min-w-0 items-center gap-1.5",
				"aria-current": l ? "step" : void 0,
				"data-complete": c || void 0,
				"data-decision-step": i,
				children: [
					/* @__PURE__ */ o("span", {
						"aria-hidden": "true",
						className: e("inline-flex size-4.5 shrink-0 items-center justify-center rounded-full border text-xs leading-none tabular-nums", c ? "border-transparent bg-success-bg text-success-fg" : l ? "border-primary text-primary" : "border-border text-text-tertiary"),
						children: c ? /* @__PURE__ */ o(h, {}) : a + 1
					}),
					/* @__PURE__ */ o(r, {
						size: "xs",
						weight: l ? "semibold" : "normal",
						className: e("min-w-0", l ? "text-primary" : c ? "text-text-secondary" : "text-text-tertiary"),
						children: i
					}),
					a < t.length - 1 && /* @__PURE__ */ o("span", {
						"aria-hidden": "true",
						className: "mx-0.5 text-xs text-text-tertiary",
						children: "→"
					})
				]
			}, `${i}-${a}`);
		})
	});
}
//#endregion
export { p as a, m as i, l as n, c as r, g as t };
