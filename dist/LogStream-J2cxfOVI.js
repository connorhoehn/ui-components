import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Card-RQCeAPNU.js";
import { t as n } from "./CardHeader-CsPhVpCm.js";
import { useEffect as r, useRef as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/components/shared/LogStream.tsx
var c = {
	debug: "DEBUG",
	info: "INFO",
	warn: "WARN",
	error: "ERROR"
}, l = {
	debug: "text-[var(--color-text-tertiary)]",
	info: "text-[var(--color-info,#3b82f6)]",
	warn: "text-[var(--color-warning,#d97706)]",
	error: "text-[var(--color-danger,#dc2626)]"
};
function u({ lines: u, follow: d = !0, showTimestamp: f = !0, showLevel: p = !0, showSource: m = !0, title: h = "Log stream", headerSlot: g, emptyMessage: _ = "No log lines yet.", maxHeight: v, tone: y = "code", onClear: b, className: x, style: S, "data-testid": C = "log-stream" }) {
	let w = i(null), [T, E] = a(!1);
	r(() => {
		if (!d || T) return;
		let e = w.current;
		e && (e.scrollTop = e.scrollHeight);
	}, [
		u,
		d,
		T
	]);
	let D = () => {
		let e = w.current;
		if (!e) return;
		let t = e.scrollHeight - e.scrollTop - e.clientHeight < 24;
		E(!t);
	}, O = () => {
		let e = w.current;
		e && (e.scrollTop = e.scrollHeight, E(!1));
	}, k = /* @__PURE__ */ s("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ s("span", {
			className: "text-[10px] text-[var(--color-text-tertiary)]",
			"data-testid": `${C}-count`,
			children: [
				u.length,
				" ",
				u.length === 1 ? "line" : "lines"
			]
		}), b && /* @__PURE__ */ o("button", {
			type: "button",
			onClick: b,
			"data-testid": `${C}-clear`,
			className: e("text-[10px] uppercase tracking-wide", "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]", "border border-[var(--color-border)] rounded px-1.5 py-0.5", "cursor-pointer bg-transparent"),
			children: "Clear"
		})]
	});
	return /* @__PURE__ */ s(t, {
		"data-testid": C,
		className: e("flex flex-col", y === "transparent" && "border-transparent bg-transparent", x),
		style: S,
		children: [h !== null && /* @__PURE__ */ o("div", {
			className: "px-4 py-3 border-b border-[var(--color-border)]",
			children: /* @__PURE__ */ o(n, {
				title: h,
				meta: g ?? k
			})
		}), /* @__PURE__ */ s("div", {
			className: "relative flex-1 min-h-0 flex",
			children: [/* @__PURE__ */ o("div", {
				ref: w,
				onScroll: D,
				role: "log",
				"aria-live": d ? "polite" : "off",
				"data-testid": `${C}-scroll`,
				className: e("flex-1 overflow-y-auto", "font-mono text-[12px] leading-[1.55]", y === "surface" ? "bg-surface-inset text-text-primary" : y === "transparent" ? "bg-transparent text-[var(--color-text-primary,#e5e7eb)]" : "bg-[var(--color-surface-subtle,#0b1020)] text-[var(--color-text-primary,#e5e7eb)]", "py-2"),
				style: { maxHeight: v },
				children: u.length === 0 ? /* @__PURE__ */ o("div", {
					"data-testid": `${C}-empty`,
					className: "px-3 py-6 text-center text-[11px] text-[var(--color-text-tertiary)]",
					children: _
				}) : u.map((t) => {
					let n = t.level ?? "info", r = String(n), i = c[n] ?? r.toUpperCase(), a = l[n] ?? l.info;
					return /* @__PURE__ */ s("div", {
						role: "listitem",
						"data-testid": `${C}-line`,
						"data-level": t.level || void 0,
						className: "flex items-baseline gap-2 px-3 hover:bg-[var(--color-surface,rgba(255,255,255,0.04))]",
						children: [
							f && t.timestamp && /* @__PURE__ */ o("span", {
								className: "shrink-0 text-[var(--color-text-tertiary)] tabular-nums",
								children: t.timestamp
							}),
							p && t.level && /* @__PURE__ */ o("span", {
								className: e("shrink-0 font-semibold uppercase text-[10px] w-[44px]", a),
								"aria-label": `level ${r.toLowerCase()}`,
								children: i
							}),
							m && t.source && /* @__PURE__ */ s("span", {
								className: "shrink-0 text-[var(--color-text-secondary)]",
								children: [
									"[",
									t.source,
									"]"
								]
							}),
							/* @__PURE__ */ o("span", {
								className: "flex-1 whitespace-pre-wrap break-words",
								children: t.message
							})
						]
					}, t.id);
				})
			}), d && T && /* @__PURE__ */ o("button", {
				type: "button",
				"data-testid": `${C}-jump`,
				onClick: O,
				className: e("absolute bottom-3 left-1/2 -translate-x-1/2", "px-3 py-1 text-[10px] font-semibold uppercase tracking-wide", "bg-primary text-on-primary rounded-full border-none cursor-pointer", "shadow-[0_2px_8px_rgba(0,0,0,0.25)]"),
				children: "Jump to live ↓"
			})]
		})]
	});
}
var d = u;
//#endregion
export { d as n, u as t };
