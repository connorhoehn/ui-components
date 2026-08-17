const t = [
  "neutral",
  "success",
  "warning",
  "danger",
  "info",
  "caution",
  "accent"
];
function e(n) {
  return n === "purple" ? "accent" : n;
}
const g = {
  neutral: "bg-neutral-bg text-neutral-fg",
  success: "bg-success-bg text-success-fg",
  warning: "bg-warning-bg text-warning-fg",
  danger: "bg-danger-bg text-danger-fg",
  info: "bg-info-bg text-info-fg",
  caution: "bg-caution-bg text-caution-fg",
  accent: "bg-accent-bg text-accent-fg"
}, a = {
  neutral: "bg-neutral text-white",
  success: "bg-success text-white",
  warning: "bg-warning text-white",
  danger: "bg-danger text-white",
  info: "bg-info text-white",
  caution: "bg-caution text-white",
  accent: "bg-accent text-white"
}, c = {
  neutral: "bg-neutral",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  caution: "bg-caution",
  accent: "bg-accent"
}, r = {
  neutral: "border-neutral-border",
  success: "border-success-border",
  warning: "border-warning-border",
  danger: "border-danger-border",
  info: "border-info-border",
  caution: "border-caution-border",
  accent: "border-accent-border"
}, s = {
  neutral: "text-neutral-fg",
  success: "text-success-fg",
  warning: "text-warning-fg",
  danger: "text-danger-fg",
  info: "text-info-fg",
  caution: "text-caution-fg",
  accent: "text-accent-fg"
}, b = {
  neutral: "bg-neutral-bg",
  success: "bg-success-bg",
  warning: "bg-warning-bg",
  danger: "bg-danger-bg",
  info: "bg-info-bg",
  caution: "bg-caution-bg",
  accent: "bg-accent-bg"
};
function o(n) {
  return `var(--color-${e(n)})`;
}
export {
  t as T,
  b as a,
  r as b,
  g as c,
  a as d,
  c as e,
  s as f,
  o as g,
  e as t
};
