import { d as e } from "./Button-DQoeE5dN.js";
import { r as t } from "./safeHref-CSAycLWi.js";
import { useId as n, useState as r } from "react";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/change-review/ChangeDiff.tsx
function s({ marker: t, label: n, value: r, emptyText: i, tone: s, testId: c }) {
	return /* @__PURE__ */ o("div", {
		"data-testid": c,
		"data-ui-change-diff-side": "",
		className: e("flex min-w-0 gap-2 rounded border px-2 py-1", s === "danger" ? "border-danger-border bg-danger-bg" : "border-success-border bg-success-bg"),
		children: [/* @__PURE__ */ a("span", {
			"aria-hidden": !0,
			className: e("shrink-0 select-none font-mono text-xs leading-5", s === "danger" ? "text-danger-fg" : "text-success-fg"),
			children: t
		}), /* @__PURE__ */ o("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ a("div", {
				className: e("text-xs uppercase tracking-wide", s === "danger" ? "text-danger-fg" : "text-success-fg"),
				children: n
			}), /* @__PURE__ */ a("div", {
				className: e("break-words text-xs", s === "danger" ? "text-danger-fg line-through decoration-danger-fg/40" : "text-success-fg"),
				children: r || /* @__PURE__ */ a("span", {
					className: "italic no-underline opacity-60",
					children: i
				})
			})]
		})]
	});
}
function c({ pairs: t, beforeLabel: n = "Now", afterLabel: r = "Proposed", className: i, "data-testid": c = "change-diff" }) {
	return t.length === 0 ? null : /* @__PURE__ */ a("div", {
		"data-testid": c,
		className: e("flex flex-col gap-2", i),
		children: t.map((e, t) => /* @__PURE__ */ o("div", {
			className: "flex flex-col gap-1",
			children: [/* @__PURE__ */ a(s, {
				marker: "-",
				label: n,
				value: e.before,
				emptyText: "(empty)",
				tone: "danger",
				testId: `${c}-before-${t}`
			}), /* @__PURE__ */ a(s, {
				marker: "+",
				label: r,
				value: e.after,
				emptyText: "(removed)",
				tone: "success",
				testId: `${c}-after-${t}`
			})]
		}, t))
	});
}
//#endregion
//#region src/components/change-review/ChangeLocation.tsx
function l({ path: t, hint: n, rootLabel: r = "Document level", className: s, "data-testid": c = "change-location" }) {
	let l = t.filter((e) => e && e.trim().length > 0);
	return /* @__PURE__ */ o("div", {
		"data-testid": c,
		"data-ui-change-location": "",
		className: e("flex min-w-0 items-center gap-1 overflow-x-auto rounded border border-border", "bg-surface-inset px-2 py-1 font-mono text-xs text-text-tertiary", s),
		children: [
			/* @__PURE__ */ a("span", {
				"aria-hidden": !0,
				className: "select-none shrink-0",
				children: "@@"
			}),
			l.length === 0 ? /* @__PURE__ */ a("span", {
				className: "shrink-0 text-text-secondary",
				children: r
			}) : l.map((t, n) => /* @__PURE__ */ o("span", {
				className: "flex shrink-0 items-center gap-1",
				children: [n > 0 && /* @__PURE__ */ a("span", {
					"aria-hidden": !0,
					className: "select-none opacity-60",
					children: "›"
				}), /* @__PURE__ */ a("span", {
					className: e(n === l.length - 1 && "text-text-secondary"),
					children: t
				})]
			}, `${t}-${n}`)),
			n && /* @__PURE__ */ o(i, { children: [/* @__PURE__ */ a("span", {
				"aria-hidden": !0,
				className: "select-none opacity-60",
				children: "·"
			}), /* @__PURE__ */ a("span", {
				className: "shrink-0 whitespace-nowrap",
				children: n
			})] }),
			/* @__PURE__ */ a("span", {
				"aria-hidden": !0,
				className: "select-none shrink-0",
				children: "@@"
			})
		]
	});
}
//#endregion
//#region src/components/change-review/types.ts
function u({ verdict: e, status: t = "idle", revision: n }) {
	return t === "pending" ? "pending" : t === "failed" ? "failed" : e ? n != null && e.forRevision !== n ? "stale" : "ready" : "absent";
}
var d = {
	pass: "Pass",
	concern: "Concern",
	fail: "Fail"
}, f = {
	pass: "✓",
	concern: "!",
	fail: "✕"
}, p = {
	pass: "success",
	concern: "caution",
	fail: "danger"
};
//#endregion
//#region src/components/change-review/VerdictChip.tsx
function m({ verdict: s, status: c = "idle", error: l, revision: m, defaultExpanded: h = !1, className: g, "data-testid": _ = "verdict" }) {
	let [v, y] = r(h), b = n(), x = u({
		verdict: s,
		status: c,
		revision: m
	}), S = (x === "ready" || x === "stale") && !!s?.reasoning;
	return /* @__PURE__ */ o("div", {
		"data-testid": _,
		"data-verdict-state": x,
		"data-verdict": s?.verdict ?? "",
		className: e("flex flex-col gap-1", g),
		children: [
			/* @__PURE__ */ o("div", {
				className: "flex flex-wrap items-center gap-1.5",
				children: [
					x === "ready" && s && /* @__PURE__ */ o(t, {
						tone: p[s.verdict],
						size: "sm",
						uppercase: !0,
						"data-testid": `${_}-chip`,
						children: [
							/* @__PURE__ */ a("span", {
								"aria-hidden": !0,
								children: f[s.verdict]
							}),
							" ",
							d[s.verdict]
						]
					}),
					x === "stale" && s && /* @__PURE__ */ a(t, {
						tone: "neutral",
						size: "sm",
						uppercase: !0,
						"data-testid": `${_}-chip`,
						children: "Out of date"
					}),
					x === "pending" && /* @__PURE__ */ a(t, {
						tone: "info",
						size: "sm",
						uppercase: !0,
						dot: "pulse",
						"data-testid": `${_}-chip`,
						children: "Reviewing"
					}),
					x === "failed" && /* @__PURE__ */ a(t, {
						tone: "warning",
						size: "sm",
						uppercase: !0,
						"data-testid": `${_}-chip`,
						children: "Review failed"
					}),
					x === "absent" && /* @__PURE__ */ a(t, {
						tone: "neutral",
						size: "sm",
						uppercase: !0,
						"data-testid": `${_}-chip`,
						children: "Not reviewed"
					}),
					/* @__PURE__ */ o("span", {
						className: e("min-w-0 text-xs", x === "stale" ? "text-text-tertiary" : "text-text-secondary"),
						"data-testid": `${_}-headline`,
						children: [
							x === "ready" && s?.headline,
							x === "stale" && s && /* @__PURE__ */ o(i, { children: [
								"Was “",
								d[s.verdict],
								"” against an earlier version of this change."
							] }),
							x === "pending" && "Checking this change…",
							x === "failed" && (l || "The reviewer could not be reached."),
							x === "absent" && "No agent has reviewed this change."
						]
					}),
					S && /* @__PURE__ */ a("button", {
						"data-ui-part": "",
						type: "button",
						onClick: () => y((e) => !e),
						"aria-expanded": v,
						"aria-controls": b,
						className: e("shrink-0 rounded border border-border bg-surface px-1.5 py-px text-[10px]", "cursor-pointer text-text-secondary hover:border-border-emphasis hover:text-text-primary"),
						"data-testid": `${_}-toggle`,
						children: v ? "Hide reasoning" : "Why?"
					})
				]
			}),
			x === "stale" && /* @__PURE__ */ a("p", {
				className: "m-0 text-[11px] text-text-tertiary",
				"data-testid": `${_}-stale-note`,
				children: "This change has been edited since it was reviewed. Re-run the review before trusting it."
			}),
			S && v && /* @__PURE__ */ a("div", {
				id: b,
				"data-testid": `${_}-reasoning`,
				className: e("rounded border border-border bg-surface-inset px-2 py-1.5 text-xs", x === "stale" ? "text-text-tertiary" : "text-text-secondary"),
				children: s?.reasoning
			})
		]
	});
}
//#endregion
export { u as a, p as i, f as n, l as o, d as r, c as s, m as t };
