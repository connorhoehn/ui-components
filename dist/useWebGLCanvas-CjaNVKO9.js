import { t as e } from "./usePrefersReducedMotion-Cllucr7i.js";
import { useCallback as t, useEffect as n, useRef as r, useState as i } from "react";
//#region src/hooks/useWebGLCanvas.ts
var a = 100, o = {
	alpha: !0,
	antialias: !0,
	depth: !1,
	premultipliedAlpha: !1,
	powerPreference: "low-power"
}, s = 2;
function c(e, t) {
	let n = {
		...o,
		...t
	}, r = (t) => {
		try {
			return e.getContext(t, n) ?? null;
		} catch {
			return null;
		}
	};
	return r("webgl2") ?? r("webgl") ?? r("experimental-webgl");
}
function l(e, t, n) {
	let r = e.createShader(t);
	return r ? (e.shaderSource(r, n), e.compileShader(r), e.getShaderParameter(r, e.COMPILE_STATUS) ? r : (typeof console < "u" && console.warn("[ui-components] shader failed to compile:", e.getShaderInfoLog(r)), e.deleteShader(r), null)) : null;
}
function u(e, t, n) {
	let r = l(e, e.VERTEX_SHADER, t), i = r ? l(e, e.FRAGMENT_SHADER, n) : null;
	if (!r || !i) return r && e.deleteShader(r), i && e.deleteShader(i), null;
	let a = e.createProgram();
	return a ? (e.attachShader(a, r), e.attachShader(a, i), e.linkProgram(a), e.deleteShader(r), e.deleteShader(i), e.getProgramParameter(a, e.LINK_STATUS) ? a : (typeof console < "u" && console.warn("[ui-components] shader program failed to link:", e.getProgramInfoLog(a)), e.deleteProgram(a), null)) : (e.deleteShader(r), e.deleteShader(i), null);
}
function d(e, t) {
	let n = e.createBuffer();
	return n ? (e.bindBuffer(e.ARRAY_BUFFER, n), e.bufferData(e.ARRAY_BUFFER, t, e.STATIC_DRAW), n) : null;
}
function f(o) {
	let { active: l = !0, pixelRatio: u, attributes: d } = o, f = r(null), p = r(null), m = e(), [h, g] = i("pending"), [_, v] = i(0), y = r(o);
	y.current = o;
	let b = r({
		active: l,
		reducedMotion: m,
		visible: !0,
		hidden: !1
	}), x = r(() => {}), S = r(() => {});
	return n(() => {
		let e = p.current;
		if (!e) return;
		let t = f.current ?? e, n = c(e, y.current.attributes);
		if (!n) {
			g("unsupported");
			return;
		}
		let r = y.current.setup(n);
		if (r == null) {
			n.getExtension("WEBGL_lose_context")?.loseContext(), g("unsupported");
			return;
		}
		g("ready");
		let i = null, o = 0, l = 0, u = 0, d = !1, m = () => {
			let n = Math.min(y.current.pixelRatio ?? (typeof window > "u" ? 1 : window.devicePixelRatio || 1), s), r = Math.max(1, Math.round((t.clientWidth || e.clientWidth || 1) * n)), i = Math.max(1, Math.round((t.clientHeight || e.clientHeight || 1) * n));
			return (e.width !== r || e.height !== i) && (e.width = r, e.height = i), {
				width: r,
				height: i
			};
		}, h = (e) => {
			if (d) return;
			let { width: t, height: i } = m();
			n.viewport(0, 0, t, i), y.current.draw(r, {
				gl: n,
				width: t,
				height: i,
				time: l,
				delta: e,
				frame: u
			}), u += 1;
		}, _ = (e) => {
			let t = o === 0 ? 0 : Math.min(a, e - o);
			o = e, l += t, h(t), i = requestAnimationFrame(_);
		}, C = () => {
			i !== null && cancelAnimationFrame(i), i = null, o = 0;
		}, w = () => b.current.active && !b.current.reducedMotion && b.current.visible && !b.current.hidden;
		x.current = () => {
			if (!d) {
				if (w()) {
					i === null && (o = 0, i = requestAnimationFrame(_));
					return;
				}
				C();
			}
		}, S.current = () => {
			i === null && h(0);
		};
		let T = typeof ResizeObserver > "u" ? null : new ResizeObserver(() => S.current());
		T?.observe(t);
		let E = typeof IntersectionObserver > "u" ? null : new IntersectionObserver((e) => {
			b.current.visible = e.some((e) => e.isIntersecting), x.current();
		}, { threshold: 0 });
		E?.observe(t);
		let D = () => {
			b.current.hidden = typeof document < "u" && document.hidden, x.current();
		};
		document.addEventListener("visibilitychange", D);
		let O = (e) => {
			e.preventDefault(), C(), d = !0, g("unsupported");
		}, k = () => v((e) => e + 1);
		return e.addEventListener("webglcontextlost", O), e.addEventListener("webglcontextrestored", k), x.current(), () => {
			d = !0, C(), x.current = () => {}, S.current = () => {}, T?.disconnect(), E?.disconnect(), document.removeEventListener("visibilitychange", D), e.removeEventListener("webglcontextlost", O), e.removeEventListener("webglcontextrestored", k), y.current.dispose?.(r, n), n.getExtension("WEBGL_lose_context")?.loseContext();
		};
	}, [_]), n(() => {
		b.current.active = l, x.current();
	}, [l]), n(() => {
		b.current.reducedMotion = m, x.current();
	}, [m]), n(() => {
		S.current();
	}, [o.version]), {
		hostRef: f,
		canvasRef: p,
		status: h,
		reducedMotion: m,
		redraw: t(() => S.current(), [])
	};
}
//#endregion
export { f as i, d as n, c as r, u as t };
