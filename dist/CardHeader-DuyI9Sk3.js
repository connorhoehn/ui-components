import { jsx as t, jsxs as f } from "react/jsx-runtime";
import { c as C } from "./cn-B6yFEsav.js";
const i = "#16a34a", l = "#dc2626", v = "#d97706", o = "#2563eb", s = "#94a3b8", d = "#646cff", r = "#0f172a", w = {
  // Pipeline run lifecycle
  "pipeline.run.started": { icon: "▶", color: o, severity: "info" },
  "pipeline.run.completed": { icon: "✓", color: i, severity: "success" },
  "pipeline.run.failed": { icon: "✕", color: l, severity: "error" },
  "pipeline.run.cancelled": { icon: "⊘", color: s, severity: "neutral" },
  "pipeline.run.orphaned": { icon: "⚠", color: v, severity: "warning" },
  "pipeline.run.reassigned": { icon: "↔", color: o, severity: "info" },
  "pipeline.run.paused": { icon: "⏸", color: v, severity: "warning" },
  "pipeline.run.resumed": { icon: "▶", color: o, severity: "info" },
  "pipeline:run:resumeFromStep": { icon: "↻", color: o, severity: "info" },
  "pipeline.run.resumed-from-step": { icon: "↻", color: o, severity: "info" },
  "pipeline.run.retry": { icon: "↻", color: o, severity: "info" },
  // Pipeline step lifecycle
  "pipeline.step.started": { icon: "▸", color: o, severity: "info" },
  "pipeline.step.completed": { icon: "✓", color: i, severity: "success" },
  "pipeline.step.failed": { icon: "✕", color: l, severity: "error" },
  "pipeline.step.skipped": { icon: "–", color: s, severity: "neutral" },
  "pipeline.step.cancelled": { icon: "⊘", color: s, severity: "neutral" },
  // Pipeline LLM streaming
  "pipeline.llm.prompt": { icon: "💬", color: o, severity: "info" },
  "pipeline.llm.stream.opened": { icon: "⟳", color: o, severity: "info" },
  "pipeline.llm.token": { icon: "·", color: s, severity: "neutral" },
  "pipeline.llm.response": { icon: "💬", color: o, severity: "info" },
  // Pipeline human approval
  "pipeline.approval.requested": { icon: "✋", color: v, severity: "warning" },
  "pipeline.approval.recorded": { icon: "✓", color: i, severity: "success" },
  // Pipeline join coordination
  "pipeline.join.waiting": { icon: "⏳", color: v, severity: "warning" },
  "pipeline.join.fired": { icon: "⑃", color: o, severity: "info" },
  // Document editor — item / section mutations
  "doc.add_item": { icon: "➕", color: r, severity: "info" },
  "doc.remove_item": { icon: "➖", color: r, severity: "neutral" },
  "doc.add_section": { icon: "📁", color: r, severity: "info" },
  "doc.edit_section": { icon: "✏", color: r, severity: "info" },
  // Document editor — comments / threads / mentions
  "doc.comment": { icon: "💬", color: r, severity: "info" },
  "doc.mention": { icon: "@", color: r, severity: "info" },
  "doc.resolve_thread": { icon: "✓", color: i, severity: "success" },
  "doc.unresolve_thread": { icon: "✕", color: l, severity: "error" },
  // Document editor — review / ack / reject / lifecycle
  "doc.finalize": { icon: "🔒", color: r, severity: "info" },
  "doc.unlock": { icon: "🔓", color: r, severity: "info" },
  "doc.review_approved": { icon: "✓", color: i, severity: "success" },
  "doc.review_reviewed": { icon: "👀", color: o, severity: "info" },
  "doc.review_changes_requested": { icon: "✕", color: l, severity: "error" },
  "doc.ack": { icon: "✅", color: i, severity: "success" },
  "doc.reject": { icon: "❌", color: l, severity: "error" },
  // Social — rooms / follow / reactions / posts
  "social.room.join": { icon: "🚪", color: d, severity: "info" },
  "social.room.leave": { icon: "🚪", color: s, severity: "neutral" },
  "social.follow": { icon: "👥", color: i, severity: "success" },
  "social.unfollow": { icon: "👥", color: s, severity: "neutral" },
  "social.like": { icon: "❤", color: i, severity: "success" },
  "social.reaction": { icon: "😀", color: d, severity: "info" },
  "social.post.created": { icon: "📝", color: d, severity: "info" },
  "social.comment.created": { icon: "💬", color: d, severity: "info" }
};
function W(e) {
  return w[e] ?? { icon: "•", color: "#94a3b8", severity: "neutral" };
}
function S(e) {
  return e.startsWith("pipeline.run.") || e.startsWith("pipeline.join.") ? "lifecycle" : e.startsWith("pipeline.step.") ? "step" : e.startsWith("pipeline.llm.") ? "llm" : e.startsWith("pipeline.approval.") ? "approval" : e.startsWith("doc.") ? "activity" : e.startsWith("social.") ? "social" : "other";
}
function R({ data: e, width: n = 80, height: c = 20, color: p = "#646cff" }) {
  if (!e || e.length === 0)
    return /* @__PURE__ */ t("svg", { width: n, height: c, "aria-hidden": "true" });
  const a = Math.min(...e), u = Math.max(...e) - a || 1, y = e.length > 1 ? n / (e.length - 1) : 0, m = e.map((x, h) => {
    const _ = h * y, g = c - (x - a) / u * c;
    return `${_.toFixed(2)},${g.toFixed(2)}`;
  }).join(" ");
  return /* @__PURE__ */ t(
    "svg",
    {
      "data-testid": "sparkline",
      width: n,
      height: c,
      viewBox: `0 0 ${n} ${c}`,
      preserveAspectRatio: "none",
      className: "block",
      children: /* @__PURE__ */ t("polyline", { fill: "none", stroke: p, strokeWidth: 1.5, points: m })
    }
  );
}
function b({ title: e, subtitle: n, meta: c, action: p, className: a }) {
  return /* @__PURE__ */ f("div", { className: C("flex items-center justify-between gap-4", a), children: [
    /* @__PURE__ */ f("div", { className: "min-w-0", children: [
      /* @__PURE__ */ f("div", { className: "flex items-center gap-2 min-w-0", children: [
        /* @__PURE__ */ t("h3", { className: "text-sm font-semibold text-[var(--color-text-primary)] truncate", children: e }),
        c
      ] }),
      n && /* @__PURE__ */ t("p", { className: "text-xs text-[var(--color-text-tertiary)] mt-0.5", children: n })
    ] }),
    p && /* @__PURE__ */ t("div", { className: "flex-shrink-0", children: p })
  ] });
}
export {
  b as C,
  R as S,
  W as a,
  w as e,
  S as g
};
