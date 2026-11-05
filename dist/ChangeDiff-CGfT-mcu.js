import { t as e } from "./cn-D4QmbyEy.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/change-review/ChangeDiff.tsx
function r({ marker: r, label: i, value: a, emptyText: o, tone: s, testId: c }) {
	return /* @__PURE__ */ n("div", {
		"data-testid": c,
		"data-ui-change-diff-side": "",
		className: e("flex min-w-0 gap-2 rounded border px-2 py-1", s === "danger" ? "border-danger-border bg-danger-bg" : "border-success-border bg-success-bg"),
		children: [/* @__PURE__ */ t("span", {
			"aria-hidden": !0,
			className: e("shrink-0 select-none font-mono text-xs leading-5", s === "danger" ? "text-danger-fg" : "text-success-fg"),
			children: r
		}), /* @__PURE__ */ n("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ t("div", {
				className: e("text-xs uppercase tracking-wide", s === "danger" ? "text-danger-fg" : "text-success-fg"),
				children: i
			}), /* @__PURE__ */ t("div", {
				className: e("break-words text-xs", s === "danger" ? "text-danger-fg line-through decoration-danger-fg/40" : "text-success-fg"),
				children: a || /* @__PURE__ */ t("span", {
					className: "italic no-underline opacity-60",
					children: o
				})
			})]
		})]
	});
}
function i({ pairs: i, beforeLabel: a = "Now", afterLabel: o = "Proposed", className: s, "data-testid": c = "change-diff" }) {
	return i.length === 0 ? null : /* @__PURE__ */ t("div", {
		"data-testid": c,
		className: e("flex flex-col gap-2", s),
		children: i.map((e, i) => /* @__PURE__ */ n("div", {
			className: "flex flex-col gap-1",
			children: [/* @__PURE__ */ t(r, {
				marker: "-",
				label: a,
				value: e.before,
				emptyText: "(empty)",
				tone: "danger",
				testId: `${c}-before-${i}`
			}), /* @__PURE__ */ t(r, {
				marker: "+",
				label: o,
				value: e.after,
				emptyText: "(removed)",
				tone: "success",
				testId: `${c}-after-${i}`
			})]
		}, i))
	});
}
//#endregion
export { i as t };
