import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Avatar-DeJWic2B.js";
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
var l = [
	1,
	.5,
	.18
];
function u({ item: e, opacity: n, dotColor: r }) {
	return /* @__PURE__ */ o("div", {
		className: "uc-activity-row flex items-center gap-1.5 py-[3.5px] overflow-hidden min-w-0 transition-[opacity] duration-[380ms] ease-in-out",
		style: { opacity: n },
		children: [
			/* @__PURE__ */ a("span", {
				className: "w-[5px] h-[5px] rounded-full shrink-0",
				style: { background: r }
			}),
			/* @__PURE__ */ a(t, {
				name: e.actor,
				size: 17
			}),
			/* @__PURE__ */ a("span", {
				className: "text-[11px] text-text-primary font-medium shrink-0",
				children: c(e.actor)
			}),
			/* @__PURE__ */ a("span", {
				className: "text-[11px] text-text-tertiary shrink-0",
				children: e.action
			}),
			e.ticketId && /* @__PURE__ */ a("span", {
				className: "text-[10px] font-bold font-mono text-primary-fg bg-primary-bg border border-primary-border rounded-[3px] px-[5px] py-px shrink-0 tracking-[0.01em] whitespace-nowrap",
				children: e.ticketId
			}),
			/* @__PURE__ */ a("span", {
				className: "text-[11px] text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0",
				title: e.subject,
				children: e.subject
			}),
			e.timeLabel && /* @__PURE__ */ a("span", {
				className: "text-[10px] text-code-subtle shrink-0 whitespace-nowrap",
				children: e.timeLabel
			})
		]
	});
}
function d({ items: t, visibleCount: o = 3, rotateMs: c = 4200, staggerMs: d = 0, kindColors: f, className: p }) {
	let m = {
		...s,
		...f
	}, [h, g] = i(() => t.slice(0, o)), _ = r(o);
	return n(() => {
		g(t.slice(0, o)), _.current = o;
	}, [t, o]), n(() => {
		if (!c || t.length <= o) return;
		let e, n = setTimeout(() => {
			e = setInterval(() => {
				if (!t.length) return;
				let e = t[_.current % t.length];
				e && (_.current = (_.current + 1) % t.length, g((t) => [e, ...t].slice(0, o)));
			}, c);
		}, d);
		return () => {
			clearTimeout(n), clearInterval(e);
		};
	}, [
		t,
		o,
		c,
		d
	]), h.length === 0 ? /* @__PURE__ */ a("div", {
		className: e("flex-1 flex items-center", p),
		children: /* @__PURE__ */ a("span", {
			className: "text-[11px] text-border",
			children: "No recent activity"
		})
	}) : /* @__PURE__ */ a("div", {
		className: e("flex-1 flex flex-col overflow-hidden", p),
		children: h.map((e, t) => /* @__PURE__ */ a(u, {
			item: e,
			opacity: l[t] ?? .1,
			dotColor: m[e.kind ?? ""] ?? "var(--color-text-tertiary)"
		}, e.id))
	});
}
//#endregion
export { d as t };
