import { jsxs as c, jsx as n, Fragment as W } from "react/jsx-runtime";
import { useState as M, useCallback as R, useEffect as U, useRef as P, useMemo as lt, forwardRef as rn, useImperativeHandle as on } from "react";
import sn, { createPortal as dt } from "react-dom";
import { n as an, b as ln, c as dn, g as cn, e as un, j as mn, l as pn, m as fn, i as xn } from "./useWebSocket-Bn4OeUor.js";
import { u as hn } from "./IdentityContext-CLalsm_M.js";
import { l as bn } from "./useDocumentTypes-C29MkgPl.js";
import { c as t } from "./cn-B6yFEsav.js";
import { I as de } from "./Input-Dt0yAs9r.js";
import { u as gn } from "./useHangoutEmbed-D-rUq74K.js";
import { u as yn } from "./useActiveSpeaker-BOwJ262O.js";
import { D as vn, T as Re } from "./NewDocumentModal-DrvMvgkp.js";
import { b as wn } from "./registry-qR57lair.js";
import { T as ct } from "./Textarea-kaa9rHUL.js";
function De() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
const ut = /^- \[([ xX])\]\s+(.+)$/;
function Nn(e, r) {
  const i = e.toLowerCase();
  return ut.test(r) || /- \[[ xX]\]/.test(r) ? "tasks" : i.includes("decision") ? "decisions" : i.includes("summary") ? "summary" : "notes";
}
function Je(e) {
  const r = e.split(`
`), i = [], o = [];
  for (const s of r) {
    const a = s.match(ut);
    if (a) {
      const l = a[1].toLowerCase() === "x";
      i.push({
        id: De(),
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
function kn(e) {
  const r = {}, i = [], o = e.replace(/\r\n/g, `
`), s = o.match(/^# (.+)$/m);
  s && (r.title = s[1].trim());
  const a = o.split(/^## /m);
  if (a.length <= 1) {
    const l = o.replace(/^# .+\n*/m, "").trim();
    if (l.length > 0) {
      const { items: u, remaining: m } = Je(l);
      i.push({
        id: De(),
        type: "summary",
        title: r.title ?? "Untitled",
        contentMarkdown: m,
        items: u
      });
    }
    return { meta: r, sections: i };
  }
  for (let l = 1; l < a.length; l++) {
    const u = a[l], m = u.indexOf(`
`), h = m === -1 ? u.trim() : u.slice(0, m).trim(), f = m === -1 ? "" : u.slice(m + 1).trim(), { items: p, remaining: d } = Je(f), w = Nn(h, f);
    i.push({
      id: De(),
      type: w,
      title: h,
      contentMarkdown: d,
      items: p
    });
  }
  return { meta: r, sections: i };
}
function Cn(e) {
  return `- [${e.status === "done" || e.status === "acked" ? "x" : " "}] ${e.text}`;
}
function mt(e, r = 0) {
  const i = "  ".repeat(r), o = [];
  o.push(`${i}> **${e.displayName}**: ${e.text}`);
  for (const s of e.replies)
    o.push(mt(s, r + 1));
  return o.join(`
`);
}
function Sn(e) {
  const r = [`## ${e.title}`, ""], i = e.contentMarkdown ?? e.contentText;
  if (i && r.push(i, ""), e.items.length > 0) {
    for (const s of e.items)
      r.push(Cn(s));
    r.push("");
  }
  const o = e.comments;
  if (o && o.length > 0) {
    r.push(`### Comments (${o.length})`, "");
    for (const s of o)
      r.push(mt(s));
    r.push("");
  }
  return r.join(`
`);
}
function Ze(e) {
  const r = [`# ${e.meta.title}`, ""];
  for (const i of e.sections)
    r.push(Sn(i));
  return r.join(`
`).trimEnd() + `
`;
}
const Tn = `# Q2 Sprint Planning - Meeting Summary

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
function In(e) {
  return e.toString().replace(/<\/?(paragraph|heading|blockquote|codeBlock|bulletList|orderedList|listItem|taskList|taskItem|horizontalRule|hardBreak|doc)[^>]*>/g, `
`).replace(/<[^>]+>/g, "").replace(/\n{3,}/g, `

`).trim();
}
function Mn(e) {
  return e.split(`
`).map((r) => r.startsWith("### ") ? `<h3>${r.slice(4)}</h3>` : r.startsWith("## ") ? `<h2>${r.slice(3)}</h2>` : r.startsWith("# ") ? `<h1>${r.slice(2)}</h1>` : r.startsWith("> ") ? `<blockquote>${r.slice(2)}</blockquote>` : r.startsWith("- [x] ") ? `<li>&#9745; ${r.slice(6)}</li>` : r.startsWith("- [ ] ") ? `<li>&#9744; ${r.slice(6)}</li>` : r.startsWith("- ") ? `<li>${r.slice(2)}</li>` : r.trim() === "" ? "<br/>" : `<p>${r}</p>`).join(`
`).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/`([^`]+)`/g, "<code>$1</code>");
}
function Ge(e, r) {
  const i = URL.createObjectURL(e), o = document.createElement("a");
  o.href = i, o.download = r, o.click(), URL.revokeObjectURL(i);
}
function $n({
  documentId: e,
  userId: r,
  ws: i,
  updateMeta: o,
  addSection: s,
  exportJSON: a,
  getSectionFragment: l,
  comments: u
}) {
  const [m, h] = M(!1), f = R(() => {
    const w = kn(Tn);
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
  }, [e, r, o, s]), p = R(() => {
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
        N && (S.contentText = In(N));
        const $ = u[S.id];
        $ && $.length > 0 && (S.comments = $);
      }
      if (w === "json") {
        const S = new Blob([JSON.stringify(b, null, 2)], { type: "application/json" });
        Ge(S, `${b.meta.title || "document"}.json`);
      } else if (w === "markdown") {
        const S = Ze(b), N = new Blob([S], { type: "text/markdown" });
        Ge(N, `${b.meta.title || "document"}.md`);
      } else if (w === "pdf") {
        const S = Ze(b), N = window.open("", "_blank");
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
          <body>${Mn(S)}</body>
          </html>
        `), N.document.close(), N.print());
      }
    }
  }, [a, l, u]);
  return {
    demoLoaded: m,
    handleLoadDemo: f,
    handleClearDocument: p,
    handleExport: d
  };
}
function Dn(e = {}) {
  const [r, i] = M(
    e.initialPanel ?? null
  ), o = R((l) => {
    i((u) => u === l ? null : l);
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
function Rn(e, r) {
  const i = `${e}::${r}`;
  let o = 5381;
  for (let s = 0; s < i.length; s++)
    o = o * 33 ^ i.charCodeAt(s);
  return `tpl-${(o >>> 0).toString(36)}`;
}
function An(e) {
  const r = e.getArray("sections"), i = /* @__PURE__ */ new Set(), o = [];
  return r.toArray().forEach((s, a) => {
    const l = s.get("id");
    typeof l != "string" || !l || (i.has(l) ? o.push(a) : i.add(l));
  }), o.length === 0 ? 0 : (e.transact(() => {
    for (let s = o.length - 1; s >= 0; s--)
      r.delete(o[s], 1);
  }), o.length);
}
function jn() {
  if (typeof window < "u") {
    const r = new URLSearchParams(window.location.search).get("mode");
    if (r === "editor" || r === "ack" || r === "reader") return r;
  }
  return "editor";
}
function Ln(e) {
  return e.toString().replace(/<\/?(paragraph|heading|blockquote|codeBlock|bulletList|orderedList|listItem|taskList|taskItem|horizontalRule|hardBreak|doc)[^>]*>/g, `
`).replace(/<[^>]+>/g, "").replace(/\n{3,}/g, `

`).trim();
}
function En({
  documentId: e,
  documentType: r,
  ws: i,
  userId: o,
  displayName: s,
  color: a = "#3b82f6",
  onMessage: l,
  activityPublish: u,
  isVideoDocked: m,
  onDockVideo: h,
  onUndockVideo: f,
  onBack: p
}) {
  const [d, w] = M(jn), {
    showHistory: b,
    showMyItems: S,
    showVideoHistory: N,
    toggleHistory: $,
    toggleMyItems: x,
    toggleVideoHistory: k,
    closePanel: v
  } = Dn(), [D, A] = M(m ?? !1), [C, j] = M(typeof window < "u" ? window.innerWidth : 1400);
  U(() => {
    const y = () => j(window.innerWidth);
    return window.addEventListener("resize", y), () => window.removeEventListener("resize", y);
  }, []);
  const T = C >= 1200, g = C >= 900, [O, q] = M(!1), G = P(null), te = P(null), [fe, xe] = M(0), [, ce] = M(0), Q = P(null), ue = 146, X = R(() => {
    if (Q.current === null) {
      const B = G.current ?? te.current;
      B && (Q.current = B.getBoundingClientRect().top + window.scrollY);
    }
    const y = Q.current ?? 250, I = window.scrollY > y - ue;
    q(I), G.current && xe(G.current.getBoundingClientRect().left), te.current && ce(te.current.getBoundingClientRect().left);
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
  const [ne, me] = M(null), [he, se] = M(!1), [be, ge] = M(null), { idToken: L } = hn(), z = an(e, L), {
    meta: V,
    sections: F,
    synced: Y,
    updateMeta: J,
    addSection: Ee,
    updateSection: wt,
    addItem: Oe,
    updateItem: Be,
    removeItem: _e,
    getSectionFragment: Ue,
    ydoc: Z,
    provider: Nt,
    exportJSON: kt,
    participants: ye,
    awareness: ie
  } = ln({
    documentId: e,
    mode: d,
    ws: i,
    userId: o,
    displayName: s,
    color: a,
    onMessage: l
  }), {
    comments: ve,
    addComment: Ve,
    resolveThread: Fe,
    unresolveThread: Pe
  } = dn({
    documentId: e,
    idToken: L,
    sendMessage: i.sendMessage,
    onMessage: l,
    connectionState: i.connectionState
  }), {
    sectionReviews: Ct,
    reviewSection: St
  } = cn({
    documentId: e,
    idToken: L,
    sendMessage: i.sendMessage,
    onMessage: l,
    connectionState: i.connectionState
  }), Tt = lt(() => F.map((y) => y.id), [F]), {
    items: It,
    addItem: ze,
    updateItem: He,
    removeItem: qe
  } = un({
    documentId: e,
    sectionIds: Tt,
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
  const { demoLoaded: Mt, handleLoadDemo: $t, handleClearDocument: Dt, handleExport: Rt } = $n({
    documentId: e,
    userId: o,
    ws: i,
    updateMeta: J,
    addSection: Ee,
    exportJSON: kt,
    getSectionFragment: Ue,
    comments: ve
  }), [we, Ke] = M(null), At = R((y) => {
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
  }, [d, F]), jt = R((y) => {
    const I = y.userId || y.clientId;
    me((B) => B === I ? null : I);
  }, []), ae = P(null);
  U(() => {
    if (!ne) {
      ae.current = null;
      return;
    }
    const y = ye.find(
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
  }, [ne, ye, d, F]);
  const Lt = R(() => {
    me(null);
  }, []), Et = R((y, I) => {
    const B = { id: crypto.randomUUID(), ...I };
    Oe(y, B), ze(y, B).catch(() => {
    });
    const E = F.find((_) => _.id === y);
    u("doc.add_item", { sectionTitle: E?.title, documentId: e, documentTitle: V?.title });
  }, [Oe, ze, F, u, e, V?.title]), Ot = R((y, I, B) => {
    Be(y, I, B), He(y, I, B).catch(() => {
    });
  }, [Be, He]), Bt = R((y, I) => {
    _e(y, I), qe(y, I).catch(() => {
    });
  }, [_e, qe]);
  U(() => {
    if (F.length === 0 || we) return;
    const y = setTimeout(() => {
      const I = F[0].id;
      Ke(I), ie.updateSection(I);
    }, 500);
    return () => clearTimeout(y);
  }, [F, we, ie]);
  const _t = R((y) => {
    Ke(y), ie.updateSection(y);
  }, [ie]), We = P(null), [Ut, Vt] = M(0), Ft = R((y) => {
    ge(y), se(!0), requestAnimationFrame(() => {
      const I = document.getElementById(`section-${y}`), B = We.current;
      if (I && B) {
        const E = I.getBoundingClientRect(), _ = B.getBoundingClientRect();
        Vt(E.top - _.top);
      }
    });
  }, []), Pt = R(() => {
    se(!1);
  }, []), zt = R((y, I, B) => {
    Ve(y, I, B), u("doc.comment", { sectionId: y, text: I.slice(0, 50), documentId: e, documentTitle: V?.title });
    const E = I.match(/@[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)*/g);
    if (E && E.length > 0) {
      const _ = E.map((Ce) => Ce.slice(1).trim()), H = F.find((Ce) => Ce.id === y);
      u("doc.mention", {
        sectionId: y,
        sectionTitle: H?.title ?? "",
        mentionedNames: _,
        commentText: I.slice(0, 80),
        authorName: s,
        documentId: e,
        documentTitle: V?.title
      });
    }
  }, [Ve, u, F, s, e, V?.title]), Ht = R((y, I) => {
    Fe(y, I), u("doc.resolve_thread", { sectionId: y, commentId: I, documentId: e, documentTitle: V?.title });
  }, [Fe, u, e, V?.title]), qt = R((y, I) => {
    Pe(y, I), u("doc.unresolve_thread", { sectionId: y, commentId: I, reopenedBy: s, documentId: e, documentTitle: V?.title });
  }, [Pe, u, s, e, V?.title]), Kt = mn({ sections: F, comments: ve, displayName: s, userId: o }), Wt = R((y) => {
    setTimeout(() => {
      const I = document.getElementById(`section-${y}`);
      I && (I.scrollIntoView({ behavior: "smooth", block: "center" }), I.style.transition = "box-shadow 0.3s ease", I.style.boxShadow = "0 0 0 3px #3b82f640", setTimeout(() => {
        I.style.boxShadow = "";
      }, 2e3));
    }, 150);
  }, []), Ne = x, Yt = $, Jt = k, Zt = R(() => {
    A((y) => !y), v();
  }, [v]);
  U(() => {
    const y = (I) => {
      (I.metaKey || I.ctrlKey) && I.key === "m" && (I.preventDefault(), Ne());
    };
    return window.addEventListener("keydown", y), () => window.removeEventListener("keydown", y);
  }, [Ne]);
  const Gt = `doc:${e}`, ke = pn({
    channel: Gt,
    sendMessage: i.sendMessage,
    onMessage: l
  });
  U(() => {
    b ? ke.fetchVersions() : ke.clearPreview();
  }, [b]), U(() => {
    if (!Y || !r || !Z) return;
    const y = Z.getMap("meta");
    if (y.get("templateApplied") || Z.getArray("sections").length > 0) return;
    const E = bn().find((H) => H.name === r);
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
      Ee({
        // Deterministic, not random: two clients opening this document at the
        // same moment both pass the guards above (templateApplied is a Y.Map
        // key, not a lock), so they must produce the SAME ids or the document
        // ends up with two indistinguishable copies of every section.
        id: Rn(e, H.name),
        type: _(H.sectionType),
        sectionType: H.sectionType,
        title: H.name,
        collapsed: H.defaultCollapsed,
        placeholder: H.placeholder || void 0,
        items: []
      });
  }, [Y, r, Z]), U(() => {
    !Y || !Z || An(Z);
  }, [Y, Z]);
  const Xt = (y) => {
    if (w(y), typeof window < "u") {
      const I = new URL(window.location.href);
      I.searchParams.set("mode", y), window.history.replaceState({}, "", I.toString());
    }
  }, Ye = V ?? {
    id: e,
    title: "",
    sourceType: "notes",
    sourceId: "",
    createdBy: "",
    createdAt: "",
    aiModel: "",
    status: "draft"
  }, Qt = Ye.status === "final", en = R(() => {
    window.confirm("Finalize this document? It will become read-only.") && (J({ status: "final" }), u("doc.finalize", { documentId: e, documentTitle: V?.title }));
  }, [J, u, e, V?.title]), tn = R(() => {
    J({ status: "draft" }), u("doc.unlock", { documentId: e, documentTitle: V?.title });
  }, [J, u, e, V?.title]), nn = R(() => {
    D && !m && h?.(), p?.();
  }, [D, m, h, p]);
  return {
    // Mode
    mode: d,
    handleModeChange: Xt,
    // Meta
    meta: V,
    headerMeta: Ye,
    isFinalized: Qt,
    handleFinalize: en,
    handleUnlock: tn,
    updateMeta: J,
    // Sections
    sections: F,
    updateSection: wt,
    getSectionFragment: Ue,
    // Document
    ydoc: Z,
    provider: Nt,
    synced: Y,
    demoLoaded: Mt,
    handleLoadDemo: $t,
    handleClearDocument: Dt,
    handleExport: Rt,
    // Participants
    participants: ye,
    awareness: ie,
    // Focus
    focusedSectionId: we,
    handleSectionFocus: _t,
    handleJumpToUser: At,
    // Follow
    followingUserId: ne,
    handleFollowUser: jt,
    handleStopFollow: Lt,
    // Comments
    comments: ve,
    commentSidebarOpen: he,
    commentSectionId: be,
    commentSidebarTop: Ut,
    sectionListRef: We,
    handleOpenComments: Ft,
    handleCloseComments: Pt,
    handleAddComment: zt,
    handleResolveThread: Ht,
    handleUnresolveThread: qt,
    // Items
    restItems: It,
    handleAddItem: Et,
    handleUpdateItem: Ot,
    handleRemoveItem: Bt,
    // Reviews
    sectionReviews: Ct,
    restReviewSection: St,
    // Sidebar panels
    showHistory: b,
    showMyItems: S,
    showVideoHistory: N,
    handleToggleHistory: Yt,
    handleToggleMyItems: Ne,
    handleToggleVideoHistory: Jt,
    closePanel: v,
    // Video
    showVideoCall: D,
    setShowVideoCall: A,
    handleToggleVideoCall: Zt,
    videoSessions: z,
    isVideoDocked: m,
    onDockVideo: h,
    onUndockVideo: f,
    // Responsive
    showTOC: T,
    showInlineVideo: g,
    sidebarFixed: O,
    videoSpacerRef: G,
    tocSpacerRef: te,
    videoLeft: fe,
    FIXED_TOP: ue,
    // My items
    myItems: Kt,
    handleNavigateToSection: Wt,
    // Version history
    versionHistory: ke,
    // Navigation
    handleBack: nn,
    // Identity
    idToken: L,
    // Activity
    activityPublish: u,
    // User
    displayName: s,
    color: a,
    userId: o,
    documentId: e
  };
}
function On(e) {
  return e.split(" ").map((r) => r[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function Bn(e, r = 0.2) {
  const i = e.replace("#", ""), o = parseInt(i, 16), s = Math.max(0, (o >> 16 & 255) * (1 - r)), a = Math.max(0, (o >> 8 & 255) * (1 - r)), l = Math.max(0, (o & 255) * (1 - r));
  return `rgb(${Math.round(s)}, ${Math.round(a)}, ${Math.round(l)})`;
}
function Xe(e) {
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
function Qe(e) {
  if (!e) return "";
  const r = Math.floor((Date.now() - e) / 1e3);
  return r < 5 ? "" : r < 60 ? `, ${r}s` : r < 3600 ? `, ${Math.floor(r / 60)}m` : `, ${Math.floor(r / 3600)}h`;
}
function _n(e) {
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
function Un({
  participant: e,
  sectionTitle: r,
  onJumpToUser: i,
  onFollowUser: o,
  isFollowing: s
}) {
  const [a, l] = M(!1), u = P(null), m = P(null), h = () => {
    m.current && (clearTimeout(m.current), m.current = null), l(!0);
  }, f = () => {
    m.current = setTimeout(() => l(!1), 150);
  }, p = _n(e.mode), d = e.color || "#3b82f6";
  return /* @__PURE__ */ c(
    "div",
    {
      ref: u,
      className: t("flex flex-col items-center gap-[3px] relative cursor-pointer animate-[presenceFadeIn_0.3s_ease]"),
      onMouseEnter: h,
      onMouseLeave: f,
      onClick: () => i?.(e),
      children: [
        a && /* @__PURE__ */ c(
          "div",
          {
            className: t("absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-surface-inverse text-white py-2 px-3 rounded-md text-xs whitespace-nowrap z-[100] pointer-events-auto shadow-[0_4px_12px_rgba(0,0,0,0.15)] leading-snug"),
            onMouseEnter: h,
            onMouseLeave: f,
            children: [
              /* @__PURE__ */ n("div", { className: t("font-semibold mb-0.5"), children: e.displayName }),
              /* @__PURE__ */ c("div", { className: t("text-text-tertiary text-[11px]"), children: [
                e.idle ? "away" : Xe(e.mode),
                Qe(e.lastSeen)
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
                background: `linear-gradient(135deg, ${d}, ${Bn(d, 0.2)})`,
                boxShadow: a ? `0 0 0 2px ${d}40` : "none"
              },
              children: On(e.displayName)
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
              background: e.idle ? "#fef3c7" : p.bg,
              color: e.idle ? "#92400e" : p.text
            },
            children: [
              e.idle ? "away" : Xe(e.mode),
              Qe(e.lastSeen)
            ]
          }
        ),
        s && /* @__PURE__ */ n("span", { className: t("text-[10px] font-semibold text-info-fg"), children: "following" }),
        r && /* @__PURE__ */ c("span", { className: t("text-[10px] text-neutral max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap text-center"), children: [
          "§ ",
          r
        ] })
      ]
    }
  );
}
function Vn({
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
    /* @__PURE__ */ n("div", { className: t("flex gap-2.5 items-start py-1"), children: e.filter((l, u, m) => m.findIndex((h) => (h.userId || h.clientId) === (l.userId || l.clientId)) === u).map((l) => /* @__PURE__ */ n(
      Un,
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
const et = {
  draft: { bg: "#fef3c7", text: "#92400e" },
  review: { bg: "#dbeafe", text: "#1e40af" },
  final: { bg: "#d1fae5", text: "#065f46" }
}, Fn = [
  { mode: "editor", label: "Editor" },
  { mode: "ack", label: "Review" },
  { mode: "reader", label: "Read" }
];
function Pn({
  meta: e,
  mode: r,
  onModeChange: i,
  participants: o,
  onUpdateMeta: s,
  onExport: a,
  onToggleHistory: l,
  onToggleVideoCall: u,
  onToggleVideoHistory: m,
  isCallActive: h,
  onClearDocument: f,
  onJumpToUser: p,
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
  const [A, C] = M(!1), j = et[e.status] ?? et.draft;
  return /* @__PURE__ */ c("header", { className: t("flex flex-col py-2 px-4 bg-white border-b border-border shrink-0 gap-1.5 sticky top-[53px] z-[34]"), children: [
    /* @__PURE__ */ c("div", { className: t("flex items-center justify-between"), children: [
      /* @__PURE__ */ c("div", { className: t("flex items-center gap-2.5"), children: [
        N && /* @__PURE__ */ n(
          "button",
          {
            onClick: N,
            className: t("bg-transparent border-none text-info-fg cursor-pointer text-[13px] p-0 flex items-center gap-1 font-[inherit]"),
            children: "← Documents"
          }
        ),
        /* @__PURE__ */ n(
          de,
          {
            className: t("w-auto h-auto min-w-[180px] text-base font-semibold border-transparent bg-transparent py-1 px-2"),
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
        S != null && S > 0 && /* @__PURE__ */ c("span", { className: t("inline-flex items-center gap-1 text-[11px] font-semibold py-0.5 px-2.5 rounded-full bg-surface-hover text-text-secondary"), children: [
          /* @__PURE__ */ n("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ n("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }) }),
          S
        ] })
      ] }),
      o.length > 0 && /* @__PURE__ */ n(Vn, { participants: o, sections: d, onJumpToUser: p, onFollowUser: $, followingUserId: x })
    ] }),
    /* @__PURE__ */ c("div", { className: t("flex items-center justify-between flex-wrap gap-1"), children: [
      /* @__PURE__ */ n("div", { className: t("flex gap-1"), children: Fn.map(({ mode: T, label: g }) => /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          "data-testid": `mode-btn-${T}`,
          className: t(
            "py-1.5 px-3.5 text-[13px] font-semibold border border-border-field rounded-md cursor-pointer font-[inherit]",
            r === T ? "bg-info text-white" : "bg-white text-text-primary"
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
            className: t("py-1.5 px-3 text-[13px] font-medium border border-border-field rounded-md bg-white text-text-primary cursor-pointer font-[inherit] relative"),
            onClick: w,
            children: [
              "My Items",
              b ? ` (${b})` : ""
            ]
          }
        ),
        u && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: t(
              "py-1.5 px-3 text-[13px] font-medium border rounded-md cursor-pointer font-[inherit] relative",
              h ? "bg-success-bg text-success-fg border-success-border" : "bg-white text-text-primary border-border-field"
            ),
            onClick: u,
            children: h ? "In Call" : "Call"
          }
        ),
        e.status === "final" ? /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: t("py-1.5 px-3 text-[13px] font-medium border border-success-border rounded-md bg-success-bg text-success-fg cursor-pointer font-[inherit] relative"),
            onClick: v,
            children: "Unlock"
          }
        ) : /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: t("py-1.5 px-3 text-[13px] font-medium border border-success-border rounded-md bg-success-bg text-success-fg cursor-pointer font-[inherit] relative"),
            onClick: k,
            children: "Finalize"
          }
        ),
        /* @__PURE__ */ c("div", { className: t("relative"), children: [
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: t("py-1.5 px-3 text-[13px] font-medium border border-border-field rounded-md bg-white text-text-primary cursor-pointer font-[inherit] relative tracking-wider"),
              onClick: () => C((T) => !T),
              title: "More actions",
              children: "⋯"
            }
          ),
          A && /* @__PURE__ */ c("div", { className: t("absolute top-full right-0 mt-1 bg-white border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50 min-w-[160px] overflow-hidden"), children: [
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: t("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover"),
                onClick: () => {
                  l(), C(!1);
                },
                children: "History"
              }
            ),
            m && (D ?? 0) > 0 && /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                className: t("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover"),
                onClick: () => {
                  m(), C(!1);
                },
                children: [
                  "Past Calls (",
                  D,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ n("div", { className: t("border-t border-border-subtle my-1") }),
            ["markdown", "pdf", "json"].map((T) => /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                className: t("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover"),
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
            /* @__PURE__ */ n("div", { className: t("border-t border-border-subtle my-1") }),
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: t("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-danger-fg text-left cursor-pointer font-[inherit] hover:bg-danger-bg"),
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
function zn({
  followingUserId: e,
  participants: r,
  onStopFollow: i
}) {
  const o = P(null);
  if (U(() => {
    if (!e) return;
    const a = setTimeout(() => {
      const l = () => i(), u = ["mousedown", "keydown", "wheel"];
      for (const m of u)
        window.addEventListener(m, l, { once: !0, passive: !0 });
      o.current = () => {
        for (const m of u)
          window.removeEventListener(m, l);
      };
    }, 500);
    return () => {
      clearTimeout(a), o.current?.(), o.current = null;
    };
  }, [e, i]), !e) return null;
  const s = r.find(
    (a) => (a.userId || a.clientId) === e
  );
  return s ? /* @__PURE__ */ c("div", { className: t("flex items-center justify-center gap-2 px-4 py-1.5 bg-info-bg border-b border-info-border text-[13px] font-medium text-info-fg shrink-0"), children: [
    /* @__PURE__ */ c("span", { children: [
      "Following ",
      s.displayName
    ] }),
    /* @__PURE__ */ n(
      "button",
      {
        onClick: i,
        className: t("bg-transparent border border-info-border rounded px-2 py-0.5 text-xs font-semibold text-info-fg cursor-pointer font-[inherit]"),
        children: "Stop"
      }
    )
  ] }) : null;
}
const Ae = ({
  children: e,
  variant: r = "light",
  width: i = 320,
  style: o
}) => typeof document > "u" ? null : dt(
  /* @__PURE__ */ n(
    "div",
    {
      className: t(
        "fixed right-0 top-0 h-full z-[60] flex flex-col shadow-[-4px_0_12px_rgba(0,0,0,0.08)]",
        r === "dark" ? "bg-surface-inverse" : "bg-surface"
      ),
      style: { width: i, ...o },
      children: e
    }
  ),
  document.body
), je = ({
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
}, Le = ({
  children: e,
  padding: r
}) => /* @__PURE__ */ n(
  "div",
  {
    className: "flex-1 overflow-y-auto",
    style: { padding: r ?? "14px 12px" },
    children: e
  }
), Hn = {
  default: "bg-surface text-text-primary border border-border",
  primary: "bg-success text-white border border-success",
  danger: "bg-danger text-white border border-danger"
}, qn = {
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
      Hn[e],
      qn[r],
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
function Kn({ participant: e, isSpeaking: r }) {
  const i = P(null);
  return U(() => {
    const o = i.current, s = e.streams[0] ?? null;
    o && s && o.srcObject !== s && (o.srcObject = s);
  }, [e.streams]), /* @__PURE__ */ c(
    "div",
    {
      className: t("relative bg-surface-inverse rounded-lg overflow-hidden transition-shadow duration-300", r ? "video-tile-speaking" : "video-tile-idle"),
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
          r && /* @__PURE__ */ n("span", { className: t("w-[5px] h-[5px] rounded-full bg-success") }),
          /* @__PURE__ */ n("span", { children: e.userId }),
          e.isLocal && /* @__PURE__ */ n("span", { className: t("opacity-50"), children: "(You)" })
        ] })
      ]
    }
  );
}
function Wn({ stream: e, userId: r, cameraStream: i, isLocal: o }) {
  const s = P(null), a = P(null);
  return U(() => {
    const l = s.current;
    l && l.srcObject !== e && (l.srcObject = e);
  }, [e]), U(() => {
    const l = a.current;
    l && i && l.srcObject !== i && (l.srcObject = i);
  }, [i]), /* @__PURE__ */ c("div", { className: t("relative bg-black rounded-[10px] overflow-hidden border-2 border-info aspect-video"), children: [
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
function Yn({ stageToken: e, participantId: r, userId: i, onEndCall: o }) {
  const { participants: s, isJoined: a, isScreenSharing: l, error: u, toggleMute: m, toggleCamera: h, startScreenShare: f, stopScreenShare: p, leave: d } = gn({
    stageToken: e,
    userId: i,
    participantId: r
  }), { activeSpeakerId: w } = yn({ participants: s }), [b, S] = M(!1), [N, $] = M(!1), [x, k] = M(!1), v = lt(
    () => s.map((C) => ({
      ...C,
      isSpeaking: C.participantId === w
    })),
    [s, w]
  ), D = v.find((C) => C.screenStream), A = () => {
    d(), o();
  };
  return u ? /* @__PURE__ */ c("div", { className: t("p-4 text-center text-danger-fg text-[13px]"), children: [
    u,
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
          Wn,
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
            children: v.map((C) => /* @__PURE__ */ n(Kn, { participant: C, isSpeaking: C.isSpeaking }, C.participantId))
          }
        ),
        /* @__PURE__ */ c(
          "div",
          {
            className: t("flex justify-center gap-1 px-2 py-1.5 border-t border-code-raised shrink-0 transition-opacity duration-200", x ? "opacity-100" : "opacity-0"),
            children: [
              /* @__PURE__ */ n(
                pe,
                {
                  onClick: () => {
                    S(!b), m(!b);
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
                  onClick: () => l ? p() : f(),
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
        /* @__PURE__ */ c("div", { className: t("text-center text-[10px] text-text-secondary py-1"), children: [
          s.length,
          " in call"
        ] })
      ]
    }
  ) : /* @__PURE__ */ n("div", { className: t("p-5 text-center text-text-secondary text-[13px]"), children: "Connecting to video..." });
}
function Jn({
  documentId: e,
  userId: r,
  idToken: i,
  meta: o,
  updateMeta: s,
  sendMessage: a,
  onClose: l,
  onDockToSidebar: u,
  isDocked: m,
  onUndock: h,
  onCallEnd: f
}) {
  const {
    callState: p,
    stageToken: d,
    participantId: w,
    userId: b,
    error: S,
    hasActiveCall: N,
    startCall: $,
    joinCall: x,
    endCall: k
  } = fn({ documentId: e, idToken: i, meta: o, updateMeta: s, sendMessage: a, displayName: r }), v = P(p);
  U(() => {
    v.current === "active" && p === "idle" && f?.(), v.current = p;
  }, [p, f]);
  const D = o?.activeCallSessionId;
  return /* @__PURE__ */ c("div", { className: t("bg-surface-inverse border border-code-raised rounded-xl overflow-hidden"), children: [
    /* @__PURE__ */ c("div", { className: t("flex items-center justify-between px-2 py-1 border-b border-code-raised shrink-0"), children: [
      /* @__PURE__ */ n("span", { className: t("text-[11px] font-semibold text-text-tertiary m-0"), children: "Video" }),
      /* @__PURE__ */ c("div", { className: t("flex items-center gap-0.5"), children: [
        u && !m && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: u,
            title: "Dock to sidebar",
            className: t("w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-text-tertiary cursor-pointer text-xs leading-none p-0"),
            children: "←"
          }
        ),
        m && h && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: h,
            title: "Undock from sidebar",
            className: t("w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-text-tertiary cursor-pointer text-xs leading-none p-0"),
            children: "→"
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: l,
            title: "Close video",
            className: t("w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-text-tertiary cursor-pointer text-sm leading-none p-0"),
            children: "✕"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ c("div", { children: [
      p === "active" && d && w && b && /* @__PURE__ */ n(
        Yn,
        {
          stageToken: d,
          participantId: w,
          userId: b,
          onEndCall: k
        }
      ),
      (p === "creating" || p === "joining") && /* @__PURE__ */ n("div", { className: t("p-4 text-center text-text-tertiary text-[13px]"), children: p === "creating" ? "Starting call..." : "Joining call..." }),
      p === "error" && /* @__PURE__ */ c("div", { className: t("p-4 text-center"), children: [
        /* @__PURE__ */ n("div", { className: t("text-code-red text-[13px] mb-3"), children: S }),
        /* @__PURE__ */ n(ee, { variant: "primary", onClick: () => $(), children: "Try Again" })
      ] }),
      p === "idle" && /* @__PURE__ */ n("div", { className: t("p-4 text-center"), children: N && D ? /* @__PURE__ */ c(W, { children: [
        /* @__PURE__ */ n("div", { className: t("text-[13px] text-code-subtle mb-3"), children: "A call is in progress on this document." }),
        /* @__PURE__ */ n(ee, { variant: "primary", onClick: () => x(D), children: "Join Call" })
      ] }) : /* @__PURE__ */ c(W, { children: [
        /* @__PURE__ */ n("div", { className: t("text-[13px] text-text-tertiary mb-3"), children: "Start a video call with collaborators on this document." }),
        /* @__PURE__ */ n(ee, { variant: "primary", onClick: $, children: "Start Call" })
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
function Gn(e) {
  return e.split(" ").map((r) => r[0] ?? "").join("").toUpperCase().slice(0, 2);
}
const Se = 3;
function Xn({ participants: e }) {
  if (!e || e.length === 0) return null;
  const r = e.slice(0, Se), i = e.length - Se;
  return /* @__PURE__ */ c("div", { className: t("flex items-center ml-auto shrink-0"), children: [
    r.map((o, s) => /* @__PURE__ */ c(
      "div",
      {
        title: `${o.displayName} (${o.mode})`,
        className: t("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold border-2 border-white relative transition-transform duration-200"),
        style: {
          background: `linear-gradient(135deg, ${o.color || "#3b82f6"}, ${Qn(o.color || "#3b82f6", 0.2)})`,
          marginLeft: s === 0 ? 0 : -8,
          zIndex: Se - s
        },
        children: [
          Gn(o.displayName),
          /* @__PURE__ */ n("div", { className: t("absolute bottom-0 right-0 w-2 h-2 rounded-full bg-success border-2 border-white") })
        ]
      },
      o.clientId
    )),
    i > 0 && /* @__PURE__ */ c(
      "div",
      {
        className: t("w-6 h-6 rounded-full bg-border text-neutral flex items-center justify-center text-[9px] font-bold border-2 border-white relative -ml-2"),
        children: [
          "+",
          i
        ]
      }
    )
  ] });
}
function Qn(e, r) {
  const i = e.replace("#", ""), o = parseInt(i, 16), s = Math.max(0, (o >> 16 & 255) * (1 - r)), a = Math.max(0, (o >> 8 & 255) * (1 - r)), l = Math.max(0, (o & 255) * (1 - r));
  return `rgb(${Math.round(s)}, ${Math.round(a)}, ${Math.round(l)})`;
}
function er({
  section: e,
  fragment: r,
  ydoc: i,
  provider: o,
  user: s,
  editable: a,
  onUpdateSection: l,
  onAddItem: u,
  onUpdateItem: m,
  onRemoveItem: h,
  participants: f,
  onFocus: p,
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
  }, D = wn(e.sectionType ?? e.type, "editor") ?? vn, A = f && f.length > 0, C = A ? f[0].color || "#3b82f6" : "transparent", [j, T] = M(!1);
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
      onClickCapture: p,
      onFocusCapture: p,
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
              S > 0 && /* @__PURE__ */ n("span", { className: t("absolute -top-1 -right-1 min-w-[16px] h-4 rounded-lg bg-info text-white text-[10px] font-bold flex items-center justify-center px-1 leading-none"), children: S }),
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
        /* @__PURE__ */ c("div", { className: t("flex items-center gap-2 py-2.5 px-3.5 bg-surface-panel border-b border-border rounded-t-lg"), children: [
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: v,
              className: t(
                "border-none bg-transparent cursor-pointer text-xs p-1 text-neutral leading-none rounded inline-flex items-center justify-center transition-[background,transform] duration-200 ease-in-out hover:bg-border",
                x ? "-rotate-90" : "rotate-0"
              ),
              title: x ? "Expand section" : "Collapse section",
              children: /* @__PURE__ */ n("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ n("polyline", { points: "6 9 12 15 18 9" }) })
            }
          ),
          /* @__PURE__ */ n(
            de,
            {
              value: e.title,
              onChange: (g) => l({ title: g.target.value }),
              readOnly: !a,
              className: t("flex-1 h-auto border-transparent bg-transparent text-[15px] font-semibold py-0.5 px-1.5 cursor-text")
            }
          ),
          /* @__PURE__ */ n(
            "span",
            {
              className: t("py-0.5 px-2.5 text-[11px] font-semibold rounded-xl text-white capitalize whitespace-nowrap"),
              style: { background: Zn[e.type] },
              children: e.type
            }
          ),
          /* @__PURE__ */ n(Xn, { participants: f ?? [] })
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
            onAddItem: u,
            onUpdateItem: m,
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
function tr({
  sections: e,
  getSectionFragment: r,
  ydoc: i,
  provider: o,
  user: s,
  editable: a,
  onUpdateSection: l,
  onAddItem: u,
  onUpdateItem: m,
  onRemoveItem: h,
  participants: f,
  onSectionFocus: p,
  focusedSectionId: d,
  comments: w,
  onAddComment: b,
  onResolveThread: S,
  onUnresolveThread: N,
  onUpdateCursorInfo: $,
  onOpenComments: x
}) {
  return /* @__PURE__ */ n("div", { className: t("flex flex-col gap-0 pb-4"), children: e.map((k) => /* @__PURE__ */ n(
    er,
    {
      section: k,
      fragment: r(k.id),
      ydoc: i,
      provider: o,
      user: s,
      editable: a,
      onUpdateSection: (v) => l(k.id, v),
      onAddItem: (v) => u(k.id, v),
      onUpdateItem: (v, D) => m(k.id, v, D),
      onRemoveItem: (v) => h(k.id, v),
      participants: f?.filter((v) => v.currentSectionId === k.id),
      onFocus: () => p?.(k.id),
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
function pt(e) {
  return `ws_attachments_${e}`;
}
function le(e) {
  try {
    const r = localStorage.getItem(pt(e));
    return r ? JSON.parse(r) : [];
  } catch {
    return [];
  }
}
function nr(e) {
  const [r, i] = M(
    () => le(e)
  );
  U(() => {
    i(le(e));
  }, [e]);
  const o = (u) => {
    localStorage.setItem(pt(e), JSON.stringify(u)), i(u);
  };
  return { attachments: r, addFile: (u, m) => {
    o([
      ...le(e),
      { id: crypto.randomUUID(), kind: "file", name: u.trim(), url: m.trim(), addedAt: (/* @__PURE__ */ new Date()).toISOString() }
    ]);
  }, addDocumentLink: (u) => {
    o([
      ...le(e),
      { id: crypto.randomUUID(), kind: "document", title: u.trim(), addedAt: (/* @__PURE__ */ new Date()).toISOString() }
    ]);
  }, remove: (u) => {
    o(le(e).filter((m) => m.id !== u));
  } };
}
function rr({ onAdd: e, onCancel: r }) {
  const [i, o] = M(""), [s, a] = M(""), l = i.trim().length > 0 && s.trim().length > 0;
  return /* @__PURE__ */ c("div", { className: t("flex gap-2 items-start flex-wrap"), children: [
    /* @__PURE__ */ n(
      de,
      {
        autoFocus: !0,
        placeholder: "File name",
        value: i,
        onChange: (u) => o(u.target.value),
        className: t("flex-1 min-w-[120px]")
      }
    ),
    /* @__PURE__ */ n(
      de,
      {
        placeholder: "URL or path",
        value: s,
        onChange: (u) => a(u.target.value),
        onKeyDown: (u) => {
          u.key === "Enter" && l && e(i, s);
        },
        className: t("flex-[2] min-w-[120px]")
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
    /* @__PURE__ */ n("button", { type: "button", onClick: r, className: t("px-3 py-1.5 text-[13px] bg-transparent border-none text-neutral cursor-pointer font-[inherit] shrink-0"), children: "Cancel" })
  ] });
}
function or({ onAdd: e, onCancel: r }) {
  const [i, o] = M(""), s = i.trim().length > 0;
  return /* @__PURE__ */ c("div", { className: t("flex gap-2 items-center flex-wrap"), children: [
    /* @__PURE__ */ n(
      de,
      {
        autoFocus: !0,
        placeholder: "Document name",
        value: i,
        onChange: (a) => o(a.target.value),
        onKeyDown: (a) => {
          a.key === "Enter" && s && e(i);
        },
        className: t("flex-1 min-w-[120px]")
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
    /* @__PURE__ */ n("button", { type: "button", onClick: r, className: t("px-3 py-1.5 text-[13px] bg-transparent border-none text-neutral cursor-pointer font-[inherit] shrink-0"), children: "Cancel" })
  ] });
}
function sr({ attachment: e, onRemove: r, editable: i }) {
  const o = e.kind === "file";
  return /* @__PURE__ */ c("div", { className: t("flex items-center gap-2.5 px-2.5 py-[7px] rounded-md bg-surface-panel border border-border"), children: [
    /* @__PURE__ */ n("span", { className: t("text-sm shrink-0 text-neutral"), children: o ? "📎" : "📄" }),
    /* @__PURE__ */ c("div", { className: t("flex-1 min-w-0"), children: [
      o ? /* @__PURE__ */ n(
        "a",
        {
          href: e.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: t("text-[13px] text-info-fg font-medium no-underline hover:underline"),
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
        className: t("bg-transparent border-none cursor-pointer text-danger-fg text-sm px-[5px] py-0.5 opacity-50 leading-none rounded shrink-0 hover:opacity-100"),
        children: "×"
      }
    )
  ] });
}
function ir({ documentId: e, editable: r }) {
  const { attachments: i, addFile: o, addDocumentLink: s, remove: a } = nr(e), [l, u] = M(null), m = i.length > 0;
  return /* @__PURE__ */ c("div", { className: t("mt-4 border border-border rounded-[10px] overflow-hidden"), children: [
    /* @__PURE__ */ c("div", { className: t(
      "flex items-center justify-between px-3.5 py-2.5 bg-surface-panel",
      m || l ? "border-b border-border" : ""
    ), children: [
      /* @__PURE__ */ c("span", { className: t("text-[13px] font-semibold text-text-primary"), children: [
        "Attachments",
        m && /* @__PURE__ */ n("span", { className: t("ml-1.5 text-[11px] text-text-tertiary font-normal"), children: i.length })
      ] }),
      r && l === null && /* @__PURE__ */ c("div", { className: t("flex gap-1.5"), children: [
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: () => u("file"),
            className: t("text-xs px-2.5 py-1 font-semibold bg-white border border-border-field rounded-[5px] cursor-pointer font-[inherit] text-text-primary"),
            children: "+ File"
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: () => u("document"),
            className: t("text-xs px-2.5 py-1 font-semibold bg-white border border-border-field rounded-[5px] cursor-pointer font-[inherit] text-text-primary"),
            children: "+ Document"
          }
        )
      ] })
    ] }),
    m && /* @__PURE__ */ n("div", { className: t("flex flex-col gap-1.5 px-3.5 py-2.5"), children: i.map((h) => /* @__PURE__ */ n(
      sr,
      {
        attachment: h,
        onRemove: () => a(h.id),
        editable: r
      },
      h.id
    )) }),
    l === "file" && /* @__PURE__ */ n("div", { className: t("px-3.5 py-2.5", m ? "border-t border-border" : ""), children: /* @__PURE__ */ n(
      rr,
      {
        onAdd: (h, f) => {
          o(h, f), u(null);
        },
        onCancel: () => u(null)
      }
    ) }),
    l === "document" && /* @__PURE__ */ n("div", { className: t("px-3.5 py-2.5", m ? "border-t border-border" : ""), children: /* @__PURE__ */ n(
      or,
      {
        onAdd: (h) => {
          s(h), u(null);
        },
        onCancel: () => u(null)
      }
    ) }),
    !m && !l && /* @__PURE__ */ n("div", { className: t("px-3.5 py-3.5 text-xs text-text-tertiary text-center"), children: r ? "No attachments yet — add a file or link a document above." : "No attachments." })
  ] });
}
function ar(e) {
  const r = e.trim().split(/\s+/);
  return r.length === 0 ? "?" : r.length === 1 ? r[0].charAt(0).toUpperCase() : (r[0].charAt(0) + r[r.length - 1].charAt(0)).toUpperCase();
}
const ft = rn(
  function({ query: r, users: i, position: o, onSelect: s, onDismiss: a }, l) {
    const [u, m] = M(0), h = P(null), f = i.filter(
      (d) => d.displayName.toLowerCase().includes(r.toLowerCase())
    ).slice(0, 6);
    U(() => {
      m(0);
    }, [r]), U(() => {
      const d = h.current;
      if (!d) return;
      const w = d.children[u];
      w && w.scrollIntoView({ block: "nearest" });
    }, [u]);
    const p = R(
      (d) => d.key === "ArrowDown" ? (d.preventDefault(), m((w) => (w + 1) % Math.max(f.length, 1)), !0) : d.key === "ArrowUp" ? (d.preventDefault(), m((w) => (w - 1 + Math.max(f.length, 1)) % Math.max(f.length, 1)), !0) : d.key === "Enter" || d.key === "Tab" ? (d.preventDefault(), f.length > 0 && s(f[u]), !0) : d.key === "Escape" ? (d.preventDefault(), a(), !0) : !1,
      [f, u, s, a]
    );
    return on(l, () => ({ handleKeyDown: p }), [p]), sn.createPortal(
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
              "aria-selected": w === u,
              className: t(
                "flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors duration-100",
                w === u ? "bg-info-bg" : "bg-transparent"
              ),
              onMouseEnter: () => m(w),
              onMouseDown: (b) => {
                b.preventDefault(), s(d);
              },
              children: [
                /* @__PURE__ */ n(
                  "div",
                  {
                    className: t("w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[11px] font-semibold text-white leading-none"),
                    style: { background: d.color },
                    children: d.type === "group" ? "#" : ar(d.displayName)
                  }
                ),
                /* @__PURE__ */ c("div", { className: t("flex items-center gap-1.5 flex-1 min-w-0"), children: [
                  /* @__PURE__ */ n("span", { className: t("text-[13px] font-medium text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"), children: d.type === "group" ? `@${d.displayName.toLowerCase()}` : d.displayName }),
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
function lr(e) {
  return e.split(" ").map((r) => r[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function Te(e) {
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
function xt(e) {
  let r = 0;
  for (const i of e)
    r += 1 + xt(i.replies);
  return r;
}
function dr(e) {
  return e.split(/(@[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)*)/g).map(
    (i, o) => i.startsWith("@") && /^@[A-Z]/.test(i) ? /* @__PURE__ */ n(
      "span",
      {
        className: t("text-info-fg font-semibold bg-info-bg px-0.5 rounded-sm"),
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
function ht(e, r, i) {
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
function bt(e, r, i) {
  const o = e.slice(0, r.atIndex), s = e.slice(r.atIndex + 1 + r.query.length), a = `@${i.displayName} `;
  return {
    newValue: o + a + s,
    newCursor: o.length + a.length
  };
}
function gt({
  comment: e,
  depth: r,
  onReply: i,
  mentionUsers: o,
  onResolveThread: s,
  onUnresolveThread: a
}) {
  const [l, u] = M(!1), [m, h] = M(""), [f, p] = M(!1), d = P(null), w = P(null), [b, S] = M(K), [N, $] = M(!1), x = r === 0 && !!e.resolved, k = Math.min(r, 5), v = () => {
    if (b.active) return;
    const T = m.trim();
    T && (i(e.id, T), h(""), u(!1), S(K));
  }, D = (T) => {
    const g = T.target.value;
    h(g);
    const O = T.target.selectionStart ?? g.length, q = ht(g, O, d.current);
    S(q);
  }, A = R(
    (T) => {
      const { newValue: g, newCursor: O } = bt(m, b, T);
      h(g), S(K), requestAnimationFrame(() => {
        const q = d.current;
        q && (q.focus(), q.setSelectionRange(O, O));
      });
    },
    [m, b]
  ), C = (T) => {
    b.active && w.current && w.current.handleKeyDown(T) || (T.key === "Enter" && !T.shiftKey && (T.preventDefault(), v()), T.key === "Escape" && u(!1));
  }, j = f ? e.color : r === 0 ? "#e2e8f0" : "#cbd5e1";
  return x && !N ? /* @__PURE__ */ n("div", { className: t(k > 0 ? "ml-5" : "ml-0"), children: /* @__PURE__ */ c(
    "div",
    {
      className: t("bg-success-bg border-l-[3px] border-l-[#22c55e] px-3 py-2 mb-1 rounded cursor-pointer flex items-center justify-between"),
      onClick: () => $(!0),
      children: [
        /* @__PURE__ */ c("div", { className: t("flex items-center gap-1.5"), children: [
          /* @__PURE__ */ n("span", { className: t("text-success-fg text-xs"), children: "✔" }),
          /* @__PURE__ */ c("span", { className: t("text-success-fg text-xs font-semibold"), children: [
            "Resolved by ",
            e.resolvedBy
          ] }),
          e.resolvedAt && /* @__PURE__ */ n("span", { className: t("text-code-green text-[11px]"), children: Te(e.resolvedAt) }),
          /* @__PURE__ */ n("span", { className: t("text-text-tertiary text-[11px] ml-1"), children: "— click to expand" })
        ] }),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: (T) => {
              T.stopPropagation(), a?.(e.id);
            },
            className: t("bg-transparent border border-border-emphasis rounded px-2 py-0.5 text-neutral text-[11px] cursor-pointer font-[inherit]"),
            children: "Reopen"
          }
        )
      ]
    }
  ) }) : /* @__PURE__ */ c("div", { className: t(k > 0 ? "ml-5" : "ml-0", x ? "opacity-60" : ""), children: [
    x && N && /* @__PURE__ */ c(
      "div",
      {
        className: t("bg-success-bg border-l-[3px] border-l-[#22c55e] px-3 py-2 mb-1 rounded cursor-pointer flex items-center justify-between"),
        onClick: () => $(!1),
        children: [
          /* @__PURE__ */ c("div", { className: t("flex items-center gap-1.5"), children: [
            /* @__PURE__ */ n("span", { className: t("text-success-fg text-xs"), children: "✔" }),
            /* @__PURE__ */ c("span", { className: t("text-success-fg text-xs font-semibold"), children: [
              "Resolved by ",
              e.resolvedBy
            ] }),
            e.resolvedAt && /* @__PURE__ */ n("span", { className: t("text-code-green text-[11px]"), children: Te(e.resolvedAt) }),
            /* @__PURE__ */ n("span", { className: t("text-text-tertiary text-[11px] ml-1"), children: "— click to collapse" })
          ] }),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: (T) => {
                T.stopPropagation(), a?.(e.id);
              },
              className: t("bg-transparent border border-border-emphasis rounded px-2 py-0.5 text-neutral text-[11px] cursor-pointer font-[inherit]"),
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
        onMouseEnter: () => p(!0),
        onMouseLeave: () => p(!1),
        children: [
          /* @__PURE__ */ c("div", { className: t("flex items-center gap-1.5 mb-1"), children: [
            /* @__PURE__ */ n(
              "div",
              {
                className: t("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold shrink-0"),
                style: { background: `linear-gradient(135deg, ${e.color}, ${e.color}dd)` },
                children: lr(e.displayName)
              }
            ),
            /* @__PURE__ */ n("span", { className: t("font-semibold text-[13px] text-text-primary"), children: e.displayName }),
            /* @__PURE__ */ n("span", { className: t("text-[11px] text-text-tertiary"), children: Te(e.timestamp) })
          ] }),
          /* @__PURE__ */ n("div", { className: t("text-[13px] leading-normal text-text-primary pl-[30px] whitespace-pre-wrap"), children: dr(e.text) }),
          /* @__PURE__ */ c("div", { className: t("pl-[30px] mt-1 flex gap-2"), children: [
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                onClick: () => {
                  u(!l), l || setTimeout(() => d.current?.focus(), 50);
                },
                className: t("bg-transparent border-none text-neutral text-xs cursor-pointer py-0.5 px-0 font-[inherit]"),
                children: "Reply"
              }
            ),
            r === 0 && !x && s && /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                onClick: () => s(e.id),
                className: t("bg-transparent border-none text-neutral text-xs cursor-pointer py-0.5 px-0 font-[inherit]"),
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
                ct,
                {
                  ref: d,
                  value: m,
                  onChange: D,
                  onKeyDown: C,
                  placeholder: "Write a reply... (type @ to mention)",
                  rows: 2,
                  className: t("resize-y min-h-12")
                }
              ),
              b.active && /* @__PURE__ */ n(
                ft,
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
                  className: t("px-3 py-1 text-xs font-semibold border-none rounded-md bg-info text-white cursor-pointer font-[inherit]"),
                  children: "Reply"
                }
              ),
              /* @__PURE__ */ n(
                "button",
                {
                  type: "button",
                  onClick: () => u(!1),
                  className: t("px-3 py-1 text-xs font-medium border border-border rounded-md bg-transparent text-neutral cursor-pointer font-[inherit]"),
                  children: "Cancel"
                }
              )
            ] })
          ] })
        ]
      }
    ),
    e.replies.map((T) => /* @__PURE__ */ n(
      gt,
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
function yt({
  comments: e,
  onAddComment: r,
  participants: i = [],
  onResolveThread: o,
  onUnresolveThread: s
}) {
  const [a, l] = M(!0), [u, m] = M(""), h = P(null), f = P(null), [p, d] = M(K), w = xn(i), b = xt(e), [S, N] = M(!0), $ = [...e].sort((C, j) => {
    if (C.resolved && !j.resolved) return 1;
    if (!C.resolved && j.resolved) return -1;
    const T = new Date(C.timestamp).getTime(), g = new Date(j.timestamp).getTime();
    return S ? g - T : T - g;
  }), x = () => {
    if (p.active) return;
    const C = u.trim();
    C && (r(C, null), m(""), d(K));
  }, k = (C) => {
    const j = C.target.value;
    m(j);
    const T = C.target.selectionStart ?? j.length, g = ht(j, T, h.current);
    d(g);
  }, v = R(
    (C) => {
      const { newValue: j, newCursor: T } = bt(u, p, C);
      m(j), d(K), requestAnimationFrame(() => {
        const g = h.current;
        g && (g.focus(), g.setSelectionRange(T, T));
      });
    },
    [u, p]
  ), D = (C) => {
    p.active && f.current && f.current.handleKeyDown(C) || C.key === "Enter" && !C.shiftKey && (C.preventDefault(), x());
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
          b > 0 ? "bg-info-bg text-info-fg" : "bg-transparent text-neutral"
        ),
        children: [
          a ? "▼" : "▶",
          " Comments",
          b > 0 ? ` (${b})` : ""
        ]
      }
    ),
    a && /* @__PURE__ */ c("div", { className: t("mt-2 border border-border rounded-lg bg-surface-panel overflow-hidden animate-[sectionCommentsSlideDown_0.2s_ease-out]"), children: [
      /* @__PURE__ */ c("div", { className: t("flex items-start gap-1.5 px-3 py-2.5 border-b border-border bg-white"), children: [
        /* @__PURE__ */ c("div", { className: t("flex-1 relative"), children: [
          /* @__PURE__ */ n(
            ct,
            {
              ref: h,
              value: u,
              onChange: k,
              onKeyDown: D,
              placeholder: "Add a comment... (type @ to mention)",
              rows: 2,
              className: t("resize-y min-h-12")
            }
          ),
          p.active && /* @__PURE__ */ n(
            ft,
            {
              ref: f,
              query: p.query,
              users: w,
              position: p.position,
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
            className: t("px-3.5 py-1.5 text-xs font-semibold border-none rounded-md bg-info text-white cursor-pointer font-[inherit] whitespace-nowrap self-end"),
            children: "Post"
          }
        )
      ] }),
      e.length > 1 && /* @__PURE__ */ n("div", { className: t("flex justify-end px-3 pt-1 border-b border-border-subtle"), children: /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          onClick: () => N((C) => !C),
          className: t("bg-transparent border-none cursor-pointer text-[11px] text-neutral px-1.5 py-0.5 font-[inherit]"),
          children: S ? "↓ Newest first" : "↑ Oldest first"
        }
      ) }),
      /* @__PURE__ */ c("div", { className: t("max-h-[420px] overflow-y-auto px-3 py-2"), children: [
        e.length === 0 && /* @__PURE__ */ n("div", { className: t("p-3 text-center text-text-tertiary text-xs"), children: "No comments yet. Start the discussion!" }),
        $.map((C) => /* @__PURE__ */ n(
          gt,
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
const tt = {
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
function cr({
  sections: e,
  participants: r,
  userId: i,
  getSectionFragment: o,
  ydoc: s,
  provider: a,
  sectionReviews: l,
  reviewSection: u,
  comments: m,
  onAddComment: h,
  onResolveThread: f,
  onUnresolveThread: p,
  onSectionFocus: d
}) {
  const [w, b] = M({}), S = e.filter((x) => (l[x.id] ?? []).some((v) => v.userId === i)).length, N = /* @__PURE__ */ new Map();
  for (const x of e)
    for (const k of l[x.id] ?? []) {
      const v = N.get(k.userId) ?? { displayName: k.displayName, statuses: [] };
      v.statuses.push(k.status), N.set(k.userId, v);
    }
  const $ = e.length > 0 ? Math.round(S / e.length * 100) : 0;
  return e.length === 0 ? /* @__PURE__ */ n("div", { className: t("text-center p-12 text-text-secondary text-[15px]"), children: "No sections to review." }) : /* @__PURE__ */ c("div", { "data-testid": "review-mode", className: t("max-w-[800px] mx-auto"), children: [
    /* @__PURE__ */ c("div", { "data-testid": "review-progress", className: t("mb-6"), children: [
      /* @__PURE__ */ c("div", { className: t("text-[13px] text-text-secondary mb-1 flex justify-between"), children: [
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
      /* @__PURE__ */ n("div", { className: t("h-2 bg-surface-emphasis rounded overflow-hidden"), children: /* @__PURE__ */ n(
        "div",
        {
          className: t("h-full rounded transition-[width] duration-300 ease-in-out", S === e.length ? "bg-success" : "bg-info"),
          style: { width: `${$}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ n("div", { className: t("flex flex-col gap-6"), children: e.map((x) => {
      const k = o(x.id), v = tt[x.type] ?? tt.custom, D = l[x.id] ?? [], A = D.find((g) => g.userId === i), C = D.filter((g) => g.userId !== i), j = r.filter((g) => g.currentSectionId === x.id), T = w[x.id] ?? !1;
      return /* @__PURE__ */ c(
        "div",
        {
          id: `section-${x.id}`,
          "data-testid": `review-section-${x.id}`,
          className: t("bg-white border border-border rounded-lg p-5"),
          style: {
            borderLeft: A ? `3px solid ${re[A.status].color}` : "3px solid #d1d5db"
          },
          onMouseEnter: () => d?.(x.id),
          children: [
            /* @__PURE__ */ c("div", { className: t("flex items-center gap-2 mb-1"), children: [
              /* @__PURE__ */ n("h3", { className: t("text-lg font-bold m-0 text-text-primary flex-1"), children: x.title }),
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
              Re,
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
              return /* @__PURE__ */ c("div", { className: t("flex items-start gap-2 py-1.5 border-b border-border-subtle text-sm"), children: [
                /* @__PURE__ */ n(
                  "span",
                  {
                    className: t("inline-block w-2 h-2 rounded-full mt-[5px] shrink-0"),
                    style: { background: O }
                  }
                ),
                /* @__PURE__ */ c("div", { className: t("flex-1"), children: [
                  /* @__PURE__ */ n("span", { className: t("text-text-primary"), children: g.text }),
                  g.assignee && /* @__PURE__ */ c("span", { className: t("text-text-secondary text-xs ml-2"), children: [
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
            /* @__PURE__ */ c("div", { className: t("flex items-center gap-2 pt-2.5 pb-1 border-t border-border-subtle flex-wrap"), children: [
              !A || T ? /* @__PURE__ */ c(W, { children: [
                /* @__PURE__ */ n(
                  Ie,
                  {
                    testid: `section-${x.id}-review-reviewed`,
                    label: "Mark Reviewed",
                    bg: "#f3f4f6",
                    color: "#374151",
                    hoverBg: "#e5e7eb",
                    onClick: () => {
                      u(x.id, "reviewed"), b((g) => ({ ...g, [x.id]: !1 }));
                    }
                  }
                ),
                /* @__PURE__ */ n(
                  Ie,
                  {
                    testid: `section-${x.id}-review-approved`,
                    label: "Approve",
                    bg: "#dcfce7",
                    color: "#166534",
                    hoverBg: "#bbf7d0",
                    onClick: () => {
                      u(x.id, "approved"), b((g) => ({ ...g, [x.id]: !1 }));
                    }
                  }
                ),
                /* @__PURE__ */ n(
                  Ie,
                  {
                    testid: `section-${x.id}-review-changes-requested`,
                    label: "Request Changes",
                    bg: "#fef3c7",
                    color: "#92400e",
                    hoverBg: "#fde68a",
                    onClick: () => {
                      u(x.id, "changes_requested"), b((g) => ({ ...g, [x.id]: !1 }));
                    }
                  }
                ),
                T && /* @__PURE__ */ n(
                  "button",
                  {
                    "data-testid": `section-${x.id}-cancel-change`,
                    onClick: () => b((g) => ({ ...g, [x.id]: !1 })),
                    className: t("bg-transparent border-none text-text-secondary text-xs cursor-pointer underline"),
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
                /* @__PURE__ */ c("span", { className: t("text-xs text-text-secondary"), children: [
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
                    className: t("bg-transparent border-none text-info-fg text-xs cursor-pointer underline p-0"),
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
              yt,
              {
                comments: m?.[x.id] ?? [],
                onAddComment: (g, O) => h(x.id, g, O),
                participants: r,
                onResolveThread: f ? (g) => f(x.id, g) : void 0,
                onUnresolveThread: p ? (g) => p(x.id, g) : void 0
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
        className: t("mt-8 p-4 px-5 bg-surface-panel border border-border rounded-lg"),
        children: [
          /* @__PURE__ */ n("h4", { className: t("m-0 mb-3 text-sm font-bold text-text-secondary"), children: "Document Review Summary" }),
          /* @__PURE__ */ n("div", { className: t("flex flex-col gap-2"), children: Array.from(N.entries()).map(([x, k]) => {
            const v = k.statuses.filter((C) => C === "approved").length, D = k.statuses.filter((C) => C === "changes_requested").length, A = k.statuses.filter((C) => C === "reviewed").length;
            return /* @__PURE__ */ c("div", { className: t("flex items-center gap-2.5 text-[13px]"), children: [
              /* @__PURE__ */ c("span", { className: t("font-semibold text-text-primary min-w-[100px]"), children: [
                k.displayName,
                x === i ? " (you)" : ""
              ] }),
              /* @__PURE__ */ c("span", { className: t("text-text-secondary"), children: [
                k.statuses.length,
                " of ",
                e.length,
                " sections"
              ] }),
              v > 0 && /* @__PURE__ */ c("span", { className: t("text-[11px] px-2 py-px rounded bg-success-bg text-success-fg font-semibold"), children: [
                v,
                " approved"
              ] }),
              A > 0 && /* @__PURE__ */ c("span", { className: t("text-[11px] px-2 py-px rounded bg-surface-hover text-text-primary font-semibold"), children: [
                A,
                " reviewed"
              ] }),
              D > 0 && /* @__PURE__ */ c("span", { className: t("text-[11px] px-2 py-px rounded bg-warning-bg text-warning-fg font-semibold"), children: [
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
function Ie({ label: e, bg: r, color: i, hoverBg: o, onClick: s, testid: a }) {
  const [l, u] = M(!1);
  return /* @__PURE__ */ n(
    "button",
    {
      "data-testid": a,
      onClick: s,
      onMouseEnter: () => u(!0),
      onMouseLeave: () => u(!1),
      className: t("py-1.5 px-3.5 text-[13px] font-semibold border border-transparent rounded-md cursor-pointer transition-colors duration-150"),
      style: { background: l ? o : r, color: i },
      children: e
    }
  );
}
const nt = {
  draft: { bg: "#fef3c7", text: "#92400e" },
  review: { bg: "#dbeafe", text: "#1e40af" },
  final: { bg: "#d1fae5", text: "#065f46" }
};
function ur(e) {
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
function mr(e) {
  const r = [], i = [], o = [];
  for (const s of e)
    s.status === "rejected" ? o.push(s) : s.status === "acked" || s.status === "done" ? i.push(s) : r.push(s);
  return { pending: r, completed: i, rejected: o };
}
function pr(e, r) {
  const { pending: i, completed: o, rejected: s } = mr(e), a = e.length, l = [];
  if (a > 0) {
    const h = Math.round(o.length / a * 100);
    l.push(
      `${a} action item${a !== 1 ? "s" : ""} identified, ${o.length} completed (${h}%).`
    );
  } else
    l.push("No action items recorded yet.");
  const m = r.filter((h) => h.type === "decisions").flatMap((h) => h.items);
  if (m.length > 0) {
    const h = m.filter(
      (f) => f.status === "acked" || f.status === "done"
    ).length;
    l.push(
      `${m.length} key decision${m.length !== 1 ? "s" : ""} recorded${h > 0 ? `, ${h} finalized` : ""}.`
    );
  }
  return i.length > 0 && l.push(
    `${i.length} item${i.length !== 1 ? "s" : ""} still pending review.`
  ), s.length > 0 && l.push(
    `${s.length} item${s.length !== 1 ? "s" : ""} rejected and need${s.length === 1 ? "s" : ""} revision.`
  ), l;
}
function fr({
  meta: e,
  participantCount: r
}) {
  const i = nt[e.status] ?? nt.draft;
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
        /* @__PURE__ */ c("div", { className: t("text-xs text-neutral"), children: [
          e.createdBy && /* @__PURE__ */ c(W, { children: [
            "Created by ",
            e.createdByName || e.createdBy
          ] }),
          e.createdAt && /* @__PURE__ */ c(W, { children: [
            " · ",
            ur(e.createdAt)
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
function xr({
  bullets: e,
  contentText: r,
  fragment: i,
  ydoc: o,
  provider: s
}) {
  const a = i && o, l = r && r.trim().length > 0;
  return /* @__PURE__ */ c("div", { className: t("bg-white border border-border rounded-lg p-4 mb-4"), children: [
    /* @__PURE__ */ n("h2", { className: t("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"), children: "Executive Summary" }),
    a ? /* @__PURE__ */ n("div", { className: t(
      "py-1 px-3 bg-surface-panel rounded-md border-l-[3px] border-l-[#8b5cf6]",
      e.length > 0 ? "mb-3" : ""
    ), children: /* @__PURE__ */ n(
      Re,
      {
        fragment: i,
        ydoc: o,
        provider: s ?? null,
        user: { name: "", color: "" },
        editable: !1
      }
    ) }) : l ? /* @__PURE__ */ n("div", { className: t(
      "text-sm text-text-primary leading-relaxed whitespace-pre-wrap py-2 px-3 bg-surface-panel rounded-md border-l-[3px] border-l-[#8b5cf6]",
      e.length > 0 ? "mb-3" : ""
    ), children: r.trim() }) : null,
    /* @__PURE__ */ n("ul", { className: t("m-0 pl-[18px] text-[13px] text-text-primary leading-relaxed"), children: e.map((u, m) => /* @__PURE__ */ n("li", { children: u }, m)) })
  ] });
}
const oe = {
  pending: "#f59e0b",
  done: "#10b981",
  rejected: "#ef4444"
}, rt = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#6b7280"
};
function vt(e) {
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
function hr(e) {
  const r = [], i = [], o = [];
  for (const s of e)
    s.status === "rejected" ? o.push(s) : s.status === "acked" || s.status === "done" ? i.push(s) : r.push(s);
  return { pending: r, completed: i, rejected: o };
}
function Me({
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
        className: t("bg-transparent border-none cursor-pointer flex items-center gap-1.5 py-1 px-0 text-[13px] font-semibold text-text-primary font-[inherit] w-full"),
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
function $e({
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
              r === "completed" ? "line-through text-text-tertiary" : "text-text-primary"
            ),
            children: e.text
          }
        ) }),
        e.priority && /* @__PURE__ */ n(
          "span",
          {
            className: t("text-[10px] font-semibold px-1.5 py-px rounded-full uppercase shrink-0"),
            style: { background: `${rt[e.priority]}18`, color: rt[e.priority] },
            children: e.priority
          }
        ),
        e.ackedBy && /* @__PURE__ */ n("span", { className: t("text-[11px] text-text-tertiary shrink-0"), children: e.ackedBy })
      ]
    }
  );
}
function br({ sections: e }) {
  const i = e.filter((o) => o.type === "decisions").flatMap((o) => o.items);
  return /* @__PURE__ */ c("div", { className: t("bg-white border border-border rounded-lg p-4 mb-4"), children: [
    /* @__PURE__ */ n("h2", { className: t("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"), children: "Key Decisions" }),
    i.length === 0 ? /* @__PURE__ */ n("div", { className: t("text-[13px] text-text-tertiary italic"), children: "No decisions recorded" }) : /* @__PURE__ */ n("div", { className: t("flex flex-col gap-1.5"), children: i.map((o) => /* @__PURE__ */ c(
      "div",
      {
        className: t("flex items-start gap-2 text-[13px] text-text-primary"),
        children: [
          /* @__PURE__ */ n("span", { className: t("shrink-0"), children: vt(o.status) }),
          /* @__PURE__ */ n("span", { children: o.text })
        ]
      },
      o.id
    )) })
  ] });
}
function gr({ allItems: e }) {
  const { pending: r, completed: i, rejected: o } = hr(e);
  return /* @__PURE__ */ c("div", { className: t("bg-white border border-border rounded-lg p-4 mb-4"), children: [
    /* @__PURE__ */ n("h2", { className: t("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"), children: "Action Items" }),
    e.length === 0 ? /* @__PURE__ */ n("div", { className: t("text-[13px] text-text-tertiary italic"), children: "No action items yet" }) : /* @__PURE__ */ c(W, { children: [
      r.length > 0 && /* @__PURE__ */ n(
        Me,
        {
          label: "Pending",
          count: r.length,
          color: oe.pending,
          defaultOpen: !0,
          children: r.map((s) => /* @__PURE__ */ n($e, { item: s, variant: "pending" }, s.id))
        }
      ),
      i.length > 0 && /* @__PURE__ */ n(
        Me,
        {
          label: "Completed",
          count: i.length,
          color: oe.done,
          defaultOpen: !1,
          children: i.map((s) => /* @__PURE__ */ n($e, { item: s, variant: "completed" }, s.id))
        }
      ),
      o.length > 0 && /* @__PURE__ */ n(
        Me,
        {
          label: "Rejected",
          count: o.length,
          color: oe.rejected,
          defaultOpen: !1,
          children: o.map((s) => /* @__PURE__ */ n($e, { item: s, variant: "rejected" }, s.id))
        }
      )
    ] })
  ] });
}
function yr({
  sections: e,
  commentCounts: r,
  sectionContentTexts: i,
  comments: o,
  getSectionFragment: s,
  ydoc: a,
  provider: l
}) {
  const [u, m] = M({}), h = (p) => m((d) => ({ ...d, [p]: !d[p] })), f = {
    summary: { bg: "#e0e7ff", text: "#4338ca" },
    tasks: { bg: "#dbeafe", text: "#1e40af" },
    decisions: { bg: "#fce7f3", text: "#9d174d" },
    notes: { bg: "#f0fdf4", text: "#166534" },
    custom: { bg: "#f3f4f6", text: "#6b7280" }
  };
  return /* @__PURE__ */ c("div", { className: t("bg-white border border-border rounded-lg p-4 mb-4"), children: [
    /* @__PURE__ */ n("h2", { className: t("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"), children: "Section Summaries" }),
    e.length === 0 ? /* @__PURE__ */ n("div", { className: t("text-[13px] text-text-tertiary italic"), children: "No sections" }) : /* @__PURE__ */ n("div", { className: t("flex flex-col gap-0.5"), children: e.map((p) => {
      const d = p.items.filter(
        (v) => v.status === "acked" || v.status === "done"
      ).length, w = p.items.length, b = r?.[p.id] ?? 0, S = i?.[p.id] ?? "", N = o?.[p.id] ?? [], $ = !!u[p.id], x = S.trim().length > 0, k = f[p.type] ?? f.custom;
      return /* @__PURE__ */ c(
        "div",
        {
          id: `section-${p.id}`,
          "data-testid": `reader-section-${p.id}`,
          children: [
            /* @__PURE__ */ c(
              "button",
              {
                onClick: () => h(p.id),
                className: t(
                  "border-none cursor-pointer flex items-center gap-2 py-2 px-1.5 rounded-md w-full font-[inherit] text-[13px] text-text-primary transition-colors duration-100",
                  $ ? "bg-surface-panel" : "bg-transparent"
                ),
                children: [
                  /* @__PURE__ */ n(
                    "span",
                    {
                      className: t("text-[10px] transition-transform duration-150 ease-in-out shrink-0", $ ? "rotate-90" : "rotate-0"),
                      children: "▶"
                    }
                  ),
                  /* @__PURE__ */ n("span", { className: t("font-semibold flex-1 text-left"), children: p.title }),
                  /* @__PURE__ */ n(
                    "span",
                    {
                      className: t("text-[10px] font-semibold px-2 py-px rounded-full capitalize shrink-0"),
                      style: { background: k.bg, color: k.text },
                      children: p.type
                    }
                  ),
                  w > 0 && /* @__PURE__ */ c("span", { className: t("text-[11px] text-neutral shrink-0"), children: [
                    d,
                    "/",
                    w,
                    " done"
                  ] }),
                  b > 0 && /* @__PURE__ */ c("span", { className: t("text-[11px] text-neutral shrink-0"), children: [
                    b,
                    " comment",
                    b !== 1 ? "s" : ""
                  ] })
                ]
              }
            ),
            $ && /* @__PURE__ */ c("div", { className: t("pl-6 pb-2"), children: [
              (() => {
                const v = s?.(p.id);
                return v && a ? /* @__PURE__ */ n("div", { className: t(
                  "py-1 px-2.5 bg-surface-panel rounded border-l-2 border-l-[#cbd5e1]",
                  p.items.length > 0 ? "mb-2" : ""
                ), children: /* @__PURE__ */ n(
                  Re,
                  {
                    fragment: v,
                    ydoc: a,
                    provider: l ?? null,
                    user: { name: "", color: "" },
                    editable: !1
                  }
                ) }) : x ? /* @__PURE__ */ n("div", { className: t(
                  "text-[13px] text-text-primary leading-relaxed whitespace-pre-wrap py-2 px-2.5 bg-surface-panel rounded border-l-2 border-l-[#cbd5e1]",
                  p.items.length > 0 ? "mb-2" : ""
                ), children: S.trim() }) : null;
              })(),
              p.items.map((v) => /* @__PURE__ */ c(
                "div",
                {
                  className: t("flex items-center gap-1.5 py-[3px] text-xs text-neutral"),
                  children: [
                    /* @__PURE__ */ n("span", { className: t("shrink-0"), children: vt(v.status) }),
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
              N.length > 0 && /* @__PURE__ */ c("div", { className: t("mt-2 pt-1.5 border-t border-border-subtle"), children: [
                /* @__PURE__ */ c("div", { className: t("text-[11px] font-semibold text-text-tertiary mb-1"), children: [
                  "Comments (",
                  b,
                  ")"
                ] }),
                N.slice(0, 3).map((v) => /* @__PURE__ */ c("div", { className: t("text-xs text-neutral py-0.5 flex gap-1.5"), children: [
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
              !x && p.items.length === 0 && N.length === 0 && /* @__PURE__ */ n("div", { className: t("text-xs text-text-tertiary italic"), children: "No content in this section" })
            ] })
          ]
        },
        p.id
      );
    }) })
  ] });
}
function ot(e) {
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
function vr(e) {
  return e >= 75 ? "#10b981" : e >= 25 ? "#f59e0b" : "#ef4444";
}
const st = {
  editor: "#10b981",
  reviewer: "#f59e0b",
  reader: "#94a3b8"
}, it = {
  editor: "editing",
  reviewer: "reviewing",
  reader: "reading"
};
function wr({ sections: e }) {
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
        /* @__PURE__ */ n("h3", { className: t("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"), children: "Contents" }),
        /* @__PURE__ */ n("nav", { children: /* @__PURE__ */ n("ol", { className: t("list-none m-0 p-0 flex flex-col gap-1"), children: e.map((i, o) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ c(
          "a",
          {
            href: `#section-${i.id}`,
            "data-testid": `toc-link-${i.id}`,
            onClick: (s) => r(s, i.id),
            className: t("block py-1 px-1.5 text-[13px] text-text-secondary no-underline rounded border-l-2 border-l-transparent transition-colors duration-75 hover:bg-surface-hover hover:border-l-primary"),
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
function Nr({
  reviewed: e,
  total: r
}) {
  const i = r > 0 ? Math.round(e / r * 100) : 0, o = vr(i);
  return /* @__PURE__ */ c("div", { className: t("bg-white border border-border rounded-lg p-4 mb-3"), children: [
    /* @__PURE__ */ n("h3", { className: t("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"), children: "Progress" }),
    /* @__PURE__ */ n("div", { className: t("flex items-baseline gap-1 mb-2"), children: /* @__PURE__ */ c("span", { className: t("text-[28px] font-bold leading-none"), style: { color: o }, children: [
      i,
      "%"
    ] }) }),
    /* @__PURE__ */ n("div", { className: t("h-2 bg-surface-emphasis rounded overflow-hidden mb-1.5"), children: /* @__PURE__ */ n(
      "div",
      {
        className: t("h-full rounded transition-[width] duration-300 ease-in-out"),
        style: { width: `${i}%`, background: o }
      }
    ) }),
    /* @__PURE__ */ c("div", { className: t("text-xs text-neutral"), children: [
      e,
      " of ",
      r,
      " items reviewed"
    ] })
  ] });
}
function kr({ participants: e, meta: r }) {
  const i = /* @__PURE__ */ new Set(), o = [];
  for (const s of e) {
    const a = s.userId || s.clientId;
    i.has(a) || (i.add(a), o.push({ name: s.displayName, color: s.color, mode: s.mode, isOnline: !0 }));
  }
  return r.createdBy && !i.has(r.createdBy) && o.push({ name: r.createdByName || r.createdBy, color: "#6b7280", isOnline: !1 }), /* @__PURE__ */ c("div", { className: t("bg-white border border-border rounded-lg p-4 mb-3"), children: [
    /* @__PURE__ */ n("h3", { className: t("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"), children: "Contributors" }),
    /* @__PURE__ */ n("div", { className: t("flex flex-wrap gap-1.5 mb-3"), children: o.map((s, a) => {
      const l = s.name.split(" ").map((u) => u[0] ?? "").join("").toUpperCase().slice(0, 2);
      return /* @__PURE__ */ c("div", { title: `${s.name}${s.mode ? ` (${it[s.mode] ?? s.mode})` : ""}`, className: t("relative"), children: [
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
            style: { background: st[s.mode ?? "reader"] ?? "#94a3b8" }
          }
        )
      ] }, `${s.name}-${a}`);
    }) }),
    /* @__PURE__ */ n("div", { className: t("flex flex-col gap-1.5"), children: o.map((s, a) => /* @__PURE__ */ c("div", { className: t("flex items-center gap-2 text-[13px]"), children: [
      /* @__PURE__ */ n(
        "span",
        {
          className: t("w-2 h-2 rounded-full shrink-0"),
          style: { background: s.isOnline ? st[s.mode ?? "reader"] ?? "#94a3b8" : "#d1d5db" }
        }
      ),
      /* @__PURE__ */ n("span", { className: t("font-medium text-text-primary flex-1"), children: s.name }),
      /* @__PURE__ */ n("span", { className: t("text-[11px] text-text-tertiary"), children: s.isOnline ? it[s.mode ?? ""] ?? "online" : "offline" })
    ] }, `detail-${s.name}-${a}`)) })
  ] });
}
function Cr({
  sections: e,
  allItems: r,
  completedCount: i,
  commentCounts: o,
  meta: s
}) {
  const a = o ? Object.values(o).reduce((l, u) => l + u, 0) : 0;
  return /* @__PURE__ */ c("div", { className: t("bg-white border border-border rounded-lg p-4 mb-3"), children: [
    /* @__PURE__ */ n("h3", { className: t("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"), children: "Document Info" }),
    /* @__PURE__ */ c("div", { className: t("flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle"), children: [
      /* @__PURE__ */ n("span", { className: t("text-neutral"), children: "Sections" }),
      /* @__PURE__ */ n("span", { className: t("font-semibold"), children: e.length })
    ] }),
    /* @__PURE__ */ c("div", { className: t("flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle"), children: [
      /* @__PURE__ */ n("span", { className: t("text-neutral"), children: "Total tasks" }),
      /* @__PURE__ */ n("span", { className: t("font-semibold"), children: r.length })
    ] }),
    /* @__PURE__ */ c("div", { className: t("flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle"), children: [
      /* @__PURE__ */ n("span", { className: t("text-neutral"), children: "Completed" }),
      /* @__PURE__ */ n("span", { className: t("font-semibold text-success-fg"), children: i })
    ] }),
    a > 0 && /* @__PURE__ */ c("div", { className: t("flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle"), children: [
      /* @__PURE__ */ n("span", { className: t("text-neutral"), children: "Comments" }),
      /* @__PURE__ */ n("span", { className: t("font-semibold"), children: a })
    ] }),
    s.createdAt && /* @__PURE__ */ c("div", { className: t("flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle"), children: [
      /* @__PURE__ */ n("span", { className: t("text-neutral"), children: "Created" }),
      /* @__PURE__ */ n("span", { className: t("font-medium text-xs"), children: ot(s.createdAt) })
    ] }),
    s.updatedAt && /* @__PURE__ */ c("div", { className: t("flex justify-between py-1 text-[13px] text-text-primary"), children: [
      /* @__PURE__ */ n("span", { className: t("text-neutral"), children: "Last changed" }),
      /* @__PURE__ */ n("span", { className: t("font-medium text-xs"), children: ot(s.updatedAt) })
    ] })
  ] });
}
function Sr({
  sections: e,
  participants: r,
  meta: i,
  commentCounts: o,
  sectionContentTexts: s,
  comments: a,
  getSectionFragment: l,
  ydoc: u,
  provider: m
}) {
  const h = e.flatMap((b) => b.items), f = h.filter((b) => b.status !== "pending").length, p = h.filter(
    (b) => b.status === "acked" || b.status === "done"
  ).length, d = pr(h, e), w = e.length >= 2;
  return /* @__PURE__ */ c(
    "div",
    {
      className: t("grid gap-4 mx-auto", w ? "[grid-template-columns:200px_1fr_280px] max-w-[1300px]" : "[grid-template-columns:1fr_280px] max-w-[1100px]"),
      children: [
        /* @__PURE__ */ n(fr, { meta: i, participantCount: r.length }),
        w && /* @__PURE__ */ n(wr, { sections: e }),
        /* @__PURE__ */ c("div", { children: [
          /* @__PURE__ */ n(
            xr,
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
              ydoc: u,
              provider: m
            }
          ),
          /* @__PURE__ */ n(br, { sections: e }),
          /* @__PURE__ */ n(gr, { allItems: h }),
          /* @__PURE__ */ n(
            yr,
            {
              sections: e,
              commentCounts: o,
              sectionContentTexts: s,
              comments: a,
              getSectionFragment: l,
              ydoc: u,
              provider: m
            }
          )
        ] }),
        /* @__PURE__ */ c("div", { children: [
          /* @__PURE__ */ n(Nr, { reviewed: f, total: h.length }),
          /* @__PURE__ */ n(kr, { participants: r, meta: i }),
          /* @__PURE__ */ n(
            Cr,
            {
              sections: e,
              allItems: h,
              completedCount: p,
              commentCounts: o,
              meta: i
            }
          )
        ] })
      ]
    }
  );
}
function Tr({
  mode: e,
  isEmpty: r,
  isFinalized: i,
  sections: o,
  documentId: s,
  displayName: a,
  color: l,
  userId: u,
  ydoc: m,
  provider: h,
  getSectionFragment: f,
  updateSection: p,
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
  isVideoDocked: fe,
  showInlineVideo: xe,
  sidebarFixed: ce,
  videoSpacerRef: Q,
  videoLeft: ue,
  FIXED_TOP: X,
  showTOC: ne,
  sectionReviews: me,
  reviewSection: he,
  headerMeta: se,
  onLoadDemo: be,
  activityPublish: ge
}) {
  return /* @__PURE__ */ c(W, { children: [
    i && e === "editor" && /* @__PURE__ */ n("div", { className: t(
      "rounded-lg border px-4 py-2.5 mb-3 text-center text-[13px] font-medium",
      "bg-warning-bg border-warning-border text-warning-fg"
    ), children: "This document has been finalized and is read-only" }),
    r && /* @__PURE__ */ c("div", { className: "text-center py-12 px-4 text-text-secondary", children: [
      /* @__PURE__ */ n("p", { className: "text-lg mb-4", children: "No document content yet." }),
      /* @__PURE__ */ n(
        "button",
        {
          onClick: be,
          className: t(
            "px-6 py-2.5 text-[15px] font-semibold border-none rounded-lg",
            "bg-primary text-white cursor-pointer font-[inherit]"
          ),
          children: "Load Demo Document"
        }
      ),
      /* @__PURE__ */ n("p", { className: "text-[13px] mt-3 text-text-tertiary", children: "Loads a sample Q2 Sprint Planning document with tasks, decisions, and notes." })
    ] }),
    !r && e === "editor" && m && /* @__PURE__ */ c("div", { ref: q, className: "flex gap-4 relative min-w-0", children: [
      te && !fe && xe && /* @__PURE__ */ n("div", { ref: Q, className: "w-[240px] shrink-0", children: /* @__PURE__ */ n(
        "div",
        {
          id: "inline-video-slot",
          className: t(ce && "fixed z-30"),
          style: ce ? { top: X, left: ue, width: 240 } : void 0
        }
      ) }),
      /* @__PURE__ */ c(
        "div",
        {
          className: t("flex-1 min-w-0", T ? "pr-0" : ne && o.length > 1 && e === "editor" ? "pr-48" : "pr-12"),
          children: [
            /* @__PURE__ */ n(
              tr,
              {
                sections: o.map((L) => {
                  const z = L.items ?? [], V = j[L.id] ?? [], F = [
                    ...z,
                    ...V.filter((Y) => !z.some((J) => J.id === Y.id))
                  ];
                  return { ...L, items: F };
                }),
                getSectionFragment: f,
                ydoc: m,
                provider: h,
                user: { name: a, color: l },
                editable: !i,
                onUpdateSection: p,
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
            /* @__PURE__ */ n(ir, { documentId: s, editable: !i })
          ]
        }
      ),
      T && g && /* @__PURE__ */ c(
        "div",
        {
          className: t(
            "w-[420px] shrink-0 rounded-lg border border-border",
            "bg-surface-inset flex flex-col max-h-[calc(100vh-180px)] overflow-hidden"
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
                    "text-base text-neutral px-1.5 py-0.5 rounded leading-none shrink-0"
                  ),
                  title: "Close comments",
                  children: "✕"
                }
              )
            ] }),
            /* @__PURE__ */ n("div", { className: "flex-1 overflow-y-auto px-3 py-3.5", children: /* @__PURE__ */ n(
              yt,
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
    !r && e === "ack" && m && /* @__PURE__ */ n(
      cr,
      {
        sections: o,
        participants: d,
        userId: u,
        getSectionFragment: f,
        ydoc: m,
        provider: h,
        sectionReviews: me,
        reviewSection: (L, z, V) => {
          he(L, z, V);
          const F = o.find((Y) => Y.id === L);
          ge(`doc.review_${z}`, {
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
    !r && e === "reader" && m && /* @__PURE__ */ n(
      Sr,
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
            return [L.id, z ? Ln(z) : ""];
          })
        ),
        comments: S,
        getSectionFragment: f,
        ydoc: m,
        provider: h
      }
    )
  ] });
}
function Ir(e, r) {
  const i = new Map(e.map((a) => [a.id, a])), o = new Map(r.map((a) => [a.id, a])), s = [];
  for (const a of e) {
    const l = o.get(a.id);
    if (!l)
      s.push({ status: "removed", oldItem: a, changes: [] });
    else {
      const u = [];
      a.text !== l.text && u.push("text"), a.status !== l.status && u.push(`status: ${a.status} -> ${l.status}`), a.assignee !== l.assignee && u.push(`assignee: "${a.assignee}" -> "${l.assignee}"`), a.priority !== l.priority && u.push(`priority: ${a.priority} -> ${l.priority}`), u.length > 0 ? s.push({ status: "modified", oldItem: a, newItem: l, changes: u }) : s.push({ status: "unchanged", oldItem: a, newItem: l, changes: [] });
    }
  }
  for (const a of r)
    i.has(a.id) || s.push({ status: "added", newItem: a, changes: [] });
  return s;
}
function Mr(e, r) {
  const i = new Map(e.map((a) => [a.id, a])), o = new Map(r.map((a) => [a.id, a])), s = [];
  for (const a of e) {
    const l = o.get(a.id);
    if (!l)
      s.push({
        status: "removed",
        id: a.id,
        oldTitle: a.title,
        titleChanged: !1,
        itemDiffs: a.items.map((u) => ({ status: "removed", oldItem: u, changes: [] }))
      });
    else {
      const u = a.title !== l.title, m = (a.textContent || "") !== (l.textContent || ""), h = Ir(a.items, l.items), f = u || m || h.some((p) => p.status !== "unchanged");
      s.push({
        status: f ? "modified" : "unchanged",
        id: a.id,
        oldTitle: a.title,
        newTitle: l.title,
        titleChanged: u,
        textChanged: m,
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
const $r = {
  added: "bg-success-bg border-success-border",
  removed: "bg-danger-bg border-danger-border",
  modified: "bg-warning-bg border-warning-border",
  unchanged: "bg-transparent border-border"
};
function Dr(e) {
  return e === "added" ? "text-success-fg bg-success-bg" : e === "removed" ? "text-danger-fg bg-danger-bg" : e === "modified" ? "text-warning-fg bg-warning-border" : "text-text-secondary bg-surface-hover";
}
function Rr(e) {
  return e === "added" ? "bg-success-bg text-success-fg" : e === "removed" ? "bg-danger-bg text-danger-fg line-through" : e === "modified" ? "bg-warning-bg text-warning-fg" : "bg-transparent text-text-primary";
}
function Ar({ oldSections: e, newSections: r, onClose: i }) {
  const o = Mr(e, r), s = o.some((a) => a.status !== "unchanged");
  return /* @__PURE__ */ c("div", { className: t("border-t border-border bg-surface-inset max-h-[400px] overflow-auto px-4 py-3"), children: [
    /* @__PURE__ */ c("div", { className: t("flex items-center justify-between mb-2"), children: [
      /* @__PURE__ */ n("h4", { className: t("text-[13px] font-semibold text-text-primary m-0"), children: "Changes from selected version to current" }),
      /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          className: t("px-2 py-0.5 text-xs border border-border-field rounded bg-white text-text-secondary cursor-pointer font-[inherit]"),
          onClick: i,
          children: "Dismiss"
        }
      )
    ] }),
    !s && /* @__PURE__ */ n("div", { className: t("text-[13px] text-text-tertiary text-center p-4"), children: "No differences found. The documents are identical." }),
    o.filter((a) => a.status !== "unchanged").map((a) => /* @__PURE__ */ c("div", { className: t("border rounded-md p-2 px-2.5 mb-1.5", $r[a.status]), children: [
      /* @__PURE__ */ c("div", { className: t("flex items-center gap-2 mb-1"), children: [
        /* @__PURE__ */ n("span", { className: t("text-[10px] font-semibold uppercase px-1.5 py-px rounded-sm", Dr(a.status)), children: a.status }),
        /* @__PURE__ */ n("span", { className: t("text-[13px] font-semibold text-text-primary"), children: a.status === "removed" ? a.oldTitle : a.newTitle ?? a.oldTitle }),
        a.titleChanged && /* @__PURE__ */ c("span", { className: t("text-[11px] text-warning-fg"), children: [
          '(was: "',
          a.oldTitle,
          '")'
        ] })
      ] }),
      a.itemDiffs.filter((l) => l.status !== "unchanged").map((l, u) => {
        const m = l.newItem ?? l.oldItem;
        return /* @__PURE__ */ c("div", { children: [
          /* @__PURE__ */ c("div", { className: t("text-xs px-2 py-0.5 rounded-sm mt-0.5", Rr(l.status)), children: [
            l.status === "added" && "+ ",
            l.status === "removed" && "- ",
            l.status === "modified" && "~ ",
            m?.text ?? "(untitled)",
            m?.assignee ? ` [${m.assignee}]` : ""
          ] }),
          l.changes.length > 0 && /* @__PURE__ */ n("div", { className: t("text-[11px] text-warning-fg ml-4 italic"), children: l.changes.join(", ") })
        ] }, m?.id ?? u);
      }),
      a.textChanged && /* @__PURE__ */ c("div", { className: t("mt-1 text-xs"), children: [
        a.oldTextContent && /* @__PURE__ */ c("div", { className: t("px-2 py-1 rounded-sm bg-danger-bg text-danger-fg line-through mb-0.5"), children: [
          a.oldTextContent.substring(0, 200),
          (a.oldTextContent?.length ?? 0) > 200 ? "..." : ""
        ] }),
        a.newTextContent && /* @__PURE__ */ c("div", { className: t("px-2 py-1 rounded-sm bg-success-bg text-success-fg"), children: [
          a.newTextContent.substring(0, 200),
          (a.newTextContent?.length ?? 0) > 200 ? "..." : ""
        ] })
      ] }),
      a.status === "modified" && !a.textChanged && a.itemDiffs.every((l) => l.status === "unchanged") && a.titleChanged && /* @__PURE__ */ n("div", { className: t("text-xs text-text-secondary mt-0.5"), children: "Only the section title changed." })
    ] }, a.id))
  ] });
}
function jr(e) {
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
function Lr({
  versions: e,
  loading: r,
  previewTimestamp: i,
  onFetch: o,
  onPreview: s,
  onClearPreview: a,
  onClose: l,
  onSaveVersion: u,
  onCompare: m,
  onClearCompare: h,
  compareSections: f,
  compareTimestamp: p,
  currentSections: d,
  onRestore: w
}) {
  const b = () => {
    a(), h(), l();
  }, S = () => {
    const x = window.prompt("Enter a name for this version:");
    x && x.trim() && u(x.trim());
  }, N = (x, k) => {
    x.stopPropagation(), p === k ? h() : m(k);
  }, $ = (x) => x.type === "pre-restore" ? "Before restore" : x.type === "auto" ? "Auto-save" : "";
  return /* @__PURE__ */ c(Ae, { width: 320, children: [
    /* @__PURE__ */ n(
      je,
      {
        title: "Version History",
        onClose: b,
        actions: /* @__PURE__ */ n(ee, { size: "sm", onClick: S, children: "Save Version" })
      }
    ),
    /* @__PURE__ */ c(Le, { padding: "0.5rem 0", children: [
      r && /* @__PURE__ */ n("div", { className: t("py-8 px-4 text-center text-text-tertiary text-[13px]"), children: "Loading..." }),
      !r && e.length === 0 && /* @__PURE__ */ n("div", { className: t("py-8 px-4 text-center text-text-tertiary text-[13px]"), children: "No saved versions yet" }),
      !r && e.map((x) => /* @__PURE__ */ c(
        "div",
        {
          className: t(
            "flex items-center justify-between py-2.5 px-4 cursor-pointer text-[13px] text-text-primary",
            i === x.timestamp ? "bg-info-bg border-l-[3px] border-l-[#3b82f6]" : "bg-transparent border-l-[3px] border-l-transparent"
          ),
          onClick: () => s(x.timestamp),
          children: [
            /* @__PURE__ */ c("div", { className: t("flex-1 min-w-0"), children: [
              x.name && /* @__PURE__ */ n("span", { className: t("text-xs font-semibold text-text-primary block mb-px"), children: x.name }),
              /* @__PURE__ */ c("span", { className: t("flex items-center gap-1"), children: [
                jr(x.age),
                x.type && x.type !== "manual" && /* @__PURE__ */ n(
                  "span",
                  {
                    className: t(
                      "text-[10px] font-medium px-[5px] py-px rounded-[3px] ml-1.5",
                      x.type === "pre-restore" ? "bg-warning-bg text-warning-fg" : x.type === "auto" ? "bg-surface-hover text-text-tertiary" : "bg-info-bg text-info-fg"
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
                  p === x.timestamp ? "bg-info-bg border-info text-info-fg" : "bg-white border-border text-text-secondary"
                ),
                onClick: (k) => N(k, x.timestamp),
                children: p === x.timestamp ? "Hide Diff" : "Compare"
              }
            )
          ]
        },
        x.timestamp
      ))
    ] }),
    f != null && /* @__PURE__ */ n(
      Ar,
      {
        oldSections: f,
        newSections: d,
        onClose: h
      }
    ),
    w && p != null && /* @__PURE__ */ c("div", { className: t("py-3 px-4 border-t border-border shrink-0"), children: [
      /* @__PURE__ */ n(
        ee,
        {
          variant: "primary",
          onClick: () => {
            window.confirm(
              `Restore this version?

A checkpoint of the current state will be saved first. All connected users will see the restored content. Comments and reviews added after this version may be lost.`
            ) && (w(p), h());
          },
          className: "w-full px-4 py-2.5 text-sm font-semibold rounded-lg",
          children: "Restore this version"
        }
      ),
      /* @__PURE__ */ n("div", { className: t("text-[11px] text-text-tertiary text-center mt-1.5"), children: "A pre-restore checkpoint will be saved automatically" })
    ] })
  ] });
}
function Er(e) {
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
function Or(e) {
  return e.split(/\s+/).map((r) => r[0]).join("").toUpperCase().slice(0, 2);
}
function Br({
  item: e,
  onClick: r,
  onDismiss: i
}) {
  return /* @__PURE__ */ c(
    "div",
    {
      className: t("flex gap-2.5 py-2.5 px-4 cursor-pointer border-b border-border-subtle items-start hover:bg-surface-inset"),
      onClick: r,
      children: [
        /* @__PURE__ */ n(
          "div",
          {
            className: t("w-7 h-7 rounded-full text-white text-[11px] font-semibold flex items-center justify-center shrink-0"),
            style: { background: e.authorColor },
            children: Or(e.authorName)
          }
        ),
        /* @__PURE__ */ c("div", { className: t("flex-1 min-w-0"), children: [
          /* @__PURE__ */ n("div", { className: t("text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"), children: e.commentText }),
          /* @__PURE__ */ n("div", { className: t("text-[11px] text-text-tertiary mt-0.5"), children: e.sectionTitle })
        ] }),
        /* @__PURE__ */ n("div", { className: t("text-[11px] text-text-tertiary shrink-0 mt-0.5"), children: Er(e.timestamp) }),
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
function _r({
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
      className: t("flex gap-2.5 py-2.5 px-4 cursor-pointer border-b border-border-subtle items-start hover:bg-surface-inset"),
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
function Ur({
  items: e,
  onNavigateToSection: r,
  onClose: i
}) {
  const [o, s] = M("all"), [a, l] = M(/* @__PURE__ */ new Set()), u = (f) => {
    l((p) => {
      const d = new Set(p);
      return d.add(f), d;
    });
  }, m = () => {
    const f = h.map((p) => p.kind === "mention" ? p.commentId : p.itemId);
    l((p) => {
      const d = new Set(p);
      return f.forEach((w) => d.add(w)), d;
    });
  }, h = e.filter((f) => {
    const p = f.kind === "mention" ? f.commentId : f.itemId;
    return a.has(p) ? !1 : o === "all" ? !0 : o === "mentions" ? f.kind === "mention" : f.kind === "task";
  });
  return /* @__PURE__ */ c(Ae, { width: 340, children: [
    /* @__PURE__ */ n(
      je,
      {
        title: "My Mentions & Tasks",
        onClose: i,
        actions: h.length > 0 ? /* @__PURE__ */ n(ee, { variant: "default", size: "sm", onClick: m, children: "Clear all" }) : void 0
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
    /* @__PURE__ */ c(Le, { padding: "0.5rem 0", children: [
      h.length === 0 && /* @__PURE__ */ n("div", { className: t("py-8 px-4 text-center text-text-tertiary text-[13px]"), children: "No mentions or tasks for you" }),
      h.map(
        (f) => f.kind === "mention" ? /* @__PURE__ */ n(
          Br,
          {
            item: f,
            onClick: () => r(f.sectionId),
            onDismiss: () => u(f.commentId)
          },
          f.commentId
        ) : /* @__PURE__ */ n(
          _r,
          {
            item: f,
            onClick: () => r(f.sectionId),
            onDismiss: () => u(f.itemId)
          },
          f.itemId
        )
      )
    ] })
  ] });
}
function Vr(e, r) {
  const i = new Date(e).getTime(), s = (r ? new Date(r).getTime() : Date.now()) - i, a = Math.floor(s / 6e4);
  return a < 1 ? "<1m" : a < 60 ? `${a}m` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function Fr(e) {
  const r = Date.now() - new Date(e).getTime(), i = Math.floor(r / 6e4);
  if (i < 1) return "just now";
  if (i < 60) return `${i}m ago`;
  const o = Math.floor(i / 60);
  return o < 24 ? `${o}h ago` : `${Math.floor(o / 24)}d ago`;
}
function Pr({ sessions: e, loading: r, onFetch: i, onClose: o }) {
  U(() => {
    i();
  }, [i]);
  const s = e.filter((l) => l.status === "ended"), a = e.filter((l) => l.status === "active");
  return /* @__PURE__ */ c(Ae, { width: 340, children: [
    /* @__PURE__ */ n(je, { title: "Past Conversations", onClose: o }),
    /* @__PURE__ */ c(Le, { padding: "12px", children: [
      r && /* @__PURE__ */ n("div", { className: t("text-center text-text-tertiary text-[13px] py-6"), children: "Loading..." }),
      !r && e.length === 0 && /* @__PURE__ */ n("div", { className: t("text-center text-text-tertiary text-[13px] py-6"), children: "No video conversations yet for this document." }),
      a.map((l) => /* @__PURE__ */ n(at, { session: l, isActive: !0 }, l.sessionId)),
      s.map((l) => /* @__PURE__ */ n(at, { session: l }, l.sessionId))
    ] })
  ] });
}
function at({ session: e, isActive: r }) {
  return /* @__PURE__ */ c("div", { className: t(
    "rounded-lg p-3 mb-2",
    r ? "border border-success bg-[rgba(16,185,129,0.04)]" : "border border-border bg-white"
  ), children: [
    /* @__PURE__ */ c("div", { className: t("flex justify-between items-center mb-1"), children: [
      /* @__PURE__ */ n("span", { className: t("text-[11px] text-text-tertiary"), children: Fr(e.startedAt) }),
      /* @__PURE__ */ c("div", { className: t("flex items-center gap-1"), children: [
        r && /* @__PURE__ */ n("span", { className: t("text-[11px] font-semibold text-success-fg bg-[rgba(16,185,129,0.1)] px-1.5 py-px rounded-full"), children: "Live" }),
        /* @__PURE__ */ n("span", { className: t("text-[11px] text-text-secondary"), children: Vr(e.startedAt, e.endedAt) })
      ] })
    ] }),
    /* @__PURE__ */ n("div", { className: t("flex flex-wrap gap-1 mb-2"), children: e.participants.map((i, o) => /* @__PURE__ */ n("span", { className: t("text-[11px] text-text-secondary bg-surface-panel px-2 py-0.5 rounded-full"), children: i.displayName || i.userId.slice(0, 10) }, `${i.userId}-${o}`)) }),
    e.aiSummary && /* @__PURE__ */ n("div", { className: t("text-[11px] text-text-primary bg-surface-panel p-2 rounded-md leading-normal"), children: e.aiSummary }),
    e.transcriptStatus && e.transcriptStatus !== "available" && /* @__PURE__ */ c("div", { className: t("text-[11px] text-text-tertiary mt-1"), children: [
      "Transcript: ",
      e.transcriptStatus
    ] })
  ] });
}
function zr({ sections: e, focusedSectionId: r }) {
  const [i, o] = M(null);
  U(() => {
    if (e.length === 0) return;
    const m = new IntersectionObserver(
      (h) => {
        let f = null;
        for (const p of h)
          p.isIntersecting && (!f || p.intersectionRatio > f.intersectionRatio) && (f = p);
        if (f) {
          const p = f.target.id.replace("section-", "");
          o(p);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-80px 0px -40% 0px" }
    );
    for (const h of e) {
      const f = document.getElementById(`section-${h.id}`);
      f && m.observe(f);
    }
    return () => m.disconnect();
  }, [e]);
  const s = i || r, a = R((m) => {
    const h = document.getElementById(`section-${m}`);
    h && h.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []), l = e.filter((m, h, f) => f.findIndex((p) => p.id === m.id) === h);
  if (l.length === 0) return null;
  const u = l.findIndex((m) => m.id === s);
  return /* @__PURE__ */ c("div", { className: t("flex flex-col gap-0 text-[11px] w-[140px] max-h-[calc(100vh-160px)] overflow-y-auto"), children: [
    /* @__PURE__ */ n("div", { className: t("text-[10px] font-semibold text-text-tertiary uppercase tracking-wide mb-1.5"), children: "Contents" }),
    l.map((m, h) => {
      const f = m.id === s, p = u >= 0 && h < u;
      return /* @__PURE__ */ c(
        "button",
        {
          type: "button",
          onClick: () => a(m.id),
          className: t("flex items-center gap-2 py-1 border-none bg-transparent cursor-pointer text-left font-[inherit]"),
          children: [
            /* @__PURE__ */ n("div", { className: t("flex flex-col items-center w-3 shrink-0"), children: /* @__PURE__ */ n(
              "div",
              {
                className: t(
                  "rounded-full transition-all duration-200",
                  f ? "w-2 h-2 bg-info shadow-[0_0_0_3px_rgba(59,130,246,0.2)]" : p ? "w-1.5 h-1.5 bg-neutral" : "w-1.5 h-1.5 bg-state-idle"
                )
              }
            ) }),
            /* @__PURE__ */ n("span", { className: t(
              "text-[11px] overflow-hidden text-ellipsis whitespace-nowrap transition-colors duration-200",
              f ? "font-semibold text-text-primary" : p ? "font-normal text-neutral" : "font-normal text-text-tertiary"
            ), children: m.title || "Untitled" })
          ]
        },
        m.id
      );
    }),
    u >= 0 && /* @__PURE__ */ c("div", { className: t("text-[10px] text-text-tertiary mt-2"), children: [
      u + 1,
      " / ",
      l.length
    ] })
  ] });
}
function Hr({
  showHistory: e,
  showMyItems: r,
  showVideoHistory: i,
  closePanel: o,
  versionHistory: s,
  ydoc: a,
  myItems: l,
  onNavigateToSection: u,
  videoSessions: m,
  showTOC: h,
  commentSidebarOpen: f,
  sections: p,
  focusedSectionId: d,
  mode: w
}) {
  return /* @__PURE__ */ c(W, { children: [
    e && /* @__PURE__ */ n(
      Lr,
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
      Ur,
      {
        items: l,
        onNavigateToSection: u,
        onClose: o
      }
    ),
    i && /* @__PURE__ */ n(
      Pr,
      {
        sessions: m.sessions,
        loading: m.loading,
        onFetch: m.fetchSessions,
        onClose: o
      }
    ),
    h && !f && p.length > 1 && w === "editor" && /* @__PURE__ */ n("div", { className: t(
      "fixed bottom-4 right-4 w-40 max-h-[280px] overflow-y-auto",
      "bg-white border border-border rounded-[10px] px-3 py-2.5",
      "shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-30"
    ), children: /* @__PURE__ */ n(
      zr,
      {
        sections: p.map((b) => ({ id: b.id, title: b.title })),
        focusedSectionId: d
      }
    ) })
  ] });
}
function qr({
  documentId: e,
  documentType: r,
  ws: i,
  userId: o,
  displayName: s,
  color: a = "#3b82f6",
  onMessage: l,
  activityPublish: u,
  onBack: m,
  isVideoDocked: h,
  onDockVideo: f,
  onUndockVideo: p
}) {
  const d = En({
    documentId: e,
    documentType: r,
    ws: i,
    userId: o,
    displayName: s,
    color: a,
    onMessage: l,
    activityPublish: u,
    isVideoDocked: h,
    onDockVideo: f,
    onUndockVideo: p,
    onBack: m
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
  const S = d.showVideoCall && b ? dt(
    /* @__PURE__ */ n(
      Jn,
      {
        documentId: e,
        userId: o,
        idToken: d.idToken,
        meta: d.meta,
        updateMeta: d.updateMeta,
        sendMessage: i.sendMessage,
        isDocked: d.isVideoDocked,
        onClose: () => {
          d.setShowVideoCall(!1), d.isVideoDocked && p?.();
        },
        onDockToSidebar: d.isVideoDocked ? void 0 : (() => {
          f?.();
        }),
        onUndock: d.isVideoDocked ? (() => {
          p?.();
        }) : void 0,
        onCallEnd: () => {
          d.setShowVideoCall(!1), p?.();
        }
      }
    ),
    b
  ) : null;
  return /* @__PURE__ */ c("div", { "data-testid": "document-editor-page", className: "flex flex-col h-full", children: [
    S,
    /* @__PURE__ */ n(
      Pn,
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
      zn,
      {
        followingUserId: d.followingUserId,
        participants: d.participants,
        onStopFollow: d.handleStopFollow
      }
    ),
    /* @__PURE__ */ n("div", { className: "flex-1 overflow-auto p-4", children: /* @__PURE__ */ n(
      Tr,
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
        activityPublish: u
      }
    ) }),
    /* @__PURE__ */ n(
      Hr,
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
const so = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qr
}, Symbol.toStringTag, { value: "Module" }));
export {
  gr as A,
  Ar as D,
  xr as E,
  zn as F,
  fr as H,
  br as K,
  ft as M,
  Vn as P,
  Sr as R,
  yt as S,
  zr as T,
  Lr as V,
  ir as a,
  qr as b,
  Pn as c,
  Ur as d,
  cr as e,
  er as f,
  tr as g,
  yr as h,
  Jn as i,
  Pr as j,
  xt as k,
  pr as l,
  lr as m,
  Dn as n,
  so as o,
  Te as r,
  $n as u
};
