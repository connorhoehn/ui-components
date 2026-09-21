import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { n as t } from "./IdentityContext-CQM1qwH6.js";
import { n } from "./WebSocketContext-DUvjGLFq.js";
import { t as r } from "./usePrefersReducedMotion-Cllucr7i.js";
import { t as i } from "./cn-DhjIN-s0.js";
import { t as a } from "./Input-DLknWXri.js";
import { n as o, r as s } from "./EventStreamContext-CLzG8O5_.js";
import { createContext as c, forwardRef as l, useCallback as u, useContext as d, useEffect as f, useId as p, useMemo as m, useRef as h, useState as g } from "react";
import { Fragment as _, jsx as v, jsxs as y } from "react/jsx-runtime";
import "ajv";
//#region src/api/pipelineRetry.ts
async function b(e, t) {
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
async function x(e, t, n, r, i) {
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
var S = "ws_pipeline_runs_v1:", C = 50;
function w(e) {
	return `${S}${e}`;
}
var T = !1;
function E(e, t) {
	try {
		localStorage.setItem(e, t);
	} catch (e) {
		T || (T = !0, console.warn("[runHistory] localStorage write failed", e));
	}
}
function D(e) {
	if (typeof e != "object" || !e) return null;
	let t = e;
	return typeof t.id == "string" ? {
		...t,
		steps: typeof t.steps == "object" && t.steps !== null ? t.steps : {},
		startedAt: typeof t.startedAt == "string" ? t.startedAt : ""
	} : null;
}
function O(e) {
	try {
		let t = localStorage.getItem(w(e));
		if (!t) return [];
		let n = JSON.parse(t);
		return Array.isArray(n) ? n.map(D).filter((e) => e !== null) : [];
	} catch {
		return [];
	}
}
function k(e, t) {
	return O(e).find((e) => e.id === t) ?? null;
}
function A(e, t) {
	let n = D(t);
	if (!n) return;
	let r = [n, ...O(e).filter((e) => e.id !== n.id)].sort((e, t) => t.startedAt.localeCompare(e.startedAt)).slice(0, C);
	E(w(e), JSON.stringify(r));
}
function j(e) {
	try {
		localStorage.removeItem(w(e));
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
var X = c(null);
function Se({ pipelineId: e, children: t }) {
	let [n, r] = g(null), [i, a] = g(!1), [o, s] = g(null), [c, l] = g([]), [d, p] = g([]), [_, y] = g(null), b = h(null), x = h(null), S = h(n);
	S.current = n;
	let C = u((e) => {
		S.current === e && a(!1);
	}, []), w = u(() => y(null), []), [T, E] = g(null), [D, O] = g(null), k = u(() => E(null), []), A = u((e) => (x.current = null, he(e).then(() => {
		C(e), y(null);
	}, (t) => {
		x.current === null && (x.current = e), y(t instanceof Error ? t.message : "Failed to save the pipeline."), console.error("[PipelineEditor] save failed; changes kept pending", t);
	})), [C]);
	f(() => {
		let t = !1;
		return r(null), a(!1), y(null), s(null), l([]), p([]), me(e).catch((t) => (console.error("[PipelineEditor] load failed, using cached copy", t), U(e))).then((e) => {
			t || (e && (e.nodes = e.nodes ?? [], e.edges = e.edges ?? []), r(e));
		}), () => {
			t = !0;
		};
	}, [e]), f(() => {
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
	]), f(() => () => {
		let e = x.current;
		e && A(e);
	}, [e, A]);
	let j = u((e) => {
		l((t) => {
			let n = [...t, {
				nodes: e.nodes,
				edges: e.edges
			}];
			return n.length > be && n.shift(), n;
		}), p([]);
	}, []), M = u((e) => {
		let t = S.current;
		if (!t) return null;
		let n = e(t);
		return S.current = n, j(t), r(n), a(!0), n;
	}, [j]), N = u((e, t) => {
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
	}, [M]), P = u((e, t) => {
		M((n) => ({
			...n,
			nodes: n.nodes.map((n) => n.id === e ? {
				...n,
				...t
			} : n)
		}));
	}, [M]), F = u((e, t) => {
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
	}, [M]), I = u((e) => {
		M((t) => ({
			...t,
			nodes: t.nodes.filter((t) => t.id !== e),
			edges: t.edges.filter((t) => t.source !== e && t.target !== e)
		})), s((t) => t === e ? null : t);
	}, [M]), L = u((e) => {
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
	}, [M]), ee = u((e) => {
		let t = Y();
		return M((n) => ({
			...n,
			edges: [...n.edges, {
				id: t,
				...e
			}]
		})), t;
	}, [M]), R = u((e) => {
		M((t) => ({
			...t,
			edges: t.edges.filter((t) => t.id !== e)
		}));
	}, [M]), z = u((e) => {
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
	}, []), B = u(() => {
		n && (b.current &&= (clearTimeout(b.current), null), A(n));
	}, [n, A]), V = u(() => {
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
	]), te = u(() => {
		me(e).then((e) => {
			r(e), a(!1), y(null), l([]), p([]);
		});
	}, [e]), H = u((e) => {
		let t = e.trim();
		t && (r((e) => !e || e.name === t ? e : {
			...e,
			name: t
		}), a(!0));
	}, []), W = u((e) => {
		r((t) => !t || t.icon === e ? t : {
			...t,
			icon: e
		}), a(!0);
	}, []), G = u((e) => {
		r((t) => {
			if (!t) return t;
			let n = t.tags ?? [];
			return n.length === e.length && n.every((t, n) => t === e[n]) ? t : {
				...t,
				tags: [...e]
			};
		}), a(!0);
	}, []), K = u(() => {
		if (c.length === 0 || !n) return;
		let e = c[c.length - 1], t = {
			...n,
			nodes: e.nodes,
			edges: e.edges
		};
		S.current = t, p((e) => [...e, {
			nodes: n.nodes,
			edges: n.edges
		}]), l((e) => e.slice(0, -1)), r(t), a(!0);
	}, [n, c]), re = u(() => {
		if (d.length === 0 || !n) return;
		let e = d[d.length - 1], t = {
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
		}), p((e) => e.slice(0, -1)), r(t), a(!0);
	}, [n, d]), ie = m(() => ({
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
		saveError: _,
		clearSaveError: w,
		publishError: T,
		clearPublishError: k,
		publishedAt: D,
		undo: K,
		redo: re,
		canUndo: c.length > 0,
		canRedo: d.length > 0,
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
		_,
		w,
		T,
		k,
		D,
		K,
		re,
		c.length,
		d.length,
		H,
		W,
		G
	]);
	return /* @__PURE__ */ v(X.Provider, {
		value: ie,
		children: t
	});
}
function Ce() {
	return d(X) ?? null;
}
function we() {
	let e = d(X);
	if (!e) throw Error("usePipelineEditor must be used within a PipelineEditorProvider");
	return e;
}
//#endregion
//#region src/components/pipelines/hooks/useTriggerRun.ts
function Te() {
	let { idToken: e } = t(), [n, r] = g(!1), [i, a] = g(null), [o, s] = g(!1);
	return {
		triggerRun: u(async (t, n, i) => {
			r(!0), a(null), s(!1);
			try {
				let r = U(t), o = {};
				n && (o.triggerPayload = n), r && (o.definition = r);
				let c = {
					"Content-Type": "application/json",
					...e ? { Authorization: `Bearer ${e}` } : {}
				};
				i?.idempotencyKey && (c["Idempotency-Key"] = i.idempotencyKey);
				let l = await fetch(`/api/pipelines/${encodeURIComponent(t)}/runs`, {
					method: "POST",
					headers: c,
					body: JSON.stringify(o)
				});
				if (!l.ok) {
					let e = await l.text().catch(() => "");
					return a(`Trigger failed (${l.status})${e ? `: ${e}` : ""}`), null;
				}
				let u = typeof l.headers?.get == "function" ? l.headers.get("X-Idempotent-Replay") : l.headers["x-idempotent-replay"] ?? null;
				return s(u === "true"), (await l.json()).runId;
			} catch (e) {
				return a(e.message), null;
			} finally {
				r(!1);
			}
		}, ["", e]),
		isTriggering: n,
		lastError: i,
		isReplay: o
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
function Oe({ channel: e = "pipeline:all", onEvent: t, enabled: r = !1 }) {
	let { connectionState: i, sendMessage: a, onMessage: o } = n(), s = h(t);
	f(() => {
		s.current = t;
	}, [t]), f(() => {
		if (!r || i !== "connected") return;
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
		r,
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
	let { sendMessage: e } = n();
	return {
		subscribeToRun: u((t) => e({
			service: "pipeline",
			action: "subscribe",
			channel: `pipeline:run:${t}`
		}), [e]),
		unsubscribeFromRun: u((t) => e({
			service: "pipeline",
			action: "unsubscribe",
			channel: `pipeline:run:${t}`
		}), [e]),
		subscribeToAll: u(() => e({
			service: "pipeline",
			action: "subscribe",
			channel: "pipeline:all"
		}), [e]),
		unsubscribeFromAll: u(() => e({
			service: "pipeline",
			action: "unsubscribe",
			channel: "pipeline:all"
		}), [e]),
		subscribeToApprovals: u(() => e({
			service: "pipeline",
			action: "subscribe",
			channel: "pipeline:approvals"
		}), [e]),
		unsubscribeFromApprovals: u(() => e({
			service: "pipeline",
			action: "unsubscribe",
			channel: "pipeline:approvals"
		}), [e]),
		triggerRun: u((t, n = {}) => {
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
		cancelRun: u((t, n) => {
			let r = n ?? ke();
			return e({
				service: "pipeline",
				action: "cancel",
				runId: t,
				correlationId: r
			}), r;
		}, [e]),
		resolveApproval: u((t, n, r, i = {}) => {
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
		requestResumeFromStep: u((t, n, r) => {
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
	let { enabled: r = !0 } = t, { connectionState: i, sendMessage: a } = n();
	f(() => {
		if (!r || !e || i !== "connected") return;
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
		r,
		e,
		i,
		a
	]);
}
function Me() {
	let { connectionState: e, sendMessage: t } = n();
	return m(() => {
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
var Ne = c(null);
function Pe({ value: e, children: t }) {
	return /* @__PURE__ */ v(Ne.Provider, {
		value: e,
		children: t
	});
}
function Fe() {
	return d(Ne);
}
//#endregion
//#region src/components/pipelines/context/PipelineRunsContext.tsx
var Ie = 20, Le = c(null);
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
	let t = d(X), { triggerRun: n } = Te(), r = Ae(), [i, a] = g({}), [s, c] = g(!1), [l, p] = g(null), _ = h(/* @__PURE__ */ new Set()), y = h(null);
	f(() => {
		let e = t?.definition?.id;
		if (!e || y.current === e) return;
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
				for (let t of O(e)) n[t.id] || (n[t.id] = t);
				return n;
			}));
		}).finally(() => {
			n || (y.current = e, c(!1));
		}), () => {
			n = !0;
		};
	}, [t?.definition?.id]), o("*", (e) => {
		let { eventType: t, payload: n } = e;
		a((e) => He(e, t, n));
	}), f(() => {
		for (let e of Object.values(i)) if ((e.status === "completed" || e.status === "failed" || e.status === "cancelled") && !_.current.has(e.id)) {
			_.current.add(e.id);
			try {
				A(e.pipelineId, e);
			} catch (e) {
				console.warn("[PipelineRuns] appendRun failed", e);
			}
		}
	}, [i]);
	let b = u(async (e, t) => {
		let r = await n(e, t);
		if (!r) throw Error("Trigger failed (REST POST did not return a runId)");
		return r;
	}, [n]), S = u((e) => {
		r.cancelRun(e);
	}, [r]), C = u((e, t, n, i) => {
		r.resolveApproval(e, t, n, { comment: i });
	}, [r]), w = h(i);
	f(() => {
		w.current = i;
	}, [i]);
	let T = u(() => p(null), []), E = u(async (e) => {
		p(null);
		let t = Object.values(w.current).filter((e) => e.status === "failed").filter((t) => t.steps[e]?.status === "failed").sort((e, t) => t.startedAt.localeCompare(e.startedAt))[0];
		if (!t) {
			console.warn("[PipelineRuns] retryFromStep — no failed run found for node", e), p({
				nodeId: e,
				reason: "no-failed-run",
				message: "No failed run to retry from. The run history may have been cleared, or this node did not fail."
			});
			return;
		}
		try {
			await x(t.pipelineId, t.id, e);
		} catch (t) {
			console.error("[PipelineRuns] retryFromNode API failed", t), p({
				nodeId: e,
				reason: "request-failed",
				message: t instanceof Error ? t.message : "Retry request failed."
			});
		}
	}, []), k = u(async (e, t, n) => {
		let r = {
			...n ?? {},
			__breakpoints: t
		};
		return b(e, r);
	}, [b]), j = u((e, t, n = "continue") => {
		let r = w.current[e]?.pipelineId ?? "unknown";
		fetch(`/api/pipelines/${encodeURIComponent(r)}/runs/${encodeURIComponent(e)}/breakpoint/${encodeURIComponent(t)}/resolve`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ action: n })
		}).catch((e) => {
			console.error("[PipelineRuns] resolveBreakpoint API failed", e);
		});
	}, []), M = u(async (e, t, n, r) => {
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
	}, []), P = u(async (e, t, n) => {
		let r = w.current[e]?.pipelineId ?? "unknown", i = `/api/pipelines/${encodeURIComponent(r)}/runs/${encodeURIComponent(e)}/breakpoint/${encodeURIComponent(t)}/patch/${encodeURIComponent(n)}`, a = await fetch(i, { method: "DELETE" });
		if (a.status !== 204) {
			let e = await a.text().catch(() => "");
			throw Error(`revertContextPatch HTTP ${a.status}: ${e}`);
		}
	}, []), F = u((e) => {
		let t = D(e);
		t && a((e) => {
			let n = e[t.id];
			return n && (ze(n.status) && !ze(t.status) || n.status === t.status && Object.keys(n.steps).length >= Object.keys(t.steps).length) ? e : {
				...e,
				[t.id]: t
			};
		});
	}, []), I = m(() => Object.values(i).filter((e) => e.status === "running" || e.status === "pending" || e.status === "awaiting_approval" || e.status === "paused_at_breakpoint" || e.status === "stuck").map((e) => e.id), [i]), L = m(() => ({
		runs: i,
		activeRunIds: I,
		triggerRun: b,
		triggerDebugRun: k,
		cancelRun: S,
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
		k,
		S,
		C,
		j,
		M,
		P,
		E,
		l,
		T,
		F
	]);
	return /* @__PURE__ */ v(Le.Provider, {
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
	let e = d(Le);
	if (!e) throw Error("usePipelineRuns must be used within a PipelineRunsProvider");
	return e;
}
var We = async () => {};
function Ge() {
	let e = Fe(), t = d(Le), n = e?.retryFromStep, r = t?.retryFromStep;
	return m(() => n ? async (e) => {
		await n(e);
	} : r ?? void 0, [n, r]);
}
function Ke() {
	return Ge() ?? We;
}
function qe(e) {
	let t = Fe(), n = d(Le), r = t?.getLatestStepForNode, i = m(() => r ? r(e) : null, [r, e]), a = m(() => {
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
	let e = s(), t = Ue(), [n, r] = g(() => {
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
	}), [i, a] = g(!0), [o, c] = g(null), [l, d] = g(0), p = h(t.runs);
	f(() => {
		p.current = t.runs;
	}, [t.runs]);
	let _ = h(/* @__PURE__ */ new Map()), v = h(/* @__PURE__ */ new Set());
	return f(() => {
		let e = !1;
		a(!0), c(null), v.current = /* @__PURE__ */ new Set();
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
				console.error("[usePendingApprovals] /api/observability/dashboard?include=pendingApprovals failed:", t), c(t.message ?? "Failed to load pending approvals"), a(!1);
			}
		})(), () => {
			e = !0;
		};
	}, [l]), f(() => {
		let t = [];
		t.push(e.subscribe("pipeline.run.started", (e) => {
			let t = e;
			_.current.set(t.runId, t.pipelineId);
		})), t.push(e.subscribe("pipeline.approval.requested", (e) => {
			let t = e, n = _.current.get(t.runId) ?? p.current[t.runId]?.pipelineId ?? "", i = Je(n, t.stepId);
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
		approvals: m(() => Object.values(n).sort((e, t) => String(t.requestedAt ?? "").localeCompare(String(e.requestedAt ?? ""))), [n]),
		isLoading: i,
		error: o,
		retry: u(() => {
			d((e) => e + 1);
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
}, st = l(function({ value: e, onChange: t, samples: n, placeholder: r = "$.path.to.value", invalid: o = !1, errorMessage: s, disabled: c = !1, size: l = "md", enforcePrefix: u = !1, "data-testid": d }, f) {
	let m = p(), h = u && e.length > 0 && !e.startsWith("$.") ? "JSONPath must start with \"$.\"" : void 0, g = o || h != null, _ = s ?? h;
	return /* @__PURE__ */ y("div", {
		className: "flex flex-col gap-1 w-full",
		children: [
			/* @__PURE__ */ v(a, {
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
				"aria-describedby": _ ? m : void 0,
				"aria-invalid": g || void 0
			}),
			n && n.length > 0 && /* @__PURE__ */ v("div", {
				className: "flex flex-wrap gap-1",
				children: n.map((e) => /* @__PURE__ */ v("button", {
					type: "button",
					disabled: c,
					onClick: () => t(e.value),
					className: i("rounded border border-border bg-surface-hover font-mono text-text-secondary", "transition-colors duration-100", "hover:bg-info-bg hover:border-info-border hover:text-info-fg", "focus:outline-none focus:ring-2 focus:ring-info/40", "disabled:opacity-50 disabled:cursor-not-allowed", ot[l]),
					children: e.label
				}, e.value))
			}),
			_ && /* @__PURE__ */ v("p", {
				id: m,
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
	return /* @__PURE__ */ y("svg", {
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
			/* @__PURE__ */ v("rect", {
				x: "3",
				y: "3",
				width: "18",
				height: "18",
				rx: "2",
				ry: "2"
			}),
			/* @__PURE__ */ v("circle", {
				cx: "8.5",
				cy: "8.5",
				r: "1.5"
			}),
			/* @__PURE__ */ v("path", { d: "M21 15l-5-5L5 21" })
		]
	});
}
function dt({ src: e, alt: t, size: n = "md", aspectRatio: r = "square", rounded: a = !1, fallback: o, loading: s = "lazy", className: c, "data-testid": l }) {
	let [u, d] = g({
		src: e,
		status: "loading"
	}), f = e ? u.src === e ? u.status : "loading" : "error";
	return /* @__PURE__ */ y("div", {
		"data-testid": l,
		className: i("relative overflow-hidden bg-surface-hover", ct[n], r !== "auto" && lt[r], a ? "rounded-full" : "rounded-md", c),
		children: [
			f === "loading" && /* @__PURE__ */ v("div", {
				"aria-hidden": "true",
				className: "absolute inset-0 animate-pulse bg-surface-emphasis"
			}),
			f === "error" && /* @__PURE__ */ v("div", {
				className: "absolute inset-0 flex items-center justify-center bg-surface-hover",
				children: o ?? /* @__PURE__ */ v(ut, {})
			}),
			e && /* @__PURE__ */ v("img", {
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
				className: i("w-full h-full object-cover transition-opacity duration-200", f === "loaded" ? "opacity-100" : "opacity-0")
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
	let [t, n] = g(() => Math.max(0, Math.floor((Date.now() - e) / 1e3)));
	return f(() => {
		let t = () => n(Math.max(0, Math.floor((Date.now() - e) / 1e3)));
		t();
		let r = setInterval(t, 1e3);
		return () => clearInterval(r);
	}, [e]), /* @__PURE__ */ v("span", {
		"data-testid": "generative-image-preview-elapsed",
		className: "absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[10px] leading-none text-white/90",
		children: ft(t)
	});
}
function mt({ status: e, src: t, alt: n = "", startedAt: a, className: o }) {
	let s = r(), c = h(e), [l, u] = g(!1);
	return c.current !== e && (c.current = e, e === "done" && !s && u(!0)), f(() => {
		if (!l) return;
		let e = setTimeout(() => u(!1), 30);
		return () => clearTimeout(e);
	}, [l]), /* @__PURE__ */ v("div", {
		"data-testid": "generative-image-preview",
		"data-status": e,
		className: i("relative overflow-hidden rounded-md bg-surface-hover", o),
		children: e === "synthesizing" ? /* @__PURE__ */ y(_, { children: [
			/* @__PURE__ */ v("div", {
				"aria-hidden": "true",
				"data-testid": "generative-image-preview-shimmer",
				className: i("absolute inset-0", s ? "bg-surface-emphasis" : i("bg-gradient-to-r from-surface-hover via-surface-emphasis to-surface-hover", "bg-[length:400px_100%] animate-[skeleton-shimmer_1.4s_ease-in-out_infinite]"))
			}),
			!s && /* @__PURE__ */ v("div", {
				"aria-hidden": "true",
				"data-testid": "generative-image-preview-sweep",
				className: i("absolute inset-0", "bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.55)_50%,transparent_65%)]", "bg-[length:400px_100%] bg-no-repeat", "animate-[skeleton-shimmer_2.4s_linear_infinite]")
			}),
			/* @__PURE__ */ v("span", {
				className: i("absolute inset-0 flex items-center justify-center", "text-[11px] font-medium tracking-wide text-neutral select-none"),
				children: "✦ synthesizing"
			}),
			a !== void 0 && /* @__PURE__ */ v(pt, { startedAt: a })
		] }) : t ? /* @__PURE__ */ v("img", {
			src: t,
			alt: n,
			"data-testid": "generative-image-preview-img",
			className: i("h-full w-full object-cover", !s && "transition-[filter] duration-[400ms] ease-out", l ? "blur-[16px]" : "blur-0")
		}) : /* @__PURE__ */ v("div", {
			"aria-hidden": "true",
			className: "absolute inset-0 bg-surface-emphasis"
		})
	});
}
//#endregion
//#region src/components/pipelines/services/PipelineEditorServicesContext.tsx
var $ = c(null);
function ht({ services: e, children: t }) {
	return /* @__PURE__ */ v($.Provider, {
		value: e,
		children: t
	});
}
function gt() {
	let e = d($);
	if (!e) throw Error("useImageUrl must be called inside <PipelineEditorServicesProvider>. The host editor (e.g. wsg PipelineEditorPage) is responsible for mounting it with its own getImageUrl implementation.");
	return e.getImageUrl;
}
function _t() {
	return d($)?.getImageUrl ?? null;
}
function vt() {
	let e = d($);
	if (!e) throw Error("usePipelineEditorServices must be called inside <PipelineEditorServicesProvider>.");
	return e;
}
function yt(e) {
	let t = d($)?.nodeVocabulary?.[e];
	return m(() => ({
		label: (e, n) => t?.labels?.[e] ?? n,
		help: (e, n) => t?.help?.[e] ?? n,
		placeholder: (e, n) => t?.placeholders?.[e] ?? n
	}), [t]);
}
function bt(e, t) {
	let n = d($)?.modelOptions?.[e];
	return m(() => n ?? t, [n, t]);
}
function xt() {
	let e = d($)?.modelOptions;
	return m(() => (t, n) => e?.[t] ?? n, [e]);
}
function St() {
	let e = d($)?.webhookRelay;
	return m(() => ({
		enabled: e?.enabled ?? !1,
		publicUrlBase: e?.publicUrlBase
	}), [e?.enabled, e?.publicUrlBase]);
}
function Ct() {
	let e = d($)?.executableNodeTypes;
	return m(() => {
		if (!e) return () => !0;
		let t = new Set(e);
		return (e) => t.has(e);
	}, [e]);
}
//#endregion
export { A as $, je as A, me as B, qe as C, Pe as D, Ge as E, we as F, ie as G, he as H, Ce as I, U as J, ae as K, ve as L, Te as M, X as N, Fe as O, Se as P, M as Q, ge as R, Ve as S, Ke as T, re as U, _e as V, K as W, P as X, W as Y, N as Z, Ze as _, bt as a, Xe as b, vt as c, dt as d, j as et, st as f, Qe as g, nt as h, Ct as i, x as it, Oe as j, Me as k, St as l, at as m, gt as n, O as nt, xt as o, it as p, H as q, _t as r, b as rt, yt as s, ht as t, k as tt, mt as u, et as v, Ue as w, Ye as x, tt as y, pe as z };
