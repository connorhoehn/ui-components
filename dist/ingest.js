import { n as e } from "./IdentityContext-m2wQF4sJ.js";
import { a as t, c as n, i as r, l as i, n as a, o, r as s, s as c, t as l, u } from "./useSyncConflicts-DNj4F6oF.js";
import { n as d } from "./useDocumentTypes-C-AMWgYq.js";
import { t as f } from "./cn-DhjIN-s0.js";
import { t as p } from "./Chip-2lIuHwy5.js";
import { t as m } from "./EmptyState-CUHf5NYN.js";
import { t as h } from "./SkeletonCard-CGe8XFPB.js";
import { t as g } from "./Input-DcK2h-jK.js";
import { t as _ } from "./Select-Z0TLUVeL.js";
import { useCallback as v, useEffect as y, useMemo as b, useRef as x, useState as S } from "react";
import { Fragment as C, jsx as w, jsxs as T } from "react/jsx-runtime";
import { useNavigate as E, useParams as D } from "react-router";
import { Line as O, LineChart as k, ResponsiveContainer as A, Tooltip as j, YAxis as M } from "recharts";
//#region src/components/ingest/IngestDashboard.tsx
function N(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : `${Math.floor(t / 864e5)}d ago`;
}
function P(e) {
	return Date.now() - new Date(e).getTime() < 864e5;
}
function F(e) {
	return Date.now() - new Date(e).getTime() < 36e5;
}
var I = 50;
function L() {
	let e = E(), { sources: n, loading: r, error: i, refresh: a } = t(), { items: o, loading: s, error: l, refresh: u } = c(), d = r || s, g = i || l, _ = b(() => {
		let e = n.filter((e) => e.status === "active").length, t = n.filter((e) => e.status === "paused").length, r = n.filter((e) => e.status === "error").length, i = o.filter((e) => e.status !== "done" && e.status !== "failed").length, a = o.filter((e) => e.status === "done" && P(e.updatedAt)).length, s = o.filter((e) => e.status === "failed").length;
		return {
			total: n.length,
			active: e,
			paused: t,
			errored: r,
			queued: i,
			recentDone: a,
			failed: s
		};
	}, [n, o]), v = b(() => o.filter((e) => e.status === "done").sort((e, t) => t.updatedAt.localeCompare(e.updatedAt)).slice(0, 5), [o]), y = b(() => {
		let e = [];
		for (let t of n) t.status === "error" && e.push({
			id: `source-error-${t.sourceId}`,
			level: "critical",
			message: `Source "${t.name}" is in error state — check its config or last sync log.`
		});
		let t = o.filter((e) => F(e.updatedAt));
		if (t.length >= 5) {
			let n = t.filter((e) => e.status === "failed").length, r = n / t.length;
			r > .1 && e.push({
				id: "failure-rate-1h",
				level: "warning",
				message: `Last-hour failure rate is ${(r * 100).toFixed(0)}% (${n} of ${t.length} items failed).`
			});
		}
		return _.queued > I && e.push({
			id: "queue-depth",
			level: "warning",
			message: `Queue depth is ${_.queued} items — sources may be ingesting faster than the engine can drain.`
		}), e;
	}, [
		n,
		o,
		_.queued
	]);
	return d && n.length === 0 && o.length === 0 ? /* @__PURE__ */ T("div", {
		"data-testid": "ingest-dashboard",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ w("div", {
				className: "flex items-center justify-between mb-4",
				children: /* @__PURE__ */ w("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Ingest"
				})
			}),
			/* @__PURE__ */ T("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 mb-5",
				children: [
					/* @__PURE__ */ w(h, { height: 90 }),
					/* @__PURE__ */ w(h, { height: 90 }),
					/* @__PURE__ */ w(h, { height: 90 }),
					/* @__PURE__ */ w(h, { height: 90 })
				]
			}),
			/* @__PURE__ */ w(h, { height: 200 })
		]
	}) : /* @__PURE__ */ T("div", {
		"data-testid": "ingest-dashboard",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ T("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ w("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Ingest"
				}), /* @__PURE__ */ T("div", {
					className: "flex gap-2.5 items-center",
					children: [null, /* @__PURE__ */ w("button", {
						className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
						onClick: () => e("/ingest/sources"),
						"data-testid": "add-source-btn",
						children: "Add Source"
					})]
				})]
			}),
			g && /* @__PURE__ */ T("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4",
				role: "alert",
				children: [/* @__PURE__ */ w("span", {
					className: "text-[13px] font-medium",
					children: "Failed to load ingest data."
				}), /* @__PURE__ */ w("button", {
					onClick: () => {
						a(), u();
					},
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
					children: "Retry"
				})]
			}),
			y.length > 0 && /* @__PURE__ */ w("div", {
				"data-testid": "alerts-strip",
				className: "flex flex-col gap-1.5 mb-3",
				children: y.map((e) => /* @__PURE__ */ T("div", {
					"data-testid": `alert-${e.id}`,
					className: f("px-3 py-2 rounded-md text-[13px] border", e.level === "critical" ? "bg-danger-bg border-[var(--color-state-failed)] text-[var(--color-state-failed)]" : "bg-warning-bg border-warning text-warning-fg"),
					children: [
						/* @__PURE__ */ w("strong", { children: e.level === "critical" ? "⛔" : "⚠" }),
						" ",
						e.message
					]
				}, e.id))
			}),
			/* @__PURE__ */ T("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 mb-5",
				children: [
					/* @__PURE__ */ T("div", {
						className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5",
						children: [
							/* @__PURE__ */ w("span", {
								className: "text-xs font-medium text-text-tertiary uppercase tracking-wide",
								children: "Sources"
							}),
							/* @__PURE__ */ w("span", {
								className: "text-[28px] font-bold text-text-primary leading-none",
								children: _.total
							}),
							/* @__PURE__ */ T("span", {
								className: "text-xs text-text-tertiary",
								children: [
									_.active,
									" active, ",
									_.paused,
									" paused",
									_.errored > 0 ? `, ${_.errored} error` : ""
								]
							})
						]
					}),
					/* @__PURE__ */ T("div", {
						className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5",
						children: [
							/* @__PURE__ */ w("span", {
								className: "text-xs font-medium text-text-tertiary uppercase tracking-wide",
								children: "In Queue"
							}),
							/* @__PURE__ */ w("span", {
								className: f("text-[28px] font-bold leading-none", _.queued > 0 ? "text-[var(--color-state-awaiting)]" : "text-text-primary"),
								children: _.queued
							}),
							/* @__PURE__ */ w("span", {
								className: "text-xs text-text-tertiary",
								children: "items processing"
							})
						]
					}),
					/* @__PURE__ */ T("div", {
						className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5",
						children: [
							/* @__PURE__ */ w("span", {
								className: "text-xs font-medium text-text-tertiary uppercase tracking-wide",
								children: "Completed (24h)"
							}),
							/* @__PURE__ */ w("span", {
								className: f("text-[28px] font-bold leading-none", _.recentDone > 0 ? "text-[var(--color-state-completed)]" : "text-text-primary"),
								children: _.recentDone
							}),
							/* @__PURE__ */ w("span", {
								className: "text-xs text-text-tertiary",
								children: "items ingested"
							})
						]
					}),
					/* @__PURE__ */ T("div", {
						className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5",
						children: [
							/* @__PURE__ */ w("span", {
								className: "text-xs font-medium text-text-tertiary uppercase tracking-wide",
								children: "Errors"
							}),
							/* @__PURE__ */ w("span", {
								className: f("text-[28px] font-bold leading-none", _.failed > 0 ? "text-[var(--color-state-failed)]" : "text-text-primary"),
								children: _.failed
							}),
							/* @__PURE__ */ w("span", {
								className: "text-xs text-text-tertiary",
								children: "items failed"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ T("div", {
				className: "bg-surface border border-border rounded-[10px] p-4 mb-4",
				children: [/* @__PURE__ */ w("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Recent Activity"
				}), v.length === 0 ? /* @__PURE__ */ w(m, {
					icon: "📥",
					title: "No recent activity",
					body: "Completed ingest items will appear here."
				}) : /* @__PURE__ */ w("div", { children: v.map((e) => /* @__PURE__ */ T("div", {
					className: "flex items-center justify-between gap-3 py-2 border-b border-border",
					children: [
						/* @__PURE__ */ w("span", {
							className: "text-[13px] text-text-secondary font-mono overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0",
							title: e.sourcePath,
							children: e.sourcePath
						}),
						/* @__PURE__ */ w(p, {
							tone: "success",
							size: "xs",
							children: "done"
						}),
						/* @__PURE__ */ w("span", {
							className: "text-[11px] text-text-tertiary whitespace-nowrap shrink-0",
							children: N(e.updatedAt)
						})
					]
				}, e.itemId)) })]
			})
		]
	});
}
//#endregion
//#region src/components/ingest/SourcesPage.tsx
function R(e) {
	switch (e) {
		case "active": return "success";
		case "paused": return "warning";
		case "error": return "danger";
		default: return "neutral";
	}
}
function z(e) {
	switch (e) {
		case "local": return "Local";
		case "s3": return "S3";
		case "google-drive": return "Google Drive";
		case "webhook": return "Webhook";
		default: return e;
	}
}
function ee(e) {
	switch (e) {
		case "s3": return "info";
		case "google-drive": return "purple";
		case "webhook": return "caution";
		case "local": return "neutral";
		default: return "neutral";
	}
}
function B(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function V() {
	let e = E(), { sources: n, loading: r, error: i, refresh: a, deleteSource: o, triggerSync: s } = t(), [c, l] = S(() => /* @__PURE__ */ new Set()), u = v(async (e) => {
		l((t) => new Set(t).add(e)), await s(e), l((t) => {
			let n = new Set(t);
			return n.delete(e), n;
		}), a();
	}, [s, a]), d = v(async (e) => {
		confirm(`Delete source "${e.name}"? This cannot be undone.`) && await o(e.sourceId);
	}, [o]);
	return r && n.length === 0 ? /* @__PURE__ */ T("div", {
		"data-testid": "sources-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ w("div", {
				className: "flex items-center justify-between mb-4",
				children: /* @__PURE__ */ w("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Sources"
				})
			}),
			/* @__PURE__ */ w(h, { height: 48 }),
			/* @__PURE__ */ w(h, { height: 48 }),
			/* @__PURE__ */ w(h, { height: 48 })
		]
	}) : /* @__PURE__ */ T("div", {
		"data-testid": "sources-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ T("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ T("div", { children: [/* @__PURE__ */ w("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Sources"
				}), /* @__PURE__ */ T("span", {
					className: "text-[13px] text-text-tertiary",
					children: [
						n.length,
						" source",
						n.length === 1 ? "" : "s"
					]
				})] }), /* @__PURE__ */ w("button", {
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
					onClick: () => e("/ingest/sources"),
					"data-testid": "add-source-btn",
					children: "Add Source"
				})]
			}),
			i && /* @__PURE__ */ T("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4",
				role: "alert",
				children: [/* @__PURE__ */ w("span", {
					className: "text-[13px] font-medium",
					children: "Failed to load sources."
				}), /* @__PURE__ */ w("button", {
					onClick: () => void a(),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
					children: "Retry"
				})]
			}),
			!i && n.length === 0 ? /* @__PURE__ */ w(m, {
				icon: "📂",
				title: "No sources configured",
				body: "Add a data source to start ingesting files into the system.",
				actionLabel: "Add Source",
				onAction: () => e("/ingest/sources")
			}) : /* @__PURE__ */ w("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ T("table", {
					className: "w-full border-collapse text-[13px]",
					children: [/* @__PURE__ */ w("thead", { children: /* @__PURE__ */ T("tr", {
						className: "border-b border-border",
						children: [
							/* @__PURE__ */ w("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Name"
							}),
							/* @__PURE__ */ w("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Type"
							}),
							/* @__PURE__ */ w("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Status"
							}),
							/* @__PURE__ */ w("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Last Sync"
							}),
							/* @__PURE__ */ w("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Files Synced"
							}),
							/* @__PURE__ */ w("th", {
								className: "p-2 text-right text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ w("tbody", { children: n.map((t) => /* @__PURE__ */ T("tr", {
						className: "border-b border-border hover:bg-surface-hover",
						children: [
							/* @__PURE__ */ w("td", {
								className: "p-2 font-medium text-text-primary",
								children: /* @__PURE__ */ w("button", {
									type: "button",
									"data-testid": `source-name-link-${t.sourceId}`,
									onClick: () => e(`/ingest/sources/${t.sourceId}`),
									className: "bg-transparent border-none p-0 font-[inherit] text-primary cursor-pointer underline text-left",
									children: t.name
								})
							}),
							/* @__PURE__ */ w("td", {
								className: "p-2",
								children: /* @__PURE__ */ w(p, {
									tone: ee(t.type),
									size: "xs",
									children: z(t.type)
								})
							}),
							/* @__PURE__ */ w("td", {
								className: "p-2",
								children: /* @__PURE__ */ w(p, {
									tone: R(t.status),
									size: "sm",
									children: t.status
								})
							}),
							/* @__PURE__ */ w("td", {
								className: "p-2 text-text-secondary",
								children: t.lastSyncAt ? B(t.lastSyncAt) : "Never"
							}),
							/* @__PURE__ */ w("td", {
								"data-testid": `source-files-synced-${t.sourceId}`,
								className: "p-2 font-mono text-xs text-text-secondary",
								children: t.lastSyncStats ? /* @__PURE__ */ T("span", { children: [t.lastSyncStats.filesFound, t.lastSyncStats.filesNew > 0 ? /* @__PURE__ */ T("span", {
									className: "text-text-tertiary",
									children: [
										" · ",
										t.lastSyncStats.filesNew,
										" new"
									]
								}) : null] }) : "—"
							}),
							/* @__PURE__ */ w("td", {
								className: "p-2 text-right",
								children: /* @__PURE__ */ T("div", {
									className: "flex gap-1.5 justify-end",
									children: [/* @__PURE__ */ w("button", {
										className: f("px-2.5 py-1 text-[11px] font-medium rounded-[5px] cursor-pointer font-[inherit]", c.has(t.sourceId) || t.status === "paused" ? "border border-border bg-surface-inset text-text-tertiary opacity-70 cursor-not-allowed" : "border border-border bg-surface text-text-secondary"),
										disabled: c.has(t.sourceId) || t.status === "paused",
										onClick: () => void u(t.sourceId),
										"data-testid": `sync-${t.sourceId}`,
										children: c.has(t.sourceId) ? "Syncing..." : "Sync Now"
									}), /* @__PURE__ */ w("button", {
										className: "px-2.5 py-1 text-[11px] font-medium border border-[var(--color-state-failed)] rounded-[5px] bg-danger-bg cursor-pointer font-[inherit] text-[var(--color-state-failed)]",
										onClick: () => void d(t),
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
var H = "", te = [
	"extension",
	"path",
	"mimeType",
	"tag",
	"name"
], U = [
	"eq",
	"contains",
	"regex",
	"startsWith"
];
function W({ rules: t, onChange: n }) {
	let { idToken: r } = e(), [i, a] = S(null), [o, s] = S(""), [c, l] = S(null), [u, d] = S(!1), [p, m] = S(null), h = v((e) => {
		a(e), m({ ...t[e] });
	}, [t]), y = v(() => {
		a(null), m(null);
	}, []), b = v(() => {
		if (i === null || !p) return;
		let e = [...t];
		e[i] = p, n(e), a(null), m(null);
	}, [
		i,
		p,
		t,
		n
	]), x = v(() => {
		let e = {
			pattern: "",
			documentTypeId: "",
			priority: t.length > 0 ? Math.max(...t.map((e) => e.priority)) + 1 : 1
		}, r = [...t, e];
		n(r), a(r.length - 1), m(e);
	}, [t, n]), C = v((e) => {
		n(t.filter((t, n) => n !== e)), i === e ? (a(null), m(null)) : i !== null && i > e && a(i - 1);
	}, [
		t,
		n,
		i
	]), E = v((e) => {
		if (e === 0) return;
		let r = [...t];
		[r[e - 1], r[e]] = [r[e], r[e - 1]];
		let o = r[e - 1].priority;
		r[e - 1] = {
			...r[e - 1],
			priority: r[e].priority
		}, r[e] = {
			...r[e],
			priority: o
		}, n(r), i === e ? a(e - 1) : i === e - 1 && a(e);
	}, [
		t,
		n,
		i
	]), D = v((e) => {
		if (e >= t.length - 1) return;
		let r = [...t];
		[r[e], r[e + 1]] = [r[e + 1], r[e]];
		let o = r[e].priority;
		r[e] = {
			...r[e],
			priority: r[e + 1].priority
		}, r[e + 1] = {
			...r[e + 1],
			priority: o
		}, n(r), i === e ? a(e + 1) : i === e + 1 && a(e);
	}, [
		t,
		n,
		i
	]), O = v(async () => {
		if (o.trim()) {
			d(!0), l(null);
			try {
				let e = { "Content-Type": "application/json" };
				r && (e.Authorization = `Bearer ${r}`);
				let n = await fetch(`${H}/api/ingest/mapping/preview`, {
					method: "POST",
					headers: e,
					body: JSON.stringify({
						path: o,
						rules: t
					})
				});
				if (!n.ok) throw Error(`HTTP ${n.status}`);
				let i = await n.json();
				l(JSON.stringify(i, null, 2));
			} catch (e) {
				l(`Error: ${e instanceof Error ? e.message : String(e)}`);
			} finally {
				d(!1);
			}
		}
	}, [
		o,
		t,
		r
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
	}, A = (e, t, n) => `${e}:${t}:${n}`;
	return /* @__PURE__ */ T("div", {
		className: "flex flex-col gap-2.5",
		"data-testid": "mapping-rule-editor",
		children: [
			t.length === 0 ? /* @__PURE__ */ w("div", {
				className: "p-4 text-center text-text-tertiary text-[13px]",
				children: "No mapping rules configured. Add one to get started."
			}) : /* @__PURE__ */ w("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ T("table", {
					className: "w-full border-collapse text-xs",
					children: [/* @__PURE__ */ w("thead", { children: /* @__PURE__ */ T("tr", { children: [
						/* @__PURE__ */ w("th", {
							className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Priority"
						}),
						/* @__PURE__ */ w("th", {
							className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Condition"
						}),
						/* @__PURE__ */ w("th", {
							className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Target Type ID"
						}),
						/* @__PURE__ */ w("th", {
							className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Pipeline"
						}),
						/* @__PURE__ */ w("th", {
							className: "px-2.5 py-2 font-semibold text-right border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Actions"
						})
					] }) }), /* @__PURE__ */ w("tbody", { children: t.map((e, n) => {
						let r = i === n && p !== null, a = k(e.pattern);
						if (r) {
							let e = k(p.pattern);
							return /* @__PURE__ */ T("tr", {
								className: "border-b border-border",
								children: [
									/* @__PURE__ */ w("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
										children: /* @__PURE__ */ w(g, {
											size: "sm",
											className: "w-[50px]",
											type: "number",
											value: p.priority,
											onChange: (e) => m({
												...p,
												priority: Number(e.target.value)
											})
										})
									}),
									/* @__PURE__ */ w("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
										children: /* @__PURE__ */ T("div", {
											className: "flex gap-1 items-center flex-wrap",
											children: [
												/* @__PURE__ */ w(_, {
													size: "sm",
													className: "w-auto min-w-[90px]",
													value: e.field,
													onChange: (t) => m({
														...p,
														pattern: A(t.target.value, e.op, e.value)
													}),
													options: te.map((e) => ({
														value: e,
														label: e
													}))
												}),
												/* @__PURE__ */ w(_, {
													size: "sm",
													className: "w-auto min-w-[90px]",
													value: e.op,
													onChange: (t) => m({
														...p,
														pattern: A(e.field, t.target.value, e.value)
													}),
													options: U.map((e) => ({
														value: e,
														label: e
													}))
												}),
												/* @__PURE__ */ w(g, {
													size: "sm",
													className: "min-w-[100px]",
													value: e.value,
													placeholder: "value",
													onChange: (t) => m({
														...p,
														pattern: A(e.field, e.op, t.target.value)
													})
												})
											]
										})
									}),
									/* @__PURE__ */ w("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
										children: /* @__PURE__ */ w(g, {
											size: "sm",
											className: "min-w-[80px]",
											value: p.documentTypeId,
											placeholder: "document type id",
											onChange: (e) => m({
												...p,
												documentTypeId: e.target.value
											})
										})
									}),
									/* @__PURE__ */ w("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
										children: /* @__PURE__ */ w(g, {
											size: "sm",
											className: "min-w-[80px]",
											value: p.pipelineId ?? "",
											placeholder: "(optional)",
											onChange: (e) => m({
												...p,
												pipelineId: e.target.value || void 0
											})
										})
									}),
									/* @__PURE__ */ w("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle text-right",
										children: /* @__PURE__ */ T("div", {
											className: "flex gap-1 justify-end",
											children: [/* @__PURE__ */ w("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: b,
												children: "Save"
											}), /* @__PURE__ */ w("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: y,
												children: "Cancel"
											})]
										})
									})
								]
							}, n);
						}
						return /* @__PURE__ */ T("tr", {
							className: "border-b border-border",
							children: [
								/* @__PURE__ */ w("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle font-mono font-semibold",
									children: e.priority
								}),
								/* @__PURE__ */ w("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
									children: /* @__PURE__ */ T("span", {
										className: "font-mono text-[11px]",
										children: [
											a.field,
											" ",
											a.op,
											" \"",
											a.value,
											"\""
										]
									})
								}),
								/* @__PURE__ */ w("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle font-mono",
									children: e.documentTypeId || "—"
								}),
								/* @__PURE__ */ w("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-tertiary text-xs align-middle font-mono",
									children: e.pipelineId ?? "—"
								}),
								/* @__PURE__ */ w("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle text-right",
									children: /* @__PURE__ */ T("div", {
										className: "flex gap-1 justify-end",
										children: [
											/* @__PURE__ */ w("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: () => E(n),
												disabled: n === 0,
												title: "Move up",
												children: "↑"
											}),
											/* @__PURE__ */ w("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: () => D(n),
												disabled: n === t.length - 1,
												title: "Move down",
												children: "↓"
											}),
											/* @__PURE__ */ w("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: () => h(n),
												children: "Edit"
											}),
											/* @__PURE__ */ w("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-[var(--color-state-failed)] rounded bg-danger-bg cursor-pointer font-[inherit] text-[var(--color-state-failed)]",
												onClick: () => C(n),
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
			/* @__PURE__ */ w("div", {
				className: "flex gap-2.5 items-center",
				children: /* @__PURE__ */ w("button", {
					className: "px-3.5 py-1.5 text-xs font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary self-start",
					onClick: x,
					"data-testid": "add-rule-btn",
					children: "+ Add Rule"
				})
			}),
			/* @__PURE__ */ T("div", {
				className: "flex gap-2 items-center mt-1",
				children: [/* @__PURE__ */ w(g, {
					className: "flex-1",
					value: o,
					onChange: (e) => s(e.target.value),
					placeholder: "Enter a file path to preview mapping..."
				}), /* @__PURE__ */ w("button", {
					className: f("px-3.5 py-1.5 text-xs font-medium border border-primary rounded-md bg-info-bg cursor-pointer font-[inherit] text-primary self-start", (u || !o.trim()) && "opacity-50 cursor-not-allowed"),
					onClick: () => void O(),
					disabled: u || !o.trim(),
					children: u ? "Checking..." : "Preview"
				})]
			}),
			c && /* @__PURE__ */ w("div", {
				className: "p-3 bg-surface-inset border border-border rounded-md text-xs text-text-secondary font-mono whitespace-pre-wrap break-words",
				children: c
			})
		]
	});
}
//#endregion
//#region src/components/ingest/SourceSloPanel.tsx
var G = [
	"15m",
	"1h",
	"6h",
	"24h"
];
function K({ points: e, color: t, testId: n }) {
	let r = e.map((e) => ({
		at: e.at,
		value: e.value ?? null
	}));
	return /* @__PURE__ */ w("div", {
		"data-testid": n,
		className: "h-[60px]",
		children: /* @__PURE__ */ w(A, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ T(k, {
				data: r,
				margin: {
					top: 4,
					right: 4,
					left: 4,
					bottom: 4
				},
				children: [
					/* @__PURE__ */ w(M, { hide: !0 }),
					/* @__PURE__ */ w(j, {
						cursor: !1,
						contentStyle: {
							fontSize: 11,
							padding: "4px 6px"
						},
						formatter: ((e) => [e, ""])
					}),
					/* @__PURE__ */ w(O, {
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
function q(e) {
	for (let t = e.length - 1; t >= 0; t--) if (e[t].value !== null) return e[t].value;
	return null;
}
function ne({ sourceId: e }) {
	let [t, n] = S("1h"), { metrics: r, error: i } = a(e, t);
	return /* @__PURE__ */ T("div", {
		"data-testid": "source-slo-panel",
		className: "px-4 py-3 bg-surface border border-border rounded-[10px] mb-4",
		children: [
			/* @__PURE__ */ T("div", {
				className: "flex items-center justify-between mb-2 gap-2",
				children: [/* @__PURE__ */ T("span", {
					className: "text-sm font-bold text-text-primary",
					children: [
						"Health (last ",
						t,
						")"
					]
				}), /* @__PURE__ */ w(_, {
					"data-testid": "slo-window-picker",
					"aria-label": "Window",
					className: "w-auto min-w-[100px]",
					value: t,
					onChange: (e) => n(e.target.value),
					options: G.map((e) => ({
						value: e,
						label: `Last ${e}`
					}))
				})]
			}),
			i ? /* @__PURE__ */ T("div", {
				"data-testid": "slo-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg text-xs",
				children: ["Couldn't load source metrics: ", i]
			}) : null,
			r ? /* @__PURE__ */ T("div", {
				className: "grid grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ T("div", {
						className: "px-2.5 py-2 bg-surface-inset rounded-lg",
						children: [
							/* @__PURE__ */ w("div", {
								className: "text-[11px] text-text-tertiary mb-1",
								children: "p95 latency"
							}),
							/* @__PURE__ */ w("div", {
								"data-testid": "slo-latency-value",
								className: "text-base font-bold text-text-primary",
								children: (() => {
									let e = q(r.latencyP95);
									return e === null ? "—" : `${Math.round(e)} ms`;
								})()
							}),
							/* @__PURE__ */ w(K, {
								points: r.latencyP95,
								color: "var(--color-state-completed)",
								testId: "slo-latency-chart"
							})
						]
					}),
					/* @__PURE__ */ T("div", {
						className: "px-2.5 py-2 bg-surface-inset rounded-lg",
						children: [
							/* @__PURE__ */ w("div", {
								className: "text-[11px] text-text-tertiary mb-1",
								children: "error rate"
							}),
							/* @__PURE__ */ w("div", {
								"data-testid": "slo-error-rate-value",
								className: "text-base font-bold text-text-primary",
								children: (() => {
									let e = q(r.errorRate);
									return e === null ? "—" : `${e.toFixed(1)}%`;
								})()
							}),
							/* @__PURE__ */ w(K, {
								points: r.errorRate,
								color: "var(--color-state-failed)",
								testId: "slo-error-rate-chart"
							})
						]
					}),
					/* @__PURE__ */ T("div", {
						className: "px-2.5 py-2 bg-surface-inset rounded-lg",
						children: [
							/* @__PURE__ */ w("div", {
								className: "text-[11px] text-text-tertiary mb-1",
								children: "queue depth"
							}),
							/* @__PURE__ */ w("div", {
								"data-testid": "slo-queue-depth-value",
								className: "text-base font-bold text-text-primary",
								children: q(r.queueDepth) ?? 0
							}),
							/* @__PURE__ */ w(K, {
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
var re = [
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
], J = "";
function ie(e) {
	switch (e) {
		case "active": return "success";
		case "paused": return "warning";
		case "error": return "danger";
		default: return "neutral";
	}
}
function ae(e) {
	switch (e) {
		case "local": return "Local";
		case "s3": return "S3";
		case "google-drive": return "Google Drive";
		case "webhook": return "Webhook";
		default: return e;
	}
}
function oe(e) {
	switch (e) {
		case "s3": return "info";
		case "google-drive": return "purple";
		case "webhook": return "caution";
		case "local": return "neutral";
		default: return "neutral";
	}
}
function se(e) {
	return e < 1e3 ? `${e}ms` : e < 6e4 ? `${(e / 1e3).toFixed(1)}s` : `${(e / 6e4).toFixed(1)}m`;
}
function ce(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function le(e) {
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
function ue() {
	let { id: t } = D(), n = E(), { idToken: r } = e(), { pipelines: i } = s(), { types: a } = d({ idToken: r }), [o, c] = S(null), [l, u] = S(!0), [m, b] = S(null), [x, O] = S(!1), [k, A] = S(!1), [j, M] = S(!1), [N, P] = S({}), [F, I] = S([]), [L, R] = S(""), [z, ee] = S(""), [B, V] = S({}), [H, te] = S(!1), U = v(() => {
		let e = { "Content-Type": "application/json" };
		return r && (e.Authorization = `Bearer ${r}`), e;
	}, [r]), G = v(async (e) => {
		if (t) {
			u(!0), b(null);
			try {
				let n = await fetch(`${J}/api/ingest/sources/${t}`, {
					headers: U(),
					signal: e
				});
				if (!n.ok) throw Error(`HTTP ${n.status}`);
				let r = await n.json();
				if (e?.aborted) return;
				let i = {
					...r,
					mappingRules: le(r.mappingRules ?? [])
				};
				c(i);
			} catch (t) {
				if (e?.aborted) return;
				b(t instanceof Error ? t.message : String(t));
			} finally {
				e?.aborted || u(!1);
			}
		}
	}, [t, U]);
	y(() => {
		let e = new AbortController();
		return G(e.signal), () => e.abort();
	}, [G]);
	let K = v(() => {
		o && (P({ ...o.config }), I([...o.mappingRules]), R(o.syncSchedule ?? ""), ee(o.defaultPipelineId ?? ""), V({ ...o.pipelineByDocType ?? {} }), O(!0));
	}, [o]), q = v(() => {
		O(!1);
	}, []), ue = v(async () => {
		if (!(!o || !t)) {
			M(!0);
			try {
				let e = {
					config: N,
					mappingRules: F,
					syncSchedule: L.trim() || null,
					defaultPipelineId: z.trim() || null,
					pipelineByDocType: B
				}, n = await fetch(`${J}/api/ingest/sources/${t}`, {
					method: "PUT",
					headers: U(),
					body: JSON.stringify(e)
				});
				if (!n.ok) throw Error(`HTTP ${n.status}`);
				let r = await n.json();
				c(r), O(!1);
			} catch (e) {
				b(e instanceof Error ? e.message : String(e));
			} finally {
				M(!1);
			}
		}
	}, [
		o,
		t,
		N,
		F,
		L,
		z,
		B,
		U
	]), Y = x && o !== null && (JSON.stringify(N) !== JSON.stringify(o.config) || JSON.stringify(F) !== JSON.stringify(o.mappingRules) || L !== (o.syncSchedule ?? "") || z !== (o.defaultPipelineId ?? "") || JSON.stringify(B) !== JSON.stringify(o.pipelineByDocType ?? {}));
	y(() => {
		if (!Y) return;
		let e = (e) => {
			e.preventDefault(), e.returnValue = "";
		};
		return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
	}, [Y]);
	let X = v(async () => {
		if (t) {
			A(!0);
			try {
				let e = await fetch(`${J}/api/ingest/sources/${t}/sync`, {
					method: "POST",
					headers: U()
				});
				if (!e.ok) throw Error(`HTTP ${e.status}`);
				await G();
			} catch (e) {
				b(e instanceof Error ? e.message : String(e));
			} finally {
				A(!1);
			}
		}
	}, [
		t,
		U,
		G
	]), de = v(async () => {
		if (!o || !t) return;
		let e = o.status === "paused" ? "active" : "paused";
		try {
			let n = await fetch(`${J}/api/ingest/sources/${t}`, {
				method: "PATCH",
				headers: U(),
				body: JSON.stringify({ status: e })
			});
			if (!n.ok) throw Error(`HTTP ${n.status}`);
			let r = await n.json();
			c(r);
		} catch (e) {
			b(e instanceof Error ? e.message : String(e));
		}
	}, [
		o,
		t,
		U
	]);
	return l && !o ? /* @__PURE__ */ T("div", {
		"data-testid": "source-detail-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ w("div", {
				className: "flex items-center justify-between mb-4 flex-wrap gap-3",
				children: /* @__PURE__ */ w("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Source Detail"
				})
			}),
			/* @__PURE__ */ w(h, { height: 120 }),
			/* @__PURE__ */ w(h, { height: 200 }),
			/* @__PURE__ */ w(h, { height: 100 })
		]
	}) : m && !o ? /* @__PURE__ */ T("div", {
		"data-testid": "source-detail-page",
		className: "p-6 flex flex-col gap-3",
		children: [/* @__PURE__ */ w("div", {
			className: "flex items-center justify-between mb-4 flex-wrap gap-3",
			children: /* @__PURE__ */ w("button", {
				className: "text-[13px] text-primary cursor-pointer bg-transparent border-none font-[inherit] p-0 underline",
				onClick: () => n("/ingest/sources"),
				children: "Back to Sources"
			})
		}), /* @__PURE__ */ T("div", {
			className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3",
			role: "alert",
			children: [/* @__PURE__ */ T("span", {
				className: "text-[13px] font-medium",
				children: ["Failed to load source: ", m]
			}), /* @__PURE__ */ w("button", {
				onClick: () => void G(),
				className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
				children: "Retry"
			})]
		})]
	}) : o ? /* @__PURE__ */ T("div", {
		"data-testid": "source-detail-page",
		className: "p-6 flex flex-col gap-4",
		children: [
			/* @__PURE__ */ w("div", {
				className: "flex items-center justify-between mb-4 flex-wrap gap-3",
				children: /* @__PURE__ */ w("div", {
					className: "flex items-center gap-2.5",
					children: /* @__PURE__ */ w("button", {
						className: "text-[13px] text-primary cursor-pointer bg-transparent border-none font-[inherit] p-0 underline",
						onClick: () => n("/ingest/sources"),
						children: "Back to Sources"
					})
				})
			}),
			/* @__PURE__ */ T("div", {
				className: "flex items-center justify-between mb-4 flex-wrap gap-3",
				children: [/* @__PURE__ */ T("div", {
					className: "flex items-center gap-2.5",
					children: [
						/* @__PURE__ */ w("h2", {
							className: "m-0 text-[22px] font-bold text-text-primary",
							children: o.name
						}),
						/* @__PURE__ */ w(p, {
							tone: oe(o.type),
							size: "sm",
							children: ae(o.type)
						}),
						/* @__PURE__ */ w(p, {
							tone: ie(o.status),
							size: "sm",
							children: o.status
						})
					]
				}), /* @__PURE__ */ w("div", {
					className: "flex gap-2.5 items-center",
					children: x ? /* @__PURE__ */ T(C, { children: [/* @__PURE__ */ w("button", {
						className: "px-3.5 py-1.5 text-[13px] font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary",
						onClick: q,
						children: "Cancel"
					}), /* @__PURE__ */ w("button", {
						className: f("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]", j && "opacity-50 cursor-not-allowed"),
						onClick: () => void ue(),
						disabled: j,
						children: j ? "Saving..." : "Save Changes"
					})] }) : /* @__PURE__ */ w("button", {
						className: "px-3.5 py-1.5 text-[13px] font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary",
						onClick: K,
						children: "Edit"
					})
				})]
			}),
			m && /* @__PURE__ */ T("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3",
				role: "alert",
				children: [/* @__PURE__ */ w("span", {
					className: "text-[13px] font-medium",
					children: m
				}), /* @__PURE__ */ w("button", {
					onClick: () => b(null),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
					children: "Dismiss"
				})]
			}),
			/* @__PURE__ */ T("div", {
				className: "bg-surface border border-border rounded-[10px] p-4",
				children: [/* @__PURE__ */ w("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Configuration"
				}), x ? /* @__PURE__ */ w("div", { children: Object.entries(N).map(([e, t]) => /* @__PURE__ */ T("div", {
					className: "flex items-center gap-3 mb-2.5",
					children: [/* @__PURE__ */ w("span", {
						className: "text-xs font-semibold text-text-tertiary min-w-[140px]",
						children: e
					}), /* @__PURE__ */ w(g, {
						className: "flex-1",
						value: typeof t == "string" ? t : JSON.stringify(t),
						onChange: (t) => P({
							...N,
							[e]: t.target.value
						})
					})]
				}, e)) }) : /* @__PURE__ */ T("div", { children: [Object.entries(o.config).map(([e, t]) => /* @__PURE__ */ T("div", {
					className: "flex items-center gap-3 py-1.5 border-b border-border",
					children: [/* @__PURE__ */ w("span", {
						className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight",
						children: e
					}), /* @__PURE__ */ w("span", {
						className: "text-[13px] text-text-secondary font-mono break-all",
						children: typeof t == "string" ? t : JSON.stringify(t)
					})]
				}, e)), Object.keys(o.config).length === 0 && /* @__PURE__ */ w("span", {
					className: "text-[13px] text-text-tertiary",
					children: "No configuration fields."
				})] })]
			}),
			o ? /* @__PURE__ */ w(ne, { sourceId: o.sourceId }) : null,
			/* @__PURE__ */ T("div", {
				className: "bg-surface border border-border rounded-[10px] p-4",
				children: [/* @__PURE__ */ w("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Mapping Rules"
				}), x ? /* @__PURE__ */ w(W, {
					rules: F,
					onChange: I
				}) : /* @__PURE__ */ w(W, {
					rules: o.mappingRules,
					onChange: () => {}
				})]
			}),
			/* @__PURE__ */ T("div", {
				className: "bg-surface border border-border rounded-[10px] p-4",
				children: [/* @__PURE__ */ T("div", {
					className: "flex items-center justify-between mb-3",
					children: [/* @__PURE__ */ w("div", {
						className: "text-sm font-semibold text-text-primary",
						children: "Sync History"
					}), /* @__PURE__ */ w("button", {
						className: f("px-3.5 py-1.5 text-[13px] font-medium rounded-md cursor-pointer font-[inherit]", k || o.status === "paused" ? "border border-border bg-surface-inset text-text-tertiary opacity-70 cursor-not-allowed" : "border border-primary bg-info-bg text-primary"),
						disabled: k || o.status === "paused",
						onClick: () => void X(),
						"data-testid": "sync-now-btn",
						children: k ? "Syncing..." : "Sync Now"
					})]
				}), o.lastSyncAt ? /* @__PURE__ */ T(C, { children: [/* @__PURE__ */ T("div", {
					className: "text-xs text-text-tertiary mb-2.5",
					children: [
						"Last synced: ",
						ce(o.lastSyncAt),
						" (",
						new Date(o.lastSyncAt).toLocaleString(),
						")"
					]
				}), o.lastSyncStats && /* @__PURE__ */ T("div", {
					className: "grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2.5",
					children: [
						/* @__PURE__ */ T("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ w("div", {
								className: "text-xl font-bold text-text-primary leading-none",
								children: o.lastSyncStats.filesDiscovered
							}), /* @__PURE__ */ w("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Found"
							})]
						}),
						/* @__PURE__ */ T("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ w("div", {
								className: "text-xl font-bold text-[var(--color-state-completed)] leading-none",
								children: o.lastSyncStats.filesIngested
							}), /* @__PURE__ */ w("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Ingested"
							})]
						}),
						/* @__PURE__ */ T("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ w("div", {
								className: "text-xl font-bold text-text-primary leading-none",
								children: o.lastSyncStats.filesSkipped
							}), /* @__PURE__ */ w("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Skipped"
							})]
						}),
						/* @__PURE__ */ T("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ w("div", {
								className: f("text-xl font-bold leading-none", o.lastSyncStats.filesFailed > 0 ? "text-[var(--color-state-failed)]" : "text-text-primary"),
								children: o.lastSyncStats.filesFailed
							}), /* @__PURE__ */ w("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Errors"
							})]
						}),
						/* @__PURE__ */ T("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ w("div", {
								className: "text-xl font-bold text-text-primary leading-none",
								children: se(o.lastSyncStats.durationMs)
							}), /* @__PURE__ */ w("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Duration"
							})]
						})
					]
				})] }) : /* @__PURE__ */ w("span", {
					className: "text-[13px] text-text-tertiary",
					children: "No sync history yet."
				})]
			}),
			/* @__PURE__ */ T("div", {
				className: "bg-surface border border-border rounded-[10px] p-4",
				children: [/* @__PURE__ */ w("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Settings"
				}), x ? /* @__PURE__ */ T("div", { children: [
					/* @__PURE__ */ T("div", {
						className: "flex items-center gap-3 mb-2.5",
						children: [/* @__PURE__ */ w("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[140px]",
							children: "Sync Schedule"
						}), /* @__PURE__ */ T("div", {
							className: "flex gap-2 flex-1 flex-wrap",
							children: [/* @__PURE__ */ w(_, {
								className: "w-auto min-w-[160px]",
								value: re.some((e) => e.cron === L) ? L : "__custom__",
								onChange: (e) => {
									e.target.value !== "__custom__" && R(e.target.value);
								},
								"data-testid": "schedule-preset",
								options: [...re.map((e) => ({
									value: e.cron,
									label: e.label
								})), {
									value: "__custom__",
									label: "Custom…"
								}]
							}), /* @__PURE__ */ w(g, {
								mono: !0,
								className: "flex-1",
								value: L,
								onChange: (e) => R(e.target.value),
								placeholder: "Cron (e.g. 0 */6 * * *) — empty = manual",
								"data-testid": "schedule-cron"
							})]
						})]
					}),
					/* @__PURE__ */ T("div", {
						className: "flex items-center gap-3 mb-2.5",
						children: [/* @__PURE__ */ w("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[140px]",
							children: "Default Pipeline"
						}), /* @__PURE__ */ w(_, {
							className: "flex-1",
							value: z,
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
								...z && !i.some((e) => e.id === z) ? [{
									value: z,
									label: `${z} (unknown)`
								}] : []
							]
						})]
					}),
					/* @__PURE__ */ T("div", {
						className: "flex items-center gap-3 mb-2.5",
						children: [/* @__PURE__ */ w("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[140px]",
							children: "Pipeline overrides"
						}), /* @__PURE__ */ T("div", {
							className: "flex-1 flex flex-col gap-2",
							children: [/* @__PURE__ */ T("button", {
								type: "button",
								"data-testid": "overrides-toggle",
								onClick: () => te(!H),
								className: "bg-transparent border-none text-left text-text-secondary p-0 cursor-pointer text-[13px]",
								children: [
									H ? "▾" : "▸",
									" Per-matched-DocType pipeline override (",
									Object.keys(B).length,
									")"
								]
							}), H ? /* @__PURE__ */ T("div", {
								"data-testid": "overrides-section",
								className: "flex flex-col gap-1.5",
								children: [Object.keys(B).length === 0 ? /* @__PURE__ */ w("div", {
									className: "text-xs text-text-tertiary",
									children: "No overrides — every matched type uses the default pipeline."
								}) : Object.entries(B).map(([e, t]) => /* @__PURE__ */ T("div", {
									className: "flex gap-2 items-center",
									children: [
										/* @__PURE__ */ w("span", {
											className: "flex-[0_0_160px] text-[13px]",
											children: a.find((t) => t.id === e)?.name ?? e
										}),
										/* @__PURE__ */ w(_, {
											"data-testid": `overrides-pipeline-${e}`,
											className: "flex-1",
											value: t,
											onChange: (t) => V({
												...B,
												[e]: t.target.value
											}),
											options: i.map((e) => ({
												value: e.id,
												label: e.name
											}))
										}),
										/* @__PURE__ */ w("button", {
											type: "button",
											"data-testid": `overrides-remove-${e}`,
											onClick: () => {
												let t = { ...B };
												delete t[e], V(t);
											},
											className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none cursor-pointer",
											children: "Remove"
										})
									]
								}, e)), /* @__PURE__ */ w(_, {
									"data-testid": "overrides-add-type",
									className: "w-auto self-start",
									value: "",
									onChange: (e) => {
										let t = e.target.value;
										t && V({
											...B,
											[t]: i[0]?.id ?? ""
										});
									},
									options: [{
										value: "",
										label: "+ Add override for type…"
									}, ...a.filter((e) => B[e.id] === void 0).map((e) => ({
										value: e.id,
										label: e.name
									}))]
								})]
							}) : null]
						})]
					})
				] }) : /* @__PURE__ */ T("div", { children: [
					/* @__PURE__ */ T("div", {
						className: "flex items-center gap-3 py-1.5 border-b border-border",
						children: [/* @__PURE__ */ w("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight",
							children: "Sync Schedule"
						}), /* @__PURE__ */ w("span", {
							className: "text-[13px] text-text-secondary font-mono break-all",
							children: o.syncSchedule ?? "Manual (no schedule)"
						})]
					}),
					/* @__PURE__ */ T("div", {
						className: "flex items-center gap-3 py-1.5 border-b border-border",
						children: [/* @__PURE__ */ w("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight",
							children: "Default Pipeline"
						}), /* @__PURE__ */ w("span", {
							className: "text-[13px] text-text-secondary font-mono break-all",
							children: o.defaultPipelineId ? i.find((e) => e.id === o.defaultPipelineId)?.name ?? o.defaultPipelineId : "—"
						})]
					}),
					/* @__PURE__ */ T("div", {
						className: "flex items-center gap-3 py-1.5",
						children: [/* @__PURE__ */ w("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight",
							children: "Status"
						}), /* @__PURE__ */ T("span", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ w(p, {
								tone: ie(o.status),
								size: "sm",
								children: o.status
							}), /* @__PURE__ */ w("button", {
								className: f("px-3.5 py-1.5 text-xs font-medium rounded-md cursor-pointer font-[inherit] border-none text-white", o.status === "paused" ? "bg-state-completed" : "bg-state-awaiting"),
								onClick: () => void de(),
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
var Y = "", X = [
	"queued",
	"mapping",
	"materializing",
	"triggering",
	"done"
];
function de(e) {
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
function fe(e) {
	switch (e) {
		case "rule": return "neutral";
		case "llm-match": return "info";
		case "llm-generate": return "purple";
		default: return "neutral";
	}
}
function pe(e) {
	switch (e) {
		case "rule": return "Matched a configured rule";
		case "llm-match": return "LLM matched to existing DocType";
		case "llm-generate": return "LLM proposed a new DocType";
		default: return e;
	}
}
function me(e, t) {
	if (t === "failed") return e === "queued";
	let n = X;
	return n.indexOf(e) <= n.indexOf(t);
}
function Z(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : `${Math.floor(t / 864e5)}d ago`;
}
function he({ item: t, sourceName: n, onClose: r, onRetry: i, onSkip: a }) {
	let { idToken: s } = e(), [c, l] = S(null), [u, d] = S(null), { events: m } = o();
	y(() => {
		if (!t) return;
		let e = (e) => {
			e.key === "Escape" && r();
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [t, r]);
	let h = b(() => {
		if (!t) return /* @__PURE__ */ new Map();
		let e = /* @__PURE__ */ new Map();
		for (let n of m) n.ingestId === t.itemId && (n.type === "item.status" && typeof n.status == "string" && typeof n.timestamp == "string" && e.set(n.status, n.timestamp), n.type === "item.materialized" && typeof n.timestamp == "string" && e.set("done", n.timestamp), n.type === "item.failed" && typeof n.timestamp == "string" && e.set("failed", n.timestamp));
		return e;
	}, [m, t]);
	if (!t) return null;
	let g = t.status === "failed", _ = t.status === "done" || t.status === "failed", v = typeof t.mappingConfidence == "number" ? t.mappingConfidence : null, x = async () => {
		l("retry");
		try {
			await i(t.itemId);
		} finally {
			l(null), r();
		}
	}, E = async () => {
		l("skip");
		try {
			await a(t.itemId);
		} finally {
			l(null), r();
		}
	}, D = async () => {
		l("remap"), d(null);
		try {
			let e = { "Content-Type": "application/json" };
			s && (e.Authorization = `Bearer ${s}`);
			let n = await fetch(`${Y}/api/ingest/items/${t.itemId}/remap`, {
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
	return /* @__PURE__ */ w("div", {
		className: "fixed inset-0 bg-black/35 z-[9999] flex justify-end",
		onClick: r,
		"data-testid": "ingest-item-drawer-scrim",
		children: /* @__PURE__ */ T("div", {
			className: "w-[min(560px,100vw)] h-full bg-surface shadow-[-12px_0_32px_rgba(0,0,0,0.12)] overflow-y-auto font-[inherit] flex flex-col",
			onClick: (e) => e.stopPropagation(),
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Ingest item details",
			"data-testid": "ingest-item-drawer",
			children: [
				/* @__PURE__ */ T("div", {
					className: "px-5 py-4 border-b border-border flex items-center justify-between sticky top-0 bg-surface z-[1]",
					children: [/* @__PURE__ */ w("h3", {
						className: "text-base font-bold text-text-primary m-0",
						children: "Ingest Item"
					}), /* @__PURE__ */ w("button", {
						className: "bg-transparent border-none text-[22px] leading-none cursor-pointer text-text-tertiary p-1 font-[inherit]",
						onClick: r,
						"aria-label": "Close",
						"data-testid": "ingest-item-drawer-close",
						children: "×"
					})]
				}),
				/* @__PURE__ */ T("div", {
					className: "p-5 flex flex-col gap-4.5 flex-1",
					children: [
						/* @__PURE__ */ T("div", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ w("div", {
									className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
									children: "Source path"
								}),
								/* @__PURE__ */ w("div", {
									className: "font-mono text-xs text-text-primary bg-surface-inset border border-border rounded-md px-2.5 py-2 break-all",
									children: t.sourcePath
								}),
								/* @__PURE__ */ T("div", {
									className: "flex gap-2 items-center mt-1",
									children: [
										/* @__PURE__ */ w(p, {
											tone: de(t.status),
											size: "sm",
											children: t.status
										}),
										n && /* @__PURE__ */ T("span", {
											className: "text-xs text-text-tertiary",
											children: ["from ", /* @__PURE__ */ w("strong", {
												className: "text-text-secondary",
												children: n
											})]
										}),
										/* @__PURE__ */ T("span", {
											className: "text-xs text-text-tertiary ml-auto",
											children: ["Updated ", Z(t.updatedAt)]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ T("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ w("div", {
								className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
								children: "Status timeline"
							}), /* @__PURE__ */ T("div", {
								className: "flex flex-col relative",
								children: [X.map((e, n) => {
									let r = me(e, t.status), i = e === t.status, a = g && n === 0, o = {
										...r ? {
											background: a ? "var(--color-state-failed)" : "var(--color-state-completed)",
											borderColor: a ? "var(--color-state-failed)" : "var(--color-state-completed)"
										} : {},
										...i && !_ ? {
											background: "var(--color-state-running)",
											borderColor: "var(--color-state-running)"
										} : {}
									};
									return /* @__PURE__ */ T("div", {
										className: "flex items-start gap-3 relative py-1.5",
										children: [
											n < X.length - 1 && /* @__PURE__ */ w("span", {
												className: "absolute left-[5px] top-[18px] bottom-[-6px] w-0.5 bg-border",
												"aria-hidden": "true"
											}),
											/* @__PURE__ */ w("span", {
												className: "w-3 h-3 rounded-full shrink-0 mt-1 border-2 border-border bg-surface",
												style: o,
												"aria-hidden": "true"
											}),
											/* @__PURE__ */ T("div", { children: [/* @__PURE__ */ w("div", {
												className: "text-[13px] font-medium text-text-primary",
												children: e
											}), (() => {
												let n = h.get(e);
												return n ? /* @__PURE__ */ w("div", {
													"data-testid": `timeline-meta-${e}`,
													className: "text-[11px] text-text-tertiary mt-0.5",
													children: Z(n)
												}) : i ? /* @__PURE__ */ w("div", {
													"data-testid": `timeline-meta-${e}`,
													className: "text-[11px] text-text-tertiary mt-0.5",
													children: _ ? Z(t.updatedAt) : "in progress"
												}) : null;
											})()] })
										]
									}, e);
								}), g && /* @__PURE__ */ T("div", {
									className: "flex items-start gap-3 relative py-1.5",
									children: [/* @__PURE__ */ w("span", { className: "w-3 h-3 rounded-full shrink-0 mt-1 border-2 bg-state-failed border-state-failed" }), /* @__PURE__ */ T("div", { children: [/* @__PURE__ */ w("div", {
										className: "text-[13px] font-medium text-[var(--color-state-failed)]",
										children: "failed"
									}), /* @__PURE__ */ w("div", {
										"data-testid": "timeline-meta-failed",
										className: "text-[11px] text-text-tertiary mt-0.5",
										children: Z(h.get("failed") ?? t.updatedAt)
									})] })]
								})]
							})]
						}),
						/* @__PURE__ */ T("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ w("div", {
								className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
								children: "Mapping decision"
							}), t.mappingMethod ? /* @__PURE__ */ T(C, { children: [/* @__PURE__ */ T("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ w(p, {
									tone: fe(t.mappingMethod),
									size: "sm",
									children: t.mappingMethod
								}), /* @__PURE__ */ w("span", {
									className: "text-xs text-text-secondary",
									children: pe(t.mappingMethod)
								})]
							}), v !== null && /* @__PURE__ */ T("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ w("div", {
									className: "flex-1 h-2 bg-surface-inset rounded overflow-hidden border border-border",
									children: /* @__PURE__ */ w("div", {
										className: "h-full transition-[width] duration-200 ease-out",
										style: {
											width: `${Math.round(v * 100)}%`,
											background: v >= .7 ? "var(--color-state-completed)" : v >= .4 ? "var(--color-state-awaiting)" : "var(--color-state-failed)"
										}
									})
								}), /* @__PURE__ */ T("span", {
									className: "font-mono text-xs text-text-secondary min-w-[48px] text-right",
									children: [(v * 100).toFixed(0), "%"]
								})]
							})] }) : /* @__PURE__ */ T("span", {
								className: "text-xs text-text-tertiary",
								children: [
									"No mapping decision yet — item is still in ",
									t.status,
									"."
								]
							})]
						}),
						/* @__PURE__ */ T("div", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ w("div", {
									className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
									children: "Identity"
								}),
								/* @__PURE__ */ T("div", {
									className: "flex items-center gap-3 py-1.5 border-b border-border",
									children: [/* @__PURE__ */ w("span", {
										className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight",
										children: "Item ID"
									}), /* @__PURE__ */ w("span", {
										className: "text-[13px] text-text-secondary font-mono break-all",
										children: t.itemId
									})]
								}),
								/* @__PURE__ */ T("div", {
									className: "flex items-center gap-3 py-1.5 border-b border-border",
									children: [/* @__PURE__ */ w("span", {
										className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight",
										children: "Document Type"
									}), /* @__PURE__ */ w("span", {
										className: "text-[13px] text-text-secondary font-mono break-all",
										children: t.documentTypeId ?? "—"
									})]
								}),
								/* @__PURE__ */ T("div", {
									className: "flex items-center gap-3 py-1.5 border-b border-border",
									children: [/* @__PURE__ */ w("span", {
										className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight",
										children: "Document"
									}), /* @__PURE__ */ w("span", {
										className: "text-[13px] text-text-secondary font-mono break-all",
										children: t.documentId ? /* @__PURE__ */ w("a", {
											href: `/documents/${t.documentId}`,
											className: "text-primary",
											children: t.documentId
										}) : "—"
									})]
								}),
								/* @__PURE__ */ T("div", {
									className: "flex items-center gap-3 py-1.5",
									children: [/* @__PURE__ */ w("span", {
										className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight",
										children: "Pipeline Run"
									}), /* @__PURE__ */ w("span", {
										className: "text-[13px] text-text-secondary font-mono break-all",
										children: t.pipelineRunId ?? "—"
									})]
								})
							]
						}),
						t.error && /* @__PURE__ */ T("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ w("div", {
								className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
								children: "Error"
							}), /* @__PURE__ */ w("div", {
								className: "bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-md p-2.5 text-xs font-mono whitespace-pre-wrap break-words",
								children: t.error
							})]
						}),
						u && /* @__PURE__ */ T("div", {
							className: "bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-md p-2.5 text-xs font-mono whitespace-pre-wrap break-words",
							children: ["Re-map failed: ", u]
						})
					]
				}),
				/* @__PURE__ */ T("div", {
					className: "px-4 py-4 border-t border-border flex gap-2 justify-end flex-wrap bg-surface sticky bottom-0",
					children: [
						/* @__PURE__ */ w("button", {
							className: f("px-3.5 py-1.5 text-[13px] font-medium font-[inherit] rounded-md cursor-pointer bg-surface border border-border text-text-secondary", (c || t.status === "done") && "opacity-50 cursor-not-allowed"),
							onClick: () => void D(),
							disabled: !!c || t.status === "done",
							"data-testid": "item-remap-btn",
							title: "Re-run the mapping engine for this item",
							children: c === "remap" ? "Re-mapping…" : "Re-map"
						}),
						/* @__PURE__ */ w("button", {
							className: f("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] rounded-md cursor-pointer", c || !g ? "bg-surface border border-border text-text-secondary opacity-50 cursor-not-allowed" : "bg-primary border-none text-white"),
							onClick: () => void x(),
							disabled: !!c || !g,
							"data-testid": "item-retry-btn",
							title: g ? "Retry this item from the beginning" : "Only failed items can be retried",
							children: c === "retry" ? "Retrying…" : "Retry"
						}),
						/* @__PURE__ */ w("button", {
							className: f("px-3.5 py-1.5 text-[13px] font-medium font-[inherit] rounded-md cursor-pointer", c || t.status === "done" ? "bg-surface border border-border text-text-secondary opacity-50 cursor-not-allowed" : "bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)]"),
							onClick: () => void E(),
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
var ge = [
	"queued",
	"mapping",
	"materializing",
	"triggering",
	"done",
	"failed"
];
function _e(e) {
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
function ve(e) {
	switch (e) {
		case "rule": return "neutral";
		case "llm-match": return "info";
		case "llm-generate": return "purple";
		default: return "neutral";
	}
}
function ye(e, t = 50) {
	return e.length <= t ? e : "..." + e.slice(e.length - t + 3);
}
function be() {
	let [e, n] = S(null), [r, i] = S(null), [a, o] = S(null), { sources: s } = t(), { items: l, loading: u, error: d, refresh: f, retryItem: g, skipItem: y } = c({
		sourceId: e,
		status: r
	}), x = a ? l.find((e) => e.itemId === a.itemId) ?? a : null, C = b(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of s) e.set(t.sourceId, t.name);
		return e;
	}, [s]), E = v(async (e) => {
		await g(e);
	}, [g]), D = v(async (e) => {
		await y(e);
	}, [y]);
	return u && l.length === 0 ? /* @__PURE__ */ T("div", {
		"data-testid": "ingest-items-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ w("div", {
				className: "flex items-center justify-between mb-4",
				children: /* @__PURE__ */ w("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Ingest Items"
				})
			}),
			/* @__PURE__ */ w(h, { height: 48 }),
			/* @__PURE__ */ w(h, { height: 48 }),
			/* @__PURE__ */ w(h, { height: 48 })
		]
	}) : /* @__PURE__ */ T("div", {
		"data-testid": "ingest-items-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ w("div", {
				className: "flex items-center justify-between mb-4",
				children: /* @__PURE__ */ T("div", { children: [/* @__PURE__ */ w("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Ingest Items"
				}), /* @__PURE__ */ T("span", {
					className: "text-[13px] text-text-tertiary",
					children: [
						l.length,
						" item",
						l.length === 1 ? "" : "s"
					]
				})] })
			}),
			/* @__PURE__ */ T("div", {
				className: "flex gap-2.5 items-center mb-3 flex-wrap",
				children: [
					/* @__PURE__ */ w(_, {
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
					/* @__PURE__ */ w(_, {
						className: "w-auto",
						value: r ?? "",
						onChange: (e) => i(e.target.value || null),
						"data-testid": "status-filter",
						options: [{
							value: "",
							label: "All"
						}, ...ge.map((e) => ({
							value: e,
							label: e
						}))]
					}),
					/* @__PURE__ */ w("button", {
						className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
						onClick: () => void f(),
						"data-testid": "refresh-btn",
						children: "Refresh"
					})
				]
			}),
			d && /* @__PURE__ */ T("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4",
				role: "alert",
				children: [/* @__PURE__ */ w("span", {
					className: "text-[13px] font-medium",
					children: "Failed to load ingest items."
				}), /* @__PURE__ */ w("button", {
					onClick: () => void f(),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
					children: "Retry"
				})]
			}),
			!d && l.length === 0 ? /* @__PURE__ */ w(m, {
				icon: "📋",
				title: "No items found",
				body: "No ingest items match the current filters."
			}) : !d && /* @__PURE__ */ w("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ T("table", {
					className: "w-full border-collapse text-[13px]",
					children: [/* @__PURE__ */ w("thead", { children: /* @__PURE__ */ T("tr", {
						className: "border-b border-border",
						children: [
							/* @__PURE__ */ w("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "File Path"
							}),
							/* @__PURE__ */ w("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Source"
							}),
							/* @__PURE__ */ w("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Status"
							}),
							/* @__PURE__ */ w("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Type"
							}),
							/* @__PURE__ */ w("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Method"
							}),
							/* @__PURE__ */ w("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Document"
							}),
							/* @__PURE__ */ w("th", {
								className: "p-2 text-right text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ w("tbody", { children: l.map((e) => /* @__PURE__ */ T("tr", {
						className: "border-b border-border cursor-pointer hover:bg-surface-hover",
						onClick: () => o(e),
						"data-testid": `item-row-${e.itemId}`,
						children: [
							/* @__PURE__ */ w("td", {
								className: "p-2 font-medium text-text-primary max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap",
								title: e.sourcePath,
								children: ye(e.sourcePath)
							}),
							/* @__PURE__ */ w("td", {
								className: "p-2 text-text-secondary",
								children: C.get(e.sourceId) ?? e.sourceId.slice(0, 8)
							}),
							/* @__PURE__ */ w("td", {
								className: "p-2",
								children: /* @__PURE__ */ w(p, {
									tone: _e(e.status),
									size: "sm",
									children: e.status
								})
							}),
							/* @__PURE__ */ w("td", {
								className: "p-2 font-mono text-[11px] text-text-secondary",
								children: e.documentTypeId ?? "—"
							}),
							/* @__PURE__ */ w("td", {
								className: "p-2",
								children: e.mappingMethod ? /* @__PURE__ */ w(p, {
									tone: ve(e.mappingMethod),
									size: "xs",
									children: e.mappingMethod
								}) : "—"
							}),
							/* @__PURE__ */ w("td", {
								className: "p-2",
								children: e.documentId ? /* @__PURE__ */ T("a", {
									href: `/documents/${e.documentId}`,
									className: "text-primary no-underline font-medium text-xs",
									onClick: (e) => e.stopPropagation(),
									children: [e.documentId.slice(0, 8), "..."]
								}) : "—"
							}),
							/* @__PURE__ */ w("td", {
								className: "p-2 text-right",
								onClick: (e) => e.stopPropagation(),
								children: /* @__PURE__ */ T("div", {
									className: "flex gap-1.5 justify-end",
									children: [e.status === "failed" && /* @__PURE__ */ w("button", {
										className: "px-2.5 py-1 text-[11px] font-medium border border-border rounded-[5px] bg-surface cursor-pointer font-[inherit] text-text-secondary",
										onClick: () => void E(e.itemId),
										"data-testid": `retry-${e.itemId}`,
										children: "Retry"
									}), e.status !== "done" && /* @__PURE__ */ w("button", {
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
			/* @__PURE__ */ w(he, {
				item: x,
				sourceName: x ? C.get(x.sourceId) : void 0,
				onClose: () => o(null),
				onRetry: async (e) => {
					await E(e);
				},
				onSkip: async (e) => {
					await D(e);
				}
			})
		]
	});
}
//#endregion
//#region src/components/ingest/IngestAuditPage.tsx
var xe = [
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
], Se = [
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
function Ce() {
	let [e, t] = S("24h"), [n, r] = S(""), [a, o] = S(""), [s, c] = S(""), [l, u] = S(null), d = b(() => {
		let t = Se.find((t) => t.value === e);
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
	]), { entries: f, loading: p, error: v } = i(d);
	return /* @__PURE__ */ T("div", {
		"data-testid": "ingest-audit-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ w("div", {
				className: "mb-3",
				children: /* @__PURE__ */ w("div", {
					className: "text-[22px] font-bold text-text-primary",
					children: "Audit log"
				})
			}),
			/* @__PURE__ */ T("div", {
				className: "flex gap-2 flex-wrap items-center p-3 bg-surface-inset rounded-lg mb-3",
				children: [
					/* @__PURE__ */ w("span", {
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Time"
					}),
					/* @__PURE__ */ w(_, {
						"data-testid": "audit-time-range",
						"aria-label": "Time range",
						className: "w-auto min-w-[140px]",
						value: e,
						onChange: (e) => t(e.target.value),
						options: Se.map((e) => ({
							value: e.value,
							label: e.label
						}))
					}),
					/* @__PURE__ */ w("span", {
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Event"
					}),
					/* @__PURE__ */ w(_, {
						"data-testid": "audit-event-type",
						"aria-label": "Event type",
						className: "w-auto min-w-[140px]",
						value: n,
						onChange: (e) => r(e.target.value),
						options: xe.map((e) => ({
							value: e.value,
							label: e.label
						}))
					}),
					/* @__PURE__ */ w("span", {
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Actor"
					}),
					/* @__PURE__ */ w(g, {
						"data-testid": "audit-actor",
						"aria-label": "Actor",
						className: "w-auto min-w-[140px]",
						value: a,
						onChange: (e) => o(e.target.value),
						placeholder: "email or system"
					}),
					/* @__PURE__ */ w("span", {
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Target"
					}),
					/* @__PURE__ */ w(g, {
						"data-testid": "audit-target-id",
						"aria-label": "Target ID",
						className: "w-auto min-w-[140px]",
						value: s,
						onChange: (e) => c(e.target.value),
						placeholder: "sourceId / itemId"
					})
				]
			}),
			v ? /* @__PURE__ */ T("div", {
				"data-testid": "audit-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3",
				children: ["Couldn't load audit log: ", v]
			}) : null,
			p && f.length === 0 ? /* @__PURE__ */ w("div", { children: /* @__PURE__ */ w(h, { height: 200 }) }) : f.length === 0 && !v ? /* @__PURE__ */ w(m, {
				icon: "📜",
				title: "No audit entries",
				body: "Mapping decisions, source changes, and write-back attempts will appear here once instrumentation is wired (hub#2215).",
				testId: "audit-empty"
			}) : /* @__PURE__ */ T("table", {
				"data-testid": "audit-table",
				className: "w-full border-collapse bg-surface border border-border rounded-[10px] overflow-hidden",
				children: [/* @__PURE__ */ w("thead", { children: /* @__PURE__ */ T("tr", { children: [
					/* @__PURE__ */ w("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Time"
					}),
					/* @__PURE__ */ w("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Actor"
					}),
					/* @__PURE__ */ w("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Event"
					}),
					/* @__PURE__ */ w("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Target"
					}),
					/* @__PURE__ */ w("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Summary"
					}),
					/* @__PURE__ */ w("th", { className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border" })
				] }) }), /* @__PURE__ */ w("tbody", { children: f.map((e) => /* @__PURE__ */ w(we, {
					entry: e,
					expanded: l === e.auditId,
					onToggle: () => u(l === e.auditId ? null : e.auditId)
				}, e.auditId)) })]
			})
		]
	});
}
function we({ entry: e, expanded: t, onToggle: n }) {
	return /* @__PURE__ */ T(C, { children: [/* @__PURE__ */ T("tr", {
		"data-testid": `audit-row-${e.auditId}`,
		children: [
			/* @__PURE__ */ w("td", {
				className: "text-[13px] p-2 align-top border-b border-border font-mono text-xs",
				children: e.createdAt.slice(0, 19).replace("T", " ")
			}),
			/* @__PURE__ */ w("td", {
				className: "text-[13px] p-2 align-top border-b border-border",
				children: e.actor
			}),
			/* @__PURE__ */ w("td", {
				className: "text-[13px] p-2 align-top border-b border-border font-mono text-xs",
				children: e.eventType
			}),
			/* @__PURE__ */ T("td", {
				className: "text-[13px] p-2 align-top border-b border-border font-mono text-xs",
				title: e.targetId,
				children: [
					e.targetType,
					"/",
					e.targetId.slice(0, 12)
				]
			}),
			/* @__PURE__ */ w("td", {
				className: "text-[13px] p-2 align-top border-b border-border",
				children: e.summary
			}),
			/* @__PURE__ */ w("td", {
				className: "text-[13px] p-2 align-top border-b border-border",
				children: /* @__PURE__ */ w("button", {
					"data-testid": `audit-detail-toggle-${e.auditId}`,
					className: "text-[11px] text-primary bg-transparent border-none p-0 cursor-pointer underline",
					onClick: n,
					children: t ? "hide" : "detail"
				})
			})
		]
	}), t ? /* @__PURE__ */ w("tr", { children: /* @__PURE__ */ w("td", {
		colSpan: 6,
		className: "text-[13px] p-2 align-top border-b border-border",
		children: /* @__PURE__ */ w("pre", {
			"data-testid": `audit-detail-${e.auditId}`,
			className: "text-[11px] font-mono bg-surface-inset px-2 py-1.5 rounded whitespace-pre-wrap mt-1 max-h-[200px] overflow-auto",
			children: JSON.stringify(e.detail, null, 2)
		})
	}) }) : null] });
}
//#endregion
//#region src/components/ingest/ConflictsPage.tsx
function Q(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : `${Math.floor(t / 864e5)}d ago`;
}
function Te(e) {
	if (e == null) return "—";
	if (typeof e == "string") return e;
	try {
		return JSON.stringify(e, null, 2);
	} catch {
		return String(e);
	}
}
function Ee() {
	let { conflicts: e, loading: n, error: r, usingMock: i, refresh: a, resolveConflict: o, discardConflict: s } = l(), { sources: c } = t(), [u, d] = S(null), [_, v] = S("platform"), [x, C] = S({}), [E, D] = S(""), [O, k] = S(!1), A = b(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of c) e.set(t.sourceId, t.name);
		return e;
	}, [c]), j = b(() => e.filter((e) => e.status === "pending"), [e]);
	y(() => {
		u && j.some((e) => e.conflictId === u) || d(j[0]?.conflictId ?? null);
	}, [j, u]);
	let M = b(() => j.find((e) => e.conflictId === u) ?? null, [j, u]);
	y(() => {
		v("platform"), C({}), D("");
	}, [u]);
	let N = async () => {
		if (M) {
			k(!0);
			try {
				let e = {
					pick: _,
					...Object.keys(x).length > 0 ? { fieldChoices: x } : {},
					...E.trim() ? { note: E.trim() } : {}
				};
				await o(M.conflictId, e);
			} finally {
				k(!1);
			}
		}
	}, P = async () => {
		if (M) {
			k(!0);
			try {
				await s(M.conflictId);
			} finally {
				k(!1);
			}
		}
	};
	return n && e.length === 0 ? /* @__PURE__ */ T("div", {
		"data-testid": "conflicts-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ w("div", {
				className: "flex items-center justify-between mb-3",
				children: /* @__PURE__ */ w("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Sync Conflicts"
				})
			}),
			/* @__PURE__ */ w(h, { height: 48 }),
			/* @__PURE__ */ w(h, { height: 200 })
		]
	}) : /* @__PURE__ */ T("div", {
		"data-testid": "conflicts-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ T("div", {
				className: "flex items-center justify-between mb-3",
				children: [/* @__PURE__ */ T("div", { children: [/* @__PURE__ */ w("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Sync Conflicts"
				}), /* @__PURE__ */ T("span", {
					className: "text-[13px] text-text-tertiary",
					children: [
						j.length,
						" pending",
						(j.length, ""),
						" • ",
						e.length - j.length,
						" resolved"
					]
				})] }), /* @__PURE__ */ w("button", {
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
					onClick: () => void a(),
					"data-testid": "conflicts-refresh",
					children: "Refresh"
				})]
			}),
			i && /* @__PURE__ */ T("div", {
				className: "px-3.5 py-2.5 bg-warning-bg border border-[var(--color-state-awaiting)] text-warning-fg rounded-lg text-xs mb-3",
				"data-testid": "conflicts-mock-banner",
				children: [
					"Showing mock conflicts — backend endpoint ",
					/* @__PURE__ */ w("code", { children: "/api/sync/conflicts" }),
					" not implemented yet."
				]
			}),
			r && !i && /* @__PURE__ */ w("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-3",
				role: "alert",
				children: /* @__PURE__ */ T("span", {
					className: "text-[13px]",
					children: ["Failed to load conflicts: ", r]
				})
			}),
			j.length === 0 ? /* @__PURE__ */ w(m, {
				icon: "✅",
				title: "No pending conflicts",
				body: "Write-back conflicts that need operator intervention will appear here."
			}) : /* @__PURE__ */ T("div", {
				className: "grid grid-cols-[320px_1fr] gap-4 items-start",
				children: [/* @__PURE__ */ T("div", {
					className: "bg-surface border border-border rounded-[10px] overflow-hidden",
					"data-testid": "conflicts-list",
					children: [/* @__PURE__ */ T("div", {
						className: "px-3.5 py-2.5 border-b border-border text-xs font-semibold text-text-tertiary uppercase tracking-wide bg-surface-panel",
						children: [
							"Pending (",
							j.length,
							")"
						]
					}), j.map((e) => {
						let t = e.conflictId === u;
						return /* @__PURE__ */ T("div", {
							className: f("px-3.5 py-2.5 border-b border-border cursor-pointer flex flex-col gap-1", t && "bg-primary-bg"),
							onClick: () => d(e.conflictId),
							"data-testid": `conflict-row-${e.conflictId}`,
							children: [/* @__PURE__ */ w("div", {
								className: "text-[13px] font-semibold text-text-primary leading-tight line-clamp-2",
								children: e.summary
							}), /* @__PURE__ */ T("div", {
								className: "flex gap-1.5 items-center flex-wrap text-[11px] text-text-tertiary",
								children: [
									/* @__PURE__ */ T(p, {
										tone: "warning",
										size: "xs",
										children: [
											e.fields.length,
											" field",
											e.fields.length === 1 ? "" : "s"
										]
									}),
									/* @__PURE__ */ w("span", { children: A.get(e.sourceId) ?? e.sourceId.slice(0, 10) }),
									/* @__PURE__ */ w("span", { children: "•" }),
									/* @__PURE__ */ w("span", { children: Q(e.detectedAt) })
								]
							})]
						}, e.conflictId);
					})]
				}), M && /* @__PURE__ */ T("div", {
					className: "bg-surface border border-border rounded-[10px] p-4.5 flex flex-col gap-4",
					"data-testid": "conflict-detail",
					children: [
						/* @__PURE__ */ T("div", {
							className: "flex items-start justify-between gap-3 flex-wrap",
							children: [/* @__PURE__ */ T("div", { children: [
								/* @__PURE__ */ w("h3", {
									className: "m-0 text-base font-bold text-text-primary",
									children: M.summary
								}),
								/* @__PURE__ */ T("div", {
									className: "mt-1.5 flex gap-2 items-center flex-wrap",
									children: [
										/* @__PURE__ */ w(p, {
											tone: "info",
											size: "xs",
											children: A.get(M.sourceId) ?? M.sourceId
										}),
										M.documentTypeId && /* @__PURE__ */ w(p, {
											tone: "purple",
											size: "xs",
											children: M.documentTypeId
										}),
										/* @__PURE__ */ T("span", {
											className: "text-[11px] text-text-tertiary",
											children: ["Detected ", Q(M.detectedAt)]
										})
									]
								}),
								/* @__PURE__ */ w("div", {
									className: "text-xs text-text-tertiary font-mono break-all mt-1.5",
									children: M.sourceRef
								})
							] }), /* @__PURE__ */ T("div", {
								className: "text-[11px] text-text-tertiary text-right",
								children: [/* @__PURE__ */ T("div", { children: ["Source edited: ", Q(M.sourceUpdatedAt)] }), /* @__PURE__ */ T("div", { children: ["Platform edited: ", Q(M.platformUpdatedAt)] })]
							})]
						}),
						/* @__PURE__ */ T("div", {
							className: "flex gap-2 p-2.5 bg-surface-inset border border-border rounded-lg items-center flex-wrap",
							children: [/* @__PURE__ */ w("span", {
								className: "text-xs font-semibold text-text-secondary mr-1",
								children: "Apply to all fields:"
							}), [
								"source",
								"merged",
								"platform"
							].map((e) => {
								let t = e !== "merged" || M.fields.some((e) => e.mergedValue !== void 0);
								return /* @__PURE__ */ w("button", {
									className: f("px-3 py-1 text-xs font-medium font-[inherit] border rounded-md cursor-pointer", _ === e ? "bg-primary text-white border-primary" : "bg-surface text-text-secondary border-border", !t && "opacity-40 cursor-not-allowed"),
									onClick: () => t && v(e),
									disabled: !t,
									"data-testid": `global-pick-${e}`,
									children: e === "source" ? "Source side" : e === "platform" ? "Platform side" : "Auto-merged"
								}, e);
							})]
						}),
						M.fields.map((e) => /* @__PURE__ */ w(De, {
							field: e,
							globalPick: _,
							fieldChoice: x[e.field],
							onPick: (t) => C((n) => ({
								...n,
								[e.field]: t
							})),
							onClear: () => C((t) => {
								let n = { ...t };
								return delete n[e.field], n;
							})
						}, e.field)),
						/* @__PURE__ */ T("div", {
							className: "flex gap-2 justify-end border-t border-border pt-3.5 flex-wrap",
							children: [
								/* @__PURE__ */ w(g, {
									className: "min-w-[240px] flex-1",
									placeholder: "Optional note (logged in audit trail)",
									value: E,
									onChange: (e) => D(e.target.value),
									"data-testid": "conflict-note"
								}),
								/* @__PURE__ */ w("button", {
									className: f("px-3.5 py-1.5 text-[13px] font-medium font-[inherit] rounded-md cursor-pointer bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)]", O && "opacity-50 cursor-not-allowed"),
									onClick: () => void P(),
									disabled: O,
									"data-testid": "conflict-discard",
									children: "Discard"
								}),
								/* @__PURE__ */ w("button", {
									className: f("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]", O && "opacity-50 cursor-not-allowed"),
									onClick: () => void N(),
									disabled: O,
									"data-testid": "conflict-resolve",
									children: O ? "Resolving…" : "Resolve"
								})
							]
						})
					]
				})]
			})
		]
	});
}
function De({ field: e, globalPick: t, fieldChoice: n, onPick: r, onClear: i }) {
	let a = n ?? t, o = e.mergedValue !== void 0;
	return /* @__PURE__ */ T("div", {
		className: "border border-border rounded-lg overflow-hidden",
		"data-testid": `field-diff-${e.field}`,
		children: [
			/* @__PURE__ */ T("div", {
				className: "px-3 py-2 bg-surface-panel border-b border-border flex items-center justify-between gap-2 flex-wrap",
				children: [/* @__PURE__ */ w("span", {
					className: "font-mono text-xs text-text-primary font-semibold",
					children: e.field
				}), n && /* @__PURE__ */ w("button", {
					onClick: i,
					className: "text-[10px] px-2.5 py-0.5 rounded-full cursor-pointer border border-border bg-surface text-text-secondary font-[inherit] font-medium",
					"data-testid": `field-clear-${e.field}`,
					children: "Clear override"
				})]
			}),
			/* @__PURE__ */ T("div", {
				className: "grid grid-cols-3",
				children: [
					/* @__PURE__ */ w($, {
						label: "Source side",
						value: e.sourceValue,
						selected: a === "source"
					}),
					/* @__PURE__ */ w($, {
						label: o ? "Auto-merged" : "Auto-merged (none)",
						value: o ? e.mergedValue : "—",
						selected: o && a === "merged",
						dim: !o
					}),
					/* @__PURE__ */ w($, {
						label: "Platform side",
						value: e.platformValue,
						selected: a === "platform",
						last: !0
					})
				]
			}),
			/* @__PURE__ */ T("div", {
				className: "flex gap-1.5 px-2.5 py-1.5 border-t border-border bg-surface-inset",
				children: [/* @__PURE__ */ w("span", {
					className: "text-[11px] text-text-tertiary mr-1",
					children: "Pick for this field:"
				}), [
					"source",
					"merged",
					"platform"
				].map((t) => {
					let n = t !== "merged" || o;
					return /* @__PURE__ */ w("button", {
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
function $({ label: e, value: t, selected: n, last: r, dim: i }) {
	return /* @__PURE__ */ T("div", {
		className: f("p-3 text-xs text-text-secondary font-mono whitespace-pre-wrap break-words min-h-[60px] bg-surface", !r && "border-r border-border", n && "bg-success-bg border-[var(--color-state-completed)]", i && "opacity-55"),
		children: [/* @__PURE__ */ w("div", {
			className: "text-[10px] font-bold text-text-tertiary uppercase tracking-wide mb-1.5 font-sans",
			children: e
		}), /* @__PURE__ */ w("div", { children: Te(t) })]
	});
}
//#endregion
//#region src/components/ingest/DeadLetterQueuePage.tsx
function Oe(e) {
	let t = Date.now() - e;
	return t < 0 ? "just now" : t < 6e4 ? `${Math.floor(t / 1e3)}s ago` : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : `${Math.floor(t / 864e5)}d ago`;
}
function ke() {
	let { entries: e, loading: t, error: r, replay: i, drop: a } = n();
	return /* @__PURE__ */ T("div", {
		"data-testid": "ingest-dlq-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ w("div", {
				className: "flex items-baseline justify-between mb-4 gap-3 flex-wrap",
				children: /* @__PURE__ */ T("div", { children: [/* @__PURE__ */ w("div", {
					className: "text-[22px] font-bold text-text-primary",
					children: "Dead Letter Queue"
				}), /* @__PURE__ */ w("div", {
					className: "text-xs text-text-tertiary",
					children: "Items the engine couldn't process. Replay re-enqueues; drop purges."
				})] })
			}),
			r ? /* @__PURE__ */ w("div", {
				"data-testid": "ingest-dlq-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3",
				children: r
			}) : null,
			t && e.length === 0 ? /* @__PURE__ */ T("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ w(h, { height: 96 }),
					/* @__PURE__ */ w(h, { height: 96 }),
					/* @__PURE__ */ w(h, { height: 96 })
				]
			}) : e.length === 0 && !r ? /* @__PURE__ */ w(m, {
				icon: "🧹",
				title: "DLQ is empty",
				body: "Failed items will land here. Replay re-enqueues into the source queue; drop purges without retry.",
				testId: "ingest-dlq-empty"
			}) : /* @__PURE__ */ w("div", {
				"data-testid": "ingest-dlq-list",
				className: "flex flex-col gap-3",
				children: e.map((e) => /* @__PURE__ */ w(Ae, {
					entry: e,
					onReplay: () => void i(e.id),
					onDrop: () => void a(e.id)
				}, e.id))
			})
		]
	});
}
function Ae({ entry: e, onReplay: t, onDrop: n }) {
	return /* @__PURE__ */ T("div", {
		"data-testid": `dlq-row-${e.id}`,
		className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-2",
		children: [
			/* @__PURE__ */ T("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ w("span", {
					className: "font-mono text-[13px] text-text-primary",
					title: e.id,
					children: e.id
				}), /* @__PURE__ */ w("span", {
					className: "text-[11px] text-text-tertiary",
					children: Oe(e.failedAtMs)
				})]
			}),
			/* @__PURE__ */ T("div", {
				className: "text-xs text-text-secondary flex gap-4 flex-wrap",
				children: [/* @__PURE__ */ T("span", { children: ["Attempts: ", /* @__PURE__ */ w("strong", { children: e.totalAttempts })] }), e.envelope.body?.sourceId ? /* @__PURE__ */ T("span", { children: ["Source: ", e.envelope.body.sourceId.slice(0, 12)] }) : null]
			}),
			e.lastError ? /* @__PURE__ */ w("div", {
				className: "text-xs text-text-primary font-mono bg-surface-inset px-2 py-1.5 rounded-md whitespace-pre-wrap break-words max-h-20 overflow-auto",
				children: e.lastError
			}) : null,
			/* @__PURE__ */ T("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ w("button", {
					"data-testid": `dlq-replay-${e.id}`,
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
					onClick: t,
					children: "Replay"
				}), /* @__PURE__ */ w("button", {
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
function je() {
	let { proposals: e, loading: t, error: n, promote: r, reject: i } = u();
	return /* @__PURE__ */ T("div", {
		"data-testid": "doctype-proposals-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ T("div", {
				className: "mb-4",
				children: [/* @__PURE__ */ w("div", {
					className: "text-[22px] font-bold text-text-primary",
					children: "DocType proposals"
				}), /* @__PURE__ */ w("div", {
					className: "text-xs text-text-tertiary mt-1",
					children: "Auto-discovered candidate types from the LLM mapper. Promote to accept; reject to suppress similar future proposals."
				})]
			}),
			n ? /* @__PURE__ */ T("div", {
				"data-testid": "proposals-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3",
				children: ["Couldn't load DocType proposals: ", n]
			}) : null,
			t && e.length === 0 ? /* @__PURE__ */ T("div", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ w(h, { height: 120 }), /* @__PURE__ */ w(h, { height: 120 })]
			}) : e.length === 0 && !n ? /* @__PURE__ */ w(m, {
				icon: "🧬",
				title: "No proposals waiting",
				body: "When the LLM mapper sees N similar files of an unknown shape, the proposed DocType lands here.",
				testId: "proposals-empty"
			}) : /* @__PURE__ */ w("div", {
				"data-testid": "proposals-list",
				className: "flex flex-col gap-3",
				children: e.map((e) => /* @__PURE__ */ w(Me, {
					proposal: e,
					onPromote: () => void r(e.proposalId),
					onReject: () => void i(e.proposalId)
				}, e.proposalId))
			})
		]
	});
}
function Me({ proposal: e, onPromote: t, onReject: n }) {
	return /* @__PURE__ */ T("div", {
		"data-testid": `proposal-row-${e.proposalId}`,
		className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-2.5",
		children: [
			/* @__PURE__ */ T("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ w("span", {
					className: "text-base font-bold text-text-primary",
					children: e.proposedName
				}), /* @__PURE__ */ T("span", {
					className: "text-[11px] text-text-tertiary",
					children: [
						e.sampleIngestIds.length,
						" sample",
						e.sampleIngestIds.length === 1 ? "" : "s"
					]
				})]
			}),
			/* @__PURE__ */ T("div", {
				className: "text-xs text-text-secondary flex gap-4 flex-wrap",
				children: [/* @__PURE__ */ T("span", { children: ["Source: ", e.sourceId.slice(0, 12)] }), /* @__PURE__ */ T("span", { children: ["Signature: ", e.signature.slice(0, 24)] })]
			}),
			e.proposedDescription ? /* @__PURE__ */ w("div", {
				className: "text-[13px] text-text-primary leading-relaxed",
				children: e.proposedDescription
			}) : null,
			e.proposedFields.length > 0 ? /* @__PURE__ */ w("div", {
				className: "flex flex-wrap gap-1.5",
				children: e.proposedFields.map((e) => /* @__PURE__ */ T("span", {
					className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset text-text-secondary font-mono",
					children: [e.name, e.required ? "*" : ""]
				}, e.name))
			}) : null,
			e.reasoning ? /* @__PURE__ */ T("div", {
				className: "text-xs text-text-tertiary italic",
				title: e.reasoning,
				children: [e.reasoning.slice(0, 200), e.reasoning.length > 200 ? "…" : ""]
			}) : null,
			/* @__PURE__ */ T("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ w("button", {
					"data-testid": `proposal-promote-${e.proposalId}`,
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
					onClick: t,
					children: "Promote"
				}), /* @__PURE__ */ w("button", {
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
function Ne() {
	let { idToken: t } = e(), { items: n, threshold: i, loading: a, error: o, remap: s, skip: c } = r(), { types: l } = d({ idToken: t }), [u, f] = S({});
	return /* @__PURE__ */ T("div", {
		"data-testid": "mapping-review-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ w("div", {
				className: "flex items-baseline justify-between mb-4",
				children: /* @__PURE__ */ T("div", { children: [/* @__PURE__ */ w("div", {
					className: "text-[22px] font-bold text-text-primary",
					children: "Mapping needs review"
				}), /* @__PURE__ */ T("div", {
					className: "text-xs text-text-tertiary",
					children: [
						"Showing items with confidence < ",
						Math.round(i * 100),
						"%."
					]
				})] })
			}),
			o ? /* @__PURE__ */ T("div", {
				"data-testid": "mapping-review-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3",
				children: ["Couldn't load review queue: ", o]
			}) : null,
			a && n.length === 0 ? /* @__PURE__ */ T("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ w(h, { height: 96 }),
					/* @__PURE__ */ w(h, { height: 96 }),
					/* @__PURE__ */ w(h, { height: 96 })
				]
			}) : n.length === 0 && !o ? /* @__PURE__ */ w(m, {
				icon: "✨",
				title: "No items need review",
				body: "When the LLM mapper produces a low-confidence match, it'll show up here for your call.",
				testId: "mapping-review-empty"
			}) : /* @__PURE__ */ w("div", {
				"data-testid": "mapping-review-list",
				className: "flex flex-col gap-3",
				children: n.map((e) => /* @__PURE__ */ w(Pe, {
					item: e,
					docTypes: l,
					remapTypeId: u[e.itemId] ?? "",
					onPickRemapType: (t) => f((n) => ({
						...n,
						[e.itemId]: t
					})),
					onAccept: () => {
						e.documentTypeId && s(e.itemId, e.documentTypeId);
					},
					onRemap: () => {
						let t = u[e.itemId];
						t && s(e.itemId, t);
					},
					onDiscard: () => void c(e.itemId)
				}, e.itemId))
			})
		]
	});
}
function Pe({ item: e, docTypes: t, remapTypeId: n, onPickRemapType: r, onAccept: i, onRemap: a, onDiscard: o }) {
	let s = t.find((t) => t.id === e.documentTypeId)?.name ?? e.documentTypeId ?? "(unknown)", c = typeof e.mappingConfidence == "number" ? `${Math.round(e.mappingConfidence * 100)}%` : "—";
	return /* @__PURE__ */ T("div", {
		"data-testid": `review-row-${e.itemId}`,
		className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-2",
		children: [
			/* @__PURE__ */ T("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ w("span", {
					className: "font-[ui-monospace,monospace] text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
					title: e.sourcePath,
					children: e.sourcePath
				}), /* @__PURE__ */ T("span", {
					className: "text-[11px] font-semibold px-2 py-0.5 rounded-full bg-warning-bg text-warning-fg",
					children: ["conf ", c]
				})]
			}),
			/* @__PURE__ */ T("div", {
				className: "text-xs text-text-secondary flex gap-3 flex-wrap",
				children: [/* @__PURE__ */ T("span", { children: ["Suggested type: ", /* @__PURE__ */ w("strong", { children: s })] }), /* @__PURE__ */ T("span", { children: ["Source: ", e.sourceId.slice(0, 8)] })]
			}),
			e.error ? /* @__PURE__ */ w("div", {
				className: "text-xs text-text-secondary italic",
				children: e.error.slice(0, 200)
			}) : null,
			/* @__PURE__ */ T("div", {
				className: "flex gap-2 items-center flex-wrap",
				children: [
					/* @__PURE__ */ w("button", {
						"data-testid": `review-accept-${e.itemId}`,
						className: f("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]", !e.documentTypeId && "opacity-50 cursor-not-allowed"),
						onClick: i,
						disabled: !e.documentTypeId,
						title: e.documentTypeId ? "Commit the suggested type" : "No suggestion to accept",
						children: "Accept suggestion"
					}),
					/* @__PURE__ */ w(_, {
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
					/* @__PURE__ */ w("button", {
						"data-testid": `review-remap-${e.itemId}`,
						className: f("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]", !n && "opacity-50 cursor-not-allowed"),
						onClick: a,
						disabled: !n,
						children: "Re-map"
					}),
					/* @__PURE__ */ w("button", {
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
function Fe(e) {
	return new Date(e).toLocaleTimeString("en-US", {
		hour12: !1,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	});
}
function Ie(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? `${n}s` : `${Math.floor(n / 60)}m ${n % 60}s`;
}
function Le(e) {
	return e.startsWith("sync.") ? "bg-info-bg text-info-fg" : e === "item.mapped" ? "bg-accent-bg text-accent-fg" : e === "item.materialized" ? "bg-success-bg text-success-fg" : e === "item.failed" ? "bg-danger-bg text-danger-fg" : "bg-surface-hover text-neutral";
}
function Re(e) {
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
var ze = [
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
function Be() {
	let e = E(), { events: t, activeSyncs: n, clearEvents: r } = o(), i = x(null), [a, s] = S(!1), [c, l] = S(""), [u, d] = S("all"), p = x(null);
	y(() => {
		a && p.current === null ? p.current = [...t] : a || (p.current = null);
	}, [a, t]);
	let m = b(() => {
		let e = /* @__PURE__ */ new Set();
		for (let n of t) {
			let t = n.sourceId;
			typeof t == "string" && t && e.add(t);
		}
		for (let t of n.keys()) e.add(t);
		return Array.from(e).sort();
	}, [t, n]), h = b(() => {
		let e = a && p.current ? p.current : t, n = ze.find((e) => e.value === u) ?? ze[0];
		return e.filter((e) => !(!n.match(e.type) || c && e.sourceId !== c));
	}, [
		t,
		a,
		u,
		c
	]);
	y(() => {
		a || i.current && (i.current.scrollTop = i.current.scrollHeight);
	}, [h.length, a]);
	let g = b(() => {
		let e = t.filter((e) => e.type === "item.failed" || e.type === "sync.failed").length;
		return {
			totalEvents: t.length,
			activeSyncsCount: n.size,
			errorsCount: e
		};
	}, [t, n]), v = b(() => Array.from(n.values()), [n]);
	return /* @__PURE__ */ T("div", {
		"data-testid": "sync-monitor-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ T("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ T("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ w("h2", {
						className: "m-0 text-[22px] font-bold text-text-primary",
						children: "Sync Monitor"
					}), /* @__PURE__ */ T("span", {
						className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-semibold bg-success-bg text-success-fg rounded-full border border-success-border",
						children: [/* @__PURE__ */ w("span", { className: "w-[7px] h-[7px] rounded-full bg-success animate-[sync-pulse_1.5s_ease-in-out_infinite]" }), "Live"]
					})]
				}), /* @__PURE__ */ w("button", {
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
					onClick: () => e("/ingest/sources"),
					children: "Sources"
				})]
			}),
			/* @__PURE__ */ T("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3 mb-5",
				children: [
					/* @__PURE__ */ T("div", {
						className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-1",
						children: [/* @__PURE__ */ w("span", {
							className: "text-[11px] font-medium text-text-tertiary uppercase tracking-tight",
							children: "Events Received"
						}), /* @__PURE__ */ w("span", {
							className: "text-[22px] font-bold text-text-primary leading-none",
							children: g.totalEvents
						})]
					}),
					/* @__PURE__ */ T("div", {
						className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-1",
						children: [/* @__PURE__ */ w("span", {
							className: "text-[11px] font-medium text-text-tertiary uppercase tracking-tight",
							children: "Active Syncs"
						}), /* @__PURE__ */ w("span", {
							className: f("text-[22px] font-bold leading-none", g.activeSyncsCount > 0 ? "text-[var(--color-state-running)]" : "text-text-primary"),
							children: g.activeSyncsCount
						})]
					}),
					/* @__PURE__ */ T("div", {
						className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-1",
						children: [/* @__PURE__ */ w("span", {
							className: "text-[11px] font-medium text-text-tertiary uppercase tracking-tight",
							children: "Errors"
						}), /* @__PURE__ */ w("span", {
							className: f("text-[22px] font-bold leading-none", g.errorsCount > 0 ? "text-[var(--color-state-failed)]" : "text-text-primary"),
							children: g.errorsCount
						})]
					})
				]
			}),
			/* @__PURE__ */ T("div", {
				className: "bg-surface border border-border rounded-[10px] p-4 mb-4",
				children: [/* @__PURE__ */ w("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Active Syncs"
				}), v.length === 0 ? /* @__PURE__ */ T("div", {
					className: "py-8 text-center",
					children: [/* @__PURE__ */ w("div", {
						className: "text-sm font-medium text-text-secondary mb-1",
						children: "No active syncs"
					}), /* @__PURE__ */ w("div", {
						className: "text-xs text-text-tertiary",
						children: "Trigger a sync from the Sources page to see progress here."
					})]
				}) : v.map((e) => {
					let t = e.fileCount > 0 ? Math.round(e.filesFetched / e.fileCount * 100) : 0;
					return /* @__PURE__ */ T("div", {
						className: "p-3.5 bg-surface-inset border border-border rounded-lg mb-2.5",
						children: [
							/* @__PURE__ */ T("div", {
								className: "flex items-center justify-between mb-2",
								children: [/* @__PURE__ */ w("span", {
									className: "text-sm font-semibold text-text-primary",
									children: e.sourceName
								}), /* @__PURE__ */ w("span", {
									className: "text-[11px] text-text-tertiary font-mono",
									children: Ie(e.startedAt)
								})]
							}),
							/* @__PURE__ */ w("div", {
								className: "h-2 rounded bg-surface-emphasis overflow-hidden mb-2",
								children: /* @__PURE__ */ w("div", {
									className: "h-full rounded bg-[var(--color-state-running)] transition-[width] duration-300 ease-out",
									style: { width: `${t}%` }
								})
							}),
							/* @__PURE__ */ T("div", {
								className: "flex gap-4 text-xs text-text-secondary",
								children: [
									/* @__PURE__ */ T("span", {
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
									/* @__PURE__ */ T("span", {
										className: "flex items-center gap-1",
										children: ["Mapped: ", e.itemsMapped]
									}),
									/* @__PURE__ */ T("span", {
										className: "flex items-center gap-1",
										children: ["Materialized: ", e.itemsMaterialized]
									})
								]
							})
						]
					}, e.sourceId);
				})]
			}),
			/* @__PURE__ */ T("div", {
				className: "bg-surface border border-border rounded-[10px] p-4 mb-4",
				children: [/* @__PURE__ */ T("div", {
					className: "flex items-center justify-between mb-3 gap-2 flex-wrap",
					children: [/* @__PURE__ */ w("span", {
						className: "text-sm font-semibold text-text-primary",
						children: "Event Log"
					}), /* @__PURE__ */ T("div", {
						className: "flex items-center gap-2 flex-wrap",
						children: [
							/* @__PURE__ */ w(_, {
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
							/* @__PURE__ */ w(_, {
								"data-testid": "event-type-filter",
								"aria-label": "Filter by event type",
								className: "w-auto min-w-[110px]",
								value: u,
								onChange: (e) => d(e.target.value),
								options: ze.map((e) => ({
									value: e.value,
									label: e.label
								}))
							}),
							/* @__PURE__ */ w("button", {
								"data-testid": "event-pause-toggle",
								className: "px-2.5 py-0.5 text-[11px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
								onClick: () => s((e) => !e),
								title: a ? "Resume the live stream" : "Pause the stream so the log doesn't scroll",
								children: a ? "Resume" : "Pause"
							}),
							t.length > 0 && /* @__PURE__ */ w("button", {
								className: "px-2.5 py-0.5 text-[11px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
								onClick: r,
								children: "Clear"
							})
						]
					})]
				}), h.length === 0 ? /* @__PURE__ */ T("div", {
					className: "py-8 text-center",
					children: [/* @__PURE__ */ w("div", {
						className: "text-sm font-medium text-text-secondary mb-1",
						children: t.length === 0 ? "No events yet" : "No events match the current filter"
					}), /* @__PURE__ */ w("div", {
						className: "text-xs text-text-tertiary",
						children: t.length === 0 ? "Events will appear here in real-time as syncs run." : "Try a different source or event-type filter, or clear the filter."
					})]
				}) : /* @__PURE__ */ w("div", {
					ref: i,
					"data-testid": "event-log",
					className: "max-h-80 overflow-y-auto flex flex-col gap-0.5",
					children: h.map((e, t) => /* @__PURE__ */ T("div", {
						className: "flex items-center gap-2 px-2 py-1 rounded text-xs",
						children: [
							/* @__PURE__ */ w("span", {
								className: "text-[11px] font-mono text-text-tertiary shrink-0 min-w-[60px]",
								children: Fe(e.timestamp)
							}),
							/* @__PURE__ */ w("span", {
								className: f("px-[7px] py-0.5 text-[10px] font-semibold rounded shrink-0", Le(e.type)),
								children: e.type
							}),
							/* @__PURE__ */ w("span", {
								className: "text-xs text-text-secondary flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap",
								title: Re(e),
								children: Re(e)
							})
						]
					}, `${e.timestamp}-${t}`))
				})]
			})
		]
	});
}
//#endregion
export { Ee as ConflictsPage, ke as DeadLetterQueuePage, je as DocTypeProposalsPage, Ce as IngestAuditPage, L as IngestDashboard, he as IngestItemDrawer, be as IngestItemsPage, Ne as MappingReviewPage, W as MappingRuleEditor, ue as SourceDetailPage, ne as SourceSloPanel, V as SourcesPage, Be as SyncMonitorPage };
