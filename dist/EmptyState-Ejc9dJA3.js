import { jsxs as o, jsx as t } from "react/jsx-runtime";
import { useState as f } from "react";
import { c as i } from "./cn-B6yFEsav.js";
function N({
  icon: e,
  title: r,
  body: a,
  description: s,
  actionLabel: n,
  onAction: d,
  action: c,
  actions: l,
  testId: m = "empty-state",
  actionTestId: x = "empty-state-action"
}) {
  const p = s ?? a;
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": m,
      className: i(
        "flex flex-col items-center justify-center min-h-[220px]",
        "text-text-tertiary gap-2 p-8 font-[inherit]"
      ),
      children: [
        e && (typeof e == "string" ? /* @__PURE__ */ t("div", { className: "text-[52px] mb-2", children: e }) : /* @__PURE__ */ t("div", { className: "mb-2", children: e })),
        /* @__PURE__ */ t("div", { className: "text-[17px] font-semibold text-neutral", children: r }),
        p && /* @__PURE__ */ t("div", { className: "text-[13px] text-center max-w-[340px] text-text-tertiary leading-normal", children: p }),
        l && l.length > 0 ? /* @__PURE__ */ t(u, { actions: l }) : c ? /* @__PURE__ */ t("div", { className: "mt-2.5", children: c }) : n && d && /* @__PURE__ */ t(
          "button",
          {
            "data-testid": x,
            onClick: d,
            className: i(
              "mt-2.5 px-[22px] py-[9px] text-sm font-semibold",
              "bg-primary text-white border-none rounded-lg cursor-pointer font-[inherit]"
            ),
            children: n
          }
        )
      ]
    }
  );
}
function u({ actions: e }) {
  return /* @__PURE__ */ t(
    "ul",
    {
      "data-testid": "empty-state-actions",
      className: "mt-3 flex flex-col gap-3 w-full max-w-[420px]",
      children: e.map((r, a) => /* @__PURE__ */ o("li", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ t(
          b,
          {
            action: r,
            defaultVariant: a === 0 ? "primary" : "secondary"
          }
        ),
        r.code && /* @__PURE__ */ t(h, { code: r.code })
      ] }, `${r.label}-${a}`))
    }
  );
}
function b({
  action: e,
  defaultVariant: r
}) {
  const a = e.variant ?? r, s = i(
    "inline-flex items-center justify-center self-stretch",
    "px-[18px] py-[8px] text-sm font-semibold rounded-lg cursor-pointer",
    "transition-colors font-[inherit]",
    a === "primary" ? "bg-primary text-white border border-transparent hover:bg-primary/90" : "bg-transparent text-text-primary border border-border-emphasis hover:bg-surface-panel"
  );
  if (e.href) {
    const n = e.external === !0;
    return /* @__PURE__ */ o(
      "a",
      {
        "data-testid": "empty-state-actions-link",
        href: e.href,
        onClick: e.onClick,
        className: s,
        ...n ? {
          target: "_blank",
          rel: "noopener noreferrer"
        } : null,
        children: [
          e.label,
          n && /* @__PURE__ */ t("span", { className: "sr-only", children: " (opens in new tab)" })
        ]
      }
    );
  }
  return /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      "data-testid": "empty-state-actions-button",
      onClick: e.onClick,
      className: s,
      children: e.label
    }
  );
}
function h({ code: e }) {
  const [r, a] = f(!1), s = async () => {
    try {
      await navigator.clipboard.writeText(e), a(!0), setTimeout(() => a(!1), 1500);
    } catch {
    }
  };
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": "empty-state-action-code",
      className: i(
        "relative flex items-start gap-2 rounded-md",
        "bg-surface-inverse text-text-inverse text-[12px] font-mono leading-snug",
        "px-3 py-2"
      ),
      children: [
        /* @__PURE__ */ t("pre", { className: "flex-1 overflow-x-auto whitespace-pre-wrap break-all m-0", children: e }),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: s,
            "aria-label": r ? "Copied to clipboard" : "Copy code to clipboard",
            "data-testid": "empty-state-action-code-copy",
            className: i(
              "shrink-0 self-start text-[11px] font-semibold px-2 py-1 rounded",
              "border border-border-emphasis hover:bg-surface-inverse cursor-pointer",
              r ? "text-success-fg border-success/50" : "text-text-inverse"
            ),
            children: r ? "Copied" : "Copy"
          }
        )
      ]
    }
  );
}
export {
  N as E
};
