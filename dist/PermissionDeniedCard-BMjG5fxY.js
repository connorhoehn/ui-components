import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-BhS4-R6_.js";
import { useEffect as n, useId as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/shared/TechnicalDetails.tsx
function s({ text: t, label: s = "Show technical details", hideLabel: c = "Hide technical details", defaultOpen: l = !1, className: u, testId: d = "technical-details" }) {
	let [f, p] = i(l), [m, h] = i(!1), g = r();
	n(() => {
		if (!m) return;
		let e = setTimeout(() => h(!1), 1600);
		return () => clearTimeout(e);
	}, [m]);
	let _ = typeof t == "string" ? t.trim() : "";
	return _ ? /* @__PURE__ */ o("div", {
		className: e("flex flex-col gap-1.5", u),
		"data-testid": d,
		children: [/* @__PURE__ */ o("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ a("button", {
				type: "button",
				onClick: () => p((e) => !e),
				"aria-expanded": f,
				"aria-controls": g,
				"data-testid": `${d}-toggle`,
				className: e("self-start text-[11px] font-medium text-text-tertiary", "underline decoration-dotted underline-offset-2", "bg-transparent border-none p-0 cursor-pointer", "hover:text-text-secondary"),
				children: f ? c : s
			}), f && /* @__PURE__ */ a("button", {
				type: "button",
				onClick: () => {
					try {
						navigator.clipboard?.writeText(_).then(() => h(!0), () => {});
					} catch {}
				},
				"data-testid": `${d}-copy`,
				className: e("text-[11px] font-medium text-text-tertiary", "bg-transparent border-none p-0 cursor-pointer hover:text-text-secondary"),
				children: m ? "Copied" : "Copy"
			})]
		}), f && /* @__PURE__ */ a("pre", {
			id: g,
			"data-testid": `${d}-text`,
			className: e("m-0 max-h-40 overflow-auto rounded-md", "bg-surface-panel border border-border", "px-2 py-1.5 text-[11px] leading-snug text-text-secondary", "font-mono whitespace-pre-wrap break-words select-text"),
			children: _
		})]
	}) : null;
}
//#endregion
//#region src/components/shared/PermissionDeniedCard.tsx
var c = {
	camera: "Camera",
	microphone: "Microphone",
	screen: "Screen sharing"
}, l = {
	denied: (e) => `${c[e]} access blocked`,
	blocked: (e) => `${c[e]} is in use`,
	"no-device": (e) => e === "screen" ? "Screen sharing not supported" : `No ${e} detected`,
	unavailable: (e) => `${c[e]} unavailable`
}, u = {
	denied: (e) => `${c[e]} access was blocked. Click the icon in your browser's address bar to allow it.`,
	blocked: (e) => `${c[e]} is being used by another application. Close other tabs or apps using it and try again.`,
	"no-device": (e) => `No ${e === "screen" ? "screen sharing capability" : e} was found on this device.`,
	unavailable: () => "This browser doesn't support the requested device access."
};
function d({ kind: e }) {
	return e === "camera" ? /* @__PURE__ */ o("svg", {
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
			/* @__PURE__ */ a("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ a("path", { d: "m22 8-6 4 6 4V8Z" }),
			/* @__PURE__ */ a("path", { d: "M10.5 6.5h3.5a2 2 0 0 1 2 2v2.5" }),
			/* @__PURE__ */ a("path", { d: "M2 6.5v9a2 2 0 0 0 2 2h7" })
		]
	}) : e === "microphone" ? /* @__PURE__ */ o("svg", {
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
			/* @__PURE__ */ a("line", {
				x1: "2",
				y1: "2",
				x2: "22",
				y2: "22"
			}),
			/* @__PURE__ */ a("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }),
			/* @__PURE__ */ a("path", { d: "M15 9.34V5a3 3 0 0 0-5.94-.6" }),
			/* @__PURE__ */ a("path", { d: "M17 16.95A7 7 0 0 1 5 12v-2" }),
			/* @__PURE__ */ a("line", {
				x1: "12",
				y1: "19",
				x2: "12",
				y2: "22"
			})
		]
	}) : /* @__PURE__ */ o("svg", {
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
			/* @__PURE__ */ a("rect", {
				x: "2",
				y: "3",
				width: "20",
				height: "14",
				rx: "2",
				ry: "2"
			}),
			/* @__PURE__ */ a("line", {
				x1: "8",
				y1: "21",
				x2: "16",
				y2: "21"
			}),
			/* @__PURE__ */ a("line", {
				x1: "12",
				y1: "17",
				x2: "12",
				y2: "21"
			}),
			/* @__PURE__ */ a("line", {
				x1: "3",
				y1: "9",
				x2: "21",
				y2: "9"
			})
		]
	});
}
function f({ kind: n, state: r, message: i, onRetry: s, retryLabel: c = "Try again", icon: f, className: p, "data-testid": m }) {
	return /* @__PURE__ */ o("div", {
		"data-testid": m,
		"data-permission-kind": n,
		"data-permission-state": r,
		className: e("flex flex-col items-center text-center gap-3 p-6 max-w-sm", p),
		role: "status",
		"aria-live": "polite",
		children: [
			/* @__PURE__ */ a("div", {
				className: "h-10 w-10 rounded-full bg-warning-bg text-warning-fg grid place-items-center",
				children: f ?? /* @__PURE__ */ a(d, { kind: n })
			}),
			/* @__PURE__ */ a("div", {
				className: "text-base font-semibold text-text-primary",
				children: (l[r] ?? l.unavailable)(n)
			}),
			/* @__PURE__ */ a("p", {
				className: "text-xs text-text-secondary",
				children: i ?? (u[r] ?? u.unavailable)(n)
			}),
			s && /* @__PURE__ */ a(t, {
				variant: "ghost",
				size: "sm",
				onClick: s,
				children: c
			})
		]
	});
}
//#endregion
export { s as n, f as t };
