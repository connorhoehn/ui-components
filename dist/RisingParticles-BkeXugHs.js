import { t as e } from "./usePrefersReducedMotion-Cllucr7i.js";
import { d as t } from "./Button-DQoeE5dN.js";
import { useEffect as n, useMemo as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/shared/RisingParticles.tsx
var s = 2560, c = 250, l = [
	{
		id: "near",
		size: 1,
		count: 600,
		seconds: 60
	},
	{
		id: "mid",
		size: 2,
		count: 200,
		seconds: 120
	},
	{
		id: "far",
		size: 3,
		count: 100,
		seconds: 180
	},
	{
		id: "drift",
		size: 1,
		count: 400,
		seconds: 600
	}
], u = {
	low: .35,
	medium: 1,
	high: 1.75
};
function d(e) {
	let t = e >>> 0;
	return () => {
		t = t + 1831565813 >>> 0;
		let e = Math.imul(t ^ t >>> 15, 1 | t);
		return e = e + Math.imul(e ^ e >>> 7, 61 | e) ^ e, ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function f(e, t) {
	let n = d(t), r = [];
	for (let t = 0; t < e; t += 1) r.push(`${Math.round(n() * s)}px ${Math.round(n() * s)}px white`);
	return r.join(", ");
}
function p({ active: s, intensity: d = "medium", seed: p = 1, className: m, children: h, "data-testid": g = "rising-particles" }) {
	let _ = e(), [v, y] = i(s);
	n(() => {
		if (s) {
			y(!0);
			return;
		}
		let e = setTimeout(() => y(!1), c);
		return () => clearTimeout(e);
	}, [s]);
	let b = r(() => l.map((e, t) => ({
		...e,
		field: f(Math.max(1, Math.round(e.count * u[d])), p + t * 7919),
		points: Math.max(1, Math.round(e.count * u[d]))
	})), [d, p]);
	return /* @__PURE__ */ o("div", {
		"data-testid": g,
		"data-active": s ? "true" : "false",
		className: t("relative isolate", v && "overflow-hidden", m),
		children: [v && /* @__PURE__ */ a("div", {
			"aria-hidden": "true",
			"data-testid": `${g}-backdrop`,
			"data-motion": _ ? "static" : "rising",
			className: t("uic-rising-particles pointer-events-none absolute inset-0 -z-10 transition-opacity duration-[250ms]", s ? "uic-rising-particles-in opacity-100" : "opacity-0"),
			children: b.map((e) => /* @__PURE__ */ a("span", {
				"data-testid": `${g}-layer`,
				"data-layer": e.id,
				"data-points": e.points,
				className: "uic-rising-particle absolute left-0 top-0 block",
				style: {
					"--uic-particle-size": `${e.size}px`,
					"--uic-particle-shadow": e.field,
					..._ ? {} : { "--uic-particle-duration": `${e.seconds}s` }
				}
			}, e.id))
		}), h]
	});
}
//#endregion
export { p as t };
