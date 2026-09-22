import { t as e } from "./cn-DhjIN-s0.js";
import { useCallback as t, useEffect as n, useLayoutEffect as r, useRef as i, useState as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
import { createPortal as l } from "react-dom";
//#region src/components/shared/FloatingPanel.tsx
var u = [
	"top-left",
	"top-right",
	"left-center",
	"right-center",
	"bottom-left",
	"bottom-right"
], d = 2, f = 16, ee = 24, te = 180, ne = 12, p = 0;
function m() {
	return p += 1, p;
}
function re() {
	return p;
}
function h(e) {
	return typeof e == "string" && u.includes(e);
}
function g(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function ie(e) {
	if (typeof window > "u") return null;
	try {
		let t = window.localStorage.getItem(e);
		if (!t) return null;
		let n = JSON.parse(t);
		return !n || typeof n != "object" ? null : n.v === 2 ? !h(n.anchor) || !g(n.dx) || !g(n.dy) ? null : {
			kind: "anchor",
			anchor: n.anchor,
			dx: n.dx,
			dy: n.dy
		} : n.v === 1 && g(n.x) && g(n.y) ? {
			kind: "raw",
			x: n.x,
			y: n.y
		} : null;
	} catch {
		return null;
	}
}
function _(e, t, n, r) {
	try {
		let i = {
			v: d,
			anchor: t,
			dx: Math.round(n),
			dy: Math.round(r)
		};
		window.localStorage.setItem(e, JSON.stringify(i));
	} catch {}
}
function v(e, t, n) {
	if (typeof window > "u") return {
		x: f,
		y: f
	};
	let r = Math.max(f, window.innerWidth - t - f), i = Math.max(f, window.innerHeight - n - f), a = Math.max(f, Math.round((window.innerHeight - n) / 2));
	switch (e) {
		case "top-left": return {
			x: f,
			y: f
		};
		case "top-right": return {
			x: r,
			y: f
		};
		case "left-center": return {
			x: f,
			y: a
		};
		case "right-center": return {
			x: r,
			y: a
		};
		case "bottom-left": return {
			x: f,
			y: i
		};
		default: return {
			x: r,
			y: i
		};
	}
}
function y(e, t, n, r) {
	let i = Math.max(f, window.innerWidth - n - f), a = Math.max(f, window.innerHeight - r - f);
	return {
		x: Math.min(Math.max(e, f), i),
		y: Math.min(Math.max(t, f), a)
	};
}
function b(e, t, n, r, i, a) {
	let o = null, s = Infinity;
	for (let c of i) {
		let i = v(c, n, r), l = i.x - e, u = i.y - t;
		if (a !== void 0 && (Math.abs(l) > a || Math.abs(u) > a)) continue;
		let d = l * l + u * u;
		d < s && (s = d, o = c);
	}
	return o;
}
function x({ open: d, onClose: f, title: p, children: h, defaultPosition: g = "right-center", persistKey: x, snapEnabled: S = !0, snapThreshold: C = ee, snapAnchors: w = u, onSnap: T, baseZIndex: E = 9999, widthClassName: D = "w-80", heightClassName: O = "h-[28rem]", tone: ae = "dark", zIndexClassName: k = "z-[9999]", className: A, "data-testid": j = "floating-panel" }) {
	let M = ae === "dark", N = i(null), [P, F] = a(null), I = i(P);
	I.current = P;
	let [L, R] = a(!1), [z, B] = a(null), V = i(null);
	V.current = z;
	let [H, U] = a(!1), W = i(null), [G, oe] = a(null), K = i(null);
	K.current = G;
	let q = i(null), J = i(g);
	J.current = g;
	let Y = i(x);
	Y.current = x;
	let X = i({
		snapEnabled: S,
		snapThreshold: C,
		snapAnchors: w,
		onSnap: T
	});
	X.current = {
		snapEnabled: S,
		snapThreshold: C,
		snapAnchors: w,
		onSnap: T
	};
	let Z = t((e, t, n, r) => {
		let i = Y.current;
		if (!i) return;
		let a = b(e, t, n, r, u) ?? "top-left", o = v(a, n, r);
		_(i, a, e - o.x, t - o.y);
	}, []), Q = t(() => {
		(K.current === null || K.current !== re()) && oe(m());
	}, []);
	r(() => {
		if (!d) return;
		let e = N.current;
		if (!e || typeof window > "u") return;
		let { width: t, height: n } = e.getBoundingClientRect(), r = Y.current, i = r ? ie(r) : null;
		if (i) {
			if (i.kind === "anchor") {
				let e = v(i.anchor, t, n);
				F(y(e.x + i.dx, e.y + i.dy, t, n));
				return;
			}
			let e = y(i.x, i.y, t, n);
			F(e), Z(e.x, e.y, t, n);
			return;
		}
		let a = J.current;
		if (typeof a == "object") {
			F(y(a.x, a.y, t, n));
			return;
		}
		F(v(a, t, n));
	}, [d, Z]);
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
			let n = y(t.baseX + (e.clientX - t.pointerX), t.baseY + (e.clientY - t.pointerY), t.width, t.height);
			F(n);
			let { snapEnabled: r, snapThreshold: i, snapAnchors: a } = X.current;
			B(r ? b(n.x, n.y, t.width, t.height, a, i) : null);
		}, t = () => {
			let e = q.current;
			q.current = null, R(!1);
			let t = V.current;
			B(null);
			let n = e?.width ?? 0, r = e?.height ?? 0;
			if (t && e) {
				let e = v(t, n, r);
				F(e), U(!0), W.current && clearTimeout(W.current), W.current = setTimeout(() => U(!1), te);
				let i = Y.current;
				i && _(i, t, 0, 0), X.current.onSnap?.(t);
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
		let i = n.getBoundingClientRect(), a = e.shiftKey ? 1 : ne, o = y(r.x + t[0] * a, r.y + t[1] * a, i.width, i.height);
		F(o), Z(o.x, o.y, i.width, i.height);
	}, [Z]);
	if (!d) return null;
	let $ = z ? v(z, N.current?.offsetWidth ?? 0, N.current?.offsetHeight ?? 0) : null;
	return l(/* @__PURE__ */ c(o, { children: [z && $ && /* @__PURE__ */ s("div", {
		"aria-hidden": "true",
		"data-testid": "floating-panel-snap-target",
		"data-anchor": z,
		className: e("fixed pointer-events-none rounded-2xl border-2 border-dashed", D, O, k, M ? "border-white/30 bg-white/5" : "border-border-focus bg-info-bg/40"),
		style: {
			left: $.x,
			top: $.y,
			zIndex: E - 1
		}
	}), /* @__PURE__ */ c("div", {
		ref: N,
		role: "dialog",
		"aria-label": p,
		"data-testid": j,
		"data-snap-armed": z ?? void 0,
		"data-snapping": H ? "true" : void 0,
		onPointerDownCapture: Q,
		onFocusCapture: Q,
		className: e("fixed flex flex-col rounded-2xl border overflow-hidden backdrop-blur-sm", D, O, k, H && "transition-[left,top] duration-150 ease-out", M ? "bg-call-chrome border-call-chrome-border shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "bg-surface-panel border-border shadow-lg", A),
		style: {
			...P ? {
				left: P.x,
				top: P.y
			} : {
				left: -9999,
				top: -9999,
				visibility: "hidden"
			},
			...G === null ? null : { zIndex: E + G }
		},
		children: [/* @__PURE__ */ c("div", {
			"data-testid": "floating-panel-header",
			role: "button",
			tabIndex: 0,
			"aria-label": `Move ${p} panel`,
			onPointerDown: se,
			onKeyDown: ce,
			className: e("flex items-center justify-between gap-2 px-3 py-2 border-b shrink-0 select-none touch-none", L ? "cursor-grabbing" : "cursor-grab", M ? "border-white/5" : "border-border"),
			children: [/* @__PURE__ */ s("span", {
				className: e("text-xs font-medium truncate", M ? "text-white/80" : "text-text-primary"),
				children: p
			}), /* @__PURE__ */ s("button", {
				type: "button",
				onClick: f,
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
			children: h
		})]
	})] }), document.body);
}
//#endregion
export { x as n, v as r, u as t };
