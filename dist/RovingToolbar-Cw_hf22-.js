import { t as e } from "./cn-DhjIN-s0.js";
import { useCallback as t, useEffect as n, useRef as r } from "react";
import { jsx as i } from "react/jsx-runtime";
//#region src/components/shared/RovingToolbar.tsx
function a({ label: a, children: o, orientation: s = "horizontal", className: c, "data-testid": l }) {
	let u = r(null), d = r(0), f = t(() => {
		let e = u.current;
		return e ? Array.from(e.querySelectorAll("button")).filter((e) => !e.disabled && e.getAttribute("aria-hidden") !== "true") : [];
	}, []), p = t((e) => {
		let t = f();
		if (t.length === 0) return;
		let n = (e % t.length + t.length) % t.length;
		return d.current = n, t.forEach((e, t) => {
			e.tabIndex = t === n ? 0 : -1;
		}), t[n];
	}, [f]);
	n(() => {
		let e = f();
		e.length !== 0 && p(Math.min(d.current, e.length - 1));
	});
	let m = s === "horizontal" ? "ArrowLeft" : "ArrowUp", h = s === "horizontal" ? "ArrowRight" : "ArrowDown";
	return /* @__PURE__ */ i("div", {
		ref: u,
		role: "toolbar",
		"aria-label": a,
		"aria-orientation": s,
		"data-testid": l,
		onFocus: (e) => {
			let t = f().indexOf(e.target);
			t >= 0 && p(t);
		},
		onKeyDown: (e) => {
			let t = f();
			if (t.length === 0) return;
			let n = t.indexOf(document.activeElement), r = n >= 0 ? n : d.current, i = null;
			e.key === h ? i = r + 1 : e.key === m ? i = r - 1 : e.key === "Home" ? i = 0 : e.key === "End" && (i = t.length - 1), i !== null && (e.preventDefault(), p(i)?.focus());
		},
		className: e("flex items-center", c),
		children: o
	});
}
//#endregion
export { a as t };
