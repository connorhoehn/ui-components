import { jsxs as i, jsx as t, Fragment as I } from "react/jsx-runtime";
import { useState as T, useCallback as R, createContext as ie, useMemo as O, useEffect as A, useRef as B, useContext as ce, useId as te, useLayoutEffect as de } from "react";
import { c as u } from "./cn-B6yFEsav.js";
import { _ as M } from "./index-DvoJowRO.js";
import { M as ue } from "./Modal-2jg4229_.js";
import { T as pe, b as fe, e as V, a as xe, c as G, d as K } from "./PageSection-Dj8r4YIt.js";
import { S as me } from "./PermissionDeniedCard-B9U2evs3.js";
import { S as be, C as he } from "./CardHeader-DuyI9Sk3.js";
import { A as z, a as ge } from "./Avatar-BvKIaNVE.js";
import { S as re } from "./StatusDot-BC7B1tTr.js";
import { createPortal as ae } from "react-dom";
import { C as ve } from "./Card-B2uO9v1w.js";
import { C as ye } from "./Chip-CAS9vOWq.js";
import { A as we } from "./Badge-DfLjuUrl.js";
import "clsx";
import "tailwind-merge";
const Ne = [
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
], ke = [
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
], Ce = [
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
function Se(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function $e(e, r) {
  let a = e.replace(/(\/\/.*?)(\n|$)/g, `<span style="color:${r.comment}">$1</span>$2`);
  a = a.replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:${r.comment}">$1</span>`), a = a.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    `<span style="color:${r.string}">$1</span>`
  );
  const n = new RegExp(`\\b(${Ne.join("|")})\\b`, "g");
  return a = a.replace(n, `<span style="color:${r.keyword}">$1</span>`), a = a.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span style="color:${r.number}">$1</span>`), a;
}
function Ee(e, r) {
  let a = e.replace(
    /("(?:[^"\\]|\\.)*")(\s*:)/g,
    `<span style="color:${r.property}">$1</span>$2`
  );
  return a = a.replace(/("(?:[^"\\]|\\.)*")/g, `<span style="color:${r.string}">$1</span>`), a = a.replace(/\b(true|false|null)\b/g, `<span style="color:${r.keyword}">$1</span>`), a = a.replace(/\b(-?\d+(?:\.\d+)?)\b/g, `<span style="color:${r.number}">$1</span>`), a;
}
function Le(e, r) {
  let a = e.replace(/(#.*?)(\n|$)/g, `<span style="color:${r.comment}">$1</span>$2`);
  a = a.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, `<span style="color:${r.string}">$1</span>`);
  const n = new RegExp(`\\b(${ke.join("|")})\\b`, "g");
  a = a.replace(n, `<span style="color:${r.keyword}">$1</span>`);
  const o = new RegExp(`\\b(${Ce.join("|")})\\b`, "g");
  return a = a.replace(o, `<span style="color:${r.builtin}">$1</span>`), a = a.replace(/(\$\w+|\$\{[^}]+\})/g, `<span style="color:${r.variable}">$1</span>`), a;
}
const Te = {
  comment: "#6b7280",
  string: "#4ade80",
  keyword: "#93c5fd",
  number: "#fbbf24",
  property: "#7dd3fc",
  builtin: "#c4b5fd",
  variable: "#fbbf24"
}, Ae = {
  comment: "#64748b",
  string: "#15803d",
  keyword: "#1d4ed8",
  number: "#a16207",
  property: "#0369a1",
  builtin: "#7c3aed",
  variable: "#a16207"
};
function Y(e, r, a) {
  const n = a === "dark" ? Te : Ae, o = Se(e);
  switch (r) {
    case "json":
      return Ee(o, n);
    case "bash":
    case "sh":
      return Le(o, n);
    case "text":
      return o;
    default:
      return $e(o, n);
  }
}
function Pt({
  code: e,
  language: r = "tsx",
  theme: a = "dark",
  copyButton: n = !0,
  showLineNumbers: o = !1,
  className: l,
  style: s,
  "data-testid": c,
  ariaLabel: p
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
      "data-language": r,
      "data-theme": a,
      className: u(
        "relative rounded-lg border font-mono text-[13px] leading-relaxed overflow-hidden",
        m ? "bg-slate-800 text-slate-100 border-slate-700" : "bg-slate-50 text-slate-900 border-slate-200",
        l
      ),
      style: s,
      "aria-label": p ?? `Code (${r})`,
      children: [
        n && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: w,
            "aria-label": f ? "Copied" : "Copy code",
            className: u(
              "absolute top-2 right-2 text-[11px] px-2 py-1 rounded border transition-opacity",
              m ? "bg-slate-700 text-slate-100 border-slate-600 hover:bg-slate-600" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            ),
            "data-copied": f ? "true" : "false",
            children: f ? "Copied" : "Copy"
          }
        ),
        /* @__PURE__ */ t("pre", { className: "m-0 px-4 py-3 overflow-x-auto", children: o ? /* @__PURE__ */ i("div", { className: "flex", children: [
          /* @__PURE__ */ t(
            "div",
            {
              className: u(
                "select-none pr-3 text-right",
                m ? "text-slate-500" : "text-slate-400"
              ),
              "aria-hidden": "true",
              children: x.map((h, d) => /* @__PURE__ */ t("div", { children: d + 1 }, d))
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
const _e = "cui:command-palette:recents", Re = 5;
function Me(e, r) {
  if (!e || typeof window > "u") return [];
  try {
    const a = window.localStorage.getItem(e);
    if (!a) return [];
    const n = JSON.parse(a);
    return Array.isArray(n) ? n.filter((o) => typeof o == "string").slice(0, r) : [];
  } catch {
    return [];
  }
}
function Oe(e, r) {
  if (!(!e || typeof window > "u"))
    try {
      window.localStorage.setItem(e, JSON.stringify(r));
    } catch {
    }
}
const ne = ie(null);
function U() {
  const e = ce(ne);
  if (!e)
    throw new Error(
      "useCommandPalette must be used inside a <CommandPaletteProvider>."
    );
  return e;
}
function It() {
  const { open: e, close: r, toggle: a, isOpen: n, query: o } = U();
  return { open: e, close: r, toggle: a, isOpen: n, query: o };
}
function De(e, r) {
  const a = r.toLowerCase().split("+").map((b) => b.trim()).filter(Boolean);
  if (a.length === 0) return !1;
  const n = a[a.length - 1], o = new Set(a.slice(0, -1)), l = o.has("cmd") || o.has("meta"), s = o.has("ctrl"), c = o.has("mod"), p = o.has("shift"), f = o.has("alt");
  if (c) {
    if (!e.metaKey && !e.ctrlKey) return !1;
  } else if (l !== e.metaKey || s !== e.ctrlKey) return !1;
  return p !== e.shiftKey || f !== e.altKey ? !1 : e.key.toLowerCase() === n;
}
function Kt({
  commands: e,
  getDynamicCommands: r,
  recentsKey: a = _e,
  recentsLimit: n = Re,
  children: o
}) {
  const [l, s] = T(!1), [c, p] = T(""), [f, b] = T(
    () => /* @__PURE__ */ new Map()
  ), [w, m] = T(
    () => Me(a, n)
  ), x = R(
    (S) => {
      a !== null && m((k) => {
        const $ = [S, ...k.filter((D) => D !== S)].slice(
          0,
          n
        );
        return Oe(a, $), $;
      });
    },
    [a, n]
  ), h = R(() => s(!0), []), d = R(() => {
    s(!1), p("");
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
  const g = O(() => {
    const S = r ? r(c) : [];
    return [...e ?? [], ...S, ...f.values()].filter(($) => $.when ? $.when() : !0);
  }, [e, r, c, f]), C = B(g);
  C.current = g, A(() => {
    const S = (k) => {
      if (!((k.metaKey || k.ctrlKey) && k.key.toLowerCase() === "k")) {
        for (const $ of C.current)
          if ($.hotkey && De(k, $.hotkey)) {
            k.preventDefault(), Promise.resolve().then(() => $.run());
            return;
          }
      }
    };
    return window.addEventListener("keydown", S), () => window.removeEventListener("keydown", S);
  }, []);
  const P = {
    open: h,
    close: d,
    toggle: y,
    isOpen: l,
    query: c,
    setQuery: p,
    mergedCommands: g,
    registerCommand: N,
    unregisterCommand: E,
    recents: w,
    noteSelection: x
  };
  return /* @__PURE__ */ t(ne.Provider, { value: P, children: o });
}
function Ht(e) {
  const { registerCommand: r, unregisterCommand: a } = U();
  A(() => (r(e), () => a(e.id)), [e, r, a]);
}
function je(e) {
  const r = /* @__PURE__ */ new Map();
  for (const a of e) {
    const n = a.group ?? null, o = r.get(n);
    o ? o.push(a) : r.set(n, [a]);
  }
  return Array.from(r.entries()).map(([a, n]) => ({
    groupName: a,
    items: n
  }));
}
function Ft({
  placeholder: e = "Type a command or search…",
  emptyState: r,
  className: a
} = {}) {
  const {
    isOpen: n,
    close: o,
    query: l,
    setQuery: s,
    mergedCommands: c,
    recents: p,
    noteSelection: f
  } = U(), b = O(() => {
    if (l.trim() !== "" || p.length === 0) return [];
    const x = new Map(c.map((h) => [h.id, h]));
    return p.map((h) => x.get(h)).filter((h) => !!h);
  }, [c, l, p]), w = O(() => je(c), [c]), m = R(
    (x) => {
      f(x.id), o(), Promise.resolve().then(() => x.run());
    },
    [o, f]
  );
  return /* @__PURE__ */ t(
    ue,
    {
      open: n,
      onClose: o,
      maxWidth: 640,
      rawChildren: !0,
      backdropTestId: "command-palette-backdrop",
      children: /* @__PURE__ */ i(
        M,
        {
          label: "Command palette",
          value: void 0,
          className: u("flex flex-col gap-0 w-full", a),
          "data-testid": "command-palette",
          children: [
            /* @__PURE__ */ t(
              M.Input,
              {
                value: l,
                onValueChange: s,
                placeholder: e,
                "data-autofocus": !0,
                className: u(
                  "w-full px-3 py-2.5 text-sm border-0 border-b border-border",
                  "outline-none bg-transparent text-text-primary placeholder:text-text-tertiary"
                ),
                "data-testid": "command-palette-input"
              }
            ),
            /* @__PURE__ */ i(M.List, { className: "max-h-[360px] overflow-y-auto py-2", children: [
              /* @__PURE__ */ t(M.Empty, { className: "px-3 py-6 text-center text-sm text-text-tertiary", children: r ?? "No results." }),
              b.length > 0 && /* @__PURE__ */ t(M.Group, { heading: "Recent", "data-testid": "command-palette-group-recent", children: b.map((x) => /* @__PURE__ */ i(
                M.Item,
                {
                  value: `recent-${x.id} ${x.label}`,
                  keywords: x.keywords,
                  onSelect: () => m(x),
                  "data-testid": `command-palette-recent-${x.id}`,
                  className: u(
                    "flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm",
                    "text-text-primary aria-selected:bg-surface-hover"
                  ),
                  children: [
                    x.icon && /* @__PURE__ */ t("span", { className: "shrink-0 text-text-secondary", children: x.icon }),
                    /* @__PURE__ */ t("span", { className: "flex-1 truncate", children: x.label })
                  ]
                },
                `recent-${x.id}`
              )) }),
              w.map(({ groupName: x, items: h }) => /* @__PURE__ */ t(
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
                      className: u(
                        "flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm",
                        "text-text-primary aria-selected:bg-surface-hover"
                      ),
                      children: [
                        d.icon && /* @__PURE__ */ t("span", { className: "shrink-0 text-text-secondary", children: d.icon }),
                        /* @__PURE__ */ t("span", { className: "flex-1 truncate", children: d.label }),
                        d.hint && /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary truncate", children: d.hint }),
                        d.shortcut && d.shortcut.length > 0 && /* @__PURE__ */ t("span", { className: "flex items-center gap-1 shrink-0", children: d.shortcut.map((y, N) => /* @__PURE__ */ t(
                          "kbd",
                          {
                            className: u(
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
function Ut({ className: e } = {}) {
  const { toggle: r } = U();
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      onClick: r,
      "data-testid": "command-palette-hint",
      className: u(
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
function Gt({
  data: e,
  columns: r,
  keyField: a,
  onRowClick: n,
  rowActions: o,
  searchable: l = !1,
  searchPlaceholder: s = "Search…",
  pageSize: c,
  emptyMessage: p = "No records.",
  loading: f = !1,
  loadingRows: b = 5,
  className: w,
  "data-testid": m
}) {
  const [x, h] = T(null), [d, y] = T("asc"), [N, E] = T(""), [g, C] = T(0), P = (v) => {
    x === v ? y((_) => _ === "asc" ? "desc" : "asc") : (h(v), y("asc"));
  }, S = O(() => {
    if (!l || N.trim() === "") return e;
    const v = N.trim().toLowerCase();
    return e.filter(
      (_) => r.some((L) => L.filterable === !1 ? !1 : (L.getFilterText ? L.getFilterText(_) : String(_[L.key] ?? "")).toLowerCase().includes(v))
    );
  }, [e, r, N, l]), k = O(() => {
    if (!x) return S;
    const v = r.find((j) => j.key === x);
    if (!v || !v.sortable) return S;
    const _ = v.compare ?? ((j, H) => {
      const le = String(j[v.key] ?? ""), se = String(H[v.key] ?? "");
      return le.localeCompare(se);
    }), L = [...S];
    return L.sort((j, H) => d === "asc" ? _(j, H) : -_(j, H)), L;
  }, [S, r, x, d]), $ = c && c > 0 ? Math.max(1, Math.ceil(k.length / c)) : 1, D = Math.min(g, $ - 1), q = O(() => {
    if (!c || c <= 0) return k;
    const v = D * c;
    return k.slice(v, v + c);
  }, [k, c, D]);
  return /* @__PURE__ */ i("div", { className: u("flex flex-col gap-3", w), "data-testid": m, children: [
    l && /* @__PURE__ */ t(
      "input",
      {
        type: "text",
        value: N,
        onChange: (v) => {
          E(v.target.value), C(0);
        },
        placeholder: s,
        "aria-label": "Search",
        "data-testid": "datatable-search",
        className: "w-full max-w-xs rounded-md border border-border-field bg-surface px-3 py-1.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none"
      }
    ),
    /* @__PURE__ */ i(pe, { className: "border border-border rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ t(fe, { children: /* @__PURE__ */ i("tr", { children: [
        r.map((v) => {
          const _ = v.sortable && x === v.key;
          return /* @__PURE__ */ t(
            V,
            {
              sortable: v.sortable,
              sortDirection: _ ? d : null,
              style: v.width ? { width: v.width } : void 0,
              className: u(W(v.align), v.className),
              onClick: v.sortable ? () => P(v.key) : void 0,
              "data-testid": v.sortable ? `datatable-header-${v.key}` : void 0,
              children: v.header
            },
            v.key
          );
        }),
        o && /* @__PURE__ */ t(V, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ t(xe, { children: f ? Array.from({ length: b }).map((v, _) => /* @__PURE__ */ i(G, { "data-testid": "datatable-loading-row", children: [
        r.map((L) => /* @__PURE__ */ t(K, { className: W(L.align), children: /* @__PURE__ */ t("div", { className: "h-4 w-3/4 animate-pulse rounded bg-slate-100" }) }, L.key)),
        o && /* @__PURE__ */ t(K, { className: "text-right", children: /* @__PURE__ */ t("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-slate-100" }) })
      ] }, `skeleton-${_}`)) : q.length === 0 ? /* @__PURE__ */ t(G, { children: /* @__PURE__ */ t(
        K,
        {
          colSpan: r.length + (o ? 1 : 0),
          className: "text-center text-text-secondary py-8",
          children: p
        }
      ) }) : q.map((v, _) => /* @__PURE__ */ i(
        G,
        {
          clickable: !!n,
          onClick: n ? () => n(v) : void 0,
          children: [
            r.map((L) => /* @__PURE__ */ t(
              K,
              {
                className: u(W(L.align), L.className),
                children: L.render ? L.render(v, _) : String(v[L.key] ?? "")
              },
              L.key
            )),
            o && /* @__PURE__ */ t(K, { className: "text-right", onClick: (L) => L.stopPropagation(), children: /* @__PURE__ */ t("div", { className: "flex items-center justify-end gap-2", children: o(v) }) })
          ]
        },
        a(v)
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
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => C((v) => Math.max(0, v - 1)),
            disabled: D === 0,
            "data-testid": "datatable-prev",
            className: "rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50",
            children: "Prev"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => C((v) => Math.min($ - 1, v + 1)),
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
function Wt({
  icon: e = "⚠️",
  title: r,
  body: a,
  description: n,
  actionLabel: o,
  onAction: l,
  action: s,
  testId: c = "error-state",
  actionTestId: p = "error-state-action"
}) {
  const f = n ?? a;
  return /* @__PURE__ */ i(
    "div",
    {
      role: "alert",
      "data-testid": c,
      className: u(
        "flex flex-col items-center justify-center min-h-[220px]",
        "text-text-secondary gap-2 p-8 font-[inherit]"
      ),
      children: [
        e && (typeof e == "string" ? /* @__PURE__ */ t("div", { className: "text-[52px] mb-2", "aria-hidden": !0, children: e }) : /* @__PURE__ */ t("div", { className: "mb-2", children: e })),
        /* @__PURE__ */ t("div", { className: "text-[17px] font-semibold text-[var(--color-state-error,#dc2626)]", children: r }),
        f && /* @__PURE__ */ t("div", { className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal", children: f }),
        s ? /* @__PURE__ */ t("div", { className: "mt-2.5", children: s }) : o && l && /* @__PURE__ */ t(
          "button",
          {
            "data-testid": p,
            onClick: l,
            type: "button",
            className: u(
              "mt-2.5 px-[22px] py-[9px] text-sm font-semibold",
              "bg-surface text-text-primary border border-border rounded-lg cursor-pointer font-[inherit]",
              "hover:bg-slate-50"
            ),
            children: o
          }
        )
      ]
    }
  );
}
function zt({
  label: e = "Loading…",
  description: r,
  spinnerSize: a = "lg",
  spinnerColor: n,
  testId: o = "loading-state"
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      "data-testid": o,
      className: u(
        "flex flex-col items-center justify-center min-h-[220px]",
        "text-text-secondary gap-3 p-8 font-[inherit]"
      ),
      children: [
        /* @__PURE__ */ t(me, { size: a, color: n, "aria-label": e }),
        /* @__PURE__ */ t("div", { className: "text-[15px] font-medium text-text-primary", children: e }),
        r && /* @__PURE__ */ t("div", { className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal", children: r })
      ]
    }
  );
}
function qt({
  label: e,
  hint: r,
  error: a,
  required: n = !1,
  layout: o = "stacked",
  children: l,
  className: s,
  style: c,
  "data-testid": p
}) {
  const f = te(), b = `${f}-label`, w = r || a ? `${f}-desc` : void 0, m = {
    id: f,
    labelId: b,
    "aria-describedby": w,
    "aria-invalid": a ? !0 : void 0
  };
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": p,
      className: u(
        o === "inline" ? "flex items-center gap-3" : "flex flex-col gap-1",
        s
      ),
      style: c,
      children: [
        /* @__PURE__ */ i(
          "label",
          {
            id: b,
            htmlFor: f,
            className: u(
              "text-[12px] font-medium",
              o === "inline" ? "min-w-[140px]" : "",
              a ? "text-[#991b1b]" : "text-gray-700"
            ),
            children: [
              e,
              n && /* @__PURE__ */ t("span", { className: "ml-0.5 text-[#991b1b]", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ i("div", { className: u(o === "inline" ? "flex-1" : ""), children: [
          l(m),
          (r || a) && /* @__PURE__ */ t(
            "div",
            {
              id: w,
              className: u(
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
const Be = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm"
};
function Pe(e) {
  switch (e) {
    case "underline":
      return "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
    case "pill":
      return "inline-flex items-center gap-1";
    case "segmented":
      return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5";
  }
}
function Ie(e, r, a) {
  return e === "underline" ? u(
    "-mb-px border-b-2 rounded-none",
    r ? "border-[var(--color-primary)] text-[var(--color-text-primary)]" : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
    a && "opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]"
  ) : e === "pill" ? u(
    "rounded-full",
    r ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]",
    a && "opacity-50 cursor-not-allowed hover:bg-transparent"
  ) : u(
    "rounded-md",
    r ? "bg-white shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]",
    a && "opacity-50 cursor-not-allowed hover:bg-transparent"
  );
}
function Vt({
  items: e,
  value: r,
  onValueChange: a,
  variant: n = "underline",
  size: o = "md",
  className: l,
  style: s,
  "aria-label": c,
  idPrefix: p
}) {
  const f = te(), b = p ?? f, w = B(/* @__PURE__ */ new Map()), m = O(() => e.filter((d) => !d.disabled).map((d) => d.id), [e]), x = R((d) => {
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
        const g = m[E];
        a(g), x(g);
      }
    },
    [m, a, x]
  );
  return /* @__PURE__ */ t(
    "div",
    {
      role: "tablist",
      "aria-label": c,
      className: u(Pe(n), l),
      style: s,
      children: e.map((d) => {
        const y = d.id === r;
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
            className: u(
              "inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer",
              Be[o],
              Ie(n, y, !!d.disabled)
            ),
            children: [
              d.icon,
              /* @__PURE__ */ t("span", { children: d.label }),
              d.badge !== void 0 && d.badge !== null && /* @__PURE__ */ t(
                "span",
                {
                  className: u(
                    "ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold",
                    y && n === "pill" ? "bg-white/20 text-white" : "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"
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
function Yt({ id: e, when: r, idPrefix: a, className: n, style: o, children: l }) {
  return e !== r ? null : /* @__PURE__ */ t(
    "div",
    {
      role: "tabpanel",
      id: a ? `${a}-panel-${e}` : void 0,
      "aria-labelledby": a ? `${a}-tab-${e}` : void 0,
      tabIndex: 0,
      className: n,
      style: o,
      children: l
    }
  );
}
const Ke = {
  positive: "text-[var(--color-success)]",
  negative: "text-[var(--color-danger)]",
  neutral: "text-[var(--color-text-secondary)]"
};
function He(e) {
  return e.tone ?? (e.direction === "up" ? "positive" : "negative");
}
function Jt({
  label: e,
  value: r,
  accent: a = !1,
  danger: n = !1,
  hint: o,
  delta: l,
  sparklineData: s,
  to: c,
  as: p,
  onClick: f,
  mono: b = !1,
  className: w,
  style: m,
  "data-testid": x
}) {
  const h = u(
    "block rounded-lg border p-3 no-underline transition-colors",
    !a && !n && "bg-[var(--color-surface)] border-[var(--color-border)]",
    a && "bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]",
    n && "bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]",
    (c || f) && "hover:bg-[var(--color-surface-hover)] cursor-pointer",
    w
  ), d = s && s.length > 0 ? s : null;
  let y = null;
  if (l) {
    const E = He(l), g = l.direction === "up" ? "▲" : "▼", C = l.direction === "up" ? "+" : "-", P = l.suffix ?? "%", S = Math.abs(l.value), k = l["aria-label"] ?? `${l.direction} ${S}${P}`;
    y = /* @__PURE__ */ i(
      "div",
      {
        "data-testid": "stat-card-delta",
        "data-direction": l.direction,
        "data-tone": E,
        "aria-label": k,
        className: u("mt-1 text-[12px] font-medium leading-tight", Ke[E]),
        children: [
          /* @__PURE__ */ i("span", { "aria-hidden": "true", children: [
            g,
            " "
          ] }),
          C,
          S,
          P
        ]
      }
    );
  }
  const N = /* @__PURE__ */ i(I, { children: [
    /* @__PURE__ */ t("div", { className: "text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]", children: e }),
    /* @__PURE__ */ i("div", { className: "mt-1 flex items-center gap-2", children: [
      /* @__PURE__ */ t(
        "div",
        {
          className: u(
            "text-[24px] font-bold leading-tight text-[var(--color-text-primary)]",
            b && "font-mono"
          ),
          children: r
        }
      ),
      d && /* @__PURE__ */ t(be, { data: d, width: 80, height: 20 })
    ] }),
    y,
    o != null && /* @__PURE__ */ t("div", { className: "mt-1 text-[11px] italic text-[var(--color-text-tertiary)]", children: o })
  ] });
  return c ? p ? /* @__PURE__ */ t(p, { to: c, "data-testid": x, className: h, style: m, children: N }) : /* @__PURE__ */ t("a", { href: c, "data-testid": x, className: h, style: m, children: N }) : f ? /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      onClick: f,
      "data-testid": x,
      className: u(h, "w-full text-left"),
      style: m,
      children: N
    }
  ) : /* @__PURE__ */ t("div", { "data-testid": x, className: h, style: m, children: N });
}
const Fe = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4"
};
function Qt({
  children: e,
  columns: r = 4,
  dense: a = !1,
  className: n,
  style: o,
  "data-testid": l = "kpi-grid"
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-testid": l,
      className: u(
        "grid grid-cols-1",
        Fe[r],
        a ? "gap-2" : "gap-4",
        n
      ),
      style: o,
      children: e
    }
  );
}
const Ue = {
  sm: "h-1.5",
  md: "h-2"
};
function Zt({
  value: e,
  max: r = 100,
  color: a,
  size: n = "md",
  label: o,
  showRatio: l = !0,
  className: s,
  style: c,
  "data-testid": p,
  "aria-label": f
}) {
  const b = r > 0 ? r : 100, w = Math.max(0, Math.min(e, b)), m = Math.min(100, w / b * 100), x = a ?? "var(--color-primary)";
  return /* @__PURE__ */ i("div", { "data-testid": p, className: u("w-full", s), style: c, children: [
    o != null && /* @__PURE__ */ i("div", { className: "flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]", children: [
      /* @__PURE__ */ t("span", { children: o }),
      /* @__PURE__ */ t("span", { className: "text-[var(--color-text-tertiary)] tabular-nums", children: l ? `${w}/${b}` : `${Math.round(m)}%` })
    ] }),
    /* @__PURE__ */ t(
      "div",
      {
        role: "progressbar",
        "aria-valuenow": w,
        "aria-valuemin": 0,
        "aria-valuemax": b,
        "aria-label": f,
        className: u(
          "w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]",
          Ue[n]
        ),
        children: /* @__PURE__ */ t(
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
const Ge = {
  online: "var(--color-success, #22c55e)",
  away: "var(--color-state-pending, #f59e0b)",
  busy: "var(--color-state-error, #ef4444)",
  offline: "var(--color-text-tertiary, #94a3b8)",
  unknown: "var(--color-text-tertiary, #94a3b8)"
}, We = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
  unknown: "Unknown presence"
};
function ze({
  state: e,
  ariaLabel: r,
  label: a,
  pulse: n,
  size: o = "sm",
  className: l,
  style: s,
  title: c,
  "data-testid": p
}) {
  const f = n ?? e === "online", b = r ?? We[e];
  return /* @__PURE__ */ t(
    re,
    {
      color: Ge[e],
      pulse: f,
      size: o,
      label: a,
      className: l,
      style: s,
      title: c,
      "data-testid": p ?? `presence-${e}`,
      "aria-label": b
    }
  );
}
function Xt({
  name: e,
  label: r,
  avatarSize: a = 20,
  avatarColor: n,
  presence: o,
  onClick: l,
  className: s,
  style: c,
  title: p,
  "data-testid": f = "user-chip"
}) {
  return /* @__PURE__ */ i(
    l ? "button" : "span",
    {
      type: l ? "button" : void 0,
      onClick: l,
      title: p ?? e,
      "data-testid": f,
      className: u(
        "inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-[12px] text-text-primary",
        l && "hover:bg-slate-100 cursor-pointer transition-colors",
        !l && "cursor-default",
        s
      ),
      style: c,
      children: [
        /* @__PURE__ */ t(z, { name: e, size: a, color: n }),
        /* @__PURE__ */ t("span", { className: "font-medium leading-none", children: r ?? e }),
        o && /* @__PURE__ */ t(ze, { state: o, size: "xs" })
      ]
    }
  );
}
const qe = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm"
}, Ve = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", Ye = "bg-white shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]";
function er({
  options: e,
  value: r,
  onChange: a,
  size: n = "md",
  className: o
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      role: "group",
      className: u(
        "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5",
        o
      ),
      children: e.map((l) => {
        const s = l.value === r;
        return /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: () => a(l.value),
            "aria-pressed": s,
            className: u(
              "inline-flex items-center gap-1.5 rounded-md font-medium transition-all cursor-pointer",
              qe[n],
              s ? Ye : Ve
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
function tr({
  label: e,
  id: r,
  href: a,
  mono: n = !1,
  className: o,
  labelClassName: l
}) {
  const s = /* @__PURE__ */ t("span", { className: "truncate", children: e });
  return /* @__PURE__ */ i("div", { className: u("flex flex-col min-w-0", o), children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: u(
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
        className: u(
          "text-[10px] font-mono text-[var(--color-text-tertiary)] truncate mt-0.5",
          n && "tracking-tight"
        ),
        children: r
      }
    )
  ] });
}
const Je = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function rr({
  open: e,
  onClose: r,
  title: a,
  subtitle: n,
  width: o = 460,
  children: l,
  footer: s,
  "data-testid": c
}) {
  const p = B(null);
  return A(() => {
    if (!e) return;
    const f = (b) => {
      b.key === "Escape" && r();
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [e, r]), A(() => {
    if (!e) return;
    const f = p.current;
    if (!f) return;
    const b = f.querySelector(Je);
    b ? b.focus() : (f.setAttribute("tabindex", "-1"), f.focus());
  }, [e]), e ? ae(
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
          ref: p,
          role: "dialog",
          "aria-modal": "true",
          "aria-label": a,
          className: u(
            "absolute right-0 top-0 h-full bg-white shadow-xl flex flex-col",
            "transition-transform duration-200",
            e ? "translate-x-0" : "translate-x-full"
          ),
          style: { width: o },
          children: [
            /* @__PURE__ */ i("div", { className: "flex items-start justify-between p-5 border-b border-[var(--color-border)] flex-shrink-0", children: [
              /* @__PURE__ */ i("div", { className: "min-w-0", children: [
                a && /* @__PURE__ */ t("h2", { className: "text-base font-semibold text-[var(--color-text-primary)]", children: a }),
                n && /* @__PURE__ */ t("p", { className: "text-sm text-[var(--color-text-secondary)] mt-0.5", children: n })
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
function ar({
  title: e,
  defaultOpen: r = !1,
  badge: a,
  children: n,
  className: o,
  storageKey: l
}) {
  const [s, c] = T(
    () => Qe(l, r)
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
      className: u(
        "border border-[var(--color-border)] rounded-lg overflow-hidden",
        o
      ),
      children: [
        /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            className: "w-full flex items-center justify-between px-4 py-3 bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors text-left",
            onClick: () => c((p) => !p),
            "aria-expanded": s,
            children: [
              /* @__PURE__ */ t("span", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: e }),
              /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
                a,
                /* @__PURE__ */ t(
                  "svg",
                  {
                    className: u(
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
        s && /* @__PURE__ */ t("div", { className: "border-t border-[var(--color-border)] bg-white", children: n })
      ]
    }
  );
}
function nr({
  value: e,
  onChange: r,
  placeholder: a,
  onClear: n,
  className: o,
  style: l,
  autoFocus: s,
  "aria-label": c
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: u("relative inline-flex items-center", o),
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
            onChange: (p) => r(p.target.value),
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
              r(""), n?.();
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
const Ze = {
  error: "bg-[var(--color-danger-bg,#fef2f2)] border-[var(--color-danger,#dc2626)] text-[var(--color-danger,#dc2626)]",
  success: "bg-[var(--color-success-bg,#f0fdf4)] border-[var(--color-success,#16a34a)] text-[var(--color-success,#16a34a)]",
  info: "bg-[var(--color-info-bg,#eff6ff)] border-[var(--color-info,#2563eb)] text-[var(--color-info,#2563eb)]",
  warning: "bg-[var(--color-warning-bg,#fffbeb)] border-[var(--color-warning,#f59e0b)] text-[var(--color-warning,#f59e0b)]"
};
function or({ tone: e, children: r, onDismiss: a, className: n }) {
  return /* @__PURE__ */ i(
    "div",
    {
      role: e === "error" || e === "warning" ? "alert" : "status",
      "aria-live": e === "error" || e === "warning" ? "assertive" : "polite",
      className: u(
        "flex items-start gap-2 px-3 py-2 rounded-md border-l-[3px] text-sm",
        Ze[e],
        n
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
function lr({
  title: e,
  description: r,
  actions: a,
  back: n,
  badge: o,
  className: l
}) {
  return /* @__PURE__ */ i("div", { className: u("flex flex-col gap-1.5", l), children: [
    n && /* @__PURE__ */ i(
      "a",
      {
        href: n.to,
        onClick: n.onClick,
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
          n.label
        ]
      }
    ),
    /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ i("div", { className: "min-w-0 flex items-center gap-2.5", children: [
        /* @__PURE__ */ t("h1", { className: "text-xl font-semibold text-[var(--color-text-primary)] leading-tight", children: e }),
        o
      ] }),
      a && /* @__PURE__ */ t("div", { className: "flex-shrink-0 flex items-center gap-2", children: a })
    ] }),
    r && /* @__PURE__ */ t("p", { className: "text-sm text-[var(--color-text-secondary)]", children: r })
  ] });
}
function F({ size: e = "md", color: r, className: a }) {
  const n = e === "sm" ? 4 : 6, o = r || "var(--color-text-tertiary, #94a3b8)";
  return /* @__PURE__ */ i(I, { children: [
    /* @__PURE__ */ t("style", { children: `
        @keyframes thinkDot {
          0%, 80%, 100% { transform: scale(1); opacity: 0.4; }
          40% { transform: scale(1.3); opacity: 1; }
        }
      ` }),
    /* @__PURE__ */ t("span", { className: u("inline-flex items-center gap-1", a), children: [0, 1, 2].map((l) => /* @__PURE__ */ t(
      "span",
      {
        style: {
          width: n,
          height: n,
          borderRadius: "50%",
          background: o,
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
  const r = e.length - 2;
  return `${e[0]}, ${e[1]} and ${r} other${r > 1 ? "s" : ""} are typing…`;
}
function sr({
  names: e,
  compact: r = !1,
  color: a,
  size: n = "sm",
  className: o,
  "data-testid": l = "typing-indicator"
}) {
  return e.length === 0 ? null : /* @__PURE__ */ i(
    "span",
    {
      role: "status",
      "aria-live": "polite",
      "data-testid": l,
      className: u(
        "inline-flex items-center gap-1.5 text-[12px] text-text-tertiary",
        o
      ),
      children: [
        /* @__PURE__ */ t(F, { size: n, color: a }),
        !r && /* @__PURE__ */ t("span", { children: Xe(e) })
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
function ir({
  state: e,
  compact: r = !1,
  withLabel: a = !0,
  labels: n,
  className: o,
  "data-testid": l = "connection-pill"
}) {
  const s = et[e], c = n?.[e] ?? s.label, p = a && !r;
  return /* @__PURE__ */ i(
    "span",
    {
      role: "status",
      "aria-live": "polite",
      "aria-label": p ? void 0 : c,
      "data-testid": l,
      "data-state": e,
      className: u("inline-flex items-center gap-1.5 font-mono", o),
      children: [
        /* @__PURE__ */ t("span", { "aria-hidden": "true", className: s.colorClass, children: "⬤" }),
        p && /* @__PURE__ */ t("span", { className: u(s.colorClass, "font-semibold"), children: c })
      ]
    }
  );
}
const J = {
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
  follow: r = !0,
  showTimestamp: a = !0,
  showLevel: n = !0,
  showSource: o = !0,
  title: l = "Log stream",
  headerSlot: s,
  emptyMessage: c = "No log lines yet.",
  maxHeight: p,
  onClear: f,
  className: b,
  style: w,
  "data-testid": m = "log-stream"
}) {
  const x = B(null), [h, d] = T(!1);
  A(() => {
    if (!r || h) return;
    const g = x.current;
    g && (g.scrollTop = g.scrollHeight);
  }, [e, r, h]);
  const y = () => {
    const g = x.current;
    if (!g) return;
    const C = g.scrollHeight - g.scrollTop - g.clientHeight < 24;
    d(!C);
  }, N = () => {
    const g = x.current;
    g && (g.scrollTop = g.scrollHeight, d(!1));
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
    f && /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: f,
        "data-testid": `${m}-clear`,
        className: u(
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
      className: u("flex flex-col", b),
      style: w,
      children: [
        l !== null && /* @__PURE__ */ t("div", { className: "px-4 py-3 border-b border-[var(--color-border)]", children: /* @__PURE__ */ t(he, { title: l, meta: s ?? E }) }),
        /* @__PURE__ */ i("div", { className: "relative flex-1 min-h-0 flex", children: [
          /* @__PURE__ */ t(
            "div",
            {
              ref: x,
              onScroll: y,
              role: "log",
              "aria-live": r ? "polite" : "off",
              "data-testid": `${m}-scroll`,
              className: u(
                "flex-1 overflow-y-auto",
                "font-mono text-[12px] leading-[1.55]",
                "bg-[var(--color-surface-subtle,#0b1020)] text-[var(--color-text-primary,#e5e7eb)]",
                "py-2"
              ),
              style: { maxHeight: p },
              children: e.length === 0 ? /* @__PURE__ */ t(
                "div",
                {
                  "data-testid": `${m}-empty`,
                  className: "px-3 py-6 text-center text-[11px] text-[var(--color-text-tertiary)]",
                  children: c
                }
              ) : e.map((g) => {
                const C = g.level ?? "info";
                return /* @__PURE__ */ i(
                  "div",
                  {
                    role: "listitem",
                    "data-testid": `${m}-line`,
                    "data-level": g.level || void 0,
                    className: "flex items-baseline gap-2 px-3 hover:bg-[var(--color-surface,rgba(255,255,255,0.04))]",
                    children: [
                      a && g.timestamp && /* @__PURE__ */ t("span", { className: "shrink-0 text-[var(--color-text-tertiary)] tabular-nums", children: g.timestamp }),
                      n && g.level && /* @__PURE__ */ t(
                        "span",
                        {
                          className: u(
                            "shrink-0 font-semibold uppercase text-[10px] w-[44px]",
                            tt[C]
                          ),
                          "aria-label": `level ${J[C].toLowerCase()}`,
                          children: J[C]
                        }
                      ),
                      o && g.source && /* @__PURE__ */ i("span", { className: "shrink-0 text-[var(--color-text-secondary)]", children: [
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
              "data-testid": `${m}-jump`,
              onClick: N,
              className: u(
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
const cr = rt;
function dr({
  title: e,
  description: r,
  category: a,
  categoryTone: n = "neutral",
  thumbnail: o,
  icon: l = "🧩",
  thumbnailHeight: s = 160,
  href: c,
  onClick: p,
  badge: f,
  meta: b,
  className: w,
  style: m,
  "data-testid": x = "thumbnail-card"
}) {
  const d = u(
    "group block w-full text-left bg-[var(--color-surface,#fff)]",
    "rounded-xl border border-[var(--color-border)] overflow-hidden",
    "transition-[box-shadow,transform] duration-150",
    (c || p) && "cursor-pointer hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-0.5",
    w
  ), y = /* @__PURE__ */ i(I, { children: [
    /* @__PURE__ */ i(
      "div",
      {
        "data-testid": `${x}-thumb`,
        className: u(
          "relative flex items-center justify-center",
          "bg-gradient-to-br from-[var(--color-primary-bg,#eef2ff)] to-[var(--color-surface,#ffffff)]",
          "border-b border-[var(--color-border)]"
        ),
        style: { height: s },
        children: [
          o ? /* @__PURE__ */ t(
            "img",
            {
              src: o,
              alt: "",
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ t("span", { className: "text-5xl opacity-50", "aria-hidden": !0, children: l }),
          f && /* @__PURE__ */ t(
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
        a && /* @__PURE__ */ t(ye, { tone: n, size: "xs", "data-testid": `${x}-category`, children: a }),
        b && /* @__PURE__ */ t("span", { className: "ml-auto", children: b })
      ] }),
      /* @__PURE__ */ t("div", { className: "text-[14px] font-semibold text-[var(--color-text-primary)] leading-snug", children: e }),
      r && /* @__PURE__ */ t("div", { className: "mt-1 text-[12px] text-[var(--color-text-secondary)] leading-snug", children: r })
    ] })
  ] });
  return c ? /* @__PURE__ */ t(
    "a",
    {
      href: c,
      onClick: p,
      "data-testid": x,
      className: u(d, "no-underline text-inherit"),
      style: m,
      children: y
    }
  ) : p ? /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      onClick: p,
      "data-testid": x,
      className: u(d, "font-inherit"),
      style: m,
      children: y
    }
  ) : /* @__PURE__ */ t("div", { "data-testid": x, className: d, style: m, children: y });
}
const at = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
};
function ur({
  children: e,
  columns: r = 3,
  dense: a = !1,
  className: n,
  style: o,
  "data-testid": l = "catalog-grid"
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-testid": l,
      "data-columns": r,
      className: u(
        "grid grid-cols-1",
        at[r],
        a ? "gap-3" : "gap-5",
        n
      ),
      style: o,
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
  variant: r
}) {
  if (r === "none") return null;
  const a = e === "vertical", n = r === "arrow" ? a ? "↓" : "→" : a ? "│" : "─";
  return /* @__PURE__ */ t(
    "div",
    {
      "data-testid": "stack-diagram-connector",
      "aria-hidden": !0,
      className: u(
        "flex items-center justify-center text-[var(--color-text-tertiary)]",
        a ? "h-5 text-base" : "w-5 text-base"
      ),
      children: n
    }
  );
}
function it({
  layers: e,
  orientation: r = "vertical",
  connector: a = "arrow",
  className: n,
  style: o,
  "data-testid": l = "stack-diagram"
}) {
  const s = r === "vertical";
  return /* @__PURE__ */ t(
    "div",
    {
      "data-testid": l,
      "data-orientation": r,
      "data-connector": a,
      className: u(
        "flex",
        s ? "flex-col items-stretch" : "flex-row items-stretch flex-wrap",
        n
      ),
      style: o,
      children: e.map((c, p) => {
        const f = c.tone ?? "neutral";
        return /* @__PURE__ */ i("div", { className: u("flex", "flex-col"), children: [
          /* @__PURE__ */ i(
            "div",
            {
              "data-testid": "stack-diagram-layer",
              "data-tone": f,
              className: u(
                "rounded-md border px-3 py-2",
                nt[f],
                ot[f],
                !s && "min-w-[140px]"
              ),
              children: [
                /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
                  c.icon != null && /* @__PURE__ */ t("span", { className: "shrink-0 text-[14px] leading-none", "aria-hidden": !0, children: c.icon }),
                  /* @__PURE__ */ t("span", { className: u("text-[12px] font-semibold", lt[f]), children: c.label }),
                  c.meta != null && /* @__PURE__ */ t("span", { className: "ml-auto text-[10px] text-[var(--color-text-tertiary)] shrink-0", children: c.meta })
                ] }),
                c.description != null && /* @__PURE__ */ t("div", { className: "mt-0.5 text-[11px] leading-snug text-[var(--color-text-secondary)]", children: c.description })
              ]
            }
          ),
          p < e.length - 1 && /* @__PURE__ */ t(st, { orientation: r, variant: a })
        ] }, c.id);
      })
    }
  );
}
const pr = it;
function fr({
  value: e,
  onChange: r,
  onSubmit: a,
  disabled: n = !1,
  multiline: o = !1,
  placeholder: l,
  submitLabel: s = "→",
  className: c,
  style: p,
  autoFocus: f,
  maxRows: b = 4
}) {
  const w = !n && e.trim().length > 0, m = () => {
    w && a();
  }, x = (d) => {
    if (d.key === "Enter") {
      if (o && d.shiftKey) return;
      d.preventDefault(), m();
    }
  }, h = u(
    "flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--color-border-field,#d1d5db)] bg-white text-[var(--color-text-primary)]",
    "placeholder:text-[var(--color-text-tertiary)]",
    "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent",
    "resize-none",
    n && "opacity-50 cursor-not-allowed bg-[var(--color-surface-hover)]"
  );
  return /* @__PURE__ */ i(
    "div",
    {
      className: u(
        "flex items-end gap-2 p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]",
        c
      ),
      style: p,
      children: [
        o ? /* @__PURE__ */ t(
          "textarea",
          {
            className: h,
            value: e,
            onChange: (d) => r(d.target.value),
            onKeyDown: x,
            disabled: n,
            placeholder: l,
            autoFocus: f,
            rows: 2,
            style: { maxHeight: `${b * 1.5 + 1}rem`, overflowY: "auto" }
          }
        ) : /* @__PURE__ */ t(
          "input",
          {
            type: "text",
            className: h,
            value: e,
            onChange: (d) => r(d.target.value),
            onKeyDown: x,
            disabled: n,
            placeholder: l,
            autoFocus: f
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: m,
            disabled: !w,
            className: u(
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
function ct({ name: e, done: r, className: a }) {
  return /* @__PURE__ */ i(
    "span",
    {
      className: u(
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
function dt({ toolCalls: e, className: r }) {
  return /* @__PURE__ */ t("div", { className: u("flex flex-wrap gap-1.5 py-1", r), children: e.map((a) => /* @__PURE__ */ t(ct, { name: a.name, done: a.done }, a.id)) });
}
function xr({
  role: e,
  content: r,
  toolCalls: a,
  streaming: n = !1,
  agentName: o,
  userName: l,
  renderMarkdown: s,
  className: c
}) {
  const p = e === "user" ? l || "You" : o || "Assistant";
  return /* @__PURE__ */ i("div", { className: u("flex flex-col gap-1.5 py-3", c), children: [
    /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]", children: p }),
    a && a.length > 0 && /* @__PURE__ */ t(dt, { toolCalls: a }),
    e === "user" ? /* @__PURE__ */ t("div", { className: "text-sm text-[var(--color-text-primary)] whitespace-pre-wrap", children: r }) : /* @__PURE__ */ t("div", { className: "text-sm text-[var(--color-text-primary)] prose-sm max-w-none", children: r ? s ? s(r) : /* @__PURE__ */ t("span", { className: "whitespace-pre-wrap", children: r }) : n ? /* @__PURE__ */ t(F, {}) : null })
  ] });
}
function mr({
  content: e,
  streaming: r = !1,
  defaultOpen: a = !1,
  className: n
}) {
  const l = r || !e ? "Thinking" : "Thought";
  return /* @__PURE__ */ i(
    "details",
    {
      open: a,
      className: u(
        "rounded-md border border-[var(--color-border)] overflow-hidden text-sm group",
        n
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
          r && !e && /* @__PURE__ */ t(F, { size: "sm" })
        ] }),
        /* @__PURE__ */ t("div", { className: "px-3 py-2 text-xs text-[var(--color-text-secondary)] italic border-t border-[var(--color-border)] bg-white whitespace-pre-wrap leading-relaxed", children: e || /* @__PURE__ */ t(F, {}) })
      ]
    }
  );
}
function br({
  prompts: e,
  onSelect: r,
  columns: a,
  title: n,
  className: o
}) {
  const l = a ? `repeat(${a}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(220px, 1fr))";
  return /* @__PURE__ */ i("div", { className: u("flex flex-col gap-3", o), children: [
    n && /* @__PURE__ */ t("p", { className: "text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] text-center", children: n }),
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
function hr({
  suggestions: e,
  onSelect: r,
  onRefresh: a,
  label: n,
  className: o
}) {
  return /* @__PURE__ */ i("div", { className: u("flex items-center flex-wrap gap-1.5 py-2", o), children: [
    n && /* @__PURE__ */ t("span", { className: "text-xs text-[var(--color-text-tertiary)] mr-1", children: n }),
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
function gr({
  name: e,
  memberCount: r,
  description: a,
  actions: n,
  avatarUrl: o,
  online: l,
  onMembersClick: s,
  className: c
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: u(
        "flex items-center justify-between gap-4 px-6 py-3",
        "border-b border-[var(--color-border)] bg-[var(--color-surface)]",
        c
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ i("div", { className: "relative shrink-0", children: [
            o ? /* @__PURE__ */ t(
              "img",
              {
                src: o,
                alt: e,
                className: "w-9 h-9 rounded-full object-cover"
              }
            ) : /* @__PURE__ */ t(z, { name: e, size: 36 }),
            l !== void 0 && /* @__PURE__ */ t("span", { className: "absolute -bottom-0.5 -right-0.5", children: /* @__PURE__ */ t(
              re,
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
                  className: u(
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
        n && /* @__PURE__ */ t("div", { className: "flex items-center gap-2 shrink-0", children: n })
      ]
    }
  );
}
function vr({ user: e, items: r, className: a, "data-testid": n }) {
  const [o, l] = T(!1), s = B(null), c = R(() => l(!1), []);
  return A(() => {
    if (!o) return;
    const p = (f) => {
      s.current && !s.current.contains(f.target) && c();
    };
    return document.addEventListener("mousedown", p), () => document.removeEventListener("mousedown", p);
  }, [o, c]), A(() => {
    if (!o) return;
    const p = (f) => {
      f.key === "Escape" && c();
    };
    return document.addEventListener("keydown", p), () => document.removeEventListener("keydown", p);
  }, [o, c]), /* @__PURE__ */ i(
    "div",
    {
      ref: s,
      "data-testid": n,
      className: u("relative inline-block", a),
      children: [
        /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            "aria-label": `User menu for ${e.name}`,
            "aria-expanded": o,
            "aria-haspopup": "menu",
            onClick: () => l((p) => !p),
            className: u(
              "flex items-center gap-2 bg-transparent border-none cursor-pointer p-1 rounded-lg",
              "hover:bg-[var(--color-surface-hover)] transition-colors duration-100",
              o && "bg-[var(--color-surface-hover)]"
            ),
            children: [
              e.avatarUrl ? /* @__PURE__ */ t(
                "img",
                {
                  src: e.avatarUrl,
                  alt: e.name,
                  className: "w-8 h-8 rounded-full object-cover"
                }
              ) : /* @__PURE__ */ t(z, { name: e.name, size: 32 }),
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
                  className: u(
                    "text-[var(--color-text-tertiary)] transition-transform duration-150",
                    o ? "rotate-180" : "rotate-0"
                  ),
                  children: /* @__PURE__ */ t("path", { d: "M2 4l4 4 4-4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
                }
              )
            ]
          }
        ),
        o && /* @__PURE__ */ i(
          "div",
          {
            role: "menu",
            "aria-label": "User menu",
            className: u(
              "absolute right-0 top-[calc(100%+6px)] min-w-[200px] z-[200]",
              "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden"
            ),
            children: [
              /* @__PURE__ */ i("div", { className: "px-3 py-2.5 border-b border-[var(--color-border)]", children: [
                /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-[var(--color-text-primary)] truncate", children: e.name }),
                /* @__PURE__ */ t("p", { className: "text-xs text-[var(--color-text-tertiary)] truncate", children: e.email })
              ] }),
              /* @__PURE__ */ t("div", { className: "py-1", children: r.map((p, f) => /* @__PURE__ */ i("div", { children: [
                p.separator && f > 0 && /* @__PURE__ */ t("div", { className: "my-1 border-t border-[var(--color-border)]" }),
                /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    role: "menuitem",
                    onClick: () => {
                      p.onClick(), c();
                    },
                    className: u(
                      "flex items-center gap-2.5 w-full text-left px-3 py-2",
                      "text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100",
                      p.danger ? "text-[#dc2626] bg-transparent hover:bg-[#fef2f2]" : "text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"
                    ),
                    children: [
                      p.icon && /* @__PURE__ */ t("span", { className: "shrink-0 text-base leading-none", "aria-hidden": "true", children: p.icon }),
                      p.label
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
function ut({ item: e, isLast: r }) {
  const a = u(
    "text-sm leading-snug transition-colors duration-100",
    r ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal"
  );
  return r || !e.href && !e.onClick ? /* @__PURE__ */ t("span", { className: a, "aria-current": r ? "page" : void 0, children: e.label }) : e.href ? /* @__PURE__ */ t("a", { href: e.href, onClick: e.onClick, className: u(a, "no-underline"), children: e.label }) : /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      onClick: e.onClick,
      className: u(a, "border-none bg-transparent cursor-pointer font-[inherit] p-0"),
      children: e.label
    }
  );
}
function pt(e, r) {
  if (e.length <= r) return e;
  const a = e.slice(0, 1), n = e.slice(-(r - 2 > 0 ? r - 2 : 1));
  return [...a, null, ...n];
}
function yr({
  items: e,
  separator: r = "/",
  maxItems: a,
  className: n,
  "data-testid": o
}) {
  if (e.length === 0) return null;
  const l = a != null ? pt(e, a) : e;
  return /* @__PURE__ */ t("nav", { "aria-label": "Breadcrumb", "data-testid": o, className: u("flex items-center", n), children: /* @__PURE__ */ t("ol", { className: "flex items-center gap-1 flex-wrap list-none m-0 p-0", children: l.map((s, c) => {
    const p = c === l.length - 1;
    return /* @__PURE__ */ i("li", { className: "flex items-center gap-1", children: [
      s === null ? /* @__PURE__ */ t(
        "span",
        {
          className: "text-sm text-[var(--color-text-tertiary)] select-none",
          "aria-label": "More items",
          title: "Some items are hidden",
          children: "…"
        }
      ) : /* @__PURE__ */ t(ut, { item: s, isLast: p }),
      !p && /* @__PURE__ */ t(
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
function mt({ status: e, colors: r }) {
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
function wr({
  name: e,
  id: r,
  status: a,
  statusColors: n,
  contributorNames: o = [],
  contributorCount: l,
  activityItems: s = [],
  presenceDotColor: c = "#d1d5db",
  activityLabel: p = "",
  cardIndex: f = 0,
  onClick: b,
  className: w,
  style: m,
  minHeight: x = 190
}) {
  const h = { ...ft, ...n }, d = (a ?? "unknown").toLowerCase().replace(/ /g, "_"), y = h[d] ?? xt, N = l !== void 0 ? Math.max(0, l - o.length) : 0, E = f % 8 * 525;
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
      onMouseEnter: (g) => {
        const C = g.currentTarget;
        C.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)", C.style.transform = "translateY(-1px)", C.style.borderColor = y.border;
      },
      onMouseLeave: (g) => {
        const C = g.currentTarget;
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
              a && /* @__PURE__ */ t(mt, { status: a, colors: y })
            ]
          }
        ),
        /* @__PURE__ */ t(we, { items: s, staggerMs: E }),
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
                o.length > 0 ? /* @__PURE__ */ t(ge, { names: o, maxVisible: 5, size: 24 }) : /* @__PURE__ */ i("span", { style: { fontSize: 12, color: "#9ca3af" }, children: [
                  /* @__PURE__ */ t("strong", { style: { color: "#374151" }, children: l ?? 0 }),
                  " contributors"
                ] }),
                o.length > 0 && N > 0 && /* @__PURE__ */ i("span", { style: { fontSize: 11, color: "#9ca3af" }, children: [
                  "+",
                  N,
                  " more"
                ] })
              ] }),
              p && /* @__PURE__ */ i("div", { style: { display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }, children: [
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
                /* @__PURE__ */ t("span", { style: { fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap" }, children: p })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function bt(e) {
  const r = [], a = /* @__PURE__ */ new Map();
  for (const n of e) {
    const o = n.group ?? null;
    if (o === null) {
      (r.length === 0 || r[0].name !== null) && (r.unshift({ name: null, items: [] }), a.forEach((s, c) => a.set(c, s + 1))), r[0].items.push(n);
      continue;
    }
    let l = a.get(o);
    l === void 0 && (l = r.length, a.set(o, l), r.push({ name: o, items: [] })), r[l].items.push(n);
  }
  return r;
}
function Q({
  items: e,
  storageKey: r,
  title: a,
  renderNavItem: n
}) {
  const o = O(() => bt(e), [e]), l = o.some((s) => s.name !== null);
  return /* @__PURE__ */ t("nav", { className: "flex-1 overflow-y-auto py-1", children: l ? o.map(
    (s) => s.name === null ? /* @__PURE__ */ t(Z, { items: s.items, renderNavItem: n }, "__ungrouped") : /* @__PURE__ */ t(
      ht,
      {
        name: s.name,
        items: s.items,
        storageKey: `${r}.${a}.${s.name}`,
        renderNavItem: n
      },
      s.name
    )
  ) : /* @__PURE__ */ t(Z, { items: e, renderNavItem: n }) });
}
function Nr({
  title: e,
  items: r,
  titleAction: a,
  railHeader: n,
  railWidth: o = 220,
  storageKey: l = "subnav",
  secondaryTitle: s,
  secondaryItems: c,
  secondaryStorageKey: p,
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
        style: { width: o },
        children: [
          /* @__PURE__ */ i("div", { className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]", children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]", children: e }),
            a
          ] }),
          n && /* @__PURE__ */ t("div", { className: "px-3 py-2 border-b border-[var(--color-border)]", children: n }),
          /* @__PURE__ */ t(Q, { items: r, storageKey: l, title: e, renderNavItem: b })
        ]
      }
    ),
    m && /* @__PURE__ */ i(
      "aside",
      {
        className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
        style: { width: f },
        children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]", children: /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]", children: s ?? "" }) }),
          /* @__PURE__ */ t(
            Q,
            {
              items: c,
              storageKey: p ?? `${l}.secondary`,
              title: s ?? "secondary",
              renderNavItem: b
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t("main", { className: "flex-1 min-w-0 overflow-auto p-6", children: w })
  ] });
}
function Z({
  items: e,
  renderNavItem: r
}) {
  return /* @__PURE__ */ t(I, { children: e.map((a) => /* @__PURE__ */ t(oe, { item: a, renderNavItem: r }, a.path)) });
}
function ht({
  name: e,
  items: r,
  storageKey: a,
  renderNavItem: n
}) {
  const [o, l] = T(() => typeof window > "u" ? !1 : window.localStorage?.getItem(a) === "1");
  A(() => {
    typeof window > "u" || (o ? window.localStorage?.setItem(a, "1") : window.localStorage?.removeItem(a));
  }, [o, a]);
  const s = r.find((p) => p.groupScrollAfter)?.groupScrollAfter, c = s ? { maxHeight: s * 38, overflowY: "auto" } : void 0;
  return /* @__PURE__ */ i("section", { className: "border-b border-[var(--color-border)]", children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => l((p) => !p),
        className: "flex items-center gap-1.5 w-full px-3 py-2 bg-transparent border-none cursor-pointer text-[var(--color-text-tertiary)] text-[10px] font-bold tracking-[0.05em] uppercase text-left",
        "aria-expanded": !o,
        children: [
          /* @__PURE__ */ t("span", { className: "text-[10px] w-[10px] inline-block", "aria-hidden": "true", children: o ? "▸" : "▾" }),
          /* @__PURE__ */ t("span", { className: "flex-1", children: e }),
          /* @__PURE__ */ t("span", { className: "text-[9px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-bg)] px-[5px] py-px rounded-[6px] border border-[var(--color-border)]", children: r.length })
        ]
      }
    ),
    !o && /* @__PURE__ */ t("div", { style: c, children: r.map((p) => /* @__PURE__ */ t(oe, { item: p, renderNavItem: n }, p.path)) })
  ] });
}
function oe({
  item: e,
  renderNavItem: r
}) {
  const a = e.accent === "danger" ? "#dc2626" : e.accent === "warning" ? "#d97706" : e.accent === "success" ? "#16a34a" : void 0, n = /* @__PURE__ */ i(I, { children: [
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
  ] }), o = {
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
      children: n
    }
  ) : r ? /* @__PURE__ */ t(I, { children: r(e, n, o) }) : /* @__PURE__ */ t(
    "a",
    {
      href: e.path,
      className: "block px-[14px] py-2 border-l-[3px] border-transparent text-[var(--color-text-secondary)] no-underline cursor-pointer",
      children: n
    }
  );
}
const gt = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function X(e) {
  return Array.from(e.querySelectorAll(gt)).filter(
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
function kr({
  trigger: e,
  open: r,
  onClose: a,
  placement: n = "bottom-start",
  offset: o = 6,
  className: l,
  zIndex: s = 9500,
  "data-testid": c = "inline-popover",
  children: p
}) {
  const f = B(null), [b, w] = T(null), m = B(null), x = R(() => {
    const h = e.current;
    if (!h) return;
    const d = h.getBoundingClientRect();
    w(vt(d, n, o));
  }, [e, n, o]);
  return de(() => {
    if (!r) {
      w(null);
      return;
    }
    x();
  }, [r, x]), A(() => {
    if (!r) return;
    const h = () => x();
    return window.addEventListener("scroll", h, !0), window.addEventListener("resize", h), () => {
      window.removeEventListener("scroll", h, !0), window.removeEventListener("resize", h);
    };
  }, [r, x]), A(() => {
    if (!r) return;
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
  }, [r]), A(() => {
    if (!r) return;
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
      const E = N[0], g = N[N.length - 1], C = document.activeElement;
      if (!C || !y.contains(C)) {
        d.preventDefault(), E.focus();
        return;
      }
      d.shiftKey && C === E ? (d.preventDefault(), g.focus()) : !d.shiftKey && C === g && (d.preventDefault(), E.focus());
    };
    return window.addEventListener("keydown", h), () => window.removeEventListener("keydown", h);
  }, [r, a]), A(() => {
    if (!r) return;
    const h = (d) => {
      const y = d.target;
      y && (f.current?.contains(y) || e.current?.contains(y) || a());
    };
    return document.addEventListener("mousedown", h), () => document.removeEventListener("mousedown", h);
  }, [r, a, e]), !r || !b || typeof document > "u" ? null : ae(
    /* @__PURE__ */ t(
      "div",
      {
        ref: f,
        role: "dialog",
        "data-testid": c,
        "data-placement": n,
        className: u(
          "min-w-[160px] rounded-lg border border-slate-200 bg-white",
          "shadow-lg p-1 text-sm text-slate-700",
          l
        ),
        style: { ...b, zIndex: s },
        children: p
      }
    ),
    document.body
  );
}
const yt = {
  success: {
    pill: "bg-emerald-100 border-emerald-200",
    dot: "bg-emerald-500",
    text: "text-emerald-800"
  },
  error: {
    pill: "bg-red-100 border-red-200",
    dot: "bg-red-500",
    text: "text-red-800"
  },
  warning: {
    pill: "bg-amber-100 border-amber-200",
    dot: "bg-amber-500",
    text: "text-amber-800"
  },
  info: {
    pill: "bg-blue-100 border-blue-200",
    dot: "bg-blue-500",
    text: "text-blue-800"
  },
  neutral: {
    pill: "bg-slate-100 border-slate-200",
    dot: "bg-slate-400",
    text: "text-slate-700"
  },
  pending: {
    pill: "bg-violet-100 border-violet-200",
    dot: "bg-violet-500",
    text: "text-violet-800"
  }
}, wt = {
  sm: "px-1.5 py-0.5 text-[10px] gap-1",
  md: "px-2.5 py-1 text-[12px] gap-1.5"
}, ee = {
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2"
};
function Cr({
  state: e,
  label: r,
  icon: a,
  size: n = "md",
  className: o,
  "data-testid": l
}) {
  const s = yt[e], c = e === "pending";
  return /* @__PURE__ */ i(
    "span",
    {
      role: "status",
      "data-testid": l,
      "data-state": e,
      className: u(
        "inline-flex items-center rounded-full border font-medium leading-none select-none",
        s.pill,
        s.text,
        wt[n],
        o
      ),
      children: [
        a ? /* @__PURE__ */ t("span", { "aria-hidden": "true", className: "shrink-0", children: a }) : (
          // Dot indicator — pending gets a relative container with an animate-ping halo.
          /* @__PURE__ */ i("span", { className: u("relative inline-flex shrink-0", ee[n]), children: [
            c && /* @__PURE__ */ t(
              "span",
              {
                "aria-hidden": "true",
                className: u(
                  "absolute inset-0 rounded-full animate-ping opacity-75",
                  s.dot
                )
              }
            ),
            /* @__PURE__ */ t(
              "span",
              {
                "aria-hidden": "true",
                className: u("relative rounded-full", ee[n], s.dot)
              }
            )
          ] })
        ),
        r
      ]
    }
  );
}
export {
  dr as A,
  yr as B,
  ur as C,
  Gt as D,
  tr as E,
  hr as F,
  ct as G,
  dt as H,
  or as I,
  sr as J,
  Qt as K,
  pr as L,
  xr as M,
  vr as N,
  Xe as O,
  lr as P,
  br as Q,
  De as R,
  nr as S,
  Yt as T,
  Xt as U,
  It as V,
  Ht as W,
  gr as a,
  fr as b,
  Pt as c,
  ar as d,
  Ft as e,
  Ut as f,
  Kt as g,
  ir as h,
  rr as i,
  Wt as j,
  qt as k,
  kr as l,
  zt as m,
  rt as n,
  ze as o,
  Zt as p,
  wr as q,
  er as r,
  it as s,
  Jt as t,
  Cr as u,
  Nr as v,
  Vt as w,
  cr as x,
  mr as y,
  F as z
};
