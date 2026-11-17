import { i as e, n as t, t as n } from "./useWebGLCanvas-CjaNVKO9.js";
import { d as r } from "./Button-DQoeE5dN.js";
import { t as i } from "./RisingParticles-BkeXugHs.js";
import { createContext as a, useContext as o, useEffect as s, useLayoutEffect as c, useMemo as l, useRef as u, useState as d } from "react";
import { jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/components/shared/ParticlesBackground.tsx
var m = 250, h = [
	"#ffffff",
	"#ffffff",
	"#ffffff"
], g = [
	"#ffffff",
	"#c7d2fe",
	"#a5b4fc"
], _ = "precision highp float;\n\nattribute vec3 position;\nattribute vec4 random;\nattribute vec3 color;\n\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform float uTime;\nuniform float uSpread;\nuniform float uBaseSize;\nuniform float uSizeRandomness;\n\nvarying vec4 vRandom;\nvarying vec3 vColor;\n\nvoid main() {\n  vRandom = random;\n  vColor = color;\n\n  vec3 pos = position * uSpread;\n  pos.z *= 10.0;\n\n  vec4 mPos = modelMatrix * vec4(pos, 1.0);\n  float t = uTime;\n  mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);\n  mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);\n  mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);\n\n  vec4 mvPos = viewMatrix * mPos;\n\n  if (uSizeRandomness == 0.0) {\n    gl_PointSize = uBaseSize;\n  } else {\n    gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);\n  }\n\n  gl_Position = projectionMatrix * mvPos;\n}", v = "precision highp float;\n\nuniform float uTime;\nuniform float uAlphaParticles;\nvarying vec4 vRandom;\nvarying vec3 vColor;\n\nvoid main() {\n  vec2 uv = gl_PointCoord.xy;\n  float d = length(uv - vec2(0.5));\n\n  if (uAlphaParticles < 0.5) {\n    if (d > 0.5) {\n      discard;\n    }\n    gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);\n  } else {\n    float circle = smoothstep(0.5, 0.4, d) * 0.8;\n    gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);\n  }\n}";
function y(e) {
	let t = e.replace(/^#/, "");
	t.length === 3 && (t = t.split("").map((e) => e + e).join(""));
	let n = Number.parseInt(t.slice(0, 6), 16);
	return Number.isFinite(n) ? [
		(n >> 16 & 255) / 255,
		(n >> 8 & 255) / 255,
		(n & 255) / 255
	] : [
		1,
		1,
		1
	];
}
function b(e, t, n, r) {
	let i = 1 / Math.tan(e * Math.PI / 360), a = 1 / (n - r);
	return new Float32Array([
		i / t,
		0,
		0,
		0,
		0,
		i,
		0,
		0,
		0,
		0,
		(r + n) * a,
		-1,
		0,
		0,
		2 * r * n * a,
		0
	]);
}
function x(e, t) {
	let n = /* @__PURE__ */ new Float32Array(16);
	for (let r = 0; r < 4; r += 1) for (let i = 0; i < 4; i += 1) {
		let a = 0;
		for (let n = 0; n < 4; n += 1) a += e[n * 4 + i] * t[r * 4 + n];
		n[r * 4 + i] = a;
	}
	return n;
}
function S(e, t, n, r, i) {
	let a = new Float32Array([
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		e,
		t,
		0,
		1
	]), o = Math.cos(n), s = Math.sin(n), c = Math.cos(r), l = Math.sin(r), u = Math.cos(i), d = Math.sin(i), f = new Float32Array([
		1,
		0,
		0,
		0,
		0,
		o,
		s,
		0,
		0,
		-s,
		o,
		0,
		0,
		0,
		0,
		1
	]), p = new Float32Array([
		c,
		0,
		-l,
		0,
		0,
		1,
		0,
		0,
		l,
		0,
		c,
		0,
		0,
		0,
		0,
		1
	]);
	return x(a, x(new Float32Array([
		u,
		d,
		0,
		0,
		-d,
		u,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1
	]), x(p, f)));
}
function C(e) {
	return new Float32Array([
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		-e,
		1
	]);
}
var w = 24;
function T(e, t, n, r) {
	if (t === void 0 || !(t > 0) || n <= 1 || r <= 1) return e;
	let i = Math.ceil(Math.max(0, n) * Math.max(0, r) * t / 1e4);
	return Math.min(e, Math.max(w, i));
}
function E({ active: e = !0, particleCount: t = 200, particleSpread: n = 10, speed: i = .1, particleColors: a, moveParticlesOnHover: o = !1, particleHoverFactor: c = 1, alphaParticles: l = !1, particleBaseSize: u = 100, sizeRandomness: g = 1, cameraDistance: _ = 20, disableRotation: v = !1, pixelRatio: y, seed: b = 1, fallbackIntensity: x = "medium", tone: S = "night", density: C, className: w, children: T, "data-testid": E = "particles-background" }) {
	let [O, k] = d(e);
	return s(() => {
		if (e) {
			k(!0);
			return;
		}
		let t = setTimeout(() => k(!1), m);
		return () => clearTimeout(t);
	}, [e]), /* @__PURE__ */ p("div", {
		"data-testid": E,
		"data-active": e ? "true" : "false",
		"data-tone": S,
		className: r("relative isolate", O && "uic-particles-ground overflow-hidden", w),
		children: [O && /* @__PURE__ */ f(D, {
			active: e,
			particleCount: t,
			particleSpread: n,
			speed: i,
			particleColors: a,
			moveParticlesOnHover: o,
			particleHoverFactor: c,
			alphaParticles: l,
			particleBaseSize: u,
			sizeRandomness: g,
			cameraDistance: _,
			disableRotation: v,
			...y === void 0 ? {} : { pixelRatio: y },
			seed: b,
			fallbackIntensity: x,
			...C === void 0 ? {} : { density: C },
			testId: E
		}, `${Math.max(1, Math.round(t))}|${(a?.length ? a : h).join(",")}`), T]
	});
}
function D(a) {
	let { testId: o } = a, c = u(a);
	c.current = a;
	let d = u({
		x: 0,
		y: 0
	}), m = u(0), g = u(0), x = (a.particleColors?.length ? a.particleColors : h).join(","), w = l(() => {
		let e = Math.max(1, Math.round(a.particleCount)), t = new Float32Array(e * 3), n = new Float32Array(e * 4), r = new Float32Array(e * 3), i = x.split(",");
		for (let a = 0; a < e; a += 1) {
			let e = 0, o = 0, s = 0, c = 0;
			do
				e = Math.random() * 2 - 1, o = Math.random() * 2 - 1, s = Math.random() * 2 - 1, c = e * e + o * o + s * s;
			while (c > 1 || c === 0);
			let l = Math.cbrt(Math.random());
			t.set([
				e * l,
				o * l,
				s * l
			], a * 3), n.set([
				Math.random(),
				Math.random(),
				Math.random(),
				Math.random()
			], a * 4), r.set(y(i[Math.floor(Math.random() * i.length)] ?? "#ffffff"), a * 3);
		}
		return {
			count: e,
			positions: t,
			randoms: n,
			colors: r
		};
	}, [a.particleCount, x]), E = u(w);
	E.current = w;
	let D = [
		w.count,
		a.particleSpread,
		a.particleBaseSize,
		a.sizeRandomness,
		+!!a.alphaParticles,
		a.cameraDistance,
		+!!a.disableRotation
	].join(":"), { hostRef: O, canvasRef: k, status: A, reducedMotion: j } = e({
		active: a.active,
		version: D,
		...a.pixelRatio === void 0 ? {} : { pixelRatio: a.pixelRatio },
		setup: (e) => {
			let r = n(e, _, v);
			if (!r) return null;
			let { positions: i, randoms: a, colors: o, count: s } = E.current, c = t(e, i), l = t(e, a), u = t(e, o);
			return !c || !l || !u ? null : {
				program: r,
				buffers: {
					position: c,
					random: l,
					color: u
				},
				attributes: {
					position: e.getAttribLocation(r, "position"),
					random: e.getAttribLocation(r, "random"),
					color: e.getAttribLocation(r, "color")
				},
				uniforms: {
					modelMatrix: e.getUniformLocation(r, "modelMatrix"),
					viewMatrix: e.getUniformLocation(r, "viewMatrix"),
					projectionMatrix: e.getUniformLocation(r, "projectionMatrix"),
					uTime: e.getUniformLocation(r, "uTime"),
					uSpread: e.getUniformLocation(r, "uSpread"),
					uBaseSize: e.getUniformLocation(r, "uBaseSize"),
					uSizeRandomness: e.getUniformLocation(r, "uSizeRandomness"),
					uAlphaParticles: e.getUniformLocation(r, "uAlphaParticles")
				},
				count: s
			};
		},
		draw: (e, t) => {
			let n = c.current, { gl: r, width: i, height: a, delta: o } = t;
			g.current += o * n.speed, n.disableRotation || (m.current += .01 * n.speed), r.clearColor(0, 0, 0, 0), r.clear(r.COLOR_BUFFER_BIT), r.disable(r.DEPTH_TEST), r.enable(r.BLEND), r.blendFunc(r.SRC_ALPHA, r.ONE_MINUS_SRC_ALPHA), r.useProgram(e.program);
			let s = (e, t, n) => {
				e < 0 || (r.bindBuffer(r.ARRAY_BUFFER, t), r.enableVertexAttribArray(e), r.vertexAttribPointer(e, n, r.FLOAT, !1, 0, 0));
			};
			s(e.attributes.position, e.buffers.position, 3), s(e.attributes.random, e.buffers.random, 4), s(e.attributes.color, e.buffers.color, 3);
			let l = Math.max(1, i / Math.max(1, O.current?.clientWidth || i)), u = n.disableRotation ? 0 : Math.sin(g.current * 2e-4) * .1, f = n.disableRotation ? 0 : Math.cos(g.current * 5e-4) * .15, p = n.moveParticlesOnHover ? -d.current.x * n.particleHoverFactor : 0, h = n.moveParticlesOnHover ? -d.current.y * n.particleHoverFactor : 0;
			r.uniformMatrix4fv(e.uniforms.projectionMatrix ?? null, !1, b(15, i / Math.max(1, a), .1, 100)), r.uniformMatrix4fv(e.uniforms.viewMatrix ?? null, !1, C(n.cameraDistance)), r.uniformMatrix4fv(e.uniforms.modelMatrix ?? null, !1, S(p, h, u, f, n.disableRotation ? 0 : m.current)), r.uniform1f(e.uniforms.uTime ?? null, g.current * .001), r.uniform1f(e.uniforms.uSpread ?? null, n.particleSpread), r.uniform1f(e.uniforms.uBaseSize ?? null, n.particleBaseSize * l), r.uniform1f(e.uniforms.uSizeRandomness ?? null, n.sizeRandomness), r.uniform1f(e.uniforms.uAlphaParticles ?? null, +!!n.alphaParticles), r.drawArrays(r.POINTS, 0, T(e.count, n.density, i / l, a / l));
		},
		dispose: (e, t) => {
			t.deleteProgram(e.program), t.deleteBuffer(e.buffers.position), t.deleteBuffer(e.buffers.random), t.deleteBuffer(e.buffers.color);
		}
	});
	s(() => {
		if (!a.moveParticlesOnHover || typeof window > "u") return;
		let e = (e) => {
			let t = O.current?.getBoundingClientRect();
			if (!(!t || t.width === 0 || t.height === 0)) {
				if (!(e.clientX >= t.left && e.clientX <= t.right && e.clientY >= t.top && e.clientY <= t.bottom)) {
					d.current = {
						x: 0,
						y: 0
					};
					return;
				}
				d.current = {
					x: (e.clientX - t.left) / t.width * 2 - 1,
					y: -((e.clientY - t.top) / t.height * 2 - 1)
				};
			}
		};
		return window.addEventListener("pointermove", e, { passive: !0 }), () => window.removeEventListener("pointermove", e);
	}, [a.moveParticlesOnHover, O]);
	let M = A === "unsupported";
	return /* @__PURE__ */ p("div", {
		ref: O,
		"aria-hidden": "true",
		"data-testid": `${o}-backdrop`,
		"data-motion": j ? "static" : "drifting",
		"data-webgl": M ? "unavailable" : "ready",
		className: r("uic-particles-field pointer-events-none absolute inset-0 -z-10 transition-opacity duration-[250ms] motion-reduce:transition-none", a.active ? "uic-particles-in opacity-100" : "opacity-0"),
		children: [/* @__PURE__ */ f("canvas", {
			ref: k,
			"data-testid": `${o}-canvas`,
			className: "block h-full w-full",
			...M ? { hidden: !0 } : {}
		}), M && /* @__PURE__ */ f(i, {
			active: a.active,
			intensity: a.fallbackIntensity,
			seed: a.seed,
			className: "absolute inset-0",
			"data-testid": `${o}-fallback`
		})]
	});
}
//#endregion
//#region src/components/shared/backdropTone.ts
function O() {
	return typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function k(e, t, n = O()) {
	if (e !== "auto") return e;
	for (let e = t?.parentElement ?? null; e; e = e.parentElement) {
		let t = e.getAttribute("data-backdrop-tone");
		if (t === "night" || t === "graphite") return t;
		let n = e.getAttribute("data-theme");
		if (n === "dark") return "night";
		if (n === "light") return "graphite";
	}
	return n ? "night" : "graphite";
}
function A(e, t, n = !0) {
	let [r, i] = d(() => t === "auto" ? "graphite" : t);
	return c(() => {
		if (t !== "auto") {
			i(t);
			return;
		}
		if (!n) return;
		let r = () => i(k("auto", e.current));
		r();
		let a = [];
		if (typeof MutationObserver < "u" && typeof document < "u") {
			let e = new MutationObserver(r);
			e.observe(document.documentElement, {
				attributes: !0,
				subtree: !0,
				attributeFilter: ["data-theme", "data-backdrop-tone"]
			}), a.push(() => e.disconnect());
		}
		if (typeof window < "u" && typeof window.matchMedia == "function") {
			let e = window.matchMedia("(prefers-color-scheme: dark)");
			e.addEventListener?.("change", r), a.push(() => e.removeEventListener?.("change", r));
		}
		return () => a.forEach((e) => e());
	}, [
		t,
		n,
		e
	]), r;
}
var j = [
	"#f4f4f5",
	"#d4d4d8",
	"#a1a1aa"
], M = a(null);
function N() {
	return o(M);
}
//#endregion
export { A as a, T as c, N as i, j as n, g as o, k as r, E as s, M as t };
