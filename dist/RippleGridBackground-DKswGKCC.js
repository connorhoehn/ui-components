import { i as e, n as t, t as n } from "./useWebGLCanvas-CjaNVKO9.js";
import { t as r } from "./cn-DhjIN-s0.js";
import { useEffect as i, useMemo as a, useRef as o } from "react";
import { jsx as s } from "react/jsx-runtime";
//#region src/components/shared/RippleGridBackground.tsx
var c = new Float32Array([
	-1,
	-1,
	3,
	-1,
	-1,
	3
]), l = "precision highp float;\n\nattribute vec2 position;\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = position * 0.5 + 0.5;\n  gl_Position = vec4(position, 0.0, 1.0);\n}", u = "precision highp float;\n\nuniform float iTime;\nuniform vec2 iResolution;\nuniform bool enableRainbow;\nuniform vec3 gridColor;\nuniform float rippleIntensity;\nuniform float gridSize;\nuniform float gridThickness;\nuniform float fadeDistance;\nuniform float vignetteStrength;\nuniform float glowIntensity;\nuniform float opacity;\nuniform float gridRotation;\nuniform bool mouseInteraction;\nuniform vec2 mousePosition;\nuniform float mouseInfluence;\nuniform float mouseInteractionRadius;\nuniform bool lightMode;\nvarying vec2 vUv;\n\nfloat pi = 3.141592;\n\nmat2 rotate(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n  return mat2(c, -s, s, c);\n}\n\nvoid main() {\n  vec2 uv = vUv * 2.0 - 1.0;\n  uv.x *= iResolution.x / iResolution.y;\n\n  if (gridRotation != 0.0) {\n    uv = rotate(gridRotation * pi / 180.0) * uv;\n  }\n\n  float dist = length(uv);\n  float func = sin(pi * (iTime - dist));\n  vec2 rippleUv = uv + uv * func * rippleIntensity;\n\n  if (mouseInteraction && mouseInfluence > 0.0) {\n    vec2 mouseUv = (mousePosition * 2.0 - 1.0);\n    mouseUv.x *= iResolution.x / iResolution.y;\n    float mouseDist = length(uv - mouseUv);\n\n    float influence = mouseInfluence * exp(-mouseDist * mouseDist / (mouseInteractionRadius * mouseInteractionRadius));\n\n    float mouseWave = sin(pi * (iTime * 2.0 - mouseDist * 3.0)) * influence;\n    rippleUv += normalize(uv - mouseUv) * mouseWave * rippleIntensity * 0.3;\n  }\n\n  vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);\n  vec2 b = abs(a);\n\n  float aaWidth = 0.5;\n  vec2 smoothB = vec2(\n    smoothstep(0.0, aaWidth, b.x),\n    smoothstep(0.0, aaWidth, b.y)\n  );\n\n  vec3 color = vec3(0.0);\n  color += exp(-gridThickness * smoothB.x * (0.8 + 0.5 * sin(pi * iTime)));\n  color += exp(-gridThickness * smoothB.y);\n  color += 0.5 * exp(-(gridThickness / 4.0) * sin(smoothB.x));\n  color += 0.5 * exp(-(gridThickness / 3.0) * smoothB.y);\n\n  if (glowIntensity > 0.0) {\n    color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x);\n    color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y);\n  }\n\n  float ddd = exp(-2.0 * clamp(pow(dist, fadeDistance), 0.0, 1.0));\n\n  vec2 vignetteCoords = vUv - 0.5;\n  float vignetteDistance = length(vignetteCoords);\n  float vignette = 1.0 - pow(vignetteDistance * 2.0, vignetteStrength);\n  vignette = clamp(vignette, 0.0, 1.0);\n\n  vec3 t;\n  if (enableRainbow) {\n    t = vec3(\n      uv.x * 0.5 + 0.5 * sin(iTime),\n      uv.y * 0.5 + 0.5 * cos(iTime),\n      pow(cos(iTime), 4.0)\n    ) + 0.5;\n  } else {\n    t = gridColor;\n  }\n\n  float finalFade = ddd * vignette;\n  float alpha = length(color) * finalFade * opacity;\n  vec3 effect = color * t * finalFade * opacity;\n  if (lightMode) {\n    float peak = max(effect.r, max(effect.g, effect.b));\n    vec3 chroma = pow(clamp(effect / max(peak, 0.0001), 0.0, 1.0), vec3(1.2));\n    gl_FragColor = vec4(mix(vec3(1.0), chroma, clamp(alpha * 0.94, 0.0, 0.94)), 1.0);\n  } else {\n    gl_FragColor = vec4(effect, alpha);\n  }\n}";
function d(e) {
	let t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e.trim());
	return t ? [
		Number.parseInt(t[1], 16) / 255,
		Number.parseInt(t[2], 16) / 255,
		Number.parseInt(t[3], 16) / 255
	] : [
		1,
		1,
		1
	];
}
var f = {
	lightMode: !0,
	gridColor: "#c9ccd6",
	rippleIntensity: .03,
	gridSize: 14,
	opacity: .8,
	vignetteStrength: 1.2,
	mouseInteraction: !0
}, p = .1, m = .05;
function h({ active: f = !0, enableRainbow: h = !1, gridColor: g = "#ffffff", rippleIntensity: _ = .05, gridSize: v = 10, gridThickness: y = 15, fadeDistance: b = 1.5, vignetteStrength: x = 2, glowIntensity: S = .1, opacity: C = 1, gridRotation: w = 0, mouseInteraction: T = !0, mouseInteractionRadius: E = 1, lightMode: D = !1, pixelRatio: O, className: k, "data-testid": A = "ripple-grid-background" }) {
	let j = a(() => d(g), [g]), M = o({
		enableRainbow: h,
		rgb: j,
		rippleIntensity: _,
		gridSize: v,
		gridThickness: y,
		fadeDistance: b,
		vignetteStrength: x,
		glowIntensity: S,
		opacity: C,
		gridRotation: w,
		mouseInteraction: T,
		mouseInteractionRadius: E,
		lightMode: D
	});
	M.current = {
		enableRainbow: h,
		rgb: j,
		rippleIntensity: _,
		gridSize: v,
		gridThickness: y,
		fadeDistance: b,
		vignetteStrength: x,
		glowIntensity: S,
		opacity: C,
		gridRotation: w,
		mouseInteraction: T,
		mouseInteractionRadius: E,
		lightMode: D
	};
	let N = o({
		x: .5,
		y: .5
	}), P = o({
		x: .5,
		y: .5
	}), F = o(0), I = o(0), L = [
		+!!h,
		g,
		_,
		v,
		y,
		b,
		x,
		S,
		C,
		w,
		E,
		+!!D
	].join(":"), { hostRef: R, canvasRef: z, status: B, reducedMotion: V } = e({
		active: f,
		version: L,
		...O === void 0 ? {} : { pixelRatio: O },
		setup: (e) => {
			let r = n(e, l, u);
			if (!r) return null;
			let i = t(e, c);
			if (!i) return null;
			let a = [
				"iTime",
				"iResolution",
				"enableRainbow",
				"gridColor",
				"rippleIntensity",
				"gridSize",
				"gridThickness",
				"fadeDistance",
				"vignetteStrength",
				"glowIntensity",
				"opacity",
				"gridRotation",
				"mouseInteraction",
				"mousePosition",
				"mouseInfluence",
				"mouseInteractionRadius",
				"lightMode"
			], o = {};
			for (let t of a) o[t] = e.getUniformLocation(r, t);
			return {
				program: r,
				buffer: i,
				position: e.getAttribLocation(r, "position"),
				uniforms: o
			};
		},
		draw: (e, t) => {
			let n = M.current, { gl: r, width: i, height: a, time: o } = t;
			N.current.x += (P.current.x - N.current.x) * p, N.current.y += (P.current.y - N.current.y) * p, F.current += (I.current - F.current) * m, r.clearColor(0, 0, 0, 0), r.clear(r.COLOR_BUFFER_BIT), r.enable(r.BLEND), r.blendFunc(r.SRC_ALPHA, r.ONE_MINUS_SRC_ALPHA), r.useProgram(e.program), e.position >= 0 && (r.bindBuffer(r.ARRAY_BUFFER, e.buffer), r.enableVertexAttribArray(e.position), r.vertexAttribPointer(e.position, 2, r.FLOAT, !1, 0, 0));
			let s = e.uniforms;
			r.uniform1f(s.iTime, o * .001), r.uniform2f(s.iResolution, i, a), r.uniform1i(s.enableRainbow, +!!n.enableRainbow), r.uniform3f(s.gridColor, n.rgb[0], n.rgb[1], n.rgb[2]), r.uniform1f(s.rippleIntensity, V ? 0 : n.rippleIntensity), r.uniform1f(s.gridSize, n.gridSize), r.uniform1f(s.gridThickness, n.gridThickness), r.uniform1f(s.fadeDistance, n.fadeDistance), r.uniform1f(s.vignetteStrength, n.vignetteStrength), r.uniform1f(s.glowIntensity, n.glowIntensity), r.uniform1f(s.opacity, n.opacity), r.uniform1f(s.gridRotation, n.gridRotation), r.uniform1i(s.mouseInteraction, n.mouseInteraction && !V ? 1 : 0), r.uniform2f(s.mousePosition, N.current.x, N.current.y), r.uniform1f(s.mouseInfluence, V ? 0 : F.current), r.uniform1f(s.mouseInteractionRadius, n.mouseInteractionRadius), r.uniform1i(s.lightMode, +!!n.lightMode), r.drawArrays(r.TRIANGLES, 0, 3);
		},
		dispose: (e, t) => {
			t.deleteProgram(e.program), t.deleteBuffer(e.buffer);
		}
	});
	i(() => {
		if (!T || typeof window > "u") return;
		let e = (e) => {
			let t = R.current?.getBoundingClientRect();
			if (!t || t.width === 0 || t.height === 0) return;
			let n = e.clientX >= t.left && e.clientX <= t.right && e.clientY >= t.top && e.clientY <= t.bottom;
			I.current = +!!n, n && (P.current = {
				x: (e.clientX - t.left) / t.width,
				y: 1 - (e.clientY - t.top) / t.height
			});
		};
		return window.addEventListener("pointermove", e, { passive: !0 }), () => window.removeEventListener("pointermove", e);
	}, [T, R]);
	let H = B === "unsupported";
	return /* @__PURE__ */ s("div", {
		ref: R,
		"aria-hidden": "true",
		"data-testid": A,
		"data-motion": V ? "static" : "rippling",
		"data-webgl": H ? "unavailable" : "ready",
		className: r("pointer-events-none overflow-hidden", k),
		children: /* @__PURE__ */ s("canvas", {
			ref: z,
			"data-testid": `${A}-canvas`,
			className: "block h-full w-full",
			...H ? { hidden: !0 } : {}
		})
	});
}
//#endregion
export { h as n, f as t };
