import { r as T, a as k } from "./registry-qR57lair.js";
import { jsx as r, jsxs as u, Fragment as z } from "react/jsx-runtime";
import { useMemo as ie, useState as D, useEffect as A, useCallback as j, useRef as S } from "react";
import { useEditor as oe, EditorContent as se } from "@tiptap/react";
import le from "@tiptap/starter-kit";
import de from "@tiptap/extension-task-list";
import ce from "@tiptap/extension-task-item";
import ue from "@tiptap/extension-placeholder";
import pe from "@tiptap/extension-collaboration";
import * as _ from "yjs";
import { ySyncPluginKey as M, relativePositionToAbsolutePosition as V, absolutePositionToRelativePosition as H } from "@tiptap/y-tiptap";
import { c as l } from "./cn-B6yFEsav.js";
import { D as K, q as me } from "./useWebSocket-Bn4OeUor.js";
import { I as O } from "./Input-Dt0yAs9r.js";
import { S as W } from "./Select-DAEcKWg2.js";
import { C as he } from "./Checkbox-vOc5I8kn.js";
import { l as fe } from "./useDocumentTypes-C29MkgPl.js";
import { M as xe } from "./Modal-X8tdpRKs.js";
import { T as be } from "./Textarea-kaa9rHUL.js";
const ge = {
  type: "tasks",
  label: "Task List",
  icon: "✅",
  description: "Assignable action items with status tracking",
  rendererKeys: {
    editor: ["tasks:editor"],
    ack: ["tasks:ack"],
    reader: ["tasks:reader"]
  },
  rendererLabels: {
    "tasks:editor": "Task Editor",
    "tasks:ack": "Task Review",
    "tasks:reader": "Task Reader"
  }
}, ye = {
  type: "rich-text",
  label: "Rich Text",
  icon: "📝",
  description: "Formatted content with headings and lists",
  rendererKeys: {
    editor: ["rich-text:editor"],
    ack: ["rich-text:ack"],
    reader: ["rich-text:reader"]
  },
  rendererLabels: {
    "rich-text:editor": "Rich Text Editor",
    "rich-text:ack": "Rich Text Viewer",
    "rich-text:reader": "Rich Text Viewer"
  }
}, ke = {
  type: "decisions",
  label: "Decisions",
  icon: "🎯",
  description: "Decision log with rationale and context",
  rendererKeys: {
    editor: ["decisions:editor"],
    ack: ["decisions:ack"],
    reader: ["decisions:reader"]
  },
  rendererLabels: {
    "decisions:editor": "Decisions Editor",
    "decisions:ack": "Decisions Viewer",
    "decisions:reader": "Decisions Viewer"
  }
}, ve = {
  type: "checklist",
  label: "Checklist",
  icon: "☑️",
  description: "Simple yes/no checklist items",
  rendererKeys: {
    editor: ["checklist:editor"],
    ack: ["checklist:ack"],
    reader: ["checklist:reader"]
  },
  rendererLabels: {
    "checklist:editor": "Checklist Editor",
    "checklist:ack": "Checklist Viewer",
    "checklist:reader": "Checklist Viewer"
  }
}, Ne = {
  type: "file-upload",
  label: "File Upload",
  icon: "📎",
  description: "Upload a file at edit time; download link in viewer",
  rendererKeys: {
    editor: ["file-upload:editor"],
    ack: ["file-upload:ack"],
    reader: ["file-upload:reader"]
  },
  rendererLabels: {
    "file-upload:editor": "File Upload Editor",
    "file-upload:ack": "File Upload Viewer",
    "file-upload:reader": "File Upload Viewer"
  }
}, we = {
  type: "diagram",
  label: "Diagram",
  icon: "▦",
  description: "Embedded image or SVG (placeholder until upload pipeline lands)",
  rendererKeys: {
    editor: ["diagram:editor"],
    ack: ["diagram:ack"],
    reader: ["diagram:reader"]
  },
  rendererLabels: {
    "diagram:editor": "Diagram Editor",
    "diagram:ack": "Diagram Viewer",
    "diagram:reader": "Diagram Viewer"
  }
}, Ce = {
  type: "link-block",
  label: "Link Block",
  icon: "🔗",
  description: "List of external links (label + url pairs)",
  rendererKeys: {
    editor: ["link-block:editor"],
    ack: ["link-block:ack"],
    reader: ["link-block:reader"]
  },
  rendererLabels: {
    "link-block:editor": "Link Block Editor",
    "link-block:ack": "Link Block Viewer",
    "link-block:reader": "Link Block Viewer"
  }
}, De = [
  {
    label: "B",
    action: (e) => {
      e.chain().focus().toggleBold().run();
    },
    isActive: (e) => e.isActive("bold")
  },
  {
    label: "I",
    action: (e) => {
      e.chain().focus().toggleItalic().run();
    },
    isActive: (e) => e.isActive("italic")
  },
  {
    label: "S",
    action: (e) => {
      e.chain().focus().toggleStrike().run();
    },
    isActive: (e) => e.isActive("strike")
  },
  {
    label: "</>",
    action: (e) => {
      e.chain().focus().toggleCode().run();
    },
    isActive: (e) => e.isActive("code")
  },
  {
    label: "H1",
    action: (e) => {
      e.chain().focus().toggleHeading({ level: 1 }).run();
    },
    isActive: (e) => e.isActive("heading", { level: 1 })
  },
  {
    label: "H2",
    action: (e) => {
      e.chain().focus().toggleHeading({ level: 2 }).run();
    },
    isActive: (e) => e.isActive("heading", { level: 2 })
  },
  {
    label: "H3",
    action: (e) => {
      e.chain().focus().toggleHeading({ level: 3 }).run();
    },
    isActive: (e) => e.isActive("heading", { level: 3 })
  },
  {
    label: "Bullet",
    action: (e) => {
      e.chain().focus().toggleBulletList().run();
    },
    isActive: (e) => e.isActive("bulletList")
  },
  {
    label: "Ordered",
    action: (e) => {
      e.chain().focus().toggleOrderedList().run();
    },
    isActive: (e) => e.isActive("orderedList")
  },
  {
    label: "Task",
    action: (e) => {
      e.chain().focus().toggleTaskList().run();
    },
    isActive: (e) => e.isActive("taskList")
  },
  {
    label: "Quote",
    action: (e) => {
      e.chain().focus().toggleBlockquote().run();
    },
    isActive: (e) => e.isActive("blockquote")
  },
  {
    label: "Code Block",
    action: (e) => {
      e.chain().focus().toggleCodeBlock().run();
    },
    isActive: (e) => e.isActive("codeBlock")
  },
  {
    label: "HR",
    action: (e) => {
      e.chain().focus().setHorizontalRule().run();
    },
    isActive: () => !1
  }
];
function Re({ editor: e }) {
  return e ? /* @__PURE__ */ r("div", { className: l("flex flex-wrap gap-1 px-2 py-1.5 border-b border-border bg-surface-panel rounded-t-lg"), children: De.map((t) => {
    const n = t.isActive(e);
    return /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: () => t.action(e),
        className: l(
          "px-2 py-1 text-xs font-[inherit] border border-border-emphasis rounded cursor-pointer leading-snug",
          n ? "bg-info text-white" : "bg-white text-text-primary"
        ),
        title: t.label,
        children: t.label
      },
      t.label
    );
  }) }) : null;
}
const Ae = console.warn;
console.warn = (...e) => {
  typeof e[0] == "string" && e[0].includes("extension-collaboration") || Ae(...e);
};
function B(e, t, n) {
  try {
    if (t < 0 || t > e.state.doc.content.size) return null;
    const a = e.coordsAtPos(t), d = (n || e.dom).getBoundingClientRect();
    return {
      top: a.top - d.top,
      left: a.left - d.left,
      height: a.bottom - a.top
    };
  } catch {
    return null;
  }
}
function Se({ cursors: e, editorView: t, containerEl: n }) {
  return t ? /* @__PURE__ */ r(z, { children: e.map((a) => {
    if (a.head == null) return null;
    const o = B(t, a.head, n);
    if (!o) return null;
    const d = a.name.split(" ").map((i) => i[0] ?? "").join("").toUpperCase().slice(0, 2) || a.name.slice(0, 2).toUpperCase(), s = [];
    if (a.anchor != null && a.anchor !== a.head) {
      const i = Math.min(a.anchor, a.head), m = Math.max(a.anchor, a.head);
      try {
        const h = t.dom.offsetWidth;
        let x = i;
        for (; x <= m; ) {
          const f = B(t, x, n);
          if (!f) break;
          let N = x;
          const v = f.top;
          for (let p = x + 1; p <= m; p++) {
            const g = B(t, p, n);
            if (!g || Math.abs(g.top - v) > 2) break;
            N = p;
          }
          const y = B(t, N, n);
          if (y) {
            const p = x === i ? f.left : 0, g = N === m ? y.left + 4 : h;
            s.push(
              /* @__PURE__ */ r(
                "div",
                {
                  className: "absolute rounded-sm pointer-events-none opacity-[0.12] z-[5]",
                  style: {
                    top: v,
                    left: p,
                    width: Math.max(g - p, 4),
                    height: f.height || 18,
                    background: a.color
                  }
                },
                `sel-${a.clientId}-${x}`
              )
            );
          }
          x = N + 1;
        }
      } catch {
      }
    }
    return /* @__PURE__ */ u("div", { className: "pointer-events-none", children: [
      s,
      /* @__PURE__ */ r(
        "div",
        {
          className: "absolute w-0.5 opacity-40 rounded-[1px] pointer-events-none z-10 [animation:cursorBlink_1.2s_ease-in-out_infinite]",
          style: {
            top: o.top,
            left: o.left - 1,
            height: o.height || 18,
            background: a.color
          }
        }
      ),
      /* @__PURE__ */ r(
        "div",
        {
          className: "absolute w-2 opacity-[0.06] rounded pointer-events-none z-[9]",
          style: {
            top: o.top,
            left: o.left - 4,
            height: o.height || 18,
            background: a.color
          }
        }
      ),
      /* @__PURE__ */ r(
        "div",
        {
          className: "absolute text-white text-[10px] font-bold py-px px-[5px] rounded-[4px_4px_4px_0] whitespace-nowrap pointer-events-none z-[11] opacity-[0.55] shadow-[0_1px_4px_rgba(0,0,0,0.1)]",
          style: {
            top: o.top - 18,
            left: o.left - 2,
            background: a.color
          },
          title: a.name,
          children: d
        }
      )
    ] }, a.clientId);
  }) }) : null;
}
function E({
  fragment: e,
  ydoc: t,
  provider: n,
  user: a,
  editable: o = !0,
  placeholder: d = "Start typing...",
  sectionId: s,
  onUpdateCursorInfo: i
}) {
  const m = ie(() => [
    le.configure({ history: !1 }),
    de,
    ce.configure({ nested: !0 }),
    ue.configure({ placeholder: d }),
    pe.configure({ document: t, fragment: e })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [t, e]), c = oe({
    extensions: m,
    editable: o
  }, [m]), [h, x] = D([]), [f, N] = D(null);
  A(() => {
    if (i)
      i(a.name, a.color);
    else if (n?.awareness) {
      const p = n.awareness.getLocalState()?.user || {};
      n.awareness.setLocalStateField("user", {
        ...p,
        name: a.name,
        color: a.color
      });
    }
  }, [n, a, i]);
  const v = j(() => {
    if (!n?.awareness || !c?.view) return;
    const y = n.awareness.getStates(), p = n.awareness.clientID, g = [];
    y.forEach((w, C) => {
      if (C === p) return;
      const $ = w.user;
      if (!(!$ || !w.cursor) && !(s && w.cursor.sectionId !== s))
        try {
          const R = M.getState(c.view.state);
          if (!R?.type || !R?.binding?.mapping) return;
          const F = V(
            R.doc,
            R.type,
            _.createRelativePositionFromJSON(w.cursor.anchor),
            R.binding.mapping
          ), I = V(
            R.doc,
            R.type,
            _.createRelativePositionFromJSON(w.cursor.head),
            R.binding.mapping
          );
          g.push({
            clientId: C,
            name: $.name || `User ${C}`,
            color: $.color || "#3b82f6",
            anchor: F,
            head: I
          });
        } catch {
        }
    }), x(g);
  }, [n, c, s]);
  return A(() => {
    if (!c?.view || !n?.awareness) return;
    const y = () => {
      try {
        const p = M.getState(c.view.state);
        if (!p?.type || !p?.binding?.mapping) return;
        const { anchor: g, head: w } = c.view.state.selection, C = H(g, p.type, p.binding.mapping), $ = H(w, p.type, p.binding.mapping);
        n.awareness.setLocalStateField("cursor", { anchor: C, head: $, sectionId: s });
      } catch {
      }
    };
    return c.on("selectionUpdate", y), y(), () => {
      c.off("selectionUpdate", y), n.awareness.setLocalStateField("cursor", null);
    };
  }, [c, n, s]), A(() => {
    if (!n?.awareness) return;
    const y = () => v();
    return n.awareness.on("change", y), () => {
      n.awareness.off("change", y);
    };
  }, [n, v]), /* @__PURE__ */ u("div", { className: l(o ? "border border-border rounded-lg overflow-hidden relative" : "relative"), children: [
    o && /* @__PURE__ */ r(Re, { editor: c }),
    /* @__PURE__ */ u("div", { ref: N, className: l("px-4 py-3 text-sm leading-relaxed text-text-primary relative"), children: [
      /* @__PURE__ */ r(se, { editor: c }),
      /* @__PURE__ */ r(Se, { cursors: h, editorView: c?.view, containerEl: f })
    ] })
  ] });
}
const $e = {
  pending: "#94a3b8",
  acked: "#3b82f6",
  done: "#22c55e",
  rejected: "#ef4444"
}, G = {
  low: "#94a3b8",
  medium: "#f97316",
  high: "#ef4444"
}, Le = {
  start: "#22c55e",
  stop: "#ef4444",
  continue: "#3b82f6"
};
function Te(e) {
  const t = new Date(e);
  return isNaN(t.getTime()) ? e : t.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function Ee(e) {
  const t = new Date(e);
  if (isNaN(t.getTime())) return !1;
  const n = /* @__PURE__ */ new Date();
  return n.setHours(0, 0, 0, 0), t < n;
}
function J(e) {
  return e.split(/\s+/).map((t) => t[0]).join("").toUpperCase().slice(0, 2);
}
function je({ item: e, editable: t, onUpdate: n, onRemove: a, autoFocusText: o, onDidAutoFocus: d }) {
  const [s, i] = D(!1), [m, c] = D(""), [h, x] = D(0), f = S(null), N = S(null), v = S(null), y = () => {
    const b = e.status === "done" ? "pending" : "done";
    n({ status: b });
  }, p = e.assignee ? K.find((b) => b.displayName === e.assignee) : void 0, g = m.trim() ? me(m) : K, w = j(() => {
    t && (c(""), x(0), i(!0));
  }, [t]), C = j(() => {
    i(!1), c(""), x(0);
  }, []), $ = j((b) => {
    n({ assignee: b.displayName }), C();
  }, [n, C]), R = j(() => {
    n({ assignee: "" }), C();
  }, [n, C]);
  A(() => {
    if (!s) return;
    const b = (L) => {
      f.current && !f.current.contains(L.target) && C();
    };
    return document.addEventListener("mousedown", b), () => document.removeEventListener("mousedown", b);
  }, [s, C]), A(() => {
    s && N.current && N.current.focus();
  }, [s]), A(() => {
    x(0);
  }, [m]), A(() => {
    o && v.current && (v.current.focus(), d?.());
  }, [o, d]);
  const F = (b) => {
    b.key === "Escape" ? C() : b.key === "ArrowDown" ? (b.preventDefault(), x((L) => Math.min(L + 1, g.length - 1))) : b.key === "ArrowUp" ? (b.preventDefault(), x((L) => Math.max(L - 1, 0))) : b.key === "Enter" && (b.preventDefault(), g[h] && $(g[h]));
  }, I = e.dueDate && e.status !== "done" ? Ee(e.dueDate) : !1;
  return /* @__PURE__ */ u("div", { className: l("flex items-center gap-2 py-1.5 border-b border-border-subtle"), children: [
    /* @__PURE__ */ r(
      "span",
      {
        title: `Priority: ${e.priority}`,
        className: l("w-2 h-2 rounded-full shrink-0"),
        style: { background: G[e.priority] }
      }
    ),
    /* @__PURE__ */ r(
      he,
      {
        checked: e.status === "done",
        onChange: y,
        disabled: !t,
        className: l("w-4 h-4", t ? "cursor-pointer" : "cursor-default")
      }
    ),
    /* @__PURE__ */ r(
      O,
      {
        ref: v,
        "data-testid": `task-text-${e.id}`,
        value: e.text,
        onChange: (b) => n({ text: b.target.value }),
        readOnly: !t,
        className: l(
          "flex-1 h-auto border-transparent bg-transparent px-1 py-0.5",
          e.status === "done" ? "line-through text-text-tertiary" : "text-text-primary"
        )
      }
    ),
    e.dueDate && /* @__PURE__ */ u(
      "span",
      {
        title: e.dueDate,
        className: l(
          "inline-block px-2 py-0.5 text-[10px] font-semibold rounded-xl whitespace-nowrap leading-snug border",
          I ? "bg-danger-bg text-danger-fg border-danger-border" : "bg-info-bg text-neutral border-info-border"
        ),
        children: [
          I ? "⚠ " : "",
          "Due: ",
          Te(e.dueDate)
        ]
      }
    ),
    e.category && /* @__PURE__ */ r(
      "span",
      {
        className: l("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap"),
        style: { backgroundColor: Le[e.category.toLowerCase()] ?? "#6b7280" },
        children: e.category
      }
    ),
    /* @__PURE__ */ u("div", { ref: f, className: l("relative"), children: [
      /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          onClick: w,
          title: e.assignee || "Unassigned",
          className: l(
            "inline-flex items-center justify-center h-6 rounded-xl font-semibold text-[11px] cursor-pointer leading-snug whitespace-nowrap",
            e.assignee ? "px-2 bg-primary-bg text-primary-fg border-none min-w-0" : "w-6 px-0 bg-white text-text-tertiary border border-dashed border-border-emphasis"
          ),
          children: e.assignee ? /* @__PURE__ */ u(z, { children: [
            /* @__PURE__ */ r(
              "span",
              {
                className: l("w-[18px] h-[18px] rounded-full text-white inline-flex items-center justify-center text-[8px] font-bold shrink-0 leading-none"),
                style: { background: p?.color ?? "#94a3b8" },
                children: J(e.assignee)
              }
            ),
            /* @__PURE__ */ r("span", { className: l("ml-1 text-[11px]"), children: e.assignee.split(" ")[0] })
          ] }) : "+"
        }
      ),
      s && /* @__PURE__ */ u("div", { className: l("absolute top-full left-0 mt-1 min-w-[180px] max-h-[200px] overflow-y-auto bg-white border border-border rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.12)] z-[1000] py-1"), children: [
        /* @__PURE__ */ r("div", { className: l("px-2 py-1"), children: /* @__PURE__ */ r(
          O,
          {
            ref: N,
            size: "sm",
            value: m,
            onChange: (b) => c(b.target.value),
            onKeyDown: F,
            placeholder: "Search users...",
            className: l("text-[11px]")
          }
        ) }),
        e.assignee && /* @__PURE__ */ u(
          "button",
          {
            type: "button",
            onClick: R,
            className: l("flex items-center gap-2 py-1.5 px-2.5 text-xs cursor-pointer bg-transparent border-none w-full text-left font-[inherit] text-text-primary"),
            children: [
              /* @__PURE__ */ r("span", { className: l("w-[22px] h-[22px] rounded-full bg-border-emphasis text-neutral inline-flex items-center justify-center text-[10px] font-bold shrink-0 leading-none"), children: "--" }),
              /* @__PURE__ */ r("span", { className: l("text-neutral italic"), children: "Unassigned" })
            ]
          }
        ),
        g.map((b, L) => /* @__PURE__ */ u(
          "button",
          {
            type: "button",
            onClick: () => $(b),
            onMouseEnter: () => x(L),
            className: l(
              "flex items-center gap-2 py-1.5 px-2.5 text-xs cursor-pointer border-none w-full text-left font-[inherit] text-text-primary",
              L === h ? "bg-surface-hover" : "bg-transparent"
            ),
            children: [
              /* @__PURE__ */ r(
                "span",
                {
                  className: l("w-[22px] h-[22px] rounded-full text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0 leading-none"),
                  style: { background: b.color },
                  children: J(b.displayName)
                }
              ),
              /* @__PURE__ */ r("span", { children: b.displayName })
            ]
          },
          b.userId
        )),
        g.length === 0 && /* @__PURE__ */ r("div", { className: l("px-2.5 py-2 text-[11px] text-text-tertiary"), children: "No users found" })
      ] })
    ] }),
    /* @__PURE__ */ r(
      W,
      {
        value: e.priority,
        disabled: !t,
        onChange: (b) => n({ priority: b.target.value }),
        className: l("w-auto h-auto inline-block px-2 py-0.5 pr-4 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap border-none appearance-none doc-select-arrow", t ? "cursor-pointer" : "cursor-default"),
        style: { backgroundColor: G[e.priority] },
        title: `Priority: ${e.priority}`,
        options: [
          { value: "low", label: "low" },
          { value: "medium", label: "medium" },
          { value: "high", label: "high" }
        ]
      }
    ),
    /* @__PURE__ */ r(
      W,
      {
        value: e.status,
        disabled: !t,
        onChange: (b) => n({ status: b.target.value }),
        className: l("w-auto h-auto inline-block px-2 py-0.5 pr-4 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap border-none appearance-none doc-select-arrow", t ? "cursor-pointer" : "cursor-default"),
        style: { backgroundColor: $e[e.status] },
        title: `Status: ${e.status}`,
        options: [
          { value: "pending", label: "pending" },
          { value: "acked", label: "acked" },
          { value: "done", label: "done" },
          { value: "rejected", label: "rejected" }
        ]
      }
    ),
    t && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: a,
        title: "Remove task",
        className: l("border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 rounded leading-none"),
        children: "x"
      }
    )
  ] });
}
function Q({ items: e, editable: t, onUpdateItem: n, onRemoveItem: a, focusLastItem: o }) {
  if (e.length === 0)
    return /* @__PURE__ */ r("div", { className: l("text-text-tertiary text-[13px] italic py-2"), children: "No tasks yet." });
  const d = o?.current ?? !1;
  return /* @__PURE__ */ r("div", { className: l("py-2"), children: e.map((s, i) => /* @__PURE__ */ r(
    je,
    {
      item: s,
      editable: t,
      onUpdate: (m) => n(s.id, m),
      onRemove: () => a(s.id),
      autoFocusText: d && i === e.length - 1,
      onDidAutoFocus: d && i === e.length - 1 ? () => {
        o && (o.current = !1);
      } : void 0
    },
    s.id
  )) });
}
function Ie({
  section: e,
  fragment: t,
  ydoc: n,
  provider: a,
  user: o,
  editable: d,
  onAddItem: s,
  onUpdateItem: i,
  onRemoveItem: m,
  onUpdateCursorInfo: c
}) {
  const h = S(!1), x = () => {
    s?.({ text: "", status: "pending", assignee: "", ackedBy: "", ackedAt: "", priority: "medium", notes: "" }), h.current = !0;
  };
  return /* @__PURE__ */ u("div", { children: [
    t && n && /* @__PURE__ */ r(
      E,
      {
        fragment: t,
        ydoc: n,
        provider: a ?? null,
        user: o ?? { name: "Anonymous", color: "#6b7280" },
        editable: d,
        placeholder: e.placeholder ?? `Write ${e.type} content...`,
        sectionId: e.id,
        onUpdateCursorInfo: c
      }
    ),
    (e.items.length > 0 || d) && /* @__PURE__ */ r(
      Q,
      {
        items: e.items,
        editable: d,
        onUpdateItem: (f, N) => i?.(f, N),
        onRemoveItem: (f) => m?.(f),
        focusLastItem: h
      }
    ),
    d && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: x,
        className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit",
        children: "+ Add item"
      }
    )
  ] });
}
function Be({
  section: e,
  fragment: t,
  ydoc: n,
  provider: a,
  user: o,
  editable: d,
  onUpdateCursorInfo: s
}) {
  return !t || !n ? /* @__PURE__ */ r("div", { className: "text-text-tertiary italic text-[13px] py-2", children: "No content yet." }) : /* @__PURE__ */ r(
    E,
    {
      fragment: t,
      ydoc: n,
      provider: a ?? null,
      user: o ?? { name: "Anonymous", color: "#6b7280" },
      editable: d,
      placeholder: e.placeholder ?? "Write content...",
      sectionId: e.id,
      onUpdateCursorInfo: s
    }
  );
}
function X({
  section: e,
  fragment: t,
  ydoc: n,
  provider: a,
  onNavigateToEditor: o
}) {
  return /* @__PURE__ */ u("div", { children: [
    !!t && !!n ? /* @__PURE__ */ r("div", { className: "border border-info-border border-l-[3px] border-l-info rounded-md px-3.5 py-2.5 bg-info-bg text-sm text-text-primary leading-[1.6]", children: /* @__PURE__ */ r(
      E,
      {
        fragment: t,
        ydoc: n,
        provider: a ?? null,
        user: { name: "", color: "#6b7280" },
        editable: !1,
        sectionId: e.id
      }
    ) }) : /* @__PURE__ */ r("div", { className: "text-text-tertiary italic text-[13px]", children: "No content." }),
    o && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: () => o(e.id),
        className: "mt-2 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
        children: "Edit in editor →"
      }
    )
  ] });
}
function Fe({
  section: e,
  editable: t,
  onAddItem: n,
  onUpdateItem: a,
  onRemoveItem: o
}) {
  const d = S(!1), s = () => {
    n?.({
      text: "",
      status: "pending",
      assignee: "",
      ackedBy: "",
      ackedAt: "",
      priority: "medium",
      notes: ""
    }), d.current = !0;
  };
  return /* @__PURE__ */ u("div", { className: "py-1", children: [
    e.items.length > 0 || t ? /* @__PURE__ */ r(
      Q,
      {
        items: e.items,
        editable: t,
        onUpdateItem: (i, m) => a?.(i, m),
        onRemoveItem: (i) => o?.(i),
        focusLastItem: d
      }
    ) : null,
    e.items.length === 0 && !t && /* @__PURE__ */ r("p", { className: "text-text-tertiary text-[13px] italic my-2", children: "No items yet." }),
    t && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: s,
        className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit",
        children: "+ Add item"
      }
    )
  ] });
}
const Ue = {
  pending: { label: "Pending", color: "#92400e", bg: "#fef3c7" },
  acked: { label: "Acked", color: "#1e40af", bg: "#dbeafe" },
  done: { label: "Done", color: "#065f46", bg: "#d1fae5" },
  rejected: { label: "Rejected", color: "#991b1b", bg: "#fee2e2" }
}, Pe = {
  high: "#ef4444",
  medium: "#f97316",
  low: "#94a3b8"
};
function Oe(e) {
  const t = new Date(e);
  if (isNaN(t.getTime())) return !1;
  const n = /* @__PURE__ */ new Date();
  return n.setHours(0, 0, 0, 0), t < n;
}
function ze(e) {
  const t = new Date(e);
  return isNaN(t.getTime()) ? e : t.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function _e(e) {
  return e.split(/\s+/).map((t) => t[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function U({ item: e, onUpdateItem: t }) {
  const [n, a] = D(!1), o = Ue[e.status], d = e.dueDate && e.status === "pending" ? Oe(e.dueDate) : !1, s = e.status === "done" || e.status === "acked";
  return /* @__PURE__ */ u(
    "div",
    {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      className: "flex items-center gap-2 py-1.5 border-b border-border-subtle",
      style: { opacity: s ? 0.65 : 1 },
      children: [
        /* @__PURE__ */ r(
          "span",
          {
            title: `Priority: ${e.priority}`,
            style: {
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: Pe[e.priority],
              flexShrink: 0
            }
          }
        ),
        /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            title: `Status: ${e.status}${t ? " — click to toggle done" : ""}`,
            onClick: () => {
              if (!t) return;
              const i = e.status === "done" ? "pending" : "done";
              t(e.id, { status: i });
            },
            style: {
              width: 18,
              height: 18,
              borderRadius: "50%",
              border: `2px solid ${o.color}`,
              background: s ? o.color : "transparent",
              cursor: t ? "pointer" : "default",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0
            },
            children: s && /* @__PURE__ */ r("svg", { width: "9", height: "9", viewBox: "0 0 10 10", fill: "none", children: /* @__PURE__ */ r("polyline", { points: "2,5 4,7.5 8,2.5", stroke: "#fff", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) })
          }
        ),
        /* @__PURE__ */ r("span", { className: l("flex-1 text-[13px] leading-[1.4]", s ? "text-text-tertiary line-through" : "text-text-primary"), children: e.text || /* @__PURE__ */ r("span", { className: "text-text-disabled italic", children: "Untitled item" }) }),
        e.assignee && /* @__PURE__ */ r(
          "span",
          {
            title: e.assignee,
            className: "w-[22px] h-[22px] rounded-full bg-primary-bg text-primary-fg text-[9px] font-bold flex items-center justify-center shrink-0",
            children: _e(e.assignee)
          }
        ),
        e.dueDate && /* @__PURE__ */ u("span", { style: {
          fontSize: 10,
          fontWeight: 600,
          padding: "1px 6px",
          borderRadius: 10,
          background: d ? "#fef2f2" : "#f0f9ff",
          color: d ? "#dc2626" : "#64748b",
          border: d ? "1px solid #fecaca" : "1px solid #e0f2fe",
          whiteSpace: "nowrap",
          flexShrink: 0
        }, children: [
          d ? "⚠ " : "",
          ze(e.dueDate)
        ] }),
        t && n && /* @__PURE__ */ u(
          "select",
          {
            value: e.status,
            onChange: (i) => t(e.id, { status: i.target.value }),
            onClick: (i) => i.stopPropagation(),
            style: {
              fontSize: 10,
              padding: "1px 4px",
              borderRadius: 6,
              border: `1px solid ${o.color}`,
              background: o.bg,
              color: o.color,
              fontWeight: 600,
              cursor: "pointer",
              outline: "none",
              fontFamily: "inherit",
              flexShrink: 0
            },
            children: [
              /* @__PURE__ */ r("option", { value: "pending", children: "pending" }),
              /* @__PURE__ */ r("option", { value: "acked", children: "acked" }),
              /* @__PURE__ */ r("option", { value: "done", children: "done" }),
              /* @__PURE__ */ r("option", { value: "rejected", children: "rejected" })
            ]
          }
        )
      ]
    }
  );
}
function Z({ section: e, onUpdateItem: t, onNavigateToEditor: n }) {
  const a = e.items;
  if (a.length === 0)
    return /* @__PURE__ */ r("div", { className: "text-text-tertiary italic text-[13px] py-1", children: "No items." });
  const o = a.filter((i) => i.status === "pending"), d = a.filter((i) => i.status === "done" || i.status === "acked"), s = a.filter((i) => i.status === "rejected");
  return /* @__PURE__ */ u("div", { children: [
    o.length > 0 && /* @__PURE__ */ r("div", { className: "mb-1", children: o.map((i) => /* @__PURE__ */ r(U, { item: i, onUpdateItem: t }, i.id)) }),
    d.length > 0 && /* @__PURE__ */ r("div", { className: "mb-1", children: d.map((i) => /* @__PURE__ */ r(U, { item: i, onUpdateItem: t }, i.id)) }),
    s.length > 0 && /* @__PURE__ */ r("div", { children: s.map((i) => /* @__PURE__ */ r(U, { item: i, onUpdateItem: t }, i.id)) }),
    n && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: () => n(e.id),
        className: "mt-1.5 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
        children: "Edit in editor →"
      }
    )
  ] });
}
function Me({ item: e, editable: t, autoFocus: n, onDidAutoFocus: a, onUpdate: o, onRemove: d }) {
  const s = S(null), i = e.status === "done";
  return A(() => {
    n && s.current && (s.current.focus(), a?.());
  }, [n, a]), /* @__PURE__ */ u("div", { className: "flex items-center gap-2 py-[5px] border-b border-border-subtle", children: [
    /* @__PURE__ */ r(
      "input",
      {
        type: "checkbox",
        checked: i,
        onChange: () => o({ status: i ? "pending" : "done" }),
        disabled: !t,
        className: l("w-[15px] h-[15px] accent-success shrink-0", t ? "cursor-pointer" : "cursor-default")
      }
    ),
    /* @__PURE__ */ r(
      "input",
      {
        ref: s,
        type: "text",
        value: e.text,
        onChange: (m) => o({ text: m.target.value }),
        readOnly: !t,
        placeholder: "Checklist item...",
        className: l(
          "flex-1 border-none outline-none text-sm font-inherit bg-transparent px-1 py-0.5",
          i ? "text-text-tertiary line-through" : "text-text-primary"
        )
      }
    ),
    t && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: d,
        className: "border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 leading-none",
        children: "×"
      }
    )
  ] });
}
function Ve({
  section: e,
  fragment: t,
  ydoc: n,
  provider: a,
  user: o,
  editable: d,
  onAddItem: s,
  onUpdateItem: i,
  onRemoveItem: m,
  onUpdateCursorInfo: c
}) {
  const h = S(!1), x = () => {
    s?.({ text: "", status: "pending", assignee: "", ackedBy: "", ackedAt: "", priority: "medium", notes: "" }), h.current = !0;
  }, f = e.items.length, N = e.items.filter((v) => v.status === "done").length;
  return /* @__PURE__ */ u("div", { children: [
    t && n && /* @__PURE__ */ r(
      E,
      {
        fragment: t,
        ydoc: n,
        provider: a ?? null,
        user: o ?? { name: "Anonymous", color: "#6b7280" },
        editable: d,
        placeholder: e.placeholder ?? "Add notes or context...",
        sectionId: e.id,
        onUpdateCursorInfo: c
      }
    ),
    f > 0 && /* @__PURE__ */ u("div", { className: "text-[11px] text-neutral font-semibold mb-1.5", children: [
      N,
      " / ",
      f,
      " done"
    ] }),
    /* @__PURE__ */ r("div", { children: e.items.map((v, y) => {
      const p = y === e.items.length - 1, g = h.current && p;
      return /* @__PURE__ */ r(
        Me,
        {
          item: v,
          editable: d,
          autoFocus: g,
          onDidAutoFocus: g ? () => {
            h.current = !1;
          } : void 0,
          onUpdate: (w) => i?.(v.id, w),
          onRemove: () => m?.(v.id)
        },
        v.id
      );
    }) }),
    d && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: x,
        className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit",
        children: "+ Add item"
      }
    )
  ] });
}
function ee({
  section: e,
  fragment: t,
  ydoc: n,
  provider: a,
  onUpdateItem: o,
  onNavigateToEditor: d
}) {
  const s = e.items, i = s.length, m = s.filter((h) => h.status === "done").length, c = i > 0 ? Math.round(m / i * 100) : 0;
  return /* @__PURE__ */ u("div", { children: [
    t && n && /* @__PURE__ */ r("div", { className: "mb-2.5", children: /* @__PURE__ */ r(
      E,
      {
        fragment: t,
        ydoc: n,
        provider: a ?? null,
        user: { name: "", color: "#6b7280" },
        editable: !1,
        sectionId: e.id
      }
    ) }),
    i > 0 && /* @__PURE__ */ u("div", { className: "mb-2.5", children: [
      /* @__PURE__ */ u("div", { className: "flex justify-between mb-1", children: [
        /* @__PURE__ */ u("span", { className: "text-[11px] text-neutral font-semibold", children: [
          m,
          " / ",
          i,
          " done"
        ] }),
        /* @__PURE__ */ u("span", { className: l("text-[11px] font-semibold", c === 100 ? "text-success-fg" : "text-neutral"), children: [
          c,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ r("div", { className: "h-1 bg-border rounded-sm overflow-hidden", children: /* @__PURE__ */ r(
        "div",
        {
          className: l("h-full rounded-sm transition-[width] duration-300", c === 100 ? "bg-success" : "bg-info"),
          style: { width: `${c}%` }
        }
      ) })
    ] }),
    i === 0 ? /* @__PURE__ */ r("div", { className: "text-text-tertiary italic text-[13px]", children: "No items." }) : /* @__PURE__ */ r("div", { children: s.map((h) => {
      const x = h.status === "done";
      return /* @__PURE__ */ u(
        "div",
        {
          className: "flex items-center gap-2 py-[5px] border-b border-border-subtle",
          children: [
            /* @__PURE__ */ r(
              "input",
              {
                type: "checkbox",
                checked: x,
                onChange: () => o?.(h.id, { status: x ? "pending" : "done" }),
                className: l("w-3.5 h-3.5 accent-success shrink-0", o ? "cursor-pointer" : "cursor-default"),
                readOnly: !o
              }
            ),
            /* @__PURE__ */ r("span", { className: l("text-[13px] flex-1 leading-[1.4]", x ? "text-text-tertiary line-through" : "text-text-primary"), children: h.text || /* @__PURE__ */ r("span", { className: "text-text-disabled italic", children: "Untitled" }) })
          ]
        },
        h.id
      );
    }) }),
    d && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: () => d(e.id),
        className: "mt-2 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
        children: "Edit in editor →"
      }
    )
  ] });
}
const He = {
  acked: "approved",
  done: "approved",
  rejected: "rejected"
};
function Ke() {
  return "";
}
function We() {
  if (typeof window > "u") return null;
  const e = window.location.pathname.match(/\/documents\/([^/?#]+)/);
  return e ? e[1] : null;
}
function Ge(e) {
  return He[e] ?? null;
}
async function Je(e) {
  const t = e.documentId ?? We();
  if (!t) return { ok: !1, error: "no documentId in URL" };
  try {
    const n = { "Content-Type": "application/json" };
    e.idToken && (n.Authorization = `Bearer ${e.idToken}`);
    const a = await fetch(`${Ke()}/api/approvals`, {
      method: "POST",
      headers: n,
      body: JSON.stringify({
        documentId: t,
        sectionId: e.sectionId,
        decision: e.decision,
        ...e.reviewerName ? { reviewerName: e.reviewerName } : {},
        ...e.comment ? { comment: e.comment } : {}
      })
    });
    return a.ok ? { ok: !0 } : { ok: !1, error: `POST failed: ${a.status}` };
  } catch (n) {
    return { ok: !1, error: n.message };
  }
}
const q = {
  pending: { label: "Open", icon: "○", color: "#92400e", bg: "#fef3c7" },
  acked: { label: "Decided", icon: "✓", color: "#065f46", bg: "#d1fae5" },
  done: { label: "Decided", icon: "✓", color: "#065f46", bg: "#d1fae5" },
  rejected: { label: "Vetoed", icon: "✕", color: "#991b1b", bg: "#fee2e2" }
};
function qe({ item: e, editable: t, autoFocus: n, onDidAutoFocus: a, onUpdate: o, onRemove: d }) {
  const s = S(null), i = q[e.status] ?? q.pending;
  return A(() => {
    n && s.current && (s.current.focus(), a?.());
  }, [n, a]), /* @__PURE__ */ u("div", { className: "flex items-center gap-2 py-1.5 border-b border-border-subtle", children: [
    /* @__PURE__ */ r(
      "span",
      {
        className: "w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 select-none",
        style: { background: i.bg, color: i.color },
        children: i.icon
      }
    ),
    /* @__PURE__ */ r(
      "input",
      {
        ref: s,
        type: "text",
        value: e.text,
        onChange: (m) => o({ text: m.target.value }),
        readOnly: !t,
        placeholder: "Describe the decision...",
        className: l(
          "flex-1 border-none outline-none text-sm font-inherit bg-transparent px-1 py-0.5",
          e.status === "rejected" ? "text-text-tertiary line-through" : "text-text-primary"
        )
      }
    ),
    t && /* @__PURE__ */ u(
      "select",
      {
        value: e.status === "done" ? "acked" : e.status,
        onChange: (m) => o({ status: m.target.value }),
        className: "text-[10px] px-2 py-0.5 rounded-[10px] font-semibold cursor-pointer outline-none font-inherit shrink-0 appearance-none",
        style: {
          border: `1px solid ${i.color}`,
          background: i.bg,
          color: i.color
        },
        children: [
          /* @__PURE__ */ r("option", { value: "pending", children: "Open" }),
          /* @__PURE__ */ r("option", { value: "acked", children: "Decided" }),
          /* @__PURE__ */ r("option", { value: "rejected", children: "Vetoed" })
        ]
      }
    ),
    t && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: d,
        className: "border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 leading-none",
        children: "×"
      }
    )
  ] });
}
function Ye({
  section: e,
  fragment: t,
  ydoc: n,
  provider: a,
  user: o,
  editable: d,
  onAddItem: s,
  onUpdateItem: i,
  onRemoveItem: m,
  onUpdateCursorInfo: c
}) {
  const h = S(!1), x = () => {
    s?.({ text: "", status: "pending", assignee: "", ackedBy: "", ackedAt: "", priority: "medium", notes: "" }), h.current = !0;
  };
  return /* @__PURE__ */ u("div", { children: [
    t && n && /* @__PURE__ */ r(
      E,
      {
        fragment: t,
        ydoc: n,
        provider: a ?? null,
        user: o ?? { name: "Anonymous", color: "#6b7280" },
        editable: d,
        placeholder: e.placeholder ?? "Add context or background...",
        sectionId: e.id,
        onUpdateCursorInfo: c
      }
    ),
    e.items.length === 0 && !d && /* @__PURE__ */ r("div", { className: "text-text-tertiary italic text-[13px] py-1", children: "No decisions yet." }),
    /* @__PURE__ */ r("div", { children: e.items.map((f, N) => {
      const v = N === e.items.length - 1, y = h.current && v;
      return /* @__PURE__ */ r(
        qe,
        {
          item: f,
          editable: d,
          autoFocus: y,
          onDidAutoFocus: y ? () => {
            h.current = !1;
          } : void 0,
          onUpdate: (p) => {
            const g = f.status;
            if (i?.(f.id, p), p.status && p.status !== g) {
              const w = Ge(p.status);
              w && Je({
                sectionId: e.id,
                decision: w,
                reviewerName: o?.name
              });
            }
          },
          onRemove: () => m?.(f.id)
        },
        f.id
      );
    }) }),
    d && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: x,
        className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit",
        children: "+ Add decision"
      }
    )
  ] });
}
const Y = {
  pending: { label: "Open", icon: "○", color: "#92400e", bg: "#fef3c7" },
  acked: { label: "Decided", icon: "✓", color: "#065f46", bg: "#d1fae5" },
  done: { label: "Decided", icon: "✓", color: "#065f46", bg: "#d1fae5" },
  rejected: { label: "Vetoed", icon: "✕", color: "#991b1b", bg: "#fee2e2" }
};
function Qe({ item: e }) {
  const t = Y[e.status] ?? Y.pending;
  return /* @__PURE__ */ u("div", { className: "flex items-start gap-2 py-1.5 border-b border-border-subtle", children: [
    /* @__PURE__ */ r(
      "span",
      {
        className: "w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 select-none",
        style: { background: t.bg, color: t.color },
        children: t.icon
      }
    ),
    /* @__PURE__ */ r("span", { className: l(
      "flex-1 text-[13px] leading-[1.4]",
      e.status === "rejected" ? "text-text-tertiary line-through" : "text-text-primary"
    ), children: e.text || /* @__PURE__ */ r("span", { className: "text-text-disabled italic", children: "Untitled decision" }) }),
    /* @__PURE__ */ r(
      "span",
      {
        className: "text-[10px] font-semibold px-2 py-0.5 rounded-[10px] whitespace-nowrap shrink-0",
        style: { background: t.bg, color: t.color },
        children: t.label
      }
    )
  ] });
}
function P({ label: e, color: t, items: n }) {
  return /* @__PURE__ */ u("div", { className: "mb-2", children: [
    /* @__PURE__ */ r("div", { className: "text-[10px] font-bold uppercase tracking-[0.05em] mb-0.5", style: { color: t }, children: e }),
    n.map((a) => /* @__PURE__ */ r(Qe, { item: a }, a.id))
  ] });
}
function te({ section: e, onNavigateToEditor: t }) {
  const n = e.items;
  if (n.length === 0)
    return /* @__PURE__ */ r("div", { className: "text-text-tertiary italic text-[13px] py-1", children: "No decisions recorded." });
  const a = n.filter((s) => s.status === "pending"), o = n.filter((s) => s.status === "acked" || s.status === "done"), d = n.filter((s) => s.status === "rejected");
  return /* @__PURE__ */ u("div", { children: [
    a.length > 0 && /* @__PURE__ */ r(P, { label: "Open", color: "#92400e", items: a }),
    o.length > 0 && /* @__PURE__ */ r(P, { label: "Decided", color: "#065f46", items: o }),
    d.length > 0 && /* @__PURE__ */ r(P, { label: "Vetoed", color: "#991b1b", items: d }),
    t && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: () => t(e.id),
        className: "mt-1.5 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
        children: "Edit in editor →"
      }
    )
  ] });
}
function Xe(e) {
  return e.metadata ?? {};
}
function Ze({
  section: e,
  editable: t,
  onUpdateSection: n
}) {
  const a = Xe(e), [o, d] = D(!1), s = (m) => {
    d(!0);
    const c = new FileReader();
    c.onload = () => {
      n?.({
        metadata: {
          ...e.metadata ?? {},
          fileName: m.name,
          fileDataUrl: typeof c.result == "string" ? c.result : "",
          fileSize: m.size
        }
      }), d(!1);
    }, c.onerror = () => d(!1), c.readAsDataURL(m);
  }, i = () => {
    n?.({
      metadata: {
        ...e.metadata ?? {},
        fileName: void 0,
        fileDataUrl: void 0,
        fileSize: void 0
      }
    });
  };
  return /* @__PURE__ */ r("div", { "data-testid": `file-upload-editor-${e.id}`, children: a.fileName ? /* @__PURE__ */ u("div", { className: "flex items-center gap-2.5 px-3 py-2 rounded-md bg-surface-panel border border-border text-[13px]", children: [
    /* @__PURE__ */ r("span", { className: "text-base", children: "📎" }),
    /* @__PURE__ */ r("span", { className: "flex-1 font-medium text-text-primary", children: a.fileName }),
    typeof a.fileSize == "number" && /* @__PURE__ */ u("span", { className: "text-[11px] text-text-tertiary", children: [
      (a.fileSize / 1024).toFixed(1),
      " kB"
    ] }),
    t && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        "data-testid": `file-upload-remove-${e.id}`,
        onClick: i,
        className: "border-none bg-transparent text-danger-fg cursor-pointer text-sm px-1.5 py-0.5",
        children: "×"
      }
    )
  ] }) : /* @__PURE__ */ u(
    "label",
    {
      "data-testid": `file-upload-empty-${e.id}`,
      className: l(
        "block px-4 py-3.5 border border-dashed border-border-emphasis rounded-lg text-neutral text-[13px] text-center bg-surface-inset",
        t ? "cursor-pointer" : "cursor-default"
      ),
      children: [
        o ? "Reading file…" : e.placeholder ?? "Click to upload a file",
        /* @__PURE__ */ r(
          "input",
          {
            type: "file",
            "data-testid": `file-upload-input-${e.id}`,
            disabled: !t,
            className: "hidden",
            onChange: (m) => {
              const c = m.target.files?.[0];
              c && s(c);
            }
          }
        )
      ]
    }
  ) });
}
function re({ section: e }) {
  const t = e.metadata ?? {};
  return t.fileName ? /* @__PURE__ */ u(
    "div",
    {
      "data-testid": `file-upload-reader-${e.id}`,
      className: "flex items-center gap-2.5 px-3 py-2 rounded-md bg-surface-panel border border-border text-[13px]",
      children: [
        /* @__PURE__ */ r("span", { className: "text-base", children: "📎" }),
        /* @__PURE__ */ u(
          "a",
          {
            href: t.fileDataUrl ?? "#",
            download: t.fileName,
            "data-testid": `file-upload-link-${e.id}`,
            className: "text-primary font-medium no-underline",
            children: [
              "Download ",
              t.fileName
            ]
          }
        ),
        typeof t.fileSize == "number" && /* @__PURE__ */ u("span", { className: "text-[11px] text-text-tertiary", children: [
          "(",
          (t.fileSize / 1024).toFixed(1),
          " kB)"
        ] })
      ]
    }
  ) : /* @__PURE__ */ r("div", { "data-testid": `file-upload-reader-empty-${e.id}`, className: "text-text-tertiary text-[13px] italic", children: "No file uploaded." });
}
function et({
  section: e,
  editable: t,
  onUpdateSection: n
}) {
  const a = e.metadata ?? {}, [o, d] = D(!1), s = (c) => {
    d(!0);
    const h = new FileReader();
    h.onload = () => {
      n?.({
        metadata: {
          ...e.metadata ?? {},
          imageDataUrl: typeof h.result == "string" ? h.result : "",
          alt: a.alt ?? c.name
        }
      }), d(!1);
    }, h.onerror = () => d(!1), h.readAsDataURL(c);
  }, i = (c) => {
    n?.({
      metadata: { ...e.metadata ?? {}, alt: c }
    });
  }, m = () => {
    n?.({
      metadata: { ...e.metadata ?? {}, imageDataUrl: void 0, alt: void 0 }
    });
  };
  return /* @__PURE__ */ r("div", { "data-testid": `diagram-editor-${e.id}`, children: a.imageDataUrl ? /* @__PURE__ */ u("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ r(
      "img",
      {
        "data-testid": `diagram-image-${e.id}`,
        src: a.imageDataUrl,
        alt: a.alt ?? "",
        className: "max-w-full max-h-[320px] rounded-md border border-border"
      }
    ),
    t && /* @__PURE__ */ u("div", { className: "flex gap-2 items-center", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "text",
          "data-testid": `diagram-alt-${e.id}`,
          value: a.alt ?? "",
          placeholder: "Alt text",
          onChange: (c) => i(c.target.value),
          className: "flex-1 px-2 py-1 text-xs border border-border-emphasis rounded"
        }
      ),
      /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          "data-testid": `diagram-remove-${e.id}`,
          onClick: m,
          className: "bg-transparent border-none text-danger-fg cursor-pointer text-[13px]",
          children: "Remove"
        }
      )
    ] })
  ] }) : /* @__PURE__ */ u(
    "label",
    {
      "data-testid": `diagram-empty-${e.id}`,
      className: l(
        "block px-4 py-3.5 border border-dashed border-border-emphasis rounded-lg text-neutral text-[13px] text-center bg-surface-inset",
        t ? "cursor-pointer" : "cursor-default"
      ),
      children: [
        o ? "Reading image…" : e.placeholder ?? "Upload an image (PNG / JPG / SVG)",
        /* @__PURE__ */ r(
          "input",
          {
            type: "file",
            accept: "image/*",
            "data-testid": `diagram-input-${e.id}`,
            disabled: !t,
            className: "hidden",
            onChange: (c) => {
              const h = c.target.files?.[0];
              h && s(h);
            }
          }
        )
      ]
    }
  ) });
}
function ne({ section: e }) {
  const t = e.metadata ?? {};
  return t.imageDataUrl ? /* @__PURE__ */ u("figure", { "data-testid": `diagram-reader-${e.id}`, className: "m-0", children: [
    /* @__PURE__ */ r(
      "img",
      {
        src: t.imageDataUrl,
        alt: t.alt ?? "",
        className: "max-w-full max-h-[480px] rounded-md border border-border"
      }
    ),
    t.alt && /* @__PURE__ */ r("figcaption", { className: "text-[11px] text-text-tertiary mt-1 text-center", children: t.alt })
  ] }) : /* @__PURE__ */ r("div", { "data-testid": `diagram-reader-empty-${e.id}`, className: "text-text-tertiary text-[13px] italic", children: "No diagram uploaded." });
}
function tt(e) {
  const t = e.metadata ?? {};
  return Array.isArray(t.links) ? t.links : [];
}
function rt({
  section: e,
  editable: t,
  onUpdateSection: n
}) {
  const a = tt(e), o = (m) => {
    n?.({
      metadata: { ...e.metadata ?? {}, links: m }
    });
  }, d = () => o([...a, { label: "", url: "" }]), s = (m, c) => {
    o(a.map((h, x) => x === m ? { ...h, ...c } : h));
  }, i = (m) => {
    o(a.filter((c, h) => h !== m));
  };
  return /* @__PURE__ */ u("div", { "data-testid": `link-block-editor-${e.id}`, className: "flex flex-col gap-1.5", children: [
    a.length === 0 && /* @__PURE__ */ r(
      "div",
      {
        "data-testid": `link-block-empty-${e.id}`,
        className: "text-text-tertiary text-xs italic py-1",
        children: "No links yet."
      }
    ),
    a.map((m, c) => /* @__PURE__ */ u("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "text",
          "data-testid": `link-block-label-${e.id}-${c}`,
          value: m.label,
          placeholder: "Label",
          onChange: (h) => s(c, { label: h.target.value }),
          disabled: !t,
          className: "flex-1 px-2 py-1 text-[13px] border border-border-emphasis rounded"
        }
      ),
      /* @__PURE__ */ r(
        "input",
        {
          type: "url",
          "data-testid": `link-block-url-${e.id}-${c}`,
          value: m.url,
          placeholder: "https://example.com",
          onChange: (h) => s(c, { url: h.target.value }),
          disabled: !t,
          className: "flex-[2] px-2 py-1 text-[13px] border border-border-emphasis rounded"
        }
      ),
      t && /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          "data-testid": `link-block-remove-${e.id}-${c}`,
          onClick: () => i(c),
          className: "border-none bg-transparent text-danger-fg cursor-pointer text-sm px-1.5 py-0.5",
          children: "×"
        }
      )
    ] }, c)),
    t && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        "data-testid": `link-block-add-${e.id}`,
        onClick: d,
        className: "self-start mt-1 px-3 py-1 text-xs bg-transparent border border-dashed border-border-emphasis text-primary rounded-md cursor-pointer",
        children: "+ Add link"
      }
    )
  ] });
}
function ae({ section: e }) {
  const t = e.metadata ?? {}, n = Array.isArray(t.links) ? t.links.filter((a) => a.url) : [];
  return n.length === 0 ? /* @__PURE__ */ r(
    "div",
    {
      "data-testid": `link-block-reader-empty-${e.id}`,
      className: "text-text-tertiary text-[13px] italic",
      children: "No links."
    }
  ) : /* @__PURE__ */ r(
    "ul",
    {
      "data-testid": `link-block-reader-${e.id}`,
      className: "list-none m-0 p-0 flex flex-col gap-1",
      children: n.map((a, o) => /* @__PURE__ */ r("li", { className: "text-[13px]", children: /* @__PURE__ */ r(
        "a",
        {
          href: a.url,
          target: "_blank",
          rel: "noreferrer noopener",
          className: "text-primary font-medium no-underline",
          children: a.label || a.url
        }
      ) }, o))
    }
  );
}
T(ge);
T(ye);
T(ke);
T(ve);
T(Ne);
T(we);
T(Ce);
k("*", "*", Ie);
k("rich-text", "editor", Be);
k("rich-text", "ack", X);
k("rich-text", "reader", X);
k("tasks", "editor", Fe);
k("tasks", "ack", Z);
k("tasks", "reader", Z);
k("checklist", "editor", Ve);
k("checklist", "ack", ee);
k("checklist", "reader", ee);
k("decisions", "editor", Ye);
k("decisions", "ack", te);
k("decisions", "reader", te);
k("file-upload", "editor", Ze);
k("file-upload", "ack", re);
k("file-upload", "reader", re);
k("diagram", "editor", et);
k("diagram", "ack", ne);
k("diagram", "reader", ne);
k("link-block", "editor", rt);
k("link-block", "ack", ae);
k("link-block", "reader", ae);
function vt({ open: e, onClose: t, onCreate: n }) {
  const [a, o] = D([]), [d, s] = D(null), [i, m] = D(""), [c, h] = D(""), x = S(null);
  if (A(() => {
    if (!e) return;
    const p = fe();
    o(p), s(p[0]?.id ?? null), m(""), h("");
    const g = setTimeout(() => x.current?.focus(), 50);
    return () => clearTimeout(g);
  }, [e]), !e) return null;
  const f = a.find((p) => p.id === d), N = () => {
    const p = i.trim();
    !p || !f || (n({
      title: p,
      type: f.name,
      description: c.trim() || void 0,
      icon: f.icon,
      documentTypeId: f.id
    }), t());
  }, v = (p) => {
    p.key === "Enter" && !p.shiftKey && i.trim() && f && N();
  }, y = !!i.trim() && !!f;
  return /* @__PURE__ */ r(
    xe,
    {
      open: e,
      onClose: t,
      maxWidth: 560,
      zIndex: 1e4,
      rawChildren: !0,
      backdropStyle: { background: "rgba(15,23,42,0.5)", backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)" },
      cardStyle: {
        border: "1px solid #e2e8f0",
        borderRadius: 8,
        maxHeight: "90vh",
        width: "90vw",
        boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        padding: 0
      },
      children: /* @__PURE__ */ u("div", { onKeyDown: v, className: "contents", children: [
        /* @__PURE__ */ r("h2", { className: l("m-0 px-6 pt-6 pb-4 text-lg font-bold text-text-primary shrink-0"), children: "Create New Document" }),
        /* @__PURE__ */ r("div", { className: l("flex-1 overflow-y-auto px-6 min-h-0"), children: a.length === 0 ? /* @__PURE__ */ u("div", { className: l("text-center px-4 py-8 border border-dashed border-border-field rounded-lg mb-5 text-neutral"), children: [
          /* @__PURE__ */ r("div", { className: l("text-[40px] mb-3"), children: "📋" }),
          /* @__PURE__ */ r("div", { className: l("text-[15px] font-semibold mb-2 text-text-primary"), children: "No document types defined yet" }),
          /* @__PURE__ */ u("div", { className: l("text-[13px] text-text-tertiary max-w-xs mx-auto mb-4"), children: [
            "Document types define the sections and structure of your documents. Create one first in ",
            /* @__PURE__ */ r("strong", { children: "☰ → Document Types" }),
            "."
          ] }),
          /* @__PURE__ */ r(
            "button",
            {
              onClick: t,
              className: l("px-5 py-2 text-[13px] font-semibold bg-primary text-white border-none rounded-[7px] cursor-pointer font-[inherit]"),
              children: "Close"
            }
          )
        ] }) : /* @__PURE__ */ u(z, { children: [
          /* @__PURE__ */ u("div", { className: l("mb-5"), children: [
            /* @__PURE__ */ r("label", { className: l("block text-[13px] font-semibold text-text-secondary mb-2"), children: "Document Type" }),
            /* @__PURE__ */ r("div", { className: l("grid grid-cols-2 gap-2"), children: a.map((p) => {
              const g = d === p.id;
              return /* @__PURE__ */ u(
                "button",
                {
                  "data-testid": `type-option-${p.id}`,
                  onClick: () => s(p.id),
                  className: l(
                    "flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]",
                    g ? "bg-info-bg border-2 border-info" : "bg-white border-2 border-border hover:bg-surface-panel"
                  ),
                  children: [
                    /* @__PURE__ */ r("span", { className: l("text-2xl shrink-0"), children: p.icon }),
                    /* @__PURE__ */ u("div", { className: l("min-w-0"), children: [
                      /* @__PURE__ */ r("div", { className: l("text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"), children: p.name }),
                      p.description && /* @__PURE__ */ r("div", { className: l("text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2"), children: p.description }),
                      /* @__PURE__ */ u("div", { className: l("text-[11px] text-text-tertiary mt-0.5"), children: [
                        p.fields.length,
                        " section",
                        p.fields.length !== 1 ? "s" : ""
                      ] })
                    ] }),
                    g && /* @__PURE__ */ r("span", { className: l("absolute top-1.5 right-2 text-sm text-info-fg font-bold"), children: "✓" })
                  ]
                },
                p.id
              );
            }) })
          ] }),
          /* @__PURE__ */ u("div", { className: l("mb-4"), children: [
            /* @__PURE__ */ u("label", { className: l("block text-[13px] font-semibold text-text-secondary mb-1"), children: [
              "Title ",
              /* @__PURE__ */ r("span", { className: l("text-danger-fg"), children: "*" })
            ] }),
            /* @__PURE__ */ r(
              O,
              {
                ref: x,
                "data-testid": "new-doc-title",
                value: i,
                onChange: (p) => m(p.target.value),
                placeholder: f ? `e.g. Q2 ${f.name}` : "Document title…"
              }
            )
          ] }),
          /* @__PURE__ */ u("div", { className: l("mb-5"), children: [
            /* @__PURE__ */ u("label", { className: l("block text-[13px] font-semibold text-text-secondary mb-1"), children: [
              "Description ",
              /* @__PURE__ */ r("span", { className: l("text-text-tertiary font-normal"), children: "(optional)" })
            ] }),
            /* @__PURE__ */ r(
              be,
              {
                "data-testid": "new-doc-description",
                value: c,
                onChange: (p) => h(p.target.value),
                placeholder: "Brief description of this document…",
                rows: 3,
                className: l("resize-y")
              }
            )
          ] })
        ] }) }),
        a.length > 0 && /* @__PURE__ */ u("div", { className: l("flex justify-end gap-2 px-6 py-4 border-t border-border bg-white shrink-0"), children: [
          /* @__PURE__ */ r(
            "button",
            {
              "data-testid": "new-doc-cancel",
              onClick: t,
              className: l("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-white text-text-secondary cursor-pointer font-[inherit]"),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ r(
            "button",
            {
              "data-testid": "new-doc-submit",
              onClick: N,
              disabled: !y,
              className: l(
                "px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]",
                y ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"
              ),
              children: "Create Document"
            }
          )
        ] })
      ] })
    }
  );
}
export {
  Ie as D,
  Re as E,
  vt as N,
  E as T,
  je as a,
  Q as b
};
