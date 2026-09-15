import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Chip-YhQI5B9P.js";
import { a as n, i as r, n as i, o as a } from "./FloatingPanel-CclkXzq4.js";
import { t as o } from "./StatusDot-Bgx2zxgC.js";
import { t as s } from "./InlinePopover-DFdI8hw1.js";
import { t as c } from "./InlinePlaceholder-51dbPRGn.js";
import { Fragment as l, createContext as u, forwardRef as d, useCallback as f, useContext as p, useEffect as m, useImperativeHandle as h, useLayoutEffect as g, useMemo as _, useRef as v, useState as y, useSyncExternalStore as b } from "react";
import { Fragment as x, jsx as S, jsxs as C } from "react/jsx-runtime";
import { Terminal as w } from "@xterm/xterm";
import { FitAddon as T } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
//#region src/components/compute/lib/computeClient.ts
async function E(e) {
	let t = `HTTP ${e.status}`;
	try {
		let n = await e.json();
		t = n.error ?? n.message ?? t;
	} catch {}
	return Error(t);
}
function D(e = {}) {
	let { baseUrl: t = "/api/devbox", headers: n = {}, credentials: r = "include", fetchImpl: i } = e, a = (e, t) => (i ?? globalThis.fetch)(e, t), o = async (e, i) => {
		let o = await a(`${t}${e}`, {
			credentials: r,
			...i,
			headers: {
				...n,
				...i?.body ? { "Content-Type": "application/json" } : {},
				...i?.headers
			}
		});
		if (!o.ok) throw await E(o);
		return await o.json();
	}, s = async (e, i) => {
		let o = await a(`${t}${e}`, {
			credentials: r,
			...i,
			headers: {
				...n,
				...i.body ? { "Content-Type": "application/json" } : {},
				...i.headers
			}
		});
		if (!o.ok) throw await E(o);
	}, c = async (e, i, o, s) => {
		let c = await a(`${t}${e}`, {
			method: "POST",
			credentials: r,
			headers: {
				"Content-Type": "application/json",
				Accept: "text/event-stream",
				...n
			},
			body: JSON.stringify(i),
			...s ? { signal: s } : {}
		});
		if (!c.ok) throw await E(c);
		if (!c.body) throw Error("empty response body");
		let l = c.body.getReader(), u = new TextDecoder(), d = "";
		for (;;) {
			let { done: e, value: t } = await l.read();
			if (e) break;
			d += u.decode(t, { stream: !0 });
			let n = d.split("\n\n");
			d = n.pop() ?? "";
			for (let e of n) {
				let t = e.trim();
				if (t.startsWith("data:")) try {
					o(JSON.parse(t.slice(5).trim()));
				} catch {}
			}
		}
	};
	return {
		getStatus: (e) => o("/status", e ? { signal: e } : {}),
		listComputers: async (e) => {
			let { boxes: t } = await o("/boxes", e ? { signal: e } : {});
			return t;
		},
		createComputer: (e) => o("/boxes", {
			method: "POST",
			body: JSON.stringify(e ?? {})
		}),
		listProjects: async (e) => {
			let t = await o("/projects", e ? { signal: e } : {});
			return Array.isArray(t) ? t : t.projects;
		},
		adoptComputer: (e) => s("/boxes", {
			method: "POST",
			body: JSON.stringify(e)
		}),
		renameComputer: (e, t) => s(`/boxes/${encodeURIComponent(e)}`, {
			method: "PATCH",
			body: JSON.stringify({ label: t })
		}),
		removeComputer: (e) => s(`/boxes/${encodeURIComponent(e)}`, { method: "DELETE" }),
		stopSession: (e) => s(`/${encodeURIComponent(e)}`, { method: "DELETE" }),
		runTask: (e, t, n, r) => c(`/${encodeURIComponent(e)}/task`, t, n, r),
		runCommand: (e, t, n, r) => c(`/${encodeURIComponent(e)}/command`, t, n, r),
		getShellUrl: (e, t) => o(`/${encodeURIComponent(e)}/shell-url`, {
			method: "POST",
			body: JSON.stringify(t ? { shellId: t } : {})
		}),
		tail: (e) => ({
			url: `${t}/boxes/${encodeURIComponent(e)}/tail`,
			withCredentials: r === "include",
			headers: n
		})
	};
}
//#endregion
//#region src/components/compute/lib/storage.ts
var O = "ui-components.computeDock.v1", k = "ui-components.computeFleet.v1", A = "ui-components.computerLab.v1", j = [
	O,
	k,
	A
];
function ee() {
	for (let e of j) try {
		globalThis.localStorage?.removeItem(e);
	} catch {}
}
//#endregion
//#region src/components/compute/hooks/useComputeFleet.ts
function M() {
	try {
		let e = globalThis.localStorage?.getItem(k);
		return e ? JSON.parse(e) : [];
	} catch {
		return [];
	}
}
function N(e) {
	try {
		globalThis.localStorage?.setItem(k, JSON.stringify(e));
	} catch {}
}
function P({ client: e, pollIntervalMs: t = 5e3, computers: n, fixtures: r, enabled: i = !0, readopt: a = !0 }) {
	let [o, s] = y(() => n ?? (M().length > 0 ? M() : r ?? [])), [c, l] = y(n ? "provided" : M().length > 0 ? "remote" : r?.length ? "fixture" : "remote"), [u, d] = y(!n), [p, h] = y(null), g = v(0), _ = v(!1), b = f(async () => {
		if (n || !i) return;
		let t = ++g.current, r = () => g.current === t;
		try {
			let t = await e.listComputers();
			if (a && t.length === 0) {
				let n = M();
				n.length > 0 && (await Promise.all(n.map((t) => e.adoptComputer({
					sessionId: t.sessionId,
					label: t.label,
					createdAt: t.createdAt
				}).catch(() => {}))), t = await e.listComputers());
			}
			if (!r()) return;
			s(t), l("remote"), h(null), N(t);
		} catch (e) {
			r() && h(e instanceof Error ? e.message : "Failed to list computers");
		} finally {
			r() && (_.current = !0, d(!1));
		}
	}, [
		e,
		n,
		a,
		i
	]);
	return m(() => {
		if (n) {
			s(n), l("provided"), d(!1);
			return;
		}
		if (!i) {
			d(!1);
			return;
		}
		if (b(), t <= 0) return;
		let e = setInterval(() => void b(), t);
		return () => {
			clearInterval(e), g.current += 1;
		};
	}, [
		b,
		t,
		n,
		i
	]), {
		computers: o,
		source: c,
		isLoading: u,
		error: p,
		refresh: b,
		create: f(async (t) => {
			let n = await e.createComputer(t);
			return N([...M().filter((e) => e.id !== n.id), n]), await b(), n;
		}, [e, b]),
		rename: f(async (t, n) => {
			await e.renameComputer(t, n), await b();
		}, [e, b]),
		remove: f(async (t) => {
			await e.removeComputer(t), N(M().filter((e) => e.id !== t)), await b();
		}, [e, b]),
		stop: f(async (t) => {
			await e.stopSession(t), await b();
		}, [e, b])
	};
}
//#endregion
//#region src/components/compute/hooks/useComputeProjects.ts
var F = "__unassigned__";
function I({ client: e, projects: t, pollIntervalMs: n = 6e4, enabled: r = !0 }) {
	let [i, a] = y(t ?? []), [o, s] = y(!1), [c, l] = y(null), u = v(0), d = !!e.listProjects, p = f(async () => {
		if (t || !r || !e.listProjects) return;
		let n = ++u.current;
		s(!0);
		try {
			let t = await e.listProjects();
			if (u.current !== n) return;
			a(t), l(null);
		} catch (e) {
			u.current === n && l(e instanceof Error ? e.message : "Failed to list projects");
		} finally {
			u.current === n && s(!1);
		}
	}, [
		e,
		t,
		r
	]);
	return m(() => {
		if (t) {
			a(t);
			return;
		}
		if (!r || !d || (p(), n <= 0)) return;
		let e = setInterval(() => void p(), n);
		return () => {
			clearInterval(e), u.current += 1;
		};
	}, [
		p,
		t,
		r,
		d,
		n
	]), {
		projects: i,
		rollups: [],
		absent: !d && !t,
		isLoading: o,
		error: c,
		refresh: p
	};
}
function L(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let e of t) {
		let t = e.projectId ?? "__unassigned__", r = n.get(t);
		r ? r.push(e) : n.set(t, [e]);
	}
	let r = (e) => {
		let t = n.get(e.id) ?? [], r = t.map((e) => e.stopsInMs).filter((e) => typeof e == "number");
		return {
			...e,
			computers: t,
			activeCount: t.filter((e) => e.status === "running" || e.status === "waiting").length,
			soonestExpiryMs: r.length > 0 ? Math.min(...r) : null,
			liveSpendUsd: t.reduce((e, t) => e + (t.spendUsd ?? 0), 0),
			liveTokens: t.reduce((e, t) => e + (t.tokensUsed ?? 0), 0)
		};
	}, i = e.map(r);
	return (n.get("__unassigned__") ?? []).length > 0 && i.push(r({
		id: F,
		name: "No project"
	})), i;
}
function R(e) {
	return !Number.isFinite(e) || e < 0 ? "—" : e < 1e3 ? String(Math.round(e)) : e < 1e6 ? `${(e / 1e3).toFixed(+(e < 1e4))}k` : `${(e / 1e6).toFixed(1)}M`;
}
function z(e, t) {
	return _(() => L(e, t), [e, t]);
}
//#endregion
//#region src/components/compute/lib/dockStore.ts
var B = 8, V = {
	x: 120,
	y: 120,
	width: 860,
	height: 480,
	dockHeight: 360
};
function te() {
	let e = {
		mode: "hidden",
		shells: [],
		activeId: null,
		geometry: V
	};
	try {
		let t = globalThis.localStorage?.getItem(O);
		if (!t) return e;
		let n = JSON.parse(t);
		return {
			mode: "hidden",
			shells: (Array.isArray(n.shells) ? n.shells : []).filter((e) => !!e && typeof e.sessionId == "string").map((e) => ({
				...e,
				status: "connecting",
				unread: !1
			})).slice(0, 8),
			activeId: n.activeId ?? null,
			geometry: {
				...V,
				...n.geometry ?? {}
			}
		};
	} catch {
		return e;
	}
}
var H = te(), U = /* @__PURE__ */ new Set();
function ne() {
	try {
		globalThis.localStorage?.setItem(O, JSON.stringify({
			shells: H.shells,
			activeId: H.activeId,
			geometry: H.geometry
		}));
	} catch {}
	for (let e of U) e();
}
function W(e) {
	H = {
		...H,
		...e
	}, ne();
}
function re(e) {
	return U.add(e), () => {
		U.delete(e);
	};
}
function G() {
	return H;
}
function ie(e) {
	let t = new Set(e), n = H.shells.filter((e) => t.has(e.sessionId));
	n.length !== H.shells.length && W({
		shells: n,
		activeId: n.some((e) => e.id === H.activeId) ? H.activeId : n[n.length - 1]?.id ?? null,
		mode: n.length === 0 ? "hidden" : H.mode
	});
}
function ae(e) {
	let t = H.shells.find((t) => t.sessionId === e.sessionId);
	if (t) return W({
		activeId: t.id,
		mode: H.mode === "hidden" ? "docked" : H.mode,
		...e.cwd && e.cwd !== t.cwd ? { shells: H.shells.map((n) => n.id === t.id ? {
			...n,
			cwd: e.cwd
		} : n) } : {}
	}), {
		ok: !0,
		id: t.id
	};
	if (H.shells.length >= 8) return W({ mode: H.mode === "hidden" ? "docked" : H.mode }), {
		ok: !1,
		reason: "at-capacity"
	};
	let n = {
		id: `dock-${e.id}-${Date.now().toString(36)}`,
		sessionId: e.sessionId,
		label: e.label,
		...e.cwd ? { cwd: e.cwd } : {},
		status: "connecting",
		unread: !1
	};
	return W({
		shells: [...H.shells, n],
		activeId: n.id,
		mode: H.mode === "hidden" ? "docked" : H.mode
	}), {
		ok: !0,
		id: n.id
	};
}
function oe(e) {
	let t = H.shells.filter((t) => t.id !== e);
	W({
		shells: t,
		activeId: H.activeId === e ? t[t.length - 1]?.id ?? null : H.activeId,
		mode: t.length === 0 ? "hidden" : H.mode
	});
}
function se(e) {
	W({
		activeId: e,
		shells: H.shells.map((t) => t.id === e ? {
			...t,
			unread: !1
		} : t)
	});
}
function ce(e, t, n = !1) {
	let r = !1, i = H.shells.map((i) => {
		if (i.id !== e) return i;
		let a = n && H.activeId !== e ? !0 : i.unread;
		return i.status === t && i.unread === a ? i : (r = !0, {
			...i,
			status: t,
			unread: a
		});
	});
	r && W({ shells: i });
}
function le(e) {
	if (H.shells.length < 2) return;
	let t = H.shells.findIndex((e) => e.id === H.activeId), n = H.shells[(t + e + H.shells.length) % H.shells.length];
	n && se(n.id);
}
function ue(e) {
	let t = H.shells[e];
	t && se(t.id);
}
function de(e) {
	W({ mode: e });
}
function fe(e) {
	W({ mode: e ? H.mode === "hidden" ? "docked" : H.mode : "hidden" });
}
function K() {
	W({ mode: H.mode === "floating" ? "docked" : "floating" });
}
function pe() {
	let e = [
		"docked",
		"grid",
		"stack",
		"floating"
	];
	W({ mode: e[(e.indexOf(H.mode) + 1) % e.length] ?? "docked" });
}
function me(e) {
	return e === "grid" || e === "stack";
}
function he(e) {
	W({ geometry: {
		...H.geometry,
		...e
	} });
}
//#endregion
//#region src/components/compute/fixtures/computeFixture.ts
var q = (e) => `demo-session-${e}-0000000000000000`.slice(0, 40), ge = [
	{
		id: "demo-1",
		label: "demo-alpha",
		sessionId: q("alpha"),
		createdAt: "2026-08-26T14:02:00.000Z",
		status: "running",
		projectId: "proj-auth",
		project: "Auth migration",
		spendUsd: 12.4,
		tokensUsed: 41e3,
		currentTask: "Scaffold the FastAPI service and commit it",
		lastActivityAt: "2026-08-26T14:31:00.000Z",
		stopsInMs: 246e4
	},
	{
		id: "demo-2",
		label: "demo-bravo",
		sessionId: q("bravo"),
		createdAt: "2026-08-26T13:10:00.000Z",
		status: "waiting",
		projectId: "proj-auth",
		project: "Auth migration",
		spendUsd: 4.1,
		tokensUsed: 12800,
		currentTask: "Which migration tool should this use?",
		lastActivityAt: "2026-08-26T14:20:00.000Z",
		stopsInMs: 24e4,
		lastResult: {
			subtype: "success",
			turns: 11,
			durationMs: 214e3,
			costUsd: .0431
		}
	},
	{
		id: "demo-3",
		label: "demo-charlie",
		sessionId: q("charlie"),
		createdAt: "2026-08-26T09:44:00.000Z",
		status: "idle",
		projectId: "proj-search",
		project: "Search relevance",
		spendUsd: 61.2,
		tokensUsed: 902e3,
		lastActivityAt: "2026-08-26T12:02:00.000Z",
		stopsInMs: 312e4,
		lastResult: {
			subtype: "success",
			turns: 4,
			durationMs: 61e3,
			costUsd: .0072
		}
	},
	{
		id: "demo-4",
		label: "demo-delta",
		sessionId: q("delta"),
		createdAt: "2026-08-25T18:20:00.000Z",
		status: "stopped"
	}
], _e = {
	deployed: !0,
	runtimeName: "demo-devbox",
	runtimeArn: null,
	commandAllowlist: [
		"ls",
		"cat",
		"git",
		"find",
		"grep"
	],
	fullExecEnabled: !0,
	perTaskModel: !0,
	defaultModel: "us.anthropic.claude-haiku-4-5-20251001-v1:0",
	allowedModels: [
		"us.anthropic.claude-haiku-4-5-20251001-v1:0",
		"us.anthropic.claude-sonnet-5",
		"us.anthropic.claude-opus-4-8"
	]
}, ve = [
	{
		id: "us.anthropic.claude-haiku-4-5-20251001-v1:0",
		label: "Haiku",
		hint: "default · cheapest · fine for most tasks"
	},
	{
		id: "us.anthropic.claude-sonnet-5",
		label: "Sonnet",
		hint: "harder multi-step work"
	},
	{
		id: "us.anthropic.claude-opus-4-8",
		label: "Opus",
		hint: "the expensive one — reach for it deliberately"
	}
], ye = [{
	id: "demo-machine-1",
	label: "demo-macbook",
	status: "connected",
	platform: "darwin/arm64",
	sessions: [{
		id: q("local-a"),
		harness: "claude-code",
		projectId: "proj-auth",
		projectName: "Auth migration",
		branch: "feat/oidc-callback",
		worktree: "~/dev/auth/.claude/worktrees/oidc-callback",
		intent: "wire the OIDC callback to the session mint",
		modelProvider: "bedrock",
		model: "us.anthropic.claude-sonnet-5",
		contextUsed: .42,
		memory: {
			mode: "synced",
			pullCursorAgeS: 12
		}
	}, {
		id: q("local-b"),
		harness: "claude-code",
		projectId: "proj-search",
		projectName: "Search relevance",
		branch: "main",
		intent: "nightly re-embedding batch over the corpus",
		modelProvider: "ollama",
		model: "qwen2.5-coder:14b",
		contextUsed: .87,
		memory: {
			mode: "pending",
			pendingOps: 14
		}
	}]
}, {
	id: "demo-machine-2",
	label: "demo-workstation",
	status: "stale",
	platform: "linux/x86_64",
	sessions: [{
		id: q("local-c"),
		harness: "claude-code",
		projectName: "Platform upkeep",
		branch: "main",
		intent: "consolidation pass over duplicate findings",
		modelProvider: "ollama",
		model: "qwen2.5-coder:32b",
		memory: {
			mode: "offline",
			pendingOps: 203
		}
	}]
}], be = {
	truncated: !1,
	git: [
		"a1b2c3d scaffold service",
		"e4f5a6b add tests",
		" M src/main.py"
	],
	tree: [
		{
			name: "src",
			path: "src",
			kind: "dir",
			children: [{
				name: "main.py",
				path: "src/main.py",
				kind: "file",
				children: []
			}, {
				name: "models.py",
				path: "src/models.py",
				kind: "file",
				children: []
			}]
		},
		{
			name: "tests",
			path: "tests",
			kind: "dir",
			children: [{
				name: "test_main.py",
				path: "tests/test_main.py",
				kind: "file",
				children: []
			}]
		},
		{
			name: ".git",
			path: ".git",
			kind: "dir",
			pruned: !0,
			children: []
		},
		{
			name: "node_modules",
			path: "node_modules",
			kind: "dir",
			pruned: !0,
			children: []
		},
		{
			name: "README.md",
			path: "README.md",
			kind: "file",
			children: []
		},
		{
			name: "pyproject.toml",
			path: "pyproject.toml",
			kind: "file",
			children: []
		}
	]
};
//#endregion
//#region src/components/compute/hooks/useComputeTask.ts
function xe(e, t) {
	let n = (...e) => {
		for (let n of e) {
			let e = t[n];
			if (typeof e == "string" && e.length > 0) return e;
		}
		return null;
	}, r = (n("file_path", "path", "notebook_path", "command", "pattern", "url", "query", "prompt") ?? n("description") ?? "").replace(/\s+/g, " ").trim();
	return r ? r.length > 96 ? `${r.slice(0, 95)}…` : r : e;
}
function Se({ client: e, maxSteps: t = 400, onEvent: n }) {
	let [r, i] = y([]), [a, o] = y(!1), [s, c] = y(0), [l, u] = y(null), [d, p] = y(null), m = v(null), h = v(n);
	h.current = n;
	let g = f((e) => {
		i((n) => {
			let r = [...n, {
				...e,
				at: Date.now()
			}];
			return r.length > t ? r.slice(r.length - t) : r;
		});
	}, [t]), _ = f(() => {
		i([]), u(null), p(null), c(0);
	}, []), b = f(() => {
		m.current?.abort(), m.current = null, o(!1);
	}, []);
	return {
		steps: r,
		isRunning: a,
		toolCount: s,
		result: l,
		error: d,
		run: f(async (t, n) => {
			if (m.current) return;
			let r = new AbortController();
			m.current = r, o(!0), p(null), u(null), c(0), g({
				kind: "meta",
				text: n.prompt
			});
			let i = null;
			try {
				await e.runTask(t, n, (e) => {
					h.current?.(e);
					let t = e.type;
					if (t === "assistant") {
						let t = e.message?.content ?? [];
						for (let e of t) if (e.type === "tool_use") {
							let t = String(e.name ?? "tool");
							g({
								kind: "tool",
								tool: t,
								text: xe(t, e.input ?? {})
							}), c((e) => e + 1);
						} else if (e.type === "text") {
							let t = String(e.text ?? "").trim();
							t && g({
								kind: "text",
								text: t
							});
						}
						return;
					}
					if (t === "devbox_start") {
						let t = e.model;
						typeof t == "string" && t && g({
							kind: "meta",
							text: `model: ${t}`
						});
						return;
					}
					if (t === "devbox_raw") {
						let t = String(e.text ?? "").trim();
						t && g({
							kind: "text",
							text: t
						});
						return;
					}
					if (t === "devbox_error") {
						let t = String(e.error ?? "the box reported an error");
						i = t, g({
							kind: "error",
							text: t
						});
						return;
					}
					if (t === "devbox_end") {
						let t = e.timed_out === !0, n = Number(e.exit_code ?? 0), r = String(e.stderr ?? "").trim();
						t ? (i = "timed out — the container killed the run", g({
							kind: "error",
							text: i
						})) : n !== 0 && (i = `exited ${n}`, g({
							kind: "error",
							text: i
						})), r && (t || n !== 0) && g({
							kind: "text",
							text: r
						});
						return;
					}
					if (t === "result") {
						let t = {
							subtype: String(e.subtype ?? "success"),
							turns: Number(e.num_turns ?? 0),
							durationMs: Number(e.duration_ms ?? 0),
							costUsd: Number(e.total_cost_usd ?? 0)
						};
						u(t), g({
							kind: "result",
							text: `${t.turns} turns · ${(t.durationMs / 1e3).toFixed(0)}s · $${t.costUsd.toFixed(4)}`,
							result: t
						});
					}
				}, r.signal), i && p(i);
			} catch (e) {
				if (r.signal.aborted) return;
				let t = e instanceof Error ? e.message : "Task failed";
				p(t), g({
					kind: "error",
					text: t
				});
			} finally {
				m.current === r && (m.current = null), o(!1);
			}
		}, [e, g]),
		cancel: b,
		clear: _,
		push: g
	};
}
//#endregion
//#region src/components/compute/hooks/useComputeTail.ts
function Ce(e) {
	let t = e.type;
	if (t === "job_started") {
		let t = String(e.title ?? "job started"), n = e.kind;
		return {
			steps: [{
				kind: "job",
				text: t,
				jobKind: typeof n == "string" && n ? n : void 0
			}],
			running: !0
		};
	}
	if (t === "job_finished") {
		let t = e.ok !== !1;
		return {
			steps: [{
				kind: "job_end",
				text: t ? "job finished" : "job failed",
				jobOk: t
			}],
			running: !1
		};
	}
	if (t === "task_started") return {
		steps: [{
			kind: "meta",
			text: String(e.prompt ?? "run started")
		}],
		running: !0
	};
	if (t === "devbox_start") {
		let t = e.model;
		return {
			steps: typeof t == "string" && t ? [{
				kind: "meta",
				text: `model: ${t}`
			}] : [],
			running: !0
		};
	}
	if (t === "assistant") {
		let t = e.message?.content ?? [], n = [];
		for (let e of t) if (e.type === "tool_use") {
			let t = String(e.name ?? "tool");
			n.push({
				kind: "tool",
				tool: t,
				text: xe(t, e.input ?? {})
			});
		} else if (e.type === "text") {
			let t = String(e.text ?? "").trim();
			t && n.push({
				kind: "text",
				text: t
			});
		}
		return {
			steps: n,
			running: !0
		};
	}
	if (t === "devbox_raw") {
		let t = String(e.text ?? "").trim();
		return { steps: t ? [{
			kind: "text",
			text: t
		}] : [] };
	}
	if (t === "devbox_error") {
		let t = String(e.error ?? "the box reported an error");
		return {
			steps: [{
				kind: "error",
				text: t
			}],
			running: !1,
			error: t
		};
	}
	if (t === "devbox_end") {
		let t = e.timed_out === !0, n = Number(e.exit_code ?? 0), r = String(e.stderr ?? "").trim();
		if (t || n !== 0) {
			let e = t ? "timed out — the container killed the run" : `exited ${n}`, i = [{
				kind: "error",
				text: e
			}];
			return r && i.push({
				kind: "text",
				text: r
			}), {
				steps: i,
				running: !1,
				error: e
			};
		}
		return {
			steps: [],
			running: !1
		};
	}
	if (t === "result") {
		let t = {
			subtype: String(e.subtype ?? "success"),
			turns: Number(e.num_turns ?? 0),
			durationMs: Number(e.duration_ms ?? 0),
			costUsd: Number(e.total_cost_usd ?? 0)
		};
		return {
			steps: [{
				kind: "result",
				text: `${t.turns} turns · ${(t.durationMs / 1e3).toFixed(0)}s · $${t.costUsd.toFixed(4)}`,
				result: t
			}],
			result: t,
			running: !1
		};
	}
	return { steps: [] };
}
function we({ client: e, boxId: t, maxSteps: n = 300, enabled: r = !0 }) {
	let [i, a] = y([]), [o, s] = y(!1), [c, l] = y(!1), [u, d] = y(null), [f, p] = y(null), h = v(n);
	return h.current = n, m(() => {
		if (!r || !t) {
			s(!1);
			return;
		}
		a([]), d(null), p(null), l(!1);
		let n = e.tail(t);
		if (typeof EventSource != "function") {
			p("live tail unavailable in this environment");
			return;
		}
		let i = new EventSource(n.url, { withCredentials: n.withCredentials });
		return i.onopen = () => s(!0), i.onmessage = (e) => {
			let t;
			try {
				t = JSON.parse(e.data);
			} catch {
				return;
			}
			let n = Ce(t);
			n.steps.length > 0 && a((e) => {
				let t = [...e, ...n.steps.map((e) => ({
					...e,
					at: Date.now()
				}))];
				return t.length > h.current ? t.slice(t.length - h.current) : t;
			}), n.running !== void 0 && l(n.running), n.result && d(n.result), n.error && p(n.error);
		}, i.onerror = () => s(!1), () => {
			i.close(), s(!1);
		};
	}, [
		e,
		t,
		r
	]), {
		steps: i,
		connected: o,
		running: c,
		result: u,
		error: f
	};
}
//#endregion
//#region src/components/compute/components/TailPane.tsx
var Te = {
	meta: "text-code-blue",
	text: "text-code-subtle",
	tool: "text-code-green",
	result: "text-code-mauve",
	error: "text-code-red",
	job: "text-code-blue",
	job_end: "text-code-green"
}, Ee = {
	meta: "›",
	text: "·",
	tool: "⚙",
	result: "✓",
	error: "✗",
	job: "▶",
	job_end: "✓"
}, De = 200;
function Oe({ computer: n, registerPane: r, className: i }) {
	let { client: a } = Xe(), o = we({
		client: a,
		boxId: n.id
	}), s = v(null), c = v(!0), l = v(0), [u, d] = y(!0), [f, p] = y(0);
	function h() {
		let e = s.current;
		e && (e.scrollTop = e.scrollHeight), c.current = !0, d(!0), p(0);
	}
	m(() => {
		if (r) return r({ focus: () => s.current?.focus() }), () => r(null);
	}, [r]), g(() => {
		let e = s.current, t = o.steps.length - l.current;
		l.current = o.steps.length, e && (c.current ? (e.scrollTop = e.scrollHeight, f !== 0 && p(0)) : t > 0 && p((e) => e + t));
	}, [o.steps]);
	let _ = Math.max(0, o.steps.length - De), b = _ > 0 ? o.steps.slice(-200) : o.steps;
	return /* @__PURE__ */ C("div", {
		className: e("flex flex-col h-full min-h-0 bg-code-bg", i),
		children: [/* @__PURE__ */ C("div", {
			className: "shrink-0 flex items-center gap-2 px-2 py-1 border-b border-code-border",
			children: [
				/* @__PURE__ */ S(t, {
					size: "xs",
					mono: !0,
					tone: o.connected ? "success" : "neutral",
					dot: "static",
					children: o.connected ? "tailing" : "not connected"
				}),
				o.running && /* @__PURE__ */ S(t, {
					size: "xs",
					mono: !0,
					tone: "info",
					dot: "pulse",
					children: "running"
				}),
				/* @__PURE__ */ S("span", { className: "flex-1" }),
				/* @__PURE__ */ S("span", {
					className: "text-[10px] font-mono text-code-raised",
					children: "read-only"
				})
			]
		}), /* @__PURE__ */ C("div", {
			className: "relative flex-1 min-h-0",
			children: [/* @__PURE__ */ C("div", {
				ref: s,
				onScroll: (e) => {
					let t = e.currentTarget, n = t.scrollHeight - t.scrollTop - t.clientHeight < 32;
					c.current = n, d(n);
				},
				onKeyDown: (e) => {
					e.key === "End" && (e.preventDefault(), h());
				},
				tabIndex: 0,
				role: "log",
				"aria-label": `Activity on ${n.label}`,
				"data-testid": "tail-pane-log",
				className: "h-full overflow-y-auto px-2 py-1.5 font-mono text-[11px] leading-[1.5] flex flex-col gap-0.5 outline-none focus-visible:ring-1 focus-visible:ring-code-blue focus-visible:ring-inset",
				children: [
					_ > 0 && /* @__PURE__ */ C("div", {
						"data-testid": "tail-pane-trimmed",
						className: "text-center text-code-raised py-0.5",
						children: [
							"· earlier steps trimmed (",
							_,
							") ·"
						]
					}),
					o.error && /* @__PURE__ */ S("div", {
						className: "text-code-red",
						children: o.error
					}),
					o.steps.length === 0 && !o.error ? /* @__PURE__ */ S("div", {
						className: "text-code-raised",
						children: n.currentTask ? `waiting for output · ${n.currentTask}` : "nothing running on this box — open a terminal pane to start something"
					}) : b.map((n, r) => {
						if (n.kind === "job") return /* @__PURE__ */ C("div", {
							"data-testid": "tail-banner-job",
							className: "my-0.5 flex items-center gap-2 rounded border border-code-blue/40 bg-code-blue/10 px-2 py-1",
							children: [
								/* @__PURE__ */ S("span", {
									"aria-hidden": "true",
									className: "text-code-blue",
									children: "▶"
								}),
								/* @__PURE__ */ S("span", {
									className: "font-semibold text-code-blue break-words min-w-0",
									children: n.text
								}),
								n.jobKind && /* @__PURE__ */ S("span", {
									className: "ml-auto shrink-0 text-code-comment",
									children: n.jobKind
								})
							]
						}, r);
						if (n.kind === "job_end") {
							let t = n.jobOk !== !1;
							return /* @__PURE__ */ C("div", {
								"data-testid": "tail-banner-job-end",
								"data-ok": t,
								className: e("my-0.5 flex items-center gap-2 rounded border px-2 py-1 font-semibold", t ? "border-code-green/40 bg-code-green/10 text-code-green" : "border-code-red/40 bg-code-red/10 text-code-red"),
								children: [/* @__PURE__ */ S("span", {
									"aria-hidden": "true",
									children: t ? "✓" : "✗"
								}), /* @__PURE__ */ S("span", { children: n.text })]
							}, r);
						}
						if (n.kind === "error") return /* @__PURE__ */ C("div", {
							"data-testid": "tail-banner-error",
							className: "my-0.5 flex items-start gap-2 rounded border border-code-red/50 bg-code-red/15 px-2 py-1",
							children: [/* @__PURE__ */ S("span", {
								"aria-hidden": "true",
								className: "shrink-0 text-code-red",
								children: "✗"
							}), /* @__PURE__ */ S("span", {
								className: "min-w-0 break-words font-semibold text-code-red",
								children: n.text
							})]
						}, r);
						if (n.kind === "result" && n.result) {
							let { turns: i, durationMs: a, costUsd: o } = n.result;
							return /* @__PURE__ */ C("div", {
								"data-testid": "tail-result-chips",
								className: "my-0.5 flex flex-wrap items-center gap-1.5",
								children: [
									/* @__PURE__ */ S("span", {
										"aria-hidden": "true",
										className: e("shrink-0 w-3", Te.result),
										children: Ee.result
									}),
									/* @__PURE__ */ C(t, {
										size: "xs",
										mono: !0,
										palette: "code",
										tone: "neutral",
										className: "tabular-nums",
										children: [
											i,
											" turn",
											i === 1 ? "" : "s"
										]
									}),
									/* @__PURE__ */ C(t, {
										size: "xs",
										mono: !0,
										palette: "code",
										tone: "neutral",
										className: "tabular-nums",
										children: [(a / 1e3).toFixed(0), "s"]
									}),
									/* @__PURE__ */ C(t, {
										size: "xs",
										mono: !0,
										palette: "code",
										tone: "accent",
										className: "tabular-nums",
										children: ["$", o.toFixed(4)]
									})
								]
							}, r);
						}
						return /* @__PURE__ */ C("div", {
							className: "flex gap-1.5 min-w-0",
							children: [
								/* @__PURE__ */ S("span", {
									"aria-hidden": "true",
									className: e("shrink-0 w-3", Te[n.kind]),
									children: Ee[n.kind]
								}),
								n.tool && /* @__PURE__ */ S("span", {
									className: "shrink-0 text-code-comment",
									children: n.tool
								}),
								/* @__PURE__ */ S("span", {
									className: e("min-w-0 break-words", Te[n.kind]),
									children: n.text
								})
							]
						}, r);
					})
				]
			}), u ? /* @__PURE__ */ S("div", {
				"aria-hidden": "true",
				"data-testid": "tail-pane-following",
				className: "pointer-events-none absolute bottom-1.5 right-2 text-[10px] font-mono text-code-raised",
				children: "following"
			}) : f > 0 ? /* @__PURE__ */ C("button", {
				type: "button",
				"data-testid": "tail-pane-jump",
				onClick: h,
				className: "absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-full border border-code-blue/40 bg-code-blue/20 px-2.5 py-1 text-[10px] font-mono text-code-blue shadow-sm hover:bg-code-blue/30",
				children: [f, " new ↓"]
			}) : null]
		})]
	});
}
//#endregion
//#region src/components/compute/lib/status.ts
var ke = {
	idle: {
		tone: "success",
		label: "idle",
		help: "Session is up and doing nothing. Give it a task or open a terminal.",
		color: "var(--color-success)",
		pulse: !1
	},
	running: {
		tone: "info",
		label: "running",
		help: "An agent task is in flight. The timeline below is live.",
		color: "var(--color-primary)",
		pulse: !0
	},
	waiting: {
		tone: "warning",
		label: "needs you",
		help: "The last run ended by asking a question. Reply with a new task, resume on.",
		color: "var(--color-warning)",
		pulse: !1
	},
	stopped: {
		tone: "neutral",
		label: "stopped",
		help: "Session is down. The workspace persists — the next task or command resumes it.",
		color: "var(--color-text-tertiary)",
		pulse: !1
	},
	error: {
		tone: "danger",
		label: "error",
		help: "The last run failed. Open the timeline for what it said.",
		color: "var(--color-danger)",
		pulse: !1
	}
}, Ae = {
	connecting: {
		tone: "neutral",
		label: "connecting",
		help: "Minting a presigned URL and attaching to the PTY.",
		color: "var(--color-code-muted)",
		pulse: !0
	},
	ready: {
		tone: "success",
		label: "ready",
		help: "Attached and quiet.",
		color: "var(--color-code-green)",
		pulse: !1
	},
	busy: {
		tone: "caution",
		label: "output",
		help: "Bytes are arriving. Inferred from traffic — a silent command still reads as ready.",
		color: "var(--color-code-peach)",
		pulse: !0
	},
	detached: {
		tone: "neutral",
		label: "detached",
		help: "Socket dropped, shell still running server-side. Reattach to pick it back up.",
		color: "var(--color-code-muted)",
		pulse: !1
	},
	error: {
		tone: "danger",
		label: "error",
		help: "Could not attach. The runtime may already hold its ten shells.",
		color: "var(--color-code-red)",
		pulse: !1
	}
};
function J(e) {
	return e?.status ?? "idle";
}
function je(e, t) {
	return {
		fraction: t > 0 ? Math.max(0, Math.min(e, t)) / t : 0,
		urgent: e < 3e5
	};
}
//#endregion
//#region src/components/compute/lib/shellProtocol.ts
var Y = {
	STDIN: 0,
	STDOUT: 1,
	STDERR: 2,
	STATUS: 3,
	RESIZE: 4,
	HEARTBEAT: 5,
	CLOSE: 255
}, Me = 65536, Ne = 29, Pe = 3e4, Fe = 5;
function Ie(e, t) {
	let n = t ?? /* @__PURE__ */ new Uint8Array(), r = new Uint8Array(n.length + 1);
	return r[0] = e, r.set(n, 1), r;
}
function Le(e, t) {
	return Ie(Y.RESIZE, new TextEncoder().encode(JSON.stringify({
		width: e,
		height: t
	})));
}
function Re(e) {
	switch (e) {
		case 1e3: return {
			retry: !1,
			text: "shell exited"
		};
		case 1001: return {
			retry: !0,
			text: "server going away — reconnecting"
		};
		case 1003: return {
			retry: !1,
			text: "protocol error (binary frames only)"
		};
		case 1006: return {
			retry: !0,
			text: "connection lost — reconnecting"
		};
		case 1008: return {
			retry: !0,
			text: "session limit reached — reconnecting"
		};
		case 1009: return {
			retry: !1,
			text: "frame too large — paste under 64 KB"
		};
		case 1011: return {
			retry: !0,
			text: "server error — reconnecting"
		};
		case 4e3: return {
			retry: !1,
			text: "attached from another client"
		};
		default: return {
			retry: !1,
			text: `closed (${e})`
		};
	}
}
function ze(e, t) {
	return e === 1006 && t >= 5 ? "could not connect — the runtime may already hold 10 shells; close one and retry" : null;
}
function Be(e) {
	let t = (e.details?.causes ?? []).find((e) => e.reason === "ExitCode")?.message;
	if (t == null) return null;
	let n = Number.parseInt(t, 10);
	return Number.isNaN(n) ? null : n;
}
//#endregion
//#region src/components/compute/components/ShellTerminal.tsx
function Ve(e) {
	e && (e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close());
}
function He(e, t) {
	let n = {
		background: "#1e1e2e",
		foreground: "#cdd6f4",
		cursor: "#a6e3a1",
		selectionBackground: "#45475a"
	};
	if (typeof globalThis.getComputedStyle != "function" || typeof document > "u") return e ? {
		...n,
		background: e
	} : n;
	let r = globalThis.getComputedStyle(t ?? document.documentElement), i = (e, t) => r.getPropertyValue(e).trim() || t;
	return {
		background: e ?? i("--color-terminal-bg", n.background),
		foreground: i("--color-terminal-fg", n.foreground),
		cursor: i("--color-terminal-cursor", n.cursor),
		selectionBackground: i("--color-terminal-selection", n.selectionBackground)
	};
}
var Ue = d(function({ sessionId: t, shellId: n, label: r, cwd: i, onExit: a, height: o = 460, chrome: s = !0, fillHeight: c = !1, autoConnect: l = !1, onStatus: u, background: d, className: p }, g) {
	let { client: _ } = Xe(), b = v(null);
	m(() => {
		let e = () => E.current, t = () => {
			let t = e();
			t && (t.options.theme = He(d, b.current));
		}, n = typeof MutationObserver == "function" ? new MutationObserver(t) : null;
		n?.observe(document.documentElement, {
			attributes: !0,
			attributeFilter: ["data-theme", "class"]
		});
		let r = typeof globalThis.matchMedia == "function" ? globalThis.matchMedia("(prefers-color-scheme: dark)") : null;
		return r?.addEventListener?.("change", t), () => {
			n?.disconnect(), r?.removeEventListener?.("change", t);
		};
	}, [d]);
	let E = v(null), D = v(null), O = v(null), k = v(n), A = v(a);
	A.current = a;
	let j = v(u);
	j.current = u;
	let ee = v(null), M = v(0), N = v(!1), P = v(null), F = v(!1), [I, L] = y("idle"), [R, z] = y(""), B = f(async () => {
		let e = E.current;
		if (!e || F.current) return;
		P.current &&= (clearTimeout(P.current), null), L("connecting"), z(""), j.current?.("connecting");
		let n;
		try {
			let e = await _.getShellUrl(t, k.current);
			n = e.url, e.shellId && (k.current = e.shellId);
		} catch (e) {
			L("error"), z(e instanceof Error ? e.message : "could not mint a shell URL"), j.current?.("error");
			return;
		}
		if (F.current) return;
		Ve(O.current), O.current = null;
		let r = new WebSocket(n);
		r.binaryType = "arraybuffer", O.current = r, r.onopen = () => {
			M.current = 0, N.current = !1, L("live"), j.current?.("ready");
			let t = D.current;
			t && (t.fit(), r.send(Le(e.cols, e.rows))), i && r.send(Ie(Y.STDIN, new TextEncoder().encode(`cd ${i} 2>/dev/null || true\n`))), e.focus();
		}, r.onmessage = (t) => {
			let n = new Uint8Array(t.data);
			if (n.length === 0) return;
			let i = n[0], a = n.subarray(1);
			if (i === Y.STDOUT || i === Y.STDERR) {
				e.write(a), j.current?.("busy", !0), ee.current && clearTimeout(ee.current), ee.current = setTimeout(() => j.current?.("ready"), 700);
				return;
			}
			if (i === Y.STATUS) {
				try {
					let e = JSON.parse(new TextDecoder().decode(a));
					if (e.metadata?.shellId) {
						k.current = e.metadata.shellId;
						let t = e.metadata.bytesDropped;
						z(e.metadata.reconnected ? `reattached${t ? ` · ${t} bytes lost while away` : ""}` : "new shell");
						return;
					}
					A.current?.(Be(e));
				} catch {}
				return;
			}
			i === Y.CLOSE && r.close();
		}, r.onclose = (e) => {
			if (O.current = null, N.current) {
				L("detached"), z("detached — shell still running"), j.current?.("detached");
				return;
			}
			let t = Re(e.code);
			if (z(t.text), t.retry && M.current < 5 && !F.current) {
				M.current += 1, L("connecting"), P.current = setTimeout(() => void B(), Math.min(500 * 2 ** M.current, 8e3));
				return;
			}
			L(e.code === 1e3 ? "closed" : "error"), j.current?.(e.code === 1e3 ? "detached" : "error");
			let n = ze(e.code, M.current);
			n && z(n);
		}, r.onerror = () => {};
	}, [
		_,
		t,
		i
	]);
	m(() => {
		if (!b.current) return;
		F.current = !1;
		let e = new w({
			convertEol: !1,
			cursorBlink: !0,
			fontSize: 12.5,
			fontFamily: "\"Fira Code\", ui-monospace, SFMono-Regular, Menlo, monospace",
			theme: He(d, b.current),
			scrollback: 5e3
		}), t = new T();
		e.loadAddon(t), e.open(b.current), t.fit(), E.current = e, D.current = t;
		let n = e.onData((t) => {
			let n = O.current;
			if (!n || n.readyState !== WebSocket.OPEN) return;
			let r = new TextEncoder().encode(t);
			if (r.length === 1 && r[0] === 29) {
				N.current = !0, n.close();
				return;
			}
			if (r.length > 65536) {
				e.write("\r\n\x1B[33m[paste too large — split into chunks under 64 KB]\x1B[0m\r\n");
				return;
			}
			n.send(Ie(Y.STDIN, r));
		}), r = e.onResize(({ cols: e, rows: t }) => {
			let n = O.current;
			n?.readyState === WebSocket.OPEN && n.send(Le(e, t));
		}), i = () => t.fit();
		globalThis.addEventListener("resize", i);
		let a = typeof ResizeObserver == "function" ? new ResizeObserver(() => t.fit()) : null;
		a && b.current && a.observe(b.current);
		let o = setInterval(() => {
			let e = O.current;
			e?.readyState === WebSocket.OPEN && e.send(Ie(Y.HEARTBEAT));
		}, Pe);
		return () => {
			F.current = !0, P.current && clearTimeout(P.current), ee.current && clearTimeout(ee.current), clearInterval(o), globalThis.removeEventListener("resize", i), a?.disconnect(), n.dispose(), r.dispose(), Ve(O.current), O.current = null, e.dispose(), E.current = null;
		};
	}, []), m(() => {
		l && I === "idle" && B();
	}, [
		l,
		I,
		B
	]);
	let V = f(() => {
		N.current = !0, O.current?.close();
	}, []), te = f(() => {
		let e = O.current;
		e?.readyState === WebSocket.OPEN && e.send(Ie(Y.CLOSE));
	}, []);
	h(g, () => ({
		send: (e) => {
			let t = O.current;
			if (!t || t.readyState !== WebSocket.OPEN) return !1;
			let n = new TextEncoder().encode(e);
			return n.length > 65536 ? !1 : (t.send(Ie(Y.STDIN, n)), !0);
		},
		detach: V,
		kill: te,
		focus: () => E.current?.focus(),
		refit: () => D.current?.fit(),
		connect: () => void B()
	}), [
		B,
		V,
		te
	]);
	let H = I === "live", U = Ae[H ? "ready" : I === "error" ? "error" : I === "detached" || I === "closed" ? "detached" : "connecting"];
	return /* @__PURE__ */ C("div", {
		style: d ? { background: d } : void 0,
		className: e("flex flex-col", d ? "" : "bg-terminal-bg", c ? "h-full min-h-0" : "rounded-lg overflow-hidden border border-code-border", p),
		children: [
			s && /* @__PURE__ */ C("div", {
				className: "flex items-center gap-2 px-3 py-2 border-b border-code-border shrink-0",
				children: [
					/* @__PURE__ */ S("span", {
						className: "text-[11px] font-semibold text-code-text",
						children: r ?? "terminal"
					}),
					/* @__PURE__ */ C("span", {
						className: e("text-[10px]", H ? "text-code-green" : I === "error" ? "text-code-red" : "text-code-muted"),
						title: U.help,
						children: [I, R ? ` · ${R}` : ""]
					}),
					/* @__PURE__ */ S("span", { className: "flex-1" }),
					k.current && /* @__PURE__ */ S("span", {
						className: "text-[9.5px] text-code-muted font-mono hidden md:inline",
						children: k.current
					}),
					H ? /* @__PURE__ */ C(x, { children: [/* @__PURE__ */ S("button", {
						type: "button",
						onClick: V,
						title: "Leave the shell running (Ctrl-])",
						className: "text-[10px] px-2 py-0.5 rounded border border-code-border text-code-muted hover:text-code-text cursor-pointer bg-transparent",
						children: "detach"
					}), /* @__PURE__ */ S("button", {
						type: "button",
						onClick: te,
						title: "Kill the shell — it cannot be reattached",
						className: "text-[10px] px-2 py-0.5 rounded border border-code-border text-code-muted hover:text-code-red cursor-pointer bg-transparent",
						children: "kill"
					})] }) : /* @__PURE__ */ S("button", {
						type: "button",
						onClick: () => void B(),
						disabled: I === "connecting",
						className: "text-[10px] px-2 py-0.5 rounded border border-code-border text-code-green hover:bg-code-panel cursor-pointer bg-transparent disabled:cursor-not-allowed disabled:opacity-50",
						children: I === "connecting" ? "connecting" : I === "detached" || I === "closed" ? "reattach" : "connect"
					})
				]
			}),
			!s && I !== "live" && /* @__PURE__ */ C("div", {
				className: "px-3 py-1 text-[10px] border-b border-code-border flex items-center gap-2 shrink-0",
				children: [/* @__PURE__ */ C("span", {
					className: I === "error" ? "text-code-red" : "text-code-subtle",
					children: [I, R ? ` · ${R}` : ""]
				}), I !== "connecting" && /* @__PURE__ */ S("button", {
					type: "button",
					onClick: () => void B(),
					className: "text-code-green bg-transparent border-none cursor-pointer p-0 hover:underline",
					children: I === "idle" ? "connect" : "reattach"
				})]
			}),
			/* @__PURE__ */ S("div", {
				ref: b,
				style: c ? void 0 : { height: o },
				className: e("px-2 py-1", c && "flex-1 min-h-0")
			})
		]
	});
}), We = {
	id: "shell",
	label: "shell",
	description: "A real terminal on this computer.",
	quota: "shell",
	inputSuffix: "\n",
	statusMode: "pty",
	render: (e) => /* @__PURE__ */ S(qe, { ...e })
}, Ge = {
	id: "tail",
	label: "tail",
	description: "Watch what is running here, including runs started elsewhere. Costs no shell slot.",
	statusMode: "read-only",
	render: ({ computer: e, registerPane: t }) => /* @__PURE__ */ S(Oe, {
		computer: e,
		registerPane: t
	})
}, Ke = [We, Ge];
function qe({ computer: e, paneId: t, registerPane: n }) {
	let r = v(null);
	return m(() => (n({
		send: (e) => r.current?.send(e) ?? !1,
		focus: () => r.current?.focus()
	}), () => n(null)), [n]), /* @__PURE__ */ S(Ue, {
		ref: r,
		sessionId: e.sessionId,
		shellId: t,
		label: e.label,
		chrome: !1,
		fillHeight: !0,
		autoConnect: !0
	});
}
//#endregion
//#region src/components/compute/context/ComputeContext.tsx
var Je = u(null);
function Ye({ children: e, client: t, clientOptions: n, computers: r, useFixtures: i = !0, pollIntervalMs: a = 5e3, canManage: o = !1, enabled: s = !0, models: c, projects: l, paneKinds: u = Ke, onNotify: d }) {
	let f = _(() => t ?? D(n), [t, n]), p = P({
		client: f,
		pollIntervalMs: s ? a : 0,
		enabled: s,
		...r ? { computers: r } : {},
		...i ? { fixtures: ge } : {}
	}), h = I({
		client: f,
		enabled: s,
		...l ? { projects: l } : {}
	}), g = _(() => L(h.projects, p.computers), [h.projects, p.computers]), [v, b] = y(null), [x, C] = y(null);
	m(() => {
		if (!s) {
			b(null), C(null);
			return;
		}
		let e = !1;
		return f.getStatus().then((t) => {
			e || (b(t), C(null));
		}).catch((t) => {
			e || (C(t instanceof Error ? t.message : "Runtime status unavailable"), i && b(_e));
		}), () => {
			e = !0;
		};
	}, [
		f,
		i,
		s
	]), m(() => {
		p.source === "fixture" || p.isLoading || ie(p.computers.map((e) => e.sessionId));
	}, [
		p.computers,
		p.source,
		p.isLoading
	]);
	let w = c ?? ve, T = _(() => {
		let e = v?.allowedModels;
		return !e || e.length === 0 ? w : w.filter((t) => e.includes(t.id));
	}, [w, v?.allowedModels]), E = _(() => ({
		client: f,
		computers: p.computers,
		source: p.source,
		isLoading: p.isLoading,
		error: p.error,
		runtime: v,
		runtimeError: x,
		models: T,
		projects: g,
		projectsAbsent: h.absent,
		canManage: o,
		paneKinds: u,
		refresh: p.refresh,
		create: p.create,
		rename: p.rename,
		remove: p.remove,
		stop: p.stop,
		notify: d ?? (() => {})
	}), [
		f,
		p,
		v,
		x,
		T,
		g,
		h.absent,
		o,
		u,
		d
	]);
	return /* @__PURE__ */ S(Je.Provider, {
		value: E,
		children: e
	});
}
function Xe() {
	let e = p(Je);
	if (!e) throw Error("useCompute must be used within a ComputeProvider");
	return e;
}
function Ze() {
	return p(Je);
}
//#endregion
//#region src/components/compute/lib/paneTree.ts
var Qe = .1, $e = .9;
function et(e, t, n) {
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
function tt(e, t) {
	return X(e).find((e) => e.id === t) ?? null;
}
function nt(e) {
	return X(e).length;
}
function rt(e, t, n, r, i) {
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
function it(e, t) {
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
function at(e, t, n) {
	let r = Math.min($e, Math.max(Qe, n)), i = (e) => e.kind === "leaf" ? e : e.id === t ? {
		...e,
		ratio: r
	} : {
		...e,
		a: i(e.a),
		b: i(e.b)
	};
	return i(e);
}
function ot(e, t, n) {
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
function st(e, t = {
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
		return [...st(e.a, {
			...t,
			width: n
		}), ...st(e.b, {
			...t,
			x: t.x + n,
			width: t.width - n
		})];
	}
	let i = t.height * r;
	return [...st(e.a, {
		...t,
		height: i
	}), ...st(e.b, {
		...t,
		y: t.y + i,
		height: t.height - i
	})];
}
function ct(e, t, n) {
	let r = st(e), i = r.find((e) => e.id === t);
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
function lt(e, t, n) {
	let r = st(e);
	if (r.length < 2) return null;
	let i = r.findIndex((e) => e.id === t);
	return i < 0 ? r[0]?.id ?? null : r[(i + n + r.length) % r.length]?.id ?? null;
}
function ut(e, t, n) {
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
function dt(e, t) {
	return e.kind === "leaf" ? null : e.id === t ? e.ratio : dt(e.a, t) ?? dt(e.b, t);
}
//#endregion
//#region src/components/compute/hooks/useLabLayout.ts
var ft = 0, pt = (e) => `${e}-${(ft += 1).toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
function mt() {
	let e = {
		windows: [],
		activeWindowId: null,
		activePaneId: null,
		zoomedPaneId: null
	};
	try {
		let t = globalThis.localStorage?.getItem(A);
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
function ht() {
	let [e, t] = y(mt);
	m(() => {
		try {
			globalThis.localStorage?.setItem(A, JSON.stringify(e));
		} catch {}
	}, [e]);
	let n = _(() => e.windows.find((t) => t.id === e.activeWindowId) ?? e.windows[0] ?? null, [e.windows, e.activeWindowId]), r = _(() => n ? X(n.root) : [], [n]), i = _(() => [...new Set(r.map((e) => e.computerId))], [r]), a = f((e, n) => {
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
	}, []), o = f((e) => {
		t((t) => ({
			...t,
			activePaneId: e
		}));
	}, []), s = f((t, n, r) => {
		let i = et(pt("pane"), n, r);
		a((n) => {
			let r = e.activePaneId && tt(n, e.activePaneId) ? e.activePaneId : X(n)[0]?.id;
			return r ? rt(n, r, t, i, pt("split")) : n;
		}, () => ({
			activePaneId: i.id,
			zoomedPaneId: null
		}));
	}, [a, e.activePaneId]), c = f(() => {
		t((e) => {
			let t = e.windows.find((t) => t.id === e.activeWindowId) ?? e.windows[0];
			if (!t || !e.activePaneId) return e;
			if (nt(t.root) <= 1) {
				let n = e.windows.filter((e) => e.id !== t.id), r = n[0] ?? null;
				return {
					windows: n,
					activeWindowId: r?.id ?? null,
					activePaneId: r ? X(r.root)[0]?.id ?? null : null,
					zoomedPaneId: null
				};
			}
			let n = it(t.root, e.activePaneId), r = X(n);
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
	}, []), l = f((e, t) => a((n) => ot(n, e, { computerId: t })), [a]), u = f((e, t) => a((n) => ot(n, e, { kindId: t })), [a]), d = f((e, t) => a((n) => at(n, e, t)), [a]), p = f((e) => {
		t((t) => {
			let n = t.windows.find((e) => e.id === t.activeWindowId) ?? t.windows[0];
			if (!n || !t.activePaneId) return t;
			let r = ct(n.root, t.activePaneId, e);
			return r ? {
				...t,
				activePaneId: r,
				zoomedPaneId: null
			} : t;
		});
	}, []), h = f((e) => {
		t((t) => {
			let n = t.windows.find((e) => e.id === t.activeWindowId) ?? t.windows[0];
			if (!n || !t.activePaneId) return t;
			let r = lt(n.root, t.activePaneId, e);
			return r ? {
				...t,
				activePaneId: r,
				zoomedPaneId: null
			} : t;
		});
	}, []), g = f(() => {
		t((e) => ({
			...e,
			zoomedPaneId: e.zoomedPaneId ? null : e.activePaneId
		}));
	}, []), v = f((e, n) => {
		let r = et(pt("pane"), e, n), i = {
			id: pt("win"),
			root: r
		};
		t((e) => ({
			windows: [...e.windows, i],
			activeWindowId: i.id,
			activePaneId: r.id,
			zoomedPaneId: null
		}));
	}, []), b = f((e) => {
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
	}, []), x = f((e) => {
		t((t) => {
			let n = t.windows.find((t) => t.id === e);
			return n ? {
				...t,
				activeWindowId: e,
				activePaneId: X(n.root)[0]?.id ?? null,
				zoomedPaneId: null
			} : t;
		});
	}, []), S = f((e) => {
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
	}, []), C = f((e, n) => {
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
			let r = et(pt("pane"), e, n), i = {
				id: pt("win"),
				root: r
			};
			return {
				windows: [i],
				activeWindowId: i.id,
				activePaneId: r.id,
				zoomedPaneId: null
			};
		});
	}, []), w = f((e) => {
		let n = new Set(e);
		t((e) => {
			let t = !1, r = [];
			for (let i of e.windows) {
				let e = i.root;
				for (let r of X(i.root)) n.has(r.computerId) || (t = !0, e = nt(e) <= 1 ? e : it(e, r.id));
				if (nt(e) === 1 && !n.has(X(e)[0].computerId)) {
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
		move: p,
		cycle: h,
		toggleZoom: g,
		newWindow: v,
		closeWindow: b,
		selectWindow: x,
		stepWindow: S,
		ensureSeeded: C,
		reconcile: w
	};
}
//#endregion
//#region src/components/compute/lib/paneKinds.ts
function gt(e, t) {
	return e.find((e) => e.id === t) ?? e[0] ?? null;
}
function _t(e, t) {
	return e.length === 0 ? null : e[(e.findIndex((e) => e.id === t) + 1) % e.length] ?? null;
}
function vt(e, t, n) {
	return t.filter((t) => gt(e, t)?.quota === n).length;
}
//#endregion
//#region src/components/compute/lib/keymap.ts
var yt = {
	key: "b",
	ctrl: !0,
	label: "⌃B"
}, bt = [
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
function xt(e, t) {
	return !e || e.key.toLowerCase() !== t.key.toLowerCase() ? !1 : !!e.ctrl === t.ctrlKey && !!e.meta === t.metaKey && !!e.alt === t.altKey;
}
function St(e, t) {
	let n = t.key.toLowerCase();
	return e.find((e) => e.leaderKey && e.leaderKey.toLowerCase() === n)?.command ?? null;
}
function Ct(e, t) {
	let n = t.metaKey || t.ctrlKey;
	for (let r of e) if (r.key.toLowerCase() === t.key.toLowerCase() && !!(r.meta || r.ctrl) === n && !!r.shift === t.shiftKey && !!r.alt === t.altKey) return r.command;
	return null;
}
function wt(e) {
	return [
		"panes",
		"navigate",
		"lab"
	].map((t) => ({
		group: t,
		bindings: e.filter((e) => e.group === t)
	})).filter((e) => e.bindings.length > 0);
}
function Tt(e, t) {
	return e.find((e) => e.command === t)?.label ?? null;
}
//#endregion
//#region src/components/compute/lib/chromeTokens.ts
var Et = {
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
function Dt(e) {
	return e === "app" ? Et : void 0;
}
//#endregion
//#region src/components/compute/components/PaneStatusLine.tsx
var Ot = 36e5;
function kt(e, t = []) {
	if (!e) return "—";
	let n = t.find((t) => t.id === e);
	return n ? n.label : e.replace(/^[a-z]{2,3}\.(anthropic|amazon|meta)\./, "").replace(/-\d{8}-v\d+:\d+$/, "").replace(/-v\d+:\d+$/, "");
}
function At(e) {
	let t = Math.round(e / 6e4);
	return t < 60 ? `${t}m` : `${Math.floor(t / 60)}h ${t % 60}m`;
}
function jt({ computer: r, modelId: i, models: a = [], idleWindowMs: o = Ot, broadcasting: s = !1, mode: c, className: l, "data-testid": u }) {
	let d = ke[J(r)], f = r.lastResult, p = r.stopsInMs == null ? null : je(r.stopsInMs, o);
	return /* @__PURE__ */ C("div", {
		"data-testid": u,
		className: e("flex flex-col gap-0.5 px-2 py-1 border-t border-code-border bg-code-panel font-mono select-none shrink-0", l),
		children: [
			/* @__PURE__ */ C("div", {
				className: "flex items-center gap-2 text-[10px] leading-none min-w-0",
				children: [
					/* @__PURE__ */ S("span", {
						className: "text-code-mauve shrink-0",
						children: kt(r.activeModel ?? i ?? null, a)
					}),
					r.contextUsed != null && /* @__PURE__ */ C(x, { children: [/* @__PURE__ */ S("span", {
						"aria-hidden": "true",
						className: "text-code-raised",
						children: "│"
					}), /* @__PURE__ */ C("span", {
						className: e("shrink-0 tabular-nums", r.contextUsed > .85 ? "text-code-peach" : "text-code-muted"),
						title: "Share of the agent's context window in use",
						children: [
							"ctx ",
							Math.round(r.contextUsed * 100),
							"%"
						]
					})] }),
					/* @__PURE__ */ S("span", {
						"aria-hidden": "true",
						className: "text-code-raised",
						children: "│"
					}),
					/* @__PURE__ */ S("span", {
						className: "text-code-subtle shrink-0 tabular-nums",
						children: f ? `$${f.costUsd.toFixed(4)}` : "$—"
					}),
					/* @__PURE__ */ S("span", { className: "flex-1 min-w-0" }),
					r.project ? /* @__PURE__ */ S("span", {
						className: "text-code-blue truncate",
						title: r.workspace ? `${r.project} — ${r.workspace}` : r.project,
						children: r.project
					}) : /* @__PURE__ */ S("span", {
						className: "text-code-muted truncate",
						children: r.label
					})
				]
			}),
			p && /* @__PURE__ */ S(n, {
				label: "expires",
				value: 1 - p.fraction,
				note: r.stopsInMs == null ? void 0 : `⟳ stops in ${At(r.stopsInMs)}`,
				warnAbove: .9,
				tone: "code"
			}),
			/* @__PURE__ */ C("div", {
				className: "flex items-center gap-2 text-[10px] leading-none min-w-0",
				children: [
					/* @__PURE__ */ S(t, {
						size: "xs",
						mono: !0,
						uppercase: !0,
						tone: d.tone,
						title: d.help,
						className: "bg-transparent px-0 shrink-0",
						children: d.label
					}),
					s && /* @__PURE__ */ S(t, {
						size: "xs",
						mono: !0,
						tone: "caution",
						title: "The prompt bar reaches this pane",
						className: "shrink-0",
						children: "▶▶ broadcast"
					}),
					c && /* @__PURE__ */ S("span", {
						className: "text-code-muted truncate",
						children: c
					}),
					/* @__PURE__ */ S("span", { className: "flex-1" }),
					r.currentTask && /* @__PURE__ */ S("span", {
						className: "text-code-comment truncate max-w-[60%]",
						title: r.currentTask,
						children: r.currentTask
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/compute/components/ProjectSummary.tsx
function Mt(e) {
	let t = Math.max(0, Math.round(e / 6e4));
	return t < 60 ? `${t}m` : `${Math.floor(t / 60)}h ${String(t % 60).padStart(2, "0")}m`;
}
function Nt({ project: r, showMeter: i = !0, className: a, "data-testid": o }) {
	let { budgetUsd: s, spentUsd: c, maintenanceUsd: l, tokensUsed: u, tokenBudget: d } = r, f = typeof s == "number" && s > 0, p = c ?? r.liveSpendUsd, m = f ? p / s : 0, h = f && l ? l / s : null, g = r.computers.length, _ = r.id === F;
	return /* @__PURE__ */ C("div", {
		"data-testid": o,
		className: e("flex flex-col gap-1 font-mono min-w-0", a),
		children: [
			/* @__PURE__ */ C("div", {
				className: "flex items-center gap-2 text-[10px] leading-none min-w-0 flex-wrap",
				children: [
					f ? /* @__PURE__ */ C("span", {
						className: "text-code-subtle tabular-nums shrink-0",
						children: [
							"$",
							p.toFixed(2),
							/* @__PURE__ */ C("span", {
								className: "text-code-muted",
								children: [" / $", s.toFixed(0)]
							})
						]
					}) : /* @__PURE__ */ S("span", {
						className: "text-code-subtle tabular-nums shrink-0",
						children: p > 0 ? `$${p.toFixed(2)}` : "$—"
					}),
					u != null && /* @__PURE__ */ C(x, { children: [/* @__PURE__ */ S("span", {
						"aria-hidden": "true",
						className: "text-code-raised",
						children: "│"
					}), /* @__PURE__ */ C("span", {
						className: "text-code-muted tabular-nums shrink-0",
						title: d ? `${u} of ${d} tokens` : `${u} tokens`,
						children: [
							R(u),
							d ? /* @__PURE__ */ C("span", {
								className: "text-code-raised",
								children: ["/", R(d)]
							}) : null,
							" tok"
						]
					})] }),
					/* @__PURE__ */ S("span", { className: "flex-1 min-w-0" }),
					r.botCount != null && r.botCount > 0 && /* @__PURE__ */ C(t, {
						size: "xs",
						mono: !0,
						tone: "neutral",
						title: "Automations attached to this project",
						children: [
							r.botCount,
							" ",
							r.botCount === 1 ? "bot" : "bots"
						]
					}),
					g > 0 && /* @__PURE__ */ C(t, {
						size: "xs",
						mono: !0,
						tone: r.activeCount > 0 ? "info" : "neutral",
						...r.activeCount > 0 ? { dot: "pulse" } : {},
						title: r.activeCount > 0 ? `${r.activeCount} of ${g} doing something right now` : `${g} idle`,
						children: [r.activeCount > 0 ? `${r.activeCount}/${g}` : g, " ▣"]
					}),
					r.soonestExpiryMs != null && /* @__PURE__ */ C(t, {
						size: "xs",
						mono: !0,
						tone: r.soonestExpiryMs < 3e5 ? "warning" : "neutral",
						title: "Time until the first of these computers stops on its own",
						children: ["⟳ ", Mt(r.soonestExpiryMs)]
					})
				]
			}),
			i && f && /* @__PURE__ */ S(n, {
				label: "budget",
				value: m,
				note: h == null ? r.periodResetsAt ? `⟳ ${new Date(r.periodResetsAt).toLocaleDateString()}` : void 0 : `${Math.round(h * 100)}% is upkeep`,
				tone: "code"
			}),
			_ && /* @__PURE__ */ S("span", {
				className: "text-[10px] text-code-raised",
				children: "not charged to any project"
			})
		]
	});
}
//#endregion
//#region src/components/compute/components/LabRail.tsx
var Pt = {
	waiting: 0,
	error: 1,
	running: 2,
	idle: 3,
	stopped: 4
};
function Ft({ computers: n, activeComputerId: r, openComputerIds: i, onSelect: a, onOpenInPane: o, onWatch: s, onCreate: c, onOpenMenu: l, showAllActivity: u, onToggleShowAll: d, canManage: f = !1, models: p = [], className: m }) {
	let h = new Set(i), g = n.filter((e) => {
		let t = J(e);
		return t === "running" || t === "waiting" || t === "error";
	}), _ = [...u ? n : g].sort((e, t) => (Pt[J(e)] ?? 9) - (Pt[J(t)] ?? 9)), v = Ze(), y = v?.projects ?? [], b = v?.projectsAbsent ?? !0, w = y.filter((e) => e.id !== "__unassigned__" && e.computers.length > 0), T = y.find((e) => e.id === F), E = !b && w.length > 0 ? [...w.map((e) => ({
		id: e.id,
		computers: e.computers,
		heading: /* @__PURE__ */ C("div", {
			role: "presentation",
			className: "px-3 pt-2 pb-1 border-t border-code-border first:border-t-0 first:pt-1",
			children: [/* @__PURE__ */ S("span", {
				className: "block text-[11px] font-mono text-code-subtle truncate",
				children: e.name
			}), /* @__PURE__ */ S(Nt, {
				project: e,
				showMeter: !1,
				className: "mt-0.5"
			})]
		})
	})), ...T && T.computers.length > 0 ? [{
		id: F,
		computers: T.computers,
		heading: /* @__PURE__ */ S("div", {
			role: "presentation",
			className: "px-3 pt-2 pb-1 text-[10px] font-mono text-code-raised lowercase tracking-wide border-t border-code-border",
			children: "unassigned"
		})
	}] : []] : null;
	return /* @__PURE__ */ C("div", {
		className: e("flex flex-col h-full min-h-0 bg-code-panel border-r border-code-border", m),
		children: [
			/* @__PURE__ */ S(It, {
				title: "computers",
				count: n.length,
				rows: n,
				groups: E,
				activeId: r,
				onSelect: a,
				onOpenInPane: o ?? null,
				open: h,
				renderSub: null
			}),
			/* @__PURE__ */ C("div", {
				className: "flex items-center px-3 py-1.5 border-y border-code-border shrink-0",
				children: [
					f && c ? /* @__PURE__ */ S("button", {
						type: "button",
						onClick: c,
						className: "text-[11px] font-mono text-code-green bg-transparent border-none cursor-pointer p-0 hover:underline",
						children: "new"
					}) : /* @__PURE__ */ S("span", {
						className: "text-[11px] font-mono text-code-raised",
						children: "new"
					}),
					/* @__PURE__ */ S("span", { className: "flex-1" }),
					/* @__PURE__ */ S("button", {
						type: "button",
						onClick: l,
						className: "text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer p-0 hover:text-code-text",
						children: "menu"
					})
				]
			}),
			/* @__PURE__ */ S(It, {
				title: "agents",
				count: g.length,
				rows: _,
				activeId: r,
				onSelect: a,
				onOpenInPane: o ?? null,
				open: h,
				action: /* @__PURE__ */ S("button", {
					type: "button",
					onClick: d,
					"aria-pressed": u,
					title: u ? "Show only boxes doing something" : "Show every box",
					className: e("text-[11px] font-mono bg-transparent border-none cursor-pointer p-0", u ? "text-code-blue" : "text-code-muted hover:text-code-text"),
					children: "all"
				}),
				onWatch: s ?? null,
				renderSub: (e) => {
					let n = J(e), r = e.lastResult ? kt(null, p) : null;
					return /* @__PURE__ */ C("span", {
						className: "flex items-center gap-1 truncate",
						children: [
							/* @__PURE__ */ S(t, {
								size: "xs",
								mono: !0,
								tone: ke[n].tone,
								className: "bg-transparent px-0",
								children: ke[n].label
							}),
							e.currentTask && /* @__PURE__ */ C(x, { children: [/* @__PURE__ */ S("span", {
								"aria-hidden": "true",
								className: "text-code-raised",
								children: "·"
							}), /* @__PURE__ */ S("span", {
								className: "truncate text-code-comment",
								children: e.currentTask
							})] }),
							!e.currentTask && r && /* @__PURE__ */ C(x, { children: [/* @__PURE__ */ S("span", {
								"aria-hidden": "true",
								className: "text-code-raised",
								children: "·"
							}), /* @__PURE__ */ S("span", {
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
function It({ title: t, count: n, rows: r, activeId: i, open: a, onSelect: s, onOpenInPane: c, action: l, renderSub: u, onWatch: d = null, groups: p = null }) {
	let m = v(null), h = f((e) => {
		if (![
			"ArrowDown",
			"ArrowUp",
			"Home",
			"End"
		].includes(e.key)) return;
		let t = Array.from(m.current?.querySelectorAll("[data-rail-row]") ?? []);
		if (t.length === 0) return;
		let n = t.findIndex((e) => e === document.activeElement);
		e.preventDefault(), t[e.key === "Home" ? 0 : e.key === "End" ? t.length - 1 : n < 0 ? 0 : (n + (e.key === "ArrowDown" ? 1 : -1) + t.length) % t.length]?.focus();
	}, []);
	return /* @__PURE__ */ C("div", {
		className: "flex flex-col min-h-0 flex-1",
		children: [/* @__PURE__ */ C("div", {
			className: "flex items-center gap-2 px-3 py-2 shrink-0",
			children: [
				/* @__PURE__ */ S("span", {
					className: "text-[11px] font-mono text-code-subtle lowercase tracking-wide",
					children: t
				}),
				/* @__PURE__ */ S("span", {
					className: "text-[10px] font-mono text-code-raised tabular-nums",
					children: n
				}),
				/* @__PURE__ */ S("span", { className: "flex-1" }),
				l
			]
		}), r.length === 0 ? /* @__PURE__ */ S("div", {
			className: "px-3 pb-3 text-[11px] font-mono text-code-raised",
			children: "nothing here"
		}) : /* @__PURE__ */ S("div", {
			ref: m,
			role: "listbox",
			"aria-label": t,
			onKeyDown: h,
			className: "flex-1 min-h-0 overflow-y-auto pb-1",
			children: p ? p.map((e) => /* @__PURE__ */ C("div", {
				role: "presentation",
				children: [e.heading, e.computers.map(g)]
			}, e.id)) : r.map(g)
		})]
	});
	function g(t) {
		let n = ke[J(t)], r = t.id === i;
		return /* @__PURE__ */ C("div", {
			role: "presentation",
			className: e("group relative flex items-stretch", r ? "bg-code-surface" : "hover:bg-code-surface/60"),
			children: [/* @__PURE__ */ C("button", {
				"data-rail-row": !0,
				type: "button",
				role: "option",
				"aria-selected": r,
				tabIndex: r ? 0 : -1,
				title: `${n.label} — ${n.help}`,
				onClick: () => s(t),
				onAuxClick: (e) => {
					e.button === 1 && c && (e.preventDefault(), c(t));
				},
				onKeyDown: (e) => {
					e.key === "Enter" && (e.metaKey || e.ctrlKey) && c && (e.preventDefault(), c(t));
				},
				className: e("min-w-0 flex-1 text-left flex items-start gap-2 px-3 py-1.5 border-l-2 cursor-pointer bg-transparent transition-colors", "focus:outline-none focus-visible:ring-1 focus-visible:ring-code-blue focus-visible:ring-inset", r ? "border-code-blue" : "border-transparent"),
				children: [
					/* @__PURE__ */ S(o, {
						size: "xs",
						color: n.color,
						pulse: n.pulse,
						className: "mt-[5px]",
						"aria-label": n.label
					}),
					/* @__PURE__ */ C("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ S("span", {
							className: e("block text-[12px] font-mono truncate", r ? "text-code-text" : "text-code-subtle"),
							children: t.label
						}), u && /* @__PURE__ */ S("span", {
							className: "block text-[10px] font-mono truncate",
							children: u(t)
						})]
					}),
					a.has(t.id) && /* @__PURE__ */ S("span", {
						"aria-label": "open in a pane",
						title: "Open in a pane",
						className: "mt-[3px] text-[9px] font-mono text-code-blue shrink-0",
						children: "▣"
					})
				]
			}), d && /* @__PURE__ */ S("button", {
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
function Lt(e, t) {
	if (!t) return 0;
	let n = e.toLowerCase(), r = t.toLowerCase(), i = 0, a = 0, o = -1;
	for (let e of r) {
		let t = n.indexOf(e, i);
		if (t < 0) return null;
		a += o >= 0 ? t - o - 1 : t, o = t, i = t + 1;
	}
	return a;
}
function Rt({ open: n, onClose: r, computers: i, panes: a, onJumpToPane: s, onRetarget: c, onOpenInSplit: l, projects: u = [], onSelectProject: d, chrome: f = "code" }) {
	let [p, h] = y(""), [g, b] = y(0), x = v(null), w = v(null), T = _(() => new Map(i.map((e) => [e.id, e])), [i]), E = _(() => {
		let e = [];
		for (let t of a) {
			let n = T.get(t.computerId);
			if (!n) continue;
			let r = Lt(`${n.label} ${t.kindId}`, p);
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
			let r = Lt(`${e.label} ${e.sessionId}`, p);
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
		if (d && p.trim()) for (let e of u) {
			let t = Lt(e.name, p);
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
		T,
		p,
		u,
		d
	]);
	if (m(() => {
		if (n) {
			h(""), b(0);
			let e = setTimeout(() => x.current?.focus(), 0);
			return () => clearTimeout(e);
		}
	}, [n]), m(() => {
		b((e) => Math.min(e, Math.max(0, E.length - 1)));
	}, [E.length]), m(() => {
		w.current?.querySelector("[data-highlighted=\"true\"]")?.scrollIntoView({ block: "nearest" });
	}, [g]), !n) return null;
	let D = (e, t) => {
		e && (e.kind === "project" ? d?.(e.project) : e.kind === "pane" ? s(e.pane.id) : t ? l(e.computer) : c(e.computer), r());
	};
	return /* @__PURE__ */ S("div", {
		className: "absolute inset-0 z-20 flex items-start justify-center pt-[12vh] bg-code-bg/70",
		onClick: r,
		children: /* @__PURE__ */ C("div", {
			style: Dt(f),
			onClick: (e) => e.stopPropagation(),
			role: "dialog",
			"aria-label": "Jump to a computer, pane or project",
			className: "w-[480px] max-w-[92vw] rounded-lg border border-code-border bg-code-panel overflow-hidden font-mono shadow-2xl",
			children: [/* @__PURE__ */ C("div", {
				className: "flex items-center gap-2 px-3 py-2 border-b border-code-border",
				children: [
					/* @__PURE__ */ S("span", {
						"aria-hidden": "true",
						className: "text-code-green text-[12px]",
						children: "/"
					}),
					/* @__PURE__ */ S("input", {
						ref: x,
						value: p,
						onChange: (e) => {
							h(e.target.value), b(0);
						},
						onKeyDown: (e) => {
							e.key === "ArrowDown" || e.key === "n" && e.ctrlKey ? (e.preventDefault(), b((e) => E.length ? (e + 1) % E.length : 0)) : e.key === "ArrowUp" || e.key === "p" && e.ctrlKey ? (e.preventDefault(), b((e) => E.length ? (e - 1 + E.length) % E.length : 0)) : e.key === "Enter" ? (e.preventDefault(), D(E[g], e.shiftKey)) : e.key === "Escape" && (e.preventDefault(), r());
						},
						placeholder: "jump to a computer, pane or project…",
						"aria-label": "Filter computers, panes and projects",
						className: "flex-1 min-w-0 bg-transparent border-none outline-none text-[12px] text-code-text placeholder:text-code-raised"
					}),
					/* @__PURE__ */ S("span", {
						className: "text-[10px] text-code-raised shrink-0 hidden sm:inline",
						children: "⏎ jump · ⇧⏎ split"
					})
				]
			}), /* @__PURE__ */ S("div", {
				ref: w,
				role: "listbox",
				"aria-label": "Results",
				className: "max-h-[46vh] overflow-y-auto",
				children: E.length === 0 ? /* @__PURE__ */ C("div", {
					className: "px-3 py-4 text-[11px] text-code-raised",
					children: [
						"nothing matches “",
						p,
						"”"
					]
				}) : E.map((n, r) => {
					let i = r === g;
					if (n.kind === "project") return /* @__PURE__ */ C("div", {
						role: "option",
						"aria-selected": i,
						"data-highlighted": i,
						onMouseEnter: () => b(r),
						onClick: () => D(n, !1),
						className: e("flex flex-col gap-0.5 px-3 py-1.5 cursor-pointer border-l-2", i ? "bg-code-surface border-code-mauve" : "bg-transparent border-transparent"),
						children: [/* @__PURE__ */ C("div", {
							className: "flex items-center gap-2 min-w-0",
							children: [/* @__PURE__ */ S(t, {
								size: "xs",
								mono: !0,
								tone: "accent",
								className: "shrink-0",
								children: "project"
							}), /* @__PURE__ */ S("span", {
								className: e("text-[12px] truncate", i ? "text-code-text" : "text-code-subtle"),
								children: n.project.name
							})]
						}), /* @__PURE__ */ S(Nt, {
							project: n.project,
							showMeter: !1,
							className: "pl-1"
						})]
					}, n.id);
					let a = ke[J(n.computer)];
					return /* @__PURE__ */ C("div", {
						role: "option",
						"aria-selected": i,
						"data-highlighted": i,
						onMouseEnter: () => b(r),
						onClick: (e) => D(n, e.shiftKey),
						className: e("flex items-center gap-2 px-3 py-1.5 cursor-pointer border-l-2", i ? "bg-code-surface border-code-blue" : "bg-transparent border-transparent"),
						children: [
							/* @__PURE__ */ S(o, {
								size: "xs",
								color: a.color,
								pulse: a.pulse,
								"aria-label": a.label
							}),
							/* @__PURE__ */ S("span", {
								className: e("text-[12px] truncate", i ? "text-code-text" : "text-code-subtle"),
								children: n.computer.label
							}),
							/* @__PURE__ */ S("span", { className: "flex-1" }),
							n.kind === "pane" ? /* @__PURE__ */ C(t, {
								size: "xs",
								mono: !0,
								tone: "info",
								className: "shrink-0",
								children: ["on screen · ", n.pane.kindId]
							}) : /* @__PURE__ */ S(t, {
								size: "xs",
								mono: !0,
								tone: a.tone,
								className: "bg-transparent px-0 shrink-0",
								children: a.label
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
function zt({ node: t, activePaneId: n, zoomedPaneId: r = null, renderLeaf: i, onRatioChange: a, className: o }) {
	if (r) {
		let n = Bt(t, r);
		if (n) return /* @__PURE__ */ S("div", {
			className: e("flex min-h-0 min-w-0", o),
			children: i(n)
		});
	}
	return /* @__PURE__ */ S("div", {
		className: e("flex min-h-0 min-w-0", o),
		children: /* @__PURE__ */ S(Vt, {
			node: t,
			activePaneId: n,
			renderLeaf: i,
			onRatioChange: a
		})
	});
}
function Bt(e, t) {
	return e.kind === "leaf" ? e.id === t ? e : null : Bt(e.a, t) ?? Bt(e.b, t);
}
function Vt({ node: t, activePaneId: n, renderLeaf: r, onRatioChange: i }) {
	let a = v(null), o = f((e) => {
		if (t.kind !== "split") return;
		let n = a.current;
		if (!n) return;
		e.preventDefault();
		let r = t.direction === "row", o = (e) => {
			let a = n.getBoundingClientRect(), o = r ? a.width : a.height;
			if (o <= 0) return;
			let s = r ? e.clientX - a.left : e.clientY - a.top;
			i(t.id, Math.min($e, Math.max(Qe, s / o)));
		}, s = () => {
			globalThis.removeEventListener("pointermove", o), globalThis.removeEventListener("pointerup", s), globalThis.removeEventListener("pointercancel", s);
		};
		globalThis.addEventListener("pointermove", o), globalThis.addEventListener("pointerup", s), globalThis.addEventListener("pointercancel", s);
	}, [t, i]), s = f((e) => {
		if (t.kind !== "split") return;
		let n = t.direction === "row", r = n ? "ArrowLeft" : "ArrowUp", a = n ? "ArrowRight" : "ArrowDown";
		if (e.key !== r && e.key !== a) return;
		e.preventDefault();
		let o = e.shiftKey ? .1 : .02;
		i(t.id, t.ratio + (e.key === a ? o : -o));
	}, [t, i]);
	if (t.kind === "leaf") return /* @__PURE__ */ S("div", {
		className: "flex-1 min-w-0 min-h-0 flex",
		children: r(t)
	});
	let c = t.direction === "row", l = Math.round(t.ratio * 1e3) / 10;
	return /* @__PURE__ */ C("div", {
		ref: a,
		className: e("flex flex-1 min-w-0 min-h-0", c ? "flex-row" : "flex-col"),
		children: [
			/* @__PURE__ */ S("div", {
				className: "flex min-w-0 min-h-0",
				style: {
					flexBasis: `${l}%`,
					flexGrow: 0,
					flexShrink: 0
				},
				children: /* @__PURE__ */ S(Vt, {
					node: t.a,
					activePaneId: n,
					renderLeaf: r,
					onRatioChange: i
				})
			}),
			/* @__PURE__ */ S("div", {
				role: "separator",
				"aria-orientation": c ? "vertical" : "horizontal",
				"aria-label": `Resize ${c ? "columns" : "rows"}`,
				"aria-valuenow": l,
				"aria-valuemin": Qe * 100,
				"aria-valuemax": $e * 100,
				tabIndex: 0,
				onPointerDown: o,
				onKeyDown: s,
				className: e("shrink-0 bg-transparent hover:bg-code-blue/40 focus-visible:bg-code-blue/60 focus:outline-none transition-colors", c ? "w-1 cursor-col-resize my-0.5" : "h-1 cursor-row-resize mx-0.5")
			}),
			/* @__PURE__ */ S("div", {
				className: "flex flex-1 min-w-0 min-h-0",
				children: /* @__PURE__ */ S(Vt, {
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
function Ht({ open: t, onClose: r, focusComputerId: i = null, variant: a = "overlay", chrome: o = "app", keymap: s = bt, leader: c = null, idleWindowMs: l = Ot, className: u }) {
	let { computers: d, canManage: p, create: h, models: g, notify: b, refresh: x, paneKinds: w, projects: T } = Xe(), E = w[0]?.id ?? "agent", D = ht(), [O, k] = y(!1), [A, j] = y(""), [ee, M] = y(!1), [N, P] = y(!1), [F, I] = y(!1), [L, R] = y(!1), z = v(/* @__PURE__ */ new Map()), B = v(null), V = v(null), te = v(null), H = _(() => new Map(d.map((e) => [e.id, e])), [d]), U = D.panes.find((e) => e.id === D.activePaneId) ?? D.panes[0] ?? null, ne = U ? H.get(U.computerId) ?? null : null, W = vt(w, D.panes.map((e) => e.kindId), "shell"), re = D.windows.length > 0, G = i && H.has(i) ? i : null, ie = G ?? d[0]?.id ?? null;
	m(() => {
		!t || re || !ie || D.ensureSeeded(ie, E);
	}, [
		t,
		re,
		ie,
		E,
		D.ensureSeeded
	]);
	let ae = v(null), { focusPane: oe, setPaneComputer: se, panes: ce, activePaneId: le } = D;
	m(() => {
		if (!t || !G || ae.current === G) return;
		let e = ce.find((e) => e.computerId === G);
		if (e) oe(e.id);
		else if (le) se(le, G);
		else return;
		ae.current = G;
	}, [
		t,
		G,
		ce,
		le,
		oe,
		se
	]), m(() => {
		t || (ae.current = null);
	}, [t]);
	let ue = D.reconcile, de = _(() => d.map((e) => e.id), [d]);
	m(() => {
		!t || de.length === 0 || ue(de);
	}, [
		t,
		de,
		ue
	]);
	let fe = f((e, t, n) => {
		n ? z.current.set(e, {
			handle: n,
			kind: t
		}) : z.current.delete(e);
	}, []), K = O ? D.panes : U ? [U] : [], pe = f(() => {
		let e = A.trim();
		if (!e || K.length === 0) return;
		let t = 0;
		for (let n of K) {
			let r = z.current.get(n.id);
			r?.handle.send && r.handle.send(`${e}${r.kind.inputSuffix ?? ""}`) && (t += 1);
		}
		if (t === 0) {
			b({
				tone: "error",
				title: "Nothing received that",
				detail: "No pane was ready to accept input."
			});
			return;
		}
		j(""), t < K.length && b({
			tone: "info",
			title: `Sent to ${t} of ${K.length} panes`,
			detail: "The rest were not connected."
		});
	}, [
		A,
		K,
		b
	]), me = f((e) => {
		let t = U?.computerId ?? d[0]?.id;
		t && D.split(e, t, U?.kindId ?? E);
	}, [
		U,
		d,
		D,
		E
	]), he = f((e, t, n) => {
		if (!n || n.id === t) return;
		let r = gt(w, t);
		if (n.quota === "shell" && r?.quota !== "shell" && W >= 8) {
			b({
				tone: "error",
				title: "No shell slots left",
				detail: "8 open terminals is the limit here. Close one, or use a pane kind that costs nothing."
			});
			return;
		}
		D.setPaneKind(e, n.id);
	}, [
		D,
		w,
		W,
		b
	]), q = f(() => {
		U && he(U.id, U.kindId, _t(w, U.kindId));
	}, [
		U,
		w,
		he
	]), ge = f((e) => {
		h(e ? { projectId: e } : void 0).then((e) => {
			D.newWindow(e.id, E), b({
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
		h,
		D,
		b,
		E
	]);
	m(() => {
		if (!t || !D.activePaneId || F || N) return;
		let e = D.activePaneId, n = requestAnimationFrame(() => z.current.get(e)?.handle.focus?.());
		return () => cancelAnimationFrame(n);
	}, [
		t,
		D.activePaneId,
		D.zoomedPaneId,
		F,
		N
	]);
	let _e = f((e) => {
		let t = {
			"focus-left": "left",
			"focus-right": "right",
			"focus-up": "up",
			"focus-down": "down"
		}[e];
		if (t) {
			D.move(t);
			return;
		}
		switch (e) {
			case "split-right":
				me("row");
				return;
			case "split-down":
				me("column");
				return;
			case "close-pane":
				D.closeActivePane();
				return;
			case "zoom-pane":
				D.toggleZoom();
				return;
			case "next-kind":
				q();
				return;
			case "jump":
				I(!0);
				return;
			case "focus-composer":
				B.current?.focus();
				return;
			case "leave-pane":
				B.current?.focus();
				return;
			case "focus-rail": {
				let e = V.current;
				if (!e) return;
				let t = (t) => e.querySelector(`[role="listbox"][aria-label="${t}"] [data-rail-row][tabindex="0"]`) ?? e.querySelector(`[role="listbox"][aria-label="${t}"] [data-rail-row]`), n = document.activeElement, r = (t) => !!n && !!e.querySelector(`[role="listbox"][aria-label="${t}"]`)?.contains(n);
				if (r("computers")) {
					let e = t("agents");
					e ? e.focus() : U && z.current.get(U.id)?.handle.focus?.();
					return;
				}
				if (r("agents")) {
					U && z.current.get(U.id)?.handle.focus?.();
					return;
				}
				(t("computers") ?? t("agents"))?.focus();
				return;
			}
			case "toggle-broadcast":
				k((e) => !e);
				return;
			case "help":
				P((e) => !e);
				return;
			case "exit":
				if (V.current?.contains(document.activeElement)) {
					U && z.current.get(U.id)?.handle.focus?.();
					return;
				}
				a === "overlay" && r();
				return;
		}
	}, [
		D,
		me,
		q,
		r,
		a,
		U
	]);
	if (m(() => {
		if (!t) return;
		let e = (e) => {
			if (L) {
				e.preventDefault(), e.stopPropagation(), R(!1);
				let t = St(s, e);
				t && _e(t);
				return;
			}
			if (xt(c, e)) {
				e.preventDefault(), e.stopPropagation(), R(!0);
				return;
			}
			let t = Ct(s, e);
			if (t) {
				if (t === "exit") {
					let t = e.target;
					if (t?.closest?.(".xterm")) return;
					if (t === B.current) {
						B.current?.blur(), e.preventDefault();
						return;
					}
					if (F || N) {
						I(!1), P(!1), e.preventDefault();
						return;
					}
				}
				e.preventDefault(), e.stopPropagation(), _e(t);
			}
		};
		return globalThis.addEventListener("keydown", e, !0), () => globalThis.removeEventListener("keydown", e, !0);
	}, [
		t,
		s,
		c,
		L,
		_e,
		F,
		N
	]), m(() => {
		if (!L) return;
		let e = setTimeout(() => R(!1), c?.timeoutMs ?? 3e3);
		return () => clearTimeout(e);
	}, [L, c?.timeoutMs]), !t) return null;
	let ve = (e) => Tt(s, e), ye = Dt(o), be = o === "app", xe = a === "inline";
	return /* @__PURE__ */ C("div", {
		ref: te,
		...a === "overlay" ? {
			role: "dialog",
			"aria-modal": !0
		} : { role: "region" },
		"aria-label": "Computer Lab",
		style: ye,
		className: e("flex flex-col", be ? "bg-surface text-text-primary" : "bg-code-bg text-code-text", a === "overlay" ? "fixed inset-0 z-[150]" : e("relative h-full min-h-0 w-full", be && "rounded-lg border border-border overflow-hidden"), u),
		children: [
			/* @__PURE__ */ C("div", {
				className: e("flex items-center gap-3 px-3 shrink-0 border-b border-code-border bg-code-panel", xe ? "h-9" : "h-10"),
				children: [
					/* @__PURE__ */ S("span", {
						className: "text-[11px] font-mono font-semibold tracking-wide text-code-mauve select-none",
						children: "LAB"
					}),
					/* @__PURE__ */ C("span", {
						"data-testid": "lab-summary",
						className: "text-[10px] font-mono text-code-muted tabular-nums",
						children: [
							d.length,
							" ",
							d.length === 1 ? "computer" : "computers",
							" · ",
							D.panes.length,
							" ",
							D.panes.length === 1 ? "pane" : "panes"
						]
					}),
					/* @__PURE__ */ C("div", {
						className: "flex items-center gap-1 ml-2",
						children: [D.windows.map((t, n) => {
							let r = t.id === D.activeWindow?.id;
							return /* @__PURE__ */ S("button", {
								type: "button",
								onClick: () => D.selectWindow(t.id),
								title: `Window ${n + 1}`,
								"aria-current": r ? "true" : void 0,
								className: e("px-2 py-0.5 rounded-sm text-[11px] font-mono cursor-pointer border-none transition-colors", r ? "bg-code-blue text-code-bg font-semibold" : "bg-code-surface text-code-muted hover:text-code-text"),
								children: t.name ?? n + 1
							}, t.id);
						}), /* @__PURE__ */ S("button", {
							type: "button",
							onClick: () => U && D.newWindow(U.computerId, E),
							disabled: !U,
							title: "New window",
							"aria-label": "New window",
							className: "px-1.5 py-0.5 text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text disabled:opacity-40 disabled:cursor-not-allowed",
							children: "+"
						})]
					}),
					/* @__PURE__ */ S("span", { className: "flex-1" }),
					/* @__PURE__ */ S(n, {
						label: "shells",
						value: W / 8,
						segments: 8,
						showPercent: !1,
						note: `${W} of 8 open`,
						warnAbove: .74,
						tone: be ? "surface" : "code",
						className: "hidden md:flex"
					}),
					L && c && /* @__PURE__ */ C("span", {
						"data-testid": "leader-armed",
						className: "px-2 py-0.5 rounded-sm text-[10px] font-mono font-semibold bg-code-peach text-code-bg animate-pulse",
						children: [c.label, " …"]
					}),
					/* @__PURE__ */ S("button", {
						type: "button",
						onClick: () => P((e) => !e),
						"aria-pressed": N,
						title: `Shortcuts${ve("help") ? ` · ${ve("help")}` : ""}`,
						className: "text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text",
						children: "?"
					}),
					a === "overlay" && /* @__PURE__ */ S("button", {
						type: "button",
						onClick: r,
						title: `Leave the lab${ve("exit") ? ` · ${ve("exit")}` : ""}`,
						className: "text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-red",
						children: "✕"
					})
				]
			}),
			/* @__PURE__ */ C("div", {
				className: "flex flex-1 min-h-0",
				children: [/* @__PURE__ */ S("div", {
					ref: V,
					className: "contents",
					children: /* @__PURE__ */ S(Ft, {
						className: "w-[210px] shrink-0",
						computers: d,
						activeComputerId: ne?.id ?? null,
						openComputerIds: D.openComputerIds,
						showAllActivity: ee,
						onToggleShowAll: () => M((e) => !e),
						canManage: p,
						models: g,
						onCreate: () => ge(),
						onOpenMenu: () => P((e) => !e),
						onSelect: (e) => {
							U && D.setPaneComputer(U.id, e.id);
						},
						onOpenInPane: (e) => D.split("row", e.id, U?.kindId ?? E),
						onWatch: (e) => {
							let t = w.find((e) => e.id === "tail");
							if (!t) {
								U && D.setPaneComputer(U.id, e.id);
								return;
							}
							let n = D.panes.find((n) => n.computerId === e.id && n.kindId === t.id);
							if (n) {
								D.focusPane(n.id);
								return;
							}
							D.split("row", e.id, t.id);
						}
					})
				}), /* @__PURE__ */ S("div", {
					className: e("flex-1 min-w-0 min-h-0", xe ? "p-1.5" : "p-2", be ? "bg-surface" : "bg-code-bg"),
					children: D.activeWindow && U ? /* @__PURE__ */ S(zt, {
						className: "flex-1 h-full",
						node: D.activeWindow.root,
						activePaneId: D.activePaneId,
						zoomedPaneId: D.zoomedPaneId,
						onRatioChange: D.resize,
						renderLeaf: (e) => {
							let t = H.get(e.computerId), n = e.id === D.activePaneId;
							return /* @__PURE__ */ S(Ut, {
								pane: e,
								computer: t ?? null,
								active: n,
								broadcasting: O,
								idleWindowMs: l,
								zoomed: D.zoomedPaneId === e.id,
								onFocus: () => D.focusPane(e.id),
								onClose: () => {
									D.focusPane(e.id), D.closeActivePane();
								},
								kinds: w,
								onToggleKind: () => {
									D.focusPane(e.id), he(e.id, e.kindId, _t(w, e.kindId));
								},
								onRegisterPane: fe,
								onSettled: () => void x()
							}, e.id);
						}
					}) : /* @__PURE__ */ C("div", {
						className: "h-full flex flex-col items-center justify-center gap-3 text-center",
						children: [
							/* @__PURE__ */ S("div", {
								className: "text-[13px] font-mono text-code-subtle",
								children: "No computers to lab"
							}),
							/* @__PURE__ */ S("div", {
								className: "text-[11px] font-mono text-code-muted max-w-sm",
								children: "Computer Lab multiplexes a fleet. Provision at least one computer and it will open in a pane."
							}),
							p && /* @__PURE__ */ S("button", {
								type: "button",
								onClick: () => ge(),
								className: "text-[11px] font-mono rounded px-3 py-1 cursor-pointer border border-code-green/60 bg-code-green/15 text-code-green hover:bg-code-green/30",
								children: "+ new computer"
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ C("div", {
				className: e("flex items-center gap-2 px-3 shrink-0 border-t font-mono transition-colors", xe ? "py-1" : "py-1.5", O ? "border-code-peach bg-code-peach/10" : "border-code-border bg-code-panel focus-within:border-code-blue"),
				children: [
					/* @__PURE__ */ S("button", {
						type: "button",
						onClick: () => k((e) => !e),
						"aria-pressed": O,
						title: `Send the prompt to every pane${ve("toggle-broadcast") ? ` · ${ve("toggle-broadcast")}` : ""}`,
						className: e("text-[10px] px-1.5 py-0.5 rounded-sm cursor-pointer border transition-colors shrink-0", O ? "border-code-peach bg-code-peach/25 text-code-peach font-semibold" : "border-code-border text-code-muted bg-transparent hover:text-code-text"),
						children: O ? "▶▶ all panes" : "▶ focused pane"
					}),
					/* @__PURE__ */ C("span", {
						className: "text-[10px] text-code-muted tabular-nums shrink-0 hidden sm:inline",
						children: [
							K.length,
							" ",
							K.length === 1 ? "target" : "targets"
						]
					}),
					/* @__PURE__ */ S("textarea", {
						ref: B,
						rows: 1,
						value: A,
						onChange: (e) => j(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" && !e.shiftKey && (e.preventDefault(), pe()), e.key === "Escape" && e.currentTarget.blur();
						},
						placeholder: O ? `instruction for all ${K.length} panes — ⏎ to send` : `instruction for ${ne?.label ?? "the focused pane"} — ⏎ to send`,
						"aria-label": "Broadcast instruction",
						className: "flex-1 min-w-0 resize-none bg-transparent border-none outline-none text-[12px] leading-6 text-code-text caret-code-blue placeholder:text-code-raised"
					}),
					/* @__PURE__ */ S("button", {
						type: "button",
						onClick: pe,
						disabled: !A.trim() || K.length === 0,
						className: e("shrink-0 text-[11px] px-2 py-0.5 rounded-sm border cursor-pointer transition-colors", "border-code-green/60 bg-code-green/15 text-code-green hover:bg-code-green/30", "disabled:border-code-border disabled:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"),
						children: "send"
					})
				]
			}),
			/* @__PURE__ */ S(Rt, {
				open: F,
				onClose: () => I(!1),
				chrome: o,
				computers: d,
				panes: D.panes,
				onJumpToPane: D.focusPane,
				onRetarget: (e) => {
					U && D.setPaneComputer(U.id, e.id);
				},
				onOpenInSplit: (e) => D.split("row", e.id, U?.kindId ?? E),
				projects: T,
				onSelectProject: (e) => {
					let t = e.computers[0];
					if (t) {
						U && D.setPaneComputer(U.id, t.id);
						return;
					}
					if (!p) {
						b({
							tone: "info",
							title: `${e.name} has no computers`,
							detail: "You do not have permission to start one."
						});
						return;
					}
					ge(e.id);
				}
			}),
			N && /* @__PURE__ */ S(Wt, {
				keymap: s,
				leader: c,
				chrome: o,
				onClose: () => P(!1)
			})
		]
	});
}
function Ut({ pane: e, computer: t, active: n, broadcasting: r, zoomed: i, idleWindowMs: s, kinds: c, onFocus: l, onClose: u, onToggleKind: d, onRegisterPane: p, onSettled: m }) {
	let h = gt(c, e.kindId), g = f((t) => {
		h && p(e.id, h, t);
	}, [
		p,
		e.id,
		h
	]);
	if (!t || !h) return /* @__PURE__ */ S(a, {
		title: "unbound",
		active: n,
		className: "flex-1 min-w-0",
		onActivate: l,
		children: /* @__PURE__ */ S("div", {
			className: "h-full flex items-center justify-center text-[11px] font-mono text-code-subtle",
			children: t ? "no pane kind registered" : "this computer is gone"
		})
	});
	let _ = ke[J(t)];
	return /* @__PURE__ */ C(a, {
		active: n,
		onActivate: l,
		className: "flex-1 min-w-0",
		bodyClassName: "flex flex-col min-h-0",
		title: /* @__PURE__ */ C("span", {
			className: "inline-flex items-center gap-1.5",
			children: [
				/* @__PURE__ */ S(o, {
					size: "xs",
					color: _.color,
					pulse: _.pulse,
					"aria-label": _.label
				}),
				t.label,
				i && /* @__PURE__ */ S("span", {
					className: "text-code-peach",
					title: "Zoomed",
					children: "⤢"
				})
			]
		}),
		titleAction: /* @__PURE__ */ C("span", {
			className: "inline-flex items-center gap-1.5",
			children: [/* @__PURE__ */ S("button", {
				type: "button",
				onClick: d,
				title: _t(c, e.kindId)?.description ?? "Switch pane kind",
				className: "text-[9px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text",
				children: h.label
			}), /* @__PURE__ */ S("button", {
				type: "button",
				onClick: u,
				"aria-label": `Close pane ${t.label}`,
				className: "text-[10px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-red leading-none",
				children: "×"
			})]
		}),
		children: [/* @__PURE__ */ S("div", {
			className: "flex-1 min-h-0",
			children: h.render({
				computer: t,
				paneId: e.id,
				active: n,
				registerPane: g,
				onSettled: m
			})
		}), /* @__PURE__ */ S(jt, {
			className: "rounded-b-[3px]",
			computer: t,
			idleWindowMs: s,
			broadcasting: r,
			mode: h.statusMode ?? h.label
		})]
	});
}
function Wt({ keymap: e, leader: t, chrome: n = "app", onClose: r }) {
	let i = {
		panes: "Panes",
		navigate: "Getting around",
		lab: "The lab"
	};
	return /* @__PURE__ */ S("div", {
		role: "dialog",
		"aria-label": "Keyboard shortcuts",
		className: "absolute inset-0 z-10 flex items-center justify-center bg-code-bg/80",
		onClick: r,
		children: /* @__PURE__ */ C("div", {
			style: Dt(n),
			onClick: (e) => e.stopPropagation(),
			className: "w-[560px] max-w-[92vw] max-h-[80vh] overflow-y-auto rounded-lg border border-code-border bg-code-panel p-5 shadow-2xl",
			children: [
				/* @__PURE__ */ C("div", {
					className: "flex items-baseline gap-2 mb-4",
					children: [
						/* @__PURE__ */ S("span", {
							className: "text-[13px] font-semibold text-code-text",
							children: "Keyboard shortcuts"
						}),
						t && /* @__PURE__ */ C("span", {
							className: "text-[10px] font-mono text-code-muted",
							children: [t.label, " prefix is on"]
						}),
						/* @__PURE__ */ S("span", { className: "flex-1" }),
						/* @__PURE__ */ S("button", {
							type: "button",
							onClick: r,
							className: "text-[11px] font-mono text-code-muted bg-transparent border-none cursor-pointer hover:text-code-text",
							children: "esc"
						})
					]
				}),
				/* @__PURE__ */ S("div", {
					className: "flex flex-col gap-4",
					children: wt(e).map(({ group: e, bindings: n }) => /* @__PURE__ */ C("div", { children: [/* @__PURE__ */ S("div", {
						className: "text-[10px] uppercase tracking-wide text-code-mauve mb-1.5",
						children: i[e]
					}), /* @__PURE__ */ S("dl", {
						className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 m-0",
						children: n.map((e) => /* @__PURE__ */ C(l, { children: [/* @__PURE__ */ C("dt", {
							className: "m-0 font-mono text-[11px] text-code-green whitespace-nowrap",
							children: [e.label, t && e.leaderKey && /* @__PURE__ */ C("span", {
								className: "text-code-muted",
								children: [
									" or ",
									t.label,
									" ",
									e.leaderKey
								]
							})]
						}), /* @__PURE__ */ S("dd", {
							className: "m-0 text-[11px] text-code-subtle",
							children: e.description
						})] }, `${e.command}-${e.label}`))
					})] }, e))
				}),
				/* @__PURE__ */ C("div", {
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
var Gt = {
	connected: "success",
	stale: "caution",
	offline: "neutral"
}, Kt = {
	connected: "connected",
	stale: "stale",
	offline: "offline"
};
function qt(e) {
	return !e || e.mode === "disabled" ? "— sync off" : e.mode === "offline" ? "○ offline — queuing" : e.mode === "pending" ? `◐ ${e.pendingOps ?? "?"} pending` : "● synced";
}
function Jt(e, t = []) {
	let n = e.modelProvider === "bedrock" ? kt(e.model, t) : e.model ?? "—";
	return e.modelProvider ? `${e.modelProvider} · ${n}` : n;
}
function Yt(e) {
	return e.reduce((e, t) => e + t.sessions.length, 0);
}
function Xt({ session: e, models: r }) {
	let i = e.projectName ?? e.projectId ?? e.repo ?? "—", a = e.branch ? `${i} · ${e.branch}` : i, o = e.modelProvider != null && e.modelProvider !== "bedrock";
	return /* @__PURE__ */ C("li", {
		"data-testid": "machine-session-row",
		className: "flex flex-col gap-1 rounded-md px-2 py-1.5 hover:bg-surface-hover",
		children: [
			/* @__PURE__ */ C("div", {
				className: "flex items-center gap-2 min-w-0",
				children: [
					/* @__PURE__ */ S("span", {
						className: "text-xs font-medium text-text-primary truncate",
						title: e.worktree ?? a,
						children: a
					}),
					/* @__PURE__ */ S("span", { className: "flex-1" }),
					/* @__PURE__ */ S(t, {
						size: "xs",
						mono: !0,
						tone: o ? "accent" : "neutral",
						className: "shrink-0",
						children: Jt(e, r)
					})
				]
			}),
			e.intent && /* @__PURE__ */ S("div", {
				className: "text-[11px] text-text-tertiary truncate",
				title: e.intent,
				children: e.intent
			}),
			/* @__PURE__ */ C("div", {
				className: "flex items-center gap-3 min-w-0",
				children: [e.contextUsed != null && /* @__PURE__ */ S(n, {
					label: "ctx",
					value: e.contextUsed,
					tone: "surface",
					segments: 8,
					className: "shrink-0"
				}), /* @__PURE__ */ S("span", {
					className: "text-[10px] font-mono text-text-tertiary truncate",
					title: e.memory?.pullCursorAgeS == null ? void 0 : `read replica ${e.memory.pullCursorAgeS}s behind the mesh`,
					children: qt(e.memory)
				})]
			})
		]
	});
}
function Zt({ nodes: n, models: i = [], onOpenLab: a, onManage: o, className: l, "data-testid": u = "machine-presence-menu" }) {
	let d = v(null), [f, p] = y(!1);
	if (n.length === 0) return null;
	let m = Yt(n), h = n.some((e) => e.status === "connected") ? "connected" : n.some((e) => e.status === "stale") ? "stale" : "offline", g = n.length === 1 ? n[0].label : `${n.length} machines`, _ = h === "connected" && m > 0;
	return /* @__PURE__ */ C(x, { children: [/* @__PURE__ */ S("button", {
		ref: d,
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": f,
		"aria-label": `Local machines: ${g}, ${m} active session${m === 1 ? "" : "s"}, ${Kt[h]}`,
		title: `${g} — ${Kt[h]}`,
		onClick: () => p((e) => !e),
		"data-testid": u,
		className: e("inline-flex items-center cursor-pointer rounded-md border border-border px-2 py-1", "bg-transparent hover:bg-surface-hover transition-colors duration-100", f && "bg-surface-hover", l),
		children: /* @__PURE__ */ C(t, {
			size: "xs",
			mono: !0,
			tone: Gt[h],
			dot: _ ? "pulse" : "static",
			className: "bg-transparent px-0",
			children: [
				"⌂ ",
				g,
				" · ",
				m
			]
		})
	}), /* @__PURE__ */ S(s, {
		trigger: d,
		open: f,
		onClose: () => p(!1),
		placement: "bottom-end",
		"aria-label": "Local machine sessions",
		className: "w-[320px] p-2",
		"data-testid": `${u}-panel`,
		children: /* @__PURE__ */ C("div", {
			className: "flex flex-col gap-2",
			children: [n.map((e) => /* @__PURE__ */ C("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ C("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ S(r, { children: e.label }),
						e.platform && /* @__PURE__ */ S("span", {
							className: "text-[10px] font-mono text-text-tertiary",
							children: e.platform
						}),
						/* @__PURE__ */ S("span", { className: "flex-1" }),
						/* @__PURE__ */ S(t, {
							size: "xs",
							uppercase: !0,
							tone: Gt[e.status],
							dot: "static",
							children: Kt[e.status]
						})
					]
				}), e.sessions.length > 0 ? /* @__PURE__ */ S("ul", {
					className: "flex flex-col",
					children: e.sessions.map((e) => /* @__PURE__ */ S(Xt, {
						session: e,
						models: i
					}, e.id))
				}) : /* @__PURE__ */ S(c, {
					"data-testid": "machine-no-sessions",
					children: e.status === "offline" ? "machine offline" : "no active sessions"
				})]
			}, e.id)), (a || o) && /* @__PURE__ */ C("div", {
				className: "flex items-center gap-2 border-t border-border pt-2",
				children: [
					a && /* @__PURE__ */ S("button", {
						type: "button",
						onClick: () => {
							p(!1), a();
						},
						className: "text-[11px] font-medium text-primary hover:underline cursor-pointer bg-transparent border-0 p-0",
						children: "Open Computer Lab"
					}),
					/* @__PURE__ */ S("span", { className: "flex-1" }),
					o && /* @__PURE__ */ S("button", {
						type: "button",
						onClick: () => {
							p(!1), o();
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
var Qt = {
	docked: "▭",
	grid: "▦",
	stack: "▤",
	floating: "▢"
};
function $t(e) {
	m(() => {
		if (!e) return;
		let t = (e) => {
			let t = e.metaKey || e.ctrlKey;
			if (t && (e.key === "'" || e.key === "\"")) {
				e.preventDefault(), e.stopPropagation(), e.shiftKey ? pe() : fe(G().mode === "hidden");
				return;
			}
			if (G().mode !== "hidden") {
				if (e.altKey && !t && /^[1-9]$/.test(e.key)) {
					e.preventDefault(), e.stopPropagation(), ue(Number(e.key) - 1);
					return;
				}
				e.ctrlKey && e.key === "Tab" && (e.preventDefault(), e.stopPropagation(), le(e.shiftKey ? -1 : 1));
			}
		};
		return window.addEventListener("keydown", t, !0), () => window.removeEventListener("keydown", t, !0);
	}, [e]);
}
function en({ status: e }) {
	let t = Ae[e];
	return /* @__PURE__ */ S("span", {
		"aria-hidden": "true",
		title: t.help,
		className: `w-1.5 h-1.5 rounded-full shrink-0 ${t.pulse ? "animate-pulse" : ""}`,
		style: { background: t.color }
	});
}
function tn({ shell: e, active: t, labelled: n }) {
	return /* @__PURE__ */ C("div", {
		className: "flex flex-col min-h-0 h-full",
		children: [n && /* @__PURE__ */ C("div", {
			className: "flex items-center gap-1.5 px-2 py-1 border-b shrink-0 bg-code-surface border-code-border",
			children: [
				/* @__PURE__ */ S(en, { status: e.status }),
				/* @__PURE__ */ S("span", {
					className: "text-[10px] font-mono text-code-muted",
					children: e.label
				}),
				/* @__PURE__ */ S("div", { className: "flex-1" }),
				/* @__PURE__ */ S("button", {
					type: "button",
					onClick: () => oe(e.id),
					"aria-label": `Close ${e.label}`,
					className: "text-[10px] bg-transparent border-none cursor-pointer px-1 leading-none text-code-muted hover:text-code-red",
					children: "×"
				})
			]
		}), /* @__PURE__ */ S("div", {
			className: "flex-1 min-h-0",
			children: /* @__PURE__ */ S(Ue, {
				sessionId: e.sessionId,
				shellId: e.id,
				label: e.label,
				...e.cwd ? { cwd: e.cwd } : {},
				chrome: !1,
				fillHeight: !0,
				autoConnect: t,
				onStatus: (t, n) => ce(e.id, t, n)
			})
		})]
	});
}
function nn({ hotkeys: e = !0, reconcile: t = !0, className: n = "" }) {
	let r = b(re, G, G), a = Ze();
	$t(e);
	let o = _(() => (a?.computers ?? []).map((e) => e.sessionId), [a?.computers]);
	if (m(() => {
		!t || o.length === 0 || ie(o);
	}, [t, o]), r.mode === "hidden" || r.shells.length === 0) return null;
	let s = me(r.mode), c = /* @__PURE__ */ C("div", {
		style: Et,
		className: "flex flex-col h-full min-h-0",
		children: [/* @__PURE__ */ C("div", {
			className: "flex items-center gap-1 px-1.5 py-1 border-b shrink-0 overflow-x-auto bg-terminal-bg border-code-border",
			children: [
				r.shells.map((e, t) => {
					let n = e.id === r.activeId;
					return /* @__PURE__ */ C("div", {
						className: `group flex items-center gap-1.5 pl-2 pr-1 py-1 rounded shrink-0 ${n ? "bg-code-surface" : "bg-transparent hover:bg-code-surface/60"}`,
						children: [/* @__PURE__ */ C("button", {
							type: "button",
							onClick: () => se(e.id),
							title: `${e.label} · ⌥${t + 1}`,
							"aria-current": n ? "true" : void 0,
							className: `flex items-center gap-1.5 text-[11px] font-mono cursor-pointer border-none bg-transparent p-0 ${n ? "text-code-text" : "text-code-muted hover:text-code-text"}`,
							children: [
								/* @__PURE__ */ S(en, { status: e.status }),
								e.label,
								e.unread && !n && /* @__PURE__ */ S("span", {
									className: "w-1 h-1 rounded-full bg-code-blue",
									title: "new output while you were away"
								})
							]
						}), /* @__PURE__ */ S("button", {
							type: "button",
							onClick: () => oe(e.id),
							"aria-label": `Close ${e.label}`,
							title: `Close ${e.label} — the shell is killed`,
							className: "opacity-0 group-hover:opacity-100 focus:opacity-100 bg-transparent border-none cursor-pointer px-1 leading-none text-code-muted hover:text-code-red",
							children: "×"
						})]
					}, e.id);
				}),
				/* @__PURE__ */ S("div", { className: "flex-1" }),
				r.shells.length >= 8 && /* @__PURE__ */ S("span", {
					className: "text-[10px] mr-1 shrink-0 text-code-peach",
					title: "AgentCore allows 10 shells per runtime",
					children: "max shells"
				}),
				/* @__PURE__ */ S("div", {
					className: "flex rounded border overflow-hidden mr-1 shrink-0 border-code-border",
					children: Object.keys(Qt).map((e) => /* @__PURE__ */ S("button", {
						type: "button",
						onClick: () => de(e),
						title: `${e} layout — ⌘⇧' cycles`,
						"aria-pressed": r.mode === e,
						className: `px-1.5 py-0.5 text-[10px] cursor-pointer border-none ${r.mode === e ? "bg-code-border text-code-text" : "bg-transparent text-code-muted hover:text-code-text"}`,
						children: Qt[e]
					}, e))
				}),
				/* @__PURE__ */ S("button", {
					type: "button",
					onClick: () => fe(!1),
					title: "Hide — ⌘'. The shells keep running.",
					className: "text-[11px] px-1.5 py-0.5 bg-transparent border-none cursor-pointer shrink-0 text-code-muted hover:text-code-text",
					children: "▾"
				})
			]
		}), /* @__PURE__ */ S("div", {
			className: `flex-1 min-h-0 ${s ? `p-1.5 gap-1.5 overflow-auto ${r.mode === "grid" ? "grid grid-cols-1 md:grid-cols-2 auto-rows-fr" : "flex flex-col"}` : "relative"}`,
			children: r.shells.map((e) => {
				let t = e.id === r.activeId;
				return /* @__PURE__ */ S("div", {
					onMouseDown: () => se(e.id),
					"aria-hidden": !s && !t,
					className: s ? `min-h-[160px] rounded border overflow-hidden flex flex-col ${t ? "border-code-green/50" : "border-code-border"}` : "absolute inset-0",
					style: s ? void 0 : { visibility: t ? "visible" : "hidden" },
					children: /* @__PURE__ */ S(tn, {
						shell: e,
						active: s || t,
						labelled: s
					})
				}, e.id);
			})
		})]
	});
	if (r.mode === "floating") return /* @__PURE__ */ S(i, {
		open: !0,
		onClose: () => fe(!1),
		title: "Terminals",
		defaultPosition: "bottom-right",
		persistKey: "ui-components.computeDock.anchor.v1",
		widthClassName: "w-[46rem] max-w-[92vw]",
		heightClassName: "h-[26rem]",
		tone: "dark",
		className: n,
		"data-testid": "compute-dock-floating",
		children: c
	});
	let l = r.mode === "stack" ? "fixed top-0 right-0 bottom-0 w-[26rem] max-w-[92vw] border-l" : "fixed left-0 right-0 bottom-0 border-t";
	return /* @__PURE__ */ S("div", {
		"data-testid": "compute-dock",
		className: `${l} z-[120] flex flex-col bg-terminal-bg border-code-border ${n}`,
		style: r.mode === "stack" ? Et : {
			...Et,
			height: r.geometry.dockHeight
		},
		children: c
	});
}
//#endregion
//#region src/components/compute/lib/workspaceTree.ts
var rn = String.raw`find . -maxdepth 3 \( -name .git -o -name node_modules -o -name .venv -o -name __pycache__ -o -name dist \) -prune -printf "p %p\n" -o -printf "%y %p\n" 2>/dev/null | head -400`, an = "git log --oneline -3 2>/dev/null; git status --short 2>/dev/null | head -5", on = 400;
function sn(e) {
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
	return cn(t), t;
}
function cn(e) {
	e.sort((e, t) => e.kind === t.kind ? e.name.localeCompare(t.name) : e.kind === "dir" ? -1 : 1);
	for (let t of e) cn(t.children);
}
function ln(e) {
	return e.children.reduce((e, t) => e + 1 + ln(t), 0);
}
function un(e, t, n = 0) {
	let r = [];
	for (let i of e) r.push({
		node: i,
		depth: n
	}), i.kind === "dir" && !i.pruned && t.has(i.path) && r.push(...un(i.children, t, n + 1));
	return r;
}
//#endregion
//#region src/components/compute/fixtures/mockShell.ts
var dn = "mock-shell:", Z = "/mnt/workspace", fn = "bedrock_agentcore", Q = {
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
}, pn = {
	[Z]: [
		".git/",
		"README.md",
		"src/"
	],
	[`${Z}/src`]: ["main.py"],
	[`${Z}/.git`]: [
		"HEAD",
		"config",
		"objects/",
		"refs/"
	]
}, mn = {
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
	[`${Z}/.git/HEAD`]: "ref: refs/heads/main",
	[`${Z}/.git/config`]: [
		"[core]",
		"	repositoryformatversion = 0",
		"[remote \"origin\"]",
		"	url = git@github.com:acme/ingest.git"
	].join("\n")
}, hn = [
	["Read", "src/main.py"],
	["Grep", "\"def handler\" (1 file)"],
	["Edit", "src/main.py · +1 -1"],
	["Bash", "pytest -q → 4 passed in 0.62s"]
], gn = [
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
], _n = /* @__PURE__ */ new Map();
function vn(e, t) {
	let n = t ?? `mock-${Math.random().toString(36).slice(2, 8)}`;
	return {
		url: `${dn}//${e}?shell=${encodeURIComponent(n)}`,
		shellId: n
	};
}
function yn(e) {
	let t = [], n = /"([^"]*)"|'([^']*)'|(\S+)/g, r = n.exec(e);
	for (; r;) t.push(r[1] ?? r[2] ?? r[3] ?? ""), r = n.exec(e);
	return t;
}
function bn(e, t) {
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
function xn(e) {
	return e.endsWith("/") ? `${Q.bold}${Q.blue}${e.slice(0, -1)}${Q.reset}` : e;
}
var Sn = class extends EventTarget {
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
		this.shellId = new URLSearchParams(t < 0 ? "" : e.slice(t + 1)).get("shell") ?? "mock-shell", this.session = _n.get(this.shellId) ?? {
			cwd: Z,
			attached: !1
		}, _n.set(this.shellId, this.session), this.later(() => this.handshake(), 60);
	}
	send(e) {
		if (this.readyState !== this.OPEN) return;
		let t = Cn(e);
		if (!t || t.length === 0) return;
		let n = t[0];
		if (n === Y.CLOSE) {
			this.exit(0);
			return;
		}
		n === Y.STDIN && this.feed(this.decoder.decode(t.subarray(1)));
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
		this.readyState = this.OPEN, this.frame(Y.STATUS, JSON.stringify({ metadata: {
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
		this.frame(Y.STDOUT, e);
	}
	fail(e) {
		this.frame(Y.STDERR, `${Q.red}${e}${Q.reset}\r\n`);
	}
	prompt() {
		this.write(`${Q.green}${fn}${Q.reset}:${Q.bold}${Q.blue}${this.session.cwd}${Q.reset}$ `);
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
		this.frame(Y.STATUS, JSON.stringify({ details: { causes: [{
			reason: "ExitCode",
			message: String(e)
		}] } })), _n.delete(this.shellId), this.close(1e3, "shell exited");
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
			await this.dispatch(yn(t));
		} finally {
			this.busy = !1, this.readyState === this.OPEN && this.prompt();
		}
	}
	async dispatch(e) {
		let [t, ...n] = e;
		switch (t) {
			case "help":
				this.write(`${gn.join("\r\n")}\r\n`);
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
		let t = bn(this.session.cwd, e.find((e) => !e.startsWith("-")) ?? "."), n = pn[t];
		if (!n) {
			if (mn[t] !== void 0) {
				this.write(`${t}\r\n`);
				return;
			}
			this.fail(`ls: cannot access '${t}': No such file or directory`);
			return;
		}
		let r = e.some((e) => e.startsWith("-") && e.includes("a")) ? n : n.filter((e) => !e.startsWith("."));
		this.write(`${r.map(xn).join("  ")}\r\n`);
	}
	chdir(e) {
		let t = bn(this.session.cwd, e[0] ?? "~");
		if (!pn[t]) {
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
			let e = bn(this.session.cwd, t), n = mn[e];
			if (n === void 0) {
				this.fail(pn[e] ? `cat: ${t}: Is a directory` : `cat: ${t}: No such file or directory`);
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
		for (let [e, t] of hn) {
			if (await this.wait(520), this.cancelled || this.readyState !== this.OPEN) return;
			this.write(`  ${Q.cyan}⏺${Q.reset} ${Q.bold}${e}${Q.reset}(${t})\r\n`);
		}
		await this.wait(420), !(this.cancelled || this.readyState !== this.OPEN) && this.write(`${Q.green}✓${Q.reset} done · ${hn.length + 1} turns · 6.4s · ${Q.yellow}$0.0184${Q.reset}\r\n`);
	}
};
function Cn(e) {
	return ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : e instanceof ArrayBuffer ? new Uint8Array(e) : null;
}
var wn = null;
function Tn(e = {}) {
	let t = e.scheme ?? "mock-shell:", n = globalThis.WebSocket;
	if (typeof n != "function") return () => {};
	if (wn) wn.count += 1;
	else {
		class e extends n {
			constructor(e, n) {
				let r = typeof e == "string" ? e : e.href;
				if (r.startsWith(t)) return new Sn(r);
				super(e, n);
			}
		}
		globalThis.WebSocket = e, wn = {
			native: n,
			count: 1
		};
	}
	let r = !1;
	return () => {
		r || !wn || (r = !0, --wn.count, !(wn.count > 0) && (globalThis.WebSocket = wn.native, wn = null, _n.clear()));
	};
}
//#endregion
//#region src/components/compute/fixtures/mockTail.ts
var En = "mock-tail:", Dn = (e) => ({
	type: "assistant",
	message: { content: [{
		type: "text",
		text: e
	}] }
}), On = (e, t) => ({
	type: "assistant",
	message: { content: [{
		type: "tool_use",
		name: e,
		input: t
	}] }
}), kn = [
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
				data: Dn("Reading the lockfile and resolving the dependency graph.")
			},
			{
				afterMs: 1300,
				data: On("Bash", { command: "npm audit --json" })
			},
			{
				afterMs: 2100,
				data: Dn("3 advisories: 1 high, 2 moderate. Checking whether the high one is reachable.")
			},
			{
				afterMs: 1700,
				data: On("Grep", { pattern: "serialize-javascript" })
			},
			{
				afterMs: 2400,
				data: Dn("Reachable from the report renderer only. Bumping it and pinning the transitive.")
			},
			{
				afterMs: 1400,
				data: On("Edit", { file: "package.json" })
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
				data: Dn("Pulling the last 40 CI runs.")
			},
			{
				afterMs: 1500,
				data: On("Bash", { command: "gh run list --limit 40" })
			},
			{
				afterMs: 2300,
				data: Dn("Two suites flap: session-epoch and the canary rollup. Both look time-dependent.")
			},
			{
				afterMs: 1900,
				data: On("Read", { file: "src/lib/__tests__/session-epoch.test.ts" })
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
				data: Dn("Dumping the live schema.")
			},
			{
				afterMs: 1600,
				data: On("Bash", { command: "psql -c \"\\d+ public.*\"" })
			},
			{
				afterMs: 2400,
				data: Dn("One table differs: environments has a column the checked-in DDL does not.")
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
function An(e, t) {
	return `${En}//${e}${t ? `?script=${encodeURIComponent(t)}` : ""}`;
}
function jn(e) {
	let t = /script=([^&]+)/.exec(e)?.[1];
	if (t) {
		let e = kn.find((e) => e.id === decodeURIComponent(t));
		if (e) return e;
	}
	let n = e.slice(10).replace(/^\/+/, "").split("?")[0] ?? "", r = 0;
	for (let e of n) r = r * 31 + e.charCodeAt(0) >>> 0;
	return kn[r % kn.length];
}
var Mn = class {
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
		let n = jn(e), r = 0;
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
function Nn(e = {}) {
	let t = e.scheme ?? "mock-tail:", n = globalThis.EventSource;
	if ($) $.count += 1;
	else {
		$ = {
			native: n,
			count: 1
		};
		let e = function(e, r) {
			if (typeof e == "string" && e.startsWith(t)) return new Mn(e, r);
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
export { ke as COMPUTE_STATUS, j as COMPUTE_STORAGE_KEYS, nn as ComputeDock, Ye as ComputeProvider, Ht as ComputerLab, Ot as DEFAULT_IDLE_WINDOW_MS, bt as DEFAULT_KEYMAP, Ke as DEFAULT_PANE_KINDS, Ne as DETACH_BYTE, O as DOCK_STORAGE_KEY, k as FLEET_STORAGE_KEY, Pe as HEARTBEAT_MS, A as LAB_LAYOUT_STORAGE_KEY, Rt as LabChooser, Ft as LabRail, Me as MAX_FRAME_BYTES, $e as MAX_RATIO, Fe as MAX_RETRIES, B as MAX_SHELLS, Qe as MIN_RATIO, dn as MOCK_SHELL_SCHEME, En as MOCK_TAIL_SCHEME, kn as MOCK_TAIL_SCRIPTS, Zt as MachinePresenceMenu, jt as PaneStatusLine, zt as PaneTreeView, Nt as ProjectSummary, Y as SHELL_CHANNEL, We as SHELL_PANE_KIND, Ae as SHELL_STATUS, Ue as ShellTerminal, Ge as TAIL_PANE_KIND, yt as TMUX_LEADER, Oe as TailPane, F as UNASSIGNED_PROJECT_ID, on as WORKSPACE_ENTRY_CAP, rn as WORKSPACE_FIND_COMMAND, an as WORKSPACE_GIT_COMMAND, sn as buildWorkspaceTree, ee as clearComputeStorage, Re as closeAdvice, it as closePane, oe as closeShell, ln as countDescendants, nt as countPanes, D as createComputeClient, pe as cycleLayout, lt as cyclePane, le as cycleShell, ut as enclosingSplit, Ie as encodeFrame, Le as encodeResize, ze as exhaustedAdvice, Be as exitCodeOf, je as expiryPressure, tt as findLeaf, ge as fixtureComputers, ye as fixtureMachines, ve as fixtureModels, _e as fixtureRuntimeStatus, be as fixtureWorkspace, se as focusShell, R as formatTokens, Lt as fuzzyScore, G as getDock, wt as groupBindings, Tn as installMockShellSocket, Nn as installMockTailSource, xt as isLeaderKey, Tt as labelFor, st as layoutRects, X as listLeaves, et as makeLeaf, Ct as matchBinding, St as matchLeaderBinding, qt as memorySummary, vn as mockShellUrl, An as mockTailUrl, ct as neighborPane, _t as nextKind, ae as openShell, Jt as providerSummary, vt as quotaUsage, dt as ratioOf, ie as reconcileDock, ce as reportShellStatus, gt as resolveKind, L as rollUpProjects, ue as selectShellByIndex, fe as setDockVisible, he as setGeometry, de as setMode, at as setRatio, kt as shortModelName, me as showsAllPanes, rt as splitPane, J as statusOf, re as subscribeDock, xe as summarizeTool, K as toggleFloating, ot as updateLeaf, Xe as useCompute, P as useComputeFleet, Ze as useComputeOptional, I as useComputeProjects, we as useComputeTail, Se as useComputeTask, ht as useLabLayout, z as useProjectRollups, un as visibleRows };
