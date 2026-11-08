import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./Spinner-CYflBP-c.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/shared/LoadingState.tsx
function i({ label: i = "Loading…", description: a, spinnerSize: o = "lg", spinnerColor: s, testId: c = "loading-state" }) {
	return /* @__PURE__ */ r("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": c,
		className: e("flex flex-col items-center justify-center min-h-[220px]", "text-text-secondary gap-3 p-8 font-[inherit]"),
		children: [
			/* @__PURE__ */ n(t, {
				size: o,
				color: s,
				decorative: !0
			}),
			/* @__PURE__ */ n("div", {
				className: "text-sm font-medium text-text-primary",
				children: i
			}),
			a && /* @__PURE__ */ n("div", {
				className: "text-xs text-center max-w-[340px] text-text-secondary leading-normal",
				children: a
			})
		]
	});
}
//#endregion
export { i as t };
