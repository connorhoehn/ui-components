import { n as e } from "./IdentityContext-CQM1qwH6.js";
import { a as t, c as n, i as r, l as i, n as a, o, r as s, s as c, t as l, u } from "./useSyncConflicts-y7kUJko3.js";
import { n as d } from "./useDocumentTypes-C-AMWgYq.js";
import { t as f } from "./cn-DhjIN-s0.js";
import { t as p } from "./Chip-2lIuHwy5.js";
import { t as m } from "./overlayStack-BFH9XXvN.js";
import { t as h } from "./EmptyState-CUHf5NYN.js";
import { n as g, r as _, t as v } from "./focusTrap-CmWJlptm.js";
import { t as y } from "./SkeletonCard-CGe8XFPB.js";
import { t as b } from "./Input-DcK2h-jK.js";
import { t as x } from "./activationKey-CjbL3LUv.js";
import { t as S } from "./Select-Z0TLUVeL.js";
import { useCallback as C, useEffect as w, useId as T, useMemo as E, useRef as D, useState as O } from "react";
import { Fragment as k, jsx as A, jsxs as j } from "react/jsx-runtime";
import { useNavigate as M, useParams as N } from "react-router";
import { Line as P, LineChart as F, ResponsiveContainer as I, Tooltip as L, YAxis as R } from "recharts";
//#region src/components/ingest/IngestDashboard.tsx
function z(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : `${Math.floor(t / 864e5)}d ago`;
}
function B(e) {
	return Date.now() - new Date(e).getTime() < 864e5;
}
function V(e) {
	return Date.now() - new Date(e).getTime() < 36e5;
}
var ee = 50;
function H() {
	let e = M(), { sources: n, loading: r, error: i, refresh: a } = t(), { items: o, loading: s, error: l, refresh: u } = c(), d = r || s, m = i || l, g = E(() => {
		let e = n.filter((e) => e.status === "active").length, t = n.filter((e) => e.status === "paused").length, r = n.filter((e) => e.status === "error").length, i = o.filter((e) => e.status !== "done" && e.status !== "failed").length, a = o.filter((e) => e.status === "done" && B(e.updatedAt)).length, s = o.filter((e) => e.status === "failed").length;
		return {
			total: n.length,
			active: e,
			paused: t,
			errored: r,
			queued: i,
			recentDone: a,
			failed: s
		};
	}, [n, o]), _ = E(() => o.filter((e) => e.status === "done").sort((e, t) => t.updatedAt.localeCompare(e.updatedAt)).slice(0, 5), [o]), v = E(() => {
		let e = [];
		for (let t of n) t.status === "error" && e.push({
			id: `source-error-${t.sourceId}`,
			level: "critical",
			message: `Source "${t.name}" is in error state — check its config or last sync log.`
		});
		let t = o.filter((e) => V(e.updatedAt));
		if (t.length >= 5) {
			let n = t.filter((e) => e.status === "failed").length, r = n / t.length;
			r > .1 && e.push({
				id: "failure-rate-1h",
				level: "warning",
				message: `Last-hour failure rate is ${(r * 100).toFixed(0)}% (${n} of ${t.length} items failed).`
			});
		}
		return g.queued > ee && e.push({
			id: "queue-depth",
			level: "warning",
			message: `Queue depth is ${g.queued} items — sources may be ingesting faster than the engine can drain.`
		}), e;
	}, [
		n,
		o,
		g.queued
	]);
	return d && n.length === 0 && o.length === 0 ? /* @__PURE__ */ j("div", {
		"data-testid": "ingest-dashboard",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ A("div", {
				className: "flex items-center justify-between mb-4",
				children: /* @__PURE__ */ A("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Ingest"
				})
			}),
			/* @__PURE__ */ j("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 mb-5",
				children: [
					/* @__PURE__ */ A(y, { height: 90 }),
					/* @__PURE__ */ A(y, { height: 90 }),
					/* @__PURE__ */ A(y, { height: 90 }),
					/* @__PURE__ */ A(y, { height: 90 })
				]
			}),
			/* @__PURE__ */ A(y, { height: 200 })
		]
	}) : /* @__PURE__ */ j("div", {
		"data-testid": "ingest-dashboard",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ j("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ A("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Ingest"
				}), /* @__PURE__ */ j("div", {
					className: "flex gap-2.5 items-center",
					children: [null, /* @__PURE__ */ A("button", {
						className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
						onClick: () => e("/ingest/sources"),
						"data-testid": "add-source-btn",
						children: "Add Source"
					})]
				})]
			}),
			m && /* @__PURE__ */ j("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4",
				role: "alert",
				children: [/* @__PURE__ */ A("span", {
					className: "text-[13px] font-medium",
					children: "Failed to load ingest data."
				}), /* @__PURE__ */ A("button", {
					onClick: () => {
						a(), u();
					},
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
					children: "Retry"
				})]
			}),
			v.length > 0 && /* @__PURE__ */ A("div", {
				"data-testid": "alerts-strip",
				className: "flex flex-col gap-1.5 mb-3",
				children: v.map((e) => /* @__PURE__ */ j("div", {
					"data-testid": `alert-${e.id}`,
					className: f("px-3 py-2 rounded-md text-[13px] border", e.level === "critical" ? "bg-danger-bg border-[var(--color-state-failed)] text-[var(--color-state-failed)]" : "bg-warning-bg border-warning text-warning-fg"),
					children: [
						/* @__PURE__ */ A("strong", { children: e.level === "critical" ? "⛔" : "⚠" }),
						" ",
						e.message
					]
				}, e.id))
			}),
			/* @__PURE__ */ j("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 mb-5",
				children: [
					/* @__PURE__ */ j("div", {
						className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5",
						children: [
							/* @__PURE__ */ A("span", {
								className: "text-xs font-medium text-text-tertiary uppercase tracking-wide",
								children: "Sources"
							}),
							/* @__PURE__ */ A("span", {
								className: "text-[28px] font-bold text-text-primary leading-none",
								children: g.total
							}),
							/* @__PURE__ */ j("span", {
								className: "text-xs text-text-tertiary",
								children: [
									g.active,
									" active, ",
									g.paused,
									" paused",
									g.errored > 0 ? `, ${g.errored} error` : ""
								]
							})
						]
					}),
					/* @__PURE__ */ j("div", {
						className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5",
						children: [
							/* @__PURE__ */ A("span", {
								className: "text-xs font-medium text-text-tertiary uppercase tracking-wide",
								children: "In Queue"
							}),
							/* @__PURE__ */ A("span", {
								className: f("text-[28px] font-bold leading-none", g.queued > 0 ? "text-[var(--color-state-awaiting)]" : "text-text-primary"),
								children: g.queued
							}),
							/* @__PURE__ */ A("span", {
								className: "text-xs text-text-tertiary",
								children: "items processing"
							})
						]
					}),
					/* @__PURE__ */ j("div", {
						className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5",
						children: [
							/* @__PURE__ */ A("span", {
								className: "text-xs font-medium text-text-tertiary uppercase tracking-wide",
								children: "Completed (24h)"
							}),
							/* @__PURE__ */ A("span", {
								className: f("text-[28px] font-bold leading-none", g.recentDone > 0 ? "text-[var(--color-state-completed)]" : "text-text-primary"),
								children: g.recentDone
							}),
							/* @__PURE__ */ A("span", {
								className: "text-xs text-text-tertiary",
								children: "items ingested"
							})
						]
					}),
					/* @__PURE__ */ j("div", {
						className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5",
						children: [
							/* @__PURE__ */ A("span", {
								className: "text-xs font-medium text-text-tertiary uppercase tracking-wide",
								children: "Errors"
							}),
							/* @__PURE__ */ A("span", {
								className: f("text-[28px] font-bold leading-none", g.failed > 0 ? "text-[var(--color-state-failed)]" : "text-text-primary"),
								children: g.failed
							}),
							/* @__PURE__ */ A("span", {
								className: "text-xs text-text-tertiary",
								children: "items failed"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ j("div", {
				className: "bg-surface border border-border rounded-[10px] p-4 mb-4",
				children: [/* @__PURE__ */ A("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Recent Activity"
				}), _.length === 0 ? /* @__PURE__ */ A(h, {
					icon: "📥",
					title: "No recent activity",
					body: "Completed ingest items will appear here."
				}) : /* @__PURE__ */ A("div", { children: _.map((e) => /* @__PURE__ */ j("div", {
					className: "flex items-center justify-between gap-3 py-2 border-b border-border",
					children: [
						/* @__PURE__ */ A("span", {
							className: "text-[13px] text-text-secondary font-mono overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0",
							title: e.sourcePath,
							children: e.sourcePath
						}),
						/* @__PURE__ */ A(p, {
							tone: "success",
							size: "xs",
							children: "done"
						}),
						/* @__PURE__ */ A("span", {
							className: "text-[11px] text-text-tertiary whitespace-nowrap shrink-0",
							children: z(e.updatedAt)
						})
					]
				}, e.itemId)) })]
			})
		]
	});
}
//#endregion
//#region src/components/ingest/SourcesPage.tsx
function U(e) {
	switch (e) {
		case "active": return "success";
		case "paused": return "warning";
		case "error": return "danger";
		default: return "neutral";
	}
}
function W(e) {
	switch (e) {
		case "local": return "Local";
		case "s3": return "S3";
		case "google-drive": return "Google Drive";
		case "webhook": return "Webhook";
		default: return e;
	}
}
function te(e) {
	switch (e) {
		case "s3": return "info";
		case "google-drive": return "purple";
		case "webhook": return "caution";
		case "local": return "neutral";
		default: return "neutral";
	}
}
function G(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function K() {
	let e = M(), { sources: n, loading: r, error: i, refresh: a, deleteSource: o, triggerSync: s, actionError: c, clearActionError: l } = t(), [u, d] = O(() => /* @__PURE__ */ new Set()), m = C(async (e) => {
		d((t) => new Set(t).add(e));
		let t = await s(e);
		d((t) => {
			let n = new Set(t);
			return n.delete(e), n;
		}), t && a();
	}, [s, a]), g = C(async (e) => {
		confirm(`Delete source "${e.name}"? This cannot be undone.`) && await o(e.sourceId);
	}, [o]);
	return r && n.length === 0 ? /* @__PURE__ */ j("div", {
		"data-testid": "sources-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ A("div", {
				className: "flex items-center justify-between mb-4",
				children: /* @__PURE__ */ A("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Sources"
				})
			}),
			/* @__PURE__ */ A(y, { height: 48 }),
			/* @__PURE__ */ A(y, { height: 48 }),
			/* @__PURE__ */ A(y, { height: 48 })
		]
	}) : /* @__PURE__ */ j("div", {
		"data-testid": "sources-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ j("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ j("div", { children: [/* @__PURE__ */ A("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Sources"
				}), /* @__PURE__ */ j("span", {
					className: "text-[13px] text-text-tertiary",
					children: [
						n.length,
						" source",
						n.length === 1 ? "" : "s"
					]
				})] }), /* @__PURE__ */ A("button", {
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
					onClick: () => e("/ingest/sources"),
					"data-testid": "add-source-btn",
					children: "Add Source"
				})]
			}),
			i && /* @__PURE__ */ j("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4",
				role: "alert",
				children: [/* @__PURE__ */ A("span", {
					className: "text-[13px] font-medium",
					children: "Failed to load sources."
				}), /* @__PURE__ */ A("button", {
					onClick: () => void a(),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
					children: "Retry"
				})]
			}),
			c && /* @__PURE__ */ j("div", {
				"data-testid": "sources-action-error",
				role: "alert",
				className: "px-4 py-3 bg-danger-bg border border-danger-border text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-4",
				children: [/* @__PURE__ */ j("span", {
					className: "text-[13px] font-medium",
					children: ["That action did not go through: ", c]
				}), /* @__PURE__ */ A("button", {
					onClick: l,
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-danger-fg border border-danger-border rounded-md cursor-pointer font-[inherit]",
					children: "Dismiss"
				})]
			}),
			!i && n.length === 0 ? /* @__PURE__ */ A(h, {
				icon: "📂",
				title: "No sources configured",
				body: "Add a data source to start ingesting files into the system.",
				actionLabel: "Add Source",
				onAction: () => e("/ingest/sources")
			}) : /* @__PURE__ */ A("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ j("table", {
					className: "w-full border-collapse text-[13px]",
					children: [/* @__PURE__ */ A("thead", { children: /* @__PURE__ */ j("tr", {
						className: "border-b border-border",
						children: [
							/* @__PURE__ */ A("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Name"
							}),
							/* @__PURE__ */ A("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Type"
							}),
							/* @__PURE__ */ A("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Status"
							}),
							/* @__PURE__ */ A("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Last Sync"
							}),
							/* @__PURE__ */ A("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Files Synced"
							}),
							/* @__PURE__ */ A("th", {
								className: "p-2 text-right text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ A("tbody", { children: n.map((t) => /* @__PURE__ */ j("tr", {
						className: "border-b border-border hover:bg-surface-hover",
						children: [
							/* @__PURE__ */ A("td", {
								className: "p-2 font-medium text-text-primary",
								children: /* @__PURE__ */ A("button", {
									type: "button",
									"data-testid": `source-name-link-${t.sourceId}`,
									onClick: () => e(`/ingest/sources/${t.sourceId}`),
									className: "bg-transparent border-none p-0 font-[inherit] text-primary cursor-pointer underline text-left",
									children: t.name
								})
							}),
							/* @__PURE__ */ A("td", {
								className: "p-2",
								children: /* @__PURE__ */ A(p, {
									tone: te(t.type),
									size: "xs",
									children: W(t.type)
								})
							}),
							/* @__PURE__ */ A("td", {
								className: "p-2",
								children: /* @__PURE__ */ A(p, {
									tone: U(t.status),
									size: "sm",
									children: t.status
								})
							}),
							/* @__PURE__ */ A("td", {
								className: "p-2 text-text-secondary",
								children: t.lastSyncAt ? G(t.lastSyncAt) : "Never"
							}),
							/* @__PURE__ */ A("td", {
								"data-testid": `source-files-synced-${t.sourceId}`,
								className: "p-2 font-mono text-xs text-text-secondary",
								children: t.lastSyncStats ? /* @__PURE__ */ j("span", { children: [t.lastSyncStats.filesFound, t.lastSyncStats.filesNew > 0 ? /* @__PURE__ */ j("span", {
									className: "text-text-tertiary",
									children: [
										" · ",
										t.lastSyncStats.filesNew,
										" new"
									]
								}) : null] }) : "—"
							}),
							/* @__PURE__ */ A("td", {
								className: "p-2 text-right",
								children: /* @__PURE__ */ j("div", {
									className: "flex gap-1.5 justify-end",
									children: [/* @__PURE__ */ A("button", {
										className: f("px-2.5 py-1 text-[11px] font-medium rounded-[5px] cursor-pointer font-[inherit]", u.has(t.sourceId) || t.status === "paused" ? "border border-border bg-surface-inset text-text-tertiary opacity-70 cursor-not-allowed" : "border border-border bg-surface text-text-secondary"),
										disabled: u.has(t.sourceId) || t.status === "paused",
										onClick: () => void m(t.sourceId),
										"data-testid": `sync-${t.sourceId}`,
										children: u.has(t.sourceId) ? "Syncing..." : "Sync Now"
									}), /* @__PURE__ */ A("button", {
										className: "px-2.5 py-1 text-[11px] font-medium border border-[var(--color-state-failed)] rounded-[5px] bg-danger-bg cursor-pointer font-[inherit] text-[var(--color-state-failed)]",
										onClick: () => void g(t),
										"data-testid": `delete-${t.sourceId}`,
										children: "Delete"
									})]
								})
							})
						]
					}, t.sourceId)) })]
				})
			})
		]
	});
}
//#endregion
//#region src/components/ingest/MappingRuleEditor.tsx
var ne = "", re = [
	"extension",
	"path",
	"mimeType",
	"tag",
	"name"
], ie = [
	"eq",
	"contains",
	"regex",
	"startsWith"
];
function q({ rules: t, onChange: n, readOnly: r = !1 }) {
	let { idToken: i } = e(), [a, o] = O(null), [s, c] = O(""), [l, u] = O(null), [d, p] = O(!1), [m, h] = O(null), g = C((e) => {
		o(e), h({ ...t[e] });
	}, [t]), _ = C(() => {
		o(null), h(null);
	}, []), v = C(() => {
		if (a === null || !m) return;
		let e = [...t];
		e[a] = m, n(e), o(null), h(null);
	}, [
		a,
		m,
		t,
		n
	]), y = C(() => {
		let e = {
			pattern: "",
			documentTypeId: "",
			priority: t.length > 0 ? Math.max(...t.map((e) => e.priority)) + 1 : 1
		}, r = [...t, e];
		n(r), o(r.length - 1), h(e);
	}, [t, n]), x = C((e) => {
		n(t.filter((t, n) => n !== e)), a === e ? (o(null), h(null)) : a !== null && a > e && o(a - 1);
	}, [
		t,
		n,
		a
	]), w = C((e) => {
		h((t) => t && {
			...t,
			priority: e
		});
	}, []), T = C((e) => {
		if (e === 0) return;
		let r = [...t];
		[r[e - 1], r[e]] = [r[e], r[e - 1]];
		let i = r[e - 1].priority;
		r[e - 1] = {
			...r[e - 1],
			priority: r[e].priority
		}, r[e] = {
			...r[e],
			priority: i
		}, n(r), a === e ? (o(e - 1), w(r[e - 1].priority)) : a === e - 1 && (o(e), w(r[e].priority));
	}, [
		t,
		n,
		a,
		w
	]), E = C((e) => {
		if (e >= t.length - 1) return;
		let r = [...t];
		[r[e], r[e + 1]] = [r[e + 1], r[e]];
		let i = r[e].priority;
		r[e] = {
			...r[e],
			priority: r[e + 1].priority
		}, r[e + 1] = {
			...r[e + 1],
			priority: i
		}, n(r), a === e ? (o(e + 1), w(r[e + 1].priority)) : a === e + 1 && (o(e), w(r[e].priority));
	}, [
		t,
		n,
		a,
		w
	]), D = C(async () => {
		if (s.trim()) {
			p(!0), u(null);
			try {
				let e = { "Content-Type": "application/json" };
				i && (e.Authorization = `Bearer ${i}`);
				let n = await fetch(`${ne}/api/ingest/mapping/preview`, {
					method: "POST",
					headers: e,
					body: JSON.stringify({
						path: s,
						rules: t
					})
				});
				if (!n.ok) throw Error(`HTTP ${n.status}`);
				let r = await n.json();
				u(JSON.stringify(r, null, 2));
			} catch (e) {
				u(`Error: ${e instanceof Error ? e.message : String(e)}`);
			} finally {
				p(!1);
			}
		}
	}, [
		s,
		t,
		i
	]), k = (e) => {
		let t = e.split(":");
		return t.length >= 3 ? {
			field: t[0],
			op: t[1],
			value: t.slice(2).join(":")
		} : {
			field: "path",
			op: "contains",
			value: e
		};
	}, M = (e, t, n) => `${e}:${t}:${n}`;
	return /* @__PURE__ */ j("div", {
		className: "flex flex-col gap-2.5",
		"data-testid": "mapping-rule-editor",
		children: [
			t.length === 0 ? /* @__PURE__ */ A("div", {
				className: "p-4 text-center text-text-tertiary text-[13px]",
				children: r ? "No mapping rules configured." : "No mapping rules configured. Add one to get started."
			}) : /* @__PURE__ */ A("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ j("table", {
					className: "w-full border-collapse text-xs",
					children: [/* @__PURE__ */ A("thead", { children: /* @__PURE__ */ j("tr", { children: [
						/* @__PURE__ */ A("th", {
							className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Priority"
						}),
						/* @__PURE__ */ A("th", {
							className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Condition"
						}),
						/* @__PURE__ */ A("th", {
							className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Target Type ID"
						}),
						/* @__PURE__ */ A("th", {
							className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Pipeline"
						}),
						/* @__PURE__ */ A("th", {
							className: "px-2.5 py-2 font-semibold text-right border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Actions"
						})
					] }) }), /* @__PURE__ */ A("tbody", { children: t.map((e, n) => {
						let i = !r && a === n && m !== null, o = k(e.pattern);
						if (i) {
							let e = k(m.pattern);
							return /* @__PURE__ */ j("tr", {
								className: "border-b border-border",
								children: [
									/* @__PURE__ */ A("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
										children: /* @__PURE__ */ A(b, {
											"aria-label": "Priority",
											size: "sm",
											className: "w-[50px]",
											type: "number",
											value: m.priority,
											onChange: (e) => h({
												...m,
												priority: Number(e.target.value)
											})
										})
									}),
									/* @__PURE__ */ A("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
										children: /* @__PURE__ */ j("div", {
											className: "flex gap-1 items-center flex-wrap",
											children: [
												/* @__PURE__ */ A(S, {
													"aria-label": "Match field",
													size: "sm",
													className: "w-auto min-w-[90px]",
													value: e.field,
													onChange: (t) => h({
														...m,
														pattern: M(t.target.value, e.op, e.value)
													}),
													options: re.map((e) => ({
														value: e,
														label: e
													}))
												}),
												/* @__PURE__ */ A(S, {
													"aria-label": "Match operator",
													size: "sm",
													className: "w-auto min-w-[90px]",
													value: e.op,
													onChange: (t) => h({
														...m,
														pattern: M(e.field, t.target.value, e.value)
													}),
													options: ie.map((e) => ({
														value: e,
														label: e
													}))
												}),
												/* @__PURE__ */ A(b, {
													"aria-label": "Match value",
													size: "sm",
													className: "min-w-[100px]",
													value: e.value,
													placeholder: "value",
													onChange: (t) => h({
														...m,
														pattern: M(e.field, e.op, t.target.value)
													})
												})
											]
										})
									}),
									/* @__PURE__ */ A("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
										children: /* @__PURE__ */ A(b, {
											"aria-label": "Target Type ID",
											size: "sm",
											className: "min-w-[80px]",
											value: m.documentTypeId,
											placeholder: "document type id",
											onChange: (e) => h({
												...m,
												documentTypeId: e.target.value
											})
										})
									}),
									/* @__PURE__ */ A("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
										children: /* @__PURE__ */ A(b, {
											"aria-label": "Pipeline",
											size: "sm",
											className: "min-w-[80px]",
											value: m.pipelineId ?? "",
											placeholder: "(optional)",
											onChange: (e) => h({
												...m,
												pipelineId: e.target.value || void 0
											})
										})
									}),
									/* @__PURE__ */ A("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle text-right",
										children: /* @__PURE__ */ j("div", {
											className: "flex gap-1 justify-end",
											children: [/* @__PURE__ */ A("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: v,
												children: "Save"
											}), /* @__PURE__ */ A("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: _,
												children: "Cancel"
											})]
										})
									})
								]
							}, n);
						}
						return /* @__PURE__ */ j("tr", {
							className: "border-b border-border",
							children: [
								/* @__PURE__ */ A("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle font-mono font-semibold",
									children: e.priority
								}),
								/* @__PURE__ */ A("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
									children: /* @__PURE__ */ j("span", {
										className: "font-mono text-[11px]",
										children: [
											o.field,
											" ",
											o.op,
											" \"",
											o.value,
											"\""
										]
									})
								}),
								/* @__PURE__ */ A("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle font-mono",
									children: e.documentTypeId || "—"
								}),
								/* @__PURE__ */ A("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-tertiary text-xs align-middle font-mono",
									children: e.pipelineId ?? "—"
								}),
								/* @__PURE__ */ A("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle text-right",
									children: r ? /* @__PURE__ */ A("span", {
										className: "text-[11px] text-text-tertiary",
										children: "—"
									}) : /* @__PURE__ */ j("div", {
										className: "flex gap-1 justify-end",
										children: [
											/* @__PURE__ */ A("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: () => T(n),
												disabled: n === 0,
												title: "Move up",
												children: "↑"
											}),
											/* @__PURE__ */ A("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: () => E(n),
												disabled: n === t.length - 1,
												title: "Move down",
												children: "↓"
											}),
											/* @__PURE__ */ A("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: () => g(n),
												children: "Edit"
											}),
											/* @__PURE__ */ A("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-[var(--color-state-failed)] rounded bg-danger-bg cursor-pointer font-[inherit] text-[var(--color-state-failed)]",
												onClick: () => x(n),
												children: "Delete"
											})
										]
									})
								})
							]
						}, n);
					}) })]
				})
			}),
			!r && /* @__PURE__ */ A("div", {
				className: "flex gap-2.5 items-center",
				children: /* @__PURE__ */ A("button", {
					className: "px-3.5 py-1.5 text-xs font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary self-start",
					onClick: y,
					"data-testid": "add-rule-btn",
					children: "+ Add Rule"
				})
			}),
			/* @__PURE__ */ j("div", {
				className: "flex gap-2 items-center mt-1",
				children: [/* @__PURE__ */ A(b, {
					"aria-label": "Enter a file path to preview mapping",
					className: "flex-1",
					value: s,
					onChange: (e) => c(e.target.value),
					placeholder: "Enter a file path to preview mapping..."
				}), /* @__PURE__ */ A("button", {
					className: f("px-3.5 py-1.5 text-xs font-medium border border-primary rounded-md bg-info-bg cursor-pointer font-[inherit] text-primary self-start", (d || !s.trim()) && "opacity-50 cursor-not-allowed"),
					onClick: () => void D(),
					disabled: d || !s.trim(),
					children: d ? "Checking..." : "Preview"
				})]
			}),
			l && /* @__PURE__ */ A("div", {
				className: "p-3 bg-surface-inset border border-border rounded-md text-xs text-text-secondary font-mono whitespace-pre-wrap break-words",
				children: l
			})
		]
	});
}
//#endregion
//#region src/components/ingest/SourceSloPanel.tsx
var J = [
	"15m",
	"1h",
	"6h",
	"24h"
];
function Y({ points: e, color: t, testId: n }) {
	let r = e.map((e) => ({
		at: e.at,
		value: e.value ?? null
	}));
	return /* @__PURE__ */ A("div", {
		"data-testid": n,
		className: "h-[60px]",
		children: /* @__PURE__ */ A(I, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ j(F, {
				data: r,
				margin: {
					top: 4,
					right: 4,
					left: 4,
					bottom: 4
				},
				children: [
					/* @__PURE__ */ A(R, { hide: !0 }),
					/* @__PURE__ */ A(L, {
						cursor: !1,
						contentStyle: {
							fontSize: 11,
							padding: "4px 6px"
						},
						formatter: ((e) => [e, ""])
					}),
					/* @__PURE__ */ A(P, {
						type: "monotone",
						dataKey: "value",
						stroke: t,
						strokeWidth: 2,
						dot: !1,
						connectNulls: !1,
						isAnimationActive: !1
					})
				]
			})
		})
	});
}
function X(e) {
	for (let t = e.length - 1; t >= 0; t--) if (e[t].value !== null) return e[t].value;
	return null;
}
function ae({ sourceId: e }) {
	let [t, n] = O("1h"), { metrics: r, error: i } = a(e, t);
	return /* @__PURE__ */ j("div", {
		"data-testid": "source-slo-panel",
		className: "px-4 py-3 bg-surface border border-border rounded-[10px] mb-4",
		children: [
			/* @__PURE__ */ j("div", {
				className: "flex items-center justify-between mb-2 gap-2",
				children: [/* @__PURE__ */ j("span", {
					className: "text-sm font-bold text-text-primary",
					children: [
						"Health (last ",
						t,
						")"
					]
				}), /* @__PURE__ */ A(S, {
					"data-testid": "slo-window-picker",
					"aria-label": "Window",
					className: "w-auto min-w-[100px]",
					value: t,
					onChange: (e) => n(e.target.value),
					options: J.map((e) => ({
						value: e,
						label: `Last ${e}`
					}))
				})]
			}),
			i ? /* @__PURE__ */ j("div", {
				role: "alert",
				"data-testid": "slo-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg text-xs",
				children: ["Couldn't load source metrics: ", i]
			}) : null,
			r ? /* @__PURE__ */ j("div", {
				className: "grid grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ j("div", {
						className: "px-2.5 py-2 bg-surface-inset rounded-lg",
						children: [
							/* @__PURE__ */ A("div", {
								className: "text-[11px] text-text-tertiary mb-1",
								children: "p95 latency"
							}),
							/* @__PURE__ */ A("div", {
								"data-testid": "slo-latency-value",
								className: "text-base font-bold text-text-primary",
								children: (() => {
									let e = X(r.latencyP95);
									return e === null ? "—" : `${Math.round(e)} ms`;
								})()
							}),
							/* @__PURE__ */ A(Y, {
								points: r.latencyP95,
								color: "var(--color-state-completed)",
								testId: "slo-latency-chart"
							})
						]
					}),
					/* @__PURE__ */ j("div", {
						className: "px-2.5 py-2 bg-surface-inset rounded-lg",
						children: [
							/* @__PURE__ */ A("div", {
								className: "text-[11px] text-text-tertiary mb-1",
								children: "error rate"
							}),
							/* @__PURE__ */ A("div", {
								"data-testid": "slo-error-rate-value",
								className: "text-base font-bold text-text-primary",
								children: (() => {
									let e = X(r.errorRate);
									return e === null ? "—" : `${e.toFixed(1)}%`;
								})()
							}),
							/* @__PURE__ */ A(Y, {
								points: r.errorRate,
								color: "var(--color-state-failed)",
								testId: "slo-error-rate-chart"
							})
						]
					}),
					/* @__PURE__ */ j("div", {
						className: "px-2.5 py-2 bg-surface-inset rounded-lg",
						children: [
							/* @__PURE__ */ A("div", {
								className: "text-[11px] text-text-tertiary mb-1",
								children: "queue depth"
							}),
							/* @__PURE__ */ A("div", {
								"data-testid": "slo-queue-depth-value",
								className: "text-base font-bold text-text-primary",
								children: (() => {
									let e = X(r.queueDepth);
									return e === null ? "—" : e;
								})()
							}),
							/* @__PURE__ */ A(Y, {
								points: r.queueDepth,
								color: "var(--color-state-awaiting)",
								testId: "slo-queue-depth-chart"
							})
						]
					})
				]
			}) : null
		]
	});
}
//#endregion
//#region src/components/ingest/SourceDetailPage.tsx
var oe = [
	{
		label: "Manual only",
		cron: ""
	},
	{
		label: "Every 15 min",
		cron: "*/15 * * * *"
	},
	{
		label: "Hourly",
		cron: "0 * * * *"
	},
	{
		label: "Every 6 hours",
		cron: "0 */6 * * *"
	},
	{
		label: "Daily 2am",
		cron: "0 2 * * *"
	},
	{
		label: "Weekly Mon 6am",
		cron: "0 6 * * 1"
	}
], Z = "";
function se(e) {
	switch (e) {
		case "active": return "success";
		case "paused": return "warning";
		case "error": return "danger";
		default: return "neutral";
	}
}
function ce(e) {
	switch (e) {
		case "local": return "Local";
		case "s3": return "S3";
		case "google-drive": return "Google Drive";
		case "webhook": return "Webhook";
		default: return e;
	}
}
function le(e) {
	switch (e) {
		case "s3": return "info";
		case "google-drive": return "purple";
		case "webhook": return "caution";
		case "local": return "neutral";
		default: return "neutral";
	}
}
function ue(e) {
	return e < 1e3 ? `${e}ms` : e < 6e4 ? `${(e / 1e3).toFixed(1)}s` : `${(e / 6e4).toFixed(1)}m`;
}
function de(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function fe(e) {
	return Array.isArray(e) ? e.map((e) => {
		if (typeof e.pattern == "string") return e;
		let t = e.condition;
		return {
			pattern: t ? `${t.field ?? "path"}:${t.op ?? "contains"}:${t.value ?? ""}` : "",
			documentTypeId: e.targetTypeId ?? e.documentTypeId ?? "",
			pipelineId: e.pipelineId,
			priority: e.priority ?? 0
		};
	}) : [];
}
function pe() {
	let { id: t } = N(), n = M(), { idToken: r } = e(), { pipelines: i } = s(), { types: a } = d({ idToken: r }), [o, c] = O(null), [l, u] = O(!0), [m, h] = O(null), [g, _] = O(!1), v = T(), [x, E] = O(!1), [D, P] = O(!1), [F, I] = O({}), [L, R] = O([]), [z, B] = O(""), [V, ee] = O(""), [H, U] = O({}), [W, te] = O(!1), G = C(() => {
		let e = { "Content-Type": "application/json" };
		return r && (e.Authorization = `Bearer ${r}`), e;
	}, [r]), K = C(async (e) => {
		if (t) {
			u(!0), h(null);
			try {
				let n = await fetch(`${Z}/api/ingest/sources/${t}`, {
					headers: G(),
					signal: e
				});
				if (!n.ok) throw Error(`HTTP ${n.status}`);
				let r = await n.json();
				if (e?.aborted) return;
				let i = {
					...r,
					mappingRules: fe(r.mappingRules ?? [])
				};
				c(i);
			} catch (t) {
				if (e?.aborted) return;
				h(t instanceof Error ? t.message : String(t));
			} finally {
				e?.aborted || u(!1);
			}
		}
	}, [t, G]);
	w(() => {
		let e = new AbortController();
		return K(e.signal), () => e.abort();
	}, [K]);
	let ne = C(() => {
		o && (I({ ...o.config }), R([...o.mappingRules]), B(o.syncSchedule ?? ""), ee(o.defaultPipelineId ?? ""), U({ ...o.pipelineByDocType ?? {} }), _(!0));
	}, [o]), re = C(() => {
		_(!1);
	}, []), ie = C(async () => {
		if (!(!o || !t)) {
			P(!0);
			try {
				let e = {
					config: F,
					mappingRules: L,
					syncSchedule: z.trim() || null,
					defaultPipelineId: V.trim() || null,
					pipelineByDocType: H
				}, n = await fetch(`${Z}/api/ingest/sources/${t}`, {
					method: "PUT",
					headers: G(),
					body: JSON.stringify(e)
				});
				if (!n.ok) throw Error(`HTTP ${n.status}`);
				let r = await n.json();
				c(r), _(!1);
			} catch (e) {
				h(e instanceof Error ? e.message : String(e));
			} finally {
				P(!1);
			}
		}
	}, [
		o,
		t,
		F,
		L,
		z,
		V,
		H,
		G
	]), J = g && o !== null && (JSON.stringify(F) !== JSON.stringify(o.config) || JSON.stringify(L) !== JSON.stringify(o.mappingRules) || z !== (o.syncSchedule ?? "") || V !== (o.defaultPipelineId ?? "") || JSON.stringify(H) !== JSON.stringify(o.pipelineByDocType ?? {}));
	w(() => {
		if (!J) return;
		let e = (e) => {
			e.preventDefault(), e.returnValue = "";
		};
		return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
	}, [J]);
	let Y = C(async () => {
		if (t) {
			E(!0);
			try {
				let e = await fetch(`${Z}/api/ingest/sources/${t}/sync`, {
					method: "POST",
					headers: G()
				});
				if (!e.ok) throw Error(`HTTP ${e.status}`);
				await K();
			} catch (e) {
				h(e instanceof Error ? e.message : String(e));
			} finally {
				E(!1);
			}
		}
	}, [
		t,
		G,
		K
	]), X = C(async () => {
		if (!o || !t) return;
		let e = o.status === "paused" ? "active" : "paused";
		try {
			let n = await fetch(`${Z}/api/ingest/sources/${t}`, {
				method: "PATCH",
				headers: G(),
				body: JSON.stringify({ status: e })
			});
			if (!n.ok) throw Error(`HTTP ${n.status}`);
			let r = await n.json();
			c(r);
		} catch (e) {
			h(e instanceof Error ? e.message : String(e));
		}
	}, [
		o,
		t,
		G
	]);
	return l && !o ? /* @__PURE__ */ j("div", {
		"data-testid": "source-detail-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ A("div", {
				className: "flex items-center justify-between mb-4 flex-wrap gap-3",
				children: /* @__PURE__ */ A("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Source Detail"
				})
			}),
			/* @__PURE__ */ A(y, { height: 120 }),
			/* @__PURE__ */ A(y, { height: 200 }),
			/* @__PURE__ */ A(y, { height: 100 })
		]
	}) : m && !o ? /* @__PURE__ */ j("div", {
		"data-testid": "source-detail-page",
		className: "p-6 flex flex-col gap-3",
		children: [/* @__PURE__ */ A("div", {
			className: "flex items-center justify-between mb-4 flex-wrap gap-3",
			children: /* @__PURE__ */ A("button", {
				className: "text-[13px] text-primary cursor-pointer bg-transparent border-none font-[inherit] p-0 underline",
				onClick: () => n("/ingest/sources"),
				children: "Back to Sources"
			})
		}), /* @__PURE__ */ j("div", {
			className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3",
			role: "alert",
			children: [/* @__PURE__ */ j("span", {
				className: "text-[13px] font-medium",
				children: ["Failed to load source: ", m]
			}), /* @__PURE__ */ A("button", {
				onClick: () => void K(),
				className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
				children: "Retry"
			})]
		})]
	}) : o ? /* @__PURE__ */ j("div", {
		"data-testid": "source-detail-page",
		className: "p-6 flex flex-col gap-4",
		children: [
			/* @__PURE__ */ A("div", {
				className: "flex items-center justify-between mb-4 flex-wrap gap-3",
				children: /* @__PURE__ */ A("div", {
					className: "flex items-center gap-2.5",
					children: /* @__PURE__ */ A("button", {
						className: "text-[13px] text-primary cursor-pointer bg-transparent border-none font-[inherit] p-0 underline",
						onClick: () => n("/ingest/sources"),
						children: "Back to Sources"
					})
				})
			}),
			/* @__PURE__ */ j("div", {
				className: "flex items-center justify-between mb-4 flex-wrap gap-3",
				children: [/* @__PURE__ */ j("div", {
					className: "flex items-center gap-2.5",
					children: [
						/* @__PURE__ */ A("h2", {
							className: "m-0 text-[22px] font-bold text-text-primary",
							children: o.name
						}),
						/* @__PURE__ */ A(p, {
							tone: le(o.type),
							size: "sm",
							children: ce(o.type)
						}),
						/* @__PURE__ */ A(p, {
							tone: se(o.status),
							size: "sm",
							children: o.status
						})
					]
				}), /* @__PURE__ */ A("div", {
					className: "flex gap-2.5 items-center",
					children: g ? /* @__PURE__ */ j(k, { children: [/* @__PURE__ */ A("button", {
						className: "px-3.5 py-1.5 text-[13px] font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary",
						onClick: re,
						children: "Cancel"
					}), /* @__PURE__ */ A("button", {
						className: f("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]", D && "opacity-50 cursor-not-allowed"),
						onClick: () => void ie(),
						disabled: D,
						children: D ? "Saving..." : "Save Changes"
					})] }) : /* @__PURE__ */ A("button", {
						className: "px-3.5 py-1.5 text-[13px] font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary",
						onClick: ne,
						children: "Edit"
					})
				})]
			}),
			m && /* @__PURE__ */ j("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3",
				role: "alert",
				children: [/* @__PURE__ */ A("span", {
					className: "text-[13px] font-medium",
					children: m
				}), /* @__PURE__ */ A("button", {
					onClick: () => h(null),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
					children: "Dismiss"
				})]
			}),
			/* @__PURE__ */ j("div", {
				className: "bg-surface border border-border rounded-[10px] p-4",
				children: [/* @__PURE__ */ A("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Configuration"
				}), g ? /* @__PURE__ */ A("div", { children: Object.entries(F).map(([e, t]) => /* @__PURE__ */ j("div", {
					className: "flex items-center gap-3 mb-2.5",
					children: [/* @__PURE__ */ A("label", {
						htmlFor: `${v}-cfg-${e}`,
						className: "text-xs font-semibold text-text-tertiary min-w-[140px]",
						children: e
					}), /* @__PURE__ */ A(b, {
						id: `${v}-cfg-${e}`,
						className: "flex-1",
						value: typeof t == "string" ? t : JSON.stringify(t),
						onChange: (t) => I({
							...F,
							[e]: t.target.value
						})
					})]
				}, e)) }) : /* @__PURE__ */ j("div", { children: [Object.entries(o.config).map(([e, t]) => /* @__PURE__ */ j("div", {
					className: "flex items-center gap-3 py-1.5 border-b border-border",
					children: [/* @__PURE__ */ A("span", {
						className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight",
						children: e
					}), /* @__PURE__ */ A("span", {
						className: "text-[13px] text-text-secondary font-mono break-all",
						children: typeof t == "string" ? t : JSON.stringify(t)
					})]
				}, e)), Object.keys(o.config).length === 0 && /* @__PURE__ */ A("span", {
					className: "text-[13px] text-text-tertiary",
					children: "No configuration fields."
				})] })]
			}),
			o ? /* @__PURE__ */ A(ae, { sourceId: o.sourceId }) : null,
			/* @__PURE__ */ j("div", {
				className: "bg-surface border border-border rounded-[10px] p-4",
				children: [/* @__PURE__ */ A("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Mapping Rules"
				}), g ? /* @__PURE__ */ A(q, {
					rules: L,
					onChange: R
				}) : /* @__PURE__ */ A(q, {
					rules: o.mappingRules,
					onChange: () => {},
					readOnly: !0
				})]
			}),
			/* @__PURE__ */ j("div", {
				className: "bg-surface border border-border rounded-[10px] p-4",
				children: [/* @__PURE__ */ j("div", {
					className: "flex items-center justify-between mb-3",
					children: [/* @__PURE__ */ A("div", {
						className: "text-sm font-semibold text-text-primary",
						children: "Sync History"
					}), /* @__PURE__ */ A("button", {
						className: f("px-3.5 py-1.5 text-[13px] font-medium rounded-md cursor-pointer font-[inherit]", x || o.status === "paused" ? "border border-border bg-surface-inset text-text-tertiary opacity-70 cursor-not-allowed" : "border border-primary bg-info-bg text-primary"),
						disabled: x || o.status === "paused",
						onClick: () => void Y(),
						"data-testid": "sync-now-btn",
						children: x ? "Syncing..." : "Sync Now"
					})]
				}), o.lastSyncAt ? /* @__PURE__ */ j(k, { children: [/* @__PURE__ */ j("div", {
					className: "text-xs text-text-tertiary mb-2.5",
					children: [
						"Last synced: ",
						de(o.lastSyncAt),
						" (",
						new Date(o.lastSyncAt).toLocaleString(),
						")"
					]
				}), o.lastSyncStats && /* @__PURE__ */ j("div", {
					className: "grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2.5",
					children: [
						/* @__PURE__ */ j("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ A("div", {
								className: "text-xl font-bold text-text-primary leading-none",
								children: o.lastSyncStats.filesDiscovered
							}), /* @__PURE__ */ A("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Found"
							})]
						}),
						/* @__PURE__ */ j("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ A("div", {
								className: "text-xl font-bold text-[var(--color-state-completed)] leading-none",
								children: o.lastSyncStats.filesIngested
							}), /* @__PURE__ */ A("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Ingested"
							})]
						}),
						/* @__PURE__ */ j("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ A("div", {
								className: "text-xl font-bold text-text-primary leading-none",
								children: o.lastSyncStats.filesSkipped
							}), /* @__PURE__ */ A("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Skipped"
							})]
						}),
						/* @__PURE__ */ j("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ A("div", {
								className: f("text-xl font-bold leading-none", o.lastSyncStats.filesFailed > 0 ? "text-[var(--color-state-failed)]" : "text-text-primary"),
								children: o.lastSyncStats.filesFailed
							}), /* @__PURE__ */ A("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Errors"
							})]
						}),
						/* @__PURE__ */ j("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ A("div", {
								className: "text-xl font-bold text-text-primary leading-none",
								children: ue(o.lastSyncStats.durationMs)
							}), /* @__PURE__ */ A("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Duration"
							})]
						})
					]
				})] }) : /* @__PURE__ */ A("span", {
					className: "text-[13px] text-text-tertiary",
					children: "No sync history yet."
				})]
			}),
			/* @__PURE__ */ j("div", {
				className: "bg-surface border border-border rounded-[10px] p-4",
				children: [/* @__PURE__ */ A("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Settings"
				}), g ? /* @__PURE__ */ j("div", { children: [
					/* @__PURE__ */ j("div", {
						className: "flex items-center gap-3 mb-2.5",
						children: [/* @__PURE__ */ A("span", {
							id: `${v}-schedule-label`,
							className: "text-xs font-semibold text-text-tertiary min-w-[140px]",
							children: "Sync Schedule"
						}), /* @__PURE__ */ j("div", {
							role: "group",
							"aria-labelledby": `${v}-schedule-label`,
							className: "flex gap-2 flex-1 flex-wrap",
							children: [/* @__PURE__ */ A(S, {
								"aria-label": "Schedule preset",
								className: "w-auto min-w-[160px]",
								value: oe.some((e) => e.cron === z) ? z : "__custom__",
								onChange: (e) => {
									e.target.value !== "__custom__" && B(e.target.value);
								},
								"data-testid": "schedule-preset",
								options: [...oe.map((e) => ({
									value: e.cron,
									label: e.label
								})), {
									value: "__custom__",
									label: "Custom…"
								}]
							}), /* @__PURE__ */ A(b, {
								mono: !0,
								"aria-label": "Cron expression",
								className: "flex-1",
								value: z,
								onChange: (e) => B(e.target.value),
								placeholder: "Cron (e.g. 0 */6 * * *) — empty = manual",
								"data-testid": "schedule-cron"
							})]
						})]
					}),
					/* @__PURE__ */ j("div", {
						className: "flex items-center gap-3 mb-2.5",
						children: [/* @__PURE__ */ A("label", {
							htmlFor: `${v}-default-pipeline`,
							className: "text-xs font-semibold text-text-tertiary min-w-[140px]",
							children: "Default Pipeline"
						}), /* @__PURE__ */ A(S, {
							id: `${v}-default-pipeline`,
							className: "flex-1",
							value: V,
							onChange: (e) => ee(e.target.value),
							"data-testid": "default-pipeline-picker",
							options: [
								{
									value: "",
									label: "— None (use mapping rule pipeline) —"
								},
								...i.map((e) => ({
									value: e.id,
									label: `${e.name}${e.status ? ` (${e.status})` : ""}`
								})),
								...V && !i.some((e) => e.id === V) ? [{
									value: V,
									label: `${V} (unknown)`
								}] : []
							]
						})]
					}),
					/* @__PURE__ */ j("div", {
						className: "flex items-center gap-3 mb-2.5",
						children: [/* @__PURE__ */ A("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[140px]",
							children: "Pipeline overrides"
						}), /* @__PURE__ */ j("div", {
							className: "flex-1 flex flex-col gap-2",
							children: [/* @__PURE__ */ j("button", {
								type: "button",
								"data-testid": "overrides-toggle",
								onClick: () => te(!W),
								className: "bg-transparent border-none text-left text-text-secondary p-0 cursor-pointer text-[13px]",
								children: [
									W ? "▾" : "▸",
									" Per-matched-DocType pipeline override (",
									Object.keys(H).length,
									")"
								]
							}), W ? /* @__PURE__ */ j("div", {
								"data-testid": "overrides-section",
								className: "flex flex-col gap-1.5",
								children: [Object.keys(H).length === 0 ? /* @__PURE__ */ A("div", {
									className: "text-xs text-text-tertiary",
									children: "No overrides — every matched type uses the default pipeline."
								}) : Object.entries(H).map(([e, t]) => /* @__PURE__ */ j("div", {
									className: "flex gap-2 items-center",
									children: [
										/* @__PURE__ */ A("span", {
											className: "flex-[0_0_160px] text-[13px]",
											children: a.find((t) => t.id === e)?.name ?? e
										}),
										/* @__PURE__ */ A(S, {
											"aria-label": `Pipeline for ${a.find((t) => t.id === e)?.name ?? e}`,
											"data-testid": `overrides-pipeline-${e}`,
											className: "flex-1",
											value: t,
											onChange: (t) => U({
												...H,
												[e]: t.target.value
											}),
											options: i.map((e) => ({
												value: e.id,
												label: e.name
											}))
										}),
										/* @__PURE__ */ A("button", {
											type: "button",
											"data-testid": `overrides-remove-${e}`,
											onClick: () => {
												let t = { ...H };
												delete t[e], U(t);
											},
											className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none cursor-pointer",
											children: "Remove"
										})
									]
								}, e)), /* @__PURE__ */ A(S, {
									"aria-label": "Add override for type",
									"data-testid": "overrides-add-type",
									className: "w-auto self-start",
									value: "",
									onChange: (e) => {
										let t = e.target.value;
										t && U({
											...H,
											[t]: i[0]?.id ?? ""
										});
									},
									options: [{
										value: "",
										label: "+ Add override for type…"
									}, ...a.filter((e) => H[e.id] === void 0).map((e) => ({
										value: e.id,
										label: e.name
									}))]
								})]
							}) : null]
						})]
					})
				] }) : /* @__PURE__ */ j("div", { children: [
					/* @__PURE__ */ j("div", {
						className: "flex items-center gap-3 py-1.5 border-b border-border",
						children: [/* @__PURE__ */ A("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight",
							children: "Sync Schedule"
						}), /* @__PURE__ */ A("span", {
							className: "text-[13px] text-text-secondary font-mono break-all",
							children: o.syncSchedule ?? "Manual (no schedule)"
						})]
					}),
					/* @__PURE__ */ j("div", {
						className: "flex items-center gap-3 py-1.5 border-b border-border",
						children: [/* @__PURE__ */ A("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight",
							children: "Default Pipeline"
						}), /* @__PURE__ */ A("span", {
							className: "text-[13px] text-text-secondary font-mono break-all",
							children: o.defaultPipelineId ? i.find((e) => e.id === o.defaultPipelineId)?.name ?? o.defaultPipelineId : "—"
						})]
					}),
					/* @__PURE__ */ j("div", {
						className: "flex items-center gap-3 py-1.5",
						children: [/* @__PURE__ */ A("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight",
							children: "Status"
						}), /* @__PURE__ */ j("span", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ A(p, {
								tone: se(o.status),
								size: "sm",
								children: o.status
							}), /* @__PURE__ */ A("button", {
								className: f("px-3.5 py-1.5 text-xs font-medium rounded-md cursor-pointer font-[inherit] border-none text-white", o.status === "paused" ? "bg-state-completed" : "bg-state-awaiting"),
								onClick: () => void X(),
								children: o.status === "paused" ? "Resume" : "Pause"
							})]
						})]
					})
				] })]
			})
		]
	}) : null;
}
//#endregion
//#region src/components/ingest/IngestItemDrawer.tsx
var me = "", he = [
	"queued",
	"mapping",
	"materializing",
	"triggering",
	"done"
];
function ge(e) {
	switch (e) {
		case "queued": return "neutral";
		case "mapping": return "info";
		case "materializing": return "purple";
		case "triggering": return "caution";
		case "done": return "success";
		case "failed": return "danger";
		default: return "neutral";
	}
}
function _e(e) {
	switch (e) {
		case "rule": return "neutral";
		case "llm-match": return "info";
		case "llm-generate": return "purple";
		default: return "neutral";
	}
}
function ve(e) {
	switch (e) {
		case "rule": return "Matched a configured rule";
		case "llm-match": return "LLM matched to existing DocType";
		case "llm-generate": return "LLM proposed a new DocType";
		default: return e;
	}
}
function ye(e, t) {
	if (t === "failed") return e === "queued";
	let n = he;
	return n.indexOf(e) <= n.indexOf(t);
}
function Q(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : `${Math.floor(t / 864e5)}d ago`;
}
function be({ item: t, sourceName: n, onClose: r, onRetry: i, onSkip: a }) {
	let { idToken: s } = e(), [c, l] = O(null), [u, d] = O(null), { events: h } = o(), y = D(null), b = D(null), x = m(t !== null);
	w(() => {
		if (!t) return;
		let e = (e) => {
			if (x()) {
				if (e.key === "Escape") {
					r();
					return;
				}
				_(e, y.current);
			}
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		t,
		r,
		x
	]), w(() => {
		if (t) return b.current = typeof document < "u" ? document.activeElement : null, v(y.current), () => {
			g(b.current), b.current = null;
		};
	}, [t]);
	let S = E(() => {
		if (!t) return /* @__PURE__ */ new Map();
		let e = /* @__PURE__ */ new Map();
		for (let n of h) n.ingestId === t.itemId && (n.type === "item.status" && typeof n.status == "string" && typeof n.timestamp == "string" && e.set(n.status, n.timestamp), n.type === "item.materialized" && typeof n.timestamp == "string" && e.set("done", n.timestamp), n.type === "item.failed" && typeof n.timestamp == "string" && e.set("failed", n.timestamp));
		return e;
	}, [h, t]);
	if (!t) return null;
	let C = t.status === "failed", T = t.status === "done" || t.status === "failed", M = typeof t.mappingConfidence == "number" ? t.mappingConfidence : null, N = async () => {
		l("retry");
		try {
			await i(t.itemId) !== !1 && r();
		} finally {
			l(null);
		}
	}, P = async () => {
		l("skip");
		try {
			await a(t.itemId) !== !1 && r();
		} finally {
			l(null);
		}
	}, F = async () => {
		l("remap"), d(null);
		try {
			let e = { "Content-Type": "application/json" };
			s && (e.Authorization = `Bearer ${s}`);
			let n = await fetch(`${me}/api/ingest/items/${t.itemId}/remap`, {
				method: "POST",
				headers: e
			});
			if (!n.ok) throw Error(`HTTP ${n.status}`);
			r();
		} catch (e) {
			d(e instanceof Error ? e.message : String(e));
		} finally {
			l(null);
		}
	};
	return /* @__PURE__ */ A("div", {
		className: "fixed inset-0 bg-black/35 z-[9999] flex justify-end",
		onClick: r,
		"data-testid": "ingest-item-drawer-scrim",
		children: /* @__PURE__ */ j("div", {
			ref: y,
			className: "w-[min(560px,100vw)] h-full bg-surface shadow-[-12px_0_32px_rgba(0,0,0,0.12)] overflow-y-auto font-[inherit] flex flex-col",
			onClick: (e) => e.stopPropagation(),
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Ingest item details",
			"data-testid": "ingest-item-drawer",
			children: [
				/* @__PURE__ */ j("div", {
					className: "px-5 py-4 border-b border-border flex items-center justify-between sticky top-0 bg-surface z-[1]",
					children: [/* @__PURE__ */ A("h3", {
						className: "text-base font-bold text-text-primary m-0",
						children: "Ingest Item"
					}), /* @__PURE__ */ A("button", {
						className: "bg-transparent border-none text-[22px] leading-none cursor-pointer text-text-tertiary p-1 font-[inherit]",
						onClick: r,
						"aria-label": "Close",
						"data-testid": "ingest-item-drawer-close",
						children: "×"
					})]
				}),
				/* @__PURE__ */ j("div", {
					className: "p-5 flex flex-col gap-4.5 flex-1",
					children: [
						/* @__PURE__ */ j("div", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ A("div", {
									className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
									children: "Source path"
								}),
								/* @__PURE__ */ A("div", {
									className: "font-mono text-xs text-text-primary bg-surface-inset border border-border rounded-md px-2.5 py-2 break-all",
									children: t.sourcePath
								}),
								/* @__PURE__ */ j("div", {
									className: "flex gap-2 items-center mt-1",
									children: [
										/* @__PURE__ */ A(p, {
											tone: ge(t.status),
											size: "sm",
											children: t.status
										}),
										n && /* @__PURE__ */ j("span", {
											className: "text-xs text-text-tertiary",
											children: ["from ", /* @__PURE__ */ A("strong", {
												className: "text-text-secondary",
												children: n
											})]
										}),
										/* @__PURE__ */ j("span", {
											className: "text-xs text-text-tertiary ml-auto",
											children: ["Updated ", Q(t.updatedAt)]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ j("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ A("div", {
								className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
								children: "Status timeline"
							}), /* @__PURE__ */ j("div", {
								className: "flex flex-col relative",
								children: [he.map((e, n) => {
									let r = ye(e, t.status), i = e === t.status, a = C && n === 0, o = {
										...r ? {
											background: a ? "var(--color-state-failed)" : "var(--color-state-completed)",
											borderColor: a ? "var(--color-state-failed)" : "var(--color-state-completed)"
										} : {},
										...i && !T ? {
											background: "var(--color-state-running)",
											borderColor: "var(--color-state-running)"
										} : {}
									};
									return /* @__PURE__ */ j("div", {
										className: "flex items-start gap-3 relative py-1.5",
										children: [
											n < he.length - 1 && /* @__PURE__ */ A("span", {
												className: "absolute left-[5px] top-[18px] bottom-[-6px] w-0.5 bg-border",
												"aria-hidden": "true"
											}),
											/* @__PURE__ */ A("span", {
												className: "w-3 h-3 rounded-full shrink-0 mt-1 border-2 border-border bg-surface",
												style: o,
												"aria-hidden": "true"
											}),
											/* @__PURE__ */ j("div", { children: [/* @__PURE__ */ A("div", {
												className: "text-[13px] font-medium text-text-primary",
												children: e
											}), (() => {
												let n = S.get(e);
												return n ? /* @__PURE__ */ A("div", {
													"data-testid": `timeline-meta-${e}`,
													className: "text-[11px] text-text-tertiary mt-0.5",
													children: Q(n)
												}) : i ? /* @__PURE__ */ A("div", {
													"data-testid": `timeline-meta-${e}`,
													className: "text-[11px] text-text-tertiary mt-0.5",
													children: T ? Q(t.updatedAt) : "in progress"
												}) : null;
											})()] })
										]
									}, e);
								}), C && /* @__PURE__ */ j("div", {
									className: "flex items-start gap-3 relative py-1.5",
									children: [/* @__PURE__ */ A("span", { className: "w-3 h-3 rounded-full shrink-0 mt-1 border-2 bg-state-failed border-state-failed" }), /* @__PURE__ */ j("div", { children: [/* @__PURE__ */ A("div", {
										className: "text-[13px] font-medium text-[var(--color-state-failed)]",
										children: "failed"
									}), /* @__PURE__ */ A("div", {
										"data-testid": "timeline-meta-failed",
										className: "text-[11px] text-text-tertiary mt-0.5",
										children: Q(S.get("failed") ?? t.updatedAt)
									})] })]
								})]
							})]
						}),
						/* @__PURE__ */ j("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ A("div", {
								className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
								children: "Mapping decision"
							}), t.mappingMethod ? /* @__PURE__ */ j(k, { children: [/* @__PURE__ */ j("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ A(p, {
									tone: _e(t.mappingMethod),
									size: "sm",
									children: t.mappingMethod
								}), /* @__PURE__ */ A("span", {
									className: "text-xs text-text-secondary",
									children: ve(t.mappingMethod)
								})]
							}), M !== null && /* @__PURE__ */ j("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ A("div", {
									className: "flex-1 h-2 bg-surface-inset rounded overflow-hidden border border-border",
									children: /* @__PURE__ */ A("div", {
										className: "h-full transition-[width] duration-200 ease-out",
										style: {
											width: `${Math.round(M * 100)}%`,
											background: M >= .7 ? "var(--color-state-completed)" : M >= .4 ? "var(--color-state-awaiting)" : "var(--color-state-failed)"
										}
									})
								}), /* @__PURE__ */ j("span", {
									className: "font-mono text-xs text-text-secondary min-w-[48px] text-right",
									children: [(M * 100).toFixed(0), "%"]
								})]
							})] }) : /* @__PURE__ */ j("span", {
								className: "text-xs text-text-tertiary",
								children: [
									"No mapping decision yet — item is still in ",
									t.status,
									"."
								]
							})]
						}),
						/* @__PURE__ */ j("div", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ A("div", {
									className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
									children: "Identity"
								}),
								/* @__PURE__ */ j("div", {
									className: "flex items-center gap-3 py-1.5 border-b border-border",
									children: [/* @__PURE__ */ A("span", {
										className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight",
										children: "Item ID"
									}), /* @__PURE__ */ A("span", {
										className: "text-[13px] text-text-secondary font-mono break-all",
										children: t.itemId
									})]
								}),
								/* @__PURE__ */ j("div", {
									className: "flex items-center gap-3 py-1.5 border-b border-border",
									children: [/* @__PURE__ */ A("span", {
										className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight",
										children: "Document Type"
									}), /* @__PURE__ */ A("span", {
										className: "text-[13px] text-text-secondary font-mono break-all",
										children: t.documentTypeId ?? "—"
									})]
								}),
								/* @__PURE__ */ j("div", {
									className: "flex items-center gap-3 py-1.5 border-b border-border",
									children: [/* @__PURE__ */ A("span", {
										className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight",
										children: "Document"
									}), /* @__PURE__ */ A("span", {
										className: "text-[13px] text-text-secondary font-mono break-all",
										children: t.documentId ? /* @__PURE__ */ A("a", {
											href: `/documents/${t.documentId}`,
											className: "text-primary",
											children: t.documentId
										}) : "—"
									})]
								}),
								/* @__PURE__ */ j("div", {
									className: "flex items-center gap-3 py-1.5",
									children: [/* @__PURE__ */ A("span", {
										className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight",
										children: "Pipeline Run"
									}), /* @__PURE__ */ A("span", {
										className: "text-[13px] text-text-secondary font-mono break-all",
										children: t.pipelineRunId ?? "—"
									})]
								})
							]
						}),
						t.error && /* @__PURE__ */ j("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ A("div", {
								className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
								children: "Error"
							}), /* @__PURE__ */ A("div", {
								className: "bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-md p-2.5 text-xs font-mono whitespace-pre-wrap break-words",
								children: t.error
							})]
						}),
						u && /* @__PURE__ */ j("div", {
							role: "alert",
							className: "bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-md p-2.5 text-xs font-mono whitespace-pre-wrap break-words",
							children: ["Re-map failed: ", u]
						})
					]
				}),
				/* @__PURE__ */ j("div", {
					className: "px-4 py-4 border-t border-border flex gap-2 justify-end flex-wrap bg-surface sticky bottom-0",
					children: [
						/* @__PURE__ */ A("button", {
							className: f("px-3.5 py-1.5 text-[13px] font-medium font-[inherit] rounded-md cursor-pointer bg-surface border border-border text-text-secondary", (c || t.status === "done") && "opacity-50 cursor-not-allowed"),
							onClick: () => void F(),
							disabled: !!c || t.status === "done",
							"data-testid": "item-remap-btn",
							title: "Re-run the mapping engine for this item",
							children: c === "remap" ? "Re-mapping…" : "Re-map"
						}),
						/* @__PURE__ */ A("button", {
							className: f("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] rounded-md cursor-pointer", c || !C ? "bg-surface border border-border text-text-secondary opacity-50 cursor-not-allowed" : "bg-primary border-none text-white"),
							onClick: () => void N(),
							disabled: !!c || !C,
							"data-testid": "item-retry-btn",
							title: C ? "Retry this item from the beginning" : "Only failed items can be retried",
							children: c === "retry" ? "Retrying…" : "Retry"
						}),
						/* @__PURE__ */ A("button", {
							className: f("px-3.5 py-1.5 text-[13px] font-medium font-[inherit] rounded-md cursor-pointer", c || t.status === "done" ? "bg-surface border border-border text-text-secondary opacity-50 cursor-not-allowed" : "bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)]"),
							onClick: () => void P(),
							disabled: !!c || t.status === "done",
							"data-testid": "item-discard-btn",
							title: "Skip / discard this item",
							children: c === "skip" ? "Discarding…" : "Discard"
						})
					]
				})
			]
		})
	});
}
//#endregion
//#region src/components/ingest/IngestItemsPage.tsx
var xe = [
	"queued",
	"mapping",
	"materializing",
	"triggering",
	"done",
	"failed"
];
function Se(e) {
	switch (e) {
		case "queued": return "neutral";
		case "mapping": return "info";
		case "materializing": return "purple";
		case "triggering": return "caution";
		case "done": return "success";
		case "failed": return "danger";
		default: return "neutral";
	}
}
function Ce(e) {
	switch (e) {
		case "rule": return "neutral";
		case "llm-match": return "info";
		case "llm-generate": return "purple";
		default: return "neutral";
	}
}
function we(e, t = 50) {
	return e.length <= t ? e : "..." + e.slice(e.length - t + 3);
}
function Te() {
	let [e, n] = O(null), [r, i] = O(null), [a, o] = O(null), { sources: s } = t(), { items: l, loading: u, error: d, refresh: f, retryItem: m, skipItem: g, actionError: _, clearActionError: v } = c({
		sourceId: e,
		status: r
	}), b = a ? l.find((e) => e.itemId === a.itemId) ?? a : null, w = E(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of s) e.set(t.sourceId, t.name);
		return e;
	}, [s]), T = C(async (e) => m(e), [m]), D = C(async (e) => g(e), [g]);
	return u && l.length === 0 ? /* @__PURE__ */ j("div", {
		"data-testid": "ingest-items-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ A("div", {
				className: "flex items-center justify-between mb-4",
				children: /* @__PURE__ */ A("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Ingest Items"
				})
			}),
			/* @__PURE__ */ A(y, { height: 48 }),
			/* @__PURE__ */ A(y, { height: 48 }),
			/* @__PURE__ */ A(y, { height: 48 })
		]
	}) : /* @__PURE__ */ j("div", {
		"data-testid": "ingest-items-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ A("div", {
				className: "flex items-center justify-between mb-4",
				children: /* @__PURE__ */ j("div", { children: [/* @__PURE__ */ A("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Ingest Items"
				}), /* @__PURE__ */ j("span", {
					className: "text-[13px] text-text-tertiary",
					children: [
						l.length,
						" item",
						l.length === 1 ? "" : "s"
					]
				})] })
			}),
			/* @__PURE__ */ j("div", {
				className: "flex gap-2.5 items-center mb-3 flex-wrap",
				children: [
					/* @__PURE__ */ A(S, {
						"aria-label": "Filter by source",
						className: "w-auto",
						value: e ?? "",
						onChange: (e) => n(e.target.value || null),
						"data-testid": "source-filter",
						options: [{
							value: "",
							label: "All Sources"
						}, ...s.map((e) => ({
							value: e.sourceId,
							label: e.name
						}))]
					}),
					/* @__PURE__ */ A(S, {
						"aria-label": "Filter by status",
						className: "w-auto",
						value: r ?? "",
						onChange: (e) => i(e.target.value || null),
						"data-testid": "status-filter",
						options: [{
							value: "",
							label: "All"
						}, ...xe.map((e) => ({
							value: e,
							label: e
						}))]
					}),
					/* @__PURE__ */ A("button", {
						className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
						onClick: () => void f(),
						"data-testid": "refresh-btn",
						children: "Refresh"
					})
				]
			}),
			d && /* @__PURE__ */ j("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4",
				role: "alert",
				children: [/* @__PURE__ */ A("span", {
					className: "text-[13px] font-medium",
					children: "Failed to load ingest items."
				}), /* @__PURE__ */ A("button", {
					onClick: () => void f(),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
					children: "Retry"
				})]
			}),
			_ && /* @__PURE__ */ j("div", {
				"data-testid": "ingest-items-action-error",
				role: "alert",
				className: "px-4 py-3 bg-danger-bg border border-danger-border text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-4",
				children: [/* @__PURE__ */ j("span", {
					className: "text-[13px] font-medium",
					children: ["Could not update that item: ", _]
				}), /* @__PURE__ */ A("button", {
					onClick: v,
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-danger-fg border border-danger-border rounded-md cursor-pointer font-[inherit]",
					children: "Dismiss"
				})]
			}),
			!d && l.length === 0 ? /* @__PURE__ */ A(h, {
				icon: "📋",
				title: "No items found",
				body: "No ingest items match the current filters."
			}) : !d && /* @__PURE__ */ A("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ j("table", {
					className: "w-full border-collapse text-[13px]",
					children: [/* @__PURE__ */ A("thead", { children: /* @__PURE__ */ j("tr", {
						className: "border-b border-border",
						children: [
							/* @__PURE__ */ A("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "File Path"
							}),
							/* @__PURE__ */ A("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Source"
							}),
							/* @__PURE__ */ A("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Status"
							}),
							/* @__PURE__ */ A("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Type"
							}),
							/* @__PURE__ */ A("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Method"
							}),
							/* @__PURE__ */ A("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Document"
							}),
							/* @__PURE__ */ A("th", {
								className: "p-2 text-right text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ A("tbody", { children: l.map((e) => /* @__PURE__ */ j("tr", {
						className: "border-b border-border cursor-pointer hover:bg-surface-hover",
						onClick: () => o(e),
						onKeyDown: x(() => o(e)),
						role: "button",
						tabIndex: 0,
						"aria-label": `Open details for ${e.sourcePath}`,
						"data-testid": `item-row-${e.itemId}`,
						children: [
							/* @__PURE__ */ A("td", {
								className: "p-2 font-medium text-text-primary max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap",
								title: e.sourcePath,
								children: we(e.sourcePath)
							}),
							/* @__PURE__ */ A("td", {
								className: "p-2 text-text-secondary",
								children: w.get(e.sourceId) ?? e.sourceId.slice(0, 8)
							}),
							/* @__PURE__ */ A("td", {
								className: "p-2",
								children: /* @__PURE__ */ A(p, {
									tone: Se(e.status),
									size: "sm",
									children: e.status
								})
							}),
							/* @__PURE__ */ A("td", {
								className: "p-2 font-mono text-[11px] text-text-secondary",
								children: e.documentTypeId ?? "—"
							}),
							/* @__PURE__ */ A("td", {
								className: "p-2",
								children: e.mappingMethod ? /* @__PURE__ */ A(p, {
									tone: Ce(e.mappingMethod),
									size: "xs",
									children: e.mappingMethod
								}) : "—"
							}),
							/* @__PURE__ */ A("td", {
								className: "p-2",
								children: e.documentId ? /* @__PURE__ */ j("a", {
									href: `/documents/${e.documentId}`,
									className: "text-primary no-underline font-medium text-xs",
									onClick: (e) => e.stopPropagation(),
									onKeyDown: (e) => e.stopPropagation(),
									children: [e.documentId.slice(0, 8), "..."]
								}) : "—"
							}),
							/* @__PURE__ */ A("td", {
								className: "p-2 text-right",
								onClick: (e) => e.stopPropagation(),
								onKeyDown: (e) => e.stopPropagation(),
								children: /* @__PURE__ */ j("div", {
									className: "flex gap-1.5 justify-end",
									children: [e.status === "failed" && /* @__PURE__ */ A("button", {
										className: "px-2.5 py-1 text-[11px] font-medium border border-border rounded-[5px] bg-surface cursor-pointer font-[inherit] text-text-secondary",
										onClick: () => void T(e.itemId),
										"data-testid": `retry-${e.itemId}`,
										children: "Retry"
									}), e.status !== "done" && /* @__PURE__ */ A("button", {
										className: "px-2.5 py-1 text-[11px] font-medium border border-[var(--color-state-failed)] rounded-[5px] bg-danger-bg cursor-pointer font-[inherit] text-[var(--color-state-failed)]",
										onClick: () => void D(e.itemId),
										"data-testid": `skip-${e.itemId}`,
										children: "Skip"
									})]
								})
							})
						]
					}, e.itemId)) })]
				})
			}),
			/* @__PURE__ */ A(be, {
				item: b,
				sourceName: b ? w.get(b.sourceId) : void 0,
				onClose: () => o(null),
				onRetry: T,
				onSkip: D
			})
		]
	});
}
//#endregion
//#region src/components/ingest/IngestAuditPage.tsx
var Ee = [
	{
		value: "",
		label: "All events"
	},
	{
		value: "mapping.decided",
		label: "mapping.decided"
	},
	{
		value: "source.created",
		label: "source.created"
	},
	{
		value: "source.updated",
		label: "source.updated"
	},
	{
		value: "source.paused",
		label: "source.paused"
	},
	{
		value: "source.resumed",
		label: "source.resumed"
	},
	{
		value: "writeback.attempted",
		label: "writeback.attempted"
	},
	{
		value: "writeback.failed",
		label: "writeback.failed"
	}
], De = [
	{
		value: "1h",
		label: "Last 1h",
		ms: 36e5
	},
	{
		value: "6h",
		label: "Last 6h",
		ms: 216e5
	},
	{
		value: "24h",
		label: "Last 24h",
		ms: 864e5
	},
	{
		value: "7d",
		label: "Last 7d",
		ms: 6048e5
	},
	{
		value: "all",
		label: "All time",
		ms: null
	}
];
function Oe() {
	let [e, t] = O("24h"), [n, r] = O(""), [a, o] = O(""), [s, c] = O(""), l = T(), [u, d] = O(null), f = E(() => {
		let t = De.find((t) => t.value === e);
		return {
			since: t && t.ms !== null ? new Date(Date.now() - t.ms).toISOString() : void 0,
			eventType: n || void 0,
			actor: a.trim() || void 0,
			targetId: s.trim() || void 0,
			limit: 200
		};
	}, [
		e,
		n,
		a,
		s
	]), { entries: p, loading: m, error: g } = i(f);
	return /* @__PURE__ */ j("div", {
		"data-testid": "ingest-audit-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ A("div", {
				className: "mb-3",
				children: /* @__PURE__ */ A("div", {
					className: "text-[22px] font-bold text-text-primary",
					children: "Audit log"
				})
			}),
			/* @__PURE__ */ j("div", {
				className: "flex gap-2 flex-wrap items-center p-3 bg-surface-inset rounded-lg mb-3",
				children: [
					/* @__PURE__ */ A("label", {
						htmlFor: `${l}-time`,
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Time"
					}),
					/* @__PURE__ */ A(S, {
						id: `${l}-time`,
						"data-testid": "audit-time-range",
						className: "w-auto min-w-[140px]",
						value: e,
						onChange: (e) => t(e.target.value),
						options: De.map((e) => ({
							value: e.value,
							label: e.label
						}))
					}),
					/* @__PURE__ */ A("label", {
						htmlFor: `${l}-event`,
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Event"
					}),
					/* @__PURE__ */ A(S, {
						id: `${l}-event`,
						"data-testid": "audit-event-type",
						className: "w-auto min-w-[140px]",
						value: n,
						onChange: (e) => r(e.target.value),
						options: Ee.map((e) => ({
							value: e.value,
							label: e.label
						}))
					}),
					/* @__PURE__ */ A("label", {
						htmlFor: `${l}-actor`,
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Actor"
					}),
					/* @__PURE__ */ A(b, {
						id: `${l}-actor`,
						"data-testid": "audit-actor",
						className: "w-auto min-w-[140px]",
						value: a,
						onChange: (e) => o(e.target.value),
						placeholder: "email or system"
					}),
					/* @__PURE__ */ A("label", {
						htmlFor: `${l}-target`,
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Target"
					}),
					/* @__PURE__ */ A(b, {
						id: `${l}-target`,
						"data-testid": "audit-target-id",
						className: "w-auto min-w-[140px]",
						value: s,
						onChange: (e) => c(e.target.value),
						placeholder: "sourceId / itemId"
					})
				]
			}),
			g ? /* @__PURE__ */ j("div", {
				role: "alert",
				"data-testid": "audit-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3",
				children: ["Couldn't load audit log: ", g]
			}) : null,
			m && p.length === 0 ? /* @__PURE__ */ A("div", { children: /* @__PURE__ */ A(y, { height: 200 }) }) : p.length === 0 && !g ? /* @__PURE__ */ A(h, {
				icon: "📜",
				title: "No audit entries",
				body: "Mapping decisions, source changes, and write-back attempts will appear here once instrumentation is wired (hub#2215).",
				testId: "audit-empty"
			}) : /* @__PURE__ */ j("table", {
				"data-testid": "audit-table",
				className: "w-full border-collapse bg-surface border border-border rounded-[10px] overflow-hidden",
				children: [/* @__PURE__ */ A("thead", { children: /* @__PURE__ */ j("tr", { children: [
					/* @__PURE__ */ A("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Time"
					}),
					/* @__PURE__ */ A("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Actor"
					}),
					/* @__PURE__ */ A("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Event"
					}),
					/* @__PURE__ */ A("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Target"
					}),
					/* @__PURE__ */ A("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Summary"
					}),
					/* @__PURE__ */ A("th", { className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border" })
				] }) }), /* @__PURE__ */ A("tbody", { children: p.map((e) => /* @__PURE__ */ A(ke, {
					entry: e,
					expanded: u === e.auditId,
					onToggle: () => d(u === e.auditId ? null : e.auditId)
				}, e.auditId)) })]
			})
		]
	});
}
function ke({ entry: e, expanded: t, onToggle: n }) {
	return /* @__PURE__ */ j(k, { children: [/* @__PURE__ */ j("tr", {
		"data-testid": `audit-row-${e.auditId}`,
		children: [
			/* @__PURE__ */ A("td", {
				className: "text-[13px] p-2 align-top border-b border-border font-mono text-xs",
				children: e.createdAt.slice(0, 19).replace("T", " ")
			}),
			/* @__PURE__ */ A("td", {
				className: "text-[13px] p-2 align-top border-b border-border",
				children: e.actor
			}),
			/* @__PURE__ */ A("td", {
				className: "text-[13px] p-2 align-top border-b border-border font-mono text-xs",
				children: e.eventType
			}),
			/* @__PURE__ */ j("td", {
				className: "text-[13px] p-2 align-top border-b border-border font-mono text-xs",
				title: e.targetId,
				children: [
					e.targetType,
					"/",
					e.targetId.slice(0, 12)
				]
			}),
			/* @__PURE__ */ A("td", {
				className: "text-[13px] p-2 align-top border-b border-border",
				children: e.summary
			}),
			/* @__PURE__ */ A("td", {
				className: "text-[13px] p-2 align-top border-b border-border",
				children: /* @__PURE__ */ A("button", {
					"data-testid": `audit-detail-toggle-${e.auditId}`,
					className: "text-[11px] text-primary bg-transparent border-none p-0 cursor-pointer underline",
					onClick: n,
					children: t ? "hide" : "detail"
				})
			})
		]
	}), t ? /* @__PURE__ */ A("tr", { children: /* @__PURE__ */ A("td", {
		colSpan: 6,
		className: "text-[13px] p-2 align-top border-b border-border",
		children: /* @__PURE__ */ A("pre", {
			"data-testid": `audit-detail-${e.auditId}`,
			className: "text-[11px] font-mono bg-surface-inset px-2 py-1.5 rounded whitespace-pre-wrap mt-1 max-h-[200px] overflow-auto",
			children: JSON.stringify(e.detail, null, 2)
		})
	}) }) : null] });
}
//#endregion
//#region src/components/ingest/ConflictsPage.tsx
function $(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : `${Math.floor(t / 864e5)}d ago`;
}
function Ae(e) {
	if (e == null) return "—";
	if (typeof e == "string") return e;
	try {
		return JSON.stringify(e, null, 2);
	} catch {
		return String(e);
	}
}
function je() {
	let { conflicts: e, loading: n, error: r, usingMock: i, refresh: a, resolveConflict: o, discardConflict: s, actionError: c, clearActionError: u } = l(), { sources: d } = t(), [m, g] = O(null), [_, v] = O("platform"), [x, S] = O({}), [C, T] = O(""), [D, k] = O(!1), M = E(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of d) e.set(t.sourceId, t.name);
		return e;
	}, [d]), N = E(() => e.filter((e) => e.status === "pending"), [e]);
	w(() => {
		m && N.some((e) => e.conflictId === m) || g(N[0]?.conflictId ?? null);
	}, [N, m]);
	let P = E(() => N.find((e) => e.conflictId === m) ?? null, [N, m]);
	w(() => {
		v("platform"), S({}), T("");
	}, [m]);
	let F = async () => {
		if (P) {
			k(!0);
			try {
				let e = {
					pick: _,
					...Object.keys(x).length > 0 ? { fieldChoices: x } : {},
					...C.trim() ? { note: C.trim() } : {}
				};
				await o(P.conflictId, e);
			} finally {
				k(!1);
			}
		}
	}, I = async () => {
		if (P) {
			k(!0);
			try {
				await s(P.conflictId);
			} finally {
				k(!1);
			}
		}
	};
	return n && e.length === 0 ? /* @__PURE__ */ j("div", {
		"data-testid": "conflicts-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ A("div", {
				className: "flex items-center justify-between mb-3",
				children: /* @__PURE__ */ A("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Sync Conflicts"
				})
			}),
			/* @__PURE__ */ A(y, { height: 48 }),
			/* @__PURE__ */ A(y, { height: 200 })
		]
	}) : /* @__PURE__ */ j("div", {
		"data-testid": "conflicts-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ j("div", {
				className: "flex items-center justify-between mb-3",
				children: [/* @__PURE__ */ j("div", { children: [/* @__PURE__ */ A("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Sync Conflicts"
				}), /* @__PURE__ */ j("span", {
					className: "text-[13px] text-text-tertiary",
					children: [
						N.length,
						" pending",
						(N.length, ""),
						" • ",
						e.length - N.length,
						" resolved"
					]
				})] }), /* @__PURE__ */ A("button", {
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
					onClick: () => void a(),
					"data-testid": "conflicts-refresh",
					children: "Refresh"
				})]
			}),
			i && /* @__PURE__ */ j("div", {
				className: "px-3.5 py-2.5 bg-warning-bg border border-[var(--color-state-awaiting)] text-warning-fg rounded-lg text-xs mb-3",
				"data-testid": "conflicts-mock-banner",
				children: [
					"Showing mock conflicts — backend endpoint ",
					/* @__PURE__ */ A("code", { children: "/api/sync/conflicts" }),
					" not implemented yet."
				]
			}),
			r && !i && /* @__PURE__ */ A("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-3",
				role: "alert",
				children: /* @__PURE__ */ j("span", {
					className: "text-[13px]",
					children: ["Failed to load conflicts: ", r]
				})
			}),
			c && /* @__PURE__ */ j("div", {
				"data-testid": "conflicts-action-error",
				role: "alert",
				className: "px-4 py-3 bg-danger-bg border border-danger-border text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-3",
				children: [/* @__PURE__ */ j("span", {
					className: "text-[13px] font-medium",
					children: ["That conflict was not updated: ", c]
				}), /* @__PURE__ */ A("button", {
					onClick: u,
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-danger-fg border border-danger-border rounded-md cursor-pointer font-[inherit]",
					children: "Dismiss"
				})]
			}),
			N.length === 0 ? /* @__PURE__ */ A(h, {
				icon: "✅",
				title: "No pending conflicts",
				body: "Write-back conflicts that need operator intervention will appear here."
			}) : /* @__PURE__ */ j("div", {
				className: "grid grid-cols-[320px_1fr] gap-4 items-start",
				children: [/* @__PURE__ */ j("div", {
					className: "bg-surface border border-border rounded-[10px] overflow-hidden",
					"data-testid": "conflicts-list",
					children: [/* @__PURE__ */ j("div", {
						className: "px-3.5 py-2.5 border-b border-border text-xs font-semibold text-text-tertiary uppercase tracking-wide bg-surface-panel",
						children: [
							"Pending (",
							N.length,
							")"
						]
					}), N.map((e) => {
						let t = e.conflictId === m;
						return /* @__PURE__ */ j("button", {
							type: "button",
							"aria-pressed": t,
							className: f("px-3.5 py-2.5 border-b border-border cursor-pointer flex flex-col gap-1", "text-left w-full bg-transparent border-x-0 border-t-0 font-[inherit]", t && "bg-primary-bg"),
							onClick: () => g(e.conflictId),
							"data-testid": `conflict-row-${e.conflictId}`,
							children: [/* @__PURE__ */ A("div", {
								className: "text-[13px] font-semibold text-text-primary leading-tight line-clamp-2",
								children: e.summary
							}), /* @__PURE__ */ j("div", {
								className: "flex gap-1.5 items-center flex-wrap text-[11px] text-text-tertiary",
								children: [
									/* @__PURE__ */ j(p, {
										tone: "warning",
										size: "xs",
										children: [
											e.fields.length,
											" field",
											e.fields.length === 1 ? "" : "s"
										]
									}),
									/* @__PURE__ */ A("span", { children: M.get(e.sourceId) ?? e.sourceId.slice(0, 10) }),
									/* @__PURE__ */ A("span", { children: "•" }),
									/* @__PURE__ */ A("span", { children: $(e.detectedAt) })
								]
							})]
						}, e.conflictId);
					})]
				}), P && /* @__PURE__ */ j("div", {
					className: "bg-surface border border-border rounded-[10px] p-4.5 flex flex-col gap-4",
					"data-testid": "conflict-detail",
					children: [
						/* @__PURE__ */ j("div", {
							className: "flex items-start justify-between gap-3 flex-wrap",
							children: [/* @__PURE__ */ j("div", { children: [
								/* @__PURE__ */ A("h3", {
									className: "m-0 text-base font-bold text-text-primary",
									children: P.summary
								}),
								/* @__PURE__ */ j("div", {
									className: "mt-1.5 flex gap-2 items-center flex-wrap",
									children: [
										/* @__PURE__ */ A(p, {
											tone: "info",
											size: "xs",
											children: M.get(P.sourceId) ?? P.sourceId
										}),
										P.documentTypeId && /* @__PURE__ */ A(p, {
											tone: "purple",
											size: "xs",
											children: P.documentTypeId
										}),
										/* @__PURE__ */ j("span", {
											className: "text-[11px] text-text-tertiary",
											children: ["Detected ", $(P.detectedAt)]
										})
									]
								}),
								/* @__PURE__ */ A("div", {
									className: "text-xs text-text-tertiary font-mono break-all mt-1.5",
									children: P.sourceRef
								})
							] }), /* @__PURE__ */ j("div", {
								className: "text-[11px] text-text-tertiary text-right",
								children: [/* @__PURE__ */ j("div", { children: ["Source edited: ", $(P.sourceUpdatedAt)] }), /* @__PURE__ */ j("div", { children: ["Platform edited: ", $(P.platformUpdatedAt)] })]
							})]
						}),
						/* @__PURE__ */ j("div", {
							className: "flex gap-2 p-2.5 bg-surface-inset border border-border rounded-lg items-center flex-wrap",
							children: [/* @__PURE__ */ A("span", {
								className: "text-xs font-semibold text-text-secondary mr-1",
								children: "Apply to all fields:"
							}), [
								"source",
								"merged",
								"platform"
							].map((e) => {
								let t = e !== "merged" || P.fields.some((e) => e.mergedValue !== void 0);
								return /* @__PURE__ */ A("button", {
									className: f("px-3 py-1 text-xs font-medium font-[inherit] border rounded-md cursor-pointer", _ === e ? "bg-primary text-white border-primary" : "bg-surface text-text-secondary border-border", !t && "opacity-40 cursor-not-allowed"),
									onClick: () => t && v(e),
									disabled: !t,
									"data-testid": `global-pick-${e}`,
									children: e === "source" ? "Source side" : e === "platform" ? "Platform side" : "Auto-merged"
								}, e);
							})]
						}),
						P.fields.map((e) => /* @__PURE__ */ A(Me, {
							field: e,
							globalPick: _,
							fieldChoice: x[e.field],
							onPick: (t) => S((n) => ({
								...n,
								[e.field]: t
							})),
							onClear: () => S((t) => {
								let n = { ...t };
								return delete n[e.field], n;
							})
						}, e.field)),
						/* @__PURE__ */ j("div", {
							className: "flex gap-2 justify-end border-t border-border pt-3.5 flex-wrap",
							children: [
								/* @__PURE__ */ A(b, {
									"aria-label": "Optional note (logged in audit trail)",
									className: "min-w-[240px] flex-1",
									placeholder: "Optional note (logged in audit trail)",
									value: C,
									onChange: (e) => T(e.target.value),
									"data-testid": "conflict-note"
								}),
								/* @__PURE__ */ A("button", {
									className: f("px-3.5 py-1.5 text-[13px] font-medium font-[inherit] rounded-md cursor-pointer bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)]", D && "opacity-50 cursor-not-allowed"),
									onClick: () => void I(),
									disabled: D,
									"data-testid": "conflict-discard",
									children: "Discard"
								}),
								/* @__PURE__ */ A("button", {
									className: f("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]", D && "opacity-50 cursor-not-allowed"),
									onClick: () => void F(),
									disabled: D,
									"data-testid": "conflict-resolve",
									children: D ? "Resolving…" : "Resolve"
								})
							]
						})
					]
				})]
			})
		]
	});
}
function Me({ field: e, globalPick: t, fieldChoice: n, onPick: r, onClear: i }) {
	let a = n ?? t, o = e.mergedValue !== void 0;
	return /* @__PURE__ */ j("div", {
		className: "border border-border rounded-lg overflow-hidden",
		"data-testid": `field-diff-${e.field}`,
		children: [
			/* @__PURE__ */ j("div", {
				className: "px-3 py-2 bg-surface-panel border-b border-border flex items-center justify-between gap-2 flex-wrap",
				children: [/* @__PURE__ */ A("span", {
					className: "font-mono text-xs text-text-primary font-semibold",
					children: e.field
				}), n && /* @__PURE__ */ A("button", {
					onClick: i,
					className: "text-[10px] px-2.5 py-0.5 rounded-full cursor-pointer border border-border bg-surface text-text-secondary font-[inherit] font-medium",
					"data-testid": `field-clear-${e.field}`,
					children: "Clear override"
				})]
			}),
			/* @__PURE__ */ j("div", {
				className: "grid grid-cols-3",
				children: [
					/* @__PURE__ */ A(Ne, {
						label: "Source side",
						value: e.sourceValue,
						selected: a === "source"
					}),
					/* @__PURE__ */ A(Ne, {
						label: o ? "Auto-merged" : "Auto-merged (none)",
						value: o ? e.mergedValue : "—",
						selected: o && a === "merged",
						dim: !o
					}),
					/* @__PURE__ */ A(Ne, {
						label: "Platform side",
						value: e.platformValue,
						selected: a === "platform",
						last: !0
					})
				]
			}),
			/* @__PURE__ */ j("div", {
				className: "flex gap-1.5 px-2.5 py-1.5 border-t border-border bg-surface-inset",
				children: [/* @__PURE__ */ A("span", {
					className: "text-[11px] text-text-tertiary mr-1",
					children: "Pick for this field:"
				}), [
					"source",
					"merged",
					"platform"
				].map((t) => {
					let n = t !== "merged" || o;
					return /* @__PURE__ */ A("button", {
						className: f("text-[11px] px-2.5 py-0.5 rounded-full cursor-pointer border font-[inherit] font-medium", a === t ? "bg-[var(--color-state-completed)] text-white border-[var(--color-state-completed)]" : "bg-surface text-text-secondary border-border", !n && "opacity-40 cursor-not-allowed"),
						onClick: () => n && r(t),
						disabled: !n,
						"data-testid": `field-pick-${e.field}-${t}`,
						children: t === "source" ? "Source" : t === "platform" ? "Platform" : "Merged"
					}, t);
				})]
			})
		]
	});
}
function Ne({ label: e, value: t, selected: n, last: r, dim: i }) {
	return /* @__PURE__ */ j("div", {
		className: f("p-3 text-xs text-text-secondary font-mono whitespace-pre-wrap break-words min-h-[60px] bg-surface", !r && "border-r border-border", n && "bg-success-bg border-[var(--color-state-completed)]", i && "opacity-55"),
		children: [/* @__PURE__ */ A("div", {
			className: "text-[10px] font-bold text-text-tertiary uppercase tracking-wide mb-1.5 font-sans",
			children: e
		}), /* @__PURE__ */ A("div", { children: Ae(t) })]
	});
}
//#endregion
//#region src/components/ingest/DeadLetterQueuePage.tsx
function Pe(e) {
	let t = Date.now() - e;
	return t < 0 ? "just now" : t < 6e4 ? `${Math.floor(t / 1e3)}s ago` : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : `${Math.floor(t / 864e5)}d ago`;
}
function Fe() {
	let { entries: e, loading: t, error: r, replay: i, drop: a } = n(), [o, s] = O(null), c = (e) => {
		s(null), e.catch((e) => {
			s(e instanceof Error ? e.message : String(e));
		});
	};
	return /* @__PURE__ */ j("div", {
		"data-testid": "ingest-dlq-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ A("div", {
				className: "flex items-baseline justify-between mb-4 gap-3 flex-wrap",
				children: /* @__PURE__ */ j("div", { children: [/* @__PURE__ */ A("div", {
					className: "text-[22px] font-bold text-text-primary",
					children: "Dead Letter Queue"
				}), /* @__PURE__ */ A("div", {
					className: "text-xs text-text-tertiary",
					children: "Items the engine couldn't process. Replay re-enqueues; drop purges."
				})] })
			}),
			r ? /* @__PURE__ */ A("div", {
				role: "alert",
				"data-testid": "ingest-dlq-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3",
				children: r
			}) : null,
			o ? /* @__PURE__ */ j("div", {
				"data-testid": "ingest-dlq-action-error",
				role: "alert",
				className: "px-4 py-3 bg-danger-bg border border-danger-border text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-3",
				children: [/* @__PURE__ */ j("span", {
					className: "text-[13px] font-medium",
					children: ["That entry was not updated: ", o]
				}), /* @__PURE__ */ A("button", {
					type: "button",
					onClick: () => s(null),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-danger-fg border border-danger-border rounded-md cursor-pointer font-[inherit]",
					children: "Dismiss"
				})]
			}) : null,
			t && e.length === 0 ? /* @__PURE__ */ j("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ A(y, { height: 96 }),
					/* @__PURE__ */ A(y, { height: 96 }),
					/* @__PURE__ */ A(y, { height: 96 })
				]
			}) : e.length === 0 && !r ? /* @__PURE__ */ A(h, {
				icon: "🧹",
				title: "DLQ is empty",
				body: "Failed items will land here. Replay re-enqueues into the source queue; drop purges without retry.",
				testId: "ingest-dlq-empty"
			}) : /* @__PURE__ */ A("div", {
				"data-testid": "ingest-dlq-list",
				className: "flex flex-col gap-3",
				children: e.map((e) => /* @__PURE__ */ A(Ie, {
					entry: e,
					onReplay: () => c(i(e.id)),
					onDrop: () => c(a(e.id))
				}, e.id))
			})
		]
	});
}
function Ie({ entry: e, onReplay: t, onDrop: n }) {
	return /* @__PURE__ */ j("div", {
		"data-testid": `dlq-row-${e.id}`,
		className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-2",
		children: [
			/* @__PURE__ */ j("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ A("span", {
					className: "font-mono text-[13px] text-text-primary",
					title: e.id,
					children: e.id
				}), /* @__PURE__ */ A("span", {
					className: "text-[11px] text-text-tertiary",
					children: Pe(e.failedAtMs)
				})]
			}),
			/* @__PURE__ */ j("div", {
				className: "text-xs text-text-secondary flex gap-4 flex-wrap",
				children: [/* @__PURE__ */ j("span", { children: ["Attempts: ", /* @__PURE__ */ A("strong", { children: e.totalAttempts })] }), e.envelope.body?.sourceId ? /* @__PURE__ */ j("span", { children: ["Source: ", e.envelope.body.sourceId.slice(0, 12)] }) : null]
			}),
			e.lastError ? /* @__PURE__ */ A("div", {
				className: "text-xs text-text-primary font-mono bg-surface-inset px-2 py-1.5 rounded-md whitespace-pre-wrap break-words max-h-20 overflow-auto",
				children: e.lastError
			}) : null,
			/* @__PURE__ */ j("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ A("button", {
					"data-testid": `dlq-replay-${e.id}`,
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
					onClick: t,
					children: "Replay"
				}), /* @__PURE__ */ A("button", {
					"data-testid": `dlq-drop-${e.id}`,
					className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0",
					onClick: n,
					children: "Drop"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/ingest/DocTypeProposalsPage.tsx
function Le() {
	let { proposals: e, loading: t, error: n, promote: r, reject: i } = u(), [a, o] = O(null), s = (e) => {
		o(null), e.catch((e) => {
			o(e instanceof Error ? e.message : String(e));
		});
	};
	return /* @__PURE__ */ j("div", {
		"data-testid": "doctype-proposals-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ j("div", {
				className: "mb-4",
				children: [/* @__PURE__ */ A("div", {
					className: "text-[22px] font-bold text-text-primary",
					children: "DocType proposals"
				}), /* @__PURE__ */ A("div", {
					className: "text-xs text-text-tertiary mt-1",
					children: "Auto-discovered candidate types from the LLM mapper. Promote to accept; reject to suppress similar future proposals."
				})]
			}),
			n ? /* @__PURE__ */ j("div", {
				role: "alert",
				"data-testid": "proposals-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3",
				children: ["Couldn't load DocType proposals: ", n]
			}) : null,
			a ? /* @__PURE__ */ j("div", {
				"data-testid": "proposals-action-error",
				role: "alert",
				className: "px-4 py-3 bg-danger-bg border border-danger-border text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-3",
				children: [/* @__PURE__ */ j("span", {
					className: "text-[13px] font-medium",
					children: ["That proposal was not updated: ", a]
				}), /* @__PURE__ */ A("button", {
					type: "button",
					onClick: () => o(null),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-danger-fg border border-danger-border rounded-md cursor-pointer font-[inherit]",
					children: "Dismiss"
				})]
			}) : null,
			t && e.length === 0 ? /* @__PURE__ */ j("div", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ A(y, { height: 120 }), /* @__PURE__ */ A(y, { height: 120 })]
			}) : e.length === 0 && !n ? /* @__PURE__ */ A(h, {
				icon: "🧬",
				title: "No proposals waiting",
				body: "When the LLM mapper sees N similar files of an unknown shape, the proposed DocType lands here.",
				testId: "proposals-empty"
			}) : /* @__PURE__ */ A("div", {
				"data-testid": "proposals-list",
				className: "flex flex-col gap-3",
				children: e.map((e) => /* @__PURE__ */ A(Re, {
					proposal: e,
					onPromote: () => s(r(e.proposalId)),
					onReject: () => s(i(e.proposalId))
				}, e.proposalId))
			})
		]
	});
}
function Re({ proposal: e, onPromote: t, onReject: n }) {
	return /* @__PURE__ */ j("div", {
		"data-testid": `proposal-row-${e.proposalId}`,
		className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-2.5",
		children: [
			/* @__PURE__ */ j("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ A("span", {
					className: "text-base font-bold text-text-primary",
					children: e.proposedName
				}), /* @__PURE__ */ j("span", {
					className: "text-[11px] text-text-tertiary",
					children: [
						e.sampleIngestIds.length,
						" sample",
						e.sampleIngestIds.length === 1 ? "" : "s"
					]
				})]
			}),
			/* @__PURE__ */ j("div", {
				className: "text-xs text-text-secondary flex gap-4 flex-wrap",
				children: [/* @__PURE__ */ j("span", { children: ["Source: ", e.sourceId.slice(0, 12)] }), /* @__PURE__ */ j("span", { children: ["Signature: ", e.signature.slice(0, 24)] })]
			}),
			e.proposedDescription ? /* @__PURE__ */ A("div", {
				className: "text-[13px] text-text-primary leading-relaxed",
				children: e.proposedDescription
			}) : null,
			e.proposedFields.length > 0 ? /* @__PURE__ */ A("div", {
				className: "flex flex-wrap gap-1.5",
				children: e.proposedFields.map((e) => /* @__PURE__ */ j("span", {
					className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset text-text-secondary font-mono",
					children: [e.name, e.required ? "*" : ""]
				}, e.name))
			}) : null,
			e.reasoning ? /* @__PURE__ */ j("div", {
				className: "text-xs text-text-tertiary italic",
				title: e.reasoning,
				children: [e.reasoning.slice(0, 200), e.reasoning.length > 200 ? "…" : ""]
			}) : null,
			/* @__PURE__ */ j("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ A("button", {
					"data-testid": `proposal-promote-${e.proposalId}`,
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
					onClick: t,
					children: "Promote"
				}), /* @__PURE__ */ A("button", {
					"data-testid": `proposal-reject-${e.proposalId}`,
					className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit] shrink-0",
					onClick: n,
					children: "Reject"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/ingest/MappingReviewPage.tsx
function ze() {
	let { idToken: t } = e(), { items: n, threshold: i, loading: a, error: o, remap: s, skip: c } = r(), { types: l } = d({ idToken: t }), [u, f] = O({}), [p, m] = O(null), g = (e) => {
		m(null), e.catch((e) => {
			m(e instanceof Error ? e.message : String(e));
		});
	};
	return /* @__PURE__ */ j("div", {
		"data-testid": "mapping-review-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ A("div", {
				className: "flex items-baseline justify-between mb-4",
				children: /* @__PURE__ */ j("div", { children: [/* @__PURE__ */ A("div", {
					className: "text-[22px] font-bold text-text-primary",
					children: "Mapping needs review"
				}), /* @__PURE__ */ j("div", {
					className: "text-xs text-text-tertiary",
					children: [
						"Showing items with confidence < ",
						Math.round(i * 100),
						"%."
					]
				})] })
			}),
			o ? /* @__PURE__ */ j("div", {
				role: "alert",
				"data-testid": "mapping-review-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3",
				children: ["Couldn't load review queue: ", o]
			}) : null,
			p ? /* @__PURE__ */ j("div", {
				"data-testid": "mapping-review-action-error",
				role: "alert",
				className: "px-4 py-3 bg-danger-bg border border-danger-border text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-3",
				children: [/* @__PURE__ */ j("span", {
					className: "text-[13px] font-medium",
					children: ["That item was not updated: ", p]
				}), /* @__PURE__ */ A("button", {
					onClick: () => m(null),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-danger-fg border border-danger-border rounded-md cursor-pointer font-[inherit]",
					children: "Dismiss"
				})]
			}) : null,
			a && n.length === 0 ? /* @__PURE__ */ j("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ A(y, { height: 96 }),
					/* @__PURE__ */ A(y, { height: 96 }),
					/* @__PURE__ */ A(y, { height: 96 })
				]
			}) : n.length === 0 && !o ? /* @__PURE__ */ A(h, {
				icon: "✨",
				title: "No items need review",
				body: "When the LLM mapper produces a low-confidence match, it'll show up here for your call.",
				testId: "mapping-review-empty"
			}) : /* @__PURE__ */ A("div", {
				"data-testid": "mapping-review-list",
				className: "flex flex-col gap-3",
				children: n.map((e) => /* @__PURE__ */ A(Be, {
					item: e,
					docTypes: l,
					remapTypeId: u[e.itemId] ?? "",
					onPickRemapType: (t) => f((n) => ({
						...n,
						[e.itemId]: t
					})),
					onAccept: () => {
						e.documentTypeId && g(s(e.itemId, e.documentTypeId));
					},
					onRemap: () => {
						let t = u[e.itemId];
						t && g(s(e.itemId, t));
					},
					onDiscard: () => g(c(e.itemId))
				}, e.itemId))
			})
		]
	});
}
function Be({ item: e, docTypes: t, remapTypeId: n, onPickRemapType: r, onAccept: i, onRemap: a, onDiscard: o }) {
	let s = t.find((t) => t.id === e.documentTypeId)?.name ?? e.documentTypeId ?? "(unknown)", c = typeof e.mappingConfidence == "number" ? `${Math.round(e.mappingConfidence * 100)}%` : "—";
	return /* @__PURE__ */ j("div", {
		"data-testid": `review-row-${e.itemId}`,
		className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-2",
		children: [
			/* @__PURE__ */ j("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ A("span", {
					className: "font-[ui-monospace,monospace] text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
					title: e.sourcePath,
					children: e.sourcePath
				}), /* @__PURE__ */ j("span", {
					className: "text-[11px] font-semibold px-2 py-0.5 rounded-full bg-warning-bg text-warning-fg",
					children: ["conf ", c]
				})]
			}),
			/* @__PURE__ */ j("div", {
				className: "text-xs text-text-secondary flex gap-3 flex-wrap",
				children: [/* @__PURE__ */ j("span", { children: ["Suggested type: ", /* @__PURE__ */ A("strong", { children: s })] }), /* @__PURE__ */ j("span", { children: ["Source: ", e.sourceId.slice(0, 8)] })]
			}),
			e.error ? /* @__PURE__ */ A("div", {
				className: "text-xs text-text-secondary italic",
				children: e.error.slice(0, 200)
			}) : null,
			/* @__PURE__ */ j("div", {
				className: "flex gap-2 items-center flex-wrap",
				children: [
					/* @__PURE__ */ A("button", {
						"data-testid": `review-accept-${e.itemId}`,
						className: f("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]", !e.documentTypeId && "opacity-50 cursor-not-allowed"),
						onClick: i,
						disabled: !e.documentTypeId,
						title: e.documentTypeId ? "Commit the suggested type" : "No suggestion to accept",
						children: "Accept suggestion"
					}),
					/* @__PURE__ */ A(S, {
						"aria-label": `Re-map ${e.sourcePath ?? e.itemId} to document type`,
						"data-testid": `review-remap-picker-${e.itemId}`,
						className: "w-auto min-w-[200px]",
						value: n,
						onChange: (e) => r(e.target.value),
						options: [{
							value: "",
							label: "Re-map to…"
						}, ...t.map((e) => ({
							value: e.id,
							label: e.name
						}))]
					}),
					/* @__PURE__ */ A("button", {
						"data-testid": `review-remap-${e.itemId}`,
						className: f("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]", !n && "opacity-50 cursor-not-allowed"),
						onClick: a,
						disabled: !n,
						children: "Re-map"
					}),
					/* @__PURE__ */ A("button", {
						"data-testid": `review-discard-${e.itemId}`,
						className: "px-3 py-1.5 text-[13px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
						onClick: o,
						children: "Discard"
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/ingest/SyncMonitorPage.tsx
function Ve(e) {
	return new Date(e).toLocaleTimeString("en-US", {
		hour12: !1,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	});
}
function He(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? `${n}s` : `${Math.floor(n / 60)}m ${n % 60}s`;
}
function Ue(e) {
	return e.startsWith("sync.") ? "bg-info-bg text-info-fg" : e === "item.mapped" ? "bg-accent-bg text-accent-fg" : e === "item.materialized" ? "bg-success-bg text-success-fg" : e === "item.failed" ? "bg-danger-bg text-danger-fg" : "bg-surface-hover text-neutral";
}
function We(e) {
	let t = e.sourceName ?? e.sourceId ?? "";
	switch (e.type) {
		case "sync.started": return `Sync started for ${t}`;
		case "sync.progress": return `${t}: fetched ${e.filesFetched ?? 0}/${e.fileCount ?? "?"} files`;
		case "sync.completed": return `Sync completed for ${t}`;
		case "sync.failed": return `Sync failed for ${t}${e.error ? `: ${e.error}` : ""}`;
		case "item.mapped": return `Item mapped: ${e.sourcePath ?? e.itemId ?? "unknown"}`;
		case "item.materialized": return `Item materialized: ${e.sourcePath ?? e.itemId ?? "unknown"}`;
		case "item.failed": return `Item failed: ${e.sourcePath ?? e.itemId ?? "unknown"}`;
		default: return e.type;
	}
}
var Ge = [
	{
		value: "all",
		label: "All",
		match: (e) => !0
	},
	{
		value: "sync",
		label: "Sync",
		match: (e) => e.startsWith("sync.")
	},
	{
		value: "item",
		label: "Item",
		match: (e) => e.startsWith("item.")
	},
	{
		value: "source",
		label: "Source",
		match: (e) => e.startsWith("source.")
	},
	{
		value: "errors",
		label: "Errors",
		match: (e) => e === "item.failed" || e === "sync.failed"
	}
];
function Ke() {
	let e = M(), { events: t, activeSyncs: n, clearEvents: r } = o(), i = D(null), [a, s] = O(!1), [c, l] = O(""), [u, d] = O("all"), p = D(null);
	w(() => {
		a && p.current === null ? p.current = [...t] : a || (p.current = null);
	}, [a, t]);
	let m = E(() => {
		let e = /* @__PURE__ */ new Set();
		for (let n of t) {
			let t = n.sourceId;
			typeof t == "string" && t && e.add(t);
		}
		for (let t of n.keys()) e.add(t);
		return Array.from(e).sort();
	}, [t, n]), h = E(() => {
		let e = a && p.current ? p.current : t, n = Ge.find((e) => e.value === u) ?? Ge[0];
		return e.filter((e) => !(!n.match(e.type) || c && e.sourceId !== c));
	}, [
		t,
		a,
		u,
		c
	]);
	w(() => {
		a || i.current && (i.current.scrollTop = i.current.scrollHeight);
	}, [h.length, a]);
	let g = E(() => {
		let e = t.filter((e) => e.type === "item.failed" || e.type === "sync.failed").length;
		return {
			totalEvents: t.length,
			activeSyncsCount: n.size,
			errorsCount: e
		};
	}, [t, n]), _ = E(() => Array.from(n.values()), [n]);
	return /* @__PURE__ */ j("div", {
		"data-testid": "sync-monitor-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ j("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ j("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ A("h2", {
						className: "m-0 text-[22px] font-bold text-text-primary",
						children: "Sync Monitor"
					}), /* @__PURE__ */ j("span", {
						className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-semibold bg-success-bg text-success-fg rounded-full border border-success-border",
						children: [/* @__PURE__ */ A("span", { className: "w-[7px] h-[7px] rounded-full bg-success animate-[sync-pulse_1.5s_ease-in-out_infinite]" }), "Live"]
					})]
				}), /* @__PURE__ */ A("button", {
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
					onClick: () => e("/ingest/sources"),
					children: "Sources"
				})]
			}),
			/* @__PURE__ */ j("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3 mb-5",
				children: [
					/* @__PURE__ */ j("div", {
						className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-1",
						children: [/* @__PURE__ */ A("span", {
							className: "text-[11px] font-medium text-text-tertiary uppercase tracking-tight",
							children: "Events Received"
						}), /* @__PURE__ */ A("span", {
							className: "text-[22px] font-bold text-text-primary leading-none",
							children: g.totalEvents
						})]
					}),
					/* @__PURE__ */ j("div", {
						className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-1",
						children: [/* @__PURE__ */ A("span", {
							className: "text-[11px] font-medium text-text-tertiary uppercase tracking-tight",
							children: "Active Syncs"
						}), /* @__PURE__ */ A("span", {
							className: f("text-[22px] font-bold leading-none", g.activeSyncsCount > 0 ? "text-[var(--color-state-running)]" : "text-text-primary"),
							children: g.activeSyncsCount
						})]
					}),
					/* @__PURE__ */ j("div", {
						className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-1",
						children: [/* @__PURE__ */ A("span", {
							className: "text-[11px] font-medium text-text-tertiary uppercase tracking-tight",
							children: "Errors"
						}), /* @__PURE__ */ A("span", {
							className: f("text-[22px] font-bold leading-none", g.errorsCount > 0 ? "text-[var(--color-state-failed)]" : "text-text-primary"),
							children: g.errorsCount
						})]
					})
				]
			}),
			/* @__PURE__ */ j("div", {
				className: "bg-surface border border-border rounded-[10px] p-4 mb-4",
				children: [/* @__PURE__ */ A("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Active Syncs"
				}), _.length === 0 ? /* @__PURE__ */ j("div", {
					className: "py-8 text-center",
					children: [/* @__PURE__ */ A("div", {
						className: "text-sm font-medium text-text-secondary mb-1",
						children: "No active syncs"
					}), /* @__PURE__ */ A("div", {
						className: "text-xs text-text-tertiary",
						children: "Trigger a sync from the Sources page to see progress here."
					})]
				}) : _.map((e) => {
					let t = e.fileCount > 0 ? Math.round(e.filesFetched / e.fileCount * 100) : 0;
					return /* @__PURE__ */ j("div", {
						className: "p-3.5 bg-surface-inset border border-border rounded-lg mb-2.5",
						children: [
							/* @__PURE__ */ j("div", {
								className: "flex items-center justify-between mb-2",
								children: [/* @__PURE__ */ A("span", {
									className: "text-sm font-semibold text-text-primary",
									children: e.sourceName
								}), /* @__PURE__ */ A("span", {
									className: "text-[11px] text-text-tertiary font-mono",
									children: He(e.startedAt)
								})]
							}),
							/* @__PURE__ */ A("div", {
								className: "h-2 rounded bg-surface-emphasis overflow-hidden mb-2",
								children: /* @__PURE__ */ A("div", {
									className: "h-full rounded bg-[var(--color-state-running)] transition-[width] duration-300 ease-out",
									style: { width: `${t}%` }
								})
							}),
							/* @__PURE__ */ j("div", {
								className: "flex gap-4 text-xs text-text-secondary",
								children: [
									/* @__PURE__ */ j("span", {
										className: "flex items-center gap-1",
										children: [
											"Files: ",
											e.filesFetched,
											"/",
											e.fileCount,
											" (",
											t,
											"%)"
										]
									}),
									/* @__PURE__ */ j("span", {
										className: "flex items-center gap-1",
										children: ["Mapped: ", e.itemsMapped]
									}),
									/* @__PURE__ */ j("span", {
										className: "flex items-center gap-1",
										children: ["Materialized: ", e.itemsMaterialized]
									})
								]
							})
						]
					}, e.sourceId);
				})]
			}),
			/* @__PURE__ */ j("div", {
				className: "bg-surface border border-border rounded-[10px] p-4 mb-4",
				children: [/* @__PURE__ */ j("div", {
					className: "flex items-center justify-between mb-3 gap-2 flex-wrap",
					children: [/* @__PURE__ */ A("span", {
						className: "text-sm font-semibold text-text-primary",
						children: "Event Log"
					}), /* @__PURE__ */ j("div", {
						className: "flex items-center gap-2 flex-wrap",
						children: [
							/* @__PURE__ */ A(S, {
								"data-testid": "event-source-filter",
								"aria-label": "Filter by source",
								className: "w-auto min-w-[140px]",
								value: c,
								onChange: (e) => l(e.target.value),
								options: [{
									value: "",
									label: "All sources"
								}, ...m.map((e) => ({
									value: e,
									label: e.slice(0, 12)
								}))]
							}),
							/* @__PURE__ */ A(S, {
								"data-testid": "event-type-filter",
								"aria-label": "Filter by event type",
								className: "w-auto min-w-[110px]",
								value: u,
								onChange: (e) => d(e.target.value),
								options: Ge.map((e) => ({
									value: e.value,
									label: e.label
								}))
							}),
							/* @__PURE__ */ A("button", {
								"data-testid": "event-pause-toggle",
								className: "px-2.5 py-0.5 text-[11px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
								onClick: () => s((e) => !e),
								title: a ? "Resume the live stream" : "Pause the stream so the log doesn't scroll",
								children: a ? "Resume" : "Pause"
							}),
							t.length > 0 && /* @__PURE__ */ A("button", {
								className: "px-2.5 py-0.5 text-[11px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
								onClick: r,
								children: "Clear"
							})
						]
					})]
				}), h.length === 0 ? /* @__PURE__ */ j("div", {
					className: "py-8 text-center",
					children: [/* @__PURE__ */ A("div", {
						className: "text-sm font-medium text-text-secondary mb-1",
						children: t.length === 0 ? "No events yet" : "No events match the current filter"
					}), /* @__PURE__ */ A("div", {
						className: "text-xs text-text-tertiary",
						children: t.length === 0 ? "Events will appear here in real-time as syncs run." : "Try a different source or event-type filter, or clear the filter."
					})]
				}) : /* @__PURE__ */ A("div", {
					ref: i,
					"data-testid": "event-log",
					className: "max-h-80 overflow-y-auto flex flex-col gap-0.5",
					children: h.map((e, t) => /* @__PURE__ */ j("div", {
						className: "flex items-center gap-2 px-2 py-1 rounded text-xs",
						children: [
							/* @__PURE__ */ A("span", {
								className: "text-[11px] font-mono text-text-tertiary shrink-0 min-w-[60px]",
								children: Ve(e.timestamp)
							}),
							/* @__PURE__ */ A("span", {
								className: f("px-[7px] py-0.5 text-[10px] font-semibold rounded shrink-0", Ue(e.type)),
								children: e.type
							}),
							/* @__PURE__ */ A("span", {
								className: "text-xs text-text-secondary flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap",
								title: We(e),
								children: We(e)
							})
						]
					}, `${e.timestamp}-${t}`))
				})]
			})
		]
	});
}
//#endregion
export { je as ConflictsPage, Fe as DeadLetterQueuePage, Le as DocTypeProposalsPage, Oe as IngestAuditPage, H as IngestDashboard, be as IngestItemDrawer, Te as IngestItemsPage, ze as MappingReviewPage, q as MappingRuleEditor, pe as SourceDetailPage, ae as SourceSloPanel, K as SourcesPage, Ke as SyncMonitorPage };
