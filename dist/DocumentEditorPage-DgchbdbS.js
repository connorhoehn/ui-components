import { jsxs as c, jsx as n, Fragment as W } from "react/jsx-runtime";
import { useState as M, useCallback as R, useEffect as U, useRef as P, useMemo as at, forwardRef as tn, useImperativeHandle as nn } from "react";
import rn, { createPortal as lt } from "react-dom";
import { n as on, b as sn, c as an, g as ln, e as dn, j as cn, l as mn, m as pn, i as un } from "./useWebSocket-Bn4OeUor.js";
import { u as fn } from "./IdentityContext-CLalsm_M.js";
import { l as xn } from "./useDocumentTypes-C29MkgPl.js";
import { c as t } from "./cn-B6yFEsav.js";
import { u as hn } from "./useHangoutEmbed-D-rUq74K.js";
import { u as bn } from "./useActiveSpeaker-BOwJ262O.js";
import { D as gn, T as De } from "./NewDocumentModal-tuOrm4-5.js";
import { c as yn } from "./registry-DmLIk6XM.js";
function $e() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
const dt = /^- \[([ xX])\]\s+(.+)$/;
function vn(e, r) {
  const i = e.toLowerCase();
  return dt.test(r) || /- \[[ xX]\]/.test(r) ? "tasks" : i.includes("decision") ? "decisions" : i.includes("summary") ? "summary" : "notes";
}
function Ye(e) {
  const r = e.split(`
`), i = [], o = [];
  for (const s of r) {
    const a = s.match(dt);
    if (a) {
      const l = a[1].toLowerCase() === "x";
      i.push({
        id: $e(),
        text: a[2].trim(),
        status: l ? "done" : "pending",
        assignee: "",
        ackedBy: "",
        ackedAt: "",
        priority: "medium",
        notes: ""
      });
    } else
      o.push(s);
  }
  return {
    items: i,
    remaining: o.join(`
`).trim()
  };
}
function wn(e) {
  const r = {}, i = [], o = e.replace(/\r\n/g, `
`), s = o.match(/^# (.+)$/m);
  s && (r.title = s[1].trim());
  const a = o.split(/^## /m);
  if (a.length <= 1) {
    const l = o.replace(/^# .+\n*/m, "").trim();
    if (l.length > 0) {
      const { items: m, remaining: p } = Ye(l);
      i.push({
        id: $e(),
        type: "summary",
        title: r.title ?? "Untitled",
        contentMarkdown: p,
        items: m
      });
    }
    return { meta: r, sections: i };
  }
  for (let l = 1; l < a.length; l++) {
    const m = a[l], p = m.indexOf(`
`), h = p === -1 ? m.trim() : m.slice(0, p).trim(), f = p === -1 ? "" : m.slice(p + 1).trim(), { items: u, remaining: d } = Ye(f), w = vn(h, f);
    i.push({
      id: $e(),
      type: w,
      title: h,
      contentMarkdown: d,
      items: u
    });
  }
  return { meta: r, sections: i };
}
function Nn(e) {
  return `- [${e.status === "done" || e.status === "acked" ? "x" : " "}] ${e.text}`;
}
function ct(e, r = 0) {
  const i = "  ".repeat(r), o = [];
  o.push(`${i}> **${e.displayName}**: ${e.text}`);
  for (const s of e.replies)
    o.push(ct(s, r + 1));
  return o.join(`
`);
}
function kn(e) {
  const r = [`## ${e.title}`, ""], i = e.contentMarkdown ?? e.contentText;
  if (i && r.push(i, ""), e.items.length > 0) {
    for (const s of e.items)
      r.push(Nn(s));
    r.push("");
  }
  const o = e.comments;
  if (o && o.length > 0) {
    r.push(`### Comments (${o.length})`, "");
    for (const s of o)
      r.push(ct(s));
    r.push("");
  }
  return r.join(`
`);
}
function Je(e) {
  const r = [`# ${e.meta.title}`, ""];
  for (const i of e.sections)
    r.push(kn(i));
  return r.join(`
`).trimEnd() + `
`;
}
const Cn = `# Q2 Sprint Planning - Meeting Summary

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
function Sn(e) {
  return e.toString().replace(/<\/?(paragraph|heading|blockquote|codeBlock|bulletList|orderedList|listItem|taskList|taskItem|horizontalRule|hardBreak|doc)[^>]*>/g, `
`).replace(/<[^>]+>/g, "").replace(/\n{3,}/g, `

`).trim();
}
function Tn(e) {
  return e.split(`
`).map((r) => r.startsWith("### ") ? `<h3>${r.slice(4)}</h3>` : r.startsWith("## ") ? `<h2>${r.slice(3)}</h2>` : r.startsWith("# ") ? `<h1>${r.slice(2)}</h1>` : r.startsWith("> ") ? `<blockquote>${r.slice(2)}</blockquote>` : r.startsWith("- [x] ") ? `<li>&#9745; ${r.slice(6)}</li>` : r.startsWith("- [ ] ") ? `<li>&#9744; ${r.slice(6)}</li>` : r.startsWith("- ") ? `<li>${r.slice(2)}</li>` : r.trim() === "" ? "<br/>" : `<p>${r}</p>`).join(`
`).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/`([^`]+)`/g, "<code>$1</code>");
}
function Ze(e, r) {
  const i = URL.createObjectURL(e), o = document.createElement("a");
  o.href = i, o.download = r, o.click(), URL.revokeObjectURL(i);
}
function In({
  documentId: e,
  userId: r,
  ws: i,
  updateMeta: o,
  addSection: s,
  exportJSON: a,
  getSectionFragment: l,
  comments: m
}) {
  const [p, h] = M(!1), f = R(() => {
    const w = wn(Cn);
    o({
      id: e,
      title: w.meta.title || "Untitled",
      sourceType: "notes",
      sourceId: "",
      createdBy: r,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      aiModel: "",
      status: "draft"
    });
    for (const b of w.sections)
      s({
        id: b.id,
        type: b.type,
        title: b.title,
        collapsed: !1,
        items: b.items
      });
    h(!0);
  }, [e, r, o, s]), u = R(() => {
    i.sendMessage({
      service: "crdt",
      action: "clearDocument",
      channel: `doc:${e}`
    }), h(!1);
  }, [i, e]), d = R((w) => {
    const b = a();
    if (b) {
      for (const S of b.sections) {
        const N = l(S.id);
        N && (S.contentText = Sn(N));
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
          <body>${Tn(S)}</body>
          </html>
        `), N.document.close(), N.print());
      }
    }
  }, [a, l, m]);
  return {
    demoLoaded: p,
    handleLoadDemo: f,
    handleClearDocument: u,
    handleExport: d
  };
}
function Mn(e = {}) {
  const [r, i] = M(
    e.initialPanel ?? null
  ), o = R((l) => {
    i((m) => m === l ? null : l);
  }, []), s = R((l) => {
    i(l);
  }, []), a = R(() => {
    i(null);
  }, []);
  return {
    activePanel: r,
    showHistory: r === "history",
    showMyItems: r === "myItems",
    showVideoHistory: r === "videoHistory",
    toggleHistory: R(() => o("history"), [o]),
    toggleMyItems: R(() => o("myItems"), [o]),
    toggleVideoHistory: R(() => o("videoHistory"), [o]),
    openPanel: s,
    closePanel: a
  };
}
function $n(e, r) {
  const i = `${e}::${r}`;
  let o = 5381;
  for (let s = 0; s < i.length; s++)
    o = o * 33 ^ i.charCodeAt(s);
  return `tpl-${(o >>> 0).toString(36)}`;
}
function Dn(e) {
  const r = e.getArray("sections"), i = /* @__PURE__ */ new Set(), o = [];
  return r.toArray().forEach((s, a) => {
    const l = s.get("id");
    typeof l != "string" || !l || (i.has(l) ? o.push(a) : i.add(l));
  }), o.length === 0 ? 0 : (e.transact(() => {
    for (let s = o.length - 1; s >= 0; s--)
      r.delete(o[s], 1);
  }), o.length);
}
function Rn() {
  if (typeof window < "u") {
    const r = new URLSearchParams(window.location.search).get("mode");
    if (r === "editor" || r === "ack" || r === "reader") return r;
  }
  return "editor";
}
function An(e) {
  return e.toString().replace(/<\/?(paragraph|heading|blockquote|codeBlock|bulletList|orderedList|listItem|taskList|taskItem|horizontalRule|hardBreak|doc)[^>]*>/g, `
`).replace(/<[^>]+>/g, "").replace(/\n{3,}/g, `

`).trim();
}
function jn({
  documentId: e,
  documentType: r,
  ws: i,
  userId: o,
  displayName: s,
  color: a = "#3b82f6",
  onMessage: l,
  activityPublish: m,
  isVideoDocked: p,
  onDockVideo: h,
  onUndockVideo: f,
  onBack: u
}) {
  const [d, w] = M(Rn), {
    showHistory: b,
    showMyItems: S,
    showVideoHistory: N,
    toggleHistory: $,
    toggleMyItems: x,
    toggleVideoHistory: k,
    closePanel: v
  } = Mn(), [D, A] = M(p ?? !1), [C, j] = M(typeof window < "u" ? window.innerWidth : 1400);
  U(() => {
    const y = () => j(window.innerWidth);
    return window.addEventListener("resize", y), () => window.removeEventListener("resize", y);
  }, []);
  const T = C >= 1200, g = C >= 900, [O, q] = M(!1), G = P(null), te = P(null), [ue, fe] = M(0), [, de] = M(0), Q = P(null), ce = 146, X = R(() => {
    if (Q.current === null) {
      const B = G.current ?? te.current;
      B && (Q.current = B.getBoundingClientRect().top + window.scrollY);
    }
    const y = Q.current ?? 250, I = window.scrollY > y - ce;
    q(I), G.current && fe(G.current.getBoundingClientRect().left), te.current && de(te.current.getBoundingClientRect().left);
  }, []);
  U(() => {
    const y = () => {
      Q.current = null, X();
    };
    return window.addEventListener("scroll", X, { passive: !0 }), window.addEventListener("resize", y, { passive: !0 }), () => {
      window.removeEventListener("scroll", X), window.removeEventListener("resize", y);
    };
  }, [X]), U(() => {
    const y = setTimeout(() => {
      Q.current = null, X();
    }, 50);
    return () => clearTimeout(y);
  }, [D, X]);
  const [ne, me] = M(null), [xe, se] = M(!1), [he, be] = M(null), { idToken: L } = fn(), z = on(e, L), {
    meta: V,
    sections: F,
    synced: Y,
    updateMeta: J,
    addSection: Le,
    updateSection: yt,
    addItem: Ee,
    updateItem: Oe,
    removeItem: Be,
    getSectionFragment: _e,
    ydoc: Z,
    provider: vt,
    exportJSON: wt,
    participants: ge,
    awareness: ie
  } = sn({
    documentId: e,
    mode: d,
    ws: i,
    userId: o,
    displayName: s,
    color: a,
    onMessage: l
  }), {
    comments: ye,
    addComment: Ue,
    resolveThread: Ve,
    unresolveThread: Fe
  } = an({
    documentId: e,
    idToken: L,
    sendMessage: i.sendMessage,
    onMessage: l,
    connectionState: i.connectionState
  }), {
    sectionReviews: Nt,
    reviewSection: kt
  } = ln({
    documentId: e,
    idToken: L,
    sendMessage: i.sendMessage,
    onMessage: l,
    connectionState: i.connectionState
  }), Ct = at(() => F.map((y) => y.id), [F]), {
    items: St,
    addItem: Pe,
    updateItem: ze,
    removeItem: He
  } = dn({
    documentId: e,
    sectionIds: Ct,
    idToken: L,
    sendMessage: i.sendMessage,
    onMessage: l,
    connectionState: i.connectionState
  });
  U(() => {
    if (!(i.connectionState !== "connected" || !e))
      return i.sendMessage({
        service: "document-events",
        action: "subscribe",
        documentId: e
      }), () => {
        i.sendMessage({
          service: "document-events",
          action: "unsubscribe",
          documentId: e
        });
      };
  }, [e, i.connectionState, i.sendMessage]);
  const { demoLoaded: Tt, handleLoadDemo: It, handleClearDocument: Mt, handleExport: $t } = In({
    documentId: e,
    userId: o,
    ws: i,
    updateMeta: J,
    addSection: Le,
    exportJSON: wt,
    getSectionFragment: _e,
    comments: ye
  }), [ve, qe] = M(null), Dt = R((y) => {
    const I = y.lastSeen && Date.now() - y.lastSeen < 3e4, B = y.mode === "reviewer" ? "ack" : y.mode === "reader" ? "reader" : "editor";
    if (d !== B && (w(B), typeof window < "u")) {
      const E = new URL(window.location.href);
      E.searchParams.set("mode", B), window.history.replaceState({}, "", E.toString());
    }
    y.currentSectionId && setTimeout(() => {
      const E = document.getElementById(`section-${y.currentSectionId}`);
      E && (E.scrollIntoView({ behavior: "smooth", block: "center" }), I && (E.style.transition = "box-shadow 0.3s ease", E.style.boxShadow = `0 0 0 3px ${y.color}40`, setTimeout(() => {
        E.style.boxShadow = "";
      }, 2e3)));
    }, 150);
  }, [d, F]), Rt = R((y) => {
    const I = y.userId || y.clientId;
    me((B) => B === I ? null : I);
  }, []), ae = P(null);
  U(() => {
    if (!ne) {
      ae.current = null;
      return;
    }
    const y = ge.find(
      (_) => (_.userId || _.clientId) === ne
    );
    if (!y || !y.currentSectionId) {
      if (y && F.length > 0) {
        const _ = document.getElementById(`section-${F[0].id}`);
        _ && !ae.current && (_.scrollIntoView({ behavior: "smooth", block: "start" }), ae.current = "__initial__");
      }
      return;
    }
    if (y.currentSectionId === ae.current) return;
    ae.current = y.currentSectionId;
    const I = y.mode === "reviewer" ? "ack" : y.mode === "reader" ? "reader" : "editor";
    if (d !== I && (w(I), typeof window < "u")) {
      const _ = new URL(window.location.href);
      _.searchParams.set("mode", I), window.history.replaceState({}, "", _.toString());
    }
    const B = setTimeout(() => {
      const _ = document.getElementById(`section-${y.currentSectionId}`);
      _ && (_.scrollIntoView({ behavior: "smooth", block: "center" }), _.style.transition = "box-shadow 0.3s ease", _.style.boxShadow = `0 0 0 3px ${y.color}40`, E = setTimeout(() => {
        _.style.boxShadow = "";
      }, 1500));
    }, 100);
    let E;
    return () => {
      clearTimeout(B), E && clearTimeout(E);
    };
  }, [ne, ge, d, F]);
  const At = R(() => {
    me(null);
  }, []), jt = R((y, I) => {
    const B = { id: crypto.randomUUID(), ...I };
    Ee(y, B), Pe(y, B).catch(() => {
    });
    const E = F.find((_) => _.id === y);
    m("doc.add_item", { sectionTitle: E?.title, documentId: e, documentTitle: V?.title });
  }, [Ee, Pe, F, m, e, V?.title]), Lt = R((y, I, B) => {
    Oe(y, I, B), ze(y, I, B).catch(() => {
    });
  }, [Oe, ze]), Et = R((y, I) => {
    Be(y, I), He(y, I).catch(() => {
    });
  }, [Be, He]);
  U(() => {
    if (F.length === 0 || ve) return;
    const y = setTimeout(() => {
      const I = F[0].id;
      qe(I), ie.updateSection(I);
    }, 500);
    return () => clearTimeout(y);
  }, [F, ve, ie]);
  const Ot = R((y) => {
    qe(y), ie.updateSection(y);
  }, [ie]), Ke = P(null), [Bt, _t] = M(0), Ut = R((y) => {
    be(y), se(!0), requestAnimationFrame(() => {
      const I = document.getElementById(`section-${y}`), B = Ke.current;
      if (I && B) {
        const E = I.getBoundingClientRect(), _ = B.getBoundingClientRect();
        _t(E.top - _.top);
      }
    });
  }, []), Vt = R(() => {
    se(!1);
  }, []), Ft = R((y, I, B) => {
    Ue(y, I, B), m("doc.comment", { sectionId: y, text: I.slice(0, 50), documentId: e, documentTitle: V?.title });
    const E = I.match(/@[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)*/g);
    if (E && E.length > 0) {
      const _ = E.map((ke) => ke.slice(1).trim()), H = F.find((ke) => ke.id === y);
      m("doc.mention", {
        sectionId: y,
        sectionTitle: H?.title ?? "",
        mentionedNames: _,
        commentText: I.slice(0, 80),
        authorName: s,
        documentId: e,
        documentTitle: V?.title
      });
    }
  }, [Ue, m, F, s, e, V?.title]), Pt = R((y, I) => {
    Ve(y, I), m("doc.resolve_thread", { sectionId: y, commentId: I, documentId: e, documentTitle: V?.title });
  }, [Ve, m, e, V?.title]), zt = R((y, I) => {
    Fe(y, I), m("doc.unresolve_thread", { sectionId: y, commentId: I, reopenedBy: s, documentId: e, documentTitle: V?.title });
  }, [Fe, m, s, e, V?.title]), Ht = cn({ sections: F, comments: ye, displayName: s, userId: o }), qt = R((y) => {
    setTimeout(() => {
      const I = document.getElementById(`section-${y}`);
      I && (I.scrollIntoView({ behavior: "smooth", block: "center" }), I.style.transition = "box-shadow 0.3s ease", I.style.boxShadow = "0 0 0 3px #3b82f640", setTimeout(() => {
        I.style.boxShadow = "";
      }, 2e3));
    }, 150);
  }, []), we = x, Kt = $, Wt = k, Yt = R(() => {
    A((y) => !y), v();
  }, [v]);
  U(() => {
    const y = (I) => {
      (I.metaKey || I.ctrlKey) && I.key === "m" && (I.preventDefault(), we());
    };
    return window.addEventListener("keydown", y), () => window.removeEventListener("keydown", y);
  }, [we]);
  const Jt = `doc:${e}`, Ne = mn({
    channel: Jt,
    sendMessage: i.sendMessage,
    onMessage: l
  });
  U(() => {
    b ? Ne.fetchVersions() : Ne.clearPreview();
  }, [b]), U(() => {
    if (!Y || !r || !Z) return;
    const y = Z.getMap("meta");
    if (y.get("templateApplied") || Z.getArray("sections").length > 0) return;
    const E = xn().find((H) => H.name === r);
    if (!E) return;
    Z.transact(() => {
      y.set("templateApplied", !0);
    });
    const _ = (H) => H === "tasks" ? "tasks" : H === "decisions" ? "decisions" : "notes";
    J({
      id: e,
      title: V?.title || E.name,
      sourceType: "notes",
      sourceId: "",
      createdBy: o,
      createdByName: s,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      aiModel: "",
      status: "draft",
      documentType: E.name
    });
    for (const H of E.fields)
      Le({
        // Deterministic, not random: two clients opening this document at the
        // same moment both pass the guards above (templateApplied is a Y.Map
        // key, not a lock), so they must produce the SAME ids or the document
        // ends up with two indistinguishable copies of every section.
        id: $n(e, H.name),
        type: _(H.sectionType),
        sectionType: H.sectionType,
        title: H.name,
        collapsed: H.defaultCollapsed,
        placeholder: H.placeholder || void 0,
        items: []
      });
  }, [Y, r, Z]), U(() => {
    !Y || !Z || Dn(Z);
  }, [Y, Z]);
  const Zt = (y) => {
    if (w(y), typeof window < "u") {
      const I = new URL(window.location.href);
      I.searchParams.set("mode", y), window.history.replaceState({}, "", I.toString());
    }
  }, We = V ?? {
    id: e,
    title: "",
    sourceType: "notes",
    sourceId: "",
    createdBy: "",
    createdAt: "",
    aiModel: "",
    status: "draft"
  }, Gt = We.status === "final", Xt = R(() => {
    window.confirm("Finalize this document? It will become read-only.") && (J({ status: "final" }), m("doc.finalize", { documentId: e, documentTitle: V?.title }));
  }, [J, m, e, V?.title]), Qt = R(() => {
    J({ status: "draft" }), m("doc.unlock", { documentId: e, documentTitle: V?.title });
  }, [J, m, e, V?.title]), en = R(() => {
    D && !p && h?.(), u?.();
  }, [D, p, h, u]);
  return {
    // Mode
    mode: d,
    handleModeChange: Zt,
    // Meta
    meta: V,
    headerMeta: We,
    isFinalized: Gt,
    handleFinalize: Xt,
    handleUnlock: Qt,
    updateMeta: J,
    // Sections
    sections: F,
    updateSection: yt,
    getSectionFragment: _e,
    // Document
    ydoc: Z,
    provider: vt,
    synced: Y,
    demoLoaded: Tt,
    handleLoadDemo: It,
    handleClearDocument: Mt,
    handleExport: $t,
    // Participants
    participants: ge,
    awareness: ie,
    // Focus
    focusedSectionId: ve,
    handleSectionFocus: Ot,
    handleJumpToUser: Dt,
    // Follow
    followingUserId: ne,
    handleFollowUser: Rt,
    handleStopFollow: At,
    // Comments
    comments: ye,
    commentSidebarOpen: xe,
    commentSectionId: he,
    commentSidebarTop: Bt,
    sectionListRef: Ke,
    handleOpenComments: Ut,
    handleCloseComments: Vt,
    handleAddComment: Ft,
    handleResolveThread: Pt,
    handleUnresolveThread: zt,
    // Items
    restItems: St,
    handleAddItem: jt,
    handleUpdateItem: Lt,
    handleRemoveItem: Et,
    // Reviews
    sectionReviews: Nt,
    restReviewSection: kt,
    // Sidebar panels
    showHistory: b,
    showMyItems: S,
    showVideoHistory: N,
    handleToggleHistory: Kt,
    handleToggleMyItems: we,
    handleToggleVideoHistory: Wt,
    closePanel: v,
    // Video
    showVideoCall: D,
    setShowVideoCall: A,
    handleToggleVideoCall: Yt,
    videoSessions: z,
    isVideoDocked: p,
    onDockVideo: h,
    onUndockVideo: f,
    // Responsive
    showTOC: T,
    showInlineVideo: g,
    sidebarFixed: O,
    videoSpacerRef: G,
    tocSpacerRef: te,
    videoLeft: ue,
    FIXED_TOP: ce,
    // My items
    myItems: Ht,
    handleNavigateToSection: qt,
    // Version history
    versionHistory: Ne,
    // Navigation
    handleBack: en,
    // Identity
    idToken: L,
    // Activity
    activityPublish: m,
    // User
    displayName: s,
    color: a,
    userId: o,
    documentId: e
  };
}
function Ln(e) {
  return e.split(" ").map((r) => r[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function En(e, r = 0.2) {
  const i = e.replace("#", ""), o = parseInt(i, 16), s = Math.max(0, (o >> 16 & 255) * (1 - r)), a = Math.max(0, (o >> 8 & 255) * (1 - r)), l = Math.max(0, (o & 255) * (1 - r));
  return `rgb(${Math.round(s)}, ${Math.round(a)}, ${Math.round(l)})`;
}
function Ge(e) {
  switch (e) {
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
function Xe(e) {
  if (!e) return "";
  const r = Math.floor((Date.now() - e) / 1e3);
  return r < 5 ? "" : r < 60 ? `, ${r}s` : r < 3600 ? `, ${Math.floor(r / 60)}m` : `, ${Math.floor(r / 3600)}h`;
}
function On(e) {
  switch (e) {
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
function Bn({
  participant: e,
  sectionTitle: r,
  onJumpToUser: i,
  onFollowUser: o,
  isFollowing: s
}) {
  const [a, l] = M(!1), m = P(null), p = P(null), h = () => {
    p.current && (clearTimeout(p.current), p.current = null), l(!0);
  }, f = () => {
    p.current = setTimeout(() => l(!1), 150);
  }, u = On(e.mode), d = e.color || "#3b82f6";
  return /* @__PURE__ */ c(
    "div",
    {
      ref: m,
      className: t("flex flex-col items-center gap-[3px] relative cursor-pointer animate-[presenceFadeIn_0.3s_ease]"),
      onMouseEnter: h,
      onMouseLeave: f,
      onClick: () => i?.(e),
      children: [
        a && /* @__PURE__ */ c(
          "div",
          {
            className: t("absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-[#1e293b] text-white py-2 px-3 rounded-md text-xs whitespace-nowrap z-[100] pointer-events-auto shadow-[0_4px_12px_rgba(0,0,0,0.15)] leading-snug"),
            onMouseEnter: h,
            onMouseLeave: f,
            children: [
              /* @__PURE__ */ n("div", { className: t("font-semibold mb-0.5"), children: e.displayName }),
              /* @__PURE__ */ c("div", { className: t("text-text-tertiary text-[11px]"), children: [
                e.idle ? "away" : Ge(e.mode),
                Xe(e.lastSeen)
              ] }),
              r && /* @__PURE__ */ c("div", { className: t("text-text-tertiary text-[11px] mt-0.5"), children: [
                "§ ",
                r
              ] }),
              o && /* @__PURE__ */ n(
                "div",
                {
                  role: "button",
                  onClick: (w) => {
                    w.stopPropagation(), o(e);
                  },
                  className: t("mt-1 text-[11px] font-semibold cursor-pointer", s ? "text-warning-fg" : "text-info-fg"),
                  children: s ? "Stop following" : "Follow"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ c("div", { className: t("relative inline-block"), children: [
          /* @__PURE__ */ n(
            "div",
            {
              className: t("w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-semibold transition-[transform,box-shadow] duration-200 ease-in-out", a ? "scale-110" : "scale-100"),
              style: {
                background: `linear-gradient(135deg, ${d}, ${En(d, 0.2)})`,
                boxShadow: a ? `0 0 0 2px ${d}40` : "none"
              },
              children: Ln(e.displayName)
            }
          ),
          /* @__PURE__ */ n(
            "div",
            {
              className: t("absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white", e.idle ? "bg-warning" : "bg-success [animation:presencePulse_2s_infinite]")
            }
          )
        ] }),
        /* @__PURE__ */ c(
          "span",
          {
            className: t("text-[11px] font-semibold px-2 py-px rounded-full leading-4"),
            style: {
              background: e.idle ? "#fef3c7" : u.bg,
              color: e.idle ? "#92400e" : u.text
            },
            children: [
              e.idle ? "away" : Ge(e.mode),
              Xe(e.lastSeen)
            ]
          }
        ),
        s && /* @__PURE__ */ n("span", { className: t("text-[10px] font-semibold text-[#3b82f6]"), children: "following" }),
        r && /* @__PURE__ */ c("span", { className: t("text-[10px] text-[#64748b] max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap text-center"), children: [
          "§ ",
          r
        ] })
      ]
    }
  );
}
function _n({
  participants: e,
  sections: r,
  onJumpToUser: i,
  onFollowUser: o,
  followingUserId: s
}) {
  const a = /* @__PURE__ */ new Map();
  if (r)
    for (const l of r)
      a.set(l.id, l.title);
  return e.length === 0 ? null : /* @__PURE__ */ c("div", { "data-testid": "participant-avatars", className: t("flex items-center gap-0"), children: [
    /* @__PURE__ */ n("div", { className: t("flex gap-2.5 items-start py-1"), children: e.filter((l, m, p) => p.findIndex((h) => (h.userId || h.clientId) === (l.userId || l.clientId)) === m).map((l) => /* @__PURE__ */ n(
      Bn,
      {
        participant: l,
        sectionTitle: l.currentSectionId ? a.get(l.currentSectionId) : void 0,
        onJumpToUser: i,
        onFollowUser: o,
        isFollowing: s === (l.userId || l.clientId)
      },
      l.clientId
    )) }),
    /* @__PURE__ */ n("div", { className: t("w-px h-9 bg-border mx-1 self-center") })
  ] });
}
const Qe = {
  draft: { bg: "#fef3c7", text: "#92400e" },
  review: { bg: "#dbeafe", text: "#1e40af" },
  final: { bg: "#d1fae5", text: "#065f46" }
}, Un = [
  { mode: "editor", label: "Editor" },
  { mode: "ack", label: "Review" },
  { mode: "reader", label: "Read" }
];
function Vn({
  meta: e,
  mode: r,
  onModeChange: i,
  participants: o,
  onUpdateMeta: s,
  onExport: a,
  onToggleHistory: l,
  onToggleVideoCall: m,
  onToggleVideoHistory: p,
  isCallActive: h,
  onClearDocument: f,
  onJumpToUser: u,
  sections: d,
  onToggleMyItems: w,
  myItemCount: b,
  commentCount: S,
  onBack: N,
  onFollowUser: $,
  followingUserId: x,
  onFinalize: k,
  onUnlock: v,
  pastCallsCount: D
}) {
  const [A, C] = M(!1), j = Qe[e.status] ?? Qe.draft;
  return /* @__PURE__ */ c("header", { className: t("flex flex-col py-2 px-4 bg-white border-b border-[#e5e7eb] shrink-0 gap-1.5 sticky top-[53px] z-[34]"), children: [
    /* @__PURE__ */ c("div", { className: t("flex items-center justify-between"), children: [
      /* @__PURE__ */ c("div", { className: t("flex items-center gap-2.5"), children: [
        N && /* @__PURE__ */ n(
          "button",
          {
            onClick: N,
            className: t("bg-transparent border-none text-[#3b82f6] cursor-pointer text-[13px] p-0 flex items-center gap-1 font-[inherit]"),
            children: "← Documents"
          }
        ),
        /* @__PURE__ */ n(
          "input",
          {
            className: t("text-base font-semibold border border-transparent rounded outline-none bg-transparent font-[inherit] min-w-[180px] text-[#111827] py-1 px-2 focus:border-[#3b82f6]"),
            value: e.title,
            placeholder: "Untitled document",
            onChange: (T) => s({ title: T.target.value })
          }
        ),
        /* @__PURE__ */ n(
          "span",
          {
            className: t("inline-block text-[11px] font-semibold py-0.5 px-2.5 rounded-full"),
            style: { background: j.bg, color: j.text },
            children: e.status
          }
        ),
        r === "editor" && /* @__PURE__ */ n("span", { className: t("text-[11px] text-text-tertiary italic"), children: "Auto-saved" }),
        e.updatedAt && /* @__PURE__ */ c("span", { className: t("text-[11px] text-text-tertiary"), children: [
          "Last edited ",
          (() => {
            const T = Date.now() - new Date(e.updatedAt).getTime(), g = Math.floor(T / 6e4);
            if (g < 1) return "just now";
            if (g < 60) return `${g}m ago`;
            const O = Math.floor(g / 60);
            return O < 24 ? `${O}h ago` : `${Math.floor(O / 24)}d ago`;
          })()
        ] }),
        S != null && S > 0 && /* @__PURE__ */ c("span", { className: t("inline-flex items-center gap-1 text-[11px] font-semibold py-0.5 px-2.5 rounded-full bg-[#f3f4f6] text-[#6b7280]"), children: [
          /* @__PURE__ */ n("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ n("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }) }),
          S
        ] })
      ] }),
      o.length > 0 && /* @__PURE__ */ n(_n, { participants: o, sections: d, onJumpToUser: u, onFollowUser: $, followingUserId: x })
    ] }),
    /* @__PURE__ */ c("div", { className: t("flex items-center justify-between flex-wrap gap-1"), children: [
      /* @__PURE__ */ n("div", { className: t("flex gap-1"), children: Un.map(({ mode: T, label: g }) => /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          "data-testid": `mode-btn-${T}`,
          className: t(
            "py-1.5 px-3.5 text-[13px] font-semibold border border-[#d1d5db] rounded-md cursor-pointer font-[inherit]",
            r === T ? "bg-[#3b82f6] text-white" : "bg-white text-[#374151]"
          ),
          onClick: () => i(T),
          children: g
        },
        T
      )) }),
      /* @__PURE__ */ c("div", { className: t("flex items-center gap-2"), children: [
        /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            className: t("py-1.5 px-3 text-[13px] font-medium border border-[#d1d5db] rounded-md bg-white text-[#374151] cursor-pointer font-[inherit] relative"),
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
            className: t(
              "py-1.5 px-3 text-[13px] font-medium border rounded-md cursor-pointer font-[inherit] relative",
              h ? "bg-[#dcfce7] text-[#166534] border-[#86efac]" : "bg-white text-[#374151] border-[#d1d5db]"
            ),
            onClick: m,
            children: h ? "In Call" : "Call"
          }
        ),
        e.status === "final" ? /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: t("py-1.5 px-3 text-[13px] font-medium border border-[#86efac] rounded-md bg-[#f0fdf4] text-[#065f46] cursor-pointer font-[inherit] relative"),
            onClick: v,
            children: "Unlock"
          }
        ) : /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: t("py-1.5 px-3 text-[13px] font-medium border border-[#86efac] rounded-md bg-[#f0fdf4] text-[#065f46] cursor-pointer font-[inherit] relative"),
            onClick: k,
            children: "Finalize"
          }
        ),
        /* @__PURE__ */ c("div", { className: t("relative"), children: [
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: t("py-1.5 px-3 text-[13px] font-medium border border-[#d1d5db] rounded-md bg-white text-[#374151] cursor-pointer font-[inherit] relative tracking-wider"),
              onClick: () => C((T) => !T),
              title: "More actions",
              children: "⋯"
            }
          ),
          A && /* @__PURE__ */ c("div", { className: t("absolute top-full right-0 mt-1 bg-white border border-[#e5e7eb] rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50 min-w-[160px] overflow-hidden"), children: [
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: t("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-[#374151] text-left cursor-pointer font-[inherit] hover:bg-[#f3f4f6]"),
                onClick: () => {
                  l(), C(!1);
                },
                children: "History"
              }
            ),
            p && (D ?? 0) > 0 && /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                className: t("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-[#374151] text-left cursor-pointer font-[inherit] hover:bg-[#f3f4f6]"),
                onClick: () => {
                  p(), C(!1);
                },
                children: [
                  "Past Calls (",
                  D,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ n("div", { className: t("border-t border-[#f1f5f9] my-1") }),
            ["markdown", "pdf", "json"].map((T) => /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                className: t("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-[#374151] text-left cursor-pointer font-[inherit] hover:bg-[#f3f4f6]"),
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
            /* @__PURE__ */ n("div", { className: t("border-t border-[#f1f5f9] my-1") }),
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: t("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-[#dc2626] text-left cursor-pointer font-[inherit] hover:bg-[#fff5f5]"),
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
function Fn({
  followingUserId: e,
  participants: r,
  onStopFollow: i
}) {
  const o = P(null);
  if (U(() => {
    if (!e) return;
    const a = setTimeout(() => {
      const l = () => i(), m = ["mousedown", "keydown", "wheel"];
      for (const p of m)
        window.addEventListener(p, l, { once: !0, passive: !0 });
      o.current = () => {
        for (const p of m)
          window.removeEventListener(p, l);
      };
    }, 500);
    return () => {
      clearTimeout(a), o.current?.(), o.current = null;
    };
  }, [e, i]), !e) return null;
  const s = r.find(
    (a) => (a.userId || a.clientId) === e
  );
  return s ? /* @__PURE__ */ c("div", { className: t("flex items-center justify-center gap-2 px-4 py-1.5 bg-[#eff6ff] border-b border-[#bfdbfe] text-[13px] font-medium text-[#1d4ed8] shrink-0"), children: [
    /* @__PURE__ */ c("span", { children: [
      "Following ",
      s.displayName
    ] }),
    /* @__PURE__ */ n(
      "button",
      {
        onClick: i,
        className: t("bg-transparent border border-[#93c5fd] rounded px-2 py-0.5 text-xs font-semibold text-[#1d4ed8] cursor-pointer font-[inherit]"),
        children: "Stop"
      }
    )
  ] }) : null;
}
const Re = ({
  children: e,
  variant: r = "light",
  width: i = 320,
  style: o
}) => typeof document > "u" ? null : lt(
  /* @__PURE__ */ n(
    "div",
    {
      className: t(
        "fixed right-0 top-0 h-full z-[60] flex flex-col shadow-[-4px_0_12px_rgba(0,0,0,0.08)]",
        r === "dark" ? "bg-[#111827]" : "bg-surface"
      ),
      style: { width: i, ...o },
      children: e
    }
  ),
  document.body
), Ae = ({
  title: e,
  onClose: r,
  actions: i,
  variant: o = "light"
}) => {
  const s = o === "dark";
  return /* @__PURE__ */ c(
    "div",
    {
      className: t(
        "flex items-center justify-between px-4 py-2",
        s ? "border-b border-white/10" : "border-b border-border"
      ),
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: t(
              "text-[13px] font-semibold",
              s ? "text-white" : "text-text-primary"
            ),
            children: e
          }
        ),
        /* @__PURE__ */ c("div", { className: "flex items-center gap-1", children: [
          i,
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: r,
              className: t(
                "w-[22px] h-[22px] flex items-center justify-center",
                "bg-transparent border-none rounded-sm cursor-pointer",
                "text-sm p-0 leading-none",
                s ? "text-text-tertiary" : "text-text-secondary"
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
  children: e,
  padding: r
}) => /* @__PURE__ */ n(
  "div",
  {
    className: "flex-1 overflow-y-auto",
    style: { padding: r ?? "14px 12px" },
    children: e
  }
), Pn = {
  default: "bg-surface text-text-primary border border-border",
  primary: "bg-[#16a34a] text-white border border-[#16a34a]",
  danger: "bg-danger text-white border border-danger"
}, zn = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-[13px]"
}, ee = ({
  variant: e = "default",
  size: r = "md",
  style: i,
  type: o = "button",
  className: s,
  ...a
}) => /* @__PURE__ */ n(
  "button",
  {
    type: o,
    className: t(
      "rounded-sm cursor-pointer font-medium leading-[1.4]",
      Pn[e],
      zn[r],
      s
    ),
    style: i,
    ...a
  }
), pe = ({
  active: e = !1,
  activeColor: r = "rgba(255,255,255,0.1)",
  size: i = 36,
  style: o,
  type: s = "button",
  className: a,
  ...l
}) => /* @__PURE__ */ n(
  "button",
  {
    type: s,
    className: t(
      "flex items-center justify-center border-none rounded-full cursor-pointer p-0 text-inherit",
      a
    ),
    style: {
      width: i,
      height: i,
      background: e ? r : "transparent",
      ...o
    },
    ...l
  }
);
function Hn({ participant: e, isSpeaking: r }) {
  const i = P(null);
  return U(() => {
    const o = i.current, s = e.streams[0] ?? null;
    o && s && o.srcObject !== s && (o.srcObject = s);
  }, [e.streams]), /* @__PURE__ */ c(
    "div",
    {
      className: t("relative bg-[#111827] rounded-lg overflow-hidden transition-shadow duration-300", r ? "video-tile-speaking" : "video-tile-idle"),
      children: [
        /* @__PURE__ */ n(
          "video",
          {
            ref: i,
            autoPlay: !0,
            playsInline: !0,
            muted: e.isLocal,
            className: t("w-full h-full object-cover")
          }
        ),
        /* @__PURE__ */ n("div", { className: t("absolute bottom-0 left-0 right-0 h-9 bg-gradient-to-t from-black/50 to-transparent pointer-events-none") }),
        /* @__PURE__ */ c("div", { className: t("absolute bottom-1.5 left-1.5 flex items-center gap-1 bg-black/60 text-white text-[11px] font-medium px-2 py-[3px] rounded-full"), children: [
          r && /* @__PURE__ */ n("span", { className: t("w-[5px] h-[5px] rounded-full bg-[#34d399]") }),
          /* @__PURE__ */ n("span", { children: e.userId }),
          e.isLocal && /* @__PURE__ */ n("span", { className: t("opacity-50"), children: "(You)" })
        ] })
      ]
    }
  );
}
function qn({ stream: e, userId: r, cameraStream: i, isLocal: o }) {
  const s = P(null), a = P(null);
  return U(() => {
    const l = s.current;
    l && l.srcObject !== e && (l.srcObject = e);
  }, [e]), U(() => {
    const l = a.current;
    l && i && l.srcObject !== i && (l.srcObject = i);
  }, [i]), /* @__PURE__ */ c("div", { className: t("relative bg-black rounded-[10px] overflow-hidden border-2 border-[#3b82f6] aspect-video"), children: [
    /* @__PURE__ */ n(
      "video",
      {
        ref: s,
        autoPlay: !0,
        playsInline: !0,
        muted: !0,
        className: t("w-full h-full object-contain")
      }
    ),
    o && i && /* @__PURE__ */ n(
      "video",
      {
        ref: a,
        autoPlay: !0,
        playsInline: !0,
        muted: !0,
        className: t("absolute bottom-2 right-2 w-36 object-cover rounded-lg border-2 border-white/30 aspect-video")
      }
    ),
    /* @__PURE__ */ c("div", { className: t("absolute bottom-1.5 left-1.5 bg-[rgba(59,130,246,0.8)] text-white text-[11px] font-medium px-2 py-[3px] rounded-full"), children: [
      r,
      "'s screen"
    ] })
  ] });
}
function Kn({ stageToken: e, participantId: r, userId: i, onEndCall: o }) {
  const { participants: s, isJoined: a, isScreenSharing: l, error: m, toggleMute: p, toggleCamera: h, startScreenShare: f, stopScreenShare: u, leave: d } = hn({
    stageToken: e,
    userId: i,
    participantId: r
  }), { activeSpeakerId: w } = bn({ participants: s }), [b, S] = M(!1), [N, $] = M(!1), [x, k] = M(!1), v = at(
    () => s.map((C) => ({
      ...C,
      isSpeaking: C.participantId === w
    })),
    [s, w]
  ), D = v.find((C) => C.screenStream), A = () => {
    d(), o();
  };
  return m ? /* @__PURE__ */ c("div", { className: t("p-4 text-center text-[#dc2626] text-[13px]"), children: [
    m,
    /* @__PURE__ */ n("br", {}),
    /* @__PURE__ */ n(ee, { onClick: o, className: "mt-3", children: "Close" })
  ] }) : a ? /* @__PURE__ */ c(
    "div",
    {
      className: t("flex flex-col"),
      onMouseEnter: () => k(!0),
      onMouseLeave: () => k(!1),
      children: [
        D?.screenStream && /* @__PURE__ */ n("div", { className: t("p-1.5 pb-0"), children: /* @__PURE__ */ n(
          qn,
          {
            stream: D.screenStream,
            userId: D.userId,
            cameraStream: D.streams[0],
            isLocal: D.isLocal
          }
        ) }),
        /* @__PURE__ */ n(
          "div",
          {
            className: t("flex-1 grid gap-1 p-1.5 content-start", v.length <= 1 ? "grid-cols-1" : "grid-cols-2"),
            children: v.map((C) => /* @__PURE__ */ n(Hn, { participant: C, isSpeaking: C.isSpeaking }, C.participantId))
          }
        ),
        /* @__PURE__ */ c(
          "div",
          {
            className: t("flex justify-center gap-1 px-2 py-1.5 border-t border-[#374151] shrink-0 transition-opacity duration-200", x ? "opacity-100" : "opacity-0"),
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
                  onClick: () => l ? u() : f(),
                  title: l ? "Stop Sharing" : "Share Screen",
                  active: l,
                  activeColor: "#646cff",
                  style: { color: "#fff", background: l ? "#646cff" : "rgba(255,255,255,0.1)" },
                  children: "💻"
                }
              ),
              /* @__PURE__ */ n(
                pe,
                {
                  onClick: A,
                  title: "Leave Call",
                  style: { color: "#fff", background: "#dc2626" },
                  children: "📞"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ c("div", { className: t("text-center text-[10px] text-[#6b7280] py-1"), children: [
          s.length,
          " in call"
        ] })
      ]
    }
  ) : /* @__PURE__ */ n("div", { className: t("p-5 text-center text-[#6b7280] text-[13px]"), children: "Connecting to video..." });
}
function Wn({
  documentId: e,
  userId: r,
  idToken: i,
  meta: o,
  updateMeta: s,
  sendMessage: a,
  onClose: l,
  onDockToSidebar: m,
  isDocked: p,
  onUndock: h,
  onCallEnd: f
}) {
  const {
    callState: u,
    stageToken: d,
    participantId: w,
    userId: b,
    error: S,
    hasActiveCall: N,
    startCall: $,
    joinCall: x,
    endCall: k
  } = pn({ documentId: e, idToken: i, meta: o, updateMeta: s, sendMessage: a, displayName: r }), v = P(u);
  U(() => {
    v.current === "active" && u === "idle" && f?.(), v.current = u;
  }, [u, f]);
  const D = o?.activeCallSessionId;
  return /* @__PURE__ */ c("div", { className: t("bg-[#111827] border border-[#374151] rounded-xl overflow-hidden"), children: [
    /* @__PURE__ */ c("div", { className: t("flex items-center justify-between px-2 py-1 border-b border-[#374151] shrink-0"), children: [
      /* @__PURE__ */ n("span", { className: t("text-[11px] font-semibold text-[#9ca3af] m-0"), children: "Video" }),
      /* @__PURE__ */ c("div", { className: t("flex items-center gap-0.5"), children: [
        m && !p && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: m,
            title: "Dock to sidebar",
            className: t("w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-[#9ca3af] cursor-pointer text-xs leading-none p-0"),
            children: "←"
          }
        ),
        p && h && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: h,
            title: "Undock from sidebar",
            className: t("w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-[#9ca3af] cursor-pointer text-xs leading-none p-0"),
            children: "→"
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: l,
            title: "Close video",
            className: t("w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-[#9ca3af] cursor-pointer text-sm leading-none p-0"),
            children: "✕"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ c("div", { children: [
      u === "active" && d && w && b && /* @__PURE__ */ n(
        Kn,
        {
          stageToken: d,
          participantId: w,
          userId: b,
          onEndCall: k
        }
      ),
      (u === "creating" || u === "joining") && /* @__PURE__ */ n("div", { className: t("p-4 text-center text-[#9ca3af] text-[13px]"), children: u === "creating" ? "Starting call..." : "Joining call..." }),
      u === "error" && /* @__PURE__ */ c("div", { className: t("p-4 text-center"), children: [
        /* @__PURE__ */ n("div", { className: t("text-[#f87171] text-[13px] mb-3"), children: S }),
        /* @__PURE__ */ n(ee, { variant: "primary", onClick: () => $(), children: "Try Again" })
      ] }),
      u === "idle" && /* @__PURE__ */ n("div", { className: t("p-4 text-center"), children: N && D ? /* @__PURE__ */ c(W, { children: [
        /* @__PURE__ */ n("div", { className: t("text-[13px] text-[#d1d5db] mb-3"), children: "A call is in progress on this document." }),
        /* @__PURE__ */ n(ee, { variant: "primary", onClick: () => x(D), children: "Join Call" })
      ] }) : /* @__PURE__ */ c(W, { children: [
        /* @__PURE__ */ n("div", { className: t("text-[13px] text-[#9ca3af] mb-3"), children: "Start a video call with collaborators on this document." }),
        /* @__PURE__ */ n(ee, { variant: "primary", onClick: $, children: "Start Call" })
      ] }) })
    ] })
  ] });
}
const Yn = {
  summary: "#8b5cf6",
  tasks: "#3b82f6",
  decisions: "#f59e0b",
  notes: "#6b7280",
  custom: "#10b981"
};
function Jn(e) {
  return e.split(" ").map((r) => r[0] ?? "").join("").toUpperCase().slice(0, 2);
}
const Ce = 3;
function Zn({ participants: e }) {
  if (!e || e.length === 0) return null;
  const r = e.slice(0, Ce), i = e.length - Ce;
  return /* @__PURE__ */ c("div", { className: t("flex items-center ml-auto shrink-0"), children: [
    r.map((o, s) => /* @__PURE__ */ c(
      "div",
      {
        title: `${o.displayName} (${o.mode})`,
        className: t("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold border-2 border-white relative transition-transform duration-200"),
        style: {
          background: `linear-gradient(135deg, ${o.color || "#3b82f6"}, ${Gn(o.color || "#3b82f6", 0.2)})`,
          marginLeft: s === 0 ? 0 : -8,
          zIndex: Ce - s
        },
        children: [
          Jn(o.displayName),
          /* @__PURE__ */ n("div", { className: t("absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#10b981] border-2 border-white") })
        ]
      },
      o.clientId
    )),
    i > 0 && /* @__PURE__ */ c(
      "div",
      {
        className: t("w-6 h-6 rounded-full bg-border text-[#64748b] flex items-center justify-center text-[9px] font-bold border-2 border-white relative -ml-2"),
        children: [
          "+",
          i
        ]
      }
    )
  ] });
}
function Gn(e, r) {
  const i = e.replace("#", ""), o = parseInt(i, 16), s = Math.max(0, (o >> 16 & 255) * (1 - r)), a = Math.max(0, (o >> 8 & 255) * (1 - r)), l = Math.max(0, (o & 255) * (1 - r));
  return `rgb(${Math.round(s)}, ${Math.round(a)}, ${Math.round(l)})`;
}
function Xn({
  section: e,
  fragment: r,
  ydoc: i,
  provider: o,
  user: s,
  editable: a,
  onUpdateSection: l,
  onAddItem: m,
  onUpdateItem: p,
  onRemoveItem: h,
  participants: f,
  onFocus: u,
  isFocused: d,
  comments: w,
  onUpdateCursorInfo: b,
  commentCount: S = 0,
  onOpenComments: N,
  commentPresence: $
}) {
  const [x, k] = M(e.collapsed), v = () => {
    const g = !x;
    k(g), l({ collapsed: g });
  }, D = yn(e.sectionType ?? e.type, "editor") ?? gn, A = f && f.length > 0, C = A ? f[0].color || "#3b82f6" : "transparent", [j, T] = M(!1);
  return /* @__PURE__ */ c(
    "div",
    {
      id: `section-${e.id}`,
      "data-testid": `section-block-${e.id}`,
      className: t("border border-border rounded-lg mb-4 bg-white relative transition-[border-left,box-shadow] duration-300 ease-in-out"),
      style: {
        borderLeft: A ? `3px solid ${C}` : "1px solid #e2e8f0",
        boxShadow: d ? "0 0 0 2px rgba(59, 130, 246, 0.3)" : "none"
      },
      onClickCapture: u,
      onFocusCapture: u,
      children: [
        N && /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            onClick: (g) => {
              g.stopPropagation(), N(e.id);
            },
            onMouseEnter: () => T(!0),
            onMouseLeave: () => T(!1),
            className: t(
              "absolute top-1/2 -right-[52px] -translate-y-1/2 w-10 h-10 rounded-full border border-border flex items-center justify-center text-xl leading-none p-0 z-[1] shadow-sm cursor-pointer transition-[opacity,background] duration-150 ease-in-out",
              j ? "bg-surface-hover opacity-90" : "bg-white opacity-40"
            ),
            title: "Open comments",
            children: [
              /* @__PURE__ */ n("span", { className: t("pointer-events-none"), children: "💬" }),
              S > 0 && /* @__PURE__ */ n("span", { className: t("absolute -top-1 -right-1 min-w-[16px] h-4 rounded-lg bg-[#3b82f6] text-white text-[10px] font-bold flex items-center justify-center px-1 leading-none"), children: S }),
              $ && $.length > 0 && /* @__PURE__ */ n("span", { className: t("absolute -left-1 top-1/2 -translate-y-1/2 flex flex-col gap-0.5"), children: $.slice(0, 3).map((g) => /* @__PURE__ */ n(
                "span",
                {
                  title: g.displayName,
                  className: t("w-2 h-2 rounded-full border border-white block"),
                  style: { background: g.color || "#3b82f6" }
                },
                g.clientId
              )) })
            ]
          }
        ),
        /* @__PURE__ */ c("div", { className: t("flex items-center gap-2 py-2.5 px-3.5 bg-[#f8fafc] border-b border-border rounded-t-lg"), children: [
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: v,
              className: t(
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
              value: e.title,
              onChange: (g) => l({ title: g.target.value }),
              readOnly: !a,
              className: t("flex-1 border border-transparent rounded outline-none text-[15px] font-semibold font-[inherit] bg-transparent text-[#1e293b] py-0.5 px-1.5 cursor-text focus:border-[#3b82f6]")
            }
          ),
          /* @__PURE__ */ n(
            "span",
            {
              className: t("py-0.5 px-2.5 text-[11px] font-semibold rounded-xl text-white capitalize whitespace-nowrap"),
              style: { background: Yn[e.type] },
              children: e.type
            }
          ),
          /* @__PURE__ */ n(Zn, { participants: f ?? [] })
        ] }),
        !x && /* @__PURE__ */ n("div", { className: t("p-3.5"), children: /* @__PURE__ */ n(
          D,
          {
            section: e,
            viewMode: "editor",
            editable: a,
            fragment: r,
            ydoc: i,
            provider: o,
            user: s,
            onUpdateSection: l,
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
function Qn({
  sections: e,
  getSectionFragment: r,
  ydoc: i,
  provider: o,
  user: s,
  editable: a,
  onUpdateSection: l,
  onAddItem: m,
  onUpdateItem: p,
  onRemoveItem: h,
  participants: f,
  onSectionFocus: u,
  focusedSectionId: d,
  comments: w,
  onAddComment: b,
  onResolveThread: S,
  onUnresolveThread: N,
  onUpdateCursorInfo: $,
  onOpenComments: x
}) {
  return /* @__PURE__ */ n("div", { className: t("flex flex-col gap-0 pb-4"), children: e.map((k) => /* @__PURE__ */ n(
    Xn,
    {
      section: k,
      fragment: r(k.id),
      ydoc: i,
      provider: o,
      user: s,
      editable: a,
      onUpdateSection: (v) => l(k.id, v),
      onAddItem: (v) => m(k.id, v),
      onUpdateItem: (v, D) => p(k.id, v, D),
      onRemoveItem: (v) => h(k.id, v),
      participants: f?.filter((v) => v.currentSectionId === k.id),
      onFocus: () => u?.(k.id),
      isFocused: d === k.id,
      comments: w?.[k.id] ?? [],
      onAddComment: (v, D) => b?.(k.id, v, D),
      onResolveThread: (v) => S?.(k.id, v),
      onUnresolveThread: (v) => N?.(k.id, v),
      onUpdateCursorInfo: $,
      commentCount: (w?.[k.id] ?? []).length,
      onOpenComments: x
    },
    k.id
  )) });
}
function mt(e) {
  return `ws_attachments_${e}`;
}
function le(e) {
  try {
    const r = localStorage.getItem(mt(e));
    return r ? JSON.parse(r) : [];
  } catch {
    return [];
  }
}
function er(e) {
  const [r, i] = M(
    () => le(e)
  );
  U(() => {
    i(le(e));
  }, [e]);
  const o = (m) => {
    localStorage.setItem(mt(e), JSON.stringify(m)), i(m);
  };
  return { attachments: r, addFile: (m, p) => {
    o([
      ...le(e),
      { id: crypto.randomUUID(), kind: "file", name: m.trim(), url: p.trim(), addedAt: (/* @__PURE__ */ new Date()).toISOString() }
    ]);
  }, addDocumentLink: (m) => {
    o([
      ...le(e),
      { id: crypto.randomUUID(), kind: "document", title: m.trim(), addedAt: (/* @__PURE__ */ new Date()).toISOString() }
    ]);
  }, remove: (m) => {
    o(le(e).filter((p) => p.id !== m));
  } };
}
function tr({ onAdd: e, onCancel: r }) {
  const [i, o] = M(""), [s, a] = M(""), l = i.trim().length > 0 && s.trim().length > 0;
  return /* @__PURE__ */ c("div", { className: t("flex gap-2 items-start flex-wrap"), children: [
    /* @__PURE__ */ n(
      "input",
      {
        autoFocus: !0,
        placeholder: "File name",
        value: i,
        onChange: (m) => o(m.target.value),
        className: t("flex-1 min-w-[120px] border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none")
      }
    ),
    /* @__PURE__ */ n(
      "input",
      {
        placeholder: "URL or path",
        value: s,
        onChange: (m) => a(m.target.value),
        onKeyDown: (m) => {
          m.key === "Enter" && l && e(i, s);
        },
        className: t("flex-[2] min-w-[120px] border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none")
      }
    ),
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        disabled: !l,
        onClick: () => {
          l && e(i, s);
        },
        className: t("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"),
        children: "Attach"
      }
    ),
    /* @__PURE__ */ n("button", { type: "button", onClick: r, className: t("px-3 py-1.5 text-[13px] bg-transparent border-none text-[#64748b] cursor-pointer font-[inherit] shrink-0"), children: "Cancel" })
  ] });
}
function nr({ onAdd: e, onCancel: r }) {
  const [i, o] = M(""), s = i.trim().length > 0;
  return /* @__PURE__ */ c("div", { className: t("flex gap-2 items-center flex-wrap"), children: [
    /* @__PURE__ */ n(
      "input",
      {
        autoFocus: !0,
        placeholder: "Document name",
        value: i,
        onChange: (a) => o(a.target.value),
        onKeyDown: (a) => {
          a.key === "Enter" && s && e(i);
        },
        className: t("flex-1 min-w-[120px] border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none")
      }
    ),
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        disabled: !s,
        onClick: () => {
          s && e(i);
        },
        className: t("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"),
        children: "Link"
      }
    ),
    /* @__PURE__ */ n("button", { type: "button", onClick: r, className: t("px-3 py-1.5 text-[13px] bg-transparent border-none text-[#64748b] cursor-pointer font-[inherit] shrink-0"), children: "Cancel" })
  ] });
}
function rr({ attachment: e, onRemove: r, editable: i }) {
  const o = e.kind === "file";
  return /* @__PURE__ */ c("div", { className: t("flex items-center gap-2.5 px-2.5 py-[7px] rounded-md bg-[#f8fafc] border border-border"), children: [
    /* @__PURE__ */ n("span", { className: t("text-sm shrink-0 text-[#64748b]"), children: o ? "📎" : "📄" }),
    /* @__PURE__ */ c("div", { className: t("flex-1 min-w-0"), children: [
      o ? /* @__PURE__ */ n(
        "a",
        {
          href: e.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: t("text-[13px] text-[#2563eb] font-medium no-underline hover:underline"),
          children: e.name
        }
      ) : /* @__PURE__ */ n("span", { className: t("text-[13px] text-text-primary font-medium"), children: e.title }),
      /* @__PURE__ */ n("div", { className: t("text-[11px] text-text-tertiary mt-px"), children: o ? e.url : "Linked document" })
    ] }),
    i && /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        onClick: r,
        title: "Remove",
        className: t("bg-transparent border-none cursor-pointer text-[#ef4444] text-sm px-[5px] py-0.5 opacity-50 leading-none rounded shrink-0 hover:opacity-100"),
        children: "×"
      }
    )
  ] });
}
function or({ documentId: e, editable: r }) {
  const { attachments: i, addFile: o, addDocumentLink: s, remove: a } = er(e), [l, m] = M(null), p = i.length > 0;
  return /* @__PURE__ */ c("div", { className: t("mt-4 border border-border rounded-[10px] overflow-hidden"), children: [
    /* @__PURE__ */ c("div", { className: t(
      "flex items-center justify-between px-3.5 py-2.5 bg-[#f8fafc]",
      p || l ? "border-b border-border" : ""
    ), children: [
      /* @__PURE__ */ c("span", { className: t("text-[13px] font-semibold text-[#374151]"), children: [
        "Attachments",
        p && /* @__PURE__ */ n("span", { className: t("ml-1.5 text-[11px] text-text-tertiary font-normal"), children: i.length })
      ] }),
      r && l === null && /* @__PURE__ */ c("div", { className: t("flex gap-1.5"), children: [
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: () => m("file"),
            className: t("text-xs px-2.5 py-1 font-semibold bg-white border border-[#d1d5db] rounded-[5px] cursor-pointer font-[inherit] text-[#374151]"),
            children: "+ File"
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: () => m("document"),
            className: t("text-xs px-2.5 py-1 font-semibold bg-white border border-[#d1d5db] rounded-[5px] cursor-pointer font-[inherit] text-[#374151]"),
            children: "+ Document"
          }
        )
      ] })
    ] }),
    p && /* @__PURE__ */ n("div", { className: t("flex flex-col gap-1.5 px-3.5 py-2.5"), children: i.map((h) => /* @__PURE__ */ n(
      rr,
      {
        attachment: h,
        onRemove: () => a(h.id),
        editable: r
      },
      h.id
    )) }),
    l === "file" && /* @__PURE__ */ n("div", { className: t("px-3.5 py-2.5", p ? "border-t border-border" : ""), children: /* @__PURE__ */ n(
      tr,
      {
        onAdd: (h, f) => {
          o(h, f), m(null);
        },
        onCancel: () => m(null)
      }
    ) }),
    l === "document" && /* @__PURE__ */ n("div", { className: t("px-3.5 py-2.5", p ? "border-t border-border" : ""), children: /* @__PURE__ */ n(
      nr,
      {
        onAdd: (h) => {
          s(h), m(null);
        },
        onCancel: () => m(null)
      }
    ) }),
    !p && !l && /* @__PURE__ */ n("div", { className: t("px-3.5 py-3.5 text-xs text-text-tertiary text-center"), children: r ? "No attachments yet — add a file or link a document above." : "No attachments." })
  ] });
}
function sr(e) {
  const r = e.trim().split(/\s+/);
  return r.length === 0 ? "?" : r.length === 1 ? r[0].charAt(0).toUpperCase() : (r[0].charAt(0) + r[r.length - 1].charAt(0)).toUpperCase();
}
const pt = tn(
  function({ query: r, users: i, position: o, onSelect: s, onDismiss: a }, l) {
    const [m, p] = M(0), h = P(null), f = i.filter(
      (d) => d.displayName.toLowerCase().includes(r.toLowerCase())
    ).slice(0, 6);
    U(() => {
      p(0);
    }, [r]), U(() => {
      const d = h.current;
      if (!d) return;
      const w = d.children[m];
      w && w.scrollIntoView({ block: "nearest" });
    }, [m]);
    const u = R(
      (d) => d.key === "ArrowDown" ? (d.preventDefault(), p((w) => (w + 1) % Math.max(f.length, 1)), !0) : d.key === "ArrowUp" ? (d.preventDefault(), p((w) => (w - 1 + Math.max(f.length, 1)) % Math.max(f.length, 1)), !0) : d.key === "Enter" || d.key === "Tab" ? (d.preventDefault(), f.length > 0 && s(f[m]), !0) : d.key === "Escape" ? (d.preventDefault(), a(), !0) : !1,
      [f, m, s, a]
    );
    return nn(l, () => ({ handleKeyDown: u }), [u]), rn.createPortal(
      /* @__PURE__ */ n(
        "div",
        {
          ref: h,
          role: "listbox",
          className: t("fixed z-[1000] bg-white border border-border rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.12)] max-h-60 overflow-y-auto min-w-[200px]"),
          style: { top: o.top, left: o.left },
          children: f.length === 0 ? /* @__PURE__ */ n("div", { className: t("px-4 py-3 text-[13px] text-text-tertiary text-center"), children: "No users found" }) : f.map((d, w) => /* @__PURE__ */ c(
            "div",
            {
              role: "option",
              "aria-selected": w === m,
              className: t(
                "flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors duration-100",
                w === m ? "bg-[#eff6ff]" : "bg-transparent"
              ),
              onMouseEnter: () => p(w),
              onMouseDown: (b) => {
                b.preventDefault(), s(d);
              },
              children: [
                /* @__PURE__ */ n(
                  "div",
                  {
                    className: t("w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[11px] font-semibold text-white leading-none"),
                    style: { background: d.color },
                    children: d.type === "group" ? "#" : sr(d.displayName)
                  }
                ),
                /* @__PURE__ */ c("div", { className: t("flex items-center gap-1.5 flex-1 min-w-0"), children: [
                  /* @__PURE__ */ n("span", { className: t("text-[13px] font-medium text-[#1e293b] overflow-hidden text-ellipsis whitespace-nowrap"), children: d.type === "group" ? `@${d.displayName.toLowerCase()}` : d.displayName }),
                  d.type === "user" && /* @__PURE__ */ n("span", { className: t("w-2 h-2 rounded-full shrink-0", d.online ? "bg-success" : "bg-text-disabled") }),
                  d.type === "user" && d.mode && /* @__PURE__ */ n("span", { className: t("text-[11px] text-text-tertiary shrink-0"), children: d.mode }),
                  d.type === "group" && d.memberCount != null && /* @__PURE__ */ c("span", { className: t("text-[11px] text-text-tertiary shrink-0"), children: [
                    d.memberCount,
                    " members"
                  ] })
                ] })
              ]
            },
            d.userId
          ))
        }
      ),
      document.body
    );
  }
);
function ir(e) {
  return e.split(" ").map((r) => r[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function Se(e) {
  try {
    const r = Date.now() - new Date(e).getTime(), i = Math.floor(r / 1e3);
    if (i < 60) return "just now";
    const o = Math.floor(i / 60);
    if (o < 60) return `${o}m ago`;
    const s = Math.floor(o / 60);
    return s < 24 ? `${s}h ago` : `${Math.floor(s / 24)}d ago`;
  } catch {
    return "";
  }
}
function ut(e) {
  let r = 0;
  for (const i of e)
    r += 1 + ut(i.replies);
  return r;
}
function ar(e) {
  return e.split(/(@[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)*)/g).map(
    (i, o) => i.startsWith("@") && /^@[A-Z]/.test(i) ? /* @__PURE__ */ n(
      "span",
      {
        className: t("text-[#3b82f6] font-semibold bg-[#eff6ff] px-0.5 rounded-sm"),
        children: i
      },
      o
    ) : i
  );
}
const K = {
  active: !1,
  query: "",
  position: { top: 0, left: 0 },
  atIndex: -1
};
function ft(e, r, i) {
  let o = r - 1;
  for (; o >= 0 && e[o] !== "@" && e[o] !== " " && e[o] !== `
`; )
    o--;
  if (o < 0 || e[o] !== "@" || o > 0 && e[o - 1] !== " " && e[o - 1] !== `
`)
    return K;
  const s = e.slice(o + 1, r), a = i?.getBoundingClientRect(), l = a ? { top: a.bottom + 4, left: a.left } : { top: 28, left: 0 };
  return { active: !0, query: s, position: l, atIndex: o };
}
function xt(e, r, i) {
  const o = e.slice(0, r.atIndex), s = e.slice(r.atIndex + 1 + r.query.length), a = `@${i.displayName} `;
  return {
    newValue: o + a + s,
    newCursor: o.length + a.length
  };
}
function ht({
  comment: e,
  depth: r,
  onReply: i,
  mentionUsers: o,
  onResolveThread: s,
  onUnresolveThread: a
}) {
  const [l, m] = M(!1), [p, h] = M(""), [f, u] = M(!1), d = P(null), w = P(null), [b, S] = M(K), [N, $] = M(!1), x = r === 0 && !!e.resolved, k = Math.min(r, 5), v = () => {
    if (b.active) return;
    const T = p.trim();
    T && (i(e.id, T), h(""), m(!1), S(K));
  }, D = (T) => {
    const g = T.target.value;
    h(g);
    const O = T.target.selectionStart ?? g.length, q = ft(g, O, d.current);
    S(q);
  }, A = R(
    (T) => {
      const { newValue: g, newCursor: O } = xt(p, b, T);
      h(g), S(K), requestAnimationFrame(() => {
        const q = d.current;
        q && (q.focus(), q.setSelectionRange(O, O));
      });
    },
    [p, b]
  ), C = (T) => {
    b.active && w.current && w.current.handleKeyDown(T) || (T.key === "Enter" && !T.shiftKey && (T.preventDefault(), v()), T.key === "Escape" && m(!1));
  }, j = f ? e.color : r === 0 ? "#e2e8f0" : "#cbd5e1";
  return x && !N ? /* @__PURE__ */ n("div", { className: t(k > 0 ? "ml-5" : "ml-0"), children: /* @__PURE__ */ c(
    "div",
    {
      className: t("bg-[#f0fdf4] border-l-[3px] border-l-[#22c55e] px-3 py-2 mb-1 rounded cursor-pointer flex items-center justify-between"),
      onClick: () => $(!0),
      children: [
        /* @__PURE__ */ c("div", { className: t("flex items-center gap-1.5"), children: [
          /* @__PURE__ */ n("span", { className: t("text-[#16a34a] text-xs"), children: "✔" }),
          /* @__PURE__ */ c("span", { className: t("text-[#16a34a] text-xs font-semibold"), children: [
            "Resolved by ",
            e.resolvedBy
          ] }),
          e.resolvedAt && /* @__PURE__ */ n("span", { className: t("text-[#86efac] text-[11px]"), children: Se(e.resolvedAt) }),
          /* @__PURE__ */ n("span", { className: t("text-text-tertiary text-[11px] ml-1"), children: "— click to expand" })
        ] }),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: (T) => {
              T.stopPropagation(), a?.(e.id);
            },
            className: t("bg-transparent border border-[#cbd5e1] rounded px-2 py-0.5 text-[#64748b] text-[11px] cursor-pointer font-[inherit]"),
            children: "Reopen"
          }
        )
      ]
    }
  ) }) : /* @__PURE__ */ c("div", { className: t(k > 0 ? "ml-5" : "ml-0", x ? "opacity-60" : ""), children: [
    x && N && /* @__PURE__ */ c(
      "div",
      {
        className: t("bg-[#f0fdf4] border-l-[3px] border-l-[#22c55e] px-3 py-2 mb-1 rounded cursor-pointer flex items-center justify-between"),
        onClick: () => $(!1),
        children: [
          /* @__PURE__ */ c("div", { className: t("flex items-center gap-1.5"), children: [
            /* @__PURE__ */ n("span", { className: t("text-[#16a34a] text-xs"), children: "✔" }),
            /* @__PURE__ */ c("span", { className: t("text-[#16a34a] text-xs font-semibold"), children: [
              "Resolved by ",
              e.resolvedBy
            ] }),
            e.resolvedAt && /* @__PURE__ */ n("span", { className: t("text-[#86efac] text-[11px]"), children: Se(e.resolvedAt) }),
            /* @__PURE__ */ n("span", { className: t("text-text-tertiary text-[11px] ml-1"), children: "— click to collapse" })
          ] }),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: (T) => {
                T.stopPropagation(), a?.(e.id);
              },
              className: t("bg-transparent border border-[#cbd5e1] rounded px-2 py-0.5 text-[#64748b] text-[11px] cursor-pointer font-[inherit]"),
              children: "Reopen"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c(
      "div",
      {
        className: t("px-3 py-2 mb-1 transition-colors duration-200"),
        style: { borderLeft: `3px solid ${j}` },
        onMouseEnter: () => u(!0),
        onMouseLeave: () => u(!1),
        children: [
          /* @__PURE__ */ c("div", { className: t("flex items-center gap-1.5 mb-1"), children: [
            /* @__PURE__ */ n(
              "div",
              {
                className: t("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold shrink-0"),
                style: { background: `linear-gradient(135deg, ${e.color}, ${e.color}dd)` },
                children: ir(e.displayName)
              }
            ),
            /* @__PURE__ */ n("span", { className: t("font-semibold text-[13px] text-[#1e293b]"), children: e.displayName }),
            /* @__PURE__ */ n("span", { className: t("text-[11px] text-text-tertiary"), children: Se(e.timestamp) })
          ] }),
          /* @__PURE__ */ n("div", { className: t("text-[13px] leading-normal text-[#334155] pl-[30px] whitespace-pre-wrap"), children: ar(e.text) }),
          /* @__PURE__ */ c("div", { className: t("pl-[30px] mt-1 flex gap-2"), children: [
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                onClick: () => {
                  m(!l), l || setTimeout(() => d.current?.focus(), 50);
                },
                className: t("bg-transparent border-none text-[#64748b] text-xs cursor-pointer py-0.5 px-0 font-[inherit]"),
                children: "Reply"
              }
            ),
            r === 0 && !x && s && /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                onClick: () => s(e.id),
                className: t("bg-transparent border-none text-[#64748b] text-xs cursor-pointer py-0.5 px-0 font-[inherit]"),
                children: [
                  "✔",
                  " Resolve"
                ]
              }
            )
          ] }),
          l && /* @__PURE__ */ c("div", { className: t("pl-[30px] mt-2 overflow-hidden animate-[sectionCommentsSlideDown_0.2s_ease-out]"), children: [
            /* @__PURE__ */ c("div", { className: t("relative"), children: [
              /* @__PURE__ */ n(
                "textarea",
                {
                  ref: d,
                  value: p,
                  onChange: D,
                  onKeyDown: C,
                  placeholder: "Write a reply... (type @ to mention)",
                  rows: 2,
                  className: t("w-full border border-border rounded-md px-2.5 py-1.5 text-[13px] font-[inherit] outline-none resize-y min-h-12 box-border text-[#1e293b] bg-white")
                }
              ),
              b.active && /* @__PURE__ */ n(
                pt,
                {
                  ref: w,
                  query: b.query,
                  users: o,
                  position: b.position,
                  onSelect: A,
                  onDismiss: () => S(K)
                }
              )
            ] }),
            /* @__PURE__ */ c("div", { className: t("flex gap-1.5 mt-1.5"), children: [
              /* @__PURE__ */ n(
                "button",
                {
                  type: "button",
                  onClick: v,
                  className: t("px-3 py-1 text-xs font-semibold border-none rounded-md bg-[#3b82f6] text-white cursor-pointer font-[inherit]"),
                  children: "Reply"
                }
              ),
              /* @__PURE__ */ n(
                "button",
                {
                  type: "button",
                  onClick: () => m(!1),
                  className: t("px-3 py-1 text-xs font-medium border border-border rounded-md bg-transparent text-[#64748b] cursor-pointer font-[inherit]"),
                  children: "Cancel"
                }
              )
            ] })
          ] })
        ]
      }
    ),
    e.replies.map((T) => /* @__PURE__ */ n(
      ht,
      {
        comment: T,
        depth: r + 1,
        onReply: i,
        mentionUsers: o,
        onResolveThread: s,
        onUnresolveThread: a
      },
      T.id
    ))
  ] });
}
function bt({
  comments: e,
  onAddComment: r,
  participants: i = [],
  onResolveThread: o,
  onUnresolveThread: s
}) {
  const [a, l] = M(!0), [m, p] = M(""), h = P(null), f = P(null), [u, d] = M(K), w = un(i), b = ut(e), [S, N] = M(!0), $ = [...e].sort((C, j) => {
    if (C.resolved && !j.resolved) return 1;
    if (!C.resolved && j.resolved) return -1;
    const T = new Date(C.timestamp).getTime(), g = new Date(j.timestamp).getTime();
    return S ? g - T : T - g;
  }), x = () => {
    if (u.active) return;
    const C = m.trim();
    C && (r(C, null), p(""), d(K));
  }, k = (C) => {
    const j = C.target.value;
    p(j);
    const T = C.target.selectionStart ?? j.length, g = ft(j, T, h.current);
    d(g);
  }, v = R(
    (C) => {
      const { newValue: j, newCursor: T } = xt(m, u, C);
      p(j), d(K), requestAnimationFrame(() => {
        const g = h.current;
        g && (g.focus(), g.setSelectionRange(T, T));
      });
    },
    [m, u]
  ), D = (C) => {
    u.active && f.current && f.current.handleKeyDown(C) || C.key === "Enter" && !C.shiftKey && (C.preventDefault(), x());
  }, A = (C, j) => {
    r(j, C);
  };
  return /* @__PURE__ */ c("div", { children: [
    /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        onClick: () => {
          l((C) => !C), a || setTimeout(() => h.current?.focus(), 100);
        },
        className: t(
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
    a && /* @__PURE__ */ c("div", { className: t("mt-2 border border-border rounded-lg bg-[#f8fafc] overflow-hidden animate-[sectionCommentsSlideDown_0.2s_ease-out]"), children: [
      /* @__PURE__ */ c("div", { className: t("flex items-start gap-1.5 px-3 py-2.5 border-b border-border bg-white"), children: [
        /* @__PURE__ */ c("div", { className: t("flex-1 relative"), children: [
          /* @__PURE__ */ n(
            "textarea",
            {
              ref: h,
              value: m,
              onChange: k,
              onKeyDown: D,
              placeholder: "Add a comment... (type @ to mention)",
              rows: 2,
              className: t("w-full border border-border rounded-md px-2.5 py-2 text-[13px] font-[inherit] outline-none resize-y min-h-12 box-border text-[#1e293b] bg-white")
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
              onDismiss: () => d(K)
            }
          )
        ] }),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: x,
            className: t("px-3.5 py-1.5 text-xs font-semibold border-none rounded-md bg-[#3b82f6] text-white cursor-pointer font-[inherit] whitespace-nowrap self-end"),
            children: "Post"
          }
        )
      ] }),
      e.length > 1 && /* @__PURE__ */ n("div", { className: t("flex justify-end px-3 pt-1 border-b border-[#f1f5f9]"), children: /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          onClick: () => N((C) => !C),
          className: t("bg-transparent border-none cursor-pointer text-[11px] text-[#64748b] px-1.5 py-0.5 font-[inherit]"),
          children: S ? "↓ Newest first" : "↑ Oldest first"
        }
      ) }),
      /* @__PURE__ */ c("div", { className: t("max-h-[420px] overflow-y-auto px-3 py-2"), children: [
        e.length === 0 && /* @__PURE__ */ n("div", { className: t("p-3 text-center text-text-tertiary text-xs"), children: "No comments yet. Start the discussion!" }),
        $.map((C) => /* @__PURE__ */ n(
          ht,
          {
            comment: C,
            depth: 0,
            onReply: A,
            mentionUsers: w,
            onResolveThread: o,
            onUnresolveThread: s
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
function lr({
  sections: e,
  participants: r,
  userId: i,
  getSectionFragment: o,
  ydoc: s,
  provider: a,
  sectionReviews: l,
  reviewSection: m,
  comments: p,
  onAddComment: h,
  onResolveThread: f,
  onUnresolveThread: u,
  onSectionFocus: d
}) {
  const [w, b] = M({}), S = e.filter((x) => (l[x.id] ?? []).some((v) => v.userId === i)).length, N = /* @__PURE__ */ new Map();
  for (const x of e)
    for (const k of l[x.id] ?? []) {
      const v = N.get(k.userId) ?? { displayName: k.displayName, statuses: [] };
      v.statuses.push(k.status), N.set(k.userId, v);
    }
  const $ = e.length > 0 ? Math.round(S / e.length * 100) : 0;
  return e.length === 0 ? /* @__PURE__ */ n("div", { className: t("text-center p-12 text-[#6b7280] text-[15px]"), children: "No sections to review." }) : /* @__PURE__ */ c("div", { "data-testid": "review-mode", className: t("max-w-[800px] mx-auto"), children: [
    /* @__PURE__ */ c("div", { "data-testid": "review-progress", className: t("mb-6"), children: [
      /* @__PURE__ */ c("div", { className: t("text-[13px] text-[#6b7280] mb-1 flex justify-between"), children: [
        /* @__PURE__ */ c("span", { "data-testid": "review-progress-text", children: [
          S,
          " of ",
          e.length,
          " sections reviewed by you"
        ] }),
        /* @__PURE__ */ c("span", { "data-testid": "review-progress-pct", children: [
          $,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ n("div", { className: t("h-2 bg-[#e5e7eb] rounded overflow-hidden"), children: /* @__PURE__ */ n(
        "div",
        {
          className: t("h-full rounded transition-[width] duration-300 ease-in-out", S === e.length ? "bg-success" : "bg-info"),
          style: { width: `${$}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ n("div", { className: t("flex flex-col gap-6"), children: e.map((x) => {
      const k = o(x.id), v = et[x.type] ?? et.custom, D = l[x.id] ?? [], A = D.find((g) => g.userId === i), C = D.filter((g) => g.userId !== i), j = r.filter((g) => g.currentSectionId === x.id), T = w[x.id] ?? !1;
      return /* @__PURE__ */ c(
        "div",
        {
          id: `section-${x.id}`,
          "data-testid": `review-section-${x.id}`,
          className: t("bg-white border border-[#e5e7eb] rounded-lg p-5"),
          style: {
            borderLeft: A ? `3px solid ${re[A.status].color}` : "3px solid #d1d5db"
          },
          onMouseEnter: () => d?.(x.id),
          children: [
            /* @__PURE__ */ c("div", { className: t("flex items-center gap-2 mb-1"), children: [
              /* @__PURE__ */ n("h3", { className: t("text-lg font-bold m-0 text-[#1e293b] flex-1"), children: x.title }),
              /* @__PURE__ */ n(
                "span",
                {
                  className: t("inline-block text-[11px] font-semibold py-0.5 px-2.5 rounded-full"),
                  style: { background: v.bg, color: v.text },
                  children: x.sectionType ?? x.type
                }
              )
            ] }),
            k && /* @__PURE__ */ n("div", { className: t(x.items.length > 0 ? "mb-4" : "mb-2"), children: /* @__PURE__ */ n(
              De,
              {
                fragment: k,
                ydoc: s,
                provider: a,
                user: { name: "", color: "" },
                editable: !1,
                sectionId: x.id
              }
            ) }),
            !k && x.items.length === 0 && /* @__PURE__ */ n("div", { className: t("py-4 text-text-tertiary text-sm text-center"), children: "This section has no content." }),
            x.items.length > 0 && /* @__PURE__ */ n("div", { className: t("mb-3"), children: x.items.map((g) => {
              const O = g.status === "acked" ? "#16a34a" : g.status === "rejected" ? "#dc2626" : g.status === "done" ? "#6b7280" : "#94a3b8";
              return /* @__PURE__ */ c("div", { className: t("flex items-start gap-2 py-1.5 border-b border-[#f3f4f6] text-sm"), children: [
                /* @__PURE__ */ n(
                  "span",
                  {
                    className: t("inline-block w-2 h-2 rounded-full mt-[5px] shrink-0"),
                    style: { background: O }
                  }
                ),
                /* @__PURE__ */ c("div", { className: t("flex-1"), children: [
                  /* @__PURE__ */ n("span", { className: t("text-[#1e293b]"), children: g.text }),
                  g.assignee && /* @__PURE__ */ c("span", { className: t("text-[#6b7280] text-xs ml-2"), children: [
                    "— ",
                    g.assignee
                  ] }),
                  g.priority && g.priority !== "medium" && /* @__PURE__ */ n(
                    "span",
                    {
                      className: t("text-[10px] font-semibold ml-1.5 px-1.5 py-px rounded", g.priority === "high" ? "bg-danger-bg text-danger-fg" : "bg-success-bg text-success-fg"),
                      children: g.priority
                    }
                  )
                ] }),
                /* @__PURE__ */ n(
                  "span",
                  {
                    className: t("text-[11px] font-semibold capitalize shrink-0"),
                    style: { color: O },
                    children: g.status
                  }
                )
              ] }, g.id);
            }) }),
            /* @__PURE__ */ c("div", { className: t("flex items-center gap-2 pt-2.5 pb-1 border-t border-[#f3f4f6] flex-wrap"), children: [
              !A || T ? /* @__PURE__ */ c(W, { children: [
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
                    className: t("bg-transparent border-none text-[#6b7280] text-xs cursor-pointer underline"),
                    children: "Cancel"
                  }
                )
              ] }) : /* @__PURE__ */ c(W, { children: [
                /* @__PURE__ */ c(
                  "span",
                  {
                    "data-testid": `section-${x.id}-status`,
                    "data-status": A.status,
                    className: t("inline-flex items-center gap-1 text-[13px] font-semibold py-1 px-2.5 rounded-md"),
                    style: { background: re[A.status].bg, color: re[A.status].color },
                    children: [
                      /* @__PURE__ */ n("span", { className: t("text-sm"), children: re[A.status].icon }),
                      re[A.status].label
                    ]
                  }
                ),
                /* @__PURE__ */ c("span", { className: t("text-xs text-[#6b7280]"), children: [
                  "by you · ",
                  new Date(A.timestamp).toLocaleString(void 0, {
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
                    className: t("bg-transparent border-none text-[#3b82f6] text-xs cursor-pointer underline p-0"),
                    children: "Change"
                  }
                )
              ] }),
              C.length > 0 && /* @__PURE__ */ n("div", { className: t("flex gap-1 ml-auto items-center"), children: C.map((g) => {
                const O = re[g.status], q = g.displayName.split(" ").map((G) => G[0]).join("").toUpperCase().slice(0, 2);
                return /* @__PURE__ */ n(
                  "div",
                  {
                    title: `${g.displayName}: ${O.label}`,
                    className: t("w-[26px] h-[26px] rounded-full flex items-center justify-center text-[10px] font-bold"),
                    style: { background: O.bg, color: O.color, border: `2px solid ${O.color}` },
                    children: q
                  },
                  g.userId
                );
              }) }),
              j.length > 0 && /* @__PURE__ */ c("div", { className: t("flex gap-1 items-center"), style: { marginLeft: C.length > 0 ? 0 : "auto" }, children: [
                /* @__PURE__ */ n("span", { className: t("text-[11px] text-text-tertiary"), children: "Viewing:" }),
                j.map((g) => /* @__PURE__ */ n(
                  "div",
                  {
                    title: g.displayName,
                    className: t("w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-semibold"),
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
    N.size > 0 && /* @__PURE__ */ c(
      "div",
      {
        "data-testid": "review-summary",
        className: t("mt-8 p-4 px-5 bg-[#f8fafc] border border-border rounded-lg"),
        children: [
          /* @__PURE__ */ n("h4", { className: t("m-0 mb-3 text-sm font-bold text-text-secondary"), children: "Document Review Summary" }),
          /* @__PURE__ */ n("div", { className: t("flex flex-col gap-2"), children: Array.from(N.entries()).map(([x, k]) => {
            const v = k.statuses.filter((C) => C === "approved").length, D = k.statuses.filter((C) => C === "changes_requested").length, A = k.statuses.filter((C) => C === "reviewed").length;
            return /* @__PURE__ */ c("div", { className: t("flex items-center gap-2.5 text-[13px]"), children: [
              /* @__PURE__ */ c("span", { className: t("font-semibold text-[#1e293b] min-w-[100px]"), children: [
                k.displayName,
                x === i ? " (you)" : ""
              ] }),
              /* @__PURE__ */ c("span", { className: t("text-[#6b7280]"), children: [
                k.statuses.length,
                " of ",
                e.length,
                " sections"
              ] }),
              v > 0 && /* @__PURE__ */ c("span", { className: t("text-[11px] px-2 py-px rounded bg-[#dcfce7] text-[#166534] font-semibold"), children: [
                v,
                " approved"
              ] }),
              A > 0 && /* @__PURE__ */ c("span", { className: t("text-[11px] px-2 py-px rounded bg-[#f3f4f6] text-[#374151] font-semibold"), children: [
                A,
                " reviewed"
              ] }),
              D > 0 && /* @__PURE__ */ c("span", { className: t("text-[11px] px-2 py-px rounded bg-[#fef3c7] text-[#92400e] font-semibold"), children: [
                D,
                " changes requested"
              ] })
            ] }, x);
          }) })
        ]
      }
    )
  ] });
}
function Te({ label: e, bg: r, color: i, hoverBg: o, onClick: s, testid: a }) {
  const [l, m] = M(!1);
  return /* @__PURE__ */ n(
    "button",
    {
      "data-testid": a,
      onClick: s,
      onMouseEnter: () => m(!0),
      onMouseLeave: () => m(!1),
      className: t("py-1.5 px-3.5 text-[13px] font-semibold border border-transparent rounded-md cursor-pointer transition-colors duration-150"),
      style: { background: l ? o : r, color: i },
      children: e
    }
  );
}
const tt = {
  draft: { bg: "#fef3c7", text: "#92400e" },
  review: { bg: "#dbeafe", text: "#1e40af" },
  final: { bg: "#d1fae5", text: "#065f46" }
};
function dr(e) {
  if (!e) return "";
  try {
    return new Date(e).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  } catch {
    return e;
  }
}
function cr(e) {
  const r = [], i = [], o = [];
  for (const s of e)
    s.status === "rejected" ? o.push(s) : s.status === "acked" || s.status === "done" ? i.push(s) : r.push(s);
  return { pending: r, completed: i, rejected: o };
}
function mr(e, r) {
  const { pending: i, completed: o, rejected: s } = cr(e), a = e.length, l = [];
  if (a > 0) {
    const h = Math.round(o.length / a * 100);
    l.push(
      `${a} action item${a !== 1 ? "s" : ""} identified, ${o.length} completed (${h}%).`
    );
  } else
    l.push("No action items recorded yet.");
  const p = r.filter((h) => h.type === "decisions").flatMap((h) => h.items);
  if (p.length > 0) {
    const h = p.filter(
      (f) => f.status === "acked" || f.status === "done"
    ).length;
    l.push(
      `${p.length} key decision${p.length !== 1 ? "s" : ""} recorded${h > 0 ? `, ${h} finalized` : ""}.`
    );
  }
  return i.length > 0 && l.push(
    `${i.length} item${i.length !== 1 ? "s" : ""} still pending review.`
  ), s.length > 0 && l.push(
    `${s.length} item${s.length !== 1 ? "s" : ""} rejected and need${s.length === 1 ? "s" : ""} revision.`
  ), l;
}
function pr({
  meta: e,
  participantCount: r
}) {
  const i = tt[e.status] ?? tt.draft;
  return /* @__PURE__ */ c(
    "div",
    {
      className: t("border-t-[3px] border-t-[#3b82f6] rounded-t-lg pt-5 pb-4 px-6 mb-4 bg-gradient-to-b from-surface-panel to-white col-span-full"),
      children: [
        /* @__PURE__ */ c("div", { className: t("flex items-center gap-3 mb-1.5"), children: [
          /* @__PURE__ */ n("h1", { className: t("text-xl font-bold m-0 text-text-primary flex-1"), children: e.title || "Untitled Document" }),
          /* @__PURE__ */ n(
            "span",
            {
              className: t("inline-block text-xs font-semibold py-[3px] px-3 rounded-full capitalize"),
              style: { background: i.bg, color: i.text },
              children: e.status
            }
          )
        ] }),
        /* @__PURE__ */ c("div", { className: t("text-xs text-[#64748b]"), children: [
          e.createdBy && /* @__PURE__ */ c(W, { children: [
            "Created by ",
            e.createdByName || e.createdBy
          ] }),
          e.createdAt && /* @__PURE__ */ c(W, { children: [
            " · ",
            dr(e.createdAt)
          ] }),
          r > 0 && /* @__PURE__ */ c(W, { children: [
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
function ur({
  bullets: e,
  contentText: r,
  fragment: i,
  ydoc: o,
  provider: s
}) {
  const a = i && o, l = r && r.trim().length > 0;
  return /* @__PURE__ */ c("div", { className: t("bg-white border border-border rounded-lg p-4 mb-4"), children: [
    /* @__PURE__ */ n("h2", { className: t("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Executive Summary" }),
    a ? /* @__PURE__ */ n("div", { className: t(
      "py-1 px-3 bg-[#f8fafc] rounded-md border-l-[3px] border-l-[#8b5cf6]",
      e.length > 0 ? "mb-3" : ""
    ), children: /* @__PURE__ */ n(
      De,
      {
        fragment: i,
        ydoc: o,
        provider: s ?? null,
        user: { name: "", color: "" },
        editable: !1
      }
    ) }) : l ? /* @__PURE__ */ n("div", { className: t(
      "text-sm text-[#1e293b] leading-relaxed whitespace-pre-wrap py-2 px-3 bg-[#f8fafc] rounded-md border-l-[3px] border-l-[#8b5cf6]",
      e.length > 0 ? "mb-3" : ""
    ), children: r.trim() }) : null,
    /* @__PURE__ */ n("ul", { className: t("m-0 pl-[18px] text-[13px] text-[#334155] leading-relaxed"), children: e.map((m, p) => /* @__PURE__ */ n("li", { children: m }, p)) })
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
function gt(e) {
  switch (e) {
    case "acked":
    case "done":
      return "✅";
    case "rejected":
      return "❌";
    default:
      return "⬜";
  }
}
function fr(e) {
  const r = [], i = [], o = [];
  for (const s of e)
    s.status === "rejected" ? o.push(s) : s.status === "acked" || s.status === "done" ? i.push(s) : r.push(s);
  return { pending: r, completed: i, rejected: o };
}
function Ie({
  label: e,
  count: r,
  color: i,
  defaultOpen: o,
  children: s
}) {
  const [a, l] = M(o);
  return /* @__PURE__ */ c("div", { className: t("mb-2"), children: [
    /* @__PURE__ */ c(
      "button",
      {
        onClick: () => l(!a),
        className: t("bg-transparent border-none cursor-pointer flex items-center gap-1.5 py-1 px-0 text-[13px] font-semibold text-[#334155] font-[inherit] w-full"),
        children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: t("inline-block text-[10px] transition-transform duration-150 ease-in-out", a ? "rotate-90" : "rotate-0"),
              children: "▶"
            }
          ),
          /* @__PURE__ */ n("span", { style: { color: i }, children: e }),
          /* @__PURE__ */ n(
            "span",
            {
              className: t("text-[11px] px-2 py-px rounded-full font-semibold"),
              style: { background: `${i}18`, color: i },
              children: r
            }
          )
        ]
      }
    ),
    a && /* @__PURE__ */ n("div", { className: t("pl-4 mt-1"), children: s })
  ] });
}
function Me({
  item: e,
  variant: r
}) {
  const i = r === "pending" ? oe.pending : r === "completed" ? oe.done : oe.rejected;
  return /* @__PURE__ */ c(
    "div",
    {
      className: t("flex items-center gap-2 py-[5px] px-2 mb-1 rounded-r", r === "pending" ? "bg-warning-bg" : "bg-white"),
      style: { borderLeft: `3px solid ${i}` },
      children: [
        /* @__PURE__ */ n("span", { className: t("text-[13px] flex-1"), children: /* @__PURE__ */ n(
          "span",
          {
            className: t(
              r === "completed" ? "line-through text-text-tertiary" : "text-[#334155]"
            ),
            children: e.text
          }
        ) }),
        e.priority && /* @__PURE__ */ n(
          "span",
          {
            className: t("text-[10px] font-semibold px-1.5 py-px rounded-full uppercase shrink-0"),
            style: { background: `${nt[e.priority]}18`, color: nt[e.priority] },
            children: e.priority
          }
        ),
        e.ackedBy && /* @__PURE__ */ n("span", { className: t("text-[11px] text-text-tertiary shrink-0"), children: e.ackedBy })
      ]
    }
  );
}
function xr({ sections: e }) {
  const i = e.filter((o) => o.type === "decisions").flatMap((o) => o.items);
  return /* @__PURE__ */ c("div", { className: t("bg-white border border-border rounded-lg p-4 mb-4"), children: [
    /* @__PURE__ */ n("h2", { className: t("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Key Decisions" }),
    i.length === 0 ? /* @__PURE__ */ n("div", { className: t("text-[13px] text-text-tertiary italic"), children: "No decisions recorded" }) : /* @__PURE__ */ n("div", { className: t("flex flex-col gap-1.5"), children: i.map((o) => /* @__PURE__ */ c(
      "div",
      {
        className: t("flex items-start gap-2 text-[13px] text-[#334155]"),
        children: [
          /* @__PURE__ */ n("span", { className: t("shrink-0"), children: gt(o.status) }),
          /* @__PURE__ */ n("span", { children: o.text })
        ]
      },
      o.id
    )) })
  ] });
}
function hr({ allItems: e }) {
  const { pending: r, completed: i, rejected: o } = fr(e);
  return /* @__PURE__ */ c("div", { className: t("bg-white border border-border rounded-lg p-4 mb-4"), children: [
    /* @__PURE__ */ n("h2", { className: t("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Action Items" }),
    e.length === 0 ? /* @__PURE__ */ n("div", { className: t("text-[13px] text-text-tertiary italic"), children: "No action items yet" }) : /* @__PURE__ */ c(W, { children: [
      r.length > 0 && /* @__PURE__ */ n(
        Ie,
        {
          label: "Pending",
          count: r.length,
          color: oe.pending,
          defaultOpen: !0,
          children: r.map((s) => /* @__PURE__ */ n(Me, { item: s, variant: "pending" }, s.id))
        }
      ),
      i.length > 0 && /* @__PURE__ */ n(
        Ie,
        {
          label: "Completed",
          count: i.length,
          color: oe.done,
          defaultOpen: !1,
          children: i.map((s) => /* @__PURE__ */ n(Me, { item: s, variant: "completed" }, s.id))
        }
      ),
      o.length > 0 && /* @__PURE__ */ n(
        Ie,
        {
          label: "Rejected",
          count: o.length,
          color: oe.rejected,
          defaultOpen: !1,
          children: o.map((s) => /* @__PURE__ */ n(Me, { item: s, variant: "rejected" }, s.id))
        }
      )
    ] })
  ] });
}
function br({
  sections: e,
  commentCounts: r,
  sectionContentTexts: i,
  comments: o,
  getSectionFragment: s,
  ydoc: a,
  provider: l
}) {
  const [m, p] = M({}), h = (u) => p((d) => ({ ...d, [u]: !d[u] })), f = {
    summary: { bg: "#e0e7ff", text: "#4338ca" },
    tasks: { bg: "#dbeafe", text: "#1e40af" },
    decisions: { bg: "#fce7f3", text: "#9d174d" },
    notes: { bg: "#f0fdf4", text: "#166534" },
    custom: { bg: "#f3f4f6", text: "#6b7280" }
  };
  return /* @__PURE__ */ c("div", { className: t("bg-white border border-border rounded-lg p-4 mb-4"), children: [
    /* @__PURE__ */ n("h2", { className: t("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Section Summaries" }),
    e.length === 0 ? /* @__PURE__ */ n("div", { className: t("text-[13px] text-text-tertiary italic"), children: "No sections" }) : /* @__PURE__ */ n("div", { className: t("flex flex-col gap-0.5"), children: e.map((u) => {
      const d = u.items.filter(
        (v) => v.status === "acked" || v.status === "done"
      ).length, w = u.items.length, b = r?.[u.id] ?? 0, S = i?.[u.id] ?? "", N = o?.[u.id] ?? [], $ = !!m[u.id], x = S.trim().length > 0, k = f[u.type] ?? f.custom;
      return /* @__PURE__ */ c(
        "div",
        {
          id: `section-${u.id}`,
          "data-testid": `reader-section-${u.id}`,
          children: [
            /* @__PURE__ */ c(
              "button",
              {
                onClick: () => h(u.id),
                className: t(
                  "border-none cursor-pointer flex items-center gap-2 py-2 px-1.5 rounded-md w-full font-[inherit] text-[13px] text-[#334155] transition-colors duration-100",
                  $ ? "bg-[#f8fafc]" : "bg-transparent"
                ),
                children: [
                  /* @__PURE__ */ n(
                    "span",
                    {
                      className: t("text-[10px] transition-transform duration-150 ease-in-out shrink-0", $ ? "rotate-90" : "rotate-0"),
                      children: "▶"
                    }
                  ),
                  /* @__PURE__ */ n("span", { className: t("font-semibold flex-1 text-left"), children: u.title }),
                  /* @__PURE__ */ n(
                    "span",
                    {
                      className: t("text-[10px] font-semibold px-2 py-px rounded-full capitalize shrink-0"),
                      style: { background: k.bg, color: k.text },
                      children: u.type
                    }
                  ),
                  w > 0 && /* @__PURE__ */ c("span", { className: t("text-[11px] text-[#64748b] shrink-0"), children: [
                    d,
                    "/",
                    w,
                    " done"
                  ] }),
                  b > 0 && /* @__PURE__ */ c("span", { className: t("text-[11px] text-[#64748b] shrink-0"), children: [
                    b,
                    " comment",
                    b !== 1 ? "s" : ""
                  ] })
                ]
              }
            ),
            $ && /* @__PURE__ */ c("div", { className: t("pl-6 pb-2"), children: [
              (() => {
                const v = s?.(u.id);
                return v && a ? /* @__PURE__ */ n("div", { className: t(
                  "py-1 px-2.5 bg-[#f8fafc] rounded border-l-2 border-l-[#cbd5e1]",
                  u.items.length > 0 ? "mb-2" : ""
                ), children: /* @__PURE__ */ n(
                  De,
                  {
                    fragment: v,
                    ydoc: a,
                    provider: l ?? null,
                    user: { name: "", color: "" },
                    editable: !1
                  }
                ) }) : x ? /* @__PURE__ */ n("div", { className: t(
                  "text-[13px] text-[#334155] leading-relaxed whitespace-pre-wrap py-2 px-2.5 bg-[#f8fafc] rounded border-l-2 border-l-[#cbd5e1]",
                  u.items.length > 0 ? "mb-2" : ""
                ), children: S.trim() }) : null;
              })(),
              u.items.map((v) => /* @__PURE__ */ c(
                "div",
                {
                  className: t("flex items-center gap-1.5 py-[3px] text-xs text-[#64748b]"),
                  children: [
                    /* @__PURE__ */ n("span", { className: t("shrink-0"), children: gt(v.status) }),
                    /* @__PURE__ */ n(
                      "span",
                      {
                        className: t(
                          v.status === "acked" || v.status === "done" ? "line-through" : ""
                        ),
                        children: v.text
                      }
                    )
                  ]
                },
                v.id
              )),
              N.length > 0 && /* @__PURE__ */ c("div", { className: t("mt-2 pt-1.5 border-t border-[#f1f5f9]"), children: [
                /* @__PURE__ */ c("div", { className: t("text-[11px] font-semibold text-text-tertiary mb-1"), children: [
                  "Comments (",
                  b,
                  ")"
                ] }),
                N.slice(0, 3).map((v) => /* @__PURE__ */ c("div", { className: t("text-xs text-[#64748b] py-0.5 flex gap-1.5"), children: [
                  /* @__PURE__ */ c("span", { className: t("font-semibold text-text-secondary shrink-0"), children: [
                    v.displayName,
                    ":"
                  ] }),
                  /* @__PURE__ */ n("span", { className: t("overflow-hidden text-ellipsis whitespace-nowrap"), children: v.text })
                ] }, v.id)),
                N.length > 3 && /* @__PURE__ */ c("div", { className: t("text-[11px] text-text-tertiary mt-0.5"), children: [
                  "+",
                  N.length - 3,
                  " more"
                ] })
              ] }),
              !x && u.items.length === 0 && N.length === 0 && /* @__PURE__ */ n("div", { className: t("text-xs text-text-tertiary italic"), children: "No content in this section" })
            ] })
          ]
        },
        u.id
      );
    }) })
  ] });
}
function rt(e) {
  if (!e) return "";
  try {
    return new Date(e).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  } catch {
    return e;
  }
}
function gr(e) {
  return e >= 75 ? "#10b981" : e >= 25 ? "#f59e0b" : "#ef4444";
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
function yr({ sections: e }) {
  const r = (i, o) => {
    i.preventDefault();
    const s = document.getElementById(`section-${o}`);
    s && s.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return /* @__PURE__ */ c(
    "aside",
    {
      "data-testid": "reader-toc",
      className: t("sticky top-4 self-start bg-white border border-border rounded-lg p-4 mb-3"),
      children: [
        /* @__PURE__ */ n("h3", { className: t("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Contents" }),
        /* @__PURE__ */ n("nav", { children: /* @__PURE__ */ n("ol", { className: t("list-none m-0 p-0 flex flex-col gap-1"), children: e.map((i, o) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ c(
          "a",
          {
            href: `#section-${i.id}`,
            "data-testid": `toc-link-${i.id}`,
            onClick: (s) => r(s, i.id),
            className: t("block py-1 px-1.5 text-[13px] text-text-secondary no-underline rounded border-l-2 border-l-transparent transition-colors duration-75 hover:bg-[#f1f5f9] hover:border-l-primary"),
            children: [
              /* @__PURE__ */ c("span", { className: t("font-medium text-text-primary"), children: [
                o + 1,
                "."
              ] }),
              " ",
              i.title || `Section ${o + 1}`
            ]
          }
        ) }, i.id)) }) })
      ]
    }
  );
}
function vr({
  reviewed: e,
  total: r
}) {
  const i = r > 0 ? Math.round(e / r * 100) : 0, o = gr(i);
  return /* @__PURE__ */ c("div", { className: t("bg-white border border-border rounded-lg p-4 mb-3"), children: [
    /* @__PURE__ */ n("h3", { className: t("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Progress" }),
    /* @__PURE__ */ n("div", { className: t("flex items-baseline gap-1 mb-2"), children: /* @__PURE__ */ c("span", { className: t("text-[28px] font-bold leading-none"), style: { color: o }, children: [
      i,
      "%"
    ] }) }),
    /* @__PURE__ */ n("div", { className: t("h-2 bg-[#e5e7eb] rounded overflow-hidden mb-1.5"), children: /* @__PURE__ */ n(
      "div",
      {
        className: t("h-full rounded transition-[width] duration-300 ease-in-out"),
        style: { width: `${i}%`, background: o }
      }
    ) }),
    /* @__PURE__ */ c("div", { className: t("text-xs text-[#64748b]"), children: [
      e,
      " of ",
      r,
      " items reviewed"
    ] })
  ] });
}
function wr({ participants: e, meta: r }) {
  const i = /* @__PURE__ */ new Set(), o = [];
  for (const s of e) {
    const a = s.userId || s.clientId;
    i.has(a) || (i.add(a), o.push({ name: s.displayName, color: s.color, mode: s.mode, isOnline: !0 }));
  }
  return r.createdBy && !i.has(r.createdBy) && o.push({ name: r.createdByName || r.createdBy, color: "#6b7280", isOnline: !1 }), /* @__PURE__ */ c("div", { className: t("bg-white border border-border rounded-lg p-4 mb-3"), children: [
    /* @__PURE__ */ n("h3", { className: t("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Contributors" }),
    /* @__PURE__ */ n("div", { className: t("flex flex-wrap gap-1.5 mb-3"), children: o.map((s, a) => {
      const l = s.name.split(" ").map((m) => m[0] ?? "").join("").toUpperCase().slice(0, 2);
      return /* @__PURE__ */ c("div", { title: `${s.name}${s.mode ? ` (${st[s.mode] ?? s.mode})` : ""}`, className: t("relative"), children: [
        /* @__PURE__ */ n(
          "div",
          {
            className: t("w-8 h-8 rounded-full text-white flex items-center justify-center text-[11px] font-bold"),
            style: { background: s.color },
            children: l
          }
        ),
        s.isOnline && /* @__PURE__ */ n(
          "div",
          {
            className: t("absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white"),
            style: { background: ot[s.mode ?? "reader"] ?? "#94a3b8" }
          }
        )
      ] }, `${s.name}-${a}`);
    }) }),
    /* @__PURE__ */ n("div", { className: t("flex flex-col gap-1.5"), children: o.map((s, a) => /* @__PURE__ */ c("div", { className: t("flex items-center gap-2 text-[13px]"), children: [
      /* @__PURE__ */ n(
        "span",
        {
          className: t("w-2 h-2 rounded-full shrink-0"),
          style: { background: s.isOnline ? ot[s.mode ?? "reader"] ?? "#94a3b8" : "#d1d5db" }
        }
      ),
      /* @__PURE__ */ n("span", { className: t("font-medium text-[#334155] flex-1"), children: s.name }),
      /* @__PURE__ */ n("span", { className: t("text-[11px] text-text-tertiary"), children: s.isOnline ? st[s.mode ?? ""] ?? "online" : "offline" })
    ] }, `detail-${s.name}-${a}`)) })
  ] });
}
function Nr({
  sections: e,
  allItems: r,
  completedCount: i,
  commentCounts: o,
  meta: s
}) {
  const a = o ? Object.values(o).reduce((l, m) => l + m, 0) : 0;
  return /* @__PURE__ */ c("div", { className: t("bg-white border border-border rounded-lg p-4 mb-3"), children: [
    /* @__PURE__ */ n("h3", { className: t("text-xs font-semibold uppercase tracking-wide text-[#64748b] m-0 mb-3"), children: "Document Info" }),
    /* @__PURE__ */ c("div", { className: t("flex justify-between py-1 text-[13px] text-[#334155] border-b border-[#f1f5f9]"), children: [
      /* @__PURE__ */ n("span", { className: t("text-[#64748b]"), children: "Sections" }),
      /* @__PURE__ */ n("span", { className: t("font-semibold"), children: e.length })
    ] }),
    /* @__PURE__ */ c("div", { className: t("flex justify-between py-1 text-[13px] text-[#334155] border-b border-[#f1f5f9]"), children: [
      /* @__PURE__ */ n("span", { className: t("text-[#64748b]"), children: "Total tasks" }),
      /* @__PURE__ */ n("span", { className: t("font-semibold"), children: r.length })
    ] }),
    /* @__PURE__ */ c("div", { className: t("flex justify-between py-1 text-[13px] text-[#334155] border-b border-[#f1f5f9]"), children: [
      /* @__PURE__ */ n("span", { className: t("text-[#64748b]"), children: "Completed" }),
      /* @__PURE__ */ n("span", { className: t("font-semibold text-[#10b981]"), children: i })
    ] }),
    a > 0 && /* @__PURE__ */ c("div", { className: t("flex justify-between py-1 text-[13px] text-[#334155] border-b border-[#f1f5f9]"), children: [
      /* @__PURE__ */ n("span", { className: t("text-[#64748b]"), children: "Comments" }),
      /* @__PURE__ */ n("span", { className: t("font-semibold"), children: a })
    ] }),
    s.createdAt && /* @__PURE__ */ c("div", { className: t("flex justify-between py-1 text-[13px] text-[#334155] border-b border-[#f1f5f9]"), children: [
      /* @__PURE__ */ n("span", { className: t("text-[#64748b]"), children: "Created" }),
      /* @__PURE__ */ n("span", { className: t("font-medium text-xs"), children: rt(s.createdAt) })
    ] }),
    s.updatedAt && /* @__PURE__ */ c("div", { className: t("flex justify-between py-1 text-[13px] text-[#334155]"), children: [
      /* @__PURE__ */ n("span", { className: t("text-[#64748b]"), children: "Last changed" }),
      /* @__PURE__ */ n("span", { className: t("font-medium text-xs"), children: rt(s.updatedAt) })
    ] })
  ] });
}
function kr({
  sections: e,
  participants: r,
  meta: i,
  commentCounts: o,
  sectionContentTexts: s,
  comments: a,
  getSectionFragment: l,
  ydoc: m,
  provider: p
}) {
  const h = e.flatMap((b) => b.items), f = h.filter((b) => b.status !== "pending").length, u = h.filter(
    (b) => b.status === "acked" || b.status === "done"
  ).length, d = mr(h, e), w = e.length >= 2;
  return /* @__PURE__ */ c(
    "div",
    {
      className: t("grid gap-4 mx-auto", w ? "[grid-template-columns:200px_1fr_280px] max-w-[1300px]" : "[grid-template-columns:1fr_280px] max-w-[1100px]"),
      children: [
        /* @__PURE__ */ n(pr, { meta: i, participantCount: r.length }),
        w && /* @__PURE__ */ n(yr, { sections: e }),
        /* @__PURE__ */ c("div", { children: [
          /* @__PURE__ */ n(
            ur,
            {
              bullets: d,
              contentText: (() => {
                const b = e.find((S) => S.type === "summary");
                return b ? s?.[b.id] : void 0;
              })(),
              fragment: (() => {
                const b = e.find((S) => S.type === "summary");
                return b ? l?.(b.id) : null;
              })(),
              ydoc: m,
              provider: p
            }
          ),
          /* @__PURE__ */ n(xr, { sections: e }),
          /* @__PURE__ */ n(hr, { allItems: h }),
          /* @__PURE__ */ n(
            br,
            {
              sections: e,
              commentCounts: o,
              sectionContentTexts: s,
              comments: a,
              getSectionFragment: l,
              ydoc: m,
              provider: p
            }
          )
        ] }),
        /* @__PURE__ */ c("div", { children: [
          /* @__PURE__ */ n(vr, { reviewed: f, total: h.length }),
          /* @__PURE__ */ n(wr, { participants: r, meta: i }),
          /* @__PURE__ */ n(
            Nr,
            {
              sections: e,
              allItems: h,
              completedCount: u,
              commentCounts: o,
              meta: i
            }
          )
        ] })
      ]
    }
  );
}
function Cr({
  mode: e,
  isEmpty: r,
  isFinalized: i,
  sections: o,
  documentId: s,
  displayName: a,
  color: l,
  userId: m,
  ydoc: p,
  provider: h,
  getSectionFragment: f,
  updateSection: u,
  participants: d,
  focusedSectionId: w,
  onSectionFocus: b,
  comments: S,
  onAddComment: N,
  onResolveThread: $,
  onUnresolveThread: x,
  onUpdateCursorInfo: k,
  onOpenComments: v,
  onAddItem: D,
  onUpdateItem: A,
  onRemoveItem: C,
  restItems: j,
  commentSidebarOpen: T,
  commentSectionId: g,
  commentSidebarTop: O,
  sectionListRef: q,
  onCloseComments: G,
  showVideoCall: te,
  isVideoDocked: ue,
  showInlineVideo: fe,
  sidebarFixed: de,
  videoSpacerRef: Q,
  videoLeft: ce,
  FIXED_TOP: X,
  showTOC: ne,
  sectionReviews: me,
  reviewSection: xe,
  headerMeta: se,
  onLoadDemo: he,
  activityPublish: be
}) {
  return /* @__PURE__ */ c(W, { children: [
    i && e === "editor" && /* @__PURE__ */ n("div", { className: t(
      "rounded-lg border px-4 py-2.5 mb-3 text-center text-[13px] font-medium",
      "bg-[#fefce8] border-[#fde68a] text-[#92400e]"
    ), children: "This document has been finalized and is read-only" }),
    r && /* @__PURE__ */ c("div", { className: "text-center py-12 px-4 text-text-secondary", children: [
      /* @__PURE__ */ n("p", { className: "text-lg mb-4", children: "No document content yet." }),
      /* @__PURE__ */ n(
        "button",
        {
          onClick: he,
          className: t(
            "px-6 py-2.5 text-[15px] font-semibold border-none rounded-lg",
            "bg-primary text-white cursor-pointer font-[inherit]"
          ),
          children: "Load Demo Document"
        }
      ),
      /* @__PURE__ */ n("p", { className: "text-[13px] mt-3 text-text-tertiary", children: "Loads a sample Q2 Sprint Planning document with tasks, decisions, and notes." })
    ] }),
    !r && e === "editor" && p && /* @__PURE__ */ c("div", { ref: q, className: "flex gap-4 relative min-w-0", children: [
      te && !ue && fe && /* @__PURE__ */ n("div", { ref: Q, className: "w-[240px] shrink-0", children: /* @__PURE__ */ n(
        "div",
        {
          id: "inline-video-slot",
          className: t(de && "fixed z-30"),
          style: de ? { top: X, left: ce, width: 240 } : void 0
        }
      ) }),
      /* @__PURE__ */ c(
        "div",
        {
          className: t("flex-1 min-w-0", T ? "pr-0" : ne && o.length > 1 && e === "editor" ? "pr-48" : "pr-12"),
          children: [
            /* @__PURE__ */ n(
              Qn,
              {
                sections: o.map((L) => {
                  const z = L.items ?? [], V = j[L.id] ?? [], F = [
                    ...z,
                    ...V.filter((Y) => !z.some((J) => J.id === Y.id))
                  ];
                  return { ...L, items: F };
                }),
                getSectionFragment: f,
                ydoc: p,
                provider: h,
                user: { name: a, color: l },
                editable: !i,
                onUpdateSection: u,
                onAddItem: D,
                onUpdateItem: A,
                onRemoveItem: C,
                participants: d,
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
            /* @__PURE__ */ n(or, { documentId: s, editable: !i })
          ]
        }
      ),
      T && g && /* @__PURE__ */ c(
        "div",
        {
          className: t(
            "w-[420px] shrink-0 rounded-lg border border-border",
            "bg-[#fafbfc] flex flex-col max-h-[calc(100vh-180px)] overflow-hidden"
          ),
          style: { marginTop: O },
          children: [
            /* @__PURE__ */ c("div", { className: "flex items-center justify-between px-3.5 py-3 border-b border-border shrink-0", children: [
              /* @__PURE__ */ n("div", { className: "text-[13px] font-semibold text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap flex-1 mr-2", children: o.find((L) => L.id === g)?.title ?? "Comments" }),
              /* @__PURE__ */ n(
                "button",
                {
                  type: "button",
                  onClick: G,
                  className: t(
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
                onAddComment: (L, z) => N(g, L, z),
                participants: d,
                onResolveThread: (L) => $(g, L),
                onUnresolveThread: (L) => x(g, L)
              }
            ) })
          ]
        }
      )
    ] }),
    !r && e === "ack" && p && /* @__PURE__ */ n(
      lr,
      {
        sections: o,
        participants: d,
        userId: m,
        getSectionFragment: f,
        ydoc: p,
        provider: h,
        sectionReviews: me,
        reviewSection: (L, z, V) => {
          xe(L, z, V);
          const F = o.find((Y) => Y.id === L);
          be(`doc.review_${z}`, {
            sectionTitle: F?.title,
            status: z,
            documentId: s,
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
    !r && e === "reader" && p && /* @__PURE__ */ n(
      kr,
      {
        sections: o,
        participants: d,
        meta: se,
        commentCounts: Object.fromEntries(
          Object.entries(S).map(([L, z]) => [L, z.length])
        ),
        sectionContentTexts: Object.fromEntries(
          o.map((L) => {
            const z = f(L.id);
            return [L.id, z ? An(z) : ""];
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
function Sr(e, r) {
  const i = new Map(e.map((a) => [a.id, a])), o = new Map(r.map((a) => [a.id, a])), s = [];
  for (const a of e) {
    const l = o.get(a.id);
    if (!l)
      s.push({ status: "removed", oldItem: a, changes: [] });
    else {
      const m = [];
      a.text !== l.text && m.push("text"), a.status !== l.status && m.push(`status: ${a.status} -> ${l.status}`), a.assignee !== l.assignee && m.push(`assignee: "${a.assignee}" -> "${l.assignee}"`), a.priority !== l.priority && m.push(`priority: ${a.priority} -> ${l.priority}`), m.length > 0 ? s.push({ status: "modified", oldItem: a, newItem: l, changes: m }) : s.push({ status: "unchanged", oldItem: a, newItem: l, changes: [] });
    }
  }
  for (const a of r)
    i.has(a.id) || s.push({ status: "added", newItem: a, changes: [] });
  return s;
}
function Tr(e, r) {
  const i = new Map(e.map((a) => [a.id, a])), o = new Map(r.map((a) => [a.id, a])), s = [];
  for (const a of e) {
    const l = o.get(a.id);
    if (!l)
      s.push({
        status: "removed",
        id: a.id,
        oldTitle: a.title,
        titleChanged: !1,
        itemDiffs: a.items.map((m) => ({ status: "removed", oldItem: m, changes: [] }))
      });
    else {
      const m = a.title !== l.title, p = (a.textContent || "") !== (l.textContent || ""), h = Sr(a.items, l.items), f = m || p || h.some((u) => u.status !== "unchanged");
      s.push({
        status: f ? "modified" : "unchanged",
        id: a.id,
        oldTitle: a.title,
        newTitle: l.title,
        titleChanged: m,
        textChanged: p,
        oldTextContent: a.textContent,
        newTextContent: l.textContent,
        itemDiffs: h
      });
    }
  }
  for (const a of r)
    i.has(a.id) || s.push({
      status: "added",
      id: a.id,
      newTitle: a.title,
      titleChanged: !1,
      itemDiffs: a.items.map((l) => ({ status: "added", newItem: l, changes: [] }))
    });
  return s;
}
const Ir = {
  added: "bg-[#dcfce7] border-[#86efac]",
  removed: "bg-[#fee2e2] border-[#fca5a5]",
  modified: "bg-[#fef9c3] border-[#fde047]",
  unchanged: "bg-transparent border-[#e5e7eb]"
};
function Mr(e) {
  return e === "added" ? "text-[#166534] bg-[#bbf7d0]" : e === "removed" ? "text-[#991b1b] bg-[#fecaca]" : e === "modified" ? "text-[#854d0e] bg-[#fef08a]" : "text-[#6b7280] bg-[#f3f4f6]";
}
function $r(e) {
  return e === "added" ? "bg-[#dcfce7] text-[#166534]" : e === "removed" ? "bg-[#fee2e2] text-[#991b1b] line-through" : e === "modified" ? "bg-[#fef9c3] text-[#854d0e]" : "bg-transparent text-[#374151]";
}
function Dr({ oldSections: e, newSections: r, onClose: i }) {
  const o = Tr(e, r), s = o.some((a) => a.status !== "unchanged");
  return /* @__PURE__ */ c("div", { className: t("border-t border-[#e5e7eb] bg-[#fafbfc] max-h-[400px] overflow-auto px-4 py-3"), children: [
    /* @__PURE__ */ c("div", { className: t("flex items-center justify-between mb-2"), children: [
      /* @__PURE__ */ n("h4", { className: t("text-[13px] font-semibold text-[#374151] m-0"), children: "Changes from selected version to current" }),
      /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          className: t("px-2 py-0.5 text-xs border border-[#d1d5db] rounded bg-white text-[#6b7280] cursor-pointer font-[inherit]"),
          onClick: i,
          children: "Dismiss"
        }
      )
    ] }),
    !s && /* @__PURE__ */ n("div", { className: t("text-[13px] text-[#9ca3af] text-center p-4"), children: "No differences found. The documents are identical." }),
    o.filter((a) => a.status !== "unchanged").map((a) => /* @__PURE__ */ c("div", { className: t("border rounded-md p-2 px-2.5 mb-1.5", Ir[a.status]), children: [
      /* @__PURE__ */ c("div", { className: t("flex items-center gap-2 mb-1"), children: [
        /* @__PURE__ */ n("span", { className: t("text-[10px] font-semibold uppercase px-1.5 py-px rounded-sm", Mr(a.status)), children: a.status }),
        /* @__PURE__ */ n("span", { className: t("text-[13px] font-semibold text-[#1f2937]"), children: a.status === "removed" ? a.oldTitle : a.newTitle ?? a.oldTitle }),
        a.titleChanged && /* @__PURE__ */ c("span", { className: t("text-[11px] text-[#92400e]"), children: [
          '(was: "',
          a.oldTitle,
          '")'
        ] })
      ] }),
      a.itemDiffs.filter((l) => l.status !== "unchanged").map((l, m) => {
        const p = l.newItem ?? l.oldItem;
        return /* @__PURE__ */ c("div", { children: [
          /* @__PURE__ */ c("div", { className: t("text-xs px-2 py-0.5 rounded-sm mt-0.5", $r(l.status)), children: [
            l.status === "added" && "+ ",
            l.status === "removed" && "- ",
            l.status === "modified" && "~ ",
            p?.text ?? "(untitled)",
            p?.assignee ? ` [${p.assignee}]` : ""
          ] }),
          l.changes.length > 0 && /* @__PURE__ */ n("div", { className: t("text-[11px] text-[#92400e] ml-4 italic"), children: l.changes.join(", ") })
        ] }, p?.id ?? m);
      }),
      a.textChanged && /* @__PURE__ */ c("div", { className: t("mt-1 text-xs"), children: [
        a.oldTextContent && /* @__PURE__ */ c("div", { className: t("px-2 py-1 rounded-sm bg-[#fee2e2] text-[#991b1b] line-through mb-0.5"), children: [
          a.oldTextContent.substring(0, 200),
          (a.oldTextContent?.length ?? 0) > 200 ? "..." : ""
        ] }),
        a.newTextContent && /* @__PURE__ */ c("div", { className: t("px-2 py-1 rounded-sm bg-[#dcfce7] text-[#166534]"), children: [
          a.newTextContent.substring(0, 200),
          (a.newTextContent?.length ?? 0) > 200 ? "..." : ""
        ] })
      ] }),
      a.status === "modified" && !a.textChanged && a.itemDiffs.every((l) => l.status === "unchanged") && a.titleChanged && /* @__PURE__ */ n("div", { className: t("text-xs text-[#6b7280] mt-0.5"), children: "Only the section title changed." })
    ] }, a.id))
  ] });
}
function Rr(e) {
  const r = Math.floor(e / 1e3);
  if (r < 60) return `${r}s ago`;
  const i = Math.floor(r / 60);
  if (i < 60) return `${i} min ago`;
  const o = Math.floor(i / 60);
  if (o < 24) return `${o} hour${o !== 1 ? "s" : ""} ago`;
  const s = Math.floor(o / 24);
  if (s < 30) return `${s} day${s !== 1 ? "s" : ""} ago`;
  const a = Math.floor(s / 30);
  return `${a} month${a !== 1 ? "s" : ""} ago`;
}
function Ar({
  versions: e,
  loading: r,
  previewTimestamp: i,
  onFetch: o,
  onPreview: s,
  onClearPreview: a,
  onClose: l,
  onSaveVersion: m,
  onCompare: p,
  onClearCompare: h,
  compareSections: f,
  compareTimestamp: u,
  currentSections: d,
  onRestore: w
}) {
  const b = () => {
    a(), h(), l();
  }, S = () => {
    const x = window.prompt("Enter a name for this version:");
    x && x.trim() && m(x.trim());
  }, N = (x, k) => {
    x.stopPropagation(), u === k ? h() : p(k);
  }, $ = (x) => x.type === "pre-restore" ? "Before restore" : x.type === "auto" ? "Auto-save" : "";
  return /* @__PURE__ */ c(Re, { width: 320, children: [
    /* @__PURE__ */ n(
      Ae,
      {
        title: "Version History",
        onClose: b,
        actions: /* @__PURE__ */ n(ee, { size: "sm", onClick: S, children: "Save Version" })
      }
    ),
    /* @__PURE__ */ c(je, { padding: "0.5rem 0", children: [
      r && /* @__PURE__ */ n("div", { className: t("py-8 px-4 text-center text-text-tertiary text-[13px]"), children: "Loading..." }),
      !r && e.length === 0 && /* @__PURE__ */ n("div", { className: t("py-8 px-4 text-center text-text-tertiary text-[13px]"), children: "No saved versions yet" }),
      !r && e.map((x) => /* @__PURE__ */ c(
        "div",
        {
          className: t(
            "flex items-center justify-between py-2.5 px-4 cursor-pointer text-[13px] text-text-primary",
            i === x.timestamp ? "bg-[#eff6ff] border-l-[3px] border-l-[#3b82f6]" : "bg-transparent border-l-[3px] border-l-transparent"
          ),
          onClick: () => s(x.timestamp),
          children: [
            /* @__PURE__ */ c("div", { className: t("flex-1 min-w-0"), children: [
              x.name && /* @__PURE__ */ n("span", { className: t("text-xs font-semibold text-[#1f2937] block mb-px"), children: x.name }),
              /* @__PURE__ */ c("span", { className: t("flex items-center gap-1"), children: [
                Rr(x.age),
                x.type && x.type !== "manual" && /* @__PURE__ */ n(
                  "span",
                  {
                    className: t(
                      "text-[10px] font-medium px-[5px] py-px rounded-[3px] ml-1.5",
                      x.type === "pre-restore" ? "bg-[#fef3c7] text-[#92400e]" : x.type === "auto" ? "bg-[#f3f4f6] text-text-tertiary" : "bg-[#e0f2fe] text-[#0369a1]"
                    ),
                    children: $(x)
                  }
                )
              ] }),
              x.author && /* @__PURE__ */ c("span", { className: t("text-[10px] text-text-tertiary block"), children: [
                "by ",
                x.author
              ] }),
              /* @__PURE__ */ n("span", { className: t("text-[11px] text-text-tertiary"), children: new Date(x.timestamp).toLocaleString() })
            ] }),
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: t(
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
      Dr,
      {
        oldSections: f,
        newSections: d,
        onClose: h
      }
    ),
    w && u != null && /* @__PURE__ */ c("div", { className: t("py-3 px-4 border-t border-border shrink-0"), children: [
      /* @__PURE__ */ n(
        ee,
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
      /* @__PURE__ */ n("div", { className: t("text-[11px] text-text-tertiary text-center mt-1.5"), children: "A pre-restore checkpoint will be saved automatically" })
    ] })
  ] });
}
function jr(e) {
  const r = typeof e == "number" ? e : Date.now() - new Date(e).getTime(), i = Math.floor(r / 1e3);
  if (i < 60) return `${i}s ago`;
  const o = Math.floor(i / 60);
  if (o < 60) return `${o} min ago`;
  const s = Math.floor(o / 60);
  if (s < 24) return `${s} hour${s !== 1 ? "s" : ""} ago`;
  const a = Math.floor(s / 24);
  if (a < 30) return `${a} day${a !== 1 ? "s" : ""} ago`;
  const l = Math.floor(a / 30);
  return `${l} month${l !== 1 ? "s" : ""} ago`;
}
function Lr(e) {
  return e.split(/\s+/).map((r) => r[0]).join("").toUpperCase().slice(0, 2);
}
function Er({
  item: e,
  onClick: r,
  onDismiss: i
}) {
  return /* @__PURE__ */ c(
    "div",
    {
      className: t("flex gap-2.5 py-2.5 px-4 cursor-pointer border-b border-[#f3f4f6] items-start hover:bg-[#f9fafb]"),
      onClick: r,
      children: [
        /* @__PURE__ */ n(
          "div",
          {
            className: t("w-7 h-7 rounded-full text-white text-[11px] font-semibold flex items-center justify-center shrink-0"),
            style: { background: e.authorColor },
            children: Lr(e.authorName)
          }
        ),
        /* @__PURE__ */ c("div", { className: t("flex-1 min-w-0"), children: [
          /* @__PURE__ */ n("div", { className: t("text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"), children: e.commentText }),
          /* @__PURE__ */ n("div", { className: t("text-[11px] text-text-tertiary mt-0.5"), children: e.sectionTitle })
        ] }),
        /* @__PURE__ */ n("div", { className: t("text-[11px] text-text-tertiary shrink-0 mt-0.5"), children: jr(e.timestamp) }),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: (o) => {
              o.stopPropagation(), i();
            },
            "aria-label": "Dismiss mention",
            className: t("px-1.5 py-0.5 text-[13px] text-text-tertiary bg-transparent border-none cursor-pointer leading-none shrink-0"),
            children: "x"
          }
        )
      ]
    }
  );
}
function Or({
  item: e,
  onClick: r,
  onDismiss: i
}) {
  const o = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#22c55e"
  }, s = {
    pending: { bg: "#fef3c7", text: "#92400e" },
    acked: { bg: "#dbeafe", text: "#1e40af" },
    done: { bg: "#d1fae5", text: "#065f46" },
    rejected: { bg: "#fee2e2", text: "#991b1b" }
  }, a = s[e.status] ?? s.pending;
  return /* @__PURE__ */ c(
    "div",
    {
      className: t("flex gap-2.5 py-2.5 px-4 cursor-pointer border-b border-[#f3f4f6] items-start hover:bg-[#f9fafb]"),
      onClick: r,
      children: [
        /* @__PURE__ */ n(
          "div",
          {
            className: t("w-2 h-2 rounded-full shrink-0 mt-1"),
            style: { background: o[e.priority] ?? "#94a3b8" }
          }
        ),
        /* @__PURE__ */ c("div", { className: t("flex-1 min-w-0"), children: [
          /* @__PURE__ */ c("div", { className: t("text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"), children: [
            e.taskText,
            /* @__PURE__ */ n(
              "span",
              {
                className: t("inline-block text-[10px] font-semibold px-1.5 py-px rounded-full ml-1.5"),
                style: { background: a.bg, color: a.text },
                children: e.status
              }
            )
          ] }),
          /* @__PURE__ */ n("div", { className: t("text-[11px] text-text-tertiary mt-0.5"), children: e.sectionTitle })
        ] }),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: (l) => {
              l.stopPropagation(), i();
            },
            "aria-label": "Dismiss task",
            className: t("px-1.5 py-0.5 text-[13px] text-text-tertiary bg-transparent border-none cursor-pointer leading-none shrink-0"),
            children: "x"
          }
        )
      ]
    }
  );
}
function Br({
  items: e,
  onNavigateToSection: r,
  onClose: i
}) {
  const [o, s] = M("all"), [a, l] = M(/* @__PURE__ */ new Set()), m = (f) => {
    l((u) => {
      const d = new Set(u);
      return d.add(f), d;
    });
  }, p = () => {
    const f = h.map((u) => u.kind === "mention" ? u.commentId : u.itemId);
    l((u) => {
      const d = new Set(u);
      return f.forEach((w) => d.add(w)), d;
    });
  }, h = e.filter((f) => {
    const u = f.kind === "mention" ? f.commentId : f.itemId;
    return a.has(u) ? !1 : o === "all" ? !0 : o === "mentions" ? f.kind === "mention" : f.kind === "task";
  });
  return /* @__PURE__ */ c(Re, { width: 340, children: [
    /* @__PURE__ */ n(
      Ae,
      {
        title: "My Mentions & Tasks",
        onClose: i,
        actions: h.length > 0 ? /* @__PURE__ */ n(ee, { variant: "default", size: "sm", onClick: p, children: "Clear all" }) : void 0
      }
    ),
    /* @__PURE__ */ n("div", { className: t("flex gap-0 border-b border-border shrink-0"), children: ["all", "mentions", "tasks"].map((f) => /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        className: t(
          "flex-1 py-2 text-[13px] bg-transparent border-none cursor-pointer font-[inherit]",
          o === f ? "font-semibold text-primary border-b-2 border-b-primary" : "font-normal text-text-secondary border-b-2 border-b-transparent"
        ),
        onClick: () => s(f),
        children: f === "all" ? "All" : f === "mentions" ? "Mentions" : "Tasks"
      },
      f
    )) }),
    /* @__PURE__ */ c(je, { padding: "0.5rem 0", children: [
      h.length === 0 && /* @__PURE__ */ n("div", { className: t("py-8 px-4 text-center text-text-tertiary text-[13px]"), children: "No mentions or tasks for you" }),
      h.map(
        (f) => f.kind === "mention" ? /* @__PURE__ */ n(
          Er,
          {
            item: f,
            onClick: () => r(f.sectionId),
            onDismiss: () => m(f.commentId)
          },
          f.commentId
        ) : /* @__PURE__ */ n(
          Or,
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
function _r(e, r) {
  const i = new Date(e).getTime(), s = (r ? new Date(r).getTime() : Date.now()) - i, a = Math.floor(s / 6e4);
  return a < 1 ? "<1m" : a < 60 ? `${a}m` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function Ur(e) {
  const r = Date.now() - new Date(e).getTime(), i = Math.floor(r / 6e4);
  if (i < 1) return "just now";
  if (i < 60) return `${i}m ago`;
  const o = Math.floor(i / 60);
  return o < 24 ? `${o}h ago` : `${Math.floor(o / 24)}d ago`;
}
function Vr({ sessions: e, loading: r, onFetch: i, onClose: o }) {
  U(() => {
    i();
  }, [i]);
  const s = e.filter((l) => l.status === "ended"), a = e.filter((l) => l.status === "active");
  return /* @__PURE__ */ c(Re, { width: 340, children: [
    /* @__PURE__ */ n(Ae, { title: "Past Conversations", onClose: o }),
    /* @__PURE__ */ c(je, { padding: "12px", children: [
      r && /* @__PURE__ */ n("div", { className: t("text-center text-text-tertiary text-[13px] py-6"), children: "Loading..." }),
      !r && e.length === 0 && /* @__PURE__ */ n("div", { className: t("text-center text-text-tertiary text-[13px] py-6"), children: "No video conversations yet for this document." }),
      a.map((l) => /* @__PURE__ */ n(it, { session: l, isActive: !0 }, l.sessionId)),
      s.map((l) => /* @__PURE__ */ n(it, { session: l }, l.sessionId))
    ] })
  ] });
}
function it({ session: e, isActive: r }) {
  return /* @__PURE__ */ c("div", { className: t(
    "rounded-lg p-3 mb-2",
    r ? "border border-[#10b981] bg-[rgba(16,185,129,0.04)]" : "border border-border bg-white"
  ), children: [
    /* @__PURE__ */ c("div", { className: t("flex justify-between items-center mb-1"), children: [
      /* @__PURE__ */ n("span", { className: t("text-[11px] text-text-tertiary"), children: Ur(e.startedAt) }),
      /* @__PURE__ */ c("div", { className: t("flex items-center gap-1"), children: [
        r && /* @__PURE__ */ n("span", { className: t("text-[11px] font-semibold text-[#10b981] bg-[rgba(16,185,129,0.1)] px-1.5 py-px rounded-full"), children: "Live" }),
        /* @__PURE__ */ n("span", { className: t("text-[11px] text-text-secondary"), children: _r(e.startedAt, e.endedAt) })
      ] })
    ] }),
    /* @__PURE__ */ n("div", { className: t("flex flex-wrap gap-1 mb-2"), children: e.participants.map((i, o) => /* @__PURE__ */ n("span", { className: t("text-[11px] text-text-secondary bg-[#f8fafc] px-2 py-0.5 rounded-full"), children: i.displayName || i.userId.slice(0, 10) }, `${i.userId}-${o}`)) }),
    e.aiSummary && /* @__PURE__ */ n("div", { className: t("text-[11px] text-text-primary bg-[#f8fafc] p-2 rounded-md leading-normal"), children: e.aiSummary }),
    e.transcriptStatus && e.transcriptStatus !== "available" && /* @__PURE__ */ c("div", { className: t("text-[11px] text-text-tertiary mt-1"), children: [
      "Transcript: ",
      e.transcriptStatus
    ] })
  ] });
}
function Fr({ sections: e, focusedSectionId: r }) {
  const [i, o] = M(null);
  U(() => {
    if (e.length === 0) return;
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
    for (const h of e) {
      const f = document.getElementById(`section-${h.id}`);
      f && p.observe(f);
    }
    return () => p.disconnect();
  }, [e]);
  const s = i || r, a = R((p) => {
    const h = document.getElementById(`section-${p}`);
    h && h.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []), l = e.filter((p, h, f) => f.findIndex((u) => u.id === p.id) === h);
  if (l.length === 0) return null;
  const m = l.findIndex((p) => p.id === s);
  return /* @__PURE__ */ c("div", { className: t("flex flex-col gap-0 text-[11px] w-[140px] max-h-[calc(100vh-160px)] overflow-y-auto"), children: [
    /* @__PURE__ */ n("div", { className: t("text-[10px] font-semibold text-text-tertiary uppercase tracking-wide mb-1.5"), children: "Contents" }),
    l.map((p, h) => {
      const f = p.id === s, u = m >= 0 && h < m;
      return /* @__PURE__ */ c(
        "button",
        {
          type: "button",
          onClick: () => a(p.id),
          className: t("flex items-center gap-2 py-1 border-none bg-transparent cursor-pointer text-left font-[inherit]"),
          children: [
            /* @__PURE__ */ n("div", { className: t("flex flex-col items-center w-3 shrink-0"), children: /* @__PURE__ */ n(
              "div",
              {
                className: t(
                  "rounded-full transition-all duration-200",
                  f ? "w-2 h-2 bg-[#3b82f6] shadow-[0_0_0_3px_rgba(59,130,246,0.2)]" : u ? "w-1.5 h-1.5 bg-[#94a3b8]" : "w-1.5 h-1.5 bg-[#d1d5db]"
                )
              }
            ) }),
            /* @__PURE__ */ n("span", { className: t(
              "text-[11px] overflow-hidden text-ellipsis whitespace-nowrap transition-colors duration-200",
              f ? "font-semibold text-[#1e293b]" : u ? "font-normal text-[#64748b]" : "font-normal text-text-tertiary"
            ), children: p.title || "Untitled" })
          ]
        },
        p.id
      );
    }),
    m >= 0 && /* @__PURE__ */ c("div", { className: t("text-[10px] text-text-tertiary mt-2"), children: [
      m + 1,
      " / ",
      l.length
    ] })
  ] });
}
function Pr({
  showHistory: e,
  showMyItems: r,
  showVideoHistory: i,
  closePanel: o,
  versionHistory: s,
  ydoc: a,
  myItems: l,
  onNavigateToSection: m,
  videoSessions: p,
  showTOC: h,
  commentSidebarOpen: f,
  sections: u,
  focusedSectionId: d,
  mode: w
}) {
  return /* @__PURE__ */ c(W, { children: [
    e && /* @__PURE__ */ n(
      Ar,
      {
        versions: s.versions,
        loading: s.loading,
        previewTimestamp: s.previewTimestamp,
        onFetch: s.fetchVersions,
        onPreview: s.previewVersion,
        onClearPreview: s.clearPreview,
        onClose: o,
        onSaveVersion: s.saveVersion,
        onCompare: s.compareVersion,
        onClearCompare: s.clearCompare,
        compareSections: s.compareSections,
        compareTimestamp: s.compareTimestamp,
        currentSections: a ? s.extractSections(a) : [],
        onRestore: s.restoreVersion
      }
    ),
    r && /* @__PURE__ */ n(
      Br,
      {
        items: l,
        onNavigateToSection: m,
        onClose: o
      }
    ),
    i && /* @__PURE__ */ n(
      Vr,
      {
        sessions: p.sessions,
        loading: p.loading,
        onFetch: p.fetchSessions,
        onClose: o
      }
    ),
    h && !f && u.length > 1 && w === "editor" && /* @__PURE__ */ n("div", { className: t(
      "fixed bottom-4 right-4 w-40 max-h-[280px] overflow-y-auto",
      "bg-white border border-border rounded-[10px] px-3 py-2.5",
      "shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-30"
    ), children: /* @__PURE__ */ n(
      Fr,
      {
        sections: u.map((b) => ({ id: b.id, title: b.title })),
        focusedSectionId: d
      }
    ) })
  ] });
}
function zr({
  documentId: e,
  documentType: r,
  ws: i,
  userId: o,
  displayName: s,
  color: a = "#3b82f6",
  onMessage: l,
  activityPublish: m,
  onBack: p,
  isVideoDocked: h,
  onDockVideo: f,
  onUndockVideo: u
}) {
  const d = jn({
    documentId: e,
    documentType: r,
    ws: i,
    userId: o,
    displayName: s,
    color: a,
    onMessage: l,
    activityPublish: m,
    isVideoDocked: h,
    onDockVideo: f,
    onUndockVideo: u,
    onBack: p
  }), w = d.sections.length === 0 && !d.demoLoaded, [b] = M(() => {
    if (typeof document > "u") return null;
    const N = document.createElement("div");
    return N.style.width = "100%", N;
  });
  U(() => {
    if (!b) return;
    if (!d.showVideoCall) {
      b.parentNode?.removeChild(b);
      return;
    }
    const N = d.isVideoDocked ? "sidebar-video-slot" : "inline-video-slot", $ = () => {
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
  }, [b, d.showVideoCall, d.isVideoDocked, d.mode]), U(() => () => {
    b?.parentNode?.removeChild(b);
  }, [b]);
  const S = d.showVideoCall && b ? lt(
    /* @__PURE__ */ n(
      Wn,
      {
        documentId: e,
        userId: o,
        idToken: d.idToken,
        meta: d.meta,
        updateMeta: d.updateMeta,
        sendMessage: i.sendMessage,
        isDocked: d.isVideoDocked,
        onClose: () => {
          d.setShowVideoCall(!1), d.isVideoDocked && u?.();
        },
        onDockToSidebar: d.isVideoDocked ? void 0 : (() => {
          f?.();
        }),
        onUndock: d.isVideoDocked ? (() => {
          u?.();
        }) : void 0,
        onCallEnd: () => {
          d.setShowVideoCall(!1), u?.();
        }
      }
    ),
    b
  ) : null;
  return /* @__PURE__ */ c("div", { "data-testid": "document-editor-page", className: "flex flex-col h-full", children: [
    S,
    /* @__PURE__ */ n(
      Vn,
      {
        meta: d.headerMeta,
        mode: d.mode,
        onModeChange: d.handleModeChange,
        participants: d.participants,
        onUpdateMeta: d.updateMeta,
        onExport: d.handleExport,
        onToggleHistory: d.handleToggleHistory,
        onToggleVideoCall: d.handleToggleVideoCall,
        onToggleVideoHistory: d.handleToggleVideoHistory,
        isCallActive: !!d.meta?.activeCallSessionId,
        onClearDocument: d.handleClearDocument,
        onJumpToUser: d.handleJumpToUser,
        sections: d.sections.map((N) => ({ id: N.id, title: N.title })),
        onToggleMyItems: d.handleToggleMyItems,
        myItemCount: d.myItems.length,
        commentCount: Object.values(d.comments).reduce((N, $) => N + $.length, 0),
        onBack: d.handleBack,
        onFollowUser: d.handleFollowUser,
        followingUserId: d.followingUserId,
        onFinalize: d.handleFinalize,
        onUnlock: d.handleUnlock,
        pastCallsCount: d.videoSessions.sessions.length
      }
    ),
    /* @__PURE__ */ n(
      Fn,
      {
        followingUserId: d.followingUserId,
        participants: d.participants,
        onStopFollow: d.handleStopFollow
      }
    ),
    /* @__PURE__ */ n("div", { className: "flex-1 overflow-auto p-4", children: /* @__PURE__ */ n(
      Cr,
      {
        mode: d.mode,
        isEmpty: w,
        isFinalized: d.isFinalized,
        sections: d.sections,
        documentId: e,
        displayName: s,
        color: a,
        userId: o,
        ydoc: d.ydoc,
        provider: d.provider,
        getSectionFragment: d.getSectionFragment,
        updateSection: d.updateSection,
        participants: d.participants,
        focusedSectionId: d.focusedSectionId,
        onSectionFocus: d.handleSectionFocus,
        comments: d.comments,
        onAddComment: d.handleAddComment,
        onResolveThread: d.handleResolveThread,
        onUnresolveThread: d.handleUnresolveThread,
        onUpdateCursorInfo: d.awareness.updateCursorInfo,
        onOpenComments: d.handleOpenComments,
        onAddItem: d.handleAddItem,
        onUpdateItem: d.handleUpdateItem,
        onRemoveItem: d.handleRemoveItem,
        restItems: d.restItems,
        commentSidebarOpen: d.commentSidebarOpen,
        commentSectionId: d.commentSectionId,
        commentSidebarTop: d.commentSidebarTop,
        sectionListRef: d.sectionListRef,
        onCloseComments: d.handleCloseComments,
        showVideoCall: d.showVideoCall,
        isVideoDocked: d.isVideoDocked,
        showInlineVideo: d.showInlineVideo,
        sidebarFixed: d.sidebarFixed,
        videoSpacerRef: d.videoSpacerRef,
        videoLeft: d.videoLeft,
        FIXED_TOP: d.FIXED_TOP,
        showTOC: d.showTOC,
        sectionReviews: d.sectionReviews,
        reviewSection: d.restReviewSection,
        headerMeta: d.headerMeta,
        onLoadDemo: d.handleLoadDemo,
        activityPublish: m
      }
    ) }),
    /* @__PURE__ */ n(
      Pr,
      {
        showHistory: d.showHistory,
        showMyItems: d.showMyItems,
        showVideoHistory: d.showVideoHistory,
        closePanel: d.closePanel,
        versionHistory: d.versionHistory,
        ydoc: d.ydoc,
        myItems: d.myItems,
        onNavigateToSection: d.handleNavigateToSection,
        videoSessions: d.videoSessions,
        showTOC: d.showTOC,
        commentSidebarOpen: d.commentSidebarOpen,
        sections: d.sections,
        focusedSectionId: d.focusedSectionId,
        mode: d.mode
      }
    )
  ] });
}
const to = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zr
}, Symbol.toStringTag, { value: "Module" }));
export {
  hr as A,
  Dr as D,
  ur as E,
  Fn as F,
  pr as H,
  xr as K,
  pt as M,
  _n as P,
  kr as R,
  bt as S,
  Fr as T,
  Ar as V,
  or as a,
  zr as b,
  Vn as c,
  Br as d,
  lr as e,
  Xn as f,
  Qn as g,
  br as h,
  Wn as i,
  Vr as j,
  ut as k,
  mr as l,
  ir as m,
  Mn as n,
  to as o,
  Se as r,
  In as u
};
