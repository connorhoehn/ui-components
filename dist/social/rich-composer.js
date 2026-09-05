import { t as e } from "../cn-DhjIN-s0.js";
import { t } from "../Avatar-BzicCOft.js";
import { n, r } from "../ReactionPickerPopover-moHezwrL.js";
import { n as i, t as a } from "../emojiShortcodes-Z7WT8QED.js";
import { forwardRef as o, useCallback as s, useEffect as c, useImperativeHandle as l, useMemo as u, useRef as d, useState as f } from "react";
import { Fragment as p, jsx as m, jsxs as h } from "react/jsx-runtime";
import { EditorContent as g, ReactRenderer as _, useEditor as v } from "@tiptap/react";
import y from "@tiptap/starter-kit";
import b from "@tiptap/extension-placeholder";
import { Extension as x, escapeForRegEx as S } from "@tiptap/core";
import { Plugin as C, PluginKey as w } from "@tiptap/pm/state";
import T from "@tiptap/extension-mention";
import { Decoration as E, DecorationSet as D } from "@tiptap/pm/view";
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var O = Math.min, k = Math.max, A = Math.round, j = Math.floor, M = (e) => ({
	x: e,
	y: e
}), N = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function ee(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function P(e) {
	return e.split("-")[0];
}
function F(e) {
	return e.split("-")[1];
}
function te(e) {
	return e === "x" ? "y" : "x";
}
function I(e) {
	return e === "y" ? "height" : "width";
}
function L(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function ne(e) {
	return te(L(e));
}
function re(e, t, n) {
	n === void 0 && (n = !1);
	let r = F(e), i = ne(e), a = I(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = de(o)), [o, de(o)];
}
function R(e) {
	let t = de(e);
	return [
		ie(e),
		t,
		ie(t)
	];
}
function ie(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var ae = ["left", "right"], oe = ["right", "left"], se = ["top", "bottom"], ce = ["bottom", "top"];
function le(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? oe : ae : t ? ae : oe;
		case "left":
		case "right": return t ? se : ce;
		default: return [];
	}
}
function ue(e, t, n, r) {
	let i = F(e), a = le(P(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(ie)))), a;
}
function de(e) {
	let t = P(e);
	return N[t] + e.slice(t.length);
}
function fe(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function pe(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : fe(e);
}
function me(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function he(e, t, n) {
	let { reference: r, floating: i } = e, a = L(t), o = ne(t), s = I(o), c = P(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = F(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function ge(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = ee(t, e), p = pe(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = me(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = me(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var _e = 50, ve = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: ge
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = he(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < _e && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = he(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, ye = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = ee(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = P(r), _ = L(o), v = P(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [de(o)] : R(o)), x = p !== "none";
			!d && x && b.push(...ue(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = re(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === L(t) || T.every((e) => L(e.placement) !== _ || e.overflows[0] > 0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = L(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement": n = o;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
}, be = /*#__PURE__*/ new Set(["left", "top"]);
async function xe(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = P(n), s = F(n), c = L(n) === "y", l = be.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = ee(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var Se = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await xe(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
};
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function z() {
	return typeof window < "u";
}
function B(e) {
	return Ce(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function V(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function H(e) {
	return ((Ce(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Ce(e) {
	return z() ? e instanceof Node || e instanceof V(e).Node : !1;
}
function U(e) {
	return z() ? e instanceof Element || e instanceof V(e).Element : !1;
}
function W(e) {
	return z() ? e instanceof HTMLElement || e instanceof V(e).HTMLElement : !1;
}
function we(e) {
	return !z() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof V(e).ShadowRoot;
}
function Te(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = J(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Ee(e) {
	return /^(table|td|th)$/.test(B(e));
}
function G(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var De = /transform|translate|scale|rotate|perspective|filter/, Oe = /paint|layout|strict|content/, K = (e) => !!e && e !== "none", ke;
function Ae(e) {
	let t = U(e) ? J(e) : e;
	return K(t.transform) || K(t.translate) || K(t.scale) || K(t.rotate) || K(t.perspective) || !Me() && (K(t.backdropFilter) || K(t.filter)) || De.test(t.willChange || "") || Oe.test(t.contain || "");
}
function je(e) {
	let t = Y(e);
	for (; W(t) && !q(t);) {
		if (Ae(t)) return t;
		if (G(t)) return null;
		t = Y(t);
	}
	return null;
}
function Me() {
	return ke ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), ke;
}
function q(e) {
	return /^(html|body|#document)$/.test(B(e));
}
function J(e) {
	return V(e).getComputedStyle(e);
}
function Ne(e) {
	return U(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Y(e) {
	if (B(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || we(e) && e.host || H(e);
	return we(t) ? t.host : t;
}
function Pe(e) {
	let t = Y(e);
	return q(t) ? (e.ownerDocument || e).body : W(t) && Te(t) ? t : Pe(t);
}
function X(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Pe(e), i = r === e.ownerDocument?.body, a = V(r);
	if (i) {
		let e = Fe(a);
		return t.concat(a, a.visualViewport || [], Te(r) ? r : [], e && n ? X(e) : []);
	}
	return t.concat(r, X(r, [], n));
}
function Fe(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function Ie(e) {
	let t = J(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = W(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = A(n) !== a || A(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Le(e) {
	return U(e) ? e : e.contextElement;
}
function Z(e) {
	let t = Le(e);
	if (!W(t)) return M(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Ie(t), o = (a ? A(n.width) : n.width) / r, s = (a ? A(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Re = /*#__PURE__*/ M(0);
function ze(e) {
	let t = V(e);
	return !Me() || !t.visualViewport ? Re : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Be(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === V(e);
}
function Q(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Le(e), o = M(1);
	t && (r ? U(r) && (o = Z(r)) : o = Z(e));
	let s = Be(a, n, r) ? ze(a) : M(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = V(a), t = U(r) ? V(r) : r, n = e, i = Fe(n);
		for (; i && t !== n;) {
			let e = Z(i), t = i.getBoundingClientRect(), r = J(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = V(i), i = Fe(n);
		}
	}
	return me({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function $(e, t) {
	let n = Ne(e).scrollLeft;
	return t ? t.left + n : Q(H(e)).left + n;
}
function Ve(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - $(e, n),
		y: n.top + t.scrollTop
	};
}
function He(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = H(r), s = t ? G(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = M(1), u = M(0), d = W(r);
	if ((d || !a) && ((B(r) !== "body" || Te(o)) && (c = Ne(r)), d)) {
		let e = Q(r);
		l = Z(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Ve(o, c) : M(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Ue(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function We(e) {
	let t = Ne(e), n = e.ownerDocument.body, r = k(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = k(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + $(e), o = -t.scrollTop;
	return J(n).direction === "rtl" && (a += k(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var Ge = 25;
function Ke(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = V(e), a = H(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !Me() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if ($(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= Ge && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function qe(e, t) {
	let n = Q(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Z(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Je(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Ke(e, n, t);
	else if (t === "document") r = We(H(e));
	else if (U(t)) r = qe(t, n);
	else {
		let n = ze(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return me(r);
}
function Ye(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = X(e, [], !1).filter((e) => U(e) && B(e) !== "body"), i = null, a = J(e).position === "fixed", o = a ? Y(e) : e;
	for (; U(o) && !q(o);) {
		let e = J(o), t = Ae(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = Y(o);
	}
	return t.set(e, r), r;
}
function Xe(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? G(t) ? [] : Ye(t, this._c) : [].concat(n), r], o = Je(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Je(t, a[e], i);
		s = k(n.top, s), c = O(n.right, c), l = O(n.bottom, l), u = k(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Ze(e) {
	let { width: t, height: n } = Ie(e);
	return {
		width: t,
		height: n
	};
}
function Qe(e, t, n) {
	let r = W(t), i = H(t), a = n === "fixed", o = Q(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = M(0);
	if ((r || !a) && ((B(t) !== "body" || Te(i)) && (s = Ne(t)), r)) {
		let e = Q(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = $(i));
	let l = i && !r && !a ? Ve(i, s) : M(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function $e(e) {
	return J(e).position === "static";
}
function et(e, t) {
	if (!W(e) || J(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return H(e) === n && (n = n.ownerDocument.body), n;
}
function tt(e, t) {
	let n = V(e);
	if (G(e)) return n;
	if (!W(e)) {
		let t = Y(e);
		for (; t && !q(t);) {
			if (U(t) && !$e(t)) return t;
			t = Y(t);
		}
		return n;
	}
	let r = et(e, t);
	for (; r && Ee(r) && $e(r);) r = et(r, t);
	return r && q(r) && $e(r) && !Ae(r) ? n : r || je(e) || n;
}
var nt = async function(e) {
	let t = this.getOffsetParent || tt, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Qe(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function rt(e) {
	return J(e).direction === "rtl";
}
var it = {
	convertOffsetParentRelativeRectToViewportRelativeRect: He,
	getDocumentElement: H,
	getClippingRect: Xe,
	getOffsetParent: tt,
	getElementRects: nt,
	getClientRects: Ue,
	getDimensions: Ze,
	getScale: Z,
	isElement: U,
	isRTL: rt
};
function at(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function ot(e, t, n) {
	let r = null, i, a = H(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = j(d), h = j(a.clientWidth - (u + f)), g = j(a.clientHeight - (d + p)), _ = j(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: k(0, O(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!at(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = V(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function st(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Le(e), u = i || a ? [...l ? X(l) : [], ...t ? X(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? ot(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Q(e) : null;
	c && g();
	function g() {
		let t = Q(e);
		h && !at(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var ct = Se, lt = ye, ut = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...it,
		...i.platform,
		_c: r
	};
	return ve(e, t, {
		...i,
		platform: a
	});
};
//#endregion
//#region node_modules/@tiptap/suggestion/dist/index.js
function dt(e) {
	let { char: t, allowSpaces: n, allowToIncludeChar: r, allowedPrefixes: i, startOfLine: a, $position: o } = e, s = n && !r, c = S(t), l = RegExp(`\\s${c}$`), u = a ? "^" : "", d = r ? "" : c, f = RegExp(s ? `${u}${c}.*?(?=\\s${d}|$)` : `${u}(?:^)?${c}[^\\s${d}]*`, "gm"), p = o.nodeBefore?.isText && o.nodeBefore.text;
	if (!p) return null;
	let m = o.pos - p.length, h = Array.from(p.matchAll(f)).pop();
	if (!h || h.input === void 0 || h.index === void 0) return null;
	let g = h.input.slice(Math.max(0, h.index - 1), h.index), _ = RegExp(`^[${i?.join("")}\0]?$`).test(g);
	if (i !== null && !_) return null;
	let v = m + h.index, y = v + h[0].length;
	return s && l.test(p.slice(y - 1, y + 1)) && (h[0] += " ", y += 1), v < o.pos && y >= o.pos ? {
		range: {
			from: v,
			to: y
		},
		query: h[0].slice(t.length),
		text: h[0]
	} : null;
}
function ft(e) {
	return e.docChanged ? e.steps.some((e) => {
		let t = e.slice;
		if (!t?.content) return !1;
		let n = t.content.textBetween(0, t.content.size, "\n");
		return /\s/.test(n);
	}) : !1;
}
function pt(e) {
	return () => {
		let t = e.state.selection.$anchor.pos, { top: n, right: r, bottom: i, left: a } = e.view.coordsAtPos(t);
		try {
			return new DOMRect(a, n, r - a, i - n);
		} catch {
			return null;
		}
	};
}
function mt(e, t, n, r) {
	return n ? () => {
		let n = r.getState(e.state)?.decorationId;
		return t.dom.querySelector(`[data-decoration-id="${n}"]`)?.getBoundingClientRect() || null;
	} : pt(e);
}
function ht({ match: e, dismissedRange: t, state: n, transaction: r, editor: i, shouldResetDismissed: a, effectiveAllowSpaces: o }) {
	return a?.({
		editor: i,
		state: n,
		range: t,
		match: e,
		transaction: r,
		allowSpaces: o
	}) ? !1 : o ? e.range.from === t.from : e.range.from === t.from && !ft(r);
}
function gt({ view: e, pluginKeyRef: t }) {
	let n = e.state.tr.setMeta(t, { exit: !0 });
	e.dispatch(n);
}
function _t({ pluginKey: e, decorationTag: t, decorationClass: n, decorationContent: r, decorationEmptyClass: i, renderer: a, dispatchExit: o }) {
	return {
		handleKeyDown(t, n) {
			var r;
			let i = e.getState(t.state);
			return i.active ? n.key === "Escape" || n.key === "Esc" ? ((r = a?.onKeyDown) == null || r.call(a, {
				view: t,
				event: n,
				range: i.range
			}), o(t), !0) : (a?.onKeyDown)?.call(a, {
				view: t,
				event: n,
				range: i.range
			}) || !1 : !1;
		},
		decorations(a) {
			let { active: o, range: s, decorationId: c, query: l } = e.getState(a);
			if (!o) return null;
			let u = !l?.length, d = [n];
			return u && d.push(i), D.create(a.doc, [E.inline(s.from, s.to, {
				nodeName: t,
				class: d.join(" "),
				"data-decoration-id": c || void 0,
				"data-decoration-content": r
			})]);
		}
	};
}
function vt({ editor: e, char: t, effectiveAllowSpaces: n, allowToIncludeChar: r, allowedPrefixes: i, startOfLine: a, findSuggestionMatch: o, allow: s, shouldShow: c, shouldKeepDismissed: l, pluginKey: u }) {
	return {
		init() {
			return {
				active: !1,
				range: {
					from: 0,
					to: 0
				},
				query: null,
				text: null,
				composing: !1,
				dismissedRange: null
			};
		},
		apply(d, f, p, m) {
			let { isEditable: h } = e, { composing: g } = e.view, { selection: _ } = d, { empty: v, from: y } = _, b = { ...f }, x = d.getMeta(u);
			if (x && x.exit) return b.active = !1, b.decorationId = null, b.range = {
				from: 0,
				to: 0
			}, b.query = null, b.text = null, b.dismissedRange = f.active ? { ...f.range } : f.dismissedRange, b;
			if (b.composing = g, d.docChanged && b.dismissedRange !== null && (b.dismissedRange = {
				from: d.mapping.map(b.dismissedRange.from),
				to: d.mapping.map(b.dismissedRange.to)
			}), h && (v || e.view.composing)) {
				(y < f.range.from || y > f.range.to) && !g && !f.composing && (b.active = !1);
				let u = o({
					char: t,
					allowSpaces: n,
					allowToIncludeChar: r,
					allowedPrefixes: i,
					startOfLine: a,
					$position: _.$from
				}), p = `id_${Math.floor(Math.random() * 4294967295)}`;
				u && s({
					editor: e,
					state: m,
					range: u.range,
					isActive: f.active
				}) && (!c || c({
					editor: e,
					range: u.range,
					query: u.query,
					text: u.text,
					transaction: d
				})) ? (b.dismissedRange !== null && !l({
					match: u,
					dismissedRange: b.dismissedRange,
					state: m,
					transaction: d
				}) && (b.dismissedRange = null), b.dismissedRange === null ? (b.active = !0, b.decorationId = f.decorationId || p, b.range = u.range, b.query = u.query, b.text = u.text) : b.active = !1) : (u || (b.dismissedRange = null), b.active = !1);
			} else b.active = !1;
			return b.active || (b.decorationId = null, b.range = {
				from: 0,
				to: 0
			}, b.query = null, b.text = null), b;
		}
	};
}
function yt({ editor: e, items: t }) {
	let n = null, r = null, i = null, a = () => {
		r !== null && (clearTimeout(r), r = null), i?.(), i = null;
	}, o = (e) => new Promise((t) => {
		i = t, r = setTimeout(() => {
			r = null;
			let e = i;
			i = null, e?.();
		}, e);
	}), s = () => {
		n?.abort(), a(), n = null;
	};
	return {
		abort: s,
		fetch: async (r, i) => {
			s(), n = new AbortController();
			let a = n;
			if (i > 0 && await o(i), n !== a || a.signal.aborted) return { status: "aborted" };
			try {
				let i = await t({
					editor: e,
					query: r,
					signal: a.signal
				});
				return n !== a || a.signal.aborted ? { status: "aborted" } : {
					status: "resolved",
					items: i
				};
			} catch {
				return n !== a || a.signal.aborted ? { status: "aborted" } : { status: "error" };
			}
		}
	};
}
function bt({ placement: e, offset: t, flip: n, floatingUi: r }) {
	let i = [ct({
		mainAxis: t.mainAxis ?? 4,
		crossAxis: t.crossAxis ?? 0
	})];
	return n && i.push(lt()), r?.middleware?.length && i.push(...r.middleware), {
		placement: e,
		strategy: r?.strategy ?? "absolute",
		middleware: i
	};
}
function xt(e) {
	if (e instanceof HTMLElement) return e;
	if (typeof e == "string") try {
		let t = document.querySelector(e);
		if (t) return t;
	} catch {
		return document.body;
	}
	return document.body;
}
function St({ getReferenceRect: e, contextElement: t, config: n, container: r, dismissOnOutsideClick: i, dismiss: a }) {
	return (o, s = {}) => {
		let c = {
			getBoundingClientRect: () => e() ?? new DOMRect(),
			contextElement: t
		}, l = !1, u = !o.isConnected;
		u && xt(r).appendChild(o), s.onPosition || (o.style.visibility = "hidden", o.style.width = "max-content");
		let d = st(c, o, () => {
			ut(c, o, {
				placement: n.placement,
				strategy: n.strategy,
				middleware: n.middleware
			}).then(({ x: e, y: t, placement: n, strategy: r }) => {
				if (s.onPosition) {
					s.onPosition({
						x: e,
						y: t,
						placement: n,
						strategy: r
					});
					return;
				}
				Object.assign(o.style, {
					position: r,
					left: `${e}px`,
					top: `${t}px`
				}), l || (l = !0, o.style.visibility = "");
			});
		}, s.autoUpdate), f;
		return i && (f = (e) => {
			let n = e.target;
			!(n instanceof Node) || o.contains(n) || t.contains(n) || a();
		}, document.addEventListener("pointerdown", f, !0)), () => {
			d(), f && document.removeEventListener("pointerdown", f, !0), u && o.remove();
		};
	};
}
function Ct({ editor: e, pluginKey: t, items: n, renderer: r, minQueryLength: i, debounce: a, initialItems: o, placement: s, offset: c, container: l, flip: u, floatingUi: d, dismissOnOutsideClick: f, command: p, clientRectFor: m, dispatchExit: h }) {
	let g, _ = yt({
		editor: e,
		items: n
	}), v = bt({
		placement: s,
		offset: c,
		flip: u,
		floatingUi: d
	});
	function y(e, t) {
		var n, i, a;
		switch (e) {
			case "started":
				(n = r?.onStart) == null || n.call(r, t);
				break;
			case "updated":
				(i = r?.onUpdate) == null || i.call(r, t);
				break;
			case "stopped": (a = r?.onExit) == null || a.call(r, t);
		}
	}
	return {
		update: async (n, d) => {
			var b, x;
			let S = t.getState(d), C = t.getState(n.state);
			if (!S || !C) return;
			let w = null, T = S.query !== C.query, E = S.text !== C.text, D = S.range.from !== C.range.from || S.range.to !== C.range.to, O = T || E || D;
			if (!S.active && C.active) w = "started";
			else if (S.active && !C.active) w = "stopped";
			else if (C.active && O) w = "updated";
			else return;
			let k = w === "stopped" ? S : C, A = n.dom.querySelector(`[data-decoration-id="${k.decorationId}"]`), j = m(n, A), M = i === 0 || (k.query ? k.query.length >= i : !1), N = (w === "started" || w === "updated") && M;
			if (g = {
				editor: e,
				range: k.range,
				query: k.query || "",
				text: k.text || "",
				items: o ?? [],
				command: (t) => p({
					editor: e,
					range: k.range,
					props: t
				}),
				decorationNode: A,
				clientRect: j,
				loading: N,
				placement: s,
				offset: {
					mainAxis: c.mainAxis ?? 4,
					crossAxis: c.crossAxis ?? 0
				},
				container: l,
				flip: u,
				floatingUi: v,
				mount: St({
					getReferenceRect: j,
					contextElement: n.dom,
					config: v,
					container: l,
					dismissOnOutsideClick: f,
					dismiss: () => h(e.view)
				})
			}, w === "started" && ((b = r?.onBeforeStart) == null || b.call(r, g)), w === "updated" && ((x = r?.onBeforeUpdate) == null || x.call(r, g)), w === "started" && y(w, g), w === "started" || w === "updated") {
				if (!N) _.abort(), g = {
					...g,
					items: o ?? [],
					loading: !1
				};
				else {
					g = {
						...g,
						items: o ?? [],
						loading: !0
					}, w = "updated", y(w, g);
					let e = await _.fetch(k.query || "", a);
					if (e.status === "aborted") return;
					if (!t.getState(n.state)?.active) {
						_.abort();
						return;
					}
					g = e.status === "resolved" ? {
						...g,
						items: e.items,
						loading: !1
					} : {
						...g,
						loading: !1
					};
				}
			}
			if (w === "stopped") {
				_.abort(), y(w, g), g = void 0;
				return;
			}
			w === "updated" && y(w, g);
		},
		destroy: () => {
			var e;
			_.abort(), g && ((e = r?.onExit) == null || e.call(r, g));
		}
	};
}
var wt = new w("suggestion");
function Tt({ pluginKey: e = wt, editor: t, char: n = "@", allowSpaces: r = !1, allowToIncludeChar: i = !1, allowedPrefixes: a = [" "], startOfLine: o = !1, decorationTag: s = "span", decorationClass: c = "suggestion", decorationContent: l = "", decorationEmptyClass: u = "is-empty", command: d = () => null, items: f = () => [], minQueryLength: p = 0, debounce: m = 0, initialItems: h, placement: g = "bottom-start", offset: _ = {}, container: v, flip: y = !0, floatingUi: b, dismissOnOutsideClick: x = !0, render: S = () => ({}), allow: w = () => !0, findSuggestionMatch: T = dt, shouldShow: E, shouldResetDismissed: D }) {
	let O = S?.(), k = r && !i, A = (n, r) => mt(t, n, r, e);
	function j(e) {
		return ht({
			...e,
			editor: t,
			shouldResetDismissed: D,
			effectiveAllowSpaces: k
		});
	}
	let M = (t) => gt({
		view: t,
		pluginKeyRef: e
	});
	return new C({
		key: e,
		view: () => Ct({
			editor: t,
			pluginKey: e,
			items: f,
			renderer: O,
			minQueryLength: p,
			debounce: m,
			initialItems: h,
			placement: g,
			offset: _,
			container: v,
			flip: y,
			floatingUi: b,
			dismissOnOutsideClick: x,
			command: d,
			clientRectFor: A,
			dispatchExit: M
		}),
		state: vt({
			editor: t,
			char: n,
			effectiveAllowSpaces: k,
			allowToIncludeChar: i,
			allowedPrefixes: a,
			startOfLine: o,
			findSuggestionMatch: T,
			allow: w,
			shouldShow: E,
			shouldKeepDismissed: j,
			pluginKey: e
		}),
		props: _t({
			pluginKey: e,
			decorationTag: s,
			decorationClass: c,
			decorationContent: l,
			decorationEmptyClass: u,
			renderer: O,
			dispatchExit: M
		})
	});
}
var Et = Tt;
//#endregion
//#region src/components/social/ComposerAttachments.tsx
function Dt(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${Math.round(e / 1024)} KB` : `${(e / 1048576).toFixed(1)} MB`;
}
function Ot({ file: e }) {
	let [t, n] = f(null);
	return c(() => {
		if (!e.type.startsWith("image/")) return;
		let t = URL.createObjectURL(e);
		return n(t), () => {
			URL.revokeObjectURL(t), n(null);
		};
	}, [e]), t ? /* @__PURE__ */ m("img", {
		src: t,
		alt: "",
		"aria-hidden": !0,
		className: "h-9 w-9 shrink-0 rounded object-cover",
		"data-testid": "composer-attachment-thumb"
	}) : /* @__PURE__ */ m("span", {
		"aria-hidden": !0,
		className: "grid h-9 w-9 shrink-0 place-items-center rounded bg-surface-inset text-sm",
		children: "📄"
	});
}
function kt({ files: t, onRemove: n, disabled: r = !1, className: i, "data-testid": a = "composer-attachments" }) {
	return t.length === 0 ? null : /* @__PURE__ */ m("ul", {
		"data-testid": a,
		"aria-label": "Attachments",
		className: e("m-0 flex list-none flex-wrap gap-1.5 px-2 pt-2", i),
		children: t.map(({ id: e, file: t }) => /* @__PURE__ */ h("li", {
			"data-testid": "composer-attachment",
			className: "flex items-center gap-2 rounded-lg border border-border bg-surface-inset py-1 pl-1 pr-1.5",
			children: [
				/* @__PURE__ */ m(Ot, { file: t }),
				/* @__PURE__ */ h("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ m("span", {
						className: "max-w-[11rem] truncate text-xs text-text-primary",
						title: t.name,
						children: t.name
					}), /* @__PURE__ */ m("span", {
						className: "text-[11px] text-text-tertiary",
						children: Dt(t.size)
					})]
				}),
				/* @__PURE__ */ m("button", {
					type: "button",
					"aria-label": `Remove ${t.name}`,
					title: "Remove",
					disabled: r,
					onClick: () => n(e),
					className: "grid h-5 w-5 shrink-0 place-items-center rounded text-text-tertiary hover:bg-surface-hover hover:text-text-primary",
					children: "✕"
				})
			]
		}, e))
	});
}
//#endregion
//#region src/components/social/MentionSuggestions.tsx
var At = o(function({ items: n, command: r }, i) {
	let [a, o] = f(0);
	c(() => o(0), [n]);
	let s = (e) => {
		let t = n[e];
		t && r({
			id: t.id,
			label: t.label
		});
	};
	return l(i, () => ({ onKeyDown: ({ event: e }) => e.key === "ArrowUp" ? (o((e) => (e + n.length - 1) % n.length), !0) : e.key === "ArrowDown" ? (o((e) => (e + 1) % n.length), !0) : e.key === "Enter" || e.key === "Tab" ? (s(a), !0) : !1 })), n.length === 0 ? null : /* @__PURE__ */ m("div", {
		"data-testid": "mention-suggestions",
		role: "listbox",
		"aria-label": "People",
		className: "max-h-56 w-64 overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-lg",
		children: n.map((n, r) => /* @__PURE__ */ h("button", {
			type: "button",
			role: "option",
			"aria-selected": r === a,
			"data-testid": "mention-option",
			onMouseDown: (e) => {
				e.preventDefault(), s(r);
			},
			onMouseEnter: () => o(r),
			className: e("flex w-full items-center gap-2 px-2 py-1.5 text-left text-sm", r === a ? "bg-surface-hover" : "bg-transparent"),
			children: [/* @__PURE__ */ m(t, {
				name: n.label,
				src: n.avatarUrl,
				color: n.color,
				size: 24
			}), /* @__PURE__ */ h("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ m("span", {
					className: "block truncate text-text-primary",
					children: n.label
				}), n.hint && /* @__PURE__ */ m("span", {
					className: "block truncate text-xs text-text-tertiary",
					children: n.hint
				})]
			})]
		}, n.id))
	});
}), jt = o(function({ items: t, command: n }, r) {
	let [i, a] = f(0);
	c(() => a(0), [t]);
	let o = (e) => {
		let r = t[e];
		r && n({ emoji: r.emoji });
	};
	return l(r, () => ({ onKeyDown: ({ event: e }) => e.key === "ArrowUp" ? (a((e) => (e + t.length - 1) % t.length), !0) : e.key === "ArrowDown" ? (a((e) => (e + 1) % t.length), !0) : e.key === "Enter" || e.key === "Tab" ? (o(i), !0) : !1 })), t.length === 0 ? null : /* @__PURE__ */ m("div", {
		"data-testid": "emoji-suggestions",
		role: "listbox",
		"aria-label": "Emoji",
		className: "max-h-56 w-56 overflow-y-auto rounded-lg border border-border bg-surface py-1 shadow-lg",
		children: t.map((t, n) => /* @__PURE__ */ h("button", {
			type: "button",
			role: "option",
			"aria-selected": n === i,
			"data-testid": "emoji-option",
			onMouseDown: (e) => {
				e.preventDefault(), o(n);
			},
			onMouseEnter: () => a(n),
			className: e("flex w-full items-center gap-2 px-2 py-1 text-left text-sm", n === i ? "bg-surface-hover" : "bg-transparent"),
			children: [/* @__PURE__ */ m("span", {
				"aria-hidden": !0,
				className: "text-base leading-none",
				children: t.emoji
			}), /* @__PURE__ */ h("span", {
				className: "truncate text-text-secondary",
				children: [
					":",
					t.code,
					":"
				]
			})]
		}, t.code))
	});
});
//#endregion
//#region src/components/social/RichChatComposer.tsx
function Mt() {
	let e = null;
	return {
		attach(t) {
			e = t, document.body.appendChild(t);
		},
		place(t) {
			if (!e || !t) return;
			e.style.position = "absolute", e.style.zIndex = "9600";
			let n = t.bottom + 240 > window.innerHeight;
			e.style.top = `${(n ? t.top - 6 : t.bottom + 6) + window.scrollY}px`, e.style.left = `${t.left + window.scrollX}px`, e.style.transform = n ? "translateY(-100%)" : "";
		},
		detach() {
			e?.remove(), e = null;
		}
	};
}
function Nt(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	return e.state.doc.descendants((e) => {
		if (e.type.name !== "mention") return;
		let r = String(e.attrs.id ?? "");
		!r || t.has(r) || (t.add(r), n.push({
			id: r,
			label: String(e.attrs.label ?? r)
		}));
	}), n;
}
var Pt = 0;
function Ft({ onSend: t, onSearchPeople: a, allowAttachments: o = !1, allowEmoji: c = !1, placeholder: l = "Write a message…", disabled: S = !1, toolbarExtras: C, className: w, "data-testid": E = "rich-chat-composer" }) {
	let D = d(() => {}), O = d(null), k = d(null), [A, j] = f(!1), [M, N] = f([]), [ee, P] = f(!0), F = o && !S, te = u(() => {
		let e = [
			y.configure({
				heading: !1,
				horizontalRule: !1
			}),
			b.configure({ placeholder: l }),
			x.create({
				name: "emojiSuggestion",
				priority: 101,
				addProseMirrorPlugins() {
					return [Et({
						editor: this.editor,
						char: ":",
						allow: ({ state: e, range: t }) => e.doc.textBetween(t.from, t.to, "\0").length >= 3,
						items: ({ query: e }) => i(e),
						command: ({ editor: e, range: t, props: n }) => {
							e.chain().focus().deleteRange(t).insertContent(n.emoji).run();
						},
						render: () => {
							let e = null, t = Mt();
							return {
								onStart: (n) => {
									e = new _(jt, {
										props: n,
										editor: n.editor
									}), t.attach(e.element), t.place(n.clientRect?.());
								},
								onUpdate: (n) => {
									e?.updateProps(n), t.place(n.clientRect?.());
								},
								onKeyDown: (n) => n.event.key === "Escape" ? (t.detach(), !0) : (e?.ref)?.onKeyDown?.(n) ?? !1,
								onExit: () => {
									t.detach(), e?.destroy();
								}
							};
						}
					})];
				}
			}),
			x.create({
				name: "chatComposerKeymap",
				addKeyboardShortcuts() {
					return {
						Enter: () => (D.current(), !0),
						"Shift-Enter": ({ editor: e }) => e.commands.setHardBreak()
					};
				}
			})
		];
		return a && e.push(T.configure({
			HTMLAttributes: { class: "mention" },
			suggestion: {
				char: "@",
				items: ({ query: e }) => a(e),
				render: () => {
					let e = null, t = Mt();
					return {
						onStart: (n) => {
							e = new _(At, {
								props: n,
								editor: n.editor
							}), t.attach(e.element), t.place(n.clientRect?.());
						},
						onUpdate: (n) => {
							e?.updateProps(n), t.place(n.clientRect?.());
						},
						onKeyDown: (n) => n.event.key === "Escape" ? (t.detach(), !0) : (e?.ref)?.onKeyDown?.(n) ?? !1,
						onExit: () => {
							t.detach(), e?.destroy();
						}
					};
				}
			}
		})), e;
	}, [l, a]), I = v({
		extensions: te,
		editable: !S,
		onUpdate: ({ editor: e }) => P(e.isEmpty),
		editorProps: { attributes: {
			class: "chat-composer-input",
			"data-testid": `${E}-input`
		} }
	}, [te, S]), L = !S && (!ee || M.length > 0), ne = s(() => {
		!I || !L || (t({
			html: I.isEmpty ? "" : I.getHTML(),
			text: I.getText(),
			mentions: Nt(I),
			files: M.map((e) => e.file)
		}), I.commands.clearContent(!0), N([]), P(!0));
	}, [
		I,
		L,
		t,
		M
	]);
	D.current = ne;
	let re = s((e) => {
		!F || e.length === 0 || N((t) => [...t, ...e.map((e) => ({
			id: `staged-${Pt++}`,
			file: e
		}))]);
	}, [F]), R = (t, n, r, i, a) => /* @__PURE__ */ m("button", {
		ref: a,
		type: "button",
		"aria-label": t,
		"aria-pressed": n,
		title: t,
		disabled: S,
		onMouseDown: (e) => {
			e.preventDefault(), r();
		},
		className: e("grid h-7 w-7 place-items-center rounded text-sm leading-none", n ? "bg-surface-hover text-text-primary" : "text-text-secondary hover:bg-surface-hover"),
		children: i
	}, t);
	return /* @__PURE__ */ m(r, {
		onFiles: re,
		disabled: !F,
		className: w,
		children: /* @__PURE__ */ h("div", {
			"data-testid": E,
			className: "chat-composer rounded-lg border border-border bg-surface focus-within:border-primary",
			children: [
				/* @__PURE__ */ m(g, { editor: I }),
				/* @__PURE__ */ m(kt, {
					files: M,
					disabled: S,
					onRemove: (e) => N((t) => t.filter((t) => t.id !== e))
				}),
				/* @__PURE__ */ h("div", {
					className: "flex items-center gap-0.5 border-t border-border px-1.5 py-1",
					children: [
						I && [
							R("Bold", I.isActive("bold"), () => I.chain().focus().toggleBold().run(), /* @__PURE__ */ m("b", { children: "B" })),
							R("Italic", I.isActive("italic"), () => I.chain().focus().toggleItalic().run(), /* @__PURE__ */ m("i", { children: "I" })),
							R("Strikethrough", I.isActive("strike"), () => I.chain().focus().toggleStrike().run(), /* @__PURE__ */ m("s", { children: "S" })),
							R("Code", I.isActive("code"), () => I.chain().focus().toggleCode().run(), /* @__PURE__ */ m("span", {
								className: "font-mono text-[11px]",
								children: "<>"
							})),
							/* @__PURE__ */ m("span", {
								"aria-hidden": !0,
								className: "mx-1 h-4 w-px bg-border"
							}, "sep1"),
							R("Bulleted list", I.isActive("bulletList"), () => I.chain().focus().toggleBulletList().run(), /* @__PURE__ */ m("span", { children: "•" })),
							R("Numbered list", I.isActive("orderedList"), () => I.chain().focus().toggleOrderedList().run(), /* @__PURE__ */ m("span", {
								className: "text-[11px]",
								children: "1."
							})),
							R("Quote", I.isActive("blockquote"), () => I.chain().focus().toggleBlockquote().run(), /* @__PURE__ */ m("span", { children: "❝" }))
						],
						(c || F) && /* @__PURE__ */ m("span", {
							"aria-hidden": !0,
							className: "mx-1 h-4 w-px bg-border"
						}),
						c && I && /* @__PURE__ */ h("span", {
							className: "relative",
							children: [R("Emoji", A, () => j((e) => !e), /* @__PURE__ */ m("span", { children: "🙂" }), k), /* @__PURE__ */ m(n, {
								open: A,
								triggerRef: k,
								onClose: () => j(!1),
								onSelect: (e) => {
									I.chain().focus().insertContent(e).run(), j(!1);
								}
							})]
						}),
						F && /* @__PURE__ */ h(p, { children: [R("Attach files", !1, () => O.current?.click(), /* @__PURE__ */ m("span", { children: "📎" })), /* @__PURE__ */ m("input", {
							ref: O,
							type: "file",
							multiple: !0,
							hidden: !0,
							"data-testid": `${E}-file-input`,
							onChange: (e) => {
								re(Array.from(e.target.files ?? [])), e.target.value = "";
							}
						})] }),
						C,
						/* @__PURE__ */ m("button", {
							type: "button",
							onClick: ne,
							disabled: !L,
							"data-testid": `${E}-send`,
							className: "ml-auto rounded bg-primary px-2.5 py-1 text-xs font-semibold text-white disabled:opacity-40",
							children: "Send"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { kt as ComposerAttachments, a as EMOJI_SHORTCODES, jt as EmojiSuggestions, At as MentionSuggestions, Ft as RichChatComposer, i as searchEmoji };
