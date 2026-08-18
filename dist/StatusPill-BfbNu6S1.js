import { jsxs as i, jsx as t, Fragment as B } from "react/jsx-runtime";
import { useState as T, useCallback as A, createContext as ce, useMemo as M, useEffect as R, useRef as D, useContext as de, useId as te, useLayoutEffect as ue } from "react";
import { c as u } from "./cn-B6yFEsav.js";
import { _ as O } from "./index-Bjylubtc.js";
import { M as re } from "./Modal-fp5zcyw8.js";
import { T as pe, b as fe, e as J, a as xe, c as G, d as F } from "./Table-D7HV0dS-.js";
import { E as me } from "./EmptyState-Ejc9dJA3.js";
import { S as he } from "./PermissionDeniedCard-zuRojsB7.js";
import { S as be, C as ve } from "./CardHeader-DdyKN-6E.js";
import { A as q, a as ge } from "./Avatar-B7O2g50s.js";
import { S as ae } from "./StatusDot-BC7B1tTr.js";
import { createPortal as ne } from "react-dom";
import { C as ye } from "./Card-qOg_oC77.js";
import { C as we } from "./Chip-BDT8ro4h.js";
import { t as Ne, f as ke, b as Ce, a as Se } from "./tones-DknNcB3q.js";
import { A as Ee } from "./Badge-3b8qOTfQ.js";
import "clsx";
import "tailwind-merge";
const $e = [
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
function Re(e, r) {
  let a = e.replace(/(\/\/.*?)(\n|$)/g, `<span style="color:${r.comment}">$1</span>$2`);
  a = a.replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:${r.comment}">$1</span>`), a = a.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    `<span style="color:${r.string}">$1</span>`
  );
  const n = new RegExp(`\\b(${$e.join("|")})\\b`, "g");
  return a = a.replace(n, `<span style="color:${r.keyword}">$1</span>`), a = a.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span style="color:${r.number}">$1</span>`), a;
}
function _e(e, r) {
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
const Oe = {
  comment: "#6b7280",
  string: "#4ade80",
  keyword: "#93c5fd",
  number: "#fbbf24",
  property: "#7dd3fc",
  builtin: "#c4b5fd",
  variable: "#fbbf24"
}, Me = {
  comment: "#64748b",
  string: "#15803d",
  keyword: "#1d4ed8",
  number: "#a16207",
  property: "#0369a1",
  builtin: "#7c3aed",
  variable: "#a16207"
};
function V(e, r, a) {
  const n = a === "dark" ? Oe : Me, o = Ae(e);
  switch (r) {
    case "json":
      return _e(o, n);
    case "bash":
    case "sh":
      return De(o, n);
    case "text":
      return o;
    default:
      return Re(o, n);
  }
}
function Gt({
  code: e,
  language: r = "tsx",
  theme: a = "dark",
  copyButton: n = !0,
  showLineNumbers: o = !1,
  className: s,
  style: l,
  "data-testid": d,
  ariaLabel: p
}) {
  const [f, v] = T(!1), N = A(() => {
    typeof navigator > "u" || !navigator.clipboard || navigator.clipboard.writeText(e).then(() => {
      v(!0), setTimeout(() => v(!1), 1500);
    }).catch(() => {
    });
  }, [e]), h = a === "dark", x = e.split(`
`);
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": d,
      "data-language": r,
      "data-theme": a,
      className: u(
        "relative rounded-lg border font-mono text-[13px] leading-relaxed overflow-hidden",
        h ? "bg-surface-inverse text-text-inverse border-border-emphasis" : "bg-surface-panel text-text-primary border-border",
        s
      ),
      style: l,
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
              h ? "bg-surface-inverse text-text-inverse border-border-emphasis hover:bg-neutral" : "bg-white text-text-primary border-border-emphasis hover:bg-surface-hover"
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
                h ? "text-neutral" : "text-text-tertiary"
              ),
              "aria-hidden": "true",
              children: x.map((m, c) => /* @__PURE__ */ t("div", { children: c + 1 }, c))
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
const je = "cui:command-palette:recents", Pe = 5;
function Be(e, r) {
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
const oe = ce(null);
function U() {
  const e = de(oe);
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
function Fe(e, r) {
  const a = r.toLowerCase().split("+").map((v) => v.trim()).filter(Boolean);
  if (a.length === 0) return !1;
  const n = a[a.length - 1], o = new Set(a.slice(0, -1)), s = o.has("cmd") || o.has("meta"), l = o.has("ctrl"), d = o.has("mod"), p = o.has("shift"), f = o.has("alt");
  if (d) {
    if (!e.metaKey && !e.ctrlKey) return !1;
  } else if (s !== e.metaKey || l !== e.ctrlKey) return !1;
  return p !== e.shiftKey || f !== e.altKey ? !1 : e.key.toLowerCase() === n;
}
function qt({
  commands: e,
  getDynamicCommands: r,
  recentsKey: a = je,
  recentsLimit: n = Pe,
  children: o
}) {
  const [s, l] = T(!1), [d, p] = T(""), [f, v] = T(
    () => /* @__PURE__ */ new Map()
  ), [N, h] = T(
    () => Be(a, n)
  ), x = A(
    (E) => {
      a !== null && h((k) => {
        const $ = [E, ...k.filter((j) => j !== E)].slice(
          0,
          n
        );
        return Ie(a, $), $;
      });
    },
    [a, n]
  ), m = A(() => l(!0), []), c = A(() => {
    l(!1), p("");
  }, []), b = A(() => l((E) => !E), []), g = A((E) => {
    v((k) => {
      const $ = new Map(k);
      return $.set(E.id, E), $;
    });
  }, []), C = A((E) => {
    v((k) => {
      if (!k.has(E)) return k;
      const $ = new Map(k);
      return $.delete(E), $;
    });
  }, []);
  R(() => {
    const E = (k) => {
      (k.metaKey || k.ctrlKey) && k.key.toLowerCase() === "k" && (k.preventDefault(), l(($) => !$));
    };
    return window.addEventListener("keydown", E, !0), () => window.removeEventListener("keydown", E, !0);
  }, []);
  const y = M(() => {
    const E = r ? r(d) : [];
    return [...e ?? [], ...E, ...f.values()].filter(($) => $.when ? $.when() : !0);
  }, [e, r, d, f]), S = D(y);
  S.current = y, R(() => {
    const E = (k) => {
      if (!((k.metaKey || k.ctrlKey) && k.key.toLowerCase() === "k")) {
        for (const $ of S.current)
          if ($.hotkey && Fe(k, $.hotkey)) {
            k.preventDefault(), Promise.resolve().then(() => $.run());
            return;
          }
      }
    };
    return window.addEventListener("keydown", E), () => window.removeEventListener("keydown", E);
  }, []);
  const I = {
    open: m,
    close: c,
    toggle: b,
    isOpen: s,
    query: d,
    setQuery: p,
    mergedCommands: y,
    registerCommand: g,
    unregisterCommand: C,
    recents: N,
    noteSelection: x
  };
  return /* @__PURE__ */ t(oe.Provider, { value: I, children: o });
}
function zt(e) {
  const { registerCommand: r, unregisterCommand: a } = U();
  R(() => (r(e), () => a(e.id)), [e, r, a]);
}
function Ke(e) {
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
function Jt({
  placeholder: e = "Type a command or search…",
  emptyState: r,
  className: a
} = {}) {
  const {
    isOpen: n,
    close: o,
    query: s,
    setQuery: l,
    mergedCommands: d,
    recents: p,
    noteSelection: f
  } = U(), v = M(() => {
    if (s.trim() !== "" || p.length === 0) return [];
    const x = new Map(d.map((m) => [m.id, m]));
    return p.map((m) => x.get(m)).filter((m) => !!m);
  }, [d, s, p]), N = M(() => Ke(d), [d]), h = A(
    (x) => {
      f(x.id), o(), Promise.resolve().then(() => x.run());
    },
    [o, f]
  );
  return /* @__PURE__ */ t(
    re,
    {
      open: n,
      onClose: o,
      maxWidth: 640,
      rawChildren: !0,
      backdropTestId: "command-palette-backdrop",
      children: /* @__PURE__ */ i(
        O,
        {
          label: "Command palette",
          value: void 0,
          className: u("flex flex-col gap-0 w-full", a),
          "data-testid": "command-palette",
          children: [
            /* @__PURE__ */ t(
              O.Input,
              {
                value: s,
                onValueChange: l,
                placeholder: e,
                "data-autofocus": !0,
                className: u(
                  "w-full px-3 py-2.5 text-sm border-0 border-b border-border",
                  "outline-none bg-transparent text-text-primary placeholder:text-text-tertiary"
                ),
                "data-testid": "command-palette-input"
              }
            ),
            /* @__PURE__ */ i(O.List, { className: "max-h-[360px] overflow-y-auto py-2", children: [
              /* @__PURE__ */ t(O.Empty, { className: "px-3 py-6 text-center text-sm text-text-tertiary", children: r ?? "No results." }),
              v.length > 0 && /* @__PURE__ */ t(O.Group, { heading: "Recent", "data-testid": "command-palette-group-recent", children: v.map((x) => /* @__PURE__ */ i(
                O.Item,
                {
                  value: `recent-${x.id} ${x.label}`,
                  keywords: x.keywords,
                  onSelect: () => h(x),
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
                O.Group,
                {
                  heading: x ?? void 0,
                  children: m.map((c) => /* @__PURE__ */ i(
                    O.Item,
                    {
                      value: `${c.id} ${c.label} ${(c.keywords ?? []).join(" ")}`,
                      keywords: c.keywords,
                      onSelect: () => h(c),
                      "data-testid": `command-palette-item-${c.id}`,
                      className: u(
                        "flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm",
                        "text-text-primary aria-selected:bg-surface-hover"
                      ),
                      children: [
                        c.icon && /* @__PURE__ */ t("span", { className: "shrink-0 text-text-secondary", children: c.icon }),
                        /* @__PURE__ */ t("span", { className: "flex-1 truncate", children: c.label }),
                        c.hint && /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary truncate", children: c.hint }),
                        c.shortcut && c.shortcut.length > 0 && /* @__PURE__ */ t("span", { className: "flex items-center gap-1 shrink-0", children: c.shortcut.map((b, g) => /* @__PURE__ */ t(
                          "kbd",
                          {
                            className: u(
                              "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1",
                              "text-[10px] font-mono font-medium",
                              "bg-surface-hover text-text-secondary",
                              "border border-border rounded"
                            ),
                            children: b
                          },
                          `${c.id}-kbd-${g}`
                        )) })
                      ]
                    },
                    c.id
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
function Vt({ className: e } = {}) {
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
function Yt({
  data: e,
  columns: r,
  keyField: a,
  onRowClick: n,
  rowActions: o,
  searchable: s = !1,
  searchPlaceholder: l = "Search…",
  pageSize: d,
  emptyMessage: p = "No records.",
  loading: f = !1,
  loadingRows: v = 5,
  className: N,
  "data-testid": h
}) {
  const [x, m] = T(null), [c, b] = T("asc"), [g, C] = T(""), [y, S] = T(0), I = (w) => {
    x === w ? b((_) => _ === "asc" ? "desc" : "asc") : (m(w), b("asc"));
  }, E = M(() => {
    if (!s || g.trim() === "") return e;
    const w = g.trim().toLowerCase();
    return e.filter(
      (_) => r.some((L) => L.filterable === !1 ? !1 : (L.getFilterText ? L.getFilterText(_) : String(_[L.key] ?? "")).toLowerCase().includes(w))
    );
  }, [e, r, g, s]), k = M(() => {
    if (!x) return E;
    const w = r.find((P) => P.key === x);
    if (!w || !w.sortable) return E;
    const _ = w.compare ?? ((P, K) => {
      const le = String(P[w.key] ?? ""), ie = String(K[w.key] ?? "");
      return le.localeCompare(ie);
    }), L = [...E];
    return L.sort((P, K) => c === "asc" ? _(P, K) : -_(P, K)), L;
  }, [E, r, x, c]), $ = d && d > 0 ? Math.max(1, Math.ceil(k.length / d)) : 1, j = Math.min(y, $ - 1), z = M(() => {
    if (!d || d <= 0) return k;
    const w = j * d;
    return k.slice(w, w + d);
  }, [k, d, j]);
  return /* @__PURE__ */ i("div", { className: u("flex flex-col gap-3", N), "data-testid": h, children: [
    s && /* @__PURE__ */ t(
      "input",
      {
        type: "text",
        value: g,
        onChange: (w) => {
          C(w.target.value), S(0);
        },
        placeholder: l,
        "aria-label": "Search",
        "data-testid": "datatable-search",
        className: "w-full max-w-xs rounded-md border border-border-field bg-surface px-3 py-1.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none"
      }
    ),
    /* @__PURE__ */ i(pe, { className: "border border-border rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ t(fe, { children: /* @__PURE__ */ i("tr", { children: [
        r.map((w) => {
          const _ = w.sortable && x === w.key;
          return /* @__PURE__ */ t(
            J,
            {
              sortable: w.sortable,
              sortDirection: _ ? c : null,
              style: w.width ? { width: w.width } : void 0,
              className: u(W(w.align), w.className),
              onClick: w.sortable ? () => I(w.key) : void 0,
              "data-testid": w.sortable ? `datatable-header-${w.key}` : void 0,
              children: w.header
            },
            w.key
          );
        }),
        o && /* @__PURE__ */ t(J, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ t(xe, { children: f ? Array.from({ length: v }).map((w, _) => /* @__PURE__ */ i(G, { "data-testid": "datatable-loading-row", children: [
        r.map((L) => /* @__PURE__ */ t(F, { className: W(L.align), children: /* @__PURE__ */ t("div", { className: "h-4 w-3/4 animate-pulse rounded bg-surface-hover" }) }, L.key)),
        o && /* @__PURE__ */ t(F, { className: "text-right", children: /* @__PURE__ */ t("div", { className: "ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" }) })
      ] }, `skeleton-${_}`)) : z.length === 0 ? /* @__PURE__ */ t(G, { children: /* @__PURE__ */ t(
        F,
        {
          colSpan: r.length + (o ? 1 : 0),
          className: "text-center text-text-secondary py-8",
          children: p
        }
      ) }) : z.map((w, _) => /* @__PURE__ */ i(
        G,
        {
          clickable: !!n,
          onClick: n ? () => n(w) : void 0,
          children: [
            r.map((L) => /* @__PURE__ */ t(
              F,
              {
                className: u(W(L.align), L.className),
                children: L.render ? L.render(w, _) : String(w[L.key] ?? "")
              },
              L.key
            )),
            o && /* @__PURE__ */ t(F, { className: "text-right", onClick: (L) => L.stopPropagation(), children: /* @__PURE__ */ t("div", { className: "flex items-center justify-end gap-2", children: o(w) }) })
          ]
        },
        a(w)
      )) })
    ] }),
    d && d > 0 && k.length > d && /* @__PURE__ */ i("div", { className: "flex items-center justify-between text-xs text-text-secondary", children: [
      /* @__PURE__ */ i("span", { "data-testid": "datatable-page-summary", children: [
        "Page ",
        j + 1,
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
            onClick: () => S((w) => Math.min($ - 1, w + 1)),
            disabled: j >= $ - 1,
            "data-testid": "datatable-next",
            className: "rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-surface-panel",
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
const He = "🔒";
function Zt({
  capabilityName: e,
  title: r,
  description: a,
  actionLabel: n,
  onAction: o,
  actions: s,
  icon: l,
  testId: d = "capability-denied-fallback"
}) {
  const p = r ?? (e ? `${e} is unavailable` : "Feature unavailable"), f = a ?? (e ? `${e} is not enabled for this workspace. Contact your administrator to request access.` : "This feature is not enabled for your account. Contact your administrator to request access.");
  return /* @__PURE__ */ t(
    me,
    {
      icon: l === null ? void 0 : l ?? He,
      title: p,
      description: f,
      actionLabel: n,
      onAction: o,
      actions: s,
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
  onAction: s,
  action: l,
  testId: d = "error-state",
  actionTestId: p = "error-state-action"
}) {
  const f = n ?? a;
  return /* @__PURE__ */ i(
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
        l ? /* @__PURE__ */ t("div", { className: "mt-2.5", children: l }) : o && s && /* @__PURE__ */ t(
          "button",
          {
            "data-testid": p,
            onClick: s,
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
function Xt({
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
        /* @__PURE__ */ t(he, { size: a, color: n, "aria-label": e }),
        /* @__PURE__ */ t("div", { className: "text-[15px] font-medium text-text-primary", children: e }),
        r && /* @__PURE__ */ t("div", { className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal", children: r })
      ]
    }
  );
}
function er({
  label: e,
  hint: r,
  error: a,
  required: n = !1,
  layout: o = "stacked",
  children: s,
  className: l,
  style: d,
  "data-testid": p
}) {
  const f = te(), v = `${f}-label`, N = r || a ? `${f}-desc` : void 0, h = {
    id: f,
    labelId: v,
    "aria-describedby": N,
    "aria-invalid": a ? !0 : void 0
  };
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": p,
      className: u(
        o === "inline" ? "flex items-center gap-3" : "flex flex-col gap-1",
        l
      ),
      style: d,
      children: [
        /* @__PURE__ */ i(
          "label",
          {
            id: v,
            htmlFor: f,
            className: u(
              "text-[12px] font-medium",
              o === "inline" ? "min-w-[140px]" : "",
              a ? "text-[#991b1b]" : "text-text-primary"
            ),
            children: [
              e,
              n && /* @__PURE__ */ t("span", { className: "ml-0.5 text-[#991b1b]", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ i("div", { className: u(o === "inline" ? "flex-1" : ""), children: [
          s(h),
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
const Ue = [
  {
    title: "Global",
    rows: [
      { keys: "⌘/Ctrl + K", action: "Command palette (placeholder)" },
      { keys: "?", action: "Show shortcut help" },
      { keys: "g p", action: "Go to Pipelines" },
      { keys: "g o", action: "Go to Observability dashboard" }
    ]
  },
  {
    title: "List view (/pipelines)",
    rows: [
      { keys: "⌘/Ctrl + N", action: "New pipeline" },
      { keys: "/", action: "Focus search" },
      { keys: "Enter", action: "Open focused pipeline in editor" },
      { keys: "R", action: "Run focused pipeline (if published)" }
    ]
  },
  {
    title: "Editor (/pipelines/:id)",
    rows: [
      { keys: "⌘/Ctrl + S", action: "Save now" },
      { keys: "⌘/Ctrl + Enter", action: "Run (if published)" },
      { keys: "⌘/Ctrl + .", action: "Cancel running" },
      { keys: "⌘/Ctrl + Shift + P", action: "Publish" },
      { keys: "⌘/Ctrl + Z  /  ⌘/Ctrl + Shift + Z", action: "Undo / Redo" },
      { keys: "⌘/Ctrl + C / X / V / D", action: "Copy / Cut / Paste / Duplicate" },
      { keys: "⌘/Ctrl + A", action: "Select all nodes" },
      { keys: "⌘/Ctrl + F", action: "Focus palette search" },
      { keys: "Backspace / Delete", action: "Delete selection" },
      { keys: "1 – 8", action: "Insert node type by palette order" },
      { keys: "Arrow keys", action: "Nudge 4px" },
      { keys: "Shift + Arrow", action: "Nudge 16px" },
      { keys: "F", action: "Fit view" },
      { keys: "Shift + F", action: "Zoom to selection" },
      { keys: "⌘/Ctrl + 0", action: "Reset zoom to 1.0×" },
      { keys: "M", action: "Toggle minimap" },
      { keys: "G", action: "Toggle grid snap" },
      { keys: "⌘/Ctrl + /", action: "Toggle execution log" },
      { keys: "Space + drag", action: "Pan canvas" },
      { keys: "Esc", action: "Deselect / close config panel / close modal" }
    ]
  },
  {
    title: "Replay view",
    rows: [
      { keys: "Space", action: "Play / pause" },
      { keys: "j  /  ←", action: "Back 1 event" },
      { keys: "k  /  →", action: "Forward 1 event" },
      { keys: "Shift + J / ←", action: "Back 10 events" },
      { keys: "Shift + K / →", action: "Forward 10 events" },
      { keys: "Home", action: "Seek to start" },
      { keys: "End", action: "Seek to end" },
      { keys: "0 – 9", action: "Seek to 0% / 10% / … / 90%" }
    ]
  },
  {
    title: "Observability events view",
    rows: [
      { keys: "/", action: "Focus filter search" },
      { keys: "L", action: "Toggle Live / Paused" },
      { keys: "⌘/Ctrl + E", action: "Export JSONL" },
      { keys: "Arrow keys", action: "Navigate event list" },
      { keys: "Enter", action: "Open in detail pane" }
    ]
  }
];
function tr({ open: e, onClose: r }) {
  return /* @__PURE__ */ i(
    re,
    {
      open: e,
      onClose: r,
      title: "Keyboard shortcuts",
      maxWidth: 560,
      cardStyle: { maxHeight: "85vh", display: "flex", flexDirection: "column" },
      rawChildren: !0,
      children: [
        /* @__PURE__ */ t("div", { className: "text-base font-semibold text-[#0f172a] mb-2.5", children: "Keyboard shortcuts" }),
        /* @__PURE__ */ t("div", { className: "overflow-y-auto pr-1", children: Ue.map((a, n) => /* @__PURE__ */ i("div", { children: [
          /* @__PURE__ */ t(
            "div",
            {
              className: u(
                "text-[12px] font-bold text-[#0f172a] uppercase tracking-[0.05em] mb-1.5",
                n === 0 ? "mt-0 pt-0" : "mt-4 pt-1.5 border-t border-[#f1f5f9]"
              ),
              children: a.title
            }
          ),
          /* @__PURE__ */ t("div", { children: a.rows.map((o, s) => /* @__PURE__ */ i(
            "div",
            {
              className: "flex items-baseline justify-between py-1 text-[13px] gap-4",
              children: [
                /* @__PURE__ */ t("span", { className: "font-mono text-[12px] text-[#0f172a] bg-[#f1f5f9] border border-[#e2e8f0] rounded px-1.5 py-px whitespace-nowrap shrink-0", children: o.keys }),
                /* @__PURE__ */ t("span", { className: "text-[#64748b] text-right flex-1", children: o.action })
              ]
            },
            `${a.title}-${s}`
          )) })
        ] }, a.title)) }),
        /* @__PURE__ */ t("div", { className: "flex justify-end mt-[18px]", children: /* @__PURE__ */ t(
          "button",
          {
            onClick: r,
            className: "py-1.5 px-3.5 text-[13px] font-semibold border border-[#e2e8f0] rounded-md bg-white text-[#374151] cursor-pointer font-[inherit]",
            children: "Close"
          }
        ) })
      ]
    }
  );
}
const Ge = {
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
function qe(e, r, a) {
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
function rr({
  items: e,
  value: r,
  onValueChange: a,
  variant: n = "underline",
  size: o = "md",
  className: s,
  style: l,
  "aria-label": d,
  idPrefix: p
}) {
  const f = te(), v = p ?? f, N = D(/* @__PURE__ */ new Map()), h = M(() => e.filter((c) => !c.disabled).map((c) => c.id), [e]), x = A((c) => {
    N.current.get(c)?.focus();
  }, []), m = A(
    (c, b) => {
      if (h.length === 0) return;
      const g = h.indexOf(b);
      let C = null;
      switch (c.key) {
        case "ArrowRight":
        case "ArrowDown":
          C = g === -1 ? 0 : (g + 1) % h.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          C = g === -1 ? h.length - 1 : (g - 1 + h.length) % h.length;
          break;
        case "Home":
          C = 0;
          break;
        case "End":
          C = h.length - 1;
          break;
        case "Enter":
        case " ":
          c.preventDefault(), a(b);
          return;
        default:
          return;
      }
      if (C !== null) {
        c.preventDefault();
        const y = h[C];
        a(y), x(y);
      }
    },
    [h, a, x]
  );
  return /* @__PURE__ */ t(
    "div",
    {
      role: "tablist",
      "aria-label": d,
      className: u(We(n), s),
      style: l,
      children: e.map((c) => {
        const b = c.id === r;
        return /* @__PURE__ */ i(
          "button",
          {
            ref: (g) => {
              g ? N.current.set(c.id, g) : N.current.delete(c.id);
            },
            type: "button",
            role: "tab",
            id: `${v}-tab-${c.id}`,
            "aria-controls": `${v}-panel-${c.id}`,
            "aria-selected": b,
            "aria-disabled": c.disabled || void 0,
            tabIndex: b ? 0 : -1,
            disabled: c.disabled,
            onClick: () => !c.disabled && a(c.id),
            onKeyDown: (g) => m(g, c.id),
            className: u(
              "inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer",
              Ge[o],
              qe(n, b, !!c.disabled)
            ),
            children: [
              c.icon,
              /* @__PURE__ */ t("span", { children: c.label }),
              c.badge !== void 0 && c.badge !== null && /* @__PURE__ */ t(
                "span",
                {
                  className: u(
                    "ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold",
                    b && n === "pill" ? "bg-white/20 text-white" : "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"
                  ),
                  children: c.badge
                }
              )
            ]
          },
          c.id
        );
      })
    }
  );
}
function ar({ id: e, when: r, idPrefix: a, className: n, style: o, children: s }) {
  return e !== r ? null : /* @__PURE__ */ t(
    "div",
    {
      role: "tabpanel",
      id: a ? `${a}-panel-${e}` : void 0,
      "aria-labelledby": a ? `${a}-tab-${e}` : void 0,
      tabIndex: 0,
      className: n,
      style: o,
      children: s
    }
  );
}
const ze = {
  positive: "text-[var(--color-success)]",
  negative: "text-[var(--color-danger)]",
  neutral: "text-[var(--color-text-secondary)]"
};
function Je(e) {
  return e.tone ?? (e.direction === "up" ? "positive" : "negative");
}
function nr({
  label: e,
  value: r,
  accent: a = !1,
  danger: n = !1,
  hint: o,
  delta: s,
  sparklineData: l,
  to: d,
  as: p,
  onClick: f,
  mono: v = !1,
  className: N,
  style: h,
  "data-testid": x
}) {
  const m = u(
    "block rounded-lg border p-3 no-underline transition-colors",
    !a && !n && "bg-[var(--color-surface)] border-[var(--color-border)]",
    a && "bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]",
    n && "bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]",
    (d || f) && "hover:bg-[var(--color-surface-hover)] cursor-pointer",
    N
  ), c = l && l.length > 0 ? l : null;
  let b = null;
  if (s) {
    const C = Je(s), y = s.direction === "up" ? "▲" : "▼", S = s.direction === "up" ? "+" : "-", I = s.suffix ?? "%", E = Math.abs(s.value), k = s["aria-label"] ?? `${s.direction} ${E}${I}`;
    b = /* @__PURE__ */ i(
      "div",
      {
        "data-testid": "stat-card-delta",
        "data-direction": s.direction,
        "data-tone": C,
        "aria-label": k,
        className: u("mt-1 text-[12px] font-medium leading-tight", ze[C]),
        children: [
          /* @__PURE__ */ i("span", { "aria-hidden": "true", children: [
            y,
            " "
          ] }),
          S,
          E,
          I
        ]
      }
    );
  }
  const g = /* @__PURE__ */ i(B, { children: [
    /* @__PURE__ */ t("div", { className: "text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]", children: e }),
    /* @__PURE__ */ i("div", { className: "mt-1 flex items-center gap-2", children: [
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
      c && /* @__PURE__ */ t(be, { data: c, width: 80, height: 20 })
    ] }),
    b,
    o != null && /* @__PURE__ */ t("div", { className: "mt-1 text-[11px] italic text-[var(--color-text-tertiary)]", children: o })
  ] });
  return d ? p ? /* @__PURE__ */ t(p, { to: d, "data-testid": x, className: m, style: h, children: g }) : /* @__PURE__ */ t("a", { href: d, "data-testid": x, className: m, style: h, children: g }) : f ? /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      onClick: f,
      "data-testid": x,
      className: u(m, "w-full text-left"),
      style: h,
      children: g
    }
  ) : /* @__PURE__ */ t("div", { "data-testid": x, className: m, style: h, children: g });
}
const Ve = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4"
};
function or({
  children: e,
  columns: r = 4,
  dense: a = !1,
  className: n,
  style: o,
  "data-testid": s = "kpi-grid"
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-testid": s,
      className: u(
        "grid grid-cols-1",
        Ve[r],
        a ? "gap-2" : "gap-4",
        n
      ),
      style: o,
      children: e
    }
  );
}
const Ye = {
  sm: "h-1.5",
  md: "h-2"
};
function sr({
  value: e,
  max: r = 100,
  color: a,
  size: n = "md",
  label: o,
  showRatio: s = !0,
  className: l,
  style: d,
  "data-testid": p,
  "aria-label": f
}) {
  const v = r > 0 ? r : 100, N = Math.max(0, Math.min(e, v)), h = Math.min(100, N / v * 100), x = a ?? "var(--color-primary)";
  return /* @__PURE__ */ i("div", { "data-testid": p, className: u("w-full", l), style: d, children: [
    o != null && /* @__PURE__ */ i("div", { className: "flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]", children: [
      /* @__PURE__ */ t("span", { children: o }),
      /* @__PURE__ */ t("span", { className: "text-[var(--color-text-tertiary)] tabular-nums", children: s ? `${N}/${v}` : `${Math.round(h)}%` })
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
          Ye[n]
        ),
        children: /* @__PURE__ */ t(
          "div",
          {
            className: "h-full rounded-full transition-all duration-300",
            style: { width: `${h}%`, background: x }
          }
        )
      }
    )
  ] });
}
const Ze = {
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
function Xe({
  state: e,
  ariaLabel: r,
  label: a,
  pulse: n,
  size: o = "sm",
  className: s,
  style: l,
  title: d,
  "data-testid": p
}) {
  const f = n ?? e === "online", v = r ?? Qe[e];
  return /* @__PURE__ */ t(
    ae,
    {
      color: Ze[e],
      pulse: f,
      size: o,
      label: a,
      className: s,
      style: l,
      title: d,
      "data-testid": p ?? `presence-${e}`,
      "aria-label": v
    }
  );
}
function lr({
  name: e,
  label: r,
  avatarSize: a = 20,
  avatarColor: n,
  presence: o,
  onClick: s,
  className: l,
  style: d,
  title: p,
  "data-testid": f = "user-chip"
}) {
  return /* @__PURE__ */ i(
    s ? "button" : "span",
    {
      type: s ? "button" : void 0,
      onClick: s,
      title: p ?? e,
      "data-testid": f,
      className: u(
        "inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-[12px] text-text-primary",
        s && "hover:bg-surface-hover cursor-pointer transition-colors",
        !s && "cursor-default",
        l
      ),
      style: d,
      children: [
        /* @__PURE__ */ t(q, { name: e, size: a, color: n }),
        /* @__PURE__ */ t("span", { className: "font-medium leading-none", children: r ?? e }),
        o && /* @__PURE__ */ t(Xe, { state: o, size: "xs" })
      ]
    }
  );
}
const et = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm"
}, tt = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", rt = "bg-white shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]";
function ir({
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
      children: e.map((s) => {
        const l = s.value === r;
        return /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: () => a(s.value),
            "aria-pressed": l,
            className: u(
              "inline-flex items-center gap-1.5 rounded-md font-medium transition-all cursor-pointer",
              et[n],
              l ? rt : tt
            ),
            children: [
              s.icon,
              s.label
            ]
          },
          s.value
        );
      })
    }
  );
}
function cr({
  label: e,
  id: r,
  href: a,
  mono: n = !1,
  className: o,
  labelClassName: s
}) {
  const l = /* @__PURE__ */ t("span", { className: "truncate", children: e });
  return /* @__PURE__ */ i("div", { className: u("flex flex-col min-w-0", o), children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: u(
          "font-medium text-[var(--color-text-primary)] truncate text-sm",
          s
        ),
        children: a ? /* @__PURE__ */ t(
          "a",
          {
            href: a,
            className: "hover:text-[var(--color-primary)] hover:underline",
            children: l
          }
        ) : l
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
const at = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function dr({
  open: e,
  onClose: r,
  title: a,
  subtitle: n,
  width: o = 460,
  children: s,
  footer: l,
  "data-testid": d
}) {
  const p = D(null);
  return R(() => {
    if (!e) return;
    const f = (v) => {
      v.key === "Escape" && r();
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [e, r]), R(() => {
    if (!e) return;
    const f = p.current;
    if (!f) return;
    const v = f.querySelector(at);
    v ? v.focus() : (f.setAttribute("tabindex", "-1"), f.focus());
  }, [e]), e ? ne(
    /* @__PURE__ */ i("div", { className: "fixed inset-0 z-[9000]", "data-testid": d, children: [
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
            /* @__PURE__ */ t("div", { className: "flex-1 overflow-y-auto p-5", children: s }),
            l && /* @__PURE__ */ t("div", { className: "flex-shrink-0 border-t border-[var(--color-border)] p-4 bg-[var(--color-surface-inset,#f8fafc)]", children: l })
          ]
        }
      )
    ] }),
    document.body
  ) : null;
}
function nt(e, r) {
  if (!e || typeof window > "u") return r;
  try {
    const a = window.localStorage.getItem(e);
    return a === null ? r : a === "true";
  } catch {
    return r;
  }
}
function ur({
  title: e,
  defaultOpen: r = !1,
  badge: a,
  children: n,
  className: o,
  storageKey: s
}) {
  const [l, d] = T(
    () => nt(s, r)
  );
  return R(() => {
    if (s && !(typeof window > "u"))
      try {
        window.localStorage.setItem(s, String(l));
      } catch {
      }
  }, [l, s]), /* @__PURE__ */ i(
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
            onClick: () => d((p) => !p),
            "aria-expanded": l,
            children: [
              /* @__PURE__ */ t("span", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: e }),
              /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
                a,
                /* @__PURE__ */ t(
                  "svg",
                  {
                    className: u(
                      "w-4 h-4 text-[var(--color-text-tertiary)] transition-transform",
                      l && "rotate-180"
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
        l && /* @__PURE__ */ t("div", { className: "border-t border-[var(--color-border)] bg-white", children: n })
      ]
    }
  );
}
function pr({
  value: e,
  onChange: r,
  placeholder: a,
  onClear: n,
  className: o,
  style: s,
  autoFocus: l,
  "aria-label": d
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: u("relative inline-flex items-center", o),
      style: s,
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
            autoFocus: l,
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
const ot = {
  error: "bg-[var(--color-danger-bg,#fef2f2)] border-[var(--color-danger,#dc2626)] text-[var(--color-danger,#dc2626)]",
  success: "bg-[var(--color-success-bg,#f0fdf4)] border-[var(--color-success,#16a34a)] text-[var(--color-success,#16a34a)]",
  info: "bg-[var(--color-info-bg,#eff6ff)] border-[var(--color-info,#2563eb)] text-[var(--color-info,#2563eb)]",
  warning: "bg-[var(--color-warning-bg,#fffbeb)] border-[var(--color-warning,#f59e0b)] text-[var(--color-warning,#f59e0b)]"
};
function fr({ tone: e, children: r, onDismiss: a, className: n }) {
  return /* @__PURE__ */ i(
    "div",
    {
      role: e === "error" || e === "warning" ? "alert" : "status",
      "aria-live": e === "error" || e === "warning" ? "assertive" : "polite",
      className: u(
        "flex items-start gap-2 px-3 py-2 rounded-md border-l-[3px] text-sm",
        ot[e],
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
function xr({
  title: e,
  description: r,
  actions: a,
  back: n,
  badge: o,
  className: s
}) {
  return /* @__PURE__ */ i("div", { className: u("flex flex-col gap-1.5", s), children: [
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
function H({ size: e = "md", color: r, className: a }) {
  const n = e === "sm" ? 4 : 6, o = r || "var(--color-text-tertiary, #94a3b8)";
  return /* @__PURE__ */ i(B, { children: [
    /* @__PURE__ */ t("style", { children: `
        @keyframes thinkDot {
          0%, 80%, 100% { transform: scale(1); opacity: 0.4; }
          40% { transform: scale(1.3); opacity: 1; }
        }
      ` }),
    /* @__PURE__ */ t("span", { className: u("inline-flex items-center gap-1", a), children: [0, 1, 2].map((s) => /* @__PURE__ */ t(
      "span",
      {
        style: {
          width: n,
          height: n,
          borderRadius: "50%",
          background: o,
          display: "inline-block",
          animation: `thinkDot 1.2s ease-in-out ${s * 0.2}s infinite`
        }
      },
      s
    )) })
  ] });
}
function st(e) {
  if (e.length === 0) return "";
  if (e.length === 1) return `${e[0]} is typing…`;
  if (e.length === 2) return `${e[0]} and ${e[1]} are typing…`;
  const r = e.length - 2;
  return `${e[0]}, ${e[1]} and ${r} other${r > 1 ? "s" : ""} are typing…`;
}
function mr({
  names: e,
  compact: r = !1,
  color: a,
  size: n = "sm",
  className: o,
  "data-testid": s = "typing-indicator"
}) {
  return e.length === 0 ? null : /* @__PURE__ */ i(
    "span",
    {
      role: "status",
      "aria-live": "polite",
      "data-testid": s,
      className: u(
        "inline-flex items-center gap-1.5 text-[12px] text-text-tertiary",
        o
      ),
      children: [
        /* @__PURE__ */ t(H, { size: n, color: a }),
        !r && /* @__PURE__ */ t("span", { children: st(e) })
      ]
    }
  );
}
const Y = {
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
function it({
  lines: e,
  follow: r = !0,
  showTimestamp: a = !0,
  showLevel: n = !0,
  showSource: o = !0,
  title: s = "Log stream",
  headerSlot: l,
  emptyMessage: d = "No log lines yet.",
  maxHeight: p,
  onClear: f,
  className: v,
  style: N,
  "data-testid": h = "log-stream"
}) {
  const x = D(null), [m, c] = T(!1);
  R(() => {
    if (!r || m) return;
    const y = x.current;
    y && (y.scrollTop = y.scrollHeight);
  }, [e, r, m]);
  const b = () => {
    const y = x.current;
    if (!y) return;
    const S = y.scrollHeight - y.scrollTop - y.clientHeight < 24;
    c(!S);
  }, g = () => {
    const y = x.current;
    y && (y.scrollTop = y.scrollHeight, c(!1));
  }, C = /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ i(
      "span",
      {
        className: "text-[10px] text-[var(--color-text-tertiary)]",
        "data-testid": `${h}-count`,
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
        "data-testid": `${h}-clear`,
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
    ye,
    {
      "data-testid": h,
      className: u("flex flex-col", v),
      style: N,
      children: [
        s !== null && /* @__PURE__ */ t("div", { className: "px-4 py-3 border-b border-[var(--color-border)]", children: /* @__PURE__ */ t(ve, { title: s, meta: l ?? C }) }),
        /* @__PURE__ */ i("div", { className: "relative flex-1 min-h-0 flex", children: [
          /* @__PURE__ */ t(
            "div",
            {
              ref: x,
              onScroll: b,
              role: "log",
              "aria-live": r ? "polite" : "off",
              "data-testid": `${h}-scroll`,
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
                  "data-testid": `${h}-empty`,
                  className: "px-3 py-6 text-center text-[11px] text-[var(--color-text-tertiary)]",
                  children: d
                }
              ) : e.map((y) => {
                const S = y.level ?? "info";
                return /* @__PURE__ */ i(
                  "div",
                  {
                    role: "listitem",
                    "data-testid": `${h}-line`,
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
                          "aria-label": `level ${Y[S].toLowerCase()}`,
                          children: Y[S]
                        }
                      ),
                      o && y.source && /* @__PURE__ */ i("span", { className: "shrink-0 text-[var(--color-text-secondary)]", children: [
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
              "data-testid": `${h}-jump`,
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
const hr = it;
function br({
  title: e,
  description: r,
  category: a,
  categoryTone: n = "neutral",
  thumbnail: o,
  icon: s = "🧩",
  thumbnailHeight: l = 160,
  href: d,
  onClick: p,
  badge: f,
  meta: v,
  className: N,
  style: h,
  "data-testid": x = "thumbnail-card"
}) {
  const c = u(
    "group block w-full text-left bg-[var(--color-surface,#fff)]",
    "rounded-xl border border-[var(--color-border)] overflow-hidden",
    "transition-[box-shadow,transform] duration-150",
    (d || p) && "cursor-pointer hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-0.5",
    N
  ), b = /* @__PURE__ */ i(B, { children: [
    /* @__PURE__ */ i(
      "div",
      {
        "data-testid": `${x}-thumb`,
        className: u(
          "relative flex items-center justify-center",
          "bg-gradient-to-br from-[var(--color-primary-bg,#eef2ff)] to-[var(--color-surface,#ffffff)]",
          "border-b border-[var(--color-border)]"
        ),
        style: { height: l },
        children: [
          o ? /* @__PURE__ */ t(
            "img",
            {
              src: o,
              alt: "",
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ t("span", { className: "text-5xl opacity-50", "aria-hidden": !0, children: s }),
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
      className: u(c, "no-underline text-inherit"),
      style: h,
      children: b
    }
  ) : p ? /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      onClick: p,
      "data-testid": x,
      className: u(c, "font-inherit"),
      style: h,
      children: b
    }
  ) : /* @__PURE__ */ t("div", { "data-testid": x, className: c, style: h, children: b });
}
const ct = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
};
function vr({
  children: e,
  columns: r = 3,
  dense: a = !1,
  className: n,
  style: o,
  "data-testid": s = "catalog-grid"
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-testid": s,
      "data-columns": r,
      className: u(
        "grid grid-cols-1",
        ct[r],
        a ? "gap-3" : "gap-5",
        n
      ),
      style: o,
      children: e
    }
  );
}
function dt({
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
function ut({
  layers: e,
  orientation: r = "vertical",
  connector: a = "arrow",
  className: n,
  style: o,
  "data-testid": s = "stack-diagram"
}) {
  const l = r === "vertical";
  return /* @__PURE__ */ t(
    "div",
    {
      "data-testid": s,
      "data-orientation": r,
      "data-connector": a,
      className: u(
        "flex",
        l ? "flex-col items-stretch" : "flex-row items-stretch flex-wrap",
        n
      ),
      style: o,
      children: e.map((d, p) => {
        const f = Ne(d.tone ?? "neutral");
        return /* @__PURE__ */ i("div", { className: u("flex", "flex-col"), children: [
          /* @__PURE__ */ i(
            "div",
            {
              "data-testid": "stack-diagram-layer",
              "data-tone": f,
              className: u(
                "rounded-md border px-3 py-2",
                Se[f],
                Ce[f],
                !l && "min-w-[140px]"
              ),
              children: [
                /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
                  d.icon != null && /* @__PURE__ */ t("span", { className: "shrink-0 text-[14px] leading-none", "aria-hidden": !0, children: d.icon }),
                  /* @__PURE__ */ t("span", { className: u("text-[12px] font-semibold", ke[f]), children: d.label }),
                  d.meta != null && /* @__PURE__ */ t("span", { className: "ml-auto text-[10px] text-[var(--color-text-tertiary)] shrink-0", children: d.meta })
                ] }),
                d.description != null && /* @__PURE__ */ t("div", { className: "mt-0.5 text-[11px] leading-snug text-[var(--color-text-secondary)]", children: d.description })
              ]
            }
          ),
          p < e.length - 1 && /* @__PURE__ */ t(dt, { orientation: r, variant: a })
        ] }, d.id);
      })
    }
  );
}
const gr = ut;
function yr({
  value: e,
  onChange: r,
  onSubmit: a,
  disabled: n = !1,
  multiline: o = !1,
  placeholder: s,
  submitLabel: l = "→",
  className: d,
  style: p,
  autoFocus: f,
  maxRows: v = 4
}) {
  const N = !n && e.trim().length > 0, h = () => {
    N && a();
  }, x = (c) => {
    if (c.key === "Enter") {
      if (o && c.shiftKey) return;
      c.preventDefault(), h();
    }
  }, m = u(
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
        d
      ),
      style: p,
      children: [
        o ? /* @__PURE__ */ t(
          "textarea",
          {
            className: m,
            value: e,
            onChange: (c) => r(c.target.value),
            onKeyDown: x,
            disabled: n,
            placeholder: s,
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
            onChange: (c) => r(c.target.value),
            onKeyDown: x,
            disabled: n,
            placeholder: s,
            autoFocus: f
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: h,
            disabled: !N,
            className: u(
              "px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex-shrink-0",
              N ? "bg-[var(--color-primary)] text-white hover:opacity-90" : "bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] cursor-not-allowed"
            ),
            children: l
          }
        )
      ]
    }
  );
}
function pt({ name: e, done: r, className: a }) {
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
function ft({ toolCalls: e, className: r }) {
  return /* @__PURE__ */ t("div", { className: u("flex flex-wrap gap-1.5 py-1", r), children: e.map((a) => /* @__PURE__ */ t(pt, { name: a.name, done: a.done }, a.id)) });
}
function wr({
  role: e,
  content: r,
  toolCalls: a,
  streaming: n = !1,
  agentName: o,
  userName: s,
  renderMarkdown: l,
  className: d
}) {
  const p = e === "user" ? s || "You" : o || "Assistant";
  return /* @__PURE__ */ i("div", { className: u("flex flex-col gap-1.5 py-3", d), children: [
    /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]", children: p }),
    a && a.length > 0 && /* @__PURE__ */ t(ft, { toolCalls: a }),
    e === "user" ? /* @__PURE__ */ t("div", { className: "text-sm text-[var(--color-text-primary)] whitespace-pre-wrap", children: r }) : /* @__PURE__ */ t("div", { className: "text-sm text-[var(--color-text-primary)] prose-sm max-w-none", children: r ? l ? l(r) : /* @__PURE__ */ t("span", { className: "whitespace-pre-wrap", children: r }) : n ? /* @__PURE__ */ t(H, {}) : null })
  ] });
}
function Nr({
  content: e,
  streaming: r = !1,
  defaultOpen: a = !1,
  className: n
}) {
  const s = r || !e ? "Thinking" : "Thought";
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
          /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide", children: s }),
          r && !e && /* @__PURE__ */ t(H, { size: "sm" })
        ] }),
        /* @__PURE__ */ t("div", { className: "px-3 py-2 text-xs text-[var(--color-text-secondary)] italic border-t border-[var(--color-border)] bg-white whitespace-pre-wrap leading-relaxed", children: e || /* @__PURE__ */ t(H, {}) })
      ]
    }
  );
}
function kr({
  prompts: e,
  onSelect: r,
  columns: a,
  title: n,
  className: o
}) {
  const s = a ? `repeat(${a}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(220px, 1fr))";
  return /* @__PURE__ */ i("div", { className: u("flex flex-col gap-3", o), children: [
    n && /* @__PURE__ */ t("p", { className: "text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] text-center", children: n }),
    /* @__PURE__ */ t("div", { style: { display: "grid", gridTemplateColumns: s, gap: 10 }, children: e.map((l, d) => /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => r(l.label),
        className: "flex flex-col gap-1 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis,#cbd5e1)] text-left transition-colors",
        children: [
          /* @__PURE__ */ t("span", { className: "text-sm font-medium text-[var(--color-text-primary)]", children: l.label }),
          l.hint && /* @__PURE__ */ t("span", { className: "text-xs text-[var(--color-text-tertiary)]", children: l.hint })
        ]
      },
      d
    )) })
  ] });
}
function Cr({
  suggestions: e,
  onSelect: r,
  onRefresh: a,
  label: n,
  className: o
}) {
  return /* @__PURE__ */ i("div", { className: u("flex items-center flex-wrap gap-1.5 py-2", o), children: [
    n && /* @__PURE__ */ t("span", { className: "text-xs text-[var(--color-text-tertiary)] mr-1", children: n }),
    e.map((s, l) => /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: () => r(s),
        className: "inline-flex items-center px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors",
        children: s
      },
      l
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
function Sr({
  name: e,
  memberCount: r,
  description: a,
  actions: n,
  avatarUrl: o,
  online: s,
  onMembersClick: l,
  className: d
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: u(
        "flex items-center justify-between gap-4 px-6 py-3",
        "border-b border-[var(--color-border)] bg-[var(--color-surface)]",
        d
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
            ) : /* @__PURE__ */ t(q, { name: e, size: 36 }),
            s !== void 0 && /* @__PURE__ */ t("span", { className: "absolute -bottom-0.5 -right-0.5", children: /* @__PURE__ */ t(
              ae,
              {
                color: s ? "#22c55e" : "#94a3b8",
                size: "sm",
                "aria-label": s ? "Online" : "Offline"
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
                  onClick: l,
                  disabled: !l,
                  className: u(
                    "text-[11px] font-medium text-[var(--color-text-tertiary)]",
                    "bg-transparent border-none p-0 leading-none",
                    l && "cursor-pointer hover:text-[var(--color-text-secondary)]",
                    !l && "cursor-default"
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
function Er({ user: e, items: r, className: a, "data-testid": n }) {
  const [o, s] = T(!1), l = D(null), d = A(() => s(!1), []);
  return R(() => {
    if (!o) return;
    const p = (f) => {
      l.current && !l.current.contains(f.target) && d();
    };
    return document.addEventListener("mousedown", p), () => document.removeEventListener("mousedown", p);
  }, [o, d]), R(() => {
    if (!o) return;
    const p = (f) => {
      f.key === "Escape" && d();
    };
    return document.addEventListener("keydown", p), () => document.removeEventListener("keydown", p);
  }, [o, d]), /* @__PURE__ */ i(
    "div",
    {
      ref: l,
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
            onClick: () => s((p) => !p),
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
function xt({ item: e, isLast: r }) {
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
function mt(e, r) {
  if (e.length <= r) return e;
  const a = e.slice(0, 1), n = e.slice(-(r - 2 > 0 ? r - 2 : 1));
  return [...a, null, ...n];
}
function $r({
  items: e,
  separator: r = "/",
  maxItems: a,
  className: n,
  "data-testid": o
}) {
  if (e.length === 0) return null;
  const s = a != null ? mt(e, a) : e;
  return /* @__PURE__ */ t("nav", { "aria-label": "Breadcrumb", "data-testid": o, className: u("flex items-center", n), children: /* @__PURE__ */ t("ol", { className: "flex items-center gap-1 flex-wrap list-none m-0 p-0", children: s.map((l, d) => {
    const p = d === s.length - 1;
    return /* @__PURE__ */ i("li", { className: "flex items-center gap-1", children: [
      l === null ? /* @__PURE__ */ t(
        "span",
        {
          className: "text-sm text-[var(--color-text-tertiary)] select-none",
          "aria-label": "More items",
          title: "Some items are hidden",
          children: "…"
        }
      ) : /* @__PURE__ */ t(xt, { item: l, isLast: p }),
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
const ht = {
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
function vt({ status: e, colors: r }) {
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
function Lr({
  name: e,
  id: r,
  status: a,
  statusColors: n,
  contributorNames: o = [],
  contributorCount: s,
  activityItems: l = [],
  presenceDotColor: d = "#d1d5db",
  activityLabel: p = "",
  cardIndex: f = 0,
  onClick: v,
  className: N,
  style: h,
  minHeight: x = 190
}) {
  const m = { ...ht, ...n }, c = (a ?? "unknown").toLowerCase().replace(/ /g, "_"), b = m[c] ?? bt, g = s !== void 0 ? Math.max(0, s - o.length) : 0, C = f % 8 * 525;
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      onClick: v,
      className: N,
      style: {
        background: "#fff",
        border: "1.5px solid #e5e7eb",
        borderTop: `3px solid ${b.accent}`,
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
        ...h
      },
      onMouseEnter: (y) => {
        const S = y.currentTarget;
        S.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)", S.style.transform = "translateY(-1px)", S.style.borderColor = b.border;
      },
      onMouseLeave: (y) => {
        const S = y.currentTarget;
        S.style.boxShadow = "none", S.style.transform = "none", S.style.borderColor = "#e5e7eb";
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
              a && /* @__PURE__ */ t(vt, { status: a, colors: b })
            ]
          }
        ),
        /* @__PURE__ */ t(Ee, { items: l, staggerMs: C }),
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
                  /* @__PURE__ */ t("strong", { style: { color: "#374151" }, children: s ?? 0 }),
                  " contributors"
                ] }),
                o.length > 0 && g > 0 && /* @__PURE__ */ i("span", { style: { fontSize: 11, color: "#9ca3af" }, children: [
                  "+",
                  g,
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
function gt(e) {
  const r = [], a = /* @__PURE__ */ new Map();
  for (const n of e) {
    const o = n.group ?? null;
    if (o === null) {
      (r.length === 0 || r[0].name !== null) && (r.unshift({ name: null, items: [] }), a.forEach((l, d) => a.set(d, l + 1))), r[0].items.push(n);
      continue;
    }
    let s = a.get(o);
    s === void 0 && (s = r.length, a.set(o, s), r.push({ name: o, items: [] })), r[s].items.push(n);
  }
  return r;
}
function Z({
  items: e,
  storageKey: r,
  title: a,
  renderNavItem: n
}) {
  const o = M(() => gt(e), [e]), s = o.some((l) => l.name !== null);
  return /* @__PURE__ */ t("nav", { className: "flex-1 overflow-y-auto py-1", children: s ? o.map(
    (l) => l.name === null ? /* @__PURE__ */ t(Q, { items: l.items, renderNavItem: n }, "__ungrouped") : /* @__PURE__ */ t(
      yt,
      {
        name: l.name,
        items: l.items,
        storageKey: `${r}.${a}.${l.name}`,
        renderNavItem: n
      },
      l.name
    )
  ) : /* @__PURE__ */ t(Q, { items: e, renderNavItem: n }) });
}
function Tr({
  title: e,
  items: r,
  titleAction: a,
  railHeader: n,
  railWidth: o = 220,
  storageKey: s = "subnav",
  secondaryTitle: l,
  secondaryItems: d,
  secondaryStorageKey: p,
  secondaryRailWidth: f = 200,
  renderNavItem: v,
  children: N
}) {
  const h = d && d.length > 0;
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
          /* @__PURE__ */ t(Z, { items: r, storageKey: s, title: e, renderNavItem: v })
        ]
      }
    ),
    h && /* @__PURE__ */ i(
      "aside",
      {
        className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
        style: { width: f },
        children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]", children: /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]", children: l ?? "" }) }),
          /* @__PURE__ */ t(
            Z,
            {
              items: d,
              storageKey: p ?? `${s}.secondary`,
              title: l ?? "secondary",
              renderNavItem: v
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t("main", { className: "flex-1 min-w-0 overflow-auto p-6", children: N })
  ] });
}
function Q({
  items: e,
  renderNavItem: r
}) {
  return /* @__PURE__ */ t(B, { children: e.map((a) => /* @__PURE__ */ t(se, { item: a, renderNavItem: r }, a.path)) });
}
function yt({
  name: e,
  items: r,
  storageKey: a,
  renderNavItem: n
}) {
  const [o, s] = T(() => typeof window > "u" ? !1 : window.localStorage?.getItem(a) === "1");
  R(() => {
    typeof window > "u" || (o ? window.localStorage?.setItem(a, "1") : window.localStorage?.removeItem(a));
  }, [o, a]);
  const l = r.find((p) => p.groupScrollAfter)?.groupScrollAfter, d = l ? { maxHeight: l * 38, overflowY: "auto" } : void 0;
  return /* @__PURE__ */ i("section", { className: "border-b border-[var(--color-border)]", children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => s((p) => !p),
        className: "flex items-center gap-1.5 w-full px-3 py-2 bg-transparent border-none cursor-pointer text-[var(--color-text-tertiary)] text-[10px] font-bold tracking-[0.05em] uppercase text-left",
        "aria-expanded": !o,
        children: [
          /* @__PURE__ */ t("span", { className: "text-[10px] w-[10px] inline-block", "aria-hidden": "true", children: o ? "▸" : "▾" }),
          /* @__PURE__ */ t("span", { className: "flex-1", children: e }),
          /* @__PURE__ */ t("span", { className: "text-[9px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-bg)] px-[5px] py-px rounded-[6px] border border-[var(--color-border)]", children: r.length })
        ]
      }
    ),
    !o && /* @__PURE__ */ t("div", { style: d, children: r.map((p) => /* @__PURE__ */ t(se, { item: p, renderNavItem: n }, p.path)) })
  ] });
}
function se({
  item: e,
  renderNavItem: r
}) {
  const a = e.accent === "danger" ? "#dc2626" : e.accent === "warning" ? "#d97706" : e.accent === "success" ? "#16a34a" : void 0, n = /* @__PURE__ */ i(B, { children: [
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
  ) : r ? /* @__PURE__ */ t(B, { children: r(e, n, o) }) : /* @__PURE__ */ t(
    "a",
    {
      href: e.path,
      className: "block px-[14px] py-2 border-l-[3px] border-transparent text-[var(--color-text-secondary)] no-underline cursor-pointer",
      children: n
    }
  );
}
const Ar = {
  borderLeft: "3px solid var(--color-primary)",
  background: "var(--color-surface-hover)",
  color: "var(--color-text-primary)"
}, wt = [
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
    (r) => r.getAttribute("aria-hidden") !== "true"
  );
}
function Nt(e, r, a) {
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
function kt({
  trigger: e,
  open: r,
  onClose: a,
  placement: n = "bottom-start",
  offset: o = 6,
  className: s,
  zIndex: l = 9500,
  "data-testid": d = "inline-popover",
  children: p
}) {
  const f = D(null), [v, N] = T(null), h = D(null), x = A(() => {
    const m = e.current;
    if (!m) return;
    const c = m.getBoundingClientRect();
    N(Nt(c, n, o));
  }, [e, n, o]);
  return ue(() => {
    if (!r) {
      N(null);
      return;
    }
    x();
  }, [r, x]), R(() => {
    if (!r) return;
    const m = () => x();
    return window.addEventListener("scroll", m, !0), window.addEventListener("resize", m), () => {
      window.removeEventListener("scroll", m, !0), window.removeEventListener("resize", m);
    };
  }, [r, x]), R(() => {
    if (!r) return;
    const m = typeof document < "u" ? document.activeElement : null;
    return h.current = m, queueMicrotask(() => {
      const c = f.current;
      if (!c) return;
      const b = X(c);
      b.length > 0 ? b[0].focus() : (c.setAttribute("tabindex", "-1"), c.focus());
    }), () => {
      const c = h.current;
      c && typeof c.focus == "function" && document.contains(c) && c.focus(), h.current = null;
    };
  }, [r]), R(() => {
    if (!r) return;
    const m = (c) => {
      if (c.key === "Escape") {
        c.stopPropagation(), a();
        return;
      }
      if (c.key !== "Tab") return;
      const b = f.current;
      if (!b) return;
      const g = X(b);
      if (g.length === 0) {
        c.preventDefault();
        return;
      }
      const C = g[0], y = g[g.length - 1], S = document.activeElement;
      if (!S || !b.contains(S)) {
        c.preventDefault(), C.focus();
        return;
      }
      c.shiftKey && S === C ? (c.preventDefault(), y.focus()) : !c.shiftKey && S === y && (c.preventDefault(), C.focus());
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [r, a]), R(() => {
    if (!r) return;
    const m = (c) => {
      const b = c.target;
      b && (f.current?.contains(b) || e.current?.contains(b) || a());
    };
    return document.addEventListener("mousedown", m), () => document.removeEventListener("mousedown", m);
  }, [r, a, e]), !r || !v || typeof document > "u" ? null : ne(
    /* @__PURE__ */ t(
      "div",
      {
        ref: f,
        role: "dialog",
        "data-testid": d,
        "data-placement": n,
        className: u(
          "min-w-[160px] rounded-lg border border-border bg-white",
          "shadow-lg p-1 text-sm text-text-primary",
          s
        ),
        style: { ...v, zIndex: l },
        children: p
      }
    ),
    document.body
  );
}
function Rr({
  trigger: e,
  triggerLabel: r = "Open menu",
  triggerTitle: a,
  triggerClassName: n,
  align: o = "start",
  sections: s,
  className: l,
  "data-testid": d = "dropdown-menu"
}) {
  const [p, f] = T(!1), v = D(null), N = D(null), h = A(() => f(!1), []), x = A((m) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(m.key)) return;
    const c = N.current;
    if (!c) return;
    const b = Array.from(
      c.querySelectorAll('[role="menuitem"]')
    );
    if (b.length === 0) return;
    m.preventDefault();
    const g = b.indexOf(document.activeElement);
    let C;
    m.key === "Home" ? C = 0 : m.key === "End" ? C = b.length - 1 : m.key === "ArrowDown" ? C = g < 0 ? 0 : (g + 1) % b.length : C = g <= 0 ? b.length - 1 : g - 1, b[C].focus();
  }, []);
  return /* @__PURE__ */ i(B, { children: [
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
      kt,
      {
        trigger: v,
        open: p,
        onClose: h,
        placement: o === "end" ? "bottom-end" : "bottom-start",
        className: u("min-w-[180px] p-0 overflow-hidden rounded-lg", l),
        "data-testid": d,
        children: /* @__PURE__ */ t(
          "div",
          {
            ref: N,
            role: "menu",
            "aria-label": r,
            onKeyDown: x,
            className: "py-1",
            children: s.map((m, c) => /* @__PURE__ */ i("div", { role: "group", "aria-label": m.label, children: [
              c > 0 && /* @__PURE__ */ t("div", { role: "separator", className: "my-1 border-t border-[var(--color-border)]" }),
              m.label && /* @__PURE__ */ t("div", { className: "px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]", children: m.label }),
              m.items.map((b, g) => /* @__PURE__ */ i(
                "button",
                {
                  type: "button",
                  role: "menuitem",
                  "aria-current": b.active || void 0,
                  onClick: () => {
                    b.onSelect(), h();
                  },
                  className: u(
                    "flex items-center gap-2.5 w-full text-left px-3.5 py-2",
                    "text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100",
                    b.danger ? "text-[#dc2626] bg-transparent hover:bg-[#fef2f2]" : b.active ? "font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface-hover)]" : "font-normal text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"
                  ),
                  children: [
                    b.icon && /* @__PURE__ */ t("span", { className: "shrink-0 text-base leading-none", "aria-hidden": "true", children: b.icon }),
                    b.label
                  ]
                },
                g
              ))
            ] }, c))
          }
        )
      }
    )
  ] });
}
const Ct = {
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
    dot: "bg-surface-emphasis",
    text: "text-text-primary"
  },
  pending: {
    pill: "bg-accent-bg border-accent-border",
    dot: "bg-accent",
    text: "text-accent-fg"
  }
}, St = {
  sm: "px-1.5 py-0.5 text-[10px] gap-1",
  md: "px-2.5 py-1 text-[12px] gap-1.5"
}, ee = {
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2"
};
function _r({
  state: e,
  label: r,
  icon: a,
  size: n = "md",
  className: o,
  "data-testid": s
}) {
  const l = Ct[e], d = e === "pending";
  return /* @__PURE__ */ i(
    "span",
    {
      role: "status",
      "data-testid": s,
      "data-state": e,
      className: u(
        "inline-flex items-center rounded-full border font-medium leading-none select-none",
        l.pill,
        l.text,
        St[n],
        o
      ),
      children: [
        a ? /* @__PURE__ */ t("span", { "aria-hidden": "true", className: "shrink-0", children: a }) : (
          // Dot indicator — pending gets a relative container with an animate-ping halo.
          /* @__PURE__ */ i("span", { className: u("relative inline-flex shrink-0", ee[n]), children: [
            d && /* @__PURE__ */ t(
              "span",
              {
                "aria-hidden": "true",
                className: u(
                  "absolute inset-0 rounded-full animate-ping opacity-75",
                  l.dot
                )
              }
            ),
            /* @__PURE__ */ t(
              "span",
              {
                "aria-hidden": "true",
                className: u("relative rounded-full", ee[n], l.dot)
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
  Nr as A,
  $r as B,
  Zt as C,
  Yt as D,
  cr as E,
  Cr as F,
  H as G,
  br as H,
  fr as I,
  pt as J,
  or as K,
  gr as L,
  wr as M,
  ft as N,
  mr as O,
  xr as P,
  kr as Q,
  Er as R,
  pr as S,
  ar as T,
  lr as U,
  Ar as V,
  st as W,
  Fe as X,
  Wt as Y,
  zt as Z,
  vr as a,
  Sr as b,
  yr as c,
  Gt as d,
  ur as e,
  Jt as f,
  Vt as g,
  qt as h,
  dr as i,
  Rr as j,
  Qt as k,
  er as l,
  kt as m,
  Xt as n,
  it as o,
  Xe as p,
  sr as q,
  Lr as r,
  ir as s,
  tr as t,
  ut as u,
  nr as v,
  _r as w,
  Tr as x,
  rr as y,
  hr as z
};
