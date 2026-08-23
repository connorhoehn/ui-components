import { t as e } from "./cn-DhjIN-s0.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/shared/Avatar.tsx
var r = [
	"#4f7cff",
	"#22c55e",
	"#f59e0b",
	"#ef4444",
	"#a855f7",
	"#14b8a6",
	"#0ea5e9",
	"#f97316"
];
function i(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = t * 33 ^ e.charCodeAt(n);
	return r[Math.abs(t) % r.length];
}
function a(e) {
	let t = e.trim();
	if (!t) return "?";
	let n = t.split(/\s+/);
	if (n.length >= 2) return (n[0][0] + n[1][0]).toUpperCase();
	let r = n[0];
	return r.length >= 2 ? r[0].toUpperCase() + r[1].toLowerCase() : r[0].toUpperCase();
}
function o({ name: n, size: r = 28, initials: o, color: s, src: c, className: l, style: u, title: d }) {
	let f = s || i(n), p = o ?? a(n);
	return /* @__PURE__ */ t("div", {
		title: d ?? n,
		className: e("inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none overflow-hidden", l),
		style: {
			width: r,
			height: r,
			background: f,
			color: "#fff",
			fontSize: r * .38,
			...u
		},
		children: c ? /* @__PURE__ */ t("img", {
			src: c,
			alt: n,
			width: r,
			height: r,
			className: "w-full h-full object-cover"
		}) : p
	});
}
function s({ names: r, items: i, maxVisible: a = 5, size: s = 28, className: c, total: l }) {
	let u = i ?? (r ?? []).map((e) => ({ name: e })), d = u.slice(0, a), f = (l ?? u.length) - d.length, p = -(s * .3);
	return /* @__PURE__ */ n("div", {
		className: e("inline-flex items-center", c),
		children: [d.map((e, n) => /* @__PURE__ */ t(o, {
			name: e.name,
			initials: e.initials,
			color: e.color,
			src: e.src,
			size: s,
			className: "border-2 border-white",
			style: { marginLeft: n > 0 ? p : 0 }
		}, `${e.name}-${n}`)), f > 0 && /* @__PURE__ */ n("div", {
			className: "inline-flex items-center justify-center rounded-full flex-shrink-0 font-semibold select-none bg-surface-emphasis text-text-secondary border-2 border-white",
			style: {
				width: s,
				height: s,
				fontSize: s * .38,
				marginLeft: p
			},
			title: `+${f} more`,
			children: ["+", f]
		})]
	});
}
//#endregion
export { a as i, s as n, i as r, o as t };
