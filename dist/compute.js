import { d as e, n as t } from "./Button-DQoeE5dN.js";
import { r as n } from "./safeHref-BL4Z8n8E.js";
import { r, t as i } from "./Text-fqIvcZp2.js";
import { J as a, O as o, Q as s, R as c, V as l, W as u, at as d, b as f, h as p, it as m, m as h, vt as g, z as _ } from "./Icons-CqVFbuiZ.js";
import { t as v } from "./InlinePopover-BQTS5egk.js";
import { t as y } from "./SearchInput-Dk3D9lhs.js";
import { t as b } from "./DropdownMenu-DoCRgXx4.js";
import { t as x } from "./TitledFrame-ChUBa0yq.js";
import { t as S } from "./DotMeter-DJzl5dNX.js";
import { t as C } from "./StatusDot-DAok6F5B.js";
import { t as ee } from "./LogStream-MdjhSR7f.js";
import { t as te } from "./SectionLabel-B60gea5o.js";
import { t as w } from "./InlinePlaceholder-CKUJyqFh.js";
import { n as T } from "./FloatingPanel-JFP5InEY.js";
import { a as E, i as ne, n as re, r as ie, t as ae } from "./useComputeProjects-ZSazDRet.js";
import { a as D, i as O, n as k, o as oe, r as A, s as j, t as se } from "./PaneStatusLine-B3Mss__M.js";
import { $ as M, A as ce, B as le, C as ue, Ct as de, D as fe, E as pe, F as N, G as me, H as he, I as ge, J as _e, K as ve, L as P, M as ye, N as be, O as xe, P as Se, Q as F, R as I, S as L, St as Ce, T as we, U as Te, V as Ee, W as De, X as Oe, Y as ke, Z as Ae, _ as je, _t as Me, a as Ne, at as Pe, b as Fe, bt as Ie, c as Le, ct as R, d as Re, dt as ze, et as z, f as B, ft as Be, g as Ve, gt as He, h as Ue, ht as We, i as Ge, it as Ke, j as qe, k as Je, l as V, lt as Ye, m as H, mt as Xe, n as Ze, nt as Qe, o as $e, ot as et, p as tt, pt as nt, q as rt, r as it, rt as at, s as ot, st, t as ct, tt as lt, u as ut, ut as dt, v as ft, vt as pt, w as mt, wt as ht, x as gt, xt as _t, y as vt, yt, z as bt } from "./ComputeContext-D7DPBijT.js";
import { Fragment as xt, useCallback as U, useEffect as W, useMemo as G, useRef as K, useState as q, useSyncExternalStore as St } from "react";
import { Fragment as Ct, jsx as J, jsxs as Y } from "react/jsx-runtime";
//#region src/components/compute/lib/paneTree.ts
var wt = .1, Tt = .9;
function Et(e, t, n) {
	return {
		kind: "leaf",
		id: e,
		computerId: t,
		kindId: n
	};
}
function X(e) {
	return e.kind === "leaf" ? [e] : [...X(e.a), ...X(e.b)];
}
function Dt(e, t) {
	return X(e).find((e) => e.id === t) ?? null;
}
function Ot(e) {
	return X(e).length;
}
function kt(e, t, n, r, i) {
	let a = (e) => e.kind === "leaf" ? e.id === t ? {
		kind: "split",
		id: i,
		direction: n,
		ratio: .5,
		a: e,
		b: r
	} : e : {
		...e,
		a: a(e.a),
		b: a(e.b)
	};
	return a(e);
}
function At(e, t) {
	if (e.kind === "leaf") return e;
	let n = (e) => {
		if (e.kind === "leaf") return e.id === t ? null : e;
		let r = n(e.a), i = n(e.b);
		return r === null ? i : i === null ? r : r === e.a && i === e.b ? e : {
			...e,
			a: r,
			b: i
		};
	};
	return n(e) ?? e;
}
function jt(e, t, n) {
	let r = Math.min(Tt, Math.max(wt, n)), i = (e) => e.kind === "leaf" ? e : e.id === t ? {
		...e,
		ratio: r
	} : {
		...e,
		a: i(e.a),
		b: i(e.b)
	};
	return i(e);
}
function Mt(e, t, n) {
	let r = (e) => e.kind === "leaf" ? e.id === t ? {
		...e,
		...n
	} : e : {
		...e,
		a: r(e.a),
		b: r(e.b)
	};
	return r(e);
}
function Nt(e, t = {
	x: 0,
	y: 0,
	width: 1,
	height: 1
}) {
	if (e.kind === "leaf") return [{
		id: e.id,
		...t
	}];
	let { direction: n, ratio: r } = e;
	if (n === "row") {
		let n = t.width * r;
		return [...Nt(e.a, {
			...t,
			width: n
		}), ...Nt(e.b, {
			...t,
			x: t.x + n,
			width: t.width - n
		})];
	}
	let i = t.height * r;
	return [...Nt(e.a, {
		...t,
		height: i
	}), ...Nt(e.b, {
		...t,
		y: t.y + i,
		height: t.height - i
	})];
}
function Pt(e, t, n) {
	let r = Nt(e), i = r.find((e) => e.id === t);
	if (!i) return null;
	let a = {
		x: i.x + i.width / 2,
		y: i.y + i.height / 2
	}, o = n === "left" || n === "right", s = r.filter((e) => {
		if (e.id === t || !(o ? e.y < i.y + i.height && e.y + e.height > i.y : e.x < i.x + i.width && e.x + e.width > i.x)) return !1;
		switch (n) {
			case "left": return e.x + e.width <= i.x + 1e-6;
			case "right": return e.x >= i.x + i.width - 1e-6;
			case "up": return e.y + e.height <= i.y + 1e-6;
			case "down": return e.y >= i.y + i.height - 1e-6;
		}
	});
	if (s.length === 0) return null;
	let c = (e) => {
		let t = o ? n === "left" ? i.x - (e.x + e.width) : e.x - (i.x + i.width) : n === "up" ? i.y - (e.y + e.height) : e.y - (i.y + i.height), r = Math.abs(o ? e.y + e.height / 2 - a.y : e.x + e.width / 2 - a.x);
		return t * 2 + r;
	};
	return s.reduce((e, t) => c(t) < c(e) ? t : e).id;
}
function Ft(e, t, n) {
	let r = Nt(e);
	if (r.length < 2) return null;
	let i = r.findIndex((e) => e.id === t);
	return i < 0 ? r[0]?.id ?? null : r[(i + n + r.length) % r.length]?.id ?? null;
}
function It(e, t, n) {
	let r = null, i = (e, a) => {
		if (e.kind === "leaf") {
			e.id === t && (r = a);
			return;
		}
		let o = e.direction === n;
		i(e.a, o ? {
			splitId: e.id,
			onA: !0
		} : a), i(e.b, o ? {
			splitId: e.id,
			onA: !1
		} : a);
	};
	return i(e, null), r;
}
function Lt(e, t) {
	return e.kind === "leaf" ? null : e.id === t ? e.ratio : Lt(e.a, t) ?? Lt(e.b, t);
}
function Rt(e, t, n) {
	let [r, ...i] = e;
	if (!r) throw Error("chain() needs at least one pane");
	if (i.length === 0) return r;
	let a = Math.min(Tt, Math.max(wt, 1 / e.length));
	return {
		kind: "split",
		id: n(),
		direction: t,
		ratio: a,
		a: r,
		b: Rt(i, t, n)
	};
}
function zt(e, t, n) {
	let r = X(e);
	if (r.length < 2) return e;
	if (t === "rows") return Rt(r, "column", n);
	if (t === "columns") return Rt(r, "row", n);
	let [i, ...a] = r;
	return {
		kind: "split",
		id: n(),
		direction: "row",
		ratio: .5,
		a: i,
		b: Rt(a, "column", n)
	};
}
//#endregion
//#region src/components/compute/hooks/useLabLayout.ts
var Bt = 0, Vt = (e) => `${e}-${(Bt += 1).toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
function Ht() {
	let e = {
		windows: [],
		activeWindowId: null,
		activePaneId: null,
		zoomedPaneId: null
	};
	try {
		let t = globalThis.localStorage?.getItem(Ce);
		if (!t) return e;
		let n = JSON.parse(t);
		return Array.isArray(n.windows) ? {
			...e,
			...n,
			zoomedPaneId: null
		} : e;
	} catch {
		return e;
	}
}
function Ut() {
	let [e, t] = q(Ht);
	W(() => {
		try {
			globalThis.localStorage?.setItem(Ce, JSON.stringify(e));
		} catch {}
	}, [e]);
	let n = G(() => e.windows.find((t) => t.id === e.activeWindowId) ?? e.windows[0] ?? null, [e.windows, e.activeWindowId]), r = G(() => n ? X(n.root) : [], [n]), i = G(() => [...new Set(r.map((e) => e.computerId))], [r]), a = U((e, n) => {
		t((t) => {
			let r = t.windows.find((e) => e.id === t.activeWindowId) ?? t.windows[0];
			if (!r) return t;
			let i = e(r.root);
			return {
				...t,
				windows: t.windows.map((e) => e.id === r.id ? {
					...e,
					root: i
				} : e),
				...n?.(i) ?? {}
			};
		});
	}, []), o = U((e) => {
		t((t) => ({
			...t,
			activePaneId: e
		}));
	}, []), s = U((t, n, r) => {
		let i = Et(Vt("pane"), n, r);
		a((n) => {
			let r = e.activePaneId && Dt(n, e.activePaneId) ? e.activePaneId : X(n)[0]?.id;
			return r ? kt(n, r, t, i, Vt("split")) : n;
		}, () => ({
			activePaneId: i.id,
			zoomedPaneId: null
		}));
	}, [a, e.activePaneId]), c = U(() => {
		t((e) => {
			let t = e.windows.find((t) => t.id === e.activeWindowId) ?? e.windows[0];
			if (!t || !e.activePaneId) return e;
			if (Ot(t.root) <= 1) {
				let n = e.windows.filter((e) => e.id !== t.id), r = n[0] ?? null;
				return {
					windows: n,
					activeWindowId: r?.id ?? null,
					activePaneId: r ? X(r.root)[0]?.id ?? null : null,
					zoomedPaneId: null
				};
			}
			let n = At(t.root, e.activePaneId), r = X(n);
			return {
				...e,
				windows: e.windows.map((e) => e.id === t.id ? {
					...e,
					root: n
				} : e),
				activePaneId: r[r.length - 1]?.id ?? null,
				zoomedPaneId: null
			};
		});
	}, []), l = U((e, t) => a((n) => Mt(n, e, { computerId: t })), [a]), u = U((e, t) => a((n) => Mt(n, e, { kindId: t })), [a]), d = U((e, t) => a((n) => jt(n, e, t)), [a]), f = U((e) => {
		t((t) => {
			let n = t.windows.find((e) => e.id === t.activeWindowId) ?? t.windows[0];
			if (!n || !t.activePaneId) return t;
			let r = Pt(n.root, t.activePaneId, e);
			return r ? {
				...t,
				activePaneId: r,
				zoomedPaneId: null
			} : t;
		});
	}, []), p = U((e) => {
		t((t) => {
			let n = t.windows.find((e) => e.id === t.activeWindowId) ?? t.windows[0];
			if (!n || !t.activePaneId) return t;
			let r = Ft(n.root, t.activePaneId, e);
			return r ? {
				...t,
				activePaneId: r,
				zoomedPaneId: null
			} : t;
		});
	}, []), m = U(() => {
		t((e) => ({
			...e,
			zoomedPaneId: e.zoomedPaneId ? null : e.activePaneId
		}));
	}, []), h = U((e) => a((t) => zt(t, e, () => Vt("split")), () => ({ zoomedPaneId: null })), [a]), g = U((e, n) => {
		let r = Et(Vt("pane"), e, n), i = {
			id: Vt("win"),
			root: r
		};
		t((e) => ({
			windows: [...e.windows, i],
			activeWindowId: i.id,
			activePaneId: r.id,
			zoomedPaneId: null
		}));
	}, []), _ = U((e) => {
		t((t) => {
			let n = t.windows.filter((t) => t.id !== e);
			if (t.activeWindowId !== e) return {
				...t,
				windows: n
			};
			let r = n[0] ?? null;
			return {
				windows: n,
				activeWindowId: r?.id ?? null,
				activePaneId: r ? X(r.root)[0]?.id ?? null : null,
				zoomedPaneId: null
			};
		});
	}, []), v = U((e) => {
		t((t) => {
			let n = t.windows.find((t) => t.id === e);
			return n ? {
				...t,
				activeWindowId: e,
				activePaneId: X(n.root)[0]?.id ?? null,
				zoomedPaneId: null
			} : t;
		});
	}, []), y = U((e) => {
		t((t) => {
			if (t.windows.length < 2) return t;
			let n = t.windows.findIndex((e) => e.id === t.activeWindowId), r = t.windows[(n + e + t.windows.length) % t.windows.length];
			return r ? {
				...t,
				activeWindowId: r.id,
				activePaneId: X(r.root)[0]?.id ?? null,
				zoomedPaneId: null
			} : t;
		});
	}, []), b = U((e, n) => {
		e && t((t) => {
			if (t.windows.length > 0) {
				if (t.activePaneId) return t;
				let e = t.windows.find((e) => e.id === t.activeWindowId) ?? t.windows[0];
				return e ? {
					...t,
					activeWindowId: e.id,
					activePaneId: X(e.root)[0]?.id ?? null
				} : t;
			}
			let r = Et(Vt("pane"), e, n), i = {
				id: Vt("win"),
				root: r
			};
			return {
				windows: [i],
				activeWindowId: i.id,
				activePaneId: r.id,
				zoomedPaneId: null
			};
		});
	}, []), x = U((e) => {
		let n = new Set(e);
		t((e) => {
			let t = !1, r = [];
			for (let i of e.windows) {
				let e = i.root;
				for (let r of X(i.root)) n.has(r.computerId) || (t = !0, e = Ot(e) <= 1 ? e : At(e, r.id));
				if (Ot(e) === 1 && !n.has(X(e)[0].computerId)) {
					t = !0;
					continue;
				}
				r.push(e === i.root ? i : {
					...i,
					root: e
				});
			}
			if (!t) return e;
			let i = r.find((t) => t.id === e.activeWindowId) ?? r[0] ?? null, a = i ? X(i.root) : [];
			return {
				windows: r,
				activeWindowId: i?.id ?? null,
				activePaneId: a.some((t) => t.id === e.activePaneId) ? e.activePaneId : a[0]?.id ?? null,
				zoomedPaneId: null
			};
		});
	}, []);
	return {
		windows: e.windows,
		activeWindow: n,
		activePaneId: e.activePaneId,
		zoomedPaneId: e.zoomedPaneId,
		panes: r,
		openComputerIds: i,
		focusPane: o,
		split: s,
		closeActivePane: c,
		setPaneComputer: l,
		setPaneKind: u,
		resize: d,
		move: f,
		cycle: p,
		toggleZoom: m,
		arrange: h,
		newWindow: g,
		closeWindow: _,
		selectWindow: v,
		stepWindow: y,
		ensureSeeded: b,
		reconcile: x
	};
}
//#endregion
//#region src/components/compute/lib/paneKinds.ts
function Wt(e, t) {
	return e.find((e) => e.id === t) ?? e[0] ?? null;
}
function Gt(e, t) {
	return t ? e.filter((e) => !e.appliesTo || e.appliesTo(t)) : [...e];
}
function Kt(e, t) {
	return Gt(e, t)[0] ?? e[0] ?? null;
}
function qt(e, t, n) {
	let r = n ? Gt(e, n) : e;
	return r.length === 0 ? null : r[(r.findIndex((e) => e.id === t) + 1) % r.length] ?? null;
}
function Jt(e, t, n) {
	return t.filter((t) => Wt(e, t)?.quota === n).length;
}
//#endregion
//#region src/components/compute/components/LabFleetRail.tsx
var Yt = {
	provisioning: "text-info",
	waiting: "text-warning",
	running: "text-primary",
	error: "text-danger",
	idle: "text-success",
	stopped: "text-text-tertiary"
};
function Xt(e, t) {
	return t || !Number.isInteger(e) ? `$${e.toFixed(2)}` : `$${e.toFixed(0)}`;
}
function Zt(e, t) {
	let n = [`${t} ${t === 1 ? "computer" : "computers"}`], r = e.spentUsd ?? e.liveSpendUsd;
	return typeof e.budgetUsd == "number" && e.budgetUsd > 0 ? n.push(`${Xt(r, !0)} / ${Xt(e.budgetUsd, !1)}`) : r > 0 && n.push(Xt(r, !0)), e.botCount && n.push(`${e.botCount} ${e.botCount === 1 ? "bot" : "bots"}`), n.join(" · ");
}
function Qt({ computers: t, activeComputerId: n, openComputerIds: r, selectedIds: i, onSelect: a, onOpenInPane: c, statusFilter: l = null, onStatusFilterChange: u, tab: d, onTabChange: p, onCreate: m, className: g }) {
	let [_, v] = q("computers"), x = d ?? _, S = (e) => {
		v(e), p?.(e);
	}, [C, ee] = q(""), [te, w] = q(/* @__PURE__ */ new Set()), T = G(() => new Set(r), [r]), E = it(), ne = E?.projects ?? [], re = E?.projectsAbsent ?? !0, ie = G(() => {
		let e = ne.filter((e) => e.id !== "__unassigned__" && e.computers.length > 0);
		if (re || e.length === 0) return [{
			id: "__all",
			name: "",
			quickLine: "",
			computers: t
		}];
		let n = e.map((e) => ({
			id: e.id,
			name: e.name,
			quickLine: Zt(e, e.computers.length),
			computers: e.computers
		})), r = new Set(n.flatMap((e) => e.computers.map((e) => e.id))), i = t.filter((e) => !r.has(e.id));
		if (i.length > 0) {
			let e = ne.find((e) => e.id === ae);
			n.push({
				id: ae,
				name: "Unassigned",
				quickLine: Zt({
					budgetUsd: void 0,
					spentUsd: void 0,
					liveSpendUsd: 0,
					botCount: e?.botCount
				}, i.length),
				computers: i
			});
		}
		return n;
	}, [
		ne,
		re,
		t
	]), D = G(() => {
		let e = /* @__PURE__ */ new Map(), t = 0;
		for (let n of ie) for (let r of n.computers) e.set(r.id, t += 1);
		return e;
	}, [ie]), k = U((e) => bt(e, C) && (!l || j(e) === l), [C, l]), oe = G(() => t.filter(P).sort(ge), [t]), A = [{
		label: "Show",
		items: [{
			label: "Every status",
			checked: !l,
			onSelect: () => u?.(null)
		}, ...[
			"waiting",
			"running",
			"provisioning",
			"error",
			"idle",
			"stopped"
		].map((e) => ({
			label: O[e].label,
			checked: l === e,
			onSelect: () => u?.(l === e ? null : e)
		}))]
	}], se = t.length === 0, M = /* @__PURE__ */ Y("div", {
		"data-testid": "lab-fleet-empty",
		className: "px-3 py-4 flex flex-col items-start gap-2",
		children: [
			/* @__PURE__ */ J("div", {
				className: "text-[13px] font-semibold text-text-primary",
				children: "No computers in the lab"
			}),
			/* @__PURE__ */ J("div", {
				className: "text-[12px] text-text-secondary",
				children: m ? "Start a computer and it opens here in a pane." : "Nothing in the fleet is shared with you yet."
			}),
			m && /* @__PURE__ */ J("button", {
				"data-ui-part": "",
				type: "button",
				onClick: m,
				"data-testid": "lab-fleet-empty-create",
				className: "text-[12px] font-semibold rounded-md px-3 py-1 cursor-pointer border border-primary text-primary bg-transparent hover:bg-surface-hover",
				children: "+ New computer"
			})
		]
	});
	return /* @__PURE__ */ Y("div", {
		"data-testid": "lab-fleet-rail",
		className: e("flex flex-col h-full min-h-0 border-r border-border bg-surface", g),
		children: [
			/* @__PURE__ */ Y("div", {
				role: "tablist",
				"aria-label": "Fleet",
				className: "flex shrink-0 border-b border-border",
				children: [/* @__PURE__ */ J($t, {
					selected: x === "computers",
					onSelect: () => S("computers"),
					icon: /* @__PURE__ */ J(f, { size: 14 }),
					label: "Computers",
					count: t.length
				}), /* @__PURE__ */ J($t, {
					selected: x === "agents",
					onSelect: () => S("agents"),
					icon: /* @__PURE__ */ J(s, { size: 14 }),
					label: "Agents",
					count: oe.length
				})]
			}),
			/* @__PURE__ */ Y("div", {
				className: "flex items-center gap-1.5 px-2 py-2 shrink-0",
				children: [/* @__PURE__ */ J(y, {
					value: C,
					onChange: ee,
					onClear: () => ee(""),
					placeholder: "Find computer or agent…",
					className: "flex-1 min-w-0"
				}), u && /* @__PURE__ */ J(b, {
					trigger: /* @__PURE__ */ J(o, { size: 14 }),
					triggerLabel: "Filter by status",
					triggerTitle: l ? `Showing ${O[l].label}` : "Filter by status",
					triggerClassName: e(l && "text-primary border-primary"),
					align: "end",
					sections: A,
					"data-testid": "lab-fleet-filter"
				})]
			}),
			x === "computers" ? /* @__PURE__ */ J(en, {
				label: "computers",
				emptyState: se ? M : void 0,
				children: ie.map((t) => {
					let r = t.computers.filter(k);
					if (r.length === 0) return null;
					let o = te.has(t.id) && !C;
					return /* @__PURE__ */ Y("div", {
						role: "presentation",
						children: [t.name && /* @__PURE__ */ Y("button", {
							"data-ui-part": "",
							type: "button",
							tabIndex: -1,
							"aria-expanded": !o,
							onClick: () => w((e) => {
								let n = new Set(e);
								return n.has(t.id) ? n.delete(t.id) : n.add(t.id), n;
							}),
							"data-testid": "lab-fleet-group",
							className: "w-full flex items-start gap-1.5 px-2 pt-2.5 pb-1 text-left bg-transparent border-none cursor-pointer hover:bg-surface-hover",
							children: [/* @__PURE__ */ J(h, {
								size: 12,
								className: e("mt-0.5 shrink-0 text-text-tertiary transition-transform", o && "-rotate-90")
							}), /* @__PURE__ */ Y("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ J("span", {
									className: "block text-sm font-semibold text-text-primary truncate",
									children: t.name
								}), /* @__PURE__ */ J("span", {
									className: "block text-xs text-text-tertiary truncate tabular-nums",
									children: t.quickLine
								})]
							})]
						}), !o && r.map((e) => /* @__PURE__ */ J(tn, {
							computer: e,
							number: D.get(e.id) ?? 0,
							active: e.id === n,
							selected: i?.has(e.id) ?? !1,
							open: T.has(e.id),
							onSelect: a,
							onOpenInPane: c
						}, e.id))]
					}, t.id);
				})
			}) : /* @__PURE__ */ J(en, {
				label: "agents",
				children: oe.filter(k).map((e) => /* @__PURE__ */ J(tn, {
					computer: e,
					number: D.get(e.id) ?? 0,
					active: e.id === n,
					selected: i?.has(e.id) ?? !1,
					open: T.has(e.id),
					onSelect: a,
					onOpenInPane: c,
					showTask: !0
				}, e.id))
			})
		]
	});
}
function $t({ selected: t, onSelect: n, icon: r, label: i, count: a }) {
	return /* @__PURE__ */ Y("button", {
		"data-ui-part": "",
		type: "button",
		role: "tab",
		"aria-selected": t,
		onClick: n,
		className: e("flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-2 text-[12px] bg-transparent border-0 border-b-2 cursor-pointer transition-colors", t ? "border-primary text-text-primary font-semibold" : "border-transparent text-text-secondary hover:text-text-primary"),
		children: [
			r,
			i,
			/* @__PURE__ */ J("span", {
				className: "text-xs font-normal text-text-tertiary tabular-nums",
				children: a
			})
		]
	});
}
function en({ label: e, children: t, emptyState: n }) {
	let r = K(null), i = U((e) => {
		if (![
			"ArrowDown",
			"ArrowUp",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = Array.from(r.current?.querySelectorAll("[data-rail-row]") ?? []);
		if (t.length === 0) return;
		e.preventDefault();
		let n = t.findIndex((e) => e === document.activeElement);
		t[e.key === "Home" ? 0 : e.key === "End" ? t.length - 1 : n < 0 ? 0 : (n + (e.key === "ArrowDown" ? 1 : -1) + t.length) % t.length]?.focus();
	}, []), a = Array.isArray(t) ? t.every((e) => !e) : !t;
	return /* @__PURE__ */ J("div", {
		ref: r,
		role: "listbox",
		"data-ui-listbox": "lab-fleet",
		"aria-label": e,
		onKeyDown: i,
		className: "flex-1 min-h-0 overflow-y-auto pb-2",
		children: a ? n ?? /* @__PURE__ */ J("div", {
			className: "px-3 py-2 text-[12px] text-text-tertiary",
			children: "Nothing matches."
		}) : t
	});
}
function tn({ computer: t, number: n, active: r, selected: i, open: a, onSelect: o, onOpenInPane: s, showTask: c = !1 }) {
	let l = j(t), u = O[l], f = I(t);
	return /* @__PURE__ */ Y("div", {
		role: "presentation",
		className: e("group relative flex items-stretch", r ? "bg-primary-bg" : i ? "bg-surface-hover" : "hover:bg-surface-hover"),
		children: [/* @__PURE__ */ Y("button", {
			"data-ui-part": "",
			"data-rail-row": !0,
			type: "button",
			role: "option",
			"aria-selected": r,
			tabIndex: r ? 0 : -1,
			"data-selected": i || void 0,
			title: `${t.label} — ${u.label}${t.currentTask ? ` · ${t.currentTask}` : ""}`,
			onClick: (e) => o(t, { toggle: e.metaKey || e.ctrlKey }),
			onAuxClick: (e) => {
				e.button === 1 && s && (e.preventDefault(), s(t));
			},
			onKeyDown: (e) => {
				e.key === "Enter" && (e.metaKey || e.ctrlKey) && s && (e.preventDefault(), s(t));
			},
			className: e("min-w-0 flex-1 text-left flex items-start gap-2 pl-2 pr-1 py-1.5 border-l-2 cursor-pointer bg-transparent border-y-0 border-r-0", "focus:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-inset", r ? "border-primary" : i ? "border-border-emphasis" : "border-transparent"),
			children: [
				/* @__PURE__ */ J("span", {
					className: "w-5 shrink-0 text-right text-xs text-text-tertiary tabular-nums leading-5",
					children: n
				}),
				/* @__PURE__ */ J("span", {
					className: "w-3.5 shrink-0 flex justify-center leading-5 pt-[5px]",
					children: f ? /* @__PURE__ */ J(_, {
						size: 14,
						"aria-label": `laptop · ${u.label}`,
						className: e("-mt-[2px]", Yt[l])
					}) : /* @__PURE__ */ J(C, {
						size: "xs",
						color: u.color,
						pulse: u.pulse,
						"aria-label": u.label
					})
				}),
				/* @__PURE__ */ Y("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ J("span", {
						className: e("block text-sm leading-5 truncate font-mono", r ? "text-text-primary font-semibold" : "text-text-secondary"),
						children: t.label
					}), c && /* @__PURE__ */ Y("span", {
						className: "block text-xs text-text-tertiary truncate",
						children: [/* @__PURE__ */ J("span", {
							className: e("font-semibold", Yt[l]),
							children: u.label
						}), t.currentTask ? ` · ${t.currentTask}` : ""]
					})]
				}),
				i && /* @__PURE__ */ J("span", {
					"aria-label": "selected as a target",
					className: "text-xs text-primary leading-5",
					children: "✓"
				}),
				a && /* @__PURE__ */ J("span", {
					"aria-label": "open in a pane",
					title: "Open in a pane",
					className: "text-xs text-primary leading-5",
					children: "▣"
				})
			]
		}), s && /* @__PURE__ */ J("button", {
			"data-ui-part": "",
			type: "button",
			tabIndex: -1,
			onClick: () => s(t),
			"aria-label": `Open ${t.label} in a new pane`,
			title: "Open in a new pane",
			className: e("px-2 shrink-0 bg-transparent border-none cursor-pointer text-text-tertiary hover:text-primary", r ? "opacity-100" : "opacity-0 group-hover:opacity-100 focus-visible:opacity-100"),
			children: /* @__PURE__ */ J(d, { size: 13 })
		})]
	});
}
//#endregion
//#region src/components/compute/components/LabWorkspaceChrome.tsx
var nn = [
	{
		status: "waiting",
		word: (e) => e === 1 ? "needs you" : "need you",
		tone: "warning",
		hint: "Show only computers waiting on an answer"
	},
	{
		status: "running",
		word: () => "running",
		tone: "info",
		hint: "Show only computers with a run in flight"
	},
	{
		status: "provisioning",
		word: () => "provisioning",
		tone: "info",
		hint: "Show only computers still starting up",
		onlyWhenPresent: !0
	},
	{
		status: "error",
		word: (e) => e === 1 ? "error" : "errors",
		tone: "danger",
		hint: "Show only computers whose last run failed"
	}
], rn = {
	waiting: "needsYou",
	running: "running",
	provisioning: "provisioning",
	error: "error"
};
function an({ title: r, summary: i, statusFilter: a, onStatusFilter: o, canCreate: s, onCreate: l, onKeys: u, keysOpen: d, keysChord: f, actions: p, leaderLabel: h }) {
	return /* @__PURE__ */ Y("div", {
		"data-testid": "lab-header",
		className: "flex flex-wrap items-center gap-x-3 gap-y-1.5 px-3 py-2 shrink-0 border-b border-border bg-surface",
		children: [
			/* @__PURE__ */ Y("div", {
				className: "flex items-baseline gap-2 min-w-0",
				children: [r !== null && /* @__PURE__ */ J("span", {
					className: "text-[14px] font-semibold text-text-primary truncate",
					children: r
				}), /* @__PURE__ */ Y("span", {
					"data-testid": "lab-summary",
					className: "text-[12px] text-text-tertiary tabular-nums whitespace-nowrap",
					children: [
						r !== null && /* @__PURE__ */ J("span", {
							"aria-hidden": "true",
							children: "· "
						}),
						i.computers,
						" ",
						i.computers === 1 ? "computer" : "computers",
						" · ",
						i.agents,
						" ",
						i.agents === 1 ? "agent" : "agents"
					]
				})]
			}),
			/* @__PURE__ */ J("span", { className: "flex-1" }),
			/* @__PURE__ */ J("div", {
				role: "group",
				"aria-label": "Fleet status",
				className: "flex items-center gap-1.5",
				children: nn.map(({ status: t, word: r, tone: s, hint: c, onlyWhenPresent: l }) => {
					let u = i[rn[t]] ?? 0, d = a === t;
					return l && u === 0 && !d ? null : /* @__PURE__ */ J("button", {
						"data-ui-part": "",
						type: "button",
						"aria-pressed": d,
						onClick: () => o(d ? null : t),
						title: d ? "Show every computer" : c,
						"data-testid": `lab-pill-${t}`,
						className: e("rounded-full p-0 bg-transparent border-none cursor-pointer", "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary", u === 0 && !d && "opacity-60"),
						children: /* @__PURE__ */ Y(n, {
							size: "md",
							tone: s,
							dot: "static",
							outline: d ? void 0 : "soft",
							solid: d,
							className: "px-2 tabular-nums",
							children: [
								u,
								" ",
								r(u)
							]
						})
					}, t);
				})
			}),
			h && /* @__PURE__ */ J("span", {
				"data-testid": "leader-armed",
				className: "animate-pulse",
				children: /* @__PURE__ */ Y(n, {
					size: "sm",
					tone: "caution",
					children: [h, " …"]
				})
			}),
			s && /* @__PURE__ */ Y(t, {
				size: "sm",
				variant: "primary",
				onClick: l,
				"data-testid": "lab-create",
				children: [/* @__PURE__ */ J(m, { size: 14 }), " Computer"]
			}),
			/* @__PURE__ */ Y(t, {
				size: "sm",
				variant: "secondary",
				onClick: u,
				"aria-pressed": d,
				title: `Keyboard shortcuts${f ? ` · ${f}` : ""}`,
				"data-testid": "lab-keys",
				children: [/* @__PURE__ */ J(c, { size: 14 }), " Keys"]
			}),
			p
		]
	});
}
function on({ label: t, onClick: n, pressed: r, disabled: i, children: a, testId: o }) {
	return /* @__PURE__ */ J("button", {
		"data-ui-part": "",
		type: "button",
		onClick: n,
		"aria-label": t,
		title: t,
		"aria-pressed": r,
		disabled: i,
		"data-testid": o,
		className: e("h-6.5 w-6.5 inline-flex items-center justify-center rounded-md border border-border bg-transparent cursor-pointer", "text-text-secondary hover:bg-surface-hover hover:text-text-primary disabled:opacity-40 disabled:cursor-not-allowed", r && "bg-surface-hover text-text-primary"),
		children: a
	});
}
function sn({ panes: t, onFocusPane: n, onAddPane: r, canAddPane: i, shellsOpen: o, maxShells: s, onArrange: c, zoomed: d, onToggleZoom: f, moreSections: p }) {
	return /* @__PURE__ */ Y("div", {
		"data-testid": "lab-pane-toolbar",
		className: "flex items-center gap-1.5 px-2 py-1.5 shrink-0",
		children: [
			/* @__PURE__ */ J(b, {
				trigger: /* @__PURE__ */ Y("span", {
					className: "text-[12px]",
					children: [
						t.length,
						" ",
						t.length === 1 ? "pane" : "panes",
						" ▾"
					]
				}),
				triggerLabel: "Panes",
				triggerTestId: "lab-panes-menu",
				sections: [{
					label: "Panes in this window",
					items: t.map((e, t) => ({
						label: `${t + 1}. ${e.label}`,
						trailing: e.kind,
						active: e.active,
						onSelect: () => n(e.id)
					}))
				}]
			}),
			/* @__PURE__ */ J(on, {
				label: "Add a pane",
				onClick: r,
				disabled: !i,
				testId: "lab-add-pane",
				children: /* @__PURE__ */ J(m, { size: 14 })
			}),
			/* @__PURE__ */ J("span", { className: "flex-1" }),
			/* @__PURE__ */ Y("span", {
				"data-testid": "lab-shell-count",
				title: "Open terminals hold a real shell against the runtime's limit",
				className: e("text-[12px] tabular-nums", o >= s ? "text-warning" : "text-text-tertiary"),
				children: [
					o,
					" / ",
					s,
					" shells"
				]
			}),
			/* @__PURE__ */ J(on, {
				label: "Arrange as a list",
				onClick: () => c("rows"),
				testId: "lab-arrange-rows",
				children: /* @__PURE__ */ J(l, { size: 14 })
			}),
			/* @__PURE__ */ J(on, {
				label: "Arrange as a split",
				onClick: () => c("main"),
				testId: "lab-arrange-main",
				children: /* @__PURE__ */ J(g, { size: 14 })
			}),
			/* @__PURE__ */ J(on, {
				label: d ? "Restore panes" : "Expand the focused pane",
				onClick: f,
				pressed: d,
				testId: "lab-zoom",
				children: /* @__PURE__ */ J(u, { size: 14 })
			}),
			/* @__PURE__ */ J(b, {
				trigger: /* @__PURE__ */ J(a, { size: 14 }),
				triggerLabel: "More lab commands",
				align: "end",
				sections: p,
				"data-testid": "lab-more-menu"
			})
		]
	});
}
var cn = {
	provisioning: {
		label: "Provisioning",
		tone: "info"
	},
	waiting: {
		label: "Needs you",
		tone: "warning"
	},
	running: {
		label: "Running",
		tone: "info"
	},
	error: {
		label: "Error",
		tone: "danger"
	},
	idle: {
		label: "Idle",
		tone: "success"
	},
	stopped: {
		label: "Stopped",
		tone: "neutral"
	}
};
function ln({ computer: t, kind: r, kinds: i, onSwitchKind: o, active: s, zoomed: c, broadcasting: l, models: d, onFocus: f, onClose: m, onToggleZoom: h, moreSections: g, children: _ }) {
	let v = j(t), y = O[v], x = cn[v];
	return /* @__PURE__ */ Y("section", {
		"data-ui-part": "",
		"aria-label": `${r.title ?? r.label} · ${t.label}`,
		"data-testid": "lab-pane",
		"data-active": s || void 0,
		onMouseDown: f,
		onFocusCapture: f,
		className: e("@container flex flex-col flex-1 min-w-0 min-h-0 h-full rounded-lg border overflow-hidden bg-surface", s ? "border-primary" : "border-border"),
		children: [/* @__PURE__ */ Y("header", {
			className: "shrink-0 flex flex-col gap-0.5 px-2.5 py-1.5 border-b border-border",
			children: [/* @__PURE__ */ Y("div", {
				className: "flex items-center gap-1.5 min-w-0",
				children: [
					/* @__PURE__ */ J(b, {
						trigger: /* @__PURE__ */ Y("span", {
							className: "inline-flex items-center gap-1 text-[12px] font-semibold text-text-primary whitespace-nowrap",
							children: [
								r.icon,
								/* @__PURE__ */ J("span", {
									className: "hidden @[18rem]:inline",
									children: r.title ?? r.label
								}),
								" ▾"
							]
						}),
						triggerLabel: "Pane kind",
						triggerVariant: "link",
						triggerTestId: "lab-pane-kind",
						sections: [{
							label: "Show this computer as",
							items: i.map((e) => ({
								label: e.title ?? e.label,
								icon: e.icon,
								description: e.description,
								active: e.id === r.id,
								onSelect: () => o(e)
							}))
						}]
					}),
					/* @__PURE__ */ J("span", {
						"aria-hidden": "true",
						className: "text-xs text-text-tertiary",
						children: "·"
					}),
					/* @__PURE__ */ J(C, {
						size: "xs",
						color: y.color,
						pulse: y.pulse,
						"aria-label": y.label
					}),
					/* @__PURE__ */ J("span", {
						className: "min-w-[3rem] text-[12px] font-mono text-text-primary truncate",
						title: t.project ?? t.label,
						children: t.label
					}),
					/* @__PURE__ */ J("span", {
						className: "hidden @[20rem]:inline-flex shrink-0",
						"data-testid": "lab-pane-status",
						children: /* @__PURE__ */ J(n, {
							size: "xs",
							tone: x.tone,
							outline: "soft",
							children: x.label
						})
					}),
					c && /* @__PURE__ */ J("span", {
						className: "text-[11px] text-text-tertiary",
						children: "expanded"
					}),
					/* @__PURE__ */ J("span", { className: "flex-1" }),
					/* @__PURE__ */ J("button", {
						"data-ui-part": "",
						type: "button",
						onClick: h,
						"aria-label": c ? `Restore ${t.label}` : `Expand ${t.label}`,
						title: c ? "Restore" : "Expand",
						className: "hidden @[16rem]:inline-flex p-1 rounded bg-transparent border-none cursor-pointer text-text-tertiary hover:text-text-primary hover:bg-surface-hover",
						children: /* @__PURE__ */ J(u, { size: 13 })
					}),
					/* @__PURE__ */ J(b, {
						trigger: /* @__PURE__ */ J(a, { size: 13 }),
						triggerLabel: `More for ${t.label}`,
						triggerVariant: "link",
						align: "end",
						sections: g
					}),
					/* @__PURE__ */ J("button", {
						"data-ui-part": "",
						type: "button",
						onClick: m,
						"aria-label": `Close pane ${t.label}`,
						title: "Close pane",
						className: "p-1 rounded bg-transparent border-none cursor-pointer text-text-tertiary hover:text-danger hover:bg-surface-hover",
						children: /* @__PURE__ */ J(p, { size: 13 })
					})
				]
			}), /* @__PURE__ */ J(k, {
				variant: "meta",
				computer: t,
				models: d,
				broadcasting: l,
				mode: r.statusMode ?? r.label,
				"data-testid": "lab-pane-meta"
			})]
		}), /* @__PURE__ */ J("div", {
			className: "flex-1 min-h-0 flex flex-col",
			children: _
		})]
	});
}
//#endregion
//#region src/components/compute/lib/keymap.ts
var un = {
	key: "b",
	ctrl: !0,
	label: "⌃B"
}, dn = [
	{
		command: "focus-left",
		leaderKey: "h",
		key: "ArrowLeft",
		meta: !0,
		shift: !0,
		label: "⌘⇧←",
		description: "Focus the pane to the left",
		group: "navigate"
	},
	{
		command: "focus-right",
		leaderKey: "l",
		key: "ArrowRight",
		meta: !0,
		shift: !0,
		label: "⌘⇧→",
		description: "Focus the pane to the right",
		group: "navigate"
	},
	{
		command: "focus-up",
		leaderKey: "k",
		key: "ArrowUp",
		meta: !0,
		shift: !0,
		label: "⌘⇧↑",
		description: "Focus the pane above",
		group: "navigate"
	},
	{
		command: "focus-down",
		leaderKey: "j",
		key: "ArrowDown",
		meta: !0,
		shift: !0,
		label: "⌘⇧↓",
		description: "Focus the pane below",
		group: "navigate"
	},
	{
		command: "split-right",
		leaderKey: "|",
		key: "Enter",
		meta: !0,
		label: "⌘⏎",
		description: "New pane beside this one",
		group: "panes"
	},
	{
		command: "split-down",
		leaderKey: "-",
		key: "Enter",
		meta: !0,
		shift: !0,
		label: "⌘⇧⏎",
		description: "New pane below this one",
		group: "panes"
	},
	{
		command: "close-pane",
		leaderKey: "x",
		key: "Backspace",
		meta: !0,
		label: "⌘⌫",
		description: "Close the focused pane",
		group: "panes"
	},
	{
		command: "zoom-pane",
		leaderKey: "z",
		key: "f",
		meta: !0,
		shift: !0,
		label: "⌘⇧F",
		description: "Zoom the focused pane to fill the lab",
		group: "panes"
	},
	{
		command: "next-kind",
		leaderKey: "e",
		key: "e",
		meta: !0,
		shift: !0,
		label: "⌘⇧E",
		description: "Switch this pane between shell, agent and anything else registered",
		group: "panes"
	},
	{
		command: "jump",
		leaderKey: "w",
		key: "k",
		meta: !0,
		label: "⌘K",
		description: "Jump to a computer or pane by name",
		group: "navigate"
	},
	{
		command: "focus-composer",
		leaderKey: ":",
		key: "l",
		meta: !0,
		shift: !0,
		label: "⌘⇧L",
		description: "Jump to the prompt bar",
		group: "navigate"
	},
	{
		command: "focus-rail",
		leaderKey: "r",
		key: "u",
		meta: !0,
		shift: !0,
		label: "⌘⇧U",
		description: "Focus the rail — again for the agents list, again back to the panes",
		group: "navigate"
	},
	{
		command: "leave-pane",
		leaderKey: "q",
		key: "Escape",
		shift: !0,
		label: "⇧esc",
		description: "Leave the focused pane for the prompt bar — the keyboard way out of a terminal",
		group: "navigate"
	},
	{
		command: "toggle-broadcast",
		leaderKey: "s",
		key: "b",
		meta: !0,
		shift: !0,
		label: "⌘⇧B",
		description: "Send the prompt bar to every pane at once",
		group: "lab"
	},
	{
		command: "help",
		leaderKey: "?",
		key: "/",
		meta: !0,
		label: "⌘/",
		description: "Show these shortcuts",
		group: "lab"
	},
	{
		command: "exit",
		leaderKey: "d",
		key: "Escape",
		label: "esc",
		description: "Leave the lab",
		group: "lab"
	}
];
function fn(e, t) {
	return !e || e.key.toLowerCase() !== t.key.toLowerCase() ? !1 : !!e.ctrl === t.ctrlKey && !!e.meta === t.metaKey && !!e.alt === t.altKey;
}
function pn(e, t) {
	let n = t.key.toLowerCase();
	return e.find((e) => e.leaderKey && e.leaderKey.toLowerCase() === n)?.command ?? null;
}
function mn(e, t) {
	let n = t.metaKey || t.ctrlKey;
	for (let r of e) if (r.key.toLowerCase() === t.key.toLowerCase() && !!(r.meta || r.ctrl) === n && !!r.shift === t.shiftKey && !!r.alt === t.altKey) return r.command;
	return null;
}
function hn(e) {
	return [
		"panes",
		"navigate",
		"lab"
	].map((t) => ({
		group: t,
		bindings: e.filter((e) => e.group === t)
	})).filter((e) => e.bindings.length > 0);
}
function gn(e, t) {
	return e.find((e) => e.command === t)?.label ?? null;
}
//#endregion
//#region src/components/compute/lib/chromeTokens.ts
var _n = {
	"--color-code-bg": "var(--color-surface)",
	"--color-code-panel": "var(--color-surface-panel)",
	"--color-code-surface": "var(--color-surface-hover)",
	"--color-code-border": "var(--color-border)",
	"--color-code-text": "var(--color-text-primary)",
	"--color-code-subtle": "var(--color-text-secondary)",
	"--color-code-muted": "var(--color-text-secondary)",
	"--color-code-comment": "var(--color-text-tertiary)",
	"--color-code-raised": "var(--color-text-tertiary)",
	"--color-code-green": "var(--color-success)",
	"--color-code-red": "var(--color-danger)",
	"--color-code-blue": "var(--color-info)",
	"--color-code-peach": "var(--color-caution)",
	"--color-code-mauve": "var(--color-primary)",
	"--color-code-yellow": "var(--color-warning)"
};
function vn(e) {
	return e === "app" ? _n : void 0;
}
//#endregion
//#region src/components/compute/components/ProjectSummary.tsx
function yn(e) {
	let t = Math.max(0, Math.round(e / 6e4));
	return t < 60 ? `${t}m` : `${Math.floor(t / 60)}h ${String(t % 60).padStart(2, "0")}m`;
}
function bn({ project: t, showMeter: r = !0, className: i, "data-testid": a }) {
	let { budgetUsd: o, spentUsd: s, maintenanceUsd: c, tokensUsed: l, tokenBudget: u } = t, d = typeof o == "number" && o > 0, f = s ?? t.liveSpendUsd, p = d ? f / o : 0, m = d && c ? c / o : null, h = t.computers.length, g = t.id === ae;
	return /* @__PURE__ */ Y("div", {
		"data-testid": a,
		className: e("flex flex-col gap-1 font-mono min-w-0", i),
		children: [
			/* @__PURE__ */ Y("div", {
				className: "flex items-center gap-2 text-[10px] leading-none min-w-0 flex-wrap",
				children: [
					d ? /* @__PURE__ */ Y("span", {
						className: "text-code-subtle tabular-nums shrink-0",
						children: [
							"$",
							f.toFixed(2),
							/* @__PURE__ */ Y("span", {
								className: "text-code-muted",
								children: [" / $", o.toFixed(0)]
							})
						]
					}) : /* @__PURE__ */ J("span", {
						className: "text-code-subtle tabular-nums shrink-0",
						children: f > 0 ? `$${f.toFixed(2)}` : "$—"
					}),
					l != null && /* @__PURE__ */ Y(Ct, { children: [/* @__PURE__ */ J("span", {
						"aria-hidden": "true",
						className: "text-code-raised",
						children: "│"
					}), /* @__PURE__ */ Y("span", {
						className: "text-code-muted tabular-nums shrink-0",
						title: u ? `${l} of ${u} tokens` : `${l} tokens`,
						children: [
							re(l),
							u ? /* @__PURE__ */ Y("span", {
								className: "text-code-raised",
								children: ["/", re(u)]
							}) : null,
							" tok"
						]
					})] }),
					/* @__PURE__ */ J("span", { className: "flex-1 min-w-0" }),
					t.botCount != null && t.botCount > 0 && /* @__PURE__ */ Y(n, {
						size: "xs",
						mono: !0,
						tone: "neutral",
						title: "Automations attached to this project",
						children: [
							t.botCount,
							" ",
							t.botCount === 1 ? "bot" : "bots"
						]
					}),
					h > 0 && /* @__PURE__ */ Y(n, {
						size: "xs",
						mono: !0,
						tone: t.activeCount > 0 ? "info" : "neutral",
						...t.activeCount > 0 ? { dot: "pulse" } : {},
						title: t.activeCount > 0 ? `${t.activeCount} of ${h} doing something right now` : `${h} idle`,
						children: [t.activeCount > 0 ? `${t.activeCount}/${h}` : h, " ▣"]
					}),
					t.soonestExpiryMs != null && /* @__PURE__ */ Y(n, {
						size: "xs",
						mono: !0,
						tone: t.soonestExpiryMs < 3e5 ? "warning" : "neutral",
						title: "Time until the first of these computers stops on its own",
						children: ["⟳ ", yn(t.soonestExpiryMs)]
					})
				]
			}),
			r && d && /* @__PURE__ */ J(S, {
				label: "budget",
				value: p,
				note: m == null ? t.periodResetsAt ? `⟳ ${new Date(t.periodResetsAt).toLocaleDateString()}` : void 0 : `${Math.round(m * 100)}% is upkeep`,
				tone: "code"
			}),
			g && /* @__PURE__ */ J("span", {
				className: "text-[10px] text-code-raised",
				children: "not charged to any project"
			})
		]
	});
}
//#endregion
//#region src/components/compute/components/LabRail.tsx
var xn = {
	waiting: 0,
	error: 1,
	running: 2,
	idle: 3,
	stopped: 4
};
function Sn({ computers: t, activeComputerId: r, openComputerIds: i, onSelect: a, onOpenInPane: o, onWatch: s, onCreate: c, onOpenMenu: l, showAllActivity: u, onToggleShowAll: d, canManage: f = !1, models: p = [], className: m }) {
	let h = new Set(i), g = t.filter((e) => {
		let t = j(e);
		return t === "running" || t === "waiting" || t === "error" || t === "provisioning";
	}), _ = [...u ? t : g].sort((e, t) => (xn[j(e)] ?? 9) - (xn[j(t)] ?? 9)), v = it(), y = v?.projects ?? [], b = v?.projectsAbsent ?? !0, x = y.filter((e) => e.id !== "__unassigned__" && e.computers.length > 0), S = y.find((e) => e.id === ae), C = !b && x.length > 0 ? [...x.map((e) => ({
		id: e.id,
		computers: e.computers,
		heading: /* @__PURE__ */ Y("div", {
			role: "presentation",
			className: "px-3 pt-2 pb-1 border-t border-code-border first:border-t-0 first:pt-1",
			children: [/* @__PURE__ */ J("span", {
				className: "block text-[11px] font-mono text-code-subtle truncate",
				children: e.name
			}), /* @__PURE__ */ J(bn, {
				project: e,
				showMeter: !1,
				className: "mt-0.5"
			})]
		})
	})), ...S && S.computers.length > 0 ? [{
		id: ae,
		computers: S.computers,
		heading: /* @__PURE__ */ J("div", {
			role: "presentation",
			className: "px-3 pt-2 pb-1 text-[10px] font-mono text-code-raised lowercase tracking-wide border-t border-code-border",
			children: "unassigned"
		})
	}] : []] : null;
	return /* @__PURE__ */ Y("div", {
		className: e("flex flex-col h-full min-h-0 bg-code-panel border-r border-code-border", m),
		children: [
			/* @__PURE__ */ J(Cn, {
				title: "computers",
				count: t.length,
				rows: t,
				groups: C,
				activeId: r,
				onSelect: a,
				onOpenInPane: o ?? null,
				open: h,
				renderSub: null
			}),
			/* @__PURE__ */ Y("div", {
				className: "flex items-center px-3 py-1.5 border-y border-code-border shrink-0",
				children: [
					f && c ? /* @__PURE__ */ J("button", {
						"data-ui-part": "",
						type: "button",
						onClick: c,
						className: "text-[11px] font-mono text-code-green bg-transparent border-none cursor-pointer p-0 hover:underline",
						children: "new"
					}) : /* @__PURE__ */ J("span", {
						className: "text-[11px] font-mono text-code-raised",
						children: "new"
					}),
					/* @__PURE__ */ J("span", { className: "flex-1" }),
					/* @__PURE__ */ J("button", {
						"data-ui-part": "",
						type: "button",
						onClick: l,
						"aria-label": "Keyboard shortcuts",
						title: "Keyboard shortcuts",
						className: "text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer p-0 hover:text-code-text",
						children: "keys"
					})
				]
			}),
			/* @__PURE__ */ J(Cn, {
				title: "agents",
				count: g.length,
				rows: _,
				activeId: r,
				onSelect: a,
				onOpenInPane: o ?? null,
				open: h,
				action: /* @__PURE__ */ J("button", {
					"data-ui-part": "",
					type: "button",
					onClick: d,
					"aria-pressed": u,
					title: u ? "Show only boxes doing something" : "Show every box",
					className: e("text-[11px] font-mono bg-transparent border-none cursor-pointer p-0", u ? "text-code-blue" : "text-code-muted hover:text-code-text"),
					children: "all"
				}),
				onWatch: s ?? null,
				renderSub: (e) => {
					let t = j(e), r = e.lastResult ? A(null, p) : null;
					return /* @__PURE__ */ Y("span", {
						className: "flex items-center gap-1 truncate",
						children: [
							/* @__PURE__ */ J(n, {
								size: "xs",
								mono: !0,
								tone: O[t].tone,
								className: "bg-transparent px-0",
								children: O[t].label
							}),
							e.currentTask && /* @__PURE__ */ Y(Ct, { children: [/* @__PURE__ */ J("span", {
								"aria-hidden": "true",
								className: "text-code-raised",
								children: "·"
							}), /* @__PURE__ */ J("span", {
								className: "truncate text-code-comment",
								children: e.currentTask
							})] }),
							!e.currentTask && r && /* @__PURE__ */ Y(Ct, { children: [/* @__PURE__ */ J("span", {
								"aria-hidden": "true",
								className: "text-code-raised",
								children: "·"
							}), /* @__PURE__ */ J("span", {
								className: "text-code-comment",
								children: r
							})] })
						]
					});
				}
			})
		]
	});
}
function Cn({ title: t, count: n, rows: r, activeId: i, open: a, onSelect: o, onOpenInPane: s, action: c, renderSub: l, onWatch: u = null, groups: d = null }) {
	let f = K(null), p = U((e) => {
		if (![
			"ArrowDown",
			"ArrowUp",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = Array.from(f.current?.querySelectorAll("[data-rail-row]") ?? []);
		if (t.length === 0) return;
		let n = t.findIndex((e) => e === document.activeElement);
		e.preventDefault(), t[e.key === "Home" ? 0 : e.key === "End" ? t.length - 1 : n < 0 ? 0 : (n + (e.key === "ArrowDown" ? 1 : -1) + t.length) % t.length]?.focus();
	}, []);
	return /* @__PURE__ */ Y("div", {
		className: "flex flex-col min-h-0 flex-1",
		children: [/* @__PURE__ */ Y("div", {
			className: "flex items-center gap-2 px-3 py-2 shrink-0",
			children: [
				/* @__PURE__ */ J("span", {
					className: "text-[11px] font-mono text-code-subtle lowercase tracking-wide",
					children: t
				}),
				/* @__PURE__ */ J("span", {
					className: "text-[10px] font-mono text-code-raised tabular-nums",
					children: n
				}),
				/* @__PURE__ */ J("span", { className: "flex-1" }),
				c
			]
		}), r.length === 0 ? /* @__PURE__ */ J("div", {
			className: "px-3 pb-3 text-[11px] font-mono text-code-raised",
			children: "nothing here"
		}) : /* @__PURE__ */ J("div", {
			ref: f,
			role: "listbox",
			"data-ui-listbox": "lab-rail",
			"aria-label": t,
			onKeyDown: p,
			className: "flex-1 min-h-0 overflow-y-auto pb-1",
			children: d ? d.map((e) => /* @__PURE__ */ Y("div", {
				role: "presentation",
				children: [e.heading, e.computers.map(m)]
			}, e.id)) : r.map(m)
		})]
	});
	function m(t) {
		let n = j(t), r = O[n], c = t.id === i;
		return /* @__PURE__ */ Y("div", {
			role: "presentation",
			className: e("group relative flex items-stretch", c ? "bg-code-surface" : "hover:bg-code-surface/60"),
			children: [/* @__PURE__ */ Y("button", {
				"data-ui-part": "",
				"data-rail-row": !0,
				type: "button",
				role: "option",
				"aria-selected": c,
				tabIndex: c ? 0 : -1,
				title: `${r.label} — ${r.help}`,
				onClick: () => o(t),
				onAuxClick: (e) => {
					e.button === 1 && s && (e.preventDefault(), s(t));
				},
				onKeyDown: (e) => {
					e.key === "Enter" && (e.metaKey || e.ctrlKey) && s && (e.preventDefault(), s(t));
				},
				className: e("min-w-0 flex-1 text-left flex items-start gap-2 px-3 py-1.5 border-l-2 cursor-pointer bg-transparent transition-colors", "focus:outline-none focus-visible:ring-1 focus-visible:ring-code-blue focus-visible:ring-inset", c ? "border-code-blue" : "border-transparent"),
				children: [
					/* @__PURE__ */ J(C, {
						size: "xs",
						color: r.color,
						pulse: r.pulse,
						className: "mt-[5px]",
						"aria-label": r.label
					}),
					/* @__PURE__ */ Y("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ J("span", {
							className: e("block text-[12px] font-mono truncate", c ? "text-code-text" : "text-code-subtle"),
							children: t.label
						}), l && /* @__PURE__ */ J("span", {
							className: "block text-[10px] font-mono truncate",
							children: l(t)
						})]
					}),
					a.has(t.id) && /* @__PURE__ */ J("span", {
						"aria-label": "open in a pane",
						title: "Open in a pane",
						className: "mt-[3px] text-[9px] font-mono text-code-blue shrink-0",
						children: "▣"
					})
				]
			}), u && /* @__PURE__ */ J("button", {
				"data-ui-part": "",
				type: "button",
				tabIndex: -1,
				onClick: () => u(t),
				"aria-label": `Watch ${t.label}`,
				title: `Watch ${t.label} — read-only, costs no shell`,
				className: e("px-2 text-[10px] font-mono cursor-pointer bg-transparent border-none shrink-0", "text-code-muted hover:text-code-blue", "opacity-0 group-hover:opacity-100 focus-visible:opacity-100"),
				children: "tail"
			})]
		}, t.id);
	}
}
//#endregion
//#region src/components/compute/components/LabChooser.tsx
function wn(e, t) {
	if (!t) return 0;
	let n = e.toLowerCase(), r = t.toLowerCase(), i = 0, a = 0, o = -1;
	for (let e of r) {
		let t = n.indexOf(e, i);
		if (t < 0) return null;
		a += o >= 0 ? t - o - 1 : t, o = t, i = t + 1;
	}
	return a;
}
function Tn({ open: t, onClose: r, computers: i, panes: a, onJumpToPane: o, onRetarget: s, onOpenInSplit: c, projects: l = [], onSelectProject: u, chrome: d = "code" }) {
	let [f, p] = q(""), [m, h] = q(0), g = K(null), _ = K(null), v = G(() => new Map(i.map((e) => [e.id, e])), [i]), y = G(() => {
		let e = [];
		for (let t of a) {
			let n = v.get(t.computerId);
			if (!n) continue;
			let r = wn(`${n.label} ${t.kindId}`, f);
			r != null && e.push({
				row: {
					kind: "pane",
					id: `pane:${t.id}`,
					pane: t,
					computer: n
				},
				score: r
			});
		}
		let t = new Set(a.map((e) => e.computerId)), n = [];
		for (let e of i) {
			if (t.has(e.id)) continue;
			let r = wn(`${e.label} ${e.sessionId}`, f);
			r != null && n.push({
				row: {
					kind: "computer",
					id: `box:${e.id}`,
					computer: e
				},
				score: r
			});
		}
		let r = [];
		if (u && f.trim()) for (let e of l) {
			let t = wn(e.name, f);
			t != null && r.push({
				row: {
					kind: "project",
					id: `proj:${e.id}`,
					project: e
				},
				score: t
			});
		}
		let o = (e, t) => e.score - t.score;
		return [
			...e.sort(o),
			...n.sort(o),
			...r.sort(o)
		].map((e) => e.row);
	}, [
		a,
		i,
		v,
		f,
		l,
		u
	]);
	if (W(() => {
		if (t) {
			p(""), h(0);
			let e = setTimeout(() => g.current?.focus(), 0);
			return () => clearTimeout(e);
		}
	}, [t]), W(() => {
		h((e) => Math.min(e, Math.max(0, y.length - 1)));
	}, [y.length]), W(() => {
		_.current?.querySelector("[data-highlighted=\"true\"]")?.scrollIntoView({ block: "nearest" });
	}, [m]), !t) return null;
	let b = (e, t) => {
		e && (e.kind === "project" ? u?.(e.project) : e.kind === "pane" ? o(e.pane.id) : t ? c(e.computer) : s(e.computer), r());
	};
	return /* @__PURE__ */ J("div", {
		className: "absolute inset-0 z-20 flex items-start justify-center pt-[12vh] bg-code-bg/70",
		onClick: r,
		children: /* @__PURE__ */ Y("div", {
			style: vn(d),
			onClick: (e) => e.stopPropagation(),
			role: "dialog",
			"aria-label": "Jump to a computer, pane or project",
			className: "w-[480px] max-w-[92vw] rounded-lg border border-code-border bg-code-panel overflow-hidden font-mono shadow-2xl",
			children: [/* @__PURE__ */ Y("div", {
				className: "flex items-center gap-2 px-3 py-2 border-b border-code-border",
				children: [
					/* @__PURE__ */ J("span", {
						"aria-hidden": "true",
						className: "text-code-green text-[12px]",
						children: "/"
					}),
					/* @__PURE__ */ J("input", {
						"data-ui-part": "",
						ref: g,
						value: f,
						onChange: (e) => {
							p(e.target.value), h(0);
						},
						onKeyDown: (e) => {
							e.key === "ArrowDown" || e.key === "n" && e.ctrlKey ? (e.preventDefault(), h((e) => y.length ? (e + 1) % y.length : 0)) : e.key === "ArrowUp" || e.key === "p" && e.ctrlKey ? (e.preventDefault(), h((e) => y.length ? (e - 1 + y.length) % y.length : 0)) : e.key === "Enter" ? (e.preventDefault(), b(y[m], e.shiftKey)) : e.key === "Escape" && (e.preventDefault(), r());
						},
						placeholder: "jump to a computer, pane or project…",
						"aria-label": "Filter computers, panes and projects",
						className: "flex-1 min-w-0 bg-transparent border-none outline-none text-[12px] text-code-text placeholder:text-code-raised"
					}),
					/* @__PURE__ */ J("span", {
						className: "text-[10px] text-code-raised shrink-0 hidden sm:inline",
						children: "⏎ jump · ⇧⏎ split"
					})
				]
			}), /* @__PURE__ */ J("div", {
				ref: _,
				role: "listbox",
				"data-ui-listbox": "lab-chooser",
				"aria-label": "Results",
				className: "max-h-[46vh] overflow-y-auto",
				children: y.length === 0 ? /* @__PURE__ */ Y("div", {
					className: "px-3 py-4 text-[11px] text-code-raised",
					children: [
						"nothing matches “",
						f,
						"”"
					]
				}) : y.map((t, r) => {
					let i = r === m;
					if (t.kind === "project") return /* @__PURE__ */ Y("div", {
						role: "option",
						"aria-selected": i,
						"data-highlighted": i,
						onMouseEnter: () => h(r),
						onClick: () => b(t, !1),
						className: e("flex flex-col gap-0.5 px-3 py-1.5 cursor-pointer border-l-2", i ? "bg-code-surface border-code-mauve" : "bg-transparent border-transparent"),
						children: [/* @__PURE__ */ Y("div", {
							className: "flex items-center gap-2 min-w-0",
							children: [/* @__PURE__ */ J(n, {
								size: "xs",
								mono: !0,
								tone: "accent",
								className: "shrink-0",
								children: "project"
							}), /* @__PURE__ */ J("span", {
								className: e("text-[12px] truncate", i ? "text-code-text" : "text-code-subtle"),
								children: t.project.name
							})]
						}), /* @__PURE__ */ J(bn, {
							project: t.project,
							showMeter: !1,
							className: "pl-1"
						})]
					}, t.id);
					let a = j(t.computer), o = O[a];
					return /* @__PURE__ */ Y("div", {
						role: "option",
						"aria-selected": i,
						"data-highlighted": i,
						onMouseEnter: () => h(r),
						onClick: (e) => b(t, e.shiftKey),
						className: e("flex items-center gap-2 px-3 py-1.5 cursor-pointer border-l-2", i ? "bg-code-surface border-code-blue" : "bg-transparent border-transparent"),
						children: [
							/* @__PURE__ */ J(C, {
								size: "xs",
								color: o.color,
								pulse: o.pulse,
								"aria-label": o.label
							}),
							/* @__PURE__ */ J("span", {
								className: e("text-[12px] truncate", i ? "text-code-text" : "text-code-subtle"),
								children: t.computer.label
							}),
							/* @__PURE__ */ J("span", { className: "flex-1" }),
							t.kind === "pane" ? /* @__PURE__ */ Y(n, {
								size: "xs",
								mono: !0,
								tone: "info",
								className: "shrink-0",
								children: ["on screen · ", t.pane.kindId]
							}) : /* @__PURE__ */ J(n, {
								size: "xs",
								mono: !0,
								tone: o.tone,
								className: "bg-transparent px-0 shrink-0",
								children: o.label
							})
						]
					}, t.id);
				})
			})]
		})
	});
}
//#endregion
//#region src/components/compute/components/PaneTreeView.tsx
function En({ node: t, activePaneId: n, zoomedPaneId: r = null, renderLeaf: i, onRatioChange: a, gutter: o = "tight", className: s }) {
	if (r) {
		let n = Dn(t, r);
		if (n) return /* @__PURE__ */ J("div", {
			className: e("flex min-h-0 min-w-0", s),
			children: i(n)
		});
	}
	return /* @__PURE__ */ J("div", {
		className: e("flex min-h-0 min-w-0", s),
		children: /* @__PURE__ */ J(On, {
			node: t,
			activePaneId: n,
			renderLeaf: i,
			onRatioChange: a,
			gutter: o
		})
	});
}
function Dn(e, t) {
	return e.kind === "leaf" ? e.id === t ? e : null : Dn(e.a, t) ?? Dn(e.b, t);
}
function On({ node: t, activePaneId: n, renderLeaf: r, onRatioChange: i, gutter: a }) {
	let o = K(null), s = U((e) => {
		if (t.kind !== "split") return;
		let n = o.current;
		if (!n) return;
		e.preventDefault();
		let r = t.direction === "row", a = (e) => {
			let a = n.getBoundingClientRect(), o = r ? a.width : a.height;
			if (o <= 0) return;
			let s = r ? e.clientX - a.left : e.clientY - a.top;
			i(t.id, Math.min(Tt, Math.max(wt, s / o)));
		}, s = () => {
			globalThis.removeEventListener("pointermove", a), globalThis.removeEventListener("pointerup", s), globalThis.removeEventListener("pointercancel", s);
		};
		globalThis.addEventListener("pointermove", a), globalThis.addEventListener("pointerup", s), globalThis.addEventListener("pointercancel", s);
	}, [t, i]), c = U((e) => {
		if (t.kind !== "split") return;
		let n = t.direction === "row", r = n ? "ArrowLeft" : "ArrowUp", a = n ? "ArrowRight" : "ArrowDown";
		if (e.key !== r && e.key !== a) return;
		e.preventDefault();
		let o = e.shiftKey ? .1 : .02;
		i(t.id, t.ratio + (e.key === a ? o : -o));
	}, [t, i]);
	if (t.kind === "leaf") return /* @__PURE__ */ J("div", {
		className: "flex-1 min-w-0 min-h-0 flex",
		children: r(t)
	});
	let l = t.direction === "row", u = Math.round(t.ratio * 1e3) / 10;
	return /* @__PURE__ */ Y("div", {
		ref: o,
		className: e("flex flex-1 min-w-0 min-h-0", l ? "flex-row" : "flex-col"),
		children: [
			/* @__PURE__ */ J("div", {
				className: "flex min-w-0 min-h-0",
				style: {
					flexBasis: `${u}%`,
					flexGrow: 0,
					flexShrink: 0
				},
				children: /* @__PURE__ */ J(On, {
					node: t.a,
					activePaneId: n,
					renderLeaf: r,
					onRatioChange: i,
					gutter: a
				})
			}),
			/* @__PURE__ */ J("div", {
				role: "separator",
				"aria-orientation": l ? "vertical" : "horizontal",
				"aria-label": `Resize ${l ? "columns" : "rows"}`,
				"aria-valuenow": u,
				"aria-valuemin": wt * 100,
				"aria-valuemax": Tt * 100,
				tabIndex: 0,
				onPointerDown: s,
				onKeyDown: c,
				className: e("shrink-0 bg-transparent hover:bg-code-blue/40 focus-visible:bg-code-blue/60 focus:outline-none transition-colors", l ? e(a === "roomy" ? "w-2" : "w-1", "cursor-col-resize my-0.5") : e(a === "roomy" ? "h-2" : "h-1", "cursor-row-resize mx-0.5"))
			}),
			/* @__PURE__ */ J("div", {
				className: "flex flex-1 min-w-0 min-h-0",
				children: /* @__PURE__ */ J(On, {
					node: t.b,
					activePaneId: n,
					renderLeaf: r,
					onRatioChange: i,
					gutter: a
				})
			})
		]
	});
}
//#endregion
//#region src/components/compute/components/ComputerLab.tsx
function kn({ open: t, onClose: n, focusComputerId: r = null, variant: i = "overlay", chrome: a = "app", keymap: o = dn, leader: s = null, idleWindowMs: c = se, appearance: l = "classic", title: u = "Computer Lab", headerActions: d, onInstruct: f, className: p }) {
	let { client: m, computers: h, canManage: g, create: _, models: v, notify: y, refresh: x, paneKinds: C, projects: ee } = Ze(), te = C[0]?.id ?? "agent", w = U((e) => Kt(C, e)?.id ?? te, [C, te]), T = Ut(), E = l === "workspace", [ne, re] = q(null), [ie, ae] = q(() => /* @__PURE__ */ new Set()), [D, O] = q("nudge"), [k, oe] = q("focused"), [A, j] = q(!1), [M, ce] = q(!1), [ue, de] = q(""), [fe, pe] = q(!1), [N, me] = q(!1), [he, ge] = q(!1), [_e, ve] = q(!1), P = K(/* @__PURE__ */ new Map()), be = K(null), xe = K(null), Se = K(null), F = G(() => new Map(h.map((e) => [e.id, e])), [h]), I = T.panes.find((e) => e.id === T.activePaneId) ?? T.panes[0] ?? null, L = I ? F.get(I.computerId) ?? null : null, Ce = Jt(C, T.panes.map((e) => e.kindId), "shell"), we = T.windows.length > 0, Te = r && F.has(r) ? r : null, Ee = Te ?? h[0]?.id ?? null, De = w(Ee ? F.get(Ee) : null);
	W(() => {
		!t || we || !Ee || T.ensureSeeded(Ee, De);
	}, [
		t,
		we,
		Ee,
		De,
		T.ensureSeeded
	]);
	let Oe = K(null), { focusPane: ke, setPaneComputer: Ae, panes: je, activePaneId: Me } = T;
	W(() => {
		if (!t || !Te || Oe.current === Te) return;
		let e = je.find((e) => e.computerId === Te);
		if (e) ke(e.id);
		else if (Me) Ae(Me, Te);
		else return;
		Oe.current = Te;
	}, [
		t,
		Te,
		je,
		Me,
		ke,
		Ae
	]), W(() => {
		t || (Oe.current = null);
	}, [t]);
	let Ne = T.reconcile, Pe = G(() => h.map((e) => e.id), [h]);
	W(() => {
		!t || Pe.length === 0 || Ne(Pe);
	}, [
		t,
		Pe,
		Ne
	]);
	let Fe = U((e, t) => {
		let n = T.panes.find((t) => t.id === e);
		T.setPaneComputer(e, t.id);
		let r = n ? Wt(C, n.kindId) : null;
		r?.appliesTo && !r.appliesTo(t) && T.setPaneKind(e, w(t));
	}, [
		T,
		C,
		w
	]), Ie = U((e) => {
		let t = I ? Wt(C, I.kindId) : null;
		return t && e && (!t.appliesTo || t.appliesTo(e)) ? t.id : w(e);
	}, [
		I,
		C,
		w
	]), Le = U((e, t, n) => {
		n ? P.current.set(e, {
			handle: n,
			kind: t
		}) : P.current.delete(e);
	}, []), R = M ? T.panes : I ? [I] : [], Re = U((e, t) => {
		let n = 0;
		for (let r of t) {
			let t = P.current.get(r.id);
			t?.handle.send && t.handle.send(`${e}${t.kind.inputSuffix ?? ""}`) && (n += 1);
		}
		return n;
	}, []), ze = U(() => {
		let e = ue.trim();
		if (!e || R.length === 0) return;
		let t = Re(e, R);
		if (t === 0) {
			y({
				tone: "error",
				title: "Nothing received that",
				detail: "No pane was ready to accept input."
			});
			return;
		}
		de(""), t < R.length && y({
			tone: "info",
			title: `Sent to ${t} of ${R.length} panes`,
			detail: "The rest were not connected."
		});
	}, [
		ue,
		R,
		y,
		Re
	]), z = G(() => k === "all" ? h : k === "selected" ? h.filter((e) => ie.has(e.id)) : L ? [L] : [], [
		k,
		h,
		ie,
		L
	]), B = G(() => {
		if (k === "focused") return I ? [I] : [];
		let e = new Set(z.map((e) => e.id));
		return T.panes.filter((t) => e.has(t.computerId));
	}, [
		k,
		I,
		z,
		T.panes
	]), Be = U((e, t) => ye(m, e, t), [m]), Ve = U((e, t) => f ? f({
		text: e,
		computers: [...t],
		scope: "focused"
	}) : Be(e, t), [f, Be]), He = U(async () => {
		let e = ue.trim();
		if (!(!e || A)) {
			if (D === "type") {
				if (B.length === 0) {
					y({
						tone: "info",
						title: "No open pane to type into",
						detail: "Open a pane on one of these computers first."
					});
					return;
				}
				let t = Re(e, B);
				if (t === 0) {
					y({
						tone: "error",
						title: "Nothing received that",
						detail: "No pane was ready to accept input."
					});
					return;
				}
				de(""), t < B.length && y({
					tone: "info",
					title: `Typed into ${t} of ${B.length} panes`,
					detail: "The rest do not take input."
				});
				return;
			}
			if (z.length !== 0) {
				j(!0);
				try {
					let t = f ? await f({
						text: e,
						computers: z,
						scope: k
					}) : await Be(e, z), n = t?.delivered ?? z.length;
					n > 0 && de(""), y({
						tone: n > 0 ? "success" : "error",
						title: n > 0 ? `Sent to ${n} of ${z.length} ${z.length === 1 ? "computer" : "computers"}` : "No computer took that",
						...t?.detail ? { detail: t.detail } : {}
					});
				} catch (e) {
					y({
						tone: "error",
						title: "Instruction not sent",
						detail: e instanceof Error ? e.message : void 0
					});
				} finally {
					j(!1);
				}
			}
		}
	}, [
		ue,
		A,
		D,
		B,
		z,
		k,
		f,
		Be,
		Re,
		y
	]), Ue = U((e) => {
		let t = I?.computerId ?? h[0]?.id;
		t && T.split(e, t, I?.kindId ?? w(F.get(t)));
	}, [
		I,
		h,
		T,
		w,
		F
	]), We = U((e, t, n) => {
		if (!n || n.id === t) return;
		let r = Wt(C, t);
		if (n.quota === "shell" && r?.quota !== "shell" && Ce >= 8) {
			y({
				tone: "error",
				title: "No shell slots left",
				detail: "8 open terminals is the limit here. Close one, or use a pane kind that costs nothing."
			});
			return;
		}
		T.setPaneKind(e, n.id);
	}, [
		T,
		C,
		Ce,
		y
	]), Ge = U(() => {
		I && We(I.id, I.kindId, qt(C, I.kindId, F.get(I.computerId)));
	}, [
		I,
		C,
		We,
		F
	]), Ke = U((e) => {
		_(e ? { projectId: e } : void 0).then((e) => {
			T.newWindow(e.id, w(e)), y({
				tone: "success",
				title: `${e.label} ready`,
				detail: "microVM session live · workspace persists"
			});
		}).catch((e) => {
			y({
				tone: "error",
				title: "Provisioning failed",
				detail: e instanceof Error ? e.message : void 0
			});
		});
	}, [
		_,
		T,
		y,
		w
	]);
	W(() => {
		if (!t || !T.activePaneId || he || N) return;
		let e = T.activePaneId, n = requestAnimationFrame(() => P.current.get(e)?.handle.focus?.());
		return () => cancelAnimationFrame(n);
	}, [
		t,
		T.activePaneId,
		T.zoomedPaneId,
		he,
		N
	]);
	let Je = U((e) => {
		let t = {
			"focus-left": "left",
			"focus-right": "right",
			"focus-up": "up",
			"focus-down": "down"
		}[e];
		if (t) {
			T.move(t);
			return;
		}
		switch (e) {
			case "split-right":
				Ue("row");
				return;
			case "split-down":
				Ue("column");
				return;
			case "close-pane":
				T.closeActivePane();
				return;
			case "zoom-pane":
				T.toggleZoom();
				return;
			case "next-kind":
				Ge();
				return;
			case "jump":
				ge(!0);
				return;
			case "focus-composer":
				be.current?.focus();
				return;
			case "leave-pane":
				be.current?.focus();
				return;
			case "focus-rail": {
				let e = xe.current;
				if (!e) return;
				let t = (t) => e.querySelector(`[role="listbox"][aria-label="${t}"] [data-rail-row][tabindex="0"]`) ?? e.querySelector(`[role="listbox"][aria-label="${t}"] [data-rail-row]`), n = document.activeElement, r = (t) => !!n && !!e.querySelector(`[role="listbox"][aria-label="${t}"]`)?.contains(n);
				if (r("computers")) {
					let e = t("agents");
					e ? e.focus() : I && P.current.get(I.id)?.handle.focus?.();
					return;
				}
				if (r("agents")) {
					I && P.current.get(I.id)?.handle.focus?.();
					return;
				}
				(t("computers") ?? t("agents"))?.focus();
				return;
			}
			case "toggle-broadcast":
				E ? oe((e) => e === "all" ? "focused" : "all") : ce((e) => !e);
				return;
			case "help":
				me((e) => !e);
				return;
			case "exit":
				if (xe.current?.contains(document.activeElement)) {
					I && P.current.get(I.id)?.handle.focus?.();
					return;
				}
				i === "overlay" && n();
				return;
		}
	}, [
		T,
		Ue,
		Ge,
		n,
		i,
		I,
		E
	]);
	if (W(() => {
		if (!t) return;
		let e = (e) => {
			if (_e) {
				e.preventDefault(), e.stopPropagation(), ve(!1);
				let t = pn(o, e);
				t && Je(t);
				return;
			}
			if (fn(s, e)) {
				e.preventDefault(), e.stopPropagation(), ve(!0);
				return;
			}
			let t = mn(o, e);
			if (t) {
				if (t === "exit") {
					let t = e.target;
					if (t?.closest?.(".xterm")) return;
					if (t === be.current) {
						be.current?.blur(), e.preventDefault();
						return;
					}
					if (he || N) {
						ge(!1), me(!1), e.preventDefault();
						return;
					}
				}
				e.preventDefault(), e.stopPropagation(), Je(t);
			}
		};
		return globalThis.addEventListener("keydown", e, !0), () => globalThis.removeEventListener("keydown", e, !0);
	}, [
		t,
		o,
		s,
		_e,
		Je,
		he,
		N
	]), W(() => {
		if (!_e) return;
		let e = setTimeout(() => ve(!1), s?.timeoutMs ?? 3e3);
		return () => clearTimeout(e);
	}, [_e, s?.timeoutMs]), !t) return null;
	let V = (e) => gn(o, e), Ye = vn(a), H = a === "app", Xe = i === "inline", Qe = D === "type" ? `Type into ${B.length} ${B.length === 1 ? "pane" : "panes"} — ⏎ to send` : k === "focused" ? `Instruction for ${L?.label ?? "the focused computer"} — ⏎ to send` : `Instruction for ${z.length} ${z.length === 1 ? "computer" : "computers"} — ⏎ to send`, $e = /* @__PURE__ */ J("textarea", {
		"data-ui-part": "",
		ref: be,
		rows: 1,
		value: ue,
		onChange: (e) => de(e.target.value),
		onKeyDown: (e) => {
			e.key === "Enter" && !e.shiftKey && (e.preventDefault(), E ? He() : ze()), e.key === "Escape" && e.currentTarget.blur();
		},
		placeholder: E ? Qe : M ? `instruction for all ${R.length} panes — ⏎ to send` : `instruction for ${L?.label ?? "the focused pane"} — ⏎ to send`,
		"aria-label": E ? "Instruction" : "Broadcast instruction",
		disabled: E && A,
		className: e("flex-1 min-w-0 resize-none bg-transparent border-none outline-none text-[12px] leading-6", E ? "font-[inherit] text-text-primary caret-primary placeholder:text-text-tertiary disabled:opacity-60" : "text-code-text caret-code-blue placeholder:text-code-raised")
	});
	if (E) {
		let t = le(h), r = (e) => F.get(e.computerId) ?? null, c = (e) => {
			let t = r(e), n = Wt(C, e.kindId);
			return n && t && n.appliesTo && !n.appliesTo(t) ? Kt(C, t) : n;
		}, l = [{
			label: "Windows",
			items: [...T.windows.map((e, t) => ({
				label: e.name ?? `Window ${t + 1}`,
				active: e.id === T.activeWindow?.id,
				onSelect: () => T.selectWindow(e.id)
			})), {
				label: "New window",
				disabled: !I,
				onSelect: () => {
					I && T.newWindow(I.computerId, w(F.get(I.computerId)));
				}
			}]
		}, { items: [
			{
				label: "Jump to a computer…",
				trailing: V("jump") ?? void 0,
				onSelect: () => ge(!0)
			},
			{
				label: "Arrange side by side",
				onSelect: () => T.arrange("columns")
			},
			{
				label: "Keyboard shortcuts",
				trailing: V("help") ?? void 0,
				onSelect: () => me(!0)
			}
		] }], m = {
			focused: "Focused pane",
			selected: "Selected",
			all: "All computers"
		}, _ = {
			focused: +!!L,
			selected: ie.size,
			all: h.length
		}, y = D === "type" ? B.length : z.length, S = new Set(z.map((e) => e.id));
		return /* @__PURE__ */ J(qe.Provider, {
			value: Ve,
			children: /* @__PURE__ */ Y("div", {
				ref: Se,
				...i === "overlay" ? {
					role: "dialog",
					"aria-modal": !0
				} : { role: "region" },
				"aria-label": "Computer Lab",
				"data-appearance": "workspace",
				style: Ye,
				className: e("flex flex-col bg-surface text-text-primary", i === "overlay" ? "fixed inset-0 z-[150]" : "relative h-full min-h-0 w-full rounded-lg border border-border overflow-hidden", p),
				children: [
					/* @__PURE__ */ J(an, {
						title: u,
						summary: t,
						statusFilter: ne,
						onStatusFilter: re,
						canCreate: g,
						onCreate: () => Ke(),
						onKeys: () => me((e) => !e),
						keysOpen: N,
						keysChord: V("help"),
						actions: /* @__PURE__ */ Y(Ct, { children: [d, i === "overlay" && /* @__PURE__ */ J("button", {
							"data-ui-part": "",
							type: "button",
							onClick: n,
							title: `Leave the lab${V("exit") ? ` · ${V("exit")}` : ""}`,
							className: "text-[12px] text-text-tertiary bg-transparent border-none cursor-pointer hover:text-danger",
							children: "✕"
						})] }),
						leaderLabel: _e && s ? s.label : null
					}),
					/* @__PURE__ */ Y("div", {
						className: "flex flex-1 min-h-0",
						children: [/* @__PURE__ */ J("div", {
							ref: xe,
							className: "contents",
							children: /* @__PURE__ */ J(Qt, {
								className: "w-[224px] xl:w-[300px] shrink-0",
								computers: h,
								activeComputerId: L?.id ?? null,
								openComputerIds: T.openComputerIds,
								selectedIds: ie,
								statusFilter: ne,
								onStatusFilterChange: re,
								onCreate: g ? () => Ke() : void 0,
								onSelect: (e, { toggle: t }) => {
									if (t) {
										ae((t) => {
											let n = new Set(t);
											return n.has(e.id) ? n.delete(e.id) : n.add(e.id), n;
										});
										return;
									}
									let n = T.panes.find((t) => t.computerId === e.id);
									if (n) {
										T.focusPane(n.id);
										return;
									}
									I && Fe(I.id, e);
								},
								onOpenInPane: (e) => T.split("row", e.id, Ie(e))
							})
						}), /* @__PURE__ */ Y("div", {
							className: "flex flex-col flex-1 min-w-0 min-h-0 bg-surface-inset",
							children: [
								/* @__PURE__ */ J(sn, {
									panes: T.panes.map((e) => ({
										id: e.id,
										label: F.get(e.computerId)?.label ?? "gone",
										kind: c(e)?.title ?? c(e)?.label ?? e.kindId,
										active: e.id === T.activePaneId
									})),
									onFocusPane: T.focusPane,
									onAddPane: () => Ue(T.panes.length % 2 == 1 ? "row" : "column"),
									canAddPane: !!I,
									shellsOpen: Ce,
									maxShells: 8,
									onArrange: T.arrange,
									zoomed: !!T.zoomedPaneId,
									onToggleZoom: T.toggleZoom,
									moreSections: l
								}),
								/* @__PURE__ */ J("div", {
									className: "flex-1 min-h-0 flex px-2 pb-2",
									children: T.activeWindow && I ? /* @__PURE__ */ J(En, {
										className: "flex-1 h-full",
										gutter: "roomy",
										node: T.activeWindow.root,
										activePaneId: T.activePaneId,
										zoomedPaneId: T.zoomedPaneId,
										onRatioChange: T.resize,
										renderLeaf: (e) => {
											let t = r(e), n = c(e), i = e.id === T.activePaneId;
											return !t || !n ? /* @__PURE__ */ J("div", {
												className: "flex-1 flex items-center justify-center rounded-lg border border-border bg-surface text-[12px] text-text-tertiary",
												children: t ? "No pane kind is registered." : "This computer is gone."
											}) : /* @__PURE__ */ J(ln, {
												computer: t,
												kind: n,
												kinds: Gt(C, t),
												onSwitchKind: (t) => {
													T.focusPane(e.id), We(e.id, n.id, t);
												},
												active: i,
												zoomed: T.zoomedPaneId === e.id,
												broadcasting: k !== "focused" && S.has(t.id),
												models: v,
												onFocus: () => {
													i || T.focusPane(e.id);
												},
												onClose: () => {
													T.focusPane(e.id), T.closeActivePane();
												},
												onToggleZoom: () => {
													T.focusPane(e.id), T.toggleZoom();
												},
												moreSections: [{ items: [
													{
														label: "Split right",
														onSelect: () => T.split("row", t.id, n.id)
													},
													{
														label: "Split down",
														onSelect: () => T.split("column", t.id, n.id)
													},
													{
														label: "Open in a new window",
														onSelect: () => T.newWindow(t.id, n.id)
													}
												] }],
												children: /* @__PURE__ */ J(jn, {
													kind: n,
													paneId: e.id,
													computer: t,
													active: i,
													onRegisterPane: Le,
													onSettled: () => void x()
												})
											}, e.id);
										}
									}) : /* @__PURE__ */ Y("div", {
										className: "flex-1 flex flex-col items-center justify-center gap-3 text-center rounded-lg border border-dashed border-border",
										children: [/* @__PURE__ */ J("div", {
											className: "text-[14px] font-semibold text-text-primary",
											children: "No computers in the lab"
										}), /* @__PURE__ */ J("div", {
											className: "text-[12px] text-text-secondary max-w-sm",
											children: g ? "Start a computer and it opens here in a pane." : "Nothing in the fleet is shared with you yet."
										})]
									})
								}),
								/* @__PURE__ */ Y("div", {
									"data-testid": "lab-instruction-bar",
									className: "shrink-0 border-t border-border bg-surface px-2 pt-1.5 pb-1",
									children: [/* @__PURE__ */ Y("div", {
										className: "flex items-center gap-1.5 rounded-lg border border-border bg-surface px-1.5 py-1 focus-within:border-primary",
										children: [
											/* @__PURE__ */ J(b, {
												trigger: /* @__PURE__ */ Y("span", {
													className: "text-[12px] font-semibold",
													children: [D === "nudge" ? "Nudge" : "Type", " ▾"]
												}),
												triggerLabel: "Instruction mode",
												triggerVariant: "link",
												triggerTestId: "lab-instruct-mode",
												sections: [{ items: [{
													label: "Nudge",
													description: "An instruction for each computer's agent",
													active: D === "nudge",
													disabled: !g && !f,
													disabledReason: "Needs permission to run work on these computers",
													onSelect: () => O("nudge")
												}, {
													label: "Type",
													description: "Keystrokes into the panes open on them",
													active: D === "type",
													onSelect: () => O("type")
												}] }]
											}),
											/* @__PURE__ */ J("span", {
												"aria-hidden": "true",
												className: "h-4 w-px bg-border"
											}),
											/* @__PURE__ */ J(b, {
												trigger: /* @__PURE__ */ Y("span", {
													className: "text-[12px] tabular-nums",
													children: [
														m[k],
														" · ",
														_[k],
														" ▾"
													]
												}),
												triggerLabel: "Instruction targets",
												triggerVariant: "link",
												triggerTestId: "lab-instruct-scope",
												sections: [{
													label: "Send to",
													items: [
														"focused",
														"selected",
														"all"
													].map((e) => ({
														label: `${m[e]} · ${_[e]}`,
														active: k === e,
														...e === "selected" && ie.size === 0 ? {
															disabled: !0,
															disabledReason: "⌘-click computers in the rail to select them"
														} : {},
														onSelect: () => oe(e)
													}))
												}]
											}),
											/* @__PURE__ */ J("span", {
												"aria-hidden": "true",
												className: "font-mono text-[12px] text-text-tertiary pl-1",
												children: ">"
											}),
											$e,
											/* @__PURE__ */ J("button", {
												"data-ui-part": "",
												type: "button",
												onClick: () => void He(),
												disabled: !ue.trim() || y === 0 || A,
												"aria-label": "Send instruction",
												title: "Send · ⏎",
												className: "shrink-0 h-6.5 px-2 rounded-md border-none bg-primary text-on-primary text-[12px] cursor-pointer hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed",
												children: "⏎"
											})
										]
									}), /* @__PURE__ */ Y("div", {
										"data-testid": "lab-instruction-caption",
										className: "px-1 pt-0.5 text-xs text-text-tertiary tabular-nums",
										children: [
											D === "type" ? "Shell input" : "Agent instruction",
											" · ",
											y,
											" ",
											y === 1 ? "target" : "targets",
											A && " · sending…"
										]
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ J(Tn, {
						open: he,
						onClose: () => ge(!1),
						chrome: a,
						computers: h,
						panes: T.panes,
						onJumpToPane: T.focusPane,
						onRetarget: (e) => {
							I && Fe(I.id, e);
						},
						onOpenInSplit: (e) => T.split("row", e.id, Ie(e)),
						projects: ee,
						onSelectProject: (e) => {
							let t = e.computers[0];
							if (t) {
								I && Fe(I.id, t);
								return;
							}
							g && Ke(e.id);
						}
					}),
					N && /* @__PURE__ */ J(Mn, {
						keymap: o,
						leader: s,
						chrome: a,
						onClose: () => me(!1)
					})
				]
			})
		});
	}
	return /* @__PURE__ */ J(qe.Provider, {
		value: Ve,
		children: /* @__PURE__ */ Y("div", {
			ref: Se,
			...i === "overlay" ? {
				role: "dialog",
				"aria-modal": !0
			} : { role: "region" },
			"aria-label": "Computer Lab",
			style: Ye,
			className: e("flex flex-col", H ? "bg-surface text-text-primary" : "bg-code-bg text-code-text", i === "overlay" ? "fixed inset-0 z-[150]" : e("relative h-full min-h-0 w-full", H && "rounded-lg border border-border overflow-hidden"), p),
			children: [
				/* @__PURE__ */ Y("div", {
					className: e("flex items-center gap-3 px-3 shrink-0 border-b border-code-border bg-code-panel", Xe ? "h-9" : "h-10"),
					children: [
						/* @__PURE__ */ J("span", {
							className: "text-[11px] font-mono font-semibold tracking-wide text-code-mauve select-none",
							children: "LAB"
						}),
						/* @__PURE__ */ Y("span", {
							"data-testid": "lab-summary",
							className: "text-[10px] font-mono text-code-muted tabular-nums",
							children: [
								h.length,
								" ",
								h.length === 1 ? "computer" : "computers",
								" · ",
								T.panes.length,
								" ",
								T.panes.length === 1 ? "pane" : "panes"
							]
						}),
						/* @__PURE__ */ Y("div", {
							className: "flex items-center gap-1 ml-2",
							children: [T.windows.map((t, n) => {
								let r = t.id === T.activeWindow?.id;
								return /* @__PURE__ */ J("button", {
									"data-ui-part": "",
									type: "button",
									onClick: () => T.selectWindow(t.id),
									title: `Window ${n + 1}`,
									"aria-current": r ? "true" : void 0,
									className: e("px-2 py-0.5 rounded-sm text-[11px] font-mono cursor-pointer border-none transition-colors", r ? "bg-code-blue text-code-bg font-semibold" : "bg-code-surface text-code-muted hover:text-code-text"),
									children: t.name ?? n + 1
								}, t.id);
							}), /* @__PURE__ */ J("button", {
								"data-ui-part": "",
								type: "button",
								onClick: () => I && T.newWindow(I.computerId, w(F.get(I.computerId))),
								disabled: !I,
								title: "New window",
								"aria-label": "New window",
								className: "px-1.5 py-0.5 text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text disabled:opacity-40 disabled:cursor-not-allowed",
								children: "+"
							})]
						}),
						/* @__PURE__ */ J("span", { className: "flex-1" }),
						/* @__PURE__ */ J(S, {
							label: "shells",
							value: Ce / 8,
							segments: 8,
							showPercent: !1,
							note: `${Ce} of 8 open`,
							warnAbove: .74,
							tone: H ? "surface" : "code",
							className: "hidden md:flex"
						}),
						_e && s && /* @__PURE__ */ Y("span", {
							"data-testid": "leader-armed",
							className: "px-2 py-0.5 rounded-sm text-[10px] font-mono font-semibold bg-code-peach text-code-bg animate-pulse",
							children: [s.label, " …"]
						}),
						/* @__PURE__ */ J("button", {
							"data-ui-part": "",
							type: "button",
							onClick: () => me((e) => !e),
							"aria-pressed": N,
							title: `Shortcuts${V("help") ? ` · ${V("help")}` : ""}`,
							className: "text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text",
							children: "?"
						}),
						i === "overlay" && /* @__PURE__ */ J("button", {
							"data-ui-part": "",
							type: "button",
							onClick: n,
							title: `Leave the lab${V("exit") ? ` · ${V("exit")}` : ""}`,
							className: "text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-red",
							children: "✕"
						})
					]
				}),
				/* @__PURE__ */ Y("div", {
					className: "flex flex-1 min-h-0",
					children: [/* @__PURE__ */ J("div", {
						ref: xe,
						className: "contents",
						children: /* @__PURE__ */ J(Sn, {
							className: "w-[210px] shrink-0",
							computers: h,
							activeComputerId: L?.id ?? null,
							openComputerIds: T.openComputerIds,
							showAllActivity: fe,
							onToggleShowAll: () => pe((e) => !e),
							canManage: g,
							models: v,
							onCreate: () => Ke(),
							onOpenMenu: () => me((e) => !e),
							onSelect: (e) => {
								I && Fe(I.id, e);
							},
							onOpenInPane: (e) => T.split("row", e.id, Ie(e)),
							onWatch: (e) => {
								let t = C.find((e) => e.id === "tail");
								if (!t) {
									I && Fe(I.id, e);
									return;
								}
								let n = T.panes.find((n) => n.computerId === e.id && n.kindId === t.id);
								if (n) {
									T.focusPane(n.id);
									return;
								}
								T.split("row", e.id, t.id);
							}
						})
					}), /* @__PURE__ */ J("div", {
						className: e("flex-1 min-w-0 min-h-0", Xe ? "p-1.5" : "p-2", H ? "bg-surface" : "bg-code-bg"),
						children: T.activeWindow && I ? /* @__PURE__ */ J(En, {
							className: "flex-1 h-full",
							node: T.activeWindow.root,
							activePaneId: T.activePaneId,
							zoomedPaneId: T.zoomedPaneId,
							onRatioChange: T.resize,
							renderLeaf: (e) => {
								let t = F.get(e.computerId), n = e.id === T.activePaneId;
								return /* @__PURE__ */ J(An, {
									pane: e,
									computer: t ?? null,
									active: n,
									broadcasting: M,
									idleWindowMs: c,
									zoomed: T.zoomedPaneId === e.id,
									onFocus: () => T.focusPane(e.id),
									onClose: () => {
										T.focusPane(e.id), T.closeActivePane();
									},
									kinds: C,
									onToggleKind: () => {
										T.focusPane(e.id), We(e.id, e.kindId, qt(C, e.kindId, t));
									},
									onRegisterPane: Le,
									onSettled: () => void x()
								}, e.id);
							}
						}) : /* @__PURE__ */ Y("div", {
							className: "h-full flex flex-col items-center justify-center gap-3 text-center",
							children: [
								/* @__PURE__ */ J("div", {
									className: "text-[13px] font-mono text-code-subtle",
									children: "No computers to lab"
								}),
								/* @__PURE__ */ J("div", {
									className: "text-[11px] font-mono text-code-muted max-w-sm",
									children: "Computer Lab multiplexes a fleet. Provision at least one computer and it will open in a pane."
								}),
								g && /* @__PURE__ */ J("button", {
									"data-ui-part": "",
									type: "button",
									onClick: () => Ke(),
									className: "text-[11px] font-mono rounded px-3 py-1 cursor-pointer border border-code-green/60 bg-code-green/15 text-code-green hover:bg-code-green/30",
									children: "+ new computer"
								})
							]
						})
					})]
				}),
				/* @__PURE__ */ Y("div", {
					className: e("flex items-center gap-2 px-3 shrink-0 border-t font-mono transition-colors", Xe ? "py-1" : "py-1.5", M ? "border-code-peach bg-code-peach/10" : "border-code-border bg-code-panel focus-within:border-code-blue"),
					children: [
						/* @__PURE__ */ J("button", {
							"data-ui-part": "",
							type: "button",
							onClick: () => ce((e) => !e),
							"aria-pressed": M,
							title: `Send the prompt to every pane${V("toggle-broadcast") ? ` · ${V("toggle-broadcast")}` : ""}`,
							className: e("text-[10px] px-1.5 py-0.5 rounded-sm cursor-pointer border transition-colors shrink-0", M ? "border-code-peach bg-code-peach/25 text-code-peach font-semibold" : "border-code-border text-code-muted bg-transparent hover:text-code-text"),
							children: M ? "▶▶ all panes" : "▶ focused pane"
						}),
						/* @__PURE__ */ Y("span", {
							className: "text-[10px] text-code-muted tabular-nums shrink-0 hidden sm:inline",
							children: [
								R.length,
								" ",
								R.length === 1 ? "target" : "targets"
							]
						}),
						$e,
						/* @__PURE__ */ J("button", {
							"data-ui-part": "",
							type: "button",
							onClick: ze,
							disabled: !ue.trim() || R.length === 0,
							className: e("shrink-0 text-[11px] px-2 py-0.5 rounded-sm border cursor-pointer transition-colors", "border-code-green/60 bg-code-green/15 text-code-green hover:bg-code-green/30", "disabled:border-code-border disabled:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"),
							children: "send"
						})
					]
				}),
				/* @__PURE__ */ J(Tn, {
					open: he,
					onClose: () => ge(!1),
					chrome: a,
					computers: h,
					panes: T.panes,
					onJumpToPane: T.focusPane,
					onRetarget: (e) => {
						I && Fe(I.id, e);
					},
					onOpenInSplit: (e) => T.split("row", e.id, Ie(e)),
					projects: ee,
					onSelectProject: (e) => {
						let t = e.computers[0];
						if (t) {
							I && Fe(I.id, t);
							return;
						}
						if (!g) {
							y({
								tone: "info",
								title: `${e.name} has no computers`,
								detail: "You do not have permission to start one."
							});
							return;
						}
						Ke(e.id);
					}
				}),
				N && /* @__PURE__ */ J(Mn, {
					keymap: o,
					leader: s,
					chrome: a,
					onClose: () => me(!1)
				})
			]
		})
	});
}
function An({ pane: e, computer: t, active: n, broadcasting: r, zoomed: i, idleWindowMs: a, kinds: o, onFocus: s, onClose: c, onToggleKind: l, onRegisterPane: u, onSettled: d }) {
	let f = Wt(o, e.kindId), p = f && t && f.appliesTo && !f.appliesTo(t) ? Kt(o, t) : f, m = U((t) => {
		p && u(e.id, p, t);
	}, [
		u,
		e.id,
		p
	]);
	if (!t || !p) return /* @__PURE__ */ J(x, {
		title: "unbound",
		active: n,
		className: "flex-1 min-w-0",
		onActivate: s,
		children: /* @__PURE__ */ J("div", {
			className: "h-full flex items-center justify-center text-[11px] font-mono text-code-subtle",
			children: t ? "no pane kind registered" : "this computer is gone"
		})
	});
	let h = j(t), g = O[h];
	return /* @__PURE__ */ Y(x, {
		active: n,
		onActivate: s,
		className: "flex-1 min-w-0",
		bodyClassName: "flex flex-col min-h-0",
		title: /* @__PURE__ */ Y("span", {
			className: "inline-flex items-center gap-1.5",
			children: [
				/* @__PURE__ */ J(C, {
					size: "xs",
					color: g.color,
					pulse: g.pulse,
					"aria-label": g.label
				}),
				t.label,
				i && /* @__PURE__ */ J("span", {
					className: "text-code-peach",
					title: "Zoomed",
					children: "⤢"
				})
			]
		}),
		titleAction: /* @__PURE__ */ Y("span", {
			className: "inline-flex items-center gap-1.5",
			children: [/* @__PURE__ */ J("button", {
				"data-ui-part": "",
				type: "button",
				onClick: l,
				title: qt(o, e.kindId)?.description ?? "Switch pane kind",
				className: "text-[9px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text",
				children: p.label
			}), /* @__PURE__ */ J("button", {
				"data-ui-part": "",
				type: "button",
				onClick: c,
				"aria-label": `Close pane ${t.label}`,
				className: "text-[10px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-red leading-none",
				children: "×"
			})]
		}),
		children: [/* @__PURE__ */ J("div", {
			className: "flex-1 min-h-0",
			children: p.render({
				computer: t,
				paneId: e.id,
				active: n,
				registerPane: m,
				onSettled: d
			})
		}), /* @__PURE__ */ J(k, {
			className: "rounded-b-[3px]",
			computer: t,
			idleWindowMs: a,
			broadcasting: r,
			mode: p.statusMode ?? p.label
		})]
	});
}
function jn({ kind: e, paneId: t, computer: n, active: r, onRegisterPane: i, onSettled: a }) {
	let o = U((n) => i(t, e, n), [
		i,
		t,
		e
	]);
	return /* @__PURE__ */ J(Ct, { children: e.render({
		computer: n,
		paneId: t,
		active: r,
		registerPane: o,
		onSettled: a
	}) });
}
function Mn({ keymap: e, leader: t, chrome: n = "app", onClose: r }) {
	let i = {
		panes: "Panes",
		navigate: "Getting around",
		lab: "The lab"
	};
	return /* @__PURE__ */ J("div", {
		role: "dialog",
		"aria-label": "Keyboard shortcuts",
		className: "absolute inset-0 z-10 flex items-center justify-center bg-code-bg/80",
		onClick: r,
		children: /* @__PURE__ */ Y("div", {
			style: vn(n),
			onClick: (e) => e.stopPropagation(),
			className: "w-[560px] max-w-[92vw] max-h-[80vh] overflow-y-auto rounded-lg border border-code-border bg-code-panel p-5 shadow-2xl",
			children: [
				/* @__PURE__ */ Y("div", {
					className: "flex items-baseline gap-2 mb-4",
					children: [
						/* @__PURE__ */ J("span", {
							className: "text-[13px] font-semibold text-code-text",
							children: "Keyboard shortcuts"
						}),
						t && /* @__PURE__ */ Y("span", {
							className: "text-[10px] font-mono text-code-muted",
							children: [t.label, " prefix is on"]
						}),
						/* @__PURE__ */ J("span", { className: "flex-1" }),
						/* @__PURE__ */ J("button", {
							"data-ui-part": "",
							type: "button",
							onClick: r,
							className: "text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text",
							children: "esc"
						})
					]
				}),
				/* @__PURE__ */ J("div", {
					className: "flex flex-col gap-4",
					children: hn(e).map(({ group: e, bindings: n }) => /* @__PURE__ */ Y("div", { children: [/* @__PURE__ */ J("div", {
						className: "text-[10px] uppercase tracking-wide text-code-mauve mb-1.5",
						children: i[e]
					}), /* @__PURE__ */ J("dl", {
						className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 m-0",
						children: n.map((e) => /* @__PURE__ */ Y(xt, { children: [/* @__PURE__ */ Y("dt", {
							className: "m-0 font-mono text-[11px] text-code-green whitespace-nowrap",
							children: [e.label, t && e.leaderKey && /* @__PURE__ */ Y("span", {
								className: "text-code-muted",
								children: [
									" or ",
									t.label,
									" ",
									e.leaderKey
								]
							})]
						}), /* @__PURE__ */ J("dd", {
							className: "m-0 text-[11px] text-code-subtle",
							children: e.description
						})] }, `${e.command}-${e.label}`))
					})] }, e))
				}),
				/* @__PURE__ */ Y("div", {
					className: "mt-4 pt-3 border-t border-code-border text-[10px] text-code-muted leading-relaxed",
					children: [
						"⌘T, ⌘N and ⌘W are not available — the browser keeps those for its own tabs and windows, and never forwards them to a page. Agent panes stream over SSE and are free to keep open; terminal panes hold a real shell against the runtime's limit of ",
						8,
						", which is the meter in the top bar."
					]
				})
			]
		})
	});
}
//#endregion
//#region src/components/compute/components/MachinePresenceMenu.tsx
var Nn = {
	connected: "success",
	stale: "caution",
	offline: "neutral"
}, Pn = {
	connected: "connected",
	stale: "stale",
	offline: "offline"
};
function Fn(e) {
	return !e || e.mode === "disabled" ? "— sync off" : e.mode === "offline" ? "○ offline — queuing" : e.mode === "pending" ? `◐ ${e.pendingOps ?? "?"} pending` : "● synced";
}
function In(e, t = []) {
	let n = e.modelProvider === "bedrock" ? A(e.model, t) : e.model ?? "—";
	return e.modelProvider ? `${e.modelProvider} · ${n}` : n;
}
function Ln(e) {
	return e.reduce((e, t) => e + t.sessions.length, 0);
}
function Rn({ session: e, models: t }) {
	let r = e.projectName ?? e.projectId ?? e.repo ?? "—", i = e.branch ? `${r} · ${e.branch}` : r, a = e.modelProvider != null && e.modelProvider !== "bedrock";
	return /* @__PURE__ */ Y("li", {
		"data-testid": "machine-session-row",
		className: "flex flex-col gap-1 rounded-md px-2 py-1.5 hover:bg-surface-hover",
		children: [
			/* @__PURE__ */ Y("div", {
				className: "flex items-center gap-2 min-w-0",
				children: [
					/* @__PURE__ */ J("span", {
						className: "text-xs font-medium text-text-primary truncate",
						title: e.worktree ?? i,
						children: i
					}),
					/* @__PURE__ */ J("span", { className: "flex-1" }),
					/* @__PURE__ */ J(n, {
						size: "xs",
						mono: !0,
						tone: a ? "accent" : "neutral",
						className: "shrink-0",
						children: In(e, t)
					})
				]
			}),
			e.intent && /* @__PURE__ */ J("div", {
				className: "text-[11px] text-text-tertiary truncate",
				title: e.intent,
				children: e.intent
			}),
			/* @__PURE__ */ Y("div", {
				className: "flex items-center gap-3 min-w-0",
				children: [e.contextUsed != null && /* @__PURE__ */ J(S, {
					label: "ctx",
					value: e.contextUsed,
					tone: "surface",
					segments: 8,
					className: "shrink-0"
				}), /* @__PURE__ */ J("span", {
					className: "text-[10px] font-mono text-text-tertiary truncate",
					title: e.memory?.pullCursorAgeS == null ? void 0 : `read replica ${e.memory.pullCursorAgeS}s behind the mesh`,
					children: Fn(e.memory)
				})]
			})
		]
	});
}
function zn({ nodes: t, models: r = [], onOpenLab: i, onManage: a, className: o, "data-testid": s = "machine-presence-menu" }) {
	let c = K(null), [l, u] = q(!1);
	if (t.length === 0) return null;
	let d = Ln(t), f = t.some((e) => e.status === "connected") ? "connected" : t.some((e) => e.status === "stale") ? "stale" : "offline", p = t.length === 1 ? t[0].label : `${t.length} machines`, m = f === "connected" && d > 0;
	return /* @__PURE__ */ Y(Ct, { children: [/* @__PURE__ */ J("button", {
		"data-ui-part": "",
		ref: c,
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": l,
		"aria-label": `Local machines: ${p}, ${d} active session${d === 1 ? "" : "s"}, ${Pn[f]}`,
		title: `${p} — ${Pn[f]}`,
		onClick: () => u((e) => !e),
		"data-testid": s,
		className: e("inline-flex items-center cursor-pointer rounded-md border border-border px-2 py-1", "bg-transparent hover:bg-surface-hover transition-colors duration-100", l && "bg-surface-hover", o),
		children: /* @__PURE__ */ J(n, {
			size: "xs",
			mono: !0,
			tone: Nn[f],
			dot: m ? "pulse" : "static",
			className: "bg-transparent px-0",
			children: d === 0 ? `⌂ ${p}` : `⌂ ${p} · ${d}`
		})
	}), /* @__PURE__ */ J(v, {
		trigger: c,
		open: l,
		onClose: () => u(!1),
		placement: "bottom-end",
		"aria-label": "Local machine sessions",
		className: "w-[320px] p-2",
		"data-testid": `${s}-panel`,
		children: /* @__PURE__ */ Y("div", {
			className: "flex flex-col gap-2",
			children: [t.map((e) => /* @__PURE__ */ Y("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ Y("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ J(te, { children: e.label }),
						e.platform && /* @__PURE__ */ J("span", {
							className: "text-[10px] font-mono text-text-tertiary",
							children: e.platform
						}),
						/* @__PURE__ */ J("span", { className: "flex-1" }),
						/* @__PURE__ */ J(n, {
							size: "xs",
							uppercase: !0,
							tone: Nn[e.status],
							dot: "static",
							children: Pn[e.status]
						})
					]
				}), e.sessions.length > 0 ? /* @__PURE__ */ J("ul", {
					className: "flex flex-col",
					children: e.sessions.map((e) => /* @__PURE__ */ J(Rn, {
						session: e,
						models: r
					}, e.id))
				}) : /* @__PURE__ */ J(w, {
					"data-testid": "machine-no-sessions",
					children: e.status === "offline" ? "machine offline" : "no active sessions"
				})]
			}, e.id)), (i || a) && /* @__PURE__ */ Y("div", {
				className: "flex items-center gap-2 border-t border-border pt-2",
				children: [
					i && /* @__PURE__ */ J("button", {
						"data-ui-part": "",
						type: "button",
						onClick: () => {
							u(!1), i();
						},
						className: "text-[11px] font-medium text-primary hover:underline cursor-pointer bg-transparent border-0 p-0",
						children: "Open Computer Lab"
					}),
					/* @__PURE__ */ J("span", { className: "flex-1" }),
					a && /* @__PURE__ */ J("button", {
						"data-ui-part": "",
						type: "button",
						onClick: () => {
							u(!1), a();
						},
						className: "text-[11px] text-text-secondary hover:underline cursor-pointer bg-transparent border-0 p-0",
						children: "Manage machines"
					})
				]
			})]
		})
	})] });
}
//#endregion
//#region src/components/compute/components/CommandOutputPane.tsx
function Bn({ command: a, lines: o, running: s = !1, exitCode: c, onOpenShell: l, id: u, className: d, "data-testid": f = u ? `command-output-${u}` : "command-output" }) {
	let p = null;
	s ? p = /* @__PURE__ */ J(n, {
		tone: "info",
		size: "sm",
		"data-testid": `${f}-running`,
		children: "running"
	}) : c !== void 0 && (p = /* @__PURE__ */ Y(n, {
		tone: c === 0 ? "success" : "danger",
		size: "sm",
		"data-testid": `${f}-exit`,
		children: ["exit ", c]
	}));
	let m = /* @__PURE__ */ Y(r, {
		wrap: !1,
		gap: "sm",
		children: [
			/* @__PURE__ */ Y(i, {
				size: "xs",
				tone: "tertiary",
				children: [
					o.length,
					" ",
					o.length === 1 ? "line" : "lines"
				]
			}),
			p,
			l && /* @__PURE__ */ J(t, {
				size: "sm",
				variant: "ghost",
				onClick: l,
				"data-testid": `${f}-open-shell`,
				children: "Open shell"
			})
		]
	});
	return /* @__PURE__ */ J(ee, {
		lines: o,
		title: `$ ${a}`,
		headerSlot: m,
		showLevel: !1,
		showSource: !1,
		showTimestamp: !1,
		follow: s,
		emptyMessage: s ? "Waiting for output…" : "No output.",
		className: e("min-h-0", d),
		"data-testid": f
	});
}
//#endregion
//#region src/components/compute/components/ComputeDock.tsx
var Vn = {
	docked: "▭",
	grid: "▦",
	stack: "▤",
	floating: "▢"
};
function Hn(e) {
	W(() => {
		if (!e) return;
		let t = (e) => {
			let t = e.metaKey || e.ctrlKey;
			if (t && (e.key === "'" || e.key === "\"")) {
				e.preventDefault(), e.stopPropagation(), e.shiftKey ? at() : Be(et().mode === "hidden");
				return;
			}
			if (et().mode !== "hidden") {
				if (e.altKey && !t && /^[1-9]$/.test(e.key)) {
					e.preventDefault(), e.stopPropagation(), ze(Number(e.key) - 1);
					return;
				}
				e.ctrlKey && e.key === "Tab" && (e.preventDefault(), e.stopPropagation(), Ke(e.shiftKey ? -1 : 1));
			}
		};
		return window.addEventListener("keydown", t, !0), () => window.removeEventListener("keydown", t, !0);
	}, [e]);
}
function Un({ status: e }) {
	let t = D[e];
	return /* @__PURE__ */ J("span", {
		"aria-hidden": "true",
		title: t.help,
		className: `w-1.5 h-1.5 rounded-full shrink-0 ${t.pulse ? "animate-pulse" : ""}`,
		style: { background: t.color }
	});
}
function Wn({ shell: e, active: t, labelled: n }) {
	return /* @__PURE__ */ Y("div", {
		className: "flex flex-col min-h-0 h-full",
		children: [n && /* @__PURE__ */ Y("div", {
			className: "flex items-center gap-1.5 px-2 py-1 border-b shrink-0 bg-code-surface border-code-border",
			children: [
				/* @__PURE__ */ J(Un, { status: e.status }),
				/* @__PURE__ */ J("span", {
					className: "text-[10px] font-mono text-code-muted",
					children: e.label
				}),
				/* @__PURE__ */ J("div", { className: "flex-1" }),
				/* @__PURE__ */ J("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => Qe(e.id),
					"aria-label": `Close ${e.label}`,
					className: "text-[10px] bg-transparent border-none cursor-pointer px-1 leading-none text-code-muted hover:text-code-red",
					children: "×"
				})
			]
		}), /* @__PURE__ */ J("div", {
			className: "flex-1 min-h-0",
			children: e.kind === "output" && e.output ? /* @__PURE__ */ J(Bn, {
				id: e.id,
				command: e.output.command,
				lines: e.output.lines,
				running: e.output.running,
				...e.output.exitCode === void 0 ? {} : { exitCode: e.output.exitCode },
				...e.output.onOpenShell ? { onOpenShell: e.output.onOpenShell } : {},
				className: "h-full"
			}) : /* @__PURE__ */ J(V, {
				sessionId: e.sessionId,
				shellId: e.id,
				label: e.label,
				...e.cwd ? { cwd: e.cwd } : {},
				chrome: !1,
				fillHeight: !0,
				autoConnect: t,
				onStatus: (t, n) => dt(e.id, t, n)
			})
		})]
	});
}
function Gn({ hotkeys: e = !0, reconcile: t = !0, className: n = "" }) {
	let r = St(He, et, et), i = it();
	Hn(e);
	let a = G(() => (i?.computers ?? []).map((e) => e.sessionId), [i?.computers]);
	if (W(() => {
		!t || a.length === 0 || Ye(a);
	}, [t, a]), r.mode === "hidden" || r.shells.length === 0) return null;
	let o = We(r.mode), s = /* @__PURE__ */ Y("div", {
		style: _n,
		className: "flex flex-col h-full min-h-0",
		children: [/* @__PURE__ */ Y("div", {
			className: "flex items-center gap-1 px-1.5 py-1 border-b shrink-0 overflow-x-auto bg-terminal-bg border-code-border",
			children: [
				r.shells.map((e, t) => {
					let n = e.id === r.activeId;
					return /* @__PURE__ */ Y("div", {
						className: `group flex items-center gap-1.5 pl-2 pr-1 py-1 rounded shrink-0 ${n ? "bg-code-surface" : "bg-transparent hover:bg-code-surface/60"}`,
						children: [/* @__PURE__ */ Y("button", {
							"data-ui-part": "",
							type: "button",
							onClick: () => Pe(e.id),
							title: `${e.label} · ⌥${t + 1}`,
							"aria-current": n ? "true" : void 0,
							className: `flex items-center gap-1.5 text-[11px] font-mono cursor-pointer border-none bg-transparent p-0 ${n ? "text-code-text" : "text-code-muted hover:text-code-text"}`,
							children: [
								/* @__PURE__ */ J(Un, { status: e.status }),
								e.label,
								e.unread && !n && /* @__PURE__ */ J("span", {
									className: "w-1 h-1 rounded-full bg-code-blue",
									title: "new output while you were away"
								})
							]
						}), /* @__PURE__ */ J("button", {
							"data-ui-part": "",
							type: "button",
							onClick: () => Qe(e.id),
							"aria-label": `Close ${e.label}`,
							title: `Close ${e.label} — the shell is killed`,
							className: "opacity-0 group-hover:opacity-100 focus:opacity-100 bg-transparent border-none cursor-pointer px-1 leading-none text-code-muted hover:text-code-red",
							children: "×"
						})]
					}, e.id);
				}),
				/* @__PURE__ */ J("div", { className: "flex-1" }),
				r.shells.length >= 8 && /* @__PURE__ */ J("span", {
					className: "text-[10px] mr-1 shrink-0 text-code-peach",
					title: "AgentCore allows 10 shells per runtime",
					children: "max shells"
				}),
				/* @__PURE__ */ J("div", {
					className: "flex rounded border overflow-hidden mr-1 shrink-0 border-code-border",
					children: Object.keys(Vn).map((e) => /* @__PURE__ */ J("button", {
						"data-ui-part": "",
						type: "button",
						onClick: () => Xe(e),
						title: `${e} layout — ⌘⇧' cycles`,
						"aria-pressed": r.mode === e,
						className: `px-1.5 py-0.5 text-[10px] cursor-pointer border-none ${r.mode === e ? "bg-code-border text-code-text" : "bg-transparent text-code-muted hover:text-code-text"}`,
						children: Vn[e]
					}, e))
				}),
				/* @__PURE__ */ J("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => Be(!1),
					title: "Hide — ⌘'. The shells keep running.",
					className: "text-[11px] px-1.5 py-0.5 bg-transparent border-none cursor-pointer shrink-0 text-code-muted hover:text-code-text",
					children: "▾"
				})
			]
		}), /* @__PURE__ */ J("div", {
			className: `flex-1 min-h-0 ${o ? `p-1.5 gap-1.5 overflow-auto ${r.mode === "grid" ? "grid grid-cols-1 md:grid-cols-2 auto-rows-fr" : "flex flex-col"}` : "relative"}`,
			children: r.shells.map((e) => {
				let t = e.id === r.activeId;
				return /* @__PURE__ */ J("div", {
					onMouseDown: () => Pe(e.id),
					"aria-hidden": !o && !t,
					className: o ? `min-h-[160px] rounded border overflow-hidden flex flex-col ${t ? "border-code-green/50" : "border-code-border"}` : "absolute inset-0",
					style: o ? void 0 : { visibility: t ? "visible" : "hidden" },
					children: /* @__PURE__ */ J(Wn, {
						shell: e,
						active: o || t,
						labelled: o
					})
				}, e.id);
			})
		})]
	});
	if (r.mode === "floating") return /* @__PURE__ */ J(T, {
		open: !0,
		onClose: () => Be(!1),
		title: "Terminals",
		defaultPosition: "bottom-right",
		persistKey: "ui-components.computeDock.anchor.v1",
		widthClassName: "w-[46rem] max-w-[92vw]",
		heightClassName: "h-[26rem]",
		tone: "dark",
		className: n,
		"data-testid": "compute-dock-floating",
		children: s
	});
	let c = r.mode === "stack" ? "fixed top-0 right-0 bottom-0 w-[26rem] max-w-[92vw] border-l" : "fixed left-0 right-0 bottom-0 border-t";
	return /* @__PURE__ */ J("div", {
		"data-testid": "compute-dock",
		className: `${c} z-[120] flex flex-col bg-terminal-bg border-code-border ${n}`,
		style: r.mode === "stack" ? _n : {
			..._n,
			height: r.geometry.dockHeight
		},
		children: s
	});
}
//#endregion
//#region src/components/compute/lib/workspaceTree.ts
var Kn = String.raw`find . -maxdepth 3 \( -name .git -o -name node_modules -o -name .venv -o -name __pycache__ -o -name dist \) -prune -printf "p %p\n" -o -printf "%y %p\n" 2>/dev/null | head -400`, qn = "git log --oneline -3 2>/dev/null; git status --short 2>/dev/null | head -5", Jn = 400;
function Yn(e) {
	let t = [], n = /* @__PURE__ */ new Map(), r = (e) => {
		if (!e) return null;
		let i = n.get(e);
		if (i) return i;
		let a = e.lastIndexOf("/"), o = {
			name: e.slice(a + 1),
			path: e,
			kind: "dir",
			children: []
		};
		n.set(e, o);
		let s = a >= 0 ? r(e.slice(0, a)) : null;
		return (s ? s.children : t).push(o), o;
	};
	for (let i of e) {
		let e = i.indexOf(" ");
		if (e < 1) continue;
		let a = i.slice(0, e), o = i.slice(e + 1);
		if (o.startsWith("./") && (o = o.slice(2)), !o || o === ".") continue;
		if (a === "d" || a === "p") {
			let e = r(o);
			e && a === "p" && (e.pruned = !0);
			continue;
		}
		let s = o.lastIndexOf("/"), c = s >= 0 ? r(o.slice(0, s)) : null, l = {
			name: o.slice(s + 1),
			path: o,
			kind: "file",
			children: []
		};
		n.set(o, l), (c ? c.children : t).push(l);
	}
	return Xn(t), t;
}
function Xn(e) {
	e.sort((e, t) => e.kind === t.kind ? e.name.localeCompare(t.name) : e.kind === "dir" ? -1 : 1);
	for (let t of e) Xn(t.children);
}
function Zn(e) {
	return e.children.reduce((e, t) => e + 1 + Zn(t), 0);
}
function Qn(e, t, n = 0) {
	let r = [];
	for (let i of e) r.push({
		node: i,
		depth: n
	}), i.kind === "dir" && !i.pruned && t.has(i.path) && r.push(...Qn(i.children, t, n + 1));
	return r;
}
//#endregion
//#region src/components/compute/fixtures/mockShell.ts
var $n = "mock-shell:", Z = "/mnt/workspace", er = "bedrock_agentcore", Q = {
	reset: "\x1B[0m",
	bold: "\x1B[1m",
	dim: "\x1B[2m",
	red: "\x1B[31m",
	green: "\x1B[32m",
	yellow: "\x1B[33m",
	blue: "\x1B[34m",
	magenta: "\x1B[35m",
	cyan: "\x1B[36m",
	clear: "\x1B[2J\x1B[H"
}, tr = {
	[Z]: [
		".git/",
		"README.md",
		"src/",
		"tests/",
		"logs/"
	],
	[`${Z}/src`]: ["main.py"],
	[`${Z}/tests`]: ["test_main.py"],
	[`${Z}/logs`]: [
		"agent.log",
		"tools.log",
		"runtime.log"
	],
	[`${Z}/.git`]: [
		"HEAD",
		"config",
		"objects/",
		"refs/"
	]
}, nr = {
	[`${Z}/README.md`]: [
		"# workspace",
		"",
		"One agent computer: a Firecracker microVM with this directory",
		"mounted persistently. Everything under /mnt/workspace survives a",
		"session stop; everything outside it does not.",
		"",
		"Treat it as a cache, not a durable store — a runtime version update",
		"wipes it."
	].join("\n"),
	[`${Z}/src/main.py`]: [
		"\"\"\"Ingest entrypoint the agent has been editing.\"\"\"",
		"",
		"",
		"def handler(event, context):",
		"    body = event.get(\"body\") or {}",
		"    return {\"statusCode\": 200, \"body\": body}"
	].join("\n"),
	[`${Z}/tests/test_main.py`]: [
		"from src.main import handler",
		"",
		"",
		"def test_handler_echoes_body():",
		"    assert handler({\"body\": {\"a\": 1}}, None)[\"body\"] == {\"a\": 1}"
	].join("\n"),
	[`${Z}/logs/agent.log`]: [
		"08:08:12 INFO  session resumed · model haiku-4.5",
		"08:08:14 INFO  read_file src/main.py",
		"08:08:21 INFO  grep \"def handler\" · 1 file",
		"08:08:29 WARN  context at 61% — summarising earlier turns",
		"08:08:33 INFO  edit_file src/main.py · +1 -1",
		"08:08:41 INFO  run_tests pytest -q · 4 passed in 0.62s",
		"08:08:44 INFO  turn complete · waiting for the next instruction"
	].join("\n"),
	[`${Z}/logs/tools.log`]: [
		"08:08:14 read_file   src/main.py            ok   3ms",
		"08:08:21 grep        def handler            ok  11ms",
		"08:08:33 edit_file   src/main.py            ok   5ms",
		"08:08:41 run_tests   pytest -q              ok 620ms"
	].join("\n"),
	[`${Z}/logs/runtime.log`]: [
		"08:00:02 INFO  microVM up · /mnt/workspace mounted",
		"08:00:03 INFO  shell slots 1/10",
		"08:07:58 WARN  idle 7m · auto-stop in 13m"
	].join("\n"),
	[`${Z}/.git/HEAD`]: "ref: refs/heads/main",
	[`${Z}/.git/config`]: [
		"[core]",
		"	repositoryformatversion = 0",
		"[remote \"origin\"]",
		"	url = git@github.com:acme/ingest.git"
	].join("\n")
}, rr = [
	["Read", "src/main.py"],
	["Grep", "\"def handler\" (1 file)"],
	["Edit", "src/main.py · +1 -1"],
	["Bash", "pytest -q → 4 passed in 0.62s"]
], ir = [
	"This box understands:",
	"",
	"  help                  this list",
	"  ls [path]             list the workspace",
	"  pwd                   where you are",
	"  cd <path>             move",
	"  cat <file>            print a file",
	"  head|tail [-n N] <f>  the start or end of a file",
	"  git status            what changed",
	"  git log --oneline     recent commits",
	"  claude \"<prompt>\"     run an agent turn here",
	"  clear                 clear the screen",
	"  exit                  end the shell"
], ar = /* @__PURE__ */ new Map();
function or(e, t) {
	let n = t ?? `mock-${Math.random().toString(36).slice(2, 8)}`;
	return {
		url: `${$n}//${e}?shell=${encodeURIComponent(n)}`,
		shellId: n
	};
}
function sr(e) {
	let t = [], n = /"([^"]*)"|'([^']*)'|(\S+)/g, r = n.exec(e);
	for (; r;) t.push(r[1] ?? r[2] ?? r[3] ?? ""), r = n.exec(e);
	return t;
}
function cr(e, t) {
	let n = t === "~" ? Z : t.startsWith("~/") ? `${Z}/${t.slice(2)}` : t, r = n.startsWith("/") ? "" : e, i = [];
	for (let e of `${r}/${n}`.split("/")) if (e !== "" && e !== ".") {
		if (e === "..") {
			i.pop();
			continue;
		}
		i.push(e);
	}
	return `/${i.join("/")}`;
}
function lr(e) {
	return e.endsWith("/") ? `${Q.bold}${Q.blue}${e.slice(0, -1)}${Q.reset}` : e;
}
var ur = class extends EventTarget {
	static CONNECTING = 0;
	static OPEN = 1;
	static CLOSING = 2;
	static CLOSED = 3;
	CONNECTING = 0;
	OPEN = 1;
	CLOSING = 2;
	CLOSED = 3;
	url;
	protocol = "";
	extensions = "";
	bufferedAmount = 0;
	binaryType = "blob";
	readyState = 0;
	onopen = null;
	onclose = null;
	onerror = null;
	onmessage = null;
	shellId;
	session;
	encoder = new TextEncoder();
	decoder = new TextDecoder();
	timers = /* @__PURE__ */ new Set();
	line = "";
	busy = !1;
	cancelled = !1;
	constructor(e) {
		super(), this.url = e;
		let t = e.indexOf("?");
		this.shellId = new URLSearchParams(t < 0 ? "" : e.slice(t + 1)).get("shell") ?? "mock-shell", this.session = ar.get(this.shellId) ?? {
			cwd: Z,
			attached: !1
		}, ar.set(this.shellId, this.session), this.later(() => this.handshake(), 60);
	}
	send(e) {
		if (this.readyState !== this.OPEN) return;
		let t = dr(e);
		if (!t || t.length === 0) return;
		let n = t[0];
		if (n === H.CLOSE) {
			this.exit(0);
			return;
		}
		n === H.STDIN && this.feed(this.decoder.decode(t.subarray(1)));
	}
	close(e = 1e3, t = "") {
		if (this.readyState !== this.CLOSED) {
			this.readyState = this.CLOSED;
			for (let e of this.timers) clearTimeout(e);
			this.timers.clear(), this.cancelled = !0, setTimeout(() => {
				let n = new CloseEvent("close", {
					code: e,
					reason: t,
					wasClean: !0
				});
				this.onclose?.(n), this.dispatchEvent(n);
			}, 0);
		}
	}
	handshake() {
		this.readyState = this.OPEN, this.frame(H.STATUS, JSON.stringify({ metadata: {
			shellId: this.shellId,
			reconnected: this.session.attached
		} })), this.write(this.session.attached ? `${Q.dim}reattached to ${this.shellId}${Q.reset}\r\n` : [
			`${Q.green}AgentCore devbox${Q.reset} ${Q.dim}· simulated shell, no runtime attached${Q.reset}`,
			`${Q.dim}Type ${Q.reset}help${Q.dim} for what this box understands.${Q.reset}`,
			""
		].join("\r\n")), this.session.attached = !0, this.prompt();
		let e = new Event("open");
		this.onopen?.(e), this.dispatchEvent(e);
	}
	frame(e, t) {
		if (this.readyState !== this.OPEN) return;
		let n = this.encoder.encode(t), r = new Uint8Array(n.length + 1);
		r[0] = e, r.set(n, 1);
		let i = new MessageEvent("message", { data: r.buffer });
		this.onmessage?.(i), this.dispatchEvent(i);
	}
	write(e) {
		this.frame(H.STDOUT, e);
	}
	fail(e) {
		this.frame(H.STDERR, `${Q.red}${e}${Q.reset}\r\n`);
	}
	prompt() {
		this.write(`${Q.green}${er}${Q.reset}:${Q.bold}${Q.blue}${this.session.cwd}${Q.reset}$ `);
	}
	later(e, t) {
		let n = setTimeout(() => {
			this.timers.delete(n), e();
		}, t);
		this.timers.add(n);
	}
	wait(e) {
		return new Promise((t) => this.later(t, e));
	}
	exit(e) {
		this.frame(H.STATUS, JSON.stringify({ details: { causes: [{
			reason: "ExitCode",
			message: String(e)
		}] } })), ar.delete(this.shellId), this.close(1e3, "shell exited");
	}
	feed(e) {
		for (let t = 0; t < e.length; t += 1) {
			let n = e[t];
			if (n === "\x1B") {
				for (; t + 1 < e.length && !/[a-zA-Z~]/.test(e[t + 1]);) t += 1;
				t += 1;
				continue;
			}
			if (n === "") {
				this.write("^C\r\n"), this.cancelled = !0, this.line = "", this.busy || this.prompt();
				continue;
			}
			if (!this.busy) {
				if (n === "\r" || n === "\n") {
					this.write("\r\n");
					let e = this.line;
					this.line = "", this.run(e);
					continue;
				}
				if (n === "") {
					this.line.length > 0 && (this.line = this.line.slice(0, -1), this.write("\b \b"));
					continue;
				}
				if (n === "\f") {
					this.write(Q.clear), this.prompt(), this.write(this.line);
					continue;
				}
				n < " " || (this.line += n, this.write(n));
			}
		}
	}
	async run(e) {
		let t = e.trim();
		if (t === "") {
			this.prompt();
			return;
		}
		this.busy = !0, this.cancelled = !1;
		try {
			await this.dispatch(sr(t));
		} finally {
			this.busy = !1, this.readyState === this.OPEN && this.prompt();
		}
	}
	async dispatch(e) {
		let [t, ...n] = e;
		switch (t) {
			case "help":
				this.write(`${ir.join("\r\n")}\r\n`);
				return;
			case "clear":
				this.write(Q.clear);
				return;
			case "pwd":
				this.write(`${this.session.cwd}\r\n`);
				return;
			case "ls":
				this.list(n);
				return;
			case "cd":
				this.chdir(n);
				return;
			case "cat":
				this.cat(n);
				return;
			case "head":
			case "tail":
				this.slice(t, n);
				return;
			case "git":
				this.git(n);
				return;
			case "claude":
				await this.claude(n);
				return;
			case "exit":
			case "logout":
				this.write("logout\r\n"), this.exit(0);
				return;
			default: this.fail(`bash: ${t}: command not found`), this.write(`${Q.dim}exit 127${Q.reset}\r\n`);
		}
	}
	list(e) {
		let t = cr(this.session.cwd, e.find((e) => !e.startsWith("-")) ?? "."), n = tr[t];
		if (!n) {
			if (nr[t] !== void 0) {
				this.write(`${t}\r\n`);
				return;
			}
			this.fail(`ls: cannot access '${t}': No such file or directory`);
			return;
		}
		let r = e.some((e) => e.startsWith("-") && e.includes("a")) ? n : n.filter((e) => !e.startsWith("."));
		this.write(`${r.map(lr).join("  ")}\r\n`);
	}
	chdir(e) {
		let t = cr(this.session.cwd, e[0] ?? "~");
		if (!tr[t]) {
			this.fail(`cd: ${e[0] ?? t}: No such file or directory`);
			return;
		}
		this.session.cwd = t;
	}
	cat(e) {
		if (e.length === 0) {
			this.fail("cat: missing operand");
			return;
		}
		for (let t of e) {
			let e = cr(this.session.cwd, t), n = nr[e];
			if (n === void 0) {
				this.fail(tr[e] ? `cat: ${t}: Is a directory` : `cat: ${t}: No such file or directory`);
				continue;
			}
			this.write(`${n.replace(/\n/g, "\r\n")}\r\n`);
		}
	}
	slice(e, t) {
		let n = 10, r = [];
		for (let e = 0; e < t.length; e += 1) {
			let i = t[e];
			if (i === "-n") {
				n = Number(t[e += 1] ?? 10);
				continue;
			}
			if (/^-\d+$/.test(i)) {
				n = Number(i.slice(1));
				continue;
			}
			i !== "-f" && r.push(i);
		}
		if (r.length === 0) {
			this.fail(`${e}: missing operand`);
			return;
		}
		for (let t of r) {
			let r = cr(this.session.cwd, t), i = nr[r];
			if (i === void 0) {
				this.fail(`${e}: cannot open '${t}' for reading: ${tr[r] ? "Is a directory" : "No such file or directory"}`);
				continue;
			}
			let a = i.split("\n"), o = e === "head" ? a.slice(0, n) : a.slice(Math.max(0, a.length - n));
			this.write(`${o.join("\r\n")}\r\n`);
		}
	}
	git(e) {
		if (e[0] === "status") {
			this.write([
				"On branch main",
				"Your branch is up to date with 'origin/main'.",
				"",
				"Changes not staged for commit:",
				`  ${Q.dim}(use "git add <file>..." to update what will be committed)${Q.reset}`,
				`\t${Q.red}modified:   src/main.py${Q.reset}`,
				"",
				"no changes added to commit",
				""
			].join("\r\n"));
			return;
		}
		if (e[0] === "log") {
			this.write([
				`${Q.yellow}9f2c1ab${Q.reset} wire up the ingest handler`,
				`${Q.yellow}3ad77e0${Q.reset} cover the empty-body case`,
				`${Q.yellow}b41e902${Q.reset} scaffold the service`,
				""
			].join("\r\n"));
			return;
		}
		this.fail(`git: '${e[0] ?? ""}' is not simulated here — try status or log --oneline`);
	}
	async claude(e) {
		let t = e.find((e) => !e.startsWith("-"));
		if (!t) {
			this.fail("claude: expected a prompt, e.g. claude \"fix the handler\"");
			return;
		}
		this.write(`${Q.magenta}✻${Q.reset} ${Q.dim}${t}${Q.reset}\r\n`);
		for (let [e, t] of rr) {
			if (await this.wait(520), this.cancelled || this.readyState !== this.OPEN) return;
			this.write(`  ${Q.cyan}⏺${Q.reset} ${Q.bold}${e}${Q.reset}(${t})\r\n`);
		}
		await this.wait(420), !(this.cancelled || this.readyState !== this.OPEN) && this.write(`${Q.green}✓${Q.reset} done · ${rr.length + 1} turns · 6.4s · ${Q.yellow}$0.0184${Q.reset}\r\n`);
	}
};
function dr(e) {
	return ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : e instanceof ArrayBuffer ? new Uint8Array(e) : null;
}
var fr = null;
function pr(e = {}) {
	let t = e.scheme ?? "mock-shell:", n = globalThis.WebSocket;
	if (typeof n != "function") return () => {};
	if (fr) fr.count += 1;
	else {
		class e extends n {
			constructor(e, n) {
				let r = typeof e == "string" ? e : e.href;
				if (r.startsWith(t)) return new ur(r);
				super(e, n);
			}
		}
		globalThis.WebSocket = e, fr = {
			native: n,
			count: 1
		};
	}
	let r = !1;
	return () => {
		r || !fr || (r = !0, --fr.count, !(fr.count > 0) && (globalThis.WebSocket = fr.native, fr = null, ar.clear()));
	};
}
//#endregion
//#region src/components/compute/fixtures/mockTail.ts
var mr = "mock-tail:", hr = (e) => ({
	type: "assistant",
	message: { content: [{
		type: "text",
		text: e
	}] }
}), $ = (e, t) => ({
	type: "assistant",
	message: { content: [{
		type: "tool_use",
		name: e,
		input: t
	}] }
}), gr = [
	{
		id: "nightly-dependency-audit",
		label: "nightly-dependency-audit",
		frames: [
			{
				afterMs: 400,
				data: {
					type: "job_started",
					title: "nightly-dependency-audit",
					kind: "devbox:task"
				}
			},
			{
				afterMs: 200,
				data: {
					type: "task_started",
					prompt: "Audit dependencies for advisories and open a change request for anything critical."
				}
			},
			{
				afterMs: 900,
				data: hr("Reading the lockfile and resolving the dependency graph.")
			},
			{
				afterMs: 1300,
				data: $("Bash", { command: "npm audit --json" })
			},
			{
				afterMs: 2100,
				data: hr("3 advisories: 1 high, 2 moderate. Checking whether the high one is reachable.")
			},
			{
				afterMs: 1700,
				data: $("Grep", { pattern: "serialize-javascript" })
			},
			{
				afterMs: 2400,
				data: hr("Reachable from the report renderer only. Bumping it and pinning the transitive.")
			},
			{
				afterMs: 1400,
				data: $("Edit", { file: "package.json" })
			},
			{
				afterMs: 2200,
				data: {
					type: "result",
					subtype: "success",
					num_turns: 6,
					duration_ms: 12800,
					total_cost_usd: .0412,
					result: "Bumped serialize-javascript to 6.0.2; the two moderates are dev-only and left alone."
				}
			},
			{
				afterMs: 300,
				data: { type: "devbox_end" }
			},
			{
				afterMs: 200,
				data: {
					type: "job_finished",
					ok: !0
				}
			}
		]
	},
	{
		id: "flaky-test-triage",
		label: "flaky-test-triage",
		frames: [
			{
				afterMs: 400,
				data: {
					type: "job_started",
					title: "flaky-test-triage",
					kind: "devbox:task"
				}
			},
			{
				afterMs: 200,
				data: {
					type: "task_started",
					prompt: "Find tests that failed intermittently this week and say why."
				}
			},
			{
				afterMs: 800,
				data: hr("Pulling the last 40 CI runs.")
			},
			{
				afterMs: 1500,
				data: $("Bash", { command: "gh run list --limit 40" })
			},
			{
				afterMs: 2300,
				data: hr("Two suites flap: session-epoch and the canary rollup. Both look time-dependent.")
			},
			{
				afterMs: 1900,
				data: $("Read", { file: "src/lib/__tests__/session-epoch.test.ts" })
			},
			{
				afterMs: 2600,
				data: {
					type: "result",
					subtype: "success",
					num_turns: 5,
					duration_ms: 11200,
					total_cost_usd: .0298,
					result: "Both flakes are clock-boundary, not ordering. Want me to pin the clock in the fixtures?"
				}
			},
			{
				afterMs: 300,
				data: { type: "devbox_end" }
			},
			{
				afterMs: 200,
				data: {
					type: "job_finished",
					ok: !0
				}
			}
		]
	},
	{
		id: "schema-drift-check",
		label: "schema-drift-check",
		frames: [
			{
				afterMs: 400,
				data: {
					type: "job_started",
					title: "schema-drift-check",
					kind: "devbox:task"
				}
			},
			{
				afterMs: 200,
				data: {
					type: "task_started",
					prompt: "Compare the deployed schema against schema/*.sql and report drift."
				}
			},
			{
				afterMs: 900,
				data: hr("Dumping the live schema.")
			},
			{
				afterMs: 1600,
				data: $("Bash", { command: "psql -c \"\\d+ public.*\"" })
			},
			{
				afterMs: 2400,
				data: hr("One table differs: environments has a column the checked-in DDL does not.")
			},
			{
				afterMs: 2e3,
				data: {
					type: "devbox_error",
					error: "connection reset while reading pg_catalog — the cluster scaled down mid-query"
				}
			},
			{
				afterMs: 200,
				data: {
					type: "job_finished",
					ok: !1
				}
			}
		]
	}
], _r = (...e) => $("TodoWrite", { todos: e.map(([e, t, n]) => ({
	content: e,
	status: t,
	...n ? { activeForm: n } : {}
})) }), vr = [
	{
		id: "lab-demo-delivery",
		label: "lab-demo-delivery",
		frames: [
			{
				afterMs: 400,
				data: {
					type: "job_started",
					title: "Add rate limiting to the login route",
					kind: "devbox:task"
				}
			},
			{
				afterMs: 200,
				data: {
					type: "task_started",
					prompt: "Add rate limiting to POST /login and open a PR."
				}
			},
			{
				afterMs: 700,
				data: _r([
					"Read the login route",
					"in_progress",
					"Reading the login route"
				], ["Add a limiter middleware", "pending"], ["Write tests", "pending"], ["Open a pull request", "pending"])
			},
			{
				afterMs: 900,
				data: $("Read", { file_path: "src/routes/login.ts" })
			},
			{
				afterMs: 1100,
				data: _r(["Read the login route", "completed"], [
					"Add a limiter middleware",
					"in_progress",
					"Adding the limiter middleware"
				], ["Write tests", "pending"], ["Open a pull request", "pending"])
			},
			{
				afterMs: 1300,
				data: $("Edit", { file_path: "src/routes/login.ts" })
			},
			{
				afterMs: 1200,
				data: $("Bash", { command: "npm test -- login" })
			},
			{
				afterMs: 1400,
				data: _r(["Read the login route", "completed"], ["Add a limiter middleware", "completed"], ["Write tests", "completed"], [
					"Open a pull request",
					"in_progress",
					"Opening the pull request"
				])
			},
			{
				afterMs: 900,
				data: {
					type: "delivery",
					workItemId: "wi-demo-1",
					title: "Rate-limit POST /login",
					branch: "demo/rate-limit-login",
					commitSha: "4f2c9a1e7b3d",
					prUrl: "https://example.com/demo/pull/42",
					prNumber: 42
				}
			},
			{
				afterMs: 400,
				data: {
					type: "result",
					subtype: "success",
					num_turns: 9,
					duration_ms: 14100,
					total_cost_usd: .0517,
					result: "Limiter added at 5 attempts per minute per IP; PR #42 is up."
				}
			},
			{
				afterMs: 300,
				data: { type: "devbox_end" }
			},
			{
				afterMs: 200,
				data: {
					type: "job_finished",
					ok: !0
				}
			}
		]
	},
	{
		id: "lab-demo-gate-held",
		label: "lab-demo-gate-held",
		frames: [{
			afterMs: 400,
			data: {
				type: "gate_refused",
				status: 409,
				gate: "envelope",
				confirmFlag: "confirmOverEnvelope",
				error: "This run would take the sprint envelope past its $40.00 grant ($38.20 spent).",
				workItemId: "wi-demo-2",
				workItemTitle: "Migrate session store to Redis"
			}
		}]
	},
	{
		id: "lab-demo-provisioning",
		label: "lab-demo-provisioning",
		frames: []
	}
];
function yr(e, t) {
	return `${mr}//${e}${t ? `?script=${encodeURIComponent(t)}` : ""}`;
}
function br(e) {
	let t = /script=([^&]+)/.exec(e)?.[1];
	if (t) {
		let e = [...gr, ...vr].find((e) => e.id === decodeURIComponent(t));
		if (e) return e;
	}
	let n = e.slice(10).replace(/^\/+/, "").split("?")[0] ?? "", r = 0;
	for (let e of n) r = r * 31 + e.charCodeAt(0) >>> 0;
	return gr[r % gr.length];
}
var xr = class {
	static CONNECTING = 0;
	static OPEN = 1;
	static CLOSED = 2;
	url;
	withCredentials;
	readyState = 0;
	onmessage = null;
	onerror = null;
	onopen = null;
	listeners = /* @__PURE__ */ new Map();
	timers = [];
	closed = !1;
	constructor(e, t) {
		this.url = e, this.withCredentials = !!t?.withCredentials;
		let n = br(e), r = 0;
		this.schedule(0, () => {
			this.readyState = 1;
			let e = new Event("open");
			this.onopen?.(e), this.emit("open", e);
		});
		for (let e of n.frames) r += e.afterMs, this.schedule(r, () => this.deliver(e.data));
	}
	schedule(e, t) {
		this.timers.push(setTimeout(() => {
			this.closed || t();
		}, e));
	}
	deliver(e) {
		let t = new MessageEvent("message", { data: JSON.stringify({
			...e,
			ts: (/* @__PURE__ */ new Date()).toISOString()
		}) });
		this.onmessage?.(t), this.emit("message", t);
	}
	emit(e, t) {
		for (let n of this.listeners.get(e) ?? []) try {
			n(t);
		} catch {}
	}
	addEventListener(e, t) {
		let n = this.listeners.get(e) ?? /* @__PURE__ */ new Set();
		n.add(t), this.listeners.set(e, n);
	}
	removeEventListener(e, t) {
		this.listeners.get(e)?.delete(t);
	}
	close() {
		this.closed = !0, this.readyState = 2;
		for (let e of this.timers) clearTimeout(e);
		this.timers = [];
	}
}, Sr = null;
function Cr(e = {}) {
	let t = e.scheme ?? "mock-tail:", n = globalThis.EventSource;
	if (Sr) Sr.count += 1;
	else {
		Sr = {
			native: n,
			count: 1
		};
		let e = function(e, r) {
			if (typeof e == "string" && e.startsWith(t)) return new xr(e, r);
			if (typeof n != "function") throw TypeError("EventSource is not available in this environment");
			return new n(e, r);
		};
		Object.assign(e, {
			CONNECTING: 0,
			OPEN: 1,
			CLOSED: 2
		}), globalThis.EventSource = e;
	}
	return () => {
		Sr && (--Sr.count, !(Sr.count > 0) && (Sr.native ? globalThis.EventSource = Sr.native : delete globalThis.EventSource, Sr = null));
	};
}
//#endregion
export { Ge as AGENT_PANE_KIND, Se as AGENT_STATUSES, N as ATTENTION_ORDER, Fe as AgentPane, O as COMPUTE_STATUS, yt as COMPUTE_STORAGE_KEYS, Bn as CommandOutputPane, Gn as ComputeDock, ct as ComputeProvider, kn as ComputerLab, se as DEFAULT_IDLE_WINDOW_MS, dn as DEFAULT_KEYMAP, Ne as DEFAULT_PANE_KINDS, ut as DETACH_BYTE, Ie as DOCK_STORAGE_KEY, _t as FLEET_STORAGE_KEY, Re as HEARTBEAT_MS, Ce as LAB_LAYOUT_STORAGE_KEY, $e as LOGS_PANE_KIND, Tn as LabChooser, Qt as LabFleetRail, an as LabHeader, qe as LabInstructContext, sn as LabPaneToolbar, Sn as LabRail, gt as LogsPane, B as MAX_FRAME_BYTES, Tt as MAX_RATIO, tt as MAX_RETRIES, lt as MAX_SHELLS, wt as MIN_RATIO, $n as MOCK_SHELL_SCHEME, vr as MOCK_TAIL_DEMO_SCRIPTS, mr as MOCK_TAIL_SCHEME, gr as MOCK_TAIL_SCRIPTS, zn as MachinePresenceMenu, k as PaneStatusLine, En as PaneTreeView, bn as ProjectSummary, H as SHELL_CHANNEL, ot as SHELL_PANE_KIND, D as SHELL_STATUS, V as ShellTerminal, Le as TAIL_PANE_KIND, un as TMUX_LEADER, Ee as TailPane, ae as UNASSIGNED_PROJECT_ID, Jn as WORKSPACE_ENTRY_CAP, Kn as WORKSPACE_FIND_COMMAND, qn as WORKSPACE_GIT_COMMAND, ln as WorkspacePane, zt as arrangePanes, Yn as buildWorkspaceTree, ge as byAttention, L as byteRate, de as clearComputeStorage, ue as clockTime, Ue as closeAdvice, At as closePane, Qe as closeShell, Zn as countDescendants, Ot as countPanes, ht as createComputeClient, mt as currentRun, at as cycleLayout, Ft as cyclePane, Ke as cycleShell, Kt as defaultKindFor, De as deliveryStep, we as elapsed, It as enclosingSplit, Ve as encodeFrame, je as encodeResize, ft as exhaustedAdvice, vt as exitCodeOf, oe as expiryPressure, Dt as findLeaf, Oe as fixtureComputers, Ae as fixtureMachines, F as fixtureModels, M as fixtureRuntimeStatus, z as fixtureWorkspace, Pe as focusShell, pe as formatRate, re as formatTokens, wn as fuzzyScore, me as gateStep, et as getDock, hn as groupBindings, Zt as groupQuickLine, P as hasAgent, pr as installMockShellSocket, Cr as installMockTailSource, fn as isLeaderKey, I as isLocalComputer, Gt as kindsFor, gn as labelFor, fe as latestPlan, Nt as layoutRects, X as listLeaves, Et as makeLeaf, mn as matchBinding, pn as matchLeaderBinding, bt as matchesQuery, Fn as memorySummary, or as mockShellUrl, yr as mockTailUrl, Pt as neighborPane, qt as nextKind, st as openOutputTab, R as openShell, ve as parsePlan, xe as pendingQuestion, In as providerSummary, Jt as quotaUsage, Lt as ratioOf, Ye as reconcileDock, he as reduceTailFrame, dt as reportShellStatus, Wt as resolveKind, ie as rollUpProjects, ye as runInstructionAsTasks, ze as selectShellByIndex, Be as setDockVisible, nt as setGeometry, Xe as setMode, jt as setRatio, A as shortModelName, We as showsAllPanes, kt as splitPane, j as statusOf, Je as stepLevel, ce as stepSource, He as subscribeDock, le as summarizeFleet, rt as summarizeTool, Me as toggleFloating, _e as toolStep, Mt as updateLeaf, Ze as useCompute, pt as useComputeFleet, it as useComputeOptional, ne as useComputeProjects, Te as useComputeTail, ke as useComputeTask, be as useLabInstruct, Ut as useLabLayout, E as useProjectRollups, Qn as visibleRows };
