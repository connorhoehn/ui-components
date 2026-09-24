import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { r as t } from "./registry-DbX3MVAA.js";
import { r as n } from "./IdentityContext-CQM1qwH6.js";
import { a as r, c as i, i as a, l as o, n as s, o as c, r as l, s as u, t as d } from "./useVideoSessions-DDcZSMLJ.js";
import { t as f } from "./useDocumentTypes-DCKwxXn8.js";
import { t as p } from "./cn-DhjIN-s0.js";
import { t as m } from "./useEventCallback-Cwx9QVSi.js";
import { _ as h } from "./overlayStack-CHdlnODN.js";
import { t as g } from "./IconButton-DDeXW3mZ.js";
import { N as _, f as v, l as y, q as b, t as x } from "./DropdownMenu-thsvyIAZ.js";
import { t as S } from "./Banner-6sJQ2hAL.js";
import { t as C } from "./Chip-zdVBwV9j.js";
import { t as w } from "./ConfirmDialog-CSS_SMC6.js";
import { t as T } from "./Input-DLknWXri.js";
import { t as ee } from "./Textarea-Dz4doxTv.js";
import { t as te } from "./Avatar-DeJWic2B.js";
import { t as ne } from "./StatusPill-CCLWewW3.js";
import { t as E } from "./activationKey-CjbL3LUv.js";
import { O as D } from "./renderers-CLgJ6UYB.js";
import { K as O } from "./PresentationEditor-DABG0C0n.js";
import { t as k } from "./TiptapEditor-CajZRkz8.js";
import { t as re } from "./useHangoutEmbed-ChkoGDC_.js";
import { t as ie } from "./useActiveSpeaker-Dc9r75EE.js";
import { forwardRef as ae, useCallback as A, useEffect as j, useImperativeHandle as M, useMemo as N, useRef as P, useState as F } from "react";
import { Fragment as I, jsx as L, jsxs as R } from "react/jsx-runtime";
import z, { createPortal as B } from "react-dom";
//#region src/utils/markdownParser.ts
function V() {
	return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
var oe = /^- \[([ xX])\]\s+(.+)$/;
function H(e, t) {
	let n = e.toLowerCase();
	return oe.test(t) || /- \[[ xX]\]/.test(t) ? "tasks" : n.includes("decision") ? "decisions" : n.includes("summary") ? "summary" : "notes";
}
function U(e) {
	let t = e.split("\n"), n = [], r = [];
	for (let e of t) {
		let t = e.match(oe);
		if (t) {
			let e = t[1].toLowerCase() === "x";
			n.push({
				id: V(),
				text: t[2].trim(),
				status: e ? "done" : "pending",
				assignee: "",
				ackedBy: "",
				ackedAt: "",
				priority: "medium",
				notes: ""
			});
		} else r.push(e);
	}
	return {
		items: n,
		remaining: r.join("\n").trim()
	};
}
function se(e) {
	let t = {}, n = [], r = e.replace(/\r\n/g, "\n"), i = r.match(/^# (.+)$/m);
	i && (t.title = i[1].trim());
	let a = r.split(/^## /m);
	if (a.length <= 1) {
		let e = r.replace(/^# .+\n*/m, "").trim();
		if (e.length > 0) {
			let { items: r, remaining: i } = U(e);
			n.push({
				id: V(),
				type: "summary",
				title: t.title ?? "Untitled",
				contentMarkdown: i,
				items: r
			});
		}
		return {
			meta: t,
			sections: n
		};
	}
	for (let e = 1; e < a.length; e++) {
		let t = a[e], r = t.indexOf("\n"), i = r === -1 ? t.trim() : t.slice(0, r).trim(), o = r === -1 ? "" : t.slice(r + 1).trim(), { items: s, remaining: c } = U(o), l = H(i, o);
		n.push({
			id: V(),
			type: l,
			title: i,
			contentMarkdown: c,
			items: s
		});
	}
	return {
		meta: t,
		sections: n
	};
}
//#endregion
//#region src/components/doc-editor/canvas/documentShape.ts
var ce = 2, W = "body";
function G(e) {
	if (!e) return 0;
	let t = e.getMap("meta").get("schemaVersion");
	return typeof t == "number" ? t : 0;
}
function K(e) {
	return G(e) >= 2;
}
function le(e) {
	return !e || !K(e) ? null : e.getXmlFragment(W);
}
function ue(e) {
	let [t, n] = F(() => G(e));
	return j(() => {
		if (!e) {
			n(0);
			return;
		}
		let t = e.getMap("meta"), r = () => n(G(e));
		return r(), t.observe(r), () => t.unobserve(r);
	}, [e]), t >= 2;
}
//#endregion
//#region src/utils/documentExport.ts
function de(e) {
	let t = e.meta?.schemaVersion;
	return typeof t == "number" ? t : 0;
}
function fe(e, t) {
	return t?.ydoc ? K(t.ydoc) : t?.bodyMarkdown != null || typeof e.body == "string" || de(e) >= 2;
}
var q = /<\/?(paragraph|heading|blockquote|codeblock|bulletlist|orderedlist|listitem|tasklist|taskitem|horizontalrule|hardbreak|macro|doc)[^>]*>/gi;
function pe(e) {
	let t = e?.toString();
	return t ? t.replace(q, "\n").replace(/<[^>]+>/g, "").replace(/\n{3,}/g, "\n\n").trim() : "";
}
function J(e) {
	let t = e?.toString()?.trim();
	if (!t) return "";
	if (typeof DOMParser > "u") return pe(e);
	let n = new DOMParser().parseFromString(`<doc>${t}</doc>`, "text/xml");
	if (n.querySelector("parsererror")) return pe(e);
	let r = (e) => (e.textContent ?? "").replace(/\s+/g, " ").trim(), i = (e) => e.nodeName.toLowerCase(), a = (e, t) => {
		let n = i(e), o = "  ".repeat(t);
		switch (n) {
			case "heading": {
				let t = Number(e.getAttribute("level") ?? "1");
				return [`${"#".repeat(Math.min(Math.max(t || 1, 1), 6))} ${r(e)}`];
			}
			case "paragraph": return r(e) ? [r(e)] : [];
			case "blockquote": return [`> ${r(e)}`];
			case "codeblock": return [
				"```",
				e.textContent ?? "",
				"```"
			];
			case "horizontalrule": return ["---"];
			case "bulletlist":
			case "orderedlist":
			case "tasklist": {
				let s = [], c = 1;
				for (let l of Array.from(e.children)) {
					let e = i(l) === "taskitem" ? l.getAttribute("checked") === "true" ? "- [x] " : "- [ ] " : n === "orderedlist" ? `${c++}. ` : "- ";
					s.push(`${o}${e}${r(l)}`);
					for (let e of Array.from(l.children)) i(e).endsWith("list") && s.push(...a(e, t + 1));
				}
				return s;
			}
			case "macro": return [`_[${e.getAttribute("data-macro") ?? "macro"}]_`];
			default: return r(e) ? [r(e)] : [];
		}
	}, o = [];
	for (let e of Array.from(n.documentElement.children)) o.push(...a(e, 0), "");
	return o.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}
function Y(e, t) {
	if (t?.bodyMarkdown != null) return t.bodyMarkdown;
	if (t?.ydoc) {
		let e = le(t.ydoc);
		if (e) return J(e);
	}
	return typeof e.body == "string" ? e.body : "";
}
function me(e) {
	return `- [${e.status === "done" || e.status === "acked" ? "x" : " "}] ${e.text}`;
}
function X(e, t = 0) {
	let n = "  ".repeat(t), r = [];
	r.push(`${n}> **${e.displayName}**: ${e.text}`);
	for (let n of e.replies ?? []) r.push(X(n, t + 1));
	return r.join("\n");
}
function he(e) {
	let t = [`## ${e.title}`, ""], n = e.contentMarkdown ?? e.contentText;
	n && t.push(n, "");
	let r = Array.isArray(e.items) ? e.items : [];
	if (r.length > 0) {
		for (let e of r) t.push(me(e));
		t.push("");
	}
	let i = e.comments;
	if (i && i.length > 0) {
		t.push(`### Comments (${i.length})`, "");
		for (let e of i) t.push(X(e));
		t.push("");
	}
	return t.join("\n");
}
function ge(e, t) {
	let n = e, r = [`# ${n.meta?.title ?? "Document"}`, ""];
	if (fe(n, t)) {
		let e = Y(n, t);
		e && r.push(e, "");
		let i = n.comments ?? [];
		if (i.length > 0) {
			r.push(`## Comments (${i.length})`, "");
			for (let e of i) r.push(X(e));
			r.push("");
		}
		return r.join("\n").trimEnd() + "\n";
	}
	for (let e of n.sections ?? []) r.push(he(e));
	return r.join("\n").trimEnd() + "\n";
}
//#endregion
//#region src/utils/demoDocument.ts
var _e = "# Q2 Sprint Planning - Meeting Summary\n\n## Executive Summary\n\nThis document captures the key outcomes from our Q2 sprint planning session held on April 10, 2026. The team discussed priorities for the upcoming quarter, including the new collaborative editing feature, infrastructure improvements, and customer-facing bug fixes.\n\nKey themes:\n- **Real-time collaboration** is the top priority for Q2\n- Infrastructure debt needs to be addressed before scaling\n- Customer satisfaction scores are trending upward\n\n## Action Items\n\n- [ ] Set up Tiptap editor with Y.js CRDT integration\n- [ ] Deploy shared Redis ECS service for multi-instance sync\n- [ ] Fix the 48 audit issues identified in the post-fix review\n- [ ] Create Playwright tests for 3-browser collaborative editing\n- [ ] Design the document export pipeline (PDF, DOCX, Google Docs)\n- [x] Complete the WebSocket gateway infrastructure audit\n- [x] Remove ElastiCache dependency from CDK stack\n\n## Decisions\n\n- [ ] Adopt Tiptap v3 as the standard rich text editor\n- [ ] Use Y.js with custom GatewayProvider (not Hocuspocus)\n- [ ] Store CRDT snapshots in DynamoDB with 7-day TTL\n- [ ] Support 3 viewing modes: Editor, Review, Reader\n\n## Technical Notes\n\nThe collaborative document editor will be built on top of the existing WebSocket gateway infrastructure. The `crdt-service.js` backend has been upgraded to maintain a proper `Y.Doc` per channel with awareness protocol support.\n\n### Architecture Highlights\n\n1. **Frontend**: Tiptap v3 + Y.js with custom `GatewayProvider`\n2. **Backend**: Existing crdt-service.js (treats Y.js updates as opaque binary)\n3. **Persistence**: EventBridge -> Lambda -> DynamoDB (gzip compressed, 7-day TTL)\n4. **Sync**: Redis pub/sub for multi-instance, WebSocket for client delivery\n\n### Performance Targets\n\n- Edit latency: < 50ms (local) / < 200ms (remote)\n- Concurrent editors: 10+ per document\n- Document size: up to 100KB of rich text\n- Snapshot frequency: every 50 operations or 5 minutes\n";
//#endregion
//#region src/components/doc-editor/useDocumentActions.ts
function ve(e) {
	return e.toString().replace(/<\/?(paragraph|heading|blockquote|codeBlock|bulletList|orderedList|listItem|taskList|taskItem|horizontalRule|hardBreak|doc)[^>]*>/g, "\n").replace(/<[^>]+>/g, "").replace(/\n{3,}/g, "\n\n").trim();
}
function ye(e) {
	let t = e?.toString()?.trim();
	if (!t || typeof DOMParser > "u") return "";
	let n = new DOMParser().parseFromString(`<doc>${t}</doc>`, "text/xml");
	if (n.querySelector("parsererror")) return "";
	let r = (e) => (e.textContent ?? "").replace(/\s+/g, " ").trim(), i = (e) => e.nodeName.toLowerCase(), a = (e, t) => {
		let n = i(e), o = "  ".repeat(t);
		switch (n) {
			case "heading": {
				let t = Number(e.getAttribute("level") ?? "1");
				return [`${"#".repeat(Math.min(Math.max(t, 1), 6))} ${r(e)}`];
			}
			case "paragraph": return r(e) ? [r(e)] : [];
			case "blockquote": return [`> ${r(e)}`];
			case "codeblock": return [
				"```",
				e.textContent ?? "",
				"```"
			];
			case "horizontalrule": return ["---"];
			case "bulletlist":
			case "orderedlist":
			case "tasklist": {
				let s = [], c = 1;
				for (let l of Array.from(e.children)) {
					let e = i(l) === "taskitem" ? l.getAttribute("checked") === "true" ? "- [x] " : "- [ ] " : n === "orderedlist" ? `${c++}. ` : "- ";
					s.push(`${o}${e}${r(l)}`);
					for (let e of Array.from(l.children)) i(e).endsWith("list") && s.push(...a(e, t + 1));
				}
				return s;
			}
			case "macro": return [`_[${e.getAttribute("data-macro") ?? "macro"}]_`];
			default: return r(e) ? [r(e)] : [];
		}
	}, o = n.documentElement, s = [];
	for (let e of Array.from(o.children)) s.push(...a(e, 0), "");
	return s.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}
function be(e) {
	return e.split("\n").map((e) => e.startsWith("### ") ? `<h3>${e.slice(4)}</h3>` : e.startsWith("## ") ? `<h2>${e.slice(3)}</h2>` : e.startsWith("# ") ? `<h1>${e.slice(2)}</h1>` : e.startsWith("> ") ? `<blockquote>${e.slice(2)}</blockquote>` : e.startsWith("- [x] ") ? `<li>&#9745; ${e.slice(6)}</li>` : e.startsWith("- [ ] ") ? `<li>&#9744; ${e.slice(6)}</li>` : e.startsWith("- ") ? `<li>${e.slice(2)}</li>` : e.trim() === "" ? "<br/>" : `<p>${e}</p>`).join("\n").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/`([^`]+)`/g, "<code>$1</code>");
}
function Z(e, t) {
	let n = URL.createObjectURL(e), r = document.createElement("a");
	r.href = n, r.download = t, r.click(), URL.revokeObjectURL(n);
}
function xe(e, t, n, r) {
	let i = t || "document";
	if (e === "json") {
		Z(new Blob([JSON.stringify(r, null, 2)], { type: "application/json" }), `${i}.json`);
		return;
	}
	if (e === "markdown") {
		Z(new Blob([n], { type: "text/markdown" }), `${i}.md`);
		return;
	}
	let a = window.open("", "_blank");
	a && (a.document.write(`
    <html>
    <head>
      <title>${t || "Document"}</title>
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
    <body>${be(n)}</body>
    </html>
  `), a.document.close(), a.print());
}
function Se({ documentId: e, userId: t, ws: n, updateMeta: r, addSection: i, exportJSON: a, getSectionFragment: o, getCanvasFragment: s, isCanvas: c = !1, comments: l }) {
	let [u, d] = F(!1);
	return {
		demoLoaded: u,
		handleLoadDemo: A(() => {
			let n = se(_e);
			r({
				id: e,
				title: n.meta.title || "Untitled",
				sourceType: "notes",
				sourceId: "",
				createdBy: t,
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				aiModel: "",
				status: "draft"
			});
			for (let e of n.sections) i({
				id: e.id,
				type: e.type,
				title: e.title,
				collapsed: !1,
				items: e.items
			});
			d(!0);
		}, [
			e,
			t,
			r,
			i
		]),
		handleClearDocument: A(() => {
			n.sendMessage({
				service: "crdt",
				action: "clearDocument",
				channel: `doc:${e}`
			}), d(!1);
		}, [n, e]),
		handleExport: A((e) => {
			let t = a();
			if (t) {
				if (c) {
					let n = ye(s?.() ?? null);
					t.sections = [], t.body = n;
					let r = Object.values(l).flat();
					r.length > 0 && (t.comments = r), xe(e, t.meta.title, n ? `# ${t.meta.title || "Document"}\n\n${n}\n` : `# ${t.meta.title || "Document"}\n`, t);
					return;
				}
				for (let e of t.sections) {
					let t = o(e.id);
					t && (e.contentText = ve(t));
					let n = l[e.id];
					n && n.length > 0 && (e.comments = n);
				}
				xe(e, t.meta.title, ge(t), t);
			}
		}, [
			a,
			o,
			s,
			c,
			l
		])
	};
}
//#endregion
//#region src/components/doc-editor/useSidebarPanels.ts
function Ce(e = {}) {
	let [t, n] = F(e.initialPanel ?? null), r = A((e) => {
		n((t) => t === e ? null : e);
	}, []), i = A((e) => {
		n(e);
	}, []), a = A(() => {
		n(null);
	}, []);
	return {
		activePanel: t,
		showHistory: t === "history",
		showMyItems: t === "myItems",
		showVideoHistory: t === "videoHistory",
		toggleHistory: A(() => r("history"), [r]),
		toggleMyItems: A(() => r("myItems"), [r]),
		toggleVideoHistory: A(() => r("videoHistory"), [r]),
		openPanel: i,
		closePanel: a
	};
}
//#endregion
//#region src/components/doc-editor/canvas/scrollToDocumentTarget.ts
var we = 2e3, Te = "0 0 0 3px #3b82f640";
function Ee(e) {
	return e.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
}
function Q(e, t = document) {
	let { sectionId: n, commentId: r } = e;
	if (n) {
		let e = t.querySelector(`[id="section-${Ee(n)}"]`);
		if (e) return e;
	}
	if (r) {
		let e = t.querySelector(`[data-comment-id="${Ee(r)}"]`);
		if (e) return e;
	}
	return null;
}
function De(e, t = document) {
	let n = Q(e, t);
	return n ? (n.scrollIntoView?.({
		behavior: "smooth",
		block: "center"
	}), n.style.transition = "box-shadow 0.3s ease", n.style.boxShadow = Te, setTimeout(() => {
		n.style.boxShadow = "";
	}, we), !0) : !1;
}
//#endregion
//#region src/hooks/templateSections.ts
function Oe(e, t) {
	let n = `${e}::${t}`, r = 5381;
	for (let e = 0; e < n.length; e++) r = r * 33 ^ n.charCodeAt(e);
	return `tpl-${(r >>> 0).toString(36)}`;
}
function ke(e) {
	let t = e.getArray("sections"), n = /* @__PURE__ */ new Set(), r = [];
	return t.toArray().forEach((e, t) => {
		let i = e.get("id");
		typeof i != "string" || !i || (n.has(i) ? r.push(t) : n.add(i));
	}), r.length === 0 ? 0 : (e.transact(() => {
		for (let e = r.length - 1; e >= 0; e--) t.delete(r[e], 1);
	}), r.length);
}
//#endregion
//#region src/components/doc-editor/useDocumentEditorState.ts
function Ae() {
	if (typeof window < "u") {
		let e = new URLSearchParams(window.location.search).get("mode");
		if (e === "editor" || e === "ack" || e === "reader") return e;
	}
	return "editor";
}
function je(e) {
	return e.toString().replace(/<\/?(paragraph|heading|blockquote|codeBlock|bulletList|orderedList|listItem|taskList|taskItem|horizontalRule|hardBreak|doc)[^>]*>/g, "\n").replace(/<[^>]+>/g, "").replace(/\n{3,}/g, "\n\n").trim();
}
function Me({ documentId: e, documentType: t, ws: r, userId: s, displayName: p, color: m = "var(--color-info)", onMessage: h, activityPublish: g, isVideoDocked: _, onDockVideo: v, onUndockVideo: y, onBack: b, idToken: x }) {
	let [S, C] = F(Ae), { showHistory: w, showMyItems: T, showVideoHistory: ee, toggleHistory: te, toggleMyItems: ne, toggleVideoHistory: E, closePanel: D } = Ce(), [O, k] = F(_ ?? !1), [re, ie] = F(typeof window < "u" ? window.innerWidth : 1400);
	j(() => {
		let e = () => ie(window.innerWidth);
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, []);
	let ae = re >= 1200, M = re >= 900, [I, L] = F(!1), R = P(null), z = P(null), [B, V] = F(0), [, oe] = F(0), H = P(null), U = A(() => {
		if (H.current === null) {
			let e = R.current ?? z.current;
			e && (H.current = e.getBoundingClientRect().top + window.scrollY);
		}
		let e = H.current ?? 250, t = window.scrollY > e - 146;
		L(t), R.current && V(R.current.getBoundingClientRect().left), z.current && oe(z.current.getBoundingClientRect().left);
	}, []);
	j(() => {
		let e = () => {
			H.current = null, U();
		};
		return window.addEventListener("scroll", U, { passive: !0 }), window.addEventListener("resize", e, { passive: !0 }), () => {
			window.removeEventListener("scroll", U), window.removeEventListener("resize", e);
		};
	}, [U]), j(() => {
		let e = setTimeout(() => {
			H.current = null, U();
		}, 50);
		return () => clearTimeout(e);
	}, [O, U]);
	let [se, ce] = F(null), [G, K] = F(!1), [le, de] = F(null), fe = n(), q = x === void 0 ? fe?.idToken ?? null : x, pe = d(e, q), { meta: J, sections: Y, synced: me, updateMeta: X, addSection: he, updateSection: ge, addItem: _e, updateItem: ve, removeItem: ye, getSectionFragment: be, ydoc: Z, provider: xe, exportJSON: we, participants: Te, awareness: Ee } = o({
		documentId: e,
		mode: S,
		ws: r,
		userId: s,
		displayName: p,
		color: m,
		onMessage: h
	}), { comments: Q, addComment: je, resolveThread: Me, unresolveThread: Ne } = i({
		documentId: e,
		idToken: q,
		sendMessage: r.sendMessage,
		onMessage: h,
		connectionState: r.connectionState
	}), { sectionReviews: Pe, reviewSection: Fe } = c({
		documentId: e,
		idToken: q,
		sendMessage: r.sendMessage,
		onMessage: h,
		connectionState: r.connectionState
	}), Ie = N(() => Y.map((e) => e.id), [Y]), { items: Le, addItem: Re, updateItem: ze, removeItem: Be, itemErrors: $ } = u({
		documentId: e,
		sectionIds: Ie,
		idToken: q,
		sendMessage: r.sendMessage,
		onMessage: h,
		connectionState: r.connectionState
	});
	j(() => {
		if (!(r.connectionState !== "connected" || !e)) return r.sendMessage({
			service: "document-events",
			action: "subscribe",
			documentId: e
		}), () => {
			r.sendMessage({
				service: "document-events",
				action: "unsubscribe",
				documentId: e
			});
		};
	}, [
		e,
		r.connectionState,
		r.sendMessage
	]);
	let Ve = ue(Z), { demoLoaded: He, handleLoadDemo: Ue, handleClearDocument: We, handleExport: Ge } = Se({
		documentId: e,
		userId: s,
		ws: r,
		updateMeta: X,
		addSection: he,
		exportJSON: we,
		getSectionFragment: be,
		getCanvasFragment: () => Z ? Z.getXmlFragment(W) : null,
		isCanvas: Ve,
		comments: Q
	}), [Ke, qe] = F(null), Je = A((e) => {
		let t = e.lastSeen && Date.now() - e.lastSeen < 3e4, n = e.mode === "reviewer" ? "ack" : e.mode === "reader" ? "reader" : "editor";
		if (S !== n && (C(n), typeof window < "u")) {
			let e = new URL(window.location.href);
			e.searchParams.set("mode", n), window.history.replaceState({}, "", e.toString());
		}
		e.currentSectionId && setTimeout(() => {
			let n = document.getElementById(`section-${e.currentSectionId}`);
			n && (n.scrollIntoView({
				behavior: "smooth",
				block: "center"
			}), t && (n.style.transition = "box-shadow 0.3s ease", n.style.boxShadow = `0 0 0 3px ${e.color}40`, setTimeout(() => {
				n.style.boxShadow = "";
			}, 2e3)));
		}, 150);
	}, [S, Y]), Ye = A((e) => {
		let t = e.userId || e.clientId;
		ce((e) => e === t ? null : t);
	}, []), Xe = P(null);
	j(() => {
		if (!se) {
			Xe.current = null;
			return;
		}
		let e = Te.find((e) => (e.userId || e.clientId) === se);
		if (!e || !e.currentSectionId) {
			if (e && Y.length > 0) {
				let e = document.getElementById(`section-${Y[0].id}`);
				e && !Xe.current && (e.scrollIntoView({
					behavior: "smooth",
					block: "start"
				}), Xe.current = "__initial__");
			}
			return;
		}
		if (e.currentSectionId === Xe.current) return;
		Xe.current = e.currentSectionId;
		let t = e.mode === "reviewer" ? "ack" : e.mode === "reader" ? "reader" : "editor";
		if (S !== t && (C(t), typeof window < "u")) {
			let e = new URL(window.location.href);
			e.searchParams.set("mode", t), window.history.replaceState({}, "", e.toString());
		}
		let n = setTimeout(() => {
			let t = document.getElementById(`section-${e.currentSectionId}`);
			t && (t.scrollIntoView({
				behavior: "smooth",
				block: "center"
			}), t.style.transition = "box-shadow 0.3s ease", t.style.boxShadow = `0 0 0 3px ${e.color}40`, r = setTimeout(() => {
				t.style.boxShadow = "";
			}, 1500));
		}, 100), r;
		return () => {
			clearTimeout(n), r && clearTimeout(r);
		};
	}, [
		se,
		Te,
		S,
		Y
	]);
	let Ze = A(() => {
		ce(null);
	}, []), Qe = A((t, n) => {
		let r = {
			id: crypto.randomUUID(),
			...n
		};
		_e(t, r), Re(t, r).catch(() => {}), g("doc.add_item", {
			sectionTitle: Y.find((e) => e.id === t)?.title,
			documentId: e,
			documentTitle: J?.title
		});
	}, [
		_e,
		Re,
		Y,
		g,
		e,
		J?.title
	]), $e = A((e, t, n) => {
		ve(e, t, n), ze(e, t, n).catch(() => {});
	}, [ve, ze]), et = A((e, t) => {
		ye(e, t), Be(e, t).catch(() => {});
	}, [ye, Be]);
	j(() => {
		if (Ve || Y.length === 0 || Ke) return;
		let e = setTimeout(() => {
			let e = Y[0].id;
			qe(e), Ee.updateSection(e);
		}, 500);
		return () => clearTimeout(e);
	}, [
		Ve,
		Y,
		Ke,
		Ee
	]);
	let tt = A((e) => {
		qe(e), Ee.updateSection(e);
	}, [Ee]), nt = P(null), [rt, it] = F(0), at = A((e) => {
		de(e), K(!0), requestAnimationFrame(() => {
			let t = document.getElementById(`section-${e}`), n = nt.current;
			if (t && n) {
				let e = t.getBoundingClientRect(), r = n.getBoundingClientRect();
				it(e.top - r.top);
			}
		});
	}, []), ot = A(() => {
		K(!1);
	}, []), st = A((t, n, r) => {
		je(t, n, r), g("doc.comment", {
			sectionId: t,
			text: n.slice(0, 50),
			documentId: e,
			documentTitle: J?.title
		});
		let i = n.match(/@[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)*/g);
		if (i && i.length > 0) {
			let r = i.map((e) => e.slice(1).trim());
			g("doc.mention", {
				sectionId: t,
				sectionTitle: Y.find((e) => e.id === t)?.title ?? "",
				mentionedNames: r,
				commentText: n.slice(0, 80),
				authorName: p,
				documentId: e,
				documentTitle: J?.title
			});
		}
	}, [
		je,
		g,
		Y,
		p,
		e,
		J?.title
	]), ct = A((t, n) => {
		Me(t, n), g("doc.resolve_thread", {
			sectionId: t,
			commentId: n,
			documentId: e,
			documentTitle: J?.title
		});
	}, [
		Me,
		g,
		e,
		J?.title
	]), lt = A((t, n) => {
		Ne(t, n), g("doc.unresolve_thread", {
			sectionId: t,
			commentId: n,
			reopenedBy: p,
			documentId: e,
			documentTitle: J?.title
		});
	}, [
		Ne,
		g,
		p,
		e,
		J?.title
	]), ut = a({
		sections: Y,
		comments: Q,
		displayName: p,
		userId: s
	}), dt = A((e, t) => {
		setTimeout(() => {
			De({
				sectionId: e,
				commentId: t
			});
		}, 150);
	}, []), ft = ne, pt = te, mt = E, ht = A(() => {
		k((e) => !e), D();
	}, [D]);
	j(() => {
		let e = (e) => {
			(e.metaKey || e.ctrlKey) && e.key === "m" && (e.preventDefault(), ft());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [ft]);
	let gt = `doc:${e}`, _t = l({
		channel: gt,
		sendMessage: r.sendMessage,
		onMessage: h
	});
	j(() => {
		w ? _t.fetchVersions() : _t.clearPreview();
	}, [w]), j(() => {
		if (!me || !t || !Z) return;
		let n = Z.getMap("meta");
		if (n.get("templateApplied") || Z.getArray("sections").length > 0) return;
		let r = f().find((e) => e.name === t);
		if (!r) return;
		Z.transact(() => {
			n.set("templateApplied", !0);
		});
		let i = (e) => e === "tasks" ? "tasks" : e === "decisions" ? "decisions" : "notes";
		X({
			id: e,
			title: J?.title || r.name,
			sourceType: "notes",
			sourceId: "",
			createdBy: s,
			createdByName: p,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			aiModel: "",
			status: "draft",
			documentType: r.name
		});
		for (let t of r.fields) he({
			id: Oe(e, t.name),
			type: i(t.sectionType),
			sectionType: t.sectionType,
			title: t.name,
			collapsed: t.defaultCollapsed,
			placeholder: t.placeholder || void 0,
			items: []
		});
	}, [
		me,
		t,
		Z
	]), j(() => {
		!me || !Z || ke(Z);
	}, [
		me,
		Z,
		Y
	]);
	let vt = (e) => {
		if (C(e), typeof window < "u") {
			let t = new URL(window.location.href);
			t.searchParams.set("mode", e), window.history.replaceState({}, "", t.toString());
		}
	}, yt = J ?? {
		id: e,
		title: "",
		sourceType: "notes",
		sourceId: "",
		createdBy: "",
		createdAt: "",
		aiModel: "",
		status: "draft"
	};
	return {
		mode: S,
		handleModeChange: vt,
		meta: J,
		headerMeta: yt,
		isFinalized: yt.status === "final",
		handleFinalize: A(() => {
			window.confirm("Finalize this document? It will become read-only.") && (X({ status: "final" }), g("doc.finalize", {
				documentId: e,
				documentTitle: J?.title
			}));
		}, [
			X,
			g,
			e,
			J?.title
		]),
		handleUnlock: A(() => {
			X({ status: "draft" }), g("doc.unlock", {
				documentId: e,
				documentTitle: J?.title
			});
		}, [
			X,
			g,
			e,
			J?.title
		]),
		updateMeta: X,
		sections: Y,
		updateSection: ge,
		getSectionFragment: be,
		isCanvas: Ve,
		itemErrors: $,
		ydoc: Z,
		provider: xe,
		synced: me,
		demoLoaded: He,
		handleLoadDemo: Ue,
		handleClearDocument: We,
		handleExport: Ge,
		participants: Te,
		awareness: Ee,
		focusedSectionId: Ke,
		handleSectionFocus: tt,
		handleJumpToUser: Je,
		followingUserId: se,
		handleFollowUser: Ye,
		handleStopFollow: Ze,
		comments: Q,
		commentSidebarOpen: G,
		commentSectionId: le,
		commentSidebarTop: rt,
		sectionListRef: nt,
		handleOpenComments: at,
		handleCloseComments: ot,
		handleAddComment: st,
		handleResolveThread: ct,
		handleUnresolveThread: lt,
		restItems: Le,
		handleAddItem: Qe,
		handleUpdateItem: $e,
		handleRemoveItem: et,
		sectionReviews: Pe,
		restReviewSection: Fe,
		showHistory: w,
		showMyItems: T,
		showVideoHistory: ee,
		handleToggleHistory: pt,
		handleToggleMyItems: ft,
		handleToggleVideoHistory: mt,
		closePanel: D,
		showVideoCall: O,
		setShowVideoCall: k,
		handleToggleVideoCall: ht,
		videoSessions: pe,
		isVideoDocked: _,
		onDockVideo: v,
		onUndockVideo: y,
		showTOC: ae,
		showInlineVideo: M,
		sidebarFixed: I,
		videoSpacerRef: R,
		tocSpacerRef: z,
		videoLeft: B,
		FIXED_TOP: 146,
		myItems: ut,
		handleNavigateToSection: dt,
		versionHistory: _t,
		handleBack: A(() => {
			O && !_ && v?.(), b?.();
		}, [
			O,
			_,
			v,
			b
		]),
		idToken: q,
		activityPublish: g,
		displayName: p,
		color: m,
		userId: s,
		documentId: e
	};
}
//#endregion
//#region src/components/doc-editor/ParticipantAvatars.tsx
function Ne(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function Pe(e, t = .2) {
	let n = e.replace("#", ""), r = parseInt(n, 16), i = Math.max(0, (r >> 16 & 255) * (1 - t)), a = Math.max(0, (r >> 8 & 255) * (1 - t)), o = Math.max(0, (r & 255) * (1 - t));
	return `rgb(${Math.round(i)}, ${Math.round(a)}, ${Math.round(o)})`;
}
function Fe(e) {
	switch (e) {
		case "editor": return "editing";
		case "reviewer": return "reviewing";
		case "reader": return "reading";
		default: return "";
	}
}
function Ie(e) {
	if (!e) return "";
	let t = Math.floor((Date.now() - e) / 1e3);
	return t < 5 ? "" : t < 60 ? `, ${t}s` : t < 3600 ? `, ${Math.floor(t / 60)}m` : `, ${Math.floor(t / 3600)}h`;
}
function Le(e) {
	switch (e) {
		case "editor": return {
			bg: "#dbeafe",
			text: "#1d4ed8"
		};
		case "reviewer": return {
			bg: "#fef3c7",
			text: "#92400e"
		};
		case "reader": return {
			bg: "var(--color-surface-hover)",
			text: "var(--color-neutral)"
		};
		default: return {
			bg: "var(--color-surface-hover)",
			text: "var(--color-neutral)"
		};
	}
}
function Re({ onJump: e, label: t, children: n }) {
	return e ? /* @__PURE__ */ L("button", {
		type: "button",
		onClick: e,
		"aria-label": `Jump to ${t}`,
		className: p("relative inline-block bg-transparent border-none p-0 m-0 cursor-pointer font-[inherit]"),
		children: n
	}) : /* @__PURE__ */ L("span", {
		tabIndex: 0,
		role: "img",
		"aria-label": t,
		className: p("relative inline-block"),
		"data-testid": "participant-avatar-static",
		children: n
	});
}
function ze({ participant: e, sectionTitle: t, onJumpToUser: n, onFollowUser: r, isFollowing: i }) {
	let [a, o] = F(!1), s = P(null), c = P(null), l = () => {
		c.current &&= (clearTimeout(c.current), null), o(!0);
	}, u = () => {
		c.current = setTimeout(() => o(!1), 150);
	};
	j(() => () => {
		c.current && clearTimeout(c.current);
	}, []);
	let d = Le(e.mode), f = e.color || "#3b82f6";
	return /* @__PURE__ */ R("div", {
		ref: s,
		className: p("flex flex-col items-center gap-[3px] relative animate-[presenceFadeIn_0.3s_ease]"),
		onMouseEnter: l,
		onMouseLeave: u,
		onFocus: l,
		onBlur: (e) => {
			e.currentTarget.contains(e.relatedTarget) || u();
		},
		children: [
			/* @__PURE__ */ R(Re, {
				onJump: n ? () => n(e) : void 0,
				label: e.displayName,
				children: [/* @__PURE__ */ L("div", {
					className: p("w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-semibold transition-[transform,box-shadow] duration-200 ease-in-out", a ? "scale-110" : "scale-100"),
					style: {
						background: `linear-gradient(135deg, ${f}, ${Pe(f, .2)})`,
						boxShadow: a ? `0 0 0 2px ${f}40` : "none"
					},
					children: Ne(e.displayName)
				}), /* @__PURE__ */ L("div", { className: p("absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white", e.idle ? "bg-warning" : "bg-success [animation:presencePulse_2s_infinite]") })]
			}),
			a && /* @__PURE__ */ R("div", {
				className: p("absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-surface-inverse text-text-inverse py-2 px-3 rounded-md text-xs whitespace-nowrap z-[100] pointer-events-auto shadow-[0_4px_12px_rgba(0,0,0,0.15)] leading-snug"),
				onMouseEnter: l,
				onMouseLeave: u,
				children: [
					/* @__PURE__ */ L("div", {
						className: p("font-semibold mb-0.5"),
						children: e.displayName
					}),
					/* @__PURE__ */ R("div", {
						className: p("text-text-tertiary text-[11px]"),
						children: [e.idle ? "away" : Fe(e.mode), Ie(e.lastSeen)]
					}),
					t && /* @__PURE__ */ R("div", {
						className: p("text-text-tertiary text-[11px] mt-0.5"),
						children: ["§ ", t]
					}),
					r && /* @__PURE__ */ L("button", {
						type: "button",
						onClick: (t) => {
							t.stopPropagation(), r(e);
						},
						className: p("mt-1 text-[11px] font-semibold cursor-pointer bg-transparent border-none p-0 font-[inherit]", i ? "text-warning-fg" : "text-info-fg"),
						children: i ? "Stop following" : "Follow"
					})
				]
			}),
			/* @__PURE__ */ R("span", {
				className: p("text-[11px] font-semibold px-2 py-px rounded-full leading-4"),
				style: {
					background: e.idle ? "#fef3c7" : d.bg,
					color: e.idle ? "#92400e" : d.text
				},
				children: [e.idle ? "away" : Fe(e.mode), Ie(e.lastSeen)]
			}),
			i && /* @__PURE__ */ L("span", {
				className: p("text-[10px] font-semibold text-info-fg"),
				children: "following"
			}),
			t && /* @__PURE__ */ R("span", {
				className: p("text-[10px] text-neutral max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap text-center"),
				children: ["§ ", t]
			})
		]
	});
}
function Be({ participants: e, sections: t, onJumpToUser: n, onFollowUser: r, followingUserId: i }) {
	let a = /* @__PURE__ */ new Map();
	if (t) for (let e of t) a.set(e.id, e.title);
	return e.length === 0 ? null : /* @__PURE__ */ R("div", {
		"data-testid": "participant-avatars",
		className: p("flex items-center gap-0"),
		children: [/* @__PURE__ */ L("div", {
			className: p("flex gap-2.5 items-start py-1"),
			children: e.filter((e, t, n) => n.findIndex((t) => (t.userId || t.clientId) === (e.userId || e.clientId)) === t).map((e) => /* @__PURE__ */ L(ze, {
				participant: e,
				sectionTitle: e.currentSectionId ? a.get(e.currentSectionId) : void 0,
				onJumpToUser: n,
				onFollowUser: r,
				isFollowing: i === (e.userId || e.clientId)
			}, e.clientId))
		}), /* @__PURE__ */ L("div", { className: p("w-px h-9 bg-border mx-1 self-center") })]
	});
}
//#endregion
//#region src/components/doc-editor/DocumentSaveStatus.tsx
var $ = {
	pending: "Saving…",
	saved: "Saved",
	error: "Changes not saved",
	offline: "Offline — changes not saved"
};
function Ve({ state: e, className: t }) {
	return e ? /* @__PURE__ */ R("span", {
		role: "status",
		"aria-live": "polite",
		"data-testid": "document-save-status",
		"data-save-state": e.status,
		className: p(e.status === "error" ? "text-xs text-danger-fg" : "text-xs text-text-tertiary", t),
		children: [e.detail ?? $[e.status], (e.status === "error" || e.status === "offline") && e.onRetry && /* @__PURE__ */ L(h, {
			variant: "ghost",
			size: "sm",
			onClick: e.onRetry,
			children: "Retry save"
		})]
	}) : null;
}
//#endregion
//#region src/components/doc-editor/LegacyDocumentHeader.tsx
var He = {
	draft: {
		bg: "var(--color-warning-bg)",
		text: "var(--color-warning-fg)"
	},
	review: {
		bg: "var(--color-info-bg)",
		text: "var(--color-info-fg)"
	},
	final: {
		bg: "var(--color-success-bg)",
		text: "var(--color-success-fg)"
	}
}, Ue = {
	idle: "Call",
	available: "Join Call",
	active: "In Call"
}, We = {
	idle: "bg-surface text-text-primary border-border-field",
	available: "bg-info-bg text-info-fg border-info-border",
	active: "bg-success-bg text-success-fg border-success-border"
}, Ge = [
	{
		mode: "editor",
		label: "Editor"
	},
	{
		mode: "ack",
		label: "Review"
	},
	{
		mode: "reader",
		label: "Read"
	}
];
function Ke({ meta: e, saveState: t, mode: n, onModeChange: r, participants: i, onUpdateMeta: a, onExport: o, onToggleHistory: s, onToggleVideoCall: c, onToggleVideoHistory: l, isCallActive: u, callVariant: d, callLabel: f, onClearDocument: m, onJumpToUser: h, sections: g, onToggleMyItems: _, myItemCount: v, commentCount: y, onBack: b, onFollowUser: x, followingUserId: S, onFinalize: C, onUnlock: w, pastCallsCount: ee, extraMenuItems: te }) {
	let [ne, E] = F(!1), D = He[e.status] ?? He.draft, O = d ?? (u ? "active" : "idle");
	return /* @__PURE__ */ R("header", {
		className: p("flex flex-col py-2 px-4 bg-surface border-b border-border shrink-0 gap-1.5 sticky top-[53px] z-[34]"),
		children: [/* @__PURE__ */ R("div", {
			className: p("flex items-center justify-between"),
			children: [/* @__PURE__ */ R("div", {
				className: p("flex items-center gap-2.5"),
				children: [
					b && /* @__PURE__ */ L("button", {
						onClick: b,
						className: p("bg-transparent border-none text-info-fg cursor-pointer text-[13px] p-0 flex items-center gap-1 font-[inherit]"),
						children: "← Documents"
					}),
					/* @__PURE__ */ L(T, {
						"aria-label": "Document title",
						className: p("w-auto h-auto min-w-[180px] text-base font-semibold border-transparent bg-transparent py-1 px-2"),
						value: e.title,
						placeholder: "Untitled document",
						onChange: (e) => a({ title: e.target.value })
					}),
					/* @__PURE__ */ L("span", {
						className: p("inline-block text-[11px] font-semibold py-0.5 px-2.5 rounded-full"),
						style: {
							background: D.bg,
							color: D.text
						},
						children: e.status
					}),
					/* @__PURE__ */ L(Ve, { state: t }),
					e.updatedAt && /* @__PURE__ */ R("span", {
						className: p("text-[11px] text-text-tertiary"),
						children: ["Last edited ", (() => {
							let t = Date.now() - new Date(e.updatedAt).getTime(), n = Math.floor(t / 6e4);
							if (n < 1) return "just now";
							if (n < 60) return `${n}m ago`;
							let r = Math.floor(n / 60);
							return r < 24 ? `${r}h ago` : `${Math.floor(r / 24)}d ago`;
						})()]
					}),
					y != null && y > 0 && /* @__PURE__ */ R("span", {
						className: p("inline-flex items-center gap-1 text-[11px] font-semibold py-0.5 px-2.5 rounded-full bg-surface-hover text-text-secondary"),
						children: [/* @__PURE__ */ L("svg", {
							width: "12",
							height: "12",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: /* @__PURE__ */ L("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
						}), y]
					})
				]
			}), i.length > 0 && /* @__PURE__ */ L(Be, {
				participants: i,
				sections: g,
				onJumpToUser: h,
				onFollowUser: x,
				followingUserId: S
			})]
		}), /* @__PURE__ */ R("div", {
			className: p("flex items-center justify-between flex-wrap gap-1"),
			children: [/* @__PURE__ */ L("div", {
				className: p("flex gap-1"),
				children: Ge.map(({ mode: e, label: t }) => /* @__PURE__ */ L("button", {
					type: "button",
					"data-testid": `mode-btn-${e}`,
					className: p("py-1.5 px-3.5 text-[13px] font-semibold border border-border-field rounded-md cursor-pointer font-[inherit]", n === e ? "bg-info text-white" : "bg-surface text-text-primary"),
					onClick: () => r(e),
					children: t
				}, e))
			}), /* @__PURE__ */ R("div", {
				className: p("flex items-center gap-2"),
				children: [
					_ && /* @__PURE__ */ R("button", {
						type: "button",
						className: p("py-1.5 px-3 text-[13px] font-medium border border-border-field rounded-md bg-surface text-text-primary cursor-pointer font-[inherit] relative"),
						onClick: _,
						children: ["My Items", v ? ` (${v})` : ""]
					}),
					c && /* @__PURE__ */ L("button", {
						type: "button",
						"aria-pressed": O === "active",
						"data-call-variant": O,
						className: p("py-1.5 px-3 text-[13px] font-medium border rounded-md cursor-pointer font-[inherit] relative", We[O]),
						onClick: c,
						children: f ?? Ue[O]
					}),
					e.status === "final" ? w && /* @__PURE__ */ L("button", {
						type: "button",
						className: p("py-1.5 px-3 text-[13px] font-medium border border-success-border rounded-md bg-success-bg text-success-fg cursor-pointer font-[inherit] relative"),
						onClick: w,
						children: "Unlock"
					}) : C && /* @__PURE__ */ L("button", {
						type: "button",
						className: p("py-1.5 px-3 text-[13px] font-medium border border-success-border rounded-md bg-success-bg text-success-fg cursor-pointer font-[inherit] relative"),
						onClick: C,
						children: "Finalize"
					}),
					/* @__PURE__ */ R("div", {
						className: p("relative"),
						children: [/* @__PURE__ */ L("button", {
							type: "button",
							className: p("py-1.5 px-3 text-[13px] font-medium border border-border-field rounded-md bg-surface text-text-primary cursor-pointer font-[inherit] relative tracking-wider"),
							onClick: () => E((e) => !e),
							title: "More actions",
							children: "⋯"
						}), ne && /* @__PURE__ */ R("div", {
							className: p("absolute top-full right-0 mt-1 bg-surface border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50 min-w-[160px] overflow-hidden"),
							children: [
								/* @__PURE__ */ L("button", {
									type: "button",
									className: p("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover"),
									onClick: () => {
										s(), E(!1);
									},
									children: "History"
								}),
								l && (ee ?? 0) > 0 && /* @__PURE__ */ R("button", {
									type: "button",
									className: p("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover"),
									onClick: () => {
										l(), E(!1);
									},
									children: [
										"Past Calls (",
										ee,
										")"
									]
								}),
								te?.map((e) => /* @__PURE__ */ L("button", {
									type: "button",
									"data-testid": `document-header-menu-${e.id}`,
									className: p("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover"),
									onClick: () => {
										e.onSelect(), E(!1);
									},
									children: e.label
								}, e.id)),
								/* @__PURE__ */ L("div", { className: p("border-t border-border-subtle my-1") }),
								[
									"markdown",
									"pdf",
									"json"
								].map((e) => /* @__PURE__ */ R("button", {
									type: "button",
									className: p("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover"),
									onClick: () => {
										o(e), E(!1);
									},
									children: ["Export ", e.charAt(0).toUpperCase() + e.slice(1)]
								}, e)),
								/* @__PURE__ */ L("div", { className: p("border-t border-border-subtle my-1") }),
								/* @__PURE__ */ L("button", {
									type: "button",
									className: p("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-danger-fg text-left cursor-pointer font-[inherit] hover:bg-danger-bg"),
									onClick: () => {
										E(!1), window.confirm("Clear all document content? This cannot be undone.") && m();
									},
									children: "Clear Document"
								})
							]
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
//#region src/components/doc-editor/DocumentModePill.tsx
var qe = {
	editing: {
		label: "Editing",
		tone: "info"
	},
	suggesting: {
		label: "Suggesting",
		tone: "warning"
	},
	review: {
		label: "Review",
		tone: "accent"
	},
	read: {
		label: "Read",
		tone: "neutral"
	}
}, Je = {
	editing: qe.editing.label,
	suggesting: qe.suggesting.label,
	review: qe.review.label,
	read: qe.read.label
};
function Ye({ mode: e, reason: t, className: n, "data-testid": r = "document-mode-pill" }) {
	let { label: i, tone: a } = qe[e];
	return /* @__PURE__ */ L("span", {
		className: p("inline-flex items-center", n),
		title: t,
		"aria-label": t ? `${i}. ${t}` : i,
		"data-testid": r,
		"data-mode": e,
		children: /* @__PURE__ */ L(C, {
			tone: a,
			size: "sm",
			className: "rounded-full px-2.5",
			children: i
		})
	});
}
//#endregion
//#region src/components/doc-editor/DocumentOwnership.tsx
function Xe({ owner: e, collaborators: t = [], maxAvatars: n = 3, onShare: r, className: i, "data-testid": a = "document-ownership" }) {
	if (!e) return null;
	let o = t.slice(0, n), s = t.length - o.length;
	return /* @__PURE__ */ R("span", {
		"data-testid": a,
		className: p("inline-flex items-center gap-2", i),
		children: [
			/* @__PURE__ */ R("span", {
				className: "inline-flex items-center gap-1.5",
				children: [/* @__PURE__ */ L(te, {
					name: e.displayName,
					size: 20,
					...e.avatarUrl ? { src: e.avatarUrl } : {}
				}), /* @__PURE__ */ R("span", {
					className: "text-xs text-text-secondary",
					"data-testid": `${a}-owner`,
					children: ["Owned by ", /* @__PURE__ */ L("span", {
						className: "font-medium text-text-primary",
						children: e.displayName
					})]
				})]
			}),
			o.length > 0 && /* @__PURE__ */ R("span", {
				className: "inline-flex items-center",
				"data-testid": `${a}-collaborators`,
				children: [o.map((e, t) => /* @__PURE__ */ L("span", {
					className: p("inline-flex rounded-full ring-2 ring-surface", t > 0 && "-ml-1.5"),
					title: e.displayName,
					children: /* @__PURE__ */ L(te, {
						name: e.displayName,
						size: 20,
						...e.avatarUrl ? { src: e.avatarUrl } : {}
					})
				}, e.userId)), s > 0 && /* @__PURE__ */ R("span", {
					"data-testid": `${a}-overflow`,
					title: t.slice(n).map((e) => e.displayName).join(", "),
					className: "-ml-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-surface-inset px-1 text-[10px] font-semibold text-text-secondary ring-2 ring-surface",
					children: ["+", s]
				})]
			}),
			r && /* @__PURE__ */ L("button", {
				type: "button",
				onClick: r,
				"data-testid": `${a}-share`,
				className: "rounded border border-border px-2 py-0.5 text-xs font-medium text-text-secondary hover:bg-surface-hover hover:text-text-primary",
				children: "Share"
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/WorkspaceDocumentHeader.tsx
var Ze = "flex shrink-0 flex-col gap-1.5 border-b border-border bg-surface px-4 py-2 text-text-primary", Qe = "flex-1 min-w-[180px] rounded-[4px] border border-transparent bg-transparent px-2 py-1 font-[inherit] text-[16px] font-semibold text-text-primary outline-none focus:border-primary", $e = "text-[11px] text-text-tertiary", et = 6, tt = {
	active: "bg-success-bg text-success-fg border-success-border",
	available: "bg-info-bg text-info-fg border-info-border",
	idle: ""
}, nt = {
	submit_for_review: "Submit for review",
	withdraw: "Withdraw from review",
	approve: "Approve",
	request_changes: "Request changes",
	revise: "Back to draft",
	reopen: "Reopen",
	finalize: "Finalize"
}, rt = {
	submit_for_review: "The document goes to its designated reviewers, who are then expected to respond.",
	withdraw: "The document goes back to draft and the reviewers stop being asked for a verdict.",
	approve: "The document is signed off and becomes read-only until its owner reopens it.",
	request_changes: "The document goes back to its owner with your objection attached.",
	revise: "The document returns to draft so the requested changes can be made.",
	reopen: "An approved document becomes editable again, and its sign-off no longer stands.",
	finalize: "The document is closed permanently. It becomes read-only for everyone, and there is no unlock: no owner, reviewer or administrator can reopen it afterwards, and no further reviews can be requested on it. This is the only action in the document that cannot be undone."
}, it = "FINALIZE", at = ["finalize"], ot = ["request_changes"], st = {
	draft: "neutral",
	in_review: "pending",
	changes_requested: "warning",
	approved: "success",
	finalized: "neutral"
};
function ct(e) {
	let t = e.replace(/_/g, " ");
	return t.charAt(0).toUpperCase() + t.slice(1);
}
var lt = {
	forbidden: "You are not allowed to make this change.",
	conflict: "Someone else changed this document — the latest status has been reloaded.",
	network: "The server could not be reached, so nothing was changed.",
	invalid: "That change is not possible from the document’s current status.",
	busy: "A status change is already in progress.",
	unknown: "The server refused the change."
};
function ut(e) {
	return !!e && e.kind === "forbidden" && /no established owner/i.test(e.message);
}
function dt({ variant: e = "bar", actionsLayout: t = "cluster", menuTrigger: n = "boxed", saveState: r, workflowActions: i, formatActions: a, className: o, titleEditable: s, onPrint: c, exportFormats: l = [
	"markdown",
	"pdf",
	"json"
], meta: u, mode: d, suggesting: f = !1, modeReason: m, participants: S, onUpdateMeta: T, onExport: ee, extraMenuItems: te, onToggleHistory: E, onToggleVideoCall: D, onToggleVideoHistory: O, callVariant: k, callLabel: re, onClearDocument: ie, onJumpToUser: ae, sections: A, onToggleMyItems: j, onToggleChat: M, chatRoomName: N, chatUnreadCount: P, formatActionsRef: z, myItemCount: B, commentCount: V, onBack: oe, onFollowUser: H, followingUserId: U, pastCallsCount: se, onShareToRoom: ce, shareRoomName: W, sharingToRoom: G, shareStatus: K, onDismissShareStatus: le, lifecycleStatus: ue, owner: de, collaborators: fe, onShare: q, lifecycleTerminal: pe, lifecycleLegacyClaim: J, lifecycleActions: Y, lifecycleLoading: me, lifecycleBusy: X, lifecycleError: he, onDismissLifecycleError: ge, onLifecycleAction: _e, onClaimOwnership: ve }) {
	let [ye, be] = F(!1), [Z, xe] = F(null), [Se, Ce] = F(""), [we, Te] = F(""), [Ee, Q] = F(!1), De = Y ?? [], Oe = Z != null && ot.includes(Z), ke = Z != null && at.includes(Z), Ae = !ke || we.trim().toUpperCase() === it, je = () => {
		xe(null), Ce(""), Te("");
	}, Me = u.title.trim() || "Untitled document", Ne = te ?? [], Pe = Ne.filter((e) => e.id.startsWith("share-")), Fe = Ne.filter((e) => e.id.startsWith("insert-")), Ie = Ne.filter((e) => e.id.startsWith("toggle-")), Le = Ne.filter((e) => !e.id.startsWith("share-") && !e.id.startsWith("insert-") && !e.id.startsWith("toggle-")), Re = (e) => ({
		label: e.label,
		onSelect: e.onSelect,
		"data-testid": `document-header-menu-${e.id}`
	}), ze = (e) => ({
		...Re(e),
		label: e.label.replace(/^(Hide|Show) /, "").replace(/^From what you said$/, "Spoken items").replace(/^./, (e) => e.toUpperCase()),
		checked: /^Hide /.test(e.label)
	}), $ = e === "actions" && t === "menu", He = d === "editor" ? f ? "suggesting" : "editing" : d === "ack" ? "review" : "read", Ue = de?.displayName ? `Owned by ${de.displayName}` : void 0, We = [
		...$ ? [{
			...Ue ? { label: Ue } : {},
			"data-testid": "document-header-menu-about",
			items: [{
				label: Je[He],
				...m ? { description: m } : {},
				"data-testid": "document-header-menu-mode"
			}, ...j ? [{
				label: "My items",
				...B ? { trailing: String(B) } : {},
				onSelect: j,
				"data-testid": "document-header-menu-my-items"
			}] : []]
		}, ..._e && (De.length > 0 || ve) ? [{
			label: "Review",
			"data-testid": "document-header-menu-lifecycle",
			items: [...De.map((e) => ({
				label: nt[e],
				...e === "finalize" ? { danger: !0 } : {},
				onSelect: () => {
					X || (Ce(""), Te(""), xe(e));
				},
				"data-testid": `lifecycle-action-${e}`
			})), ...ve ? [{
				label: "Take ownership",
				onSelect: () => Q(!0),
				"data-testid": "claim-ownership-btn"
			}] : []]
		}] : []] : [],
		{ items: [
			...E ? [{
				label: "Version history",
				onSelect: E,
				"data-testid": "document-header-history"
			}] : [],
			...O && (se ?? 0) > 0 ? [{
				label: "Past calls",
				trailing: String(se),
				onSelect: O
			}] : [],
			...Le.map(Re),
			...Ie.map(ze)
		] },
		...Pe.length > 0 || Fe.length > 0 ? [{ items: [...Pe.length > 0 ? [{
			label: "Share to…",
			description: `${Pe.length} conversation${Pe.length === 1 ? "" : "s"}`,
			"data-testid": "document-header-menu-share",
			submenu: [{
				"data-testid": "document-header-menu-extras",
				scroll: Pe.length > et,
				items: Pe.map((e) => ({
					...Re(e),
					label: e.label.replace(/^Share to /, "")
				}))
			}]
		}] : [], ...Fe.length > 0 ? [{
			label: "Insert…",
			"data-testid": "document-header-menu-insert",
			submenu: [{ items: Fe.map((e) => ({
				...Re(e),
				label: e.label.replace(/^Insert (a |an )?/, "").replace(/^./, (e) => e.toUpperCase())
			})) }]
		}] : []] }] : [],
		{ items: [...c ? [{
			label: "Print",
			trailing: "⌘P",
			onSelect: c,
			"data-testid": "document-header-print"
		}] : [], ...ee && l.length > 0 ? [{
			label: "Download as…",
			"data-testid": "document-header-menu-download",
			submenu: [{ items: l.map((e) => ({
				label: {
					markdown: "Markdown (.md)",
					pdf: "PDF (.pdf)",
					json: "JSON (.json)"
				}[e],
				onSelect: () => ee(e),
				"data-testid": `document-header-export-${e}`
			})) }]
		}] : []] },
		...ie ? [{ items: [{
			label: "Clear document",
			danger: !0,
			onSelect: () => be(!0),
			"data-testid": "clear-document-btn"
		}] }] : []
	], Ge = /* @__PURE__ */ R(I, { children: [
		/* @__PURE__ */ R(w, {
			open: Z != null,
			tone: ke ? "destructive" : Oe ? "caution" : "info",
			title: Z ? `${nt[Z]} — “${Me}”?` : "",
			body: Z ? rt[Z] : "",
			confirmLabel: Z ? nt[Z] : "Confirm",
			cancelLabel: ke ? "Keep it open" : "Cancel",
			confirmDisabled: Oe && Se.trim().length === 0 || !Ae,
			onConfirm: () => {
				let e = Z, t = Se.trim();
				je(), e && _e?.(e, t || void 0);
			},
			onCancel: je,
			children: [
				ke && /* @__PURE__ */ R("div", {
					className: "mb-3",
					children: [/* @__PURE__ */ R("label", {
						className: "mb-1 block text-xs font-semibold text-[var(--color-text-primary)]",
						htmlFor: "lifecycle-finalize-confirm",
						children: [
							"Type ",
							it,
							" to confirm"
						]
					}), /* @__PURE__ */ L("input", {
						id: "lifecycle-finalize-confirm",
						"data-testid": "lifecycle-finalize-confirm-input",
						value: we,
						autoComplete: "off",
						onChange: (e) => Te(e.target.value),
						placeholder: it,
						className: "w-full rounded-md border border-[var(--color-border-field)] bg-[var(--color-surface)] p-2 font-mono text-sm text-[var(--color-text-primary)]"
					})]
				}),
				/* @__PURE__ */ L("label", {
					className: "mb-1 block text-xs font-semibold text-[var(--color-text-primary)]",
					htmlFor: "lifecycle-reason",
					children: Oe ? "Reason (required)" : "Reason (optional)"
				}),
				/* @__PURE__ */ L("textarea", {
					id: "lifecycle-reason",
					"data-testid": "lifecycle-reason-input",
					value: Se,
					rows: 3,
					onChange: (e) => Ce(e.target.value),
					placeholder: Oe ? "What needs to change, and why?" : ke ? "Recorded against this document permanently" : "Anything the others should know",
					className: "w-full rounded-md border border-[var(--color-border-field)] bg-[var(--color-surface)] p-2 text-[13px] text-[var(--color-text-primary)]"
				})
			]
		}),
		/* @__PURE__ */ L(w, {
			open: Ee,
			tone: "caution",
			title: `Take ownership of “${Me}”?`,
			body: "You become the owner of this document. Owner-only actions — submitting it for review, reopening it after approval — become yours, and nobody else can claim it afterwards. The claim is recorded against your name.",
			confirmLabel: "Take ownership",
			cancelLabel: "Leave it unowned",
			onConfirm: () => {
				Q(!1), ve?.();
			},
			onCancel: () => Q(!1)
		}),
		/* @__PURE__ */ L(w, {
			open: ye,
			tone: "destructive",
			title: `Clear “${Me}”?`,
			body: "Every section and everything written in it is removed — for everyone in the document, not just on your screen. There is no undo; the only way back is restoring an earlier version from History.",
			confirmLabel: "Clear document",
			cancelLabel: "Keep content",
			onConfirm: () => {
				be(!1), ie?.();
			},
			onCancel: () => be(!1)
		})
	] });
	return e === "actions" ? /* @__PURE__ */ R("div", {
		"data-testid": "document-header",
		"data-variant": "actions",
		className: p("flex min-w-0 flex-wrap items-center justify-end gap-2", o),
		children: [
			!$ && (de !== void 0 || fe !== void 0 || q) && /* @__PURE__ */ L(Xe, {
				owner: de ?? null,
				collaborators: fe ?? [],
				...q ? { onShare: q } : {}
			}),
			pe && /* @__PURE__ */ L("span", {
				"data-testid": "lifecycle-terminal-note",
				className: "text-[11px] italic text-[var(--color-text-tertiary)]",
				children: "Closed permanently — no further changes, for anyone"
			}),
			!$ && V != null && V > 0 && /* @__PURE__ */ L(C, {
				tone: "neutral",
				size: "sm",
				className: "rounded-full px-2.5",
				icon: /* @__PURE__ */ L(y, { size: 12 }),
				children: V
			}),
			S.length > 0 && /* @__PURE__ */ L(Be, {
				participants: S,
				sections: A,
				onJumpToUser: ae,
				onFollowUser: H,
				followingUserId: U
			}),
			!$ && /* @__PURE__ */ L(Ye, {
				mode: He,
				...m ? { reason: m } : {}
			}),
			/* @__PURE__ */ R("div", {
				className: "flex items-center gap-2",
				children: [
					i,
					a,
					z && /* @__PURE__ */ L("div", {
						ref: z,
						className: "flex items-center gap-2"
					}),
					!$ && j && /* @__PURE__ */ R(h, {
						variant: "secondary",
						size: "sm",
						onClick: j,
						children: ["My Items", B ? ` (${B})` : ""]
					}),
					(M || ce || D && (k === "available" || k === "active")) && /* @__PURE__ */ R("div", {
						className: "flex h-8 items-center gap-0.5 rounded-md border border-border bg-surface pl-0.5 pr-0.5",
						"data-testid": "document-room-pill",
						"data-room": N ?? W ?? "",
						children: [
							M ? /* @__PURE__ */ R(h, {
								variant: "ghost",
								size: "sm",
								className: "inline-flex items-center gap-1.5 whitespace-nowrap border-0",
								"data-testid": "document-chat-toggle",
								onClick: M,
								title: N ? `Open the conversation in ${N}` : "Open this page’s conversation",
								children: [
									/* @__PURE__ */ L(y, { size: 13 }),
									/* @__PURE__ */ L("span", { children: N ? `#${N}` : "Conversation" }),
									P ? /* @__PURE__ */ L(C, {
										tone: "accent",
										size: "xs",
										mono: !0,
										"data-testid": "document-chat-unread",
										children: P
									}) : null
								]
							}) : N ?? W ? /* @__PURE__ */ R("span", {
								className: "px-1.5 text-xs font-medium text-text-primary",
								children: ["#", N ?? W]
							}) : null,
							ce && /* @__PURE__ */ L(g, {
								"aria-label": G ? "Sharing…" : `Share to #${W ?? "room"}`,
								title: W ? `Post a link to this page in #${W}` : "Post a link to this page in the room",
								variant: "ghost",
								size: "sm",
								className: "border-0",
								"data-testid": "share-to-room-btn",
								"data-sharing": G ? "true" : "false",
								disabled: G,
								onClick: ce,
								icon: /* @__PURE__ */ L(b, { size: 13 })
							}),
							D && k === "available" && /* @__PURE__ */ L(h, {
								variant: "primary",
								size: "sm",
								onClick: D,
								"data-call-variant": "available",
								"data-testid": "doc-call-button",
								title: "This room has a call going — join it",
								children: re ?? "Join call"
							}),
							D && k === "active" && /* @__PURE__ */ L(h, {
								variant: "secondary",
								size: "sm",
								className: tt.active,
								onClick: D,
								"aria-pressed": !0,
								"data-call-variant": "active",
								"data-testid": "doc-call-button",
								children: re ?? "In call"
							})
						]
					}),
					K && /* @__PURE__ */ R("span", {
						role: "status",
						"data-testid": "share-to-room-status",
						"data-tone": K.tone,
						className: `inline-flex items-center gap-1 text-[12px] ${K.tone === "error" ? "text-danger-fg" : "text-success-fg"}`,
						children: [K.text, K.tone === "error" && le && /* @__PURE__ */ L(g, {
							"aria-label": "Dismiss share error",
							variant: "ghost",
							size: "sm",
							onClick: le,
							className: "border-none p-0 text-current",
							icon: /* @__PURE__ */ L(v, { size: 12 })
						})]
					}),
					!$ && _e && /* @__PURE__ */ R("div", {
						"data-testid": "lifecycle-actions",
						className: "flex items-center gap-1.5",
						children: [
							me && De.length === 0 && /* @__PURE__ */ L("span", {
								"data-testid": "lifecycle-loading",
								className: "text-xs text-[var(--color-text-tertiary)]",
								children: "Checking review status…"
							}),
							De.map((e) => /* @__PURE__ */ L(h, {
								type: "button",
								size: "sm",
								variant: e === "finalize" ? "danger" : "secondary",
								"data-testid": `lifecycle-action-${e}`,
								disabled: X,
								onClick: () => {
									Ce(""), Te(""), xe(e);
								},
								children: nt[e]
							}, e)),
							ve && /* @__PURE__ */ L(h, {
								type: "button",
								size: "sm",
								variant: "secondary",
								"data-testid": "claim-ownership-btn",
								onClick: () => Q(!0),
								children: "Take ownership"
							})
						]
					}),
					We.some((e) => e.items.length > 0) && /* @__PURE__ */ L(x, {
						trigger: $ ? /* @__PURE__ */ L(_, { size: 18 }) : /* @__PURE__ */ L("span", {
							className: "tracking-wide",
							children: "⋯"
						}),
						triggerLabel: "More actions",
						triggerTitle: "More actions",
						triggerClassName: $ ? n === "ghost" ? "h-8 w-8 p-0 rounded-md border-0 bg-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary" : "h-10 w-10 p-0 rounded-md border border-border bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary" : "h-8 rounded-md border border-border bg-surface px-2.5 text-[13px] text-text-primary hover:bg-surface-hover",
						align: "end",
						"data-testid": "document-header-menu",
						sections: We
					})
				]
			}),
			Ge
		]
	}) : /* @__PURE__ */ R("header", {
		"data-testid": "document-header",
		className: p(Ze, o),
		children: [
			/* @__PURE__ */ R("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ R("div", {
					className: "flex flex-1 min-w-0 items-center gap-[10px]",
					children: [
						oe && /* @__PURE__ */ L(h, {
							variant: "ghost",
							size: "sm",
							onClick: oe,
							className: "border-none px-0 py-0.5 text-[13px] font-normal text-primary",
							children: "← Documents"
						}),
						/* @__PURE__ */ L("input", {
							"aria-label": "Document title",
							readOnly: !(s ?? d === "editor") || !T,
							className: Qe,
							value: u.title,
							placeholder: "Untitled document",
							onChange: (e) => {
								(s ?? d === "editor") && T && T({ title: e.target.value });
							}
						}),
						ue && /* @__PURE__ */ L(ne, {
							"data-testid": "lifecycle-status",
							state: st[ue],
							label: ct(ue)
						}),
						(de !== void 0 || fe !== void 0 || q) && /* @__PURE__ */ L(Xe, {
							owner: de ?? null,
							collaborators: fe ?? [],
							...q ? { onShare: q } : {}
						}),
						pe && /* @__PURE__ */ L("span", {
							"data-testid": "lifecycle-terminal-note",
							className: "text-[11px] italic text-[var(--color-text-tertiary)]",
							children: "Closed permanently — no further changes, for anyone"
						}),
						/* @__PURE__ */ L(Ve, { state: r }),
						u.updatedAt && /* @__PURE__ */ R("span", {
							className: $e,
							children: ["Last edited ", (() => {
								let e = Date.now() - new Date(u.updatedAt).getTime(), t = Math.floor(e / 6e4);
								if (t < 1) return "just now";
								if (t < 60) return `${t}m ago`;
								let n = Math.floor(t / 60);
								return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
							})()]
						}),
						V != null && V > 0 && /* @__PURE__ */ L(C, {
							tone: "neutral",
							size: "sm",
							className: "rounded-full px-2.5",
							icon: /* @__PURE__ */ L(y, { size: 12 }),
							children: V
						})
					]
				}), S.length > 0 && /* @__PURE__ */ L(Be, {
					participants: S,
					sections: A,
					onJumpToUser: ae,
					onFollowUser: H,
					followingUserId: U
				})]
			}),
			/* @__PURE__ */ R("div", {
				className: "flex flex-wrap items-center justify-between gap-1",
				children: [/* @__PURE__ */ L(Ye, {
					mode: d === "editor" ? f ? "suggesting" : "editing" : d === "ack" ? "review" : "read",
					...m ? { reason: m } : {}
				}), /* @__PURE__ */ R("div", {
					className: "flex items-center gap-2",
					children: [
						i,
						a,
						z && /* @__PURE__ */ L("div", {
							ref: z,
							className: "flex items-center gap-2"
						}),
						j && /* @__PURE__ */ R(h, {
							variant: "secondary",
							size: "sm",
							onClick: j,
							children: ["My Items", B ? ` (${B})` : ""]
						}),
						(M || ce || D && (k === "available" || k === "active")) && /* @__PURE__ */ R("div", {
							className: "flex h-8 items-center gap-0.5 rounded-md border border-border bg-surface pl-0.5 pr-0.5",
							"data-testid": "document-room-pill",
							"data-room": N ?? W ?? "",
							children: [
								M ? /* @__PURE__ */ R(h, {
									variant: "ghost",
									size: "sm",
									className: "inline-flex items-center gap-1.5 whitespace-nowrap border-0",
									"data-testid": "document-chat-toggle",
									onClick: M,
									title: N ? `Open the conversation in ${N}` : "Open this page’s conversation",
									children: [
										/* @__PURE__ */ L(y, { size: 13 }),
										/* @__PURE__ */ L("span", { children: N ? `#${N}` : "Conversation" }),
										P ? /* @__PURE__ */ L(C, {
											tone: "accent",
											size: "xs",
											mono: !0,
											"data-testid": "document-chat-unread",
											children: P
										}) : null
									]
								}) : N ?? W ? /* @__PURE__ */ R("span", {
									className: "px-1.5 text-xs font-medium text-text-primary",
									children: ["#", N ?? W]
								}) : null,
								ce && /* @__PURE__ */ L(g, {
									"aria-label": G ? "Sharing…" : `Share to #${W ?? "room"}`,
									title: W ? `Post a link to this page in #${W}` : "Post a link to this page in the room",
									variant: "ghost",
									size: "sm",
									className: "border-0",
									"data-testid": "share-to-room-btn",
									"data-sharing": G ? "true" : "false",
									disabled: G,
									onClick: ce,
									icon: /* @__PURE__ */ L(b, { size: 13 })
								}),
								D && k === "available" && /* @__PURE__ */ L(h, {
									variant: "primary",
									size: "sm",
									onClick: D,
									"data-call-variant": "available",
									"data-testid": "doc-call-button",
									title: "This room has a call going — join it",
									children: re ?? "Join call"
								}),
								D && k === "active" && /* @__PURE__ */ L(h, {
									variant: "secondary",
									size: "sm",
									className: tt.active,
									onClick: D,
									"aria-pressed": !0,
									"data-call-variant": "active",
									"data-testid": "doc-call-button",
									children: re ?? "In call"
								})
							]
						}),
						K && /* @__PURE__ */ R("span", {
							role: "status",
							"data-testid": "share-to-room-status",
							"data-tone": K.tone,
							className: `inline-flex items-center gap-1 text-[12px] ${K.tone === "error" ? "text-danger-fg" : "text-success-fg"}`,
							children: [K.text, K.tone === "error" && le && /* @__PURE__ */ L(g, {
								"aria-label": "Dismiss share error",
								variant: "ghost",
								size: "sm",
								onClick: le,
								className: "border-none p-0 text-current",
								icon: /* @__PURE__ */ L(v, { size: 12 })
							})]
						}),
						_e && /* @__PURE__ */ R("div", {
							"data-testid": "lifecycle-actions",
							className: "flex items-center gap-1.5",
							children: [
								me && De.length === 0 && /* @__PURE__ */ L("span", {
									"data-testid": "lifecycle-loading",
									className: "text-xs text-[var(--color-text-tertiary)]",
									children: "Checking review status…"
								}),
								De.map((e) => /* @__PURE__ */ L(h, {
									type: "button",
									size: "sm",
									variant: e === "finalize" ? "danger" : "secondary",
									"data-testid": `lifecycle-action-${e}`,
									disabled: X,
									onClick: () => {
										Ce(""), Te(""), xe(e);
									},
									children: nt[e]
								}, e)),
								ve && /* @__PURE__ */ L(h, {
									type: "button",
									size: "sm",
									variant: "secondary",
									"data-testid": "claim-ownership-btn",
									onClick: () => Q(!0),
									children: "Take ownership"
								})
							]
						}),
						We.some((e) => e.items.length > 0) && /* @__PURE__ */ L(x, {
							trigger: /* @__PURE__ */ L("span", {
								className: "tracking-wide",
								children: "⋯"
							}),
							triggerLabel: "More actions",
							triggerTitle: "More actions",
							triggerClassName: "h-8 rounded-md border border-border bg-surface px-2.5 text-[13px] text-text-primary hover:bg-surface-hover",
							align: "end",
							"data-testid": "document-header-menu",
							sections: We
						})
					]
				})]
			}),
			/* @__PURE__ */ L(ft, {
				lifecycleError: he,
				...ge ? { onDismissLifecycleError: ge } : {},
				lifecycleLegacyClaim: J,
				canClaimOwnership: !!ve
			}),
			Ge
		]
	});
}
function ft({ lifecycleError: e, onDismissLifecycleError: t, lifecycleLegacyClaim: n, canClaimOwnership: r = !1 }) {
	let i = ut(e), a = r ? !0 : void 0;
	return !e && !n ? null : /* @__PURE__ */ R(I, { children: [e && /* @__PURE__ */ L(S, {
		variant: e.kind === "conflict" ? "warning" : "error",
		...t ? { onDismiss: t } : {},
		children: /* @__PURE__ */ R("span", {
			"data-testid": "lifecycle-error",
			"data-kind": e.kind,
			children: [
				/* @__PURE__ */ L("strong", { children: lt[e.kind] }),
				" ",
				/* @__PURE__ */ L("span", {
					"data-testid": "lifecycle-error-detail",
					children: e.message
				}),
				i && /* @__PURE__ */ R(I, { children: [" ", /* @__PURE__ */ R("span", {
					"data-testid": "lifecycle-ownerless-note",
					children: ["Nobody owns this document yet. Ownership is never taken on your behalf —", a ? " use “Take ownership” above if it should be yours." : " its owner has to claim it deliberately."]
				})] })
			]
		})
	}), n && /* @__PURE__ */ R(S, {
		variant: "warning",
		title: "This document was marked final before the status moved to the server.",
		"data-testid": "lifecycle-legacy-claim",
		children: [
			"Nothing on the server records it being finalized, reviewed or approved, so it counts as",
			" ",
			/* @__PURE__ */ L("strong", { children: ct(n.serverStatus) }),
			" and is editable again. The old marker was a value any connected client could set, which is why it is not being taken as a status. To close it for good, take it through review and use Finalize — that route records who approved it and when."
		]
	})] });
}
function pt({ status: e, variant: t = "pill" }) {
	return /* @__PURE__ */ L(ne, {
		variant: t,
		"data-testid": "lifecycle-status",
		state: st[e],
		label: ct(e)
	});
}
//#endregion
//#region src/components/doc-editor/DocumentHeader.tsx
function mt(e) {
	return e.onModeChange ? /* @__PURE__ */ L(Ke, { ...e }) : /* @__PURE__ */ L(dt, { ...e });
}
//#endregion
//#region src/components/doc-editor/FollowModeBar.tsx
function ht({ followingUserId: e, participants: t, onStopFollow: n }) {
	let r = P(null), i = m(n);
	if (j(() => {
		if (!e) return;
		let t = setTimeout(() => {
			let e = () => i(), t = [
				"mousedown",
				"keydown",
				"wheel"
			];
			for (let n of t) window.addEventListener(n, e, {
				once: !0,
				passive: !0
			});
			r.current = () => {
				for (let n of t) window.removeEventListener(n, e);
			};
		}, 500);
		return () => {
			clearTimeout(t), r.current?.(), r.current = null;
		};
	}, [e, i]), !e) return null;
	let a = t.find((t) => (t.userId || t.clientId) === e);
	return a ? /* @__PURE__ */ R("div", {
		className: p("flex items-center justify-center gap-2 px-4 py-1.5 bg-info-bg border-b border-info-border text-[13px] font-medium text-info-fg shrink-0"),
		children: [/* @__PURE__ */ R("span", { children: ["Following ", a.displayName] }), /* @__PURE__ */ L("button", {
			onClick: n,
			className: p("bg-transparent border border-info-border rounded px-2 py-0.5 text-xs font-semibold text-info-fg cursor-pointer font-[inherit]"),
			children: "Stop"
		})]
	}) : null;
}
//#endregion
//#region src/components/ui/Panel.tsx
var gt = ({ children: e, variant: t = "light", width: n = 320, style: r }) => typeof document > "u" ? null : B(/* @__PURE__ */ L("div", {
	className: p("fixed right-0 top-0 h-full z-[60] flex flex-col shadow-[-4px_0_12px_rgba(0,0,0,0.08)]", t === "dark" ? "bg-call-chrome" : "bg-surface"),
	style: {
		width: n,
		...r
	},
	children: e
}), document.body), _t = ({ title: e, onClose: t, actions: n, variant: r = "light" }) => {
	let i = r === "dark";
	return /* @__PURE__ */ R("div", {
		className: p("flex items-center justify-between px-4 py-2", i ? "border-b border-white/10" : "border-b border-border"),
		children: [/* @__PURE__ */ L("span", {
			className: p("text-[13px] font-semibold", i ? "text-white" : "text-text-primary"),
			children: e
		}), /* @__PURE__ */ R("div", {
			className: "flex items-center gap-1",
			children: [n, /* @__PURE__ */ L("button", {
				type: "button",
				onClick: t,
				className: p("w-[22px] h-[22px] flex items-center justify-center", "bg-transparent border-none rounded-sm cursor-pointer", "text-sm p-0 leading-none", i ? "text-text-tertiary" : "text-text-secondary"),
				"aria-label": "Close panel",
				children: "×"
			})]
		})]
	});
}, vt = ({ children: e, padding: t }) => /* @__PURE__ */ L("div", {
	className: "flex-1 overflow-y-auto",
	style: { padding: t ?? "14px 12px" },
	children: e
}), yt = {
	default: "bg-surface text-text-primary border border-border",
	primary: "bg-success text-white border border-success",
	danger: "bg-danger text-white border border-danger"
}, bt = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-[13px]"
}, xt = ({ variant: e = "default", size: t = "md", style: n, type: r = "button", className: i, ...a }) => /* @__PURE__ */ L("button", {
	type: r,
	className: p("rounded-sm cursor-pointer font-medium leading-[1.4]", yt[e], bt[t], i),
	style: n,
	...a
}), St = ({ active: e = !1, activeColor: t = "rgba(255,255,255,0.1)", size: n = 36, style: r, type: i = "button", className: a, ...o }) => /* @__PURE__ */ L("button", {
	type: i,
	className: p("flex items-center justify-center border-none rounded-full cursor-pointer p-0 text-inherit", a),
	style: {
		width: n,
		height: n,
		background: e ? t : "transparent",
		...r
	},
	...o
});
//#endregion
//#region src/components/doc-editor/VideoCallPanel.tsx
function Ct({ participant: e, isSpeaking: t }) {
	let n = P(null);
	return j(() => {
		let t = n.current, r = e.streams[0] ?? null;
		t && r && t.srcObject !== r && (t.srcObject = r);
	}, [e.streams]), /* @__PURE__ */ R("div", {
		className: p("relative bg-video-tile rounded-lg overflow-hidden transition-shadow duration-300", t ? "video-tile-speaking" : "video-tile-idle"),
		children: [
			/* @__PURE__ */ L("video", {
				ref: n,
				autoPlay: !0,
				playsInline: !0,
				muted: e.isLocal,
				className: p("w-full h-full object-cover")
			}),
			/* @__PURE__ */ L("div", { className: p("absolute bottom-0 left-0 right-0 h-9 bg-gradient-to-t from-black/50 to-transparent pointer-events-none") }),
			/* @__PURE__ */ R("div", {
				className: p("absolute bottom-1.5 left-1.5 flex items-center gap-1 bg-black/60 text-white text-[11px] font-medium px-2 py-[3px] rounded-full"),
				children: [
					t && /* @__PURE__ */ L("span", { className: p("w-[5px] h-[5px] rounded-full bg-success") }),
					/* @__PURE__ */ L("span", { children: e.userId }),
					e.isLocal && /* @__PURE__ */ L("span", {
						className: p("opacity-50"),
						children: "(You)"
					})
				]
			})
		]
	});
}
function wt({ stream: e, userId: t, cameraStream: n, isLocal: r }) {
	let i = P(null), a = P(null);
	return j(() => {
		let t = i.current;
		t && t.srcObject !== e && (t.srcObject = e);
	}, [e]), j(() => {
		let e = a.current;
		e && n && e.srcObject !== n && (e.srcObject = n);
	}, [n]), /* @__PURE__ */ R("div", {
		className: p("relative bg-black rounded-[10px] overflow-hidden border-2 border-info aspect-video"),
		children: [
			/* @__PURE__ */ L("video", {
				ref: i,
				autoPlay: !0,
				playsInline: !0,
				muted: !0,
				className: p("w-full h-full object-contain")
			}),
			r && n && /* @__PURE__ */ L("video", {
				ref: a,
				autoPlay: !0,
				playsInline: !0,
				muted: !0,
				className: p("absolute bottom-2 right-2 w-36 object-cover rounded-lg border-2 border-white/30 aspect-video")
			}),
			/* @__PURE__ */ R("div", {
				className: p("absolute bottom-1.5 left-1.5 bg-[rgba(59,130,246,0.8)] text-white text-[11px] font-medium px-2 py-[3px] rounded-full"),
				children: [t, "'s screen"]
			})
		]
	});
}
function Tt({ stageToken: e, participantId: t, userId: n, onEndCall: r }) {
	let { participants: i, isJoined: a, isScreenSharing: o, error: s, toggleMute: c, toggleCamera: l, startScreenShare: u, stopScreenShare: d, leave: f } = re({
		stageToken: e,
		userId: n,
		participantId: t
	}), { activeSpeakerId: m } = ie({ participants: i }), [h, g] = F(!1), [_, v] = F(!1), [y, b] = F(!1), x = N(() => i.map((e) => ({
		...e,
		isSpeaking: e.participantId === m
	})), [i, m]), S = x.find((e) => e.screenStream);
	return s ? /* @__PURE__ */ R("div", {
		className: p("p-4 text-center text-danger-fg text-[13px]"),
		children: [
			s,
			/* @__PURE__ */ L("br", {}),
			/* @__PURE__ */ L(xt, {
				onClick: r,
				className: "mt-3",
				children: "Close"
			})
		]
	}) : a ? /* @__PURE__ */ R("div", {
		className: p("flex flex-col"),
		onMouseEnter: () => b(!0),
		onMouseLeave: () => b(!1),
		children: [
			S?.screenStream && /* @__PURE__ */ L("div", {
				className: p("p-1.5 pb-0"),
				children: /* @__PURE__ */ L(wt, {
					stream: S.screenStream,
					userId: S.userId,
					cameraStream: S.streams[0],
					isLocal: S.isLocal
				})
			}),
			/* @__PURE__ */ L("div", {
				className: p("flex-1 grid gap-1 p-1.5 content-start", x.length <= 1 ? "grid-cols-1" : "grid-cols-2"),
				children: x.map((e) => /* @__PURE__ */ L(Ct, {
					participant: e,
					isSpeaking: e.isSpeaking
				}, e.participantId))
			}),
			/* @__PURE__ */ R("div", {
				className: p("flex justify-center gap-1 px-2 py-1.5 border-t border-code-raised shrink-0 transition-opacity duration-200", y ? "opacity-100" : "opacity-0"),
				children: [
					/* @__PURE__ */ L(St, {
						onClick: () => {
							g(!h), c(!h);
						},
						title: h ? "Unmute" : "Mute",
						active: h,
						activeColor: "#dc2626",
						style: {
							color: "#fff",
							background: h ? "var(--color-danger)" : "rgba(255,255,255,0.1)"
						},
						children: h ? "🔇" : "🔊"
					}),
					/* @__PURE__ */ L(St, {
						onClick: () => {
							v(!_), l(_);
						},
						title: _ ? "Camera On" : "Camera Off",
						active: _,
						activeColor: "#dc2626",
						style: {
							color: "#fff",
							background: _ ? "var(--color-danger)" : "rgba(255,255,255,0.1)"
						},
						children: _ ? "🚫" : "📷"
					}),
					/* @__PURE__ */ L(St, {
						onClick: () => o ? d() : u(),
						title: o ? "Stop Sharing" : "Share Screen",
						active: o,
						activeColor: "#646cff",
						style: {
							color: "#fff",
							background: o ? "var(--color-primary)" : "rgba(255,255,255,0.1)"
						},
						children: "💻"
					}),
					/* @__PURE__ */ L(St, {
						onClick: () => {
							f(), r();
						},
						title: "Leave Call",
						style: {
							color: "#fff",
							background: "var(--color-danger)"
						},
						children: "📞"
					})
				]
			}),
			/* @__PURE__ */ R("div", {
				className: p("text-center text-[10px] text-text-secondary py-1"),
				children: [i.length, " in call"]
			})
		]
	}) : /* @__PURE__ */ L("div", {
		className: p("p-5 text-center text-text-secondary text-[13px]"),
		children: "Connecting to video..."
	});
}
function Et({ documentId: e, userId: t, idToken: n, meta: r, updateMeta: i, sendMessage: a, onClose: o, onDockToSidebar: c, isDocked: l, onUndock: u, onCallEnd: d }) {
	let { callState: f, stageToken: m, participantId: h, userId: g, error: _, hasActiveCall: v, startCall: y, joinCall: b, endCall: x } = s({
		documentId: e,
		idToken: n,
		meta: r,
		updateMeta: i,
		sendMessage: a,
		displayName: t
	}), S = P(f);
	j(() => {
		S.current === "active" && f === "idle" && d?.(), S.current = f;
	}, [f, d]);
	let C = r?.activeCallSessionId;
	return /* @__PURE__ */ R("div", {
		className: p("bg-call-chrome border border-code-raised rounded-xl overflow-hidden"),
		children: [/* @__PURE__ */ R("div", {
			className: p("flex items-center justify-between px-2 py-1 border-b border-code-raised shrink-0"),
			children: [/* @__PURE__ */ L("span", {
				className: p("text-[11px] font-semibold text-text-tertiary m-0"),
				children: "Video"
			}), /* @__PURE__ */ R("div", {
				className: p("flex items-center gap-0.5"),
				children: [
					c && !l && /* @__PURE__ */ L("button", {
						type: "button",
						onClick: c,
						title: "Dock to sidebar",
						className: p("w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-text-tertiary cursor-pointer text-xs leading-none p-0"),
						children: "←"
					}),
					l && u && /* @__PURE__ */ L("button", {
						type: "button",
						onClick: u,
						title: "Undock from sidebar",
						className: p("w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-text-tertiary cursor-pointer text-xs leading-none p-0"),
						children: "→"
					}),
					/* @__PURE__ */ L("button", {
						type: "button",
						onClick: o,
						title: "Close video",
						className: p("w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-text-tertiary cursor-pointer text-sm leading-none p-0"),
						children: "✕"
					})
				]
			})]
		}), /* @__PURE__ */ R("div", { children: [
			f === "active" && m && h && g && /* @__PURE__ */ L(Tt, {
				stageToken: m,
				participantId: h,
				userId: g,
				onEndCall: x
			}),
			(f === "creating" || f === "joining") && /* @__PURE__ */ L("div", {
				className: p("p-4 text-center text-text-tertiary text-[13px]"),
				children: f === "creating" ? "Starting call..." : "Joining call..."
			}),
			f === "error" && /* @__PURE__ */ R("div", {
				className: p("p-4 text-center"),
				children: [/* @__PURE__ */ L("div", {
					className: p("text-code-red text-[13px] mb-3"),
					children: _
				}), /* @__PURE__ */ L(xt, {
					variant: "primary",
					onClick: () => y(),
					children: "Try Again"
				})]
			}),
			f === "idle" && /* @__PURE__ */ L("div", {
				className: p("p-4 text-center"),
				children: v && C ? /* @__PURE__ */ R(I, { children: [/* @__PURE__ */ L("div", {
					className: p("text-[13px] text-code-subtle mb-3"),
					children: "A call is in progress on this document."
				}), /* @__PURE__ */ L(xt, {
					variant: "primary",
					onClick: () => b(C),
					children: "Join Call"
				})] }) : /* @__PURE__ */ R(I, { children: [/* @__PURE__ */ L("div", {
					className: p("text-[13px] text-text-tertiary mb-3"),
					children: "Start a video call with collaborators on this document."
				}), /* @__PURE__ */ L(xt, {
					variant: "primary",
					onClick: y,
					children: "Start Call"
				})] })
			})
		] })]
	});
}
//#endregion
//#region src/components/doc-editor/SectionBlock.tsx
var Dt = {
	summary: "#8b5cf6",
	tasks: "#3b82f6",
	decisions: "#f59e0b",
	notes: "#6b7280",
	custom: "#10b981"
};
function Ot(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
var kt = 3;
function At({ participants: e }) {
	if (!e || e.length === 0) return null;
	let t = e.slice(0, kt), n = e.length - kt;
	return /* @__PURE__ */ R("div", {
		className: p("flex items-center ml-auto shrink-0"),
		children: [t.map((e, t) => /* @__PURE__ */ R("div", {
			title: `${e.displayName} (${e.mode})`,
			className: p("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold border-2 border-white relative transition-transform duration-200"),
			style: {
				background: `linear-gradient(135deg, ${e.color || "#3b82f6"}, ${jt(e.color || "#3b82f6", .2)})`,
				marginLeft: t === 0 ? 0 : -8,
				zIndex: kt - t
			},
			children: [Ot(e.displayName), /* @__PURE__ */ L("div", { className: p("absolute bottom-0 right-0 w-2 h-2 rounded-full bg-success border-2 border-white") })]
		}, e.clientId)), n > 0 && /* @__PURE__ */ R("div", {
			className: p("w-6 h-6 rounded-full bg-border text-neutral flex items-center justify-center text-[9px] font-bold border-2 border-white relative -ml-2"),
			children: ["+", n]
		})]
	});
}
function jt(e, t) {
	let n = e.replace("#", ""), r = parseInt(n, 16), i = Math.max(0, (r >> 16 & 255) * (1 - t)), a = Math.max(0, (r >> 8 & 255) * (1 - t)), o = Math.max(0, (r & 255) * (1 - t));
	return `rgb(${Math.round(i)}, ${Math.round(a)}, ${Math.round(o)})`;
}
function Mt({ section: e, fragment: n, ydoc: r, provider: i, user: a, editable: o, onUpdateSection: s, onAddItem: c, onUpdateItem: l, onRemoveItem: u, participants: d, onFocus: f, isFocused: m, comments: h, onUpdateCursorInfo: g, commentCount: _ = 0, onOpenComments: v, commentPresence: y }) {
	let [b, x] = F(e.collapsed), S = () => {
		let e = !b;
		x(e), s({ collapsed: e });
	}, C = t(e.sectionType ?? e.type, "editor") ?? D, w = d && d.length > 0, ee = w ? d[0].color || "#3b82f6" : "transparent", [te, ne] = F(!1);
	return /* @__PURE__ */ R("div", {
		id: `section-${e.id}`,
		"data-testid": `section-block-${e.id}`,
		className: p("border border-border rounded-lg mb-4 bg-surface relative transition-[border-left,box-shadow] duration-300 ease-in-out"),
		style: {
			borderLeft: w ? `3px solid ${ee}` : "1px solid #e2e8f0",
			boxShadow: m ? "0 0 0 2px rgba(59, 130, 246, 0.3)" : "none"
		},
		onClickCapture: f,
		onFocusCapture: f,
		children: [
			v && /* @__PURE__ */ R("button", {
				type: "button",
				onClick: (t) => {
					t.stopPropagation(), v(e.id);
				},
				onMouseEnter: () => ne(!0),
				onMouseLeave: () => ne(!1),
				className: p("absolute top-1/2 -right-[52px] -translate-y-1/2 w-10 h-10 rounded-full border border-border flex items-center justify-center text-xl leading-none p-0 z-[1] shadow-sm cursor-pointer transition-[opacity,background] duration-150 ease-in-out", te ? "bg-surface-hover opacity-90" : "bg-surface opacity-40"),
				title: "Open comments",
				children: [
					/* @__PURE__ */ L("span", {
						className: p("pointer-events-none"),
						children: "💬"
					}),
					_ > 0 && /* @__PURE__ */ L("span", {
						className: p("absolute -top-1 -right-1 min-w-[16px] h-4 rounded-lg bg-info text-white text-[10px] font-bold flex items-center justify-center px-1 leading-none"),
						children: _
					}),
					y && y.length > 0 && /* @__PURE__ */ L("span", {
						className: p("absolute -left-1 top-1/2 -translate-y-1/2 flex flex-col gap-0.5"),
						children: y.slice(0, 3).map((e) => /* @__PURE__ */ L("span", {
							title: e.displayName,
							className: p("w-2 h-2 rounded-full border border-white block"),
							style: { background: e.color || "#3b82f6" }
						}, e.clientId))
					})
				]
			}),
			/* @__PURE__ */ R("div", {
				className: p("flex items-center gap-2 py-2.5 px-3.5 bg-surface-panel border-b border-border rounded-t-lg"),
				children: [
					/* @__PURE__ */ L("button", {
						type: "button",
						onClick: S,
						className: p("border-none bg-transparent cursor-pointer text-xs p-1 text-neutral leading-none rounded inline-flex items-center justify-center transition-[background,transform] duration-200 ease-in-out hover:bg-border", b ? "-rotate-90" : "rotate-0"),
						title: b ? "Expand section" : "Collapse section",
						children: /* @__PURE__ */ L("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: /* @__PURE__ */ L("polyline", { points: "6 9 12 15 18 9" })
						})
					}),
					/* @__PURE__ */ L(T, {
						value: e.title,
						onChange: (e) => s({ title: e.target.value }),
						readOnly: !o,
						className: p("flex-1 h-auto border-transparent bg-transparent text-[15px] font-semibold py-0.5 px-1.5 cursor-text")
					}),
					/* @__PURE__ */ L("span", {
						className: p("py-0.5 px-2.5 text-[11px] font-semibold rounded-xl text-white capitalize whitespace-nowrap"),
						style: { background: Dt[e.type] },
						children: e.type
					}),
					/* @__PURE__ */ L(At, { participants: d ?? [] })
				]
			}),
			!b && /* @__PURE__ */ L("div", {
				className: p("p-3.5"),
				children: /* @__PURE__ */ L(O, {
					name: `section:${e.id}`,
					children: /* @__PURE__ */ L(C, {
						section: e,
						viewMode: "editor",
						editable: o,
						fragment: n,
						ydoc: r,
						provider: i,
						user: a,
						onUpdateSection: s,
						onAddItem: c,
						onUpdateItem: l,
						onRemoveItem: u,
						participants: d,
						onUpdateCursorInfo: g,
						comments: h,
						commentCount: _,
						onOpenComments: v
					})
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/SectionList.tsx
function Nt({ sections: e, getSectionFragment: t, ydoc: n, provider: r, user: i, editable: a, onUpdateSection: o, onAddItem: s, onUpdateItem: c, onRemoveItem: l, participants: u, onSectionFocus: d, focusedSectionId: f, comments: m, onAddComment: h, onResolveThread: g, onUnresolveThread: _, onUpdateCursorInfo: v, onOpenComments: y }) {
	return /* @__PURE__ */ L("div", {
		className: p("flex flex-col gap-0 pb-4"),
		children: e.map((e) => /* @__PURE__ */ L(Mt, {
			section: e,
			fragment: t(e.id),
			ydoc: n,
			provider: r,
			user: i,
			editable: a,
			onUpdateSection: (t) => o(e.id, t),
			onAddItem: (t) => s(e.id, t),
			onUpdateItem: (t, n) => c(e.id, t, n),
			onRemoveItem: (t) => l(e.id, t),
			participants: u?.filter((t) => t.currentSectionId === e.id),
			onFocus: () => d?.(e.id),
			isFocused: f === e.id,
			comments: m?.[e.id] ?? [],
			onAddComment: (t, n) => h?.(e.id, t, n),
			onResolveThread: (t) => g?.(e.id, t),
			onUnresolveThread: (t) => _?.(e.id, t),
			onUpdateCursorInfo: v,
			commentCount: (m?.[e.id] ?? []).length,
			onOpenComments: y
		}, e.id))
	});
}
//#endregion
//#region src/components/doc-editor/AttachmentsPanel.tsx
function Pt(e) {
	return `ws_attachments_${e}`;
}
function Ft(e) {
	try {
		let t = localStorage.getItem(Pt(e));
		return t ? JSON.parse(t) : [];
	} catch {
		return [];
	}
}
function It(e) {
	let [t, n] = F(() => Ft(e));
	j(() => {
		n(Ft(e));
	}, [e]);
	let r = (t) => {
		localStorage.setItem(Pt(e), JSON.stringify(t)), n(t);
	};
	return {
		attachments: t,
		addFile: (t, n) => {
			r([...Ft(e), {
				id: crypto.randomUUID(),
				kind: "file",
				name: t.trim(),
				url: n.trim(),
				addedAt: (/* @__PURE__ */ new Date()).toISOString()
			}]);
		},
		addDocumentLink: (t) => {
			r([...Ft(e), {
				id: crypto.randomUUID(),
				kind: "document",
				title: t.trim(),
				addedAt: (/* @__PURE__ */ new Date()).toISOString()
			}]);
		},
		remove: (t) => {
			r(Ft(e).filter((e) => e.id !== t));
		}
	};
}
function Lt({ onAdd: e, onCancel: t }) {
	let [n, r] = F(""), [i, a] = F(""), o = n.trim().length > 0 && i.trim().length > 0;
	return /* @__PURE__ */ R("div", {
		className: p("flex gap-2 items-start flex-wrap"),
		children: [
			/* @__PURE__ */ L(T, {
				autoFocus: !0,
				placeholder: "File name",
				value: n,
				onChange: (e) => r(e.target.value),
				className: p("flex-1 min-w-[120px]")
			}),
			/* @__PURE__ */ L(T, {
				placeholder: "URL or path",
				value: i,
				onChange: (e) => a(e.target.value),
				onKeyDown: (t) => {
					t.key === "Enter" && o && e(n, i);
				},
				className: p("flex-[2] min-w-[120px]")
			}),
			/* @__PURE__ */ L("button", {
				type: "button",
				disabled: !o,
				onClick: () => {
					o && e(n, i);
				},
				className: p("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-on-primary border-none rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"),
				children: "Attach"
			}),
			/* @__PURE__ */ L("button", {
				type: "button",
				onClick: t,
				className: p("px-3 py-1.5 text-[13px] bg-transparent border-none text-neutral cursor-pointer font-[inherit] shrink-0"),
				children: "Cancel"
			})
		]
	});
}
function Rt({ onAdd: e, onCancel: t }) {
	let [n, r] = F(""), i = n.trim().length > 0;
	return /* @__PURE__ */ R("div", {
		className: p("flex gap-2 items-center flex-wrap"),
		children: [
			/* @__PURE__ */ L(T, {
				autoFocus: !0,
				placeholder: "Document name",
				value: n,
				onChange: (e) => r(e.target.value),
				onKeyDown: (t) => {
					t.key === "Enter" && i && e(n);
				},
				className: p("flex-1 min-w-[120px]")
			}),
			/* @__PURE__ */ L("button", {
				type: "button",
				disabled: !i,
				onClick: () => {
					i && e(n);
				},
				className: p("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-on-primary border-none rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"),
				children: "Link"
			}),
			/* @__PURE__ */ L("button", {
				type: "button",
				onClick: t,
				className: p("px-3 py-1.5 text-[13px] bg-transparent border-none text-neutral cursor-pointer font-[inherit] shrink-0"),
				children: "Cancel"
			})
		]
	});
}
function zt({ attachment: e, onRemove: t, editable: n }) {
	let r = e.kind === "file";
	return /* @__PURE__ */ R("div", {
		className: p("flex items-center gap-2.5 px-2.5 py-[7px] rounded-md bg-surface-panel border border-border"),
		children: [
			/* @__PURE__ */ L("span", {
				className: p("text-sm shrink-0 text-neutral"),
				children: r ? "📎" : "📄"
			}),
			/* @__PURE__ */ R("div", {
				className: p("flex-1 min-w-0"),
				children: [r ? /* @__PURE__ */ L("a", {
					href: e.url,
					target: "_blank",
					rel: "noopener noreferrer",
					className: p("text-[13px] text-info-fg font-medium no-underline hover:underline"),
					children: e.name
				}) : /* @__PURE__ */ L("span", {
					className: p("text-[13px] text-text-primary font-medium"),
					children: e.title
				}), /* @__PURE__ */ L("div", {
					className: p("text-[11px] text-text-tertiary mt-px"),
					children: r ? e.url : "Linked document"
				})]
			}),
			n && /* @__PURE__ */ L("button", {
				type: "button",
				onClick: t,
				title: "Remove",
				className: p("bg-transparent border-none cursor-pointer text-danger-fg text-sm px-[5px] py-0.5 opacity-50 leading-none rounded shrink-0 hover:opacity-100"),
				children: "×"
			})
		]
	});
}
function Bt({ documentId: e, editable: t }) {
	let { attachments: n, addFile: r, addDocumentLink: i, remove: a } = It(e), [o, s] = F(null), c = n.length > 0;
	return /* @__PURE__ */ R("div", {
		className: p("mt-4 border border-border rounded-[10px] overflow-hidden"),
		children: [
			/* @__PURE__ */ R("div", {
				className: p("flex items-center justify-between px-3.5 py-2.5 bg-surface-panel", c || o ? "border-b border-border" : ""),
				children: [/* @__PURE__ */ R("span", {
					className: p("text-[13px] font-semibold text-text-primary"),
					children: ["Attachments", c && /* @__PURE__ */ L("span", {
						className: p("ml-1.5 text-[11px] text-text-tertiary font-normal"),
						children: n.length
					})]
				}), t && o === null && /* @__PURE__ */ R("div", {
					className: p("flex gap-1.5"),
					children: [/* @__PURE__ */ L("button", {
						type: "button",
						onClick: () => s("file"),
						className: p("text-xs px-2.5 py-1 font-semibold bg-surface border border-border-field rounded-[5px] cursor-pointer font-[inherit] text-text-primary"),
						children: "+ File"
					}), /* @__PURE__ */ L("button", {
						type: "button",
						onClick: () => s("document"),
						className: p("text-xs px-2.5 py-1 font-semibold bg-surface border border-border-field rounded-[5px] cursor-pointer font-[inherit] text-text-primary"),
						children: "+ Document"
					})]
				})]
			}),
			c && /* @__PURE__ */ L("div", {
				className: p("flex flex-col gap-1.5 px-3.5 py-2.5"),
				children: n.map((e) => /* @__PURE__ */ L(zt, {
					attachment: e,
					onRemove: () => a(e.id),
					editable: t
				}, e.id))
			}),
			o === "file" && /* @__PURE__ */ L("div", {
				className: p("px-3.5 py-2.5", c ? "border-t border-border" : ""),
				children: /* @__PURE__ */ L(Lt, {
					onAdd: (e, t) => {
						r(e, t), s(null);
					},
					onCancel: () => s(null)
				})
			}),
			o === "document" && /* @__PURE__ */ L("div", {
				className: p("px-3.5 py-2.5", c ? "border-t border-border" : ""),
				children: /* @__PURE__ */ L(Rt, {
					onAdd: (e) => {
						i(e), s(null);
					},
					onCancel: () => s(null)
				})
			}),
			!c && !o && /* @__PURE__ */ L("div", {
				className: p("px-3.5 py-3.5 text-xs text-text-tertiary text-center"),
				children: t ? "No attachments yet — add a file or link a document above." : "No attachments."
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/MentionDropdown.tsx
function Vt(e) {
	let t = e.trim().split(/\s+/);
	return t.length === 0 ? "?" : t.length === 1 ? t[0].charAt(0).toUpperCase() : (t[0].charAt(0) + t[t.length - 1].charAt(0)).toUpperCase();
}
var Ht = ae(function({ query: e, users: t, position: n, onSelect: r, onDismiss: i }, a) {
	let [o, s] = F(0), c = P(null), l = t.filter((t) => t.displayName.toLowerCase().includes(e.toLowerCase())).slice(0, 6);
	j(() => {
		s(0);
	}, [e]), j(() => {
		let e = c.current;
		if (!e) return;
		let t = e.children[o];
		t && t.scrollIntoView({ block: "nearest" });
	}, [o]);
	let u = A((e) => e.key === "ArrowDown" ? (e.preventDefault(), s((e) => (e + 1) % Math.max(l.length, 1)), !0) : e.key === "ArrowUp" ? (e.preventDefault(), s((e) => (e - 1 + Math.max(l.length, 1)) % Math.max(l.length, 1)), !0) : e.key === "Enter" || e.key === "Tab" ? (e.preventDefault(), l.length > 0 && r(l[o]), !0) : e.key === "Escape" && (e.preventDefault(), i(), !0), [
		l,
		o,
		r,
		i
	]);
	return M(a, () => ({ handleKeyDown: u }), [u]), z.createPortal(/* @__PURE__ */ L("div", {
		ref: c,
		role: "listbox",
		className: p("fixed z-[1000] bg-surface border border-border rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.12)] max-h-60 overflow-y-auto min-w-[200px]"),
		style: {
			top: n.top,
			left: n.left
		},
		children: l.length === 0 ? /* @__PURE__ */ L("div", {
			className: p("px-4 py-3 text-[13px] text-text-tertiary text-center"),
			children: "No users found"
		}) : l.map((e, t) => /* @__PURE__ */ R("div", {
			role: "option",
			"aria-selected": t === o,
			className: p("flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors duration-100", t === o ? "bg-info-bg" : "bg-transparent"),
			onMouseEnter: () => s(t),
			onMouseDown: (t) => {
				t.preventDefault(), r(e);
			},
			children: [/* @__PURE__ */ L("div", {
				className: p("w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[11px] font-semibold text-white leading-none"),
				style: { background: e.color },
				children: e.type === "group" ? "#" : Vt(e.displayName)
			}), /* @__PURE__ */ R("div", {
				className: p("flex items-center gap-1.5 flex-1 min-w-0"),
				children: [
					/* @__PURE__ */ L("span", {
						className: p("text-[13px] font-medium text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
						children: e.type === "group" ? `@${e.displayName.toLowerCase()}` : e.displayName
					}),
					e.type === "user" && /* @__PURE__ */ L("span", { className: p("w-2 h-2 rounded-full shrink-0", e.online ? "bg-success" : "bg-text-disabled") }),
					e.type === "user" && e.mode && /* @__PURE__ */ L("span", {
						className: p("text-[11px] text-text-tertiary shrink-0"),
						children: e.mode
					}),
					e.type === "group" && e.memberCount != null && /* @__PURE__ */ R("span", {
						className: p("text-[11px] text-text-tertiary shrink-0"),
						children: [e.memberCount, " members"]
					})
				]
			})]
		}, e.userId))
	}), document.body);
});
//#endregion
//#region src/components/doc-editor/CommentThread.tsx
function Ut(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function Wt(e) {
	try {
		let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
		if (n < 60) return "just now";
		let r = Math.floor(n / 60);
		if (r < 60) return `${r}m ago`;
		let i = Math.floor(r / 60);
		return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
	} catch {
		return "";
	}
}
function Gt(e) {
	let t = 0;
	for (let n of e) t += 1 + Gt(n.replies);
	return t;
}
function Kt(e) {
	return e.split(/(@[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)*)/g).map((e, t) => e.startsWith("@") && /^@[A-Z]/.test(e) ? /* @__PURE__ */ L("span", {
		className: p("text-info-fg font-semibold bg-info-bg px-0.5 rounded-sm"),
		children: e
	}, t) : e);
}
var qt = {
	active: !1,
	query: "",
	position: {
		top: 0,
		left: 0
	},
	atIndex: -1
};
function Jt(e, t, n) {
	let r = t - 1;
	for (; r >= 0 && e[r] !== "@" && e[r] !== " " && e[r] !== "\n";) r--;
	if (r < 0 || e[r] !== "@" || r > 0 && e[r - 1] !== " " && e[r - 1] !== "\n") return qt;
	let i = e.slice(r + 1, t), a = n?.getBoundingClientRect();
	return {
		active: !0,
		query: i,
		position: a ? {
			top: a.bottom + 4,
			left: a.left
		} : {
			top: 28,
			left: 0
		},
		atIndex: r
	};
}
function Yt(e, t, n) {
	let r = e.slice(0, t.atIndex), i = e.slice(t.atIndex + 1 + t.query.length), a = `@${n.displayName} `;
	return {
		newValue: r + a + i,
		newCursor: r.length + a.length
	};
}
function Xt({ comment: e, depth: t, onReply: n, mentionUsers: r, onResolveThread: i, onUnresolveThread: a }) {
	let [o, s] = F(!1), [c, l] = F(""), [u, d] = F(!1), f = P(null), m = P(null), [h, g] = F(qt), [_, v] = F(!1), y = t === 0 && !!e.resolved, b = Math.min(t, 5), x = () => {
		if (h.active) return;
		let t = c.trim();
		t && (n(e.id, t), l(""), s(!1), g(qt));
	}, S = (e) => {
		let t = e.target.value;
		l(t);
		let n = Jt(t, e.target.selectionStart ?? t.length, f.current);
		g(n);
	}, C = A((e) => {
		let { newValue: t, newCursor: n } = Yt(c, h, e);
		l(t), g(qt), requestAnimationFrame(() => {
			let e = f.current;
			e && (e.focus(), e.setSelectionRange(n, n));
		});
	}, [c, h]), w = (e) => {
		h.active && m.current && m.current.handleKeyDown(e) || (e.key === "Enter" && !e.shiftKey && (e.preventDefault(), x()), e.key === "Escape" && s(!1));
	}, T = u ? e.color : t === 0 ? "var(--color-border)" : "var(--color-border-emphasis)";
	return y && !_ ? /* @__PURE__ */ L("div", {
		className: p(b > 0 ? "ml-5" : "ml-0"),
		children: /* @__PURE__ */ R("div", {
			role: "button",
			tabIndex: 0,
			"aria-expanded": !1,
			className: p("bg-success-bg border-l-[3px] border-l-success px-3 py-2 mb-1 rounded cursor-pointer flex items-center justify-between"),
			onClick: () => v(!0),
			onKeyDown: E(() => v(!0)),
			children: [/* @__PURE__ */ R("div", {
				className: p("flex items-center gap-1.5"),
				children: [
					/* @__PURE__ */ L("span", {
						className: p("text-success-fg text-xs"),
						children: "✔"
					}),
					/* @__PURE__ */ R("span", {
						className: p("text-success-fg text-xs font-semibold"),
						children: ["Resolved by ", e.resolvedBy]
					}),
					e.resolvedAt && /* @__PURE__ */ L("span", {
						className: p("text-code-green text-[11px]"),
						children: Wt(e.resolvedAt)
					}),
					/* @__PURE__ */ L("span", {
						className: p("text-text-tertiary text-[11px] ml-1"),
						children: "— click to expand"
					})
				]
			}), /* @__PURE__ */ L("button", {
				type: "button",
				onClick: (t) => {
					t.stopPropagation(), a?.(e.id);
				},
				className: p("bg-transparent border border-border-emphasis rounded px-2 py-0.5 text-neutral text-[11px] cursor-pointer font-[inherit]"),
				children: "Reopen"
			})]
		})
	}) : /* @__PURE__ */ R("div", {
		className: p(b > 0 ? "ml-5" : "ml-0", y ? "opacity-60" : ""),
		children: [
			y && _ && /* @__PURE__ */ R("div", {
				role: "button",
				tabIndex: 0,
				"aria-expanded": !0,
				className: p("bg-success-bg border-l-[3px] border-l-success px-3 py-2 mb-1 rounded cursor-pointer flex items-center justify-between"),
				onClick: () => v(!1),
				onKeyDown: E(() => v(!1)),
				children: [/* @__PURE__ */ R("div", {
					className: p("flex items-center gap-1.5"),
					children: [
						/* @__PURE__ */ L("span", {
							className: p("text-success-fg text-xs"),
							children: "✔"
						}),
						/* @__PURE__ */ R("span", {
							className: p("text-success-fg text-xs font-semibold"),
							children: ["Resolved by ", e.resolvedBy]
						}),
						e.resolvedAt && /* @__PURE__ */ L("span", {
							className: p("text-code-green text-[11px]"),
							children: Wt(e.resolvedAt)
						}),
						/* @__PURE__ */ L("span", {
							className: p("text-text-tertiary text-[11px] ml-1"),
							children: "— click to collapse"
						})
					]
				}), /* @__PURE__ */ L("button", {
					type: "button",
					onClick: (t) => {
						t.stopPropagation(), a?.(e.id);
					},
					className: p("bg-transparent border border-border-emphasis rounded px-2 py-0.5 text-neutral text-[11px] cursor-pointer font-[inherit]"),
					children: "Reopen"
				})]
			}),
			/* @__PURE__ */ R("div", {
				className: p("px-3 py-2 mb-1 transition-colors duration-200"),
				style: { borderLeft: `3px solid ${T}` },
				onMouseEnter: () => d(!0),
				onMouseLeave: () => d(!1),
				children: [
					/* @__PURE__ */ R("div", {
						className: p("flex items-center gap-1.5 mb-1"),
						children: [
							/* @__PURE__ */ L("div", {
								className: p("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold shrink-0"),
								style: { background: `linear-gradient(135deg, ${e.color}, ${e.color}dd)` },
								children: Ut(e.displayName)
							}),
							/* @__PURE__ */ L("span", {
								className: p("font-semibold text-[13px] text-text-primary"),
								children: e.displayName
							}),
							/* @__PURE__ */ L("span", {
								className: p("text-[11px] text-text-tertiary"),
								children: Wt(e.timestamp)
							})
						]
					}),
					/* @__PURE__ */ L("div", {
						className: p("text-[13px] leading-normal text-text-primary pl-[30px] whitespace-pre-wrap"),
						children: Kt(e.text)
					}),
					/* @__PURE__ */ R("div", {
						className: p("pl-[30px] mt-1 flex gap-2"),
						children: [/* @__PURE__ */ L("button", {
							type: "button",
							onClick: () => {
								s(!o), o || setTimeout(() => f.current?.focus(), 50);
							},
							className: p("bg-transparent border-none text-neutral text-xs cursor-pointer py-0.5 px-0 font-[inherit]"),
							children: "Reply"
						}), t === 0 && !y && i && /* @__PURE__ */ R("button", {
							type: "button",
							onClick: () => i(e.id),
							className: p("bg-transparent border-none text-neutral text-xs cursor-pointer py-0.5 px-0 font-[inherit]"),
							children: ["✔", " Resolve"]
						})]
					}),
					o && /* @__PURE__ */ R("div", {
						className: p("pl-[30px] mt-2 overflow-hidden animate-[sectionCommentsSlideDown_0.2s_ease-out]"),
						children: [/* @__PURE__ */ R("div", {
							className: p("relative"),
							children: [/* @__PURE__ */ L(ee, {
								ref: f,
								value: c,
								onChange: S,
								onKeyDown: w,
								placeholder: "Write a reply... (type @ to mention)",
								rows: 2,
								className: p("resize-y min-h-12")
							}), h.active && /* @__PURE__ */ L(Ht, {
								ref: m,
								query: h.query,
								users: r,
								position: h.position,
								onSelect: C,
								onDismiss: () => g(qt)
							})]
						}), /* @__PURE__ */ R("div", {
							className: p("flex gap-1.5 mt-1.5"),
							children: [/* @__PURE__ */ L("button", {
								type: "button",
								onClick: x,
								className: p("px-3 py-1 text-xs font-semibold border-none rounded-md bg-info text-white cursor-pointer font-[inherit]"),
								children: "Reply"
							}), /* @__PURE__ */ L("button", {
								type: "button",
								onClick: () => s(!1),
								className: p("px-3 py-1 text-xs font-medium border border-border rounded-md bg-transparent text-neutral cursor-pointer font-[inherit]"),
								children: "Cancel"
							})]
						})]
					})
				]
			}),
			e.replies.map((e) => /* @__PURE__ */ L(Xt, {
				comment: e,
				depth: t + 1,
				onReply: n,
				mentionUsers: r,
				onResolveThread: i,
				onUnresolveThread: a
			}, e.id))
		]
	});
}
//#endregion
//#region src/components/doc-editor/SectionComments.tsx
function Zt({ comments: e, onAddComment: t, participants: n = [], onResolveThread: i, onUnresolveThread: a }) {
	let [o, s] = F(!0), [c, l] = F(""), u = P(null), d = P(null), [f, m] = F(qt), h = r(n), g = Gt(e), [_, v] = F(!0), y = [...e].sort((e, t) => {
		if (e.resolved && !t.resolved) return 1;
		if (!e.resolved && t.resolved) return -1;
		let n = new Date(e.timestamp).getTime(), r = new Date(t.timestamp).getTime();
		return _ ? r - n : n - r;
	}), b = () => {
		if (f.active) return;
		let e = c.trim();
		e && (t(e, null), l(""), m(qt));
	}, x = (e) => {
		let t = e.target.value;
		l(t);
		let n = Jt(t, e.target.selectionStart ?? t.length, u.current);
		m(n);
	}, S = A((e) => {
		let { newValue: t, newCursor: n } = Yt(c, f, e);
		l(t), m(qt), requestAnimationFrame(() => {
			let e = u.current;
			e && (e.focus(), e.setSelectionRange(n, n));
		});
	}, [c, f]), C = (e) => {
		f.active && d.current && d.current.handleKeyDown(e) || e.key === "Enter" && !e.shiftKey && (e.preventDefault(), b());
	}, w = (e, n) => {
		t(n, e);
	};
	return /* @__PURE__ */ R("div", { children: [/* @__PURE__ */ R("button", {
		type: "button",
		onClick: () => {
			s((e) => !e), o || setTimeout(() => u.current?.focus(), 100);
		},
		className: p("inline-flex items-center gap-1 mt-2.5 px-2.5 py-1 text-xs font-medium border border-border rounded-md cursor-pointer font-[inherit]", g > 0 ? "bg-info-bg text-info-fg" : "bg-transparent text-neutral"),
		children: [
			o ? "▼" : "▶",
			" Comments",
			g > 0 ? ` (${g})` : ""
		]
	}), o && /* @__PURE__ */ R("div", {
		className: p("mt-2 border border-border rounded-lg bg-surface-panel overflow-hidden animate-[sectionCommentsSlideDown_0.2s_ease-out]"),
		children: [
			/* @__PURE__ */ R("div", {
				className: p("flex items-start gap-1.5 px-3 py-2.5 border-b border-border bg-surface"),
				children: [/* @__PURE__ */ R("div", {
					className: p("flex-1 relative"),
					children: [/* @__PURE__ */ L(ee, {
						ref: u,
						value: c,
						onChange: x,
						onKeyDown: C,
						placeholder: "Add a comment... (type @ to mention)",
						rows: 2,
						className: p("resize-y min-h-12")
					}), f.active && /* @__PURE__ */ L(Ht, {
						ref: d,
						query: f.query,
						users: h,
						position: f.position,
						onSelect: S,
						onDismiss: () => m(qt)
					})]
				}), /* @__PURE__ */ L("button", {
					type: "button",
					onClick: b,
					className: p("px-3.5 py-1.5 text-xs font-semibold border-none rounded-md bg-info text-white cursor-pointer font-[inherit] whitespace-nowrap self-end"),
					children: "Post"
				})]
			}),
			e.length > 1 && /* @__PURE__ */ L("div", {
				className: p("flex justify-end px-3 pt-1 border-b border-border-subtle"),
				children: /* @__PURE__ */ L("button", {
					type: "button",
					onClick: () => v((e) => !e),
					className: p("bg-transparent border-none cursor-pointer text-[11px] text-neutral px-1.5 py-0.5 font-[inherit]"),
					children: _ ? "↓ Newest first" : "↑ Oldest first"
				})
			}),
			/* @__PURE__ */ R("div", {
				className: p("max-h-[420px] overflow-y-auto px-3 py-2"),
				children: [e.length === 0 && /* @__PURE__ */ L("div", {
					className: p("p-3 text-center text-text-tertiary text-xs"),
					children: "No comments yet. Start the discussion!"
				}), y.map((e) => /* @__PURE__ */ L(Xt, {
					comment: e,
					depth: 0,
					onReply: w,
					mentionUsers: h,
					onResolveThread: i,
					onUnresolveThread: a
				}, e.id))]
			})
		]
	})] });
}
//#endregion
//#region src/components/doc-editor/ReviewMode.tsx
var Qt = {
	summary: {
		bg: "var(--color-info-bg)",
		text: "var(--color-info-fg)"
	},
	tasks: {
		bg: "var(--color-warning-bg)",
		text: "var(--color-warning-fg)"
	},
	decisions: {
		bg: "#ede9fe",
		text: "#5b21b6"
	},
	notes: {
		bg: "var(--color-surface-hover)",
		text: "var(--color-text-primary)"
	},
	custom: {
		bg: "var(--color-primary-bg)",
		text: "#3730a3"
	}
}, $t = {
	approved: {
		label: "Approved",
		color: "var(--color-success-fg)",
		bg: "#dcfce7",
		icon: "✓"
	},
	reviewed: {
		label: "Reviewed",
		color: "var(--color-text-primary)",
		bg: "var(--color-surface-hover)",
		icon: "—"
	},
	changes_requested: {
		label: "Changes Requested",
		color: "var(--color-warning-fg)",
		bg: "var(--color-warning-bg)",
		icon: "!"
	}
};
function en(e) {
	return $t[e] ?? {
		label: String(e ?? "Unknown"),
		color: "var(--color-text-secondary)",
		bg: "var(--color-surface-hover)",
		icon: "•"
	};
}
function tn({ sections: e, participants: t, userId: n, getSectionFragment: r, ydoc: i, provider: a, sectionReviews: o, reviewSection: s, comments: c, onAddComment: l, onResolveThread: u, onUnresolveThread: d, onSectionFocus: f }) {
	let [m, h] = F({}), g = e.filter((e) => (o[e.id] ?? []).some((e) => e.userId === n)).length, _ = /* @__PURE__ */ new Map();
	for (let t of e) for (let e of o[t.id] ?? []) {
		let t = _.get(e.userId) ?? {
			displayName: e.displayName,
			statuses: []
		};
		t.statuses.push(e.status), _.set(e.userId, t);
	}
	let v = e.length > 0 ? Math.round(g / e.length * 100) : 0;
	return e.length === 0 ? /* @__PURE__ */ L("div", {
		className: p("text-center p-12 text-text-secondary text-[15px]"),
		children: "No sections to review."
	}) : /* @__PURE__ */ R("div", {
		"data-testid": "review-mode",
		className: p("max-w-[800px] mx-auto"),
		children: [
			/* @__PURE__ */ R("div", {
				"data-testid": "review-progress",
				className: p("mb-6"),
				children: [/* @__PURE__ */ R("div", {
					className: p("text-[13px] text-text-secondary mb-1 flex justify-between"),
					children: [/* @__PURE__ */ R("span", {
						"data-testid": "review-progress-text",
						children: [
							g,
							" of ",
							e.length,
							" sections reviewed by you"
						]
					}), /* @__PURE__ */ R("span", {
						"data-testid": "review-progress-pct",
						children: [v, "%"]
					})]
				}), /* @__PURE__ */ L("div", {
					className: p("h-2 bg-surface-emphasis rounded overflow-hidden"),
					children: /* @__PURE__ */ L("div", {
						className: p("h-full rounded transition-[width] duration-300 ease-in-out", g === e.length ? "bg-success" : "bg-info"),
						style: { width: `${v}%` }
					})
				})]
			}),
			/* @__PURE__ */ L("div", {
				className: p("flex flex-col gap-6"),
				children: e.map((e) => {
					let g = r(e.id), _ = Qt[e.type] ?? Qt.custom, v = o[e.id] ?? [], y = v.find((e) => e.userId === n), b = v.filter((e) => e.userId !== n), x = t.filter((t) => t.currentSectionId === e.id), S = m[e.id] ?? !1;
					return /* @__PURE__ */ R("div", {
						id: `section-${e.id}`,
						"data-testid": `review-section-${e.id}`,
						className: p("bg-surface border border-border rounded-lg p-5"),
						style: { borderLeft: y ? `3px solid ${en(y.status).color}` : "3px solid #d1d5db" },
						onMouseEnter: () => f?.(e.id),
						children: [
							/* @__PURE__ */ R("div", {
								className: p("flex items-center gap-2 mb-1"),
								children: [/* @__PURE__ */ L("h3", {
									className: p("text-lg font-bold m-0 text-text-primary flex-1"),
									children: e.title
								}), /* @__PURE__ */ L("span", {
									className: p("inline-block text-[11px] font-semibold py-0.5 px-2.5 rounded-full"),
									style: {
										background: _.bg,
										color: _.text
									},
									children: e.sectionType ?? e.type
								})]
							}),
							g && /* @__PURE__ */ L("div", {
								className: p(e.items.length > 0 ? "mb-4" : "mb-2"),
								children: /* @__PURE__ */ L(k, {
									fragment: g,
									ydoc: i,
									provider: a,
									user: {
										name: "",
										color: ""
									},
									editable: !1,
									sectionId: e.id
								})
							}),
							!g && e.items.length === 0 && /* @__PURE__ */ L("div", {
								className: p("py-4 text-text-tertiary text-sm text-center"),
								children: "This section has no content."
							}),
							e.items.length > 0 && /* @__PURE__ */ L("div", {
								className: p("mb-3"),
								children: e.items.map((e) => {
									let t = e.status === "acked" ? "var(--color-success)" : e.status === "rejected" ? "var(--color-danger)" : e.status === "done" ? "var(--color-neutral)" : "var(--color-text-tertiary)";
									return /* @__PURE__ */ R("div", {
										className: p("flex items-start gap-2 py-1.5 border-b border-border-subtle text-sm"),
										children: [
											/* @__PURE__ */ L("span", {
												className: p("inline-block w-2 h-2 rounded-full mt-[5px] shrink-0"),
												style: { background: t }
											}),
											/* @__PURE__ */ R("div", {
												className: p("flex-1"),
												children: [
													/* @__PURE__ */ L("span", {
														className: p("text-text-primary"),
														children: e.text
													}),
													e.assignee && /* @__PURE__ */ R("span", {
														className: p("text-text-secondary text-xs ml-2"),
														children: ["— ", e.assignee]
													}),
													e.priority && e.priority !== "medium" && /* @__PURE__ */ L("span", {
														className: p("text-[10px] font-semibold ml-1.5 px-1.5 py-px rounded", e.priority === "high" ? "bg-danger-bg text-danger-fg" : "bg-success-bg text-success-fg"),
														children: e.priority
													})
												]
											}),
											/* @__PURE__ */ L("span", {
												className: p("text-[11px] font-semibold capitalize shrink-0"),
												style: { color: t },
												children: e.status
											})
										]
									}, e.id);
								})
							}),
							/* @__PURE__ */ R("div", {
								className: p("flex items-center gap-2 pt-2.5 pb-1 border-t border-border-subtle flex-wrap"),
								children: [
									!y || S ? /* @__PURE__ */ R(I, { children: [
										/* @__PURE__ */ L(nn, {
											testid: `section-${e.id}-review-reviewed`,
											label: "Mark Reviewed",
											bg: "#f3f4f6",
											color: "#374151",
											hoverBg: "#e5e7eb",
											onClick: () => {
												s(e.id, "reviewed"), h((t) => ({
													...t,
													[e.id]: !1
												}));
											}
										}),
										/* @__PURE__ */ L(nn, {
											testid: `section-${e.id}-review-approved`,
											label: "Approve",
											bg: "#dcfce7",
											color: "#166534",
											hoverBg: "#bbf7d0",
											onClick: () => {
												s(e.id, "approved"), h((t) => ({
													...t,
													[e.id]: !1
												}));
											}
										}),
										/* @__PURE__ */ L(nn, {
											testid: `section-${e.id}-review-changes-requested`,
											label: "Request Changes",
											bg: "#fef3c7",
											color: "#92400e",
											hoverBg: "#fde68a",
											onClick: () => {
												s(e.id, "changes_requested"), h((t) => ({
													...t,
													[e.id]: !1
												}));
											}
										}),
										S && /* @__PURE__ */ L("button", {
											"data-testid": `section-${e.id}-cancel-change`,
											onClick: () => h((t) => ({
												...t,
												[e.id]: !1
											})),
											className: p("bg-transparent border-none text-text-secondary text-xs cursor-pointer underline"),
											children: "Cancel"
										})
									] }) : /* @__PURE__ */ R(I, { children: [
										/* @__PURE__ */ R("span", {
											"data-testid": `section-${e.id}-status`,
											"data-status": y.status,
											className: p("inline-flex items-center gap-1 text-[13px] font-semibold py-1 px-2.5 rounded-md"),
											style: {
												background: en(y.status).bg,
												color: en(y.status).color
											},
											children: [/* @__PURE__ */ L("span", {
												className: p("text-sm"),
												children: en(y.status).icon
											}), en(y.status).label]
										}),
										/* @__PURE__ */ R("span", {
											className: p("text-xs text-text-secondary"),
											children: ["by you · ", new Date(y.timestamp).toLocaleString(void 0, {
												month: "short",
												day: "numeric",
												hour: "2-digit",
												minute: "2-digit"
											})]
										}),
										/* @__PURE__ */ L("button", {
											"data-testid": `section-${e.id}-change-review`,
											onClick: () => h((t) => ({
												...t,
												[e.id]: !0
											})),
											className: p("bg-transparent border-none text-info-fg text-xs cursor-pointer underline p-0"),
											children: "Change"
										})
									] }),
									b.length > 0 && /* @__PURE__ */ L("div", {
										className: p("flex gap-1 ml-auto items-center"),
										children: b.map((e) => {
											let t = en(e.status), n = typeof e.displayName == "string" && e.displayName ? e.displayName : "?", r = n.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2);
											return /* @__PURE__ */ L("div", {
												title: `${n}: ${t.label}`,
												className: p("w-[26px] h-[26px] rounded-full flex items-center justify-center text-[10px] font-bold"),
												style: {
													background: t.bg,
													color: t.color,
													border: `2px solid ${t.color}`
												},
												children: r
											}, e.userId);
										})
									}),
									x.length > 0 && /* @__PURE__ */ R("div", {
										className: p("flex gap-1 items-center"),
										style: { marginLeft: b.length > 0 ? 0 : "auto" },
										children: [/* @__PURE__ */ L("span", {
											className: p("text-[11px] text-text-tertiary"),
											children: "Viewing:"
										}), x.map((e) => /* @__PURE__ */ L("div", {
											title: e.displayName,
											className: p("w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-semibold"),
											style: { background: e.color },
											children: e.displayName.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2)
										}, e.clientId))]
									})
								]
							}),
							l && /* @__PURE__ */ L(Zt, {
								comments: c?.[e.id] ?? [],
								onAddComment: (t, n) => l(e.id, t, n),
								participants: t,
								onResolveThread: u ? (t) => u(e.id, t) : void 0,
								onUnresolveThread: d ? (t) => d(e.id, t) : void 0
							})
						]
					}, e.id);
				})
			}),
			_.size > 0 && /* @__PURE__ */ R("div", {
				"data-testid": "review-summary",
				className: p("mt-8 p-4 px-5 bg-surface-panel border border-border rounded-lg"),
				children: [/* @__PURE__ */ L("h4", {
					className: p("m-0 mb-3 text-sm font-bold text-text-secondary"),
					children: "Document Review Summary"
				}), /* @__PURE__ */ L("div", {
					className: p("flex flex-col gap-2"),
					children: Array.from(_.entries()).map(([t, r]) => {
						let i = r.statuses.filter((e) => e === "approved").length, a = r.statuses.filter((e) => e === "changes_requested").length, o = r.statuses.filter((e) => e === "reviewed").length;
						return /* @__PURE__ */ R("div", {
							className: p("flex items-center gap-2.5 text-[13px]"),
							children: [
								/* @__PURE__ */ R("span", {
									className: p("font-semibold text-text-primary min-w-[100px]"),
									children: [r.displayName, t === n ? " (you)" : ""]
								}),
								/* @__PURE__ */ R("span", {
									className: p("text-text-secondary"),
									children: [
										r.statuses.length,
										" of ",
										e.length,
										" sections"
									]
								}),
								i > 0 && /* @__PURE__ */ R("span", {
									className: p("text-[11px] px-2 py-px rounded bg-success-bg text-success-fg font-semibold"),
									children: [i, " approved"]
								}),
								o > 0 && /* @__PURE__ */ R("span", {
									className: p("text-[11px] px-2 py-px rounded bg-surface-hover text-text-primary font-semibold"),
									children: [o, " reviewed"]
								}),
								a > 0 && /* @__PURE__ */ R("span", {
									className: p("text-[11px] px-2 py-px rounded bg-warning-bg text-warning-fg font-semibold"),
									children: [a, " changes requested"]
								})
							]
						}, t);
					})
				})]
			})
		]
	});
}
function nn({ label: e, bg: t, color: n, hoverBg: r, onClick: i, testid: a }) {
	let [o, s] = F(!1);
	return /* @__PURE__ */ L("button", {
		"data-testid": a,
		onClick: i,
		onMouseEnter: () => s(!0),
		onMouseLeave: () => s(!1),
		className: p("py-1.5 px-3.5 text-[13px] font-semibold border border-transparent rounded-md cursor-pointer transition-colors duration-150"),
		style: {
			background: o ? r : t,
			color: n
		},
		children: e
	});
}
//#endregion
//#region src/components/doc-editor/ReaderSummary.tsx
var rn = {
	draft: {
		bg: "var(--color-warning-bg)",
		text: "var(--color-warning-fg)"
	},
	review: {
		bg: "var(--color-info-bg)",
		text: "var(--color-info-fg)"
	},
	final: {
		bg: "var(--color-success-bg)",
		text: "var(--color-success-fg)"
	}
};
function an(e) {
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
function on(e) {
	let t = [], n = [], r = [];
	for (let i of e) i.status === "rejected" ? r.push(i) : i.status === "acked" || i.status === "done" ? n.push(i) : t.push(i);
	return {
		pending: t,
		completed: n,
		rejected: r
	};
}
function sn(e, t) {
	let { pending: n, completed: r, rejected: i } = on(e), a = e.length, o = [];
	if (a > 0) {
		let e = Math.round(r.length / a * 100);
		o.push(`${a} action item${a === 1 ? "" : "s"} identified, ${r.length} completed (${e}%).`);
	} else o.push("No action items recorded yet.");
	let s = t.filter((e) => e.type === "decisions").flatMap((e) => e.items);
	if (s.length > 0) {
		let e = s.filter((e) => e.status === "acked" || e.status === "done").length;
		o.push(`${s.length} key decision${s.length === 1 ? "" : "s"} recorded${e > 0 ? `, ${e} finalized` : ""}.`);
	}
	return n.length > 0 && o.push(`${n.length} item${n.length === 1 ? "" : "s"} still pending review.`), i.length > 0 && o.push(`${i.length} item${i.length === 1 ? "" : "s"} rejected and need${i.length === 1 ? "s" : ""} revision.`), o;
}
function cn({ meta: e, participantCount: t }) {
	let n = rn[e.status] ?? rn.draft;
	return /* @__PURE__ */ R("div", {
		className: p("border-t-[3px] border-t-info rounded-t-lg pt-5 pb-4 px-6 mb-4 bg-gradient-to-b from-surface-panel to-white col-span-full"),
		children: [/* @__PURE__ */ R("div", {
			className: p("flex items-center gap-3 mb-1.5"),
			children: [/* @__PURE__ */ L("h1", {
				className: p("text-xl font-bold m-0 text-text-primary flex-1"),
				children: e.title || "Untitled Document"
			}), /* @__PURE__ */ L("span", {
				className: p("inline-block text-xs font-semibold py-[3px] px-3 rounded-full capitalize"),
				style: {
					background: n.bg,
					color: n.text
				},
				children: e.status
			})]
		}), /* @__PURE__ */ R("div", {
			className: p("text-xs text-neutral"),
			children: [
				e.createdBy && /* @__PURE__ */ R(I, { children: ["Created by ", e.createdByName || e.createdBy] }),
				e.createdAt && /* @__PURE__ */ R(I, { children: [" · ", an(e.createdAt)] }),
				t > 0 && /* @__PURE__ */ R(I, { children: [
					" · ",
					t,
					" participant",
					t === 1 ? "" : "s"
				] })
			]
		})]
	});
}
function ln({ bullets: e, contentText: t, fragment: n, ydoc: r, provider: i }) {
	let a = n && r, o = t && t.trim().length > 0;
	return /* @__PURE__ */ R("div", {
		className: p("bg-surface border border-border rounded-lg p-4 mb-4"),
		children: [
			/* @__PURE__ */ L("h2", {
				className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
				children: "Executive Summary"
			}),
			a ? /* @__PURE__ */ L("div", {
				className: p("py-1 px-3 bg-surface-panel rounded-md border-l-[3px] border-l-accent", e.length > 0 ? "mb-3" : ""),
				children: /* @__PURE__ */ L(k, {
					fragment: n,
					ydoc: r,
					provider: i ?? null,
					user: {
						name: "",
						color: ""
					},
					editable: !1
				})
			}) : o ? /* @__PURE__ */ L("div", {
				className: p("text-sm text-text-primary leading-relaxed whitespace-pre-wrap py-2 px-3 bg-surface-panel rounded-md border-l-[3px] border-l-accent", e.length > 0 ? "mb-3" : ""),
				children: t.trim()
			}) : null,
			/* @__PURE__ */ L("ul", {
				className: p("m-0 pl-[18px] text-[13px] text-text-primary leading-relaxed"),
				children: e.map((e, t) => /* @__PURE__ */ L("li", { children: e }, t))
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/ReaderSectionCard.tsx
var un = {
	pending: "var(--color-warning)",
	done: "var(--color-success)",
	acked: "var(--color-success)",
	rejected: "var(--color-danger)"
}, dn = {
	high: "var(--color-danger)",
	medium: "var(--color-warning)",
	low: "var(--color-neutral)"
};
function fn(e) {
	switch (e) {
		case "acked":
		case "done": return "✅";
		case "rejected": return "❌";
		default: return "⬜";
	}
}
function pn(e) {
	let t = [], n = [], r = [];
	for (let i of e) i.status === "rejected" ? r.push(i) : i.status === "acked" || i.status === "done" ? n.push(i) : t.push(i);
	return {
		pending: t,
		completed: n,
		rejected: r
	};
}
function mn({ label: e, count: t, color: n, defaultOpen: r, children: i }) {
	let [a, o] = F(r);
	return /* @__PURE__ */ R("div", {
		className: p("mb-2"),
		children: [/* @__PURE__ */ R("button", {
			onClick: () => o(!a),
			className: p("bg-transparent border-none cursor-pointer flex items-center gap-1.5 py-1 px-0 text-[13px] font-semibold text-text-primary font-[inherit] w-full"),
			children: [
				/* @__PURE__ */ L("span", {
					className: p("inline-block text-[10px] transition-transform duration-150 ease-in-out", a ? "rotate-90" : "rotate-0"),
					children: "▶"
				}),
				/* @__PURE__ */ L("span", {
					style: { color: n },
					children: e
				}),
				/* @__PURE__ */ L("span", {
					className: p("text-[11px] px-2 py-px rounded-full font-semibold"),
					style: {
						background: `${n}18`,
						color: n
					},
					children: t
				})
			]
		}), a && /* @__PURE__ */ L("div", {
			className: p("pl-4 mt-1"),
			children: i
		})]
	});
}
function hn({ item: e, variant: t }) {
	let n = t === "pending" ? un.pending : t === "completed" ? un.done : un.rejected;
	return /* @__PURE__ */ R("div", {
		className: p("flex items-center gap-2 py-[5px] px-2 mb-1 rounded-r", t === "pending" ? "bg-warning-bg" : "bg-surface"),
		style: { borderLeft: `3px solid ${n}` },
		children: [
			/* @__PURE__ */ L("span", {
				className: p("text-[13px] flex-1"),
				children: /* @__PURE__ */ L("span", {
					className: p(t === "completed" ? "line-through text-text-tertiary" : "text-text-primary"),
					children: e.text
				})
			}),
			e.priority && /* @__PURE__ */ L("span", {
				className: p("text-[10px] font-semibold px-1.5 py-px rounded-full uppercase shrink-0"),
				style: {
					background: `${dn[e.priority]}18`,
					color: dn[e.priority]
				},
				children: e.priority
			}),
			e.ackedBy && /* @__PURE__ */ L("span", {
				className: p("text-[11px] text-text-tertiary shrink-0"),
				children: e.ackedBy
			})
		]
	});
}
function gn({ sections: e }) {
	let t = e.filter((e) => e.type === "decisions").flatMap((e) => e.items);
	return /* @__PURE__ */ R("div", {
		className: p("bg-surface border border-border rounded-lg p-4 mb-4"),
		children: [/* @__PURE__ */ L("h2", {
			className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
			children: "Key Decisions"
		}), t.length === 0 ? /* @__PURE__ */ L("div", {
			className: p("text-[13px] text-text-tertiary italic"),
			children: "No decisions recorded"
		}) : /* @__PURE__ */ L("div", {
			className: p("flex flex-col gap-1.5"),
			children: t.map((e) => /* @__PURE__ */ R("div", {
				className: p("flex items-start gap-2 text-[13px] text-text-primary"),
				children: [/* @__PURE__ */ L("span", {
					className: p("shrink-0"),
					children: fn(e.status)
				}), /* @__PURE__ */ L("span", { children: e.text })]
			}, e.id))
		})]
	});
}
function _n({ allItems: e }) {
	let { pending: t, completed: n, rejected: r } = pn(e);
	return /* @__PURE__ */ R("div", {
		className: p("bg-surface border border-border rounded-lg p-4 mb-4"),
		children: [/* @__PURE__ */ L("h2", {
			className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
			children: "Action Items"
		}), e.length === 0 ? /* @__PURE__ */ L("div", {
			className: p("text-[13px] text-text-tertiary italic"),
			children: "No action items yet"
		}) : /* @__PURE__ */ R(I, { children: [
			t.length > 0 && /* @__PURE__ */ L(mn, {
				label: "Pending",
				count: t.length,
				color: un.pending,
				defaultOpen: !0,
				children: t.map((e) => /* @__PURE__ */ L(hn, {
					item: e,
					variant: "pending"
				}, e.id))
			}),
			n.length > 0 && /* @__PURE__ */ L(mn, {
				label: "Completed",
				count: n.length,
				color: un.done,
				defaultOpen: !1,
				children: n.map((e) => /* @__PURE__ */ L(hn, {
					item: e,
					variant: "completed"
				}, e.id))
			}),
			r.length > 0 && /* @__PURE__ */ L(mn, {
				label: "Rejected",
				count: r.length,
				color: un.rejected,
				defaultOpen: !1,
				children: r.map((e) => /* @__PURE__ */ L(hn, {
					item: e,
					variant: "rejected"
				}, e.id))
			})
		] })]
	});
}
function vn({ sections: e, commentCounts: t, sectionContentTexts: n, comments: r, getSectionFragment: i, ydoc: a, provider: o }) {
	let [s, c] = F({}), l = (e) => c((t) => ({
		...t,
		[e]: !t[e]
	})), u = {
		summary: {
			bg: "var(--color-primary-bg)",
			text: "#4338ca"
		},
		tasks: {
			bg: "var(--color-info-bg)",
			text: "var(--color-info-fg)"
		},
		decisions: {
			bg: "#fce7f3",
			text: "#9d174d"
		},
		notes: {
			bg: "var(--color-success-bg)",
			text: "var(--color-success-fg)"
		},
		custom: {
			bg: "var(--color-surface-hover)",
			text: "var(--color-neutral)"
		}
	};
	return /* @__PURE__ */ R("div", {
		className: p("bg-surface border border-border rounded-lg p-4 mb-4"),
		children: [/* @__PURE__ */ L("h2", {
			className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
			children: "Section Summaries"
		}), e.length === 0 ? /* @__PURE__ */ L("div", {
			className: p("text-[13px] text-text-tertiary italic"),
			children: "No sections"
		}) : /* @__PURE__ */ L("div", {
			className: p("flex flex-col gap-0.5"),
			children: e.map((e) => {
				let c = e.items.filter((e) => e.status === "acked" || e.status === "done").length, d = e.items.length, f = t?.[e.id] ?? 0, m = n?.[e.id] ?? "", h = r?.[e.id] ?? [], g = !!s[e.id], _ = m.trim().length > 0, v = u[e.type] ?? u.custom;
				return /* @__PURE__ */ R("div", {
					id: `section-${e.id}`,
					"data-testid": `reader-section-${e.id}`,
					children: [/* @__PURE__ */ R("button", {
						onClick: () => l(e.id),
						className: p("border-none cursor-pointer flex items-center gap-2 py-2 px-1.5 rounded-md w-full font-[inherit] text-[13px] text-text-primary transition-colors duration-100", g ? "bg-surface-panel" : "bg-transparent"),
						children: [
							/* @__PURE__ */ L("span", {
								className: p("text-[10px] transition-transform duration-150 ease-in-out shrink-0", g ? "rotate-90" : "rotate-0"),
								children: "▶"
							}),
							/* @__PURE__ */ L("span", {
								className: p("font-semibold flex-1 text-left"),
								children: e.title
							}),
							/* @__PURE__ */ L("span", {
								className: p("text-[10px] font-semibold px-2 py-px rounded-full capitalize shrink-0"),
								style: {
									background: v.bg,
									color: v.text
								},
								children: e.type
							}),
							d > 0 && /* @__PURE__ */ R("span", {
								className: p("text-[11px] text-neutral shrink-0"),
								children: [
									c,
									"/",
									d,
									" done"
								]
							}),
							f > 0 && /* @__PURE__ */ R("span", {
								className: p("text-[11px] text-neutral shrink-0"),
								children: [
									f,
									" comment",
									f === 1 ? "" : "s"
								]
							})
						]
					}), g && /* @__PURE__ */ R("div", {
						className: p("pl-6 pb-2"),
						children: [
							(() => {
								let t = i?.(e.id);
								return t && a ? /* @__PURE__ */ L("div", {
									className: p("py-1 px-2.5 bg-surface-panel rounded border-l-2 border-l-border-emphasis", e.items.length > 0 ? "mb-2" : ""),
									children: /* @__PURE__ */ L(k, {
										fragment: t,
										ydoc: a,
										provider: o ?? null,
										user: {
											name: "",
											color: ""
										},
										editable: !1
									})
								}) : _ ? /* @__PURE__ */ L("div", {
									className: p("text-[13px] text-text-primary leading-relaxed whitespace-pre-wrap py-2 px-2.5 bg-surface-panel rounded border-l-2 border-l-border-emphasis", e.items.length > 0 ? "mb-2" : ""),
									children: m.trim()
								}) : null;
							})(),
							e.items.map((e) => /* @__PURE__ */ R("div", {
								className: p("flex items-center gap-1.5 py-[3px] text-xs text-neutral"),
								children: [/* @__PURE__ */ L("span", {
									className: p("shrink-0"),
									children: fn(e.status)
								}), /* @__PURE__ */ L("span", {
									className: p(e.status === "acked" || e.status === "done" ? "line-through" : ""),
									children: e.text
								})]
							}, e.id)),
							h.length > 0 && /* @__PURE__ */ R("div", {
								className: p("mt-2 pt-1.5 border-t border-border-subtle"),
								children: [
									/* @__PURE__ */ R("div", {
										className: p("text-[11px] font-semibold text-text-tertiary mb-1"),
										children: [
											"Comments (",
											f,
											")"
										]
									}),
									h.slice(0, 3).map((e) => /* @__PURE__ */ R("div", {
										className: p("text-xs text-neutral py-0.5 flex gap-1.5"),
										children: [/* @__PURE__ */ R("span", {
											className: p("font-semibold text-text-secondary shrink-0"),
											children: [e.displayName, ":"]
										}), /* @__PURE__ */ L("span", {
											className: p("overflow-hidden text-ellipsis whitespace-nowrap"),
											children: e.text
										})]
									}, e.id)),
									h.length > 3 && /* @__PURE__ */ R("div", {
										className: p("text-[11px] text-text-tertiary mt-0.5"),
										children: [
											"+",
											h.length - 3,
											" more"
										]
									})
								]
							}),
							!_ && e.items.length === 0 && h.length === 0 && /* @__PURE__ */ L("div", {
								className: p("text-xs text-text-tertiary italic"),
								children: "No content in this section"
							})
						]
					})]
				}, e.id);
			})
		})]
	});
}
//#endregion
//#region src/components/doc-editor/ReaderMode.tsx
function yn(e) {
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
function bn(e) {
	return e >= 75 ? "var(--color-success)" : e >= 25 ? "var(--color-warning)" : "var(--color-danger)";
}
var xn = {
	editor: "var(--color-success)",
	reviewer: "var(--color-warning)",
	reader: "var(--color-text-tertiary)"
}, Sn = {
	editor: "editing",
	reviewer: "reviewing",
	reader: "reading"
};
function Cn({ sections: e }) {
	let t = (e, t) => {
		e.preventDefault();
		let n = document.getElementById(`section-${t}`);
		n && n.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};
	return /* @__PURE__ */ R("aside", {
		"data-testid": "reader-toc",
		className: p("sticky top-4 self-start bg-surface border border-border rounded-lg p-4 mb-3"),
		children: [/* @__PURE__ */ L("h3", {
			className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
			children: "Contents"
		}), /* @__PURE__ */ L("nav", { children: /* @__PURE__ */ L("ol", {
			className: p("list-none m-0 p-0 flex flex-col gap-1"),
			children: e.map((e, n) => /* @__PURE__ */ L("li", { children: /* @__PURE__ */ R("a", {
				href: `#section-${e.id}`,
				"data-testid": `toc-link-${e.id}`,
				onClick: (n) => t(n, e.id),
				className: p("block py-1 px-1.5 text-[13px] text-text-secondary no-underline rounded border-l-2 border-l-transparent transition-colors duration-75 hover:bg-surface-hover hover:border-l-primary"),
				children: [
					/* @__PURE__ */ R("span", {
						className: p("font-medium text-text-primary"),
						children: [n + 1, "."]
					}),
					" ",
					e.title || `Section ${n + 1}`
				]
			}) }, e.id))
		}) })]
	});
}
function wn({ reviewed: e, total: t }) {
	let n = t > 0 ? Math.round(e / t * 100) : 0, r = bn(n);
	return /* @__PURE__ */ R("div", {
		className: p("bg-surface border border-border rounded-lg p-4 mb-3"),
		children: [
			/* @__PURE__ */ L("h3", {
				className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
				children: "Progress"
			}),
			/* @__PURE__ */ L("div", {
				className: p("flex items-baseline gap-1 mb-2"),
				children: /* @__PURE__ */ R("span", {
					className: p("text-[28px] font-bold leading-none"),
					style: { color: r },
					children: [n, "%"]
				})
			}),
			/* @__PURE__ */ L("div", {
				className: p("h-2 bg-surface-emphasis rounded overflow-hidden mb-1.5"),
				children: /* @__PURE__ */ L("div", {
					className: p("h-full rounded transition-[width] duration-300 ease-in-out"),
					style: {
						width: `${n}%`,
						background: r
					}
				})
			}),
			/* @__PURE__ */ R("div", {
				className: p("text-xs text-neutral"),
				children: [
					e,
					" of ",
					t,
					" items reviewed"
				]
			})
		]
	});
}
function Tn({ participants: e, meta: t }) {
	let n = /* @__PURE__ */ new Set(), r = [];
	for (let t of e) {
		let e = t.userId || t.clientId;
		n.has(e) || (n.add(e), r.push({
			name: t.displayName,
			color: t.color,
			mode: t.mode,
			isOnline: !0
		}));
	}
	return t.createdBy && !n.has(t.createdBy) && r.push({
		name: t.createdByName || t.createdBy,
		color: "#6b7280",
		isOnline: !1
	}), /* @__PURE__ */ R("div", {
		className: p("bg-surface border border-border rounded-lg p-4 mb-3"),
		children: [
			/* @__PURE__ */ L("h3", {
				className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
				children: "Contributors"
			}),
			/* @__PURE__ */ L("div", {
				className: p("flex flex-wrap gap-1.5 mb-3"),
				children: r.map((e, t) => {
					let n = e.name.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
					return /* @__PURE__ */ R("div", {
						title: `${e.name}${e.mode ? ` (${Sn[e.mode] ?? e.mode})` : ""}`,
						className: p("relative"),
						children: [/* @__PURE__ */ L("div", {
							className: p("w-8 h-8 rounded-full text-white flex items-center justify-center text-[11px] font-bold"),
							style: { background: e.color },
							children: n
						}), e.isOnline && /* @__PURE__ */ L("div", {
							className: p("absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white"),
							style: { background: xn[e.mode ?? "reader"] ?? "var(--color-text-tertiary)" }
						})]
					}, `${e.name}-${t}`);
				})
			}),
			/* @__PURE__ */ L("div", {
				className: p("flex flex-col gap-1.5"),
				children: r.map((e, t) => /* @__PURE__ */ R("div", {
					className: p("flex items-center gap-2 text-[13px]"),
					children: [
						/* @__PURE__ */ L("span", {
							className: p("w-2 h-2 rounded-full shrink-0"),
							style: { background: e.isOnline ? xn[e.mode ?? "reader"] ?? "var(--color-text-tertiary)" : "var(--color-border-field)" }
						}),
						/* @__PURE__ */ L("span", {
							className: p("font-medium text-text-primary flex-1"),
							children: e.name
						}),
						/* @__PURE__ */ L("span", {
							className: p("text-[11px] text-text-tertiary"),
							children: e.isOnline ? Sn[e.mode ?? ""] ?? "online" : "offline"
						})
					]
				}, `detail-${e.name}-${t}`))
			})
		]
	});
}
function En({ sections: e, allItems: t, completedCount: n, commentCounts: r, meta: i }) {
	let a = r ? Object.values(r).reduce((e, t) => e + t, 0) : 0;
	return /* @__PURE__ */ R("div", {
		className: p("bg-surface border border-border rounded-lg p-4 mb-3"),
		children: [
			/* @__PURE__ */ L("h3", {
				className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
				children: "Document Info"
			}),
			/* @__PURE__ */ R("div", {
				className: p("flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle"),
				children: [/* @__PURE__ */ L("span", {
					className: p("text-neutral"),
					children: "Sections"
				}), /* @__PURE__ */ L("span", {
					className: p("font-semibold"),
					children: e.length
				})]
			}),
			/* @__PURE__ */ R("div", {
				className: p("flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle"),
				children: [/* @__PURE__ */ L("span", {
					className: p("text-neutral"),
					children: "Total tasks"
				}), /* @__PURE__ */ L("span", {
					className: p("font-semibold"),
					children: t.length
				})]
			}),
			/* @__PURE__ */ R("div", {
				className: p("flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle"),
				children: [/* @__PURE__ */ L("span", {
					className: p("text-neutral"),
					children: "Completed"
				}), /* @__PURE__ */ L("span", {
					className: p("font-semibold text-success-fg"),
					children: n
				})]
			}),
			a > 0 && /* @__PURE__ */ R("div", {
				className: p("flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle"),
				children: [/* @__PURE__ */ L("span", {
					className: p("text-neutral"),
					children: "Comments"
				}), /* @__PURE__ */ L("span", {
					className: p("font-semibold"),
					children: a
				})]
			}),
			i.createdAt && /* @__PURE__ */ R("div", {
				className: p("flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle"),
				children: [/* @__PURE__ */ L("span", {
					className: p("text-neutral"),
					children: "Created"
				}), /* @__PURE__ */ L("span", {
					className: p("font-medium text-xs"),
					children: yn(i.createdAt)
				})]
			}),
			i.updatedAt && /* @__PURE__ */ R("div", {
				className: p("flex justify-between py-1 text-[13px] text-text-primary"),
				children: [/* @__PURE__ */ L("span", {
					className: p("text-neutral"),
					children: "Last changed"
				}), /* @__PURE__ */ L("span", {
					className: p("font-medium text-xs"),
					children: yn(i.updatedAt)
				})]
			})
		]
	});
}
function Dn({ sections: e, participants: t, meta: n, commentCounts: r, sectionContentTexts: i, comments: a, getSectionFragment: o, ydoc: s, provider: c }) {
	let l = e.flatMap((e) => e.items), u = l.filter((e) => e.status !== "pending").length, d = l.filter((e) => e.status === "acked" || e.status === "done").length, f = sn(l, e), m = e.length >= 2;
	return /* @__PURE__ */ R("div", {
		className: p("grid gap-4 mx-auto", m ? "[grid-template-columns:200px_1fr_280px] max-w-[1300px]" : "[grid-template-columns:1fr_280px] max-w-[1100px]"),
		children: [
			/* @__PURE__ */ L(cn, {
				meta: n,
				participantCount: t.length
			}),
			m && /* @__PURE__ */ L(Cn, { sections: e }),
			/* @__PURE__ */ R("div", { children: [
				/* @__PURE__ */ L(ln, {
					bullets: f,
					contentText: (() => {
						let t = e.find((e) => e.type === "summary");
						return t ? i?.[t.id] : void 0;
					})(),
					fragment: (() => {
						let t = e.find((e) => e.type === "summary");
						return t ? o?.(t.id) : null;
					})(),
					ydoc: s,
					provider: c
				}),
				/* @__PURE__ */ L(gn, { sections: e }),
				/* @__PURE__ */ L(_n, { allItems: l }),
				/* @__PURE__ */ L(vn, {
					sections: e,
					commentCounts: r,
					sectionContentTexts: i,
					comments: a,
					getSectionFragment: o,
					ydoc: s,
					provider: c
				})
			] }),
			/* @__PURE__ */ R("div", { children: [
				/* @__PURE__ */ L(wn, {
					reviewed: u,
					total: l.length
				}),
				/* @__PURE__ */ L(Tn, {
					participants: t,
					meta: n
				}),
				/* @__PURE__ */ L(En, {
					sections: e,
					allItems: l,
					completedCount: d,
					commentCounts: r,
					meta: n
				})
			] })
		]
	});
}
//#endregion
//#region src/components/doc-editor/EditorModeSwitch.tsx
function On({ mode: e, isEmpty: t, isCanvas: n = !1, isFinalized: r, sections: i, documentId: a, displayName: o, color: s, userId: c, ydoc: l, provider: u, getSectionFragment: d, updateSection: f, participants: m, focusedSectionId: h, onSectionFocus: g, comments: _, onAddComment: v, onResolveThread: y, onUnresolveThread: b, onUpdateCursorInfo: x, onOpenComments: S, onAddItem: C, onUpdateItem: w, onRemoveItem: T, restItems: ee, itemErrors: te, commentSidebarOpen: ne, commentSectionId: E, commentSidebarTop: D, sectionListRef: O, onCloseComments: k, showVideoCall: re, isVideoDocked: ie, showInlineVideo: ae, sidebarFixed: A, videoSpacerRef: j, videoLeft: M, FIXED_TOP: N, showTOC: P, sectionReviews: F, reviewSection: z, headerMeta: B, onLoadDemo: V, activityPublish: oe }) {
	let H = Object.keys(te ?? {}).map((e) => i.find((t) => t.id === e)?.title || e);
	return /* @__PURE__ */ R(I, { children: [
		H.length > 0 && /* @__PURE__ */ R("div", {
			role: "alert",
			"data-testid": "item-load-error-banner",
			className: p("rounded-lg border px-4 py-2.5 mb-3 text-[13px]", "bg-warning-bg border-warning-border text-warning-fg"),
			children: [
				"Action items could not be loaded for",
				" ",
				H.length === 1 ? `"${H[0]}"` : `${H.length} sections: ${H.map((e) => `"${e}"`).join(", ")}`,
				". These sections may have items that are not shown."
			]
		}),
		r && e === "editor" && /* @__PURE__ */ L("div", {
			className: p("rounded-lg border px-4 py-2.5 mb-3 text-center text-[13px] font-medium", "bg-warning-bg border-warning-border text-warning-fg"),
			children: "This document has been finalized and is read-only"
		}),
		n && /* @__PURE__ */ R("div", {
			"data-testid": "canvas-not-section-routable",
			className: "text-center py-12 px-4 text-text-secondary",
			children: [/* @__PURE__ */ L("p", {
				className: "text-[15px] mb-1",
				children: "This is a page document."
			}), /* @__PURE__ */ L("p", {
				className: "text-[13px] text-text-tertiary",
				children: "Section, review and reader views describe a sectioned document. Render a page with CanvasDocumentView."
			})]
		}),
		!n && t && /* @__PURE__ */ R("div", {
			className: "text-center py-12 px-4 text-text-secondary",
			children: [
				/* @__PURE__ */ L("p", {
					className: "text-lg mb-4",
					children: "No document content yet."
				}),
				/* @__PURE__ */ L("button", {
					onClick: V,
					className: p("px-6 py-2.5 text-[15px] font-semibold border-none rounded-lg", "bg-primary text-on-primary cursor-pointer font-[inherit]"),
					children: "Load Demo Document"
				}),
				/* @__PURE__ */ L("p", {
					className: "text-[13px] mt-3 text-text-tertiary",
					children: "Loads a sample Q2 Sprint Planning document with tasks, decisions, and notes."
				})
			]
		}),
		!n && !t && e === "editor" && l && /* @__PURE__ */ R("div", {
			ref: O,
			className: "flex gap-4 relative min-w-0",
			children: [
				re && !ie && ae && /* @__PURE__ */ L("div", {
					ref: j,
					className: "w-[240px] shrink-0",
					children: /* @__PURE__ */ L("div", {
						id: "inline-video-slot",
						className: p(A && "fixed z-30"),
						style: A ? {
							top: N,
							left: M,
							width: 240
						} : void 0
					})
				}),
				/* @__PURE__ */ R("div", {
					className: p("flex-1 min-w-0", ne ? "pr-0" : P && i.length > 1 && e === "editor" ? "pr-48" : "pr-12"),
					children: [/* @__PURE__ */ L(Nt, {
						sections: i.map((e) => {
							let t = e.items ?? [], n = ee[e.id] ?? [], r = [...t, ...n.filter((e) => !t.some((t) => t.id === e.id))];
							return {
								...e,
								items: r
							};
						}),
						getSectionFragment: d,
						ydoc: l,
						provider: u,
						user: {
							name: o,
							color: s
						},
						editable: !r,
						onUpdateSection: f,
						onAddItem: C,
						onUpdateItem: w,
						onRemoveItem: T,
						participants: m,
						onSectionFocus: g,
						focusedSectionId: h,
						comments: _,
						onAddComment: v,
						onResolveThread: y,
						onUnresolveThread: b,
						onUpdateCursorInfo: x,
						onOpenComments: S
					}), /* @__PURE__ */ L(Bt, {
						documentId: a,
						editable: !r
					})]
				}),
				ne && E && /* @__PURE__ */ R("div", {
					className: p("w-[420px] shrink-0 rounded-lg border border-border", "bg-surface-inset flex flex-col max-h-[calc(100vh-180px)] overflow-hidden"),
					style: { marginTop: D },
					children: [/* @__PURE__ */ R("div", {
						className: "flex items-center justify-between px-3.5 py-3 border-b border-border shrink-0",
						children: [/* @__PURE__ */ L("div", {
							className: "text-[13px] font-semibold text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap flex-1 mr-2",
							children: i.find((e) => e.id === E)?.title ?? "Comments"
						}), /* @__PURE__ */ L("button", {
							type: "button",
							onClick: k,
							className: p("border-none bg-transparent cursor-pointer", "text-base text-neutral px-1.5 py-0.5 rounded leading-none shrink-0"),
							title: "Close comments",
							children: "✕"
						})]
					}), /* @__PURE__ */ L("div", {
						className: "flex-1 overflow-y-auto px-3 py-3.5",
						children: /* @__PURE__ */ L(Zt, {
							comments: _[E] ?? [],
							onAddComment: (e, t) => v(E, e, t),
							participants: m,
							onResolveThread: (e) => y(E, e),
							onUnresolveThread: (e) => b(E, e)
						})
					})]
				})
			]
		}),
		!n && !t && e === "ack" && l && /* @__PURE__ */ L(tn, {
			sections: i,
			participants: m,
			userId: c,
			getSectionFragment: d,
			ydoc: l,
			provider: u,
			sectionReviews: F,
			reviewSection: (e, t, n) => {
				z(e, t, n);
				let r = i.find((t) => t.id === e);
				oe(`doc.review_${t}`, {
					sectionTitle: r?.title,
					status: t,
					documentId: a,
					documentTitle: B?.title
				});
			},
			comments: _,
			onAddComment: v,
			onResolveThread: y,
			onUnresolveThread: b,
			onSectionFocus: g
		}),
		!n && !t && e === "reader" && l && /* @__PURE__ */ L(Dn, {
			sections: i,
			participants: m,
			meta: B,
			commentCounts: Object.fromEntries(Object.entries(_).map(([e, t]) => [e, Gt(t)])),
			sectionContentTexts: Object.fromEntries(i.map((e) => {
				let t = d(e.id);
				return [e.id, t ? je(t) : ""];
			})),
			comments: _,
			getSectionFragment: d,
			ydoc: l,
			provider: u
		})
	] });
}
//#endregion
//#region src/components/doc-editor/DiffViewer.tsx
function kn(e, t) {
	let n = new Map(e.map((e) => [e.id, e])), r = new Map(t.map((e) => [e.id, e])), i = [];
	for (let t of e) {
		let e = r.get(t.id);
		if (!e) i.push({
			status: "removed",
			oldItem: t,
			changes: []
		});
		else {
			let n = [];
			t.text !== e.text && n.push("text"), t.status !== e.status && n.push(`status: ${t.status} -> ${e.status}`), t.assignee !== e.assignee && n.push(`assignee: "${t.assignee}" -> "${e.assignee}"`), t.priority !== e.priority && n.push(`priority: ${t.priority} -> ${e.priority}`), n.length > 0 ? i.push({
				status: "modified",
				oldItem: t,
				newItem: e,
				changes: n
			}) : i.push({
				status: "unchanged",
				oldItem: t,
				newItem: e,
				changes: []
			});
		}
	}
	for (let e of t) n.has(e.id) || i.push({
		status: "added",
		newItem: e,
		changes: []
	});
	return i;
}
function An(e, t) {
	let n = new Map(e.map((e) => [e.id, e])), r = new Map(t.map((e) => [e.id, e])), i = [];
	for (let t of e) {
		let e = r.get(t.id);
		if (!e) i.push({
			status: "removed",
			id: t.id,
			oldTitle: t.title,
			titleChanged: !1,
			itemDiffs: t.items.map((e) => ({
				status: "removed",
				oldItem: e,
				changes: []
			}))
		});
		else {
			let n = t.title !== e.title, r = (t.textContent || "") !== (e.textContent || ""), a = kn(t.items, e.items), o = n || r || a.some((e) => e.status !== "unchanged");
			i.push({
				status: o ? "modified" : "unchanged",
				id: t.id,
				oldTitle: t.title,
				newTitle: e.title,
				titleChanged: n,
				textChanged: r,
				oldTextContent: t.textContent,
				newTextContent: e.textContent,
				itemDiffs: a
			});
		}
	}
	for (let e of t) n.has(e.id) || i.push({
		status: "added",
		id: e.id,
		newTitle: e.title,
		titleChanged: !1,
		itemDiffs: e.items.map((e) => ({
			status: "added",
			newItem: e,
			changes: []
		}))
	});
	return i;
}
var jn = {
	added: "bg-success-bg border-success-border",
	removed: "bg-danger-bg border-danger-border",
	modified: "bg-warning-bg border-warning-border",
	unchanged: "bg-transparent border-border"
};
function Mn(e) {
	return e === "added" ? "text-success-fg bg-success-bg" : e === "removed" ? "text-danger-fg bg-danger-bg" : e === "modified" ? "text-warning-fg bg-warning-border" : "text-text-secondary bg-surface-hover";
}
function Nn(e) {
	return e === "added" ? "bg-success-bg text-success-fg" : e === "removed" ? "bg-danger-bg text-danger-fg line-through" : e === "modified" ? "bg-warning-bg text-warning-fg" : "bg-transparent text-text-primary";
}
function Pn({ oldSections: e, newSections: t, onClose: n }) {
	let r = An(e, t), i = r.some((e) => e.status !== "unchanged");
	return /* @__PURE__ */ R("div", {
		className: p("border-t border-border bg-surface-inset max-h-[400px] overflow-auto px-4 py-3"),
		children: [
			/* @__PURE__ */ R("div", {
				className: p("flex items-center justify-between mb-2"),
				children: [/* @__PURE__ */ L("h4", {
					className: p("text-[13px] font-semibold text-text-primary m-0"),
					children: "Changes from selected version to current"
				}), /* @__PURE__ */ L("button", {
					type: "button",
					className: p("px-2 py-0.5 text-xs border border-border-field rounded bg-surface text-text-secondary cursor-pointer font-[inherit]"),
					onClick: n,
					children: "Dismiss"
				})]
			}),
			!i && /* @__PURE__ */ L("div", {
				className: p("text-[13px] text-text-tertiary text-center p-4"),
				children: "No differences found. The documents are identical."
			}),
			r.filter((e) => e.status !== "unchanged").map((e) => /* @__PURE__ */ R("div", {
				className: p("border rounded-md p-2 px-2.5 mb-1.5", jn[e.status]),
				children: [
					/* @__PURE__ */ R("div", {
						className: p("flex items-center gap-2 mb-1"),
						children: [
							/* @__PURE__ */ L("span", {
								className: p("text-[10px] font-semibold uppercase px-1.5 py-px rounded-sm", Mn(e.status)),
								children: e.status
							}),
							/* @__PURE__ */ L("span", {
								className: p("text-[13px] font-semibold text-text-primary"),
								children: e.status === "removed" ? e.oldTitle : e.newTitle ?? e.oldTitle
							}),
							e.titleChanged && /* @__PURE__ */ R("span", {
								className: p("text-[11px] text-warning-fg"),
								children: [
									"(was: \"",
									e.oldTitle,
									"\")"
								]
							})
						]
					}),
					e.itemDiffs.filter((e) => e.status !== "unchanged").map((e, t) => {
						let n = e.newItem ?? e.oldItem;
						return /* @__PURE__ */ R("div", { children: [/* @__PURE__ */ R("div", {
							className: p("text-xs px-2 py-0.5 rounded-sm mt-0.5", Nn(e.status)),
							children: [
								e.status === "added" && "+ ",
								e.status === "removed" && "- ",
								e.status === "modified" && "~ ",
								n?.text ?? "(untitled)",
								n?.assignee ? ` [${n.assignee}]` : ""
							]
						}), e.changes.length > 0 && /* @__PURE__ */ L("div", {
							className: p("text-[11px] text-warning-fg ml-4 italic"),
							children: e.changes.join(", ")
						})] }, n?.id ?? t);
					}),
					e.textChanged && /* @__PURE__ */ R("div", {
						className: p("mt-1 text-xs"),
						children: [e.oldTextContent && /* @__PURE__ */ R("div", {
							className: p("px-2 py-1 rounded-sm bg-danger-bg text-danger-fg line-through mb-0.5"),
							children: [e.oldTextContent.substring(0, 200), (e.oldTextContent?.length ?? 0) > 200 ? "..." : ""]
						}), e.newTextContent && /* @__PURE__ */ R("div", {
							className: p("px-2 py-1 rounded-sm bg-success-bg text-success-fg"),
							children: [e.newTextContent.substring(0, 200), (e.newTextContent?.length ?? 0) > 200 ? "..." : ""]
						})]
					}),
					e.status === "modified" && !e.textChanged && e.itemDiffs.every((e) => e.status === "unchanged") && e.titleChanged && /* @__PURE__ */ L("div", {
						className: p("text-xs text-text-secondary mt-0.5"),
						children: "Only the section title changed."
					})
				]
			}, e.id))
		]
	});
}
//#endregion
//#region src/components/doc-editor/VersionHistoryPanel.tsx
function Fn(e) {
	let t = Math.floor(e / 1e3);
	if (t < 60) return `${t}s ago`;
	let n = Math.floor(t / 60);
	if (n < 60) return `${n} min ago`;
	let r = Math.floor(n / 60);
	if (r < 24) return `${r} hour${r === 1 ? "" : "s"} ago`;
	let i = Math.floor(r / 24);
	if (i < 30) return `${i} day${i === 1 ? "" : "s"} ago`;
	let a = Math.floor(i / 30);
	return `${a} month${a === 1 ? "" : "s"} ago`;
}
function In({ versions: e, loading: t, previewTimestamp: n, onFetch: r, onPreview: i, onClearPreview: a, onClose: o, onSaveVersion: s, onCompare: c, onClearCompare: l, compareSections: u, compareTimestamp: d, currentSections: f, onRestore: m }) {
	let h = () => {
		a(), l(), o();
	}, g = () => {
		let e = window.prompt("Enter a name for this version:");
		e && e.trim() && s?.(e.trim());
	}, _ = (e, t) => {
		e.stopPropagation(), d === t ? l() : c?.(t);
	}, v = (e) => e.type === "pre-restore" ? "Before restore" : e.type === "auto" ? "Auto-save" : "";
	return /* @__PURE__ */ R(gt, {
		width: 320,
		children: [
			/* @__PURE__ */ L(_t, {
				title: "Version History",
				onClose: h,
				actions: s ? /* @__PURE__ */ L(xt, {
					size: "sm",
					onClick: g,
					children: "Save Version"
				}) : void 0
			}),
			/* @__PURE__ */ R(vt, {
				padding: "0.5rem 0",
				children: [
					t && /* @__PURE__ */ L("div", {
						className: p("py-8 px-4 text-center text-text-tertiary text-[13px]"),
						children: "Loading..."
					}),
					!t && e.length === 0 && /* @__PURE__ */ L("div", {
						className: p("py-8 px-4 text-center text-text-tertiary text-[13px]"),
						children: "No saved versions yet"
					}),
					!t && e.map((e) => /* @__PURE__ */ R("div", {
						role: "button",
						tabIndex: 0,
						className: p("flex items-center justify-between py-2.5 px-4 cursor-pointer text-[13px] text-text-primary", n === e.timestamp ? "bg-info-bg border-l-[3px] border-l-info" : "bg-transparent border-l-[3px] border-l-transparent"),
						onClick: () => i(e.timestamp),
						onKeyDown: E(() => i(e.timestamp)),
						children: [/* @__PURE__ */ R("div", {
							className: p("flex-1 min-w-0"),
							children: [
								e.name && /* @__PURE__ */ L("span", {
									className: p("text-xs font-semibold text-text-primary block mb-px"),
									children: e.name
								}),
								/* @__PURE__ */ R("span", {
									className: p("flex items-center gap-1"),
									children: [Fn(e.age), e.type && e.type !== "manual" && /* @__PURE__ */ L("span", {
										className: p("text-[10px] font-medium px-[5px] py-px rounded-[3px] ml-1.5", e.type === "pre-restore" ? "bg-warning-bg text-warning-fg" : e.type === "auto" ? "bg-surface-hover text-text-tertiary" : "bg-info-bg text-info-fg"),
										children: v(e)
									})]
								}),
								e.author && /* @__PURE__ */ R("span", {
									className: p("text-[10px] text-text-tertiary block"),
									children: ["by ", e.author]
								}),
								/* @__PURE__ */ L("span", {
									className: p("text-[11px] text-text-tertiary"),
									children: new Date(e.timestamp).toLocaleString()
								})
							]
						}), c && /* @__PURE__ */ L("button", {
							type: "button",
							className: p("px-2 py-[3px] text-[11px] font-medium border rounded-[4px] cursor-pointer font-[inherit] whitespace-nowrap", d === e.timestamp ? "bg-info-bg border-info text-info-fg" : "bg-surface border-border text-text-secondary"),
							onClick: (t) => _(t, e.timestamp),
							children: d === e.timestamp ? "Hide Diff" : "Compare"
						})]
					}, e.timestamp))
				]
			}),
			u != null && /* @__PURE__ */ L(Pn, {
				oldSections: u,
				newSections: f,
				onClose: l
			}),
			m && d != null && /* @__PURE__ */ R("div", {
				className: p("py-3 px-4 border-t border-border shrink-0"),
				children: [/* @__PURE__ */ L(xt, {
					variant: "primary",
					onClick: () => {
						window.confirm("Restore this version?\n\nA checkpoint of the current state will be saved first. All connected users will see the restored content. Comments and reviews added after this version may be lost.") && (m(d), l());
					},
					className: "w-full px-4 py-2.5 text-sm font-semibold rounded-lg",
					children: "Restore this version"
				}), /* @__PURE__ */ L("div", {
					className: p("text-[11px] text-text-tertiary text-center mt-1.5"),
					children: "A pre-restore checkpoint will be saved automatically"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/MyMentionsPanel.tsx
function Ln(e) {
	let t = typeof e == "number" ? e : Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	if (n < 60) return `${n}s ago`;
	let r = Math.floor(n / 60);
	if (r < 60) return `${r} min ago`;
	let i = Math.floor(r / 60);
	if (i < 24) return `${i} hour${i === 1 ? "" : "s"} ago`;
	let a = Math.floor(i / 24);
	if (a < 30) return `${a} day${a === 1 ? "" : "s"} ago`;
	let o = Math.floor(a / 30);
	return `${o} month${o === 1 ? "" : "s"} ago`;
}
function Rn(e) {
	return e.split(/\s+/).map((e) => e[0]).join("").toUpperCase().slice(0, 2);
}
function zn({ item: e, onClick: t, onDismiss: n }) {
	return /* @__PURE__ */ R("div", {
		role: "button",
		tabIndex: 0,
		className: p("flex gap-2.5 py-2.5 px-4 cursor-pointer border-b border-border-subtle items-start hover:bg-surface-inset"),
		onClick: t,
		onKeyDown: E(t),
		children: [
			/* @__PURE__ */ L("div", {
				className: p("w-7 h-7 rounded-full text-white text-[11px] font-semibold flex items-center justify-center shrink-0"),
				style: { background: e.authorColor },
				children: Rn(e.authorName)
			}),
			/* @__PURE__ */ R("div", {
				className: p("flex-1 min-w-0"),
				children: [/* @__PURE__ */ L("div", {
					className: p("text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
					children: e.commentText
				}), e.sectionTitle && /* @__PURE__ */ L("div", {
					className: p("text-[11px] text-text-tertiary mt-0.5"),
					children: e.sectionTitle
				})]
			}),
			/* @__PURE__ */ L("div", {
				className: p("text-[11px] text-text-tertiary shrink-0 mt-0.5"),
				children: Ln(e.timestamp)
			}),
			/* @__PURE__ */ L("button", {
				type: "button",
				onClick: (e) => {
					e.stopPropagation(), n();
				},
				"aria-label": "Dismiss mention",
				className: p("px-1.5 py-0.5 text-[13px] text-text-tertiary bg-transparent border-none cursor-pointer leading-none shrink-0"),
				children: "x"
			})
		]
	});
}
function Bn({ item: e, onClick: t, onDismiss: n }) {
	let r = {
		high: "var(--color-danger)",
		medium: "var(--color-warning)",
		low: "var(--color-success)"
	}, i = {
		pending: {
			bg: "var(--color-warning-bg)",
			text: "var(--color-warning-fg)"
		},
		acked: {
			bg: "var(--color-info-bg)",
			text: "var(--color-info-fg)"
		},
		done: {
			bg: "var(--color-success-bg)",
			text: "var(--color-success-fg)"
		},
		rejected: {
			bg: "var(--color-danger-bg)",
			text: "var(--color-danger-fg)"
		}
	}, a = i[e.status] ?? i.pending;
	return /* @__PURE__ */ R("div", {
		role: "button",
		tabIndex: 0,
		className: p("flex gap-2.5 py-2.5 px-4 cursor-pointer border-b border-border-subtle items-start hover:bg-surface-inset"),
		onClick: t,
		onKeyDown: E(t),
		children: [
			/* @__PURE__ */ L("div", {
				className: p("w-2 h-2 rounded-full shrink-0 mt-1"),
				style: { background: r[e.priority] ?? "var(--color-text-tertiary)" }
			}),
			/* @__PURE__ */ R("div", {
				className: p("flex-1 min-w-0"),
				children: [/* @__PURE__ */ R("div", {
					className: p("text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
					children: [e.taskText, /* @__PURE__ */ L("span", {
						className: p("inline-block text-[10px] font-semibold px-1.5 py-px rounded-full ml-1.5"),
						style: {
							background: a.bg,
							color: a.text
						},
						children: e.status
					})]
				}), e.sectionTitle && /* @__PURE__ */ L("div", {
					className: p("text-[11px] text-text-tertiary mt-0.5"),
					children: e.sectionTitle
				})]
			}),
			/* @__PURE__ */ L("button", {
				type: "button",
				onClick: (e) => {
					e.stopPropagation(), n();
				},
				"aria-label": "Dismiss task",
				className: p("px-1.5 py-0.5 text-[13px] text-text-tertiary bg-transparent border-none cursor-pointer leading-none shrink-0"),
				children: "x"
			})
		]
	});
}
function Vn({ items: e, onNavigateToSection: t, onClose: n }) {
	let [r, i] = F("all"), [a, o] = F(/* @__PURE__ */ new Set()), s = (e) => {
		o((t) => {
			let n = new Set(t);
			return n.add(e), n;
		});
	}, c = () => {
		let e = l.map((e) => e.kind === "mention" ? e.commentId : e.itemId);
		o((t) => {
			let n = new Set(t);
			return e.forEach((e) => n.add(e)), n;
		});
	}, l = e.filter((e) => {
		let t = e.kind === "mention" ? e.commentId : e.itemId;
		return a.has(t) ? !1 : r === "all" ? !0 : r === "mentions" ? e.kind === "mention" : e.kind === "task";
	});
	return /* @__PURE__ */ R(gt, {
		width: 340,
		children: [
			/* @__PURE__ */ L(_t, {
				title: "My Mentions & Tasks",
				onClose: n,
				actions: l.length > 0 ? /* @__PURE__ */ L(xt, {
					variant: "default",
					size: "sm",
					onClick: c,
					children: "Clear all"
				}) : void 0
			}),
			/* @__PURE__ */ L("div", {
				className: p("flex gap-0 border-b border-border shrink-0"),
				children: [
					"all",
					"mentions",
					"tasks"
				].map((e) => /* @__PURE__ */ L("button", {
					type: "button",
					className: p("flex-1 py-2 text-[13px] bg-transparent border-none cursor-pointer font-[inherit]", r === e ? "font-semibold text-primary border-b-2 border-b-primary" : "font-normal text-text-secondary border-b-2 border-b-transparent"),
					onClick: () => i(e),
					children: e === "all" ? "All" : e === "mentions" ? "Mentions" : "Tasks"
				}, e))
			}),
			/* @__PURE__ */ R(vt, {
				padding: "0.5rem 0",
				children: [l.length === 0 && /* @__PURE__ */ L("div", {
					className: p("py-8 px-4 text-center text-text-tertiary text-[13px]"),
					children: "No mentions or tasks for you"
				}), l.map((e) => e.kind === "mention" ? /* @__PURE__ */ L(zn, {
					item: e,
					onClick: () => t(e.sectionId, e.commentId),
					onDismiss: () => s(e.commentId)
				}, e.commentId) : /* @__PURE__ */ L(Bn, {
					item: e,
					onClick: () => t(e.sectionId),
					onDismiss: () => s(e.itemId)
				}, e.itemId))]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/VideoHistoryPanel.tsx
function Hn(e, t) {
	let n = new Date(e).getTime(), r = (t ? new Date(t).getTime() : Date.now()) - n, i = Math.floor(r / 6e4);
	return i < 1 ? "<1m" : i < 60 ? `${i}m` : `${Math.floor(i / 60)}h ${i % 60}m`;
}
function Un(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 6e4);
	if (n < 1) return "just now";
	if (n < 60) return `${n}m ago`;
	let r = Math.floor(n / 60);
	return r < 24 ? `${r}h ago` : `${Math.floor(r / 24)}d ago`;
}
function Wn({ sessions: e, loading: t, onFetch: n, onClose: r }) {
	j(() => {
		n();
	}, [n]);
	let i = e.filter((e) => e.status === "ended"), a = e.filter((e) => e.status === "active");
	return /* @__PURE__ */ R(gt, {
		width: 340,
		children: [/* @__PURE__ */ L(_t, {
			title: "Past Conversations",
			onClose: r
		}), /* @__PURE__ */ R(vt, {
			padding: "12px",
			children: [
				t && /* @__PURE__ */ L("div", {
					className: p("text-center text-text-tertiary text-[13px] py-6"),
					children: "Loading..."
				}),
				!t && e.length === 0 && /* @__PURE__ */ L("div", {
					className: p("text-center text-text-tertiary text-[13px] py-6"),
					children: "No video conversations yet for this document."
				}),
				a.map((e) => /* @__PURE__ */ L(Gn, {
					session: e,
					isActive: !0
				}, e.sessionId)),
				i.map((e) => /* @__PURE__ */ L(Gn, { session: e }, e.sessionId))
			]
		})]
	});
}
function Gn({ session: e, isActive: t }) {
	return /* @__PURE__ */ R("div", {
		className: p("rounded-lg p-3 mb-2", t ? "border border-success bg-[rgba(16,185,129,0.04)]" : "border border-border bg-surface"),
		children: [
			/* @__PURE__ */ R("div", {
				className: p("flex justify-between items-center mb-1"),
				children: [/* @__PURE__ */ L("span", {
					className: p("text-[11px] text-text-tertiary"),
					children: Un(e.startedAt)
				}), /* @__PURE__ */ R("div", {
					className: p("flex items-center gap-1"),
					children: [t && /* @__PURE__ */ L("span", {
						className: p("text-[11px] font-semibold text-success-fg bg-[rgba(16,185,129,0.1)] px-1.5 py-px rounded-full"),
						children: "Live"
					}), /* @__PURE__ */ L("span", {
						className: p("text-[11px] text-text-secondary"),
						children: Hn(e.startedAt, e.endedAt)
					})]
				})]
			}),
			/* @__PURE__ */ L("div", {
				className: p("flex flex-wrap gap-1 mb-2"),
				children: e.participants.map((e, t) => /* @__PURE__ */ L("span", {
					className: p("text-[11px] text-text-secondary bg-surface-panel px-2 py-0.5 rounded-full"),
					children: e.displayName || e.userId.slice(0, 10)
				}, `${e.userId}-${t}`))
			}),
			e.aiSummary && /* @__PURE__ */ L("div", {
				className: p("text-[11px] text-text-primary bg-surface-panel p-2 rounded-md leading-normal"),
				children: e.aiSummary
			}),
			e.transcriptStatus && e.transcriptStatus !== "available" && /* @__PURE__ */ R("div", {
				className: p("text-[11px] text-text-tertiary mt-1"),
				children: ["Transcript: ", e.transcriptStatus]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/TableOfContents.tsx
function Kn({ sections: e, focusedSectionId: t }) {
	let [n, r] = F(null);
	j(() => {
		if (e.length === 0) return;
		let t = new IntersectionObserver((e) => {
			let t = null;
			for (let n of e) n.isIntersecting && (!t || n.intersectionRatio > t.intersectionRatio) && (t = n);
			if (t) {
				let e = t.target.id.replace("section-", "");
				r(e);
			}
		}, {
			threshold: [
				0,
				.25,
				.5,
				.75,
				1
			],
			rootMargin: "-80px 0px -40% 0px"
		});
		for (let n of e) {
			let e = document.getElementById(`section-${n.id}`);
			e && t.observe(e);
		}
		return () => t.disconnect();
	}, [e]);
	let i = n || t, a = A((e) => {
		let t = document.getElementById(`section-${e}`);
		t && t.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}, []), o = e.filter((e, t, n) => n.findIndex((t) => t.id === e.id) === t);
	if (o.length === 0) return null;
	let s = o.findIndex((e) => e.id === i);
	return /* @__PURE__ */ R("div", {
		className: p("flex flex-col gap-0 text-[11px] w-[140px] max-h-[calc(100vh-160px)] overflow-y-auto"),
		children: [
			/* @__PURE__ */ L("div", {
				className: p("text-[10px] font-semibold text-text-tertiary uppercase tracking-wide mb-1.5"),
				children: "Contents"
			}),
			o.map((e, t) => {
				let n = e.id === i, r = s >= 0 && t < s;
				return /* @__PURE__ */ R("button", {
					type: "button",
					onClick: () => a(e.id),
					className: p("flex items-center gap-2 py-1 border-none bg-transparent cursor-pointer text-left font-[inherit]"),
					children: [/* @__PURE__ */ L("div", {
						className: p("flex flex-col items-center w-3 shrink-0"),
						children: /* @__PURE__ */ L("div", { className: p("rounded-full transition-all duration-200", n ? "w-2 h-2 bg-info shadow-[0_0_0_3px_rgba(59,130,246,0.2)]" : r ? "w-1.5 h-1.5 bg-neutral" : "w-1.5 h-1.5 bg-state-idle") })
					}), /* @__PURE__ */ L("span", {
						className: p("text-[11px] overflow-hidden text-ellipsis whitespace-nowrap transition-colors duration-200", n ? "font-semibold text-text-primary" : r ? "font-normal text-neutral" : "font-normal text-text-tertiary"),
						children: e.title || "Untitled"
					})]
				}, e.id);
			}),
			s >= 0 && /* @__PURE__ */ R("div", {
				className: p("text-[10px] text-text-tertiary mt-2"),
				children: [
					s + 1,
					" / ",
					o.length
				]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/EditorSidebarManager.tsx
function qn({ showHistory: e, showMyItems: t, showVideoHistory: n, closePanel: r, versionHistory: i, ydoc: a, myItems: o, onNavigateToSection: s, videoSessions: c, showTOC: l, isCanvas: u = !1, commentSidebarOpen: d, sections: f, focusedSectionId: m, mode: h }) {
	return /* @__PURE__ */ R(I, { children: [
		e && /* @__PURE__ */ L(In, {
			versions: i.versions,
			loading: i.loading,
			previewTimestamp: i.previewTimestamp,
			onFetch: i.fetchVersions,
			onPreview: i.previewVersion,
			onClearPreview: i.clearPreview,
			onClose: r,
			onSaveVersion: i.saveVersion,
			onCompare: i.compareVersion,
			onClearCompare: i.clearCompare,
			compareSections: i.compareSections,
			compareTimestamp: i.compareTimestamp,
			currentSections: a ? i.extractSections(a) : [],
			onRestore: i.restoreVersion
		}),
		t && /* @__PURE__ */ L(Vn, {
			items: o,
			onNavigateToSection: s,
			onClose: r
		}),
		n && /* @__PURE__ */ L(Wn, {
			sessions: c.sessions,
			loading: c.loading,
			onFetch: c.fetchSessions,
			onClose: r
		}),
		!u && l && !d && f.length > 1 && h === "editor" && /* @__PURE__ */ L("div", {
			className: p("fixed bottom-4 right-4 w-40 max-h-[280px] overflow-y-auto", "bg-surface border border-border rounded-[10px] px-3 py-2.5", "shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-30"),
			children: /* @__PURE__ */ L(Kn, {
				sections: f.map((e) => ({
					id: e.id,
					title: e.title
				})),
				focusedSectionId: m
			})
		})
	] });
}
//#endregion
//#region src/components/doc-editor/DocumentEditorPage.tsx
var Jn = /* @__PURE__ */ e({ default: () => Yn });
function Yn({ documentId: e, documentType: t, ws: n, userId: r, displayName: i, color: a = "var(--color-info)", onMessage: o, activityPublish: s, onBack: c, isVideoDocked: l, onDockVideo: u, onUndockVideo: d, idToken: f }) {
	let p = Me({
		documentId: e,
		documentType: t,
		ws: n,
		userId: r,
		displayName: i,
		color: a,
		onMessage: o,
		activityPublish: s,
		isVideoDocked: l,
		onDockVideo: u,
		idToken: f,
		onUndockVideo: d,
		onBack: c
	}), m = !p.isCanvas && p.sections.length === 0 && !p.demoLoaded, [h] = F(() => {
		if (typeof document > "u") return null;
		let e = document.createElement("div");
		return e.style.width = "100%", e;
	});
	j(() => {
		if (!h) return;
		if (!p.showVideoCall) {
			h.parentNode?.removeChild(h);
			return;
		}
		let e = p.isVideoDocked ? "sidebar-video-slot" : "inline-video-slot", t = () => {
			let t = document.getElementById(e);
			return t && t !== h.parentNode ? (t.appendChild(h), !0) : t === h.parentNode;
		};
		if (t()) return;
		let n = setInterval(() => {
			t() && clearInterval(n);
		}, 50), r = setTimeout(() => clearInterval(n), 2e3);
		return () => {
			clearInterval(n), clearTimeout(r);
		};
	}, [
		h,
		p.showVideoCall,
		p.isVideoDocked,
		p.mode
	]), j(() => () => {
		h?.parentNode?.removeChild(h);
	}, [h]);
	let g = p.showVideoCall && h ? B(/* @__PURE__ */ L(Et, {
		documentId: e,
		userId: r,
		idToken: p.idToken,
		meta: p.meta,
		updateMeta: p.updateMeta,
		sendMessage: n.sendMessage,
		isDocked: p.isVideoDocked,
		onClose: () => {
			p.setShowVideoCall(!1), p.isVideoDocked && d?.();
		},
		onDockToSidebar: p.isVideoDocked ? void 0 : (() => {
			u?.();
		}),
		onUndock: p.isVideoDocked ? (() => {
			d?.();
		}) : void 0,
		onCallEnd: () => {
			p.setShowVideoCall(!1), d?.();
		}
	}), h) : null;
	return /* @__PURE__ */ R("div", {
		"data-testid": "document-editor-page",
		className: "flex flex-col h-full",
		children: [
			g,
			/* @__PURE__ */ L(mt, {
				meta: p.headerMeta,
				mode: p.mode,
				onModeChange: p.handleModeChange,
				participants: p.participants,
				onUpdateMeta: p.updateMeta,
				onExport: p.handleExport,
				onToggleHistory: p.handleToggleHistory,
				onToggleVideoCall: p.handleToggleVideoCall,
				onToggleVideoHistory: p.handleToggleVideoHistory,
				isCallActive: !!p.meta?.activeCallSessionId,
				onClearDocument: p.handleClearDocument,
				onJumpToUser: p.handleJumpToUser,
				sections: p.isCanvas ? [] : p.sections.map((e) => ({
					id: e.id,
					title: e.title
				})),
				onToggleMyItems: p.handleToggleMyItems,
				myItemCount: p.myItems.length,
				commentCount: Object.values(p.comments).reduce((e, t) => e + t.length, 0),
				onBack: p.handleBack,
				onFollowUser: p.handleFollowUser,
				followingUserId: p.followingUserId,
				onFinalize: p.handleFinalize,
				onUnlock: p.handleUnlock,
				pastCallsCount: p.videoSessions.sessions.length
			}),
			/* @__PURE__ */ L(ht, {
				followingUserId: p.followingUserId,
				participants: p.participants,
				onStopFollow: p.handleStopFollow
			}),
			/* @__PURE__ */ L("div", {
				className: "flex-1 overflow-auto p-4",
				children: /* @__PURE__ */ L(On, {
					mode: p.mode,
					isEmpty: m,
					isCanvas: p.isCanvas,
					isFinalized: p.isFinalized,
					sections: p.sections,
					documentId: e,
					displayName: i,
					color: a,
					userId: r,
					ydoc: p.ydoc,
					provider: p.provider,
					getSectionFragment: p.getSectionFragment,
					updateSection: p.updateSection,
					participants: p.participants,
					focusedSectionId: p.focusedSectionId,
					onSectionFocus: p.handleSectionFocus,
					comments: p.comments,
					onAddComment: p.handleAddComment,
					onResolveThread: p.handleResolveThread,
					onUnresolveThread: p.handleUnresolveThread,
					onUpdateCursorInfo: p.awareness.updateCursorInfo,
					onOpenComments: p.handleOpenComments,
					onAddItem: p.handleAddItem,
					onUpdateItem: p.handleUpdateItem,
					onRemoveItem: p.handleRemoveItem,
					restItems: p.restItems,
					itemErrors: p.itemErrors,
					commentSidebarOpen: p.commentSidebarOpen,
					commentSectionId: p.commentSectionId,
					commentSidebarTop: p.commentSidebarTop,
					sectionListRef: p.sectionListRef,
					onCloseComments: p.handleCloseComments,
					showVideoCall: p.showVideoCall,
					isVideoDocked: p.isVideoDocked,
					showInlineVideo: p.showInlineVideo,
					sidebarFixed: p.sidebarFixed,
					videoSpacerRef: p.videoSpacerRef,
					videoLeft: p.videoLeft,
					FIXED_TOP: p.FIXED_TOP,
					showTOC: p.showTOC,
					sectionReviews: p.sectionReviews,
					reviewSection: p.restReviewSection,
					headerMeta: p.headerMeta,
					onLoadDemo: p.handleLoadDemo,
					activityPublish: s
				})
			}),
			/* @__PURE__ */ L(qn, {
				showHistory: p.showHistory,
				showMyItems: p.showMyItems,
				showVideoHistory: p.showVideoHistory,
				closePanel: p.closePanel,
				versionHistory: p.versionHistory,
				ydoc: p.ydoc,
				myItems: p.myItems,
				onNavigateToSection: p.handleNavigateToSection,
				videoSessions: p.videoSessions,
				showTOC: p.showTOC,
				isCanvas: p.isCanvas,
				commentSidebarOpen: p.commentSidebarOpen,
				sections: p.sections,
				focusedSectionId: p.focusedSectionId,
				mode: p.mode
			})
		]
	});
}
//#endregion
export { Xe as A, W as B, Nt as C, mt as D, ht as E, Q as F, ue as G, le as H, De as I, Ce as L, Ye as M, Ve as N, pt as O, Be as P, ye as R, Bt as S, Et as T, K as U, ce as V, G as W, Xt as _, Vn as a, Wt as b, Dn as c, vn as d, ln as f, Zt as g, tn as h, Wn as i, Je as j, ft as k, _n as l, sn as m, Jn as n, In as o, cn as p, Kn as r, Pn as s, Yn as t, gn as u, Gt as v, Mt as w, Ht as x, Ut as y, Se as z };
