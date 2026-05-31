import { jsxs as d, jsx as n, Fragment as K } from "react/jsx-runtime";
import { useState as M, useCallback as A, useEffect as U, useRef as F, useMemo as at, forwardRef as en, useImperativeHandle as tn } from "react";
import nn, { createPortal as lt } from "react-dom";
import { n as rn, b as on, c as sn, g as an, e as ln, j as dn, l as cn, m as mn, i as pn } from "./useVideoSessions-hr67KvHn.js";
import { u as un } from "./IdentityContext-CLalsm_M.js";
import { l as fn } from "./useDocumentTypes-C29MkgPl.js";
import { c as e } from "./cn-B6yFEsav.js";
import { u as xn } from "./useHangoutEmbed-DyGzEiRt.js";
import { u as hn } from "./useActiveSpeaker-BOwJ262O.js";
import { D as bn, T as De } from "./index-DvQShsdF.js";
import { g as gn } from "./registry-D1eP6Kby.js";
function $e() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
const dt = /^- \[([ xX])\]\s+(.+)$/;
function yn(t, r) {
  const s = t.toLowerCase();
  return dt.test(r) || /- \[[ xX]\]/.test(r) ? "tasks" : s.includes("decision") ? "decisions" : s.includes("summary") ? "summary" : "notes";
}
function Ye(t) {
  const r = t.split(`
`), s = [], o = [];
  for (const i of r) {
    const a = i.match(dt);
    if (a) {
      const c = a[1].toLowerCase() === "x";
      s.push({
        id: $e(),
        text: a[2].trim(),
        status: c ? "done" : "pending",
        assignee: "",
        ackedBy: "",
        ackedAt: "",
        priority: "medium",
        notes: ""
      });
    } else
      o.push(i);
  }
  return {
    items: s,
    remaining: o.join(`
`).trim()
  };
}
function vn(t) {
  const r = {}, s = [], o = t.replace(/\r\n/g, `
`), i = o.match(/^# (.+)$/m);
  i && (r.title = i[1].trim());
  const a = o.split(/^## /m);
  if (a.length <= 1) {
    const c = o.replace(/^# .+\n*/m, "").trim();
    if (c.length > 0) {
      const { items: m, remaining: p } = Ye(c);
      s.push({
        id: $e(),
        type: "summary",
        title: r.title ?? "Untitled",
        contentMarkdown: p,
        items: m
      });
    }
    return { meta: r, sections: s };
  }
  for (let c = 1; c < a.length; c++) {
    const m = a[c], p = m.indexOf(`
`), h = p === -1 ? m.trim() : m.slice(0, p).trim(), f = p === -1 ? "" : m.slice(p + 1).trim(), { items: u, remaining: l } = Ye(f), w = yn(h, f);
    s.push({
      id: $e(),
      type: w,
      title: h,
      contentMarkdown: l,
      items: u
    });
  }
  return { meta: r, sections: s };
}
function wn(t) {
  return `- [${t.status === "done" || t.status === "acked" ? "x" : " "}] ${t.text}`;
}
function ct(t, r = 0) {
  const s = "  ".repeat(r), o = [];
  o.push(`${s}> **${t.displayName}**: ${t.text}`);
  for (const i of t.replies)
    o.push(ct(i, r + 1));
  return o.join(`
`);
}
function Nn(t) {
  const r = [`## ${t.title}`, ""], s = t.contentMarkdown ?? t.contentText;
  if (s && r.push(s, ""), t.items.length > 0) {
    for (const i of t.items)
      r.push(wn(i));
    r.push("");
  }
  const o = t.comments;
  if (o && o.length > 0) {
    r.push(`### Comments (${o.length})`, "");
    for (const i of o)
      r.push(ct(i));
    r.push("");
  }
  return r.join(`
`);
}
function Je(t) {
  const r = [`# ${t.meta.title}`, ""];
  for (const s of t.sections)
    r.push(Nn(s));
  return r.join(`
`).trimEnd() + `
`;
}
const kn = `# Q2 Sprint Planning - Meeting Summary

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
function Cn(t) {
  return t.toString().replace(/<\/?(paragraph|heading|blockquote|codeBlock|bulletList|orderedList|listItem|taskList|taskItem|horizontalRule|hardBreak|doc)[^>]*>/g, `
`).replace(/<[^>]+>/g, "").replace(/\n{3,}/g, `

`).trim();
}
function Sn(t) {
  return t.split(`
`).map((r) => r.startsWith("### ") ? `<h3>${r.slice(4)}</h3>` : r.startsWith("## ") ? `<h2>${r.slice(3)}</h2>` : r.startsWith("# ") ? `<h1>${r.slice(2)}</h1>` : r.startsWith("> ") ? `<blockquote>${r.slice(2)}</blockquote>` : r.startsWith("- [x] ") ? `<li>&#9745; ${r.slice(6)}</li>` : r.startsWith("- [ ] ") ? `<li>&#9744; ${r.slice(6)}</li>` : r.startsWith("- ") ? `<li>${r.slice(2)}</li>` : r.trim() === "" ? "<br/>" : `<p>${r}</p>`).join(`
`).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/`([^`]+)`/g, "<code>$1</code>");
}
function Ze(t, r) {
  const s = URL.createObjectURL(t), o = document.createElement("a");
  o.href = s, o.download = r, o.click(), URL.revokeObjectURL(s);
}
function Tn({
  documentId: t,
  userId: r,
  ws: s,
  updateMeta: o,
  addSection: i,
  exportJSON: a,
  getSectionFragment: c,
  comments: m
}) {
  const [p, h] = M(!1), f = A(() => {
    const w = vn(kn);
    o({
      id: t,
      title: w.meta.title || "Untitled",
      sourceType: "notes",
      sourceId: "",
      createdBy: r,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      aiModel: "",
      status: "draft"
    });
    for (const b of w.sections)
      i({
        id: b.id,
        type: b.type,
        title: b.title,
        collapsed: !1,
        items: b.items
      });
    h(!0);
  }, [t, r, o, i]), u = A(() => {
    s.sendMessage({
      service: "crdt",
      action: "clearDocument",
      channel: `doc:${t}`
    }), h(!1);
  }, [s, t]), l = A((w) => {
    const b = a();
    if (b) {
      for (const S of b.sections) {
        const N = c(S.id);
        N && (S.contentText = Cn(N));
        const $ = m[S.id];
        $ && $.length > 0 && (S.comments = $);
      }
      if (w === "json") {
        const S = new Blob([JSON.stringify(b, null, 2)], { type: "application/json" });
        Ze(S, `${b.meta.title || "document"}.json`);
      } else if (w === "markdown") {
        const S = Je(b), N = new Blob([S], { type: "text/markdown" });
        Ze(N, `${b.meta.title || "document"}.md`);
      } else if (w === "pdf") {
        const S = Je(b), N = window.open("", "_blank");
        N && (N.document.write(`
          <html>
          <head>
            <title>${b.meta.title || "Document"}</title>
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
          <body>${Sn(S)}</body>
          </html>
        `), N.document.close(), N.print());
      }
    }
  }, [a, c, m]);
  return {
    demoLoaded: p,
    handleLoadDemo: f,
    handleClearDocument: u,
    handleExport: l
  };
}
function In(t = {}) {
  const [r, s] = M(
    t.initialPanel ?? null
  ), o = A((c) => {
    s((m) => m === c ? null : c);
  }, []), i = A((c) => {
    s(c);
  }, []), a = A(() => {
    s(null);
  }, []);
  return {
    activePanel: r,
    showHistory: r === "history",
    showMyItems: r === "myItems",
    showVideoHistory: r === "videoHistory",
    toggleHistory: A(() => o("history"), [o]),
    toggleMyItems: A(() => o("myItems"), [o]),
    toggleVideoHistory: A(() => o("videoHistory"), [o]),
    openPanel: i,
    closePanel: a
  };
}
function Mn() {
  if (typeof window < "u") {
    const r = new URLSearchParams(window.location.search).get("mode");
    if (r === "editor" || r === "ack" || r === "reader") return r;
  }
  return "editor";
}
function $n(t) {
  return t.toString().replace(/<\/?(paragraph|heading|blockquote|codeBlock|bulletList|orderedList|listItem|taskList|taskItem|horizontalRule|hardBreak|doc)[^>]*>/g, `
`).replace(/<[^>]+>/g, "").replace(/\n{3,}/g, `

`).trim();
}
function Dn({
  documentId: t,
  documentType: r,
  ws: s,
  userId: o,
  displayName: i,
  color: a = "#3b82f6",
  onMessage: c,
  activityPublish: m,
  isVideoDocked: p,
  onDockVideo: h,
  onUndockVideo: f,
  onBack: u
}) {
  const [l, w] = M(Mn), {
    showHistory: b,
    showMyItems: S,
    showVideoHistory: N,
    toggleHistory: $,
    toggleMyItems: x,
    toggleVideoHistory: k,
    closePanel: v
  } = In(), [R, j] = M(p ?? !1), [C, L] = M(typeof window < "u" ? window.innerWidth : 1400);
  U(() => {
    const y = () => L(window.innerWidth);
    return window.addEventListener("resize", y), () => window.removeEventListener("resize", y);
  }, []);
  const T = C >= 1200, g = C >= 900, [O, H] = M(!1), J = F(null), ee = F(null), [ue, fe] = M(0), [, le] = M(0), G = F(null), de = 146, Z = A(() => {
    if (G.current === null) {
      const D = J.current ?? ee.current;
      D && (G.current = D.getBoundingClientRect().top + window.scrollY);
    }
    const y = G.current ?? 250, I = window.scrollY > y - de;
    H(I), J.current && fe(J.current.getBoundingClientRect().left), ee.current && le(ee.current.getBoundingClientRect().left);
  }, []);
  U(() => {
    const y = () => {
      G.current = null, Z();
    };
    return window.addEventListener("scroll", Z, { passive: !0 }), window.addEventListener("resize", y, { passive: !0 }), () => {
      window.removeEventListener("scroll", Z), window.removeEventListener("resize", y);
    };
  }, [Z]), U(() => {
    const y = setTimeout(() => {
      G.current = null, Z();
    }, 50);
    return () => clearTimeout(y);
  }, [R, Z]);
  const [te, ce] = M(null), [xe, se] = M(!1), [he, be] = M(null), { idToken: E } = un(), P = rn(t, E), {
    meta: B,
    sections: V,
    synced: X,
    updateMeta: W,
    addSection: Le,
    updateSection: yt,
    addItem: Ee,
    updateItem: Oe,
    removeItem: _e,
    getSectionFragment: Be,
    ydoc: ne,
    provider: me,
    exportJSON: vt,
    participants: ge,
    awareness: ie
  } = on({
    documentId: t,
    mode: l,
    ws: s,
    userId: o,
    displayName: i,
    color: a,
    onMessage: c
  }), {
    comments: ye,
    addComment: Ue,
    resolveThread: Ve,
    unresolveThread: Fe
  } = sn({
    documentId: t,
    idToken: E,
    sendMessage: s.sendMessage,
    onMessage: c,
    connectionState: s.connectionState
  }), {
    sectionReviews: wt,
    reviewSection: Nt
  } = an({
    documentId: t,
    idToken: E,
    sendMessage: s.sendMessage,
    onMessage: c,
    connectionState: s.connectionState
  }), kt = at(() => V.map((y) => y.id), [V]), {
    items: Ct,
    addItem: Pe,
    updateItem: ze,
    removeItem: He
  } = ln({
    documentId: t,
    sectionIds: kt,
    idToken: E,
    sendMessage: s.sendMessage,
    onMessage: c,
    connectionState: s.connectionState
  });
  U(() => {
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
  const { demoLoaded: St, handleLoadDemo: Tt, handleClearDocument: It, handleExport: Mt } = Tn({
    documentId: t,
    userId: o,
    ws: s,
    updateMeta: W,
    addSection: Le,
    exportJSON: vt,
    getSectionFragment: Be,
    comments: ye
  }), [ve, qe] = M(null), $t = A((y) => {
    const I = y.lastSeen && Date.now() - y.lastSeen < 3e4, D = y.mode === "reviewer" ? "ack" : y.mode === "reader" ? "reader" : "editor";
    if (l !== D && (w(D), typeof window < "u")) {
      const _ = new URL(window.location.href);
      _.searchParams.set("mode", D), window.history.replaceState({}, "", _.toString());
    }
    y.currentSectionId && setTimeout(() => {
      const _ = document.getElementById(`section-${y.currentSectionId}`);
      _ && (_.scrollIntoView({ behavior: "smooth", block: "center" }), I && (_.style.transition = "box-shadow 0.3s ease", _.style.boxShadow = `0 0 0 3px ${y.color}40`, setTimeout(() => {
        _.style.boxShadow = "";
      }, 2e3)));
    }, 150);
  }, [l, V]), Dt = A((y) => {
    const I = y.userId || y.clientId;
    ce((D) => D === I ? null : I);
  }, []), ae = F(null);
  U(() => {
    if (!te) {
      ae.current = null;
      return;
    }
    const y = ge.find(
      (D) => (D.userId || D.clientId) === te
    );
    if (me?.awareness && me.awareness.getStates().forEach((_, Y) => {
      me.awareness.clientID;
    }), !y || !y.currentSectionId) {
      if (y && V.length > 0) {
        const D = document.getElementById(`section-${V[0].id}`);
        D && !ae.current && (D.scrollIntoView({ behavior: "smooth", block: "start" }), ae.current = "__initial__");
      }
      return;
    }
    if (y.currentSectionId === ae.current) return;
    ae.current = y.currentSectionId;
    const I = y.mode === "reviewer" ? "ack" : y.mode === "reader" ? "reader" : "editor";
    if (l !== I && (w(I), typeof window < "u")) {
      const D = new URL(window.location.href);
      D.searchParams.set("mode", I), window.history.replaceState({}, "", D.toString());
    }
    setTimeout(() => {
      const D = document.getElementById(`section-${y.currentSectionId}`);
      D && (D.scrollIntoView({ behavior: "smooth", block: "center" }), D.style.transition = "box-shadow 0.3s ease", D.style.boxShadow = `0 0 0 3px ${y.color}40`, setTimeout(() => {
        D.style.boxShadow = "";
      }, 1500));
    }, 100);
  }, [te, ge, l, V]);
  const Rt = A(() => {
    ce(null);
  }, []), At = A((y, I) => {
    const D = { id: crypto.randomUUID(), ...I };
    Ee(y, D), Pe(y, D).catch(() => {
    });
    const _ = V.find((Y) => Y.id === y);
    m("doc.add_item", { sectionTitle: _?.title, documentId: t, documentTitle: B?.title });
  }, [Ee, Pe, V, m, t, B?.title]), jt = A((y, I, D) => {
    Oe(y, I, D), ze(y, I, D).catch(() => {
    });
  }, [Oe, ze]), Lt = A((y, I) => {
    _e(y, I), He(y, I).catch(() => {
    });
  }, [_e, He]);
  U(() => {
    if (V.length === 0 || ve) return;
    const y = setTimeout(() => {
      const I = V[0].id;
      qe(I), ie.updateSection(I);
    }, 500);
    return () => clearTimeout(y);
  }, [V, ve, ie]);
  const Et = A((y) => {
    qe(y), ie.updateSection(y);
  }, [ie]), Ke = F(null), [Ot, _t] = M(0), Bt = A((y) => {
    be(y), se(!0), requestAnimationFrame(() => {
      const I = document.getElementById(`section-${y}`), D = Ke.current;
      if (I && D) {
        const _ = I.getBoundingClientRect(), Y = D.getBoundingClientRect();
        _t(_.top - Y.top);
      }
    });
  }, []), Ut = A(() => {
    se(!1);
  }, []), Vt = A((y, I, D) => {
    Ue(y, I, D), m("doc.comment", { sectionId: y, text: I.slice(0, 50), documentId: t, documentTitle: B?.title });
    const _ = I.match(/@[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)*/g);
    if (_ && _.length > 0) {
      const Y = _.map((ke) => ke.slice(1).trim()), z = V.find((ke) => ke.id === y);
      m("doc.mention", {
        sectionId: y,
        sectionTitle: z?.title ?? "",
        mentionedNames: Y,
        commentText: I.slice(0, 80),
        authorName: i,
        documentId: t,
        documentTitle: B?.title
      });
    }
  }, [Ue, m, V, i, t, B?.title]), Ft = A((y, I) => {
    Ve(y, I), m("doc.resolve_thread", { sectionId: y, commentId: I, documentId: t, documentTitle: B?.title });
  }, [Ve, m, t, B?.title]), Pt = A((y, I) => {
    Fe(y, I), m("doc.unresolve_thread", { sectionId: y, commentId: I, reopenedBy: i, documentId: t, documentTitle: B?.title });
  }, [Fe, m, i, t, B?.title]), zt = dn({ sections: V, comments: ye, displayName: i, userId: o }), Ht = A((y) => {
    setTimeout(() => {
      const I = document.getElementById(`section-${y}`);
      I && (I.scrollIntoView({ behavior: "smooth", block: "center" }), I.style.transition = "box-shadow 0.3s ease", I.style.boxShadow = "0 0 0 3px #3b82f640", setTimeout(() => {
        I.style.boxShadow = "";
      }, 2e3));
    }, 150);
  }, []), we = x, qt = $, Kt = k, Wt = A(() => {
    j((y) => !y), v();
  }, [v]);
  U(() => {
    const y = (I) => {
      (I.metaKey || I.ctrlKey) && I.key === "m" && (I.preventDefault(), we());
    };
    return window.addEventListener("keydown", y), () => window.removeEventListener("keydown", y);
  }, [we]);
  const Yt = `doc:${t}`, Ne = cn({
    channel: Yt,
    sendMessage: s.sendMessage,
    onMessage: c
  });
  U(() => {
    b ? Ne.fetchVersions() : Ne.clearPreview();
  }, [b]), U(() => {
    if (!X || !r || !ne) return;
    const y = ne.getMap("meta");
    if (y.get("templateApplied") || ne.getArray("sections").length > 0) return;
    const _ = fn().find((z) => z.name === r);
    if (!_) return;
    ne.transact(() => {
      y.set("templateApplied", !0);
    });
    const Y = (z) => z === "tasks" ? "tasks" : z === "decisions" ? "decisions" : "notes";
    W({
      id: t,
      title: B?.title || _.name,
      sourceType: "notes",
      sourceId: "",
      createdBy: o,
      createdByName: i,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      aiModel: "",
      status: "draft",
      documentType: _.name
    });
    for (const z of _.fields)
      Le({
        id: crypto.randomUUID(),
        type: Y(z.sectionType),
        sectionType: z.sectionType,
        title: z.name,
        collapsed: z.defaultCollapsed,
        placeholder: z.placeholder || void 0,
        items: []
      });
  }, [X, r, ne]);
  const Jt = (y) => {
    if (w(y), typeof window < "u") {
      const I = new URL(window.location.href);
      I.searchParams.set("mode", y), window.history.replaceState({}, "", I.toString());
    }
  }, We = B ?? {
    id: t,
    title: "",
    sourceType: "notes",
    sourceId: "",
    createdBy: "",
    createdAt: "",
    aiModel: "",
    status: "draft"
  }, Zt = We.status === "final", Gt = A(() => {
    window.confirm("Finalize this document? It will become read-only.") && (W({ status: "final" }), m("doc.finalize", { documentId: t, documentTitle: B?.title }));
  }, [W, m, t, B?.title]), Xt = A(() => {
    W({ status: "draft" }), m("doc.unlock", { documentId: t, documentTitle: B?.title });
  }, [W, m, t, B?.title]), Qt = A(() => {
    R && !p && h?.(), u?.();
  }, [R, p, h, u]);
  return {
    // Mode
    mode: l,
    handleModeChange: Jt,
    // Meta
    meta: B,
    headerMeta: We,
    isFinalized: Zt,
    handleFinalize: Gt,
    handleUnlock: Xt,
    updateMeta: W,
    // Sections
    sections: V,
    updateSection: yt,
    getSectionFragment: Be,
    // Document
    ydoc: ne,
    provider: me,
    synced: X,
    demoLoaded: St,
    handleLoadDemo: Tt,
    handleClearDocument: It,
    handleExport: Mt,
    // Participants
    participants: ge,
    awareness: ie,
    // Focus
    focusedSectionId: ve,
    handleSectionFocus: Et,
    handleJumpToUser: $t,
    // Follow
    followingUserId: te,
    handleFollowUser: Dt,
    handleStopFollow: Rt,
    // Comments
    comments: ye,
    commentSidebarOpen: xe,
    commentSectionId: he,
    commentSidebarTop: Ot,
    sectionListRef: Ke,
    handleOpenComments: Bt,
    handleCloseComments: Ut,
    handleAddComment: Vt,
    handleResolveThread: Ft,
    handleUnresolveThread: Pt,
    // Items
    restItems: Ct,
    handleAddItem: At,
    handleUpdateItem: jt,
    handleRemoveItem: Lt,
    // Reviews
    sectionReviews: wt,
    restReviewSection: Nt,
    // Sidebar panels
    showHistory: b,
    showMyItems: S,
    showVideoHistory: N,
    handleToggleHistory: qt,
    handleToggleMyItems: we,
    handleToggleVideoHistory: Kt,
    closePanel: v,
    // Video
    showVideoCall: R,
    setShowVideoCall: j,
    handleToggleVideoCall: Wt,
    videoSessions: P,
    isVideoDocked: p,
    onDockVideo: h,
    onUndockVideo: f,
    // Responsive
    showTOC: T,
    showInlineVideo: g,
    sidebarFixed: O,
    videoSpacerRef: J,
    tocSpacerRef: ee,
    videoLeft: ue,
    FIXED_TOP: de,
    // My items
    myItems: zt,
    handleNavigateToSection: Ht,
    // Version history
    versionHistory: Ne,
    // Navigation
    handleBack: Qt,
    // Identity
    idToken: E,
    // Activity
    activityPublish: m,
    // User
    displayName: i,
    color: a,
    userId: o,
    documentId: t
  };
}
function Rn(t) {
  return t.split(" ").map((r) => r[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function An(t, r = 0.2) {
  const s = t.replace("#", ""), o = parseInt(s, 16), i = Math.max(0, (o >> 16 & 255) * (1 - r)), a = Math.max(0, (o >> 8 & 255) * (1 - r)), c = Math.max(0, (o & 255) * (1 - r));
  return `rgb(${Math.round(i)}, ${Math.round(a)}, ${Math.round(c)})`;
}
function Ge(t) {
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
function Xe(t) {
  if (!t) return "";
  const r = Math.floor((Date.now() - t) / 1e3);
  return r < 5 ? "" : r < 60 ? `, ${r}s` : r < 3600 ? `, ${Math.floor(r / 60)}m` : `, ${Math.floor(r / 3600)}h`;
}
function jn(t) {
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
function Ln({
  participant: t,
  sectionTitle: r,
  onJumpToUser: s,
  onFollowUser: o,
  isFollowing: i
}) {
  const [a, c] = M(!1), m = F(null), p = F(null), h = () => {
    p.current && (clearTimeout(p.current), p.current = null), c(!0);
  }, f = () => {
    p.current = setTimeout(() => c(!1), 150);
  }, u = jn(t.mode), l = t.color || "#3b82f6";
  return /* @__PURE__ */ d(
    "div",
    {
      ref: m,
      className: e("flex flex-col items-center gap-[3px] relative cursor-pointer animate-[presenceFadeIn_0.3s_ease]"),
      onMouseEnter: h,
      onMouseLeave: f,
      onClick: () => s?.(t),
      children: [
        a && /* @__PURE__ */ d(
          "div",
          {
            className: e("absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-[#1e293b] text-white py-2 px-3 rounded-md text-xs whitespace-nowrap z-[100] pointer-events-auto shadow-[0_4px_12px_rgba(0,0,0,0.15)] leading-snug"),
            onMouseEnter: h,
            onMouseLeave: f,
            children: [
              /* @__PURE__ */ n("div", { className: e("font-semibold mb-0.5"), children: t.displayName }),
              /* @__PURE__ */ d("div", { className: e("text-text-tertiary text-[11px]"), children: [
                t.idle ? "away" : Ge(t.mode),
                Xe(t.lastSeen)
              ] }),
              r && /* @__PURE__ */ d("div", { className: e("text-text-tertiary text-[11px] mt-0.5"), children: [
                "§ ",
                r
              ] }),
              o && /* @__PURE__ */ n(
                "div",
                {
                  role: "button",
                  onClick: (w) => {
                    w.stopPropagation(), o(t);
                  },
                  className: e("mt-1 text-[11px] font-semibold cursor-pointer", i ? "text-amber-400" : "text-blue-400"),
                  children: i ? "Stop following" : "Follow"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ d("div", { className: e("relative inline-block"), children: [
          /* @__PURE__ */ n(
            "div",
            {
              className: e("w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-semibold transition-[transform,box-shadow] duration-200 ease-in-out", a ? "scale-110" : "scale-100"),
              style: {
                background: `linear-gradient(135deg, ${l}, ${An(l, 0.2)})`,
                boxShadow: a ? `0 0 0 2px ${l}40` : "none"
              },
              children: Rn(t.displayName)
            }
          ),
          /* @__PURE__ */ n(
            "div",
            {
              className: e("absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white", t.idle ? "bg-amber-400" : "bg-emerald-500 [animation:presencePulse_2s_infinite]")
            }
          )
        ] }),
        /* @__PURE__ */ d(
          "span",
          {
            className: e("text-[11px] font-semibold px-2 py-px rounded-full leading-4"),
            style: {
              background: t.idle ? "#fef3c7" : u.bg,
              color: t.idle ? "#92400e" : u.text
            },
            children: [
              t.idle ? "away" : Ge(t.mode),
              Xe(t.lastSeen)
            ]
          }
        ),
        i && /* @__PURE__ */ n("span", { className: e("text-[10px] font-semibold text-[#3b82f6]"), children: "following" }),
        r && /* @__PURE__ */ d("span", { className: e("text-[10px] text-[#64748b] max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap text-center"), children: [
          "§ ",
          r
        ] })
      ]
    }
  );
}
function En({
  participants: t,
  sections: r,
  onJumpToUser: s,
  onFollowUser: o,
  followingUserId: i
}) {
  const a = /* @__PURE__ */ new Map();
  if (r)
    for (const c of r)
      a.set(c.id, c.title);
  return t.length === 0 ? null : /* @__PURE__ */ d("div", { "data-testid": "participant-avatars", className: e("flex items-center gap-0"), children: [
    /* @__PURE__ */ n("div", { className: e("flex gap-2.5 items-start py-1"), children: t.filter((c, m, p) => p.findIndex((h) => (h.userId || h.clientId) === (c.userId || c.clientId)) === m).map((c) => /* @__PURE__ */ n(
      Ln,
      {
        participant: c,
        sectionTitle: c.currentSectionId ? a.get(c.currentSectionId) : void 0,
        onJumpToUser: s,
        onFollowUser: o,
        isFollowing: i === (c.userId || c.clientId)
      },
      c.clientId
    )) }),
    /* @__PURE__ */ n("div", { className: e("w-px h-9 bg-border mx-1 self-center") })
  ] });
}
const Qe = {
  draft: { bg: "#fef3c7", text: "#92400e" },
  review: { bg: "#dbeafe", text: "#1e40af" },
  final: { bg: "#d1fae5", text: "#065f46" }
}, On = [
  { mode: "editor", label: "Editor" },
  { mode: "ack", label: "Review" },
  { mode: "reader", label: "Read" }
];
function _n({
  meta: t,
  mode: r,
  onModeChange: s,
  participants: o,
  onUpdateMeta: i,
  onExport: a,
  onToggleHistory: c,
  onToggleVideoCall: m,
  onToggleVideoHistory: p,
  isCallActive: h,
  onClearDocument: f,
  onJumpToUser: u,
  sections: l,
  onToggleMyItems: w,
  myItemCount: b,
  commentCount: S,
  onBack: N,
  onFollowUser: $,
  followingUserId: x,
  onFinalize: k,
  onUnlock: v,
  pastCallsCount: R
}) {
  const [j, C] = M(!1), L = Qe[t.status] ?? Qe.draft;
  return /* @__PURE__ */ d("header", { className: e("flex flex-col py-2 px-4 bg-white border-b border-[#e5e7eb] shrink-0 gap-1.5 sticky top-[53px] z-[34]"), children: [
    /* @__PURE__ */ d("div", { className: e("flex items-center justify-between"), children: [
      /* @__PURE__ */ d("div", { className: e("flex items-center gap-2.5"), children: [
        N && /* @__PURE__ */ n(
          "button",
          {
            onClick: N,
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
            onChange: (T) => i({ title: T.target.value })
          }
        ),
        /* @__PURE__ */ n(
          "span",
          {
            className: e("inline-block text-[11px] font-semibold py-0.5 px-2.5 rounded-full"),
            style: { background: L.bg, color: L.text },
            children: t.status
          }
        ),
        r === "editor" && /* @__PURE__ */ n("span", { className: e("text-[11px] text-text-tertiary italic"), children: "Auto-saved" }),
        t.updatedAt && /* @__PURE__ */ d("span", { className: e("text-[11px] text-text-tertiary"), children: [
          "Last edited ",
          (() => {
            const T = Date.now() - new Date(t.updatedAt).getTime(), g = Math.floor(T / 6e4);
            if (g < 1) return "just now";
            if (g < 60) return `${g}m ago`;
            const O = Math.floor(g / 60);
            return O < 24 ? `${O}h ago` : `${Math.floor(O / 24)}d ago`;
          })()
        ] }),
        S != null && S > 0 && /* @__PURE__ */ d("span", { className: e("inline-flex items-center gap-1 text-[11px] font-semibold py-0.5 px-2.5 rounded-full bg-[#f3f4f6] text-[#6b7280]"), children: [
          /* @__PURE__ */ n("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ n("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }) }),
          S
        ] })
      ] }),
      o.length > 0 && /* @__PURE__ */ n(En, { participants: o, sections: l, onJumpToUser: u, onFollowUser: $, followingUserId: x })
    ] }),
    /* @__PURE__ */ d("div", { className: e("flex items-center justify-between flex-wrap gap-1"), children: [
      /* @__PURE__ */ n("div", { className: e("flex gap-1"), children: On.map(({ mode: T, label: g }) => /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          "data-testid": `mode-btn-${T}`,
          className: e(
            "py-1.5 px-3.5 text-[13px] font-semibold border border-[#d1d5db] rounded-md cursor-pointer font-[inherit]",
            r === T ? "bg-[#3b82f6] text-white" : "bg-white text-[#374151]"
          ),
          onClick: () => s(T),
          children: g
        },
        T
      )) }),
      /* @__PURE__ */ d("div", { className: e("flex items-center gap-2"), children: [
        /* @__PURE__ */ d(
          "button",
          {
            type: "button",
            className: e("py-1.5 px-3 text-[13px] font-medium border border-[#d1d5db] rounded-md bg-white text-[#374151] cursor-pointer font-[inherit] relative"),
            onClick: w,
            children: [
              "My Items",
              b ? ` (${b})` : ""
            ]
          }
        ),
        m && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: e(
              "py-1.5 px-3 text-[13px] font-medium border rounded-md cursor-pointer font-[inherit] relative",
              h ? "bg-[#dcfce7] text-[#166534] border-[#86efac]" : "bg-white text-[#374151] border-[#d1d5db]"
            ),
            onClick: m,
            children: h ? "In Call" : "Call"
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
            onClick: k,
            children: "Finalize"
          }
        ),
        /* @__PURE__ */ d("div", { className: e("relative"), children: [
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: e("py-1.5 px-3 text-[13px] font-medium border border-[#d1d5db] rounded-md bg-white text-[#374151] cursor-pointer font-[inherit] relative tracking-wider"),
              onClick: () => C((T) => !T),
              title: "More actions",
              children: "⋯"
            }
          ),
          j && /* @__PURE__ */ d("div", { className: e("absolute top-full right-0 mt-1 bg-white border border-[#e5e7eb] rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50 min-w-[160px] overflow-hidden"), children: [
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: e("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-[#374151] text-left cursor-pointer font-[inherit] hover:bg-[#f3f4f6]"),
                onClick: () => {
                  c(), C(!1);
                },
                children: "History"
              }
            ),
            p && (R ?? 0) > 0 && /* @__PURE__ */ d(
              "button",
              {
                type: "button",
                className: e("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-[#374151] text-left cursor-pointer font-[inherit] hover:bg-[#f3f4f6]"),
                onClick: () => {
                  p(), C(!1);
                },
                children: [
                  "Past Calls (",
                  R,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ n("div", { className: e("border-t border-[#f1f5f9] my-1") }),
            ["markdown", "pdf", "json"].map((T) => /* @__PURE__ */ d(
              "button",
              {
                type: "button",
                className: e("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-[#374151] text-left cursor-pointer font-[inherit] hover:bg-[#f3f4f6]"),
                onClick: () => {
                  a(T), C(!1);
                },
                children: [
                  "Export ",
                  T.charAt(0).toUpperCase() + T.slice(1)
                ]
              },
              T
            )),
            /* @__PURE__ */ n("div", { className: e("border-t border-[#f1f5f9] my-1") }),
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: e("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-[#dc2626] text-left cursor-pointer font-[inherit] hover:bg-[#fff5f5]"),
                onClick: () => {
                  C(!1), window.confirm("Clear all document content? This cannot be undone.") && f();
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
function Bn({
  followingUserId: t,
  participants: r,
  onStopFollow: s
}) {
  const o = F(null);
  if (U(() => {
    if (!t) return;
    const a = setTimeout(() => {
      const c = () => s(), m = ["mousedown", "keydown", "wheel"];
      for (const p of m)
        window.addEventListener(p, c, { once: !0, passive: !0 });
      o.current = () => {
        for (const p of m)
          window.removeEventListener(p, c);
      };
    }, 500);
    return () => {
      clearTimeout(a), o.current?.(), o.current = null;
    };
  }, [t, s]), !t) return null;
  const i = r.find(
    (a) => (a.userId || a.clientId) === t
  );
  return i ? /* @__PURE__ */ d("div", { className: e("flex items-center justify-center gap-2 px-4 py-1.5 bg-[#eff6ff] border-b border-[#bfdbfe] text-[13px] font-medium text-[#1d4ed8] shrink-0"), children: [
    /* @__PURE__ */ d("span", { children: [
      "Following ",
      i.displayName
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
const Re = ({
  children: t,
  variant: r = "light",
  width: s = 320,
  style: o
}) => typeof document > "u" ? null : lt(
  /* @__PURE__ */ n(
    "div",
    {
      className: e(
        "fixed right-0 top-0 h-full z-[60] flex flex-col shadow-[-4px_0_12px_rgba(0,0,0,0.08)]",
        r === "dark" ? "bg-[#111827]" : "bg-surface"
      ),
      style: { width: s, ...o },
      children: t
    }
  ),
  document.body
), Ae = ({
  title: t,
  onClose: r,
  actions: s,
  variant: o = "light"
}) => {
  const i = o === "dark";
  return /* @__PURE__ */ d(
    "div",
    {
      className: e(
        "flex items-center justify-between px-4 py-2",
        i ? "border-b border-white/10" : "border-b border-border"
      ),
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: e(
              "text-[13px] font-semibold",
              i ? "text-white" : "text-text-primary"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ d("div", { className: "flex items-center gap-1", children: [
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
                i ? "text-text-tertiary" : "text-text-secondary"
              ),
              "aria-label": "Close panel",
              children: "×"
            }
          )
        ] })
      ]
    }
  );
}, je = ({
  children: t,
  padding: r
}) => /* @__PURE__ */ n(
  "div",
  {
    className: "flex-1 overflow-y-auto",
    style: { padding: r ?? "14px 12px" },
    children: t
  }
), Un = {
  default: "bg-surface text-text-primary border border-border",
  primary: "bg-[#16a34a] text-white border border-[#16a34a]",
  danger: "bg-danger text-white border border-danger"
}, Vn = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-[13px]"
}, Q = ({
  variant: t = "default",
  size: r = "md",
  style: s,
  type: o = "button",
  className: i,
  ...a
}) => /* @__PURE__ */ n(
  "button",
  {
    type: o,
    className: e(
      "rounded-sm cursor-pointer font-medium leading-[1.4]",
      Un[t],
      Vn[r],
      i
    ),
    style: s,
    ...a
  }
), pe = ({
  active: t = !1,
  activeColor: r = "rgba(255,255,255,0.1)",
  size: s = 36,
  style: o,
  type: i = "button",
  className: a,
  ...c
}) => /* @__PURE__ */ n(
  "button",
  {
    type: i,
    className: e(
      "flex items-center justify-center border-none rounded-full cursor-pointer p-0 text-inherit",
      a
    ),
    style: {
      width: s,
      height: s,
      background: t ? r : "transparent",
      ...o
    },
    ...c
  }
);
function Fn({ participant: t, isSpeaking: r }) {
  const s = F(null);
  return U(() => {
    const o = s.current, i = t.streams[0] ?? null;
    o && i && o.srcObject !== i && (o.srcObject = i);
  }, [t.streams]), /* @__PURE__ */ d(
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
        /* @__PURE__ */ d("div", { className: e("absolute bottom-1.5 left-1.5 flex items-center gap-1 bg-black/60 text-white text-[11px] font-medium px-2 py-[3px] rounded-full"), children: [
          r && /* @__PURE__ */ n("span", { className: e("w-[5px] h-[5px] rounded-full bg-[#34d399]") }),
          /* @__PURE__ */ n("span", { children: t.userId }),
          t.isLocal && /* @__PURE__ */ n("span", { className: e("opacity-50"), children: "(You)" })
        ] })
      ]
    }
  );
}
function Pn({ stream: t, userId: r, cameraStream: s, isLocal: o }) {
  const i = F(null), a = F(null);
  return U(() => {
    const c = i.current;
    c && c.srcObject !== t && (c.srcObject = t);
  }, [t]), U(() => {
    const c = a.current;
    c && s && c.srcObject !== s && (c.srcObject = s);
  }, [s]), /* @__PURE__ */ d("div", { className: e("relative bg-black rounded-[10px] overflow-hidden border-2 border-[#3b82f6] aspect-video"), children: [
    /* @__PURE__ */ n(
      "video",
      {
        ref: i,
        autoPlay: !0,
        playsInline: !0,
        muted: !0,
        className: e("w-full h-full object-contain")
      }
    ),
    o && s && /* @__PURE__ */ n(
      "video",
      {
        ref: a,
        autoPlay: !0,
        playsInline: !0,
        muted: !0,
        className: e("absolute bottom-2 right-2 w-36 object-cover rounded-lg border-2 border-white/30 aspect-video")
      }
    ),
    /* @__PURE__ */ d("div", { className: e("absolute bottom-1.5 left-1.5 bg-[rgba(59,130,246,0.8)] text-white text-[11px] font-medium px-2 py-[3px] rounded-full"), children: [
      r,
      "'s screen"
    ] })
  ] });
}
function zn({ stageToken: t, participantId: r, userId: s, onEndCall: o }) {
  const { participants: i, isJoined: a, isScreenSharing: c, error: m, toggleMute: p, toggleCamera: h, startScreenShare: f, stopScreenShare: u, leave: l } = xn({
    stageToken: t,
    userId: s,
    participantId: r
  }), { activeSpeakerId: w } = hn({ participants: i }), [b, S] = M(!1), [N, $] = M(!1), [x, k] = M(!1), v = at(
    () => i.map((C) => ({
      ...C,
      isSpeaking: C.participantId === w
    })),
    [i, w]
  ), R = v.find((C) => C.screenStream), j = () => {
    l(), o();
  };
  return m ? /* @__PURE__ */ d("div", { className: e("p-4 text-center text-[#dc2626] text-[13px]"), children: [
    m,
    /* @__PURE__ */ n("br", {}),
    /* @__PURE__ */ n(Q, { onClick: o, className: "mt-3", children: "Close" })
  ] }) : a ? /* @__PURE__ */ d(
    "div",
    {
      className: e("flex flex-col"),
      onMouseEnter: () => k(!0),
      onMouseLeave: () => k(!1),
      children: [
        R?.screenStream && /* @__PURE__ */ n("div", { className: e("p-1.5 pb-0"), children: /* @__PURE__ */ n(
          Pn,
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
            children: v.map((C) => /* @__PURE__ */ n(Fn, { participant: C, isSpeaking: C.isSpeaking }, C.participantId))
          }
        ),
        /* @__PURE__ */ d(
          "div",
          {
            className: e("flex justify-center gap-1 px-2 py-1.5 border-t border-[#374151] shrink-0 transition-opacity duration-200", x ? "opacity-100" : "opacity-0"),
            children: [
              /* @__PURE__ */ n(
                pe,
                {
                  onClick: () => {
                    S(!b), p(!b);
                  },
                  title: b ? "Unmute" : "Mute",
                  active: b,
                  activeColor: "#dc2626",
                  style: { color: "#fff", background: b ? "#dc2626" : "rgba(255,255,255,0.1)" },
                  children: b ? "🔇" : "🔊"
                }
              ),
              /* @__PURE__ */ n(
                pe,
                {
                  onClick: () => {
                    $(!N), h(N);
                  },
                  title: N ? "Camera On" : "Camera Off",
                  active: N,
                  activeColor: "#dc2626",
                  style: { color: "#fff", background: N ? "#dc2626" : "rgba(255,255,255,0.1)" },
                  children: N ? "🚫" : "📷"
                }
              ),
              /* @__PURE__ */ n(
                pe,
                {
                  onClick: () => c ? u() : f(),
                  title: c ? "Stop Sharing" : "Share Screen",
                  active: c,
                  activeColor: "#646cff",
                  style: { color: "#fff", background: c ? "#646cff" : "rgba(255,255,255,0.1)" },
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
        /* @__PURE__ */ d("div", { className: e("text-center text-[10px] text-[#6b7280] py-1"), children: [
          i.length,
          " in call"
        ] })
      ]
    }
  ) : /* @__PURE__ */ n("div", { className: e("p-5 text-center text-[#6b7280] text-[13px]"), children: "Connecting to video..." });
}
function Hn({
  documentId: t,
  userId: r,
  idToken: s,
  meta: o,
  updateMeta: i,
  sendMessage: a,
  onClose: c,
  onDockToSidebar: m,
  isDocked: p,
  onUndock: h,
  onCallEnd: f
}) {
  const {
    callState: u,
    stageToken: l,
    participantId: w,
    userId: b,
    error: S,
    hasActiveCall: N,
    startCall: $,
    joinCall: x,
    endCall: k
  } = mn({ documentId: t, idToken: s, meta: o, updateMeta: i, sendMessage: a, displayName: r }), v = F(u);
  U(() => {
    v.current === "active" && u === "idle" && f?.(), v.current = u;
  }, [u, f]);
  const R = o?.activeCallSessionId;
  return /* @__PURE__ */ d("div", { className: e("bg-[#111827] border border-[#374151] rounded-xl overflow-hidden"), children: [
    /* @__PURE__ */ d("div", { className: e("flex items-center justify-between px-2 py-1 border-b border-[#374151] shrink-0"), children: [
      /* @__PURE__ */ n("span", { className: e("text-[11px] font-semibold text-[#9ca3af] m-0"), children: "Video" }),
      /* @__PURE__ */ d("div", { className: e("flex items-center gap-0.5"), children: [
        m && !p && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: m,
            title: "Dock to sidebar",
            className: e("w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-[#9ca3af] cursor-pointer text-xs leading-none p-0"),
            children: "←"
          }
        ),
        p && h && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: h,
            title: "Undock from sidebar",
            className: e("w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-[#9ca3af] cursor-pointer text-xs leading-none p-0"),
            children: "→"
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: c,
            title: "Close video",
            className: e("w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-[#9ca3af] cursor-pointer text-sm leading-none p-0"),
            children: "✕"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ d("div", { children: [
      u === "active" && l && w && b && /* @__PURE__ */ n(
        zn,
        {
          stageToken: l,
          participantId: w,
          userId: b,
          onEndCall: k
        }
      ),
      (u === "creating" || u === "joining") && /* @__PURE__ */ n("div", { className: e("p-4 text-center text-[#9ca3af] text-[13px]"), children: u === "creating" ? "Starting call..." : "Joining call..." }),
      u === "error" && /* @__PURE__ */ d("div", { className: e("p-4 text-center"), children: [
        /* @__PURE__ */ n("div", { className: e("text-[#f87171] text-[13px] mb-3"), children: S }),
        /* @__PURE__ */ n(Q, { variant: "primary", onClick: () => $(), children: "Try Again" })
      ] }),
      u === "idle" && /* @__PURE__ */ n("div", { className: e("p-4 text-center"), children: N && R ? /* @__PURE__ */ d(K, { children: [
        /* @__PURE__ */ n("div", { className: e("text-[13px] text-[#d1d5db] mb-3"), children: "A call is in progress on this document." }),
        /* @__PURE__ */ n(Q, { variant: "primary", onClick: () => x(R), children: "Join Call" })
      ] }) : /* @__PURE__ */ d(K, { children: [
        /* @__PURE__ */ n("div", { className: e("text-[13px] text-[#9ca3af] mb-3"), children: "Start a video call with collaborators on this document." }),
        /* @__PURE__ */ n(Q, { variant: "primary", onClick: $, children: "Start Call" })
      ] }) })
    ] })
  ] });
}
const qn = {
  summary: "#8b5cf6",
  tasks: "#3b82f6",
  decisions: "#f59e0b",
  notes: "#6b7280",
  custom: "#10b981"
};
function Kn(t) {
  return t.split(" ").map((r) => r[0] ?? "").join("").toUpperCase().slice(0, 2);
}
const Ce = 3;
function Wn({ participants: t }) {
  if (!t || t.length === 0) return null;
  const r = t.slice(0, Ce), s = t.length - Ce;
  return /* @__PURE__ */ d("div", { className: e("flex items-center ml-auto shrink-0"), children: [
    r.map((o, i) => /* @__PURE__ */ d(
      "div",
      {
        title: `${o.displayName} (${o.mode})`,
        className: e("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold border-2 border-white relative transition-transform duration-200"),
        style: {
          background: `linear-gradient(135deg, ${o.color || "#3b82f6"}, ${Yn(o.color || "#3b82f6", 0.2)})`,
          marginLeft: i === 0 ? 0 : -8,
          zIndex: Ce - i
        },
        children: [
          Kn(o.displayName),
          /* @__PURE__ */ n("div", { className: e("absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#10b981] border-2 border-white") })
        ]
      },
      o.clientId
    )),
    s > 0 && /* @__PURE__ */ d(
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
function Yn(t, r) {
  const s = t.replace("#", ""), o = parseInt(s, 16), i = Math.max(0, (o >> 16 & 255) * (1 - r)), a = Math.max(0, (o >> 8 & 255) * (1 - r)), c = Math.max(0, (o & 255) * (1 - r));
  return `rgb(${Math.round(i)}, ${Math.round(a)}, ${Math.round(c)})`;
}
function Jn({
  section: t,
  fragment: r,
  ydoc: s,
  provider: o,
  user: i,
  editable: a,
  onUpdateSection: c,
  onAddItem: m,
  onUpdateItem: p,
  onRemoveItem: h,
  participants: f,
  onFocus: u,
  isFocused: l,
  comments: w,
  onUpdateCursorInfo: b,
  commentCount: S = 0,
  onOpenComments: N,
  commentPresence: $
}) {
  const [x, k] = M(t.collapsed), v = () => {
    const g = !x;
    k(g), c({ collapsed: g });
  }, R = gn(t.sectionType ?? t.type, "editor") ?? bn, j = f && f.length > 0, C = j ? f[0].color || "#3b82f6" : "transparent", [L, T] = M(!1);
  return /* @__PURE__ */ d(
    "div",
    {
      id: `section-${t.id}`,
      "data-testid": `section-block-${t.id}`,
      className: e("border border-border rounded-lg mb-4 bg-white relative transition-[border-left,box-shadow] duration-300 ease-in-out"),
      style: {
        borderLeft: j ? `3px solid ${C}` : "1px solid #e2e8f0",
        boxShadow: l ? "0 0 0 2px rgba(59, 130, 246, 0.3)" : "none"
      },
      onClickCapture: u,
      onFocusCapture: u,
      children: [
        N && /* @__PURE__ */ d(
          "button",
          {
            type: "button",
            onClick: (g) => {
              g.stopPropagation(), N(t.id);
            },
            onMouseEnter: () => T(!0),
            onMouseLeave: () => T(!1),
            className: e(
              "absolute top-1/2 -right-[52px] -translate-y-1/2 w-10 h-10 rounded-full border border-border flex items-center justify-center text-xl leading-none p-0 z-[1] shadow-sm cursor-pointer transition-[opacity,background] duration-150 ease-in-out",
              L ? "bg-surface-hover opacity-90" : "bg-white opacity-40"
            ),
            title: "Open comments",
            children: [
              /* @__PURE__ */ n("span", { className: e("pointer-events-none"), children: "💬" }),
              S > 0 && /* @__PURE__ */ n("span", { className: e("absolute -top-1 -right-1 min-w-[16px] h-4 rounded-lg bg-[#3b82f6] text-white text-[10px] font-bold flex items-center justify-center px-1 leading-none"), children: S }),
              $ && $.length > 0 && /* @__PURE__ */ n("span", { className: e("absolute -left-1 top-1/2 -translate-y-1/2 flex flex-col gap-0.5"), children: $.slice(0, 3).map((g) => /* @__PURE__ */ n(
                "span",
                {
                  title: g.displayName,
                  className: e("w-2 h-2 rounded-full border border-white block"),
                  style: { background: g.color || "#3b82f6" }
                },
                g.clientId
              )) })
            ]
          }
        ),
        /* @__PURE__ */ d("div", { className: e("flex items-center gap-2 py-2.5 px-3.5 bg-[#f8fafc] border-b border-border rounded-t-lg"), children: [
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: v,
              className: e(
                "border-none bg-transparent cursor-pointer text-xs p-1 text-[#64748b] leading-none rounded inline-flex items-center justify-center transition-[background,transform] duration-200 ease-in-out hover:bg-border",
                x ? "-rotate-90" : "rotate-0"
              ),
              title: x ? "Expand section" : "Collapse section",
              children: /* @__PURE__ */ n("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ n("polyline", { points: "6 9 12 15 18 9" }) })
            }
          ),
          /* @__PURE__ */ n(
            "input",
            {
              type: "text",
              value: t.title,
              onChange: (g) => c({ title: g.target.value }),
              readOnly: !a,
              className: e("flex-1 border border-transparent rounded outline-none text-[15px] font-semibold font-[inherit] bg-transparent text-[#1e293b] py-0.5 px-1.5 cursor-text focus:border-[#3b82f6]")
            }
          ),
          /* @__PURE__ */ n(
            "span",
            {
              className: e("py-0.5 px-2.5 text-[11px] font-semibold rounded-xl text-white capitalize whitespace-nowrap"),
              style: { background: qn[t.type] },
              children: t.type
            }
          ),
          /* @__PURE__ */ n(Wn, { participants: f ?? [] })
        ] }),
        !x && /* @__PURE__ */ n("div", { className: e("p-3.5"), children: /* @__PURE__ */ n(
          R,
          {
            section: t,
            viewMode: "editor",
            editable: a,
            fragment: r,
            ydoc: s,
            provider: o,
            user: i,
            onUpdateSection: c,
            onAddItem: m,
            onUpdateItem: p,
            onRemoveItem: h,
            participants: f,
            onUpdateCursorInfo: b,
            comments: w,
            commentCount: S,
            onOpenComments: N
          }
        ) })
      ]
    }
  );
}
function Zn({
  sections: t,
  getSectionFragment: r,
  ydoc: s,
  provider: o,
  user: i,
  editable: a,
  onUpdateSection: c,
  onAddItem: m,
  onUpdateItem: p,
  onRemoveItem: h,
  participants: f,
  onSectionFocus: u,
  focusedSectionId: l,
  comments: w,
  onAddComment: b,
  onResolveThread: S,
  onUnresolveThread: N,
  onUpdateCursorInfo: $,
  onOpenComments: x
}) {
  return /* @__PURE__ */ n("div", { className: e("flex flex-col gap-0 pb-4"), children: t.map((k) => /* @__PURE__ */ n(
    Jn,
    {
      section: k,
      fragment: r(k.id),
      ydoc: s,
      provider: o,
      user: i,
      editable: a,
      onUpdateSection: (v) => c(k.id, v),
      onAddItem: (v) => m(k.id, v),
      onUpdateItem: (v, R) => p(k.id, v, R),
      onRemoveItem: (v) => h(k.id, v),
      participants: f?.filter((v) => v.currentSectionId === k.id),
      onFocus: () => u?.(k.id),
      isFocused: l === k.id,
      comments: w?.[k.id] ?? [],
      onAddComment: (v, R) => b?.(k.id, v, R),
      onResolveThread: (v) => S?.(k.id, v),
      onUnresolveThread: (v) => N?.(k.id, v),
      onUpdateCursorInfo: $,
      commentCount: (w?.[k.id] ?? []).length,
      onOpenComments: x
    },
    k.id
  )) });
}
function mt(t) {
  return `ws_attachments_${t}`;
}
function Gn(t) {
  try {
    const r = localStorage.getItem(mt(t));
    return r ? JSON.parse(r) : [];
  } catch {
    return [];
  }
}
function Xn(t) {
  const [r, s] = M(
    () => Gn(t)
  ), o = (m) => {
    localStorage.setItem(mt(t), JSON.stringify(m)), s(m);
  };
  return { attachments: r, addFile: (m, p) => {
    o([
      ...r,
      { id: crypto.randomUUID(), kind: "file", name: m.trim(), url: p.trim(), addedAt: (/* @__PURE__ */ new Date()).toISOString() }
    ]);
  }, addDocumentLink: (m) => {
    o([
      ...r,
      { id: crypto.randomUUID(), kind: "document", title: m.trim(), addedAt: (/* @__PURE__ */ new Date()).toISOString() }
    ]);
  }, remove: (m) => {
    o(r.filter((p) => p.id !== m));
  } };
}
function Qn({ onAdd: t, onCancel: r }) {
  const [s, o] = M(""), [i, a] = M(""), c = s.trim().length > 0 && i.trim().length > 0;
  return /* @__PURE__ */ d("div", { className: e("flex gap-2 items-start flex-wrap"), children: [
    /* @__PURE__ */ n(
      "input",
      {
        autoFocus: !0,
        placeholder: "File name",
        value: s,
        onChange: (m) => o(m.target.value),
        className: e("flex-1 min-w-[120px] border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none")
      }
    ),
    /* @__PURE__ */ n(
      "input",
      {
        placeholder: "URL or path",
        value: i,
        onChange: (m) => a(m.target.value),
        onKeyDown: (m) => {
          m.key === "Enter" && c && t(s, i);
        },
        className: e("flex-[2] min-w-[120px] border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none")
      }
    ),
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        disabled: !c,
        onClick: () => {
          c && t(s, i);
        },
        className: e("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"),
        children: "Attach"
      }
    ),
    /* @__PURE__ */ n("button", { type: "button", onClick: r, className: e("px-3 py-1.5 text-[13px] bg-transparent border-none text-[#64748b] cursor-pointer font-[inherit] shrink-0"), children: "Cancel" })
  ] });
}
function er({ onAdd: t, onCancel: r }) {
  const [s, o] = M(""), i = s.trim().length > 0;
  return /* @__PURE__ */ d("div", { className: e("flex gap-2 items-center flex-wrap"), children: [
    /* @__PURE__ */ n(
      "input",
      {
        autoFocus: !0,
        placeholder: "Document name",
        value: s,
        onChange: (a) => o(a.target.value),
        onKeyDown: (a) => {
          a.key === "Enter" && i && t(s);
        },
        className: e("flex-1 min-w-[120px] border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none")
      }
    ),
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        disabled: !i,
        onClick: () => {
          i && t(s);
        },
        className: e("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"),
        children: "Link"
      }
    ),
    /* @__PURE__ */ n("button", { type: "button", onClick: r, className: e("px-3 py-1.5 text-[13px] bg-transparent border-none text-[#64748b] cursor-pointer font-[inherit] shrink-0"), children: "Cancel" })
  ] });
}
function tr({ attachment: t, onRemove: r, editable: s }) {
  const o = t.kind === "file";
  return /* @__PURE__ */ d("div", { className: e("flex items-center gap-2.5 px-2.5 py-[7px] rounded-md bg-[#f8fafc] border border-border"), children: [
    /* @__PURE__ */ n("span", { className: e("text-sm shrink-0 text-[#64748b]"), children: o ? "📎" : "📄" }),
    /* @__PURE__ */ d("div", { className: e("flex-1 min-w-0"), children: [
      o ? /* @__PURE__ */ n(
        "a",
        {
          href: t.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: e("text-[13px] text-[#2563eb] font-medium no-underline hover:underline"),
          children: t.name
        }
      ) : /* @__PURE__ */ n("span", { className: e("text-[13px] text-text-primary font-medium"), children: t.title }),
      /* @__PURE__ */ n("div", { className: e("text-[11px] text-text-tertiary mt-px"), children: o ? t.url : "Linked document" })
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
function nr({ documentId: t, editable: r }) {
  const { attachments: s, addFile: o, addDocumentLink: i, remove: a } = Xn(t), [c, m] = M(null), p = s.length > 0;
  return /* @__PURE__ */ d("div", { className: e("mt-4 border border-border rounded-[10px] overflow-hidden"), children: [
    /* @__PURE__ */ d("div", { className: e(
      "flex items-center justify-between px-3.5 py-2.5 bg-[#f8fafc]",
      p || c ? "border-b border-border" : ""
    ), children: [
      /* @__PURE__ */ d("span", { className: e("text-[13px] font-semibold text-[#374151]"), children: [
        "Attachments",
        p && /* @__PURE__ */ n("span", { className: e("ml-1.5 text-[11px] text-text-tertiary font-normal"), children: s.length })
      ] }),
      r && c === null && /* @__PURE__ */ d("div", { className: e("flex gap-1.5"), children: [
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
    p && /* @__PURE__ */ n("div", { className: e("flex flex-col gap-1.5 px-3.5 py-2.5"), children: s.map((h) => /* @__PURE__ */ n(
      tr,
      {
        attachment: h,
        onRemove: () => a(h.id),
        editable: r
      },
      h.id
    )) }),
    c === "file" && /* @__PURE__ */ n("div", { className: e("px-3.5 py-2.5", p ? "border-t border-border" : ""), children: /* @__PURE__ */ n(
      Qn,
      {
        onAdd: (h, f) => {
          o(h, f), m(null);
        },
        onCancel: () => m(null)
      }
    ) }),
    c === "document" && /* @__PURE__ */ n("div", { className: e("px-3.5 py-2.5", p ? "border-t border-border" : ""), children: /* @__PURE__ */ n(
      er,
      {
        onAdd: (h) => {
          i(h), m(null);
        },
        onCancel: () => m(null)
      }
    ) }),
    !p && !c && /* @__PURE__ */ n("div", { className: e("px-3.5 py-3.5 text-xs text-text-tertiary text-center"), children: r ? "No attachments yet — add a file or link a document above." : "No attachments." })
  ] });
}
function rr(t) {
  const r = t.trim().split(/\s+/);
  return r.length === 0 ? "?" : r.length === 1 ? r[0].charAt(0).toUpperCase() : (r[0].charAt(0) + r[r.length - 1].charAt(0)).toUpperCase();
}
const pt = en(
  function({ query: r, users: s, position: o, onSelect: i, onDismiss: a }, c) {
    const [m, p] = M(0), h = F(null), f = s.filter(
      (l) => l.displayName.toLowerCase().includes(r.toLowerCase())
    ).slice(0, 6);
    U(() => {
      p(0);
    }, [r]), U(() => {
      const l = h.current;
      if (!l) return;
      const w = l.children[m];
      w && w.scrollIntoView({ block: "nearest" });
    }, [m]);
    const u = A(
      (l) => l.key === "ArrowDown" ? (l.preventDefault(), p((w) => (w + 1) % Math.max(f.length, 1)), !0) : l.key === "ArrowUp" ? (l.preventDefault(), p((w) => (w - 1 + Math.max(f.length, 1)) % Math.max(f.length, 1)), !0) : l.key === "Enter" || l.key === "Tab" ? (l.preventDefault(), f.length > 0 && i(f[m]), !0) : l.key === "Escape" ? (l.preventDefault(), a(), !0) : !1,
      [f, m, i, a]
    );
    return tn(c, () => ({ handleKeyDown: u }), [u]), nn.createPortal(
      /* @__PURE__ */ n(
        "div",
        {
          ref: h,
          role: "listbox",
          className: e("fixed z-[1000] bg-white border border-border rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.12)] max-h-60 overflow-y-auto min-w-[200px]"),
          style: { top: o.top, left: o.left },
          children: f.length === 0 ? /* @__PURE__ */ n("div", { className: e("px-4 py-3 text-[13px] text-text-tertiary text-center"), children: "No users found" }) : f.map((l, w) => /* @__PURE__ */ d(
            "div",
            {
              role: "option",
              "aria-selected": w === m,
              className: e(
                "flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors duration-100",
                w === m ? "bg-[#eff6ff]" : "bg-transparent"
              ),
              onMouseEnter: () => p(w),
              onMouseDown: (b) => {
                b.preventDefault(), i(l);
              },
              children: [
                /* @__PURE__ */ n(
                  "div",
                  {
                    className: e("w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[11px] font-semibold text-white leading-none"),
                    style: { background: l.color },
                    children: l.type === "group" ? "#" : rr(l.displayName)
                  }
                ),
                /* @__PURE__ */ d("div", { className: e("flex items-center gap-1.5 flex-1 min-w-0"), children: [
                  /* @__PURE__ */ n("span", { className: e("text-[13px] font-medium text-[#1e293b] overflow-hidden text-ellipsis whitespace-nowrap"), children: l.type === "group" ? `@${l.displayName.toLowerCase()}` : l.displayName }),
                  l.type === "user" && /* @__PURE__ */ n("span", { className: e("w-2 h-2 rounded-full shrink-0", l.online ? "bg-emerald-500" : "bg-text-disabled") }),
                  l.type === "user" && l.mode && /* @__PURE__ */ n("span", { className: e("text-[11px] text-text-tertiary shrink-0"), children: l.mode }),
                  l.type === "group" && l.memberCount != null && /* @__PURE__ */ d("span", { className: e("text-[11px] text-text-tertiary shrink-0"), children: [
                    l.memberCount,
                    " members"
                  ] })
                ] })
              ]
            },
            l.userId
          ))
        }
      ),
      document.body
    );
  }
);
function or(t) {
  return t.split(" ").map((r) => r[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function Se(t) {
  try {
    const r = Date.now() - new Date(t).getTime(), s = Math.floor(r / 1e3);
    if (s < 60) return "just now";
    const o = Math.floor(s / 60);
    if (o < 60) return `${o}m ago`;
    const i = Math.floor(o / 60);
    return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
  } catch {
    return "";
  }
}
function ut(t) {
  let r = 0;
  for (const s of t)
    r += 1 + ut(s.replies);
  return r;
}
function sr(t) {
  return t.split(/(@[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)*)/g).map(
    (s, o) => s.startsWith("@") && /^@[A-Z]/.test(s) ? /* @__PURE__ */ n(
      "span",
      {
        className: e("text-[#3b82f6] font-semibold bg-[#eff6ff] px-0.5 rounded-sm"),
        children: s
      },
      o
    ) : s
  );
}
const q = {
  active: !1,
  query: "",
  position: { top: 0, left: 0 },
  atIndex: -1
};
function ft(t, r, s) {
  let o = r - 1;
  for (; o >= 0 && t[o] !== "@" && t[o] !== " " && t[o] !== `
`; )
    o--;
  if (o < 0 || t[o] !== "@" || o > 0 && t[o - 1] !== " " && t[o - 1] !== `
`)
    return q;
  const i = t.slice(o + 1, r), a = s?.getBoundingClientRect(), c = a ? { top: a.bottom + 4, left: a.left } : { top: 28, left: 0 };
  return { active: !0, query: i, position: c, atIndex: o };
}
function xt(t, r, s) {
  const o = t.slice(0, r.atIndex), i = t.slice(r.atIndex + 1 + r.query.length), a = `@${s.displayName} `;
  return {
    newValue: o + a + i,
    newCursor: o.length + a.length
  };
}
function ht({
  comment: t,
  depth: r,
  onReply: s,
  mentionUsers: o,
  onResolveThread: i,
  onUnresolveThread: a
}) {
  const [c, m] = M(!1), [p, h] = M(""), [f, u] = M(!1), l = F(null), w = F(null), [b, S] = M(q), [N, $] = M(!1), x = r === 0 && !!t.resolved, k = Math.min(r, 5), v = () => {
    if (b.active) return;
    const T = p.trim();
    T && (s(t.id, T), h(""), m(!1), S(q));
  }, R = (T) => {
    const g = T.target.value;
    h(g);
    const O = T.target.selectionStart ?? g.length, H = ft(g, O, l.current);
    S(H);
  }, j = A(
    (T) => {
      const { newValue: g, newCursor: O } = xt(p, b, T);
      h(g), S(q), requestAnimationFrame(() => {
        const H = l.current;
        H && (H.focus(), H.setSelectionRange(O, O));
      });
    },
    [p, b]
  ), C = (T) => {
    b.active && w.current && w.current.handleKeyDown(T) || (T.key === "Enter" && !T.shiftKey && (T.preventDefault(), v()), T.key === "Escape" && m(!1));
  }, L = f ? t.color : r === 0 ? "#e2e8f0" : "#cbd5e1";
  return x && !N ? /* @__PURE__ */ n("div", { className: e(k > 0 ? "ml-5" : "ml-0"), children: /* @__PURE__ */ d(
    "div",
    {
      className: e("bg-[#f0fdf4] border-l-[3px] border-l-[#22c55e] px-3 py-2 mb-1 rounded cursor-pointer flex items-center justify-between"),
      onClick: () => $(!0),
      children: [
        /* @__PURE__ */ d("div", { className: e("flex items-center gap-1.5"), children: [
          /* @__PURE__ */ n("span", { className: e("text-[#16a34a] text-xs"), children: "✔" }),
          /* @__PURE__ */ d("span", { className: e("text-[#16a34a] text-xs font-semibold"), children: [
            "Resolved by ",
            t.resolvedBy
          ] }),
          t.resolvedAt && /* @__PURE__ */ n("span", { className: e("text-[#86efac] text-[11px]"), children: Se(t.resolvedAt) }),
          /* @__PURE__ */ n("span", { className: e("text-text-tertiary text-[11px] ml-1"), children: "— click to expand" })
        ] }),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: (T) => {
              T.stopPropagation(), a?.(t.id);
            },
            className: e("bg-transparent border border-[#cbd5e1] rounded px-2 py-0.5 text-[#64748b] text-[11px] cursor-pointer font-[inherit]"),
            children: "Reopen"
          }
        )
      ]
    }
  ) }) : /* @__PURE__ */ d("div", { className: e(k > 0 ? "ml-5" : "ml-0", x ? "opacity-60" : ""), children: [
    x && N && /* @__PURE__ */ d(
      "div",
      {
        className: e("bg-[#f0fdf4] border-l-[3px] border-l-[#22c55e] px-3 py-2 mb-1 rounded cursor-pointer flex items-center justify-between"),
        onClick: () => $(!1),
        children: [
          /* @__PURE__ */ d("div", { className: e("flex items-center gap-1.5"), children: [
            /* @__PURE__ */ n("span", { className: e("text-[#16a34a] text-xs"), children: "✔" }),
            /* @__PURE__ */ d("span", { className: e("text-[#16a34a] text-xs font-semibold"), children: [
              "Resolved by ",
              t.resolvedBy
            ] }),
            t.resolvedAt && /* @__PURE__ */ n("span", { className: e("text-[#86efac] text-[11px]"), children: Se(t.resolvedAt) }),
            /* @__PURE__ */ n("span", { className: e("text-text-tertiary text-[11px] ml-1"), children: "— click to collapse" })
          ] }),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: (T) => {
                T.stopPropagation(), a?.(t.id);
              },
              className: e("bg-transparent border border-[#cbd5e1] rounded px-2 py-0.5 text-[#64748b] text-[11px] cursor-pointer font-[inherit]"),
              children: "Reopen"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ d(
      "div",
      {
        className: e("px-3 py-2 mb-1 transition-colors duration-200"),
        style: { borderLeft: `3px solid ${L}` },
        onMouseEnter: () => u(!0),
        onMouseLeave: () => u(!1),
        children: [
          /* @__PURE__ */ d("div", { className: e("flex items-center gap-1.5 mb-1"), children: [
            /* @__PURE__ */ n(
              "div",
              {
                className: e("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold shrink-0"),
                style: { background: `linear-gradient(135deg, ${t.color}, ${t.color}dd)` },
                children: or(t.displayName)
              }
            ),
            /* @__PURE__ */ n("span", { className: e("font-semibold text-[13px] text-[#1e293b]"), children: t.displayName }),
            /* @__PURE__ */ n("span", { className: e("text-[11px] text-text-tertiary"), children: Se(t.timestamp) })
          ] }),
          /* @__PURE__ */ n("div", { className: e("text-[13px] leading-normal text-[#334155] pl-[30px] whitespace-pre-wrap"), children: sr(t.text) }),
          /* @__PURE__ */ d("div", { className: e("pl-[30px] mt-1 flex gap-2"), children: [
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                onClick: () => {
                  m(!c), c || setTimeout(() => l.current?.focus(), 50);
                },
                className: e("bg-transparent border-none text-[#64748b] text-xs cursor-pointer py-0.5 px-0 font-[inherit]"),
                children: "Reply"
              }
            ),
            r === 0 && !x && i && /* @__PURE__ */ d(
              "button",
              {
                type: "button",
                onClick: () => i(t.id),
                className: e("bg-transparent border-none text-[#64748b] text-xs cursor-pointer py-0.5 px-0 font-[inherit]"),
                children: [
                  "✔",
                  " Resolve"
                ]
              }
            )
          ] }),
          c && /* @__PURE__ */ d("div", { className: e("pl-[30px] mt-2 overflow-hidden animate-[sectionCommentsSlideDown_0.2s_ease-out]"), children: [
            /* @__PURE__ */ d("div", { className: e("relative"), children: [
              /* @__PURE__ */ n(
                "textarea",
                {
                  ref: l,
                  value: p,
                  onChange: R,
                  onKeyDown: C,
                  placeholder: "Write a reply... (type @ to mention)",
                  rows: 2,
                  className: e("w-full border border-border rounded-md px-2.5 py-1.5 text-[13px] font-[inherit] outline-none resize-y min-h-12 box-border text-[#1e293b] bg-white")
                }
              ),
              b.active && /* @__PURE__ */ n(
                pt,
                {
                  ref: w,
                  query: b.query,
                  users: o,
                  position: b.position,
                  onSelect: j,
                  onDismiss: () => S(q)
                }
              )
            ] }),
            /* @__PURE__ */ d("div", { className: e("flex gap-1.5 mt-1.5"), children: [
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
    t.replies.map((T) => /* @__PURE__ */ n(
      ht,
      {
        comment: T,
        depth: r + 1,
        onReply: s,
        mentionUsers: o,
        onResolveThread: i,
        onUnresolveThread: a
      },
      T.id
    ))
  ] });
}
function bt({
  comments: t,
  onAddComment: r,
  participants: s = [],
  onResolveThread: o,
  onUnresolveThread: i
}) {
  const [a, c] = M(!0), [m, p] = M(""), h = F(null), f = F(null), [u, l] = M(q), w = pn(s), b = ut(t), [S, N] = M(!0), $ = [...t].sort((C, L) => {
    if (C.resolved && !L.resolved) return 1;
    if (!C.resolved && L.resolved) return -1;
    const T = new Date(C.timestamp).getTime(), g = new Date(L.timestamp).getTime();
    return S ? g - T : T - g;
  }), x = () => {
    if (u.active) return;
    const C = m.trim();
    C && (r(C, null), p(""), l(q));
  }, k = (C) => {
    const L = C.target.value;
    p(L);
    const T = C.target.selectionStart ?? L.length, g = ft(L, T, h.current);
    l(g);
  }, v = A(
    (C) => {
      const { newValue: L, newCursor: T } = xt(m, u, C);
      p(L), l(q), requestAnimationFrame(() => {
        const g = h.current;
        g && (g.focus(), g.setSelectionRange(T, T));
      });
    },
    [m, u]
  ), R = (C) => {
    u.active && f.current && f.current.handleKeyDown(C) || C.key === "Enter" && !C.shiftKey && (C.preventDefault(), x());
  }, j = (C, L) => {
    r(L, C);
  };
  return /* @__PURE__ */ d("div", { children: [
    /* @__PURE__ */ d(
      "button",
      {
        type: "button",
        onClick: () => {
          c((C) => !C), a || setTimeout(() => h.current?.focus(), 100);
        },
        className: e(
          "inline-flex items-center gap-1 mt-2.5 px-2.5 py-1 text-xs font-medium border border-border rounded-md cursor-pointer font-[inherit]",
          b > 0 ? "bg-[#f0f9ff] text-[#2563eb]" : "bg-transparent text-[#64748b]"
        ),
        children: [
          a ? "▼" : "▶",
          " Comments",
          b > 0 ? ` (${b})` : ""
        ]
      }
    ),
    a && /* @__PURE__ */ d("div", { className: e("mt-2 border border-border rounded-lg bg-[#f8fafc] overflow-hidden animate-[sectionCommentsSlideDown_0.2s_ease-out]"), children: [
      /* @__PURE__ */ d("div", { className: e("flex items-start gap-1.5 px-3 py-2.5 border-b border-border bg-white"), children: [
        /* @__PURE__ */ d("div", { className: e("flex-1 relative"), children: [
          /* @__PURE__ */ n(
            "textarea",
            {
              ref: h,
              value: m,
              onChange: k,
              onKeyDown: R,
              placeholder: "Add a comment... (type @ to mention)",
              rows: 2,
              className: e("w-full border border-border rounded-md px-2.5 py-2 text-[13px] font-[inherit] outline-none resize-y min-h-12 box-border text-[#1e293b] bg-white")
            }
          ),
          u.active && /* @__PURE__ */ n(
            pt,
            {
              ref: f,
              query: u.query,
              users: w,
              position: u.position,
              onSelect: v,
              onDismiss: () => l(q)
            }
          )
        ] }),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: x,
            className: e("px-3.5 py-1.5 text-xs font-semibold border-none rounded-md bg-[#3b82f6] text-white cursor-pointer font-[inherit] whitespace-nowrap self-end"),
            children: "Post"
          }
        )
      ] }),
      t.length > 1 && /* @__PURE__ */ n("div", { className: e("flex justify-end px-3 pt-1 border-b border-[#f1f5f9]"), children: /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          onClick: () => N((C) => !C),
          className: e("bg-transparent border-none cursor-pointer text-[11px] text-[#64748b] px-1.5 py-0.5 font-[inherit]"),
          children: S ? "↓ Newest first" : "↑ Oldest first"
        }
      ) }),
      /* @__PURE__ */ d("div", { className: e("max-h-[420px] overflow-y-auto px-3 py-2"), children: [
        t.length === 0 && /* @__PURE__ */ n("div", { className: e("p-3 text-center text-text-tertiary text-xs"), children: "No comments yet. Start the discussion!" }),
        $.map((C) => /* @__PURE__ */ n(
          ht,
          {
            comment: C,
            depth: 0,
            onReply: j,
            mentionUsers: w,
            onResolveThread: o,
            onUnresolveThread: i
          },
          C.id
        ))
      ] })
    ] })
  ] });
}
const et = {
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
function ir({
  sections: t,
  participants: r,
  userId: s,
  getSectionFragment: o,
  ydoc: i,
  provider: a,
  sectionReviews: c,
  reviewSection: m,
  comments: p,
  onAddComment: h,
  onResolveThread: f,
  onUnresolveThread: u,
  onSectionFocus: l
}) {
  const [w, b] = M({}), S = t.filter((x) => (c[x.id] ?? []).some((v) => v.userId === s)).length, N = /* @__PURE__ */ new Map();
  for (const x of t)
    for (const k of c[x.id] ?? []) {
      const v = N.get(k.userId) ?? { displayName: k.displayName, statuses: [] };
      v.statuses.push(k.status), N.set(k.userId, v);
    }
  const $ = t.length > 0 ? Math.round(S / t.length * 100) : 0;
  return t.length === 0 ? /* @__PURE__ */ n("div", { className: e("text-center p-12 text-[#6b7280] text-[15px]"), children: "No sections to review." }) : /* @__PURE__ */ d("div", { "data-testid": "review-mode", className: e("max-w-[800px] mx-auto"), children: [
    /* @__PURE__ */ d("div", { "data-testid": "review-progress", className: e("mb-6"), children: [
      /* @__PURE__ */ d("div", { className: e("text-[13px] text-[#6b7280] mb-1 flex justify-between"), children: [
        /* @__PURE__ */ d("span", { "data-testid": "review-progress-text", children: [
          S,
          " of ",
          t.length,
          " sections reviewed by you"
        ] }),
        /* @__PURE__ */ d("span", { "data-testid": "review-progress-pct", children: [
          $,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ n("div", { className: e("h-2 bg-[#e5e7eb] rounded overflow-hidden"), children: /* @__PURE__ */ n(
        "div",
        {
          className: e("h-full rounded transition-[width] duration-300 ease-in-out", S === t.length ? "bg-success" : "bg-blue-500"),
          style: { width: `${$}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ n("div", { className: e("flex flex-col gap-6"), children: t.map((x) => {
      const k = o(x.id), v = et[x.type] ?? et.custom, R = c[x.id] ?? [], j = R.find((g) => g.userId === s), C = R.filter((g) => g.userId !== s), L = r.filter((g) => g.currentSectionId === x.id), T = w[x.id] ?? !1;
      return /* @__PURE__ */ d(
        "div",
        {
          id: `section-${x.id}`,
          "data-testid": `review-section-${x.id}`,
          className: e("bg-white border border-[#e5e7eb] rounded-lg p-5"),
          style: {
            borderLeft: j ? `3px solid ${re[j.status].color}` : "3px solid #d1d5db"
          },
          onMouseEnter: () => l?.(x.id),
          children: [
            /* @__PURE__ */ d("div", { className: e("flex items-center gap-2 mb-1"), children: [
              /* @__PURE__ */ n("h3", { className: e("text-lg font-bold m-0 text-[#1e293b] flex-1"), children: x.title }),
              /* @__PURE__ */ n(
                "span",
                {
                  className: e("inline-block text-[11px] font-semibold py-0.5 px-2.5 rounded-full"),
                  style: { background: v.bg, color: v.text },
                  children: x.sectionType ?? x.type
                }
              )
            ] }),
            k && /* @__PURE__ */ n("div", { className: e(x.items.length > 0 ? "mb-4" : "mb-2"), children: /* @__PURE__ */ n(
              De,
              {
                fragment: k,
                ydoc: i,
                provider: a,
                user: { name: "", color: "" },
                editable: !1,
                sectionId: x.id
              }
            ) }),
            !k && x.items.length === 0 && /* @__PURE__ */ n("div", { className: e("py-4 text-text-tertiary text-sm text-center"), children: "This section has no content." }),
            x.items.length > 0 && /* @__PURE__ */ n("div", { className: e("mb-3"), children: x.items.map((g) => {
              const O = g.status === "acked" ? "#16a34a" : g.status === "rejected" ? "#dc2626" : g.status === "done" ? "#6b7280" : "#94a3b8";
              return /* @__PURE__ */ d("div", { className: e("flex items-start gap-2 py-1.5 border-b border-[#f3f4f6] text-sm"), children: [
                /* @__PURE__ */ n(
                  "span",
                  {
                    className: e("inline-block w-2 h-2 rounded-full mt-[5px] shrink-0"),
                    style: { background: O }
                  }
                ),
                /* @__PURE__ */ d("div", { className: e("flex-1"), children: [
                  /* @__PURE__ */ n("span", { className: e("text-[#1e293b]"), children: g.text }),
                  g.assignee && /* @__PURE__ */ d("span", { className: e("text-[#6b7280] text-xs ml-2"), children: [
                    "— ",
                    g.assignee
                  ] }),
                  g.priority && g.priority !== "medium" && /* @__PURE__ */ n(
                    "span",
                    {
                      className: e("text-[10px] font-semibold ml-1.5 px-1.5 py-px rounded", g.priority === "high" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"),
                      children: g.priority
                    }
                  )
                ] }),
                /* @__PURE__ */ n(
                  "span",
                  {
                    className: e("text-[11px] font-semibold capitalize shrink-0"),
                    style: { color: O },
                    children: g.status
                  }
                )
              ] }, g.id);
            }) }),
            /* @__PURE__ */ d("div", { className: e("flex items-center gap-2 pt-2.5 pb-1 border-t border-[#f3f4f6] flex-wrap"), children: [
              !j || T ? /* @__PURE__ */ d(K, { children: [
                /* @__PURE__ */ n(
                  Te,
                  {
                    testid: `section-${x.id}-review-reviewed`,
                    label: "Mark Reviewed",
                    bg: "#f3f4f6",
                    color: "#374151",
                    hoverBg: "#e5e7eb",
                    onClick: () => {
                      m(x.id, "reviewed"), b((g) => ({ ...g, [x.id]: !1 }));
                    }
                  }
                ),
                /* @__PURE__ */ n(
                  Te,
                  {
                    testid: `section-${x.id}-review-approved`,
                    label: "Approve",
                    bg: "#dcfce7",
                    color: "#166534",
                    hoverBg: "#bbf7d0",
                    onClick: () => {
                      m(x.id, "approved"), b((g) => ({ ...g, [x.id]: !1 }));
                    }
                  }
                ),
                /* @__PURE__ */ n(
                  Te,
                  {
                    testid: `section-${x.id}-review-changes-requested`,
                    label: "Request Changes",
                    bg: "#fef3c7",
                    color: "#92400e",
                    hoverBg: "#fde68a",
                    onClick: () => {
                      m(x.id, "changes_requested"), b((g) => ({ ...g, [x.id]: !1 }));
                    }
                  }
                ),
                T && /* @__PURE__ */ n(
                  "button",
                  {
                    "data-testid": `section-${x.id}-cancel-change`,
                    onClick: () => b((g) => ({ ...g, [x.id]: !1 })),
                    className: e("bg-transparent border-none text-[#6b7280] text-xs cursor-pointer underline"),
                    children: "Cancel"
                  }
                )
              ] }) : /* @__PURE__ */ d(K, { children: [
                /* @__PURE__ */ d(
                  "span",
                  {
                    "data-testid": `section-${x.id}-status`,
                    "data-status": j.status,
                    className: e("inline-flex items-center gap-1 text-[13px] font-semibold py-1 px-2.5 rounded-md"),
                    style: { background: re[j.status].bg, color: re[j.status].color },
                    children: [
                      /* @__PURE__ */ n("span", { className: e("text-sm"), children: re[j.status].icon }),
                      re[j.status].label
                    ]
                  }
                ),
                /* @__PURE__ */ d("span", { className: e("text-xs text-[#6b7280]"), children: [
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
                    "data-testid": `section-${x.id}-change-review`,
                    onClick: () => b((g) => ({ ...g, [x.id]: !0 })),
                    className: e("bg-transparent border-none text-[#3b82f6] text-xs cursor-pointer underline p-0"),
                    children: "Change"
                  }
                )
              ] }),
              C.length > 0 && /* @__PURE__ */ n("div", { className: e("flex gap-1 ml-auto items-center"), children: C.map((g) => {
                const O = re[g.status], H = g.displayName.split(" ").map((J) => J[0]).join("").toUpperCase().slice(0, 2);
                return /* @__PURE__ */ n(
                  "div",
                  {
                    title: `${g.displayName}: ${O.label}`,
                    className: e("w-[26px] h-[26px] rounded-full flex items-center justify-center text-[10px] font-bold"),
                    style: { background: O.bg, color: O.color, border: `2px solid ${O.color}` },
                    children: H
                  },
                  g.userId
                );
              }) }),
              L.length > 0 && /* @__PURE__ */ d("div", { className: e("flex gap-1 items-center"), style: { marginLeft: C.length > 0 ? 0 : "auto" }, children: [
                /* @__PURE__ */ n("span", { className: e("text-[11px] text-text-tertiary"), children: "Viewing:" }),
                L.map((g) => /* @__PURE__ */ n(
                  "div",
                  {
                    title: g.displayName,
                    className: e("w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-semibold"),
                    style: { background: g.color },
                    children: g.displayName.split(" ").map((O) => O[0]).join("").toUpperCase().slice(0, 2)
                  },
                  g.clientId
                ))
              ] })
            ] }),
            h && /* @__PURE__ */ n(
              bt,
              {
                comments: p?.[x.id] ?? [],
                onAddComment: (g, O) => h(x.id, g, O),
                participants: r,
                onResolveThread: f ? (g) => f(x.id, g) : void 0,
                onUnresolveThread: u ? (g) => u(x.id, g) : void 0
              }
            )
          ]
        },
        x.id
      );
    }) }),
    N.size > 0 && /* @__PURE__ */ d(
      "div",
      {
        "data-testid": "review-summary",
        className: e("mt-8 p-4 px-5 bg-[#f8fafc] border border-border rounded-lg"),
        children: [
          /* @__PURE__ */ n("h4", { className: e("m-0 mb-3 text-sm font-bold text-text-secondary"), children: "Document Review Summary" }),
          /* @__PURE__ */ n("div", { className: e("flex flex-col gap-2"), children: Array.from(N.entries()).map(([x, k]) => {
            const v = k.statuses.filter((C) => C === "approved").length, R = k.statuses.filter((C) => C === "changes_requested").length, j = k.statuses.filter((C) => C === "reviewed").length;
            return /* @__PURE__ */ d("div", { className: e("flex items-center gap-2.5 text-[13px]"), children: [
              /* @__PURE__ */ d("span", { className: e("font-semibold text-[#1e293b] min-w-[100px]"), children: [
                k.displayName,
                x === s ? " (you)" : ""
              ] }),
              /* @__PURE__ */ d("span", { className: e("text-[#6b7280]"), children: [
                k.statuses.length,
                " of ",
                t.length,
                " sections"
              ] }),
              v > 0 && /* @__PURE__ */ d("span", { className: e("text-[11px] px-2 py-px rounded bg-[#dcfce7] text-[#166534] font-semibold"), children: [
                v,
                " approved"
              ] }),
              j > 0 && /* @__PURE__ */ d("span", { className: e("text-[11px] px-2 py-px rounded bg-[#f3f4f6] text-[#374151] font-semibold"), children: [
                j,
                " reviewed"
              ] }),
              R > 0 && /* @__PURE__ */ d("span", { className: e("text-[11px] px-2 py-px rounded bg-[#fef3c7] text-[#92400e] font-semibold"), children: [
                R,
                " changes requested"
              ] })
            ] }, x);
          }) })
        ]
      }
    )
  ] });
}
function Te({ label: t, bg: r, color: s, hoverBg: o, onClick: i, testid: a }) {
  const [c, m] = M(!1);
  return /* @__PURE__ */ n(
    "button",
    {
      "data-testid": a,
      onClick: i,
      onMouseEnter: () => m(!0),
      onMouseLeave: () => m(!1),
      className: e("py-1.5 px-3.5 text-[13px] font-semibold border border-transparent rounded-md cursor-pointer transition-colors duration-150"),
      style: { background: c ? o : r, color: s },
      children: t
    }
  );
}
const tt = {
  draft: { bg: "#fef3c7", text: "#92400e" },
  review: { bg: "#dbeafe", text: "#1e40af" },
  final: { bg: "#d1fae5", text: "#065f46" }
};
function ar(t) {
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
function lr(t) {
  const r = [], s = [], o = [];
  for (const i of t)
    i.status === "rejected" ? o.push(i) : i.status === "acked" || i.status === "done" ? s.push(i) : r.push(i);
  return { pending: r, completed: s, rejected: o };
}
function dr(t, r) {
  const { pending: s, completed: o, rejected: i } = lr(t), a = t.length, c = [];
  if (a > 0) {
    const h = Math.round(o.length / a * 100);
    c.push(
      `${a} action item${a !== 1 ? "s" : ""} identified, ${o.length} completed (${h}%).`
    );
  } else
    c.push("No action items recorded yet.");
  const p = r.filter((h) => h.type === "decisions").flatMap((h) => h.items);
  if (p.length > 0) {
    const h = p.filter(
      (f) => f.status === "acked" || f.status === "done"
    ).length;
    c.push(
      `${p.length} key decision${p.length !== 1 ? "s" : ""} recorded${h > 0 ? `, ${h} finalized` : ""}.`
    );
  }
  return s.length > 0 && c.push(
    `${s.length} item${s.length !== 1 ? "s" : ""} still pending review.`
  ), i.length > 0 && c.push(
    `${i.length} item${i.length !== 1 ? "s" : ""} rejected and need${i.length === 1 ? "s" : ""} revision.`
  ), c;
}
function cr({
  meta: t,
  participantCount: r
}) {
  const s = tt[t.status] ?? tt.draft;
  return /* @__PURE__ */ d(
    "div",
    {
      className: e("border-t-[3px] border-t-[#3b82f6] rounded-t-lg pt-5 pb-4 px-6 mb-4 bg-gradient-to-b from-slate-50 to-white col-span-full"),
      children: [
        /* @__PURE__ */ d("div", { className: e("flex items-center gap-3 mb-1.5"), children: [
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
        /* @__PURE__ */ d("div", { className: e("text-xs text-[#64748b]"), children: [
          t.createdBy && /* @__PURE__ */ d(K, { children: [
            "Created by ",
            t.createdByName || t.createdBy
          ] }),
          t.createdAt && /* @__PURE__ */ d(K, { children: [
            " · ",
            ar(t.createdAt)
          ] }),
          r > 0 && /* @__PURE__ */ d(K, { children: [
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
function mr({
  bullets: t,
  contentText: r,
  fragment: s,
  ydoc: o,
  provider: i
}) {
  const a = s && o, c = r && r.trim().length > 0;
  return /* @__PURE__ */ d("div", { className: e("bg-white border border-border rounded-lg p-4 mb-4"), children: [
    /* @__PURE__ */ n("h2", { className: e("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Executive Summary" }),
    a ? /* @__PURE__ */ n("div", { className: e(
      "py-1 px-3 bg-[#f8fafc] rounded-md border-l-[3px] border-l-[#8b5cf6]",
      t.length > 0 ? "mb-3" : ""
    ), children: /* @__PURE__ */ n(
      De,
      {
        fragment: s,
        ydoc: o,
        provider: i ?? null,
        user: { name: "", color: "" },
        editable: !1
      }
    ) }) : c ? /* @__PURE__ */ n("div", { className: e(
      "text-sm text-[#1e293b] leading-relaxed whitespace-pre-wrap py-2 px-3 bg-[#f8fafc] rounded-md border-l-[3px] border-l-[#8b5cf6]",
      t.length > 0 ? "mb-3" : ""
    ), children: r.trim() }) : null,
    /* @__PURE__ */ n("ul", { className: e("m-0 pl-[18px] text-[13px] text-[#334155] leading-relaxed"), children: t.map((m, p) => /* @__PURE__ */ n("li", { children: m }, p)) })
  ] });
}
const oe = {
  pending: "#f59e0b",
  done: "#10b981",
  rejected: "#ef4444"
}, nt = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#6b7280"
};
function gt(t) {
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
function pr(t) {
  const r = [], s = [], o = [];
  for (const i of t)
    i.status === "rejected" ? o.push(i) : i.status === "acked" || i.status === "done" ? s.push(i) : r.push(i);
  return { pending: r, completed: s, rejected: o };
}
function Ie({
  label: t,
  count: r,
  color: s,
  defaultOpen: o,
  children: i
}) {
  const [a, c] = M(o);
  return /* @__PURE__ */ d("div", { className: e("mb-2"), children: [
    /* @__PURE__ */ d(
      "button",
      {
        onClick: () => c(!a),
        className: e("bg-transparent border-none cursor-pointer flex items-center gap-1.5 py-1 px-0 text-[13px] font-semibold text-[#334155] font-[inherit] w-full"),
        children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: e("inline-block text-[10px] transition-transform duration-150 ease-in-out", a ? "rotate-90" : "rotate-0"),
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
    a && /* @__PURE__ */ n("div", { className: e("pl-4 mt-1"), children: i })
  ] });
}
function Me({
  item: t,
  variant: r
}) {
  const s = r === "pending" ? oe.pending : r === "completed" ? oe.done : oe.rejected;
  return /* @__PURE__ */ d(
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
            style: { background: `${nt[t.priority]}18`, color: nt[t.priority] },
            children: t.priority
          }
        ),
        t.ackedBy && /* @__PURE__ */ n("span", { className: e("text-[11px] text-text-tertiary shrink-0"), children: t.ackedBy })
      ]
    }
  );
}
function ur({ sections: t }) {
  const s = t.filter((o) => o.type === "decisions").flatMap((o) => o.items);
  return /* @__PURE__ */ d("div", { className: e("bg-white border border-border rounded-lg p-4 mb-4"), children: [
    /* @__PURE__ */ n("h2", { className: e("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Key Decisions" }),
    s.length === 0 ? /* @__PURE__ */ n("div", { className: e("text-[13px] text-text-tertiary italic"), children: "No decisions recorded" }) : /* @__PURE__ */ n("div", { className: e("flex flex-col gap-1.5"), children: s.map((o) => /* @__PURE__ */ d(
      "div",
      {
        className: e("flex items-start gap-2 text-[13px] text-[#334155]"),
        children: [
          /* @__PURE__ */ n("span", { className: e("shrink-0"), children: gt(o.status) }),
          /* @__PURE__ */ n("span", { children: o.text })
        ]
      },
      o.id
    )) })
  ] });
}
function fr({ allItems: t }) {
  const { pending: r, completed: s, rejected: o } = pr(t);
  return /* @__PURE__ */ d("div", { className: e("bg-white border border-border rounded-lg p-4 mb-4"), children: [
    /* @__PURE__ */ n("h2", { className: e("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Action Items" }),
    t.length === 0 ? /* @__PURE__ */ n("div", { className: e("text-[13px] text-text-tertiary italic"), children: "No action items yet" }) : /* @__PURE__ */ d(K, { children: [
      r.length > 0 && /* @__PURE__ */ n(
        Ie,
        {
          label: "Pending",
          count: r.length,
          color: oe.pending,
          defaultOpen: !0,
          children: r.map((i) => /* @__PURE__ */ n(Me, { item: i, variant: "pending" }, i.id))
        }
      ),
      s.length > 0 && /* @__PURE__ */ n(
        Ie,
        {
          label: "Completed",
          count: s.length,
          color: oe.done,
          defaultOpen: !1,
          children: s.map((i) => /* @__PURE__ */ n(Me, { item: i, variant: "completed" }, i.id))
        }
      ),
      o.length > 0 && /* @__PURE__ */ n(
        Ie,
        {
          label: "Rejected",
          count: o.length,
          color: oe.rejected,
          defaultOpen: !1,
          children: o.map((i) => /* @__PURE__ */ n(Me, { item: i, variant: "rejected" }, i.id))
        }
      )
    ] })
  ] });
}
function xr({
  sections: t,
  commentCounts: r,
  sectionContentTexts: s,
  comments: o,
  getSectionFragment: i,
  ydoc: a,
  provider: c
}) {
  const [m, p] = M({}), h = (u) => p((l) => ({ ...l, [u]: !l[u] })), f = {
    summary: { bg: "#e0e7ff", text: "#4338ca" },
    tasks: { bg: "#dbeafe", text: "#1e40af" },
    decisions: { bg: "#fce7f3", text: "#9d174d" },
    notes: { bg: "#f0fdf4", text: "#166534" },
    custom: { bg: "#f3f4f6", text: "#6b7280" }
  };
  return /* @__PURE__ */ d("div", { className: e("bg-white border border-border rounded-lg p-4 mb-4"), children: [
    /* @__PURE__ */ n("h2", { className: e("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Section Summaries" }),
    t.length === 0 ? /* @__PURE__ */ n("div", { className: e("text-[13px] text-text-tertiary italic"), children: "No sections" }) : /* @__PURE__ */ n("div", { className: e("flex flex-col gap-0.5"), children: t.map((u) => {
      const l = u.items.filter(
        (v) => v.status === "acked" || v.status === "done"
      ).length, w = u.items.length, b = r?.[u.id] ?? 0, S = s?.[u.id] ?? "", N = o?.[u.id] ?? [], $ = !!m[u.id], x = S.trim().length > 0, k = f[u.type] ?? f.custom;
      return /* @__PURE__ */ d(
        "div",
        {
          id: `section-${u.id}`,
          "data-testid": `reader-section-${u.id}`,
          children: [
            /* @__PURE__ */ d(
              "button",
              {
                onClick: () => h(u.id),
                className: e(
                  "border-none cursor-pointer flex items-center gap-2 py-2 px-1.5 rounded-md w-full font-[inherit] text-[13px] text-[#334155] transition-colors duration-100",
                  $ ? "bg-[#f8fafc]" : "bg-transparent"
                ),
                children: [
                  /* @__PURE__ */ n(
                    "span",
                    {
                      className: e("text-[10px] transition-transform duration-150 ease-in-out shrink-0", $ ? "rotate-90" : "rotate-0"),
                      children: "▶"
                    }
                  ),
                  /* @__PURE__ */ n("span", { className: e("font-semibold flex-1 text-left"), children: u.title }),
                  /* @__PURE__ */ n(
                    "span",
                    {
                      className: e("text-[10px] font-semibold px-2 py-px rounded-full capitalize shrink-0"),
                      style: { background: k.bg, color: k.text },
                      children: u.type
                    }
                  ),
                  w > 0 && /* @__PURE__ */ d("span", { className: e("text-[11px] text-[#64748b] shrink-0"), children: [
                    l,
                    "/",
                    w,
                    " done"
                  ] }),
                  b > 0 && /* @__PURE__ */ d("span", { className: e("text-[11px] text-[#64748b] shrink-0"), children: [
                    b,
                    " comment",
                    b !== 1 ? "s" : ""
                  ] })
                ]
              }
            ),
            $ && /* @__PURE__ */ d("div", { className: e("pl-6 pb-2"), children: [
              (() => {
                const v = i?.(u.id);
                return v && a ? /* @__PURE__ */ n("div", { className: e(
                  "py-1 px-2.5 bg-[#f8fafc] rounded border-l-2 border-l-[#cbd5e1]",
                  u.items.length > 0 ? "mb-2" : ""
                ), children: /* @__PURE__ */ n(
                  De,
                  {
                    fragment: v,
                    ydoc: a,
                    provider: c ?? null,
                    user: { name: "", color: "" },
                    editable: !1
                  }
                ) }) : x ? /* @__PURE__ */ n("div", { className: e(
                  "text-[13px] text-[#334155] leading-relaxed whitespace-pre-wrap py-2 px-2.5 bg-[#f8fafc] rounded border-l-2 border-l-[#cbd5e1]",
                  u.items.length > 0 ? "mb-2" : ""
                ), children: S.trim() }) : null;
              })(),
              u.items.map((v) => /* @__PURE__ */ d(
                "div",
                {
                  className: e("flex items-center gap-1.5 py-[3px] text-xs text-[#64748b]"),
                  children: [
                    /* @__PURE__ */ n("span", { className: e("shrink-0"), children: gt(v.status) }),
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
              N.length > 0 && /* @__PURE__ */ d("div", { className: e("mt-2 pt-1.5 border-t border-[#f1f5f9]"), children: [
                /* @__PURE__ */ d("div", { className: e("text-[11px] font-semibold text-text-tertiary mb-1"), children: [
                  "Comments (",
                  b,
                  ")"
                ] }),
                N.slice(0, 3).map((v) => /* @__PURE__ */ d("div", { className: e("text-xs text-[#64748b] py-0.5 flex gap-1.5"), children: [
                  /* @__PURE__ */ d("span", { className: e("font-semibold text-text-secondary shrink-0"), children: [
                    v.displayName,
                    ":"
                  ] }),
                  /* @__PURE__ */ n("span", { className: e("overflow-hidden text-ellipsis whitespace-nowrap"), children: v.text })
                ] }, v.id)),
                N.length > 3 && /* @__PURE__ */ d("div", { className: e("text-[11px] text-text-tertiary mt-0.5"), children: [
                  "+",
                  N.length - 3,
                  " more"
                ] })
              ] }),
              !x && u.items.length === 0 && N.length === 0 && /* @__PURE__ */ n("div", { className: e("text-xs text-text-tertiary italic"), children: "No content in this section" })
            ] })
          ]
        },
        u.id
      );
    }) })
  ] });
}
function rt(t) {
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
function hr(t) {
  return t >= 75 ? "#10b981" : t >= 25 ? "#f59e0b" : "#ef4444";
}
const ot = {
  editor: "#10b981",
  reviewer: "#f59e0b",
  reader: "#94a3b8"
}, st = {
  editor: "editing",
  reviewer: "reviewing",
  reader: "reading"
};
function br({ sections: t }) {
  const r = (s, o) => {
    s.preventDefault();
    const i = document.getElementById(`section-${o}`);
    i && i.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return /* @__PURE__ */ d(
    "aside",
    {
      "data-testid": "reader-toc",
      className: e("sticky top-4 self-start bg-white border border-border rounded-lg p-4 mb-3"),
      children: [
        /* @__PURE__ */ n("h3", { className: e("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Contents" }),
        /* @__PURE__ */ n("nav", { children: /* @__PURE__ */ n("ol", { className: e("list-none m-0 p-0 flex flex-col gap-1"), children: t.map((s, o) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ d(
          "a",
          {
            href: `#section-${s.id}`,
            "data-testid": `toc-link-${s.id}`,
            onClick: (i) => r(i, s.id),
            className: e("block py-1 px-1.5 text-[13px] text-text-secondary no-underline rounded border-l-2 border-l-transparent transition-colors duration-75 hover:bg-[#f1f5f9] hover:border-l-primary"),
            children: [
              /* @__PURE__ */ d("span", { className: e("font-medium text-text-primary"), children: [
                o + 1,
                "."
              ] }),
              " ",
              s.title || `Section ${o + 1}`
            ]
          }
        ) }, s.id)) }) })
      ]
    }
  );
}
function gr({
  reviewed: t,
  total: r
}) {
  const s = r > 0 ? Math.round(t / r * 100) : 0, o = hr(s);
  return /* @__PURE__ */ d("div", { className: e("bg-white border border-border rounded-lg p-4 mb-3"), children: [
    /* @__PURE__ */ n("h3", { className: e("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Progress" }),
    /* @__PURE__ */ n("div", { className: e("flex items-baseline gap-1 mb-2"), children: /* @__PURE__ */ d("span", { className: e("text-[28px] font-bold leading-none"), style: { color: o }, children: [
      s,
      "%"
    ] }) }),
    /* @__PURE__ */ n("div", { className: e("h-2 bg-[#e5e7eb] rounded overflow-hidden mb-1.5"), children: /* @__PURE__ */ n(
      "div",
      {
        className: e("h-full rounded transition-[width] duration-300 ease-in-out"),
        style: { width: `${s}%`, background: o }
      }
    ) }),
    /* @__PURE__ */ d("div", { className: e("text-xs text-[#64748b]"), children: [
      t,
      " of ",
      r,
      " items reviewed"
    ] })
  ] });
}
function yr({ participants: t, meta: r }) {
  const s = /* @__PURE__ */ new Set(), o = [];
  for (const i of t) {
    const a = i.userId || i.clientId;
    s.has(a) || (s.add(a), o.push({ name: i.displayName, color: i.color, mode: i.mode, isOnline: !0 }));
  }
  return r.createdBy && !s.has(r.createdBy) && o.push({ name: r.createdByName || r.createdBy, color: "#6b7280", isOnline: !1 }), /* @__PURE__ */ d("div", { className: e("bg-white border border-border rounded-lg p-4 mb-3"), children: [
    /* @__PURE__ */ n("h3", { className: e("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Contributors" }),
    /* @__PURE__ */ n("div", { className: e("flex flex-wrap gap-1.5 mb-3"), children: o.map((i, a) => {
      const c = i.name.split(" ").map((m) => m[0] ?? "").join("").toUpperCase().slice(0, 2);
      return /* @__PURE__ */ d("div", { title: `${i.name}${i.mode ? ` (${st[i.mode] ?? i.mode})` : ""}`, className: e("relative"), children: [
        /* @__PURE__ */ n(
          "div",
          {
            className: e("w-8 h-8 rounded-full text-white flex items-center justify-center text-[11px] font-bold"),
            style: { background: i.color },
            children: c
          }
        ),
        i.isOnline && /* @__PURE__ */ n(
          "div",
          {
            className: e("absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white"),
            style: { background: ot[i.mode ?? "reader"] ?? "#94a3b8" }
          }
        )
      ] }, `${i.name}-${a}`);
    }) }),
    /* @__PURE__ */ n("div", { className: e("flex flex-col gap-1.5"), children: o.map((i, a) => /* @__PURE__ */ d("div", { className: e("flex items-center gap-2 text-[13px]"), children: [
      /* @__PURE__ */ n(
        "span",
        {
          className: e("w-2 h-2 rounded-full shrink-0"),
          style: { background: i.isOnline ? ot[i.mode ?? "reader"] ?? "#94a3b8" : "#d1d5db" }
        }
      ),
      /* @__PURE__ */ n("span", { className: e("font-medium text-[#334155] flex-1"), children: i.name }),
      /* @__PURE__ */ n("span", { className: e("text-[11px] text-text-tertiary"), children: i.isOnline ? st[i.mode ?? ""] ?? "online" : "offline" })
    ] }, `detail-${i.name}-${a}`)) })
  ] });
}
function vr({
  sections: t,
  allItems: r,
  completedCount: s,
  commentCounts: o,
  meta: i
}) {
  const a = o ? Object.values(o).reduce((c, m) => c + m, 0) : 0;
  return /* @__PURE__ */ d("div", { className: e("bg-white border border-border rounded-lg p-4 mb-3"), children: [
    /* @__PURE__ */ n("h3", { className: e("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Document Info" }),
    /* @__PURE__ */ d("div", { className: e("flex justify-between py-1 text-[13px] text-[#334155] border-b border-[#f1f5f9]"), children: [
      /* @__PURE__ */ n("span", { className: e("text-[#64748b]"), children: "Sections" }),
      /* @__PURE__ */ n("span", { className: e("font-semibold"), children: t.length })
    ] }),
    /* @__PURE__ */ d("div", { className: e("flex justify-between py-1 text-[13px] text-[#334155] border-b border-[#f1f5f9]"), children: [
      /* @__PURE__ */ n("span", { className: e("text-[#64748b]"), children: "Total tasks" }),
      /* @__PURE__ */ n("span", { className: e("font-semibold"), children: r.length })
    ] }),
    /* @__PURE__ */ d("div", { className: e("flex justify-between py-1 text-[13px] text-[#334155] border-b border-[#f1f5f9]"), children: [
      /* @__PURE__ */ n("span", { className: e("text-[#64748b]"), children: "Completed" }),
      /* @__PURE__ */ n("span", { className: e("font-semibold text-[#10b981]"), children: s })
    ] }),
    a > 0 && /* @__PURE__ */ d("div", { className: e("flex justify-between py-1 text-[13px] text-[#334155] border-b border-[#f1f5f9]"), children: [
      /* @__PURE__ */ n("span", { className: e("text-[#64748b]"), children: "Comments" }),
      /* @__PURE__ */ n("span", { className: e("font-semibold"), children: a })
    ] }),
    i.createdAt && /* @__PURE__ */ d("div", { className: e("flex justify-between py-1 text-[13px] text-[#334155] border-b border-[#f1f5f9]"), children: [
      /* @__PURE__ */ n("span", { className: e("text-[#64748b]"), children: "Created" }),
      /* @__PURE__ */ n("span", { className: e("font-medium text-xs"), children: rt(i.createdAt) })
    ] }),
    i.updatedAt && /* @__PURE__ */ d("div", { className: e("flex justify-between py-1 text-[13px] text-[#334155]"), children: [
      /* @__PURE__ */ n("span", { className: e("text-[#64748b]"), children: "Last changed" }),
      /* @__PURE__ */ n("span", { className: e("font-medium text-xs"), children: rt(i.updatedAt) })
    ] })
  ] });
}
function wr({
  sections: t,
  participants: r,
  meta: s,
  commentCounts: o,
  sectionContentTexts: i,
  comments: a,
  getSectionFragment: c,
  ydoc: m,
  provider: p
}) {
  const h = t.flatMap((b) => b.items), f = h.filter((b) => b.status !== "pending").length, u = h.filter(
    (b) => b.status === "acked" || b.status === "done"
  ).length, l = dr(h, t), w = t.length >= 2;
  return /* @__PURE__ */ d(
    "div",
    {
      className: e("grid gap-4 mx-auto", w ? "[grid-template-columns:200px_1fr_280px] max-w-[1300px]" : "[grid-template-columns:1fr_280px] max-w-[1100px]"),
      children: [
        /* @__PURE__ */ n(cr, { meta: s, participantCount: r.length }),
        w && /* @__PURE__ */ n(br, { sections: t }),
        /* @__PURE__ */ d("div", { children: [
          /* @__PURE__ */ n(
            mr,
            {
              bullets: l,
              contentText: (() => {
                const b = t.find((S) => S.type === "summary");
                return b ? i?.[b.id] : void 0;
              })(),
              fragment: (() => {
                const b = t.find((S) => S.type === "summary");
                return b ? c?.(b.id) : null;
              })(),
              ydoc: m,
              provider: p
            }
          ),
          /* @__PURE__ */ n(ur, { sections: t }),
          /* @__PURE__ */ n(fr, { allItems: h }),
          /* @__PURE__ */ n(
            xr,
            {
              sections: t,
              commentCounts: o,
              sectionContentTexts: i,
              comments: a,
              getSectionFragment: c,
              ydoc: m,
              provider: p
            }
          )
        ] }),
        /* @__PURE__ */ d("div", { children: [
          /* @__PURE__ */ n(gr, { reviewed: f, total: h.length }),
          /* @__PURE__ */ n(yr, { participants: r, meta: s }),
          /* @__PURE__ */ n(
            vr,
            {
              sections: t,
              allItems: h,
              completedCount: u,
              commentCounts: o,
              meta: s
            }
          )
        ] })
      ]
    }
  );
}
function Nr({
  mode: t,
  isEmpty: r,
  isFinalized: s,
  sections: o,
  documentId: i,
  displayName: a,
  color: c,
  userId: m,
  ydoc: p,
  provider: h,
  getSectionFragment: f,
  updateSection: u,
  participants: l,
  focusedSectionId: w,
  onSectionFocus: b,
  comments: S,
  onAddComment: N,
  onResolveThread: $,
  onUnresolveThread: x,
  onUpdateCursorInfo: k,
  onOpenComments: v,
  onAddItem: R,
  onUpdateItem: j,
  onRemoveItem: C,
  restItems: L,
  commentSidebarOpen: T,
  commentSectionId: g,
  commentSidebarTop: O,
  sectionListRef: H,
  onCloseComments: J,
  showVideoCall: ee,
  isVideoDocked: ue,
  showInlineVideo: fe,
  sidebarFixed: le,
  videoSpacerRef: G,
  videoLeft: de,
  FIXED_TOP: Z,
  showTOC: te,
  sectionReviews: ce,
  reviewSection: xe,
  headerMeta: se,
  onLoadDemo: he,
  activityPublish: be
}) {
  return /* @__PURE__ */ d(K, { children: [
    s && t === "editor" && /* @__PURE__ */ n("div", { className: e(
      "rounded-lg border px-4 py-2.5 mb-3 text-center text-[13px] font-medium",
      "bg-[#fefce8] border-[#fde68a] text-[#92400e]"
    ), children: "This document has been finalized and is read-only" }),
    r && /* @__PURE__ */ d("div", { className: "text-center py-12 px-4 text-text-secondary", children: [
      /* @__PURE__ */ n("p", { className: "text-lg mb-4", children: "No document content yet." }),
      /* @__PURE__ */ n(
        "button",
        {
          onClick: he,
          className: e(
            "px-6 py-2.5 text-[15px] font-semibold border-none rounded-lg",
            "bg-primary text-white cursor-pointer font-[inherit]"
          ),
          children: "Load Demo Document"
        }
      ),
      /* @__PURE__ */ n("p", { className: "text-[13px] mt-3 text-text-tertiary", children: "Loads a sample Q2 Sprint Planning document with tasks, decisions, and notes." })
    ] }),
    !r && t === "editor" && p && /* @__PURE__ */ d("div", { ref: H, className: "flex gap-4 relative min-w-0", children: [
      ee && !ue && fe && /* @__PURE__ */ n("div", { ref: G, className: "w-[240px] shrink-0", children: /* @__PURE__ */ n(
        "div",
        {
          id: "inline-video-slot",
          className: e(le && "fixed z-30"),
          style: le ? { top: Z, left: de, width: 240 } : void 0
        }
      ) }),
      /* @__PURE__ */ d(
        "div",
        {
          className: e("flex-1 min-w-0", T ? "pr-0" : te && o.length > 1 && t === "editor" ? "pr-48" : "pr-12"),
          children: [
            /* @__PURE__ */ n(
              Zn,
              {
                sections: o.map((E) => {
                  const P = E.items ?? [], B = L[E.id] ?? [], V = [
                    ...P,
                    ...B.filter((X) => !P.some((W) => W.id === X.id))
                  ];
                  return { ...E, items: V };
                }),
                getSectionFragment: f,
                ydoc: p,
                provider: h,
                user: { name: a, color: c },
                editable: !s,
                onUpdateSection: u,
                onAddItem: R,
                onUpdateItem: j,
                onRemoveItem: C,
                participants: l,
                onSectionFocus: b,
                focusedSectionId: w,
                comments: S,
                onAddComment: N,
                onResolveThread: $,
                onUnresolveThread: x,
                onUpdateCursorInfo: k,
                onOpenComments: v
              }
            ),
            /* @__PURE__ */ n(nr, { documentId: i, editable: !s })
          ]
        }
      ),
      T && g && /* @__PURE__ */ d(
        "div",
        {
          className: e(
            "w-[420px] shrink-0 rounded-lg border border-border",
            "bg-[#fafbfc] flex flex-col max-h-[calc(100vh-180px)] overflow-hidden"
          ),
          style: { marginTop: O },
          children: [
            /* @__PURE__ */ d("div", { className: "flex items-center justify-between px-3.5 py-3 border-b border-border shrink-0", children: [
              /* @__PURE__ */ n("div", { className: "text-[13px] font-semibold text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap flex-1 mr-2", children: o.find((E) => E.id === g)?.title ?? "Comments" }),
              /* @__PURE__ */ n(
                "button",
                {
                  type: "button",
                  onClick: J,
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
              bt,
              {
                comments: S[g] ?? [],
                onAddComment: (E, P) => N(g, E, P),
                participants: l,
                onResolveThread: (E) => $(g, E),
                onUnresolveThread: (E) => x(g, E)
              }
            ) })
          ]
        }
      )
    ] }),
    !r && t === "ack" && p && /* @__PURE__ */ n(
      ir,
      {
        sections: o,
        participants: l,
        userId: m,
        getSectionFragment: f,
        ydoc: p,
        provider: h,
        sectionReviews: ce,
        reviewSection: (E, P, B) => {
          xe(E, P, B);
          const V = o.find((X) => X.id === E);
          be(`doc.review_${P}`, {
            sectionTitle: V?.title,
            status: P,
            documentId: i,
            documentTitle: se?.title
          });
        },
        comments: S,
        onAddComment: N,
        onResolveThread: $,
        onUnresolveThread: x,
        onSectionFocus: b
      }
    ),
    !r && t === "reader" && p && /* @__PURE__ */ n(
      wr,
      {
        sections: o,
        participants: l,
        meta: se,
        commentCounts: Object.fromEntries(
          Object.entries(S).map(([E, P]) => [E, P.length])
        ),
        sectionContentTexts: Object.fromEntries(
          o.map((E) => {
            const P = f(E.id);
            return [E.id, P ? $n(P) : ""];
          })
        ),
        comments: S,
        getSectionFragment: f,
        ydoc: p,
        provider: h
      }
    )
  ] });
}
function kr(t, r) {
  const s = new Map(t.map((a) => [a.id, a])), o = new Map(r.map((a) => [a.id, a])), i = [];
  for (const a of t) {
    const c = o.get(a.id);
    if (!c)
      i.push({ status: "removed", oldItem: a, changes: [] });
    else {
      const m = [];
      a.text !== c.text && m.push("text"), a.status !== c.status && m.push(`status: ${a.status} -> ${c.status}`), a.assignee !== c.assignee && m.push(`assignee: "${a.assignee}" -> "${c.assignee}"`), a.priority !== c.priority && m.push(`priority: ${a.priority} -> ${c.priority}`), m.length > 0 ? i.push({ status: "modified", oldItem: a, newItem: c, changes: m }) : i.push({ status: "unchanged", oldItem: a, newItem: c, changes: [] });
    }
  }
  for (const a of r)
    s.has(a.id) || i.push({ status: "added", newItem: a, changes: [] });
  return i;
}
function Cr(t, r) {
  const s = new Map(t.map((a) => [a.id, a])), o = new Map(r.map((a) => [a.id, a])), i = [];
  for (const a of t) {
    const c = o.get(a.id);
    if (!c)
      i.push({
        status: "removed",
        id: a.id,
        oldTitle: a.title,
        titleChanged: !1,
        itemDiffs: a.items.map((m) => ({ status: "removed", oldItem: m, changes: [] }))
      });
    else {
      const m = a.title !== c.title, p = (a.textContent || "") !== (c.textContent || ""), h = kr(a.items, c.items), f = m || p || h.some((u) => u.status !== "unchanged");
      i.push({
        status: f ? "modified" : "unchanged",
        id: a.id,
        oldTitle: a.title,
        newTitle: c.title,
        titleChanged: m,
        textChanged: p,
        oldTextContent: a.textContent,
        newTextContent: c.textContent,
        itemDiffs: h
      });
    }
  }
  for (const a of r)
    s.has(a.id) || i.push({
      status: "added",
      id: a.id,
      newTitle: a.title,
      titleChanged: !1,
      itemDiffs: a.items.map((c) => ({ status: "added", newItem: c, changes: [] }))
    });
  return i;
}
const Sr = {
  added: "bg-[#dcfce7] border-[#86efac]",
  removed: "bg-[#fee2e2] border-[#fca5a5]",
  modified: "bg-[#fef9c3] border-[#fde047]",
  unchanged: "bg-transparent border-[#e5e7eb]"
};
function Tr(t) {
  return t === "added" ? "text-[#166534] bg-[#bbf7d0]" : t === "removed" ? "text-[#991b1b] bg-[#fecaca]" : t === "modified" ? "text-[#854d0e] bg-[#fef08a]" : "text-[#6b7280] bg-[#f3f4f6]";
}
function Ir(t) {
  return t === "added" ? "bg-[#dcfce7] text-[#166534]" : t === "removed" ? "bg-[#fee2e2] text-[#991b1b] line-through" : t === "modified" ? "bg-[#fef9c3] text-[#854d0e]" : "bg-transparent text-[#374151]";
}
function Mr({ oldSections: t, newSections: r, onClose: s }) {
  const o = Cr(t, r), i = o.some((a) => a.status !== "unchanged");
  return /* @__PURE__ */ d("div", { className: e("border-t border-[#e5e7eb] bg-[#fafbfc] max-h-[400px] overflow-auto px-4 py-3"), children: [
    /* @__PURE__ */ d("div", { className: e("flex items-center justify-between mb-2"), children: [
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
    !i && /* @__PURE__ */ n("div", { className: e("text-[13px] text-[#9ca3af] text-center p-4"), children: "No differences found. The documents are identical." }),
    o.filter((a) => a.status !== "unchanged").map((a) => /* @__PURE__ */ d("div", { className: e("border rounded-md p-2 px-2.5 mb-1.5", Sr[a.status]), children: [
      /* @__PURE__ */ d("div", { className: e("flex items-center gap-2 mb-1"), children: [
        /* @__PURE__ */ n("span", { className: e("text-[10px] font-semibold uppercase px-1.5 py-px rounded-sm", Tr(a.status)), children: a.status }),
        /* @__PURE__ */ n("span", { className: e("text-[13px] font-semibold text-[#1f2937]"), children: a.status === "removed" ? a.oldTitle : a.newTitle ?? a.oldTitle }),
        a.titleChanged && /* @__PURE__ */ d("span", { className: e("text-[11px] text-[#92400e]"), children: [
          '(was: "',
          a.oldTitle,
          '")'
        ] })
      ] }),
      a.itemDiffs.filter((c) => c.status !== "unchanged").map((c, m) => {
        const p = c.newItem ?? c.oldItem;
        return /* @__PURE__ */ d("div", { children: [
          /* @__PURE__ */ d("div", { className: e("text-xs px-2 py-0.5 rounded-sm mt-0.5", Ir(c.status)), children: [
            c.status === "added" && "+ ",
            c.status === "removed" && "- ",
            c.status === "modified" && "~ ",
            p?.text ?? "(untitled)",
            p?.assignee ? ` [${p.assignee}]` : ""
          ] }),
          c.changes.length > 0 && /* @__PURE__ */ n("div", { className: e("text-[11px] text-[#92400e] ml-4 italic"), children: c.changes.join(", ") })
        ] }, p?.id ?? m);
      }),
      a.textChanged && /* @__PURE__ */ d("div", { className: e("mt-1 text-xs"), children: [
        a.oldTextContent && /* @__PURE__ */ d("div", { className: e("px-2 py-1 rounded-sm bg-[#fee2e2] text-[#991b1b] line-through mb-0.5"), children: [
          a.oldTextContent.substring(0, 200),
          (a.oldTextContent?.length ?? 0) > 200 ? "..." : ""
        ] }),
        a.newTextContent && /* @__PURE__ */ d("div", { className: e("px-2 py-1 rounded-sm bg-[#dcfce7] text-[#166534]"), children: [
          a.newTextContent.substring(0, 200),
          (a.newTextContent?.length ?? 0) > 200 ? "..." : ""
        ] })
      ] }),
      a.status === "modified" && !a.textChanged && a.itemDiffs.every((c) => c.status === "unchanged") && a.titleChanged && /* @__PURE__ */ n("div", { className: e("text-xs text-[#6b7280] mt-0.5"), children: "Only the section title changed." })
    ] }, a.id))
  ] });
}
function $r(t) {
  const r = Math.floor(t / 1e3);
  if (r < 60) return `${r}s ago`;
  const s = Math.floor(r / 60);
  if (s < 60) return `${s} min ago`;
  const o = Math.floor(s / 60);
  if (o < 24) return `${o} hour${o !== 1 ? "s" : ""} ago`;
  const i = Math.floor(o / 24);
  if (i < 30) return `${i} day${i !== 1 ? "s" : ""} ago`;
  const a = Math.floor(i / 30);
  return `${a} month${a !== 1 ? "s" : ""} ago`;
}
function Dr({
  versions: t,
  loading: r,
  previewTimestamp: s,
  onFetch: o,
  onPreview: i,
  onClearPreview: a,
  onClose: c,
  onSaveVersion: m,
  onCompare: p,
  onClearCompare: h,
  compareSections: f,
  compareTimestamp: u,
  currentSections: l,
  onRestore: w
}) {
  const b = () => {
    a(), h(), c();
  }, S = () => {
    const x = window.prompt("Enter a name for this version:");
    x && x.trim() && m(x.trim());
  }, N = (x, k) => {
    x.stopPropagation(), u === k ? h() : p(k);
  }, $ = (x) => x.type === "pre-restore" ? "Before restore" : x.type === "auto" ? "Auto-save" : "";
  return /* @__PURE__ */ d(Re, { width: 320, children: [
    /* @__PURE__ */ n(
      Ae,
      {
        title: "Version History",
        onClose: b,
        actions: /* @__PURE__ */ n(Q, { size: "sm", onClick: S, children: "Save Version" })
      }
    ),
    /* @__PURE__ */ d(je, { padding: "0.5rem 0", children: [
      r && /* @__PURE__ */ n("div", { className: e("py-8 px-4 text-center text-text-tertiary text-[13px]"), children: "Loading..." }),
      !r && t.length === 0 && /* @__PURE__ */ n("div", { className: e("py-8 px-4 text-center text-text-tertiary text-[13px]"), children: "No saved versions yet" }),
      !r && t.map((x) => /* @__PURE__ */ d(
        "div",
        {
          className: e(
            "flex items-center justify-between py-2.5 px-4 cursor-pointer text-[13px] text-text-primary",
            s === x.timestamp ? "bg-[#eff6ff] border-l-[3px] border-l-[#3b82f6]" : "bg-transparent border-l-[3px] border-l-transparent"
          ),
          onClick: () => i(x.timestamp),
          children: [
            /* @__PURE__ */ d("div", { className: e("flex-1 min-w-0"), children: [
              x.name && /* @__PURE__ */ n("span", { className: e("text-xs font-semibold text-[#1f2937] block mb-px"), children: x.name }),
              /* @__PURE__ */ d("span", { className: e("flex items-center gap-1"), children: [
                $r(x.age),
                x.type && x.type !== "manual" && /* @__PURE__ */ n(
                  "span",
                  {
                    className: e(
                      "text-[10px] font-medium px-[5px] py-px rounded-[3px] ml-1.5",
                      x.type === "pre-restore" ? "bg-[#fef3c7] text-[#92400e]" : x.type === "auto" ? "bg-[#f3f4f6] text-text-tertiary" : "bg-[#e0f2fe] text-[#0369a1]"
                    ),
                    children: $(x)
                  }
                )
              ] }),
              x.author && /* @__PURE__ */ d("span", { className: e("text-[10px] text-text-tertiary block"), children: [
                "by ",
                x.author
              ] }),
              /* @__PURE__ */ n("span", { className: e("text-[11px] text-text-tertiary"), children: new Date(x.timestamp).toLocaleString() })
            ] }),
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: e(
                  "px-2 py-[3px] text-[11px] font-medium border rounded-[4px] cursor-pointer font-[inherit] whitespace-nowrap",
                  u === x.timestamp ? "bg-[#eff6ff] border-[#3b82f6] text-[#3b82f6]" : "bg-white border-border text-[#6b7280]"
                ),
                onClick: (k) => N(k, x.timestamp),
                children: u === x.timestamp ? "Hide Diff" : "Compare"
              }
            )
          ]
        },
        x.timestamp
      ))
    ] }),
    f != null && /* @__PURE__ */ n(
      Mr,
      {
        oldSections: f,
        newSections: l,
        onClose: h
      }
    ),
    w && u != null && /* @__PURE__ */ d("div", { className: e("py-3 px-4 border-t border-border shrink-0"), children: [
      /* @__PURE__ */ n(
        Q,
        {
          variant: "primary",
          onClick: () => {
            window.confirm(
              `Restore this version?

A checkpoint of the current state will be saved first. All connected users will see the restored content. Comments and reviews added after this version may be lost.`
            ) && (w(u), h());
          },
          className: "w-full px-4 py-2.5 text-sm font-semibold rounded-lg",
          children: "Restore this version"
        }
      ),
      /* @__PURE__ */ n("div", { className: e("text-[11px] text-text-tertiary text-center mt-1.5"), children: "A pre-restore checkpoint will be saved automatically" })
    ] })
  ] });
}
function Rr(t) {
  const r = typeof t == "number" ? t : Date.now() - new Date(t).getTime(), s = Math.floor(r / 1e3);
  if (s < 60) return `${s}s ago`;
  const o = Math.floor(s / 60);
  if (o < 60) return `${o} min ago`;
  const i = Math.floor(o / 60);
  if (i < 24) return `${i} hour${i !== 1 ? "s" : ""} ago`;
  const a = Math.floor(i / 24);
  if (a < 30) return `${a} day${a !== 1 ? "s" : ""} ago`;
  const c = Math.floor(a / 30);
  return `${c} month${c !== 1 ? "s" : ""} ago`;
}
function Ar(t) {
  return t.split(/\s+/).map((r) => r[0]).join("").toUpperCase().slice(0, 2);
}
function jr({
  item: t,
  onClick: r,
  onDismiss: s
}) {
  return /* @__PURE__ */ d(
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
            children: Ar(t.authorName)
          }
        ),
        /* @__PURE__ */ d("div", { className: e("flex-1 min-w-0"), children: [
          /* @__PURE__ */ n("div", { className: e("text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"), children: t.commentText }),
          /* @__PURE__ */ n("div", { className: e("text-[11px] text-text-tertiary mt-0.5"), children: t.sectionTitle })
        ] }),
        /* @__PURE__ */ n("div", { className: e("text-[11px] text-text-tertiary shrink-0 mt-0.5"), children: Rr(t.timestamp) }),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: (o) => {
              o.stopPropagation(), s();
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
function Lr({
  item: t,
  onClick: r,
  onDismiss: s
}) {
  const o = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#22c55e"
  }, i = {
    pending: { bg: "#fef3c7", text: "#92400e" },
    acked: { bg: "#dbeafe", text: "#1e40af" },
    done: { bg: "#d1fae5", text: "#065f46" },
    rejected: { bg: "#fee2e2", text: "#991b1b" }
  }, a = i[t.status] ?? i.pending;
  return /* @__PURE__ */ d(
    "div",
    {
      className: e("flex gap-2.5 py-2.5 px-4 cursor-pointer border-b border-[#f3f4f6] items-start hover:bg-[#f9fafb]"),
      onClick: r,
      children: [
        /* @__PURE__ */ n(
          "div",
          {
            className: e("w-2 h-2 rounded-full shrink-0 mt-1"),
            style: { background: o[t.priority] ?? "#94a3b8" }
          }
        ),
        /* @__PURE__ */ d("div", { className: e("flex-1 min-w-0"), children: [
          /* @__PURE__ */ d("div", { className: e("text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"), children: [
            t.taskText,
            /* @__PURE__ */ n(
              "span",
              {
                className: e("inline-block text-[10px] font-semibold px-1.5 py-px rounded-full ml-1.5"),
                style: { background: a.bg, color: a.text },
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
            onClick: (c) => {
              c.stopPropagation(), s();
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
function Er({
  items: t,
  onNavigateToSection: r,
  onClose: s
}) {
  const [o, i] = M("all"), [a, c] = M(/* @__PURE__ */ new Set()), m = (f) => {
    c((u) => {
      const l = new Set(u);
      return l.add(f), l;
    });
  }, p = () => {
    const f = h.map((u) => u.kind === "mention" ? u.commentId : u.itemId);
    c((u) => {
      const l = new Set(u);
      return f.forEach((w) => l.add(w)), l;
    });
  }, h = t.filter((f) => {
    const u = f.kind === "mention" ? f.commentId : f.itemId;
    return a.has(u) ? !1 : o === "all" ? !0 : o === "mentions" ? f.kind === "mention" : f.kind === "task";
  });
  return /* @__PURE__ */ d(Re, { width: 340, children: [
    /* @__PURE__ */ n(
      Ae,
      {
        title: "My Mentions & Tasks",
        onClose: s,
        actions: h.length > 0 ? /* @__PURE__ */ n(Q, { variant: "default", size: "sm", onClick: p, children: "Clear all" }) : void 0
      }
    ),
    /* @__PURE__ */ n("div", { className: e("flex gap-0 border-b border-border shrink-0"), children: ["all", "mentions", "tasks"].map((f) => /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        className: e(
          "flex-1 py-2 text-[13px] bg-transparent border-none cursor-pointer font-[inherit]",
          o === f ? "font-semibold text-primary border-b-2 border-b-primary" : "font-normal text-text-secondary border-b-2 border-b-transparent"
        ),
        onClick: () => i(f),
        children: f === "all" ? "All" : f === "mentions" ? "Mentions" : "Tasks"
      },
      f
    )) }),
    /* @__PURE__ */ d(je, { padding: "0.5rem 0", children: [
      h.length === 0 && /* @__PURE__ */ n("div", { className: e("py-8 px-4 text-center text-text-tertiary text-[13px]"), children: "No mentions or tasks for you" }),
      h.map(
        (f) => f.kind === "mention" ? /* @__PURE__ */ n(
          jr,
          {
            item: f,
            onClick: () => r(f.sectionId),
            onDismiss: () => m(f.commentId)
          },
          f.commentId
        ) : /* @__PURE__ */ n(
          Lr,
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
function Or(t, r) {
  const s = new Date(t).getTime(), i = (r ? new Date(r).getTime() : Date.now()) - s, a = Math.floor(i / 6e4);
  return a < 1 ? "<1m" : a < 60 ? `${a}m` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function _r(t) {
  const r = Date.now() - new Date(t).getTime(), s = Math.floor(r / 6e4);
  if (s < 1) return "just now";
  if (s < 60) return `${s}m ago`;
  const o = Math.floor(s / 60);
  return o < 24 ? `${o}h ago` : `${Math.floor(o / 24)}d ago`;
}
function Br({ sessions: t, loading: r, onFetch: s, onClose: o }) {
  U(() => {
    s();
  }, [s]);
  const i = t.filter((c) => c.status === "ended"), a = t.filter((c) => c.status === "active");
  return /* @__PURE__ */ d(Re, { width: 340, children: [
    /* @__PURE__ */ n(Ae, { title: "Past Conversations", onClose: o }),
    /* @__PURE__ */ d(je, { padding: "12px", children: [
      r && /* @__PURE__ */ n("div", { className: e("text-center text-text-tertiary text-[13px] py-6"), children: "Loading..." }),
      !r && t.length === 0 && /* @__PURE__ */ n("div", { className: e("text-center text-text-tertiary text-[13px] py-6"), children: "No video conversations yet for this document." }),
      a.map((c) => /* @__PURE__ */ n(it, { session: c, isActive: !0 }, c.sessionId)),
      i.map((c) => /* @__PURE__ */ n(it, { session: c }, c.sessionId))
    ] })
  ] });
}
function it({ session: t, isActive: r }) {
  return /* @__PURE__ */ d("div", { className: e(
    "rounded-lg p-3 mb-2",
    r ? "border border-[#10b981] bg-[rgba(16,185,129,0.04)]" : "border border-border bg-white"
  ), children: [
    /* @__PURE__ */ d("div", { className: e("flex justify-between items-center mb-1"), children: [
      /* @__PURE__ */ n("span", { className: e("text-[11px] text-text-tertiary"), children: _r(t.startedAt) }),
      /* @__PURE__ */ d("div", { className: e("flex items-center gap-1"), children: [
        r && /* @__PURE__ */ n("span", { className: e("text-[11px] font-semibold text-[#10b981] bg-[rgba(16,185,129,0.1)] px-1.5 py-px rounded-full"), children: "Live" }),
        /* @__PURE__ */ n("span", { className: e("text-[11px] text-text-secondary"), children: Or(t.startedAt, t.endedAt) })
      ] })
    ] }),
    /* @__PURE__ */ n("div", { className: e("flex flex-wrap gap-1 mb-2"), children: t.participants.map((s, o) => /* @__PURE__ */ n("span", { className: e("text-[11px] text-text-secondary bg-[#f8fafc] px-2 py-0.5 rounded-full"), children: s.displayName || s.userId.slice(0, 10) }, `${s.userId}-${o}`)) }),
    t.aiSummary && /* @__PURE__ */ n("div", { className: e("text-[11px] text-text-primary bg-[#f8fafc] p-2 rounded-md leading-normal"), children: t.aiSummary }),
    t.transcriptStatus && t.transcriptStatus !== "available" && /* @__PURE__ */ d("div", { className: e("text-[11px] text-text-tertiary mt-1"), children: [
      "Transcript: ",
      t.transcriptStatus
    ] })
  ] });
}
function Ur({ sections: t, focusedSectionId: r }) {
  const [s, o] = M(null);
  U(() => {
    if (t.length === 0) return;
    const p = new IntersectionObserver(
      (h) => {
        let f = null;
        for (const u of h)
          u.isIntersecting && (!f || u.intersectionRatio > f.intersectionRatio) && (f = u);
        if (f) {
          const u = f.target.id.replace("section-", "");
          o(u);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-80px 0px -40% 0px" }
    );
    for (const h of t) {
      const f = document.getElementById(`section-${h.id}`);
      f && p.observe(f);
    }
    return () => p.disconnect();
  }, [t]);
  const i = s || r, a = A((p) => {
    const h = document.getElementById(`section-${p}`);
    h && h.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []), c = t.filter((p, h, f) => f.findIndex((u) => u.id === p.id) === h);
  if (c.length === 0) return null;
  const m = c.findIndex((p) => p.id === i);
  return /* @__PURE__ */ d("div", { className: e("flex flex-col gap-0 text-[11px] w-[140px] max-h-[calc(100vh-160px)] overflow-y-auto"), children: [
    /* @__PURE__ */ n("div", { className: e("text-[10px] font-semibold text-text-tertiary uppercase tracking-wide mb-1.5"), children: "Contents" }),
    c.map((p, h) => {
      const f = p.id === i, u = m >= 0 && h < m;
      return /* @__PURE__ */ d(
        "button",
        {
          type: "button",
          onClick: () => a(p.id),
          className: e("flex items-center gap-2 py-1 border-none bg-transparent cursor-pointer text-left font-[inherit]"),
          children: [
            /* @__PURE__ */ n("div", { className: e("flex flex-col items-center w-3 shrink-0"), children: /* @__PURE__ */ n(
              "div",
              {
                className: e(
                  "rounded-full transition-all duration-200",
                  f ? "w-2 h-2 bg-[#3b82f6] shadow-[0_0_0_3px_rgba(59,130,246,0.2)]" : u ? "w-1.5 h-1.5 bg-[#94a3b8]" : "w-1.5 h-1.5 bg-[#d1d5db]"
                )
              }
            ) }),
            /* @__PURE__ */ n("span", { className: e(
              "text-[11px] overflow-hidden text-ellipsis whitespace-nowrap transition-colors duration-200",
              f ? "font-semibold text-[#1e293b]" : u ? "font-normal text-[#64748b]" : "font-normal text-text-tertiary"
            ), children: p.title || "Untitled" })
          ]
        },
        p.id
      );
    }),
    m >= 0 && /* @__PURE__ */ d("div", { className: e("text-[10px] text-text-tertiary mt-2"), children: [
      m + 1,
      " / ",
      c.length
    ] })
  ] });
}
function Vr({
  showHistory: t,
  showMyItems: r,
  showVideoHistory: s,
  closePanel: o,
  versionHistory: i,
  ydoc: a,
  myItems: c,
  onNavigateToSection: m,
  videoSessions: p,
  showTOC: h,
  commentSidebarOpen: f,
  sections: u,
  focusedSectionId: l,
  mode: w
}) {
  return /* @__PURE__ */ d(K, { children: [
    t && /* @__PURE__ */ n(
      Dr,
      {
        versions: i.versions,
        loading: i.loading,
        previewTimestamp: i.previewTimestamp,
        onFetch: i.fetchVersions,
        onPreview: i.previewVersion,
        onClearPreview: i.clearPreview,
        onClose: o,
        onSaveVersion: i.saveVersion,
        onCompare: i.compareVersion,
        onClearCompare: i.clearCompare,
        compareSections: i.compareSections,
        compareTimestamp: i.compareTimestamp,
        currentSections: a ? i.extractSections(a) : [],
        onRestore: i.restoreVersion
      }
    ),
    r && /* @__PURE__ */ n(
      Er,
      {
        items: c,
        onNavigateToSection: m,
        onClose: o
      }
    ),
    s && /* @__PURE__ */ n(
      Br,
      {
        sessions: p.sessions,
        loading: p.loading,
        onFetch: p.fetchSessions,
        onClose: o
      }
    ),
    h && !f && u.length > 1 && w === "editor" && /* @__PURE__ */ n("div", { className: e(
      "fixed bottom-4 right-4 w-40 max-h-[280px] overflow-y-auto",
      "bg-white border border-border rounded-[10px] px-3 py-2.5",
      "shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-30"
    ), children: /* @__PURE__ */ n(
      Ur,
      {
        sections: u.map((b) => ({ id: b.id, title: b.title })),
        focusedSectionId: l
      }
    ) })
  ] });
}
function Fr({
  documentId: t,
  documentType: r,
  ws: s,
  userId: o,
  displayName: i,
  color: a = "#3b82f6",
  onMessage: c,
  activityPublish: m,
  onBack: p,
  isVideoDocked: h,
  onDockVideo: f,
  onUndockVideo: u
}) {
  const l = Dn({
    documentId: t,
    documentType: r,
    ws: s,
    userId: o,
    displayName: i,
    color: a,
    onMessage: c,
    activityPublish: m,
    isVideoDocked: h,
    onDockVideo: f,
    onUndockVideo: u,
    onBack: p
  }), w = l.sections.length === 0 && !l.demoLoaded, [b] = M(() => {
    if (typeof document > "u") return null;
    const N = document.createElement("div");
    return N.style.width = "100%", N;
  });
  U(() => {
    if (!b) return;
    if (!l.showVideoCall) {
      b.parentNode?.removeChild(b);
      return;
    }
    const N = l.isVideoDocked ? "sidebar-video-slot" : "inline-video-slot", $ = () => {
      const v = document.getElementById(N);
      return v && v !== b.parentNode ? (v.appendChild(b), !0) : v === b.parentNode;
    };
    if ($()) return;
    const x = setInterval(() => {
      $() && clearInterval(x);
    }, 50), k = setTimeout(() => clearInterval(x), 2e3);
    return () => {
      clearInterval(x), clearTimeout(k);
    };
  }, [b, l.showVideoCall, l.isVideoDocked, l.mode]), U(() => () => {
    b?.parentNode?.removeChild(b);
  }, [b]);
  const S = l.showVideoCall && b ? lt(
    /* @__PURE__ */ n(
      Hn,
      {
        documentId: t,
        userId: o,
        idToken: l.idToken,
        meta: l.meta,
        updateMeta: l.updateMeta,
        sendMessage: s.sendMessage,
        isDocked: l.isVideoDocked,
        onClose: () => {
          l.setShowVideoCall(!1), l.isVideoDocked && u?.();
        },
        onDockToSidebar: l.isVideoDocked ? void 0 : (() => {
          f?.();
        }),
        onUndock: l.isVideoDocked ? (() => {
          u?.();
        }) : void 0,
        onCallEnd: () => {
          l.setShowVideoCall(!1), u?.();
        }
      }
    ),
    b
  ) : null;
  return /* @__PURE__ */ d("div", { "data-testid": "document-editor-page", className: "flex flex-col h-full", children: [
    S,
    /* @__PURE__ */ n(
      _n,
      {
        meta: l.headerMeta,
        mode: l.mode,
        onModeChange: l.handleModeChange,
        participants: l.participants,
        onUpdateMeta: l.updateMeta,
        onExport: l.handleExport,
        onToggleHistory: l.handleToggleHistory,
        onToggleVideoCall: l.handleToggleVideoCall,
        onToggleVideoHistory: l.handleToggleVideoHistory,
        isCallActive: !!l.meta?.activeCallSessionId,
        onClearDocument: l.handleClearDocument,
        onJumpToUser: l.handleJumpToUser,
        sections: l.sections.map((N) => ({ id: N.id, title: N.title })),
        onToggleMyItems: l.handleToggleMyItems,
        myItemCount: l.myItems.length,
        commentCount: Object.values(l.comments).reduce((N, $) => N + $.length, 0),
        onBack: l.handleBack,
        onFollowUser: l.handleFollowUser,
        followingUserId: l.followingUserId,
        onFinalize: l.handleFinalize,
        onUnlock: l.handleUnlock,
        pastCallsCount: l.videoSessions.sessions.length
      }
    ),
    /* @__PURE__ */ n(
      Bn,
      {
        followingUserId: l.followingUserId,
        participants: l.participants,
        onStopFollow: l.handleStopFollow
      }
    ),
    /* @__PURE__ */ n("div", { className: "flex-1 overflow-auto p-4", children: /* @__PURE__ */ n(
      Nr,
      {
        mode: l.mode,
        isEmpty: w,
        isFinalized: l.isFinalized,
        sections: l.sections,
        documentId: t,
        displayName: i,
        color: a,
        userId: o,
        ydoc: l.ydoc,
        provider: l.provider,
        getSectionFragment: l.getSectionFragment,
        updateSection: l.updateSection,
        participants: l.participants,
        focusedSectionId: l.focusedSectionId,
        onSectionFocus: l.handleSectionFocus,
        comments: l.comments,
        onAddComment: l.handleAddComment,
        onResolveThread: l.handleResolveThread,
        onUnresolveThread: l.handleUnresolveThread,
        onUpdateCursorInfo: l.awareness.updateCursorInfo,
        onOpenComments: l.handleOpenComments,
        onAddItem: l.handleAddItem,
        onUpdateItem: l.handleUpdateItem,
        onRemoveItem: l.handleRemoveItem,
        restItems: l.restItems,
        commentSidebarOpen: l.commentSidebarOpen,
        commentSectionId: l.commentSectionId,
        commentSidebarTop: l.commentSidebarTop,
        sectionListRef: l.sectionListRef,
        onCloseComments: l.handleCloseComments,
        showVideoCall: l.showVideoCall,
        isVideoDocked: l.isVideoDocked,
        showInlineVideo: l.showInlineVideo,
        sidebarFixed: l.sidebarFixed,
        videoSpacerRef: l.videoSpacerRef,
        videoLeft: l.videoLeft,
        FIXED_TOP: l.FIXED_TOP,
        showTOC: l.showTOC,
        sectionReviews: l.sectionReviews,
        reviewSection: l.restReviewSection,
        headerMeta: l.headerMeta,
        onLoadDemo: l.handleLoadDemo,
        activityPublish: m
      }
    ) }),
    /* @__PURE__ */ n(
      Vr,
      {
        showHistory: l.showHistory,
        showMyItems: l.showMyItems,
        showVideoHistory: l.showVideoHistory,
        closePanel: l.closePanel,
        versionHistory: l.versionHistory,
        ydoc: l.ydoc,
        myItems: l.myItems,
        onNavigateToSection: l.handleNavigateToSection,
        videoSessions: l.videoSessions,
        showTOC: l.showTOC,
        commentSidebarOpen: l.commentSidebarOpen,
        sections: l.sections,
        focusedSectionId: l.focusedSectionId,
        mode: l.mode
      }
    )
  ] });
}
const Qr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fr
}, Symbol.toStringTag, { value: "Module" }));
export {
  fr as A,
  Mr as D,
  mr as E,
  Bn as F,
  cr as H,
  ur as K,
  pt as M,
  En as P,
  wr as R,
  bt as S,
  Ur as T,
  Dr as V,
  nr as a,
  Fr as b,
  _n as c,
  Er as d,
  ir as e,
  Jn as f,
  Zn as g,
  xr as h,
  Hn as i,
  Br as j,
  ut as k,
  dr as l,
  or as m,
  In as n,
  Qr as o,
  Se as r,
  Tn as u
};
