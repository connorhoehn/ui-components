import { t as e } from "./cn-D4QmbyEy.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/shared/DotMeter.tsx
var r = {
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
function i({ label: i, value: a, segments: o = 10, showPercent: s = !0, note: c, warnAbove: l = .85, tone: u = "code", className: d, "data-testid": f }) {
	let p = r[u], m = Number.isFinite(a) ? Math.min(1, Math.max(0, a)) : 0, h = Math.round(m * 100), g = m >= 1 ? o : Math.min(o - 1, Math.round(m * o)), _ = m > l;
	return /* @__PURE__ */ n("div", {
		"data-testid": f,
		className: e("flex items-center gap-2 text-[10px] font-mono leading-none", d),
		role: "meter",
		"aria-valuenow": h,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": i ? `${i}: ${h}%${c ? `, ${c}` : ""}` : void 0,
		children: [
			i != null && /* @__PURE__ */ t("span", {
				className: e("w-14 shrink-0 truncate", p.label),
				children: i
			}),
			/* @__PURE__ */ t("span", {
				"aria-hidden": "true",
				className: "flex items-center gap-[3px] shrink-0",
				children: Array.from({ length: o }, (n, r) => /* @__PURE__ */ t("span", { className: e("w-[5px] h-[5px] rounded-full", r < g ? _ ? p.warn : p.filled : p.empty) }, r))
			}),
			s && /* @__PURE__ */ n("span", {
				className: e("w-8 shrink-0 tabular-nums", p.value),
				children: [h, "%"]
			}),
			c != null && /* @__PURE__ */ t("span", {
				className: e("truncate", p.note),
				children: c
			})
		]
	});
}
//#endregion
export { i as t };
