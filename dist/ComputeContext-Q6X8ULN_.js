import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Chip-BENLwTlq.js";
import { i as n, r, u as i } from "./useComputeProjects-lxJy0BjK.js";
import { createContext as a, forwardRef as o, useCallback as s, useContext as c, useEffect as l, useImperativeHandle as u, useLayoutEffect as d, useMemo as f, useRef as p, useState as m } from "react";
import { Fragment as h, jsx as g, jsxs as _ } from "react/jsx-runtime";
import { Terminal as v } from "@xterm/xterm";
import { FitAddon as y } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
//#region src/components/compute/lib/computeClient.ts
async function b(e) {
	let t = `HTTP ${e.status}`;
	try {
		let n = await e.json();
		t = n.error ?? n.message ?? t;
	} catch {}
	return Error(t);
}
function x(e = {}) {
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
		if (!o.ok) throw await b(o);
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
		if (!o.ok) throw await b(o);
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
		if (!c.ok) throw await b(c);
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
var S = "ui-components.computeDock.v1", C = "ui-components.computeFleet.v1", w = "ui-components.computerLab.v1", T = [
	S,
	C,
	w
];
function E() {
	for (let e of T) try {
		globalThis.localStorage?.removeItem(e);
	} catch {}
}
//#endregion
//#region src/components/compute/hooks/useComputeFleet.ts
function D() {
	try {
		let e = globalThis.localStorage?.getItem(C);
		return e ? JSON.parse(e) : [];
	} catch {
		return [];
	}
}
function O(e) {
	try {
		globalThis.localStorage?.setItem(C, JSON.stringify(e));
	} catch {}
}
function k({ client: e, pollIntervalMs: t = 5e3, computers: n, fixtures: r, enabled: i = !0, readopt: a = !0 }) {
	let [o, c] = m(() => n ?? (D().length > 0 ? D() : r ?? [])), [u, d] = m(n ? "provided" : D().length > 0 ? "remote" : r?.length ? "fixture" : "remote"), [f, h] = m(!n), [g, _] = m(null), v = p(0), y = p(!1), b = s(async () => {
		if (n || !i) return;
		let t = ++v.current, r = () => v.current === t;
		try {
			let t = await e.listComputers();
			if (a && t.length === 0) {
				let n = D();
				n.length > 0 && (await Promise.all(n.map((t) => e.adoptComputer({
					sessionId: t.sessionId,
					label: t.label,
					createdAt: t.createdAt
				}).catch(() => {}))), t = await e.listComputers());
			}
			if (!r()) return;
			c(t), d("remote"), _(null), O(t);
		} catch (e) {
			r() && _(e instanceof Error ? e.message : "Failed to list computers");
		} finally {
			r() && (y.current = !0, h(!1));
		}
	}, [
		e,
		n,
		a,
		i
	]);
	return l(() => {
		if (n) {
			c(n), d("provided"), h(!1);
			return;
		}
		if (!i) {
			h(!1);
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
		source: u,
		isLoading: f,
		error: g,
		refresh: b,
		create: s(async (t) => {
			let n = await e.createComputer(t);
			return O([...D().filter((e) => e.id !== n.id), n]), await b(), n;
		}, [e, b]),
		rename: s(async (t, n) => {
			await e.renameComputer(t, n), await b();
		}, [e, b]),
		remove: s(async (t) => {
			await e.removeComputer(t), O(D().filter((e) => e.id !== t)), await b();
		}, [e, b]),
		stop: s(async (t) => {
			await e.stopSession(t), await b();
		}, [e, b])
	};
}
//#endregion
//#region src/components/compute/lib/dockStore.ts
var A = 8, j = {
	x: 120,
	y: 120,
	width: 860,
	height: 480,
	dockHeight: 360
};
function M() {
	let e = {
		mode: "hidden",
		shells: [],
		activeId: null,
		geometry: j
	};
	try {
		let t = globalThis.localStorage?.getItem(S);
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
				...j,
				...n.geometry ?? {}
			}
		};
	} catch {
		return e;
	}
}
var N = M(), P = /* @__PURE__ */ new Set();
function F() {
	try {
		globalThis.localStorage?.setItem(S, JSON.stringify({
			shells: N.shells,
			activeId: N.activeId,
			geometry: N.geometry
		}));
	} catch {}
	for (let e of P) e();
}
function I(e) {
	N = {
		...N,
		...e
	}, F();
}
function L(e) {
	return P.add(e), () => {
		P.delete(e);
	};
}
function R() {
	return N;
}
function z(e) {
	let t = new Set(e), n = N.shells.filter((e) => t.has(e.sessionId));
	n.length !== N.shells.length && I({
		shells: n,
		activeId: n.some((e) => e.id === N.activeId) ? N.activeId : n[n.length - 1]?.id ?? null,
		mode: n.length === 0 ? "hidden" : N.mode
	});
}
function B(e) {
	let t = N.shells.find((t) => t.sessionId === e.sessionId);
	if (t) return I({
		activeId: t.id,
		mode: N.mode === "hidden" ? "docked" : N.mode,
		...e.cwd && e.cwd !== t.cwd ? { shells: N.shells.map((n) => n.id === t.id ? {
			...n,
			cwd: e.cwd
		} : n) } : {}
	}), {
		ok: !0,
		id: t.id
	};
	if (N.shells.length >= 8) return I({ mode: N.mode === "hidden" ? "docked" : N.mode }), {
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
	return I({
		shells: [...N.shells, n],
		activeId: n.id,
		mode: N.mode === "hidden" ? "docked" : N.mode
	}), {
		ok: !0,
		id: n.id
	};
}
function V(e) {
	let t = N.shells.filter((t) => t.id !== e);
	I({
		shells: t,
		activeId: N.activeId === e ? t[t.length - 1]?.id ?? null : N.activeId,
		mode: t.length === 0 ? "hidden" : N.mode
	});
}
function H(e) {
	I({
		activeId: e,
		shells: N.shells.map((t) => t.id === e ? {
			...t,
			unread: !1
		} : t)
	});
}
function U(e, t, n = !1) {
	let r = !1, i = N.shells.map((i) => {
		if (i.id !== e) return i;
		let a = n && N.activeId !== e ? !0 : i.unread;
		return i.status === t && i.unread === a ? i : (r = !0, {
			...i,
			status: t,
			unread: a
		});
	});
	r && I({ shells: i });
}
function W(e) {
	if (N.shells.length < 2) return;
	let t = N.shells.findIndex((e) => e.id === N.activeId), n = N.shells[(t + e + N.shells.length) % N.shells.length];
	n && H(n.id);
}
function G(e) {
	let t = N.shells[e];
	t && H(t.id);
}
function ee(e) {
	I({ mode: e });
}
function te(e) {
	I({ mode: e ? N.mode === "hidden" ? "docked" : N.mode : "hidden" });
}
function ne() {
	I({ mode: N.mode === "floating" ? "docked" : "floating" });
}
function re() {
	let e = [
		"docked",
		"grid",
		"stack",
		"floating"
	];
	I({ mode: e[(e.indexOf(N.mode) + 1) % e.length] ?? "docked" });
}
function ie(e) {
	return e === "grid" || e === "stack";
}
function ae(e) {
	I({ geometry: {
		...N.geometry,
		...e
	} });
}
//#endregion
//#region src/components/compute/fixtures/computeFixture.ts
var K = (e) => `demo-session-${e}-0000000000000000`.slice(0, 40), oe = [
	{
		id: "demo-1",
		label: "demo-alpha",
		sessionId: K("alpha"),
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
		sessionId: K("bravo"),
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
		sessionId: K("charlie"),
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
		sessionId: K("delta"),
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
		id: K("local-a"),
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
		id: K("local-b"),
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
		id: K("local-c"),
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
function q(e, t) {
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
	let [r, i] = m([]), [a, o] = m(!1), [c, l] = m(0), [u, d] = m(null), [f, h] = m(null), g = p(null), _ = p(n);
	_.current = n;
	let v = s((e) => {
		i((n) => {
			let r = [...n, {
				...e,
				at: Date.now()
			}];
			return r.length > t ? r.slice(r.length - t) : r;
		});
	}, [t]), y = s(() => {
		i([]), d(null), h(null), l(0);
	}, []), b = s(() => {
		g.current?.abort(), g.current = null, o(!1);
	}, []);
	return {
		steps: r,
		isRunning: a,
		toolCount: c,
		result: u,
		error: f,
		run: s(async (t, n) => {
			if (g.current) return;
			let r = new AbortController();
			g.current = r, o(!0), h(null), d(null), l(0), v({
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
								text: q(t, e.input ?? {})
							}), l((e) => e + 1);
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
				}, r.signal), i && h(i);
			} catch (e) {
				if (r.signal.aborted) return;
				let t = e instanceof Error ? e.message : "Task failed";
				h(t), v({
					kind: "error",
					text: t
				});
			} finally {
				g.current === r && (g.current = null), o(!1);
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
				text: q(t, e.input ?? {})
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
	let [i, a] = m([]), [o, s] = m(!1), [c, u] = m(!1), [d, f] = m(null), [h, g] = m(null), _ = p(n);
	return _.current = n, l(() => {
		if (!r || !t) {
			s(!1);
			return;
		}
		a([]), f(null), g(null), u(!1);
		let n = e.tail(t);
		if (typeof EventSource != "function") {
			g("live tail unavailable in this environment");
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
			}), n.running !== void 0 && u(n.running), n.result && f(n.result), n.error && g(n.error);
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
		result: d,
		error: h
	};
}
//#endregion
//#region src/components/compute/components/TailPane.tsx
var J = {
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
function ge({ computer: n, registerPane: r, className: i }) {
	let { client: a } = $(), o = pe({
		client: a,
		boxId: n.id
	}), s = p(null), c = p(!0), u = p(0), [f, h] = m(!0), [v, y] = m(0);
	function b() {
		let e = s.current;
		e && (e.scrollTop = e.scrollHeight), c.current = !0, h(!0), y(0);
	}
	l(() => {
		if (r) return r({ focus: () => s.current?.focus() }), () => r(null);
	}, [r]), d(() => {
		let e = s.current, t = o.steps.length - u.current;
		u.current = o.steps.length, e && (c.current ? (e.scrollTop = e.scrollHeight, v !== 0 && y(0)) : t > 0 && y((e) => e + t));
	}, [o.steps]);
	let x = Math.max(0, o.steps.length - he), S = x > 0 ? o.steps.slice(-200) : o.steps;
	return /* @__PURE__ */ _("div", {
		className: e("flex flex-col h-full min-h-0 bg-code-bg", i),
		children: [/* @__PURE__ */ _("div", {
			className: "shrink-0 flex items-center gap-2 px-2 py-1 border-b border-code-border",
			children: [
				/* @__PURE__ */ g(t, {
					size: "xs",
					mono: !0,
					tone: o.connected ? "success" : "neutral",
					dot: "static",
					children: o.connected ? "tailing" : "not connected"
				}),
				o.running && /* @__PURE__ */ g(t, {
					size: "xs",
					mono: !0,
					tone: "info",
					dot: "pulse",
					children: "running"
				}),
				/* @__PURE__ */ g("span", { className: "flex-1" }),
				/* @__PURE__ */ g("span", {
					className: "text-[10px] font-mono text-code-raised",
					children: "read-only"
				})
			]
		}), /* @__PURE__ */ _("div", {
			className: "relative flex-1 min-h-0",
			children: [/* @__PURE__ */ _("div", {
				ref: s,
				onScroll: (e) => {
					let t = e.currentTarget, n = t.scrollHeight - t.scrollTop - t.clientHeight < 32;
					c.current = n, h(n);
				},
				onKeyDown: (e) => {
					e.key === "End" && (e.preventDefault(), b());
				},
				tabIndex: 0,
				role: "log",
				"aria-label": `Activity on ${n.label}`,
				"data-testid": "tail-pane-log",
				className: "h-full overflow-y-auto px-2 py-1.5 font-mono text-[11px] leading-[1.5] flex flex-col gap-0.5 outline-none focus-visible:ring-1 focus-visible:ring-code-blue focus-visible:ring-inset",
				children: [
					x > 0 && /* @__PURE__ */ _("div", {
						"data-testid": "tail-pane-trimmed",
						className: "text-center text-code-raised py-0.5",
						children: [
							"· earlier steps trimmed (",
							x,
							") ·"
						]
					}),
					o.error && /* @__PURE__ */ g("div", {
						className: "text-code-red",
						children: o.error
					}),
					o.steps.length === 0 && !o.error ? /* @__PURE__ */ g("div", {
						className: "text-code-raised",
						children: n.currentTask ? `waiting for output · ${n.currentTask}` : "nothing running on this box — open a terminal pane to start something"
					}) : S.map((n, r) => {
						if (n.kind === "job") return /* @__PURE__ */ _("div", {
							"data-testid": "tail-banner-job",
							className: "my-0.5 flex items-center gap-2 rounded border border-code-blue/40 bg-code-blue/10 px-2 py-1",
							children: [
								/* @__PURE__ */ g("span", {
									"aria-hidden": "true",
									className: "text-code-blue",
									children: "▶"
								}),
								/* @__PURE__ */ g("span", {
									className: "font-semibold text-code-blue break-words min-w-0",
									children: n.text
								}),
								n.jobKind && /* @__PURE__ */ g("span", {
									className: "ml-auto shrink-0 text-code-comment",
									children: n.jobKind
								})
							]
						}, r);
						if (n.kind === "job_end") {
							let t = n.jobOk !== !1;
							return /* @__PURE__ */ _("div", {
								"data-testid": "tail-banner-job-end",
								"data-ok": t,
								className: e("my-0.5 flex items-center gap-2 rounded border px-2 py-1 font-semibold", t ? "border-code-green/40 bg-code-green/10 text-code-green" : "border-code-red/40 bg-code-red/10 text-code-red"),
								children: [/* @__PURE__ */ g("span", {
									"aria-hidden": "true",
									children: t ? "✓" : "✗"
								}), /* @__PURE__ */ g("span", { children: n.text })]
							}, r);
						}
						if (n.kind === "error") return /* @__PURE__ */ _("div", {
							"data-testid": "tail-banner-error",
							className: "my-0.5 flex items-start gap-2 rounded border border-code-red/50 bg-code-red/15 px-2 py-1",
							children: [/* @__PURE__ */ g("span", {
								"aria-hidden": "true",
								className: "shrink-0 text-code-red",
								children: "✗"
							}), /* @__PURE__ */ g("span", {
								className: "min-w-0 break-words font-semibold text-code-red",
								children: n.text
							})]
						}, r);
						if (n.kind === "result" && n.result) {
							let { turns: i, durationMs: a, costUsd: o } = n.result;
							return /* @__PURE__ */ _("div", {
								"data-testid": "tail-result-chips",
								className: "my-0.5 flex flex-wrap items-center gap-1.5",
								children: [
									/* @__PURE__ */ g("span", {
										"aria-hidden": "true",
										className: e("shrink-0 w-3", J.result),
										children: me.result
									}),
									/* @__PURE__ */ _(t, {
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
									/* @__PURE__ */ _(t, {
										size: "xs",
										mono: !0,
										palette: "code",
										tone: "neutral",
										className: "tabular-nums",
										children: [(a / 1e3).toFixed(0), "s"]
									}),
									/* @__PURE__ */ _(t, {
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
						return /* @__PURE__ */ _("div", {
							className: "flex gap-1.5 min-w-0",
							children: [
								/* @__PURE__ */ g("span", {
									"aria-hidden": "true",
									className: e("shrink-0 w-3", J[n.kind]),
									children: me[n.kind]
								}),
								n.tool && /* @__PURE__ */ g("span", {
									className: "shrink-0 text-code-comment",
									children: n.tool
								}),
								/* @__PURE__ */ g("span", {
									className: e("min-w-0 break-words", J[n.kind]),
									children: n.text
								})
							]
						}, r);
					})
				]
			}), f ? /* @__PURE__ */ g("div", {
				"aria-hidden": "true",
				"data-testid": "tail-pane-following",
				className: "pointer-events-none absolute bottom-1.5 right-2 text-[10px] font-mono text-code-raised",
				children: "following"
			}) : v > 0 ? /* @__PURE__ */ _("button", {
				type: "button",
				"data-testid": "tail-pane-jump",
				onClick: b,
				className: "absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-full border border-code-blue/40 bg-code-blue/20 px-2.5 py-1 text-[10px] font-mono text-code-blue shadow-sm hover:bg-code-blue/30",
				children: [v, " new ↓"]
			}) : null]
		})]
	});
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
}, _e = 65536, ve = 29, ye = 3e4, be = 5;
function X(e, t) {
	let n = t ?? /* @__PURE__ */ new Uint8Array(), r = new Uint8Array(n.length + 1);
	return r[0] = e, r.set(n, 1), r;
}
function Z(e, t) {
	return X(Y.RESIZE, new TextEncoder().encode(JSON.stringify({
		width: e,
		height: t
	})));
}
function xe(e) {
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
function Se(e, t) {
	return e === 1006 && t >= 5 ? "could not connect — the runtime may already hold 10 shells; close one and retry" : null;
}
function Ce(e) {
	let t = (e.details?.causes ?? []).find((e) => e.reason === "ExitCode")?.message;
	if (t == null) return null;
	let n = Number.parseInt(t, 10);
	return Number.isNaN(n) ? null : n;
}
//#endregion
//#region src/components/compute/components/ShellTerminal.tsx
function we(e) {
	e && (e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close());
}
function Te(e, t) {
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
var Ee = o(function({ sessionId: t, shellId: n, label: r, cwd: a, onExit: o, height: c = 460, chrome: d = !0, fillHeight: f = !1, autoConnect: b = !1, onStatus: x, background: S, className: C }, w) {
	let { client: T } = $(), E = p(null);
	l(() => {
		let e = () => D.current, t = () => {
			let t = e();
			t && (t.options.theme = Te(S, E.current));
		}, n = typeof MutationObserver == "function" ? new MutationObserver(t) : null;
		n?.observe(document.documentElement, {
			attributes: !0,
			attributeFilter: ["data-theme", "class"]
		});
		let r = typeof globalThis.matchMedia == "function" ? globalThis.matchMedia("(prefers-color-scheme: dark)") : null;
		return r?.addEventListener?.("change", t), () => {
			n?.disconnect(), r?.removeEventListener?.("change", t);
		};
	}, [S]);
	let D = p(null), O = p(null), k = p(null), A = p(n), j = p(o);
	j.current = o;
	let M = p(x);
	M.current = x;
	let N = p(null), P = p(0), F = p(!1), I = p(null), L = p(!1), [R, z] = m("idle"), [B, V] = m(""), H = s(async () => {
		let e = D.current;
		if (!e || L.current) return;
		I.current &&= (clearTimeout(I.current), null), z("connecting"), V(""), M.current?.("connecting");
		let n;
		try {
			let e = await T.getShellUrl(t, A.current);
			n = e.url, e.shellId && (A.current = e.shellId);
		} catch (e) {
			z("error"), V(e instanceof Error ? e.message : "could not mint a shell URL"), M.current?.("error");
			return;
		}
		if (L.current) return;
		we(k.current), k.current = null;
		let r = new WebSocket(n);
		r.binaryType = "arraybuffer", k.current = r, r.onopen = () => {
			P.current = 0, F.current = !1, z("live"), M.current?.("ready");
			let t = O.current;
			t && (t.fit(), r.send(Z(e.cols, e.rows))), a && r.send(X(Y.STDIN, new TextEncoder().encode(`cd ${a} 2>/dev/null || true\n`))), e.focus();
		}, r.onmessage = (t) => {
			let n = new Uint8Array(t.data);
			if (n.length === 0) return;
			let i = n[0], a = n.subarray(1);
			if (i === Y.STDOUT || i === Y.STDERR) {
				e.write(a), M.current?.("busy", !0), N.current && clearTimeout(N.current), N.current = setTimeout(() => M.current?.("ready"), 700);
				return;
			}
			if (i === Y.STATUS) {
				try {
					let e = JSON.parse(new TextDecoder().decode(a));
					if (e.metadata?.shellId) {
						A.current = e.metadata.shellId;
						let t = e.metadata.bytesDropped;
						V(e.metadata.reconnected ? `reattached${t ? ` · ${t} bytes lost while away` : ""}` : "new shell");
						return;
					}
					j.current?.(Ce(e));
				} catch {}
				return;
			}
			i === Y.CLOSE && r.close();
		}, r.onclose = (e) => {
			if (k.current = null, F.current) {
				z("detached"), V("detached — shell still running"), M.current?.("detached");
				return;
			}
			let t = xe(e.code);
			if (V(t.text), t.retry && P.current < 5 && !L.current) {
				P.current += 1, z("connecting"), I.current = setTimeout(() => void H(), Math.min(500 * 2 ** P.current, 8e3));
				return;
			}
			z(e.code === 1e3 ? "closed" : "error"), M.current?.(e.code === 1e3 ? "detached" : "error");
			let n = Se(e.code, P.current);
			n && V(n);
		}, r.onerror = () => {};
	}, [
		T,
		t,
		a
	]);
	l(() => {
		if (!E.current) return;
		L.current = !1;
		let e = new v({
			convertEol: !1,
			cursorBlink: !0,
			fontSize: 12.5,
			fontFamily: "\"Fira Code\", ui-monospace, SFMono-Regular, Menlo, monospace",
			theme: Te(S, E.current),
			scrollback: 5e3
		}), t = new y();
		e.loadAddon(t), e.open(E.current), t.fit(), D.current = e, O.current = t;
		let n = e.onData((t) => {
			let n = k.current;
			if (!n || n.readyState !== WebSocket.OPEN) return;
			let r = new TextEncoder().encode(t);
			if (r.length === 1 && r[0] === 29) {
				F.current = !0, n.close();
				return;
			}
			if (r.length > 65536) {
				e.write("\r\n\x1B[33m[paste too large — split into chunks under 64 KB]\x1B[0m\r\n");
				return;
			}
			n.send(X(Y.STDIN, r));
		}), r = e.onResize(({ cols: e, rows: t }) => {
			let n = k.current;
			n?.readyState === WebSocket.OPEN && n.send(Z(e, t));
		}), i = () => t.fit();
		globalThis.addEventListener("resize", i);
		let a = typeof ResizeObserver == "function" ? new ResizeObserver(() => t.fit()) : null;
		a && E.current && a.observe(E.current);
		let o = setInterval(() => {
			let e = k.current;
			e?.readyState === WebSocket.OPEN && e.send(X(Y.HEARTBEAT));
		}, ye);
		return () => {
			L.current = !0, I.current && clearTimeout(I.current), N.current && clearTimeout(N.current), clearInterval(o), globalThis.removeEventListener("resize", i), a?.disconnect(), n.dispose(), r.dispose(), we(k.current), k.current = null, e.dispose(), D.current = null;
		};
	}, []), l(() => {
		b && R === "idle" && H();
	}, [
		b,
		R,
		H
	]);
	let U = s(() => {
		F.current = !0, k.current?.close();
	}, []), W = s(() => {
		let e = k.current;
		e?.readyState === WebSocket.OPEN && e.send(X(Y.CLOSE));
	}, []);
	u(w, () => ({
		send: (e) => {
			let t = k.current;
			if (!t || t.readyState !== WebSocket.OPEN) return !1;
			let n = new TextEncoder().encode(e);
			return n.length > 65536 ? !1 : (t.send(X(Y.STDIN, n)), !0);
		},
		detach: U,
		kill: W,
		focus: () => D.current?.focus(),
		refit: () => O.current?.fit(),
		connect: () => void H()
	}), [
		H,
		U,
		W
	]);
	let G = R === "live", ee = i[G ? "ready" : R === "error" ? "error" : R === "detached" || R === "closed" ? "detached" : "connecting"];
	return /* @__PURE__ */ _("div", {
		style: S ? { background: S } : void 0,
		className: e("flex flex-col", S ? "" : "bg-terminal-bg", f ? "h-full min-h-0" : "rounded-lg overflow-hidden border border-code-border", C),
		children: [
			d && /* @__PURE__ */ _("div", {
				className: "flex items-center gap-2 px-3 py-2 border-b border-code-border shrink-0",
				children: [
					/* @__PURE__ */ g("span", {
						className: "text-[11px] font-semibold text-code-text",
						children: r ?? "terminal"
					}),
					/* @__PURE__ */ _("span", {
						className: e("text-[10px]", G ? "text-code-green" : R === "error" ? "text-code-red" : "text-code-muted"),
						title: ee.help,
						children: [R, B ? ` · ${B}` : ""]
					}),
					/* @__PURE__ */ g("span", { className: "flex-1" }),
					A.current && /* @__PURE__ */ g("span", {
						className: "text-[9.5px] text-code-muted font-mono hidden md:inline",
						children: A.current
					}),
					G ? /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g("button", {
						type: "button",
						onClick: U,
						title: "Leave the shell running (Ctrl-])",
						className: "text-[10px] px-2 py-0.5 rounded border border-code-border text-code-muted hover:text-code-text cursor-pointer bg-transparent",
						children: "detach"
					}), /* @__PURE__ */ g("button", {
						type: "button",
						onClick: W,
						title: "Kill the shell — it cannot be reattached",
						className: "text-[10px] px-2 py-0.5 rounded border border-code-border text-code-muted hover:text-code-red cursor-pointer bg-transparent",
						children: "kill"
					})] }) : /* @__PURE__ */ g("button", {
						type: "button",
						onClick: () => void H(),
						disabled: R === "connecting",
						className: "text-[10px] px-2 py-0.5 rounded border border-code-border text-code-green hover:bg-code-panel cursor-pointer bg-transparent disabled:cursor-not-allowed disabled:opacity-50",
						children: R === "connecting" ? "connecting" : R === "detached" || R === "closed" ? "reattach" : "connect"
					})
				]
			}),
			!d && R !== "live" && /* @__PURE__ */ _("div", {
				className: "px-3 py-1 text-[10px] border-b border-code-border flex items-center gap-2 shrink-0",
				children: [/* @__PURE__ */ _("span", {
					className: R === "error" ? "text-code-red" : "text-code-subtle",
					children: [R, B ? ` · ${B}` : ""]
				}), R !== "connecting" && /* @__PURE__ */ g("button", {
					type: "button",
					onClick: () => void H(),
					className: "text-code-green bg-transparent border-none cursor-pointer p-0 hover:underline",
					children: R === "idle" ? "connect" : "reattach"
				})]
			}),
			/* @__PURE__ */ g("div", {
				ref: E,
				style: f ? void 0 : { height: c },
				className: e("px-2 py-1", f && "flex-1 min-h-0")
			})
		]
	});
}), De = {
	id: "shell",
	label: "shell",
	description: "A real terminal on this computer.",
	quota: "shell",
	inputSuffix: "\n",
	statusMode: "pty",
	render: (e) => /* @__PURE__ */ g(Ae, { ...e })
}, Oe = {
	id: "tail",
	label: "tail",
	description: "Watch what is running here, including runs started elsewhere. Costs no shell slot.",
	statusMode: "read-only",
	render: ({ computer: e, registerPane: t }) => /* @__PURE__ */ g(ge, {
		computer: e,
		registerPane: t
	})
}, ke = [De, Oe];
function Ae({ computer: e, paneId: t, registerPane: n }) {
	let r = p(null);
	return l(() => (n({
		send: (e) => r.current?.send(e) ?? !1,
		focus: () => r.current?.focus()
	}), () => n(null)), [n]), /* @__PURE__ */ g(Ee, {
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
var Q = a(null);
function je({ children: e, client: t, clientOptions: i, computers: a, useFixtures: o = !0, pollIntervalMs: s = 5e3, canManage: c = !1, enabled: u = !0, models: d, projects: p, paneKinds: h = ke, onNotify: _ }) {
	let v = f(() => t ?? x(i), [t, i]), y = k({
		client: v,
		pollIntervalMs: u ? s : 0,
		enabled: u,
		...a ? { computers: a } : {},
		...o ? { fixtures: oe } : {}
	}), b = n({
		client: v,
		enabled: u,
		...p ? { projects: p } : {}
	}), S = f(() => r(b.projects, y.computers), [b.projects, y.computers]), [C, w] = m(null), [T, E] = m(null);
	l(() => {
		if (!u) {
			w(null), E(null);
			return;
		}
		let e = !1;
		return v.getStatus().then((t) => {
			e || (w(t), E(null));
		}).catch((t) => {
			e || (E(t instanceof Error ? t.message : "Runtime status unavailable"), o && w(se));
		}), () => {
			e = !0;
		};
	}, [
		v,
		o,
		u
	]), l(() => {
		y.source === "fixture" || y.isLoading || z(y.computers.map((e) => e.sessionId));
	}, [
		y.computers,
		y.source,
		y.isLoading
	]);
	let D = d ?? ce, O = f(() => {
		let e = C?.allowedModels;
		return !e || e.length === 0 ? D : D.filter((t) => e.includes(t.id));
	}, [D, C?.allowedModels]), A = f(() => ({
		client: v,
		computers: y.computers,
		source: y.source,
		isLoading: y.isLoading,
		error: y.error,
		runtime: C,
		runtimeError: T,
		models: O,
		projects: S,
		projectsAbsent: b.absent,
		canManage: c,
		paneKinds: h,
		refresh: y.refresh,
		create: y.create,
		rename: y.rename,
		remove: y.remove,
		stop: y.stop,
		notify: _ ?? (() => {})
	}), [
		v,
		y,
		C,
		T,
		O,
		S,
		b.absent,
		c,
		h,
		_
	]);
	return /* @__PURE__ */ g(Q.Provider, {
		value: A,
		children: e
	});
}
function $() {
	let e = c(Q);
	if (!e) throw Error("useCompute must be used within a ComputeProvider");
	return e;
}
function Me() {
	return c(Q);
}
//#endregion
export { W as A, ie as B, le as C, A as D, ue as E, U as F, S as G, ne as H, G as I, E as J, C as K, te as L, R as M, B as N, V as O, z as P, ae as R, oe as S, se as T, k as U, L as V, T as W, x as Y, Ce as _, De as a, q as b, ve as c, be as d, Y as f, Se as g, Z as h, ke as i, H as j, re as k, ye as l, X as m, $ as n, Oe as o, xe as p, w as q, Me as r, Ee as s, je as t, _e as u, ge as v, ce as w, de as x, pe as y, ee as z };
