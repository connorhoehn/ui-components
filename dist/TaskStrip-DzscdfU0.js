import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-uREUOWUk.js";
import { h as n, m as r, p as i } from "./overlayStack-C0EBgmzL.js";
import { t as a } from "./IconButton-IE5g44md.js";
import { h as o } from "./Icons-GSE-QGuJ.js";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/components/shared/ProgressBar.tsx
var l = {
	sm: "h-1.5",
	md: "h-2"
};
function u({ value: t, max: a = 100, color: o, size: u = "md", completeTone: d, label: f, valueLabel: p, showRatio: m = !0, labelClassName: h, className: g, style: _, "data-testid": v, "aria-label": y }) {
	let b = a > 0 ? a : 100, x = Math.max(0, Math.min(t, b)), S = Math.min(100, x / b * 100), C = d !== void 0 && S >= 100 ? r(d) : null, w = C ? n(C) : o ?? "var(--color-primary)";
	return /* @__PURE__ */ c("div", {
		"data-testid": v,
		className: e("w-full", g),
		style: _,
		children: [f != null && /* @__PURE__ */ c("div", {
			className: e("flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]", h),
			children: [/* @__PURE__ */ s("span", { children: f }), /* @__PURE__ */ s("span", {
				className: e("tabular-nums", C ? i[C] : "text-[var(--color-text-tertiary)]"),
				children: p ?? (m ? `${x}/${b}` : `${Math.round(S)}%`)
			})]
		}), /* @__PURE__ */ s("div", {
			role: "progressbar",
			"aria-valuenow": x,
			"aria-valuemin": 0,
			"aria-valuemax": b,
			"aria-label": y,
			className: e("w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]", l[u]),
			children: /* @__PURE__ */ s("div", {
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
var d = {
	queued: "Starting",
	running: "Running",
	paused: "Paused",
	awaiting: "Needs you",
	done: "Done",
	failed: "Failed",
	stopped: "Stopped"
}, f = {
	queued: "bg-info",
	running: "bg-info animate-pulse motion-reduce:animate-none",
	paused: "bg-warning",
	awaiting: "bg-warning",
	done: "bg-success",
	failed: "bg-danger",
	stopped: "bg-border-emphasis"
};
function p(e) {
	return /* @__PURE__ */ c("svg", {
		width: 12,
		height: 12,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		...e,
		children: [/* @__PURE__ */ s("rect", {
			x: "4",
			y: "3",
			width: "3",
			height: "10",
			rx: "0.75"
		}), /* @__PURE__ */ s("rect", {
			x: "9",
			y: "3",
			width: "3",
			height: "10",
			rx: "0.75"
		})]
	});
}
function m(e) {
	return /* @__PURE__ */ s("svg", {
		width: 12,
		height: 12,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		...e,
		children: /* @__PURE__ */ s("path", { d: "M5 3.2v9.6a.6.6 0 0 0 .9.5l7.4-4.8a.6.6 0 0 0 0-1L5.9 2.7a.6.6 0 0 0-.9.5Z" })
	});
}
function h(e) {
	return /* @__PURE__ */ s("svg", {
		width: 12,
		height: 12,
		viewBox: "0 0 16 16",
		fill: "currentColor",
		"aria-hidden": "true",
		...e,
		children: /* @__PURE__ */ s("rect", {
			x: "3.5",
			y: "3.5",
			width: "9",
			height: "9",
			rx: "1.25"
		})
	});
}
function g(e) {
	return typeof e != "number" || !Number.isFinite(e) ? null : Math.round(Math.max(0, Math.min(100, e)));
}
function _({ label: n, status: r, phase: i, percent: l, icon: _, onPause: v, onResume: y, onStop: b, onOpen: x, onDismiss: S, className: C, "data-testid": w = "task-strip" }) {
	let T = g(l), E = r === "running" || r === "queued" || r === "paused" || r === "awaiting", D = i ?? d[r];
	return /* @__PURE__ */ c("div", {
		"data-testid": w,
		"data-status": r,
		"aria-busy": r === "running" || r === "queued" || void 0,
		className: e("flex h-[30px] min-w-0 items-center gap-2 rounded-t-lg border border-b-0 border-border bg-surface px-2 text-xs", C),
		children: [
			_ ?? /* @__PURE__ */ s("span", {
				"aria-hidden": "true",
				className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", f[r])
			}),
			/* @__PURE__ */ c("p", {
				role: "status",
				"aria-live": "polite",
				className: "m-0 flex min-w-0 shrink items-center gap-1 truncate",
				"data-testid": `${w}-label`,
				children: [
					/* @__PURE__ */ s("span", {
						className: "truncate font-semibold text-text-primary",
						children: n
					}),
					/* @__PURE__ */ s("span", {
						"aria-hidden": "true",
						className: "text-text-tertiary",
						children: "·"
					}),
					/* @__PURE__ */ s("span", {
						className: "truncate text-text-secondary",
						"data-testid": `${w}-phase`,
						children: D
					}),
					T !== null && /* @__PURE__ */ c("span", {
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
			T === null ? /* @__PURE__ */ s("span", {
				className: "flex-1",
				"aria-hidden": "true"
			}) : /* @__PURE__ */ s(u, {
				value: T,
				size: "sm",
				"aria-label": `${n}: ${T}%`,
				className: "min-w-[3rem] flex-1",
				"data-testid": `${w}-bar`
			}),
			/* @__PURE__ */ c("span", {
				className: "flex shrink-0 items-center gap-0.5",
				children: [
					x && /* @__PURE__ */ s(t, {
						variant: "ghost",
						size: "sm",
						onClick: x,
						"data-testid": `${w}-open`,
						children: "Open run"
					}),
					r === "paused" && y && /* @__PURE__ */ s(a, {
						size: "sm",
						"aria-label": "Resume task",
						title: "Resume",
						onClick: y,
						"data-testid": `${w}-resume`,
						children: /* @__PURE__ */ s(m, {})
					}),
					E && r !== "paused" && v && /* @__PURE__ */ s(a, {
						size: "sm",
						"aria-label": "Pause task",
						title: "Pause",
						onClick: v,
						"data-testid": `${w}-pause`,
						children: /* @__PURE__ */ s(p, {})
					}),
					E && b && /* @__PURE__ */ s(a, {
						size: "sm",
						"aria-label": "Stop task",
						title: "Stop",
						onClick: b,
						"data-testid": `${w}-stop`,
						children: /* @__PURE__ */ s(h, {})
					}),
					S && /* @__PURE__ */ s(a, {
						size: "sm",
						"aria-label": "Hide task strip",
						title: "Hide",
						onClick: S,
						"data-testid": `${w}-dismiss`,
						children: /* @__PURE__ */ s(o, { size: 12 })
					})
				]
			})
		]
	});
}
//#endregion
export { u as a, g as i, d as n, _ as r, f as t };
