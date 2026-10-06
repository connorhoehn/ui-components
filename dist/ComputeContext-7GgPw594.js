import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./Chip-0zFpfJ52.js";
import { ct as n, s as r, t as i, x as a, y as o } from "./Icons-D2Jd38B6.js";
import { t as s } from "./StatusDot-ClFcLvD7.js";
import { t as c } from "./SearchInput-8LpHL-oD.js";
import { t as l } from "./LogStream-Bk8DVIVb.js";
import { t as u } from "./RisingParticles-BBIjT11W.js";
import { t as d } from "./DropdownMenu-zZZX4CFi.js";
import { i as f, r as p } from "./useComputeProjects-ZSazDRet.js";
import { a as m, s as h } from "./PaneStatusLine-m8wKbLkz.js";
import { createContext as g, forwardRef as _, useCallback as v, useContext as y, useEffect as b, useImperativeHandle as x, useLayoutEffect as S, useMemo as C, useRef as w, useState as T } from "react";
import { Fragment as E, jsx as D, jsxs as O } from "react/jsx-runtime";
import { Terminal as ee } from "@xterm/xterm";
import { FitAddon as te } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
//#region src/components/compute/lib/computeClient.ts
async function k(e) {
	let t = `HTTP ${e.status}`;
	try {
		let n = await e.json();
		t = n.error ?? n.message ?? t;
	} catch {}
	return Error(t);
}
function A(e = {}) {
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
		if (!o.ok) throw await k(o);
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
		if (!o.ok) throw await k(o);
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
		if (!c.ok) throw await k(c);
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
var j = "ui-components.computeDock.v1", M = "ui-components.computeFleet.v1", N = "ui-components.computerLab.v1", P = [
	j,
	M,
	N
];
function F() {
	for (let e of P) try {
		globalThis.localStorage?.removeItem(e);
	} catch {}
}
//#endregion
//#region src/components/compute/hooks/useComputeFleet.ts
function I() {
	try {
		let e = globalThis.localStorage?.getItem(M);
		return e ? JSON.parse(e) : [];
	} catch {
		return [];
	}
}
function L(e) {
	try {
		globalThis.localStorage?.setItem(M, JSON.stringify(e));
	} catch {}
}
function R({ client: e, pollIntervalMs: t = 5e3, computers: n, fixtures: r, enabled: i = !0, readopt: a = !0 }) {
	let [o, s] = T(() => n ?? (I().length > 0 ? I() : r ?? [])), [c, l] = T(n ? "provided" : I().length > 0 ? "remote" : r?.length ? "fixture" : "remote"), [u, d] = T(!n), [f, p] = T(null), m = w(0), h = w(!1), g = v(async () => {
		if (n || !i) return;
		let t = ++m.current, r = () => m.current === t;
		try {
			let t = await e.listComputers();
			if (a && t.length === 0) {
				let n = I();
				n.length > 0 && (await Promise.all(n.map((t) => e.adoptComputer({
					sessionId: t.sessionId,
					label: t.label,
					createdAt: t.createdAt
				}).catch(() => {}))), t = await e.listComputers());
			}
			if (!r()) return;
			s(t), l("remote"), p(null), L(t);
		} catch (e) {
			r() && p(e instanceof Error ? e.message : "Failed to list computers");
		} finally {
			r() && (h.current = !0, d(!1));
		}
	}, [
		e,
		n,
		a,
		i
	]);
	return b(() => {
		if (n) {
			s(n), l("provided"), d(!1);
			return;
		}
		if (!i) {
			d(!1);
			return;
		}
		if (g(), t <= 0) return;
		let e = setInterval(() => void g(), t);
		return () => {
			clearInterval(e), m.current += 1;
		};
	}, [
		g,
		t,
		n,
		i
	]), {
		computers: o,
		source: c,
		isLoading: u,
		error: f,
		refresh: g,
		create: v(async (t) => {
			let n = await e.createComputer(t);
			return L([...I().filter((e) => e.id !== n.id), n]), await g(), n;
		}, [e, g]),
		rename: v(async (t, n) => {
			await e.renameComputer(t, n), await g();
		}, [e, g]),
		remove: v(async (t) => {
			await e.removeComputer(t), L(I().filter((e) => e.id !== t)), await g();
		}, [e, g]),
		stop: v(async (t) => {
			await e.stopSession(t), await g();
		}, [e, g])
	};
}
//#endregion
//#region src/components/compute/lib/dockStore.ts
var z = 8, B = {
	x: 120,
	y: 120,
	width: 860,
	height: 480,
	dockHeight: 360
};
function V() {
	let e = {
		mode: "hidden",
		shells: [],
		activeId: null,
		geometry: B
	};
	try {
		let t = globalThis.localStorage?.getItem(j);
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
				...B,
				...n.geometry ?? {}
			}
		};
	} catch {
		return e;
	}
}
var H = V(), U = /* @__PURE__ */ new Set();
function W() {
	try {
		globalThis.localStorage?.setItem(j, JSON.stringify({
			shells: H.shells,
			activeId: H.activeId,
			geometry: H.geometry
		}));
	} catch {}
	for (let e of U) e();
}
function G(e) {
	H = {
		...H,
		...e
	}, W();
}
function K(e) {
	return U.add(e), () => {
		U.delete(e);
	};
}
function ne() {
	return H;
}
function re(e) {
	let t = new Set(e), n = H.shells.filter((e) => t.has(e.sessionId));
	n.length !== H.shells.length && G({
		shells: n,
		activeId: n.some((e) => e.id === H.activeId) ? H.activeId : n[n.length - 1]?.id ?? null,
		mode: n.length === 0 ? "hidden" : H.mode
	});
}
function ie(e) {
	let t = H.shells.find((t) => t.sessionId === e.sessionId);
	if (t) return G({
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
	if (H.shells.length >= 8) return G({ mode: H.mode === "hidden" ? "docked" : H.mode }), {
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
	return G({
		shells: [...H.shells, n],
		activeId: n.id,
		mode: H.mode === "hidden" ? "docked" : H.mode
	}), {
		ok: !0,
		id: n.id
	};
}
function ae(e) {
	let t = H.shells.filter((t) => t.id !== e);
	G({
		shells: t,
		activeId: H.activeId === e ? t[t.length - 1]?.id ?? null : H.activeId,
		mode: t.length === 0 ? "hidden" : H.mode
	});
}
function q(e) {
	G({
		activeId: e,
		shells: H.shells.map((t) => t.id === e ? {
			...t,
			unread: !1
		} : t)
	});
}
function oe(e, t, n = !1) {
	let r = !1, i = H.shells.map((i) => {
		if (i.id !== e) return i;
		let a = n && H.activeId !== e ? !0 : i.unread;
		return i.status === t && i.unread === a ? i : (r = !0, {
			...i,
			status: t,
			unread: a
		});
	});
	r && G({ shells: i });
}
function se(e) {
	if (H.shells.length < 2) return;
	let t = H.shells.findIndex((e) => e.id === H.activeId), n = H.shells[(t + e + H.shells.length) % H.shells.length];
	n && q(n.id);
}
function ce(e) {
	let t = H.shells[e];
	t && q(t.id);
}
function le(e) {
	G({ mode: e });
}
function ue(e) {
	G({ mode: e ? H.mode === "hidden" ? "docked" : H.mode : "hidden" });
}
function de() {
	G({ mode: H.mode === "floating" ? "docked" : "floating" });
}
function fe() {
	let e = [
		"docked",
		"grid",
		"stack",
		"floating"
	];
	G({ mode: e[(e.indexOf(H.mode) + 1) % e.length] ?? "docked" });
}
function pe(e) {
	return e === "grid" || e === "stack";
}
function me(e) {
	G({ geometry: {
		...H.geometry,
		...e
	} });
}
//#endregion
//#region src/components/compute/fixtures/computeFixture.ts
var J = (e) => `demo-session-${e}-0000000000000000`.slice(0, 40), he = [
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
], ge = {
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
}, _e = [
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
], ve = [{
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
}], ye = {
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
function be(e, t) {
	let n = (...e) => {
		for (let n of e) {
			let e = t[n];
			if (typeof e == "string" && e.length > 0) return e;
		}
		return null;
	}, r = (n("file_path", "path", "notebook_path", "command", "pattern", "url", "query", "prompt") ?? n("description") ?? "").replace(/\s+/g, " ").trim();
	return r ? r.length > 96 ? `${r.slice(0, 95)}…` : r : e;
}
function xe({ client: e, maxSteps: t = 400, onEvent: n }) {
	let [r, i] = T([]), [a, o] = T(!1), [s, c] = T(0), [l, u] = T(null), [d, f] = T(null), p = w(null), m = w(n);
	m.current = n;
	let h = v((e) => {
		i((n) => {
			let r = [...n, {
				...e,
				at: Date.now()
			}];
			return r.length > t ? r.slice(r.length - t) : r;
		});
	}, [t]), g = v(() => {
		i([]), u(null), f(null), c(0);
	}, []), _ = v(() => {
		p.current?.abort(), p.current = null, o(!1);
	}, []);
	return {
		steps: r,
		isRunning: a,
		toolCount: s,
		result: l,
		error: d,
		run: v(async (t, n) => {
			if (p.current) return;
			let r = new AbortController();
			p.current = r, o(!0), f(null), u(null), c(0), h({
				kind: "meta",
				text: n.prompt
			});
			let i = null;
			try {
				await e.runTask(t, n, (e) => {
					m.current?.(e);
					let t = e.type;
					if (t === "assistant") {
						let t = e.message?.content ?? [];
						for (let e of t) if (e.type === "tool_use") {
							let t = String(e.name ?? "tool");
							h({
								kind: "tool",
								tool: t,
								text: be(t, e.input ?? {})
							}), c((e) => e + 1);
						} else if (e.type === "text") {
							let t = String(e.text ?? "").trim();
							t && h({
								kind: "text",
								text: t
							});
						}
						return;
					}
					if (t === "devbox_start") {
						let t = e.model;
						typeof t == "string" && t && h({
							kind: "meta",
							text: `model: ${t}`
						});
						return;
					}
					if (t === "devbox_raw") {
						let t = String(e.text ?? "").trim();
						t && h({
							kind: "text",
							text: t
						});
						return;
					}
					if (t === "devbox_error") {
						let t = String(e.error ?? "the box reported an error");
						i = t, h({
							kind: "error",
							text: t
						});
						return;
					}
					if (t === "devbox_end") {
						let t = e.timed_out === !0, n = Number(e.exit_code ?? 0), r = String(e.stderr ?? "").trim();
						t ? (i = "timed out — the container killed the run", h({
							kind: "error",
							text: i
						})) : n !== 0 && (i = `exited ${n}`, h({
							kind: "error",
							text: i
						})), r && (t || n !== 0) && h({
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
						u(t), h({
							kind: "result",
							text: `${t.turns} turns · ${(t.durationMs / 1e3).toFixed(0)}s · $${t.costUsd.toFixed(4)}`,
							result: t
						});
					}
				}, r.signal), i && f(i);
			} catch (e) {
				if (r.signal.aborted) return;
				let t = e instanceof Error ? e.message : "Task failed";
				f(t), h({
					kind: "error",
					text: t
				});
			} finally {
				p.current === r && (p.current = null), o(!1);
			}
		}, [e, h]),
		cancel: _,
		clear: g,
		push: h
	};
}
//#endregion
//#region src/components/compute/hooks/useComputeTail.ts
function Se(e) {
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
				text: be(t, e.input ?? {})
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
function Y({ client: e, boxId: t, maxSteps: n = 300, enabled: r = !0 }) {
	let [i, a] = T([]), [o, s] = T(!1), [c, l] = T(!1), [u, d] = T(null), [f, p] = T(null), m = w(n);
	return m.current = n, b(() => {
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
			let n = Se(t);
			n.steps.length > 0 && a((e) => {
				let r = Date.parse(String(t.ts ?? "")), i = Number.isFinite(r) ? r : Date.now(), a = [...e, ...n.steps.map((e) => ({
					...e,
					at: i
				}))];
				return a.length > m.current ? a.slice(a.length - m.current) : a;
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
var Ce = {
	meta: "text-code-blue",
	text: "text-code-subtle",
	tool: "text-code-green",
	result: "text-code-mauve",
	error: "text-code-red",
	job: "text-code-blue",
	job_end: "text-code-green"
}, we = {
	meta: "›",
	text: "·",
	tool: "⚙",
	result: "✓",
	error: "✗",
	job: "▶",
	job_end: "✓"
}, Te = 200;
function Ee(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n += 1) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
	return t >>> 0;
}
function De({ computer: n, registerPane: r, className: i }) {
	let { client: a } = $(), o = Y({
		client: a,
		boxId: n.id
	}), s = w(null), c = w(!0), l = w(0), [d, f] = T(!0), [p, m] = T(0);
	function g() {
		let e = s.current;
		e && (e.scrollTop = e.scrollHeight), c.current = !0, f(!0), m(0);
	}
	b(() => {
		if (r) return r({ focus: () => s.current?.focus() }), () => r(null);
	}, [r]), S(() => {
		let e = s.current, t = o.steps.length - l.current;
		l.current = o.steps.length, e && (c.current ? (e.scrollTop = e.scrollHeight, p !== 0 && m(0)) : t > 0 && m((e) => e + t));
	}, [o.steps]);
	let _ = Math.max(0, o.steps.length - Te), v = _ > 0 ? o.steps.slice(-200) : o.steps, y = h(n) === "running";
	return /* @__PURE__ */ O(u, {
		active: y,
		intensity: "low",
		seed: Ee(n.id),
		className: e("flex flex-col h-full min-h-0 bg-code-bg", i),
		"data-testid": "tail-pane-particles",
		children: [/* @__PURE__ */ O("div", {
			className: "shrink-0 flex items-center gap-2 px-2 py-1 border-b border-code-border",
			children: [
				/* @__PURE__ */ D(t, {
					size: "xs",
					mono: !0,
					tone: o.connected ? "success" : "neutral",
					dot: "static",
					children: o.connected ? "tailing" : "not connected"
				}),
				o.running && /* @__PURE__ */ D(t, {
					size: "xs",
					mono: !0,
					tone: "info",
					dot: "pulse",
					children: "running"
				}),
				/* @__PURE__ */ D("span", { className: "flex-1" }),
				/* @__PURE__ */ D("span", {
					className: "text-[10px] font-mono text-code-raised",
					children: "read-only"
				})
			]
		}), /* @__PURE__ */ O("div", {
			className: "relative flex-1 min-h-0",
			children: [/* @__PURE__ */ O("div", {
				ref: s,
				onScroll: (e) => {
					let t = e.currentTarget, n = t.scrollHeight - t.scrollTop - t.clientHeight < 32;
					c.current = n, f(n);
				},
				onKeyDown: (e) => {
					e.key === "End" && (e.preventDefault(), g());
				},
				tabIndex: 0,
				role: "log",
				"aria-label": `Activity on ${n.label}`,
				"data-testid": "tail-pane-log",
				className: "h-full overflow-y-auto px-2 py-1.5 font-mono text-[11px] leading-[1.5] flex flex-col gap-0.5 outline-none focus-visible:ring-1 focus-visible:ring-code-blue focus-visible:ring-inset",
				children: [
					_ > 0 && /* @__PURE__ */ O("div", {
						"data-testid": "tail-pane-trimmed",
						className: "text-center text-code-raised py-0.5",
						children: [
							"· earlier steps trimmed (",
							_,
							") ·"
						]
					}),
					o.error && /* @__PURE__ */ D("div", {
						className: "text-code-red",
						children: o.error
					}),
					o.steps.length === 0 && !o.error ? /* @__PURE__ */ D("div", {
						className: "text-code-raised",
						children: n.currentTask ? `waiting for output · ${n.currentTask}` : "nothing running on this box — open a terminal pane to start something"
					}) : v.map((n, r) => {
						if (n.kind === "job") return /* @__PURE__ */ O("div", {
							"data-testid": "tail-banner-job",
							className: "my-0.5 flex items-center gap-2 rounded border border-code-blue/40 bg-code-blue/10 px-2 py-1",
							children: [
								/* @__PURE__ */ D("span", {
									"aria-hidden": "true",
									className: "text-code-blue",
									children: "▶"
								}),
								/* @__PURE__ */ D("span", {
									className: "font-semibold text-code-blue break-words min-w-0",
									children: n.text
								}),
								n.jobKind && /* @__PURE__ */ D("span", {
									className: "ml-auto shrink-0 text-code-comment",
									children: n.jobKind
								})
							]
						}, r);
						if (n.kind === "job_end") {
							let t = n.jobOk !== !1;
							return /* @__PURE__ */ O("div", {
								"data-testid": "tail-banner-job-end",
								"data-ok": t,
								className: e("my-0.5 flex items-center gap-2 rounded border px-2 py-1 font-semibold", t ? "border-code-green/40 bg-code-green/10 text-code-green" : "border-code-red/40 bg-code-red/10 text-code-red"),
								children: [/* @__PURE__ */ D("span", {
									"aria-hidden": "true",
									children: t ? "✓" : "✗"
								}), /* @__PURE__ */ D("span", { children: n.text })]
							}, r);
						}
						if (n.kind === "error") return /* @__PURE__ */ O("div", {
							"data-testid": "tail-banner-error",
							className: "my-0.5 flex items-start gap-2 rounded border border-code-red/50 bg-code-red/15 px-2 py-1",
							children: [/* @__PURE__ */ D("span", {
								"aria-hidden": "true",
								className: "shrink-0 text-code-red",
								children: "✗"
							}), /* @__PURE__ */ D("span", {
								className: "min-w-0 break-words font-semibold text-code-red",
								children: n.text
							})]
						}, r);
						if (n.kind === "result" && n.result) {
							let { turns: i, durationMs: a, costUsd: o } = n.result;
							return /* @__PURE__ */ O("div", {
								"data-testid": "tail-result-chips",
								className: "my-0.5 flex flex-wrap items-center gap-1.5",
								children: [
									/* @__PURE__ */ D("span", {
										"aria-hidden": "true",
										className: e("shrink-0 w-3", Ce.result),
										children: we.result
									}),
									/* @__PURE__ */ O(t, {
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
									/* @__PURE__ */ O(t, {
										size: "xs",
										mono: !0,
										palette: "code",
										tone: "neutral",
										className: "tabular-nums",
										children: [(a / 1e3).toFixed(0), "s"]
									}),
									/* @__PURE__ */ O(t, {
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
						return /* @__PURE__ */ O("div", {
							className: "flex gap-1.5 min-w-0",
							children: [
								/* @__PURE__ */ D("span", {
									"aria-hidden": "true",
									className: e("shrink-0 w-3", Ce[n.kind]),
									children: we[n.kind]
								}),
								n.tool && /* @__PURE__ */ D("span", {
									className: "shrink-0 text-code-comment",
									children: n.tool
								}),
								/* @__PURE__ */ D("span", {
									className: e("min-w-0 break-words", Ce[n.kind]),
									children: n.text
								})
							]
						}, r);
					})
				]
			}), d ? /* @__PURE__ */ D("div", {
				"aria-hidden": "true",
				"data-testid": "tail-pane-following",
				className: "pointer-events-none absolute bottom-1.5 right-2 text-[10px] font-mono text-code-raised",
				children: "following"
			}) : p > 0 ? /* @__PURE__ */ O("button", {
				type: "button",
				"data-testid": "tail-pane-jump",
				onClick: g,
				className: "absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-full border border-code-blue/40 bg-code-blue/20 px-2.5 py-1 text-[10px] font-mono text-code-blue shadow-sm hover:bg-code-blue/30",
				children: [p, " new ↓"]
			}) : null]
		})]
	});
}
//#endregion
//#region src/components/compute/components/WorkspacePanes.tsx
function Oe(e) {
	let t = new Date(e), n = (e) => String(e).padStart(2, "0");
	return `${n(t.getHours())}:${n(t.getMinutes())}:${n(t.getSeconds())}`;
}
function ke(e) {
	let t = Math.max(0, Math.floor(e / 1e3)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function Ae(e) {
	return e.kind === "error" ? "error" : e.kind === "job_end" ? e.jobOk === !1 ? "error" : "info" : e.kind === "meta" ? "debug" : e.kind === "text" && /\b(warn|warning|retry|retrying|timed out|slow)\b/i.test(e.text) ? "warn" : "info";
}
function X(e) {
	return e.kind === "tool" ? e.tool ?? "tool" : e.kind === "job" || e.kind === "job_end" ? e.jobKind ?? "dispatcher" : e.kind === "meta" ? "runtime" : e.kind === "result" ? "result" : e.kind === "error" ? "error" : "agent";
}
function je(e, t, n = 1e4) {
	let r = 0;
	for (let i = e.length - 1; i >= 0; --i) {
		let a = e[i];
		if (t - a.at > n) break;
		r += a.text.length + (a.tool?.length ?? 0);
	}
	return r / (n / 1e3);
}
function Me(e) {
	return e >= 1024 ? `${(e / 1024).toFixed(1)} KB/s` : `${Math.round(e)} B/s`;
}
function Ne(e, t = 1e3) {
	let [n, r] = T(() => Date.now());
	return b(() => {
		if (!e) return;
		r(Date.now());
		let n = setInterval(() => r(Date.now()), t);
		return () => clearInterval(n);
	}, [e, t]), n;
}
var Pe = "";
function Fe({ computer: t, registerPane: r, className: i }) {
	let { client: a } = $(), o = Y({
		client: a,
		boxId: t.id
	}), [u, f] = T(!1), [p, m] = T(null), [h, g] = T(Pe), [_, v] = T(""), [y, x] = T(!1), S = w(null), E = Ne(o.connected && !u);
	b(() => {
		if (r) return r({ focus: () => S.current?.querySelector("[role=\"log\"]")?.focus() }), () => r(null);
	}, [r]);
	let ee = p == null ? o.steps : o.steps.slice(0, p), te = p == null ? 0 : o.steps.length - p, k = C(() => [...new Set(o.steps.map(X))].sort(), [o.steps]), A = C(() => {
		let e = _.trim().toLowerCase();
		return ee.map((e, t) => ({
			step: e,
			index: t
		})).filter(({ step: e }) => !h || X(e) === h).filter(({ step: t }) => !e || `${t.tool ?? ""} ${t.text}`.toLowerCase().includes(e)).map(({ step: e, index: t }) => ({
			id: `${t}`,
			timestamp: Oe(e.at),
			level: Ae(e),
			source: X(e),
			message: e.text
		}));
	}, [
		ee,
		h,
		_
	]), j = () => {
		u ? (f(!1), m(null)) : (f(!0), m(o.steps.length));
	}, M = je(o.steps, E);
	return /* @__PURE__ */ O("div", {
		ref: S,
		"data-testid": "logs-pane",
		className: e("@container flex flex-col h-full min-h-0 bg-code-bg", i),
		children: [
			/* @__PURE__ */ O("div", {
				className: "shrink-0 flex items-center gap-2 px-2 py-1 border-b border-code-border text-[11px] font-mono",
				children: [
					/* @__PURE__ */ D(d, {
						trigger: /* @__PURE__ */ O("span", {
							className: "text-[11px] font-mono whitespace-nowrap",
							children: [h || "all sources", " ▾"]
						}),
						triggerLabel: "Log source",
						triggerVariant: "link",
						sections: [{ items: [{
							label: "All sources",
							active: !h,
							onSelect: () => g(Pe)
						}, ...k.map((e) => ({
							label: e,
							active: e === h,
							onSelect: () => g(e)
						}))] }]
					}),
					y ? /* @__PURE__ */ D(c, {
						value: _,
						onChange: v,
						onClear: () => {
							v(""), x(!1);
						},
						placeholder: "Filter lines…",
						className: "w-40"
					}) : /* @__PURE__ */ D("button", {
						type: "button",
						onClick: () => x(!0),
						"aria-label": "Search the log",
						title: "Search the log",
						className: "inline-flex bg-transparent border-none cursor-pointer text-code-muted hover:text-code-text p-0",
						children: /* @__PURE__ */ D(n, { size: 13 })
					}),
					/* @__PURE__ */ D("span", { className: "flex-1" }),
					/* @__PURE__ */ O("span", {
						"data-testid": "logs-pane-following",
						className: "hidden @[16rem]:inline-flex items-center gap-1 text-code-muted whitespace-nowrap",
						children: [/* @__PURE__ */ D(s, {
							size: "xs",
							color: u ? "var(--color-text-tertiary)" : "var(--color-success)",
							pulse: !u && o.running
						}), u ? `Paused${te > 0 ? ` · ${te} new` : ""}` : o.connected ? "Following live" : "Not connected"]
					})
				]
			}),
			/* @__PURE__ */ D(l, {
				lines: A,
				follow: !u,
				title: null,
				tone: "transparent",
				showSource: !0,
				className: "flex-1 min-h-0 rounded-none border-0 shadow-none",
				emptyMessage: o.error ?? (t.currentTask ? `waiting for output · ${t.currentTask}` : "Nothing has been logged on this computer yet."),
				"data-testid": "logs-pane-stream"
			}),
			/* @__PURE__ */ O("div", {
				className: "shrink-0 flex items-center gap-2 px-2 py-1 border-t border-code-border text-[11px] font-mono text-code-muted",
				children: [
					/* @__PURE__ */ D(s, {
						size: "xs",
						color: u ? "var(--color-text-tertiary)" : "var(--color-success)"
					}),
					/* @__PURE__ */ O("span", {
						"data-testid": "logs-pane-rate",
						className: "tabular-nums",
						children: [
							u ? "Paused" : "Following",
							" · ",
							Me(M)
						]
					}),
					/* @__PURE__ */ D("span", { className: "flex-1" }),
					/* @__PURE__ */ D("button", {
						type: "button",
						onClick: j,
						"aria-pressed": u,
						"data-testid": "logs-pane-pause",
						className: "bg-transparent border border-code-border rounded px-1.5 py-0.5 cursor-pointer text-code-text hover:bg-code-surface",
						children: u ? "▶ Resume" : "⏸ Pause"
					})
				]
			})
		]
	});
}
function Ie(e) {
	for (let t = e.length - 1; t >= 0; --t) if (e[t].kind === "job") return e.slice(t);
	return [...e];
}
var Le = {
	tool: "✓",
	result: "✓",
	job_end: "✓",
	error: "✗",
	job: "▶",
	meta: "›",
	text: "·"
};
function Re({ computer: t, registerPane: n, className: r }) {
	let { client: i } = $(), a = Y({
		client: i,
		boxId: t.id
	}), o = w(null), s = a.running || h(t) === "running", c = Ne(s);
	b(() => {
		if (n) return n({ focus: () => o.current?.focus() }), () => n(null);
	}, [n]);
	let l = Ie(a.steps);
	b(() => {
		let e = o.current;
		e && (e.scrollTop = e.scrollHeight);
	}, [l.length]);
	let u = l.filter((e) => e.kind === "tool"), d = s ? l.map((e) => e.kind).lastIndexOf("tool") : -1, f = l[0]?.at ?? null, p = l.some((e) => e.kind === "error");
	return /* @__PURE__ */ O("div", {
		"data-testid": "agent-pane",
		className: e("flex flex-col h-full min-h-0 bg-code-bg font-mono text-[12px]", r),
		children: [
			t.currentTask && /* @__PURE__ */ D("div", {
				className: "shrink-0 px-3 py-1.5 border-b border-code-border text-code-subtle truncate",
				title: t.currentTask,
				children: t.currentTask
			}),
			/* @__PURE__ */ O("ol", {
				ref: o,
				tabIndex: 0,
				"aria-label": `Agent steps on ${t.label}`,
				className: "flex-1 min-h-0 overflow-y-auto m-0 px-3 py-2 list-none flex flex-col gap-1 outline-none focus-visible:ring-1 focus-visible:ring-code-blue focus-visible:ring-inset",
				children: [l.length === 0 && /* @__PURE__ */ D("li", {
					className: "text-code-muted",
					children: a.error ?? (t.currentTask ? "Waiting for the agent’s first step…" : "No agent run on this computer yet.")
				}), l.map((t, n) => {
					let r = n === d;
					return /* @__PURE__ */ O("li", {
						"data-step-kind": t.kind,
						className: "flex gap-2 min-w-0",
						children: [
							/* @__PURE__ */ D("span", {
								className: "shrink-0 text-code-muted tabular-nums",
								children: Oe(t.at)
							}),
							/* @__PURE__ */ D("span", {
								"aria-hidden": "true",
								className: e("shrink-0 w-3", r ? "text-code-blue animate-pulse" : t.kind === "error" ? "text-code-red" : t.kind === "tool" || t.kind === "result" ? "text-code-green" : "text-code-muted"),
								children: r ? "◌" : Le[t.kind] ?? "·"
							}),
							t.tool && /* @__PURE__ */ D("span", {
								className: "shrink-0 text-code-text",
								children: t.tool
							}),
							/* @__PURE__ */ D("span", {
								className: e("min-w-0 break-words", t.kind === "error" ? "text-code-red" : "text-code-subtle"),
								children: t.text
							})
						]
					}, `${t.at}-${n}`);
				})]
			}),
			/* @__PURE__ */ O("div", {
				className: "shrink-0 flex items-center gap-2 px-3 py-1 border-t border-code-border text-[11px] text-code-muted",
				children: [
					/* @__PURE__ */ O("span", {
						"data-testid": "agent-pane-tally",
						className: "tabular-nums",
						children: [
							u.length - +(d >= 0),
							" done",
							d >= 0 && " · 1 running",
							p && " · failed"
						]
					}),
					/* @__PURE__ */ D("span", { className: "flex-1" }),
					f != null && /* @__PURE__ */ O("span", {
						className: "tabular-nums",
						title: "Since this run's first step",
						children: [s ? "⟳ " : "", ke((s ? c : l[l.length - 1].at) - f)]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/compute/lib/fleetSummary.ts
var ze = [
	"running",
	"waiting",
	"error"
];
function Be(e) {
	return ze.includes(h(e));
}
function Ve(e) {
	let t = 0, n = 0, r = 0, i = 0;
	for (let a of e) {
		let e = h(a);
		Be(a) && (t += 1), e === "waiting" ? n += 1 : e === "running" ? r += 1 : e === "error" && (i += 1);
	}
	return {
		computers: e.length,
		agents: t,
		needsYou: n,
		running: r,
		error: i
	};
}
var He = {
	waiting: 0,
	error: 1,
	running: 2,
	idle: 3,
	stopped: 4
};
function Ue(e, t) {
	return He[h(e)] - He[h(t)];
}
function We(e, t) {
	let n = t.toLowerCase().split(/\s+/).filter(Boolean);
	if (n.length === 0) return !0;
	let r = [
		e.label,
		e.project,
		e.currentTask,
		e.id
	].filter(Boolean).join(" ").toLowerCase();
	return n.every((e) => r.includes(e));
}
function Ge(e) {
	return e.kind === "local";
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
}, Ke = 65536, qe = 29, Je = 3e4, Ye = 5;
function Q(e, t) {
	let n = t ?? /* @__PURE__ */ new Uint8Array(), r = new Uint8Array(n.length + 1);
	return r[0] = e, r.set(n, 1), r;
}
function Xe(e, t) {
	return Q(Z.RESIZE, new TextEncoder().encode(JSON.stringify({
		width: e,
		height: t
	})));
}
function Ze(e) {
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
function Qe(e, t) {
	return e === 1006 && t >= 5 ? "could not connect — the runtime may already hold 10 shells; close one and retry" : null;
}
function $e(e) {
	let t = (e.details?.causes ?? []).find((e) => e.reason === "ExitCode")?.message;
	if (t == null) return null;
	let n = Number.parseInt(t, 10);
	return Number.isNaN(n) ? null : n;
}
//#endregion
//#region src/components/compute/components/ShellTerminal.tsx
function et(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n += 1) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
	return t >>> 0;
}
function tt(e) {
	e && (e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close());
}
function nt(e, t) {
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
var rt = _(function({ sessionId: t, shellId: n, label: r, cwd: i, onExit: a, height: o = 460, chrome: s = !0, fillHeight: c = !1, autoConnect: l = !1, onStatus: d, background: f, className: p }, g) {
	let { client: _, computers: y } = $(), S = w(null);
	b(() => {
		let e = () => C.current, t = () => {
			let t = e();
			t && (t.options.theme = nt(f, S.current));
		}, n = typeof MutationObserver == "function" ? new MutationObserver(t) : null;
		n?.observe(document.documentElement, {
			attributes: !0,
			attributeFilter: ["data-theme", "class"]
		});
		let r = typeof globalThis.matchMedia == "function" ? globalThis.matchMedia("(prefers-color-scheme: dark)") : null;
		return r?.addEventListener?.("change", t), () => {
			n?.disconnect(), r?.removeEventListener?.("change", t);
		};
	}, [f]);
	let C = w(null), k = w(null), A = w(null), j = w(n), M = w(a);
	M.current = a;
	let N = w(d);
	N.current = d;
	let P = w(null), F = w(0), I = w(!1), L = w(null), R = w(!1), [z, B] = T("idle"), [V, H] = T(""), U = v(async () => {
		let e = C.current;
		if (!e || R.current) return;
		L.current &&= (clearTimeout(L.current), null), B("connecting"), H(""), N.current?.("connecting");
		let n;
		try {
			let e = await _.getShellUrl(t, j.current);
			n = e.url, e.shellId && (j.current = e.shellId);
		} catch (e) {
			B("error"), H(e instanceof Error ? e.message : "could not mint a shell URL"), N.current?.("error");
			return;
		}
		if (R.current) return;
		tt(A.current), A.current = null;
		let r = new WebSocket(n);
		r.binaryType = "arraybuffer", A.current = r, r.onopen = () => {
			F.current = 0, I.current = !1, B("live"), N.current?.("ready");
			let t = k.current;
			t && (t.fit(), r.send(Xe(e.cols, e.rows))), i && r.send(Q(Z.STDIN, new TextEncoder().encode(`cd ${i} 2>/dev/null || true\n`))), e.focus();
		}, r.onmessage = (t) => {
			let n = new Uint8Array(t.data);
			if (n.length === 0) return;
			let i = n[0], a = n.subarray(1);
			if (i === Z.STDOUT || i === Z.STDERR) {
				e.write(a), N.current?.("busy", !0), P.current && clearTimeout(P.current), P.current = setTimeout(() => N.current?.("ready"), 700);
				return;
			}
			if (i === Z.STATUS) {
				try {
					let e = JSON.parse(new TextDecoder().decode(a));
					if (e.metadata?.shellId) {
						j.current = e.metadata.shellId;
						let t = e.metadata.bytesDropped;
						H(e.metadata.reconnected ? `reattached${t ? ` · ${t} bytes lost while away` : ""}` : "new shell");
						return;
					}
					M.current?.($e(e));
				} catch {}
				return;
			}
			i === Z.CLOSE && r.close();
		}, r.onclose = (e) => {
			if (A.current = null, I.current) {
				B("detached"), H("detached — shell still running"), N.current?.("detached");
				return;
			}
			let t = Ze(e.code);
			if (H(t.text), t.retry && F.current < 5 && !R.current) {
				F.current += 1, B("connecting"), L.current = setTimeout(() => void U(), Math.min(500 * 2 ** F.current, 8e3));
				return;
			}
			B(e.code === 1e3 ? "closed" : "error"), N.current?.(e.code === 1e3 ? "detached" : "error");
			let n = Qe(e.code, F.current);
			n && H(n);
		}, r.onerror = () => {};
	}, [
		_,
		t,
		i
	]);
	b(() => {
		if (!S.current) return;
		R.current = !1;
		let e = new ee({
			convertEol: !1,
			cursorBlink: !0,
			fontSize: 12.5,
			fontFamily: "\"Fira Code\", ui-monospace, SFMono-Regular, Menlo, monospace",
			theme: nt(f, S.current),
			scrollback: 5e3
		}), t = new te();
		e.loadAddon(t), e.open(S.current), t.fit(), C.current = e, k.current = t;
		let n = e.onData((t) => {
			let n = A.current;
			if (!n || n.readyState !== WebSocket.OPEN) return;
			let r = new TextEncoder().encode(t);
			if (r.length === 1 && r[0] === 29) {
				I.current = !0, n.close();
				return;
			}
			if (r.length > 65536) {
				e.write("\r\n\x1B[33m[paste too large — split into chunks under 64 KB]\x1B[0m\r\n");
				return;
			}
			n.send(Q(Z.STDIN, r));
		}), r = e.onResize(({ cols: e, rows: t }) => {
			let n = A.current;
			n?.readyState === WebSocket.OPEN && n.send(Xe(e, t));
		}), i = () => t.fit();
		globalThis.addEventListener("resize", i);
		let a = typeof ResizeObserver == "function" ? new ResizeObserver(() => t.fit()) : null;
		a && S.current && a.observe(S.current);
		let o = setInterval(() => {
			let e = A.current;
			e?.readyState === WebSocket.OPEN && e.send(Q(Z.HEARTBEAT));
		}, Je);
		return () => {
			R.current = !0, L.current && clearTimeout(L.current), P.current && clearTimeout(P.current), clearInterval(o), globalThis.removeEventListener("resize", i), a?.disconnect(), n.dispose(), r.dispose(), tt(A.current), A.current = null, e.dispose(), C.current = null;
		};
	}, []), b(() => {
		l && z === "idle" && U();
	}, [
		l,
		z,
		U
	]);
	let W = v(() => {
		I.current = !0, A.current?.close();
	}, []), G = v(() => {
		let e = A.current;
		e?.readyState === WebSocket.OPEN && e.send(Q(Z.CLOSE));
	}, []);
	x(g, () => ({
		send: (e) => {
			let t = A.current;
			if (!t || t.readyState !== WebSocket.OPEN) return !1;
			let n = new TextEncoder().encode(e);
			return n.length > 65536 ? !1 : (t.send(Q(Z.STDIN, n)), !0);
		},
		detach: W,
		kill: G,
		focus: () => C.current?.focus(),
		refit: () => k.current?.fit(),
		connect: () => void U()
	}), [
		U,
		W,
		G
	]);
	let K = z === "live", ne = h(y.find((e) => e.sessionId === t)) === "running" && !!y.find((e) => e.sessionId === t), re = m[K ? "ready" : z === "error" ? "error" : z === "detached" || z === "closed" ? "detached" : "connecting"];
	return /* @__PURE__ */ O("div", {
		style: f ? { background: f } : void 0,
		className: e("flex flex-col", f ? "" : "bg-terminal-bg", c ? "h-full min-h-0" : "rounded-lg overflow-hidden border border-code-border", p),
		children: [
			s && /* @__PURE__ */ O(u, {
				active: ne,
				intensity: "low",
				seed: et(t),
				className: "flex items-center gap-2 px-3 py-2 border-b border-code-border shrink-0",
				"data-testid": "shell-terminal-particles",
				children: [
					/* @__PURE__ */ D("span", {
						className: "text-[11px] font-semibold text-code-text",
						children: r ?? "terminal"
					}),
					/* @__PURE__ */ O("span", {
						className: e("text-[10px]", K ? "text-code-green" : z === "error" ? "text-code-red" : "text-code-muted"),
						title: re.help,
						children: [z, V ? ` · ${V}` : ""]
					}),
					/* @__PURE__ */ D("span", { className: "flex-1" }),
					j.current && /* @__PURE__ */ D("span", {
						className: "text-[9.5px] text-code-muted font-mono hidden md:inline",
						children: j.current
					}),
					K ? /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D("button", {
						type: "button",
						onClick: W,
						title: "Leave the shell running (Ctrl-])",
						className: "text-[10px] px-2 py-0.5 rounded border border-code-border text-code-muted hover:text-code-text cursor-pointer bg-transparent",
						children: "detach"
					}), /* @__PURE__ */ D("button", {
						type: "button",
						onClick: G,
						title: "Kill the shell — it cannot be reattached",
						className: "text-[10px] px-2 py-0.5 rounded border border-code-border text-code-muted hover:text-code-red cursor-pointer bg-transparent",
						children: "kill"
					})] }) : /* @__PURE__ */ D("button", {
						type: "button",
						onClick: () => void U(),
						disabled: z === "connecting",
						className: "text-[10px] px-2 py-0.5 rounded border border-code-border text-code-green hover:bg-code-panel cursor-pointer bg-transparent disabled:cursor-not-allowed disabled:opacity-50",
						children: z === "connecting" ? "connecting" : z === "detached" || z === "closed" ? "reattach" : "connect"
					})
				]
			}),
			!s && z !== "live" && /* @__PURE__ */ O("div", {
				className: "px-3 py-1 text-[10px] border-b border-code-border flex items-center gap-2 shrink-0",
				children: [/* @__PURE__ */ O("span", {
					className: z === "error" ? "text-code-red" : "text-code-subtle",
					children: [z, V ? ` · ${V}` : ""]
				}), z !== "connecting" && /* @__PURE__ */ D("button", {
					type: "button",
					onClick: () => void U(),
					className: "text-code-green bg-transparent border-none cursor-pointer p-0 hover:underline",
					children: z === "idle" ? "connect" : "reattach"
				})]
			}),
			/* @__PURE__ */ D("div", {
				ref: S,
				style: c ? void 0 : { height: o },
				className: e("px-2 py-1", c && "flex-1 min-h-0")
			})
		]
	});
}), it = {
	id: "shell",
	label: "shell",
	description: "A real terminal on this computer.",
	quota: "shell",
	inputSuffix: "\n",
	statusMode: "pty",
	icon: /* @__PURE__ */ D(o, { size: 14 }),
	title: "Shell",
	appliesTo: (e) => !Ge(e),
	render: (e) => /* @__PURE__ */ D(lt, { ...e })
}, at = {
	id: "tail",
	label: "tail",
	description: "Watch what is running here, including runs started elsewhere. Costs no shell slot.",
	statusMode: "read-only",
	icon: /* @__PURE__ */ D(i, { size: 14 }),
	title: "Activity",
	render: ({ computer: e, registerPane: t }) => /* @__PURE__ */ D(De, {
		computer: e,
		registerPane: t
	})
}, ot = {
	id: "logs",
	label: "logs",
	title: "Bot logs",
	description: "Follow this computer’s output as log lines. Pause, filter and search. Costs no shell slot.",
	statusMode: "read-only",
	icon: /* @__PURE__ */ D(a, { size: 14 }),
	render: ({ computer: e, registerPane: t }) => /* @__PURE__ */ D(Fe, {
		computer: e,
		registerPane: t
	})
}, st = {
	id: "agent",
	label: "agent",
	title: "Agent",
	description: "Watch the agent’s current run step by step. Costs no shell slot.",
	statusMode: "watching",
	icon: /* @__PURE__ */ D(r, { size: 14 }),
	render: ({ computer: e, registerPane: t }) => /* @__PURE__ */ D(Re, {
		computer: e,
		registerPane: t
	})
}, ct = [
	it,
	at,
	ot,
	st
];
function lt({ computer: e, paneId: t, registerPane: n }) {
	let r = w(null);
	return b(() => (n({
		send: (e) => r.current?.send(e) ?? !1,
		focus: () => r.current?.focus()
	}), () => n(null)), [n]), /* @__PURE__ */ D(rt, {
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
var ut = g(null);
function dt({ children: e, client: t, clientOptions: n, computers: r, useFixtures: i = !0, pollIntervalMs: a = 5e3, canManage: o = !1, enabled: s = !0, models: c, projects: l, paneKinds: u = ct, onNotify: d }) {
	let m = C(() => t ?? A(n), [t, n]), h = R({
		client: m,
		pollIntervalMs: s ? a : 0,
		enabled: s,
		...r ? { computers: r } : {},
		...i ? { fixtures: he } : {}
	}), g = f({
		client: m,
		enabled: s,
		...l ? { projects: l } : {}
	}), _ = C(() => p(g.projects, h.computers), [g.projects, h.computers]), [v, y] = T(null), [x, S] = T(null);
	b(() => {
		if (!s) {
			y(null), S(null);
			return;
		}
		let e = !1;
		return m.getStatus().then((t) => {
			e || (y(t), S(null));
		}).catch((t) => {
			e || (S(t instanceof Error ? t.message : "Runtime status unavailable"), i && y(ge));
		}), () => {
			e = !0;
		};
	}, [
		m,
		i,
		s
	]), b(() => {
		h.source === "fixture" || h.isLoading || re(h.computers.map((e) => e.sessionId));
	}, [
		h.computers,
		h.source,
		h.isLoading
	]);
	let w = c ?? _e, E = C(() => {
		let e = v?.allowedModels;
		return !e || e.length === 0 ? w : w.filter((t) => e.includes(t.id));
	}, [w, v?.allowedModels]), O = C(() => ({
		client: m,
		computers: h.computers,
		source: h.source,
		isLoading: h.isLoading,
		error: h.error,
		runtime: v,
		runtimeError: x,
		models: E,
		projects: _,
		projectsAbsent: g.absent,
		canManage: o,
		paneKinds: u,
		refresh: h.refresh,
		create: h.create,
		rename: h.rename,
		remove: h.remove,
		stop: h.stop,
		notify: d ?? (() => {})
	}), [
		m,
		h,
		v,
		x,
		E,
		_,
		g.absent,
		o,
		u,
		d
	]);
	return /* @__PURE__ */ D(ut.Provider, {
		value: O,
		children: e
	});
}
function $() {
	let e = y(ut);
	if (!e) throw Error("useCompute must be used within a ComputeProvider");
	return e;
}
function ft() {
	return y(ut);
}
//#endregion
export { oe as $, Oe as A, he as B, Be as C, Re as D, Ve as E, X as F, z as G, _e as H, De as I, se as J, ae as K, Y as L, ke as M, Me as N, Fe as O, Ae as P, re as Q, be as R, Ue as S, We as T, ge as U, ve as V, ye as W, ne as X, q as Y, ie as Z, Xe as _, ct as a, K as at, ze as b, at as c, P as ct, Je as d, N as dt, ce as et, Ke as f, F as ft, Q as g, Ze as h, st as i, pe as it, Ie as j, je as k, rt as l, j as lt, Z as m, $ as n, me as nt, ot as o, de as ot, Ye as p, A as pt, fe as q, ft as r, le as rt, it as s, R as st, dt as t, ue as tt, qe as u, M as ut, Qe as v, Ge as w, He as x, $e as y, xe as z };
