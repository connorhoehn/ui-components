import { n as e } from "./VisuallyHidden-CVFiyXyk.js";
import { useEffect as t, useRef as n, useState as r } from "react";
import { jsx as i } from "react/jsx-runtime";
//#region src/components/shared/LiveRegion.tsx
function a(e, i) {
	let [a, o] = r(e), s = n(e), c = n(0), l = n(null);
	return t(() => {
		if (s.current = e, i <= 0) {
			o(e);
			return;
		}
		let t = Date.now() - c.current;
		if (t >= i) {
			c.current = Date.now(), o(e);
			return;
		}
		l.current ||= setTimeout(() => {
			l.current = null, c.current = Date.now(), o(s.current);
		}, i - t);
	}, [e, i]), t(() => () => {
		l.current && clearTimeout(l.current);
	}, []), a;
}
function o({ message: t, politeness: n = "polite", atomic: r = !0, throttleMs: o = 0, role: s = "status", "data-testid": c }) {
	let l = a(t, o);
	return /* @__PURE__ */ i(e, {
		as: "div",
		"data-testid": c,
		children: /* @__PURE__ */ i("div", {
			...s === "none" ? null : { role: s },
			"aria-live": n,
			"aria-atomic": r,
			children: l
		})
	});
}
//#endregion
export { o as t };
