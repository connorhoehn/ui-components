import { i as e, n as t, t as n } from "./useWebGLCanvas-CjaNVKO9.js";
import { t as r } from "./cn-DhjIN-s0.js";
import { t as i } from "./RisingParticles-DqlZf8HC.js";
import { useEffect as a, useMemo as o, useRef as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/components/shared/ParticlesBackground.tsx
var d = 250, f = [
	"#ffffff",
	"#ffffff",
	"#ffffff"
], p = [
	"#ffffff",
	"#c7d2fe",
	"#a5b4fc"
], m = "precision highp float;\n\nattribute vec3 position;\nattribute vec4 random;\nattribute vec3 color;\n\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform float uTime;\nuniform float uSpread;\nuniform float uBaseSize;\nuniform float uSizeRandomness;\n\nvarying vec4 vRandom;\nvarying vec3 vColor;\n\nvoid main() {\n  vRandom = random;\n  vColor = color;\n\n  vec3 pos = position * uSpread;\n  pos.z *= 10.0;\n\n  vec4 mPos = modelMatrix * vec4(pos, 1.0);\n  float t = uTime;\n  mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);\n  mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);\n  mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);\n\n  vec4 mvPos = viewMatrix * mPos;\n\n  if (uSizeRandomness == 0.0) {\n    gl_PointSize = uBaseSize;\n  } else {\n    gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);\n  }\n\n  gl_Position = projectionMatrix * mvPos;\n}", h = "precision highp float;\n\nuniform float uTime;\nuniform float uAlphaParticles;\nvarying vec4 vRandom;\nvarying vec3 vColor;\n\nvoid main() {\n  vec2 uv = gl_PointCoord.xy;\n  float d = length(uv - vec2(0.5));\n\n  if (uAlphaParticles < 0.5) {\n    if (d > 0.5) {\n      discard;\n    }\n    gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);\n  } else {\n    float circle = smoothstep(0.5, 0.4, d) * 0.8;\n    gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);\n  }\n}";
function g(e) {
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
function _(e, t, n, r) {
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
function v(e, t) {
	let n = /* @__PURE__ */ new Float32Array(16);
	for (let r = 0; r < 4; r += 1) for (let i = 0; i < 4; i += 1) {
		let a = 0;
		for (let n = 0; n < 4; n += 1) a += e[n * 4 + i] * t[r * 4 + n];
		n[r * 4 + i] = a;
	}
	return n;
}
function y(e, t, n, r, i) {
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
	return v(a, v(new Float32Array([
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
	]), v(p, f)));
}
function b(e) {
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
var x = 24;
function S(e, t, n, r) {
	if (t === void 0 || !(t > 0) || n <= 1 || r <= 1) return e;
	let i = Math.ceil(Math.max(0, n) * Math.max(0, r) * t / 1e4);
	return Math.min(e, Math.max(x, i));
}
function C({ active: e = !0, particleCount: t = 200, particleSpread: n = 10, speed: i = .1, particleColors: o, moveParticlesOnHover: s = !1, particleHoverFactor: p = 1, alphaParticles: m = !1, particleBaseSize: h = 100, sizeRandomness: g = 1, cameraDistance: _ = 20, disableRotation: v = !1, pixelRatio: y, seed: b = 1, fallbackIntensity: x = "medium", tone: S = "night", density: C, className: T, children: E, "data-testid": D = "particles-background" }) {
	let [O, k] = c(e);
	return a(() => {
		if (e) {
			k(!0);
			return;
		}
		let t = setTimeout(() => k(!1), d);
		return () => clearTimeout(t);
	}, [e]), /* @__PURE__ */ u("div", {
		"data-testid": D,
		"data-active": e ? "true" : "false",
		"data-tone": S,
		className: r("relative isolate", O && "uic-particles-ground overflow-hidden", T),
		children: [O && /* @__PURE__ */ l(w, {
			active: e,
			particleCount: t,
			particleSpread: n,
			speed: i,
			particleColors: o,
			moveParticlesOnHover: s,
			particleHoverFactor: p,
			alphaParticles: m,
			particleBaseSize: h,
			sizeRandomness: g,
			cameraDistance: _,
			disableRotation: v,
			...y === void 0 ? {} : { pixelRatio: y },
			seed: b,
			fallbackIntensity: x,
			...C === void 0 ? {} : { density: C },
			testId: D
		}, `${Math.max(1, Math.round(t))}|${(o?.length ? o : f).join(",")}`), E]
	});
}
function w(c) {
	let { testId: d } = c, p = s(c);
	p.current = c;
	let v = s({
		x: 0,
		y: 0
	}), x = s(0), C = s(0), w = (c.particleColors?.length ? c.particleColors : f).join(","), T = o(() => {
		let e = Math.max(1, Math.round(c.particleCount)), t = new Float32Array(e * 3), n = new Float32Array(e * 4), r = new Float32Array(e * 3), i = w.split(",");
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
			], a * 4), r.set(g(i[Math.floor(Math.random() * i.length)] ?? "#ffffff"), a * 3);
		}
		return {
			count: e,
			positions: t,
			randoms: n,
			colors: r
		};
	}, [c.particleCount, w]), E = s(T);
	E.current = T;
	let D = [
		T.count,
		c.particleSpread,
		c.particleBaseSize,
		c.sizeRandomness,
		+!!c.alphaParticles,
		c.cameraDistance,
		+!!c.disableRotation
	].join(":"), { hostRef: O, canvasRef: k, status: A, reducedMotion: j } = e({
		active: c.active,
		version: D,
		...c.pixelRatio === void 0 ? {} : { pixelRatio: c.pixelRatio },
		setup: (e) => {
			let r = n(e, m, h);
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
			let n = p.current, { gl: r, width: i, height: a, delta: o } = t;
			C.current += o * n.speed, n.disableRotation || (x.current += .01 * n.speed), r.clearColor(0, 0, 0, 0), r.clear(r.COLOR_BUFFER_BIT), r.disable(r.DEPTH_TEST), r.enable(r.BLEND), r.blendFunc(r.SRC_ALPHA, r.ONE_MINUS_SRC_ALPHA), r.useProgram(e.program);
			let s = (e, t, n) => {
				e < 0 || (r.bindBuffer(r.ARRAY_BUFFER, t), r.enableVertexAttribArray(e), r.vertexAttribPointer(e, n, r.FLOAT, !1, 0, 0));
			};
			s(e.attributes.position, e.buffers.position, 3), s(e.attributes.random, e.buffers.random, 4), s(e.attributes.color, e.buffers.color, 3);
			let c = Math.max(1, i / Math.max(1, O.current?.clientWidth || i)), l = n.disableRotation ? 0 : Math.sin(C.current * 2e-4) * .1, u = n.disableRotation ? 0 : Math.cos(C.current * 5e-4) * .15, d = n.moveParticlesOnHover ? -v.current.x * n.particleHoverFactor : 0, f = n.moveParticlesOnHover ? -v.current.y * n.particleHoverFactor : 0;
			r.uniformMatrix4fv(e.uniforms.projectionMatrix ?? null, !1, _(15, i / Math.max(1, a), .1, 100)), r.uniformMatrix4fv(e.uniforms.viewMatrix ?? null, !1, b(n.cameraDistance)), r.uniformMatrix4fv(e.uniforms.modelMatrix ?? null, !1, y(d, f, l, u, n.disableRotation ? 0 : x.current)), r.uniform1f(e.uniforms.uTime ?? null, C.current * .001), r.uniform1f(e.uniforms.uSpread ?? null, n.particleSpread), r.uniform1f(e.uniforms.uBaseSize ?? null, n.particleBaseSize * c), r.uniform1f(e.uniforms.uSizeRandomness ?? null, n.sizeRandomness), r.uniform1f(e.uniforms.uAlphaParticles ?? null, +!!n.alphaParticles), r.drawArrays(r.POINTS, 0, S(e.count, n.density, i / c, a / c));
		},
		dispose: (e, t) => {
			t.deleteProgram(e.program), t.deleteBuffer(e.buffers.position), t.deleteBuffer(e.buffers.random), t.deleteBuffer(e.buffers.color);
		}
	});
	a(() => {
		if (!c.moveParticlesOnHover || typeof window > "u") return;
		let e = (e) => {
			let t = O.current?.getBoundingClientRect();
			if (!(!t || t.width === 0 || t.height === 0)) {
				if (!(e.clientX >= t.left && e.clientX <= t.right && e.clientY >= t.top && e.clientY <= t.bottom)) {
					v.current = {
						x: 0,
						y: 0
					};
					return;
				}
				v.current = {
					x: (e.clientX - t.left) / t.width * 2 - 1,
					y: -((e.clientY - t.top) / t.height * 2 - 1)
				};
			}
		};
		return window.addEventListener("pointermove", e, { passive: !0 }), () => window.removeEventListener("pointermove", e);
	}, [c.moveParticlesOnHover, O]);
	let M = A === "unsupported";
	return /* @__PURE__ */ u("div", {
		ref: O,
		"aria-hidden": "true",
		"data-testid": `${d}-backdrop`,
		"data-motion": j ? "static" : "drifting",
		"data-webgl": M ? "unavailable" : "ready",
		className: r("uic-particles-field pointer-events-none absolute inset-0 -z-10 transition-opacity duration-[250ms] motion-reduce:transition-none", c.active ? "uic-particles-in opacity-100" : "opacity-0"),
		children: [/* @__PURE__ */ l("canvas", {
			ref: k,
			"data-testid": `${d}-canvas`,
			className: "block h-full w-full",
			...M ? { hidden: !0 } : {}
		}), M && /* @__PURE__ */ l(i, {
			active: c.active,
			intensity: c.fallbackIntensity,
			seed: c.seed,
			className: "absolute inset-0",
			"data-testid": `${d}-fallback`
		})]
	});
}
//#endregion
export { C as n, S as r, p as t };
