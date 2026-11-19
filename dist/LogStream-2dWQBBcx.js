import { f as e } from "./Button-DwPf_9pb.js";
import { t } from "./Card-B4INuMUn.js";
import { t as n } from "./CardHeader--V2WcTQ0.js";
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
	info: "text-[var(--color-info-fg,#1d4ed8)]",
	warn: "text-[var(--color-warning-fg,#b45309)]",
	error: "text-[var(--color-danger-fg,#b91c1c)]"
};
function u({ lines: u, follow: d = !0, announceLines: f, showTimestamp: p = !0, showLevel: m = !0, showSource: h = !0, title: g = "Log stream", headerSlot: _, emptyMessage: v = "No log lines yet.", maxHeight: y, tone: b = "code", onClear: x, className: S, style: C, "data-testid": w = "log-stream" }) {
	let T = i(null), [E, D] = a(!1);
	r(() => {
		if (!d || E) return;
		let e = T.current;
		e && (e.scrollTop = e.scrollHeight);
	}, [
		u,
		d,
		E
	]);
	let O = () => {
		let e = T.current;
		if (!e) return;
		let t = e.scrollHeight - e.scrollTop - e.clientHeight < 24;
		D(!t);
	}, k = () => {
		let e = T.current;
		e && (e.scrollTop = e.scrollHeight, D(!1));
	}, A = /* @__PURE__ */ s("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ s("span", {
			className: "text-[11px] text-[var(--color-text-tertiary)]",
			"data-testid": `${w}-count`,
			children: [
				u.length,
				" ",
				u.length === 1 ? "line" : "lines"
			]
		}), x && /* @__PURE__ */ o("button", {
			"data-ui-part": "",
			type: "button",
			onClick: x,
			"data-testid": `${w}-clear`,
			className: e("text-[11px] uppercase tracking-wide", "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]", "border border-[var(--color-border)] rounded px-1.5 py-0.5", "cursor-pointer bg-transparent"),
			children: "Clear"
		})]
	});
	return /* @__PURE__ */ s(t, {
		"data-testid": w,
		className: e("flex flex-col", b === "transparent" && "border-transparent bg-transparent", S),
		style: C,
		children: [g !== null && /* @__PURE__ */ o("div", {
			className: "px-4 py-3 border-b border-[var(--color-border)]",
			children: /* @__PURE__ */ o(n, {
				title: g,
				meta: _ ?? A
			})
		}), /* @__PURE__ */ s("div", {
			className: "relative flex-1 min-h-0 flex",
			children: [/* @__PURE__ */ o("div", {
				ref: T,
				onScroll: O,
				role: "log",
				"aria-live": f ?? d ? "polite" : "off",
				"data-testid": `${w}-scroll`,
				className: e("flex-1 overflow-y-auto", "font-mono text-[12px] leading-[1.55]", b === "surface" ? "bg-surface-inset text-text-primary" : b === "transparent" ? "bg-transparent text-[var(--color-text-primary,#e5e7eb)]" : "bg-[var(--color-surface-subtle,#0b1020)] text-[var(--color-text-primary,#e5e7eb)]", "py-2"),
				style: { maxHeight: y },
				children: u.length === 0 ? /* @__PURE__ */ o("div", {
					"data-testid": `${w}-empty`,
					className: "px-3 py-6 text-center text-[11px] text-[var(--color-text-tertiary)]",
					children: v
				}) : u.map((t) => {
					let n = t.level ?? "info", r = String(n), i = c[n] ?? r.toUpperCase(), a = l[n] ?? l.info;
					return /* @__PURE__ */ s("div", {
						role: "listitem",
						"data-testid": `${w}-line`,
						"data-level": t.level || void 0,
						className: "flex items-baseline gap-2 px-3 hover:bg-[var(--color-surface,rgba(255,255,255,0.04))]",
						children: [
							p && t.timestamp && /* @__PURE__ */ o("span", {
								className: "shrink-0 text-[var(--color-text-tertiary)] tabular-nums",
								children: t.timestamp
							}),
							m && t.level && /* @__PURE__ */ o("span", {
								className: e("shrink-0 font-semibold uppercase text-[11px] w-[44px]", a),
								"aria-label": `level ${r.toLowerCase()}`,
								children: i
							}),
							h && t.source && /* @__PURE__ */ s("span", {
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
			}), d && E && /* @__PURE__ */ o("button", {
				"data-ui-part": "",
				type: "button",
				"data-testid": `${w}-jump`,
				onClick: k,
				className: e("absolute bottom-3 left-1/2 -translate-x-1/2", "px-3 py-1 text-[11px] font-semibold uppercase tracking-wide", "bg-primary text-on-primary rounded-full border-none cursor-pointer", "shadow-[0_2px_8px_rgba(0,0,0,0.25)]"),
				children: "Jump to live ↓"
			})]
		})]
	});
}
var d = u;
//#endregion
export { d as n, u as t };
