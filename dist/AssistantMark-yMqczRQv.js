import { f as e } from "./Button-DwPf_9pb.js";
import { s as t } from "./Icons-CNCMF52q.js";
import { createContext as n, useContext as r } from "react";
import { jsx as i } from "react/jsx-runtime";
//#region src/components/shared/DockedPanelContext.tsx
var a = n(null);
function o() {
	return r(a);
}
function s({ hasHeader: e = !0, fillsHeight: t = !0, children: n }) {
	return /* @__PURE__ */ i(a.Provider, {
		value: {
			hasHeader: e,
			fillsHeight: t
		},
		children: n
	});
}
//#endregion
//#region src/components/social/AssistantMark.tsx
var c = {
	16: "h-4 w-4 rounded",
	20: "h-5 w-5 rounded-md",
	24: "h-6 w-6 rounded-md",
	32: "h-8 w-8 rounded-lg"
}, l = {
	16: 12,
	20: 14,
	24: 16,
	32: 18
};
function u({ icon: n, size: r = 20, label: a, className: o }) {
	return /* @__PURE__ */ i("span", {
		"data-testid": "assistant-mark",
		...a ? {
			role: "img",
			"aria-label": a
		} : { "aria-hidden": !0 },
		className: e("inline-grid shrink-0 place-items-center border border-accent-border bg-accent-bg text-accent-fg", c[r], o),
		children: n ?? /* @__PURE__ */ i(t, { size: l[r] })
	});
}
//#endregion
export { s as n, o as r, u as t };
