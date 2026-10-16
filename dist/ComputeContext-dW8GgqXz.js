import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-uREUOWUk.js";
import { n } from "./overlayStack-C0EBgmzL.js";
import { S as r, b as i, s as a, t as o, ut as s } from "./Icons-GSE-QGuJ.js";
import { t as c } from "./SearchInput-HK4TcIG4.js";
import { t as l } from "./DropdownMenu-CR2AWHgT.js";
import { t as u } from "./StatusDot-GwVn-q5q.js";
import { t as d } from "./InlineAlert-CBtteaVZ.js";
import { t as f } from "./LogStream-Bk8DVIVb.js";
import { t as p } from "./RisingParticles-BBIjT11W.js";
import { t as m } from "./Link-h2c9gcsw.js";
import { i as h, r as g } from "./useComputeProjects-ZSazDRet.js";
import { a as _, s as v } from "./PaneStatusLine-xsRiN9Y9.js";
import { createContext as y, forwardRef as b, useCallback as x, useContext as S, useEffect as C, useImperativeHandle as w, useLayoutEffect as T, useMemo as E, useRef as D, useState as O } from "react";
import { Fragment as ee, jsx as k, jsxs as A } from "react/jsx-runtime";
import { Terminal as te } from "@xterm/xterm";
import { FitAddon as ne } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
//#region src/components/compute/lib/computeClient.ts
async function j(e) {
	let t = `HTTP ${e.status}`;
	try {
		let n = await e.json();
		t = n.error ?? n.message ?? t;
	} catch {}
	return Error(t);
}
function M(e = {}) {
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
		if (!o.ok) throw await j(o);
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
		if (!o.ok) throw await j(o);
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
		if (!c.ok) throw await j(c);
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
var N = "ui-components.computeDock.v1", P = "ui-components.computeFleet.v1", F = "ui-components.computerLab.v1", I = [
	N,
	P,
	F
];
function L() {
	for (let e of I) try {
		globalThis.localStorage?.removeItem(e);
	} catch {}
}
//#endregion
//#region src/components/compute/hooks/useComputeFleet.ts
function R() {
	try {
		let e = globalThis.localStorage?.getItem(P);
		return e ? JSON.parse(e) : [];
	} catch {
		return [];
	}
}
function z(e) {
	try {
		globalThis.localStorage?.setItem(P, JSON.stringify(e));
	} catch {}
}
function B({ client: e, pollIntervalMs: t = 5e3, computers: n, fixtures: r, enabled: i = !0, readopt: a = !0 }) {
	let [o, s] = O(() => n ?? (R().length > 0 ? R() : r ?? [])), [c, l] = O(n ? "provided" : R().length > 0 ? "remote" : r?.length ? "fixture" : "remote"), [u, d] = O(!n), [f, p] = O(null), m = D(0), h = D(!1), g = x(async () => {
		if (n || !i) return;
		let t = ++m.current, r = () => m.current === t;
		try {
			let t = await e.listComputers();
			if (a && t.length === 0) {
				let n = R();
				n.length > 0 && (await Promise.all(n.map((t) => e.adoptComputer({
					sessionId: t.sessionId,
					label: t.label,
					createdAt: t.createdAt
				}).catch(() => {}))), t = await e.listComputers());
			}
			if (!r()) return;
			s(t), l("remote"), p(null), z(t);
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
	return C(() => {
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
		create: x(async (t) => {
			let n = await e.createComputer(t);
			return z([...R().filter((e) => e.id !== n.id), n]), await g(), n;
		}, [e, g]),
		rename: x(async (t, n) => {
			await e.renameComputer(t, n), await g();
		}, [e, g]),
		remove: x(async (t) => {
			await e.removeComputer(t), z(R().filter((e) => e.id !== t)), await g();
		}, [e, g]),
		stop: x(async (t) => {
			await e.stopSession(t), await g();
		}, [e, g])
	};
}
//#endregion
//#region src/components/compute/lib/dockStore.ts
var V = 8, H = {
	x: 120,
	y: 120,
	width: 860,
	height: 480,
	dockHeight: 360
};
function U() {
	let e = {
		mode: "hidden",
		shells: [],
		activeId: null,
		geometry: H
	};
	try {
		let t = globalThis.localStorage?.getItem(N);
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
				...H,
				...n.geometry ?? {}
			}
		};
	} catch {
		return e;
	}
}
var W = U(), G = /* @__PURE__ */ new Set();
function re() {
	try {
		globalThis.localStorage?.setItem(N, JSON.stringify({
			shells: W.shells,
			activeId: W.activeId,
			geometry: W.geometry
		}));
	} catch {}
	for (let e of G) e();
}
function K(e) {
	W = {
		...W,
		...e
	}, re();
}
function ie(e) {
	return G.add(e), () => {
		G.delete(e);
	};
}
function ae() {
	return W;
}
function oe(e) {
	let t = new Set(e), n = W.shells.filter((e) => t.has(e.sessionId));
	n.length !== W.shells.length && K({
		shells: n,
		activeId: n.some((e) => e.id === W.activeId) ? W.activeId : n[n.length - 1]?.id ?? null,
		mode: n.length === 0 ? "hidden" : W.mode
	});
}
function se(e) {
	let t = W.shells.find((t) => t.sessionId === e.sessionId);
	if (t) return K({
		activeId: t.id,
		mode: W.mode === "hidden" ? "docked" : W.mode,
		...e.cwd && e.cwd !== t.cwd ? { shells: W.shells.map((n) => n.id === t.id ? {
			...n,
			cwd: e.cwd
		} : n) } : {}
	}), {
		ok: !0,
		id: t.id
	};
	if (W.shells.length >= 8) return K({ mode: W.mode === "hidden" ? "docked" : W.mode }), {
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
	return K({
		shells: [...W.shells, n],
		activeId: n.id,
		mode: W.mode === "hidden" ? "docked" : W.mode
	}), {
		ok: !0,
		id: n.id
	};
}
function ce(e) {
	let t = W.shells.filter((t) => t.id !== e);
	K({
		shells: t,
		activeId: W.activeId === e ? t[t.length - 1]?.id ?? null : W.activeId,
		mode: t.length === 0 ? "hidden" : W.mode
	});
}
function le(e) {
	K({
		activeId: e,
		shells: W.shells.map((t) => t.id === e ? {
			...t,
			unread: !1
		} : t)
	});
}
function ue(e, t, n = !1) {
	let r = !1, i = W.shells.map((i) => {
		if (i.id !== e) return i;
		let a = n && W.activeId !== e ? !0 : i.unread;
		return i.status === t && i.unread === a ? i : (r = !0, {
			...i,
			status: t,
			unread: a
		});
	});
	r && K({ shells: i });
}
function de(e) {
	if (W.shells.length < 2) return;
	let t = W.shells.findIndex((e) => e.id === W.activeId), n = W.shells[(t + e + W.shells.length) % W.shells.length];
	n && le(n.id);
}
function fe(e) {
	let t = W.shells[e];
	t && le(t.id);
}
function pe(e) {
	K({ mode: e });
}
function me(e) {
	K({ mode: e ? W.mode === "hidden" ? "docked" : W.mode : "hidden" });
}
function he() {
	K({ mode: W.mode === "floating" ? "docked" : "floating" });
}
function ge() {
	let e = [
		"docked",
		"grid",
		"stack",
		"floating"
	];
	K({ mode: e[(e.indexOf(W.mode) + 1) % e.length] ?? "docked" });
}
function _e(e) {
	return e === "grid" || e === "stack";
}
function ve(e) {
	K({ geometry: {
		...W.geometry,
		...e
	} });
}
//#endregion
//#region src/components/compute/fixtures/computeFixture.ts
var q = (e) => `demo-session-${e}-0000000000000000`.slice(0, 40), ye = [
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
], be = {
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
}, xe = [
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
], Se = [{
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
}], Ce = {
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
}, we = /* @__PURE__ */ new Set([
	"pending",
	"in_progress",
	"completed"
]);
function Te(e) {
	let t = e.todos;
	if (!Array.isArray(t)) return null;
	let n = [];
	for (let e of t) {
		if (!e || typeof e != "object") continue;
		let t = e, r = typeof t.content == "string" ? t.content.trim() : "";
		if (!r) continue;
		let i = we.has(t.status) ? t.status : "pending", a = typeof t.activeForm == "string" && t.activeForm.trim() ? t.activeForm.trim() : void 0;
		n.push({
			content: r,
			status: i,
			...a ? { activeForm: a } : {}
		});
	}
	return n;
}
function Ee(e, t) {
	if (e === "TodoWrite") {
		let n = Te(t);
		if (n) return {
			kind: "tool",
			tool: e,
			text: `plan · ${n.filter((e) => e.status === "completed").length} of ${n.length} done`,
			plan: n
		};
	}
	return {
		kind: "tool",
		tool: e,
		text: ke(e, t)
	};
}
var J = (e) => typeof e == "string" && e.trim() ? e.trim() : void 0;
function De(e) {
	let t = {
		gate: J(e.gate) ?? "budget",
		error: J(e.error) ?? "the dispatch was refused",
		...J(e.confirmFlag) ? { confirmFlag: J(e.confirmFlag) } : {},
		...J(e.workItemId) ? { workItemId: J(e.workItemId) } : {},
		...J(e.workItemTitle) ? { workItemTitle: J(e.workItemTitle) } : {}
	}, n = [`Held at the ${t.gate} gate`, t.error];
	return t.confirmFlag && n.push(`needs ${t.confirmFlag}`), {
		kind: "gate",
		text: n.join(" · "),
		gate: t
	};
}
function Oe(e) {
	let t = typeof e.prNumber == "number" && Number.isFinite(e.prNumber) ? e.prNumber : void 0, n = {
		title: J(e.title) ?? "Change captured",
		...J(e.workItemId) ? { workItemId: J(e.workItemId) } : {},
		...J(e.branch) ? { branch: J(e.branch) } : {},
		...J(e.commitSha) ? { commitSha: J(e.commitSha) } : {},
		...J(e.prUrl) ? { prUrl: J(e.prUrl) } : {},
		...t === void 0 ? {} : { prNumber: t },
		...J(e.captureId) ? { captureId: J(e.captureId) } : {}
	}, r = ["Change posted for review", n.title];
	return n.commitSha && r.push(n.commitSha.slice(0, 7)), n.prNumber === void 0 ? n.prUrl && r.push(n.prUrl) : r.push(`PR #${n.prNumber}`), {
		kind: "delivery",
		text: r.join(" · "),
		delivery: n
	};
}
function ke(e, t) {
	let n = (...e) => {
		for (let n of e) {
			let e = t[n];
			if (typeof e == "string" && e.length > 0) return e;
		}
		return null;
	}, r = (n("file_path", "path", "notebook_path", "command", "pattern", "url", "query", "prompt") ?? n("description") ?? "").replace(/\s+/g, " ").trim();
	return r ? r.length > 96 ? `${r.slice(0, 95)}…` : r : e;
}
function Ae({ client: e, maxSteps: t = 400, onEvent: n }) {
	let [r, i] = O([]), [a, o] = O(!1), [s, c] = O(0), [l, u] = O(null), [d, f] = O(null), p = D(null), m = D(n);
	m.current = n;
	let h = x((e) => {
		i((n) => {
			let r = [...n, {
				...e,
				at: Date.now()
			}];
			return r.length > t ? r.slice(r.length - t) : r;
		});
	}, [t]), g = x(() => {
		i([]), u(null), f(null), c(0);
	}, []), _ = x(() => {
		p.current?.abort(), p.current = null, o(!1);
	}, []);
	return {
		steps: r,
		isRunning: a,
		toolCount: s,
		result: l,
		error: d,
		run: x(async (t, n) => {
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
							h(Ee(t, e.input ?? {})), c((e) => e + 1);
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
						u(t);
						let n = typeof e.result == "string" ? e.result.trim() : "";
						h({
							kind: "result",
							text: `${t.turns} turns · ${(t.durationMs / 1e3).toFixed(0)}s · $${t.costUsd.toFixed(4)}`,
							result: t,
							...n ? { summary: n } : {}
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
function je(e) {
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
			n.push(Ee(t, e.input ?? {}));
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
	if (t === "gate_refused") return {
		steps: [De(e)],
		running: !1
	};
	if (t === "delivery") return { steps: [Oe(e)] };
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
		}, n = typeof e.result == "string" ? e.result.trim() : "";
		return {
			steps: [{
				kind: "result",
				text: `${t.turns} turns · ${(t.durationMs / 1e3).toFixed(0)}s · $${t.costUsd.toFixed(4)}`,
				result: t,
				...n ? { summary: n } : {}
			}],
			result: t,
			running: !1
		};
	}
	return { steps: [] };
}
function Y({ client: e, boxId: t, maxSteps: n = 300, enabled: r = !0 }) {
	let [i, a] = O([]), [o, s] = O(!1), [c, l] = O(!1), [u, d] = O(null), [f, p] = O(null), m = D(n);
	return m.current = n, C(() => {
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
			let n = je(t);
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
var Me = {
	meta: "text-code-blue",
	text: "text-code-subtle",
	tool: "text-code-green",
	result: "text-code-mauve",
	error: "text-code-red",
	job: "text-code-blue",
	job_end: "text-code-green",
	gate: "text-code-peach",
	delivery: "text-code-green"
}, X = {
	meta: "›",
	text: "·",
	tool: "⚙",
	result: "✓",
	error: "✗",
	job: "▶",
	job_end: "✓",
	gate: "⚠",
	delivery: "⇪"
}, Ne = 200;
function Pe(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n += 1) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
	return t >>> 0;
}
function Fe({ computer: t, registerPane: r, className: i }) {
	let { client: a } = $(), o = Y({
		client: a,
		boxId: t.id
	}), s = D(null), c = D(!0), l = D(0), [u, d] = O(!0), [f, h] = O(0);
	function g() {
		let e = s.current;
		e && (e.scrollTop = e.scrollHeight), c.current = !0, d(!0), h(0);
	}
	C(() => {
		if (r) return r({ focus: () => s.current?.focus() }), () => r(null);
	}, [r]), T(() => {
		let e = s.current, t = o.steps.length - l.current;
		l.current = o.steps.length, e && (c.current ? (e.scrollTop = e.scrollHeight, f !== 0 && h(0)) : t > 0 && h((e) => e + t));
	}, [o.steps]);
	let _ = Math.max(0, o.steps.length - Ne), y = _ > 0 ? o.steps.slice(-200) : o.steps, b = v(t) === "running";
	return /* @__PURE__ */ A(p, {
		active: b,
		intensity: "low",
		seed: Pe(t.id),
		className: e("flex flex-col h-full min-h-0 bg-code-bg", i),
		"data-testid": "tail-pane-particles",
		children: [/* @__PURE__ */ A("div", {
			className: "shrink-0 flex items-center gap-2 px-2 py-1 border-b border-code-border",
			children: [
				/* @__PURE__ */ k(n, {
					size: "xs",
					mono: !0,
					tone: o.connected ? "success" : "neutral",
					dot: "static",
					children: o.connected ? "tailing" : "not connected"
				}),
				o.running && /* @__PURE__ */ k(n, {
					size: "xs",
					mono: !0,
					tone: "info",
					dot: "pulse",
					children: "running"
				}),
				/* @__PURE__ */ k("span", { className: "flex-1" }),
				/* @__PURE__ */ k("span", {
					className: "text-[10px] font-mono text-code-raised",
					children: "read-only"
				})
			]
		}), /* @__PURE__ */ A("div", {
			className: "relative flex-1 min-h-0",
			children: [/* @__PURE__ */ A("div", {
				ref: s,
				onScroll: (e) => {
					let t = e.currentTarget, n = t.scrollHeight - t.scrollTop - t.clientHeight < 32;
					c.current = n, d(n);
				},
				onKeyDown: (e) => {
					e.key === "End" && (e.preventDefault(), g());
				},
				tabIndex: 0,
				role: "log",
				"aria-label": `Activity on ${t.label}`,
				"data-testid": "tail-pane-log",
				className: "h-full overflow-y-auto px-2 py-1.5 font-mono text-[11px] leading-[1.5] flex flex-col gap-0.5 outline-none focus-visible:ring-1 focus-visible:ring-code-blue focus-visible:ring-inset",
				children: [
					_ > 0 && /* @__PURE__ */ A("div", {
						"data-testid": "tail-pane-trimmed",
						className: "text-center text-code-raised py-0.5",
						children: [
							"· earlier steps trimmed (",
							_,
							") ·"
						]
					}),
					o.error && /* @__PURE__ */ k("div", {
						className: "text-code-red",
						children: o.error
					}),
					o.steps.length === 0 && !o.error ? /* @__PURE__ */ k("div", {
						className: "text-code-raised",
						children: t.currentTask ? `waiting for output · ${t.currentTask}` : "nothing running on this box — open a terminal pane to start something"
					}) : y.map((t, r) => {
						if (t.kind === "job") return /* @__PURE__ */ A("div", {
							"data-testid": "tail-banner-job",
							className: "my-0.5 flex items-center gap-2 rounded border border-code-blue/40 bg-code-blue/10 px-2 py-1",
							children: [
								/* @__PURE__ */ k("span", {
									"aria-hidden": "true",
									className: "text-code-blue",
									children: "▶"
								}),
								/* @__PURE__ */ k("span", {
									className: "font-semibold text-code-blue break-words min-w-0",
									children: t.text
								}),
								t.jobKind && /* @__PURE__ */ k("span", {
									className: "ml-auto shrink-0 text-code-comment",
									children: t.jobKind
								})
							]
						}, r);
						if (t.kind === "job_end") {
							let n = t.jobOk !== !1;
							return /* @__PURE__ */ A("div", {
								"data-testid": "tail-banner-job-end",
								"data-ok": n,
								className: e("my-0.5 flex items-center gap-2 rounded border px-2 py-1 font-semibold", n ? "border-code-green/40 bg-code-green/10 text-code-green" : "border-code-red/40 bg-code-red/10 text-code-red"),
								children: [/* @__PURE__ */ k("span", {
									"aria-hidden": "true",
									children: n ? "✓" : "✗"
								}), /* @__PURE__ */ k("span", { children: t.text })]
							}, r);
						}
						if (t.kind === "error") return /* @__PURE__ */ A("div", {
							"data-testid": "tail-banner-error",
							className: "my-0.5 flex items-start gap-2 rounded border border-code-red/50 bg-code-red/15 px-2 py-1",
							children: [/* @__PURE__ */ k("span", {
								"aria-hidden": "true",
								className: "shrink-0 text-code-red",
								children: "✗"
							}), /* @__PURE__ */ k("span", {
								className: "min-w-0 break-words font-semibold text-code-red",
								children: t.text
							})]
						}, r);
						if (t.kind === "gate" && t.gate) return /* @__PURE__ */ A("div", {
							"data-testid": "tail-banner-gate",
							className: "my-0.5 flex items-start gap-2 rounded border border-code-peach/50 bg-code-peach/10 px-2 py-1",
							children: [/* @__PURE__ */ k("span", {
								"aria-hidden": "true",
								className: "shrink-0 text-code-peach",
								children: X.gate
							}), /* @__PURE__ */ A("span", {
								className: "min-w-0 break-words text-code-peach",
								children: [
									/* @__PURE__ */ A("span", {
										className: "font-semibold",
										children: [
											"Held at the ",
											t.gate.gate,
											" gate"
										]
									}),
									t.gate.workItemTitle && /* @__PURE__ */ A("span", {
										className: "text-code-subtle",
										children: [" · ", t.gate.workItemTitle]
									}),
									/* @__PURE__ */ k("span", {
										className: "block text-code-subtle",
										children: t.gate.error
									}),
									t.gate.confirmFlag && /* @__PURE__ */ A("span", {
										className: "block text-code-comment",
										children: ["needs ", t.gate.confirmFlag]
									})
								]
							})]
						}, r);
						if (t.kind === "delivery" && t.delivery) {
							let e = t.delivery;
							return /* @__PURE__ */ A("div", {
								"data-testid": "tail-banner-delivery",
								className: "my-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 rounded border border-code-green/40 bg-code-green/10 px-2 py-1",
								children: [
									/* @__PURE__ */ k("span", {
										"aria-hidden": "true",
										className: "shrink-0 text-code-green",
										children: X.delivery
									}),
									/* @__PURE__ */ k("span", {
										className: "font-semibold text-code-green",
										children: "Change posted for review"
									}),
									/* @__PURE__ */ k("span", {
										className: "min-w-0 break-words text-code-subtle",
										children: e.title
									}),
									e.commitSha && /* @__PURE__ */ k(n, {
										size: "xs",
										mono: !0,
										palette: "code",
										tone: "neutral",
										children: e.commitSha.slice(0, 7)
									}),
									e.prUrl ? /* @__PURE__ */ k(m, {
										href: e.prUrl,
										external: !0,
										className: "text-code-blue",
										children: e.prNumber === void 0 ? "Open PR" : `PR #${e.prNumber}`
									}) : e.prNumber === void 0 ? null : /* @__PURE__ */ A("span", {
										className: "text-code-comment",
										children: ["PR #", e.prNumber]
									})
								]
							}, r);
						}
						if (t.kind === "result" && t.result) {
							let { turns: i, durationMs: a, costUsd: o } = t.result;
							return /* @__PURE__ */ A("div", {
								"data-testid": "tail-result-chips",
								className: "my-0.5 flex flex-wrap items-center gap-1.5",
								children: [
									/* @__PURE__ */ k("span", {
										"aria-hidden": "true",
										className: e("shrink-0 w-3", Me.result),
										children: X.result
									}),
									/* @__PURE__ */ A(n, {
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
									/* @__PURE__ */ A(n, {
										size: "xs",
										mono: !0,
										palette: "code",
										tone: "neutral",
										className: "tabular-nums",
										children: [(a / 1e3).toFixed(0), "s"]
									}),
									/* @__PURE__ */ A(n, {
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
						return /* @__PURE__ */ A("div", {
							className: "flex gap-1.5 min-w-0",
							children: [
								/* @__PURE__ */ k("span", {
									"aria-hidden": "true",
									className: e("shrink-0 w-3", Me[t.kind]),
									children: X[t.kind]
								}),
								t.tool && /* @__PURE__ */ k("span", {
									className: "shrink-0 text-code-comment",
									children: t.tool
								}),
								/* @__PURE__ */ k("span", {
									className: e("min-w-0 break-words", Me[t.kind]),
									children: t.text
								})
							]
						}, r);
					})
				]
			}), u ? /* @__PURE__ */ k("div", {
				"aria-hidden": "true",
				"data-testid": "tail-pane-following",
				className: "pointer-events-none absolute bottom-1.5 right-2 text-[10px] font-mono text-code-raised",
				children: "following"
			}) : f > 0 ? /* @__PURE__ */ A("button", {
				type: "button",
				"data-testid": "tail-pane-jump",
				onClick: g,
				className: "absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-full border border-code-blue/40 bg-code-blue/20 px-2.5 py-1 text-[10px] font-mono text-code-blue shadow-sm hover:bg-code-blue/30",
				children: [f, " new ↓"]
			}) : null]
		})]
	});
}
//#endregion
//#region src/components/compute/lib/fleetSummary.ts
var Ie = [
	"running",
	"waiting",
	"error"
];
function Le(e) {
	return Ie.includes(v(e));
}
function Re(e) {
	let t = 0, n = 0, r = 0, i = 0, a = 0;
	for (let o of e) {
		let e = v(o);
		Le(o) && (t += 1), e === "waiting" ? n += 1 : e === "running" ? r += 1 : e === "error" ? i += 1 : e === "provisioning" && (a += 1);
	}
	return {
		computers: e.length,
		agents: t,
		needsYou: n,
		running: r,
		error: i,
		provisioning: a
	};
}
var ze = {
	waiting: 0,
	error: 1,
	running: 2,
	provisioning: 3,
	idle: 4,
	stopped: 5
};
function Be(e, t) {
	return ze[v(e)] - ze[v(t)];
}
function Ve(e, t) {
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
function He(e) {
	return e.kind === "local";
}
//#endregion
//#region src/components/compute/context/LabInstructContext.ts
async function Ue(e, t, n, r = 1500) {
	let i = n.filter((e) => !He(e)), a = n.length - i.length, o = (await Promise.all(i.map((n) => {
		let i = e.runTask(n.sessionId, {
			prompt: t,
			resume: !0
		}, () => {});
		return Promise.race([i.then(() => !0, () => !1), new Promise((e) => {
			setTimeout(() => e(!0), r);
		})]);
	}))).filter(Boolean).length, s = [];
	return o < i.length && s.push(`${i.length - o} refused`), a > 0 && s.push(`${a} ${a === 1 ? "laptop" : "laptops"} skipped — no runtime session`), {
		delivered: o,
		...s.length ? { detail: s.join(" · ") } : {}
	};
}
var We = y(null);
function Ge() {
	return S(We);
}
//#endregion
//#region src/components/compute/components/WorkspacePanes.tsx
function Ke(e) {
	let t = new Date(e), n = (e) => String(e).padStart(2, "0");
	return `${n(t.getHours())}:${n(t.getMinutes())}:${n(t.getSeconds())}`;
}
function qe(e) {
	let t = Math.max(0, Math.floor(e / 1e3)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function Je(e) {
	return e.kind === "error" ? "error" : e.kind === "job_end" ? e.jobOk === !1 ? "error" : "info" : e.kind === "meta" ? "debug" : e.kind === "gate" || e.kind === "text" && /\b(warn|warning|retry|retrying|timed out|slow)\b/i.test(e.text) ? "warn" : "info";
}
function Ye(e) {
	return e.kind === "tool" ? e.tool ?? "tool" : e.kind === "job" || e.kind === "job_end" ? e.jobKind ?? "dispatcher" : e.kind === "meta" ? "runtime" : e.kind === "result" ? "result" : e.kind === "error" ? "error" : e.kind === "gate" ? "gate" : e.kind === "delivery" ? "delivery" : "agent";
}
function Xe(e, t, n = 1e4) {
	let r = 0;
	for (let i = e.length - 1; i >= 0; --i) {
		let a = e[i];
		if (t - a.at > n) break;
		r += a.text.length + (a.tool?.length ?? 0);
	}
	return r / (n / 1e3);
}
function Ze(e) {
	return e >= 1024 ? `${(e / 1024).toFixed(1)} KB/s` : `${Math.round(e)} B/s`;
}
function Qe(e, t = 1e3) {
	let [n, r] = O(() => Date.now());
	return C(() => {
		if (!e) return;
		r(Date.now());
		let n = setInterval(() => r(Date.now()), t);
		return () => clearInterval(n);
	}, [e, t]), n;
}
var $e = "";
function et({ computer: t, registerPane: n, className: r }) {
	let { client: i } = $(), a = Y({
		client: i,
		boxId: t.id
	}), [o, d] = O(!1), [p, m] = O(null), [h, g] = O($e), [_, v] = O(""), [y, b] = O(!1), x = D(null), S = Qe(a.connected && !o);
	C(() => {
		if (n) return n({ focus: () => x.current?.querySelector("[role=\"log\"]")?.focus() }), () => n(null);
	}, [n]);
	let w = p == null ? a.steps : a.steps.slice(0, p), T = p == null ? 0 : a.steps.length - p, ee = E(() => [...new Set(a.steps.map(Ye))].sort(), [a.steps]), te = E(() => {
		let e = _.trim().toLowerCase();
		return w.map((e, t) => ({
			step: e,
			index: t
		})).filter(({ step: e }) => !h || Ye(e) === h).filter(({ step: t }) => !e || `${t.tool ?? ""} ${t.text}`.toLowerCase().includes(e)).map(({ step: e, index: t }) => ({
			id: `${t}`,
			timestamp: Ke(e.at),
			level: Je(e),
			source: Ye(e),
			message: e.text
		}));
	}, [
		w,
		h,
		_
	]), ne = () => {
		o ? (d(!1), m(null)) : (d(!0), m(a.steps.length));
	}, j = Xe(a.steps, S);
	return /* @__PURE__ */ A("div", {
		ref: x,
		"data-testid": "logs-pane",
		className: e("@container flex flex-col h-full min-h-0 bg-code-bg", r),
		children: [
			/* @__PURE__ */ A("div", {
				className: "shrink-0 flex items-center gap-2 px-2 py-1 border-b border-code-border text-[11px] font-mono",
				children: [
					/* @__PURE__ */ k(l, {
						trigger: /* @__PURE__ */ A("span", {
							className: "text-[11px] font-mono whitespace-nowrap",
							children: [h || "all sources", " ▾"]
						}),
						triggerLabel: "Log source",
						triggerVariant: "link",
						sections: [{ items: [{
							label: "All sources",
							active: !h,
							onSelect: () => g($e)
						}, ...ee.map((e) => ({
							label: e,
							active: e === h,
							onSelect: () => g(e)
						}))] }]
					}),
					y ? /* @__PURE__ */ k(c, {
						value: _,
						onChange: v,
						onClear: () => {
							v(""), b(!1);
						},
						placeholder: "Filter lines…",
						className: "w-40"
					}) : /* @__PURE__ */ k("button", {
						type: "button",
						onClick: () => b(!0),
						"aria-label": "Search the log",
						title: "Search the log",
						className: "inline-flex bg-transparent border-none cursor-pointer text-code-muted hover:text-code-text p-0",
						children: /* @__PURE__ */ k(s, { size: 13 })
					}),
					/* @__PURE__ */ k("span", { className: "flex-1" }),
					/* @__PURE__ */ A("span", {
						"data-testid": "logs-pane-following",
						className: "hidden @[16rem]:inline-flex items-center gap-1 text-code-muted whitespace-nowrap",
						children: [/* @__PURE__ */ k(u, {
							size: "xs",
							color: o ? "var(--color-text-tertiary)" : "var(--color-success)",
							pulse: !o && a.running
						}), o ? `Paused${T > 0 ? ` · ${T} new` : ""}` : a.connected ? "Following live" : "Not connected"]
					})
				]
			}),
			/* @__PURE__ */ k(f, {
				lines: te,
				follow: !o,
				title: null,
				tone: "transparent",
				showSource: !0,
				className: "flex-1 min-h-0 rounded-none border-0 shadow-none",
				emptyMessage: a.error ?? (t.currentTask ? `waiting for output · ${t.currentTask}` : "Nothing has been logged on this computer yet."),
				"data-testid": "logs-pane-stream"
			}),
			/* @__PURE__ */ A("div", {
				className: "shrink-0 flex items-center gap-2 px-2 py-1 border-t border-code-border text-[11px] font-mono text-code-muted",
				children: [
					/* @__PURE__ */ k(u, {
						size: "xs",
						color: o ? "var(--color-text-tertiary)" : "var(--color-success)"
					}),
					/* @__PURE__ */ A("span", {
						"data-testid": "logs-pane-rate",
						className: "tabular-nums",
						children: [
							o ? "Paused" : "Following",
							" · ",
							Ze(j)
						]
					}),
					/* @__PURE__ */ k("span", { className: "flex-1" }),
					/* @__PURE__ */ k("button", {
						type: "button",
						onClick: ne,
						"aria-pressed": o,
						"data-testid": "logs-pane-pause",
						className: "bg-transparent border border-code-border rounded px-1.5 py-0.5 cursor-pointer text-code-text hover:bg-code-surface",
						children: o ? "▶ Resume" : "⏸ Pause"
					})
				]
			})
		]
	});
}
function tt(e) {
	for (let t = e.length - 1; t >= 0; --t) if (e[t].kind === "job") return e.slice(t);
	return [...e];
}
function nt(e) {
	for (let t = e.length - 1; t >= 0; --t) {
		let n = e[t].plan;
		if (n) return n;
	}
	return null;
}
function rt(e) {
	for (let t = e.length - 1; t >= 0; --t) {
		let n = e[t];
		if (n.kind === "result" && n.summary) return n.summary;
		if (n.kind === "text" && n.text) return n.text;
		if (n.kind === "meta" && !n.text.startsWith("model: ")) return null;
	}
	return null;
}
var it = {
	tool: "✓",
	result: "✓",
	job_end: "✓",
	error: "✗",
	job: "▶",
	meta: "›",
	text: "·",
	gate: "⚠",
	delivery: "⇪"
}, at = {
	completed: {
		glyph: "✓",
		className: "text-code-green",
		word: "done"
	},
	in_progress: {
		glyph: "◌",
		className: "text-code-blue animate-pulse motion-reduce:animate-none",
		word: "in progress"
	},
	pending: {
		glyph: "○",
		className: "text-code-muted",
		word: "pending"
	}
};
function ot({ plan: t }) {
	let n = t.filter((e) => e.status === "completed").length;
	return /* @__PURE__ */ A("section", {
		"data-testid": "agent-pane-plan",
		"aria-label": "Plan",
		className: "shrink-0 px-3 py-2 border-b border-code-border",
		children: [/* @__PURE__ */ A("div", {
			className: "flex items-center gap-2 text-[11px] text-code-muted",
			children: [/* @__PURE__ */ k("span", {
				className: "font-semibold text-code-text",
				children: "Plan"
			}), /* @__PURE__ */ A("span", {
				"data-testid": "agent-pane-plan-tally",
				className: "tabular-nums",
				children: [
					n,
					" of ",
					t.length,
					" done"
				]
			})]
		}), /* @__PURE__ */ k("ol", {
			className: "m-0 mt-1 p-0 list-none flex flex-col gap-0.5",
			children: t.map((t, n) => {
				let r = at[t.status];
				return /* @__PURE__ */ A("li", {
					"data-plan-status": t.status,
					className: "flex gap-2 min-w-0",
					children: [
						/* @__PURE__ */ k("span", {
							"aria-hidden": "true",
							className: e("shrink-0 w-3", r.className),
							children: r.glyph
						}),
						/* @__PURE__ */ A("span", {
							className: "sr-only",
							children: [r.word, ": "]
						}),
						/* @__PURE__ */ k("span", {
							className: e("min-w-0 break-words", t.status === "completed" ? "text-code-muted line-through" : t.status === "in_progress" ? "text-code-text" : "text-code-subtle"),
							children: t.status === "in_progress" && t.activeForm ? t.activeForm : t.content
						})
					]
				}, `${n}-${t.content}`);
			})
		})]
	});
}
function st({ computer: e, question: n }) {
	let { client: r, notify: i } = $(), a = Ge(), [o, s] = O(""), [c, l] = O(!1), [u, f] = O(null), p = He(e), m = async (t) => {
		t?.preventDefault();
		let n = o.trim();
		if (!(!n || c || p)) {
			l(!0), f(null);
			try {
				let t = a ? await a(n, [e]) : await Ue(r, n, [e]);
				(t?.delivered ?? 1) > 0 ? (s(""), i({
					tone: "success",
					title: `Reply sent to ${e.label}`
				})) : f(t?.detail ?? `${e.label} did not take the reply.`);
			} catch (e) {
				f(e instanceof Error ? e.message : "The reply was not sent.");
			} finally {
				l(!1);
			}
		}
	};
	return /* @__PURE__ */ A("div", {
		"data-testid": "agent-pane-question",
		className: "shrink-0 px-3 py-2 border-t border-code-border flex flex-col gap-1.5",
		children: [
			/* @__PURE__ */ A(d, {
				tone: "warning",
				palette: "code",
				className: "text-[12px]",
				children: [/* @__PURE__ */ k("span", {
					className: "block font-semibold",
					children: "Needs you"
				}), /* @__PURE__ */ k("span", {
					"data-testid": "agent-pane-question-text",
					className: "block break-words text-code-text",
					children: n
				})]
			}),
			p ? /* @__PURE__ */ k("span", {
				className: "text-[11px] text-code-muted",
				children: "This laptop has no runtime session to resume — answer it from its own terminal."
			}) : /* @__PURE__ */ A("form", {
				onSubmit: (e) => void m(e),
				className: "flex items-end gap-2",
				children: [/* @__PURE__ */ k("textarea", {
					"data-testid": "agent-pane-reply",
					"aria-label": `Reply to ${e.label}`,
					rows: 2,
					value: o,
					disabled: c,
					onChange: (e) => s(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && !e.shiftKey && (e.preventDefault(), m());
					},
					placeholder: "Answer the agent — ⏎ to send",
					className: "flex-1 min-w-0 resize-none rounded border border-code-border bg-code-surface px-2 py-1 text-[12px] text-code-text caret-code-blue placeholder:text-code-raised outline-none focus-visible:ring-1 focus-visible:ring-code-blue disabled:opacity-60"
				}), /* @__PURE__ */ k(t, {
					type: "submit",
					size: "sm",
					tone: "code",
					variant: "primary",
					disabled: c || !o.trim(),
					"data-testid": "agent-pane-reply-send",
					children: c ? "Sending…" : "Reply"
				})]
			}),
			u && /* @__PURE__ */ k(d, {
				tone: "error",
				palette: "code",
				className: "text-[12px]",
				"data-testid": "agent-pane-reply-error",
				children: u
			})
		]
	});
}
function ct({ step: e }) {
	let t = e.gate;
	return /* @__PURE__ */ A("div", {
		className: "min-w-0 flex-1 rounded border border-code-peach/50 bg-code-peach/10 px-2 py-1 text-code-peach",
		children: [
			/* @__PURE__ */ A("span", {
				className: "font-semibold",
				children: [
					"Held at the ",
					t.gate,
					" gate"
				]
			}),
			t.workItemTitle && /* @__PURE__ */ A("span", {
				className: "text-code-subtle",
				children: [" · ", t.workItemTitle]
			}),
			/* @__PURE__ */ k("span", {
				className: "block break-words text-code-subtle",
				children: t.error
			}),
			t.confirmFlag && /* @__PURE__ */ A("span", {
				className: "block text-code-muted",
				children: ["needs ", t.confirmFlag]
			})
		]
	});
}
function lt({ step: e }) {
	let t = e.delivery;
	return /* @__PURE__ */ A("div", {
		className: "min-w-0 flex-1 flex flex-wrap items-center gap-x-2 gap-y-1 rounded border border-code-green/40 bg-code-green/10 px-2 py-1",
		children: [
			/* @__PURE__ */ k("span", {
				className: "font-semibold text-code-green",
				children: "Change posted for review"
			}),
			/* @__PURE__ */ k("span", {
				className: "min-w-0 break-words text-code-subtle",
				children: t.title
			}),
			t.commitSha && /* @__PURE__ */ k(n, {
				size: "xs",
				mono: !0,
				palette: "code",
				tone: "neutral",
				children: t.commitSha.slice(0, 7)
			}),
			t.prUrl ? /* @__PURE__ */ k(m, {
				href: t.prUrl,
				external: !0,
				className: "text-code-blue",
				"data-testid": "agent-pane-pr-link",
				children: t.prNumber === void 0 ? "Open PR" : `PR #${t.prNumber}`
			}) : t.prNumber === void 0 ? null : /* @__PURE__ */ A("span", {
				className: "text-code-muted",
				children: ["PR #", t.prNumber]
			})
		]
	});
}
function ut({ computer: t, registerPane: n, className: r }) {
	let { client: i } = $(), a = Y({
		client: i,
		boxId: t.id
	}), o = D(null), s = v(t), c = a.running || s === "running", l = Qe(c);
	C(() => {
		if (n) return n({ focus: () => o.current?.focus() }), () => n(null);
	}, [n]);
	let u = tt(a.steps), d = nt(u), f = u.filter((e) => !e.plan);
	C(() => {
		let e = o.current;
		e && (e.scrollTop = e.scrollHeight);
	}, [f.length]);
	let p = f.filter((e) => e.kind === "tool"), m = c ? f.map((e) => e.kind).lastIndexOf("tool") : -1, h = u[0]?.at ?? null, g = u.some((e) => e.kind === "error"), _ = u.some((e) => e.kind === "gate"), y = s === "waiting" ? rt(a.steps) ?? t.currentTask ?? null : null;
	return /* @__PURE__ */ A("div", {
		"data-testid": "agent-pane",
		className: e("flex flex-col h-full min-h-0 bg-code-bg font-mono text-[12px]", r),
		children: [
			t.currentTask && /* @__PURE__ */ k("div", {
				className: "shrink-0 px-3 py-1.5 border-b border-code-border text-code-subtle truncate",
				title: t.currentTask,
				children: t.currentTask
			}),
			d && d.length > 0 && /* @__PURE__ */ k(ot, { plan: d }),
			/* @__PURE__ */ A("ol", {
				ref: o,
				tabIndex: 0,
				"aria-label": `Agent steps on ${t.label}`,
				className: "flex-1 min-h-0 overflow-y-auto m-0 px-3 py-2 list-none flex flex-col gap-1 outline-none focus-visible:ring-1 focus-visible:ring-code-blue focus-visible:ring-inset",
				children: [f.length === 0 && /* @__PURE__ */ k("li", {
					className: "text-code-muted",
					children: a.error ?? (s === "provisioning" ? "Starting the computer — the agent’s steps appear once it is up." : t.currentTask ? "Waiting for the agent’s first step…" : "No agent run on this computer yet.")
				}), f.map((t, n) => {
					let r = n === m;
					return /* @__PURE__ */ A("li", {
						"data-step-kind": t.kind,
						className: "flex gap-2 min-w-0",
						children: [
							/* @__PURE__ */ k("span", {
								className: "shrink-0 text-code-muted tabular-nums",
								children: Ke(t.at)
							}),
							/* @__PURE__ */ k("span", {
								"aria-hidden": "true",
								className: e("shrink-0 w-3", r ? "text-code-blue animate-pulse" : t.kind === "error" ? "text-code-red" : t.kind === "gate" ? "text-code-peach" : t.kind === "tool" || t.kind === "result" || t.kind === "delivery" ? "text-code-green" : "text-code-muted"),
								children: r ? "◌" : it[t.kind] ?? "·"
							}),
							t.kind === "gate" && t.gate ? /* @__PURE__ */ k(ct, { step: t }) : t.kind === "delivery" && t.delivery ? /* @__PURE__ */ k(lt, { step: t }) : /* @__PURE__ */ A(ee, { children: [t.tool && /* @__PURE__ */ k("span", {
								className: "shrink-0 text-code-text",
								children: t.tool
							}), /* @__PURE__ */ k("span", {
								className: e("min-w-0 break-words", t.kind === "error" ? "text-code-red" : "text-code-subtle"),
								children: t.text
							})] })
						]
					}, `${t.at}-${n}`);
				})]
			}),
			y && /* @__PURE__ */ k(st, {
				computer: t,
				question: y
			}),
			/* @__PURE__ */ A("div", {
				className: "shrink-0 flex items-center gap-2 px-3 py-1 border-t border-code-border text-[11px] text-code-muted",
				children: [
					/* @__PURE__ */ A("span", {
						"data-testid": "agent-pane-tally",
						className: "tabular-nums",
						children: [
							p.length - +(m >= 0),
							" done",
							m >= 0 && " · 1 running",
							_ && " · held at a gate",
							g && " · failed"
						]
					}),
					/* @__PURE__ */ k("span", { className: "flex-1" }),
					h != null && /* @__PURE__ */ A("span", {
						className: "tabular-nums",
						title: "Since this run's first step",
						children: [c ? "⟳ " : "", qe((c ? l : u[u.length - 1].at) - h)]
					})
				]
			})
		]
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
}, dt = 65536, ft = 29, pt = 3e4, mt = 5;
function Q(e, t) {
	let n = t ?? /* @__PURE__ */ new Uint8Array(), r = new Uint8Array(n.length + 1);
	return r[0] = e, r.set(n, 1), r;
}
function ht(e, t) {
	return Q(Z.RESIZE, new TextEncoder().encode(JSON.stringify({
		width: e,
		height: t
	})));
}
function gt(e) {
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
function _t(e, t) {
	return e === 1006 && t >= 5 ? "could not connect — the runtime may already hold 10 shells; close one and retry" : null;
}
function vt(e) {
	let t = (e.details?.causes ?? []).find((e) => e.reason === "ExitCode")?.message;
	if (t == null) return null;
	let n = Number.parseInt(t, 10);
	return Number.isNaN(n) ? null : n;
}
//#endregion
//#region src/components/compute/components/ShellTerminal.tsx
function yt(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n += 1) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
	return t >>> 0;
}
function bt(e) {
	e && (e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close());
}
function xt(e, t) {
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
var St = b(function({ sessionId: t, shellId: n, label: r, cwd: i, onExit: a, height: o = 460, chrome: s = !0, fillHeight: c = !1, autoConnect: l = !1, onStatus: u, background: d, className: f }, m) {
	let { client: h, computers: g } = $(), y = D(null);
	C(() => {
		let e = () => b.current, t = () => {
			let t = e();
			t && (t.options.theme = xt(d, y.current));
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
	let b = D(null), S = D(null), T = D(null), E = D(n), j = D(a);
	j.current = a;
	let M = D(u);
	M.current = u;
	let N = D(null), P = D(0), F = D(!1), I = D(null), L = D(!1), [R, z] = O("idle"), [B, V] = O(""), H = x(async () => {
		let e = b.current;
		if (!e || L.current) return;
		I.current &&= (clearTimeout(I.current), null), z("connecting"), V(""), M.current?.("connecting");
		let n;
		try {
			let e = await h.getShellUrl(t, E.current);
			n = e.url, e.shellId && (E.current = e.shellId);
		} catch (e) {
			z("error"), V(e instanceof Error ? e.message : "could not mint a shell URL"), M.current?.("error");
			return;
		}
		if (L.current) return;
		bt(T.current), T.current = null;
		let r = new WebSocket(n);
		r.binaryType = "arraybuffer", T.current = r, r.onopen = () => {
			P.current = 0, F.current = !1, z("live"), M.current?.("ready");
			let t = S.current;
			t && (t.fit(), r.send(ht(e.cols, e.rows))), i && r.send(Q(Z.STDIN, new TextEncoder().encode(`cd ${i} 2>/dev/null || true\n`))), e.focus();
		}, r.onmessage = (t) => {
			let n = new Uint8Array(t.data);
			if (n.length === 0) return;
			let i = n[0], a = n.subarray(1);
			if (i === Z.STDOUT || i === Z.STDERR) {
				e.write(a), M.current?.("busy", !0), N.current && clearTimeout(N.current), N.current = setTimeout(() => M.current?.("ready"), 700);
				return;
			}
			if (i === Z.STATUS) {
				try {
					let e = JSON.parse(new TextDecoder().decode(a));
					if (e.metadata?.shellId) {
						E.current = e.metadata.shellId;
						let t = e.metadata.bytesDropped;
						V(e.metadata.reconnected ? `reattached${t ? ` · ${t} bytes lost while away` : ""}` : "new shell");
						return;
					}
					j.current?.(vt(e));
				} catch {}
				return;
			}
			i === Z.CLOSE && r.close();
		}, r.onclose = (e) => {
			if (T.current = null, F.current) {
				z("detached"), V("detached — shell still running"), M.current?.("detached");
				return;
			}
			let t = gt(e.code);
			if (V(t.text), t.retry && P.current < 5 && !L.current) {
				P.current += 1, z("connecting"), I.current = setTimeout(() => void H(), Math.min(500 * 2 ** P.current, 8e3));
				return;
			}
			z(e.code === 1e3 ? "closed" : "error"), M.current?.(e.code === 1e3 ? "detached" : "error");
			let n = _t(e.code, P.current);
			n && V(n);
		}, r.onerror = () => {};
	}, [
		h,
		t,
		i
	]);
	C(() => {
		if (!y.current) return;
		L.current = !1;
		let e = new te({
			convertEol: !1,
			cursorBlink: !0,
			fontSize: 12,
			fontFamily: "\"Fira Code\", ui-monospace, SFMono-Regular, Menlo, monospace",
			theme: xt(d, y.current),
			scrollback: 5e3
		}), t = new ne();
		e.loadAddon(t), e.open(y.current), t.fit(), b.current = e, S.current = t;
		let n = e.onData((t) => {
			let n = T.current;
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
			n.send(Q(Z.STDIN, r));
		}), r = e.onResize(({ cols: e, rows: t }) => {
			let n = T.current;
			n?.readyState === WebSocket.OPEN && n.send(ht(e, t));
		}), i = () => t.fit();
		globalThis.addEventListener("resize", i);
		let a = typeof ResizeObserver == "function" ? new ResizeObserver(() => t.fit()) : null;
		a && y.current && a.observe(y.current);
		let o = setInterval(() => {
			let e = T.current;
			e?.readyState === WebSocket.OPEN && e.send(Q(Z.HEARTBEAT));
		}, pt);
		return () => {
			L.current = !0, I.current && clearTimeout(I.current), N.current && clearTimeout(N.current), clearInterval(o), globalThis.removeEventListener("resize", i), a?.disconnect(), n.dispose(), r.dispose(), bt(T.current), T.current = null, e.dispose(), b.current = null;
		};
	}, []), C(() => {
		l && R === "idle" && H();
	}, [
		l,
		R,
		H
	]);
	let U = x(() => {
		F.current = !0, T.current?.close();
	}, []), W = x(() => {
		let e = T.current;
		e?.readyState === WebSocket.OPEN && e.send(Q(Z.CLOSE));
	}, []);
	w(m, () => ({
		send: (e) => {
			let t = T.current;
			if (!t || t.readyState !== WebSocket.OPEN) return !1;
			let n = new TextEncoder().encode(e);
			return n.length > 65536 ? !1 : (t.send(Q(Z.STDIN, n)), !0);
		},
		detach: U,
		kill: W,
		focus: () => b.current?.focus(),
		refit: () => S.current?.fit(),
		connect: () => void H()
	}), [
		H,
		U,
		W
	]);
	let G = R === "live", re = v(g.find((e) => e.sessionId === t)) === "running" && !!g.find((e) => e.sessionId === t), K = _[G ? "ready" : R === "error" ? "error" : R === "detached" || R === "closed" ? "detached" : "connecting"];
	return /* @__PURE__ */ A("div", {
		style: d ? { background: d } : void 0,
		className: e("flex flex-col", d ? "" : "bg-terminal-bg", c ? "h-full min-h-0" : "rounded-lg overflow-hidden border border-code-border", f),
		children: [
			s && /* @__PURE__ */ A(p, {
				active: re,
				intensity: "low",
				seed: yt(t),
				className: "flex items-center gap-2 px-3 py-2 border-b border-code-border shrink-0",
				"data-testid": "shell-terminal-particles",
				children: [
					/* @__PURE__ */ k("span", {
						className: "text-[11px] font-semibold text-code-text",
						children: r ?? "terminal"
					}),
					/* @__PURE__ */ A("span", {
						className: e("text-[10px]", G ? "text-code-green" : R === "error" ? "text-code-red" : "text-code-muted"),
						title: K.help,
						children: [R, B ? ` · ${B}` : ""]
					}),
					/* @__PURE__ */ k("span", { className: "flex-1" }),
					E.current && /* @__PURE__ */ k("span", {
						className: "text-[9.5px] text-code-muted font-mono hidden md:inline",
						children: E.current
					}),
					G ? /* @__PURE__ */ A(ee, { children: [/* @__PURE__ */ k("button", {
						type: "button",
						onClick: U,
						title: "Leave the shell running (Ctrl-])",
						className: "text-[10px] px-2 py-0.5 rounded border border-code-border text-code-muted hover:text-code-text cursor-pointer bg-transparent",
						children: "detach"
					}), /* @__PURE__ */ k("button", {
						type: "button",
						onClick: W,
						title: "Kill the shell — it cannot be reattached",
						className: "text-[10px] px-2 py-0.5 rounded border border-code-border text-code-muted hover:text-code-red cursor-pointer bg-transparent",
						children: "kill"
					})] }) : /* @__PURE__ */ k("button", {
						type: "button",
						onClick: () => void H(),
						disabled: R === "connecting",
						className: "text-[10px] px-2 py-0.5 rounded border border-code-border text-code-green hover:bg-code-panel cursor-pointer bg-transparent disabled:cursor-not-allowed disabled:opacity-50",
						children: R === "connecting" ? "connecting" : R === "detached" || R === "closed" ? "reattach" : "connect"
					})
				]
			}),
			!s && R !== "live" && /* @__PURE__ */ A("div", {
				className: "px-3 py-1 text-[10px] border-b border-code-border flex items-center gap-2 shrink-0",
				children: [/* @__PURE__ */ A("span", {
					className: R === "error" ? "text-code-red" : "text-code-subtle",
					children: [R, B ? ` · ${B}` : ""]
				}), R !== "connecting" && /* @__PURE__ */ k("button", {
					type: "button",
					onClick: () => void H(),
					className: "text-code-green bg-transparent border-none cursor-pointer p-0 hover:underline",
					children: R === "idle" ? "connect" : "reattach"
				})]
			}),
			/* @__PURE__ */ k("div", {
				ref: y,
				"data-ui-code-surface": "terminal",
				style: c ? void 0 : { height: o },
				className: e("px-2 py-1", c && "flex-1 min-h-0")
			})
		]
	});
}), Ct = {
	id: "shell",
	label: "shell",
	description: "A real terminal on this computer.",
	quota: "shell",
	inputSuffix: "\n",
	statusMode: "pty",
	icon: /* @__PURE__ */ k(i, { size: 14 }),
	title: "Shell",
	appliesTo: (e) => !He(e),
	render: (e) => /* @__PURE__ */ k(Ot, { ...e })
}, wt = {
	id: "tail",
	label: "tail",
	description: "Watch what is running here, including runs started elsewhere. Costs no shell slot.",
	statusMode: "read-only",
	icon: /* @__PURE__ */ k(o, { size: 14 }),
	title: "Activity",
	render: ({ computer: e, registerPane: t }) => /* @__PURE__ */ k(Fe, {
		computer: e,
		registerPane: t
	})
}, Tt = {
	id: "logs",
	label: "logs",
	title: "Bot logs",
	description: "Follow this computer’s output as log lines. Pause, filter and search. Costs no shell slot.",
	statusMode: "read-only",
	icon: /* @__PURE__ */ k(r, { size: 14 }),
	render: ({ computer: e, registerPane: t }) => /* @__PURE__ */ k(et, {
		computer: e,
		registerPane: t
	})
}, Et = {
	id: "agent",
	label: "agent",
	title: "Agent",
	description: "Watch the agent’s current run step by step. Costs no shell slot.",
	statusMode: "watching",
	icon: /* @__PURE__ */ k(a, { size: 14 }),
	render: ({ computer: e, registerPane: t }) => /* @__PURE__ */ k(ut, {
		computer: e,
		registerPane: t
	})
}, Dt = [
	Ct,
	wt,
	Tt,
	Et
];
function Ot({ computer: e, paneId: t, registerPane: n }) {
	let r = D(null);
	return C(() => (n({
		send: (e) => r.current?.send(e) ?? !1,
		focus: () => r.current?.focus()
	}), () => n(null)), [n]), /* @__PURE__ */ k(St, {
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
var kt = y(null);
function At({ children: e, client: t, clientOptions: n, computers: r, useFixtures: i = !0, pollIntervalMs: a = 5e3, canManage: o = !1, enabled: s = !0, models: c, projects: l, paneKinds: u = Dt, onNotify: d }) {
	let f = E(() => t ?? M(n), [t, n]), p = B({
		client: f,
		pollIntervalMs: s ? a : 0,
		enabled: s,
		...r ? { computers: r } : {},
		...i ? { fixtures: ye } : {}
	}), m = h({
		client: f,
		enabled: s,
		...l ? { projects: l } : {}
	}), _ = E(() => g(m.projects, p.computers), [m.projects, p.computers]), [v, y] = O(null), [b, x] = O(null);
	C(() => {
		if (!s) {
			y(null), x(null);
			return;
		}
		let e = !1;
		return f.getStatus().then((t) => {
			e || (y(t), x(null));
		}).catch((t) => {
			e || (x(t instanceof Error ? t.message : "Runtime status unavailable"), i && y(be));
		}), () => {
			e = !0;
		};
	}, [
		f,
		i,
		s
	]), C(() => {
		p.source === "fixture" || p.isLoading || oe(p.computers.map((e) => e.sessionId));
	}, [
		p.computers,
		p.source,
		p.isLoading
	]);
	let S = c ?? xe, w = E(() => {
		let e = v?.allowedModels;
		return !e || e.length === 0 ? S : S.filter((t) => e.includes(t.id));
	}, [S, v?.allowedModels]), T = E(() => ({
		client: f,
		computers: p.computers,
		source: p.source,
		isLoading: p.isLoading,
		error: p.error,
		runtime: v,
		runtimeError: b,
		models: w,
		projects: _,
		projectsAbsent: m.absent,
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
		b,
		w,
		_,
		m.absent,
		o,
		u,
		d
	]);
	return /* @__PURE__ */ k(kt.Provider, {
		value: T,
		children: e
	});
}
function $() {
	let e = S(kt);
	if (!e) throw Error("useCompute must be used within a ComputeProvider");
	return e;
}
function jt() {
	return S(kt);
}
//#endregion
export { be as $, Ye as A, Re as B, Ke as C, M as Ct, nt as D, Ze as E, ze as F, De as G, je as H, Be as I, Ee as J, Te as K, Le as L, Ue as M, Ge as N, rt as O, Ie as P, xe as Q, He as R, Xe as S, L as St, qe as T, Y as U, Fe as V, Oe as W, ye as X, Ae as Y, Se as Z, ht as _, B as _t, Dt as a, le as at, ut as b, P as bt, wt as c, oe as ct, pt as d, me as dt, Ce as et, dt as f, ve as ft, Q as g, he as gt, gt as h, ie as ht, Et as i, de as it, We as j, Je as k, St as l, ue as lt, Z as m, _e as mt, $ as n, ce as nt, Tt as o, ae as ot, mt as p, pe as pt, ke as q, jt as r, ge as rt, Ct as s, se as st, At as t, V as tt, ft as u, fe as ut, _t as v, I as vt, tt as w, et as x, F as xt, vt as y, N as yt, Ve as z };
