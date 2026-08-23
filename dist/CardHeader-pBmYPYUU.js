import { t as e } from "./cn-DhjIN-s0.js";
import "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/shared/eventGlyphs.ts
var r = "var(--color-success)", i = "var(--color-danger)", a = "var(--color-warning)", o = "var(--color-info)", s = "var(--color-text-tertiary)", c = "var(--color-primary)", l = "var(--color-text-primary)", u = {
	"pipeline.run.started": {
		icon: "▶",
		color: o,
		severity: "info"
	},
	"pipeline.run.completed": {
		icon: "✓",
		color: r,
		severity: "success"
	},
	"pipeline.run.failed": {
		icon: "✕",
		color: i,
		severity: "error"
	},
	"pipeline.run.cancelled": {
		icon: "⊘",
		color: s,
		severity: "neutral"
	},
	"pipeline.run.orphaned": {
		icon: "⚠",
		color: a,
		severity: "warning"
	},
	"pipeline.run.reassigned": {
		icon: "↔",
		color: o,
		severity: "info"
	},
	"pipeline.run.paused": {
		icon: "⏸",
		color: a,
		severity: "warning"
	},
	"pipeline.run.resumed": {
		icon: "▶",
		color: o,
		severity: "info"
	},
	"pipeline:run:resumeFromStep": {
		icon: "↻",
		color: o,
		severity: "info"
	},
	"pipeline.run.resumed-from-step": {
		icon: "↻",
		color: o,
		severity: "info"
	},
	"pipeline.run.retry": {
		icon: "↻",
		color: o,
		severity: "info"
	},
	"pipeline.step.started": {
		icon: "▸",
		color: o,
		severity: "info"
	},
	"pipeline.step.completed": {
		icon: "✓",
		color: r,
		severity: "success"
	},
	"pipeline.step.failed": {
		icon: "✕",
		color: i,
		severity: "error"
	},
	"pipeline.step.skipped": {
		icon: "–",
		color: s,
		severity: "neutral"
	},
	"pipeline.step.cancelled": {
		icon: "⊘",
		color: s,
		severity: "neutral"
	},
	"pipeline.llm.prompt": {
		icon: "💬",
		color: o,
		severity: "info"
	},
	"pipeline.llm.stream.opened": {
		icon: "⟳",
		color: o,
		severity: "info"
	},
	"pipeline.llm.token": {
		icon: "·",
		color: s,
		severity: "neutral"
	},
	"pipeline.llm.response": {
		icon: "💬",
		color: o,
		severity: "info"
	},
	"pipeline.approval.requested": {
		icon: "✋",
		color: a,
		severity: "warning"
	},
	"pipeline.approval.recorded": {
		icon: "✓",
		color: r,
		severity: "success"
	},
	"pipeline.join.waiting": {
		icon: "⏳",
		color: a,
		severity: "warning"
	},
	"pipeline.join.fired": {
		icon: "⑃",
		color: o,
		severity: "info"
	},
	"doc.add_item": {
		icon: "➕",
		color: l,
		severity: "info"
	},
	"doc.remove_item": {
		icon: "➖",
		color: l,
		severity: "neutral"
	},
	"doc.add_section": {
		icon: "📁",
		color: l,
		severity: "info"
	},
	"doc.edit_section": {
		icon: "✏",
		color: l,
		severity: "info"
	},
	"doc.comment": {
		icon: "💬",
		color: l,
		severity: "info"
	},
	"doc.mention": {
		icon: "@",
		color: l,
		severity: "info"
	},
	"doc.resolve_thread": {
		icon: "✓",
		color: r,
		severity: "success"
	},
	"doc.unresolve_thread": {
		icon: "✕",
		color: i,
		severity: "error"
	},
	"doc.finalize": {
		icon: "🔒",
		color: l,
		severity: "info"
	},
	"doc.unlock": {
		icon: "🔓",
		color: l,
		severity: "info"
	},
	"doc.review_approved": {
		icon: "✓",
		color: r,
		severity: "success"
	},
	"doc.review_reviewed": {
		icon: "👀",
		color: o,
		severity: "info"
	},
	"doc.review_changes_requested": {
		icon: "✕",
		color: i,
		severity: "error"
	},
	"doc.ack": {
		icon: "✅",
		color: r,
		severity: "success"
	},
	"doc.reject": {
		icon: "❌",
		color: i,
		severity: "error"
	},
	"social.room.join": {
		icon: "🚪",
		color: c,
		severity: "info"
	},
	"social.room.leave": {
		icon: "🚪",
		color: s,
		severity: "neutral"
	},
	"social.follow": {
		icon: "👥",
		color: r,
		severity: "success"
	},
	"social.unfollow": {
		icon: "👥",
		color: s,
		severity: "neutral"
	},
	"social.like": {
		icon: "❤",
		color: r,
		severity: "success"
	},
	"social.reaction": {
		icon: "😀",
		color: c,
		severity: "info"
	},
	"social.post.created": {
		icon: "📝",
		color: c,
		severity: "info"
	},
	"social.comment.created": {
		icon: "💬",
		color: c,
		severity: "info"
	}
};
function d(e) {
	return u[e] ?? {
		icon: "•",
		color: "var(--color-text-tertiary)",
		severity: "neutral"
	};
}
function f(e) {
	return e.startsWith("pipeline.run.") || e.startsWith("pipeline.join.") ? "lifecycle" : e.startsWith("pipeline.step.") ? "step" : e.startsWith("pipeline.llm.") ? "llm" : e.startsWith("pipeline.approval.") ? "approval" : e.startsWith("doc.") ? "activity" : e.startsWith("social.") ? "social" : "other";
}
//#endregion
//#region src/components/shared/EventRow.tsx
var p = {
	info: "text-neutral",
	warning: "text-warning-fg",
	error: "text-danger-fg",
	success: "text-success-fg"
};
function m({ timestamp: r, type: i, summary: a, severity: o = "info", onClick: s, selected: c }) {
	let l = d(i);
	return /* @__PURE__ */ n("div", {
		"data-testid": "event-row",
		onClick: s,
		className: e("flex items-center gap-2 px-2.5 py-1.5 text-[13px] font-[inherit] rounded-md text-text-primary", c ? "bg-accent-bg" : "bg-transparent", s ? "cursor-pointer" : "cursor-default"),
		children: [
			/* @__PURE__ */ t("span", {
				className: "text-sm shrink-0",
				style: { color: l.color },
				children: l.icon
			}),
			/* @__PURE__ */ t("span", {
				className: "text-[11px] text-text-tertiary shrink-0 w-[70px]",
				children: r
			}),
			/* @__PURE__ */ t("span", {
				className: e("text-xs font-semibold shrink-0", p[o]),
				children: i
			}),
			/* @__PURE__ */ t("span", {
				className: "flex-1 overflow-hidden text-ellipsis whitespace-nowrap",
				children: a
			})
		]
	});
}
//#endregion
//#region src/components/shared/Sparkline.tsx
function h({ data: e, width: n = 80, height: r = 20, color: i = "var(--color-primary)" }) {
	if (!e || e.length === 0) return /* @__PURE__ */ t("svg", {
		width: n,
		height: r,
		"aria-hidden": "true"
	});
	let a = Math.min(...e), o = Math.max(...e) - a || 1, s = e.length > 1 ? n / (e.length - 1) : 0, c = e.map((e, t) => {
		let n = t * s, i = r - (e - a) / o * r;
		return `${n.toFixed(2)},${i.toFixed(2)}`;
	}).join(" ");
	return /* @__PURE__ */ t("svg", {
		"data-testid": "sparkline",
		width: n,
		height: r,
		viewBox: `0 0 ${n} ${r}`,
		preserveAspectRatio: "none",
		className: "block",
		children: /* @__PURE__ */ t("polyline", {
			fill: "none",
			stroke: i,
			strokeWidth: 1.5,
			points: c
		})
	});
}
//#endregion
//#region src/components/shared/CardHeader.tsx
function g({ title: r, subtitle: i, meta: a, action: o, className: s }) {
	return /* @__PURE__ */ n("div", {
		className: e("flex items-center justify-between gap-4", s),
		children: [/* @__PURE__ */ n("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ n("div", {
				className: "flex items-center gap-2 min-w-0",
				children: [/* @__PURE__ */ t("h3", {
					className: "text-sm font-semibold text-[var(--color-text-primary)] truncate",
					children: r
				}), a]
			}), i && /* @__PURE__ */ t("p", {
				className: "text-xs text-[var(--color-text-tertiary)] mt-0.5",
				children: i
			})]
		}), o && /* @__PURE__ */ t("div", {
			className: "flex-shrink-0",
			children: o
		})]
	});
}
//#endregion
export { f as a, u as i, h as n, d as o, m as r, g as t };
