import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./Modal-PO0F6rAp.js";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/shared/ConfirmDialog.tsx
var a = {
	destructive: "bg-danger hover:bg-danger",
	caution: "bg-warning hover:bg-warning",
	info: "bg-info hover:bg-info"
};
function o({ open: o, onConfirm: s, onCancel: c, title: l, body: u, confirmLabel: d = "Confirm", cancelLabel: f = "Cancel", confirmDisabled: p = !1, tone: m = "info", children: h }) {
	return /* @__PURE__ */ i(t, {
		open: o,
		onClose: c,
		title: l,
		maxWidth: 420,
		dialogKind: "confirm",
		footer: /* @__PURE__ */ i(n, { children: [/* @__PURE__ */ r("button", {
			type: "button",
			"data-testid": "confirm-dialog-cancel",
			onClick: c,
			className: e("px-4 py-[7px] text-sm font-[inherit]", "border border-border bg-surface text-text-secondary", "rounded-md cursor-pointer hover:bg-surface-panel"),
			children: f
		}), /* @__PURE__ */ r("button", {
			type: "button",
			"data-testid": "confirm-dialog-confirm",
			onClick: s,
			disabled: p,
			className: e("px-4 py-[7px] text-sm font-semibold font-[inherit]", "border-none text-white rounded-md transition-colors duration-150", a[m], p ? "cursor-not-allowed opacity-70" : "cursor-pointer opacity-100"),
			children: d
		})] }),
		children: [u && /* @__PURE__ */ r("p", {
			className: "m-0 mb-3 text-[13px] text-text-secondary",
			children: u
		}), h]
	});
}
//#endregion
export { o as t };
