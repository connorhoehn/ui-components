import { f as e } from "./Button-DwPf_9pb.js";
import { h as t, q as n } from "./Icons-DX0dqgD-.js";
import { useCallback as r, useEffect as i, useLayoutEffect as a, useRef as o, useState as s } from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
import { createPortal as d } from "react-dom";
//#region src/components/shared/FloatingPanel.tsx
var f = [
	"top-left",
	"top-right",
	"left-center",
	"right-center",
	"bottom-left",
	"bottom-right"
], p = 2, m = 16, ee = 24, te = 180, ne = 12, h = 0;
function re() {
	return h += 1, h;
}
function ie() {
	return h;
}
function g(e) {
	return typeof e == "string" && f.includes(e);
}
function _(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function ae(e) {
	if (typeof window > "u") return null;
	try {
		let t = window.localStorage.getItem(e);
		if (!t) return null;
		let n = JSON.parse(t);
		return !n || typeof n != "object" ? null : n.v === 2 ? !g(n.anchor) || !_(n.dx) || !_(n.dy) ? null : {
			kind: "anchor",
			anchor: n.anchor,
			dx: n.dx,
			dy: n.dy
		} : n.v === 1 && _(n.x) && _(n.y) ? {
			kind: "raw",
			x: n.x,
			y: n.y
		} : null;
	} catch {
		return null;
	}
}
function v(e, t, n, r) {
	try {
		let i = {
			v: p,
			anchor: t,
			dx: Math.round(n),
			dy: Math.round(r)
		};
		window.localStorage.setItem(e, JSON.stringify(i));
	} catch {}
}
function y(e, t, n) {
	if (typeof window > "u") return {
		x: m,
		y: m
	};
	let r = Math.max(m, window.innerWidth - t - m), i = Math.max(m, window.innerHeight - n - m), a = Math.max(m, Math.round((window.innerHeight - n) / 2));
	switch (e) {
		case "top-left": return {
			x: m,
			y: m
		};
		case "top-right": return {
			x: r,
			y: m
		};
		case "left-center": return {
			x: m,
			y: a
		};
		case "right-center": return {
			x: r,
			y: a
		};
		case "bottom-left": return {
			x: m,
			y: i
		};
		default: return {
			x: r,
			y: i
		};
	}
}
function b(e, t, n, r) {
	let i = Math.max(m, window.innerWidth - n - m), a = Math.max(m, window.innerHeight - r - m);
	return {
		x: Math.min(Math.max(e, m), i),
		y: Math.min(Math.max(t, m), a)
	};
}
function x(e, t, n, r, i, a) {
	let o = null, s = Infinity;
	for (let c of i) {
		let i = y(c, n, r), l = i.x - e, u = i.y - t;
		if (a !== void 0 && (Math.abs(l) > a || Math.abs(u) > a)) continue;
		let d = l * l + u * u;
		d < s && (s = d, o = c);
	}
	return o;
}
function S({ open: p, onClose: h, title: g, children: _, defaultPosition: S = "right-center", persistKey: w, snapEnabled: T = !0, snapThreshold: oe = ee, snapAnchors: se = f, onSnap: ce, baseZIndex: E = 9999, widthClassName: le = "w-80", heightClassName: ue = "h-[28rem]", tone: de = "dark", zIndexClassName: D = "z-[9999]", className: fe, "data-testid": pe = "floating-panel", headerActions: me, closeLabel: he = "Close", closeIcon: ge = "close", minimized: O = !1, onMinimizedChange: k, minimizedLabel: A, minimizedContent: _e }) {
	let j = de === "dark", M = o(null), [N, P] = s(null), F = o(N);
	F.current = N;
	let [I, L] = s(!1), [R, z] = s(null), B = o(null);
	B.current = R;
	let [ve, V] = s(!1), H = o(null), [U, ye] = s(null), W = o(null);
	W.current = U;
	let G = o(null), be = o(S);
	be.current = S;
	let K = o(w);
	K.current = w;
	let q = o({
		snapEnabled: T,
		snapThreshold: oe,
		snapAnchors: se,
		onSnap: ce
	});
	q.current = {
		snapEnabled: T,
		snapThreshold: oe,
		snapAnchors: se,
		onSnap: ce
	};
	let J = r((e, t, n, r) => {
		let i = K.current;
		if (!i) return;
		let a = x(e, t, n, r, f) ?? "top-left", o = y(a, n, r);
		v(i, a, e - o.x, t - o.y);
	}, []), Y = r(() => {
		(W.current === null || W.current !== ie()) && ye(re());
	}, []), X = o(!1), Z = r((e, t) => {
		let n = K.current, r = n ? ae(n) : null;
		if (r) {
			if (r.kind === "anchor") {
				let n = y(r.anchor, e, t);
				P(b(n.x + r.dx, n.y + r.dy, e, t));
				return;
			}
			let n = b(r.x, r.y, e, t);
			P(n), J(n.x, n.y, e, t);
			return;
		}
		let i = be.current;
		if (typeof i == "object") {
			P(b(i.x, i.y, e, t));
			return;
		}
		P(y(i, e, t));
	}, [J]);
	a(() => {
		if (!p) return;
		let e = M.current;
		if (!e || typeof window > "u") return;
		X.current = !1;
		let { width: t, height: n } = e.getBoundingClientRect();
		Z(t, n);
	}, [p, Z]), i(() => {
		if (!p || typeof window > "u") return;
		let e = () => {
			let e = M.current;
			if (!e) return;
			let { width: t, height: n } = e.getBoundingClientRect(), r = F.current;
			X.current && r ? P(b(r.x, r.y, t, n)) : Z(t, n);
		};
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, [p, Z]);
	let xe = r((e) => {
		if (e.pointerType === "mouse" && e.button !== 0) return;
		let t = M.current;
		if (!t) return;
		let n = t.getBoundingClientRect(), r = F.current ?? {
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
		}, V(!1), X.current = !0, L(!0), e.preventDefault();
	}, []);
	i(() => {
		if (!I) return;
		let e = (e) => {
			let t = G.current;
			if (!t) return;
			let n = b(t.baseX + (e.clientX - t.pointerX), t.baseY + (e.clientY - t.pointerY), t.width, t.height);
			P(n);
			let { snapEnabled: r, snapThreshold: i, snapAnchors: a } = q.current;
			z(r ? x(n.x, n.y, t.width, t.height, a, i) : null);
		}, t = () => {
			let e = G.current;
			G.current = null, L(!1);
			let t = B.current;
			z(null);
			let n = e?.width ?? 0, r = e?.height ?? 0;
			if (t && e) {
				let e = y(t, n, r);
				P(e), V(!0), H.current && clearTimeout(H.current), H.current = setTimeout(() => V(!1), te);
				let i = K.current;
				i && v(i, t, 0, 0), q.current.onSnap?.(t);
				return;
			}
			let i = F.current;
			i && J(i.x, i.y, n, r);
		};
		return document.addEventListener("pointermove", e), document.addEventListener("pointerup", t), () => {
			document.removeEventListener("pointermove", e), document.removeEventListener("pointerup", t);
		};
	}, [I, J]), i(() => () => {
		H.current && clearTimeout(H.current);
	}, []);
	let Se = r((e) => {
		let t = {
			ArrowLeft: [-1, 0],
			ArrowRight: [1, 0],
			ArrowUp: [0, -1],
			ArrowDown: [0, 1]
		}[e.key];
		if (!t) return;
		let n = M.current, r = F.current;
		if (!n || !r) return;
		e.preventDefault(), X.current = !0;
		let i = n.getBoundingClientRect(), a = e.shiftKey ? 1 : ne, o = b(r.x + t[0] * a, r.y + t[1] * a, i.width, i.height);
		P(o), J(o.x, o.y, i.width, i.height);
	}, [J]), Ce = o(null);
	if (i(() => {
		if (!O) return;
		let e = typeof document > "u" ? null : document.activeElement;
		e && M.current?.contains(e) && Ce.current?.focus();
	}, [O]), !p) return null;
	let Q = (() => {
		if (!O) return null;
		let e = M.current, t = e?.offsetWidth ?? 0, n = e?.offsetHeight ?? 0, r = typeof window > "u" ? 0 : window.innerWidth, i = typeof window > "u" ? 0 : window.innerHeight, a = N ?? {
			x: r - t - m,
			y: i - n - m
		}, o = a.x + t / 2 > r / 2, s = a.y + n / 2 > i / 2;
		return {
			...o ? { right: Math.max(0, r - (a.x + t)) } : { left: Math.max(0, a.x) },
			...s ? { bottom: Math.max(0, i - (a.y + n)) } : { top: Math.max(0, a.y) }
		};
	})(), $ = R ? y(R, M.current?.offsetWidth ?? 0, M.current?.offsetHeight ?? 0) : null;
	return d(/* @__PURE__ */ u(c, { children: [
		R && $ && /* @__PURE__ */ l("div", {
			"aria-hidden": "true",
			"data-testid": "floating-panel-snap-target",
			"data-anchor": R,
			className: e("fixed pointer-events-none rounded-2xl border-2 border-dashed", le, ue, D, j ? "border-white/30 bg-white/5" : "border-border-focus bg-info-bg/40"),
			style: {
				left: $.x,
				top: $.y,
				zIndex: E - 1
			}
		}),
		/* @__PURE__ */ u("div", {
			ref: M,
			role: "dialog",
			"aria-label": g,
			"data-testid": pe,
			"data-snap-armed": R ?? void 0,
			"data-snapping": ve ? "true" : void 0,
			onPointerDownCapture: Y,
			onFocusCapture: Y,
			"aria-hidden": O || void 0,
			"data-minimized": O ? "true" : void 0,
			className: e("fixed flex flex-col rounded-2xl border overflow-hidden backdrop-blur-sm", O && "invisible pointer-events-none", le, ue, D, ve && "transition-[left,top] duration-150 ease-out", j ? "bg-call-chrome border-call-chrome-border shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "bg-surface-panel border-border shadow-lg", fe),
			style: {
				...N ? {
					left: N.x,
					top: N.y
				} : {
					left: -9999,
					top: -9999,
					visibility: "hidden"
				},
				...U === null ? null : { zIndex: E + U }
			},
			children: [/* @__PURE__ */ u("div", {
				"data-ui-part": "",
				"data-testid": "floating-panel-header",
				role: "button",
				tabIndex: 0,
				"aria-label": `Move ${g} panel`,
				onPointerDown: xe,
				onKeyDown: Se,
				className: e("flex items-center justify-between gap-2 px-3 py-2 border-b shrink-0 select-none touch-none", I ? "cursor-grabbing" : "cursor-grab", j ? "border-white/5" : "border-border"),
				children: [/* @__PURE__ */ l("span", {
					className: e("text-xs font-medium truncate", j ? "text-white/80" : "text-text-primary"),
					children: g
				}), /* @__PURE__ */ u("div", {
					"data-ui-part": "",
					"data-testid": "floating-panel-actions",
					className: "flex items-center gap-1 shrink-0",
					onPointerDown: (e) => e.stopPropagation(),
					onKeyDown: (e) => e.stopPropagation(),
					children: [
						me,
						k && ge !== "minimize" && /* @__PURE__ */ l("button", {
							"data-ui-part": "",
							type: "button",
							onClick: () => k(!0),
							"aria-label": "Minimise",
							"data-testid": "floating-panel-minimize",
							className: C(j),
							children: /* @__PURE__ */ l(n, {
								size: 12,
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ l("button", {
							"data-ui-part": "",
							type: "button",
							onClick: h,
							"aria-label": he,
							"data-testid": "floating-panel-close",
							className: C(j),
							children: l(ge === "minimize" ? n : t, {
								size: 12,
								"aria-hidden": "true"
							})
						})
					]
				})]
			}), /* @__PURE__ */ l("div", {
				"data-testid": "floating-panel-body",
				className: "min-h-0 flex-1 overflow-hidden flex flex-col",
				children: _
			})]
		}),
		Q && /* @__PURE__ */ u("button", {
			ref: Ce,
			type: "button",
			"data-ui-part": "",
			"data-testid": "floating-panel-pill",
			"aria-label": `Show ${A ?? g}`,
			onClick: () => k?.(!1),
			className: e("fixed flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium cursor-pointer shadow-lg", D, j ? "bg-call-chrome border-call-chrome-border text-white/80 hover:text-white" : "bg-surface-panel border-border text-text-primary hover:bg-surface-hover"),
			style: {
				...Q,
				...U === null ? null : { zIndex: E + U }
			},
			children: [/* @__PURE__ */ l("span", {
				className: "truncate max-w-[12rem]",
				children: A ?? g
			}), _e]
		})
	] }), document.body);
}
function C(t) {
	return e("w-5 h-5 flex items-center justify-center border-none bg-transparent cursor-pointer rounded transition-colors shrink-0", t ? "text-white/40 hover:text-white/80" : "text-text-tertiary hover:text-text-primary");
}
//#endregion
export { S as n, y as r, f as t };
