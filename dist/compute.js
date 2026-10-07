import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-C2OEUpX-.js";
import { t as n } from "./Chip-0zFpfJ52.js";
import { B as r, K as i, L as a, O as o, R as s, U as c, Y as l, b as u, h as d, ht as f, m as p, nt as m, tt as h } from "./Icons-B_xESAH3.js";
import { n as g, t as _ } from "./DropdownMenu-BS-H0H0p.js";
import { t as v } from "./TitledFrame-B0QW93da.js";
import { t as y } from "./DotMeter-KxyExwVb.js";
import { t as b } from "./StatusDot-ClFcLvD7.js";
import { t as x } from "./SearchInput-8LpHL-oD.js";
import { t as S } from "./SectionLabel-Bn8Vvb-K.js";
import { t as C } from "./InlinePlaceholder-CbIBYc-_.js";
import { n as ee } from "./FloatingPanel-CP5vaOcJ.js";
import { a as te, i as w, n as T, r as E, t as D } from "./useComputeProjects-ZSazDRet.js";
import { a as ne, i as O, n as re, o as k, r as ie, s as A, t as ae } from "./PaneStatusLine-DcOID_Ic.js";
import { $ as oe, A as se, B as ce, C as le, Ct as ue, D as de, E as fe, F as pe, G as me, H as he, I as j, J as M, K as ge, L as _e, M as ve, N as ye, O as be, P as xe, Q as Se, R as Ce, S as we, St as N, T as P, U as F, V as Te, W as Ee, X as De, Y as Oe, Z as ke, _ as Ae, _t as je, a as Me, at as Ne, b as Pe, bt as Fe, c as Ie, ct as I, d as Le, dt as Re, et as L, f as ze, ft as Be, g as R, gt as z, h as Ve, ht as He, i as Ue, it as We, j as Ge, k as Ke, l as qe, lt as Je, m as B, mt as V, n as Ye, nt as Xe, o as Ze, ot as Qe, p as $e, pt as et, q as tt, r as nt, rt, s as it, st as at, t as ot, tt as st, u as ct, ut as lt, v as ut, vt as dt, w as ft, x as pt, xt as mt, y as ht, yt as gt, z as _t } from "./ComputeContext-DU2mjv9x.js";
import { Fragment as vt, useCallback as H, useEffect as U, useMemo as W, useRef as G, useState as K, useSyncExternalStore as yt } from "react";
import { Fragment as bt, jsx as q, jsxs as J } from "react/jsx-runtime";
//#region src/components/compute/lib/paneTree.ts
var xt = .1, St = .9;
function Ct(e, t, n) {
	return {
		kind: "leaf",
		id: e,
		computerId: t,
		kindId: n
	};
}
function Y(e) {
	return e.kind === "leaf" ? [e] : [...Y(e.a), ...Y(e.b)];
}
function wt(e, t) {
	return Y(e).find((e) => e.id === t) ?? null;
}
function Tt(e) {
	return Y(e).length;
}
function Et(e, t, n, r, i) {
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
function Dt(e, t) {
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
function Ot(e, t, n) {
	let r = Math.min(St, Math.max(xt, n)), i = (e) => e.kind === "leaf" ? e : e.id === t ? {
		...e,
		ratio: r
	} : {
		...e,
		a: i(e.a),
		b: i(e.b)
	};
	return i(e);
}
function kt(e, t, n) {
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
function At(e, t = {
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
		return [...At(e.a, {
			...t,
			width: n
		}), ...At(e.b, {
			...t,
			x: t.x + n,
			width: t.width - n
		})];
	}
	let i = t.height * r;
	return [...At(e.a, {
		...t,
		height: i
	}), ...At(e.b, {
		...t,
		y: t.y + i,
		height: t.height - i
	})];
}
function jt(e, t, n) {
	let r = At(e), i = r.find((e) => e.id === t);
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
function Mt(e, t, n) {
	let r = At(e);
	if (r.length < 2) return null;
	let i = r.findIndex((e) => e.id === t);
	return i < 0 ? r[0]?.id ?? null : r[(i + n + r.length) % r.length]?.id ?? null;
}
function Nt(e, t, n) {
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
function Pt(e, t) {
	return e.kind === "leaf" ? null : e.id === t ? e.ratio : Pt(e.a, t) ?? Pt(e.b, t);
}
function Ft(e, t, n) {
	let [r, ...i] = e;
	if (!r) throw Error("chain() needs at least one pane");
	if (i.length === 0) return r;
	let a = Math.min(St, Math.max(xt, 1 / e.length));
	return {
		kind: "split",
		id: n(),
		direction: t,
		ratio: a,
		a: r,
		b: Ft(i, t, n)
	};
}
function It(e, t, n) {
	let r = Y(e);
	if (r.length < 2) return e;
	if (t === "rows") return Ft(r, "column", n);
	if (t === "columns") return Ft(r, "row", n);
	let [i, ...a] = r;
	return {
		kind: "split",
		id: n(),
		direction: "row",
		ratio: .5,
		a: i,
		b: Ft(a, "column", n)
	};
}
//#endregion
//#region src/components/compute/hooks/useLabLayout.ts
var Lt = 0, Rt = (e) => `${e}-${(Lt += 1).toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
function zt() {
	let e = {
		windows: [],
		activeWindowId: null,
		activePaneId: null,
		zoomedPaneId: null
	};
	try {
		let t = globalThis.localStorage?.getItem(mt);
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
function Bt() {
	let [e, t] = K(zt);
	U(() => {
		try {
			globalThis.localStorage?.setItem(mt, JSON.stringify(e));
		} catch {}
	}, [e]);
	let n = W(() => e.windows.find((t) => t.id === e.activeWindowId) ?? e.windows[0] ?? null, [e.windows, e.activeWindowId]), r = W(() => n ? Y(n.root) : [], [n]), i = W(() => [...new Set(r.map((e) => e.computerId))], [r]), a = H((e, n) => {
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
	}, []), o = H((e) => {
		t((t) => ({
			...t,
			activePaneId: e
		}));
	}, []), s = H((t, n, r) => {
		let i = Ct(Rt("pane"), n, r);
		a((n) => {
			let r = e.activePaneId && wt(n, e.activePaneId) ? e.activePaneId : Y(n)[0]?.id;
			return r ? Et(n, r, t, i, Rt("split")) : n;
		}, () => ({
			activePaneId: i.id,
			zoomedPaneId: null
		}));
	}, [a, e.activePaneId]), c = H(() => {
		t((e) => {
			let t = e.windows.find((t) => t.id === e.activeWindowId) ?? e.windows[0];
			if (!t || !e.activePaneId) return e;
			if (Tt(t.root) <= 1) {
				let n = e.windows.filter((e) => e.id !== t.id), r = n[0] ?? null;
				return {
					windows: n,
					activeWindowId: r?.id ?? null,
					activePaneId: r ? Y(r.root)[0]?.id ?? null : null,
					zoomedPaneId: null
				};
			}
			let n = Dt(t.root, e.activePaneId), r = Y(n);
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
	}, []), l = H((e, t) => a((n) => kt(n, e, { computerId: t })), [a]), u = H((e, t) => a((n) => kt(n, e, { kindId: t })), [a]), d = H((e, t) => a((n) => Ot(n, e, t)), [a]), f = H((e) => {
		t((t) => {
			let n = t.windows.find((e) => e.id === t.activeWindowId) ?? t.windows[0];
			if (!n || !t.activePaneId) return t;
			let r = jt(n.root, t.activePaneId, e);
			return r ? {
				...t,
				activePaneId: r,
				zoomedPaneId: null
			} : t;
		});
	}, []), p = H((e) => {
		t((t) => {
			let n = t.windows.find((e) => e.id === t.activeWindowId) ?? t.windows[0];
			if (!n || !t.activePaneId) return t;
			let r = Mt(n.root, t.activePaneId, e);
			return r ? {
				...t,
				activePaneId: r,
				zoomedPaneId: null
			} : t;
		});
	}, []), m = H(() => {
		t((e) => ({
			...e,
			zoomedPaneId: e.zoomedPaneId ? null : e.activePaneId
		}));
	}, []), h = H((e) => a((t) => It(t, e, () => Rt("split")), () => ({ zoomedPaneId: null })), [a]), g = H((e, n) => {
		let r = Ct(Rt("pane"), e, n), i = {
			id: Rt("win"),
			root: r
		};
		t((e) => ({
			windows: [...e.windows, i],
			activeWindowId: i.id,
			activePaneId: r.id,
			zoomedPaneId: null
		}));
	}, []), _ = H((e) => {
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
				activePaneId: r ? Y(r.root)[0]?.id ?? null : null,
				zoomedPaneId: null
			};
		});
	}, []), v = H((e) => {
		t((t) => {
			let n = t.windows.find((t) => t.id === e);
			return n ? {
				...t,
				activeWindowId: e,
				activePaneId: Y(n.root)[0]?.id ?? null,
				zoomedPaneId: null
			} : t;
		});
	}, []), y = H((e) => {
		t((t) => {
			if (t.windows.length < 2) return t;
			let n = t.windows.findIndex((e) => e.id === t.activeWindowId), r = t.windows[(n + e + t.windows.length) % t.windows.length];
			return r ? {
				...t,
				activeWindowId: r.id,
				activePaneId: Y(r.root)[0]?.id ?? null,
				zoomedPaneId: null
			} : t;
		});
	}, []), b = H((e, n) => {
		e && t((t) => {
			if (t.windows.length > 0) {
				if (t.activePaneId) return t;
				let e = t.windows.find((e) => e.id === t.activeWindowId) ?? t.windows[0];
				return e ? {
					...t,
					activeWindowId: e.id,
					activePaneId: Y(e.root)[0]?.id ?? null
				} : t;
			}
			let r = Ct(Rt("pane"), e, n), i = {
				id: Rt("win"),
				root: r
			};
			return {
				windows: [i],
				activeWindowId: i.id,
				activePaneId: r.id,
				zoomedPaneId: null
			};
		});
	}, []), x = H((e) => {
		let n = new Set(e);
		t((e) => {
			let t = !1, r = [];
			for (let i of e.windows) {
				let e = i.root;
				for (let r of Y(i.root)) n.has(r.computerId) || (t = !0, e = Tt(e) <= 1 ? e : Dt(e, r.id));
				if (Tt(e) === 1 && !n.has(Y(e)[0].computerId)) {
					t = !0;
					continue;
				}
				r.push(e === i.root ? i : {
					...i,
					root: e
				});
			}
			if (!t) return e;
			let i = r.find((t) => t.id === e.activeWindowId) ?? r[0] ?? null, a = i ? Y(i.root) : [];
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
function Vt(e, t) {
	return e.find((e) => e.id === t) ?? e[0] ?? null;
}
function Ht(e, t) {
	return t ? e.filter((e) => !e.appliesTo || e.appliesTo(t)) : [...e];
}
function Ut(e, t) {
	return Ht(e, t)[0] ?? e[0] ?? null;
}
function Wt(e, t, n) {
	let r = n ? Ht(e, n) : e;
	return r.length === 0 ? null : r[(r.findIndex((e) => e.id === t) + 1) % r.length] ?? null;
}
function Gt(e, t, n) {
	return t.filter((t) => Vt(e, t)?.quota === n).length;
}
//#endregion
//#region src/components/compute/components/LabFleetRail.tsx
var Kt = {
	provisioning: "text-info",
	waiting: "text-warning",
	running: "text-primary",
	error: "text-danger",
	idle: "text-success",
	stopped: "text-text-tertiary"
};
function qt(e, t) {
	return t || !Number.isInteger(e) ? `$${e.toFixed(2)}` : `$${e.toFixed(0)}`;
}
function Jt(e, t) {
	let n = [`${t} ${t === 1 ? "computer" : "computers"}`], r = e.spentUsd ?? e.liveSpendUsd;
	return typeof e.budgetUsd == "number" && e.budgetUsd > 0 ? n.push(`${qt(r, !0)} / ${qt(e.budgetUsd, !1)}`) : r > 0 && n.push(qt(r, !0)), e.botCount && n.push(`${e.botCount} ${e.botCount === 1 ? "bot" : "bots"}`), n.join(" · ");
}
function Yt({ computers: t, activeComputerId: n, openComputerIds: r, selectedIds: i, onSelect: a, onOpenInPane: s, statusFilter: c = null, onStatusFilterChange: d, tab: f, onTabChange: m, onCreate: h, className: g }) {
	let [v, y] = K("computers"), b = f ?? v, S = (e) => {
		y(e), m?.(e);
	}, [C, ee] = K(""), [te, w] = K(/* @__PURE__ */ new Set()), T = W(() => new Set(r), [r]), E = nt(), ne = E?.projects ?? [], re = E?.projectsAbsent ?? !0, k = W(() => {
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
			quickLine: Jt(e, e.computers.length),
			computers: e.computers
		})), r = new Set(n.flatMap((e) => e.computers.map((e) => e.id))), i = t.filter((e) => !r.has(e.id));
		if (i.length > 0) {
			let e = ne.find((e) => e.id === D);
			n.push({
				id: D,
				name: "Unassigned",
				quickLine: Jt({
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
	]), ie = W(() => {
		let e = /* @__PURE__ */ new Map(), t = 0;
		for (let n of k) for (let r of n.computers) e.set(r.id, t += 1);
		return e;
	}, [k]), ae = H((e) => _t(e, C) && (!c || A(e) === c), [C, c]), oe = W(() => t.filter(_e).sort(j), [t]), se = [{
		label: "Show",
		items: [{
			label: "Every status",
			checked: !c,
			onSelect: () => d?.(null)
		}, ...[
			"waiting",
			"running",
			"provisioning",
			"error",
			"idle",
			"stopped"
		].map((e) => ({
			label: O[e].label,
			checked: c === e,
			onSelect: () => d?.(c === e ? null : e)
		}))]
	}], ce = t.length === 0, le = /* @__PURE__ */ J("div", {
		"data-testid": "lab-fleet-empty",
		className: "px-3 py-4 flex flex-col items-start gap-2",
		children: [
			/* @__PURE__ */ q("div", {
				className: "text-[13px] font-semibold text-text-primary",
				children: "No computers in the lab"
			}),
			/* @__PURE__ */ q("div", {
				className: "text-[12px] text-text-secondary",
				children: h ? "Start a computer and it opens here in a pane." : "Nothing in the fleet is shared with you yet."
			}),
			h && /* @__PURE__ */ q("button", {
				type: "button",
				onClick: h,
				"data-testid": "lab-fleet-empty-create",
				className: "text-[12px] font-semibold rounded-md px-3 py-1 cursor-pointer border border-primary text-primary bg-transparent hover:bg-surface-hover",
				children: "+ New computer"
			})
		]
	});
	return /* @__PURE__ */ J("div", {
		"data-testid": "lab-fleet-rail",
		className: e("flex flex-col h-full min-h-0 border-r border-border bg-surface", g),
		children: [
			/* @__PURE__ */ J("div", {
				role: "tablist",
				"aria-label": "Fleet",
				className: "flex shrink-0 border-b border-border",
				children: [/* @__PURE__ */ q(Xt, {
					selected: b === "computers",
					onSelect: () => S("computers"),
					icon: /* @__PURE__ */ q(u, { size: 14 }),
					label: "Computers",
					count: t.length
				}), /* @__PURE__ */ q(Xt, {
					selected: b === "agents",
					onSelect: () => S("agents"),
					icon: /* @__PURE__ */ q(l, { size: 14 }),
					label: "Agents",
					count: oe.length
				})]
			}),
			/* @__PURE__ */ J("div", {
				className: "flex items-center gap-1.5 px-2 py-2 shrink-0",
				children: [/* @__PURE__ */ q(x, {
					value: C,
					onChange: ee,
					onClear: () => ee(""),
					placeholder: "Find computer or agent…",
					className: "flex-1 min-w-0"
				}), d && /* @__PURE__ */ q(_, {
					trigger: /* @__PURE__ */ q(o, { size: 14 }),
					triggerLabel: "Filter by status",
					triggerTitle: c ? `Showing ${O[c].label}` : "Filter by status",
					triggerClassName: e(c && "text-primary border-primary"),
					align: "end",
					sections: se,
					"data-testid": "lab-fleet-filter"
				})]
			}),
			b === "computers" ? /* @__PURE__ */ q(Zt, {
				label: "computers",
				emptyState: ce ? le : void 0,
				children: k.map((t) => {
					let r = t.computers.filter(ae);
					if (r.length === 0) return null;
					let o = te.has(t.id) && !C;
					return /* @__PURE__ */ J("div", {
						role: "presentation",
						children: [t.name && /* @__PURE__ */ J("button", {
							type: "button",
							tabIndex: -1,
							"aria-expanded": !o,
							onClick: () => w((e) => {
								let n = new Set(e);
								return n.has(t.id) ? n.delete(t.id) : n.add(t.id), n;
							}),
							"data-testid": "lab-fleet-group",
							className: "w-full flex items-start gap-1.5 px-2 pt-2.5 pb-1 text-left bg-transparent border-none cursor-pointer hover:bg-surface-hover",
							children: [/* @__PURE__ */ q(p, {
								size: 12,
								className: e("mt-0.5 shrink-0 text-text-tertiary transition-transform", o && "-rotate-90")
							}), /* @__PURE__ */ J("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ q("span", {
									className: "block text-[12px] font-semibold text-text-primary truncate",
									children: t.name
								}), /* @__PURE__ */ q("span", {
									className: "block text-[11px] text-text-tertiary truncate tabular-nums",
									children: t.quickLine
								})]
							})]
						}), !o && r.map((e) => /* @__PURE__ */ q(Qt, {
							computer: e,
							number: ie.get(e.id) ?? 0,
							active: e.id === n,
							selected: i?.has(e.id) ?? !1,
							open: T.has(e.id),
							onSelect: a,
							onOpenInPane: s
						}, e.id))]
					}, t.id);
				})
			}) : /* @__PURE__ */ q(Zt, {
				label: "agents",
				children: oe.filter(ae).map((e) => /* @__PURE__ */ q(Qt, {
					computer: e,
					number: ie.get(e.id) ?? 0,
					active: e.id === n,
					selected: i?.has(e.id) ?? !1,
					open: T.has(e.id),
					onSelect: a,
					onOpenInPane: s,
					showTask: !0
				}, e.id))
			})
		]
	});
}
function Xt({ selected: t, onSelect: n, icon: r, label: i, count: a }) {
	return /* @__PURE__ */ J("button", {
		type: "button",
		role: "tab",
		"aria-selected": t,
		onClick: n,
		className: e("flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-2 text-[12px] bg-transparent border-0 border-b-2 cursor-pointer transition-colors", t ? "border-primary text-text-primary font-semibold" : "border-transparent text-text-secondary hover:text-text-primary"),
		children: [
			r,
			i,
			/* @__PURE__ */ q("span", {
				className: "text-[11px] font-normal text-text-tertiary tabular-nums",
				children: a
			})
		]
	});
}
function Zt({ label: e, children: t, emptyState: n }) {
	let r = G(null), i = H((e) => {
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
	return /* @__PURE__ */ q("div", {
		ref: r,
		role: "listbox",
		"aria-label": e,
		onKeyDown: i,
		className: "flex-1 min-h-0 overflow-y-auto pb-2",
		children: a ? n ?? /* @__PURE__ */ q("div", {
			className: "px-3 py-2 text-[12px] text-text-tertiary",
			children: "Nothing matches."
		}) : t
	});
}
function Qt({ computer: t, number: n, active: r, selected: i, open: a, onSelect: o, onOpenInPane: c, showTask: l = !1 }) {
	let u = A(t), d = O[u], f = Ce(t);
	return /* @__PURE__ */ J("div", {
		role: "presentation",
		className: e("group relative flex items-stretch", r ? "bg-primary-bg" : i ? "bg-surface-hover" : "hover:bg-surface-hover"),
		children: [/* @__PURE__ */ J("button", {
			"data-rail-row": !0,
			type: "button",
			role: "option",
			"aria-selected": r,
			tabIndex: r ? 0 : -1,
			"data-selected": i || void 0,
			title: `${t.label} — ${d.label}${t.currentTask ? ` · ${t.currentTask}` : ""}`,
			onClick: (e) => o(t, { toggle: e.metaKey || e.ctrlKey }),
			onAuxClick: (e) => {
				e.button === 1 && c && (e.preventDefault(), c(t));
			},
			onKeyDown: (e) => {
				e.key === "Enter" && (e.metaKey || e.ctrlKey) && c && (e.preventDefault(), c(t));
			},
			className: e("min-w-0 flex-1 text-left flex items-start gap-2 pl-2 pr-1 py-1.5 border-l-2 cursor-pointer bg-transparent border-y-0 border-r-0", "focus:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-inset", r ? "border-primary" : i ? "border-border-emphasis" : "border-transparent"),
			children: [
				/* @__PURE__ */ q("span", {
					className: "w-5 shrink-0 text-right text-[11px] text-text-tertiary tabular-nums leading-5",
					children: n
				}),
				/* @__PURE__ */ q("span", {
					className: "w-3.5 shrink-0 flex justify-center leading-5 pt-[5px]",
					children: f ? /* @__PURE__ */ q(s, {
						size: 14,
						"aria-label": `laptop · ${d.label}`,
						className: e("-mt-[2px]", Kt[u])
					}) : /* @__PURE__ */ q(b, {
						size: "xs",
						color: d.color,
						pulse: d.pulse,
						"aria-label": d.label
					})
				}),
				/* @__PURE__ */ J("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ q("span", {
						className: e("block text-[12.5px] leading-5 truncate font-mono", r ? "text-text-primary font-semibold" : "text-text-secondary"),
						children: t.label
					}), l && /* @__PURE__ */ J("span", {
						className: "block text-[11px] text-text-tertiary truncate",
						children: [/* @__PURE__ */ q("span", {
							className: e("font-semibold", Kt[u]),
							children: d.label
						}), t.currentTask ? ` · ${t.currentTask}` : ""]
					})]
				}),
				i && /* @__PURE__ */ q("span", {
					"aria-label": "selected as a target",
					className: "text-[11px] text-primary leading-5",
					children: "✓"
				}),
				a && /* @__PURE__ */ q("span", {
					"aria-label": "open in a pane",
					title: "Open in a pane",
					className: "text-[9px] text-primary leading-5",
					children: "▣"
				})
			]
		}), c && /* @__PURE__ */ q("button", {
			type: "button",
			tabIndex: -1,
			onClick: () => c(t),
			"aria-label": `Open ${t.label} in a new pane`,
			title: "Open in a new pane",
			className: e("px-2 shrink-0 bg-transparent border-none cursor-pointer text-text-tertiary hover:text-primary", r ? "opacity-100" : "opacity-0 group-hover:opacity-100 focus-visible:opacity-100"),
			children: /* @__PURE__ */ q(m, { size: 13 })
		})]
	});
}
//#endregion
//#region src/components/compute/components/LabWorkspaceChrome.tsx
var $t = [
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
], en = {
	waiting: "needsYou",
	running: "running",
	provisioning: "provisioning",
	error: "error"
};
function tn({ title: r, summary: i, statusFilter: o, onStatusFilter: s, canCreate: c, onCreate: l, onKeys: u, keysOpen: d, keysChord: f, actions: p, leaderLabel: m }) {
	return /* @__PURE__ */ J("div", {
		"data-testid": "lab-header",
		className: "flex flex-wrap items-center gap-x-3 gap-y-1.5 px-3 py-2 shrink-0 border-b border-border bg-surface",
		children: [
			/* @__PURE__ */ J("div", {
				className: "flex items-baseline gap-2 min-w-0",
				children: [r !== null && /* @__PURE__ */ q("span", {
					className: "text-[14px] font-semibold text-text-primary truncate",
					children: r
				}), /* @__PURE__ */ J("span", {
					"data-testid": "lab-summary",
					className: "text-[12px] text-text-tertiary tabular-nums whitespace-nowrap",
					children: [
						r !== null && /* @__PURE__ */ q("span", {
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
			/* @__PURE__ */ q("span", { className: "flex-1" }),
			/* @__PURE__ */ q("div", {
				role: "group",
				"aria-label": "Fleet status",
				className: "flex items-center gap-1.5",
				children: $t.map(({ status: t, word: r, tone: a, hint: c, onlyWhenPresent: l }) => {
					let u = i[en[t]] ?? 0, d = o === t;
					return l && u === 0 && !d ? null : /* @__PURE__ */ q("button", {
						type: "button",
						"aria-pressed": d,
						onClick: () => s(d ? null : t),
						title: d ? "Show every computer" : c,
						"data-testid": `lab-pill-${t}`,
						className: e("rounded-full p-0 bg-transparent border-none cursor-pointer", "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary", u === 0 && !d && "opacity-60"),
						children: /* @__PURE__ */ J(n, {
							size: "sm",
							tone: a,
							dot: "static",
							outline: d ? void 0 : "soft",
							solid: d,
							className: "tabular-nums",
							children: [
								u,
								" ",
								r(u)
							]
						})
					}, t);
				})
			}),
			m && /* @__PURE__ */ q("span", {
				"data-testid": "leader-armed",
				className: "animate-pulse",
				children: /* @__PURE__ */ J(n, {
					size: "sm",
					tone: "caution",
					children: [m, " …"]
				})
			}),
			c && /* @__PURE__ */ J(t, {
				size: "sm",
				variant: "primary",
				onClick: l,
				"data-testid": "lab-create",
				children: [/* @__PURE__ */ q(h, { size: 14 }), " Computer"]
			}),
			/* @__PURE__ */ J(t, {
				size: "sm",
				variant: "secondary",
				onClick: u,
				"aria-pressed": d,
				title: `Keyboard shortcuts${f ? ` · ${f}` : ""}`,
				"data-testid": "lab-keys",
				children: [/* @__PURE__ */ q(a, { size: 14 }), " Keys"]
			}),
			p
		]
	});
}
function nn({ label: t, onClick: n, pressed: r, disabled: i, children: a, testId: o }) {
	return /* @__PURE__ */ q("button", {
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
function rn({ panes: t, onFocusPane: n, onAddPane: a, canAddPane: o, shellsOpen: s, maxShells: l, onArrange: u, zoomed: d, onToggleZoom: p, moreSections: m }) {
	return /* @__PURE__ */ J("div", {
		"data-testid": "lab-pane-toolbar",
		className: "flex items-center gap-1.5 px-2 py-1.5 shrink-0",
		children: [
			/* @__PURE__ */ q(_, {
				trigger: /* @__PURE__ */ J("span", {
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
			/* @__PURE__ */ q(nn, {
				label: "Add a pane",
				onClick: a,
				disabled: !o,
				testId: "lab-add-pane",
				children: /* @__PURE__ */ q(h, { size: 14 })
			}),
			/* @__PURE__ */ q("span", { className: "flex-1" }),
			/* @__PURE__ */ J("span", {
				"data-testid": "lab-shell-count",
				title: "Open terminals hold a real shell against the runtime's limit",
				className: e("text-[12px] tabular-nums", s >= l ? "text-warning" : "text-text-tertiary"),
				children: [
					s,
					" / ",
					l,
					" shells"
				]
			}),
			/* @__PURE__ */ q(nn, {
				label: "Arrange as a list",
				onClick: () => u("rows"),
				testId: "lab-arrange-rows",
				children: /* @__PURE__ */ q(r, { size: 14 })
			}),
			/* @__PURE__ */ q(nn, {
				label: "Arrange as a split",
				onClick: () => u("main"),
				testId: "lab-arrange-main",
				children: /* @__PURE__ */ q(f, { size: 14 })
			}),
			/* @__PURE__ */ q(nn, {
				label: d ? "Restore panes" : "Expand the focused pane",
				onClick: p,
				pressed: d,
				testId: "lab-zoom",
				children: /* @__PURE__ */ q(c, { size: 14 })
			}),
			/* @__PURE__ */ q(_, {
				trigger: /* @__PURE__ */ q(i, { size: 14 }),
				triggerLabel: "More lab commands",
				align: "end",
				sections: m,
				"data-testid": "lab-more-menu"
			})
		]
	});
}
var an = {
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
function on({ computer: t, kind: r, kinds: a, onSwitchKind: o, active: s, zoomed: l, broadcasting: u, models: f, onFocus: p, onClose: m, onToggleZoom: h, moreSections: g, children: v }) {
	let y = A(t), x = O[y], S = an[y];
	return /* @__PURE__ */ J("section", {
		"aria-label": `${r.title ?? r.label} · ${t.label}`,
		"data-testid": "lab-pane",
		"data-active": s || void 0,
		onMouseDown: p,
		onFocusCapture: p,
		className: e("@container flex flex-col flex-1 min-w-0 min-h-0 h-full rounded-lg border overflow-hidden bg-surface", s ? "border-primary" : "border-border"),
		children: [/* @__PURE__ */ J("header", {
			className: "shrink-0 flex flex-col gap-0.5 px-2.5 py-1.5 border-b border-border",
			children: [/* @__PURE__ */ J("div", {
				className: "flex items-center gap-1.5 min-w-0",
				children: [
					/* @__PURE__ */ q(_, {
						trigger: /* @__PURE__ */ J("span", {
							className: "inline-flex items-center gap-1 text-[12px] font-semibold text-text-primary whitespace-nowrap",
							children: [
								r.icon,
								/* @__PURE__ */ q("span", {
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
							items: a.map((e) => ({
								label: e.title ?? e.label,
								icon: e.icon,
								description: e.description,
								active: e.id === r.id,
								onSelect: () => o(e)
							}))
						}]
					}),
					/* @__PURE__ */ q("span", {
						"aria-hidden": "true",
						className: "text-text-tertiary",
						children: "·"
					}),
					/* @__PURE__ */ q(b, {
						size: "xs",
						color: x.color,
						pulse: x.pulse,
						"aria-label": x.label
					}),
					/* @__PURE__ */ q("span", {
						className: "min-w-[3rem] text-[12px] font-mono text-text-primary truncate",
						title: t.project ?? t.label,
						children: t.label
					}),
					/* @__PURE__ */ q("span", {
						className: "hidden @[20rem]:inline-flex shrink-0",
						"data-testid": "lab-pane-status",
						children: /* @__PURE__ */ q(n, {
							size: "xs",
							tone: S.tone,
							outline: "soft",
							children: S.label
						})
					}),
					l && /* @__PURE__ */ q("span", {
						className: "text-[11px] text-text-tertiary",
						children: "expanded"
					}),
					/* @__PURE__ */ q("span", { className: "flex-1" }),
					/* @__PURE__ */ q("button", {
						type: "button",
						onClick: h,
						"aria-label": l ? `Restore ${t.label}` : `Expand ${t.label}`,
						title: l ? "Restore" : "Expand",
						className: "hidden @[16rem]:inline-flex p-1 rounded bg-transparent border-none cursor-pointer text-text-tertiary hover:text-text-primary hover:bg-surface-hover",
						children: /* @__PURE__ */ q(c, { size: 13 })
					}),
					/* @__PURE__ */ q(_, {
						trigger: /* @__PURE__ */ q(i, { size: 13 }),
						triggerLabel: `More for ${t.label}`,
						triggerVariant: "link",
						align: "end",
						sections: g
					}),
					/* @__PURE__ */ q("button", {
						type: "button",
						onClick: m,
						"aria-label": `Close pane ${t.label}`,
						title: "Close pane",
						className: "p-1 rounded bg-transparent border-none cursor-pointer text-text-tertiary hover:text-danger hover:bg-surface-hover",
						children: /* @__PURE__ */ q(d, { size: 13 })
					})
				]
			}), /* @__PURE__ */ q(re, {
				variant: "meta",
				computer: t,
				models: f,
				broadcasting: u,
				mode: r.statusMode ?? r.label,
				"data-testid": "lab-pane-meta"
			})]
		}), /* @__PURE__ */ q("div", {
			className: "flex-1 min-h-0 flex flex-col",
			children: v
		})]
	});
}
//#endregion
//#region src/components/compute/lib/keymap.ts
var sn = {
	key: "b",
	ctrl: !0,
	label: "⌃B"
}, cn = [
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
function ln(e, t) {
	return !e || e.key.toLowerCase() !== t.key.toLowerCase() ? !1 : !!e.ctrl === t.ctrlKey && !!e.meta === t.metaKey && !!e.alt === t.altKey;
}
function un(e, t) {
	let n = t.key.toLowerCase();
	return e.find((e) => e.leaderKey && e.leaderKey.toLowerCase() === n)?.command ?? null;
}
function dn(e, t) {
	let n = t.metaKey || t.ctrlKey;
	for (let r of e) if (r.key.toLowerCase() === t.key.toLowerCase() && !!(r.meta || r.ctrl) === n && !!r.shift === t.shiftKey && !!r.alt === t.altKey) return r.command;
	return null;
}
function fn(e) {
	return [
		"panes",
		"navigate",
		"lab"
	].map((t) => ({
		group: t,
		bindings: e.filter((e) => e.group === t)
	})).filter((e) => e.bindings.length > 0);
}
function pn(e, t) {
	return e.find((e) => e.command === t)?.label ?? null;
}
//#endregion
//#region src/components/compute/lib/chromeTokens.ts
var mn = {
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
function hn(e) {
	return e === "app" ? mn : void 0;
}
//#endregion
//#region src/components/compute/components/ProjectSummary.tsx
function gn(e) {
	let t = Math.max(0, Math.round(e / 6e4));
	return t < 60 ? `${t}m` : `${Math.floor(t / 60)}h ${String(t % 60).padStart(2, "0")}m`;
}
function _n({ project: t, showMeter: r = !0, className: i, "data-testid": a }) {
	let { budgetUsd: o, spentUsd: s, maintenanceUsd: c, tokensUsed: l, tokenBudget: u } = t, d = typeof o == "number" && o > 0, f = s ?? t.liveSpendUsd, p = d ? f / o : 0, m = d && c ? c / o : null, h = t.computers.length, g = t.id === D;
	return /* @__PURE__ */ J("div", {
		"data-testid": a,
		className: e("flex flex-col gap-1 font-mono min-w-0", i),
		children: [
			/* @__PURE__ */ J("div", {
				className: "flex items-center gap-2 text-[10px] leading-none min-w-0 flex-wrap",
				children: [
					d ? /* @__PURE__ */ J("span", {
						className: "text-code-subtle tabular-nums shrink-0",
						children: [
							"$",
							f.toFixed(2),
							/* @__PURE__ */ J("span", {
								className: "text-code-muted",
								children: [" / $", o.toFixed(0)]
							})
						]
					}) : /* @__PURE__ */ q("span", {
						className: "text-code-subtle tabular-nums shrink-0",
						children: f > 0 ? `$${f.toFixed(2)}` : "$—"
					}),
					l != null && /* @__PURE__ */ J(bt, { children: [/* @__PURE__ */ q("span", {
						"aria-hidden": "true",
						className: "text-code-raised",
						children: "│"
					}), /* @__PURE__ */ J("span", {
						className: "text-code-muted tabular-nums shrink-0",
						title: u ? `${l} of ${u} tokens` : `${l} tokens`,
						children: [
							T(l),
							u ? /* @__PURE__ */ J("span", {
								className: "text-code-raised",
								children: ["/", T(u)]
							}) : null,
							" tok"
						]
					})] }),
					/* @__PURE__ */ q("span", { className: "flex-1 min-w-0" }),
					t.botCount != null && t.botCount > 0 && /* @__PURE__ */ J(n, {
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
					h > 0 && /* @__PURE__ */ J(n, {
						size: "xs",
						mono: !0,
						tone: t.activeCount > 0 ? "info" : "neutral",
						...t.activeCount > 0 ? { dot: "pulse" } : {},
						title: t.activeCount > 0 ? `${t.activeCount} of ${h} doing something right now` : `${h} idle`,
						children: [t.activeCount > 0 ? `${t.activeCount}/${h}` : h, " ▣"]
					}),
					t.soonestExpiryMs != null && /* @__PURE__ */ J(n, {
						size: "xs",
						mono: !0,
						tone: t.soonestExpiryMs < 3e5 ? "warning" : "neutral",
						title: "Time until the first of these computers stops on its own",
						children: ["⟳ ", gn(t.soonestExpiryMs)]
					})
				]
			}),
			r && d && /* @__PURE__ */ q(y, {
				label: "budget",
				value: p,
				note: m == null ? t.periodResetsAt ? `⟳ ${new Date(t.periodResetsAt).toLocaleDateString()}` : void 0 : `${Math.round(m * 100)}% is upkeep`,
				tone: "code"
			}),
			g && /* @__PURE__ */ q("span", {
				className: "text-[10px] text-code-raised",
				children: "not charged to any project"
			})
		]
	});
}
//#endregion
//#region src/components/compute/components/LabRail.tsx
var vn = {
	waiting: 0,
	error: 1,
	running: 2,
	idle: 3,
	stopped: 4
};
function yn({ computers: t, activeComputerId: r, openComputerIds: i, onSelect: a, onOpenInPane: o, onWatch: s, onCreate: c, onOpenMenu: l, showAllActivity: u, onToggleShowAll: d, canManage: f = !1, models: p = [], className: m }) {
	let h = new Set(i), g = t.filter((e) => {
		let t = A(e);
		return t === "running" || t === "waiting" || t === "error" || t === "provisioning";
	}), _ = [...u ? t : g].sort((e, t) => (vn[A(e)] ?? 9) - (vn[A(t)] ?? 9)), v = nt(), y = v?.projects ?? [], b = v?.projectsAbsent ?? !0, x = y.filter((e) => e.id !== "__unassigned__" && e.computers.length > 0), S = y.find((e) => e.id === D), C = !b && x.length > 0 ? [...x.map((e) => ({
		id: e.id,
		computers: e.computers,
		heading: /* @__PURE__ */ J("div", {
			role: "presentation",
			className: "px-3 pt-2 pb-1 border-t border-code-border first:border-t-0 first:pt-1",
			children: [/* @__PURE__ */ q("span", {
				className: "block text-[11px] font-mono text-code-subtle truncate",
				children: e.name
			}), /* @__PURE__ */ q(_n, {
				project: e,
				showMeter: !1,
				className: "mt-0.5"
			})]
		})
	})), ...S && S.computers.length > 0 ? [{
		id: D,
		computers: S.computers,
		heading: /* @__PURE__ */ q("div", {
			role: "presentation",
			className: "px-3 pt-2 pb-1 text-[10px] font-mono text-code-raised lowercase tracking-wide border-t border-code-border",
			children: "unassigned"
		})
	}] : []] : null;
	return /* @__PURE__ */ J("div", {
		className: e("flex flex-col h-full min-h-0 bg-code-panel border-r border-code-border", m),
		children: [
			/* @__PURE__ */ q(bn, {
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
			/* @__PURE__ */ J("div", {
				className: "flex items-center px-3 py-1.5 border-y border-code-border shrink-0",
				children: [
					f && c ? /* @__PURE__ */ q("button", {
						type: "button",
						onClick: c,
						className: "text-[11px] font-mono text-code-green bg-transparent border-none cursor-pointer p-0 hover:underline",
						children: "new"
					}) : /* @__PURE__ */ q("span", {
						className: "text-[11px] font-mono text-code-raised",
						children: "new"
					}),
					/* @__PURE__ */ q("span", { className: "flex-1" }),
					/* @__PURE__ */ q("button", {
						type: "button",
						onClick: l,
						"aria-label": "Keyboard shortcuts",
						title: "Keyboard shortcuts",
						className: "text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer p-0 hover:text-code-text",
						children: "keys"
					})
				]
			}),
			/* @__PURE__ */ q(bn, {
				title: "agents",
				count: g.length,
				rows: _,
				activeId: r,
				onSelect: a,
				onOpenInPane: o ?? null,
				open: h,
				action: /* @__PURE__ */ q("button", {
					type: "button",
					onClick: d,
					"aria-pressed": u,
					title: u ? "Show only boxes doing something" : "Show every box",
					className: e("text-[11px] font-mono bg-transparent border-none cursor-pointer p-0", u ? "text-code-blue" : "text-code-muted hover:text-code-text"),
					children: "all"
				}),
				onWatch: s ?? null,
				renderSub: (e) => {
					let t = A(e), r = e.lastResult ? ie(null, p) : null;
					return /* @__PURE__ */ J("span", {
						className: "flex items-center gap-1 truncate",
						children: [
							/* @__PURE__ */ q(n, {
								size: "xs",
								mono: !0,
								tone: O[t].tone,
								className: "bg-transparent px-0",
								children: O[t].label
							}),
							e.currentTask && /* @__PURE__ */ J(bt, { children: [/* @__PURE__ */ q("span", {
								"aria-hidden": "true",
								className: "text-code-raised",
								children: "·"
							}), /* @__PURE__ */ q("span", {
								className: "truncate text-code-comment",
								children: e.currentTask
							})] }),
							!e.currentTask && r && /* @__PURE__ */ J(bt, { children: [/* @__PURE__ */ q("span", {
								"aria-hidden": "true",
								className: "text-code-raised",
								children: "·"
							}), /* @__PURE__ */ q("span", {
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
function bn({ title: t, count: n, rows: r, activeId: i, open: a, onSelect: o, onOpenInPane: s, action: c, renderSub: l, onWatch: u = null, groups: d = null }) {
	let f = G(null), p = H((e) => {
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
	return /* @__PURE__ */ J("div", {
		className: "flex flex-col min-h-0 flex-1",
		children: [/* @__PURE__ */ J("div", {
			className: "flex items-center gap-2 px-3 py-2 shrink-0",
			children: [
				/* @__PURE__ */ q("span", {
					className: "text-[11px] font-mono text-code-subtle lowercase tracking-wide",
					children: t
				}),
				/* @__PURE__ */ q("span", {
					className: "text-[10px] font-mono text-code-raised tabular-nums",
					children: n
				}),
				/* @__PURE__ */ q("span", { className: "flex-1" }),
				c
			]
		}), r.length === 0 ? /* @__PURE__ */ q("div", {
			className: "px-3 pb-3 text-[11px] font-mono text-code-raised",
			children: "nothing here"
		}) : /* @__PURE__ */ q("div", {
			ref: f,
			role: "listbox",
			"aria-label": t,
			onKeyDown: p,
			className: "flex-1 min-h-0 overflow-y-auto pb-1",
			children: d ? d.map((e) => /* @__PURE__ */ J("div", {
				role: "presentation",
				children: [e.heading, e.computers.map(m)]
			}, e.id)) : r.map(m)
		})]
	});
	function m(t) {
		let n = A(t), r = O[n], c = t.id === i;
		return /* @__PURE__ */ J("div", {
			role: "presentation",
			className: e("group relative flex items-stretch", c ? "bg-code-surface" : "hover:bg-code-surface/60"),
			children: [/* @__PURE__ */ J("button", {
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
					/* @__PURE__ */ q(b, {
						size: "xs",
						color: r.color,
						pulse: r.pulse,
						className: "mt-[5px]",
						"aria-label": r.label
					}),
					/* @__PURE__ */ J("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ q("span", {
							className: e("block text-[12px] font-mono truncate", c ? "text-code-text" : "text-code-subtle"),
							children: t.label
						}), l && /* @__PURE__ */ q("span", {
							className: "block text-[10px] font-mono truncate",
							children: l(t)
						})]
					}),
					a.has(t.id) && /* @__PURE__ */ q("span", {
						"aria-label": "open in a pane",
						title: "Open in a pane",
						className: "mt-[3px] text-[9px] font-mono text-code-blue shrink-0",
						children: "▣"
					})
				]
			}), u && /* @__PURE__ */ q("button", {
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
function xn(e, t) {
	if (!t) return 0;
	let n = e.toLowerCase(), r = t.toLowerCase(), i = 0, a = 0, o = -1;
	for (let e of r) {
		let t = n.indexOf(e, i);
		if (t < 0) return null;
		a += o >= 0 ? t - o - 1 : t, o = t, i = t + 1;
	}
	return a;
}
function Sn({ open: t, onClose: r, computers: i, panes: a, onJumpToPane: o, onRetarget: s, onOpenInSplit: c, projects: l = [], onSelectProject: u, chrome: d = "code" }) {
	let [f, p] = K(""), [m, h] = K(0), g = G(null), _ = G(null), v = W(() => new Map(i.map((e) => [e.id, e])), [i]), y = W(() => {
		let e = [];
		for (let t of a) {
			let n = v.get(t.computerId);
			if (!n) continue;
			let r = xn(`${n.label} ${t.kindId}`, f);
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
			let r = xn(`${e.label} ${e.sessionId}`, f);
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
			let t = xn(e.name, f);
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
	if (U(() => {
		if (t) {
			p(""), h(0);
			let e = setTimeout(() => g.current?.focus(), 0);
			return () => clearTimeout(e);
		}
	}, [t]), U(() => {
		h((e) => Math.min(e, Math.max(0, y.length - 1)));
	}, [y.length]), U(() => {
		_.current?.querySelector("[data-highlighted=\"true\"]")?.scrollIntoView({ block: "nearest" });
	}, [m]), !t) return null;
	let x = (e, t) => {
		e && (e.kind === "project" ? u?.(e.project) : e.kind === "pane" ? o(e.pane.id) : t ? c(e.computer) : s(e.computer), r());
	};
	return /* @__PURE__ */ q("div", {
		className: "absolute inset-0 z-20 flex items-start justify-center pt-[12vh] bg-code-bg/70",
		onClick: r,
		children: /* @__PURE__ */ J("div", {
			style: hn(d),
			onClick: (e) => e.stopPropagation(),
			role: "dialog",
			"aria-label": "Jump to a computer, pane or project",
			className: "w-[480px] max-w-[92vw] rounded-lg border border-code-border bg-code-panel overflow-hidden font-mono shadow-2xl",
			children: [/* @__PURE__ */ J("div", {
				className: "flex items-center gap-2 px-3 py-2 border-b border-code-border",
				children: [
					/* @__PURE__ */ q("span", {
						"aria-hidden": "true",
						className: "text-code-green text-[12px]",
						children: "/"
					}),
					/* @__PURE__ */ q("input", {
						ref: g,
						value: f,
						onChange: (e) => {
							p(e.target.value), h(0);
						},
						onKeyDown: (e) => {
							e.key === "ArrowDown" || e.key === "n" && e.ctrlKey ? (e.preventDefault(), h((e) => y.length ? (e + 1) % y.length : 0)) : e.key === "ArrowUp" || e.key === "p" && e.ctrlKey ? (e.preventDefault(), h((e) => y.length ? (e - 1 + y.length) % y.length : 0)) : e.key === "Enter" ? (e.preventDefault(), x(y[m], e.shiftKey)) : e.key === "Escape" && (e.preventDefault(), r());
						},
						placeholder: "jump to a computer, pane or project…",
						"aria-label": "Filter computers, panes and projects",
						className: "flex-1 min-w-0 bg-transparent border-none outline-none text-[12px] text-code-text placeholder:text-code-raised"
					}),
					/* @__PURE__ */ q("span", {
						className: "text-[10px] text-code-raised shrink-0 hidden sm:inline",
						children: "⏎ jump · ⇧⏎ split"
					})
				]
			}), /* @__PURE__ */ q("div", {
				ref: _,
				role: "listbox",
				"aria-label": "Results",
				className: "max-h-[46vh] overflow-y-auto",
				children: y.length === 0 ? /* @__PURE__ */ J("div", {
					className: "px-3 py-4 text-[11px] text-code-raised",
					children: [
						"nothing matches “",
						f,
						"”"
					]
				}) : y.map((t, r) => {
					let i = r === m;
					if (t.kind === "project") return /* @__PURE__ */ J("div", {
						role: "option",
						"aria-selected": i,
						"data-highlighted": i,
						onMouseEnter: () => h(r),
						onClick: () => x(t, !1),
						className: e("flex flex-col gap-0.5 px-3 py-1.5 cursor-pointer border-l-2", i ? "bg-code-surface border-code-mauve" : "bg-transparent border-transparent"),
						children: [/* @__PURE__ */ J("div", {
							className: "flex items-center gap-2 min-w-0",
							children: [/* @__PURE__ */ q(n, {
								size: "xs",
								mono: !0,
								tone: "accent",
								className: "shrink-0",
								children: "project"
							}), /* @__PURE__ */ q("span", {
								className: e("text-[12px] truncate", i ? "text-code-text" : "text-code-subtle"),
								children: t.project.name
							})]
						}), /* @__PURE__ */ q(_n, {
							project: t.project,
							showMeter: !1,
							className: "pl-1"
						})]
					}, t.id);
					let a = A(t.computer), o = O[a];
					return /* @__PURE__ */ J("div", {
						role: "option",
						"aria-selected": i,
						"data-highlighted": i,
						onMouseEnter: () => h(r),
						onClick: (e) => x(t, e.shiftKey),
						className: e("flex items-center gap-2 px-3 py-1.5 cursor-pointer border-l-2", i ? "bg-code-surface border-code-blue" : "bg-transparent border-transparent"),
						children: [
							/* @__PURE__ */ q(b, {
								size: "xs",
								color: o.color,
								pulse: o.pulse,
								"aria-label": o.label
							}),
							/* @__PURE__ */ q("span", {
								className: e("text-[12px] truncate", i ? "text-code-text" : "text-code-subtle"),
								children: t.computer.label
							}),
							/* @__PURE__ */ q("span", { className: "flex-1" }),
							t.kind === "pane" ? /* @__PURE__ */ J(n, {
								size: "xs",
								mono: !0,
								tone: "info",
								className: "shrink-0",
								children: ["on screen · ", t.pane.kindId]
							}) : /* @__PURE__ */ q(n, {
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
function Cn({ node: t, activePaneId: n, zoomedPaneId: r = null, renderLeaf: i, onRatioChange: a, gutter: o = "tight", className: s }) {
	if (r) {
		let n = wn(t, r);
		if (n) return /* @__PURE__ */ q("div", {
			className: e("flex min-h-0 min-w-0", s),
			children: i(n)
		});
	}
	return /* @__PURE__ */ q("div", {
		className: e("flex min-h-0 min-w-0", s),
		children: /* @__PURE__ */ q(Tn, {
			node: t,
			activePaneId: n,
			renderLeaf: i,
			onRatioChange: a,
			gutter: o
		})
	});
}
function wn(e, t) {
	return e.kind === "leaf" ? e.id === t ? e : null : wn(e.a, t) ?? wn(e.b, t);
}
function Tn({ node: t, activePaneId: n, renderLeaf: r, onRatioChange: i, gutter: a }) {
	let o = G(null), s = H((e) => {
		if (t.kind !== "split") return;
		let n = o.current;
		if (!n) return;
		e.preventDefault();
		let r = t.direction === "row", a = (e) => {
			let a = n.getBoundingClientRect(), o = r ? a.width : a.height;
			if (o <= 0) return;
			let s = r ? e.clientX - a.left : e.clientY - a.top;
			i(t.id, Math.min(St, Math.max(xt, s / o)));
		}, s = () => {
			globalThis.removeEventListener("pointermove", a), globalThis.removeEventListener("pointerup", s), globalThis.removeEventListener("pointercancel", s);
		};
		globalThis.addEventListener("pointermove", a), globalThis.addEventListener("pointerup", s), globalThis.addEventListener("pointercancel", s);
	}, [t, i]), c = H((e) => {
		if (t.kind !== "split") return;
		let n = t.direction === "row", r = n ? "ArrowLeft" : "ArrowUp", a = n ? "ArrowRight" : "ArrowDown";
		if (e.key !== r && e.key !== a) return;
		e.preventDefault();
		let o = e.shiftKey ? .1 : .02;
		i(t.id, t.ratio + (e.key === a ? o : -o));
	}, [t, i]);
	if (t.kind === "leaf") return /* @__PURE__ */ q("div", {
		className: "flex-1 min-w-0 min-h-0 flex",
		children: r(t)
	});
	let l = t.direction === "row", u = Math.round(t.ratio * 1e3) / 10;
	return /* @__PURE__ */ J("div", {
		ref: o,
		className: e("flex flex-1 min-w-0 min-h-0", l ? "flex-row" : "flex-col"),
		children: [
			/* @__PURE__ */ q("div", {
				className: "flex min-w-0 min-h-0",
				style: {
					flexBasis: `${u}%`,
					flexGrow: 0,
					flexShrink: 0
				},
				children: /* @__PURE__ */ q(Tn, {
					node: t.a,
					activePaneId: n,
					renderLeaf: r,
					onRatioChange: i,
					gutter: a
				})
			}),
			/* @__PURE__ */ q("div", {
				role: "separator",
				"aria-orientation": l ? "vertical" : "horizontal",
				"aria-label": `Resize ${l ? "columns" : "rows"}`,
				"aria-valuenow": u,
				"aria-valuemin": xt * 100,
				"aria-valuemax": St * 100,
				tabIndex: 0,
				onPointerDown: s,
				onKeyDown: c,
				className: e("shrink-0 bg-transparent hover:bg-code-blue/40 focus-visible:bg-code-blue/60 focus:outline-none transition-colors", l ? e(a === "roomy" ? "w-2" : "w-1", "cursor-col-resize my-0.5") : e(a === "roomy" ? "h-2" : "h-1", "cursor-row-resize mx-0.5"))
			}),
			/* @__PURE__ */ q("div", {
				className: "flex flex-1 min-w-0 min-h-0",
				children: /* @__PURE__ */ q(Tn, {
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
function En({ open: t, onClose: n, focusComputerId: r = null, variant: i = "overlay", chrome: a = "app", keymap: o = cn, leader: s = null, idleWindowMs: c = ae, appearance: l = "classic", title: u = "Computer Lab", headerActions: d, onInstruct: f, className: p }) {
	let { client: m, computers: h, canManage: g, create: v, models: b, notify: x, refresh: S, paneKinds: C, projects: ee } = Ye(), te = C[0]?.id ?? "agent", w = H((e) => Ut(C, e)?.id ?? te, [C, te]), T = Bt(), E = l === "workspace", [D, ne] = K(null), [O, re] = K(() => /* @__PURE__ */ new Set()), [k, ie] = K("nudge"), [A, oe] = K("focused"), [se, le] = K(!1), [ue, de] = K(!1), [fe, pe] = K(""), [me, he] = K(!1), [j, M] = K(!1), [ge, _e] = K(!1), [ye, be] = K(!1), xe = G(/* @__PURE__ */ new Map()), Se = G(null), Ce = G(null), we = G(null), N = W(() => new Map(h.map((e) => [e.id, e])), [h]), P = T.panes.find((e) => e.id === T.activePaneId) ?? T.panes[0] ?? null, F = P ? N.get(P.computerId) ?? null : null, Te = Gt(C, T.panes.map((e) => e.kindId), "shell"), Ee = T.windows.length > 0, De = r && N.has(r) ? r : null, Oe = De ?? h[0]?.id ?? null, ke = w(Oe ? N.get(Oe) : null);
	U(() => {
		!t || Ee || !Oe || T.ensureSeeded(Oe, ke);
	}, [
		t,
		Ee,
		Oe,
		ke,
		T.ensureSeeded
	]);
	let Ae = G(null), { focusPane: je, setPaneComputer: Me, panes: Ne, activePaneId: Pe } = T;
	U(() => {
		if (!t || !De || Ae.current === De) return;
		let e = Ne.find((e) => e.computerId === De);
		if (e) je(e.id);
		else if (Pe) Me(Pe, De);
		else return;
		Ae.current = De;
	}, [
		t,
		De,
		Ne,
		Pe,
		je,
		Me
	]), U(() => {
		t || (Ae.current = null);
	}, [t]);
	let Fe = T.reconcile, Ie = W(() => h.map((e) => e.id), [h]);
	U(() => {
		!t || Ie.length === 0 || Fe(Ie);
	}, [
		t,
		Ie,
		Fe
	]);
	let I = H((e, t) => {
		let n = T.panes.find((t) => t.id === e);
		T.setPaneComputer(e, t.id);
		let r = n ? Vt(C, n.kindId) : null;
		r?.appliesTo && !r.appliesTo(t) && T.setPaneKind(e, w(t));
	}, [
		T,
		C,
		w
	]), Le = H((e) => {
		let t = P ? Vt(C, P.kindId) : null;
		return t && e && (!t.appliesTo || t.appliesTo(e)) ? t.id : w(e);
	}, [
		P,
		C,
		w
	]), Re = H((e, t, n) => {
		n ? xe.current.set(e, {
			handle: n,
			kind: t
		}) : xe.current.delete(e);
	}, []), L = ue ? T.panes : P ? [P] : [], ze = H((e, t) => {
		let n = 0;
		for (let r of t) {
			let t = xe.current.get(r.id);
			t?.handle.send && t.handle.send(`${e}${t.kind.inputSuffix ?? ""}`) && (n += 1);
		}
		return n;
	}, []), Be = H(() => {
		let e = fe.trim();
		if (!e || L.length === 0) return;
		let t = ze(e, L);
		if (t === 0) {
			x({
				tone: "error",
				title: "Nothing received that",
				detail: "No pane was ready to accept input."
			});
			return;
		}
		pe(""), t < L.length && x({
			tone: "info",
			title: `Sent to ${t} of ${L.length} panes`,
			detail: "The rest were not connected."
		});
	}, [
		fe,
		L,
		x,
		ze
	]), R = W(() => A === "all" ? h : A === "selected" ? h.filter((e) => O.has(e.id)) : F ? [F] : [], [
		A,
		h,
		O,
		F
	]), z = W(() => {
		if (A === "focused") return P ? [P] : [];
		let e = new Set(R.map((e) => e.id));
		return T.panes.filter((t) => e.has(t.computerId));
	}, [
		A,
		P,
		R,
		T.panes
	]), Ve = H((e, t) => ve(m, e, t), [m]), He = H((e, t) => f ? f({
		text: e,
		computers: [...t],
		scope: "focused"
	}) : Ve(e, t), [f, Ve]), Ue = H(async () => {
		let e = fe.trim();
		if (!(!e || se)) {
			if (k === "type") {
				if (z.length === 0) {
					x({
						tone: "info",
						title: "No open pane to type into",
						detail: "Open a pane on one of these computers first."
					});
					return;
				}
				let t = ze(e, z);
				if (t === 0) {
					x({
						tone: "error",
						title: "Nothing received that",
						detail: "No pane was ready to accept input."
					});
					return;
				}
				pe(""), t < z.length && x({
					tone: "info",
					title: `Typed into ${t} of ${z.length} panes`,
					detail: "The rest do not take input."
				});
				return;
			}
			if (R.length !== 0) {
				le(!0);
				try {
					let t = f ? await f({
						text: e,
						computers: R,
						scope: A
					}) : await Ve(e, R), n = t?.delivered ?? R.length;
					n > 0 && pe(""), x({
						tone: n > 0 ? "success" : "error",
						title: n > 0 ? `Sent to ${n} of ${R.length} ${R.length === 1 ? "computer" : "computers"}` : "No computer took that",
						...t?.detail ? { detail: t.detail } : {}
					});
				} catch (e) {
					x({
						tone: "error",
						title: "Instruction not sent",
						detail: e instanceof Error ? e.message : void 0
					});
				} finally {
					le(!1);
				}
			}
		}
	}, [
		fe,
		se,
		k,
		z,
		R,
		A,
		f,
		Ve,
		ze,
		x
	]), We = H((e) => {
		let t = P?.computerId ?? h[0]?.id;
		t && T.split(e, t, P?.kindId ?? w(N.get(t)));
	}, [
		P,
		h,
		T,
		w,
		N
	]), Ke = H((e, t, n) => {
		if (!n || n.id === t) return;
		let r = Vt(C, t);
		if (n.quota === "shell" && r?.quota !== "shell" && Te >= 8) {
			x({
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
		Te,
		x
	]), qe = H(() => {
		P && Ke(P.id, P.kindId, Wt(C, P.kindId, N.get(P.computerId)));
	}, [
		P,
		C,
		Ke,
		N
	]), Je = H((e) => {
		v(e ? { projectId: e } : void 0).then((e) => {
			T.newWindow(e.id, w(e)), x({
				tone: "success",
				title: `${e.label} ready`,
				detail: "microVM session live · workspace persists"
			});
		}).catch((e) => {
			x({
				tone: "error",
				title: "Provisioning failed",
				detail: e instanceof Error ? e.message : void 0
			});
		});
	}, [
		v,
		T,
		x,
		w
	]);
	U(() => {
		if (!t || !T.activePaneId || ge || j) return;
		let e = T.activePaneId, n = requestAnimationFrame(() => xe.current.get(e)?.handle.focus?.());
		return () => cancelAnimationFrame(n);
	}, [
		t,
		T.activePaneId,
		T.zoomedPaneId,
		ge,
		j
	]);
	let B = H((e) => {
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
				We("row");
				return;
			case "split-down":
				We("column");
				return;
			case "close-pane":
				T.closeActivePane();
				return;
			case "zoom-pane":
				T.toggleZoom();
				return;
			case "next-kind":
				qe();
				return;
			case "jump":
				_e(!0);
				return;
			case "focus-composer":
				Se.current?.focus();
				return;
			case "leave-pane":
				Se.current?.focus();
				return;
			case "focus-rail": {
				let e = Ce.current;
				if (!e) return;
				let t = (t) => e.querySelector(`[role="listbox"][aria-label="${t}"] [data-rail-row][tabindex="0"]`) ?? e.querySelector(`[role="listbox"][aria-label="${t}"] [data-rail-row]`), n = document.activeElement, r = (t) => !!n && !!e.querySelector(`[role="listbox"][aria-label="${t}"]`)?.contains(n);
				if (r("computers")) {
					let e = t("agents");
					e ? e.focus() : P && xe.current.get(P.id)?.handle.focus?.();
					return;
				}
				if (r("agents")) {
					P && xe.current.get(P.id)?.handle.focus?.();
					return;
				}
				(t("computers") ?? t("agents"))?.focus();
				return;
			}
			case "toggle-broadcast":
				E ? oe((e) => e === "all" ? "focused" : "all") : de((e) => !e);
				return;
			case "help":
				M((e) => !e);
				return;
			case "exit":
				if (Ce.current?.contains(document.activeElement)) {
					P && xe.current.get(P.id)?.handle.focus?.();
					return;
				}
				i === "overlay" && n();
				return;
		}
	}, [
		T,
		We,
		qe,
		n,
		i,
		P,
		E
	]);
	if (U(() => {
		if (!t) return;
		let e = (e) => {
			if (ye) {
				e.preventDefault(), e.stopPropagation(), be(!1);
				let t = un(o, e);
				t && B(t);
				return;
			}
			if (ln(s, e)) {
				e.preventDefault(), e.stopPropagation(), be(!0);
				return;
			}
			let t = dn(o, e);
			if (t) {
				if (t === "exit") {
					let t = e.target;
					if (t?.closest?.(".xterm")) return;
					if (t === Se.current) {
						Se.current?.blur(), e.preventDefault();
						return;
					}
					if (ge || j) {
						_e(!1), M(!1), e.preventDefault();
						return;
					}
				}
				e.preventDefault(), e.stopPropagation(), B(t);
			}
		};
		return globalThis.addEventListener("keydown", e, !0), () => globalThis.removeEventListener("keydown", e, !0);
	}, [
		t,
		o,
		s,
		ye,
		B,
		ge,
		j
	]), U(() => {
		if (!ye) return;
		let e = setTimeout(() => be(!1), s?.timeoutMs ?? 3e3);
		return () => clearTimeout(e);
	}, [ye, s?.timeoutMs]), !t) return null;
	let V = (e) => pn(o, e), Xe = hn(a), Ze = a === "app", Qe = i === "inline", $e = k === "type" ? `Type into ${z.length} ${z.length === 1 ? "pane" : "panes"} — ⏎ to send` : A === "focused" ? `Instruction for ${F?.label ?? "the focused computer"} — ⏎ to send` : `Instruction for ${R.length} ${R.length === 1 ? "computer" : "computers"} — ⏎ to send`, et = /* @__PURE__ */ q("textarea", {
		ref: Se,
		rows: 1,
		value: fe,
		onChange: (e) => pe(e.target.value),
		onKeyDown: (e) => {
			e.key === "Enter" && !e.shiftKey && (e.preventDefault(), E ? Ue() : Be()), e.key === "Escape" && e.currentTarget.blur();
		},
		placeholder: E ? $e : ue ? `instruction for all ${L.length} panes — ⏎ to send` : `instruction for ${F?.label ?? "the focused pane"} — ⏎ to send`,
		"aria-label": E ? "Instruction" : "Broadcast instruction",
		disabled: E && se,
		className: e("flex-1 min-w-0 resize-none bg-transparent border-none outline-none text-[12px] leading-6", E ? "font-mono text-text-primary caret-primary placeholder:text-text-tertiary disabled:opacity-60" : "text-code-text caret-code-blue placeholder:text-code-raised")
	});
	if (E) {
		let t = ce(h), r = (e) => N.get(e.computerId) ?? null, c = (e) => {
			let t = r(e), n = Vt(C, e.kindId);
			return n && t && n.appliesTo && !n.appliesTo(t) ? Ut(C, t) : n;
		}, l = [{
			label: "Windows",
			items: [...T.windows.map((e, t) => ({
				label: e.name ?? `Window ${t + 1}`,
				active: e.id === T.activeWindow?.id,
				onSelect: () => T.selectWindow(e.id)
			})), {
				label: "New window",
				disabled: !P,
				onSelect: () => {
					P && T.newWindow(P.computerId, w(N.get(P.computerId)));
				}
			}]
		}, { items: [
			{
				label: "Jump to a computer…",
				trailing: V("jump") ?? void 0,
				onSelect: () => _e(!0)
			},
			{
				label: "Arrange side by side",
				onSelect: () => T.arrange("columns")
			},
			{
				label: "Keyboard shortcuts",
				trailing: V("help") ?? void 0,
				onSelect: () => M(!0)
			}
		] }], m = {
			focused: "Focused pane",
			selected: "Selected",
			all: "All computers"
		}, v = {
			focused: +!!F,
			selected: O.size,
			all: h.length
		}, y = k === "type" ? z.length : R.length, x = new Set(R.map((e) => e.id));
		return /* @__PURE__ */ q(Ge.Provider, {
			value: He,
			children: /* @__PURE__ */ J("div", {
				ref: we,
				...i === "overlay" ? {
					role: "dialog",
					"aria-modal": !0
				} : { role: "region" },
				"aria-label": "Computer Lab",
				"data-appearance": "workspace",
				style: Xe,
				className: e("flex flex-col bg-surface text-text-primary", i === "overlay" ? "fixed inset-0 z-[150]" : "relative h-full min-h-0 w-full rounded-lg border border-border overflow-hidden", p),
				children: [
					/* @__PURE__ */ q(tn, {
						title: u,
						summary: t,
						statusFilter: D,
						onStatusFilter: ne,
						canCreate: g,
						onCreate: () => Je(),
						onKeys: () => M((e) => !e),
						keysOpen: j,
						keysChord: V("help"),
						actions: /* @__PURE__ */ J(bt, { children: [d, i === "overlay" && /* @__PURE__ */ q("button", {
							type: "button",
							onClick: n,
							title: `Leave the lab${V("exit") ? ` · ${V("exit")}` : ""}`,
							className: "text-[12px] text-text-tertiary bg-transparent border-none cursor-pointer hover:text-danger",
							children: "✕"
						})] }),
						leaderLabel: ye && s ? s.label : null
					}),
					/* @__PURE__ */ J("div", {
						className: "flex flex-1 min-h-0",
						children: [/* @__PURE__ */ q("div", {
							ref: Ce,
							className: "contents",
							children: /* @__PURE__ */ q(Yt, {
								className: "w-[224px] xl:w-[300px] shrink-0",
								computers: h,
								activeComputerId: F?.id ?? null,
								openComputerIds: T.openComputerIds,
								selectedIds: O,
								statusFilter: D,
								onStatusFilterChange: ne,
								onCreate: g ? () => Je() : void 0,
								onSelect: (e, { toggle: t }) => {
									if (t) {
										re((t) => {
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
									P && I(P.id, e);
								},
								onOpenInPane: (e) => T.split("row", e.id, Le(e))
							})
						}), /* @__PURE__ */ J("div", {
							className: "flex flex-col flex-1 min-w-0 min-h-0 bg-surface-inset",
							children: [
								/* @__PURE__ */ q(rn, {
									panes: T.panes.map((e) => ({
										id: e.id,
										label: N.get(e.computerId)?.label ?? "gone",
										kind: c(e)?.title ?? c(e)?.label ?? e.kindId,
										active: e.id === T.activePaneId
									})),
									onFocusPane: T.focusPane,
									onAddPane: () => We(T.panes.length % 2 == 1 ? "row" : "column"),
									canAddPane: !!P,
									shellsOpen: Te,
									maxShells: 8,
									onArrange: T.arrange,
									zoomed: !!T.zoomedPaneId,
									onToggleZoom: T.toggleZoom,
									moreSections: l
								}),
								/* @__PURE__ */ q("div", {
									className: "flex-1 min-h-0 flex px-2 pb-2",
									children: T.activeWindow && P ? /* @__PURE__ */ q(Cn, {
										className: "flex-1 h-full",
										gutter: "roomy",
										node: T.activeWindow.root,
										activePaneId: T.activePaneId,
										zoomedPaneId: T.zoomedPaneId,
										onRatioChange: T.resize,
										renderLeaf: (e) => {
											let t = r(e), n = c(e), i = e.id === T.activePaneId;
											return !t || !n ? /* @__PURE__ */ q("div", {
												className: "flex-1 flex items-center justify-center rounded-lg border border-border bg-surface text-[12px] text-text-tertiary",
												children: t ? "No pane kind is registered." : "This computer is gone."
											}) : /* @__PURE__ */ q(on, {
												computer: t,
												kind: n,
												kinds: Ht(C, t),
												onSwitchKind: (t) => {
													T.focusPane(e.id), Ke(e.id, n.id, t);
												},
												active: i,
												zoomed: T.zoomedPaneId === e.id,
												broadcasting: A !== "focused" && x.has(t.id),
												models: b,
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
												children: /* @__PURE__ */ q(On, {
													kind: n,
													paneId: e.id,
													computer: t,
													active: i,
													onRegisterPane: Re,
													onSettled: () => void S()
												})
											}, e.id);
										}
									}) : /* @__PURE__ */ J("div", {
										className: "flex-1 flex flex-col items-center justify-center gap-3 text-center rounded-lg border border-dashed border-border",
										children: [/* @__PURE__ */ q("div", {
											className: "text-[14px] font-semibold text-text-primary",
											children: "No computers in the lab"
										}), /* @__PURE__ */ q("div", {
											className: "text-[12px] text-text-secondary max-w-sm",
											children: g ? "Start a computer and it opens here in a pane." : "Nothing in the fleet is shared with you yet."
										})]
									})
								}),
								/* @__PURE__ */ J("div", {
									"data-testid": "lab-instruction-bar",
									className: "shrink-0 border-t border-border bg-surface px-2 pt-1.5 pb-1",
									children: [/* @__PURE__ */ J("div", {
										className: "flex items-center gap-1.5 rounded-lg border border-border bg-surface px-1.5 py-1 focus-within:border-primary",
										children: [
											/* @__PURE__ */ q(_, {
												trigger: /* @__PURE__ */ J("span", {
													className: "text-[12px] font-semibold",
													children: [k === "nudge" ? "Nudge" : "Type", " ▾"]
												}),
												triggerLabel: "Instruction mode",
												triggerVariant: "link",
												triggerTestId: "lab-instruct-mode",
												sections: [{ items: [{
													label: "Nudge",
													description: "An instruction for each computer's agent",
													active: k === "nudge",
													disabled: !g && !f,
													disabledReason: "Needs permission to run work on these computers",
													onSelect: () => ie("nudge")
												}, {
													label: "Type",
													description: "Keystrokes into the panes open on them",
													active: k === "type",
													onSelect: () => ie("type")
												}] }]
											}),
											/* @__PURE__ */ q("span", {
												"aria-hidden": "true",
												className: "h-4 w-px bg-border"
											}),
											/* @__PURE__ */ q(_, {
												trigger: /* @__PURE__ */ J("span", {
													className: "text-[12px] tabular-nums",
													children: [
														m[A],
														" · ",
														v[A],
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
														label: `${m[e]} · ${v[e]}`,
														active: A === e,
														...e === "selected" && O.size === 0 ? {
															disabled: !0,
															disabledReason: "⌘-click computers in the rail to select them"
														} : {},
														onSelect: () => oe(e)
													}))
												}]
											}),
											/* @__PURE__ */ q("span", {
												"aria-hidden": "true",
												className: "font-mono text-[12px] text-text-tertiary pl-1",
												children: ">"
											}),
											et,
											/* @__PURE__ */ q("button", {
												type: "button",
												onClick: () => void Ue(),
												disabled: !fe.trim() || y === 0 || se,
												"aria-label": "Send instruction",
												title: "Send · ⏎",
												className: "shrink-0 h-6.5 px-2 rounded-md border-none bg-primary text-on-primary text-[12px] cursor-pointer hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed",
												children: "⏎"
											})
										]
									}), /* @__PURE__ */ J("div", {
										"data-testid": "lab-instruction-caption",
										className: "px-1 pt-0.5 text-[11px] text-text-tertiary tabular-nums",
										children: [
											k === "type" ? "Shell input" : "Agent instruction",
											" · ",
											y,
											" ",
											y === 1 ? "target" : "targets",
											se && " · sending…"
										]
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ q(Sn, {
						open: ge,
						onClose: () => _e(!1),
						chrome: a,
						computers: h,
						panes: T.panes,
						onJumpToPane: T.focusPane,
						onRetarget: (e) => {
							P && I(P.id, e);
						},
						onOpenInSplit: (e) => T.split("row", e.id, Le(e)),
						projects: ee,
						onSelectProject: (e) => {
							let t = e.computers[0];
							if (t) {
								P && I(P.id, t);
								return;
							}
							g && Je(e.id);
						}
					}),
					j && /* @__PURE__ */ q(kn, {
						keymap: o,
						leader: s,
						chrome: a,
						onClose: () => M(!1)
					})
				]
			})
		});
	}
	return /* @__PURE__ */ q(Ge.Provider, {
		value: He,
		children: /* @__PURE__ */ J("div", {
			ref: we,
			...i === "overlay" ? {
				role: "dialog",
				"aria-modal": !0
			} : { role: "region" },
			"aria-label": "Computer Lab",
			style: Xe,
			className: e("flex flex-col", Ze ? "bg-surface text-text-primary" : "bg-code-bg text-code-text", i === "overlay" ? "fixed inset-0 z-[150]" : e("relative h-full min-h-0 w-full", Ze && "rounded-lg border border-border overflow-hidden"), p),
			children: [
				/* @__PURE__ */ J("div", {
					className: e("flex items-center gap-3 px-3 shrink-0 border-b border-code-border bg-code-panel", Qe ? "h-9" : "h-10"),
					children: [
						/* @__PURE__ */ q("span", {
							className: "text-[11px] font-mono font-semibold tracking-wide text-code-mauve select-none",
							children: "LAB"
						}),
						/* @__PURE__ */ J("span", {
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
						/* @__PURE__ */ J("div", {
							className: "flex items-center gap-1 ml-2",
							children: [T.windows.map((t, n) => {
								let r = t.id === T.activeWindow?.id;
								return /* @__PURE__ */ q("button", {
									type: "button",
									onClick: () => T.selectWindow(t.id),
									title: `Window ${n + 1}`,
									"aria-current": r ? "true" : void 0,
									className: e("px-2 py-0.5 rounded-sm text-[11px] font-mono cursor-pointer border-none transition-colors", r ? "bg-code-blue text-code-bg font-semibold" : "bg-code-surface text-code-muted hover:text-code-text"),
									children: t.name ?? n + 1
								}, t.id);
							}), /* @__PURE__ */ q("button", {
								type: "button",
								onClick: () => P && T.newWindow(P.computerId, w(N.get(P.computerId))),
								disabled: !P,
								title: "New window",
								"aria-label": "New window",
								className: "px-1.5 py-0.5 text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text disabled:opacity-40 disabled:cursor-not-allowed",
								children: "+"
							})]
						}),
						/* @__PURE__ */ q("span", { className: "flex-1" }),
						/* @__PURE__ */ q(y, {
							label: "shells",
							value: Te / 8,
							segments: 8,
							showPercent: !1,
							note: `${Te} of 8 open`,
							warnAbove: .74,
							tone: Ze ? "surface" : "code",
							className: "hidden md:flex"
						}),
						ye && s && /* @__PURE__ */ J("span", {
							"data-testid": "leader-armed",
							className: "px-2 py-0.5 rounded-sm text-[10px] font-mono font-semibold bg-code-peach text-code-bg animate-pulse",
							children: [s.label, " …"]
						}),
						/* @__PURE__ */ q("button", {
							type: "button",
							onClick: () => M((e) => !e),
							"aria-pressed": j,
							title: `Shortcuts${V("help") ? ` · ${V("help")}` : ""}`,
							className: "text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text",
							children: "?"
						}),
						i === "overlay" && /* @__PURE__ */ q("button", {
							type: "button",
							onClick: n,
							title: `Leave the lab${V("exit") ? ` · ${V("exit")}` : ""}`,
							className: "text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-red",
							children: "✕"
						})
					]
				}),
				/* @__PURE__ */ J("div", {
					className: "flex flex-1 min-h-0",
					children: [/* @__PURE__ */ q("div", {
						ref: Ce,
						className: "contents",
						children: /* @__PURE__ */ q(yn, {
							className: "w-[210px] shrink-0",
							computers: h,
							activeComputerId: F?.id ?? null,
							openComputerIds: T.openComputerIds,
							showAllActivity: me,
							onToggleShowAll: () => he((e) => !e),
							canManage: g,
							models: b,
							onCreate: () => Je(),
							onOpenMenu: () => M((e) => !e),
							onSelect: (e) => {
								P && I(P.id, e);
							},
							onOpenInPane: (e) => T.split("row", e.id, Le(e)),
							onWatch: (e) => {
								let t = C.find((e) => e.id === "tail");
								if (!t) {
									P && I(P.id, e);
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
					}), /* @__PURE__ */ q("div", {
						className: e("flex-1 min-w-0 min-h-0", Qe ? "p-1.5" : "p-2", Ze ? "bg-surface" : "bg-code-bg"),
						children: T.activeWindow && P ? /* @__PURE__ */ q(Cn, {
							className: "flex-1 h-full",
							node: T.activeWindow.root,
							activePaneId: T.activePaneId,
							zoomedPaneId: T.zoomedPaneId,
							onRatioChange: T.resize,
							renderLeaf: (e) => {
								let t = N.get(e.computerId), n = e.id === T.activePaneId;
								return /* @__PURE__ */ q(Dn, {
									pane: e,
									computer: t ?? null,
									active: n,
									broadcasting: ue,
									idleWindowMs: c,
									zoomed: T.zoomedPaneId === e.id,
									onFocus: () => T.focusPane(e.id),
									onClose: () => {
										T.focusPane(e.id), T.closeActivePane();
									},
									kinds: C,
									onToggleKind: () => {
										T.focusPane(e.id), Ke(e.id, e.kindId, Wt(C, e.kindId, t));
									},
									onRegisterPane: Re,
									onSettled: () => void S()
								}, e.id);
							}
						}) : /* @__PURE__ */ J("div", {
							className: "h-full flex flex-col items-center justify-center gap-3 text-center",
							children: [
								/* @__PURE__ */ q("div", {
									className: "text-[13px] font-mono text-code-subtle",
									children: "No computers to lab"
								}),
								/* @__PURE__ */ q("div", {
									className: "text-[11px] font-mono text-code-muted max-w-sm",
									children: "Computer Lab multiplexes a fleet. Provision at least one computer and it will open in a pane."
								}),
								g && /* @__PURE__ */ q("button", {
									type: "button",
									onClick: () => Je(),
									className: "text-[11px] font-mono rounded px-3 py-1 cursor-pointer border border-code-green/60 bg-code-green/15 text-code-green hover:bg-code-green/30",
									children: "+ new computer"
								})
							]
						})
					})]
				}),
				/* @__PURE__ */ J("div", {
					className: e("flex items-center gap-2 px-3 shrink-0 border-t font-mono transition-colors", Qe ? "py-1" : "py-1.5", ue ? "border-code-peach bg-code-peach/10" : "border-code-border bg-code-panel focus-within:border-code-blue"),
					children: [
						/* @__PURE__ */ q("button", {
							type: "button",
							onClick: () => de((e) => !e),
							"aria-pressed": ue,
							title: `Send the prompt to every pane${V("toggle-broadcast") ? ` · ${V("toggle-broadcast")}` : ""}`,
							className: e("text-[10px] px-1.5 py-0.5 rounded-sm cursor-pointer border transition-colors shrink-0", ue ? "border-code-peach bg-code-peach/25 text-code-peach font-semibold" : "border-code-border text-code-muted bg-transparent hover:text-code-text"),
							children: ue ? "▶▶ all panes" : "▶ focused pane"
						}),
						/* @__PURE__ */ J("span", {
							className: "text-[10px] text-code-muted tabular-nums shrink-0 hidden sm:inline",
							children: [
								L.length,
								" ",
								L.length === 1 ? "target" : "targets"
							]
						}),
						et,
						/* @__PURE__ */ q("button", {
							type: "button",
							onClick: Be,
							disabled: !fe.trim() || L.length === 0,
							className: e("shrink-0 text-[11px] px-2 py-0.5 rounded-sm border cursor-pointer transition-colors", "border-code-green/60 bg-code-green/15 text-code-green hover:bg-code-green/30", "disabled:border-code-border disabled:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"),
							children: "send"
						})
					]
				}),
				/* @__PURE__ */ q(Sn, {
					open: ge,
					onClose: () => _e(!1),
					chrome: a,
					computers: h,
					panes: T.panes,
					onJumpToPane: T.focusPane,
					onRetarget: (e) => {
						P && I(P.id, e);
					},
					onOpenInSplit: (e) => T.split("row", e.id, Le(e)),
					projects: ee,
					onSelectProject: (e) => {
						let t = e.computers[0];
						if (t) {
							P && I(P.id, t);
							return;
						}
						if (!g) {
							x({
								tone: "info",
								title: `${e.name} has no computers`,
								detail: "You do not have permission to start one."
							});
							return;
						}
						Je(e.id);
					}
				}),
				j && /* @__PURE__ */ q(kn, {
					keymap: o,
					leader: s,
					chrome: a,
					onClose: () => M(!1)
				})
			]
		})
	});
}
function Dn({ pane: e, computer: t, active: n, broadcasting: r, zoomed: i, idleWindowMs: a, kinds: o, onFocus: s, onClose: c, onToggleKind: l, onRegisterPane: u, onSettled: d }) {
	let f = Vt(o, e.kindId), p = f && t && f.appliesTo && !f.appliesTo(t) ? Ut(o, t) : f, m = H((t) => {
		p && u(e.id, p, t);
	}, [
		u,
		e.id,
		p
	]);
	if (!t || !p) return /* @__PURE__ */ q(v, {
		title: "unbound",
		active: n,
		className: "flex-1 min-w-0",
		onActivate: s,
		children: /* @__PURE__ */ q("div", {
			className: "h-full flex items-center justify-center text-[11px] font-mono text-code-subtle",
			children: t ? "no pane kind registered" : "this computer is gone"
		})
	});
	let h = A(t), g = O[h];
	return /* @__PURE__ */ J(v, {
		active: n,
		onActivate: s,
		className: "flex-1 min-w-0",
		bodyClassName: "flex flex-col min-h-0",
		title: /* @__PURE__ */ J("span", {
			className: "inline-flex items-center gap-1.5",
			children: [
				/* @__PURE__ */ q(b, {
					size: "xs",
					color: g.color,
					pulse: g.pulse,
					"aria-label": g.label
				}),
				t.label,
				i && /* @__PURE__ */ q("span", {
					className: "text-code-peach",
					title: "Zoomed",
					children: "⤢"
				})
			]
		}),
		titleAction: /* @__PURE__ */ J("span", {
			className: "inline-flex items-center gap-1.5",
			children: [/* @__PURE__ */ q("button", {
				type: "button",
				onClick: l,
				title: Wt(o, e.kindId)?.description ?? "Switch pane kind",
				className: "text-[9px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text",
				children: p.label
			}), /* @__PURE__ */ q("button", {
				type: "button",
				onClick: c,
				"aria-label": `Close pane ${t.label}`,
				className: "text-[10px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-red leading-none",
				children: "×"
			})]
		}),
		children: [/* @__PURE__ */ q("div", {
			className: "flex-1 min-h-0",
			children: p.render({
				computer: t,
				paneId: e.id,
				active: n,
				registerPane: m,
				onSettled: d
			})
		}), /* @__PURE__ */ q(re, {
			className: "rounded-b-[3px]",
			computer: t,
			idleWindowMs: a,
			broadcasting: r,
			mode: p.statusMode ?? p.label
		})]
	});
}
function On({ kind: e, paneId: t, computer: n, active: r, onRegisterPane: i, onSettled: a }) {
	let o = H((n) => i(t, e, n), [
		i,
		t,
		e
	]);
	return /* @__PURE__ */ q(bt, { children: e.render({
		computer: n,
		paneId: t,
		active: r,
		registerPane: o,
		onSettled: a
	}) });
}
function kn({ keymap: e, leader: t, chrome: n = "app", onClose: r }) {
	let i = {
		panes: "Panes",
		navigate: "Getting around",
		lab: "The lab"
	};
	return /* @__PURE__ */ q("div", {
		role: "dialog",
		"aria-label": "Keyboard shortcuts",
		className: "absolute inset-0 z-10 flex items-center justify-center bg-code-bg/80",
		onClick: r,
		children: /* @__PURE__ */ J("div", {
			style: hn(n),
			onClick: (e) => e.stopPropagation(),
			className: "w-[560px] max-w-[92vw] max-h-[80vh] overflow-y-auto rounded-lg border border-code-border bg-code-panel p-5 shadow-2xl",
			children: [
				/* @__PURE__ */ J("div", {
					className: "flex items-baseline gap-2 mb-4",
					children: [
						/* @__PURE__ */ q("span", {
							className: "text-[13px] font-semibold text-code-text",
							children: "Keyboard shortcuts"
						}),
						t && /* @__PURE__ */ J("span", {
							className: "text-[10px] font-mono text-code-muted",
							children: [t.label, " prefix is on"]
						}),
						/* @__PURE__ */ q("span", { className: "flex-1" }),
						/* @__PURE__ */ q("button", {
							type: "button",
							onClick: r,
							className: "text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text",
							children: "esc"
						})
					]
				}),
				/* @__PURE__ */ q("div", {
					className: "flex flex-col gap-4",
					children: fn(e).map(({ group: e, bindings: n }) => /* @__PURE__ */ J("div", { children: [/* @__PURE__ */ q("div", {
						className: "text-[10px] uppercase tracking-wide text-code-mauve mb-1.5",
						children: i[e]
					}), /* @__PURE__ */ q("dl", {
						className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 m-0",
						children: n.map((e) => /* @__PURE__ */ J(vt, { children: [/* @__PURE__ */ J("dt", {
							className: "m-0 font-mono text-[11px] text-code-green whitespace-nowrap",
							children: [e.label, t && e.leaderKey && /* @__PURE__ */ J("span", {
								className: "text-code-muted",
								children: [
									" or ",
									t.label,
									" ",
									e.leaderKey
								]
							})]
						}), /* @__PURE__ */ q("dd", {
							className: "m-0 text-[11px] text-code-subtle",
							children: e.description
						})] }, `${e.command}-${e.label}`))
					})] }, e))
				}),
				/* @__PURE__ */ J("div", {
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
var An = {
	connected: "success",
	stale: "caution",
	offline: "neutral"
}, jn = {
	connected: "connected",
	stale: "stale",
	offline: "offline"
};
function Mn(e) {
	return !e || e.mode === "disabled" ? "— sync off" : e.mode === "offline" ? "○ offline — queuing" : e.mode === "pending" ? `◐ ${e.pendingOps ?? "?"} pending` : "● synced";
}
function Nn(e, t = []) {
	let n = e.modelProvider === "bedrock" ? ie(e.model, t) : e.model ?? "—";
	return e.modelProvider ? `${e.modelProvider} · ${n}` : n;
}
function Pn(e) {
	return e.reduce((e, t) => e + t.sessions.length, 0);
}
function Fn({ session: e, models: t }) {
	let r = e.projectName ?? e.projectId ?? e.repo ?? "—", i = e.branch ? `${r} · ${e.branch}` : r, a = e.modelProvider != null && e.modelProvider !== "bedrock";
	return /* @__PURE__ */ J("li", {
		"data-testid": "machine-session-row",
		className: "flex flex-col gap-1 rounded-md px-2 py-1.5 hover:bg-surface-hover",
		children: [
			/* @__PURE__ */ J("div", {
				className: "flex items-center gap-2 min-w-0",
				children: [
					/* @__PURE__ */ q("span", {
						className: "text-xs font-medium text-text-primary truncate",
						title: e.worktree ?? i,
						children: i
					}),
					/* @__PURE__ */ q("span", { className: "flex-1" }),
					/* @__PURE__ */ q(n, {
						size: "xs",
						mono: !0,
						tone: a ? "accent" : "neutral",
						className: "shrink-0",
						children: Nn(e, t)
					})
				]
			}),
			e.intent && /* @__PURE__ */ q("div", {
				className: "text-[11px] text-text-tertiary truncate",
				title: e.intent,
				children: e.intent
			}),
			/* @__PURE__ */ J("div", {
				className: "flex items-center gap-3 min-w-0",
				children: [e.contextUsed != null && /* @__PURE__ */ q(y, {
					label: "ctx",
					value: e.contextUsed,
					tone: "surface",
					segments: 8,
					className: "shrink-0"
				}), /* @__PURE__ */ q("span", {
					className: "text-[10px] font-mono text-text-tertiary truncate",
					title: e.memory?.pullCursorAgeS == null ? void 0 : `read replica ${e.memory.pullCursorAgeS}s behind the mesh`,
					children: Mn(e.memory)
				})]
			})
		]
	});
}
function In({ nodes: t, models: r = [], onOpenLab: i, onManage: a, className: o, "data-testid": s = "machine-presence-menu" }) {
	let c = G(null), [l, u] = K(!1);
	if (t.length === 0) return null;
	let d = Pn(t), f = t.some((e) => e.status === "connected") ? "connected" : t.some((e) => e.status === "stale") ? "stale" : "offline", p = t.length === 1 ? t[0].label : `${t.length} machines`, m = f === "connected" && d > 0;
	return /* @__PURE__ */ J(bt, { children: [/* @__PURE__ */ q("button", {
		ref: c,
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": l,
		"aria-label": `Local machines: ${p}, ${d} active session${d === 1 ? "" : "s"}, ${jn[f]}`,
		title: `${p} — ${jn[f]}`,
		onClick: () => u((e) => !e),
		"data-testid": s,
		className: e("inline-flex items-center cursor-pointer rounded-md border border-border px-2 py-1", "bg-transparent hover:bg-surface-hover transition-colors duration-100", l && "bg-surface-hover", o),
		children: /* @__PURE__ */ q(n, {
			size: "xs",
			mono: !0,
			tone: An[f],
			dot: m ? "pulse" : "static",
			className: "bg-transparent px-0",
			children: d === 0 ? `⌂ ${p}` : `⌂ ${p} · ${d}`
		})
	}), /* @__PURE__ */ q(g, {
		trigger: c,
		open: l,
		onClose: () => u(!1),
		placement: "bottom-end",
		"aria-label": "Local machine sessions",
		className: "w-[320px] p-2",
		"data-testid": `${s}-panel`,
		children: /* @__PURE__ */ J("div", {
			className: "flex flex-col gap-2",
			children: [t.map((e) => /* @__PURE__ */ J("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ J("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ q(S, { children: e.label }),
						e.platform && /* @__PURE__ */ q("span", {
							className: "text-[10px] font-mono text-text-tertiary",
							children: e.platform
						}),
						/* @__PURE__ */ q("span", { className: "flex-1" }),
						/* @__PURE__ */ q(n, {
							size: "xs",
							uppercase: !0,
							tone: An[e.status],
							dot: "static",
							children: jn[e.status]
						})
					]
				}), e.sessions.length > 0 ? /* @__PURE__ */ q("ul", {
					className: "flex flex-col",
					children: e.sessions.map((e) => /* @__PURE__ */ q(Fn, {
						session: e,
						models: r
					}, e.id))
				}) : /* @__PURE__ */ q(C, {
					"data-testid": "machine-no-sessions",
					children: e.status === "offline" ? "machine offline" : "no active sessions"
				})]
			}, e.id)), (i || a) && /* @__PURE__ */ J("div", {
				className: "flex items-center gap-2 border-t border-border pt-2",
				children: [
					i && /* @__PURE__ */ q("button", {
						type: "button",
						onClick: () => {
							u(!1), i();
						},
						className: "text-[11px] font-medium text-primary hover:underline cursor-pointer bg-transparent border-0 p-0",
						children: "Open Computer Lab"
					}),
					/* @__PURE__ */ q("span", { className: "flex-1" }),
					a && /* @__PURE__ */ q("button", {
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
//#region src/components/compute/components/ComputeDock.tsx
var Ln = {
	docked: "▭",
	grid: "▦",
	stack: "▤",
	floating: "▢"
};
function Rn(e) {
	U(() => {
		if (!e) return;
		let t = (e) => {
			let t = e.metaKey || e.ctrlKey;
			if (t && (e.key === "'" || e.key === "\"")) {
				e.preventDefault(), e.stopPropagation(), e.shiftKey ? rt() : Re(Qe().mode === "hidden");
				return;
			}
			if (Qe().mode !== "hidden") {
				if (e.altKey && !t && /^[1-9]$/.test(e.key)) {
					e.preventDefault(), e.stopPropagation(), lt(Number(e.key) - 1);
					return;
				}
				e.ctrlKey && e.key === "Tab" && (e.preventDefault(), e.stopPropagation(), We(e.shiftKey ? -1 : 1));
			}
		};
		return window.addEventListener("keydown", t, !0), () => window.removeEventListener("keydown", t, !0);
	}, [e]);
}
function zn({ status: e }) {
	let t = ne[e];
	return /* @__PURE__ */ q("span", {
		"aria-hidden": "true",
		title: t.help,
		className: `w-1.5 h-1.5 rounded-full shrink-0 ${t.pulse ? "animate-pulse" : ""}`,
		style: { background: t.color }
	});
}
function Bn({ shell: e, active: t, labelled: n }) {
	return /* @__PURE__ */ J("div", {
		className: "flex flex-col min-h-0 h-full",
		children: [n && /* @__PURE__ */ J("div", {
			className: "flex items-center gap-1.5 px-2 py-1 border-b shrink-0 bg-code-surface border-code-border",
			children: [
				/* @__PURE__ */ q(zn, { status: e.status }),
				/* @__PURE__ */ q("span", {
					className: "text-[10px] font-mono text-code-muted",
					children: e.label
				}),
				/* @__PURE__ */ q("div", { className: "flex-1" }),
				/* @__PURE__ */ q("button", {
					type: "button",
					onClick: () => Xe(e.id),
					"aria-label": `Close ${e.label}`,
					className: "text-[10px] bg-transparent border-none cursor-pointer px-1 leading-none text-code-muted hover:text-code-red",
					children: "×"
				})
			]
		}), /* @__PURE__ */ q("div", {
			className: "flex-1 min-h-0",
			children: /* @__PURE__ */ q(qe, {
				sessionId: e.sessionId,
				shellId: e.id,
				label: e.label,
				...e.cwd ? { cwd: e.cwd } : {},
				chrome: !1,
				fillHeight: !0,
				autoConnect: t,
				onStatus: (t, n) => Je(e.id, t, n)
			})
		})]
	});
}
function Vn({ hotkeys: e = !0, reconcile: t = !0, className: n = "" }) {
	let r = yt(He, Qe, Qe), i = nt();
	Rn(e);
	let a = W(() => (i?.computers ?? []).map((e) => e.sessionId), [i?.computers]);
	if (U(() => {
		!t || a.length === 0 || I(a);
	}, [t, a]), r.mode === "hidden" || r.shells.length === 0) return null;
	let o = V(r.mode), s = /* @__PURE__ */ J("div", {
		style: mn,
		className: "flex flex-col h-full min-h-0",
		children: [/* @__PURE__ */ J("div", {
			className: "flex items-center gap-1 px-1.5 py-1 border-b shrink-0 overflow-x-auto bg-terminal-bg border-code-border",
			children: [
				r.shells.map((e, t) => {
					let n = e.id === r.activeId;
					return /* @__PURE__ */ J("div", {
						className: `group flex items-center gap-1.5 pl-2 pr-1 py-1 rounded shrink-0 ${n ? "bg-code-surface" : "bg-transparent hover:bg-code-surface/60"}`,
						children: [/* @__PURE__ */ J("button", {
							type: "button",
							onClick: () => Ne(e.id),
							title: `${e.label} · ⌥${t + 1}`,
							"aria-current": n ? "true" : void 0,
							className: `flex items-center gap-1.5 text-[11px] font-mono cursor-pointer border-none bg-transparent p-0 ${n ? "text-code-text" : "text-code-muted hover:text-code-text"}`,
							children: [
								/* @__PURE__ */ q(zn, { status: e.status }),
								e.label,
								e.unread && !n && /* @__PURE__ */ q("span", {
									className: "w-1 h-1 rounded-full bg-code-blue",
									title: "new output while you were away"
								})
							]
						}), /* @__PURE__ */ q("button", {
							type: "button",
							onClick: () => Xe(e.id),
							"aria-label": `Close ${e.label}`,
							title: `Close ${e.label} — the shell is killed`,
							className: "opacity-0 group-hover:opacity-100 focus:opacity-100 bg-transparent border-none cursor-pointer px-1 leading-none text-code-muted hover:text-code-red",
							children: "×"
						})]
					}, e.id);
				}),
				/* @__PURE__ */ q("div", { className: "flex-1" }),
				r.shells.length >= 8 && /* @__PURE__ */ q("span", {
					className: "text-[10px] mr-1 shrink-0 text-code-peach",
					title: "AgentCore allows 10 shells per runtime",
					children: "max shells"
				}),
				/* @__PURE__ */ q("div", {
					className: "flex rounded border overflow-hidden mr-1 shrink-0 border-code-border",
					children: Object.keys(Ln).map((e) => /* @__PURE__ */ q("button", {
						type: "button",
						onClick: () => et(e),
						title: `${e} layout — ⌘⇧' cycles`,
						"aria-pressed": r.mode === e,
						className: `px-1.5 py-0.5 text-[10px] cursor-pointer border-none ${r.mode === e ? "bg-code-border text-code-text" : "bg-transparent text-code-muted hover:text-code-text"}`,
						children: Ln[e]
					}, e))
				}),
				/* @__PURE__ */ q("button", {
					type: "button",
					onClick: () => Re(!1),
					title: "Hide — ⌘'. The shells keep running.",
					className: "text-[11px] px-1.5 py-0.5 bg-transparent border-none cursor-pointer shrink-0 text-code-muted hover:text-code-text",
					children: "▾"
				})
			]
		}), /* @__PURE__ */ q("div", {
			className: `flex-1 min-h-0 ${o ? `p-1.5 gap-1.5 overflow-auto ${r.mode === "grid" ? "grid grid-cols-1 md:grid-cols-2 auto-rows-fr" : "flex flex-col"}` : "relative"}`,
			children: r.shells.map((e) => {
				let t = e.id === r.activeId;
				return /* @__PURE__ */ q("div", {
					onMouseDown: () => Ne(e.id),
					"aria-hidden": !o && !t,
					className: o ? `min-h-[160px] rounded border overflow-hidden flex flex-col ${t ? "border-code-green/50" : "border-code-border"}` : "absolute inset-0",
					style: o ? void 0 : { visibility: t ? "visible" : "hidden" },
					children: /* @__PURE__ */ q(Bn, {
						shell: e,
						active: o || t,
						labelled: o
					})
				}, e.id);
			})
		})]
	});
	if (r.mode === "floating") return /* @__PURE__ */ q(ee, {
		open: !0,
		onClose: () => Re(!1),
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
	return /* @__PURE__ */ q("div", {
		"data-testid": "compute-dock",
		className: `${c} z-[120] flex flex-col bg-terminal-bg border-code-border ${n}`,
		style: r.mode === "stack" ? mn : {
			...mn,
			height: r.geometry.dockHeight
		},
		children: s
	});
}
//#endregion
//#region src/components/compute/lib/workspaceTree.ts
var Hn = String.raw`find . -maxdepth 3 \( -name .git -o -name node_modules -o -name .venv -o -name __pycache__ -o -name dist \) -prune -printf "p %p\n" -o -printf "%y %p\n" 2>/dev/null | head -400`, Un = "git log --oneline -3 2>/dev/null; git status --short 2>/dev/null | head -5", Wn = 400;
function Gn(e) {
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
	return Kn(t), t;
}
function Kn(e) {
	e.sort((e, t) => e.kind === t.kind ? e.name.localeCompare(t.name) : e.kind === "dir" ? -1 : 1);
	for (let t of e) Kn(t.children);
}
function qn(e) {
	return e.children.reduce((e, t) => e + 1 + qn(t), 0);
}
function Jn(e, t, n = 0) {
	let r = [];
	for (let i of e) r.push({
		node: i,
		depth: n
	}), i.kind === "dir" && !i.pruned && t.has(i.path) && r.push(...Jn(i.children, t, n + 1));
	return r;
}
//#endregion
//#region src/components/compute/fixtures/mockShell.ts
var Yn = "mock-shell:", X = "/mnt/workspace", Xn = "bedrock_agentcore", Z = {
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
}, Zn = {
	[X]: [
		".git/",
		"README.md",
		"src/",
		"tests/",
		"logs/"
	],
	[`${X}/src`]: ["main.py"],
	[`${X}/tests`]: ["test_main.py"],
	[`${X}/logs`]: [
		"agent.log",
		"tools.log",
		"runtime.log"
	],
	[`${X}/.git`]: [
		"HEAD",
		"config",
		"objects/",
		"refs/"
	]
}, Qn = {
	[`${X}/README.md`]: [
		"# workspace",
		"",
		"One agent computer: a Firecracker microVM with this directory",
		"mounted persistently. Everything under /mnt/workspace survives a",
		"session stop; everything outside it does not.",
		"",
		"Treat it as a cache, not a durable store — a runtime version update",
		"wipes it."
	].join("\n"),
	[`${X}/src/main.py`]: [
		"\"\"\"Ingest entrypoint the agent has been editing.\"\"\"",
		"",
		"",
		"def handler(event, context):",
		"    body = event.get(\"body\") or {}",
		"    return {\"statusCode\": 200, \"body\": body}"
	].join("\n"),
	[`${X}/tests/test_main.py`]: [
		"from src.main import handler",
		"",
		"",
		"def test_handler_echoes_body():",
		"    assert handler({\"body\": {\"a\": 1}}, None)[\"body\"] == {\"a\": 1}"
	].join("\n"),
	[`${X}/logs/agent.log`]: [
		"08:08:12 INFO  session resumed · model haiku-4.5",
		"08:08:14 INFO  read_file src/main.py",
		"08:08:21 INFO  grep \"def handler\" · 1 file",
		"08:08:29 WARN  context at 61% — summarising earlier turns",
		"08:08:33 INFO  edit_file src/main.py · +1 -1",
		"08:08:41 INFO  run_tests pytest -q · 4 passed in 0.62s",
		"08:08:44 INFO  turn complete · waiting for the next instruction"
	].join("\n"),
	[`${X}/logs/tools.log`]: [
		"08:08:14 read_file   src/main.py            ok   3ms",
		"08:08:21 grep        def handler            ok  11ms",
		"08:08:33 edit_file   src/main.py            ok   5ms",
		"08:08:41 run_tests   pytest -q              ok 620ms"
	].join("\n"),
	[`${X}/logs/runtime.log`]: [
		"08:00:02 INFO  microVM up · /mnt/workspace mounted",
		"08:00:03 INFO  shell slots 1/10",
		"08:07:58 WARN  idle 7m · auto-stop in 13m"
	].join("\n"),
	[`${X}/.git/HEAD`]: "ref: refs/heads/main",
	[`${X}/.git/config`]: [
		"[core]",
		"	repositoryformatversion = 0",
		"[remote \"origin\"]",
		"	url = git@github.com:acme/ingest.git"
	].join("\n")
}, $n = [
	["Read", "src/main.py"],
	["Grep", "\"def handler\" (1 file)"],
	["Edit", "src/main.py · +1 -1"],
	["Bash", "pytest -q → 4 passed in 0.62s"]
], er = [
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
], tr = /* @__PURE__ */ new Map();
function nr(e, t) {
	let n = t ?? `mock-${Math.random().toString(36).slice(2, 8)}`;
	return {
		url: `${Yn}//${e}?shell=${encodeURIComponent(n)}`,
		shellId: n
	};
}
function rr(e) {
	let t = [], n = /"([^"]*)"|'([^']*)'|(\S+)/g, r = n.exec(e);
	for (; r;) t.push(r[1] ?? r[2] ?? r[3] ?? ""), r = n.exec(e);
	return t;
}
function ir(e, t) {
	let n = t === "~" ? X : t.startsWith("~/") ? `${X}/${t.slice(2)}` : t, r = n.startsWith("/") ? "" : e, i = [];
	for (let e of `${r}/${n}`.split("/")) if (e !== "" && e !== ".") {
		if (e === "..") {
			i.pop();
			continue;
		}
		i.push(e);
	}
	return `/${i.join("/")}`;
}
function ar(e) {
	return e.endsWith("/") ? `${Z.bold}${Z.blue}${e.slice(0, -1)}${Z.reset}` : e;
}
var or = class extends EventTarget {
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
		this.shellId = new URLSearchParams(t < 0 ? "" : e.slice(t + 1)).get("shell") ?? "mock-shell", this.session = tr.get(this.shellId) ?? {
			cwd: X,
			attached: !1
		}, tr.set(this.shellId, this.session), this.later(() => this.handshake(), 60);
	}
	send(e) {
		if (this.readyState !== this.OPEN) return;
		let t = sr(e);
		if (!t || t.length === 0) return;
		let n = t[0];
		if (n === B.CLOSE) {
			this.exit(0);
			return;
		}
		n === B.STDIN && this.feed(this.decoder.decode(t.subarray(1)));
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
		this.readyState = this.OPEN, this.frame(B.STATUS, JSON.stringify({ metadata: {
			shellId: this.shellId,
			reconnected: this.session.attached
		} })), this.write(this.session.attached ? `${Z.dim}reattached to ${this.shellId}${Z.reset}\r\n` : [
			`${Z.green}AgentCore devbox${Z.reset} ${Z.dim}· simulated shell, no runtime attached${Z.reset}`,
			`${Z.dim}Type ${Z.reset}help${Z.dim} for what this box understands.${Z.reset}`,
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
		this.frame(B.STDOUT, e);
	}
	fail(e) {
		this.frame(B.STDERR, `${Z.red}${e}${Z.reset}\r\n`);
	}
	prompt() {
		this.write(`${Z.green}${Xn}${Z.reset}:${Z.bold}${Z.blue}${this.session.cwd}${Z.reset}$ `);
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
		this.frame(B.STATUS, JSON.stringify({ details: { causes: [{
			reason: "ExitCode",
			message: String(e)
		}] } })), tr.delete(this.shellId), this.close(1e3, "shell exited");
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
					this.write(Z.clear), this.prompt(), this.write(this.line);
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
			await this.dispatch(rr(t));
		} finally {
			this.busy = !1, this.readyState === this.OPEN && this.prompt();
		}
	}
	async dispatch(e) {
		let [t, ...n] = e;
		switch (t) {
			case "help":
				this.write(`${er.join("\r\n")}\r\n`);
				return;
			case "clear":
				this.write(Z.clear);
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
			default: this.fail(`bash: ${t}: command not found`), this.write(`${Z.dim}exit 127${Z.reset}\r\n`);
		}
	}
	list(e) {
		let t = ir(this.session.cwd, e.find((e) => !e.startsWith("-")) ?? "."), n = Zn[t];
		if (!n) {
			if (Qn[t] !== void 0) {
				this.write(`${t}\r\n`);
				return;
			}
			this.fail(`ls: cannot access '${t}': No such file or directory`);
			return;
		}
		let r = e.some((e) => e.startsWith("-") && e.includes("a")) ? n : n.filter((e) => !e.startsWith("."));
		this.write(`${r.map(ar).join("  ")}\r\n`);
	}
	chdir(e) {
		let t = ir(this.session.cwd, e[0] ?? "~");
		if (!Zn[t]) {
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
			let e = ir(this.session.cwd, t), n = Qn[e];
			if (n === void 0) {
				this.fail(Zn[e] ? `cat: ${t}: Is a directory` : `cat: ${t}: No such file or directory`);
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
			let r = ir(this.session.cwd, t), i = Qn[r];
			if (i === void 0) {
				this.fail(`${e}: cannot open '${t}' for reading: ${Zn[r] ? "Is a directory" : "No such file or directory"}`);
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
				`  ${Z.dim}(use "git add <file>..." to update what will be committed)${Z.reset}`,
				`\t${Z.red}modified:   src/main.py${Z.reset}`,
				"",
				"no changes added to commit",
				""
			].join("\r\n"));
			return;
		}
		if (e[0] === "log") {
			this.write([
				`${Z.yellow}9f2c1ab${Z.reset} wire up the ingest handler`,
				`${Z.yellow}3ad77e0${Z.reset} cover the empty-body case`,
				`${Z.yellow}b41e902${Z.reset} scaffold the service`,
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
		this.write(`${Z.magenta}✻${Z.reset} ${Z.dim}${t}${Z.reset}\r\n`);
		for (let [e, t] of $n) {
			if (await this.wait(520), this.cancelled || this.readyState !== this.OPEN) return;
			this.write(`  ${Z.cyan}⏺${Z.reset} ${Z.bold}${e}${Z.reset}(${t})\r\n`);
		}
		await this.wait(420), !(this.cancelled || this.readyState !== this.OPEN) && this.write(`${Z.green}✓${Z.reset} done · ${$n.length + 1} turns · 6.4s · ${Z.yellow}$0.0184${Z.reset}\r\n`);
	}
};
function sr(e) {
	return ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : e instanceof ArrayBuffer ? new Uint8Array(e) : null;
}
var cr = null;
function lr(e = {}) {
	let t = e.scheme ?? "mock-shell:", n = globalThis.WebSocket;
	if (typeof n != "function") return () => {};
	if (cr) cr.count += 1;
	else {
		class e extends n {
			constructor(e, n) {
				let r = typeof e == "string" ? e : e.href;
				if (r.startsWith(t)) return new or(r);
				super(e, n);
			}
		}
		globalThis.WebSocket = e, cr = {
			native: n,
			count: 1
		};
	}
	let r = !1;
	return () => {
		r || !cr || (r = !0, --cr.count, !(cr.count > 0) && (globalThis.WebSocket = cr.native, cr = null, tr.clear()));
	};
}
//#endregion
//#region src/components/compute/fixtures/mockTail.ts
var ur = "mock-tail:", dr = (e) => ({
	type: "assistant",
	message: { content: [{
		type: "text",
		text: e
	}] }
}), Q = (e, t) => ({
	type: "assistant",
	message: { content: [{
		type: "tool_use",
		name: e,
		input: t
	}] }
}), fr = [
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
				data: dr("Reading the lockfile and resolving the dependency graph.")
			},
			{
				afterMs: 1300,
				data: Q("Bash", { command: "npm audit --json" })
			},
			{
				afterMs: 2100,
				data: dr("3 advisories: 1 high, 2 moderate. Checking whether the high one is reachable.")
			},
			{
				afterMs: 1700,
				data: Q("Grep", { pattern: "serialize-javascript" })
			},
			{
				afterMs: 2400,
				data: dr("Reachable from the report renderer only. Bumping it and pinning the transitive.")
			},
			{
				afterMs: 1400,
				data: Q("Edit", { file: "package.json" })
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
				data: dr("Pulling the last 40 CI runs.")
			},
			{
				afterMs: 1500,
				data: Q("Bash", { command: "gh run list --limit 40" })
			},
			{
				afterMs: 2300,
				data: dr("Two suites flap: session-epoch and the canary rollup. Both look time-dependent.")
			},
			{
				afterMs: 1900,
				data: Q("Read", { file: "src/lib/__tests__/session-epoch.test.ts" })
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
				data: dr("Dumping the live schema.")
			},
			{
				afterMs: 1600,
				data: Q("Bash", { command: "psql -c \"\\d+ public.*\"" })
			},
			{
				afterMs: 2400,
				data: dr("One table differs: environments has a column the checked-in DDL does not.")
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
], pr = (...e) => Q("TodoWrite", { todos: e.map(([e, t, n]) => ({
	content: e,
	status: t,
	...n ? { activeForm: n } : {}
})) }), mr = [
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
				data: pr([
					"Read the login route",
					"in_progress",
					"Reading the login route"
				], ["Add a limiter middleware", "pending"], ["Write tests", "pending"], ["Open a pull request", "pending"])
			},
			{
				afterMs: 900,
				data: Q("Read", { file_path: "src/routes/login.ts" })
			},
			{
				afterMs: 1100,
				data: pr(["Read the login route", "completed"], [
					"Add a limiter middleware",
					"in_progress",
					"Adding the limiter middleware"
				], ["Write tests", "pending"], ["Open a pull request", "pending"])
			},
			{
				afterMs: 1300,
				data: Q("Edit", { file_path: "src/routes/login.ts" })
			},
			{
				afterMs: 1200,
				data: Q("Bash", { command: "npm test -- login" })
			},
			{
				afterMs: 1400,
				data: pr(["Read the login route", "completed"], ["Add a limiter middleware", "completed"], ["Write tests", "completed"], [
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
function hr(e, t) {
	return `${ur}//${e}${t ? `?script=${encodeURIComponent(t)}` : ""}`;
}
function gr(e) {
	let t = /script=([^&]+)/.exec(e)?.[1];
	if (t) {
		let e = [...fr, ...mr].find((e) => e.id === decodeURIComponent(t));
		if (e) return e;
	}
	let n = e.slice(10).replace(/^\/+/, "").split("?")[0] ?? "", r = 0;
	for (let e of n) r = r * 31 + e.charCodeAt(0) >>> 0;
	return fr[r % fr.length];
}
var _r = class {
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
		let n = gr(e), r = 0;
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
}, $ = null;
function vr(e = {}) {
	let t = e.scheme ?? "mock-tail:", n = globalThis.EventSource;
	if ($) $.count += 1;
	else {
		$ = {
			native: n,
			count: 1
		};
		let e = function(e, r) {
			if (typeof e == "string" && e.startsWith(t)) return new _r(e, r);
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
		$ && (--$.count, !($.count > 0) && ($.native ? globalThis.EventSource = $.native : delete globalThis.EventSource, $ = null));
	};
}
//#endregion
export { Ue as AGENT_PANE_KIND, xe as AGENT_STATUSES, pe as ATTENTION_ORDER, Pe as AgentPane, O as COMPUTE_STATUS, dt as COMPUTE_STORAGE_KEYS, Vn as ComputeDock, ot as ComputeProvider, En as ComputerLab, ae as DEFAULT_IDLE_WINDOW_MS, cn as DEFAULT_KEYMAP, Me as DEFAULT_PANE_KINDS, ct as DETACH_BYTE, gt as DOCK_STORAGE_KEY, Fe as FLEET_STORAGE_KEY, Le as HEARTBEAT_MS, mt as LAB_LAYOUT_STORAGE_KEY, Ze as LOGS_PANE_KIND, Sn as LabChooser, Yt as LabFleetRail, tn as LabHeader, Ge as LabInstructContext, rn as LabPaneToolbar, yn as LabRail, pt as LogsPane, ze as MAX_FRAME_BYTES, St as MAX_RATIO, $e as MAX_RETRIES, st as MAX_SHELLS, xt as MIN_RATIO, Yn as MOCK_SHELL_SCHEME, mr as MOCK_TAIL_DEMO_SCRIPTS, ur as MOCK_TAIL_SCHEME, fr as MOCK_TAIL_SCRIPTS, In as MachinePresenceMenu, re as PaneStatusLine, Cn as PaneTreeView, _n as ProjectSummary, B as SHELL_CHANNEL, it as SHELL_PANE_KIND, ne as SHELL_STATUS, qe as ShellTerminal, Ie as TAIL_PANE_KIND, sn as TMUX_LEADER, Te as TailPane, D as UNASSIGNED_PROJECT_ID, Wn as WORKSPACE_ENTRY_CAP, Hn as WORKSPACE_FIND_COMMAND, Un as WORKSPACE_GIT_COMMAND, on as WorkspacePane, It as arrangePanes, Gn as buildWorkspaceTree, j as byAttention, we as byteRate, N as clearComputeStorage, le as clockTime, Ve as closeAdvice, Dt as closePane, Xe as closeShell, qn as countDescendants, Tt as countPanes, ue as createComputeClient, ft as currentRun, rt as cycleLayout, Mt as cyclePane, We as cycleShell, Ut as defaultKindFor, Ee as deliveryStep, P as elapsed, Nt as enclosingSplit, R as encodeFrame, Ae as encodeResize, ut as exhaustedAdvice, ht as exitCodeOf, k as expiryPressure, wt as findLeaf, De as fixtureComputers, ke as fixtureMachines, Se as fixtureModels, oe as fixtureRuntimeStatus, L as fixtureWorkspace, Ne as focusShell, fe as formatRate, T as formatTokens, xn as fuzzyScore, me as gateStep, Qe as getDock, fn as groupBindings, Jt as groupQuickLine, _e as hasAgent, lr as installMockShellSocket, vr as installMockTailSource, ln as isLeaderKey, Ce as isLocalComputer, Ht as kindsFor, pn as labelFor, de as latestPlan, At as layoutRects, Y as listLeaves, Ct as makeLeaf, dn as matchBinding, un as matchLeaderBinding, _t as matchesQuery, Mn as memorySummary, nr as mockShellUrl, hr as mockTailUrl, jt as neighborPane, Wt as nextKind, at as openShell, ge as parsePlan, be as pendingQuestion, Nn as providerSummary, Gt as quotaUsage, Pt as ratioOf, I as reconcileDock, he as reduceTailFrame, Je as reportShellStatus, Vt as resolveKind, E as rollUpProjects, ve as runInstructionAsTasks, lt as selectShellByIndex, Re as setDockVisible, Be as setGeometry, et as setMode, Ot as setRatio, ie as shortModelName, V as showsAllPanes, Et as splitPane, A as statusOf, Ke as stepLevel, se as stepSource, He as subscribeDock, ce as summarizeFleet, tt as summarizeTool, z as toggleFloating, M as toolStep, kt as updateLeaf, Ye as useCompute, je as useComputeFleet, nt as useComputeOptional, w as useComputeProjects, F as useComputeTail, Oe as useComputeTask, ye as useLabInstruct, Bt as useLabLayout, te as useProjectRollups, Jn as visibleRows };
