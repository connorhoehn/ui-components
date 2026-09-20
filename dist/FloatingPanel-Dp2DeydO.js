import { t as e } from "./cn-DhjIN-s0.js";
import { useCallback as t, useEffect as n, useLayoutEffect as r, useRef as i, useState as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
import { createPortal as l } from "react-dom";
//#region src/components/shared/DotMeter.tsx
var u = {
	code: {
		label: "text-code-muted",
		filled: "bg-code-blue",
		warn: "bg-code-peach",
		empty: "bg-code-raised",
		value: "text-code-subtle",
		note: "text-code-muted"
	},
	surface: {
		label: "text-text-tertiary",
		filled: "bg-primary",
		warn: "bg-warning",
		empty: "bg-border",
		value: "text-text-secondary",
		note: "text-text-tertiary"
	}
};
function d({ label: t, value: n, segments: r = 10, showPercent: i = !0, note: a, warnAbove: o = .85, tone: l = "code", className: d, "data-testid": f }) {
	let p = u[l], m = Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0, h = Math.round(m * 100), g = m >= 1 ? r : Math.min(r - 1, Math.round(m * r)), _ = m > o;
	return /* @__PURE__ */ c("div", {
		"data-testid": f,
		className: e("flex items-center gap-2 text-[10px] font-mono leading-none", d),
		role: "meter",
		"aria-valuenow": h,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": t ? `${t}: ${h}%${a ? `, ${a}` : ""}` : void 0,
		children: [
			t != null && /* @__PURE__ */ s("span", {
				className: e("w-14 shrink-0 truncate", p.label),
				children: t
			}),
			/* @__PURE__ */ s("span", {
				"aria-hidden": "true",
				className: "flex items-center gap-[3px] shrink-0",
				children: Array.from({ length: r }, (t, n) => /* @__PURE__ */ s("span", { className: e("w-[5px] h-[5px] rounded-full", n < g ? _ ? p.warn : p.filled : p.empty) }, n))
			}),
			i && /* @__PURE__ */ c("span", {
				className: e("w-8 shrink-0 tabular-nums", p.value),
				children: [h, "%"]
			}),
			a != null && /* @__PURE__ */ s("span", {
				className: e("truncate", p.note),
				children: a
			})
		]
	});
}
//#endregion
//#region src/components/shared/SectionLabel.tsx
function f({ children: t, as: n = "span", className: r, "data-testid": i }) {
	return /* @__PURE__ */ s(n, {
		"data-testid": i,
		className: e("text-[10px] font-bold uppercase tracking-[0.06em] text-text-tertiary", r),
		children: t
	});
}
//#endregion
//#region src/components/shared/FloatingPanel.tsx
var p = [
	"top-left",
	"top-right",
	"left-center",
	"right-center",
	"bottom-left",
	"bottom-right"
], m = 2, h = 16, g = 24, _ = 180, ee = 12, v = 0;
function te() {
	return v += 1, v;
}
function ne() {
	return v;
}
function y(e) {
	return typeof e == "string" && p.includes(e);
}
function b(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function re(e) {
	if (typeof window > "u") return null;
	try {
		let t = window.localStorage.getItem(e);
		if (!t) return null;
		let n = JSON.parse(t);
		return !n || typeof n != "object" ? null : n.v === 2 ? !y(n.anchor) || !b(n.dx) || !b(n.dy) ? null : {
			kind: "anchor",
			anchor: n.anchor,
			dx: n.dx,
			dy: n.dy
		} : n.v === 1 && b(n.x) && b(n.y) ? {
			kind: "raw",
			x: n.x,
			y: n.y
		} : null;
	} catch {
		return null;
	}
}
function x(e, t, n, r) {
	try {
		let i = {
			v: m,
			anchor: t,
			dx: Math.round(n),
			dy: Math.round(r)
		};
		window.localStorage.setItem(e, JSON.stringify(i));
	} catch {}
}
function S(e, t, n) {
	if (typeof window > "u") return {
		x: h,
		y: h
	};
	let r = Math.max(h, window.innerWidth - t - h), i = Math.max(h, window.innerHeight - n - h), a = Math.max(h, Math.round((window.innerHeight - n) / 2));
	switch (e) {
		case "top-left": return {
			x: h,
			y: h
		};
		case "top-right": return {
			x: r,
			y: h
		};
		case "left-center": return {
			x: h,
			y: a
		};
		case "right-center": return {
			x: r,
			y: a
		};
		case "bottom-left": return {
			x: h,
			y: i
		};
		default: return {
			x: r,
			y: i
		};
	}
}
function C(e, t, n, r) {
	let i = Math.max(h, window.innerWidth - n - h), a = Math.max(h, window.innerHeight - r - h);
	return {
		x: Math.min(Math.max(e, h), i),
		y: Math.min(Math.max(t, h), a)
	};
}
function w(e, t, n, r, i, a) {
	let o = null, s = Infinity;
	for (let c of i) {
		let i = S(c, n, r), l = i.x - e, u = i.y - t;
		if (a !== void 0 && (Math.abs(l) > a || Math.abs(u) > a)) continue;
		let d = l * l + u * u;
		d < s && (s = d, o = c);
	}
	return o;
}
function T({ open: u, onClose: d, title: f, children: m, defaultPosition: h = "right-center", persistKey: v, snapEnabled: y = !0, snapThreshold: b = g, snapAnchors: T = p, onSnap: E, baseZIndex: D = 9999, widthClassName: O = "w-80", heightClassName: k = "h-[28rem]", tone: A = "dark", zIndexClassName: j = "z-[9999]", className: ie, "data-testid": ae = "floating-panel" }) {
	let M = A === "dark", N = i(null), [P, F] = a(null), I = i(P);
	I.current = P;
	let [L, R] = a(!1), [z, B] = a(null), V = i(null);
	V.current = z;
	let [H, U] = a(!1), W = i(null), [G, oe] = a(null), K = i(null);
	K.current = G;
	let q = i(null), J = i(h);
	J.current = h;
	let Y = i(v);
	Y.current = v;
	let X = i({
		snapEnabled: y,
		snapThreshold: b,
		snapAnchors: T,
		onSnap: E
	});
	X.current = {
		snapEnabled: y,
		snapThreshold: b,
		snapAnchors: T,
		onSnap: E
	};
	let Z = t((e, t, n, r) => {
		let i = Y.current;
		if (!i) return;
		let a = w(e, t, n, r, p) ?? "top-left", o = S(a, n, r);
		x(i, a, e - o.x, t - o.y);
	}, []), Q = t(() => {
		(K.current === null || K.current !== ne()) && oe(te());
	}, []);
	r(() => {
		if (!u) return;
		let e = N.current;
		if (!e || typeof window > "u") return;
		let { width: t, height: n } = e.getBoundingClientRect(), r = Y.current, i = r ? re(r) : null;
		if (i) {
			if (i.kind === "anchor") {
				let e = S(i.anchor, t, n);
				F(C(e.x + i.dx, e.y + i.dy, t, n));
				return;
			}
			let e = C(i.x, i.y, t, n);
			F(e), Z(e.x, e.y, t, n);
			return;
		}
		let a = J.current;
		if (typeof a == "object") {
			F(C(a.x, a.y, t, n));
			return;
		}
		F(S(a, t, n));
	}, [u, Z]);
	let se = t((e) => {
		if (e.pointerType === "mouse" && e.button !== 0) return;
		let t = N.current;
		if (!t) return;
		let n = t.getBoundingClientRect(), r = I.current ?? {
			x: n.left,
			y: n.top
		};
		q.current = {
			pointerX: e.clientX,
			pointerY: e.clientY,
			baseX: r.x,
			baseY: r.y,
			width: n.width,
			height: n.height
		}, U(!1), R(!0), e.preventDefault();
	}, []);
	n(() => {
		if (!L) return;
		let e = (e) => {
			let t = q.current;
			if (!t) return;
			let n = C(t.baseX + (e.clientX - t.pointerX), t.baseY + (e.clientY - t.pointerY), t.width, t.height);
			F(n);
			let { snapEnabled: r, snapThreshold: i, snapAnchors: a } = X.current;
			B(r ? w(n.x, n.y, t.width, t.height, a, i) : null);
		}, t = () => {
			let e = q.current;
			q.current = null, R(!1);
			let t = V.current;
			B(null);
			let n = e?.width ?? 0, r = e?.height ?? 0;
			if (t && e) {
				let e = S(t, n, r);
				F(e), U(!0), W.current && clearTimeout(W.current), W.current = setTimeout(() => U(!1), _);
				let i = Y.current;
				i && x(i, t, 0, 0), X.current.onSnap?.(t);
				return;
			}
			let i = I.current;
			i && Z(i.x, i.y, n, r);
		};
		return document.addEventListener("pointermove", e), document.addEventListener("pointerup", t), () => {
			document.removeEventListener("pointermove", e), document.removeEventListener("pointerup", t);
		};
	}, [L, Z]), n(() => () => {
		W.current && clearTimeout(W.current);
	}, []);
	let ce = t((e) => {
		let t = {
			ArrowLeft: [-1, 0],
			ArrowRight: [1, 0],
			ArrowUp: [0, -1],
			ArrowDown: [0, 1]
		}[e.key];
		if (!t) return;
		let n = N.current, r = I.current;
		if (!n || !r) return;
		e.preventDefault();
		let i = n.getBoundingClientRect(), a = e.shiftKey ? 1 : ee, o = C(r.x + t[0] * a, r.y + t[1] * a, i.width, i.height);
		F(o), Z(o.x, o.y, i.width, i.height);
	}, [Z]);
	if (!u) return null;
	let $ = z ? S(z, N.current?.offsetWidth ?? 0, N.current?.offsetHeight ?? 0) : null;
	return l(/* @__PURE__ */ c(o, { children: [z && $ && /* @__PURE__ */ s("div", {
		"aria-hidden": "true",
		"data-testid": "floating-panel-snap-target",
		"data-anchor": z,
		className: e("fixed pointer-events-none rounded-2xl border-2 border-dashed", O, k, j, M ? "border-white/30 bg-white/5" : "border-border-focus bg-info-bg/40"),
		style: {
			left: $.x,
			top: $.y,
			zIndex: D - 1
		}
	}), /* @__PURE__ */ c("div", {
		ref: N,
		role: "dialog",
		"aria-label": f,
		"data-testid": ae,
		"data-snap-armed": z ?? void 0,
		"data-snapping": H ? "true" : void 0,
		onPointerDownCapture: Q,
		onFocusCapture: Q,
		className: e("fixed flex flex-col rounded-2xl border overflow-hidden backdrop-blur-sm", O, k, j, H && "transition-[left,top] duration-150 ease-out", M ? "bg-call-chrome border-call-chrome-border shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "bg-surface-panel border-border shadow-lg", ie),
		style: {
			...P ? {
				left: P.x,
				top: P.y
			} : {
				left: -9999,
				top: -9999,
				visibility: "hidden"
			},
			...G === null ? null : { zIndex: D + G }
		},
		children: [/* @__PURE__ */ c("div", {
			"data-testid": "floating-panel-header",
			role: "button",
			tabIndex: 0,
			"aria-label": `Move ${f} panel`,
			onPointerDown: se,
			onKeyDown: ce,
			className: e("flex items-center justify-between gap-2 px-3 py-2 border-b shrink-0 select-none touch-none", L ? "cursor-grabbing" : "cursor-grab", M ? "border-white/5" : "border-border"),
			children: [/* @__PURE__ */ s("span", {
				className: e("text-xs font-medium truncate", M ? "text-white/80" : "text-text-primary"),
				children: f
			}), /* @__PURE__ */ s("button", {
				type: "button",
				onClick: d,
				onPointerDown: (e) => e.stopPropagation(),
				"aria-label": "Close",
				"data-testid": "floating-panel-close",
				className: e("w-5 h-5 flex items-center justify-center border-none bg-transparent cursor-pointer rounded transition-colors shrink-0", M ? "text-white/40 hover:text-white/80" : "text-text-tertiary hover:text-text-primary"),
				children: /* @__PURE__ */ c("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					"aria-hidden": "true",
					children: [/* @__PURE__ */ s("line", {
						x1: "18",
						y1: "6",
						x2: "6",
						y2: "18"
					}), /* @__PURE__ */ s("line", {
						x1: "6",
						y1: "6",
						x2: "18",
						y2: "18"
					})]
				})
			})]
		}), /* @__PURE__ */ s("div", {
			"data-testid": "floating-panel-body",
			className: "min-h-0 flex-1 overflow-hidden flex flex-col",
			children: m
		})]
	})] }), document.body);
}
//#endregion
export { d as a, f as i, T as n, S as r, p as t };
