import { jsxs as a, jsx as n, Fragment as F } from "react/jsx-runtime";
import { useState as T, useCallback as L, useEffect as O, useRef as V, useMemo as Re, forwardRef as an, useImperativeHandle as ln } from "react";
import dn, { createPortal as ft } from "react-dom";
import { n as cn, b as mn, c as pn, g as un, e as fn, j as xn, l as hn, m as bn, i as gn } from "./useVideoSessions-hr67KvHn.js";
import { u as yn } from "./IdentityContext-CLalsm_M.js";
import { l as xt } from "./useDocumentTypes-C29MkgPl.js";
import { c as e } from "./cn-B6yFEsav.js";
import { u as wn } from "./useHangoutEmbed-DyGzEiRt.js";
import { u as vn } from "./useActiveSpeaker-Xyga4KBG.js";
import { D as Nn, T as fe } from "./index-BhrGxmJW.js";
import { E as So, a as Io, b as To } from "./index-BhrGxmJW.js";
import { b as kn } from "./registry-BZU57zws.js";
import { M as Cn } from "./Modal-2jg4229_.js";
function je() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
const ht = /^- \[([ xX])\]\s+(.+)$/;
function Sn(t, r) {
  const s = t.toLowerCase();
  return ht.test(r) || /- \[[ xX]\]/.test(r) ? "tasks" : s.includes("decision") ? "decisions" : s.includes("summary") ? "summary" : "notes";
}
function Ze(t) {
  const r = t.split(`
`), s = [], i = [];
  for (const o of r) {
    const l = o.match(ht);
    if (l) {
      const d = l[1].toLowerCase() === "x";
      s.push({
        id: je(),
        text: l[2].trim(),
        status: d ? "done" : "pending",
        assignee: "",
        ackedBy: "",
        ackedAt: "",
        priority: "medium",
        notes: ""
      });
    } else
      i.push(o);
  }
  return {
    items: s,
    remaining: i.join(`
`).trim()
  };
}
function In(t) {
  const r = {}, s = [], i = t.replace(/\r\n/g, `
`), o = i.match(/^# (.+)$/m);
  o && (r.title = o[1].trim());
  const l = i.split(/^## /m);
  if (l.length <= 1) {
    const d = i.replace(/^# .+\n*/m, "").trim();
    if (d.length > 0) {
      const { items: m, remaining: u } = Ze(d);
      s.push({
        id: je(),
        type: "summary",
        title: r.title ?? "Untitled",
        contentMarkdown: u,
        items: m
      });
    }
    return { meta: r, sections: s };
  }
  for (let d = 1; d < l.length; d++) {
    const m = l[d], u = m.indexOf(`
`), b = u === -1 ? m.trim() : m.slice(0, u).trim(), f = u === -1 ? "" : m.slice(u + 1).trim(), { items: x, remaining: c } = Ze(f), w = Sn(b, f);
    s.push({
      id: je(),
      type: w,
      title: b,
      contentMarkdown: c,
      items: x
    });
  }
  return { meta: r, sections: s };
}
function Tn(t) {
  return `- [${t.status === "done" || t.status === "acked" ? "x" : " "}] ${t.text}`;
}
function bt(t, r = 0) {
  const s = "  ".repeat(r), i = [];
  i.push(`${s}> **${t.displayName}**: ${t.text}`);
  for (const o of t.replies)
    i.push(bt(o, r + 1));
  return i.join(`
`);
}
function Mn(t) {
  const r = [`## ${t.title}`, ""], s = t.contentMarkdown ?? t.contentText;
  if (s && r.push(s, ""), t.items.length > 0) {
    for (const o of t.items)
      r.push(Tn(o));
    r.push("");
  }
  const i = t.comments;
  if (i && i.length > 0) {
    r.push(`### Comments (${i.length})`, "");
    for (const o of i)
      r.push(bt(o));
    r.push("");
  }
  return r.join(`
`);
}
function Je(t) {
  const r = [`# ${t.meta.title}`, ""];
  for (const s of t.sections)
    r.push(Mn(s));
  return r.join(`
`).trimEnd() + `
`;
}
const $n = `# Q2 Sprint Planning - Meeting Summary

## Executive Summary

This document captures the key outcomes from our Q2 sprint planning session held on April 10, 2026. The team discussed priorities for the upcoming quarter, including the new collaborative editing feature, infrastructure improvements, and customer-facing bug fixes.

Key themes:
- **Real-time collaboration** is the top priority for Q2
- Infrastructure debt needs to be addressed before scaling
- Customer satisfaction scores are trending upward

## Action Items

- [ ] Set up Tiptap editor with Y.js CRDT integration
- [ ] Deploy shared Redis ECS service for multi-instance sync
- [ ] Fix the 48 audit issues identified in the post-fix review
- [ ] Create Playwright tests for 3-browser collaborative editing
- [ ] Design the document export pipeline (PDF, DOCX, Google Docs)
- [x] Complete the WebSocket gateway infrastructure audit
- [x] Remove ElastiCache dependency from CDK stack

## Decisions

- [ ] Adopt Tiptap v3 as the standard rich text editor
- [ ] Use Y.js with custom GatewayProvider (not Hocuspocus)
- [ ] Store CRDT snapshots in DynamoDB with 7-day TTL
- [ ] Support 3 viewing modes: Editor, Review, Reader

## Technical Notes

The collaborative document editor will be built on top of the existing WebSocket gateway infrastructure. The \`crdt-service.js\` backend has been upgraded to maintain a proper \`Y.Doc\` per channel with awareness protocol support.

### Architecture Highlights

1. **Frontend**: Tiptap v3 + Y.js with custom \`GatewayProvider\`
2. **Backend**: Existing crdt-service.js (treats Y.js updates as opaque binary)
3. **Persistence**: EventBridge -> Lambda -> DynamoDB (gzip compressed, 7-day TTL)
4. **Sync**: Redis pub/sub for multi-instance, WebSocket for client delivery

### Performance Targets

- Edit latency: < 50ms (local) / < 200ms (remote)
- Concurrent editors: 10+ per document
- Document size: up to 100KB of rich text
- Snapshot frequency: every 50 operations or 5 minutes
`;
function Dn(t) {
  return t.toString().replace(/<\/?(paragraph|heading|blockquote|codeBlock|bulletList|orderedList|listItem|taskList|taskItem|horizontalRule|hardBreak|doc)[^>]*>/g, `
`).replace(/<[^>]+>/g, "").replace(/\n{3,}/g, `

`).trim();
}
function jn(t) {
  return t.split(`
`).map((r) => r.startsWith("### ") ? `<h3>${r.slice(4)}</h3>` : r.startsWith("## ") ? `<h2>${r.slice(3)}</h2>` : r.startsWith("# ") ? `<h1>${r.slice(2)}</h1>` : r.startsWith("> ") ? `<blockquote>${r.slice(2)}</blockquote>` : r.startsWith("- [x] ") ? `<li>&#9745; ${r.slice(6)}</li>` : r.startsWith("- [ ] ") ? `<li>&#9744; ${r.slice(6)}</li>` : r.startsWith("- ") ? `<li>${r.slice(2)}</li>` : r.trim() === "" ? "<br/>" : `<p>${r}</p>`).join(`
`).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/`([^`]+)`/g, "<code>$1</code>");
}
function Qe(t, r) {
  const s = URL.createObjectURL(t), i = document.createElement("a");
  i.href = s, i.download = r, i.click(), URL.revokeObjectURL(s);
}
function Rn({
  documentId: t,
  userId: r,
  ws: s,
  updateMeta: i,
  addSection: o,
  exportJSON: l,
  getSectionFragment: d,
  comments: m
}) {
  const [u, b] = T(!1), f = L(() => {
    const w = In($n);
    i({
      id: t,
      title: w.meta.title || "Untitled",
      sourceType: "notes",
      sourceId: "",
      createdBy: r,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      aiModel: "",
      status: "draft"
    });
    for (const h of w.sections)
      o({
        id: h.id,
        type: h.type,
        title: h.title,
        collapsed: !1,
        items: h.items
      });
    b(!0);
  }, [t, r, i, o]), x = L(() => {
    s.sendMessage({
      service: "crdt",
      action: "clearDocument",
      channel: `doc:${t}`
    }), b(!1);
  }, [s, t]), c = L((w) => {
    const h = l();
    if (h) {
      for (const k of h.sections) {
        const g = d(k.id);
        g && (k.contentText = Dn(g));
        const M = m[k.id];
        M && M.length > 0 && (k.comments = M);
      }
      if (w === "json") {
        const k = new Blob([JSON.stringify(h, null, 2)], { type: "application/json" });
        Qe(k, `${h.meta.title || "document"}.json`);
      } else if (w === "markdown") {
        const k = Je(h), g = new Blob([k], { type: "text/markdown" });
        Qe(g, `${h.meta.title || "document"}.md`);
      } else if (w === "pdf") {
        const k = Je(h), g = window.open("", "_blank");
        g && (g.document.write(`
          <html>
          <head>
            <title>${h.meta.title || "Document"}</title>
            <style>
              body { font-family: system-ui, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #1e293b; line-height: 1.6; }
              h1 { font-size: 24px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
              h2 { font-size: 18px; margin-top: 24px; }
              h3 { font-size: 14px; color: #64748b; }
              ul { padding-left: 20px; }
              li { margin: 4px 0; }
              blockquote { border-left: 3px solid #e2e8f0; margin: 8px 0; padding: 4px 12px; color: #64748b; }
              code { background: #f1f5f9; padding: 2px 4px; border-radius: 3px; font-size: 13px; }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>${jn(k)}</body>
          </html>
        `), g.document.close(), g.print());
      }
    }
  }, [l, d, m]);
  return {
    demoLoaded: u,
    handleLoadDemo: f,
    handleClearDocument: x,
    handleExport: c
  };
}
function An(t = {}) {
  const [r, s] = T(
    t.initialPanel ?? null
  ), i = L((d) => {
    s((m) => m === d ? null : d);
  }, []), o = L((d) => {
    s(d);
  }, []), l = L(() => {
    s(null);
  }, []);
  return {
    activePanel: r,
    showHistory: r === "history",
    showMyItems: r === "myItems",
    showVideoHistory: r === "videoHistory",
    toggleHistory: L(() => i("history"), [i]),
    toggleMyItems: L(() => i("myItems"), [i]),
    toggleVideoHistory: L(() => i("videoHistory"), [i]),
    openPanel: o,
    closePanel: l
  };
}
function Ln() {
  if (typeof window < "u") {
    const r = new URLSearchParams(window.location.search).get("mode");
    if (r === "editor" || r === "ack" || r === "reader") return r;
  }
  return "editor";
}
function En(t) {
  return t.toString().replace(/<\/?(paragraph|heading|blockquote|codeBlock|bulletList|orderedList|listItem|taskList|taskItem|horizontalRule|hardBreak|doc)[^>]*>/g, `
`).replace(/<[^>]+>/g, "").replace(/\n{3,}/g, `

`).trim();
}
function _n({
  documentId: t,
  documentType: r,
  ws: s,
  userId: i,
  displayName: o,
  color: l = "#3b82f6",
  onMessage: d,
  activityPublish: m,
  isVideoDocked: u,
  onDockVideo: b,
  onUndockVideo: f,
  onBack: x
}) {
  const [c, w] = T(Ln), {
    showHistory: h,
    showMyItems: k,
    showVideoHistory: g,
    toggleHistory: M,
    toggleMyItems: p,
    toggleVideoHistory: C,
    closePanel: v
  } = An(), [R, j] = T(u ?? !1), [S, D] = T(typeof window < "u" ? window.innerWidth : 1400);
  O(() => {
    const N = () => D(window.innerWidth);
    return window.addEventListener("resize", N), () => window.removeEventListener("resize", N);
  }, []);
  const I = S >= 1200, y = S >= 900, [_, W] = T(!1), Y = V(null), ee = V(null), [xe, he] = T(0), [, le] = T(0), Z = V(null), de = 146, G = L(() => {
    if (Z.current === null) {
      const A = Y.current ?? ee.current;
      A && (Z.current = A.getBoundingClientRect().top + window.scrollY);
    }
    const N = Z.current ?? 250, $ = window.scrollY > N - de;
    W($), Y.current && he(Y.current.getBoundingClientRect().left), ee.current && le(ee.current.getBoundingClientRect().left);
  }, []);
  O(() => {
    const N = () => {
      Z.current = null, G();
    };
    return window.addEventListener("scroll", G, { passive: !0 }), window.addEventListener("resize", N, { passive: !0 }), () => {
      window.removeEventListener("scroll", G), window.removeEventListener("resize", N);
    };
  }, [G]), O(() => {
    const N = setTimeout(() => {
      Z.current = null, G();
    }, 50);
    return () => clearTimeout(N);
  }, [R, G]);
  const [te, ce] = T(null), [be, se] = T(!1), [ge, ye] = T(null), { idToken: E } = yn(), z = cn(t, E), {
    meta: U,
    sections: P,
    synced: J,
    updateMeta: K,
    addSection: Oe,
    updateSection: St,
    addItem: Be,
    updateItem: Ue,
    removeItem: Pe,
    getSectionFragment: Ve,
    ydoc: ne,
    provider: me,
    exportJSON: It,
    participants: we,
    awareness: ie
  } = mn({
    documentId: t,
    mode: c,
    ws: s,
    userId: i,
    displayName: o,
    color: l,
    onMessage: d
  }), {
    comments: ve,
    addComment: Fe,
    resolveThread: ze,
    unresolveThread: He
  } = pn({
    documentId: t,
    idToken: E,
    sendMessage: s.sendMessage,
    onMessage: d,
    connectionState: s.connectionState
  }), {
    sectionReviews: Tt,
    reviewSection: Mt
  } = un({
    documentId: t,
    idToken: E,
    sendMessage: s.sendMessage,
    onMessage: d,
    connectionState: s.connectionState
  }), $t = Re(() => P.map((N) => N.id), [P]), {
    items: Dt,
    addItem: We,
    updateItem: qe,
    removeItem: Ke
  } = fn({
    documentId: t,
    sectionIds: $t,
    idToken: E,
    sendMessage: s.sendMessage,
    onMessage: d,
    connectionState: s.connectionState
  });
  O(() => {
    if (!(s.connectionState !== "connected" || !t))
      return s.sendMessage({
        service: "document-events",
        action: "subscribe",
        documentId: t
      }), () => {
        s.sendMessage({
          service: "document-events",
          action: "unsubscribe",
          documentId: t
        });
      };
  }, [t, s.connectionState, s.sendMessage]);
  const { demoLoaded: jt, handleLoadDemo: Rt, handleClearDocument: At, handleExport: Lt } = Rn({
    documentId: t,
    userId: i,
    ws: s,
    updateMeta: K,
    addSection: Oe,
    exportJSON: It,
    getSectionFragment: Ve,
    comments: ve
  }), [Ne, Xe] = T(null), Et = L((N) => {
    const $ = N.lastSeen && Date.now() - N.lastSeen < 3e4, A = N.mode === "reviewer" ? "ack" : N.mode === "reader" ? "reader" : "editor";
    if (c !== A && (w(A), typeof window < "u")) {
      const B = new URL(window.location.href);
      B.searchParams.set("mode", A), window.history.replaceState({}, "", B.toString());
    }
    N.currentSectionId && setTimeout(() => {
      const B = document.getElementById(`section-${N.currentSectionId}`);
      B && (B.scrollIntoView({ behavior: "smooth", block: "center" }), $ && (B.style.transition = "box-shadow 0.3s ease", B.style.boxShadow = `0 0 0 3px ${N.color}40`, setTimeout(() => {
        B.style.boxShadow = "";
      }, 2e3)));
    }, 150);
  }, [c, P]), _t = L((N) => {
    const $ = N.userId || N.clientId;
    ce((A) => A === $ ? null : $);
  }, []), ae = V(null);
  O(() => {
    if (!te) {
      ae.current = null;
      return;
    }
    const N = we.find(
      (A) => (A.userId || A.clientId) === te
    );
    if (me?.awareness && me.awareness.getStates().forEach((B, X) => {
      me.awareness.clientID;
    }), !N || !N.currentSectionId) {
      if (N && P.length > 0) {
        const A = document.getElementById(`section-${P[0].id}`);
        A && !ae.current && (A.scrollIntoView({ behavior: "smooth", block: "start" }), ae.current = "__initial__");
      }
      return;
    }
    if (N.currentSectionId === ae.current) return;
    ae.current = N.currentSectionId;
    const $ = N.mode === "reviewer" ? "ack" : N.mode === "reader" ? "reader" : "editor";
    if (c !== $ && (w($), typeof window < "u")) {
      const A = new URL(window.location.href);
      A.searchParams.set("mode", $), window.history.replaceState({}, "", A.toString());
    }
    setTimeout(() => {
      const A = document.getElementById(`section-${N.currentSectionId}`);
      A && (A.scrollIntoView({ behavior: "smooth", block: "center" }), A.style.transition = "box-shadow 0.3s ease", A.style.boxShadow = `0 0 0 3px ${N.color}40`, setTimeout(() => {
        A.style.boxShadow = "";
      }, 1500));
    }, 100);
  }, [te, we, c, P]);
  const Ot = L(() => {
    ce(null);
  }, []), Bt = L((N, $) => {
    const A = { id: crypto.randomUUID(), ...$ };
    Be(N, A), We(N, A).catch(() => {
    });
    const B = P.find((X) => X.id === N);
    m("doc.add_item", { sectionTitle: B?.title, documentId: t, documentTitle: U?.title });
  }, [Be, We, P, m, t, U?.title]), Ut = L((N, $, A) => {
    Ue(N, $, A), qe(N, $, A).catch(() => {
    });
  }, [Ue, qe]), Pt = L((N, $) => {
    Pe(N, $), Ke(N, $).catch(() => {
    });
  }, [Pe, Ke]);
  O(() => {
    if (P.length === 0 || Ne) return;
    const N = setTimeout(() => {
      const $ = P[0].id;
      Xe($), ie.updateSection($);
    }, 500);
    return () => clearTimeout(N);
  }, [P, Ne, ie]);
  const Vt = L((N) => {
    Xe(N), ie.updateSection(N);
  }, [ie]), Ye = V(null), [Ft, zt] = T(0), Ht = L((N) => {
    ye(N), se(!0), requestAnimationFrame(() => {
      const $ = document.getElementById(`section-${N}`), A = Ye.current;
      if ($ && A) {
        const B = $.getBoundingClientRect(), X = A.getBoundingClientRect();
        zt(B.top - X.top);
      }
    });
  }, []), Wt = L(() => {
    se(!1);
  }, []), qt = L((N, $, A) => {
    Fe(N, $, A), m("doc.comment", { sectionId: N, text: $.slice(0, 50), documentId: t, documentTitle: U?.title });
    const B = $.match(/@[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)*/g);
    if (B && B.length > 0) {
      const X = B.map((Se) => Se.slice(1).trim()), H = P.find((Se) => Se.id === N);
      m("doc.mention", {
        sectionId: N,
        sectionTitle: H?.title ?? "",
        mentionedNames: X,
        commentText: $.slice(0, 80),
        authorName: o,
        documentId: t,
        documentTitle: U?.title
      });
    }
  }, [Fe, m, P, o, t, U?.title]), Kt = L((N, $) => {
    ze(N, $), m("doc.resolve_thread", { sectionId: N, commentId: $, documentId: t, documentTitle: U?.title });
  }, [ze, m, t, U?.title]), Xt = L((N, $) => {
    He(N, $), m("doc.unresolve_thread", { sectionId: N, commentId: $, reopenedBy: o, documentId: t, documentTitle: U?.title });
  }, [He, m, o, t, U?.title]), Yt = xn({ sections: P, comments: ve, displayName: o, userId: i }), Gt = L((N) => {
    setTimeout(() => {
      const $ = document.getElementById(`section-${N}`);
      $ && ($.scrollIntoView({ behavior: "smooth", block: "center" }), $.style.transition = "box-shadow 0.3s ease", $.style.boxShadow = "0 0 0 3px #3b82f640", setTimeout(() => {
        $.style.boxShadow = "";
      }, 2e3));
    }, 150);
  }, []), ke = p, Zt = M, Jt = C, Qt = L(() => {
    j((N) => !N), v();
  }, [v]);
  O(() => {
    const N = ($) => {
      ($.metaKey || $.ctrlKey) && $.key === "m" && ($.preventDefault(), ke());
    };
    return window.addEventListener("keydown", N), () => window.removeEventListener("keydown", N);
  }, [ke]);
  const en = `doc:${t}`, Ce = hn({
    channel: en,
    sendMessage: s.sendMessage,
    onMessage: d
  });
  O(() => {
    h ? Ce.fetchVersions() : Ce.clearPreview();
  }, [h]), O(() => {
    if (!J || !r || !ne) return;
    const N = ne.getMap("meta");
    if (N.get("templateApplied") || ne.getArray("sections").length > 0) return;
    const B = xt().find((H) => H.name === r);
    if (!B) return;
    ne.transact(() => {
      N.set("templateApplied", !0);
    });
    const X = (H) => H === "tasks" ? "tasks" : H === "decisions" ? "decisions" : "notes";
    K({
      id: t,
      title: U?.title || B.name,
      sourceType: "notes",
      sourceId: "",
      createdBy: i,
      createdByName: o,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      aiModel: "",
      status: "draft",
      documentType: B.name
    });
    for (const H of B.fields)
      Oe({
        id: crypto.randomUUID(),
        type: X(H.sectionType),
        sectionType: H.sectionType,
        title: H.name,
        collapsed: H.defaultCollapsed,
        placeholder: H.placeholder || void 0,
        items: []
      });
  }, [J, r, ne]);
  const tn = (N) => {
    if (w(N), typeof window < "u") {
      const $ = new URL(window.location.href);
      $.searchParams.set("mode", N), window.history.replaceState({}, "", $.toString());
    }
  }, Ge = U ?? {
    id: t,
    title: "",
    sourceType: "notes",
    sourceId: "",
    createdBy: "",
    createdAt: "",
    aiModel: "",
    status: "draft"
  }, nn = Ge.status === "final", rn = L(() => {
    window.confirm("Finalize this document? It will become read-only.") && (K({ status: "final" }), m("doc.finalize", { documentId: t, documentTitle: U?.title }));
  }, [K, m, t, U?.title]), on = L(() => {
    K({ status: "draft" }), m("doc.unlock", { documentId: t, documentTitle: U?.title });
  }, [K, m, t, U?.title]), sn = L(() => {
    R && !u && b?.(), x?.();
  }, [R, u, b, x]);
  return {
    // Mode
    mode: c,
    handleModeChange: tn,
    // Meta
    meta: U,
    headerMeta: Ge,
    isFinalized: nn,
    handleFinalize: rn,
    handleUnlock: on,
    updateMeta: K,
    // Sections
    sections: P,
    updateSection: St,
    getSectionFragment: Ve,
    // Document
    ydoc: ne,
    provider: me,
    synced: J,
    demoLoaded: jt,
    handleLoadDemo: Rt,
    handleClearDocument: At,
    handleExport: Lt,
    // Participants
    participants: we,
    awareness: ie,
    // Focus
    focusedSectionId: Ne,
    handleSectionFocus: Vt,
    handleJumpToUser: Et,
    // Follow
    followingUserId: te,
    handleFollowUser: _t,
    handleStopFollow: Ot,
    // Comments
    comments: ve,
    commentSidebarOpen: be,
    commentSectionId: ge,
    commentSidebarTop: Ft,
    sectionListRef: Ye,
    handleOpenComments: Ht,
    handleCloseComments: Wt,
    handleAddComment: qt,
    handleResolveThread: Kt,
    handleUnresolveThread: Xt,
    // Items
    restItems: Dt,
    handleAddItem: Bt,
    handleUpdateItem: Ut,
    handleRemoveItem: Pt,
    // Reviews
    sectionReviews: Tt,
    restReviewSection: Mt,
    // Sidebar panels
    showHistory: h,
    showMyItems: k,
    showVideoHistory: g,
    handleToggleHistory: Zt,
    handleToggleMyItems: ke,
    handleToggleVideoHistory: Jt,
    closePanel: v,
    // Video
    showVideoCall: R,
    setShowVideoCall: j,
    handleToggleVideoCall: Qt,
    videoSessions: z,
    isVideoDocked: u,
    onDockVideo: b,
    onUndockVideo: f,
    // Responsive
    showTOC: I,
    showInlineVideo: y,
    sidebarFixed: _,
    videoSpacerRef: Y,
    tocSpacerRef: ee,
    videoLeft: xe,
    FIXED_TOP: de,
    // My items
    myItems: Yt,
    handleNavigateToSection: Gt,
    // Version history
    versionHistory: Ce,
    // Navigation
    handleBack: sn,
    // Identity
    idToken: E,
    // Activity
    activityPublish: m,
    // User
    displayName: o,
    color: l,
    userId: i,
    documentId: t
  };
}
function On(t) {
  return t.split(" ").map((r) => r[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function Bn(t, r = 0.2) {
  const s = t.replace("#", ""), i = parseInt(s, 16), o = Math.max(0, (i >> 16 & 255) * (1 - r)), l = Math.max(0, (i >> 8 & 255) * (1 - r)), d = Math.max(0, (i & 255) * (1 - r));
  return `rgb(${Math.round(o)}, ${Math.round(l)}, ${Math.round(d)})`;
}
function et(t) {
  switch (t) {
    case "editor":
      return "editing";
    case "reviewer":
      return "reviewing";
    case "reader":
      return "reading";
    default:
      return "";
  }
}
function tt(t) {
  if (!t) return "";
  const r = Math.floor((Date.now() - t) / 1e3);
  return r < 5 ? "" : r < 60 ? `, ${r}s` : r < 3600 ? `, ${Math.floor(r / 60)}m` : `, ${Math.floor(r / 3600)}h`;
}
function Un(t) {
  switch (t) {
    case "editor":
      return { bg: "#dbeafe", text: "#1d4ed8" };
    case "reviewer":
      return { bg: "#fef3c7", text: "#92400e" };
    case "reader":
      return { bg: "#f1f5f9", text: "#64748b" };
    default:
      return { bg: "#f1f5f9", text: "#64748b" };
  }
}
function Pn({
  participant: t,
  sectionTitle: r,
  onJumpToUser: s,
  onFollowUser: i,
  isFollowing: o
}) {
  const [l, d] = T(!1), m = V(null), u = V(null), b = () => {
    u.current && (clearTimeout(u.current), u.current = null), d(!0);
  }, f = () => {
    u.current = setTimeout(() => d(!1), 150);
  }, x = Un(t.mode), c = t.color || "#3b82f6";
  return /* @__PURE__ */ a(
    "div",
    {
      ref: m,
      className: e("flex flex-col items-center gap-[3px] relative cursor-pointer animate-[presenceFadeIn_0.3s_ease]"),
      onMouseEnter: b,
      onMouseLeave: f,
      onClick: () => s?.(t),
      children: [
        l && /* @__PURE__ */ a(
          "div",
          {
            className: e("absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-[#1e293b] text-white py-2 px-3 rounded-md text-xs whitespace-nowrap z-[100] pointer-events-auto shadow-[0_4px_12px_rgba(0,0,0,0.15)] leading-snug"),
            onMouseEnter: b,
            onMouseLeave: f,
            children: [
              /* @__PURE__ */ n("div", { className: e("font-semibold mb-0.5"), children: t.displayName }),
              /* @__PURE__ */ a("div", { className: e("text-text-tertiary text-[11px]"), children: [
                t.idle ? "away" : et(t.mode),
                tt(t.lastSeen)
              ] }),
              r && /* @__PURE__ */ a("div", { className: e("text-text-tertiary text-[11px] mt-0.5"), children: [
                "§ ",
                r
              ] }),
              i && /* @__PURE__ */ n(
                "div",
                {
                  role: "button",
                  onClick: (w) => {
                    w.stopPropagation(), i(t);
                  },
                  className: e("mt-1 text-[11px] font-semibold cursor-pointer", o ? "text-amber-400" : "text-blue-400"),
                  children: o ? "Stop following" : "Follow"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ a("div", { className: e("relative inline-block"), children: [
          /* @__PURE__ */ n(
            "div",
            {
              className: e("w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-semibold transition-[transform,box-shadow] duration-200 ease-in-out", l ? "scale-110" : "scale-100"),
              style: {
                background: `linear-gradient(135deg, ${c}, ${Bn(c, 0.2)})`,
                boxShadow: l ? `0 0 0 2px ${c}40` : "none"
              },
              children: On(t.displayName)
            }
          ),
          /* @__PURE__ */ n(
            "div",
            {
              className: e("absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white", t.idle ? "bg-amber-400" : "bg-emerald-500 [animation:presencePulse_2s_infinite]")
            }
          )
        ] }),
        /* @__PURE__ */ a(
          "span",
          {
            className: e("text-[11px] font-semibold px-2 py-px rounded-full leading-4"),
            style: {
              background: t.idle ? "#fef3c7" : x.bg,
              color: t.idle ? "#92400e" : x.text
            },
            children: [
              t.idle ? "away" : et(t.mode),
              tt(t.lastSeen)
            ]
          }
        ),
        o && /* @__PURE__ */ n("span", { className: e("text-[10px] font-semibold text-[#3b82f6]"), children: "following" }),
        r && /* @__PURE__ */ a("span", { className: e("text-[10px] text-[#64748b] max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap text-center"), children: [
          "§ ",
          r
        ] })
      ]
    }
  );
}
function Vn({
  participants: t,
  sections: r,
  onJumpToUser: s,
  onFollowUser: i,
  followingUserId: o
}) {
  const l = /* @__PURE__ */ new Map();
  if (r)
    for (const d of r)
      l.set(d.id, d.title);
  return t.length === 0 ? null : /* @__PURE__ */ a("div", { "data-testid": "participant-avatars", className: e("flex items-center gap-0"), children: [
    /* @__PURE__ */ n("div", { className: e("flex gap-2.5 items-start py-1"), children: t.filter((d, m, u) => u.findIndex((b) => (b.userId || b.clientId) === (d.userId || d.clientId)) === m).map((d) => /* @__PURE__ */ n(
      Pn,
      {
        participant: d,
        sectionTitle: d.currentSectionId ? l.get(d.currentSectionId) : void 0,
        onJumpToUser: s,
        onFollowUser: i,
        isFollowing: o === (d.userId || d.clientId)
      },
      d.clientId
    )) }),
    /* @__PURE__ */ n("div", { className: e("w-px h-9 bg-border mx-1 self-center") })
  ] });
}
const nt = {
  draft: { bg: "#fef3c7", text: "#92400e" },
  review: { bg: "#dbeafe", text: "#1e40af" },
  final: { bg: "#d1fae5", text: "#065f46" }
}, Fn = [
  { mode: "editor", label: "Editor" },
  { mode: "ack", label: "Review" },
  { mode: "reader", label: "Read" }
];
function zn({
  meta: t,
  mode: r,
  onModeChange: s,
  participants: i,
  onUpdateMeta: o,
  onExport: l,
  onToggleHistory: d,
  onToggleVideoCall: m,
  onToggleVideoHistory: u,
  isCallActive: b,
  onClearDocument: f,
  onJumpToUser: x,
  sections: c,
  onToggleMyItems: w,
  myItemCount: h,
  commentCount: k,
  onBack: g,
  onFollowUser: M,
  followingUserId: p,
  onFinalize: C,
  onUnlock: v,
  pastCallsCount: R
}) {
  const [j, S] = T(!1), D = nt[t.status] ?? nt.draft;
  return /* @__PURE__ */ a("header", { className: e("flex flex-col py-2 px-4 bg-white border-b border-[#e5e7eb] shrink-0 gap-1.5 sticky top-[53px] z-[34]"), children: [
    /* @__PURE__ */ a("div", { className: e("flex items-center justify-between"), children: [
      /* @__PURE__ */ a("div", { className: e("flex items-center gap-2.5"), children: [
        g && /* @__PURE__ */ n(
          "button",
          {
            onClick: g,
            className: e("bg-transparent border-none text-[#3b82f6] cursor-pointer text-[13px] p-0 flex items-center gap-1 font-[inherit]"),
            children: "← Documents"
          }
        ),
        /* @__PURE__ */ n(
          "input",
          {
            className: e("text-base font-semibold border border-transparent rounded outline-none bg-transparent font-[inherit] min-w-[180px] text-[#111827] py-1 px-2 focus:border-[#3b82f6]"),
            value: t.title,
            placeholder: "Untitled document",
            onChange: (I) => o({ title: I.target.value })
          }
        ),
        /* @__PURE__ */ n(
          "span",
          {
            className: e("inline-block text-[11px] font-semibold py-0.5 px-2.5 rounded-full"),
            style: { background: D.bg, color: D.text },
            children: t.status
          }
        ),
        r === "editor" && /* @__PURE__ */ n("span", { className: e("text-[11px] text-text-tertiary italic"), children: "Auto-saved" }),
        t.updatedAt && /* @__PURE__ */ a("span", { className: e("text-[11px] text-text-tertiary"), children: [
          "Last edited ",
          (() => {
            const I = Date.now() - new Date(t.updatedAt).getTime(), y = Math.floor(I / 6e4);
            if (y < 1) return "just now";
            if (y < 60) return `${y}m ago`;
            const _ = Math.floor(y / 60);
            return _ < 24 ? `${_}h ago` : `${Math.floor(_ / 24)}d ago`;
          })()
        ] }),
        k != null && k > 0 && /* @__PURE__ */ a("span", { className: e("inline-flex items-center gap-1 text-[11px] font-semibold py-0.5 px-2.5 rounded-full bg-[#f3f4f6] text-[#6b7280]"), children: [
          /* @__PURE__ */ n("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ n("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }) }),
          k
        ] })
      ] }),
      i.length > 0 && /* @__PURE__ */ n(Vn, { participants: i, sections: c, onJumpToUser: x, onFollowUser: M, followingUserId: p })
    ] }),
    /* @__PURE__ */ a("div", { className: e("flex items-center justify-between flex-wrap gap-1"), children: [
      /* @__PURE__ */ n("div", { className: e("flex gap-1"), children: Fn.map(({ mode: I, label: y }) => /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          "data-testid": `mode-btn-${I}`,
          className: e(
            "py-1.5 px-3.5 text-[13px] font-semibold border border-[#d1d5db] rounded-md cursor-pointer font-[inherit]",
            r === I ? "bg-[#3b82f6] text-white" : "bg-white text-[#374151]"
          ),
          onClick: () => s(I),
          children: y
        },
        I
      )) }),
      /* @__PURE__ */ a("div", { className: e("flex items-center gap-2"), children: [
        /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            className: e("py-1.5 px-3 text-[13px] font-medium border border-[#d1d5db] rounded-md bg-white text-[#374151] cursor-pointer font-[inherit] relative"),
            onClick: w,
            children: [
              "My Items",
              h ? ` (${h})` : ""
            ]
          }
        ),
        m && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: e(
              "py-1.5 px-3 text-[13px] font-medium border rounded-md cursor-pointer font-[inherit] relative",
              b ? "bg-[#dcfce7] text-[#166534] border-[#86efac]" : "bg-white text-[#374151] border-[#d1d5db]"
            ),
            onClick: m,
            children: b ? "In Call" : "Call"
          }
        ),
        t.status === "final" ? /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: e("py-1.5 px-3 text-[13px] font-medium border border-[#86efac] rounded-md bg-[#f0fdf4] text-[#065f46] cursor-pointer font-[inherit] relative"),
            onClick: v,
            children: "Unlock"
          }
        ) : /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: e("py-1.5 px-3 text-[13px] font-medium border border-[#86efac] rounded-md bg-[#f0fdf4] text-[#065f46] cursor-pointer font-[inherit] relative"),
            onClick: C,
            children: "Finalize"
          }
        ),
        /* @__PURE__ */ a("div", { className: e("relative"), children: [
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: e("py-1.5 px-3 text-[13px] font-medium border border-[#d1d5db] rounded-md bg-white text-[#374151] cursor-pointer font-[inherit] relative tracking-wider"),
              onClick: () => S((I) => !I),
              title: "More actions",
              children: "⋯"
            }
          ),
          j && /* @__PURE__ */ a("div", { className: e("absolute top-full right-0 mt-1 bg-white border border-[#e5e7eb] rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50 min-w-[160px] overflow-hidden"), children: [
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: e("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-[#374151] text-left cursor-pointer font-[inherit] hover:bg-[#f3f4f6]"),
                onClick: () => {
                  d(), S(!1);
                },
                children: "History"
              }
            ),
            u && (R ?? 0) > 0 && /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                className: e("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-[#374151] text-left cursor-pointer font-[inherit] hover:bg-[#f3f4f6]"),
                onClick: () => {
                  u(), S(!1);
                },
                children: [
                  "Past Calls (",
                  R,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ n("div", { className: e("border-t border-[#f1f5f9] my-1") }),
            ["markdown", "pdf", "json"].map((I) => /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                className: e("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-[#374151] text-left cursor-pointer font-[inherit] hover:bg-[#f3f4f6]"),
                onClick: () => {
                  l(I), S(!1);
                },
                children: [
                  "Export ",
                  I.charAt(0).toUpperCase() + I.slice(1)
                ]
              },
              I
            )),
            /* @__PURE__ */ n("div", { className: e("border-t border-[#f1f5f9] my-1") }),
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: e("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-[#dc2626] text-left cursor-pointer font-[inherit] hover:bg-[#fff5f5]"),
                onClick: () => {
                  S(!1), window.confirm("Clear all document content? This cannot be undone.") && f();
                },
                children: "Clear Document"
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Hn({
  followingUserId: t,
  participants: r,
  onStopFollow: s
}) {
  const i = V(null);
  if (O(() => {
    if (!t) return;
    const l = setTimeout(() => {
      const d = () => s(), m = ["mousedown", "keydown", "wheel"];
      for (const u of m)
        window.addEventListener(u, d, { once: !0, passive: !0 });
      i.current = () => {
        for (const u of m)
          window.removeEventListener(u, d);
      };
    }, 500);
    return () => {
      clearTimeout(l), i.current?.(), i.current = null;
    };
  }, [t, s]), !t) return null;
  const o = r.find(
    (l) => (l.userId || l.clientId) === t
  );
  return o ? /* @__PURE__ */ a("div", { className: e("flex items-center justify-center gap-2 px-4 py-1.5 bg-[#eff6ff] border-b border-[#bfdbfe] text-[13px] font-medium text-[#1d4ed8] shrink-0"), children: [
    /* @__PURE__ */ a("span", { children: [
      "Following ",
      o.displayName
    ] }),
    /* @__PURE__ */ n(
      "button",
      {
        onClick: s,
        className: e("bg-transparent border border-[#93c5fd] rounded px-2 py-0.5 text-xs font-semibold text-[#1d4ed8] cursor-pointer font-[inherit]"),
        children: "Stop"
      }
    )
  ] }) : null;
}
const Ae = ({
  children: t,
  variant: r = "light",
  width: s = 320,
  style: i
}) => typeof document > "u" ? null : ft(
  /* @__PURE__ */ n(
    "div",
    {
      className: e(
        "fixed right-0 top-0 h-full z-[60] flex flex-col shadow-[-4px_0_12px_rgba(0,0,0,0.08)]",
        r === "dark" ? "bg-[#111827]" : "bg-surface"
      ),
      style: { width: s, ...i },
      children: t
    }
  ),
  document.body
), Le = ({
  title: t,
  onClose: r,
  actions: s,
  variant: i = "light"
}) => {
  const o = i === "dark";
  return /* @__PURE__ */ a(
    "div",
    {
      className: e(
        "flex items-center justify-between px-4 py-2",
        o ? "border-b border-white/10" : "border-b border-border"
      ),
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: e(
              "text-[13px] font-semibold",
              o ? "text-white" : "text-text-primary"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ a("div", { className: "flex items-center gap-1", children: [
          s,
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: r,
              className: e(
                "w-[22px] h-[22px] flex items-center justify-center",
                "bg-transparent border-none rounded-sm cursor-pointer",
                "text-sm p-0 leading-none",
                o ? "text-text-tertiary" : "text-text-secondary"
              ),
              "aria-label": "Close panel",
              children: "×"
            }
          )
        ] })
      ]
    }
  );
}, Ee = ({
  children: t,
  padding: r
}) => /* @__PURE__ */ n(
  "div",
  {
    className: "flex-1 overflow-y-auto",
    style: { padding: r ?? "14px 12px" },
    children: t
  }
), Wn = {
  default: "bg-surface text-text-primary border border-border",
  primary: "bg-[#16a34a] text-white border border-[#16a34a]",
  danger: "bg-danger text-white border border-danger"
}, qn = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-[13px]"
}, Q = ({
  variant: t = "default",
  size: r = "md",
  style: s,
  type: i = "button",
  className: o,
  ...l
}) => /* @__PURE__ */ n(
  "button",
  {
    type: i,
    className: e(
      "rounded-sm cursor-pointer font-medium leading-[1.4]",
      Wn[t],
      qn[r],
      o
    ),
    style: s,
    ...l
  }
), pe = ({
  active: t = !1,
  activeColor: r = "rgba(255,255,255,0.1)",
  size: s = 36,
  style: i,
  type: o = "button",
  className: l,
  ...d
}) => /* @__PURE__ */ n(
  "button",
  {
    type: o,
    className: e(
      "flex items-center justify-center border-none rounded-full cursor-pointer p-0 text-inherit",
      l
    ),
    style: {
      width: s,
      height: s,
      background: t ? r : "transparent",
      ...i
    },
    ...d
  }
);
function Kn({ participant: t, isSpeaking: r }) {
  const s = V(null);
  return O(() => {
    const i = s.current, o = t.streams[0] ?? null;
    i && o && i.srcObject !== o && (i.srcObject = o);
  }, [t.streams]), /* @__PURE__ */ a(
    "div",
    {
      className: e("relative bg-[#111827] rounded-lg overflow-hidden transition-shadow duration-300", r ? "video-tile-speaking" : "video-tile-idle"),
      children: [
        /* @__PURE__ */ n(
          "video",
          {
            ref: s,
            autoPlay: !0,
            playsInline: !0,
            muted: t.isLocal,
            className: e("w-full h-full object-cover")
          }
        ),
        /* @__PURE__ */ n("div", { className: e("absolute bottom-0 left-0 right-0 h-9 bg-gradient-to-t from-black/50 to-transparent pointer-events-none") }),
        /* @__PURE__ */ a("div", { className: e("absolute bottom-1.5 left-1.5 flex items-center gap-1 bg-black/60 text-white text-[11px] font-medium px-2 py-[3px] rounded-full"), children: [
          r && /* @__PURE__ */ n("span", { className: e("w-[5px] h-[5px] rounded-full bg-[#34d399]") }),
          /* @__PURE__ */ n("span", { children: t.userId }),
          t.isLocal && /* @__PURE__ */ n("span", { className: e("opacity-50"), children: "(You)" })
        ] })
      ]
    }
  );
}
function Xn({ stream: t, userId: r, cameraStream: s, isLocal: i }) {
  const o = V(null), l = V(null);
  return O(() => {
    const d = o.current;
    d && d.srcObject !== t && (d.srcObject = t);
  }, [t]), O(() => {
    const d = l.current;
    d && s && d.srcObject !== s && (d.srcObject = s);
  }, [s]), /* @__PURE__ */ a("div", { className: e("relative bg-black rounded-[10px] overflow-hidden border-2 border-[#3b82f6] aspect-video"), children: [
    /* @__PURE__ */ n(
      "video",
      {
        ref: o,
        autoPlay: !0,
        playsInline: !0,
        muted: !0,
        className: e("w-full h-full object-contain")
      }
    ),
    i && s && /* @__PURE__ */ n(
      "video",
      {
        ref: l,
        autoPlay: !0,
        playsInline: !0,
        muted: !0,
        className: e("absolute bottom-2 right-2 w-36 object-cover rounded-lg border-2 border-white/30 aspect-video")
      }
    ),
    /* @__PURE__ */ a("div", { className: e("absolute bottom-1.5 left-1.5 bg-[rgba(59,130,246,0.8)] text-white text-[11px] font-medium px-2 py-[3px] rounded-full"), children: [
      r,
      "'s screen"
    ] })
  ] });
}
function Yn({ stageToken: t, participantId: r, userId: s, onEndCall: i }) {
  const { participants: o, isJoined: l, isScreenSharing: d, error: m, toggleMute: u, toggleCamera: b, startScreenShare: f, stopScreenShare: x, leave: c } = wn({
    stageToken: t,
    userId: s,
    participantId: r
  }), { activeSpeakerId: w } = vn({ participants: o }), [h, k] = T(!1), [g, M] = T(!1), [p, C] = T(!1), v = Re(
    () => o.map((S) => ({
      ...S,
      isSpeaking: S.participantId === w
    })),
    [o, w]
  ), R = v.find((S) => S.screenStream), j = () => {
    c(), i();
  };
  return m ? /* @__PURE__ */ a("div", { className: e("p-4 text-center text-[#dc2626] text-[13px]"), children: [
    m,
    /* @__PURE__ */ n("br", {}),
    /* @__PURE__ */ n(Q, { onClick: i, className: "mt-3", children: "Close" })
  ] }) : l ? /* @__PURE__ */ a(
    "div",
    {
      className: e("flex flex-col"),
      onMouseEnter: () => C(!0),
      onMouseLeave: () => C(!1),
      children: [
        R?.screenStream && /* @__PURE__ */ n("div", { className: e("p-1.5 pb-0"), children: /* @__PURE__ */ n(
          Xn,
          {
            stream: R.screenStream,
            userId: R.userId,
            cameraStream: R.streams[0],
            isLocal: R.isLocal
          }
        ) }),
        /* @__PURE__ */ n(
          "div",
          {
            className: e("flex-1 grid gap-1 p-1.5 content-start", v.length <= 1 ? "grid-cols-1" : "grid-cols-2"),
            children: v.map((S) => /* @__PURE__ */ n(Kn, { participant: S, isSpeaking: S.isSpeaking }, S.participantId))
          }
        ),
        /* @__PURE__ */ a(
          "div",
          {
            className: e("flex justify-center gap-1 px-2 py-1.5 border-t border-[#374151] shrink-0 transition-opacity duration-200", p ? "opacity-100" : "opacity-0"),
            children: [
              /* @__PURE__ */ n(
                pe,
                {
                  onClick: () => {
                    k(!h), u(!h);
                  },
                  title: h ? "Unmute" : "Mute",
                  active: h,
                  activeColor: "#dc2626",
                  style: { color: "#fff", background: h ? "#dc2626" : "rgba(255,255,255,0.1)" },
                  children: h ? "🔇" : "🔊"
                }
              ),
              /* @__PURE__ */ n(
                pe,
                {
                  onClick: () => {
                    M(!g), b(g);
                  },
                  title: g ? "Camera On" : "Camera Off",
                  active: g,
                  activeColor: "#dc2626",
                  style: { color: "#fff", background: g ? "#dc2626" : "rgba(255,255,255,0.1)" },
                  children: g ? "🚫" : "📷"
                }
              ),
              /* @__PURE__ */ n(
                pe,
                {
                  onClick: () => d ? x() : f(),
                  title: d ? "Stop Sharing" : "Share Screen",
                  active: d,
                  activeColor: "#646cff",
                  style: { color: "#fff", background: d ? "#646cff" : "rgba(255,255,255,0.1)" },
                  children: "💻"
                }
              ),
              /* @__PURE__ */ n(
                pe,
                {
                  onClick: j,
                  title: "Leave Call",
                  style: { color: "#fff", background: "#dc2626" },
                  children: "📞"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ a("div", { className: e("text-center text-[10px] text-[#6b7280] py-1"), children: [
          o.length,
          " in call"
        ] })
      ]
    }
  ) : /* @__PURE__ */ n("div", { className: e("p-5 text-center text-[#6b7280] text-[13px]"), children: "Connecting to video..." });
}
function Gn({
  documentId: t,
  userId: r,
  idToken: s,
  meta: i,
  updateMeta: o,
  sendMessage: l,
  onClose: d,
  onDockToSidebar: m,
  isDocked: u,
  onUndock: b,
  onCallEnd: f
}) {
  const {
    callState: x,
    stageToken: c,
    participantId: w,
    userId: h,
    error: k,
    hasActiveCall: g,
    startCall: M,
    joinCall: p,
    endCall: C
  } = bn({ documentId: t, idToken: s, meta: i, updateMeta: o, sendMessage: l, displayName: r }), v = V(x);
  O(() => {
    v.current === "active" && x === "idle" && f?.(), v.current = x;
  }, [x, f]);
  const R = i?.activeCallSessionId;
  return /* @__PURE__ */ a("div", { className: e("bg-[#111827] border border-[#374151] rounded-xl overflow-hidden"), children: [
    /* @__PURE__ */ a("div", { className: e("flex items-center justify-between px-2 py-1 border-b border-[#374151] shrink-0"), children: [
      /* @__PURE__ */ n("span", { className: e("text-[11px] font-semibold text-[#9ca3af] m-0"), children: "Video" }),
      /* @__PURE__ */ a("div", { className: e("flex items-center gap-0.5"), children: [
        m && !u && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: m,
            title: "Dock to sidebar",
            className: e("w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-[#9ca3af] cursor-pointer text-xs leading-none p-0"),
            children: "←"
          }
        ),
        u && b && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: b,
            title: "Undock from sidebar",
            className: e("w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-[#9ca3af] cursor-pointer text-xs leading-none p-0"),
            children: "→"
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: d,
            title: "Close video",
            className: e("w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-[#9ca3af] cursor-pointer text-sm leading-none p-0"),
            children: "✕"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ a("div", { children: [
      x === "active" && c && w && h && /* @__PURE__ */ n(
        Yn,
        {
          stageToken: c,
          participantId: w,
          userId: h,
          onEndCall: C
        }
      ),
      (x === "creating" || x === "joining") && /* @__PURE__ */ n("div", { className: e("p-4 text-center text-[#9ca3af] text-[13px]"), children: x === "creating" ? "Starting call..." : "Joining call..." }),
      x === "error" && /* @__PURE__ */ a("div", { className: e("p-4 text-center"), children: [
        /* @__PURE__ */ n("div", { className: e("text-[#f87171] text-[13px] mb-3"), children: k }),
        /* @__PURE__ */ n(Q, { variant: "primary", onClick: () => M(), children: "Try Again" })
      ] }),
      x === "idle" && /* @__PURE__ */ n("div", { className: e("p-4 text-center"), children: g && R ? /* @__PURE__ */ a(F, { children: [
        /* @__PURE__ */ n("div", { className: e("text-[13px] text-[#d1d5db] mb-3"), children: "A call is in progress on this document." }),
        /* @__PURE__ */ n(Q, { variant: "primary", onClick: () => p(R), children: "Join Call" })
      ] }) : /* @__PURE__ */ a(F, { children: [
        /* @__PURE__ */ n("div", { className: e("text-[13px] text-[#9ca3af] mb-3"), children: "Start a video call with collaborators on this document." }),
        /* @__PURE__ */ n(Q, { variant: "primary", onClick: M, children: "Start Call" })
      ] }) })
    ] })
  ] });
}
const Zn = {
  summary: "#8b5cf6",
  tasks: "#3b82f6",
  decisions: "#f59e0b",
  notes: "#6b7280",
  custom: "#10b981"
};
function Jn(t) {
  return t.split(" ").map((r) => r[0] ?? "").join("").toUpperCase().slice(0, 2);
}
const Ie = 3;
function Qn({ participants: t }) {
  if (!t || t.length === 0) return null;
  const r = t.slice(0, Ie), s = t.length - Ie;
  return /* @__PURE__ */ a("div", { className: e("flex items-center ml-auto shrink-0"), children: [
    r.map((i, o) => /* @__PURE__ */ a(
      "div",
      {
        title: `${i.displayName} (${i.mode})`,
        className: e("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold border-2 border-white relative transition-transform duration-200"),
        style: {
          background: `linear-gradient(135deg, ${i.color || "#3b82f6"}, ${er(i.color || "#3b82f6", 0.2)})`,
          marginLeft: o === 0 ? 0 : -8,
          zIndex: Ie - o
        },
        children: [
          Jn(i.displayName),
          /* @__PURE__ */ n("div", { className: e("absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#10b981] border-2 border-white") })
        ]
      },
      i.clientId
    )),
    s > 0 && /* @__PURE__ */ a(
      "div",
      {
        className: e("w-6 h-6 rounded-full bg-border text-[#64748b] flex items-center justify-center text-[9px] font-bold border-2 border-white relative -ml-2"),
        children: [
          "+",
          s
        ]
      }
    )
  ] });
}
function er(t, r) {
  const s = t.replace("#", ""), i = parseInt(s, 16), o = Math.max(0, (i >> 16 & 255) * (1 - r)), l = Math.max(0, (i >> 8 & 255) * (1 - r)), d = Math.max(0, (i & 255) * (1 - r));
  return `rgb(${Math.round(o)}, ${Math.round(l)}, ${Math.round(d)})`;
}
function tr({
  section: t,
  fragment: r,
  ydoc: s,
  provider: i,
  user: o,
  editable: l,
  onUpdateSection: d,
  onAddItem: m,
  onUpdateItem: u,
  onRemoveItem: b,
  participants: f,
  onFocus: x,
  isFocused: c,
  comments: w,
  onUpdateCursorInfo: h,
  commentCount: k = 0,
  onOpenComments: g,
  commentPresence: M
}) {
  const [p, C] = T(t.collapsed), v = () => {
    const y = !p;
    C(y), d({ collapsed: y });
  }, R = kn(t.sectionType ?? t.type, "editor") ?? Nn, j = f && f.length > 0, S = j ? f[0].color || "#3b82f6" : "transparent", [D, I] = T(!1);
  return /* @__PURE__ */ a(
    "div",
    {
      id: `section-${t.id}`,
      "data-testid": `section-block-${t.id}`,
      className: e("border border-border rounded-lg mb-4 bg-white relative transition-[border-left,box-shadow] duration-300 ease-in-out"),
      style: {
        borderLeft: j ? `3px solid ${S}` : "1px solid #e2e8f0",
        boxShadow: c ? "0 0 0 2px rgba(59, 130, 246, 0.3)" : "none"
      },
      onClickCapture: x,
      onFocusCapture: x,
      children: [
        g && /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: (y) => {
              y.stopPropagation(), g(t.id);
            },
            onMouseEnter: () => I(!0),
            onMouseLeave: () => I(!1),
            className: e(
              "absolute top-1/2 -right-[52px] -translate-y-1/2 w-10 h-10 rounded-full border border-border flex items-center justify-center text-xl leading-none p-0 z-[1] shadow-sm cursor-pointer transition-[opacity,background] duration-150 ease-in-out",
              D ? "bg-surface-hover opacity-90" : "bg-white opacity-40"
            ),
            title: "Open comments",
            children: [
              /* @__PURE__ */ n("span", { className: e("pointer-events-none"), children: "💬" }),
              k > 0 && /* @__PURE__ */ n("span", { className: e("absolute -top-1 -right-1 min-w-[16px] h-4 rounded-lg bg-[#3b82f6] text-white text-[10px] font-bold flex items-center justify-center px-1 leading-none"), children: k }),
              M && M.length > 0 && /* @__PURE__ */ n("span", { className: e("absolute -left-1 top-1/2 -translate-y-1/2 flex flex-col gap-0.5"), children: M.slice(0, 3).map((y) => /* @__PURE__ */ n(
                "span",
                {
                  title: y.displayName,
                  className: e("w-2 h-2 rounded-full border border-white block"),
                  style: { background: y.color || "#3b82f6" }
                },
                y.clientId
              )) })
            ]
          }
        ),
        /* @__PURE__ */ a("div", { className: e("flex items-center gap-2 py-2.5 px-3.5 bg-[#f8fafc] border-b border-border rounded-t-lg"), children: [
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: v,
              className: e(
                "border-none bg-transparent cursor-pointer text-xs p-1 text-[#64748b] leading-none rounded inline-flex items-center justify-center transition-[background,transform] duration-200 ease-in-out hover:bg-border",
                p ? "-rotate-90" : "rotate-0"
              ),
              title: p ? "Expand section" : "Collapse section",
              children: /* @__PURE__ */ n("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ n("polyline", { points: "6 9 12 15 18 9" }) })
            }
          ),
          /* @__PURE__ */ n(
            "input",
            {
              type: "text",
              value: t.title,
              onChange: (y) => d({ title: y.target.value }),
              readOnly: !l,
              className: e("flex-1 border border-transparent rounded outline-none text-[15px] font-semibold font-[inherit] bg-transparent text-[#1e293b] py-0.5 px-1.5 cursor-text focus:border-[#3b82f6]")
            }
          ),
          /* @__PURE__ */ n(
            "span",
            {
              className: e("py-0.5 px-2.5 text-[11px] font-semibold rounded-xl text-white capitalize whitespace-nowrap"),
              style: { background: Zn[t.type] },
              children: t.type
            }
          ),
          /* @__PURE__ */ n(Qn, { participants: f ?? [] })
        ] }),
        !p && /* @__PURE__ */ n("div", { className: e("p-3.5"), children: /* @__PURE__ */ n(
          R,
          {
            section: t,
            viewMode: "editor",
            editable: l,
            fragment: r,
            ydoc: s,
            provider: i,
            user: o,
            onUpdateSection: d,
            onAddItem: m,
            onUpdateItem: u,
            onRemoveItem: b,
            participants: f,
            onUpdateCursorInfo: h,
            comments: w,
            commentCount: k,
            onOpenComments: g
          }
        ) })
      ]
    }
  );
}
function nr({
  sections: t,
  getSectionFragment: r,
  ydoc: s,
  provider: i,
  user: o,
  editable: l,
  onUpdateSection: d,
  onAddItem: m,
  onUpdateItem: u,
  onRemoveItem: b,
  participants: f,
  onSectionFocus: x,
  focusedSectionId: c,
  comments: w,
  onAddComment: h,
  onResolveThread: k,
  onUnresolveThread: g,
  onUpdateCursorInfo: M,
  onOpenComments: p
}) {
  return /* @__PURE__ */ n("div", { className: e("flex flex-col gap-0 pb-4"), children: t.map((C) => /* @__PURE__ */ n(
    tr,
    {
      section: C,
      fragment: r(C.id),
      ydoc: s,
      provider: i,
      user: o,
      editable: l,
      onUpdateSection: (v) => d(C.id, v),
      onAddItem: (v) => m(C.id, v),
      onUpdateItem: (v, R) => u(C.id, v, R),
      onRemoveItem: (v) => b(C.id, v),
      participants: f?.filter((v) => v.currentSectionId === C.id),
      onFocus: () => x?.(C.id),
      isFocused: c === C.id,
      comments: w?.[C.id] ?? [],
      onAddComment: (v, R) => h?.(C.id, v, R),
      onResolveThread: (v) => k?.(C.id, v),
      onUnresolveThread: (v) => g?.(C.id, v),
      onUpdateCursorInfo: M,
      commentCount: (w?.[C.id] ?? []).length,
      onOpenComments: p
    },
    C.id
  )) });
}
function gt(t) {
  return `ws_attachments_${t}`;
}
function rr(t) {
  try {
    const r = localStorage.getItem(gt(t));
    return r ? JSON.parse(r) : [];
  } catch {
    return [];
  }
}
function or(t) {
  const [r, s] = T(
    () => rr(t)
  ), i = (m) => {
    localStorage.setItem(gt(t), JSON.stringify(m)), s(m);
  };
  return { attachments: r, addFile: (m, u) => {
    i([
      ...r,
      { id: crypto.randomUUID(), kind: "file", name: m.trim(), url: u.trim(), addedAt: (/* @__PURE__ */ new Date()).toISOString() }
    ]);
  }, addDocumentLink: (m) => {
    i([
      ...r,
      { id: crypto.randomUUID(), kind: "document", title: m.trim(), addedAt: (/* @__PURE__ */ new Date()).toISOString() }
    ]);
  }, remove: (m) => {
    i(r.filter((u) => u.id !== m));
  } };
}
function sr({ onAdd: t, onCancel: r }) {
  const [s, i] = T(""), [o, l] = T(""), d = s.trim().length > 0 && o.trim().length > 0;
  return /* @__PURE__ */ a("div", { className: e("flex gap-2 items-start flex-wrap"), children: [
    /* @__PURE__ */ n(
      "input",
      {
        autoFocus: !0,
        placeholder: "File name",
        value: s,
        onChange: (m) => i(m.target.value),
        className: e("flex-1 min-w-[120px] border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none")
      }
    ),
    /* @__PURE__ */ n(
      "input",
      {
        placeholder: "URL or path",
        value: o,
        onChange: (m) => l(m.target.value),
        onKeyDown: (m) => {
          m.key === "Enter" && d && t(s, o);
        },
        className: e("flex-[2] min-w-[120px] border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none")
      }
    ),
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        disabled: !d,
        onClick: () => {
          d && t(s, o);
        },
        className: e("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"),
        children: "Attach"
      }
    ),
    /* @__PURE__ */ n("button", { type: "button", onClick: r, className: e("px-3 py-1.5 text-[13px] bg-transparent border-none text-[#64748b] cursor-pointer font-[inherit] shrink-0"), children: "Cancel" })
  ] });
}
function ir({ onAdd: t, onCancel: r }) {
  const [s, i] = T(""), o = s.trim().length > 0;
  return /* @__PURE__ */ a("div", { className: e("flex gap-2 items-center flex-wrap"), children: [
    /* @__PURE__ */ n(
      "input",
      {
        autoFocus: !0,
        placeholder: "Document name",
        value: s,
        onChange: (l) => i(l.target.value),
        onKeyDown: (l) => {
          l.key === "Enter" && o && t(s);
        },
        className: e("flex-1 min-w-[120px] border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none")
      }
    ),
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        disabled: !o,
        onClick: () => {
          o && t(s);
        },
        className: e("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"),
        children: "Link"
      }
    ),
    /* @__PURE__ */ n("button", { type: "button", onClick: r, className: e("px-3 py-1.5 text-[13px] bg-transparent border-none text-[#64748b] cursor-pointer font-[inherit] shrink-0"), children: "Cancel" })
  ] });
}
function ar({ attachment: t, onRemove: r, editable: s }) {
  const i = t.kind === "file";
  return /* @__PURE__ */ a("div", { className: e("flex items-center gap-2.5 px-2.5 py-[7px] rounded-md bg-[#f8fafc] border border-border"), children: [
    /* @__PURE__ */ n("span", { className: e("text-sm shrink-0 text-[#64748b]"), children: i ? "📎" : "📄" }),
    /* @__PURE__ */ a("div", { className: e("flex-1 min-w-0"), children: [
      i ? /* @__PURE__ */ n(
        "a",
        {
          href: t.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: e("text-[13px] text-[#2563eb] font-medium no-underline hover:underline"),
          children: t.name
        }
      ) : /* @__PURE__ */ n("span", { className: e("text-[13px] text-text-primary font-medium"), children: t.title }),
      /* @__PURE__ */ n("div", { className: e("text-[11px] text-text-tertiary mt-px"), children: i ? t.url : "Linked document" })
    ] }),
    s && /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        onClick: r,
        title: "Remove",
        className: e("bg-transparent border-none cursor-pointer text-[#ef4444] text-sm px-[5px] py-0.5 opacity-50 leading-none rounded shrink-0 hover:opacity-100"),
        children: "×"
      }
    )
  ] });
}
function lr({ documentId: t, editable: r }) {
  const { attachments: s, addFile: i, addDocumentLink: o, remove: l } = or(t), [d, m] = T(null), u = s.length > 0;
  return /* @__PURE__ */ a("div", { className: e("mt-4 border border-border rounded-[10px] overflow-hidden"), children: [
    /* @__PURE__ */ a("div", { className: e(
      "flex items-center justify-between px-3.5 py-2.5 bg-[#f8fafc]",
      u || d ? "border-b border-border" : ""
    ), children: [
      /* @__PURE__ */ a("span", { className: e("text-[13px] font-semibold text-[#374151]"), children: [
        "Attachments",
        u && /* @__PURE__ */ n("span", { className: e("ml-1.5 text-[11px] text-text-tertiary font-normal"), children: s.length })
      ] }),
      r && d === null && /* @__PURE__ */ a("div", { className: e("flex gap-1.5"), children: [
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: () => m("file"),
            className: e("text-xs px-2.5 py-1 font-semibold bg-white border border-[#d1d5db] rounded-[5px] cursor-pointer font-[inherit] text-[#374151]"),
            children: "+ File"
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: () => m("document"),
            className: e("text-xs px-2.5 py-1 font-semibold bg-white border border-[#d1d5db] rounded-[5px] cursor-pointer font-[inherit] text-[#374151]"),
            children: "+ Document"
          }
        )
      ] })
    ] }),
    u && /* @__PURE__ */ n("div", { className: e("flex flex-col gap-1.5 px-3.5 py-2.5"), children: s.map((b) => /* @__PURE__ */ n(
      ar,
      {
        attachment: b,
        onRemove: () => l(b.id),
        editable: r
      },
      b.id
    )) }),
    d === "file" && /* @__PURE__ */ n("div", { className: e("px-3.5 py-2.5", u ? "border-t border-border" : ""), children: /* @__PURE__ */ n(
      sr,
      {
        onAdd: (b, f) => {
          i(b, f), m(null);
        },
        onCancel: () => m(null)
      }
    ) }),
    d === "document" && /* @__PURE__ */ n("div", { className: e("px-3.5 py-2.5", u ? "border-t border-border" : ""), children: /* @__PURE__ */ n(
      ir,
      {
        onAdd: (b) => {
          o(b), m(null);
        },
        onCancel: () => m(null)
      }
    ) }),
    !u && !d && /* @__PURE__ */ n("div", { className: e("px-3.5 py-3.5 text-xs text-text-tertiary text-center"), children: r ? "No attachments yet — add a file or link a document above." : "No attachments." })
  ] });
}
function dr(t) {
  const r = t.trim().split(/\s+/);
  return r.length === 0 ? "?" : r.length === 1 ? r[0].charAt(0).toUpperCase() : (r[0].charAt(0) + r[r.length - 1].charAt(0)).toUpperCase();
}
const yt = an(
  function({ query: r, users: s, position: i, onSelect: o, onDismiss: l }, d) {
    const [m, u] = T(0), b = V(null), f = s.filter(
      (c) => c.displayName.toLowerCase().includes(r.toLowerCase())
    ).slice(0, 6);
    O(() => {
      u(0);
    }, [r]), O(() => {
      const c = b.current;
      if (!c) return;
      const w = c.children[m];
      w && w.scrollIntoView({ block: "nearest" });
    }, [m]);
    const x = L(
      (c) => c.key === "ArrowDown" ? (c.preventDefault(), u((w) => (w + 1) % Math.max(f.length, 1)), !0) : c.key === "ArrowUp" ? (c.preventDefault(), u((w) => (w - 1 + Math.max(f.length, 1)) % Math.max(f.length, 1)), !0) : c.key === "Enter" || c.key === "Tab" ? (c.preventDefault(), f.length > 0 && o(f[m]), !0) : c.key === "Escape" ? (c.preventDefault(), l(), !0) : !1,
      [f, m, o, l]
    );
    return ln(d, () => ({ handleKeyDown: x }), [x]), dn.createPortal(
      /* @__PURE__ */ n(
        "div",
        {
          ref: b,
          role: "listbox",
          className: e("fixed z-[1000] bg-white border border-border rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.12)] max-h-60 overflow-y-auto min-w-[200px]"),
          style: { top: i.top, left: i.left },
          children: f.length === 0 ? /* @__PURE__ */ n("div", { className: e("px-4 py-3 text-[13px] text-text-tertiary text-center"), children: "No users found" }) : f.map((c, w) => /* @__PURE__ */ a(
            "div",
            {
              role: "option",
              "aria-selected": w === m,
              className: e(
                "flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors duration-100",
                w === m ? "bg-[#eff6ff]" : "bg-transparent"
              ),
              onMouseEnter: () => u(w),
              onMouseDown: (h) => {
                h.preventDefault(), o(c);
              },
              children: [
                /* @__PURE__ */ n(
                  "div",
                  {
                    className: e("w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[11px] font-semibold text-white leading-none"),
                    style: { background: c.color },
                    children: c.type === "group" ? "#" : dr(c.displayName)
                  }
                ),
                /* @__PURE__ */ a("div", { className: e("flex items-center gap-1.5 flex-1 min-w-0"), children: [
                  /* @__PURE__ */ n("span", { className: e("text-[13px] font-medium text-[#1e293b] overflow-hidden text-ellipsis whitespace-nowrap"), children: c.type === "group" ? `@${c.displayName.toLowerCase()}` : c.displayName }),
                  c.type === "user" && /* @__PURE__ */ n("span", { className: e("w-2 h-2 rounded-full shrink-0", c.online ? "bg-emerald-500" : "bg-text-disabled") }),
                  c.type === "user" && c.mode && /* @__PURE__ */ n("span", { className: e("text-[11px] text-text-tertiary shrink-0"), children: c.mode }),
                  c.type === "group" && c.memberCount != null && /* @__PURE__ */ a("span", { className: e("text-[11px] text-text-tertiary shrink-0"), children: [
                    c.memberCount,
                    " members"
                  ] })
                ] })
              ]
            },
            c.userId
          ))
        }
      ),
      document.body
    );
  }
);
function cr(t) {
  return t.split(" ").map((r) => r[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function Te(t) {
  try {
    const r = Date.now() - new Date(t).getTime(), s = Math.floor(r / 1e3);
    if (s < 60) return "just now";
    const i = Math.floor(s / 60);
    if (i < 60) return `${i}m ago`;
    const o = Math.floor(i / 60);
    return o < 24 ? `${o}h ago` : `${Math.floor(o / 24)}d ago`;
  } catch {
    return "";
  }
}
function wt(t) {
  let r = 0;
  for (const s of t)
    r += 1 + wt(s.replies);
  return r;
}
function mr(t) {
  return t.split(/(@[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)*)/g).map(
    (s, i) => s.startsWith("@") && /^@[A-Z]/.test(s) ? /* @__PURE__ */ n(
      "span",
      {
        className: e("text-[#3b82f6] font-semibold bg-[#eff6ff] px-0.5 rounded-sm"),
        children: s
      },
      i
    ) : s
  );
}
const q = {
  active: !1,
  query: "",
  position: { top: 0, left: 0 },
  atIndex: -1
};
function vt(t, r, s) {
  let i = r - 1;
  for (; i >= 0 && t[i] !== "@" && t[i] !== " " && t[i] !== `
`; )
    i--;
  if (i < 0 || t[i] !== "@" || i > 0 && t[i - 1] !== " " && t[i - 1] !== `
`)
    return q;
  const o = t.slice(i + 1, r), l = s?.getBoundingClientRect(), d = l ? { top: l.bottom + 4, left: l.left } : { top: 28, left: 0 };
  return { active: !0, query: o, position: d, atIndex: i };
}
function Nt(t, r, s) {
  const i = t.slice(0, r.atIndex), o = t.slice(r.atIndex + 1 + r.query.length), l = `@${s.displayName} `;
  return {
    newValue: i + l + o,
    newCursor: i.length + l.length
  };
}
function kt({
  comment: t,
  depth: r,
  onReply: s,
  mentionUsers: i,
  onResolveThread: o,
  onUnresolveThread: l
}) {
  const [d, m] = T(!1), [u, b] = T(""), [f, x] = T(!1), c = V(null), w = V(null), [h, k] = T(q), [g, M] = T(!1), p = r === 0 && !!t.resolved, C = Math.min(r, 5), v = () => {
    if (h.active) return;
    const I = u.trim();
    I && (s(t.id, I), b(""), m(!1), k(q));
  }, R = (I) => {
    const y = I.target.value;
    b(y);
    const _ = I.target.selectionStart ?? y.length, W = vt(y, _, c.current);
    k(W);
  }, j = L(
    (I) => {
      const { newValue: y, newCursor: _ } = Nt(u, h, I);
      b(y), k(q), requestAnimationFrame(() => {
        const W = c.current;
        W && (W.focus(), W.setSelectionRange(_, _));
      });
    },
    [u, h]
  ), S = (I) => {
    h.active && w.current && w.current.handleKeyDown(I) || (I.key === "Enter" && !I.shiftKey && (I.preventDefault(), v()), I.key === "Escape" && m(!1));
  }, D = f ? t.color : r === 0 ? "#e2e8f0" : "#cbd5e1";
  return p && !g ? /* @__PURE__ */ n("div", { className: e(C > 0 ? "ml-5" : "ml-0"), children: /* @__PURE__ */ a(
    "div",
    {
      className: e("bg-[#f0fdf4] border-l-[3px] border-l-[#22c55e] px-3 py-2 mb-1 rounded cursor-pointer flex items-center justify-between"),
      onClick: () => M(!0),
      children: [
        /* @__PURE__ */ a("div", { className: e("flex items-center gap-1.5"), children: [
          /* @__PURE__ */ n("span", { className: e("text-[#16a34a] text-xs"), children: "✔" }),
          /* @__PURE__ */ a("span", { className: e("text-[#16a34a] text-xs font-semibold"), children: [
            "Resolved by ",
            t.resolvedBy
          ] }),
          t.resolvedAt && /* @__PURE__ */ n("span", { className: e("text-[#86efac] text-[11px]"), children: Te(t.resolvedAt) }),
          /* @__PURE__ */ n("span", { className: e("text-text-tertiary text-[11px] ml-1"), children: "— click to expand" })
        ] }),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: (I) => {
              I.stopPropagation(), l?.(t.id);
            },
            className: e("bg-transparent border border-[#cbd5e1] rounded px-2 py-0.5 text-[#64748b] text-[11px] cursor-pointer font-[inherit]"),
            children: "Reopen"
          }
        )
      ]
    }
  ) }) : /* @__PURE__ */ a("div", { className: e(C > 0 ? "ml-5" : "ml-0", p ? "opacity-60" : ""), children: [
    p && g && /* @__PURE__ */ a(
      "div",
      {
        className: e("bg-[#f0fdf4] border-l-[3px] border-l-[#22c55e] px-3 py-2 mb-1 rounded cursor-pointer flex items-center justify-between"),
        onClick: () => M(!1),
        children: [
          /* @__PURE__ */ a("div", { className: e("flex items-center gap-1.5"), children: [
            /* @__PURE__ */ n("span", { className: e("text-[#16a34a] text-xs"), children: "✔" }),
            /* @__PURE__ */ a("span", { className: e("text-[#16a34a] text-xs font-semibold"), children: [
              "Resolved by ",
              t.resolvedBy
            ] }),
            t.resolvedAt && /* @__PURE__ */ n("span", { className: e("text-[#86efac] text-[11px]"), children: Te(t.resolvedAt) }),
            /* @__PURE__ */ n("span", { className: e("text-text-tertiary text-[11px] ml-1"), children: "— click to collapse" })
          ] }),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: (I) => {
                I.stopPropagation(), l?.(t.id);
              },
              className: e("bg-transparent border border-[#cbd5e1] rounded px-2 py-0.5 text-[#64748b] text-[11px] cursor-pointer font-[inherit]"),
              children: "Reopen"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ a(
      "div",
      {
        className: e("px-3 py-2 mb-1 transition-colors duration-200"),
        style: { borderLeft: `3px solid ${D}` },
        onMouseEnter: () => x(!0),
        onMouseLeave: () => x(!1),
        children: [
          /* @__PURE__ */ a("div", { className: e("flex items-center gap-1.5 mb-1"), children: [
            /* @__PURE__ */ n(
              "div",
              {
                className: e("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold shrink-0"),
                style: { background: `linear-gradient(135deg, ${t.color}, ${t.color}dd)` },
                children: cr(t.displayName)
              }
            ),
            /* @__PURE__ */ n("span", { className: e("font-semibold text-[13px] text-[#1e293b]"), children: t.displayName }),
            /* @__PURE__ */ n("span", { className: e("text-[11px] text-text-tertiary"), children: Te(t.timestamp) })
          ] }),
          /* @__PURE__ */ n("div", { className: e("text-[13px] leading-normal text-[#334155] pl-[30px] whitespace-pre-wrap"), children: mr(t.text) }),
          /* @__PURE__ */ a("div", { className: e("pl-[30px] mt-1 flex gap-2"), children: [
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                onClick: () => {
                  m(!d), d || setTimeout(() => c.current?.focus(), 50);
                },
                className: e("bg-transparent border-none text-[#64748b] text-xs cursor-pointer py-0.5 px-0 font-[inherit]"),
                children: "Reply"
              }
            ),
            r === 0 && !p && o && /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                onClick: () => o(t.id),
                className: e("bg-transparent border-none text-[#64748b] text-xs cursor-pointer py-0.5 px-0 font-[inherit]"),
                children: [
                  "✔",
                  " Resolve"
                ]
              }
            )
          ] }),
          d && /* @__PURE__ */ a("div", { className: e("pl-[30px] mt-2 overflow-hidden animate-[sectionCommentsSlideDown_0.2s_ease-out]"), children: [
            /* @__PURE__ */ a("div", { className: e("relative"), children: [
              /* @__PURE__ */ n(
                "textarea",
                {
                  ref: c,
                  value: u,
                  onChange: R,
                  onKeyDown: S,
                  placeholder: "Write a reply... (type @ to mention)",
                  rows: 2,
                  className: e("w-full border border-border rounded-md px-2.5 py-1.5 text-[13px] font-[inherit] outline-none resize-y min-h-12 box-border text-[#1e293b] bg-white")
                }
              ),
              h.active && /* @__PURE__ */ n(
                yt,
                {
                  ref: w,
                  query: h.query,
                  users: i,
                  position: h.position,
                  onSelect: j,
                  onDismiss: () => k(q)
                }
              )
            ] }),
            /* @__PURE__ */ a("div", { className: e("flex gap-1.5 mt-1.5"), children: [
              /* @__PURE__ */ n(
                "button",
                {
                  type: "button",
                  onClick: v,
                  className: e("px-3 py-1 text-xs font-semibold border-none rounded-md bg-[#3b82f6] text-white cursor-pointer font-[inherit]"),
                  children: "Reply"
                }
              ),
              /* @__PURE__ */ n(
                "button",
                {
                  type: "button",
                  onClick: () => m(!1),
                  className: e("px-3 py-1 text-xs font-medium border border-border rounded-md bg-transparent text-[#64748b] cursor-pointer font-[inherit]"),
                  children: "Cancel"
                }
              )
            ] })
          ] })
        ]
      }
    ),
    t.replies.map((I) => /* @__PURE__ */ n(
      kt,
      {
        comment: I,
        depth: r + 1,
        onReply: s,
        mentionUsers: i,
        onResolveThread: o,
        onUnresolveThread: l
      },
      I.id
    ))
  ] });
}
function _e({
  comments: t,
  onAddComment: r,
  participants: s = [],
  onResolveThread: i,
  onUnresolveThread: o
}) {
  const [l, d] = T(!0), [m, u] = T(""), b = V(null), f = V(null), [x, c] = T(q), w = gn(s), h = wt(t), [k, g] = T(!0), M = [...t].sort((S, D) => {
    if (S.resolved && !D.resolved) return 1;
    if (!S.resolved && D.resolved) return -1;
    const I = new Date(S.timestamp).getTime(), y = new Date(D.timestamp).getTime();
    return k ? y - I : I - y;
  }), p = () => {
    if (x.active) return;
    const S = m.trim();
    S && (r(S, null), u(""), c(q));
  }, C = (S) => {
    const D = S.target.value;
    u(D);
    const I = S.target.selectionStart ?? D.length, y = vt(D, I, b.current);
    c(y);
  }, v = L(
    (S) => {
      const { newValue: D, newCursor: I } = Nt(m, x, S);
      u(D), c(q), requestAnimationFrame(() => {
        const y = b.current;
        y && (y.focus(), y.setSelectionRange(I, I));
      });
    },
    [m, x]
  ), R = (S) => {
    x.active && f.current && f.current.handleKeyDown(S) || S.key === "Enter" && !S.shiftKey && (S.preventDefault(), p());
  }, j = (S, D) => {
    r(D, S);
  };
  return /* @__PURE__ */ a("div", { children: [
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: () => {
          d((S) => !S), l || setTimeout(() => b.current?.focus(), 100);
        },
        className: e(
          "inline-flex items-center gap-1 mt-2.5 px-2.5 py-1 text-xs font-medium border border-border rounded-md cursor-pointer font-[inherit]",
          h > 0 ? "bg-[#f0f9ff] text-[#2563eb]" : "bg-transparent text-[#64748b]"
        ),
        children: [
          l ? "▼" : "▶",
          " Comments",
          h > 0 ? ` (${h})` : ""
        ]
      }
    ),
    l && /* @__PURE__ */ a("div", { className: e("mt-2 border border-border rounded-lg bg-[#f8fafc] overflow-hidden animate-[sectionCommentsSlideDown_0.2s_ease-out]"), children: [
      /* @__PURE__ */ a("div", { className: e("flex items-start gap-1.5 px-3 py-2.5 border-b border-border bg-white"), children: [
        /* @__PURE__ */ a("div", { className: e("flex-1 relative"), children: [
          /* @__PURE__ */ n(
            "textarea",
            {
              ref: b,
              value: m,
              onChange: C,
              onKeyDown: R,
              placeholder: "Add a comment... (type @ to mention)",
              rows: 2,
              className: e("w-full border border-border rounded-md px-2.5 py-2 text-[13px] font-[inherit] outline-none resize-y min-h-12 box-border text-[#1e293b] bg-white")
            }
          ),
          x.active && /* @__PURE__ */ n(
            yt,
            {
              ref: f,
              query: x.query,
              users: w,
              position: x.position,
              onSelect: v,
              onDismiss: () => c(q)
            }
          )
        ] }),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: p,
            className: e("px-3.5 py-1.5 text-xs font-semibold border-none rounded-md bg-[#3b82f6] text-white cursor-pointer font-[inherit] whitespace-nowrap self-end"),
            children: "Post"
          }
        )
      ] }),
      t.length > 1 && /* @__PURE__ */ n("div", { className: e("flex justify-end px-3 pt-1 border-b border-[#f1f5f9]"), children: /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          onClick: () => g((S) => !S),
          className: e("bg-transparent border-none cursor-pointer text-[11px] text-[#64748b] px-1.5 py-0.5 font-[inherit]"),
          children: k ? "↓ Newest first" : "↑ Oldest first"
        }
      ) }),
      /* @__PURE__ */ a("div", { className: e("max-h-[420px] overflow-y-auto px-3 py-2"), children: [
        t.length === 0 && /* @__PURE__ */ n("div", { className: e("p-3 text-center text-text-tertiary text-xs"), children: "No comments yet. Start the discussion!" }),
        M.map((S) => /* @__PURE__ */ n(
          kt,
          {
            comment: S,
            depth: 0,
            onReply: j,
            mentionUsers: w,
            onResolveThread: i,
            onUnresolveThread: o
          },
          S.id
        ))
      ] })
    ] })
  ] });
}
const rt = {
  summary: { bg: "#dbeafe", text: "#1e40af" },
  tasks: { bg: "#fef3c7", text: "#92400e" },
  decisions: { bg: "#ede9fe", text: "#5b21b6" },
  notes: { bg: "#f3f4f6", text: "#374151" },
  custom: { bg: "#e0e7ff", text: "#3730a3" }
}, re = {
  approved: { label: "Approved", color: "#166534", bg: "#dcfce7", icon: "✓" },
  reviewed: { label: "Reviewed", color: "#374151", bg: "#f3f4f6", icon: "—" },
  changes_requested: { label: "Changes Requested", color: "#92400e", bg: "#fef3c7", icon: "!" }
};
function pr({
  sections: t,
  participants: r,
  userId: s,
  getSectionFragment: i,
  ydoc: o,
  provider: l,
  sectionReviews: d,
  reviewSection: m,
  comments: u,
  onAddComment: b,
  onResolveThread: f,
  onUnresolveThread: x,
  onSectionFocus: c
}) {
  const [w, h] = T({}), k = t.filter((p) => (d[p.id] ?? []).some((v) => v.userId === s)).length, g = /* @__PURE__ */ new Map();
  for (const p of t)
    for (const C of d[p.id] ?? []) {
      const v = g.get(C.userId) ?? { displayName: C.displayName, statuses: [] };
      v.statuses.push(C.status), g.set(C.userId, v);
    }
  const M = t.length > 0 ? Math.round(k / t.length * 100) : 0;
  return t.length === 0 ? /* @__PURE__ */ n("div", { className: e("text-center p-12 text-[#6b7280] text-[15px]"), children: "No sections to review." }) : /* @__PURE__ */ a("div", { "data-testid": "review-mode", className: e("max-w-[800px] mx-auto"), children: [
    /* @__PURE__ */ a("div", { "data-testid": "review-progress", className: e("mb-6"), children: [
      /* @__PURE__ */ a("div", { className: e("text-[13px] text-[#6b7280] mb-1 flex justify-between"), children: [
        /* @__PURE__ */ a("span", { "data-testid": "review-progress-text", children: [
          k,
          " of ",
          t.length,
          " sections reviewed by you"
        ] }),
        /* @__PURE__ */ a("span", { "data-testid": "review-progress-pct", children: [
          M,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ n("div", { className: e("h-2 bg-[#e5e7eb] rounded overflow-hidden"), children: /* @__PURE__ */ n(
        "div",
        {
          className: e("h-full rounded transition-[width] duration-300 ease-in-out", k === t.length ? "bg-success" : "bg-blue-500"),
          style: { width: `${M}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ n("div", { className: e("flex flex-col gap-6"), children: t.map((p) => {
      const C = i(p.id), v = rt[p.type] ?? rt.custom, R = d[p.id] ?? [], j = R.find((y) => y.userId === s), S = R.filter((y) => y.userId !== s), D = r.filter((y) => y.currentSectionId === p.id), I = w[p.id] ?? !1;
      return /* @__PURE__ */ a(
        "div",
        {
          id: `section-${p.id}`,
          "data-testid": `review-section-${p.id}`,
          className: e("bg-white border border-[#e5e7eb] rounded-lg p-5"),
          style: {
            borderLeft: j ? `3px solid ${re[j.status].color}` : "3px solid #d1d5db"
          },
          onMouseEnter: () => c?.(p.id),
          children: [
            /* @__PURE__ */ a("div", { className: e("flex items-center gap-2 mb-1"), children: [
              /* @__PURE__ */ n("h3", { className: e("text-lg font-bold m-0 text-[#1e293b] flex-1"), children: p.title }),
              /* @__PURE__ */ n(
                "span",
                {
                  className: e("inline-block text-[11px] font-semibold py-0.5 px-2.5 rounded-full"),
                  style: { background: v.bg, color: v.text },
                  children: p.sectionType ?? p.type
                }
              )
            ] }),
            C && /* @__PURE__ */ n("div", { className: e(p.items.length > 0 ? "mb-4" : "mb-2"), children: /* @__PURE__ */ n(
              fe,
              {
                fragment: C,
                ydoc: o,
                provider: l,
                user: { name: "", color: "" },
                editable: !1,
                sectionId: p.id
              }
            ) }),
            !C && p.items.length === 0 && /* @__PURE__ */ n("div", { className: e("py-4 text-text-tertiary text-sm text-center"), children: "This section has no content." }),
            p.items.length > 0 && /* @__PURE__ */ n("div", { className: e("mb-3"), children: p.items.map((y) => {
              const _ = y.status === "acked" ? "#16a34a" : y.status === "rejected" ? "#dc2626" : y.status === "done" ? "#6b7280" : "#94a3b8";
              return /* @__PURE__ */ a("div", { className: e("flex items-start gap-2 py-1.5 border-b border-[#f3f4f6] text-sm"), children: [
                /* @__PURE__ */ n(
                  "span",
                  {
                    className: e("inline-block w-2 h-2 rounded-full mt-[5px] shrink-0"),
                    style: { background: _ }
                  }
                ),
                /* @__PURE__ */ a("div", { className: e("flex-1"), children: [
                  /* @__PURE__ */ n("span", { className: e("text-[#1e293b]"), children: y.text }),
                  y.assignee && /* @__PURE__ */ a("span", { className: e("text-[#6b7280] text-xs ml-2"), children: [
                    "— ",
                    y.assignee
                  ] }),
                  y.priority && y.priority !== "medium" && /* @__PURE__ */ n(
                    "span",
                    {
                      className: e("text-[10px] font-semibold ml-1.5 px-1.5 py-px rounded", y.priority === "high" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"),
                      children: y.priority
                    }
                  )
                ] }),
                /* @__PURE__ */ n(
                  "span",
                  {
                    className: e("text-[11px] font-semibold capitalize shrink-0"),
                    style: { color: _ },
                    children: y.status
                  }
                )
              ] }, y.id);
            }) }),
            /* @__PURE__ */ a("div", { className: e("flex items-center gap-2 pt-2.5 pb-1 border-t border-[#f3f4f6] flex-wrap"), children: [
              !j || I ? /* @__PURE__ */ a(F, { children: [
                /* @__PURE__ */ n(
                  Me,
                  {
                    testid: `section-${p.id}-review-reviewed`,
                    label: "Mark Reviewed",
                    bg: "#f3f4f6",
                    color: "#374151",
                    hoverBg: "#e5e7eb",
                    onClick: () => {
                      m(p.id, "reviewed"), h((y) => ({ ...y, [p.id]: !1 }));
                    }
                  }
                ),
                /* @__PURE__ */ n(
                  Me,
                  {
                    testid: `section-${p.id}-review-approved`,
                    label: "Approve",
                    bg: "#dcfce7",
                    color: "#166534",
                    hoverBg: "#bbf7d0",
                    onClick: () => {
                      m(p.id, "approved"), h((y) => ({ ...y, [p.id]: !1 }));
                    }
                  }
                ),
                /* @__PURE__ */ n(
                  Me,
                  {
                    testid: `section-${p.id}-review-changes-requested`,
                    label: "Request Changes",
                    bg: "#fef3c7",
                    color: "#92400e",
                    hoverBg: "#fde68a",
                    onClick: () => {
                      m(p.id, "changes_requested"), h((y) => ({ ...y, [p.id]: !1 }));
                    }
                  }
                ),
                I && /* @__PURE__ */ n(
                  "button",
                  {
                    "data-testid": `section-${p.id}-cancel-change`,
                    onClick: () => h((y) => ({ ...y, [p.id]: !1 })),
                    className: e("bg-transparent border-none text-[#6b7280] text-xs cursor-pointer underline"),
                    children: "Cancel"
                  }
                )
              ] }) : /* @__PURE__ */ a(F, { children: [
                /* @__PURE__ */ a(
                  "span",
                  {
                    "data-testid": `section-${p.id}-status`,
                    "data-status": j.status,
                    className: e("inline-flex items-center gap-1 text-[13px] font-semibold py-1 px-2.5 rounded-md"),
                    style: { background: re[j.status].bg, color: re[j.status].color },
                    children: [
                      /* @__PURE__ */ n("span", { className: e("text-sm"), children: re[j.status].icon }),
                      re[j.status].label
                    ]
                  }
                ),
                /* @__PURE__ */ a("span", { className: e("text-xs text-[#6b7280]"), children: [
                  "by you · ",
                  new Date(j.timestamp).toLocaleString(void 0, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                ] }),
                /* @__PURE__ */ n(
                  "button",
                  {
                    "data-testid": `section-${p.id}-change-review`,
                    onClick: () => h((y) => ({ ...y, [p.id]: !0 })),
                    className: e("bg-transparent border-none text-[#3b82f6] text-xs cursor-pointer underline p-0"),
                    children: "Change"
                  }
                )
              ] }),
              S.length > 0 && /* @__PURE__ */ n("div", { className: e("flex gap-1 ml-auto items-center"), children: S.map((y) => {
                const _ = re[y.status], W = y.displayName.split(" ").map((Y) => Y[0]).join("").toUpperCase().slice(0, 2);
                return /* @__PURE__ */ n(
                  "div",
                  {
                    title: `${y.displayName}: ${_.label}`,
                    className: e("w-[26px] h-[26px] rounded-full flex items-center justify-center text-[10px] font-bold"),
                    style: { background: _.bg, color: _.color, border: `2px solid ${_.color}` },
                    children: W
                  },
                  y.userId
                );
              }) }),
              D.length > 0 && /* @__PURE__ */ a("div", { className: e("flex gap-1 items-center"), style: { marginLeft: S.length > 0 ? 0 : "auto" }, children: [
                /* @__PURE__ */ n("span", { className: e("text-[11px] text-text-tertiary"), children: "Viewing:" }),
                D.map((y) => /* @__PURE__ */ n(
                  "div",
                  {
                    title: y.displayName,
                    className: e("w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-semibold"),
                    style: { background: y.color },
                    children: y.displayName.split(" ").map((_) => _[0]).join("").toUpperCase().slice(0, 2)
                  },
                  y.clientId
                ))
              ] })
            ] }),
            b && /* @__PURE__ */ n(
              _e,
              {
                comments: u?.[p.id] ?? [],
                onAddComment: (y, _) => b(p.id, y, _),
                participants: r,
                onResolveThread: f ? (y) => f(p.id, y) : void 0,
                onUnresolveThread: x ? (y) => x(p.id, y) : void 0
              }
            )
          ]
        },
        p.id
      );
    }) }),
    g.size > 0 && /* @__PURE__ */ a(
      "div",
      {
        "data-testid": "review-summary",
        className: e("mt-8 p-4 px-5 bg-[#f8fafc] border border-border rounded-lg"),
        children: [
          /* @__PURE__ */ n("h4", { className: e("m-0 mb-3 text-sm font-bold text-text-secondary"), children: "Document Review Summary" }),
          /* @__PURE__ */ n("div", { className: e("flex flex-col gap-2"), children: Array.from(g.entries()).map(([p, C]) => {
            const v = C.statuses.filter((S) => S === "approved").length, R = C.statuses.filter((S) => S === "changes_requested").length, j = C.statuses.filter((S) => S === "reviewed").length;
            return /* @__PURE__ */ a("div", { className: e("flex items-center gap-2.5 text-[13px]"), children: [
              /* @__PURE__ */ a("span", { className: e("font-semibold text-[#1e293b] min-w-[100px]"), children: [
                C.displayName,
                p === s ? " (you)" : ""
              ] }),
              /* @__PURE__ */ a("span", { className: e("text-[#6b7280]"), children: [
                C.statuses.length,
                " of ",
                t.length,
                " sections"
              ] }),
              v > 0 && /* @__PURE__ */ a("span", { className: e("text-[11px] px-2 py-px rounded bg-[#dcfce7] text-[#166534] font-semibold"), children: [
                v,
                " approved"
              ] }),
              j > 0 && /* @__PURE__ */ a("span", { className: e("text-[11px] px-2 py-px rounded bg-[#f3f4f6] text-[#374151] font-semibold"), children: [
                j,
                " reviewed"
              ] }),
              R > 0 && /* @__PURE__ */ a("span", { className: e("text-[11px] px-2 py-px rounded bg-[#fef3c7] text-[#92400e] font-semibold"), children: [
                R,
                " changes requested"
              ] })
            ] }, p);
          }) })
        ]
      }
    )
  ] });
}
function Me({ label: t, bg: r, color: s, hoverBg: i, onClick: o, testid: l }) {
  const [d, m] = T(!1);
  return /* @__PURE__ */ n(
    "button",
    {
      "data-testid": l,
      onClick: o,
      onMouseEnter: () => m(!0),
      onMouseLeave: () => m(!1),
      className: e("py-1.5 px-3.5 text-[13px] font-semibold border border-transparent rounded-md cursor-pointer transition-colors duration-150"),
      style: { background: d ? i : r, color: s },
      children: t
    }
  );
}
const ot = {
  draft: { bg: "#fef3c7", text: "#92400e" },
  review: { bg: "#dbeafe", text: "#1e40af" },
  final: { bg: "#d1fae5", text: "#065f46" }
};
function ur(t) {
  if (!t) return "";
  try {
    return new Date(t).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  } catch {
    return t;
  }
}
function fr(t) {
  const r = [], s = [], i = [];
  for (const o of t)
    o.status === "rejected" ? i.push(o) : o.status === "acked" || o.status === "done" ? s.push(o) : r.push(o);
  return { pending: r, completed: s, rejected: i };
}
function xr(t, r) {
  const { pending: s, completed: i, rejected: o } = fr(t), l = t.length, d = [];
  if (l > 0) {
    const b = Math.round(i.length / l * 100);
    d.push(
      `${l} action item${l !== 1 ? "s" : ""} identified, ${i.length} completed (${b}%).`
    );
  } else
    d.push("No action items recorded yet.");
  const u = r.filter((b) => b.type === "decisions").flatMap((b) => b.items);
  if (u.length > 0) {
    const b = u.filter(
      (f) => f.status === "acked" || f.status === "done"
    ).length;
    d.push(
      `${u.length} key decision${u.length !== 1 ? "s" : ""} recorded${b > 0 ? `, ${b} finalized` : ""}.`
    );
  }
  return s.length > 0 && d.push(
    `${s.length} item${s.length !== 1 ? "s" : ""} still pending review.`
  ), o.length > 0 && d.push(
    `${o.length} item${o.length !== 1 ? "s" : ""} rejected and need${o.length === 1 ? "s" : ""} revision.`
  ), d;
}
function hr({
  meta: t,
  participantCount: r
}) {
  const s = ot[t.status] ?? ot.draft;
  return /* @__PURE__ */ a(
    "div",
    {
      className: e("border-t-[3px] border-t-[#3b82f6] rounded-t-lg pt-5 pb-4 px-6 mb-4 bg-gradient-to-b from-slate-50 to-white col-span-full"),
      children: [
        /* @__PURE__ */ a("div", { className: e("flex items-center gap-3 mb-1.5"), children: [
          /* @__PURE__ */ n("h1", { className: e("text-xl font-bold m-0 text-text-primary flex-1"), children: t.title || "Untitled Document" }),
          /* @__PURE__ */ n(
            "span",
            {
              className: e("inline-block text-xs font-semibold py-[3px] px-3 rounded-full capitalize"),
              style: { background: s.bg, color: s.text },
              children: t.status
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: e("text-xs text-[#64748b]"), children: [
          t.createdBy && /* @__PURE__ */ a(F, { children: [
            "Created by ",
            t.createdByName || t.createdBy
          ] }),
          t.createdAt && /* @__PURE__ */ a(F, { children: [
            " · ",
            ur(t.createdAt)
          ] }),
          r > 0 && /* @__PURE__ */ a(F, { children: [
            " · ",
            r,
            " participant",
            r !== 1 ? "s" : ""
          ] })
        ] })
      ]
    }
  );
}
function br({
  bullets: t,
  contentText: r,
  fragment: s,
  ydoc: i,
  provider: o
}) {
  const l = s && i, d = r && r.trim().length > 0;
  return /* @__PURE__ */ a("div", { className: e("bg-white border border-border rounded-lg p-4 mb-4"), children: [
    /* @__PURE__ */ n("h2", { className: e("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Executive Summary" }),
    l ? /* @__PURE__ */ n("div", { className: e(
      "py-1 px-3 bg-[#f8fafc] rounded-md border-l-[3px] border-l-[#8b5cf6]",
      t.length > 0 ? "mb-3" : ""
    ), children: /* @__PURE__ */ n(
      fe,
      {
        fragment: s,
        ydoc: i,
        provider: o ?? null,
        user: { name: "", color: "" },
        editable: !1
      }
    ) }) : d ? /* @__PURE__ */ n("div", { className: e(
      "text-sm text-[#1e293b] leading-relaxed whitespace-pre-wrap py-2 px-3 bg-[#f8fafc] rounded-md border-l-[3px] border-l-[#8b5cf6]",
      t.length > 0 ? "mb-3" : ""
    ), children: r.trim() }) : null,
    /* @__PURE__ */ n("ul", { className: e("m-0 pl-[18px] text-[13px] text-[#334155] leading-relaxed"), children: t.map((m, u) => /* @__PURE__ */ n("li", { children: m }, u)) })
  ] });
}
const oe = {
  pending: "#f59e0b",
  done: "#10b981",
  rejected: "#ef4444"
}, st = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#6b7280"
};
function Ct(t) {
  switch (t) {
    case "acked":
    case "done":
      return "✅";
    case "rejected":
      return "❌";
    default:
      return "⬜";
  }
}
function gr(t) {
  const r = [], s = [], i = [];
  for (const o of t)
    o.status === "rejected" ? i.push(o) : o.status === "acked" || o.status === "done" ? s.push(o) : r.push(o);
  return { pending: r, completed: s, rejected: i };
}
function $e({
  label: t,
  count: r,
  color: s,
  defaultOpen: i,
  children: o
}) {
  const [l, d] = T(i);
  return /* @__PURE__ */ a("div", { className: e("mb-2"), children: [
    /* @__PURE__ */ a(
      "button",
      {
        onClick: () => d(!l),
        className: e("bg-transparent border-none cursor-pointer flex items-center gap-1.5 py-1 px-0 text-[13px] font-semibold text-[#334155] font-[inherit] w-full"),
        children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: e("inline-block text-[10px] transition-transform duration-150 ease-in-out", l ? "rotate-90" : "rotate-0"),
              children: "▶"
            }
          ),
          /* @__PURE__ */ n("span", { style: { color: s }, children: t }),
          /* @__PURE__ */ n(
            "span",
            {
              className: e("text-[11px] px-2 py-px rounded-full font-semibold"),
              style: { background: `${s}18`, color: s },
              children: r
            }
          )
        ]
      }
    ),
    l && /* @__PURE__ */ n("div", { className: e("pl-4 mt-1"), children: o })
  ] });
}
function De({
  item: t,
  variant: r
}) {
  const s = r === "pending" ? oe.pending : r === "completed" ? oe.done : oe.rejected;
  return /* @__PURE__ */ a(
    "div",
    {
      className: e("flex items-center gap-2 py-[5px] px-2 mb-1 rounded-r", r === "pending" ? "bg-amber-50" : "bg-white"),
      style: { borderLeft: `3px solid ${s}` },
      children: [
        /* @__PURE__ */ n("span", { className: e("text-[13px] flex-1"), children: /* @__PURE__ */ n(
          "span",
          {
            className: e(
              r === "completed" ? "line-through text-text-tertiary" : "text-[#334155]"
            ),
            children: t.text
          }
        ) }),
        t.priority && /* @__PURE__ */ n(
          "span",
          {
            className: e("text-[10px] font-semibold px-1.5 py-px rounded-full uppercase shrink-0"),
            style: { background: `${st[t.priority]}18`, color: st[t.priority] },
            children: t.priority
          }
        ),
        t.ackedBy && /* @__PURE__ */ n("span", { className: e("text-[11px] text-text-tertiary shrink-0"), children: t.ackedBy })
      ]
    }
  );
}
function yr({ sections: t }) {
  const s = t.filter((i) => i.type === "decisions").flatMap((i) => i.items);
  return /* @__PURE__ */ a("div", { className: e("bg-white border border-border rounded-lg p-4 mb-4"), children: [
    /* @__PURE__ */ n("h2", { className: e("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Key Decisions" }),
    s.length === 0 ? /* @__PURE__ */ n("div", { className: e("text-[13px] text-text-tertiary italic"), children: "No decisions recorded" }) : /* @__PURE__ */ n("div", { className: e("flex flex-col gap-1.5"), children: s.map((i) => /* @__PURE__ */ a(
      "div",
      {
        className: e("flex items-start gap-2 text-[13px] text-[#334155]"),
        children: [
          /* @__PURE__ */ n("span", { className: e("shrink-0"), children: Ct(i.status) }),
          /* @__PURE__ */ n("span", { children: i.text })
        ]
      },
      i.id
    )) })
  ] });
}
function wr({ allItems: t }) {
  const { pending: r, completed: s, rejected: i } = gr(t);
  return /* @__PURE__ */ a("div", { className: e("bg-white border border-border rounded-lg p-4 mb-4"), children: [
    /* @__PURE__ */ n("h2", { className: e("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Action Items" }),
    t.length === 0 ? /* @__PURE__ */ n("div", { className: e("text-[13px] text-text-tertiary italic"), children: "No action items yet" }) : /* @__PURE__ */ a(F, { children: [
      r.length > 0 && /* @__PURE__ */ n(
        $e,
        {
          label: "Pending",
          count: r.length,
          color: oe.pending,
          defaultOpen: !0,
          children: r.map((o) => /* @__PURE__ */ n(De, { item: o, variant: "pending" }, o.id))
        }
      ),
      s.length > 0 && /* @__PURE__ */ n(
        $e,
        {
          label: "Completed",
          count: s.length,
          color: oe.done,
          defaultOpen: !1,
          children: s.map((o) => /* @__PURE__ */ n(De, { item: o, variant: "completed" }, o.id))
        }
      ),
      i.length > 0 && /* @__PURE__ */ n(
        $e,
        {
          label: "Rejected",
          count: i.length,
          color: oe.rejected,
          defaultOpen: !1,
          children: i.map((o) => /* @__PURE__ */ n(De, { item: o, variant: "rejected" }, o.id))
        }
      )
    ] })
  ] });
}
function vr({
  sections: t,
  commentCounts: r,
  sectionContentTexts: s,
  comments: i,
  getSectionFragment: o,
  ydoc: l,
  provider: d
}) {
  const [m, u] = T({}), b = (x) => u((c) => ({ ...c, [x]: !c[x] })), f = {
    summary: { bg: "#e0e7ff", text: "#4338ca" },
    tasks: { bg: "#dbeafe", text: "#1e40af" },
    decisions: { bg: "#fce7f3", text: "#9d174d" },
    notes: { bg: "#f0fdf4", text: "#166534" },
    custom: { bg: "#f3f4f6", text: "#6b7280" }
  };
  return /* @__PURE__ */ a("div", { className: e("bg-white border border-border rounded-lg p-4 mb-4"), children: [
    /* @__PURE__ */ n("h2", { className: e("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Section Summaries" }),
    t.length === 0 ? /* @__PURE__ */ n("div", { className: e("text-[13px] text-text-tertiary italic"), children: "No sections" }) : /* @__PURE__ */ n("div", { className: e("flex flex-col gap-0.5"), children: t.map((x) => {
      const c = x.items.filter(
        (v) => v.status === "acked" || v.status === "done"
      ).length, w = x.items.length, h = r?.[x.id] ?? 0, k = s?.[x.id] ?? "", g = i?.[x.id] ?? [], M = !!m[x.id], p = k.trim().length > 0, C = f[x.type] ?? f.custom;
      return /* @__PURE__ */ a(
        "div",
        {
          id: `section-${x.id}`,
          "data-testid": `reader-section-${x.id}`,
          children: [
            /* @__PURE__ */ a(
              "button",
              {
                onClick: () => b(x.id),
                className: e(
                  "border-none cursor-pointer flex items-center gap-2 py-2 px-1.5 rounded-md w-full font-[inherit] text-[13px] text-[#334155] transition-colors duration-100",
                  M ? "bg-[#f8fafc]" : "bg-transparent"
                ),
                children: [
                  /* @__PURE__ */ n(
                    "span",
                    {
                      className: e("text-[10px] transition-transform duration-150 ease-in-out shrink-0", M ? "rotate-90" : "rotate-0"),
                      children: "▶"
                    }
                  ),
                  /* @__PURE__ */ n("span", { className: e("font-semibold flex-1 text-left"), children: x.title }),
                  /* @__PURE__ */ n(
                    "span",
                    {
                      className: e("text-[10px] font-semibold px-2 py-px rounded-full capitalize shrink-0"),
                      style: { background: C.bg, color: C.text },
                      children: x.type
                    }
                  ),
                  w > 0 && /* @__PURE__ */ a("span", { className: e("text-[11px] text-[#64748b] shrink-0"), children: [
                    c,
                    "/",
                    w,
                    " done"
                  ] }),
                  h > 0 && /* @__PURE__ */ a("span", { className: e("text-[11px] text-[#64748b] shrink-0"), children: [
                    h,
                    " comment",
                    h !== 1 ? "s" : ""
                  ] })
                ]
              }
            ),
            M && /* @__PURE__ */ a("div", { className: e("pl-6 pb-2"), children: [
              (() => {
                const v = o?.(x.id);
                return v && l ? /* @__PURE__ */ n("div", { className: e(
                  "py-1 px-2.5 bg-[#f8fafc] rounded border-l-2 border-l-[#cbd5e1]",
                  x.items.length > 0 ? "mb-2" : ""
                ), children: /* @__PURE__ */ n(
                  fe,
                  {
                    fragment: v,
                    ydoc: l,
                    provider: d ?? null,
                    user: { name: "", color: "" },
                    editable: !1
                  }
                ) }) : p ? /* @__PURE__ */ n("div", { className: e(
                  "text-[13px] text-[#334155] leading-relaxed whitespace-pre-wrap py-2 px-2.5 bg-[#f8fafc] rounded border-l-2 border-l-[#cbd5e1]",
                  x.items.length > 0 ? "mb-2" : ""
                ), children: k.trim() }) : null;
              })(),
              x.items.map((v) => /* @__PURE__ */ a(
                "div",
                {
                  className: e("flex items-center gap-1.5 py-[3px] text-xs text-[#64748b]"),
                  children: [
                    /* @__PURE__ */ n("span", { className: e("shrink-0"), children: Ct(v.status) }),
                    /* @__PURE__ */ n(
                      "span",
                      {
                        className: e(
                          v.status === "acked" || v.status === "done" ? "line-through" : ""
                        ),
                        children: v.text
                      }
                    )
                  ]
                },
                v.id
              )),
              g.length > 0 && /* @__PURE__ */ a("div", { className: e("mt-2 pt-1.5 border-t border-[#f1f5f9]"), children: [
                /* @__PURE__ */ a("div", { className: e("text-[11px] font-semibold text-text-tertiary mb-1"), children: [
                  "Comments (",
                  h,
                  ")"
                ] }),
                g.slice(0, 3).map((v) => /* @__PURE__ */ a("div", { className: e("text-xs text-[#64748b] py-0.5 flex gap-1.5"), children: [
                  /* @__PURE__ */ a("span", { className: e("font-semibold text-text-secondary shrink-0"), children: [
                    v.displayName,
                    ":"
                  ] }),
                  /* @__PURE__ */ n("span", { className: e("overflow-hidden text-ellipsis whitespace-nowrap"), children: v.text })
                ] }, v.id)),
                g.length > 3 && /* @__PURE__ */ a("div", { className: e("text-[11px] text-text-tertiary mt-0.5"), children: [
                  "+",
                  g.length - 3,
                  " more"
                ] })
              ] }),
              !p && x.items.length === 0 && g.length === 0 && /* @__PURE__ */ n("div", { className: e("text-xs text-text-tertiary italic"), children: "No content in this section" })
            ] })
          ]
        },
        x.id
      );
    }) })
  ] });
}
function it(t) {
  if (!t) return "";
  try {
    return new Date(t).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  } catch {
    return t;
  }
}
function Nr(t) {
  return t >= 75 ? "#10b981" : t >= 25 ? "#f59e0b" : "#ef4444";
}
const at = {
  editor: "#10b981",
  reviewer: "#f59e0b",
  reader: "#94a3b8"
}, lt = {
  editor: "editing",
  reviewer: "reviewing",
  reader: "reading"
};
function kr({ sections: t }) {
  const r = (s, i) => {
    s.preventDefault();
    const o = document.getElementById(`section-${i}`);
    o && o.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return /* @__PURE__ */ a(
    "aside",
    {
      "data-testid": "reader-toc",
      className: e("sticky top-4 self-start bg-white border border-border rounded-lg p-4 mb-3"),
      children: [
        /* @__PURE__ */ n("h3", { className: e("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Contents" }),
        /* @__PURE__ */ n("nav", { children: /* @__PURE__ */ n("ol", { className: e("list-none m-0 p-0 flex flex-col gap-1"), children: t.map((s, i) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ a(
          "a",
          {
            href: `#section-${s.id}`,
            "data-testid": `toc-link-${s.id}`,
            onClick: (o) => r(o, s.id),
            className: e("block py-1 px-1.5 text-[13px] text-text-secondary no-underline rounded border-l-2 border-l-transparent transition-colors duration-75 hover:bg-[#f1f5f9] hover:border-l-primary"),
            children: [
              /* @__PURE__ */ a("span", { className: e("font-medium text-text-primary"), children: [
                i + 1,
                "."
              ] }),
              " ",
              s.title || `Section ${i + 1}`
            ]
          }
        ) }, s.id)) }) })
      ]
    }
  );
}
function Cr({
  reviewed: t,
  total: r
}) {
  const s = r > 0 ? Math.round(t / r * 100) : 0, i = Nr(s);
  return /* @__PURE__ */ a("div", { className: e("bg-white border border-border rounded-lg p-4 mb-3"), children: [
    /* @__PURE__ */ n("h3", { className: e("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Progress" }),
    /* @__PURE__ */ n("div", { className: e("flex items-baseline gap-1 mb-2"), children: /* @__PURE__ */ a("span", { className: e("text-[28px] font-bold leading-none"), style: { color: i }, children: [
      s,
      "%"
    ] }) }),
    /* @__PURE__ */ n("div", { className: e("h-2 bg-[#e5e7eb] rounded overflow-hidden mb-1.5"), children: /* @__PURE__ */ n(
      "div",
      {
        className: e("h-full rounded transition-[width] duration-300 ease-in-out"),
        style: { width: `${s}%`, background: i }
      }
    ) }),
    /* @__PURE__ */ a("div", { className: e("text-xs text-[#64748b]"), children: [
      t,
      " of ",
      r,
      " items reviewed"
    ] })
  ] });
}
function Sr({ participants: t, meta: r }) {
  const s = /* @__PURE__ */ new Set(), i = [];
  for (const o of t) {
    const l = o.userId || o.clientId;
    s.has(l) || (s.add(l), i.push({ name: o.displayName, color: o.color, mode: o.mode, isOnline: !0 }));
  }
  return r.createdBy && !s.has(r.createdBy) && i.push({ name: r.createdByName || r.createdBy, color: "#6b7280", isOnline: !1 }), /* @__PURE__ */ a("div", { className: e("bg-white border border-border rounded-lg p-4 mb-3"), children: [
    /* @__PURE__ */ n("h3", { className: e("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Contributors" }),
    /* @__PURE__ */ n("div", { className: e("flex flex-wrap gap-1.5 mb-3"), children: i.map((o, l) => {
      const d = o.name.split(" ").map((m) => m[0] ?? "").join("").toUpperCase().slice(0, 2);
      return /* @__PURE__ */ a("div", { title: `${o.name}${o.mode ? ` (${lt[o.mode] ?? o.mode})` : ""}`, className: e("relative"), children: [
        /* @__PURE__ */ n(
          "div",
          {
            className: e("w-8 h-8 rounded-full text-white flex items-center justify-center text-[11px] font-bold"),
            style: { background: o.color },
            children: d
          }
        ),
        o.isOnline && /* @__PURE__ */ n(
          "div",
          {
            className: e("absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white"),
            style: { background: at[o.mode ?? "reader"] ?? "#94a3b8" }
          }
        )
      ] }, `${o.name}-${l}`);
    }) }),
    /* @__PURE__ */ n("div", { className: e("flex flex-col gap-1.5"), children: i.map((o, l) => /* @__PURE__ */ a("div", { className: e("flex items-center gap-2 text-[13px]"), children: [
      /* @__PURE__ */ n(
        "span",
        {
          className: e("w-2 h-2 rounded-full shrink-0"),
          style: { background: o.isOnline ? at[o.mode ?? "reader"] ?? "#94a3b8" : "#d1d5db" }
        }
      ),
      /* @__PURE__ */ n("span", { className: e("font-medium text-[#334155] flex-1"), children: o.name }),
      /* @__PURE__ */ n("span", { className: e("text-[11px] text-text-tertiary"), children: o.isOnline ? lt[o.mode ?? ""] ?? "online" : "offline" })
    ] }, `detail-${o.name}-${l}`)) })
  ] });
}
function Ir({
  sections: t,
  allItems: r,
  completedCount: s,
  commentCounts: i,
  meta: o
}) {
  const l = i ? Object.values(i).reduce((d, m) => d + m, 0) : 0;
  return /* @__PURE__ */ a("div", { className: e("bg-white border border-border rounded-lg p-4 mb-3"), children: [
    /* @__PURE__ */ n("h3", { className: e("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Document Info" }),
    /* @__PURE__ */ a("div", { className: e("flex justify-between py-1 text-[13px] text-[#334155] border-b border-[#f1f5f9]"), children: [
      /* @__PURE__ */ n("span", { className: e("text-[#64748b]"), children: "Sections" }),
      /* @__PURE__ */ n("span", { className: e("font-semibold"), children: t.length })
    ] }),
    /* @__PURE__ */ a("div", { className: e("flex justify-between py-1 text-[13px] text-[#334155] border-b border-[#f1f5f9]"), children: [
      /* @__PURE__ */ n("span", { className: e("text-[#64748b]"), children: "Total tasks" }),
      /* @__PURE__ */ n("span", { className: e("font-semibold"), children: r.length })
    ] }),
    /* @__PURE__ */ a("div", { className: e("flex justify-between py-1 text-[13px] text-[#334155] border-b border-[#f1f5f9]"), children: [
      /* @__PURE__ */ n("span", { className: e("text-[#64748b]"), children: "Completed" }),
      /* @__PURE__ */ n("span", { className: e("font-semibold text-[#10b981]"), children: s })
    ] }),
    l > 0 && /* @__PURE__ */ a("div", { className: e("flex justify-between py-1 text-[13px] text-[#334155] border-b border-[#f1f5f9]"), children: [
      /* @__PURE__ */ n("span", { className: e("text-[#64748b]"), children: "Comments" }),
      /* @__PURE__ */ n("span", { className: e("font-semibold"), children: l })
    ] }),
    o.createdAt && /* @__PURE__ */ a("div", { className: e("flex justify-between py-1 text-[13px] text-[#334155] border-b border-[#f1f5f9]"), children: [
      /* @__PURE__ */ n("span", { className: e("text-[#64748b]"), children: "Created" }),
      /* @__PURE__ */ n("span", { className: e("font-medium text-xs"), children: it(o.createdAt) })
    ] }),
    o.updatedAt && /* @__PURE__ */ a("div", { className: e("flex justify-between py-1 text-[13px] text-[#334155]"), children: [
      /* @__PURE__ */ n("span", { className: e("text-[#64748b]"), children: "Last changed" }),
      /* @__PURE__ */ n("span", { className: e("font-medium text-xs"), children: it(o.updatedAt) })
    ] })
  ] });
}
function Tr({
  sections: t,
  participants: r,
  meta: s,
  commentCounts: i,
  sectionContentTexts: o,
  comments: l,
  getSectionFragment: d,
  ydoc: m,
  provider: u
}) {
  const b = t.flatMap((h) => h.items), f = b.filter((h) => h.status !== "pending").length, x = b.filter(
    (h) => h.status === "acked" || h.status === "done"
  ).length, c = xr(b, t), w = t.length >= 2;
  return /* @__PURE__ */ a(
    "div",
    {
      className: e("grid gap-4 mx-auto", w ? "[grid-template-columns:200px_1fr_280px] max-w-[1300px]" : "[grid-template-columns:1fr_280px] max-w-[1100px]"),
      children: [
        /* @__PURE__ */ n(hr, { meta: s, participantCount: r.length }),
        w && /* @__PURE__ */ n(kr, { sections: t }),
        /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ n(
            br,
            {
              bullets: c,
              contentText: (() => {
                const h = t.find((k) => k.type === "summary");
                return h ? o?.[h.id] : void 0;
              })(),
              fragment: (() => {
                const h = t.find((k) => k.type === "summary");
                return h ? d?.(h.id) : null;
              })(),
              ydoc: m,
              provider: u
            }
          ),
          /* @__PURE__ */ n(yr, { sections: t }),
          /* @__PURE__ */ n(wr, { allItems: b }),
          /* @__PURE__ */ n(
            vr,
            {
              sections: t,
              commentCounts: i,
              sectionContentTexts: o,
              comments: l,
              getSectionFragment: d,
              ydoc: m,
              provider: u
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ n(Cr, { reviewed: f, total: b.length }),
          /* @__PURE__ */ n(Sr, { participants: r, meta: s }),
          /* @__PURE__ */ n(
            Ir,
            {
              sections: t,
              allItems: b,
              completedCount: x,
              commentCounts: i,
              meta: s
            }
          )
        ] })
      ]
    }
  );
}
function Mr({
  mode: t,
  isEmpty: r,
  isFinalized: s,
  sections: i,
  documentId: o,
  displayName: l,
  color: d,
  userId: m,
  ydoc: u,
  provider: b,
  getSectionFragment: f,
  updateSection: x,
  participants: c,
  focusedSectionId: w,
  onSectionFocus: h,
  comments: k,
  onAddComment: g,
  onResolveThread: M,
  onUnresolveThread: p,
  onUpdateCursorInfo: C,
  onOpenComments: v,
  onAddItem: R,
  onUpdateItem: j,
  onRemoveItem: S,
  restItems: D,
  commentSidebarOpen: I,
  commentSectionId: y,
  commentSidebarTop: _,
  sectionListRef: W,
  onCloseComments: Y,
  showVideoCall: ee,
  isVideoDocked: xe,
  showInlineVideo: he,
  sidebarFixed: le,
  videoSpacerRef: Z,
  videoLeft: de,
  FIXED_TOP: G,
  showTOC: te,
  sectionReviews: ce,
  reviewSection: be,
  headerMeta: se,
  onLoadDemo: ge,
  activityPublish: ye
}) {
  return /* @__PURE__ */ a(F, { children: [
    s && t === "editor" && /* @__PURE__ */ n("div", { className: e(
      "rounded-lg border px-4 py-2.5 mb-3 text-center text-[13px] font-medium",
      "bg-[#fefce8] border-[#fde68a] text-[#92400e]"
    ), children: "This document has been finalized and is read-only" }),
    r && /* @__PURE__ */ a("div", { className: "text-center py-12 px-4 text-text-secondary", children: [
      /* @__PURE__ */ n("p", { className: "text-lg mb-4", children: "No document content yet." }),
      /* @__PURE__ */ n(
        "button",
        {
          onClick: ge,
          className: e(
            "px-6 py-2.5 text-[15px] font-semibold border-none rounded-lg",
            "bg-primary text-white cursor-pointer font-[inherit]"
          ),
          children: "Load Demo Document"
        }
      ),
      /* @__PURE__ */ n("p", { className: "text-[13px] mt-3 text-text-tertiary", children: "Loads a sample Q2 Sprint Planning document with tasks, decisions, and notes." })
    ] }),
    !r && t === "editor" && u && /* @__PURE__ */ a("div", { ref: W, className: "flex gap-4 relative min-w-0", children: [
      ee && !xe && he && /* @__PURE__ */ n("div", { ref: Z, className: "w-[240px] shrink-0", children: /* @__PURE__ */ n(
        "div",
        {
          id: "inline-video-slot",
          className: e(le && "fixed z-30"),
          style: le ? { top: G, left: de, width: 240 } : void 0
        }
      ) }),
      /* @__PURE__ */ a(
        "div",
        {
          className: e("flex-1 min-w-0", I ? "pr-0" : te && i.length > 1 && t === "editor" ? "pr-48" : "pr-12"),
          children: [
            /* @__PURE__ */ n(
              nr,
              {
                sections: i.map((E) => {
                  const z = E.items ?? [], U = D[E.id] ?? [], P = [
                    ...z,
                    ...U.filter((J) => !z.some((K) => K.id === J.id))
                  ];
                  return { ...E, items: P };
                }),
                getSectionFragment: f,
                ydoc: u,
                provider: b,
                user: { name: l, color: d },
                editable: !s,
                onUpdateSection: x,
                onAddItem: R,
                onUpdateItem: j,
                onRemoveItem: S,
                participants: c,
                onSectionFocus: h,
                focusedSectionId: w,
                comments: k,
                onAddComment: g,
                onResolveThread: M,
                onUnresolveThread: p,
                onUpdateCursorInfo: C,
                onOpenComments: v
              }
            ),
            /* @__PURE__ */ n(lr, { documentId: o, editable: !s })
          ]
        }
      ),
      I && y && /* @__PURE__ */ a(
        "div",
        {
          className: e(
            "w-[420px] shrink-0 rounded-lg border border-border",
            "bg-[#fafbfc] flex flex-col max-h-[calc(100vh-180px)] overflow-hidden"
          ),
          style: { marginTop: _ },
          children: [
            /* @__PURE__ */ a("div", { className: "flex items-center justify-between px-3.5 py-3 border-b border-border shrink-0", children: [
              /* @__PURE__ */ n("div", { className: "text-[13px] font-semibold text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap flex-1 mr-2", children: i.find((E) => E.id === y)?.title ?? "Comments" }),
              /* @__PURE__ */ n(
                "button",
                {
                  type: "button",
                  onClick: Y,
                  className: e(
                    "border-none bg-transparent cursor-pointer",
                    "text-base text-[#64748b] px-1.5 py-0.5 rounded leading-none shrink-0"
                  ),
                  title: "Close comments",
                  children: "✕"
                }
              )
            ] }),
            /* @__PURE__ */ n("div", { className: "flex-1 overflow-y-auto px-3 py-3.5", children: /* @__PURE__ */ n(
              _e,
              {
                comments: k[y] ?? [],
                onAddComment: (E, z) => g(y, E, z),
                participants: c,
                onResolveThread: (E) => M(y, E),
                onUnresolveThread: (E) => p(y, E)
              }
            ) })
          ]
        }
      )
    ] }),
    !r && t === "ack" && u && /* @__PURE__ */ n(
      pr,
      {
        sections: i,
        participants: c,
        userId: m,
        getSectionFragment: f,
        ydoc: u,
        provider: b,
        sectionReviews: ce,
        reviewSection: (E, z, U) => {
          be(E, z, U);
          const P = i.find((J) => J.id === E);
          ye(`doc.review_${z}`, {
            sectionTitle: P?.title,
            status: z,
            documentId: o,
            documentTitle: se?.title
          });
        },
        comments: k,
        onAddComment: g,
        onResolveThread: M,
        onUnresolveThread: p,
        onSectionFocus: h
      }
    ),
    !r && t === "reader" && u && /* @__PURE__ */ n(
      Tr,
      {
        sections: i,
        participants: c,
        meta: se,
        commentCounts: Object.fromEntries(
          Object.entries(k).map(([E, z]) => [E, z.length])
        ),
        sectionContentTexts: Object.fromEntries(
          i.map((E) => {
            const z = f(E.id);
            return [E.id, z ? En(z) : ""];
          })
        ),
        comments: k,
        getSectionFragment: f,
        ydoc: u,
        provider: b
      }
    )
  ] });
}
function $r(t, r) {
  const s = new Map(t.map((l) => [l.id, l])), i = new Map(r.map((l) => [l.id, l])), o = [];
  for (const l of t) {
    const d = i.get(l.id);
    if (!d)
      o.push({ status: "removed", oldItem: l, changes: [] });
    else {
      const m = [];
      l.text !== d.text && m.push("text"), l.status !== d.status && m.push(`status: ${l.status} -> ${d.status}`), l.assignee !== d.assignee && m.push(`assignee: "${l.assignee}" -> "${d.assignee}"`), l.priority !== d.priority && m.push(`priority: ${l.priority} -> ${d.priority}`), m.length > 0 ? o.push({ status: "modified", oldItem: l, newItem: d, changes: m }) : o.push({ status: "unchanged", oldItem: l, newItem: d, changes: [] });
    }
  }
  for (const l of r)
    s.has(l.id) || o.push({ status: "added", newItem: l, changes: [] });
  return o;
}
function Dr(t, r) {
  const s = new Map(t.map((l) => [l.id, l])), i = new Map(r.map((l) => [l.id, l])), o = [];
  for (const l of t) {
    const d = i.get(l.id);
    if (!d)
      o.push({
        status: "removed",
        id: l.id,
        oldTitle: l.title,
        titleChanged: !1,
        itemDiffs: l.items.map((m) => ({ status: "removed", oldItem: m, changes: [] }))
      });
    else {
      const m = l.title !== d.title, u = (l.textContent || "") !== (d.textContent || ""), b = $r(l.items, d.items), f = m || u || b.some((x) => x.status !== "unchanged");
      o.push({
        status: f ? "modified" : "unchanged",
        id: l.id,
        oldTitle: l.title,
        newTitle: d.title,
        titleChanged: m,
        textChanged: u,
        oldTextContent: l.textContent,
        newTextContent: d.textContent,
        itemDiffs: b
      });
    }
  }
  for (const l of r)
    s.has(l.id) || o.push({
      status: "added",
      id: l.id,
      newTitle: l.title,
      titleChanged: !1,
      itemDiffs: l.items.map((d) => ({ status: "added", newItem: d, changes: [] }))
    });
  return o;
}
const jr = {
  added: "bg-[#dcfce7] border-[#86efac]",
  removed: "bg-[#fee2e2] border-[#fca5a5]",
  modified: "bg-[#fef9c3] border-[#fde047]",
  unchanged: "bg-transparent border-[#e5e7eb]"
};
function Rr(t) {
  return t === "added" ? "text-[#166534] bg-[#bbf7d0]" : t === "removed" ? "text-[#991b1b] bg-[#fecaca]" : t === "modified" ? "text-[#854d0e] bg-[#fef08a]" : "text-[#6b7280] bg-[#f3f4f6]";
}
function Ar(t) {
  return t === "added" ? "bg-[#dcfce7] text-[#166534]" : t === "removed" ? "bg-[#fee2e2] text-[#991b1b] line-through" : t === "modified" ? "bg-[#fef9c3] text-[#854d0e]" : "bg-transparent text-[#374151]";
}
function Lr({ oldSections: t, newSections: r, onClose: s }) {
  const i = Dr(t, r), o = i.some((l) => l.status !== "unchanged");
  return /* @__PURE__ */ a("div", { className: e("border-t border-[#e5e7eb] bg-[#fafbfc] max-h-[400px] overflow-auto px-4 py-3"), children: [
    /* @__PURE__ */ a("div", { className: e("flex items-center justify-between mb-2"), children: [
      /* @__PURE__ */ n("h4", { className: e("text-[13px] font-semibold text-[#374151] m-0"), children: "Changes from selected version to current" }),
      /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          className: e("px-2 py-0.5 text-xs border border-[#d1d5db] rounded bg-white text-[#6b7280] cursor-pointer font-[inherit]"),
          onClick: s,
          children: "Dismiss"
        }
      )
    ] }),
    !o && /* @__PURE__ */ n("div", { className: e("text-[13px] text-[#9ca3af] text-center p-4"), children: "No differences found. The documents are identical." }),
    i.filter((l) => l.status !== "unchanged").map((l) => /* @__PURE__ */ a("div", { className: e("border rounded-md p-2 px-2.5 mb-1.5", jr[l.status]), children: [
      /* @__PURE__ */ a("div", { className: e("flex items-center gap-2 mb-1"), children: [
        /* @__PURE__ */ n("span", { className: e("text-[10px] font-semibold uppercase px-1.5 py-px rounded-sm", Rr(l.status)), children: l.status }),
        /* @__PURE__ */ n("span", { className: e("text-[13px] font-semibold text-[#1f2937]"), children: l.status === "removed" ? l.oldTitle : l.newTitle ?? l.oldTitle }),
        l.titleChanged && /* @__PURE__ */ a("span", { className: e("text-[11px] text-[#92400e]"), children: [
          '(was: "',
          l.oldTitle,
          '")'
        ] })
      ] }),
      l.itemDiffs.filter((d) => d.status !== "unchanged").map((d, m) => {
        const u = d.newItem ?? d.oldItem;
        return /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ a("div", { className: e("text-xs px-2 py-0.5 rounded-sm mt-0.5", Ar(d.status)), children: [
            d.status === "added" && "+ ",
            d.status === "removed" && "- ",
            d.status === "modified" && "~ ",
            u?.text ?? "(untitled)",
            u?.assignee ? ` [${u.assignee}]` : ""
          ] }),
          d.changes.length > 0 && /* @__PURE__ */ n("div", { className: e("text-[11px] text-[#92400e] ml-4 italic"), children: d.changes.join(", ") })
        ] }, u?.id ?? m);
      }),
      l.textChanged && /* @__PURE__ */ a("div", { className: e("mt-1 text-xs"), children: [
        l.oldTextContent && /* @__PURE__ */ a("div", { className: e("px-2 py-1 rounded-sm bg-[#fee2e2] text-[#991b1b] line-through mb-0.5"), children: [
          l.oldTextContent.substring(0, 200),
          (l.oldTextContent?.length ?? 0) > 200 ? "..." : ""
        ] }),
        l.newTextContent && /* @__PURE__ */ a("div", { className: e("px-2 py-1 rounded-sm bg-[#dcfce7] text-[#166534]"), children: [
          l.newTextContent.substring(0, 200),
          (l.newTextContent?.length ?? 0) > 200 ? "..." : ""
        ] })
      ] }),
      l.status === "modified" && !l.textChanged && l.itemDiffs.every((d) => d.status === "unchanged") && l.titleChanged && /* @__PURE__ */ n("div", { className: e("text-xs text-[#6b7280] mt-0.5"), children: "Only the section title changed." })
    ] }, l.id))
  ] });
}
function Er(t) {
  const r = Math.floor(t / 1e3);
  if (r < 60) return `${r}s ago`;
  const s = Math.floor(r / 60);
  if (s < 60) return `${s} min ago`;
  const i = Math.floor(s / 60);
  if (i < 24) return `${i} hour${i !== 1 ? "s" : ""} ago`;
  const o = Math.floor(i / 24);
  if (o < 30) return `${o} day${o !== 1 ? "s" : ""} ago`;
  const l = Math.floor(o / 30);
  return `${l} month${l !== 1 ? "s" : ""} ago`;
}
function _r({
  versions: t,
  loading: r,
  previewTimestamp: s,
  onFetch: i,
  onPreview: o,
  onClearPreview: l,
  onClose: d,
  onSaveVersion: m,
  onCompare: u,
  onClearCompare: b,
  compareSections: f,
  compareTimestamp: x,
  currentSections: c,
  onRestore: w
}) {
  const h = () => {
    l(), b(), d();
  }, k = () => {
    const p = window.prompt("Enter a name for this version:");
    p && p.trim() && m(p.trim());
  }, g = (p, C) => {
    p.stopPropagation(), x === C ? b() : u(C);
  }, M = (p) => p.type === "pre-restore" ? "Before restore" : p.type === "auto" ? "Auto-save" : "";
  return /* @__PURE__ */ a(Ae, { width: 320, children: [
    /* @__PURE__ */ n(
      Le,
      {
        title: "Version History",
        onClose: h,
        actions: /* @__PURE__ */ n(Q, { size: "sm", onClick: k, children: "Save Version" })
      }
    ),
    /* @__PURE__ */ a(Ee, { padding: "0.5rem 0", children: [
      r && /* @__PURE__ */ n("div", { className: e("py-8 px-4 text-center text-text-tertiary text-[13px]"), children: "Loading..." }),
      !r && t.length === 0 && /* @__PURE__ */ n("div", { className: e("py-8 px-4 text-center text-text-tertiary text-[13px]"), children: "No saved versions yet" }),
      !r && t.map((p) => /* @__PURE__ */ a(
        "div",
        {
          className: e(
            "flex items-center justify-between py-2.5 px-4 cursor-pointer text-[13px] text-text-primary",
            s === p.timestamp ? "bg-[#eff6ff] border-l-[3px] border-l-[#3b82f6]" : "bg-transparent border-l-[3px] border-l-transparent"
          ),
          onClick: () => o(p.timestamp),
          children: [
            /* @__PURE__ */ a("div", { className: e("flex-1 min-w-0"), children: [
              p.name && /* @__PURE__ */ n("span", { className: e("text-xs font-semibold text-[#1f2937] block mb-px"), children: p.name }),
              /* @__PURE__ */ a("span", { className: e("flex items-center gap-1"), children: [
                Er(p.age),
                p.type && p.type !== "manual" && /* @__PURE__ */ n(
                  "span",
                  {
                    className: e(
                      "text-[10px] font-medium px-[5px] py-px rounded-[3px] ml-1.5",
                      p.type === "pre-restore" ? "bg-[#fef3c7] text-[#92400e]" : p.type === "auto" ? "bg-[#f3f4f6] text-text-tertiary" : "bg-[#e0f2fe] text-[#0369a1]"
                    ),
                    children: M(p)
                  }
                )
              ] }),
              p.author && /* @__PURE__ */ a("span", { className: e("text-[10px] text-text-tertiary block"), children: [
                "by ",
                p.author
              ] }),
              /* @__PURE__ */ n("span", { className: e("text-[11px] text-text-tertiary"), children: new Date(p.timestamp).toLocaleString() })
            ] }),
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: e(
                  "px-2 py-[3px] text-[11px] font-medium border rounded-[4px] cursor-pointer font-[inherit] whitespace-nowrap",
                  x === p.timestamp ? "bg-[#eff6ff] border-[#3b82f6] text-[#3b82f6]" : "bg-white border-border text-[#6b7280]"
                ),
                onClick: (C) => g(C, p.timestamp),
                children: x === p.timestamp ? "Hide Diff" : "Compare"
              }
            )
          ]
        },
        p.timestamp
      ))
    ] }),
    f != null && /* @__PURE__ */ n(
      Lr,
      {
        oldSections: f,
        newSections: c,
        onClose: b
      }
    ),
    w && x != null && /* @__PURE__ */ a("div", { className: e("py-3 px-4 border-t border-border shrink-0"), children: [
      /* @__PURE__ */ n(
        Q,
        {
          variant: "primary",
          onClick: () => {
            window.confirm(
              `Restore this version?

A checkpoint of the current state will be saved first. All connected users will see the restored content. Comments and reviews added after this version may be lost.`
            ) && (w(x), b());
          },
          className: "w-full px-4 py-2.5 text-sm font-semibold rounded-lg",
          children: "Restore this version"
        }
      ),
      /* @__PURE__ */ n("div", { className: e("text-[11px] text-text-tertiary text-center mt-1.5"), children: "A pre-restore checkpoint will be saved automatically" })
    ] })
  ] });
}
function Or(t) {
  const r = typeof t == "number" ? t : Date.now() - new Date(t).getTime(), s = Math.floor(r / 1e3);
  if (s < 60) return `${s}s ago`;
  const i = Math.floor(s / 60);
  if (i < 60) return `${i} min ago`;
  const o = Math.floor(i / 60);
  if (o < 24) return `${o} hour${o !== 1 ? "s" : ""} ago`;
  const l = Math.floor(o / 24);
  if (l < 30) return `${l} day${l !== 1 ? "s" : ""} ago`;
  const d = Math.floor(l / 30);
  return `${d} month${d !== 1 ? "s" : ""} ago`;
}
function Br(t) {
  return t.split(/\s+/).map((r) => r[0]).join("").toUpperCase().slice(0, 2);
}
function Ur({
  item: t,
  onClick: r,
  onDismiss: s
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: e("flex gap-2.5 py-2.5 px-4 cursor-pointer border-b border-[#f3f4f6] items-start hover:bg-[#f9fafb]"),
      onClick: r,
      children: [
        /* @__PURE__ */ n(
          "div",
          {
            className: e("w-7 h-7 rounded-full text-white text-[11px] font-semibold flex items-center justify-center shrink-0"),
            style: { background: t.authorColor },
            children: Br(t.authorName)
          }
        ),
        /* @__PURE__ */ a("div", { className: e("flex-1 min-w-0"), children: [
          /* @__PURE__ */ n("div", { className: e("text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"), children: t.commentText }),
          /* @__PURE__ */ n("div", { className: e("text-[11px] text-text-tertiary mt-0.5"), children: t.sectionTitle })
        ] }),
        /* @__PURE__ */ n("div", { className: e("text-[11px] text-text-tertiary shrink-0 mt-0.5"), children: Or(t.timestamp) }),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: (i) => {
              i.stopPropagation(), s();
            },
            "aria-label": "Dismiss mention",
            className: e("px-1.5 py-0.5 text-[13px] text-text-tertiary bg-transparent border-none cursor-pointer leading-none shrink-0"),
            children: "x"
          }
        )
      ]
    }
  );
}
function Pr({
  item: t,
  onClick: r,
  onDismiss: s
}) {
  const i = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#22c55e"
  }, o = {
    pending: { bg: "#fef3c7", text: "#92400e" },
    acked: { bg: "#dbeafe", text: "#1e40af" },
    done: { bg: "#d1fae5", text: "#065f46" },
    rejected: { bg: "#fee2e2", text: "#991b1b" }
  }, l = o[t.status] ?? o.pending;
  return /* @__PURE__ */ a(
    "div",
    {
      className: e("flex gap-2.5 py-2.5 px-4 cursor-pointer border-b border-[#f3f4f6] items-start hover:bg-[#f9fafb]"),
      onClick: r,
      children: [
        /* @__PURE__ */ n(
          "div",
          {
            className: e("w-2 h-2 rounded-full shrink-0 mt-1"),
            style: { background: i[t.priority] ?? "#94a3b8" }
          }
        ),
        /* @__PURE__ */ a("div", { className: e("flex-1 min-w-0"), children: [
          /* @__PURE__ */ a("div", { className: e("text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"), children: [
            t.taskText,
            /* @__PURE__ */ n(
              "span",
              {
                className: e("inline-block text-[10px] font-semibold px-1.5 py-px rounded-full ml-1.5"),
                style: { background: l.bg, color: l.text },
                children: t.status
              }
            )
          ] }),
          /* @__PURE__ */ n("div", { className: e("text-[11px] text-text-tertiary mt-0.5"), children: t.sectionTitle })
        ] }),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: (d) => {
              d.stopPropagation(), s();
            },
            "aria-label": "Dismiss task",
            className: e("px-1.5 py-0.5 text-[13px] text-text-tertiary bg-transparent border-none cursor-pointer leading-none shrink-0"),
            children: "x"
          }
        )
      ]
    }
  );
}
function Vr({
  items: t,
  onNavigateToSection: r,
  onClose: s
}) {
  const [i, o] = T("all"), [l, d] = T(/* @__PURE__ */ new Set()), m = (f) => {
    d((x) => {
      const c = new Set(x);
      return c.add(f), c;
    });
  }, u = () => {
    const f = b.map((x) => x.kind === "mention" ? x.commentId : x.itemId);
    d((x) => {
      const c = new Set(x);
      return f.forEach((w) => c.add(w)), c;
    });
  }, b = t.filter((f) => {
    const x = f.kind === "mention" ? f.commentId : f.itemId;
    return l.has(x) ? !1 : i === "all" ? !0 : i === "mentions" ? f.kind === "mention" : f.kind === "task";
  });
  return /* @__PURE__ */ a(Ae, { width: 340, children: [
    /* @__PURE__ */ n(
      Le,
      {
        title: "My Mentions & Tasks",
        onClose: s,
        actions: b.length > 0 ? /* @__PURE__ */ n(Q, { variant: "default", size: "sm", onClick: u, children: "Clear all" }) : void 0
      }
    ),
    /* @__PURE__ */ n("div", { className: e("flex gap-0 border-b border-border shrink-0"), children: ["all", "mentions", "tasks"].map((f) => /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        className: e(
          "flex-1 py-2 text-[13px] bg-transparent border-none cursor-pointer font-[inherit]",
          i === f ? "font-semibold text-primary border-b-2 border-b-primary" : "font-normal text-text-secondary border-b-2 border-b-transparent"
        ),
        onClick: () => o(f),
        children: f === "all" ? "All" : f === "mentions" ? "Mentions" : "Tasks"
      },
      f
    )) }),
    /* @__PURE__ */ a(Ee, { padding: "0.5rem 0", children: [
      b.length === 0 && /* @__PURE__ */ n("div", { className: e("py-8 px-4 text-center text-text-tertiary text-[13px]"), children: "No mentions or tasks for you" }),
      b.map(
        (f) => f.kind === "mention" ? /* @__PURE__ */ n(
          Ur,
          {
            item: f,
            onClick: () => r(f.sectionId),
            onDismiss: () => m(f.commentId)
          },
          f.commentId
        ) : /* @__PURE__ */ n(
          Pr,
          {
            item: f,
            onClick: () => r(f.sectionId),
            onDismiss: () => m(f.itemId)
          },
          f.itemId
        )
      )
    ] })
  ] });
}
function Fr(t, r) {
  const s = new Date(t).getTime(), o = (r ? new Date(r).getTime() : Date.now()) - s, l = Math.floor(o / 6e4);
  return l < 1 ? "<1m" : l < 60 ? `${l}m` : `${Math.floor(l / 60)}h ${l % 60}m`;
}
function zr(t) {
  const r = Date.now() - new Date(t).getTime(), s = Math.floor(r / 6e4);
  if (s < 1) return "just now";
  if (s < 60) return `${s}m ago`;
  const i = Math.floor(s / 60);
  return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
}
function Hr({ sessions: t, loading: r, onFetch: s, onClose: i }) {
  O(() => {
    s();
  }, [s]);
  const o = t.filter((d) => d.status === "ended"), l = t.filter((d) => d.status === "active");
  return /* @__PURE__ */ a(Ae, { width: 340, children: [
    /* @__PURE__ */ n(Le, { title: "Past Conversations", onClose: i }),
    /* @__PURE__ */ a(Ee, { padding: "12px", children: [
      r && /* @__PURE__ */ n("div", { className: e("text-center text-text-tertiary text-[13px] py-6"), children: "Loading..." }),
      !r && t.length === 0 && /* @__PURE__ */ n("div", { className: e("text-center text-text-tertiary text-[13px] py-6"), children: "No video conversations yet for this document." }),
      l.map((d) => /* @__PURE__ */ n(dt, { session: d, isActive: !0 }, d.sessionId)),
      o.map((d) => /* @__PURE__ */ n(dt, { session: d }, d.sessionId))
    ] })
  ] });
}
function dt({ session: t, isActive: r }) {
  return /* @__PURE__ */ a("div", { className: e(
    "rounded-lg p-3 mb-2",
    r ? "border border-[#10b981] bg-[rgba(16,185,129,0.04)]" : "border border-border bg-white"
  ), children: [
    /* @__PURE__ */ a("div", { className: e("flex justify-between items-center mb-1"), children: [
      /* @__PURE__ */ n("span", { className: e("text-[11px] text-text-tertiary"), children: zr(t.startedAt) }),
      /* @__PURE__ */ a("div", { className: e("flex items-center gap-1"), children: [
        r && /* @__PURE__ */ n("span", { className: e("text-[11px] font-semibold text-[#10b981] bg-[rgba(16,185,129,0.1)] px-1.5 py-px rounded-full"), children: "Live" }),
        /* @__PURE__ */ n("span", { className: e("text-[11px] text-text-secondary"), children: Fr(t.startedAt, t.endedAt) })
      ] })
    ] }),
    /* @__PURE__ */ n("div", { className: e("flex flex-wrap gap-1 mb-2"), children: t.participants.map((s, i) => /* @__PURE__ */ n("span", { className: e("text-[11px] text-text-secondary bg-[#f8fafc] px-2 py-0.5 rounded-full"), children: s.displayName || s.userId.slice(0, 10) }, `${s.userId}-${i}`)) }),
    t.aiSummary && /* @__PURE__ */ n("div", { className: e("text-[11px] text-text-primary bg-[#f8fafc] p-2 rounded-md leading-normal"), children: t.aiSummary }),
    t.transcriptStatus && t.transcriptStatus !== "available" && /* @__PURE__ */ a("div", { className: e("text-[11px] text-text-tertiary mt-1"), children: [
      "Transcript: ",
      t.transcriptStatus
    ] })
  ] });
}
function Wr({ sections: t, focusedSectionId: r }) {
  const [s, i] = T(null);
  O(() => {
    if (t.length === 0) return;
    const u = new IntersectionObserver(
      (b) => {
        let f = null;
        for (const x of b)
          x.isIntersecting && (!f || x.intersectionRatio > f.intersectionRatio) && (f = x);
        if (f) {
          const x = f.target.id.replace("section-", "");
          i(x);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-80px 0px -40% 0px" }
    );
    for (const b of t) {
      const f = document.getElementById(`section-${b.id}`);
      f && u.observe(f);
    }
    return () => u.disconnect();
  }, [t]);
  const o = s || r, l = L((u) => {
    const b = document.getElementById(`section-${u}`);
    b && b.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []), d = t.filter((u, b, f) => f.findIndex((x) => x.id === u.id) === b);
  if (d.length === 0) return null;
  const m = d.findIndex((u) => u.id === o);
  return /* @__PURE__ */ a("div", { className: e("flex flex-col gap-0 text-[11px] w-[140px] max-h-[calc(100vh-160px)] overflow-y-auto"), children: [
    /* @__PURE__ */ n("div", { className: e("text-[10px] font-semibold text-text-tertiary uppercase tracking-wide mb-1.5"), children: "Contents" }),
    d.map((u, b) => {
      const f = u.id === o, x = m >= 0 && b < m;
      return /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          onClick: () => l(u.id),
          className: e("flex items-center gap-2 py-1 border-none bg-transparent cursor-pointer text-left font-[inherit]"),
          children: [
            /* @__PURE__ */ n("div", { className: e("flex flex-col items-center w-3 shrink-0"), children: /* @__PURE__ */ n(
              "div",
              {
                className: e(
                  "rounded-full transition-all duration-200",
                  f ? "w-2 h-2 bg-[#3b82f6] shadow-[0_0_0_3px_rgba(59,130,246,0.2)]" : x ? "w-1.5 h-1.5 bg-[#94a3b8]" : "w-1.5 h-1.5 bg-[#d1d5db]"
                )
              }
            ) }),
            /* @__PURE__ */ n("span", { className: e(
              "text-[11px] overflow-hidden text-ellipsis whitespace-nowrap transition-colors duration-200",
              f ? "font-semibold text-[#1e293b]" : x ? "font-normal text-[#64748b]" : "font-normal text-text-tertiary"
            ), children: u.title || "Untitled" })
          ]
        },
        u.id
      );
    }),
    m >= 0 && /* @__PURE__ */ a("div", { className: e("text-[10px] text-text-tertiary mt-2"), children: [
      m + 1,
      " / ",
      d.length
    ] })
  ] });
}
function qr({
  showHistory: t,
  showMyItems: r,
  showVideoHistory: s,
  closePanel: i,
  versionHistory: o,
  ydoc: l,
  myItems: d,
  onNavigateToSection: m,
  videoSessions: u,
  showTOC: b,
  commentSidebarOpen: f,
  sections: x,
  focusedSectionId: c,
  mode: w
}) {
  return /* @__PURE__ */ a(F, { children: [
    t && /* @__PURE__ */ n(
      _r,
      {
        versions: o.versions,
        loading: o.loading,
        previewTimestamp: o.previewTimestamp,
        onFetch: o.fetchVersions,
        onPreview: o.previewVersion,
        onClearPreview: o.clearPreview,
        onClose: i,
        onSaveVersion: o.saveVersion,
        onCompare: o.compareVersion,
        onClearCompare: o.clearCompare,
        compareSections: o.compareSections,
        compareTimestamp: o.compareTimestamp,
        currentSections: l ? o.extractSections(l) : [],
        onRestore: o.restoreVersion
      }
    ),
    r && /* @__PURE__ */ n(
      Vr,
      {
        items: d,
        onNavigateToSection: m,
        onClose: i
      }
    ),
    s && /* @__PURE__ */ n(
      Hr,
      {
        sessions: u.sessions,
        loading: u.loading,
        onFetch: u.fetchSessions,
        onClose: i
      }
    ),
    b && !f && x.length > 1 && w === "editor" && /* @__PURE__ */ n("div", { className: e(
      "fixed bottom-4 right-4 w-40 max-h-[280px] overflow-y-auto",
      "bg-white border border-border rounded-[10px] px-3 py-2.5",
      "shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-30"
    ), children: /* @__PURE__ */ n(
      Wr,
      {
        sections: x.map((h) => ({ id: h.id, title: h.title })),
        focusedSectionId: c
      }
    ) })
  ] });
}
function yo({
  documentId: t,
  documentType: r,
  ws: s,
  userId: i,
  displayName: o,
  color: l = "#3b82f6",
  onMessage: d,
  activityPublish: m,
  onBack: u,
  isVideoDocked: b,
  onDockVideo: f,
  onUndockVideo: x
}) {
  const c = _n({
    documentId: t,
    documentType: r,
    ws: s,
    userId: i,
    displayName: o,
    color: l,
    onMessage: d,
    activityPublish: m,
    isVideoDocked: b,
    onDockVideo: f,
    onUndockVideo: x,
    onBack: u
  }), w = c.sections.length === 0 && !c.demoLoaded, [h] = T(() => {
    if (typeof document > "u") return null;
    const g = document.createElement("div");
    return g.style.width = "100%", g;
  });
  O(() => {
    if (!h) return;
    if (!c.showVideoCall) {
      h.parentNode?.removeChild(h);
      return;
    }
    const g = c.isVideoDocked ? "sidebar-video-slot" : "inline-video-slot", M = () => {
      const v = document.getElementById(g);
      return v && v !== h.parentNode ? (v.appendChild(h), !0) : v === h.parentNode;
    };
    if (M()) return;
    const p = setInterval(() => {
      M() && clearInterval(p);
    }, 50), C = setTimeout(() => clearInterval(p), 2e3);
    return () => {
      clearInterval(p), clearTimeout(C);
    };
  }, [h, c.showVideoCall, c.isVideoDocked, c.mode]), O(() => () => {
    h?.parentNode?.removeChild(h);
  }, [h]);
  const k = c.showVideoCall && h ? ft(
    /* @__PURE__ */ n(
      Gn,
      {
        documentId: t,
        userId: i,
        idToken: c.idToken,
        meta: c.meta,
        updateMeta: c.updateMeta,
        sendMessage: s.sendMessage,
        isDocked: c.isVideoDocked,
        onClose: () => {
          c.setShowVideoCall(!1), c.isVideoDocked && x?.();
        },
        onDockToSidebar: c.isVideoDocked ? void 0 : (() => {
          f?.();
        }),
        onUndock: c.isVideoDocked ? (() => {
          x?.();
        }) : void 0,
        onCallEnd: () => {
          c.setShowVideoCall(!1), x?.();
        }
      }
    ),
    h
  ) : null;
  return /* @__PURE__ */ a("div", { "data-testid": "document-editor-page", className: "flex flex-col h-full", children: [
    k,
    /* @__PURE__ */ n(
      zn,
      {
        meta: c.headerMeta,
        mode: c.mode,
        onModeChange: c.handleModeChange,
        participants: c.participants,
        onUpdateMeta: c.updateMeta,
        onExport: c.handleExport,
        onToggleHistory: c.handleToggleHistory,
        onToggleVideoCall: c.handleToggleVideoCall,
        onToggleVideoHistory: c.handleToggleVideoHistory,
        isCallActive: !!c.meta?.activeCallSessionId,
        onClearDocument: c.handleClearDocument,
        onJumpToUser: c.handleJumpToUser,
        sections: c.sections.map((g) => ({ id: g.id, title: g.title })),
        onToggleMyItems: c.handleToggleMyItems,
        myItemCount: c.myItems.length,
        commentCount: Object.values(c.comments).reduce((g, M) => g + M.length, 0),
        onBack: c.handleBack,
        onFollowUser: c.handleFollowUser,
        followingUserId: c.followingUserId,
        onFinalize: c.handleFinalize,
        onUnlock: c.handleUnlock,
        pastCallsCount: c.videoSessions.sessions.length
      }
    ),
    /* @__PURE__ */ n(
      Hn,
      {
        followingUserId: c.followingUserId,
        participants: c.participants,
        onStopFollow: c.handleStopFollow
      }
    ),
    /* @__PURE__ */ n("div", { className: "flex-1 overflow-auto p-4", children: /* @__PURE__ */ n(
      Mr,
      {
        mode: c.mode,
        isEmpty: w,
        isFinalized: c.isFinalized,
        sections: c.sections,
        documentId: t,
        displayName: o,
        color: l,
        userId: i,
        ydoc: c.ydoc,
        provider: c.provider,
        getSectionFragment: c.getSectionFragment,
        updateSection: c.updateSection,
        participants: c.participants,
        focusedSectionId: c.focusedSectionId,
        onSectionFocus: c.handleSectionFocus,
        comments: c.comments,
        onAddComment: c.handleAddComment,
        onResolveThread: c.handleResolveThread,
        onUnresolveThread: c.handleUnresolveThread,
        onUpdateCursorInfo: c.awareness.updateCursorInfo,
        onOpenComments: c.handleOpenComments,
        onAddItem: c.handleAddItem,
        onUpdateItem: c.handleUpdateItem,
        onRemoveItem: c.handleRemoveItem,
        restItems: c.restItems,
        commentSidebarOpen: c.commentSidebarOpen,
        commentSectionId: c.commentSectionId,
        commentSidebarTop: c.commentSidebarTop,
        sectionListRef: c.sectionListRef,
        onCloseComments: c.handleCloseComments,
        showVideoCall: c.showVideoCall,
        isVideoDocked: c.isVideoDocked,
        showInlineVideo: c.showInlineVideo,
        sidebarFixed: c.sidebarFixed,
        videoSpacerRef: c.videoSpacerRef,
        videoLeft: c.videoLeft,
        FIXED_TOP: c.FIXED_TOP,
        showTOC: c.showTOC,
        sectionReviews: c.sectionReviews,
        reviewSection: c.restReviewSection,
        headerMeta: c.headerMeta,
        onLoadDemo: c.handleLoadDemo,
        activityPublish: m
      }
    ) }),
    /* @__PURE__ */ n(
      qr,
      {
        showHistory: c.showHistory,
        showMyItems: c.showMyItems,
        showVideoHistory: c.showVideoHistory,
        closePanel: c.closePanel,
        versionHistory: c.versionHistory,
        ydoc: c.ydoc,
        myItems: c.myItems,
        onNavigateToSection: c.handleNavigateToSection,
        videoSessions: c.videoSessions,
        showTOC: c.showTOC,
        commentSidebarOpen: c.commentSidebarOpen,
        sections: c.sections,
        focusedSectionId: c.focusedSectionId,
        mode: c.mode
      }
    )
  ] });
}
function Kr({ open: t, onClose: r, onCreate: s }) {
  const [i, o] = T([]), [l, d] = T(null), [m, u] = T(""), [b, f] = T(""), x = V(null);
  if (O(() => {
    if (!t) return;
    const g = xt();
    o(g), d(g[0]?.id ?? null), u(""), f(""), setTimeout(() => x.current?.focus(), 50);
  }, [t]), !t) return null;
  const c = i.find((g) => g.id === l), w = () => {
    const g = m.trim();
    !g || !c || (s({
      title: g,
      type: c.name,
      description: b.trim() || void 0,
      icon: c.icon,
      documentTypeId: c.id
    }), r());
  }, h = (g) => {
    g.key === "Enter" && !g.shiftKey && m.trim() && c && w();
  }, k = !!m.trim() && !!c;
  return /* @__PURE__ */ n(
    Cn,
    {
      open: t,
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
      children: /* @__PURE__ */ a("div", { onKeyDown: h, className: "contents", children: [
        /* @__PURE__ */ n("h2", { className: e("m-0 px-6 pt-6 pb-4 text-lg font-bold text-[#1e293b] shrink-0"), children: "Create New Document" }),
        /* @__PURE__ */ n("div", { className: e("flex-1 overflow-y-auto px-6 min-h-0"), children: i.length === 0 ? /* @__PURE__ */ a("div", { className: e("text-center px-4 py-8 border border-dashed border-[#d1d5db] rounded-lg mb-5 text-[#64748b]"), children: [
          /* @__PURE__ */ n("div", { className: e("text-[40px] mb-3"), children: "📋" }),
          /* @__PURE__ */ n("div", { className: e("text-[15px] font-semibold mb-2 text-[#374151]"), children: "No document types defined yet" }),
          /* @__PURE__ */ a("div", { className: e("text-[13px] text-text-tertiary max-w-xs mx-auto mb-4"), children: [
            "Document types define the sections and structure of your documents. Create one first in ",
            /* @__PURE__ */ n("strong", { children: "☰ → Document Types" }),
            "."
          ] }),
          /* @__PURE__ */ n(
            "button",
            {
              onClick: r,
              className: e("px-5 py-2 text-[13px] font-semibold bg-primary text-white border-none rounded-[7px] cursor-pointer font-[inherit]"),
              children: "Close"
            }
          )
        ] }) : /* @__PURE__ */ a(F, { children: [
          /* @__PURE__ */ a("div", { className: e("mb-5"), children: [
            /* @__PURE__ */ n("label", { className: e("block text-[13px] font-semibold text-text-secondary mb-2"), children: "Document Type" }),
            /* @__PURE__ */ n("div", { className: e("grid grid-cols-2 gap-2"), children: i.map((g) => {
              const M = l === g.id;
              return /* @__PURE__ */ a(
                "button",
                {
                  "data-testid": `type-option-${g.id}`,
                  onClick: () => d(g.id),
                  className: e(
                    "flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]",
                    M ? "bg-[#eff6ff] border-2 border-[#3b82f6]" : "bg-white border-2 border-border hover:bg-[#f8fafc]"
                  ),
                  children: [
                    /* @__PURE__ */ n("span", { className: e("text-2xl shrink-0"), children: g.icon }),
                    /* @__PURE__ */ a("div", { className: e("min-w-0"), children: [
                      /* @__PURE__ */ n("div", { className: e("text-sm font-semibold text-[#1e293b] overflow-hidden text-ellipsis whitespace-nowrap"), children: g.name }),
                      g.description && /* @__PURE__ */ n("div", { className: e("text-[11px] text-[#64748b] leading-tight mt-0.5 overflow-hidden line-clamp-2"), children: g.description }),
                      /* @__PURE__ */ a("div", { className: e("text-[11px] text-text-tertiary mt-0.5"), children: [
                        g.fields.length,
                        " section",
                        g.fields.length !== 1 ? "s" : ""
                      ] })
                    ] }),
                    M && /* @__PURE__ */ n("span", { className: e("absolute top-1.5 right-2 text-sm text-[#3b82f6] font-bold"), children: "✓" })
                  ]
                },
                g.id
              );
            }) })
          ] }),
          /* @__PURE__ */ a("div", { className: e("mb-4"), children: [
            /* @__PURE__ */ a("label", { className: e("block text-[13px] font-semibold text-text-secondary mb-1"), children: [
              "Title ",
              /* @__PURE__ */ n("span", { className: e("text-[#ef4444]"), children: "*" })
            ] }),
            /* @__PURE__ */ n(
              "input",
              {
                ref: x,
                "data-testid": "new-doc-title",
                type: "text",
                value: m,
                onChange: (g) => u(g.target.value),
                placeholder: c ? `e.g. Q2 ${c.name}` : "Document title…",
                className: e("w-full px-3 py-2 text-sm border border-border rounded-lg outline-none bg-white text-[#1e293b] box-border font-[inherit] focus:border-[#3b82f6]")
              }
            )
          ] }),
          /* @__PURE__ */ a("div", { className: e("mb-5"), children: [
            /* @__PURE__ */ a("label", { className: e("block text-[13px] font-semibold text-text-secondary mb-1"), children: [
              "Description ",
              /* @__PURE__ */ n("span", { className: e("text-text-tertiary font-normal"), children: "(optional)" })
            ] }),
            /* @__PURE__ */ n(
              "textarea",
              {
                "data-testid": "new-doc-description",
                value: b,
                onChange: (g) => f(g.target.value),
                placeholder: "Brief description of this document…",
                rows: 3,
                className: e("w-full px-3 py-2 text-sm border border-border rounded-lg outline-none bg-white text-[#1e293b] resize-y box-border font-[inherit] focus:border-[#3b82f6]")
              }
            )
          ] })
        ] }) }),
        i.length > 0 && /* @__PURE__ */ a("div", { className: e("flex justify-end gap-2 px-6 py-4 border-t border-border bg-white shrink-0"), children: [
          /* @__PURE__ */ n(
            "button",
            {
              "data-testid": "new-doc-cancel",
              onClick: r,
              className: e("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-white text-text-secondary cursor-pointer font-[inherit]"),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ n(
            "button",
            {
              "data-testid": "new-doc-submit",
              onClick: w,
              disabled: !k,
              className: e(
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
function Xr(t) {
  const r = Date.now(), s = new Date(t).getTime();
  if (isNaN(s)) return "";
  const i = r - s;
  if (i < 0) return "just now";
  const o = Math.floor(i / 1e3);
  if (o < 60) return "just now";
  const l = Math.floor(o / 60);
  if (l < 60) return `${l}m ago`;
  const d = Math.floor(l / 60);
  if (d < 24) return `${d}h ago`;
  const m = Math.floor(d / 24);
  return m < 30 ? `${m}d ago` : `${Math.floor(m / 30)}mo ago`;
}
const ct = {
  draft: { bg: "#fef3c7", color: "#92400e" },
  review: { bg: "#dbeafe", color: "#1e40af" },
  final: { bg: "#d1fae5", color: "#065f46" },
  archived: { bg: "#f1f5f9", color: "#475569" }
};
function Yr({ status: t }) {
  const r = ct[t] ?? ct.draft;
  return /* @__PURE__ */ n(
    "span",
    {
      className: e("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize leading-[18px]"),
      style: { background: r.bg, color: r.color },
      children: t
    }
  );
}
const mt = {
  editor: { icon: "✏", label: "Editing" },
  reviewer: { icon: "✔", label: "Reviewing" },
  reader: { icon: "👁", label: "Viewing" }
};
function Gr({
  users: t,
  onClickUser: r
}) {
  const i = t.slice(0, 5), o = t.length - 5;
  return /* @__PURE__ */ a("div", { className: e("flex items-center gap-0.5"), children: [
    i.map((l, d) => {
      const m = mt[l.mode ?? "editor"] ?? mt.editor, u = l.idle === !0, b = u ? "#f59e0b" : "#10b981";
      return /* @__PURE__ */ a(
        "div",
        {
          title: `${l.displayName} — ${u ? "Away" : m.label}`,
          onClick: (f) => {
            f.stopPropagation(), r(l.userId);
          },
          className: e("relative cursor-pointer"),
          style: { marginLeft: d > 0 ? -6 : 0, zIndex: 5 - d },
          children: [
            /* @__PURE__ */ n(
              "div",
              {
                className: e("w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center border-2 border-white"),
                style: { background: u ? `${l.color}99` : l.color },
                children: l.displayName.split(" ").map((f) => f[0]).join("").slice(0, 2).toUpperCase()
              }
            ),
            /* @__PURE__ */ n(
              "div",
              {
                className: e("absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full border-2 border-white"),
                style: { background: b }
              }
            ),
            /* @__PURE__ */ n("div", { className: e("absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-white border border-border flex items-center justify-center text-[8px] leading-none"), children: m.icon })
          ]
        },
        l.userId
      );
    }),
    o > 0 && /* @__PURE__ */ a(
      "div",
      {
        className: e("w-8 h-8 rounded-full bg-[#94a3b8] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white -ml-1.5"),
        children: [
          "+",
          o
        ]
      }
    )
  ] });
}
function wo({
  documents: t,
  presence: r,
  onOpenDocument: s,
  onCreateDocument: i,
  onDeleteDocument: o,
  onJumpToUser: l,
  hideHeader: d
}) {
  const [m, u] = T(!1), [b, f] = T(null), [x, c] = T(1), w = 10, h = Math.max(1, Math.ceil(t.length / w)), k = Math.min(x, h), g = Re(() => {
    const p = (k - 1) * w;
    return t.slice(p, p + w);
  }, [t, k]), M = L(
    (p, C, v) => {
      p.stopPropagation(), window.confirm(`Delete "${v}"? This cannot be undone.`) && o(C);
    },
    [o]
  );
  return /* @__PURE__ */ a("div", { className: e("px-4"), children: [
    !d && /* @__PURE__ */ a("div", { className: e("flex items-center justify-between mb-5"), children: [
      /* @__PURE__ */ n("h1", { className: e("m-0 text-[22px] font-bold text-[#1e293b]"), children: "Documents" }),
      /* @__PURE__ */ a(
        "button",
        {
          "data-testid": "new-document-btn",
          onClick: () => u(!0),
          className: e("flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-none rounded-lg bg-[#3b82f6] text-white cursor-pointer font-[inherit]"),
          children: [
            /* @__PURE__ */ n("span", { className: e("text-base leading-none"), children: "+" }),
            "New Document"
          ]
        }
      )
    ] }),
    t.length === 0 ? /* @__PURE__ */ n(
      "div",
      {
        "data-testid": "documents-empty",
        className: e("text-center px-4 py-12 text-text-tertiary text-[15px]"),
        children: "No documents yet. Create your first document to get started."
      }
    ) : /* @__PURE__ */ n("div", { className: e("flex flex-col gap-3"), children: g.map((p) => {
      const C = r[p.id] ?? [], v = b === p.id;
      return /* @__PURE__ */ a(
        "div",
        {
          "data-testid": `document-card-${p.id}`,
          onClick: () => s(p.id),
          onMouseEnter: () => f(p.id),
          onMouseLeave: () => f(null),
          className: e(
            "flex items-center gap-4 px-4 py-3.5 bg-white border border-border rounded-lg cursor-pointer relative transition-shadow duration-150",
            v ? "shadow-[0_4px_12px_rgba(0,0,0,0.08)]" : ""
          ),
          children: [
            /* @__PURE__ */ n("span", { className: e("text-2xl shrink-0"), children: p.icon }),
            /* @__PURE__ */ a("div", { className: e("flex-1 min-w-0"), children: [
              /* @__PURE__ */ a("div", { className: e("flex items-center gap-2 mb-0.5"), children: [
                /* @__PURE__ */ n("span", { className: e("text-[15px] font-semibold text-[#1e293b] overflow-hidden text-ellipsis whitespace-nowrap"), children: p.title }),
                /* @__PURE__ */ n(Yr, { status: p.status }),
                p.type && /* @__PURE__ */ n("span", { className: e("inline-block px-2 py-px text-[11px] font-semibold rounded-full bg-[#f1f5f9] text-text-secondary whitespace-nowrap shrink-0"), children: p.type }),
                p.activeCallSessionId && /* @__PURE__ */ a("span", { className: e("inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-[#dcfce7] text-[#166534] leading-[18px]"), children: [
                  /* @__PURE__ */ n("span", { className: e("w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse") }),
                  "Live Call"
                ] })
              ] }),
              p.description && /* @__PURE__ */ n("div", { className: e("text-[13px] text-[#64748b] overflow-hidden text-ellipsis whitespace-nowrap mb-0.5"), children: p.description }),
              /* @__PURE__ */ a("div", { className: e("text-xs text-text-tertiary"), children: [
                "Updated ",
                Xr(p.updatedAt)
              ] })
            ] }),
            C.length > 0 && /* @__PURE__ */ n("div", { className: e("shrink-0"), children: /* @__PURE__ */ n(
              Gr,
              {
                users: C,
                onClickUser: (R) => l(p.id, R)
              }
            ) }),
            v && /* @__PURE__ */ n(
              "button",
              {
                onClick: (R) => M(R, p.id, p.title),
                title: "Delete document",
                className: e("absolute top-2 right-2 w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-[#fee2e2] text-[#dc2626] text-sm leading-none cursor-pointer font-[inherit] p-0"),
                children: "×"
              }
            )
          ]
        },
        p.id
      );
    }) }),
    t.length > w && /* @__PURE__ */ a(
      "div",
      {
        "data-testid": "pagination-controls",
        className: e("flex items-center justify-center gap-3 mt-4 pt-3 border-t border-border"),
        children: [
          /* @__PURE__ */ n(
            "button",
            {
              "data-testid": "pagination-prev",
              disabled: k <= 1,
              onClick: () => c((p) => Math.max(1, p - 1)),
              className: e(
                "px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md",
                k <= 1 ? "bg-[#f1f5f9] text-[#9ca3af] cursor-not-allowed" : "bg-white text-text-secondary cursor-pointer"
              ),
              children: "Previous"
            }
          ),
          /* @__PURE__ */ a(
            "span",
            {
              "data-testid": "pagination-info",
              className: e("text-[13px] text-text-secondary font-medium"),
              children: [
                "Page ",
                k,
                " of ",
                h
              ]
            }
          ),
          /* @__PURE__ */ n(
            "button",
            {
              "data-testid": "pagination-next",
              disabled: k >= h,
              onClick: () => c((p) => Math.min(h, p + 1)),
              className: e(
                "px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md",
                k >= h ? "bg-[#f1f5f9] text-[#9ca3af] cursor-not-allowed" : "bg-white text-text-secondary cursor-pointer"
              ),
              children: "Next"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ n(
      Kr,
      {
        open: m,
        onClose: () => u(!1),
        onCreate: i
      }
    )
  ] });
}
function Zr({ current: t, total: r }) {
  const s = r > 0 ? Math.round(t / r * 100) : 0;
  return /* @__PURE__ */ a("div", { className: e("mb-4"), children: [
    /* @__PURE__ */ a("div", { className: e("text-[13px] text-[#6b7280] mb-1 flex justify-between"), children: [
      /* @__PURE__ */ a("span", { children: [
        t,
        " of ",
        r,
        " sections reviewed"
      ] }),
      /* @__PURE__ */ a("span", { children: [
        s,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ n("div", { className: e("h-2 bg-[#e5e7eb] rounded overflow-hidden"), children: /* @__PURE__ */ n(
      "div",
      {
        className: e("h-full bg-[#3b82f6] rounded transition-[width] duration-300 ease-in-out"),
        style: { width: `${s}%` }
      }
    ) })
  ] });
}
const Jr = {
  pending: { bg: "#fef3c7", text: "#92400e" },
  acked: { bg: "#d1fae5", text: "#065f46" },
  done: { bg: "#dbeafe", text: "#1e40af" },
  rejected: { bg: "#fee2e2", text: "#991b1b" }
}, pt = {
  low: "#6b7280",
  medium: "#f59e0b",
  high: "#ef4444"
};
function Qr({ item: t, onAck: r, onReject: s }) {
  const [i, o] = T(!1), [l, d] = T(""), [m, u] = T("none"), b = V(t.status), f = Jr[t.status];
  O(() => {
    b.current === "pending" && t.status === "acked" ? u("ack") : b.current === "pending" && t.status === "rejected" && u("reject"), b.current = t.status;
  }, [t.status]);
  const x = () => {
    u("ack"), setTimeout(() => {
      r(l || void 0), d(""), o(!1);
    }, 150);
  }, c = () => {
    if (!l.trim()) {
      o(!0);
      return;
    }
    u("reject"), setTimeout(() => {
      s(l), d(""), o(!1);
    }, 150);
  };
  return /* @__PURE__ */ a("div", { className: e("bg-white border border-[#e5e7eb] rounded-lg px-4 py-3 mb-2 transition-all duration-300 ease-in-out", m === "ack" ? "animate-[ackPulse_0.6s_ease-out] border-[#22c55e] bg-[#f0fdf4]" : m === "reject" ? "animate-[rejectPulse_0.6s_ease-out] border-[#ef4444] bg-[#fef2f2]" : ""), children: [
    /* @__PURE__ */ a("div", { className: e("flex items-center mb-1.5"), children: [
      /* @__PURE__ */ n("span", { className: e("text-sm font-medium flex-1 text-[#1e293b]"), children: t.text }),
      /* @__PURE__ */ n(
        "span",
        {
          className: e("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2"),
          style: { background: f.bg, color: f.text },
          children: t.status
        }
      ),
      /* @__PURE__ */ n(
        "span",
        {
          className: e("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2 bg-transparent"),
          style: { color: pt[t.priority], border: `1px solid ${pt[t.priority]}` },
          children: t.priority
        }
      )
    ] }),
    t.status === "acked" && /* @__PURE__ */ a("div", { className: e("flex items-center gap-1.5 text-xs text-[#6b7280] mb-1"), children: [
      /* @__PURE__ */ n("span", { className: e("w-5 h-5 rounded-full bg-[#22c55e] text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"), children: "✓" }),
      /* @__PURE__ */ a("span", { children: [
        "Approved by ",
        /* @__PURE__ */ n("strong", { className: e("text-[#334155]"), children: t.ackedBy?.slice(0, 8) ?? "user" }),
        t.ackedAt && /* @__PURE__ */ a(F, { children: [
          " · ",
          new Date(t.ackedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        ] }),
        t.notes && /* @__PURE__ */ a(F, { children: [
          " — ",
          t.notes
        ] })
      ] })
    ] }),
    t.status === "rejected" && /* @__PURE__ */ a("div", { className: e("flex items-center gap-1.5 text-xs text-[#991b1b] mb-1"), children: [
      /* @__PURE__ */ n("span", { className: e("w-5 h-5 rounded-full bg-[#ef4444] text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"), children: "✕" }),
      /* @__PURE__ */ a("span", { children: [
        "Rejected by ",
        /* @__PURE__ */ n("strong", { children: t.ackedBy?.slice(0, 8) ?? "user" }),
        t.ackedAt && /* @__PURE__ */ a(F, { children: [
          " · ",
          new Date(t.ackedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        ] }),
        t.notes && /* @__PURE__ */ a(F, { children: [
          " — ",
          t.notes
        ] })
      ] })
    ] }),
    t.status === "pending" && /* @__PURE__ */ a("div", { children: [
      /* @__PURE__ */ a("div", { className: e("flex gap-2 mt-1.5"), children: [
        /* @__PURE__ */ n("button", { type: "button", className: e("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-[#22c55e] text-white"), onClick: x, children: "Acknowledge" }),
        /* @__PURE__ */ n("button", { type: "button", className: e("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-[#ef4444] text-white"), onClick: c, children: "Reject" }),
        !i && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: e("px-3.5 py-1.5 text-[13px] font-semibold rounded-md cursor-pointer bg-transparent text-[#6b7280] border border-[#d1d5db]"),
            onClick: () => o(!0),
            children: "Add note"
          }
        )
      ] }),
      i && /* @__PURE__ */ a("div", { className: e("mt-2"), children: [
        /* @__PURE__ */ n(
          "textarea",
          {
            value: l,
            onChange: (h) => d(h.target.value),
            onKeyDown: (h) => {
              h.key === "Enter" && !h.shiftKey && (h.preventDefault(), l.trim() && x()), h.key === "Escape" && (o(!1), d(""));
            },
            placeholder: "Add notes or rejection reason... (Enter to submit, Esc to cancel)",
            autoFocus: !0,
            className: e("w-full min-h-[60px] p-2 text-[13px] border border-[#d1d5db] rounded-md resize-y font-[inherit] bg-white text-[#1e293b] outline-none")
          }
        ),
        /* @__PURE__ */ a("div", { className: e("flex gap-1.5 mt-1.5"), children: [
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: e("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-[#22c55e] text-white"),
              onClick: x,
              tabIndex: 0,
              children: "Submit & Acknowledge"
            }
          ),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: e("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-[#ef4444] text-white"),
              onClick: c,
              tabIndex: 0,
              children: "Submit & Reject"
            }
          ),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: e("px-3 py-[5px] text-xs font-semibold rounded-md cursor-pointer bg-transparent text-[#6b7280] border border-[#d1d5db]"),
              onClick: () => {
                o(!1), d("");
              },
              tabIndex: 0,
              children: "Cancel"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
const ut = {
  summary: { bg: "#dbeafe", text: "#1e40af" },
  tasks: { bg: "#fef3c7", text: "#92400e" },
  decisions: { bg: "#ede9fe", text: "#5b21b6" },
  notes: { bg: "#f3f4f6", text: "#374151" },
  custom: { bg: "#e0e7ff", text: "#3730a3" }
};
function eo({ section: t, onAckItem: r, onRejectItem: s, fragment: i, ydoc: o, provider: l, comments: d, onAddComment: m, onResolveThread: u, onUnresolveThread: b, participants: f }) {
  const x = ut[t.type] ?? ut.custom, c = t.items.filter((w) => w.status !== "pending").length;
  return /* @__PURE__ */ a("div", { className: e("bg-white border border-[#e5e7eb] rounded-lg p-5 mb-4"), children: [
    /* @__PURE__ */ n("h2", { className: e("text-xl font-bold m-0 mb-1 text-[#1e293b]"), children: t.title }),
    /* @__PURE__ */ n(
      "span",
      {
        className: e("inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-3"),
        style: { background: x.bg, color: x.text },
        children: t.type
      }
    ),
    i && /* @__PURE__ */ n("div", { className: e(t.items.length > 0 ? "mb-4" : ""), children: /* @__PURE__ */ n(
      fe,
      {
        fragment: i,
        ydoc: o,
        provider: l,
        user: { name: "", color: "" },
        editable: !1,
        sectionId: t.id
      }
    ) }),
    !i && t.items.length === 0 && /* @__PURE__ */ a("div", { className: e("py-6 text-text-tertiary text-sm text-center"), children: [
      "This ",
      t.type,
      " section has no content. Switch to Editor mode to add content."
    ] }),
    t.items.length > 0 && /* @__PURE__ */ a("div", { children: [
      t.items.map((w) => /* @__PURE__ */ n(
        Qr,
        {
          item: w,
          onAck: (h) => r(w.id, h),
          onReject: (h) => s(w.id, h)
        },
        w.id
      )),
      /* @__PURE__ */ a("div", { className: e("text-xs text-[#6b7280] mt-3 pt-2 border-t border-[#f3f4f6]"), children: [
        c,
        " of ",
        t.items.length,
        " items reviewed"
      ] })
    ] }),
    m && /* @__PURE__ */ n(
      _e,
      {
        comments: d ?? [],
        onAddComment: m,
        participants: f,
        onResolveThread: u,
        onUnresolveThread: b
      }
    )
  ] });
}
const ue = 4;
function vo({ sections: t, onAckItem: r, onRejectItem: s, participants: i, onSectionFocus: o, jumpToIndex: l, onJumpComplete: d, getSectionFragment: m, ydoc: u, provider: b, comments: f, onAddComment: x, onResolveThread: c, onUnresolveThread: w }) {
  const [h, k] = T(0), g = Math.max(1, Math.ceil(t.length / ue)), M = h * ue, p = t.slice(M, M + ue);
  if (O(() => {
    l != null && l >= 0 && l < t.length && (k(Math.floor(l / ue)), d?.());
  }, [l, t.length, d]), O(() => {
    p.length > 0 && o && o(p[0].id);
  }, [M, o]), t.length === 0)
    return /* @__PURE__ */ n("div", { className: e("text-center p-12 text-[#6b7280] text-[15px]"), children: "No sections to review." });
  const C = () => k((j) => Math.max(0, j - 1)), v = () => k((j) => Math.min(g - 1, j + 1)), R = M + p.length;
  return /* @__PURE__ */ a("div", { children: [
    /* @__PURE__ */ n(Zr, { current: R, total: t.length }),
    /* @__PURE__ */ n("div", { className: e("flex flex-col gap-4"), children: p.map((j) => {
      const S = i?.filter((D) => D.currentSectionId === j.id) ?? [];
      return /* @__PURE__ */ a("div", { children: [
        S.length > 0 && /* @__PURE__ */ a("div", { className: e("flex gap-1 mb-1.5 items-center"), children: [
          /* @__PURE__ */ n("span", { className: e("text-xs text-[#6b7280] mr-1"), children: "Viewing:" }),
          S.map((D) => /* @__PURE__ */ n(
            "div",
            {
              title: `${D.displayName} (${D.mode})`,
              className: e("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold"),
              style: { background: D.color },
              children: D.displayName.split(" ").map((I) => I[0]).join("").toUpperCase().slice(0, 2)
            },
            D.clientId
          ))
        ] }),
        /* @__PURE__ */ n(
          eo,
          {
            section: j,
            onAckItem: (D, I) => r(j.id, D, I),
            onRejectItem: (D, I) => s(j.id, D, I),
            fragment: m(j.id),
            ydoc: u,
            provider: b,
            comments: f?.[j.id],
            onAddComment: x ? (D, I) => x(j.id, D, I) : void 0,
            onResolveThread: c ? (D) => c(j.id, D) : void 0,
            onUnresolveThread: w ? (D) => w(j.id, D) : void 0,
            participants: S
          }
        )
      ] }, j.id);
    }) }),
    /* @__PURE__ */ a("div", { className: e("flex justify-between items-center mt-4 py-3"), children: [
      /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          className: e(
            "px-[18px] py-2 text-sm font-semibold border border-[#d1d5db] rounded-md font-[inherit]",
            h === 0 ? "bg-[#f9fafb] text-[#9ca3af] cursor-default" : "bg-white text-[#374151] cursor-pointer"
          ),
          onClick: C,
          disabled: h === 0,
          children: "Previous"
        }
      ),
      /* @__PURE__ */ a("span", { className: e("text-[13px] text-[#6b7280]"), children: [
        "Page ",
        h + 1,
        " of ",
        g,
        " (",
        t.length,
        " sections)"
      ] }),
      /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          className: e(
            "px-[18px] py-2 text-sm font-semibold border border-[#d1d5db] rounded-md font-[inherit]",
            h === g - 1 ? "bg-[#f9fafb] text-[#9ca3af] cursor-default" : "bg-white text-[#374151] cursor-pointer"
          ),
          onClick: v,
          disabled: h === g - 1,
          children: "Next"
        }
      )
    ] })
  ] });
}
function to(t) {
  return t === "doc.ack" ? "✅" : t === "doc.reject" ? "❌" : t === "doc.add_item" || t === "doc.add_section" ? "➕" : t === "doc.edit_section" ? "✏️" : t === "doc.remove_item" ? "➖" : t === "doc.comment" ? "💬" : t.endsWith(".join") ? "🟢" : t.endsWith(".leave") ? "🔴" : t.startsWith("social.") ? "💬" : t === "pipeline.run.started" ? "▶" : t === "pipeline.run.completed" ? "✓" : t === "pipeline.run.failed" ? "✕" : t === "pipeline.approval.requested" ? "✋" : "•";
}
function no(t, r) {
  const s = r.documentTitle ? ` in ${r.documentTitle}` : "";
  switch (t) {
    case "doc.ack":
      return `acknowledged "${r.itemText || "item"}"${s}`;
    case "doc.reject":
      return `rejected "${r.itemText || "item"}"${s}`;
    case "doc.add_item":
      return `added task in "${r.sectionTitle || "section"}"${s}`;
    case "doc.add_section":
      return `added new section${s}`;
    case "doc.edit_section":
      return `edited "${r.sectionTitle || "section"}"${s}`;
    case "doc.remove_item":
      return `removed "${r.itemText || "item"}"${s}`;
    case "doc.comment":
      return `commented: "${r.text || "..."}"${s}`;
    case "pipeline.run.started": {
      const i = r.pipelineId ?? "";
      return i ? `triggered pipeline ${i}` : "triggered a pipeline";
    }
    case "pipeline.run.completed":
      return typeof r.durationMs == "number" ? `pipeline run completed in ${r.durationMs}ms` : "pipeline run completed";
    case "pipeline.run.failed":
      return `pipeline run failed: ${r.error ?? "unknown error"}`;
    case "pipeline.approval.requested":
      return "approval requested";
    default:
      return r.description ? String(r.description) : t;
  }
}
function ro(t) {
  return t.split(" ").map((r) => r[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function oo(t) {
  try {
    return new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  } catch {
    return "";
  }
}
function so(t) {
  switch (t) {
    case "editor":
      return "editing";
    case "reviewer":
      return "reviewing";
    case "reader":
      return "reading";
    default:
      return "online";
  }
}
function No({ events: t, participants: r }) {
  const [s, i] = T(!1);
  return /* @__PURE__ */ a("div", { className: e("bg-[#f8fafc] border border-border rounded-lg overflow-hidden"), children: [
    /* @__PURE__ */ a(
      "div",
      {
        className: e("flex items-center justify-between px-3 py-2 bg-[#f1f5f9] border-b border-border text-[13px] font-semibold text-[#334155] cursor-pointer select-none"),
        onClick: () => i((o) => !o),
        children: [
          /* @__PURE__ */ a("span", { children: [
            "Activity ",
            t.length > 0 && `(${t.length})`
          ] }),
          /* @__PURE__ */ n("span", { className: e("text-[11px] font-normal text-text-tertiary"), children: s ? "▶" : "▼" })
        ]
      }
    ),
    !s && /* @__PURE__ */ a(F, { children: [
      r.length > 0 && /* @__PURE__ */ a("div", { className: e("flex items-center gap-1.5 px-3 py-1.5 border-b border-border text-[11px] text-[#64748b] flex-wrap"), children: [
        /* @__PURE__ */ n("span", { className: e("font-semibold"), children: "Active:" }),
        r.map((o) => /* @__PURE__ */ a("span", { className: e("inline-flex items-center gap-1 bg-white border border-border rounded-xl px-2 py-0.5 text-[11px] font-medium text-[#334155]"), children: [
          /* @__PURE__ */ n("span", { className: e("w-2 h-2 rounded-full shrink-0"), style: { background: o.color } }),
          o.displayName,
          " (",
          so(o.mode),
          ")"
        ] }, o.clientId))
      ] }),
      /* @__PURE__ */ n("div", { className: e("max-h-[260px] overflow-y-auto py-1"), children: t.length === 0 ? /* @__PURE__ */ n("div", { className: e("px-3 py-4 text-center text-text-tertiary text-xs"), children: "No activity yet. Actions like acknowledging tasks will appear here." }) : t.map((o) => /* @__PURE__ */ a("div", { className: e("flex items-start gap-2 px-3 py-1.5 text-xs leading-normal border-b border-[#f1f5f9]"), children: [
        /* @__PURE__ */ n(
          "div",
          {
            className: e("w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-px"),
            style: { background: o.color || "#94a3b8" },
            children: ro(o.displayName || "Unknown")
          }
        ),
        /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ n("span", { className: e("font-semibold text-[#334155]"), children: o.displayName || "Unknown" }),
          " ",
          /* @__PURE__ */ a("span", { className: e("text-[#64748b]"), children: [
            to(o.eventType),
            " ",
            no(o.eventType, o.detail)
          ] })
        ] }),
        /* @__PURE__ */ n("span", { className: e("text-[10px] text-text-tertiary whitespace-nowrap ml-auto pl-2 shrink-0"), children: oo(o.timestamp) })
      ] }, o.id)) })
    ] })
  ] });
}
export {
  vo as AckMode,
  wr as ActionItemsCard,
  No as ActivityFeed,
  lr as AttachmentsPanel,
  eo as ChunkViewer,
  Lr as DiffViewer,
  yo as DocumentEditorPage,
  zn as DocumentHeader,
  wo as DocumentListPage,
  So as EditorToolbar,
  br as ExecutiveSummaryCard,
  Hn as FollowModeBar,
  hr as HeaderBanner,
  yr as KeyDecisionsCard,
  yt as MentionDropdown,
  Vr as MyMentionsPanel,
  Kr as NewDocumentModal,
  Vn as ParticipantAvatars,
  Tr as ReaderMode,
  pr as ReviewMode,
  Zr as ReviewProgress,
  Qr as ReviewableItem,
  tr as SectionBlock,
  _e as SectionComments,
  nr as SectionList,
  vr as SectionSummariesCard,
  Wr as TableOfContents,
  Io as TaskItemRow,
  To as TaskList,
  fe as TiptapEditor,
  _r as VersionHistoryPanel,
  Gn as VideoCallPanel,
  Hr as VideoHistoryPanel,
  wt as countAllComments,
  xr as generateSummaryBullets,
  cr as getInitials,
  Te as relativeTime,
  Rn as useDocumentActions,
  An as useSidebarPanels
};
