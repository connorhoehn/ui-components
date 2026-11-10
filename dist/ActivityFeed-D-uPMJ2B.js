import { d as e } from "./Button-DQoeE5dN.js";
import { n as t } from "./Avatar-P7osIYcA.js";
import { useEffect as n, useRef as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/shared/ActivityFeed.tsx
var s = {
	task: "var(--color-success)",
	pr: "var(--color-primary)",
	decision: "var(--color-warning)",
	comment: "var(--color-text-tertiary)",
	status: "var(--color-info)"
};
function c(e) {
	let t = e.trim().split(/\s+/), n = t[0] ?? "", r = t[1]?.[0] ?? "";
	return r ? `${n} ${r}.` : n;
}
function l({ item: e, dotColor: n }) {
	return /* @__PURE__ */ o("div", {
		className: "uc-activity-row flex items-center gap-1.5 py-[3.5px] overflow-hidden min-w-0",
		children: [
			/* @__PURE__ */ a("span", {
				className: "w-[5px] h-[5px] rounded-full shrink-0",
				style: { background: n }
			}),
			/* @__PURE__ */ a(t, {
				name: e.actor,
				size: 17
			}),
			/* @__PURE__ */ a("span", {
				className: "text-xs text-text-primary font-medium shrink-0",
				children: c(e.actor)
			}),
			/* @__PURE__ */ a("span", {
				className: "text-xs text-text-tertiary shrink-0",
				children: e.action
			}),
			e.ticketId && /* @__PURE__ */ a("span", {
				className: "text-[10px] font-bold font-mono text-primary-fg bg-primary-bg border border-primary-border rounded-[3px] px-[5px] py-px shrink-0 tracking-[0.01em] whitespace-nowrap",
				children: e.ticketId
			}),
			/* @__PURE__ */ a("span", {
				className: "text-xs text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0",
				title: e.subject,
				children: e.subject
			}),
			e.timeLabel && /* @__PURE__ */ a("span", {
				className: "text-xs text-text-secondary shrink-0 whitespace-nowrap",
				children: e.timeLabel
			})
		]
	});
}
function u({ items: t, visibleCount: o = 3, rotateMs: c = 4200, staggerMs: u = 0, kindColors: d, className: f }) {
	let p = {
		...s,
		...d
	}, [m, h] = i(() => t.slice(0, o)), g = r(o);
	return n(() => {
		h(t.slice(0, o)), g.current = o;
	}, [t, o]), n(() => {
		if (!c || t.length <= o) return;
		let e, n = setTimeout(() => {
			e = setInterval(() => {
				if (!t.length) return;
				let e = t[g.current % t.length];
				e && (g.current = (g.current + 1) % t.length, h((t) => [e, ...t].slice(0, o)));
			}, c);
		}, u);
		return () => {
			clearTimeout(n), clearInterval(e);
		};
	}, [
		t,
		o,
		c,
		u
	]), m.length === 0 ? /* @__PURE__ */ a("div", {
		className: e("flex-1 flex items-center", f),
		children: /* @__PURE__ */ a("span", {
			className: "text-xs text-text-secondary",
			children: "No recent activity"
		})
	}) : /* @__PURE__ */ a("div", {
		className: e("flex-1 flex flex-col overflow-hidden", f),
		children: m.map((e) => /* @__PURE__ */ a(l, {
			item: e,
			dotColor: p[e.kind ?? ""] ?? "var(--color-text-tertiary)"
		}, e.id))
	});
}
//#endregion
export { u as t };
