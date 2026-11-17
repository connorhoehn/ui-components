import { d as e } from "./Button-DQoeE5dN.js";
import { useCallback as t, useEffect as n, useRef as r } from "react";
import { jsx as i } from "react/jsx-runtime";
//#region src/components/shared/RovingToolbar.tsx
function a({ orientation: e = "horizontal" } = {}) {
	let i = r(null), a = r(0), o = t(() => {
		let e = i.current;
		return e ? Array.from(e.querySelectorAll("button")).filter((e) => !e.disabled && e.getAttribute("aria-hidden") !== "true" && !e.closest("[role=\"menu\"],[role=\"listbox\"],[role=\"dialog\"],[role=\"menubar\"],[role=\"grid\"]")) : [];
	}, []), s = t((e) => {
		let t = o();
		if (t.length === 0) return;
		let n = (e % t.length + t.length) % t.length;
		return a.current = n, t.forEach((e, t) => {
			e.tabIndex = t === n ? 0 : -1;
		}), t[n];
	}, [o]);
	n(() => {
		let e = o();
		e.length !== 0 && s(Math.min(a.current, e.length - 1));
	});
	let c = e === "horizontal" ? "ArrowLeft" : "ArrowUp", l = e === "horizontal" ? "ArrowRight" : "ArrowDown";
	return {
		ref: i,
		"aria-orientation": e,
		onFocus: (e) => {
			let t = o().indexOf(e.target);
			t >= 0 && s(t);
		},
		onKeyDown: (e) => {
			let t = o();
			if (t.length === 0) return;
			let n = t.indexOf(document.activeElement);
			if (n < 0) return;
			let r = null;
			e.key === l ? r = n + 1 : e.key === c ? r = n - 1 : e.key === "Home" ? r = 0 : e.key === "End" && (r = t.length - 1), r !== null && (e.preventDefault(), s(r)?.focus());
		}
	};
}
function o({ label: t, children: n, orientation: r = "horizontal", className: o, "data-testid": s }) {
	let c = a({ orientation: r });
	return /* @__PURE__ */ i("div", {
		...c,
		role: "toolbar",
		"aria-label": t,
		"data-testid": s,
		className: e("flex items-center", o),
		children: n
	});
}
//#endregion
export { a as n, o as t };
