import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { r as t } from "./IdentityContext-CQM1qwH6.js";
import { t as n } from "./apiBaseUrl-DLrXlmVj.js";
import { n as r } from "./WebSocketContext-DUvjGLFq.js";
import { t as i } from "./usePrefersReducedMotion-Cllucr7i.js";
import { t as a } from "./cn-DhjIN-s0.js";
import { t as o } from "./Input-DLknWXri.js";
import { n as s, r as c } from "./EventStreamContext-CLzG8O5_.js";
import { createContext as l, forwardRef as u, useCallback as d, useContext as f, useEffect as p, useId as m, useMemo as h, useRef as g, useState as _ } from "react";
import { Fragment as v, jsx as y, jsxs as b } from "react/jsx-runtime";
import "ajv";
//#region src/api/pipelineRetry.ts
async function x(e, t) {
	let n = `/api/pipelines/${e}/runs/${t}/force-fail`, r = await fetch(n, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include"
	});
	if (!r.ok) {
		let e = await r.text();
		throw Error(`Force-fail failed: ${r.status} ${e}`);
	}
	return r.json();
}
async function S(e, t, n, r, i) {
	let a = `/api/pipelines/${e}/runs/${t}/retry/${n}`, o = await fetch(a, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({
			inputs: r,
			...i ? { snapshotInput: i } : {}
		})
	});
	if (!o.ok) {
		let e = await o.text();
		throw Error(`Failed to retry from node ${n}: ${o.status} ${e}`);
	}
	return o.json();
}
//#endregion
//#region src/components/pipelines/persistence/runHistory.ts
var C = "ws_pipeline_runs_v1:", w = 50;
function T(e) {
	return `${C}${e}`;
}
var E = !1;
function D(e, t) {
	try {
		localStorage.setItem(e, t);
	} catch (e) {
		E || (E = !0, console.warn("[runHistory] localStorage write failed", e));
	}
}
function O(e) {
	if (typeof e != "object" || !e) return null;
	let t = e;
	return typeof t.id == "string" ? {
		...t,
		steps: typeof t.steps == "object" && t.steps !== null ? t.steps : {},
		startedAt: typeof t.startedAt == "string" ? t.startedAt : ""
	} : null;
}
function k(e) {
	try {
		let t = localStorage.getItem(T(e));
		if (!t) return [];
		let n = JSON.parse(t);
		return Array.isArray(n) ? n.map(O).filter((e) => e !== null) : [];
	} catch {
		return [];
	}
}
function A(e, t) {
	let n = O(t);
	if (!n) return;
	let r = [n, ...k(e).filter((e) => e.id !== n.id)].sort((e, t) => t.startedAt.localeCompare(e.startedAt)).slice(0, w);
	D(T(e), JSON.stringify(r));
}
function j(e) {
	try {
		localStorage.removeItem(T(e));
	} catch {}
}
//#endregion
//#region src/api/pipelineRuns.ts
var M = /* @__PURE__ */ e({
	getPipelineRun: () => P,
	listPipelineRuns: () => N
});
async function N(e, t) {
	let n = new URLSearchParams();
	t?.limit && n.set("limit", String(t.limit)), t?.cursor && n.set("cursor", t.cursor);
	let r = `/api/pipelines/${e}/runs${n.toString() ? `?${n}` : ""}`;
	try {
		let e = await fetch(r, {
			headers: { "Content-Type": "application/json" },
			credentials: "include"
		});
		if (!e.ok) throw Error(`Failed to list runs: ${e.status} ${e.statusText}`);
		let t = await e.json();
		return Array.isArray(t.runs) && (t.runs = t.runs.map((e) => ({
			...e,
			id: e.id ?? e.runId
		})).sort((e, t) => {
			let n = e.startedAt ? new Date(e.startedAt).getTime() : 0;
			return (t.startedAt ? new Date(t.startedAt).getTime() : 0) - n;
		})), t;
	} catch (e) {
		throw console.error("[pipelineRuns] Failed to fetch from API:", e), e;
	}
}
async function P(e, t) {
	let n = `/api/v2/pipelines/${encodeURIComponent(e)}/runs/${encodeURIComponent(t)}`;
	try {
		let e = await fetch(n, {
			headers: { "Content-Type": "application/json" },
			credentials: "include"
		});
		if (e.status === 404) return null;
		if (!e.ok) throw Error(`Failed to get run: ${e.status} ${e.statusText}`);
		let t = await e.json();
		return {
			...t,
			id: t.runId
		};
	} catch (e) {
		throw console.error("[pipelineRuns] Failed to fetch run:", e), e;
	}
}
//#endregion
//#region src/components/pipelines/persistence/pipelineStorage.ts
var F = "ws_pipelines_v1_index", I = "ws_pipelines_v1:";
function L(e) {
	return `${I}${e}`;
}
var ee = !1;
function R(e, t) {
	try {
		localStorage.setItem(e, t);
	} catch (e) {
		ee || (ee = !0, console.warn("[pipelineStorage] localStorage write failed", e));
	}
}
function z() {
	try {
		let e = localStorage.getItem(F);
		if (!e) return [];
		let t = JSON.parse(e);
		return Array.isArray(t) ? t : [];
	} catch {
		return [];
	}
}
function B(e) {
	R(F, JSON.stringify(e));
}
function V(e) {
	let t = z(), n = {
		id: e.id,
		name: e.name,
		status: e.status,
		updatedAt: e.updatedAt
	}, r = t.findIndex((t) => t.id === e.id);
	if (r === -1) e.icon && (n.icon = e.icon), e.tags && e.tags.length > 0 && (n.tags = [...e.tags]), t.push(n);
	else {
		let i = e.icon ?? t[r].icon, a = e.tags ?? t[r].tags, o = { ...n };
		i && (o.icon = i), a && a.length > 0 && (o.tags = [...a]), t[r] = o;
	}
	B(t);
}
function te(e) {
	B(z().filter((t) => t.id !== e));
}
function H() {
	return z();
}
function U(e) {
	try {
		let t = localStorage.getItem(L(e));
		return t ? JSON.parse(t) : null;
	} catch {
		return null;
	}
}
function W(e) {
	e.version = (e.version ?? 0) + 1, e.updatedAt = (/* @__PURE__ */ new Date()).toISOString(), R(L(e.id), JSON.stringify(e)), V(e);
}
function ne(e) {
	R(L(e.id), JSON.stringify(e));
}
function G(e) {
	R(L(e.id), JSON.stringify(e)), V(e);
}
function K(e) {
	try {
		localStorage.removeItem(L(e));
	} catch {}
	te(e);
}
function re(e) {
	let t = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), u = crypto.randomUUID(), d = crypto.randomUUID(), f = crypto.randomUUID(), p = crypto.randomUUID(), m = {
		type: "trigger",
		triggerType: "manual"
	}, h = {
		type: "llm",
		provider: "bedrock",
		model: "claude-sonnet-4-6",
		systemPrompt: "Summarize this document",
		userPromptTemplate: "{{context.documentBody}}",
		temperature: .3,
		maxTokens: 1024,
		streaming: !0
	}, g = {
		type: "condition",
		expression: `context.steps.${r}.llm.tokensOut > 200`,
		label: "Long summary?"
	}, _ = {
		type: "fork",
		branchCount: 2,
		branchLabels: ["post-comment", "notify-user"]
	}, v = {
		type: "action",
		actionType: "post-comment",
		config: { body: "{{context.steps." + r + ".response}}" },
		onError: "route-error"
	}, y = {
		type: "action",
		actionType: "notify",
		config: {
			recipient: "{{context.triggeredBy.userId}}",
			message: "Your document summary is ready for review."
		},
		onError: "route-error"
	}, b = {
		type: "join",
		mode: "all",
		mergeStrategy: "deep-merge"
	}, x = {
		type: "approval",
		approvers: [{
			type: "user",
			value: "demo-user"
		}],
		requiredCount: 1,
		timeoutMs: 864e5,
		timeoutAction: "reject",
		message: "Please review before posting."
	}, S = {
		type: "action",
		actionType: "update-document",
		config: { summary: "{{context.steps." + r + ".response}}" },
		onError: "route-error"
	}, C = [
		{
			id: n,
			type: "trigger",
			position: {
				x: 40,
				y: 200
			},
			data: m
		},
		{
			id: r,
			type: "llm",
			position: {
				x: 320,
				y: 200
			},
			data: h
		},
		{
			id: i,
			type: "condition",
			position: {
				x: 620,
				y: 200
			},
			data: g
		},
		{
			id: a,
			type: "fork",
			position: {
				x: 900,
				y: 120
			},
			data: _
		},
		{
			id: o,
			type: "action",
			position: {
				x: 1180,
				y: 60
			},
			data: v
		},
		{
			id: s,
			type: "action",
			position: {
				x: 1180,
				y: 180
			},
			data: y
		},
		{
			id: c,
			type: "join",
			position: {
				x: 1480,
				y: 120
			},
			data: b
		},
		{
			id: l,
			type: "approval",
			position: {
				x: 1780,
				y: 120
			},
			data: x
		},
		{
			id: u,
			type: "action",
			position: {
				x: 2080,
				y: 120
			},
			data: S
		},
		{
			id: d,
			type: "action",
			position: {
				x: 900,
				y: 320
			},
			data: {
				type: "action",
				actionType: "mcp-tool",
				config: {
					tool: "send-short-summary",
					recipient: "{{context.triggeredBy.userId}}",
					message: "Short summary generated."
				},
				onError: "route-error"
			}
		},
		{
			id: f,
			type: "action",
			position: {
				x: 1480,
				y: 420
			},
			data: {
				type: "action",
				actionType: "webhook",
				config: {
					url: "https://example.invalid/pipeline-errors",
					method: "POST",
					bodyTemplate: "{ \"runId\": \"{{runId}}\", \"stage\": \"error-handler\" }"
				},
				idempotent: !0,
				onError: "route-error"
			}
		},
		{
			id: p,
			type: "transform",
			position: {
				x: 2380,
				y: 200
			},
			data: {
				type: "transform",
				transformType: "template",
				expression: "pipeline-complete",
				outputKey: "pipelineCompletion",
				terminal: !0
			}
		}
	], w = (e, t, n, r) => ({
		id: crypto.randomUUID(),
		source: e,
		sourceHandle: t,
		target: n,
		targetHandle: r
	}), T = [
		w(n, "out", r, "in"),
		w(r, "out", i, "in"),
		w(i, "true", a, "in"),
		w(i, "false", d, "in"),
		w(a, "branch-0", o, "in"),
		w(a, "branch-1", s, "in"),
		w(o, "out", c, "in-0"),
		w(s, "out", c, "in-1"),
		w(c, "out", l, "in"),
		w(l, "approved", u, "in"),
		w(u, "out", p, "in"),
		w(d, "out", p, "in"),
		w(l, "rejected", f, "in"),
		w(r, "error", f, "in"),
		w(u, "error", f, "in"),
		w(d, "error", f, "in"),
		w(f, "out", p, "in"),
		w(f, "error", p, "in")
	], E = {
		id: crypto.randomUUID(),
		name: "Document Summary Pipeline (Demo)",
		description: "A showcase pipeline demonstrating LLM summarization, branching, approval, parallel actions, and a shared error handler.",
		icon: "📄",
		version: 0,
		status: "published",
		publishedVersion: 1,
		triggerBinding: { event: "manual" },
		nodes: C,
		edges: T,
		createdAt: t,
		updatedAt: t,
		createdBy: e
	};
	return W(E), E;
}
function ie(e, t) {
	let n = U(e);
	if (!n) return null;
	let r = /* @__PURE__ */ new Map(), i = n.nodes.map((e) => {
		let t = crypto.randomUUID();
		return r.set(e.id, t), {
			...e,
			id: t,
			data: { ...e.data }
		};
	}), a = n.edges.map((e) => ({
		...e,
		id: crypto.randomUUID(),
		source: r.get(e.source) ?? e.source,
		target: r.get(e.target) ?? e.target
	})), o = (/* @__PURE__ */ new Date()).toISOString(), s = {
		...n,
		id: crypto.randomUUID(),
		name: t ?? `${n.name} (copy)`,
		tags: n.tags ? [...n.tags] : void 0,
		version: 0,
		status: "draft",
		publishedVersion: void 0,
		publishedSnapshot: void 0,
		nodes: i,
		edges: a,
		createdAt: o,
		updatedAt: o
	};
	return W(s), s;
}
function ae(e) {
	let t = U(e);
	return t ? JSON.stringify(t, null, 2) : null;
}
//#endregion
//#region src/components/pipelines/persistence/pipelineStorageRemote.ts
function q(e = "") {
	return `/api/pipelines/defs${e}`;
}
var oe = { "Content-Type": "application/json" };
async function se() {
	let e = await fetch(q("/"), { credentials: "include" });
	if (!e.ok) throw Error(`listPipelinesRemote failed (${e.status})`);
	return ((await e.json()).pipelines ?? []).map((e) => ({
		id: e.id,
		name: e.name,
		status: e.status,
		updatedAt: e.updatedAt,
		...e.icon ? { icon: e.icon } : {},
		...e.tags && e.tags.length > 0 ? { tags: [...e.tags] } : {}
	}));
}
async function ce(e) {
	let t = await fetch(q(`/${encodeURIComponent(e)}`), { credentials: "include" });
	if (t.status === 404) return null;
	if (!t.ok) throw Error(`loadPipelineRemote failed (${t.status})`);
	return await t.json();
}
async function le(e) {
	let t = await fetch(q(`/${encodeURIComponent(e.id)}`), {
		method: "PUT",
		headers: oe,
		credentials: "include",
		body: JSON.stringify(e)
	});
	if (!t.ok) throw Error(`savePipelineRemote failed (${t.status})`);
	return await t.json();
}
async function ue(e) {
	let t = await fetch(q(`/${encodeURIComponent(e)}`), {
		method: "DELETE",
		credentials: "include"
	});
	if (!t.ok && t.status !== 404) throw Error(`deletePipelineRemote failed (${t.status})`);
}
async function de(e) {
	let t = await fetch(q(`/${encodeURIComponent(e)}/publish`), {
		method: "POST",
		credentials: "include"
	});
	if (t.status === 404) return null;
	if (!t.ok) throw Error(`publishPipelineRemote failed (${t.status})`);
	return await t.json();
}
function J(e) {
	if (e instanceof SyntaxError) return !0;
	let t = e.message || String(e);
	return t.includes("Unexpected token") || t.includes("not valid JSON") || t.includes("(404)");
}
function fe(e) {
	if (e instanceof SyntaxError) return !0;
	let t = e.message || String(e);
	return t.includes("NetworkError") || t.includes("Failed to fetch") || t.includes("network") || t.includes("ECONNREFUSED") || t.includes("Unexpected token") || t.includes("not valid JSON") || t.includes("500") || t.includes("502") || t.includes("503") || t.includes("504");
}
async function pe() {
	try {
		return await se();
	} catch (e) {
		if (fe(e)) return H();
		throw e;
	}
}
async function me(e) {
	try {
		let t = await ce(e);
		return t && G(t), t ?? U(e);
	} catch (t) {
		if (fe(t)) return U(e);
		throw t;
	}
}
async function he(e) {
	let t = {
		...e,
		version: (e.version ?? 0) + 1,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	G(t);
	try {
		return await le(t);
	} catch (e) {
		if (J(e)) return t;
		throw e;
	}
}
async function ge(e) {
	K(e);
	try {
		await ue(e);
	} catch (e) {
		if (J(e)) return;
		throw e;
	}
}
async function _e(e) {
	try {
		let t = await de(e);
		return t && G(t), t;
	} catch (e) {
		if (J(e)) return null;
		throw e;
	}
}
async function ve(e) {
	let t = (/* @__PURE__ */ new Date()).toISOString(), n = {
		id: crypto.randomUUID(),
		type: "trigger",
		position: {
			x: 40,
			y: 120
		},
		data: {
			type: "trigger",
			triggerType: "manual"
		}
	}, r = {
		id: e.id ?? crypto.randomUUID(),
		name: e.name,
		description: e.description,
		tags: e.tags ?? [],
		icon: e.icon ?? "🔀",
		version: 1,
		status: "draft",
		publishedVersion: e.publishedVersion,
		triggerBinding: e.triggerBinding,
		nodes: e.nodes ?? [n],
		edges: e.edges ?? [],
		createdAt: e.createdAt ?? t,
		updatedAt: t,
		createdBy: e.createdBy
	};
	G(r);
	try {
		await le(r);
	} catch (e) {
		if (!J(e)) throw e;
	}
	return r;
}
//#endregion
//#region src/components/pipelines/context/PipelineEditorContext.tsx
var ye = 500, be = 50;
function xe(e) {
	switch (e) {
		case "trigger": return {
			type: "trigger",
			triggerType: "manual"
		};
		case "llm": return {
			type: "llm",
			provider: "bedrock",
			model: "claude-sonnet-4-6",
			systemPrompt: "You are a helpful assistant.",
			userPromptTemplate: "{{context.input}}",
			temperature: .7,
			maxTokens: 4096,
			streaming: !0
		};
		case "transform": return {
			type: "transform",
			transformType: "jsonpath",
			expression: ""
		};
		case "condition": return {
			type: "condition",
			expression: ""
		};
		case "action": return {
			type: "action",
			actionType: "notify",
			config: {}
		};
		case "fork": return {
			type: "fork",
			branchCount: 2
		};
		case "join": return {
			type: "join",
			mode: "all",
			mergeStrategy: "deep-merge"
		};
		case "approval": return {
			type: "approval",
			approvers: [],
			requiredCount: 1
		};
		case "agent": return {
			type: "agent",
			prompt: "",
			systemPrompt: "",
			model: "sonnet",
			allowedTools: [],
			maxTurns: 8,
			timeoutMs: 12e4
		};
		case "guardrail": return {
			type: "guardrail",
			guardrailId: "",
			inputField: "context.input",
			action: "block"
		};
		case "mcp-tool": return {
			type: "mcp-tool",
			gatewayUrl: "",
			toolName: "",
			inputTemplate: "{}"
		};
		case "knowledge-base": return {
			type: "knowledge-base",
			knowledgeBaseId: "",
			queryTemplate: "{{context.input}}",
			topK: 5
		};
		case "graph-query": return {
			type: "graph-query",
			graphId: "",
			query: "MATCH (n) RETURN n LIMIT 10"
		};
		case "memory": return {
			type: "memory",
			mode: "read",
			scope: "session",
			namespace: "default",
			keyExpression: ""
		};
		case "policy": return {
			type: "policy",
			policyStoreId: "",
			principal: "{{context.user.id}}",
			action: "",
			resource: ""
		};
		case "ag-ui-output": return {
			type: "ag-ui-output",
			sourceField: "context.output",
			eventType: "TEXT_MESSAGE_CONTENT",
			terminal: !0
		};
		case "image-source": return { type: "image-source" };
		case "image:save": return { type: "image:save" };
		case "scatter": return {
			type: "scatter",
			itemsPath: ""
		};
		case "image:resize": return { type: "image:resize" };
		case "image:transform": return {
			type: "image:transform",
			operations: []
		};
		case "image:format-convert": return {
			type: "image:format-convert",
			format: "jpeg"
		};
		case "image:sharpen": return { type: "image:sharpen" };
		case "image:watermark": return {
			type: "image:watermark",
			overlayImageId: ""
		};
		case "image:crop": return { type: "image:crop" };
		case "image:adjust-bw": return { type: "image:adjust-bw" };
		case "image:adjust-layer": return {
			type: "image:adjust-layer",
			layers: []
		};
		case "image:dimensions": return {
			type: "image:dimensions",
			maxEdge: 1024
		};
		case "image:upscale": return {
			type: "image:upscale",
			maxEdge: 1024
		};
		case "image:vision-analyze": return {
			type: "image:vision-analyze",
			userPrompt: "",
			imageRefPath: "$.trigger.imageRef"
		};
		case "image:vision-classify": return {
			type: "image:vision-classify",
			labels: [],
			imageRefPath: "$.trigger.imageRef"
		};
		case "image:vision-describe": return {
			type: "image:vision-describe",
			imageRefPath: "$.trigger.imageRef",
			userPrompt: "Describe this image."
		};
		case "image:vision-tag": return {
			type: "image:vision-tag",
			imageRefPath: "$.trigger.imageRef"
		};
		case "image:vision-extract-text": return {
			type: "image:vision-extract-text",
			imageRefPath: "$.trigger.imageRef"
		};
		case "image:generate": return {
			type: "image:generate",
			prompt: ""
		};
		case "image:variation": return { type: "image:variation" };
		case "image:edit-prompt": return {
			type: "image:edit-prompt",
			prompt: ""
		};
	}
}
function Y() {
	return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
var X = l(null);
function Se({ pipelineId: e, children: t }) {
	let [n, r] = _(null), [i, a] = _(!1), [o, s] = _(null), [c, l] = _([]), [u, f] = _([]), [m, v] = _(null), b = g(null), x = g(null), S = g(n);
	S.current = n;
	let C = d((e) => {
		S.current === e && a(!1);
	}, []), w = d(() => v(null), []), [T, E] = _(null), [D, O] = _(null), k = d(() => E(null), []), A = d((e) => (x.current = null, he(e).then(() => {
		C(e), v(null);
	}, (t) => {
		x.current === null && (x.current = e), v(t instanceof Error ? t.message : "Failed to save the pipeline."), console.error("[PipelineEditor] save failed; changes kept pending", t);
	})), [C]);
	p(() => {
		let t = !1;
		return r(null), a(!1), v(null), s(null), l([]), f([]), me(e).catch((t) => (console.error("[PipelineEditor] load failed, using cached copy", t), U(e))).then((e) => {
			t || (e && (e.nodes = e.nodes ?? [], e.edges = e.edges ?? []), r(e));
		}), () => {
			t = !0;
		};
	}, [e]), p(() => {
		if (!i || !n) {
			x.current = null;
			return;
		}
		b.current && clearTimeout(b.current);
		let e = n;
		return x.current = e, b.current = setTimeout(() => {
			b.current = null, A(e);
		}, ye), () => {
			b.current &&= (clearTimeout(b.current), null);
		};
	}, [
		n,
		i,
		A
	]), p(() => () => {
		let e = x.current;
		e && A(e);
	}, [e, A]);
	let j = d((e) => {
		l((t) => {
			let n = [...t, {
				nodes: e.nodes,
				edges: e.edges
			}];
			return n.length > be && n.shift(), n;
		}), f([]);
	}, []), M = d((e) => {
		let t = S.current;
		if (!t) return null;
		let n = e(t);
		return S.current = n, j(t), r(n), a(!0), n;
	}, [j]), N = d((e, t) => {
		let n = Y();
		return M((r) => ({
			...r,
			nodes: [...r.nodes, {
				id: n,
				type: e,
				position: t,
				data: xe(e)
			}]
		})), n;
	}, [M]), P = d((e, t) => {
		M((n) => ({
			...n,
			nodes: n.nodes.map((n) => n.id === e ? {
				...n,
				...t
			} : n)
		}));
	}, [M]), F = d((e, t) => {
		M((n) => ({
			...n,
			nodes: n.nodes.map((n) => {
				if (n.id !== e) return n;
				let r = {
					...n.data,
					...t
				};
				return {
					...n,
					data: r
				};
			})
		}));
	}, [M]), I = d((e) => {
		M((t) => ({
			...t,
			nodes: t.nodes.filter((t) => t.id !== e),
			edges: t.edges.filter((t) => t.source !== e && t.target !== e)
		})), s((t) => t === e ? null : t);
	}, [M]), L = d((e) => {
		let t = S.current;
		if (!t) return [];
		let n = [], r = new Set(e), i = /* @__PURE__ */ new Map(), a = t.nodes.filter((e) => r.has(e.id)).map((e) => {
			let t = Y();
			return i.set(e.id, t), n.push(t), {
				...e,
				id: t,
				position: {
					x: e.position.x + 40,
					y: e.position.y + 40
				},
				data: { ...e.data }
			};
		}), o = t.edges.filter((e) => r.has(e.source) && r.has(e.target)).map((e) => ({
			...e,
			id: Y(),
			source: i.get(e.source) ?? e.source,
			target: i.get(e.target) ?? e.target
		}));
		return M((e) => ({
			...e,
			nodes: [...e.nodes, ...a],
			edges: [...e.edges, ...o]
		})), n;
	}, [M]), ee = d((e) => {
		let t = Y();
		return M((n) => ({
			...n,
			edges: [...n.edges, {
				id: t,
				...e
			}]
		})), t;
	}, [M]), R = d((e) => {
		M((t) => ({
			...t,
			edges: t.edges.filter((t) => t.id !== e)
		}));
	}, [M]), z = d((e) => {
		if (e.length === 0) return;
		let t = S.current;
		if (!t) return;
		let n = new Map(e.map((e) => [e.id, e.position])), i = {
			...t,
			nodes: t.nodes.map((e) => {
				let t = n.get(e.id);
				return t ? {
					...e,
					position: t
				} : e;
			})
		};
		S.current = i, ne(i), r(i), a(!0);
	}, []), B = d(() => {
		n && (b.current &&= (clearTimeout(b.current), null), A(n));
	}, [n, A]), V = d(() => {
		if (!n) return;
		b.current &&= (clearTimeout(b.current), null);
		let e = n;
		E(null), (async () => {
			i && (await he(e), C(e));
			let t = await _e(n.id);
			t ? (r(t), O((/* @__PURE__ */ new Date()).toISOString())) : E("The server no longer has this pipeline.");
		})().catch((e) => {
			E(e instanceof Error ? e.message : "Failed to publish the pipeline."), console.error("[PipelineEditor] publish failed", e);
		});
	}, [
		n,
		i,
		C
	]), te = d(() => {
		me(e).then((e) => {
			r(e), a(!1), v(null), l([]), f([]);
		});
	}, [e]), H = d((e) => {
		let t = e.trim();
		t && (r((e) => !e || e.name === t ? e : {
			...e,
			name: t
		}), a(!0));
	}, []), W = d((e) => {
		r((t) => !t || t.icon === e ? t : {
			...t,
			icon: e
		}), a(!0);
	}, []), G = d((e) => {
		r((t) => {
			if (!t) return t;
			let n = t.tags ?? [];
			return n.length === e.length && n.every((t, n) => t === e[n]) ? t : {
				...t,
				tags: [...e]
			};
		}), a(!0);
	}, []), K = d(() => {
		if (c.length === 0 || !n) return;
		let e = c[c.length - 1], t = {
			...n,
			nodes: e.nodes,
			edges: e.edges
		};
		S.current = t, f((e) => [...e, {
			nodes: n.nodes,
			edges: n.edges
		}]), l((e) => e.slice(0, -1)), r(t), a(!0);
	}, [n, c]), re = d(() => {
		if (u.length === 0 || !n) return;
		let e = u[u.length - 1], t = {
			...n,
			nodes: e.nodes,
			edges: e.edges
		};
		S.current = t, l((e) => {
			let t = [...e, {
				nodes: n.nodes,
				edges: n.edges
			}];
			return t.length > be && t.shift(), t;
		}), f((e) => e.slice(0, -1)), r(t), a(!0);
	}, [n, u]), ie = h(() => ({
		definition: n,
		dirty: i,
		selectedNodeId: o,
		setSelectedNodeId: s,
		addNode: N,
		updateNode: P,
		updateNodeData: F,
		removeNode: I,
		duplicateNodes: L,
		addEdge: ee,
		removeEdge: R,
		setPositions: z,
		save: B,
		publish: V,
		revert: te,
		saveError: m,
		clearSaveError: w,
		publishError: T,
		clearPublishError: k,
		publishedAt: D,
		undo: K,
		redo: re,
		canUndo: c.length > 0,
		canRedo: u.length > 0,
		rename: H,
		setIcon: W,
		setTags: G
	}), [
		n,
		i,
		o,
		N,
		P,
		F,
		I,
		L,
		ee,
		R,
		z,
		B,
		V,
		te,
		m,
		w,
		T,
		k,
		D,
		K,
		re,
		c.length,
		u.length,
		H,
		W,
		G
	]);
	return /* @__PURE__ */ y(X.Provider, {
		value: ie,
		children: t
	});
}
function Ce() {
	return f(X) ?? null;
}
function we() {
	let e = f(X);
	if (!e) throw Error("usePipelineEditor must be used within a PipelineEditorProvider");
	return e;
}
//#endregion
//#region src/components/pipelines/hooks/useTriggerRun.ts
function Te(e = {}) {
	let r = t(), i = e.idToken === void 0 ? r?.idToken ?? null : e.idToken, [a, o] = _(!1), [s, c] = _(null), [l, u] = _(!1), f = e.baseUrl ?? n();
	return {
		triggerRun: d(async (e, t, n) => {
			o(!0), c(null), u(!1);
			try {
				let r = U(e), a = {};
				t && (a.triggerPayload = t), r && (a.definition = r);
				let o = {
					"Content-Type": "application/json",
					...i ? { Authorization: `Bearer ${i}` } : {}
				};
				n?.idempotencyKey && (o["Idempotency-Key"] = n.idempotencyKey);
				let s = await fetch(`${f}/api/pipelines/${encodeURIComponent(e)}/runs`, {
					method: "POST",
					headers: o,
					body: JSON.stringify(a)
				});
				if (!s.ok) {
					let e = await s.text().catch(() => "");
					return c(`Trigger failed (${s.status})${e ? `: ${e}` : ""}`), null;
				}
				let l = typeof s.headers?.get == "function" ? s.headers.get("X-Idempotent-Replay") : s.headers["x-idempotent-replay"] ?? null;
				return u(l === "true"), (await s.json()).runId;
			} catch (e) {
				return c(e.message), null;
			} finally {
				o(!1);
			}
		}, [f, i]),
		isTriggering: a,
		lastError: s,
		isReplay: l
	};
}
//#endregion
//#region src/components/pipelines/context/WebSocketEventAdapter.ts
var Ee = Object.freeze({
	"pipeline.run.resume-from-step": "pipeline:run:resumeFromStep",
	"pipeline.run.resumed-from-step": "pipeline.run.resumed-from-step"
});
function De(e) {
	return Ee[e] ?? e;
}
function Oe({ channel: e = "pipeline:all", onEvent: t, enabled: n = !1 }) {
	let { connectionState: i, sendMessage: a, onMessage: o } = r(), s = g(t);
	p(() => {
		s.current = t;
	}, [t]), p(() => {
		if (!n || i !== "connected") return;
		a({
			service: "pipeline",
			action: "subscribe",
			channel: e
		});
		let t = o((e) => {
			if (e.type !== "pipeline:event") return;
			let t = e, n = t.eventType;
			if (!n) return;
			let r = {
				eventType: De(n),
				payload: t.payload,
				seq: typeof t.seq == "number" ? t.seq : 0,
				sourceNodeId: typeof t.sourceNodeId == "string" ? t.sourceNodeId : "unknown",
				emittedAt: typeof t.emittedAt == "number" ? t.emittedAt : Date.now()
			};
			try {
				s.current(r);
			} catch (e) {
				console.error("[WebSocketEventAdapter] onEvent threw", e);
			}
		});
		return () => {
			t(), a({
				service: "pipeline",
				action: "unsubscribe",
				channel: e
			});
		};
	}, [
		n,
		i,
		e,
		a,
		o
	]);
}
function ke() {
	let e = typeof globalThis < "u" ? globalThis.crypto : void 0;
	return e && typeof e.randomUUID == "function" ? e.randomUUID() : `ws-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function Ae() {
	let { sendMessage: e } = r();
	return {
		subscribeToRun: d((t) => e({
			service: "pipeline",
			action: "subscribe",
			channel: `pipeline:run:${t}`
		}), [e]),
		unsubscribeFromRun: d((t) => e({
			service: "pipeline",
			action: "unsubscribe",
			channel: `pipeline:run:${t}`
		}), [e]),
		subscribeToAll: d(() => e({
			service: "pipeline",
			action: "subscribe",
			channel: "pipeline:all"
		}), [e]),
		unsubscribeFromAll: d(() => e({
			service: "pipeline",
			action: "unsubscribe",
			channel: "pipeline:all"
		}), [e]),
		subscribeToApprovals: d(() => e({
			service: "pipeline",
			action: "subscribe",
			channel: "pipeline:approvals"
		}), [e]),
		unsubscribeFromApprovals: d(() => e({
			service: "pipeline",
			action: "unsubscribe",
			channel: "pipeline:approvals"
		}), [e]),
		triggerRun: d((t, n = {}) => {
			let r = n.correlationId ?? ke();
			return e({
				service: "pipeline",
				action: "trigger",
				pipelineId: t,
				...n.definition ? { definition: n.definition } : {},
				...n.triggerPayload ? { triggerPayload: n.triggerPayload } : {},
				...n.triggeredBy ? { triggeredBy: n.triggeredBy } : {},
				correlationId: r
			}), r;
		}, [e]),
		cancelRun: d((t, n) => {
			let r = n ?? ke();
			return e({
				service: "pipeline",
				action: "cancel",
				runId: t,
				correlationId: r
			}), r;
		}, [e]),
		resolveApproval: d((t, n, r, i = {}) => {
			let a = i.correlationId ?? ke();
			return e({
				service: "pipeline",
				action: "resolveApproval",
				runId: t,
				stepId: n,
				decision: r,
				...i.comment ? { comment: i.comment } : {},
				...i.decidedBy ? { decidedBy: i.decidedBy } : {},
				correlationId: a
			}), a;
		}, [e]),
		requestResumeFromStep: d((t, n, r) => {
			let i = r ?? ke();
			return e({
				service: "pipeline",
				action: "resumeFromStep",
				runId: t,
				fromNodeId: n,
				correlationId: i
			}), i;
		}, [e])
	};
}
function je(e, t = {}) {
	let { enabled: n = !0 } = t, { connectionState: i, sendMessage: a } = r();
	p(() => {
		if (!n || !e || i !== "connected") return;
		let t = `pipeline:run:${e}`;
		return a({
			service: "pipeline",
			action: "subscribe",
			channel: t
		}), () => {
			a({
				service: "pipeline",
				action: "unsubscribe",
				channel: t
			});
		};
	}, [
		n,
		e,
		i,
		a
	]);
}
function Me() {
	let { connectionState: e, sendMessage: t } = r();
	return h(() => {
		let n = e === "connected";
		return {
			subscribe(e) {
				n && t({
					service: "pipeline",
					action: "subscribe",
					channel: e
				});
			},
			unsubscribe(e) {
				n && t({
					service: "pipeline",
					action: "unsubscribe",
					channel: e
				});
			}
		};
	}, [e, t]);
}
//#endregion
//#region src/components/pipelines/context/PipelineNodeRuntimeContext.tsx
var Ne = l(null);
function Pe({ value: e, children: t }) {
	return /* @__PURE__ */ y(Ne.Provider, {
		value: e,
		children: t
	});
}
function Fe() {
	return f(Ne);
}
//#endregion
//#region src/components/pipelines/context/PipelineRunsContext.tsx
var Ie = 20, Le = l(null);
function Re(e, t) {
	return e.steps[t] ?? {
		nodeId: t,
		status: "pending"
	};
}
function Z(e, t, n) {
	let r = Re(e, t), i = typeof n == "function" ? n(r) : {
		...r,
		...n
	};
	return {
		...e,
		steps: {
			...e.steps,
			[t]: i
		}
	};
}
function ze(e) {
	return e === "completed" || e === "rejected" || e === "failed" || e === "cancelled";
}
function Be(e) {
	let t = Object.values(e);
	if (t.length <= Ie) return e;
	let n = t.filter((e) => e.status === "running" || e.status === "pending" || e.status === "awaiting_approval" || e.status === "paused_at_breakpoint" || e.status === "stuck"), r = t.filter((e) => e.status !== "running" && e.status !== "pending" && e.status !== "awaiting_approval" && e.status !== "paused_at_breakpoint" && e.status !== "stuck").sort((e, t) => t.startedAt.localeCompare(e.startedAt)).slice(0, Math.max(0, Ie - n.length)), i = [...n, ...r], a = {};
	for (let e of i) a[e.id] = e;
	return a;
}
function Ve({ children: e }) {
	let t = f(X), { triggerRun: n } = Te(), r = Ae(), [i, a] = _({}), [o, c] = _(!1), [l, u] = _(null), m = g(/* @__PURE__ */ new Set()), v = g(null);
	p(() => {
		let e = t?.definition?.id;
		if (!e || v.current === e) return;
		c(!0);
		let n = !1;
		return N(e, { limit: Ie }).then((e) => {
			n || a((t) => {
				let n = { ...t };
				for (let t of e.runs) n[t.id] || (n[t.id] = t);
				return n;
			});
		}).catch((t) => {
			n || (console.error("[PipelineRuns] Failed to load history from API", t), a((t) => {
				let n = { ...t };
				for (let t of k(e)) n[t.id] || (n[t.id] = t);
				return n;
			}));
		}).finally(() => {
			n || (v.current = e, c(!1));
		}), () => {
			n = !0;
		};
	}, [t?.definition?.id]), s("*", (e) => {
		let { eventType: t, payload: n } = e;
		a((e) => He(e, t, n));
	}), p(() => {
		for (let e of Object.values(i)) if ((e.status === "completed" || e.status === "failed" || e.status === "cancelled") && !m.current.has(e.id)) {
			m.current.add(e.id);
			try {
				A(e.pipelineId, e);
			} catch (e) {
				console.warn("[PipelineRuns] appendRun failed", e);
			}
		}
	}, [i]);
	let b = d(async (e, t) => {
		let r = await n(e, t);
		if (!r) throw Error("Trigger failed (REST POST did not return a runId)");
		return r;
	}, [n]), x = d((e) => {
		r.cancelRun(e);
	}, [r]), C = d((e, t, n, i) => {
		r.resolveApproval(e, t, n, { comment: i });
	}, [r]), w = g(i);
	p(() => {
		w.current = i;
	}, [i]);
	let T = d(() => u(null), []), E = d(async (e) => {
		u(null);
		let t = Object.values(w.current).filter((e) => e.status === "failed").filter((t) => t.steps[e]?.status === "failed").sort((e, t) => t.startedAt.localeCompare(e.startedAt))[0];
		if (!t) {
			console.warn("[PipelineRuns] retryFromStep — no failed run found for node", e), u({
				nodeId: e,
				reason: "no-failed-run",
				message: "No failed run to retry from. The run history may have been cleared, or this node did not fail."
			});
			return;
		}
		try {
			await S(t.pipelineId, t.id, e);
		} catch (t) {
			console.error("[PipelineRuns] retryFromNode API failed", t), u({
				nodeId: e,
				reason: "request-failed",
				message: t instanceof Error ? t.message : "Retry request failed."
			});
		}
	}, []), D = d(async (e, t, n) => {
		let r = {
			...n ?? {},
			__breakpoints: t
		};
		return b(e, r);
	}, [b]), j = d((e, t, n = "continue") => {
		let r = w.current[e]?.pipelineId ?? "unknown";
		fetch(`/api/pipelines/${encodeURIComponent(r)}/runs/${encodeURIComponent(e)}/breakpoint/${encodeURIComponent(t)}/resolve`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ action: n })
		}).catch((e) => {
			console.error("[PipelineRuns] resolveBreakpoint API failed", e);
		});
	}, []), M = d(async (e, t, n, r) => {
		let i = w.current[e]?.pipelineId ?? "unknown", a = `/api/pipelines/${encodeURIComponent(i)}/runs/${encodeURIComponent(e)}/breakpoint/${encodeURIComponent(t)}/patch`, o = await fetch(a, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				patch: n,
				...r ? { appliedBy: r } : {}
			})
		});
		if (o.status === 200) return await o.json();
		if (o.status === 422) {
			let e = await o.json().catch(() => ({}));
			return e.result ? e.result : {
				patchId: "",
				before: {},
				after: {},
				validation: {
					ok: !1,
					reason: e.error ?? "patch rejected"
				}
			};
		}
		let s = await o.text().catch(() => "");
		throw Error(`applyContextPatch HTTP ${o.status}: ${s}`);
	}, []), P = d(async (e, t, n) => {
		let r = w.current[e]?.pipelineId ?? "unknown", i = `/api/pipelines/${encodeURIComponent(r)}/runs/${encodeURIComponent(e)}/breakpoint/${encodeURIComponent(t)}/patch/${encodeURIComponent(n)}`, a = await fetch(i, { method: "DELETE" });
		if (a.status !== 204) {
			let e = await a.text().catch(() => "");
			throw Error(`revertContextPatch HTTP ${a.status}: ${e}`);
		}
	}, []), F = d((e) => {
		let t = O(e);
		t && a((e) => {
			let n = e[t.id];
			return n && (ze(n.status) && !ze(t.status) || n.status === t.status && Object.keys(n.steps).length >= Object.keys(t.steps).length) ? e : {
				...e,
				[t.id]: t
			};
		});
	}, []), I = h(() => Object.values(i).filter((e) => e.status === "running" || e.status === "pending" || e.status === "awaiting_approval" || e.status === "paused_at_breakpoint" || e.status === "stuck").map((e) => e.id), [i]), L = h(() => ({
		runs: i,
		activeRunIds: I,
		triggerRun: b,
		triggerDebugRun: D,
		cancelRun: x,
		resolveApproval: C,
		resolveBreakpoint: j,
		applyContextPatch: M,
		revertContextPatch: P,
		retryFromStep: E,
		retryError: l,
		clearRetryError: T,
		ingestRun: F
	}), [
		i,
		I,
		b,
		D,
		x,
		C,
		j,
		M,
		P,
		E,
		l,
		T,
		F
	]);
	return /* @__PURE__ */ y(Le.Provider, {
		value: L,
		children: e
	});
}
function He(e, t, n) {
	if (!n || typeof n != "object" || typeof n.runId != "string") return e;
	switch (t) {
		case "pipeline.run.started": {
			let t = n, r = {
				id: t.runId,
				pipelineId: t.pipelineId,
				pipelineVersion: 0,
				status: "running",
				triggeredBy: t.triggeredBy,
				ownerNodeId: "local",
				startedAt: t.at,
				currentStepIds: [],
				steps: {},
				context: {}
			};
			return Be({
				...e,
				[t.runId]: r
			});
		}
		case "pipeline.run.completed": {
			let t = n, r = e[t.runId];
			return r ? {
				...e,
				[t.runId]: {
					...r,
					status: "completed",
					completedAt: t.at,
					durationMs: t.durationMs,
					currentStepIds: []
				}
			} : e;
		}
		case "pipeline.run.failed": {
			let t = n, r = e[t.runId];
			return r ? {
				...e,
				[t.runId]: {
					...r,
					status: "failed",
					completedAt: t.at,
					error: t.error,
					currentStepIds: []
				}
			} : e;
		}
		case "pipeline.run.cancelled": {
			let t = n, r = e[t.runId];
			return r ? {
				...e,
				[t.runId]: {
					...r,
					status: "cancelled",
					completedAt: t.at,
					currentStepIds: []
				}
			} : e;
		}
		case "pipeline.step.started": {
			let t = n, r = e[t.runId];
			if (!r) return e;
			let i = Z(r, t.stepId, (e) => ({
				...e,
				nodeId: t.stepId,
				status: "running",
				startedAt: t.at
			}));
			return {
				...e,
				[t.runId]: {
					...i,
					currentStepIds: Array.from(/* @__PURE__ */ new Set([...i.currentStepIds, t.stepId]))
				}
			};
		}
		case "pipeline.step.completed": {
			let t = n, r = e[t.runId];
			if (!r) return e;
			let i = Z(r, t.stepId, (e) => ({
				...e,
				status: "completed",
				completedAt: t.at,
				durationMs: t.durationMs,
				output: t.output
			}));
			return {
				...e,
				[t.runId]: {
					...i,
					currentStepIds: i.currentStepIds.filter((e) => e !== t.stepId)
				}
			};
		}
		case "pipeline.step.failed": {
			let t = n, r = e[t.runId];
			if (!r) return e;
			let i = Z(r, t.stepId, (e) => ({
				...e,
				status: "failed",
				completedAt: t.at,
				error: t.error
			}));
			return {
				...e,
				[t.runId]: {
					...i,
					currentStepIds: i.currentStepIds.filter((e) => e !== t.stepId)
				}
			};
		}
		case "pipeline.step.skipped": {
			let t = n, r = e[t.runId];
			if (!r) return e;
			let i = Z(r, t.stepId, (e) => ({
				...e,
				status: "skipped",
				completedAt: t.at,
				error: e.error
			}));
			return {
				...e,
				[t.runId]: {
					...i,
					currentStepIds: i.currentStepIds.filter((e) => e !== t.stepId)
				}
			};
		}
		case "pipeline.step.cancelled": {
			let t = n, r = e[t.runId];
			if (!r) return e;
			let i = Z(r, t.stepId, (e) => ({
				...e,
				status: "failed",
				completedAt: t.at,
				error: e.error ?? "cancelled"
			}));
			return {
				...e,
				[t.runId]: {
					...i,
					currentStepIds: i.currentStepIds.filter((e) => e !== t.stepId)
				}
			};
		}
		case "pipeline.llm.prompt": {
			let t = n, r = e[t.runId];
			return r ? {
				...e,
				[t.runId]: Z(r, t.stepId, (e) => ({
					...e,
					llm: {
						prompt: t.prompt,
						response: e.llm?.response ?? "",
						tokensIn: e.llm?.tokensIn ?? 0,
						tokensOut: e.llm?.tokensOut ?? 0,
						...e.llm?.streamOpened === void 0 ? {} : { streamOpened: e.llm.streamOpened },
						...e.llm?.firstTokenLatencyMs === void 0 ? {} : { firstTokenLatencyMs: e.llm.firstTokenLatencyMs }
					}
				}))
			} : e;
		}
		case "pipeline.llm.stream.opened": {
			let t = n, r = e[t.runId];
			return r ? {
				...e,
				[t.runId]: Z(r, t.stepId, (e) => {
					let n = Date.parse(t.openedAt), r = {
						...e,
						llm: {
							prompt: e.llm?.prompt ?? "",
							response: e.llm?.response ?? "",
							tokensIn: e.llm?.tokensIn ?? 0,
							tokensOut: e.llm?.tokensOut ?? 0,
							streamOpened: !0,
							...e.llm?.firstTokenLatencyMs === void 0 ? {} : { firstTokenLatencyMs: e.llm.firstTokenLatencyMs }
						}
					};
					return r.llm._streamOpenedAtMs = Number.isFinite(n) ? n : Date.now(), r;
				})
			} : e;
		}
		case "pipeline.llm.token": {
			let t = n, r = e[t.runId];
			return r ? {
				...e,
				[t.runId]: Z(r, t.stepId, (e) => {
					let n = e.llm?.tokensOut ?? 0, r = n === 0, i = e.llm?._streamOpenedAtMs, a = Date.parse(t.at), o = r && typeof i == "number" && Number.isFinite(a) ? Math.max(0, a - i) : e.llm?.firstTokenLatencyMs;
					return {
						...e,
						llm: {
							prompt: e.llm?.prompt ?? "",
							response: (e.llm?.response ?? "") + t.token,
							tokensIn: e.llm?.tokensIn ?? 0,
							tokensOut: n + 1,
							streamOpened: !1,
							...o === void 0 ? {} : { firstTokenLatencyMs: o }
						}
					};
				})
			} : e;
		}
		case "pipeline.llm.response": {
			let t = n, r = e[t.runId];
			return r ? {
				...e,
				[t.runId]: Z(r, t.stepId, (e) => ({
					...e,
					llm: {
						prompt: e.llm?.prompt ?? "",
						response: t.response,
						tokensIn: t.tokensIn,
						tokensOut: t.tokensOut
					}
				}))
			} : e;
		}
		case "pipeline.step.breakpoint": {
			let t = n, r = e[t.runId];
			if (!r) return e;
			let i = Z(r, t.stepId, (e) => ({
				...e,
				status: "awaiting"
			}));
			return {
				...e,
				[t.runId]: {
					...i,
					status: "paused_at_breakpoint"
				}
			};
		}
		case "pipeline.step.context.patched":
		case "pipeline.step.context.patched-unvalidated": {
			let r = n, i = e[r.runId];
			if (!i) return e;
			let a = t === "pipeline.step.context.patched-unvalidated", o = {
				patchId: r.patchId,
				appliedAt: r.at,
				mode: r.mode,
				...a ? { unvalidated: !0 } : {}
			};
			return {
				...e,
				[r.runId]: Z(i, r.stepId, (e) => ({
					...e,
					patches: [...e.patches ?? [], o]
				}))
			};
		}
		case "pipeline.step.context.patch-reverted": {
			let t = n, r = e[t.runId];
			return r ? {
				...e,
				[t.runId]: Z(r, t.stepId, (e) => ({
					...e,
					patches: (e.patches ?? []).map((e) => e.patchId === t.patchId ? {
						...e,
						revertedAt: t.at
					} : e)
				}))
			} : e;
		}
		case "pipeline.approval.requested": {
			let t = n, r = e[t.runId];
			if (!r) return e;
			let i = Z(r, t.stepId, (e) => ({
				...e,
				status: "awaiting",
				approvals: e.approvals ?? []
			}));
			return {
				...e,
				[t.runId]: {
					...i,
					status: "awaiting_approval"
				}
			};
		}
		case "pipeline.run.resumed-from-step": {
			let t = n, r = e[t.runId];
			if (!r) return e;
			let i = {
				fromNodeId: t.fromNodeId,
				...t.originalFailedStepId ? { originalFailedStepId: t.originalFailedStepId } : {},
				at: t.at
			};
			return {
				...e,
				[t.runId]: {
					...r,
					status: "running",
					replayAttempts: (r.replayAttempts ?? 0) + 1,
					resumeHistory: [...r.resumeHistory ?? [], i]
				}
			};
		}
		case "pipeline.approval.recorded": {
			let t = n, r = e[t.runId];
			if (!r) return e;
			let i = {
				userId: t.userId,
				decision: t.decision,
				at: t.at
			};
			return {
				...e,
				[t.runId]: Z(r, t.stepId, (e) => ({
					...e,
					approvals: [...e.approvals ?? [], i]
				}))
			};
		}
		default: return e;
	}
}
function Ue() {
	let e = f(Le);
	if (!e) throw Error("usePipelineRuns must be used within a PipelineRunsProvider");
	return e;
}
var We = async () => {};
function Ge() {
	let e = Fe(), t = f(Le), n = e?.retryFromStep, r = t?.retryFromStep;
	return h(() => n ? async (e) => {
		await n(e);
	} : r ?? void 0, [n, r]);
}
function Ke() {
	return Ge() ?? We;
}
function qe(e) {
	let t = Fe(), n = f(Le), r = t?.getLatestStepForNode, i = h(() => r ? r(e) : null, [r, e]), a = h(() => {
		if (!n) return null;
		let t = null, r = "";
		for (let i of Object.values(n.runs)) {
			let n = i.steps[e];
			n && i.startedAt > r && (t = n, r = i.startedAt);
		}
		return t;
	}, [n, e]);
	return r ? i : a;
}
//#endregion
//#region src/components/pipelines/hooks/usePendingApprovals.ts
function Q(e, t) {
	return `${e}::${t}`;
}
function Je(e, t) {
	let n = U(e);
	if (!n) return { requiredCount: 1 };
	let r = n.nodes.find((e) => e.id === t);
	if (!r || r.data.type !== "approval") return { requiredCount: 1 };
	let i = r.data;
	return {
		message: i.message,
		requiredCount: Math.max(1, i.requiredCount ?? 1)
	};
}
function Ye() {
	let e = c(), t = Ue(), [n, r] = _(() => {
		let e = {};
		for (let n in t.runs) {
			let r = t.runs[n];
			if (r.status === "awaiting_approval") for (let t in r.steps) {
				let i = r.steps[t];
				if (i.status !== "awaiting") continue;
				let a = Je(r.pipelineId, t), o = U(r.pipelineId)?.nodes.find((e) => e.id === t), s = o && o.data.type === "approval" ? o.data.approvers : [];
				e[Q(n, t)] = {
					runId: n,
					pipelineId: r.pipelineId,
					stepId: t,
					approvers: s,
					requestedAt: i.startedAt ?? (/* @__PURE__ */ new Date(0)).toISOString(),
					message: a.message,
					requiredCount: a.requiredCount,
					recordedCount: i.approvals?.filter((e) => e.decision === "approve").length ?? 0
				};
			}
		}
		return e;
	}), [i, a] = _(!0), [o, s] = _(null), [l, u] = _(0), f = g(t.runs);
	p(() => {
		f.current = t.runs;
	}, [t.runs]);
	let m = g(/* @__PURE__ */ new Map()), v = g(/* @__PURE__ */ new Set());
	return p(() => {
		let e = !1;
		a(!0), s(null), v.current = /* @__PURE__ */ new Set();
		let t = async () => {
			try {
				let e = await fetch("/api/pipelines/approvals", { credentials: "same-origin" });
				if (e.status === 404) return null;
				if (!e.ok) throw Error(`Dashboard fetch failed: ${e.status}`);
				return { pendingApprovals: (await e.json()).approvals ?? [] };
			} catch (e) {
				if (e instanceof SyntaxError) return null;
				throw e;
			}
		};
		return (async () => {
			try {
				let n = await t();
				if (e) return;
				if (n?.pendingApprovals) {
					let e = {};
					for (let t of n.pendingApprovals) {
						let n = Je(t.pipelineId, t.stepId);
						e[Q(t.runId, t.stepId)] = {
							runId: t.runId,
							pipelineId: t.pipelineId,
							stepId: t.stepId,
							approvers: t.approvers ?? [],
							requestedAt: t.requestedAt,
							message: t.message ?? n.message,
							requiredCount: t.requiredCount ?? n.requiredCount,
							recordedCount: t.recordedCount ?? 0
						};
					}
					r((t) => {
						let n = { ...e };
						for (let e of v.current) t[e] ? n[e] = t[e] : delete n[e];
						return n;
					});
				}
				a(!1);
			} catch (t) {
				if (e) return;
				console.error("[usePendingApprovals] /api/observability/dashboard?include=pendingApprovals failed:", t), s(t.message ?? "Failed to load pending approvals"), a(!1);
			}
		})(), () => {
			e = !0;
		};
	}, [l]), p(() => {
		let t = [];
		t.push(e.subscribe("pipeline.run.started", (e) => {
			let t = e;
			m.current.set(t.runId, t.pipelineId);
		})), t.push(e.subscribe("pipeline.approval.requested", (e) => {
			let t = e, n = m.current.get(t.runId) ?? f.current[t.runId]?.pipelineId ?? "", i = Je(n, t.stepId);
			v.current.add(Q(t.runId, t.stepId)), r((e) => {
				let r = Q(t.runId, t.stepId);
				return e[r] ? e : {
					...e,
					[r]: {
						runId: t.runId,
						pipelineId: n,
						stepId: t.stepId,
						approvers: t.approvers,
						requestedAt: t.at,
						message: i.message,
						requiredCount: i.requiredCount,
						recordedCount: 0
					}
				};
			});
		})), t.push(e.subscribe("pipeline.approval.recorded", (e) => {
			let t = e, n = Q(t.runId, t.stepId);
			v.current.add(n), r((e) => {
				let r = e[n];
				if (!r) return e;
				if (t.decision === "reject") {
					let t = { ...e };
					return delete t[n], t;
				}
				let i = (r.recordedCount ?? 0) + 1;
				if (i >= (r.requiredCount ?? 1)) {
					let t = { ...e };
					return delete t[n], t;
				}
				return {
					...e,
					[n]: {
						...r,
						recordedCount: i
					}
				};
			});
		}));
		let n = e.subscribeToApprovals();
		return t.push(n), () => {
			for (let e of t) e();
		};
	}, [e]), {
		approvals: h(() => Object.values(n).sort((e, t) => String(t.requestedAt ?? "").localeCompare(String(e.requestedAt ?? ""))), [n]),
		isLoading: i,
		error: o,
		retry: d(() => {
			u((e) => e + 1);
		}, [])
	};
}
function Xe() {
	let { approvals: e } = Ye();
	return e;
}
//#endregion
//#region src/api/pipelineBreakpointPatch.ts
var Ze = class extends Error {
	reason;
	result;
	constructor(e, t) {
		super(e), this.name = "PatchValidationRejectedError", this.reason = e, this.result = t;
	}
}, Qe = class extends Error {
	status;
	body;
	constructor(e, t, n) {
		super(t), this.name = "PatchHttpError", this.status = e, this.body = n;
	}
};
function $e(e, t, n, r) {
	let i = `/api/pipelines/${encodeURIComponent(e)}/runs/${encodeURIComponent(t)}/breakpoint/${encodeURIComponent(n)}/patch`;
	return r ? `${i}/${encodeURIComponent(r)}` : `${i}`;
}
async function et(e, t, n, r, i) {
	let a = await fetch($e(e, t, n), {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({
			patch: r,
			...i ? { appliedBy: i } : {}
		})
	});
	if (a.status === 200) return await a.json();
	if (a.status === 422) {
		let e = await a.json().catch(() => ({})), t = "patch rejected by validator";
		throw e.result && e.result.validation && e.result.validation.ok === !1 && typeof e.result.validation.reason == "string" ? t = e.result.validation.reason : typeof e.error == "string" && (t = e.error), new Ze(t, e.result);
	}
	let o = await a.text().catch(() => ""), s;
	try {
		s = JSON.parse(o);
	} catch {
		s = o;
	}
	throw new Qe(a.status, `applyPatch HTTP ${a.status}: ${o}`, s);
}
async function tt(e, t, n, r) {
	let i = await fetch($e(e, t, n, r), {
		method: "DELETE",
		credentials: "include"
	});
	if (i.status === 204) return;
	let a = await i.text().catch(() => ""), o;
	try {
		o = JSON.parse(a);
	} catch {
		o = a;
	}
	throw new Qe(i.status, `revertPatch HTTP ${i.status}: ${a}`, o);
}
//#endregion
//#region src/api/pipelineResume.ts
async function nt(e, t, n, r) {
	let i = `/api/pipelines/${encodeURIComponent(e)}/runs/${encodeURIComponent(t)}/resume?fromNodeId=${encodeURIComponent(n)}`, a = await fetch(i, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(r ?? {})
	});
	if (!a.ok) {
		let e = await a.text();
		throw Error(`Failed to resume run ${t} from node ${n}: ${a.status} ${e}`);
	}
	return a.json();
}
//#endregion
//#region src/api/pipelineAudit.ts
function rt(e) {
	let t = [];
	for (let [n, r] of Object.entries(e)) if (r != null) {
		if (Array.isArray(r)) {
			if (r.length === 0) continue;
			t.push(`${encodeURIComponent(n)}=${encodeURIComponent(r.join(","))}`);
		} else t.push(`${encodeURIComponent(n)}=${encodeURIComponent(String(r))}`);
	}
	return t.length > 0 ? `?${t.join("&")}` : "";
}
async function it(e, t, n = {}) {
	let r = rt({
		since: n.since,
		until: n.until,
		actions: n.actions,
		limit: n.limit,
		cursor: n.cursor
	}), i = `/api/pipelines/${encodeURIComponent(e)}/runs/${encodeURIComponent(t)}/audit${r}`, a = await fetch(i, {
		method: "GET",
		credentials: "include"
	});
	if (!a.ok) {
		let n = await a.text();
		throw Error(`Failed to load audit log for ${e}/${t}: ${a.status} ${n}`);
	}
	return a.json();
}
async function at(e) {
	if (!e.actor && !e.pipelineId) throw Error("searchAudit requires at least one of `actor` or `pipelineId`");
	let t = `/api/pipelines/audit/search${rt({
		actor: e.actor,
		pipelineId: e.pipelineId,
		actions: e.actions,
		since: e.since,
		until: e.until,
		limit: e.limit,
		cursor: e.cursor
	})}`, n = await fetch(t, {
		method: "GET",
		credentials: "include"
	});
	if (!n.ok) {
		let e = await n.text();
		throw Error(`Audit search failed: ${n.status} ${e}`);
	}
	return n.json();
}
//#endregion
//#region src/components/forms/JsonPathInput.tsx
var ot = {
	sm: "px-1.5 py-0.5 text-[11px]",
	md: "px-2 py-0.5 text-[12px]"
}, st = u(function({ value: e, onChange: t, samples: n, placeholder: r = "$.path.to.value", invalid: i = !1, errorMessage: s, disabled: c = !1, size: l = "md", enforcePrefix: u = !1, "data-testid": d }, f) {
	let p = m(), h = u && e.length > 0 && !e.startsWith("$.") ? "JSONPath must start with \"$.\"" : void 0, g = i || h != null, _ = s ?? h;
	return /* @__PURE__ */ b("div", {
		className: "flex flex-col gap-1 w-full",
		children: [
			/* @__PURE__ */ y(o, {
				ref: f,
				type: "text",
				mono: !0,
				size: l,
				value: e,
				onChange: (e) => t(e.target.value),
				placeholder: r,
				invalid: g,
				disabled: c,
				"data-testid": d,
				"aria-describedby": _ ? p : void 0,
				"aria-invalid": g || void 0
			}),
			n && n.length > 0 && /* @__PURE__ */ y("div", {
				className: "flex flex-wrap gap-1",
				children: n.map((e) => /* @__PURE__ */ y("button", {
					type: "button",
					disabled: c,
					onClick: () => t(e.value),
					className: a("rounded border border-border bg-surface-hover font-mono text-text-secondary", "transition-colors duration-100", "hover:bg-info-bg hover:border-info-border hover:text-info-fg", "focus:outline-none focus:ring-2 focus:ring-info/40", "disabled:opacity-50 disabled:cursor-not-allowed", ot[l]),
					children: e.label
				}, e.value))
			}),
			_ && /* @__PURE__ */ y("p", {
				id: p,
				role: "alert",
				className: "text-[11px] text-danger-fg leading-4",
				children: _
			})
		]
	});
}), ct = {
	sm: "w-16",
	md: "w-32",
	lg: "w-48"
}, lt = {
	square: "aspect-square",
	video: "aspect-video",
	auto: ""
};
function ut() {
	return /* @__PURE__ */ b("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className: "w-6 h-6 text-text-tertiary",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ y("rect", {
				x: "3",
				y: "3",
				width: "18",
				height: "18",
				rx: "2",
				ry: "2"
			}),
			/* @__PURE__ */ y("circle", {
				cx: "8.5",
				cy: "8.5",
				r: "1.5"
			}),
			/* @__PURE__ */ y("path", { d: "M21 15l-5-5L5 21" })
		]
	});
}
function dt({ src: e, alt: t, size: n = "md", aspectRatio: r = "square", rounded: i = !1, fallback: o, loading: s = "lazy", className: c, "data-testid": l }) {
	let [u, d] = _({
		src: e,
		status: "loading"
	}), f = e ? u.src === e ? u.status : "loading" : "error", p = i ? r === "square" ? "rounded-full" : "rounded-lg" : "rounded-md";
	return /* @__PURE__ */ b("div", {
		"data-testid": l,
		className: a("relative overflow-hidden bg-surface-hover", ct[n], r !== "auto" && lt[r], p, c),
		children: [
			f === "loading" && /* @__PURE__ */ y("div", {
				"aria-hidden": "true",
				className: "absolute inset-0 animate-pulse bg-surface-emphasis"
			}),
			f === "error" && /* @__PURE__ */ y("div", {
				className: "absolute inset-0 flex items-center justify-center bg-surface-hover",
				children: o ?? /* @__PURE__ */ y(ut, {})
			}),
			e && /* @__PURE__ */ y("img", {
				src: e,
				alt: t,
				loading: s,
				onLoad: () => d({
					src: e,
					status: "loaded"
				}),
				onError: () => d({
					src: e,
					status: "error"
				}),
				className: a("w-full h-full object-cover transition-opacity duration-200", f === "loaded" ? "opacity-100" : "opacity-0")
			}, e)
		]
	});
}
//#endregion
//#region src/components/image/GenerativeImagePreview.tsx
function ft(e) {
	return e < 60 ? `${e}s` : `${Math.floor(e / 60)}m ${e % 60}s`;
}
function pt({ startedAt: e }) {
	let [t, n] = _(() => Math.max(0, Math.floor((Date.now() - e) / 1e3)));
	return p(() => {
		let t = () => n(Math.max(0, Math.floor((Date.now() - e) / 1e3)));
		t();
		let r = setInterval(t, 1e3);
		return () => clearInterval(r);
	}, [e]), /* @__PURE__ */ y("span", {
		"data-testid": "generative-image-preview-elapsed",
		className: "absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[10px] leading-none text-white/90",
		children: ft(t)
	});
}
function mt({ status: e, src: t, alt: n = "", startedAt: r, className: o }) {
	let s = i(), c = g(e), [l, u] = _(!1);
	return c.current !== e && (c.current = e, e === "done" && !s && u(!0)), p(() => {
		if (!l) return;
		let e = setTimeout(() => u(!1), 30);
		return () => clearTimeout(e);
	}, [l]), /* @__PURE__ */ y("div", {
		"data-testid": "generative-image-preview",
		"data-status": e,
		className: a("relative overflow-hidden rounded-md bg-surface-hover", o),
		children: e === "synthesizing" ? /* @__PURE__ */ b(v, { children: [
			/* @__PURE__ */ y("div", {
				"aria-hidden": "true",
				"data-testid": "generative-image-preview-shimmer",
				className: a("absolute inset-0", s ? "bg-surface-emphasis" : a("bg-gradient-to-r from-surface-hover via-surface-emphasis to-surface-hover", "bg-[length:400px_100%] animate-[skeleton-shimmer_1.4s_ease-in-out_infinite]"))
			}),
			!s && /* @__PURE__ */ y("div", {
				"aria-hidden": "true",
				"data-testid": "generative-image-preview-sweep",
				className: a("absolute inset-0", "bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.55)_50%,transparent_65%)]", "bg-[length:400px_100%] bg-no-repeat", "animate-[skeleton-shimmer_2.4s_linear_infinite]")
			}),
			/* @__PURE__ */ y("span", {
				className: a("absolute inset-0 flex items-center justify-center", "text-[11px] font-medium tracking-wide text-neutral select-none"),
				children: "✦ synthesizing"
			}),
			r !== void 0 && /* @__PURE__ */ y(pt, { startedAt: r })
		] }) : t ? /* @__PURE__ */ y("img", {
			src: t,
			alt: n,
			"data-testid": "generative-image-preview-img",
			className: a("h-full w-full object-cover", !s && "transition-[filter] duration-[400ms] ease-out", l ? "blur-[16px]" : "blur-0")
		}) : /* @__PURE__ */ y("div", {
			"aria-hidden": "true",
			className: "absolute inset-0 bg-surface-emphasis"
		})
	});
}
//#endregion
//#region src/components/pipelines/services/PipelineEditorServicesContext.tsx
var $ = l(null);
function ht({ services: e, children: t }) {
	return /* @__PURE__ */ y($.Provider, {
		value: e,
		children: t
	});
}
function gt() {
	let e = f($);
	if (!e) throw Error("useImageUrl must be called inside <PipelineEditorServicesProvider>. The host editor (e.g. wsg PipelineEditorPage) is responsible for mounting it with its own getImageUrl implementation.");
	return e.getImageUrl;
}
function _t() {
	return f($)?.getImageUrl ?? null;
}
function vt() {
	let e = f($);
	if (!e) throw Error("usePipelineEditorServices must be called inside <PipelineEditorServicesProvider>.");
	return e;
}
function yt(e) {
	let t = f($)?.nodeVocabulary?.[e];
	return h(() => ({
		label: (e, n) => t?.labels?.[e] ?? n,
		help: (e, n) => t?.help?.[e] ?? n,
		placeholder: (e, n) => t?.placeholders?.[e] ?? n
	}), [t]);
}
function bt(e, t) {
	let n = f($)?.modelOptions?.[e];
	return h(() => n ?? t, [n, t]);
}
function xt() {
	let e = f($)?.modelOptions;
	return h(() => (t, n) => e?.[t] ?? n, [e]);
}
function St() {
	let e = f($)?.webhookRelay;
	return h(() => ({
		enabled: e?.enabled ?? !1,
		publicUrlBase: e?.publicUrlBase
	}), [e?.enabled, e?.publicUrlBase]);
}
function Ct() {
	let e = f($)?.executableNodeTypes;
	return h(() => {
		if (!e) return () => !0;
		let t = new Set(e);
		return (e) => t.has(e);
	}, [e]);
}
//#endregion
export { A as $, je as A, me as B, qe as C, Pe as D, Ge as E, we as F, ie as G, he as H, Ce as I, U as J, ae as K, ve as L, Te as M, X as N, Fe as O, Se as P, M as Q, ge as R, Ve as S, Ke as T, re as U, _e as V, K as W, P as X, W as Y, N as Z, Ze as _, bt as a, Xe as b, vt as c, dt as d, j as et, st as f, Qe as g, nt as h, Ct as i, Oe as j, Me as k, St as l, at as m, gt as n, x as nt, xt as o, it as p, H as q, _t as r, S as rt, yt as s, ht as t, k as tt, mt as u, et as v, Ue as w, Ye as x, tt as y, pe as z };
