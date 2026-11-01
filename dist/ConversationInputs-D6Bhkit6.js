import { n as e } from "./Button-C-I3BxWI.js";
import { l as t } from "./Text-DqNdYJ7p.js";
import { createContext as n, useCallback as r, useContext as i, useEffect as a, useMemo as o, useRef as s, useState as c, useSyncExternalStore as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/components/social/conversationInputRegistry.ts
var f = { owner: "thread" };
function p(e, t) {
	if (!e) return f;
	for (let n = t.length - 1; n >= 0; --n) {
		let r = t[n];
		if (r.channels.includes(e)) return {
			owner: "composer",
			claimId: r.id,
			label: r.label,
			replies: r.replies
		};
	}
	return f;
}
var m = class {
	entries = [];
	claimsValue = [];
	listeners = /* @__PURE__ */ new Set();
	focusListeners = [];
	revealers = /* @__PURE__ */ new Set();
	nextId = 1;
	claim(e) {
		let t = {
			claim: {
				id: this.nextId++,
				channels: [...new Set(e.channels)],
				label: e.label,
				replies: !!e.replies
			},
			focus: e.focus
		};
		return this.entries = [...this.entries, t], this.publish(), () => {
			let e = this.entries.length;
			this.entries = this.entries.filter((e) => e !== t), this.entries.length !== e && this.publish();
		};
	}
	focusThread(e) {
		let t = p(e.channel, this.claimsValue);
		if (t.owner !== "composer") return !1;
		let n = this.entries.find((e) => e.claim.id === t.claimId);
		return n ? n.focus(e) : !1;
	}
	claims = () => this.claimsValue;
	onFocusRequest(e) {
		return this.focusListeners.push(e), this.publish(), () => {
			let t = this.focusListeners.lastIndexOf(e);
			t >= 0 && (this.focusListeners.splice(t, 1), this.publish());
		};
	}
	onReveal(e) {
		return this.revealers.add(e), () => {
			this.revealers.delete(e);
		};
	}
	requestFocus(e) {
		for (let t of this.revealers) t(e);
		for (let t of [...this.focusListeners]) if (t(e)) return !0;
		return !1;
	}
	composerPresent = () => this.focusListeners.length > 0;
	subscribe = (e) => (this.listeners.add(e), () => {
		this.listeners.delete(e);
	});
	publish() {
		let e = this.entries.map((e) => e.claim);
		e.length === this.claimsValue.length && e.every((e, t) => e === this.claimsValue[t]) || (this.claimsValue = e);
		for (let e of this.listeners) e();
	}
}, h = new m(), g = n(h);
function _({ children: e }) {
	let [t] = c(() => new m());
	return /* @__PURE__ */ u(g.Provider, {
		value: t,
		children: e
	});
}
function v() {
	return i(g);
}
function y(e) {
	let t = v(), n = s(e.focus);
	n.current = e.focus;
	let r = e.channels.filter((e) => !!e), i = r.join("\n"), o = e.enabled !== !1 && r.length > 0;
	a(() => {
		if (o) return t.claim({
			channels: i.split("\n"),
			label: e.label,
			replies: !!e.replies,
			focus: (e) => n.current(e)
		});
	}, [
		t,
		o,
		i,
		e.label,
		e.replies
	]);
}
function b(e) {
	let t = v(), n = l(t.subscribe, t.claims, t.claims), i = o(() => p(e, n), [e, n]), a = r((n) => !!e && t.focusThread({
		channel: e,
		...n ? { reply: n } : {}
	}), [t, e]);
	return o(() => ({
		...i,
		focus: a
	}), [i, a]);
}
function x(e, t = !0) {
	let n = v(), r = s(e);
	r.current = e, a(() => t ? n.onFocusRequest((e) => r.current(e)) : void 0, [n, t]);
}
function S(e, t = !0) {
	let n = v(), r = s(e);
	r.current = e, a(() => t ? n.onReveal((e) => r.current(e)) : void 0, [n, t]);
}
function C() {
	let e = v(), t = l(e.subscribe, e.composerPresent, e.composerPresent);
	return {
		request: r((t) => e.requestFocus(t), [e]),
		present: t
	};
}
function w({ label: n, onFocus: r, "data-testid": i = "pane-input-handoff" }) {
	return /* @__PURE__ */ u(t, {
		gap: "none",
		className: "border-t border-border px-3 py-2",
		"data-testid": i,
		children: /* @__PURE__ */ d(e, {
			variant: "secondary",
			size: "sm",
			fullWidth: !0,
			onClick: r,
			title: `Write in ${n}`,
			"data-testid": `${i}-focus`,
			children: ["Reply in ", n]
		})
	});
}
//#endregion
export { x as a, C as i, w as n, S as o, y as r, b as s, _ as t };
