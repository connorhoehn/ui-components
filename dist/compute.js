import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Chip-DYqbAD3L.js";
import { t as n } from "./TitledFrame-DUsxfZCI.js";
import { t as r } from "./DotMeter-BDVkadI8.js";
import { t as i } from "./StatusDot-Bgx2zxgC.js";
import { t as a } from "./InlinePopover-sx7SpM1v.js";
import { t as o } from "./SectionLabel-bcrhNYOr.js";
import { t as s } from "./InlinePlaceholder-51dbPRGn.js";
import { n as c } from "./FloatingPanel-6GL9dXGL.js";
import { a as l, c as u, d, f, i as p, l as m, n as h, o as g, r as _, s as v, t as y, u as b } from "./useComputeProjects-i0rI20XE.js";
import { A as x, B as S, C, D as w, E as ee, F as T, G as te, H as E, I as D, J as O, K as ne, L as k, M as A, N as j, O as M, P as re, R as ie, S as ae, T as N, U as oe, V as se, W as ce, Y as P, _ as le, a as ue, b as de, c as fe, d as pe, f as F, g as me, h as he, i as ge, j as I, k as _e, l as ve, m as ye, n as be, o as xe, p as Se, q as L, r as R, s as Ce, t as we, u as Te, v as Ee, w as De, x as Oe, y as ke, z as Ae } from "./ComputeContext-Bfn9rsN-.js";
import { Fragment as je, useCallback as z, useEffect as B, useMemo as V, useRef as H, useState as U, useSyncExternalStore as Me } from "react";
import { Fragment as Ne, jsx as W, jsxs as G } from "react/jsx-runtime";
//#region src/components/compute/lib/paneTree.ts
var Pe = .1, Fe = .9;
function Ie(e, t, n) {
	return {
		kind: "leaf",
		id: e,
		computerId: t,
		kindId: n
	};
}
function K(e) {
	return e.kind === "leaf" ? [e] : [...K(e.a), ...K(e.b)];
}
function Le(e, t) {
	return K(e).find((e) => e.id === t) ?? null;
}
function Re(e) {
	return K(e).length;
}
function ze(e, t, n, r, i) {
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
function Be(e, t) {
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
function Ve(e, t, n) {
	let r = Math.min(Fe, Math.max(Pe, n)), i = (e) => e.kind === "leaf" ? e : e.id === t ? {
		...e,
		ratio: r
	} : {
		...e,
		a: i(e.a),
		b: i(e.b)
	};
	return i(e);
}
function He(e, t, n) {
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
function q(e, t = {
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
		return [...q(e.a, {
			...t,
			width: n
		}), ...q(e.b, {
			...t,
			x: t.x + n,
			width: t.width - n
		})];
	}
	let i = t.height * r;
	return [...q(e.a, {
		...t,
		height: i
	}), ...q(e.b, {
		...t,
		y: t.y + i,
		height: t.height - i
	})];
}
function Ue(e, t, n) {
	let r = q(e), i = r.find((e) => e.id === t);
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
function We(e, t, n) {
	let r = q(e);
	if (r.length < 2) return null;
	let i = r.findIndex((e) => e.id === t);
	return i < 0 ? r[0]?.id ?? null : r[(i + n + r.length) % r.length]?.id ?? null;
}
function Ge(e, t, n) {
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
function Ke(e, t) {
	return e.kind === "leaf" ? null : e.id === t ? e.ratio : Ke(e.a, t) ?? Ke(e.b, t);
}
//#endregion
//#region src/components/compute/hooks/useLabLayout.ts
var qe = 0, J = (e) => `${e}-${(qe += 1).toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
function Je() {
	let e = {
		windows: [],
		activeWindowId: null,
		activePaneId: null,
		zoomedPaneId: null
	};
	try {
		let t = globalThis.localStorage?.getItem(L);
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
function Ye() {
	let [e, t] = U(Je);
	B(() => {
		try {
			globalThis.localStorage?.setItem(L, JSON.stringify(e));
		} catch {}
	}, [e]);
	let n = V(() => e.windows.find((t) => t.id === e.activeWindowId) ?? e.windows[0] ?? null, [e.windows, e.activeWindowId]), r = V(() => n ? K(n.root) : [], [n]), i = V(() => [...new Set(r.map((e) => e.computerId))], [r]), a = z((e, n) => {
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
	}, []), o = z((e) => {
		t((t) => ({
			...t,
			activePaneId: e
		}));
	}, []), s = z((t, n, r) => {
		let i = Ie(J("pane"), n, r);
		a((n) => {
			let r = e.activePaneId && Le(n, e.activePaneId) ? e.activePaneId : K(n)[0]?.id;
			return r ? ze(n, r, t, i, J("split")) : n;
		}, () => ({
			activePaneId: i.id,
			zoomedPaneId: null
		}));
	}, [a, e.activePaneId]), c = z(() => {
		t((e) => {
			let t = e.windows.find((t) => t.id === e.activeWindowId) ?? e.windows[0];
			if (!t || !e.activePaneId) return e;
			if (Re(t.root) <= 1) {
				let n = e.windows.filter((e) => e.id !== t.id), r = n[0] ?? null;
				return {
					windows: n,
					activeWindowId: r?.id ?? null,
					activePaneId: r ? K(r.root)[0]?.id ?? null : null,
					zoomedPaneId: null
				};
			}
			let n = Be(t.root, e.activePaneId), r = K(n);
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
	}, []), l = z((e, t) => a((n) => He(n, e, { computerId: t })), [a]), u = z((e, t) => a((n) => He(n, e, { kindId: t })), [a]), d = z((e, t) => a((n) => Ve(n, e, t)), [a]), f = z((e) => {
		t((t) => {
			let n = t.windows.find((e) => e.id === t.activeWindowId) ?? t.windows[0];
			if (!n || !t.activePaneId) return t;
			let r = Ue(n.root, t.activePaneId, e);
			return r ? {
				...t,
				activePaneId: r,
				zoomedPaneId: null
			} : t;
		});
	}, []), p = z((e) => {
		t((t) => {
			let n = t.windows.find((e) => e.id === t.activeWindowId) ?? t.windows[0];
			if (!n || !t.activePaneId) return t;
			let r = We(n.root, t.activePaneId, e);
			return r ? {
				...t,
				activePaneId: r,
				zoomedPaneId: null
			} : t;
		});
	}, []), m = z(() => {
		t((e) => ({
			...e,
			zoomedPaneId: e.zoomedPaneId ? null : e.activePaneId
		}));
	}, []), h = z((e, n) => {
		let r = Ie(J("pane"), e, n), i = {
			id: J("win"),
			root: r
		};
		t((e) => ({
			windows: [...e.windows, i],
			activeWindowId: i.id,
			activePaneId: r.id,
			zoomedPaneId: null
		}));
	}, []), g = z((e) => {
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
				activePaneId: r ? K(r.root)[0]?.id ?? null : null,
				zoomedPaneId: null
			};
		});
	}, []), _ = z((e) => {
		t((t) => {
			let n = t.windows.find((t) => t.id === e);
			return n ? {
				...t,
				activeWindowId: e,
				activePaneId: K(n.root)[0]?.id ?? null,
				zoomedPaneId: null
			} : t;
		});
	}, []), v = z((e) => {
		t((t) => {
			if (t.windows.length < 2) return t;
			let n = t.windows.findIndex((e) => e.id === t.activeWindowId), r = t.windows[(n + e + t.windows.length) % t.windows.length];
			return r ? {
				...t,
				activeWindowId: r.id,
				activePaneId: K(r.root)[0]?.id ?? null,
				zoomedPaneId: null
			} : t;
		});
	}, []), y = z((e, n) => {
		e && t((t) => {
			if (t.windows.length > 0) {
				if (t.activePaneId) return t;
				let e = t.windows.find((e) => e.id === t.activeWindowId) ?? t.windows[0];
				return e ? {
					...t,
					activeWindowId: e.id,
					activePaneId: K(e.root)[0]?.id ?? null
				} : t;
			}
			let r = Ie(J("pane"), e, n), i = {
				id: J("win"),
				root: r
			};
			return {
				windows: [i],
				activeWindowId: i.id,
				activePaneId: r.id,
				zoomedPaneId: null
			};
		});
	}, []), b = z((e) => {
		let n = new Set(e);
		t((e) => {
			let t = !1, r = [];
			for (let i of e.windows) {
				let e = i.root;
				for (let r of K(i.root)) n.has(r.computerId) || (t = !0, e = Re(e) <= 1 ? e : Be(e, r.id));
				if (Re(e) === 1 && !n.has(K(e)[0].computerId)) {
					t = !0;
					continue;
				}
				r.push(e === i.root ? i : {
					...i,
					root: e
				});
			}
			if (!t) return e;
			let i = r.find((t) => t.id === e.activeWindowId) ?? r[0] ?? null, a = i ? K(i.root) : [];
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
		newWindow: h,
		closeWindow: g,
		selectWindow: _,
		stepWindow: v,
		ensureSeeded: y,
		reconcile: b
	};
}
//#endregion
//#region src/components/compute/lib/paneKinds.ts
function Xe(e, t) {
	return e.find((e) => e.id === t) ?? e[0] ?? null;
}
function Ze(e, t) {
	return e.length === 0 ? null : e[(e.findIndex((e) => e.id === t) + 1) % e.length] ?? null;
}
function Qe(e, t, n) {
	return t.filter((t) => Xe(e, t)?.quota === n).length;
}
//#endregion
//#region src/components/compute/lib/keymap.ts
var $e = {
	key: "b",
	ctrl: !0,
	label: "⌃B"
}, et = [
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
function tt(e, t) {
	return !e || e.key.toLowerCase() !== t.key.toLowerCase() ? !1 : !!e.ctrl === t.ctrlKey && !!e.meta === t.metaKey && !!e.alt === t.altKey;
}
function nt(e, t) {
	let n = t.key.toLowerCase();
	return e.find((e) => e.leaderKey && e.leaderKey.toLowerCase() === n)?.command ?? null;
}
function rt(e, t) {
	let n = t.metaKey || t.ctrlKey;
	for (let r of e) if (r.key.toLowerCase() === t.key.toLowerCase() && !!(r.meta || r.ctrl) === n && !!r.shift === t.shiftKey && !!r.alt === t.altKey) return r.command;
	return null;
}
function it(e) {
	return [
		"panes",
		"navigate",
		"lab"
	].map((t) => ({
		group: t,
		bindings: e.filter((e) => e.group === t)
	})).filter((e) => e.bindings.length > 0);
}
function at(e, t) {
	return e.find((e) => e.command === t)?.label ?? null;
}
//#endregion
//#region src/components/compute/lib/chromeTokens.ts
var ot = {
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
function st(e) {
	return e === "app" ? ot : void 0;
}
//#endregion
//#region src/components/compute/components/ProjectSummary.tsx
function ct(e) {
	let t = Math.max(0, Math.round(e / 6e4));
	return t < 60 ? `${t}m` : `${Math.floor(t / 60)}h ${String(t % 60).padStart(2, "0")}m`;
}
function lt({ project: n, showMeter: i = !0, className: a, "data-testid": o }) {
	let { budgetUsd: s, spentUsd: c, maintenanceUsd: l, tokensUsed: u, tokenBudget: d } = n, f = typeof s == "number" && s > 0, p = c ?? n.liveSpendUsd, m = f ? p / s : 0, g = f && l ? l / s : null, _ = n.computers.length, v = n.id === y;
	return /* @__PURE__ */ G("div", {
		"data-testid": o,
		className: e("flex flex-col gap-1 font-mono min-w-0", a),
		children: [
			/* @__PURE__ */ G("div", {
				className: "flex items-center gap-2 text-[10px] leading-none min-w-0 flex-wrap",
				children: [
					f ? /* @__PURE__ */ G("span", {
						className: "text-code-subtle tabular-nums shrink-0",
						children: [
							"$",
							p.toFixed(2),
							/* @__PURE__ */ G("span", {
								className: "text-code-muted",
								children: [" / $", s.toFixed(0)]
							})
						]
					}) : /* @__PURE__ */ W("span", {
						className: "text-code-subtle tabular-nums shrink-0",
						children: p > 0 ? `$${p.toFixed(2)}` : "$—"
					}),
					u != null && /* @__PURE__ */ G(Ne, { children: [/* @__PURE__ */ W("span", {
						"aria-hidden": "true",
						className: "text-code-raised",
						children: "│"
					}), /* @__PURE__ */ G("span", {
						className: "text-code-muted tabular-nums shrink-0",
						title: d ? `${u} of ${d} tokens` : `${u} tokens`,
						children: [
							h(u),
							d ? /* @__PURE__ */ G("span", {
								className: "text-code-raised",
								children: ["/", h(d)]
							}) : null,
							" tok"
						]
					})] }),
					/* @__PURE__ */ W("span", { className: "flex-1 min-w-0" }),
					n.botCount != null && n.botCount > 0 && /* @__PURE__ */ G(t, {
						size: "xs",
						mono: !0,
						tone: "neutral",
						title: "Automations attached to this project",
						children: [
							n.botCount,
							" ",
							n.botCount === 1 ? "bot" : "bots"
						]
					}),
					_ > 0 && /* @__PURE__ */ G(t, {
						size: "xs",
						mono: !0,
						tone: n.activeCount > 0 ? "info" : "neutral",
						...n.activeCount > 0 ? { dot: "pulse" } : {},
						title: n.activeCount > 0 ? `${n.activeCount} of ${_} doing something right now` : `${_} idle`,
						children: [n.activeCount > 0 ? `${n.activeCount}/${_}` : _, " ▣"]
					}),
					n.soonestExpiryMs != null && /* @__PURE__ */ G(t, {
						size: "xs",
						mono: !0,
						tone: n.soonestExpiryMs < 3e5 ? "warning" : "neutral",
						title: "Time until the first of these computers stops on its own",
						children: ["⟳ ", ct(n.soonestExpiryMs)]
					})
				]
			}),
			i && f && /* @__PURE__ */ W(r, {
				label: "budget",
				value: m,
				note: g == null ? n.periodResetsAt ? `⟳ ${new Date(n.periodResetsAt).toLocaleDateString()}` : void 0 : `${Math.round(g * 100)}% is upkeep`,
				tone: "code"
			}),
			v && /* @__PURE__ */ W("span", {
				className: "text-[10px] text-code-raised",
				children: "not charged to any project"
			})
		]
	});
}
//#endregion
//#region src/components/compute/components/LabRail.tsx
var ut = {
	waiting: 0,
	error: 1,
	running: 2,
	idle: 3,
	stopped: 4
};
function dt({ computers: n, activeComputerId: r, openComputerIds: i, onSelect: a, onOpenInPane: o, onWatch: s, onCreate: c, onOpenMenu: l, showAllActivity: d, onToggleShowAll: p, canManage: h = !1, models: g = [], className: _ }) {
	let v = new Set(i), b = n.filter((e) => {
		let t = f(e);
		return t === "running" || t === "waiting" || t === "error";
	}), x = [...d ? n : b].sort((e, t) => (ut[f(e)] ?? 9) - (ut[f(t)] ?? 9)), S = R(), C = S?.projects ?? [], w = S?.projectsAbsent ?? !0, ee = C.filter((e) => e.id !== "__unassigned__" && e.computers.length > 0), T = C.find((e) => e.id === y), te = !w && ee.length > 0 ? [...ee.map((e) => ({
		id: e.id,
		computers: e.computers,
		heading: /* @__PURE__ */ G("div", {
			role: "presentation",
			className: "px-3 pt-2 pb-1 border-t border-code-border first:border-t-0 first:pt-1",
			children: [/* @__PURE__ */ W("span", {
				className: "block text-[11px] font-mono text-code-subtle truncate",
				children: e.name
			}), /* @__PURE__ */ W(lt, {
				project: e,
				showMeter: !1,
				className: "mt-0.5"
			})]
		})
	})), ...T && T.computers.length > 0 ? [{
		id: y,
		computers: T.computers,
		heading: /* @__PURE__ */ W("div", {
			role: "presentation",
			className: "px-3 pt-2 pb-1 text-[10px] font-mono text-code-raised lowercase tracking-wide border-t border-code-border",
			children: "unassigned"
		})
	}] : []] : null;
	return /* @__PURE__ */ G("div", {
		className: e("flex flex-col h-full min-h-0 bg-code-panel border-r border-code-border", _),
		children: [
			/* @__PURE__ */ W(ft, {
				title: "computers",
				count: n.length,
				rows: n,
				groups: te,
				activeId: r,
				onSelect: a,
				onOpenInPane: o ?? null,
				open: v,
				renderSub: null
			}),
			/* @__PURE__ */ G("div", {
				className: "flex items-center px-3 py-1.5 border-y border-code-border shrink-0",
				children: [
					h && c ? /* @__PURE__ */ W("button", {
						type: "button",
						onClick: c,
						className: "text-[11px] font-mono text-code-green bg-transparent border-none cursor-pointer p-0 hover:underline",
						children: "new"
					}) : /* @__PURE__ */ W("span", {
						className: "text-[11px] font-mono text-code-raised",
						children: "new"
					}),
					/* @__PURE__ */ W("span", { className: "flex-1" }),
					/* @__PURE__ */ W("button", {
						type: "button",
						onClick: l,
						"aria-label": "Keyboard shortcuts",
						title: "Keyboard shortcuts",
						className: "text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer p-0 hover:text-code-text",
						children: "keys"
					})
				]
			}),
			/* @__PURE__ */ W(ft, {
				title: "agents",
				count: b.length,
				rows: x,
				activeId: r,
				onSelect: a,
				onOpenInPane: o ?? null,
				open: v,
				action: /* @__PURE__ */ W("button", {
					type: "button",
					onClick: p,
					"aria-pressed": d,
					title: d ? "Show only boxes doing something" : "Show every box",
					className: e("text-[11px] font-mono bg-transparent border-none cursor-pointer p-0", d ? "text-code-blue" : "text-code-muted hover:text-code-text"),
					children: "all"
				}),
				onWatch: s ?? null,
				renderSub: (e) => {
					let n = f(e), r = e.lastResult ? u(null, g) : null;
					return /* @__PURE__ */ G("span", {
						className: "flex items-center gap-1 truncate",
						children: [
							/* @__PURE__ */ W(t, {
								size: "xs",
								mono: !0,
								tone: m[n].tone,
								className: "bg-transparent px-0",
								children: m[n].label
							}),
							e.currentTask && /* @__PURE__ */ G(Ne, { children: [/* @__PURE__ */ W("span", {
								"aria-hidden": "true",
								className: "text-code-raised",
								children: "·"
							}), /* @__PURE__ */ W("span", {
								className: "truncate text-code-comment",
								children: e.currentTask
							})] }),
							!e.currentTask && r && /* @__PURE__ */ G(Ne, { children: [/* @__PURE__ */ W("span", {
								"aria-hidden": "true",
								className: "text-code-raised",
								children: "·"
							}), /* @__PURE__ */ W("span", {
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
function ft({ title: t, count: n, rows: r, activeId: a, open: o, onSelect: s, onOpenInPane: c, action: l, renderSub: u, onWatch: d = null, groups: p = null }) {
	let h = H(null), g = z((e) => {
		if (![
			"ArrowDown",
			"ArrowUp",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = Array.from(h.current?.querySelectorAll("[data-rail-row]") ?? []);
		if (t.length === 0) return;
		let n = t.findIndex((e) => e === document.activeElement);
		e.preventDefault(), t[e.key === "Home" ? 0 : e.key === "End" ? t.length - 1 : n < 0 ? 0 : (n + (e.key === "ArrowDown" ? 1 : -1) + t.length) % t.length]?.focus();
	}, []);
	return /* @__PURE__ */ G("div", {
		className: "flex flex-col min-h-0 flex-1",
		children: [/* @__PURE__ */ G("div", {
			className: "flex items-center gap-2 px-3 py-2 shrink-0",
			children: [
				/* @__PURE__ */ W("span", {
					className: "text-[11px] font-mono text-code-subtle lowercase tracking-wide",
					children: t
				}),
				/* @__PURE__ */ W("span", {
					className: "text-[10px] font-mono text-code-raised tabular-nums",
					children: n
				}),
				/* @__PURE__ */ W("span", { className: "flex-1" }),
				l
			]
		}), r.length === 0 ? /* @__PURE__ */ W("div", {
			className: "px-3 pb-3 text-[11px] font-mono text-code-raised",
			children: "nothing here"
		}) : /* @__PURE__ */ W("div", {
			ref: h,
			role: "listbox",
			"aria-label": t,
			onKeyDown: g,
			className: "flex-1 min-h-0 overflow-y-auto pb-1",
			children: p ? p.map((e) => /* @__PURE__ */ G("div", {
				role: "presentation",
				children: [e.heading, e.computers.map(_)]
			}, e.id)) : r.map(_)
		})]
	});
	function _(t) {
		let n = f(t), r = m[n], l = t.id === a;
		return /* @__PURE__ */ G("div", {
			role: "presentation",
			className: e("group relative flex items-stretch", l ? "bg-code-surface" : "hover:bg-code-surface/60"),
			children: [/* @__PURE__ */ G("button", {
				"data-rail-row": !0,
				type: "button",
				role: "option",
				"aria-selected": l,
				tabIndex: l ? 0 : -1,
				title: `${r.label} — ${r.help}`,
				onClick: () => s(t),
				onAuxClick: (e) => {
					e.button === 1 && c && (e.preventDefault(), c(t));
				},
				onKeyDown: (e) => {
					e.key === "Enter" && (e.metaKey || e.ctrlKey) && c && (e.preventDefault(), c(t));
				},
				className: e("min-w-0 flex-1 text-left flex items-start gap-2 px-3 py-1.5 border-l-2 cursor-pointer bg-transparent transition-colors", "focus:outline-none focus-visible:ring-1 focus-visible:ring-code-blue focus-visible:ring-inset", l ? "border-code-blue" : "border-transparent"),
				children: [
					/* @__PURE__ */ W(i, {
						size: "xs",
						color: r.color,
						pulse: r.pulse,
						className: "mt-[5px]",
						"aria-label": r.label
					}),
					/* @__PURE__ */ G("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ W("span", {
							className: e("block text-[12px] font-mono truncate", l ? "text-code-text" : "text-code-subtle"),
							children: t.label
						}), u && /* @__PURE__ */ W("span", {
							className: "block text-[10px] font-mono truncate",
							children: u(t)
						})]
					}),
					o.has(t.id) && /* @__PURE__ */ W("span", {
						"aria-label": "open in a pane",
						title: "Open in a pane",
						className: "mt-[3px] text-[9px] font-mono text-code-blue shrink-0",
						children: "▣"
					})
				]
			}), d && /* @__PURE__ */ W("button", {
				type: "button",
				tabIndex: -1,
				onClick: () => d(t),
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
function pt(e, t) {
	if (!t) return 0;
	let n = e.toLowerCase(), r = t.toLowerCase(), i = 0, a = 0, o = -1;
	for (let e of r) {
		let t = n.indexOf(e, i);
		if (t < 0) return null;
		a += o >= 0 ? t - o - 1 : t, o = t, i = t + 1;
	}
	return a;
}
function mt({ open: n, onClose: r, computers: a, panes: o, onJumpToPane: s, onRetarget: c, onOpenInSplit: l, projects: u = [], onSelectProject: d, chrome: p = "code" }) {
	let [h, g] = U(""), [_, v] = U(0), y = H(null), b = H(null), x = V(() => new Map(a.map((e) => [e.id, e])), [a]), S = V(() => {
		let e = [];
		for (let t of o) {
			let n = x.get(t.computerId);
			if (!n) continue;
			let r = pt(`${n.label} ${t.kindId}`, h);
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
		let t = new Set(o.map((e) => e.computerId)), n = [];
		for (let e of a) {
			if (t.has(e.id)) continue;
			let r = pt(`${e.label} ${e.sessionId}`, h);
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
		if (d && h.trim()) for (let e of u) {
			let t = pt(e.name, h);
			t != null && r.push({
				row: {
					kind: "project",
					id: `proj:${e.id}`,
					project: e
				},
				score: t
			});
		}
		let i = (e, t) => e.score - t.score;
		return [
			...e.sort(i),
			...n.sort(i),
			...r.sort(i)
		].map((e) => e.row);
	}, [
		o,
		a,
		x,
		h,
		u,
		d
	]);
	if (B(() => {
		if (n) {
			g(""), v(0);
			let e = setTimeout(() => y.current?.focus(), 0);
			return () => clearTimeout(e);
		}
	}, [n]), B(() => {
		v((e) => Math.min(e, Math.max(0, S.length - 1)));
	}, [S.length]), B(() => {
		b.current?.querySelector("[data-highlighted=\"true\"]")?.scrollIntoView({ block: "nearest" });
	}, [_]), !n) return null;
	let C = (e, t) => {
		e && (e.kind === "project" ? d?.(e.project) : e.kind === "pane" ? s(e.pane.id) : t ? l(e.computer) : c(e.computer), r());
	};
	return /* @__PURE__ */ W("div", {
		className: "absolute inset-0 z-20 flex items-start justify-center pt-[12vh] bg-code-bg/70",
		onClick: r,
		children: /* @__PURE__ */ G("div", {
			style: st(p),
			onClick: (e) => e.stopPropagation(),
			role: "dialog",
			"aria-label": "Jump to a computer, pane or project",
			className: "w-[480px] max-w-[92vw] rounded-lg border border-code-border bg-code-panel overflow-hidden font-mono shadow-2xl",
			children: [/* @__PURE__ */ G("div", {
				className: "flex items-center gap-2 px-3 py-2 border-b border-code-border",
				children: [
					/* @__PURE__ */ W("span", {
						"aria-hidden": "true",
						className: "text-code-green text-[12px]",
						children: "/"
					}),
					/* @__PURE__ */ W("input", {
						ref: y,
						value: h,
						onChange: (e) => {
							g(e.target.value), v(0);
						},
						onKeyDown: (e) => {
							e.key === "ArrowDown" || e.key === "n" && e.ctrlKey ? (e.preventDefault(), v((e) => S.length ? (e + 1) % S.length : 0)) : e.key === "ArrowUp" || e.key === "p" && e.ctrlKey ? (e.preventDefault(), v((e) => S.length ? (e - 1 + S.length) % S.length : 0)) : e.key === "Enter" ? (e.preventDefault(), C(S[_], e.shiftKey)) : e.key === "Escape" && (e.preventDefault(), r());
						},
						placeholder: "jump to a computer, pane or project…",
						"aria-label": "Filter computers, panes and projects",
						className: "flex-1 min-w-0 bg-transparent border-none outline-none text-[12px] text-code-text placeholder:text-code-raised"
					}),
					/* @__PURE__ */ W("span", {
						className: "text-[10px] text-code-raised shrink-0 hidden sm:inline",
						children: "⏎ jump · ⇧⏎ split"
					})
				]
			}), /* @__PURE__ */ W("div", {
				ref: b,
				role: "listbox",
				"aria-label": "Results",
				className: "max-h-[46vh] overflow-y-auto",
				children: S.length === 0 ? /* @__PURE__ */ G("div", {
					className: "px-3 py-4 text-[11px] text-code-raised",
					children: [
						"nothing matches “",
						h,
						"”"
					]
				}) : S.map((n, r) => {
					let a = r === _;
					if (n.kind === "project") return /* @__PURE__ */ G("div", {
						role: "option",
						"aria-selected": a,
						"data-highlighted": a,
						onMouseEnter: () => v(r),
						onClick: () => C(n, !1),
						className: e("flex flex-col gap-0.5 px-3 py-1.5 cursor-pointer border-l-2", a ? "bg-code-surface border-code-mauve" : "bg-transparent border-transparent"),
						children: [/* @__PURE__ */ G("div", {
							className: "flex items-center gap-2 min-w-0",
							children: [/* @__PURE__ */ W(t, {
								size: "xs",
								mono: !0,
								tone: "accent",
								className: "shrink-0",
								children: "project"
							}), /* @__PURE__ */ W("span", {
								className: e("text-[12px] truncate", a ? "text-code-text" : "text-code-subtle"),
								children: n.project.name
							})]
						}), /* @__PURE__ */ W(lt, {
							project: n.project,
							showMeter: !1,
							className: "pl-1"
						})]
					}, n.id);
					let o = f(n.computer), s = m[o];
					return /* @__PURE__ */ G("div", {
						role: "option",
						"aria-selected": a,
						"data-highlighted": a,
						onMouseEnter: () => v(r),
						onClick: (e) => C(n, e.shiftKey),
						className: e("flex items-center gap-2 px-3 py-1.5 cursor-pointer border-l-2", a ? "bg-code-surface border-code-blue" : "bg-transparent border-transparent"),
						children: [
							/* @__PURE__ */ W(i, {
								size: "xs",
								color: s.color,
								pulse: s.pulse,
								"aria-label": s.label
							}),
							/* @__PURE__ */ W("span", {
								className: e("text-[12px] truncate", a ? "text-code-text" : "text-code-subtle"),
								children: n.computer.label
							}),
							/* @__PURE__ */ W("span", { className: "flex-1" }),
							n.kind === "pane" ? /* @__PURE__ */ G(t, {
								size: "xs",
								mono: !0,
								tone: "info",
								className: "shrink-0",
								children: ["on screen · ", n.pane.kindId]
							}) : /* @__PURE__ */ W(t, {
								size: "xs",
								mono: !0,
								tone: s.tone,
								className: "bg-transparent px-0 shrink-0",
								children: s.label
							})
						]
					}, n.id);
				})
			})]
		})
	});
}
//#endregion
//#region src/components/compute/components/PaneTreeView.tsx
function ht({ node: t, activePaneId: n, zoomedPaneId: r = null, renderLeaf: i, onRatioChange: a, className: o }) {
	if (r) {
		let n = gt(t, r);
		if (n) return /* @__PURE__ */ W("div", {
			className: e("flex min-h-0 min-w-0", o),
			children: i(n)
		});
	}
	return /* @__PURE__ */ W("div", {
		className: e("flex min-h-0 min-w-0", o),
		children: /* @__PURE__ */ W(_t, {
			node: t,
			activePaneId: n,
			renderLeaf: i,
			onRatioChange: a
		})
	});
}
function gt(e, t) {
	return e.kind === "leaf" ? e.id === t ? e : null : gt(e.a, t) ?? gt(e.b, t);
}
function _t({ node: t, activePaneId: n, renderLeaf: r, onRatioChange: i }) {
	let a = H(null), o = z((e) => {
		if (t.kind !== "split") return;
		let n = a.current;
		if (!n) return;
		e.preventDefault();
		let r = t.direction === "row", o = (e) => {
			let a = n.getBoundingClientRect(), o = r ? a.width : a.height;
			if (o <= 0) return;
			let s = r ? e.clientX - a.left : e.clientY - a.top;
			i(t.id, Math.min(Fe, Math.max(Pe, s / o)));
		}, s = () => {
			globalThis.removeEventListener("pointermove", o), globalThis.removeEventListener("pointerup", s), globalThis.removeEventListener("pointercancel", s);
		};
		globalThis.addEventListener("pointermove", o), globalThis.addEventListener("pointerup", s), globalThis.addEventListener("pointercancel", s);
	}, [t, i]), s = z((e) => {
		if (t.kind !== "split") return;
		let n = t.direction === "row", r = n ? "ArrowLeft" : "ArrowUp", a = n ? "ArrowRight" : "ArrowDown";
		if (e.key !== r && e.key !== a) return;
		e.preventDefault();
		let o = e.shiftKey ? .1 : .02;
		i(t.id, t.ratio + (e.key === a ? o : -o));
	}, [t, i]);
	if (t.kind === "leaf") return /* @__PURE__ */ W("div", {
		className: "flex-1 min-w-0 min-h-0 flex",
		children: r(t)
	});
	let c = t.direction === "row", l = Math.round(t.ratio * 1e3) / 10;
	return /* @__PURE__ */ G("div", {
		ref: a,
		className: e("flex flex-1 min-w-0 min-h-0", c ? "flex-row" : "flex-col"),
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex min-w-0 min-h-0",
				style: {
					flexBasis: `${l}%`,
					flexGrow: 0,
					flexShrink: 0
				},
				children: /* @__PURE__ */ W(_t, {
					node: t.a,
					activePaneId: n,
					renderLeaf: r,
					onRatioChange: i
				})
			}),
			/* @__PURE__ */ W("div", {
				role: "separator",
				"aria-orientation": c ? "vertical" : "horizontal",
				"aria-label": `Resize ${c ? "columns" : "rows"}`,
				"aria-valuenow": l,
				"aria-valuemin": Pe * 100,
				"aria-valuemax": Fe * 100,
				tabIndex: 0,
				onPointerDown: o,
				onKeyDown: s,
				className: e("shrink-0 bg-transparent hover:bg-code-blue/40 focus-visible:bg-code-blue/60 focus:outline-none transition-colors", c ? "w-1 cursor-col-resize my-0.5" : "h-1 cursor-row-resize mx-0.5")
			}),
			/* @__PURE__ */ W("div", {
				className: "flex flex-1 min-w-0 min-h-0",
				children: /* @__PURE__ */ W(_t, {
					node: t.b,
					activePaneId: n,
					renderLeaf: r,
					onRatioChange: i
				})
			})
		]
	});
}
//#endregion
//#region src/components/compute/components/ComputerLab.tsx
function vt({ open: t, onClose: n, focusComputerId: i = null, variant: a = "overlay", chrome: o = "app", keymap: s = et, leader: c = null, idleWindowMs: l = g, className: u }) {
	let { computers: d, canManage: f, create: p, models: m, notify: h, refresh: _, paneKinds: v, projects: y } = be(), b = v[0]?.id ?? "agent", x = Ye(), [S, C] = U(!1), [w, ee] = U(""), [T, te] = U(!1), [E, D] = U(!1), [O, ne] = U(!1), [k, A] = U(!1), j = H(/* @__PURE__ */ new Map()), M = H(null), re = H(null), ie = H(null), ae = V(() => new Map(d.map((e) => [e.id, e])), [d]), N = x.panes.find((e) => e.id === x.activePaneId) ?? x.panes[0] ?? null, oe = N ? ae.get(N.computerId) ?? null : null, se = Qe(v, x.panes.map((e) => e.kindId), "shell"), ce = x.windows.length > 0, P = i && ae.has(i) ? i : null, le = P ?? d[0]?.id ?? null;
	B(() => {
		!t || ce || !le || x.ensureSeeded(le, b);
	}, [
		t,
		ce,
		le,
		b,
		x.ensureSeeded
	]);
	let ue = H(null), { focusPane: de, setPaneComputer: fe, panes: pe, activePaneId: F } = x;
	B(() => {
		if (!t || !P || ue.current === P) return;
		let e = pe.find((e) => e.computerId === P);
		if (e) de(e.id);
		else if (F) fe(F, P);
		else return;
		ue.current = P;
	}, [
		t,
		P,
		pe,
		F,
		de,
		fe
	]), B(() => {
		t || (ue.current = null);
	}, [t]);
	let me = x.reconcile, he = V(() => d.map((e) => e.id), [d]);
	B(() => {
		!t || he.length === 0 || me(he);
	}, [
		t,
		he,
		me
	]);
	let ge = z((e, t, n) => {
		n ? j.current.set(e, {
			handle: n,
			kind: t
		}) : j.current.delete(e);
	}, []), I = S ? x.panes : N ? [N] : [], _e = z(() => {
		let e = w.trim();
		if (!e || I.length === 0) return;
		let t = 0;
		for (let n of I) {
			let r = j.current.get(n.id);
			r?.handle.send && r.handle.send(`${e}${r.kind.inputSuffix ?? ""}`) && (t += 1);
		}
		if (t === 0) {
			h({
				tone: "error",
				title: "Nothing received that",
				detail: "No pane was ready to accept input."
			});
			return;
		}
		ee(""), t < I.length && h({
			tone: "info",
			title: `Sent to ${t} of ${I.length} panes`,
			detail: "The rest were not connected."
		});
	}, [
		w,
		I,
		h
	]), ve = z((e) => {
		let t = N?.computerId ?? d[0]?.id;
		t && x.split(e, t, N?.kindId ?? b);
	}, [
		N,
		d,
		x,
		b
	]), ye = z((e, t, n) => {
		if (!n || n.id === t) return;
		let r = Xe(v, t);
		if (n.quota === "shell" && r?.quota !== "shell" && se >= 8) {
			h({
				tone: "error",
				title: "No shell slots left",
				detail: "8 open terminals is the limit here. Close one, or use a pane kind that costs nothing."
			});
			return;
		}
		x.setPaneKind(e, n.id);
	}, [
		x,
		v,
		se,
		h
	]), xe = z(() => {
		N && ye(N.id, N.kindId, Ze(v, N.kindId));
	}, [
		N,
		v,
		ye
	]), Se = z((e) => {
		p(e ? { projectId: e } : void 0).then((e) => {
			x.newWindow(e.id, b), h({
				tone: "success",
				title: `${e.label} ready`,
				detail: "microVM session live · workspace persists"
			});
		}).catch((e) => {
			h({
				tone: "error",
				title: "Provisioning failed",
				detail: e instanceof Error ? e.message : void 0
			});
		});
	}, [
		p,
		x,
		h,
		b
	]);
	B(() => {
		if (!t || !x.activePaneId || O || E) return;
		let e = x.activePaneId, n = requestAnimationFrame(() => j.current.get(e)?.handle.focus?.());
		return () => cancelAnimationFrame(n);
	}, [
		t,
		x.activePaneId,
		x.zoomedPaneId,
		O,
		E
	]);
	let L = z((e) => {
		let t = {
			"focus-left": "left",
			"focus-right": "right",
			"focus-up": "up",
			"focus-down": "down"
		}[e];
		if (t) {
			x.move(t);
			return;
		}
		switch (e) {
			case "split-right":
				ve("row");
				return;
			case "split-down":
				ve("column");
				return;
			case "close-pane":
				x.closeActivePane();
				return;
			case "zoom-pane":
				x.toggleZoom();
				return;
			case "next-kind":
				xe();
				return;
			case "jump":
				ne(!0);
				return;
			case "focus-composer":
				M.current?.focus();
				return;
			case "leave-pane":
				M.current?.focus();
				return;
			case "focus-rail": {
				let e = re.current;
				if (!e) return;
				let t = (t) => e.querySelector(`[role="listbox"][aria-label="${t}"] [data-rail-row][tabindex="0"]`) ?? e.querySelector(`[role="listbox"][aria-label="${t}"] [data-rail-row]`), n = document.activeElement, r = (t) => !!n && !!e.querySelector(`[role="listbox"][aria-label="${t}"]`)?.contains(n);
				if (r("computers")) {
					let e = t("agents");
					e ? e.focus() : N && j.current.get(N.id)?.handle.focus?.();
					return;
				}
				if (r("agents")) {
					N && j.current.get(N.id)?.handle.focus?.();
					return;
				}
				(t("computers") ?? t("agents"))?.focus();
				return;
			}
			case "toggle-broadcast":
				C((e) => !e);
				return;
			case "help":
				D((e) => !e);
				return;
			case "exit":
				if (re.current?.contains(document.activeElement)) {
					N && j.current.get(N.id)?.handle.focus?.();
					return;
				}
				a === "overlay" && n();
				return;
		}
	}, [
		x,
		ve,
		xe,
		n,
		a,
		N
	]);
	if (B(() => {
		if (!t) return;
		let e = (e) => {
			if (k) {
				e.preventDefault(), e.stopPropagation(), A(!1);
				let t = nt(s, e);
				t && L(t);
				return;
			}
			if (tt(c, e)) {
				e.preventDefault(), e.stopPropagation(), A(!0);
				return;
			}
			let t = rt(s, e);
			if (t) {
				if (t === "exit") {
					let t = e.target;
					if (t?.closest?.(".xterm")) return;
					if (t === M.current) {
						M.current?.blur(), e.preventDefault();
						return;
					}
					if (O || E) {
						ne(!1), D(!1), e.preventDefault();
						return;
					}
				}
				e.preventDefault(), e.stopPropagation(), L(t);
			}
		};
		return globalThis.addEventListener("keydown", e, !0), () => globalThis.removeEventListener("keydown", e, !0);
	}, [
		t,
		s,
		c,
		k,
		L,
		O,
		E
	]), B(() => {
		if (!k) return;
		let e = setTimeout(() => A(!1), c?.timeoutMs ?? 3e3);
		return () => clearTimeout(e);
	}, [k, c?.timeoutMs]), !t) return null;
	let R = (e) => at(s, e), Ce = st(o), we = o === "app", Te = a === "inline";
	return /* @__PURE__ */ G("div", {
		ref: ie,
		...a === "overlay" ? {
			role: "dialog",
			"aria-modal": !0
		} : { role: "region" },
		"aria-label": "Computer Lab",
		style: Ce,
		className: e("flex flex-col", we ? "bg-surface text-text-primary" : "bg-code-bg text-code-text", a === "overlay" ? "fixed inset-0 z-[150]" : e("relative h-full min-h-0 w-full", we && "rounded-lg border border-border overflow-hidden"), u),
		children: [
			/* @__PURE__ */ G("div", {
				className: e("flex items-center gap-3 px-3 shrink-0 border-b border-code-border bg-code-panel", Te ? "h-9" : "h-10"),
				children: [
					/* @__PURE__ */ W("span", {
						className: "text-[11px] font-mono font-semibold tracking-wide text-code-mauve select-none",
						children: "LAB"
					}),
					/* @__PURE__ */ G("span", {
						"data-testid": "lab-summary",
						className: "text-[10px] font-mono text-code-muted tabular-nums",
						children: [
							d.length,
							" ",
							d.length === 1 ? "computer" : "computers",
							" · ",
							x.panes.length,
							" ",
							x.panes.length === 1 ? "pane" : "panes"
						]
					}),
					/* @__PURE__ */ G("div", {
						className: "flex items-center gap-1 ml-2",
						children: [x.windows.map((t, n) => {
							let r = t.id === x.activeWindow?.id;
							return /* @__PURE__ */ W("button", {
								type: "button",
								onClick: () => x.selectWindow(t.id),
								title: `Window ${n + 1}`,
								"aria-current": r ? "true" : void 0,
								className: e("px-2 py-0.5 rounded-sm text-[11px] font-mono cursor-pointer border-none transition-colors", r ? "bg-code-blue text-code-bg font-semibold" : "bg-code-surface text-code-muted hover:text-code-text"),
								children: t.name ?? n + 1
							}, t.id);
						}), /* @__PURE__ */ W("button", {
							type: "button",
							onClick: () => N && x.newWindow(N.computerId, b),
							disabled: !N,
							title: "New window",
							"aria-label": "New window",
							className: "px-1.5 py-0.5 text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text disabled:opacity-40 disabled:cursor-not-allowed",
							children: "+"
						})]
					}),
					/* @__PURE__ */ W("span", { className: "flex-1" }),
					/* @__PURE__ */ W(r, {
						label: "shells",
						value: se / 8,
						segments: 8,
						showPercent: !1,
						note: `${se} of 8 open`,
						warnAbove: .74,
						tone: we ? "surface" : "code",
						className: "hidden md:flex"
					}),
					k && c && /* @__PURE__ */ G("span", {
						"data-testid": "leader-armed",
						className: "px-2 py-0.5 rounded-sm text-[10px] font-mono font-semibold bg-code-peach text-code-bg animate-pulse",
						children: [c.label, " …"]
					}),
					/* @__PURE__ */ W("button", {
						type: "button",
						onClick: () => D((e) => !e),
						"aria-pressed": E,
						title: `Shortcuts${R("help") ? ` · ${R("help")}` : ""}`,
						className: "text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text",
						children: "?"
					}),
					a === "overlay" && /* @__PURE__ */ W("button", {
						type: "button",
						onClick: n,
						title: `Leave the lab${R("exit") ? ` · ${R("exit")}` : ""}`,
						className: "text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-red",
						children: "✕"
					})
				]
			}),
			/* @__PURE__ */ G("div", {
				className: "flex flex-1 min-h-0",
				children: [/* @__PURE__ */ W("div", {
					ref: re,
					className: "contents",
					children: /* @__PURE__ */ W(dt, {
						className: "w-[210px] shrink-0",
						computers: d,
						activeComputerId: oe?.id ?? null,
						openComputerIds: x.openComputerIds,
						showAllActivity: T,
						onToggleShowAll: () => te((e) => !e),
						canManage: f,
						models: m,
						onCreate: () => Se(),
						onOpenMenu: () => D((e) => !e),
						onSelect: (e) => {
							N && x.setPaneComputer(N.id, e.id);
						},
						onOpenInPane: (e) => x.split("row", e.id, N?.kindId ?? b),
						onWatch: (e) => {
							let t = v.find((e) => e.id === "tail");
							if (!t) {
								N && x.setPaneComputer(N.id, e.id);
								return;
							}
							let n = x.panes.find((n) => n.computerId === e.id && n.kindId === t.id);
							if (n) {
								x.focusPane(n.id);
								return;
							}
							x.split("row", e.id, t.id);
						}
					})
				}), /* @__PURE__ */ W("div", {
					className: e("flex-1 min-w-0 min-h-0", Te ? "p-1.5" : "p-2", we ? "bg-surface" : "bg-code-bg"),
					children: x.activeWindow && N ? /* @__PURE__ */ W(ht, {
						className: "flex-1 h-full",
						node: x.activeWindow.root,
						activePaneId: x.activePaneId,
						zoomedPaneId: x.zoomedPaneId,
						onRatioChange: x.resize,
						renderLeaf: (e) => {
							let t = ae.get(e.computerId), n = e.id === x.activePaneId;
							return /* @__PURE__ */ W(yt, {
								pane: e,
								computer: t ?? null,
								active: n,
								broadcasting: S,
								idleWindowMs: l,
								zoomed: x.zoomedPaneId === e.id,
								onFocus: () => x.focusPane(e.id),
								onClose: () => {
									x.focusPane(e.id), x.closeActivePane();
								},
								kinds: v,
								onToggleKind: () => {
									x.focusPane(e.id), ye(e.id, e.kindId, Ze(v, e.kindId));
								},
								onRegisterPane: ge,
								onSettled: () => void _()
							}, e.id);
						}
					}) : /* @__PURE__ */ G("div", {
						className: "h-full flex flex-col items-center justify-center gap-3 text-center",
						children: [
							/* @__PURE__ */ W("div", {
								className: "text-[13px] font-mono text-code-subtle",
								children: "No computers to lab"
							}),
							/* @__PURE__ */ W("div", {
								className: "text-[11px] font-mono text-code-muted max-w-sm",
								children: "Computer Lab multiplexes a fleet. Provision at least one computer and it will open in a pane."
							}),
							f && /* @__PURE__ */ W("button", {
								type: "button",
								onClick: () => Se(),
								className: "text-[11px] font-mono rounded px-3 py-1 cursor-pointer border border-code-green/60 bg-code-green/15 text-code-green hover:bg-code-green/30",
								children: "+ new computer"
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ G("div", {
				className: e("flex items-center gap-2 px-3 shrink-0 border-t font-mono transition-colors", Te ? "py-1" : "py-1.5", S ? "border-code-peach bg-code-peach/10" : "border-code-border bg-code-panel focus-within:border-code-blue"),
				children: [
					/* @__PURE__ */ W("button", {
						type: "button",
						onClick: () => C((e) => !e),
						"aria-pressed": S,
						title: `Send the prompt to every pane${R("toggle-broadcast") ? ` · ${R("toggle-broadcast")}` : ""}`,
						className: e("text-[10px] px-1.5 py-0.5 rounded-sm cursor-pointer border transition-colors shrink-0", S ? "border-code-peach bg-code-peach/25 text-code-peach font-semibold" : "border-code-border text-code-muted bg-transparent hover:text-code-text"),
						children: S ? "▶▶ all panes" : "▶ focused pane"
					}),
					/* @__PURE__ */ G("span", {
						className: "text-[10px] text-code-muted tabular-nums shrink-0 hidden sm:inline",
						children: [
							I.length,
							" ",
							I.length === 1 ? "target" : "targets"
						]
					}),
					/* @__PURE__ */ W("textarea", {
						ref: M,
						rows: 1,
						value: w,
						onChange: (e) => ee(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" && !e.shiftKey && (e.preventDefault(), _e()), e.key === "Escape" && e.currentTarget.blur();
						},
						placeholder: S ? `instruction for all ${I.length} panes — ⏎ to send` : `instruction for ${oe?.label ?? "the focused pane"} — ⏎ to send`,
						"aria-label": "Broadcast instruction",
						className: "flex-1 min-w-0 resize-none bg-transparent border-none outline-none text-[12px] leading-6 text-code-text caret-code-blue placeholder:text-code-raised"
					}),
					/* @__PURE__ */ W("button", {
						type: "button",
						onClick: _e,
						disabled: !w.trim() || I.length === 0,
						className: e("shrink-0 text-[11px] px-2 py-0.5 rounded-sm border cursor-pointer transition-colors", "border-code-green/60 bg-code-green/15 text-code-green hover:bg-code-green/30", "disabled:border-code-border disabled:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"),
						children: "send"
					})
				]
			}),
			/* @__PURE__ */ W(mt, {
				open: O,
				onClose: () => ne(!1),
				chrome: o,
				computers: d,
				panes: x.panes,
				onJumpToPane: x.focusPane,
				onRetarget: (e) => {
					N && x.setPaneComputer(N.id, e.id);
				},
				onOpenInSplit: (e) => x.split("row", e.id, N?.kindId ?? b),
				projects: y,
				onSelectProject: (e) => {
					let t = e.computers[0];
					if (t) {
						N && x.setPaneComputer(N.id, t.id);
						return;
					}
					if (!f) {
						h({
							tone: "info",
							title: `${e.name} has no computers`,
							detail: "You do not have permission to start one."
						});
						return;
					}
					Se(e.id);
				}
			}),
			E && /* @__PURE__ */ W(bt, {
				keymap: s,
				leader: c,
				chrome: o,
				onClose: () => D(!1)
			})
		]
	});
}
function yt({ pane: e, computer: t, active: r, broadcasting: a, zoomed: o, idleWindowMs: s, kinds: c, onFocus: l, onClose: u, onToggleKind: d, onRegisterPane: p, onSettled: h }) {
	let g = Xe(c, e.kindId), _ = z((t) => {
		g && p(e.id, g, t);
	}, [
		p,
		e.id,
		g
	]);
	if (!t || !g) return /* @__PURE__ */ W(n, {
		title: "unbound",
		active: r,
		className: "flex-1 min-w-0",
		onActivate: l,
		children: /* @__PURE__ */ W("div", {
			className: "h-full flex items-center justify-center text-[11px] font-mono text-code-subtle",
			children: t ? "no pane kind registered" : "this computer is gone"
		})
	});
	let y = f(t), b = m[y];
	return /* @__PURE__ */ G(n, {
		active: r,
		onActivate: l,
		className: "flex-1 min-w-0",
		bodyClassName: "flex flex-col min-h-0",
		title: /* @__PURE__ */ G("span", {
			className: "inline-flex items-center gap-1.5",
			children: [
				/* @__PURE__ */ W(i, {
					size: "xs",
					color: b.color,
					pulse: b.pulse,
					"aria-label": b.label
				}),
				t.label,
				o && /* @__PURE__ */ W("span", {
					className: "text-code-peach",
					title: "Zoomed",
					children: "⤢"
				})
			]
		}),
		titleAction: /* @__PURE__ */ G("span", {
			className: "inline-flex items-center gap-1.5",
			children: [/* @__PURE__ */ W("button", {
				type: "button",
				onClick: d,
				title: Ze(c, e.kindId)?.description ?? "Switch pane kind",
				className: "text-[9px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text",
				children: g.label
			}), /* @__PURE__ */ W("button", {
				type: "button",
				onClick: u,
				"aria-label": `Close pane ${t.label}`,
				className: "text-[10px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-red leading-none",
				children: "×"
			})]
		}),
		children: [/* @__PURE__ */ W("div", {
			className: "flex-1 min-h-0",
			children: g.render({
				computer: t,
				paneId: e.id,
				active: r,
				registerPane: _,
				onSettled: h
			})
		}), /* @__PURE__ */ W(v, {
			className: "rounded-b-[3px]",
			computer: t,
			idleWindowMs: s,
			broadcasting: a,
			mode: g.statusMode ?? g.label
		})]
	});
}
function bt({ keymap: e, leader: t, chrome: n = "app", onClose: r }) {
	let i = {
		panes: "Panes",
		navigate: "Getting around",
		lab: "The lab"
	};
	return /* @__PURE__ */ W("div", {
		role: "dialog",
		"aria-label": "Keyboard shortcuts",
		className: "absolute inset-0 z-10 flex items-center justify-center bg-code-bg/80",
		onClick: r,
		children: /* @__PURE__ */ G("div", {
			style: st(n),
			onClick: (e) => e.stopPropagation(),
			className: "w-[560px] max-w-[92vw] max-h-[80vh] overflow-y-auto rounded-lg border border-code-border bg-code-panel p-5 shadow-2xl",
			children: [
				/* @__PURE__ */ G("div", {
					className: "flex items-baseline gap-2 mb-4",
					children: [
						/* @__PURE__ */ W("span", {
							className: "text-[13px] font-semibold text-code-text",
							children: "Keyboard shortcuts"
						}),
						t && /* @__PURE__ */ G("span", {
							className: "text-[10px] font-mono text-code-muted",
							children: [t.label, " prefix is on"]
						}),
						/* @__PURE__ */ W("span", { className: "flex-1" }),
						/* @__PURE__ */ W("button", {
							type: "button",
							onClick: r,
							className: "text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text",
							children: "esc"
						})
					]
				}),
				/* @__PURE__ */ W("div", {
					className: "flex flex-col gap-4",
					children: it(e).map(({ group: e, bindings: n }) => /* @__PURE__ */ G("div", { children: [/* @__PURE__ */ W("div", {
						className: "text-[10px] uppercase tracking-wide text-code-mauve mb-1.5",
						children: i[e]
					}), /* @__PURE__ */ W("dl", {
						className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 m-0",
						children: n.map((e) => /* @__PURE__ */ G(je, { children: [/* @__PURE__ */ G("dt", {
							className: "m-0 font-mono text-[11px] text-code-green whitespace-nowrap",
							children: [e.label, t && e.leaderKey && /* @__PURE__ */ G("span", {
								className: "text-code-muted",
								children: [
									" or ",
									t.label,
									" ",
									e.leaderKey
								]
							})]
						}), /* @__PURE__ */ W("dd", {
							className: "m-0 text-[11px] text-code-subtle",
							children: e.description
						})] }, `${e.command}-${e.label}`))
					})] }, e))
				}),
				/* @__PURE__ */ G("div", {
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
var xt = {
	connected: "success",
	stale: "caution",
	offline: "neutral"
}, St = {
	connected: "connected",
	stale: "stale",
	offline: "offline"
};
function Ct(e) {
	return !e || e.mode === "disabled" ? "— sync off" : e.mode === "offline" ? "○ offline — queuing" : e.mode === "pending" ? `◐ ${e.pendingOps ?? "?"} pending` : "● synced";
}
function wt(e, t = []) {
	let n = e.modelProvider === "bedrock" ? u(e.model, t) : e.model ?? "—";
	return e.modelProvider ? `${e.modelProvider} · ${n}` : n;
}
function Tt(e) {
	return e.reduce((e, t) => e + t.sessions.length, 0);
}
function Et({ session: e, models: n }) {
	let i = e.projectName ?? e.projectId ?? e.repo ?? "—", a = e.branch ? `${i} · ${e.branch}` : i, o = e.modelProvider != null && e.modelProvider !== "bedrock";
	return /* @__PURE__ */ G("li", {
		"data-testid": "machine-session-row",
		className: "flex flex-col gap-1 rounded-md px-2 py-1.5 hover:bg-surface-hover",
		children: [
			/* @__PURE__ */ G("div", {
				className: "flex items-center gap-2 min-w-0",
				children: [
					/* @__PURE__ */ W("span", {
						className: "text-xs font-medium text-text-primary truncate",
						title: e.worktree ?? a,
						children: a
					}),
					/* @__PURE__ */ W("span", { className: "flex-1" }),
					/* @__PURE__ */ W(t, {
						size: "xs",
						mono: !0,
						tone: o ? "accent" : "neutral",
						className: "shrink-0",
						children: wt(e, n)
					})
				]
			}),
			e.intent && /* @__PURE__ */ W("div", {
				className: "text-[11px] text-text-tertiary truncate",
				title: e.intent,
				children: e.intent
			}),
			/* @__PURE__ */ G("div", {
				className: "flex items-center gap-3 min-w-0",
				children: [e.contextUsed != null && /* @__PURE__ */ W(r, {
					label: "ctx",
					value: e.contextUsed,
					tone: "surface",
					segments: 8,
					className: "shrink-0"
				}), /* @__PURE__ */ W("span", {
					className: "text-[10px] font-mono text-text-tertiary truncate",
					title: e.memory?.pullCursorAgeS == null ? void 0 : `read replica ${e.memory.pullCursorAgeS}s behind the mesh`,
					children: Ct(e.memory)
				})]
			})
		]
	});
}
function Dt({ nodes: n, models: r = [], onOpenLab: i, onManage: c, className: l, "data-testid": u = "machine-presence-menu" }) {
	let d = H(null), [f, p] = U(!1);
	if (n.length === 0) return null;
	let m = Tt(n), h = n.some((e) => e.status === "connected") ? "connected" : n.some((e) => e.status === "stale") ? "stale" : "offline", g = n.length === 1 ? n[0].label : `${n.length} machines`, _ = h === "connected" && m > 0;
	return /* @__PURE__ */ G(Ne, { children: [/* @__PURE__ */ W("button", {
		ref: d,
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": f,
		"aria-label": `Local machines: ${g}, ${m} active session${m === 1 ? "" : "s"}, ${St[h]}`,
		title: `${g} — ${St[h]}`,
		onClick: () => p((e) => !e),
		"data-testid": u,
		className: e("inline-flex items-center cursor-pointer rounded-md border border-border px-2 py-1", "bg-transparent hover:bg-surface-hover transition-colors duration-100", f && "bg-surface-hover", l),
		children: /* @__PURE__ */ W(t, {
			size: "xs",
			mono: !0,
			tone: xt[h],
			dot: _ ? "pulse" : "static",
			className: "bg-transparent px-0",
			children: m === 0 ? `⌂ ${g}` : `⌂ ${g} · ${m}`
		})
	}), /* @__PURE__ */ W(a, {
		trigger: d,
		open: f,
		onClose: () => p(!1),
		placement: "bottom-end",
		"aria-label": "Local machine sessions",
		className: "w-[320px] p-2",
		"data-testid": `${u}-panel`,
		children: /* @__PURE__ */ G("div", {
			className: "flex flex-col gap-2",
			children: [n.map((e) => /* @__PURE__ */ G("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ G("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ W(o, { children: e.label }),
						e.platform && /* @__PURE__ */ W("span", {
							className: "text-[10px] font-mono text-text-tertiary",
							children: e.platform
						}),
						/* @__PURE__ */ W("span", { className: "flex-1" }),
						/* @__PURE__ */ W(t, {
							size: "xs",
							uppercase: !0,
							tone: xt[e.status],
							dot: "static",
							children: St[e.status]
						})
					]
				}), e.sessions.length > 0 ? /* @__PURE__ */ W("ul", {
					className: "flex flex-col",
					children: e.sessions.map((e) => /* @__PURE__ */ W(Et, {
						session: e,
						models: r
					}, e.id))
				}) : /* @__PURE__ */ W(s, {
					"data-testid": "machine-no-sessions",
					children: e.status === "offline" ? "machine offline" : "no active sessions"
				})]
			}, e.id)), (i || c) && /* @__PURE__ */ G("div", {
				className: "flex items-center gap-2 border-t border-border pt-2",
				children: [
					i && /* @__PURE__ */ W("button", {
						type: "button",
						onClick: () => {
							p(!1), i();
						},
						className: "text-[11px] font-medium text-primary hover:underline cursor-pointer bg-transparent border-0 p-0",
						children: "Open Computer Lab"
					}),
					/* @__PURE__ */ W("span", { className: "flex-1" }),
					c && /* @__PURE__ */ W("button", {
						type: "button",
						onClick: () => {
							p(!1), c();
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
var Ot = {
	docked: "▭",
	grid: "▦",
	stack: "▤",
	floating: "▢"
};
function kt(e) {
	B(() => {
		if (!e) return;
		let t = (e) => {
			let t = e.metaKey || e.ctrlKey;
			if (t && (e.key === "'" || e.key === "\"")) {
				e.preventDefault(), e.stopPropagation(), e.shiftKey ? _e() : k(A().mode === "hidden");
				return;
			}
			if (A().mode !== "hidden") {
				if (e.altKey && !t && /^[1-9]$/.test(e.key)) {
					e.preventDefault(), e.stopPropagation(), D(Number(e.key) - 1);
					return;
				}
				e.ctrlKey && e.key === "Tab" && (e.preventDefault(), e.stopPropagation(), x(e.shiftKey ? -1 : 1));
			}
		};
		return window.addEventListener("keydown", t, !0), () => window.removeEventListener("keydown", t, !0);
	}, [e]);
}
function At({ status: e }) {
	let t = b[e];
	return /* @__PURE__ */ W("span", {
		"aria-hidden": "true",
		title: t.help,
		className: `w-1.5 h-1.5 rounded-full shrink-0 ${t.pulse ? "animate-pulse" : ""}`,
		style: { background: t.color }
	});
}
function jt({ shell: e, active: t, labelled: n }) {
	return /* @__PURE__ */ G("div", {
		className: "flex flex-col min-h-0 h-full",
		children: [n && /* @__PURE__ */ G("div", {
			className: "flex items-center gap-1.5 px-2 py-1 border-b shrink-0 bg-code-surface border-code-border",
			children: [
				/* @__PURE__ */ W(At, { status: e.status }),
				/* @__PURE__ */ W("span", {
					className: "text-[10px] font-mono text-code-muted",
					children: e.label
				}),
				/* @__PURE__ */ W("div", { className: "flex-1" }),
				/* @__PURE__ */ W("button", {
					type: "button",
					onClick: () => M(e.id),
					"aria-label": `Close ${e.label}`,
					className: "text-[10px] bg-transparent border-none cursor-pointer px-1 leading-none text-code-muted hover:text-code-red",
					children: "×"
				})
			]
		}), /* @__PURE__ */ W("div", {
			className: "flex-1 min-h-0",
			children: /* @__PURE__ */ W(Ce, {
				sessionId: e.sessionId,
				shellId: e.id,
				label: e.label,
				...e.cwd ? { cwd: e.cwd } : {},
				chrome: !1,
				fillHeight: !0,
				autoConnect: t,
				onStatus: (t, n) => T(e.id, t, n)
			})
		})]
	});
}
function Mt({ hotkeys: e = !0, reconcile: t = !0, className: n = "" }) {
	let r = Me(se, A, A), i = R();
	kt(e);
	let a = V(() => (i?.computers ?? []).map((e) => e.sessionId), [i?.computers]);
	if (B(() => {
		!t || a.length === 0 || re(a);
	}, [t, a]), r.mode === "hidden" || r.shells.length === 0) return null;
	let o = S(r.mode), s = /* @__PURE__ */ G("div", {
		style: ot,
		className: "flex flex-col h-full min-h-0",
		children: [/* @__PURE__ */ G("div", {
			className: "flex items-center gap-1 px-1.5 py-1 border-b shrink-0 overflow-x-auto bg-terminal-bg border-code-border",
			children: [
				r.shells.map((e, t) => {
					let n = e.id === r.activeId;
					return /* @__PURE__ */ G("div", {
						className: `group flex items-center gap-1.5 pl-2 pr-1 py-1 rounded shrink-0 ${n ? "bg-code-surface" : "bg-transparent hover:bg-code-surface/60"}`,
						children: [/* @__PURE__ */ G("button", {
							type: "button",
							onClick: () => I(e.id),
							title: `${e.label} · ⌥${t + 1}`,
							"aria-current": n ? "true" : void 0,
							className: `flex items-center gap-1.5 text-[11px] font-mono cursor-pointer border-none bg-transparent p-0 ${n ? "text-code-text" : "text-code-muted hover:text-code-text"}`,
							children: [
								/* @__PURE__ */ W(At, { status: e.status }),
								e.label,
								e.unread && !n && /* @__PURE__ */ W("span", {
									className: "w-1 h-1 rounded-full bg-code-blue",
									title: "new output while you were away"
								})
							]
						}), /* @__PURE__ */ W("button", {
							type: "button",
							onClick: () => M(e.id),
							"aria-label": `Close ${e.label}`,
							title: `Close ${e.label} — the shell is killed`,
							className: "opacity-0 group-hover:opacity-100 focus:opacity-100 bg-transparent border-none cursor-pointer px-1 leading-none text-code-muted hover:text-code-red",
							children: "×"
						})]
					}, e.id);
				}),
				/* @__PURE__ */ W("div", { className: "flex-1" }),
				r.shells.length >= 8 && /* @__PURE__ */ W("span", {
					className: "text-[10px] mr-1 shrink-0 text-code-peach",
					title: "AgentCore allows 10 shells per runtime",
					children: "max shells"
				}),
				/* @__PURE__ */ W("div", {
					className: "flex rounded border overflow-hidden mr-1 shrink-0 border-code-border",
					children: Object.keys(Ot).map((e) => /* @__PURE__ */ W("button", {
						type: "button",
						onClick: () => Ae(e),
						title: `${e} layout — ⌘⇧' cycles`,
						"aria-pressed": r.mode === e,
						className: `px-1.5 py-0.5 text-[10px] cursor-pointer border-none ${r.mode === e ? "bg-code-border text-code-text" : "bg-transparent text-code-muted hover:text-code-text"}`,
						children: Ot[e]
					}, e))
				}),
				/* @__PURE__ */ W("button", {
					type: "button",
					onClick: () => k(!1),
					title: "Hide — ⌘'. The shells keep running.",
					className: "text-[11px] px-1.5 py-0.5 bg-transparent border-none cursor-pointer shrink-0 text-code-muted hover:text-code-text",
					children: "▾"
				})
			]
		}), /* @__PURE__ */ W("div", {
			className: `flex-1 min-h-0 ${o ? `p-1.5 gap-1.5 overflow-auto ${r.mode === "grid" ? "grid grid-cols-1 md:grid-cols-2 auto-rows-fr" : "flex flex-col"}` : "relative"}`,
			children: r.shells.map((e) => {
				let t = e.id === r.activeId;
				return /* @__PURE__ */ W("div", {
					onMouseDown: () => I(e.id),
					"aria-hidden": !o && !t,
					className: o ? `min-h-[160px] rounded border overflow-hidden flex flex-col ${t ? "border-code-green/50" : "border-code-border"}` : "absolute inset-0",
					style: o ? void 0 : { visibility: t ? "visible" : "hidden" },
					children: /* @__PURE__ */ W(jt, {
						shell: e,
						active: o || t,
						labelled: o
					})
				}, e.id);
			})
		})]
	});
	if (r.mode === "floating") return /* @__PURE__ */ W(c, {
		open: !0,
		onClose: () => k(!1),
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
	let l = r.mode === "stack" ? "fixed top-0 right-0 bottom-0 w-[26rem] max-w-[92vw] border-l" : "fixed left-0 right-0 bottom-0 border-t";
	return /* @__PURE__ */ W("div", {
		"data-testid": "compute-dock",
		className: `${l} z-[120] flex flex-col bg-terminal-bg border-code-border ${n}`,
		style: r.mode === "stack" ? ot : {
			...ot,
			height: r.geometry.dockHeight
		},
		children: s
	});
}
//#endregion
//#region src/components/compute/lib/workspaceTree.ts
var Nt = String.raw`find . -maxdepth 3 \( -name .git -o -name node_modules -o -name .venv -o -name __pycache__ -o -name dist \) -prune -printf "p %p\n" -o -printf "%y %p\n" 2>/dev/null | head -400`, Pt = "git log --oneline -3 2>/dev/null; git status --short 2>/dev/null | head -5", Ft = 400;
function It(e) {
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
	return Lt(t), t;
}
function Lt(e) {
	e.sort((e, t) => e.kind === t.kind ? e.name.localeCompare(t.name) : e.kind === "dir" ? -1 : 1);
	for (let t of e) Lt(t.children);
}
function Rt(e) {
	return e.children.reduce((e, t) => e + 1 + Rt(t), 0);
}
function zt(e, t, n = 0) {
	let r = [];
	for (let i of e) r.push({
		node: i,
		depth: n
	}), i.kind === "dir" && !i.pruned && t.has(i.path) && r.push(...zt(i.children, t, n + 1));
	return r;
}
//#endregion
//#region src/components/compute/fixtures/mockShell.ts
var Bt = "mock-shell:", Y = "/mnt/workspace", Vt = "bedrock_agentcore", X = {
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
}, Ht = {
	[Y]: [
		".git/",
		"README.md",
		"src/"
	],
	[`${Y}/src`]: ["main.py"],
	[`${Y}/.git`]: [
		"HEAD",
		"config",
		"objects/",
		"refs/"
	]
}, Ut = {
	[`${Y}/README.md`]: [
		"# workspace",
		"",
		"One agent computer: a Firecracker microVM with this directory",
		"mounted persistently. Everything under /mnt/workspace survives a",
		"session stop; everything outside it does not.",
		"",
		"Treat it as a cache, not a durable store — a runtime version update",
		"wipes it."
	].join("\n"),
	[`${Y}/src/main.py`]: [
		"\"\"\"Ingest entrypoint the agent has been editing.\"\"\"",
		"",
		"",
		"def handler(event, context):",
		"    body = event.get(\"body\") or {}",
		"    return {\"statusCode\": 200, \"body\": body}"
	].join("\n"),
	[`${Y}/.git/HEAD`]: "ref: refs/heads/main",
	[`${Y}/.git/config`]: [
		"[core]",
		"	repositoryformatversion = 0",
		"[remote \"origin\"]",
		"	url = git@github.com:acme/ingest.git"
	].join("\n")
}, Wt = [
	["Read", "src/main.py"],
	["Grep", "\"def handler\" (1 file)"],
	["Edit", "src/main.py · +1 -1"],
	["Bash", "pytest -q → 4 passed in 0.62s"]
], Gt = [
	"This box understands:",
	"",
	"  help                  this list",
	"  ls [path]             list the workspace",
	"  pwd                   where you are",
	"  cd <path>             move",
	"  cat <file>            print a file",
	"  git status            what changed",
	"  git log --oneline     recent commits",
	"  claude \"<prompt>\"     run an agent turn here",
	"  clear                 clear the screen",
	"  exit                  end the shell"
], Kt = /* @__PURE__ */ new Map();
function qt(e, t) {
	let n = t ?? `mock-${Math.random().toString(36).slice(2, 8)}`;
	return {
		url: `${Bt}//${e}?shell=${encodeURIComponent(n)}`,
		shellId: n
	};
}
function Jt(e) {
	let t = [], n = /"([^"]*)"|'([^']*)'|(\S+)/g, r = n.exec(e);
	for (; r;) t.push(r[1] ?? r[2] ?? r[3] ?? ""), r = n.exec(e);
	return t;
}
function Yt(e, t) {
	let n = t === "~" ? Y : t.startsWith("~/") ? `${Y}/${t.slice(2)}` : t, r = n.startsWith("/") ? "" : e, i = [];
	for (let e of `${r}/${n}`.split("/")) if (e !== "" && e !== ".") {
		if (e === "..") {
			i.pop();
			continue;
		}
		i.push(e);
	}
	return `/${i.join("/")}`;
}
function Xt(e) {
	return e.endsWith("/") ? `${X.bold}${X.blue}${e.slice(0, -1)}${X.reset}` : e;
}
var Zt = class extends EventTarget {
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
		this.shellId = new URLSearchParams(t < 0 ? "" : e.slice(t + 1)).get("shell") ?? "mock-shell", this.session = Kt.get(this.shellId) ?? {
			cwd: Y,
			attached: !1
		}, Kt.set(this.shellId, this.session), this.later(() => this.handshake(), 60);
	}
	send(e) {
		if (this.readyState !== this.OPEN) return;
		let t = Qt(e);
		if (!t || t.length === 0) return;
		let n = t[0];
		if (n === F.CLOSE) {
			this.exit(0);
			return;
		}
		n === F.STDIN && this.feed(this.decoder.decode(t.subarray(1)));
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
		this.readyState = this.OPEN, this.frame(F.STATUS, JSON.stringify({ metadata: {
			shellId: this.shellId,
			reconnected: this.session.attached
		} })), this.write(this.session.attached ? `${X.dim}reattached to ${this.shellId}${X.reset}\r\n` : [
			`${X.green}AgentCore devbox${X.reset} ${X.dim}· simulated shell, no runtime attached${X.reset}`,
			`${X.dim}Type ${X.reset}help${X.dim} for what this box understands.${X.reset}`,
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
		this.frame(F.STDOUT, e);
	}
	fail(e) {
		this.frame(F.STDERR, `${X.red}${e}${X.reset}\r\n`);
	}
	prompt() {
		this.write(`${X.green}${Vt}${X.reset}:${X.bold}${X.blue}${this.session.cwd}${X.reset}$ `);
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
		this.frame(F.STATUS, JSON.stringify({ details: { causes: [{
			reason: "ExitCode",
			message: String(e)
		}] } })), Kt.delete(this.shellId), this.close(1e3, "shell exited");
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
					this.write(X.clear), this.prompt(), this.write(this.line);
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
			await this.dispatch(Jt(t));
		} finally {
			this.busy = !1, this.readyState === this.OPEN && this.prompt();
		}
	}
	async dispatch(e) {
		let [t, ...n] = e;
		switch (t) {
			case "help":
				this.write(`${Gt.join("\r\n")}\r\n`);
				return;
			case "clear":
				this.write(X.clear);
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
			default: this.fail(`bash: ${t}: command not found`), this.write(`${X.dim}exit 127${X.reset}\r\n`);
		}
	}
	list(e) {
		let t = Yt(this.session.cwd, e.find((e) => !e.startsWith("-")) ?? "."), n = Ht[t];
		if (!n) {
			if (Ut[t] !== void 0) {
				this.write(`${t}\r\n`);
				return;
			}
			this.fail(`ls: cannot access '${t}': No such file or directory`);
			return;
		}
		let r = e.some((e) => e.startsWith("-") && e.includes("a")) ? n : n.filter((e) => !e.startsWith("."));
		this.write(`${r.map(Xt).join("  ")}\r\n`);
	}
	chdir(e) {
		let t = Yt(this.session.cwd, e[0] ?? "~");
		if (!Ht[t]) {
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
			let e = Yt(this.session.cwd, t), n = Ut[e];
			if (n === void 0) {
				this.fail(Ht[e] ? `cat: ${t}: Is a directory` : `cat: ${t}: No such file or directory`);
				continue;
			}
			this.write(`${n.replace(/\n/g, "\r\n")}\r\n`);
		}
	}
	git(e) {
		if (e[0] === "status") {
			this.write([
				"On branch main",
				"Your branch is up to date with 'origin/main'.",
				"",
				"Changes not staged for commit:",
				`  ${X.dim}(use "git add <file>..." to update what will be committed)${X.reset}`,
				`\t${X.red}modified:   src/main.py${X.reset}`,
				"",
				"no changes added to commit",
				""
			].join("\r\n"));
			return;
		}
		if (e[0] === "log") {
			this.write([
				`${X.yellow}9f2c1ab${X.reset} wire up the ingest handler`,
				`${X.yellow}3ad77e0${X.reset} cover the empty-body case`,
				`${X.yellow}b41e902${X.reset} scaffold the service`,
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
		this.write(`${X.magenta}✻${X.reset} ${X.dim}${t}${X.reset}\r\n`);
		for (let [e, t] of Wt) {
			if (await this.wait(520), this.cancelled || this.readyState !== this.OPEN) return;
			this.write(`  ${X.cyan}⏺${X.reset} ${X.bold}${e}${X.reset}(${t})\r\n`);
		}
		await this.wait(420), !(this.cancelled || this.readyState !== this.OPEN) && this.write(`${X.green}✓${X.reset} done · ${Wt.length + 1} turns · 6.4s · ${X.yellow}$0.0184${X.reset}\r\n`);
	}
};
function Qt(e) {
	return ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : e instanceof ArrayBuffer ? new Uint8Array(e) : null;
}
var Z = null;
function $t(e = {}) {
	let t = e.scheme ?? "mock-shell:", n = globalThis.WebSocket;
	if (typeof n != "function") return () => {};
	if (Z) Z.count += 1;
	else {
		class e extends n {
			constructor(e, n) {
				let r = typeof e == "string" ? e : e.href;
				if (r.startsWith(t)) return new Zt(r);
				super(e, n);
			}
		}
		globalThis.WebSocket = e, Z = {
			native: n,
			count: 1
		};
	}
	let r = !1;
	return () => {
		r || !Z || (r = !0, --Z.count, !(Z.count > 0) && (globalThis.WebSocket = Z.native, Z = null, Kt.clear()));
	};
}
//#endregion
//#region src/components/compute/fixtures/mockTail.ts
var en = "mock-tail:", Q = (e) => ({
	type: "assistant",
	message: { content: [{
		type: "text",
		text: e
	}] }
}), tn = (e, t) => ({
	type: "assistant",
	message: { content: [{
		type: "tool_use",
		name: e,
		input: t
	}] }
}), nn = [
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
				data: Q("Reading the lockfile and resolving the dependency graph.")
			},
			{
				afterMs: 1300,
				data: tn("Bash", { command: "npm audit --json" })
			},
			{
				afterMs: 2100,
				data: Q("3 advisories: 1 high, 2 moderate. Checking whether the high one is reachable.")
			},
			{
				afterMs: 1700,
				data: tn("Grep", { pattern: "serialize-javascript" })
			},
			{
				afterMs: 2400,
				data: Q("Reachable from the report renderer only. Bumping it and pinning the transitive.")
			},
			{
				afterMs: 1400,
				data: tn("Edit", { file: "package.json" })
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
				data: Q("Pulling the last 40 CI runs.")
			},
			{
				afterMs: 1500,
				data: tn("Bash", { command: "gh run list --limit 40" })
			},
			{
				afterMs: 2300,
				data: Q("Two suites flap: session-epoch and the canary rollup. Both look time-dependent.")
			},
			{
				afterMs: 1900,
				data: tn("Read", { file: "src/lib/__tests__/session-epoch.test.ts" })
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
				data: Q("Dumping the live schema.")
			},
			{
				afterMs: 1600,
				data: tn("Bash", { command: "psql -c \"\\d+ public.*\"" })
			},
			{
				afterMs: 2400,
				data: Q("One table differs: environments has a column the checked-in DDL does not.")
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
function rn(e, t) {
	return `${en}//${e}${t ? `?script=${encodeURIComponent(t)}` : ""}`;
}
function an(e) {
	let t = /script=([^&]+)/.exec(e)?.[1];
	if (t) {
		let e = nn.find((e) => e.id === decodeURIComponent(t));
		if (e) return e;
	}
	let n = e.slice(10).replace(/^\/+/, "").split("?")[0] ?? "", r = 0;
	for (let e of n) r = r * 31 + e.charCodeAt(0) >>> 0;
	return nn[r % nn.length];
}
var on = class {
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
		let n = an(e), r = 0;
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
function sn(e = {}) {
	let t = e.scheme ?? "mock-tail:", n = globalThis.EventSource;
	if ($) $.count += 1;
	else {
		$ = {
			native: n,
			count: 1
		};
		let e = function(e, r) {
			if (typeof e == "string" && e.startsWith(t)) return new on(e, r);
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
export { m as COMPUTE_STATUS, ce as COMPUTE_STORAGE_KEYS, Mt as ComputeDock, we as ComputeProvider, vt as ComputerLab, g as DEFAULT_IDLE_WINDOW_MS, et as DEFAULT_KEYMAP, ge as DEFAULT_PANE_KINDS, fe as DETACH_BYTE, te as DOCK_STORAGE_KEY, ne as FLEET_STORAGE_KEY, ve as HEARTBEAT_MS, L as LAB_LAYOUT_STORAGE_KEY, mt as LabChooser, dt as LabRail, Te as MAX_FRAME_BYTES, Fe as MAX_RATIO, pe as MAX_RETRIES, w as MAX_SHELLS, Pe as MIN_RATIO, Bt as MOCK_SHELL_SCHEME, en as MOCK_TAIL_SCHEME, nn as MOCK_TAIL_SCRIPTS, Dt as MachinePresenceMenu, v as PaneStatusLine, ht as PaneTreeView, lt as ProjectSummary, F as SHELL_CHANNEL, ue as SHELL_PANE_KIND, b as SHELL_STATUS, Ce as ShellTerminal, xe as TAIL_PANE_KIND, $e as TMUX_LEADER, Ee as TailPane, y as UNASSIGNED_PROJECT_ID, Ft as WORKSPACE_ENTRY_CAP, Nt as WORKSPACE_FIND_COMMAND, Pt as WORKSPACE_GIT_COMMAND, It as buildWorkspaceTree, O as clearComputeStorage, Se as closeAdvice, Be as closePane, M as closeShell, Rt as countDescendants, Re as countPanes, P as createComputeClient, _e as cycleLayout, We as cyclePane, x as cycleShell, Ge as enclosingSplit, ye as encodeFrame, he as encodeResize, me as exhaustedAdvice, le as exitCodeOf, d as expiryPressure, Le as findLeaf, ae as fixtureComputers, C as fixtureMachines, De as fixtureModels, N as fixtureRuntimeStatus, ee as fixtureWorkspace, I as focusShell, h as formatTokens, pt as fuzzyScore, A as getDock, it as groupBindings, $t as installMockShellSocket, sn as installMockTailSource, tt as isLeaderKey, at as labelFor, q as layoutRects, K as listLeaves, Ie as makeLeaf, rt as matchBinding, nt as matchLeaderBinding, Ct as memorySummary, qt as mockShellUrl, rn as mockTailUrl, Ue as neighborPane, Ze as nextKind, j as openShell, wt as providerSummary, Qe as quotaUsage, Ke as ratioOf, re as reconcileDock, T as reportShellStatus, Xe as resolveKind, _ as rollUpProjects, D as selectShellByIndex, k as setDockVisible, ie as setGeometry, Ae as setMode, Ve as setRatio, u as shortModelName, S as showsAllPanes, ze as splitPane, f as statusOf, se as subscribeDock, de as summarizeTool, E as toggleFloating, He as updateLeaf, be as useCompute, oe as useComputeFleet, R as useComputeOptional, p as useComputeProjects, ke as useComputeTail, Oe as useComputeTask, Ye as useLabLayout, l as useProjectRollups, zt as visibleRows };
