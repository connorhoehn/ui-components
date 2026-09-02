import { t as e } from "./cn-DhjIN-s0.js";
import { useCallback as t, useEffect as n, useLayoutEffect as r, useRef as i, useState as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
import { createPortal as l } from "react-dom";
//#region src/components/shared/TitledFrame.tsx
var u = {
	code: {
		frame: "bg-terminal-bg",
		idle: "border-code-border",
		active: "border-code-blue",
		title: "text-code-subtle",
		titleActive: "text-code-blue"
	},
	surface: {
		frame: "bg-surface",
		idle: "border-border",
		active: "border-primary",
		title: "text-text-tertiary",
		titleActive: "text-primary"
	}
};
function d({ title: t, titleAction: n, active: r = !1, tone: i = "code", children: a, onActivate: l, className: d, bodyClassName: f, style: p, "data-testid": m }) {
	let h = u[i];
	return /* @__PURE__ */ c("div", {
		"data-testid": m,
		onMouseDown: l,
		style: p,
		className: e("relative flex flex-col min-h-0 rounded border transition-colors", h.frame, r ? h.active : h.idle, d),
		children: [/* @__PURE__ */ c("div", {
			className: "absolute -top-2 left-2 right-2 h-4 flex items-center gap-1 pointer-events-none",
			children: [/* @__PURE__ */ s("span", {
				className: e("px-1.5 text-[10px] font-mono leading-none truncate max-w-[60%]", h.frame, r ? h.titleActive : h.title),
				children: t
			}), n != null && /* @__PURE__ */ c(o, { children: [/* @__PURE__ */ s("span", { className: "flex-1" }), /* @__PURE__ */ s("span", {
				className: e("px-1 h-full flex items-center pointer-events-auto", h.frame),
				children: n
			})] })]
		}), /* @__PURE__ */ s("div", {
			className: e("flex-1 min-h-0 pt-2", f),
			children: a
		})]
	});
}
//#endregion
//#region src/components/shared/DotMeter.tsx
var f = {
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
function p({ label: t, value: n, segments: r = 10, showPercent: i = !0, note: a, warnAbove: o = .85, tone: l = "code", className: u, "data-testid": d }) {
	let p = f[l], m = Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0, h = Math.round(m * 100), g = m >= 1 ? r : Math.min(r - 1, Math.round(m * r)), _ = m > o;
	return /* @__PURE__ */ c("div", {
		"data-testid": d,
		className: e("flex items-center gap-2 text-[10px] font-mono leading-none", u),
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
function m({ children: t, as: n = "span", className: r, "data-testid": i }) {
	return /* @__PURE__ */ s(n, {
		"data-testid": i,
		className: e("text-[10px] font-bold uppercase tracking-[0.06em] text-text-tertiary", r),
		children: t
	});
}
//#endregion
//#region src/components/shared/InlinePlaceholder.tsx
var h = {
	xs: "text-[11px] gap-2",
	sm: "text-[13px] gap-3"
}, g = {
	start: "justify-start text-left",
	center: "justify-center text-center"
}, _ = {
	surface: "text-text-tertiary",
	code: "text-code-raised"
};
function v({ children: t, action: n, size: r = "xs", align: i = "start", tone: a = "surface", className: o, "data-testid": l = "inline-placeholder" }) {
	return /* @__PURE__ */ c("div", {
		"data-testid": l,
		className: e("flex items-center flex-wrap leading-normal", h[r] ?? h.xs, g[i] ?? g.start, _[a] ?? _.surface, o),
		children: [/* @__PURE__ */ s("span", { children: t }), n != null && /* @__PURE__ */ s("span", {
			className: "shrink-0",
			children: n
		})]
	});
}
//#endregion
//#region src/components/shared/FloatingPanel.tsx
var y = [
	"top-left",
	"top-right",
	"left-center",
	"right-center",
	"bottom-left",
	"bottom-right"
], b = 2, x = 16, ee = 24, te = 180, ne = 12, S = 0;
function re() {
	return S += 1, S;
}
function ie() {
	return S;
}
function C(e) {
	return typeof e == "string" && y.includes(e);
}
function w(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function ae(e) {
	if (typeof window > "u") return null;
	try {
		let t = window.localStorage.getItem(e);
		if (!t) return null;
		let n = JSON.parse(t);
		return !n || typeof n != "object" ? null : n.v === 2 ? !C(n.anchor) || !w(n.dx) || !w(n.dy) ? null : {
			kind: "anchor",
			anchor: n.anchor,
			dx: n.dx,
			dy: n.dy
		} : n.v === 1 && w(n.x) && w(n.y) ? {
			kind: "raw",
			x: n.x,
			y: n.y
		} : null;
	} catch {
		return null;
	}
}
function T(e, t, n, r) {
	try {
		let i = {
			v: b,
			anchor: t,
			dx: Math.round(n),
			dy: Math.round(r)
		};
		window.localStorage.setItem(e, JSON.stringify(i));
	} catch {}
}
function E(e, t, n) {
	if (typeof window > "u") return {
		x,
		y: x
	};
	let r = Math.max(x, window.innerWidth - t - x), i = Math.max(x, window.innerHeight - n - x), a = Math.max(x, Math.round((window.innerHeight - n) / 2));
	switch (e) {
		case "top-left": return {
			x,
			y: x
		};
		case "top-right": return {
			x: r,
			y: x
		};
		case "left-center": return {
			x,
			y: a
		};
		case "right-center": return {
			x: r,
			y: a
		};
		case "bottom-left": return {
			x,
			y: i
		};
		default: return {
			x: r,
			y: i
		};
	}
}
function D(e, t, n, r) {
	let i = Math.max(x, window.innerWidth - n - x), a = Math.max(x, window.innerHeight - r - x);
	return {
		x: Math.min(Math.max(e, x), i),
		y: Math.min(Math.max(t, x), a)
	};
}
function O(e, t, n, r, i, a) {
	let o = null, s = Infinity;
	for (let c of i) {
		let i = E(c, n, r), l = i.x - e, u = i.y - t;
		if (a !== void 0 && (Math.abs(l) > a || Math.abs(u) > a)) continue;
		let d = l * l + u * u;
		d < s && (s = d, o = c);
	}
	return o;
}
function k({ open: u, onClose: d, title: f, children: p, defaultPosition: m = "right-center", persistKey: h, snapEnabled: g = !0, snapThreshold: _ = ee, snapAnchors: v = y, onSnap: b, baseZIndex: x = 9999, widthClassName: S = "w-80", heightClassName: C = "h-[28rem]", tone: w = "dark", zIndexClassName: k = "z-[9999]", className: A, "data-testid": j = "floating-panel" }) {
	let M = w === "dark", N = i(null), [P, F] = a(null), I = i(P);
	I.current = P;
	let [L, R] = a(!1), [z, B] = a(null), V = i(null);
	V.current = z;
	let [H, U] = a(!1), W = i(null), [G, oe] = a(null), K = i(null);
	K.current = G;
	let q = i(null), J = i(m);
	J.current = m;
	let Y = i(h);
	Y.current = h;
	let X = i({
		snapEnabled: g,
		snapThreshold: _,
		snapAnchors: v,
		onSnap: b
	});
	X.current = {
		snapEnabled: g,
		snapThreshold: _,
		snapAnchors: v,
		onSnap: b
	};
	let Z = t((e, t, n, r) => {
		let i = Y.current;
		if (!i) return;
		let a = O(e, t, n, r, y) ?? "top-left", o = E(a, n, r);
		T(i, a, e - o.x, t - o.y);
	}, []), Q = t(() => {
		(K.current === null || K.current !== ie()) && oe(re());
	}, []);
	r(() => {
		if (!u) return;
		let e = N.current;
		if (!e || typeof window > "u") return;
		let { width: t, height: n } = e.getBoundingClientRect(), r = Y.current, i = r ? ae(r) : null;
		if (i) {
			if (i.kind === "anchor") {
				let e = E(i.anchor, t, n);
				F(D(e.x + i.dx, e.y + i.dy, t, n));
				return;
			}
			let e = D(i.x, i.y, t, n);
			F(e), Z(e.x, e.y, t, n);
			return;
		}
		let a = J.current;
		if (typeof a == "object") {
			F(D(a.x, a.y, t, n));
			return;
		}
		F(E(a, t, n));
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
			let n = D(t.baseX + (e.clientX - t.pointerX), t.baseY + (e.clientY - t.pointerY), t.width, t.height);
			F(n);
			let { snapEnabled: r, snapThreshold: i, snapAnchors: a } = X.current;
			B(r ? O(n.x, n.y, t.width, t.height, a, i) : null);
		}, t = () => {
			let e = q.current;
			q.current = null, R(!1);
			let t = V.current;
			B(null);
			let n = e?.width ?? 0, r = e?.height ?? 0;
			if (t && e) {
				let e = E(t, n, r);
				F(e), U(!0), W.current && clearTimeout(W.current), W.current = setTimeout(() => U(!1), te);
				let i = Y.current;
				i && T(i, t, 0, 0), X.current.onSnap?.(t);
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
		let i = n.getBoundingClientRect(), a = e.shiftKey ? 1 : ne, o = D(r.x + t[0] * a, r.y + t[1] * a, i.width, i.height);
		F(o), Z(o.x, o.y, i.width, i.height);
	}, [Z]);
	if (!u) return null;
	let $ = z ? E(z, N.current?.offsetWidth ?? 0, N.current?.offsetHeight ?? 0) : null;
	return l(/* @__PURE__ */ c(o, { children: [z && $ && /* @__PURE__ */ s("div", {
		"aria-hidden": "true",
		"data-testid": "floating-panel-snap-target",
		"data-anchor": z,
		className: e("fixed pointer-events-none rounded-2xl border-2 border-dashed", S, C, k, M ? "border-white/30 bg-white/5" : "border-border-focus bg-info-bg/40"),
		style: {
			left: $.x,
			top: $.y,
			zIndex: x - 1
		}
	}), /* @__PURE__ */ c("div", {
		ref: N,
		role: "dialog",
		"aria-label": f,
		"data-testid": j,
		"data-snap-armed": z ?? void 0,
		"data-snapping": H ? "true" : void 0,
		onPointerDownCapture: Q,
		onFocusCapture: Q,
		className: e("fixed flex flex-col rounded-2xl border overflow-hidden backdrop-blur-sm", S, C, k, H && "transition-[left,top] duration-150 ease-out", M ? "bg-call-chrome border-call-chrome-border shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "bg-surface-panel border-border shadow-lg", A),
		style: {
			...P ? {
				left: P.x,
				top: P.y
			} : {
				left: -9999,
				top: -9999,
				visibility: "hidden"
			},
			...G === null ? null : { zIndex: x + G }
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
			children: p
		})]
	})] }), document.body);
}
//#endregion
export { m as a, v as i, k as n, p as o, E as r, d as s, y as t };
