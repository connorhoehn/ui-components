import { d as e } from "./Button-DQoeE5dN.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/shared/KeyValue.tsx
function r({ items: r, layout: i = "row", labelWidth: a = "w-28", divided: o = !1, responsive: s = !1, className: c, "aria-label": l, "data-testid": u = "key-value" }) {
	if (r.length === 0) return null;
	let d = i === "row", f = i === "inline", p = d && o;
	return /* @__PURE__ */ t("dl", {
		className: e("m-0 min-w-0", s && "@container/key-value", i === "grid" ? "grid grid-cols-2 gap-x-6 gap-y-3" : f ? "flex flex-wrap items-baseline gap-x-4 gap-y-1" : p ? "flex flex-col border-t border-border" : d ? "flex flex-col gap-2" : "flex flex-col gap-3", c),
		"data-layout": i,
		"data-divided": p || void 0,
		"data-testid": u,
		...l ? { "aria-label": l } : {},
		children: r.map((r, i) => /* @__PURE__ */ n("div", {
			className: e("min-w-0", s && p && "flex-wrap @lg/key-value:flex-nowrap", p ? "flex min-h-[38px] items-center gap-3 border-b border-border px-3 py-1.5" : d ? "flex items-baseline gap-3" : f ? "flex items-baseline gap-1" : "flex flex-col gap-1"),
			"data-testid": `${u}-item`,
			"data-key-value-row": "",
			children: [
				/* @__PURE__ */ t("dt", {
					className: e("m-0", s && p && "basis-full @lg/key-value:basis-auto", p ? e("shrink-0 text-sm text-text-primary", a) : "text-text-secondary", !p && (d ? e("shrink-0 text-xs", a) : f ? "shrink-0 text-xs" : "text-[12px]")),
					children: r.label
				}),
				/* @__PURE__ */ t("dd", {
					className: e("m-0 min-w-0 truncate", "text-sm", r.muted ? "text-text-tertiary" : "text-text-primary", d && "flex-1", r.mono && "font-mono text-[12px]"),
					...r.title ? { title: r.title } : {},
					children: r.value
				}),
				d && r.action != null && r.action !== !1 && /* @__PURE__ */ t("dd", {
					className: "m-0 flex shrink-0 items-center",
					"data-testid": `${u}-action`,
					children: r.action
				})
			]
		}, `${r.label}-${i}`))
	});
}
//#endregion
export { r as t };
