import { jsxs as i, jsx as t, Fragment as D } from "react/jsx-runtime";
import { useState as E, useCallback as T, createContext as se, useMemo as R, useEffect as L, useContext as ie, useId as ee, useRef as M, useLayoutEffect as ce } from "react";
import { c as d } from "./cn-B6yFEsav.js";
import { _ as j } from "./index-DvoJowRO.js";
import { M as de } from "./Modal-2jg4229_.js";
import { T as ue, b as pe, e as q, a as xe, c as K, d as P } from "./PageSection-Dj8r4YIt.js";
import { S as fe, C as me } from "./CardHeader-DuyI9Sk3.js";
import { A as G, a as be } from "./Avatar-BvKIaNVE.js";
import { S as te } from "./StatusDot-BC7B1tTr.js";
import { createPortal as re } from "react-dom";
import { C as he } from "./Card-B2uO9v1w.js";
import { C as ve } from "./Chip-BXdhqVFm.js";
import { A as ge } from "./Badge-tH4NRy5U.js";
import "clsx";
import "tailwind-merge";
const ye = [
  "import",
  "export",
  "from",
  "as",
  "const",
  "let",
  "var",
  "function",
  "return",
  "default",
  "if",
  "else",
  "switch",
  "case",
  "break",
  "new",
  "typeof",
  "instanceof",
  "in",
  "of",
  "interface",
  "type",
  "extends",
  "implements",
  "class",
  "async",
  "await",
  "true",
  "false",
  "null",
  "undefined",
  "this",
  "super",
  "try",
  "catch",
  "finally",
  "throw",
  "for",
  "while",
  "do",
  "continue",
  "public",
  "private",
  "protected",
  "readonly",
  "static",
  "enum"
], we = [
  "if",
  "then",
  "else",
  "fi",
  "for",
  "do",
  "done",
  "while",
  "case",
  "esac",
  "function",
  "return",
  "export",
  "local",
  "in"
], Ne = [
  "cd",
  "ls",
  "echo",
  "cat",
  "grep",
  "sed",
  "awk",
  "find",
  "cp",
  "mv",
  "rm",
  "mkdir",
  "rmdir",
  "touch",
  "chmod",
  "chown",
  "pwd",
  "which",
  "npm",
  "yarn",
  "pnpm",
  "npx",
  "git",
  "node",
  "curl",
  "wget"
];
function ke(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Ce(e, r) {
  let a = e.replace(/(\/\/.*?)(\n|$)/g, `<span style="color:${r.comment}">$1</span>$2`);
  a = a.replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:${r.comment}">$1</span>`), a = a.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    `<span style="color:${r.string}">$1</span>`
  );
  const o = new RegExp(`\\b(${ye.join("|")})\\b`, "g");
  return a = a.replace(o, `<span style="color:${r.keyword}">$1</span>`), a = a.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span style="color:${r.number}">$1</span>`), a;
}
function Se(e, r) {
  let a = e.replace(
    /("(?:[^"\\]|\\.)*")(\s*:)/g,
    `<span style="color:${r.property}">$1</span>$2`
  );
  return a = a.replace(/("(?:[^"\\]|\\.)*")/g, `<span style="color:${r.string}">$1</span>`), a = a.replace(/\b(true|false|null)\b/g, `<span style="color:${r.keyword}">$1</span>`), a = a.replace(/\b(-?\d+(?:\.\d+)?)\b/g, `<span style="color:${r.number}">$1</span>`), a;
}
function $e(e, r) {
  let a = e.replace(/(#.*?)(\n|$)/g, `<span style="color:${r.comment}">$1</span>$2`);
  a = a.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, `<span style="color:${r.string}">$1</span>`);
  const o = new RegExp(`\\b(${we.join("|")})\\b`, "g");
  a = a.replace(o, `<span style="color:${r.keyword}">$1</span>`);
  const n = new RegExp(`\\b(${Ne.join("|")})\\b`, "g");
  return a = a.replace(n, `<span style="color:${r.builtin}">$1</span>`), a = a.replace(/(\$\w+|\$\{[^}]+\})/g, `<span style="color:${r.variable}">$1</span>`), a;
}
const Ee = {
  comment: "#6b7280",
  string: "#4ade80",
  keyword: "#93c5fd",
  number: "#fbbf24",
  property: "#7dd3fc",
  builtin: "#c4b5fd",
  variable: "#fbbf24"
}, Le = {
  comment: "#64748b",
  string: "#15803d",
  keyword: "#1d4ed8",
  number: "#a16207",
  property: "#0369a1",
  builtin: "#7c3aed",
  variable: "#a16207"
};
function Y(e, r, a) {
  const o = a === "dark" ? Ee : Le, n = ke(e);
  switch (r) {
    case "json":
      return Se(n, o);
    case "bash":
    case "sh":
      return $e(n, o);
    case "text":
      return n;
    default:
      return Ce(n, o);
  }
}
function jt({
  code: e,
  language: r = "tsx",
  theme: a = "dark",
  copyButton: o = !0,
  showLineNumbers: n = !1,
  className: l,
  style: s,
  "data-testid": c,
  ariaLabel: u
}) {
  const [f, m] = E(!1), y = T(() => {
    typeof navigator > "u" || !navigator.clipboard || navigator.clipboard.writeText(e).then(() => {
      m(!0), setTimeout(() => m(!1), 1500);
    }).catch(() => {
    });
  }, [e]), x = a === "dark", b = e.split(`
`);
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": c,
      "data-language": r,
      "data-theme": a,
      className: d(
        "relative rounded-lg border font-mono text-[13px] leading-relaxed overflow-hidden",
        x ? "bg-slate-800 text-slate-100 border-slate-700" : "bg-slate-50 text-slate-900 border-slate-200",
        l
      ),
      style: s,
      "aria-label": u ?? `Code (${r})`,
      children: [
        o && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: y,
            "aria-label": f ? "Copied" : "Copy code",
            className: d(
              "absolute top-2 right-2 text-[11px] px-2 py-1 rounded border transition-opacity",
              x ? "bg-slate-700 text-slate-100 border-slate-600 hover:bg-slate-600" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            ),
            "data-copied": f ? "true" : "false",
            children: f ? "Copied" : "Copy"
          }
        ),
        /* @__PURE__ */ t("pre", { className: "m-0 px-4 py-3 overflow-x-auto", children: n ? /* @__PURE__ */ i("div", { className: "flex", children: [
          /* @__PURE__ */ t(
            "div",
            {
              className: d(
                "select-none pr-3 text-right",
                x ? "text-slate-500" : "text-slate-400"
              ),
              "aria-hidden": "true",
              children: b.map((h, p) => /* @__PURE__ */ t("div", { children: p + 1 }, p))
            }
          ),
          /* @__PURE__ */ t(
            "code",
            {
              className: "flex-1 block",
              dangerouslySetInnerHTML: { __html: Y(e, r, a) }
            }
          )
        ] }) : /* @__PURE__ */ t(
          "code",
          {
            className: "block",
            dangerouslySetInnerHTML: { __html: Y(e, r, a) }
          }
        ) })
      ]
    }
  );
}
const ae = se(null);
function z() {
  const e = ie(ae);
  if (!e)
    throw new Error(
      "useCommandPalette must be used inside a <CommandPaletteProvider>."
    );
  return e;
}
function Dt() {
  const { open: e, close: r, toggle: a, isOpen: o, query: n } = z();
  return { open: e, close: r, toggle: a, isOpen: o, query: n };
}
function Mt({
  commands: e,
  getDynamicCommands: r,
  children: a
}) {
  const [o, n] = E(!1), [l, s] = E(""), c = T(() => n(!0), []), u = T(() => {
    n(!1), s("");
  }, []), f = T(() => n((x) => !x), []);
  L(() => {
    const x = (b) => {
      (b.metaKey || b.ctrlKey) && b.key.toLowerCase() === "k" && (b.preventDefault(), n((h) => !h));
    };
    return window.addEventListener("keydown", x, !0), () => window.removeEventListener("keydown", x, !0);
  }, []);
  const m = R(() => {
    const x = r ? r(l) : [];
    return [...e, ...x].filter((h) => h.when ? h.when() : !0);
  }, [e, r, l]), y = {
    open: c,
    close: u,
    toggle: f,
    isOpen: o,
    query: l,
    setQuery: s,
    mergedCommands: m
  };
  return /* @__PURE__ */ t(ae.Provider, { value: y, children: a });
}
function Te(e) {
  const r = /* @__PURE__ */ new Map();
  for (const a of e) {
    const o = a.group ?? null, n = r.get(o);
    n ? n.push(a) : r.set(o, [a]);
  }
  return Array.from(r.entries()).map(([a, o]) => ({
    groupName: a,
    items: o
  }));
}
function Bt({
  placeholder: e = "Type a command or search…",
  emptyState: r,
  className: a
} = {}) {
  const { isOpen: o, close: n, query: l, setQuery: s, mergedCommands: c } = z(), u = R(() => Te(c), [c]), f = T(
    (m) => {
      n(), Promise.resolve().then(() => m.run());
    },
    [n]
  );
  return /* @__PURE__ */ t(
    de,
    {
      open: o,
      onClose: n,
      maxWidth: 640,
      rawChildren: !0,
      backdropTestId: "command-palette-backdrop",
      children: /* @__PURE__ */ i(
        j,
        {
          label: "Command palette",
          value: void 0,
          className: d("flex flex-col gap-0 w-full", a),
          "data-testid": "command-palette",
          children: [
            /* @__PURE__ */ t(
              j.Input,
              {
                value: l,
                onValueChange: s,
                placeholder: e,
                "data-autofocus": !0,
                className: d(
                  "w-full px-3 py-2.5 text-sm border-0 border-b border-border",
                  "outline-none bg-transparent text-text-primary placeholder:text-text-tertiary"
                ),
                "data-testid": "command-palette-input"
              }
            ),
            /* @__PURE__ */ i(j.List, { className: "max-h-[360px] overflow-y-auto py-2", children: [
              /* @__PURE__ */ t(j.Empty, { className: "px-3 py-6 text-center text-sm text-text-tertiary", children: r ?? "No results." }),
              u.map(({ groupName: m, items: y }) => /* @__PURE__ */ t(
                j.Group,
                {
                  heading: m ?? void 0,
                  children: y.map((x) => /* @__PURE__ */ i(
                    j.Item,
                    {
                      value: `${x.id} ${x.label} ${(x.keywords ?? []).join(" ")}`,
                      keywords: x.keywords,
                      onSelect: () => f(x),
                      "data-testid": `command-palette-item-${x.id}`,
                      className: d(
                        "flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm",
                        "text-text-primary aria-selected:bg-surface-hover"
                      ),
                      children: [
                        x.icon && /* @__PURE__ */ t("span", { className: "shrink-0 text-text-secondary", children: x.icon }),
                        /* @__PURE__ */ t("span", { className: "flex-1 truncate", children: x.label }),
                        x.hint && /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary truncate", children: x.hint }),
                        x.shortcut && x.shortcut.length > 0 && /* @__PURE__ */ t("span", { className: "flex items-center gap-1 shrink-0", children: x.shortcut.map((b, h) => /* @__PURE__ */ t(
                          "kbd",
                          {
                            className: d(
                              "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1",
                              "text-[10px] font-mono font-medium",
                              "bg-surface-hover text-text-secondary",
                              "border border-border rounded"
                            ),
                            children: b
                          },
                          `${x.id}-kbd-${h}`
                        )) })
                      ]
                    },
                    x.id
                  ))
                },
                m ?? "__ungrouped__"
              ))
            ] })
          ]
        }
      )
    }
  );
}
function Pt({ className: e } = {}) {
  const { toggle: r } = z();
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      onClick: r,
      "data-testid": "command-palette-hint",
      className: d(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-md",
        "text-xs text-text-secondary bg-surface-hover",
        "border border-border hover:bg-surface-panel",
        "cursor-pointer transition-colors",
        e
      ),
      "aria-label": "Open command palette",
      children: [
        /* @__PURE__ */ t("kbd", { className: "font-mono text-[11px]", children: "⌘K" }),
        /* @__PURE__ */ t("span", { children: "Search" })
      ]
    }
  );
}
function W(e) {
  if (e === "right") return "text-right";
  if (e === "center") return "text-center";
}
function It({
  data: e,
  columns: r,
  keyField: a,
  onRowClick: o,
  rowActions: n,
  searchable: l = !1,
  searchPlaceholder: s = "Search…",
  pageSize: c,
  emptyMessage: u = "No records.",
  loading: f = !1,
  loadingRows: m = 5,
  className: y,
  "data-testid": x
}) {
  const [b, h] = E(null), [p, w] = E("asc"), [N, C] = E(""), [g, k] = E(0), I = (v) => {
    b === v ? w(($) => $ === "asc" ? "desc" : "asc") : (h(v), w("asc"));
  }, _ = R(() => {
    if (!l || N.trim() === "") return e;
    const v = N.trim().toLowerCase();
    return e.filter(
      ($) => r.some((S) => S.filterable === !1 ? !1 : (S.getFilterText ? S.getFilterText($) : String($[S.key] ?? "")).toLowerCase().includes(v))
    );
  }, [e, r, N, l]), A = R(() => {
    if (!b) return _;
    const v = r.find((O) => O.key === b);
    if (!v || !v.sortable) return _;
    const $ = v.compare ?? ((O, H) => {
      const oe = String(O[v.key] ?? ""), le = String(H[v.key] ?? "");
      return oe.localeCompare(le);
    }), S = [..._];
    return S.sort((O, H) => p === "asc" ? $(O, H) : -$(O, H)), S;
  }, [_, r, b, p]), F = c && c > 0 ? Math.max(1, Math.ceil(A.length / c)) : 1, B = Math.min(g, F - 1), V = R(() => {
    if (!c || c <= 0) return A;
    const v = B * c;
    return A.slice(v, v + c);
  }, [A, c, B]);
  return /* @__PURE__ */ i("div", { className: d("flex flex-col gap-3", y), "data-testid": x, children: [
    l && /* @__PURE__ */ t(
      "input",
      {
        type: "text",
        value: N,
        onChange: (v) => {
          C(v.target.value), k(0);
        },
        placeholder: s,
        "aria-label": "Search",
        "data-testid": "datatable-search",
        className: "w-full max-w-xs rounded-md border border-border-field bg-surface px-3 py-1.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none"
      }
    ),
    /* @__PURE__ */ i(ue, { className: "border border-border rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ t(pe, { children: /* @__PURE__ */ i("tr", { children: [
        r.map((v) => {
          const $ = v.sortable && b === v.key;
          return /* @__PURE__ */ t(
            q,
            {
              sortable: v.sortable,
              sortDirection: $ ? p : null,
              style: v.width ? { width: v.width } : void 0,
              className: d(W(v.align), v.className),
              onClick: v.sortable ? () => I(v.key) : void 0,
              "data-testid": v.sortable ? `datatable-header-${v.key}` : void 0,
              children: v.header
            },
            v.key
          );
        }),
        n && /* @__PURE__ */ t(q, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ t(xe, { children: f ? Array.from({ length: m }).map((v, $) => /* @__PURE__ */ i(K, { "data-testid": "datatable-loading-row", children: [
        r.map((S) => /* @__PURE__ */ t(P, { className: W(S.align), children: /* @__PURE__ */ t("div", { className: "h-4 w-3/4 animate-pulse rounded bg-slate-100" }) }, S.key)),
        n && /* @__PURE__ */ t(P, { className: "text-right", children: /* @__PURE__ */ t("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-slate-100" }) })
      ] }, `skeleton-${$}`)) : V.length === 0 ? /* @__PURE__ */ t(K, { children: /* @__PURE__ */ t(
        P,
        {
          colSpan: r.length + (n ? 1 : 0),
          className: "text-center text-text-secondary py-8",
          children: u
        }
      ) }) : V.map((v, $) => /* @__PURE__ */ i(
        K,
        {
          clickable: !!o,
          onClick: o ? () => o(v) : void 0,
          children: [
            r.map((S) => /* @__PURE__ */ t(
              P,
              {
                className: d(W(S.align), S.className),
                children: S.render ? S.render(v, $) : String(v[S.key] ?? "")
              },
              S.key
            )),
            n && /* @__PURE__ */ t(P, { className: "text-right", onClick: (S) => S.stopPropagation(), children: /* @__PURE__ */ t("div", { className: "flex items-center justify-end gap-2", children: n(v) }) })
          ]
        },
        a(v)
      )) })
    ] }),
    c && c > 0 && A.length > c && /* @__PURE__ */ i("div", { className: "flex items-center justify-between text-xs text-text-secondary", children: [
      /* @__PURE__ */ i("span", { "data-testid": "datatable-page-summary", children: [
        "Page ",
        B + 1,
        " of ",
        F,
        " · ",
        A.length,
        " total"
      ] }),
      /* @__PURE__ */ i("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => k((v) => Math.max(0, v - 1)),
            disabled: B === 0,
            "data-testid": "datatable-prev",
            className: "rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50",
            children: "Prev"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => k((v) => Math.min(F - 1, v + 1)),
            disabled: B >= F - 1,
            "data-testid": "datatable-next",
            className: "rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50",
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function Ft({
  icon: e = "⚠️",
  title: r,
  body: a,
  description: o,
  actionLabel: n,
  onAction: l,
  action: s,
  testId: c = "error-state",
  actionTestId: u = "error-state-action"
}) {
  const f = o ?? a;
  return /* @__PURE__ */ i(
    "div",
    {
      role: "alert",
      "data-testid": c,
      className: d(
        "flex flex-col items-center justify-center min-h-[220px]",
        "text-text-secondary gap-2 p-8 font-[inherit]"
      ),
      children: [
        e && (typeof e == "string" ? /* @__PURE__ */ t("div", { className: "text-[52px] mb-2", "aria-hidden": !0, children: e }) : /* @__PURE__ */ t("div", { className: "mb-2", children: e })),
        /* @__PURE__ */ t("div", { className: "text-[17px] font-semibold text-[var(--color-state-error,#dc2626)]", children: r }),
        f && /* @__PURE__ */ t("div", { className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal", children: f }),
        s ? /* @__PURE__ */ t("div", { className: "mt-2.5", children: s }) : n && l && /* @__PURE__ */ t(
          "button",
          {
            "data-testid": u,
            onClick: l,
            type: "button",
            className: d(
              "mt-2.5 px-[22px] py-[9px] text-sm font-semibold",
              "bg-surface text-text-primary border border-border rounded-lg cursor-pointer font-[inherit]",
              "hover:bg-slate-50"
            ),
            children: n
          }
        )
      ]
    }
  );
}
const Ae = {
  sm: "w-[14px] h-[14px]",
  md: "w-[20px] h-[20px]",
  lg: "w-[28px] h-[28px]"
};
function _e({
  size: e = "md",
  color: r,
  className: a,
  style: o,
  "aria-label": n = "Loading",
  "data-testid": l
}) {
  const s = r ?? "var(--color-primary)";
  return /* @__PURE__ */ t(
    "div",
    {
      role: "status",
      "aria-label": n,
      "data-testid": l,
      className: d(
        "inline-block rounded-full border-2 border-transparent animate-spin",
        Ae[e],
        a
      ),
      style: { borderTopColor: s, ...o }
    }
  );
}
function Ht({
  label: e = "Loading…",
  description: r,
  spinnerSize: a = "lg",
  spinnerColor: o,
  testId: n = "loading-state"
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      "data-testid": n,
      className: d(
        "flex flex-col items-center justify-center min-h-[220px]",
        "text-text-secondary gap-3 p-8 font-[inherit]"
      ),
      children: [
        /* @__PURE__ */ t(_e, { size: a, color: o, "aria-label": e }),
        /* @__PURE__ */ t("div", { className: "text-[15px] font-medium text-text-primary", children: e }),
        r && /* @__PURE__ */ t("div", { className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal", children: r })
      ]
    }
  );
}
function Ut({
  label: e,
  hint: r,
  error: a,
  required: o = !1,
  layout: n = "stacked",
  children: l,
  className: s,
  style: c,
  "data-testid": u
}) {
  const f = ee(), m = `${f}-label`, y = r || a ? `${f}-desc` : void 0, x = {
    id: f,
    labelId: m,
    "aria-describedby": y,
    "aria-invalid": a ? !0 : void 0
  };
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": u,
      className: d(
        n === "inline" ? "flex items-center gap-3" : "flex flex-col gap-1",
        s
      ),
      style: c,
      children: [
        /* @__PURE__ */ i(
          "label",
          {
            id: m,
            htmlFor: f,
            className: d(
              "text-[12px] font-medium",
              n === "inline" ? "min-w-[140px]" : "",
              a ? "text-[#991b1b]" : "text-gray-700"
            ),
            children: [
              e,
              o && /* @__PURE__ */ t("span", { className: "ml-0.5 text-[#991b1b]", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ i("div", { className: d(n === "inline" ? "flex-1" : ""), children: [
          l(x),
          (r || a) && /* @__PURE__ */ t(
            "div",
            {
              id: y,
              className: d(
                "mt-1 text-[11px]",
                a ? "text-[#991b1b]" : "text-gray-500"
              ),
              children: a ?? r
            }
          )
        ] })
      ]
    }
  );
}
const Oe = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm"
};
function Re(e) {
  switch (e) {
    case "underline":
      return "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
    case "pill":
      return "inline-flex items-center gap-1";
    case "segmented":
      return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5";
  }
}
function je(e, r, a) {
  return e === "underline" ? d(
    "-mb-px border-b-2 rounded-none",
    r ? "border-[var(--color-primary)] text-[var(--color-text-primary)]" : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
    a && "opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]"
  ) : e === "pill" ? d(
    "rounded-full",
    r ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]",
    a && "opacity-50 cursor-not-allowed hover:bg-transparent"
  ) : d(
    "rounded-md",
    r ? "bg-white shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]",
    a && "opacity-50 cursor-not-allowed hover:bg-transparent"
  );
}
function Kt({
  items: e,
  value: r,
  onValueChange: a,
  variant: o = "underline",
  size: n = "md",
  className: l,
  style: s,
  "aria-label": c,
  idPrefix: u
}) {
  const f = ee(), m = u ?? f, y = M(/* @__PURE__ */ new Map()), x = R(() => e.filter((p) => !p.disabled).map((p) => p.id), [e]), b = T((p) => {
    y.current.get(p)?.focus();
  }, []), h = T(
    (p, w) => {
      if (x.length === 0) return;
      const N = x.indexOf(w);
      let C = null;
      switch (p.key) {
        case "ArrowRight":
        case "ArrowDown":
          C = N === -1 ? 0 : (N + 1) % x.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          C = N === -1 ? x.length - 1 : (N - 1 + x.length) % x.length;
          break;
        case "Home":
          C = 0;
          break;
        case "End":
          C = x.length - 1;
          break;
        case "Enter":
        case " ":
          p.preventDefault(), a(w);
          return;
        default:
          return;
      }
      if (C !== null) {
        p.preventDefault();
        const g = x[C];
        a(g), b(g);
      }
    },
    [x, a, b]
  );
  return /* @__PURE__ */ t(
    "div",
    {
      role: "tablist",
      "aria-label": c,
      className: d(Re(o), l),
      style: s,
      children: e.map((p) => {
        const w = p.id === r;
        return /* @__PURE__ */ i(
          "button",
          {
            ref: (N) => {
              N ? y.current.set(p.id, N) : y.current.delete(p.id);
            },
            type: "button",
            role: "tab",
            id: `${m}-tab-${p.id}`,
            "aria-controls": `${m}-panel-${p.id}`,
            "aria-selected": w,
            "aria-disabled": p.disabled || void 0,
            tabIndex: w ? 0 : -1,
            disabled: p.disabled,
            onClick: () => !p.disabled && a(p.id),
            onKeyDown: (N) => h(N, p.id),
            className: d(
              "inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer",
              Oe[n],
              je(o, w, !!p.disabled)
            ),
            children: [
              p.icon,
              /* @__PURE__ */ t("span", { children: p.label }),
              p.badge !== void 0 && p.badge !== null && /* @__PURE__ */ t(
                "span",
                {
                  className: d(
                    "ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold",
                    w && o === "pill" ? "bg-white/20 text-white" : "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"
                  ),
                  children: p.badge
                }
              )
            ]
          },
          p.id
        );
      })
    }
  );
}
function Wt({ id: e, when: r, idPrefix: a, className: o, style: n, children: l }) {
  return e !== r ? null : /* @__PURE__ */ t(
    "div",
    {
      role: "tabpanel",
      id: a ? `${a}-panel-${e}` : void 0,
      "aria-labelledby": a ? `${a}-tab-${e}` : void 0,
      tabIndex: 0,
      className: o,
      style: n,
      children: l
    }
  );
}
const De = {
  positive: "text-[var(--color-success)]",
  negative: "text-[var(--color-danger)]",
  neutral: "text-[var(--color-text-secondary)]"
};
function Me(e) {
  return e.tone ?? (e.direction === "up" ? "positive" : "negative");
}
function Gt({
  label: e,
  value: r,
  accent: a = !1,
  danger: o = !1,
  hint: n,
  delta: l,
  sparklineData: s,
  to: c,
  as: u,
  onClick: f,
  mono: m = !1,
  className: y,
  style: x,
  "data-testid": b
}) {
  const h = d(
    "block rounded-lg border p-3 no-underline transition-colors",
    !a && !o && "bg-[var(--color-surface)] border-[var(--color-border)]",
    a && "bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]",
    o && "bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]",
    (c || f) && "hover:bg-[var(--color-surface-hover)] cursor-pointer",
    y
  ), p = s && s.length > 0 ? s : null;
  let w = null;
  if (l) {
    const C = Me(l), g = l.direction === "up" ? "▲" : "▼", k = l.direction === "up" ? "+" : "-", I = l.suffix ?? "%", _ = Math.abs(l.value), A = l["aria-label"] ?? `${l.direction} ${_}${I}`;
    w = /* @__PURE__ */ i(
      "div",
      {
        "data-testid": "stat-card-delta",
        "data-direction": l.direction,
        "data-tone": C,
        "aria-label": A,
        className: d("mt-1 text-[12px] font-medium leading-tight", De[C]),
        children: [
          /* @__PURE__ */ i("span", { "aria-hidden": "true", children: [
            g,
            " "
          ] }),
          k,
          _,
          I
        ]
      }
    );
  }
  const N = /* @__PURE__ */ i(D, { children: [
    /* @__PURE__ */ t("div", { className: "text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]", children: e }),
    /* @__PURE__ */ i("div", { className: "mt-1 flex items-center gap-2", children: [
      /* @__PURE__ */ t(
        "div",
        {
          className: d(
            "text-[24px] font-bold leading-tight text-[var(--color-text-primary)]",
            m && "font-mono"
          ),
          children: r
        }
      ),
      p && /* @__PURE__ */ t(fe, { data: p, width: 80, height: 20 })
    ] }),
    w,
    n != null && /* @__PURE__ */ t("div", { className: "mt-1 text-[11px] italic text-[var(--color-text-tertiary)]", children: n })
  ] });
  return c ? u ? /* @__PURE__ */ t(u, { to: c, "data-testid": b, className: h, style: x, children: N }) : /* @__PURE__ */ t("a", { href: c, "data-testid": b, className: h, style: x, children: N }) : f ? /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      onClick: f,
      "data-testid": b,
      className: d(h, "w-full text-left"),
      style: x,
      children: N
    }
  ) : /* @__PURE__ */ t("div", { "data-testid": b, className: h, style: x, children: N });
}
const Be = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4"
};
function zt({
  children: e,
  columns: r = 4,
  dense: a = !1,
  className: o,
  style: n,
  "data-testid": l = "kpi-grid"
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-testid": l,
      className: d(
        "grid grid-cols-1",
        Be[r],
        a ? "gap-2" : "gap-4",
        o
      ),
      style: n,
      children: e
    }
  );
}
const Pe = {
  sm: "h-1.5",
  md: "h-2"
};
function Vt({
  value: e,
  max: r = 100,
  color: a,
  size: o = "md",
  label: n,
  showRatio: l = !0,
  className: s,
  style: c,
  "data-testid": u,
  "aria-label": f
}) {
  const m = r > 0 ? r : 100, y = Math.max(0, Math.min(e, m)), x = Math.min(100, y / m * 100), b = a ?? "var(--color-primary)";
  return /* @__PURE__ */ i("div", { "data-testid": u, className: d("w-full", s), style: c, children: [
    n != null && /* @__PURE__ */ i("div", { className: "flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]", children: [
      /* @__PURE__ */ t("span", { children: n }),
      /* @__PURE__ */ t("span", { className: "text-[var(--color-text-tertiary)] tabular-nums", children: l ? `${y}/${m}` : `${Math.round(x)}%` })
    ] }),
    /* @__PURE__ */ t(
      "div",
      {
        role: "progressbar",
        "aria-valuenow": y,
        "aria-valuemin": 0,
        "aria-valuemax": m,
        "aria-label": f,
        className: d(
          "w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]",
          Pe[o]
        ),
        children: /* @__PURE__ */ t(
          "div",
          {
            className: "h-full rounded-full transition-all duration-300",
            style: { width: `${x}%`, background: b }
          }
        )
      }
    )
  ] });
}
const Ie = {
  online: "var(--color-success, #22c55e)",
  away: "var(--color-state-pending, #f59e0b)",
  busy: "var(--color-state-error, #ef4444)",
  offline: "var(--color-text-tertiary, #94a3b8)",
  unknown: "var(--color-text-tertiary, #94a3b8)"
}, Fe = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
  unknown: "Unknown presence"
};
function He({
  state: e,
  ariaLabel: r,
  label: a,
  pulse: o,
  size: n = "sm",
  className: l,
  style: s,
  title: c,
  "data-testid": u
}) {
  const f = o ?? e === "online", m = r ?? Fe[e];
  return /* @__PURE__ */ t(
    te,
    {
      color: Ie[e],
      pulse: f,
      size: n,
      label: a,
      className: l,
      style: s,
      title: c,
      "data-testid": u ?? `presence-${e}`,
      "aria-label": m
    }
  );
}
function qt({
  name: e,
  label: r,
  avatarSize: a = 20,
  avatarColor: o,
  presence: n,
  onClick: l,
  className: s,
  style: c,
  title: u,
  "data-testid": f = "user-chip"
}) {
  return /* @__PURE__ */ i(
    l ? "button" : "span",
    {
      type: l ? "button" : void 0,
      onClick: l,
      title: u ?? e,
      "data-testid": f,
      className: d(
        "inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-[12px] text-text-primary",
        l && "hover:bg-slate-100 cursor-pointer transition-colors",
        !l && "cursor-default",
        s
      ),
      style: c,
      children: [
        /* @__PURE__ */ t(G, { name: e, size: a, color: o }),
        /* @__PURE__ */ t("span", { className: "font-medium leading-none", children: r ?? e }),
        n && /* @__PURE__ */ t(He, { state: n, size: "xs" })
      ]
    }
  );
}
const Ue = {
  sm: "px-2.5 py-0.5 text-[11px]",
  xs: "px-2 py-px text-[10px]"
}, Ke = "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis)]", We = "bg-[var(--color-primary)] border-[var(--color-primary)] text-white hover:opacity-90", Ge = "border-[var(--color-border-emphasis)] text-[var(--color-text-primary)]";
function Yt({
  active: e,
  onClick: r,
  color: a,
  dot: o = !1,
  size: n = "sm",
  children: l,
  className: s,
  disabled: c = !1
}) {
  const u = e && !!a, f = u ? { background: `${a}22`, borderColor: `${a}66`, color: a } : void 0;
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      onClick: r,
      disabled: c,
      "aria-pressed": e,
      className: d(
        "inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors cursor-pointer select-none",
        Ue[n],
        e ? u ? Ge : We : Ke,
        c && "opacity-50 cursor-not-allowed",
        s
      ),
      style: f,
      children: [
        o && /* @__PURE__ */ t(
          "span",
          {
            className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
            style: { background: a || "currentColor" }
          }
        ),
        l
      ]
    }
  );
}
const ze = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm"
}, Ve = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", qe = "bg-white shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]";
function Qt({
  options: e,
  value: r,
  onChange: a,
  size: o = "md",
  className: n
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      role: "group",
      className: d(
        "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5",
        n
      ),
      children: e.map((l) => {
        const s = l.value === r;
        return /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: () => a(l.value),
            "aria-pressed": s,
            className: d(
              "inline-flex items-center gap-1.5 rounded-md font-medium transition-all cursor-pointer",
              ze[o],
              s ? qe : Ve
            ),
            children: [
              l.icon,
              l.label
            ]
          },
          l.value
        );
      })
    }
  );
}
function Jt({
  label: e,
  id: r,
  href: a,
  mono: o = !1,
  className: n,
  labelClassName: l
}) {
  const s = /* @__PURE__ */ t("span", { className: "truncate", children: e });
  return /* @__PURE__ */ i("div", { className: d("flex flex-col min-w-0", n), children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: d(
          "font-medium text-[var(--color-text-primary)] truncate text-sm",
          l
        ),
        children: a ? /* @__PURE__ */ t(
          "a",
          {
            href: a,
            className: "hover:text-[var(--color-primary)] hover:underline",
            children: s
          }
        ) : s
      }
    ),
    r && /* @__PURE__ */ t(
      "div",
      {
        className: d(
          "text-[10px] font-mono text-[var(--color-text-tertiary)] truncate mt-0.5",
          o && "tracking-tight"
        ),
        children: r
      }
    )
  ] });
}
const Ye = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function Zt({
  open: e,
  onClose: r,
  title: a,
  subtitle: o,
  width: n = 460,
  children: l,
  footer: s,
  "data-testid": c
}) {
  const u = M(null);
  return L(() => {
    if (!e) return;
    const f = (m) => {
      m.key === "Escape" && r();
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [e, r]), L(() => {
    if (!e) return;
    const f = u.current;
    if (!f) return;
    const m = f.querySelector(Ye);
    m ? m.focus() : (f.setAttribute("tabindex", "-1"), f.focus());
  }, [e]), e ? re(
    /* @__PURE__ */ i("div", { className: "fixed inset-0 z-[9000]", "data-testid": c, children: [
      /* @__PURE__ */ t(
        "div",
        {
          className: "absolute inset-0 bg-black/30 backdrop-blur-[1px]",
          onClick: r,
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ i(
        "aside",
        {
          ref: u,
          role: "dialog",
          "aria-modal": "true",
          "aria-label": a,
          className: d(
            "absolute right-0 top-0 h-full bg-white shadow-xl flex flex-col",
            "transition-transform duration-200",
            e ? "translate-x-0" : "translate-x-full"
          ),
          style: { width: n },
          children: [
            /* @__PURE__ */ i("div", { className: "flex items-start justify-between p-5 border-b border-[var(--color-border)] flex-shrink-0", children: [
              /* @__PURE__ */ i("div", { className: "min-w-0", children: [
                a && /* @__PURE__ */ t("h2", { className: "text-base font-semibold text-[var(--color-text-primary)]", children: a }),
                o && /* @__PURE__ */ t("p", { className: "text-sm text-[var(--color-text-secondary)] mt-0.5", children: o })
              ] }),
              /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: r,
                  className: "ml-4 flex-shrink-0 p-1 rounded hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors",
                  "aria-label": "Close",
                  children: /* @__PURE__ */ t("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ t(
                    "path",
                    {
                      d: "M4 4l8 8M12 4l-8 8",
                      stroke: "currentColor",
                      strokeWidth: "1.5",
                      strokeLinecap: "round"
                    }
                  ) })
                }
              )
            ] }),
            /* @__PURE__ */ t("div", { className: "flex-1 overflow-y-auto p-5", children: l }),
            s && /* @__PURE__ */ t("div", { className: "flex-shrink-0 border-t border-[var(--color-border)] p-4 bg-[var(--color-surface-inset,#f8fafc)]", children: s })
          ]
        }
      )
    ] }),
    document.body
  ) : null;
}
function Qe(e, r) {
  if (!e || typeof window > "u") return r;
  try {
    const a = window.localStorage.getItem(e);
    return a === null ? r : a === "true";
  } catch {
    return r;
  }
}
function Xt({
  title: e,
  defaultOpen: r = !1,
  badge: a,
  children: o,
  className: n,
  storageKey: l
}) {
  const [s, c] = E(
    () => Qe(l, r)
  );
  return L(() => {
    if (l && !(typeof window > "u"))
      try {
        window.localStorage.setItem(l, String(s));
      } catch {
      }
  }, [s, l]), /* @__PURE__ */ i(
    "div",
    {
      className: d(
        "border border-[var(--color-border)] rounded-lg overflow-hidden",
        n
      ),
      children: [
        /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            className: "w-full flex items-center justify-between px-4 py-3 bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors text-left",
            onClick: () => c((u) => !u),
            "aria-expanded": s,
            children: [
              /* @__PURE__ */ t("span", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: e }),
              /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
                a,
                /* @__PURE__ */ t(
                  "svg",
                  {
                    className: d(
                      "w-4 h-4 text-[var(--color-text-tertiary)] transition-transform",
                      s && "rotate-180"
                    ),
                    viewBox: "0 0 16 16",
                    fill: "none",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ t(
                      "path",
                      {
                        d: "M4 6l4 4 4-4",
                        stroke: "currentColor",
                        strokeWidth: "1.5",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      }
                    )
                  }
                )
              ] })
            ]
          }
        ),
        s && /* @__PURE__ */ t("div", { className: "border-t border-[var(--color-border)] bg-white", children: o })
      ]
    }
  );
}
function er({
  value: e,
  onChange: r,
  placeholder: a,
  onClear: o,
  className: n,
  style: l,
  autoFocus: s,
  "aria-label": c
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: d("relative inline-flex items-center", n),
      style: l,
      children: [
        /* @__PURE__ */ i(
          "svg",
          {
            className: "absolute left-3 w-3.5 h-3.5 text-[var(--color-text-tertiary)] pointer-events-none",
            viewBox: "0 0 16 16",
            fill: "none",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ t(
                "circle",
                {
                  cx: "7",
                  cy: "7",
                  r: "4.5",
                  stroke: "currentColor",
                  strokeWidth: "1.5"
                }
              ),
              /* @__PURE__ */ t(
                "path",
                {
                  d: "M10.5 10.5L14 14",
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ t(
          "input",
          {
            type: "text",
            value: e,
            onChange: (u) => r(u.target.value),
            placeholder: a ?? "Search…",
            autoFocus: s,
            "aria-label": c,
            className: "w-full pl-8 pr-7 py-1.5 text-sm rounded-md border border-[var(--color-border-field,#d1d5db)] bg-white text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors"
          }
        ),
        e && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => {
              r(""), o?.();
            },
            className: "absolute right-2 p-0.5 rounded text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]",
            "aria-label": "Clear search",
            children: /* @__PURE__ */ t("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ t(
              "path",
              {
                d: "M2 2l8 8M10 2l-8 8",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round"
              }
            ) })
          }
        )
      ]
    }
  );
}
const Je = {
  error: "bg-[var(--color-danger-bg,#fef2f2)] border-[var(--color-danger,#dc2626)] text-[var(--color-danger,#dc2626)]",
  success: "bg-[var(--color-success-bg,#f0fdf4)] border-[var(--color-success,#16a34a)] text-[var(--color-success,#16a34a)]",
  info: "bg-[var(--color-info-bg,#eff6ff)] border-[var(--color-info,#2563eb)] text-[var(--color-info,#2563eb)]",
  warning: "bg-[var(--color-warning-bg,#fffbeb)] border-[var(--color-warning,#f59e0b)] text-[var(--color-warning,#f59e0b)]"
};
function tr({ tone: e, children: r, onDismiss: a, className: o }) {
  return /* @__PURE__ */ i(
    "div",
    {
      role: e === "error" || e === "warning" ? "alert" : "status",
      "aria-live": e === "error" || e === "warning" ? "assertive" : "polite",
      className: d(
        "flex items-start gap-2 px-3 py-2 rounded-md border-l-[3px] text-sm",
        Je[e],
        o
      ),
      children: [
        /* @__PURE__ */ t("span", { className: "flex-1", children: r }),
        a && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: a,
            "aria-label": "Dismiss",
            className: "flex-shrink-0 opacity-70 hover:opacity-100",
            children: "✕"
          }
        )
      ]
    }
  );
}
function rr({
  title: e,
  description: r,
  actions: a,
  back: o,
  badge: n,
  className: l
}) {
  return /* @__PURE__ */ i("div", { className: d("flex flex-col gap-1.5", l), children: [
    o && /* @__PURE__ */ i(
      "a",
      {
        href: o.to,
        onClick: o.onClick,
        className: "inline-flex items-center gap-1 text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] mb-1 w-fit",
        children: [
          /* @__PURE__ */ t(
            "svg",
            {
              width: "12",
              height: "12",
              viewBox: "0 0 12 12",
              fill: "none",
              "aria-hidden": "true",
              children: /* @__PURE__ */ t(
                "path",
                {
                  d: "M7 2L3 6l4 4",
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              )
            }
          ),
          o.label
        ]
      }
    ),
    /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ i("div", { className: "min-w-0 flex items-center gap-2.5", children: [
        /* @__PURE__ */ t("h1", { className: "text-xl font-semibold text-[var(--color-text-primary)] leading-tight", children: e }),
        n
      ] }),
      a && /* @__PURE__ */ t("div", { className: "flex-shrink-0 flex items-center gap-2", children: a })
    ] }),
    r && /* @__PURE__ */ t("p", { className: "text-sm text-[var(--color-text-secondary)]", children: r })
  ] });
}
function U({ size: e = "md", color: r, className: a }) {
  const o = e === "sm" ? 4 : 6, n = r || "var(--color-text-tertiary, #94a3b8)";
  return /* @__PURE__ */ i(D, { children: [
    /* @__PURE__ */ t("style", { children: `
        @keyframes thinkDot {
          0%, 80%, 100% { transform: scale(1); opacity: 0.4; }
          40% { transform: scale(1.3); opacity: 1; }
        }
      ` }),
    /* @__PURE__ */ t("span", { className: d("inline-flex items-center gap-1", a), children: [0, 1, 2].map((l) => /* @__PURE__ */ t(
      "span",
      {
        style: {
          width: o,
          height: o,
          borderRadius: "50%",
          background: n,
          display: "inline-block",
          animation: `thinkDot 1.2s ease-in-out ${l * 0.2}s infinite`
        }
      },
      l
    )) })
  ] });
}
function Ze(e) {
  if (e.length === 0) return "";
  if (e.length === 1) return `${e[0]} is typing…`;
  if (e.length === 2) return `${e[0]} and ${e[1]} are typing…`;
  const r = e.length - 2;
  return `${e[0]}, ${e[1]} and ${r} other${r > 1 ? "s" : ""} are typing…`;
}
function ar({
  names: e,
  compact: r = !1,
  color: a,
  size: o = "sm",
  className: n,
  "data-testid": l = "typing-indicator"
}) {
  return e.length === 0 ? null : /* @__PURE__ */ i(
    "span",
    {
      role: "status",
      "aria-live": "polite",
      "data-testid": l,
      className: d(
        "inline-flex items-center gap-1.5 text-[12px] text-text-tertiary",
        n
      ),
      children: [
        /* @__PURE__ */ t(U, { size: o, color: a }),
        !r && /* @__PURE__ */ t("span", { children: Ze(e) })
      ]
    }
  );
}
const Xe = {
  idle: { label: "Idle", colorClass: "text-[#6b7280]" },
  connecting: { label: "Connecting…", colorClass: "text-[#f59e0b]" },
  connected: { label: "Connected", colorClass: "text-[#10b981]" },
  reconnecting: { label: "Reconnecting…", colorClass: "text-[#f59e0b]" },
  disconnected: { label: "Disconnected", colorClass: "text-[#ef4444]" }
};
function nr({
  state: e,
  compact: r = !1,
  withLabel: a = !0,
  labels: o,
  className: n,
  "data-testid": l = "connection-pill"
}) {
  const s = Xe[e], c = o?.[e] ?? s.label, u = a && !r;
  return /* @__PURE__ */ i(
    "span",
    {
      role: "status",
      "aria-live": "polite",
      "aria-label": u ? void 0 : c,
      "data-testid": l,
      "data-state": e,
      className: d("inline-flex items-center gap-1.5 font-mono", n),
      children: [
        /* @__PURE__ */ t("span", { "aria-hidden": "true", className: s.colorClass, children: "⬤" }),
        u && /* @__PURE__ */ t("span", { className: d(s.colorClass, "font-semibold"), children: c })
      ]
    }
  );
}
const Q = {
  debug: "DEBUG",
  info: "INFO",
  warn: "WARN",
  error: "ERROR"
}, et = {
  debug: "text-[var(--color-text-tertiary)]",
  info: "text-[var(--color-info,#3b82f6)]",
  warn: "text-[var(--color-warning,#d97706)]",
  error: "text-[var(--color-danger,#dc2626)]"
};
function tt({
  lines: e,
  follow: r = !0,
  showTimestamp: a = !0,
  showLevel: o = !0,
  showSource: n = !0,
  title: l = "Log stream",
  headerSlot: s,
  emptyMessage: c = "No log lines yet.",
  maxHeight: u,
  onClear: f,
  className: m,
  style: y,
  "data-testid": x = "log-stream"
}) {
  const b = M(null), [h, p] = E(!1);
  L(() => {
    if (!r || h) return;
    const g = b.current;
    g && (g.scrollTop = g.scrollHeight);
  }, [e, r, h]);
  const w = () => {
    const g = b.current;
    if (!g) return;
    const k = g.scrollHeight - g.scrollTop - g.clientHeight < 24;
    p(!k);
  }, N = () => {
    const g = b.current;
    g && (g.scrollTop = g.scrollHeight, p(!1));
  }, C = /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ i(
      "span",
      {
        className: "text-[10px] text-[var(--color-text-tertiary)]",
        "data-testid": `${x}-count`,
        children: [
          e.length,
          " ",
          e.length === 1 ? "line" : "lines"
        ]
      }
    ),
    f && /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: f,
        "data-testid": `${x}-clear`,
        className: d(
          "text-[10px] uppercase tracking-wide",
          "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
          "border border-[var(--color-border)] rounded px-1.5 py-0.5",
          "cursor-pointer bg-transparent"
        ),
        children: "Clear"
      }
    )
  ] });
  return /* @__PURE__ */ i(
    he,
    {
      "data-testid": x,
      className: d("flex flex-col", m),
      style: y,
      children: [
        l !== null && /* @__PURE__ */ t("div", { className: "px-4 py-3 border-b border-[var(--color-border)]", children: /* @__PURE__ */ t(me, { title: l, meta: s ?? C }) }),
        /* @__PURE__ */ i("div", { className: "relative flex-1 min-h-0 flex", children: [
          /* @__PURE__ */ t(
            "div",
            {
              ref: b,
              onScroll: w,
              role: "log",
              "aria-live": r ? "polite" : "off",
              "data-testid": `${x}-scroll`,
              className: d(
                "flex-1 overflow-y-auto",
                "font-mono text-[12px] leading-[1.55]",
                "bg-[var(--color-surface-subtle,#0b1020)] text-[var(--color-text-primary,#e5e7eb)]",
                "py-2"
              ),
              style: { maxHeight: u },
              children: e.length === 0 ? /* @__PURE__ */ t(
                "div",
                {
                  "data-testid": `${x}-empty`,
                  className: "px-3 py-6 text-center text-[11px] text-[var(--color-text-tertiary)]",
                  children: c
                }
              ) : e.map((g) => {
                const k = g.level ?? "info";
                return /* @__PURE__ */ i(
                  "div",
                  {
                    role: "listitem",
                    "data-testid": `${x}-line`,
                    "data-level": g.level || void 0,
                    className: "flex items-baseline gap-2 px-3 hover:bg-[var(--color-surface,rgba(255,255,255,0.04))]",
                    children: [
                      a && g.timestamp && /* @__PURE__ */ t("span", { className: "shrink-0 text-[var(--color-text-tertiary)] tabular-nums", children: g.timestamp }),
                      o && g.level && /* @__PURE__ */ t(
                        "span",
                        {
                          className: d(
                            "shrink-0 font-semibold uppercase text-[10px] w-[44px]",
                            et[k]
                          ),
                          "aria-label": `level ${Q[k].toLowerCase()}`,
                          children: Q[k]
                        }
                      ),
                      n && g.source && /* @__PURE__ */ i("span", { className: "shrink-0 text-[var(--color-text-secondary)]", children: [
                        "[",
                        g.source,
                        "]"
                      ] }),
                      /* @__PURE__ */ t("span", { className: "flex-1 whitespace-pre-wrap break-words", children: g.message })
                    ]
                  },
                  g.id
                );
              })
            }
          ),
          r && h && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "data-testid": `${x}-jump`,
              onClick: N,
              className: d(
                "absolute bottom-3 left-1/2 -translate-x-1/2",
                "px-3 py-1 text-[10px] font-semibold uppercase tracking-wide",
                "bg-primary text-white rounded-full border-none cursor-pointer",
                "shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
              ),
              children: "Jump to live ↓"
            }
          )
        ] })
      ]
    }
  );
}
const or = tt;
function lr({
  title: e,
  description: r,
  category: a,
  categoryTone: o = "neutral",
  thumbnail: n,
  icon: l = "🧩",
  thumbnailHeight: s = 160,
  href: c,
  onClick: u,
  badge: f,
  meta: m,
  className: y,
  style: x,
  "data-testid": b = "thumbnail-card"
}) {
  const p = d(
    "group block w-full text-left bg-[var(--color-surface,#fff)]",
    "rounded-xl border border-[var(--color-border)] overflow-hidden",
    "transition-[box-shadow,transform] duration-150",
    (c || u) && "cursor-pointer hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-0.5",
    y
  ), w = /* @__PURE__ */ i(D, { children: [
    /* @__PURE__ */ i(
      "div",
      {
        "data-testid": `${b}-thumb`,
        className: d(
          "relative flex items-center justify-center",
          "bg-gradient-to-br from-[var(--color-primary-bg,#eef2ff)] to-[var(--color-surface,#ffffff)]",
          "border-b border-[var(--color-border)]"
        ),
        style: { height: s },
        children: [
          n ? /* @__PURE__ */ t(
            "img",
            {
              src: n,
              alt: "",
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ t("span", { className: "text-5xl opacity-50", "aria-hidden": !0, children: l }),
          f && /* @__PURE__ */ t(
            "span",
            {
              "data-testid": `${b}-badge`,
              className: "absolute top-2 right-2",
              children: f
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ i("div", { className: "px-4 py-3", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2 mb-1.5", children: [
        a && /* @__PURE__ */ t(ve, { tone: o, size: "xs", "data-testid": `${b}-category`, children: a }),
        m && /* @__PURE__ */ t("span", { className: "ml-auto", children: m })
      ] }),
      /* @__PURE__ */ t("div", { className: "text-[14px] font-semibold text-[var(--color-text-primary)] leading-snug", children: e }),
      r && /* @__PURE__ */ t("div", { className: "mt-1 text-[12px] text-[var(--color-text-secondary)] leading-snug", children: r })
    ] })
  ] });
  return c ? /* @__PURE__ */ t(
    "a",
    {
      href: c,
      onClick: u,
      "data-testid": b,
      className: d(p, "no-underline text-inherit"),
      style: x,
      children: w
    }
  ) : u ? /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      onClick: u,
      "data-testid": b,
      className: d(p, "font-inherit"),
      style: x,
      children: w
    }
  ) : /* @__PURE__ */ t("div", { "data-testid": b, className: p, style: x, children: w });
}
const rt = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
};
function sr({
  children: e,
  columns: r = 3,
  dense: a = !1,
  className: o,
  style: n,
  "data-testid": l = "catalog-grid"
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-testid": l,
      "data-columns": r,
      className: d(
        "grid grid-cols-1",
        rt[r],
        a ? "gap-3" : "gap-5",
        o
      ),
      style: n,
      children: e
    }
  );
}
const at = {
  neutral: "bg-slate-50",
  success: "bg-green-50",
  warning: "bg-amber-50",
  danger: "bg-red-50",
  info: "bg-blue-50",
  caution: "bg-orange-50",
  purple: "bg-purple-50"
}, nt = {
  neutral: "border-slate-200",
  success: "border-green-300",
  warning: "border-amber-300",
  danger: "border-red-300",
  info: "border-blue-300",
  caution: "border-orange-300",
  purple: "border-purple-300"
}, ot = {
  neutral: "text-slate-800",
  success: "text-green-800",
  warning: "text-amber-800",
  danger: "text-red-800",
  info: "text-blue-800",
  caution: "text-orange-800",
  purple: "text-purple-800"
};
function lt({
  orientation: e,
  variant: r
}) {
  if (r === "none") return null;
  const a = e === "vertical", o = r === "arrow" ? a ? "↓" : "→" : a ? "│" : "─";
  return /* @__PURE__ */ t(
    "div",
    {
      "data-testid": "stack-diagram-connector",
      "aria-hidden": !0,
      className: d(
        "flex items-center justify-center text-[var(--color-text-tertiary)]",
        a ? "h-5 text-base" : "w-5 text-base"
      ),
      children: o
    }
  );
}
function st({
  layers: e,
  orientation: r = "vertical",
  connector: a = "arrow",
  className: o,
  style: n,
  "data-testid": l = "stack-diagram"
}) {
  const s = r === "vertical";
  return /* @__PURE__ */ t(
    "div",
    {
      "data-testid": l,
      "data-orientation": r,
      "data-connector": a,
      className: d(
        "flex",
        s ? "flex-col items-stretch" : "flex-row items-stretch flex-wrap",
        o
      ),
      style: n,
      children: e.map((c, u) => {
        const f = c.tone ?? "neutral";
        return /* @__PURE__ */ i("div", { className: d("flex", "flex-col"), children: [
          /* @__PURE__ */ i(
            "div",
            {
              "data-testid": "stack-diagram-layer",
              "data-tone": f,
              className: d(
                "rounded-md border px-3 py-2",
                at[f],
                nt[f],
                !s && "min-w-[140px]"
              ),
              children: [
                /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
                  c.icon != null && /* @__PURE__ */ t("span", { className: "shrink-0 text-[14px] leading-none", "aria-hidden": !0, children: c.icon }),
                  /* @__PURE__ */ t("span", { className: d("text-[12px] font-semibold", ot[f]), children: c.label }),
                  c.meta != null && /* @__PURE__ */ t("span", { className: "ml-auto text-[10px] text-[var(--color-text-tertiary)] shrink-0", children: c.meta })
                ] }),
                c.description != null && /* @__PURE__ */ t("div", { className: "mt-0.5 text-[11px] leading-snug text-[var(--color-text-secondary)]", children: c.description })
              ]
            }
          ),
          u < e.length - 1 && /* @__PURE__ */ t(lt, { orientation: r, variant: a })
        ] }, c.id);
      })
    }
  );
}
const ir = st;
function cr({
  value: e,
  onChange: r,
  onSubmit: a,
  disabled: o = !1,
  multiline: n = !1,
  placeholder: l,
  submitLabel: s = "→",
  className: c,
  style: u,
  autoFocus: f,
  maxRows: m = 4
}) {
  const y = !o && e.trim().length > 0, x = () => {
    y && a();
  }, b = (p) => {
    if (p.key === "Enter") {
      if (n && p.shiftKey) return;
      p.preventDefault(), x();
    }
  }, h = d(
    "flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--color-border-field,#d1d5db)] bg-white text-[var(--color-text-primary)]",
    "placeholder:text-[var(--color-text-tertiary)]",
    "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent",
    "resize-none",
    o && "opacity-50 cursor-not-allowed bg-[var(--color-surface-hover)]"
  );
  return /* @__PURE__ */ i(
    "div",
    {
      className: d(
        "flex items-end gap-2 p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]",
        c
      ),
      style: u,
      children: [
        n ? /* @__PURE__ */ t(
          "textarea",
          {
            className: h,
            value: e,
            onChange: (p) => r(p.target.value),
            onKeyDown: b,
            disabled: o,
            placeholder: l,
            autoFocus: f,
            rows: 2,
            style: { maxHeight: `${m * 1.5 + 1}rem`, overflowY: "auto" }
          }
        ) : /* @__PURE__ */ t(
          "input",
          {
            type: "text",
            className: h,
            value: e,
            onChange: (p) => r(p.target.value),
            onKeyDown: b,
            disabled: o,
            placeholder: l,
            autoFocus: f
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: x,
            disabled: !y,
            className: d(
              "px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex-shrink-0",
              y ? "bg-[var(--color-primary)] text-white hover:opacity-90" : "bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] cursor-not-allowed"
            ),
            children: s
          }
        )
      ]
    }
  );
}
function it({ name: e, done: r, className: a }) {
  return /* @__PURE__ */ i(
    "span",
    {
      className: d(
        "inline-flex items-center gap-1 text-[10.5px] font-mono px-2 py-0.5 rounded-full",
        r ? "bg-[var(--color-success-bg,#f0fdf4)] text-[var(--color-success,#16a34a)]" : "bg-[var(--color-info-bg,#eff6ff)] text-[var(--color-info,#1d4ed8)]",
        a
      ),
      children: [
        e,
        r ? " ✓" : "…"
      ]
    }
  );
}
function ct({ toolCalls: e, className: r }) {
  return /* @__PURE__ */ t("div", { className: d("flex flex-wrap gap-1.5 py-1", r), children: e.map((a) => /* @__PURE__ */ t(it, { name: a.name, done: a.done }, a.id)) });
}
function dr({
  role: e,
  content: r,
  toolCalls: a,
  streaming: o = !1,
  agentName: n,
  userName: l,
  renderMarkdown: s,
  className: c
}) {
  const u = e === "user" ? l || "You" : n || "Assistant";
  return /* @__PURE__ */ i("div", { className: d("flex flex-col gap-1.5 py-3", c), children: [
    /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]", children: u }),
    a && a.length > 0 && /* @__PURE__ */ t(ct, { toolCalls: a }),
    e === "user" ? /* @__PURE__ */ t("div", { className: "text-sm text-[var(--color-text-primary)] whitespace-pre-wrap", children: r }) : /* @__PURE__ */ t("div", { className: "text-sm text-[var(--color-text-primary)] prose-sm max-w-none", children: r ? s ? s(r) : /* @__PURE__ */ t("span", { className: "whitespace-pre-wrap", children: r }) : o ? /* @__PURE__ */ t(U, {}) : null })
  ] });
}
function ur({
  content: e,
  streaming: r = !1,
  defaultOpen: a = !1,
  className: o
}) {
  const l = r || !e ? "Thinking" : "Thought";
  return /* @__PURE__ */ i(
    "details",
    {
      open: a,
      className: d(
        "rounded-md border border-[var(--color-border)] overflow-hidden text-sm group",
        o
      ),
      children: [
        /* @__PURE__ */ i("summary", { className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] list-none", children: [
          /* @__PURE__ */ t(
            "svg",
            {
              className: "w-3.5 h-3.5 transition-transform group-open:rotate-90",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 20 20",
              fill: "currentColor",
              "aria-hidden": "true",
              children: /* @__PURE__ */ t(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 011.08-1.04l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.08-.04z",
                  clipRule: "evenodd"
                }
              )
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide", children: l }),
          r && !e && /* @__PURE__ */ t(U, { size: "sm" })
        ] }),
        /* @__PURE__ */ t("div", { className: "px-3 py-2 text-xs text-[var(--color-text-secondary)] italic border-t border-[var(--color-border)] bg-white whitespace-pre-wrap leading-relaxed", children: e || /* @__PURE__ */ t(U, {}) })
      ]
    }
  );
}
function pr({
  prompts: e,
  onSelect: r,
  columns: a,
  title: o,
  className: n
}) {
  const l = a ? `repeat(${a}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(220px, 1fr))";
  return /* @__PURE__ */ i("div", { className: d("flex flex-col gap-3", n), children: [
    o && /* @__PURE__ */ t("p", { className: "text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] text-center", children: o }),
    /* @__PURE__ */ t("div", { style: { display: "grid", gridTemplateColumns: l, gap: 10 }, children: e.map((s, c) => /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => r(s.label),
        className: "flex flex-col gap-1 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis,#cbd5e1)] text-left transition-colors",
        children: [
          /* @__PURE__ */ t("span", { className: "text-sm font-medium text-[var(--color-text-primary)]", children: s.label }),
          s.hint && /* @__PURE__ */ t("span", { className: "text-xs text-[var(--color-text-tertiary)]", children: s.hint })
        ]
      },
      c
    )) })
  ] });
}
function xr({
  suggestions: e,
  onSelect: r,
  onRefresh: a,
  label: o,
  className: n
}) {
  return /* @__PURE__ */ i("div", { className: d("flex items-center flex-wrap gap-1.5 py-2", n), children: [
    o && /* @__PURE__ */ t("span", { className: "text-xs text-[var(--color-text-tertiary)] mr-1", children: o }),
    e.map((l, s) => /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: () => r(l),
        className: "inline-flex items-center px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors",
        children: l
      },
      s
    )),
    a && /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: a,
        className: "inline-flex items-center justify-center w-7 h-7 rounded-full border border-[var(--color-border)] text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] transition-colors text-base",
        title: "Refresh suggestions",
        children: "↻"
      }
    )
  ] });
}
function fr({
  name: e,
  memberCount: r,
  description: a,
  actions: o,
  avatarUrl: n,
  online: l,
  onMembersClick: s,
  className: c
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: d(
        "flex items-center justify-between gap-4 px-6 py-3",
        "border-b border-[var(--color-border)] bg-[var(--color-surface)]",
        c
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ i("div", { className: "relative shrink-0", children: [
            n ? /* @__PURE__ */ t(
              "img",
              {
                src: n,
                alt: e,
                className: "w-9 h-9 rounded-full object-cover"
              }
            ) : /* @__PURE__ */ t(G, { name: e, size: 36 }),
            l !== void 0 && /* @__PURE__ */ t("span", { className: "absolute -bottom-0.5 -right-0.5", children: /* @__PURE__ */ t(
              te,
              {
                color: l ? "#22c55e" : "#94a3b8",
                size: "sm",
                "aria-label": l ? "Online" : "Offline"
              }
            ) })
          ] }),
          /* @__PURE__ */ i("div", { className: "min-w-0 flex flex-col gap-0.5", children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ t("h2", { className: "text-[15px] font-semibold text-[var(--color-text-primary)] leading-tight truncate", children: e }),
              r !== void 0 && /* @__PURE__ */ i(
                "button",
                {
                  type: "button",
                  onClick: s,
                  disabled: !s,
                  className: d(
                    "text-[11px] font-medium text-[var(--color-text-tertiary)]",
                    "bg-transparent border-none p-0 leading-none",
                    s && "cursor-pointer hover:text-[var(--color-text-secondary)]",
                    !s && "cursor-default"
                  ),
                  children: [
                    r,
                    " ",
                    r === 1 ? "member" : "members"
                  ]
                }
              )
            ] }),
            a && /* @__PURE__ */ t("p", { className: "text-[12px] text-[var(--color-text-tertiary)] truncate leading-tight", children: a })
          ] })
        ] }),
        o && /* @__PURE__ */ t("div", { className: "flex items-center gap-2 shrink-0", children: o })
      ]
    }
  );
}
function mr({ user: e, items: r, className: a, "data-testid": o }) {
  const [n, l] = E(!1), s = M(null), c = T(() => l(!1), []);
  return L(() => {
    if (!n) return;
    const u = (f) => {
      s.current && !s.current.contains(f.target) && c();
    };
    return document.addEventListener("mousedown", u), () => document.removeEventListener("mousedown", u);
  }, [n, c]), L(() => {
    if (!n) return;
    const u = (f) => {
      f.key === "Escape" && c();
    };
    return document.addEventListener("keydown", u), () => document.removeEventListener("keydown", u);
  }, [n, c]), /* @__PURE__ */ i(
    "div",
    {
      ref: s,
      "data-testid": o,
      className: d("relative inline-block", a),
      children: [
        /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            "aria-label": `User menu for ${e.name}`,
            "aria-expanded": n,
            "aria-haspopup": "menu",
            onClick: () => l((u) => !u),
            className: d(
              "flex items-center gap-2 bg-transparent border-none cursor-pointer p-1 rounded-lg",
              "hover:bg-[var(--color-surface-hover)] transition-colors duration-100",
              n && "bg-[var(--color-surface-hover)]"
            ),
            children: [
              e.avatarUrl ? /* @__PURE__ */ t(
                "img",
                {
                  src: e.avatarUrl,
                  alt: e.name,
                  className: "w-8 h-8 rounded-full object-cover"
                }
              ) : /* @__PURE__ */ t(G, { name: e.name, size: 32 }),
              /* @__PURE__ */ i("div", { className: "flex flex-col items-start text-left min-w-0 hidden sm:flex", children: [
                /* @__PURE__ */ t("span", { className: "text-sm font-medium text-[var(--color-text-primary)] leading-tight truncate max-w-[120px]", children: e.name }),
                /* @__PURE__ */ t("span", { className: "text-xs text-[var(--color-text-tertiary)] leading-tight truncate max-w-[120px]", children: e.email })
              ] }),
              /* @__PURE__ */ t(
                "svg",
                {
                  width: "12",
                  height: "12",
                  viewBox: "0 0 12 12",
                  fill: "none",
                  "aria-hidden": "true",
                  className: d(
                    "text-[var(--color-text-tertiary)] transition-transform duration-150",
                    n ? "rotate-180" : "rotate-0"
                  ),
                  children: /* @__PURE__ */ t("path", { d: "M2 4l4 4 4-4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
                }
              )
            ]
          }
        ),
        n && /* @__PURE__ */ i(
          "div",
          {
            role: "menu",
            "aria-label": "User menu",
            className: d(
              "absolute right-0 top-[calc(100%+6px)] min-w-[200px] z-[200]",
              "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden"
            ),
            children: [
              /* @__PURE__ */ i("div", { className: "px-3 py-2.5 border-b border-[var(--color-border)]", children: [
                /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-[var(--color-text-primary)] truncate", children: e.name }),
                /* @__PURE__ */ t("p", { className: "text-xs text-[var(--color-text-tertiary)] truncate", children: e.email })
              ] }),
              /* @__PURE__ */ t("div", { className: "py-1", children: r.map((u, f) => /* @__PURE__ */ i("div", { children: [
                u.separator && f > 0 && /* @__PURE__ */ t("div", { className: "my-1 border-t border-[var(--color-border)]" }),
                /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    role: "menuitem",
                    onClick: () => {
                      u.onClick(), c();
                    },
                    className: d(
                      "flex items-center gap-2.5 w-full text-left px-3 py-2",
                      "text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100",
                      u.danger ? "text-[#dc2626] bg-transparent hover:bg-[#fef2f2]" : "text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"
                    ),
                    children: [
                      u.icon && /* @__PURE__ */ t("span", { className: "shrink-0 text-base leading-none", "aria-hidden": "true", children: u.icon }),
                      u.label
                    ]
                  }
                )
              ] }, f)) })
            ]
          }
        )
      ]
    }
  );
}
function dt({ item: e, isLast: r }) {
  const a = d(
    "text-sm leading-snug transition-colors duration-100",
    r ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal"
  );
  return r || !e.href && !e.onClick ? /* @__PURE__ */ t("span", { className: a, "aria-current": r ? "page" : void 0, children: e.label }) : e.href ? /* @__PURE__ */ t("a", { href: e.href, onClick: e.onClick, className: d(a, "no-underline"), children: e.label }) : /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      onClick: e.onClick,
      className: d(a, "border-none bg-transparent cursor-pointer font-[inherit] p-0"),
      children: e.label
    }
  );
}
function ut(e, r) {
  if (e.length <= r) return e;
  const a = e.slice(0, 1), o = e.slice(-(r - 2 > 0 ? r - 2 : 1));
  return [...a, null, ...o];
}
function br({
  items: e,
  separator: r = "/",
  maxItems: a,
  className: o,
  "data-testid": n
}) {
  if (e.length === 0) return null;
  const l = a != null ? ut(e, a) : e;
  return /* @__PURE__ */ t("nav", { "aria-label": "Breadcrumb", "data-testid": n, className: d("flex items-center", o), children: /* @__PURE__ */ t("ol", { className: "flex items-center gap-1 flex-wrap list-none m-0 p-0", children: l.map((s, c) => {
    const u = c === l.length - 1;
    return /* @__PURE__ */ i("li", { className: "flex items-center gap-1", children: [
      s === null ? /* @__PURE__ */ t(
        "span",
        {
          className: "text-sm text-[var(--color-text-tertiary)] select-none",
          "aria-label": "More items",
          title: "Some items are hidden",
          children: "…"
        }
      ) : /* @__PURE__ */ t(dt, { item: s, isLast: u }),
      !u && /* @__PURE__ */ t(
        "span",
        {
          className: "text-[var(--color-text-tertiary)] text-sm select-none",
          "aria-hidden": "true",
          children: r
        }
      )
    ] }, c);
  }) }) });
}
const pt = {
  active: { bg: "#f0fdf4", border: "#86efac", text: "#166534", accent: "#16a34a" },
  in_progress: { bg: "#eff6ff", border: "#93c5fd", text: "#1e40af", accent: "#3b82f6" },
  completed: { bg: "#f0fdf4", border: "#86efac", text: "#166534", accent: "#16a34a" },
  archived: { bg: "#f9fafb", border: "#d1d5db", text: "#6b7280", accent: "#9ca3af" },
  planning: { bg: "#fefce8", border: "#fde047", text: "#713f12", accent: "#eab308" },
  paused: { bg: "#fff7ed", border: "#fdba74", text: "#9a3412", accent: "#f97316" }
}, xt = {
  bg: "#f3f4f6",
  border: "#d1d5db",
  text: "#374151",
  accent: "#6b7280"
};
function ft({ status: e, colors: r }) {
  return /* @__PURE__ */ i(
    "span",
    {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 9px",
        borderRadius: 9999,
        fontSize: 10,
        fontWeight: 700,
        background: r.bg,
        color: r.text,
        border: `1px solid ${r.border}`,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
        flexShrink: 0
      },
      children: [
        /* @__PURE__ */ t("span", { style: { width: 5, height: 5, borderRadius: "50%", background: r.accent } }),
        e.replace(/_/g, " ")
      ]
    }
  );
}
function hr({
  name: e,
  id: r,
  status: a,
  statusColors: o,
  contributorNames: n = [],
  contributorCount: l,
  activityItems: s = [],
  presenceDotColor: c = "#d1d5db",
  activityLabel: u = "",
  cardIndex: f = 0,
  onClick: m,
  className: y,
  style: x,
  minHeight: b = 190
}) {
  const h = { ...pt, ...o }, p = (a ?? "unknown").toLowerCase().replace(/ /g, "_"), w = h[p] ?? xt, N = l !== void 0 ? Math.max(0, l - n.length) : 0, C = f % 8 * 525;
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      onClick: m,
      className: y,
      style: {
        background: "#fff",
        border: "1.5px solid #e5e7eb",
        borderTop: `3px solid ${w.accent}`,
        borderRadius: 10,
        padding: "14px 16px 12px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transition: "box-shadow 0.15s, transform 0.1s",
        minHeight: b,
        width: "100%",
        textAlign: "left",
        font: "inherit",
        color: "inherit",
        ...x
      },
      onMouseEnter: (g) => {
        const k = g.currentTarget;
        k.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)", k.style.transform = "translateY(-1px)", k.style.borderColor = w.border;
      },
      onMouseLeave: (g) => {
        const k = g.currentTarget;
        k.style.boxShadow = "none", k.style.transform = "none", k.style.borderColor = "#e5e7eb";
      },
      children: [
        /* @__PURE__ */ i(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 8
            },
            children: [
              /* @__PURE__ */ i("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ t(
                  "h3",
                  {
                    style: {
                      margin: "0 0 3px",
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: "#111827",
                      lineHeight: 1.35
                    },
                    children: e
                  }
                ),
                r && /* @__PURE__ */ t(
                  "span",
                  {
                    style: {
                      fontSize: 10,
                      fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, monospace',
                      color: "#9ca3af",
                      letterSpacing: "0.02em"
                    },
                    children: r
                  }
                )
              ] }),
              a && /* @__PURE__ */ t(ft, { status: a, colors: w })
            ]
          }
        ),
        /* @__PURE__ */ t(ge, { items: s, staggerMs: C }),
        /* @__PURE__ */ i(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 8,
              borderTop: "1px solid #f3f4f6",
              gap: 8
            },
            children: [
              /* @__PURE__ */ i("div", { style: { display: "flex", alignItems: "center", gap: 8, minWidth: 0 }, children: [
                n.length > 0 ? /* @__PURE__ */ t(be, { names: n, maxVisible: 5, size: 24 }) : /* @__PURE__ */ i("span", { style: { fontSize: 12, color: "#9ca3af" }, children: [
                  /* @__PURE__ */ t("strong", { style: { color: "#374151" }, children: l ?? 0 }),
                  " contributors"
                ] }),
                n.length > 0 && N > 0 && /* @__PURE__ */ i("span", { style: { fontSize: 11, color: "#9ca3af" }, children: [
                  "+",
                  N,
                  " more"
                ] })
              ] }),
              u && /* @__PURE__ */ i("div", { style: { display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }, children: [
                /* @__PURE__ */ t(
                  "span",
                  {
                    style: {
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: c,
                      flexShrink: 0
                    }
                  }
                ),
                /* @__PURE__ */ t("span", { style: { fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap" }, children: u })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function mt(e) {
  const r = [], a = /* @__PURE__ */ new Map();
  for (const o of e) {
    const n = o.group ?? null;
    if (n === null) {
      (r.length === 0 || r[0].name !== null) && (r.unshift({ name: null, items: [] }), a.forEach((s, c) => a.set(c, s + 1))), r[0].items.push(o);
      continue;
    }
    let l = a.get(n);
    l === void 0 && (l = r.length, a.set(n, l), r.push({ name: n, items: [] })), r[l].items.push(o);
  }
  return r;
}
function J({
  items: e,
  storageKey: r,
  title: a,
  renderNavItem: o
}) {
  const n = R(() => mt(e), [e]), l = n.some((s) => s.name !== null);
  return /* @__PURE__ */ t("nav", { className: "flex-1 overflow-y-auto py-1", children: l ? n.map(
    (s) => s.name === null ? /* @__PURE__ */ t(Z, { items: s.items, renderNavItem: o }, "__ungrouped") : /* @__PURE__ */ t(
      bt,
      {
        name: s.name,
        items: s.items,
        storageKey: `${r}.${a}.${s.name}`,
        renderNavItem: o
      },
      s.name
    )
  ) : /* @__PURE__ */ t(Z, { items: e, renderNavItem: o }) });
}
function vr({
  title: e,
  items: r,
  titleAction: a,
  railHeader: o,
  railWidth: n = 220,
  storageKey: l = "subnav",
  secondaryTitle: s,
  secondaryItems: c,
  secondaryStorageKey: u,
  secondaryRailWidth: f = 200,
  renderNavItem: m,
  children: y
}) {
  const x = c && c.length > 0;
  return /* @__PURE__ */ i("div", { className: "flex h-full min-h-0", children: [
    /* @__PURE__ */ i(
      "aside",
      {
        className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
        style: { width: n },
        children: [
          /* @__PURE__ */ i("div", { className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]", children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]", children: e }),
            a
          ] }),
          o && /* @__PURE__ */ t("div", { className: "px-3 py-2 border-b border-[var(--color-border)]", children: o }),
          /* @__PURE__ */ t(J, { items: r, storageKey: l, title: e, renderNavItem: m })
        ]
      }
    ),
    x && /* @__PURE__ */ i(
      "aside",
      {
        className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
        style: { width: f },
        children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]", children: /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]", children: s ?? "" }) }),
          /* @__PURE__ */ t(
            J,
            {
              items: c,
              storageKey: u ?? `${l}.secondary`,
              title: s ?? "secondary",
              renderNavItem: m
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t("main", { className: "flex-1 min-w-0 overflow-auto p-6", children: y })
  ] });
}
function Z({
  items: e,
  renderNavItem: r
}) {
  return /* @__PURE__ */ t(D, { children: e.map((a) => /* @__PURE__ */ t(ne, { item: a, renderNavItem: r }, a.path)) });
}
function bt({
  name: e,
  items: r,
  storageKey: a,
  renderNavItem: o
}) {
  const [n, l] = E(() => typeof window > "u" ? !1 : window.localStorage?.getItem(a) === "1");
  L(() => {
    typeof window > "u" || (n ? window.localStorage?.setItem(a, "1") : window.localStorage?.removeItem(a));
  }, [n, a]);
  const s = r.find((u) => u.groupScrollAfter)?.groupScrollAfter, c = s ? { maxHeight: s * 38, overflowY: "auto" } : void 0;
  return /* @__PURE__ */ i("section", { className: "border-b border-[var(--color-border)]", children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => l((u) => !u),
        className: "flex items-center gap-1.5 w-full px-3 py-2 bg-transparent border-none cursor-pointer text-[var(--color-text-tertiary)] text-[10px] font-bold tracking-[0.05em] uppercase text-left",
        "aria-expanded": !n,
        children: [
          /* @__PURE__ */ t("span", { className: "text-[10px] w-[10px] inline-block", "aria-hidden": "true", children: n ? "▸" : "▾" }),
          /* @__PURE__ */ t("span", { className: "flex-1", children: e }),
          /* @__PURE__ */ t("span", { className: "text-[9px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-bg)] px-[5px] py-px rounded-[6px] border border-[var(--color-border)]", children: r.length })
        ]
      }
    ),
    !n && /* @__PURE__ */ t("div", { style: c, children: r.map((u) => /* @__PURE__ */ t(ne, { item: u, renderNavItem: o }, u.path)) })
  ] });
}
function ne({
  item: e,
  renderNavItem: r
}) {
  const a = e.accent === "danger" ? "#dc2626" : e.accent === "warning" ? "#d97706" : e.accent === "success" ? "#16a34a" : void 0, o = /* @__PURE__ */ i(D, { children: [
    /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ t(
        "span",
        {
          className: "text-[13px] font-medium text-[var(--color-text-secondary)]",
          style: a ? { color: a } : void 0,
          children: e.label
        }
      ),
      e.count !== void 0 && /* @__PURE__ */ t("span", { className: "text-[10px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-surface)] px-[6px] py-px rounded-[8px] border border-[var(--color-border)]", children: e.count })
    ] }),
    e.hint && /* @__PURE__ */ t("div", { className: "text-[10px] text-[var(--color-text-tertiary)] mt-0.5", children: e.hint })
  ] }), n = {
    display: "block",
    padding: "8px 14px",
    borderLeft: "3px solid transparent",
    color: "var(--color-text-secondary)",
    textDecoration: "none",
    cursor: "pointer"
  };
  return e.onClick ? /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      onClick: e.onClick,
      className: "block w-full px-[14px] py-2 border-l-[3px] border-transparent border-t-0 border-r-0 border-b-0 bg-transparent text-[var(--color-text-secondary)] text-left cursor-pointer font-[inherit]",
      children: o
    }
  ) : r ? /* @__PURE__ */ t(D, { children: r(e, o, n) }) : /* @__PURE__ */ t(
    "a",
    {
      href: e.path,
      className: "block px-[14px] py-2 border-l-[3px] border-transparent text-[var(--color-text-secondary)] no-underline cursor-pointer",
      children: o
    }
  );
}
const ht = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function X(e) {
  return Array.from(e.querySelectorAll(ht)).filter(
    (r) => r.getAttribute("aria-hidden") !== "true"
  );
}
function vt(e, r, a) {
  return r === "right" ? {
    position: "fixed",
    top: e.top,
    left: e.right + a
  } : {
    position: "fixed",
    top: e.bottom + a,
    left: e.left
  };
}
function gr({
  trigger: e,
  open: r,
  onClose: a,
  placement: o = "bottom-start",
  offset: n = 6,
  className: l,
  zIndex: s = 9500,
  "data-testid": c = "inline-popover",
  children: u
}) {
  const f = M(null), [m, y] = E(null), x = M(null), b = T(() => {
    const h = e.current;
    if (!h) return;
    const p = h.getBoundingClientRect();
    y(vt(p, o, n));
  }, [e, o, n]);
  return ce(() => {
    if (!r) {
      y(null);
      return;
    }
    b();
  }, [r, b]), L(() => {
    if (!r) return;
    const h = () => b();
    return window.addEventListener("scroll", h, !0), window.addEventListener("resize", h), () => {
      window.removeEventListener("scroll", h, !0), window.removeEventListener("resize", h);
    };
  }, [r, b]), L(() => {
    if (!r) return;
    const h = typeof document < "u" ? document.activeElement : null;
    return x.current = h, queueMicrotask(() => {
      const p = f.current;
      if (!p) return;
      const w = X(p);
      w.length > 0 ? w[0].focus() : (p.setAttribute("tabindex", "-1"), p.focus());
    }), () => {
      const p = x.current;
      p && typeof p.focus == "function" && document.contains(p) && p.focus(), x.current = null;
    };
  }, [r]), L(() => {
    if (!r) return;
    const h = (p) => {
      if (p.key === "Escape") {
        p.stopPropagation(), a();
        return;
      }
      if (p.key !== "Tab") return;
      const w = f.current;
      if (!w) return;
      const N = X(w);
      if (N.length === 0) {
        p.preventDefault();
        return;
      }
      const C = N[0], g = N[N.length - 1], k = document.activeElement;
      if (!k || !w.contains(k)) {
        p.preventDefault(), C.focus();
        return;
      }
      p.shiftKey && k === C ? (p.preventDefault(), g.focus()) : !p.shiftKey && k === g && (p.preventDefault(), C.focus());
    };
    return window.addEventListener("keydown", h), () => window.removeEventListener("keydown", h);
  }, [r, a]), L(() => {
    if (!r) return;
    const h = (p) => {
      const w = p.target;
      w && (f.current?.contains(w) || e.current?.contains(w) || a());
    };
    return document.addEventListener("mousedown", h), () => document.removeEventListener("mousedown", h);
  }, [r, a, e]), !r || !m || typeof document > "u" ? null : re(
    /* @__PURE__ */ t(
      "div",
      {
        ref: f,
        role: "dialog",
        "data-testid": c,
        "data-placement": o,
        className: d(
          "min-w-[160px] rounded-lg border border-slate-200 bg-white",
          "shadow-lg p-1 text-sm text-slate-700",
          l
        ),
        style: { ...m, zIndex: s },
        children: u
      }
    ),
    document.body
  );
}
export {
  U as A,
  br as B,
  sr as C,
  It as D,
  Jt as E,
  Yt as F,
  lr as G,
  it as H,
  tr as I,
  ct as J,
  zt as K,
  ir as L,
  dr as M,
  ar as N,
  mr as O,
  rr as P,
  pr as Q,
  Ze as R,
  er as S,
  Wt as T,
  qt as U,
  Dt as V,
  fr as a,
  cr as b,
  jt as c,
  Xt as d,
  Bt as e,
  Pt as f,
  Mt as g,
  nr as h,
  Zt as i,
  Ft as j,
  xr as k,
  Ut as l,
  gr as m,
  Ht as n,
  tt as o,
  He as p,
  Vt as q,
  hr as r,
  Qt as s,
  _e as t,
  st as u,
  Gt as v,
  vr as w,
  Kt as x,
  or as y,
  ur as z
};
