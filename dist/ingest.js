import { n as e } from "./IdentityContext-CQM1qwH6.js";
import { a as t, c as n, i as r, l as i, n as a, o, r as s, s as c, t as l, u } from "./useSyncConflicts-z_Fo2YIM.js";
import { r as d } from "./useDocumentTypes-CrsHC24c.js";
import { t as f } from "./cn-DhjIN-s0.js";
import { t as p } from "./Button-wU9TwJvB.js";
import { n as m, t as h } from "./overlayStack-tmtTS-39.js";
import { t as g } from "./EmptyState-ClmWoqCb.js";
import { n as _, r as v, t as y } from "./focusTrap-Dd6E7nwr.js";
import { t as b } from "./SkeletonCard-CGe8XFPB.js";
import { t as x } from "./Input-DLknWXri.js";
import { t as S } from "./Select-CqVokE2v.js";
import { t as C } from "./activationKey-CjbL3LUv.js";
import { n as w, t as T } from "./ChangeReviewCard-Dd_WqCom.js";
import { useCallback as E, useEffect as D, useId as O, useMemo as k, useRef as A, useState as j } from "react";
import { Fragment as M, jsx as N, jsxs as P } from "react/jsx-runtime";
import { useNavigate as F, useParams as ee } from "react-router";
import { Line as I, LineChart as L, ResponsiveContainer as R, Tooltip as z, YAxis as B } from "recharts";
//#region src/components/ingest/IngestDashboard.tsx
function V(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : `${Math.floor(t / 864e5)}d ago`;
}
function H(e) {
	return Date.now() - new Date(e).getTime() < 864e5;
}
function U(e) {
	return Date.now() - new Date(e).getTime() < 36e5;
}
var W = 50;
function te() {
	let e = F(), { sources: n, loading: r, error: i, refresh: a } = t(), { items: o, loading: s, error: l, refresh: u } = c(), d = r || s, p = i || l, h = k(() => {
		let e = n.filter((e) => e.status === "active").length, t = n.filter((e) => e.status === "paused").length, r = n.filter((e) => e.status === "error").length, i = o.filter((e) => e.status !== "done" && e.status !== "failed").length, a = o.filter((e) => e.status === "done" && H(e.updatedAt)).length, s = o.filter((e) => e.status === "failed").length;
		return {
			total: n.length,
			active: e,
			paused: t,
			errored: r,
			queued: i,
			recentDone: a,
			failed: s
		};
	}, [n, o]), _ = k(() => o.filter((e) => e.status === "done").sort((e, t) => t.updatedAt.localeCompare(e.updatedAt)).slice(0, 5), [o]), v = k(() => {
		let e = [];
		for (let t of n) t.status === "error" && e.push({
			id: `source-error-${t.sourceId}`,
			level: "critical",
			message: `Source "${t.name}" is in error state — check its config or last sync log.`
		});
		let t = o.filter((e) => U(e.updatedAt));
		if (t.length >= 5) {
			let n = t.filter((e) => e.status === "failed").length, r = n / t.length;
			r > .1 && e.push({
				id: "failure-rate-1h",
				level: "warning",
				message: `Last-hour failure rate is ${(r * 100).toFixed(0)}% (${n} of ${t.length} items failed).`
			});
		}
		return h.queued > W && e.push({
			id: "queue-depth",
			level: "warning",
			message: `Queue depth is ${h.queued} items — sources may be ingesting faster than the engine can drain.`
		}), e;
	}, [
		n,
		o,
		h.queued
	]);
	return d && n.length === 0 && o.length === 0 ? /* @__PURE__ */ P("div", {
		"data-testid": "ingest-dashboard",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ N("div", {
				className: "flex items-center justify-between mb-4",
				children: /* @__PURE__ */ N("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Ingest"
				})
			}),
			/* @__PURE__ */ P("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 mb-5",
				children: [
					/* @__PURE__ */ N(b, { height: 90 }),
					/* @__PURE__ */ N(b, { height: 90 }),
					/* @__PURE__ */ N(b, { height: 90 }),
					/* @__PURE__ */ N(b, { height: 90 })
				]
			}),
			/* @__PURE__ */ N(b, { height: 200 })
		]
	}) : /* @__PURE__ */ P("div", {
		"data-testid": "ingest-dashboard",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ P("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ N("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Ingest"
				}), /* @__PURE__ */ P("div", {
					className: "flex gap-2.5 items-center",
					children: [null, /* @__PURE__ */ N("button", {
						className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
						onClick: () => e("/ingest/sources"),
						"data-testid": "add-source-btn",
						children: "Add Source"
					})]
				})]
			}),
			p && /* @__PURE__ */ P("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4",
				role: "alert",
				children: [/* @__PURE__ */ N("span", {
					className: "text-[13px] font-medium",
					children: "Failed to load ingest data."
				}), /* @__PURE__ */ N("button", {
					onClick: () => {
						a(), u();
					},
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
					children: "Retry"
				})]
			}),
			v.length > 0 && /* @__PURE__ */ N("div", {
				"data-testid": "alerts-strip",
				className: "flex flex-col gap-1.5 mb-3",
				children: v.map((e) => /* @__PURE__ */ P("div", {
					"data-testid": `alert-${e.id}`,
					className: f("px-3 py-2 rounded-md text-[13px] border", e.level === "critical" ? "bg-danger-bg border-[var(--color-state-failed)] text-[var(--color-state-failed)]" : "bg-warning-bg border-warning text-warning-fg"),
					children: [
						/* @__PURE__ */ N("strong", { children: e.level === "critical" ? "⛔" : "⚠" }),
						" ",
						e.message
					]
				}, e.id))
			}),
			/* @__PURE__ */ P("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 mb-5",
				children: [
					/* @__PURE__ */ P("div", {
						className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5",
						children: [
							/* @__PURE__ */ N("span", {
								className: "text-xs font-medium text-text-tertiary uppercase tracking-wide",
								children: "Sources"
							}),
							/* @__PURE__ */ N("span", {
								className: "text-[28px] font-bold text-text-primary leading-none",
								children: h.total
							}),
							/* @__PURE__ */ P("span", {
								className: "text-xs text-text-tertiary",
								children: [
									h.active,
									" active, ",
									h.paused,
									" paused",
									h.errored > 0 ? `, ${h.errored} error` : ""
								]
							})
						]
					}),
					/* @__PURE__ */ P("div", {
						className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5",
						children: [
							/* @__PURE__ */ N("span", {
								className: "text-xs font-medium text-text-tertiary uppercase tracking-wide",
								children: "In Queue"
							}),
							/* @__PURE__ */ N("span", {
								className: f("text-[28px] font-bold leading-none", h.queued > 0 ? "text-[var(--color-state-awaiting)]" : "text-text-primary"),
								children: h.queued
							}),
							/* @__PURE__ */ N("span", {
								className: "text-xs text-text-tertiary",
								children: "items processing"
							})
						]
					}),
					/* @__PURE__ */ P("div", {
						className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5",
						children: [
							/* @__PURE__ */ N("span", {
								className: "text-xs font-medium text-text-tertiary uppercase tracking-wide",
								children: "Completed (24h)"
							}),
							/* @__PURE__ */ N("span", {
								className: f("text-[28px] font-bold leading-none", h.recentDone > 0 ? "text-[var(--color-state-completed)]" : "text-text-primary"),
								children: h.recentDone
							}),
							/* @__PURE__ */ N("span", {
								className: "text-xs text-text-tertiary",
								children: "items ingested"
							})
						]
					}),
					/* @__PURE__ */ P("div", {
						className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5",
						children: [
							/* @__PURE__ */ N("span", {
								className: "text-xs font-medium text-text-tertiary uppercase tracking-wide",
								children: "Errors"
							}),
							/* @__PURE__ */ N("span", {
								className: f("text-[28px] font-bold leading-none", h.failed > 0 ? "text-[var(--color-state-failed)]" : "text-text-primary"),
								children: h.failed
							}),
							/* @__PURE__ */ N("span", {
								className: "text-xs text-text-tertiary",
								children: "items failed"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ P("div", {
				className: "bg-surface border border-border rounded-[10px] p-4 mb-4",
				children: [/* @__PURE__ */ N("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Recent Activity"
				}), _.length === 0 ? /* @__PURE__ */ N(g, {
					icon: "📥",
					title: "No recent activity",
					body: "Completed ingest items will appear here."
				}) : /* @__PURE__ */ N("div", { children: _.map((e) => /* @__PURE__ */ P("div", {
					className: "flex items-center justify-between gap-3 py-2 border-b border-border",
					children: [
						/* @__PURE__ */ N("span", {
							className: "text-[13px] text-text-secondary font-mono overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0",
							title: e.sourcePath,
							children: e.sourcePath
						}),
						/* @__PURE__ */ N(m, {
							tone: "success",
							size: "xs",
							children: "done"
						}),
						/* @__PURE__ */ N("span", {
							className: "text-[11px] text-text-tertiary whitespace-nowrap shrink-0",
							children: V(e.updatedAt)
						})
					]
				}, e.itemId)) })]
			})
		]
	});
}
//#endregion
//#region src/components/ingest/SourcesPage.tsx
function G(e) {
	switch (e) {
		case "active": return "success";
		case "paused": return "warning";
		case "error": return "danger";
		default: return "neutral";
	}
}
function K(e) {
	switch (e) {
		case "local": return "Local";
		case "s3": return "S3";
		case "google-drive": return "Google Drive";
		case "webhook": return "Webhook";
		default: return e;
	}
}
function ne(e) {
	switch (e) {
		case "s3": return "info";
		case "google-drive": return "purple";
		case "webhook": return "caution";
		case "local": return "neutral";
		default: return "neutral";
	}
}
function re(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function ie() {
	let e = F(), { sources: n, loading: r, error: i, refresh: a, deleteSource: o, triggerSync: s, actionError: c, clearActionError: l } = t(), [u, d] = j(() => /* @__PURE__ */ new Set()), p = E(async (e) => {
		d((t) => new Set(t).add(e));
		let t = await s(e);
		d((t) => {
			let n = new Set(t);
			return n.delete(e), n;
		}), t && a();
	}, [s, a]), h = E(async (e) => {
		confirm(`Delete source "${e.name}"? This cannot be undone.`) && await o(e.sourceId);
	}, [o]);
	return r && n.length === 0 ? /* @__PURE__ */ P("div", {
		"data-testid": "sources-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ N("div", {
				className: "flex items-center justify-between mb-4",
				children: /* @__PURE__ */ N("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Sources"
				})
			}),
			/* @__PURE__ */ N(b, { height: 48 }),
			/* @__PURE__ */ N(b, { height: 48 }),
			/* @__PURE__ */ N(b, { height: 48 })
		]
	}) : /* @__PURE__ */ P("div", {
		"data-testid": "sources-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ P("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ P("div", { children: [/* @__PURE__ */ N("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Sources"
				}), /* @__PURE__ */ P("span", {
					className: "text-[13px] text-text-tertiary",
					children: [
						n.length,
						" source",
						n.length === 1 ? "" : "s"
					]
				})] }), /* @__PURE__ */ N("button", {
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
					onClick: () => e("/ingest/sources"),
					"data-testid": "add-source-btn",
					children: "Add Source"
				})]
			}),
			i && /* @__PURE__ */ P("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4",
				role: "alert",
				children: [/* @__PURE__ */ N("span", {
					className: "text-[13px] font-medium",
					children: "Failed to load sources."
				}), /* @__PURE__ */ N("button", {
					onClick: () => void a(),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
					children: "Retry"
				})]
			}),
			c && /* @__PURE__ */ P("div", {
				"data-testid": "sources-action-error",
				role: "alert",
				className: "px-4 py-3 bg-danger-bg border border-danger-border text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-4",
				children: [/* @__PURE__ */ P("span", {
					className: "text-[13px] font-medium",
					children: ["That action did not go through: ", c]
				}), /* @__PURE__ */ N("button", {
					onClick: l,
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-danger-fg border border-danger-border rounded-md cursor-pointer font-[inherit]",
					children: "Dismiss"
				})]
			}),
			!i && n.length === 0 ? /* @__PURE__ */ N(g, {
				icon: "📂",
				title: "No sources configured",
				body: "Add a data source to start ingesting files into the system.",
				actionLabel: "Add Source",
				onAction: () => e("/ingest/sources")
			}) : /* @__PURE__ */ N("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ P("table", {
					className: "w-full border-collapse text-[13px]",
					children: [/* @__PURE__ */ N("thead", { children: /* @__PURE__ */ P("tr", {
						className: "border-b border-border",
						children: [
							/* @__PURE__ */ N("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Name"
							}),
							/* @__PURE__ */ N("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Type"
							}),
							/* @__PURE__ */ N("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Status"
							}),
							/* @__PURE__ */ N("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Last Sync"
							}),
							/* @__PURE__ */ N("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Files Synced"
							}),
							/* @__PURE__ */ N("th", {
								className: "p-2 text-right text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ N("tbody", { children: n.map((t) => /* @__PURE__ */ P("tr", {
						className: "border-b border-border hover:bg-surface-hover",
						children: [
							/* @__PURE__ */ N("td", {
								className: "p-2 font-medium text-text-primary",
								children: /* @__PURE__ */ N("button", {
									type: "button",
									"data-testid": `source-name-link-${t.sourceId}`,
									onClick: () => e(`/ingest/sources/${t.sourceId}`),
									className: "bg-transparent border-none p-0 font-[inherit] text-primary cursor-pointer underline text-left",
									children: t.name
								})
							}),
							/* @__PURE__ */ N("td", {
								className: "p-2",
								children: /* @__PURE__ */ N(m, {
									tone: ne(t.type),
									size: "xs",
									children: K(t.type)
								})
							}),
							/* @__PURE__ */ N("td", {
								className: "p-2",
								children: /* @__PURE__ */ N(m, {
									tone: G(t.status),
									size: "sm",
									children: t.status
								})
							}),
							/* @__PURE__ */ N("td", {
								className: "p-2 text-text-secondary",
								children: t.lastSyncAt ? re(t.lastSyncAt) : "Never"
							}),
							/* @__PURE__ */ N("td", {
								"data-testid": `source-files-synced-${t.sourceId}`,
								className: "p-2 font-mono text-xs text-text-secondary",
								children: t.lastSyncStats ? /* @__PURE__ */ P("span", { children: [t.lastSyncStats.filesFound, t.lastSyncStats.filesNew > 0 ? /* @__PURE__ */ P("span", {
									className: "text-text-tertiary",
									children: [
										" · ",
										t.lastSyncStats.filesNew,
										" new"
									]
								}) : null] }) : "—"
							}),
							/* @__PURE__ */ N("td", {
								className: "p-2 text-right",
								children: /* @__PURE__ */ P("div", {
									className: "flex gap-1.5 justify-end",
									children: [/* @__PURE__ */ N("button", {
										className: f("px-2.5 py-1 text-[11px] font-medium rounded-[5px] cursor-pointer font-[inherit]", u.has(t.sourceId) || t.status === "paused" ? "border border-border bg-surface-inset text-text-tertiary opacity-70 cursor-not-allowed" : "border border-border bg-surface text-text-secondary"),
										disabled: u.has(t.sourceId) || t.status === "paused",
										onClick: () => void p(t.sourceId),
										"data-testid": `sync-${t.sourceId}`,
										children: u.has(t.sourceId) ? "Syncing..." : "Sync Now"
									}), /* @__PURE__ */ N("button", {
										className: "px-2.5 py-1 text-[11px] font-medium border border-[var(--color-state-failed)] rounded-[5px] bg-danger-bg cursor-pointer font-[inherit] text-[var(--color-state-failed)]",
										onClick: () => void h(t),
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
var q = "", ae = [
	"extension",
	"path",
	"mimeType",
	"tag",
	"name"
], oe = [
	"eq",
	"contains",
	"regex",
	"startsWith"
];
function J({ rules: t, onChange: n, readOnly: r = !1 }) {
	let { idToken: i } = e(), [a, o] = j(null), [s, c] = j(""), [l, u] = j(null), [d, p] = j(!1), [m, h] = j(null), g = E((e) => {
		o(e), h({ ...t[e] });
	}, [t]), _ = E(() => {
		o(null), h(null);
	}, []), v = E(() => {
		if (a === null || !m) return;
		let e = [...t];
		e[a] = m, n(e), o(null), h(null);
	}, [
		a,
		m,
		t,
		n
	]), y = E(() => {
		let e = {
			pattern: "",
			documentTypeId: "",
			priority: t.length > 0 ? Math.max(...t.map((e) => e.priority)) + 1 : 1
		}, r = [...t, e];
		n(r), o(r.length - 1), h(e);
	}, [t, n]), b = E((e) => {
		n(t.filter((t, n) => n !== e)), a === e ? (o(null), h(null)) : a !== null && a > e && o(a - 1);
	}, [
		t,
		n,
		a
	]), C = E((e) => {
		h((t) => t && {
			...t,
			priority: e
		});
	}, []), w = E((e) => {
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
		}, n(r), a === e ? (o(e - 1), C(r[e - 1].priority)) : a === e - 1 && (o(e), C(r[e].priority));
	}, [
		t,
		n,
		a,
		C
	]), T = E((e) => {
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
		}, n(r), a === e ? (o(e + 1), C(r[e + 1].priority)) : a === e + 1 && (o(e), C(r[e].priority));
	}, [
		t,
		n,
		a,
		C
	]), D = E(async () => {
		if (s.trim()) {
			p(!0), u(null);
			try {
				let e = { "Content-Type": "application/json" };
				i && (e.Authorization = `Bearer ${i}`);
				let n = await fetch(`${q}/api/ingest/mapping/preview`, {
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
	]), O = (e) => {
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
	}, k = (e, t, n) => `${e}:${t}:${n}`;
	return /* @__PURE__ */ P("div", {
		className: "flex flex-col gap-2.5",
		"data-testid": "mapping-rule-editor",
		children: [
			t.length === 0 ? /* @__PURE__ */ N("div", {
				className: "p-4 text-center text-text-tertiary text-[13px]",
				children: r ? "No mapping rules configured." : "No mapping rules configured. Add one to get started."
			}) : /* @__PURE__ */ N("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ P("table", {
					className: "w-full border-collapse text-xs",
					children: [/* @__PURE__ */ N("thead", { children: /* @__PURE__ */ P("tr", { children: [
						/* @__PURE__ */ N("th", {
							className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Priority"
						}),
						/* @__PURE__ */ N("th", {
							className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Condition"
						}),
						/* @__PURE__ */ N("th", {
							className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Target Type ID"
						}),
						/* @__PURE__ */ N("th", {
							className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Pipeline"
						}),
						/* @__PURE__ */ N("th", {
							className: "px-2.5 py-2 font-semibold text-right border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Actions"
						})
					] }) }), /* @__PURE__ */ N("tbody", { children: t.map((e, n) => {
						let i = !r && a === n && m !== null, o = O(e.pattern);
						if (i) {
							let e = O(m.pattern);
							return /* @__PURE__ */ P("tr", {
								className: "border-b border-border",
								children: [
									/* @__PURE__ */ N("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
										children: /* @__PURE__ */ N(x, {
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
									/* @__PURE__ */ N("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
										children: /* @__PURE__ */ P("div", {
											className: "flex gap-1 items-center flex-wrap",
											children: [
												/* @__PURE__ */ N(S, {
													"aria-label": "Match field",
													size: "sm",
													className: "w-auto min-w-[90px]",
													value: e.field,
													onChange: (t) => h({
														...m,
														pattern: k(t.target.value, e.op, e.value)
													}),
													options: ae.map((e) => ({
														value: e,
														label: e
													}))
												}),
												/* @__PURE__ */ N(S, {
													"aria-label": "Match operator",
													size: "sm",
													className: "w-auto min-w-[90px]",
													value: e.op,
													onChange: (t) => h({
														...m,
														pattern: k(e.field, t.target.value, e.value)
													}),
													options: oe.map((e) => ({
														value: e,
														label: e
													}))
												}),
												/* @__PURE__ */ N(x, {
													"aria-label": "Match value",
													size: "sm",
													className: "min-w-[100px]",
													value: e.value,
													placeholder: "value",
													onChange: (t) => h({
														...m,
														pattern: k(e.field, e.op, t.target.value)
													})
												})
											]
										})
									}),
									/* @__PURE__ */ N("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
										children: /* @__PURE__ */ N(x, {
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
									/* @__PURE__ */ N("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
										children: /* @__PURE__ */ N(x, {
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
									/* @__PURE__ */ N("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle text-right",
										children: /* @__PURE__ */ P("div", {
											className: "flex gap-1 justify-end",
											children: [/* @__PURE__ */ N("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: v,
												children: "Save"
											}), /* @__PURE__ */ N("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: _,
												children: "Cancel"
											})]
										})
									})
								]
							}, n);
						}
						return /* @__PURE__ */ P("tr", {
							className: "border-b border-border",
							children: [
								/* @__PURE__ */ N("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle font-mono font-semibold",
									children: e.priority
								}),
								/* @__PURE__ */ N("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
									children: /* @__PURE__ */ P("span", {
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
								/* @__PURE__ */ N("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle font-mono",
									children: e.documentTypeId || "—"
								}),
								/* @__PURE__ */ N("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-tertiary text-xs align-middle font-mono",
									children: e.pipelineId ?? "—"
								}),
								/* @__PURE__ */ N("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle text-right",
									children: r ? /* @__PURE__ */ N("span", {
										className: "text-[11px] text-text-tertiary",
										children: "—"
									}) : /* @__PURE__ */ P("div", {
										className: "flex gap-1 justify-end",
										children: [
											/* @__PURE__ */ N("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: () => w(n),
												disabled: n === 0,
												title: "Move up",
												children: "↑"
											}),
											/* @__PURE__ */ N("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: () => T(n),
												disabled: n === t.length - 1,
												title: "Move down",
												children: "↓"
											}),
											/* @__PURE__ */ N("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: () => g(n),
												children: "Edit"
											}),
											/* @__PURE__ */ N("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-[var(--color-state-failed)] rounded bg-danger-bg cursor-pointer font-[inherit] text-[var(--color-state-failed)]",
												onClick: () => b(n),
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
			!r && /* @__PURE__ */ N("div", {
				className: "flex gap-2.5 items-center",
				children: /* @__PURE__ */ N("button", {
					className: "px-3.5 py-1.5 text-xs font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary self-start",
					onClick: y,
					"data-testid": "add-rule-btn",
					children: "+ Add Rule"
				})
			}),
			/* @__PURE__ */ P("div", {
				className: "flex gap-2 items-center mt-1",
				children: [/* @__PURE__ */ N(x, {
					"aria-label": "Enter a file path to preview mapping",
					className: "flex-1",
					value: s,
					onChange: (e) => c(e.target.value),
					placeholder: "Enter a file path to preview mapping..."
				}), /* @__PURE__ */ N("button", {
					className: f("px-3.5 py-1.5 text-xs font-medium border border-primary rounded-md bg-info-bg cursor-pointer font-[inherit] text-primary self-start", (d || !s.trim()) && "opacity-50 cursor-not-allowed"),
					onClick: () => void D(),
					disabled: d || !s.trim(),
					children: d ? "Checking..." : "Preview"
				})]
			}),
			l && /* @__PURE__ */ N("div", {
				className: "p-3 bg-surface-inset border border-border rounded-md text-xs text-text-secondary font-mono whitespace-pre-wrap break-words",
				children: l
			})
		]
	});
}
//#endregion
//#region src/components/ingest/SourceSloPanel.tsx
var se = [
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
	return /* @__PURE__ */ N("div", {
		"data-testid": n,
		className: "h-[60px]",
		children: /* @__PURE__ */ N(R, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ P(L, {
				data: r,
				margin: {
					top: 4,
					right: 4,
					left: 4,
					bottom: 4
				},
				children: [
					/* @__PURE__ */ N(B, { hide: !0 }),
					/* @__PURE__ */ N(z, {
						cursor: !1,
						contentStyle: {
							fontSize: 11,
							padding: "4px 6px"
						},
						formatter: ((e) => [e, ""])
					}),
					/* @__PURE__ */ N(I, {
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
function ce({ sourceId: e }) {
	let [t, n] = j("1h"), { metrics: r, error: i } = a(e, t);
	return /* @__PURE__ */ P("div", {
		"data-testid": "source-slo-panel",
		className: "px-4 py-3 bg-surface border border-border rounded-[10px] mb-4",
		children: [
			/* @__PURE__ */ P("div", {
				className: "flex items-center justify-between mb-2 gap-2",
				children: [/* @__PURE__ */ P("span", {
					className: "text-sm font-bold text-text-primary",
					children: [
						"Health (last ",
						t,
						")"
					]
				}), /* @__PURE__ */ N(S, {
					"data-testid": "slo-window-picker",
					"aria-label": "Window",
					className: "w-auto min-w-[100px]",
					value: t,
					onChange: (e) => n(e.target.value),
					options: se.map((e) => ({
						value: e,
						label: `Last ${e}`
					}))
				})]
			}),
			i ? /* @__PURE__ */ P("div", {
				role: "alert",
				"data-testid": "slo-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg text-xs",
				children: ["Couldn't load source metrics: ", i]
			}) : null,
			r ? /* @__PURE__ */ P("div", {
				className: "grid grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ P("div", {
						className: "px-2.5 py-2 bg-surface-inset rounded-lg",
						children: [
							/* @__PURE__ */ N("div", {
								className: "text-[11px] text-text-tertiary mb-1",
								children: "p95 latency"
							}),
							/* @__PURE__ */ N("div", {
								"data-testid": "slo-latency-value",
								className: "text-base font-bold text-text-primary",
								children: (() => {
									let e = X(r.latencyP95);
									return e === null ? "—" : `${Math.round(e)} ms`;
								})()
							}),
							/* @__PURE__ */ N(Y, {
								points: r.latencyP95,
								color: "var(--color-state-completed)",
								testId: "slo-latency-chart"
							})
						]
					}),
					/* @__PURE__ */ P("div", {
						className: "px-2.5 py-2 bg-surface-inset rounded-lg",
						children: [
							/* @__PURE__ */ N("div", {
								className: "text-[11px] text-text-tertiary mb-1",
								children: "error rate"
							}),
							/* @__PURE__ */ N("div", {
								"data-testid": "slo-error-rate-value",
								className: "text-base font-bold text-text-primary",
								children: (() => {
									let e = X(r.errorRate);
									return e === null ? "—" : `${e.toFixed(1)}%`;
								})()
							}),
							/* @__PURE__ */ N(Y, {
								points: r.errorRate,
								color: "var(--color-state-failed)",
								testId: "slo-error-rate-chart"
							})
						]
					}),
					/* @__PURE__ */ P("div", {
						className: "px-2.5 py-2 bg-surface-inset rounded-lg",
						children: [
							/* @__PURE__ */ N("div", {
								className: "text-[11px] text-text-tertiary mb-1",
								children: "queue depth"
							}),
							/* @__PURE__ */ N("div", {
								"data-testid": "slo-queue-depth-value",
								className: "text-base font-bold text-text-primary",
								children: (() => {
									let e = X(r.queueDepth);
									return e === null ? "—" : e;
								})()
							}),
							/* @__PURE__ */ N(Y, {
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
var le = [
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
function ue(e) {
	switch (e) {
		case "active": return "success";
		case "paused": return "warning";
		case "error": return "danger";
		default: return "neutral";
	}
}
function de(e) {
	switch (e) {
		case "local": return "Local";
		case "s3": return "S3";
		case "google-drive": return "Google Drive";
		case "webhook": return "Webhook";
		default: return e;
	}
}
function fe(e) {
	switch (e) {
		case "s3": return "info";
		case "google-drive": return "purple";
		case "webhook": return "caution";
		case "local": return "neutral";
		default: return "neutral";
	}
}
function pe(e) {
	return e < 1e3 ? `${e}ms` : e < 6e4 ? `${(e / 1e3).toFixed(1)}s` : `${(e / 6e4).toFixed(1)}m`;
}
function me(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function he(e) {
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
function ge() {
	let { id: t } = ee(), n = F(), { idToken: r } = e(), { pipelines: i } = s(), { types: a } = d({ idToken: r }), [o, c] = j(null), [l, u] = j(!0), [p, h] = j(null), [g, _] = j(!1), v = O(), [y, C] = j(!1), [w, T] = j(!1), [k, A] = j({}), [I, L] = j([]), [R, z] = j(""), [B, V] = j(""), [H, U] = j({}), [W, te] = j(!1), G = E(() => {
		let e = { "Content-Type": "application/json" };
		return r && (e.Authorization = `Bearer ${r}`), e;
	}, [r]), K = E(async (e) => {
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
					mappingRules: he(r.mappingRules ?? [])
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
	D(() => {
		let e = new AbortController();
		return K(e.signal), () => e.abort();
	}, [K]);
	let ne = E(() => {
		o && (A({ ...o.config }), L([...o.mappingRules]), z(o.syncSchedule ?? ""), V(o.defaultPipelineId ?? ""), U({ ...o.pipelineByDocType ?? {} }), _(!0));
	}, [o]), re = E(() => {
		_(!1);
	}, []), ie = E(async () => {
		if (!(!o || !t)) {
			T(!0);
			try {
				let e = {
					config: k,
					mappingRules: I,
					syncSchedule: R.trim() || null,
					defaultPipelineId: B.trim() || null,
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
				T(!1);
			}
		}
	}, [
		o,
		t,
		k,
		I,
		R,
		B,
		H,
		G
	]), q = g && o !== null && (JSON.stringify(k) !== JSON.stringify(o.config) || JSON.stringify(I) !== JSON.stringify(o.mappingRules) || R !== (o.syncSchedule ?? "") || B !== (o.defaultPipelineId ?? "") || JSON.stringify(H) !== JSON.stringify(o.pipelineByDocType ?? {}));
	D(() => {
		if (!q) return;
		let e = (e) => {
			e.preventDefault(), e.returnValue = "";
		};
		return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
	}, [q]);
	let ae = E(async () => {
		if (t) {
			C(!0);
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
				C(!1);
			}
		}
	}, [
		t,
		G,
		K
	]), oe = E(async () => {
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
	return l && !o ? /* @__PURE__ */ P("div", {
		"data-testid": "source-detail-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ N("div", {
				className: "flex items-center justify-between mb-4 flex-wrap gap-3",
				children: /* @__PURE__ */ N("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Source Detail"
				})
			}),
			/* @__PURE__ */ N(b, { height: 120 }),
			/* @__PURE__ */ N(b, { height: 200 }),
			/* @__PURE__ */ N(b, { height: 100 })
		]
	}) : p && !o ? /* @__PURE__ */ P("div", {
		"data-testid": "source-detail-page",
		className: "p-6 flex flex-col gap-3",
		children: [/* @__PURE__ */ N("div", {
			className: "flex items-center justify-between mb-4 flex-wrap gap-3",
			children: /* @__PURE__ */ N("button", {
				className: "text-[13px] text-primary cursor-pointer bg-transparent border-none font-[inherit] p-0 underline",
				onClick: () => n("/ingest/sources"),
				children: "Back to Sources"
			})
		}), /* @__PURE__ */ P("div", {
			className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3",
			role: "alert",
			children: [/* @__PURE__ */ P("span", {
				className: "text-[13px] font-medium",
				children: ["Failed to load source: ", p]
			}), /* @__PURE__ */ N("button", {
				onClick: () => void K(),
				className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
				children: "Retry"
			})]
		})]
	}) : o ? /* @__PURE__ */ P("div", {
		"data-testid": "source-detail-page",
		className: "p-6 flex flex-col gap-4",
		children: [
			/* @__PURE__ */ N("div", {
				className: "flex items-center justify-between mb-4 flex-wrap gap-3",
				children: /* @__PURE__ */ N("div", {
					className: "flex items-center gap-2.5",
					children: /* @__PURE__ */ N("button", {
						className: "text-[13px] text-primary cursor-pointer bg-transparent border-none font-[inherit] p-0 underline",
						onClick: () => n("/ingest/sources"),
						children: "Back to Sources"
					})
				})
			}),
			/* @__PURE__ */ P("div", {
				className: "flex items-center justify-between mb-4 flex-wrap gap-3",
				children: [/* @__PURE__ */ P("div", {
					className: "flex items-center gap-2.5",
					children: [
						/* @__PURE__ */ N("h2", {
							className: "m-0 text-[22px] font-bold text-text-primary",
							children: o.name
						}),
						/* @__PURE__ */ N(m, {
							tone: fe(o.type),
							size: "sm",
							children: de(o.type)
						}),
						/* @__PURE__ */ N(m, {
							tone: ue(o.status),
							size: "sm",
							children: o.status
						})
					]
				}), /* @__PURE__ */ N("div", {
					className: "flex gap-2.5 items-center",
					children: g ? /* @__PURE__ */ P(M, { children: [/* @__PURE__ */ N("button", {
						className: "px-3.5 py-1.5 text-[13px] font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary",
						onClick: re,
						children: "Cancel"
					}), /* @__PURE__ */ N("button", {
						className: f("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]", w && "opacity-50 cursor-not-allowed"),
						onClick: () => void ie(),
						disabled: w,
						children: w ? "Saving..." : "Save Changes"
					})] }) : /* @__PURE__ */ N("button", {
						className: "px-3.5 py-1.5 text-[13px] font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary",
						onClick: ne,
						children: "Edit"
					})
				})]
			}),
			p && /* @__PURE__ */ P("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3",
				role: "alert",
				children: [/* @__PURE__ */ N("span", {
					className: "text-[13px] font-medium",
					children: p
				}), /* @__PURE__ */ N("button", {
					onClick: () => h(null),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
					children: "Dismiss"
				})]
			}),
			/* @__PURE__ */ P("div", {
				className: "bg-surface border border-border rounded-[10px] p-4",
				children: [/* @__PURE__ */ N("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Configuration"
				}), g ? /* @__PURE__ */ N("div", { children: Object.entries(k).map(([e, t]) => /* @__PURE__ */ P("div", {
					className: "flex items-center gap-3 mb-2.5",
					children: [/* @__PURE__ */ N("label", {
						htmlFor: `${v}-cfg-${e}`,
						className: "text-xs font-semibold text-text-tertiary min-w-[140px]",
						children: e
					}), /* @__PURE__ */ N(x, {
						id: `${v}-cfg-${e}`,
						className: "flex-1",
						value: typeof t == "string" ? t : JSON.stringify(t),
						onChange: (t) => A({
							...k,
							[e]: t.target.value
						})
					})]
				}, e)) }) : /* @__PURE__ */ P("div", { children: [Object.entries(o.config).map(([e, t]) => /* @__PURE__ */ P("div", {
					className: "flex items-center gap-3 py-1.5 border-b border-border",
					children: [/* @__PURE__ */ N("span", {
						className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight",
						children: e
					}), /* @__PURE__ */ N("span", {
						className: "text-[13px] text-text-secondary font-mono break-all",
						children: typeof t == "string" ? t : JSON.stringify(t)
					})]
				}, e)), Object.keys(o.config).length === 0 && /* @__PURE__ */ N("span", {
					className: "text-[13px] text-text-tertiary",
					children: "No configuration fields."
				})] })]
			}),
			o ? /* @__PURE__ */ N(ce, { sourceId: o.sourceId }) : null,
			/* @__PURE__ */ P("div", {
				className: "bg-surface border border-border rounded-[10px] p-4",
				children: [/* @__PURE__ */ N("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Mapping Rules"
				}), g ? /* @__PURE__ */ N(J, {
					rules: I,
					onChange: L
				}) : /* @__PURE__ */ N(J, {
					rules: o.mappingRules,
					onChange: () => {},
					readOnly: !0
				})]
			}),
			/* @__PURE__ */ P("div", {
				className: "bg-surface border border-border rounded-[10px] p-4",
				children: [/* @__PURE__ */ P("div", {
					className: "flex items-center justify-between mb-3",
					children: [/* @__PURE__ */ N("div", {
						className: "text-sm font-semibold text-text-primary",
						children: "Sync History"
					}), /* @__PURE__ */ N("button", {
						className: f("px-3.5 py-1.5 text-[13px] font-medium rounded-md cursor-pointer font-[inherit]", y || o.status === "paused" ? "border border-border bg-surface-inset text-text-tertiary opacity-70 cursor-not-allowed" : "border border-primary bg-info-bg text-primary"),
						disabled: y || o.status === "paused",
						onClick: () => void ae(),
						"data-testid": "sync-now-btn",
						children: y ? "Syncing..." : "Sync Now"
					})]
				}), o.lastSyncAt ? /* @__PURE__ */ P(M, { children: [/* @__PURE__ */ P("div", {
					className: "text-xs text-text-tertiary mb-2.5",
					children: [
						"Last synced: ",
						me(o.lastSyncAt),
						" (",
						new Date(o.lastSyncAt).toLocaleString(),
						")"
					]
				}), o.lastSyncStats && /* @__PURE__ */ P("div", {
					className: "grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2.5",
					children: [
						/* @__PURE__ */ P("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ N("div", {
								className: "text-xl font-bold text-text-primary leading-none",
								children: o.lastSyncStats.filesDiscovered
							}), /* @__PURE__ */ N("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Found"
							})]
						}),
						/* @__PURE__ */ P("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ N("div", {
								className: "text-xl font-bold text-[var(--color-state-completed)] leading-none",
								children: o.lastSyncStats.filesIngested
							}), /* @__PURE__ */ N("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Ingested"
							})]
						}),
						/* @__PURE__ */ P("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ N("div", {
								className: "text-xl font-bold text-text-primary leading-none",
								children: o.lastSyncStats.filesSkipped
							}), /* @__PURE__ */ N("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Skipped"
							})]
						}),
						/* @__PURE__ */ P("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ N("div", {
								className: f("text-xl font-bold leading-none", o.lastSyncStats.filesFailed > 0 ? "text-[var(--color-state-failed)]" : "text-text-primary"),
								children: o.lastSyncStats.filesFailed
							}), /* @__PURE__ */ N("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Errors"
							})]
						}),
						/* @__PURE__ */ P("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ N("div", {
								className: "text-xl font-bold text-text-primary leading-none",
								children: pe(o.lastSyncStats.durationMs)
							}), /* @__PURE__ */ N("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Duration"
							})]
						})
					]
				})] }) : /* @__PURE__ */ N("span", {
					className: "text-[13px] text-text-tertiary",
					children: "No sync history yet."
				})]
			}),
			/* @__PURE__ */ P("div", {
				className: "bg-surface border border-border rounded-[10px] p-4",
				children: [/* @__PURE__ */ N("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Settings"
				}), g ? /* @__PURE__ */ P("div", { children: [
					/* @__PURE__ */ P("div", {
						className: "flex items-center gap-3 mb-2.5",
						children: [/* @__PURE__ */ N("span", {
							id: `${v}-schedule-label`,
							className: "text-xs font-semibold text-text-tertiary min-w-[140px]",
							children: "Sync Schedule"
						}), /* @__PURE__ */ P("div", {
							role: "group",
							"aria-labelledby": `${v}-schedule-label`,
							className: "flex gap-2 flex-1 flex-wrap",
							children: [/* @__PURE__ */ N(S, {
								"aria-label": "Schedule preset",
								className: "w-auto min-w-[160px]",
								value: le.some((e) => e.cron === R) ? R : "__custom__",
								onChange: (e) => {
									e.target.value !== "__custom__" && z(e.target.value);
								},
								"data-testid": "schedule-preset",
								options: [...le.map((e) => ({
									value: e.cron,
									label: e.label
								})), {
									value: "__custom__",
									label: "Custom…"
								}]
							}), /* @__PURE__ */ N(x, {
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
					/* @__PURE__ */ P("div", {
						className: "flex items-center gap-3 mb-2.5",
						children: [/* @__PURE__ */ N("label", {
							htmlFor: `${v}-default-pipeline`,
							className: "text-xs font-semibold text-text-tertiary min-w-[140px]",
							children: "Default Pipeline"
						}), /* @__PURE__ */ N(S, {
							id: `${v}-default-pipeline`,
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
					/* @__PURE__ */ P("div", {
						className: "flex items-center gap-3 mb-2.5",
						children: [/* @__PURE__ */ N("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[140px]",
							children: "Pipeline overrides"
						}), /* @__PURE__ */ P("div", {
							className: "flex-1 flex flex-col gap-2",
							children: [/* @__PURE__ */ P("button", {
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
							}), W ? /* @__PURE__ */ P("div", {
								"data-testid": "overrides-section",
								className: "flex flex-col gap-1.5",
								children: [Object.keys(H).length === 0 ? /* @__PURE__ */ N("div", {
									className: "text-xs text-text-tertiary",
									children: "No overrides — every matched type uses the default pipeline."
								}) : Object.entries(H).map(([e, t]) => /* @__PURE__ */ P("div", {
									className: "flex gap-2 items-center",
									children: [
										/* @__PURE__ */ N("span", {
											className: "flex-[0_0_160px] text-[13px]",
											children: a.find((t) => t.id === e)?.name ?? e
										}),
										/* @__PURE__ */ N(S, {
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
										/* @__PURE__ */ N("button", {
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
								}, e)), /* @__PURE__ */ N(S, {
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
				] }) : /* @__PURE__ */ P("div", { children: [
					/* @__PURE__ */ P("div", {
						className: "flex items-center gap-3 py-1.5 border-b border-border",
						children: [/* @__PURE__ */ N("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight",
							children: "Sync Schedule"
						}), /* @__PURE__ */ N("span", {
							className: "text-[13px] text-text-secondary font-mono break-all",
							children: o.syncSchedule ?? "Manual (no schedule)"
						})]
					}),
					/* @__PURE__ */ P("div", {
						className: "flex items-center gap-3 py-1.5 border-b border-border",
						children: [/* @__PURE__ */ N("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight",
							children: "Default Pipeline"
						}), /* @__PURE__ */ N("span", {
							className: "text-[13px] text-text-secondary font-mono break-all",
							children: o.defaultPipelineId ? i.find((e) => e.id === o.defaultPipelineId)?.name ?? o.defaultPipelineId : "—"
						})]
					}),
					/* @__PURE__ */ P("div", {
						className: "flex items-center gap-3 py-1.5",
						children: [/* @__PURE__ */ N("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight",
							children: "Status"
						}), /* @__PURE__ */ P("span", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ N(m, {
								tone: ue(o.status),
								size: "sm",
								children: o.status
							}), /* @__PURE__ */ N("button", {
								className: f("px-3.5 py-1.5 text-xs font-medium rounded-md cursor-pointer font-[inherit] border-none text-white", o.status === "paused" ? "bg-state-completed" : "bg-state-awaiting"),
								onClick: () => void oe(),
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
var _e = "", Q = [
	"queued",
	"mapping",
	"materializing",
	"triggering",
	"done"
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
function be(e) {
	switch (e) {
		case "rule": return "Matched a configured rule";
		case "llm-match": return "LLM matched to existing DocType";
		case "llm-generate": return "LLM proposed a new DocType";
		default: return e;
	}
}
function xe(e, t) {
	if (t === "failed") return e === "queued";
	let n = Q;
	return n.indexOf(e) <= n.indexOf(t);
}
function $(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : `${Math.floor(t / 864e5)}d ago`;
}
function Se({ item: t, sourceName: n, onClose: r, onRetry: i, onSkip: a }) {
	let { idToken: s } = e(), [c, l] = j(null), [u, d] = j(null), { events: p } = o(), g = A(null), b = A(null), x = h(t !== null);
	D(() => {
		if (!t) return;
		let e = (e) => {
			if (x()) {
				if (e.key === "Escape") {
					r();
					return;
				}
				v(e, g.current);
			}
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		t,
		r,
		x
	]), D(() => {
		if (t) return b.current = typeof document < "u" ? document.activeElement : null, y(g.current), () => {
			_(b.current), b.current = null;
		};
	}, [t]);
	let S = k(() => {
		if (!t) return /* @__PURE__ */ new Map();
		let e = /* @__PURE__ */ new Map();
		for (let n of p) n.ingestId === t.itemId && (n.type === "item.status" && typeof n.status == "string" && typeof n.timestamp == "string" && e.set(n.status, n.timestamp), n.type === "item.materialized" && typeof n.timestamp == "string" && e.set("done", n.timestamp), n.type === "item.failed" && typeof n.timestamp == "string" && e.set("failed", n.timestamp));
		return e;
	}, [p, t]);
	if (!t) return null;
	let C = t.status === "failed", w = t.status === "done" || t.status === "failed", T = typeof t.mappingConfidence == "number" ? t.mappingConfidence : null, E = async () => {
		l("retry");
		try {
			await i(t.itemId) !== !1 && r();
		} finally {
			l(null);
		}
	}, O = async () => {
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
			let n = await fetch(`${_e}/api/ingest/items/${t.itemId}/remap`, {
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
	return /* @__PURE__ */ N("div", {
		className: "fixed inset-0 bg-black/35 z-[9999] flex justify-end",
		onClick: r,
		"data-testid": "ingest-item-drawer-scrim",
		children: /* @__PURE__ */ P("div", {
			ref: g,
			className: "w-[min(560px,100vw)] h-full bg-surface shadow-[-12px_0_32px_rgba(0,0,0,0.12)] overflow-y-auto font-[inherit] flex flex-col",
			onClick: (e) => e.stopPropagation(),
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Ingest item details",
			"data-testid": "ingest-item-drawer",
			children: [
				/* @__PURE__ */ P("div", {
					className: "px-5 py-4 border-b border-border flex items-center justify-between sticky top-0 bg-surface z-[1]",
					children: [/* @__PURE__ */ N("h3", {
						className: "text-base font-bold text-text-primary m-0",
						children: "Ingest Item"
					}), /* @__PURE__ */ N("button", {
						className: "bg-transparent border-none text-[22px] leading-none cursor-pointer text-text-tertiary p-1 font-[inherit]",
						onClick: r,
						"aria-label": "Close",
						"data-testid": "ingest-item-drawer-close",
						children: "×"
					})]
				}),
				/* @__PURE__ */ P("div", {
					className: "p-5 flex flex-col gap-4.5 flex-1",
					children: [
						/* @__PURE__ */ P("div", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ N("div", {
									className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
									children: "Source path"
								}),
								/* @__PURE__ */ N("div", {
									className: "font-mono text-xs text-text-primary bg-surface-inset border border-border rounded-md px-2.5 py-2 break-all",
									children: t.sourcePath
								}),
								/* @__PURE__ */ P("div", {
									className: "flex gap-2 items-center mt-1",
									children: [
										/* @__PURE__ */ N(m, {
											tone: ve(t.status),
											size: "sm",
											children: t.status
										}),
										n && /* @__PURE__ */ P("span", {
											className: "text-xs text-text-tertiary",
											children: ["from ", /* @__PURE__ */ N("strong", {
												className: "text-text-secondary",
												children: n
											})]
										}),
										/* @__PURE__ */ P("span", {
											className: "text-xs text-text-tertiary ml-auto",
											children: ["Updated ", $(t.updatedAt)]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ P("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ N("div", {
								className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
								children: "Status timeline"
							}), /* @__PURE__ */ P("div", {
								className: "flex flex-col relative",
								children: [Q.map((e, n) => {
									let r = xe(e, t.status), i = e === t.status, a = C && n === 0, o = {
										...r ? {
											background: a ? "var(--color-state-failed)" : "var(--color-state-completed)",
											borderColor: a ? "var(--color-state-failed)" : "var(--color-state-completed)"
										} : {},
										...i && !w ? {
											background: "var(--color-state-running)",
											borderColor: "var(--color-state-running)"
										} : {}
									};
									return /* @__PURE__ */ P("div", {
										className: "flex items-start gap-3 relative py-1.5",
										children: [
											n < Q.length - 1 && /* @__PURE__ */ N("span", {
												className: "absolute left-[5px] top-[18px] bottom-[-6px] w-0.5 bg-border",
												"aria-hidden": "true"
											}),
											/* @__PURE__ */ N("span", {
												className: "w-3 h-3 rounded-full shrink-0 mt-1 border-2 border-border bg-surface",
												style: o,
												"aria-hidden": "true"
											}),
											/* @__PURE__ */ P("div", { children: [/* @__PURE__ */ N("div", {
												className: "text-[13px] font-medium text-text-primary",
												children: e
											}), (() => {
												let n = S.get(e);
												return n ? /* @__PURE__ */ N("div", {
													"data-testid": `timeline-meta-${e}`,
													className: "text-[11px] text-text-tertiary mt-0.5",
													children: $(n)
												}) : i ? /* @__PURE__ */ N("div", {
													"data-testid": `timeline-meta-${e}`,
													className: "text-[11px] text-text-tertiary mt-0.5",
													children: w ? $(t.updatedAt) : "in progress"
												}) : null;
											})()] })
										]
									}, e);
								}), C && /* @__PURE__ */ P("div", {
									className: "flex items-start gap-3 relative py-1.5",
									children: [/* @__PURE__ */ N("span", { className: "w-3 h-3 rounded-full shrink-0 mt-1 border-2 bg-state-failed border-state-failed" }), /* @__PURE__ */ P("div", { children: [/* @__PURE__ */ N("div", {
										className: "text-[13px] font-medium text-[var(--color-state-failed)]",
										children: "failed"
									}), /* @__PURE__ */ N("div", {
										"data-testid": "timeline-meta-failed",
										className: "text-[11px] text-text-tertiary mt-0.5",
										children: $(S.get("failed") ?? t.updatedAt)
									})] })]
								})]
							})]
						}),
						/* @__PURE__ */ P("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ N("div", {
								className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
								children: "Mapping decision"
							}), t.mappingMethod ? /* @__PURE__ */ P(M, { children: [/* @__PURE__ */ P("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ N(m, {
									tone: ye(t.mappingMethod),
									size: "sm",
									children: t.mappingMethod
								}), /* @__PURE__ */ N("span", {
									className: "text-xs text-text-secondary",
									children: be(t.mappingMethod)
								})]
							}), T !== null && /* @__PURE__ */ P("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ N("div", {
									className: "flex-1 h-2 bg-surface-inset rounded overflow-hidden border border-border",
									children: /* @__PURE__ */ N("div", {
										className: "h-full transition-[width] duration-200 ease-out",
										style: {
											width: `${Math.round(T * 100)}%`,
											background: T >= .7 ? "var(--color-state-completed)" : T >= .4 ? "var(--color-state-awaiting)" : "var(--color-state-failed)"
										}
									})
								}), /* @__PURE__ */ P("span", {
									className: "font-mono text-xs text-text-secondary min-w-[48px] text-right",
									children: [(T * 100).toFixed(0), "%"]
								})]
							})] }) : /* @__PURE__ */ P("span", {
								className: "text-xs text-text-tertiary",
								children: [
									"No mapping decision yet — item is still in ",
									t.status,
									"."
								]
							})]
						}),
						/* @__PURE__ */ P("div", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ N("div", {
									className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
									children: "Identity"
								}),
								/* @__PURE__ */ P("div", {
									className: "flex items-center gap-3 py-1.5 border-b border-border",
									children: [/* @__PURE__ */ N("span", {
										className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight",
										children: "Item ID"
									}), /* @__PURE__ */ N("span", {
										className: "text-[13px] text-text-secondary font-mono break-all",
										children: t.itemId
									})]
								}),
								/* @__PURE__ */ P("div", {
									className: "flex items-center gap-3 py-1.5 border-b border-border",
									children: [/* @__PURE__ */ N("span", {
										className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight",
										children: "Document Type"
									}), /* @__PURE__ */ N("span", {
										className: "text-[13px] text-text-secondary font-mono break-all",
										children: t.documentTypeId ?? "—"
									})]
								}),
								/* @__PURE__ */ P("div", {
									className: "flex items-center gap-3 py-1.5 border-b border-border",
									children: [/* @__PURE__ */ N("span", {
										className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight",
										children: "Document"
									}), /* @__PURE__ */ N("span", {
										className: "text-[13px] text-text-secondary font-mono break-all",
										children: t.documentId ? /* @__PURE__ */ N("a", {
											href: `/documents/${t.documentId}`,
											className: "text-primary",
											children: t.documentId
										}) : "—"
									})]
								}),
								/* @__PURE__ */ P("div", {
									className: "flex items-center gap-3 py-1.5",
									children: [/* @__PURE__ */ N("span", {
										className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight",
										children: "Pipeline Run"
									}), /* @__PURE__ */ N("span", {
										className: "text-[13px] text-text-secondary font-mono break-all",
										children: t.pipelineRunId ?? "—"
									})]
								})
							]
						}),
						t.error && /* @__PURE__ */ P("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ N("div", {
								className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
								children: "Error"
							}), /* @__PURE__ */ N("div", {
								className: "bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-md p-2.5 text-xs font-mono whitespace-pre-wrap break-words",
								children: t.error
							})]
						}),
						u && /* @__PURE__ */ P("div", {
							role: "alert",
							className: "bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-md p-2.5 text-xs font-mono whitespace-pre-wrap break-words",
							children: ["Re-map failed: ", u]
						})
					]
				}),
				/* @__PURE__ */ P("div", {
					className: "px-4 py-4 border-t border-border flex gap-2 justify-end flex-wrap bg-surface sticky bottom-0",
					children: [
						/* @__PURE__ */ N("button", {
							className: f("px-3.5 py-1.5 text-[13px] font-medium font-[inherit] rounded-md cursor-pointer bg-surface border border-border text-text-secondary", (c || t.status === "done") && "opacity-50 cursor-not-allowed"),
							onClick: () => void F(),
							disabled: !!c || t.status === "done",
							"data-testid": "item-remap-btn",
							title: "Re-run the mapping engine for this item",
							children: c === "remap" ? "Re-mapping…" : "Re-map"
						}),
						/* @__PURE__ */ N("button", {
							className: f("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] rounded-md cursor-pointer", c || !C ? "bg-surface border border-border text-text-secondary opacity-50 cursor-not-allowed" : "bg-primary border-none text-white"),
							onClick: () => void E(),
							disabled: !!c || !C,
							"data-testid": "item-retry-btn",
							title: C ? "Retry this item from the beginning" : "Only failed items can be retried",
							children: c === "retry" ? "Retrying…" : "Retry"
						}),
						/* @__PURE__ */ N("button", {
							className: f("px-3.5 py-1.5 text-[13px] font-medium font-[inherit] rounded-md cursor-pointer", c || t.status === "done" ? "bg-surface border border-border text-text-secondary opacity-50 cursor-not-allowed" : "bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)]"),
							onClick: () => void O(),
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
var Ce = [
	"queued",
	"mapping",
	"materializing",
	"triggering",
	"done",
	"failed"
];
function we(e) {
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
function Te(e) {
	switch (e) {
		case "rule": return "neutral";
		case "llm-match": return "info";
		case "llm-generate": return "purple";
		default: return "neutral";
	}
}
function Ee(e, t = 50) {
	return e.length <= t ? e : "..." + e.slice(e.length - t + 3);
}
function De() {
	let [e, n] = j(null), [r, i] = j(null), [a, o] = j(null), { sources: s } = t(), { items: l, loading: u, error: d, refresh: f, retryItem: p, skipItem: h, actionError: _, clearActionError: v } = c({
		sourceId: e,
		status: r
	}), y = a ? l.find((e) => e.itemId === a.itemId) ?? a : null, x = k(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of s) e.set(t.sourceId, t.name);
		return e;
	}, [s]), w = E(async (e) => p(e), [p]), T = E(async (e) => h(e), [h]);
	return u && l.length === 0 ? /* @__PURE__ */ P("div", {
		"data-testid": "ingest-items-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ N("div", {
				className: "flex items-center justify-between mb-4",
				children: /* @__PURE__ */ N("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Ingest Items"
				})
			}),
			/* @__PURE__ */ N(b, { height: 48 }),
			/* @__PURE__ */ N(b, { height: 48 }),
			/* @__PURE__ */ N(b, { height: 48 })
		]
	}) : /* @__PURE__ */ P("div", {
		"data-testid": "ingest-items-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ N("div", {
				className: "flex items-center justify-between mb-4",
				children: /* @__PURE__ */ P("div", { children: [/* @__PURE__ */ N("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Ingest Items"
				}), /* @__PURE__ */ P("span", {
					className: "text-[13px] text-text-tertiary",
					children: [
						l.length,
						" item",
						l.length === 1 ? "" : "s"
					]
				})] })
			}),
			/* @__PURE__ */ P("div", {
				className: "flex gap-2.5 items-center mb-3 flex-wrap",
				children: [
					/* @__PURE__ */ N(S, {
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
					/* @__PURE__ */ N(S, {
						"aria-label": "Filter by status",
						className: "w-auto",
						value: r ?? "",
						onChange: (e) => i(e.target.value || null),
						"data-testid": "status-filter",
						options: [{
							value: "",
							label: "All"
						}, ...Ce.map((e) => ({
							value: e,
							label: e
						}))]
					}),
					/* @__PURE__ */ N("button", {
						className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
						onClick: () => void f(),
						"data-testid": "refresh-btn",
						children: "Refresh"
					})
				]
			}),
			d && /* @__PURE__ */ P("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4",
				role: "alert",
				children: [/* @__PURE__ */ N("span", {
					className: "text-[13px] font-medium",
					children: "Failed to load ingest items."
				}), /* @__PURE__ */ N("button", {
					onClick: () => void f(),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
					children: "Retry"
				})]
			}),
			_ && /* @__PURE__ */ P("div", {
				"data-testid": "ingest-items-action-error",
				role: "alert",
				className: "px-4 py-3 bg-danger-bg border border-danger-border text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-4",
				children: [/* @__PURE__ */ P("span", {
					className: "text-[13px] font-medium",
					children: ["Could not update that item: ", _]
				}), /* @__PURE__ */ N("button", {
					onClick: v,
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-danger-fg border border-danger-border rounded-md cursor-pointer font-[inherit]",
					children: "Dismiss"
				})]
			}),
			!d && l.length === 0 ? /* @__PURE__ */ N(g, {
				icon: "📋",
				title: "No items found",
				body: "No ingest items match the current filters."
			}) : !d && /* @__PURE__ */ N("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ P("table", {
					className: "w-full border-collapse text-[13px]",
					children: [/* @__PURE__ */ N("thead", { children: /* @__PURE__ */ P("tr", {
						className: "border-b border-border",
						children: [
							/* @__PURE__ */ N("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "File Path"
							}),
							/* @__PURE__ */ N("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Source"
							}),
							/* @__PURE__ */ N("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Status"
							}),
							/* @__PURE__ */ N("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Type"
							}),
							/* @__PURE__ */ N("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Method"
							}),
							/* @__PURE__ */ N("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Document"
							}),
							/* @__PURE__ */ N("th", {
								className: "p-2 text-right text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ N("tbody", { children: l.map((e) => /* @__PURE__ */ P("tr", {
						className: "border-b border-border cursor-pointer hover:bg-surface-hover",
						onClick: () => o(e),
						onKeyDown: C(() => o(e)),
						role: "button",
						tabIndex: 0,
						"aria-label": `Open details for ${e.sourcePath}`,
						"data-testid": `item-row-${e.itemId}`,
						children: [
							/* @__PURE__ */ N("td", {
								className: "p-2 font-medium text-text-primary max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap",
								title: e.sourcePath,
								children: Ee(e.sourcePath)
							}),
							/* @__PURE__ */ N("td", {
								className: "p-2 text-text-secondary",
								children: x.get(e.sourceId) ?? e.sourceId.slice(0, 8)
							}),
							/* @__PURE__ */ N("td", {
								className: "p-2",
								children: /* @__PURE__ */ N(m, {
									tone: we(e.status),
									size: "sm",
									children: e.status
								})
							}),
							/* @__PURE__ */ N("td", {
								className: "p-2 font-mono text-[11px] text-text-secondary",
								children: e.documentTypeId ?? "—"
							}),
							/* @__PURE__ */ N("td", {
								className: "p-2",
								children: e.mappingMethod ? /* @__PURE__ */ N(m, {
									tone: Te(e.mappingMethod),
									size: "xs",
									children: e.mappingMethod
								}) : "—"
							}),
							/* @__PURE__ */ N("td", {
								className: "p-2",
								children: e.documentId ? /* @__PURE__ */ P("a", {
									href: `/documents/${e.documentId}`,
									className: "text-primary no-underline font-medium text-xs",
									onClick: (e) => e.stopPropagation(),
									onKeyDown: (e) => e.stopPropagation(),
									children: [e.documentId.slice(0, 8), "..."]
								}) : "—"
							}),
							/* @__PURE__ */ N("td", {
								className: "p-2 text-right",
								onClick: (e) => e.stopPropagation(),
								onKeyDown: (e) => e.stopPropagation(),
								children: /* @__PURE__ */ P("div", {
									className: "flex gap-1.5 justify-end",
									children: [e.status === "failed" && /* @__PURE__ */ N("button", {
										className: "px-2.5 py-1 text-[11px] font-medium border border-border rounded-[5px] bg-surface cursor-pointer font-[inherit] text-text-secondary",
										onClick: () => void w(e.itemId),
										"data-testid": `retry-${e.itemId}`,
										children: "Retry"
									}), e.status !== "done" && /* @__PURE__ */ N("button", {
										className: "px-2.5 py-1 text-[11px] font-medium border border-[var(--color-state-failed)] rounded-[5px] bg-danger-bg cursor-pointer font-[inherit] text-[var(--color-state-failed)]",
										onClick: () => void T(e.itemId),
										"data-testid": `skip-${e.itemId}`,
										children: "Skip"
									})]
								})
							})
						]
					}, e.itemId)) })]
				})
			}),
			/* @__PURE__ */ N(Se, {
				item: y,
				sourceName: y ? x.get(y.sourceId) : void 0,
				onClose: () => o(null),
				onRetry: w,
				onSkip: T
			})
		]
	});
}
//#endregion
//#region src/components/ingest/IngestAuditPage.tsx
var Oe = [
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
], ke = [
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
function Ae() {
	let [e, t] = j("24h"), [n, r] = j(""), [a, o] = j(""), [s, c] = j(""), l = O(), [u, d] = j(null), f = k(() => {
		let t = ke.find((t) => t.value === e);
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
	]), { entries: p, loading: m, error: h } = i(f);
	return /* @__PURE__ */ P("div", {
		"data-testid": "ingest-audit-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ N("div", {
				className: "mb-3",
				children: /* @__PURE__ */ N("div", {
					className: "text-[22px] font-bold text-text-primary",
					children: "Audit log"
				})
			}),
			/* @__PURE__ */ P("div", {
				className: "flex gap-2 flex-wrap items-center p-3 bg-surface-inset rounded-lg mb-3",
				children: [
					/* @__PURE__ */ N("label", {
						htmlFor: `${l}-time`,
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Time"
					}),
					/* @__PURE__ */ N(S, {
						id: `${l}-time`,
						"data-testid": "audit-time-range",
						className: "w-auto min-w-[140px]",
						value: e,
						onChange: (e) => t(e.target.value),
						options: ke.map((e) => ({
							value: e.value,
							label: e.label
						}))
					}),
					/* @__PURE__ */ N("label", {
						htmlFor: `${l}-event`,
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Event"
					}),
					/* @__PURE__ */ N(S, {
						id: `${l}-event`,
						"data-testid": "audit-event-type",
						className: "w-auto min-w-[140px]",
						value: n,
						onChange: (e) => r(e.target.value),
						options: Oe.map((e) => ({
							value: e.value,
							label: e.label
						}))
					}),
					/* @__PURE__ */ N("label", {
						htmlFor: `${l}-actor`,
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Actor"
					}),
					/* @__PURE__ */ N(x, {
						id: `${l}-actor`,
						"data-testid": "audit-actor",
						className: "w-auto min-w-[140px]",
						value: a,
						onChange: (e) => o(e.target.value),
						placeholder: "email or system"
					}),
					/* @__PURE__ */ N("label", {
						htmlFor: `${l}-target`,
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Target"
					}),
					/* @__PURE__ */ N(x, {
						id: `${l}-target`,
						"data-testid": "audit-target-id",
						className: "w-auto min-w-[140px]",
						value: s,
						onChange: (e) => c(e.target.value),
						placeholder: "sourceId / itemId"
					})
				]
			}),
			h ? /* @__PURE__ */ P("div", {
				role: "alert",
				"data-testid": "audit-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3",
				children: ["Couldn't load audit log: ", h]
			}) : null,
			m && p.length === 0 ? /* @__PURE__ */ N("div", { children: /* @__PURE__ */ N(b, { height: 200 }) }) : p.length === 0 && !h ? /* @__PURE__ */ N(g, {
				icon: "📜",
				title: "No audit entries",
				body: "Mapping decisions, source changes, and write-back attempts will appear here once instrumentation is wired (hub#2215).",
				testId: "audit-empty"
			}) : /* @__PURE__ */ P("table", {
				"data-testid": "audit-table",
				className: "w-full border-collapse bg-surface border border-border rounded-[10px] overflow-hidden",
				children: [/* @__PURE__ */ N("thead", { children: /* @__PURE__ */ P("tr", { children: [
					/* @__PURE__ */ N("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Time"
					}),
					/* @__PURE__ */ N("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Actor"
					}),
					/* @__PURE__ */ N("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Event"
					}),
					/* @__PURE__ */ N("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Target"
					}),
					/* @__PURE__ */ N("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Summary"
					}),
					/* @__PURE__ */ N("th", { className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border" })
				] }) }), /* @__PURE__ */ N("tbody", { children: p.map((e) => /* @__PURE__ */ N(je, {
					entry: e,
					expanded: u === e.auditId,
					onToggle: () => d(u === e.auditId ? null : e.auditId)
				}, e.auditId)) })]
			})
		]
	});
}
function je({ entry: e, expanded: t, onToggle: n }) {
	return /* @__PURE__ */ P(M, { children: [/* @__PURE__ */ P("tr", {
		"data-testid": `audit-row-${e.auditId}`,
		children: [
			/* @__PURE__ */ N("td", {
				className: "text-[13px] p-2 align-top border-b border-border font-mono text-xs",
				children: e.createdAt.slice(0, 19).replace("T", " ")
			}),
			/* @__PURE__ */ N("td", {
				className: "text-[13px] p-2 align-top border-b border-border",
				children: e.actor
			}),
			/* @__PURE__ */ N("td", {
				className: "text-[13px] p-2 align-top border-b border-border font-mono text-xs",
				children: e.eventType
			}),
			/* @__PURE__ */ P("td", {
				className: "text-[13px] p-2 align-top border-b border-border font-mono text-xs",
				title: e.targetId,
				children: [
					e.targetType,
					"/",
					e.targetId.slice(0, 12)
				]
			}),
			/* @__PURE__ */ N("td", {
				className: "text-[13px] p-2 align-top border-b border-border",
				children: e.summary
			}),
			/* @__PURE__ */ N("td", {
				className: "text-[13px] p-2 align-top border-b border-border",
				children: /* @__PURE__ */ N("button", {
					"data-testid": `audit-detail-toggle-${e.auditId}`,
					className: "text-[11px] text-primary bg-transparent border-none p-0 cursor-pointer underline",
					onClick: n,
					children: t ? "hide" : "detail"
				})
			})
		]
	}), t ? /* @__PURE__ */ N("tr", { children: /* @__PURE__ */ N("td", {
		colSpan: 6,
		className: "text-[13px] p-2 align-top border-b border-border",
		children: /* @__PURE__ */ N("pre", {
			"data-testid": `audit-detail-${e.auditId}`,
			className: "text-[11px] font-mono bg-surface-inset px-2 py-1.5 rounded whitespace-pre-wrap mt-1 max-h-[200px] overflow-auto",
			children: JSON.stringify(e.detail, null, 2)
		})
	}) }) : null] });
}
//#endregion
//#region src/components/ingest/ConflictsPage.tsx
function Me(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : `${Math.floor(t / 864e5)}d ago`;
}
function Ne(e) {
	if (e == null) return "";
	if (typeof e == "string") return e;
	try {
		return JSON.stringify(e, null, 2);
	} catch {
		return String(e);
	}
}
function Pe(e) {
	let t = (e.split(".").pop() ?? e).replace(/[_-]+/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2").trim();
	return t.charAt(0).toUpperCase() + t.slice(1);
}
function Fe(e) {
	return e.path && e.path.length > 0 ? e.path : e.field.split(".").slice(0, -1).map(Pe);
}
function Ie() {
	let { conflicts: e, loading: n, error: r, usingMock: i, refresh: a, resolveConflict: o, discardConflict: s, actionError: c, clearActionError: u } = l(), { sources: d } = t(), [f, h] = j({}), [_, v] = j({}), [y, S] = j(null), C = k(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of d) e.set(t.sourceId, t.name);
		return e;
	}, [d]), E = k(() => e.filter((e) => e.status === "pending"), [e]);
	D(() => {
		let e = new Set(E.map((e) => e.conflictId));
		h((t) => {
			let n = {};
			for (let [r, i] of Object.entries(t)) e.has(r.split("::")[0] ?? "") && (n[r] = i);
			return n;
		});
	}, [E]);
	let O = (e, t) => f[`${e}::${t}`] ?? "source", A = (e, t, n) => h((r) => ({
		...r,
		[`${e}::${t}`]: n
	})), F = async (e) => {
		S(e.conflictId);
		try {
			let t = {};
			for (let n of e.fields) t[n.field] = O(e.conflictId, n.field);
			let n = (_[e.conflictId] ?? "").trim(), r = {
				pick: "source",
				fieldChoices: t,
				...n ? { note: n } : {}
			};
			await o(e.conflictId, r);
		} finally {
			S(null);
		}
	}, ee = async (e) => {
		S(e);
		try {
			await s(e);
		} finally {
			S(null);
		}
	};
	return n && e.length === 0 ? /* @__PURE__ */ P("div", {
		"data-testid": "conflicts-page",
		className: "flex flex-col gap-3 p-6",
		children: [/* @__PURE__ */ N(b, { height: 48 }), /* @__PURE__ */ N(b, { height: 200 })]
	}) : /* @__PURE__ */ P("div", {
		"data-testid": "conflicts-page",
		className: "flex flex-col gap-6 p-6",
		children: [
			/* @__PURE__ */ P("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ P("span", {
					className: "text-xs uppercase tracking-wide text-text-tertiary",
					children: [
						"Incoming changes · ",
						E.length,
						" document",
						E.length === 1 ? "" : "s",
						" waiting"
					]
				}), /* @__PURE__ */ N(p, {
					size: "sm",
					variant: "ghost",
					onClick: () => void a(),
					"data-testid": "conflicts-refresh",
					children: "Refresh"
				})]
			}),
			i && /* @__PURE__ */ P("div", {
				className: "rounded-lg border border-warning-border bg-warning-bg px-3.5 py-2.5 text-xs text-warning-fg",
				"data-testid": "conflicts-mock-banner",
				children: [
					"Showing mock conflicts — backend endpoint ",
					/* @__PURE__ */ N("code", { children: "/api/sync/conflicts" }),
					" not implemented."
				]
			}),
			r && !i && /* @__PURE__ */ P("div", {
				className: "rounded-lg border border-danger-border bg-danger-bg px-4 py-3 text-[13px] text-danger-fg",
				role: "alert",
				children: ["Failed to load conflicts: ", r]
			}),
			c && /* @__PURE__ */ P("div", {
				"data-testid": "conflicts-action-error",
				role: "alert",
				className: "flex items-center justify-between gap-3 rounded-lg border border-danger-border bg-danger-bg px-4 py-3",
				children: [/* @__PURE__ */ P("span", {
					className: "text-[13px] font-medium text-danger-fg",
					children: ["That conflict was not updated: ", c]
				}), /* @__PURE__ */ N(p, {
					size: "sm",
					variant: "ghost",
					onClick: u,
					children: "Dismiss"
				})]
			}),
			E.length === 0 ? /* @__PURE__ */ N(g, {
				icon: "✅",
				title: "No pending conflicts",
				body: "Write-back conflicts that need operator intervention will appear here."
			}) : E.map((e) => /* @__PURE__ */ N(w, {
				documentTitle: e.documentTitle ?? e.documentId,
				changeCount: e.fields.length,
				documentMeta: /* @__PURE__ */ P(M, { children: [
					C.get(e.sourceId) ?? e.sourceId,
					" · detected",
					" ",
					Me(e.detectedAt)
				] }),
				notices: /* @__PURE__ */ P("div", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [/* @__PURE__ */ N(m, {
						tone: "warning",
						size: "xs",
						uppercase: !0,
						children: "Sync conflict"
					}), /* @__PURE__ */ P("span", {
						className: "text-[11px] text-text-tertiary",
						children: [
							e.summary,
							" · source edited ",
							Me(e.sourceUpdatedAt),
							", this copy edited ",
							Me(e.platformUpdatedAt)
						]
					})]
				}),
				footer: /* @__PURE__ */ P("div", {
					className: "flex flex-wrap items-center justify-end gap-2 border-t border-border pt-3",
					children: [
						/* @__PURE__ */ N(x, {
							"aria-label": "Optional note (logged in audit trail)",
							className: "min-w-[240px] flex-1",
							placeholder: "Optional note (logged in audit trail)",
							value: _[e.conflictId] ?? "",
							onChange: (t) => v((n) => ({
								...n,
								[e.conflictId]: t.target.value
							})),
							"data-testid": `conflict-note-${e.conflictId}`
						}),
						/* @__PURE__ */ N(p, {
							size: "sm",
							variant: "ghost",
							disabled: y === e.conflictId,
							onClick: () => void ee(e.conflictId),
							"data-testid": `conflict-discard-${e.conflictId}`,
							children: "Discard"
						}),
						/* @__PURE__ */ N(p, {
							size: "sm",
							variant: "primary",
							disabled: y === e.conflictId,
							onClick: () => void F(e),
							"data-testid": `conflict-resolve-${e.conflictId}`,
							children: y === e.conflictId ? "Applying…" : "Apply to document"
						})
					]
				}),
				children: e.fields.map((t) => {
					let n = O(e.conflictId, t.field);
					return /* @__PURE__ */ N(T, {
						"data-testid": `conflict-field-${t.field}`,
						category: Pe(t.field),
						...t.changedBy ? { author: { name: t.changedBy } } : {},
						path: Fe(t),
						locationHint: t.field,
						pairs: [{
							before: Ne(t.platformValue),
							after: Ne(t.sourceValue)
						}],
						beforeLabel: "This copy",
						afterLabel: "Incoming",
						badges: /* @__PURE__ */ N(m, {
							tone: n === "source" ? "success" : n === "merged" ? "info" : "neutral",
							size: "xs",
							"data-testid": `conflict-choice-${t.field}`,
							children: n === "source" ? "Taking incoming" : n === "merged" ? "Taking merged" : "Keeping this copy"
						}),
						actions: /* @__PURE__ */ N(Le, {
							field: t,
							side: n,
							onPick: (n) => A(e.conflictId, t.field, n)
						})
					}, t.field);
				})
			}, e.conflictId))
		]
	});
}
function Le({ field: e, side: t, onPick: n }) {
	let r = e.mergedValue !== void 0, i = [
		{
			value: "source",
			label: "Take incoming",
			enabled: !0
		},
		{
			value: "merged",
			label: "Take merged",
			enabled: r
		},
		{
			value: "platform",
			label: "Keep this copy",
			enabled: !0
		}
	];
	return /* @__PURE__ */ P("div", {
		className: "flex flex-wrap items-center gap-1.5",
		role: "group",
		"aria-label": `Resolution for ${e.field}`,
		children: [i.map((r) => /* @__PURE__ */ N("button", {
			type: "button",
			"aria-pressed": t === r.value,
			disabled: !r.enabled,
			onClick: () => r.enabled && n(r.value),
			className: f("cursor-pointer rounded-full border px-2.5 py-0.5 font-[inherit] text-[11px] font-medium", t === r.value ? "border-primary bg-primary text-white" : "border-border bg-surface text-text-secondary hover:border-border-emphasis", !r.enabled && "cursor-not-allowed opacity-40"),
			"data-testid": `field-pick-${e.field}-${r.value}`,
			children: r.label
		}, r.value)), r && t === "merged" && /* @__PURE__ */ P("span", {
			className: "font-mono text-[11px] text-text-tertiary",
			children: ["→ ", Ne(e.mergedValue)]
		})]
	});
}
//#endregion
//#region src/components/ingest/DeadLetterQueuePage.tsx
function Re(e) {
	let t = Date.now() - e;
	return t < 0 ? "just now" : t < 6e4 ? `${Math.floor(t / 1e3)}s ago` : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : `${Math.floor(t / 864e5)}d ago`;
}
function ze() {
	let { entries: e, loading: t, error: r, replay: i, drop: a } = n(), [o, s] = j(null), c = (e) => {
		s(null), e.catch((e) => {
			s(e instanceof Error ? e.message : String(e));
		});
	};
	return /* @__PURE__ */ P("div", {
		"data-testid": "ingest-dlq-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ N("div", {
				className: "flex items-baseline justify-between mb-4 gap-3 flex-wrap",
				children: /* @__PURE__ */ P("div", { children: [/* @__PURE__ */ N("div", {
					className: "text-[22px] font-bold text-text-primary",
					children: "Dead Letter Queue"
				}), /* @__PURE__ */ N("div", {
					className: "text-xs text-text-tertiary",
					children: "Items the engine couldn't process. Replay re-enqueues; drop purges."
				})] })
			}),
			r ? /* @__PURE__ */ N("div", {
				role: "alert",
				"data-testid": "ingest-dlq-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3",
				children: r
			}) : null,
			o ? /* @__PURE__ */ P("div", {
				"data-testid": "ingest-dlq-action-error",
				role: "alert",
				className: "px-4 py-3 bg-danger-bg border border-danger-border text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-3",
				children: [/* @__PURE__ */ P("span", {
					className: "text-[13px] font-medium",
					children: ["That entry was not updated: ", o]
				}), /* @__PURE__ */ N("button", {
					type: "button",
					onClick: () => s(null),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-danger-fg border border-danger-border rounded-md cursor-pointer font-[inherit]",
					children: "Dismiss"
				})]
			}) : null,
			t && e.length === 0 ? /* @__PURE__ */ P("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ N(b, { height: 96 }),
					/* @__PURE__ */ N(b, { height: 96 }),
					/* @__PURE__ */ N(b, { height: 96 })
				]
			}) : e.length === 0 && !r ? /* @__PURE__ */ N(g, {
				icon: "🧹",
				title: "DLQ is empty",
				body: "Failed items will land here. Replay re-enqueues into the source queue; drop purges without retry.",
				testId: "ingest-dlq-empty"
			}) : /* @__PURE__ */ N("div", {
				"data-testid": "ingest-dlq-list",
				className: "flex flex-col gap-3",
				children: e.map((e) => /* @__PURE__ */ N(Be, {
					entry: e,
					onReplay: () => c(i(e.id)),
					onDrop: () => c(a(e.id))
				}, e.id))
			})
		]
	});
}
function Be({ entry: e, onReplay: t, onDrop: n }) {
	return /* @__PURE__ */ P("div", {
		"data-testid": `dlq-row-${e.id}`,
		className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-2",
		children: [
			/* @__PURE__ */ P("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ N("span", {
					className: "font-mono text-[13px] text-text-primary",
					title: e.id,
					children: e.id
				}), /* @__PURE__ */ N("span", {
					className: "text-[11px] text-text-tertiary",
					children: Re(e.failedAtMs)
				})]
			}),
			/* @__PURE__ */ P("div", {
				className: "text-xs text-text-secondary flex gap-4 flex-wrap",
				children: [/* @__PURE__ */ P("span", { children: ["Attempts: ", /* @__PURE__ */ N("strong", { children: e.totalAttempts })] }), e.envelope.body?.sourceId ? /* @__PURE__ */ P("span", { children: ["Source: ", e.envelope.body.sourceId.slice(0, 12)] }) : null]
			}),
			e.lastError ? /* @__PURE__ */ N("div", {
				className: "text-xs text-text-primary font-mono bg-surface-inset px-2 py-1.5 rounded-md whitespace-pre-wrap break-words max-h-20 overflow-auto",
				children: e.lastError
			}) : null,
			/* @__PURE__ */ P("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ N("button", {
					"data-testid": `dlq-replay-${e.id}`,
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
					onClick: t,
					children: "Replay"
				}), /* @__PURE__ */ N("button", {
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
function Ve() {
	let { proposals: e, loading: t, error: n, promote: r, reject: i } = u(), [a, o] = j(null), s = (e) => {
		o(null), e.catch((e) => {
			o(e instanceof Error ? e.message : String(e));
		});
	};
	return /* @__PURE__ */ P("div", {
		"data-testid": "doctype-proposals-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ P("div", {
				className: "mb-4",
				children: [/* @__PURE__ */ N("div", {
					className: "text-[22px] font-bold text-text-primary",
					children: "DocType proposals"
				}), /* @__PURE__ */ N("div", {
					className: "text-xs text-text-tertiary mt-1",
					children: "Auto-discovered candidate types from the LLM mapper. Promote to accept; reject to suppress similar future proposals."
				})]
			}),
			n ? /* @__PURE__ */ P("div", {
				role: "alert",
				"data-testid": "proposals-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3",
				children: ["Couldn't load DocType proposals: ", n]
			}) : null,
			a ? /* @__PURE__ */ P("div", {
				"data-testid": "proposals-action-error",
				role: "alert",
				className: "px-4 py-3 bg-danger-bg border border-danger-border text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-3",
				children: [/* @__PURE__ */ P("span", {
					className: "text-[13px] font-medium",
					children: ["That proposal was not updated: ", a]
				}), /* @__PURE__ */ N("button", {
					type: "button",
					onClick: () => o(null),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-danger-fg border border-danger-border rounded-md cursor-pointer font-[inherit]",
					children: "Dismiss"
				})]
			}) : null,
			t && e.length === 0 ? /* @__PURE__ */ P("div", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ N(b, { height: 120 }), /* @__PURE__ */ N(b, { height: 120 })]
			}) : e.length === 0 && !n ? /* @__PURE__ */ N(g, {
				icon: "🧬",
				title: "No proposals waiting",
				body: "When the LLM mapper sees N similar files of an unknown shape, the proposed DocType lands here.",
				testId: "proposals-empty"
			}) : /* @__PURE__ */ N("div", {
				"data-testid": "proposals-list",
				className: "flex flex-col gap-3",
				children: e.map((e) => /* @__PURE__ */ N(He, {
					proposal: e,
					onPromote: () => s(r(e.proposalId)),
					onReject: () => s(i(e.proposalId))
				}, e.proposalId))
			})
		]
	});
}
function He({ proposal: e, onPromote: t, onReject: n }) {
	return /* @__PURE__ */ P("div", {
		"data-testid": `proposal-row-${e.proposalId}`,
		className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-2.5",
		children: [
			/* @__PURE__ */ P("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ N("span", {
					className: "text-base font-bold text-text-primary",
					children: e.proposedName
				}), /* @__PURE__ */ P("span", {
					className: "text-[11px] text-text-tertiary",
					children: [
						e.sampleIngestIds.length,
						" sample",
						e.sampleIngestIds.length === 1 ? "" : "s"
					]
				})]
			}),
			/* @__PURE__ */ P("div", {
				className: "text-xs text-text-secondary flex gap-4 flex-wrap",
				children: [/* @__PURE__ */ P("span", { children: ["Source: ", e.sourceId.slice(0, 12)] }), /* @__PURE__ */ P("span", { children: ["Signature: ", e.signature.slice(0, 24)] })]
			}),
			e.proposedDescription ? /* @__PURE__ */ N("div", {
				className: "text-[13px] text-text-primary leading-relaxed",
				children: e.proposedDescription
			}) : null,
			e.proposedFields.length > 0 ? /* @__PURE__ */ N("div", {
				className: "flex flex-wrap gap-1.5",
				children: e.proposedFields.map((e) => /* @__PURE__ */ P("span", {
					className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset text-text-secondary font-mono",
					children: [e.name, e.required ? "*" : ""]
				}, e.name))
			}) : null,
			e.reasoning ? /* @__PURE__ */ P("div", {
				className: "text-xs text-text-tertiary italic",
				title: e.reasoning,
				children: [e.reasoning.slice(0, 200), e.reasoning.length > 200 ? "…" : ""]
			}) : null,
			/* @__PURE__ */ P("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ N("button", {
					"data-testid": `proposal-promote-${e.proposalId}`,
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit] shrink-0",
					onClick: t,
					children: "Promote"
				}), /* @__PURE__ */ N("button", {
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
function Ue() {
	let { idToken: t } = e(), { items: n, threshold: i, loading: a, error: o, remap: s, skip: c } = r(), { types: l } = d({ idToken: t }), [u, f] = j({}), [p, m] = j(null), h = (e) => {
		m(null), e.catch((e) => {
			m(e instanceof Error ? e.message : String(e));
		});
	};
	return /* @__PURE__ */ P("div", {
		"data-testid": "mapping-review-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ N("div", {
				className: "flex items-baseline justify-between mb-4",
				children: /* @__PURE__ */ P("div", { children: [/* @__PURE__ */ N("div", {
					className: "text-[22px] font-bold text-text-primary",
					children: "Mapping needs review"
				}), /* @__PURE__ */ P("div", {
					className: "text-xs text-text-tertiary",
					children: [
						"Showing items with confidence < ",
						Math.round(i * 100),
						"%."
					]
				})] })
			}),
			o ? /* @__PURE__ */ P("div", {
				role: "alert",
				"data-testid": "mapping-review-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3",
				children: ["Couldn't load review queue: ", o]
			}) : null,
			p ? /* @__PURE__ */ P("div", {
				"data-testid": "mapping-review-action-error",
				role: "alert",
				className: "px-4 py-3 bg-danger-bg border border-danger-border text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-3",
				children: [/* @__PURE__ */ P("span", {
					className: "text-[13px] font-medium",
					children: ["That item was not updated: ", p]
				}), /* @__PURE__ */ N("button", {
					onClick: () => m(null),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-danger-fg border border-danger-border rounded-md cursor-pointer font-[inherit]",
					children: "Dismiss"
				})]
			}) : null,
			a && n.length === 0 ? /* @__PURE__ */ P("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ N(b, { height: 96 }),
					/* @__PURE__ */ N(b, { height: 96 }),
					/* @__PURE__ */ N(b, { height: 96 })
				]
			}) : n.length === 0 && !o ? /* @__PURE__ */ N(g, {
				icon: "✨",
				title: "No items need review",
				body: "When the LLM mapper produces a low-confidence match, it'll show up here for your call.",
				testId: "mapping-review-empty"
			}) : /* @__PURE__ */ N("div", {
				"data-testid": "mapping-review-list",
				className: "flex flex-col gap-3",
				children: n.map((e) => /* @__PURE__ */ N(We, {
					item: e,
					docTypes: l,
					remapTypeId: u[e.itemId] ?? "",
					onPickRemapType: (t) => f((n) => ({
						...n,
						[e.itemId]: t
					})),
					onAccept: () => {
						e.documentTypeId && h(s(e.itemId, e.documentTypeId));
					},
					onRemap: () => {
						let t = u[e.itemId];
						t && h(s(e.itemId, t));
					},
					onDiscard: () => h(c(e.itemId))
				}, e.itemId))
			})
		]
	});
}
function We({ item: e, docTypes: t, remapTypeId: n, onPickRemapType: r, onAccept: i, onRemap: a, onDiscard: o }) {
	let s = t.find((t) => t.id === e.documentTypeId)?.name ?? e.documentTypeId ?? "(unknown)", c = typeof e.mappingConfidence == "number" ? `${Math.round(e.mappingConfidence * 100)}%` : "—";
	return /* @__PURE__ */ P("div", {
		"data-testid": `review-row-${e.itemId}`,
		className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-2",
		children: [
			/* @__PURE__ */ P("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ N("span", {
					className: "font-[ui-monospace,monospace] text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
					title: e.sourcePath,
					children: e.sourcePath
				}), /* @__PURE__ */ P("span", {
					className: "text-[11px] font-semibold px-2 py-0.5 rounded-full bg-warning-bg text-warning-fg",
					children: ["conf ", c]
				})]
			}),
			/* @__PURE__ */ P("div", {
				className: "text-xs text-text-secondary flex gap-3 flex-wrap",
				children: [/* @__PURE__ */ P("span", { children: ["Suggested type: ", /* @__PURE__ */ N("strong", { children: s })] }), /* @__PURE__ */ P("span", { children: ["Source: ", e.sourceId.slice(0, 8)] })]
			}),
			e.error ? /* @__PURE__ */ N("div", {
				className: "text-xs text-text-secondary italic",
				children: e.error.slice(0, 200)
			}) : null,
			/* @__PURE__ */ P("div", {
				className: "flex gap-2 items-center flex-wrap",
				children: [
					/* @__PURE__ */ N("button", {
						"data-testid": `review-accept-${e.itemId}`,
						className: f("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]", !e.documentTypeId && "opacity-50 cursor-not-allowed"),
						onClick: i,
						disabled: !e.documentTypeId,
						title: e.documentTypeId ? "Commit the suggested type" : "No suggestion to accept",
						children: "Accept suggestion"
					}),
					/* @__PURE__ */ N(S, {
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
					/* @__PURE__ */ N("button", {
						"data-testid": `review-remap-${e.itemId}`,
						className: f("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]", !n && "opacity-50 cursor-not-allowed"),
						onClick: a,
						disabled: !n,
						children: "Re-map"
					}),
					/* @__PURE__ */ N("button", {
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
function Ge(e) {
	return new Date(e).toLocaleTimeString("en-US", {
		hour12: !1,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	});
}
function Ke(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? `${n}s` : `${Math.floor(n / 60)}m ${n % 60}s`;
}
function qe(e) {
	return e.startsWith("sync.") ? "bg-info-bg text-info-fg" : e === "item.mapped" ? "bg-accent-bg text-accent-fg" : e === "item.materialized" ? "bg-success-bg text-success-fg" : e === "item.failed" ? "bg-danger-bg text-danger-fg" : "bg-surface-hover text-neutral";
}
function Je(e) {
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
var Ye = [
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
function Xe() {
	let e = F(), { events: t, activeSyncs: n, clearEvents: r } = o(), i = A(null), [a, s] = j(!1), [c, l] = j(""), [u, d] = j("all"), p = A(null);
	D(() => {
		a && p.current === null ? p.current = [...t] : a || (p.current = null);
	}, [a, t]);
	let m = k(() => {
		let e = /* @__PURE__ */ new Set();
		for (let n of t) {
			let t = n.sourceId;
			typeof t == "string" && t && e.add(t);
		}
		for (let t of n.keys()) e.add(t);
		return Array.from(e).sort();
	}, [t, n]), h = k(() => {
		let e = a && p.current ? p.current : t, n = Ye.find((e) => e.value === u) ?? Ye[0];
		return e.filter((e) => !(!n.match(e.type) || c && e.sourceId !== c));
	}, [
		t,
		a,
		u,
		c
	]);
	D(() => {
		a || i.current && (i.current.scrollTop = i.current.scrollHeight);
	}, [h.length, a]);
	let g = k(() => {
		let e = t.filter((e) => e.type === "item.failed" || e.type === "sync.failed").length;
		return {
			totalEvents: t.length,
			activeSyncsCount: n.size,
			errorsCount: e
		};
	}, [t, n]), _ = k(() => Array.from(n.values()), [n]);
	return /* @__PURE__ */ P("div", {
		"data-testid": "sync-monitor-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ P("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ P("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ N("h2", {
						className: "m-0 text-[22px] font-bold text-text-primary",
						children: "Sync Monitor"
					}), /* @__PURE__ */ P("span", {
						className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-semibold bg-success-bg text-success-fg rounded-full border border-success-border",
						children: [/* @__PURE__ */ N("span", { className: "w-[7px] h-[7px] rounded-full bg-success animate-[sync-pulse_1.5s_ease-in-out_infinite]" }), "Live"]
					})]
				}), /* @__PURE__ */ N("button", {
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
					onClick: () => e("/ingest/sources"),
					children: "Sources"
				})]
			}),
			/* @__PURE__ */ P("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3 mb-5",
				children: [
					/* @__PURE__ */ P("div", {
						className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-1",
						children: [/* @__PURE__ */ N("span", {
							className: "text-[11px] font-medium text-text-tertiary uppercase tracking-tight",
							children: "Events Received"
						}), /* @__PURE__ */ N("span", {
							className: "text-[22px] font-bold text-text-primary leading-none",
							children: g.totalEvents
						})]
					}),
					/* @__PURE__ */ P("div", {
						className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-1",
						children: [/* @__PURE__ */ N("span", {
							className: "text-[11px] font-medium text-text-tertiary uppercase tracking-tight",
							children: "Active Syncs"
						}), /* @__PURE__ */ N("span", {
							className: f("text-[22px] font-bold leading-none", g.activeSyncsCount > 0 ? "text-[var(--color-state-running)]" : "text-text-primary"),
							children: g.activeSyncsCount
						})]
					}),
					/* @__PURE__ */ P("div", {
						className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-1",
						children: [/* @__PURE__ */ N("span", {
							className: "text-[11px] font-medium text-text-tertiary uppercase tracking-tight",
							children: "Errors"
						}), /* @__PURE__ */ N("span", {
							className: f("text-[22px] font-bold leading-none", g.errorsCount > 0 ? "text-[var(--color-state-failed)]" : "text-text-primary"),
							children: g.errorsCount
						})]
					})
				]
			}),
			/* @__PURE__ */ P("div", {
				className: "bg-surface border border-border rounded-[10px] p-4 mb-4",
				children: [/* @__PURE__ */ N("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Active Syncs"
				}), _.length === 0 ? /* @__PURE__ */ P("div", {
					className: "py-8 text-center",
					children: [/* @__PURE__ */ N("div", {
						className: "text-sm font-medium text-text-secondary mb-1",
						children: "No active syncs"
					}), /* @__PURE__ */ N("div", {
						className: "text-xs text-text-tertiary",
						children: "Trigger a sync from the Sources page to see progress here."
					})]
				}) : _.map((e) => {
					let t = e.fileCount > 0 ? Math.round(e.filesFetched / e.fileCount * 100) : 0;
					return /* @__PURE__ */ P("div", {
						className: "p-3.5 bg-surface-inset border border-border rounded-lg mb-2.5",
						children: [
							/* @__PURE__ */ P("div", {
								className: "flex items-center justify-between mb-2",
								children: [/* @__PURE__ */ N("span", {
									className: "text-sm font-semibold text-text-primary",
									children: e.sourceName
								}), /* @__PURE__ */ N("span", {
									className: "text-[11px] text-text-tertiary font-mono",
									children: Ke(e.startedAt)
								})]
							}),
							/* @__PURE__ */ N("div", {
								className: "h-2 rounded bg-surface-emphasis overflow-hidden mb-2",
								children: /* @__PURE__ */ N("div", {
									className: "h-full rounded bg-[var(--color-state-running)] transition-[width] duration-300 ease-out",
									style: { width: `${t}%` }
								})
							}),
							/* @__PURE__ */ P("div", {
								className: "flex gap-4 text-xs text-text-secondary",
								children: [
									/* @__PURE__ */ P("span", {
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
									/* @__PURE__ */ P("span", {
										className: "flex items-center gap-1",
										children: ["Mapped: ", e.itemsMapped]
									}),
									/* @__PURE__ */ P("span", {
										className: "flex items-center gap-1",
										children: ["Materialized: ", e.itemsMaterialized]
									})
								]
							})
						]
					}, e.sourceId);
				})]
			}),
			/* @__PURE__ */ P("div", {
				className: "bg-surface border border-border rounded-[10px] p-4 mb-4",
				children: [/* @__PURE__ */ P("div", {
					className: "flex items-center justify-between mb-3 gap-2 flex-wrap",
					children: [/* @__PURE__ */ N("span", {
						className: "text-sm font-semibold text-text-primary",
						children: "Event Log"
					}), /* @__PURE__ */ P("div", {
						className: "flex items-center gap-2 flex-wrap",
						children: [
							/* @__PURE__ */ N(S, {
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
							/* @__PURE__ */ N(S, {
								"data-testid": "event-type-filter",
								"aria-label": "Filter by event type",
								className: "w-auto min-w-[110px]",
								value: u,
								onChange: (e) => d(e.target.value),
								options: Ye.map((e) => ({
									value: e.value,
									label: e.label
								}))
							}),
							/* @__PURE__ */ N("button", {
								"data-testid": "event-pause-toggle",
								className: "px-2.5 py-0.5 text-[11px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
								onClick: () => s((e) => !e),
								title: a ? "Resume the live stream" : "Pause the stream so the log doesn't scroll",
								children: a ? "Resume" : "Pause"
							}),
							t.length > 0 && /* @__PURE__ */ N("button", {
								className: "px-2.5 py-0.5 text-[11px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
								onClick: r,
								children: "Clear"
							})
						]
					})]
				}), h.length === 0 ? /* @__PURE__ */ P("div", {
					className: "py-8 text-center",
					children: [/* @__PURE__ */ N("div", {
						className: "text-sm font-medium text-text-secondary mb-1",
						children: t.length === 0 ? "No events yet" : "No events match the current filter"
					}), /* @__PURE__ */ N("div", {
						className: "text-xs text-text-tertiary",
						children: t.length === 0 ? "Events will appear here in real-time as syncs run." : "Try a different source or event-type filter, or clear the filter."
					})]
				}) : /* @__PURE__ */ N("div", {
					ref: i,
					"data-testid": "event-log",
					className: "max-h-80 overflow-y-auto flex flex-col gap-0.5",
					children: h.map((e, t) => /* @__PURE__ */ P("div", {
						className: "flex items-center gap-2 px-2 py-1 rounded text-xs",
						children: [
							/* @__PURE__ */ N("span", {
								className: "text-[11px] font-mono text-text-tertiary shrink-0 min-w-[60px]",
								children: Ge(e.timestamp)
							}),
							/* @__PURE__ */ N("span", {
								className: f("px-[7px] py-0.5 text-[10px] font-semibold rounded shrink-0", qe(e.type)),
								children: e.type
							}),
							/* @__PURE__ */ N("span", {
								className: "text-xs text-text-secondary flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap",
								title: Je(e),
								children: Je(e)
							})
						]
					}, `${e.timestamp}-${t}`))
				})]
			})
		]
	});
}
//#endregion
export { Ie as ConflictsPage, ze as DeadLetterQueuePage, Ve as DocTypeProposalsPage, Ae as IngestAuditPage, te as IngestDashboard, Se as IngestItemDrawer, De as IngestItemsPage, Ue as MappingReviewPage, J as MappingRuleEditor, ge as SourceDetailPage, ce as SourceSloPanel, ie as SourcesPage, Xe as SyncMonitorPage };
