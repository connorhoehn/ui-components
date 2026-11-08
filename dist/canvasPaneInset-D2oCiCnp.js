import { i as e, n as t, t as n } from "./useWebGLCanvas-CjaNVKO9.js";
import { d as r } from "./Button-DQoeE5dN.js";
import { createContext as i, useContext as a, useEffect as o, useMemo as s, useRef as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/components/shared/RippleGridBackground.tsx
var d = new Float32Array([
	-1,
	-1,
	3,
	-1,
	-1,
	3
]), f = "precision highp float;\n\nattribute vec2 position;\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = position * 0.5 + 0.5;\n  gl_Position = vec4(position, 0.0, 1.0);\n}", p = "precision highp float;\n\nuniform float iTime;\nuniform vec2 iResolution;\nuniform bool enableRainbow;\nuniform vec3 gridColor;\nuniform float rippleIntensity;\nuniform float gridSize;\nuniform float gridThickness;\nuniform float fadeDistance;\nuniform float vignetteStrength;\nuniform float glowIntensity;\nuniform float opacity;\nuniform float edgeFade;\nuniform float gridRotation;\nuniform bool mouseInteraction;\nuniform vec2 mousePosition;\nuniform float mouseInfluence;\nuniform float mouseInteractionRadius;\nuniform bool lightMode;\nvarying vec2 vUv;\n\nfloat pi = 3.141592;\n\nmat2 rotate(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n  return mat2(c, -s, s, c);\n}\n\nvoid main() {\n  vec2 uv = vUv * 2.0 - 1.0;\n  uv.x *= iResolution.x / iResolution.y;\n\n  if (gridRotation != 0.0) {\n    uv = rotate(gridRotation * pi / 180.0) * uv;\n  }\n\n  float dist = length(uv);\n  float func = sin(pi * (iTime - dist));\n  vec2 rippleUv = uv + uv * func * rippleIntensity;\n\n  if (mouseInteraction && mouseInfluence > 0.0) {\n    vec2 mouseUv = (mousePosition * 2.0 - 1.0);\n    mouseUv.x *= iResolution.x / iResolution.y;\n    float mouseDist = length(uv - mouseUv);\n\n    float influence = mouseInfluence * exp(-mouseDist * mouseDist / (mouseInteractionRadius * mouseInteractionRadius));\n\n    float mouseWave = sin(pi * (iTime * 2.0 - mouseDist * 3.0)) * influence;\n    rippleUv += normalize(uv - mouseUv) * mouseWave * rippleIntensity * 0.3;\n  }\n\n  vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);\n  vec2 b = abs(a);\n\n  float aaWidth = 0.5;\n  vec2 smoothB = vec2(\n    smoothstep(0.0, aaWidth, b.x),\n    smoothstep(0.0, aaWidth, b.y)\n  );\n\n  vec3 color = vec3(0.0);\n  color += exp(-gridThickness * smoothB.x * (0.8 + 0.5 * sin(pi * iTime)));\n  color += exp(-gridThickness * smoothB.y);\n  color += 0.5 * exp(-(gridThickness / 4.0) * sin(smoothB.x));\n  color += 0.5 * exp(-(gridThickness / 3.0) * smoothB.y);\n\n  if (glowIntensity > 0.0) {\n    color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x);\n    color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y);\n  }\n\n  // 0 at the centre of the section, 1 at its corners, for any aspect ratio.\n  float sectionDist = length(vUv * 2.0 - 1.0) / 1.41421356;\n  float ddd = exp(-2.0 * clamp(pow(sectionDist, fadeDistance), 0.0, 1.0));\n\n  float vignette = 1.0 - pow(sectionDist, vignetteStrength);\n  vignette = clamp(vignette, 0.0, 1.0);\n\n  vec3 t;\n  if (enableRainbow) {\n    t = vec3(\n      uv.x * 0.5 + 0.5 * sin(iTime),\n      uv.y * 0.5 + 0.5 * cos(iTime),\n      pow(cos(iTime), 4.0)\n    ) + 0.5;\n  } else {\n    t = gridColor;\n  }\n\n  float finalFade = mix(1.0, ddd * vignette, edgeFade);\n  float alpha = length(color) * finalFade * opacity;\n  vec3 effect = color * t * finalFade * opacity;\n  if (lightMode) {\n    float peak = max(effect.r, max(effect.g, effect.b));\n    vec3 chroma = pow(clamp(effect / max(peak, 0.0001), 0.0, 1.0), vec3(1.2));\n    gl_FragColor = vec4(mix(vec3(1.0), chroma, clamp(alpha * 0.94, 0.0, 0.94)), 1.0);\n  } else {\n    gl_FragColor = vec4(effect, alpha);\n  }\n}";
function m(e) {
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
var h = {
	lightMode: !0,
	gridColor: "#c9ccd6",
	rippleIntensity: .03,
	gridSize: 14,
	opacity: .8,
	vignetteStrength: 1.2,
	edgeFade: .35,
	mouseInteraction: !0
}, g = {
	...h,
	lightMode: !1,
	gridColor: "#6b7280",
	glowIntensity: 0,
	opacity: .32
}, _ = .1, v = .05;
function y({ active: i = !0, enableRainbow: a = !1, gridColor: u = "#ffffff", rippleIntensity: h = .05, gridSize: g = 10, gridThickness: y = 15, fadeDistance: b = 1.5, vignetteStrength: x = 2, glowIntensity: S = .1, opacity: C = 1, edgeFade: w = 1, gridRotation: T = 0, mouseInteraction: E = !0, mouseInteractionRadius: D = 1, lightMode: O = !1, pixelRatio: k, className: A, "data-testid": j = "ripple-grid-background" }) {
	let M = s(() => m(u), [u]), N = c({
		enableRainbow: a,
		rgb: M,
		rippleIntensity: h,
		gridSize: g,
		gridThickness: y,
		fadeDistance: b,
		vignetteStrength: x,
		glowIntensity: S,
		opacity: C,
		edgeFade: w,
		gridRotation: T,
		mouseInteraction: E,
		mouseInteractionRadius: D,
		lightMode: O
	});
	N.current = {
		enableRainbow: a,
		rgb: M,
		rippleIntensity: h,
		gridSize: g,
		gridThickness: y,
		fadeDistance: b,
		vignetteStrength: x,
		glowIntensity: S,
		opacity: C,
		edgeFade: w,
		gridRotation: T,
		mouseInteraction: E,
		mouseInteractionRadius: D,
		lightMode: O
	};
	let P = c({
		x: .5,
		y: .5
	}), F = c({
		x: .5,
		y: .5
	}), I = c(0), L = c(0), R = [
		+!!a,
		u,
		h,
		g,
		y,
		b,
		x,
		S,
		C,
		w,
		T,
		D,
		+!!O
	].join(":"), { hostRef: z, canvasRef: B, status: V, reducedMotion: H } = e({
		active: i,
		version: R,
		...k === void 0 ? {} : { pixelRatio: k },
		setup: (e) => {
			let r = n(e, f, p);
			if (!r) return null;
			let i = t(e, d);
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
				"edgeFade",
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
			let n = N.current, { gl: r, width: i, height: a, time: o } = t;
			P.current.x += (F.current.x - P.current.x) * _, P.current.y += (F.current.y - P.current.y) * _, I.current += (L.current - I.current) * v, r.clearColor(0, 0, 0, 0), r.clear(r.COLOR_BUFFER_BIT), r.enable(r.BLEND), r.blendFunc(r.SRC_ALPHA, r.ONE_MINUS_SRC_ALPHA), r.useProgram(e.program), e.position >= 0 && (r.bindBuffer(r.ARRAY_BUFFER, e.buffer), r.enableVertexAttribArray(e.position), r.vertexAttribPointer(e.position, 2, r.FLOAT, !1, 0, 0));
			let s = e.uniforms;
			r.uniform1f(s.iTime, o * .001), r.uniform2f(s.iResolution, i, a), r.uniform1i(s.enableRainbow, +!!n.enableRainbow), r.uniform3f(s.gridColor, n.rgb[0], n.rgb[1], n.rgb[2]), r.uniform1f(s.rippleIntensity, H ? 0 : n.rippleIntensity), r.uniform1f(s.gridSize, n.gridSize), r.uniform1f(s.gridThickness, n.gridThickness), r.uniform1f(s.fadeDistance, n.fadeDistance), r.uniform1f(s.vignetteStrength, n.vignetteStrength), r.uniform1f(s.glowIntensity, n.glowIntensity), r.uniform1f(s.opacity, n.opacity), r.uniform1f(s.edgeFade, Math.min(1, Math.max(0, n.edgeFade))), r.uniform1f(s.gridRotation, n.gridRotation), r.uniform1i(s.mouseInteraction, n.mouseInteraction && !H ? 1 : 0), r.uniform2f(s.mousePosition, P.current.x, P.current.y), r.uniform1f(s.mouseInfluence, H ? 0 : I.current), r.uniform1f(s.mouseInteractionRadius, n.mouseInteractionRadius), r.uniform1i(s.lightMode, +!!n.lightMode), r.drawArrays(r.TRIANGLES, 0, 3);
		},
		dispose: (e, t) => {
			t.deleteProgram(e.program), t.deleteBuffer(e.buffer);
		}
	});
	o(() => {
		if (!E || typeof window > "u") return;
		let e = (e) => {
			let t = z.current?.getBoundingClientRect();
			if (!t || t.width === 0 || t.height === 0) return;
			let n = e.clientX >= t.left && e.clientX <= t.right && e.clientY >= t.top && e.clientY <= t.bottom;
			L.current = +!!n, n && (F.current = {
				x: (e.clientX - t.left) / t.width,
				y: 1 - (e.clientY - t.top) / t.height
			});
		};
		return window.addEventListener("pointermove", e, { passive: !0 }), () => window.removeEventListener("pointermove", e);
	}, [E, z]);
	let U = V === "unsupported";
	return /* @__PURE__ */ l("div", {
		ref: z,
		"aria-hidden": "true",
		"data-testid": j,
		"data-motion": H ? "static" : "rippling",
		"data-webgl": U ? "unavailable" : "ready",
		className: r("pointer-events-none overflow-hidden", A),
		children: /* @__PURE__ */ l("canvas", {
			ref: B,
			"data-testid": `${j}-canvas`,
			className: "block h-full w-full",
			...U ? { hidden: !0 } : {}
		})
	});
}
//#endregion
//#region src/components/shared/SuggestionRow.tsx
function b({ active: e, onHighlight: t, onPick: n, primary: i, secondary: a, leading: o, id: s, className: c, "data-testid": d }) {
	return /* @__PURE__ */ u("button", {
		"data-ui-part": "",
		type: "button",
		role: "option",
		id: s,
		"aria-selected": e,
		onMouseEnter: t,
		onClick: n,
		"data-testid": d,
		"data-active": e ? "true" : "false",
		className: r("flex w-full cursor-pointer items-center gap-2 border-none px-3 py-1.5 text-left text-[12px] text-text-primary", "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary", e ? "bg-primary-bg" : "bg-transparent hover:bg-surface-hover", c),
		children: [o != null && /* @__PURE__ */ l("span", {
			className: "inline-flex shrink-0",
			children: o
		}), /* @__PURE__ */ u("span", {
			className: "flex min-w-0 flex-1 flex-col items-start gap-px",
			children: [/* @__PURE__ */ l("span", {
				className: "w-full truncate font-semibold",
				children: i
			}), a != null && /* @__PURE__ */ l("span", {
				className: "w-full truncate text-[11px] text-text-tertiary",
				children: a
			})]
		})]
	});
}
//#endregion
//#region src/components/shared/MeterRow.tsx
function x({ onClick: e, title: t, label: n, note: i, meter: a, meterWidth: o = "sm", className: s, "aria-label": c, "data-testid": d }) {
	return /* @__PURE__ */ u("button", {
		"data-ui-part": "",
		type: "button",
		onClick: e,
		title: t,
		"aria-label": c,
		"data-testid": d,
		className: r("flex w-full cursor-pointer items-center gap-2 rounded-md border-none bg-transparent px-1.5 py-1 text-left text-[12px] text-text-primary hover:bg-surface-hover", "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary", s),
		children: [/* @__PURE__ */ u("span", {
			className: "min-w-0 flex-1 truncate",
			children: [/* @__PURE__ */ l("span", {
				className: "font-semibold",
				children: n
			}), i != null && /* @__PURE__ */ u("span", {
				className: "text-[11px] text-text-tertiary",
				children: [" · ", i]
			})]
		}), /* @__PURE__ */ l("span", {
			className: r("shrink-0", o === "md" ? "w-18" : "w-11"),
			children: a
		})]
	});
}
var S = i({ right: 0 });
function C() {
	return a(S);
}
//#endregion
export { h as a, b as i, C as n, g as o, x as r, y as s, S as t };
