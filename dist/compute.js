import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-C2OEUpX-.js";
import { t as n } from "./Chip-0zFpfJ52.js";
import { B as r, K as i, L as a, O as o, R as s, U as c, Y as l, b as u, h as d, ht as f, m as p, nt as m, tt as h } from "./Icons-B_xESAH3.js";
import { t as g } from "./TitledFrame-B0QW93da.js";
import { t as _ } from "./DotMeter-KxyExwVb.js";
import { t as v } from "./StatusDot-ClFcLvD7.js";
import { t as y } from "./SearchInput-8LpHL-oD.js";
import { n as b, t as x } from "./DropdownMenu-BS-H0H0p.js";
import { t as S } from "./SectionLabel-Bn8Vvb-K.js";
import { t as C } from "./InlinePlaceholder-CbIBYc-_.js";
import { n as ee } from "./FloatingPanel-CP5vaOcJ.js";
import { a as te, i as w, n as T, r as E, t as ne } from "./useComputeProjects-ZSazDRet.js";
import { a as re, i as D, n as ie, o as O, r as ae, s as k, t as oe } from "./PaneStatusLine-m8wKbLkz.js";
import { $ as se, A as ce, B as le, C as A, D as ue, E as de, F as fe, G as pe, H as me, I as he, J as j, K as M, L as ge, M as _e, N as ve, O as ye, P as be, Q as xe, R as Se, S as Ce, T as N, U as P, V as F, W as we, X as Te, Y as I, Z as Ee, _ as De, a as Oe, at as ke, b as Ae, c as je, ct as Me, d as Ne, dt as Pe, et as L, f as Fe, ft as Ie, g as R, h as Le, i as Re, it as z, j as B, k as ze, l as Be, lt as Ve, m as V, n as He, nt as Ue, o as We, ot as Ge, p as H, pt as Ke, q as qe, r as Je, rt as Ye, s as Xe, st as Ze, t as Qe, tt as $e, u as et, ut as tt, v as nt, w as rt, x as it, y as at, z as ot } from "./ComputeContext-ByG0RfLD.js";
import { Fragment as st, useCallback as U, useEffect as W, useMemo as G, useRef as K, useState as q, useSyncExternalStore as ct } from "react";
import { Fragment as lt, jsx as J, jsxs as Y } from "react/jsx-runtime";
//#region src/components/compute/lib/paneTree.ts
var ut = .1, dt = .9;
function ft(e, t, n) {
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
function pt(e, t) {
	return X(e).find((e) => e.id === t) ?? null;
}
function mt(e) {
	return X(e).length;
}
function ht(e, t, n, r, i) {
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
function gt(e, t) {
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
function _t(e, t, n) {
	let r = Math.min(dt, Math.max(ut, n)), i = (e) => e.kind === "leaf" ? e : e.id === t ? {
		...e,
		ratio: r
	} : {
		...e,
		a: i(e.a),
		b: i(e.b)
	};
	return i(e);
}
function vt(e, t, n) {
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
function yt(e, t = {
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
		return [...yt(e.a, {
			...t,
			width: n
		}), ...yt(e.b, {
			...t,
			x: t.x + n,
			width: t.width - n
		})];
	}
	let i = t.height * r;
	return [...yt(e.a, {
		...t,
		height: i
	}), ...yt(e.b, {
		...t,
		y: t.y + i,
		height: t.height - i
	})];
}
function bt(e, t, n) {
	let r = yt(e), i = r.find((e) => e.id === t);
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
function xt(e, t, n) {
	let r = yt(e);
	if (r.length < 2) return null;
	let i = r.findIndex((e) => e.id === t);
	return i < 0 ? r[0]?.id ?? null : r[(i + n + r.length) % r.length]?.id ?? null;
}
function St(e, t, n) {
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
function Ct(e, t) {
	return e.kind === "leaf" ? null : e.id === t ? e.ratio : Ct(e.a, t) ?? Ct(e.b, t);
}
function wt(e, t, n) {
	let [r, ...i] = e;
	if (!r) throw Error("chain() needs at least one pane");
	if (i.length === 0) return r;
	let a = Math.min(dt, Math.max(ut, 1 / e.length));
	return {
		kind: "split",
		id: n(),
		direction: t,
		ratio: a,
		a: r,
		b: wt(i, t, n)
	};
}
function Tt(e, t, n) {
	let r = X(e);
	if (r.length < 2) return e;
	if (t === "rows") return wt(r, "column", n);
	if (t === "columns") return wt(r, "row", n);
	let [i, ...a] = r;
	return {
		kind: "split",
		id: n(),
		direction: "row",
		ratio: .5,
		a: i,
		b: wt(a, "column", n)
	};
}
//#endregion
//#region src/components/compute/hooks/useLabLayout.ts
var Et = 0, Dt = (e) => `${e}-${(Et += 1).toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
function Ot() {
	let e = {
		windows: [],
		activeWindowId: null,
		activePaneId: null,
		zoomedPaneId: null
	};
	try {
		let t = globalThis.localStorage?.getItem(Pe);
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
function kt() {
	let [e, t] = q(Ot);
	W(() => {
		try {
			globalThis.localStorage?.setItem(Pe, JSON.stringify(e));
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
		let i = ft(Dt("pane"), n, r);
		a((n) => {
			let r = e.activePaneId && pt(n, e.activePaneId) ? e.activePaneId : X(n)[0]?.id;
			return r ? ht(n, r, t, i, Dt("split")) : n;
		}, () => ({
			activePaneId: i.id,
			zoomedPaneId: null
		}));
	}, [a, e.activePaneId]), c = U(() => {
		t((e) => {
			let t = e.windows.find((t) => t.id === e.activeWindowId) ?? e.windows[0];
			if (!t || !e.activePaneId) return e;
			if (mt(t.root) <= 1) {
				let n = e.windows.filter((e) => e.id !== t.id), r = n[0] ?? null;
				return {
					windows: n,
					activeWindowId: r?.id ?? null,
					activePaneId: r ? X(r.root)[0]?.id ?? null : null,
					zoomedPaneId: null
				};
			}
			let n = gt(t.root, e.activePaneId), r = X(n);
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
	}, []), l = U((e, t) => a((n) => vt(n, e, { computerId: t })), [a]), u = U((e, t) => a((n) => vt(n, e, { kindId: t })), [a]), d = U((e, t) => a((n) => _t(n, e, t)), [a]), f = U((e) => {
		t((t) => {
			let n = t.windows.find((e) => e.id === t.activeWindowId) ?? t.windows[0];
			if (!n || !t.activePaneId) return t;
			let r = bt(n.root, t.activePaneId, e);
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
			let r = xt(n.root, t.activePaneId, e);
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
	}, []), h = U((e) => a((t) => Tt(t, e, () => Dt("split")), () => ({ zoomedPaneId: null })), [a]), g = U((e, n) => {
		let r = ft(Dt("pane"), e, n), i = {
			id: Dt("win"),
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
			let r = ft(Dt("pane"), e, n), i = {
				id: Dt("win"),
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
				for (let r of X(i.root)) n.has(r.computerId) || (t = !0, e = mt(e) <= 1 ? e : gt(e, r.id));
				if (mt(e) === 1 && !n.has(X(e)[0].computerId)) {
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
function At(e, t) {
	return e.find((e) => e.id === t) ?? e[0] ?? null;
}
function jt(e, t) {
	return t ? e.filter((e) => !e.appliesTo || e.appliesTo(t)) : [...e];
}
function Mt(e, t) {
	return jt(e, t)[0] ?? e[0] ?? null;
}
function Nt(e, t, n) {
	let r = n ? jt(e, n) : e;
	return r.length === 0 ? null : r[(r.findIndex((e) => e.id === t) + 1) % r.length] ?? null;
}
function Pt(e, t, n) {
	return t.filter((t) => At(e, t)?.quota === n).length;
}
//#endregion
//#region src/components/compute/components/LabFleetRail.tsx
var Ft = {
	waiting: "text-warning",
	running: "text-primary",
	error: "text-danger",
	idle: "text-success",
	stopped: "text-text-tertiary"
};
function It(e, t) {
	return t || !Number.isInteger(e) ? `$${e.toFixed(2)}` : `$${e.toFixed(0)}`;
}
function Lt(e, t) {
	let n = [`${t} ${t === 1 ? "computer" : "computers"}`], r = e.spentUsd ?? e.liveSpendUsd;
	return typeof e.budgetUsd == "number" && e.budgetUsd > 0 ? n.push(`${It(r, !0)} / ${It(e.budgetUsd, !1)}`) : r > 0 && n.push(It(r, !0)), e.botCount && n.push(`${e.botCount} ${e.botCount === 1 ? "bot" : "bots"}`), n.join(" · ");
}
function Rt({ computers: t, activeComputerId: n, openComputerIds: r, selectedIds: i, onSelect: a, onOpenInPane: s, statusFilter: c = null, onStatusFilterChange: d, tab: f, onTabChange: m, onCreate: h, className: g }) {
	let [_, v] = q("computers"), b = f ?? _, S = (e) => {
		v(e), m?.(e);
	}, [C, ee] = q(""), [te, w] = q(/* @__PURE__ */ new Set()), T = G(() => new Set(r), [r]), E = Je(), re = E?.projects ?? [], ie = E?.projectsAbsent ?? !0, O = G(() => {
		let e = re.filter((e) => e.id !== "__unassigned__" && e.computers.length > 0);
		if (ie || e.length === 0) return [{
			id: "__all",
			name: "",
			quickLine: "",
			computers: t
		}];
		let n = e.map((e) => ({
			id: e.id,
			name: e.name,
			quickLine: Lt(e, e.computers.length),
			computers: e.computers
		})), r = new Set(n.flatMap((e) => e.computers.map((e) => e.id))), i = t.filter((e) => !r.has(e.id));
		if (i.length > 0) {
			let e = re.find((e) => e.id === ne);
			n.push({
				id: ne,
				name: "Unassigned",
				quickLine: Lt({
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
		re,
		ie,
		t
	]), ae = G(() => {
		let e = /* @__PURE__ */ new Map(), t = 0;
		for (let n of O) for (let r of n.computers) e.set(r.id, t += 1);
		return e;
	}, [O]), oe = U((e) => N(e, C) && (!c || k(e) === c), [C, c]), se = G(() => t.filter(A).sort(Ce), [t]), ce = [{
		label: "Show",
		items: [{
			label: "Every status",
			checked: !c,
			onSelect: () => d?.(null)
		}, ...[
			"waiting",
			"running",
			"error",
			"idle",
			"stopped"
		].map((e) => ({
			label: D[e].label,
			checked: c === e,
			onSelect: () => d?.(c === e ? null : e)
		}))]
	}], le = t.length === 0, ue = /* @__PURE__ */ Y("div", {
		"data-testid": "lab-fleet-empty",
		className: "px-3 py-4 flex flex-col items-start gap-2",
		children: [
			/* @__PURE__ */ J("div", {
				className: "text-[13px] font-semibold text-text-primary",
				children: "No computers in the lab"
			}),
			/* @__PURE__ */ J("div", {
				className: "text-[12px] text-text-secondary",
				children: h ? "Start a computer and it opens here in a pane." : "Nothing in the fleet is shared with you yet."
			}),
			h && /* @__PURE__ */ J("button", {
				type: "button",
				onClick: h,
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
				children: [/* @__PURE__ */ J(zt, {
					selected: b === "computers",
					onSelect: () => S("computers"),
					icon: /* @__PURE__ */ J(u, { size: 14 }),
					label: "Computers",
					count: t.length
				}), /* @__PURE__ */ J(zt, {
					selected: b === "agents",
					onSelect: () => S("agents"),
					icon: /* @__PURE__ */ J(l, { size: 14 }),
					label: "Agents",
					count: se.length
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
				}), d && /* @__PURE__ */ J(x, {
					trigger: /* @__PURE__ */ J(o, { size: 14 }),
					triggerLabel: "Filter by status",
					triggerTitle: c ? `Showing ${D[c].label}` : "Filter by status",
					triggerClassName: e(c && "text-primary border-primary"),
					align: "end",
					sections: ce,
					"data-testid": "lab-fleet-filter"
				})]
			}),
			b === "computers" ? /* @__PURE__ */ J(Bt, {
				label: "computers",
				emptyState: le ? ue : void 0,
				children: O.map((t) => {
					let r = t.computers.filter(oe);
					if (r.length === 0) return null;
					let o = te.has(t.id) && !C;
					return /* @__PURE__ */ Y("div", {
						role: "presentation",
						children: [t.name && /* @__PURE__ */ Y("button", {
							type: "button",
							tabIndex: -1,
							"aria-expanded": !o,
							onClick: () => w((e) => {
								let n = new Set(e);
								return n.has(t.id) ? n.delete(t.id) : n.add(t.id), n;
							}),
							"data-testid": "lab-fleet-group",
							className: "w-full flex items-start gap-1.5 px-2 pt-2.5 pb-1 text-left bg-transparent border-none cursor-pointer hover:bg-surface-hover",
							children: [/* @__PURE__ */ J(p, {
								size: 12,
								className: e("mt-0.5 shrink-0 text-text-tertiary transition-transform", o && "-rotate-90")
							}), /* @__PURE__ */ Y("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ J("span", {
									className: "block text-[12px] font-semibold text-text-primary truncate",
									children: t.name
								}), /* @__PURE__ */ J("span", {
									className: "block text-[11px] text-text-tertiary truncate tabular-nums",
									children: t.quickLine
								})]
							})]
						}), !o && r.map((e) => /* @__PURE__ */ J(Vt, {
							computer: e,
							number: ae.get(e.id) ?? 0,
							active: e.id === n,
							selected: i?.has(e.id) ?? !1,
							open: T.has(e.id),
							onSelect: a,
							onOpenInPane: s
						}, e.id))]
					}, t.id);
				})
			}) : /* @__PURE__ */ J(Bt, {
				label: "agents",
				children: se.filter(oe).map((e) => /* @__PURE__ */ J(Vt, {
					computer: e,
					number: ae.get(e.id) ?? 0,
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
function zt({ selected: t, onSelect: n, icon: r, label: i, count: a }) {
	return /* @__PURE__ */ Y("button", {
		type: "button",
		role: "tab",
		"aria-selected": t,
		onClick: n,
		className: e("flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-2 text-[12px] bg-transparent border-0 border-b-2 cursor-pointer transition-colors", t ? "border-primary text-text-primary font-semibold" : "border-transparent text-text-secondary hover:text-text-primary"),
		children: [
			r,
			i,
			/* @__PURE__ */ J("span", {
				className: "text-[11px] font-normal text-text-tertiary tabular-nums",
				children: a
			})
		]
	});
}
function Bt({ label: e, children: t, emptyState: n }) {
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
		"aria-label": e,
		onKeyDown: i,
		className: "flex-1 min-h-0 overflow-y-auto pb-2",
		children: a ? n ?? /* @__PURE__ */ J("div", {
			className: "px-3 py-2 text-[12px] text-text-tertiary",
			children: "Nothing matches."
		}) : t
	});
}
function Vt({ computer: t, number: n, active: r, selected: i, open: a, onSelect: o, onOpenInPane: c, showTask: l = !1 }) {
	let u = k(t), d = D[u], f = rt(t);
	return /* @__PURE__ */ Y("div", {
		role: "presentation",
		className: e("group relative flex items-stretch", r ? "bg-primary-bg" : i ? "bg-surface-hover" : "hover:bg-surface-hover"),
		children: [/* @__PURE__ */ Y("button", {
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
				/* @__PURE__ */ J("span", {
					className: "w-5 shrink-0 text-right text-[11px] text-text-tertiary tabular-nums leading-5",
					children: n
				}),
				/* @__PURE__ */ J("span", {
					className: "w-3.5 shrink-0 flex justify-center leading-5 pt-[5px]",
					children: f ? /* @__PURE__ */ J(s, {
						size: 14,
						"aria-label": `laptop · ${d.label}`,
						className: e("-mt-[2px]", Ft[u])
					}) : /* @__PURE__ */ J(v, {
						size: "xs",
						color: d.color,
						pulse: d.pulse,
						"aria-label": d.label
					})
				}),
				/* @__PURE__ */ Y("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ J("span", {
						className: e("block text-[12.5px] leading-5 truncate font-mono", r ? "text-text-primary font-semibold" : "text-text-secondary"),
						children: t.label
					}), l && /* @__PURE__ */ Y("span", {
						className: "block text-[11px] text-text-tertiary truncate",
						children: [/* @__PURE__ */ J("span", {
							className: e("font-semibold", Ft[u]),
							children: d.label
						}), t.currentTask ? ` · ${t.currentTask}` : ""]
					})]
				}),
				i && /* @__PURE__ */ J("span", {
					"aria-label": "selected as a target",
					className: "text-[11px] text-primary leading-5",
					children: "✓"
				}),
				a && /* @__PURE__ */ J("span", {
					"aria-label": "open in a pane",
					title: "Open in a pane",
					className: "text-[9px] text-primary leading-5",
					children: "▣"
				})
			]
		}), c && /* @__PURE__ */ J("button", {
			type: "button",
			tabIndex: -1,
			onClick: () => c(t),
			"aria-label": `Open ${t.label} in a new pane`,
			title: "Open in a new pane",
			className: e("px-2 shrink-0 bg-transparent border-none cursor-pointer text-text-tertiary hover:text-primary", r ? "opacity-100" : "opacity-0 group-hover:opacity-100 focus-visible:opacity-100"),
			children: /* @__PURE__ */ J(m, { size: 13 })
		})]
	});
}
//#endregion
//#region src/components/compute/components/LabWorkspaceChrome.tsx
var Ht = [
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
		status: "error",
		word: (e) => e === 1 ? "error" : "errors",
		tone: "danger",
		hint: "Show only computers whose last run failed"
	}
], Ut = {
	waiting: "needsYou",
	running: "running",
	error: "error"
};
function Wt({ title: r, summary: i, statusFilter: o, onStatusFilter: s, canCreate: c, onCreate: l, onKeys: u, keysOpen: d, keysChord: f, actions: p, leaderLabel: m }) {
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
				children: Ht.map(({ status: t, word: r, tone: a, hint: c }) => {
					let l = i[Ut[t]], u = o === t;
					return /* @__PURE__ */ J("button", {
						type: "button",
						"aria-pressed": u,
						onClick: () => s(u ? null : t),
						title: u ? "Show every computer" : c,
						"data-testid": `lab-pill-${t}`,
						className: e("rounded-full p-0 bg-transparent border-none cursor-pointer", "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary", l === 0 && !u && "opacity-60"),
						children: /* @__PURE__ */ Y(n, {
							size: "sm",
							tone: a,
							dot: "static",
							outline: u ? void 0 : "soft",
							solid: u,
							className: "tabular-nums",
							children: [
								l,
								" ",
								r(l)
							]
						})
					}, t);
				})
			}),
			m && /* @__PURE__ */ J("span", {
				"data-testid": "leader-armed",
				className: "animate-pulse",
				children: /* @__PURE__ */ Y(n, {
					size: "sm",
					tone: "caution",
					children: [m, " …"]
				})
			}),
			c && /* @__PURE__ */ Y(t, {
				size: "sm",
				variant: "primary",
				onClick: l,
				"data-testid": "lab-create",
				children: [/* @__PURE__ */ J(h, { size: 14 }), " Computer"]
			}),
			/* @__PURE__ */ Y(t, {
				size: "sm",
				variant: "secondary",
				onClick: u,
				"aria-pressed": d,
				title: `Keyboard shortcuts${f ? ` · ${f}` : ""}`,
				"data-testid": "lab-keys",
				children: [/* @__PURE__ */ J(a, { size: 14 }), " Keys"]
			}),
			p
		]
	});
}
function Gt({ label: t, onClick: n, pressed: r, disabled: i, children: a, testId: o }) {
	return /* @__PURE__ */ J("button", {
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
function Kt({ panes: t, onFocusPane: n, onAddPane: a, canAddPane: o, shellsOpen: s, maxShells: l, onArrange: u, zoomed: d, onToggleZoom: p, moreSections: m }) {
	return /* @__PURE__ */ Y("div", {
		"data-testid": "lab-pane-toolbar",
		className: "flex items-center gap-1.5 px-2 py-1.5 shrink-0",
		children: [
			/* @__PURE__ */ J(x, {
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
			/* @__PURE__ */ J(Gt, {
				label: "Add a pane",
				onClick: a,
				disabled: !o,
				testId: "lab-add-pane",
				children: /* @__PURE__ */ J(h, { size: 14 })
			}),
			/* @__PURE__ */ J("span", { className: "flex-1" }),
			/* @__PURE__ */ Y("span", {
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
			/* @__PURE__ */ J(Gt, {
				label: "Arrange as a list",
				onClick: () => u("rows"),
				testId: "lab-arrange-rows",
				children: /* @__PURE__ */ J(r, { size: 14 })
			}),
			/* @__PURE__ */ J(Gt, {
				label: "Arrange as a split",
				onClick: () => u("main"),
				testId: "lab-arrange-main",
				children: /* @__PURE__ */ J(f, { size: 14 })
			}),
			/* @__PURE__ */ J(Gt, {
				label: d ? "Restore panes" : "Expand the focused pane",
				onClick: p,
				pressed: d,
				testId: "lab-zoom",
				children: /* @__PURE__ */ J(c, { size: 14 })
			}),
			/* @__PURE__ */ J(x, {
				trigger: /* @__PURE__ */ J(i, { size: 14 }),
				triggerLabel: "More lab commands",
				align: "end",
				sections: m,
				"data-testid": "lab-more-menu"
			})
		]
	});
}
var qt = {
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
function Jt({ computer: t, kind: r, kinds: a, onSwitchKind: o, active: s, zoomed: l, broadcasting: u, models: f, onFocus: p, onClose: m, onToggleZoom: h, moreSections: g, children: _ }) {
	let y = k(t), b = D[y], S = qt[y];
	return /* @__PURE__ */ Y("section", {
		"aria-label": `${r.title ?? r.label} · ${t.label}`,
		"data-testid": "lab-pane",
		"data-active": s || void 0,
		onMouseDown: p,
		onFocusCapture: p,
		className: e("@container flex flex-col flex-1 min-w-0 min-h-0 h-full rounded-lg border overflow-hidden bg-surface", s ? "border-primary" : "border-border"),
		children: [/* @__PURE__ */ Y("header", {
			className: "shrink-0 flex flex-col gap-0.5 px-2.5 py-1.5 border-b border-border",
			children: [/* @__PURE__ */ Y("div", {
				className: "flex items-center gap-1.5 min-w-0",
				children: [
					/* @__PURE__ */ J(x, {
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
							items: a.map((e) => ({
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
						className: "text-text-tertiary",
						children: "·"
					}),
					/* @__PURE__ */ J(v, {
						size: "xs",
						color: b.color,
						pulse: b.pulse,
						"aria-label": b.label
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
							tone: S.tone,
							outline: "soft",
							children: S.label
						})
					}),
					l && /* @__PURE__ */ J("span", {
						className: "text-[11px] text-text-tertiary",
						children: "expanded"
					}),
					/* @__PURE__ */ J("span", { className: "flex-1" }),
					/* @__PURE__ */ J("button", {
						type: "button",
						onClick: h,
						"aria-label": l ? `Restore ${t.label}` : `Expand ${t.label}`,
						title: l ? "Restore" : "Expand",
						className: "hidden @[16rem]:inline-flex p-1 rounded bg-transparent border-none cursor-pointer text-text-tertiary hover:text-text-primary hover:bg-surface-hover",
						children: /* @__PURE__ */ J(c, { size: 13 })
					}),
					/* @__PURE__ */ J(x, {
						trigger: /* @__PURE__ */ J(i, { size: 13 }),
						triggerLabel: `More for ${t.label}`,
						triggerVariant: "link",
						align: "end",
						sections: g
					}),
					/* @__PURE__ */ J("button", {
						type: "button",
						onClick: m,
						"aria-label": `Close pane ${t.label}`,
						title: "Close pane",
						className: "p-1 rounded bg-transparent border-none cursor-pointer text-text-tertiary hover:text-danger hover:bg-surface-hover",
						children: /* @__PURE__ */ J(d, { size: 13 })
					})
				]
			}), /* @__PURE__ */ J(ie, {
				variant: "meta",
				computer: t,
				models: f,
				broadcasting: u,
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
var Yt = {
	key: "b",
	ctrl: !0,
	label: "⌃B"
}, Xt = [
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
function Zt(e, t) {
	return !e || e.key.toLowerCase() !== t.key.toLowerCase() ? !1 : !!e.ctrl === t.ctrlKey && !!e.meta === t.metaKey && !!e.alt === t.altKey;
}
function Qt(e, t) {
	let n = t.key.toLowerCase();
	return e.find((e) => e.leaderKey && e.leaderKey.toLowerCase() === n)?.command ?? null;
}
function $t(e, t) {
	let n = t.metaKey || t.ctrlKey;
	for (let r of e) if (r.key.toLowerCase() === t.key.toLowerCase() && !!(r.meta || r.ctrl) === n && !!r.shift === t.shiftKey && !!r.alt === t.altKey) return r.command;
	return null;
}
function en(e) {
	return [
		"panes",
		"navigate",
		"lab"
	].map((t) => ({
		group: t,
		bindings: e.filter((e) => e.group === t)
	})).filter((e) => e.bindings.length > 0);
}
function tn(e, t) {
	return e.find((e) => e.command === t)?.label ?? null;
}
//#endregion
//#region src/components/compute/lib/chromeTokens.ts
var nn = {
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
function rn(e) {
	return e === "app" ? nn : void 0;
}
//#endregion
//#region src/components/compute/components/ProjectSummary.tsx
function an(e) {
	let t = Math.max(0, Math.round(e / 6e4));
	return t < 60 ? `${t}m` : `${Math.floor(t / 60)}h ${String(t % 60).padStart(2, "0")}m`;
}
function on({ project: t, showMeter: r = !0, className: i, "data-testid": a }) {
	let { budgetUsd: o, spentUsd: s, maintenanceUsd: c, tokensUsed: l, tokenBudget: u } = t, d = typeof o == "number" && o > 0, f = s ?? t.liveSpendUsd, p = d ? f / o : 0, m = d && c ? c / o : null, h = t.computers.length, g = t.id === ne;
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
					l != null && /* @__PURE__ */ Y(lt, { children: [/* @__PURE__ */ J("span", {
						"aria-hidden": "true",
						className: "text-code-raised",
						children: "│"
					}), /* @__PURE__ */ Y("span", {
						className: "text-code-muted tabular-nums shrink-0",
						title: u ? `${l} of ${u} tokens` : `${l} tokens`,
						children: [
							T(l),
							u ? /* @__PURE__ */ Y("span", {
								className: "text-code-raised",
								children: ["/", T(u)]
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
						children: ["⟳ ", an(t.soonestExpiryMs)]
					})
				]
			}),
			r && d && /* @__PURE__ */ J(_, {
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
var sn = {
	waiting: 0,
	error: 1,
	running: 2,
	idle: 3,
	stopped: 4
};
function cn({ computers: t, activeComputerId: r, openComputerIds: i, onSelect: a, onOpenInPane: o, onWatch: s, onCreate: c, onOpenMenu: l, showAllActivity: u, onToggleShowAll: d, canManage: f = !1, models: p = [], className: m }) {
	let h = new Set(i), g = t.filter((e) => {
		let t = k(e);
		return t === "running" || t === "waiting" || t === "error";
	}), _ = [...u ? t : g].sort((e, t) => (sn[k(e)] ?? 9) - (sn[k(t)] ?? 9)), v = Je(), y = v?.projects ?? [], b = v?.projectsAbsent ?? !0, x = y.filter((e) => e.id !== "__unassigned__" && e.computers.length > 0), S = y.find((e) => e.id === ne), C = !b && x.length > 0 ? [...x.map((e) => ({
		id: e.id,
		computers: e.computers,
		heading: /* @__PURE__ */ Y("div", {
			role: "presentation",
			className: "px-3 pt-2 pb-1 border-t border-code-border first:border-t-0 first:pt-1",
			children: [/* @__PURE__ */ J("span", {
				className: "block text-[11px] font-mono text-code-subtle truncate",
				children: e.name
			}), /* @__PURE__ */ J(on, {
				project: e,
				showMeter: !1,
				className: "mt-0.5"
			})]
		})
	})), ...S && S.computers.length > 0 ? [{
		id: ne,
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
			/* @__PURE__ */ J(ln, {
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
						type: "button",
						onClick: l,
						"aria-label": "Keyboard shortcuts",
						title: "Keyboard shortcuts",
						className: "text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer p-0 hover:text-code-text",
						children: "keys"
					})
				]
			}),
			/* @__PURE__ */ J(ln, {
				title: "agents",
				count: g.length,
				rows: _,
				activeId: r,
				onSelect: a,
				onOpenInPane: o ?? null,
				open: h,
				action: /* @__PURE__ */ J("button", {
					type: "button",
					onClick: d,
					"aria-pressed": u,
					title: u ? "Show only boxes doing something" : "Show every box",
					className: e("text-[11px] font-mono bg-transparent border-none cursor-pointer p-0", u ? "text-code-blue" : "text-code-muted hover:text-code-text"),
					children: "all"
				}),
				onWatch: s ?? null,
				renderSub: (e) => {
					let t = k(e), r = e.lastResult ? ae(null, p) : null;
					return /* @__PURE__ */ Y("span", {
						className: "flex items-center gap-1 truncate",
						children: [
							/* @__PURE__ */ J(n, {
								size: "xs",
								mono: !0,
								tone: D[t].tone,
								className: "bg-transparent px-0",
								children: D[t].label
							}),
							e.currentTask && /* @__PURE__ */ Y(lt, { children: [/* @__PURE__ */ J("span", {
								"aria-hidden": "true",
								className: "text-code-raised",
								children: "·"
							}), /* @__PURE__ */ J("span", {
								className: "truncate text-code-comment",
								children: e.currentTask
							})] }),
							!e.currentTask && r && /* @__PURE__ */ Y(lt, { children: [/* @__PURE__ */ J("span", {
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
function ln({ title: t, count: n, rows: r, activeId: i, open: a, onSelect: o, onOpenInPane: s, action: c, renderSub: l, onWatch: u = null, groups: d = null }) {
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
		let n = k(t), r = D[n], c = t.id === i;
		return /* @__PURE__ */ Y("div", {
			role: "presentation",
			className: e("group relative flex items-stretch", c ? "bg-code-surface" : "hover:bg-code-surface/60"),
			children: [/* @__PURE__ */ Y("button", {
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
					/* @__PURE__ */ J(v, {
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
function un(e, t) {
	if (!t) return 0;
	let n = e.toLowerCase(), r = t.toLowerCase(), i = 0, a = 0, o = -1;
	for (let e of r) {
		let t = n.indexOf(e, i);
		if (t < 0) return null;
		a += o >= 0 ? t - o - 1 : t, o = t, i = t + 1;
	}
	return a;
}
function dn({ open: t, onClose: r, computers: i, panes: a, onJumpToPane: o, onRetarget: s, onOpenInSplit: c, projects: l = [], onSelectProject: u, chrome: d = "code" }) {
	let [f, p] = q(""), [m, h] = q(0), g = K(null), _ = K(null), y = G(() => new Map(i.map((e) => [e.id, e])), [i]), b = G(() => {
		let e = [];
		for (let t of a) {
			let n = y.get(t.computerId);
			if (!n) continue;
			let r = un(`${n.label} ${t.kindId}`, f);
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
			let r = un(`${e.label} ${e.sessionId}`, f);
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
			let t = un(e.name, f);
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
		y,
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
		h((e) => Math.min(e, Math.max(0, b.length - 1)));
	}, [b.length]), W(() => {
		_.current?.querySelector("[data-highlighted=\"true\"]")?.scrollIntoView({ block: "nearest" });
	}, [m]), !t) return null;
	let x = (e, t) => {
		e && (e.kind === "project" ? u?.(e.project) : e.kind === "pane" ? o(e.pane.id) : t ? c(e.computer) : s(e.computer), r());
	};
	return /* @__PURE__ */ J("div", {
		className: "absolute inset-0 z-20 flex items-start justify-center pt-[12vh] bg-code-bg/70",
		onClick: r,
		children: /* @__PURE__ */ Y("div", {
			style: rn(d),
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
						ref: g,
						value: f,
						onChange: (e) => {
							p(e.target.value), h(0);
						},
						onKeyDown: (e) => {
							e.key === "ArrowDown" || e.key === "n" && e.ctrlKey ? (e.preventDefault(), h((e) => b.length ? (e + 1) % b.length : 0)) : e.key === "ArrowUp" || e.key === "p" && e.ctrlKey ? (e.preventDefault(), h((e) => b.length ? (e - 1 + b.length) % b.length : 0)) : e.key === "Enter" ? (e.preventDefault(), x(b[m], e.shiftKey)) : e.key === "Escape" && (e.preventDefault(), r());
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
				"aria-label": "Results",
				className: "max-h-[46vh] overflow-y-auto",
				children: b.length === 0 ? /* @__PURE__ */ Y("div", {
					className: "px-3 py-4 text-[11px] text-code-raised",
					children: [
						"nothing matches “",
						f,
						"”"
					]
				}) : b.map((t, r) => {
					let i = r === m;
					if (t.kind === "project") return /* @__PURE__ */ Y("div", {
						role: "option",
						"aria-selected": i,
						"data-highlighted": i,
						onMouseEnter: () => h(r),
						onClick: () => x(t, !1),
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
						}), /* @__PURE__ */ J(on, {
							project: t.project,
							showMeter: !1,
							className: "pl-1"
						})]
					}, t.id);
					let a = k(t.computer), o = D[a];
					return /* @__PURE__ */ Y("div", {
						role: "option",
						"aria-selected": i,
						"data-highlighted": i,
						onMouseEnter: () => h(r),
						onClick: (e) => x(t, e.shiftKey),
						className: e("flex items-center gap-2 px-3 py-1.5 cursor-pointer border-l-2", i ? "bg-code-surface border-code-blue" : "bg-transparent border-transparent"),
						children: [
							/* @__PURE__ */ J(v, {
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
function fn({ node: t, activePaneId: n, zoomedPaneId: r = null, renderLeaf: i, onRatioChange: a, gutter: o = "tight", className: s }) {
	if (r) {
		let n = pn(t, r);
		if (n) return /* @__PURE__ */ J("div", {
			className: e("flex min-h-0 min-w-0", s),
			children: i(n)
		});
	}
	return /* @__PURE__ */ J("div", {
		className: e("flex min-h-0 min-w-0", s),
		children: /* @__PURE__ */ J(mn, {
			node: t,
			activePaneId: n,
			renderLeaf: i,
			onRatioChange: a,
			gutter: o
		})
	});
}
function pn(e, t) {
	return e.kind === "leaf" ? e.id === t ? e : null : pn(e.a, t) ?? pn(e.b, t);
}
function mn({ node: t, activePaneId: n, renderLeaf: r, onRatioChange: i, gutter: a }) {
	let o = K(null), s = U((e) => {
		if (t.kind !== "split") return;
		let n = o.current;
		if (!n) return;
		e.preventDefault();
		let r = t.direction === "row", a = (e) => {
			let a = n.getBoundingClientRect(), o = r ? a.width : a.height;
			if (o <= 0) return;
			let s = r ? e.clientX - a.left : e.clientY - a.top;
			i(t.id, Math.min(dt, Math.max(ut, s / o)));
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
				children: /* @__PURE__ */ J(mn, {
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
				"aria-valuemin": ut * 100,
				"aria-valuemax": dt * 100,
				tabIndex: 0,
				onPointerDown: s,
				onKeyDown: c,
				className: e("shrink-0 bg-transparent hover:bg-code-blue/40 focus-visible:bg-code-blue/60 focus:outline-none transition-colors", l ? e(a === "roomy" ? "w-2" : "w-1", "cursor-col-resize my-0.5") : e(a === "roomy" ? "h-2" : "h-1", "cursor-row-resize mx-0.5"))
			}),
			/* @__PURE__ */ J("div", {
				className: "flex flex-1 min-w-0 min-h-0",
				children: /* @__PURE__ */ J(mn, {
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
function hn({ open: t, onClose: n, focusComputerId: r = null, variant: i = "overlay", chrome: a = "app", keymap: o = Xt, leader: s = null, idleWindowMs: c = oe, appearance: l = "classic", title: u = "Computer Lab", headerActions: d, onInstruct: f, className: p }) {
	let { client: m, computers: h, canManage: g, create: v, models: y, notify: b, refresh: S, paneKinds: C, projects: ee } = He(), te = C[0]?.id ?? "agent", w = U((e) => Mt(C, e)?.id ?? te, [C, te]), T = kt(), E = l === "workspace", [ne, re] = q(null), [D, ie] = q(() => /* @__PURE__ */ new Set()), [O, ae] = q("nudge"), [k, se] = q("focused"), [ce, le] = q(!1), [A, ue] = q(!1), [fe, pe] = q(""), [me, he] = q(!1), [j, M] = q(!1), [ge, _e] = q(!1), [ve, ye] = q(!1), be = K(/* @__PURE__ */ new Map()), xe = K(null), Se = K(null), Ce = K(null), N = G(() => new Map(h.map((e) => [e.id, e])), [h]), P = T.panes.find((e) => e.id === T.activePaneId) ?? T.panes[0] ?? null, F = P ? N.get(P.computerId) ?? null : null, we = Pt(C, T.panes.map((e) => e.kindId), "shell"), Te = T.windows.length > 0, I = r && N.has(r) ? r : null, Ee = I ?? h[0]?.id ?? null, De = w(Ee ? N.get(Ee) : null);
	W(() => {
		!t || Te || !Ee || T.ensureSeeded(Ee, De);
	}, [
		t,
		Te,
		Ee,
		De,
		T.ensureSeeded
	]);
	let Oe = K(null), { focusPane: ke, setPaneComputer: Ae, panes: je, activePaneId: Me } = T;
	W(() => {
		if (!t || !I || Oe.current === I) return;
		let e = je.find((e) => e.computerId === I);
		if (e) ke(e.id);
		else if (Me) Ae(Me, I);
		else return;
		Oe.current = I;
	}, [
		t,
		I,
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
	let L = U((e, t) => {
		let n = T.panes.find((t) => t.id === e);
		T.setPaneComputer(e, t.id);
		let r = n ? At(C, n.kindId) : null;
		r?.appliesTo && !r.appliesTo(t) && T.setPaneKind(e, w(t));
	}, [
		T,
		C,
		w
	]), Fe = U((e) => {
		let t = P ? At(C, P.kindId) : null;
		return t && e && (!t.appliesTo || t.appliesTo(e)) ? t.id : w(e);
	}, [
		P,
		C,
		w
	]), Ie = U((e, t, n) => {
		n ? be.current.set(e, {
			handle: n,
			kind: t
		}) : be.current.delete(e);
	}, []), R = A ? T.panes : P ? [P] : [], Le = U((e, t) => {
		let n = 0;
		for (let r of t) {
			let t = be.current.get(r.id);
			t?.handle.send && t.handle.send(`${e}${t.kind.inputSuffix ?? ""}`) && (n += 1);
		}
		return n;
	}, []), Re = U(() => {
		let e = fe.trim();
		if (!e || R.length === 0) return;
		let t = Le(e, R);
		if (t === 0) {
			b({
				tone: "error",
				title: "Nothing received that",
				detail: "No pane was ready to accept input."
			});
			return;
		}
		pe(""), t < R.length && b({
			tone: "info",
			title: `Sent to ${t} of ${R.length} panes`,
			detail: "The rest were not connected."
		});
	}, [
		fe,
		R,
		b,
		Le
	]), z = G(() => k === "all" ? h : k === "selected" ? h.filter((e) => D.has(e.id)) : F ? [F] : [], [
		k,
		h,
		D,
		F
	]), B = G(() => {
		if (k === "focused") return P ? [P] : [];
		let e = new Set(z.map((e) => e.id));
		return T.panes.filter((t) => e.has(t.computerId));
	}, [
		k,
		P,
		z,
		T.panes
	]), ze = U(async (e, t) => {
		let n = t.filter((e) => !rt(e)), r = t.length - n.length, i = (await Promise.all(n.map((t) => {
			let n = m.runTask(t.sessionId, {
				prompt: e,
				resume: !0
			}, () => {});
			return Promise.race([n.then(() => !0, () => !1), new Promise((e) => {
				setTimeout(() => e(!0), 1500);
			})]);
		}))).filter(Boolean).length, a = [];
		return i < n.length && a.push(`${n.length - i} refused`), r > 0 && a.push(`${r} ${r === 1 ? "laptop" : "laptops"} skipped — no runtime session`), {
			delivered: i,
			...a.length ? { detail: a.join(" · ") } : {}
		};
	}, [m]), Be = U(async () => {
		let e = fe.trim();
		if (!(!e || ce)) {
			if (O === "type") {
				if (B.length === 0) {
					b({
						tone: "info",
						title: "No open pane to type into",
						detail: "Open a pane on one of these computers first."
					});
					return;
				}
				let t = Le(e, B);
				if (t === 0) {
					b({
						tone: "error",
						title: "Nothing received that",
						detail: "No pane was ready to accept input."
					});
					return;
				}
				pe(""), t < B.length && b({
					tone: "info",
					title: `Typed into ${t} of ${B.length} panes`,
					detail: "The rest do not take input."
				});
				return;
			}
			if (z.length !== 0) {
				le(!0);
				try {
					let t = f ? await f({
						text: e,
						computers: z,
						scope: k
					}) : await ze(e, z), n = t?.delivered ?? z.length;
					n > 0 && pe(""), b({
						tone: n > 0 ? "success" : "error",
						title: n > 0 ? `Sent to ${n} of ${z.length} ${z.length === 1 ? "computer" : "computers"}` : "No computer took that",
						...t?.detail ? { detail: t.detail } : {}
					});
				} catch (e) {
					b({
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
		ce,
		O,
		B,
		z,
		k,
		f,
		ze,
		Le,
		b
	]), Ve = U((e) => {
		let t = P?.computerId ?? h[0]?.id;
		t && T.split(e, t, P?.kindId ?? w(N.get(t)));
	}, [
		P,
		h,
		T,
		w,
		N
	]), V = U((e, t, n) => {
		if (!n || n.id === t) return;
		let r = At(C, t);
		if (n.quota === "shell" && r?.quota !== "shell" && we >= 8) {
			b({
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
		we,
		b
	]), Ue = U(() => {
		P && V(P.id, P.kindId, Nt(C, P.kindId, N.get(P.computerId)));
	}, [
		P,
		C,
		V,
		N
	]), We = U((e) => {
		v(e ? { projectId: e } : void 0).then((e) => {
			T.newWindow(e.id, w(e)), b({
				tone: "success",
				title: `${e.label} ready`,
				detail: "microVM session live · workspace persists"
			});
		}).catch((e) => {
			b({
				tone: "error",
				title: "Provisioning failed",
				detail: e instanceof Error ? e.message : void 0
			});
		});
	}, [
		v,
		T,
		b,
		w
	]);
	W(() => {
		if (!t || !T.activePaneId || ge || j) return;
		let e = T.activePaneId, n = requestAnimationFrame(() => be.current.get(e)?.handle.focus?.());
		return () => cancelAnimationFrame(n);
	}, [
		t,
		T.activePaneId,
		T.zoomedPaneId,
		ge,
		j
	]);
	let Ge = U((e) => {
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
				Ve("row");
				return;
			case "split-down":
				Ve("column");
				return;
			case "close-pane":
				T.closeActivePane();
				return;
			case "zoom-pane":
				T.toggleZoom();
				return;
			case "next-kind":
				Ue();
				return;
			case "jump":
				_e(!0);
				return;
			case "focus-composer":
				xe.current?.focus();
				return;
			case "leave-pane":
				xe.current?.focus();
				return;
			case "focus-rail": {
				let e = Se.current;
				if (!e) return;
				let t = (t) => e.querySelector(`[role="listbox"][aria-label="${t}"] [data-rail-row][tabindex="0"]`) ?? e.querySelector(`[role="listbox"][aria-label="${t}"] [data-rail-row]`), n = document.activeElement, r = (t) => !!n && !!e.querySelector(`[role="listbox"][aria-label="${t}"]`)?.contains(n);
				if (r("computers")) {
					let e = t("agents");
					e ? e.focus() : P && be.current.get(P.id)?.handle.focus?.();
					return;
				}
				if (r("agents")) {
					P && be.current.get(P.id)?.handle.focus?.();
					return;
				}
				(t("computers") ?? t("agents"))?.focus();
				return;
			}
			case "toggle-broadcast":
				E ? se((e) => e === "all" ? "focused" : "all") : ue((e) => !e);
				return;
			case "help":
				M((e) => !e);
				return;
			case "exit":
				if (Se.current?.contains(document.activeElement)) {
					P && be.current.get(P.id)?.handle.focus?.();
					return;
				}
				i === "overlay" && n();
				return;
		}
	}, [
		T,
		Ve,
		Ue,
		n,
		i,
		P,
		E
	]);
	if (W(() => {
		if (!t) return;
		let e = (e) => {
			if (ve) {
				e.preventDefault(), e.stopPropagation(), ye(!1);
				let t = Qt(o, e);
				t && Ge(t);
				return;
			}
			if (Zt(s, e)) {
				e.preventDefault(), e.stopPropagation(), ye(!0);
				return;
			}
			let t = $t(o, e);
			if (t) {
				if (t === "exit") {
					let t = e.target;
					if (t?.closest?.(".xterm")) return;
					if (t === xe.current) {
						xe.current?.blur(), e.preventDefault();
						return;
					}
					if (ge || j) {
						_e(!1), M(!1), e.preventDefault();
						return;
					}
				}
				e.preventDefault(), e.stopPropagation(), Ge(t);
			}
		};
		return globalThis.addEventListener("keydown", e, !0), () => globalThis.removeEventListener("keydown", e, !0);
	}, [
		t,
		o,
		s,
		ve,
		Ge,
		ge,
		j
	]), W(() => {
		if (!ve) return;
		let e = setTimeout(() => ye(!1), s?.timeoutMs ?? 3e3);
		return () => clearTimeout(e);
	}, [ve, s?.timeoutMs]), !t) return null;
	let H = (e) => tn(o, e), Ke = rn(a), qe = a === "app", Je = i === "inline", Ye = O === "type" ? `Type into ${B.length} ${B.length === 1 ? "pane" : "panes"} — ⏎ to send` : k === "focused" ? `Instruction for ${F?.label ?? "the focused computer"} — ⏎ to send` : `Instruction for ${z.length} ${z.length === 1 ? "computer" : "computers"} — ⏎ to send`, Xe = /* @__PURE__ */ J("textarea", {
		ref: xe,
		rows: 1,
		value: fe,
		onChange: (e) => pe(e.target.value),
		onKeyDown: (e) => {
			e.key === "Enter" && !e.shiftKey && (e.preventDefault(), E ? Be() : Re()), e.key === "Escape" && e.currentTarget.blur();
		},
		placeholder: E ? Ye : A ? `instruction for all ${R.length} panes — ⏎ to send` : `instruction for ${F?.label ?? "the focused pane"} — ⏎ to send`,
		"aria-label": E ? "Instruction" : "Broadcast instruction",
		disabled: E && ce,
		className: e("flex-1 min-w-0 resize-none bg-transparent border-none outline-none text-[12px] leading-6", E ? "font-mono text-text-primary caret-primary placeholder:text-text-tertiary disabled:opacity-60" : "text-code-text caret-code-blue placeholder:text-code-raised")
	});
	if (E) {
		let t = de(h), r = (e) => N.get(e.computerId) ?? null, c = (e) => {
			let t = r(e), n = At(C, e.kindId);
			return n && t && n.appliesTo && !n.appliesTo(t) ? Mt(C, t) : n;
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
				trailing: H("jump") ?? void 0,
				onSelect: () => _e(!0)
			},
			{
				label: "Arrange side by side",
				onSelect: () => T.arrange("columns")
			},
			{
				label: "Keyboard shortcuts",
				trailing: H("help") ?? void 0,
				onSelect: () => M(!0)
			}
		] }], m = {
			focused: "Focused pane",
			selected: "Selected",
			all: "All computers"
		}, _ = {
			focused: +!!F,
			selected: D.size,
			all: h.length
		}, v = O === "type" ? B.length : z.length, b = new Set(z.map((e) => e.id));
		return /* @__PURE__ */ Y("div", {
			ref: Ce,
			...i === "overlay" ? {
				role: "dialog",
				"aria-modal": !0
			} : { role: "region" },
			"aria-label": "Computer Lab",
			"data-appearance": "workspace",
			style: Ke,
			className: e("flex flex-col bg-surface text-text-primary", i === "overlay" ? "fixed inset-0 z-[150]" : "relative h-full min-h-0 w-full rounded-lg border border-border overflow-hidden", p),
			children: [
				/* @__PURE__ */ J(Wt, {
					title: u,
					summary: t,
					statusFilter: ne,
					onStatusFilter: re,
					canCreate: g,
					onCreate: () => We(),
					onKeys: () => M((e) => !e),
					keysOpen: j,
					keysChord: H("help"),
					actions: /* @__PURE__ */ Y(lt, { children: [d, i === "overlay" && /* @__PURE__ */ J("button", {
						type: "button",
						onClick: n,
						title: `Leave the lab${H("exit") ? ` · ${H("exit")}` : ""}`,
						className: "text-[12px] text-text-tertiary bg-transparent border-none cursor-pointer hover:text-danger",
						children: "✕"
					})] }),
					leaderLabel: ve && s ? s.label : null
				}),
				/* @__PURE__ */ Y("div", {
					className: "flex flex-1 min-h-0",
					children: [/* @__PURE__ */ J("div", {
						ref: Se,
						className: "contents",
						children: /* @__PURE__ */ J(Rt, {
							className: "w-[224px] xl:w-[300px] shrink-0",
							computers: h,
							activeComputerId: F?.id ?? null,
							openComputerIds: T.openComputerIds,
							selectedIds: D,
							statusFilter: ne,
							onStatusFilterChange: re,
							onCreate: g ? () => We() : void 0,
							onSelect: (e, { toggle: t }) => {
								if (t) {
									ie((t) => {
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
								P && L(P.id, e);
							},
							onOpenInPane: (e) => T.split("row", e.id, Fe(e))
						})
					}), /* @__PURE__ */ Y("div", {
						className: "flex flex-col flex-1 min-w-0 min-h-0 bg-surface-inset",
						children: [
							/* @__PURE__ */ J(Kt, {
								panes: T.panes.map((e) => ({
									id: e.id,
									label: N.get(e.computerId)?.label ?? "gone",
									kind: c(e)?.title ?? c(e)?.label ?? e.kindId,
									active: e.id === T.activePaneId
								})),
								onFocusPane: T.focusPane,
								onAddPane: () => Ve(T.panes.length % 2 == 1 ? "row" : "column"),
								canAddPane: !!P,
								shellsOpen: we,
								maxShells: 8,
								onArrange: T.arrange,
								zoomed: !!T.zoomedPaneId,
								onToggleZoom: T.toggleZoom,
								moreSections: l
							}),
							/* @__PURE__ */ J("div", {
								className: "flex-1 min-h-0 flex px-2 pb-2",
								children: T.activeWindow && P ? /* @__PURE__ */ J(fn, {
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
										}) : /* @__PURE__ */ J(Jt, {
											computer: t,
											kind: n,
											kinds: jt(C, t),
											onSwitchKind: (t) => {
												T.focusPane(e.id), V(e.id, n.id, t);
											},
											active: i,
											zoomed: T.zoomedPaneId === e.id,
											broadcasting: k !== "focused" && b.has(t.id),
											models: y,
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
											children: /* @__PURE__ */ J(_n, {
												kind: n,
												paneId: e.id,
												computer: t,
												active: i,
												onRegisterPane: Ie,
												onSettled: () => void S()
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
										/* @__PURE__ */ J(x, {
											trigger: /* @__PURE__ */ Y("span", {
												className: "text-[12px] font-semibold",
												children: [O === "nudge" ? "Nudge" : "Type", " ▾"]
											}),
											triggerLabel: "Instruction mode",
											triggerVariant: "link",
											triggerTestId: "lab-instruct-mode",
											sections: [{ items: [{
												label: "Nudge",
												description: "An instruction for each computer's agent",
												active: O === "nudge",
												disabled: !g && !f,
												disabledReason: "Needs permission to run work on these computers",
												onSelect: () => ae("nudge")
											}, {
												label: "Type",
												description: "Keystrokes into the panes open on them",
												active: O === "type",
												onSelect: () => ae("type")
											}] }]
										}),
										/* @__PURE__ */ J("span", {
											"aria-hidden": "true",
											className: "h-4 w-px bg-border"
										}),
										/* @__PURE__ */ J(x, {
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
													...e === "selected" && D.size === 0 ? {
														disabled: !0,
														disabledReason: "⌘-click computers in the rail to select them"
													} : {},
													onSelect: () => se(e)
												}))
											}]
										}),
										/* @__PURE__ */ J("span", {
											"aria-hidden": "true",
											className: "font-mono text-[12px] text-text-tertiary pl-1",
											children: ">"
										}),
										Xe,
										/* @__PURE__ */ J("button", {
											type: "button",
											onClick: () => void Be(),
											disabled: !fe.trim() || v === 0 || ce,
											"aria-label": "Send instruction",
											title: "Send · ⏎",
											className: "shrink-0 h-6.5 px-2 rounded-md border-none bg-primary text-on-primary text-[12px] cursor-pointer hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed",
											children: "⏎"
										})
									]
								}), /* @__PURE__ */ Y("div", {
									"data-testid": "lab-instruction-caption",
									className: "px-1 pt-0.5 text-[11px] text-text-tertiary tabular-nums",
									children: [
										O === "type" ? "Shell input" : "Agent instruction",
										" · ",
										v,
										" ",
										v === 1 ? "target" : "targets",
										ce && " · sending…"
									]
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ J(dn, {
					open: ge,
					onClose: () => _e(!1),
					chrome: a,
					computers: h,
					panes: T.panes,
					onJumpToPane: T.focusPane,
					onRetarget: (e) => {
						P && L(P.id, e);
					},
					onOpenInSplit: (e) => T.split("row", e.id, Fe(e)),
					projects: ee,
					onSelectProject: (e) => {
						let t = e.computers[0];
						if (t) {
							P && L(P.id, t);
							return;
						}
						g && We(e.id);
					}
				}),
				j && /* @__PURE__ */ J(vn, {
					keymap: o,
					leader: s,
					chrome: a,
					onClose: () => M(!1)
				})
			]
		});
	}
	return /* @__PURE__ */ Y("div", {
		ref: Ce,
		...i === "overlay" ? {
			role: "dialog",
			"aria-modal": !0
		} : { role: "region" },
		"aria-label": "Computer Lab",
		style: Ke,
		className: e("flex flex-col", qe ? "bg-surface text-text-primary" : "bg-code-bg text-code-text", i === "overlay" ? "fixed inset-0 z-[150]" : e("relative h-full min-h-0 w-full", qe && "rounded-lg border border-border overflow-hidden"), p),
		children: [
			/* @__PURE__ */ Y("div", {
				className: e("flex items-center gap-3 px-3 shrink-0 border-b border-code-border bg-code-panel", Je ? "h-9" : "h-10"),
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
								type: "button",
								onClick: () => T.selectWindow(t.id),
								title: `Window ${n + 1}`,
								"aria-current": r ? "true" : void 0,
								className: e("px-2 py-0.5 rounded-sm text-[11px] font-mono cursor-pointer border-none transition-colors", r ? "bg-code-blue text-code-bg font-semibold" : "bg-code-surface text-code-muted hover:text-code-text"),
								children: t.name ?? n + 1
							}, t.id);
						}), /* @__PURE__ */ J("button", {
							type: "button",
							onClick: () => P && T.newWindow(P.computerId, w(N.get(P.computerId))),
							disabled: !P,
							title: "New window",
							"aria-label": "New window",
							className: "px-1.5 py-0.5 text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text disabled:opacity-40 disabled:cursor-not-allowed",
							children: "+"
						})]
					}),
					/* @__PURE__ */ J("span", { className: "flex-1" }),
					/* @__PURE__ */ J(_, {
						label: "shells",
						value: we / 8,
						segments: 8,
						showPercent: !1,
						note: `${we} of 8 open`,
						warnAbove: .74,
						tone: qe ? "surface" : "code",
						className: "hidden md:flex"
					}),
					ve && s && /* @__PURE__ */ Y("span", {
						"data-testid": "leader-armed",
						className: "px-2 py-0.5 rounded-sm text-[10px] font-mono font-semibold bg-code-peach text-code-bg animate-pulse",
						children: [s.label, " …"]
					}),
					/* @__PURE__ */ J("button", {
						type: "button",
						onClick: () => M((e) => !e),
						"aria-pressed": j,
						title: `Shortcuts${H("help") ? ` · ${H("help")}` : ""}`,
						className: "text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text",
						children: "?"
					}),
					i === "overlay" && /* @__PURE__ */ J("button", {
						type: "button",
						onClick: n,
						title: `Leave the lab${H("exit") ? ` · ${H("exit")}` : ""}`,
						className: "text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-red",
						children: "✕"
					})
				]
			}),
			/* @__PURE__ */ Y("div", {
				className: "flex flex-1 min-h-0",
				children: [/* @__PURE__ */ J("div", {
					ref: Se,
					className: "contents",
					children: /* @__PURE__ */ J(cn, {
						className: "w-[210px] shrink-0",
						computers: h,
						activeComputerId: F?.id ?? null,
						openComputerIds: T.openComputerIds,
						showAllActivity: me,
						onToggleShowAll: () => he((e) => !e),
						canManage: g,
						models: y,
						onCreate: () => We(),
						onOpenMenu: () => M((e) => !e),
						onSelect: (e) => {
							P && L(P.id, e);
						},
						onOpenInPane: (e) => T.split("row", e.id, Fe(e)),
						onWatch: (e) => {
							let t = C.find((e) => e.id === "tail");
							if (!t) {
								P && L(P.id, e);
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
					className: e("flex-1 min-w-0 min-h-0", Je ? "p-1.5" : "p-2", qe ? "bg-surface" : "bg-code-bg"),
					children: T.activeWindow && P ? /* @__PURE__ */ J(fn, {
						className: "flex-1 h-full",
						node: T.activeWindow.root,
						activePaneId: T.activePaneId,
						zoomedPaneId: T.zoomedPaneId,
						onRatioChange: T.resize,
						renderLeaf: (e) => {
							let t = N.get(e.computerId), n = e.id === T.activePaneId;
							return /* @__PURE__ */ J(gn, {
								pane: e,
								computer: t ?? null,
								active: n,
								broadcasting: A,
								idleWindowMs: c,
								zoomed: T.zoomedPaneId === e.id,
								onFocus: () => T.focusPane(e.id),
								onClose: () => {
									T.focusPane(e.id), T.closeActivePane();
								},
								kinds: C,
								onToggleKind: () => {
									T.focusPane(e.id), V(e.id, e.kindId, Nt(C, e.kindId, t));
								},
								onRegisterPane: Ie,
								onSettled: () => void S()
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
								type: "button",
								onClick: () => We(),
								className: "text-[11px] font-mono rounded px-3 py-1 cursor-pointer border border-code-green/60 bg-code-green/15 text-code-green hover:bg-code-green/30",
								children: "+ new computer"
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ Y("div", {
				className: e("flex items-center gap-2 px-3 shrink-0 border-t font-mono transition-colors", Je ? "py-1" : "py-1.5", A ? "border-code-peach bg-code-peach/10" : "border-code-border bg-code-panel focus-within:border-code-blue"),
				children: [
					/* @__PURE__ */ J("button", {
						type: "button",
						onClick: () => ue((e) => !e),
						"aria-pressed": A,
						title: `Send the prompt to every pane${H("toggle-broadcast") ? ` · ${H("toggle-broadcast")}` : ""}`,
						className: e("text-[10px] px-1.5 py-0.5 rounded-sm cursor-pointer border transition-colors shrink-0", A ? "border-code-peach bg-code-peach/25 text-code-peach font-semibold" : "border-code-border text-code-muted bg-transparent hover:text-code-text"),
						children: A ? "▶▶ all panes" : "▶ focused pane"
					}),
					/* @__PURE__ */ Y("span", {
						className: "text-[10px] text-code-muted tabular-nums shrink-0 hidden sm:inline",
						children: [
							R.length,
							" ",
							R.length === 1 ? "target" : "targets"
						]
					}),
					Xe,
					/* @__PURE__ */ J("button", {
						type: "button",
						onClick: Re,
						disabled: !fe.trim() || R.length === 0,
						className: e("shrink-0 text-[11px] px-2 py-0.5 rounded-sm border cursor-pointer transition-colors", "border-code-green/60 bg-code-green/15 text-code-green hover:bg-code-green/30", "disabled:border-code-border disabled:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"),
						children: "send"
					})
				]
			}),
			/* @__PURE__ */ J(dn, {
				open: ge,
				onClose: () => _e(!1),
				chrome: a,
				computers: h,
				panes: T.panes,
				onJumpToPane: T.focusPane,
				onRetarget: (e) => {
					P && L(P.id, e);
				},
				onOpenInSplit: (e) => T.split("row", e.id, Fe(e)),
				projects: ee,
				onSelectProject: (e) => {
					let t = e.computers[0];
					if (t) {
						P && L(P.id, t);
						return;
					}
					if (!g) {
						b({
							tone: "info",
							title: `${e.name} has no computers`,
							detail: "You do not have permission to start one."
						});
						return;
					}
					We(e.id);
				}
			}),
			j && /* @__PURE__ */ J(vn, {
				keymap: o,
				leader: s,
				chrome: a,
				onClose: () => M(!1)
			})
		]
	});
}
function gn({ pane: e, computer: t, active: n, broadcasting: r, zoomed: i, idleWindowMs: a, kinds: o, onFocus: s, onClose: c, onToggleKind: l, onRegisterPane: u, onSettled: d }) {
	let f = At(o, e.kindId), p = f && t && f.appliesTo && !f.appliesTo(t) ? Mt(o, t) : f, m = U((t) => {
		p && u(e.id, p, t);
	}, [
		u,
		e.id,
		p
	]);
	if (!t || !p) return /* @__PURE__ */ J(g, {
		title: "unbound",
		active: n,
		className: "flex-1 min-w-0",
		onActivate: s,
		children: /* @__PURE__ */ J("div", {
			className: "h-full flex items-center justify-center text-[11px] font-mono text-code-subtle",
			children: t ? "no pane kind registered" : "this computer is gone"
		})
	});
	let h = k(t), _ = D[h];
	return /* @__PURE__ */ Y(g, {
		active: n,
		onActivate: s,
		className: "flex-1 min-w-0",
		bodyClassName: "flex flex-col min-h-0",
		title: /* @__PURE__ */ Y("span", {
			className: "inline-flex items-center gap-1.5",
			children: [
				/* @__PURE__ */ J(v, {
					size: "xs",
					color: _.color,
					pulse: _.pulse,
					"aria-label": _.label
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
				type: "button",
				onClick: l,
				title: Nt(o, e.kindId)?.description ?? "Switch pane kind",
				className: "text-[9px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text",
				children: p.label
			}), /* @__PURE__ */ J("button", {
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
		}), /* @__PURE__ */ J(ie, {
			className: "rounded-b-[3px]",
			computer: t,
			idleWindowMs: a,
			broadcasting: r,
			mode: p.statusMode ?? p.label
		})]
	});
}
function _n({ kind: e, paneId: t, computer: n, active: r, onRegisterPane: i, onSettled: a }) {
	let o = U((n) => i(t, e, n), [
		i,
		t,
		e
	]);
	return /* @__PURE__ */ J(lt, { children: e.render({
		computer: n,
		paneId: t,
		active: r,
		registerPane: o,
		onSettled: a
	}) });
}
function vn({ keymap: e, leader: t, chrome: n = "app", onClose: r }) {
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
			style: rn(n),
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
							type: "button",
							onClick: r,
							className: "text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text",
							children: "esc"
						})
					]
				}),
				/* @__PURE__ */ J("div", {
					className: "flex flex-col gap-4",
					children: en(e).map(({ group: e, bindings: n }) => /* @__PURE__ */ Y("div", { children: [/* @__PURE__ */ J("div", {
						className: "text-[10px] uppercase tracking-wide text-code-mauve mb-1.5",
						children: i[e]
					}), /* @__PURE__ */ J("dl", {
						className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 m-0",
						children: n.map((e) => /* @__PURE__ */ Y(st, { children: [/* @__PURE__ */ Y("dt", {
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
var yn = {
	connected: "success",
	stale: "caution",
	offline: "neutral"
}, bn = {
	connected: "connected",
	stale: "stale",
	offline: "offline"
};
function xn(e) {
	return !e || e.mode === "disabled" ? "— sync off" : e.mode === "offline" ? "○ offline — queuing" : e.mode === "pending" ? `◐ ${e.pendingOps ?? "?"} pending` : "● synced";
}
function Sn(e, t = []) {
	let n = e.modelProvider === "bedrock" ? ae(e.model, t) : e.model ?? "—";
	return e.modelProvider ? `${e.modelProvider} · ${n}` : n;
}
function Cn(e) {
	return e.reduce((e, t) => e + t.sessions.length, 0);
}
function wn({ session: e, models: t }) {
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
						children: Sn(e, t)
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
				children: [e.contextUsed != null && /* @__PURE__ */ J(_, {
					label: "ctx",
					value: e.contextUsed,
					tone: "surface",
					segments: 8,
					className: "shrink-0"
				}), /* @__PURE__ */ J("span", {
					className: "text-[10px] font-mono text-text-tertiary truncate",
					title: e.memory?.pullCursorAgeS == null ? void 0 : `read replica ${e.memory.pullCursorAgeS}s behind the mesh`,
					children: xn(e.memory)
				})]
			})
		]
	});
}
function Tn({ nodes: t, models: r = [], onOpenLab: i, onManage: a, className: o, "data-testid": s = "machine-presence-menu" }) {
	let c = K(null), [l, u] = q(!1);
	if (t.length === 0) return null;
	let d = Cn(t), f = t.some((e) => e.status === "connected") ? "connected" : t.some((e) => e.status === "stale") ? "stale" : "offline", p = t.length === 1 ? t[0].label : `${t.length} machines`, m = f === "connected" && d > 0;
	return /* @__PURE__ */ Y(lt, { children: [/* @__PURE__ */ J("button", {
		ref: c,
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": l,
		"aria-label": `Local machines: ${p}, ${d} active session${d === 1 ? "" : "s"}, ${bn[f]}`,
		title: `${p} — ${bn[f]}`,
		onClick: () => u((e) => !e),
		"data-testid": s,
		className: e("inline-flex items-center cursor-pointer rounded-md border border-border px-2 py-1", "bg-transparent hover:bg-surface-hover transition-colors duration-100", l && "bg-surface-hover", o),
		children: /* @__PURE__ */ J(n, {
			size: "xs",
			mono: !0,
			tone: yn[f],
			dot: m ? "pulse" : "static",
			className: "bg-transparent px-0",
			children: d === 0 ? `⌂ ${p}` : `⌂ ${p} · ${d}`
		})
	}), /* @__PURE__ */ J(b, {
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
						/* @__PURE__ */ J(S, { children: e.label }),
						e.platform && /* @__PURE__ */ J("span", {
							className: "text-[10px] font-mono text-text-tertiary",
							children: e.platform
						}),
						/* @__PURE__ */ J("span", { className: "flex-1" }),
						/* @__PURE__ */ J(n, {
							size: "xs",
							uppercase: !0,
							tone: yn[e.status],
							dot: "static",
							children: bn[e.status]
						})
					]
				}), e.sessions.length > 0 ? /* @__PURE__ */ J("ul", {
					className: "flex flex-col",
					children: e.sessions.map((e) => /* @__PURE__ */ J(wn, {
						session: e,
						models: r
					}, e.id))
				}) : /* @__PURE__ */ J(C, {
					"data-testid": "machine-no-sessions",
					children: e.status === "offline" ? "machine offline" : "no active sessions"
				})]
			}, e.id)), (i || a) && /* @__PURE__ */ Y("div", {
				className: "flex items-center gap-2 border-t border-border pt-2",
				children: [
					i && /* @__PURE__ */ J("button", {
						type: "button",
						onClick: () => {
							u(!1), i();
						},
						className: "text-[11px] font-medium text-primary hover:underline cursor-pointer bg-transparent border-0 p-0",
						children: "Open Computer Lab"
					}),
					/* @__PURE__ */ J("span", { className: "flex-1" }),
					a && /* @__PURE__ */ J("button", {
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
var En = {
	docked: "▭",
	grid: "▦",
	stack: "▤",
	floating: "▢"
};
function Dn(e) {
	W(() => {
		if (!e) return;
		let t = (e) => {
			let t = e.metaKey || e.ctrlKey;
			if (t && (e.key === "'" || e.key === "\"")) {
				e.preventDefault(), e.stopPropagation(), e.shiftKey ? qe() : $e(Te().mode === "hidden");
				return;
			}
			if (Te().mode !== "hidden") {
				if (e.altKey && !t && /^[1-9]$/.test(e.key)) {
					e.preventDefault(), e.stopPropagation(), L(Number(e.key) - 1);
					return;
				}
				e.ctrlKey && e.key === "Tab" && (e.preventDefault(), e.stopPropagation(), j(e.shiftKey ? -1 : 1));
			}
		};
		return window.addEventListener("keydown", t, !0), () => window.removeEventListener("keydown", t, !0);
	}, [e]);
}
function On({ status: e }) {
	let t = re[e];
	return /* @__PURE__ */ J("span", {
		"aria-hidden": "true",
		title: t.help,
		className: `w-1.5 h-1.5 rounded-full shrink-0 ${t.pulse ? "animate-pulse" : ""}`,
		style: { background: t.color }
	});
}
function kn({ shell: e, active: t, labelled: n }) {
	return /* @__PURE__ */ Y("div", {
		className: "flex flex-col min-h-0 h-full",
		children: [n && /* @__PURE__ */ Y("div", {
			className: "flex items-center gap-1.5 px-2 py-1 border-b shrink-0 bg-code-surface border-code-border",
			children: [
				/* @__PURE__ */ J(On, { status: e.status }),
				/* @__PURE__ */ J("span", {
					className: "text-[10px] font-mono text-code-muted",
					children: e.label
				}),
				/* @__PURE__ */ J("div", { className: "flex-1" }),
				/* @__PURE__ */ J("button", {
					type: "button",
					onClick: () => M(e.id),
					"aria-label": `Close ${e.label}`,
					className: "text-[10px] bg-transparent border-none cursor-pointer px-1 leading-none text-code-muted hover:text-code-red",
					children: "×"
				})
			]
		}), /* @__PURE__ */ J("div", {
			className: "flex-1 min-h-0",
			children: /* @__PURE__ */ J(Be, {
				sessionId: e.sessionId,
				shellId: e.id,
				label: e.label,
				...e.cwd ? { cwd: e.cwd } : {},
				chrome: !1,
				fillHeight: !0,
				autoConnect: t,
				onStatus: (t, n) => se(e.id, t, n)
			})
		})]
	});
}
function An({ hotkeys: e = !0, reconcile: t = !0, className: n = "" }) {
	let r = ct(ke, Te, Te), i = Je();
	Dn(e);
	let a = G(() => (i?.computers ?? []).map((e) => e.sessionId), [i?.computers]);
	if (W(() => {
		!t || a.length === 0 || xe(a);
	}, [t, a]), r.mode === "hidden" || r.shells.length === 0) return null;
	let o = z(r.mode), s = /* @__PURE__ */ Y("div", {
		style: nn,
		className: "flex flex-col h-full min-h-0",
		children: [/* @__PURE__ */ Y("div", {
			className: "flex items-center gap-1 px-1.5 py-1 border-b shrink-0 overflow-x-auto bg-terminal-bg border-code-border",
			children: [
				r.shells.map((e, t) => {
					let n = e.id === r.activeId;
					return /* @__PURE__ */ Y("div", {
						className: `group flex items-center gap-1.5 pl-2 pr-1 py-1 rounded shrink-0 ${n ? "bg-code-surface" : "bg-transparent hover:bg-code-surface/60"}`,
						children: [/* @__PURE__ */ Y("button", {
							type: "button",
							onClick: () => I(e.id),
							title: `${e.label} · ⌥${t + 1}`,
							"aria-current": n ? "true" : void 0,
							className: `flex items-center gap-1.5 text-[11px] font-mono cursor-pointer border-none bg-transparent p-0 ${n ? "text-code-text" : "text-code-muted hover:text-code-text"}`,
							children: [
								/* @__PURE__ */ J(On, { status: e.status }),
								e.label,
								e.unread && !n && /* @__PURE__ */ J("span", {
									className: "w-1 h-1 rounded-full bg-code-blue",
									title: "new output while you were away"
								})
							]
						}), /* @__PURE__ */ J("button", {
							type: "button",
							onClick: () => M(e.id),
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
					children: Object.keys(En).map((e) => /* @__PURE__ */ J("button", {
						type: "button",
						onClick: () => Ye(e),
						title: `${e} layout — ⌘⇧' cycles`,
						"aria-pressed": r.mode === e,
						className: `px-1.5 py-0.5 text-[10px] cursor-pointer border-none ${r.mode === e ? "bg-code-border text-code-text" : "bg-transparent text-code-muted hover:text-code-text"}`,
						children: En[e]
					}, e))
				}),
				/* @__PURE__ */ J("button", {
					type: "button",
					onClick: () => $e(!1),
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
					onMouseDown: () => I(e.id),
					"aria-hidden": !o && !t,
					className: o ? `min-h-[160px] rounded border overflow-hidden flex flex-col ${t ? "border-code-green/50" : "border-code-border"}` : "absolute inset-0",
					style: o ? void 0 : { visibility: t ? "visible" : "hidden" },
					children: /* @__PURE__ */ J(kn, {
						shell: e,
						active: o || t,
						labelled: o
					})
				}, e.id);
			})
		})]
	});
	if (r.mode === "floating") return /* @__PURE__ */ J(ee, {
		open: !0,
		onClose: () => $e(!1),
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
		style: r.mode === "stack" ? nn : {
			...nn,
			height: r.geometry.dockHeight
		},
		children: s
	});
}
//#endregion
//#region src/components/compute/lib/workspaceTree.ts
var jn = String.raw`find . -maxdepth 3 \( -name .git -o -name node_modules -o -name .venv -o -name __pycache__ -o -name dist \) -prune -printf "p %p\n" -o -printf "%y %p\n" 2>/dev/null | head -400`, Mn = "git log --oneline -3 2>/dev/null; git status --short 2>/dev/null | head -5", Nn = 400;
function Pn(e) {
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
	return Fn(t), t;
}
function Fn(e) {
	e.sort((e, t) => e.kind === t.kind ? e.name.localeCompare(t.name) : e.kind === "dir" ? -1 : 1);
	for (let t of e) Fn(t.children);
}
function In(e) {
	return e.children.reduce((e, t) => e + 1 + In(t), 0);
}
function Ln(e, t, n = 0) {
	let r = [];
	for (let i of e) r.push({
		node: i,
		depth: n
	}), i.kind === "dir" && !i.pruned && t.has(i.path) && r.push(...Ln(i.children, t, n + 1));
	return r;
}
//#endregion
//#region src/components/compute/fixtures/mockShell.ts
var Rn = "mock-shell:", Z = "/mnt/workspace", zn = "bedrock_agentcore", Q = {
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
}, Bn = {
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
}, Vn = {
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
}, Hn = [
	["Read", "src/main.py"],
	["Grep", "\"def handler\" (1 file)"],
	["Edit", "src/main.py · +1 -1"],
	["Bash", "pytest -q → 4 passed in 0.62s"]
], Un = [
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
], Wn = /* @__PURE__ */ new Map();
function Gn(e, t) {
	let n = t ?? `mock-${Math.random().toString(36).slice(2, 8)}`;
	return {
		url: `${Rn}//${e}?shell=${encodeURIComponent(n)}`,
		shellId: n
	};
}
function Kn(e) {
	let t = [], n = /"([^"]*)"|'([^']*)'|(\S+)/g, r = n.exec(e);
	for (; r;) t.push(r[1] ?? r[2] ?? r[3] ?? ""), r = n.exec(e);
	return t;
}
function qn(e, t) {
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
function Jn(e) {
	return e.endsWith("/") ? `${Q.bold}${Q.blue}${e.slice(0, -1)}${Q.reset}` : e;
}
var Yn = class extends EventTarget {
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
		this.shellId = new URLSearchParams(t < 0 ? "" : e.slice(t + 1)).get("shell") ?? "mock-shell", this.session = Wn.get(this.shellId) ?? {
			cwd: Z,
			attached: !1
		}, Wn.set(this.shellId, this.session), this.later(() => this.handshake(), 60);
	}
	send(e) {
		if (this.readyState !== this.OPEN) return;
		let t = Xn(e);
		if (!t || t.length === 0) return;
		let n = t[0];
		if (n === V.CLOSE) {
			this.exit(0);
			return;
		}
		n === V.STDIN && this.feed(this.decoder.decode(t.subarray(1)));
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
		this.readyState = this.OPEN, this.frame(V.STATUS, JSON.stringify({ metadata: {
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
		this.frame(V.STDOUT, e);
	}
	fail(e) {
		this.frame(V.STDERR, `${Q.red}${e}${Q.reset}\r\n`);
	}
	prompt() {
		this.write(`${Q.green}${zn}${Q.reset}:${Q.bold}${Q.blue}${this.session.cwd}${Q.reset}$ `);
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
		this.frame(V.STATUS, JSON.stringify({ details: { causes: [{
			reason: "ExitCode",
			message: String(e)
		}] } })), Wn.delete(this.shellId), this.close(1e3, "shell exited");
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
			await this.dispatch(Kn(t));
		} finally {
			this.busy = !1, this.readyState === this.OPEN && this.prompt();
		}
	}
	async dispatch(e) {
		let [t, ...n] = e;
		switch (t) {
			case "help":
				this.write(`${Un.join("\r\n")}\r\n`);
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
		let t = qn(this.session.cwd, e.find((e) => !e.startsWith("-")) ?? "."), n = Bn[t];
		if (!n) {
			if (Vn[t] !== void 0) {
				this.write(`${t}\r\n`);
				return;
			}
			this.fail(`ls: cannot access '${t}': No such file or directory`);
			return;
		}
		let r = e.some((e) => e.startsWith("-") && e.includes("a")) ? n : n.filter((e) => !e.startsWith("."));
		this.write(`${r.map(Jn).join("  ")}\r\n`);
	}
	chdir(e) {
		let t = qn(this.session.cwd, e[0] ?? "~");
		if (!Bn[t]) {
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
			let e = qn(this.session.cwd, t), n = Vn[e];
			if (n === void 0) {
				this.fail(Bn[e] ? `cat: ${t}: Is a directory` : `cat: ${t}: No such file or directory`);
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
			let r = qn(this.session.cwd, t), i = Vn[r];
			if (i === void 0) {
				this.fail(`${e}: cannot open '${t}' for reading: ${Bn[r] ? "Is a directory" : "No such file or directory"}`);
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
		for (let [e, t] of Hn) {
			if (await this.wait(520), this.cancelled || this.readyState !== this.OPEN) return;
			this.write(`  ${Q.cyan}⏺${Q.reset} ${Q.bold}${e}${Q.reset}(${t})\r\n`);
		}
		await this.wait(420), !(this.cancelled || this.readyState !== this.OPEN) && this.write(`${Q.green}✓${Q.reset} done · ${Hn.length + 1} turns · 6.4s · ${Q.yellow}$0.0184${Q.reset}\r\n`);
	}
};
function Xn(e) {
	return ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : e instanceof ArrayBuffer ? new Uint8Array(e) : null;
}
var Zn = null;
function Qn(e = {}) {
	let t = e.scheme ?? "mock-shell:", n = globalThis.WebSocket;
	if (typeof n != "function") return () => {};
	if (Zn) Zn.count += 1;
	else {
		class e extends n {
			constructor(e, n) {
				let r = typeof e == "string" ? e : e.href;
				if (r.startsWith(t)) return new Yn(r);
				super(e, n);
			}
		}
		globalThis.WebSocket = e, Zn = {
			native: n,
			count: 1
		};
	}
	let r = !1;
	return () => {
		r || !Zn || (r = !0, --Zn.count, !(Zn.count > 0) && (globalThis.WebSocket = Zn.native, Zn = null, Wn.clear()));
	};
}
//#endregion
//#region src/components/compute/fixtures/mockTail.ts
var $n = "mock-tail:", er = (e) => ({
	type: "assistant",
	message: { content: [{
		type: "text",
		text: e
	}] }
}), tr = (e, t) => ({
	type: "assistant",
	message: { content: [{
		type: "tool_use",
		name: e,
		input: t
	}] }
}), nr = [
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
				data: er("Reading the lockfile and resolving the dependency graph.")
			},
			{
				afterMs: 1300,
				data: tr("Bash", { command: "npm audit --json" })
			},
			{
				afterMs: 2100,
				data: er("3 advisories: 1 high, 2 moderate. Checking whether the high one is reachable.")
			},
			{
				afterMs: 1700,
				data: tr("Grep", { pattern: "serialize-javascript" })
			},
			{
				afterMs: 2400,
				data: er("Reachable from the report renderer only. Bumping it and pinning the transitive.")
			},
			{
				afterMs: 1400,
				data: tr("Edit", { file: "package.json" })
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
				data: er("Pulling the last 40 CI runs.")
			},
			{
				afterMs: 1500,
				data: tr("Bash", { command: "gh run list --limit 40" })
			},
			{
				afterMs: 2300,
				data: er("Two suites flap: session-epoch and the canary rollup. Both look time-dependent.")
			},
			{
				afterMs: 1900,
				data: tr("Read", { file: "src/lib/__tests__/session-epoch.test.ts" })
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
				data: er("Dumping the live schema.")
			},
			{
				afterMs: 1600,
				data: tr("Bash", { command: "psql -c \"\\d+ public.*\"" })
			},
			{
				afterMs: 2400,
				data: er("One table differs: environments has a column the checked-in DDL does not.")
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
];
function rr(e, t) {
	return `${$n}//${e}${t ? `?script=${encodeURIComponent(t)}` : ""}`;
}
function ir(e) {
	let t = /script=([^&]+)/.exec(e)?.[1];
	if (t) {
		let e = nr.find((e) => e.id === decodeURIComponent(t));
		if (e) return e;
	}
	let n = e.slice(10).replace(/^\/+/, "").split("?")[0] ?? "", r = 0;
	for (let e of n) r = r * 31 + e.charCodeAt(0) >>> 0;
	return nr[r % nr.length];
}
var ar = class {
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
		let n = ir(e), r = 0;
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
function or(e = {}) {
	let t = e.scheme ?? "mock-tail:", n = globalThis.EventSource;
	if ($) $.count += 1;
	else {
		$ = {
			native: n,
			count: 1
		};
		let e = function(e, r) {
			if (typeof e == "string" && e.startsWith(t)) return new ar(e, r);
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
export { Re as AGENT_PANE_KIND, Ae as AGENT_STATUSES, it as ATTENTION_ORDER, ue as AgentPane, D as COMPUTE_STATUS, Me as COMPUTE_STORAGE_KEYS, An as ComputeDock, Qe as ComputeProvider, hn as ComputerLab, oe as DEFAULT_IDLE_WINDOW_MS, Xt as DEFAULT_KEYMAP, Oe as DEFAULT_PANE_KINDS, et as DETACH_BYTE, Ve as DOCK_STORAGE_KEY, tt as FLEET_STORAGE_KEY, Ne as HEARTBEAT_MS, Pe as LAB_LAYOUT_STORAGE_KEY, We as LOGS_PANE_KIND, dn as LabChooser, Rt as LabFleetRail, Wt as LabHeader, Kt as LabPaneToolbar, cn as LabRail, ye as LogsPane, Fe as MAX_FRAME_BYTES, dt as MAX_RATIO, H as MAX_RETRIES, pe as MAX_SHELLS, ut as MIN_RATIO, Rn as MOCK_SHELL_SCHEME, $n as MOCK_TAIL_SCHEME, nr as MOCK_TAIL_SCRIPTS, Tn as MachinePresenceMenu, ie as PaneStatusLine, fn as PaneTreeView, on as ProjectSummary, V as SHELL_CHANNEL, Xe as SHELL_PANE_KIND, re as SHELL_STATUS, Be as ShellTerminal, je as TAIL_PANE_KIND, Yt as TMUX_LEADER, he as TailPane, ne as UNASSIGNED_PROJECT_ID, Nn as WORKSPACE_ENTRY_CAP, jn as WORKSPACE_FIND_COMMAND, Mn as WORKSPACE_GIT_COMMAND, Jt as WorkspacePane, Tt as arrangePanes, Pn as buildWorkspaceTree, Ce as byAttention, ze as byteRate, Ie as clearComputeStorage, ce as clockTime, Le as closeAdvice, gt as closePane, M as closeShell, In as countDescendants, mt as countPanes, Ke as createComputeClient, B as currentRun, qe as cycleLayout, xt as cyclePane, j as cycleShell, Mt as defaultKindFor, _e as elapsed, St as enclosingSplit, R as encodeFrame, De as encodeResize, nt as exhaustedAdvice, at as exitCodeOf, O as expiryPressure, pt as findLeaf, le as fixtureComputers, F as fixtureMachines, me as fixtureModels, P as fixtureRuntimeStatus, we as fixtureWorkspace, I as focusShell, ve as formatRate, T as formatTokens, un as fuzzyScore, Te as getDock, en as groupBindings, Lt as groupQuickLine, A as hasAgent, Qn as installMockShellSocket, or as installMockTailSource, Zt as isLeaderKey, rt as isLocalComputer, jt as kindsFor, tn as labelFor, yt as layoutRects, X as listLeaves, ft as makeLeaf, $t as matchBinding, Qt as matchLeaderBinding, N as matchesQuery, xn as memorySummary, Gn as mockShellUrl, rr as mockTailUrl, bt as neighborPane, Nt as nextKind, Ee as openShell, Sn as providerSummary, Pt as quotaUsage, Ct as ratioOf, xe as reconcileDock, se as reportShellStatus, At as resolveKind, E as rollUpProjects, L as selectShellByIndex, $e as setDockVisible, Ue as setGeometry, Ye as setMode, _t as setRatio, ae as shortModelName, z as showsAllPanes, ht as splitPane, k as statusOf, be as stepLevel, fe as stepSource, ke as subscribeDock, de as summarizeFleet, Se as summarizeTool, Ge as toggleFloating, vt as updateLeaf, He as useCompute, Ze as useComputeFleet, Je as useComputeOptional, w as useComputeProjects, ge as useComputeTail, ot as useComputeTask, kt as useLabLayout, te as useProjectRollups, Ln as visibleRows };
