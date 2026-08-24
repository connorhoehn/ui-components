//#region src/lib/rovingFocus.ts
var e = /* @__PURE__ */ new Set(["ArrowLeft", "ArrowRight"]), t = /* @__PURE__ */ new Set(["ArrowUp", "ArrowDown"]), n = /* @__PURE__ */ new Set(["Home", "End"]);
function r(r, i = {}) {
	let { itemSelector: a = "[role=\"tab\"]", orientation: o = "horizontal" } = i, s = o === "horizontal" || o === "both", c = o === "vertical" || o === "both";
	if (!(s && e.has(r.key) || c && t.has(r.key) || n.has(r.key))) return !1;
	let l = r.currentTarget, u = Array.from(l.querySelectorAll(a)).filter((e) => !e.hasAttribute("disabled") && e.getAttribute("aria-disabled") !== "true");
	if (u.length === 0) return !1;
	let d = l.ownerDocument?.activeElement ?? null, f = d ? u.indexOf(d) : -1, p;
	return p = r.key === "Home" ? 0 : r.key === "End" ? u.length - 1 : r.key === "ArrowRight" || r.key === "ArrowDown" ? f < 0 ? 0 : (f + 1) % u.length : f <= 0 ? u.length - 1 : f - 1, r.preventDefault(), u[p].focus(), !0;
}
//#endregion
export { r as t };
