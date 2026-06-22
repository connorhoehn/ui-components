import { r as L, a as v } from "./registry-qR57lair.js";
import { jsx as t, jsxs as u, Fragment as P } from "react/jsx-runtime";
import { useMemo as ne, useState as R, useRef as A, useEffect as S, useCallback as E } from "react";
import { useEditor as ae, EditorContent as ie } from "@tiptap/react";
import oe from "@tiptap/starter-kit";
import se from "@tiptap/extension-task-list";
import le from "@tiptap/extension-task-item";
import de from "@tiptap/extension-placeholder";
import ce from "@tiptap/extension-collaboration";
import * as z from "yjs";
import { ySyncPluginKey as _, relativePositionToAbsolutePosition as M, absolutePositionToRelativePosition as V } from "@tiptap/y-tiptap";
import { c as s } from "./cn-B6yFEsav.js";
import { D as H, q as ue } from "./useWebSocket-Bn4OeUor.js";
import { l as pe } from "./useDocumentTypes-C29MkgPl.js";
import { M as he } from "./Modal-2jg4229_.js";
const fe = {
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
}, me = {
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
}, xe = {
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
}, be = {
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
}, ge = {
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
}, ye = {
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
}, ke = {
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
}, ve = [
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
function Ne({ editor: e }) {
  return e ? /* @__PURE__ */ t("div", { className: s("flex flex-wrap gap-1 px-2 py-1.5 border-b border-border bg-[#f8fafc] rounded-t-lg"), children: ve.map((r) => {
    const n = r.isActive(e);
    return /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: () => r.action(e),
        className: s(
          "px-2 py-1 text-xs font-[inherit] border border-[#cbd5e1] rounded cursor-pointer leading-snug",
          n ? "bg-[#3b82f6] text-white" : "bg-white text-[#334155]"
        ),
        title: r.label,
        children: r.label
      },
      r.label
    );
  }) }) : null;
}
const we = console.warn;
console.warn = (...e) => {
  typeof e[0] == "string" && e[0].includes("extension-collaboration") || we(...e);
};
function j(e, r, n) {
  try {
    if (r < 0 || r > e.state.doc.content.size) return null;
    const a = e.coordsAtPos(r), d = (n || e.dom).getBoundingClientRect();
    return {
      top: a.top - d.top,
      left: a.left - d.left,
      height: a.bottom - a.top
    };
  } catch {
    return null;
  }
}
function Ce({ cursors: e, editorView: r, containerEl: n }) {
  return r ? /* @__PURE__ */ t(P, { children: e.map((a) => {
    if (a.head == null) return null;
    const o = j(r, a.head, n);
    if (!o) return null;
    const d = a.name.split(" ").map((i) => i[0] ?? "").join("").toUpperCase().slice(0, 2) || a.name.slice(0, 2).toUpperCase(), l = [];
    if (a.anchor != null && a.anchor !== a.head) {
      const i = Math.min(a.anchor, a.head), p = Math.max(a.anchor, a.head);
      try {
        const f = r.dom.offsetWidth;
        let x = i;
        for (; x <= p; ) {
          const m = j(r, x, n);
          if (!m) break;
          let N = x;
          const g = m.top;
          for (let h = x + 1; h <= p; h++) {
            const y = j(r, h, n);
            if (!y || Math.abs(y.top - g) > 2) break;
            N = h;
          }
          const k = j(r, N, n);
          if (k) {
            const h = x === i ? m.left : 0, y = N === p ? k.left + 4 : f;
            l.push(
              /* @__PURE__ */ t(
                "div",
                {
                  className: "absolute rounded-sm pointer-events-none opacity-[0.12] z-[5]",
                  style: {
                    top: g,
                    left: h,
                    width: Math.max(y - h, 4),
                    height: m.height || 18,
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
      l,
      /* @__PURE__ */ t(
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
      /* @__PURE__ */ t(
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
      /* @__PURE__ */ t(
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
function T({
  fragment: e,
  ydoc: r,
  provider: n,
  user: a,
  editable: o = !0,
  placeholder: d = "Start typing...",
  sectionId: l,
  onUpdateCursorInfo: i
}) {
  const p = ne(() => [
    oe.configure({ history: !1 }),
    se,
    le.configure({ nested: !0 }),
    de.configure({ placeholder: d }),
    ce.configure({ document: r, fragment: e })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [r, e]), c = ae({
    extensions: p,
    editable: o
  }, [p]), [f, x] = R([]), m = A(null);
  S(() => {
    if (i)
      i(a.name, a.color);
    else if (n?.awareness) {
      const k = n.awareness.getLocalState()?.user || {};
      n.awareness.setLocalStateField("user", {
        ...k,
        name: a.name,
        color: a.color
      });
    }
  }, [n, a, i]);
  const N = E(() => {
    if (!n?.awareness || !c?.view) return;
    const g = n.awareness.getStates(), k = n.awareness.clientID, h = [];
    g.forEach((y, C) => {
      if (C === k) return;
      const w = y.user;
      if (!(!w || !y.cursor) && !(l && y.cursor.sectionId !== l))
        try {
          const D = _.getState(c.view.state);
          if (!D?.type || !D?.binding?.mapping) return;
          const I = M(
            D.doc,
            D.type,
            z.createRelativePositionFromJSON(y.cursor.anchor),
            D.binding.mapping
          ), B = M(
            D.doc,
            D.type,
            z.createRelativePositionFromJSON(y.cursor.head),
            D.binding.mapping
          );
          h.push({
            clientId: C,
            name: w.name || `User ${C}`,
            color: w.color || "#3b82f6",
            anchor: I,
            head: B
          });
        } catch {
        }
    }), x(h);
  }, [n, c]);
  return S(() => {
    if (!c?.view || !n?.awareness) return;
    const g = () => {
      try {
        const k = _.getState(c.view.state);
        if (!k?.type || !k?.binding?.mapping) return;
        const { anchor: h, head: y } = c.view.state.selection, C = V(h, k.type, k.binding.mapping), w = V(y, k.type, k.binding.mapping);
        n.awareness.setLocalStateField("cursor", { anchor: C, head: w, sectionId: l });
      } catch {
      }
    };
    return c.on("selectionUpdate", g), g(), () => {
      c.off("selectionUpdate", g);
    };
  }, [c, n, l]), S(() => {
    if (!n?.awareness) return;
    const g = () => N();
    return n.awareness.on("change", g), () => {
      n.awareness.off("change", g);
    };
  }, [n, N]), /* @__PURE__ */ u("div", { className: s(o ? "border border-border rounded-lg overflow-hidden relative" : "relative"), children: [
    o && /* @__PURE__ */ t(Ne, { editor: c }),
    /* @__PURE__ */ u("div", { ref: m, className: s("px-4 py-3 text-sm leading-relaxed text-[#1e293b] relative"), children: [
      /* @__PURE__ */ t(ie, { editor: c }),
      /* @__PURE__ */ t(Ce, { cursors: f, editorView: c?.view, containerEl: m.current })
    ] })
  ] });
}
const De = {
  pending: "#94a3b8",
  acked: "#3b82f6",
  done: "#22c55e",
  rejected: "#ef4444"
}, K = {
  low: "#94a3b8",
  medium: "#f97316",
  high: "#ef4444"
}, Re = {
  start: "#22c55e",
  stop: "#ef4444",
  continue: "#3b82f6"
};
function Ae(e) {
  const r = new Date(e);
  return isNaN(r.getTime()) ? e : r.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function Se(e) {
  const r = new Date(e);
  if (isNaN(r.getTime())) return !1;
  const n = /* @__PURE__ */ new Date();
  return n.setHours(0, 0, 0, 0), r < n;
}
function W(e) {
  return e.split(/\s+/).map((r) => r[0]).join("").toUpperCase().slice(0, 2);
}
function $e({ item: e, editable: r, onUpdate: n, onRemove: a, autoFocusText: o, onDidAutoFocus: d }) {
  const [l, i] = R(!1), [p, c] = R(""), [f, x] = R(0), m = A(null), N = A(null), g = A(null), k = () => {
    const b = e.status === "done" ? "pending" : "done";
    n({ status: b });
  }, h = e.assignee ? H.find((b) => b.displayName === e.assignee) : void 0, y = p.trim() ? ue(p) : H, C = E(() => {
    r && (c(""), x(0), i(!0));
  }, [r]), w = E(() => {
    i(!1), c(""), x(0);
  }, []), D = E((b) => {
    n({ assignee: b.displayName }), w();
  }, [n, w]), I = E(() => {
    n({ assignee: "" }), w();
  }, [n, w]);
  S(() => {
    if (!l) return;
    const b = ($) => {
      m.current && !m.current.contains($.target) && w();
    };
    return document.addEventListener("mousedown", b), () => document.removeEventListener("mousedown", b);
  }, [l, w]), S(() => {
    l && N.current && N.current.focus();
  }, [l]), S(() => {
    x(0);
  }, [p]), S(() => {
    o && g.current && (g.current.focus(), d?.());
  }, [o, d]);
  const B = (b) => {
    b.key === "Escape" ? w() : b.key === "ArrowDown" ? (b.preventDefault(), x(($) => Math.min($ + 1, y.length - 1))) : b.key === "ArrowUp" ? (b.preventDefault(), x(($) => Math.max($ - 1, 0))) : b.key === "Enter" && (b.preventDefault(), y[f] && D(y[f]));
  }, O = e.dueDate && e.status !== "done" ? Se(e.dueDate) : !1;
  return /* @__PURE__ */ u("div", { className: s("flex items-center gap-2 py-1.5 border-b border-[#f1f5f9]"), children: [
    /* @__PURE__ */ t(
      "span",
      {
        title: `Priority: ${e.priority}`,
        className: s("w-2 h-2 rounded-full shrink-0"),
        style: { background: K[e.priority] }
      }
    ),
    /* @__PURE__ */ t(
      "input",
      {
        type: "checkbox",
        checked: e.status === "done",
        onChange: k,
        disabled: !r,
        className: s("w-4 h-4 accent-[#3b82f6]", r ? "cursor-pointer" : "cursor-default")
      }
    ),
    /* @__PURE__ */ t(
      "input",
      {
        ref: g,
        "data-testid": `task-text-${e.id}`,
        type: "text",
        value: e.text,
        onChange: (b) => n({ text: b.target.value }),
        readOnly: !r,
        className: s(
          "flex-1 border-none outline-none text-sm font-[inherit] bg-transparent px-1 py-0.5",
          e.status === "done" ? "line-through text-text-tertiary" : "text-[#1e293b]"
        )
      }
    ),
    e.dueDate && /* @__PURE__ */ u(
      "span",
      {
        title: e.dueDate,
        className: s(
          "inline-block px-2 py-0.5 text-[10px] font-semibold rounded-xl whitespace-nowrap leading-snug border",
          O ? "bg-[#fef2f2] text-[#dc2626] border-[#fecaca]" : "bg-[#f0f9ff] text-[#64748b] border-[#e0f2fe]"
        ),
        children: [
          O ? "⚠ " : "",
          "Due: ",
          Ae(e.dueDate)
        ]
      }
    ),
    e.category && /* @__PURE__ */ t(
      "span",
      {
        className: s("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap"),
        style: { backgroundColor: Re[e.category.toLowerCase()] ?? "#6b7280" },
        children: e.category
      }
    ),
    /* @__PURE__ */ u("div", { ref: m, className: s("relative"), children: [
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: C,
          title: e.assignee || "Unassigned",
          className: s(
            "inline-flex items-center justify-center h-6 rounded-xl font-semibold text-[11px] cursor-pointer leading-snug whitespace-nowrap",
            e.assignee ? "px-2 bg-[#e0e7ff] text-[#4338ca] border-none min-w-0" : "w-6 px-0 bg-white text-text-tertiary border border-dashed border-[#cbd5e1]"
          ),
          children: e.assignee ? /* @__PURE__ */ u(P, { children: [
            /* @__PURE__ */ t(
              "span",
              {
                className: s("w-[18px] h-[18px] rounded-full text-white inline-flex items-center justify-center text-[8px] font-bold shrink-0 leading-none"),
                style: { background: h?.color ?? "#94a3b8" },
                children: W(e.assignee)
              }
            ),
            /* @__PURE__ */ t("span", { className: s("ml-1 text-[11px]"), children: e.assignee.split(" ")[0] })
          ] }) : "+"
        }
      ),
      l && /* @__PURE__ */ u("div", { className: s("absolute top-full left-0 mt-1 min-w-[180px] max-h-[200px] overflow-y-auto bg-white border border-border rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.12)] z-[1000] py-1"), children: [
        /* @__PURE__ */ t("div", { className: s("px-2 py-1"), children: /* @__PURE__ */ t(
          "input",
          {
            ref: N,
            type: "text",
            value: p,
            onChange: (b) => c(b.target.value),
            onKeyDown: B,
            placeholder: "Search users...",
            className: s("w-full text-[11px] font-[inherit] px-2 py-1 rounded-md border border-[#d1d5db] outline-none h-7 bg-white text-[#1e293b] box-border")
          }
        ) }),
        e.assignee && /* @__PURE__ */ u(
          "button",
          {
            type: "button",
            onClick: I,
            className: s("flex items-center gap-2 py-1.5 px-2.5 text-xs cursor-pointer bg-transparent border-none w-full text-left font-[inherit] text-[#1e293b]"),
            children: [
              /* @__PURE__ */ t("span", { className: s("w-[22px] h-[22px] rounded-full bg-[#cbd5e1] text-[#64748b] inline-flex items-center justify-center text-[10px] font-bold shrink-0 leading-none"), children: "--" }),
              /* @__PURE__ */ t("span", { className: s("text-[#64748b] italic"), children: "Unassigned" })
            ]
          }
        ),
        y.map((b, $) => /* @__PURE__ */ u(
          "button",
          {
            type: "button",
            onClick: () => D(b),
            onMouseEnter: () => x($),
            className: s(
              "flex items-center gap-2 py-1.5 px-2.5 text-xs cursor-pointer border-none w-full text-left font-[inherit] text-[#1e293b]",
              $ === f ? "bg-surface-hover" : "bg-transparent"
            ),
            children: [
              /* @__PURE__ */ t(
                "span",
                {
                  className: s("w-[22px] h-[22px] rounded-full text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0 leading-none"),
                  style: { background: b.color },
                  children: W(b.displayName)
                }
              ),
              /* @__PURE__ */ t("span", { children: b.displayName })
            ]
          },
          b.userId
        )),
        y.length === 0 && /* @__PURE__ */ t("div", { className: s("px-2.5 py-2 text-[11px] text-text-tertiary"), children: "No users found" })
      ] })
    ] }),
    /* @__PURE__ */ u(
      "select",
      {
        value: e.priority,
        disabled: !r,
        onChange: (b) => n({ priority: b.target.value }),
        className: s("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap border-none outline-none appearance-none pr-4 doc-select-arrow", r ? "cursor-pointer" : "cursor-default"),
        style: { backgroundColor: K[e.priority] },
        title: `Priority: ${e.priority}`,
        children: [
          /* @__PURE__ */ t("option", { value: "low", children: "low" }),
          /* @__PURE__ */ t("option", { value: "medium", children: "medium" }),
          /* @__PURE__ */ t("option", { value: "high", children: "high" })
        ]
      }
    ),
    /* @__PURE__ */ u(
      "select",
      {
        value: e.status,
        disabled: !r,
        onChange: (b) => n({ status: b.target.value }),
        className: s("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap border-none outline-none appearance-none pr-4 doc-select-arrow", r ? "cursor-pointer" : "cursor-default"),
        style: { backgroundColor: De[e.status] },
        title: `Status: ${e.status}`,
        children: [
          /* @__PURE__ */ t("option", { value: "pending", children: "pending" }),
          /* @__PURE__ */ t("option", { value: "acked", children: "acked" }),
          /* @__PURE__ */ t("option", { value: "done", children: "done" }),
          /* @__PURE__ */ t("option", { value: "rejected", children: "rejected" })
        ]
      }
    ),
    r && /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: a,
        title: "Remove task",
        className: s("border-none bg-transparent text-[#ef4444] cursor-pointer text-base px-1.5 py-0.5 rounded leading-none"),
        children: "x"
      }
    )
  ] });
}
function q({ items: e, editable: r, onUpdateItem: n, onRemoveItem: a, focusLastItem: o }) {
  if (e.length === 0)
    return /* @__PURE__ */ t("div", { className: s("text-text-tertiary text-[13px] italic py-2"), children: "No tasks yet." });
  const d = o?.current ?? !1;
  return /* @__PURE__ */ t("div", { className: s("py-2"), children: e.map((l, i) => /* @__PURE__ */ t(
    $e,
    {
      item: l,
      editable: r,
      onUpdate: (p) => n(l.id, p),
      onRemove: () => a(l.id),
      autoFocusText: d && i === e.length - 1,
      onDidAutoFocus: d && i === e.length - 1 ? () => {
        o && (o.current = !1);
      } : void 0
    },
    l.id
  )) });
}
function Le({
  section: e,
  fragment: r,
  ydoc: n,
  provider: a,
  user: o,
  editable: d,
  onAddItem: l,
  onUpdateItem: i,
  onRemoveItem: p,
  onUpdateCursorInfo: c
}) {
  const f = A(!1), x = () => {
    l?.({ text: "", status: "pending", assignee: "", ackedBy: "", ackedAt: "", priority: "medium", notes: "" }), f.current = !0;
  };
  return /* @__PURE__ */ u("div", { children: [
    r && n && /* @__PURE__ */ t(
      T,
      {
        fragment: r,
        ydoc: n,
        provider: a ?? null,
        user: o ?? { name: "Anonymous", color: "#6b7280" },
        editable: d,
        placeholder: e.placeholder ?? `Write ${e.type} content...`,
        sectionId: e.id,
        onUpdateCursorInfo: c
      }
    ),
    (e.items.length > 0 || d) && /* @__PURE__ */ t(
      q,
      {
        items: e.items,
        editable: d,
        onUpdateItem: (m, N) => i?.(m, N),
        onRemoveItem: (m) => p?.(m),
        focusLastItem: f
      }
    ),
    d && /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: x,
        className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-slate-500 cursor-pointer font-inherit",
        children: "+ Add item"
      }
    )
  ] });
}
function Te({
  section: e,
  fragment: r,
  ydoc: n,
  provider: a,
  user: o,
  editable: d,
  onUpdateCursorInfo: l
}) {
  return !r || !n ? /* @__PURE__ */ t("div", { className: "text-text-tertiary italic text-[13px] py-2", children: "No content yet." }) : /* @__PURE__ */ t(
    T,
    {
      fragment: r,
      ydoc: n,
      provider: a ?? null,
      user: o ?? { name: "Anonymous", color: "#6b7280" },
      editable: d,
      placeholder: e.placeholder ?? "Write content...",
      sectionId: e.id,
      onUpdateCursorInfo: l
    }
  );
}
function Y({
  section: e,
  fragment: r,
  ydoc: n,
  provider: a,
  onNavigateToEditor: o
}) {
  return /* @__PURE__ */ u("div", { children: [
    !!r && !!n ? /* @__PURE__ */ t("div", { className: "border border-sky-100 border-l-[3px] border-l-sky-400 rounded-md px-3.5 py-2.5 bg-sky-50 text-sm text-slate-800 leading-[1.6]", children: /* @__PURE__ */ t(
      T,
      {
        fragment: r,
        ydoc: n,
        provider: a ?? null,
        user: { name: "", color: "#6b7280" },
        editable: !1,
        sectionId: e.id
      }
    ) }) : /* @__PURE__ */ t("div", { className: "text-text-tertiary italic text-[13px]", children: "No content." }),
    o && /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: () => o(e.id),
        className: "mt-2 bg-transparent border-none text-blue-500 text-xs cursor-pointer p-0 font-inherit",
        children: "Edit in editor →"
      }
    )
  ] });
}
function Ee({
  section: e,
  editable: r,
  onAddItem: n,
  onUpdateItem: a,
  onRemoveItem: o
}) {
  const d = A(!1), l = () => {
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
    e.items.length > 0 || r ? /* @__PURE__ */ t(
      q,
      {
        items: e.items,
        editable: r,
        onUpdateItem: (i, p) => a?.(i, p),
        onRemoveItem: (i) => o?.(i),
        focusLastItem: d
      }
    ) : null,
    e.items.length === 0 && !r && /* @__PURE__ */ t("p", { className: "text-text-tertiary text-[13px] italic my-2", children: "No items yet." }),
    r && /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: l,
        className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-slate-500 cursor-pointer font-inherit",
        children: "+ Add item"
      }
    )
  ] });
}
const je = {
  pending: { label: "Pending", color: "#92400e", bg: "#fef3c7" },
  acked: { label: "Acked", color: "#1e40af", bg: "#dbeafe" },
  done: { label: "Done", color: "#065f46", bg: "#d1fae5" },
  rejected: { label: "Rejected", color: "#991b1b", bg: "#fee2e2" }
}, Ie = {
  high: "#ef4444",
  medium: "#f97316",
  low: "#94a3b8"
};
function Be(e) {
  const r = new Date(e);
  if (isNaN(r.getTime())) return !1;
  const n = /* @__PURE__ */ new Date();
  return n.setHours(0, 0, 0, 0), r < n;
}
function Fe(e) {
  const r = new Date(e);
  return isNaN(r.getTime()) ? e : r.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function Ue(e) {
  return e.split(/\s+/).map((r) => r[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function F({ item: e, onUpdateItem: r }) {
  const [n, a] = R(!1), o = je[e.status], d = e.dueDate && e.status === "pending" ? Be(e.dueDate) : !1, l = e.status === "done" || e.status === "acked";
  return /* @__PURE__ */ u(
    "div",
    {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      className: "flex items-center gap-2 py-1.5 border-b border-slate-100",
      style: { opacity: l ? 0.65 : 1 },
      children: [
        /* @__PURE__ */ t(
          "span",
          {
            title: `Priority: ${e.priority}`,
            style: {
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: Ie[e.priority],
              flexShrink: 0
            }
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            title: `Status: ${e.status}${r ? " — click to toggle done" : ""}`,
            onClick: () => {
              if (!r) return;
              const i = e.status === "done" ? "pending" : "done";
              r(e.id, { status: i });
            },
            style: {
              width: 18,
              height: 18,
              borderRadius: "50%",
              border: `2px solid ${o.color}`,
              background: l ? o.color : "transparent",
              cursor: r ? "pointer" : "default",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0
            },
            children: l && /* @__PURE__ */ t("svg", { width: "9", height: "9", viewBox: "0 0 10 10", fill: "none", children: /* @__PURE__ */ t("polyline", { points: "2,5 4,7.5 8,2.5", stroke: "#fff", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) })
          }
        ),
        /* @__PURE__ */ t("span", { className: s("flex-1 text-[13px] leading-[1.4]", l ? "text-text-tertiary line-through" : "text-slate-800"), children: e.text || /* @__PURE__ */ t("span", { className: "text-text-disabled italic", children: "Untitled item" }) }),
        e.assignee && /* @__PURE__ */ t(
          "span",
          {
            title: e.assignee,
            className: "w-[22px] h-[22px] rounded-full bg-indigo-100 text-indigo-700 text-[9px] font-bold flex items-center justify-center shrink-0",
            children: Ue(e.assignee)
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
          Fe(e.dueDate)
        ] }),
        r && n && /* @__PURE__ */ u(
          "select",
          {
            value: e.status,
            onChange: (i) => r(e.id, { status: i.target.value }),
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
              /* @__PURE__ */ t("option", { value: "pending", children: "pending" }),
              /* @__PURE__ */ t("option", { value: "acked", children: "acked" }),
              /* @__PURE__ */ t("option", { value: "done", children: "done" }),
              /* @__PURE__ */ t("option", { value: "rejected", children: "rejected" })
            ]
          }
        )
      ]
    }
  );
}
function Q({ section: e, onUpdateItem: r, onNavigateToEditor: n }) {
  const a = e.items;
  if (a.length === 0)
    return /* @__PURE__ */ t("div", { className: "text-text-tertiary italic text-[13px] py-1", children: "No items." });
  const o = a.filter((i) => i.status === "pending"), d = a.filter((i) => i.status === "done" || i.status === "acked"), l = a.filter((i) => i.status === "rejected");
  return /* @__PURE__ */ u("div", { children: [
    o.length > 0 && /* @__PURE__ */ t("div", { className: "mb-1", children: o.map((i) => /* @__PURE__ */ t(F, { item: i, onUpdateItem: r }, i.id)) }),
    d.length > 0 && /* @__PURE__ */ t("div", { className: "mb-1", children: d.map((i) => /* @__PURE__ */ t(F, { item: i, onUpdateItem: r }, i.id)) }),
    l.length > 0 && /* @__PURE__ */ t("div", { children: l.map((i) => /* @__PURE__ */ t(F, { item: i, onUpdateItem: r }, i.id)) }),
    n && /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: () => n(e.id),
        className: "mt-1.5 bg-transparent border-none text-blue-500 text-xs cursor-pointer p-0 font-inherit",
        children: "Edit in editor →"
      }
    )
  ] });
}
function Pe({ item: e, editable: r, autoFocus: n, onDidAutoFocus: a, onUpdate: o, onRemove: d }) {
  const l = A(null), i = e.status === "done";
  return S(() => {
    n && l.current && (l.current.focus(), a?.());
  }, [n, a]), /* @__PURE__ */ u("div", { className: "flex items-center gap-2 py-[5px] border-b border-slate-100", children: [
    /* @__PURE__ */ t(
      "input",
      {
        type: "checkbox",
        checked: i,
        onChange: () => o({ status: i ? "pending" : "done" }),
        disabled: !r,
        className: s("w-[15px] h-[15px] accent-emerald-500 shrink-0", r ? "cursor-pointer" : "cursor-default")
      }
    ),
    /* @__PURE__ */ t(
      "input",
      {
        ref: l,
        type: "text",
        value: e.text,
        onChange: (p) => o({ text: p.target.value }),
        readOnly: !r,
        placeholder: "Checklist item...",
        className: s(
          "flex-1 border-none outline-none text-sm font-inherit bg-transparent px-1 py-0.5",
          i ? "text-text-tertiary line-through" : "text-slate-800"
        )
      }
    ),
    r && /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: d,
        className: "border-none bg-transparent text-red-500 cursor-pointer text-base px-1.5 py-0.5 leading-none",
        children: "×"
      }
    )
  ] });
}
function Oe({
  section: e,
  fragment: r,
  ydoc: n,
  provider: a,
  user: o,
  editable: d,
  onAddItem: l,
  onUpdateItem: i,
  onRemoveItem: p,
  onUpdateCursorInfo: c
}) {
  const f = A(!1), x = () => {
    l?.({ text: "", status: "pending", assignee: "", ackedBy: "", ackedAt: "", priority: "medium", notes: "" }), f.current = !0;
  }, m = e.items.length, N = e.items.filter((g) => g.status === "done").length;
  return /* @__PURE__ */ u("div", { children: [
    r && n && /* @__PURE__ */ t(
      T,
      {
        fragment: r,
        ydoc: n,
        provider: a ?? null,
        user: o ?? { name: "Anonymous", color: "#6b7280" },
        editable: d,
        placeholder: e.placeholder ?? "Add notes or context...",
        sectionId: e.id,
        onUpdateCursorInfo: c
      }
    ),
    m > 0 && /* @__PURE__ */ u("div", { className: "text-[11px] text-slate-500 font-semibold mb-1.5", children: [
      N,
      " / ",
      m,
      " done"
    ] }),
    /* @__PURE__ */ t("div", { children: e.items.map((g, k) => {
      const h = k === e.items.length - 1, y = f.current && h;
      return /* @__PURE__ */ t(
        Pe,
        {
          item: g,
          editable: d,
          autoFocus: y,
          onDidAutoFocus: y ? () => {
            f.current = !1;
          } : void 0,
          onUpdate: (C) => i?.(g.id, C),
          onRemove: () => p?.(g.id)
        },
        g.id
      );
    }) }),
    d && /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: x,
        className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-slate-500 cursor-pointer font-inherit",
        children: "+ Add item"
      }
    )
  ] });
}
function X({
  section: e,
  fragment: r,
  ydoc: n,
  provider: a,
  onUpdateItem: o,
  onNavigateToEditor: d
}) {
  const l = e.items, i = l.length, p = l.filter((f) => f.status === "done").length, c = i > 0 ? Math.round(p / i * 100) : 0;
  return /* @__PURE__ */ u("div", { children: [
    r && n && /* @__PURE__ */ t("div", { className: "mb-2.5", children: /* @__PURE__ */ t(
      T,
      {
        fragment: r,
        ydoc: n,
        provider: a ?? null,
        user: { name: "", color: "#6b7280" },
        editable: !1,
        sectionId: e.id
      }
    ) }),
    i > 0 && /* @__PURE__ */ u("div", { className: "mb-2.5", children: [
      /* @__PURE__ */ u("div", { className: "flex justify-between mb-1", children: [
        /* @__PURE__ */ u("span", { className: "text-[11px] text-slate-500 font-semibold", children: [
          p,
          " / ",
          i,
          " done"
        ] }),
        /* @__PURE__ */ u("span", { className: s("text-[11px] font-semibold", c === 100 ? "text-emerald-500" : "text-slate-500"), children: [
          c,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "h-1 bg-border rounded-sm overflow-hidden", children: /* @__PURE__ */ t(
        "div",
        {
          className: s("h-full rounded-sm transition-[width] duration-300", c === 100 ? "bg-emerald-500" : "bg-blue-500"),
          style: { width: `${c}%` }
        }
      ) })
    ] }),
    i === 0 ? /* @__PURE__ */ t("div", { className: "text-text-tertiary italic text-[13px]", children: "No items." }) : /* @__PURE__ */ t("div", { children: l.map((f) => {
      const x = f.status === "done";
      return /* @__PURE__ */ u(
        "div",
        {
          className: "flex items-center gap-2 py-[5px] border-b border-slate-100",
          children: [
            /* @__PURE__ */ t(
              "input",
              {
                type: "checkbox",
                checked: x,
                onChange: () => o?.(f.id, { status: x ? "pending" : "done" }),
                className: s("w-3.5 h-3.5 accent-emerald-500 shrink-0", o ? "cursor-pointer" : "cursor-default"),
                readOnly: !o
              }
            ),
            /* @__PURE__ */ t("span", { className: s("text-[13px] flex-1 leading-[1.4]", x ? "text-text-tertiary line-through" : "text-slate-800"), children: f.text || /* @__PURE__ */ t("span", { className: "text-text-disabled italic", children: "Untitled" }) })
          ]
        },
        f.id
      );
    }) }),
    d && /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: () => d(e.id),
        className: "mt-2 bg-transparent border-none text-blue-500 text-xs cursor-pointer p-0 font-inherit",
        children: "Edit in editor →"
      }
    )
  ] });
}
const ze = {
  acked: "approved",
  done: "approved",
  rejected: "rejected"
};
function _e() {
  return "";
}
function Me() {
  if (typeof window > "u") return null;
  const e = window.location.pathname.match(/\/documents\/([^/?#]+)/);
  return e ? e[1] : null;
}
function Ve(e) {
  return ze[e] ?? null;
}
async function He(e) {
  const r = e.documentId ?? Me();
  if (!r) return { ok: !1, error: "no documentId in URL" };
  try {
    const n = { "Content-Type": "application/json" };
    e.idToken && (n.Authorization = `Bearer ${e.idToken}`);
    const a = await fetch(`${_e()}/api/approvals`, {
      method: "POST",
      headers: n,
      body: JSON.stringify({
        documentId: r,
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
const G = {
  pending: { label: "Open", icon: "○", color: "#92400e", bg: "#fef3c7" },
  acked: { label: "Decided", icon: "✓", color: "#065f46", bg: "#d1fae5" },
  done: { label: "Decided", icon: "✓", color: "#065f46", bg: "#d1fae5" },
  rejected: { label: "Vetoed", icon: "✕", color: "#991b1b", bg: "#fee2e2" }
};
function Ke({ item: e, editable: r, autoFocus: n, onDidAutoFocus: a, onUpdate: o, onRemove: d }) {
  const l = A(null), i = G[e.status] ?? G.pending;
  return S(() => {
    n && l.current && (l.current.focus(), a?.());
  }, [n, a]), /* @__PURE__ */ u("div", { className: "flex items-center gap-2 py-1.5 border-b border-slate-100", children: [
    /* @__PURE__ */ t(
      "span",
      {
        className: "w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 select-none",
        style: { background: i.bg, color: i.color },
        children: i.icon
      }
    ),
    /* @__PURE__ */ t(
      "input",
      {
        ref: l,
        type: "text",
        value: e.text,
        onChange: (p) => o({ text: p.target.value }),
        readOnly: !r,
        placeholder: "Describe the decision...",
        className: s(
          "flex-1 border-none outline-none text-sm font-inherit bg-transparent px-1 py-0.5",
          e.status === "rejected" ? "text-text-tertiary line-through" : "text-slate-800"
        )
      }
    ),
    r && /* @__PURE__ */ u(
      "select",
      {
        value: e.status === "done" ? "acked" : e.status,
        onChange: (p) => o({ status: p.target.value }),
        className: "text-[10px] px-2 py-0.5 rounded-[10px] font-semibold cursor-pointer outline-none font-inherit shrink-0 appearance-none",
        style: {
          border: `1px solid ${i.color}`,
          background: i.bg,
          color: i.color
        },
        children: [
          /* @__PURE__ */ t("option", { value: "pending", children: "Open" }),
          /* @__PURE__ */ t("option", { value: "acked", children: "Decided" }),
          /* @__PURE__ */ t("option", { value: "rejected", children: "Vetoed" })
        ]
      }
    ),
    r && /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: d,
        className: "border-none bg-transparent text-red-500 cursor-pointer text-base px-1.5 py-0.5 leading-none",
        children: "×"
      }
    )
  ] });
}
function We({
  section: e,
  fragment: r,
  ydoc: n,
  provider: a,
  user: o,
  editable: d,
  onAddItem: l,
  onUpdateItem: i,
  onRemoveItem: p,
  onUpdateCursorInfo: c
}) {
  const f = A(!1), x = () => {
    l?.({ text: "", status: "pending", assignee: "", ackedBy: "", ackedAt: "", priority: "medium", notes: "" }), f.current = !0;
  };
  return /* @__PURE__ */ u("div", { children: [
    r && n && /* @__PURE__ */ t(
      T,
      {
        fragment: r,
        ydoc: n,
        provider: a ?? null,
        user: o ?? { name: "Anonymous", color: "#6b7280" },
        editable: d,
        placeholder: e.placeholder ?? "Add context or background...",
        sectionId: e.id,
        onUpdateCursorInfo: c
      }
    ),
    e.items.length === 0 && !d && /* @__PURE__ */ t("div", { className: "text-text-tertiary italic text-[13px] py-1", children: "No decisions yet." }),
    /* @__PURE__ */ t("div", { children: e.items.map((m, N) => {
      const g = N === e.items.length - 1, k = f.current && g;
      return /* @__PURE__ */ t(
        Ke,
        {
          item: m,
          editable: d,
          autoFocus: k,
          onDidAutoFocus: k ? () => {
            f.current = !1;
          } : void 0,
          onUpdate: (h) => {
            const y = m.status;
            if (i?.(m.id, h), h.status && h.status !== y) {
              const C = Ve(h.status);
              C && He({
                sectionId: e.id,
                decision: C,
                reviewerName: o?.name
              });
            }
          },
          onRemove: () => p?.(m.id)
        },
        m.id
      );
    }) }),
    d && /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: x,
        className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-slate-500 cursor-pointer font-inherit",
        children: "+ Add decision"
      }
    )
  ] });
}
const J = {
  pending: { label: "Open", icon: "○", color: "#92400e", bg: "#fef3c7" },
  acked: { label: "Decided", icon: "✓", color: "#065f46", bg: "#d1fae5" },
  done: { label: "Decided", icon: "✓", color: "#065f46", bg: "#d1fae5" },
  rejected: { label: "Vetoed", icon: "✕", color: "#991b1b", bg: "#fee2e2" }
};
function Ge({ item: e }) {
  const r = J[e.status] ?? J.pending;
  return /* @__PURE__ */ u("div", { className: "flex items-start gap-2 py-1.5 border-b border-slate-100", children: [
    /* @__PURE__ */ t(
      "span",
      {
        className: "w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 select-none",
        style: { background: r.bg, color: r.color },
        children: r.icon
      }
    ),
    /* @__PURE__ */ t("span", { className: s(
      "flex-1 text-[13px] leading-[1.4]",
      e.status === "rejected" ? "text-text-tertiary line-through" : "text-slate-800"
    ), children: e.text || /* @__PURE__ */ t("span", { className: "text-text-disabled italic", children: "Untitled decision" }) }),
    /* @__PURE__ */ t(
      "span",
      {
        className: "text-[10px] font-semibold px-2 py-0.5 rounded-[10px] whitespace-nowrap shrink-0",
        style: { background: r.bg, color: r.color },
        children: r.label
      }
    )
  ] });
}
function U({ label: e, color: r, items: n }) {
  return /* @__PURE__ */ u("div", { className: "mb-2", children: [
    /* @__PURE__ */ t("div", { className: "text-[10px] font-bold uppercase tracking-[0.05em] mb-0.5", style: { color: r }, children: e }),
    n.map((a) => /* @__PURE__ */ t(Ge, { item: a }, a.id))
  ] });
}
function Z({ section: e, onNavigateToEditor: r }) {
  const n = e.items;
  if (n.length === 0)
    return /* @__PURE__ */ t("div", { className: "text-text-tertiary italic text-[13px] py-1", children: "No decisions recorded." });
  const a = n.filter((l) => l.status === "pending"), o = n.filter((l) => l.status === "acked" || l.status === "done"), d = n.filter((l) => l.status === "rejected");
  return /* @__PURE__ */ u("div", { children: [
    a.length > 0 && /* @__PURE__ */ t(U, { label: "Open", color: "#92400e", items: a }),
    o.length > 0 && /* @__PURE__ */ t(U, { label: "Decided", color: "#065f46", items: o }),
    d.length > 0 && /* @__PURE__ */ t(U, { label: "Vetoed", color: "#991b1b", items: d }),
    r && /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: () => r(e.id),
        className: "mt-1.5 bg-transparent border-none text-blue-500 text-xs cursor-pointer p-0 font-inherit",
        children: "Edit in editor →"
      }
    )
  ] });
}
function Je(e) {
  return e.metadata ?? {};
}
function qe({
  section: e,
  editable: r,
  onUpdateSection: n
}) {
  const a = Je(e), [o, d] = R(!1), l = (p) => {
    d(!0);
    const c = new FileReader();
    c.onload = () => {
      n?.({
        metadata: {
          ...e.metadata ?? {},
          fileName: p.name,
          fileDataUrl: typeof c.result == "string" ? c.result : "",
          fileSize: p.size
        }
      }), d(!1);
    }, c.onerror = () => d(!1), c.readAsDataURL(p);
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
  return /* @__PURE__ */ t("div", { "data-testid": `file-upload-editor-${e.id}`, children: a.fileName ? /* @__PURE__ */ u("div", { className: "flex items-center gap-2.5 px-3 py-2 rounded-md bg-surface-panel border border-border text-[13px]", children: [
    /* @__PURE__ */ t("span", { className: "text-base", children: "📎" }),
    /* @__PURE__ */ t("span", { className: "flex-1 font-medium text-text-primary", children: a.fileName }),
    typeof a.fileSize == "number" && /* @__PURE__ */ u("span", { className: "text-[11px] text-text-tertiary", children: [
      (a.fileSize / 1024).toFixed(1),
      " kB"
    ] }),
    r && /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        "data-testid": `file-upload-remove-${e.id}`,
        onClick: i,
        className: "border-none bg-transparent text-red-500 cursor-pointer text-sm px-1.5 py-0.5",
        children: "×"
      }
    )
  ] }) : /* @__PURE__ */ u(
    "label",
    {
      "data-testid": `file-upload-empty-${e.id}`,
      className: s(
        "block px-4 py-3.5 border border-dashed border-border-emphasis rounded-lg text-slate-500 text-[13px] text-center bg-surface-inset",
        r ? "cursor-pointer" : "cursor-default"
      ),
      children: [
        o ? "Reading file…" : e.placeholder ?? "Click to upload a file",
        /* @__PURE__ */ t(
          "input",
          {
            type: "file",
            "data-testid": `file-upload-input-${e.id}`,
            disabled: !r,
            className: "hidden",
            onChange: (p) => {
              const c = p.target.files?.[0];
              c && l(c);
            }
          }
        )
      ]
    }
  ) });
}
function ee({ section: e }) {
  const r = e.metadata ?? {};
  return r.fileName ? /* @__PURE__ */ u(
    "div",
    {
      "data-testid": `file-upload-reader-${e.id}`,
      className: "flex items-center gap-2.5 px-3 py-2 rounded-md bg-surface-panel border border-border text-[13px]",
      children: [
        /* @__PURE__ */ t("span", { className: "text-base", children: "📎" }),
        /* @__PURE__ */ u(
          "a",
          {
            href: r.fileDataUrl ?? "#",
            download: r.fileName,
            "data-testid": `file-upload-link-${e.id}`,
            className: "text-primary font-medium no-underline",
            children: [
              "Download ",
              r.fileName
            ]
          }
        ),
        typeof r.fileSize == "number" && /* @__PURE__ */ u("span", { className: "text-[11px] text-text-tertiary", children: [
          "(",
          (r.fileSize / 1024).toFixed(1),
          " kB)"
        ] })
      ]
    }
  ) : /* @__PURE__ */ t("div", { "data-testid": `file-upload-reader-empty-${e.id}`, className: "text-text-tertiary text-[13px] italic", children: "No file uploaded." });
}
function Ye({
  section: e,
  editable: r,
  onUpdateSection: n
}) {
  const a = e.metadata ?? {}, [o, d] = R(!1), l = (c) => {
    d(!0);
    const f = new FileReader();
    f.onload = () => {
      n?.({
        metadata: {
          ...e.metadata ?? {},
          imageDataUrl: typeof f.result == "string" ? f.result : "",
          alt: a.alt ?? c.name
        }
      }), d(!1);
    }, f.onerror = () => d(!1), f.readAsDataURL(c);
  }, i = (c) => {
    n?.({
      metadata: { ...e.metadata ?? {}, alt: c }
    });
  }, p = () => {
    n?.({
      metadata: { ...e.metadata ?? {}, imageDataUrl: void 0, alt: void 0 }
    });
  };
  return /* @__PURE__ */ t("div", { "data-testid": `diagram-editor-${e.id}`, children: a.imageDataUrl ? /* @__PURE__ */ u("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ t(
      "img",
      {
        "data-testid": `diagram-image-${e.id}`,
        src: a.imageDataUrl,
        alt: a.alt ?? "",
        className: "max-w-full max-h-[320px] rounded-md border border-border"
      }
    ),
    r && /* @__PURE__ */ u("div", { className: "flex gap-2 items-center", children: [
      /* @__PURE__ */ t(
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
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          "data-testid": `diagram-remove-${e.id}`,
          onClick: p,
          className: "bg-transparent border-none text-red-500 cursor-pointer text-[13px]",
          children: "Remove"
        }
      )
    ] })
  ] }) : /* @__PURE__ */ u(
    "label",
    {
      "data-testid": `diagram-empty-${e.id}`,
      className: s(
        "block px-4 py-3.5 border border-dashed border-border-emphasis rounded-lg text-slate-500 text-[13px] text-center bg-surface-inset",
        r ? "cursor-pointer" : "cursor-default"
      ),
      children: [
        o ? "Reading image…" : e.placeholder ?? "Upload an image (PNG / JPG / SVG)",
        /* @__PURE__ */ t(
          "input",
          {
            type: "file",
            accept: "image/*",
            "data-testid": `diagram-input-${e.id}`,
            disabled: !r,
            className: "hidden",
            onChange: (c) => {
              const f = c.target.files?.[0];
              f && l(f);
            }
          }
        )
      ]
    }
  ) });
}
function te({ section: e }) {
  const r = e.metadata ?? {};
  return r.imageDataUrl ? /* @__PURE__ */ u("figure", { "data-testid": `diagram-reader-${e.id}`, className: "m-0", children: [
    /* @__PURE__ */ t(
      "img",
      {
        src: r.imageDataUrl,
        alt: r.alt ?? "",
        className: "max-w-full max-h-[480px] rounded-md border border-border"
      }
    ),
    r.alt && /* @__PURE__ */ t("figcaption", { className: "text-[11px] text-text-tertiary mt-1 text-center", children: r.alt })
  ] }) : /* @__PURE__ */ t("div", { "data-testid": `diagram-reader-empty-${e.id}`, className: "text-text-tertiary text-[13px] italic", children: "No diagram uploaded." });
}
function Qe(e) {
  const r = e.metadata ?? {};
  return Array.isArray(r.links) ? r.links : [];
}
function Xe({
  section: e,
  editable: r,
  onUpdateSection: n
}) {
  const a = Qe(e), o = (p) => {
    n?.({
      metadata: { ...e.metadata ?? {}, links: p }
    });
  }, d = () => o([...a, { label: "", url: "" }]), l = (p, c) => {
    o(a.map((f, x) => x === p ? { ...f, ...c } : f));
  }, i = (p) => {
    o(a.filter((c, f) => f !== p));
  };
  return /* @__PURE__ */ u("div", { "data-testid": `link-block-editor-${e.id}`, className: "flex flex-col gap-1.5", children: [
    a.length === 0 && /* @__PURE__ */ t(
      "div",
      {
        "data-testid": `link-block-empty-${e.id}`,
        className: "text-text-tertiary text-xs italic py-1",
        children: "No links yet."
      }
    ),
    a.map((p, c) => /* @__PURE__ */ u("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "text",
          "data-testid": `link-block-label-${e.id}-${c}`,
          value: p.label,
          placeholder: "Label",
          onChange: (f) => l(c, { label: f.target.value }),
          disabled: !r,
          className: "flex-1 px-2 py-1 text-[13px] border border-border-emphasis rounded"
        }
      ),
      /* @__PURE__ */ t(
        "input",
        {
          type: "url",
          "data-testid": `link-block-url-${e.id}-${c}`,
          value: p.url,
          placeholder: "https://example.com",
          onChange: (f) => l(c, { url: f.target.value }),
          disabled: !r,
          className: "flex-[2] px-2 py-1 text-[13px] border border-border-emphasis rounded"
        }
      ),
      r && /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          "data-testid": `link-block-remove-${e.id}-${c}`,
          onClick: () => i(c),
          className: "border-none bg-transparent text-red-500 cursor-pointer text-sm px-1.5 py-0.5",
          children: "×"
        }
      )
    ] }, c)),
    r && /* @__PURE__ */ t(
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
function re({ section: e }) {
  const r = e.metadata ?? {}, n = Array.isArray(r.links) ? r.links.filter((a) => a.url) : [];
  return n.length === 0 ? /* @__PURE__ */ t(
    "div",
    {
      "data-testid": `link-block-reader-empty-${e.id}`,
      className: "text-text-tertiary text-[13px] italic",
      children: "No links."
    }
  ) : /* @__PURE__ */ t(
    "ul",
    {
      "data-testid": `link-block-reader-${e.id}`,
      className: "list-none m-0 p-0 flex flex-col gap-1",
      children: n.map((a, o) => /* @__PURE__ */ t("li", { className: "text-[13px]", children: /* @__PURE__ */ t(
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
L(fe);
L(me);
L(xe);
L(be);
L(ge);
L(ye);
L(ke);
v("*", "*", Le);
v("rich-text", "editor", Te);
v("rich-text", "ack", Y);
v("rich-text", "reader", Y);
v("tasks", "editor", Ee);
v("tasks", "ack", Q);
v("tasks", "reader", Q);
v("checklist", "editor", Oe);
v("checklist", "ack", X);
v("checklist", "reader", X);
v("decisions", "editor", We);
v("decisions", "ack", Z);
v("decisions", "reader", Z);
v("file-upload", "editor", qe);
v("file-upload", "ack", ee);
v("file-upload", "reader", ee);
v("diagram", "editor", Ye);
v("diagram", "ack", te);
v("diagram", "reader", te);
v("link-block", "editor", Xe);
v("link-block", "ack", re);
v("link-block", "reader", re);
function ht({ open: e, onClose: r, onCreate: n }) {
  const [a, o] = R([]), [d, l] = R(null), [i, p] = R(""), [c, f] = R(""), x = A(null);
  if (S(() => {
    if (!e) return;
    const h = pe();
    o(h), l(h[0]?.id ?? null), p(""), f(""), setTimeout(() => x.current?.focus(), 50);
  }, [e]), !e) return null;
  const m = a.find((h) => h.id === d), N = () => {
    const h = i.trim();
    !h || !m || (n({
      title: h,
      type: m.name,
      description: c.trim() || void 0,
      icon: m.icon,
      documentTypeId: m.id
    }), r());
  }, g = (h) => {
    h.key === "Enter" && !h.shiftKey && i.trim() && m && N();
  }, k = !!i.trim() && !!m;
  return /* @__PURE__ */ t(
    he,
    {
      open: e,
      onClose: r,
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
      children: /* @__PURE__ */ u("div", { onKeyDown: g, className: "contents", children: [
        /* @__PURE__ */ t("h2", { className: s("m-0 px-6 pt-6 pb-4 text-lg font-bold text-[#1e293b] shrink-0"), children: "Create New Document" }),
        /* @__PURE__ */ t("div", { className: s("flex-1 overflow-y-auto px-6 min-h-0"), children: a.length === 0 ? /* @__PURE__ */ u("div", { className: s("text-center px-4 py-8 border border-dashed border-[#d1d5db] rounded-lg mb-5 text-[#64748b]"), children: [
          /* @__PURE__ */ t("div", { className: s("text-[40px] mb-3"), children: "📋" }),
          /* @__PURE__ */ t("div", { className: s("text-[15px] font-semibold mb-2 text-[#374151]"), children: "No document types defined yet" }),
          /* @__PURE__ */ u("div", { className: s("text-[13px] text-text-tertiary max-w-xs mx-auto mb-4"), children: [
            "Document types define the sections and structure of your documents. Create one first in ",
            /* @__PURE__ */ t("strong", { children: "☰ → Document Types" }),
            "."
          ] }),
          /* @__PURE__ */ t(
            "button",
            {
              onClick: r,
              className: s("px-5 py-2 text-[13px] font-semibold bg-primary text-white border-none rounded-[7px] cursor-pointer font-[inherit]"),
              children: "Close"
            }
          )
        ] }) : /* @__PURE__ */ u(P, { children: [
          /* @__PURE__ */ u("div", { className: s("mb-5"), children: [
            /* @__PURE__ */ t("label", { className: s("block text-[13px] font-semibold text-text-secondary mb-2"), children: "Document Type" }),
            /* @__PURE__ */ t("div", { className: s("grid grid-cols-2 gap-2"), children: a.map((h) => {
              const y = d === h.id;
              return /* @__PURE__ */ u(
                "button",
                {
                  "data-testid": `type-option-${h.id}`,
                  onClick: () => l(h.id),
                  className: s(
                    "flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]",
                    y ? "bg-[#eff6ff] border-2 border-[#3b82f6]" : "bg-white border-2 border-border hover:bg-[#f8fafc]"
                  ),
                  children: [
                    /* @__PURE__ */ t("span", { className: s("text-2xl shrink-0"), children: h.icon }),
                    /* @__PURE__ */ u("div", { className: s("min-w-0"), children: [
                      /* @__PURE__ */ t("div", { className: s("text-sm font-semibold text-[#1e293b] overflow-hidden text-ellipsis whitespace-nowrap"), children: h.name }),
                      h.description && /* @__PURE__ */ t("div", { className: s("text-[11px] text-[#64748b] leading-tight mt-0.5 overflow-hidden line-clamp-2"), children: h.description }),
                      /* @__PURE__ */ u("div", { className: s("text-[11px] text-text-tertiary mt-0.5"), children: [
                        h.fields.length,
                        " section",
                        h.fields.length !== 1 ? "s" : ""
                      ] })
                    ] }),
                    y && /* @__PURE__ */ t("span", { className: s("absolute top-1.5 right-2 text-sm text-[#3b82f6] font-bold"), children: "✓" })
                  ]
                },
                h.id
              );
            }) })
          ] }),
          /* @__PURE__ */ u("div", { className: s("mb-4"), children: [
            /* @__PURE__ */ u("label", { className: s("block text-[13px] font-semibold text-text-secondary mb-1"), children: [
              "Title ",
              /* @__PURE__ */ t("span", { className: s("text-[#ef4444]"), children: "*" })
            ] }),
            /* @__PURE__ */ t(
              "input",
              {
                ref: x,
                "data-testid": "new-doc-title",
                type: "text",
                value: i,
                onChange: (h) => p(h.target.value),
                placeholder: m ? `e.g. Q2 ${m.name}` : "Document title…",
                className: s("w-full px-3 py-2 text-sm border border-border rounded-lg outline-none bg-white text-[#1e293b] box-border font-[inherit] focus:border-[#3b82f6]")
              }
            )
          ] }),
          /* @__PURE__ */ u("div", { className: s("mb-5"), children: [
            /* @__PURE__ */ u("label", { className: s("block text-[13px] font-semibold text-text-secondary mb-1"), children: [
              "Description ",
              /* @__PURE__ */ t("span", { className: s("text-text-tertiary font-normal"), children: "(optional)" })
            ] }),
            /* @__PURE__ */ t(
              "textarea",
              {
                "data-testid": "new-doc-description",
                value: c,
                onChange: (h) => f(h.target.value),
                placeholder: "Brief description of this document…",
                rows: 3,
                className: s("w-full px-3 py-2 text-sm border border-border rounded-lg outline-none bg-white text-[#1e293b] resize-y box-border font-[inherit] focus:border-[#3b82f6]")
              }
            )
          ] })
        ] }) }),
        a.length > 0 && /* @__PURE__ */ u("div", { className: s("flex justify-end gap-2 px-6 py-4 border-t border-border bg-white shrink-0"), children: [
          /* @__PURE__ */ t(
            "button",
            {
              "data-testid": "new-doc-cancel",
              onClick: r,
              className: s("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-white text-text-secondary cursor-pointer font-[inherit]"),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              "data-testid": "new-doc-submit",
              onClick: N,
              disabled: !k,
              className: s(
                "px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]",
                k ? "bg-[#3b82f6] cursor-pointer" : "bg-[#94a3b8] cursor-not-allowed"
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
  Le as D,
  Ne as E,
  ht as N,
  T,
  $e as a,
  q as b
};
