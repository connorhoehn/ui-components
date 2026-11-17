import { t as e } from "./cn-D4QmbyEy.js";
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
function re() {
	return p += 1, p;
}
function ie() {
	return p;
}
function m(e) {
	return typeof e == "string" && u.includes(e);
}
function h(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function ae(e) {
	if (typeof window > "u") return null;
	try {
		let t = window.localStorage.getItem(e);
		if (!t) return null;
		let n = JSON.parse(t);
		return !n || typeof n != "object" ? null : n.v === 2 ? !m(n.anchor) || !h(n.dx) || !h(n.dy) ? null : {
			kind: "anchor",
			anchor: n.anchor,
			dx: n.dx,
			dy: n.dy
		} : n.v === 1 && h(n.x) && h(n.y) ? {
			kind: "raw",
			x: n.x,
			y: n.y
		} : null;
	} catch {
		return null;
	}
}
function g(e, t, n, r) {
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
function _(e, t, n) {
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
function v(e, t, n, r) {
	let i = Math.max(f, window.innerWidth - n - f), a = Math.max(f, window.innerHeight - r - f);
	return {
		x: Math.min(Math.max(e, f), i),
		y: Math.min(Math.max(t, f), a)
	};
}
function y(e, t, n, r, i, a) {
	let o = null, s = Infinity;
	for (let c of i) {
		let i = _(c, n, r), l = i.x - e, u = i.y - t;
		if (a !== void 0 && (Math.abs(l) > a || Math.abs(u) > a)) continue;
		let d = l * l + u * u;
		d < s && (s = d, o = c);
	}
	return o;
}
function b({ open: d, onClose: f, title: p, children: m, defaultPosition: h = "right-center", persistKey: b, snapEnabled: x = !0, snapThreshold: S = ee, snapAnchors: C = u, onSnap: w, baseZIndex: T = 9999, widthClassName: E = "w-80", heightClassName: D = "h-[28rem]", tone: oe = "dark", zIndexClassName: O = "z-[9999]", className: se, "data-testid": k = "floating-panel" }) {
	let A = oe === "dark", j = i(null), [M, N] = a(null), P = i(M);
	P.current = M;
	let [F, I] = a(!1), [L, R] = a(null), z = i(null);
	z.current = L;
	let [B, V] = a(!1), H = i(null), [U, ce] = a(null), W = i(null);
	W.current = U;
	let G = i(null), K = i(h);
	K.current = h;
	let q = i(b);
	q.current = b;
	let J = i({
		snapEnabled: x,
		snapThreshold: S,
		snapAnchors: C,
		onSnap: w
	});
	J.current = {
		snapEnabled: x,
		snapThreshold: S,
		snapAnchors: C,
		onSnap: w
	};
	let Y = t((e, t, n, r) => {
		let i = q.current;
		if (!i) return;
		let a = y(e, t, n, r, u) ?? "top-left", o = _(a, n, r);
		g(i, a, e - o.x, t - o.y);
	}, []), X = t(() => {
		(W.current === null || W.current !== ie()) && ce(re());
	}, []), Z = i(!1), Q = t((e, t) => {
		let n = q.current, r = n ? ae(n) : null;
		if (r) {
			if (r.kind === "anchor") {
				let n = _(r.anchor, e, t);
				N(v(n.x + r.dx, n.y + r.dy, e, t));
				return;
			}
			let n = v(r.x, r.y, e, t);
			N(n), Y(n.x, n.y, e, t);
			return;
		}
		let i = K.current;
		if (typeof i == "object") {
			N(v(i.x, i.y, e, t));
			return;
		}
		N(_(i, e, t));
	}, [Y]);
	r(() => {
		if (!d) return;
		let e = j.current;
		if (!e || typeof window > "u") return;
		Z.current = !1;
		let { width: t, height: n } = e.getBoundingClientRect();
		Q(t, n);
	}, [d, Q]), n(() => {
		if (!d || typeof window > "u") return;
		let e = () => {
			let e = j.current;
			if (!e) return;
			let { width: t, height: n } = e.getBoundingClientRect(), r = P.current;
			Z.current && r ? N(v(r.x, r.y, t, n)) : Q(t, n);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, [d, Q]);
	let le = t((e) => {
		if (e.pointerType === "mouse" && e.button !== 0) return;
		let t = j.current;
		if (!t) return;
		let n = t.getBoundingClientRect(), r = P.current ?? {
			x: n.left,
			y: n.top
		};
		G.current = {
			pointerX: e.clientX,
			pointerY: e.clientY,
			baseX: r.x,
			baseY: r.y,
			width: n.width,
			height: n.height
		}, V(!1), Z.current = !0, I(!0), e.preventDefault();
	}, []);
	n(() => {
		if (!F) return;
		let e = (e) => {
			let t = G.current;
			if (!t) return;
			let n = v(t.baseX + (e.clientX - t.pointerX), t.baseY + (e.clientY - t.pointerY), t.width, t.height);
			N(n);
			let { snapEnabled: r, snapThreshold: i, snapAnchors: a } = J.current;
			R(r ? y(n.x, n.y, t.width, t.height, a, i) : null);
		}, t = () => {
			let e = G.current;
			G.current = null, I(!1);
			let t = z.current;
			R(null);
			let n = e?.width ?? 0, r = e?.height ?? 0;
			if (t && e) {
				let e = _(t, n, r);
				N(e), V(!0), H.current && clearTimeout(H.current), H.current = setTimeout(() => V(!1), te);
				let i = q.current;
				i && g(i, t, 0, 0), J.current.onSnap?.(t);
				return;
			}
			let i = P.current;
			i && Y(i.x, i.y, n, r);
		};
		return document.addEventListener("pointermove", e), document.addEventListener("pointerup", t), () => {
			document.removeEventListener("pointermove", e), document.removeEventListener("pointerup", t);
		};
	}, [F, Y]), n(() => () => {
		H.current && clearTimeout(H.current);
	}, []);
	let ue = t((e) => {
		let t = {
			ArrowLeft: [-1, 0],
			ArrowRight: [1, 0],
			ArrowUp: [0, -1],
			ArrowDown: [0, 1]
		}[e.key];
		if (!t) return;
		let n = j.current, r = P.current;
		if (!n || !r) return;
		e.preventDefault(), Z.current = !0;
		let i = n.getBoundingClientRect(), a = e.shiftKey ? 1 : ne, o = v(r.x + t[0] * a, r.y + t[1] * a, i.width, i.height);
		N(o), Y(o.x, o.y, i.width, i.height);
	}, [Y]);
	if (!d) return null;
	let $ = L ? _(L, j.current?.offsetWidth ?? 0, j.current?.offsetHeight ?? 0) : null;
	return l(/* @__PURE__ */ c(o, { children: [L && $ && /* @__PURE__ */ s("div", {
		"aria-hidden": "true",
		"data-testid": "floating-panel-snap-target",
		"data-anchor": L,
		className: e("fixed pointer-events-none rounded-2xl border-2 border-dashed", E, D, O, A ? "border-white/30 bg-white/5" : "border-border-focus bg-info-bg/40"),
		style: {
			left: $.x,
			top: $.y,
			zIndex: T - 1
		}
	}), /* @__PURE__ */ c("div", {
		ref: j,
		role: "dialog",
		"aria-label": p,
		"data-testid": k,
		"data-snap-armed": L ?? void 0,
		"data-snapping": B ? "true" : void 0,
		onPointerDownCapture: X,
		onFocusCapture: X,
		className: e("fixed flex flex-col rounded-2xl border overflow-hidden backdrop-blur-sm", E, D, O, B && "transition-[left,top] duration-150 ease-out", A ? "bg-call-chrome border-call-chrome-border shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "bg-surface-panel border-border shadow-lg", se),
		style: {
			...M ? {
				left: M.x,
				top: M.y
			} : {
				left: -9999,
				top: -9999,
				visibility: "hidden"
			},
			...U === null ? null : { zIndex: T + U }
		},
		children: [/* @__PURE__ */ c("div", {
			"data-ui-part": "",
			"data-testid": "floating-panel-header",
			role: "button",
			tabIndex: 0,
			"aria-label": `Move ${p} panel`,
			onPointerDown: le,
			onKeyDown: ue,
			className: e("flex items-center justify-between gap-2 px-3 py-2 border-b shrink-0 select-none touch-none", F ? "cursor-grabbing" : "cursor-grab", A ? "border-white/5" : "border-border"),
			children: [/* @__PURE__ */ s("span", {
				className: e("text-xs font-medium truncate", A ? "text-white/80" : "text-text-primary"),
				children: p
			}), /* @__PURE__ */ s("button", {
				"data-ui-part": "",
				type: "button",
				onClick: f,
				onPointerDown: (e) => e.stopPropagation(),
				"aria-label": "Close",
				"data-testid": "floating-panel-close",
				className: e("w-5 h-5 flex items-center justify-center border-none bg-transparent cursor-pointer rounded transition-colors shrink-0", A ? "text-white/40 hover:text-white/80" : "text-text-tertiary hover:text-text-primary"),
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
export { b as n, _ as r, u as t };
