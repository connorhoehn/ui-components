import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./Chip-0zFpfJ52.js";
import { t as n } from "./RisingParticles-BBIjT11W.js";
import { i as r, r as i } from "./useComputeProjects-ZSazDRet.js";
import { a, s as o } from "./PaneStatusLine-Duj-X9IP.js";
import { createContext as s, forwardRef as c, useCallback as l, useContext as u, useEffect as d, useImperativeHandle as f, useLayoutEffect as p, useMemo as m, useRef as h, useState as g } from "react";
import { Fragment as _, jsx as v, jsxs as y } from "react/jsx-runtime";
import { Terminal as b } from "@xterm/xterm";
import { FitAddon as x } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
//#region src/components/compute/lib/computeClient.ts
async function S(e) {
	let t = `HTTP ${e.status}`;
	try {
		let n = await e.json();
		t = n.error ?? n.message ?? t;
	} catch {}
	return Error(t);
}
function C(e = {}) {
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
		if (!o.ok) throw await S(o);
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
		if (!o.ok) throw await S(o);
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
		if (!c.ok) throw await S(c);
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
var w = "ui-components.computeDock.v1", T = "ui-components.computeFleet.v1", E = "ui-components.computerLab.v1", D = [
	w,
	T,
	E
];
function O() {
	for (let e of D) try {
		globalThis.localStorage?.removeItem(e);
	} catch {}
}
//#endregion
//#region src/components/compute/hooks/useComputeFleet.ts
function k() {
	try {
		let e = globalThis.localStorage?.getItem(T);
		return e ? JSON.parse(e) : [];
	} catch {
		return [];
	}
}
function A(e) {
	try {
		globalThis.localStorage?.setItem(T, JSON.stringify(e));
	} catch {}
}
function j({ client: e, pollIntervalMs: t = 5e3, computers: n, fixtures: r, enabled: i = !0, readopt: a = !0 }) {
	let [o, s] = g(() => n ?? (k().length > 0 ? k() : r ?? [])), [c, u] = g(n ? "provided" : k().length > 0 ? "remote" : r?.length ? "fixture" : "remote"), [f, p] = g(!n), [m, _] = g(null), v = h(0), y = h(!1), b = l(async () => {
		if (n || !i) return;
		let t = ++v.current, r = () => v.current === t;
		try {
			let t = await e.listComputers();
			if (a && t.length === 0) {
				let n = k();
				n.length > 0 && (await Promise.all(n.map((t) => e.adoptComputer({
					sessionId: t.sessionId,
					label: t.label,
					createdAt: t.createdAt
				}).catch(() => {}))), t = await e.listComputers());
			}
			if (!r()) return;
			s(t), u("remote"), _(null), A(t);
		} catch (e) {
			r() && _(e instanceof Error ? e.message : "Failed to list computers");
		} finally {
			r() && (y.current = !0, p(!1));
		}
	}, [
		e,
		n,
		a,
		i
	]);
	return d(() => {
		if (n) {
			s(n), u("provided"), p(!1);
			return;
		}
		if (!i) {
			p(!1);
			return;
		}
		if (b(), t <= 0) return;
		let e = setInterval(() => void b(), t);
		return () => {
			clearInterval(e), v.current += 1;
		};
	}, [
		b,
		t,
		n,
		i
	]), {
		computers: o,
		source: c,
		isLoading: f,
		error: m,
		refresh: b,
		create: l(async (t) => {
			let n = await e.createComputer(t);
			return A([...k().filter((e) => e.id !== n.id), n]), await b(), n;
		}, [e, b]),
		rename: l(async (t, n) => {
			await e.renameComputer(t, n), await b();
		}, [e, b]),
		remove: l(async (t) => {
			await e.removeComputer(t), A(k().filter((e) => e.id !== t)), await b();
		}, [e, b]),
		stop: l(async (t) => {
			await e.stopSession(t), await b();
		}, [e, b])
	};
}
//#endregion
//#region src/components/compute/lib/dockStore.ts
var M = 8, N = {
	x: 120,
	y: 120,
	width: 860,
	height: 480,
	dockHeight: 360
};
function ee() {
	let e = {
		mode: "hidden",
		shells: [],
		activeId: null,
		geometry: N
	};
	try {
		let t = globalThis.localStorage?.getItem(w);
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
				...N,
				...n.geometry ?? {}
			}
		};
	} catch {
		return e;
	}
}
var P = ee(), F = /* @__PURE__ */ new Set();
function I() {
	try {
		globalThis.localStorage?.setItem(w, JSON.stringify({
			shells: P.shells,
			activeId: P.activeId,
			geometry: P.geometry
		}));
	} catch {}
	for (let e of F) e();
}
function L(e) {
	P = {
		...P,
		...e
	}, I();
}
function R(e) {
	return F.add(e), () => {
		F.delete(e);
	};
}
function z() {
	return P;
}
function B(e) {
	let t = new Set(e), n = P.shells.filter((e) => t.has(e.sessionId));
	n.length !== P.shells.length && L({
		shells: n,
		activeId: n.some((e) => e.id === P.activeId) ? P.activeId : n[n.length - 1]?.id ?? null,
		mode: n.length === 0 ? "hidden" : P.mode
	});
}
function V(e) {
	let t = P.shells.find((t) => t.sessionId === e.sessionId);
	if (t) return L({
		activeId: t.id,
		mode: P.mode === "hidden" ? "docked" : P.mode,
		...e.cwd && e.cwd !== t.cwd ? { shells: P.shells.map((n) => n.id === t.id ? {
			...n,
			cwd: e.cwd
		} : n) } : {}
	}), {
		ok: !0,
		id: t.id
	};
	if (P.shells.length >= 8) return L({ mode: P.mode === "hidden" ? "docked" : P.mode }), {
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
	return L({
		shells: [...P.shells, n],
		activeId: n.id,
		mode: P.mode === "hidden" ? "docked" : P.mode
	}), {
		ok: !0,
		id: n.id
	};
}
function H(e) {
	let t = P.shells.filter((t) => t.id !== e);
	L({
		shells: t,
		activeId: P.activeId === e ? t[t.length - 1]?.id ?? null : P.activeId,
		mode: t.length === 0 ? "hidden" : P.mode
	});
}
function U(e) {
	L({
		activeId: e,
		shells: P.shells.map((t) => t.id === e ? {
			...t,
			unread: !1
		} : t)
	});
}
function W(e, t, n = !1) {
	let r = !1, i = P.shells.map((i) => {
		if (i.id !== e) return i;
		let a = n && P.activeId !== e ? !0 : i.unread;
		return i.status === t && i.unread === a ? i : (r = !0, {
			...i,
			status: t,
			unread: a
		});
	});
	r && L({ shells: i });
}
function G(e) {
	if (P.shells.length < 2) return;
	let t = P.shells.findIndex((e) => e.id === P.activeId), n = P.shells[(t + e + P.shells.length) % P.shells.length];
	n && U(n.id);
}
function K(e) {
	let t = P.shells[e];
	t && U(t.id);
}
function q(e) {
	L({ mode: e });
}
function te(e) {
	L({ mode: e ? P.mode === "hidden" ? "docked" : P.mode : "hidden" });
}
function ne() {
	L({ mode: P.mode === "floating" ? "docked" : "floating" });
}
function re() {
	let e = [
		"docked",
		"grid",
		"stack",
		"floating"
	];
	L({ mode: e[(e.indexOf(P.mode) + 1) % e.length] ?? "docked" });
}
function ie(e) {
	return e === "grid" || e === "stack";
}
function ae(e) {
	L({ geometry: {
		...P.geometry,
		...e
	} });
}
//#endregion
//#region src/components/compute/fixtures/computeFixture.ts
var J = (e) => `demo-session-${e}-0000000000000000`.slice(0, 40), oe = [
	{
		id: "demo-1",
		label: "demo-alpha",
		sessionId: J("alpha"),
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
		sessionId: J("bravo"),
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
		sessionId: J("charlie"),
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
		sessionId: J("delta"),
		createdAt: "2026-08-25T18:20:00.000Z",
		status: "stopped"
	}
], se = {
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
}, ce = [
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
], le = [{
	id: "demo-machine-1",
	label: "demo-macbook",
	status: "connected",
	platform: "darwin/arm64",
	sessions: [{
		id: J("local-a"),
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
		id: J("local-b"),
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
		id: J("local-c"),
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
}], ue = {
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
function Y(e, t) {
	let n = (...e) => {
		for (let n of e) {
			let e = t[n];
			if (typeof e == "string" && e.length > 0) return e;
		}
		return null;
	}, r = (n("file_path", "path", "notebook_path", "command", "pattern", "url", "query", "prompt") ?? n("description") ?? "").replace(/\s+/g, " ").trim();
	return r ? r.length > 96 ? `${r.slice(0, 95)}…` : r : e;
}
function de({ client: e, maxSteps: t = 400, onEvent: n }) {
	let [r, i] = g([]), [a, o] = g(!1), [s, c] = g(0), [u, d] = g(null), [f, p] = g(null), m = h(null), _ = h(n);
	_.current = n;
	let v = l((e) => {
		i((n) => {
			let r = [...n, {
				...e,
				at: Date.now()
			}];
			return r.length > t ? r.slice(r.length - t) : r;
		});
	}, [t]), y = l(() => {
		i([]), d(null), p(null), c(0);
	}, []), b = l(() => {
		m.current?.abort(), m.current = null, o(!1);
	}, []);
	return {
		steps: r,
		isRunning: a,
		toolCount: s,
		result: u,
		error: f,
		run: l(async (t, n) => {
			if (m.current) return;
			let r = new AbortController();
			m.current = r, o(!0), p(null), d(null), c(0), v({
				kind: "meta",
				text: n.prompt
			});
			let i = null;
			try {
				await e.runTask(t, n, (e) => {
					_.current?.(e);
					let t = e.type;
					if (t === "assistant") {
						let t = e.message?.content ?? [];
						for (let e of t) if (e.type === "tool_use") {
							let t = String(e.name ?? "tool");
							v({
								kind: "tool",
								tool: t,
								text: Y(t, e.input ?? {})
							}), c((e) => e + 1);
						} else if (e.type === "text") {
							let t = String(e.text ?? "").trim();
							t && v({
								kind: "text",
								text: t
							});
						}
						return;
					}
					if (t === "devbox_start") {
						let t = e.model;
						typeof t == "string" && t && v({
							kind: "meta",
							text: `model: ${t}`
						});
						return;
					}
					if (t === "devbox_raw") {
						let t = String(e.text ?? "").trim();
						t && v({
							kind: "text",
							text: t
						});
						return;
					}
					if (t === "devbox_error") {
						let t = String(e.error ?? "the box reported an error");
						i = t, v({
							kind: "error",
							text: t
						});
						return;
					}
					if (t === "devbox_end") {
						let t = e.timed_out === !0, n = Number(e.exit_code ?? 0), r = String(e.stderr ?? "").trim();
						t ? (i = "timed out — the container killed the run", v({
							kind: "error",
							text: i
						})) : n !== 0 && (i = `exited ${n}`, v({
							kind: "error",
							text: i
						})), r && (t || n !== 0) && v({
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
						d(t), v({
							kind: "result",
							text: `${t.turns} turns · ${(t.durationMs / 1e3).toFixed(0)}s · $${t.costUsd.toFixed(4)}`,
							result: t
						});
					}
				}, r.signal), i && p(i);
			} catch (e) {
				if (r.signal.aborted) return;
				let t = e instanceof Error ? e.message : "Task failed";
				p(t), v({
					kind: "error",
					text: t
				});
			} finally {
				m.current === r && (m.current = null), o(!1);
			}
		}, [e, v]),
		cancel: b,
		clear: y,
		push: v
	};
}
//#endregion
//#region src/components/compute/hooks/useComputeTail.ts
function fe(e) {
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
				text: Y(t, e.input ?? {})
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
function pe({ client: e, boxId: t, maxSteps: n = 300, enabled: r = !0 }) {
	let [i, a] = g([]), [o, s] = g(!1), [c, l] = g(!1), [u, f] = g(null), [p, m] = g(null), _ = h(n);
	return _.current = n, d(() => {
		if (!r || !t) {
			s(!1);
			return;
		}
		a([]), f(null), m(null), l(!1);
		let n = e.tail(t);
		if (typeof EventSource != "function") {
			m("live tail unavailable in this environment");
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
			let n = fe(t);
			n.steps.length > 0 && a((e) => {
				let t = [...e, ...n.steps.map((e) => ({
					...e,
					at: Date.now()
				}))];
				return t.length > _.current ? t.slice(t.length - _.current) : t;
			}), n.running !== void 0 && l(n.running), n.result && f(n.result), n.error && m(n.error);
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
		error: p
	};
}
//#endregion
//#region src/components/compute/components/TailPane.tsx
var X = {
	meta: "text-code-blue",
	text: "text-code-subtle",
	tool: "text-code-green",
	result: "text-code-mauve",
	error: "text-code-red",
	job: "text-code-blue",
	job_end: "text-code-green"
}, me = {
	meta: "›",
	text: "·",
	tool: "⚙",
	result: "✓",
	error: "✗",
	job: "▶",
	job_end: "✓"
}, he = 200;
function ge(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n += 1) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
	return t >>> 0;
}
function _e({ computer: r, registerPane: i, className: a }) {
	let { client: s } = $(), c = pe({
		client: s,
		boxId: r.id
	}), l = h(null), u = h(!0), f = h(0), [m, _] = g(!0), [b, x] = g(0);
	function S() {
		let e = l.current;
		e && (e.scrollTop = e.scrollHeight), u.current = !0, _(!0), x(0);
	}
	d(() => {
		if (i) return i({ focus: () => l.current?.focus() }), () => i(null);
	}, [i]), p(() => {
		let e = l.current, t = c.steps.length - f.current;
		f.current = c.steps.length, e && (u.current ? (e.scrollTop = e.scrollHeight, b !== 0 && x(0)) : t > 0 && x((e) => e + t));
	}, [c.steps]);
	let C = Math.max(0, c.steps.length - he), w = C > 0 ? c.steps.slice(-200) : c.steps, T = o(r) === "running";
	return /* @__PURE__ */ y(n, {
		active: T,
		intensity: "low",
		seed: ge(r.id),
		className: e("flex flex-col h-full min-h-0 bg-code-bg", a),
		"data-testid": "tail-pane-particles",
		children: [/* @__PURE__ */ y("div", {
			className: "shrink-0 flex items-center gap-2 px-2 py-1 border-b border-code-border",
			children: [
				/* @__PURE__ */ v(t, {
					size: "xs",
					mono: !0,
					tone: c.connected ? "success" : "neutral",
					dot: "static",
					children: c.connected ? "tailing" : "not connected"
				}),
				c.running && /* @__PURE__ */ v(t, {
					size: "xs",
					mono: !0,
					tone: "info",
					dot: "pulse",
					children: "running"
				}),
				/* @__PURE__ */ v("span", { className: "flex-1" }),
				/* @__PURE__ */ v("span", {
					className: "text-[10px] font-mono text-code-raised",
					children: "read-only"
				})
			]
		}), /* @__PURE__ */ y("div", {
			className: "relative flex-1 min-h-0",
			children: [/* @__PURE__ */ y("div", {
				ref: l,
				onScroll: (e) => {
					let t = e.currentTarget, n = t.scrollHeight - t.scrollTop - t.clientHeight < 32;
					u.current = n, _(n);
				},
				onKeyDown: (e) => {
					e.key === "End" && (e.preventDefault(), S());
				},
				tabIndex: 0,
				role: "log",
				"aria-label": `Activity on ${r.label}`,
				"data-testid": "tail-pane-log",
				className: "h-full overflow-y-auto px-2 py-1.5 font-mono text-[11px] leading-[1.5] flex flex-col gap-0.5 outline-none focus-visible:ring-1 focus-visible:ring-code-blue focus-visible:ring-inset",
				children: [
					C > 0 && /* @__PURE__ */ y("div", {
						"data-testid": "tail-pane-trimmed",
						className: "text-center text-code-raised py-0.5",
						children: [
							"· earlier steps trimmed (",
							C,
							") ·"
						]
					}),
					c.error && /* @__PURE__ */ v("div", {
						className: "text-code-red",
						children: c.error
					}),
					c.steps.length === 0 && !c.error ? /* @__PURE__ */ v("div", {
						className: "text-code-raised",
						children: r.currentTask ? `waiting for output · ${r.currentTask}` : "nothing running on this box — open a terminal pane to start something"
					}) : w.map((n, r) => {
						if (n.kind === "job") return /* @__PURE__ */ y("div", {
							"data-testid": "tail-banner-job",
							className: "my-0.5 flex items-center gap-2 rounded border border-code-blue/40 bg-code-blue/10 px-2 py-1",
							children: [
								/* @__PURE__ */ v("span", {
									"aria-hidden": "true",
									className: "text-code-blue",
									children: "▶"
								}),
								/* @__PURE__ */ v("span", {
									className: "font-semibold text-code-blue break-words min-w-0",
									children: n.text
								}),
								n.jobKind && /* @__PURE__ */ v("span", {
									className: "ml-auto shrink-0 text-code-comment",
									children: n.jobKind
								})
							]
						}, r);
						if (n.kind === "job_end") {
							let t = n.jobOk !== !1;
							return /* @__PURE__ */ y("div", {
								"data-testid": "tail-banner-job-end",
								"data-ok": t,
								className: e("my-0.5 flex items-center gap-2 rounded border px-2 py-1 font-semibold", t ? "border-code-green/40 bg-code-green/10 text-code-green" : "border-code-red/40 bg-code-red/10 text-code-red"),
								children: [/* @__PURE__ */ v("span", {
									"aria-hidden": "true",
									children: t ? "✓" : "✗"
								}), /* @__PURE__ */ v("span", { children: n.text })]
							}, r);
						}
						if (n.kind === "error") return /* @__PURE__ */ y("div", {
							"data-testid": "tail-banner-error",
							className: "my-0.5 flex items-start gap-2 rounded border border-code-red/50 bg-code-red/15 px-2 py-1",
							children: [/* @__PURE__ */ v("span", {
								"aria-hidden": "true",
								className: "shrink-0 text-code-red",
								children: "✗"
							}), /* @__PURE__ */ v("span", {
								className: "min-w-0 break-words font-semibold text-code-red",
								children: n.text
							})]
						}, r);
						if (n.kind === "result" && n.result) {
							let { turns: i, durationMs: a, costUsd: o } = n.result;
							return /* @__PURE__ */ y("div", {
								"data-testid": "tail-result-chips",
								className: "my-0.5 flex flex-wrap items-center gap-1.5",
								children: [
									/* @__PURE__ */ v("span", {
										"aria-hidden": "true",
										className: e("shrink-0 w-3", X.result),
										children: me.result
									}),
									/* @__PURE__ */ y(t, {
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
									/* @__PURE__ */ y(t, {
										size: "xs",
										mono: !0,
										palette: "code",
										tone: "neutral",
										className: "tabular-nums",
										children: [(a / 1e3).toFixed(0), "s"]
									}),
									/* @__PURE__ */ y(t, {
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
						return /* @__PURE__ */ y("div", {
							className: "flex gap-1.5 min-w-0",
							children: [
								/* @__PURE__ */ v("span", {
									"aria-hidden": "true",
									className: e("shrink-0 w-3", X[n.kind]),
									children: me[n.kind]
								}),
								n.tool && /* @__PURE__ */ v("span", {
									className: "shrink-0 text-code-comment",
									children: n.tool
								}),
								/* @__PURE__ */ v("span", {
									className: e("min-w-0 break-words", X[n.kind]),
									children: n.text
								})
							]
						}, r);
					})
				]
			}), m ? /* @__PURE__ */ v("div", {
				"aria-hidden": "true",
				"data-testid": "tail-pane-following",
				className: "pointer-events-none absolute bottom-1.5 right-2 text-[10px] font-mono text-code-raised",
				children: "following"
			}) : b > 0 ? /* @__PURE__ */ y("button", {
				type: "button",
				"data-testid": "tail-pane-jump",
				onClick: S,
				className: "absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-full border border-code-blue/40 bg-code-blue/20 px-2.5 py-1 text-[10px] font-mono text-code-blue shadow-sm hover:bg-code-blue/30",
				children: [b, " new ↓"]
			}) : null]
		})]
	});
}
//#endregion
//#region src/components/compute/lib/shellProtocol.ts
var Z = {
	STDIN: 0,
	STDOUT: 1,
	STDERR: 2,
	STATUS: 3,
	RESIZE: 4,
	HEARTBEAT: 5,
	CLOSE: 255
}, ve = 65536, ye = 29, be = 3e4, xe = 5;
function Q(e, t) {
	let n = t ?? /* @__PURE__ */ new Uint8Array(), r = new Uint8Array(n.length + 1);
	return r[0] = e, r.set(n, 1), r;
}
function Se(e, t) {
	return Q(Z.RESIZE, new TextEncoder().encode(JSON.stringify({
		width: e,
		height: t
	})));
}
function Ce(e) {
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
function we(e, t) {
	return e === 1006 && t >= 5 ? "could not connect — the runtime may already hold 10 shells; close one and retry" : null;
}
function Te(e) {
	let t = (e.details?.causes ?? []).find((e) => e.reason === "ExitCode")?.message;
	if (t == null) return null;
	let n = Number.parseInt(t, 10);
	return Number.isNaN(n) ? null : n;
}
//#endregion
//#region src/components/compute/components/ShellTerminal.tsx
function Ee(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n += 1) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
	return t >>> 0;
}
function De(e) {
	e && (e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close());
}
function Oe(e, t) {
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
var ke = c(function({ sessionId: t, shellId: r, label: i, cwd: s, onExit: c, height: u = 460, chrome: p = !0, fillHeight: m = !1, autoConnect: S = !1, onStatus: C, background: w, className: T }, E) {
	let { client: D, computers: O } = $(), k = h(null);
	d(() => {
		let e = () => A.current, t = () => {
			let t = e();
			t && (t.options.theme = Oe(w, k.current));
		}, n = typeof MutationObserver == "function" ? new MutationObserver(t) : null;
		n?.observe(document.documentElement, {
			attributes: !0,
			attributeFilter: ["data-theme", "class"]
		});
		let r = typeof globalThis.matchMedia == "function" ? globalThis.matchMedia("(prefers-color-scheme: dark)") : null;
		return r?.addEventListener?.("change", t), () => {
			n?.disconnect(), r?.removeEventListener?.("change", t);
		};
	}, [w]);
	let A = h(null), j = h(null), M = h(null), N = h(r), ee = h(c);
	ee.current = c;
	let P = h(C);
	P.current = C;
	let F = h(null), I = h(0), L = h(!1), R = h(null), z = h(!1), [B, V] = g("idle"), [H, U] = g(""), W = l(async () => {
		let e = A.current;
		if (!e || z.current) return;
		R.current &&= (clearTimeout(R.current), null), V("connecting"), U(""), P.current?.("connecting");
		let n;
		try {
			let e = await D.getShellUrl(t, N.current);
			n = e.url, e.shellId && (N.current = e.shellId);
		} catch (e) {
			V("error"), U(e instanceof Error ? e.message : "could not mint a shell URL"), P.current?.("error");
			return;
		}
		if (z.current) return;
		De(M.current), M.current = null;
		let r = new WebSocket(n);
		r.binaryType = "arraybuffer", M.current = r, r.onopen = () => {
			I.current = 0, L.current = !1, V("live"), P.current?.("ready");
			let t = j.current;
			t && (t.fit(), r.send(Se(e.cols, e.rows))), s && r.send(Q(Z.STDIN, new TextEncoder().encode(`cd ${s} 2>/dev/null || true\n`))), e.focus();
		}, r.onmessage = (t) => {
			let n = new Uint8Array(t.data);
			if (n.length === 0) return;
			let i = n[0], a = n.subarray(1);
			if (i === Z.STDOUT || i === Z.STDERR) {
				e.write(a), P.current?.("busy", !0), F.current && clearTimeout(F.current), F.current = setTimeout(() => P.current?.("ready"), 700);
				return;
			}
			if (i === Z.STATUS) {
				try {
					let e = JSON.parse(new TextDecoder().decode(a));
					if (e.metadata?.shellId) {
						N.current = e.metadata.shellId;
						let t = e.metadata.bytesDropped;
						U(e.metadata.reconnected ? `reattached${t ? ` · ${t} bytes lost while away` : ""}` : "new shell");
						return;
					}
					ee.current?.(Te(e));
				} catch {}
				return;
			}
			i === Z.CLOSE && r.close();
		}, r.onclose = (e) => {
			if (M.current = null, L.current) {
				V("detached"), U("detached — shell still running"), P.current?.("detached");
				return;
			}
			let t = Ce(e.code);
			if (U(t.text), t.retry && I.current < 5 && !z.current) {
				I.current += 1, V("connecting"), R.current = setTimeout(() => void W(), Math.min(500 * 2 ** I.current, 8e3));
				return;
			}
			V(e.code === 1e3 ? "closed" : "error"), P.current?.(e.code === 1e3 ? "detached" : "error");
			let n = we(e.code, I.current);
			n && U(n);
		}, r.onerror = () => {};
	}, [
		D,
		t,
		s
	]);
	d(() => {
		if (!k.current) return;
		z.current = !1;
		let e = new b({
			convertEol: !1,
			cursorBlink: !0,
			fontSize: 12.5,
			fontFamily: "\"Fira Code\", ui-monospace, SFMono-Regular, Menlo, monospace",
			theme: Oe(w, k.current),
			scrollback: 5e3
		}), t = new x();
		e.loadAddon(t), e.open(k.current), t.fit(), A.current = e, j.current = t;
		let n = e.onData((t) => {
			let n = M.current;
			if (!n || n.readyState !== WebSocket.OPEN) return;
			let r = new TextEncoder().encode(t);
			if (r.length === 1 && r[0] === 29) {
				L.current = !0, n.close();
				return;
			}
			if (r.length > 65536) {
				e.write("\r\n\x1B[33m[paste too large — split into chunks under 64 KB]\x1B[0m\r\n");
				return;
			}
			n.send(Q(Z.STDIN, r));
		}), r = e.onResize(({ cols: e, rows: t }) => {
			let n = M.current;
			n?.readyState === WebSocket.OPEN && n.send(Se(e, t));
		}), i = () => t.fit();
		globalThis.addEventListener("resize", i);
		let a = typeof ResizeObserver == "function" ? new ResizeObserver(() => t.fit()) : null;
		a && k.current && a.observe(k.current);
		let o = setInterval(() => {
			let e = M.current;
			e?.readyState === WebSocket.OPEN && e.send(Q(Z.HEARTBEAT));
		}, be);
		return () => {
			z.current = !0, R.current && clearTimeout(R.current), F.current && clearTimeout(F.current), clearInterval(o), globalThis.removeEventListener("resize", i), a?.disconnect(), n.dispose(), r.dispose(), De(M.current), M.current = null, e.dispose(), A.current = null;
		};
	}, []), d(() => {
		S && B === "idle" && W();
	}, [
		S,
		B,
		W
	]);
	let G = l(() => {
		L.current = !0, M.current?.close();
	}, []), K = l(() => {
		let e = M.current;
		e?.readyState === WebSocket.OPEN && e.send(Q(Z.CLOSE));
	}, []);
	f(E, () => ({
		send: (e) => {
			let t = M.current;
			if (!t || t.readyState !== WebSocket.OPEN) return !1;
			let n = new TextEncoder().encode(e);
			return n.length > 65536 ? !1 : (t.send(Q(Z.STDIN, n)), !0);
		},
		detach: G,
		kill: K,
		focus: () => A.current?.focus(),
		refit: () => j.current?.fit(),
		connect: () => void W()
	}), [
		W,
		G,
		K
	]);
	let q = B === "live", te = o(O.find((e) => e.sessionId === t)) === "running" && !!O.find((e) => e.sessionId === t), ne = a[q ? "ready" : B === "error" ? "error" : B === "detached" || B === "closed" ? "detached" : "connecting"];
	return /* @__PURE__ */ y("div", {
		style: w ? { background: w } : void 0,
		className: e("flex flex-col", w ? "" : "bg-terminal-bg", m ? "h-full min-h-0" : "rounded-lg overflow-hidden border border-code-border", T),
		children: [
			p && /* @__PURE__ */ y(n, {
				active: te,
				intensity: "low",
				seed: Ee(t),
				className: "flex items-center gap-2 px-3 py-2 border-b border-code-border shrink-0",
				"data-testid": "shell-terminal-particles",
				children: [
					/* @__PURE__ */ v("span", {
						className: "text-[11px] font-semibold text-code-text",
						children: i ?? "terminal"
					}),
					/* @__PURE__ */ y("span", {
						className: e("text-[10px]", q ? "text-code-green" : B === "error" ? "text-code-red" : "text-code-muted"),
						title: ne.help,
						children: [B, H ? ` · ${H}` : ""]
					}),
					/* @__PURE__ */ v("span", { className: "flex-1" }),
					N.current && /* @__PURE__ */ v("span", {
						className: "text-[9.5px] text-code-muted font-mono hidden md:inline",
						children: N.current
					}),
					q ? /* @__PURE__ */ y(_, { children: [/* @__PURE__ */ v("button", {
						type: "button",
						onClick: G,
						title: "Leave the shell running (Ctrl-])",
						className: "text-[10px] px-2 py-0.5 rounded border border-code-border text-code-muted hover:text-code-text cursor-pointer bg-transparent",
						children: "detach"
					}), /* @__PURE__ */ v("button", {
						type: "button",
						onClick: K,
						title: "Kill the shell — it cannot be reattached",
						className: "text-[10px] px-2 py-0.5 rounded border border-code-border text-code-muted hover:text-code-red cursor-pointer bg-transparent",
						children: "kill"
					})] }) : /* @__PURE__ */ v("button", {
						type: "button",
						onClick: () => void W(),
						disabled: B === "connecting",
						className: "text-[10px] px-2 py-0.5 rounded border border-code-border text-code-green hover:bg-code-panel cursor-pointer bg-transparent disabled:cursor-not-allowed disabled:opacity-50",
						children: B === "connecting" ? "connecting" : B === "detached" || B === "closed" ? "reattach" : "connect"
					})
				]
			}),
			!p && B !== "live" && /* @__PURE__ */ y("div", {
				className: "px-3 py-1 text-[10px] border-b border-code-border flex items-center gap-2 shrink-0",
				children: [/* @__PURE__ */ y("span", {
					className: B === "error" ? "text-code-red" : "text-code-subtle",
					children: [B, H ? ` · ${H}` : ""]
				}), B !== "connecting" && /* @__PURE__ */ v("button", {
					type: "button",
					onClick: () => void W(),
					className: "text-code-green bg-transparent border-none cursor-pointer p-0 hover:underline",
					children: B === "idle" ? "connect" : "reattach"
				})]
			}),
			/* @__PURE__ */ v("div", {
				ref: k,
				style: m ? void 0 : { height: u },
				className: e("px-2 py-1", m && "flex-1 min-h-0")
			})
		]
	});
}), Ae = {
	id: "shell",
	label: "shell",
	description: "A real terminal on this computer.",
	quota: "shell",
	inputSuffix: "\n",
	statusMode: "pty",
	render: (e) => /* @__PURE__ */ v(Ne, { ...e })
}, je = {
	id: "tail",
	label: "tail",
	description: "Watch what is running here, including runs started elsewhere. Costs no shell slot.",
	statusMode: "read-only",
	render: ({ computer: e, registerPane: t }) => /* @__PURE__ */ v(_e, {
		computer: e,
		registerPane: t
	})
}, Me = [Ae, je];
function Ne({ computer: e, paneId: t, registerPane: n }) {
	let r = h(null);
	return d(() => (n({
		send: (e) => r.current?.send(e) ?? !1,
		focus: () => r.current?.focus()
	}), () => n(null)), [n]), /* @__PURE__ */ v(ke, {
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
var Pe = s(null);
function Fe({ children: e, client: t, clientOptions: n, computers: a, useFixtures: o = !0, pollIntervalMs: s = 5e3, canManage: c = !1, enabled: l = !0, models: u, projects: f, paneKinds: p = Me, onNotify: h }) {
	let _ = m(() => t ?? C(n), [t, n]), y = j({
		client: _,
		pollIntervalMs: l ? s : 0,
		enabled: l,
		...a ? { computers: a } : {},
		...o ? { fixtures: oe } : {}
	}), b = r({
		client: _,
		enabled: l,
		...f ? { projects: f } : {}
	}), x = m(() => i(b.projects, y.computers), [b.projects, y.computers]), [S, w] = g(null), [T, E] = g(null);
	d(() => {
		if (!l) {
			w(null), E(null);
			return;
		}
		let e = !1;
		return _.getStatus().then((t) => {
			e || (w(t), E(null));
		}).catch((t) => {
			e || (E(t instanceof Error ? t.message : "Runtime status unavailable"), o && w(se));
		}), () => {
			e = !0;
		};
	}, [
		_,
		o,
		l
	]), d(() => {
		y.source === "fixture" || y.isLoading || B(y.computers.map((e) => e.sessionId));
	}, [
		y.computers,
		y.source,
		y.isLoading
	]);
	let D = u ?? ce, O = m(() => {
		let e = S?.allowedModels;
		return !e || e.length === 0 ? D : D.filter((t) => e.includes(t.id));
	}, [D, S?.allowedModels]), k = m(() => ({
		client: _,
		computers: y.computers,
		source: y.source,
		isLoading: y.isLoading,
		error: y.error,
		runtime: S,
		runtimeError: T,
		models: O,
		projects: x,
		projectsAbsent: b.absent,
		canManage: c,
		paneKinds: p,
		refresh: y.refresh,
		create: y.create,
		rename: y.rename,
		remove: y.remove,
		stop: y.stop,
		notify: h ?? (() => {})
	}), [
		_,
		y,
		S,
		T,
		O,
		x,
		b.absent,
		c,
		p,
		h
	]);
	return /* @__PURE__ */ v(Pe.Provider, {
		value: k,
		children: e
	});
}
function $() {
	let e = u(Pe);
	if (!e) throw Error("useCompute must be used within a ComputeProvider");
	return e;
}
function Ie() {
	return u(Pe);
}
//#endregion
export { G as A, ie as B, le as C, M as D, ue as E, W as F, w as G, ne as H, K as I, O as J, T as K, te as L, z as M, V as N, H as O, B as P, ae as R, oe as S, se as T, j as U, R as V, D as W, C as Y, Te as _, Ae as a, Y as b, ye as c, xe as d, Z as f, we as g, Se as h, Me as i, U as j, re as k, be as l, Q as m, $ as n, je as o, Ce as p, E as q, Ie as r, ke as s, Fe as t, ve as u, _e as v, ce as w, de as x, pe as y, q as z };
