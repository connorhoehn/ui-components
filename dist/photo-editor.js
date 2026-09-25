import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./IconButton-DDeXW3mZ.js";
import { N as n, W as r, d as i, tt as a } from "./Icons-rzhVAphQ.js";
import { t as o } from "./DropdownMenu-DUAebTA4.js";
import { useCallback as s, useEffect as c, useLayoutEffect as l, useMemo as u, useRef as d, useState as f } from "react";
import { Fragment as p, jsx as m, jsxs as h } from "react/jsx-runtime";
//#region src/components/photo-editor/model.ts
var g = 5500;
function _(e) {
	return `${e.kind}:${e.maskId ?? ""}`;
}
function v(e, t) {
	let n = _(t), r = e.findIndex((e) => _(e) === n);
	if (r < 0) return [...e, t];
	let i = e.slice();
	return i[r] = t, i;
}
function y(e, t, n) {
	let r = _({
		kind: t,
		maskId: n
	});
	return e.filter((e) => _(e) !== r);
}
function b(e) {
	switch (e.kind) {
		case "brightness":
		case "contrast":
		case "saturation": return e.value === 1;
		case "hue": return e.degrees === 0;
		case "blur": return e.radiusPx <= 0;
		case "exposure": return e.stops === 0;
		case "temperature": return e.kelvin === g;
		default: return e.amount === 0;
	}
}
function x(e) {
	return e.filter((e) => !b(e));
}
var S = {
	exposureStops: 0,
	warmth: 0,
	tint: 0,
	contrast: 1,
	highlights: 0,
	shadows: 0,
	whites: 0,
	blacks: 0,
	saturation: 1,
	vibrance: 0,
	hueDegrees: 0,
	brightness: 1,
	blurPx: 0
}, C = (e, t, n) => Math.min(n, Math.max(t, e));
function w(e) {
	let t = { ...S };
	for (let n of e) if (!n.maskId) switch (n.kind) {
		case "brightness":
			t.brightness = n.value;
			break;
		case "contrast":
			t.contrast = n.value;
			break;
		case "saturation":
			t.saturation = n.value;
			break;
		case "hue":
			t.hueDegrees = n.degrees;
			break;
		case "blur":
			t.blurPx = Math.max(0, n.radiusPx);
			break;
		case "exposure":
			t.exposureStops = C(n.stops, -5, 5);
			break;
		case "highlights":
			t.highlights = C(n.amount, -100, 100) / 100;
			break;
		case "shadows":
			t.shadows = C(n.amount, -100, 100) / 100;
			break;
		case "whites":
			t.whites = C(n.amount, -100, 100) / 100;
			break;
		case "blacks":
			t.blacks = C(n.amount, -100, 100) / 100;
			break;
		case "vibrance":
			t.vibrance = C(n.amount, -100, 100) / 100;
			break;
		case "temperature": {
			let e = C(n.kelvin, 2e3, 12e3);
			t.warmth = e >= 5500 ? (e - g) / 6500 : (e - g) / 3500;
			break;
		}
		case "tint": t.tint = C(n.amount, -150, 150) / 150;
	}
	return t;
}
var T = (e, t, n) => {
	let r = C((n - e) / (t - e), 0, 1);
	return r * r * (3 - 2 * r);
};
function E(e, t) {
	let [n, r, i] = e, a = 2 ** t.exposureStops;
	n *= a, r *= a, i *= a, n *= 1 + .2 * t.warmth, i *= 1 - .2 * t.warmth, r *= 1 - .15 * t.tint, n = (n - .5) * t.contrast + .5, r = (r - .5) * t.contrast + .5, i = (i - .5) * t.contrast + .5;
	let o = .2126 * n + .7152 * r + .0722 * i, s = t.highlights * .25 * T(.5, 1, o) + t.shadows * .25 * (1 - T(0, .5, o)) + t.whites * .15 * T(.6, 1, o) + t.blacks * .15 * (1 - T(0, .4, o));
	n += s, r += s, i += s, o = .2126 * n + .7152 * r + .0722 * i;
	let c = Math.max(n, r, i) - Math.min(n, r, i), l = t.saturation * (1 + t.vibrance * (1 - C(c, 0, 1)));
	return n = o + (n - o) * l, r = o + (r - o) * l, i = o + (i - o) * l, t.hueDegrees !== 0 && ([n, r, i] = O([
		n,
		r,
		i
	], t.hueDegrees)), n *= t.brightness, r *= t.brightness, i *= t.brightness, [
		C(n, 0, 1),
		C(r, 0, 1),
		C(i, 0, 1)
	];
}
function D(e) {
	let t = e * Math.PI / 180, n = Math.cos(t), r = Math.sin(t);
	return [
		.213 + n * .787 - r * .213,
		.715 - n * .715 - r * .715,
		.072 - n * .072 + r * .928,
		.213 - n * .213 + r * .143,
		.715 + n * .285 + r * .14,
		.072 - n * .072 - r * .283,
		.213 - n * .213 - r * .787,
		.715 - n * .715 + r * .715,
		.072 + n * .928 + r * .072
	];
}
function O([e, t, n], r) {
	let i = D(r);
	return [
		i[0] * e + i[1] * t + i[2] * n,
		i[3] * e + i[4] * t + i[5] * n,
		i[6] * e + i[7] * t + i[8] * n
	];
}
//#endregion
//#region src/components/photo-editor/adjustRenderer.ts
var k = "#version 300 es\nin vec2 aPos;\nout vec2 vUv;\nvoid main() {\n  vUv = vec2((aPos.x + 1.0) * 0.5, 1.0 - (aPos.y + 1.0) * 0.5);\n  gl_Position = vec4(aPos, 0.0, 1.0);\n}", A = "#version 300 es\nprecision highp float;\nin vec2 vUv;\nout vec4 outColor;\nuniform sampler2D uImage;\nuniform float uExposure;\nuniform float uWarmth;\nuniform float uTint;\nuniform float uContrast;\nuniform vec4 uTone;       // highlights, shadows, whites, blacks\nuniform float uSaturation;\nuniform float uVibrance;\nuniform mat3 uHue;\nuniform float uBrightness;\nconst vec3 LUMA = vec3(0.2126, 0.7152, 0.0722);\nvoid main() {\n  vec4 src = texture(uImage, vUv);\n  vec3 c = src.rgb * exp2(uExposure);\n  c.r *= 1.0 + 0.2 * uWarmth;\n  c.b *= 1.0 - 0.2 * uWarmth;\n  c.g *= 1.0 - 0.15 * uTint;\n  c = (c - 0.5) * uContrast + 0.5;\n  float l = dot(c, LUMA);\n  float d = uTone.x * 0.25 * smoothstep(0.5, 1.0, l)\n          + uTone.y * 0.25 * (1.0 - smoothstep(0.0, 0.5, l))\n          + uTone.z * 0.15 * smoothstep(0.6, 1.0, l)\n          + uTone.w * 0.15 * (1.0 - smoothstep(0.0, 0.4, l));\n  c += d;\n  l = dot(c, LUMA);\n  float sat = max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));\n  float s = uSaturation * (1.0 + uVibrance * (1.0 - clamp(sat, 0.0, 1.0)));\n  c = l + (c - l) * s;\n  c = uHue * c;\n  c *= uBrightness;\n  outColor = vec4(clamp(c, 0.0, 1.0), src.a);\n}";
function j(e, t, n) {
	let r = e.createShader(t);
	if (!r) throw Error("photo-editor: createShader failed");
	if (e.shaderSource(r, n), e.compileShader(r), !e.getShaderParameter(r, e.COMPILE_STATUS)) {
		let t = e.getShaderInfoLog(r);
		throw e.deleteShader(r), Error(`photo-editor: shader compile failed: ${t ?? ""}`);
	}
	return r;
}
function M(e) {
	let t = e.getContext("webgl2", {
		premultipliedAlpha: !1,
		preserveDrawingBuffer: !0
	});
	if (!t) return null;
	let n;
	try {
		if (n = t.createProgram(), t.attachShader(n, j(t, t.VERTEX_SHADER, k)), t.attachShader(n, j(t, t.FRAGMENT_SHADER, A)), t.linkProgram(n), !t.getProgramParameter(n, t.LINK_STATUS)) return null;
	} catch {
		return null;
	}
	t.useProgram(n);
	let r = t.createBuffer();
	t.bindBuffer(t.ARRAY_BUFFER, r), t.bufferData(t.ARRAY_BUFFER, new Float32Array([
		-1,
		-1,
		1,
		-1,
		-1,
		1,
		-1,
		1,
		1,
		-1,
		1,
		1
	]), t.STATIC_DRAW);
	let i = t.getAttribLocation(n, "aPos");
	t.enableVertexAttribArray(i), t.vertexAttribPointer(i, 2, t.FLOAT, !1, 0, 0);
	let a = t.createTexture();
	t.bindTexture(t.TEXTURE_2D, a), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE);
	let o = (e) => t.getUniformLocation(n, e), s = {
		exposure: o("uExposure"),
		warmth: o("uWarmth"),
		tint: o("uTint"),
		contrast: o("uContrast"),
		tone: o("uTone"),
		saturation: o("uSaturation"),
		vibrance: o("uVibrance"),
		hue: o("uHue"),
		brightness: o("uBrightness")
	}, c = !1;
	return {
		setImage(n) {
			e.width = n.width, e.height = n.height, t.viewport(0, 0, n.width, n.height), t.bindTexture(t.TEXTURE_2D, a), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, n), c = !0;
		},
		render(e) {
			c && (t.uniform1f(s.exposure, e.exposureStops), t.uniform1f(s.warmth, e.warmth), t.uniform1f(s.tint, e.tint), t.uniform1f(s.contrast, e.contrast), t.uniform4f(s.tone, e.highlights, e.shadows, e.whites, e.blacks), t.uniform1f(s.saturation, e.saturation), t.uniform1f(s.vibrance, e.vibrance), t.uniformMatrix3fv(s.hue, !0, D(e.hueDegrees)), t.uniform1f(s.brightness, e.brightness), t.drawArrays(t.TRIANGLES, 0, 6));
		},
		dispose() {
			t.deleteTexture(a), t.deleteBuffer(r), t.deleteProgram(n);
		}
	};
}
function N(e) {
	let t = [], n = e.brightness * 2 ** e.exposureStops * (1 + .1 * (e.shadows + e.highlights));
	n !== 1 && t.push(`brightness(${n.toFixed(3)})`), e.contrast !== 1 && t.push(`contrast(${e.contrast.toFixed(3)})`);
	let r = e.saturation * (1 + .5 * e.vibrance);
	return r !== 1 && t.push(`saturate(${r.toFixed(3)})`), e.hueDegrees && t.push(`hue-rotate(${e.hueDegrees}deg)`), e.warmth && t.push(`sepia(${(Math.max(0, e.warmth) * .3).toFixed(3)})`), e.blurPx > 0 && t.push(`blur(${e.blurPx}px)`), t.join(" ") || "none";
}
//#endregion
//#region src/components/photo-editor/AdjustedImageCanvas.tsx
function P(e) {
	return new Promise((t, n) => {
		let r = new Image();
		!e.startsWith("blob:") && !e.startsWith("data:") && (r.crossOrigin = "anonymous"), r.onload = () => t(r), r.onerror = () => n(/* @__PURE__ */ Error("photo-editor: image failed to load")), r.src = e;
	});
}
function F({ src: t, ops: n, alt: r, className: i, onLoad: a, "data-testid": o = "adjusted-image-canvas" }) {
	let s = d(null), l = d(null), g = d(null), [_, v] = f("pending"), y = u(() => w(n), [n]), b = d(a);
	return b.current = a, c(() => {
		if (!t) return;
		let e = !1;
		return P(t).then((t) => {
			if (e) return;
			b.current?.({
				width: t.naturalWidth,
				height: t.naturalHeight
			});
			let n = s.current;
			n && !g.current && (g.current = M(n));
			let r = g.current;
			if (!r) {
				v("css");
				return;
			}
			try {
				r.setImage(t), v("gl");
			} catch {
				v("css");
			}
		}).catch(() => {
			e || v("css");
		}), () => {
			e = !0;
		};
	}, [t]), c(() => () => {
		g.current?.dispose(), g.current = null;
	}, []), c(() => {
		_ === "gl" ? (g.current?.render(y), s.current && (s.current.style.filter = y.blurPx > 0 ? `blur(${y.blurPx}px)` : "")) : _ === "css" && l.current && (l.current.style.filter = N(y));
	}, [_, y]), /* @__PURE__ */ h(p, { children: [/* @__PURE__ */ m("canvas", {
		ref: s,
		role: "img",
		"aria-label": r,
		"data-testid": o,
		"data-render-mode": _,
		className: e("block h-full w-full", _ === "css" && "hidden", i)
	}), _ === "css" && t && /* @__PURE__ */ m("img", {
		ref: l,
		src: t,
		alt: r,
		draggable: !1,
		"data-testid": `${o}-fallback`,
		className: e("block h-full w-full", i)
	})] });
}
//#endregion
//#region src/components/photo-editor/PhotoCompareCanvas.tsx
var ee = [
	.25,
	.5,
	1,
	2,
	4
], I = (e, t, n) => Math.min(n, Math.max(t, e)), L = "rounded-lg bg-black/60 text-white shadow-sm backdrop-blur-sm";
function R({ active: t, className: n, ...r }) {
	return /* @__PURE__ */ m("button", {
		type: "button",
		"aria-pressed": t,
		className: e("inline-flex h-8 cursor-pointer items-center gap-1.5 border-none bg-transparent px-3 text-[13px] font-medium text-white", "hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70", t && "bg-white/15", n),
		...r
	});
}
function z({ natural: t, children: n }) {
	let r = d(null);
	return l(() => {
		let e = r.current;
		if (!e) return;
		let n = () => {
			let { width: n, height: r } = e.getBoundingClientRect(), i = t ? t.width / t.height : 3 / 2, a = Math.min(n, r * i);
			e.style.setProperty("--frame-w", `${Math.round(a)}px`), e.style.setProperty("--frame-h", `${Math.round(a / i)}px`);
		};
		n();
		let i = typeof ResizeObserver < "u" ? new ResizeObserver(n) : null;
		return i?.observe(e), () => i?.disconnect();
	}, [t]), /* @__PURE__ */ m("div", {
		ref: r,
		className: "absolute inset-0 overflow-hidden",
		children: /* @__PURE__ */ m("div", {
			className: e("absolute left-1/2 top-1/2 h-[var(--frame-h)] w-[var(--frame-w)] origin-center", "[transform:translate(-50%,-50%)_translate(var(--pan-x,0px),var(--pan-y,0px))_scale(var(--zoom,1))]"),
			children: n
		})
	});
}
function B({ src: t, ops: n, alt: r, compare: a, onCompareChange: u, layout: g = "split", split: _, onSplitChange: v, originalLabel: y = "Original", previewLabel: b = "Preview", overlay: x, className: S, "data-testid": C = "photo-compare-canvas" }) {
	let w = d(null), [T, E] = f(null), [D, O] = f("fit"), [k, A] = f(.5), [j, M] = f(!0), N = a ?? j, P = () => {
		a === void 0 && M(!N), u?.(!N);
	}, B = _ ?? k, V = d({
		x: 0,
		y: 0
	}), H = d(null), U = s((e) => {
		if (e === "fit" || !T) return 1;
		let t = w.current?.getBoundingClientRect();
		if (!t) return 1;
		let n = g === "side-by-side" && N ? t.width / 2 : t.width, r = Math.min(n, t.height * (T.width / T.height));
		return e * T.width / r;
	}, [
		T,
		g,
		N
	]), W = s((e) => {
		let t = I(e, 0, 1);
		_ === void 0 && A(t), v?.(t);
	}, [_, v]), G = s(() => {
		let e = w.current;
		e && (e.style.setProperty("--zoom", String(U(D))), e.style.setProperty("--pan-x", `${V.current.x}px`), e.style.setProperty("--pan-y", `${V.current.y}px`), e.style.setProperty("--split", `${(B * 100).toFixed(2)}%`));
	}, [
		U,
		D,
		B
	]);
	l(G, [G]), c(() => {
		let e = w.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(G);
		return t.observe(e), () => t.disconnect();
	}, [G]);
	let K = (e) => {
		e === "fit" && (V.current = {
			x: 0,
			y: 0
		}), O(e);
	}, q = (e, t) => {
		(t !== "pan" || D !== "fit") && (e.currentTarget.setPointerCapture?.(e.pointerId), e.stopPropagation(), H.current = {
			kind: t,
			x: e.clientX,
			y: e.clientY,
			px: V.current.x,
			py: V.current.y
		});
	}, J = (e) => {
		let t = H.current, n = w.current?.getBoundingClientRect();
		!t || !n || (t.kind === "split" ? W((e.clientX - n.left) / n.width) : (V.current = {
			x: t.px + e.clientX - t.x,
			y: t.py + e.clientY - t.y
		}, G()));
	}, Y = () => {
		H.current = null;
	}, X = (e) => {
		if (!e.ctrlKey && !e.metaKey) return;
		let t = I((D === "fit" ? T && w.current ? 1 / U(1) : 1 : D) * (e.deltaY < 0 ? 1.1 : 1 / 1.1), .1, 8);
		K(t);
	}, Z = (e) => {
		e.key === "ArrowLeft" && (e.preventDefault(), W(B - .02)), e.key === "ArrowRight" && (e.preventDefault(), W(B + .02)), e.key === "Home" && (e.preventDefault(), W(0)), e.key === "End" && (e.preventDefault(), W(1));
	}, Q = D === "fit" ? "100%" : `${Math.round(D * 100)}%`, $ = t ? /* @__PURE__ */ m("img", {
		src: t,
		alt: `${r} (original)`,
		draggable: !1,
		className: "block h-full w-full select-none",
		"data-testid": `${C}-original`
	}) : null, te = /* @__PURE__ */ m(F, {
		src: t,
		ops: n,
		alt: `${r} (preview)`,
		onLoad: E,
		"data-testid": `${C}-preview`
	}), ne = N && g === "side-by-side";
	return /* @__PURE__ */ h("div", {
		ref: w,
		"data-testid": C,
		"data-zoom": D === "fit" ? "fit" : String(D),
		"data-compare": N ? g : "off",
		className: e("relative min-h-0 min-w-0 select-none overflow-hidden rounded-md bg-video-stage", D !== "fit" && "cursor-grab active:cursor-grabbing", S),
		onPointerDown: (e) => q(e, "pan"),
		onPointerMove: J,
		onPointerUp: Y,
		onPointerCancel: Y,
		onWheel: X,
		children: [
			ne ? /* @__PURE__ */ h("div", {
				className: "absolute inset-0 grid grid-cols-2 gap-1",
				children: [/* @__PURE__ */ m("div", {
					className: "relative min-w-0",
					children: /* @__PURE__ */ m(z, {
						natural: T,
						children: $
					})
				}), /* @__PURE__ */ m("div", {
					className: "relative min-w-0",
					children: /* @__PURE__ */ m(z, {
						natural: T,
						children: te
					})
				})]
			}) : /* @__PURE__ */ h(p, { children: [N && /* @__PURE__ */ m(z, {
				natural: T,
				children: $
			}), /* @__PURE__ */ m("div", {
				className: e("absolute inset-0", N && "[clip-path:inset(0_0_0_var(--split))]"),
				"data-testid": `${C}-preview-layer`,
				children: /* @__PURE__ */ m(z, {
					natural: T,
					children: te
				})
			})] }),
			N && !ne && /* @__PURE__ */ h("div", {
				className: "pointer-events-none absolute inset-y-0 left-[var(--split)] w-0",
				"data-testid": `${C}-split`,
				children: [/* @__PURE__ */ m("div", { className: "absolute inset-y-0 -left-px w-0.5 bg-white/85 shadow-[0_0_4px_rgba(0,0,0,0.5)]" }), /* @__PURE__ */ h("div", {
					role: "slider",
					tabIndex: 0,
					"aria-label": "Before and after split",
					"aria-valuemin": 0,
					"aria-valuemax": 100,
					"aria-valuenow": Math.round(B * 100),
					onPointerDown: (e) => q(e, "split"),
					onKeyDown: Z,
					"data-testid": `${C}-handle`,
					className: e("pointer-events-auto absolute left-0 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center", "rounded-full border-2 border-solid border-white bg-black/45 text-white shadow-md backdrop-blur-sm", "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"),
					children: [/* @__PURE__ */ m(i, {
						dir: "left",
						size: 12
					}), /* @__PURE__ */ m(i, {
						dir: "right",
						size: 12
					})]
				})]
			}),
			N && /* @__PURE__ */ m("span", {
				className: e(L, "pointer-events-none absolute left-3 top-3 px-3 py-1.5 text-[13px] font-medium"),
				"data-testid": `${C}-badge-original`,
				children: y
			}),
			/* @__PURE__ */ m("span", {
				className: e(L, "pointer-events-none absolute right-3 top-3 px-3 py-1.5 text-[13px] font-medium"),
				"data-testid": `${C}-badge-preview`,
				children: b
			}),
			/* @__PURE__ */ h("div", {
				className: e(L, "absolute left-1/2 top-3 flex -translate-x-1/2 items-center divide-x divide-white/15 overflow-hidden"),
				"data-testid": `${C}-toolbar`,
				onPointerDown: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ m(o, {
						trigger: /* @__PURE__ */ h("span", {
							className: "inline-flex items-center gap-1.5",
							children: [D === "fit" ? "Fit" : "Zoom", /* @__PURE__ */ m(i, { size: 12 })]
						}),
						triggerLabel: "Zoom",
						triggerClassName: "h-8 rounded-none border-none bg-transparent px-3 text-[13px] font-medium text-white hover:bg-white/10",
						triggerTestId: `${C}-zoom-menu`,
						sections: [{ items: [{
							label: "Fit",
							active: D === "fit",
							onSelect: () => K("fit")
						}, ...ee.map((e) => ({
							label: `${e * 100}%`,
							active: D === e,
							onSelect: () => K(e)
						}))] }]
					}),
					/* @__PURE__ */ m(R, {
						onClick: () => K(D === "fit" ? 1 : "fit"),
						active: D === 1,
						"aria-label": D === "fit" ? "Zoom to 100%" : "Fit to window",
						"data-testid": `${C}-zoom-100`,
						children: Q
					}),
					/* @__PURE__ */ m(R, {
						onClick: P,
						active: N,
						"data-testid": `${C}-before-after`,
						children: "Before / After"
					})
				]
			}),
			x
		]
	});
}
//#endregion
//#region src/components/photo-editor/icons.tsx
function V(e, t) {
	return {
		width: e,
		height: e,
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.5,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		...t
	};
}
function H({ size: e = 16, ...t }) {
	return /* @__PURE__ */ h("svg", {
		...V(e, t),
		children: [/* @__PURE__ */ m("rect", {
			x: "2",
			y: "3",
			width: "12",
			height: "10",
			rx: "1.5"
		}), /* @__PURE__ */ m("path", { d: "M6 3v10M3.5 5.5h1M3.5 7.5h1" })]
	});
}
function U({ size: e = 16, ...t }) {
	return /* @__PURE__ */ m("svg", {
		...V(e, t),
		children: /* @__PURE__ */ m("path", { d: "M3.5 14V2.5M3.5 3h8l-1.5 3 1.5 3h-8" })
	});
}
function W({ size: e = 16, filled: t = !1, ...n }) {
	return /* @__PURE__ */ m("svg", {
		...V(e, n),
		fill: t ? "currentColor" : "none",
		children: /* @__PURE__ */ m("path", { d: "M8 13.5S2.5 10.2 2.5 6.3A2.8 2.8 0 0 1 8 5a2.8 2.8 0 0 1 5.5 1.3C13.5 10.2 8 13.5 8 13.5z" })
	});
}
function G({ size: e = 16, ...t }) {
	return /* @__PURE__ */ h("svg", {
		...V(e, t),
		children: [/* @__PURE__ */ m("rect", {
			x: "1.5",
			y: "3",
			width: "13",
			height: "10",
			rx: "1.5"
		}), /* @__PURE__ */ m("path", { d: "M8 3v10M3.5 6h2.5M3.5 8h2.5M10 6h2.5M10 8h2.5" })]
	});
}
function K({ size: e = 16, ...t }) {
	return /* @__PURE__ */ h("svg", {
		...V(e, t),
		children: [/* @__PURE__ */ m("rect", {
			x: "2.5",
			y: "5",
			width: "8.5",
			height: "8.5",
			rx: "1.5"
		}), /* @__PURE__ */ m("path", { d: "M5 5V3.5A1 1 0 0 1 6 2.5h6.5a1 1 0 0 1 1 1V10a1 1 0 0 1-1 1H11" })]
	});
}
//#endregion
//#region src/components/photo-editor/PhotoEditorTopBar.tsx
var q = {
	pick: "Pick",
	reject: "Rejected",
	none: "Pick"
};
function J({ title: s, subtitle: c, backLabel: l, onBack: u, onToggleSidebar: d, sidebarOpen: f, onPrev: p, onNext: g, pick: _, onPickChange: v, onUndo: y, onRedo: b, canUndo: x = !1, canRedo: S = !1, compareLayout: C = "split", onCompareLayoutChange: w, moreSections: T, className: E, "data-testid": D = "photo-editor-top-bar" }) {
	return /* @__PURE__ */ h("header", {
		"data-testid": D,
		className: e("grid h-[52px] shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-solid border-border bg-surface px-3", E),
		children: [
			/* @__PURE__ */ h("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [d && /* @__PURE__ */ m(t, {
					"aria-label": f ? "Hide sidebar" : "Show sidebar",
					"aria-pressed": f,
					onClick: d,
					icon: /* @__PURE__ */ m(H, { size: 18 }),
					className: "text-text-secondary",
					"data-testid": `${D}-sidebar`
				}), /* @__PURE__ */ h("button", {
					type: "button",
					onClick: u,
					"data-testid": `${D}-back`,
					className: "inline-flex min-w-0 cursor-pointer items-center gap-1 rounded-md border-none bg-transparent px-2 py-1 text-[14px] font-medium text-text-primary hover:bg-surface-hover",
					children: [/* @__PURE__ */ m(i, {
						dir: "left",
						size: 14,
						className: "shrink-0 text-text-secondary"
					}), /* @__PURE__ */ m("span", {
						className: "truncate",
						children: l
					})]
				})]
			}),
			/* @__PURE__ */ h("div", {
				className: "flex min-w-0 flex-col items-center leading-tight",
				"data-testid": `${D}-title`,
				children: [/* @__PURE__ */ m("span", {
					className: "max-w-[40vw] truncate text-[14px] font-semibold text-text-primary",
					children: s
				}), c && /* @__PURE__ */ m("span", {
					className: "text-[12px] text-text-secondary",
					children: c
				})]
			}),
			/* @__PURE__ */ h("div", {
				className: "flex min-w-0 items-center justify-end gap-1",
				children: [
					/* @__PURE__ */ m(t, {
						"aria-label": "Previous photo",
						onClick: p,
						disabled: !p,
						icon: /* @__PURE__ */ m(i, {
							dir: "left",
							size: 16
						}),
						"data-testid": `${D}-prev`
					}),
					/* @__PURE__ */ m(t, {
						"aria-label": "Next photo",
						onClick: g,
						disabled: !g,
						icon: /* @__PURE__ */ m(i, {
							dir: "right",
							size: 16
						}),
						"data-testid": `${D}-next`
					}),
					/* @__PURE__ */ m("span", {
						className: "mx-1.5",
						children: /* @__PURE__ */ m(o, {
							trigger: /* @__PURE__ */ h("span", {
								className: "inline-flex items-center gap-2",
								children: [
									/* @__PURE__ */ m(U, { size: 15 }),
									q[_ ?? "none"],
									/* @__PURE__ */ m(i, { size: 12 })
								]
							}),
							triggerLabel: "Pick flag",
							triggerTestId: `${D}-pick`,
							triggerClassName: e("h-8 rounded-lg border border-solid px-3 text-[13px] font-medium", _ === "pick" ? "border-accent-border bg-accent-bg text-accent-fg" : _ === "reject" ? "border-danger-border bg-danger-bg text-danger-fg" : "border-border bg-surface-panel text-text-primary"),
							align: "end",
							sections: [{ items: [
								{
									label: "Pick",
									description: "Keep this one in the set",
									checked: _ === "pick",
									trailing: "P",
									onSelect: () => v("pick")
								},
								{
									label: "Reject",
									description: "Leave it out of the set",
									checked: _ === "reject",
									trailing: "X",
									onSelect: () => v("reject")
								},
								{
									label: "Unflag",
									checked: _ === null,
									trailing: "U",
									onSelect: () => v(null)
								}
							] }]
						})
					}),
					/* @__PURE__ */ m(t, {
						"aria-label": "Undo",
						onClick: y,
						disabled: !x,
						icon: /* @__PURE__ */ m(a, { size: 17 }),
						"data-testid": `${D}-undo`
					}),
					/* @__PURE__ */ m(t, {
						"aria-label": "Redo",
						onClick: b,
						disabled: !S,
						icon: /* @__PURE__ */ m(r, { size: 17 }),
						"data-testid": `${D}-redo`
					}),
					/* @__PURE__ */ m("span", {
						className: "mx-1 h-5 w-px bg-border",
						"aria-hidden": !0
					}),
					/* @__PURE__ */ m(t, {
						"aria-label": C === "side-by-side" ? "Compare with a split" : "Compare side by side",
						"aria-pressed": C === "side-by-side",
						onClick: () => w?.(C === "side-by-side" ? "split" : "side-by-side"),
						disabled: !w,
						icon: /* @__PURE__ */ m(G, { size: 18 }),
						className: C === "side-by-side" ? "bg-surface-hover" : void 0,
						"data-testid": `${D}-layout`
					}),
					T && /* @__PURE__ */ m(o, {
						trigger: /* @__PURE__ */ m(n, { size: 18 }),
						triggerLabel: "More",
						triggerTestId: `${D}-more`,
						triggerClassName: "inline-flex h-8 w-8 items-center justify-center rounded-md border-none bg-transparent p-0 text-text-primary hover:bg-surface-hover",
						align: "end",
						sections: T
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/photo-editor/PhotoFilmstrip.tsx
var Y = "pointer-events-none absolute rounded-md bg-black/65 text-white backdrop-blur-sm";
function X({ items: t, currentId: n, onSelect: r, className: i, "data-testid": a = "photo-filmstrip" }) {
	let o = d(null);
	return c(() => {
		(o.current?.querySelector("[aria-current=\"true\"]"))?.scrollIntoView?.({
			block: "nearest",
			inline: "nearest"
		});
	}, [n]), /* @__PURE__ */ m("div", {
		ref: o,
		role: "listbox",
		"aria-label": "Photos in this set",
		"aria-orientation": "horizontal",
		onKeyDown: (e) => {
			if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
			let i = t.findIndex((e) => e.id === n), a = t[Math.min(t.length - 1, Math.max(0, i + (e.key === "ArrowRight" ? 1 : -1)))];
			a && a.id !== n && (e.preventDefault(), r(a.id), requestAnimationFrame(() => o.current?.querySelector("[aria-current=\"true\"]")?.focus()));
		},
		"data-testid": a,
		className: e("flex h-[74px] shrink-0 items-center gap-1.5 overflow-x-auto bg-surface-panel px-2 py-1.5", i),
		children: t.map((t) => {
			let i = t.id === n;
			return /* @__PURE__ */ h("button", {
				type: "button",
				role: "option",
				"aria-selected": i,
				"aria-current": i ? "true" : void 0,
				"aria-label": `${t.label}${t.editCount ? `, ${t.editCount} edits` : ""}${t.pick === "pick" ? ", picked" : ""}`,
				tabIndex: i ? 0 : -1,
				onClick: () => r(t.id),
				"data-testid": `${a}-item-${t.id.slice(0, 12)}`,
				className: e("relative h-[60px] w-24 shrink-0 cursor-pointer overflow-hidden rounded-md border-2 border-solid bg-video-stage p-0", i ? "border-accent" : "border-transparent hover:border-border-emphasis", "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"),
				children: [
					t.thumbnailSrc && /* @__PURE__ */ m("img", {
						src: t.thumbnailSrc,
						alt: "",
						loading: "lazy",
						draggable: !1,
						className: "block h-full w-full object-cover"
					}),
					!!t.editCount && /* @__PURE__ */ h("span", {
						className: e(Y, "right-1 top-1 inline-flex items-center gap-1 px-1.5 py-0.5 text-[11px] font-semibold leading-none"),
						"data-testid": "photo-filmstrip-edit-badge",
						children: [/* @__PURE__ */ m(K, { size: 11 }), t.editCount]
					}),
					t.pick === "pick" && /* @__PURE__ */ m("span", {
						className: e(Y, "bottom-1 left-1 inline-flex h-5 w-5 items-center justify-center rounded-full"),
						"data-testid": "photo-filmstrip-pick",
						children: /* @__PURE__ */ m(W, { size: 12 })
					})
				]
			}, t.id);
		})
	});
}
//#endregion
//#region src/components/photo-editor/PhotoEditorShell.tsx
function Z({ topBar: t, canvas: n, rightPanel: r, composer: i, filmstrip: a, statusBar: o, className: s, "data-testid": c = "photo-editor-shell" }) {
	return /* @__PURE__ */ h("div", {
		"data-testid": c,
		className: e("flex h-full min-h-0 w-full flex-col overflow-hidden bg-surface-panel text-text-primary", s),
		children: [
			t,
			/* @__PURE__ */ h("div", {
				className: "flex min-h-0 flex-1 gap-2 p-2",
				children: [/* @__PURE__ */ h("main", {
					className: "flex min-h-0 min-w-0 flex-1 flex-col gap-2",
					"data-testid": `${c}-main`,
					children: [/* @__PURE__ */ m("div", {
						className: "relative flex min-h-0 flex-1 flex-col",
						children: n
					}), i && /* @__PURE__ */ m("div", {
						className: "shrink-0",
						"data-testid": `${c}-composer`,
						children: i
					})]
				}), r && /* @__PURE__ */ m("aside", {
					className: "hidden min-h-0 w-[320px] shrink-0 flex-col overflow-y-auto rounded-md border border-solid border-border bg-surface lg:flex",
					"data-testid": `${c}-panel`,
					children: r
				})]
			}),
			a,
			o
		]
	});
}
function Q({ previewing: t, saving: n = !1, message: r, className: i, "data-testid": a = "photo-editor-status" }) {
	let o = n ? "Saving…" : t ? "Not applied" : "Applied";
	return /* @__PURE__ */ h("footer", {
		"data-testid": a,
		"data-state": n ? "saving" : t ? "previewing" : "clean",
		className: e("flex h-8 shrink-0 items-center justify-between gap-4 border-t border-solid border-border bg-surface-panel px-6 text-[12.5px] text-text-secondary", i),
		children: [/* @__PURE__ */ m("span", {
			className: "truncate",
			children: r ?? (t ? "Previewing changes · Original preserved" : "Original preserved")
		}), /* @__PURE__ */ h("span", {
			className: "inline-flex shrink-0 items-center gap-2",
			"data-testid": `${a}-state`,
			children: [/* @__PURE__ */ m("span", {
				"aria-hidden": !0,
				className: e("h-2 w-2 rounded-full", n ? "bg-info" : t ? "bg-warning" : "bg-success")
			}), o]
		})]
	});
}
//#endregion
export { F as AdjustedImageCanvas, G as CompareLayoutIcon, K as EditStackIcon, U as FlagIcon, W as HeartIcon, g as NEUTRAL_KELVIN, S as NEUTRAL_PARAMS, B as PhotoCompareCanvas, Z as PhotoEditorShell, Q as PhotoEditorStatusBar, J as PhotoEditorTopBar, X as PhotoFilmstrip, H as SidebarToggleIcon, E as adjustRgb, M as createAdjustRenderer, N as cssFilterFor, x as effectiveOps, D as hueRotateMatrix, b as isNeutralOp, _ as opIdentity, w as paramsFromOps, y as removeOpIn, v as setOpIn };
