import { t as e } from "./apiBaseUrl-DLrXlmVj.js";
import { r as t } from "./IdentityContext-CQM1qwH6.js";
import { a as n, c as r, i, l as a, n as o, o as s, r as c, s as l, t as u, u as d } from "./useSyncConflicts-BspqjVsW.js";
import { i as f } from "./useDocumentTypes-DCKwxXn8.js";
import { t as p } from "./cn-DhjIN-s0.js";
import { g as m } from "./tones-CEbHiujQ.js";
import { t as h } from "./Chip-S5_92B2V.js";
import { t as g } from "./overlayStack-BFH9XXvN.js";
import { t as _ } from "./EmptyState-zKbpAhFD.js";
import { n as v, r as y, t as b } from "./focusTrap-CmWJlptm.js";
import { t as x } from "./SkeletonCard-CGe8XFPB.js";
import { t as S } from "./Input-DLknWXri.js";
import { t as C } from "./Select-BT7pq1sa.js";
import { t as w } from "./activationKey-CjbL3LUv.js";
import { n as T, t as E } from "./ChangeReviewCard-B0SUpSET.js";
import { useCallback as D, useEffect as O, useId as k, useMemo as A, useRef as j, useState as M } from "react";
import { Fragment as N, jsx as P, jsxs as F } from "react/jsx-runtime";
import { useNavigate as I, useParams as L } from "react-router";
import { Line as R, LineChart as z, ResponsiveContainer as B, Tooltip as ee, YAxis as V } from "recharts";
//#region src/components/ingest/IngestDashboard.tsx
function te(e) {
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
function ne({ idToken: r, baseUrl: i } = {}) {
	let a = I(), o = t(), s = r === void 0 ? o?.idToken ?? null : r;
	i ?? e();
	let { sources: c, loading: u, error: d, refresh: f } = n({
		idToken: s,
		baseUrl: i
	}), { items: m, loading: g, error: v, refresh: y } = l({
		idToken: s,
		baseUrl: i
	}), b = u || g, S = d || v, C = A(() => {
		let e = c.filter((e) => e.status === "active").length, t = c.filter((e) => e.status === "paused").length, n = c.filter((e) => e.status === "error").length, r = m.filter((e) => e.status !== "done" && e.status !== "failed").length, i = m.filter((e) => e.status === "done" && H(e.updatedAt)).length, a = m.filter((e) => e.status === "failed").length;
		return {
			total: c.length,
			active: e,
			paused: t,
			errored: n,
			queued: r,
			recentDone: i,
			failed: a
		};
	}, [c, m]), w = A(() => m.filter((e) => e.status === "done").sort((e, t) => t.updatedAt.localeCompare(e.updatedAt)).slice(0, 5), [m]), T = A(() => {
		let e = [];
		for (let t of c) t.status === "error" && e.push({
			id: `source-error-${t.sourceId}`,
			level: "critical",
			message: `Source "${t.name}" is in error state — check its config or last sync log.`
		});
		let t = m.filter((e) => U(e.updatedAt));
		if (t.length >= 5) {
			let n = t.filter((e) => e.status === "failed").length, r = n / t.length;
			r > .1 && e.push({
				id: "failure-rate-1h",
				level: "warning",
				message: `Last-hour failure rate is ${(r * 100).toFixed(0)}% (${n} of ${t.length} items failed).`
			});
		}
		return C.queued > W && e.push({
			id: "queue-depth",
			level: "warning",
			message: `Queue depth is ${C.queued} items — sources may be ingesting faster than the engine can drain.`
		}), e;
	}, [
		c,
		m,
		C.queued
	]);
	return b && c.length === 0 && m.length === 0 ? /* @__PURE__ */ F("div", {
		"data-testid": "ingest-dashboard",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ P("div", {
				className: "flex items-center justify-between mb-4",
				children: /* @__PURE__ */ P("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Ingest"
				})
			}),
			/* @__PURE__ */ F("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 mb-5",
				children: [
					/* @__PURE__ */ P(x, { height: 90 }),
					/* @__PURE__ */ P(x, { height: 90 }),
					/* @__PURE__ */ P(x, { height: 90 }),
					/* @__PURE__ */ P(x, { height: 90 })
				]
			}),
			/* @__PURE__ */ P(x, { height: 200 })
		]
	}) : /* @__PURE__ */ F("div", {
		"data-testid": "ingest-dashboard",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ F("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ P("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Ingest"
				}), /* @__PURE__ */ F("div", {
					className: "flex gap-2.5 items-center",
					children: [null, /* @__PURE__ */ P("button", {
						className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-on-primary border-none rounded-md cursor-pointer font-[inherit]",
						onClick: () => a("/ingest/sources"),
						"data-testid": "add-source-btn",
						children: "Add Source"
					})]
				})]
			}),
			S && /* @__PURE__ */ F("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4",
				role: "alert",
				children: [/* @__PURE__ */ P("span", {
					className: "text-[13px] font-medium",
					children: "Failed to load ingest data."
				}), /* @__PURE__ */ P("button", {
					onClick: () => {
						f(), y();
					},
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
					children: "Retry"
				})]
			}),
			T.length > 0 && /* @__PURE__ */ P("div", {
				"data-testid": "alerts-strip",
				className: "flex flex-col gap-1.5 mb-3",
				children: T.map((e) => /* @__PURE__ */ F("div", {
					"data-testid": `alert-${e.id}`,
					className: p("px-3 py-2 rounded-md text-[13px] border", e.level === "critical" ? "bg-danger-bg border-[var(--color-state-failed)] text-[var(--color-state-failed)]" : "bg-warning-bg border-warning text-warning-fg"),
					children: [
						/* @__PURE__ */ P("strong", { children: e.level === "critical" ? "⛔" : "⚠" }),
						" ",
						e.message
					]
				}, e.id))
			}),
			/* @__PURE__ */ F("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 mb-5",
				children: [
					/* @__PURE__ */ F("div", {
						className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5",
						children: [
							/* @__PURE__ */ P("span", {
								className: "text-xs font-medium text-text-tertiary uppercase tracking-wide",
								children: "Sources"
							}),
							/* @__PURE__ */ P("span", {
								className: "text-[28px] font-bold text-text-primary leading-none",
								children: C.total
							}),
							/* @__PURE__ */ F("span", {
								className: "text-xs text-text-tertiary",
								children: [
									C.active,
									" active, ",
									C.paused,
									" paused",
									C.errored > 0 ? `, ${C.errored} error` : ""
								]
							})
						]
					}),
					/* @__PURE__ */ F("div", {
						className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5",
						children: [
							/* @__PURE__ */ P("span", {
								className: "text-xs font-medium text-text-tertiary uppercase tracking-wide",
								children: "In Queue"
							}),
							/* @__PURE__ */ P("span", {
								className: p("text-[28px] font-bold leading-none", C.queued > 0 ? "text-[var(--color-state-awaiting)]" : "text-text-primary"),
								children: C.queued
							}),
							/* @__PURE__ */ P("span", {
								className: "text-xs text-text-tertiary",
								children: "items processing"
							})
						]
					}),
					/* @__PURE__ */ F("div", {
						className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5",
						children: [
							/* @__PURE__ */ P("span", {
								className: "text-xs font-medium text-text-tertiary uppercase tracking-wide",
								children: "Completed (24h)"
							}),
							/* @__PURE__ */ P("span", {
								className: p("text-[28px] font-bold leading-none", C.recentDone > 0 ? "text-[var(--color-state-completed)]" : "text-text-primary"),
								children: C.recentDone
							}),
							/* @__PURE__ */ P("span", {
								className: "text-xs text-text-tertiary",
								children: "items ingested"
							})
						]
					}),
					/* @__PURE__ */ F("div", {
						className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-1.5",
						children: [
							/* @__PURE__ */ P("span", {
								className: "text-xs font-medium text-text-tertiary uppercase tracking-wide",
								children: "Errors"
							}),
							/* @__PURE__ */ P("span", {
								className: p("text-[28px] font-bold leading-none", C.failed > 0 ? "text-[var(--color-state-failed)]" : "text-text-primary"),
								children: C.failed
							}),
							/* @__PURE__ */ P("span", {
								className: "text-xs text-text-tertiary",
								children: "items failed"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ F("div", {
				className: "bg-surface border border-border rounded-[10px] p-4 mb-4",
				children: [/* @__PURE__ */ P("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Recent Activity"
				}), w.length === 0 ? /* @__PURE__ */ P(_, {
					icon: "📥",
					title: "No recent activity",
					body: "Completed ingest items will appear here."
				}) : /* @__PURE__ */ P("div", { children: w.map((e) => /* @__PURE__ */ F("div", {
					className: "flex items-center justify-between gap-3 py-2 border-b border-border",
					children: [
						/* @__PURE__ */ P("span", {
							className: "text-[13px] text-text-secondary font-mono overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0",
							title: e.sourcePath,
							children: e.sourcePath
						}),
						/* @__PURE__ */ P(h, {
							tone: "success",
							size: "xs",
							children: "done"
						}),
						/* @__PURE__ */ P("span", {
							className: "text-[11px] text-text-tertiary whitespace-nowrap shrink-0",
							children: te(e.updatedAt)
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
function q(e) {
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
function J() {
	let e = I(), { sources: t, loading: r, error: i, refresh: a, deleteSource: o, triggerSync: s, actionError: c, clearActionError: l } = n(), [u, d] = M(() => /* @__PURE__ */ new Set()), f = D(async (e) => {
		d((t) => new Set(t).add(e));
		let t = await s(e);
		d((t) => {
			let n = new Set(t);
			return n.delete(e), n;
		}), t && a();
	}, [s, a]), m = D(async (e) => {
		confirm(`Delete source "${e.name}"? This cannot be undone.`) && await o(e.sourceId);
	}, [o]);
	return r && t.length === 0 ? /* @__PURE__ */ F("div", {
		"data-testid": "sources-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ P("div", {
				className: "flex items-center justify-between mb-4",
				children: /* @__PURE__ */ P("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Sources"
				})
			}),
			/* @__PURE__ */ P(x, { height: 48 }),
			/* @__PURE__ */ P(x, { height: 48 }),
			/* @__PURE__ */ P(x, { height: 48 })
		]
	}) : /* @__PURE__ */ F("div", {
		"data-testid": "sources-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ F("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ F("div", { children: [/* @__PURE__ */ P("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Sources"
				}), /* @__PURE__ */ F("span", {
					className: "text-[13px] text-text-tertiary",
					children: [
						t.length,
						" source",
						t.length === 1 ? "" : "s"
					]
				})] }), /* @__PURE__ */ P("button", {
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-on-primary border-none rounded-md cursor-pointer font-[inherit]",
					onClick: () => e("/ingest/sources"),
					"data-testid": "add-source-btn",
					children: "Add Source"
				})]
			}),
			i && /* @__PURE__ */ F("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4",
				role: "alert",
				children: [/* @__PURE__ */ P("span", {
					className: "text-[13px] font-medium",
					children: "Failed to load sources."
				}), /* @__PURE__ */ P("button", {
					onClick: () => void a(),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
					children: "Retry"
				})]
			}),
			c && /* @__PURE__ */ F("div", {
				"data-testid": "sources-action-error",
				role: "alert",
				className: "px-4 py-3 bg-danger-bg border border-danger-border text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-4",
				children: [/* @__PURE__ */ F("span", {
					className: "text-[13px] font-medium",
					children: ["That action did not go through: ", c]
				}), /* @__PURE__ */ P("button", {
					onClick: l,
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-danger-fg border border-danger-border rounded-md cursor-pointer font-[inherit]",
					children: "Dismiss"
				})]
			}),
			!i && t.length === 0 ? /* @__PURE__ */ P(_, {
				icon: "📂",
				title: "No sources configured",
				body: "Add a data source to start ingesting files into the system.",
				actionLabel: "Add Source",
				onAction: () => e("/ingest/sources")
			}) : /* @__PURE__ */ P("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ F("table", {
					className: "w-full border-collapse text-[13px]",
					children: [/* @__PURE__ */ P("thead", { children: /* @__PURE__ */ F("tr", {
						className: "border-b border-border",
						children: [
							/* @__PURE__ */ P("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Name"
							}),
							/* @__PURE__ */ P("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Type"
							}),
							/* @__PURE__ */ P("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Status"
							}),
							/* @__PURE__ */ P("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Last Sync"
							}),
							/* @__PURE__ */ P("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Files Synced"
							}),
							/* @__PURE__ */ P("th", {
								className: "p-2 text-right text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ P("tbody", { children: t.map((t) => /* @__PURE__ */ F("tr", {
						className: "border-b border-border hover:bg-surface-hover",
						children: [
							/* @__PURE__ */ P("td", {
								className: "p-2 font-medium text-text-primary",
								children: /* @__PURE__ */ P("button", {
									type: "button",
									"data-testid": `source-name-link-${t.sourceId}`,
									onClick: () => e(`/ingest/sources/${t.sourceId}`),
									className: "bg-transparent border-none p-0 font-[inherit] text-primary cursor-pointer underline text-left",
									children: t.name
								})
							}),
							/* @__PURE__ */ P("td", {
								className: "p-2",
								children: /* @__PURE__ */ P(h, {
									tone: q(t.type),
									size: "xs",
									children: K(t.type)
								})
							}),
							/* @__PURE__ */ P("td", {
								className: "p-2",
								children: /* @__PURE__ */ P(h, {
									tone: G(t.status),
									size: "sm",
									children: t.status
								})
							}),
							/* @__PURE__ */ P("td", {
								className: "p-2 text-text-secondary",
								children: t.lastSyncAt ? re(t.lastSyncAt) : "Never"
							}),
							/* @__PURE__ */ P("td", {
								"data-testid": `source-files-synced-${t.sourceId}`,
								className: "p-2 font-mono text-xs text-text-secondary",
								children: t.lastSyncStats ? /* @__PURE__ */ F("span", { children: [t.lastSyncStats.filesFound, t.lastSyncStats.filesNew > 0 ? /* @__PURE__ */ F("span", {
									className: "text-text-tertiary",
									children: [
										" · ",
										t.lastSyncStats.filesNew,
										" new"
									]
								}) : null] }) : "—"
							}),
							/* @__PURE__ */ P("td", {
								className: "p-2 text-right",
								children: /* @__PURE__ */ F("div", {
									className: "flex gap-1.5 justify-end",
									children: [/* @__PURE__ */ P("button", {
										className: p("px-2.5 py-1 text-[11px] font-medium rounded-[5px] cursor-pointer font-[inherit]", u.has(t.sourceId) || t.status === "paused" ? "border border-border bg-surface-inset text-text-tertiary opacity-70 cursor-not-allowed" : "border border-border bg-surface text-text-secondary"),
										disabled: u.has(t.sourceId) || t.status === "paused",
										onClick: () => void f(t.sourceId),
										"data-testid": `sync-${t.sourceId}`,
										children: u.has(t.sourceId) ? "Syncing..." : "Sync Now"
									}), /* @__PURE__ */ P("button", {
										className: "px-2.5 py-1 text-[11px] font-medium border border-[var(--color-state-failed)] rounded-[5px] bg-danger-bg cursor-pointer font-[inherit] text-[var(--color-state-failed)]",
										onClick: () => void m(t),
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
var Y = [
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
function ae({ rules: n, onChange: r, readOnly: i = !1, idToken: a, baseUrl: o }) {
	let s = t(), c = a === void 0 ? s?.idToken ?? null : a, l = o ?? e(), [u, d] = M(null), [f, m] = M(""), [h, g] = M(null), [_, v] = M(!1), [y, b] = M(null), x = D((e) => {
		d(e), b({ ...n[e] });
	}, [n]), w = D(() => {
		d(null), b(null);
	}, []), T = D(() => {
		if (u === null || !y) return;
		let e = [...n];
		e[u] = y, r(e), d(null), b(null);
	}, [
		u,
		y,
		n,
		r
	]), E = D(() => {
		let e = {
			pattern: "",
			documentTypeId: "",
			priority: n.length > 0 ? Math.max(...n.map((e) => e.priority)) + 1 : 1
		}, t = [...n, e];
		r(t), d(t.length - 1), b(e);
	}, [n, r]), O = D((e) => {
		r(n.filter((t, n) => n !== e)), u === e ? (d(null), b(null)) : u !== null && u > e && d(u - 1);
	}, [
		n,
		r,
		u
	]), k = D((e) => {
		b((t) => t && {
			...t,
			priority: e
		});
	}, []), A = D((e) => {
		if (e === 0) return;
		let t = [...n];
		[t[e - 1], t[e]] = [t[e], t[e - 1]];
		let i = t[e - 1].priority;
		t[e - 1] = {
			...t[e - 1],
			priority: t[e].priority
		}, t[e] = {
			...t[e],
			priority: i
		}, r(t), u === e ? (d(e - 1), k(t[e - 1].priority)) : u === e - 1 && (d(e), k(t[e].priority));
	}, [
		n,
		r,
		u,
		k
	]), j = D((e) => {
		if (e >= n.length - 1) return;
		let t = [...n];
		[t[e], t[e + 1]] = [t[e + 1], t[e]];
		let i = t[e].priority;
		t[e] = {
			...t[e],
			priority: t[e + 1].priority
		}, t[e + 1] = {
			...t[e + 1],
			priority: i
		}, r(t), u === e ? (d(e + 1), k(t[e + 1].priority)) : u === e + 1 && (d(e), k(t[e].priority));
	}, [
		n,
		r,
		u,
		k
	]), N = D(async () => {
		if (f.trim()) {
			v(!0), g(null);
			try {
				let e = { "Content-Type": "application/json" };
				c && (e.Authorization = `Bearer ${c}`);
				let t = await fetch(`${l}/api/ingest/mapping/preview`, {
					method: "POST",
					headers: e,
					body: JSON.stringify({
						path: f,
						rules: n
					})
				});
				if (!t.ok) throw Error(`HTTP ${t.status}`);
				let r = await t.json();
				g(JSON.stringify(r, null, 2));
			} catch (e) {
				g(`Error: ${e instanceof Error ? e.message : String(e)}`);
			} finally {
				v(!1);
			}
		}
	}, [
		f,
		n,
		c,
		l
	]), I = (e) => {
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
	}, L = (e, t, n) => `${e}:${t}:${n}`;
	return /* @__PURE__ */ F("div", {
		className: "flex flex-col gap-2.5",
		"data-testid": "mapping-rule-editor",
		children: [
			n.length === 0 ? /* @__PURE__ */ P("div", {
				className: "p-4 text-center text-text-tertiary text-[13px]",
				children: i ? "No mapping rules configured." : "No mapping rules configured. Add one to get started."
			}) : /* @__PURE__ */ P("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ F("table", {
					className: "w-full border-collapse text-xs",
					children: [/* @__PURE__ */ P("thead", { children: /* @__PURE__ */ F("tr", { children: [
						/* @__PURE__ */ P("th", {
							className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Priority"
						}),
						/* @__PURE__ */ P("th", {
							className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Condition"
						}),
						/* @__PURE__ */ P("th", {
							className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Target Type ID"
						}),
						/* @__PURE__ */ P("th", {
							className: "px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Pipeline"
						}),
						/* @__PURE__ */ P("th", {
							className: "px-2.5 py-2 font-semibold text-right border-b border-border text-text-secondary text-[11px] uppercase tracking-tight",
							children: "Actions"
						})
					] }) }), /* @__PURE__ */ P("tbody", { children: n.map((e, t) => {
						let r = !i && u === t && y !== null, a = I(e.pattern);
						if (r) {
							let e = I(y.pattern);
							return /* @__PURE__ */ F("tr", {
								className: "border-b border-border",
								children: [
									/* @__PURE__ */ P("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
										children: /* @__PURE__ */ P(S, {
											"aria-label": "Priority",
											size: "sm",
											className: "w-[50px]",
											type: "number",
											value: y.priority,
											onChange: (e) => b({
												...y,
												priority: Number(e.target.value)
											})
										})
									}),
									/* @__PURE__ */ P("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
										children: /* @__PURE__ */ F("div", {
											className: "flex gap-1 items-center flex-wrap",
											children: [
												/* @__PURE__ */ P(C, {
													"aria-label": "Match field",
													size: "sm",
													className: "w-auto min-w-[90px]",
													value: e.field,
													onChange: (t) => b({
														...y,
														pattern: L(t.target.value, e.op, e.value)
													}),
													options: Y.map((e) => ({
														value: e,
														label: e
													}))
												}),
												/* @__PURE__ */ P(C, {
													"aria-label": "Match operator",
													size: "sm",
													className: "w-auto min-w-[90px]",
													value: e.op,
													onChange: (t) => b({
														...y,
														pattern: L(e.field, t.target.value, e.value)
													}),
													options: ie.map((e) => ({
														value: e,
														label: e
													}))
												}),
												/* @__PURE__ */ P(S, {
													"aria-label": "Match value",
													size: "sm",
													className: "min-w-[100px]",
													value: e.value,
													placeholder: "value",
													onChange: (t) => b({
														...y,
														pattern: L(e.field, e.op, t.target.value)
													})
												})
											]
										})
									}),
									/* @__PURE__ */ P("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
										children: /* @__PURE__ */ P(S, {
											"aria-label": "Target Type ID",
											size: "sm",
											className: "min-w-[80px]",
											value: y.documentTypeId,
											placeholder: "document type id",
											onChange: (e) => b({
												...y,
												documentTypeId: e.target.value
											})
										})
									}),
									/* @__PURE__ */ P("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
										children: /* @__PURE__ */ P(S, {
											"aria-label": "Pipeline",
											size: "sm",
											className: "min-w-[80px]",
											value: y.pipelineId ?? "",
											placeholder: "(optional)",
											onChange: (e) => b({
												...y,
												pipelineId: e.target.value || void 0
											})
										})
									}),
									/* @__PURE__ */ P("td", {
										className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle text-right",
										children: /* @__PURE__ */ F("div", {
											className: "flex gap-1 justify-end",
											children: [/* @__PURE__ */ P("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: T,
												children: "Save"
											}), /* @__PURE__ */ P("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: w,
												children: "Cancel"
											})]
										})
									})
								]
							}, t);
						}
						return /* @__PURE__ */ F("tr", {
							className: "border-b border-border",
							children: [
								/* @__PURE__ */ P("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle font-mono font-semibold",
									children: e.priority
								}),
								/* @__PURE__ */ P("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle",
									children: /* @__PURE__ */ F("span", {
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
								/* @__PURE__ */ P("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle font-mono",
									children: e.documentTypeId || "—"
								}),
								/* @__PURE__ */ P("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-tertiary text-xs align-middle font-mono",
									children: e.pipelineId ?? "—"
								}),
								/* @__PURE__ */ P("td", {
									className: "px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle text-right",
									children: i ? /* @__PURE__ */ P("span", {
										className: "text-[11px] text-text-tertiary",
										children: "—"
									}) : /* @__PURE__ */ F("div", {
										className: "flex gap-1 justify-end",
										children: [
											/* @__PURE__ */ P("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: () => A(t),
												disabled: t === 0,
												title: "Move up",
												children: "↑"
											}),
											/* @__PURE__ */ P("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: () => j(t),
												disabled: t === n.length - 1,
												title: "Move down",
												children: "↓"
											}),
											/* @__PURE__ */ P("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary",
												onClick: () => x(t),
												children: "Edit"
											}),
											/* @__PURE__ */ P("button", {
												className: "px-2 py-0.5 text-[11px] font-medium border border-[var(--color-state-failed)] rounded bg-danger-bg cursor-pointer font-[inherit] text-[var(--color-state-failed)]",
												onClick: () => O(t),
												children: "Delete"
											})
										]
									})
								})
							]
						}, t);
					}) })]
				})
			}),
			!i && /* @__PURE__ */ P("div", {
				className: "flex gap-2.5 items-center",
				children: /* @__PURE__ */ P("button", {
					className: "px-3.5 py-1.5 text-xs font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary self-start",
					onClick: E,
					"data-testid": "add-rule-btn",
					children: "+ Add Rule"
				})
			}),
			/* @__PURE__ */ F("div", {
				className: "flex gap-2 items-center mt-1",
				children: [/* @__PURE__ */ P(S, {
					"aria-label": "Enter a file path to preview mapping",
					className: "flex-1",
					value: f,
					onChange: (e) => m(e.target.value),
					placeholder: "Enter a file path to preview mapping..."
				}), /* @__PURE__ */ P("button", {
					className: p("px-3.5 py-1.5 text-xs font-medium border border-primary rounded-md bg-info-bg cursor-pointer font-[inherit] text-primary self-start", (_ || !f.trim()) && "opacity-50 cursor-not-allowed"),
					onClick: () => void N(),
					disabled: _ || !f.trim(),
					children: _ ? "Checking..." : "Preview"
				})]
			}),
			h && /* @__PURE__ */ P("div", {
				className: "p-3 bg-surface-inset border border-border rounded-md text-xs text-text-secondary font-mono whitespace-pre-wrap break-words",
				children: h
			})
		]
	});
}
//#endregion
//#region src/components/ingest/SourceSloPanel.tsx
var oe = [
	"15m",
	"1h",
	"6h",
	"24h"
];
function X({ points: e, color: t, testId: n }) {
	let r = e.map((e) => ({
		at: e.at,
		value: e.value ?? null
	}));
	return /* @__PURE__ */ P("div", {
		"data-testid": n,
		className: "h-[60px]",
		children: /* @__PURE__ */ P(B, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ F(z, {
				data: r,
				margin: {
					top: 4,
					right: 4,
					left: 4,
					bottom: 4
				},
				children: [
					/* @__PURE__ */ P(V, { hide: !0 }),
					/* @__PURE__ */ P(ee, {
						cursor: !1,
						contentStyle: {
							fontSize: 11,
							padding: "4px 6px"
						},
						formatter: ((e) => [e, ""])
					}),
					/* @__PURE__ */ P(R, {
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
function Z(e) {
	for (let t = e.length - 1; t >= 0; t--) if (e[t].value !== null) return e[t].value;
	return null;
}
function se({ sourceId: e, idToken: t, baseUrl: n }) {
	let [r, i] = M("1h"), { metrics: a, error: s } = o(e, r, {
		idToken: t,
		baseUrl: n
	});
	return /* @__PURE__ */ F("div", {
		"data-testid": "source-slo-panel",
		className: "px-4 py-3 bg-surface border border-border rounded-[10px] mb-4",
		children: [
			/* @__PURE__ */ F("div", {
				className: "flex items-center justify-between mb-2 gap-2",
				children: [/* @__PURE__ */ F("span", {
					className: "text-sm font-bold text-text-primary",
					children: [
						"Health (last ",
						r,
						")"
					]
				}), /* @__PURE__ */ P(C, {
					"data-testid": "slo-window-picker",
					"aria-label": "Window",
					className: "w-auto min-w-[100px]",
					value: r,
					onChange: (e) => i(e.target.value),
					options: oe.map((e) => ({
						value: e,
						label: `Last ${e}`
					}))
				})]
			}),
			s ? /* @__PURE__ */ F("div", {
				role: "alert",
				"data-testid": "slo-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg text-xs",
				children: ["Couldn't load source metrics: ", s]
			}) : null,
			a ? /* @__PURE__ */ F("div", {
				className: "grid grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ F("div", {
						className: "px-2.5 py-2 bg-surface-inset rounded-lg",
						children: [
							/* @__PURE__ */ P("div", {
								className: "text-[11px] text-text-tertiary mb-1",
								children: "p95 latency"
							}),
							/* @__PURE__ */ P("div", {
								"data-testid": "slo-latency-value",
								className: "text-base font-bold text-text-primary",
								children: (() => {
									let e = Z(a.latencyP95);
									return e === null ? "—" : `${Math.round(e)} ms`;
								})()
							}),
							/* @__PURE__ */ P(X, {
								points: a.latencyP95,
								color: "var(--color-state-completed)",
								testId: "slo-latency-chart"
							})
						]
					}),
					/* @__PURE__ */ F("div", {
						className: "px-2.5 py-2 bg-surface-inset rounded-lg",
						children: [
							/* @__PURE__ */ P("div", {
								className: "text-[11px] text-text-tertiary mb-1",
								children: "error rate"
							}),
							/* @__PURE__ */ P("div", {
								"data-testid": "slo-error-rate-value",
								className: "text-base font-bold text-text-primary",
								children: (() => {
									let e = Z(a.errorRate);
									return e === null ? "—" : `${e.toFixed(1)}%`;
								})()
							}),
							/* @__PURE__ */ P(X, {
								points: a.errorRate,
								color: "var(--color-state-failed)",
								testId: "slo-error-rate-chart"
							})
						]
					}),
					/* @__PURE__ */ F("div", {
						className: "px-2.5 py-2 bg-surface-inset rounded-lg",
						children: [
							/* @__PURE__ */ P("div", {
								className: "text-[11px] text-text-tertiary mb-1",
								children: "queue depth"
							}),
							/* @__PURE__ */ P("div", {
								"data-testid": "slo-queue-depth-value",
								className: "text-base font-bold text-text-primary",
								children: (() => {
									let e = Z(a.queueDepth);
									return e === null ? "—" : e;
								})()
							}),
							/* @__PURE__ */ P(X, {
								points: a.queueDepth,
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
var ce = [
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
];
function le(e) {
	switch (e) {
		case "active": return "success";
		case "paused": return "warning";
		case "error": return "danger";
		default: return "neutral";
	}
}
function ue(e) {
	switch (e) {
		case "local": return "Local";
		case "s3": return "S3";
		case "google-drive": return "Google Drive";
		case "webhook": return "Webhook";
		default: return e;
	}
}
function de(e) {
	switch (e) {
		case "s3": return "info";
		case "google-drive": return "purple";
		case "webhook": return "caution";
		case "local": return "neutral";
		default: return "neutral";
	}
}
function fe(e) {
	return e < 1e3 ? `${e}ms` : e < 6e4 ? `${(e / 1e3).toFixed(1)}s` : `${(e / 6e4).toFixed(1)}m`;
}
function pe(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function me(e) {
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
function he({ idToken: n, baseUrl: r } = {}) {
	let { id: i } = L(), a = I(), o = t(), s = n === void 0 ? o?.idToken ?? null : n, l = r ?? e(), { pipelines: u } = c({
		idToken: s,
		baseUrl: r
	}), { types: d } = f({
		idToken: s,
		baseUrl: r
	}), [m, g] = M(null), [_, v] = M(!0), [y, b] = M(null), [w, T] = M(!1), E = k(), [A, j] = M(!1), [R, z] = M(!1), [B, ee] = M({}), [V, te] = M([]), [H, U] = M(""), [W, ne] = M(""), [G, K] = M({}), [q, re] = M(!1), J = D(() => {
		let e = { "Content-Type": "application/json" };
		return s && (e.Authorization = `Bearer ${s}`), e;
	}, [s]), Y = D(async (e) => {
		if (i) {
			v(!0), b(null);
			try {
				let t = await fetch(`${l}/api/ingest/sources/${i}`, {
					headers: J(),
					signal: e
				});
				if (!t.ok) throw Error(`HTTP ${t.status}`);
				let n = await t.json();
				if (e?.aborted) return;
				let r = {
					...n,
					mappingRules: me(n.mappingRules ?? [])
				};
				g(r);
			} catch (t) {
				if (e?.aborted) return;
				b(t instanceof Error ? t.message : String(t));
			} finally {
				e?.aborted || v(!1);
			}
		}
	}, [
		i,
		J,
		l
	]);
	O(() => {
		let e = new AbortController();
		return Y(e.signal), () => e.abort();
	}, [Y]);
	let ie = D(() => {
		m && (ee({ ...m.config }), te([...m.mappingRules]), U(m.syncSchedule ?? ""), ne(m.defaultPipelineId ?? ""), K({ ...m.pipelineByDocType ?? {} }), T(!0));
	}, [m]), oe = D(() => {
		T(!1);
	}, []), X = D(async () => {
		if (!(!m || !i)) {
			z(!0);
			try {
				let e = {
					config: B,
					mappingRules: V,
					syncSchedule: H.trim() || null,
					defaultPipelineId: W.trim() || null,
					pipelineByDocType: G
				}, t = await fetch(`${l}/api/ingest/sources/${i}`, {
					method: "PUT",
					headers: J(),
					body: JSON.stringify(e)
				});
				if (!t.ok) throw Error(`HTTP ${t.status}`);
				let n = await t.json();
				g(n), T(!1);
			} catch (e) {
				b(e instanceof Error ? e.message : String(e));
			} finally {
				z(!1);
			}
		}
	}, [
		m,
		i,
		B,
		V,
		H,
		W,
		G,
		J,
		l
	]), Z = w && m !== null && (JSON.stringify(B) !== JSON.stringify(m.config) || JSON.stringify(V) !== JSON.stringify(m.mappingRules) || H !== (m.syncSchedule ?? "") || W !== (m.defaultPipelineId ?? "") || JSON.stringify(G) !== JSON.stringify(m.pipelineByDocType ?? {}));
	O(() => {
		if (!Z) return;
		let e = (e) => {
			e.preventDefault(), e.returnValue = "";
		};
		return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
	}, [Z]);
	let he = D(async () => {
		if (i) {
			j(!0);
			try {
				let e = await fetch(`${l}/api/ingest/sources/${i}/sync`, {
					method: "POST",
					headers: J()
				});
				if (!e.ok) throw Error(`HTTP ${e.status}`);
				await Y();
			} catch (e) {
				b(e instanceof Error ? e.message : String(e));
			} finally {
				j(!1);
			}
		}
	}, [
		i,
		J,
		Y,
		l
	]), Q = D(async () => {
		if (!m || !i) return;
		let e = m.status === "paused" ? "active" : "paused";
		try {
			let t = await fetch(`${l}/api/ingest/sources/${i}`, {
				method: "PATCH",
				headers: J(),
				body: JSON.stringify({ status: e })
			});
			if (!t.ok) throw Error(`HTTP ${t.status}`);
			let n = await t.json();
			g(n);
		} catch (e) {
			b(e instanceof Error ? e.message : String(e));
		}
	}, [
		m,
		i,
		J,
		l
	]);
	return _ && !m ? /* @__PURE__ */ F("div", {
		"data-testid": "source-detail-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ P("div", {
				className: "flex items-center justify-between mb-4 flex-wrap gap-3",
				children: /* @__PURE__ */ P("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Source Detail"
				})
			}),
			/* @__PURE__ */ P(x, { height: 120 }),
			/* @__PURE__ */ P(x, { height: 200 }),
			/* @__PURE__ */ P(x, { height: 100 })
		]
	}) : y && !m ? /* @__PURE__ */ F("div", {
		"data-testid": "source-detail-page",
		className: "p-6 flex flex-col gap-3",
		children: [/* @__PURE__ */ P("div", {
			className: "flex items-center justify-between mb-4 flex-wrap gap-3",
			children: /* @__PURE__ */ P("button", {
				className: "text-[13px] text-primary cursor-pointer bg-transparent border-none font-[inherit] p-0 underline",
				onClick: () => a("/ingest/sources"),
				children: "Back to Sources"
			})
		}), /* @__PURE__ */ F("div", {
			className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3",
			role: "alert",
			children: [/* @__PURE__ */ F("span", {
				className: "text-[13px] font-medium",
				children: ["Failed to load source: ", y]
			}), /* @__PURE__ */ P("button", {
				onClick: () => void Y(),
				className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
				children: "Retry"
			})]
		})]
	}) : m ? /* @__PURE__ */ F("div", {
		"data-testid": "source-detail-page",
		className: "p-6 flex flex-col gap-4",
		children: [
			/* @__PURE__ */ P("div", {
				className: "flex items-center justify-between mb-4 flex-wrap gap-3",
				children: /* @__PURE__ */ P("div", {
					className: "flex items-center gap-2.5",
					children: /* @__PURE__ */ P("button", {
						className: "text-[13px] text-primary cursor-pointer bg-transparent border-none font-[inherit] p-0 underline",
						onClick: () => a("/ingest/sources"),
						children: "Back to Sources"
					})
				})
			}),
			/* @__PURE__ */ F("div", {
				className: "flex items-center justify-between mb-4 flex-wrap gap-3",
				children: [/* @__PURE__ */ F("div", {
					className: "flex items-center gap-2.5",
					children: [
						/* @__PURE__ */ P("h2", {
							className: "m-0 text-[22px] font-bold text-text-primary",
							children: m.name
						}),
						/* @__PURE__ */ P(h, {
							tone: de(m.type),
							size: "sm",
							children: ue(m.type)
						}),
						/* @__PURE__ */ P(h, {
							tone: le(m.status),
							size: "sm",
							children: m.status
						})
					]
				}), /* @__PURE__ */ P("div", {
					className: "flex gap-2.5 items-center",
					children: w ? /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ P("button", {
						className: "px-3.5 py-1.5 text-[13px] font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary",
						onClick: oe,
						children: "Cancel"
					}), /* @__PURE__ */ P("button", {
						className: p("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-on-primary border-none rounded-md cursor-pointer font-[inherit]", R && "opacity-50 cursor-not-allowed"),
						onClick: () => void X(),
						disabled: R,
						children: R ? "Saving..." : "Save Changes"
					})] }) : /* @__PURE__ */ P("button", {
						className: "px-3.5 py-1.5 text-[13px] font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary",
						onClick: ie,
						children: "Edit"
					})
				})]
			}),
			y && /* @__PURE__ */ F("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3",
				role: "alert",
				children: [/* @__PURE__ */ P("span", {
					className: "text-[13px] font-medium",
					children: y
				}), /* @__PURE__ */ P("button", {
					onClick: () => b(null),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
					children: "Dismiss"
				})]
			}),
			/* @__PURE__ */ F("div", {
				className: "bg-surface border border-border rounded-[10px] p-4",
				children: [/* @__PURE__ */ P("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Configuration"
				}), w ? /* @__PURE__ */ P("div", { children: Object.entries(B).map(([e, t]) => /* @__PURE__ */ F("div", {
					className: "flex items-center gap-3 mb-2.5",
					children: [/* @__PURE__ */ P("label", {
						htmlFor: `${E}-cfg-${e}`,
						className: "text-xs font-semibold text-text-tertiary min-w-[140px]",
						children: e
					}), /* @__PURE__ */ P(S, {
						id: `${E}-cfg-${e}`,
						className: "flex-1",
						value: typeof t == "string" ? t : JSON.stringify(t),
						onChange: (t) => ee({
							...B,
							[e]: t.target.value
						})
					})]
				}, e)) }) : /* @__PURE__ */ F("div", { children: [Object.entries(m.config).map(([e, t]) => /* @__PURE__ */ F("div", {
					className: "flex items-center gap-3 py-1.5 border-b border-border",
					children: [/* @__PURE__ */ P("span", {
						className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight",
						children: e
					}), /* @__PURE__ */ P("span", {
						className: "text-[13px] text-text-secondary font-mono break-all",
						children: typeof t == "string" ? t : JSON.stringify(t)
					})]
				}, e)), Object.keys(m.config).length === 0 && /* @__PURE__ */ P("span", {
					className: "text-[13px] text-text-tertiary",
					children: "No configuration fields."
				})] })]
			}),
			m ? /* @__PURE__ */ P(se, {
				sourceId: m.sourceId,
				idToken: s,
				baseUrl: r
			}) : null,
			/* @__PURE__ */ F("div", {
				className: "bg-surface border border-border rounded-[10px] p-4",
				children: [/* @__PURE__ */ P("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Mapping Rules"
				}), w ? /* @__PURE__ */ P(ae, {
					rules: V,
					onChange: te,
					idToken: s,
					baseUrl: r
				}) : /* @__PURE__ */ P(ae, {
					rules: m.mappingRules,
					onChange: () => {},
					readOnly: !0,
					idToken: s,
					baseUrl: r
				})]
			}),
			/* @__PURE__ */ F("div", {
				className: "bg-surface border border-border rounded-[10px] p-4",
				children: [/* @__PURE__ */ F("div", {
					className: "flex items-center justify-between mb-3",
					children: [/* @__PURE__ */ P("div", {
						className: "text-sm font-semibold text-text-primary",
						children: "Sync History"
					}), /* @__PURE__ */ P("button", {
						className: p("px-3.5 py-1.5 text-[13px] font-medium rounded-md cursor-pointer font-[inherit]", A || m.status === "paused" ? "border border-border bg-surface-inset text-text-tertiary opacity-70 cursor-not-allowed" : "border border-primary bg-info-bg text-primary"),
						disabled: A || m.status === "paused",
						onClick: () => void he(),
						"data-testid": "sync-now-btn",
						children: A ? "Syncing..." : "Sync Now"
					})]
				}), m.lastSyncAt ? /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ F("div", {
					className: "text-xs text-text-tertiary mb-2.5",
					children: [
						"Last synced: ",
						pe(m.lastSyncAt),
						" (",
						new Date(m.lastSyncAt).toLocaleString(),
						")"
					]
				}), m.lastSyncStats && /* @__PURE__ */ F("div", {
					className: "grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2.5",
					children: [
						/* @__PURE__ */ F("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ P("div", {
								className: "text-xl font-bold text-text-primary leading-none",
								children: m.lastSyncStats.filesDiscovered
							}), /* @__PURE__ */ P("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Found"
							})]
						}),
						/* @__PURE__ */ F("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ P("div", {
								className: "text-xl font-bold text-[var(--color-state-completed)] leading-none",
								children: m.lastSyncStats.filesIngested
							}), /* @__PURE__ */ P("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Ingested"
							})]
						}),
						/* @__PURE__ */ F("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ P("div", {
								className: "text-xl font-bold text-text-primary leading-none",
								children: m.lastSyncStats.filesSkipped
							}), /* @__PURE__ */ P("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Skipped"
							})]
						}),
						/* @__PURE__ */ F("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ P("div", {
								className: p("text-xl font-bold leading-none", m.lastSyncStats.filesFailed > 0 ? "text-[var(--color-state-failed)]" : "text-text-primary"),
								children: m.lastSyncStats.filesFailed
							}), /* @__PURE__ */ P("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Errors"
							})]
						}),
						/* @__PURE__ */ F("div", {
							className: "p-3 bg-surface-inset border border-border rounded-lg text-center",
							children: [/* @__PURE__ */ P("div", {
								className: "text-xl font-bold text-text-primary leading-none",
								children: fe(m.lastSyncStats.durationMs)
							}), /* @__PURE__ */ P("div", {
								className: "text-[11px] text-text-tertiary mt-1 uppercase tracking-tight",
								children: "Duration"
							})]
						})
					]
				})] }) : /* @__PURE__ */ P("span", {
					className: "text-[13px] text-text-tertiary",
					children: "No sync history yet."
				})]
			}),
			/* @__PURE__ */ F("div", {
				className: "bg-surface border border-border rounded-[10px] p-4",
				children: [/* @__PURE__ */ P("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Settings"
				}), w ? /* @__PURE__ */ F("div", { children: [
					/* @__PURE__ */ F("div", {
						className: "flex items-center gap-3 mb-2.5",
						children: [/* @__PURE__ */ P("span", {
							id: `${E}-schedule-label`,
							className: "text-xs font-semibold text-text-tertiary min-w-[140px]",
							children: "Sync Schedule"
						}), /* @__PURE__ */ F("div", {
							role: "group",
							"aria-labelledby": `${E}-schedule-label`,
							className: "flex gap-2 flex-1 flex-wrap",
							children: [/* @__PURE__ */ P(C, {
								"aria-label": "Schedule preset",
								className: "w-auto min-w-[160px]",
								value: ce.some((e) => e.cron === H) ? H : "__custom__",
								onChange: (e) => {
									e.target.value !== "__custom__" && U(e.target.value);
								},
								"data-testid": "schedule-preset",
								options: [...ce.map((e) => ({
									value: e.cron,
									label: e.label
								})), {
									value: "__custom__",
									label: "Custom…"
								}]
							}), /* @__PURE__ */ P(S, {
								mono: !0,
								"aria-label": "Cron expression",
								className: "flex-1",
								value: H,
								onChange: (e) => U(e.target.value),
								placeholder: "Cron (e.g. 0 */6 * * *) — empty = manual",
								"data-testid": "schedule-cron"
							})]
						})]
					}),
					/* @__PURE__ */ F("div", {
						className: "flex items-center gap-3 mb-2.5",
						children: [/* @__PURE__ */ P("label", {
							htmlFor: `${E}-default-pipeline`,
							className: "text-xs font-semibold text-text-tertiary min-w-[140px]",
							children: "Default Pipeline"
						}), /* @__PURE__ */ P(C, {
							id: `${E}-default-pipeline`,
							className: "flex-1",
							value: W,
							onChange: (e) => ne(e.target.value),
							"data-testid": "default-pipeline-picker",
							options: [
								{
									value: "",
									label: "— None (use mapping rule pipeline) —"
								},
								...u.map((e) => ({
									value: e.id,
									label: `${e.name}${e.status ? ` (${e.status})` : ""}`
								})),
								...W && !u.some((e) => e.id === W) ? [{
									value: W,
									label: `${W} (unknown)`
								}] : []
							]
						})]
					}),
					/* @__PURE__ */ F("div", {
						className: "flex items-center gap-3 mb-2.5",
						children: [/* @__PURE__ */ P("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[140px]",
							children: "Pipeline overrides"
						}), /* @__PURE__ */ F("div", {
							className: "flex-1 flex flex-col gap-2",
							children: [/* @__PURE__ */ F("button", {
								type: "button",
								"data-testid": "overrides-toggle",
								onClick: () => re(!q),
								className: "bg-transparent border-none text-left text-text-secondary p-0 cursor-pointer text-[13px]",
								children: [
									q ? "▾" : "▸",
									" Per-matched-DocType pipeline override (",
									Object.keys(G).length,
									")"
								]
							}), q ? /* @__PURE__ */ F("div", {
								"data-testid": "overrides-section",
								className: "flex flex-col gap-1.5",
								children: [Object.keys(G).length === 0 ? /* @__PURE__ */ P("div", {
									className: "text-xs text-text-tertiary",
									children: "No overrides — every matched type uses the default pipeline."
								}) : Object.entries(G).map(([e, t]) => /* @__PURE__ */ F("div", {
									className: "flex gap-2 items-center",
									children: [
										/* @__PURE__ */ P("span", {
											className: "flex-[0_0_160px] text-[13px]",
											children: d.find((t) => t.id === e)?.name ?? e
										}),
										/* @__PURE__ */ P(C, {
											"aria-label": `Pipeline for ${d.find((t) => t.id === e)?.name ?? e}`,
											"data-testid": `overrides-pipeline-${e}`,
											className: "flex-1",
											value: t,
											onChange: (t) => K({
												...G,
												[e]: t.target.value
											}),
											options: u.map((e) => ({
												value: e.id,
												label: e.name
											}))
										}),
										/* @__PURE__ */ P("button", {
											type: "button",
											"data-testid": `overrides-remove-${e}`,
											onClick: () => {
												let t = { ...G };
												delete t[e], K(t);
											},
											className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-surface-inset text-text-primary outline-none cursor-pointer",
											children: "Remove"
										})
									]
								}, e)), /* @__PURE__ */ P(C, {
									"aria-label": "Add override for type",
									"data-testid": "overrides-add-type",
									className: "w-auto self-start",
									value: "",
									onChange: (e) => {
										let t = e.target.value;
										t && K({
											...G,
											[t]: u[0]?.id ?? ""
										});
									},
									options: [{
										value: "",
										label: "+ Add override for type…"
									}, ...d.filter((e) => G[e.id] === void 0).map((e) => ({
										value: e.id,
										label: e.name
									}))]
								})]
							}) : null]
						})]
					})
				] }) : /* @__PURE__ */ F("div", { children: [
					/* @__PURE__ */ F("div", {
						className: "flex items-center gap-3 py-1.5 border-b border-border",
						children: [/* @__PURE__ */ P("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight",
							children: "Sync Schedule"
						}), /* @__PURE__ */ P("span", {
							className: "text-[13px] text-text-secondary font-mono break-all",
							children: m.syncSchedule ?? "Manual (no schedule)"
						})]
					}),
					/* @__PURE__ */ F("div", {
						className: "flex items-center gap-3 py-1.5 border-b border-border",
						children: [/* @__PURE__ */ P("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight",
							children: "Default Pipeline"
						}), /* @__PURE__ */ P("span", {
							className: "text-[13px] text-text-secondary font-mono break-all",
							children: m.defaultPipelineId ? u.find((e) => e.id === m.defaultPipelineId)?.name ?? m.defaultPipelineId : "—"
						})]
					}),
					/* @__PURE__ */ F("div", {
						className: "flex items-center gap-3 py-1.5",
						children: [/* @__PURE__ */ P("span", {
							className: "text-xs font-semibold text-text-tertiary min-w-[130px] uppercase tracking-tight",
							children: "Status"
						}), /* @__PURE__ */ F("span", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ P(h, {
								tone: le(m.status),
								size: "sm",
								children: m.status
							}), /* @__PURE__ */ P("button", {
								className: p("px-3.5 py-1.5 text-xs font-medium rounded-md cursor-pointer font-[inherit] border-none text-white", m.status === "paused" ? "bg-state-completed" : "bg-state-awaiting"),
								onClick: () => void Q(),
								children: m.status === "paused" ? "Resume" : "Pause"
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
var Q = [
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
	let n = Q;
	return n.indexOf(e) <= n.indexOf(t);
}
function $(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : `${Math.floor(t / 864e5)}d ago`;
}
function be({ item: n, sourceName: r, onClose: i, onRetry: a, onSkip: o, idToken: c, baseUrl: l }) {
	let u = t(), d = c === void 0 ? u?.idToken ?? null : c, f = l ?? e(), [m, _] = M(null), [x, S] = M(null), { events: C } = s(), w = j(null), T = j(null), E = g(n !== null);
	O(() => {
		if (!n) return;
		let e = (e) => {
			if (E()) {
				if (e.key === "Escape") {
					i();
					return;
				}
				y(e, w.current);
			}
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		n,
		i,
		E
	]), O(() => {
		if (n) return T.current = typeof document < "u" ? document.activeElement : null, b(w.current), () => {
			v(T.current), T.current = null;
		};
	}, [n]);
	let D = A(() => {
		if (!n) return /* @__PURE__ */ new Map();
		let e = /* @__PURE__ */ new Map();
		for (let t of C) t.ingestId === n.itemId && (t.type === "item.status" && typeof t.status == "string" && typeof t.timestamp == "string" && e.set(t.status, t.timestamp), t.type === "item.materialized" && typeof t.timestamp == "string" && e.set("done", t.timestamp), t.type === "item.failed" && typeof t.timestamp == "string" && e.set("failed", t.timestamp));
		return e;
	}, [C, n]);
	if (!n) return null;
	let k = n.status === "failed", I = n.status === "done" || n.status === "failed", L = typeof n.mappingConfidence == "number" ? n.mappingConfidence : null, R = async () => {
		_("retry");
		try {
			await a(n.itemId) !== !1 && i();
		} finally {
			_(null);
		}
	}, z = async () => {
		_("skip");
		try {
			await o(n.itemId) !== !1 && i();
		} finally {
			_(null);
		}
	}, B = async () => {
		_("remap"), S(null);
		try {
			let e = { "Content-Type": "application/json" };
			d && (e.Authorization = `Bearer ${d}`);
			let t = await fetch(`${f}/api/ingest/items/${n.itemId}/remap`, {
				method: "POST",
				headers: e
			});
			if (!t.ok) throw Error(`HTTP ${t.status}`);
			i();
		} catch (e) {
			S(e instanceof Error ? e.message : String(e));
		} finally {
			_(null);
		}
	};
	return /* @__PURE__ */ P("div", {
		className: "fixed inset-0 bg-black/35 z-[9999] flex justify-end",
		onClick: i,
		"data-testid": "ingest-item-drawer-scrim",
		children: /* @__PURE__ */ F("div", {
			ref: w,
			className: "w-[min(560px,100vw)] h-full bg-surface shadow-[-12px_0_32px_rgba(0,0,0,0.12)] overflow-y-auto font-[inherit] flex flex-col",
			onClick: (e) => e.stopPropagation(),
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Ingest item details",
			"data-testid": "ingest-item-drawer",
			children: [
				/* @__PURE__ */ F("div", {
					className: "px-5 py-4 border-b border-border flex items-center justify-between sticky top-0 bg-surface z-[1]",
					children: [/* @__PURE__ */ P("h3", {
						className: "text-base font-bold text-text-primary m-0",
						children: "Ingest Item"
					}), /* @__PURE__ */ P("button", {
						className: "bg-transparent border-none text-[22px] leading-none cursor-pointer text-text-tertiary p-1 font-[inherit]",
						onClick: i,
						"aria-label": "Close",
						"data-testid": "ingest-item-drawer-close",
						children: "×"
					})]
				}),
				/* @__PURE__ */ F("div", {
					className: "p-5 flex flex-col gap-4.5 flex-1",
					children: [
						/* @__PURE__ */ F("div", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ P("div", {
									className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
									children: "Source path"
								}),
								/* @__PURE__ */ P("div", {
									className: "font-mono text-xs text-text-primary bg-surface-inset border border-border rounded-md px-2.5 py-2 break-all",
									children: n.sourcePath
								}),
								/* @__PURE__ */ F("div", {
									className: "flex gap-2 items-center mt-1",
									children: [
										/* @__PURE__ */ P(h, {
											tone: ge(n.status),
											size: "sm",
											children: n.status
										}),
										r && /* @__PURE__ */ F("span", {
											className: "text-xs text-text-tertiary",
											children: ["from ", /* @__PURE__ */ P("strong", {
												className: "text-text-secondary",
												children: r
											})]
										}),
										/* @__PURE__ */ F("span", {
											className: "text-xs text-text-tertiary ml-auto",
											children: ["Updated ", $(n.updatedAt)]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ F("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ P("div", {
								className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
								children: "Status timeline"
							}), /* @__PURE__ */ F("div", {
								className: "flex flex-col relative",
								children: [Q.map((e, t) => {
									let r = ye(e, n.status), i = e === n.status, a = k && t === 0, o = {
										...r ? {
											background: a ? "var(--color-state-failed)" : "var(--color-state-completed)",
											borderColor: a ? "var(--color-state-failed)" : "var(--color-state-completed)"
										} : {},
										...i && !I ? {
											background: "var(--color-state-running)",
											borderColor: "var(--color-state-running)"
										} : {}
									};
									return /* @__PURE__ */ F("div", {
										className: "flex items-start gap-3 relative py-1.5",
										children: [
											t < Q.length - 1 && /* @__PURE__ */ P("span", {
												className: "absolute left-[5px] top-[18px] bottom-[-6px] w-0.5 bg-border",
												"aria-hidden": "true"
											}),
											/* @__PURE__ */ P("span", {
												className: "w-3 h-3 rounded-full shrink-0 mt-1 border-2 border-border bg-surface",
												style: o,
												"aria-hidden": "true"
											}),
											/* @__PURE__ */ F("div", { children: [/* @__PURE__ */ P("div", {
												className: "text-[13px] font-medium text-text-primary",
												children: e
											}), (() => {
												let t = D.get(e);
												return t ? /* @__PURE__ */ P("div", {
													"data-testid": `timeline-meta-${e}`,
													className: "text-[11px] text-text-tertiary mt-0.5",
													children: $(t)
												}) : i ? /* @__PURE__ */ P("div", {
													"data-testid": `timeline-meta-${e}`,
													className: "text-[11px] text-text-tertiary mt-0.5",
													children: I ? $(n.updatedAt) : "in progress"
												}) : null;
											})()] })
										]
									}, e);
								}), k && /* @__PURE__ */ F("div", {
									className: "flex items-start gap-3 relative py-1.5",
									children: [/* @__PURE__ */ P("span", { className: "w-3 h-3 rounded-full shrink-0 mt-1 border-2 bg-state-failed border-state-failed" }), /* @__PURE__ */ F("div", { children: [/* @__PURE__ */ P("div", {
										className: "text-[13px] font-medium text-[var(--color-state-failed)]",
										children: "failed"
									}), /* @__PURE__ */ P("div", {
										"data-testid": "timeline-meta-failed",
										className: "text-[11px] text-text-tertiary mt-0.5",
										children: $(D.get("failed") ?? n.updatedAt)
									})] })]
								})]
							})]
						}),
						/* @__PURE__ */ F("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ P("div", {
								className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
								children: "Mapping decision"
							}), n.mappingMethod ? /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ F("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ P(h, {
									tone: _e(n.mappingMethod),
									size: "sm",
									children: n.mappingMethod
								}), /* @__PURE__ */ P("span", {
									className: "text-xs text-text-secondary",
									children: ve(n.mappingMethod)
								})]
							}), L !== null && /* @__PURE__ */ F("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ P("div", {
									className: "flex-1 h-2 bg-surface-inset rounded overflow-hidden border border-border",
									children: /* @__PURE__ */ P("div", {
										className: "h-full transition-[width] duration-200 ease-out",
										style: {
											width: `${Math.round(L * 100)}%`,
											background: L >= .7 ? "var(--color-state-completed)" : L >= .4 ? "var(--color-state-awaiting)" : "var(--color-state-failed)"
										}
									})
								}), /* @__PURE__ */ F("span", {
									className: "font-mono text-xs text-text-secondary min-w-[48px] text-right",
									children: [(L * 100).toFixed(0), "%"]
								})]
							})] }) : /* @__PURE__ */ F("span", {
								className: "text-xs text-text-tertiary",
								children: [
									"No mapping decision yet — item is still in ",
									n.status,
									"."
								]
							})]
						}),
						/* @__PURE__ */ F("div", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ P("div", {
									className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
									children: "Identity"
								}),
								/* @__PURE__ */ F("div", {
									className: "flex items-center gap-3 py-1.5 border-b border-border",
									children: [/* @__PURE__ */ P("span", {
										className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight",
										children: "Item ID"
									}), /* @__PURE__ */ P("span", {
										className: "text-[13px] text-text-secondary font-mono break-all",
										children: n.itemId
									})]
								}),
								/* @__PURE__ */ F("div", {
									className: "flex items-center gap-3 py-1.5 border-b border-border",
									children: [/* @__PURE__ */ P("span", {
										className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight",
										children: "Document Type"
									}), /* @__PURE__ */ P("span", {
										className: "text-[13px] text-text-secondary font-mono break-all",
										children: n.documentTypeId ?? "—"
									})]
								}),
								/* @__PURE__ */ F("div", {
									className: "flex items-center gap-3 py-1.5 border-b border-border",
									children: [/* @__PURE__ */ P("span", {
										className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight",
										children: "Document"
									}), /* @__PURE__ */ P("span", {
										className: "text-[13px] text-text-secondary font-mono break-all",
										children: n.documentId ? /* @__PURE__ */ P("a", {
											href: `/documents/${n.documentId}`,
											className: "text-primary",
											children: n.documentId
										}) : "—"
									})]
								}),
								/* @__PURE__ */ F("div", {
									className: "flex items-center gap-3 py-1.5",
									children: [/* @__PURE__ */ P("span", {
										className: "text-[11px] font-semibold text-text-tertiary min-w-[110px] uppercase tracking-tight",
										children: "Pipeline Run"
									}), /* @__PURE__ */ P("span", {
										className: "text-[13px] text-text-secondary font-mono break-all",
										children: n.pipelineRunId ?? "—"
									})]
								})
							]
						}),
						n.error && /* @__PURE__ */ F("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ P("div", {
								className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-wide",
								children: "Error"
							}), /* @__PURE__ */ P("div", {
								className: "bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-md p-2.5 text-xs font-mono whitespace-pre-wrap break-words",
								children: n.error
							})]
						}),
						x && /* @__PURE__ */ F("div", {
							role: "alert",
							className: "bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-md p-2.5 text-xs font-mono whitespace-pre-wrap break-words",
							children: ["Re-map failed: ", x]
						})
					]
				}),
				/* @__PURE__ */ F("div", {
					className: "px-4 py-4 border-t border-border flex gap-2 justify-end flex-wrap bg-surface sticky bottom-0",
					children: [
						/* @__PURE__ */ P("button", {
							className: p("px-3.5 py-1.5 text-[13px] font-medium font-[inherit] rounded-md cursor-pointer bg-surface border border-border text-text-secondary", (m || n.status === "done") && "opacity-50 cursor-not-allowed"),
							onClick: () => void B(),
							disabled: !!m || n.status === "done",
							"data-testid": "item-remap-btn",
							title: "Re-run the mapping engine for this item",
							children: m === "remap" ? "Re-mapping…" : "Re-map"
						}),
						/* @__PURE__ */ P("button", {
							className: p("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] rounded-md cursor-pointer", m || !k ? "bg-surface border border-border text-text-secondary opacity-50 cursor-not-allowed" : "bg-primary border-none text-on-primary"),
							onClick: () => void R(),
							disabled: !!m || !k,
							"data-testid": "item-retry-btn",
							title: k ? "Retry this item from the beginning" : "Only failed items can be retried",
							children: m === "retry" ? "Retrying…" : "Retry"
						}),
						/* @__PURE__ */ P("button", {
							className: p("px-3.5 py-1.5 text-[13px] font-medium font-[inherit] rounded-md cursor-pointer", m || n.status === "done" ? "bg-surface border border-border text-text-secondary opacity-50 cursor-not-allowed" : "bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)]"),
							onClick: () => void z(),
							disabled: !!m || n.status === "done",
							"data-testid": "item-discard-btn",
							title: "Skip / discard this item",
							children: m === "skip" ? "Discarding…" : "Discard"
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
	let [e, t] = M(null), [r, i] = M(null), [a, o] = M(null), { sources: s } = n(), { items: c, loading: u, error: d, refresh: f, retryItem: p, skipItem: m, actionError: g, clearActionError: v } = l({
		sourceId: e,
		status: r
	}), y = a ? c.find((e) => e.itemId === a.itemId) ?? a : null, b = A(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of s) e.set(t.sourceId, t.name);
		return e;
	}, [s]), S = D(async (e) => p(e), [p]), T = D(async (e) => m(e), [m]);
	return u && c.length === 0 ? /* @__PURE__ */ F("div", {
		"data-testid": "ingest-items-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ P("div", {
				className: "flex items-center justify-between mb-4",
				children: /* @__PURE__ */ P("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Ingest Items"
				})
			}),
			/* @__PURE__ */ P(x, { height: 48 }),
			/* @__PURE__ */ P(x, { height: 48 }),
			/* @__PURE__ */ P(x, { height: 48 })
		]
	}) : /* @__PURE__ */ F("div", {
		"data-testid": "ingest-items-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ P("div", {
				className: "flex items-center justify-between mb-4",
				children: /* @__PURE__ */ F("div", { children: [/* @__PURE__ */ P("h2", {
					className: "m-0 text-[22px] font-bold text-text-primary",
					children: "Ingest Items"
				}), /* @__PURE__ */ F("span", {
					className: "text-[13px] text-text-tertiary",
					children: [
						c.length,
						" item",
						c.length === 1 ? "" : "s"
					]
				})] })
			}),
			/* @__PURE__ */ F("div", {
				className: "flex gap-2.5 items-center mb-3 flex-wrap",
				children: [
					/* @__PURE__ */ P(C, {
						"aria-label": "Filter by source",
						className: "w-auto",
						value: e ?? "",
						onChange: (e) => t(e.target.value || null),
						"data-testid": "source-filter",
						options: [{
							value: "",
							label: "All Sources"
						}, ...s.map((e) => ({
							value: e.sourceId,
							label: e.name
						}))]
					}),
					/* @__PURE__ */ P(C, {
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
					/* @__PURE__ */ P("button", {
						className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-on-primary border-none rounded-md cursor-pointer font-[inherit]",
						onClick: () => void f(),
						"data-testid": "refresh-btn",
						children: "Refresh"
					})
				]
			}),
			d && /* @__PURE__ */ F("div", {
				className: "px-4 py-3 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg flex items-center justify-between gap-3 mb-4",
				role: "alert",
				children: [/* @__PURE__ */ P("span", {
					className: "text-[13px] font-medium",
					children: "Failed to load ingest items."
				}), /* @__PURE__ */ P("button", {
					onClick: () => void f(),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-[var(--color-state-failed)] border border-[var(--color-state-failed)] rounded-md cursor-pointer font-[inherit]",
					children: "Retry"
				})]
			}),
			g && /* @__PURE__ */ F("div", {
				"data-testid": "ingest-items-action-error",
				role: "alert",
				className: "px-4 py-3 bg-danger-bg border border-danger-border text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-4",
				children: [/* @__PURE__ */ F("span", {
					className: "text-[13px] font-medium",
					children: ["Could not update that item: ", g]
				}), /* @__PURE__ */ P("button", {
					onClick: v,
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-danger-fg border border-danger-border rounded-md cursor-pointer font-[inherit]",
					children: "Dismiss"
				})]
			}),
			!d && c.length === 0 ? /* @__PURE__ */ P(_, {
				icon: "📋",
				title: "No items found",
				body: "No ingest items match the current filters."
			}) : !d && /* @__PURE__ */ P("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ F("table", {
					className: "w-full border-collapse text-[13px]",
					children: [/* @__PURE__ */ P("thead", { children: /* @__PURE__ */ F("tr", {
						className: "border-b border-border",
						children: [
							/* @__PURE__ */ P("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "File Path"
							}),
							/* @__PURE__ */ P("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Source"
							}),
							/* @__PURE__ */ P("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Status"
							}),
							/* @__PURE__ */ P("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Type"
							}),
							/* @__PURE__ */ P("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Method"
							}),
							/* @__PURE__ */ P("th", {
								className: "p-2 text-left text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Document"
							}),
							/* @__PURE__ */ P("th", {
								className: "p-2 text-right text-[11px] font-semibold text-text-tertiary uppercase",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ P("tbody", { children: c.map((e) => /* @__PURE__ */ F("tr", {
						className: "border-b border-border cursor-pointer hover:bg-surface-hover",
						onClick: () => o(e),
						onKeyDown: w(() => o(e)),
						role: "button",
						tabIndex: 0,
						"aria-label": `Open details for ${e.sourcePath}`,
						"data-testid": `item-row-${e.itemId}`,
						children: [
							/* @__PURE__ */ P("td", {
								className: "p-2 font-medium text-text-primary max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap",
								title: e.sourcePath,
								children: we(e.sourcePath)
							}),
							/* @__PURE__ */ P("td", {
								className: "p-2 text-text-secondary",
								children: b.get(e.sourceId) ?? e.sourceId.slice(0, 8)
							}),
							/* @__PURE__ */ P("td", {
								className: "p-2",
								children: /* @__PURE__ */ P(h, {
									tone: Se(e.status),
									size: "sm",
									children: e.status
								})
							}),
							/* @__PURE__ */ P("td", {
								className: "p-2 font-mono text-[11px] text-text-secondary",
								children: e.documentTypeId ?? "—"
							}),
							/* @__PURE__ */ P("td", {
								className: "p-2",
								children: e.mappingMethod ? /* @__PURE__ */ P(h, {
									tone: Ce(e.mappingMethod),
									size: "xs",
									children: e.mappingMethod
								}) : "—"
							}),
							/* @__PURE__ */ P("td", {
								className: "p-2",
								children: e.documentId ? /* @__PURE__ */ F("a", {
									href: `/documents/${e.documentId}`,
									className: "text-primary no-underline font-medium text-xs",
									onClick: (e) => e.stopPropagation(),
									onKeyDown: (e) => e.stopPropagation(),
									children: [e.documentId.slice(0, 8), "..."]
								}) : "—"
							}),
							/* @__PURE__ */ P("td", {
								className: "p-2 text-right",
								onClick: (e) => e.stopPropagation(),
								onKeyDown: (e) => e.stopPropagation(),
								children: /* @__PURE__ */ F("div", {
									className: "flex gap-1.5 justify-end",
									children: [e.status === "failed" && /* @__PURE__ */ P("button", {
										className: "px-2.5 py-1 text-[11px] font-medium border border-border rounded-[5px] bg-surface cursor-pointer font-[inherit] text-text-secondary",
										onClick: () => void S(e.itemId),
										"data-testid": `retry-${e.itemId}`,
										children: "Retry"
									}), e.status !== "done" && /* @__PURE__ */ P("button", {
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
			/* @__PURE__ */ P(be, {
				item: y,
				sourceName: y ? b.get(y.sourceId) : void 0,
				onClose: () => o(null),
				onRetry: S,
				onSkip: T
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
	let [e, t] = M("24h"), [n, r] = M(""), [i, o] = M(""), [s, c] = M(""), l = k(), [u, d] = M(null), f = A(() => {
		let t = De.find((t) => t.value === e);
		return {
			since: t && t.ms !== null ? new Date(Date.now() - t.ms).toISOString() : void 0,
			eventType: n || void 0,
			actor: i.trim() || void 0,
			targetId: s.trim() || void 0,
			limit: 200
		};
	}, [
		e,
		n,
		i,
		s
	]), { entries: p, loading: m, error: h } = a(f);
	return /* @__PURE__ */ F("div", {
		"data-testid": "ingest-audit-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ P("div", {
				className: "mb-3",
				children: /* @__PURE__ */ P("div", {
					className: "text-[22px] font-bold text-text-primary",
					children: "Audit log"
				})
			}),
			/* @__PURE__ */ F("div", {
				className: "flex gap-2 flex-wrap items-center p-3 bg-surface-inset rounded-lg mb-3",
				children: [
					/* @__PURE__ */ P("label", {
						htmlFor: `${l}-time`,
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Time"
					}),
					/* @__PURE__ */ P(C, {
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
					/* @__PURE__ */ P("label", {
						htmlFor: `${l}-event`,
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Event"
					}),
					/* @__PURE__ */ P(C, {
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
					/* @__PURE__ */ P("label", {
						htmlFor: `${l}-actor`,
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Actor"
					}),
					/* @__PURE__ */ P(S, {
						id: `${l}-actor`,
						"data-testid": "audit-actor",
						className: "w-auto min-w-[140px]",
						value: i,
						onChange: (e) => o(e.target.value),
						placeholder: "email or system"
					}),
					/* @__PURE__ */ P("label", {
						htmlFor: `${l}-target`,
						className: "text-[11px] text-text-tertiary mr-1",
						children: "Target"
					}),
					/* @__PURE__ */ P(S, {
						id: `${l}-target`,
						"data-testid": "audit-target-id",
						className: "w-auto min-w-[140px]",
						value: s,
						onChange: (e) => c(e.target.value),
						placeholder: "sourceId / itemId"
					})
				]
			}),
			h ? /* @__PURE__ */ F("div", {
				role: "alert",
				"data-testid": "audit-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3",
				children: ["Couldn't load audit log: ", h]
			}) : null,
			m && p.length === 0 ? /* @__PURE__ */ P("div", { children: /* @__PURE__ */ P(x, { height: 200 }) }) : p.length === 0 && !h ? /* @__PURE__ */ P(_, {
				icon: "📜",
				title: "No audit entries",
				body: "Mapping decisions, source changes, and write-back attempts will appear here once instrumentation is wired (hub#2215).",
				testId: "audit-empty"
			}) : /* @__PURE__ */ F("table", {
				"data-testid": "audit-table",
				className: "w-full border-collapse bg-surface border border-border rounded-[10px] overflow-hidden",
				children: [/* @__PURE__ */ P("thead", { children: /* @__PURE__ */ F("tr", { children: [
					/* @__PURE__ */ P("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Time"
					}),
					/* @__PURE__ */ P("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Actor"
					}),
					/* @__PURE__ */ P("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Event"
					}),
					/* @__PURE__ */ P("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Target"
					}),
					/* @__PURE__ */ P("th", {
						className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border",
						children: "Summary"
					}),
					/* @__PURE__ */ P("th", { className: "text-left text-[11px] font-semibold text-text-tertiary uppercase p-2 border-b border-border" })
				] }) }), /* @__PURE__ */ P("tbody", { children: p.map((e) => /* @__PURE__ */ P(ke, {
					entry: e,
					expanded: u === e.auditId,
					onToggle: () => d(u === e.auditId ? null : e.auditId)
				}, e.auditId)) })]
			})
		]
	});
}
function ke({ entry: e, expanded: t, onToggle: n }) {
	return /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ F("tr", {
		"data-testid": `audit-row-${e.auditId}`,
		children: [
			/* @__PURE__ */ P("td", {
				className: "text-[13px] p-2 align-top border-b border-border font-mono text-xs",
				children: e.createdAt.slice(0, 19).replace("T", " ")
			}),
			/* @__PURE__ */ P("td", {
				className: "text-[13px] p-2 align-top border-b border-border",
				children: e.actor
			}),
			/* @__PURE__ */ P("td", {
				className: "text-[13px] p-2 align-top border-b border-border font-mono text-xs",
				children: e.eventType
			}),
			/* @__PURE__ */ F("td", {
				className: "text-[13px] p-2 align-top border-b border-border font-mono text-xs",
				title: e.targetId,
				children: [
					e.targetType,
					"/",
					e.targetId.slice(0, 12)
				]
			}),
			/* @__PURE__ */ P("td", {
				className: "text-[13px] p-2 align-top border-b border-border",
				children: e.summary
			}),
			/* @__PURE__ */ P("td", {
				className: "text-[13px] p-2 align-top border-b border-border",
				children: /* @__PURE__ */ P("button", {
					"data-testid": `audit-detail-toggle-${e.auditId}`,
					className: "text-[11px] text-primary bg-transparent border-none p-0 cursor-pointer underline",
					onClick: n,
					children: t ? "hide" : "detail"
				})
			})
		]
	}), t ? /* @__PURE__ */ P("tr", { children: /* @__PURE__ */ P("td", {
		colSpan: 6,
		className: "text-[13px] p-2 align-top border-b border-border",
		children: /* @__PURE__ */ P("pre", {
			"data-testid": `audit-detail-${e.auditId}`,
			className: "text-[11px] font-mono bg-surface-inset px-2 py-1.5 rounded whitespace-pre-wrap mt-1 max-h-[200px] overflow-auto",
			children: JSON.stringify(e.detail, null, 2)
		})
	}) }) : null] });
}
//#endregion
//#region src/components/ingest/ConflictsPage.tsx
function Ae(e) {
	let t = Date.now() - new Date(e).getTime();
	return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : `${Math.floor(t / 864e5)}d ago`;
}
function je(e) {
	if (e == null) return "";
	if (typeof e == "string") return e;
	try {
		return JSON.stringify(e, null, 2);
	} catch {
		return String(e);
	}
}
function Me(e) {
	let t = (e.split(".").pop() ?? e).replace(/[_-]+/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2").trim();
	return t.charAt(0).toUpperCase() + t.slice(1);
}
function Ne(e) {
	return e.path && e.path.length > 0 ? e.path : e.field.split(".").slice(0, -1).map(Me);
}
function Pe() {
	let { conflicts: e, loading: t, error: r, usingMock: i, refresh: a, resolveConflict: o, discardConflict: s, actionError: c, clearActionError: l } = u(), { sources: d } = n(), [f, p] = M({}), [g, v] = M({}), [y, b] = M(null), C = A(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of d) e.set(t.sourceId, t.name);
		return e;
	}, [d]), w = A(() => e.filter((e) => e.status === "pending"), [e]);
	O(() => {
		let e = new Set(w.map((e) => e.conflictId));
		p((t) => {
			let n = {};
			for (let [r, i] of Object.entries(t)) e.has(r.split("::")[0] ?? "") && (n[r] = i);
			return n;
		});
	}, [w]);
	let D = (e, t) => f[`${e}::${t}`] ?? "source", k = (e, t, n) => p((r) => ({
		...r,
		[`${e}::${t}`]: n
	})), j = async (e) => {
		b(e.conflictId);
		try {
			let t = {};
			for (let n of e.fields) t[n.field] = D(e.conflictId, n.field);
			let n = (g[e.conflictId] ?? "").trim(), r = {
				pick: "source",
				fieldChoices: t,
				...n ? { note: n } : {}
			};
			await o(e.conflictId, r);
		} finally {
			b(null);
		}
	}, I = async (e) => {
		b(e);
		try {
			await s(e);
		} finally {
			b(null);
		}
	};
	return t && e.length === 0 ? /* @__PURE__ */ F("div", {
		"data-testid": "conflicts-page",
		className: "flex flex-col gap-3 p-6",
		children: [/* @__PURE__ */ P(x, { height: 48 }), /* @__PURE__ */ P(x, { height: 200 })]
	}) : /* @__PURE__ */ F("div", {
		"data-testid": "conflicts-page",
		className: "flex flex-col gap-6 p-6",
		children: [
			/* @__PURE__ */ F("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ F("span", {
					className: "text-xs uppercase tracking-wide text-text-tertiary",
					children: [
						"Incoming changes · ",
						w.length,
						" document",
						w.length === 1 ? "" : "s",
						" waiting"
					]
				}), /* @__PURE__ */ P(m, {
					size: "sm",
					variant: "ghost",
					onClick: () => void a(),
					"data-testid": "conflicts-refresh",
					children: "Refresh"
				})]
			}),
			i && /* @__PURE__ */ F("div", {
				className: "rounded-lg border border-warning-border bg-warning-bg px-3.5 py-2.5 text-xs text-warning-fg",
				"data-testid": "conflicts-mock-banner",
				children: [
					"Showing mock conflicts — backend endpoint ",
					/* @__PURE__ */ P("code", { children: "/api/sync/conflicts" }),
					" not implemented."
				]
			}),
			r && !i && /* @__PURE__ */ F("div", {
				className: "rounded-lg border border-danger-border bg-danger-bg px-4 py-3 text-[13px] text-danger-fg",
				role: "alert",
				children: ["Failed to load conflicts: ", r]
			}),
			c && /* @__PURE__ */ F("div", {
				"data-testid": "conflicts-action-error",
				role: "alert",
				className: "flex items-center justify-between gap-3 rounded-lg border border-danger-border bg-danger-bg px-4 py-3",
				children: [/* @__PURE__ */ F("span", {
					className: "text-[13px] font-medium text-danger-fg",
					children: ["That conflict was not updated: ", c]
				}), /* @__PURE__ */ P(m, {
					size: "sm",
					variant: "ghost",
					onClick: l,
					children: "Dismiss"
				})]
			}),
			w.length === 0 ? /* @__PURE__ */ P(_, {
				icon: "✅",
				title: "No pending conflicts",
				body: "Write-back conflicts that need operator intervention will appear here."
			}) : w.map((e) => /* @__PURE__ */ P(T, {
				documentTitle: e.documentTitle ?? e.documentId,
				changeCount: e.fields.length,
				documentMeta: /* @__PURE__ */ F(N, { children: [
					C.get(e.sourceId) ?? e.sourceId,
					" · detected",
					" ",
					Ae(e.detectedAt)
				] }),
				notices: /* @__PURE__ */ F("div", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [/* @__PURE__ */ P(h, {
						tone: "warning",
						size: "xs",
						uppercase: !0,
						children: "Sync conflict"
					}), /* @__PURE__ */ F("span", {
						className: "text-[11px] text-text-tertiary",
						children: [
							e.summary,
							" · source edited ",
							Ae(e.sourceUpdatedAt),
							", this copy edited ",
							Ae(e.platformUpdatedAt)
						]
					})]
				}),
				footer: /* @__PURE__ */ F("div", {
					className: "flex flex-wrap items-center justify-end gap-2 border-t border-border pt-3",
					children: [
						/* @__PURE__ */ P(S, {
							"aria-label": "Optional note (logged in audit trail)",
							className: "min-w-[240px] flex-1",
							placeholder: "Optional note (logged in audit trail)",
							value: g[e.conflictId] ?? "",
							onChange: (t) => v((n) => ({
								...n,
								[e.conflictId]: t.target.value
							})),
							"data-testid": `conflict-note-${e.conflictId}`
						}),
						/* @__PURE__ */ P(m, {
							size: "sm",
							variant: "ghost",
							disabled: y === e.conflictId,
							onClick: () => void I(e.conflictId),
							"data-testid": `conflict-discard-${e.conflictId}`,
							children: "Discard"
						}),
						/* @__PURE__ */ P(m, {
							size: "sm",
							variant: "primary",
							disabled: y === e.conflictId,
							onClick: () => void j(e),
							"data-testid": `conflict-resolve-${e.conflictId}`,
							children: y === e.conflictId ? "Applying…" : "Apply to document"
						})
					]
				}),
				children: e.fields.map((t) => {
					let n = D(e.conflictId, t.field);
					return /* @__PURE__ */ P(E, {
						"data-testid": `conflict-field-${t.field}`,
						category: Me(t.field),
						...t.changedBy ? { author: { name: t.changedBy } } : {},
						path: Ne(t),
						locationHint: t.field,
						pairs: [{
							before: je(t.platformValue),
							after: je(t.sourceValue)
						}],
						beforeLabel: "This copy",
						afterLabel: "Incoming",
						badges: /* @__PURE__ */ P(h, {
							tone: n === "source" ? "success" : n === "merged" ? "info" : "neutral",
							size: "xs",
							"data-testid": `conflict-choice-${t.field}`,
							children: n === "source" ? "Taking incoming" : n === "merged" ? "Taking merged" : "Keeping this copy"
						}),
						actions: /* @__PURE__ */ P(Fe, {
							field: t,
							side: n,
							onPick: (n) => k(e.conflictId, t.field, n)
						})
					}, t.field);
				})
			}, e.conflictId))
		]
	});
}
function Fe({ field: e, side: t, onPick: n }) {
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
	return /* @__PURE__ */ F("div", {
		className: "flex flex-wrap items-center gap-1.5",
		role: "group",
		"aria-label": `Resolution for ${e.field}`,
		children: [i.map((r) => /* @__PURE__ */ P("button", {
			type: "button",
			"aria-pressed": t === r.value,
			disabled: !r.enabled,
			onClick: () => r.enabled && n(r.value),
			className: p("cursor-pointer rounded-full border px-2.5 py-0.5 font-[inherit] text-[11px] font-medium", t === r.value ? "border-primary bg-primary text-on-primary" : "border-border bg-surface text-text-secondary hover:border-border-emphasis", !r.enabled && "cursor-not-allowed opacity-40"),
			"data-testid": `field-pick-${e.field}-${r.value}`,
			children: r.label
		}, r.value)), r && t === "merged" && /* @__PURE__ */ F("span", {
			className: "font-mono text-[11px] text-text-tertiary",
			children: ["→ ", je(e.mergedValue)]
		})]
	});
}
//#endregion
//#region src/components/ingest/DeadLetterQueuePage.tsx
function Ie(e) {
	let t = Date.now() - e;
	return t < 0 ? "just now" : t < 6e4 ? `${Math.floor(t / 1e3)}s ago` : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : `${Math.floor(t / 864e5)}d ago`;
}
function Le() {
	let { entries: e, loading: t, error: n, replay: i, drop: a } = r(), [o, s] = M(null), c = (e) => {
		s(null), e.catch((e) => {
			s(e instanceof Error ? e.message : String(e));
		});
	};
	return /* @__PURE__ */ F("div", {
		"data-testid": "ingest-dlq-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ P("div", {
				className: "flex items-baseline justify-between mb-4 gap-3 flex-wrap",
				children: /* @__PURE__ */ F("div", { children: [/* @__PURE__ */ P("div", {
					className: "text-[22px] font-bold text-text-primary",
					children: "Dead Letter Queue"
				}), /* @__PURE__ */ P("div", {
					className: "text-xs text-text-tertiary",
					children: "Items the engine couldn't process. Replay re-enqueues; drop purges."
				})] })
			}),
			n ? /* @__PURE__ */ P("div", {
				role: "alert",
				"data-testid": "ingest-dlq-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3",
				children: n
			}) : null,
			o ? /* @__PURE__ */ F("div", {
				"data-testid": "ingest-dlq-action-error",
				role: "alert",
				className: "px-4 py-3 bg-danger-bg border border-danger-border text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-3",
				children: [/* @__PURE__ */ F("span", {
					className: "text-[13px] font-medium",
					children: ["That entry was not updated: ", o]
				}), /* @__PURE__ */ P("button", {
					type: "button",
					onClick: () => s(null),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-danger-fg border border-danger-border rounded-md cursor-pointer font-[inherit]",
					children: "Dismiss"
				})]
			}) : null,
			t && e.length === 0 ? /* @__PURE__ */ F("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ P(x, { height: 96 }),
					/* @__PURE__ */ P(x, { height: 96 }),
					/* @__PURE__ */ P(x, { height: 96 })
				]
			}) : e.length === 0 && !n ? /* @__PURE__ */ P(_, {
				icon: "🧹",
				title: "DLQ is empty",
				body: "Failed items will land here. Replay re-enqueues into the source queue; drop purges without retry.",
				testId: "ingest-dlq-empty"
			}) : /* @__PURE__ */ P("div", {
				"data-testid": "ingest-dlq-list",
				className: "flex flex-col gap-3",
				children: e.map((e) => /* @__PURE__ */ P(Re, {
					entry: e,
					onReplay: () => c(i(e.id)),
					onDrop: () => c(a(e.id))
				}, e.id))
			})
		]
	});
}
function Re({ entry: e, onReplay: t, onDrop: n }) {
	return /* @__PURE__ */ F("div", {
		"data-testid": `dlq-row-${e.id}`,
		className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-2",
		children: [
			/* @__PURE__ */ F("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ P("span", {
					className: "font-mono text-[13px] text-text-primary",
					title: e.id,
					children: e.id
				}), /* @__PURE__ */ P("span", {
					className: "text-[11px] text-text-tertiary",
					children: Ie(e.failedAtMs)
				})]
			}),
			/* @__PURE__ */ F("div", {
				className: "text-xs text-text-secondary flex gap-4 flex-wrap",
				children: [/* @__PURE__ */ F("span", { children: ["Attempts: ", /* @__PURE__ */ P("strong", { children: e.totalAttempts })] }), e.envelope.body?.sourceId ? /* @__PURE__ */ F("span", { children: ["Source: ", e.envelope.body.sourceId.slice(0, 12)] }) : null]
			}),
			e.lastError ? /* @__PURE__ */ P("div", {
				className: "text-xs text-text-primary font-mono bg-surface-inset px-2 py-1.5 rounded-md whitespace-pre-wrap break-words max-h-20 overflow-auto",
				children: e.lastError
			}) : null,
			/* @__PURE__ */ F("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ P("button", {
					"data-testid": `dlq-replay-${e.id}`,
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-on-primary border-none rounded-md cursor-pointer font-[inherit] shrink-0",
					onClick: t,
					children: "Replay"
				}), /* @__PURE__ */ P("button", {
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
function ze() {
	let { proposals: e, loading: t, error: n, promote: r, reject: i } = d(), [a, o] = M(null), s = (e) => {
		o(null), e.catch((e) => {
			o(e instanceof Error ? e.message : String(e));
		});
	};
	return /* @__PURE__ */ F("div", {
		"data-testid": "doctype-proposals-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ F("div", {
				className: "mb-4",
				children: [/* @__PURE__ */ P("div", {
					className: "text-[22px] font-bold text-text-primary",
					children: "DocType proposals"
				}), /* @__PURE__ */ P("div", {
					className: "text-xs text-text-tertiary mt-1",
					children: "Auto-discovered candidate types from the LLM mapper. Promote to accept; reject to suppress similar future proposals."
				})]
			}),
			n ? /* @__PURE__ */ F("div", {
				role: "alert",
				"data-testid": "proposals-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3",
				children: ["Couldn't load DocType proposals: ", n]
			}) : null,
			a ? /* @__PURE__ */ F("div", {
				"data-testid": "proposals-action-error",
				role: "alert",
				className: "px-4 py-3 bg-danger-bg border border-danger-border text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-3",
				children: [/* @__PURE__ */ F("span", {
					className: "text-[13px] font-medium",
					children: ["That proposal was not updated: ", a]
				}), /* @__PURE__ */ P("button", {
					type: "button",
					onClick: () => o(null),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-danger-fg border border-danger-border rounded-md cursor-pointer font-[inherit]",
					children: "Dismiss"
				})]
			}) : null,
			t && e.length === 0 ? /* @__PURE__ */ F("div", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ P(x, { height: 120 }), /* @__PURE__ */ P(x, { height: 120 })]
			}) : e.length === 0 && !n ? /* @__PURE__ */ P(_, {
				icon: "🧬",
				title: "No proposals waiting",
				body: "When the LLM mapper sees N similar files of an unknown shape, the proposed DocType lands here.",
				testId: "proposals-empty"
			}) : /* @__PURE__ */ P("div", {
				"data-testid": "proposals-list",
				className: "flex flex-col gap-3",
				children: e.map((e) => /* @__PURE__ */ P(Be, {
					proposal: e,
					onPromote: () => s(r(e.proposalId)),
					onReject: () => s(i(e.proposalId))
				}, e.proposalId))
			})
		]
	});
}
function Be({ proposal: e, onPromote: t, onReject: n }) {
	return /* @__PURE__ */ F("div", {
		"data-testid": `proposal-row-${e.proposalId}`,
		className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-2.5",
		children: [
			/* @__PURE__ */ F("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ P("span", {
					className: "text-base font-bold text-text-primary",
					children: e.proposedName
				}), /* @__PURE__ */ F("span", {
					className: "text-[11px] text-text-tertiary",
					children: [
						e.sampleIngestIds.length,
						" sample",
						e.sampleIngestIds.length === 1 ? "" : "s"
					]
				})]
			}),
			/* @__PURE__ */ F("div", {
				className: "text-xs text-text-secondary flex gap-4 flex-wrap",
				children: [/* @__PURE__ */ F("span", { children: ["Source: ", e.sourceId.slice(0, 12)] }), /* @__PURE__ */ F("span", { children: ["Signature: ", e.signature.slice(0, 24)] })]
			}),
			e.proposedDescription ? /* @__PURE__ */ P("div", {
				className: "text-[13px] text-text-primary leading-relaxed",
				children: e.proposedDescription
			}) : null,
			e.proposedFields.length > 0 ? /* @__PURE__ */ P("div", {
				className: "flex flex-wrap gap-1.5",
				children: e.proposedFields.map((e) => /* @__PURE__ */ F("span", {
					className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset text-text-secondary font-mono",
					children: [e.name, e.required ? "*" : ""]
				}, e.name))
			}) : null,
			e.reasoning ? /* @__PURE__ */ F("div", {
				className: "text-xs text-text-tertiary italic",
				title: e.reasoning,
				children: [e.reasoning.slice(0, 200), e.reasoning.length > 200 ? "…" : ""]
			}) : null,
			/* @__PURE__ */ F("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ P("button", {
					"data-testid": `proposal-promote-${e.proposalId}`,
					className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-on-primary border-none rounded-md cursor-pointer font-[inherit] shrink-0",
					onClick: t,
					children: "Promote"
				}), /* @__PURE__ */ P("button", {
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
function Ve({ idToken: e, baseUrl: n } = {}) {
	let r = t(), a = e === void 0 ? r?.idToken ?? null : e, { items: o, threshold: s, loading: c, error: l, remap: u, skip: d } = i({
		idToken: a,
		baseUrl: n
	}), { types: p } = f({
		idToken: a,
		baseUrl: n
	}), [m, h] = M({}), [g, v] = M(null), y = (e) => {
		v(null), e.catch((e) => {
			v(e instanceof Error ? e.message : String(e));
		});
	};
	return /* @__PURE__ */ F("div", {
		"data-testid": "mapping-review-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ P("div", {
				className: "flex items-baseline justify-between mb-4",
				children: /* @__PURE__ */ F("div", { children: [/* @__PURE__ */ P("div", {
					className: "text-[22px] font-bold text-text-primary",
					children: "Mapping needs review"
				}), /* @__PURE__ */ F("div", {
					className: "text-xs text-text-tertiary",
					children: [
						"Showing items with confidence < ",
						Math.round(s * 100),
						"%."
					]
				})] })
			}),
			l ? /* @__PURE__ */ F("div", {
				role: "alert",
				"data-testid": "mapping-review-error",
				className: "px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg mb-3",
				children: ["Couldn't load review queue: ", l]
			}) : null,
			g ? /* @__PURE__ */ F("div", {
				"data-testid": "mapping-review-action-error",
				role: "alert",
				className: "px-4 py-3 bg-danger-bg border border-danger-border text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-3",
				children: [/* @__PURE__ */ F("span", {
					className: "text-[13px] font-medium",
					children: ["That item was not updated: ", g]
				}), /* @__PURE__ */ P("button", {
					onClick: () => v(null),
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-surface text-danger-fg border border-danger-border rounded-md cursor-pointer font-[inherit]",
					children: "Dismiss"
				})]
			}) : null,
			c && o.length === 0 ? /* @__PURE__ */ F("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ P(x, { height: 96 }),
					/* @__PURE__ */ P(x, { height: 96 }),
					/* @__PURE__ */ P(x, { height: 96 })
				]
			}) : o.length === 0 && !l ? /* @__PURE__ */ P(_, {
				icon: "✨",
				title: "No items need review",
				body: "When the LLM mapper produces a low-confidence match, it'll show up here for your call.",
				testId: "mapping-review-empty"
			}) : /* @__PURE__ */ P("div", {
				"data-testid": "mapping-review-list",
				className: "flex flex-col gap-3",
				children: o.map((e) => /* @__PURE__ */ P(He, {
					item: e,
					docTypes: p,
					remapTypeId: m[e.itemId] ?? "",
					onPickRemapType: (t) => h((n) => ({
						...n,
						[e.itemId]: t
					})),
					onAccept: () => {
						e.documentTypeId && y(u(e.itemId, e.documentTypeId));
					},
					onRemap: () => {
						let t = m[e.itemId];
						t && y(u(e.itemId, t));
					},
					onDiscard: () => y(d(e.itemId))
				}, e.itemId))
			})
		]
	});
}
function He({ item: e, docTypes: t, remapTypeId: n, onPickRemapType: r, onAccept: i, onRemap: a, onDiscard: o }) {
	let s = t.find((t) => t.id === e.documentTypeId)?.name ?? e.documentTypeId ?? "(unknown)", c = typeof e.mappingConfidence == "number" ? `${Math.round(e.mappingConfidence * 100)}%` : "—";
	return /* @__PURE__ */ F("div", {
		"data-testid": `review-row-${e.itemId}`,
		className: "p-4 bg-surface border border-border rounded-[10px] flex flex-col gap-2",
		children: [
			/* @__PURE__ */ F("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ P("span", {
					className: "font-[ui-monospace,monospace] text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
					title: e.sourcePath,
					children: e.sourcePath
				}), /* @__PURE__ */ F("span", {
					className: "text-[11px] font-semibold px-2 py-0.5 rounded-full bg-warning-bg text-warning-fg",
					children: ["conf ", c]
				})]
			}),
			/* @__PURE__ */ F("div", {
				className: "text-xs text-text-secondary flex gap-3 flex-wrap",
				children: [/* @__PURE__ */ F("span", { children: ["Suggested type: ", /* @__PURE__ */ P("strong", { children: s })] }), /* @__PURE__ */ F("span", { children: ["Source: ", e.sourceId.slice(0, 8)] })]
			}),
			e.error ? /* @__PURE__ */ P("div", {
				className: "text-xs text-text-secondary italic",
				children: e.error.slice(0, 200)
			}) : null,
			/* @__PURE__ */ F("div", {
				className: "flex gap-2 items-center flex-wrap",
				children: [
					/* @__PURE__ */ P("button", {
						"data-testid": `review-accept-${e.itemId}`,
						className: p("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-on-primary border-none rounded-md cursor-pointer font-[inherit]", !e.documentTypeId && "opacity-50 cursor-not-allowed"),
						onClick: i,
						disabled: !e.documentTypeId,
						title: e.documentTypeId ? "Commit the suggested type" : "No suggestion to accept",
						children: "Accept suggestion"
					}),
					/* @__PURE__ */ P(C, {
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
					/* @__PURE__ */ P("button", {
						"data-testid": `review-remap-${e.itemId}`,
						className: p("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-on-primary border-none rounded-md cursor-pointer font-[inherit]", !n && "opacity-50 cursor-not-allowed"),
						onClick: a,
						disabled: !n,
						children: "Re-map"
					}),
					/* @__PURE__ */ P("button", {
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
function Ue(e) {
	return new Date(e).toLocaleTimeString("en-US", {
		hour12: !1,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	});
}
function We(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? `${n}s` : `${Math.floor(n / 60)}m ${n % 60}s`;
}
function Ge(e) {
	return e.startsWith("sync.") ? "bg-info-bg text-info-fg" : e === "item.mapped" ? "bg-accent-bg text-accent-fg" : e === "item.materialized" ? "bg-success-bg text-success-fg" : e === "item.failed" ? "bg-danger-bg text-danger-fg" : "bg-surface-hover text-neutral";
}
function Ke(e) {
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
var qe = [
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
function Je() {
	let e = I(), { events: t, activeSyncs: n, clearEvents: r } = s(), i = j(null), [a, o] = M(!1), [c, l] = M(""), [u, d] = M("all"), f = j(null);
	O(() => {
		a && f.current === null ? f.current = [...t] : a || (f.current = null);
	}, [a, t]);
	let m = A(() => {
		let e = /* @__PURE__ */ new Set();
		for (let n of t) {
			let t = n.sourceId;
			typeof t == "string" && t && e.add(t);
		}
		for (let t of n.keys()) e.add(t);
		return Array.from(e).sort();
	}, [t, n]), h = A(() => {
		let e = a && f.current ? f.current : t, n = qe.find((e) => e.value === u) ?? qe[0];
		return e.filter((e) => !(!n.match(e.type) || c && e.sourceId !== c));
	}, [
		t,
		a,
		u,
		c
	]);
	O(() => {
		a || i.current && (i.current.scrollTop = i.current.scrollHeight);
	}, [h.length, a]);
	let g = A(() => {
		let e = t.filter((e) => e.type === "item.failed" || e.type === "sync.failed").length;
		return {
			totalEvents: t.length,
			activeSyncsCount: n.size,
			errorsCount: e
		};
	}, [t, n]), _ = A(() => Array.from(n.values()), [n]);
	return /* @__PURE__ */ F("div", {
		"data-testid": "sync-monitor-page",
		className: "p-6 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ F("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ F("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ P("h2", {
						className: "m-0 text-[22px] font-bold text-text-primary",
						children: "Sync Monitor"
					}), /* @__PURE__ */ F("span", {
						className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-semibold bg-success-bg text-success-fg rounded-full border border-success-border",
						children: [/* @__PURE__ */ P("span", { className: "w-[7px] h-[7px] rounded-full bg-success animate-[sync-pulse_1.5s_ease-in-out_infinite]" }), "Live"]
					})]
				}), /* @__PURE__ */ P("button", {
					className: "px-3.5 py-1.5 text-[13px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
					onClick: () => e("/ingest/sources"),
					children: "Sources"
				})]
			}),
			/* @__PURE__ */ F("div", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3 mb-5",
				children: [
					/* @__PURE__ */ F("div", {
						className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-1",
						children: [/* @__PURE__ */ P("span", {
							className: "text-[11px] font-medium text-text-tertiary uppercase tracking-tight",
							children: "Events Received"
						}), /* @__PURE__ */ P("span", {
							className: "text-[22px] font-bold text-text-primary leading-none",
							children: g.totalEvents
						})]
					}),
					/* @__PURE__ */ F("div", {
						className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-1",
						children: [/* @__PURE__ */ P("span", {
							className: "text-[11px] font-medium text-text-tertiary uppercase tracking-tight",
							children: "Active Syncs"
						}), /* @__PURE__ */ P("span", {
							className: p("text-[22px] font-bold leading-none", g.activeSyncsCount > 0 ? "text-[var(--color-state-running)]" : "text-text-primary"),
							children: g.activeSyncsCount
						})]
					}),
					/* @__PURE__ */ F("div", {
						className: "p-3.5 bg-surface border border-border rounded-[10px] flex flex-col gap-1",
						children: [/* @__PURE__ */ P("span", {
							className: "text-[11px] font-medium text-text-tertiary uppercase tracking-tight",
							children: "Errors"
						}), /* @__PURE__ */ P("span", {
							className: p("text-[22px] font-bold leading-none", g.errorsCount > 0 ? "text-[var(--color-state-failed)]" : "text-text-primary"),
							children: g.errorsCount
						})]
					})
				]
			}),
			/* @__PURE__ */ F("div", {
				className: "bg-surface border border-border rounded-[10px] p-4 mb-4",
				children: [/* @__PURE__ */ P("div", {
					className: "text-sm font-semibold text-text-primary mb-3",
					children: "Active Syncs"
				}), _.length === 0 ? /* @__PURE__ */ F("div", {
					className: "py-8 text-center",
					children: [/* @__PURE__ */ P("div", {
						className: "text-sm font-medium text-text-secondary mb-1",
						children: "No active syncs"
					}), /* @__PURE__ */ P("div", {
						className: "text-xs text-text-tertiary",
						children: "Trigger a sync from the Sources page to see progress here."
					})]
				}) : _.map((e) => {
					let t = e.fileCount > 0 ? Math.round(e.filesFetched / e.fileCount * 100) : 0;
					return /* @__PURE__ */ F("div", {
						className: "p-3.5 bg-surface-inset border border-border rounded-lg mb-2.5",
						children: [
							/* @__PURE__ */ F("div", {
								className: "flex items-center justify-between mb-2",
								children: [/* @__PURE__ */ P("span", {
									className: "text-sm font-semibold text-text-primary",
									children: e.sourceName
								}), /* @__PURE__ */ P("span", {
									className: "text-[11px] text-text-tertiary font-mono",
									children: We(e.startedAt)
								})]
							}),
							/* @__PURE__ */ P("div", {
								className: "h-2 rounded bg-surface-emphasis overflow-hidden mb-2",
								children: /* @__PURE__ */ P("div", {
									className: "h-full rounded bg-[var(--color-state-running)] transition-[width] duration-300 ease-out",
									style: { width: `${t}%` }
								})
							}),
							/* @__PURE__ */ F("div", {
								className: "flex gap-4 text-xs text-text-secondary",
								children: [
									/* @__PURE__ */ F("span", {
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
									/* @__PURE__ */ F("span", {
										className: "flex items-center gap-1",
										children: ["Mapped: ", e.itemsMapped]
									}),
									/* @__PURE__ */ F("span", {
										className: "flex items-center gap-1",
										children: ["Materialized: ", e.itemsMaterialized]
									})
								]
							})
						]
					}, e.sourceId);
				})]
			}),
			/* @__PURE__ */ F("div", {
				className: "bg-surface border border-border rounded-[10px] p-4 mb-4",
				children: [/* @__PURE__ */ F("div", {
					className: "flex items-center justify-between mb-3 gap-2 flex-wrap",
					children: [/* @__PURE__ */ P("span", {
						className: "text-sm font-semibold text-text-primary",
						children: "Event Log"
					}), /* @__PURE__ */ F("div", {
						className: "flex items-center gap-2 flex-wrap",
						children: [
							/* @__PURE__ */ P(C, {
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
							/* @__PURE__ */ P(C, {
								"data-testid": "event-type-filter",
								"aria-label": "Filter by event type",
								className: "w-auto min-w-[110px]",
								value: u,
								onChange: (e) => d(e.target.value),
								options: qe.map((e) => ({
									value: e.value,
									label: e.label
								}))
							}),
							/* @__PURE__ */ P("button", {
								"data-testid": "event-pause-toggle",
								className: "px-2.5 py-0.5 text-[11px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
								onClick: () => o((e) => !e),
								title: a ? "Resume the live stream" : "Pause the stream so the log doesn't scroll",
								children: a ? "Resume" : "Pause"
							}),
							t.length > 0 && /* @__PURE__ */ P("button", {
								className: "px-2.5 py-0.5 text-[11px] font-medium bg-transparent border border-border rounded-md cursor-pointer font-[inherit] text-text-secondary",
								onClick: r,
								children: "Clear"
							})
						]
					})]
				}), h.length === 0 ? /* @__PURE__ */ F("div", {
					className: "py-8 text-center",
					children: [/* @__PURE__ */ P("div", {
						className: "text-sm font-medium text-text-secondary mb-1",
						children: t.length === 0 ? "No events yet" : "No events match the current filter"
					}), /* @__PURE__ */ P("div", {
						className: "text-xs text-text-tertiary",
						children: t.length === 0 ? "Events will appear here in real-time as syncs run." : "Try a different source or event-type filter, or clear the filter."
					})]
				}) : /* @__PURE__ */ P("div", {
					ref: i,
					"data-testid": "event-log",
					className: "max-h-80 overflow-y-auto flex flex-col gap-0.5",
					children: h.map((e, t) => /* @__PURE__ */ F("div", {
						className: "flex items-center gap-2 px-2 py-1 rounded text-xs",
						children: [
							/* @__PURE__ */ P("span", {
								className: "text-[11px] font-mono text-text-tertiary shrink-0 min-w-[60px]",
								children: Ue(e.timestamp)
							}),
							/* @__PURE__ */ P("span", {
								className: p("px-[7px] py-0.5 text-[10px] font-semibold rounded shrink-0", Ge(e.type)),
								children: e.type
							}),
							/* @__PURE__ */ P("span", {
								className: "text-xs text-text-secondary flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap",
								title: Ke(e),
								children: Ke(e)
							})
						]
					}, `${e.timestamp}-${t}`))
				})]
			})
		]
	});
}
//#endregion
export { Pe as ConflictsPage, Le as DeadLetterQueuePage, ze as DocTypeProposalsPage, Oe as IngestAuditPage, ne as IngestDashboard, be as IngestItemDrawer, Te as IngestItemsPage, Ve as MappingReviewPage, ae as MappingRuleEditor, he as SourceDetailPage, se as SourceSloPanel, J as SourcesPage, Je as SyncMonitorPage };
