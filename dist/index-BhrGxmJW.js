import { r as L, c as k } from "./registry-BZU57zws.js";
import { jsx as r, jsxs as u, Fragment as J } from "react/jsx-runtime";
import { useMemo as ne, useState as S, useRef as D, useEffect as A, useCallback as E } from "react";
import { useEditor as ae, EditorContent as ie } from "@tiptap/react";
import oe from "@tiptap/starter-kit";
import se from "@tiptap/extension-task-list";
import le from "@tiptap/extension-task-item";
import de from "@tiptap/extension-placeholder";
import ce from "@tiptap/extension-collaboration";
import * as O from "yjs";
import { ySyncPluginKey as z, relativePositionToAbsolutePosition as _, absolutePositionToRelativePosition as M } from "@tiptap/y-tiptap";
import { c as f } from "./cn-B6yFEsav.js";
import { D as V, p as ue } from "./useVideoSessions-hr67KvHn.js";
const pe = {
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
}, fe = {
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
}, he = {
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
}, xe = {
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
}, me = {
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
}, be = {
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
}, ge = {
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
}, ke = [
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
function ye({ editor: e }) {
  return e ? /* @__PURE__ */ r("div", { className: f("flex flex-wrap gap-1 px-2 py-1.5 border-b border-border bg-[#f8fafc] rounded-t-lg"), children: ke.map((t) => {
    const n = t.isActive(e);
    return /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: () => t.action(e),
        className: f(
          "px-2 py-1 text-xs font-[inherit] border border-[#cbd5e1] rounded cursor-pointer leading-snug",
          n ? "bg-[#3b82f6] text-white" : "bg-white text-[#334155]"
        ),
        title: t.label,
        children: t.label
      },
      t.label
    );
  }) }) : null;
}
const ve = console.warn;
console.warn = (...e) => {
  typeof e[0] == "string" && e[0].includes("extension-collaboration") || ve(...e);
};
function j(e, t, n) {
  try {
    if (t < 0 || t > e.state.doc.content.size) return null;
    const a = e.coordsAtPos(t), l = (n || e.dom).getBoundingClientRect();
    return {
      top: a.top - l.top,
      left: a.left - l.left,
      height: a.bottom - a.top
    };
  } catch {
    return null;
  }
}
function Ne({ cursors: e, editorView: t, containerEl: n }) {
  return t ? /* @__PURE__ */ r(J, { children: e.map((a) => {
    if (a.head == null) return null;
    const o = j(t, a.head, n);
    if (!o) return null;
    const l = a.name.split(" ").map((i) => i[0] ?? "").join("").toUpperCase().slice(0, 2) || a.name.slice(0, 2).toUpperCase(), s = [];
    if (a.anchor != null && a.anchor !== a.head) {
      const i = Math.min(a.anchor, a.head), c = Math.max(a.anchor, a.head);
      try {
        const p = t.dom.offsetWidth;
        let x = i;
        for (; x <= c; ) {
          const b = j(t, x, n);
          if (!b) break;
          let N = x;
          const m = b.top;
          for (let y = x + 1; y <= c; y++) {
            const g = j(t, y, n);
            if (!g || Math.abs(g.top - m) > 2) break;
            N = y;
          }
          const v = j(t, N, n);
          if (v) {
            const y = x === i ? b.left : 0, g = N === c ? v.left + 4 : p;
            s.push(
              /* @__PURE__ */ r(
                "div",
                {
                  className: "absolute rounded-sm pointer-events-none opacity-[0.12] z-[5]",
                  style: {
                    top: m,
                    left: y,
                    width: Math.max(g - y, 4),
                    height: b.height || 18,
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
          children: l
        }
      )
    ] }, a.clientId);
  }) }) : null;
}
function T({
  fragment: e,
  ydoc: t,
  provider: n,
  user: a,
  editable: o = !0,
  placeholder: l = "Start typing...",
  sectionId: s,
  onUpdateCursorInfo: i
}) {
  const c = ne(() => [
    oe.configure({ history: !1 }),
    se,
    le.configure({ nested: !0 }),
    de.configure({ placeholder: l }),
    ce.configure({ document: t, fragment: e })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [t, e]), d = ae({
    extensions: c,
    editable: o
  }, [c]), [p, x] = S([]), b = D(null);
  A(() => {
    if (i)
      i(a.name, a.color);
    else if (n?.awareness) {
      const v = n.awareness.getLocalState()?.user || {};
      n.awareness.setLocalStateField("user", {
        ...v,
        name: a.name,
        color: a.color
      });
    }
  }, [n, a, i]);
  const N = E(() => {
    if (!n?.awareness || !d?.view) return;
    const m = n.awareness.getStates(), v = n.awareness.clientID, y = [];
    m.forEach((g, R) => {
      if (R === v) return;
      const w = g.user;
      if (!(!w || !g.cursor) && !(s && g.cursor.sectionId !== s))
        try {
          const C = z.getState(d.view.state);
          if (!C?.type || !C?.binding?.mapping) return;
          const I = _(
            C.doc,
            C.type,
            O.createRelativePositionFromJSON(g.cursor.anchor),
            C.binding.mapping
          ), B = _(
            C.doc,
            C.type,
            O.createRelativePositionFromJSON(g.cursor.head),
            C.binding.mapping
          );
          y.push({
            clientId: R,
            name: w.name || `User ${R}`,
            color: w.color || "#3b82f6",
            anchor: I,
            head: B
          });
        } catch {
        }
    }), x(y);
  }, [n, d]);
  return A(() => {
    if (!d?.view || !n?.awareness) return;
    const m = () => {
      try {
        const v = z.getState(d.view.state);
        if (!v?.type || !v?.binding?.mapping) return;
        const { anchor: y, head: g } = d.view.state.selection, R = M(y, v.type, v.binding.mapping), w = M(g, v.type, v.binding.mapping);
        n.awareness.setLocalStateField("cursor", { anchor: R, head: w, sectionId: s });
      } catch {
      }
    };
    return d.on("selectionUpdate", m), m(), () => {
      d.off("selectionUpdate", m);
    };
  }, [d, n, s]), A(() => {
    if (!n?.awareness) return;
    const m = () => N();
    return n.awareness.on("change", m), () => {
      n.awareness.off("change", m);
    };
  }, [n, N]), /* @__PURE__ */ u("div", { className: f(o ? "border border-border rounded-lg overflow-hidden relative" : "relative"), children: [
    o && /* @__PURE__ */ r(ye, { editor: d }),
    /* @__PURE__ */ u("div", { ref: b, className: f("px-4 py-3 text-sm leading-relaxed text-[#1e293b] relative"), children: [
      /* @__PURE__ */ r(ie, { editor: d }),
      /* @__PURE__ */ r(Ne, { cursors: p, editorView: d?.view, containerEl: b.current })
    ] })
  ] });
}
const we = {
  pending: "#94a3b8",
  acked: "#3b82f6",
  done: "#22c55e",
  rejected: "#ef4444"
}, H = {
  low: "#94a3b8",
  medium: "#f97316",
  high: "#ef4444"
}, Re = {
  start: "#22c55e",
  stop: "#ef4444",
  continue: "#3b82f6"
};
function Ce(e) {
  const t = new Date(e);
  return isNaN(t.getTime()) ? e : t.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function De(e) {
  const t = new Date(e);
  if (isNaN(t.getTime())) return !1;
  const n = /* @__PURE__ */ new Date();
  return n.setHours(0, 0, 0, 0), t < n;
}
function K(e) {
  return e.split(/\s+/).map((t) => t[0]).join("").toUpperCase().slice(0, 2);
}
function Ae({ item: e, editable: t, onUpdate: n, onRemove: a, autoFocusText: o, onDidAutoFocus: l }) {
  const [s, i] = S(!1), [c, d] = S(""), [p, x] = S(0), b = D(null), N = D(null), m = D(null), v = () => {
    const h = e.status === "done" ? "pending" : "done";
    n({ status: h });
  }, y = e.assignee ? V.find((h) => h.displayName === e.assignee) : void 0, g = c.trim() ? ue(c) : V, R = E(() => {
    t && (d(""), x(0), i(!0));
  }, [t]), w = E(() => {
    i(!1), d(""), x(0);
  }, []), C = E((h) => {
    n({ assignee: h.displayName }), w();
  }, [n, w]), I = E(() => {
    n({ assignee: "" }), w();
  }, [n, w]);
  A(() => {
    if (!s) return;
    const h = ($) => {
      b.current && !b.current.contains($.target) && w();
    };
    return document.addEventListener("mousedown", h), () => document.removeEventListener("mousedown", h);
  }, [s, w]), A(() => {
    s && N.current && N.current.focus();
  }, [s]), A(() => {
    x(0);
  }, [c]), A(() => {
    o && m.current && (m.current.focus(), l?.());
  }, [o, l]);
  const B = (h) => {
    h.key === "Escape" ? w() : h.key === "ArrowDown" ? (h.preventDefault(), x(($) => Math.min($ + 1, g.length - 1))) : h.key === "ArrowUp" ? (h.preventDefault(), x(($) => Math.max($ - 1, 0))) : h.key === "Enter" && (h.preventDefault(), g[p] && C(g[p]));
  }, F = e.dueDate && e.status !== "done" ? De(e.dueDate) : !1;
  return /* @__PURE__ */ u("div", { className: f("flex items-center gap-2 py-1.5 border-b border-[#f1f5f9]"), children: [
    /* @__PURE__ */ r(
      "span",
      {
        title: `Priority: ${e.priority}`,
        className: f("w-2 h-2 rounded-full shrink-0"),
        style: { background: H[e.priority] }
      }
    ),
    /* @__PURE__ */ r(
      "input",
      {
        type: "checkbox",
        checked: e.status === "done",
        onChange: v,
        disabled: !t,
        className: f("w-4 h-4 accent-[#3b82f6]", t ? "cursor-pointer" : "cursor-default")
      }
    ),
    /* @__PURE__ */ r(
      "input",
      {
        ref: m,
        "data-testid": `task-text-${e.id}`,
        type: "text",
        value: e.text,
        onChange: (h) => n({ text: h.target.value }),
        readOnly: !t,
        className: f(
          "flex-1 border-none outline-none text-sm font-[inherit] bg-transparent px-1 py-0.5",
          e.status === "done" ? "line-through text-text-tertiary" : "text-[#1e293b]"
        )
      }
    ),
    e.dueDate && /* @__PURE__ */ u(
      "span",
      {
        title: e.dueDate,
        className: f(
          "inline-block px-2 py-0.5 text-[10px] font-semibold rounded-xl whitespace-nowrap leading-snug border",
          F ? "bg-[#fef2f2] text-[#dc2626] border-[#fecaca]" : "bg-[#f0f9ff] text-[#64748b] border-[#e0f2fe]"
        ),
        children: [
          F ? "⚠ " : "",
          "Due: ",
          Ce(e.dueDate)
        ]
      }
    ),
    e.category && /* @__PURE__ */ r(
      "span",
      {
        className: f("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap"),
        style: { backgroundColor: Re[e.category.toLowerCase()] ?? "#6b7280" },
        children: e.category
      }
    ),
    /* @__PURE__ */ u("div", { ref: b, className: f("relative"), children: [
      /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          onClick: R,
          title: e.assignee || "Unassigned",
          className: f(
            "inline-flex items-center justify-center h-6 rounded-xl font-semibold text-[11px] cursor-pointer leading-snug whitespace-nowrap",
            e.assignee ? "px-2 bg-[#e0e7ff] text-[#4338ca] border-none min-w-0" : "w-6 px-0 bg-white text-text-tertiary border border-dashed border-[#cbd5e1]"
          ),
          children: e.assignee ? /* @__PURE__ */ u(J, { children: [
            /* @__PURE__ */ r(
              "span",
              {
                className: f("w-[18px] h-[18px] rounded-full text-white inline-flex items-center justify-center text-[8px] font-bold shrink-0 leading-none"),
                style: { background: y?.color ?? "#94a3b8" },
                children: K(e.assignee)
              }
            ),
            /* @__PURE__ */ r("span", { className: f("ml-1 text-[11px]"), children: e.assignee.split(" ")[0] })
          ] }) : "+"
        }
      ),
      s && /* @__PURE__ */ u("div", { className: f("absolute top-full left-0 mt-1 min-w-[180px] max-h-[200px] overflow-y-auto bg-white border border-border rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.12)] z-[1000] py-1"), children: [
        /* @__PURE__ */ r("div", { className: f("px-2 py-1"), children: /* @__PURE__ */ r(
          "input",
          {
            ref: N,
            type: "text",
            value: c,
            onChange: (h) => d(h.target.value),
            onKeyDown: B,
            placeholder: "Search users...",
            className: f("w-full text-[11px] font-[inherit] px-2 py-1 rounded-md border border-[#d1d5db] outline-none h-7 bg-white text-[#1e293b] box-border")
          }
        ) }),
        e.assignee && /* @__PURE__ */ u(
          "button",
          {
            type: "button",
            onClick: I,
            className: f("flex items-center gap-2 py-1.5 px-2.5 text-xs cursor-pointer bg-transparent border-none w-full text-left font-[inherit] text-[#1e293b]"),
            children: [
              /* @__PURE__ */ r("span", { className: f("w-[22px] h-[22px] rounded-full bg-[#cbd5e1] text-[#64748b] inline-flex items-center justify-center text-[10px] font-bold shrink-0 leading-none"), children: "--" }),
              /* @__PURE__ */ r("span", { className: f("text-[#64748b] italic"), children: "Unassigned" })
            ]
          }
        ),
        g.map((h, $) => /* @__PURE__ */ u(
          "button",
          {
            type: "button",
            onClick: () => C(h),
            onMouseEnter: () => x($),
            className: f(
              "flex items-center gap-2 py-1.5 px-2.5 text-xs cursor-pointer border-none w-full text-left font-[inherit] text-[#1e293b]",
              $ === p ? "bg-surface-hover" : "bg-transparent"
            ),
            children: [
              /* @__PURE__ */ r(
                "span",
                {
                  className: f("w-[22px] h-[22px] rounded-full text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0 leading-none"),
                  style: { background: h.color },
                  children: K(h.displayName)
                }
              ),
              /* @__PURE__ */ r("span", { children: h.displayName })
            ]
          },
          h.userId
        )),
        g.length === 0 && /* @__PURE__ */ r("div", { className: f("px-2.5 py-2 text-[11px] text-text-tertiary"), children: "No users found" })
      ] })
    ] }),
    /* @__PURE__ */ u(
      "select",
      {
        value: e.priority,
        disabled: !t,
        onChange: (h) => n({ priority: h.target.value }),
        className: f("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap border-none outline-none appearance-none pr-4 doc-select-arrow", t ? "cursor-pointer" : "cursor-default"),
        style: { backgroundColor: H[e.priority] },
        title: `Priority: ${e.priority}`,
        children: [
          /* @__PURE__ */ r("option", { value: "low", children: "low" }),
          /* @__PURE__ */ r("option", { value: "medium", children: "medium" }),
          /* @__PURE__ */ r("option", { value: "high", children: "high" })
        ]
      }
    ),
    /* @__PURE__ */ u(
      "select",
      {
        value: e.status,
        disabled: !t,
        onChange: (h) => n({ status: h.target.value }),
        className: f("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap border-none outline-none appearance-none pr-4 doc-select-arrow", t ? "cursor-pointer" : "cursor-default"),
        style: { backgroundColor: we[e.status] },
        title: `Status: ${e.status}`,
        children: [
          /* @__PURE__ */ r("option", { value: "pending", children: "pending" }),
          /* @__PURE__ */ r("option", { value: "acked", children: "acked" }),
          /* @__PURE__ */ r("option", { value: "done", children: "done" }),
          /* @__PURE__ */ r("option", { value: "rejected", children: "rejected" })
        ]
      }
    ),
    t && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: a,
        title: "Remove task",
        className: f("border-none bg-transparent text-[#ef4444] cursor-pointer text-base px-1.5 py-0.5 rounded leading-none"),
        children: "x"
      }
    )
  ] });
}
function Y({ items: e, editable: t, onUpdateItem: n, onRemoveItem: a, focusLastItem: o }) {
  if (e.length === 0)
    return /* @__PURE__ */ r("div", { className: f("text-text-tertiary text-[13px] italic py-2"), children: "No tasks yet." });
  const l = o?.current ?? !1;
  return /* @__PURE__ */ r("div", { className: f("py-2"), children: e.map((s, i) => /* @__PURE__ */ r(
    Ae,
    {
      item: s,
      editable: t,
      onUpdate: (c) => n(s.id, c),
      onRemove: () => a(s.id),
      autoFocusText: l && i === e.length - 1,
      onDidAutoFocus: l && i === e.length - 1 ? () => {
        o && (o.current = !1);
      } : void 0
    },
    s.id
  )) });
}
function $e({
  section: e,
  fragment: t,
  ydoc: n,
  provider: a,
  user: o,
  editable: l,
  onAddItem: s,
  onUpdateItem: i,
  onRemoveItem: c,
  onUpdateCursorInfo: d
}) {
  const p = D(!1), x = () => {
    s?.({ text: "", status: "pending", assignee: "", ackedBy: "", ackedAt: "", priority: "medium", notes: "" }), p.current = !0;
  };
  return /* @__PURE__ */ u("div", { children: [
    t && n && /* @__PURE__ */ r(
      T,
      {
        fragment: t,
        ydoc: n,
        provider: a ?? null,
        user: o ?? { name: "Anonymous", color: "#6b7280" },
        editable: l,
        placeholder: e.placeholder ?? `Write ${e.type} content...`,
        sectionId: e.id,
        onUpdateCursorInfo: d
      }
    ),
    (e.items.length > 0 || l) && /* @__PURE__ */ r(
      Y,
      {
        items: e.items,
        editable: l,
        onUpdateItem: (b, N) => i?.(b, N),
        onRemoveItem: (b) => c?.(b),
        focusLastItem: p
      }
    ),
    l && /* @__PURE__ */ r(
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
function Se({
  section: e,
  fragment: t,
  ydoc: n,
  provider: a,
  user: o,
  editable: l,
  onUpdateCursorInfo: s
}) {
  return !t || !n ? /* @__PURE__ */ r("div", { className: "text-text-tertiary italic text-[13px] py-2", children: "No content yet." }) : /* @__PURE__ */ r(
    T,
    {
      fragment: t,
      ydoc: n,
      provider: a ?? null,
      user: o ?? { name: "Anonymous", color: "#6b7280" },
      editable: l,
      placeholder: e.placeholder ?? "Write content...",
      sectionId: e.id,
      onUpdateCursorInfo: s
    }
  );
}
function q({
  section: e,
  fragment: t,
  ydoc: n,
  provider: a,
  onNavigateToEditor: o
}) {
  return /* @__PURE__ */ u("div", { children: [
    !!t && !!n ? /* @__PURE__ */ r("div", { className: "border border-sky-100 border-l-[3px] border-l-sky-400 rounded-md px-3.5 py-2.5 bg-sky-50 text-sm text-slate-800 leading-[1.6]", children: /* @__PURE__ */ r(
      T,
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
        className: "mt-2 bg-transparent border-none text-blue-500 text-xs cursor-pointer p-0 font-inherit",
        children: "Edit in editor →"
      }
    )
  ] });
}
function Le({
  section: e,
  editable: t,
  onAddItem: n,
  onUpdateItem: a,
  onRemoveItem: o
}) {
  const l = D(!1), s = () => {
    n?.({
      text: "",
      status: "pending",
      assignee: "",
      ackedBy: "",
      ackedAt: "",
      priority: "medium",
      notes: ""
    }), l.current = !0;
  };
  return /* @__PURE__ */ u("div", { className: "py-1", children: [
    e.items.length > 0 || t ? /* @__PURE__ */ r(
      Y,
      {
        items: e.items,
        editable: t,
        onUpdateItem: (i, c) => a?.(i, c),
        onRemoveItem: (i) => o?.(i),
        focusLastItem: l
      }
    ) : null,
    e.items.length === 0 && !t && /* @__PURE__ */ r("p", { className: "text-text-tertiary text-[13px] italic my-2", children: "No items yet." }),
    t && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: s,
        className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-slate-500 cursor-pointer font-inherit",
        children: "+ Add item"
      }
    )
  ] });
}
const Te = {
  pending: { label: "Pending", color: "#92400e", bg: "#fef3c7" },
  acked: { label: "Acked", color: "#1e40af", bg: "#dbeafe" },
  done: { label: "Done", color: "#065f46", bg: "#d1fae5" },
  rejected: { label: "Rejected", color: "#991b1b", bg: "#fee2e2" }
}, Ee = {
  high: "#ef4444",
  medium: "#f97316",
  low: "#94a3b8"
};
function je(e) {
  const t = new Date(e);
  if (isNaN(t.getTime())) return !1;
  const n = /* @__PURE__ */ new Date();
  return n.setHours(0, 0, 0, 0), t < n;
}
function Ie(e) {
  const t = new Date(e);
  return isNaN(t.getTime()) ? e : t.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function Be(e) {
  return e.split(/\s+/).map((t) => t[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function U({ item: e, onUpdateItem: t }) {
  const [n, a] = S(!1), o = Te[e.status], l = e.dueDate && e.status === "pending" ? je(e.dueDate) : !1, s = e.status === "done" || e.status === "acked";
  return /* @__PURE__ */ u(
    "div",
    {
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      className: "flex items-center gap-2 py-1.5 border-b border-slate-100",
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
              background: Ee[e.priority],
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
        /* @__PURE__ */ r("span", { className: f("flex-1 text-[13px] leading-[1.4]", s ? "text-text-tertiary line-through" : "text-slate-800"), children: e.text || /* @__PURE__ */ r("span", { className: "text-text-disabled italic", children: "Untitled item" }) }),
        e.assignee && /* @__PURE__ */ r(
          "span",
          {
            title: e.assignee,
            className: "w-[22px] h-[22px] rounded-full bg-indigo-100 text-indigo-700 text-[9px] font-bold flex items-center justify-center shrink-0",
            children: Be(e.assignee)
          }
        ),
        e.dueDate && /* @__PURE__ */ u("span", { style: {
          fontSize: 10,
          fontWeight: 600,
          padding: "1px 6px",
          borderRadius: 10,
          background: l ? "#fef2f2" : "#f0f9ff",
          color: l ? "#dc2626" : "#64748b",
          border: l ? "1px solid #fecaca" : "1px solid #e0f2fe",
          whiteSpace: "nowrap",
          flexShrink: 0
        }, children: [
          l ? "⚠ " : "",
          Ie(e.dueDate)
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
function Q({ section: e, onUpdateItem: t, onNavigateToEditor: n }) {
  const a = e.items;
  if (a.length === 0)
    return /* @__PURE__ */ r("div", { className: "text-text-tertiary italic text-[13px] py-1", children: "No items." });
  const o = a.filter((i) => i.status === "pending"), l = a.filter((i) => i.status === "done" || i.status === "acked"), s = a.filter((i) => i.status === "rejected");
  return /* @__PURE__ */ u("div", { children: [
    o.length > 0 && /* @__PURE__ */ r("div", { className: "mb-1", children: o.map((i) => /* @__PURE__ */ r(U, { item: i, onUpdateItem: t }, i.id)) }),
    l.length > 0 && /* @__PURE__ */ r("div", { className: "mb-1", children: l.map((i) => /* @__PURE__ */ r(U, { item: i, onUpdateItem: t }, i.id)) }),
    s.length > 0 && /* @__PURE__ */ r("div", { children: s.map((i) => /* @__PURE__ */ r(U, { item: i, onUpdateItem: t }, i.id)) }),
    n && /* @__PURE__ */ r(
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
function Ue({ item: e, editable: t, autoFocus: n, onDidAutoFocus: a, onUpdate: o, onRemove: l }) {
  const s = D(null), i = e.status === "done";
  return A(() => {
    n && s.current && (s.current.focus(), a?.());
  }, [n, a]), /* @__PURE__ */ u("div", { className: "flex items-center gap-2 py-[5px] border-b border-slate-100", children: [
    /* @__PURE__ */ r(
      "input",
      {
        type: "checkbox",
        checked: i,
        onChange: () => o({ status: i ? "pending" : "done" }),
        disabled: !t,
        className: f("w-[15px] h-[15px] accent-emerald-500 shrink-0", t ? "cursor-pointer" : "cursor-default")
      }
    ),
    /* @__PURE__ */ r(
      "input",
      {
        ref: s,
        type: "text",
        value: e.text,
        onChange: (c) => o({ text: c.target.value }),
        readOnly: !t,
        placeholder: "Checklist item...",
        className: f(
          "flex-1 border-none outline-none text-sm font-inherit bg-transparent px-1 py-0.5",
          i ? "text-text-tertiary line-through" : "text-slate-800"
        )
      }
    ),
    t && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: l,
        className: "border-none bg-transparent text-red-500 cursor-pointer text-base px-1.5 py-0.5 leading-none",
        children: "×"
      }
    )
  ] });
}
function Pe({
  section: e,
  fragment: t,
  ydoc: n,
  provider: a,
  user: o,
  editable: l,
  onAddItem: s,
  onUpdateItem: i,
  onRemoveItem: c,
  onUpdateCursorInfo: d
}) {
  const p = D(!1), x = () => {
    s?.({ text: "", status: "pending", assignee: "", ackedBy: "", ackedAt: "", priority: "medium", notes: "" }), p.current = !0;
  }, b = e.items.length, N = e.items.filter((m) => m.status === "done").length;
  return /* @__PURE__ */ u("div", { children: [
    t && n && /* @__PURE__ */ r(
      T,
      {
        fragment: t,
        ydoc: n,
        provider: a ?? null,
        user: o ?? { name: "Anonymous", color: "#6b7280" },
        editable: l,
        placeholder: e.placeholder ?? "Add notes or context...",
        sectionId: e.id,
        onUpdateCursorInfo: d
      }
    ),
    b > 0 && /* @__PURE__ */ u("div", { className: "text-[11px] text-slate-500 font-semibold mb-1.5", children: [
      N,
      " / ",
      b,
      " done"
    ] }),
    /* @__PURE__ */ r("div", { children: e.items.map((m, v) => {
      const y = v === e.items.length - 1, g = p.current && y;
      return /* @__PURE__ */ r(
        Ue,
        {
          item: m,
          editable: l,
          autoFocus: g,
          onDidAutoFocus: g ? () => {
            p.current = !1;
          } : void 0,
          onUpdate: (R) => i?.(m.id, R),
          onRemove: () => c?.(m.id)
        },
        m.id
      );
    }) }),
    l && /* @__PURE__ */ r(
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
  fragment: t,
  ydoc: n,
  provider: a,
  onUpdateItem: o,
  onNavigateToEditor: l
}) {
  const s = e.items, i = s.length, c = s.filter((p) => p.status === "done").length, d = i > 0 ? Math.round(c / i * 100) : 0;
  return /* @__PURE__ */ u("div", { children: [
    t && n && /* @__PURE__ */ r("div", { className: "mb-2.5", children: /* @__PURE__ */ r(
      T,
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
        /* @__PURE__ */ u("span", { className: "text-[11px] text-slate-500 font-semibold", children: [
          c,
          " / ",
          i,
          " done"
        ] }),
        /* @__PURE__ */ u("span", { className: f("text-[11px] font-semibold", d === 100 ? "text-emerald-500" : "text-slate-500"), children: [
          d,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ r("div", { className: "h-1 bg-border rounded-sm overflow-hidden", children: /* @__PURE__ */ r(
        "div",
        {
          className: f("h-full rounded-sm transition-[width] duration-300", d === 100 ? "bg-emerald-500" : "bg-blue-500"),
          style: { width: `${d}%` }
        }
      ) })
    ] }),
    i === 0 ? /* @__PURE__ */ r("div", { className: "text-text-tertiary italic text-[13px]", children: "No items." }) : /* @__PURE__ */ r("div", { children: s.map((p) => {
      const x = p.status === "done";
      return /* @__PURE__ */ u(
        "div",
        {
          className: "flex items-center gap-2 py-[5px] border-b border-slate-100",
          children: [
            /* @__PURE__ */ r(
              "input",
              {
                type: "checkbox",
                checked: x,
                onChange: () => o?.(p.id, { status: x ? "pending" : "done" }),
                className: f("w-3.5 h-3.5 accent-emerald-500 shrink-0", o ? "cursor-pointer" : "cursor-default"),
                readOnly: !o
              }
            ),
            /* @__PURE__ */ r("span", { className: f("text-[13px] flex-1 leading-[1.4]", x ? "text-text-tertiary line-through" : "text-slate-800"), children: p.text || /* @__PURE__ */ r("span", { className: "text-text-disabled italic", children: "Untitled" }) })
          ]
        },
        p.id
      );
    }) }),
    l && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: () => l(e.id),
        className: "mt-2 bg-transparent border-none text-blue-500 text-xs cursor-pointer p-0 font-inherit",
        children: "Edit in editor →"
      }
    )
  ] });
}
const Fe = {
  acked: "approved",
  done: "approved",
  rejected: "rejected"
};
function Oe() {
  return "";
}
function ze() {
  if (typeof window > "u") return null;
  const e = window.location.pathname.match(/\/documents\/([^/?#]+)/);
  return e ? e[1] : null;
}
function _e(e) {
  return Fe[e] ?? null;
}
async function Me(e) {
  const t = e.documentId ?? ze();
  if (!t) return { ok: !1, error: "no documentId in URL" };
  try {
    const n = { "Content-Type": "application/json" };
    e.idToken && (n.Authorization = `Bearer ${e.idToken}`);
    const a = await fetch(`${Oe()}/api/approvals`, {
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
const W = {
  pending: { label: "Open", icon: "○", color: "#92400e", bg: "#fef3c7" },
  acked: { label: "Decided", icon: "✓", color: "#065f46", bg: "#d1fae5" },
  done: { label: "Decided", icon: "✓", color: "#065f46", bg: "#d1fae5" },
  rejected: { label: "Vetoed", icon: "✕", color: "#991b1b", bg: "#fee2e2" }
};
function Ve({ item: e, editable: t, autoFocus: n, onDidAutoFocus: a, onUpdate: o, onRemove: l }) {
  const s = D(null), i = W[e.status] ?? W.pending;
  return A(() => {
    n && s.current && (s.current.focus(), a?.());
  }, [n, a]), /* @__PURE__ */ u("div", { className: "flex items-center gap-2 py-1.5 border-b border-slate-100", children: [
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
        onChange: (c) => o({ text: c.target.value }),
        readOnly: !t,
        placeholder: "Describe the decision...",
        className: f(
          "flex-1 border-none outline-none text-sm font-inherit bg-transparent px-1 py-0.5",
          e.status === "rejected" ? "text-text-tertiary line-through" : "text-slate-800"
        )
      }
    ),
    t && /* @__PURE__ */ u(
      "select",
      {
        value: e.status === "done" ? "acked" : e.status,
        onChange: (c) => o({ status: c.target.value }),
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
        onClick: l,
        className: "border-none bg-transparent text-red-500 cursor-pointer text-base px-1.5 py-0.5 leading-none",
        children: "×"
      }
    )
  ] });
}
function He({
  section: e,
  fragment: t,
  ydoc: n,
  provider: a,
  user: o,
  editable: l,
  onAddItem: s,
  onUpdateItem: i,
  onRemoveItem: c,
  onUpdateCursorInfo: d
}) {
  const p = D(!1), x = () => {
    s?.({ text: "", status: "pending", assignee: "", ackedBy: "", ackedAt: "", priority: "medium", notes: "" }), p.current = !0;
  };
  return /* @__PURE__ */ u("div", { children: [
    t && n && /* @__PURE__ */ r(
      T,
      {
        fragment: t,
        ydoc: n,
        provider: a ?? null,
        user: o ?? { name: "Anonymous", color: "#6b7280" },
        editable: l,
        placeholder: e.placeholder ?? "Add context or background...",
        sectionId: e.id,
        onUpdateCursorInfo: d
      }
    ),
    e.items.length === 0 && !l && /* @__PURE__ */ r("div", { className: "text-text-tertiary italic text-[13px] py-1", children: "No decisions yet." }),
    /* @__PURE__ */ r("div", { children: e.items.map((b, N) => {
      const m = N === e.items.length - 1, v = p.current && m;
      return /* @__PURE__ */ r(
        Ve,
        {
          item: b,
          editable: l,
          autoFocus: v,
          onDidAutoFocus: v ? () => {
            p.current = !1;
          } : void 0,
          onUpdate: (y) => {
            const g = b.status;
            if (i?.(b.id, y), y.status && y.status !== g) {
              const R = _e(y.status);
              R && Me({
                sectionId: e.id,
                decision: R,
                reviewerName: o?.name
              });
            }
          },
          onRemove: () => c?.(b.id)
        },
        b.id
      );
    }) }),
    l && /* @__PURE__ */ r(
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
const G = {
  pending: { label: "Open", icon: "○", color: "#92400e", bg: "#fef3c7" },
  acked: { label: "Decided", icon: "✓", color: "#065f46", bg: "#d1fae5" },
  done: { label: "Decided", icon: "✓", color: "#065f46", bg: "#d1fae5" },
  rejected: { label: "Vetoed", icon: "✕", color: "#991b1b", bg: "#fee2e2" }
};
function Ke({ item: e }) {
  const t = G[e.status] ?? G.pending;
  return /* @__PURE__ */ u("div", { className: "flex items-start gap-2 py-1.5 border-b border-slate-100", children: [
    /* @__PURE__ */ r(
      "span",
      {
        className: "w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 select-none",
        style: { background: t.bg, color: t.color },
        children: t.icon
      }
    ),
    /* @__PURE__ */ r("span", { className: f(
      "flex-1 text-[13px] leading-[1.4]",
      e.status === "rejected" ? "text-text-tertiary line-through" : "text-slate-800"
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
    n.map((a) => /* @__PURE__ */ r(Ke, { item: a }, a.id))
  ] });
}
function Z({ section: e, onNavigateToEditor: t }) {
  const n = e.items;
  if (n.length === 0)
    return /* @__PURE__ */ r("div", { className: "text-text-tertiary italic text-[13px] py-1", children: "No decisions recorded." });
  const a = n.filter((s) => s.status === "pending"), o = n.filter((s) => s.status === "acked" || s.status === "done"), l = n.filter((s) => s.status === "rejected");
  return /* @__PURE__ */ u("div", { children: [
    a.length > 0 && /* @__PURE__ */ r(P, { label: "Open", color: "#92400e", items: a }),
    o.length > 0 && /* @__PURE__ */ r(P, { label: "Decided", color: "#065f46", items: o }),
    l.length > 0 && /* @__PURE__ */ r(P, { label: "Vetoed", color: "#991b1b", items: l }),
    t && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: () => t(e.id),
        className: "mt-1.5 bg-transparent border-none text-blue-500 text-xs cursor-pointer p-0 font-inherit",
        children: "Edit in editor →"
      }
    )
  ] });
}
function We(e) {
  return e.metadata ?? {};
}
function Ge({
  section: e,
  editable: t,
  onUpdateSection: n
}) {
  const a = We(e), [o, l] = S(!1), s = (c) => {
    l(!0);
    const d = new FileReader();
    d.onload = () => {
      n?.({
        metadata: {
          ...e.metadata ?? {},
          fileName: c.name,
          fileDataUrl: typeof d.result == "string" ? d.result : "",
          fileSize: c.size
        }
      }), l(!1);
    }, d.onerror = () => l(!1), d.readAsDataURL(c);
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
        className: "border-none bg-transparent text-red-500 cursor-pointer text-sm px-1.5 py-0.5",
        children: "×"
      }
    )
  ] }) : /* @__PURE__ */ u(
    "label",
    {
      "data-testid": `file-upload-empty-${e.id}`,
      className: f(
        "block px-4 py-3.5 border border-dashed border-border-emphasis rounded-lg text-slate-500 text-[13px] text-center bg-surface-inset",
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
            onChange: (c) => {
              const d = c.target.files?.[0];
              d && s(d);
            }
          }
        )
      ]
    }
  ) });
}
function ee({ section: e }) {
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
function Je({
  section: e,
  editable: t,
  onUpdateSection: n
}) {
  const a = e.metadata ?? {}, [o, l] = S(!1), s = (d) => {
    l(!0);
    const p = new FileReader();
    p.onload = () => {
      n?.({
        metadata: {
          ...e.metadata ?? {},
          imageDataUrl: typeof p.result == "string" ? p.result : "",
          alt: a.alt ?? d.name
        }
      }), l(!1);
    }, p.onerror = () => l(!1), p.readAsDataURL(d);
  }, i = (d) => {
    n?.({
      metadata: { ...e.metadata ?? {}, alt: d }
    });
  }, c = () => {
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
          onChange: (d) => i(d.target.value),
          className: "flex-1 px-2 py-1 text-xs border border-border-emphasis rounded"
        }
      ),
      /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          "data-testid": `diagram-remove-${e.id}`,
          onClick: c,
          className: "bg-transparent border-none text-red-500 cursor-pointer text-[13px]",
          children: "Remove"
        }
      )
    ] })
  ] }) : /* @__PURE__ */ u(
    "label",
    {
      "data-testid": `diagram-empty-${e.id}`,
      className: f(
        "block px-4 py-3.5 border border-dashed border-border-emphasis rounded-lg text-slate-500 text-[13px] text-center bg-surface-inset",
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
            onChange: (d) => {
              const p = d.target.files?.[0];
              p && s(p);
            }
          }
        )
      ]
    }
  ) });
}
function te({ section: e }) {
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
function Ye(e) {
  const t = e.metadata ?? {};
  return Array.isArray(t.links) ? t.links : [];
}
function qe({
  section: e,
  editable: t,
  onUpdateSection: n
}) {
  const a = Ye(e), o = (c) => {
    n?.({
      metadata: { ...e.metadata ?? {}, links: c }
    });
  }, l = () => o([...a, { label: "", url: "" }]), s = (c, d) => {
    o(a.map((p, x) => x === c ? { ...p, ...d } : p));
  }, i = (c) => {
    o(a.filter((d, p) => p !== c));
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
    a.map((c, d) => /* @__PURE__ */ u("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "text",
          "data-testid": `link-block-label-${e.id}-${d}`,
          value: c.label,
          placeholder: "Label",
          onChange: (p) => s(d, { label: p.target.value }),
          disabled: !t,
          className: "flex-1 px-2 py-1 text-[13px] border border-border-emphasis rounded"
        }
      ),
      /* @__PURE__ */ r(
        "input",
        {
          type: "url",
          "data-testid": `link-block-url-${e.id}-${d}`,
          value: c.url,
          placeholder: "https://example.com",
          onChange: (p) => s(d, { url: p.target.value }),
          disabled: !t,
          className: "flex-[2] px-2 py-1 text-[13px] border border-border-emphasis rounded"
        }
      ),
      t && /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          "data-testid": `link-block-remove-${e.id}-${d}`,
          onClick: () => i(d),
          className: "border-none bg-transparent text-red-500 cursor-pointer text-sm px-1.5 py-0.5",
          children: "×"
        }
      )
    ] }, d)),
    t && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        "data-testid": `link-block-add-${e.id}`,
        onClick: l,
        className: "self-start mt-1 px-3 py-1 text-xs bg-transparent border border-dashed border-border-emphasis text-primary rounded-md cursor-pointer",
        children: "+ Add link"
      }
    )
  ] });
}
function re({ section: e }) {
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
L(pe);
L(fe);
L(he);
L(xe);
L(me);
L(be);
L(ge);
k("*", "*", $e);
k("rich-text", "editor", Se);
k("rich-text", "ack", q);
k("rich-text", "reader", q);
k("tasks", "editor", Le);
k("tasks", "ack", Q);
k("tasks", "reader", Q);
k("checklist", "editor", Pe);
k("checklist", "ack", X);
k("checklist", "reader", X);
k("decisions", "editor", He);
k("decisions", "ack", Z);
k("decisions", "reader", Z);
k("file-upload", "editor", Ge);
k("file-upload", "ack", ee);
k("file-upload", "reader", ee);
k("diagram", "editor", Je);
k("diagram", "ack", te);
k("diagram", "reader", te);
k("link-block", "editor", qe);
k("link-block", "ack", re);
k("link-block", "reader", re);
export {
  $e as D,
  ye as E,
  T,
  Ae as a,
  Y as b
};
