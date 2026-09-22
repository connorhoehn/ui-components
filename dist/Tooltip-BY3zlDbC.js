import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Card-RQCeAPNU.js";
import { t as n } from "./CardHeader-CsPhVpCm.js";
import { useCallback as r, useEffect as i, useId as a, useLayoutEffect as o, useRef as s, useState as c } from "react";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
import { createPortal as f } from "react-dom";
//#region src/components/shared/LogStream.tsx
var p = {
	debug: "DEBUG",
	info: "INFO",
	warn: "WARN",
	error: "ERROR"
}, m = {
	debug: "text-[var(--color-text-tertiary)]",
	info: "text-[var(--color-info,#3b82f6)]",
	warn: "text-[var(--color-warning,#d97706)]",
	error: "text-[var(--color-danger,#dc2626)]"
};
function h({ lines: r, follow: a = !0, showTimestamp: o = !0, showLevel: l = !0, showSource: f = !0, title: h = "Log stream", headerSlot: g, emptyMessage: _ = "No log lines yet.", maxHeight: v, tone: y = "code", onClear: b, className: x, style: S, "data-testid": C = "log-stream" }) {
	let w = s(null), [T, E] = c(!1);
	i(() => {
		if (!a || T) return;
		let e = w.current;
		e && (e.scrollTop = e.scrollHeight);
	}, [
		r,
		a,
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
	}, k = /* @__PURE__ */ d("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ d("span", {
			className: "text-[10px] text-[var(--color-text-tertiary)]",
			"data-testid": `${C}-count`,
			children: [
				r.length,
				" ",
				r.length === 1 ? "line" : "lines"
			]
		}), b && /* @__PURE__ */ u("button", {
			type: "button",
			onClick: b,
			"data-testid": `${C}-clear`,
			className: e("text-[10px] uppercase tracking-wide", "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]", "border border-[var(--color-border)] rounded px-1.5 py-0.5", "cursor-pointer bg-transparent"),
			children: "Clear"
		})]
	});
	return /* @__PURE__ */ d(t, {
		"data-testid": C,
		className: e("flex flex-col", y === "transparent" && "border-transparent bg-transparent", x),
		style: S,
		children: [h !== null && /* @__PURE__ */ u("div", {
			className: "px-4 py-3 border-b border-[var(--color-border)]",
			children: /* @__PURE__ */ u(n, {
				title: h,
				meta: g ?? k
			})
		}), /* @__PURE__ */ d("div", {
			className: "relative flex-1 min-h-0 flex",
			children: [/* @__PURE__ */ u("div", {
				ref: w,
				onScroll: D,
				role: "log",
				"aria-live": a ? "polite" : "off",
				"data-testid": `${C}-scroll`,
				className: e("flex-1 overflow-y-auto", "font-mono text-[12px] leading-[1.55]", y === "surface" ? "bg-surface-inset text-text-primary" : y === "transparent" ? "bg-transparent text-[var(--color-text-primary,#e5e7eb)]" : "bg-[var(--color-surface-subtle,#0b1020)] text-[var(--color-text-primary,#e5e7eb)]", "py-2"),
				style: { maxHeight: v },
				children: r.length === 0 ? /* @__PURE__ */ u("div", {
					"data-testid": `${C}-empty`,
					className: "px-3 py-6 text-center text-[11px] text-[var(--color-text-tertiary)]",
					children: _
				}) : r.map((t) => {
					let n = t.level ?? "info", r = String(n), i = p[n] ?? r.toUpperCase(), a = m[n] ?? m.info;
					return /* @__PURE__ */ d("div", {
						role: "listitem",
						"data-testid": `${C}-line`,
						"data-level": t.level || void 0,
						className: "flex items-baseline gap-2 px-3 hover:bg-[var(--color-surface,rgba(255,255,255,0.04))]",
						children: [
							o && t.timestamp && /* @__PURE__ */ u("span", {
								className: "shrink-0 text-[var(--color-text-tertiary)] tabular-nums",
								children: t.timestamp
							}),
							l && t.level && /* @__PURE__ */ u("span", {
								className: e("shrink-0 font-semibold uppercase text-[10px] w-[44px]", a),
								"aria-label": `level ${r.toLowerCase()}`,
								children: i
							}),
							f && t.source && /* @__PURE__ */ d("span", {
								className: "shrink-0 text-[var(--color-text-secondary)]",
								children: [
									"[",
									t.source,
									"]"
								]
							}),
							/* @__PURE__ */ u("span", {
								className: "flex-1 whitespace-pre-wrap break-words",
								children: t.message
							})
						]
					}, t.id);
				})
			}), a && T && /* @__PURE__ */ u("button", {
				type: "button",
				"data-testid": `${C}-jump`,
				onClick: O,
				className: e("absolute bottom-3 left-1/2 -translate-x-1/2", "px-3 py-1 text-[10px] font-semibold uppercase tracking-wide", "bg-primary text-white rounded-full border-none cursor-pointer", "shadow-[0_2px_8px_rgba(0,0,0,0.25)]"),
				children: "Jump to live ↓"
			})]
		})]
	});
}
var g = h;
//#endregion
//#region src/components/shared/Tooltip.tsx
function _(e, t, n) {
	switch (t) {
		case "top": return {
			position: "fixed",
			bottom: window.innerHeight - e.top + n,
			left: e.left + e.width / 2,
			transform: "translateX(-50%)"
		};
		case "left": return {
			position: "fixed",
			top: e.top + e.height / 2,
			right: window.innerWidth - e.left + n,
			transform: "translateY(-50%)"
		};
		case "right": return {
			position: "fixed",
			top: e.top + e.height / 2,
			left: e.right + n,
			transform: "translateY(-50%)"
		};
		default: return {
			position: "fixed",
			top: e.bottom + n,
			left: e.left + e.width / 2,
			transform: "translateX(-50%)"
		};
	}
}
function v({ content: t, children: n, placement: p = "top", openDelay: m = 350, closeDelay: h = 100, disabled: g = !1, className: v, "data-testid": y = "tooltip" }) {
	let [b, x] = c(!1), [S, C] = c(null), w = s(null), T = s(null), E = a(), D = r(() => {
		T.current &&= (clearTimeout(T.current), null);
	}, []);
	i(() => D, [D]);
	let O = r(() => {
		let e = w.current;
		e && C(_(e.getBoundingClientRect(), p, 6));
	}, [p]);
	o(() => {
		b ? O() : C(null);
	}, [b, O]);
	let k = r(() => {
		g || (D(), T.current = setTimeout(() => x(!0), m));
	}, [
		D,
		g,
		m
	]), A = r(() => {
		D(), T.current = setTimeout(() => x(!1), h);
	}, [D, h]), j = r(() => {
		D(), x(!1);
	}, [D]);
	return /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ u("span", {
		ref: w,
		className: "inline-flex",
		onMouseEnter: k,
		onMouseLeave: A,
		onFocus: () => {
			D(), x(!0);
		},
		onBlur: j,
		onKeyDown: (e) => {
			e.key === "Escape" && j();
		},
		"aria-describedby": b ? E : void 0,
		children: n
	}), b && S && typeof document < "u" && f(/* @__PURE__ */ u("div", {
		role: "tooltip",
		id: E,
		"data-testid": y,
		className: e("pointer-events-none z-[9500] max-w-xs rounded-md border border-border bg-surface px-2 py-1 text-xs text-text-primary shadow-lg", v),
		style: S,
		children: t
	}), document.body)] });
}
//#endregion
export { h as n, g as r, v as t };
