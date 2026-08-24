import { n as e } from "./IdentityContext-m2wQF4sJ.js";
import { a as t, c as n, i as r, l as i, n as a, o, r as s, s as c, t as l, u } from "./useSyncConflicts-DNj4F6oF.js";
import { n as d } from "./useDocumentTypes-C-AMWgYq.js";
import { t as f } from "./cn-DhjIN-s0.js";
import { t as p } from "./Chip-2lIuHwy5.js";
import { t as m } from "./EmptyState-CUHf5NYN.js";
import { t as h } from "./SkeletonCard-CGe8XFPB.js";
import { t as g } from "./activationKey-CjbL3LUv.js";
import { t as _ } from "./Input-DcK2h-jK.js";
import { t as v } from "./Select-Z0TLUVeL.js";
import { useCallback as y, useEffect as b, useId as x, useMemo as S, useRef as C, useState as w } from "react";
import { Fragment as T, jsx as E, jsxs as D } from "react/jsx-runtime";
import { useNavigate as O, useParams as k } from "react-router";
import { Line as A, LineChart as j, ResponsiveContainer as M, Tooltip as N, YAxis as P } from "recharts";
//#region src/components/ingest/IngestDashboard.tsx
function F(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : `${Math.floor(t / 864e5)}d ago`;
}
function ee(e) {
	return Date.now() - new Date(e).getTime() < 864e5;
}
function I(e) {
	return Date.now() - new Date(e).getTime() < 36e5;
}
var L = 50;
function R() {
	let e = O(), { sources: n, loading: r, error: i, refresh: a } = t(), { items: o, loading: s, error: l, refresh: u } = c(), d = r || s, g = i || l, _ = S(() => {
		let e = n.filter((e) => e.status === "active").length, t = n.filter((e) => e.status === "paused").length, r = n.filter((e) => e.status === "error").length, i = o.filter((e) => e.status !== "done" && e.status !== "failed").length, a = o.filter((e) => e.status === "done" && ee(e.updatedAt)).length, s = o.filter((e) => e.status === "failed").length;
		return {
			total: n.length,
			active: e,
			paused: t,
			errored: r,
			queued: i,
			recentDone: a,
			failed: s
		};
	}, [n, o]), v = S(() => o.filter((e) => e.status === "done").sort((e, t) => t.updatedAt.localeCompare(e.updatedAt)).slice(0, 5), [o]), y = S(() => {
		let e = [];
		for (let t of n) t.status === "error" && e.push({
			id: `source-error-${t.sourceId}`,
			level: "critical",
			message: `Source "${t.name}" is in error state — check its config or last sync log.`
		});
		let t = o.filter((e) => I(e.updatedAt));
		if (t.length >= 5) {
			let n = t.filter((e) => e.status === "failed").length, r = n / t.length;
			r > .1 && e.push({
				id: "failure-rate-1h",
				level: "warning",
				message: `Last-hour failure rate is ${(r * 100).toFixed(0)}% (${n} of ${t.length} items failed).`
			});
		}
		return _.queued > L && e.push({
			id: "queue-depth",
			level: "warning",
			message: `Queue depth is ${_.queued} items — sources may be ingesting faster than the engine can drain.`
		}), e;
	}, [
		n,
		o,
		_.queued
	]);
	return d && n.length === 0 && o.length === 0 ? /* @__PURE__ */ D("div", {
		"data-testid": "ingest-dashboard",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ E("div", {
				className: "flex items-center justify-between mb-4",
				children: /* @__PURE__ */ E("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Ingest"
				})
			}),
			/* @__PURE__ */ D("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 mb-5",
				children: [
					/* @__PURE__ */ E(h, { height: 90 }),
					/* @__PURE__ */ E(h, { height: 90 }),
					/* @__PURE__ */ E(h, { height: 90 }),
					/* @__PURE__ */ E(h, { height: 90 })
				]
			}),
			/* @__PURE__ */ E(h, { height: 200 })
		]
	}) : /* @__PURE__ */ D("div", {
		"data-testid": "ingest-dashboard",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ D("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ E("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Ingest"
				}), /* @__PURE__ */ D("div", {
					className: "flex gap-2.5 items-center",
					children: [null, /* @__PURE__ */ E("button", {
						className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
						onClick: () => e("/ingest/sources"),
						"data-testid": "add-source-btn",
						children: "Add Source"
					})]
				})]
			}),
			g && /* @__PURE__ */ D("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4",
				role: "alert",
				children: [/* @__PURE__ */ E("span", {
					className: "text-[13px] font-medium",
					children: "Failed to load ingest data."
				}), /* @__PURE__ */ E("button", {
					onClick: () => {
						a(), u();
					},
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
					children: "Retry"
				})]
			}),
			y.length > 0 && /* @__PURE__ */ E("div", {
				"data-testid": "alerts-strip",
				className: "flex flex-col gap-1.5 mb-3",
				children: y.map((e) => /* @__PURE__ */ D("div", {
					"data-testid": `alert-${e.id}`,
					className: f("px-3 py-2 rounded-md text-[13px] border", e.level === "critical" ? "bg-danger-bg border-[var(--color-state-failed)] text-[var(--color-state-failed)]" : "bg-warning-bg border-warning text-warning-fg"),
					children: [
						/* @__PURE__ */ E("strong", { children: e.level === "critical" ? "⛔" : "⚠" }),
						" ",
						e.message
					]
				}, e.id))
			}),
			/* @__PURE__ */ D("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 mb-5",
				children: [
					/* @__PURE__ */ D("div", {
						className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5",
						children: [
							/* @__PURE__ */ E("span", {
								className: "text-xs font-medium text-text-tertiary uppercase tracking-wide",
								children: "Sources"
							}),
							/* @__PURE__ */ E("span", {
								className: "text-[28px] font-bold text-text-primary leading-none",
								children: _.total
							}),
							/* @__PURE__ */ D("span", {
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
					/* @__PURE__ */ D("div", {
						className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5",
						children: [
							/* @__PURE__ */ E("span", {
								className: "text-xs font-medium text-text-tertiary uppercase tracking-wide",
								children: "In Queue"
							}),
							/* @__PURE__ */ E("span", {
								className: f("text-[28px] font-bold leading-none", _.queued > 0 ? "text-[var(--color-state-awaiting)]" : "text-text-primary"),
								children: _.queued
							}),
							/* @__PURE__ */ E("span", {
								className: "text-xs text-text-tertiary",
								children: "items processing"
							})
						]
					}),
					/* @__PURE__ */ D("div", {
						className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5",
						children: [
							/* @__PURE__ */ E("span", {
								className: "text-xs font-medium text-text-tertiary uppercase tracking-wide",
								children: "Completed (24h)"
							}),
							/* @__PURE__ */ E("span", {
								className: f("text-[28px] font-bold leading-none", _.recentDone > 0 ? "text-[var(--color-state-completed)]" : "text-text-primary"),
								children: _.recentDone
							}),
							/* @__PURE__ */ E("span", {
								className: "text-xs text-text-tertiary",
								children: "items ingested"
							})
						]
					}),
					/* @__PURE__ */ D("div", {
						className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5",
						children: [
							/* @__PURE__ */ E("span", {
								className: "text-xs font-medium text-text-tertiary uppercase tracking-wide",
								children: "Errors"
							}),
							/* @__PURE__ */ E("span", {
								className: f("text-[28px] font-bold leading-none", _.failed > 0 ? "text-[var(--color-state-failed)]" : "text-text-primary"),
								children: _.failed
							}),
							/* @__PURE__ */ E("span", {
								className: "text-xs text-text-tertiary",
								children: "items failed"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ D("div", {
				className: "bg-surface border border-border rounded-[10px] p-4 mb-4",
				children: [/* @__PURE__ */ E("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Recent Activity"
				}), v.length === 0 ? /* @__PURE__ */ E(m, {
					icon: "📥",
					title: "No recent activity",
					body: "Completed ingest items will appear here."
				}) : /* @__PURE__ */ E("div", { children: v.map((e) => /* @__PURE__ */ D("div", {
					className: "flex items-center justify-between gap-3 py-2 border-b border-border",
					children: [
						/* @__PURE__ */ E("span", {
							className: "text-[13px] text-text-secondary font-mono overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0",
							title: e.sourcePath,
							children: e.sourcePath
						}),
						/* @__PURE__ */ E(p, {
							tone: "success",
							size: "xs",
							children: "done"
						}),
						/* @__PURE__ */ E("span", {
							className: "text-[11px] text-text-tertiary whitespace-nowrap shrink-0",
							children: F(e.updatedAt)
						})
					]
				}, e.itemId)) })]
			})
		]
	});
}
//#endregion
//#region src/components/ingest/SourcesPage.tsx
function z(e) {
	switch (e) {
		case "active": return "success";
		case "paused": return "warning";
		case "error": return "danger";
		default: return "neutral";
	}
}
function B(e) {
	switch (e) {
		case "local": return "Local";
		case "s3": return "S3";
		case "google-drive": return "Google Drive";
		case "webhook": return "Webhook";
		default: return e;
	}
}
function V(e) {
	switch (e) {
		case "s3": return "info";
		case "google-drive": return "purple";
		case "webhook": return "caution";
		case "local": return "neutral";
		default: return "neutral";
	}
}
function H(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function U() {
	let e = O(), { sources: n, loading: r, error: i, refresh: a, deleteSource: o, triggerSync: s } = t(), [c, l] = w(() => /* @__PURE__ */ new Set()), u = y(async (e) => {
		l((t) => new Set(t).add(e)), await s(e), l((t) => {
			let n = new Set(t);
			return n.delete(e), n;
		}), a();
	}, [s, a]), d = y(async (e) => {
		confirm(`Delete source "${e.name}"? This cannot be undone.`) && await o(e.sourceId);
	}, [o]);
	return r && n.length === 0 ? /* @__PURE__ */ D("div", {
		"data-testid": "sources-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ E("div", {
				className: "flex items-center justify-between mb-4",
				children: /* @__PURE__ */ E("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Sources"
				})
			}),
			/* @__PURE__ */ E(h, { height: 48 }),
			/* @__PURE__ */ E(h, { height: 48 }),
			/* @__PURE__ */ E(h, { height: 48 })
		]
	}) : /* @__PURE__ */ D("div", {
		"data-testid": "sources-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ D("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ D("div", { children: [/* @__PURE__ */ E("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Sources"
				}), /* @__PURE__ */ D("span", {
					className: "text-[13px] text-text-tertiary",
					children: [
						n.length,
						" source",
						n.length === 1 ? "" : "s"
					]
				})] }), /* @__PURE__ */ E("button", {
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
					onClick: () => e("/ingest/sources"),
					"data-testid": "add-source-btn",
					children: "Add Source"
				})]
			}),
			i && /* @__PURE__ */ D("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4",
				role: "alert",
				children: [/* @__PURE__ */ E("span", {
					className: "text-[13px] font-medium",
					children: "Failed to load sources."
				}), /* @__PURE__ */ E("button", {
					onClick: () => void a(),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
					children: "Retry"
				})]
			}),
			!i && n.length === 0 ? /* @__PURE__ */ E(m, {
				icon: "📂",
				title: "No sources configured",
				body: "Add a data source to start ingesting files into the system.",
				actionLabel: "Add Source",
				onAction: () => e("/ingest/sources")
			}) : /* @__PURE__ */ E("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ D("table", {
					className: "w-full border-collapse text-[13px]",
					children: [/* @__PURE__ */ E("thead", { children: /* @__PURE__ */ D("tr", {
						className: "border-b border-border",
						children: [
							/* @__PURE__ */ E("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Name"
							}),
							/* @__PURE__ */ E("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Type"
							}),
							/* @__PURE__ */ E("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Status"
							}),
							/* @__PURE__ */ E("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Last Sync"
							}),
							/* @__PURE__ */ E("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Files Synced"
							}),
							/* @__PURE__ */ E("th", {
								className: "p-2 text-right text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ E("tbody", { children: n.map((t) => /* @__PURE__ */ D("tr", {
						className: "border-b border-border hover:bg-surface-hover",
						children: [
							/* @__PURE__ */ E("td", {
								className: "p-2 font-medium text-text-primary",
								children: /* @__PURE__ */ E("button", {
									type: "button",
									"data-testid": `source-name-link-${t.sourceId}`,
									onClick: () => e(`/ingest/sources/${t.sourceId}`),
									className: "bg-transparent border-none p-0 font-[inherit] text-primary cursor-pointer underline text-left",
									children: t.name
								})
							}),
							/* @__PURE__ */ E("td", {
								className: "p-2",
								children: /* @__PURE__ */ E(p, {
									tone: V(t.type),
									size: "xs",
									children: B(t.type)
								})
							}),
							/* @__PURE__ */ E("td", {
								className: "p-2",
								children: /* @__PURE__ */ E(p, {
									tone: z(t.status),
									size: "sm",
									children: t.status
								})
							}),
							/* @__PURE__ */ E("td", {
								className: "p-2 text-text-secondary",
								children: t.lastSyncAt ? H(t.lastSyncAt) : "Never"
							}),
							/* @__PURE__ */ E("td", {
								"data-testid": `source-files-synced-${t.sourceId}`,
								className: "p-2 font-mono text-xs text-text-secondary",
								children: t.lastSyncStats ? /* @__PURE__ */ D("span", { children: [t.lastSyncStats.filesFound, t.lastSyncStats.filesNew > 0 ? /* @__PURE__ */ D("span", {
									className: "text-text-tertiary",
									children: [
										" · ",
										t.lastSyncStats.filesNew,
										" new"
									]
								}) : null] }) : "—"
							}),
							/* @__PURE__ */ E("td", {
								className: "p-2 text-right",
								children: /* @__PURE__ */ D("div", {
									className: "flex gap-1.5 justify-end",
									children: [/* @__PURE__ */ E("button", {
										className: f("px-2.5 py-1 text-[11px] font-medium rounded-[5px] cursor-pointer font-[inherit]", c.has(t.sourceId) || t.status === "paused" ? "border border-border bg-surface-inset text-text-tertiary opacity-70 cursor-not-allowed" : "border border-border bg-surface text-text-secondary"),
										disabled: c.has(t.sourceId) || t.status === "paused",
										onClick: () => void u(t.sourceId),
										"data-testid": `sync-${t.sourceId}`,
										children: c.has(t.sourceId) ? "Syncing..." : "Sync Now"
									}), /* @__PURE__ */ E("button", {
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
var W = "", te = [
	"extension",
	"path",
	"mimeType",
	"tag",
	"name"
], G = [
	"eq",
	"contains",
	"regex",
	"startsWith"
];
function K({ rules: t, onChange: n }) {
	let { idToken: r } = e(), [i, a] = w(null), [o, s] = w(""), [c, l] = w(null), [u, d] = w(!1), [p, m] = w(null), h = y((e) => {
		a(e), m({ ...t[e] });
	}, [t]), g = y(() => {
		a(null), m(null);
	}, []), b = y(() => {
		if (i === null || !p) return;
		let e = [...t];
		e[i] = p, n(e), a(null), m(null);
	}, [
		i,
		p,
		t,
		n
	]), x = y(() => {
		let e = {
			pattern: "",
			documentTypeId: "",
			priority: t.length > 0 ? Math.max(...t.map((e) => e.priority)) + 1 : 1
		}, r = [...t, e];
		n(r), a(r.length - 1), m(e);
	}, [t, n]), S = y((e) => {
		n(t.filter((t, n) => n !== e)), i === e ? (a(null), m(null)) : i !== null && i > e && a(i - 1);
	}, [
		t,
		n,
		i
	]), C = y((e) => {
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
	]), T = y((e) => {
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
	]), O = y(async () => {
		if (o.trim()) {
			d(!0), l(null);
			try {
				let e = { "Content-Type": "application/json" };
				r && (e.Authorization = `Bearer ${r}`);
				let n = await fetch(`${W}/api/ingest/mapping/preview`, {
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
	return /* @__PURE__ */ D("div", {
		className: "flex flex-col gap-2.5",
		"data-testid": "mapping-rule-editor",
		children: [
			t.length === 0 ? /* @__PURE__ */ E("div", {
				className: "p-4 text-center text-text-tertiary text-[13px]",
				children: "No mapping rules configured. Add one to get started."
			}) : /* @__PURE__ */ E("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ D("table", {
					className: "w-full border-collapse text-xs",
					children: [/* @__PURE__ */ E("thead", { children: /* @__PURE__ */ D("tr", { children: [
						/* @__PURE__ */ E("th", {
							className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Priority"
						}),
						/* @__PURE__ */ E("th", {
							className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Condition"
						}),
						/* @__PURE__ */ E("th", {
							className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Target Type ID"
						}),
						/* @__PURE__ */ E("th", {
							className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Pipeline"
						}),
						/* @__PURE__ */ E("th", {
							className: "px-2.5 py-2 font-semibold text-right border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Actions"
						})
					] }) }), /* @__PURE__ */ E("tbody", { children: t.map((e, n) => {
						let r = i === n && p !== null, a = k(e.pattern);
						if (r) {
							let e = k(p.pattern);
							return /* @__PURE__ */ D("tr", {
								className: "border-b border-border",
								children: [
									/* @__PURE__ */ E("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
										children: /* @__PURE__ */ E(_, {
											"aria-label": "Priority",
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
									/* @__PURE__ */ E("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
										children: /* @__PURE__ */ D("div", {
											className: "flex gap-1 items-center flex-wrap",
											children: [
												/* @__PURE__ */ E(v, {
													"aria-label": "Match field",
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
												/* @__PURE__ */ E(v, {
													"aria-label": "Match operator",
													size: "sm",
													className: "w-auto min-w-[90px]",
													value: e.op,
													onChange: (t) => m({
														...p,
														pattern: A(e.field, t.target.value, e.value)
													}),
													options: G.map((e) => ({
														value: e,
														label: e
													}))
												}),
												/* @__PURE__ */ E(_, {
													"aria-label": "Match value",
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
									/* @__PURE__ */ E("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
										children: /* @__PURE__ */ E(_, {
											"aria-label": "Target Type ID",
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
									/* @__PURE__ */ E("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
										children: /* @__PURE__ */ E(_, {
											"aria-label": "Pipeline",
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
									/* @__PURE__ */ E("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle text-right",
										children: /* @__PURE__ */ D("div", {
											className: "flex gap-1 justify-end",
											children: [/* @__PURE__ */ E("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: b,
												children: "Save"
											}), /* @__PURE__ */ E("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: g,
												children: "Cancel"
											})]
										})
									})
								]
							}, n);
						}
						return /* @__PURE__ */ D("tr", {
							className: "border-b border-border",
							children: [
								/* @__PURE__ */ E("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle font-mono font-semibold",
									children: e.priority
								}),
								/* @__PURE__ */ E("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
									children: /* @__PURE__ */ D("span", {
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
								/* @__PURE__ */ E("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle font-mono",
									children: e.documentTypeId || "—"
								}),
								/* @__PURE__ */ E("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-tertiary text-xs align-middle font-mono",
									children: e.pipelineId ?? "—"
								}),
								/* @__PURE__ */ E("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle text-right",
									children: /* @__PURE__ */ D("div", {
										className: "flex gap-1 justify-end",
										children: [
											/* @__PURE__ */ E("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: () => C(n),
												disabled: n === 0,
												title: "Move up",
												children: "↑"
											}),
											/* @__PURE__ */ E("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: () => T(n),
												disabled: n === t.length - 1,
												title: "Move down",
												children: "↓"
											}),
											/* @__PURE__ */ E("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: () => h(n),
												children: "Edit"
											}),
											/* @__PURE__ */ E("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-[var(--color-state-failed)] rounded bg-danger-bg cursor-pointer font-[inherit] text-[var(--color-state-failed)]",
												onClick: () => S(n),
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
			/* @__PURE__ */ E("div", {
				className: "flex gap-2.5 items-center",
				children: /* @__PURE__ */ E("button", {
					className: "px-3.5 py-1.5 text-xs font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary self-start",
					onClick: x,
					"data-testid": "add-rule-btn",
					children: "+ Add Rule"
				})
			}),
			/* @__PURE__ */ D("div", {
				className: "flex gap-2 items-center mt-1",
				children: [/* @__PURE__ */ E(_, {
					"aria-label": "Enter a file path to preview mapping",
					className: "flex-1",
					value: o,
					onChange: (e) => s(e.target.value),
					placeholder: "Enter a file path to preview mapping..."
				}), /* @__PURE__ */ E("button", {
					className: f("px-3.5 py-1.5 text-xs font-medium border border-primary rounded-md bg-info-bg cursor-pointer font-[inherit] text-primary self-start", (u || !o.trim()) && "opacity-50 cursor-not-allowed"),
					onClick: () => void O(),
					disabled: u || !o.trim(),
					children: u ? "Checking..." : "Preview"
				})]
			}),
			c && /* @__PURE__ */ E("div", {
				className: "p-3 bg-surface-inset border border-border rounded-md text-xs text-text-secondary font-mono whitespace-pre-wrap break-words",
				children: c
			})
		]
	});
}
//#endregion
//#region src/components/ingest/SourceSloPanel.tsx
var q = [
	"15m",
	"1h",
	"6h",
	"24h"
];
function J({ points: e, color: t, testId: n }) {
	let r = e.map((e) => ({
		at: e.at,
		value: e.value ?? null
	}));
	return /* @__PURE__ */ E("div", {
		"data-testid": n,
		className: "h-[60px]",
		children: /* @__PURE__ */ E(M, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ D(j, {
				data: r,
				margin: {
					top: 4,
					right: 4,
					left: 4,
					bottom: 4
				},
				children: [
					/* @__PURE__ */ E(P, { hide: !0 }),
					/* @__PURE__ */ E(N, {
						cursor: !1,
						contentStyle: {
							fontSize: 11,
							padding: "4px 6px"
						},
						formatter: ((e) => [e, ""])
					}),
					/* @__PURE__ */ E(A, {
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
function Y(e) {
	for (let t = e.length - 1; t >= 0; t--) if (e[t].value !== null) return e[t].value;
	return null;
}
function ne({ sourceId: e }) {
	let [t, n] = w("1h"), { metrics: r, error: i } = a(e, t);
	return /* @__PURE__ */ D("div", {
		"data-testid": "source-slo-panel",
		className: "px-4 py-3 bg-surface border border-border rounded-[10px] mb-4",
		children: [
			/* @__PURE__ */ D("div", {
				className: "flex items-center justify-between mb-2 gap-2",
				children: [/* @__PURE__ */ D("span", {
					className: "text-sm font-bold text-text-primary",
					children: [
						"Health (last ",
						t,
						")"
					]
				}), /* @__PURE__ */ E(v, {
					"data-testid": "slo-window-picker",
					"aria-label": "Window",
					className: "w-auto min-w-[100px]",
					value: t,
					onChange: (e) => n(e.target.value),
					options: q.map((e) => ({
						value: e,
						label: `Last ${e}`
					}))
				})]
			}),
			i ? /* @__PURE__ */ D("div", {
				"data-testid": "slo-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg text-xs",
				children: ["Couldn't load source metrics: ", i]
			}) : null,
			r ? /* @__PURE__ */ D("div", {
				className: "grid grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ D("div", {
						className: "px-2.5 py-2 bg-surface-inset rounded-lg",
						children: [
							/* @__PURE__ */ E("div", {
								className: "text-[11px] text-text-tertiary mb-1",
								children: "p95 latency"
							}),
							/* @__PURE__ */ E("div", {
								"data-testid": "slo-latency-value",
								className: "text-base font-bold text-text-primary",
								children: (() => {
									let e = Y(r.latencyP95);
									return e === null ? "—" : `${Math.round(e)} ms`;
								})()
							}),
							/* @__PURE__ */ E(J, {
								points: r.latencyP95,
								color: "var(--color-state-completed)",
								testId: "slo-latency-chart"
							})
						]
					}),
					/* @__PURE__ */ D("div", {
						className: "px-2.5 py-2 bg-surface-inset rounded-lg",
						children: [
							/* @__PURE__ */ E("div", {
								className: "text-[11px] text-text-tertiary mb-1",
								children: "error rate"
							}),
							/* @__PURE__ */ E("div", {
								"data-testid": "slo-error-rate-value",
								className: "text-base font-bold text-text-primary",
								children: (() => {
									let e = Y(r.errorRate);
									return e === null ? "—" : `${e.toFixed(1)}%`;
								})()
							}),
							/* @__PURE__ */ E(J, {
								points: r.errorRate,
								color: "var(--color-state-failed)",
								testId: "slo-error-rate-chart"
							})
						]
					}),
					/* @__PURE__ */ D("div", {
						className: "px-2.5 py-2 bg-surface-inset rounded-lg",
						children: [
							/* @__PURE__ */ E("div", {
								className: "text-[11px] text-text-tertiary mb-1",
								children: "queue depth"
							}),
							/* @__PURE__ */ E("div", {
								"data-testid": "slo-queue-depth-value",
								className: "text-base font-bold text-text-primary",
								children: Y(r.queueDepth) ?? 0
							}),
							/* @__PURE__ */ E(J, {
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
], X = "";
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
	let { id: t } = k(), n = O(), { idToken: r } = e(), { pipelines: i } = s(), { types: a } = d({ idToken: r }), [o, c] = w(null), [l, u] = w(!0), [m, g] = w(null), [S, C] = w(!1), A = x(), [j, M] = w(!1), [N, P] = w(!1), [F, ee] = w({}), [I, L] = w([]), [R, z] = w(""), [B, V] = w(""), [H, U] = w({}), [W, te] = w(!1), G = y(() => {
		let e = { "Content-Type": "application/json" };
		return r && (e.Authorization = `Bearer ${r}`), e;
	}, [r]), q = y(async (e) => {
		if (t) {
			u(!0), g(null);
			try {
				let n = await fetch(`${X}/api/ingest/sources/${t}`, {
					headers: G(),
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
				g(t instanceof Error ? t.message : String(t));
			} finally {
				e?.aborted || u(!1);
			}
		}
	}, [t, G]);
	b(() => {
		let e = new AbortController();
		return q(e.signal), () => e.abort();
	}, [q]);
	let J = y(() => {
		o && (ee({ ...o.config }), L([...o.mappingRules]), z(o.syncSchedule ?? ""), V(o.defaultPipelineId ?? ""), U({ ...o.pipelineByDocType ?? {} }), C(!0));
	}, [o]), Y = y(() => {
		C(!1);
	}, []), ue = y(async () => {
		if (!(!o || !t)) {
			P(!0);
			try {
				let e = {
					config: F,
					mappingRules: I,
					syncSchedule: R.trim() || null,
					defaultPipelineId: B.trim() || null,
					pipelineByDocType: H
				}, n = await fetch(`${X}/api/ingest/sources/${t}`, {
					method: "PUT",
					headers: G(),
					body: JSON.stringify(e)
				});
				if (!n.ok) throw Error(`HTTP ${n.status}`);
				let r = await n.json();
				c(r), C(!1);
			} catch (e) {
				g(e instanceof Error ? e.message : String(e));
			} finally {
				P(!1);
			}
		}
	}, [
		o,
		t,
		F,
		I,
		R,
		B,
		H,
		G
	]), de = S && o !== null && (JSON.stringify(F) !== JSON.stringify(o.config) || JSON.stringify(I) !== JSON.stringify(o.mappingRules) || R !== (o.syncSchedule ?? "") || B !== (o.defaultPipelineId ?? "") || JSON.stringify(H) !== JSON.stringify(o.pipelineByDocType ?? {}));
	b(() => {
		if (!de) return;
		let e = (e) => {
			e.preventDefault(), e.returnValue = "";
		};
		return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
	}, [de]);
	let Z = y(async () => {
		if (t) {
			M(!0);
			try {
				let e = await fetch(`${X}/api/ingest/sources/${t}/sync`, {
					method: "POST",
					headers: G()
				});
				if (!e.ok) throw Error(`HTTP ${e.status}`);
				await q();
			} catch (e) {
				g(e instanceof Error ? e.message : String(e));
			} finally {
				M(!1);
			}
		}
	}, [
		t,
		G,
		q
	]), fe = y(async () => {
		if (!o || !t) return;
		let e = o.status === "paused" ? "active" : "paused";
		try {
			let n = await fetch(`${X}/api/ingest/sources/${t}`, {
				method: "PATCH",
				headers: G(),
				body: JSON.stringify({ status: e })
			});
			if (!n.ok) throw Error(`HTTP ${n.status}`);
			let r = await n.json();
			c(r);
		} catch (e) {
			g(e instanceof Error ? e.message : String(e));
		}
	}, [
		o,
		t,
		G
	]);
	return l && !o ? /* @__PURE__ */ D("div", {
		"data-testid": "source-detail-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ E("div", {
				className: "flex items-center justify-between mb-4 flex-wrap gap-3",
				children: /* @__PURE__ */ E("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Source Detail"
				})
			}),
			/* @__PURE__ */ E(h, { height: 120 }),
			/* @__PURE__ */ E(h, { height: 200 }),
			/* @__PURE__ */ E(h, { height: 100 })
		]
	}) : m && !o ? /* @__PURE__ */ D("div", {
		"data-testid": "source-detail-page",
		className: "p-6 flex flex-col gap-3",
		children: [/* @__PURE__ */ E("div", {
			className: "flex items-center justify-between mb-4 flex-wrap gap-3",
			children: /* @__PURE__ */ E("button", {
				className: "text-[13px] text-primary cursor-pointer bg-transparent border-none font-[inherit] p-0 underline",
				onClick: () => n("/ingest/sources"),
				children: "Back to Sources"
			})
		}), /* @__PURE__ */ D("div", {
			className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3",
			role: "alert",
			children: [/* @__PURE__ */ D("span", {
				className: "text-[13px] font-medium",
				children: ["Failed to load source: ", m]
			}), /* @__PURE__ */ E("button", {
				onClick: () => void q(),
				className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
				children: "Retry"
			})]
		})]
	}) : o ? /* @__PURE__ */ D("div", {
		"data-testid": "source-detail-page",
		className: "p-6 flex flex-col gap-4",
		children: [
			/* @__PURE__ */ E("div", {
				className: "flex items-center justify-between mb-4 flex-wrap gap-3",
				children: /* @__PURE__ */ E("div", {
					className: "flex items-center gap-2.5",
					children: /* @__PURE__ */ E("button", {
						className: "text-[13px] text-primary cursor-pointer bg-transparent border-none font-[inherit] p-0 underline",
						onClick: () => n("/ingest/sources"),
						children: "Back to Sources"
					})
				})
			}),
			/* @__PURE__ */ D("div", {
				className: "flex items-center justify-between mb-4 flex-wrap gap-3",
				children: [/* @__PURE__ */ D("div", {
					className: "flex items-center gap-2.5",
					children: [
						/* @__PURE__ */ E("h2", {
							className: "m-0 text-[22px] font-bold text-text-primary",
							children: o.name
						}),
						/* @__PURE__ */ E(p, {
							tone: oe(o.type),
							size: "sm",
							children: ae(o.type)
						}),
						/* @__PURE__ */ E(p, {
							tone: ie(o.status),
							size: "sm",
							children: o.status
						})
					]
				}), /* @__PURE__ */ E("div", {
					className: "flex gap-2.5 items-center",
					children: S ? /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ E("button", {
						className: "px-3.5 py-1.5 text-[13px] font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary",
						onClick: Y,
						children: "Cancel"
					}), /* @__PURE__ */ E("button", {
						className: f("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]", N && "opacity-50 cursor-not-allowed"),
						onClick: () => void ue(),
						disabled: N,
						children: N ? "Saving..." : "Save Changes"
					})] }) : /* @__PURE__ */ E("button", {
						className: "px-3.5 py-1.5 text-[13px] font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary",
						onClick: J,
						children: "Edit"
					})
				})]
			}),
			m && /* @__PURE__ */ D("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3",
				role: "alert",
				children: [/* @__PURE__ */ E("span", {
					className: "text-[13px] font-medium",
					children: m
				}), /* @__PURE__ */ E("button", {
					onClick: () => g(null),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
					children: "Dismiss"
				})]
			}),
			/* @__PURE__ */ D("div", {
				className: "bg-surface border border-border rounded-[10px] p-4",
				children: [/* @__PURE__ */ E("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Configuration"
				}), S ? /* @__PURE__ */ E("div", { children: Object.entries(F).map(([e, t]) => /* @__PURE__ */ D("div", {
					className: "flex items-center gap-3 mb-2.5",
					children: [/* @__PURE__ */ E("label", {
						htmlFor: `${A}-cfg-${e}`,
						className: "text-xs font-semibold text-text-tertiary min-w-[140px]",
						children: e
					}), /* @__PURE__ */ E(_, {
						id: `${A}-cfg-${e}`,
						className: "flex-1",
						value: typeof t == "string" ? t : JSON.stringify(t),
						onChange: (t) => ee({
							...F,
							[e]: t.target.value
						})
					})]
				}, e)) }) : /* @__PURE__ */ D("div", { children: [Object.entries(o.config).map(([e, t]) => /* @__PURE__ */ D("div", {
					className: "flex items-center gap-3 py-1.5 border-b border-border",
					children: [/* @__PURE__ */ E("span", {
						className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight",
						children: e
					}), /* @__PURE__ */ E("span", {
						className: "text-[13px] text-text-secondary font-mono break-all",
						children: typeof t == "string" ? t : JSON.stringify(t)
					})]
				}, e)), Object.keys(o.config).length === 0 && /* @__PURE__ */ E("span", {
					className: "text-[13px] text-text-tertiary",
					children: "No configuration fields."
				})] })]
			}),
			o ? /* @__PURE__ */ E(ne, { sourceId: o.sourceId }) : null,
			/* @__PURE__ */ D("div", {
				className: "bg-surface border border-border rounded-[10px] p-4",
				children: [/* @__PURE__ */ E("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Mapping Rules"
				}), S ? /* @__PURE__ */ E(K, {
					rules: I,
					onChange: L
				}) : /* @__PURE__ */ E(K, {
					rules: o.mappingRules,
					onChange: () => {}
				})]
			}),
			/* @__PURE__ */ D("div", {
				className: "bg-surface border border-border rounded-[10px] p-4",
				children: [/* @__PURE__ */ D("div", {
					className: "flex items-center justify-between mb-3",
					children: [/* @__PURE__ */ E("div", {
						className: "text-sm font-semibold text-text-primary",
						children: "Sync History"
					}), /* @__PURE__ */ E("button", {
						className: f("px-3.5 py-1.5 text-[13px] font-medium rounded-md cursor-pointer font-[inherit]", j || o.status === "paused" ? "border border-border bg-surface-inset text-text-tertiary opacity-70 cursor-not-allowed" : "border border-primary bg-info-bg text-primary"),
						disabled: j || o.status === "paused",
						onClick: () => void Z(),
						"data-testid": "sync-now-btn",
						children: j ? "Syncing..." : "Sync Now"
					})]
				}), o.lastSyncAt ? /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ D("div", {
					className: "text-xs text-text-tertiary mb-2.5",
					children: [
						"Last synced: ",
						ce(o.lastSyncAt),
						" (",
						new Date(o.lastSyncAt).toLocaleString(),
						")"
					]
				}), o.lastSyncStats && /* @__PURE__ */ D("div", {
					className: "grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2.5",
					children: [
						/* @__PURE__ */ D("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ E("div", {
								className: "text-xl font-bold text-text-primary leading-none",
								children: o.lastSyncStats.filesDiscovered
							}), /* @__PURE__ */ E("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Found"
							})]
						}),
						/* @__PURE__ */ D("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ E("div", {
								className: "text-xl font-bold text-[var(--color-state-completed)] leading-none",
								children: o.lastSyncStats.filesIngested
							}), /* @__PURE__ */ E("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Ingested"
							})]
						}),
						/* @__PURE__ */ D("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ E("div", {
								className: "text-xl font-bold text-text-primary leading-none",
								children: o.lastSyncStats.filesSkipped
							}), /* @__PURE__ */ E("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Skipped"
							})]
						}),
						/* @__PURE__ */ D("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ E("div", {
								className: f("text-xl font-bold leading-none", o.lastSyncStats.filesFailed > 0 ? "text-[var(--color-state-failed)]" : "text-text-primary"),
								children: o.lastSyncStats.filesFailed
							}), /* @__PURE__ */ E("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Errors"
							})]
						}),
						/* @__PURE__ */ D("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ E("div", {
								className: "text-xl font-bold text-text-primary leading-none",
								children: se(o.lastSyncStats.durationMs)
							}), /* @__PURE__ */ E("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Duration"
							})]
						})
					]
				})] }) : /* @__PURE__ */ E("span", {
					className: "text-[13px] text-text-tertiary",
					children: "No sync history yet."
				})]
			}),
			/* @__PURE__ */ D("div", {
				className: "bg-surface border border-border rounded-[10px] p-4",
				children: [/* @__PURE__ */ E("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Settings"
				}), S ? /* @__PURE__ */ D("div", { children: [
					/* @__PURE__ */ D("div", {
						className: "flex items-center gap-3 mb-2.5",
						children: [/* @__PURE__ */ E("span", {
							id: `${A}-schedule-label`,
							className: "text-xs font-semibold text-text-tertiary min-w-[140px]",
							children: "Sync Schedule"
						}), /* @__PURE__ */ D("div", {
							role: "group",
							"aria-labelledby": `${A}-schedule-label`,
							className: "flex gap-2 flex-1 flex-wrap",
							children: [/* @__PURE__ */ E(v, {
								"aria-label": "Schedule preset",
								className: "w-auto min-w-[160px]",
								value: re.some((e) => e.cron === R) ? R : "__custom__",
								onChange: (e) => {
									e.target.value !== "__custom__" && z(e.target.value);
								},
								"data-testid": "schedule-preset",
								options: [...re.map((e) => ({
									value: e.cron,
									label: e.label
								})), {
									value: "__custom__",
									label: "Custom…"
								}]
							}), /* @__PURE__ */ E(_, {
								mono: !0,
								"aria-label": "Cron expression",
								className: "flex-1",
								value: R,
								onChange: (e) => z(e.target.value),
								placeholder: "Cron (e.g. 0 */6 * * *) — empty = manual",
								"data-testid": "schedule-cron"
							})]
						})]
					}),
					/* @__PURE__ */ D("div", {
						className: "flex items-center gap-3 mb-2.5",
						children: [/* @__PURE__ */ E("label", {
							htmlFor: `${A}-default-pipeline`,
							className: "text-xs font-semibold text-text-tertiary min-w-[140px]",
							children: "Default Pipeline"
						}), /* @__PURE__ */ E(v, {
							id: `${A}-default-pipeline`,
							className: "flex-1",
							value: B,
							onChange: (e) => V(e.target.value),
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
								...B && !i.some((e) => e.id === B) ? [{
									value: B,
									label: `${B} (unknown)`
								}] : []
							]
						})]
					}),
					/* @__PURE__ */ D("div", {
						className: "flex items-center gap-3 mb-2.5",
						children: [/* @__PURE__ */ E("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[140px]",
							children: "Pipeline overrides"
						}), /* @__PURE__ */ D("div", {
							className: "flex-1 flex flex-col gap-2",
							children: [/* @__PURE__ */ D("button", {
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
							}), W ? /* @__PURE__ */ D("div", {
								"data-testid": "overrides-section",
								className: "flex flex-col gap-1.5",
								children: [Object.keys(H).length === 0 ? /* @__PURE__ */ E("div", {
									className: "text-xs text-text-tertiary",
									children: "No overrides — every matched type uses the default pipeline."
								}) : Object.entries(H).map(([e, t]) => /* @__PURE__ */ D("div", {
									className: "flex gap-2 items-center",
									children: [
										/* @__PURE__ */ E("span", {
											className: "flex-[0_0_160px] text-[13px]",
											children: a.find((t) => t.id === e)?.name ?? e
										}),
										/* @__PURE__ */ E(v, {
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
										/* @__PURE__ */ E("button", {
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
								}, e)), /* @__PURE__ */ E(v, {
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
				] }) : /* @__PURE__ */ D("div", { children: [
					/* @__PURE__ */ D("div", {
						className: "flex items-center gap-3 py-1.5 border-b border-border",
						children: [/* @__PURE__ */ E("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight",
							children: "Sync Schedule"
						}), /* @__PURE__ */ E("span", {
							className: "text-[13px] text-text-secondary font-mono break-all",
							children: o.syncSchedule ?? "Manual (no schedule)"
						})]
					}),
					/* @__PURE__ */ D("div", {
						className: "flex items-center gap-3 py-1.5 border-b border-border",
						children: [/* @__PURE__ */ E("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight",
							children: "Default Pipeline"
						}), /* @__PURE__ */ E("span", {
							className: "text-[13px] text-text-secondary font-mono break-all",
							children: o.defaultPipelineId ? i.find((e) => e.id === o.defaultPipelineId)?.name ?? o.defaultPipelineId : "—"
						})]
					}),
					/* @__PURE__ */ D("div", {
						className: "flex items-center gap-3 py-1.5",
						children: [/* @__PURE__ */ E("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight",
							children: "Status"
						}), /* @__PURE__ */ D("span", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ E(p, {
								tone: ie(o.status),
								size: "sm",
								children: o.status
							}), /* @__PURE__ */ E("button", {
								className: f("px-3.5 py-1.5 text-xs font-medium rounded-md cursor-pointer font-[inherit] border-none text-white", o.status === "paused" ? "bg-state-completed" : "bg-state-awaiting"),
								onClick: () => void fe(),
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
var de = "", Z = [
	"queued",
	"mapping",
	"materializing",
	"triggering",
	"done"
];
function fe(e) {
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
function pe(e) {
	switch (e) {
		case "rule": return "neutral";
		case "llm-match": return "info";
		case "llm-generate": return "purple";
		default: return "neutral";
	}
}
function me(e) {
	switch (e) {
		case "rule": return "Matched a configured rule";
		case "llm-match": return "LLM matched to existing DocType";
		case "llm-generate": return "LLM proposed a new DocType";
		default: return e;
	}
}
function he(e, t) {
	if (t === "failed") return e === "queued";
	let n = Z;
	return n.indexOf(e) <= n.indexOf(t);
}
function Q(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : `${Math.floor(t / 864e5)}d ago`;
}
function ge({ item: t, sourceName: n, onClose: r, onRetry: i, onSkip: a }) {
	let { idToken: s } = e(), [c, l] = w(null), [u, d] = w(null), { events: m } = o();
	b(() => {
		if (!t) return;
		let e = (e) => {
			e.key === "Escape" && r();
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [t, r]);
	let h = S(() => {
		if (!t) return /* @__PURE__ */ new Map();
		let e = /* @__PURE__ */ new Map();
		for (let n of m) n.ingestId === t.itemId && (n.type === "item.status" && typeof n.status == "string" && typeof n.timestamp == "string" && e.set(n.status, n.timestamp), n.type === "item.materialized" && typeof n.timestamp == "string" && e.set("done", n.timestamp), n.type === "item.failed" && typeof n.timestamp == "string" && e.set("failed", n.timestamp));
		return e;
	}, [m, t]);
	if (!t) return null;
	let g = t.status === "failed", _ = t.status === "done" || t.status === "failed", v = typeof t.mappingConfidence == "number" ? t.mappingConfidence : null, y = async () => {
		l("retry");
		try {
			await i(t.itemId);
		} finally {
			l(null), r();
		}
	}, x = async () => {
		l("skip");
		try {
			await a(t.itemId);
		} finally {
			l(null), r();
		}
	}, C = async () => {
		l("remap"), d(null);
		try {
			let e = { "Content-Type": "application/json" };
			s && (e.Authorization = `Bearer ${s}`);
			let n = await fetch(`${de}/api/ingest/items/${t.itemId}/remap`, {
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
	return /* @__PURE__ */ E("div", {
		className: "fixed inset-0 bg-black/35 z-[9999] flex justify-end",
		onClick: r,
		"data-testid": "ingest-item-drawer-scrim",
		children: /* @__PURE__ */ D("div", {
			className: "w-[min(560px,100vw)] h-full bg-surface shadow-[-12px_0_32px_rgba(0,0,0,0.12)] overflow-y-auto font-[inherit] flex flex-col",
			onClick: (e) => e.stopPropagation(),
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Ingest item details",
			"data-testid": "ingest-item-drawer",
			children: [
				/* @__PURE__ */ D("div", {
					className: "px-5 py-4 border-b border-border flex items-center justify-between sticky top-0 bg-surface z-[1]",
					children: [/* @__PURE__ */ E("h3", {
						className: "text-base font-bold text-text-primary m-0",
						children: "Ingest Item"
					}), /* @__PURE__ */ E("button", {
						className: "bg-transparent border-none text-[22px] leading-none cursor-pointer text-text-tertiary p-1 font-[inherit]",
						onClick: r,
						"aria-label": "Close",
						"data-testid": "ingest-item-drawer-close",
						children: "×"
					})]
				}),
				/* @__PURE__ */ D("div", {
					className: "p-5 flex flex-col gap-4.5 flex-1",
					children: [
						/* @__PURE__ */ D("div", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ E("div", {
									className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
									children: "Source path"
								}),
								/* @__PURE__ */ E("div", {
									className: "font-mono text-xs text-text-primary bg-surface-inset border border-border rounded-md px-2.5 py-2 break-all",
									children: t.sourcePath
								}),
								/* @__PURE__ */ D("div", {
									className: "flex gap-2 items-center mt-1",
									children: [
										/* @__PURE__ */ E(p, {
											tone: fe(t.status),
											size: "sm",
											children: t.status
										}),
										n && /* @__PURE__ */ D("span", {
											className: "text-xs text-text-tertiary",
											children: ["from ", /* @__PURE__ */ E("strong", {
												className: "text-text-secondary",
												children: n
											})]
										}),
										/* @__PURE__ */ D("span", {
											className: "text-xs text-text-tertiary ml-auto",
											children: ["Updated ", Q(t.updatedAt)]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ D("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ E("div", {
								className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
								children: "Status timeline"
							}), /* @__PURE__ */ D("div", {
								className: "flex flex-col relative",
								children: [Z.map((e, n) => {
									let r = he(e, t.status), i = e === t.status, a = g && n === 0, o = {
										...r ? {
											background: a ? "var(--color-state-failed)" : "var(--color-state-completed)",
											borderColor: a ? "var(--color-state-failed)" : "var(--color-state-completed)"
										} : {},
										...i && !_ ? {
											background: "var(--color-state-running)",
											borderColor: "var(--color-state-running)"
										} : {}
									};
									return /* @__PURE__ */ D("div", {
										className: "flex items-start gap-3 relative py-1.5",
										children: [
											n < Z.length - 1 && /* @__PURE__ */ E("span", {
												className: "absolute left-[5px] top-[18px] bottom-[-6px] w-0.5 bg-border",
												"aria-hidden": "true"
											}),
											/* @__PURE__ */ E("span", {
												className: "w-3 h-3 rounded-full shrink-0 mt-1 border-2 border-border bg-surface",
												style: o,
												"aria-hidden": "true"
											}),
											/* @__PURE__ */ D("div", { children: [/* @__PURE__ */ E("div", {
												className: "text-[13px] font-medium text-text-primary",
												children: e
											}), (() => {
												let n = h.get(e);
												return n ? /* @__PURE__ */ E("div", {
													"data-testid": `timeline-meta-${e}`,
													className: "text-[11px] text-text-tertiary mt-0.5",
													children: Q(n)
												}) : i ? /* @__PURE__ */ E("div", {
													"data-testid": `timeline-meta-${e}`,
													className: "text-[11px] text-text-tertiary mt-0.5",
													children: _ ? Q(t.updatedAt) : "in progress"
												}) : null;
											})()] })
										]
									}, e);
								}), g && /* @__PURE__ */ D("div", {
									className: "flex items-start gap-3 relative py-1.5",
									children: [/* @__PURE__ */ E("span", { className: "w-3 h-3 rounded-full shrink-0 mt-1 border-2 bg-state-failed border-state-failed" }), /* @__PURE__ */ D("div", { children: [/* @__PURE__ */ E("div", {
										className: "text-[13px] font-medium text-[var(--color-state-failed)]",
										children: "failed"
									}), /* @__PURE__ */ E("div", {
										"data-testid": "timeline-meta-failed",
										className: "text-[11px] text-text-tertiary mt-0.5",
										children: Q(h.get("failed") ?? t.updatedAt)
									})] })]
								})]
							})]
						}),
						/* @__PURE__ */ D("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ E("div", {
								className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
								children: "Mapping decision"
							}), t.mappingMethod ? /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ D("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ E(p, {
									tone: pe(t.mappingMethod),
									size: "sm",
									children: t.mappingMethod
								}), /* @__PURE__ */ E("span", {
									className: "text-xs text-text-secondary",
									children: me(t.mappingMethod)
								})]
							}), v !== null && /* @__PURE__ */ D("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ E("div", {
									className: "flex-1 h-2 bg-surface-inset rounded overflow-hidden border border-border",
									children: /* @__PURE__ */ E("div", {
										className: "h-full transition-[width] duration-200 ease-out",
										style: {
											width: `${Math.round(v * 100)}%`,
											background: v >= .7 ? "var(--color-state-completed)" : v >= .4 ? "var(--color-state-awaiting)" : "var(--color-state-failed)"
										}
									})
								}), /* @__PURE__ */ D("span", {
									className: "font-mono text-xs text-text-secondary min-w-[48px] text-right",
									children: [(v * 100).toFixed(0), "%"]
								})]
							})] }) : /* @__PURE__ */ D("span", {
								className: "text-xs text-text-tertiary",
								children: [
									"No mapping decision yet — item is still in ",
									t.status,
									"."
								]
							})]
						}),
						/* @__PURE__ */ D("div", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ E("div", {
									className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
									children: "Identity"
								}),
								/* @__PURE__ */ D("div", {
									className: "flex items-center gap-3 py-1.5 border-b border-border",
									children: [/* @__PURE__ */ E("span", {
										className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight",
										children: "Item ID"
									}), /* @__PURE__ */ E("span", {
										className: "text-[13px] text-text-secondary font-mono break-all",
										children: t.itemId
									})]
								}),
								/* @__PURE__ */ D("div", {
									className: "flex items-center gap-3 py-1.5 border-b border-border",
									children: [/* @__PURE__ */ E("span", {
										className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight",
										children: "Document Type"
									}), /* @__PURE__ */ E("span", {
										className: "text-[13px] text-text-secondary font-mono break-all",
										children: t.documentTypeId ?? "—"
									})]
								}),
								/* @__PURE__ */ D("div", {
									className: "flex items-center gap-3 py-1.5 border-b border-border",
									children: [/* @__PURE__ */ E("span", {
										className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight",
										children: "Document"
									}), /* @__PURE__ */ E("span", {
										className: "text-[13px] text-text-secondary font-mono break-all",
										children: t.documentId ? /* @__PURE__ */ E("a", {
											href: `/documents/${t.documentId}`,
											className: "text-primary",
											children: t.documentId
										}) : "—"
									})]
								}),
								/* @__PURE__ */ D("div", {
									className: "flex items-center gap-3 py-1.5",
									children: [/* @__PURE__ */ E("span", {
										className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight",
										children: "Pipeline Run"
									}), /* @__PURE__ */ E("span", {
										className: "text-[13px] text-text-secondary font-mono break-all",
										children: t.pipelineRunId ?? "—"
									})]
								})
							]
						}),
						t.error && /* @__PURE__ */ D("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ E("div", {
								className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
								children: "Error"
							}), /* @__PURE__ */ E("div", {
								className: "bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-md p-2.5 text-xs font-mono whitespace-pre-wrap break-words",
								children: t.error
							})]
						}),
						u && /* @__PURE__ */ D("div", {
							className: "bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-md p-2.5 text-xs font-mono whitespace-pre-wrap break-words",
							children: ["Re-map failed: ", u]
						})
					]
				}),
				/* @__PURE__ */ D("div", {
					className: "px-4 py-4 border-t border-border flex gap-2 justify-end flex-wrap bg-surface sticky bottom-0",
					children: [
						/* @__PURE__ */ E("button", {
							className: f("px-3.5 py-1.5 text-[13px] font-medium font-[inherit] rounded-md cursor-pointer bg-surface border border-border text-text-secondary", (c || t.status === "done") && "opacity-50 cursor-not-allowed"),
							onClick: () => void C(),
							disabled: !!c || t.status === "done",
							"data-testid": "item-remap-btn",
							title: "Re-run the mapping engine for this item",
							children: c === "remap" ? "Re-mapping…" : "Re-map"
						}),
						/* @__PURE__ */ E("button", {
							className: f("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] rounded-md cursor-pointer", c || !g ? "bg-surface border border-border text-text-secondary opacity-50 cursor-not-allowed" : "bg-primary border-none text-white"),
							onClick: () => void y(),
							disabled: !!c || !g,
							"data-testid": "item-retry-btn",
							title: g ? "Retry this item from the beginning" : "Only failed items can be retried",
							children: c === "retry" ? "Retrying…" : "Retry"
						}),
						/* @__PURE__ */ E("button", {
							className: f("px-3.5 py-1.5 text-[13px] font-medium font-[inherit] rounded-md cursor-pointer", c || t.status === "done" ? "bg-surface border border-border text-text-secondary opacity-50 cursor-not-allowed" : "bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)]"),
							onClick: () => void x(),
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
var _e = [
	"queued",
	"mapping",
	"materializing",
	"triggering",
	"done",
	"failed"
];
function ve(e) {
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
function ye(e) {
	switch (e) {
		case "rule": return "neutral";
		case "llm-match": return "info";
		case "llm-generate": return "purple";
		default: return "neutral";
	}
}
function be(e, t = 50) {
	return e.length <= t ? e : "..." + e.slice(e.length - t + 3);
}
function xe() {
	let [e, n] = w(null), [r, i] = w(null), [a, o] = w(null), { sources: s } = t(), { items: l, loading: u, error: d, refresh: f, retryItem: _, skipItem: b } = c({
		sourceId: e,
		status: r
	}), x = a ? l.find((e) => e.itemId === a.itemId) ?? a : null, C = S(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of s) e.set(t.sourceId, t.name);
		return e;
	}, [s]), T = y(async (e) => {
		await _(e);
	}, [_]), O = y(async (e) => {
		await b(e);
	}, [b]);
	return u && l.length === 0 ? /* @__PURE__ */ D("div", {
		"data-testid": "ingest-items-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ E("div", {
				className: "flex items-center justify-between mb-4",
				children: /* @__PURE__ */ E("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Ingest Items"
				})
			}),
			/* @__PURE__ */ E(h, { height: 48 }),
			/* @__PURE__ */ E(h, { height: 48 }),
			/* @__PURE__ */ E(h, { height: 48 })
		]
	}) : /* @__PURE__ */ D("div", {
		"data-testid": "ingest-items-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ E("div", {
				className: "flex items-center justify-between mb-4",
				children: /* @__PURE__ */ D("div", { children: [/* @__PURE__ */ E("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Ingest Items"
				}), /* @__PURE__ */ D("span", {
					className: "text-[13px] text-text-tertiary",
					children: [
						l.length,
						" item",
						l.length === 1 ? "" : "s"
					]
				})] })
			}),
			/* @__PURE__ */ D("div", {
				className: "flex gap-2.5 items-center mb-3 flex-wrap",
				children: [
					/* @__PURE__ */ E(v, {
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
					/* @__PURE__ */ E(v, {
						"aria-label": "Filter by status",
						className: "w-auto",
						value: r ?? "",
						onChange: (e) => i(e.target.value || null),
						"data-testid": "status-filter",
						options: [{
							value: "",
							label: "All"
						}, ..._e.map((e) => ({
							value: e,
							label: e
						}))]
					}),
					/* @__PURE__ */ E("button", {
						className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
						onClick: () => void f(),
						"data-testid": "refresh-btn",
						children: "Refresh"
					})
				]
			}),
			d && /* @__PURE__ */ D("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4",
				role: "alert",
				children: [/* @__PURE__ */ E("span", {
					className: "text-[13px] font-medium",
					children: "Failed to load ingest items."
				}), /* @__PURE__ */ E("button", {
					onClick: () => void f(),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
					children: "Retry"
				})]
			}),
			!d && l.length === 0 ? /* @__PURE__ */ E(m, {
				icon: "📋",
				title: "No items found",
				body: "No ingest items match the current filters."
			}) : !d && /* @__PURE__ */ E("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ D("table", {
					className: "w-full border-collapse text-[13px]",
					children: [/* @__PURE__ */ E("thead", { children: /* @__PURE__ */ D("tr", {
						className: "border-b border-border",
						children: [
							/* @__PURE__ */ E("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "File Path"
							}),
							/* @__PURE__ */ E("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Source"
							}),
							/* @__PURE__ */ E("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Status"
							}),
							/* @__PURE__ */ E("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Type"
							}),
							/* @__PURE__ */ E("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Method"
							}),
							/* @__PURE__ */ E("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Document"
							}),
							/* @__PURE__ */ E("th", {
								className: "p-2 text-right text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ E("tbody", { children: l.map((e) => /* @__PURE__ */ D("tr", {
						className: "border-b border-border cursor-pointer hover:bg-surface-hover",
						onClick: () => o(e),
						onKeyDown: g(() => o(e)),
						role: "button",
						tabIndex: 0,
						"aria-label": `Open details for ${e.sourcePath}`,
						"data-testid": `item-row-${e.itemId}`,
						children: [
							/* @__PURE__ */ E("td", {
								className: "p-2 font-medium text-text-primary max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap",
								title: e.sourcePath,
								children: be(e.sourcePath)
							}),
							/* @__PURE__ */ E("td", {
								className: "p-2 text-text-secondary",
								children: C.get(e.sourceId) ?? e.sourceId.slice(0, 8)
							}),
							/* @__PURE__ */ E("td", {
								className: "p-2",
								children: /* @__PURE__ */ E(p, {
									tone: ve(e.status),
									size: "sm",
									children: e.status
								})
							}),
							/* @__PURE__ */ E("td", {
								className: "p-2 font-mono text-[11px] text-text-secondary",
								children: e.documentTypeId ?? "—"
							}),
							/* @__PURE__ */ E("td", {
								className: "p-2",
								children: e.mappingMethod ? /* @__PURE__ */ E(p, {
									tone: ye(e.mappingMethod),
									size: "xs",
									children: e.mappingMethod
								}) : "—"
							}),
							/* @__PURE__ */ E("td", {
								className: "p-2",
								children: e.documentId ? /* @__PURE__ */ D("a", {
									href: `/documents/${e.documentId}`,
									className: "text-primary no-underline font-medium text-xs",
									onClick: (e) => e.stopPropagation(),
									onKeyDown: (e) => e.stopPropagation(),
									children: [e.documentId.slice(0, 8), "..."]
								}) : "—"
							}),
							/* @__PURE__ */ E("td", {
								className: "p-2 text-right",
								onClick: (e) => e.stopPropagation(),
								onKeyDown: (e) => e.stopPropagation(),
								children: /* @__PURE__ */ D("div", {
									className: "flex gap-1.5 justify-end",
									children: [e.status === "failed" && /* @__PURE__ */ E("button", {
										className: "px-2.5 py-1 text-[11px] font-medium border border-border rounded-[5px] bg-surface cursor-pointer font-[inherit] text-text-secondary",
										onClick: () => void T(e.itemId),
										"data-testid": `retry-${e.itemId}`,
										children: "Retry"
									}), e.status !== "done" && /* @__PURE__ */ E("button", {
										className: "px-2.5 py-1 text-[11px] font-medium border border-[var(--color-state-failed)] rounded-[5px] bg-danger-bg cursor-pointer font-[inherit] text-[var(--color-state-failed)]",
										onClick: () => void O(e.itemId),
										"data-testid": `skip-${e.itemId}`,
										children: "Skip"
									})]
								})
							})
						]
					}, e.itemId)) })]
				})
			}),
			/* @__PURE__ */ E(ge, {
				item: x,
				sourceName: x ? C.get(x.sourceId) : void 0,
				onClose: () => o(null),
				onRetry: async (e) => {
					await T(e);
				},
				onSkip: async (e) => {
					await O(e);
				}
			})
		]
	});
}
//#endregion
//#region src/components/ingest/IngestAuditPage.tsx
var Se = [
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
], Ce = [
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
function we() {
	let [e, t] = w("24h"), [n, r] = w(""), [a, o] = w(""), [s, c] = w(""), l = x(), [u, d] = w(null), f = S(() => {
		let t = Ce.find((t) => t.value === e);
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
	]), { entries: p, loading: g, error: y } = i(f);
	return /* @__PURE__ */ D("div", {
		"data-testid": "ingest-audit-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ E("div", {
				className: "mb-3",
				children: /* @__PURE__ */ E("div", {
					className: "text-[22px] font-bold text-text-primary",
					children: "Audit log"
				})
			}),
			/* @__PURE__ */ D("div", {
				className: "flex gap-2 flex-wrap items-center p-3 bg-surface-inset rounded-lg mb-3",
				children: [
					/* @__PURE__ */ E("label", {
						htmlFor: `${l}-time`,
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Time"
					}),
					/* @__PURE__ */ E(v, {
						id: `${l}-time`,
						"data-testid": "audit-time-range",
						className: "w-auto min-w-[140px]",
						value: e,
						onChange: (e) => t(e.target.value),
						options: Ce.map((e) => ({
							value: e.value,
							label: e.label
						}))
					}),
					/* @__PURE__ */ E("label", {
						htmlFor: `${l}-event`,
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Event"
					}),
					/* @__PURE__ */ E(v, {
						id: `${l}-event`,
						"data-testid": "audit-event-type",
						className: "w-auto min-w-[140px]",
						value: n,
						onChange: (e) => r(e.target.value),
						options: Se.map((e) => ({
							value: e.value,
							label: e.label
						}))
					}),
					/* @__PURE__ */ E("label", {
						htmlFor: `${l}-actor`,
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Actor"
					}),
					/* @__PURE__ */ E(_, {
						id: `${l}-actor`,
						"data-testid": "audit-actor",
						className: "w-auto min-w-[140px]",
						value: a,
						onChange: (e) => o(e.target.value),
						placeholder: "email or system"
					}),
					/* @__PURE__ */ E("label", {
						htmlFor: `${l}-target`,
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Target"
					}),
					/* @__PURE__ */ E(_, {
						id: `${l}-target`,
						"data-testid": "audit-target-id",
						className: "w-auto min-w-[140px]",
						value: s,
						onChange: (e) => c(e.target.value),
						placeholder: "sourceId / itemId"
					})
				]
			}),
			y ? /* @__PURE__ */ D("div", {
				"data-testid": "audit-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3",
				children: ["Couldn't load audit log: ", y]
			}) : null,
			g && p.length === 0 ? /* @__PURE__ */ E("div", { children: /* @__PURE__ */ E(h, { height: 200 }) }) : p.length === 0 && !y ? /* @__PURE__ */ E(m, {
				icon: "📜",
				title: "No audit entries",
				body: "Mapping decisions, source changes, and write-back attempts will appear here once instrumentation is wired (hub#2215).",
				testId: "audit-empty"
			}) : /* @__PURE__ */ D("table", {
				"data-testid": "audit-table",
				className: "w-full border-collapse bg-surface border border-border rounded-[10px] overflow-hidden",
				children: [/* @__PURE__ */ E("thead", { children: /* @__PURE__ */ D("tr", { children: [
					/* @__PURE__ */ E("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Time"
					}),
					/* @__PURE__ */ E("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Actor"
					}),
					/* @__PURE__ */ E("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Event"
					}),
					/* @__PURE__ */ E("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Target"
					}),
					/* @__PURE__ */ E("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Summary"
					}),
					/* @__PURE__ */ E("th", { className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border" })
				] }) }), /* @__PURE__ */ E("tbody", { children: p.map((e) => /* @__PURE__ */ E(Te, {
					entry: e,
					expanded: u === e.auditId,
					onToggle: () => d(u === e.auditId ? null : e.auditId)
				}, e.auditId)) })]
			})
		]
	});
}
function Te({ entry: e, expanded: t, onToggle: n }) {
	return /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ D("tr", {
		"data-testid": `audit-row-${e.auditId}`,
		children: [
			/* @__PURE__ */ E("td", {
				className: "text-[13px] p-2 align-top border-b border-border font-mono text-xs",
				children: e.createdAt.slice(0, 19).replace("T", " ")
			}),
			/* @__PURE__ */ E("td", {
				className: "text-[13px] p-2 align-top border-b border-border",
				children: e.actor
			}),
			/* @__PURE__ */ E("td", {
				className: "text-[13px] p-2 align-top border-b border-border font-mono text-xs",
				children: e.eventType
			}),
			/* @__PURE__ */ D("td", {
				className: "text-[13px] p-2 align-top border-b border-border font-mono text-xs",
				title: e.targetId,
				children: [
					e.targetType,
					"/",
					e.targetId.slice(0, 12)
				]
			}),
			/* @__PURE__ */ E("td", {
				className: "text-[13px] p-2 align-top border-b border-border",
				children: e.summary
			}),
			/* @__PURE__ */ E("td", {
				className: "text-[13px] p-2 align-top border-b border-border",
				children: /* @__PURE__ */ E("button", {
					"data-testid": `audit-detail-toggle-${e.auditId}`,
					className: "text-[11px] text-primary bg-transparent border-none p-0 cursor-pointer underline",
					onClick: n,
					children: t ? "hide" : "detail"
				})
			})
		]
	}), t ? /* @__PURE__ */ E("tr", { children: /* @__PURE__ */ E("td", {
		colSpan: 6,
		className: "text-[13px] p-2 align-top border-b border-border",
		children: /* @__PURE__ */ E("pre", {
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
function Ee(e) {
	if (e == null) return "—";
	if (typeof e == "string") return e;
	try {
		return JSON.stringify(e, null, 2);
	} catch {
		return String(e);
	}
}
function De() {
	let { conflicts: e, loading: n, error: r, usingMock: i, refresh: a, resolveConflict: o, discardConflict: s } = l(), { sources: c } = t(), [u, d] = w(null), [g, v] = w("platform"), [y, x] = w({}), [C, T] = w(""), [O, k] = w(!1), A = S(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of c) e.set(t.sourceId, t.name);
		return e;
	}, [c]), j = S(() => e.filter((e) => e.status === "pending"), [e]);
	b(() => {
		u && j.some((e) => e.conflictId === u) || d(j[0]?.conflictId ?? null);
	}, [j, u]);
	let M = S(() => j.find((e) => e.conflictId === u) ?? null, [j, u]);
	b(() => {
		v("platform"), x({}), T("");
	}, [u]);
	let N = async () => {
		if (M) {
			k(!0);
			try {
				let e = {
					pick: g,
					...Object.keys(y).length > 0 ? { fieldChoices: y } : {},
					...C.trim() ? { note: C.trim() } : {}
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
	return n && e.length === 0 ? /* @__PURE__ */ D("div", {
		"data-testid": "conflicts-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ E("div", {
				className: "flex items-center justify-between mb-3",
				children: /* @__PURE__ */ E("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Sync Conflicts"
				})
			}),
			/* @__PURE__ */ E(h, { height: 48 }),
			/* @__PURE__ */ E(h, { height: 200 })
		]
	}) : /* @__PURE__ */ D("div", {
		"data-testid": "conflicts-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ D("div", {
				className: "flex items-center justify-between mb-3",
				children: [/* @__PURE__ */ D("div", { children: [/* @__PURE__ */ E("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Sync Conflicts"
				}), /* @__PURE__ */ D("span", {
					className: "text-[13px] text-text-tertiary",
					children: [
						j.length,
						" pending",
						(j.length, ""),
						" • ",
						e.length - j.length,
						" resolved"
					]
				})] }), /* @__PURE__ */ E("button", {
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
					onClick: () => void a(),
					"data-testid": "conflicts-refresh",
					children: "Refresh"
				})]
			}),
			i && /* @__PURE__ */ D("div", {
				className: "px-3.5 py-2.5 bg-warning-bg border border-[var(--color-state-awaiting)] text-warning-fg rounded-lg text-xs mb-3",
				"data-testid": "conflicts-mock-banner",
				children: [
					"Showing mock conflicts — backend endpoint ",
					/* @__PURE__ */ E("code", { children: "/api/sync/conflicts" }),
					" not implemented yet."
				]
			}),
			r && !i && /* @__PURE__ */ E("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-3",
				role: "alert",
				children: /* @__PURE__ */ D("span", {
					className: "text-[13px]",
					children: ["Failed to load conflicts: ", r]
				})
			}),
			j.length === 0 ? /* @__PURE__ */ E(m, {
				icon: "✅",
				title: "No pending conflicts",
				body: "Write-back conflicts that need operator intervention will appear here."
			}) : /* @__PURE__ */ D("div", {
				className: "grid grid-cols-[320px_1fr] gap-4 items-start",
				children: [/* @__PURE__ */ D("div", {
					className: "bg-surface border border-border rounded-[10px] overflow-hidden",
					"data-testid": "conflicts-list",
					children: [/* @__PURE__ */ D("div", {
						className: "px-3.5 py-2.5 border-b border-border text-xs font-semibold text-text-tertiary uppercase tracking-wide bg-surface-panel",
						children: [
							"Pending (",
							j.length,
							")"
						]
					}), j.map((e) => {
						let t = e.conflictId === u;
						return /* @__PURE__ */ D("button", {
							type: "button",
							"aria-pressed": t,
							className: f("px-3.5 py-2.5 border-b border-border cursor-pointer flex flex-col gap-1", "text-left w-full bg-transparent border-x-0 border-t-0 font-[inherit]", t && "bg-primary-bg"),
							onClick: () => d(e.conflictId),
							"data-testid": `conflict-row-${e.conflictId}`,
							children: [/* @__PURE__ */ E("div", {
								className: "text-[13px] font-semibold text-text-primary leading-tight line-clamp-2",
								children: e.summary
							}), /* @__PURE__ */ D("div", {
								className: "flex gap-1.5 items-center flex-wrap text-[11px] text-text-tertiary",
								children: [
									/* @__PURE__ */ D(p, {
										tone: "warning",
										size: "xs",
										children: [
											e.fields.length,
											" field",
											e.fields.length === 1 ? "" : "s"
										]
									}),
									/* @__PURE__ */ E("span", { children: A.get(e.sourceId) ?? e.sourceId.slice(0, 10) }),
									/* @__PURE__ */ E("span", { children: "•" }),
									/* @__PURE__ */ E("span", { children: $(e.detectedAt) })
								]
							})]
						}, e.conflictId);
					})]
				}), M && /* @__PURE__ */ D("div", {
					className: "bg-surface border border-border rounded-[10px] p-4.5 flex flex-col gap-4",
					"data-testid": "conflict-detail",
					children: [
						/* @__PURE__ */ D("div", {
							className: "flex items-start justify-between gap-3 flex-wrap",
							children: [/* @__PURE__ */ D("div", { children: [
								/* @__PURE__ */ E("h3", {
									className: "m-0 text-base font-bold text-text-primary",
									children: M.summary
								}),
								/* @__PURE__ */ D("div", {
									className: "mt-1.5 flex gap-2 items-center flex-wrap",
									children: [
										/* @__PURE__ */ E(p, {
											tone: "info",
											size: "xs",
											children: A.get(M.sourceId) ?? M.sourceId
										}),
										M.documentTypeId && /* @__PURE__ */ E(p, {
											tone: "purple",
											size: "xs",
											children: M.documentTypeId
										}),
										/* @__PURE__ */ D("span", {
											className: "text-[11px] text-text-tertiary",
											children: ["Detected ", $(M.detectedAt)]
										})
									]
								}),
								/* @__PURE__ */ E("div", {
									className: "text-xs text-text-tertiary font-mono break-all mt-1.5",
									children: M.sourceRef
								})
							] }), /* @__PURE__ */ D("div", {
								className: "text-[11px] text-text-tertiary text-right",
								children: [/* @__PURE__ */ D("div", { children: ["Source edited: ", $(M.sourceUpdatedAt)] }), /* @__PURE__ */ D("div", { children: ["Platform edited: ", $(M.platformUpdatedAt)] })]
							})]
						}),
						/* @__PURE__ */ D("div", {
							className: "flex gap-2 p-2.5 bg-surface-inset border border-border rounded-lg items-center flex-wrap",
							children: [/* @__PURE__ */ E("span", {
								className: "text-xs font-semibold text-text-secondary mr-1",
								children: "Apply to all fields:"
							}), [
								"source",
								"merged",
								"platform"
							].map((e) => {
								let t = e !== "merged" || M.fields.some((e) => e.mergedValue !== void 0);
								return /* @__PURE__ */ E("button", {
									className: f("px-3 py-1 text-xs font-medium font-[inherit] border rounded-md cursor-pointer", g === e ? "bg-primary text-white border-primary" : "bg-surface text-text-secondary border-border", !t && "opacity-40 cursor-not-allowed"),
									onClick: () => t && v(e),
									disabled: !t,
									"data-testid": `global-pick-${e}`,
									children: e === "source" ? "Source side" : e === "platform" ? "Platform side" : "Auto-merged"
								}, e);
							})]
						}),
						M.fields.map((e) => /* @__PURE__ */ E(Oe, {
							field: e,
							globalPick: g,
							fieldChoice: y[e.field],
							onPick: (t) => x((n) => ({
								...n,
								[e.field]: t
							})),
							onClear: () => x((t) => {
								let n = { ...t };
								return delete n[e.field], n;
							})
						}, e.field)),
						/* @__PURE__ */ D("div", {
							className: "flex gap-2 justify-end border-t border-border pt-3.5 flex-wrap",
							children: [
								/* @__PURE__ */ E(_, {
									"aria-label": "Optional note (logged in audit trail)",
									className: "min-w-[240px] flex-1",
									placeholder: "Optional note (logged in audit trail)",
									value: C,
									onChange: (e) => T(e.target.value),
									"data-testid": "conflict-note"
								}),
								/* @__PURE__ */ E("button", {
									className: f("px-3.5 py-1.5 text-[13px] font-medium font-[inherit] rounded-md cursor-pointer bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)]", O && "opacity-50 cursor-not-allowed"),
									onClick: () => void P(),
									disabled: O,
									"data-testid": "conflict-discard",
									children: "Discard"
								}),
								/* @__PURE__ */ E("button", {
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
function Oe({ field: e, globalPick: t, fieldChoice: n, onPick: r, onClear: i }) {
	let a = n ?? t, o = e.mergedValue !== void 0;
	return /* @__PURE__ */ D("div", {
		className: "border border-border rounded-lg overflow-hidden",
		"data-testid": `field-diff-${e.field}`,
		children: [
			/* @__PURE__ */ D("div", {
				className: "px-3 py-2 bg-surface-panel border-b border-border flex items-center justify-between gap-2 flex-wrap",
				children: [/* @__PURE__ */ E("span", {
					className: "font-mono text-xs text-text-primary font-semibold",
					children: e.field
				}), n && /* @__PURE__ */ E("button", {
					onClick: i,
					className: "text-[10px] px-2.5 py-0.5 rounded-full cursor-pointer border border-border bg-surface text-text-secondary font-[inherit] font-medium",
					"data-testid": `field-clear-${e.field}`,
					children: "Clear override"
				})]
			}),
			/* @__PURE__ */ D("div", {
				className: "grid grid-cols-3",
				children: [
					/* @__PURE__ */ E(ke, {
						label: "Source side",
						value: e.sourceValue,
						selected: a === "source"
					}),
					/* @__PURE__ */ E(ke, {
						label: o ? "Auto-merged" : "Auto-merged (none)",
						value: o ? e.mergedValue : "—",
						selected: o && a === "merged",
						dim: !o
					}),
					/* @__PURE__ */ E(ke, {
						label: "Platform side",
						value: e.platformValue,
						selected: a === "platform",
						last: !0
					})
				]
			}),
			/* @__PURE__ */ D("div", {
				className: "flex gap-1.5 px-2.5 py-1.5 border-t border-border bg-surface-inset",
				children: [/* @__PURE__ */ E("span", {
					className: "text-[11px] text-text-tertiary mr-1",
					children: "Pick for this field:"
				}), [
					"source",
					"merged",
					"platform"
				].map((t) => {
					let n = t !== "merged" || o;
					return /* @__PURE__ */ E("button", {
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
function ke({ label: e, value: t, selected: n, last: r, dim: i }) {
	return /* @__PURE__ */ D("div", {
		className: f("p-3 text-xs text-text-secondary font-mono whitespace-pre-wrap break-words min-h-[60px] bg-surface", !r && "border-r border-border", n && "bg-success-bg border-[var(--color-state-completed)]", i && "opacity-55"),
		children: [/* @__PURE__ */ E("div", {
			className: "text-[10px] font-bold text-text-tertiary uppercase tracking-wide mb-1.5 font-sans",
			children: e
		}), /* @__PURE__ */ E("div", { children: Ee(t) })]
	});
}
//#endregion
//#region src/components/ingest/DeadLetterQueuePage.tsx
function Ae(e) {
	let t = Date.now() - e;
	return t < 0 ? "just now" : t < 6e4 ? `${Math.floor(t / 1e3)}s ago` : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : `${Math.floor(t / 864e5)}d ago`;
}
function je() {
	let { entries: e, loading: t, error: r, replay: i, drop: a } = n();
	return /* @__PURE__ */ D("div", {
		"data-testid": "ingest-dlq-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ E("div", {
				className: "flex items-baseline justify-between mb-4 gap-3 flex-wrap",
				children: /* @__PURE__ */ D("div", { children: [/* @__PURE__ */ E("div", {
					className: "text-[22px] font-bold text-text-primary",
					children: "Dead Letter Queue"
				}), /* @__PURE__ */ E("div", {
					className: "text-xs text-text-tertiary",
					children: "Items the engine couldn't process. Replay re-enqueues; drop purges."
				})] })
			}),
			r ? /* @__PURE__ */ E("div", {
				"data-testid": "ingest-dlq-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3",
				children: r
			}) : null,
			t && e.length === 0 ? /* @__PURE__ */ D("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ E(h, { height: 96 }),
					/* @__PURE__ */ E(h, { height: 96 }),
					/* @__PURE__ */ E(h, { height: 96 })
				]
			}) : e.length === 0 && !r ? /* @__PURE__ */ E(m, {
				icon: "🧹",
				title: "DLQ is empty",
				body: "Failed items will land here. Replay re-enqueues into the source queue; drop purges without retry.",
				testId: "ingest-dlq-empty"
			}) : /* @__PURE__ */ E("div", {
				"data-testid": "ingest-dlq-list",
				className: "flex flex-col gap-3",
				children: e.map((e) => /* @__PURE__ */ E(Me, {
					entry: e,
					onReplay: () => void i(e.id),
					onDrop: () => void a(e.id)
				}, e.id))
			})
		]
	});
}
function Me({ entry: e, onReplay: t, onDrop: n }) {
	return /* @__PURE__ */ D("div", {
		"data-testid": `dlq-row-${e.id}`,
		className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-2",
		children: [
			/* @__PURE__ */ D("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ E("span", {
					className: "font-mono text-[13px] text-text-primary",
					title: e.id,
					children: e.id
				}), /* @__PURE__ */ E("span", {
					className: "text-[11px] text-text-tertiary",
					children: Ae(e.failedAtMs)
				})]
			}),
			/* @__PURE__ */ D("div", {
				className: "text-xs text-text-secondary flex gap-4 flex-wrap",
				children: [/* @__PURE__ */ D("span", { children: ["Attempts: ", /* @__PURE__ */ E("strong", { children: e.totalAttempts })] }), e.envelope.body?.sourceId ? /* @__PURE__ */ D("span", { children: ["Source: ", e.envelope.body.sourceId.slice(0, 12)] }) : null]
			}),
			e.lastError ? /* @__PURE__ */ E("div", {
				className: "text-xs text-text-primary font-mono bg-surface-inset px-2 py-1.5 rounded-md whitespace-pre-wrap break-words max-h-20 overflow-auto",
				children: e.lastError
			}) : null,
			/* @__PURE__ */ D("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ E("button", {
					"data-testid": `dlq-replay-${e.id}`,
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
					onClick: t,
					children: "Replay"
				}), /* @__PURE__ */ E("button", {
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
function Ne() {
	let { proposals: e, loading: t, error: n, promote: r, reject: i } = u();
	return /* @__PURE__ */ D("div", {
		"data-testid": "doctype-proposals-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ D("div", {
				className: "mb-4",
				children: [/* @__PURE__ */ E("div", {
					className: "text-[22px] font-bold text-text-primary",
					children: "DocType proposals"
				}), /* @__PURE__ */ E("div", {
					className: "text-xs text-text-tertiary mt-1",
					children: "Auto-discovered candidate types from the LLM mapper. Promote to accept; reject to suppress similar future proposals."
				})]
			}),
			n ? /* @__PURE__ */ D("div", {
				"data-testid": "proposals-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3",
				children: ["Couldn't load DocType proposals: ", n]
			}) : null,
			t && e.length === 0 ? /* @__PURE__ */ D("div", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ E(h, { height: 120 }), /* @__PURE__ */ E(h, { height: 120 })]
			}) : e.length === 0 && !n ? /* @__PURE__ */ E(m, {
				icon: "🧬",
				title: "No proposals waiting",
				body: "When the LLM mapper sees N similar files of an unknown shape, the proposed DocType lands here.",
				testId: "proposals-empty"
			}) : /* @__PURE__ */ E("div", {
				"data-testid": "proposals-list",
				className: "flex flex-col gap-3",
				children: e.map((e) => /* @__PURE__ */ E(Pe, {
					proposal: e,
					onPromote: () => void r(e.proposalId),
					onReject: () => void i(e.proposalId)
				}, e.proposalId))
			})
		]
	});
}
function Pe({ proposal: e, onPromote: t, onReject: n }) {
	return /* @__PURE__ */ D("div", {
		"data-testid": `proposal-row-${e.proposalId}`,
		className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-2.5",
		children: [
			/* @__PURE__ */ D("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ E("span", {
					className: "text-base font-bold text-text-primary",
					children: e.proposedName
				}), /* @__PURE__ */ D("span", {
					className: "text-[11px] text-text-tertiary",
					children: [
						e.sampleIngestIds.length,
						" sample",
						e.sampleIngestIds.length === 1 ? "" : "s"
					]
				})]
			}),
			/* @__PURE__ */ D("div", {
				className: "text-xs text-text-secondary flex gap-4 flex-wrap",
				children: [/* @__PURE__ */ D("span", { children: ["Source: ", e.sourceId.slice(0, 12)] }), /* @__PURE__ */ D("span", { children: ["Signature: ", e.signature.slice(0, 24)] })]
			}),
			e.proposedDescription ? /* @__PURE__ */ E("div", {
				className: "text-[13px] text-text-primary leading-relaxed",
				children: e.proposedDescription
			}) : null,
			e.proposedFields.length > 0 ? /* @__PURE__ */ E("div", {
				className: "flex flex-wrap gap-1.5",
				children: e.proposedFields.map((e) => /* @__PURE__ */ D("span", {
					className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset text-text-secondary font-mono",
					children: [e.name, e.required ? "*" : ""]
				}, e.name))
			}) : null,
			e.reasoning ? /* @__PURE__ */ D("div", {
				className: "text-xs text-text-tertiary italic",
				title: e.reasoning,
				children: [e.reasoning.slice(0, 200), e.reasoning.length > 200 ? "…" : ""]
			}) : null,
			/* @__PURE__ */ D("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ E("button", {
					"data-testid": `proposal-promote-${e.proposalId}`,
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
					onClick: t,
					children: "Promote"
				}), /* @__PURE__ */ E("button", {
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
function Fe() {
	let { idToken: t } = e(), { items: n, threshold: i, loading: a, error: o, remap: s, skip: c } = r(), { types: l } = d({ idToken: t }), [u, f] = w({});
	return /* @__PURE__ */ D("div", {
		"data-testid": "mapping-review-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ E("div", {
				className: "flex items-baseline justify-between mb-4",
				children: /* @__PURE__ */ D("div", { children: [/* @__PURE__ */ E("div", {
					className: "text-[22px] font-bold text-text-primary",
					children: "Mapping needs review"
				}), /* @__PURE__ */ D("div", {
					className: "text-xs text-text-tertiary",
					children: [
						"Showing items with confidence < ",
						Math.round(i * 100),
						"%."
					]
				})] })
			}),
			o ? /* @__PURE__ */ D("div", {
				"data-testid": "mapping-review-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3",
				children: ["Couldn't load review queue: ", o]
			}) : null,
			a && n.length === 0 ? /* @__PURE__ */ D("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ E(h, { height: 96 }),
					/* @__PURE__ */ E(h, { height: 96 }),
					/* @__PURE__ */ E(h, { height: 96 })
				]
			}) : n.length === 0 && !o ? /* @__PURE__ */ E(m, {
				icon: "✨",
				title: "No items need review",
				body: "When the LLM mapper produces a low-confidence match, it'll show up here for your call.",
				testId: "mapping-review-empty"
			}) : /* @__PURE__ */ E("div", {
				"data-testid": "mapping-review-list",
				className: "flex flex-col gap-3",
				children: n.map((e) => /* @__PURE__ */ E(Ie, {
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
function Ie({ item: e, docTypes: t, remapTypeId: n, onPickRemapType: r, onAccept: i, onRemap: a, onDiscard: o }) {
	let s = t.find((t) => t.id === e.documentTypeId)?.name ?? e.documentTypeId ?? "(unknown)", c = typeof e.mappingConfidence == "number" ? `${Math.round(e.mappingConfidence * 100)}%` : "—";
	return /* @__PURE__ */ D("div", {
		"data-testid": `review-row-${e.itemId}`,
		className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-2",
		children: [
			/* @__PURE__ */ D("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ E("span", {
					className: "font-[ui-monospace,monospace] text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
					title: e.sourcePath,
					children: e.sourcePath
				}), /* @__PURE__ */ D("span", {
					className: "text-[11px] font-semibold px-2 py-0.5 rounded-full bg-warning-bg text-warning-fg",
					children: ["conf ", c]
				})]
			}),
			/* @__PURE__ */ D("div", {
				className: "text-xs text-text-secondary flex gap-3 flex-wrap",
				children: [/* @__PURE__ */ D("span", { children: ["Suggested type: ", /* @__PURE__ */ E("strong", { children: s })] }), /* @__PURE__ */ D("span", { children: ["Source: ", e.sourceId.slice(0, 8)] })]
			}),
			e.error ? /* @__PURE__ */ E("div", {
				className: "text-xs text-text-secondary italic",
				children: e.error.slice(0, 200)
			}) : null,
			/* @__PURE__ */ D("div", {
				className: "flex gap-2 items-center flex-wrap",
				children: [
					/* @__PURE__ */ E("button", {
						"data-testid": `review-accept-${e.itemId}`,
						className: f("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]", !e.documentTypeId && "opacity-50 cursor-not-allowed"),
						onClick: i,
						disabled: !e.documentTypeId,
						title: e.documentTypeId ? "Commit the suggested type" : "No suggestion to accept",
						children: "Accept suggestion"
					}),
					/* @__PURE__ */ E(v, {
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
					/* @__PURE__ */ E("button", {
						"data-testid": `review-remap-${e.itemId}`,
						className: f("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]", !n && "opacity-50 cursor-not-allowed"),
						onClick: a,
						disabled: !n,
						children: "Re-map"
					}),
					/* @__PURE__ */ E("button", {
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
function Le(e) {
	return new Date(e).toLocaleTimeString("en-US", {
		hour12: !1,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	});
}
function Re(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? `${n}s` : `${Math.floor(n / 60)}m ${n % 60}s`;
}
function ze(e) {
	return e.startsWith("sync.") ? "bg-info-bg text-info-fg" : e === "item.mapped" ? "bg-accent-bg text-accent-fg" : e === "item.materialized" ? "bg-success-bg text-success-fg" : e === "item.failed" ? "bg-danger-bg text-danger-fg" : "bg-surface-hover text-neutral";
}
function Be(e) {
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
var Ve = [
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
function He() {
	let e = O(), { events: t, activeSyncs: n, clearEvents: r } = o(), i = C(null), [a, s] = w(!1), [c, l] = w(""), [u, d] = w("all"), p = C(null);
	b(() => {
		a && p.current === null ? p.current = [...t] : a || (p.current = null);
	}, [a, t]);
	let m = S(() => {
		let e = /* @__PURE__ */ new Set();
		for (let n of t) {
			let t = n.sourceId;
			typeof t == "string" && t && e.add(t);
		}
		for (let t of n.keys()) e.add(t);
		return Array.from(e).sort();
	}, [t, n]), h = S(() => {
		let e = a && p.current ? p.current : t, n = Ve.find((e) => e.value === u) ?? Ve[0];
		return e.filter((e) => !(!n.match(e.type) || c && e.sourceId !== c));
	}, [
		t,
		a,
		u,
		c
	]);
	b(() => {
		a || i.current && (i.current.scrollTop = i.current.scrollHeight);
	}, [h.length, a]);
	let g = S(() => {
		let e = t.filter((e) => e.type === "item.failed" || e.type === "sync.failed").length;
		return {
			totalEvents: t.length,
			activeSyncsCount: n.size,
			errorsCount: e
		};
	}, [t, n]), _ = S(() => Array.from(n.values()), [n]);
	return /* @__PURE__ */ D("div", {
		"data-testid": "sync-monitor-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ D("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ D("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ E("h2", {
						className: "m-0 text-[22px] font-bold text-text-primary",
						children: "Sync Monitor"
					}), /* @__PURE__ */ D("span", {
						className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-semibold bg-success-bg text-success-fg rounded-full border border-success-border",
						children: [/* @__PURE__ */ E("span", { className: "w-[7px] h-[7px] rounded-full bg-success animate-[sync-pulse_1.5s_ease-in-out_infinite]" }), "Live"]
					})]
				}), /* @__PURE__ */ E("button", {
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
					onClick: () => e("/ingest/sources"),
					children: "Sources"
				})]
			}),
			/* @__PURE__ */ D("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3 mb-5",
				children: [
					/* @__PURE__ */ D("div", {
						className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-1",
						children: [/* @__PURE__ */ E("span", {
							className: "text-[11px] font-medium text-text-tertiary uppercase tracking-tight",
							children: "Events Received"
						}), /* @__PURE__ */ E("span", {
							className: "text-[22px] font-bold text-text-primary leading-none",
							children: g.totalEvents
						})]
					}),
					/* @__PURE__ */ D("div", {
						className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-1",
						children: [/* @__PURE__ */ E("span", {
							className: "text-[11px] font-medium text-text-tertiary uppercase tracking-tight",
							children: "Active Syncs"
						}), /* @__PURE__ */ E("span", {
							className: f("text-[22px] font-bold leading-none", g.activeSyncsCount > 0 ? "text-[var(--color-state-running)]" : "text-text-primary"),
							children: g.activeSyncsCount
						})]
					}),
					/* @__PURE__ */ D("div", {
						className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-1",
						children: [/* @__PURE__ */ E("span", {
							className: "text-[11px] font-medium text-text-tertiary uppercase tracking-tight",
							children: "Errors"
						}), /* @__PURE__ */ E("span", {
							className: f("text-[22px] font-bold leading-none", g.errorsCount > 0 ? "text-[var(--color-state-failed)]" : "text-text-primary"),
							children: g.errorsCount
						})]
					})
				]
			}),
			/* @__PURE__ */ D("div", {
				className: "bg-surface border border-border rounded-[10px] p-4 mb-4",
				children: [/* @__PURE__ */ E("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Active Syncs"
				}), _.length === 0 ? /* @__PURE__ */ D("div", {
					className: "py-8 text-center",
					children: [/* @__PURE__ */ E("div", {
						className: "text-sm font-medium text-text-secondary mb-1",
						children: "No active syncs"
					}), /* @__PURE__ */ E("div", {
						className: "text-xs text-text-tertiary",
						children: "Trigger a sync from the Sources page to see progress here."
					})]
				}) : _.map((e) => {
					let t = e.fileCount > 0 ? Math.round(e.filesFetched / e.fileCount * 100) : 0;
					return /* @__PURE__ */ D("div", {
						className: "p-3.5 bg-surface-inset border border-border rounded-lg mb-2.5",
						children: [
							/* @__PURE__ */ D("div", {
								className: "flex items-center justify-between mb-2",
								children: [/* @__PURE__ */ E("span", {
									className: "text-sm font-semibold text-text-primary",
									children: e.sourceName
								}), /* @__PURE__ */ E("span", {
									className: "text-[11px] text-text-tertiary font-mono",
									children: Re(e.startedAt)
								})]
							}),
							/* @__PURE__ */ E("div", {
								className: "h-2 rounded bg-surface-emphasis overflow-hidden mb-2",
								children: /* @__PURE__ */ E("div", {
									className: "h-full rounded bg-[var(--color-state-running)] transition-[width] duration-300 ease-out",
									style: { width: `${t}%` }
								})
							}),
							/* @__PURE__ */ D("div", {
								className: "flex gap-4 text-xs text-text-secondary",
								children: [
									/* @__PURE__ */ D("span", {
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
									/* @__PURE__ */ D("span", {
										className: "flex items-center gap-1",
										children: ["Mapped: ", e.itemsMapped]
									}),
									/* @__PURE__ */ D("span", {
										className: "flex items-center gap-1",
										children: ["Materialized: ", e.itemsMaterialized]
									})
								]
							})
						]
					}, e.sourceId);
				})]
			}),
			/* @__PURE__ */ D("div", {
				className: "bg-surface border border-border rounded-[10px] p-4 mb-4",
				children: [/* @__PURE__ */ D("div", {
					className: "flex items-center justify-between mb-3 gap-2 flex-wrap",
					children: [/* @__PURE__ */ E("span", {
						className: "text-sm font-semibold text-text-primary",
						children: "Event Log"
					}), /* @__PURE__ */ D("div", {
						className: "flex items-center gap-2 flex-wrap",
						children: [
							/* @__PURE__ */ E(v, {
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
							/* @__PURE__ */ E(v, {
								"data-testid": "event-type-filter",
								"aria-label": "Filter by event type",
								className: "w-auto min-w-[110px]",
								value: u,
								onChange: (e) => d(e.target.value),
								options: Ve.map((e) => ({
									value: e.value,
									label: e.label
								}))
							}),
							/* @__PURE__ */ E("button", {
								"data-testid": "event-pause-toggle",
								className: "px-2.5 py-0.5 text-[11px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
								onClick: () => s((e) => !e),
								title: a ? "Resume the live stream" : "Pause the stream so the log doesn't scroll",
								children: a ? "Resume" : "Pause"
							}),
							t.length > 0 && /* @__PURE__ */ E("button", {
								className: "px-2.5 py-0.5 text-[11px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
								onClick: r,
								children: "Clear"
							})
						]
					})]
				}), h.length === 0 ? /* @__PURE__ */ D("div", {
					className: "py-8 text-center",
					children: [/* @__PURE__ */ E("div", {
						className: "text-sm font-medium text-text-secondary mb-1",
						children: t.length === 0 ? "No events yet" : "No events match the current filter"
					}), /* @__PURE__ */ E("div", {
						className: "text-xs text-text-tertiary",
						children: t.length === 0 ? "Events will appear here in real-time as syncs run." : "Try a different source or event-type filter, or clear the filter."
					})]
				}) : /* @__PURE__ */ E("div", {
					ref: i,
					"data-testid": "event-log",
					className: "max-h-80 overflow-y-auto flex flex-col gap-0.5",
					children: h.map((e, t) => /* @__PURE__ */ D("div", {
						className: "flex items-center gap-2 px-2 py-1 rounded text-xs",
						children: [
							/* @__PURE__ */ E("span", {
								className: "text-[11px] font-mono text-text-tertiary shrink-0 min-w-[60px]",
								children: Le(e.timestamp)
							}),
							/* @__PURE__ */ E("span", {
								className: f("px-[7px] py-0.5 text-[10px] font-semibold rounded shrink-0", ze(e.type)),
								children: e.type
							}),
							/* @__PURE__ */ E("span", {
								className: "text-xs text-text-secondary flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap",
								title: Be(e),
								children: Be(e)
							})
						]
					}, `${e.timestamp}-${t}`))
				})]
			})
		]
	});
}
//#endregion
export { De as ConflictsPage, je as DeadLetterQueuePage, Ne as DocTypeProposalsPage, we as IngestAuditPage, R as IngestDashboard, ge as IngestItemDrawer, xe as IngestItemsPage, Fe as MappingReviewPage, K as MappingRuleEditor, ue as SourceDetailPage, ne as SourceSloPanel, U as SourcesPage, He as SyncMonitorPage };
