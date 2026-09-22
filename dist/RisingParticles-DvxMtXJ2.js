import { t as e } from "./usePrefersReducedMotion-Cllucr7i.js";
import { t } from "./cn-DhjIN-s0.js";
import { useEffect as n, useMemo as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/shared/DotMeter.tsx
var s = {
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
function c({ label: e, value: n, segments: r = 10, showPercent: i = !0, note: c, warnAbove: l = .85, tone: u = "code", className: d, "data-testid": f }) {
	let p = s[u], m = Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0, h = Math.round(m * 100), g = m >= 1 ? r : Math.min(r - 1, Math.round(m * r)), _ = m > l;
	return /* @__PURE__ */ o("div", {
		"data-testid": f,
		className: t("flex items-center gap-2 text-[10px] font-mono leading-none", d),
		role: "meter",
		"aria-valuenow": h,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": e ? `${e}: ${h}%${c ? `, ${c}` : ""}` : void 0,
		children: [
			e != null && /* @__PURE__ */ a("span", {
				className: t("w-14 shrink-0 truncate", p.label),
				children: e
			}),
			/* @__PURE__ */ a("span", {
				"aria-hidden": "true",
				className: "flex items-center gap-[3px] shrink-0",
				children: Array.from({ length: r }, (e, n) => /* @__PURE__ */ a("span", { className: t("w-[5px] h-[5px] rounded-full", n < g ? _ ? p.warn : p.filled : p.empty) }, n))
			}),
			i && /* @__PURE__ */ o("span", {
				className: t("w-8 shrink-0 tabular-nums", p.value),
				children: [h, "%"]
			}),
			c != null && /* @__PURE__ */ a("span", {
				className: t("truncate", p.note),
				children: c
			})
		]
	});
}
//#endregion
//#region src/components/shared/RisingParticles.tsx
var l = 2560, u = 250, d = [
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
], f = {
	low: .35,
	medium: 1,
	high: 1.75
};
function p(e) {
	let t = e >>> 0;
	return () => {
		t = t + 1831565813 >>> 0;
		let e = Math.imul(t ^ t >>> 15, 1 | t);
		return e = e + Math.imul(e ^ e >>> 7, 61 | e) ^ e, ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function m(e, t) {
	let n = p(t), r = [];
	for (let t = 0; t < e; t += 1) r.push(`${Math.round(n() * l)}px ${Math.round(n() * l)}px white`);
	return r.join(", ");
}
function h({ active: s, intensity: c = "medium", seed: l = 1, className: p, children: h, "data-testid": g = "rising-particles" }) {
	let _ = e(), [v, y] = i(s);
	n(() => {
		if (s) {
			y(!0);
			return;
		}
		let e = setTimeout(() => y(!1), u);
		return () => clearTimeout(e);
	}, [s]);
	let b = r(() => d.map((e, t) => ({
		...e,
		field: m(Math.max(1, Math.round(e.count * f[c])), l + t * 7919),
		points: Math.max(1, Math.round(e.count * f[c]))
	})), [c, l]);
	return /* @__PURE__ */ o("div", {
		"data-testid": g,
		"data-active": s ? "true" : "false",
		className: t("relative isolate", v && "overflow-hidden", p),
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
export { c as n, h as t };
