import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./Input-Brvp1kPv.js";
import { useEffect as n, useRef as r, useState as i } from "react";
import { jsx as a } from "react/jsx-runtime";
//#region src/components/forms/InlineEditableText.tsx
var o = {
	title: "text-[14px] font-semibold text-text-primary",
	muted: "text-[12px] text-text-secondary"
};
function s({ value: s, onCommit: c, label: l, placeholder: u, maxLength: d, required: f = !1, disabled: p = !1, size: m = "sm", tone: h = "title", fitContent: g = !1, className: _, "data-testid": v = "inline-editable-text" }) {
	let [y, b] = i(!1), [x, S] = i(s), C = r(null), w = r(null), T = r(!1);
	n(() => {
		y || S(s);
	}, [s, y]), n(() => {
		y ? C.current?.select() : T.current && (T.current = !1, w.current?.focus());
	}, [y]);
	let E = () => {
		b(!1);
		let e = x.trim();
		if (f && !e) {
			S(s);
			return;
		}
		e !== s && c(e);
	};
	return y ? /* @__PURE__ */ a(t, {
		ref: C,
		size: m,
		value: x,
		"aria-label": l,
		placeholder: u,
		maxLength: d,
		autoFocus: !0,
		onChange: (e) => S(e.target.value),
		onBlur: E,
		onKeyDown: (e) => {
			e.key === "Enter" && (e.preventDefault(), T.current = !0, E()), e.key === "Escape" && (e.preventDefault(), T.current = !0, S(s), b(!1));
		},
		className: e("min-w-0", g && "w-auto min-w-[8ch] [field-sizing:content]", _),
		"data-testid": `${v}-input`
	}) : /* @__PURE__ */ a("button", {
		"data-ui-part": "",
		ref: w,
		type: "button",
		disabled: p,
		onClick: () => b(!0),
		"aria-label": `${l}: ${s || u || "empty"}. Click to edit.`,
		title: "Click to edit",
		"data-testid": v,
		className: e("min-w-0 truncate rounded border border-transparent bg-transparent px-1 py-0.5 text-left font-[inherit]", "hover:border-border hover:bg-surface-hover focus-visible:border-primary focus-visible:outline-none disabled:cursor-default disabled:hover:border-transparent disabled:hover:bg-transparent", o[h], !s && "italic text-text-tertiary", _),
		children: s || u
	});
}
//#endregion
export { s as t };
