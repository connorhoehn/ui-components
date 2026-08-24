import { t as e } from "./cn-DhjIN-s0.js";
import "react";
import { Fragment as t, jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/shared/eventGlyphs.ts
var i = "var(--color-success)", a = "var(--color-danger)", o = "var(--color-warning)", s = "var(--color-info)", c = "var(--color-text-tertiary)", l = "var(--color-primary)", u = "var(--color-text-primary)", d = {
	"pipeline.run.started": {
		icon: "▶",
		color: s,
		severity: "info"
	},
	"pipeline.run.completed": {
		icon: "✓",
		color: i,
		severity: "success"
	},
	"pipeline.run.failed": {
		icon: "✕",
		color: a,
		severity: "error"
	},
	"pipeline.run.cancelled": {
		icon: "⊘",
		color: c,
		severity: "neutral"
	},
	"pipeline.run.orphaned": {
		icon: "⚠",
		color: o,
		severity: "warning"
	},
	"pipeline.run.reassigned": {
		icon: "↔",
		color: s,
		severity: "info"
	},
	"pipeline.run.paused": {
		icon: "⏸",
		color: o,
		severity: "warning"
	},
	"pipeline.run.resumed": {
		icon: "▶",
		color: s,
		severity: "info"
	},
	"pipeline:run:resumeFromStep": {
		icon: "↻",
		color: s,
		severity: "info"
	},
	"pipeline.run.resumed-from-step": {
		icon: "↻",
		color: s,
		severity: "info"
	},
	"pipeline.run.retry": {
		icon: "↻",
		color: s,
		severity: "info"
	},
	"pipeline.step.started": {
		icon: "▸",
		color: s,
		severity: "info"
	},
	"pipeline.step.completed": {
		icon: "✓",
		color: i,
		severity: "success"
	},
	"pipeline.step.failed": {
		icon: "✕",
		color: a,
		severity: "error"
	},
	"pipeline.step.skipped": {
		icon: "–",
		color: c,
		severity: "neutral"
	},
	"pipeline.step.cancelled": {
		icon: "⊘",
		color: c,
		severity: "neutral"
	},
	"pipeline.llm.prompt": {
		icon: "💬",
		color: s,
		severity: "info"
	},
	"pipeline.llm.stream.opened": {
		icon: "⟳",
		color: s,
		severity: "info"
	},
	"pipeline.llm.token": {
		icon: "·",
		color: c,
		severity: "neutral"
	},
	"pipeline.llm.response": {
		icon: "💬",
		color: s,
		severity: "info"
	},
	"pipeline.approval.requested": {
		icon: "✋",
		color: o,
		severity: "warning"
	},
	"pipeline.approval.recorded": {
		icon: "✓",
		color: i,
		severity: "success"
	},
	"pipeline.join.waiting": {
		icon: "⏳",
		color: o,
		severity: "warning"
	},
	"pipeline.join.fired": {
		icon: "⑃",
		color: s,
		severity: "info"
	},
	"doc.add_item": {
		icon: "➕",
		color: u,
		severity: "info"
	},
	"doc.remove_item": {
		icon: "➖",
		color: u,
		severity: "neutral"
	},
	"doc.add_section": {
		icon: "📁",
		color: u,
		severity: "info"
	},
	"doc.edit_section": {
		icon: "✏",
		color: u,
		severity: "info"
	},
	"doc.comment": {
		icon: "💬",
		color: u,
		severity: "info"
	},
	"doc.mention": {
		icon: "@",
		color: u,
		severity: "info"
	},
	"doc.resolve_thread": {
		icon: "✓",
		color: i,
		severity: "success"
	},
	"doc.unresolve_thread": {
		icon: "✕",
		color: a,
		severity: "error"
	},
	"doc.finalize": {
		icon: "🔒",
		color: u,
		severity: "info"
	},
	"doc.unlock": {
		icon: "🔓",
		color: u,
		severity: "info"
	},
	"doc.review_approved": {
		icon: "✓",
		color: i,
		severity: "success"
	},
	"doc.review_reviewed": {
		icon: "👀",
		color: s,
		severity: "info"
	},
	"doc.review_changes_requested": {
		icon: "✕",
		color: a,
		severity: "error"
	},
	"doc.ack": {
		icon: "✅",
		color: i,
		severity: "success"
	},
	"doc.reject": {
		icon: "❌",
		color: a,
		severity: "error"
	},
	"social.room.join": {
		icon: "🚪",
		color: l,
		severity: "info"
	},
	"social.room.leave": {
		icon: "🚪",
		color: c,
		severity: "neutral"
	},
	"social.follow": {
		icon: "👥",
		color: i,
		severity: "success"
	},
	"social.unfollow": {
		icon: "👥",
		color: c,
		severity: "neutral"
	},
	"social.like": {
		icon: "❤",
		color: i,
		severity: "success"
	},
	"social.reaction": {
		icon: "😀",
		color: l,
		severity: "info"
	},
	"social.post.created": {
		icon: "📝",
		color: l,
		severity: "info"
	},
	"social.comment.created": {
		icon: "💬",
		color: l,
		severity: "info"
	}
};
function f(e) {
	return d[e] ?? {
		icon: "•",
		color: "var(--color-text-tertiary)",
		severity: "neutral"
	};
}
function p(e) {
	return e.startsWith("pipeline.run.") || e.startsWith("pipeline.join.") ? "lifecycle" : e.startsWith("pipeline.step.") ? "step" : e.startsWith("pipeline.llm.") ? "llm" : e.startsWith("pipeline.approval.") ? "approval" : e.startsWith("doc.") ? "activity" : e.startsWith("social.") ? "social" : "other";
}
//#endregion
//#region src/components/shared/EventRow.tsx
var m = {
	info: "text-neutral",
	warning: "text-warning-fg",
	error: "text-danger-fg",
	success: "text-success-fg"
};
function h({ timestamp: i, type: a, summary: o, severity: s = "info", onClick: c, selected: l }) {
	let u = f(a), d = e("flex items-center gap-2 px-2.5 py-1.5 text-[13px] font-[inherit] rounded-md text-text-primary", l ? "bg-accent-bg" : "bg-transparent", c ? "cursor-pointer" : "cursor-default"), p = /* @__PURE__ */ r(t, { children: [
		/* @__PURE__ */ n("span", {
			className: "text-sm shrink-0",
			style: { color: u.color },
			children: u.icon
		}),
		/* @__PURE__ */ n("span", {
			className: "text-[11px] text-text-tertiary shrink-0 w-[70px]",
			children: i
		}),
		/* @__PURE__ */ n("span", {
			className: e("text-xs font-semibold shrink-0", m[s]),
			children: a
		}),
		/* @__PURE__ */ n("span", {
			className: "flex-1 overflow-hidden text-ellipsis whitespace-nowrap",
			children: o
		})
	] });
	return c ? /* @__PURE__ */ n("button", {
		"data-testid": "event-row",
		type: "button",
		onClick: c,
		"aria-pressed": l ?? !1,
		className: e(d, "text-left w-full border-none"),
		children: p
	}) : /* @__PURE__ */ n("div", {
		"data-testid": "event-row",
		className: d,
		children: p
	});
}
//#endregion
//#region src/components/shared/Sparkline.tsx
function g({ data: e, width: t = 80, height: r = 20, color: i = "var(--color-primary)" }) {
	if (!e || e.length === 0) return /* @__PURE__ */ n("svg", {
		width: t,
		height: r,
		"aria-hidden": "true"
	});
	let a = Math.min(...e), o = Math.max(...e) - a || 1, s = e.length > 1 ? t / (e.length - 1) : 0, c = e.map((e, t) => {
		let n = t * s, i = r - (e - a) / o * r;
		return `${n.toFixed(2)},${i.toFixed(2)}`;
	}).join(" ");
	return /* @__PURE__ */ n("svg", {
		"data-testid": "sparkline",
		width: t,
		height: r,
		viewBox: `0 0 ${t} ${r}`,
		preserveAspectRatio: "none",
		className: "block",
		children: /* @__PURE__ */ n("polyline", {
			fill: "none",
			stroke: i,
			strokeWidth: 1.5,
			points: c
		})
	});
}
//#endregion
//#region src/components/shared/CardHeader.tsx
function _({ title: t, subtitle: i, meta: a, action: o, className: s }) {
	return /* @__PURE__ */ r("div", {
		className: e("flex items-center justify-between gap-4", s),
		children: [/* @__PURE__ */ r("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ r("div", {
				className: "flex items-center gap-2 min-w-0",
				children: [/* @__PURE__ */ n("h3", {
					className: "text-sm font-semibold text-[var(--color-text-primary)] truncate",
					children: t
				}), a]
			}), i && /* @__PURE__ */ n("p", {
				className: "text-xs text-[var(--color-text-tertiary)] mt-0.5",
				children: i
			})]
		}), o && /* @__PURE__ */ n("div", {
			className: "flex-shrink-0",
			children: o
		})]
	});
}
//#endregion
export { p as a, d as i, g as n, f as o, h as r, _ as t };
