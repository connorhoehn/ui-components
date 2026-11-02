import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-C-I3BxWI.js";
import { h as n, m as r, p as i } from "./overlayStack-DxIDMUs-.js";
import { t as a } from "./IconButton-J9jGN6eo.js";
import { h as o } from "./Icons-C__ztBBw.js";
import { n as s } from "./Text-B7xYP_4n.js";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/components/shared/ProgressBar.tsx
var u = {
	sm: "h-1.5",
	md: "h-2"
};
function d({ value: t, max: a = 100, color: o, size: s = "md", completeTone: d, label: f, valueLabel: p, showRatio: m = !0, labelClassName: h, className: g, style: _, "data-testid": v, "aria-label": y }) {
	let b = a > 0 ? a : 100, x = Math.max(0, Math.min(t, b)), S = Math.min(100, x / b * 100), C = d !== void 0 && S >= 100 ? r(d) : null, w = C ? n(C) : o ?? "var(--color-primary)";
	return /* @__PURE__ */ l("div", {
		"data-testid": v,
		className: e("w-full", g),
		style: _,
		children: [f != null && /* @__PURE__ */ l("div", {
			className: e("flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]", h),
			children: [/* @__PURE__ */ c("span", { children: f }), /* @__PURE__ */ c("span", {
				className: e("tabular-nums", C ? i[C] : "text-[var(--color-text-tertiary)]"),
				children: p ?? (m ? `${x}/${b}` : `${Math.round(S)}%`)
			})]
		}), /* @__PURE__ */ c("div", {
			role: "progressbar",
			"aria-valuenow": x,
			"aria-valuemin": 0,
			"aria-valuemax": b,
			"aria-label": y,
			className: e("w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]", u[s]),
			children: /* @__PURE__ */ c("div", {
				className: "h-full rounded-full transition-all duration-300",
				style: {
					width: `${S}%`,
					background: w
				}
			})
		})]
	});
}
//#endregion
//#region src/components/shared/TaskStrip.tsx
var f = {
	queued: "Starting",
	running: "Running",
	paused: "Paused",
	awaiting: "Needs you",
	done: "Done",
	failed: "Failed",
	stopped: "Stopped"
}, p = {
	queued: "bg-info",
	running: "bg-info animate-pulse motion-reduce:animate-none",
	paused: "bg-warning",
	awaiting: "bg-warning",
	done: "bg-success",
	failed: "bg-danger",
	stopped: "bg-border-emphasis"
};
function m(e) {
	return /* @__PURE__ */ l("svg", {
		width: 12,
		height: 12,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		...e,
		children: [/* @__PURE__ */ c("rect", {
			x: "4",
			y: "3",
			width: "3",
			height: "10",
			rx: "0.75"
		}), /* @__PURE__ */ c("rect", {
			x: "9",
			y: "3",
			width: "3",
			height: "10",
			rx: "0.75"
		})]
	});
}
function h(e) {
	return /* @__PURE__ */ c("svg", {
		width: 12,
		height: 12,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		...e,
		children: /* @__PURE__ */ c("path", { d: "M5 3.2v9.6a.6.6 0 0 0 .9.5l7.4-4.8a.6.6 0 0 0 0-1L5.9 2.7a.6.6 0 0 0-.9.5Z" })
	});
}
function g(e) {
	return /* @__PURE__ */ c("svg", {
		width: 12,
		height: 12,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		...e,
		children: /* @__PURE__ */ c("rect", {
			x: "3.5",
			y: "3.5",
			width: "9",
			height: "9",
			rx: "1.25"
		})
	});
}
function _(e) {
	return typeof e != "number" || !Number.isFinite(e) ? null : Math.round(Math.max(0, Math.min(100, e)));
}
function v({ label: n, status: r, phase: i, percent: s, icon: u, onPause: v, onResume: y, onStop: b, onOpen: x, onDismiss: S, className: C, "data-testid": w = "task-strip" }) {
	let T = _(s), E = r === "running" || r === "queued" || r === "paused" || r === "awaiting", D = i ?? f[r];
	return /* @__PURE__ */ l("div", {
		"data-testid": w,
		"data-status": r,
		"aria-busy": r === "running" || r === "queued" || void 0,
		className: e("flex h-[30px] min-w-0 items-center gap-2 rounded-t-lg border border-b-0 border-border bg-surface px-2 text-xs", C),
		children: [
			u ?? /* @__PURE__ */ c("span", {
				"aria-hidden": "true",
				className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", p[r])
			}),
			/* @__PURE__ */ l("p", {
				role: "status",
				"aria-live": "polite",
				className: "m-0 flex min-w-0 shrink items-center gap-1 truncate",
				"data-testid": `${w}-label`,
				children: [
					/* @__PURE__ */ c("span", {
						className: "truncate font-semibold text-text-primary",
						children: n
					}),
					/* @__PURE__ */ c("span", {
						"aria-hidden": "true",
						className: "text-text-tertiary",
						children: "·"
					}),
					/* @__PURE__ */ c("span", {
						className: "truncate text-text-secondary",
						"data-testid": `${w}-phase`,
						children: D
					}),
					T !== null && /* @__PURE__ */ l("span", {
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
			T === null ? /* @__PURE__ */ c("span", {
				className: "flex-1",
				"aria-hidden": "true"
			}) : /* @__PURE__ */ c(d, {
				value: T,
				size: "sm",
				"aria-label": `${n}: ${T}%`,
				className: "min-w-[3rem] flex-1",
				"data-testid": `${w}-bar`
			}),
			/* @__PURE__ */ l("span", {
				className: "flex shrink-0 items-center gap-0.5",
				children: [
					x && /* @__PURE__ */ c(t, {
						variant: "ghost",
						size: "sm",
						onClick: x,
						"data-testid": `${w}-open`,
						children: "Open run"
					}),
					r === "paused" && y && /* @__PURE__ */ c(a, {
						size: "sm",
						"aria-label": "Resume task",
						title: "Resume",
						onClick: y,
						"data-testid": `${w}-resume`,
						children: /* @__PURE__ */ c(h, {})
					}),
					E && r !== "paused" && v && /* @__PURE__ */ c(a, {
						size: "sm",
						"aria-label": "Pause task",
						title: "Pause",
						onClick: v,
						"data-testid": `${w}-pause`,
						children: /* @__PURE__ */ c(m, {})
					}),
					E && b && /* @__PURE__ */ c(a, {
						size: "sm",
						"aria-label": "Stop task",
						title: "Stop",
						onClick: b,
						"data-testid": `${w}-stop`,
						children: /* @__PURE__ */ c(g, {})
					}),
					S && /* @__PURE__ */ c(a, {
						size: "sm",
						"aria-label": "Hide task strip",
						title: "Hide",
						onClick: S,
						"data-testid": `${w}-dismiss`,
						children: /* @__PURE__ */ c(o, { size: 12 })
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/shared/DecisionPath.tsx
function y() {
	return /* @__PURE__ */ c("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		className: "h-2.5 w-2.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ c("path", {
			d: "M3.5 8.5l3 3 6-6.5",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function b({ steps: t, current: n, className: r, "aria-label": i = "Decision path", "data-testid": a = "decision-path" }) {
	return /* @__PURE__ */ c("ol", {
		className: e("m-0 flex min-w-0 list-none flex-wrap items-center gap-x-1.5 gap-y-1 p-0", r),
		"aria-label": i,
		"data-decision-path": n >= t.length ? "complete" : String(n),
		"data-testid": a,
		children: t.map((r, i) => {
			let a = i < n, o = i === n;
			return /* @__PURE__ */ l("li", {
				className: "flex min-w-0 items-center gap-1.5",
				"aria-current": o ? "step" : void 0,
				"data-complete": a || void 0,
				"data-decision-step": r,
				children: [
					/* @__PURE__ */ c("span", {
						"aria-hidden": "true",
						className: e("inline-flex size-4.5 shrink-0 items-center justify-center rounded-full border text-xs leading-none tabular-nums", a ? "border-transparent bg-success-bg text-success-fg" : o ? "border-primary text-primary" : "border-border text-text-tertiary"),
						children: a ? /* @__PURE__ */ c(y, {}) : i + 1
					}),
					/* @__PURE__ */ c(s, {
						size: "xs",
						weight: o ? "semibold" : "normal",
						className: e("min-w-0", o ? "text-primary" : a ? "text-text-secondary" : "text-text-tertiary"),
						children: r
					}),
					i < t.length - 1 && /* @__PURE__ */ c("span", {
						"aria-hidden": "true",
						className: "mx-0.5 text-xs text-text-tertiary",
						children: "→"
					})
				]
			}, `${r}-${i}`);
		})
	});
}
//#endregion
export { _ as a, v as i, p as n, d as o, f as r, b as t };
