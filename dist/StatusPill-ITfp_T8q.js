import { jsxs as c, jsx as r, Fragment as _ } from "react/jsx-runtime";
import { useState as T, useCallback as $, createContext as Y, useMemo as O, useEffect as L, useRef as A, useContext as Z, useId as Q, useLayoutEffect as X } from "react";
import { c as u } from "./cn-B6yFEsav.js";
import { _ as R } from "./index-Bjylubtc.js";
import { M as U } from "./Modal-X8tdpRKs.js";
import { E as ee } from "./EmptyState-Ejc9dJA3.js";
import { S as re } from "./PermissionDeniedCard-0XYb6Eju.js";
import { S as te, C as oe } from "./CardHeader-C068zmoE.js";
import { A as B, a as ae } from "./Avatar-B7O2g50s.js";
import { S as G } from "./StatusDot-BC7B1tTr.js";
import { createPortal as W } from "react-dom";
import { C as ne } from "./Card-qOg_oC77.js";
import { C as le } from "./Chip-BDT8ro4h.js";
import { t as se, f as ie, b as ce, a as de } from "./tones-DknNcB3q.js";
import { A as ue } from "./Badge-pOBJ8s2D.js";
import "clsx";
import "tailwind-merge";
const pe = [
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
], fe = [
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
], xe = [
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
function me(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function he(e, t) {
  let o = e.replace(/(\/\/.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
  o = o.replace(/(\/\*[\s\S]*?\*\/)/g, `<span style="color:${t.comment}">$1</span>`), o = o.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    `<span style="color:${t.string}">$1</span>`
  );
  const a = new RegExp(`\\b(${pe.join("|")})\\b`, "g");
  return o = o.replace(a, `<span style="color:${t.keyword}">$1</span>`), o = o.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), o;
}
function be(e, t) {
  let o = e.replace(
    /("(?:[^"\\]|\\.)*")(\s*:)/g,
    `<span style="color:${t.property}">$1</span>$2`
  );
  return o = o.replace(/("(?:[^"\\]|\\.)*")/g, `<span style="color:${t.string}">$1</span>`), o = o.replace(/\b(true|false|null)\b/g, `<span style="color:${t.keyword}">$1</span>`), o = o.replace(/\b(-?\d+(?:\.\d+)?)\b/g, `<span style="color:${t.number}">$1</span>`), o;
}
function ve(e, t) {
  let o = e.replace(/(#.*?)(\n|$)/g, `<span style="color:${t.comment}">$1</span>$2`);
  o = o.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, `<span style="color:${t.string}">$1</span>`);
  const a = new RegExp(`\\b(${fe.join("|")})\\b`, "g");
  o = o.replace(a, `<span style="color:${t.keyword}">$1</span>`);
  const n = new RegExp(`\\b(${xe.join("|")})\\b`, "g");
  return o = o.replace(n, `<span style="color:${t.builtin}">$1</span>`), o = o.replace(/(\$\w+|\$\{[^}]+\})/g, `<span style="color:${t.variable}">$1</span>`), o;
}
const ge = {
  comment: "var(--color-neutral)",
  string: "#4ade80",
  keyword: "var(--color-state-pending)",
  number: "#fbbf24",
  property: "#7dd3fc",
  builtin: "#c4b5fd",
  variable: "#fbbf24"
}, ye = {
  comment: "var(--color-neutral)",
  string: "#15803d",
  keyword: "var(--color-info-fg)",
  number: "#a16207",
  property: "#0369a1",
  builtin: "var(--color-cat-ai)",
  variable: "#a16207"
};
function P(e, t, o) {
  const a = o === "dark" ? ge : ye, n = me(e);
  switch (t) {
    case "json":
      return be(n, a);
    case "bash":
    case "sh":
      return ve(n, a);
    case "text":
      return n;
    default:
      return he(n, a);
  }
}
function Lr({
  code: e,
  language: t = "tsx",
  theme: o = "dark",
  copyButton: a = !0,
  showLineNumbers: n = !1,
  className: l,
  style: s,
  "data-testid": d,
  ariaLabel: p
}) {
  const [f, v] = T(!1), w = $(() => {
    typeof navigator > "u" || !navigator.clipboard || navigator.clipboard.writeText(e).then(() => {
      v(!0), setTimeout(() => v(!1), 1500);
    }).catch(() => {
    });
  }, [e]), h = o === "dark", m = e.split(`
`);
  return /* @__PURE__ */ c(
    "div",
    {
      "data-testid": d,
      "data-language": t,
      "data-theme": o,
      className: u(
        "relative rounded-lg border font-mono text-[13px] leading-relaxed overflow-hidden",
        h ? "bg-surface-inverse text-text-inverse border-border-emphasis" : "bg-surface-panel text-text-primary border-border",
        l
      ),
      style: s,
      "aria-label": p ?? `Code (${t})`,
      children: [
        a && /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            onClick: w,
            "aria-label": f ? "Copied" : "Copy code",
            className: u(
              "absolute top-2 right-2 text-[11px] px-2 py-1 rounded border transition-opacity",
              h ? "bg-surface-inverse text-text-inverse border-border-emphasis hover:bg-neutral" : "bg-white text-text-primary border-border-emphasis hover:bg-surface-hover"
            ),
            "data-copied": f ? "true" : "false",
            children: f ? "Copied" : "Copy"
          }
        ),
        /* @__PURE__ */ r("pre", { className: "m-0 px-4 py-3 overflow-x-auto", children: n ? /* @__PURE__ */ c("div", { className: "flex", children: [
          /* @__PURE__ */ r(
            "div",
            {
              className: u(
                "select-none pr-3 text-right",
                h ? "text-neutral" : "text-text-tertiary"
              ),
              "aria-hidden": "true",
              children: m.map((x, i) => /* @__PURE__ */ r("div", { children: i + 1 }, i))
            }
          ),
          /* @__PURE__ */ r(
            "code",
            {
              className: "flex-1 block",
              dangerouslySetInnerHTML: { __html: P(e, t, o) }
            }
          )
        ] }) : /* @__PURE__ */ r(
          "code",
          {
            className: "block",
            dangerouslySetInnerHTML: { __html: P(e, t, o) }
          }
        ) })
      ]
    }
  );
}
const we = "cui:command-palette:recents", Ne = 5;
function ke(e, t) {
  if (!e || typeof window > "u") return [];
  try {
    const o = window.localStorage.getItem(e);
    if (!o) return [];
    const a = JSON.parse(o);
    return Array.isArray(a) ? a.filter((n) => typeof n == "string").slice(0, t) : [];
  } catch {
    return [];
  }
}
function Se(e, t) {
  if (!(!e || typeof window > "u"))
    try {
      window.localStorage.setItem(e, JSON.stringify(t));
    } catch {
    }
}
const q = Y(null);
function j() {
  const e = Z(q);
  if (!e)
    throw new Error(
      "useCommandPalette must be used inside a <CommandPaletteProvider>."
    );
  return e;
}
function Tr() {
  const { open: e, close: t, toggle: o, isOpen: a, query: n } = j();
  return { open: e, close: t, toggle: o, isOpen: a, query: n };
}
function Ce(e, t) {
  const o = t.toLowerCase().split("+").map((v) => v.trim()).filter(Boolean);
  if (o.length === 0) return !1;
  const a = o[o.length - 1], n = new Set(o.slice(0, -1)), l = n.has("cmd") || n.has("meta"), s = n.has("ctrl"), d = n.has("mod"), p = n.has("shift"), f = n.has("alt");
  if (d) {
    if (!e.metaKey && !e.ctrlKey) return !1;
  } else if (l !== e.metaKey || s !== e.ctrlKey) return !1;
  return p !== e.shiftKey || f !== e.altKey ? !1 : e.key.toLowerCase() === a;
}
function Ar({
  commands: e,
  getDynamicCommands: t,
  recentsKey: o = we,
  recentsLimit: a = Ne,
  children: n
}) {
  const [l, s] = T(!1), [d, p] = T(""), [f, v] = T(
    () => /* @__PURE__ */ new Map()
  ), [w, h] = T(
    () => ke(o, a)
  ), m = $(
    (S) => {
      o !== null && h((C) => {
        const E = [S, ...C.filter((V) => V !== S)].slice(
          0,
          a
        );
        return Se(o, E), E;
      });
    },
    [o, a]
  ), x = $(() => s(!0), []), i = $(() => {
    s(!1), p("");
  }, []), b = $(() => s((S) => !S), []), y = $((S) => {
    v((C) => {
      const E = new Map(C);
      return E.set(S.id, S), E;
    });
  }, []), N = $((S) => {
    v((C) => {
      if (!C.has(S)) return C;
      const E = new Map(C);
      return E.delete(S), E;
    });
  }, []);
  L(() => {
    const S = (C) => {
      (C.metaKey || C.ctrlKey) && C.key.toLowerCase() === "k" && (C.preventDefault(), s((E) => !E));
    };
    return window.addEventListener("keydown", S, !0), () => window.removeEventListener("keydown", S, !0);
  }, []);
  const g = O(() => {
    const S = t ? t(d) : [];
    return [...e ?? [], ...S, ...f.values()].filter((E) => E.when ? E.when() : !0);
  }, [e, t, d, f]), k = A(g);
  k.current = g, L(() => {
    const S = (C) => {
      if (!((C.metaKey || C.ctrlKey) && C.key.toLowerCase() === "k")) {
        for (const E of k.current)
          if (E.hotkey && Ce(C, E.hotkey)) {
            C.preventDefault(), Promise.resolve().then(() => E.run());
            return;
          }
      }
    };
    return window.addEventListener("keydown", S), () => window.removeEventListener("keydown", S);
  }, []);
  const D = {
    open: x,
    close: i,
    toggle: b,
    isOpen: l,
    query: d,
    setQuery: p,
    mergedCommands: g,
    registerCommand: y,
    unregisterCommand: N,
    recents: w,
    noteSelection: m
  };
  return /* @__PURE__ */ r(q.Provider, { value: D, children: n });
}
function Rr(e) {
  const { registerCommand: t, unregisterCommand: o } = j();
  L(() => (t(e), () => o(e.id)), [e, t, o]);
}
function Ee(e) {
  const t = /* @__PURE__ */ new Map();
  for (const o of e) {
    const a = o.group ?? null, n = t.get(a);
    n ? n.push(o) : t.set(a, [o]);
  }
  return Array.from(t.entries()).map(([o, a]) => ({
    groupName: o,
    items: a
  }));
}
function _r({
  placeholder: e = "Type a command or search…",
  emptyState: t,
  className: o
} = {}) {
  const {
    isOpen: a,
    close: n,
    query: l,
    setQuery: s,
    mergedCommands: d,
    recents: p,
    noteSelection: f
  } = j(), v = O(() => {
    if (l.trim() !== "" || p.length === 0) return [];
    const m = new Map(d.map((x) => [x.id, x]));
    return p.map((x) => m.get(x)).filter((x) => !!x);
  }, [d, l, p]), w = O(() => Ee(d), [d]), h = $(
    (m) => {
      f(m.id), n(), Promise.resolve().then(() => m.run());
    },
    [n, f]
  );
  return /* @__PURE__ */ r(
    U,
    {
      open: a,
      onClose: n,
      maxWidth: 640,
      rawChildren: !0,
      backdropTestId: "command-palette-backdrop",
      children: /* @__PURE__ */ c(
        R,
        {
          label: "Command palette",
          value: void 0,
          className: u("flex flex-col gap-0 w-full", o),
          "data-testid": "command-palette",
          children: [
            /* @__PURE__ */ r(
              R.Input,
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
            /* @__PURE__ */ c(R.List, { className: "max-h-[360px] overflow-y-auto py-2", children: [
              /* @__PURE__ */ r(R.Empty, { className: "px-3 py-6 text-center text-sm text-text-tertiary", children: t ?? "No results." }),
              v.length > 0 && /* @__PURE__ */ r(R.Group, { heading: "Recent", "data-testid": "command-palette-group-recent", children: v.map((m) => /* @__PURE__ */ c(
                R.Item,
                {
                  value: `recent-${m.id} ${m.label}`,
                  keywords: m.keywords,
                  onSelect: () => h(m),
                  "data-testid": `command-palette-recent-${m.id}`,
                  className: u(
                    "flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm",
                    "text-text-primary aria-selected:bg-surface-hover"
                  ),
                  children: [
                    m.icon && /* @__PURE__ */ r("span", { className: "shrink-0 text-text-secondary", children: m.icon }),
                    /* @__PURE__ */ r("span", { className: "flex-1 truncate", children: m.label })
                  ]
                },
                `recent-${m.id}`
              )) }),
              w.map(({ groupName: m, items: x }) => /* @__PURE__ */ r(
                R.Group,
                {
                  heading: m ?? void 0,
                  children: x.map((i) => /* @__PURE__ */ c(
                    R.Item,
                    {
                      value: `${i.id} ${i.label} ${(i.keywords ?? []).join(" ")}`,
                      keywords: i.keywords,
                      onSelect: () => h(i),
                      "data-testid": `command-palette-item-${i.id}`,
                      className: u(
                        "flex items-center gap-2 px-3 py-2 mx-1 rounded-md cursor-pointer text-sm",
                        "text-text-primary aria-selected:bg-surface-hover"
                      ),
                      children: [
                        i.icon && /* @__PURE__ */ r("span", { className: "shrink-0 text-text-secondary", children: i.icon }),
                        /* @__PURE__ */ r("span", { className: "flex-1 truncate", children: i.label }),
                        i.hint && /* @__PURE__ */ r("span", { className: "text-xs text-text-tertiary truncate", children: i.hint }),
                        i.shortcut && i.shortcut.length > 0 && /* @__PURE__ */ r("span", { className: "flex items-center gap-1 shrink-0", children: i.shortcut.map((b, y) => /* @__PURE__ */ r(
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
                          `${i.id}-kbd-${y}`
                        )) })
                      ]
                    },
                    i.id
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
function Or({ className: e } = {}) {
  const { toggle: t } = j();
  return /* @__PURE__ */ c(
    "button",
    {
      type: "button",
      onClick: t,
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
        /* @__PURE__ */ r("kbd", { className: "font-mono text-[11px]", children: "⌘K" }),
        /* @__PURE__ */ r("span", { children: "Search" })
      ]
    }
  );
}
const $e = "🔒";
function Dr({
  capabilityName: e,
  title: t,
  description: o,
  actionLabel: a,
  onAction: n,
  actions: l,
  icon: s,
  testId: d = "capability-denied-fallback"
}) {
  const p = t ?? (e ? `${e} is unavailable` : "Feature unavailable"), f = o ?? (e ? `${e} is not enabled for this workspace. Contact your administrator to request access.` : "This feature is not enabled for your account. Contact your administrator to request access.");
  return /* @__PURE__ */ r(
    ee,
    {
      icon: s === null ? void 0 : s ?? $e,
      title: p,
      description: f,
      actionLabel: a,
      onAction: n,
      actions: l,
      testId: d
    }
  );
}
function Mr({
  icon: e = "⚠️",
  title: t,
  body: o,
  description: a,
  actionLabel: n,
  onAction: l,
  action: s,
  testId: d = "error-state",
  actionTestId: p = "error-state-action"
}) {
  const f = a ?? o;
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
        e && (typeof e == "string" ? /* @__PURE__ */ r("div", { className: "text-[52px] mb-2", "aria-hidden": !0, children: e }) : /* @__PURE__ */ r("div", { className: "mb-2", children: e })),
        /* @__PURE__ */ r("div", { className: "text-[17px] font-semibold text-[var(--color-state-error,#dc2626)]", children: t }),
        f && /* @__PURE__ */ r("div", { className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal", children: f }),
        s ? /* @__PURE__ */ r("div", { className: "mt-2.5", children: s }) : n && l && /* @__PURE__ */ r(
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
            children: n
          }
        )
      ]
    }
  );
}
function jr({
  label: e = "Loading…",
  description: t,
  spinnerSize: o = "lg",
  spinnerColor: a,
  testId: n = "loading-state"
}) {
  return /* @__PURE__ */ c(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      "data-testid": n,
      className: u(
        "flex flex-col items-center justify-center min-h-[220px]",
        "text-text-secondary gap-3 p-8 font-[inherit]"
      ),
      children: [
        /* @__PURE__ */ r(re, { size: o, color: a, "aria-label": e }),
        /* @__PURE__ */ r("div", { className: "text-[15px] font-medium text-text-primary", children: e }),
        t && /* @__PURE__ */ r("div", { className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal", children: t })
      ]
    }
  );
}
const Le = [
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
function Br({ open: e, onClose: t }) {
  return /* @__PURE__ */ c(
    U,
    {
      open: e,
      onClose: t,
      title: "Keyboard shortcuts",
      maxWidth: 560,
      cardStyle: { maxHeight: "85vh", display: "flex", flexDirection: "column" },
      rawChildren: !0,
      children: [
        /* @__PURE__ */ r("div", { className: "text-base font-semibold text-text-primary mb-2.5", children: "Keyboard shortcuts" }),
        /* @__PURE__ */ r("div", { className: "overflow-y-auto pr-1", children: Le.map((o, a) => /* @__PURE__ */ c("div", { children: [
          /* @__PURE__ */ r(
            "div",
            {
              className: u(
                "text-[12px] font-bold text-text-primary uppercase tracking-[0.05em] mb-1.5",
                a === 0 ? "mt-0 pt-0" : "mt-4 pt-1.5 border-t border-border-subtle"
              ),
              children: o.title
            }
          ),
          /* @__PURE__ */ r("div", { children: o.rows.map((n, l) => /* @__PURE__ */ c(
            "div",
            {
              className: "flex items-baseline justify-between py-1 text-[13px] gap-4",
              children: [
                /* @__PURE__ */ r("span", { className: "font-mono text-[12px] text-text-primary bg-surface-hover border border-border rounded px-1.5 py-px whitespace-nowrap shrink-0", children: n.keys }),
                /* @__PURE__ */ r("span", { className: "text-neutral text-right flex-1", children: n.action })
              ]
            },
            `${o.title}-${l}`
          )) })
        ] }, o.title)) }),
        /* @__PURE__ */ r("div", { className: "flex justify-end mt-[18px]", children: /* @__PURE__ */ r(
          "button",
          {
            onClick: t,
            className: "py-1.5 px-3.5 text-[13px] font-semibold border border-border rounded-md bg-white text-text-primary cursor-pointer font-[inherit]",
            children: "Close"
          }
        ) })
      ]
    }
  );
}
const Te = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm"
};
function Ae(e) {
  switch (e) {
    case "underline":
      return "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
    case "pill":
      return "inline-flex items-center gap-1";
    case "segmented":
      return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5";
  }
}
function Re(e, t, o) {
  return e === "underline" ? u(
    "-mb-px border-b-2 rounded-none",
    t ? "border-[var(--color-primary)] text-[var(--color-text-primary)]" : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
    o && "opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]"
  ) : e === "pill" ? u(
    "rounded-full",
    t ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]",
    o && "opacity-50 cursor-not-allowed hover:bg-transparent"
  ) : u(
    "rounded-md",
    t ? "bg-white shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]",
    o && "opacity-50 cursor-not-allowed hover:bg-transparent"
  );
}
function Pr({
  items: e,
  value: t,
  onValueChange: o,
  variant: a = "underline",
  size: n = "md",
  className: l,
  style: s,
  "aria-label": d,
  idPrefix: p
}) {
  const f = Q(), v = p ?? f, w = A(/* @__PURE__ */ new Map()), h = O(() => e.filter((i) => !i.disabled).map((i) => i.id), [e]), m = $((i) => {
    w.current.get(i)?.focus();
  }, []), x = $(
    (i, b) => {
      if (h.length === 0) return;
      const y = h.indexOf(b);
      let N = null;
      switch (i.key) {
        case "ArrowRight":
        case "ArrowDown":
          N = y === -1 ? 0 : (y + 1) % h.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          N = y === -1 ? h.length - 1 : (y - 1 + h.length) % h.length;
          break;
        case "Home":
          N = 0;
          break;
        case "End":
          N = h.length - 1;
          break;
        case "Enter":
        case " ":
          i.preventDefault(), o(b);
          return;
        default:
          return;
      }
      if (N !== null) {
        i.preventDefault();
        const g = h[N];
        o(g), m(g);
      }
    },
    [h, o, m]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      role: "tablist",
      "aria-label": d,
      className: u(Ae(a), l),
      style: s,
      children: e.map((i) => {
        const b = i.id === t;
        return /* @__PURE__ */ c(
          "button",
          {
            ref: (y) => {
              y ? w.current.set(i.id, y) : w.current.delete(i.id);
            },
            type: "button",
            role: "tab",
            id: `${v}-tab-${i.id}`,
            "aria-controls": `${v}-panel-${i.id}`,
            "aria-selected": b,
            "aria-disabled": i.disabled || void 0,
            tabIndex: b ? 0 : -1,
            disabled: i.disabled,
            onClick: () => !i.disabled && o(i.id),
            onKeyDown: (y) => x(y, i.id),
            className: u(
              "inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer",
              Te[n],
              Re(a, b, !!i.disabled)
            ),
            children: [
              i.icon,
              /* @__PURE__ */ r("span", { children: i.label }),
              i.badge !== void 0 && i.badge !== null && /* @__PURE__ */ r(
                "span",
                {
                  className: u(
                    "ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold",
                    b && a === "pill" ? "bg-white/20 text-white" : "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"
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
function Ir({ id: e, when: t, idPrefix: o, className: a, style: n, children: l }) {
  return e !== t ? null : /* @__PURE__ */ r(
    "div",
    {
      role: "tabpanel",
      id: o ? `${o}-panel-${e}` : void 0,
      "aria-labelledby": o ? `${o}-tab-${e}` : void 0,
      tabIndex: 0,
      className: a,
      style: n,
      children: l
    }
  );
}
const _e = {
  positive: "text-[var(--color-success)]",
  negative: "text-[var(--color-danger)]",
  neutral: "text-[var(--color-text-secondary)]"
};
function Oe(e) {
  return e.tone ?? (e.direction === "up" ? "positive" : "negative");
}
function Kr({
  label: e,
  value: t,
  accent: o = !1,
  danger: a = !1,
  hint: n,
  delta: l,
  sparklineData: s,
  to: d,
  as: p,
  onClick: f,
  mono: v = !1,
  className: w,
  style: h,
  "data-testid": m
}) {
  const x = u(
    "block rounded-lg border p-3 no-underline transition-colors",
    !o && !a && "bg-[var(--color-surface)] border-[var(--color-border)]",
    o && "bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]",
    a && "bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]",
    (d || f) && "hover:bg-[var(--color-surface-hover)] cursor-pointer",
    w
  ), i = s && s.length > 0 ? s : null;
  let b = null;
  if (l) {
    const N = Oe(l), g = l.direction === "up" ? "▲" : "▼", k = l.direction === "up" ? "+" : "-", D = l.suffix ?? "%", S = Math.abs(l.value), C = l["aria-label"] ?? `${l.direction} ${S}${D}`;
    b = /* @__PURE__ */ c(
      "div",
      {
        "data-testid": "stat-card-delta",
        "data-direction": l.direction,
        "data-tone": N,
        "aria-label": C,
        className: u("mt-1 text-[12px] font-medium leading-tight", _e[N]),
        children: [
          /* @__PURE__ */ c("span", { "aria-hidden": "true", children: [
            g,
            " "
          ] }),
          k,
          S,
          D
        ]
      }
    );
  }
  const y = /* @__PURE__ */ c(_, { children: [
    /* @__PURE__ */ r("div", { className: "text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]", children: e }),
    /* @__PURE__ */ c("div", { className: "mt-1 flex items-center gap-2", children: [
      /* @__PURE__ */ r(
        "div",
        {
          className: u(
            "text-[24px] font-bold leading-tight text-[var(--color-text-primary)]",
            v && "font-mono"
          ),
          children: t
        }
      ),
      i && /* @__PURE__ */ r(te, { data: i, width: 80, height: 20 })
    ] }),
    b,
    n != null && /* @__PURE__ */ r("div", { className: "mt-1 text-[11px] italic text-[var(--color-text-tertiary)]", children: n })
  ] });
  return d ? p ? /* @__PURE__ */ r(p, { to: d, "data-testid": m, className: x, style: h, children: y }) : /* @__PURE__ */ r("a", { href: d, "data-testid": m, className: x, style: h, children: y }) : f ? /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      onClick: f,
      "data-testid": m,
      className: u(x, "w-full text-left"),
      style: h,
      children: y
    }
  ) : /* @__PURE__ */ r("div", { "data-testid": m, className: x, style: h, children: y });
}
const De = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4"
};
function Fr({
  children: e,
  columns: t = 4,
  dense: o = !1,
  className: a,
  style: n,
  "data-testid": l = "kpi-grid"
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-testid": l,
      className: u(
        "grid grid-cols-1",
        De[t],
        o ? "gap-2" : "gap-4",
        a
      ),
      style: n,
      children: e
    }
  );
}
const Me = {
  sm: "h-1.5",
  md: "h-2"
};
function Hr({
  value: e,
  max: t = 100,
  color: o,
  size: a = "md",
  label: n,
  showRatio: l = !0,
  className: s,
  style: d,
  "data-testid": p,
  "aria-label": f
}) {
  const v = t > 0 ? t : 100, w = Math.max(0, Math.min(e, v)), h = Math.min(100, w / v * 100), m = o ?? "var(--color-primary)";
  return /* @__PURE__ */ c("div", { "data-testid": p, className: u("w-full", s), style: d, children: [
    n != null && /* @__PURE__ */ c("div", { className: "flex items-center justify-between mb-1 text-[12px] text-[var(--color-text-secondary)]", children: [
      /* @__PURE__ */ r("span", { children: n }),
      /* @__PURE__ */ r("span", { className: "text-[var(--color-text-tertiary)] tabular-nums", children: l ? `${w}/${v}` : `${Math.round(h)}%` })
    ] }),
    /* @__PURE__ */ r(
      "div",
      {
        role: "progressbar",
        "aria-valuenow": w,
        "aria-valuemin": 0,
        "aria-valuemax": v,
        "aria-label": f,
        className: u(
          "w-full rounded-full overflow-hidden bg-[var(--color-surface-hover)]",
          Me[a]
        ),
        children: /* @__PURE__ */ r(
          "div",
          {
            className: "h-full rounded-full transition-all duration-300",
            style: { width: `${h}%`, background: m }
          }
        )
      }
    )
  ] });
}
const je = {
  online: "var(--color-success, #22c55e)",
  away: "var(--color-state-pending, #f59e0b)",
  busy: "var(--color-state-error, #ef4444)",
  offline: "var(--color-text-tertiary, #94a3b8)",
  unknown: "var(--color-text-tertiary, #94a3b8)"
}, Be = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
  unknown: "Unknown presence"
};
function Pe({
  state: e,
  ariaLabel: t,
  label: o,
  pulse: a,
  size: n = "sm",
  className: l,
  style: s,
  title: d,
  "data-testid": p
}) {
  const f = a ?? e === "online", v = t ?? Be[e];
  return /* @__PURE__ */ r(
    G,
    {
      color: je[e],
      pulse: f,
      size: n,
      label: o,
      className: l,
      style: s,
      title: d,
      "data-testid": p ?? `presence-${e}`,
      "aria-label": v
    }
  );
}
function zr({
  name: e,
  label: t,
  avatarSize: o = 20,
  avatarColor: a,
  presence: n,
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
        /* @__PURE__ */ r(B, { name: e, size: o, color: a }),
        /* @__PURE__ */ r("span", { className: "font-medium leading-none", children: t ?? e }),
        n && /* @__PURE__ */ r(Pe, { state: n, size: "xs" })
      ]
    }
  );
}
const Ie = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm"
}, Ke = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", Fe = "bg-white shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]";
function Ur({
  options: e,
  value: t,
  onChange: o,
  size: a = "md",
  className: n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      role: "group",
      className: u(
        "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5",
        n
      ),
      children: e.map((l) => {
        const s = l.value === t;
        return /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            onClick: () => o(l.value),
            "aria-pressed": s,
            className: u(
              "inline-flex items-center gap-1.5 rounded-md font-medium transition-all cursor-pointer",
              Ie[a],
              s ? Fe : Ke
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
function Gr({
  label: e,
  id: t,
  href: o,
  mono: a = !1,
  className: n,
  labelClassName: l
}) {
  const s = /* @__PURE__ */ r("span", { className: "truncate", children: e });
  return /* @__PURE__ */ c("div", { className: u("flex flex-col min-w-0", n), children: [
    /* @__PURE__ */ r(
      "div",
      {
        className: u(
          "font-medium text-[var(--color-text-primary)] truncate text-sm",
          l
        ),
        children: o ? /* @__PURE__ */ r(
          "a",
          {
            href: o,
            className: "hover:text-[var(--color-primary)] hover:underline",
            children: s
          }
        ) : s
      }
    ),
    t && /* @__PURE__ */ r(
      "div",
      {
        className: u(
          "text-[10px] font-mono text-[var(--color-text-tertiary)] truncate mt-0.5",
          a && "tracking-tight"
        ),
        children: t
      }
    )
  ] });
}
const He = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function Wr({
  open: e,
  onClose: t,
  title: o,
  subtitle: a,
  width: n = 460,
  children: l,
  footer: s,
  "data-testid": d
}) {
  const p = A(null);
  return L(() => {
    if (!e) return;
    const f = (v) => {
      v.key === "Escape" && t();
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [e, t]), L(() => {
    if (!e) return;
    const f = p.current;
    if (!f) return;
    const v = f.querySelector(He);
    v ? v.focus() : (f.setAttribute("tabindex", "-1"), f.focus());
  }, [e]), e ? W(
    /* @__PURE__ */ c("div", { className: "fixed inset-0 z-[9000]", "data-testid": d, children: [
      /* @__PURE__ */ r(
        "div",
        {
          className: "absolute inset-0 bg-black/30 backdrop-blur-[1px]",
          onClick: t,
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ c(
        "aside",
        {
          ref: p,
          role: "dialog",
          "aria-modal": "true",
          "aria-label": o,
          className: u(
            "absolute right-0 top-0 h-full bg-white shadow-xl flex flex-col",
            "transition-transform duration-200",
            e ? "translate-x-0" : "translate-x-full"
          ),
          style: { width: n },
          children: [
            /* @__PURE__ */ c("div", { className: "flex items-start justify-between p-5 border-b border-[var(--color-border)] flex-shrink-0", children: [
              /* @__PURE__ */ c("div", { className: "min-w-0", children: [
                o && /* @__PURE__ */ r("h2", { className: "text-base font-semibold text-[var(--color-text-primary)]", children: o }),
                a && /* @__PURE__ */ r("p", { className: "text-sm text-[var(--color-text-secondary)] mt-0.5", children: a })
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
function ze(e, t) {
  if (!e || typeof window > "u") return t;
  try {
    const o = window.localStorage.getItem(e);
    return o === null ? t : o === "true";
  } catch {
    return t;
  }
}
function qr({
  title: e,
  defaultOpen: t = !1,
  badge: o,
  children: a,
  className: n,
  storageKey: l
}) {
  const [s, d] = T(
    () => ze(l, t)
  );
  return L(() => {
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
        n
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
              /* @__PURE__ */ r("span", { className: "text-sm font-semibold text-[var(--color-text-primary)]", children: e }),
              /* @__PURE__ */ c("div", { className: "flex items-center gap-2", children: [
                o,
                /* @__PURE__ */ r(
                  "svg",
                  {
                    className: u(
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
        s && /* @__PURE__ */ r("div", { className: "border-t border-[var(--color-border)] bg-white", children: a })
      ]
    }
  );
}
function Jr({
  value: e,
  onChange: t,
  placeholder: o,
  onClear: a,
  className: n,
  style: l,
  autoFocus: s,
  "aria-label": d
}) {
  return /* @__PURE__ */ c(
    "div",
    {
      className: u("relative inline-flex items-center", n),
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
            onChange: (p) => t(p.target.value),
            placeholder: o ?? "Search…",
            autoFocus: s,
            "aria-label": d,
            className: "w-full pl-8 pr-7 py-1.5 text-sm rounded-md border border-[var(--color-border-field,#d1d5db)] bg-white text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors"
          }
        ),
        e && /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            onClick: () => {
              t(""), a?.();
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
const Ue = {
  error: "bg-[var(--color-danger-bg,#fef2f2)] border-[var(--color-danger,#dc2626)] text-[var(--color-danger,#dc2626)]",
  success: "bg-[var(--color-success-bg,#f0fdf4)] border-[var(--color-success,#16a34a)] text-[var(--color-success,#16a34a)]",
  info: "bg-[var(--color-info-bg,#eff6ff)] border-[var(--color-info,#2563eb)] text-[var(--color-info,#2563eb)]",
  warning: "bg-[var(--color-warning-bg,#fffbeb)] border-[var(--color-warning,#f59e0b)] text-[var(--color-warning,#f59e0b)]"
};
function Vr({ tone: e, children: t, onDismiss: o, className: a }) {
  return /* @__PURE__ */ c(
    "div",
    {
      role: e === "error" || e === "warning" ? "alert" : "status",
      "aria-live": e === "error" || e === "warning" ? "assertive" : "polite",
      className: u(
        "flex items-start gap-2 px-3 py-2 rounded-md border-l-[3px] text-sm",
        Ue[e],
        a
      ),
      children: [
        /* @__PURE__ */ r("span", { className: "flex-1", children: t }),
        o && /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            onClick: o,
            "aria-label": "Dismiss",
            className: "flex-shrink-0 opacity-70 hover:opacity-100",
            children: "✕"
          }
        )
      ]
    }
  );
}
function Yr({
  title: e,
  description: t,
  actions: o,
  back: a,
  badge: n,
  className: l
}) {
  return /* @__PURE__ */ c("div", { className: u("flex flex-col gap-1.5", l), children: [
    a && /* @__PURE__ */ c(
      "a",
      {
        href: a.to,
        onClick: a.onClick,
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
          a.label
        ]
      }
    ),
    /* @__PURE__ */ c("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ c("div", { className: "min-w-0 flex items-center gap-2.5", children: [
        /* @__PURE__ */ r("h1", { className: "text-xl font-semibold text-[var(--color-text-primary)] leading-tight", children: e }),
        n
      ] }),
      o && /* @__PURE__ */ r("div", { className: "flex-shrink-0 flex items-center gap-2", children: o })
    ] }),
    t && /* @__PURE__ */ r("p", { className: "text-sm text-[var(--color-text-secondary)]", children: t })
  ] });
}
function M({ size: e = "md", color: t, className: o }) {
  const a = e === "sm" ? 4 : 6, n = t || "var(--color-text-tertiary, #94a3b8)";
  return /* @__PURE__ */ c(_, { children: [
    /* @__PURE__ */ r("style", { children: `
        @keyframes thinkDot {
          0%, 80%, 100% { transform: scale(1); opacity: 0.4; }
          40% { transform: scale(1.3); opacity: 1; }
        }
      ` }),
    /* @__PURE__ */ r("span", { className: u("inline-flex items-center gap-1", o), children: [0, 1, 2].map((l) => /* @__PURE__ */ r(
      "span",
      {
        style: {
          width: a,
          height: a,
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
function Ge(e) {
  if (e.length === 0) return "";
  if (e.length === 1) return `${e[0]} is typing…`;
  if (e.length === 2) return `${e[0]} and ${e[1]} are typing…`;
  const t = e.length - 2;
  return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing…`;
}
function Zr({
  names: e,
  compact: t = !1,
  color: o,
  size: a = "sm",
  className: n,
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
        n
      ),
      children: [
        /* @__PURE__ */ r(M, { size: a, color: o }),
        !t && /* @__PURE__ */ r("span", { children: Ge(e) })
      ]
    }
  );
}
const I = {
  debug: "DEBUG",
  info: "INFO",
  warn: "WARN",
  error: "ERROR"
}, We = {
  debug: "text-[var(--color-text-tertiary)]",
  info: "text-[var(--color-info,#3b82f6)]",
  warn: "text-[var(--color-warning,#d97706)]",
  error: "text-[var(--color-danger,#dc2626)]"
};
function qe({
  lines: e,
  follow: t = !0,
  showTimestamp: o = !0,
  showLevel: a = !0,
  showSource: n = !0,
  title: l = "Log stream",
  headerSlot: s,
  emptyMessage: d = "No log lines yet.",
  maxHeight: p,
  onClear: f,
  className: v,
  style: w,
  "data-testid": h = "log-stream"
}) {
  const m = A(null), [x, i] = T(!1);
  L(() => {
    if (!t || x) return;
    const g = m.current;
    g && (g.scrollTop = g.scrollHeight);
  }, [e, t, x]);
  const b = () => {
    const g = m.current;
    if (!g) return;
    const k = g.scrollHeight - g.scrollTop - g.clientHeight < 24;
    i(!k);
  }, y = () => {
    const g = m.current;
    g && (g.scrollTop = g.scrollHeight, i(!1));
  }, N = /* @__PURE__ */ c("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ c(
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
    f && /* @__PURE__ */ r(
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
  return /* @__PURE__ */ c(
    ne,
    {
      "data-testid": h,
      className: u("flex flex-col", v),
      style: w,
      children: [
        l !== null && /* @__PURE__ */ r("div", { className: "px-4 py-3 border-b border-[var(--color-border)]", children: /* @__PURE__ */ r(oe, { title: l, meta: s ?? N }) }),
        /* @__PURE__ */ c("div", { className: "relative flex-1 min-h-0 flex", children: [
          /* @__PURE__ */ r(
            "div",
            {
              ref: m,
              onScroll: b,
              role: "log",
              "aria-live": t ? "polite" : "off",
              "data-testid": `${h}-scroll`,
              className: u(
                "flex-1 overflow-y-auto",
                "font-mono text-[12px] leading-[1.55]",
                "bg-[var(--color-surface-subtle,#0b1020)] text-[var(--color-text-primary,#e5e7eb)]",
                "py-2"
              ),
              style: { maxHeight: p },
              children: e.length === 0 ? /* @__PURE__ */ r(
                "div",
                {
                  "data-testid": `${h}-empty`,
                  className: "px-3 py-6 text-center text-[11px] text-[var(--color-text-tertiary)]",
                  children: d
                }
              ) : e.map((g) => {
                const k = g.level ?? "info";
                return /* @__PURE__ */ c(
                  "div",
                  {
                    role: "listitem",
                    "data-testid": `${h}-line`,
                    "data-level": g.level || void 0,
                    className: "flex items-baseline gap-2 px-3 hover:bg-[var(--color-surface,rgba(255,255,255,0.04))]",
                    children: [
                      o && g.timestamp && /* @__PURE__ */ r("span", { className: "shrink-0 text-[var(--color-text-tertiary)] tabular-nums", children: g.timestamp }),
                      a && g.level && /* @__PURE__ */ r(
                        "span",
                        {
                          className: u(
                            "shrink-0 font-semibold uppercase text-[10px] w-[44px]",
                            We[k]
                          ),
                          "aria-label": `level ${I[k].toLowerCase()}`,
                          children: I[k]
                        }
                      ),
                      n && g.source && /* @__PURE__ */ c("span", { className: "shrink-0 text-[var(--color-text-secondary)]", children: [
                        "[",
                        g.source,
                        "]"
                      ] }),
                      /* @__PURE__ */ r("span", { className: "flex-1 whitespace-pre-wrap break-words", children: g.message })
                    ]
                  },
                  g.id
                );
              })
            }
          ),
          t && x && /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              "data-testid": `${h}-jump`,
              onClick: y,
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
const Qr = qe;
function Xr({
  title: e,
  description: t,
  category: o,
  categoryTone: a = "neutral",
  thumbnail: n,
  icon: l = "🧩",
  thumbnailHeight: s = 160,
  href: d,
  onClick: p,
  badge: f,
  meta: v,
  className: w,
  style: h,
  "data-testid": m = "thumbnail-card"
}) {
  const i = u(
    "group block w-full text-left bg-[var(--color-surface,#fff)]",
    "rounded-xl border border-[var(--color-border)] overflow-hidden",
    "transition-[box-shadow,transform] duration-150",
    (d || p) && "cursor-pointer hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:-translate-y-0.5",
    w
  ), b = /* @__PURE__ */ c(_, { children: [
    /* @__PURE__ */ c(
      "div",
      {
        "data-testid": `${m}-thumb`,
        className: u(
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
              "data-testid": `${m}-badge`,
              className: "absolute top-2 right-2",
              children: f
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c("div", { className: "px-4 py-3", children: [
      /* @__PURE__ */ c("div", { className: "flex items-center gap-2 mb-1.5", children: [
        o && /* @__PURE__ */ r(le, { tone: a, size: "xs", "data-testid": `${m}-category`, children: o }),
        v && /* @__PURE__ */ r("span", { className: "ml-auto", children: v })
      ] }),
      /* @__PURE__ */ r("div", { className: "text-[14px] font-semibold text-[var(--color-text-primary)] leading-snug", children: e }),
      t && /* @__PURE__ */ r("div", { className: "mt-1 text-[12px] text-[var(--color-text-secondary)] leading-snug", children: t })
    ] })
  ] });
  return d ? /* @__PURE__ */ r(
    "a",
    {
      href: d,
      onClick: p,
      "data-testid": m,
      className: u(i, "no-underline text-inherit"),
      style: h,
      children: b
    }
  ) : p ? /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      onClick: p,
      "data-testid": m,
      className: u(i, "font-inherit"),
      style: h,
      children: b
    }
  ) : /* @__PURE__ */ r("div", { "data-testid": m, className: i, style: h, children: b });
}
const Je = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
};
function et({
  children: e,
  columns: t = 3,
  dense: o = !1,
  className: a,
  style: n,
  "data-testid": l = "catalog-grid"
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-testid": l,
      "data-columns": t,
      className: u(
        "grid grid-cols-1",
        Je[t],
        o ? "gap-3" : "gap-5",
        a
      ),
      style: n,
      children: e
    }
  );
}
function Ve({
  orientation: e,
  variant: t
}) {
  if (t === "none") return null;
  const o = e === "vertical", a = t === "arrow" ? o ? "↓" : "→" : o ? "│" : "─";
  return /* @__PURE__ */ r(
    "div",
    {
      "data-testid": "stack-diagram-connector",
      "aria-hidden": !0,
      className: u(
        "flex items-center justify-center text-[var(--color-text-tertiary)]",
        o ? "h-5 text-base" : "w-5 text-base"
      ),
      children: a
    }
  );
}
function Ye({
  layers: e,
  orientation: t = "vertical",
  connector: o = "arrow",
  className: a,
  style: n,
  "data-testid": l = "stack-diagram"
}) {
  const s = t === "vertical";
  return /* @__PURE__ */ r(
    "div",
    {
      "data-testid": l,
      "data-orientation": t,
      "data-connector": o,
      className: u(
        "flex",
        s ? "flex-col items-stretch" : "flex-row items-stretch flex-wrap",
        a
      ),
      style: n,
      children: e.map((d, p) => {
        const f = se(d.tone ?? "neutral");
        return /* @__PURE__ */ c("div", { className: u("flex", "flex-col"), children: [
          /* @__PURE__ */ c(
            "div",
            {
              "data-testid": "stack-diagram-layer",
              "data-tone": f,
              className: u(
                "rounded-md border px-3 py-2",
                de[f],
                ce[f],
                !s && "min-w-[140px]"
              ),
              children: [
                /* @__PURE__ */ c("div", { className: "flex items-center gap-2", children: [
                  d.icon != null && /* @__PURE__ */ r("span", { className: "shrink-0 text-[14px] leading-none", "aria-hidden": !0, children: d.icon }),
                  /* @__PURE__ */ r("span", { className: u("text-[12px] font-semibold", ie[f]), children: d.label }),
                  d.meta != null && /* @__PURE__ */ r("span", { className: "ml-auto text-[10px] text-[var(--color-text-tertiary)] shrink-0", children: d.meta })
                ] }),
                d.description != null && /* @__PURE__ */ r("div", { className: "mt-0.5 text-[11px] leading-snug text-[var(--color-text-secondary)]", children: d.description })
              ]
            }
          ),
          p < e.length - 1 && /* @__PURE__ */ r(Ve, { orientation: t, variant: o })
        ] }, d.id);
      })
    }
  );
}
const rt = Ye;
function tt({
  value: e,
  onChange: t,
  onSubmit: o,
  disabled: a = !1,
  multiline: n = !1,
  placeholder: l,
  submitLabel: s = "→",
  className: d,
  style: p,
  autoFocus: f,
  maxRows: v = 4
}) {
  const w = !a && e.trim().length > 0, h = () => {
    w && o();
  }, m = (i) => {
    if (i.key === "Enter") {
      if (n && i.shiftKey) return;
      i.preventDefault(), h();
    }
  }, x = u(
    "flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--color-border-field,#d1d5db)] bg-white text-[var(--color-text-primary)]",
    "placeholder:text-[var(--color-text-tertiary)]",
    "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent",
    "resize-none",
    a && "opacity-50 cursor-not-allowed bg-[var(--color-surface-hover)]"
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
        n ? /* @__PURE__ */ r(
          "textarea",
          {
            className: x,
            value: e,
            onChange: (i) => t(i.target.value),
            onKeyDown: m,
            disabled: a,
            placeholder: l,
            autoFocus: f,
            rows: 2,
            style: { maxHeight: `${v * 1.5 + 1}rem`, overflowY: "auto" }
          }
        ) : /* @__PURE__ */ r(
          "input",
          {
            type: "text",
            className: x,
            value: e,
            onChange: (i) => t(i.target.value),
            onKeyDown: m,
            disabled: a,
            placeholder: l,
            autoFocus: f
          }
        ),
        /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            onClick: h,
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
function Ze({ name: e, done: t, className: o }) {
  return /* @__PURE__ */ c(
    "span",
    {
      className: u(
        "inline-flex items-center gap-1 text-[10.5px] font-mono px-2 py-0.5 rounded-full",
        t ? "bg-[var(--color-success-bg,#f0fdf4)] text-[var(--color-success,#16a34a)]" : "bg-[var(--color-info-bg,#eff6ff)] text-[var(--color-info,#1d4ed8)]",
        o
      ),
      children: [
        e,
        t ? " ✓" : "…"
      ]
    }
  );
}
function Qe({ toolCalls: e, className: t }) {
  return /* @__PURE__ */ r("div", { className: u("flex flex-wrap gap-1.5 py-1", t), children: e.map((o) => /* @__PURE__ */ r(Ze, { name: o.name, done: o.done }, o.id)) });
}
function ot({
  role: e,
  content: t,
  toolCalls: o,
  streaming: a = !1,
  agentName: n,
  userName: l,
  renderMarkdown: s,
  className: d
}) {
  const p = e === "user" ? l || "You" : n || "Assistant";
  return /* @__PURE__ */ c("div", { className: u("flex flex-col gap-1.5 py-3", d), children: [
    /* @__PURE__ */ r("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]", children: p }),
    o && o.length > 0 && /* @__PURE__ */ r(Qe, { toolCalls: o }),
    e === "user" ? /* @__PURE__ */ r("div", { className: "text-sm text-[var(--color-text-primary)] whitespace-pre-wrap", children: t }) : /* @__PURE__ */ r("div", { className: "text-sm text-[var(--color-text-primary)] prose-sm max-w-none", children: t ? s ? s(t) : /* @__PURE__ */ r("span", { className: "whitespace-pre-wrap", children: t }) : a ? /* @__PURE__ */ r(M, {}) : null })
  ] });
}
function at({
  content: e,
  streaming: t = !1,
  defaultOpen: o = !1,
  className: a
}) {
  const l = t || !e ? "Thinking" : "Thought";
  return /* @__PURE__ */ c(
    "details",
    {
      open: o,
      className: u(
        "rounded-md border border-[var(--color-border)] overflow-hidden text-sm group",
        a
      ),
      children: [
        /* @__PURE__ */ c("summary", { className: "flex items-center gap-2 px-3 py-2 cursor-pointer select-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] list-none", children: [
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
          t && !e && /* @__PURE__ */ r(M, { size: "sm" })
        ] }),
        /* @__PURE__ */ r("div", { className: "px-3 py-2 text-xs text-[var(--color-text-secondary)] italic border-t border-[var(--color-border)] bg-white whitespace-pre-wrap leading-relaxed", children: e || /* @__PURE__ */ r(M, {}) })
      ]
    }
  );
}
function nt({
  prompts: e,
  onSelect: t,
  columns: o,
  title: a,
  className: n
}) {
  const l = o ? `repeat(${o}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(220px, 1fr))";
  return /* @__PURE__ */ c("div", { className: u("flex flex-col gap-3", n), children: [
    a && /* @__PURE__ */ r("p", { className: "text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] text-center", children: a }),
    /* @__PURE__ */ r("div", { style: { display: "grid", gridTemplateColumns: l, gap: 10 }, children: e.map((s, d) => /* @__PURE__ */ c(
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
      d
    )) })
  ] });
}
function lt({
  suggestions: e,
  onSelect: t,
  onRefresh: o,
  label: a,
  className: n
}) {
  return /* @__PURE__ */ c("div", { className: u("flex items-center flex-wrap gap-1.5 py-2", n), children: [
    a && /* @__PURE__ */ r("span", { className: "text-xs text-[var(--color-text-tertiary)] mr-1", children: a }),
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
    o && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: o,
        className: "inline-flex items-center justify-center w-7 h-7 rounded-full border border-[var(--color-border)] text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] transition-colors text-base",
        title: "Refresh suggestions",
        children: "↻"
      }
    )
  ] });
}
function st({
  name: e,
  memberCount: t,
  description: o,
  actions: a,
  avatarUrl: n,
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
            n ? /* @__PURE__ */ r(
              "img",
              {
                src: n,
                alt: e,
                className: "w-9 h-9 rounded-full object-cover"
              }
            ) : /* @__PURE__ */ r(B, { name: e, size: 36 }),
            l !== void 0 && /* @__PURE__ */ r("span", { className: "absolute -bottom-0.5 -right-0.5", children: /* @__PURE__ */ r(
              G,
              {
                color: l ? "var(--color-success)" : "var(--color-text-tertiary)",
                size: "sm",
                "aria-label": l ? "Online" : "Offline"
              }
            ) })
          ] }),
          /* @__PURE__ */ c("div", { className: "min-w-0 flex flex-col gap-0.5", children: [
            /* @__PURE__ */ c("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ r("h2", { className: "text-[15px] font-semibold text-[var(--color-text-primary)] leading-tight truncate", children: e }),
              t !== void 0 && /* @__PURE__ */ c(
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
                    t,
                    " ",
                    t === 1 ? "member" : "members"
                  ]
                }
              )
            ] }),
            o && /* @__PURE__ */ r("p", { className: "text-[12px] text-[var(--color-text-tertiary)] truncate leading-tight", children: o })
          ] })
        ] }),
        a && /* @__PURE__ */ r("div", { className: "flex items-center gap-2 shrink-0", children: a })
      ]
    }
  );
}
function it({ user: e, items: t, className: o, "data-testid": a }) {
  const [n, l] = T(!1), s = A(null), d = $(() => l(!1), []);
  return L(() => {
    if (!n) return;
    const p = (f) => {
      s.current && !s.current.contains(f.target) && d();
    };
    return document.addEventListener("mousedown", p), () => document.removeEventListener("mousedown", p);
  }, [n, d]), L(() => {
    if (!n) return;
    const p = (f) => {
      f.key === "Escape" && d();
    };
    return document.addEventListener("keydown", p), () => document.removeEventListener("keydown", p);
  }, [n, d]), /* @__PURE__ */ c(
    "div",
    {
      ref: s,
      "data-testid": a,
      className: u("relative inline-block", o),
      children: [
        /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            "aria-label": `User menu for ${e.name}`,
            "aria-expanded": n,
            "aria-haspopup": "menu",
            onClick: () => l((p) => !p),
            className: u(
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
              ) : /* @__PURE__ */ r(B, { name: e.name, size: 32 }),
              /* @__PURE__ */ c("div", { className: "flex flex-col items-start text-left min-w-0 hidden sm:flex", children: [
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
                  className: u(
                    "text-[var(--color-text-tertiary)] transition-transform duration-150",
                    n ? "rotate-180" : "rotate-0"
                  ),
                  children: /* @__PURE__ */ r("path", { d: "M2 4l4 4 4-4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
                }
              )
            ]
          }
        ),
        n && /* @__PURE__ */ c(
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
                /* @__PURE__ */ r("p", { className: "text-sm font-semibold text-[var(--color-text-primary)] truncate", children: e.name }),
                /* @__PURE__ */ r("p", { className: "text-xs text-[var(--color-text-tertiary)] truncate", children: e.email })
              ] }),
              /* @__PURE__ */ r("div", { className: "py-1", children: t.map((p, f) => /* @__PURE__ */ c("div", { children: [
                p.separator && f > 0 && /* @__PURE__ */ r("div", { className: "my-1 border-t border-[var(--color-border)]" }),
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
                      p.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : "text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"
                    ),
                    children: [
                      p.icon && /* @__PURE__ */ r("span", { className: "shrink-0 text-base leading-none", "aria-hidden": "true", children: p.icon }),
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
function Xe({ item: e, isLast: t }) {
  const o = u(
    "text-sm leading-snug transition-colors duration-100",
    t ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal"
  );
  return t || !e.href && !e.onClick ? /* @__PURE__ */ r("span", { className: o, "aria-current": t ? "page" : void 0, children: e.label }) : e.href ? /* @__PURE__ */ r("a", { href: e.href, onClick: e.onClick, className: u(o, "no-underline"), children: e.label }) : /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      onClick: e.onClick,
      className: u(o, "border-none bg-transparent cursor-pointer font-[inherit] p-0"),
      children: e.label
    }
  );
}
function er(e, t) {
  if (e.length <= t) return e;
  const o = e.slice(0, 1), a = e.slice(-(t - 2 > 0 ? t - 2 : 1));
  return [...o, null, ...a];
}
function ct({
  items: e,
  separator: t = "/",
  maxItems: o,
  className: a,
  "data-testid": n
}) {
  if (e.length === 0) return null;
  const l = o != null ? er(e, o) : e;
  return /* @__PURE__ */ r("nav", { "aria-label": "Breadcrumb", "data-testid": n, className: u("flex items-center", a), children: /* @__PURE__ */ r("ol", { className: "flex items-center gap-1 flex-wrap list-none m-0 p-0", children: l.map((s, d) => {
    const p = d === l.length - 1;
    return /* @__PURE__ */ c("li", { className: "flex items-center gap-1", children: [
      s === null ? /* @__PURE__ */ r(
        "span",
        {
          className: "text-sm text-[var(--color-text-tertiary)] select-none",
          "aria-label": "More items",
          title: "Some items are hidden",
          children: "…"
        }
      ) : /* @__PURE__ */ r(Xe, { item: s, isLast: p }),
      !p && /* @__PURE__ */ r(
        "span",
        {
          className: "text-[var(--color-text-tertiary)] text-sm select-none",
          "aria-hidden": "true",
          children: t
        }
      )
    ] }, d);
  }) }) });
}
const rr = {
  active: { bg: "var(--color-success-bg)", border: "#86efac", text: "var(--color-success-fg)", accent: "var(--color-success)" },
  in_progress: { bg: "var(--color-info-bg)", border: "var(--color-state-pending)", text: "var(--color-info-fg)", accent: "var(--color-info)" },
  completed: { bg: "var(--color-success-bg)", border: "#86efac", text: "var(--color-success-fg)", accent: "var(--color-success)" },
  archived: { bg: "var(--color-surface-inset)", border: "var(--color-border-field)", text: "var(--color-neutral)", accent: "var(--color-text-tertiary)" },
  planning: { bg: "#fefce8", border: "#fde047", text: "#713f12", accent: "#eab308" },
  paused: { bg: "var(--color-caution-bg)", border: "#fdba74", text: "#9a3412", accent: "var(--color-caution)" }
}, tr = {
  bg: "var(--color-surface-hover)",
  border: "var(--color-border-field)",
  text: "var(--color-text-primary)",
  accent: "var(--color-neutral)"
};
function or({ status: e, colors: t }) {
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
function dt({
  name: e,
  id: t,
  status: o,
  statusColors: a,
  contributorNames: n = [],
  contributorCount: l,
  activityItems: s = [],
  presenceDotColor: d = "var(--color-border-field)",
  activityLabel: p = "",
  cardIndex: f = 0,
  onClick: v,
  className: w,
  style: h,
  minHeight: m = 190
}) {
  const x = { ...rr, ...a }, i = (o ?? "unknown").toLowerCase().replace(/ /g, "_"), b = x[i] ?? tr, y = l !== void 0 ? Math.max(0, l - n.length) : 0, N = f % 8 * 525;
  return /* @__PURE__ */ c(
    "button",
    {
      type: "button",
      onClick: v,
      className: w,
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
        minHeight: m,
        width: "100%",
        textAlign: "left",
        font: "inherit",
        color: "inherit",
        ...h
      },
      onMouseEnter: (g) => {
        const k = g.currentTarget;
        k.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)", k.style.transform = "translateY(-1px)", k.style.borderColor = b.border;
      },
      onMouseLeave: (g) => {
        const k = g.currentTarget;
        k.style.boxShadow = "none", k.style.transform = "none", k.style.borderColor = "var(--color-border)";
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
                      color: "var(--color-text-tertiary)",
                      letterSpacing: "0.02em"
                    },
                    children: t
                  }
                )
              ] }),
              o && /* @__PURE__ */ r(or, { status: o, colors: b })
            ]
          }
        ),
        /* @__PURE__ */ r(ue, { items: s, staggerMs: N }),
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
                n.length > 0 ? /* @__PURE__ */ r(ae, { names: n, maxVisible: 5, size: 24 }) : /* @__PURE__ */ c("span", { style: { fontSize: 12, color: "var(--color-text-tertiary)" }, children: [
                  /* @__PURE__ */ r("strong", { style: { color: "var(--color-text-primary)" }, children: l ?? 0 }),
                  " contributors"
                ] }),
                n.length > 0 && y > 0 && /* @__PURE__ */ c("span", { style: { fontSize: 11, color: "var(--color-text-tertiary)" }, children: [
                  "+",
                  y,
                  " more"
                ] })
              ] }),
              p && /* @__PURE__ */ c("div", { style: { display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }, children: [
                /* @__PURE__ */ r(
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
                /* @__PURE__ */ r("span", { style: { fontSize: 11, color: "var(--color-text-tertiary)", whiteSpace: "nowrap" }, children: p })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function ar(e) {
  const t = [], o = /* @__PURE__ */ new Map();
  for (const a of e) {
    const n = a.group ?? null;
    if (n === null) {
      (t.length === 0 || t[0].name !== null) && (t.unshift({ name: null, items: [] }), o.forEach((s, d) => o.set(d, s + 1))), t[0].items.push(a);
      continue;
    }
    let l = o.get(n);
    l === void 0 && (l = t.length, o.set(n, l), t.push({ name: n, items: [] })), t[l].items.push(a);
  }
  return t;
}
function K({
  items: e,
  storageKey: t,
  title: o,
  renderNavItem: a
}) {
  const n = O(() => ar(e), [e]), l = n.some((s) => s.name !== null);
  return /* @__PURE__ */ r("nav", { className: "flex-1 overflow-y-auto py-1", children: l ? n.map(
    (s) => s.name === null ? /* @__PURE__ */ r(F, { items: s.items, renderNavItem: a }, "__ungrouped") : /* @__PURE__ */ r(
      nr,
      {
        name: s.name,
        items: s.items,
        storageKey: `${t}.${o}.${s.name}`,
        renderNavItem: a
      },
      s.name
    )
  ) : /* @__PURE__ */ r(F, { items: e, renderNavItem: a }) });
}
function ut({
  title: e,
  items: t,
  titleAction: o,
  railHeader: a,
  railWidth: n = 220,
  storageKey: l = "subnav",
  secondaryTitle: s,
  secondaryItems: d,
  secondaryStorageKey: p,
  secondaryRailWidth: f = 200,
  renderNavItem: v,
  children: w
}) {
  const h = d && d.length > 0;
  return /* @__PURE__ */ c("div", { className: "flex h-full min-h-0", children: [
    /* @__PURE__ */ c(
      "aside",
      {
        className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
        style: { width: n },
        children: [
          /* @__PURE__ */ c("div", { className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]", children: [
            /* @__PURE__ */ r("span", { className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]", children: e }),
            o
          ] }),
          a && /* @__PURE__ */ r("div", { className: "px-3 py-2 border-b border-[var(--color-border)]", children: a }),
          /* @__PURE__ */ r(K, { items: t, storageKey: l, title: e, renderNavItem: v })
        ]
      }
    ),
    h && /* @__PURE__ */ c(
      "aside",
      {
        className: "flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden",
        style: { width: f },
        children: [
          /* @__PURE__ */ r("div", { className: "flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]", children: /* @__PURE__ */ r("span", { className: "text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]", children: s ?? "" }) }),
          /* @__PURE__ */ r(
            K,
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
    /* @__PURE__ */ r("main", { className: "flex-1 min-w-0 overflow-auto p-6", children: w })
  ] });
}
function F({
  items: e,
  renderNavItem: t
}) {
  return /* @__PURE__ */ r(_, { children: e.map((o) => /* @__PURE__ */ r(J, { item: o, renderNavItem: t }, o.path)) });
}
function nr({
  name: e,
  items: t,
  storageKey: o,
  renderNavItem: a
}) {
  const [n, l] = T(() => typeof window > "u" ? !1 : window.localStorage?.getItem(o) === "1");
  L(() => {
    typeof window > "u" || (n ? window.localStorage?.setItem(o, "1") : window.localStorage?.removeItem(o));
  }, [n, o]);
  const s = t.find((p) => p.groupScrollAfter)?.groupScrollAfter, d = s ? { maxHeight: s * 38, overflowY: "auto" } : void 0;
  return /* @__PURE__ */ c("section", { className: "border-b border-[var(--color-border)]", children: [
    /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        onClick: () => l((p) => !p),
        className: "flex items-center gap-1.5 w-full px-3 py-2 bg-transparent border-none cursor-pointer text-[var(--color-text-tertiary)] text-[10px] font-bold tracking-[0.05em] uppercase text-left",
        "aria-expanded": !n,
        children: [
          /* @__PURE__ */ r("span", { className: "text-[10px] w-[10px] inline-block", "aria-hidden": "true", children: n ? "▸" : "▾" }),
          /* @__PURE__ */ r("span", { className: "flex-1", children: e }),
          /* @__PURE__ */ r("span", { className: "text-[9px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-bg)] px-[5px] py-px rounded-[6px] border border-[var(--color-border)]", children: t.length })
        ]
      }
    ),
    !n && /* @__PURE__ */ r("div", { style: d, children: t.map((p) => /* @__PURE__ */ r(J, { item: p, renderNavItem: a }, p.path)) })
  ] });
}
function J({
  item: e,
  renderNavItem: t
}) {
  const o = e.accent === "danger" ? "var(--color-danger)" : e.accent === "warning" ? "var(--color-warning)" : e.accent === "success" ? "var(--color-success)" : void 0, a = /* @__PURE__ */ c(_, { children: [
    /* @__PURE__ */ c("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ r(
        "span",
        {
          className: "text-[13px] font-medium text-[var(--color-text-secondary)]",
          style: o ? { color: o } : void 0,
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
      children: a
    }
  ) : t ? /* @__PURE__ */ r(_, { children: t(e, a, n) }) : /* @__PURE__ */ r(
    "a",
    {
      href: e.path,
      className: "block px-[14px] py-2 border-l-[3px] border-transparent text-[var(--color-text-secondary)] no-underline cursor-pointer",
      children: a
    }
  );
}
const pt = {
  borderLeft: "3px solid var(--color-primary)",
  background: "var(--color-surface-hover)",
  color: "var(--color-text-primary)"
}, lr = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(",");
function H(e) {
  return Array.from(e.querySelectorAll(lr)).filter(
    (t) => t.getAttribute("aria-hidden") !== "true"
  );
}
function sr(e, t, o) {
  return t === "right" ? {
    position: "fixed",
    top: e.top,
    left: e.right + o
  } : t === "bottom-end" ? {
    position: "fixed",
    top: e.bottom + o,
    left: e.right,
    transform: "translateX(-100%)"
  } : {
    position: "fixed",
    top: e.bottom + o,
    left: e.left
  };
}
function ir({
  trigger: e,
  open: t,
  onClose: o,
  placement: a = "bottom-start",
  offset: n = 6,
  className: l,
  zIndex: s = 9500,
  "data-testid": d = "inline-popover",
  children: p
}) {
  const f = A(null), [v, w] = T(null), h = A(null), m = $(() => {
    const x = e.current;
    if (!x) return;
    const i = x.getBoundingClientRect();
    w(sr(i, a, n));
  }, [e, a, n]);
  return X(() => {
    if (!t) {
      w(null);
      return;
    }
    m();
  }, [t, m]), L(() => {
    if (!t) return;
    const x = () => m();
    return window.addEventListener("scroll", x, !0), window.addEventListener("resize", x), () => {
      window.removeEventListener("scroll", x, !0), window.removeEventListener("resize", x);
    };
  }, [t, m]), L(() => {
    if (!t) return;
    const x = typeof document < "u" ? document.activeElement : null;
    return h.current = x, queueMicrotask(() => {
      const i = f.current;
      if (!i) return;
      const b = H(i);
      b.length > 0 ? b[0].focus() : (i.setAttribute("tabindex", "-1"), i.focus());
    }), () => {
      const i = h.current;
      i && typeof i.focus == "function" && document.contains(i) && i.focus(), h.current = null;
    };
  }, [t]), L(() => {
    if (!t) return;
    const x = (i) => {
      if (i.key === "Escape") {
        i.stopPropagation(), o();
        return;
      }
      if (i.key !== "Tab") return;
      const b = f.current;
      if (!b) return;
      const y = H(b);
      if (y.length === 0) {
        i.preventDefault();
        return;
      }
      const N = y[0], g = y[y.length - 1], k = document.activeElement;
      if (!k || !b.contains(k)) {
        i.preventDefault(), N.focus();
        return;
      }
      i.shiftKey && k === N ? (i.preventDefault(), g.focus()) : !i.shiftKey && k === g && (i.preventDefault(), N.focus());
    };
    return window.addEventListener("keydown", x), () => window.removeEventListener("keydown", x);
  }, [t, o]), L(() => {
    if (!t) return;
    const x = (i) => {
      const b = i.target;
      b && (f.current?.contains(b) || e.current?.contains(b) || o());
    };
    return document.addEventListener("mousedown", x), () => document.removeEventListener("mousedown", x);
  }, [t, o, e]), !t || !v || typeof document > "u" ? null : W(
    /* @__PURE__ */ r(
      "div",
      {
        ref: f,
        role: "dialog",
        "data-testid": d,
        "data-placement": a,
        className: u(
          "min-w-[160px] rounded-lg border border-border bg-white",
          "shadow-lg p-1 text-sm text-text-primary",
          l
        ),
        style: { ...v, zIndex: s },
        children: p
      }
    ),
    document.body
  );
}
function ft({
  trigger: e,
  triggerLabel: t = "Open menu",
  triggerTitle: o,
  triggerClassName: a,
  align: n = "start",
  sections: l,
  className: s,
  "data-testid": d = "dropdown-menu"
}) {
  const [p, f] = T(!1), v = A(null), w = A(null), h = $(() => f(!1), []), m = $((x) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(x.key)) return;
    const i = w.current;
    if (!i) return;
    const b = Array.from(
      i.querySelectorAll('[role="menuitem"]')
    );
    if (b.length === 0) return;
    x.preventDefault();
    const y = b.indexOf(document.activeElement);
    let N;
    x.key === "Home" ? N = 0 : x.key === "End" ? N = b.length - 1 : x.key === "ArrowDown" ? N = y < 0 ? 0 : (y + 1) % b.length : N = y <= 0 ? b.length - 1 : y - 1, b[N].focus();
  }, []);
  return /* @__PURE__ */ c(_, { children: [
    /* @__PURE__ */ r(
      "button",
      {
        ref: v,
        type: "button",
        "aria-label": t,
        "aria-haspopup": "menu",
        "aria-expanded": p,
        title: o,
        onClick: () => f((x) => !x),
        className: u(
          "inline-flex items-center justify-center gap-1.5 cursor-pointer",
          "rounded-md border border-[var(--color-border)] px-2 py-1",
          "text-base leading-none text-[var(--color-text-secondary)]",
          "bg-transparent hover:bg-[var(--color-surface-hover)] transition-colors duration-100",
          p && "bg-[var(--color-surface-hover)]",
          a
        ),
        children: e
      }
    ),
    /* @__PURE__ */ r(
      ir,
      {
        trigger: v,
        open: p,
        onClose: h,
        placement: n === "end" ? "bottom-end" : "bottom-start",
        className: u("min-w-[180px] p-0 overflow-hidden rounded-lg", s),
        "data-testid": d,
        children: /* @__PURE__ */ r(
          "div",
          {
            ref: w,
            role: "menu",
            "aria-label": t,
            onKeyDown: m,
            className: "py-1",
            children: l.map((x, i) => /* @__PURE__ */ c("div", { role: "group", "aria-label": x.label, children: [
              i > 0 && /* @__PURE__ */ r("div", { role: "separator", className: "my-1 border-t border-[var(--color-border)]" }),
              x.label && /* @__PURE__ */ r("div", { className: "px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]", children: x.label }),
              x.items.map((b, y) => /* @__PURE__ */ c(
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
                    b.danger ? "text-danger-fg bg-transparent hover:bg-danger-bg" : b.active ? "font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface-hover)]" : "font-normal text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]"
                  ),
                  children: [
                    b.icon && /* @__PURE__ */ r("span", { className: "shrink-0 text-base leading-none", "aria-hidden": "true", children: b.icon }),
                    b.label
                  ]
                },
                y
              ))
            ] }, i))
          }
        )
      }
    )
  ] });
}
const cr = {
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
}, dr = {
  sm: "px-1.5 py-0.5 text-[10px] gap-1",
  md: "px-2.5 py-1 text-[12px] gap-1.5"
}, z = {
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2"
};
function xt({
  state: e,
  label: t,
  icon: o,
  size: a = "md",
  className: n,
  "data-testid": l
}) {
  const s = cr[e], d = e === "pending";
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
        dr[a],
        n
      ),
      children: [
        o ? /* @__PURE__ */ r("span", { "aria-hidden": "true", className: "shrink-0", children: o }) : (
          // Dot indicator — pending gets a relative container with an animate-ping halo.
          /* @__PURE__ */ c("span", { className: u("relative inline-flex shrink-0", z[a]), children: [
            d && /* @__PURE__ */ r(
              "span",
              {
                "aria-hidden": "true",
                className: u(
                  "absolute inset-0 rounded-full animate-ping opacity-75",
                  s.dot
                )
              }
            ),
            /* @__PURE__ */ r(
              "span",
              {
                "aria-hidden": "true",
                className: u("relative rounded-full", z[a], s.dot)
              }
            )
          ] })
        ),
        t
      ]
    }
  );
}
export {
  Xr as A,
  ct as B,
  Dr as C,
  Wr as D,
  Gr as E,
  lt as F,
  Ze as G,
  Qe as H,
  Vr as I,
  Zr as J,
  Fr as K,
  rt as L,
  ot as M,
  it as N,
  pt as O,
  Yr as P,
  nt as Q,
  Ge as R,
  Jr as S,
  Ir as T,
  zr as U,
  Ce as V,
  Tr as W,
  Rr as X,
  et as a,
  st as b,
  tt as c,
  Lr as d,
  qr as e,
  _r as f,
  Or as g,
  Ar as h,
  ft as i,
  Mr as j,
  ir as k,
  jr as l,
  qe as m,
  Pe as n,
  Hr as o,
  dt as p,
  Ur as q,
  Br as r,
  Ye as s,
  Kr as t,
  xt as u,
  ut as v,
  Pr as w,
  Qr as x,
  at as y,
  M as z
};
