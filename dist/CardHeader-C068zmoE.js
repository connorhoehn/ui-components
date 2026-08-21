import { jsx as i, jsxs as f } from "react/jsx-runtime";
import { c as m } from "./cn-B6yFEsav.js";
function R({ data: e, width: r = 80, height: n = 20, color: l = "var(--color-primary)" }) {
  if (!e || e.length === 0)
    return /* @__PURE__ */ i("svg", { width: r, height: n, "aria-hidden": "true" });
  const s = Math.min(...e), v = Math.max(...e) - s || 1, x = e.length > 1 ? r / (e.length - 1) : 0, h = e.map((g, w) => {
    const _ = w * x, N = n - (g - s) / v * n;
    return `${_.toFixed(2)},${N.toFixed(2)}`;
  }).join(" ");
  return /* @__PURE__ */ i(
    "svg",
    {
      "data-testid": "sparkline",
      width: r,
      height: n,
      viewBox: `0 0 ${r} ${n}`,
      preserveAspectRatio: "none",
      className: "block",
      children: /* @__PURE__ */ i("polyline", { fill: "none", stroke: l, strokeWidth: 1.5, points: h })
    }
  );
}
const t = "var(--color-success)", p = "var(--color-danger)", d = "var(--color-warning)", o = "var(--color-info)", a = "var(--color-text-tertiary)", u = "var(--color-primary)", c = "var(--color-text-primary)", C = {
  // Pipeline run lifecycle
  "pipeline.run.started": { icon: "▶", color: o, severity: "info" },
  "pipeline.run.completed": { icon: "✓", color: t, severity: "success" },
  "pipeline.run.failed": { icon: "✕", color: p, severity: "error" },
  "pipeline.run.cancelled": { icon: "⊘", color: a, severity: "neutral" },
  "pipeline.run.orphaned": { icon: "⚠", color: d, severity: "warning" },
  "pipeline.run.reassigned": { icon: "↔", color: o, severity: "info" },
  "pipeline.run.paused": { icon: "⏸", color: d, severity: "warning" },
  "pipeline.run.resumed": { icon: "▶", color: o, severity: "info" },
  "pipeline:run:resumeFromStep": { icon: "↻", color: o, severity: "info" },
  "pipeline.run.resumed-from-step": { icon: "↻", color: o, severity: "info" },
  "pipeline.run.retry": { icon: "↻", color: o, severity: "info" },
  // Pipeline step lifecycle
  "pipeline.step.started": { icon: "▸", color: o, severity: "info" },
  "pipeline.step.completed": { icon: "✓", color: t, severity: "success" },
  "pipeline.step.failed": { icon: "✕", color: p, severity: "error" },
  "pipeline.step.skipped": { icon: "–", color: a, severity: "neutral" },
  "pipeline.step.cancelled": { icon: "⊘", color: a, severity: "neutral" },
  // Pipeline LLM streaming
  "pipeline.llm.prompt": { icon: "💬", color: o, severity: "info" },
  "pipeline.llm.stream.opened": { icon: "⟳", color: o, severity: "info" },
  "pipeline.llm.token": { icon: "·", color: a, severity: "neutral" },
  "pipeline.llm.response": { icon: "💬", color: o, severity: "info" },
  // Pipeline human approval
  "pipeline.approval.requested": { icon: "✋", color: d, severity: "warning" },
  "pipeline.approval.recorded": { icon: "✓", color: t, severity: "success" },
  // Pipeline join coordination
  "pipeline.join.waiting": { icon: "⏳", color: d, severity: "warning" },
  "pipeline.join.fired": { icon: "⑃", color: o, severity: "info" },
  // Document editor — item / section mutations
  "doc.add_item": { icon: "➕", color: c, severity: "info" },
  "doc.remove_item": { icon: "➖", color: c, severity: "neutral" },
  "doc.add_section": { icon: "📁", color: c, severity: "info" },
  "doc.edit_section": { icon: "✏", color: c, severity: "info" },
  // Document editor — comments / threads / mentions
  "doc.comment": { icon: "💬", color: c, severity: "info" },
  "doc.mention": { icon: "@", color: c, severity: "info" },
  "doc.resolve_thread": { icon: "✓", color: t, severity: "success" },
  "doc.unresolve_thread": { icon: "✕", color: p, severity: "error" },
  // Document editor — review / ack / reject / lifecycle
  "doc.finalize": { icon: "🔒", color: c, severity: "info" },
  "doc.unlock": { icon: "🔓", color: c, severity: "info" },
  "doc.review_approved": { icon: "✓", color: t, severity: "success" },
  "doc.review_reviewed": { icon: "👀", color: o, severity: "info" },
  "doc.review_changes_requested": { icon: "✕", color: p, severity: "error" },
  "doc.ack": { icon: "✅", color: t, severity: "success" },
  "doc.reject": { icon: "❌", color: p, severity: "error" },
  // Social — rooms / follow / reactions / posts
  "social.room.join": { icon: "🚪", color: u, severity: "info" },
  "social.room.leave": { icon: "🚪", color: a, severity: "neutral" },
  "social.follow": { icon: "👥", color: t, severity: "success" },
  "social.unfollow": { icon: "👥", color: a, severity: "neutral" },
  "social.like": { icon: "❤", color: t, severity: "success" },
  "social.reaction": { icon: "😀", color: u, severity: "info" },
  "social.post.created": { icon: "📝", color: u, severity: "info" },
  "social.comment.created": { icon: "💬", color: u, severity: "info" }
};
function k(e) {
  return C[e] ?? { icon: "•", color: "var(--color-text-tertiary)", severity: "neutral" };
}
function S(e) {
  return e.startsWith("pipeline.run.") || e.startsWith("pipeline.join.") ? "lifecycle" : e.startsWith("pipeline.step.") ? "step" : e.startsWith("pipeline.llm.") ? "llm" : e.startsWith("pipeline.approval.") ? "approval" : e.startsWith("doc.") ? "activity" : e.startsWith("social.") ? "social" : "other";
}
const j = {
  info: "text-neutral",
  warning: "text-warning-fg",
  error: "text-danger-fg",
  success: "text-success-fg"
};
function b({ timestamp: e, type: r, summary: n, severity: l = "info", onClick: s, selected: y }) {
  const v = k(r);
  return /* @__PURE__ */ f(
    "div",
    {
      "data-testid": "event-row",
      onClick: s,
      className: m(
        "flex items-center gap-2 px-2.5 py-1.5 text-[13px] font-[inherit] rounded-md text-text-primary",
        y ? "bg-accent-bg" : "bg-transparent",
        s ? "cursor-pointer" : "cursor-default"
      ),
      children: [
        /* @__PURE__ */ i("span", { className: "text-sm shrink-0", style: { color: v.color }, children: v.icon }),
        /* @__PURE__ */ i("span", { className: "text-[11px] text-text-tertiary shrink-0 w-[70px]", children: e }),
        /* @__PURE__ */ i("span", { className: m("text-xs font-semibold shrink-0", j[l]), children: r }),
        /* @__PURE__ */ i("span", { className: "flex-1 overflow-hidden text-ellipsis whitespace-nowrap", children: n })
      ]
    }
  );
}
function A({ title: e, subtitle: r, meta: n, action: l, className: s }) {
  return /* @__PURE__ */ f("div", { className: m("flex items-center justify-between gap-4", s), children: [
    /* @__PURE__ */ f("div", { className: "min-w-0", children: [
      /* @__PURE__ */ f("div", { className: "flex items-center gap-2 min-w-0", children: [
        /* @__PURE__ */ i("h3", { className: "text-sm font-semibold text-[var(--color-text-primary)] truncate", children: e }),
        n
      ] }),
      r && /* @__PURE__ */ i("p", { className: "text-xs text-[var(--color-text-tertiary)] mt-0.5", children: r })
    ] }),
    l && /* @__PURE__ */ i("div", { className: "flex-shrink-0", children: l })
  ] });
}
export {
  A as C,
  b as E,
  R as S,
  k as a,
  C as e,
  S as g
};
