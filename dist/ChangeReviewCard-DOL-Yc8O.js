import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-uREUOWUk.js";
import { n } from "./overlayStack-C0EBgmzL.js";
import { t as r } from "./Input-_B49FdRY.js";
import { t as i } from "./Avatar-CpUrJRJP.js";
import { t as a } from "./ChangeDiff-BEScRhcZ.js";
import { o, t as s } from "./VerdictChip-DoD3-HAG.js";
import { Children as c, useState as l } from "react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/components/change-review/ChangeReviewList.tsx
function p({ documentTitle: r, changeCount: i, documentMeta: a, headerActions: o, pageSize: s = 3, emptyState: p, notices: m, footer: h, children: g, className: _, "data-testid": v = "change-review-list" }) {
	let y = c.toArray(g).filter(Boolean), b = i ?? y.length, [x, S] = l(s), C = y.slice(0, x), w = y.length - C.length;
	return /* @__PURE__ */ f("div", {
		"data-testid": v,
		className: e("flex min-w-0 flex-col gap-3", _),
		children: [
			/* @__PURE__ */ f("div", {
				className: "flex flex-wrap items-start justify-between gap-2",
				children: [/* @__PURE__ */ f("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ d("h2", {
						className: "m-0 text-lg font-bold leading-tight text-text-primary",
						"data-testid": `${v}-title`,
						children: r
					}), /* @__PURE__ */ f("div", {
						className: "mt-0.5 flex flex-wrap items-center gap-1.5",
						children: [/* @__PURE__ */ d("span", {
							className: "text-[13px] text-text-secondary",
							"data-testid": `${v}-count`,
							children: b === 0 ? "No changes to review" : `${b} change${b === 1 ? "" : "s"} to review`
						}), a && /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d("span", {
							"aria-hidden": !0,
							className: "text-text-tertiary",
							children: "·"
						}), /* @__PURE__ */ d("span", {
							className: "text-[12px] text-text-tertiary",
							children: a
						})] })]
					})]
				}), o]
			}),
			m,
			y.length === 0 ? p : /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d("div", {
				className: "flex flex-col gap-2",
				"data-testid": `${v}-queue`,
				children: C
			}), w > 0 && /* @__PURE__ */ f("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ f(t, {
					size: "sm",
					variant: "secondary",
					onClick: () => S((e) => e + s),
					"data-testid": `${v}-more`,
					children: [
						"Show ",
						Math.min(w, s),
						" more"
					]
				}), /* @__PURE__ */ f(n, {
					tone: "neutral",
					size: "xs",
					mono: !0,
					"data-testid": `${v}-remaining`,
					children: [w, " left"]
				})]
			})] }),
			h
		]
	});
}
//#endregion
//#region src/components/change-review/ChangeReviewCard.tsx
function m({ category: c, author: p, path: m = [], locationHint: h, pairs: g, beforeLabel: _, afterLabel: v, utterance: y, rationale: b, verdict: x, verdictStatus: S = "idle", verdictError: C, revision: w, status: T = "pending", draftError: E, badges: D, onAccept: O, onReject: k, onRereview: A, actions: j, className: M, "data-testid": N = "change-review-card" }) {
	let [P, F] = l(!1), [I, L] = l(null), [R, z] = l(!1), [B, V] = l(""), H = T === "applied", U = T === "rejected", W = H || U;
	async function G() {
		if (O) {
			F(!0), L(null);
			try {
				let e = await O();
				L(e);
			} catch (e) {
				L({
					ok: !1,
					message: e instanceof Error ? e.message : String(e)
				});
			} finally {
				F(!1);
			}
		}
	}
	return /* @__PURE__ */ f("div", {
		"data-testid": N,
		"data-status": T,
		"data-category": c,
		className: e("flex flex-col gap-2.5 rounded-lg border bg-surface p-3", H ? "border-success-border" : "border-border", U && "opacity-60", M),
		children: [
			/* @__PURE__ */ f("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ d("span", {
						className: "text-sm font-semibold leading-tight text-text-primary",
						"data-testid": `${N}-category`,
						children: c
					}),
					/* @__PURE__ */ d("span", {
						className: "flex min-w-0 items-center gap-1.5",
						"data-testid": `${N}-author`,
						children: p ? /* @__PURE__ */ f(u, { children: [
							/* @__PURE__ */ d(i, {
								name: p.name,
								size: 18,
								...p.avatarUrl ? { src: p.avatarUrl } : {}
							}),
							/* @__PURE__ */ d("span", {
								className: "truncate text-xs text-text-secondary",
								children: p.name
							}),
							p.kind === "agent" && /* @__PURE__ */ d(n, {
								tone: "info",
								size: "xs",
								uppercase: !0,
								"data-testid": `${N}-agent`,
								children: "AI"
							})
						] }) : /* @__PURE__ */ d("span", {
							className: "text-xs italic text-text-tertiary",
							children: "Unattributed"
						})
					}),
					/* @__PURE__ */ d("span", { className: "flex-1" }),
					D,
					H && /* @__PURE__ */ d(n, {
						tone: "success",
						size: "sm",
						"data-testid": `${N}-applied`,
						children: "Applied"
					}),
					U && /* @__PURE__ */ d(n, {
						tone: "neutral",
						size: "sm",
						children: "Rejected"
					})
				]
			}),
			y && /* @__PURE__ */ f("blockquote", {
				className: "m-0 border-l-2 border-border pl-2 text-sm italic text-text-primary",
				children: [
					"“",
					y,
					"”"
				]
			}),
			/* @__PURE__ */ d(o, {
				path: m,
				...h ? { hint: h } : {},
				"data-testid": `${N}-location`
			}),
			E ? /* @__PURE__ */ d("div", {
				className: "rounded border border-warning-border bg-warning-bg px-2 py-1.5 text-xs text-warning-fg",
				"data-testid": `${N}-draft-error`,
				children: E
			}) : /* @__PURE__ */ d(a, {
				pairs: g,
				..._ ? { beforeLabel: _ } : {},
				...v ? { afterLabel: v } : {},
				"data-testid": `${N}-diff`
			}),
			b && /* @__PURE__ */ d("p", {
				className: "m-0 text-xs text-text-secondary",
				"data-testid": `${N}-rationale`,
				children: b
			}),
			/* @__PURE__ */ d(s, {
				verdict: x,
				status: S,
				error: C,
				revision: w,
				"data-testid": `${N}-verdict`
			}),
			I && !I.ok && /* @__PURE__ */ f("div", {
				className: "flex flex-col gap-1 rounded border border-danger-border bg-danger-bg px-2 py-1.5 text-xs text-danger-fg",
				"data-testid": `${N}-apply-error`,
				children: [
					/* @__PURE__ */ d("span", {
						className: "font-semibold",
						children: "This was not applied."
					}),
					/* @__PURE__ */ d("span", { children: I.message ?? "The document refused the change." }),
					I.stale && /* @__PURE__ */ f("span", { children: [
						"Drafted against ",
						JSON.stringify(I.stale.expected ?? ""),
						"; the document now reads",
						" ",
						JSON.stringify(I.stale.actual ?? ""),
						"."
					] })
				]
			}),
			!W && (O || k || A || j) && /* @__PURE__ */ f("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					O && /* @__PURE__ */ d(t, {
						size: "sm",
						variant: "primary",
						disabled: P || !!E,
						onClick: G,
						"data-testid": `${N}-accept`,
						children: P ? "Applying…" : "Apply change"
					}),
					k && /* @__PURE__ */ d(t, {
						size: "sm",
						variant: "ghost",
						disabled: P,
						onClick: () => z((e) => !e),
						"data-testid": `${N}-reject`,
						children: "Reject"
					}),
					A && /* @__PURE__ */ d(t, {
						size: "sm",
						variant: "ghost",
						disabled: P,
						onClick: A,
						"data-testid": `${N}-rereview`,
						children: "Re-run review"
					}),
					j
				]
			}),
			R && !W && k && /* @__PURE__ */ f("div", {
				className: "flex flex-col gap-1.5",
				children: [
					/* @__PURE__ */ d("label", {
						className: "text-[11px] text-text-tertiary",
						htmlFor: `${N}-reason`,
						children: "Why? (optional — helps the next draft)"
					}),
					/* @__PURE__ */ d(r, {
						id: `${N}-reason`,
						size: "sm",
						value: B,
						onChange: (e) => V(e.target.value),
						"data-testid": `${N}-reason`
					}),
					/* @__PURE__ */ f("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ d(t, {
							size: "sm",
							variant: "danger",
							onClick: () => {
								k(B), z(!1);
							},
							"data-testid": `${N}-reject-confirm`,
							children: "Reject change"
						}), /* @__PURE__ */ d(t, {
							size: "sm",
							variant: "ghost",
							onClick: () => z(!1),
							children: "Cancel"
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { p as n, m as t };
