import { jsxs as i, jsx as r, Fragment as P } from "react/jsx-runtime";
import { useState as T, useCallback as R, createContext as se, useMemo as O, useEffect as A, useRef as B, useContext as ie, useId as ee, useLayoutEffect as ce } from "react";
import { c as p } from "./cn-B6yFEsav.js";
import { _ as M } from "./index-DvoJowRO.js";
import { M as de } from "./Modal-2jg4229_.js";
import { T as ue, b as pe, e as q, a as fe, c as G, d as K } from "./PageSection-Dj8r4YIt.js";
import { S as xe } from "./PermissionDeniedCard-B9U2evs3.js";
import { S as me, C as be } from "./CardHeader-DuyI9Sk3.js";
import { A as z, a as he } from "./Avatar-BvKIaNVE.js";
import { S as te } from "./StatusDot-BC7B1tTr.js";
import { createPortal as re } from "react-dom";
import { C as ve } from "./Card-B2uO9v1w.js";
import { C as ge } from "./Chip-CAS9vOWq.js";
import { A as ye } from "./Badge-D2m7pGPU.js";
import "clsx";
import "tailwind-merge";
const we = [
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
], Ne = [
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
], ke = [
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
function Ce(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Se(e, t) {
  let a = e.replace(/(\/\/.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
  a = a.replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:${t.comment}">$1</span>`), a = a.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    `<span style="color:${t.string}">$1</span>`
  );
  const o = new RegExp(`\\b(${we.join("|")})\\b`, "g");
  return a = a.replace(o, `<span style="color:${t.keyword}">$1</span>`), a = a.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), a;
}
function $e(e, t) {
  let a = e.replace(
    /("(?:[^"\\]|\\.)*")(\s*:)/g,
    `<span style="color:${t.property}">$1</span>$2`
  );
  return a = a.replace(/("(?:[^"\\]|\\.)*")/g, `<span style="color:${t.string}">$1</span>`), a = a.replace(/\b(true|false|null)\b/g, `<span style="color:${t.keyword}">$1</span>`), a = a.replace(/\b(-?\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), a;
}
function Ee(e, t) {
  let a = e.replace(/(#.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
  a = a.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, `<span style="color:${t.string}">$1</span>`);
  const o = new RegExp(`\\b(${Ne.join("|")})\\b`, "g");
  a = a.replace(o, `<span style="color:${t.keyword}">$1</span>`);
  const n = new RegExp(`\\b(${ke.join("|")})\\b`, "g");
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
}, Te = {
  comment: "#64748b",
  string: "#15803d",
  keyword: "#1d4ed8",
  number: "#a16207",
  property: "#0369a1",
  builtin: "#7c3aed",
  variable: "#a16207"
};
function Y(e, t, a) {
  const o = a === "dark" ? Le : Te, n = Ce(e);
  switch (t) {
    case "json":
      return $e(n, o);
    case "bash":
    case "sh":
      return Ee(n, o);
    case "text":
      return n;
    default:
      return Se(n, o);
  }
}
function Pt({
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
  const [f, b] = T(!1), w = R(() => {
    typeof navigator > "u" || !navigator.clipboard || navigator.clipboard.writeText(e).then(() => {
      b(!0), setTimeout(() => b(!1), 1500);
    }).catch(() => {
    });
  }, [e]), m = a === "dark", x = e.split(`
`);
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": c,
      "data-language": t,
      "data-theme": a,
      className: p(
        "relative rounded-lg border font-mono text-[13px] leading-relaxed overflow-hidden",
        m ? "bg-slate-800 text-slate-100 border-slate-700" : "bg-slate-50 text-slate-900 border-slate-200",
        l
      ),
      style: s,
      "aria-label": u ?? `Code (${t})`,
      children: [
        o && /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            onClick: w,
            "aria-label": f ? "Copied" : "Copy code",
            className: p(
              "absolute top-2 right-2 text-[11px] px-2 py-1 rounded border transition-opacity",
              m ? "bg-slate-700 text-slate-100 border-slate-600 hover:bg-slate-600" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            ),
            "data-copied": f ? "true" : "false",
            children: f ? "Copied" : "Copy"
          }
        ),
        /* @__PURE__ */ r("pre", { className: "m-0 px-4 py-3 overflow-x-auto", children: n ? /* @__PURE__ */ i("div", { className: "flex", children: [
          /* @__PURE__ */ r(
            "div",
            {
              className: p(
                "select-none pr-3 text-right",
                m ? "text-slate-500" : "text-slate-400"
              ),
              "aria-hidden": "true",
              children: x.map((h, d) => /* @__PURE__ */ r("div", { children: d + 1 }, d))
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
const Ae = "cui:command-palette:recents", _e = 5;
function Re(e, t) {
  if (!e || typeof window > "u") return [];
  try {
    const a = window.localStorage.getItem(e);
    if (!a) return [];
    const o = JSON.parse(a);
    return Array.isArray(o) ? o.filter((n) => typeof n == "string").slice(0, t) : [];
  } catch {
    return [];
  }
}
function Me(e, t) {
  if (!(!e || typeof window > "u"))
    try {
      window.localStorage.setItem(e, JSON.stringify(t));
    } catch {
    }
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
function Kt() {
  const { open: e, close: t, toggle: a, isOpen: o, query: n } = U();
  return { open: e, close: t, toggle: a, isOpen: o, query: n };
}
function Oe(e, t) {
  const a = t.toLowerCase().split("+").map((b) => b.trim()).filter(Boolean);
  if (a.length === 0) return !1;
  const o = a[a.length - 1], n = new Set(a.slice(0, -1)), l = n.has("cmd") || n.has("meta"), s = n.has("ctrl"), c = n.has("mod"), u = n.has("shift"), f = n.has("alt");
  if (c) {
    if (!e.metaKey && !e.ctrlKey) return !1;
  } else if (l !== e.metaKey || s !== e.ctrlKey) return !1;
  return u !== e.shiftKey || f !== e.altKey ? !1 : e.key.toLowerCase() === o;
}
function Ft({
  commands: e,
  getDynamicCommands: t,
  recentsKey: a = Ae,
  recentsLimit: o = _e,
  children: n
}) {
  const [l, s] = T(!1), [c, u] = T(""), [f, b] = T(
    () => /* @__PURE__ */ new Map()
  ), [w, m] = T(
    () => Re(a, o)
  ), x = R(
    (S) => {
      a !== null && m((k) => {
        const $ = [S, ...k.filter((D) => D !== S)].slice(
          0,
          o
        );
        return Me(a, $), $;
      });
    },
    [a, o]
  ), h = R(() => s(!0), []), d = R(() => {
    s(!1), u("");
  }, []), y = R(() => s((S) => !S), []), N = R((S) => {
    b((k) => {
      const $ = new Map(k);
      return $.set(S.id, S), $;
    });
  }, []), E = R((S) => {
    b((k) => {
      if (!k.has(S)) return k;
      const $ = new Map(k);
      return $.delete(S), $;
    });
  }, []);
  A(() => {
    const S = (k) => {
      (k.metaKey || k.ctrlKey) && k.key.toLowerCase() === "k" && (k.preventDefault(), s(($) => !$));
    };
    return window.addEventListener("keydown", S, !0), () => window.removeEventListener("keydown", S, !0);
  }, []);
  const v = O(() => {
    const S = t ? t(c) : [];
    return [...e ?? [], ...S, ...f.values()].filter(($) => $.when ? $.when() : !0);
  }, [e, t, c, f]), C = B(v);
  C.current = v, A(() => {
    const S = (k) => {
      if (!((k.metaKey || k.ctrlKey) && k.key.toLowerCase() === "k")) {
        for (const $ of C.current)
          if ($.hotkey && Oe(k, $.hotkey)) {
            k.preventDefault(), Promise.resolve().then(() => $.run());
            return;
          }
      }
    };
    return window.addEventListener("keydown", S), () => window.removeEventListener("keydown", S);
  }, []);
  const I = {
    open: h,
    close: d,
    toggle: y,
    isOpen: l,
    query: c,
    setQuery: u,
    mergedCommands: v,
    registerCommand: N,
    unregisterCommand: E,
    recents: w,
    noteSelection: x
  };
  return /* @__PURE__ */ r(ae.Provider, { value: I, children: n });
}
function Ht(e) {
  const { registerCommand: t, unregisterCommand: a } = U();
  A(() => (t(e), () => a(e.id)), [e, t, a]);
}
function De(e) {
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
function Ut({
  placeholder: e = "Type a command or search…",
  emptyState: t,
  className: a
} = {}) {
  const {
    isOpen: o,
    close: n,
    query: l,
    setQuery: s,
    mergedCommands: c,
    recents: u,
    noteSelection: f
  } = U(), b = O(() => {
    if (l.trim() !== "" || u.length === 0) return [];
    const x = new Map(c.map((h) => [h.id, h]));
    return u.map((h) => x.get(h)).filter((h) => !!h);
  }, [c, l, u]), w = O(() => De(c), [c]), m = R(
    (x) => {
      f(x.id), n(), Promise.resolve().then(() => x.run());
    },
    [n, f]
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
        M,
        {
          label: "Command palette",
          value: void 0,
          className: p("flex flex-col gap-0 w-full", a),
          "data-testid": "command-palette",
          children: [
            /* @__PURE__ */ r(
              M.Input,
              {
                value: l,
                onValueChange: s,
                placeholder: e,
                "data-autofocus": !0,
                className: p(
                  "w-full px-3 py-2.5 text-sm border-0 border-b border-border",
                  "outline-none bg-transparent text-text-primary placeholder:text-text-tertiary"
                ),
                "data-testid": "command-palette-input"
              }
            ),
            /* @__PURE__ */ i(M.List, { className: "max-h-[360px] overflow-y-auto py-2", children: [
              /* @__PURE__ */ r(M.Empty, { className: "px-3 py-6 text-center text-sm text-text-tertiary", children: t ?? "No results." }),
              b.length > 0 && /* @__PURE__ */ r(M.Group, { heading: "Recent", "data-testid": "command-palette-group-recent", children: b.map((x) => /* @__PURE__ */ i(
                M.Item,
                {
                  value: `recent-${x.id} ${x.label}`,
                  keywords: x.keywords,
                  onSelect: () => m(x),
                  "data-testid": `command-palette-recent-${x.id}`,
                  className: p(
                    "flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm",
                    "text-text-primary aria-selected:bg-surface-hover"
                  ),
                  children: [
                    x.icon && /* @__PURE__ */ r("span", { className: "shrink-0 text-text-secondary", children: x.icon }),
                    /* @__PURE__ */ r("span", { className: "flex-1 truncate", children: x.label })
                  ]
                },
                `recent-${x.id}`
              )) }),
              w.map(({ groupName: x, items: h }) => /* @__PURE__ */ r(
                M.Group,
                {
                  heading: x ?? void 0,
                  children: h.map((d) => /* @__PURE__ */ i(
                    M.Item,
                    {
                      value: `${d.id} ${d.label} ${(d.keywords ?? []).join(" ")}`,
                      keywords: d.keywords,
                      onSelect: () => m(d),
                      "data-testid": `command-palette-item-${d.id}`,
                      className: p(
                        "flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm",
                        "text-text-primary aria-selected:bg-surface-hover"
                      ),
                      children: [
                        d.icon && /* @__PURE__ */ r("span", { className: "shrink-0 text-text-secondary", children: d.icon }),
                        /* @__PURE__ */ r("span", { className: "flex-1 truncate", children: d.label }),
                        d.hint && /* @__PURE__ */ r("span", { className: "text-xs text-text-tertiary truncate", children: d.hint }),
                        d.shortcut && d.shortcut.length > 0 && /* @__PURE__ */ r("span", { className: "flex items-center gap-1 shrink-0", children: d.shortcut.map((y, N) => /* @__PURE__ */ r(
                          "kbd",
                          {
                            className: p(
                              "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1",
                              "text-[10px] font-mono font-medium",
                              "bg-surface-hover text-text-secondary",
                              "border border-border rounded"
                            ),
                            children: y
                          },
                          `${d.id}-kbd-${N}`
                        )) })
                      ]
                    },
                    d.id
                  ))
                },
                x ?? "__ungrouped__"
              ))
            ] })
          ]
        }
      )
    }
  );
}
function Gt({ className: e } = {}) {
  const { toggle: t } = U();
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      onClick: t,
      "data-testid": "command-palette-hint",
      className: p(
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
function W(e) {
  if (e === "right") return "text-right";
  if (e === "center") return "text-center";
}
function Wt({
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
  className: w,
  "data-testid": m
}) {
  const [x, h] = T(null), [d, y] = T("asc"), [N, E] = T(""), [v, C] = T(0), I = (g) => {
    x === g ? y((_) => _ === "asc" ? "desc" : "asc") : (h(g), y("asc"));
  }, S = O(() => {
    if (!l || N.trim() === "") return e;
    const g = N.trim().toLowerCase();
    return e.filter(
      (_) => t.some((L) => L.filterable === !1 ? !1 : (L.getFilterText ? L.getFilterText(_) : String(_[L.key] ?? "")).toLowerCase().includes(g))
    );
  }, [e, t, N, l]), k = O(() => {
    if (!x) return S;
    const g = t.find((j) => j.key === x);
    if (!g || !g.sortable) return S;
    const _ = g.compare ?? ((j, F) => {
      const oe = String(j[g.key] ?? ""), le = String(F[g.key] ?? "");
      return oe.localeCompare(le);
    }), L = [...S];
    return L.sort((j, F) => d === "asc" ? _(j, F) : -_(j, F)), L;
  }, [S, t, x, d]), $ = c && c > 0 ? Math.max(1, Math.ceil(k.length / c)) : 1, D = Math.min(v, $ - 1), V = O(() => {
    if (!c || c <= 0) return k;
    const g = D * c;
    return k.slice(g, g + c);
  }, [k, c, D]);
  return /* @__PURE__ */ i("div", { className: p("flex flex-col gap-3", w), "data-testid": m, children: [
    l && /* @__PURE__ */ r(
      "input",
      {
        type: "text",
        value: N,
        onChange: (g) => {
          E(g.target.value), C(0);
        },
        placeholder: s,
        "aria-label": "Search",
        "data-testid": "datatable-search",
        className: "w-full max-w-xs rounded-md border border-border-field bg-surface px-3 py-1.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none"
      }
    ),
    /* @__PURE__ */ i(ue, { className: "border border-border rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ r(pe, { children: /* @__PURE__ */ i("tr", { children: [
        t.map((g) => {
          const _ = g.sortable && x === g.key;
          return /* @__PURE__ */ r(
            q,
            {
              sortable: g.sortable,
              sortDirection: _ ? d : null,
              style: g.width ? { width: g.width } : void 0,
              className: p(W(g.align), g.className),
              onClick: g.sortable ? () => I(g.key) : void 0,
              "data-testid": g.sortable ? `datatable-header-${g.key}` : void 0,
              children: g.header
            },
            g.key
          );
        }),
        n && /* @__PURE__ */ r(q, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ r(fe, { children: f ? Array.from({ length: b }).map((g, _) => /* @__PURE__ */ i(G, { "data-testid": "datatable-loading-row", children: [
        t.map((L) => /* @__PURE__ */ r(K, { className: W(L.align), children: /* @__PURE__ */ r("div", { className: "h-4 w-3/4 animate-pulse rounded bg-slate-100" }) }, L.key)),
        n && /* @__PURE__ */ r(K, { className: "text-right", children: /* @__PURE__ */ r("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-slate-100" }) })
      ] }, `skeleton-${_}`)) : V.length === 0 ? /* @__PURE__ */ r(G, { children: /* @__PURE__ */ r(
        K,
        {
          colSpan: t.length + (n ? 1 : 0),
          className: "text-center text-text-secondary py-8",
          children: u
        }
      ) }) : V.map((g, _) => /* @__PURE__ */ i(
        G,
        {
          clickable: !!o,
          onClick: o ? () => o(g) : void 0,
          children: [
            t.map((L) => /* @__PURE__ */ r(
              K,
              {
                className: p(W(L.align), L.className),
                children: L.render ? L.render(g, _) : String(g[L.key] ?? "")
              },
              L.key
            )),
            n && /* @__PURE__ */ r(K, { className: "text-right", onClick: (L) => L.stopPropagation(), children: /* @__PURE__ */ r("div", { className: "flex items-center justify-end gap-2", children: n(g) }) })
          ]
        },
        a(g)
      )) })
    ] }),
    c && c > 0 && k.length > c && /* @__PURE__ */ i("div", { className: "flex items-center justify-between text-xs text-text-secondary", children: [
      /* @__PURE__ */ i("span", { "data-testid": "datatable-page-summary", children: [
        "Page ",
        D + 1,
        " of ",
        $,
        " · ",
        k.length,
        " total"
      ] }),
      /* @__PURE__ */ i("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            onClick: () => C((g) => Math.max(0, g - 1)),
            disabled: D === 0,
            "data-testid": "datatable-prev",
            className: "rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50",
            children: "Prev"
          }
        ),
        /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            onClick: () => C((g) => Math.min($ - 1, g + 1)),
            disabled: D >= $ - 1,
            "data-testid": "datatable-next",
            className: "rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50",
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function zt({
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
      className: p(
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
            className: p(
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
function Vt({
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
      className: p(
        "flex flex-col items-center justify-center min-h-[220px]",
        "text-text-secondary gap-3 p-8 font-[inherit]"
      ),
      children: [
        /* @__PURE__ */ r(xe, { size: a, color: o, "aria-label": e }),
        /* @__PURE__ */ r("div", { className: "text-[15px] font-medium text-text-primary", children: e }),
        t && /* @__PURE__ */ r("div", { className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal", children: t })
      ]
    }
  );
}
function qt({
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
  const f = ee(), b = `${f}-label`, w = t || a ? `${f}-desc` : void 0, m = {
    id: f,
    labelId: b,
    "aria-describedby": w,
    "aria-invalid": a ? !0 : void 0
  };
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": u,
      className: p(
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
            className: p(
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
        /* @__PURE__ */ i("div", { className: p(n === "inline" ? "flex-1" : ""), children: [
          l(m),
          (t || a) && /* @__PURE__ */ r(
            "div",
            {
              id: w,
              className: p(
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
const je = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm"
};
function Be(e) {
  switch (e) {
    case "underline":
      return "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
    case "pill":
      return "inline-flex items-center gap-1";
    case "segmented":
      return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5";
  }
}
function Ie(e, t, a) {
  return e === "underline" ? p(
    "-mb-px border-b-2 rounded-none",
    t ? "border-[var(--color-primary)] text-[var(--color-text-primary)]" : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
    a && "opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]"
  ) : e === "pill" ? p(
    "rounded-full",
    t ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]",
    a && "opacity-50 cursor-not-allowed hover:bg-transparent"
  ) : p(
    "rounded-md",
    t ? "bg-white shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]",
    a && "opacity-50 cursor-not-allowed hover:bg-transparent"
  );
}
function Yt({
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
  const f = ee(), b = u ?? f, w = B(/* @__PURE__ */ new Map()), m = O(() => e.filter((d) => !d.disabled).map((d) => d.id), [e]), x = R((d) => {
    w.current.get(d)?.focus();
  }, []), h = R(
    (d, y) => {
      if (m.length === 0) return;
      const N = m.indexOf(y);
      let E = null;
      switch (d.key) {
        case "ArrowRight":
        case "ArrowDown":
          E = N === -1 ? 0 : (N + 1) % m.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          E = N === -1 ? m.length - 1 : (N - 1 + m.length) % m.length;
          break;
        case "Home":
          E = 0;
          break;
        case "End":
          E = m.length - 1;
          break;
        case "Enter":
        case " ":
          d.preventDefault(), a(y);
          return;
        default:
          return;
      }
      if (E !== null) {
        d.preventDefault();
        const v = m[E];
        a(v), x(v);
      }
    },
    [m, a, x]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      role: "tablist",
      "aria-label": c,
      className: p(Be(o), l),
      style: s,
      children: e.map((d) => {
        const y = d.id === t;
        return /* @__PURE__ */ i(
          "button",
          {
            ref: (N) => {
              N ? w.current.set(d.id, N) : w.current.delete(d.id);
            },
            type: "button",
            role: "tab",
            id: `${b}-tab-${d.id}`,
            "aria-controls": `${b}-panel-${d.id}`,
            "aria-selected": y,
            "aria-disabled": d.disabled || void 0,
            tabIndex: y ? 0 : -1,
            disabled: d.disabled,
            onClick: () => !d.disabled && a(d.id),
            onKeyDown: (N) => h(N, d.id),
            className: p(
              "inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer",
              je[n],
              Ie(o, y, !!d.disabled)
            ),
            children: [
              d.icon,
              /* @__PURE__ */ r("span", { children: d.label }),
              d.badge !== void 0 && d.badge !== null && /* @__PURE__ */ r(
                "span",
                {
                  className: p(
                    "ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold",
                    y && o === "pill" ? "bg-white/20 text-white" : "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"
                  ),
                  children: d.badge
                }
              )
            ]
          },
          d.id
        );
      })
    }
  );
}
function Jt({ id: e, when: t, idPrefix: a, className: o, style: n, children: l }) {
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
const Pe = {
  positive: "text-[var(--color-success)]",
  negative: "text-[var(--color-danger)]",
  neutral: "text-[var(--color-text-secondary)]"
};
function Ke(e) {
  return e.tone ?? (e.direction === "up" ? "positive" : "negative");
}
function Qt({
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
  className: w,
  style: m,
  "data-testid": x
}) {
  const h = p(
    "block rounded-lg border p-3 no-underline transition-colors",
    !a && !o && "bg-[var(--color-surface)] border-[var(--color-border)]",
    a && "bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]",
    o && "bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]",
    (c || f) && "hover:bg-[var(--color-surface-hover)] cursor-pointer",
    w
  ), d = s && s.length > 0 ? s : null;
  let y = null;
  if (l) {
    const E = Ke(l), v = l.direction === "up" ? "▲" : "▼", C = l.direction === "up" ? "+" : "-", I = l.suffix ?? "%", S = Math.abs(l.value), k = l["aria-label"] ?? `${l.direction} ${S}${I}`;
    y = /* @__PURE__ */ i(
      "div",
      {
        "data-testid": "stat-card-delta",
        "data-direction": l.direction,
        "data-tone": E,
        "aria-label": k,
        className: p("mt-1 text-[12px] font-medium leading-tight", Pe[E]),
        children: [
          /* @__PURE__ */ i("span", { "aria-hidden": "true", children: [
            v,
            " "
          ] }),
          C,
          S,
          I
        ]
      }
    );
  }
  const N = /* @__PURE__ */ i(P, { children: [
    /* @__PURE__ */ r("div", { className: "text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]", children: e }),
    /* @__PURE__ */ i("div", { className: "mt-1 flex items-center gap-2", children: [
      /* @__PURE__ */ r(
        "div",
        {
          className: p(
            "text-[24px] font-bold leading-tight text-[var(--color-text-primary)]",
            b && "font-mono"
          ),
          children: t
        }
      ),
      d && /* @__PURE__ */ r(me, { data: d, width: 80, height: 20 })
    ] }),
    y,
    n != null && /* @__PURE__ */ r("div", { className: "mt-1 text-[11px] italic text-[var(--color-text-tertiary)]", children: n })
  ] });
  return c ? u ? /* @__PURE__ */ r(u, { to: c, "data-testid": x, className: h, style: m, children: N }) : /* @__PURE__ */ r("a", { href: c, "data-testid": x, className: h, style: m, children: N }) : f ? /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      onClick: f,
      "data-testid": x,
      className: p(h, "w-full text-left"),
      style: m,
      children: N
    }
  ) : /* @__PURE__ */ r("div", { "data-testid": x, className: h, style: m, children: N });
}
const Fe = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4"
};
function Zt({
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
      className: p(
        "grid grid-cols-1",
        Fe[t],
        a ? "gap-2" : "gap-4",
        o
      ),
      style: n,
      children: e
    }
  );
}
const He = {
  sm: "h-1.5",
  md: "h-2"
};
function Xt({
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
  const b = t > 0 ? t : 100, w = Math.max(0, Math.min(e, b)), m = Math.min(100, w / b * 100), x = a ?? "var(--color-primary)";
  return /* @__PURE__ */ i("div", { "data-testid": u, className: p("w-full", s), style: c, children: [
    n != null && /* @__PURE__ */ i("div", { className: "flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]", children: [
      /* @__PURE__ */ r("span", { children: n }),
      /* @__PURE__ */ r("span", { className: "text-[var(--color-text-tertiary)] tabular-nums", children: l ? `${w}/${b}` : `${Math.round(m)}%` })
    ] }),
    /* @__PURE__ */ r(
      "div",
      {
        role: "progressbar",
        "aria-valuenow": w,
        "aria-valuemin": 0,
        "aria-valuemax": b,
        "aria-label": f,
        className: p(
          "w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]",
          He[o]
        ),
        children: /* @__PURE__ */ r(
          "div",
          {
            className: "h-full rounded-full transition-all duration-300",
            style: { width: `${m}%`, background: x }
          }
        )
      }
    )
  ] });
}
const Ue = {
  online: "var(--color-success, #22c55e)",
  away: "var(--color-state-pending, #f59e0b)",
  busy: "var(--color-state-error, #ef4444)",
  offline: "var(--color-text-tertiary, #94a3b8)",
  unknown: "var(--color-text-tertiary, #94a3b8)"
}, Ge = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
  unknown: "Unknown presence"
};
function We({
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
  const f = o ?? e === "online", b = t ?? Ge[e];
  return /* @__PURE__ */ r(
    te,
    {
      color: Ue[e],
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
function er({
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
      className: p(
        "inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-[12px] text-text-primary",
        l && "hover:bg-slate-100 cursor-pointer transition-colors",
        !l && "cursor-default",
        s
      ),
      style: c,
      children: [
        /* @__PURE__ */ r(z, { name: e, size: a, color: o }),
        /* @__PURE__ */ r("span", { className: "font-medium leading-none", children: t ?? e }),
        n && /* @__PURE__ */ r(We, { state: n, size: "xs" })
      ]
    }
  );
}
const ze = {
  sm: "px-2.5 py-0.5 text-[11px]",
  xs: "px-2 py-px text-[10px]"
}, Ve = "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis)]", qe = "bg-[var(--color-primary)] border-[var(--color-primary)] text-white hover:opacity-90", Ye = "border-[var(--color-border-emphasis)] text-[var(--color-text-primary)]";
function tr({
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
      className: p(
        "inline-flex items-center gap-1.5 rounded-full font-semibold border transition-colors cursor-pointer select-none",
        ze[n],
        e ? u ? Ye : qe : Ve,
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
const Je = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm"
}, Qe = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", Ze = "bg-white shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]";
function rr({
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
      className: p(
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
            className: p(
              "inline-flex items-center gap-1.5 rounded-md font-medium transition-all cursor-pointer",
              Je[o],
              s ? Ze : Qe
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
function ar({
  label: e,
  id: t,
  href: a,
  mono: o = !1,
  className: n,
  labelClassName: l
}) {
  const s = /* @__PURE__ */ r("span", { className: "truncate", children: e });
  return /* @__PURE__ */ i("div", { className: p("flex flex-col min-w-0", n), children: [
    /* @__PURE__ */ r(
      "div",
      {
        className: p(
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
        className: p(
          "text-[10px] font-mono text-[var(--color-text-tertiary)] truncate mt-0.5",
          o && "tracking-tight"
        ),
        children: t
      }
    )
  ] });
}
const Xe = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function nr({
  open: e,
  onClose: t,
  title: a,
  subtitle: o,
  width: n = 460,
  children: l,
  footer: s,
  "data-testid": c
}) {
  const u = B(null);
  return A(() => {
    if (!e) return;
    const f = (b) => {
      b.key === "Escape" && t();
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [e, t]), A(() => {
    if (!e) return;
    const f = u.current;
    if (!f) return;
    const b = f.querySelector(Xe);
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
          className: p(
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
function et(e, t) {
  if (!e || typeof window > "u") return t;
  try {
    const a = window.localStorage.getItem(e);
    return a === null ? t : a === "true";
  } catch {
    return t;
  }
}
function or({
  title: e,
  defaultOpen: t = !1,
  badge: a,
  children: o,
  className: n,
  storageKey: l
}) {
  const [s, c] = T(
    () => et(l, t)
  );
  return A(() => {
    if (l && !(typeof window > "u"))
      try {
        window.localStorage.setItem(l, String(s));
      } catch {
      }
  }, [s, l]), /* @__PURE__ */ i(
    "div",
    {
      className: p(
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
                    className: p(
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
function lr({
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
      className: p("relative inline-flex items-center", n),
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
const tt = {
  error: "bg-[var(--color-danger-bg,#fef2f2)] border-[var(--color-danger,#dc2626)] text-[var(--color-danger,#dc2626)]",
  success: "bg-[var(--color-success-bg,#f0fdf4)] border-[var(--color-success,#16a34a)] text-[var(--color-success,#16a34a)]",
  info: "bg-[var(--color-info-bg,#eff6ff)] border-[var(--color-info,#2563eb)] text-[var(--color-info,#2563eb)]",
  warning: "bg-[var(--color-warning-bg,#fffbeb)] border-[var(--color-warning,#f59e0b)] text-[var(--color-warning,#f59e0b)]"
};
function sr({ tone: e, children: t, onDismiss: a, className: o }) {
  return /* @__PURE__ */ i(
    "div",
    {
      role: e === "error" || e === "warning" ? "alert" : "status",
      "aria-live": e === "error" || e === "warning" ? "assertive" : "polite",
      className: p(
        "flex items-start gap-2 px-3 py-2 rounded-md border-l-[3px] text-sm",
        tt[e],
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
function ir({
  title: e,
  description: t,
  actions: a,
  back: o,
  badge: n,
  className: l
}) {
  return /* @__PURE__ */ i("div", { className: p("flex flex-col gap-1.5", l), children: [
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
function H({ size: e = "md", color: t, className: a }) {
  const o = e === "sm" ? 4 : 6, n = t || "var(--color-text-tertiary, #94a3b8)";
  return /* @__PURE__ */ i(P, { children: [
    /* @__PURE__ */ r("style", { children: `
        @keyframes thinkDot {
          0%, 80%, 100% { transform: scale(1); opacity: 0.4; }
          40% { transform: scale(1.3); opacity: 1; }
        }
      ` }),
    /* @__PURE__ */ r("span", { className: p("inline-flex items-center gap-1", a), children: [0, 1, 2].map((l) => /* @__PURE__ */ r(
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
function rt(e) {
  if (e.length === 0) return "";
  if (e.length === 1) return `${e[0]} is typing…`;
  if (e.length === 2) return `${e[0]} and ${e[1]} are typing…`;
  const t = e.length - 2;
  return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing…`;
}
function cr({
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
      className: p(
        "inline-flex items-center gap-1.5 text-[12px] text-text-tertiary",
        n
      ),
      children: [
        /* @__PURE__ */ r(H, { size: o, color: a }),
        !t && /* @__PURE__ */ r("span", { children: rt(e) })
      ]
    }
  );
}
const at = {
  idle: { label: "Idle", colorClass: "text-[#6b7280]" },
  connecting: { label: "Connecting…", colorClass: "text-[#f59e0b]" },
  connected: { label: "Connected", colorClass: "text-[#10b981]" },
  reconnecting: { label: "Reconnecting…", colorClass: "text-[#f59e0b]" },
  disconnected: { label: "Disconnected", colorClass: "text-[#ef4444]" }
};
function dr({
  state: e,
  compact: t = !1,
  withLabel: a = !0,
  labels: o,
  className: n,
  "data-testid": l = "connection-pill"
}) {
  const s = at[e], c = o?.[e] ?? s.label, u = a && !t;
  return /* @__PURE__ */ i(
    "span",
    {
      role: "status",
      "aria-live": "polite",
      "aria-label": u ? void 0 : c,
      "data-testid": l,
      "data-state": e,
      className: p("inline-flex items-center gap-1.5 font-mono", n),
      children: [
        /* @__PURE__ */ r("span", { "aria-hidden": "true", className: s.colorClass, children: "⬤" }),
        u && /* @__PURE__ */ r("span", { className: p(s.colorClass, "font-semibold"), children: c })
      ]
    }
  );
}
const J = {
  debug: "DEBUG",
  info: "INFO",
  warn: "WARN",
  error: "ERROR"
}, nt = {
  debug: "text-[var(--color-text-tertiary)]",
  info: "text-[var(--color-info,#3b82f6)]",
  warn: "text-[var(--color-warning,#d97706)]",
  error: "text-[var(--color-danger,#dc2626)]"
};
function ot({
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
  style: w,
  "data-testid": m = "log-stream"
}) {
  const x = B(null), [h, d] = T(!1);
  A(() => {
    if (!t || h) return;
    const v = x.current;
    v && (v.scrollTop = v.scrollHeight);
  }, [e, t, h]);
  const y = () => {
    const v = x.current;
    if (!v) return;
    const C = v.scrollHeight - v.scrollTop - v.clientHeight < 24;
    d(!C);
  }, N = () => {
    const v = x.current;
    v && (v.scrollTop = v.scrollHeight, d(!1));
  }, E = /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ i(
      "span",
      {
        className: "text-[10px] text-[var(--color-text-tertiary)]",
        "data-testid": `${m}-count`,
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
        "data-testid": `${m}-clear`,
        className: p(
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
    ve,
    {
      "data-testid": m,
      className: p("flex flex-col", b),
      style: w,
      children: [
        l !== null && /* @__PURE__ */ r("div", { className: "px-4 py-3 border-b border-[var(--color-border)]", children: /* @__PURE__ */ r(be, { title: l, meta: s ?? E }) }),
        /* @__PURE__ */ i("div", { className: "relative flex-1 min-h-0 flex", children: [
          /* @__PURE__ */ r(
            "div",
            {
              ref: x,
              onScroll: y,
              role: "log",
              "aria-live": t ? "polite" : "off",
              "data-testid": `${m}-scroll`,
              className: p(
                "flex-1 overflow-y-auto",
                "font-mono text-[12px] leading-[1.55]",
                "bg-[var(--color-surface-subtle,#0b1020)] text-[var(--color-text-primary,#e5e7eb)]",
                "py-2"
              ),
              style: { maxHeight: u },
              children: e.length === 0 ? /* @__PURE__ */ r(
                "div",
                {
                  "data-testid": `${m}-empty`,
                  className: "px-3 py-6 text-center text-[11px] text-[var(--color-text-tertiary)]",
                  children: c
                }
              ) : e.map((v) => {
                const C = v.level ?? "info";
                return /* @__PURE__ */ i(
                  "div",
                  {
                    role: "listitem",
                    "data-testid": `${m}-line`,
                    "data-level": v.level || void 0,
                    className: "flex items-baseline gap-2 px-3 hover:bg-[var(--color-surface,rgba(255,255,255,0.04))]",
                    children: [
                      a && v.timestamp && /* @__PURE__ */ r("span", { className: "shrink-0 text-[var(--color-text-tertiary)] tabular-nums", children: v.timestamp }),
                      o && v.level && /* @__PURE__ */ r(
                        "span",
                        {
                          className: p(
                            "shrink-0 font-semibold uppercase text-[10px] w-[44px]",
                            nt[C]
                          ),
                          "aria-label": `level ${J[C].toLowerCase()}`,
                          children: J[C]
                        }
                      ),
                      n && v.source && /* @__PURE__ */ i("span", { className: "shrink-0 text-[var(--color-text-secondary)]", children: [
                        "[",
                        v.source,
                        "]"
                      ] }),
                      /* @__PURE__ */ r("span", { className: "flex-1 whitespace-pre-wrap break-words", children: v.message })
                    ]
                  },
                  v.id
                );
              })
            }
          ),
          t && h && /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              "data-testid": `${m}-jump`,
              onClick: N,
              className: p(
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
const ur = ot;
function pr({
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
  className: w,
  style: m,
  "data-testid": x = "thumbnail-card"
}) {
  const d = p(
    "group block w-full text-left bg-[var(--color-surface,#fff)]",
    "rounded-xl border border-[var(--color-border)] overflow-hidden",
    "transition-[box-shadow,transform] duration-150",
    (c || u) && "cursor-pointer hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-0.5",
    w
  ), y = /* @__PURE__ */ i(P, { children: [
    /* @__PURE__ */ i(
      "div",
      {
        "data-testid": `${x}-thumb`,
        className: p(
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
              "data-testid": `${x}-badge`,
              className: "absolute top-2 right-2",
              children: f
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ i("div", { className: "px-4 py-3", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2 mb-1.5", children: [
        a && /* @__PURE__ */ r(ge, { tone: o, size: "xs", "data-testid": `${x}-category`, children: a }),
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
      "data-testid": x,
      className: p(d, "no-underline text-inherit"),
      style: m,
      children: y
    }
  ) : u ? /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      onClick: u,
      "data-testid": x,
      className: p(d, "font-inherit"),
      style: m,
      children: y
    }
  ) : /* @__PURE__ */ r("div", { "data-testid": x, className: d, style: m, children: y });
}
const lt = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
};
function fr({
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
      className: p(
        "grid grid-cols-1",
        lt[t],
        a ? "gap-3" : "gap-5",
        o
      ),
      style: n,
      children: e
    }
  );
}
const st = {
  neutral: "bg-slate-50",
  success: "bg-green-50",
  warning: "bg-amber-50",
  danger: "bg-red-50",
  info: "bg-blue-50",
  caution: "bg-orange-50",
  purple: "bg-purple-50"
}, it = {
  neutral: "border-slate-200",
  success: "border-green-300",
  warning: "border-amber-300",
  danger: "border-red-300",
  info: "border-blue-300",
  caution: "border-orange-300",
  purple: "border-purple-300"
}, ct = {
  neutral: "text-slate-800",
  success: "text-green-800",
  warning: "text-amber-800",
  danger: "text-red-800",
  info: "text-blue-800",
  caution: "text-orange-800",
  purple: "text-purple-800"
};
function dt({
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
      className: p(
        "flex items-center justify-center text-[var(--color-text-tertiary)]",
        a ? "h-5 text-base" : "w-5 text-base"
      ),
      children: o
    }
  );
}
function ut({
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
      className: p(
        "flex",
        s ? "flex-col items-stretch" : "flex-row items-stretch flex-wrap",
        o
      ),
      style: n,
      children: e.map((c, u) => {
        const f = c.tone ?? "neutral";
        return /* @__PURE__ */ i("div", { className: p("flex", "flex-col"), children: [
          /* @__PURE__ */ i(
            "div",
            {
              "data-testid": "stack-diagram-layer",
              "data-tone": f,
              className: p(
                "rounded-md border px-3 py-2",
                st[f],
                it[f],
                !s && "min-w-[140px]"
              ),
              children: [
                /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
                  c.icon != null && /* @__PURE__ */ r("span", { className: "shrink-0 text-[14px] leading-none", "aria-hidden": !0, children: c.icon }),
                  /* @__PURE__ */ r("span", { className: p("text-[12px] font-semibold", ct[f]), children: c.label }),
                  c.meta != null && /* @__PURE__ */ r("span", { className: "ml-auto text-[10px] text-[var(--color-text-tertiary)] shrink-0", children: c.meta })
                ] }),
                c.description != null && /* @__PURE__ */ r("div", { className: "mt-0.5 text-[11px] leading-snug text-[var(--color-text-secondary)]", children: c.description })
              ]
            }
          ),
          u < e.length - 1 && /* @__PURE__ */ r(dt, { orientation: t, variant: a })
        ] }, c.id);
      })
    }
  );
}
const xr = ut;
function mr({
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
  const w = !o && e.trim().length > 0, m = () => {
    w && a();
  }, x = (d) => {
    if (d.key === "Enter") {
      if (n && d.shiftKey) return;
      d.preventDefault(), m();
    }
  }, h = p(
    "flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--color-border-field,#d1d5db)] bg-white text-[var(--color-text-primary)]",
    "placeholder:text-[var(--color-text-tertiary)]",
    "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent",
    "resize-none",
    o && "opacity-50 cursor-not-allowed bg-[var(--color-surface-hover)]"
  );
  return /* @__PURE__ */ i(
    "div",
    {
      className: p(
        "flex items-end gap-2 p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]",
        c
      ),
      style: u,
      children: [
        n ? /* @__PURE__ */ r(
          "textarea",
          {
            className: h,
            value: e,
            onChange: (d) => t(d.target.value),
            onKeyDown: x,
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
            className: h,
            value: e,
            onChange: (d) => t(d.target.value),
            onKeyDown: x,
            disabled: o,
            placeholder: l,
            autoFocus: f
          }
        ),
        /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            onClick: m,
            disabled: !w,
            className: p(
              "px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex-shrink-0",
              w ? "bg-[var(--color-primary)] text-white hover:opacity-90" : "bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] cursor-not-allowed"
            ),
            children: s
          }
        )
      ]
    }
  );
}
function pt({ name: e, done: t, className: a }) {
  return /* @__PURE__ */ i(
    "span",
    {
      className: p(
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
function ft({ toolCalls: e, className: t }) {
  return /* @__PURE__ */ r("div", { className: p("flex flex-wrap gap-1.5 py-1", t), children: e.map((a) => /* @__PURE__ */ r(pt, { name: a.name, done: a.done }, a.id)) });
}
function br({
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
  return /* @__PURE__ */ i("div", { className: p("flex flex-col gap-1.5 py-3", c), children: [
    /* @__PURE__ */ r("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]", children: u }),
    a && a.length > 0 && /* @__PURE__ */ r(ft, { toolCalls: a }),
    e === "user" ? /* @__PURE__ */ r("div", { className: "text-sm text-[var(--color-text-primary)] whitespace-pre-wrap", children: t }) : /* @__PURE__ */ r("div", { className: "text-sm text-[var(--color-text-primary)] prose-sm max-w-none", children: t ? s ? s(t) : /* @__PURE__ */ r("span", { className: "whitespace-pre-wrap", children: t }) : o ? /* @__PURE__ */ r(H, {}) : null })
  ] });
}
function hr({
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
      className: p(
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
          t && !e && /* @__PURE__ */ r(H, { size: "sm" })
        ] }),
        /* @__PURE__ */ r("div", { className: "px-3 py-2 text-xs text-[var(--color-text-secondary)] italic border-t border-[var(--color-border)] bg-white whitespace-pre-wrap leading-relaxed", children: e || /* @__PURE__ */ r(H, {}) })
      ]
    }
  );
}
function vr({
  prompts: e,
  onSelect: t,
  columns: a,
  title: o,
  className: n
}) {
  const l = a ? `repeat(${a}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(220px, 1fr))";
  return /* @__PURE__ */ i("div", { className: p("flex flex-col gap-3", n), children: [
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
function gr({
  suggestions: e,
  onSelect: t,
  onRefresh: a,
  label: o,
  className: n
}) {
  return /* @__PURE__ */ i("div", { className: p("flex items-center flex-wrap gap-1.5 py-2", n), children: [
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
function yr({
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
      className: p(
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
                  className: p(
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
function wr({ user: e, items: t, className: a, "data-testid": o }) {
  const [n, l] = T(!1), s = B(null), c = R(() => l(!1), []);
  return A(() => {
    if (!n) return;
    const u = (f) => {
      s.current && !s.current.contains(f.target) && c();
    };
    return document.addEventListener("mousedown", u), () => document.removeEventListener("mousedown", u);
  }, [n, c]), A(() => {
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
      className: p("relative inline-block", a),
      children: [
        /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            "aria-label": `User menu for ${e.name}`,
            "aria-expanded": n,
            "aria-haspopup": "menu",
            onClick: () => l((u) => !u),
            className: p(
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
                  className: p(
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
            className: p(
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
                    className: p(
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
function xt({ item: e, isLast: t }) {
  const a = p(
    "text-sm leading-snug transition-colors duration-100",
    t ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal"
  );
  return t || !e.href && !e.onClick ? /* @__PURE__ */ r("span", { className: a, "aria-current": t ? "page" : void 0, children: e.label }) : e.href ? /* @__PURE__ */ r("a", { href: e.href, onClick: e.onClick, className: p(a, "no-underline"), children: e.label }) : /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      onClick: e.onClick,
      className: p(a, "border-none bg-transparent cursor-pointer font-[inherit] p-0"),
      children: e.label
    }
  );
}
function mt(e, t) {
  if (e.length <= t) return e;
  const a = e.slice(0, 1), o = e.slice(-(t - 2 > 0 ? t - 2 : 1));
  return [...a, null, ...o];
}
function Nr({
  items: e,
  separator: t = "/",
  maxItems: a,
  className: o,
  "data-testid": n
}) {
  if (e.length === 0) return null;
  const l = a != null ? mt(e, a) : e;
  return /* @__PURE__ */ r("nav", { "aria-label": "Breadcrumb", "data-testid": n, className: p("flex items-center", o), children: /* @__PURE__ */ r("ol", { className: "flex items-center gap-1 flex-wrap list-none m-0 p-0", children: l.map((s, c) => {
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
      ) : /* @__PURE__ */ r(xt, { item: s, isLast: u }),
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
const bt = {
  active: { bg: "#f0fdf4", border: "#86efac", text: "#166534", accent: "#16a34a" },
  in_progress: { bg: "#eff6ff", border: "#93c5fd", text: "#1e40af", accent: "#3b82f6" },
  completed: { bg: "#f0fdf4", border: "#86efac", text: "#166534", accent: "#16a34a" },
  archived: { bg: "#f9fafb", border: "#d1d5db", text: "#6b7280", accent: "#9ca3af" },
  planning: { bg: "#fefce8", border: "#fde047", text: "#713f12", accent: "#eab308" },
  paused: { bg: "#fff7ed", border: "#fdba74", text: "#9a3412", accent: "#f97316" }
}, ht = {
  bg: "#f3f4f6",
  border: "#d1d5db",
  text: "#374151",
  accent: "#6b7280"
};
function vt({ status: e, colors: t }) {
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
function kr({
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
  className: w,
  style: m,
  minHeight: x = 190
}) {
  const h = { ...bt, ...o }, d = (a ?? "unknown").toLowerCase().replace(/ /g, "_"), y = h[d] ?? ht, N = l !== void 0 ? Math.max(0, l - n.length) : 0, E = f % 8 * 525;
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      onClick: b,
      className: w,
      style: {
        background: "#fff",
        border: "1.5px solid #e5e7eb",
        borderTop: `3px solid ${y.accent}`,
        borderRadius: 10,
        padding: "14px 16px 12px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transition: "box-shadow 0.15s, transform 0.1s",
        minHeight: x,
        width: "100%",
        textAlign: "left",
        font: "inherit",
        color: "inherit",
        ...m
      },
      onMouseEnter: (v) => {
        const C = v.currentTarget;
        C.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)", C.style.transform = "translateY(-1px)", C.style.borderColor = y.border;
      },
      onMouseLeave: (v) => {
        const C = v.currentTarget;
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
              a && /* @__PURE__ */ r(vt, { status: a, colors: y })
            ]
          }
        ),
        /* @__PURE__ */ r(ye, { items: s, staggerMs: E }),
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
                n.length > 0 ? /* @__PURE__ */ r(he, { names: n, maxVisible: 5, size: 24 }) : /* @__PURE__ */ i("span", { style: { fontSize: 12, color: "#9ca3af" }, children: [
                  /* @__PURE__ */ r("strong", { style: { color: "#374151" }, children: l ?? 0 }),
                  " contributors"
                ] }),
                n.length > 0 && N > 0 && /* @__PURE__ */ i("span", { style: { fontSize: 11, color: "#9ca3af" }, children: [
                  "+",
                  N,
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
function gt(e) {
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
function Q({
  items: e,
  storageKey: t,
  title: a,
  renderNavItem: o
}) {
  const n = O(() => gt(e), [e]), l = n.some((s) => s.name !== null);
  return /* @__PURE__ */ r("nav", { className: "flex-1 overflow-y-auto py-1", children: l ? n.map(
    (s) => s.name === null ? /* @__PURE__ */ r(Z, { items: s.items, renderNavItem: o }, "__ungrouped") : /* @__PURE__ */ r(
      yt,
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
function Cr({
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
  children: w
}) {
  const m = c && c.length > 0;
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
          /* @__PURE__ */ r(Q, { items: t, storageKey: l, title: e, renderNavItem: b })
        ]
      }
    ),
    m && /* @__PURE__ */ i(
      "aside",
      {
        className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
        style: { width: f },
        children: [
          /* @__PURE__ */ r("div", { className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]", children: /* @__PURE__ */ r("span", { className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]", children: s ?? "" }) }),
          /* @__PURE__ */ r(
            Q,
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
    /* @__PURE__ */ r("main", { className: "flex-1 min-w-0 overflow-auto p-6", children: w })
  ] });
}
function Z({
  items: e,
  renderNavItem: t
}) {
  return /* @__PURE__ */ r(P, { children: e.map((a) => /* @__PURE__ */ r(ne, { item: a, renderNavItem: t }, a.path)) });
}
function yt({
  name: e,
  items: t,
  storageKey: a,
  renderNavItem: o
}) {
  const [n, l] = T(() => typeof window > "u" ? !1 : window.localStorage?.getItem(a) === "1");
  A(() => {
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
  const a = e.accent === "danger" ? "#dc2626" : e.accent === "warning" ? "#d97706" : e.accent === "success" ? "#16a34a" : void 0, o = /* @__PURE__ */ i(P, { children: [
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
  ) : t ? /* @__PURE__ */ r(P, { children: t(e, o, n) }) : /* @__PURE__ */ r(
    "a",
    {
      href: e.path,
      className: "block px-[14px] py-2 border-l-[3px] border-transparent text-[var(--color-text-secondary)] no-underline cursor-pointer",
      children: o
    }
  );
}
const wt = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function X(e) {
  return Array.from(e.querySelectorAll(wt)).filter(
    (t) => t.getAttribute("aria-hidden") !== "true"
  );
}
function Nt(e, t, a) {
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
function Sr({
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
  const f = B(null), [b, w] = T(null), m = B(null), x = R(() => {
    const h = e.current;
    if (!h) return;
    const d = h.getBoundingClientRect();
    w(Nt(d, o, n));
  }, [e, o, n]);
  return ce(() => {
    if (!t) {
      w(null);
      return;
    }
    x();
  }, [t, x]), A(() => {
    if (!t) return;
    const h = () => x();
    return window.addEventListener("scroll", h, !0), window.addEventListener("resize", h), () => {
      window.removeEventListener("scroll", h, !0), window.removeEventListener("resize", h);
    };
  }, [t, x]), A(() => {
    if (!t) return;
    const h = typeof document < "u" ? document.activeElement : null;
    return m.current = h, queueMicrotask(() => {
      const d = f.current;
      if (!d) return;
      const y = X(d);
      y.length > 0 ? y[0].focus() : (d.setAttribute("tabindex", "-1"), d.focus());
    }), () => {
      const d = m.current;
      d && typeof d.focus == "function" && document.contains(d) && d.focus(), m.current = null;
    };
  }, [t]), A(() => {
    if (!t) return;
    const h = (d) => {
      if (d.key === "Escape") {
        d.stopPropagation(), a();
        return;
      }
      if (d.key !== "Tab") return;
      const y = f.current;
      if (!y) return;
      const N = X(y);
      if (N.length === 0) {
        d.preventDefault();
        return;
      }
      const E = N[0], v = N[N.length - 1], C = document.activeElement;
      if (!C || !y.contains(C)) {
        d.preventDefault(), E.focus();
        return;
      }
      d.shiftKey && C === E ? (d.preventDefault(), v.focus()) : !d.shiftKey && C === v && (d.preventDefault(), E.focus());
    };
    return window.addEventListener("keydown", h), () => window.removeEventListener("keydown", h);
  }, [t, a]), A(() => {
    if (!t) return;
    const h = (d) => {
      const y = d.target;
      y && (f.current?.contains(y) || e.current?.contains(y) || a());
    };
    return document.addEventListener("mousedown", h), () => document.removeEventListener("mousedown", h);
  }, [t, a, e]), !t || !b || typeof document > "u" ? null : re(
    /* @__PURE__ */ r(
      "div",
      {
        ref: f,
        role: "dialog",
        "data-testid": c,
        "data-placement": o,
        className: p(
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
  pr as A,
  Nr as B,
  fr as C,
  Wt as D,
  ar as E,
  tr as F,
  pt as G,
  ft as H,
  sr as I,
  cr as J,
  Zt as K,
  xr as L,
  br as M,
  wr as N,
  rt as O,
  ir as P,
  vr as Q,
  Oe as R,
  lr as S,
  Jt as T,
  er as U,
  Kt as V,
  Ht as W,
  yr as a,
  mr as b,
  Pt as c,
  or as d,
  Ut as e,
  Gt as f,
  Ft as g,
  dr as h,
  nr as i,
  zt as j,
  gr as k,
  qt as l,
  Sr as m,
  Vt as n,
  ot as o,
  We as p,
  Xt as q,
  kr as r,
  rr as s,
  ut as t,
  Qt as u,
  Cr as v,
  Yt as w,
  ur as x,
  hr as y,
  H as z
};
