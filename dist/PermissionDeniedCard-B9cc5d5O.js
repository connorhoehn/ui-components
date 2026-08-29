import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-wU9TwJvB.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/shared/Spinner.tsx
var i = {
	sm: "w-[14px] h-[14px]",
	md: "w-[20px] h-[20px]",
	lg: "w-[28px] h-[28px]"
};
function a({ size: t = "md", color: r, className: a, style: o, "aria-label": s = "Loading", "data-testid": c }) {
	let l = r ?? "var(--color-primary)";
	return /* @__PURE__ */ n("div", {
		role: "status",
		"aria-label": s,
		"data-testid": c,
		className: e("inline-block rounded-full border-2 border-transparent animate-spin", i[t], a),
		style: {
			borderTopColor: l,
			...o
		}
	});
}
//#endregion
//#region src/components/shared/PermissionDeniedCard.tsx
var o = {
	camera: "Camera",
	microphone: "Microphone",
	screen: "Screen sharing"
}, s = {
	denied: (e) => `${o[e]} access blocked`,
	blocked: (e) => `${o[e]} is in use`,
	"no-device": (e) => e === "screen" ? "Screen sharing not supported" : `No ${e} detected`,
	unavailable: (e) => `${o[e]} unavailable`
}, c = {
	denied: (e) => `${o[e]} access was blocked. Click the icon in your browser's address bar to allow it.`,
	blocked: (e) => `${o[e]} is being used by another application. Close other tabs or apps using it and try again.`,
	"no-device": (e) => `No ${e === "screen" ? "screen sharing capability" : e} was found on this device.`,
	unavailable: () => "This browser doesn't support the requested device access."
};
function l({ kind: e }) {
	return e === "camera" ? /* @__PURE__ */ r("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: [
			/* @__PURE__ */ n("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ n("path", { d: "m22 8-6 4 6 4V8Z" }),
			/* @__PURE__ */ n("path", { d: "M10.5 6.5h3.5a2 2 0 0 1 2 2v2.5" }),
			/* @__PURE__ */ n("path", { d: "M2 6.5v9a2 2 0 0 0 2 2h7" })
		]
	}) : e === "microphone" ? /* @__PURE__ */ r("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: [
			/* @__PURE__ */ n("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ n("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
			/* @__PURE__ */ n("path", { d: "M15 9.34V5a3 3 0 0 0-5.94-.6" }),
			/* @__PURE__ */ n("path", { d: "M17 16.95A7 7 0 0 1 5 12v-2" }),
			/* @__PURE__ */ n("line", {
				x1: "12",
				y1: "19",
				x2: "12",
				y2: "22"
			})
		]
	}) : /* @__PURE__ */ r("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: [
			/* @__PURE__ */ n("rect", {
				x: "2",
				y: "3",
				width: "20",
				height: "14",
				rx: "2",
				ry: "2"
			}),
			/* @__PURE__ */ n("line", {
				x1: "8",
				y1: "21",
				x2: "16",
				y2: "21"
			}),
			/* @__PURE__ */ n("line", {
				x1: "12",
				y1: "17",
				x2: "12",
				y2: "21"
			}),
			/* @__PURE__ */ n("line", {
				x1: "3",
				y1: "9",
				x2: "21",
				y2: "9"
			})
		]
	});
}
function u({ kind: i, state: a, message: o, onRetry: u, retryLabel: d = "Try again", icon: f, className: p, "data-testid": m }) {
	return /* @__PURE__ */ r("div", {
		"data-testid": m,
		"data-permission-kind": i,
		"data-permission-state": a,
		className: e("flex flex-col items-center text-center gap-3 p-6 max-w-sm", p),
		role: "status",
		"aria-live": "polite",
		children: [
			/* @__PURE__ */ n("div", {
				className: "h-10 w-10 rounded-full bg-warning-bg text-warning-fg grid place-items-center",
				children: f ?? /* @__PURE__ */ n(l, { kind: i })
			}),
			/* @__PURE__ */ n("div", {
				className: "text-base font-semibold text-text-primary",
				children: (s[a] ?? s.unavailable)(i)
			}),
			/* @__PURE__ */ n("p", {
				className: "text-xs text-text-secondary",
				children: o ?? (c[a] ?? c.unavailable)(i)
			}),
			u && /* @__PURE__ */ n(t, {
				variant: "ghost",
				size: "sm",
				onClick: u,
				children: d
			})
		]
	});
}
//#endregion
export { a as n, u as t };
