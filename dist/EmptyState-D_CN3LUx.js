import { jsxs as o, jsx as t } from "react/jsx-runtime";
import { useState as f } from "react";
import { c as n } from "./cn-B6yFEsav.js";
function N({
  icon: e,
  title: r,
  body: a,
  description: l,
  actionLabel: s,
  onAction: d,
  action: c,
  actions: i,
  testId: m = "empty-state",
  actionTestId: x = "empty-state-action"
}) {
  const p = l ?? a;
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": m,
      className: n(
        "flex flex-col items-center justify-center min-h-[220px]",
        "text-slate-400 gap-2 p-8 font-[inherit]"
      ),
      children: [
        e && (typeof e == "string" ? /* @__PURE__ */ t("div", { className: "text-[52px] mb-2", children: e }) : /* @__PURE__ */ t("div", { className: "mb-2", children: e })),
        /* @__PURE__ */ t("div", { className: "text-[17px] font-semibold text-slate-500", children: r }),
        p && /* @__PURE__ */ t("div", { className: "text-[13px] text-center max-w-[340px] text-slate-400 leading-normal", children: p }),
        i && i.length > 0 ? /* @__PURE__ */ t(b, { actions: i }) : c ? /* @__PURE__ */ t("div", { className: "mt-2.5", children: c }) : s && d && /* @__PURE__ */ t(
          "button",
          {
            "data-testid": x,
            onClick: d,
            className: n(
              "mt-2.5 px-[22px] py-[9px] text-sm font-semibold",
              "bg-primary text-white border-none rounded-lg cursor-pointer font-[inherit]"
            ),
            children: s
          }
        )
      ]
    }
  );
}
function b({ actions: e }) {
  return /* @__PURE__ */ t(
    "ul",
    {
      "data-testid": "empty-state-actions",
      className: "mt-3 flex flex-col gap-3 w-full max-w-[420px]",
      children: e.map((r, a) => /* @__PURE__ */ o("li", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ t(
          u,
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
function u({
  action: e,
  defaultVariant: r
}) {
  const a = e.variant ?? r, l = n(
    "inline-flex items-center justify-center self-stretch",
    "px-[18px] py-[8px] text-sm font-semibold rounded-lg cursor-pointer",
    "transition-colors font-[inherit]",
    a === "primary" ? "bg-primary text-white border border-transparent hover:bg-primary/90" : "bg-transparent text-slate-700 border border-slate-300 hover:bg-slate-50"
  );
  if (e.href) {
    const s = e.external === !0;
    return /* @__PURE__ */ o(
      "a",
      {
        "data-testid": "empty-state-actions-link",
        href: e.href,
        onClick: e.onClick,
        className: l,
        ...s ? {
          target: "_blank",
          rel: "noopener noreferrer"
        } : null,
        children: [
          e.label,
          s && /* @__PURE__ */ t("span", { className: "sr-only", children: " (opens in new tab)" })
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
      className: l,
      children: e.label
    }
  );
}
function h({ code: e }) {
  const [r, a] = f(!1), l = async () => {
    try {
      await navigator.clipboard.writeText(e), a(!0), setTimeout(() => a(!1), 1500);
    } catch {
    }
  };
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": "empty-state-action-code",
      className: n(
        "relative flex items-start gap-2 rounded-md",
        "bg-slate-900 text-slate-100 text-[12px] font-mono leading-snug",
        "px-3 py-2"
      ),
      children: [
        /* @__PURE__ */ t("pre", { className: "flex-1 overflow-x-auto whitespace-pre-wrap break-all m-0", children: e }),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: l,
            "aria-label": r ? "Copied to clipboard" : "Copy code to clipboard",
            "data-testid": "empty-state-action-code-copy",
            className: n(
              "shrink-0 self-start text-[11px] font-semibold px-2 py-1 rounded",
              "border border-slate-600 hover:bg-slate-700 cursor-pointer",
              r ? "text-emerald-300 border-emerald-400/50" : "text-slate-100"
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
