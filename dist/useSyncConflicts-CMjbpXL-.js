import { n as e, r as t } from "./IdentityContext-CQM1qwH6.js";
import { t as n } from "./apiBaseUrl-DLrXlmVj.js";
import { n as r } from "./WebSocketContext-DUvjGLFq.js";
import { useCallback as i, useEffect as a, useRef as o, useState as s } from "react";
//#region src/hooks/useDocTypeProposals.ts
var c = "", l = 3e4;
function u() {
	let { idToken: t, userEmail: n } = e(), [r, o] = s([]), [u, d] = s(!0), [f, p] = s(null), m = i(() => {
		let e = { "Content-Type": "application/json" };
		return t && (e.Authorization = `Bearer ${t}`), e;
	}, [t]), h = i(async () => {
		d(!0), p(null);
		try {
			let e = await fetch(`${c}/api/ingest/mapping/proposals`, { headers: m() });
			if (!e.ok) throw Error(`HTTP ${e.status}`);
			let t = await e.json();
			o(t.proposals);
		} catch (e) {
			p(e instanceof Error ? e.message : String(e));
		} finally {
			d(!1);
		}
	}, [m]);
	a(() => {
		h();
		let e = window.setInterval(() => {
			document.hidden || h();
		}, l);
		return () => window.clearInterval(e);
	}, [h]);
	let g = i(async (e, t) => {
		let r = await fetch(`${c}/api/ingest/mapping/proposals/${encodeURIComponent(e)}/${t}`, {
			method: "POST",
			headers: m(),
			body: JSON.stringify({ reviewedBy: n ?? "operator" })
		});
		if (!r.ok) throw Error(`HTTP ${r.status}`);
		await h();
	}, [
		m,
		h,
		n
	]);
	return {
		proposals: r,
		loading: u,
		error: f,
		refresh: h,
		promote: (e) => g(e, "promote"),
		reject: (e) => g(e, "reject")
	};
}
//#endregion
//#region src/hooks/useIngestAudit.ts
var d = "", f = 3e4;
function p(t = {}) {
	let { idToken: n } = e(), [r, o] = s([]), [c, l] = s(!0), [u, p] = s(null), m = i(async () => {
		l(!0), p(null);
		try {
			let e = { "Content-Type": "application/json" };
			n && (e.Authorization = `Bearer ${n}`);
			let r = new URLSearchParams();
			t.since && r.set("since", t.since), t.until && r.set("until", t.until), t.actor && r.set("actor", t.actor), t.eventType && r.set("eventType", t.eventType), t.targetId && r.set("targetId", t.targetId), t.limit && r.set("limit", String(t.limit));
			let i = r.toString(), a = `${d}/api/ingest/audit${i ? `?${i}` : ""}`, s = await fetch(a, { headers: e });
			if (!s.ok) throw Error(`HTTP ${s.status}`);
			let c = await s.json();
			o(c.entries);
		} catch (e) {
			p(e instanceof Error ? e.message : String(e));
		} finally {
			l(!1);
		}
	}, [
		n,
		t.since,
		t.until,
		t.actor,
		t.eventType,
		t.targetId,
		t.limit
	]);
	return a(() => {
		m();
		let e = window.setInterval(() => {
			document.hidden || m();
		}, f);
		return () => window.clearInterval(e);
	}, [m]), {
		entries: r,
		loading: c,
		error: u,
		refresh: m
	};
}
//#endregion
//#region src/hooks/useIngestDLQ.ts
var m = "", h = 3e4;
function g() {
	let { idToken: t } = e(), [n, r] = s([]), [o, c] = s(!0), [l, u] = s(null), d = i(() => {
		let e = { "Content-Type": "application/json" };
		return t && (e.Authorization = `Bearer ${t}`), e;
	}, [t]), f = i(async () => {
		c(!0), u(null);
		try {
			let e = await fetch(`${m}/api/ingest/dlq`, { headers: d() });
			if (!e.ok) {
				if (e.status === 503) {
					u("Ingest DLQ is not initialized yet. Start a sync to populate it."), r([]);
					return;
				}
				throw Error(`HTTP ${e.status}`);
			}
			let t = await e.json();
			r(t.items);
		} catch (e) {
			u(e instanceof Error ? e.message : String(e));
		} finally {
			c(!1);
		}
	}, [d]);
	return a(() => {
		f();
		let e = window.setInterval(() => {
			document.hidden || f();
		}, h);
		return () => window.clearInterval(e);
	}, [f]), {
		entries: n,
		loading: o,
		error: l,
		refresh: f,
		replay: i(async (e) => {
			let t = await fetch(`${m}/api/ingest/dlq/${encodeURIComponent(e)}/replay`, {
				method: "POST",
				headers: d()
			});
			if (!t.ok) throw Error(`HTTP ${t.status}`);
			await f();
		}, [d, f]),
		drop: i(async (e) => {
			let t = await fetch(`${m}/api/ingest/dlq/${encodeURIComponent(e)}`, {
				method: "DELETE",
				headers: d()
			});
			if (!t.ok) throw Error(`HTTP ${t.status}`);
			await f();
		}, [d, f])
	};
}
//#endregion
//#region src/hooks/useIngestItems.ts
function _(e) {
	return {
		itemId: e.itemId ?? e.ingestId ?? "",
		sourceId: e.sourceId,
		sourcePath: e.sourcePath ?? e.filePath ?? "",
		status: e.status,
		documentTypeId: e.documentTypeId ?? e.mappedTypeId ?? null,
		documentId: e.documentId ?? null,
		pipelineRunId: e.pipelineRunId ?? null,
		mappingMethod: e.mappingMethod ?? null,
		mappingConfidence: e.mappingConfidence ?? null,
		attempts: e.attempts,
		error: e.error ?? null,
		createdAt: e.createdAt,
		updatedAt: e.updatedAt
	};
}
function v(e = {}) {
	let { sourceId: r, status: c } = e, l = t(), u = e.idToken === void 0 ? l?.idToken ?? null : e.idToken, d = e.baseUrl ?? n(), [f, p] = s([]), [m, h] = s(!0), [g, v] = s(null), [y, b] = s(null), x = o(!0), S = o(0), C = i(() => {
		let e = { "Content-Type": "application/json" };
		return u && (e.Authorization = `Bearer ${u}`), e;
	}, [u]), w = i(async () => {
		let e = ++S.current, t = () => x.current && e === S.current;
		h(!0), v(null);
		try {
			let e = new URLSearchParams();
			r && e.set("sourceId", r), c && e.set("status", c);
			let n = e.toString(), i = `${d}/api/ingest/items${n ? `?${n}` : ""}`, a = await fetch(i, { headers: C() });
			if (!a.ok) throw Error(`HTTP ${a.status}`);
			let o = await a.json();
			t() && p((o.items ?? []).map(_));
		} catch (e) {
			t() && v(e instanceof Error ? e.message : String(e));
		} finally {
			t() && h(!1);
		}
	}, [
		C,
		r,
		c,
		d
	]);
	a(() => (x.current = !0, w(), () => {
		x.current = !1, S.current += 1;
	}), [w]);
	let T = i(() => b(null), []);
	return {
		items: f,
		loading: m,
		error: g,
		refresh: w,
		retryItem: i(async (e) => {
			try {
				let t = await fetch(`${d}/api/ingest/items/${e}/retry`, {
					method: "POST",
					headers: C()
				});
				if (!t.ok) throw Error(`HTTP ${t.status}`);
				return p((t) => t.map((t) => t.itemId === e ? {
					...t,
					status: "queued",
					error: null
				} : t)), !0;
			} catch (e) {
				return b(e instanceof Error ? e.message : String(e)), !1;
			}
		}, [C, d]),
		skipItem: i(async (e) => {
			try {
				let t = await fetch(`${d}/api/ingest/items/${e}/skip`, {
					method: "POST",
					headers: C()
				});
				if (!t.ok) throw Error(`HTTP ${t.status}`);
				return p((t) => t.filter((t) => t.itemId !== e)), !0;
			} catch (e) {
				return b(e instanceof Error ? e.message : String(e)), !1;
			}
		}, [C, d]),
		actionError: y,
		clearActionError: T
	};
}
//#endregion
//#region src/hooks/useIngestProgress.ts
var y = "ingest:progress";
function b() {
	let { sendMessage: e, onMessage: t, connectionState: n } = r(), [c, l] = s([]), [u, d] = s(() => /* @__PURE__ */ new Map()), f = o(e);
	return a(() => {
		f.current = e;
	}, [e]), a(() => t((e) => {
		let t = e.type ?? "", n = e.channel === y, r = t.startsWith("sync.") || t.startsWith("item.");
		if (!n && !r) return;
		let { type: i, ...a } = e, o = {
			...a,
			type: t,
			timestamp: e.timestamp ?? (/* @__PURE__ */ new Date()).toISOString()
		};
		l((e) => [...e, o].slice(-50));
		let s = e.sourceId ?? e.source_id ?? "";
		t === "sync.started" && s ? d((t) => {
			let n = new Map(t);
			return n.set(s, {
				sourceId: s,
				sourceName: e.sourceName ?? e.source_name ?? s,
				fileCount: e.fileCount ?? 0,
				filesFetched: 0,
				itemsMapped: 0,
				itemsMaterialized: 0,
				startedAt: o.timestamp
			}), n;
		}) : t === "sync.progress" && s ? d((t) => {
			let n = t.get(s);
			if (!n) return t;
			let r = new Map(t);
			return r.set(s, {
				...n,
				fileCount: e.fileCount ?? n.fileCount,
				filesFetched: e.filesFetched ?? n.filesFetched
			}), r;
		}) : t === "sync.completed" && s || t === "sync.failed" && s ? d((e) => {
			let t = new Map(e);
			return t.delete(s), t;
		}) : t === "item.mapped" && s ? d((e) => {
			let t = e.get(s);
			if (!t) return e;
			let n = new Map(e);
			return n.set(s, {
				...t,
				itemsMapped: t.itemsMapped + 1
			}), n;
		}) : t === "item.materialized" && s ? d((e) => {
			let t = e.get(s);
			if (!t) return e;
			let n = new Map(e);
			return n.set(s, {
				...t,
				itemsMaterialized: t.itemsMaterialized + 1
			}), n;
		}) : t === "item.failed" && s && d((e) => {
			let t = e.get(s);
			if (!t) return e;
			let n = new Map(e);
			return n.set(s, {
				...t,
				filesFetched: t.filesFetched + 1
			}), n;
		});
	}), [t]), a(() => {
		if (n === "connected") return f.current({
			service: "ingest",
			action: "subscribe",
			channelId: y
		}), () => {
			f.current({
				service: "ingest",
				action: "unsubscribe",
				channelId: y
			});
		};
	}, [n]), {
		events: c,
		activeSyncs: u,
		clearEvents: i(() => {
			l([]);
		}, [])
	};
}
//#endregion
//#region src/hooks/useIngestSources.ts
function x(e = {}) {
	let r = t(), c = e.idToken === void 0 ? r?.idToken ?? null : e.idToken, l = e.baseUrl ?? n(), [u, d] = s([]), [f, p] = s(!0), [m, h] = s(null), [g, _] = s(null), v = o(!0), y = o(0), b = i(() => {
		let e = { "Content-Type": "application/json" };
		return c && (e.Authorization = `Bearer ${c}`), e;
	}, [c]), x = i(() => _(null), []), S = i(async () => {
		let e = ++y.current, t = () => v.current && e === y.current;
		p(!0), h(null);
		try {
			let e = await fetch(`${l}/api/ingest/sources`, { headers: b() });
			if (!e.ok) throw Error(`HTTP ${e.status}`);
			let n = await e.json();
			t() && d(n.sources ?? []);
		} catch (e) {
			t() && h(e instanceof Error ? e.message : String(e));
		} finally {
			t() && p(!1);
		}
	}, [b, l]);
	return a(() => (v.current = !0, S(), () => {
		v.current = !1, y.current += 1;
	}), [S]), {
		sources: u,
		loading: f,
		error: m,
		refresh: S,
		createSource: i(async (e) => {
			try {
				let t = await fetch(`${l}/api/ingest/sources`, {
					method: "POST",
					headers: b(),
					body: JSON.stringify(e)
				});
				if (!t.ok) throw Error(`HTTP ${t.status}`);
				let n = await t.json();
				return d((e) => [...e, n]), n;
			} catch (e) {
				return _(e instanceof Error ? e.message : String(e)), null;
			}
		}, [b, l]),
		deleteSource: i(async (e) => {
			try {
				let t = await fetch(`${l}/api/ingest/sources/${e}`, {
					method: "DELETE",
					headers: b()
				});
				if (!t.ok) throw Error(`HTTP ${t.status}`);
				return d((t) => t.filter((t) => t.sourceId !== e)), !0;
			} catch (e) {
				return _(e instanceof Error ? e.message : String(e)), !1;
			}
		}, [b, l]),
		triggerSync: i(async (e) => {
			try {
				let t = await fetch(`${l}/api/ingest/sources/${e}/sync`, {
					method: "POST",
					headers: b()
				});
				if (!t.ok) throw Error(`HTTP ${t.status}`);
				return !0;
			} catch (e) {
				return _(e instanceof Error ? e.message : String(e)), !1;
			}
		}, [b, l]),
		actionError: g,
		clearActionError: x
	};
}
//#endregion
//#region src/hooks/useMappingReviewQueue.ts
var S = 15e3;
function C(e) {
	return {
		itemId: e.itemId ?? e.ingestId ?? "",
		sourceId: e.sourceId,
		sourcePath: e.sourcePath ?? e.filePath ?? "",
		status: e.status,
		documentTypeId: e.documentTypeId ?? e.mappedTypeId ?? null,
		documentId: e.documentId ?? null,
		pipelineRunId: e.pipelineRunId ?? null,
		mappingMethod: e.mappingMethod ?? null,
		mappingConfidence: e.mappingConfidence ?? null,
		attempts: e.attempts,
		error: e.error ?? null,
		createdAt: e.createdAt,
		updatedAt: e.updatedAt
	};
}
function w(e = {}) {
	let r = t(), o = e.idToken === void 0 ? r?.idToken ?? null : e.idToken, c = e.baseUrl ?? n(), [l, u] = s([]), [d, f] = s(.7), [p, m] = s(!0), [h, g] = s(null), _ = i(() => {
		let e = { "Content-Type": "application/json" };
		return o && (e.Authorization = `Bearer ${o}`), e;
	}, [o]), v = i(async () => {
		m(!0), g(null);
		try {
			let e = await fetch(`${c}/api/ingest/mapping/review`, { headers: _() });
			if (!e.ok) throw Error(`HTTP ${e.status}`);
			let t = await e.json();
			u(t.items.map(C)), f(t.threshold);
		} catch (e) {
			g(e instanceof Error ? e.message : String(e));
		} finally {
			m(!1);
		}
	}, [_, c]);
	return a(() => {
		v();
		let e = window.setInterval(() => {
			document.hidden || v();
		}, S);
		return () => window.clearInterval(e);
	}, [v]), {
		items: l,
		threshold: d,
		loading: p,
		error: h,
		refresh: v,
		remap: i(async (e, t) => {
			let n = await fetch(`${c}/api/ingest/items/${e}/remap`, {
				method: "POST",
				headers: _(),
				body: JSON.stringify({ typeId: t })
			});
			if (!n.ok) throw Error(`HTTP ${n.status}`);
			await v();
		}, [
			_,
			v,
			c
		]),
		skip: i(async (e) => {
			let t = await fetch(`${c}/api/ingest/items/${e}/skip`, {
				method: "POST",
				headers: _()
			});
			if (!t.ok) throw Error(`HTTP ${t.status}`);
			await v();
		}, [
			_,
			v,
			c
		])
	};
}
//#endregion
//#region src/hooks/usePipelineDefs.ts
function T(e = {}) {
	let r = t(), c = e.idToken === void 0 ? r?.idToken ?? null : e.idToken, l = e.baseUrl ?? n(), [u, d] = s([]), [f, p] = s(!0), [m, h] = s(null), g = o(!1), _ = i(async () => {
		p(!0), h(null);
		try {
			let e = {};
			c && (e.Authorization = `Bearer ${c}`);
			let t = await fetch(`${l}/api/pipelines/defs`, {
				headers: e,
				credentials: "include"
			});
			if (!t.ok) throw Error(`HTTP ${t.status}`);
			let n = await t.json();
			g.current || d((n.pipelines ?? []).map((e) => ({
				id: e.id,
				name: e.name,
				status: e.status,
				icon: e.icon
			})));
		} catch (e) {
			g.current || (h(e instanceof Error ? e.message : String(e)), d([]));
		} finally {
			g.current || p(!1);
		}
	}, [c, l]);
	return a(() => (g.current = !1, _(), () => {
		g.current = !0;
	}), [_]), {
		pipelines: u,
		loading: f,
		error: m,
		refresh: _
	};
}
//#endregion
//#region src/hooks/useSourceSloMetrics.ts
var E = 3e4;
function D(e, r = "1h", o = {}) {
	let c = t(), l = o.idToken === void 0 ? c?.idToken ?? null : o.idToken, u = o.baseUrl ?? n(), [d, f] = s(null), [p, m] = s(!0), [h, g] = s(null), _ = i(async () => {
		if (e) {
			m(!0), g(null);
			try {
				let t = { "Content-Type": "application/json" };
				l && (t.Authorization = `Bearer ${l}`);
				let n = await fetch(`${u}/api/ingest/sources/${encodeURIComponent(e)}/metrics?window=${r}`, { headers: t });
				if (!n.ok) throw Error(`HTTP ${n.status}`);
				let i = await n.json();
				f(i);
			} catch (e) {
				g(e instanceof Error ? e.message : String(e));
			} finally {
				m(!1);
			}
		}
	}, [
		e,
		r,
		l,
		u
	]);
	return a(() => {
		_();
		let e = globalThis.setInterval(() => {
			document.hidden || _();
		}, E);
		return () => globalThis.clearInterval(e);
	}, [_]), {
		metrics: d,
		loading: p,
		error: h,
		refresh: _
	};
}
//#endregion
//#region src/hooks/useSyncConflicts.ts
var O = "";
function k() {
	let e = Date.now(), t = (t) => (/* @__PURE__ */ new Date(e - t * 6e4)).toISOString();
	return [{
		conflictId: "cfl-001",
		sourceId: "src-gdrive-team",
		documentId: "doc-policy-acceptable-use",
		documentTitle: "Acceptable Use Policy",
		documentTypeId: "doctype-policy",
		sourceRef: "drive:1A2B3C4D5E6F",
		summary: "Title and body changed remotely while platform edit was pending",
		fields: [{
			field: "title",
			changedBy: "Dana Whitfield",
			path: ["Header"],
			sourceValue: "Acceptable Use Policy (revised May 2026)",
			platformValue: "Acceptable Use Policy — DRAFT",
			mergedValue: "Acceptable Use Policy (revised May 2026) — DRAFT"
		}, {
			field: "body.intro",
			changedBy: "Dana Whitfield",
			path: ["Body", "Introduction"],
			sourceValue: "This policy supersedes the 2025 version and applies to all employees, contractors, and partners.",
			platformValue: "This policy applies to all staff and contractors. Reviewed quarterly."
		}],
		status: "pending",
		platformUpdatedAt: t(8),
		sourceUpdatedAt: t(3),
		detectedAt: t(2)
	}, {
		conflictId: "cfl-003",
		sourceId: "src-s3-reports",
		documentId: "doc-fin-0002",
		documentTitle: "Q2 Financial Overview",
		documentTypeId: "doctype-financial-report",
		sourceRef: "s3://acme-quarterly-reports/2026/Q2/financial-overview.pdf",
		summary: "Source replaced PDF; platform comments pending",
		fields: [{
			field: "attachment.sha256",
			path: ["Attachments"],
			sourceValue: "sha256:c1a2b3...new",
			platformValue: "sha256:9f8e7d...old"
		}],
		status: "pending",
		platformUpdatedAt: t(220),
		sourceUpdatedAt: t(15),
		detectedAt: t(15)
	}];
}
function A() {
	let { idToken: t } = e(), [n, r] = s([]), [c, l] = s(!0), [u, d] = s(null), [f, p] = s(null), [m, h] = s(!1), g = o(!0), _ = o(0), v = i(() => {
		let e = { "Content-Type": "application/json" };
		return t && (e.Authorization = `Bearer ${t}`), e;
	}, [t]), y = i(async () => {
		let e = ++_.current, t = () => g.current && e === _.current;
		l(!0), d(null);
		try {
			let e = await fetch(`${O}/api/sync/conflicts`, { headers: v() });
			if (e.status === 404) {
				t() && (r(k()), h(!0));
				return;
			}
			if (!e.ok) throw Error(`HTTP ${e.status}`);
			let n = await e.json();
			t() && (r(n.conflicts ?? []), h(!1));
		} catch (e) {
			t() && (r(k()), h(!0), d(e instanceof Error ? e.message : String(e)));
		} finally {
			t() && l(!1);
		}
	}, [v]);
	a(() => (g.current = !0, y(), () => {
		g.current = !1, _.current += 1;
	}), [y]);
	let b = i(() => p(null), []);
	return {
		conflicts: n,
		loading: c,
		error: u,
		usingMock: m,
		refresh: y,
		resolveConflict: i(async (e, t) => {
			if (p(null), m) return r((t) => t.map((t) => t.conflictId === e ? {
				...t,
				status: "resolved",
				resolvedAt: (/* @__PURE__ */ new Date()).toISOString()
			} : t)), !0;
			try {
				let n = await fetch(`${O}/api/sync/conflicts/${e}/resolve`, {
					method: "POST",
					headers: v(),
					body: JSON.stringify(t)
				});
				if (!n.ok) throw Error(`HTTP ${n.status}`);
				let i = await n.json();
				return i.conflict && r((t) => t.map((t) => t.conflictId === e ? i.conflict : t)), !0;
			} catch (e) {
				return p(e instanceof Error ? e.message : String(e)), !1;
			}
		}, [v, m]),
		discardConflict: i(async (e) => {
			if (p(null), m) return r((t) => t.map((t) => t.conflictId === e ? {
				...t,
				status: "discarded",
				resolvedAt: (/* @__PURE__ */ new Date()).toISOString()
			} : t)), !0;
			try {
				let t = await fetch(`${O}/api/sync/conflicts/${e}/discard`, {
					method: "POST",
					headers: v()
				});
				if (!t.ok) throw Error(`HTTP ${t.status}`);
				return r((t) => t.map((t) => t.conflictId === e ? {
					...t,
					status: "discarded",
					resolvedAt: (/* @__PURE__ */ new Date()).toISOString()
				} : t)), !0;
			} catch (e) {
				return p(e instanceof Error ? e.message : String(e)), !1;
			}
		}, [v, m]),
		actionError: f,
		clearActionError: b
	};
}
//#endregion
export { x as a, g as c, w as i, p as l, D as n, b as o, T as r, v as s, A as t, u };
