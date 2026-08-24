import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { n as t } from "./IdentityContext-m2wQF4sJ.js";
import { n } from "./WebSocketContext-DUvjGLFq.js";
import { a as r } from "./ToastProvider-DPq8u2eM.js";
import { t as i } from "./cn-DhjIN-s0.js";
import { t as a } from "./Input-DcK2h-jK.js";
import { n as o, r as s } from "./EventStreamContext-C0egqLaF.js";
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
	try {
		let t = localStorage.getItem(w(e));
		if (!t) return [];
		let n = JSON.parse(t);
		return Array.isArray(n) ? n : [];
	} catch {
		return [];
	}
}
function O(e, t) {
	return D(e).find((e) => e.id === t) ?? null;
}
function k(e, t) {
	let n = [t, ...D(e).filter((e) => e.id !== t.id)].sort((e, t) => t.startedAt.localeCompare(e.startedAt)).slice(0, C);
	E(w(e), JSON.stringify(n));
}
function A(e) {
	try {
		localStorage.removeItem(w(e));
	} catch {}
}
//#endregion
//#region src/api/pipelineRuns.ts
var j = /* @__PURE__ */ e({
	getPipelineRun: () => N,
	listPipelineRuns: () => M
});
async function M(e, t) {
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
async function N(e, t) {
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
		return console.error("[pipelineRuns] Failed to fetch run:", e), null;
	}
}
//#endregion
//#region src/components/pipelines/persistence/pipelineStorage.ts
var P = "ws_pipelines_v1_index", F = "ws_pipelines_v1:";
function I(e) {
	return `${F}${e}`;
}
var L = !1;
function R(e, t) {
	try {
		localStorage.setItem(e, t);
	} catch (e) {
		L || (L = !0, console.warn("[pipelineStorage] localStorage write failed", e));
	}
}
function z() {
	try {
		let e = localStorage.getItem(P);
		if (!e) return [];
		let t = JSON.parse(e);
		return Array.isArray(t) ? t : [];
	} catch {
		return [];
	}
}
function B(e) {
	R(P, JSON.stringify(e));
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
function ee(e) {
	B(z().filter((t) => t.id !== e));
}
function H() {
	return z();
}
function U(e) {
	try {
		let t = localStorage.getItem(I(e));
		return t ? JSON.parse(t) : null;
	} catch {
		return null;
	}
}
function te(e) {
	e.version = (e.version ?? 0) + 1, e.updatedAt = (/* @__PURE__ */ new Date()).toISOString(), R(I(e.id), JSON.stringify(e)), V(e);
}
function ne(e) {
	R(I(e.id), JSON.stringify(e));
}
function W(e) {
	R(I(e.id), JSON.stringify(e)), V(e);
}
function re(e) {
	try {
		localStorage.removeItem(I(e));
	} catch {}
	ee(e);
}
function ie(e) {
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
	return te(E), E;
}
function ae(e, t) {
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
	return te(s), s;
}
function oe(e) {
	let t = U(e);
	return t ? JSON.stringify(t, null, 2) : null;
}
//#endregion
//#region src/components/pipelines/persistence/pipelineStorageRemote.ts
function G(e = "") {
	return `/api/pipelines/defs${e}`;
}
var se = { "Content-Type": "application/json" };
async function ce() {
	let e = await fetch(G("/"), { credentials: "include" });
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
async function le(e) {
	let t = await fetch(G(`/${encodeURIComponent(e)}`), { credentials: "include" });
	if (t.status === 404) return null;
	if (!t.ok) throw Error(`loadPipelineRemote failed (${t.status})`);
	return await t.json();
}
async function ue(e) {
	let t = await fetch(G(`/${encodeURIComponent(e.id)}`), {
		method: "PUT",
		headers: se,
		credentials: "include",
		body: JSON.stringify(e)
	});
	if (!t.ok) throw Error(`savePipelineRemote failed (${t.status})`);
	return await t.json();
}
async function de(e) {
	let t = await fetch(G(`/${encodeURIComponent(e)}`), {
		method: "DELETE",
		credentials: "include"
	});
	if (!t.ok && t.status !== 404) throw Error(`deletePipelineRemote failed (${t.status})`);
}
async function fe(e) {
	let t = await fetch(G(`/${encodeURIComponent(e)}/publish`), {
		method: "POST",
		credentials: "include"
	});
	if (t.status === 404) return null;
	if (!t.ok) throw Error(`publishPipelineRemote failed (${t.status})`);
	return await t.json();
}
function K(e) {
	if (e instanceof SyntaxError) return !0;
	let t = e.message || String(e);
	return t.includes("NetworkError") || t.includes("Failed to fetch") || t.includes("network") || t.includes("ECONNREFUSED") || t.includes("Unexpected token") || t.includes("not valid JSON") || t.includes("500") || t.includes("502") || t.includes("503") || t.includes("504");
}
async function pe() {
	try {
		return await ce();
	} catch (e) {
		if (K(e)) return H();
		throw e;
	}
}
async function me(e) {
	try {
		let t = await le(e);
		return t && W(t), t ?? U(e);
	} catch (t) {
		if (K(t)) return U(e);
		throw t;
	}
}
async function he(e) {
	let t = {
		...e,
		version: (e.version ?? 0) + 1,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	W(t);
	try {
		return await ue(t);
	} catch (e) {
		if (K(e)) return t;
		throw e;
	}
}
async function ge(e) {
	re(e);
	try {
		await de(e);
	} catch (e) {
		if (K(e)) return;
		throw e;
	}
}
async function _e(e) {
	try {
		let t = await fe(e);
		return t && W(t), t;
	} catch (e) {
		if (K(e)) return null;
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
	W(r);
	try {
		await ue(r);
	} catch (e) {
		if (!K(e)) throw e;
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
			agentId: "",
			protocol: "a2a",
			inputTemplate: "{{context.input}}",
			streaming: !0
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
function q() {
	return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
var J = c(null);
function Se({ pipelineId: e, children: t }) {
	let [n, r] = g(null), [i, a] = g(!1), [o, s] = g(null), [c, l] = g([]), [d, p] = g([]), [_, y] = g(null), b = h(null), x = h(null), S = h(n);
	S.current = n;
	let C = u((e) => {
		S.current === e && a(!1);
	}, []), w = u(() => y(null), []), T = u((e) => (x.current = null, he(e).then(() => {
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
			b.current = null, T(e);
		}, ye), () => {
			b.current &&= (clearTimeout(b.current), null);
		};
	}, [
		n,
		i,
		T
	]), f(() => () => {
		let e = x.current;
		e && T(e);
	}, [e, T]);
	let E = u((e) => {
		l((t) => {
			let n = [...t, {
				nodes: e.nodes,
				edges: e.edges
			}];
			return n.length > be && n.shift(), n;
		}), p([]);
	}, []), D = u((e) => {
		let t = S.current;
		if (!t) return null;
		let n = e(t);
		return S.current = n, E(t), r(n), a(!0), n;
	}, [E]), O = u((e, t) => {
		let n = q();
		return D((r) => ({
			...r,
			nodes: [...r.nodes, {
				id: n,
				type: e,
				position: t,
				data: xe(e)
			}]
		})), n;
	}, [D]), k = u((e, t) => {
		D((n) => ({
			...n,
			nodes: n.nodes.map((n) => n.id === e ? {
				...n,
				...t
			} : n)
		}));
	}, [D]), A = u((e, t) => {
		D((n) => ({
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
	}, [D]), j = u((e) => {
		D((t) => ({
			...t,
			nodes: t.nodes.filter((t) => t.id !== e),
			edges: t.edges.filter((t) => t.source !== e && t.target !== e)
		})), s((t) => t === e ? null : t);
	}, [D]), M = u((e) => {
		let t = S.current;
		if (!t) return [];
		let n = [], r = new Set(e), i = /* @__PURE__ */ new Map(), a = t.nodes.filter((e) => r.has(e.id)).map((e) => {
			let t = q();
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
			id: q(),
			source: i.get(e.source) ?? e.source,
			target: i.get(e.target) ?? e.target
		}));
		return D((e) => ({
			...e,
			nodes: [...e.nodes, ...a],
			edges: [...e.edges, ...o]
		})), n;
	}, [D]), N = u((e) => {
		let t = q();
		return D((n) => ({
			...n,
			edges: [...n.edges, {
				id: t,
				...e
			}]
		})), t;
	}, [D]), P = u((e) => {
		D((t) => ({
			...t,
			edges: t.edges.filter((t) => t.id !== e)
		}));
	}, [D]), F = u((e) => {
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
	}, []), I = u(() => {
		n && (b.current &&= (clearTimeout(b.current), null), T(n));
	}, [n, T]), L = u(() => {
		if (!n) return;
		b.current &&= (clearTimeout(b.current), null);
		let e = n;
		(async () => {
			i && (await he(e), C(e));
			let t = await _e(n.id);
			t && r(t);
		})();
	}, [
		n,
		i,
		C
	]), R = u(() => {
		me(e).then((e) => {
			r(e), a(!1), y(null), l([]), p([]);
		});
	}, [e]), z = u((e) => {
		let t = e.trim();
		t && (r((e) => !e || e.name === t ? e : {
			...e,
			name: t
		}), a(!0));
	}, []), B = u((e) => {
		r((t) => !t || t.icon === e ? t : {
			...t,
			icon: e
		}), a(!0);
	}, []), V = u((e) => {
		r((t) => {
			if (!t) return t;
			let n = t.tags ?? [];
			return n.length === e.length && n.every((t, n) => t === e[n]) ? t : {
				...t,
				tags: [...e]
			};
		}), a(!0);
	}, []), ee = u(() => {
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
	}, [n, c]), H = u(() => {
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
	}, [n, d]), te = m(() => ({
		definition: n,
		dirty: i,
		selectedNodeId: o,
		setSelectedNodeId: s,
		addNode: O,
		updateNode: k,
		updateNodeData: A,
		removeNode: j,
		duplicateNodes: M,
		addEdge: N,
		removeEdge: P,
		setPositions: F,
		save: I,
		publish: L,
		revert: R,
		saveError: _,
		clearSaveError: w,
		undo: ee,
		redo: H,
		canUndo: c.length > 0,
		canRedo: d.length > 0,
		rename: z,
		setIcon: B,
		setTags: V
	}), [
		n,
		i,
		o,
		O,
		k,
		A,
		j,
		M,
		N,
		P,
		F,
		I,
		L,
		R,
		_,
		w,
		ee,
		H,
		c.length,
		d.length,
		z,
		B,
		V
	]);
	return /* @__PURE__ */ v(J.Provider, {
		value: te,
		children: t
	});
}
function Ce() {
	let e = d(J);
	if (!e) throw Error("usePipelineEditor must be used within a PipelineEditorProvider");
	return e;
}
//#endregion
//#region src/components/pipelines/hooks/useTriggerRun.ts
function we() {
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
var Te = Object.freeze({
	"pipeline.run.resume-from-step": "pipeline:run:resumeFromStep",
	"pipeline.run.resumed-from-step": "pipeline.run.resumed-from-step"
});
function Ee(e) {
	return Te[e] ?? e;
}
function De({ channel: e = "pipeline:all", onEvent: t, enabled: r = !1 }) {
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
				eventType: Ee(n),
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
function Y() {
	let e = typeof globalThis < "u" ? globalThis.crypto : void 0;
	return e && typeof e.randomUUID == "function" ? e.randomUUID() : `ws-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function Oe() {
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
			let r = n.correlationId ?? Y();
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
			let r = n ?? Y();
			return e({
				service: "pipeline",
				action: "cancel",
				runId: t,
				correlationId: r
			}), r;
		}, [e]),
		resolveApproval: u((t, n, r, i = {}) => {
			let a = i.correlationId ?? Y();
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
			let i = r ?? Y();
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
function ke(e, t = {}) {
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
//#endregion
//#region src/components/pipelines/context/PipelineNodeRuntimeContext.tsx
var Ae = c(null);
function je({ value: e, children: t }) {
	return /* @__PURE__ */ v(Ae.Provider, {
		value: e,
		children: t
	});
}
function Me() {
	return d(Ae);
}
//#endregion
//#region src/components/pipelines/context/PipelineRunsContext.tsx
var Ne = 20, X = c(null);
function Pe(e, t) {
	return e.steps[t] ?? {
		nodeId: t,
		status: "pending"
	};
}
function Z(e, t, n) {
	let r = Pe(e, t), i = typeof n == "function" ? n(r) : {
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
function Fe(e) {
	return e === "completed" || e === "failed" || e === "cancelled";
}
function Ie(e) {
	let t = Object.values(e);
	if (t.length <= Ne) return e;
	let n = t.filter((e) => e.status === "running" || e.status === "pending" || e.status === "awaiting_approval" || e.status === "paused_at_breakpoint"), r = t.filter((e) => e.status !== "running" && e.status !== "pending" && e.status !== "awaiting_approval" && e.status !== "paused_at_breakpoint").sort((e, t) => t.startedAt.localeCompare(e.startedAt)).slice(0, Math.max(0, Ne - n.length)), i = [...n, ...r], a = {};
	for (let e of i) a[e.id] = e;
	return a;
}
function Le({ children: e }) {
	let t = d(J), { triggerRun: n } = we(), r = Oe(), [i, a] = g({}), [s, c] = g(!1), [l, p] = g(null), _ = h(/* @__PURE__ */ new Set()), y = h(null);
	f(() => {
		let e = t?.definition?.id;
		if (!e || y.current === e) return;
		c(!0);
		let n = !1;
		return M(e, { limit: Ne }).then((e) => {
			n || a((t) => {
				let n = { ...t };
				for (let t of e.runs) n[t.id] || (n[t.id] = t);
				return n;
			});
		}).catch((t) => {
			n || (console.error("[PipelineRuns] Failed to load history from API", t), a((t) => {
				let n = { ...t };
				for (let t of D(e)) n[t.id] || (n[t.id] = t);
				return n;
			}));
		}).finally(() => {
			n || (y.current = e, c(!1));
		}), () => {
			n = !0;
		};
	}, [t?.definition?.id]), o("*", (e) => {
		let { eventType: t, payload: n } = e;
		a((e) => Re(e, t, n));
	}), f(() => {
		for (let e of Object.values(i)) if ((e.status === "completed" || e.status === "failed" || e.status === "cancelled") && !_.current.has(e.id)) {
			_.current.add(e.id);
			try {
				k(e.pipelineId, e);
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
	}, []), O = u(async (e, t, n) => {
		let r = {
			...n ?? {},
			__breakpoints: t
		};
		return b(e, r);
	}, [b]), A = u((e, t, n = "continue") => {
		let r = w.current[e]?.pipelineId ?? "unknown";
		fetch(`/api/pipelines/${encodeURIComponent(r)}/runs/${encodeURIComponent(e)}/breakpoint/${encodeURIComponent(t)}/resolve`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ action: n })
		}).catch((e) => {
			console.error("[PipelineRuns] resolveBreakpoint API failed", e);
		});
	}, []), j = u(async (e, t, n, r) => {
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
	}, []), N = u(async (e, t, n) => {
		let r = w.current[e]?.pipelineId ?? "unknown", i = `/api/pipelines/${encodeURIComponent(r)}/runs/${encodeURIComponent(e)}/breakpoint/${encodeURIComponent(t)}/patch/${encodeURIComponent(n)}`, a = await fetch(i, { method: "DELETE" });
		if (a.status !== 204) {
			let e = await a.text().catch(() => "");
			throw Error(`revertContextPatch HTTP ${a.status}: ${e}`);
		}
	}, []), P = u((e) => {
		a((t) => {
			let n = t[e.id];
			return n && (Fe(n.status) && !Fe(e.status) || n.status === e.status && Object.keys(n.steps).length >= Object.keys(e.steps).length) ? t : {
				...t,
				[e.id]: e
			};
		});
	}, []), F = m(() => Object.values(i).filter((e) => e.status === "running" || e.status === "pending" || e.status === "awaiting_approval" || e.status === "paused_at_breakpoint").map((e) => e.id), [i]), I = m(() => ({
		runs: i,
		activeRunIds: F,
		triggerRun: b,
		triggerDebugRun: O,
		cancelRun: S,
		resolveApproval: C,
		resolveBreakpoint: A,
		applyContextPatch: j,
		revertContextPatch: N,
		retryFromStep: E,
		retryError: l,
		clearRetryError: T,
		ingestRun: P
	}), [
		i,
		F,
		b,
		O,
		S,
		C,
		A,
		j,
		N,
		E,
		l,
		T,
		P
	]);
	return /* @__PURE__ */ v(X.Provider, {
		value: I,
		children: e
	});
}
function Re(e, t, n) {
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
			return Ie({
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
function ze() {
	let e = d(X);
	if (!e) throw Error("usePipelineRuns must be used within a PipelineRunsProvider");
	return e;
}
function Be() {
	let e = Me(), t = d(X), n = e?.retryFromStep, r = t?.retryFromStep;
	return m(() => n ? async (e) => {
		await n(e);
	} : r ?? (async () => {}), [n, r]);
}
function Ve(e) {
	let t = Me(), n = d(X), r = t?.getLatestStepForNode, i = m(() => r ? r(e) : null, [r, e]), a = m(() => {
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
function He(e, t) {
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
function Ue() {
	let e = s(), t = ze(), [n, r] = g(() => {
		let e = {};
		for (let n in t.runs) {
			let r = t.runs[n];
			if (r.status === "awaiting_approval") for (let t in r.steps) {
				let i = r.steps[t];
				if (i.status !== "awaiting") continue;
				let a = He(r.pipelineId, t), o = U(r.pipelineId)?.nodes.find((e) => e.id === t), s = o && o.data.type === "approval" ? o.data.approvers : [];
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
				if (e.message?.includes("Dashboard fetch failed")) throw e;
				return null;
			}
		};
		return (async () => {
			try {
				let n = await t();
				if (e) return;
				if (n?.pendingApprovals) {
					let e = {};
					for (let t of n.pendingApprovals) {
						let n = He(t.pipelineId, t.stepId);
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
			let t = e, n = _.current.get(t.runId) ?? p.current[t.runId]?.pipelineId ?? "", i = He(n, t.stepId);
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
		approvals: m(() => Object.values(n).sort((e, t) => t.requestedAt.localeCompare(e.requestedAt)), [n]),
		isLoading: i,
		error: o,
		retry: u(() => {
			d((e) => e + 1);
		}, [])
	};
}
function We() {
	let { approvals: e } = Ue();
	return e;
}
//#endregion
//#region src/api/pipelineBreakpointPatch.ts
var Ge = class extends Error {
	reason;
	result;
	constructor(e, t) {
		super(e), this.name = "PatchValidationRejectedError", this.reason = e, this.result = t;
	}
}, Ke = class extends Error {
	status;
	body;
	constructor(e, t, n) {
		super(t), this.name = "PatchHttpError", this.status = e, this.body = n;
	}
};
function qe(e, t, n, r) {
	let i = `/api/pipelines/${encodeURIComponent(e)}/runs/${encodeURIComponent(t)}/breakpoint/${encodeURIComponent(n)}/patch`;
	return r ? `${i}/${encodeURIComponent(r)}` : `${i}`;
}
async function Je(e, t, n, r, i) {
	let a = await fetch(qe(e, t, n), {
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
		throw e.result && e.result.validation && e.result.validation.ok === !1 && typeof e.result.validation.reason == "string" ? t = e.result.validation.reason : typeof e.error == "string" && (t = e.error), new Ge(t, e.result);
	}
	let o = await a.text().catch(() => ""), s;
	try {
		s = JSON.parse(o);
	} catch {
		s = o;
	}
	throw new Ke(a.status, `applyPatch HTTP ${a.status}: ${o}`, s);
}
async function Ye(e, t, n, r) {
	let i = await fetch(qe(e, t, n, r), {
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
	throw new Ke(i.status, `revertPatch HTTP ${i.status}: ${a}`, o);
}
//#endregion
//#region src/api/pipelineResume.ts
async function Xe(e, t, n, r) {
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
function Ze(e) {
	let t = [];
	for (let [n, r] of Object.entries(e)) if (r != null) {
		if (Array.isArray(r)) {
			if (r.length === 0) continue;
			t.push(`${encodeURIComponent(n)}=${encodeURIComponent(r.join(","))}`);
		} else t.push(`${encodeURIComponent(n)}=${encodeURIComponent(String(r))}`);
	}
	return t.length > 0 ? `?${t.join("&")}` : "";
}
async function Qe(e, t, n = {}) {
	let r = Ze({
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
async function $e(e) {
	if (!e.actor && !e.pipelineId) throw Error("searchAudit requires at least one of `actor` or `pipelineId`");
	let t = `/api/pipelines/audit/search${Ze({
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
var et = {
	sm: "px-1.5 py-0.5 text-[11px]",
	md: "px-2 py-0.5 text-[12px]"
}, tt = l(function({ value: e, onChange: t, samples: n, placeholder: r = "$.path.to.value", invalid: o = !1, errorMessage: s, disabled: c = !1, size: l = "md", enforcePrefix: u = !1, "data-testid": d }, f) {
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
					className: i("rounded border border-border bg-surface-hover font-mono text-text-secondary", "transition-colors duration-100", "hover:bg-info-bg hover:border-info-border hover:text-info-fg", "focus:outline-none focus:ring-2 focus:ring-info/40", "disabled:opacity-50 disabled:cursor-not-allowed", et[l]),
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
}), nt = l(function({ value: e, onChange: t, onClear: n, min: r, max: i, step: o, unit: s, placeholder: c, invalid: l = !1, disabled: d = !1, size: f = "md", id: p, name: m, required: h, "aria-label": g, "aria-labelledby": _, "aria-describedby": y, "aria-invalid": b, "aria-required": x, "data-testid": S }, C) {
	let w = u((e) => {
		let t = e;
		return r !== void 0 && t < r && (t = r), i !== void 0 && t > i && (t = i), t;
	}, [r, i]), T = u((e) => {
		let r = e.target.value;
		if (r === "" && n) {
			n();
			return;
		}
		let i = parseFloat(r);
		Number.isNaN(i) || t(i);
	}, [t, n]), E = u((e) => {
		let n = parseFloat(e.target.value);
		if (!Number.isNaN(n)) {
			let e = w(n);
			e !== n && t(e);
		}
	}, [w, t]);
	return /* @__PURE__ */ v(a, {
		ref: C,
		type: "number",
		size: f,
		value: e ?? "",
		min: r,
		max: i,
		step: o,
		placeholder: c,
		invalid: l,
		disabled: d,
		suffix: s ? /* @__PURE__ */ v("span", {
			className: "text-text-tertiary font-sans text-[12px] select-none",
			children: s
		}) : void 0,
		id: p,
		name: m,
		required: h,
		"aria-label": g,
		"aria-labelledby": _,
		"aria-describedby": y,
		"aria-invalid": b,
		"aria-required": x,
		"data-testid": S,
		onChange: T,
		onBlur: E
	});
});
//#endregion
//#region src/components/forms/RadioGroup.tsx
function rt({ name: e, value: t, onChange: n, options: r, disabled: a = !1, orientation: o = "vertical", "data-testid": s }) {
	let c = p();
	return /* @__PURE__ */ v("div", {
		role: "radiogroup",
		"data-testid": s,
		className: i("flex", o === "vertical" ? "flex-col gap-2" : "flex-row flex-wrap gap-x-4 gap-y-2"),
		children: r.map((r, o) => {
			let s = `${c}-${o}`, l = r.value === t;
			return /* @__PURE__ */ y("label", {
				htmlFor: s,
				className: i("flex items-start gap-2.5 cursor-pointer select-none", a && "opacity-50 cursor-not-allowed"),
				children: [/* @__PURE__ */ y("span", {
					className: "relative flex shrink-0 mt-0.5",
					children: [
						/* @__PURE__ */ v("input", {
							id: s,
							type: "radio",
							name: e,
							value: r.value,
							checked: l,
							disabled: a,
							onChange: () => n(r.value),
							className: "sr-only peer"
						}),
						/* @__PURE__ */ v("span", {
							"aria-hidden": "true",
							className: i("block w-4 h-4 rounded-full border-2 transition-colors duration-150", l ? "border-info bg-white" : "border-border-emphasis bg-white", !a && !l && "peer-hover:border-info", "peer-focus-visible:ring-2 peer-focus-visible:ring-info/40 peer-focus-visible:ring-offset-1")
						}),
						l && /* @__PURE__ */ v("span", {
							"aria-hidden": "true",
							className: "absolute inset-0 m-auto block w-2 h-2 rounded-full bg-info"
						})
					]
				}), /* @__PURE__ */ y("span", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ v("span", {
						className: i("text-[13px] leading-5 font-medium", a ? "text-text-tertiary" : "text-text-primary"),
						children: r.label
					}), r.description && /* @__PURE__ */ v("span", {
						className: i("text-[11px] leading-4 mt-0.5", a ? "text-text-disabled" : "text-neutral"),
						children: r.description
					})]
				})]
			}, r.value);
		})
	});
}
//#endregion
//#region src/components/forms/Slider.tsx
var it = l(function({ value: e, onChange: t, min: n = 0, max: r = 100, step: a = 1, "aria-label": o, readout: s = !0, disabled: c = !1, className: l, "data-testid": u }, d) {
	let f = p(), m = typeof s == "function" ? s(e) : String(e);
	return /* @__PURE__ */ y("div", {
		className: i("flex items-center gap-2", l),
		children: [/* @__PURE__ */ v("input", {
			ref: d,
			id: f,
			type: "range",
			min: n,
			max: r,
			step: a,
			value: e,
			disabled: c,
			"aria-label": o,
			onChange: (e) => t(parseFloat(e.target.value)),
			className: "flex-1 accent-primary cursor-pointer disabled:cursor-not-allowed",
			"data-testid": u
		}), s !== !1 && /* @__PURE__ */ v("output", {
			htmlFor: f,
			className: "text-xs text-text-secondary tabular-nums min-w-[2.5rem] text-right",
			children: m
		})]
	});
}), at = {
	sm: "w-16",
	md: "w-32",
	lg: "w-48"
}, ot = {
	square: "aspect-square",
	video: "aspect-video",
	auto: ""
};
function st() {
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
function ct({ src: e, alt: t, size: n = "md", aspectRatio: r = "square", rounded: a = !1, fallback: o, loading: s = "lazy", className: c, "data-testid": l }) {
	let [u, d] = g("loading");
	return /* @__PURE__ */ y("div", {
		"data-testid": l,
		className: i("relative overflow-hidden bg-surface-hover", at[n], r !== "auto" && ot[r], a ? "rounded-full" : "rounded-md", c),
		children: [
			u === "loading" && /* @__PURE__ */ v("div", {
				"aria-hidden": "true",
				className: "absolute inset-0 animate-pulse bg-surface-emphasis"
			}),
			u === "error" && /* @__PURE__ */ v("div", {
				className: "absolute inset-0 flex items-center justify-center bg-surface-hover",
				children: o ?? /* @__PURE__ */ v(st, {})
			}),
			/* @__PURE__ */ v("img", {
				src: e,
				alt: t,
				loading: s,
				onLoad: () => d("loaded"),
				onError: () => d("error"),
				className: i("w-full h-full object-cover transition-opacity duration-200", u === "loaded" ? "opacity-100" : "opacity-0")
			})
		]
	});
}
//#endregion
//#region src/components/image/GenerativeImagePreview.tsx
function lt(e) {
	return e < 60 ? `${e}s` : `${Math.floor(e / 60)}m ${e % 60}s`;
}
function ut({ startedAt: e }) {
	let [t, n] = g(() => Math.max(0, Math.floor((Date.now() - e) / 1e3)));
	return f(() => {
		let t = () => n(Math.max(0, Math.floor((Date.now() - e) / 1e3)));
		t();
		let r = setInterval(t, 1e3);
		return () => clearInterval(r);
	}, [e]), /* @__PURE__ */ v("span", {
		"data-testid": "generative-image-preview-elapsed",
		className: "absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[10px] leading-none text-white/90",
		children: lt(t)
	});
}
function dt({ status: e, src: t, alt: n = "", startedAt: a, className: o }) {
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
			a !== void 0 && /* @__PURE__ */ v(ut, { startedAt: a })
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
function ft({ services: e, children: t }) {
	return /* @__PURE__ */ v($.Provider, {
		value: e,
		children: t
	});
}
function pt() {
	let e = d($);
	if (!e) throw Error("useImageUrl must be called inside <PipelineEditorServicesProvider>. The host editor (e.g. wsg PipelineEditorPage) is responsible for mounting it with its own getImageUrl implementation.");
	return e.getImageUrl;
}
function mt() {
	let e = d($);
	if (!e) throw Error("usePipelineEditorServices must be called inside <PipelineEditorServicesProvider>.");
	return e;
}
function ht(e) {
	let t = d($)?.nodeVocabulary?.[e];
	return m(() => ({
		label: (e, n) => t?.labels?.[e] ?? n,
		help: (e, n) => t?.help?.[e] ?? n,
		placeholder: (e, n) => t?.placeholders?.[e] ?? n
	}), [t]);
}
function gt(e, t) {
	let n = d($)?.modelOptions?.[e];
	return m(() => n ?? t, [n, t]);
}
function _t() {
	let e = d($)?.modelOptions;
	return m(() => (t, n) => e?.[t] ?? n, [e]);
}
function vt() {
	let e = d($)?.executableNodeTypes;
	return m(() => {
		if (!e) return () => !0;
		let t = new Set(e);
		return (e) => t.has(e);
	}, [e]);
}
//#endregion
export { O as $, De as A, he as B, Le as C, je as D, Be as E, ve as F, H as G, re as H, ge as I, N as J, U as K, pe as L, J as M, Se as N, Me as O, Ce as P, A as Q, me as R, Ue as S, ze as T, ae as U, ie as V, oe as W, j as X, M as Y, k as Z, Ke as _, _t as a, Ye as b, dt as c, rt as d, D as et, nt as f, Xe as g, $e as h, gt as i, we as j, ke as k, ct as l, Qe as m, pt as n, x as nt, ht as o, tt as p, te as q, vt as r, mt as s, ft as t, b as tt, it as u, Ge as v, Ve as w, We as x, Je as y, _e as z };
