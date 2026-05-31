import { jsxs as i, jsx as r, Fragment as D } from "react/jsx-runtime";
import { useState as E, useCallback as T, createContext as se, useMemo as M, useEffect as $, useRef as O, useContext as ie, useId as ee, useLayoutEffect as ce } from "react";
import { c as d } from "./cn-B6yFEsav.js";
import { _ as j } from "./index-DvoJowRO.js";
import { M as de } from "./Modal-2jg4229_.js";
import { T as ue, b as pe, e as q, a as fe, c as W, d as P } from "./PageSection-Dj8r4YIt.js";
import { S as xe, C as me } from "./CardHeader-DuyI9Sk3.js";
import { A as z, a as be } from "./Avatar-BvKIaNVE.js";
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
function Ce(e, t) {
  let a = e.replace(/(\/\/.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
  a = a.replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:${t.comment}">$1</span>`), a = a.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    `<span style="color:${t.string}">$1</span>`
  );
  const o = new RegExp(`\\b(${ye.join("|")})\\b`, "g");
  return a = a.replace(o, `<span style="color:${t.keyword}">$1</span>`), a = a.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), a;
}
function Se(e, t) {
  let a = e.replace(
    /("(?:[^"\\]|\\.)*")(\s*:)/g,
    `<span style="color:${t.property}">$1</span>$2`
  );
  return a = a.replace(/("(?:[^"\\]|\\.)*")/g, `<span style="color:${t.string}">$1</span>`), a = a.replace(/\b(true|false|null)\b/g, `<span style="color:${t.keyword}">$1</span>`), a = a.replace(/\b(-?\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), a;
}
function $e(e, t) {
  let a = e.replace(/(#.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
  a = a.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, `<span style="color:${t.string}">$1</span>`);
  const o = new RegExp(`\\b(${we.join("|")})\\b`, "g");
  a = a.replace(o, `<span style="color:${t.keyword}">$1</span>`);
  const n = new RegExp(`\\b(${Ne.join("|")})\\b`, "g");
  return a = a.replace(n, `<span style="color:${t.builtin}">$1</span>`), a = a.replace(/(\$\w+|\$\{[^}]+\})/g, `<span style="color:${t.variable}">$1</span>`), a;
}
const Le = {
  comment: "#6b7280",
  string: "#4ade80",
  keyword: "#93c5fd",
  number: "#fbbf24",
  property: "#7dd3fc",
  builtin: "#c4b5fd",
  variable: "#fbbf24"
}, Ee = {
  comment: "#64748b",
  string: "#15803d",
  keyword: "#1d4ed8",
  number: "#a16207",
  property: "#0369a1",
  builtin: "#7c3aed",
  variable: "#a16207"
};
function Y(e, t, a) {
  const o = a === "dark" ? Le : Ee, n = ke(e);
  switch (t) {
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
  language: t = "tsx",
  theme: a = "dark",
  copyButton: o = !0,
  showLineNumbers: n = !1,
  className: l,
  style: s,
  "data-testid": c,
  ariaLabel: u
}) {
  const [f, b] = E(!1), k = T(() => {
    typeof navigator > "u" || !navigator.clipboard || navigator.clipboard.writeText(e).then(() => {
      b(!0), setTimeout(() => b(!1), 1500);
    }).catch(() => {
    });
  }, [e]), x = a === "dark", v = e.split(`
`);
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": c,
      "data-language": t,
      "data-theme": a,
      className: d(
        "relative rounded-lg border font-mono text-[13px] leading-relaxed overflow-hidden",
        x ? "bg-slate-800 text-slate-100 border-slate-700" : "bg-slate-50 text-slate-900 border-slate-200",
        l
      ),
      style: s,
      "aria-label": u ?? `Code (${t})`,
      children: [
        o && /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            onClick: k,
            "aria-label": f ? "Copied" : "Copy code",
            className: d(
              "absolute top-2 right-2 text-[11px] px-2 py-1 rounded border transition-opacity",
              x ? "bg-slate-700 text-slate-100 border-slate-600 hover:bg-slate-600" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            ),
            "data-copied": f ? "true" : "false",
            children: f ? "Copied" : "Copy"
          }
        ),
        /* @__PURE__ */ r("pre", { className: "m-0 px-4 py-3 overflow-x-auto", children: n ? /* @__PURE__ */ i("div", { className: "flex", children: [
          /* @__PURE__ */ r(
            "div",
            {
              className: d(
                "select-none pr-3 text-right",
                x ? "text-slate-500" : "text-slate-400"
              ),
              "aria-hidden": "true",
              children: v.map((g, p) => /* @__PURE__ */ r("div", { children: p + 1 }, p))
            }
          ),
          /* @__PURE__ */ r(
            "code",
            {
              className: "flex-1 block",
              dangerouslySetInnerHTML: { __html: Y(e, t, a) }
            }
          )
        ] }) : /* @__PURE__ */ r(
          "code",
          {
            className: "block",
            dangerouslySetInnerHTML: { __html: Y(e, t, a) }
          }
        ) })
      ]
    }
  );
}
const ae = se(null);
function U() {
  const e = ie(ae);
  if (!e)
    throw new Error(
      "useCommandPalette must be used inside a <CommandPaletteProvider>."
    );
  return e;
}
function Dt() {
  const { open: e, close: t, toggle: a, isOpen: o, query: n } = U();
  return { open: e, close: t, toggle: a, isOpen: o, query: n };
}
function Te(e, t) {
  const a = t.toLowerCase().split("+").map((b) => b.trim()).filter(Boolean);
  if (a.length === 0) return !1;
  const o = a[a.length - 1], n = new Set(a.slice(0, -1)), l = n.has("cmd") || n.has("meta"), s = n.has("ctrl"), c = n.has("mod"), u = n.has("shift"), f = n.has("alt");
  if (c) {
    if (!e.metaKey && !e.ctrlKey) return !1;
  } else if (l !== e.metaKey || s !== e.ctrlKey) return !1;
  return u !== e.shiftKey || f !== e.altKey ? !1 : e.key.toLowerCase() === o;
}
function Bt({
  commands: e,
  getDynamicCommands: t,
  children: a
}) {
  const [o, n] = E(!1), [l, s] = E(""), [c, u] = E(
    () => /* @__PURE__ */ new Map()
  ), f = T(() => n(!0), []), b = T(() => {
    n(!1), s("");
  }, []), k = T(() => n((h) => !h), []), x = T((h) => {
    u((N) => {
      const m = new Map(N);
      return m.set(h.id, h), m;
    });
  }, []), v = T((h) => {
    u((N) => {
      if (!N.has(h)) return N;
      const m = new Map(N);
      return m.delete(h), m;
    });
  }, []);
  $(() => {
    const h = (N) => {
      (N.metaKey || N.ctrlKey) && N.key.toLowerCase() === "k" && (N.preventDefault(), n((m) => !m));
    };
    return window.addEventListener("keydown", h, !0), () => window.removeEventListener("keydown", h, !0);
  }, []);
  const g = M(() => {
    const h = t ? t(l) : [];
    return [...e ?? [], ...h, ...c.values()].filter((m) => m.when ? m.when() : !0);
  }, [e, t, l, c]), p = O(g);
  p.current = g, $(() => {
    const h = (N) => {
      if (!((N.metaKey || N.ctrlKey) && N.key.toLowerCase() === "k")) {
        for (const m of p.current)
          if (m.hotkey && Te(N, m.hotkey)) {
            N.preventDefault(), Promise.resolve().then(() => m.run());
            return;
          }
      }
    };
    return window.addEventListener("keydown", h), () => window.removeEventListener("keydown", h);
  }, []);
  const w = {
    open: f,
    close: b,
    toggle: k,
    isOpen: o,
    query: l,
    setQuery: s,
    mergedCommands: g,
    registerCommand: x,
    unregisterCommand: v
  };
  return /* @__PURE__ */ r(ae.Provider, { value: w, children: a });
}
function Pt(e) {
  const { registerCommand: t, unregisterCommand: a } = U();
  $(() => (t(e), () => a(e.id)), [e, t, a]);
}
function Ae(e) {
  const t = /* @__PURE__ */ new Map();
  for (const a of e) {
    const o = a.group ?? null, n = t.get(o);
    n ? n.push(a) : t.set(o, [a]);
  }
  return Array.from(t.entries()).map(([a, o]) => ({
    groupName: a,
    items: o
  }));
}
function It({
  placeholder: e = "Type a command or search…",
  emptyState: t,
  className: a
} = {}) {
  const { isOpen: o, close: n, query: l, setQuery: s, mergedCommands: c } = U(), u = M(() => Ae(c), [c]), f = T(
    (b) => {
      n(), Promise.resolve().then(() => b.run());
    },
    [n]
  );
  return /* @__PURE__ */ r(
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
            /* @__PURE__ */ r(
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
              /* @__PURE__ */ r(j.Empty, { className: "px-3 py-6 text-center text-sm text-text-tertiary", children: t ?? "No results." }),
              u.map(({ groupName: b, items: k }) => /* @__PURE__ */ r(
                j.Group,
                {
                  heading: b ?? void 0,
                  children: k.map((x) => /* @__PURE__ */ i(
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
                        x.icon && /* @__PURE__ */ r("span", { className: "shrink-0 text-text-secondary", children: x.icon }),
                        /* @__PURE__ */ r("span", { className: "flex-1 truncate", children: x.label }),
                        x.hint && /* @__PURE__ */ r("span", { className: "text-xs text-text-tertiary truncate", children: x.hint }),
                        x.shortcut && x.shortcut.length > 0 && /* @__PURE__ */ r("span", { className: "flex items-center gap-1 shrink-0", children: x.shortcut.map((v, g) => /* @__PURE__ */ r(
                          "kbd",
                          {
                            className: d(
                              "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1",
                              "text-[10px] font-mono font-medium",
                              "bg-surface-hover text-text-secondary",
                              "border border-border rounded"
                            ),
                            children: v
                          },
                          `${x.id}-kbd-${g}`
                        )) })
                      ]
                    },
                    x.id
                  ))
                },
                b ?? "__ungrouped__"
              ))
            ] })
          ]
        }
      )
    }
  );
}
function Kt({ className: e } = {}) {
  const { toggle: t } = U();
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      onClick: t,
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
        /* @__PURE__ */ r("kbd", { className: "font-mono text-[11px]", children: "⌘K" }),
        /* @__PURE__ */ r("span", { children: "Search" })
      ]
    }
  );
}
function G(e) {
  if (e === "right") return "text-right";
  if (e === "center") return "text-center";
}
function Ht({
  data: e,
  columns: t,
  keyField: a,
  onRowClick: o,
  rowActions: n,
  searchable: l = !1,
  searchPlaceholder: s = "Search…",
  pageSize: c,
  emptyMessage: u = "No records.",
  loading: f = !1,
  loadingRows: b = 5,
  className: k,
  "data-testid": x
}) {
  const [v, g] = E(null), [p, w] = E("asc"), [h, N] = E(""), [m, C] = E(0), I = (y) => {
    v === y ? w((L) => L === "asc" ? "desc" : "asc") : (g(y), w("asc"));
  }, _ = M(() => {
    if (!l || h.trim() === "") return e;
    const y = h.trim().toLowerCase();
    return e.filter(
      (L) => t.some((S) => S.filterable === !1 ? !1 : (S.getFilterText ? S.getFilterText(L) : String(L[S.key] ?? "")).toLowerCase().includes(y))
    );
  }, [e, t, h, l]), A = M(() => {
    if (!v) return _;
    const y = t.find((R) => R.key === v);
    if (!y || !y.sortable) return _;
    const L = y.compare ?? ((R, H) => {
      const oe = String(R[y.key] ?? ""), le = String(H[y.key] ?? "");
      return oe.localeCompare(le);
    }), S = [..._];
    return S.sort((R, H) => p === "asc" ? L(R, H) : -L(R, H)), S;
  }, [_, t, v, p]), K = c && c > 0 ? Math.max(1, Math.ceil(A.length / c)) : 1, B = Math.min(m, K - 1), V = M(() => {
    if (!c || c <= 0) return A;
    const y = B * c;
    return A.slice(y, y + c);
  }, [A, c, B]);
  return /* @__PURE__ */ i("div", { className: d("flex flex-col gap-3", k), "data-testid": x, children: [
    l && /* @__PURE__ */ r(
      "input",
      {
        type: "text",
        value: h,
        onChange: (y) => {
          N(y.target.value), C(0);
        },
        placeholder: s,
        "aria-label": "Search",
        "data-testid": "datatable-search",
        className: "w-full max-w-xs rounded-md border border-border-field bg-surface px-3 py-1.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none"
      }
    ),
    /* @__PURE__ */ i(ue, { className: "border border-border rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ r(pe, { children: /* @__PURE__ */ i("tr", { children: [
        t.map((y) => {
          const L = y.sortable && v === y.key;
          return /* @__PURE__ */ r(
            q,
            {
              sortable: y.sortable,
              sortDirection: L ? p : null,
              style: y.width ? { width: y.width } : void 0,
              className: d(G(y.align), y.className),
              onClick: y.sortable ? () => I(y.key) : void 0,
              "data-testid": y.sortable ? `datatable-header-${y.key}` : void 0,
              children: y.header
            },
            y.key
          );
        }),
        n && /* @__PURE__ */ r(q, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ r(fe, { children: f ? Array.from({ length: b }).map((y, L) => /* @__PURE__ */ i(W, { "data-testid": "datatable-loading-row", children: [
        t.map((S) => /* @__PURE__ */ r(P, { className: G(S.align), children: /* @__PURE__ */ r("div", { className: "h-4 w-3/4 animate-pulse rounded bg-slate-100" }) }, S.key)),
        n && /* @__PURE__ */ r(P, { className: "text-right", children: /* @__PURE__ */ r("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-slate-100" }) })
      ] }, `skeleton-${L}`)) : V.length === 0 ? /* @__PURE__ */ r(W, { children: /* @__PURE__ */ r(
        P,
        {
          colSpan: t.length + (n ? 1 : 0),
          className: "text-center text-text-secondary py-8",
          children: u
        }
      ) }) : V.map((y, L) => /* @__PURE__ */ i(
        W,
        {
          clickable: !!o,
          onClick: o ? () => o(y) : void 0,
          children: [
            t.map((S) => /* @__PURE__ */ r(
              P,
              {
                className: d(G(S.align), S.className),
                children: S.render ? S.render(y, L) : String(y[S.key] ?? "")
              },
              S.key
            )),
            n && /* @__PURE__ */ r(P, { className: "text-right", onClick: (S) => S.stopPropagation(), children: /* @__PURE__ */ r("div", { className: "flex items-center justify-end gap-2", children: n(y) }) })
          ]
        },
        a(y)
      )) })
    ] }),
    c && c > 0 && A.length > c && /* @__PURE__ */ i("div", { className: "flex items-center justify-between text-xs text-text-secondary", children: [
      /* @__PURE__ */ i("span", { "data-testid": "datatable-page-summary", children: [
        "Page ",
        B + 1,
        " of ",
        K,
        " · ",
        A.length,
        " total"
      ] }),
      /* @__PURE__ */ i("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            onClick: () => C((y) => Math.max(0, y - 1)),
            disabled: B === 0,
            "data-testid": "datatable-prev",
            className: "rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50",
            children: "Prev"
          }
        ),
        /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            onClick: () => C((y) => Math.min(K - 1, y + 1)),
            disabled: B >= K - 1,
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
  title: t,
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
        e && (typeof e == "string" ? /* @__PURE__ */ r("div", { className: "text-[52px] mb-2", "aria-hidden": !0, children: e }) : /* @__PURE__ */ r("div", { className: "mb-2", children: e })),
        /* @__PURE__ */ r("div", { className: "text-[17px] font-semibold text-[var(--color-state-error,#dc2626)]", children: t }),
        f && /* @__PURE__ */ r("div", { className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal", children: f }),
        s ? /* @__PURE__ */ r("div", { className: "mt-2.5", children: s }) : n && l && /* @__PURE__ */ r(
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
const _e = {
  sm: "w-[14px] h-[14px]",
  md: "w-[20px] h-[20px]",
  lg: "w-[28px] h-[28px]"
};
function Re({
  size: e = "md",
  color: t,
  className: a,
  style: o,
  "aria-label": n = "Loading",
  "data-testid": l
}) {
  const s = t ?? "var(--color-primary)";
  return /* @__PURE__ */ r(
    "div",
    {
      role: "status",
      "aria-label": n,
      "data-testid": l,
      className: d(
        "inline-block rounded-full border-2 border-transparent animate-spin",
        _e[e],
        a
      ),
      style: { borderTopColor: s, ...o }
    }
  );
}
function Ut({
  label: e = "Loading…",
  description: t,
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
        /* @__PURE__ */ r(Re, { size: a, color: o, "aria-label": e }),
        /* @__PURE__ */ r("div", { className: "text-[15px] font-medium text-text-primary", children: e }),
        t && /* @__PURE__ */ r("div", { className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal", children: t })
      ]
    }
  );
}
function Wt({
  label: e,
  hint: t,
  error: a,
  required: o = !1,
  layout: n = "stacked",
  children: l,
  className: s,
  style: c,
  "data-testid": u
}) {
  const f = ee(), b = `${f}-label`, k = t || a ? `${f}-desc` : void 0, x = {
    id: f,
    labelId: b,
    "aria-describedby": k,
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
            id: b,
            htmlFor: f,
            className: d(
              "text-[12px] font-medium",
              n === "inline" ? "min-w-[140px]" : "",
              a ? "text-[#991b1b]" : "text-gray-700"
            ),
            children: [
              e,
              o && /* @__PURE__ */ r("span", { className: "ml-0.5 text-[#991b1b]", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ i("div", { className: d(n === "inline" ? "flex-1" : ""), children: [
          l(x),
          (t || a) && /* @__PURE__ */ r(
            "div",
            {
              id: k,
              className: d(
                "mt-1 text-[11px]",
                a ? "text-[#991b1b]" : "text-gray-500"
              ),
              children: a ?? t
            }
          )
        ] })
      ]
    }
  );
}
const Me = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm"
};
function Oe(e) {
  switch (e) {
    case "underline":
      return "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
    case "pill":
      return "inline-flex items-center gap-1";
    case "segmented":
      return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5";
  }
}
function je(e, t, a) {
  return e === "underline" ? d(
    "-mb-px border-b-2 rounded-none",
    t ? "border-[var(--color-primary)] text-[var(--color-text-primary)]" : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
    a && "opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]"
  ) : e === "pill" ? d(
    "rounded-full",
    t ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]",
    a && "opacity-50 cursor-not-allowed hover:bg-transparent"
  ) : d(
    "rounded-md",
    t ? "bg-white shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]",
    a && "opacity-50 cursor-not-allowed hover:bg-transparent"
  );
}
function Gt({
  items: e,
  value: t,
  onValueChange: a,
  variant: o = "underline",
  size: n = "md",
  className: l,
  style: s,
  "aria-label": c,
  idPrefix: u
}) {
  const f = ee(), b = u ?? f, k = O(/* @__PURE__ */ new Map()), x = M(() => e.filter((p) => !p.disabled).map((p) => p.id), [e]), v = T((p) => {
    k.current.get(p)?.focus();
  }, []), g = T(
    (p, w) => {
      if (x.length === 0) return;
      const h = x.indexOf(w);
      let N = null;
      switch (p.key) {
        case "ArrowRight":
        case "ArrowDown":
          N = h === -1 ? 0 : (h + 1) % x.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          N = h === -1 ? x.length - 1 : (h - 1 + x.length) % x.length;
          break;
        case "Home":
          N = 0;
          break;
        case "End":
          N = x.length - 1;
          break;
        case "Enter":
        case " ":
          p.preventDefault(), a(w);
          return;
        default:
          return;
      }
      if (N !== null) {
        p.preventDefault();
        const m = x[N];
        a(m), v(m);
      }
    },
    [x, a, v]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      role: "tablist",
      "aria-label": c,
      className: d(Oe(o), l),
      style: s,
      children: e.map((p) => {
        const w = p.id === t;
        return /* @__PURE__ */ i(
          "button",
          {
            ref: (h) => {
              h ? k.current.set(p.id, h) : k.current.delete(p.id);
            },
            type: "button",
            role: "tab",
            id: `${b}-tab-${p.id}`,
            "aria-controls": `${b}-panel-${p.id}`,
            "aria-selected": w,
            "aria-disabled": p.disabled || void 0,
            tabIndex: w ? 0 : -1,
            disabled: p.disabled,
            onClick: () => !p.disabled && a(p.id),
            onKeyDown: (h) => g(h, p.id),
            className: d(
              "inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer",
              Me[n],
              je(o, w, !!p.disabled)
            ),
            children: [
              p.icon,
              /* @__PURE__ */ r("span", { children: p.label }),
              p.badge !== void 0 && p.badge !== null && /* @__PURE__ */ r(
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
function zt({ id: e, when: t, idPrefix: a, className: o, style: n, children: l }) {
  return e !== t ? null : /* @__PURE__ */ r(
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
function Be(e) {
  return e.tone ?? (e.direction === "up" ? "positive" : "negative");
}
function Vt({
  label: e,
  value: t,
  accent: a = !1,
  danger: o = !1,
  hint: n,
  delta: l,
  sparklineData: s,
  to: c,
  as: u,
  onClick: f,
  mono: b = !1,
  className: k,
  style: x,
  "data-testid": v
}) {
  const g = d(
    "block rounded-lg border p-3 no-underline transition-colors",
    !a && !o && "bg-[var(--color-surface)] border-[var(--color-border)]",
    a && "bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]",
    o && "bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]",
    (c || f) && "hover:bg-[var(--color-surface-hover)] cursor-pointer",
    k
  ), p = s && s.length > 0 ? s : null;
  let w = null;
  if (l) {
    const N = Be(l), m = l.direction === "up" ? "▲" : "▼", C = l.direction === "up" ? "+" : "-", I = l.suffix ?? "%", _ = Math.abs(l.value), A = l["aria-label"] ?? `${l.direction} ${_}${I}`;
    w = /* @__PURE__ */ i(
      "div",
      {
        "data-testid": "stat-card-delta",
        "data-direction": l.direction,
        "data-tone": N,
        "aria-label": A,
        className: d("mt-1 text-[12px] font-medium leading-tight", De[N]),
        children: [
          /* @__PURE__ */ i("span", { "aria-hidden": "true", children: [
            m,
            " "
          ] }),
          C,
          _,
          I
        ]
      }
    );
  }
  const h = /* @__PURE__ */ i(D, { children: [
    /* @__PURE__ */ r("div", { className: "text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]", children: e }),
    /* @__PURE__ */ i("div", { className: "mt-1 flex items-center gap-2", children: [
      /* @__PURE__ */ r(
        "div",
        {
          className: d(
            "text-[24px] font-bold leading-tight text-[var(--color-text-primary)]",
            b && "font-mono"
          ),
          children: t
        }
      ),
      p && /* @__PURE__ */ r(xe, { data: p, width: 80, height: 20 })
    ] }),
    w,
    n != null && /* @__PURE__ */ r("div", { className: "mt-1 text-[11px] italic text-[var(--color-text-tertiary)]", children: n })
  ] });
  return c ? u ? /* @__PURE__ */ r(u, { to: c, "data-testid": v, className: g, style: x, children: h }) : /* @__PURE__ */ r("a", { href: c, "data-testid": v, className: g, style: x, children: h }) : f ? /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      onClick: f,
      "data-testid": v,
      className: d(g, "w-full text-left"),
      style: x,
      children: h
    }
  ) : /* @__PURE__ */ r("div", { "data-testid": v, className: g, style: x, children: h });
}
const Pe = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4"
};
function qt({
  children: e,
  columns: t = 4,
  dense: a = !1,
  className: o,
  style: n,
  "data-testid": l = "kpi-grid"
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-testid": l,
      className: d(
        "grid grid-cols-1",
        Pe[t],
        a ? "gap-2" : "gap-4",
        o
      ),
      style: n,
      children: e
    }
  );
}
const Ie = {
  sm: "h-1.5",
  md: "h-2"
};
function Yt({
  value: e,
  max: t = 100,
  color: a,
  size: o = "md",
  label: n,
  showRatio: l = !0,
  className: s,
  style: c,
  "data-testid": u,
  "aria-label": f
}) {
  const b = t > 0 ? t : 100, k = Math.max(0, Math.min(e, b)), x = Math.min(100, k / b * 100), v = a ?? "var(--color-primary)";
  return /* @__PURE__ */ i("div", { "data-testid": u, className: d("w-full", s), style: c, children: [
    n != null && /* @__PURE__ */ i("div", { className: "flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]", children: [
      /* @__PURE__ */ r("span", { children: n }),
      /* @__PURE__ */ r("span", { className: "text-[var(--color-text-tertiary)] tabular-nums", children: l ? `${k}/${b}` : `${Math.round(x)}%` })
    ] }),
    /* @__PURE__ */ r(
      "div",
      {
        role: "progressbar",
        "aria-valuenow": k,
        "aria-valuemin": 0,
        "aria-valuemax": b,
        "aria-label": f,
        className: d(
          "w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]",
          Ie[o]
        ),
        children: /* @__PURE__ */ r(
          "div",
          {
            className: "h-full rounded-full transition-all duration-300",
            style: { width: `${x}%`, background: v }
          }
        )
      }
    )
  ] });
}
const Ke = {
  online: "var(--color-success, #22c55e)",
  away: "var(--color-state-pending, #f59e0b)",
  busy: "var(--color-state-error, #ef4444)",
  offline: "var(--color-text-tertiary, #94a3b8)",
  unknown: "var(--color-text-tertiary, #94a3b8)"
}, He = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
  unknown: "Unknown presence"
};
function Fe({
  state: e,
  ariaLabel: t,
  label: a,
  pulse: o,
  size: n = "sm",
  className: l,
  style: s,
  title: c,
  "data-testid": u
}) {
  const f = o ?? e === "online", b = t ?? He[e];
  return /* @__PURE__ */ r(
    te,
    {
      color: Ke[e],
      pulse: f,
      size: n,
      label: a,
      className: l,
      style: s,
      title: c,
      "data-testid": u ?? `presence-${e}`,
      "aria-label": b
    }
  );
}
function Qt({
  name: e,
  label: t,
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
        /* @__PURE__ */ r(z, { name: e, size: a, color: o }),
        /* @__PURE__ */ r("span", { className: "font-medium leading-none", children: t ?? e }),
        n && /* @__PURE__ */ r(Fe, { state: n, size: "xs" })
      ]
    }
  );
}
const Ue = {
  sm: "px-2.5 py-0.5 text-[11px]",
  xs: "px-2 py-px text-[10px]"
}, We = "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis)]", Ge = "bg-[var(--color-primary)] border-[var(--color-primary)] text-white hover:opacity-90", ze = "border-[var(--color-border-emphasis)] text-[var(--color-text-primary)]";
function Jt({
  active: e,
  onClick: t,
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
      onClick: t,
      disabled: c,
      "aria-pressed": e,
      className: d(
        "inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors cursor-pointer select-none",
        Ue[n],
        e ? u ? ze : Ge : We,
        c && "opacity-50 cursor-not-allowed",
        s
      ),
      style: f,
      children: [
        o && /* @__PURE__ */ r(
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
const Ve = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm"
}, qe = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", Ye = "bg-white shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]";
function Zt({
  options: e,
  value: t,
  onChange: a,
  size: o = "md",
  className: n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      role: "group",
      className: d(
        "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5",
        n
      ),
      children: e.map((l) => {
        const s = l.value === t;
        return /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: () => a(l.value),
            "aria-pressed": s,
            className: d(
              "inline-flex items-center gap-1.5 rounded-md font-medium transition-all cursor-pointer",
              Ve[o],
              s ? Ye : qe
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
function Xt({
  label: e,
  id: t,
  href: a,
  mono: o = !1,
  className: n,
  labelClassName: l
}) {
  const s = /* @__PURE__ */ r("span", { className: "truncate", children: e });
  return /* @__PURE__ */ i("div", { className: d("flex flex-col min-w-0", n), children: [
    /* @__PURE__ */ r(
      "div",
      {
        className: d(
          "font-medium text-[var(--color-text-primary)] truncate text-sm",
          l
        ),
        children: a ? /* @__PURE__ */ r(
          "a",
          {
            href: a,
            className: "hover:text-[var(--color-primary)] hover:underline",
            children: s
          }
        ) : s
      }
    ),
    t && /* @__PURE__ */ r(
      "div",
      {
        className: d(
          "text-[10px] font-mono text-[var(--color-text-tertiary)] truncate mt-0.5",
          o && "tracking-tight"
        ),
        children: t
      }
    )
  ] });
}
const Qe = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function er({
  open: e,
  onClose: t,
  title: a,
  subtitle: o,
  width: n = 460,
  children: l,
  footer: s,
  "data-testid": c
}) {
  const u = O(null);
  return $(() => {
    if (!e) return;
    const f = (b) => {
      b.key === "Escape" && t();
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [e, t]), $(() => {
    if (!e) return;
    const f = u.current;
    if (!f) return;
    const b = f.querySelector(Qe);
    b ? b.focus() : (f.setAttribute("tabindex", "-1"), f.focus());
  }, [e]), e ? re(
    /* @__PURE__ */ i("div", { className: "fixed inset-0 z-[9000]", "data-testid": c, children: [
      /* @__PURE__ */ r(
        "div",
        {
          className: "absolute inset-0 bg-black/30 backdrop-blur-[1px]",
          onClick: t,
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
                a && /* @__PURE__ */ r("h2", { className: "text-base font-semibold text-[var(--color-text-primary)]", children: a }),
                o && /* @__PURE__ */ r("p", { className: "text-sm text-[var(--color-text-secondary)] mt-0.5", children: o })
              ] }),
              /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: t,
                  className: "ml-4 flex-shrink-0 p-1 rounded hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors",
                  "aria-label": "Close",
                  children: /* @__PURE__ */ r("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ r(
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
            /* @__PURE__ */ r("div", { className: "flex-1 overflow-y-auto p-5", children: l }),
            s && /* @__PURE__ */ r("div", { className: "flex-shrink-0 border-t border-[var(--color-border)] p-4 bg-[var(--color-surface-inset,#f8fafc)]", children: s })
          ]
        }
      )
    ] }),
    document.body
  ) : null;
}
function Je(e, t) {
  if (!e || typeof window > "u") return t;
  try {
    const a = window.localStorage.getItem(e);
    return a === null ? t : a === "true";
  } catch {
    return t;
  }
}
function tr({
  title: e,
  defaultOpen: t = !1,
  badge: a,
  children: o,
  className: n,
  storageKey: l
}) {
  const [s, c] = E(
    () => Je(l, t)
  );
  return $(() => {
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
              /* @__PURE__ */ r("span", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: e }),
              /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
                a,
                /* @__PURE__ */ r(
                  "svg",
                  {
                    className: d(
                      "w-4 h-4 text-[var(--color-text-tertiary)] transition-transform",
                      s && "rotate-180"
                    ),
                    viewBox: "0 0 16 16",
                    fill: "none",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ r(
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
        s && /* @__PURE__ */ r("div", { className: "border-t border-[var(--color-border)] bg-white", children: o })
      ]
    }
  );
}
function rr({
  value: e,
  onChange: t,
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
              /* @__PURE__ */ r(
                "circle",
                {
                  cx: "7",
                  cy: "7",
                  r: "4.5",
                  stroke: "currentColor",
                  strokeWidth: "1.5"
                }
              ),
              /* @__PURE__ */ r(
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
        /* @__PURE__ */ r(
          "input",
          {
            type: "text",
            value: e,
            onChange: (u) => t(u.target.value),
            placeholder: a ?? "Search…",
            autoFocus: s,
            "aria-label": c,
            className: "w-full pl-8 pr-7 py-1.5 text-sm rounded-md border border-[var(--color-border-field,#d1d5db)] bg-white text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors"
          }
        ),
        e && /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            onClick: () => {
              t(""), o?.();
            },
            className: "absolute right-2 p-0.5 rounded text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]",
            "aria-label": "Clear search",
            children: /* @__PURE__ */ r("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ r(
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
const Ze = {
  error: "bg-[var(--color-danger-bg,#fef2f2)] border-[var(--color-danger,#dc2626)] text-[var(--color-danger,#dc2626)]",
  success: "bg-[var(--color-success-bg,#f0fdf4)] border-[var(--color-success,#16a34a)] text-[var(--color-success,#16a34a)]",
  info: "bg-[var(--color-info-bg,#eff6ff)] border-[var(--color-info,#2563eb)] text-[var(--color-info,#2563eb)]",
  warning: "bg-[var(--color-warning-bg,#fffbeb)] border-[var(--color-warning,#f59e0b)] text-[var(--color-warning,#f59e0b)]"
};
function ar({ tone: e, children: t, onDismiss: a, className: o }) {
  return /* @__PURE__ */ i(
    "div",
    {
      role: e === "error" || e === "warning" ? "alert" : "status",
      "aria-live": e === "error" || e === "warning" ? "assertive" : "polite",
      className: d(
        "flex items-start gap-2 px-3 py-2 rounded-md border-l-[3px] text-sm",
        Ze[e],
        o
      ),
      children: [
        /* @__PURE__ */ r("span", { className: "flex-1", children: t }),
        a && /* @__PURE__ */ r(
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
function nr({
  title: e,
  description: t,
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
          /* @__PURE__ */ r(
            "svg",
            {
              width: "12",
              height: "12",
              viewBox: "0 0 12 12",
              fill: "none",
              "aria-hidden": "true",
              children: /* @__PURE__ */ r(
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
        /* @__PURE__ */ r("h1", { className: "text-xl font-semibold text-[var(--color-text-primary)] leading-tight", children: e }),
        n
      ] }),
      a && /* @__PURE__ */ r("div", { className: "flex-shrink-0 flex items-center gap-2", children: a })
    ] }),
    t && /* @__PURE__ */ r("p", { className: "text-sm text-[var(--color-text-secondary)]", children: t })
  ] });
}
function F({ size: e = "md", color: t, className: a }) {
  const o = e === "sm" ? 4 : 6, n = t || "var(--color-text-tertiary, #94a3b8)";
  return /* @__PURE__ */ i(D, { children: [
    /* @__PURE__ */ r("style", { children: `
        @keyframes thinkDot {
          0%, 80%, 100% { transform: scale(1); opacity: 0.4; }
          40% { transform: scale(1.3); opacity: 1; }
        }
      ` }),
    /* @__PURE__ */ r("span", { className: d("inline-flex items-center gap-1", a), children: [0, 1, 2].map((l) => /* @__PURE__ */ r(
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
function Xe(e) {
  if (e.length === 0) return "";
  if (e.length === 1) return `${e[0]} is typing…`;
  if (e.length === 2) return `${e[0]} and ${e[1]} are typing…`;
  const t = e.length - 2;
  return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing…`;
}
function or({
  names: e,
  compact: t = !1,
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
        /* @__PURE__ */ r(F, { size: o, color: a }),
        !t && /* @__PURE__ */ r("span", { children: Xe(e) })
      ]
    }
  );
}
const et = {
  idle: { label: "Idle", colorClass: "text-[#6b7280]" },
  connecting: { label: "Connecting…", colorClass: "text-[#f59e0b]" },
  connected: { label: "Connected", colorClass: "text-[#10b981]" },
  reconnecting: { label: "Reconnecting…", colorClass: "text-[#f59e0b]" },
  disconnected: { label: "Disconnected", colorClass: "text-[#ef4444]" }
};
function lr({
  state: e,
  compact: t = !1,
  withLabel: a = !0,
  labels: o,
  className: n,
  "data-testid": l = "connection-pill"
}) {
  const s = et[e], c = o?.[e] ?? s.label, u = a && !t;
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
        /* @__PURE__ */ r("span", { "aria-hidden": "true", className: s.colorClass, children: "⬤" }),
        u && /* @__PURE__ */ r("span", { className: d(s.colorClass, "font-semibold"), children: c })
      ]
    }
  );
}
const Q = {
  debug: "DEBUG",
  info: "INFO",
  warn: "WARN",
  error: "ERROR"
}, tt = {
  debug: "text-[var(--color-text-tertiary)]",
  info: "text-[var(--color-info,#3b82f6)]",
  warn: "text-[var(--color-warning,#d97706)]",
  error: "text-[var(--color-danger,#dc2626)]"
};
function rt({
  lines: e,
  follow: t = !0,
  showTimestamp: a = !0,
  showLevel: o = !0,
  showSource: n = !0,
  title: l = "Log stream",
  headerSlot: s,
  emptyMessage: c = "No log lines yet.",
  maxHeight: u,
  onClear: f,
  className: b,
  style: k,
  "data-testid": x = "log-stream"
}) {
  const v = O(null), [g, p] = E(!1);
  $(() => {
    if (!t || g) return;
    const m = v.current;
    m && (m.scrollTop = m.scrollHeight);
  }, [e, t, g]);
  const w = () => {
    const m = v.current;
    if (!m) return;
    const C = m.scrollHeight - m.scrollTop - m.clientHeight < 24;
    p(!C);
  }, h = () => {
    const m = v.current;
    m && (m.scrollTop = m.scrollHeight, p(!1));
  }, N = /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
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
    f && /* @__PURE__ */ r(
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
      className: d("flex flex-col", b),
      style: k,
      children: [
        l !== null && /* @__PURE__ */ r("div", { className: "px-4 py-3 border-b border-[var(--color-border)]", children: /* @__PURE__ */ r(me, { title: l, meta: s ?? N }) }),
        /* @__PURE__ */ i("div", { className: "relative flex-1 min-h-0 flex", children: [
          /* @__PURE__ */ r(
            "div",
            {
              ref: v,
              onScroll: w,
              role: "log",
              "aria-live": t ? "polite" : "off",
              "data-testid": `${x}-scroll`,
              className: d(
                "flex-1 overflow-y-auto",
                "font-mono text-[12px] leading-[1.55]",
                "bg-[var(--color-surface-subtle,#0b1020)] text-[var(--color-text-primary,#e5e7eb)]",
                "py-2"
              ),
              style: { maxHeight: u },
              children: e.length === 0 ? /* @__PURE__ */ r(
                "div",
                {
                  "data-testid": `${x}-empty`,
                  className: "px-3 py-6 text-center text-[11px] text-[var(--color-text-tertiary)]",
                  children: c
                }
              ) : e.map((m) => {
                const C = m.level ?? "info";
                return /* @__PURE__ */ i(
                  "div",
                  {
                    role: "listitem",
                    "data-testid": `${x}-line`,
                    "data-level": m.level || void 0,
                    className: "flex items-baseline gap-2 px-3 hover:bg-[var(--color-surface,rgba(255,255,255,0.04))]",
                    children: [
                      a && m.timestamp && /* @__PURE__ */ r("span", { className: "shrink-0 text-[var(--color-text-tertiary)] tabular-nums", children: m.timestamp }),
                      o && m.level && /* @__PURE__ */ r(
                        "span",
                        {
                          className: d(
                            "shrink-0 font-semibold uppercase text-[10px] w-[44px]",
                            tt[C]
                          ),
                          "aria-label": `level ${Q[C].toLowerCase()}`,
                          children: Q[C]
                        }
                      ),
                      n && m.source && /* @__PURE__ */ i("span", { className: "shrink-0 text-[var(--color-text-secondary)]", children: [
                        "[",
                        m.source,
                        "]"
                      ] }),
                      /* @__PURE__ */ r("span", { className: "flex-1 whitespace-pre-wrap break-words", children: m.message })
                    ]
                  },
                  m.id
                );
              })
            }
          ),
          t && g && /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              "data-testid": `${x}-jump`,
              onClick: h,
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
const sr = rt;
function ir({
  title: e,
  description: t,
  category: a,
  categoryTone: o = "neutral",
  thumbnail: n,
  icon: l = "🧩",
  thumbnailHeight: s = 160,
  href: c,
  onClick: u,
  badge: f,
  meta: b,
  className: k,
  style: x,
  "data-testid": v = "thumbnail-card"
}) {
  const p = d(
    "group block w-full text-left bg-[var(--color-surface,#fff)]",
    "rounded-xl border border-[var(--color-border)] overflow-hidden",
    "transition-[box-shadow,transform] duration-150",
    (c || u) && "cursor-pointer hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-0.5",
    k
  ), w = /* @__PURE__ */ i(D, { children: [
    /* @__PURE__ */ i(
      "div",
      {
        "data-testid": `${v}-thumb`,
        className: d(
          "relative flex items-center justify-center",
          "bg-gradient-to-br from-[var(--color-primary-bg,#eef2ff)] to-[var(--color-surface,#ffffff)]",
          "border-b border-[var(--color-border)]"
        ),
        style: { height: s },
        children: [
          n ? /* @__PURE__ */ r(
            "img",
            {
              src: n,
              alt: "",
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ r("span", { className: "text-5xl opacity-50", "aria-hidden": !0, children: l }),
          f && /* @__PURE__ */ r(
            "span",
            {
              "data-testid": `${v}-badge`,
              className: "absolute top-2 right-2",
              children: f
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ i("div", { className: "px-4 py-3", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2 mb-1.5", children: [
        a && /* @__PURE__ */ r(ve, { tone: o, size: "xs", "data-testid": `${v}-category`, children: a }),
        b && /* @__PURE__ */ r("span", { className: "ml-auto", children: b })
      ] }),
      /* @__PURE__ */ r("div", { className: "text-[14px] font-semibold text-[var(--color-text-primary)] leading-snug", children: e }),
      t && /* @__PURE__ */ r("div", { className: "mt-1 text-[12px] text-[var(--color-text-secondary)] leading-snug", children: t })
    ] })
  ] });
  return c ? /* @__PURE__ */ r(
    "a",
    {
      href: c,
      onClick: u,
      "data-testid": v,
      className: d(p, "no-underline text-inherit"),
      style: x,
      children: w
    }
  ) : u ? /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      onClick: u,
      "data-testid": v,
      className: d(p, "font-inherit"),
      style: x,
      children: w
    }
  ) : /* @__PURE__ */ r("div", { "data-testid": v, className: p, style: x, children: w });
}
const at = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
};
function cr({
  children: e,
  columns: t = 3,
  dense: a = !1,
  className: o,
  style: n,
  "data-testid": l = "catalog-grid"
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-testid": l,
      "data-columns": t,
      className: d(
        "grid grid-cols-1",
        at[t],
        a ? "gap-3" : "gap-5",
        o
      ),
      style: n,
      children: e
    }
  );
}
const nt = {
  neutral: "bg-slate-50",
  success: "bg-green-50",
  warning: "bg-amber-50",
  danger: "bg-red-50",
  info: "bg-blue-50",
  caution: "bg-orange-50",
  purple: "bg-purple-50"
}, ot = {
  neutral: "border-slate-200",
  success: "border-green-300",
  warning: "border-amber-300",
  danger: "border-red-300",
  info: "border-blue-300",
  caution: "border-orange-300",
  purple: "border-purple-300"
}, lt = {
  neutral: "text-slate-800",
  success: "text-green-800",
  warning: "text-amber-800",
  danger: "text-red-800",
  info: "text-blue-800",
  caution: "text-orange-800",
  purple: "text-purple-800"
};
function st({
  orientation: e,
  variant: t
}) {
  if (t === "none") return null;
  const a = e === "vertical", o = t === "arrow" ? a ? "↓" : "→" : a ? "│" : "─";
  return /* @__PURE__ */ r(
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
function it({
  layers: e,
  orientation: t = "vertical",
  connector: a = "arrow",
  className: o,
  style: n,
  "data-testid": l = "stack-diagram"
}) {
  const s = t === "vertical";
  return /* @__PURE__ */ r(
    "div",
    {
      "data-testid": l,
      "data-orientation": t,
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
                nt[f],
                ot[f],
                !s && "min-w-[140px]"
              ),
              children: [
                /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
                  c.icon != null && /* @__PURE__ */ r("span", { className: "shrink-0 text-[14px] leading-none", "aria-hidden": !0, children: c.icon }),
                  /* @__PURE__ */ r("span", { className: d("text-[12px] font-semibold", lt[f]), children: c.label }),
                  c.meta != null && /* @__PURE__ */ r("span", { className: "ml-auto text-[10px] text-[var(--color-text-tertiary)] shrink-0", children: c.meta })
                ] }),
                c.description != null && /* @__PURE__ */ r("div", { className: "mt-0.5 text-[11px] leading-snug text-[var(--color-text-secondary)]", children: c.description })
              ]
            }
          ),
          u < e.length - 1 && /* @__PURE__ */ r(st, { orientation: t, variant: a })
        ] }, c.id);
      })
    }
  );
}
const dr = it;
function ur({
  value: e,
  onChange: t,
  onSubmit: a,
  disabled: o = !1,
  multiline: n = !1,
  placeholder: l,
  submitLabel: s = "→",
  className: c,
  style: u,
  autoFocus: f,
  maxRows: b = 4
}) {
  const k = !o && e.trim().length > 0, x = () => {
    k && a();
  }, v = (p) => {
    if (p.key === "Enter") {
      if (n && p.shiftKey) return;
      p.preventDefault(), x();
    }
  }, g = d(
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
        n ? /* @__PURE__ */ r(
          "textarea",
          {
            className: g,
            value: e,
            onChange: (p) => t(p.target.value),
            onKeyDown: v,
            disabled: o,
            placeholder: l,
            autoFocus: f,
            rows: 2,
            style: { maxHeight: `${b * 1.5 + 1}rem`, overflowY: "auto" }
          }
        ) : /* @__PURE__ */ r(
          "input",
          {
            type: "text",
            className: g,
            value: e,
            onChange: (p) => t(p.target.value),
            onKeyDown: v,
            disabled: o,
            placeholder: l,
            autoFocus: f
          }
        ),
        /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            onClick: x,
            disabled: !k,
            className: d(
              "px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex-shrink-0",
              k ? "bg-[var(--color-primary)] text-white hover:opacity-90" : "bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] cursor-not-allowed"
            ),
            children: s
          }
        )
      ]
    }
  );
}
function ct({ name: e, done: t, className: a }) {
  return /* @__PURE__ */ i(
    "span",
    {
      className: d(
        "inline-flex items-center gap-1 text-[10.5px] font-mono px-2 py-0.5 rounded-full",
        t ? "bg-[var(--color-success-bg,#f0fdf4)] text-[var(--color-success,#16a34a)]" : "bg-[var(--color-info-bg,#eff6ff)] text-[var(--color-info,#1d4ed8)]",
        a
      ),
      children: [
        e,
        t ? " ✓" : "…"
      ]
    }
  );
}
function dt({ toolCalls: e, className: t }) {
  return /* @__PURE__ */ r("div", { className: d("flex flex-wrap gap-1.5 py-1", t), children: e.map((a) => /* @__PURE__ */ r(ct, { name: a.name, done: a.done }, a.id)) });
}
function pr({
  role: e,
  content: t,
  toolCalls: a,
  streaming: o = !1,
  agentName: n,
  userName: l,
  renderMarkdown: s,
  className: c
}) {
  const u = e === "user" ? l || "You" : n || "Assistant";
  return /* @__PURE__ */ i("div", { className: d("flex flex-col gap-1.5 py-3", c), children: [
    /* @__PURE__ */ r("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]", children: u }),
    a && a.length > 0 && /* @__PURE__ */ r(dt, { toolCalls: a }),
    e === "user" ? /* @__PURE__ */ r("div", { className: "text-sm text-[var(--color-text-primary)] whitespace-pre-wrap", children: t }) : /* @__PURE__ */ r("div", { className: "text-sm text-[var(--color-text-primary)] prose-sm max-w-none", children: t ? s ? s(t) : /* @__PURE__ */ r("span", { className: "whitespace-pre-wrap", children: t }) : o ? /* @__PURE__ */ r(F, {}) : null })
  ] });
}
function fr({
  content: e,
  streaming: t = !1,
  defaultOpen: a = !1,
  className: o
}) {
  const l = t || !e ? "Thinking" : "Thought";
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
          /* @__PURE__ */ r(
            "svg",
            {
              className: "w-3.5 h-3.5 transition-transform group-open:rotate-90",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 20 20",
              fill: "currentColor",
              "aria-hidden": "true",
              children: /* @__PURE__ */ r(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 011.08-1.04l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.08-.04z",
                  clipRule: "evenodd"
                }
              )
            }
          ),
          /* @__PURE__ */ r("span", { className: "text-[11px] font-semibold uppercase tracking-wide", children: l }),
          t && !e && /* @__PURE__ */ r(F, { size: "sm" })
        ] }),
        /* @__PURE__ */ r("div", { className: "px-3 py-2 text-xs text-[var(--color-text-secondary)] italic border-t border-[var(--color-border)] bg-white whitespace-pre-wrap leading-relaxed", children: e || /* @__PURE__ */ r(F, {}) })
      ]
    }
  );
}
function xr({
  prompts: e,
  onSelect: t,
  columns: a,
  title: o,
  className: n
}) {
  const l = a ? `repeat(${a}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(220px, 1fr))";
  return /* @__PURE__ */ i("div", { className: d("flex flex-col gap-3", n), children: [
    o && /* @__PURE__ */ r("p", { className: "text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] text-center", children: o }),
    /* @__PURE__ */ r("div", { style: { display: "grid", gridTemplateColumns: l, gap: 10 }, children: e.map((s, c) => /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => t(s.label),
        className: "flex flex-col gap-1 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis,#cbd5e1)] text-left transition-colors",
        children: [
          /* @__PURE__ */ r("span", { className: "text-sm font-medium text-[var(--color-text-primary)]", children: s.label }),
          s.hint && /* @__PURE__ */ r("span", { className: "text-xs text-[var(--color-text-tertiary)]", children: s.hint })
        ]
      },
      c
    )) })
  ] });
}
function mr({
  suggestions: e,
  onSelect: t,
  onRefresh: a,
  label: o,
  className: n
}) {
  return /* @__PURE__ */ i("div", { className: d("flex items-center flex-wrap gap-1.5 py-2", n), children: [
    o && /* @__PURE__ */ r("span", { className: "text-xs text-[var(--color-text-tertiary)] mr-1", children: o }),
    e.map((l, s) => /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: () => t(l),
        className: "inline-flex items-center px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors",
        children: l
      },
      s
    )),
    a && /* @__PURE__ */ r(
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
function br({
  name: e,
  memberCount: t,
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
            n ? /* @__PURE__ */ r(
              "img",
              {
                src: n,
                alt: e,
                className: "w-9 h-9 rounded-full object-cover"
              }
            ) : /* @__PURE__ */ r(z, { name: e, size: 36 }),
            l !== void 0 && /* @__PURE__ */ r("span", { className: "absolute -bottom-0.5 -right-0.5", children: /* @__PURE__ */ r(
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
              /* @__PURE__ */ r("h2", { className: "text-[15px] font-semibold text-[var(--color-text-primary)] leading-tight truncate", children: e }),
              t !== void 0 && /* @__PURE__ */ i(
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
                    t,
                    " ",
                    t === 1 ? "member" : "members"
                  ]
                }
              )
            ] }),
            a && /* @__PURE__ */ r("p", { className: "text-[12px] text-[var(--color-text-tertiary)] truncate leading-tight", children: a })
          ] })
        ] }),
        o && /* @__PURE__ */ r("div", { className: "flex items-center gap-2 shrink-0", children: o })
      ]
    }
  );
}
function hr({ user: e, items: t, className: a, "data-testid": o }) {
  const [n, l] = E(!1), s = O(null), c = T(() => l(!1), []);
  return $(() => {
    if (!n) return;
    const u = (f) => {
      s.current && !s.current.contains(f.target) && c();
    };
    return document.addEventListener("mousedown", u), () => document.removeEventListener("mousedown", u);
  }, [n, c]), $(() => {
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
              e.avatarUrl ? /* @__PURE__ */ r(
                "img",
                {
                  src: e.avatarUrl,
                  alt: e.name,
                  className: "w-8 h-8 rounded-full object-cover"
                }
              ) : /* @__PURE__ */ r(z, { name: e.name, size: 32 }),
              /* @__PURE__ */ i("div", { className: "flex flex-col items-start text-left min-w-0 hidden sm:flex", children: [
                /* @__PURE__ */ r("span", { className: "text-sm font-medium text-[var(--color-text-primary)] leading-tight truncate max-w-[120px]", children: e.name }),
                /* @__PURE__ */ r("span", { className: "text-xs text-[var(--color-text-tertiary)] leading-tight truncate max-w-[120px]", children: e.email })
              ] }),
              /* @__PURE__ */ r(
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
                  children: /* @__PURE__ */ r("path", { d: "M2 4l4 4 4-4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
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
                /* @__PURE__ */ r("p", { className: "text-sm font-semibold text-[var(--color-text-primary)] truncate", children: e.name }),
                /* @__PURE__ */ r("p", { className: "text-xs text-[var(--color-text-tertiary)] truncate", children: e.email })
              ] }),
              /* @__PURE__ */ r("div", { className: "py-1", children: t.map((u, f) => /* @__PURE__ */ i("div", { children: [
                u.separator && f > 0 && /* @__PURE__ */ r("div", { className: "my-1 border-t border-[var(--color-border)]" }),
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
                      u.icon && /* @__PURE__ */ r("span", { className: "shrink-0 text-base leading-none", "aria-hidden": "true", children: u.icon }),
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
function ut({ item: e, isLast: t }) {
  const a = d(
    "text-sm leading-snug transition-colors duration-100",
    t ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal"
  );
  return t || !e.href && !e.onClick ? /* @__PURE__ */ r("span", { className: a, "aria-current": t ? "page" : void 0, children: e.label }) : e.href ? /* @__PURE__ */ r("a", { href: e.href, onClick: e.onClick, className: d(a, "no-underline"), children: e.label }) : /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      onClick: e.onClick,
      className: d(a, "border-none bg-transparent cursor-pointer font-[inherit] p-0"),
      children: e.label
    }
  );
}
function pt(e, t) {
  if (e.length <= t) return e;
  const a = e.slice(0, 1), o = e.slice(-(t - 2 > 0 ? t - 2 : 1));
  return [...a, null, ...o];
}
function vr({
  items: e,
  separator: t = "/",
  maxItems: a,
  className: o,
  "data-testid": n
}) {
  if (e.length === 0) return null;
  const l = a != null ? pt(e, a) : e;
  return /* @__PURE__ */ r("nav", { "aria-label": "Breadcrumb", "data-testid": n, className: d("flex items-center", o), children: /* @__PURE__ */ r("ol", { className: "flex items-center gap-1 flex-wrap list-none m-0 p-0", children: l.map((s, c) => {
    const u = c === l.length - 1;
    return /* @__PURE__ */ i("li", { className: "flex items-center gap-1", children: [
      s === null ? /* @__PURE__ */ r(
        "span",
        {
          className: "text-sm text-[var(--color-text-tertiary)] select-none",
          "aria-label": "More items",
          title: "Some items are hidden",
          children: "…"
        }
      ) : /* @__PURE__ */ r(ut, { item: s, isLast: u }),
      !u && /* @__PURE__ */ r(
        "span",
        {
          className: "text-[var(--color-text-tertiary)] text-sm select-none",
          "aria-hidden": "true",
          children: t
        }
      )
    ] }, c);
  }) }) });
}
const ft = {
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
function mt({ status: e, colors: t }) {
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
        background: t.bg,
        color: t.text,
        border: `1px solid ${t.border}`,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
        flexShrink: 0
      },
      children: [
        /* @__PURE__ */ r("span", { style: { width: 5, height: 5, borderRadius: "50%", background: t.accent } }),
        e.replace(/_/g, " ")
      ]
    }
  );
}
function gr({
  name: e,
  id: t,
  status: a,
  statusColors: o,
  contributorNames: n = [],
  contributorCount: l,
  activityItems: s = [],
  presenceDotColor: c = "#d1d5db",
  activityLabel: u = "",
  cardIndex: f = 0,
  onClick: b,
  className: k,
  style: x,
  minHeight: v = 190
}) {
  const g = { ...ft, ...o }, p = (a ?? "unknown").toLowerCase().replace(/ /g, "_"), w = g[p] ?? xt, h = l !== void 0 ? Math.max(0, l - n.length) : 0, N = f % 8 * 525;
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      onClick: b,
      className: k,
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
        minHeight: v,
        width: "100%",
        textAlign: "left",
        font: "inherit",
        color: "inherit",
        ...x
      },
      onMouseEnter: (m) => {
        const C = m.currentTarget;
        C.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)", C.style.transform = "translateY(-1px)", C.style.borderColor = w.border;
      },
      onMouseLeave: (m) => {
        const C = m.currentTarget;
        C.style.boxShadow = "none", C.style.transform = "none", C.style.borderColor = "#e5e7eb";
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
                /* @__PURE__ */ r(
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
                t && /* @__PURE__ */ r(
                  "span",
                  {
                    style: {
                      fontSize: 10,
                      fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, monospace',
                      color: "#9ca3af",
                      letterSpacing: "0.02em"
                    },
                    children: t
                  }
                )
              ] }),
              a && /* @__PURE__ */ r(mt, { status: a, colors: w })
            ]
          }
        ),
        /* @__PURE__ */ r(ge, { items: s, staggerMs: N }),
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
                n.length > 0 ? /* @__PURE__ */ r(be, { names: n, maxVisible: 5, size: 24 }) : /* @__PURE__ */ i("span", { style: { fontSize: 12, color: "#9ca3af" }, children: [
                  /* @__PURE__ */ r("strong", { style: { color: "#374151" }, children: l ?? 0 }),
                  " contributors"
                ] }),
                n.length > 0 && h > 0 && /* @__PURE__ */ i("span", { style: { fontSize: 11, color: "#9ca3af" }, children: [
                  "+",
                  h,
                  " more"
                ] })
              ] }),
              u && /* @__PURE__ */ i("div", { style: { display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }, children: [
                /* @__PURE__ */ r(
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
                /* @__PURE__ */ r("span", { style: { fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap" }, children: u })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function bt(e) {
  const t = [], a = /* @__PURE__ */ new Map();
  for (const o of e) {
    const n = o.group ?? null;
    if (n === null) {
      (t.length === 0 || t[0].name !== null) && (t.unshift({ name: null, items: [] }), a.forEach((s, c) => a.set(c, s + 1))), t[0].items.push(o);
      continue;
    }
    let l = a.get(n);
    l === void 0 && (l = t.length, a.set(n, l), t.push({ name: n, items: [] })), t[l].items.push(o);
  }
  return t;
}
function J({
  items: e,
  storageKey: t,
  title: a,
  renderNavItem: o
}) {
  const n = M(() => bt(e), [e]), l = n.some((s) => s.name !== null);
  return /* @__PURE__ */ r("nav", { className: "flex-1 overflow-y-auto py-1", children: l ? n.map(
    (s) => s.name === null ? /* @__PURE__ */ r(Z, { items: s.items, renderNavItem: o }, "__ungrouped") : /* @__PURE__ */ r(
      ht,
      {
        name: s.name,
        items: s.items,
        storageKey: `${t}.${a}.${s.name}`,
        renderNavItem: o
      },
      s.name
    )
  ) : /* @__PURE__ */ r(Z, { items: e, renderNavItem: o }) });
}
function yr({
  title: e,
  items: t,
  titleAction: a,
  railHeader: o,
  railWidth: n = 220,
  storageKey: l = "subnav",
  secondaryTitle: s,
  secondaryItems: c,
  secondaryStorageKey: u,
  secondaryRailWidth: f = 200,
  renderNavItem: b,
  children: k
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
            /* @__PURE__ */ r("span", { className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]", children: e }),
            a
          ] }),
          o && /* @__PURE__ */ r("div", { className: "px-3 py-2 border-b border-[var(--color-border)]", children: o }),
          /* @__PURE__ */ r(J, { items: t, storageKey: l, title: e, renderNavItem: b })
        ]
      }
    ),
    x && /* @__PURE__ */ i(
      "aside",
      {
        className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
        style: { width: f },
        children: [
          /* @__PURE__ */ r("div", { className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]", children: /* @__PURE__ */ r("span", { className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]", children: s ?? "" }) }),
          /* @__PURE__ */ r(
            J,
            {
              items: c,
              storageKey: u ?? `${l}.secondary`,
              title: s ?? "secondary",
              renderNavItem: b
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ r("main", { className: "flex-1 min-w-0 overflow-auto p-6", children: k })
  ] });
}
function Z({
  items: e,
  renderNavItem: t
}) {
  return /* @__PURE__ */ r(D, { children: e.map((a) => /* @__PURE__ */ r(ne, { item: a, renderNavItem: t }, a.path)) });
}
function ht({
  name: e,
  items: t,
  storageKey: a,
  renderNavItem: o
}) {
  const [n, l] = E(() => typeof window > "u" ? !1 : window.localStorage?.getItem(a) === "1");
  $(() => {
    typeof window > "u" || (n ? window.localStorage?.setItem(a, "1") : window.localStorage?.removeItem(a));
  }, [n, a]);
  const s = t.find((u) => u.groupScrollAfter)?.groupScrollAfter, c = s ? { maxHeight: s * 38, overflowY: "auto" } : void 0;
  return /* @__PURE__ */ i("section", { className: "border-b border-[var(--color-border)]", children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => l((u) => !u),
        className: "flex items-center gap-1.5 w-full px-3 py-2 bg-transparent border-none cursor-pointer text-[var(--color-text-tertiary)] text-[10px] font-bold tracking-[0.05em] uppercase text-left",
        "aria-expanded": !n,
        children: [
          /* @__PURE__ */ r("span", { className: "text-[10px] w-[10px] inline-block", "aria-hidden": "true", children: n ? "▸" : "▾" }),
          /* @__PURE__ */ r("span", { className: "flex-1", children: e }),
          /* @__PURE__ */ r("span", { className: "text-[9px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-bg)] px-[5px] py-px rounded-[6px] border border-[var(--color-border)]", children: t.length })
        ]
      }
    ),
    !n && /* @__PURE__ */ r("div", { style: c, children: t.map((u) => /* @__PURE__ */ r(ne, { item: u, renderNavItem: o }, u.path)) })
  ] });
}
function ne({
  item: e,
  renderNavItem: t
}) {
  const a = e.accent === "danger" ? "#dc2626" : e.accent === "warning" ? "#d97706" : e.accent === "success" ? "#16a34a" : void 0, o = /* @__PURE__ */ i(D, { children: [
    /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ r(
        "span",
        {
          className: "text-[13px] font-medium text-[var(--color-text-secondary)]",
          style: a ? { color: a } : void 0,
          children: e.label
        }
      ),
      e.count !== void 0 && /* @__PURE__ */ r("span", { className: "text-[10px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-surface)] px-[6px] py-px rounded-[8px] border border-[var(--color-border)]", children: e.count })
    ] }),
    e.hint && /* @__PURE__ */ r("div", { className: "text-[10px] text-[var(--color-text-tertiary)] mt-0.5", children: e.hint })
  ] }), n = {
    display: "block",
    padding: "8px 14px",
    borderLeft: "3px solid transparent",
    color: "var(--color-text-secondary)",
    textDecoration: "none",
    cursor: "pointer"
  };
  return e.onClick ? /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      onClick: e.onClick,
      className: "block w-full px-[14px] py-2 border-l-[3px] border-transparent border-t-0 border-r-0 border-b-0 bg-transparent text-[var(--color-text-secondary)] text-left cursor-pointer font-[inherit]",
      children: o
    }
  ) : t ? /* @__PURE__ */ r(D, { children: t(e, o, n) }) : /* @__PURE__ */ r(
    "a",
    {
      href: e.path,
      className: "block px-[14px] py-2 border-l-[3px] border-transparent text-[var(--color-text-secondary)] no-underline cursor-pointer",
      children: o
    }
  );
}
const vt = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function X(e) {
  return Array.from(e.querySelectorAll(vt)).filter(
    (t) => t.getAttribute("aria-hidden") !== "true"
  );
}
function gt(e, t, a) {
  return t === "right" ? {
    position: "fixed",
    top: e.top,
    left: e.right + a
  } : {
    position: "fixed",
    top: e.bottom + a,
    left: e.left
  };
}
function wr({
  trigger: e,
  open: t,
  onClose: a,
  placement: o = "bottom-start",
  offset: n = 6,
  className: l,
  zIndex: s = 9500,
  "data-testid": c = "inline-popover",
  children: u
}) {
  const f = O(null), [b, k] = E(null), x = O(null), v = T(() => {
    const g = e.current;
    if (!g) return;
    const p = g.getBoundingClientRect();
    k(gt(p, o, n));
  }, [e, o, n]);
  return ce(() => {
    if (!t) {
      k(null);
      return;
    }
    v();
  }, [t, v]), $(() => {
    if (!t) return;
    const g = () => v();
    return window.addEventListener("scroll", g, !0), window.addEventListener("resize", g), () => {
      window.removeEventListener("scroll", g, !0), window.removeEventListener("resize", g);
    };
  }, [t, v]), $(() => {
    if (!t) return;
    const g = typeof document < "u" ? document.activeElement : null;
    return x.current = g, queueMicrotask(() => {
      const p = f.current;
      if (!p) return;
      const w = X(p);
      w.length > 0 ? w[0].focus() : (p.setAttribute("tabindex", "-1"), p.focus());
    }), () => {
      const p = x.current;
      p && typeof p.focus == "function" && document.contains(p) && p.focus(), x.current = null;
    };
  }, [t]), $(() => {
    if (!t) return;
    const g = (p) => {
      if (p.key === "Escape") {
        p.stopPropagation(), a();
        return;
      }
      if (p.key !== "Tab") return;
      const w = f.current;
      if (!w) return;
      const h = X(w);
      if (h.length === 0) {
        p.preventDefault();
        return;
      }
      const N = h[0], m = h[h.length - 1], C = document.activeElement;
      if (!C || !w.contains(C)) {
        p.preventDefault(), N.focus();
        return;
      }
      p.shiftKey && C === N ? (p.preventDefault(), m.focus()) : !p.shiftKey && C === m && (p.preventDefault(), N.focus());
    };
    return window.addEventListener("keydown", g), () => window.removeEventListener("keydown", g);
  }, [t, a]), $(() => {
    if (!t) return;
    const g = (p) => {
      const w = p.target;
      w && (f.current?.contains(w) || e.current?.contains(w) || a());
    };
    return document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
  }, [t, a, e]), !t || !b || typeof document > "u" ? null : re(
    /* @__PURE__ */ r(
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
        style: { ...b, zIndex: s },
        children: u
      }
    ),
    document.body
  );
}
export {
  F as A,
  vr as B,
  cr as C,
  Ht as D,
  Xt as E,
  Jt as F,
  ir as G,
  ct as H,
  ar as I,
  dt as J,
  qt as K,
  dr as L,
  pr as M,
  or as N,
  hr as O,
  nr as P,
  xr as Q,
  Xe as R,
  rr as S,
  zt as T,
  Qt as U,
  Te as V,
  Dt as W,
  Pt as X,
  br as a,
  ur as b,
  jt as c,
  tr as d,
  It as e,
  Kt as f,
  Bt as g,
  lr as h,
  er as i,
  Ft as j,
  mr as k,
  Wt as l,
  wr as m,
  Ut as n,
  rt as o,
  Fe as p,
  Yt as q,
  gr as r,
  Zt as s,
  Re as t,
  it as u,
  Vt as v,
  yr as w,
  Gt as x,
  sr as y,
  fr as z
};
