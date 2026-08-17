import { jsxs as c, jsx as t, Fragment as P } from "react/jsx-runtime";
import { useState as T, useCallback as A, createContext as ie, useMemo as O, useEffect as _, useRef as D, useContext as ce, useId as te, useLayoutEffect as de } from "react";
import { c as u } from "./cn-B6yFEsav.js";
import { _ as M } from "./index-Bjylubtc.js";
import { M as ue } from "./Modal-fp5zcyw8.js";
import { T as pe, b as fe, e as Y, a as xe, c as W, d as K } from "./Table-CGM2zaOL.js";
import { E as me } from "./EmptyState-CpAOblv3.js";
import { S as be } from "./PermissionDeniedCard-zuRojsB7.js";
import { S as he, C as ve } from "./CardHeader-CHxrs92b.js";
import { A as q, a as ge } from "./Avatar-DLI820CU.js";
import { S as re } from "./StatusDot-BC7B1tTr.js";
import { createPortal as ae } from "react-dom";
import { C as ye } from "./Card-qOg_oC77.js";
import { C as we } from "./Chip-BDT8ro4h.js";
import { t as Ne, f as ke, b as Ce, a as Se } from "./tones-DknNcB3q.js";
import { A as $e } from "./Badge-BgXzWBnr.js";
import "clsx";
import "tailwind-merge";
const Ee = [
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
], Le = [
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
], Te = [
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
function Ae(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function _e(e, r) {
  let a = e.replace(/(\/\/.*?)(\n|$)/g, `<span style="color:${r.comment}">$1</span>$2`);
  a = a.replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:${r.comment}">$1</span>`), a = a.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    `<span style="color:${r.string}">$1</span>`
  );
  const n = new RegExp(`\\b(${Ee.join("|")})\\b`, "g");
  return a = a.replace(n, `<span style="color:${r.keyword}">$1</span>`), a = a.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span style="color:${r.number}">$1</span>`), a;
}
function Re(e, r) {
  let a = e.replace(
    /("(?:[^"\\]|\\.)*")(\s*:)/g,
    `<span style="color:${r.property}">$1</span>$2`
  );
  return a = a.replace(/("(?:[^"\\]|\\.)*")/g, `<span style="color:${r.string}">$1</span>`), a = a.replace(/\b(true|false|null)\b/g, `<span style="color:${r.keyword}">$1</span>`), a = a.replace(/\b(-?\d+(?:\.\d+)?)\b/g, `<span style="color:${r.number}">$1</span>`), a;
}
function De(e, r) {
  let a = e.replace(/(#.*?)(\n|$)/g, `<span style="color:${r.comment}">$1</span>$2`);
  a = a.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, `<span style="color:${r.string}">$1</span>`);
  const n = new RegExp(`\\b(${Le.join("|")})\\b`, "g");
  a = a.replace(n, `<span style="color:${r.keyword}">$1</span>`);
  const o = new RegExp(`\\b(${Te.join("|")})\\b`, "g");
  return a = a.replace(o, `<span style="color:${r.builtin}">$1</span>`), a = a.replace(/(\$\w+|\$\{[^}]+\})/g, `<span style="color:${r.variable}">$1</span>`), a;
}
const Me = {
  comment: "#6b7280",
  string: "#4ade80",
  keyword: "#93c5fd",
  number: "#fbbf24",
  property: "#7dd3fc",
  builtin: "#c4b5fd",
  variable: "#fbbf24"
}, Oe = {
  comment: "#64748b",
  string: "#15803d",
  keyword: "#1d4ed8",
  number: "#a16207",
  property: "#0369a1",
  builtin: "#7c3aed",
  variable: "#a16207"
};
function V(e, r, a) {
  const n = a === "dark" ? Me : Oe, o = Ae(e);
  switch (r) {
    case "json":
      return Re(o, n);
    case "bash":
    case "sh":
      return De(o, n);
    case "text":
      return o;
    default:
      return _e(o, n);
  }
}
function Ut({
  code: e,
  language: r = "tsx",
  theme: a = "dark",
  copyButton: n = !0,
  showLineNumbers: o = !1,
  className: l,
  style: s,
  "data-testid": d,
  ariaLabel: p
}) {
  const [f, v] = T(!1), N = A(() => {
    typeof navigator > "u" || !navigator.clipboard || navigator.clipboard.writeText(e).then(() => {
      v(!0), setTimeout(() => v(!1), 1500);
    }).catch(() => {
    });
  }, [e]), b = a === "dark", x = e.split(`
`);
  return /* @__PURE__ */ c(
    "div",
    {
      "data-testid": d,
      "data-language": r,
      "data-theme": a,
      className: u(
        "relative rounded-lg border font-mono text-[13px] leading-relaxed overflow-hidden",
        b ? "bg-slate-800 text-slate-100 border-slate-700" : "bg-surface-panel text-text-primary border-border",
        l
      ),
      style: s,
      "aria-label": p ?? `Code (${r})`,
      children: [
        n && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: N,
            "aria-label": f ? "Copied" : "Copy code",
            className: u(
              "absolute top-2 right-2 text-[11px] px-2 py-1 rounded border transition-opacity",
              b ? "bg-slate-700 text-slate-100 border-slate-600 hover:bg-slate-600" : "bg-white text-slate-700 border-border-emphasis hover:bg-surface-hover"
            ),
            "data-copied": f ? "true" : "false",
            children: f ? "Copied" : "Copy"
          }
        ),
        /* @__PURE__ */ t("pre", { className: "m-0 px-4 py-3 overflow-x-auto", children: o ? /* @__PURE__ */ c("div", { className: "flex", children: [
          /* @__PURE__ */ t(
            "div",
            {
              className: u(
                "select-none pr-3 text-right",
                b ? "text-neutral" : "text-text-tertiary"
              ),
              "aria-hidden": "true",
              children: x.map((m, i) => /* @__PURE__ */ t("div", { children: i + 1 }, i))
            }
          ),
          /* @__PURE__ */ t(
            "code",
            {
              className: "flex-1 block",
              dangerouslySetInnerHTML: { __html: V(e, r, a) }
            }
          )
        ] }) : /* @__PURE__ */ t(
          "code",
          {
            className: "block",
            dangerouslySetInnerHTML: { __html: V(e, r, a) }
          }
        ) })
      ]
    }
  );
}
const je = "cui:command-palette:recents", Be = 5;
function Pe(e, r) {
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
function Ie(e, r) {
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
function Wt() {
  const { open: e, close: r, toggle: a, isOpen: n, query: o } = U();
  return { open: e, close: r, toggle: a, isOpen: n, query: o };
}
function Ke(e, r) {
  const a = r.toLowerCase().split("+").map((v) => v.trim()).filter(Boolean);
  if (a.length === 0) return !1;
  const n = a[a.length - 1], o = new Set(a.slice(0, -1)), l = o.has("cmd") || o.has("meta"), s = o.has("ctrl"), d = o.has("mod"), p = o.has("shift"), f = o.has("alt");
  if (d) {
    if (!e.metaKey && !e.ctrlKey) return !1;
  } else if (l !== e.metaKey || s !== e.ctrlKey) return !1;
  return p !== e.shiftKey || f !== e.altKey ? !1 : e.key.toLowerCase() === n;
}
function Gt({
  commands: e,
  getDynamicCommands: r,
  recentsKey: a = je,
  recentsLimit: n = Be,
  children: o
}) {
  const [l, s] = T(!1), [d, p] = T(""), [f, v] = T(
    () => /* @__PURE__ */ new Map()
  ), [N, b] = T(
    () => Pe(a, n)
  ), x = A(
    ($) => {
      a !== null && b((k) => {
        const E = [$, ...k.filter((j) => j !== $)].slice(
          0,
          n
        );
        return Ie(a, E), E;
      });
    },
    [a, n]
  ), m = A(() => s(!0), []), i = A(() => {
    s(!1), p("");
  }, []), h = A(() => s(($) => !$), []), g = A(($) => {
    v((k) => {
      const E = new Map(k);
      return E.set($.id, $), E;
    });
  }, []), C = A(($) => {
    v((k) => {
      if (!k.has($)) return k;
      const E = new Map(k);
      return E.delete($), E;
    });
  }, []);
  _(() => {
    const $ = (k) => {
      (k.metaKey || k.ctrlKey) && k.key.toLowerCase() === "k" && (k.preventDefault(), s((E) => !E));
    };
    return window.addEventListener("keydown", $, !0), () => window.removeEventListener("keydown", $, !0);
  }, []);
  const y = O(() => {
    const $ = r ? r(d) : [];
    return [...e ?? [], ...$, ...f.values()].filter((E) => E.when ? E.when() : !0);
  }, [e, r, d, f]), S = D(y);
  S.current = y, _(() => {
    const $ = (k) => {
      if (!((k.metaKey || k.ctrlKey) && k.key.toLowerCase() === "k")) {
        for (const E of S.current)
          if (E.hotkey && Ke(k, E.hotkey)) {
            k.preventDefault(), Promise.resolve().then(() => E.run());
            return;
          }
      }
    };
    return window.addEventListener("keydown", $), () => window.removeEventListener("keydown", $);
  }, []);
  const I = {
    open: m,
    close: i,
    toggle: h,
    isOpen: l,
    query: d,
    setQuery: p,
    mergedCommands: y,
    registerCommand: g,
    unregisterCommand: C,
    recents: N,
    noteSelection: x
  };
  return /* @__PURE__ */ t(ne.Provider, { value: I, children: o });
}
function qt(e) {
  const { registerCommand: r, unregisterCommand: a } = U();
  _(() => (r(e), () => a(e.id)), [e, r, a]);
}
function He(e) {
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
function zt({
  placeholder: e = "Type a command or search…",
  emptyState: r,
  className: a
} = {}) {
  const {
    isOpen: n,
    close: o,
    query: l,
    setQuery: s,
    mergedCommands: d,
    recents: p,
    noteSelection: f
  } = U(), v = O(() => {
    if (l.trim() !== "" || p.length === 0) return [];
    const x = new Map(d.map((m) => [m.id, m]));
    return p.map((m) => x.get(m)).filter((m) => !!m);
  }, [d, l, p]), N = O(() => He(d), [d]), b = A(
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
      children: /* @__PURE__ */ c(
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
            /* @__PURE__ */ c(M.List, { className: "max-h-[360px] overflow-y-auto py-2", children: [
              /* @__PURE__ */ t(M.Empty, { className: "px-3 py-6 text-center text-sm text-text-tertiary", children: r ?? "No results." }),
              v.length > 0 && /* @__PURE__ */ t(M.Group, { heading: "Recent", "data-testid": "command-palette-group-recent", children: v.map((x) => /* @__PURE__ */ c(
                M.Item,
                {
                  value: `recent-${x.id} ${x.label}`,
                  keywords: x.keywords,
                  onSelect: () => b(x),
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
              N.map(({ groupName: x, items: m }) => /* @__PURE__ */ t(
                M.Group,
                {
                  heading: x ?? void 0,
                  children: m.map((i) => /* @__PURE__ */ c(
                    M.Item,
                    {
                      value: `${i.id} ${i.label} ${(i.keywords ?? []).join(" ")}`,
                      keywords: i.keywords,
                      onSelect: () => b(i),
                      "data-testid": `command-palette-item-${i.id}`,
                      className: u(
                        "flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm",
                        "text-text-primary aria-selected:bg-surface-hover"
                      ),
                      children: [
                        i.icon && /* @__PURE__ */ t("span", { className: "shrink-0 text-text-secondary", children: i.icon }),
                        /* @__PURE__ */ t("span", { className: "flex-1 truncate", children: i.label }),
                        i.hint && /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary truncate", children: i.hint }),
                        i.shortcut && i.shortcut.length > 0 && /* @__PURE__ */ t("span", { className: "flex items-center gap-1 shrink-0", children: i.shortcut.map((h, g) => /* @__PURE__ */ t(
                          "kbd",
                          {
                            className: u(
                              "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1",
                              "text-[10px] font-mono font-medium",
                              "bg-surface-hover text-text-secondary",
                              "border border-border rounded"
                            ),
                            children: h
                          },
                          `${i.id}-kbd-${g}`
                        )) })
                      ]
                    },
                    i.id
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
function Yt({ className: e } = {}) {
  const { toggle: r } = U();
  return /* @__PURE__ */ c(
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
function G(e) {
  if (e === "right") return "text-right";
  if (e === "center") return "text-center";
}
function Vt({
  data: e,
  columns: r,
  keyField: a,
  onRowClick: n,
  rowActions: o,
  searchable: l = !1,
  searchPlaceholder: s = "Search…",
  pageSize: d,
  emptyMessage: p = "No records.",
  loading: f = !1,
  loadingRows: v = 5,
  className: N,
  "data-testid": b
}) {
  const [x, m] = T(null), [i, h] = T("asc"), [g, C] = T(""), [y, S] = T(0), I = (w) => {
    x === w ? h((R) => R === "asc" ? "desc" : "asc") : (m(w), h("asc"));
  }, $ = O(() => {
    if (!l || g.trim() === "") return e;
    const w = g.trim().toLowerCase();
    return e.filter(
      (R) => r.some((L) => L.filterable === !1 ? !1 : (L.getFilterText ? L.getFilterText(R) : String(R[L.key] ?? "")).toLowerCase().includes(w))
    );
  }, [e, r, g, l]), k = O(() => {
    if (!x) return $;
    const w = r.find((B) => B.key === x);
    if (!w || !w.sortable) return $;
    const R = w.compare ?? ((B, H) => {
      const le = String(B[w.key] ?? ""), se = String(H[w.key] ?? "");
      return le.localeCompare(se);
    }), L = [...$];
    return L.sort((B, H) => i === "asc" ? R(B, H) : -R(B, H)), L;
  }, [$, r, x, i]), E = d && d > 0 ? Math.max(1, Math.ceil(k.length / d)) : 1, j = Math.min(y, E - 1), z = O(() => {
    if (!d || d <= 0) return k;
    const w = j * d;
    return k.slice(w, w + d);
  }, [k, d, j]);
  return /* @__PURE__ */ c("div", { className: u("flex flex-col gap-3", N), "data-testid": b, children: [
    l && /* @__PURE__ */ t(
      "input",
      {
        type: "text",
        value: g,
        onChange: (w) => {
          C(w.target.value), S(0);
        },
        placeholder: s,
        "aria-label": "Search",
        "data-testid": "datatable-search",
        className: "w-full max-w-xs rounded-md border border-border-field bg-surface px-3 py-1.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none"
      }
    ),
    /* @__PURE__ */ c(pe, { className: "border border-border rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ t(fe, { children: /* @__PURE__ */ c("tr", { children: [
        r.map((w) => {
          const R = w.sortable && x === w.key;
          return /* @__PURE__ */ t(
            Y,
            {
              sortable: w.sortable,
              sortDirection: R ? i : null,
              style: w.width ? { width: w.width } : void 0,
              className: u(G(w.align), w.className),
              onClick: w.sortable ? () => I(w.key) : void 0,
              "data-testid": w.sortable ? `datatable-header-${w.key}` : void 0,
              children: w.header
            },
            w.key
          );
        }),
        o && /* @__PURE__ */ t(Y, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ t(xe, { children: f ? Array.from({ length: v }).map((w, R) => /* @__PURE__ */ c(W, { "data-testid": "datatable-loading-row", children: [
        r.map((L) => /* @__PURE__ */ t(K, { className: G(L.align), children: /* @__PURE__ */ t("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" }) }, L.key)),
        o && /* @__PURE__ */ t(K, { className: "text-right", children: /* @__PURE__ */ t("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" }) })
      ] }, `skeleton-${R}`)) : z.length === 0 ? /* @__PURE__ */ t(W, { children: /* @__PURE__ */ t(
        K,
        {
          colSpan: r.length + (o ? 1 : 0),
          className: "text-center text-text-secondary py-8",
          children: p
        }
      ) }) : z.map((w, R) => /* @__PURE__ */ c(
        W,
        {
          clickable: !!n,
          onClick: n ? () => n(w) : void 0,
          children: [
            r.map((L) => /* @__PURE__ */ t(
              K,
              {
                className: u(G(L.align), L.className),
                children: L.render ? L.render(w, R) : String(w[L.key] ?? "")
              },
              L.key
            )),
            o && /* @__PURE__ */ t(K, { className: "text-right", onClick: (L) => L.stopPropagation(), children: /* @__PURE__ */ t("div", { className: "flex items-center justify-end gap-2", children: o(w) }) })
          ]
        },
        a(w)
      )) })
    ] }),
    d && d > 0 && k.length > d && /* @__PURE__ */ c("div", { className: "flex items-center justify-between text-xs text-text-secondary", children: [
      /* @__PURE__ */ c("span", { "data-testid": "datatable-page-summary", children: [
        "Page ",
        j + 1,
        " of ",
        E,
        " · ",
        k.length,
        " total"
      ] }),
      /* @__PURE__ */ c("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => S((w) => Math.max(0, w - 1)),
            disabled: j === 0,
            "data-testid": "datatable-prev",
            className: "rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-panel",
            children: "Prev"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => S((w) => Math.min(E - 1, w + 1)),
            disabled: j >= E - 1,
            "data-testid": "datatable-next",
            className: "rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-panel",
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
const Fe = "🔒";
function Jt({
  capabilityName: e,
  title: r,
  description: a,
  actionLabel: n,
  onAction: o,
  actions: l,
  icon: s,
  testId: d = "capability-denied-fallback"
}) {
  const p = r ?? (e ? `${e} is unavailable` : "Feature unavailable"), f = a ?? (e ? `${e} is not enabled for this workspace. Contact your administrator to request access.` : "This feature is not enabled for your account. Contact your administrator to request access.");
  return /* @__PURE__ */ t(
    me,
    {
      icon: s === null ? void 0 : s ?? Fe,
      title: p,
      description: f,
      actionLabel: n,
      onAction: o,
      actions: l,
      testId: d
    }
  );
}
function Qt({
  icon: e = "⚠️",
  title: r,
  body: a,
  description: n,
  actionLabel: o,
  onAction: l,
  action: s,
  testId: d = "error-state",
  actionTestId: p = "error-state-action"
}) {
  const f = n ?? a;
  return /* @__PURE__ */ c(
    "div",
    {
      role: "alert",
      "data-testid": d,
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
              "hover:bg-surface-panel"
            ),
            children: o
          }
        )
      ]
    }
  );
}
function Zt({
  label: e = "Loading…",
  description: r,
  spinnerSize: a = "lg",
  spinnerColor: n,
  testId: o = "loading-state"
}) {
  return /* @__PURE__ */ c(
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
        /* @__PURE__ */ t(be, { size: a, color: n, "aria-label": e }),
        /* @__PURE__ */ t("div", { className: "text-[15px] font-medium text-text-primary", children: e }),
        r && /* @__PURE__ */ t("div", { className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal", children: r })
      ]
    }
  );
}
function Xt({
  label: e,
  hint: r,
  error: a,
  required: n = !1,
  layout: o = "stacked",
  children: l,
  className: s,
  style: d,
  "data-testid": p
}) {
  const f = te(), v = `${f}-label`, N = r || a ? `${f}-desc` : void 0, b = {
    id: f,
    labelId: v,
    "aria-describedby": N,
    "aria-invalid": a ? !0 : void 0
  };
  return /* @__PURE__ */ c(
    "div",
    {
      "data-testid": p,
      className: u(
        o === "inline" ? "flex items-center gap-3" : "flex flex-col gap-1",
        s
      ),
      style: d,
      children: [
        /* @__PURE__ */ c(
          "label",
          {
            id: v,
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
        /* @__PURE__ */ c("div", { className: u(o === "inline" ? "flex-1" : ""), children: [
          l(b),
          (r || a) && /* @__PURE__ */ t(
            "div",
            {
              id: N,
              className: u(
                "mt-1 text-[11px]",
                a ? "text-[#991b1b]" : "text-neutral"
              ),
              children: a ?? r
            }
          )
        ] })
      ]
    }
  );
}
const Ue = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm"
};
function We(e) {
  switch (e) {
    case "underline":
      return "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
    case "pill":
      return "inline-flex items-center gap-1";
    case "segmented":
      return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5";
  }
}
function Ge(e, r, a) {
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
function er({
  items: e,
  value: r,
  onValueChange: a,
  variant: n = "underline",
  size: o = "md",
  className: l,
  style: s,
  "aria-label": d,
  idPrefix: p
}) {
  const f = te(), v = p ?? f, N = D(/* @__PURE__ */ new Map()), b = O(() => e.filter((i) => !i.disabled).map((i) => i.id), [e]), x = A((i) => {
    N.current.get(i)?.focus();
  }, []), m = A(
    (i, h) => {
      if (b.length === 0) return;
      const g = b.indexOf(h);
      let C = null;
      switch (i.key) {
        case "ArrowRight":
        case "ArrowDown":
          C = g === -1 ? 0 : (g + 1) % b.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          C = g === -1 ? b.length - 1 : (g - 1 + b.length) % b.length;
          break;
        case "Home":
          C = 0;
          break;
        case "End":
          C = b.length - 1;
          break;
        case "Enter":
        case " ":
          i.preventDefault(), a(h);
          return;
        default:
          return;
      }
      if (C !== null) {
        i.preventDefault();
        const y = b[C];
        a(y), x(y);
      }
    },
    [b, a, x]
  );
  return /* @__PURE__ */ t(
    "div",
    {
      role: "tablist",
      "aria-label": d,
      className: u(We(n), l),
      style: s,
      children: e.map((i) => {
        const h = i.id === r;
        return /* @__PURE__ */ c(
          "button",
          {
            ref: (g) => {
              g ? N.current.set(i.id, g) : N.current.delete(i.id);
            },
            type: "button",
            role: "tab",
            id: `${v}-tab-${i.id}`,
            "aria-controls": `${v}-panel-${i.id}`,
            "aria-selected": h,
            "aria-disabled": i.disabled || void 0,
            tabIndex: h ? 0 : -1,
            disabled: i.disabled,
            onClick: () => !i.disabled && a(i.id),
            onKeyDown: (g) => m(g, i.id),
            className: u(
              "inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer",
              Ue[o],
              Ge(n, h, !!i.disabled)
            ),
            children: [
              i.icon,
              /* @__PURE__ */ t("span", { children: i.label }),
              i.badge !== void 0 && i.badge !== null && /* @__PURE__ */ t(
                "span",
                {
                  className: u(
                    "ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold",
                    h && n === "pill" ? "bg-white/20 text-white" : "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"
                  ),
                  children: i.badge
                }
              )
            ]
          },
          i.id
        );
      })
    }
  );
}
function tr({ id: e, when: r, idPrefix: a, className: n, style: o, children: l }) {
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
const qe = {
  positive: "text-[var(--color-success)]",
  negative: "text-[var(--color-danger)]",
  neutral: "text-[var(--color-text-secondary)]"
};
function ze(e) {
  return e.tone ?? (e.direction === "up" ? "positive" : "negative");
}
function rr({
  label: e,
  value: r,
  accent: a = !1,
  danger: n = !1,
  hint: o,
  delta: l,
  sparklineData: s,
  to: d,
  as: p,
  onClick: f,
  mono: v = !1,
  className: N,
  style: b,
  "data-testid": x
}) {
  const m = u(
    "block rounded-lg border p-3 no-underline transition-colors",
    !a && !n && "bg-[var(--color-surface)] border-[var(--color-border)]",
    a && "bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]",
    n && "bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]",
    (d || f) && "hover:bg-[var(--color-surface-hover)] cursor-pointer",
    N
  ), i = s && s.length > 0 ? s : null;
  let h = null;
  if (l) {
    const C = ze(l), y = l.direction === "up" ? "▲" : "▼", S = l.direction === "up" ? "+" : "-", I = l.suffix ?? "%", $ = Math.abs(l.value), k = l["aria-label"] ?? `${l.direction} ${$}${I}`;
    h = /* @__PURE__ */ c(
      "div",
      {
        "data-testid": "stat-card-delta",
        "data-direction": l.direction,
        "data-tone": C,
        "aria-label": k,
        className: u("mt-1 text-[12px] font-medium leading-tight", qe[C]),
        children: [
          /* @__PURE__ */ c("span", { "aria-hidden": "true", children: [
            y,
            " "
          ] }),
          S,
          $,
          I
        ]
      }
    );
  }
  const g = /* @__PURE__ */ c(P, { children: [
    /* @__PURE__ */ t("div", { className: "text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]", children: e }),
    /* @__PURE__ */ c("div", { className: "mt-1 flex items-center gap-2", children: [
      /* @__PURE__ */ t(
        "div",
        {
          className: u(
            "text-[24px] font-bold leading-tight text-[var(--color-text-primary)]",
            v && "font-mono"
          ),
          children: r
        }
      ),
      i && /* @__PURE__ */ t(he, { data: i, width: 80, height: 20 })
    ] }),
    h,
    o != null && /* @__PURE__ */ t("div", { className: "mt-1 text-[11px] italic text-[var(--color-text-tertiary)]", children: o })
  ] });
  return d ? p ? /* @__PURE__ */ t(p, { to: d, "data-testid": x, className: m, style: b, children: g }) : /* @__PURE__ */ t("a", { href: d, "data-testid": x, className: m, style: b, children: g }) : f ? /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      onClick: f,
      "data-testid": x,
      className: u(m, "w-full text-left"),
      style: b,
      children: g
    }
  ) : /* @__PURE__ */ t("div", { "data-testid": x, className: m, style: b, children: g });
}
const Ye = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4"
};
function ar({
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
        Ye[r],
        a ? "gap-2" : "gap-4",
        n
      ),
      style: o,
      children: e
    }
  );
}
const Ve = {
  sm: "h-1.5",
  md: "h-2"
};
function nr({
  value: e,
  max: r = 100,
  color: a,
  size: n = "md",
  label: o,
  showRatio: l = !0,
  className: s,
  style: d,
  "data-testid": p,
  "aria-label": f
}) {
  const v = r > 0 ? r : 100, N = Math.max(0, Math.min(e, v)), b = Math.min(100, N / v * 100), x = a ?? "var(--color-primary)";
  return /* @__PURE__ */ c("div", { "data-testid": p, className: u("w-full", s), style: d, children: [
    o != null && /* @__PURE__ */ c("div", { className: "flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]", children: [
      /* @__PURE__ */ t("span", { children: o }),
      /* @__PURE__ */ t("span", { className: "text-[var(--color-text-tertiary)] tabular-nums", children: l ? `${N}/${v}` : `${Math.round(b)}%` })
    ] }),
    /* @__PURE__ */ t(
      "div",
      {
        role: "progressbar",
        "aria-valuenow": N,
        "aria-valuemin": 0,
        "aria-valuemax": v,
        "aria-label": f,
        className: u(
          "w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]",
          Ve[n]
        ),
        children: /* @__PURE__ */ t(
          "div",
          {
            className: "h-full rounded-full transition-all duration-300",
            style: { width: `${b}%`, background: x }
          }
        )
      }
    )
  ] });
}
const Je = {
  online: "var(--color-success, #22c55e)",
  away: "var(--color-state-pending, #f59e0b)",
  busy: "var(--color-state-error, #ef4444)",
  offline: "var(--color-text-tertiary, #94a3b8)",
  unknown: "var(--color-text-tertiary, #94a3b8)"
}, Qe = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
  unknown: "Unknown presence"
};
function Ze({
  state: e,
  ariaLabel: r,
  label: a,
  pulse: n,
  size: o = "sm",
  className: l,
  style: s,
  title: d,
  "data-testid": p
}) {
  const f = n ?? e === "online", v = r ?? Qe[e];
  return /* @__PURE__ */ t(
    re,
    {
      color: Je[e],
      pulse: f,
      size: o,
      label: a,
      className: l,
      style: s,
      title: d,
      "data-testid": p ?? `presence-${e}`,
      "aria-label": v
    }
  );
}
function or({
  name: e,
  label: r,
  avatarSize: a = 20,
  avatarColor: n,
  presence: o,
  onClick: l,
  className: s,
  style: d,
  title: p,
  "data-testid": f = "user-chip"
}) {
  return /* @__PURE__ */ c(
    l ? "button" : "span",
    {
      type: l ? "button" : void 0,
      onClick: l,
      title: p ?? e,
      "data-testid": f,
      className: u(
        "inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-[12px] text-text-primary",
        l && "hover:bg-surface-hover cursor-pointer transition-colors",
        !l && "cursor-default",
        s
      ),
      style: d,
      children: [
        /* @__PURE__ */ t(q, { name: e, size: a, color: n }),
        /* @__PURE__ */ t("span", { className: "font-medium leading-none", children: r ?? e }),
        o && /* @__PURE__ */ t(Ze, { state: o, size: "xs" })
      ]
    }
  );
}
const Xe = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm"
}, et = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", tt = "bg-white shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]";
function lr({
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
        return /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            onClick: () => a(l.value),
            "aria-pressed": s,
            className: u(
              "inline-flex items-center gap-1.5 rounded-md font-medium transition-all cursor-pointer",
              Xe[n],
              s ? tt : et
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
function sr({
  label: e,
  id: r,
  href: a,
  mono: n = !1,
  className: o,
  labelClassName: l
}) {
  const s = /* @__PURE__ */ t("span", { className: "truncate", children: e });
  return /* @__PURE__ */ c("div", { className: u("flex flex-col min-w-0", o), children: [
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
const rt = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function ir({
  open: e,
  onClose: r,
  title: a,
  subtitle: n,
  width: o = 460,
  children: l,
  footer: s,
  "data-testid": d
}) {
  const p = D(null);
  return _(() => {
    if (!e) return;
    const f = (v) => {
      v.key === "Escape" && r();
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [e, r]), _(() => {
    if (!e) return;
    const f = p.current;
    if (!f) return;
    const v = f.querySelector(rt);
    v ? v.focus() : (f.setAttribute("tabindex", "-1"), f.focus());
  }, [e]), e ? ae(
    /* @__PURE__ */ c("div", { className: "fixed inset-0 z-[9000]", "data-testid": d, children: [
      /* @__PURE__ */ t(
        "div",
        {
          className: "absolute inset-0 bg-black/30 backdrop-blur-[1px]",
          onClick: r,
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ c(
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
            /* @__PURE__ */ c("div", { className: "flex items-start justify-between p-5 border-b border-[var(--color-border)] flex-shrink-0", children: [
              /* @__PURE__ */ c("div", { className: "min-w-0", children: [
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
function at(e, r) {
  if (!e || typeof window > "u") return r;
  try {
    const a = window.localStorage.getItem(e);
    return a === null ? r : a === "true";
  } catch {
    return r;
  }
}
function cr({
  title: e,
  defaultOpen: r = !1,
  badge: a,
  children: n,
  className: o,
  storageKey: l
}) {
  const [s, d] = T(
    () => at(l, r)
  );
  return _(() => {
    if (l && !(typeof window > "u"))
      try {
        window.localStorage.setItem(l, String(s));
      } catch {
      }
  }, [s, l]), /* @__PURE__ */ c(
    "div",
    {
      className: u(
        "border border-[var(--color-border)] rounded-lg overflow-hidden",
        o
      ),
      children: [
        /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            className: "w-full flex items-center justify-between px-4 py-3 bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors text-left",
            onClick: () => d((p) => !p),
            "aria-expanded": s,
            children: [
              /* @__PURE__ */ t("span", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: e }),
              /* @__PURE__ */ c("div", { className: "flex items-center gap-2", children: [
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
function dr({
  value: e,
  onChange: r,
  placeholder: a,
  onClear: n,
  className: o,
  style: l,
  autoFocus: s,
  "aria-label": d
}) {
  return /* @__PURE__ */ c(
    "div",
    {
      className: u("relative inline-flex items-center", o),
      style: l,
      children: [
        /* @__PURE__ */ c(
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
            "aria-label": d,
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
const nt = {
  error: "bg-[var(--color-danger-bg,#fef2f2)] border-[var(--color-danger,#dc2626)] text-[var(--color-danger,#dc2626)]",
  success: "bg-[var(--color-success-bg,#f0fdf4)] border-[var(--color-success,#16a34a)] text-[var(--color-success,#16a34a)]",
  info: "bg-[var(--color-info-bg,#eff6ff)] border-[var(--color-info,#2563eb)] text-[var(--color-info,#2563eb)]",
  warning: "bg-[var(--color-warning-bg,#fffbeb)] border-[var(--color-warning,#f59e0b)] text-[var(--color-warning,#f59e0b)]"
};
function ur({ tone: e, children: r, onDismiss: a, className: n }) {
  return /* @__PURE__ */ c(
    "div",
    {
      role: e === "error" || e === "warning" ? "alert" : "status",
      "aria-live": e === "error" || e === "warning" ? "assertive" : "polite",
      className: u(
        "flex items-start gap-2 px-3 py-2 rounded-md border-l-[3px] text-sm",
        nt[e],
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
function pr({
  title: e,
  description: r,
  actions: a,
  back: n,
  badge: o,
  className: l
}) {
  return /* @__PURE__ */ c("div", { className: u("flex flex-col gap-1.5", l), children: [
    n && /* @__PURE__ */ c(
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
    /* @__PURE__ */ c("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ c("div", { className: "min-w-0 flex items-center gap-2.5", children: [
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
  return /* @__PURE__ */ c(P, { children: [
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
function ot(e) {
  if (e.length === 0) return "";
  if (e.length === 1) return `${e[0]} is typing…`;
  if (e.length === 2) return `${e[0]} and ${e[1]} are typing…`;
  const r = e.length - 2;
  return `${e[0]}, ${e[1]} and ${r} other${r > 1 ? "s" : ""} are typing…`;
}
function fr({
  names: e,
  compact: r = !1,
  color: a,
  size: n = "sm",
  className: o,
  "data-testid": l = "typing-indicator"
}) {
  return e.length === 0 ? null : /* @__PURE__ */ c(
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
        !r && /* @__PURE__ */ t("span", { children: ot(e) })
      ]
    }
  );
}
const J = {
  debug: "DEBUG",
  info: "INFO",
  warn: "WARN",
  error: "ERROR"
}, lt = {
  debug: "text-[var(--color-text-tertiary)]",
  info: "text-[var(--color-info,#3b82f6)]",
  warn: "text-[var(--color-warning,#d97706)]",
  error: "text-[var(--color-danger,#dc2626)]"
};
function st({
  lines: e,
  follow: r = !0,
  showTimestamp: a = !0,
  showLevel: n = !0,
  showSource: o = !0,
  title: l = "Log stream",
  headerSlot: s,
  emptyMessage: d = "No log lines yet.",
  maxHeight: p,
  onClear: f,
  className: v,
  style: N,
  "data-testid": b = "log-stream"
}) {
  const x = D(null), [m, i] = T(!1);
  _(() => {
    if (!r || m) return;
    const y = x.current;
    y && (y.scrollTop = y.scrollHeight);
  }, [e, r, m]);
  const h = () => {
    const y = x.current;
    if (!y) return;
    const S = y.scrollHeight - y.scrollTop - y.clientHeight < 24;
    i(!S);
  }, g = () => {
    const y = x.current;
    y && (y.scrollTop = y.scrollHeight, i(!1));
  }, C = /* @__PURE__ */ c("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ c(
      "span",
      {
        className: "text-[10px] text-[var(--color-text-tertiary)]",
        "data-testid": `${b}-count`,
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
        "data-testid": `${b}-clear`,
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
  return /* @__PURE__ */ c(
    ye,
    {
      "data-testid": b,
      className: u("flex flex-col", v),
      style: N,
      children: [
        l !== null && /* @__PURE__ */ t("div", { className: "px-4 py-3 border-b border-[var(--color-border)]", children: /* @__PURE__ */ t(ve, { title: l, meta: s ?? C }) }),
        /* @__PURE__ */ c("div", { className: "relative flex-1 min-h-0 flex", children: [
          /* @__PURE__ */ t(
            "div",
            {
              ref: x,
              onScroll: h,
              role: "log",
              "aria-live": r ? "polite" : "off",
              "data-testid": `${b}-scroll`,
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
                  "data-testid": `${b}-empty`,
                  className: "px-3 py-6 text-center text-[11px] text-[var(--color-text-tertiary)]",
                  children: d
                }
              ) : e.map((y) => {
                const S = y.level ?? "info";
                return /* @__PURE__ */ c(
                  "div",
                  {
                    role: "listitem",
                    "data-testid": `${b}-line`,
                    "data-level": y.level || void 0,
                    className: "flex items-baseline gap-2 px-3 hover:bg-[var(--color-surface,rgba(255,255,255,0.04))]",
                    children: [
                      a && y.timestamp && /* @__PURE__ */ t("span", { className: "shrink-0 text-[var(--color-text-tertiary)] tabular-nums", children: y.timestamp }),
                      n && y.level && /* @__PURE__ */ t(
                        "span",
                        {
                          className: u(
                            "shrink-0 font-semibold uppercase text-[10px] w-[44px]",
                            lt[S]
                          ),
                          "aria-label": `level ${J[S].toLowerCase()}`,
                          children: J[S]
                        }
                      ),
                      o && y.source && /* @__PURE__ */ c("span", { className: "shrink-0 text-[var(--color-text-secondary)]", children: [
                        "[",
                        y.source,
                        "]"
                      ] }),
                      /* @__PURE__ */ t("span", { className: "flex-1 whitespace-pre-wrap break-words", children: y.message })
                    ]
                  },
                  y.id
                );
              })
            }
          ),
          r && m && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "data-testid": `${b}-jump`,
              onClick: g,
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
const xr = st;
function mr({
  title: e,
  description: r,
  category: a,
  categoryTone: n = "neutral",
  thumbnail: o,
  icon: l = "🧩",
  thumbnailHeight: s = 160,
  href: d,
  onClick: p,
  badge: f,
  meta: v,
  className: N,
  style: b,
  "data-testid": x = "thumbnail-card"
}) {
  const i = u(
    "group block w-full text-left bg-[var(--color-surface,#fff)]",
    "rounded-xl border border-[var(--color-border)] overflow-hidden",
    "transition-[box-shadow,transform] duration-150",
    (d || p) && "cursor-pointer hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-0.5",
    N
  ), h = /* @__PURE__ */ c(P, { children: [
    /* @__PURE__ */ c(
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
    /* @__PURE__ */ c("div", { className: "px-4 py-3", children: [
      /* @__PURE__ */ c("div", { className: "flex items-center gap-2 mb-1.5", children: [
        a && /* @__PURE__ */ t(we, { tone: n, size: "xs", "data-testid": `${x}-category`, children: a }),
        v && /* @__PURE__ */ t("span", { className: "ml-auto", children: v })
      ] }),
      /* @__PURE__ */ t("div", { className: "text-[14px] font-semibold text-[var(--color-text-primary)] leading-snug", children: e }),
      r && /* @__PURE__ */ t("div", { className: "mt-1 text-[12px] text-[var(--color-text-secondary)] leading-snug", children: r })
    ] })
  ] });
  return d ? /* @__PURE__ */ t(
    "a",
    {
      href: d,
      onClick: p,
      "data-testid": x,
      className: u(i, "no-underline text-inherit"),
      style: b,
      children: h
    }
  ) : p ? /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      onClick: p,
      "data-testid": x,
      className: u(i, "font-inherit"),
      style: b,
      children: h
    }
  ) : /* @__PURE__ */ t("div", { "data-testid": x, className: i, style: b, children: h });
}
const it = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
};
function br({
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
        it[r],
        a ? "gap-3" : "gap-5",
        n
      ),
      style: o,
      children: e
    }
  );
}
function ct({
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
function dt({
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
      children: e.map((d, p) => {
        const f = Ne(d.tone ?? "neutral");
        return /* @__PURE__ */ c("div", { className: u("flex", "flex-col"), children: [
          /* @__PURE__ */ c(
            "div",
            {
              "data-testid": "stack-diagram-layer",
              "data-tone": f,
              className: u(
                "rounded-md border px-3 py-2",
                Se[f],
                Ce[f],
                !s && "min-w-[140px]"
              ),
              children: [
                /* @__PURE__ */ c("div", { className: "flex items-center gap-2", children: [
                  d.icon != null && /* @__PURE__ */ t("span", { className: "shrink-0 text-[14px] leading-none", "aria-hidden": !0, children: d.icon }),
                  /* @__PURE__ */ t("span", { className: u("text-[12px] font-semibold", ke[f]), children: d.label }),
                  d.meta != null && /* @__PURE__ */ t("span", { className: "ml-auto text-[10px] text-[var(--color-text-tertiary)] shrink-0", children: d.meta })
                ] }),
                d.description != null && /* @__PURE__ */ t("div", { className: "mt-0.5 text-[11px] leading-snug text-[var(--color-text-secondary)]", children: d.description })
              ]
            }
          ),
          p < e.length - 1 && /* @__PURE__ */ t(ct, { orientation: r, variant: a })
        ] }, d.id);
      })
    }
  );
}
const hr = dt;
function vr({
  value: e,
  onChange: r,
  onSubmit: a,
  disabled: n = !1,
  multiline: o = !1,
  placeholder: l,
  submitLabel: s = "→",
  className: d,
  style: p,
  autoFocus: f,
  maxRows: v = 4
}) {
  const N = !n && e.trim().length > 0, b = () => {
    N && a();
  }, x = (i) => {
    if (i.key === "Enter") {
      if (o && i.shiftKey) return;
      i.preventDefault(), b();
    }
  }, m = u(
    "flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--color-border-field,#d1d5db)] bg-white text-[var(--color-text-primary)]",
    "placeholder:text-[var(--color-text-tertiary)]",
    "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent",
    "resize-none",
    n && "opacity-50 cursor-not-allowed bg-[var(--color-surface-hover)]"
  );
  return /* @__PURE__ */ c(
    "div",
    {
      className: u(
        "flex items-end gap-2 p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]",
        d
      ),
      style: p,
      children: [
        o ? /* @__PURE__ */ t(
          "textarea",
          {
            className: m,
            value: e,
            onChange: (i) => r(i.target.value),
            onKeyDown: x,
            disabled: n,
            placeholder: l,
            autoFocus: f,
            rows: 2,
            style: { maxHeight: `${v * 1.5 + 1}rem`, overflowY: "auto" }
          }
        ) : /* @__PURE__ */ t(
          "input",
          {
            type: "text",
            className: m,
            value: e,
            onChange: (i) => r(i.target.value),
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
            onClick: b,
            disabled: !N,
            className: u(
              "px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex-shrink-0",
              N ? "bg-[var(--color-primary)] text-white hover:opacity-90" : "bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] cursor-not-allowed"
            ),
            children: s
          }
        )
      ]
    }
  );
}
function ut({ name: e, done: r, className: a }) {
  return /* @__PURE__ */ c(
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
function pt({ toolCalls: e, className: r }) {
  return /* @__PURE__ */ t("div", { className: u("flex flex-wrap gap-1.5 py-1", r), children: e.map((a) => /* @__PURE__ */ t(ut, { name: a.name, done: a.done }, a.id)) });
}
function gr({
  role: e,
  content: r,
  toolCalls: a,
  streaming: n = !1,
  agentName: o,
  userName: l,
  renderMarkdown: s,
  className: d
}) {
  const p = e === "user" ? l || "You" : o || "Assistant";
  return /* @__PURE__ */ c("div", { className: u("flex flex-col gap-1.5 py-3", d), children: [
    /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]", children: p }),
    a && a.length > 0 && /* @__PURE__ */ t(pt, { toolCalls: a }),
    e === "user" ? /* @__PURE__ */ t("div", { className: "text-sm text-[var(--color-text-primary)] whitespace-pre-wrap", children: r }) : /* @__PURE__ */ t("div", { className: "text-sm text-[var(--color-text-primary)] prose-sm max-w-none", children: r ? s ? s(r) : /* @__PURE__ */ t("span", { className: "whitespace-pre-wrap", children: r }) : n ? /* @__PURE__ */ t(F, {}) : null })
  ] });
}
function yr({
  content: e,
  streaming: r = !1,
  defaultOpen: a = !1,
  className: n
}) {
  const l = r || !e ? "Thinking" : "Thought";
  return /* @__PURE__ */ c(
    "details",
    {
      open: a,
      className: u(
        "rounded-md border border-[var(--color-border)] overflow-hidden text-sm group",
        n
      ),
      children: [
        /* @__PURE__ */ c("summary", { className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] list-none", children: [
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
function wr({
  prompts: e,
  onSelect: r,
  columns: a,
  title: n,
  className: o
}) {
  const l = a ? `repeat(${a}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(220px, 1fr))";
  return /* @__PURE__ */ c("div", { className: u("flex flex-col gap-3", o), children: [
    n && /* @__PURE__ */ t("p", { className: "text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] text-center", children: n }),
    /* @__PURE__ */ t("div", { style: { display: "grid", gridTemplateColumns: l, gap: 10 }, children: e.map((s, d) => /* @__PURE__ */ c(
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
      d
    )) })
  ] });
}
function Nr({
  suggestions: e,
  onSelect: r,
  onRefresh: a,
  label: n,
  className: o
}) {
  return /* @__PURE__ */ c("div", { className: u("flex items-center flex-wrap gap-1.5 py-2", o), children: [
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
function kr({
  name: e,
  memberCount: r,
  description: a,
  actions: n,
  avatarUrl: o,
  online: l,
  onMembersClick: s,
  className: d
}) {
  return /* @__PURE__ */ c(
    "div",
    {
      className: u(
        "flex items-center justify-between gap-4 px-6 py-3",
        "border-b border-[var(--color-border)] bg-[var(--color-surface)]",
        d
      ),
      children: [
        /* @__PURE__ */ c("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ c("div", { className: "relative shrink-0", children: [
            o ? /* @__PURE__ */ t(
              "img",
              {
                src: o,
                alt: e,
                className: "w-9 h-9 rounded-full object-cover"
              }
            ) : /* @__PURE__ */ t(q, { name: e, size: 36 }),
            l !== void 0 && /* @__PURE__ */ t("span", { className: "absolute -bottom-0.5 -right-0.5", children: /* @__PURE__ */ t(
              re,
              {
                color: l ? "#22c55e" : "#94a3b8",
                size: "sm",
                "aria-label": l ? "Online" : "Offline"
              }
            ) })
          ] }),
          /* @__PURE__ */ c("div", { className: "min-w-0 flex flex-col gap-0.5", children: [
            /* @__PURE__ */ c("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ t("h2", { className: "text-[15px] font-semibold text-[var(--color-text-primary)] leading-tight truncate", children: e }),
              r !== void 0 && /* @__PURE__ */ c(
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
function Cr({ user: e, items: r, className: a, "data-testid": n }) {
  const [o, l] = T(!1), s = D(null), d = A(() => l(!1), []);
  return _(() => {
    if (!o) return;
    const p = (f) => {
      s.current && !s.current.contains(f.target) && d();
    };
    return document.addEventListener("mousedown", p), () => document.removeEventListener("mousedown", p);
  }, [o, d]), _(() => {
    if (!o) return;
    const p = (f) => {
      f.key === "Escape" && d();
    };
    return document.addEventListener("keydown", p), () => document.removeEventListener("keydown", p);
  }, [o, d]), /* @__PURE__ */ c(
    "div",
    {
      ref: s,
      "data-testid": n,
      className: u("relative inline-block", a),
      children: [
        /* @__PURE__ */ c(
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
              ) : /* @__PURE__ */ t(q, { name: e.name, size: 32 }),
              /* @__PURE__ */ c("div", { className: "flex flex-col items-start text-left min-w-0 hidden sm:flex", children: [
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
        o && /* @__PURE__ */ c(
          "div",
          {
            role: "menu",
            "aria-label": "User menu",
            className: u(
              "absolute right-0 top-[calc(100%+6px)] min-w-[200px] z-[200]",
              "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md overflow-hidden"
            ),
            children: [
              /* @__PURE__ */ c("div", { className: "px-3 py-2.5 border-b border-[var(--color-border)]", children: [
                /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-[var(--color-text-primary)] truncate", children: e.name }),
                /* @__PURE__ */ t("p", { className: "text-xs text-[var(--color-text-tertiary)] truncate", children: e.email })
              ] }),
              /* @__PURE__ */ t("div", { className: "py-1", children: r.map((p, f) => /* @__PURE__ */ c("div", { children: [
                p.separator && f > 0 && /* @__PURE__ */ t("div", { className: "my-1 border-t border-[var(--color-border)]" }),
                /* @__PURE__ */ c(
                  "button",
                  {
                    type: "button",
                    role: "menuitem",
                    onClick: () => {
                      p.onClick(), d();
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
function ft({ item: e, isLast: r }) {
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
function xt(e, r) {
  if (e.length <= r) return e;
  const a = e.slice(0, 1), n = e.slice(-(r - 2 > 0 ? r - 2 : 1));
  return [...a, null, ...n];
}
function Sr({
  items: e,
  separator: r = "/",
  maxItems: a,
  className: n,
  "data-testid": o
}) {
  if (e.length === 0) return null;
  const l = a != null ? xt(e, a) : e;
  return /* @__PURE__ */ t("nav", { "aria-label": "Breadcrumb", "data-testid": o, className: u("flex items-center", n), children: /* @__PURE__ */ t("ol", { className: "flex items-center gap-1 flex-wrap list-none m-0 p-0", children: l.map((s, d) => {
    const p = d === l.length - 1;
    return /* @__PURE__ */ c("li", { className: "flex items-center gap-1", children: [
      s === null ? /* @__PURE__ */ t(
        "span",
        {
          className: "text-sm text-[var(--color-text-tertiary)] select-none",
          "aria-label": "More items",
          title: "Some items are hidden",
          children: "…"
        }
      ) : /* @__PURE__ */ t(ft, { item: s, isLast: p }),
      !p && /* @__PURE__ */ t(
        "span",
        {
          className: "text-[var(--color-text-tertiary)] text-sm select-none",
          "aria-hidden": "true",
          children: r
        }
      )
    ] }, d);
  }) }) });
}
const mt = {
  active: { bg: "#f0fdf4", border: "#86efac", text: "#166534", accent: "#16a34a" },
  in_progress: { bg: "#eff6ff", border: "#93c5fd", text: "#1e40af", accent: "#3b82f6" },
  completed: { bg: "#f0fdf4", border: "#86efac", text: "#166534", accent: "#16a34a" },
  archived: { bg: "#f9fafb", border: "#d1d5db", text: "#6b7280", accent: "#9ca3af" },
  planning: { bg: "#fefce8", border: "#fde047", text: "#713f12", accent: "#eab308" },
  paused: { bg: "#fff7ed", border: "#fdba74", text: "#9a3412", accent: "#f97316" }
}, bt = {
  bg: "#f3f4f6",
  border: "#d1d5db",
  text: "#374151",
  accent: "#6b7280"
};
function ht({ status: e, colors: r }) {
  return /* @__PURE__ */ c(
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
function $r({
  name: e,
  id: r,
  status: a,
  statusColors: n,
  contributorNames: o = [],
  contributorCount: l,
  activityItems: s = [],
  presenceDotColor: d = "#d1d5db",
  activityLabel: p = "",
  cardIndex: f = 0,
  onClick: v,
  className: N,
  style: b,
  minHeight: x = 190
}) {
  const m = { ...mt, ...n }, i = (a ?? "unknown").toLowerCase().replace(/ /g, "_"), h = m[i] ?? bt, g = l !== void 0 ? Math.max(0, l - o.length) : 0, C = f % 8 * 525;
  return /* @__PURE__ */ c(
    "button",
    {
      type: "button",
      onClick: v,
      className: N,
      style: {
        background: "#fff",
        border: "1.5px solid #e5e7eb",
        borderTop: `3px solid ${h.accent}`,
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
        ...b
      },
      onMouseEnter: (y) => {
        const S = y.currentTarget;
        S.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)", S.style.transform = "translateY(-1px)", S.style.borderColor = h.border;
      },
      onMouseLeave: (y) => {
        const S = y.currentTarget;
        S.style.boxShadow = "none", S.style.transform = "none", S.style.borderColor = "#e5e7eb";
      },
      children: [
        /* @__PURE__ */ c(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 8
            },
            children: [
              /* @__PURE__ */ c("div", { style: { flex: 1, minWidth: 0 }, children: [
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
              a && /* @__PURE__ */ t(ht, { status: a, colors: h })
            ]
          }
        ),
        /* @__PURE__ */ t($e, { items: s, staggerMs: C }),
        /* @__PURE__ */ c(
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
              /* @__PURE__ */ c("div", { style: { display: "flex", alignItems: "center", gap: 8, minWidth: 0 }, children: [
                o.length > 0 ? /* @__PURE__ */ t(ge, { names: o, maxVisible: 5, size: 24 }) : /* @__PURE__ */ c("span", { style: { fontSize: 12, color: "#9ca3af" }, children: [
                  /* @__PURE__ */ t("strong", { style: { color: "#374151" }, children: l ?? 0 }),
                  " contributors"
                ] }),
                o.length > 0 && g > 0 && /* @__PURE__ */ c("span", { style: { fontSize: 11, color: "#9ca3af" }, children: [
                  "+",
                  g,
                  " more"
                ] })
              ] }),
              p && /* @__PURE__ */ c("div", { style: { display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }, children: [
                /* @__PURE__ */ t(
                  "span",
                  {
                    style: {
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: d,
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
function vt(e) {
  const r = [], a = /* @__PURE__ */ new Map();
  for (const n of e) {
    const o = n.group ?? null;
    if (o === null) {
      (r.length === 0 || r[0].name !== null) && (r.unshift({ name: null, items: [] }), a.forEach((s, d) => a.set(d, s + 1))), r[0].items.push(n);
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
  const o = O(() => vt(e), [e]), l = o.some((s) => s.name !== null);
  return /* @__PURE__ */ t("nav", { className: "flex-1 overflow-y-auto py-1", children: l ? o.map(
    (s) => s.name === null ? /* @__PURE__ */ t(Z, { items: s.items, renderNavItem: n }, "__ungrouped") : /* @__PURE__ */ t(
      gt,
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
function Er({
  title: e,
  items: r,
  titleAction: a,
  railHeader: n,
  railWidth: o = 220,
  storageKey: l = "subnav",
  secondaryTitle: s,
  secondaryItems: d,
  secondaryStorageKey: p,
  secondaryRailWidth: f = 200,
  renderNavItem: v,
  children: N
}) {
  const b = d && d.length > 0;
  return /* @__PURE__ */ c("div", { className: "flex h-full min-h-0", children: [
    /* @__PURE__ */ c(
      "aside",
      {
        className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
        style: { width: o },
        children: [
          /* @__PURE__ */ c("div", { className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]", children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]", children: e }),
            a
          ] }),
          n && /* @__PURE__ */ t("div", { className: "px-3 py-2 border-b border-[var(--color-border)]", children: n }),
          /* @__PURE__ */ t(Q, { items: r, storageKey: l, title: e, renderNavItem: v })
        ]
      }
    ),
    b && /* @__PURE__ */ c(
      "aside",
      {
        className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
        style: { width: f },
        children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]", children: /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]", children: s ?? "" }) }),
          /* @__PURE__ */ t(
            Q,
            {
              items: d,
              storageKey: p ?? `${l}.secondary`,
              title: s ?? "secondary",
              renderNavItem: v
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t("main", { className: "flex-1 min-w-0 overflow-auto p-6", children: N })
  ] });
}
function Z({
  items: e,
  renderNavItem: r
}) {
  return /* @__PURE__ */ t(P, { children: e.map((a) => /* @__PURE__ */ t(oe, { item: a, renderNavItem: r }, a.path)) });
}
function gt({
  name: e,
  items: r,
  storageKey: a,
  renderNavItem: n
}) {
  const [o, l] = T(() => typeof window > "u" ? !1 : window.localStorage?.getItem(a) === "1");
  _(() => {
    typeof window > "u" || (o ? window.localStorage?.setItem(a, "1") : window.localStorage?.removeItem(a));
  }, [o, a]);
  const s = r.find((p) => p.groupScrollAfter)?.groupScrollAfter, d = s ? { maxHeight: s * 38, overflowY: "auto" } : void 0;
  return /* @__PURE__ */ c("section", { className: "border-b border-[var(--color-border)]", children: [
    /* @__PURE__ */ c(
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
    !o && /* @__PURE__ */ t("div", { style: d, children: r.map((p) => /* @__PURE__ */ t(oe, { item: p, renderNavItem: n }, p.path)) })
  ] });
}
function oe({
  item: e,
  renderNavItem: r
}) {
  const a = e.accent === "danger" ? "#dc2626" : e.accent === "warning" ? "#d97706" : e.accent === "success" ? "#16a34a" : void 0, n = /* @__PURE__ */ c(P, { children: [
    /* @__PURE__ */ c("div", { className: "flex items-center justify-between gap-2", children: [
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
  ) : r ? /* @__PURE__ */ t(P, { children: r(e, n, o) }) : /* @__PURE__ */ t(
    "a",
    {
      href: e.path,
      className: "block px-[14px] py-2 border-l-[3px] border-transparent text-[var(--color-text-secondary)] no-underline cursor-pointer",
      children: n
    }
  );
}
const Lr = {
  borderLeft: "3px solid var(--color-primary)",
  background: "var(--color-surface-hover)",
  color: "var(--color-text-primary)"
}, yt = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function X(e) {
  return Array.from(e.querySelectorAll(yt)).filter(
    (r) => r.getAttribute("aria-hidden") !== "true"
  );
}
function wt(e, r, a) {
  return r === "right" ? {
    position: "fixed",
    top: e.top,
    left: e.right + a
  } : r === "bottom-end" ? {
    position: "fixed",
    top: e.bottom + a,
    left: e.right,
    transform: "translateX(-100%)"
  } : {
    position: "fixed",
    top: e.bottom + a,
    left: e.left
  };
}
function Nt({
  trigger: e,
  open: r,
  onClose: a,
  placement: n = "bottom-start",
  offset: o = 6,
  className: l,
  zIndex: s = 9500,
  "data-testid": d = "inline-popover",
  children: p
}) {
  const f = D(null), [v, N] = T(null), b = D(null), x = A(() => {
    const m = e.current;
    if (!m) return;
    const i = m.getBoundingClientRect();
    N(wt(i, n, o));
  }, [e, n, o]);
  return de(() => {
    if (!r) {
      N(null);
      return;
    }
    x();
  }, [r, x]), _(() => {
    if (!r) return;
    const m = () => x();
    return window.addEventListener("scroll", m, !0), window.addEventListener("resize", m), () => {
      window.removeEventListener("scroll", m, !0), window.removeEventListener("resize", m);
    };
  }, [r, x]), _(() => {
    if (!r) return;
    const m = typeof document < "u" ? document.activeElement : null;
    return b.current = m, queueMicrotask(() => {
      const i = f.current;
      if (!i) return;
      const h = X(i);
      h.length > 0 ? h[0].focus() : (i.setAttribute("tabindex", "-1"), i.focus());
    }), () => {
      const i = b.current;
      i && typeof i.focus == "function" && document.contains(i) && i.focus(), b.current = null;
    };
  }, [r]), _(() => {
    if (!r) return;
    const m = (i) => {
      if (i.key === "Escape") {
        i.stopPropagation(), a();
        return;
      }
      if (i.key !== "Tab") return;
      const h = f.current;
      if (!h) return;
      const g = X(h);
      if (g.length === 0) {
        i.preventDefault();
        return;
      }
      const C = g[0], y = g[g.length - 1], S = document.activeElement;
      if (!S || !h.contains(S)) {
        i.preventDefault(), C.focus();
        return;
      }
      i.shiftKey && S === C ? (i.preventDefault(), y.focus()) : !i.shiftKey && S === y && (i.preventDefault(), C.focus());
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [r, a]), _(() => {
    if (!r) return;
    const m = (i) => {
      const h = i.target;
      h && (f.current?.contains(h) || e.current?.contains(h) || a());
    };
    return document.addEventListener("mousedown", m), () => document.removeEventListener("mousedown", m);
  }, [r, a, e]), !r || !v || typeof document > "u" ? null : ae(
    /* @__PURE__ */ t(
      "div",
      {
        ref: f,
        role: "dialog",
        "data-testid": d,
        "data-placement": n,
        className: u(
          "min-w-[160px] rounded-lg border border-border bg-white",
          "shadow-lg p-1 text-sm text-slate-700",
          l
        ),
        style: { ...v, zIndex: s },
        children: p
      }
    ),
    document.body
  );
}
function Tr({
  trigger: e,
  triggerLabel: r = "Open menu",
  triggerTitle: a,
  triggerClassName: n,
  align: o = "start",
  sections: l,
  className: s,
  "data-testid": d = "dropdown-menu"
}) {
  const [p, f] = T(!1), v = D(null), N = D(null), b = A(() => f(!1), []), x = A((m) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(m.key)) return;
    const i = N.current;
    if (!i) return;
    const h = Array.from(
      i.querySelectorAll('[role="menuitem"]')
    );
    if (h.length === 0) return;
    m.preventDefault();
    const g = h.indexOf(document.activeElement);
    let C;
    m.key === "Home" ? C = 0 : m.key === "End" ? C = h.length - 1 : m.key === "ArrowDown" ? C = g < 0 ? 0 : (g + 1) % h.length : C = g <= 0 ? h.length - 1 : g - 1, h[C].focus();
  }, []);
  return /* @__PURE__ */ c(P, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        ref: v,
        type: "button",
        "aria-label": r,
        "aria-haspopup": "menu",
        "aria-expanded": p,
        title: a,
        onClick: () => f((m) => !m),
        className: u(
          "inline-flex items-center justify-center gap-1.5 cursor-pointer",
          "rounded-md border border-[var(--color-border)] px-2 py-1",
          "text-base leading-none text-[var(--color-text-secondary)]",
          "bg-transparent hover:bg-[var(--color-surface-hover)] transition-colors duration-100",
          p && "bg-[var(--color-surface-hover)]",
          n
        ),
        children: e
      }
    ),
    /* @__PURE__ */ t(
      Nt,
      {
        trigger: v,
        open: p,
        onClose: b,
        placement: o === "end" ? "bottom-end" : "bottom-start",
        className: u("min-w-[180px] p-0 overflow-hidden rounded-lg", s),
        "data-testid": d,
        children: /* @__PURE__ */ t(
          "div",
          {
            ref: N,
            role: "menu",
            "aria-label": r,
            onKeyDown: x,
            className: "py-1",
            children: l.map((m, i) => /* @__PURE__ */ c("div", { role: "group", "aria-label": m.label, children: [
              i > 0 && /* @__PURE__ */ t("div", { role: "separator", className: "my-1 border-t border-[var(--color-border)]" }),
              m.label && /* @__PURE__ */ t("div", { className: "px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]", children: m.label }),
              m.items.map((h, g) => /* @__PURE__ */ c(
                "button",
                {
                  type: "button",
                  role: "menuitem",
                  "aria-current": h.active || void 0,
                  onClick: () => {
                    h.onSelect(), b();
                  },
                  className: u(
                    "flex items-center gap-2.5 w-full text-left px-3.5 py-2",
                    "text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100",
                    h.danger ? "text-[#dc2626] bg-transparent hover:bg-[#fef2f2]" : h.active ? "font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface-hover)]" : "font-normal text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"
                  ),
                  children: [
                    h.icon && /* @__PURE__ */ t("span", { className: "shrink-0 text-base leading-none", "aria-hidden": "true", children: h.icon }),
                    h.label
                  ]
                },
                g
              ))
            ] }, i))
          }
        )
      }
    )
  ] });
}
const kt = {
  success: {
    pill: "bg-success-bg border-success-border",
    dot: "bg-success",
    text: "text-success-fg"
  },
  error: {
    pill: "bg-danger-bg border-danger-border",
    dot: "bg-danger",
    text: "text-danger-fg"
  },
  warning: {
    pill: "bg-warning-bg border-warning-border",
    dot: "bg-warning",
    text: "text-warning-fg"
  },
  info: {
    pill: "bg-info-bg border-info-border",
    dot: "bg-info",
    text: "text-info-fg"
  },
  neutral: {
    pill: "bg-surface-hover border-border",
    dot: "bg-slate-400",
    text: "text-slate-700"
  },
  pending: {
    pill: "bg-accent-bg border-accent-border",
    dot: "bg-accent",
    text: "text-accent-fg"
  }
}, Ct = {
  sm: "px-1.5 py-0.5 text-[10px] gap-1",
  md: "px-2.5 py-1 text-[12px] gap-1.5"
}, ee = {
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2"
};
function Ar({
  state: e,
  label: r,
  icon: a,
  size: n = "md",
  className: o,
  "data-testid": l
}) {
  const s = kt[e], d = e === "pending";
  return /* @__PURE__ */ c(
    "span",
    {
      role: "status",
      "data-testid": l,
      "data-state": e,
      className: u(
        "inline-flex items-center rounded-full border font-medium leading-none select-none",
        s.pill,
        s.text,
        Ct[n],
        o
      ),
      children: [
        a ? /* @__PURE__ */ t("span", { "aria-hidden": "true", className: "shrink-0", children: a }) : (
          // Dot indicator — pending gets a relative container with an animate-ping halo.
          /* @__PURE__ */ c("span", { className: u("relative inline-flex shrink-0", ee[n]), children: [
            d && /* @__PURE__ */ t(
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
  F as A,
  Sr as B,
  Jt as C,
  Vt as D,
  sr as E,
  Nr as F,
  mr as G,
  ut as H,
  ur as I,
  pt as J,
  ar as K,
  hr as L,
  gr as M,
  fr as N,
  Cr as O,
  pr as P,
  wr as Q,
  Lr as R,
  dr as S,
  tr as T,
  or as U,
  ot as V,
  Ke as W,
  Wt as X,
  qt as Y,
  br as a,
  kr as b,
  vr as c,
  Ut as d,
  cr as e,
  zt as f,
  Yt as g,
  Gt as h,
  ir as i,
  Tr as j,
  Qt as k,
  Xt as l,
  Nt as m,
  Zt as n,
  st as o,
  Ze as p,
  nr as q,
  $r as r,
  lr as s,
  dt as t,
  rr as u,
  Ar as v,
  Er as w,
  er as x,
  xr as y,
  yr as z
};
