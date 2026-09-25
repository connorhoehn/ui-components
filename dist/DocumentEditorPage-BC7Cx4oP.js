import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { r as t } from "./registry-DbX3MVAA.js";
import { r as n } from "./IdentityContext-CQM1qwH6.js";
import { a as r, c as i, i as a, l as o, n as s, o as c, r as l, s as u, t as d } from "./useVideoSessions-dVq49wgC.js";
import { t as f } from "./useDocumentTypes-DCKwxXn8.js";
import { t as p } from "./cn-DhjIN-s0.js";
import { t as m } from "./useEventCallback-Cwx9QVSi.js";
import { g as h } from "./tones-CEbHiujQ.js";
import { t as g } from "./IconButton-DDeXW3mZ.js";
import { $ as _, P as v, X as y, f as b, l as x, p as S, rt as C } from "./Icons-qlxbenIZ.js";
import { t as w } from "./Banner-yEoopy8T.js";
import { t as T } from "./Chip-S5_92B2V.js";
import { t as E } from "./ConfirmDialog-Cd8NZEXi.js";
import { t as D } from "./Input-DLknWXri.js";
import { t as O } from "./Textarea-Dz4doxTv.js";
import { t as k } from "./Avatar-B_FZn2OW.js";
import { t as ee } from "./DropdownMenu-CRTPdlu1.js";
import { t as A } from "./StatusPill-C-aN2Pzz.js";
import { t as j } from "./activationKey-CjbL3LUv.js";
import { O as te } from "./renderers-C1FLXY2c.js";
import { J as ne } from "./PresentationEditor-BtMX2gOw.js";
import { t as re } from "./TiptapEditor-CajZRkz8.js";
import { t as ie } from "./useHangoutEmbed-ChkoGDC_.js";
import { t as ae } from "./useActiveSpeaker-Dc9r75EE.js";
import { forwardRef as M, useCallback as N, useEffect as P, useImperativeHandle as F, useMemo as oe, useRef as I, useState as L } from "react";
import { Fragment as R, jsx as z, jsxs as B } from "react/jsx-runtime";
import se, { createPortal as V } from "react-dom";
//#region src/utils/markdownParser.ts
function H() {
	return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
var ce = /^- \[([ xX])\]\s+(.+)$/;
function le(e, t) {
	let n = e.toLowerCase();
	return ce.test(t) || /- \[[ xX]\]/.test(t) ? "tasks" : n.includes("decision") ? "decisions" : n.includes("summary") ? "summary" : "notes";
}
function U(e) {
	let t = e.split("\n"), n = [], r = [];
	for (let e of t) {
		let t = e.match(ce);
		if (t) {
			let e = t[1].toLowerCase() === "x";
			n.push({
				id: H(),
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
function ue(e) {
	let t = {}, n = [], r = e.replace(/\r\n/g, "\n"), i = r.match(/^# (.+)$/m);
	i && (t.title = i[1].trim());
	let a = r.split(/^## /m);
	if (a.length <= 1) {
		let e = r.replace(/^# .+\n*/m, "").trim();
		if (e.length > 0) {
			let { items: r, remaining: i } = U(e);
			n.push({
				id: H(),
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
		let t = a[e], r = t.indexOf("\n"), i = r === -1 ? t.trim() : t.slice(0, r).trim(), o = r === -1 ? "" : t.slice(r + 1).trim(), { items: s, remaining: c } = U(o), l = le(i, o);
		n.push({
			id: H(),
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
var W = 2, de = "body";
function fe(e) {
	if (!e) return 0;
	let t = e.getMap("meta").get("schemaVersion");
	return typeof t == "number" ? t : 0;
}
function G(e) {
	return fe(e) >= 2;
}
function K(e) {
	return !e || !G(e) ? null : e.getXmlFragment(de);
}
function pe(e) {
	let [t, n] = L(() => fe(e));
	return P(() => {
		if (!e) {
			n(0);
			return;
		}
		let t = e.getMap("meta"), r = () => n(fe(e));
		return r(), t.observe(r), () => t.unobserve(r);
	}, [e]), t >= 2;
}
//#endregion
//#region src/utils/documentExport.ts
function me(e) {
	let t = e.meta?.schemaVersion;
	return typeof t == "number" ? t : 0;
}
function q(e, t) {
	return t?.ydoc ? G(t.ydoc) : t?.bodyMarkdown != null || typeof e.body == "string" || me(e) >= 2;
}
var J = /<\/?(paragraph|heading|blockquote|codeblock|bulletlist|orderedlist|listitem|tasklist|taskitem|horizontalrule|hardbreak|macro|doc)[^>]*>/gi;
function he(e) {
	let t = e?.toString();
	return t ? t.replace(J, "\n").replace(/<[^>]+>/g, "").replace(/\n{3,}/g, "\n\n").trim() : "";
}
function Y(e) {
	let t = e?.toString()?.trim();
	if (!t) return "";
	if (typeof DOMParser > "u") return he(e);
	let n = new DOMParser().parseFromString(`<doc>${t}</doc>`, "text/xml");
	if (n.querySelector("parsererror")) return he(e);
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
function ge(e, t) {
	if (t?.bodyMarkdown != null) return t.bodyMarkdown;
	if (t?.ydoc) {
		let e = K(t.ydoc);
		if (e) return Y(e);
	}
	return typeof e.body == "string" ? e.body : "";
}
function _e(e) {
	return `- [${e.status === "done" || e.status === "acked" ? "x" : " "}] ${e.text}`;
}
function ve(e, t = 0) {
	let n = "  ".repeat(t), r = [];
	r.push(`${n}> **${e.displayName}**: ${e.text}`);
	for (let n of e.replies ?? []) r.push(ve(n, t + 1));
	return r.join("\n");
}
function ye(e) {
	let t = [`## ${e.title}`, ""], n = e.contentMarkdown ?? e.contentText;
	n && t.push(n, "");
	let r = Array.isArray(e.items) ? e.items : [];
	if (r.length > 0) {
		for (let e of r) t.push(_e(e));
		t.push("");
	}
	let i = e.comments;
	if (i && i.length > 0) {
		t.push(`### Comments (${i.length})`, "");
		for (let e of i) t.push(ve(e));
		t.push("");
	}
	return t.join("\n");
}
function be(e, t) {
	let n = e, r = [`# ${n.meta?.title ?? "Document"}`, ""];
	if (q(n, t)) {
		let e = ge(n, t);
		e && r.push(e, "");
		let i = n.comments ?? [];
		if (i.length > 0) {
			r.push(`## Comments (${i.length})`, "");
			for (let e of i) r.push(ve(e));
			r.push("");
		}
		return r.join("\n").trimEnd() + "\n";
	}
	for (let e of n.sections ?? []) r.push(ye(e));
	return r.join("\n").trimEnd() + "\n";
}
//#endregion
//#region src/utils/demoDocument.ts
var xe = "# Q2 Sprint Planning - Meeting Summary\n\n## Executive Summary\n\nThis document captures the key outcomes from our Q2 sprint planning session held on April 10, 2026. The team discussed priorities for the upcoming quarter, including the new collaborative editing feature, infrastructure improvements, and customer-facing bug fixes.\n\nKey themes:\n- **Real-time collaboration** is the top priority for Q2\n- Infrastructure debt needs to be addressed before scaling\n- Customer satisfaction scores are trending upward\n\n## Action Items\n\n- [ ] Set up Tiptap editor with Y.js CRDT integration\n- [ ] Deploy shared Redis ECS service for multi-instance sync\n- [ ] Fix the 48 audit issues identified in the post-fix review\n- [ ] Create Playwright tests for 3-browser collaborative editing\n- [ ] Design the document export pipeline (PDF, DOCX, Google Docs)\n- [x] Complete the WebSocket gateway infrastructure audit\n- [x] Remove ElastiCache dependency from CDK stack\n\n## Decisions\n\n- [ ] Adopt Tiptap v3 as the standard rich text editor\n- [ ] Use Y.js with custom GatewayProvider (not Hocuspocus)\n- [ ] Store CRDT snapshots in DynamoDB with 7-day TTL\n- [ ] Support 3 viewing modes: Editor, Review, Reader\n\n## Technical Notes\n\nThe collaborative document editor will be built on top of the existing WebSocket gateway infrastructure. The `crdt-service.js` backend has been upgraded to maintain a proper `Y.Doc` per channel with awareness protocol support.\n\n### Architecture Highlights\n\n1. **Frontend**: Tiptap v3 + Y.js with custom `GatewayProvider`\n2. **Backend**: Existing crdt-service.js (treats Y.js updates as opaque binary)\n3. **Persistence**: EventBridge -> Lambda -> DynamoDB (gzip compressed, 7-day TTL)\n4. **Sync**: Redis pub/sub for multi-instance, WebSocket for client delivery\n\n### Performance Targets\n\n- Edit latency: < 50ms (local) / < 200ms (remote)\n- Concurrent editors: 10+ per document\n- Document size: up to 100KB of rich text\n- Snapshot frequency: every 50 operations or 5 minutes\n";
//#endregion
//#region src/components/doc-editor/useDocumentActions.ts
function X(e) {
	return e.toString().replace(/<\/?(paragraph|heading|blockquote|codeBlock|bulletList|orderedList|listItem|taskList|taskItem|horizontalRule|hardBreak|doc)[^>]*>/g, "\n").replace(/<[^>]+>/g, "").replace(/\n{3,}/g, "\n\n").trim();
}
function Se(e) {
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
function Ce(e) {
	return e.split("\n").map((e) => e.startsWith("### ") ? `<h3>${e.slice(4)}</h3>` : e.startsWith("## ") ? `<h2>${e.slice(3)}</h2>` : e.startsWith("# ") ? `<h1>${e.slice(2)}</h1>` : e.startsWith("> ") ? `<blockquote>${e.slice(2)}</blockquote>` : e.startsWith("- [x] ") ? `<li>&#9745; ${e.slice(6)}</li>` : e.startsWith("- [ ] ") ? `<li>&#9744; ${e.slice(6)}</li>` : e.startsWith("- ") ? `<li>${e.slice(2)}</li>` : e.trim() === "" ? "<br/>" : `<p>${e}</p>`).join("\n").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/`([^`]+)`/g, "<code>$1</code>");
}
function Z(e, t) {
	let n = URL.createObjectURL(e), r = document.createElement("a");
	r.href = n, r.download = t, r.click(), URL.revokeObjectURL(n);
}
function we(e, t, n, r) {
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
    <body>${Ce(n)}</body>
    </html>
  `), a.document.close(), a.print());
}
function Te({ documentId: e, userId: t, ws: n, updateMeta: r, addSection: i, exportJSON: a, getSectionFragment: o, getCanvasFragment: s, isCanvas: c = !1, comments: l }) {
	let [u, d] = L(!1);
	return {
		demoLoaded: u,
		handleLoadDemo: N(() => {
			let n = ue(xe);
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
		handleClearDocument: N(() => {
			n.sendMessage({
				service: "crdt",
				action: "clearDocument",
				channel: `doc:${e}`
			}), d(!1);
		}, [n, e]),
		handleExport: N((e) => {
			let t = a();
			if (t) {
				if (c) {
					let n = Se(s?.() ?? null);
					t.sections = [], t.body = n;
					let r = Object.values(l).flat();
					r.length > 0 && (t.comments = r), we(e, t.meta.title, n ? `# ${t.meta.title || "Document"}\n\n${n}\n` : `# ${t.meta.title || "Document"}\n`, t);
					return;
				}
				for (let e of t.sections) {
					let t = o(e.id);
					t && (e.contentText = X(t));
					let n = l[e.id];
					n && n.length > 0 && (e.comments = n);
				}
				we(e, t.meta.title, be(t), t);
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
function Ee(e = {}) {
	let [t, n] = L(e.initialPanel ?? null), r = N((e) => {
		n((t) => t === e ? null : e);
	}, []), i = N((e) => {
		n(e);
	}, []), a = N(() => {
		n(null);
	}, []);
	return {
		activePanel: t,
		showHistory: t === "history",
		showMyItems: t === "myItems",
		showVideoHistory: t === "videoHistory",
		toggleHistory: N(() => r("history"), [r]),
		toggleMyItems: N(() => r("myItems"), [r]),
		toggleVideoHistory: N(() => r("videoHistory"), [r]),
		openPanel: i,
		closePanel: a
	};
}
//#endregion
//#region src/components/doc-editor/canvas/scrollToDocumentTarget.ts
var De = 2e3, Oe = "0 0 0 3px #3b82f640";
function ke(e) {
	return e.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
}
function Ae(e, t = document) {
	let { sectionId: n, commentId: r } = e;
	if (n) {
		let e = t.querySelector(`[id="section-${ke(n)}"]`);
		if (e) return e;
	}
	if (r) {
		let e = t.querySelector(`[data-comment-id="${ke(r)}"]`);
		if (e) return e;
	}
	return null;
}
function je(e, t = document) {
	let n = Ae(e, t);
	return n ? (n.scrollIntoView?.({
		behavior: "smooth",
		block: "center"
	}), n.style.transition = "box-shadow 0.3s ease", n.style.boxShadow = Oe, setTimeout(() => {
		n.style.boxShadow = "";
	}, De), !0) : !1;
}
//#endregion
//#region src/hooks/templateSections.ts
function Me(e, t) {
	let n = `${e}::${t}`, r = 5381;
	for (let e = 0; e < n.length; e++) r = r * 33 ^ n.charCodeAt(e);
	return `tpl-${(r >>> 0).toString(36)}`;
}
function Ne(e) {
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
function Pe() {
	if (typeof window < "u") {
		let e = new URLSearchParams(window.location.search).get("mode");
		if (e === "editor" || e === "ack" || e === "reader") return e;
	}
	return "editor";
}
function Fe(e) {
	return e.toString().replace(/<\/?(paragraph|heading|blockquote|codeBlock|bulletList|orderedList|listItem|taskList|taskItem|horizontalRule|hardBreak|doc)[^>]*>/g, "\n").replace(/<[^>]+>/g, "").replace(/\n{3,}/g, "\n\n").trim();
}
function Ie({ documentId: e, documentType: t, ws: r, userId: s, displayName: p, color: m = "var(--color-info)", onMessage: h, activityPublish: g, isVideoDocked: _, onDockVideo: v, onUndockVideo: y, onBack: b, idToken: x }) {
	let [S, C] = L(Pe), { showHistory: w, showMyItems: T, showVideoHistory: E, toggleHistory: D, toggleMyItems: O, toggleVideoHistory: k, closePanel: ee } = Ee(), [A, j] = L(_ ?? !1), [te, ne] = L(typeof window < "u" ? window.innerWidth : 1400);
	P(() => {
		let e = () => ne(window.innerWidth);
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, []);
	let re = te >= 1200, ie = te >= 900, [ae, M] = L(!1), F = I(null), R = I(null), [z, B] = L(0), [, se] = L(0), V = I(null), H = N(() => {
		if (V.current === null) {
			let e = F.current ?? R.current;
			e && (V.current = e.getBoundingClientRect().top + window.scrollY);
		}
		let e = V.current ?? 250, t = window.scrollY > e - 146;
		M(t), F.current && B(F.current.getBoundingClientRect().left), R.current && se(R.current.getBoundingClientRect().left);
	}, []);
	P(() => {
		let e = () => {
			V.current = null, H();
		};
		return window.addEventListener("scroll", H, { passive: !0 }), window.addEventListener("resize", e, { passive: !0 }), () => {
			window.removeEventListener("scroll", H), window.removeEventListener("resize", e);
		};
	}, [H]), P(() => {
		let e = setTimeout(() => {
			V.current = null, H();
		}, 50);
		return () => clearTimeout(e);
	}, [A, H]);
	let [ce, le] = L(null), [U, ue] = L(!1), [W, fe] = L(null), G = n(), K = x === void 0 ? G?.idToken ?? null : x, me = d(e, K), { meta: q, sections: J, synced: he, updateMeta: Y, addSection: ge, updateSection: _e, addItem: ve, updateItem: ye, removeItem: be, getSectionFragment: xe, ydoc: X, provider: Se, exportJSON: Ce, participants: Z, awareness: we } = o({
		documentId: e,
		mode: S,
		ws: r,
		userId: s,
		displayName: p,
		color: m,
		onMessage: h
	}), { comments: De, addComment: Oe, resolveThread: ke, unresolveThread: Ae } = i({
		documentId: e,
		idToken: K,
		sendMessage: r.sendMessage,
		onMessage: h,
		connectionState: r.connectionState
	}), { sectionReviews: Fe, reviewSection: Ie } = c({
		documentId: e,
		idToken: K,
		sendMessage: r.sendMessage,
		onMessage: h,
		connectionState: r.connectionState
	}), Le = oe(() => J.map((e) => e.id), [J]), { items: Re, addItem: ze, updateItem: Be, removeItem: Q, itemErrors: Ve } = u({
		documentId: e,
		sectionIds: Le,
		idToken: K,
		sendMessage: r.sendMessage,
		onMessage: h,
		connectionState: r.connectionState
	});
	P(() => {
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
	let He = pe(X), { demoLoaded: Ue, handleLoadDemo: We, handleClearDocument: Ge, handleExport: Ke } = Te({
		documentId: e,
		userId: s,
		ws: r,
		updateMeta: Y,
		addSection: ge,
		exportJSON: Ce,
		getSectionFragment: xe,
		getCanvasFragment: () => X ? X.getXmlFragment(de) : null,
		isCanvas: He,
		comments: De
	}), [qe, Je] = L(null), Ye = N((e) => {
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
	}, [S, J]), Xe = N((e) => {
		let t = e.userId || e.clientId;
		le((e) => e === t ? null : t);
	}, []), $ = I(null);
	P(() => {
		if (!ce) {
			$.current = null;
			return;
		}
		let e = Z.find((e) => (e.userId || e.clientId) === ce);
		if (!e || !e.currentSectionId) {
			if (e && J.length > 0) {
				let e = document.getElementById(`section-${J[0].id}`);
				e && !$.current && (e.scrollIntoView({
					behavior: "smooth",
					block: "start"
				}), $.current = "__initial__");
			}
			return;
		}
		if (e.currentSectionId === $.current) return;
		$.current = e.currentSectionId;
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
		ce,
		Z,
		S,
		J
	]);
	let Ze = N(() => {
		le(null);
	}, []), Qe = N((t, n) => {
		let r = {
			id: crypto.randomUUID(),
			...n
		};
		ve(t, r), ze(t, r).catch(() => {}), g("doc.add_item", {
			sectionTitle: J.find((e) => e.id === t)?.title,
			documentId: e,
			documentTitle: q?.title
		});
	}, [
		ve,
		ze,
		J,
		g,
		e,
		q?.title
	]), $e = N((e, t, n) => {
		ye(e, t, n), Be(e, t, n).catch(() => {});
	}, [ye, Be]), et = N((e, t) => {
		be(e, t), Q(e, t).catch(() => {});
	}, [be, Q]);
	P(() => {
		if (He || J.length === 0 || qe) return;
		let e = setTimeout(() => {
			let e = J[0].id;
			Je(e), we.updateSection(e);
		}, 500);
		return () => clearTimeout(e);
	}, [
		He,
		J,
		qe,
		we
	]);
	let tt = N((e) => {
		Je(e), we.updateSection(e);
	}, [we]), nt = I(null), [rt, it] = L(0), at = N((e) => {
		fe(e), ue(!0), requestAnimationFrame(() => {
			let t = document.getElementById(`section-${e}`), n = nt.current;
			if (t && n) {
				let e = t.getBoundingClientRect(), r = n.getBoundingClientRect();
				it(e.top - r.top);
			}
		});
	}, []), ot = N(() => {
		ue(!1);
	}, []), st = N((t, n, r) => {
		Oe(t, n, r), g("doc.comment", {
			sectionId: t,
			text: n.slice(0, 50),
			documentId: e,
			documentTitle: q?.title
		});
		let i = n.match(/@[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)*/g);
		if (i && i.length > 0) {
			let r = i.map((e) => e.slice(1).trim());
			g("doc.mention", {
				sectionId: t,
				sectionTitle: J.find((e) => e.id === t)?.title ?? "",
				mentionedNames: r,
				commentText: n.slice(0, 80),
				authorName: p,
				documentId: e,
				documentTitle: q?.title
			});
		}
	}, [
		Oe,
		g,
		J,
		p,
		e,
		q?.title
	]), ct = N((t, n) => {
		ke(t, n), g("doc.resolve_thread", {
			sectionId: t,
			commentId: n,
			documentId: e,
			documentTitle: q?.title
		});
	}, [
		ke,
		g,
		e,
		q?.title
	]), lt = N((t, n) => {
		Ae(t, n), g("doc.unresolve_thread", {
			sectionId: t,
			commentId: n,
			reopenedBy: p,
			documentId: e,
			documentTitle: q?.title
		});
	}, [
		Ae,
		g,
		p,
		e,
		q?.title
	]), ut = a({
		sections: J,
		comments: De,
		displayName: p,
		userId: s
	}), dt = N((e, t) => {
		setTimeout(() => {
			je({
				sectionId: e,
				commentId: t
			});
		}, 150);
	}, []), ft = O, pt = D, mt = k, ht = N(() => {
		j((e) => !e), ee();
	}, [ee]);
	P(() => {
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
	P(() => {
		w ? _t.fetchVersions() : _t.clearPreview();
	}, [w]), P(() => {
		if (!he || !t || !X) return;
		let n = X.getMap("meta");
		if (n.get("templateApplied") || X.getArray("sections").length > 0) return;
		let r = f().find((e) => e.name === t);
		if (!r) return;
		X.transact(() => {
			n.set("templateApplied", !0);
		});
		let i = (e) => e === "tasks" ? "tasks" : e === "decisions" ? "decisions" : "notes";
		Y({
			id: e,
			title: q?.title || r.name,
			sourceType: "notes",
			sourceId: "",
			createdBy: s,
			createdByName: p,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			aiModel: "",
			status: "draft",
			documentType: r.name
		});
		for (let t of r.fields) ge({
			id: Me(e, t.name),
			type: i(t.sectionType),
			sectionType: t.sectionType,
			title: t.name,
			collapsed: t.defaultCollapsed,
			placeholder: t.placeholder || void 0,
			items: []
		});
	}, [
		he,
		t,
		X
	]), P(() => {
		!he || !X || Ne(X);
	}, [
		he,
		X,
		J
	]);
	let vt = (e) => {
		if (C(e), typeof window < "u") {
			let t = new URL(window.location.href);
			t.searchParams.set("mode", e), window.history.replaceState({}, "", t.toString());
		}
	}, yt = q ?? {
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
		meta: q,
		headerMeta: yt,
		isFinalized: yt.status === "final",
		handleFinalize: N(() => {
			window.confirm("Finalize this document? It will become read-only.") && (Y({ status: "final" }), g("doc.finalize", {
				documentId: e,
				documentTitle: q?.title
			}));
		}, [
			Y,
			g,
			e,
			q?.title
		]),
		handleUnlock: N(() => {
			Y({ status: "draft" }), g("doc.unlock", {
				documentId: e,
				documentTitle: q?.title
			});
		}, [
			Y,
			g,
			e,
			q?.title
		]),
		updateMeta: Y,
		sections: J,
		updateSection: _e,
		getSectionFragment: xe,
		isCanvas: He,
		itemErrors: Ve,
		ydoc: X,
		provider: Se,
		synced: he,
		demoLoaded: Ue,
		handleLoadDemo: We,
		handleClearDocument: Ge,
		handleExport: Ke,
		participants: Z,
		awareness: we,
		focusedSectionId: qe,
		handleSectionFocus: tt,
		handleJumpToUser: Ye,
		followingUserId: ce,
		handleFollowUser: Xe,
		handleStopFollow: Ze,
		comments: De,
		commentSidebarOpen: U,
		commentSectionId: W,
		commentSidebarTop: rt,
		sectionListRef: nt,
		handleOpenComments: at,
		handleCloseComments: ot,
		handleAddComment: st,
		handleResolveThread: ct,
		handleUnresolveThread: lt,
		restItems: Re,
		handleAddItem: Qe,
		handleUpdateItem: $e,
		handleRemoveItem: et,
		sectionReviews: Fe,
		restReviewSection: Ie,
		showHistory: w,
		showMyItems: T,
		showVideoHistory: E,
		handleToggleHistory: pt,
		handleToggleMyItems: ft,
		handleToggleVideoHistory: mt,
		closePanel: ee,
		showVideoCall: A,
		setShowVideoCall: j,
		handleToggleVideoCall: ht,
		videoSessions: me,
		isVideoDocked: _,
		onDockVideo: v,
		onUndockVideo: y,
		showTOC: re,
		showInlineVideo: ie,
		sidebarFixed: ae,
		videoSpacerRef: F,
		tocSpacerRef: R,
		videoLeft: z,
		FIXED_TOP: 146,
		myItems: ut,
		handleNavigateToSection: dt,
		versionHistory: _t,
		handleBack: N(() => {
			A && !_ && v?.(), b?.();
		}, [
			A,
			_,
			v,
			b
		]),
		idToken: K,
		activityPublish: g,
		displayName: p,
		color: m,
		userId: s,
		documentId: e
	};
}
//#endregion
//#region src/components/doc-editor/ParticipantAvatars.tsx
function Le(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function Re(e, t = .2) {
	let n = e.replace("#", ""), r = parseInt(n, 16), i = Math.max(0, (r >> 16 & 255) * (1 - t)), a = Math.max(0, (r >> 8 & 255) * (1 - t)), o = Math.max(0, (r & 255) * (1 - t));
	return `rgb(${Math.round(i)}, ${Math.round(a)}, ${Math.round(o)})`;
}
function ze(e) {
	switch (e) {
		case "editor": return "editing";
		case "reviewer": return "reviewing";
		case "reader": return "reading";
		default: return "";
	}
}
function Be(e) {
	if (!e) return "";
	let t = Math.floor((Date.now() - e) / 1e3);
	return t < 5 ? "" : t < 60 ? `, ${t}s` : t < 3600 ? `, ${Math.floor(t / 60)}m` : `, ${Math.floor(t / 3600)}h`;
}
function Q(e) {
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
function Ve({ onJump: e, label: t, children: n }) {
	return e ? /* @__PURE__ */ z("button", {
		type: "button",
		onClick: e,
		"aria-label": `Jump to ${t}`,
		className: p("relative inline-block bg-transparent border-none p-0 m-0 cursor-pointer font-[inherit]"),
		children: n
	}) : /* @__PURE__ */ z("span", {
		tabIndex: 0,
		role: "img",
		"aria-label": t,
		className: p("relative inline-block"),
		"data-testid": "participant-avatar-static",
		children: n
	});
}
function He({ participant: e, sectionTitle: t, onJumpToUser: n, onFollowUser: r, isFollowing: i }) {
	let [a, o] = L(!1), s = I(null), c = I(null), l = () => {
		c.current &&= (clearTimeout(c.current), null), o(!0);
	}, u = () => {
		c.current = setTimeout(() => o(!1), 150);
	};
	P(() => () => {
		c.current && clearTimeout(c.current);
	}, []);
	let d = Q(e.mode), f = e.color || "#3b82f6";
	return /* @__PURE__ */ B("div", {
		ref: s,
		className: p("flex flex-col items-center gap-[3px] relative animate-[presenceFadeIn_0.3s_ease]"),
		onMouseEnter: l,
		onMouseLeave: u,
		onFocus: l,
		onBlur: (e) => {
			e.currentTarget.contains(e.relatedTarget) || u();
		},
		children: [
			/* @__PURE__ */ B(Ve, {
				onJump: n ? () => n(e) : void 0,
				label: e.displayName,
				children: [/* @__PURE__ */ z("div", {
					className: p("w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-semibold transition-[transform,box-shadow] duration-200 ease-in-out", a ? "scale-110" : "scale-100"),
					style: {
						background: `linear-gradient(135deg, ${f}, ${Re(f, .2)})`,
						boxShadow: a ? `0 0 0 2px ${f}40` : "none"
					},
					children: Le(e.displayName)
				}), /* @__PURE__ */ z("div", { className: p("absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white", e.idle ? "bg-warning" : "bg-success [animation:presencePulse_2s_infinite]") })]
			}),
			a && /* @__PURE__ */ B("div", {
				className: p("absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-surface-inverse text-text-inverse py-2 px-3 rounded-md text-xs whitespace-nowrap z-[100] pointer-events-auto shadow-[0_4px_12px_rgba(0,0,0,0.15)] leading-snug"),
				onMouseEnter: l,
				onMouseLeave: u,
				children: [
					/* @__PURE__ */ z("div", {
						className: p("font-semibold mb-0.5"),
						children: e.displayName
					}),
					/* @__PURE__ */ B("div", {
						className: p("text-text-tertiary text-[11px]"),
						children: [e.idle ? "away" : ze(e.mode), Be(e.lastSeen)]
					}),
					t && /* @__PURE__ */ B("div", {
						className: p("text-text-tertiary text-[11px] mt-0.5"),
						children: ["§ ", t]
					}),
					r && /* @__PURE__ */ z("button", {
						type: "button",
						onClick: (t) => {
							t.stopPropagation(), r(e);
						},
						className: p("mt-1 text-[11px] font-semibold cursor-pointer bg-transparent border-none p-0 font-[inherit]", i ? "text-warning-fg" : "text-info-fg"),
						children: i ? "Stop following" : "Follow"
					})
				]
			}),
			/* @__PURE__ */ B("span", {
				className: p("text-[11px] font-semibold px-2 py-px rounded-full leading-4"),
				style: {
					background: e.idle ? "#fef3c7" : d.bg,
					color: e.idle ? "#92400e" : d.text
				},
				children: [e.idle ? "away" : ze(e.mode), Be(e.lastSeen)]
			}),
			i && /* @__PURE__ */ z("span", {
				className: p("text-[10px] font-semibold text-info-fg"),
				children: "following"
			}),
			t && /* @__PURE__ */ B("span", {
				className: p("text-[10px] text-neutral max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap text-center"),
				children: ["§ ", t]
			})
		]
	});
}
function Ue({ participants: e, sections: t, onJumpToUser: n, onFollowUser: r, followingUserId: i }) {
	let a = /* @__PURE__ */ new Map();
	if (t) for (let e of t) a.set(e.id, e.title);
	return e.length === 0 ? null : /* @__PURE__ */ B("div", {
		"data-testid": "participant-avatars",
		className: p("flex items-center gap-0"),
		children: [/* @__PURE__ */ z("div", {
			className: p("flex gap-2.5 items-start py-1"),
			children: e.filter((e, t, n) => n.findIndex((t) => (t.userId || t.clientId) === (e.userId || e.clientId)) === t).map((e) => /* @__PURE__ */ z(He, {
				participant: e,
				sectionTitle: e.currentSectionId ? a.get(e.currentSectionId) : void 0,
				onJumpToUser: n,
				onFollowUser: r,
				isFollowing: i === (e.userId || e.clientId)
			}, e.clientId))
		}), /* @__PURE__ */ z("div", { className: p("w-px h-9 bg-border mx-1 self-center") })]
	});
}
//#endregion
//#region src/components/doc-editor/DocumentSaveStatus.tsx
var We = {
	pending: "Saving…",
	saved: "Saved",
	error: "Changes not saved",
	offline: "Offline — changes not saved"
};
function Ge({ state: e, className: t }) {
	return e ? /* @__PURE__ */ B("span", {
		role: "status",
		"aria-live": "polite",
		"data-testid": "document-save-status",
		"data-save-state": e.status,
		className: p(e.status === "error" ? "text-xs text-danger-fg" : "text-xs text-text-tertiary", t),
		children: [e.detail ?? We[e.status], (e.status === "error" || e.status === "offline") && e.onRetry && /* @__PURE__ */ z(h, {
			variant: "ghost",
			size: "sm",
			onClick: e.onRetry,
			children: "Retry save"
		})]
	}) : null;
}
//#endregion
//#region src/components/doc-editor/LegacyDocumentHeader.tsx
var Ke = {
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
}, qe = {
	idle: "Call",
	available: "Join Call",
	active: "In Call"
}, Je = {
	idle: "bg-surface text-text-primary border-border-field",
	available: "bg-info-bg text-info-fg border-info-border",
	active: "bg-success-bg text-success-fg border-success-border"
}, Ye = [
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
function Xe({ meta: e, saveState: t, mode: n, onModeChange: r, participants: i, onUpdateMeta: a, onExport: o, onToggleHistory: s, onToggleVideoCall: c, onToggleVideoHistory: l, isCallActive: u, callVariant: d, callLabel: f, onClearDocument: m, onJumpToUser: h, sections: g, onToggleMyItems: _, myItemCount: v, commentCount: y, onBack: b, onFollowUser: x, followingUserId: S, onFinalize: C, onUnlock: w, pastCallsCount: T, extraMenuItems: E }) {
	let [O, k] = L(!1), ee = Ke[e.status] ?? Ke.draft, A = d ?? (u ? "active" : "idle");
	return /* @__PURE__ */ B("header", {
		className: p("flex flex-col py-2 px-4 bg-surface border-b border-border shrink-0 gap-1.5 sticky top-[53px] z-[34]"),
		children: [/* @__PURE__ */ B("div", {
			className: p("flex items-center justify-between"),
			children: [/* @__PURE__ */ B("div", {
				className: p("flex items-center gap-2.5"),
				children: [
					b && /* @__PURE__ */ z("button", {
						onClick: b,
						className: p("bg-transparent border-none text-info-fg cursor-pointer text-[13px] p-0 flex items-center gap-1 font-[inherit]"),
						children: "← Documents"
					}),
					/* @__PURE__ */ z(D, {
						"aria-label": "Document title",
						className: p("w-auto h-auto min-w-[180px] text-base font-semibold border-transparent bg-transparent py-1 px-2"),
						value: e.title,
						placeholder: "Untitled document",
						onChange: (e) => a({ title: e.target.value })
					}),
					/* @__PURE__ */ z("span", {
						className: p("inline-block text-[11px] font-semibold py-0.5 px-2.5 rounded-full"),
						style: {
							background: ee.bg,
							color: ee.text
						},
						children: e.status
					}),
					/* @__PURE__ */ z(Ge, { state: t }),
					e.updatedAt && /* @__PURE__ */ B("span", {
						className: p("text-[11px] text-text-tertiary"),
						children: ["Last edited ", (() => {
							let t = Date.now() - new Date(e.updatedAt).getTime(), n = Math.floor(t / 6e4);
							if (n < 1) return "just now";
							if (n < 60) return `${n}m ago`;
							let r = Math.floor(n / 60);
							return r < 24 ? `${r}h ago` : `${Math.floor(r / 24)}d ago`;
						})()]
					}),
					y != null && y > 0 && /* @__PURE__ */ B("span", {
						className: p("inline-flex items-center gap-1 text-[11px] font-semibold py-0.5 px-2.5 rounded-full bg-surface-hover text-text-secondary"),
						children: [/* @__PURE__ */ z("svg", {
							width: "12",
							height: "12",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: /* @__PURE__ */ z("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
						}), y]
					})
				]
			}), i.length > 0 && /* @__PURE__ */ z(Ue, {
				participants: i,
				sections: g,
				onJumpToUser: h,
				onFollowUser: x,
				followingUserId: S
			})]
		}), /* @__PURE__ */ B("div", {
			className: p("flex items-center justify-between flex-wrap gap-1"),
			children: [/* @__PURE__ */ z("div", {
				className: p("flex gap-1"),
				children: Ye.map(({ mode: e, label: t }) => /* @__PURE__ */ z("button", {
					type: "button",
					"data-testid": `mode-btn-${e}`,
					className: p("py-1.5 px-3.5 text-[13px] font-semibold border border-border-field rounded-md cursor-pointer font-[inherit]", n === e ? "bg-info text-white" : "bg-surface text-text-primary"),
					onClick: () => r(e),
					children: t
				}, e))
			}), /* @__PURE__ */ B("div", {
				className: p("flex items-center gap-2"),
				children: [
					_ && /* @__PURE__ */ B("button", {
						type: "button",
						className: p("py-1.5 px-3 text-[13px] font-medium border border-border-field rounded-md bg-surface text-text-primary cursor-pointer font-[inherit] relative"),
						onClick: _,
						children: ["My Items", v ? ` (${v})` : ""]
					}),
					c && /* @__PURE__ */ z("button", {
						type: "button",
						"aria-pressed": A === "active",
						"data-call-variant": A,
						className: p("py-1.5 px-3 text-[13px] font-medium border rounded-md cursor-pointer font-[inherit] relative", Je[A]),
						onClick: c,
						children: f ?? qe[A]
					}),
					e.status === "final" ? w && /* @__PURE__ */ z("button", {
						type: "button",
						className: p("py-1.5 px-3 text-[13px] font-medium border border-success-border rounded-md bg-success-bg text-success-fg cursor-pointer font-[inherit] relative"),
						onClick: w,
						children: "Unlock"
					}) : C && /* @__PURE__ */ z("button", {
						type: "button",
						className: p("py-1.5 px-3 text-[13px] font-medium border border-success-border rounded-md bg-success-bg text-success-fg cursor-pointer font-[inherit] relative"),
						onClick: C,
						children: "Finalize"
					}),
					/* @__PURE__ */ B("div", {
						className: p("relative"),
						children: [/* @__PURE__ */ z("button", {
							type: "button",
							className: p("py-1.5 px-3 text-[13px] font-medium border border-border-field rounded-md bg-surface text-text-primary cursor-pointer font-[inherit] relative tracking-wider"),
							onClick: () => k((e) => !e),
							title: "More actions",
							children: "⋯"
						}), O && /* @__PURE__ */ B("div", {
							className: p("absolute top-full right-0 mt-1 bg-surface border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50 min-w-[160px] overflow-hidden"),
							children: [
								/* @__PURE__ */ z("button", {
									type: "button",
									className: p("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover"),
									onClick: () => {
										s(), k(!1);
									},
									children: "History"
								}),
								l && (T ?? 0) > 0 && /* @__PURE__ */ B("button", {
									type: "button",
									className: p("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover"),
									onClick: () => {
										l(), k(!1);
									},
									children: [
										"Past Calls (",
										T,
										")"
									]
								}),
								E?.map((e) => /* @__PURE__ */ z("button", {
									type: "button",
									"data-testid": `document-header-menu-${e.id}`,
									className: p("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover"),
									onClick: () => {
										e.onSelect(), k(!1);
									},
									children: e.label
								}, e.id)),
								/* @__PURE__ */ z("div", { className: p("border-t border-border-subtle my-1") }),
								[
									"markdown",
									"pdf",
									"json"
								].map((e) => /* @__PURE__ */ B("button", {
									type: "button",
									className: p("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover"),
									onClick: () => {
										o(e), k(!1);
									},
									children: ["Export ", e.charAt(0).toUpperCase() + e.slice(1)]
								}, e)),
								/* @__PURE__ */ z("div", { className: p("border-t border-border-subtle my-1") }),
								/* @__PURE__ */ z("button", {
									type: "button",
									className: p("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-danger-fg text-left cursor-pointer font-[inherit] hover:bg-danger-bg"),
									onClick: () => {
										k(!1), window.confirm("Clear all document content? This cannot be undone.") && m();
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
var $ = {
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
}, Ze = {
	editing: $.editing.label,
	suggesting: $.suggesting.label,
	review: $.review.label,
	read: $.read.label
};
function Qe({ mode: e, reason: t, className: n, "data-testid": r = "document-mode-pill" }) {
	let { label: i, tone: a } = $[e];
	return /* @__PURE__ */ z("span", {
		className: p("inline-flex items-center", n),
		title: t,
		"aria-label": t ? `${i}. ${t}` : i,
		"data-testid": r,
		"data-mode": e,
		children: /* @__PURE__ */ z(T, {
			tone: a,
			size: "sm",
			className: "rounded-full px-2.5",
			children: i
		})
	});
}
//#endregion
//#region src/components/doc-editor/DocumentOwnership.tsx
function $e({ owner: e, collaborators: t = [], maxAvatars: n = 3, onShare: r, className: i, "data-testid": a = "document-ownership" }) {
	if (!e) return null;
	let o = t.slice(0, n), s = t.length - o.length;
	return /* @__PURE__ */ B("span", {
		"data-testid": a,
		className: p("inline-flex items-center gap-2", i),
		children: [
			/* @__PURE__ */ B("span", {
				className: "inline-flex items-center gap-1.5",
				children: [/* @__PURE__ */ z(k, {
					name: e.displayName,
					size: 20,
					...e.avatarUrl ? { src: e.avatarUrl } : {}
				}), /* @__PURE__ */ B("span", {
					className: "text-xs text-text-secondary",
					"data-testid": `${a}-owner`,
					children: ["Owned by ", /* @__PURE__ */ z("span", {
						className: "font-medium text-text-primary",
						children: e.displayName
					})]
				})]
			}),
			o.length > 0 && /* @__PURE__ */ B("span", {
				className: "inline-flex items-center",
				"data-testid": `${a}-collaborators`,
				children: [o.map((e, t) => /* @__PURE__ */ z("span", {
					className: p("inline-flex rounded-full ring-2 ring-surface", t > 0 && "-ml-1.5"),
					title: e.displayName,
					children: /* @__PURE__ */ z(k, {
						name: e.displayName,
						size: 20,
						...e.avatarUrl ? { src: e.avatarUrl } : {}
					})
				}, e.userId)), s > 0 && /* @__PURE__ */ B("span", {
					"data-testid": `${a}-overflow`,
					title: t.slice(n).map((e) => e.displayName).join(", "),
					className: "-ml-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-surface-inset px-1 text-[10px] font-semibold text-text-secondary ring-2 ring-surface",
					children: ["+", s]
				})]
			}),
			r && /* @__PURE__ */ z("button", {
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
var et = "flex shrink-0 flex-col gap-1.5 border-b border-border bg-surface px-4 py-2 text-text-primary", tt = "flex-1 min-w-[180px] rounded-[4px] border border-transparent bg-transparent px-2 py-1 font-[inherit] text-[16px] font-semibold text-text-primary outline-none focus:border-primary", nt = "text-[11px] text-text-tertiary", rt = 6, it = {
	active: "bg-success-bg text-success-fg border-success-border",
	available: "bg-info-bg text-info-fg border-info-border",
	idle: ""
}, at = {
	submit_for_review: "Submit for review",
	withdraw: "Withdraw from review",
	approve: "Approve",
	request_changes: "Request changes",
	revise: "Back to draft",
	reopen: "Reopen",
	finalize: "Finalize"
}, ot = {
	submit_for_review: "The document goes to its designated reviewers, who are then expected to respond.",
	withdraw: "The document goes back to draft and the reviewers stop being asked for a verdict.",
	approve: "The document is signed off and becomes read-only until its owner reopens it.",
	request_changes: "The document goes back to its owner with your objection attached.",
	revise: "The document returns to draft so the requested changes can be made.",
	reopen: "An approved document becomes editable again, and its sign-off no longer stands.",
	finalize: "The document is closed permanently. It becomes read-only for everyone, and there is no unlock: no owner, reviewer or administrator can reopen it afterwards, and no further reviews can be requested on it. This is the only action in the document that cannot be undone."
}, st = "FINALIZE", ct = ["finalize"], lt = ["request_changes"], ut = {
	draft: "neutral",
	in_review: "pending",
	changes_requested: "warning",
	approved: "success",
	finalized: "neutral"
};
function dt(e) {
	let t = e.replace(/_/g, " ");
	return t.charAt(0).toUpperCase() + t.slice(1);
}
var ft = {
	forbidden: "You are not allowed to make this change.",
	conflict: "Someone else changed this document — the latest status has been reloaded.",
	network: "The server could not be reached, so nothing was changed.",
	invalid: "That change is not possible from the document’s current status.",
	busy: "A status change is already in progress.",
	unknown: "The server refused the change."
};
function pt(e) {
	return !!e && e.kind === "forbidden" && /no established owner/i.test(e.message);
}
function mt({ variant: e = "bar", actionsLayout: t = "cluster", menuTrigger: n = "boxed", saveState: r, workflowActions: i, formatActions: a, className: o, titleEditable: s, onPrint: c, exportFormats: l = [
	"markdown",
	"pdf",
	"json"
], meta: u, mode: d, suggesting: f = !1, modeReason: m, participants: _, onUpdateMeta: b, onExport: C, extraMenuItems: w, onToggleHistory: D, onToggleVideoCall: O, onToggleVideoHistory: k, callVariant: j, callLabel: te, onClearDocument: ne, onJumpToUser: re, sections: ie, onToggleMyItems: ae, onToggleChat: M, chatRoomName: N, chatUnreadCount: P, formatActionsRef: F, myItemCount: oe, commentCount: I, onBack: se, onFollowUser: V, followingUserId: H, pastCallsCount: ce, onShareToRoom: le, shareRoomName: U, sharingToRoom: ue, shareStatus: W, onDismissShareStatus: de, lifecycleStatus: fe, owner: G, collaborators: K, onShare: pe, lifecycleTerminal: me, lifecycleLegacyClaim: q, lifecycleActions: J, lifecycleLoading: he, lifecycleBusy: Y, lifecycleError: ge, onDismissLifecycleError: _e, onLifecycleAction: ve, onClaimOwnership: ye }) {
	let [be, xe] = L(!1), [X, Se] = L(null), [Ce, Z] = L(""), [we, Te] = L(""), [Ee, De] = L(!1), Oe = J ?? [], ke = X != null && lt.includes(X), Ae = X != null && ct.includes(X), je = !Ae || we.trim().toUpperCase() === st, Me = () => {
		Se(null), Z(""), Te("");
	}, Ne = u.title.trim() || "Untitled document", Pe = w ?? [], Fe = Pe.filter((e) => e.id.startsWith("share-")), Ie = Pe.filter((e) => e.id.startsWith("insert-")), Le = Pe.filter((e) => e.id.startsWith("toggle-")), Re = Pe.filter((e) => !e.id.startsWith("share-") && !e.id.startsWith("insert-") && !e.id.startsWith("toggle-")), ze = (e) => ({
		label: e.label,
		onSelect: e.onSelect,
		"data-testid": `document-header-menu-${e.id}`
	}), Be = (e) => ({
		...ze(e),
		label: e.label.replace(/^(Hide|Show) /, "").replace(/^From what you said$/, "Spoken items").replace(/^./, (e) => e.toUpperCase()),
		checked: /^Hide /.test(e.label)
	}), Q = e === "actions" && t === "menu", Ve = d === "editor" ? f ? "suggesting" : "editing" : d === "ack" ? "review" : "read", He = G?.displayName ? `Owned by ${G.displayName}` : void 0, We = [
		...Q ? [{
			...He ? { label: He } : {},
			"data-testid": "document-header-menu-about",
			items: [{
				label: Ze[Ve],
				...m ? { description: m } : {},
				"data-testid": "document-header-menu-mode"
			}, ...ae ? [{
				label: "My items",
				...oe ? { trailing: String(oe) } : {},
				onSelect: ae,
				"data-testid": "document-header-menu-my-items"
			}] : []]
		}, ...ve && (Oe.length > 0 || ye) ? [{
			label: "Review",
			"data-testid": "document-header-menu-lifecycle",
			items: [...Oe.map((e) => ({
				label: at[e],
				...e === "finalize" ? { danger: !0 } : {},
				onSelect: () => {
					Y || (Z(""), Te(""), Se(e));
				},
				"data-testid": `lifecycle-action-${e}`
			})), ...ye ? [{
				label: "Take ownership",
				onSelect: () => De(!0),
				"data-testid": "claim-ownership-btn"
			}] : []]
		}] : []] : [],
		{ items: [
			...D ? [{
				label: "Version history",
				onSelect: D,
				"data-testid": "document-header-history"
			}] : [],
			...k && (ce ?? 0) > 0 ? [{
				label: "Past calls",
				trailing: String(ce),
				onSelect: k
			}] : [],
			...Re.map(ze),
			...Le.map(Be)
		] },
		...Fe.length > 0 || Ie.length > 0 ? [{ items: [...Fe.length > 0 ? [{
			label: "Share to…",
			description: `${Fe.length} conversation${Fe.length === 1 ? "" : "s"}`,
			"data-testid": "document-header-menu-share",
			submenu: [{
				"data-testid": "document-header-menu-extras",
				scroll: Fe.length > rt,
				items: Fe.map((e) => ({
					...ze(e),
					label: e.label.replace(/^Share to /, "")
				}))
			}]
		}] : [], ...Ie.length > 0 ? [{
			label: "Insert…",
			"data-testid": "document-header-menu-insert",
			submenu: [{ items: Ie.map((e) => ({
				...ze(e),
				label: e.label.replace(/^Insert (a |an )?/, "").replace(/^./, (e) => e.toUpperCase())
			})) }]
		}] : []] }] : [],
		{ items: [...c ? [{
			label: "Print",
			trailing: "⌘P",
			onSelect: c,
			"data-testid": "document-header-print"
		}] : [], ...C && l.length > 0 ? [{
			label: "Download as…",
			"data-testid": "document-header-menu-download",
			submenu: [{ items: l.map((e) => ({
				label: {
					markdown: "Markdown (.md)",
					pdf: "PDF (.pdf)",
					json: "JSON (.json)"
				}[e],
				onSelect: () => C(e),
				"data-testid": `document-header-export-${e}`
			})) }]
		}] : []] },
		...ne ? [{ items: [{
			label: "Clear document",
			danger: !0,
			onSelect: () => xe(!0),
			"data-testid": "clear-document-btn"
		}] }] : []
	], Ke = /* @__PURE__ */ B(R, { children: [
		/* @__PURE__ */ B(E, {
			open: X != null,
			tone: Ae ? "destructive" : ke ? "caution" : "info",
			title: X ? `${at[X]} — “${Ne}”?` : "",
			body: X ? ot[X] : "",
			confirmLabel: X ? at[X] : "Confirm",
			cancelLabel: Ae ? "Keep it open" : "Cancel",
			confirmDisabled: ke && Ce.trim().length === 0 || !je,
			onConfirm: () => {
				let e = X, t = Ce.trim();
				Me(), e && ve?.(e, t || void 0);
			},
			onCancel: Me,
			children: [
				Ae && /* @__PURE__ */ B("div", {
					className: "mb-3",
					children: [/* @__PURE__ */ B("label", {
						className: "mb-1 block text-xs font-semibold text-[var(--color-text-primary)]",
						htmlFor: "lifecycle-finalize-confirm",
						children: [
							"Type ",
							st,
							" to confirm"
						]
					}), /* @__PURE__ */ z("input", {
						id: "lifecycle-finalize-confirm",
						"data-testid": "lifecycle-finalize-confirm-input",
						value: we,
						autoComplete: "off",
						onChange: (e) => Te(e.target.value),
						placeholder: st,
						className: "w-full rounded-md border border-[var(--color-border-field)] bg-[var(--color-surface)] p-2 font-mono text-sm text-[var(--color-text-primary)]"
					})]
				}),
				/* @__PURE__ */ z("label", {
					className: "mb-1 block text-xs font-semibold text-[var(--color-text-primary)]",
					htmlFor: "lifecycle-reason",
					children: ke ? "Reason (required)" : "Reason (optional)"
				}),
				/* @__PURE__ */ z("textarea", {
					id: "lifecycle-reason",
					"data-testid": "lifecycle-reason-input",
					value: Ce,
					rows: 3,
					onChange: (e) => Z(e.target.value),
					placeholder: ke ? "What needs to change, and why?" : Ae ? "Recorded against this document permanently" : "Anything the others should know",
					className: "w-full rounded-md border border-[var(--color-border-field)] bg-[var(--color-surface)] p-2 text-[13px] text-[var(--color-text-primary)]"
				})
			]
		}),
		/* @__PURE__ */ z(E, {
			open: Ee,
			tone: "caution",
			title: `Take ownership of “${Ne}”?`,
			body: "You become the owner of this document. Owner-only actions — submitting it for review, reopening it after approval — become yours, and nobody else can claim it afterwards. The claim is recorded against your name.",
			confirmLabel: "Take ownership",
			cancelLabel: "Leave it unowned",
			onConfirm: () => {
				De(!1), ye?.();
			},
			onCancel: () => De(!1)
		}),
		/* @__PURE__ */ z(E, {
			open: be,
			tone: "destructive",
			title: `Clear “${Ne}”?`,
			body: "Every section and everything written in it is removed — for everyone in the document, not just on your screen. There is no undo; the only way back is restoring an earlier version from History.",
			confirmLabel: "Clear document",
			cancelLabel: "Keep content",
			onConfirm: () => {
				xe(!1), ne?.();
			},
			onCancel: () => xe(!1)
		})
	] });
	return e === "actions" ? /* @__PURE__ */ B("div", {
		"data-testid": "document-header",
		"data-variant": "actions",
		className: p("flex min-w-0 flex-wrap items-center justify-end gap-2", o),
		children: [
			!Q && (G !== void 0 || K !== void 0 || pe) && /* @__PURE__ */ z($e, {
				owner: G ?? null,
				collaborators: K ?? [],
				...pe ? { onShare: pe } : {}
			}),
			me && /* @__PURE__ */ z("span", {
				"data-testid": "lifecycle-terminal-note",
				className: "text-[11px] italic text-[var(--color-text-tertiary)]",
				children: "Closed permanently — no further changes, for anyone"
			}),
			!Q && I != null && I > 0 && /* @__PURE__ */ z(T, {
				tone: "neutral",
				size: "sm",
				className: "rounded-full px-2.5",
				icon: /* @__PURE__ */ z(x, { size: 12 }),
				children: I
			}),
			_.length > 0 && /* @__PURE__ */ z(Ue, {
				participants: _,
				sections: ie,
				onJumpToUser: re,
				onFollowUser: V,
				followingUserId: H
			}),
			!Q && /* @__PURE__ */ z(Qe, {
				mode: Ve,
				...m ? { reason: m } : {}
			}),
			/* @__PURE__ */ B("div", {
				className: "flex items-center gap-2",
				children: [
					i,
					a,
					F && /* @__PURE__ */ z("div", {
						ref: F,
						className: "flex items-center gap-2"
					}),
					!Q && ae && /* @__PURE__ */ B(h, {
						variant: "secondary",
						size: "sm",
						onClick: ae,
						children: ["My Items", oe ? ` (${oe})` : ""]
					}),
					(M || le || O && (j === "available" || j === "active")) && /* @__PURE__ */ B("div", {
						className: "flex h-8 items-center gap-0.5 rounded-md border border-border bg-surface pl-0.5 pr-0.5",
						"data-testid": "document-room-pill",
						"data-room": N ?? U ?? "",
						children: [
							M ? /* @__PURE__ */ B(h, {
								variant: "ghost",
								size: "sm",
								className: "inline-flex items-center gap-1.5 whitespace-nowrap border-0",
								"data-testid": "document-chat-toggle",
								onClick: M,
								title: N ? `Open the conversation in ${N}` : "Open this page’s conversation",
								children: [
									/* @__PURE__ */ z(x, { size: 13 }),
									/* @__PURE__ */ z("span", { children: N ? `#${N}` : "Conversation" }),
									P ? /* @__PURE__ */ z(T, {
										tone: "accent",
										size: "xs",
										mono: !0,
										"data-testid": "document-chat-unread",
										children: P
									}) : null
								]
							}) : N ?? U ? /* @__PURE__ */ B("span", {
								className: "px-1.5 text-xs font-medium text-text-primary",
								children: ["#", N ?? U]
							}) : null,
							le && /* @__PURE__ */ z(g, {
								"aria-label": ue ? "Sharing…" : `Share to #${U ?? "room"}`,
								title: U ? `Post a link to this page in #${U}` : "Post a link to this page in the room",
								variant: "ghost",
								size: "sm",
								className: "border-0",
								"data-testid": "share-to-room-btn",
								"data-sharing": ue ? "true" : "false",
								disabled: ue,
								onClick: le,
								icon: /* @__PURE__ */ z(y, { size: 13 })
							}),
							O && j === "available" && /* @__PURE__ */ z(h, {
								variant: "primary",
								size: "sm",
								onClick: O,
								"data-call-variant": "available",
								"data-testid": "doc-call-button",
								title: "This room has a call going — join it",
								children: te ?? "Join call"
							}),
							O && j === "active" && /* @__PURE__ */ z(h, {
								variant: "secondary",
								size: "sm",
								className: it.active,
								onClick: O,
								"aria-pressed": !0,
								"data-call-variant": "active",
								"data-testid": "doc-call-button",
								children: te ?? "In call"
							})
						]
					}),
					W && /* @__PURE__ */ B("span", {
						role: "status",
						"data-testid": "share-to-room-status",
						"data-tone": W.tone,
						className: `inline-flex items-center gap-1 text-[12px] ${W.tone === "error" ? "text-danger-fg" : "text-success-fg"}`,
						children: [W.text, W.tone === "error" && de && /* @__PURE__ */ z(g, {
							"aria-label": "Dismiss share error",
							variant: "ghost",
							size: "sm",
							onClick: de,
							className: "border-none p-0 text-current",
							icon: /* @__PURE__ */ z(S, { size: 12 })
						})]
					}),
					!Q && ve && /* @__PURE__ */ B("div", {
						"data-testid": "lifecycle-actions",
						className: "flex items-center gap-1.5",
						children: [
							he && Oe.length === 0 && /* @__PURE__ */ z("span", {
								"data-testid": "lifecycle-loading",
								className: "text-xs text-[var(--color-text-tertiary)]",
								children: "Checking review status…"
							}),
							Oe.map((e) => /* @__PURE__ */ z(h, {
								type: "button",
								size: "sm",
								variant: e === "finalize" ? "danger" : "secondary",
								"data-testid": `lifecycle-action-${e}`,
								disabled: Y,
								onClick: () => {
									Z(""), Te(""), Se(e);
								},
								children: at[e]
							}, e)),
							ye && /* @__PURE__ */ z(h, {
								type: "button",
								size: "sm",
								variant: "secondary",
								"data-testid": "claim-ownership-btn",
								onClick: () => De(!0),
								children: "Take ownership"
							})
						]
					}),
					We.some((e) => e.items.length > 0) && /* @__PURE__ */ z(ee, {
						trigger: Q ? /* @__PURE__ */ z(v, { size: 18 }) : /* @__PURE__ */ z("span", {
							className: "tracking-wide",
							children: "⋯"
						}),
						triggerLabel: "More actions",
						triggerTitle: "More actions",
						triggerClassName: Q ? n === "ghost" ? "h-7 w-7 p-0 rounded-md border-0 bg-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary" : "h-10 w-10 p-0 rounded-md border border-border bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary" : "h-8 rounded-md border border-border bg-surface px-2.5 text-[13px] text-text-primary hover:bg-surface-hover",
						align: "end",
						"data-testid": "document-header-menu",
						sections: We
					})
				]
			}),
			Ke
		]
	}) : /* @__PURE__ */ B("header", {
		"data-testid": "document-header",
		className: p(et, o),
		children: [
			/* @__PURE__ */ B("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ B("div", {
					className: "flex flex-1 min-w-0 items-center gap-[10px]",
					children: [
						se && /* @__PURE__ */ z(h, {
							variant: "ghost",
							size: "sm",
							onClick: se,
							className: "border-none px-0 py-0.5 text-[13px] font-normal text-primary",
							children: "← Documents"
						}),
						/* @__PURE__ */ z("input", {
							"aria-label": "Document title",
							readOnly: !(s ?? d === "editor") || !b,
							className: tt,
							value: u.title,
							placeholder: "Untitled document",
							onChange: (e) => {
								(s ?? d === "editor") && b && b({ title: e.target.value });
							}
						}),
						fe && /* @__PURE__ */ z(A, {
							"data-testid": "lifecycle-status",
							state: ut[fe],
							label: dt(fe)
						}),
						(G !== void 0 || K !== void 0 || pe) && /* @__PURE__ */ z($e, {
							owner: G ?? null,
							collaborators: K ?? [],
							...pe ? { onShare: pe } : {}
						}),
						me && /* @__PURE__ */ z("span", {
							"data-testid": "lifecycle-terminal-note",
							className: "text-[11px] italic text-[var(--color-text-tertiary)]",
							children: "Closed permanently — no further changes, for anyone"
						}),
						/* @__PURE__ */ z(Ge, { state: r }),
						u.updatedAt && /* @__PURE__ */ B("span", {
							className: nt,
							children: ["Last edited ", (() => {
								let e = Date.now() - new Date(u.updatedAt).getTime(), t = Math.floor(e / 6e4);
								if (t < 1) return "just now";
								if (t < 60) return `${t}m ago`;
								let n = Math.floor(t / 60);
								return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
							})()]
						}),
						I != null && I > 0 && /* @__PURE__ */ z(T, {
							tone: "neutral",
							size: "sm",
							className: "rounded-full px-2.5",
							icon: /* @__PURE__ */ z(x, { size: 12 }),
							children: I
						})
					]
				}), _.length > 0 && /* @__PURE__ */ z(Ue, {
					participants: _,
					sections: ie,
					onJumpToUser: re,
					onFollowUser: V,
					followingUserId: H
				})]
			}),
			/* @__PURE__ */ B("div", {
				className: "flex flex-wrap items-center justify-between gap-1",
				children: [/* @__PURE__ */ z(Qe, {
					mode: d === "editor" ? f ? "suggesting" : "editing" : d === "ack" ? "review" : "read",
					...m ? { reason: m } : {}
				}), /* @__PURE__ */ B("div", {
					className: "flex items-center gap-2",
					children: [
						i,
						a,
						F && /* @__PURE__ */ z("div", {
							ref: F,
							className: "flex items-center gap-2"
						}),
						ae && /* @__PURE__ */ B(h, {
							variant: "secondary",
							size: "sm",
							onClick: ae,
							children: ["My Items", oe ? ` (${oe})` : ""]
						}),
						(M || le || O && (j === "available" || j === "active")) && /* @__PURE__ */ B("div", {
							className: "flex h-8 items-center gap-0.5 rounded-md border border-border bg-surface pl-0.5 pr-0.5",
							"data-testid": "document-room-pill",
							"data-room": N ?? U ?? "",
							children: [
								M ? /* @__PURE__ */ B(h, {
									variant: "ghost",
									size: "sm",
									className: "inline-flex items-center gap-1.5 whitespace-nowrap border-0",
									"data-testid": "document-chat-toggle",
									onClick: M,
									title: N ? `Open the conversation in ${N}` : "Open this page’s conversation",
									children: [
										/* @__PURE__ */ z(x, { size: 13 }),
										/* @__PURE__ */ z("span", { children: N ? `#${N}` : "Conversation" }),
										P ? /* @__PURE__ */ z(T, {
											tone: "accent",
											size: "xs",
											mono: !0,
											"data-testid": "document-chat-unread",
											children: P
										}) : null
									]
								}) : N ?? U ? /* @__PURE__ */ B("span", {
									className: "px-1.5 text-xs font-medium text-text-primary",
									children: ["#", N ?? U]
								}) : null,
								le && /* @__PURE__ */ z(g, {
									"aria-label": ue ? "Sharing…" : `Share to #${U ?? "room"}`,
									title: U ? `Post a link to this page in #${U}` : "Post a link to this page in the room",
									variant: "ghost",
									size: "sm",
									className: "border-0",
									"data-testid": "share-to-room-btn",
									"data-sharing": ue ? "true" : "false",
									disabled: ue,
									onClick: le,
									icon: /* @__PURE__ */ z(y, { size: 13 })
								}),
								O && j === "available" && /* @__PURE__ */ z(h, {
									variant: "primary",
									size: "sm",
									onClick: O,
									"data-call-variant": "available",
									"data-testid": "doc-call-button",
									title: "This room has a call going — join it",
									children: te ?? "Join call"
								}),
								O && j === "active" && /* @__PURE__ */ z(h, {
									variant: "secondary",
									size: "sm",
									className: it.active,
									onClick: O,
									"aria-pressed": !0,
									"data-call-variant": "active",
									"data-testid": "doc-call-button",
									children: te ?? "In call"
								})
							]
						}),
						W && /* @__PURE__ */ B("span", {
							role: "status",
							"data-testid": "share-to-room-status",
							"data-tone": W.tone,
							className: `inline-flex items-center gap-1 text-[12px] ${W.tone === "error" ? "text-danger-fg" : "text-success-fg"}`,
							children: [W.text, W.tone === "error" && de && /* @__PURE__ */ z(g, {
								"aria-label": "Dismiss share error",
								variant: "ghost",
								size: "sm",
								onClick: de,
								className: "border-none p-0 text-current",
								icon: /* @__PURE__ */ z(S, { size: 12 })
							})]
						}),
						ve && /* @__PURE__ */ B("div", {
							"data-testid": "lifecycle-actions",
							className: "flex items-center gap-1.5",
							children: [
								he && Oe.length === 0 && /* @__PURE__ */ z("span", {
									"data-testid": "lifecycle-loading",
									className: "text-xs text-[var(--color-text-tertiary)]",
									children: "Checking review status…"
								}),
								Oe.map((e) => /* @__PURE__ */ z(h, {
									type: "button",
									size: "sm",
									variant: e === "finalize" ? "danger" : "secondary",
									"data-testid": `lifecycle-action-${e}`,
									disabled: Y,
									onClick: () => {
										Z(""), Te(""), Se(e);
									},
									children: at[e]
								}, e)),
								ye && /* @__PURE__ */ z(h, {
									type: "button",
									size: "sm",
									variant: "secondary",
									"data-testid": "claim-ownership-btn",
									onClick: () => De(!0),
									children: "Take ownership"
								})
							]
						}),
						We.some((e) => e.items.length > 0) && /* @__PURE__ */ z(ee, {
							trigger: /* @__PURE__ */ z("span", {
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
			/* @__PURE__ */ z(ht, {
				lifecycleError: ge,
				..._e ? { onDismissLifecycleError: _e } : {},
				lifecycleLegacyClaim: q,
				canClaimOwnership: !!ye
			}),
			Ke
		]
	});
}
function ht({ lifecycleError: e, onDismissLifecycleError: t, lifecycleLegacyClaim: n, canClaimOwnership: r = !1 }) {
	let i = pt(e), a = r ? !0 : void 0;
	return !e && !n ? null : /* @__PURE__ */ B(R, { children: [e && /* @__PURE__ */ z(w, {
		variant: e.kind === "conflict" ? "warning" : "error",
		...t ? { onDismiss: t } : {},
		children: /* @__PURE__ */ B("span", {
			"data-testid": "lifecycle-error",
			"data-kind": e.kind,
			children: [
				/* @__PURE__ */ z("strong", { children: ft[e.kind] }),
				" ",
				/* @__PURE__ */ z("span", {
					"data-testid": "lifecycle-error-detail",
					children: e.message
				}),
				i && /* @__PURE__ */ B(R, { children: [" ", /* @__PURE__ */ B("span", {
					"data-testid": "lifecycle-ownerless-note",
					children: ["Nobody owns this document yet. Ownership is never taken on your behalf —", a ? " use “Take ownership” above if it should be yours." : " its owner has to claim it deliberately."]
				})] })
			]
		})
	}), n && /* @__PURE__ */ B(w, {
		variant: "warning",
		title: "This document was marked final before the status moved to the server.",
		"data-testid": "lifecycle-legacy-claim",
		children: [
			"Nothing on the server records it being finalized, reviewed or approved, so it counts as",
			" ",
			/* @__PURE__ */ z("strong", { children: dt(n.serverStatus) }),
			" and is editable again. The old marker was a value any connected client could set, which is why it is not being taken as a status. To close it for good, take it through review and use Finalize — that route records who approved it and when."
		]
	})] });
}
function gt({ status: e, variant: t = "pill" }) {
	return /* @__PURE__ */ z(A, {
		variant: t,
		"data-testid": "lifecycle-status",
		state: ut[e],
		label: dt(e)
	});
}
//#endregion
//#region src/components/doc-editor/DocumentHeader.tsx
function _t(e) {
	return e.onModeChange ? /* @__PURE__ */ z(Xe, { ...e }) : /* @__PURE__ */ z(mt, { ...e });
}
//#endregion
//#region src/components/doc-editor/FollowModeBar.tsx
function vt({ followingUserId: e, participants: t, onStopFollow: n }) {
	let r = I(null), i = m(n);
	if (P(() => {
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
	return a ? /* @__PURE__ */ B("div", {
		className: p("flex items-center justify-center gap-2 px-4 py-1.5 bg-info-bg border-b border-info-border text-[13px] font-medium text-info-fg shrink-0"),
		children: [/* @__PURE__ */ B("span", { children: ["Following ", a.displayName] }), /* @__PURE__ */ z("button", {
			onClick: n,
			className: p("bg-transparent border border-info-border rounded px-2 py-0.5 text-xs font-semibold text-info-fg cursor-pointer font-[inherit]"),
			children: "Stop"
		})]
	}) : null;
}
//#endregion
//#region src/components/ui/Panel.tsx
var yt = ({ children: e, variant: t = "light", width: n = 320, style: r }) => typeof document > "u" ? null : V(/* @__PURE__ */ z("div", {
	className: p("fixed right-0 top-0 h-full z-[60] flex flex-col shadow-[-4px_0_12px_rgba(0,0,0,0.08)]", t === "dark" ? "bg-call-chrome" : "bg-surface"),
	style: {
		width: n,
		...r
	},
	children: e
}), document.body), bt = ({ title: e, onClose: t, actions: n, variant: r = "light" }) => {
	let i = r === "dark";
	return /* @__PURE__ */ B("div", {
		className: p("flex items-center justify-between px-4 py-2", i ? "border-b border-white/10" : "border-b border-border"),
		children: [/* @__PURE__ */ z("span", {
			className: p("text-[13px] font-semibold", i ? "text-white" : "text-text-primary"),
			children: e
		}), /* @__PURE__ */ B("div", {
			className: "flex items-center gap-1",
			children: [n, /* @__PURE__ */ z("button", {
				type: "button",
				onClick: t,
				className: p("w-[22px] h-[22px] flex items-center justify-center", "bg-transparent border-none rounded-sm cursor-pointer", "text-sm p-0 leading-none", i ? "text-text-tertiary" : "text-text-secondary"),
				"aria-label": "Close panel",
				children: "×"
			})]
		})]
	});
}, xt = ({ children: e, padding: t }) => /* @__PURE__ */ z("div", {
	className: "flex-1 overflow-y-auto",
	style: { padding: t ?? "14px 12px" },
	children: e
}), St = {
	default: "bg-surface text-text-primary border border-border",
	primary: "bg-success text-white border border-success",
	danger: "bg-danger text-white border border-danger"
}, Ct = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-[13px]"
}, wt = ({ variant: e = "default", size: t = "md", style: n, type: r = "button", className: i, ...a }) => /* @__PURE__ */ z("button", {
	type: r,
	className: p("rounded-sm cursor-pointer font-medium leading-[1.4]", St[e], Ct[t], i),
	style: n,
	...a
}), Tt = ({ active: e = !1, activeColor: t = "rgba(255,255,255,0.1)", size: n = 36, style: r, type: i = "button", className: a, ...o }) => /* @__PURE__ */ z("button", {
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
function Et({ participant: e, isSpeaking: t }) {
	let n = I(null);
	return P(() => {
		let t = n.current, r = e.streams[0] ?? null;
		t && r && t.srcObject !== r && (t.srcObject = r);
	}, [e.streams]), /* @__PURE__ */ B("div", {
		className: p("relative bg-video-tile rounded-lg overflow-hidden transition-shadow duration-300", t ? "video-tile-speaking" : "video-tile-idle"),
		children: [
			/* @__PURE__ */ z("video", {
				ref: n,
				autoPlay: !0,
				playsInline: !0,
				muted: e.isLocal,
				className: p("w-full h-full object-cover")
			}),
			/* @__PURE__ */ z("div", { className: p("absolute bottom-0 left-0 right-0 h-9 bg-gradient-to-t from-black/50 to-transparent pointer-events-none") }),
			/* @__PURE__ */ B("div", {
				className: p("absolute bottom-1.5 left-1.5 flex items-center gap-1 bg-black/60 text-white text-[11px] font-medium px-2 py-[3px] rounded-full"),
				children: [
					t && /* @__PURE__ */ z("span", { className: p("w-[5px] h-[5px] rounded-full bg-success") }),
					/* @__PURE__ */ z("span", { children: e.userId }),
					e.isLocal && /* @__PURE__ */ z("span", {
						className: p("opacity-50"),
						children: "(You)"
					})
				]
			})
		]
	});
}
function Dt({ stream: e, userId: t, cameraStream: n, isLocal: r }) {
	let i = I(null), a = I(null);
	return P(() => {
		let t = i.current;
		t && t.srcObject !== e && (t.srcObject = e);
	}, [e]), P(() => {
		let e = a.current;
		e && n && e.srcObject !== n && (e.srcObject = n);
	}, [n]), /* @__PURE__ */ B("div", {
		className: p("relative bg-black rounded-[10px] overflow-hidden border-2 border-info aspect-video"),
		children: [
			/* @__PURE__ */ z("video", {
				ref: i,
				autoPlay: !0,
				playsInline: !0,
				muted: !0,
				className: p("w-full h-full object-contain")
			}),
			r && n && /* @__PURE__ */ z("video", {
				ref: a,
				autoPlay: !0,
				playsInline: !0,
				muted: !0,
				className: p("absolute bottom-2 right-2 w-36 object-cover rounded-lg border-2 border-white/30 aspect-video")
			}),
			/* @__PURE__ */ B("div", {
				className: p("absolute bottom-1.5 left-1.5 bg-[rgba(59,130,246,0.8)] text-white text-[11px] font-medium px-2 py-[3px] rounded-full"),
				children: [t, "'s screen"]
			})
		]
	});
}
function Ot({ stageToken: e, participantId: t, userId: n, onEndCall: r }) {
	let { participants: i, isJoined: a, isScreenSharing: o, error: s, toggleMute: c, toggleCamera: l, startScreenShare: u, stopScreenShare: d, leave: f } = ie({
		stageToken: e,
		userId: n,
		participantId: t
	}), { activeSpeakerId: m } = ae({ participants: i }), [h, g] = L(!1), [_, v] = L(!1), [y, b] = L(!1), x = oe(() => i.map((e) => ({
		...e,
		isSpeaking: e.participantId === m
	})), [i, m]), S = x.find((e) => e.screenStream);
	return s ? /* @__PURE__ */ B("div", {
		className: p("p-4 text-center text-danger-fg text-[13px]"),
		children: [
			s,
			/* @__PURE__ */ z("br", {}),
			/* @__PURE__ */ z(wt, {
				onClick: r,
				className: "mt-3",
				children: "Close"
			})
		]
	}) : a ? /* @__PURE__ */ B("div", {
		className: p("flex flex-col"),
		onMouseEnter: () => b(!0),
		onMouseLeave: () => b(!1),
		children: [
			S?.screenStream && /* @__PURE__ */ z("div", {
				className: p("p-1.5 pb-0"),
				children: /* @__PURE__ */ z(Dt, {
					stream: S.screenStream,
					userId: S.userId,
					cameraStream: S.streams[0],
					isLocal: S.isLocal
				})
			}),
			/* @__PURE__ */ z("div", {
				className: p("flex-1 grid gap-1 p-1.5 content-start", x.length <= 1 ? "grid-cols-1" : "grid-cols-2"),
				children: x.map((e) => /* @__PURE__ */ z(Et, {
					participant: e,
					isSpeaking: e.isSpeaking
				}, e.participantId))
			}),
			/* @__PURE__ */ B("div", {
				className: p("flex justify-center gap-1 px-2 py-1.5 border-t border-code-raised shrink-0 transition-opacity duration-200", y ? "opacity-100" : "opacity-0"),
				children: [
					/* @__PURE__ */ z(Tt, {
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
					/* @__PURE__ */ z(Tt, {
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
					/* @__PURE__ */ z(Tt, {
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
					/* @__PURE__ */ z(Tt, {
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
			/* @__PURE__ */ B("div", {
				className: p("text-center text-[10px] text-text-secondary py-1"),
				children: [i.length, " in call"]
			})
		]
	}) : /* @__PURE__ */ z("div", {
		className: p("p-5 text-center text-text-secondary text-[13px]"),
		children: "Connecting to video..."
	});
}
function kt({ documentId: e, userId: t, idToken: n, meta: r, updateMeta: i, sendMessage: a, onClose: o, onDockToSidebar: c, isDocked: l, onUndock: u, onCallEnd: d }) {
	let { callState: f, stageToken: m, participantId: h, userId: g, error: _, hasActiveCall: v, startCall: y, joinCall: b, endCall: x } = s({
		documentId: e,
		idToken: n,
		meta: r,
		updateMeta: i,
		sendMessage: a,
		displayName: t
	}), S = I(f);
	P(() => {
		S.current === "active" && f === "idle" && d?.(), S.current = f;
	}, [f, d]);
	let C = r?.activeCallSessionId;
	return /* @__PURE__ */ B("div", {
		className: p("bg-call-chrome border border-code-raised rounded-xl overflow-hidden"),
		children: [/* @__PURE__ */ B("div", {
			className: p("flex items-center justify-between px-2 py-1 border-b border-code-raised shrink-0"),
			children: [/* @__PURE__ */ z("span", {
				className: p("text-[11px] font-semibold text-text-tertiary m-0"),
				children: "Video"
			}), /* @__PURE__ */ B("div", {
				className: p("flex items-center gap-0.5"),
				children: [
					c && !l && /* @__PURE__ */ z("button", {
						type: "button",
						onClick: c,
						title: "Dock to sidebar",
						className: p("w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-text-tertiary cursor-pointer text-xs leading-none p-0"),
						children: "←"
					}),
					l && u && /* @__PURE__ */ z("button", {
						type: "button",
						onClick: u,
						title: "Undock from sidebar",
						className: p("w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-text-tertiary cursor-pointer text-xs leading-none p-0"),
						children: "→"
					}),
					/* @__PURE__ */ z("button", {
						type: "button",
						onClick: o,
						title: "Close video",
						className: p("w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-text-tertiary cursor-pointer text-sm leading-none p-0"),
						children: "✕"
					})
				]
			})]
		}), /* @__PURE__ */ B("div", { children: [
			f === "active" && m && h && g && /* @__PURE__ */ z(Ot, {
				stageToken: m,
				participantId: h,
				userId: g,
				onEndCall: x
			}),
			(f === "creating" || f === "joining") && /* @__PURE__ */ z("div", {
				className: p("p-4 text-center text-text-tertiary text-[13px]"),
				children: f === "creating" ? "Starting call..." : "Joining call..."
			}),
			f === "error" && /* @__PURE__ */ B("div", {
				className: p("p-4 text-center"),
				children: [/* @__PURE__ */ z("div", {
					className: p("text-code-red text-[13px] mb-3"),
					children: _
				}), /* @__PURE__ */ z(wt, {
					variant: "primary",
					onClick: () => y(),
					children: "Try Again"
				})]
			}),
			f === "idle" && /* @__PURE__ */ z("div", {
				className: p("p-4 text-center"),
				children: v && C ? /* @__PURE__ */ B(R, { children: [/* @__PURE__ */ z("div", {
					className: p("text-[13px] text-code-subtle mb-3"),
					children: "A call is in progress on this document."
				}), /* @__PURE__ */ z(wt, {
					variant: "primary",
					onClick: () => b(C),
					children: "Join Call"
				})] }) : /* @__PURE__ */ B(R, { children: [/* @__PURE__ */ z("div", {
					className: p("text-[13px] text-text-tertiary mb-3"),
					children: "Start a video call with collaborators on this document."
				}), /* @__PURE__ */ z(wt, {
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
var At = {
	summary: "#8b5cf6",
	tasks: "#3b82f6",
	decisions: "#f59e0b",
	notes: "#6b7280",
	custom: "#10b981"
};
function jt(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
var Mt = 3;
function Nt({ participants: e }) {
	if (!e || e.length === 0) return null;
	let t = e.slice(0, Mt), n = e.length - Mt;
	return /* @__PURE__ */ B("div", {
		className: p("flex items-center ml-auto shrink-0"),
		children: [t.map((e, t) => /* @__PURE__ */ B("div", {
			title: `${e.displayName} (${e.mode})`,
			className: p("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold border-2 border-white relative transition-transform duration-200"),
			style: {
				background: `linear-gradient(135deg, ${e.color || "#3b82f6"}, ${Pt(e.color || "#3b82f6", .2)})`,
				marginLeft: t === 0 ? 0 : -8,
				zIndex: Mt - t
			},
			children: [jt(e.displayName), /* @__PURE__ */ z("div", { className: p("absolute bottom-0 right-0 w-2 h-2 rounded-full bg-success border-2 border-white") })]
		}, e.clientId)), n > 0 && /* @__PURE__ */ B("div", {
			className: p("w-6 h-6 rounded-full bg-border text-neutral flex items-center justify-center text-[9px] font-bold border-2 border-white relative -ml-2"),
			children: ["+", n]
		})]
	});
}
function Pt(e, t) {
	let n = e.replace("#", ""), r = parseInt(n, 16), i = Math.max(0, (r >> 16 & 255) * (1 - t)), a = Math.max(0, (r >> 8 & 255) * (1 - t)), o = Math.max(0, (r & 255) * (1 - t));
	return `rgb(${Math.round(i)}, ${Math.round(a)}, ${Math.round(o)})`;
}
function Ft({ section: e, fragment: n, ydoc: r, provider: i, user: a, editable: o, onUpdateSection: s, onAddItem: c, onUpdateItem: l, onRemoveItem: u, participants: d, onFocus: f, isFocused: m, comments: h, onUpdateCursorInfo: g, commentCount: _ = 0, onOpenComments: v, commentPresence: y }) {
	let [b, x] = L(e.collapsed), S = () => {
		let e = !b;
		x(e), s({ collapsed: e });
	}, C = t(e.sectionType ?? e.type, "editor") ?? te, w = d && d.length > 0, T = w ? d[0].color || "#3b82f6" : "transparent", [E, O] = L(!1);
	return /* @__PURE__ */ B("div", {
		id: `section-${e.id}`,
		"data-testid": `section-block-${e.id}`,
		className: p("border border-border rounded-lg mb-4 bg-surface relative transition-[border-left,box-shadow] duration-300 ease-in-out"),
		style: {
			borderLeft: w ? `3px solid ${T}` : "1px solid #e2e8f0",
			boxShadow: m ? "0 0 0 2px rgba(59, 130, 246, 0.3)" : "none"
		},
		onClickCapture: f,
		onFocusCapture: f,
		children: [
			v && /* @__PURE__ */ B("button", {
				type: "button",
				onClick: (t) => {
					t.stopPropagation(), v(e.id);
				},
				onMouseEnter: () => O(!0),
				onMouseLeave: () => O(!1),
				className: p("absolute top-1/2 -right-[52px] -translate-y-1/2 w-10 h-10 rounded-full border border-border flex items-center justify-center text-xl leading-none p-0 z-[1] shadow-sm cursor-pointer transition-[opacity,background] duration-150 ease-in-out", E ? "bg-surface-hover opacity-90" : "bg-surface opacity-40"),
				title: "Open comments",
				children: [
					/* @__PURE__ */ z("span", {
						className: p("pointer-events-none"),
						children: "💬"
					}),
					_ > 0 && /* @__PURE__ */ z("span", {
						className: p("absolute -top-1 -right-1 min-w-[16px] h-4 rounded-lg bg-info text-white text-[10px] font-bold flex items-center justify-center px-1 leading-none"),
						children: _
					}),
					y && y.length > 0 && /* @__PURE__ */ z("span", {
						className: p("absolute -left-1 top-1/2 -translate-y-1/2 flex flex-col gap-0.5"),
						children: y.slice(0, 3).map((e) => /* @__PURE__ */ z("span", {
							title: e.displayName,
							className: p("w-2 h-2 rounded-full border border-white block"),
							style: { background: e.color || "#3b82f6" }
						}, e.clientId))
					})
				]
			}),
			/* @__PURE__ */ B("div", {
				className: p("flex items-center gap-2 py-2.5 px-3.5 bg-surface-panel border-b border-border rounded-t-lg"),
				children: [
					/* @__PURE__ */ z("button", {
						type: "button",
						onClick: S,
						className: p("border-none bg-transparent cursor-pointer text-xs p-1 text-neutral leading-none rounded inline-flex items-center justify-center transition-[background,transform] duration-200 ease-in-out hover:bg-border", b ? "-rotate-90" : "rotate-0"),
						title: b ? "Expand section" : "Collapse section",
						children: /* @__PURE__ */ z("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: /* @__PURE__ */ z("polyline", { points: "6 9 12 15 18 9" })
						})
					}),
					/* @__PURE__ */ z(D, {
						value: e.title,
						onChange: (e) => s({ title: e.target.value }),
						readOnly: !o,
						className: p("flex-1 h-auto border-transparent bg-transparent text-[15px] font-semibold py-0.5 px-1.5 cursor-text")
					}),
					/* @__PURE__ */ z("span", {
						className: p("py-0.5 px-2.5 text-[11px] font-semibold rounded-xl text-white capitalize whitespace-nowrap"),
						style: { background: At[e.type] },
						children: e.type
					}),
					/* @__PURE__ */ z(Nt, { participants: d ?? [] })
				]
			}),
			!b && /* @__PURE__ */ z("div", {
				className: p("p-3.5"),
				children: /* @__PURE__ */ z(ne, {
					name: `section:${e.id}`,
					children: /* @__PURE__ */ z(C, {
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
function It({ sections: e, getSectionFragment: t, ydoc: n, provider: r, user: i, editable: a, onUpdateSection: o, onAddItem: s, onUpdateItem: c, onRemoveItem: l, participants: u, onSectionFocus: d, focusedSectionId: f, comments: m, onAddComment: h, onResolveThread: g, onUnresolveThread: _, onUpdateCursorInfo: v, onOpenComments: y }) {
	return /* @__PURE__ */ z("div", {
		className: p("flex flex-col gap-0 pb-4"),
		children: e.map((e) => /* @__PURE__ */ z(Ft, {
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
function Lt(e) {
	return `ws_attachments_${e}`;
}
function Rt(e) {
	try {
		let t = localStorage.getItem(Lt(e));
		return t ? JSON.parse(t) : [];
	} catch {
		return [];
	}
}
function zt(e) {
	let [t, n] = L(() => Rt(e));
	P(() => {
		n(Rt(e));
	}, [e]);
	let r = (t) => {
		localStorage.setItem(Lt(e), JSON.stringify(t)), n(t);
	};
	return {
		attachments: t,
		addFile: (t, n) => {
			r([...Rt(e), {
				id: crypto.randomUUID(),
				kind: "file",
				name: t.trim(),
				url: n.trim(),
				addedAt: (/* @__PURE__ */ new Date()).toISOString()
			}]);
		},
		addDocumentLink: (t) => {
			r([...Rt(e), {
				id: crypto.randomUUID(),
				kind: "document",
				title: t.trim(),
				addedAt: (/* @__PURE__ */ new Date()).toISOString()
			}]);
		},
		remove: (t) => {
			r(Rt(e).filter((e) => e.id !== t));
		}
	};
}
function Bt({ onAdd: e, onCancel: t }) {
	let [n, r] = L(""), [i, a] = L(""), o = n.trim().length > 0 && i.trim().length > 0;
	return /* @__PURE__ */ B("div", {
		className: p("flex gap-2 items-start flex-wrap"),
		children: [
			/* @__PURE__ */ z(D, {
				autoFocus: !0,
				placeholder: "File name",
				value: n,
				onChange: (e) => r(e.target.value),
				className: p("flex-1 min-w-[120px]")
			}),
			/* @__PURE__ */ z(D, {
				placeholder: "URL or path",
				value: i,
				onChange: (e) => a(e.target.value),
				onKeyDown: (t) => {
					t.key === "Enter" && o && e(n, i);
				},
				className: p("flex-[2] min-w-[120px]")
			}),
			/* @__PURE__ */ z("button", {
				type: "button",
				disabled: !o,
				onClick: () => {
					o && e(n, i);
				},
				className: p("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-on-primary border-none rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"),
				children: "Attach"
			}),
			/* @__PURE__ */ z("button", {
				type: "button",
				onClick: t,
				className: p("px-3 py-1.5 text-[13px] bg-transparent border-none text-neutral cursor-pointer font-[inherit] shrink-0"),
				children: "Cancel"
			})
		]
	});
}
function Vt({ onAdd: e, onCancel: t }) {
	let [n, r] = L(""), i = n.trim().length > 0;
	return /* @__PURE__ */ B("div", {
		className: p("flex gap-2 items-center flex-wrap"),
		children: [
			/* @__PURE__ */ z(D, {
				autoFocus: !0,
				placeholder: "Document name",
				value: n,
				onChange: (e) => r(e.target.value),
				onKeyDown: (t) => {
					t.key === "Enter" && i && e(n);
				},
				className: p("flex-1 min-w-[120px]")
			}),
			/* @__PURE__ */ z("button", {
				type: "button",
				disabled: !i,
				onClick: () => {
					i && e(n);
				},
				className: p("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-on-primary border-none rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"),
				children: "Link"
			}),
			/* @__PURE__ */ z("button", {
				type: "button",
				onClick: t,
				className: p("px-3 py-1.5 text-[13px] bg-transparent border-none text-neutral cursor-pointer font-[inherit] shrink-0"),
				children: "Cancel"
			})
		]
	});
}
function Ht({ attachment: e, onRemove: t, editable: n }) {
	let r = e.kind === "file";
	return /* @__PURE__ */ B("div", {
		className: p("flex items-center gap-2.5 px-2.5 py-[7px] rounded-md bg-surface-panel border border-border"),
		children: [
			/* @__PURE__ */ z("span", {
				className: p("text-sm shrink-0 text-neutral"),
				children: r ? "📎" : "📄"
			}),
			/* @__PURE__ */ B("div", {
				className: p("flex-1 min-w-0"),
				children: [r ? /* @__PURE__ */ z("a", {
					href: e.url,
					target: "_blank",
					rel: "noopener noreferrer",
					className: p("text-[13px] text-info-fg font-medium no-underline hover:underline"),
					children: e.name
				}) : /* @__PURE__ */ z("span", {
					className: p("text-[13px] text-text-primary font-medium"),
					children: e.title
				}), /* @__PURE__ */ z("div", {
					className: p("text-[11px] text-text-tertiary mt-px"),
					children: r ? e.url : "Linked document"
				})]
			}),
			n && /* @__PURE__ */ z("button", {
				type: "button",
				onClick: t,
				title: "Remove",
				className: p("bg-transparent border-none cursor-pointer text-danger-fg text-sm px-[5px] py-0.5 opacity-50 leading-none rounded shrink-0 hover:opacity-100"),
				children: "×"
			})
		]
	});
}
function Ut({ documentId: e, editable: t }) {
	let { attachments: n, addFile: r, addDocumentLink: i, remove: a } = zt(e), [o, s] = L(null), c = n.length > 0;
	return /* @__PURE__ */ B("div", {
		className: p("mt-4 border border-border rounded-[10px] overflow-hidden"),
		children: [
			/* @__PURE__ */ B("div", {
				className: p("flex items-center justify-between px-3.5 py-2.5 bg-surface-panel", c || o ? "border-b border-border" : ""),
				children: [/* @__PURE__ */ B("span", {
					className: p("text-[13px] font-semibold text-text-primary"),
					children: ["Attachments", c && /* @__PURE__ */ z("span", {
						className: p("ml-1.5 text-[11px] text-text-tertiary font-normal"),
						children: n.length
					})]
				}), t && o === null && /* @__PURE__ */ B("div", {
					className: p("flex gap-1.5"),
					children: [/* @__PURE__ */ z("button", {
						type: "button",
						onClick: () => s("file"),
						className: p("text-xs px-2.5 py-1 font-semibold bg-surface border border-border-field rounded-[5px] cursor-pointer font-[inherit] text-text-primary"),
						children: "+ File"
					}), /* @__PURE__ */ z("button", {
						type: "button",
						onClick: () => s("document"),
						className: p("text-xs px-2.5 py-1 font-semibold bg-surface border border-border-field rounded-[5px] cursor-pointer font-[inherit] text-text-primary"),
						children: "+ Document"
					})]
				})]
			}),
			c && /* @__PURE__ */ z("div", {
				className: p("flex flex-col gap-1.5 px-3.5 py-2.5"),
				children: n.map((e) => /* @__PURE__ */ z(Ht, {
					attachment: e,
					onRemove: () => a(e.id),
					editable: t
				}, e.id))
			}),
			o === "file" && /* @__PURE__ */ z("div", {
				className: p("px-3.5 py-2.5", c ? "border-t border-border" : ""),
				children: /* @__PURE__ */ z(Bt, {
					onAdd: (e, t) => {
						r(e, t), s(null);
					},
					onCancel: () => s(null)
				})
			}),
			o === "document" && /* @__PURE__ */ z("div", {
				className: p("px-3.5 py-2.5", c ? "border-t border-border" : ""),
				children: /* @__PURE__ */ z(Vt, {
					onAdd: (e) => {
						i(e), s(null);
					},
					onCancel: () => s(null)
				})
			}),
			!c && !o && /* @__PURE__ */ z("div", {
				className: p("px-3.5 py-3.5 text-xs text-text-tertiary text-center"),
				children: t ? "No attachments yet — add a file or link a document above." : "No attachments."
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/MentionDropdown.tsx
function Wt(e) {
	let t = e.trim().split(/\s+/);
	return t.length === 0 ? "?" : t.length === 1 ? t[0].charAt(0).toUpperCase() : (t[0].charAt(0) + t[t.length - 1].charAt(0)).toUpperCase();
}
var Gt = M(function({ query: e, users: t, position: n, onSelect: r, onDismiss: i }, a) {
	let [o, s] = L(0), c = I(null), l = t.filter((t) => t.displayName.toLowerCase().includes(e.toLowerCase())).slice(0, 6);
	P(() => {
		s(0);
	}, [e]), P(() => {
		let e = c.current;
		if (!e) return;
		let t = e.children[o];
		t && t.scrollIntoView({ block: "nearest" });
	}, [o]);
	let u = N((e) => e.key === "ArrowDown" ? (e.preventDefault(), s((e) => (e + 1) % Math.max(l.length, 1)), !0) : e.key === "ArrowUp" ? (e.preventDefault(), s((e) => (e - 1 + Math.max(l.length, 1)) % Math.max(l.length, 1)), !0) : e.key === "Enter" || e.key === "Tab" ? (e.preventDefault(), l.length > 0 && r(l[o]), !0) : e.key === "Escape" && (e.preventDefault(), i(), !0), [
		l,
		o,
		r,
		i
	]);
	return F(a, () => ({ handleKeyDown: u }), [u]), se.createPortal(/* @__PURE__ */ z("div", {
		ref: c,
		role: "listbox",
		className: p("fixed z-[1000] bg-surface border border-border rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.12)] max-h-60 overflow-y-auto min-w-[200px]"),
		style: {
			top: n.top,
			left: n.left
		},
		children: l.length === 0 ? /* @__PURE__ */ z("div", {
			className: p("px-4 py-3 text-[13px] text-text-tertiary text-center"),
			children: "No users found"
		}) : l.map((e, t) => /* @__PURE__ */ B("div", {
			role: "option",
			"aria-selected": t === o,
			className: p("flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors duration-100", t === o ? "bg-info-bg" : "bg-transparent"),
			onMouseEnter: () => s(t),
			onMouseDown: (t) => {
				t.preventDefault(), r(e);
			},
			children: [/* @__PURE__ */ z("div", {
				className: p("w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[11px] font-semibold text-white leading-none"),
				style: { background: e.color },
				children: e.type === "group" ? "#" : Wt(e.displayName)
			}), /* @__PURE__ */ B("div", {
				className: p("flex items-center gap-1.5 flex-1 min-w-0"),
				children: [
					/* @__PURE__ */ z("span", {
						className: p("text-[13px] font-medium text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
						children: e.type === "group" ? `@${e.displayName.toLowerCase()}` : e.displayName
					}),
					e.type === "user" && /* @__PURE__ */ z("span", { className: p("w-2 h-2 rounded-full shrink-0", e.online ? "bg-success" : "bg-text-disabled") }),
					e.type === "user" && e.mode && /* @__PURE__ */ z("span", {
						className: p("text-[11px] text-text-tertiary shrink-0"),
						children: e.mode
					}),
					e.type === "group" && e.memberCount != null && /* @__PURE__ */ B("span", {
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
function Kt(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function qt(e) {
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
function Jt(e) {
	let t = 0;
	for (let n of e) t += 1 + Jt(n.replies);
	return t;
}
function Yt(e, t) {
	return e.split(/(@[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)*)/g).map((e, n) => e.startsWith("@") && /^@[A-Z]/.test(e) ? /* @__PURE__ */ z("span", {
		className: p("text-info-fg font-semibold bg-info-bg px-0.5 rounded-sm"),
		children: e
	}, `${t}-${n}`) : e);
}
function Xt(e) {
	let t = [], n = /\[([^\]\n]{1,120})\]\((\/(?!\/)[^\s)]{0,500})\)/g, r = 0, i;
	for (; (i = n.exec(e)) !== null;) i.index > r && t.push(...Yt(e.slice(r, i.index), `t${r}`)), t.push(/* @__PURE__ */ z("a", {
		href: i[2],
		className: p("text-info-fg underline underline-offset-2 hover:text-info"),
		children: i[1]
	}, `l${i.index}`)), r = i.index + i[0].length;
	return r < e.length && t.push(...Yt(e.slice(r), `t${r}`)), t;
}
var Zt = {
	active: !1,
	query: "",
	position: {
		top: 0,
		left: 0
	},
	atIndex: -1
};
function Qt(e, t, n) {
	let r = t - 1;
	for (; r >= 0 && e[r] !== "@" && e[r] !== " " && e[r] !== "\n";) r--;
	if (r < 0 || e[r] !== "@" || r > 0 && e[r - 1] !== " " && e[r - 1] !== "\n") return Zt;
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
function $t(e, t, n) {
	let r = e.slice(0, t.atIndex), i = e.slice(t.atIndex + 1 + t.query.length), a = `@${n.displayName} `;
	return {
		newValue: r + a + i,
		newCursor: r.length + a.length
	};
}
function en({ context: e }) {
	if (e.kind === "document") return /* @__PURE__ */ z("div", {
		"data-testid": "comment-context",
		"data-kind": "document",
		className: p("mb-1.5 text-[11px] italic text-text-tertiary"),
		children: "On the whole document"
	});
	let t = e.kind === "removed";
	return /* @__PURE__ */ B("div", {
		"data-testid": "comment-context",
		"data-kind": e.kind,
		className: p("mb-1.5 border-l-2 pl-2 text-xs leading-snug", t ? "border-l-border-emphasis" : "border-l-warning"),
		children: [t && /* @__PURE__ */ z("div", {
			className: p("text-[11px] font-medium text-text-tertiary"),
			children: "Original text was removed"
		}), /* @__PURE__ */ z("blockquote", {
			title: e.text,
			className: p("m-0 line-clamp-2 text-text-secondary", t && "line-through decoration-text-tertiary"),
			children: e.text
		})]
	});
}
function tn(e) {
	let t = (e ?? "").trim();
	if (!t) return "someone";
	let n = /^agent:([\w-]+)$/i.exec(t);
	if (n) {
		let e = n[1].replace(/[-_]+/g, " ");
		return `${e.charAt(0).toUpperCase()}${e.slice(1)} agent`;
	}
	return t;
}
function nn({ resolvedBy: e, resolvedAt: t, expanded: n, onToggle: r, onReopen: i }) {
	let a = tn(e), o = t ? qt(t) : "", s = o.replace(/ ago$/, "");
	return /* @__PURE__ */ B("div", {
		role: "button",
		tabIndex: 0,
		"aria-expanded": n,
		"aria-label": `Resolved by ${a}${o ? `, ${o}` : ""}. ${n ? "Collapse" : "Expand"} thread`,
		title: `Resolved by ${a}${o ? ` ${o}` : ""} — ${n ? "collapse" : "show"} the thread`,
		"data-testid": "comment-resolved-banner",
		className: p("group bg-success-bg border-l-[3px] border-l-success pl-2 pr-1 py-1 mb-1 rounded cursor-pointer flex items-center gap-1 min-w-0"),
		onClick: r,
		onKeyDown: j(r),
		children: [
			/* @__PURE__ */ z("span", {
				"aria-hidden": !0,
				className: p("text-success-fg text-xs shrink-0"),
				children: "✓"
			}),
			/* @__PURE__ */ B("span", {
				className: p("text-success-fg text-xs font-semibold truncate min-w-0 flex-1"),
				children: ["Resolved by ", a]
			}),
			s && /* @__PURE__ */ z("span", {
				className: p("text-text-tertiary text-[11px] whitespace-nowrap shrink-0"),
				children: s
			}),
			i && /* @__PURE__ */ z("button", {
				type: "button",
				"aria-label": "Reopen",
				title: "Reopen thread",
				onClick: (e) => {
					e.stopPropagation(), i();
				},
				onKeyDown: (e) => e.stopPropagation(),
				"data-testid": "comment-resolved-reopen",
				className: p("shrink-0 inline-flex items-center justify-center w-6 h-6 bg-transparent border-none rounded text-text-tertiary cursor-pointer hover:bg-surface-hover hover:text-text-primary"),
				children: /* @__PURE__ */ z(C, {
					"aria-hidden": !0,
					size: 13
				})
			}),
			/* @__PURE__ */ z(b, {
				"aria-hidden": !0,
				size: 14,
				dir: n ? "up" : "down",
				className: p("shrink-0 text-text-tertiary group-hover:text-text-secondary")
			})
		]
	});
}
function rn({ comment: e, context: t, actions: n, onAskAgent: r, renderReply: i, onReplyRequest: a, replyingToId: o = null, depth: s, onReply: c, mentionUsers: l, onResolveThread: u, onUnresolveThread: d }) {
	let [f, m] = L(!1), [h, g] = L(""), [v, y] = L(!1), b = I(null), x = I(null), [S, C] = L(Zt), [w, T] = L(!1), E = s === 0 && !!e.resolved, D = Math.min(s, 5), k = () => {
		if (S.active) return;
		let t = h.trim();
		t && (c(e.id, t), g(""), m(!1), C(Zt));
	}, ee = (e) => {
		let t = e.target.value;
		g(t);
		let n = Qt(t, e.target.selectionStart ?? t.length, b.current);
		C(n);
	}, A = N((e) => {
		let { newValue: t, newCursor: n } = $t(h, S, e);
		g(t), C(Zt), requestAnimationFrame(() => {
			let e = b.current;
			e && (e.focus(), e.setSelectionRange(n, n));
		});
	}, [h, S]), j = (e) => {
		S.active && x.current && x.current.handleKeyDown(e) || (e.key === "Enter" && !e.shiftKey && (e.preventDefault(), k()), e.key === "Escape" && m(!1));
	}, te = v ? e.color : s === 0 ? "var(--color-border)" : "var(--color-border-emphasis)", ne = (t) => /* @__PURE__ */ z(nn, {
		resolvedBy: e.resolvedBy,
		resolvedAt: e.resolvedAt,
		expanded: t,
		onToggle: () => T(!t),
		onReopen: d ? () => d(e.id) : void 0
	});
	return E && !w ? /* @__PURE__ */ z("div", {
		className: p(D > 0 ? "ml-5" : "ml-0"),
		children: ne(!1)
	}) : /* @__PURE__ */ B("div", {
		className: p(D > 0 ? "ml-5" : "ml-0", E ? "opacity-60" : ""),
		children: [
			E && w && ne(!0),
			/* @__PURE__ */ B("div", {
				className: p("px-3 py-2 mb-1 transition-colors duration-200"),
				style: { borderLeft: `3px solid ${te}` },
				onMouseEnter: () => y(!0),
				onMouseLeave: () => y(!1),
				children: [
					s === 0 && t && /* @__PURE__ */ z(en, { context: t }),
					/* @__PURE__ */ B("div", {
						className: p("flex items-center gap-1.5 mb-1"),
						children: [
							/* @__PURE__ */ z("div", {
								className: p("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold shrink-0"),
								style: { background: `linear-gradient(135deg, ${e.color}, ${e.color}dd)` },
								children: Kt(e.displayName)
							}),
							/* @__PURE__ */ z("span", {
								className: p("font-semibold text-[13px] text-text-primary"),
								children: e.displayName
							}),
							/* @__PURE__ */ z("span", {
								className: p("text-[11px] text-text-tertiary"),
								children: qt(e.timestamp)
							})
						]
					}),
					/* @__PURE__ */ z("div", {
						className: p("text-[13px] leading-normal text-text-primary pl-[30px] whitespace-pre-wrap"),
						children: Xt(e.text)
					}),
					/* @__PURE__ */ B("div", {
						className: p("pl-[30px] mt-1 flex gap-2"),
						children: [
							/* @__PURE__ */ z("button", {
								type: "button",
								onClick: () => {
									if (a) {
										a({
											commentId: e.id,
											depth: s,
											author: e.displayName,
											text: e.text
										});
										return;
									}
									m(!f), f || setTimeout(() => b.current?.focus(), 50);
								},
								...a ? { "aria-pressed": o === e.id } : {},
								"data-testid": `comment-reply-button-${e.id}`,
								className: p("bg-transparent border-none text-neutral text-xs cursor-pointer py-0.5 px-0 font-[inherit]", o === e.id && "font-semibold text-primary"),
								children: o === e.id ? "Replying…" : "Reply"
							}),
							s === 0 && !E && u && /* @__PURE__ */ B("button", {
								type: "button",
								onClick: () => u(e.id),
								className: p("bg-transparent border-none text-neutral text-xs cursor-pointer py-0.5 px-0 font-[inherit]"),
								children: ["✔", " Resolve"]
							}),
							s === 0 && !E && r && /* @__PURE__ */ B("button", {
								type: "button",
								onClick: () => r(e.id),
								title: "Hand this comment to the page's agent (⌥2)",
								"data-testid": `comment-ask-agent-${e.id}`,
								className: p("inline-flex items-center gap-1 bg-transparent border-none text-neutral text-xs cursor-pointer py-0.5 px-0 font-[inherit] hover:text-info-fg"),
								children: [/* @__PURE__ */ z(_, {
									size: 13,
									"aria-hidden": "true"
								}), " Ask agent"]
							}),
							s === 0 && n
						]
					}),
					f && i && /* @__PURE__ */ z("div", {
						className: p("pl-[30px] mt-2 animate-[sectionCommentsSlideDown_0.2s_ease-out]"),
						children: i({
							commentId: e.id,
							depth: s,
							submit: (t) => {
								let n = t.trim();
								n && c(e.id, n), m(!1);
							},
							close: () => m(!1)
						})
					}),
					f && !i && /* @__PURE__ */ B("div", {
						className: p("pl-[30px] mt-2 overflow-hidden animate-[sectionCommentsSlideDown_0.2s_ease-out]"),
						children: [/* @__PURE__ */ B("div", {
							className: p("relative"),
							children: [/* @__PURE__ */ z(O, {
								ref: b,
								value: h,
								onChange: ee,
								onKeyDown: j,
								placeholder: "Write a reply... (type @ to mention)",
								rows: 2,
								className: p("resize-y min-h-12")
							}), S.active && /* @__PURE__ */ z(Gt, {
								ref: x,
								query: S.query,
								users: l,
								position: S.position,
								onSelect: A,
								onDismiss: () => C(Zt)
							})]
						}), /* @__PURE__ */ B("div", {
							className: p("flex gap-1.5 mt-1.5"),
							children: [/* @__PURE__ */ z("button", {
								type: "button",
								onClick: k,
								className: p("px-3 py-1 text-xs font-semibold border-none rounded-md bg-info text-white cursor-pointer font-[inherit]"),
								children: "Reply"
							}), /* @__PURE__ */ z("button", {
								type: "button",
								onClick: () => m(!1),
								className: p("px-3 py-1 text-xs font-medium border border-border rounded-md bg-transparent text-neutral cursor-pointer font-[inherit]"),
								children: "Cancel"
							})]
						})]
					})
				]
			}),
			e.replies.map((e) => /* @__PURE__ */ z(rn, {
				comment: e,
				depth: s + 1,
				onReply: c,
				mentionUsers: l,
				onResolveThread: u,
				onUnresolveThread: d,
				...i ? { renderReply: i } : {},
				...a ? {
					onReplyRequest: a,
					replyingToId: o
				} : {}
			}, e.id))
		]
	});
}
//#endregion
//#region src/components/doc-editor/SectionComments.tsx
function an({ comments: e, onAddComment: t, participants: n = [], onResolveThread: i, onUnresolveThread: a }) {
	let [o, s] = L(!0), [c, l] = L(""), u = I(null), d = I(null), [f, m] = L(Zt), h = r(n), g = Jt(e), [_, v] = L(!0), y = [...e].sort((e, t) => {
		if (e.resolved && !t.resolved) return 1;
		if (!e.resolved && t.resolved) return -1;
		let n = new Date(e.timestamp).getTime(), r = new Date(t.timestamp).getTime();
		return _ ? r - n : n - r;
	}), b = () => {
		if (f.active) return;
		let e = c.trim();
		e && (t(e, null), l(""), m(Zt));
	}, x = (e) => {
		let t = e.target.value;
		l(t);
		let n = Qt(t, e.target.selectionStart ?? t.length, u.current);
		m(n);
	}, S = N((e) => {
		let { newValue: t, newCursor: n } = $t(c, f, e);
		l(t), m(Zt), requestAnimationFrame(() => {
			let e = u.current;
			e && (e.focus(), e.setSelectionRange(n, n));
		});
	}, [c, f]), C = (e) => {
		f.active && d.current && d.current.handleKeyDown(e) || e.key === "Enter" && !e.shiftKey && (e.preventDefault(), b());
	}, w = (e, n) => {
		t(n, e);
	};
	return /* @__PURE__ */ B("div", { children: [/* @__PURE__ */ B("button", {
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
	}), o && /* @__PURE__ */ B("div", {
		className: p("mt-2 border border-border rounded-lg bg-surface-panel overflow-hidden animate-[sectionCommentsSlideDown_0.2s_ease-out]"),
		children: [
			/* @__PURE__ */ B("div", {
				className: p("flex items-start gap-1.5 px-3 py-2.5 border-b border-border bg-surface"),
				children: [/* @__PURE__ */ B("div", {
					className: p("flex-1 relative"),
					children: [/* @__PURE__ */ z(O, {
						ref: u,
						value: c,
						onChange: x,
						onKeyDown: C,
						placeholder: "Add a comment... (type @ to mention)",
						rows: 2,
						className: p("resize-y min-h-12")
					}), f.active && /* @__PURE__ */ z(Gt, {
						ref: d,
						query: f.query,
						users: h,
						position: f.position,
						onSelect: S,
						onDismiss: () => m(Zt)
					})]
				}), /* @__PURE__ */ z("button", {
					type: "button",
					onClick: b,
					className: p("px-3.5 py-1.5 text-xs font-semibold border-none rounded-md bg-info text-white cursor-pointer font-[inherit] whitespace-nowrap self-end"),
					children: "Post"
				})]
			}),
			e.length > 1 && /* @__PURE__ */ z("div", {
				className: p("flex justify-end px-3 pt-1 border-b border-border-subtle"),
				children: /* @__PURE__ */ z("button", {
					type: "button",
					onClick: () => v((e) => !e),
					className: p("bg-transparent border-none cursor-pointer text-[11px] text-neutral px-1.5 py-0.5 font-[inherit]"),
					children: _ ? "↓ Newest first" : "↑ Oldest first"
				})
			}),
			/* @__PURE__ */ B("div", {
				className: p("max-h-[420px] overflow-y-auto px-3 py-2"),
				children: [e.length === 0 && /* @__PURE__ */ z("div", {
					className: p("p-3 text-center text-text-tertiary text-xs"),
					children: "No comments yet. Start the discussion!"
				}), y.map((e) => /* @__PURE__ */ z(rn, {
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
var on = {
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
}, sn = {
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
function cn(e) {
	return sn[e] ?? {
		label: String(e ?? "Unknown"),
		color: "var(--color-text-secondary)",
		bg: "var(--color-surface-hover)",
		icon: "•"
	};
}
function ln({ sections: e, participants: t, userId: n, getSectionFragment: r, ydoc: i, provider: a, sectionReviews: o, reviewSection: s, comments: c, onAddComment: l, onResolveThread: u, onUnresolveThread: d, onSectionFocus: f }) {
	let [m, h] = L({}), g = e.filter((e) => (o[e.id] ?? []).some((e) => e.userId === n)).length, _ = /* @__PURE__ */ new Map();
	for (let t of e) for (let e of o[t.id] ?? []) {
		let t = _.get(e.userId) ?? {
			displayName: e.displayName,
			statuses: []
		};
		t.statuses.push(e.status), _.set(e.userId, t);
	}
	let v = e.length > 0 ? Math.round(g / e.length * 100) : 0;
	return e.length === 0 ? /* @__PURE__ */ z("div", {
		className: p("text-center p-12 text-text-secondary text-[15px]"),
		children: "No sections to review."
	}) : /* @__PURE__ */ B("div", {
		"data-testid": "review-mode",
		className: p("max-w-[800px] mx-auto"),
		children: [
			/* @__PURE__ */ B("div", {
				"data-testid": "review-progress",
				className: p("mb-6"),
				children: [/* @__PURE__ */ B("div", {
					className: p("text-[13px] text-text-secondary mb-1 flex justify-between"),
					children: [/* @__PURE__ */ B("span", {
						"data-testid": "review-progress-text",
						children: [
							g,
							" of ",
							e.length,
							" sections reviewed by you"
						]
					}), /* @__PURE__ */ B("span", {
						"data-testid": "review-progress-pct",
						children: [v, "%"]
					})]
				}), /* @__PURE__ */ z("div", {
					className: p("h-2 bg-surface-emphasis rounded overflow-hidden"),
					children: /* @__PURE__ */ z("div", {
						className: p("h-full rounded transition-[width] duration-300 ease-in-out", g === e.length ? "bg-success" : "bg-info"),
						style: { width: `${v}%` }
					})
				})]
			}),
			/* @__PURE__ */ z("div", {
				className: p("flex flex-col gap-6"),
				children: e.map((e) => {
					let g = r(e.id), _ = on[e.type] ?? on.custom, v = o[e.id] ?? [], y = v.find((e) => e.userId === n), b = v.filter((e) => e.userId !== n), x = t.filter((t) => t.currentSectionId === e.id), S = m[e.id] ?? !1;
					return /* @__PURE__ */ B("div", {
						id: `section-${e.id}`,
						"data-testid": `review-section-${e.id}`,
						className: p("bg-surface border border-border rounded-lg p-5"),
						style: { borderLeft: y ? `3px solid ${cn(y.status).color}` : "3px solid #d1d5db" },
						onMouseEnter: () => f?.(e.id),
						children: [
							/* @__PURE__ */ B("div", {
								className: p("flex items-center gap-2 mb-1"),
								children: [/* @__PURE__ */ z("h3", {
									className: p("text-lg font-bold m-0 text-text-primary flex-1"),
									children: e.title
								}), /* @__PURE__ */ z("span", {
									className: p("inline-block text-[11px] font-semibold py-0.5 px-2.5 rounded-full"),
									style: {
										background: _.bg,
										color: _.text
									},
									children: e.sectionType ?? e.type
								})]
							}),
							g && /* @__PURE__ */ z("div", {
								className: p(e.items.length > 0 ? "mb-4" : "mb-2"),
								children: /* @__PURE__ */ z(re, {
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
							!g && e.items.length === 0 && /* @__PURE__ */ z("div", {
								className: p("py-4 text-text-tertiary text-sm text-center"),
								children: "This section has no content."
							}),
							e.items.length > 0 && /* @__PURE__ */ z("div", {
								className: p("mb-3"),
								children: e.items.map((e) => {
									let t = e.status === "acked" ? "var(--color-success)" : e.status === "rejected" ? "var(--color-danger)" : e.status === "done" ? "var(--color-neutral)" : "var(--color-text-tertiary)";
									return /* @__PURE__ */ B("div", {
										className: p("flex items-start gap-2 py-1.5 border-b border-border-subtle text-sm"),
										children: [
											/* @__PURE__ */ z("span", {
												className: p("inline-block w-2 h-2 rounded-full mt-[5px] shrink-0"),
												style: { background: t }
											}),
											/* @__PURE__ */ B("div", {
												className: p("flex-1"),
												children: [
													/* @__PURE__ */ z("span", {
														className: p("text-text-primary"),
														children: e.text
													}),
													e.assignee && /* @__PURE__ */ B("span", {
														className: p("text-text-secondary text-xs ml-2"),
														children: ["— ", e.assignee]
													}),
													e.priority && e.priority !== "medium" && /* @__PURE__ */ z("span", {
														className: p("text-[10px] font-semibold ml-1.5 px-1.5 py-px rounded", e.priority === "high" ? "bg-danger-bg text-danger-fg" : "bg-success-bg text-success-fg"),
														children: e.priority
													})
												]
											}),
											/* @__PURE__ */ z("span", {
												className: p("text-[11px] font-semibold capitalize shrink-0"),
												style: { color: t },
												children: e.status
											})
										]
									}, e.id);
								})
							}),
							/* @__PURE__ */ B("div", {
								className: p("flex items-center gap-2 pt-2.5 pb-1 border-t border-border-subtle flex-wrap"),
								children: [
									!y || S ? /* @__PURE__ */ B(R, { children: [
										/* @__PURE__ */ z(un, {
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
										/* @__PURE__ */ z(un, {
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
										/* @__PURE__ */ z(un, {
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
										S && /* @__PURE__ */ z("button", {
											"data-testid": `section-${e.id}-cancel-change`,
											onClick: () => h((t) => ({
												...t,
												[e.id]: !1
											})),
											className: p("bg-transparent border-none text-text-secondary text-xs cursor-pointer underline"),
											children: "Cancel"
										})
									] }) : /* @__PURE__ */ B(R, { children: [
										/* @__PURE__ */ B("span", {
											"data-testid": `section-${e.id}-status`,
											"data-status": y.status,
											className: p("inline-flex items-center gap-1 text-[13px] font-semibold py-1 px-2.5 rounded-md"),
											style: {
												background: cn(y.status).bg,
												color: cn(y.status).color
											},
											children: [/* @__PURE__ */ z("span", {
												className: p("text-sm"),
												children: cn(y.status).icon
											}), cn(y.status).label]
										}),
										/* @__PURE__ */ B("span", {
											className: p("text-xs text-text-secondary"),
											children: ["by you · ", new Date(y.timestamp).toLocaleString(void 0, {
												month: "short",
												day: "numeric",
												hour: "2-digit",
												minute: "2-digit"
											})]
										}),
										/* @__PURE__ */ z("button", {
											"data-testid": `section-${e.id}-change-review`,
											onClick: () => h((t) => ({
												...t,
												[e.id]: !0
											})),
											className: p("bg-transparent border-none text-info-fg text-xs cursor-pointer underline p-0"),
											children: "Change"
										})
									] }),
									b.length > 0 && /* @__PURE__ */ z("div", {
										className: p("flex gap-1 ml-auto items-center"),
										children: b.map((e) => {
											let t = cn(e.status), n = typeof e.displayName == "string" && e.displayName ? e.displayName : "?", r = n.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2);
											return /* @__PURE__ */ z("div", {
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
									x.length > 0 && /* @__PURE__ */ B("div", {
										className: p("flex gap-1 items-center"),
										style: { marginLeft: b.length > 0 ? 0 : "auto" },
										children: [/* @__PURE__ */ z("span", {
											className: p("text-[11px] text-text-tertiary"),
											children: "Viewing:"
										}), x.map((e) => /* @__PURE__ */ z("div", {
											title: e.displayName,
											className: p("w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-semibold"),
											style: { background: e.color },
											children: e.displayName.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2)
										}, e.clientId))]
									})
								]
							}),
							l && /* @__PURE__ */ z(an, {
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
			_.size > 0 && /* @__PURE__ */ B("div", {
				"data-testid": "review-summary",
				className: p("mt-8 p-4 px-5 bg-surface-panel border border-border rounded-lg"),
				children: [/* @__PURE__ */ z("h4", {
					className: p("m-0 mb-3 text-sm font-bold text-text-secondary"),
					children: "Document Review Summary"
				}), /* @__PURE__ */ z("div", {
					className: p("flex flex-col gap-2"),
					children: Array.from(_.entries()).map(([t, r]) => {
						let i = r.statuses.filter((e) => e === "approved").length, a = r.statuses.filter((e) => e === "changes_requested").length, o = r.statuses.filter((e) => e === "reviewed").length;
						return /* @__PURE__ */ B("div", {
							className: p("flex items-center gap-2.5 text-[13px]"),
							children: [
								/* @__PURE__ */ B("span", {
									className: p("font-semibold text-text-primary min-w-[100px]"),
									children: [r.displayName, t === n ? " (you)" : ""]
								}),
								/* @__PURE__ */ B("span", {
									className: p("text-text-secondary"),
									children: [
										r.statuses.length,
										" of ",
										e.length,
										" sections"
									]
								}),
								i > 0 && /* @__PURE__ */ B("span", {
									className: p("text-[11px] px-2 py-px rounded bg-success-bg text-success-fg font-semibold"),
									children: [i, " approved"]
								}),
								o > 0 && /* @__PURE__ */ B("span", {
									className: p("text-[11px] px-2 py-px rounded bg-surface-hover text-text-primary font-semibold"),
									children: [o, " reviewed"]
								}),
								a > 0 && /* @__PURE__ */ B("span", {
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
function un({ label: e, bg: t, color: n, hoverBg: r, onClick: i, testid: a }) {
	let [o, s] = L(!1);
	return /* @__PURE__ */ z("button", {
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
var dn = {
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
function fn(e) {
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
function pn(e) {
	let t = [], n = [], r = [];
	for (let i of e) i.status === "rejected" ? r.push(i) : i.status === "acked" || i.status === "done" ? n.push(i) : t.push(i);
	return {
		pending: t,
		completed: n,
		rejected: r
	};
}
function mn(e, t) {
	let { pending: n, completed: r, rejected: i } = pn(e), a = e.length, o = [];
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
function hn({ meta: e, participantCount: t }) {
	let n = dn[e.status] ?? dn.draft;
	return /* @__PURE__ */ B("div", {
		className: p("border-t-[3px] border-t-info rounded-t-lg pt-5 pb-4 px-6 mb-4 bg-gradient-to-b from-surface-panel to-white col-span-full"),
		children: [/* @__PURE__ */ B("div", {
			className: p("flex items-center gap-3 mb-1.5"),
			children: [/* @__PURE__ */ z("h1", {
				className: p("text-xl font-bold m-0 text-text-primary flex-1"),
				children: e.title || "Untitled Document"
			}), /* @__PURE__ */ z("span", {
				className: p("inline-block text-xs font-semibold py-[3px] px-3 rounded-full capitalize"),
				style: {
					background: n.bg,
					color: n.text
				},
				children: e.status
			})]
		}), /* @__PURE__ */ B("div", {
			className: p("text-xs text-neutral"),
			children: [
				e.createdBy && /* @__PURE__ */ B(R, { children: ["Created by ", e.createdByName || e.createdBy] }),
				e.createdAt && /* @__PURE__ */ B(R, { children: [" · ", fn(e.createdAt)] }),
				t > 0 && /* @__PURE__ */ B(R, { children: [
					" · ",
					t,
					" participant",
					t === 1 ? "" : "s"
				] })
			]
		})]
	});
}
function gn({ bullets: e, contentText: t, fragment: n, ydoc: r, provider: i }) {
	let a = n && r, o = t && t.trim().length > 0;
	return /* @__PURE__ */ B("div", {
		className: p("bg-surface border border-border rounded-lg p-4 mb-4"),
		children: [
			/* @__PURE__ */ z("h2", {
				className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
				children: "Executive Summary"
			}),
			a ? /* @__PURE__ */ z("div", {
				className: p("py-1 px-3 bg-surface-panel rounded-md border-l-[3px] border-l-accent", e.length > 0 ? "mb-3" : ""),
				children: /* @__PURE__ */ z(re, {
					fragment: n,
					ydoc: r,
					provider: i ?? null,
					user: {
						name: "",
						color: ""
					},
					editable: !1
				})
			}) : o ? /* @__PURE__ */ z("div", {
				className: p("text-sm text-text-primary leading-relaxed whitespace-pre-wrap py-2 px-3 bg-surface-panel rounded-md border-l-[3px] border-l-accent", e.length > 0 ? "mb-3" : ""),
				children: t.trim()
			}) : null,
			/* @__PURE__ */ z("ul", {
				className: p("m-0 pl-[18px] text-[13px] text-text-primary leading-relaxed"),
				children: e.map((e, t) => /* @__PURE__ */ z("li", { children: e }, t))
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/ReaderSectionCard.tsx
var _n = {
	pending: "var(--color-warning)",
	done: "var(--color-success)",
	acked: "var(--color-success)",
	rejected: "var(--color-danger)"
}, vn = {
	high: "var(--color-danger)",
	medium: "var(--color-warning)",
	low: "var(--color-neutral)"
};
function yn(e) {
	switch (e) {
		case "acked":
		case "done": return "✅";
		case "rejected": return "❌";
		default: return "⬜";
	}
}
function bn(e) {
	let t = [], n = [], r = [];
	for (let i of e) i.status === "rejected" ? r.push(i) : i.status === "acked" || i.status === "done" ? n.push(i) : t.push(i);
	return {
		pending: t,
		completed: n,
		rejected: r
	};
}
function xn({ label: e, count: t, color: n, defaultOpen: r, children: i }) {
	let [a, o] = L(r);
	return /* @__PURE__ */ B("div", {
		className: p("mb-2"),
		children: [/* @__PURE__ */ B("button", {
			onClick: () => o(!a),
			className: p("bg-transparent border-none cursor-pointer flex items-center gap-1.5 py-1 px-0 text-[13px] font-semibold text-text-primary font-[inherit] w-full"),
			children: [
				/* @__PURE__ */ z("span", {
					className: p("inline-block text-[10px] transition-transform duration-150 ease-in-out", a ? "rotate-90" : "rotate-0"),
					children: "▶"
				}),
				/* @__PURE__ */ z("span", {
					style: { color: n },
					children: e
				}),
				/* @__PURE__ */ z("span", {
					className: p("text-[11px] px-2 py-px rounded-full font-semibold"),
					style: {
						background: `${n}18`,
						color: n
					},
					children: t
				})
			]
		}), a && /* @__PURE__ */ z("div", {
			className: p("pl-4 mt-1"),
			children: i
		})]
	});
}
function Sn({ item: e, variant: t }) {
	let n = t === "pending" ? _n.pending : t === "completed" ? _n.done : _n.rejected;
	return /* @__PURE__ */ B("div", {
		className: p("flex items-center gap-2 py-[5px] px-2 mb-1 rounded-r", t === "pending" ? "bg-warning-bg" : "bg-surface"),
		style: { borderLeft: `3px solid ${n}` },
		children: [
			/* @__PURE__ */ z("span", {
				className: p("text-[13px] flex-1"),
				children: /* @__PURE__ */ z("span", {
					className: p(t === "completed" ? "line-through text-text-tertiary" : "text-text-primary"),
					children: e.text
				})
			}),
			e.priority && /* @__PURE__ */ z("span", {
				className: p("text-[10px] font-semibold px-1.5 py-px rounded-full uppercase shrink-0"),
				style: {
					background: `${vn[e.priority]}18`,
					color: vn[e.priority]
				},
				children: e.priority
			}),
			e.ackedBy && /* @__PURE__ */ z("span", {
				className: p("text-[11px] text-text-tertiary shrink-0"),
				children: e.ackedBy
			})
		]
	});
}
function Cn({ sections: e }) {
	let t = e.filter((e) => e.type === "decisions").flatMap((e) => e.items);
	return /* @__PURE__ */ B("div", {
		className: p("bg-surface border border-border rounded-lg p-4 mb-4"),
		children: [/* @__PURE__ */ z("h2", {
			className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
			children: "Key Decisions"
		}), t.length === 0 ? /* @__PURE__ */ z("div", {
			className: p("text-[13px] text-text-tertiary italic"),
			children: "No decisions recorded"
		}) : /* @__PURE__ */ z("div", {
			className: p("flex flex-col gap-1.5"),
			children: t.map((e) => /* @__PURE__ */ B("div", {
				className: p("flex items-start gap-2 text-[13px] text-text-primary"),
				children: [/* @__PURE__ */ z("span", {
					className: p("shrink-0"),
					children: yn(e.status)
				}), /* @__PURE__ */ z("span", { children: e.text })]
			}, e.id))
		})]
	});
}
function wn({ allItems: e }) {
	let { pending: t, completed: n, rejected: r } = bn(e);
	return /* @__PURE__ */ B("div", {
		className: p("bg-surface border border-border rounded-lg p-4 mb-4"),
		children: [/* @__PURE__ */ z("h2", {
			className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
			children: "Action Items"
		}), e.length === 0 ? /* @__PURE__ */ z("div", {
			className: p("text-[13px] text-text-tertiary italic"),
			children: "No action items yet"
		}) : /* @__PURE__ */ B(R, { children: [
			t.length > 0 && /* @__PURE__ */ z(xn, {
				label: "Pending",
				count: t.length,
				color: _n.pending,
				defaultOpen: !0,
				children: t.map((e) => /* @__PURE__ */ z(Sn, {
					item: e,
					variant: "pending"
				}, e.id))
			}),
			n.length > 0 && /* @__PURE__ */ z(xn, {
				label: "Completed",
				count: n.length,
				color: _n.done,
				defaultOpen: !1,
				children: n.map((e) => /* @__PURE__ */ z(Sn, {
					item: e,
					variant: "completed"
				}, e.id))
			}),
			r.length > 0 && /* @__PURE__ */ z(xn, {
				label: "Rejected",
				count: r.length,
				color: _n.rejected,
				defaultOpen: !1,
				children: r.map((e) => /* @__PURE__ */ z(Sn, {
					item: e,
					variant: "rejected"
				}, e.id))
			})
		] })]
	});
}
function Tn({ sections: e, commentCounts: t, sectionContentTexts: n, comments: r, getSectionFragment: i, ydoc: a, provider: o }) {
	let [s, c] = L({}), l = (e) => c((t) => ({
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
	return /* @__PURE__ */ B("div", {
		className: p("bg-surface border border-border rounded-lg p-4 mb-4"),
		children: [/* @__PURE__ */ z("h2", {
			className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
			children: "Section Summaries"
		}), e.length === 0 ? /* @__PURE__ */ z("div", {
			className: p("text-[13px] text-text-tertiary italic"),
			children: "No sections"
		}) : /* @__PURE__ */ z("div", {
			className: p("flex flex-col gap-0.5"),
			children: e.map((e) => {
				let c = e.items.filter((e) => e.status === "acked" || e.status === "done").length, d = e.items.length, f = t?.[e.id] ?? 0, m = n?.[e.id] ?? "", h = r?.[e.id] ?? [], g = !!s[e.id], _ = m.trim().length > 0, v = u[e.type] ?? u.custom;
				return /* @__PURE__ */ B("div", {
					id: `section-${e.id}`,
					"data-testid": `reader-section-${e.id}`,
					children: [/* @__PURE__ */ B("button", {
						onClick: () => l(e.id),
						className: p("border-none cursor-pointer flex items-center gap-2 py-2 px-1.5 rounded-md w-full font-[inherit] text-[13px] text-text-primary transition-colors duration-100", g ? "bg-surface-panel" : "bg-transparent"),
						children: [
							/* @__PURE__ */ z("span", {
								className: p("text-[10px] transition-transform duration-150 ease-in-out shrink-0", g ? "rotate-90" : "rotate-0"),
								children: "▶"
							}),
							/* @__PURE__ */ z("span", {
								className: p("font-semibold flex-1 text-left"),
								children: e.title
							}),
							/* @__PURE__ */ z("span", {
								className: p("text-[10px] font-semibold px-2 py-px rounded-full capitalize shrink-0"),
								style: {
									background: v.bg,
									color: v.text
								},
								children: e.type
							}),
							d > 0 && /* @__PURE__ */ B("span", {
								className: p("text-[11px] text-neutral shrink-0"),
								children: [
									c,
									"/",
									d,
									" done"
								]
							}),
							f > 0 && /* @__PURE__ */ B("span", {
								className: p("text-[11px] text-neutral shrink-0"),
								children: [
									f,
									" comment",
									f === 1 ? "" : "s"
								]
							})
						]
					}), g && /* @__PURE__ */ B("div", {
						className: p("pl-6 pb-2"),
						children: [
							(() => {
								let t = i?.(e.id);
								return t && a ? /* @__PURE__ */ z("div", {
									className: p("py-1 px-2.5 bg-surface-panel rounded border-l-2 border-l-border-emphasis", e.items.length > 0 ? "mb-2" : ""),
									children: /* @__PURE__ */ z(re, {
										fragment: t,
										ydoc: a,
										provider: o ?? null,
										user: {
											name: "",
											color: ""
										},
										editable: !1
									})
								}) : _ ? /* @__PURE__ */ z("div", {
									className: p("text-[13px] text-text-primary leading-relaxed whitespace-pre-wrap py-2 px-2.5 bg-surface-panel rounded border-l-2 border-l-border-emphasis", e.items.length > 0 ? "mb-2" : ""),
									children: m.trim()
								}) : null;
							})(),
							e.items.map((e) => /* @__PURE__ */ B("div", {
								className: p("flex items-center gap-1.5 py-[3px] text-xs text-neutral"),
								children: [/* @__PURE__ */ z("span", {
									className: p("shrink-0"),
									children: yn(e.status)
								}), /* @__PURE__ */ z("span", {
									className: p(e.status === "acked" || e.status === "done" ? "line-through" : ""),
									children: e.text
								})]
							}, e.id)),
							h.length > 0 && /* @__PURE__ */ B("div", {
								className: p("mt-2 pt-1.5 border-t border-border-subtle"),
								children: [
									/* @__PURE__ */ B("div", {
										className: p("text-[11px] font-semibold text-text-tertiary mb-1"),
										children: [
											"Comments (",
											f,
											")"
										]
									}),
									h.slice(0, 3).map((e) => /* @__PURE__ */ B("div", {
										className: p("text-xs text-neutral py-0.5 flex gap-1.5"),
										children: [/* @__PURE__ */ B("span", {
											className: p("font-semibold text-text-secondary shrink-0"),
											children: [e.displayName, ":"]
										}), /* @__PURE__ */ z("span", {
											className: p("overflow-hidden text-ellipsis whitespace-nowrap"),
											children: e.text
										})]
									}, e.id)),
									h.length > 3 && /* @__PURE__ */ B("div", {
										className: p("text-[11px] text-text-tertiary mt-0.5"),
										children: [
											"+",
											h.length - 3,
											" more"
										]
									})
								]
							}),
							!_ && e.items.length === 0 && h.length === 0 && /* @__PURE__ */ z("div", {
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
function En(e) {
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
function Dn(e) {
	return e >= 75 ? "var(--color-success)" : e >= 25 ? "var(--color-warning)" : "var(--color-danger)";
}
var On = {
	editor: "var(--color-success)",
	reviewer: "var(--color-warning)",
	reader: "var(--color-text-tertiary)"
}, kn = {
	editor: "editing",
	reviewer: "reviewing",
	reader: "reading"
};
function An({ sections: e }) {
	let t = (e, t) => {
		e.preventDefault();
		let n = document.getElementById(`section-${t}`);
		n && n.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};
	return /* @__PURE__ */ B("aside", {
		"data-testid": "reader-toc",
		className: p("sticky top-4 self-start bg-surface border border-border rounded-lg p-4 mb-3"),
		children: [/* @__PURE__ */ z("h3", {
			className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
			children: "Contents"
		}), /* @__PURE__ */ z("nav", { children: /* @__PURE__ */ z("ol", {
			className: p("list-none m-0 p-0 flex flex-col gap-1"),
			children: e.map((e, n) => /* @__PURE__ */ z("li", { children: /* @__PURE__ */ B("a", {
				href: `#section-${e.id}`,
				"data-testid": `toc-link-${e.id}`,
				onClick: (n) => t(n, e.id),
				className: p("block py-1 px-1.5 text-[13px] text-text-secondary no-underline rounded border-l-2 border-l-transparent transition-colors duration-75 hover:bg-surface-hover hover:border-l-primary"),
				children: [
					/* @__PURE__ */ B("span", {
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
function jn({ reviewed: e, total: t }) {
	let n = t > 0 ? Math.round(e / t * 100) : 0, r = Dn(n);
	return /* @__PURE__ */ B("div", {
		className: p("bg-surface border border-border rounded-lg p-4 mb-3"),
		children: [
			/* @__PURE__ */ z("h3", {
				className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
				children: "Progress"
			}),
			/* @__PURE__ */ z("div", {
				className: p("flex items-baseline gap-1 mb-2"),
				children: /* @__PURE__ */ B("span", {
					className: p("text-[28px] font-bold leading-none"),
					style: { color: r },
					children: [n, "%"]
				})
			}),
			/* @__PURE__ */ z("div", {
				className: p("h-2 bg-surface-emphasis rounded overflow-hidden mb-1.5"),
				children: /* @__PURE__ */ z("div", {
					className: p("h-full rounded transition-[width] duration-300 ease-in-out"),
					style: {
						width: `${n}%`,
						background: r
					}
				})
			}),
			/* @__PURE__ */ B("div", {
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
function Mn({ participants: e, meta: t }) {
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
	}), /* @__PURE__ */ B("div", {
		className: p("bg-surface border border-border rounded-lg p-4 mb-3"),
		children: [
			/* @__PURE__ */ z("h3", {
				className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
				children: "Contributors"
			}),
			/* @__PURE__ */ z("div", {
				className: p("flex flex-wrap gap-1.5 mb-3"),
				children: r.map((e, t) => {
					let n = e.name.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
					return /* @__PURE__ */ B("div", {
						title: `${e.name}${e.mode ? ` (${kn[e.mode] ?? e.mode})` : ""}`,
						className: p("relative"),
						children: [/* @__PURE__ */ z("div", {
							className: p("w-8 h-8 rounded-full text-white flex items-center justify-center text-[11px] font-bold"),
							style: { background: e.color },
							children: n
						}), e.isOnline && /* @__PURE__ */ z("div", {
							className: p("absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white"),
							style: { background: On[e.mode ?? "reader"] ?? "var(--color-text-tertiary)" }
						})]
					}, `${e.name}-${t}`);
				})
			}),
			/* @__PURE__ */ z("div", {
				className: p("flex flex-col gap-1.5"),
				children: r.map((e, t) => /* @__PURE__ */ B("div", {
					className: p("flex items-center gap-2 text-[13px]"),
					children: [
						/* @__PURE__ */ z("span", {
							className: p("w-2 h-2 rounded-full shrink-0"),
							style: { background: e.isOnline ? On[e.mode ?? "reader"] ?? "var(--color-text-tertiary)" : "var(--color-border-field)" }
						}),
						/* @__PURE__ */ z("span", {
							className: p("font-medium text-text-primary flex-1"),
							children: e.name
						}),
						/* @__PURE__ */ z("span", {
							className: p("text-[11px] text-text-tertiary"),
							children: e.isOnline ? kn[e.mode ?? ""] ?? "online" : "offline"
						})
					]
				}, `detail-${e.name}-${t}`))
			})
		]
	});
}
function Nn({ sections: e, allItems: t, completedCount: n, commentCounts: r, meta: i }) {
	let a = r ? Object.values(r).reduce((e, t) => e + t, 0) : 0;
	return /* @__PURE__ */ B("div", {
		className: p("bg-surface border border-border rounded-lg p-4 mb-3"),
		children: [
			/* @__PURE__ */ z("h3", {
				className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
				children: "Document Info"
			}),
			/* @__PURE__ */ B("div", {
				className: p("flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle"),
				children: [/* @__PURE__ */ z("span", {
					className: p("text-neutral"),
					children: "Sections"
				}), /* @__PURE__ */ z("span", {
					className: p("font-semibold"),
					children: e.length
				})]
			}),
			/* @__PURE__ */ B("div", {
				className: p("flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle"),
				children: [/* @__PURE__ */ z("span", {
					className: p("text-neutral"),
					children: "Total tasks"
				}), /* @__PURE__ */ z("span", {
					className: p("font-semibold"),
					children: t.length
				})]
			}),
			/* @__PURE__ */ B("div", {
				className: p("flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle"),
				children: [/* @__PURE__ */ z("span", {
					className: p("text-neutral"),
					children: "Completed"
				}), /* @__PURE__ */ z("span", {
					className: p("font-semibold text-success-fg"),
					children: n
				})]
			}),
			a > 0 && /* @__PURE__ */ B("div", {
				className: p("flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle"),
				children: [/* @__PURE__ */ z("span", {
					className: p("text-neutral"),
					children: "Comments"
				}), /* @__PURE__ */ z("span", {
					className: p("font-semibold"),
					children: a
				})]
			}),
			i.createdAt && /* @__PURE__ */ B("div", {
				className: p("flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle"),
				children: [/* @__PURE__ */ z("span", {
					className: p("text-neutral"),
					children: "Created"
				}), /* @__PURE__ */ z("span", {
					className: p("font-medium text-xs"),
					children: En(i.createdAt)
				})]
			}),
			i.updatedAt && /* @__PURE__ */ B("div", {
				className: p("flex justify-between py-1 text-[13px] text-text-primary"),
				children: [/* @__PURE__ */ z("span", {
					className: p("text-neutral"),
					children: "Last changed"
				}), /* @__PURE__ */ z("span", {
					className: p("font-medium text-xs"),
					children: En(i.updatedAt)
				})]
			})
		]
	});
}
function Pn({ sections: e, participants: t, meta: n, commentCounts: r, sectionContentTexts: i, comments: a, getSectionFragment: o, ydoc: s, provider: c }) {
	let l = e.flatMap((e) => e.items), u = l.filter((e) => e.status !== "pending").length, d = l.filter((e) => e.status === "acked" || e.status === "done").length, f = mn(l, e), m = e.length >= 2;
	return /* @__PURE__ */ B("div", {
		className: p("grid gap-4 mx-auto", m ? "[grid-template-columns:200px_1fr_280px] max-w-[1300px]" : "[grid-template-columns:1fr_280px] max-w-[1100px]"),
		children: [
			/* @__PURE__ */ z(hn, {
				meta: n,
				participantCount: t.length
			}),
			m && /* @__PURE__ */ z(An, { sections: e }),
			/* @__PURE__ */ B("div", { children: [
				/* @__PURE__ */ z(gn, {
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
				/* @__PURE__ */ z(Cn, { sections: e }),
				/* @__PURE__ */ z(wn, { allItems: l }),
				/* @__PURE__ */ z(Tn, {
					sections: e,
					commentCounts: r,
					sectionContentTexts: i,
					comments: a,
					getSectionFragment: o,
					ydoc: s,
					provider: c
				})
			] }),
			/* @__PURE__ */ B("div", { children: [
				/* @__PURE__ */ z(jn, {
					reviewed: u,
					total: l.length
				}),
				/* @__PURE__ */ z(Mn, {
					participants: t,
					meta: n
				}),
				/* @__PURE__ */ z(Nn, {
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
function Fn({ mode: e, isEmpty: t, isCanvas: n = !1, isFinalized: r, sections: i, documentId: a, displayName: o, color: s, userId: c, ydoc: l, provider: u, getSectionFragment: d, updateSection: f, participants: m, focusedSectionId: h, onSectionFocus: g, comments: _, onAddComment: v, onResolveThread: y, onUnresolveThread: b, onUpdateCursorInfo: x, onOpenComments: S, onAddItem: C, onUpdateItem: w, onRemoveItem: T, restItems: E, itemErrors: D, commentSidebarOpen: O, commentSectionId: k, commentSidebarTop: ee, sectionListRef: A, onCloseComments: j, showVideoCall: te, isVideoDocked: ne, showInlineVideo: re, sidebarFixed: ie, videoSpacerRef: ae, videoLeft: M, FIXED_TOP: N, showTOC: P, sectionReviews: F, reviewSection: oe, headerMeta: I, onLoadDemo: L, activityPublish: se }) {
	let V = Object.keys(D ?? {}).map((e) => i.find((t) => t.id === e)?.title || e);
	return /* @__PURE__ */ B(R, { children: [
		V.length > 0 && /* @__PURE__ */ B("div", {
			role: "alert",
			"data-testid": "item-load-error-banner",
			className: p("rounded-lg border px-4 py-2.5 mb-3 text-[13px]", "bg-warning-bg border-warning-border text-warning-fg"),
			children: [
				"Action items could not be loaded for",
				" ",
				V.length === 1 ? `"${V[0]}"` : `${V.length} sections: ${V.map((e) => `"${e}"`).join(", ")}`,
				". These sections may have items that are not shown."
			]
		}),
		r && e === "editor" && /* @__PURE__ */ z("div", {
			className: p("rounded-lg border px-4 py-2.5 mb-3 text-center text-[13px] font-medium", "bg-warning-bg border-warning-border text-warning-fg"),
			children: "This document has been finalized and is read-only"
		}),
		n && /* @__PURE__ */ B("div", {
			"data-testid": "canvas-not-section-routable",
			className: "text-center py-12 px-4 text-text-secondary",
			children: [/* @__PURE__ */ z("p", {
				className: "text-[15px] mb-1",
				children: "This is a page document."
			}), /* @__PURE__ */ z("p", {
				className: "text-[13px] text-text-tertiary",
				children: "Section, review and reader views describe a sectioned document. Render a page with CanvasDocumentView."
			})]
		}),
		!n && t && /* @__PURE__ */ B("div", {
			className: "text-center py-12 px-4 text-text-secondary",
			children: [
				/* @__PURE__ */ z("p", {
					className: "text-lg mb-4",
					children: "No document content yet."
				}),
				/* @__PURE__ */ z("button", {
					onClick: L,
					className: p("px-6 py-2.5 text-[15px] font-semibold border-none rounded-lg", "bg-primary text-on-primary cursor-pointer font-[inherit]"),
					children: "Load Demo Document"
				}),
				/* @__PURE__ */ z("p", {
					className: "text-[13px] mt-3 text-text-tertiary",
					children: "Loads a sample Q2 Sprint Planning document with tasks, decisions, and notes."
				})
			]
		}),
		!n && !t && e === "editor" && l && /* @__PURE__ */ B("div", {
			ref: A,
			className: "flex gap-4 relative min-w-0",
			children: [
				te && !ne && re && /* @__PURE__ */ z("div", {
					ref: ae,
					className: "w-[240px] shrink-0",
					children: /* @__PURE__ */ z("div", {
						id: "inline-video-slot",
						className: p(ie && "fixed z-30"),
						style: ie ? {
							top: N,
							left: M,
							width: 240
						} : void 0
					})
				}),
				/* @__PURE__ */ B("div", {
					className: p("flex-1 min-w-0", O ? "pr-0" : P && i.length > 1 && e === "editor" ? "pr-48" : "pr-12"),
					children: [/* @__PURE__ */ z(It, {
						sections: i.map((e) => {
							let t = e.items ?? [], n = E[e.id] ?? [], r = [...t, ...n.filter((e) => !t.some((t) => t.id === e.id))];
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
					}), /* @__PURE__ */ z(Ut, {
						documentId: a,
						editable: !r
					})]
				}),
				O && k && /* @__PURE__ */ B("div", {
					className: p("w-[420px] shrink-0 rounded-lg border border-border", "bg-surface-inset flex flex-col max-h-[calc(100vh-180px)] overflow-hidden"),
					style: { marginTop: ee },
					children: [/* @__PURE__ */ B("div", {
						className: "flex items-center justify-between px-3.5 py-3 border-b border-border shrink-0",
						children: [/* @__PURE__ */ z("div", {
							className: "text-[13px] font-semibold text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap flex-1 mr-2",
							children: i.find((e) => e.id === k)?.title ?? "Comments"
						}), /* @__PURE__ */ z("button", {
							type: "button",
							onClick: j,
							className: p("border-none bg-transparent cursor-pointer", "text-base text-neutral px-1.5 py-0.5 rounded leading-none shrink-0"),
							title: "Close comments",
							children: "✕"
						})]
					}), /* @__PURE__ */ z("div", {
						className: "flex-1 overflow-y-auto px-3 py-3.5",
						children: /* @__PURE__ */ z(an, {
							comments: _[k] ?? [],
							onAddComment: (e, t) => v(k, e, t),
							participants: m,
							onResolveThread: (e) => y(k, e),
							onUnresolveThread: (e) => b(k, e)
						})
					})]
				})
			]
		}),
		!n && !t && e === "ack" && l && /* @__PURE__ */ z(ln, {
			sections: i,
			participants: m,
			userId: c,
			getSectionFragment: d,
			ydoc: l,
			provider: u,
			sectionReviews: F,
			reviewSection: (e, t, n) => {
				oe(e, t, n);
				let r = i.find((t) => t.id === e);
				se(`doc.review_${t}`, {
					sectionTitle: r?.title,
					status: t,
					documentId: a,
					documentTitle: I?.title
				});
			},
			comments: _,
			onAddComment: v,
			onResolveThread: y,
			onUnresolveThread: b,
			onSectionFocus: g
		}),
		!n && !t && e === "reader" && l && /* @__PURE__ */ z(Pn, {
			sections: i,
			participants: m,
			meta: I,
			commentCounts: Object.fromEntries(Object.entries(_).map(([e, t]) => [e, Jt(t)])),
			sectionContentTexts: Object.fromEntries(i.map((e) => {
				let t = d(e.id);
				return [e.id, t ? Fe(t) : ""];
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
function In(e, t) {
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
function Ln(e, t) {
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
			let n = t.title !== e.title, r = (t.textContent || "") !== (e.textContent || ""), a = In(t.items, e.items), o = n || r || a.some((e) => e.status !== "unchanged");
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
var Rn = {
	added: "bg-success-bg border-success-border",
	removed: "bg-danger-bg border-danger-border",
	modified: "bg-warning-bg border-warning-border",
	unchanged: "bg-transparent border-border"
};
function zn(e) {
	return e === "added" ? "text-success-fg bg-success-bg" : e === "removed" ? "text-danger-fg bg-danger-bg" : e === "modified" ? "text-warning-fg bg-warning-border" : "text-text-secondary bg-surface-hover";
}
function Bn(e) {
	return e === "added" ? "bg-success-bg text-success-fg" : e === "removed" ? "bg-danger-bg text-danger-fg line-through" : e === "modified" ? "bg-warning-bg text-warning-fg" : "bg-transparent text-text-primary";
}
function Vn({ oldSections: e, newSections: t, onClose: n }) {
	let r = Ln(e, t), i = r.some((e) => e.status !== "unchanged");
	return /* @__PURE__ */ B("div", {
		className: p("border-t border-border bg-surface-inset max-h-[400px] overflow-auto px-4 py-3"),
		children: [
			/* @__PURE__ */ B("div", {
				className: p("flex items-center justify-between mb-2"),
				children: [/* @__PURE__ */ z("h4", {
					className: p("text-[13px] font-semibold text-text-primary m-0"),
					children: "Changes from selected version to current"
				}), /* @__PURE__ */ z("button", {
					type: "button",
					className: p("px-2 py-0.5 text-xs border border-border-field rounded bg-surface text-text-secondary cursor-pointer font-[inherit]"),
					onClick: n,
					children: "Dismiss"
				})]
			}),
			!i && /* @__PURE__ */ z("div", {
				className: p("text-[13px] text-text-tertiary text-center p-4"),
				children: "No differences found. The documents are identical."
			}),
			r.filter((e) => e.status !== "unchanged").map((e) => /* @__PURE__ */ B("div", {
				className: p("border rounded-md p-2 px-2.5 mb-1.5", Rn[e.status]),
				children: [
					/* @__PURE__ */ B("div", {
						className: p("flex items-center gap-2 mb-1"),
						children: [
							/* @__PURE__ */ z("span", {
								className: p("text-[10px] font-semibold uppercase px-1.5 py-px rounded-sm", zn(e.status)),
								children: e.status
							}),
							/* @__PURE__ */ z("span", {
								className: p("text-[13px] font-semibold text-text-primary"),
								children: e.status === "removed" ? e.oldTitle : e.newTitle ?? e.oldTitle
							}),
							e.titleChanged && /* @__PURE__ */ B("span", {
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
						return /* @__PURE__ */ B("div", { children: [/* @__PURE__ */ B("div", {
							className: p("text-xs px-2 py-0.5 rounded-sm mt-0.5", Bn(e.status)),
							children: [
								e.status === "added" && "+ ",
								e.status === "removed" && "- ",
								e.status === "modified" && "~ ",
								n?.text ?? "(untitled)",
								n?.assignee ? ` [${n.assignee}]` : ""
							]
						}), e.changes.length > 0 && /* @__PURE__ */ z("div", {
							className: p("text-[11px] text-warning-fg ml-4 italic"),
							children: e.changes.join(", ")
						})] }, n?.id ?? t);
					}),
					e.textChanged && /* @__PURE__ */ B("div", {
						className: p("mt-1 text-xs"),
						children: [e.oldTextContent && /* @__PURE__ */ B("div", {
							className: p("px-2 py-1 rounded-sm bg-danger-bg text-danger-fg line-through mb-0.5"),
							children: [e.oldTextContent.substring(0, 200), (e.oldTextContent?.length ?? 0) > 200 ? "..." : ""]
						}), e.newTextContent && /* @__PURE__ */ B("div", {
							className: p("px-2 py-1 rounded-sm bg-success-bg text-success-fg"),
							children: [e.newTextContent.substring(0, 200), (e.newTextContent?.length ?? 0) > 200 ? "..." : ""]
						})]
					}),
					e.status === "modified" && !e.textChanged && e.itemDiffs.every((e) => e.status === "unchanged") && e.titleChanged && /* @__PURE__ */ z("div", {
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
function Hn(e) {
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
function Un({ versions: e, loading: t, previewTimestamp: n, onFetch: r, onPreview: i, onClearPreview: a, onClose: o, onSaveVersion: s, onCompare: c, onClearCompare: l, compareSections: u, compareTimestamp: d, currentSections: f, onRestore: m }) {
	let h = () => {
		a(), l(), o();
	}, g = () => {
		let e = window.prompt("Enter a name for this version:");
		e && e.trim() && s?.(e.trim());
	}, _ = (e, t) => {
		e.stopPropagation(), d === t ? l() : c?.(t);
	}, v = (e) => e.type === "pre-restore" ? "Before restore" : e.type === "auto" ? "Auto-save" : "";
	return /* @__PURE__ */ B(yt, {
		width: 320,
		children: [
			/* @__PURE__ */ z(bt, {
				title: "Version History",
				onClose: h,
				actions: s ? /* @__PURE__ */ z(wt, {
					size: "sm",
					onClick: g,
					children: "Save Version"
				}) : void 0
			}),
			/* @__PURE__ */ B(xt, {
				padding: "0.5rem 0",
				children: [
					t && /* @__PURE__ */ z("div", {
						className: p("py-8 px-4 text-center text-text-tertiary text-[13px]"),
						children: "Loading..."
					}),
					!t && e.length === 0 && /* @__PURE__ */ z("div", {
						className: p("py-8 px-4 text-center text-text-tertiary text-[13px]"),
						children: "No saved versions yet"
					}),
					!t && e.map((e) => /* @__PURE__ */ B("div", {
						role: "button",
						tabIndex: 0,
						className: p("flex items-center justify-between py-2.5 px-4 cursor-pointer text-[13px] text-text-primary", n === e.timestamp ? "bg-info-bg border-l-[3px] border-l-info" : "bg-transparent border-l-[3px] border-l-transparent"),
						onClick: () => i(e.timestamp),
						onKeyDown: j(() => i(e.timestamp)),
						children: [/* @__PURE__ */ B("div", {
							className: p("flex-1 min-w-0"),
							children: [
								e.name && /* @__PURE__ */ z("span", {
									className: p("text-xs font-semibold text-text-primary block mb-px"),
									children: e.name
								}),
								/* @__PURE__ */ B("span", {
									className: p("flex items-center gap-1"),
									children: [Hn(e.age), e.type && e.type !== "manual" && /* @__PURE__ */ z("span", {
										className: p("text-[10px] font-medium px-[5px] py-px rounded-[3px] ml-1.5", e.type === "pre-restore" ? "bg-warning-bg text-warning-fg" : e.type === "auto" ? "bg-surface-hover text-text-tertiary" : "bg-info-bg text-info-fg"),
										children: v(e)
									})]
								}),
								e.author && /* @__PURE__ */ B("span", {
									className: p("text-[10px] text-text-tertiary block"),
									children: ["by ", e.author]
								}),
								/* @__PURE__ */ z("span", {
									className: p("text-[11px] text-text-tertiary"),
									children: new Date(e.timestamp).toLocaleString()
								})
							]
						}), c && /* @__PURE__ */ z("button", {
							type: "button",
							className: p("px-2 py-[3px] text-[11px] font-medium border rounded-[4px] cursor-pointer font-[inherit] whitespace-nowrap", d === e.timestamp ? "bg-info-bg border-info text-info-fg" : "bg-surface border-border text-text-secondary"),
							onClick: (t) => _(t, e.timestamp),
							children: d === e.timestamp ? "Hide Diff" : "Compare"
						})]
					}, e.timestamp))
				]
			}),
			u != null && /* @__PURE__ */ z(Vn, {
				oldSections: u,
				newSections: f,
				onClose: l
			}),
			m && d != null && /* @__PURE__ */ B("div", {
				className: p("py-3 px-4 border-t border-border shrink-0"),
				children: [/* @__PURE__ */ z(wt, {
					variant: "primary",
					onClick: () => {
						window.confirm("Restore this version?\n\nA checkpoint of the current state will be saved first. All connected users will see the restored content. Comments and reviews added after this version may be lost.") && (m(d), l());
					},
					className: "w-full px-4 py-2.5 text-sm font-semibold rounded-lg",
					children: "Restore this version"
				}), /* @__PURE__ */ z("div", {
					className: p("text-[11px] text-text-tertiary text-center mt-1.5"),
					children: "A pre-restore checkpoint will be saved automatically"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/MyMentionsPanel.tsx
function Wn(e) {
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
function Gn(e) {
	return e.split(/\s+/).map((e) => e[0]).join("").toUpperCase().slice(0, 2);
}
function Kn({ item: e, onClick: t, onDismiss: n }) {
	return /* @__PURE__ */ B("div", {
		role: "button",
		tabIndex: 0,
		className: p("flex gap-2.5 py-2.5 px-4 cursor-pointer border-b border-border-subtle items-start hover:bg-surface-inset"),
		onClick: t,
		onKeyDown: j(t),
		children: [
			/* @__PURE__ */ z("div", {
				className: p("w-7 h-7 rounded-full text-white text-[11px] font-semibold flex items-center justify-center shrink-0"),
				style: { background: e.authorColor },
				children: Gn(e.authorName)
			}),
			/* @__PURE__ */ B("div", {
				className: p("flex-1 min-w-0"),
				children: [/* @__PURE__ */ z("div", {
					className: p("text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
					children: e.commentText
				}), e.sectionTitle && /* @__PURE__ */ z("div", {
					className: p("text-[11px] text-text-tertiary mt-0.5"),
					children: e.sectionTitle
				})]
			}),
			/* @__PURE__ */ z("div", {
				className: p("text-[11px] text-text-tertiary shrink-0 mt-0.5"),
				children: Wn(e.timestamp)
			}),
			/* @__PURE__ */ z("button", {
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
function qn({ item: e, onClick: t, onDismiss: n }) {
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
	return /* @__PURE__ */ B("div", {
		role: "button",
		tabIndex: 0,
		className: p("flex gap-2.5 py-2.5 px-4 cursor-pointer border-b border-border-subtle items-start hover:bg-surface-inset"),
		onClick: t,
		onKeyDown: j(t),
		children: [
			/* @__PURE__ */ z("div", {
				className: p("w-2 h-2 rounded-full shrink-0 mt-1"),
				style: { background: r[e.priority] ?? "var(--color-text-tertiary)" }
			}),
			/* @__PURE__ */ B("div", {
				className: p("flex-1 min-w-0"),
				children: [/* @__PURE__ */ B("div", {
					className: p("text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
					children: [e.taskText, /* @__PURE__ */ z("span", {
						className: p("inline-block text-[10px] font-semibold px-1.5 py-px rounded-full ml-1.5"),
						style: {
							background: a.bg,
							color: a.text
						},
						children: e.status
					})]
				}), e.sectionTitle && /* @__PURE__ */ z("div", {
					className: p("text-[11px] text-text-tertiary mt-0.5"),
					children: e.sectionTitle
				})]
			}),
			/* @__PURE__ */ z("button", {
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
function Jn({ items: e, onNavigateToSection: t, onClose: n }) {
	let [r, i] = L("all"), [a, o] = L(/* @__PURE__ */ new Set()), s = (e) => {
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
	return /* @__PURE__ */ B(yt, {
		width: 340,
		children: [
			/* @__PURE__ */ z(bt, {
				title: "My Mentions & Tasks",
				onClose: n,
				actions: l.length > 0 ? /* @__PURE__ */ z(wt, {
					variant: "default",
					size: "sm",
					onClick: c,
					children: "Clear all"
				}) : void 0
			}),
			/* @__PURE__ */ z("div", {
				className: p("flex gap-0 border-b border-border shrink-0"),
				children: [
					"all",
					"mentions",
					"tasks"
				].map((e) => /* @__PURE__ */ z("button", {
					type: "button",
					className: p("flex-1 py-2 text-[13px] bg-transparent border-none cursor-pointer font-[inherit]", r === e ? "font-semibold text-primary border-b-2 border-b-primary" : "font-normal text-text-secondary border-b-2 border-b-transparent"),
					onClick: () => i(e),
					children: e === "all" ? "All" : e === "mentions" ? "Mentions" : "Tasks"
				}, e))
			}),
			/* @__PURE__ */ B(xt, {
				padding: "0.5rem 0",
				children: [l.length === 0 && /* @__PURE__ */ z("div", {
					className: p("py-8 px-4 text-center text-text-tertiary text-[13px]"),
					children: "No mentions or tasks for you"
				}), l.map((e) => e.kind === "mention" ? /* @__PURE__ */ z(Kn, {
					item: e,
					onClick: () => t(e.sectionId, e.commentId),
					onDismiss: () => s(e.commentId)
				}, e.commentId) : /* @__PURE__ */ z(qn, {
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
function Yn(e, t) {
	let n = new Date(e).getTime(), r = (t ? new Date(t).getTime() : Date.now()) - n, i = Math.floor(r / 6e4);
	return i < 1 ? "<1m" : i < 60 ? `${i}m` : `${Math.floor(i / 60)}h ${i % 60}m`;
}
function Xn(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 6e4);
	if (n < 1) return "just now";
	if (n < 60) return `${n}m ago`;
	let r = Math.floor(n / 60);
	return r < 24 ? `${r}h ago` : `${Math.floor(r / 24)}d ago`;
}
function Zn({ sessions: e, loading: t, onFetch: n, onClose: r }) {
	P(() => {
		n();
	}, [n]);
	let i = e.filter((e) => e.status === "ended"), a = e.filter((e) => e.status === "active");
	return /* @__PURE__ */ B(yt, {
		width: 340,
		children: [/* @__PURE__ */ z(bt, {
			title: "Past Conversations",
			onClose: r
		}), /* @__PURE__ */ B(xt, {
			padding: "12px",
			children: [
				t && /* @__PURE__ */ z("div", {
					className: p("text-center text-text-tertiary text-[13px] py-6"),
					children: "Loading..."
				}),
				!t && e.length === 0 && /* @__PURE__ */ z("div", {
					className: p("text-center text-text-tertiary text-[13px] py-6"),
					children: "No video conversations yet for this document."
				}),
				a.map((e) => /* @__PURE__ */ z(Qn, {
					session: e,
					isActive: !0
				}, e.sessionId)),
				i.map((e) => /* @__PURE__ */ z(Qn, { session: e }, e.sessionId))
			]
		})]
	});
}
function Qn({ session: e, isActive: t }) {
	return /* @__PURE__ */ B("div", {
		className: p("rounded-lg p-3 mb-2", t ? "border border-success bg-[rgba(16,185,129,0.04)]" : "border border-border bg-surface"),
		children: [
			/* @__PURE__ */ B("div", {
				className: p("flex justify-between items-center mb-1"),
				children: [/* @__PURE__ */ z("span", {
					className: p("text-[11px] text-text-tertiary"),
					children: Xn(e.startedAt)
				}), /* @__PURE__ */ B("div", {
					className: p("flex items-center gap-1"),
					children: [t && /* @__PURE__ */ z("span", {
						className: p("text-[11px] font-semibold text-success-fg bg-[rgba(16,185,129,0.1)] px-1.5 py-px rounded-full"),
						children: "Live"
					}), /* @__PURE__ */ z("span", {
						className: p("text-[11px] text-text-secondary"),
						children: Yn(e.startedAt, e.endedAt)
					})]
				})]
			}),
			/* @__PURE__ */ z("div", {
				className: p("flex flex-wrap gap-1 mb-2"),
				children: e.participants.map((e, t) => /* @__PURE__ */ z("span", {
					className: p("text-[11px] text-text-secondary bg-surface-panel px-2 py-0.5 rounded-full"),
					children: e.displayName || e.userId.slice(0, 10)
				}, `${e.userId}-${t}`))
			}),
			e.aiSummary && /* @__PURE__ */ z("div", {
				className: p("text-[11px] text-text-primary bg-surface-panel p-2 rounded-md leading-normal"),
				children: e.aiSummary
			}),
			e.transcriptStatus && e.transcriptStatus !== "available" && /* @__PURE__ */ B("div", {
				className: p("text-[11px] text-text-tertiary mt-1"),
				children: ["Transcript: ", e.transcriptStatus]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/TableOfContents.tsx
function $n({ sections: e, focusedSectionId: t }) {
	let [n, r] = L(null);
	P(() => {
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
	let i = n || t, a = N((e) => {
		let t = document.getElementById(`section-${e}`);
		t && t.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}, []), o = e.filter((e, t, n) => n.findIndex((t) => t.id === e.id) === t);
	if (o.length === 0) return null;
	let s = o.findIndex((e) => e.id === i);
	return /* @__PURE__ */ B("div", {
		className: p("flex flex-col gap-0 text-[11px] w-[140px] max-h-[calc(100vh-160px)] overflow-y-auto"),
		children: [
			/* @__PURE__ */ z("div", {
				className: p("text-[10px] font-semibold text-text-tertiary uppercase tracking-wide mb-1.5"),
				children: "Contents"
			}),
			o.map((e, t) => {
				let n = e.id === i, r = s >= 0 && t < s;
				return /* @__PURE__ */ B("button", {
					type: "button",
					onClick: () => a(e.id),
					className: p("flex items-center gap-2 py-1 border-none bg-transparent cursor-pointer text-left font-[inherit]"),
					children: [/* @__PURE__ */ z("div", {
						className: p("flex flex-col items-center w-3 shrink-0"),
						children: /* @__PURE__ */ z("div", { className: p("rounded-full transition-all duration-200", n ? "w-2 h-2 bg-info shadow-[0_0_0_3px_rgba(59,130,246,0.2)]" : r ? "w-1.5 h-1.5 bg-neutral" : "w-1.5 h-1.5 bg-state-idle") })
					}), /* @__PURE__ */ z("span", {
						className: p("text-[11px] overflow-hidden text-ellipsis whitespace-nowrap transition-colors duration-200", n ? "font-semibold text-text-primary" : r ? "font-normal text-neutral" : "font-normal text-text-tertiary"),
						children: e.title || "Untitled"
					})]
				}, e.id);
			}),
			s >= 0 && /* @__PURE__ */ B("div", {
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
function er({ showHistory: e, showMyItems: t, showVideoHistory: n, closePanel: r, versionHistory: i, ydoc: a, myItems: o, onNavigateToSection: s, videoSessions: c, showTOC: l, isCanvas: u = !1, commentSidebarOpen: d, sections: f, focusedSectionId: m, mode: h }) {
	return /* @__PURE__ */ B(R, { children: [
		e && /* @__PURE__ */ z(Un, {
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
		t && /* @__PURE__ */ z(Jn, {
			items: o,
			onNavigateToSection: s,
			onClose: r
		}),
		n && /* @__PURE__ */ z(Zn, {
			sessions: c.sessions,
			loading: c.loading,
			onFetch: c.fetchSessions,
			onClose: r
		}),
		!u && l && !d && f.length > 1 && h === "editor" && /* @__PURE__ */ z("div", {
			className: p("fixed bottom-4 right-4 w-40 max-h-[280px] overflow-y-auto", "bg-surface border border-border rounded-[10px] px-3 py-2.5", "shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-30"),
			children: /* @__PURE__ */ z($n, {
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
var tr = /* @__PURE__ */ e({ default: () => nr });
function nr({ documentId: e, documentType: t, ws: n, userId: r, displayName: i, color: a = "var(--color-info)", onMessage: o, activityPublish: s, onBack: c, isVideoDocked: l, onDockVideo: u, onUndockVideo: d, idToken: f }) {
	let p = Ie({
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
	}), m = !p.isCanvas && p.sections.length === 0 && !p.demoLoaded, [h] = L(() => {
		if (typeof document > "u") return null;
		let e = document.createElement("div");
		return e.style.width = "100%", e;
	});
	P(() => {
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
	]), P(() => () => {
		h?.parentNode?.removeChild(h);
	}, [h]);
	let g = p.showVideoCall && h ? V(/* @__PURE__ */ z(kt, {
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
	return /* @__PURE__ */ B("div", {
		"data-testid": "document-editor-page",
		className: "flex flex-col h-full",
		children: [
			g,
			/* @__PURE__ */ z(_t, {
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
			/* @__PURE__ */ z(vt, {
				followingUserId: p.followingUserId,
				participants: p.participants,
				onStopFollow: p.handleStopFollow
			}),
			/* @__PURE__ */ z("div", {
				className: "flex-1 overflow-auto p-4",
				children: /* @__PURE__ */ z(Fn, {
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
			/* @__PURE__ */ z(er, {
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
export { _t as A, Ee as B, tn as C, Ft as D, It as E, Qe as F, K as G, Te as H, Ge as I, pe as J, G as K, Ue as L, ht as M, $e as N, kt as O, Ze as P, Ae as R, qt as S, Ut as T, de as U, Se as V, W, en as _, Jn as a, Jt as b, Pn as c, Tn as d, gn as f, an as g, ln as h, Zn as i, gt as j, vt as k, wn as l, mn as m, tr as n, Un as o, hn as p, fe as q, $n as r, Vn as s, nr as t, Cn as u, rn as v, Gt as w, Kt as x, nn as y, je as z };
