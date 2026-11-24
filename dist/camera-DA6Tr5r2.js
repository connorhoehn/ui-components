import { f as e } from "./Button-DwPf_9pb.js";
import { t } from "./DropdownMenu-BhfFj91k.js";
import { t as n } from "./PresenceAvatars-g_VszLJh.js";
import { useEffect as r, useState as i } from "react";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/components/diagram/DiagramPresenceBar.tsx
var c = "pointer-events-auto flex items-center gap-2 rounded-full border border-border bg-surface-panel/95 px-2.5 py-1.5 shadow-sm backdrop-blur";
function l({ participants: r, size: i = 26, actions: l, followingUserId: u = null, className: d, "data-testid": f = "diagram-presence" }) {
	let p = /* @__PURE__ */ new Map();
	for (let e of r) {
		let t = e.userId || e.clientId;
		(!p.has(t) || e.isSelf) && p.set(t, e);
	}
	let m = [...p.values()], h = m.map((e) => ({
		id: e.userId || e.clientId,
		name: e.isSelf ? `${e.displayName} (you)` : e.displayName,
		color: e.color,
		online: !0,
		detail: e.isSelf ? "you" : e.pointer ? "drawing" : "viewing"
	})), g = /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o(n, {
		users: h,
		maxVisible: 6,
		size: i
	}), /* @__PURE__ */ o("span", {
		className: "pr-0.5 text-[11px] font-medium tabular-nums text-text-secondary",
		children: m.length
	})] }), _ = m.filter((e) => !e.isSelf);
	if (!(l && (l.onMessage || l.onCall || l.onFollow)) || _.length === 0) return /* @__PURE__ */ o("div", {
		"data-testid": f,
		"data-participant-count": m.length,
		className: e(c, d),
		children: g
	});
	let v = _.map((e) => {
		let t = {
			userId: e.userId || e.clientId,
			clientId: e.clientId,
			displayName: e.displayName,
			color: e.color
		}, n = u != null && (u === e.userId || u === e.clientId);
		return {
			label: `${e.displayName} · ${e.pointer ? "drawing" : "viewing"}`,
			items: [
				...l.onMessage ? [{
					label: "Message",
					onSelect: () => l.onMessage(t)
				}] : [],
				...l.onCall ? [{
					label: "Call",
					onSelect: () => l.onCall(t)
				}] : [],
				...l.onFollow ? [{
					label: n ? "Stop following" : "Follow",
					active: n,
					onSelect: () => l.onFollow(t)
				}] : []
			]
		};
	});
	return /* @__PURE__ */ o("div", {
		"data-testid": f,
		"data-participant-count": m.length,
		className: e("pointer-events-auto", d),
		children: /* @__PURE__ */ o(t, {
			trigger: g,
			triggerLabel: `People on this diagram (${m.length})`,
			triggerTitle: "Who is here — message, call or follow them",
			triggerClassName: e(c, "text-inherit"),
			align: "end",
			sections: v,
			"data-testid": `${f}-menu`
		})
	});
}
//#endregion
//#region src/components/diagram/useResolvedTheme.ts
function u(e) {
	if (typeof document > "u") return "light";
	let t = (e?.closest("[data-theme]") ?? document.querySelector("[data-theme]"))?.getAttribute("data-theme");
	return t === "dark" ? "dark" : t === "light" ? "light" : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function d(e) {
	let [t, n] = i("light");
	return r(() => {
		if (typeof document > "u") return;
		let t = () => n(u(e.current));
		t();
		let r = new MutationObserver(t);
		r.observe(document.documentElement, {
			attributes: !0,
			attributeFilter: ["data-theme"],
			subtree: !0
		});
		let i = window.matchMedia?.("(prefers-color-scheme: dark)");
		return i?.addEventListener?.("change", t), () => {
			r.disconnect(), i?.removeEventListener?.("change", t);
		};
	}, [e]), t;
}
//#endregion
//#region src/components/diagram/camera.ts
var f = .1, p = 30;
function m(e, t) {
	return {
		x: -e.scrollX,
		y: -e.scrollY,
		width: t.width / e.zoom,
		height: t.height / e.zoom
	};
}
function h(e, t, n) {
	let r = n.margin ?? .05, i = Math.max(f, n.minZoom ?? .1), a = {
		width: t.width * (1 - 2 * r),
		height: t.height * (1 - 2 * r)
	}, o = Math.min(e.width > 0 ? a.width / e.width : Infinity, e.height > 0 ? a.height / e.height : Infinity), s = Math.min(30, Math.max(i, Math.min(n.zoom, o)));
	if (n.overflow === "start" && s > o) {
		let n = t.width * r / s, i = t.height * r / s;
		return {
			scrollX: n - e.x,
			scrollY: i - e.y,
			zoom: s
		};
	}
	let c = e.x + e.width / 2, l = e.y + e.height / 2;
	return {
		scrollX: t.width / (2 * s) - c,
		scrollY: t.height / (2 * s) - l,
		zoom: s
	};
}
function g(e) {
	let t = Infinity, n = Infinity, r = -Infinity, i = -Infinity;
	for (let a of e) {
		if (a.isDeleted) continue;
		let e = Math.min(a.x, a.x + a.width), o = Math.min(a.y, a.y + a.height), s = Math.max(a.x, a.x + a.width), c = Math.max(a.y, a.y + a.height);
		t = Math.min(t, e), n = Math.min(n, o), r = Math.max(r, s), i = Math.max(i, c);
	}
	return Number.isFinite(t) ? {
		x: t,
		y: n,
		width: r - t,
		height: i - n
	} : null;
}
//#endregion
export { m as a, g as i, f as n, d as o, h as r, l as s, p as t };
