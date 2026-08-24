import { n as e } from "./IdentityContext-CQM1qwH6.js";
import { n as t } from "./WebSocketContext-DUvjGLFq.js";
import { useCallback as n, useEffect as r, useRef as i, useState as a } from "react";
//#region src/hooks/useDocTypeProposals.ts
var o = "", s = 3e4;
function c() {
	let { idToken: t, userEmail: i } = e(), [c, l] = a([]), [u, d] = a(!0), [f, p] = a(null), m = n(() => {
		let e = { "Content-Type": "application/json" };
		return t && (e.Authorization = `Bearer ${t}`), e;
	}, [t]), h = n(async () => {
		d(!0), p(null);
		try {
			let e = await fetch(`${o}/api/ingest/mapping/proposals`, { headers: m() });
			if (!e.ok) throw Error(`HTTP ${e.status}`);
			let t = await e.json();
			l(t.proposals);
		} catch (e) {
			p(e instanceof Error ? e.message : String(e));
		} finally {
			d(!1);
		}
	}, [m]);
	r(() => {
		h();
		let e = window.setInterval(() => {
			document.hidden || h();
		}, s);
		return () => window.clearInterval(e);
	}, [h]);
	let g = n(async (e, t) => {
		let n = await fetch(`${o}/api/ingest/mapping/proposals/${encodeURIComponent(e)}/${t}`, {
			method: "POST",
			headers: m(),
			body: JSON.stringify({ reviewedBy: i ?? "operator" })
		});
		if (!n.ok) throw Error(`HTTP ${n.status}`);
		await h();
	}, [
		m,
		h,
		i
	]);
	return {
		proposals: c,
		loading: u,
		error: f,
		refresh: h,
		promote: (e) => g(e, "promote"),
		reject: (e) => g(e, "reject")
	};
}
//#endregion
//#region src/hooks/useIngestAudit.ts
var l = "", u = 3e4;
function d(t = {}) {
	let { idToken: i } = e(), [o, s] = a([]), [c, d] = a(!0), [f, p] = a(null), m = n(async () => {
		d(!0), p(null);
		try {
			let e = { "Content-Type": "application/json" };
			i && (e.Authorization = `Bearer ${i}`);
			let n = new URLSearchParams();
			t.since && n.set("since", t.since), t.until && n.set("until", t.until), t.actor && n.set("actor", t.actor), t.eventType && n.set("eventType", t.eventType), t.targetId && n.set("targetId", t.targetId), t.limit && n.set("limit", String(t.limit));
			let r = n.toString(), a = `${l}/api/ingest/audit${r ? `?${r}` : ""}`, o = await fetch(a, { headers: e });
			if (!o.ok) throw Error(`HTTP ${o.status}`);
			let c = await o.json();
			s(c.entries);
		} catch (e) {
			p(e instanceof Error ? e.message : String(e));
		} finally {
			d(!1);
		}
	}, [
		i,
		t.since,
		t.until,
		t.actor,
		t.eventType,
		t.targetId,
		t.limit
	]);
	return r(() => {
		m();
		let e = window.setInterval(() => {
			document.hidden || m();
		}, u);
		return () => window.clearInterval(e);
	}, [m]), {
		entries: o,
		loading: c,
		error: f,
		refresh: m
	};
}
//#endregion
//#region src/hooks/useIngestDLQ.ts
var f = "", p = 3e4;
function m() {
	let { idToken: t } = e(), [i, o] = a([]), [s, c] = a(!0), [l, u] = a(null), d = n(() => {
		let e = { "Content-Type": "application/json" };
		return t && (e.Authorization = `Bearer ${t}`), e;
	}, [t]), m = n(async () => {
		c(!0), u(null);
		try {
			let e = await fetch(`${f}/api/ingest/dlq`, { headers: d() });
			if (!e.ok) {
				if (e.status === 503) {
					u("Ingest DLQ is not initialized yet. Start a sync to populate it."), o([]);
					return;
				}
				throw Error(`HTTP ${e.status}`);
			}
			let t = await e.json();
			o(t.items);
		} catch (e) {
			u(e instanceof Error ? e.message : String(e));
		} finally {
			c(!1);
		}
	}, [d]);
	return r(() => {
		m();
		let e = window.setInterval(() => {
			document.hidden || m();
		}, p);
		return () => window.clearInterval(e);
	}, [m]), {
		entries: i,
		loading: s,
		error: l,
		refresh: m,
		replay: n(async (e) => {
			let t = await fetch(`${f}/api/ingest/dlq/${encodeURIComponent(e)}/replay`, {
				method: "POST",
				headers: d()
			});
			if (!t.ok) throw Error(`HTTP ${t.status}`);
			await m();
		}, [d, m]),
		drop: n(async (e) => {
			let t = await fetch(`${f}/api/ingest/dlq/${encodeURIComponent(e)}`, {
				method: "DELETE",
				headers: d()
			});
			if (!t.ok) throw Error(`HTTP ${t.status}`);
			await m();
		}, [d, m])
	};
}
//#endregion
//#region src/hooks/useIngestItems.ts
var h = "";
function g(e) {
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
function _(t = {}) {
	let { sourceId: o, status: s } = t, { idToken: c } = e(), [l, u] = a([]), [d, f] = a(!0), [p, m] = a(null), [_, v] = a(null), y = i(!0), b = i(0), x = n(() => {
		let e = { "Content-Type": "application/json" };
		return c && (e.Authorization = `Bearer ${c}`), e;
	}, [c]), S = n(async () => {
		let e = ++b.current, t = () => y.current && e === b.current;
		f(!0), m(null);
		try {
			let e = new URLSearchParams();
			o && e.set("sourceId", o), s && e.set("status", s);
			let n = e.toString(), r = `${h}/api/ingest/items${n ? `?${n}` : ""}`, i = await fetch(r, { headers: x() });
			if (!i.ok) throw Error(`HTTP ${i.status}`);
			let a = await i.json();
			t() && u((a.items ?? []).map(g));
		} catch (e) {
			t() && m(e instanceof Error ? e.message : String(e));
		} finally {
			t() && f(!1);
		}
	}, [
		x,
		o,
		s
	]);
	r(() => (y.current = !0, S(), () => {
		y.current = !1, b.current += 1;
	}), [S]);
	let C = n(() => v(null), []);
	return {
		items: l,
		loading: d,
		error: p,
		refresh: S,
		retryItem: n(async (e) => {
			try {
				let t = await fetch(`${h}/api/ingest/items/${e}/retry`, {
					method: "POST",
					headers: x()
				});
				if (!t.ok) throw Error(`HTTP ${t.status}`);
				return u((t) => t.map((t) => t.itemId === e ? {
					...t,
					status: "queued",
					error: null
				} : t)), !0;
			} catch (e) {
				return v(e instanceof Error ? e.message : String(e)), !1;
			}
		}, [x]),
		skipItem: n(async (e) => {
			try {
				let t = await fetch(`${h}/api/ingest/items/${e}/skip`, {
					method: "POST",
					headers: x()
				});
				if (!t.ok) throw Error(`HTTP ${t.status}`);
				return u((t) => t.filter((t) => t.itemId !== e)), !0;
			} catch (e) {
				return v(e instanceof Error ? e.message : String(e)), !1;
			}
		}, [x]),
		actionError: _,
		clearActionError: C
	};
}
//#endregion
//#region src/hooks/useIngestProgress.ts
var v = "ingest:progress";
function y() {
	let { sendMessage: e, onMessage: o, connectionState: s } = t(), [c, l] = a([]), [u, d] = a(() => /* @__PURE__ */ new Map()), f = i(e);
	return r(() => {
		f.current = e;
	}, [e]), r(() => o((e) => {
		let t = e.type ?? "", n = e.channel === v, r = t.startsWith("sync.") || t.startsWith("item.");
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
	}), [o]), r(() => {
		if (s === "connected") return f.current({
			service: "ingest",
			action: "subscribe",
			channelId: v
		}), () => {
			f.current({
				service: "ingest",
				action: "unsubscribe",
				channelId: v
			});
		};
	}, [s]), {
		events: c,
		activeSyncs: u,
		clearEvents: n(() => {
			l([]);
		}, [])
	};
}
//#endregion
//#region src/hooks/useIngestSources.ts
var b = "";
function x() {
	let { idToken: t } = e(), [o, s] = a([]), [c, l] = a(!0), [u, d] = a(null), [f, p] = a(null), m = i(!0), h = i(0), g = n(() => {
		let e = { "Content-Type": "application/json" };
		return t && (e.Authorization = `Bearer ${t}`), e;
	}, [t]), _ = n(() => p(null), []), v = n(async () => {
		let e = ++h.current, t = () => m.current && e === h.current;
		l(!0), d(null);
		try {
			let e = await fetch(`${b}/api/ingest/sources`, { headers: g() });
			if (!e.ok) throw Error(`HTTP ${e.status}`);
			let n = await e.json();
			t() && s(n.sources ?? []);
		} catch (e) {
			t() && d(e instanceof Error ? e.message : String(e));
		} finally {
			t() && l(!1);
		}
	}, [g]);
	return r(() => (m.current = !0, v(), () => {
		m.current = !1, h.current += 1;
	}), [v]), {
		sources: o,
		loading: c,
		error: u,
		refresh: v,
		createSource: n(async (e) => {
			try {
				let t = await fetch(`${b}/api/ingest/sources`, {
					method: "POST",
					headers: g(),
					body: JSON.stringify(e)
				});
				if (!t.ok) throw Error(`HTTP ${t.status}`);
				let n = await t.json();
				return s((e) => [...e, n]), n;
			} catch (e) {
				return p(e instanceof Error ? e.message : String(e)), null;
			}
		}, [g]),
		deleteSource: n(async (e) => {
			try {
				let t = await fetch(`${b}/api/ingest/sources/${e}`, {
					method: "DELETE",
					headers: g()
				});
				if (!t.ok) throw Error(`HTTP ${t.status}`);
				return s((t) => t.filter((t) => t.sourceId !== e)), !0;
			} catch (e) {
				return p(e instanceof Error ? e.message : String(e)), !1;
			}
		}, [g]),
		triggerSync: n(async (e) => {
			try {
				let t = await fetch(`${b}/api/ingest/sources/${e}/sync`, {
					method: "POST",
					headers: g()
				});
				if (!t.ok) throw Error(`HTTP ${t.status}`);
				return !0;
			} catch (e) {
				return p(e instanceof Error ? e.message : String(e)), !1;
			}
		}, [g]),
		actionError: f,
		clearActionError: _
	};
}
//#endregion
//#region src/hooks/useMappingReviewQueue.ts
var S = "", C = 15e3;
function w(e) {
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
function T() {
	let { idToken: t } = e(), [i, o] = a([]), [s, c] = a(.7), [l, u] = a(!0), [d, f] = a(null), p = n(() => {
		let e = { "Content-Type": "application/json" };
		return t && (e.Authorization = `Bearer ${t}`), e;
	}, [t]), m = n(async () => {
		u(!0), f(null);
		try {
			let e = await fetch(`${S}/api/ingest/mapping/review`, { headers: p() });
			if (!e.ok) throw Error(`HTTP ${e.status}`);
			let t = await e.json();
			o(t.items.map(w)), c(t.threshold);
		} catch (e) {
			f(e instanceof Error ? e.message : String(e));
		} finally {
			u(!1);
		}
	}, [p]);
	return r(() => {
		m();
		let e = window.setInterval(() => {
			document.hidden || m();
		}, C);
		return () => window.clearInterval(e);
	}, [m]), {
		items: i,
		threshold: s,
		loading: l,
		error: d,
		refresh: m,
		remap: n(async (e, t) => {
			let n = await fetch(`${S}/api/ingest/items/${e}/remap`, {
				method: "POST",
				headers: p(),
				body: JSON.stringify({ typeId: t })
			});
			if (!n.ok) throw Error(`HTTP ${n.status}`);
			await m();
		}, [p, m]),
		skip: n(async (e) => {
			let t = await fetch(`${S}/api/ingest/items/${e}/skip`, {
				method: "POST",
				headers: p()
			});
			if (!t.ok) throw Error(`HTTP ${t.status}`);
			await m();
		}, [p, m])
	};
}
//#endregion
//#region src/hooks/usePipelineDefs.ts
var E = "";
function D() {
	let { idToken: t } = e(), [o, s] = a([]), [c, l] = a(!0), [u, d] = a(null), f = i(!1), p = n(async () => {
		l(!0), d(null);
		try {
			let e = {};
			t && (e.Authorization = `Bearer ${t}`);
			let n = await fetch(`${E}/api/pipelines/defs`, {
				headers: e,
				credentials: "include"
			});
			if (!n.ok) throw Error(`HTTP ${n.status}`);
			let r = await n.json();
			f.current || s((r.pipelines ?? []).map((e) => ({
				id: e.id,
				name: e.name,
				status: e.status,
				icon: e.icon
			})));
		} catch (e) {
			f.current || (d(e instanceof Error ? e.message : String(e)), s([]));
		} finally {
			f.current || l(!1);
		}
	}, [t]);
	return r(() => (f.current = !1, p(), () => {
		f.current = !0;
	}), [p]), {
		pipelines: o,
		loading: c,
		error: u,
		refresh: p
	};
}
//#endregion
//#region src/hooks/useSourceSloMetrics.ts
var O = "", k = 3e4;
function A(t, i = "1h") {
	let { idToken: o } = e(), [s, c] = a(null), [l, u] = a(!0), [d, f] = a(null), p = n(async () => {
		if (t) {
			u(!0), f(null);
			try {
				let e = { "Content-Type": "application/json" };
				o && (e.Authorization = `Bearer ${o}`);
				let n = await fetch(`${O}/api/ingest/sources/${encodeURIComponent(t)}/metrics?window=${i}`, { headers: e });
				if (!n.ok) throw Error(`HTTP ${n.status}`);
				let r = await n.json();
				c(r);
			} catch (e) {
				f(e instanceof Error ? e.message : String(e));
			} finally {
				u(!1);
			}
		}
	}, [
		t,
		i,
		o
	]);
	return r(() => {
		p();
		let e = globalThis.setInterval(() => {
			document.hidden || p();
		}, k);
		return () => globalThis.clearInterval(e);
	}, [p]), {
		metrics: s,
		loading: l,
		error: d,
		refresh: p
	};
}
//#endregion
//#region src/hooks/useSyncConflicts.ts
var j = "";
function M() {
	let e = Date.now(), t = (t) => (/* @__PURE__ */ new Date(e - t * 6e4)).toISOString();
	return [{
		conflictId: "cfl-001",
		sourceId: "src-gdrive-team",
		documentId: "doc-policy-acceptable-use",
		documentTypeId: "doctype-policy",
		sourceRef: "drive:1A2B3C4D5E6F",
		summary: "Title and body changed remotely while platform edit was pending",
		fields: [{
			field: "title",
			sourceValue: "Acceptable Use Policy (revised May 2026)",
			platformValue: "Acceptable Use Policy — DRAFT",
			mergedValue: "Acceptable Use Policy (revised May 2026) — DRAFT"
		}, {
			field: "body.intro",
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
		documentTypeId: "doctype-financial-report",
		sourceRef: "s3://acme-quarterly-reports/2026/Q2/financial-overview.pdf",
		summary: "Source replaced PDF; platform comments pending",
		fields: [{
			field: "attachment.sha256",
			sourceValue: "sha256:c1a2b3...new",
			platformValue: "sha256:9f8e7d...old"
		}],
		status: "pending",
		platformUpdatedAt: t(220),
		sourceUpdatedAt: t(15),
		detectedAt: t(15)
	}];
}
function N() {
	let { idToken: t } = e(), [o, s] = a([]), [c, l] = a(!0), [u, d] = a(null), [f, p] = a(null), [m, h] = a(!1), g = i(!0), _ = i(0), v = n(() => {
		let e = { "Content-Type": "application/json" };
		return t && (e.Authorization = `Bearer ${t}`), e;
	}, [t]), y = n(async () => {
		let e = ++_.current, t = () => g.current && e === _.current;
		l(!0), d(null);
		try {
			let e = await fetch(`${j}/api/sync/conflicts`, { headers: v() });
			if (e.status === 404) {
				t() && (s(M()), h(!0));
				return;
			}
			if (!e.ok) throw Error(`HTTP ${e.status}`);
			let n = await e.json();
			t() && (s(n.conflicts ?? []), h(!1));
		} catch (e) {
			t() && (s(M()), h(!0), d(e instanceof Error ? e.message : String(e)));
		} finally {
			t() && l(!1);
		}
	}, [v]);
	r(() => (g.current = !0, y(), () => {
		g.current = !1, _.current += 1;
	}), [y]);
	let b = n(() => p(null), []);
	return {
		conflicts: o,
		loading: c,
		error: u,
		usingMock: m,
		refresh: y,
		resolveConflict: n(async (e, t) => {
			if (p(null), m) return s((t) => t.map((t) => t.conflictId === e ? {
				...t,
				status: "resolved",
				resolvedAt: (/* @__PURE__ */ new Date()).toISOString()
			} : t)), !0;
			try {
				let n = await fetch(`${j}/api/sync/conflicts/${e}/resolve`, {
					method: "POST",
					headers: v(),
					body: JSON.stringify(t)
				});
				if (!n.ok) throw Error(`HTTP ${n.status}`);
				let r = await n.json();
				return r.conflict && s((t) => t.map((t) => t.conflictId === e ? r.conflict : t)), !0;
			} catch (e) {
				return p(e instanceof Error ? e.message : String(e)), !1;
			}
		}, [v, m]),
		discardConflict: n(async (e) => {
			if (p(null), m) return s((t) => t.map((t) => t.conflictId === e ? {
				...t,
				status: "discarded",
				resolvedAt: (/* @__PURE__ */ new Date()).toISOString()
			} : t)), !0;
			try {
				let t = await fetch(`${j}/api/sync/conflicts/${e}/discard`, {
					method: "POST",
					headers: v()
				});
				if (!t.ok) throw Error(`HTTP ${t.status}`);
				return s((t) => t.map((t) => t.conflictId === e ? {
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
export { x as a, m as c, T as i, d as l, A as n, y as o, D as r, _ as s, N as t, c as u };
