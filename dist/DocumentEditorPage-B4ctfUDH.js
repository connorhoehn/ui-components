import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { r as t } from "./registry-DbX3MVAA.js";
import { n } from "./IdentityContext-CQM1qwH6.js";
import { a as r, c as i, d as a, i as o, l as s, n as c, r as l, t as u, u as d } from "./useVideoSessions-_k7Qd6OK.js";
import { t as f } from "./useDocumentTypes-CrsHC24c.js";
import { t as p } from "./cn-DhjIN-s0.js";
import { t as m } from "./useEventCallback-Cwx9QVSi.js";
import { t as h } from "./Input-DLknWXri.js";
import { t as g } from "./Textarea-Dz4doxTv.js";
import { t as _ } from "./activationKey-CjbL3LUv.js";
import { i as v, t as y } from "./renderers-B2c6fv2M.js";
import { t as b } from "./TiptapEditor-Dn9rUdZx.js";
import { t as x } from "./useHangoutEmbed-ChkoGDC_.js";
import { t as S } from "./useActiveSpeaker-Dc9r75EE.js";
import { forwardRef as C, useCallback as w, useEffect as T, useImperativeHandle as E, useMemo as D, useRef as O, useState as k } from "react";
import { Fragment as A, jsx as j, jsxs as M } from "react/jsx-runtime";
import N, { createPortal as P } from "react-dom";
//#region src/utils/markdownParser.ts
function F() {
	return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
var ee = /^- \[([ xX])\]\s+(.+)$/;
function te(e, t) {
	let n = e.toLowerCase();
	return ee.test(t) || /- \[[ xX]\]/.test(t) ? "tasks" : n.includes("decision") ? "decisions" : n.includes("summary") ? "summary" : "notes";
}
function ne(e) {
	let t = e.split("\n"), n = [], r = [];
	for (let e of t) {
		let t = e.match(ee);
		if (t) {
			let e = t[1].toLowerCase() === "x";
			n.push({
				id: F(),
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
function re(e) {
	let t = {}, n = [], r = e.replace(/\r\n/g, "\n"), i = r.match(/^# (.+)$/m);
	i && (t.title = i[1].trim());
	let a = r.split(/^## /m);
	if (a.length <= 1) {
		let e = r.replace(/^# .+\n*/m, "").trim();
		if (e.length > 0) {
			let { items: r, remaining: i } = ne(e);
			n.push({
				id: F(),
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
		let t = a[e], r = t.indexOf("\n"), i = r === -1 ? t.trim() : t.slice(0, r).trim(), o = r === -1 ? "" : t.slice(r + 1).trim(), { items: s, remaining: c } = ne(o), l = te(i, o);
		n.push({
			id: F(),
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
//#region src/utils/documentExport.ts
function ie(e) {
	return `- [${e.status === "done" || e.status === "acked" ? "x" : " "}] ${e.text}`;
}
function ae(e, t = 0) {
	let n = "  ".repeat(t), r = [];
	r.push(`${n}> **${e.displayName}**: ${e.text}`);
	for (let n of e.replies) r.push(ae(n, t + 1));
	return r.join("\n");
}
function oe(e) {
	let t = [`## ${e.title}`, ""], n = e.contentMarkdown ?? e.contentText;
	if (n && t.push(n, ""), e.items.length > 0) {
		for (let n of e.items) t.push(ie(n));
		t.push("");
	}
	let r = e.comments;
	if (r && r.length > 0) {
		t.push(`### Comments (${r.length})`, "");
		for (let e of r) t.push(ae(e));
		t.push("");
	}
	return t.join("\n");
}
function I(e) {
	let t = [`# ${e.meta.title}`, ""];
	for (let n of e.sections) t.push(oe(n));
	return t.join("\n").trimEnd() + "\n";
}
//#endregion
//#region src/utils/demoDocument.ts
var L = "# Q2 Sprint Planning - Meeting Summary\n\n## Executive Summary\n\nThis document captures the key outcomes from our Q2 sprint planning session held on April 10, 2026. The team discussed priorities for the upcoming quarter, including the new collaborative editing feature, infrastructure improvements, and customer-facing bug fixes.\n\nKey themes:\n- **Real-time collaboration** is the top priority for Q2\n- Infrastructure debt needs to be addressed before scaling\n- Customer satisfaction scores are trending upward\n\n## Action Items\n\n- [ ] Set up Tiptap editor with Y.js CRDT integration\n- [ ] Deploy shared Redis ECS service for multi-instance sync\n- [ ] Fix the 48 audit issues identified in the post-fix review\n- [ ] Create Playwright tests for 3-browser collaborative editing\n- [ ] Design the document export pipeline (PDF, DOCX, Google Docs)\n- [x] Complete the WebSocket gateway infrastructure audit\n- [x] Remove ElastiCache dependency from CDK stack\n\n## Decisions\n\n- [ ] Adopt Tiptap v3 as the standard rich text editor\n- [ ] Use Y.js with custom GatewayProvider (not Hocuspocus)\n- [ ] Store CRDT snapshots in DynamoDB with 7-day TTL\n- [ ] Support 3 viewing modes: Editor, Review, Reader\n\n## Technical Notes\n\nThe collaborative document editor will be built on top of the existing WebSocket gateway infrastructure. The `crdt-service.js` backend has been upgraded to maintain a proper `Y.Doc` per channel with awareness protocol support.\n\n### Architecture Highlights\n\n1. **Frontend**: Tiptap v3 + Y.js with custom `GatewayProvider`\n2. **Backend**: Existing crdt-service.js (treats Y.js updates as opaque binary)\n3. **Persistence**: EventBridge -> Lambda -> DynamoDB (gzip compressed, 7-day TTL)\n4. **Sync**: Redis pub/sub for multi-instance, WebSocket for client delivery\n\n### Performance Targets\n\n- Edit latency: < 50ms (local) / < 200ms (remote)\n- Concurrent editors: 10+ per document\n- Document size: up to 100KB of rich text\n- Snapshot frequency: every 50 operations or 5 minutes\n";
//#endregion
//#region src/components/doc-editor/useDocumentActions.ts
function se(e) {
	return e.toString().replace(/<\/?(paragraph|heading|blockquote|codeBlock|bulletList|orderedList|listItem|taskList|taskItem|horizontalRule|hardBreak|doc)[^>]*>/g, "\n").replace(/<[^>]+>/g, "").replace(/\n{3,}/g, "\n\n").trim();
}
function ce(e) {
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
function le(e) {
	return e.split("\n").map((e) => e.startsWith("### ") ? `<h3>${e.slice(4)}</h3>` : e.startsWith("## ") ? `<h2>${e.slice(3)}</h2>` : e.startsWith("# ") ? `<h1>${e.slice(2)}</h1>` : e.startsWith("> ") ? `<blockquote>${e.slice(2)}</blockquote>` : e.startsWith("- [x] ") ? `<li>&#9745; ${e.slice(6)}</li>` : e.startsWith("- [ ] ") ? `<li>&#9744; ${e.slice(6)}</li>` : e.startsWith("- ") ? `<li>${e.slice(2)}</li>` : e.trim() === "" ? "<br/>" : `<p>${e}</p>`).join("\n").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/`([^`]+)`/g, "<code>$1</code>");
}
function R(e, t) {
	let n = URL.createObjectURL(e), r = document.createElement("a");
	r.href = n, r.download = t, r.click(), URL.revokeObjectURL(n);
}
function z(e, t, n, r) {
	let i = t || "document";
	if (e === "json") {
		R(new Blob([JSON.stringify(r, null, 2)], { type: "application/json" }), `${i}.json`);
		return;
	}
	if (e === "markdown") {
		R(new Blob([n], { type: "text/markdown" }), `${i}.md`);
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
    <body>${le(n)}</body>
    </html>
  `), a.document.close(), a.print());
}
function ue({ documentId: e, userId: t, ws: n, updateMeta: r, addSection: i, exportJSON: a, getSectionFragment: o, getCanvasFragment: s, isCanvas: c = !1, comments: l }) {
	let [u, d] = k(!1);
	return {
		demoLoaded: u,
		handleLoadDemo: w(() => {
			let n = re(L);
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
		handleClearDocument: w(() => {
			n.sendMessage({
				service: "crdt",
				action: "clearDocument",
				channel: `doc:${e}`
			}), d(!1);
		}, [n, e]),
		handleExport: w((e) => {
			let t = a();
			if (t) {
				if (c) {
					let n = ce(s?.() ?? null);
					t.sections = [], t.body = n;
					let r = Object.values(l).flat();
					r.length > 0 && (t.comments = r), z(e, t.meta.title, n ? `# ${t.meta.title || "Document"}\n\n${n}\n` : `# ${t.meta.title || "Document"}\n`, t);
					return;
				}
				for (let e of t.sections) {
					let t = o(e.id);
					t && (e.contentText = se(t));
					let n = l[e.id];
					n && n.length > 0 && (e.comments = n);
				}
				z(e, t.meta.title, I(t), t);
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
function de(e = {}) {
	let [t, n] = k(e.initialPanel ?? null), r = w((e) => {
		n((t) => t === e ? null : e);
	}, []), i = w((e) => {
		n(e);
	}, []), a = w(() => {
		n(null);
	}, []);
	return {
		activePanel: t,
		showHistory: t === "history",
		showMyItems: t === "myItems",
		showVideoHistory: t === "videoHistory",
		toggleHistory: w(() => r("history"), [r]),
		toggleMyItems: w(() => r("myItems"), [r]),
		toggleVideoHistory: w(() => r("videoHistory"), [r]),
		openPanel: i,
		closePanel: a
	};
}
//#endregion
//#region src/components/doc-editor/canvas/documentShape.ts
var fe = 2, pe = "body";
function B(e) {
	if (!e) return 0;
	let t = e.getMap("meta").get("schemaVersion");
	return typeof t == "number" ? t : 0;
}
function me(e) {
	return B(e) >= 2;
}
function he(e) {
	return !e || !me(e) ? null : e.getXmlFragment(pe);
}
function ge(e) {
	let [t, n] = k(() => B(e));
	return T(() => {
		if (!e) {
			n(0);
			return;
		}
		let t = e.getMap("meta"), r = () => n(B(e));
		return r(), t.observe(r), () => t.unobserve(r);
	}, [e]), t >= 2;
}
//#endregion
//#region src/components/doc-editor/canvas/scrollToDocumentTarget.ts
var _e = 2e3, ve = "0 0 0 3px #3b82f640";
function V(e) {
	return e.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
}
function ye(e, t = document) {
	let { sectionId: n, commentId: r } = e;
	if (n) {
		let e = t.querySelector(`[id="section-${V(n)}"]`);
		if (e) return e;
	}
	if (r) {
		let e = t.querySelector(`[data-comment-id="${V(r)}"]`);
		if (e) return e;
	}
	return null;
}
function be(e, t = document) {
	let n = ye(e, t);
	return n ? (n.scrollIntoView?.({
		behavior: "smooth",
		block: "center"
	}), n.style.transition = "box-shadow 0.3s ease", n.style.boxShadow = ve, setTimeout(() => {
		n.style.boxShadow = "";
	}, _e), !0) : !1;
}
//#endregion
//#region src/hooks/templateSections.ts
function xe(e, t) {
	let n = `${e}::${t}`, r = 5381;
	for (let e = 0; e < n.length; e++) r = r * 33 ^ n.charCodeAt(e);
	return `tpl-${(r >>> 0).toString(36)}`;
}
function Se(e) {
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
function Ce() {
	if (typeof window < "u") {
		let e = new URLSearchParams(window.location.search).get("mode");
		if (e === "editor" || e === "ack" || e === "reader") return e;
	}
	return "editor";
}
function H(e) {
	return e.toString().replace(/<\/?(paragraph|heading|blockquote|codeBlock|bulletList|orderedList|listItem|taskList|taskItem|horizontalRule|hardBreak|doc)[^>]*>/g, "\n").replace(/<[^>]+>/g, "").replace(/\n{3,}/g, "\n\n").trim();
}
function U({ documentId: e, documentType: t, ws: r, userId: c, displayName: p, color: m = "var(--color-info)", onMessage: h, activityPublish: g, isVideoDocked: _, onDockVideo: v, onUndockVideo: y, onBack: b }) {
	let [x, S] = k(Ce), { showHistory: C, showMyItems: E, showVideoHistory: A, toggleHistory: j, toggleMyItems: M, toggleVideoHistory: N, closePanel: P } = de(), [F, ee] = k(_ ?? !1), [te, ne] = k(typeof window < "u" ? window.innerWidth : 1400);
	T(() => {
		let e = () => ne(window.innerWidth);
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, []);
	let re = te >= 1200, ie = te >= 900, [ae, oe] = k(!1), I = O(null), L = O(null), [se, ce] = k(0), [, le] = k(0), R = O(null), z = w(() => {
		if (R.current === null) {
			let e = I.current ?? L.current;
			e && (R.current = e.getBoundingClientRect().top + window.scrollY);
		}
		let e = R.current ?? 250, t = window.scrollY > e - 146;
		oe(t), I.current && ce(I.current.getBoundingClientRect().left), L.current && le(L.current.getBoundingClientRect().left);
	}, []);
	T(() => {
		let e = () => {
			R.current = null, z();
		};
		return window.addEventListener("scroll", z, { passive: !0 }), window.addEventListener("resize", e, { passive: !0 }), () => {
			window.removeEventListener("scroll", z), window.removeEventListener("resize", e);
		};
	}, [z]), T(() => {
		let e = setTimeout(() => {
			R.current = null, z();
		}, 50);
		return () => clearTimeout(e);
	}, [F, z]);
	let [fe, B] = k(null), [me, he] = k(!1), [_e, ve] = k(null), { idToken: V } = n(), ye = u(e, V), { meta: H, sections: U, synced: W, updateMeta: G, addSection: we, updateSection: Te, addItem: Ee, updateItem: De, removeItem: Oe, getSectionFragment: ke, ydoc: K, provider: Ae, exportJSON: je, participants: Me, awareness: q } = a({
		documentId: e,
		mode: x,
		ws: r,
		userId: c,
		displayName: p,
		color: m,
		onMessage: h
	}), { comments: Ne, addComment: Pe, resolveThread: Fe, unresolveThread: Ie } = d({
		documentId: e,
		idToken: V,
		sendMessage: r.sendMessage,
		onMessage: h,
		connectionState: r.connectionState
	}), { sectionReviews: Le, reviewSection: Re } = i({
		documentId: e,
		idToken: V,
		sendMessage: r.sendMessage,
		onMessage: h,
		connectionState: r.connectionState
	}), J = D(() => U.map((e) => e.id), [U]), { items: ze, addItem: Be, updateItem: Ve, removeItem: He, itemErrors: Ue } = s({
		documentId: e,
		sectionIds: J,
		idToken: V,
		sendMessage: r.sendMessage,
		onMessage: h,
		connectionState: r.connectionState
	});
	T(() => {
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
	let We = ge(K), { demoLoaded: Ge, handleLoadDemo: Ke, handleClearDocument: qe, handleExport: Je } = ue({
		documentId: e,
		userId: c,
		ws: r,
		updateMeta: G,
		addSection: we,
		exportJSON: je,
		getSectionFragment: ke,
		getCanvasFragment: () => K ? K.getXmlFragment(pe) : null,
		isCanvas: We,
		comments: Ne
	}), [Ye, Xe] = k(null), Ze = w((e) => {
		let t = e.lastSeen && Date.now() - e.lastSeen < 3e4, n = e.mode === "reviewer" ? "ack" : e.mode === "reader" ? "reader" : "editor";
		if (x !== n && (S(n), typeof window < "u")) {
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
	}, [x, U]), Y = w((e) => {
		let t = e.userId || e.clientId;
		B((e) => e === t ? null : t);
	}, []), X = O(null);
	T(() => {
		if (!fe) {
			X.current = null;
			return;
		}
		let e = Me.find((e) => (e.userId || e.clientId) === fe);
		if (!e || !e.currentSectionId) {
			if (e && U.length > 0) {
				let e = document.getElementById(`section-${U[0].id}`);
				e && !X.current && (e.scrollIntoView({
					behavior: "smooth",
					block: "start"
				}), X.current = "__initial__");
			}
			return;
		}
		if (e.currentSectionId === X.current) return;
		X.current = e.currentSectionId;
		let t = e.mode === "reviewer" ? "ack" : e.mode === "reader" ? "reader" : "editor";
		if (x !== t && (S(t), typeof window < "u")) {
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
		fe,
		Me,
		x,
		U
	]);
	let Qe = w(() => {
		B(null);
	}, []), $e = w((t, n) => {
		let r = {
			id: crypto.randomUUID(),
			...n
		};
		Ee(t, r), Be(t, r).catch(() => {}), g("doc.add_item", {
			sectionTitle: U.find((e) => e.id === t)?.title,
			documentId: e,
			documentTitle: H?.title
		});
	}, [
		Ee,
		Be,
		U,
		g,
		e,
		H?.title
	]), et = w((e, t, n) => {
		De(e, t, n), Ve(e, t, n).catch(() => {});
	}, [De, Ve]), tt = w((e, t) => {
		Oe(e, t), He(e, t).catch(() => {});
	}, [Oe, He]);
	T(() => {
		if (We || U.length === 0 || Ye) return;
		let e = setTimeout(() => {
			let e = U[0].id;
			Xe(e), q.updateSection(e);
		}, 500);
		return () => clearTimeout(e);
	}, [
		We,
		U,
		Ye,
		q
	]);
	let nt = w((e) => {
		Xe(e), q.updateSection(e);
	}, [q]), rt = O(null), [it, at] = k(0), ot = w((e) => {
		ve(e), he(!0), requestAnimationFrame(() => {
			let t = document.getElementById(`section-${e}`), n = rt.current;
			if (t && n) {
				let e = t.getBoundingClientRect(), r = n.getBoundingClientRect();
				at(e.top - r.top);
			}
		});
	}, []), st = w(() => {
		he(!1);
	}, []), Z = w((t, n, r) => {
		Pe(t, n, r), g("doc.comment", {
			sectionId: t,
			text: n.slice(0, 50),
			documentId: e,
			documentTitle: H?.title
		});
		let i = n.match(/@[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)*/g);
		if (i && i.length > 0) {
			let r = i.map((e) => e.slice(1).trim());
			g("doc.mention", {
				sectionId: t,
				sectionTitle: U.find((e) => e.id === t)?.title ?? "",
				mentionedNames: r,
				commentText: n.slice(0, 80),
				authorName: p,
				documentId: e,
				documentTitle: H?.title
			});
		}
	}, [
		Pe,
		g,
		U,
		p,
		e,
		H?.title
	]), ct = w((t, n) => {
		Fe(t, n), g("doc.resolve_thread", {
			sectionId: t,
			commentId: n,
			documentId: e,
			documentTitle: H?.title
		});
	}, [
		Fe,
		g,
		e,
		H?.title
	]), lt = w((t, n) => {
		Ie(t, n), g("doc.unresolve_thread", {
			sectionId: t,
			commentId: n,
			reopenedBy: p,
			documentId: e,
			documentTitle: H?.title
		});
	}, [
		Ie,
		g,
		p,
		e,
		H?.title
	]), ut = o({
		sections: U,
		comments: Ne,
		displayName: p,
		userId: c
	}), dt = w((e, t) => {
		setTimeout(() => {
			be({
				sectionId: e,
				commentId: t
			});
		}, 150);
	}, []), ft = M, pt = j, Q = N, mt = w(() => {
		ee((e) => !e), P();
	}, [P]);
	T(() => {
		let e = (e) => {
			(e.metaKey || e.ctrlKey) && e.key === "m" && (e.preventDefault(), ft());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [ft]);
	let ht = `doc:${e}`, gt = l({
		channel: ht,
		sendMessage: r.sendMessage,
		onMessage: h
	});
	T(() => {
		C ? gt.fetchVersions() : gt.clearPreview();
	}, [C]), T(() => {
		if (!W || !t || !K) return;
		let n = K.getMap("meta");
		if (n.get("templateApplied") || K.getArray("sections").length > 0) return;
		let r = f().find((e) => e.name === t);
		if (!r) return;
		K.transact(() => {
			n.set("templateApplied", !0);
		});
		let i = (e) => e === "tasks" ? "tasks" : e === "decisions" ? "decisions" : "notes";
		G({
			id: e,
			title: H?.title || r.name,
			sourceType: "notes",
			sourceId: "",
			createdBy: c,
			createdByName: p,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			aiModel: "",
			status: "draft",
			documentType: r.name
		});
		for (let t of r.fields) we({
			id: xe(e, t.name),
			type: i(t.sectionType),
			sectionType: t.sectionType,
			title: t.name,
			collapsed: t.defaultCollapsed,
			placeholder: t.placeholder || void 0,
			items: []
		});
	}, [
		W,
		t,
		K
	]), T(() => {
		!W || !K || Se(K);
	}, [
		W,
		K,
		U
	]);
	let _t = (e) => {
		if (S(e), typeof window < "u") {
			let t = new URL(window.location.href);
			t.searchParams.set("mode", e), window.history.replaceState({}, "", t.toString());
		}
	}, vt = H ?? {
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
		mode: x,
		handleModeChange: _t,
		meta: H,
		headerMeta: vt,
		isFinalized: vt.status === "final",
		handleFinalize: w(() => {
			window.confirm("Finalize this document? It will become read-only.") && (G({ status: "final" }), g("doc.finalize", {
				documentId: e,
				documentTitle: H?.title
			}));
		}, [
			G,
			g,
			e,
			H?.title
		]),
		handleUnlock: w(() => {
			G({ status: "draft" }), g("doc.unlock", {
				documentId: e,
				documentTitle: H?.title
			});
		}, [
			G,
			g,
			e,
			H?.title
		]),
		updateMeta: G,
		sections: U,
		updateSection: Te,
		getSectionFragment: ke,
		isCanvas: We,
		itemErrors: Ue,
		ydoc: K,
		provider: Ae,
		synced: W,
		demoLoaded: Ge,
		handleLoadDemo: Ke,
		handleClearDocument: qe,
		handleExport: Je,
		participants: Me,
		awareness: q,
		focusedSectionId: Ye,
		handleSectionFocus: nt,
		handleJumpToUser: Ze,
		followingUserId: fe,
		handleFollowUser: Y,
		handleStopFollow: Qe,
		comments: Ne,
		commentSidebarOpen: me,
		commentSectionId: _e,
		commentSidebarTop: it,
		sectionListRef: rt,
		handleOpenComments: ot,
		handleCloseComments: st,
		handleAddComment: Z,
		handleResolveThread: ct,
		handleUnresolveThread: lt,
		restItems: ze,
		handleAddItem: $e,
		handleUpdateItem: et,
		handleRemoveItem: tt,
		sectionReviews: Le,
		restReviewSection: Re,
		showHistory: C,
		showMyItems: E,
		showVideoHistory: A,
		handleToggleHistory: pt,
		handleToggleMyItems: ft,
		handleToggleVideoHistory: Q,
		closePanel: P,
		showVideoCall: F,
		setShowVideoCall: ee,
		handleToggleVideoCall: mt,
		videoSessions: ye,
		isVideoDocked: _,
		onDockVideo: v,
		onUndockVideo: y,
		showTOC: re,
		showInlineVideo: ie,
		sidebarFixed: ae,
		videoSpacerRef: I,
		tocSpacerRef: L,
		videoLeft: se,
		FIXED_TOP: 146,
		myItems: ut,
		handleNavigateToSection: dt,
		versionHistory: gt,
		handleBack: w(() => {
			F && !_ && v?.(), b?.();
		}, [
			F,
			_,
			v,
			b
		]),
		idToken: V,
		activityPublish: g,
		displayName: p,
		color: m,
		userId: c,
		documentId: e
	};
}
//#endregion
//#region src/components/doc-editor/ParticipantAvatars.tsx
function W(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function G(e, t = .2) {
	let n = e.replace("#", ""), r = parseInt(n, 16), i = Math.max(0, (r >> 16 & 255) * (1 - t)), a = Math.max(0, (r >> 8 & 255) * (1 - t)), o = Math.max(0, (r & 255) * (1 - t));
	return `rgb(${Math.round(i)}, ${Math.round(a)}, ${Math.round(o)})`;
}
function we(e) {
	switch (e) {
		case "editor": return "editing";
		case "reviewer": return "reviewing";
		case "reader": return "reading";
		default: return "";
	}
}
function Te(e) {
	if (!e) return "";
	let t = Math.floor((Date.now() - e) / 1e3);
	return t < 5 ? "" : t < 60 ? `, ${t}s` : t < 3600 ? `, ${Math.floor(t / 60)}m` : `, ${Math.floor(t / 3600)}h`;
}
function Ee(e) {
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
function De({ onJump: e, label: t, children: n }) {
	return e ? /* @__PURE__ */ j("button", {
		type: "button",
		onClick: e,
		"aria-label": `Jump to ${t}`,
		className: p("relative inline-block bg-transparent border-none p-0 m-0 cursor-pointer font-[inherit]"),
		children: n
	}) : /* @__PURE__ */ j("span", {
		tabIndex: 0,
		role: "img",
		"aria-label": t,
		className: p("relative inline-block"),
		"data-testid": "participant-avatar-static",
		children: n
	});
}
function Oe({ participant: e, sectionTitle: t, onJumpToUser: n, onFollowUser: r, isFollowing: i }) {
	let [a, o] = k(!1), s = O(null), c = O(null), l = () => {
		c.current &&= (clearTimeout(c.current), null), o(!0);
	}, u = () => {
		c.current = setTimeout(() => o(!1), 150);
	};
	T(() => () => {
		c.current && clearTimeout(c.current);
	}, []);
	let d = Ee(e.mode), f = e.color || "#3b82f6";
	return /* @__PURE__ */ M("div", {
		ref: s,
		className: p("flex flex-col items-center gap-[3px] relative animate-[presenceFadeIn_0.3s_ease]"),
		onMouseEnter: l,
		onMouseLeave: u,
		onFocus: l,
		onBlur: (e) => {
			e.currentTarget.contains(e.relatedTarget) || u();
		},
		children: [
			/* @__PURE__ */ M(De, {
				onJump: n ? () => n(e) : void 0,
				label: e.displayName,
				children: [/* @__PURE__ */ j("div", {
					className: p("w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-semibold transition-[transform,box-shadow] duration-200 ease-in-out", a ? "scale-110" : "scale-100"),
					style: {
						background: `linear-gradient(135deg, ${f}, ${G(f, .2)})`,
						boxShadow: a ? `0 0 0 2px ${f}40` : "none"
					},
					children: W(e.displayName)
				}), /* @__PURE__ */ j("div", { className: p("absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white", e.idle ? "bg-warning" : "bg-success [animation:presencePulse_2s_infinite]") })]
			}),
			a && /* @__PURE__ */ M("div", {
				className: p("absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-surface-inverse text-text-inverse py-2 px-3 rounded-md text-xs whitespace-nowrap z-[100] pointer-events-auto shadow-[0_4px_12px_rgba(0,0,0,0.15)] leading-snug"),
				onMouseEnter: l,
				onMouseLeave: u,
				children: [
					/* @__PURE__ */ j("div", {
						className: p("font-semibold mb-0.5"),
						children: e.displayName
					}),
					/* @__PURE__ */ M("div", {
						className: p("text-text-tertiary text-[11px]"),
						children: [e.idle ? "away" : we(e.mode), Te(e.lastSeen)]
					}),
					t && /* @__PURE__ */ M("div", {
						className: p("text-text-tertiary text-[11px] mt-0.5"),
						children: ["§ ", t]
					}),
					r && /* @__PURE__ */ j("button", {
						type: "button",
						onClick: (t) => {
							t.stopPropagation(), r(e);
						},
						className: p("mt-1 text-[11px] font-semibold cursor-pointer bg-transparent border-none p-0 font-[inherit]", i ? "text-warning-fg" : "text-info-fg"),
						children: i ? "Stop following" : "Follow"
					})
				]
			}),
			/* @__PURE__ */ M("span", {
				className: p("text-[11px] font-semibold px-2 py-px rounded-full leading-4"),
				style: {
					background: e.idle ? "#fef3c7" : d.bg,
					color: e.idle ? "#92400e" : d.text
				},
				children: [e.idle ? "away" : we(e.mode), Te(e.lastSeen)]
			}),
			i && /* @__PURE__ */ j("span", {
				className: p("text-[10px] font-semibold text-info-fg"),
				children: "following"
			}),
			t && /* @__PURE__ */ M("span", {
				className: p("text-[10px] text-neutral max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap text-center"),
				children: ["§ ", t]
			})
		]
	});
}
function ke({ participants: e, sections: t, onJumpToUser: n, onFollowUser: r, followingUserId: i }) {
	let a = /* @__PURE__ */ new Map();
	if (t) for (let e of t) a.set(e.id, e.title);
	return e.length === 0 ? null : /* @__PURE__ */ M("div", {
		"data-testid": "participant-avatars",
		className: p("flex items-center gap-0"),
		children: [/* @__PURE__ */ j("div", {
			className: p("flex gap-2.5 items-start py-1"),
			children: e.filter((e, t, n) => n.findIndex((t) => (t.userId || t.clientId) === (e.userId || e.clientId)) === t).map((e) => /* @__PURE__ */ j(Oe, {
				participant: e,
				sectionTitle: e.currentSectionId ? a.get(e.currentSectionId) : void 0,
				onJumpToUser: n,
				onFollowUser: r,
				isFollowing: i === (e.userId || e.clientId)
			}, e.clientId))
		}), /* @__PURE__ */ j("div", { className: p("w-px h-9 bg-border mx-1 self-center") })]
	});
}
//#endregion
//#region src/components/doc-editor/DocumentHeader.tsx
var K = {
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
}, Ae = {
	idle: "Call",
	available: "Join Call",
	active: "In Call"
}, je = {
	idle: "bg-surface text-text-primary border-border-field",
	available: "bg-info-bg text-info-fg border-info-border",
	active: "bg-success-bg text-success-fg border-success-border"
}, Me = [
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
function q({ meta: e, mode: t, onModeChange: n, participants: r, onUpdateMeta: i, onExport: a, onToggleHistory: o, onToggleVideoCall: s, onToggleVideoHistory: c, isCallActive: l, callVariant: u, callLabel: d, onClearDocument: f, onJumpToUser: m, sections: g, onToggleMyItems: _, myItemCount: v, commentCount: y, onBack: b, onFollowUser: x, followingUserId: S, onFinalize: C, onUnlock: w, pastCallsCount: T, extraMenuItems: E }) {
	let [D, O] = k(!1), A = K[e.status] ?? K.draft, N = u ?? (l ? "active" : "idle");
	return /* @__PURE__ */ M("header", {
		className: p("flex flex-col py-2 px-4 bg-surface border-b border-border shrink-0 gap-1.5 sticky top-[53px] z-[34]"),
		children: [/* @__PURE__ */ M("div", {
			className: p("flex items-center justify-between"),
			children: [/* @__PURE__ */ M("div", {
				className: p("flex items-center gap-2.5"),
				children: [
					b && /* @__PURE__ */ j("button", {
						onClick: b,
						className: p("bg-transparent border-none text-info-fg cursor-pointer text-[13px] p-0 flex items-center gap-1 font-[inherit]"),
						children: "← Documents"
					}),
					/* @__PURE__ */ j(h, {
						"aria-label": "Document title",
						className: p("w-auto h-auto min-w-[180px] text-base font-semibold border-transparent bg-transparent py-1 px-2"),
						value: e.title,
						placeholder: "Untitled document",
						onChange: (e) => i({ title: e.target.value })
					}),
					/* @__PURE__ */ j("span", {
						className: p("inline-block text-[11px] font-semibold py-0.5 px-2.5 rounded-full"),
						style: {
							background: A.bg,
							color: A.text
						},
						children: e.status
					}),
					t === "editor" && /* @__PURE__ */ j("span", {
						className: p("text-[11px] text-text-tertiary italic"),
						children: "Auto-saved"
					}),
					e.updatedAt && /* @__PURE__ */ M("span", {
						className: p("text-[11px] text-text-tertiary"),
						children: ["Last edited ", (() => {
							let t = Date.now() - new Date(e.updatedAt).getTime(), n = Math.floor(t / 6e4);
							if (n < 1) return "just now";
							if (n < 60) return `${n}m ago`;
							let r = Math.floor(n / 60);
							return r < 24 ? `${r}h ago` : `${Math.floor(r / 24)}d ago`;
						})()]
					}),
					y != null && y > 0 && /* @__PURE__ */ M("span", {
						className: p("inline-flex items-center gap-1 text-[11px] font-semibold py-0.5 px-2.5 rounded-full bg-surface-hover text-text-secondary"),
						children: [/* @__PURE__ */ j("svg", {
							width: "12",
							height: "12",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: /* @__PURE__ */ j("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
						}), y]
					})
				]
			}), r.length > 0 && /* @__PURE__ */ j(ke, {
				participants: r,
				sections: g,
				onJumpToUser: m,
				onFollowUser: x,
				followingUserId: S
			})]
		}), /* @__PURE__ */ M("div", {
			className: p("flex items-center justify-between flex-wrap gap-1"),
			children: [/* @__PURE__ */ j("div", {
				className: p("flex gap-1"),
				children: Me.map(({ mode: e, label: r }) => /* @__PURE__ */ j("button", {
					type: "button",
					"data-testid": `mode-btn-${e}`,
					className: p("py-1.5 px-3.5 text-[13px] font-semibold border border-border-field rounded-md cursor-pointer font-[inherit]", t === e ? "bg-info text-white" : "bg-surface text-text-primary"),
					onClick: () => n(e),
					children: r
				}, e))
			}), /* @__PURE__ */ M("div", {
				className: p("flex items-center gap-2"),
				children: [
					_ && /* @__PURE__ */ M("button", {
						type: "button",
						className: p("py-1.5 px-3 text-[13px] font-medium border border-border-field rounded-md bg-surface text-text-primary cursor-pointer font-[inherit] relative"),
						onClick: _,
						children: ["My Items", v ? ` (${v})` : ""]
					}),
					s && /* @__PURE__ */ j("button", {
						type: "button",
						"aria-pressed": N === "active",
						"data-call-variant": N,
						className: p("py-1.5 px-3 text-[13px] font-medium border rounded-md cursor-pointer font-[inherit] relative", je[N]),
						onClick: s,
						children: d ?? Ae[N]
					}),
					e.status === "final" ? w && /* @__PURE__ */ j("button", {
						type: "button",
						className: p("py-1.5 px-3 text-[13px] font-medium border border-success-border rounded-md bg-success-bg text-success-fg cursor-pointer font-[inherit] relative"),
						onClick: w,
						children: "Unlock"
					}) : C && /* @__PURE__ */ j("button", {
						type: "button",
						className: p("py-1.5 px-3 text-[13px] font-medium border border-success-border rounded-md bg-success-bg text-success-fg cursor-pointer font-[inherit] relative"),
						onClick: C,
						children: "Finalize"
					}),
					/* @__PURE__ */ M("div", {
						className: p("relative"),
						children: [/* @__PURE__ */ j("button", {
							type: "button",
							className: p("py-1.5 px-3 text-[13px] font-medium border border-border-field rounded-md bg-surface text-text-primary cursor-pointer font-[inherit] relative tracking-wider"),
							onClick: () => O((e) => !e),
							title: "More actions",
							children: "⋯"
						}), D && /* @__PURE__ */ M("div", {
							className: p("absolute top-full right-0 mt-1 bg-surface border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50 min-w-[160px] overflow-hidden"),
							children: [
								/* @__PURE__ */ j("button", {
									type: "button",
									className: p("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover"),
									onClick: () => {
										o(), O(!1);
									},
									children: "History"
								}),
								c && (T ?? 0) > 0 && /* @__PURE__ */ M("button", {
									type: "button",
									className: p("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover"),
									onClick: () => {
										c(), O(!1);
									},
									children: [
										"Past Calls (",
										T,
										")"
									]
								}),
								E?.map((e) => /* @__PURE__ */ j("button", {
									type: "button",
									"data-testid": `document-header-menu-${e.id}`,
									className: p("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover"),
									onClick: () => {
										e.onSelect(), O(!1);
									},
									children: e.label
								}, e.id)),
								/* @__PURE__ */ j("div", { className: p("border-t border-border-subtle my-1") }),
								[
									"markdown",
									"pdf",
									"json"
								].map((e) => /* @__PURE__ */ M("button", {
									type: "button",
									className: p("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover"),
									onClick: () => {
										a(e), O(!1);
									},
									children: ["Export ", e.charAt(0).toUpperCase() + e.slice(1)]
								}, e)),
								/* @__PURE__ */ j("div", { className: p("border-t border-border-subtle my-1") }),
								/* @__PURE__ */ j("button", {
									type: "button",
									className: p("block w-full py-2 px-3.5 text-[13px] border-none bg-transparent text-danger-fg text-left cursor-pointer font-[inherit] hover:bg-danger-bg"),
									onClick: () => {
										O(!1), window.confirm("Clear all document content? This cannot be undone.") && f();
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
//#region src/components/doc-editor/FollowModeBar.tsx
function Ne({ followingUserId: e, participants: t, onStopFollow: n }) {
	let r = O(null), i = m(n);
	if (T(() => {
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
	return a ? /* @__PURE__ */ M("div", {
		className: p("flex items-center justify-center gap-2 px-4 py-1.5 bg-info-bg border-b border-info-border text-[13px] font-medium text-info-fg shrink-0"),
		children: [/* @__PURE__ */ M("span", { children: ["Following ", a.displayName] }), /* @__PURE__ */ j("button", {
			onClick: n,
			className: p("bg-transparent border border-info-border rounded px-2 py-0.5 text-xs font-semibold text-info-fg cursor-pointer font-[inherit]"),
			children: "Stop"
		})]
	}) : null;
}
//#endregion
//#region src/components/ui/Panel.tsx
var Pe = ({ children: e, variant: t = "light", width: n = 320, style: r }) => typeof document > "u" ? null : P(/* @__PURE__ */ j("div", {
	className: p("fixed right-0 top-0 h-full z-[60] flex flex-col shadow-[-4px_0_12px_rgba(0,0,0,0.08)]", t === "dark" ? "bg-call-chrome" : "bg-surface"),
	style: {
		width: n,
		...r
	},
	children: e
}), document.body), Fe = ({ title: e, onClose: t, actions: n, variant: r = "light" }) => {
	let i = r === "dark";
	return /* @__PURE__ */ M("div", {
		className: p("flex items-center justify-between px-4 py-2", i ? "border-b border-white/10" : "border-b border-border"),
		children: [/* @__PURE__ */ j("span", {
			className: p("text-[13px] font-semibold", i ? "text-white" : "text-text-primary"),
			children: e
		}), /* @__PURE__ */ M("div", {
			className: "flex items-center gap-1",
			children: [n, /* @__PURE__ */ j("button", {
				type: "button",
				onClick: t,
				className: p("w-[22px] h-[22px] flex items-center justify-center", "bg-transparent border-none rounded-sm cursor-pointer", "text-sm p-0 leading-none", i ? "text-text-tertiary" : "text-text-secondary"),
				"aria-label": "Close panel",
				children: "×"
			})]
		})]
	});
}, Ie = ({ children: e, padding: t }) => /* @__PURE__ */ j("div", {
	className: "flex-1 overflow-y-auto",
	style: { padding: t ?? "14px 12px" },
	children: e
}), Le = {
	default: "bg-surface text-text-primary border border-border",
	primary: "bg-success text-white border border-success",
	danger: "bg-danger text-white border border-danger"
}, Re = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-[13px]"
}, J = ({ variant: e = "default", size: t = "md", style: n, type: r = "button", className: i, ...a }) => /* @__PURE__ */ j("button", {
	type: r,
	className: p("rounded-sm cursor-pointer font-medium leading-[1.4]", Le[e], Re[t], i),
	style: n,
	...a
}), ze = ({ active: e = !1, activeColor: t = "rgba(255,255,255,0.1)", size: n = 36, style: r, type: i = "button", className: a, ...o }) => /* @__PURE__ */ j("button", {
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
function Be({ participant: e, isSpeaking: t }) {
	let n = O(null);
	return T(() => {
		let t = n.current, r = e.streams[0] ?? null;
		t && r && t.srcObject !== r && (t.srcObject = r);
	}, [e.streams]), /* @__PURE__ */ M("div", {
		className: p("relative bg-video-tile rounded-lg overflow-hidden transition-shadow duration-300", t ? "video-tile-speaking" : "video-tile-idle"),
		children: [
			/* @__PURE__ */ j("video", {
				ref: n,
				autoPlay: !0,
				playsInline: !0,
				muted: e.isLocal,
				className: p("w-full h-full object-cover")
			}),
			/* @__PURE__ */ j("div", { className: p("absolute bottom-0 left-0 right-0 h-9 bg-gradient-to-t from-black/50 to-transparent pointer-events-none") }),
			/* @__PURE__ */ M("div", {
				className: p("absolute bottom-1.5 left-1.5 flex items-center gap-1 bg-black/60 text-white text-[11px] font-medium px-2 py-[3px] rounded-full"),
				children: [
					t && /* @__PURE__ */ j("span", { className: p("w-[5px] h-[5px] rounded-full bg-success") }),
					/* @__PURE__ */ j("span", { children: e.userId }),
					e.isLocal && /* @__PURE__ */ j("span", {
						className: p("opacity-50"),
						children: "(You)"
					})
				]
			})
		]
	});
}
function Ve({ stream: e, userId: t, cameraStream: n, isLocal: r }) {
	let i = O(null), a = O(null);
	return T(() => {
		let t = i.current;
		t && t.srcObject !== e && (t.srcObject = e);
	}, [e]), T(() => {
		let e = a.current;
		e && n && e.srcObject !== n && (e.srcObject = n);
	}, [n]), /* @__PURE__ */ M("div", {
		className: p("relative bg-black rounded-[10px] overflow-hidden border-2 border-info aspect-video"),
		children: [
			/* @__PURE__ */ j("video", {
				ref: i,
				autoPlay: !0,
				playsInline: !0,
				muted: !0,
				className: p("w-full h-full object-contain")
			}),
			r && n && /* @__PURE__ */ j("video", {
				ref: a,
				autoPlay: !0,
				playsInline: !0,
				muted: !0,
				className: p("absolute bottom-2 right-2 w-36 object-cover rounded-lg border-2 border-white/30 aspect-video")
			}),
			/* @__PURE__ */ M("div", {
				className: p("absolute bottom-1.5 left-1.5 bg-[rgba(59,130,246,0.8)] text-white text-[11px] font-medium px-2 py-[3px] rounded-full"),
				children: [t, "'s screen"]
			})
		]
	});
}
function He({ stageToken: e, participantId: t, userId: n, onEndCall: r }) {
	let { participants: i, isJoined: a, isScreenSharing: o, error: s, toggleMute: c, toggleCamera: l, startScreenShare: u, stopScreenShare: d, leave: f } = x({
		stageToken: e,
		userId: n,
		participantId: t
	}), { activeSpeakerId: m } = S({ participants: i }), [h, g] = k(!1), [_, v] = k(!1), [y, b] = k(!1), C = D(() => i.map((e) => ({
		...e,
		isSpeaking: e.participantId === m
	})), [i, m]), w = C.find((e) => e.screenStream);
	return s ? /* @__PURE__ */ M("div", {
		className: p("p-4 text-center text-danger-fg text-[13px]"),
		children: [
			s,
			/* @__PURE__ */ j("br", {}),
			/* @__PURE__ */ j(J, {
				onClick: r,
				className: "mt-3",
				children: "Close"
			})
		]
	}) : a ? /* @__PURE__ */ M("div", {
		className: p("flex flex-col"),
		onMouseEnter: () => b(!0),
		onMouseLeave: () => b(!1),
		children: [
			w?.screenStream && /* @__PURE__ */ j("div", {
				className: p("p-1.5 pb-0"),
				children: /* @__PURE__ */ j(Ve, {
					stream: w.screenStream,
					userId: w.userId,
					cameraStream: w.streams[0],
					isLocal: w.isLocal
				})
			}),
			/* @__PURE__ */ j("div", {
				className: p("flex-1 grid gap-1 p-1.5 content-start", C.length <= 1 ? "grid-cols-1" : "grid-cols-2"),
				children: C.map((e) => /* @__PURE__ */ j(Be, {
					participant: e,
					isSpeaking: e.isSpeaking
				}, e.participantId))
			}),
			/* @__PURE__ */ M("div", {
				className: p("flex justify-center gap-1 px-2 py-1.5 border-t border-code-raised shrink-0 transition-opacity duration-200", y ? "opacity-100" : "opacity-0"),
				children: [
					/* @__PURE__ */ j(ze, {
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
					/* @__PURE__ */ j(ze, {
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
					/* @__PURE__ */ j(ze, {
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
					/* @__PURE__ */ j(ze, {
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
			/* @__PURE__ */ M("div", {
				className: p("text-center text-[10px] text-text-secondary py-1"),
				children: [i.length, " in call"]
			})
		]
	}) : /* @__PURE__ */ j("div", {
		className: p("p-5 text-center text-text-secondary text-[13px]"),
		children: "Connecting to video..."
	});
}
function Ue({ documentId: e, userId: t, idToken: n, meta: r, updateMeta: i, sendMessage: a, onClose: o, onDockToSidebar: s, isDocked: l, onUndock: u, onCallEnd: d }) {
	let { callState: f, stageToken: m, participantId: h, userId: g, error: _, hasActiveCall: v, startCall: y, joinCall: b, endCall: x } = c({
		documentId: e,
		idToken: n,
		meta: r,
		updateMeta: i,
		sendMessage: a,
		displayName: t
	}), S = O(f);
	T(() => {
		S.current === "active" && f === "idle" && d?.(), S.current = f;
	}, [f, d]);
	let C = r?.activeCallSessionId;
	return /* @__PURE__ */ M("div", {
		className: p("bg-call-chrome border border-code-raised rounded-xl overflow-hidden"),
		children: [/* @__PURE__ */ M("div", {
			className: p("flex items-center justify-between px-2 py-1 border-b border-code-raised shrink-0"),
			children: [/* @__PURE__ */ j("span", {
				className: p("text-[11px] font-semibold text-text-tertiary m-0"),
				children: "Video"
			}), /* @__PURE__ */ M("div", {
				className: p("flex items-center gap-0.5"),
				children: [
					s && !l && /* @__PURE__ */ j("button", {
						type: "button",
						onClick: s,
						title: "Dock to sidebar",
						className: p("w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-text-tertiary cursor-pointer text-xs leading-none p-0"),
						children: "←"
					}),
					l && u && /* @__PURE__ */ j("button", {
						type: "button",
						onClick: u,
						title: "Undock from sidebar",
						className: p("w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-text-tertiary cursor-pointer text-xs leading-none p-0"),
						children: "→"
					}),
					/* @__PURE__ */ j("button", {
						type: "button",
						onClick: o,
						title: "Close video",
						className: p("w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-transparent text-text-tertiary cursor-pointer text-sm leading-none p-0"),
						children: "✕"
					})
				]
			})]
		}), /* @__PURE__ */ M("div", { children: [
			f === "active" && m && h && g && /* @__PURE__ */ j(He, {
				stageToken: m,
				participantId: h,
				userId: g,
				onEndCall: x
			}),
			(f === "creating" || f === "joining") && /* @__PURE__ */ j("div", {
				className: p("p-4 text-center text-text-tertiary text-[13px]"),
				children: f === "creating" ? "Starting call..." : "Joining call..."
			}),
			f === "error" && /* @__PURE__ */ M("div", {
				className: p("p-4 text-center"),
				children: [/* @__PURE__ */ j("div", {
					className: p("text-code-red text-[13px] mb-3"),
					children: _
				}), /* @__PURE__ */ j(J, {
					variant: "primary",
					onClick: () => y(),
					children: "Try Again"
				})]
			}),
			f === "idle" && /* @__PURE__ */ j("div", {
				className: p("p-4 text-center"),
				children: v && C ? /* @__PURE__ */ M(A, { children: [/* @__PURE__ */ j("div", {
					className: p("text-[13px] text-code-subtle mb-3"),
					children: "A call is in progress on this document."
				}), /* @__PURE__ */ j(J, {
					variant: "primary",
					onClick: () => b(C),
					children: "Join Call"
				})] }) : /* @__PURE__ */ M(A, { children: [/* @__PURE__ */ j("div", {
					className: p("text-[13px] text-text-tertiary mb-3"),
					children: "Start a video call with collaborators on this document."
				}), /* @__PURE__ */ j(J, {
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
var We = {
	summary: "#8b5cf6",
	tasks: "#3b82f6",
	decisions: "#f59e0b",
	notes: "#6b7280",
	custom: "#10b981"
};
function Ge(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
var Ke = 3;
function qe({ participants: e }) {
	if (!e || e.length === 0) return null;
	let t = e.slice(0, Ke), n = e.length - Ke;
	return /* @__PURE__ */ M("div", {
		className: p("flex items-center ml-auto shrink-0"),
		children: [t.map((e, t) => /* @__PURE__ */ M("div", {
			title: `${e.displayName} (${e.mode})`,
			className: p("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold border-2 border-white relative transition-transform duration-200"),
			style: {
				background: `linear-gradient(135deg, ${e.color || "#3b82f6"}, ${Je(e.color || "#3b82f6", .2)})`,
				marginLeft: t === 0 ? 0 : -8,
				zIndex: Ke - t
			},
			children: [Ge(e.displayName), /* @__PURE__ */ j("div", { className: p("absolute bottom-0 right-0 w-2 h-2 rounded-full bg-success border-2 border-white") })]
		}, e.clientId)), n > 0 && /* @__PURE__ */ M("div", {
			className: p("w-6 h-6 rounded-full bg-border text-neutral flex items-center justify-center text-[9px] font-bold border-2 border-white relative -ml-2"),
			children: ["+", n]
		})]
	});
}
function Je(e, t) {
	let n = e.replace("#", ""), r = parseInt(n, 16), i = Math.max(0, (r >> 16 & 255) * (1 - t)), a = Math.max(0, (r >> 8 & 255) * (1 - t)), o = Math.max(0, (r & 255) * (1 - t));
	return `rgb(${Math.round(i)}, ${Math.round(a)}, ${Math.round(o)})`;
}
function Ye({ section: e, fragment: n, ydoc: r, provider: i, user: a, editable: o, onUpdateSection: s, onAddItem: c, onUpdateItem: l, onRemoveItem: u, participants: d, onFocus: f, isFocused: m, comments: g, onUpdateCursorInfo: _, commentCount: b = 0, onOpenComments: x, commentPresence: S }) {
	let [C, w] = k(e.collapsed), T = () => {
		let e = !C;
		w(e), s({ collapsed: e });
	}, E = t(e.sectionType ?? e.type, "editor") ?? y, D = d && d.length > 0, O = D ? d[0].color || "#3b82f6" : "transparent", [A, N] = k(!1);
	return /* @__PURE__ */ M("div", {
		id: `section-${e.id}`,
		"data-testid": `section-block-${e.id}`,
		className: p("border border-border rounded-lg mb-4 bg-surface relative transition-[border-left,box-shadow] duration-300 ease-in-out"),
		style: {
			borderLeft: D ? `3px solid ${O}` : "1px solid #e2e8f0",
			boxShadow: m ? "0 0 0 2px rgba(59, 130, 246, 0.3)" : "none"
		},
		onClickCapture: f,
		onFocusCapture: f,
		children: [
			x && /* @__PURE__ */ M("button", {
				type: "button",
				onClick: (t) => {
					t.stopPropagation(), x(e.id);
				},
				onMouseEnter: () => N(!0),
				onMouseLeave: () => N(!1),
				className: p("absolute top-1/2 -right-[52px] -translate-y-1/2 w-10 h-10 rounded-full border border-border flex items-center justify-center text-xl leading-none p-0 z-[1] shadow-sm cursor-pointer transition-[opacity,background] duration-150 ease-in-out", A ? "bg-surface-hover opacity-90" : "bg-surface opacity-40"),
				title: "Open comments",
				children: [
					/* @__PURE__ */ j("span", {
						className: p("pointer-events-none"),
						children: "💬"
					}),
					b > 0 && /* @__PURE__ */ j("span", {
						className: p("absolute -top-1 -right-1 min-w-[16px] h-4 rounded-lg bg-info text-white text-[10px] font-bold flex items-center justify-center px-1 leading-none"),
						children: b
					}),
					S && S.length > 0 && /* @__PURE__ */ j("span", {
						className: p("absolute -left-1 top-1/2 -translate-y-1/2 flex flex-col gap-0.5"),
						children: S.slice(0, 3).map((e) => /* @__PURE__ */ j("span", {
							title: e.displayName,
							className: p("w-2 h-2 rounded-full border border-white block"),
							style: { background: e.color || "#3b82f6" }
						}, e.clientId))
					})
				]
			}),
			/* @__PURE__ */ M("div", {
				className: p("flex items-center gap-2 py-2.5 px-3.5 bg-surface-panel border-b border-border rounded-t-lg"),
				children: [
					/* @__PURE__ */ j("button", {
						type: "button",
						onClick: T,
						className: p("border-none bg-transparent cursor-pointer text-xs p-1 text-neutral leading-none rounded inline-flex items-center justify-center transition-[background,transform] duration-200 ease-in-out hover:bg-border", C ? "-rotate-90" : "rotate-0"),
						title: C ? "Expand section" : "Collapse section",
						children: /* @__PURE__ */ j("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: /* @__PURE__ */ j("polyline", { points: "6 9 12 15 18 9" })
						})
					}),
					/* @__PURE__ */ j(h, {
						value: e.title,
						onChange: (e) => s({ title: e.target.value }),
						readOnly: !o,
						className: p("flex-1 h-auto border-transparent bg-transparent text-[15px] font-semibold py-0.5 px-1.5 cursor-text")
					}),
					/* @__PURE__ */ j("span", {
						className: p("py-0.5 px-2.5 text-[11px] font-semibold rounded-xl text-white capitalize whitespace-nowrap"),
						style: { background: We[e.type] },
						children: e.type
					}),
					/* @__PURE__ */ j(qe, { participants: d ?? [] })
				]
			}),
			!C && /* @__PURE__ */ j("div", {
				className: p("p-3.5"),
				children: /* @__PURE__ */ j(v, {
					name: `section:${e.id}`,
					children: /* @__PURE__ */ j(E, {
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
						onUpdateCursorInfo: _,
						comments: g,
						commentCount: b,
						onOpenComments: x
					})
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/SectionList.tsx
function Xe({ sections: e, getSectionFragment: t, ydoc: n, provider: r, user: i, editable: a, onUpdateSection: o, onAddItem: s, onUpdateItem: c, onRemoveItem: l, participants: u, onSectionFocus: d, focusedSectionId: f, comments: m, onAddComment: h, onResolveThread: g, onUnresolveThread: _, onUpdateCursorInfo: v, onOpenComments: y }) {
	return /* @__PURE__ */ j("div", {
		className: p("flex flex-col gap-0 pb-4"),
		children: e.map((e) => /* @__PURE__ */ j(Ye, {
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
function Ze(e) {
	return `ws_attachments_${e}`;
}
function Y(e) {
	try {
		let t = localStorage.getItem(Ze(e));
		return t ? JSON.parse(t) : [];
	} catch {
		return [];
	}
}
function X(e) {
	let [t, n] = k(() => Y(e));
	T(() => {
		n(Y(e));
	}, [e]);
	let r = (t) => {
		localStorage.setItem(Ze(e), JSON.stringify(t)), n(t);
	};
	return {
		attachments: t,
		addFile: (t, n) => {
			r([...Y(e), {
				id: crypto.randomUUID(),
				kind: "file",
				name: t.trim(),
				url: n.trim(),
				addedAt: (/* @__PURE__ */ new Date()).toISOString()
			}]);
		},
		addDocumentLink: (t) => {
			r([...Y(e), {
				id: crypto.randomUUID(),
				kind: "document",
				title: t.trim(),
				addedAt: (/* @__PURE__ */ new Date()).toISOString()
			}]);
		},
		remove: (t) => {
			r(Y(e).filter((e) => e.id !== t));
		}
	};
}
function Qe({ onAdd: e, onCancel: t }) {
	let [n, r] = k(""), [i, a] = k(""), o = n.trim().length > 0 && i.trim().length > 0;
	return /* @__PURE__ */ M("div", {
		className: p("flex gap-2 items-start flex-wrap"),
		children: [
			/* @__PURE__ */ j(h, {
				autoFocus: !0,
				placeholder: "File name",
				value: n,
				onChange: (e) => r(e.target.value),
				className: p("flex-1 min-w-[120px]")
			}),
			/* @__PURE__ */ j(h, {
				placeholder: "URL or path",
				value: i,
				onChange: (e) => a(e.target.value),
				onKeyDown: (t) => {
					t.key === "Enter" && o && e(n, i);
				},
				className: p("flex-[2] min-w-[120px]")
			}),
			/* @__PURE__ */ j("button", {
				type: "button",
				disabled: !o,
				onClick: () => {
					o && e(n, i);
				},
				className: p("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"),
				children: "Attach"
			}),
			/* @__PURE__ */ j("button", {
				type: "button",
				onClick: t,
				className: p("px-3 py-1.5 text-[13px] bg-transparent border-none text-neutral cursor-pointer font-[inherit] shrink-0"),
				children: "Cancel"
			})
		]
	});
}
function $e({ onAdd: e, onCancel: t }) {
	let [n, r] = k(""), i = n.trim().length > 0;
	return /* @__PURE__ */ M("div", {
		className: p("flex gap-2 items-center flex-wrap"),
		children: [
			/* @__PURE__ */ j(h, {
				autoFocus: !0,
				placeholder: "Document name",
				value: n,
				onChange: (e) => r(e.target.value),
				onKeyDown: (t) => {
					t.key === "Enter" && i && e(n);
				},
				className: p("flex-1 min-w-[120px]")
			}),
			/* @__PURE__ */ j("button", {
				type: "button",
				disabled: !i,
				onClick: () => {
					i && e(n);
				},
				className: p("px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"),
				children: "Link"
			}),
			/* @__PURE__ */ j("button", {
				type: "button",
				onClick: t,
				className: p("px-3 py-1.5 text-[13px] bg-transparent border-none text-neutral cursor-pointer font-[inherit] shrink-0"),
				children: "Cancel"
			})
		]
	});
}
function et({ attachment: e, onRemove: t, editable: n }) {
	let r = e.kind === "file";
	return /* @__PURE__ */ M("div", {
		className: p("flex items-center gap-2.5 px-2.5 py-[7px] rounded-md bg-surface-panel border border-border"),
		children: [
			/* @__PURE__ */ j("span", {
				className: p("text-sm shrink-0 text-neutral"),
				children: r ? "📎" : "📄"
			}),
			/* @__PURE__ */ M("div", {
				className: p("flex-1 min-w-0"),
				children: [r ? /* @__PURE__ */ j("a", {
					href: e.url,
					target: "_blank",
					rel: "noopener noreferrer",
					className: p("text-[13px] text-info-fg font-medium no-underline hover:underline"),
					children: e.name
				}) : /* @__PURE__ */ j("span", {
					className: p("text-[13px] text-text-primary font-medium"),
					children: e.title
				}), /* @__PURE__ */ j("div", {
					className: p("text-[11px] text-text-tertiary mt-px"),
					children: r ? e.url : "Linked document"
				})]
			}),
			n && /* @__PURE__ */ j("button", {
				type: "button",
				onClick: t,
				title: "Remove",
				className: p("bg-transparent border-none cursor-pointer text-danger-fg text-sm px-[5px] py-0.5 opacity-50 leading-none rounded shrink-0 hover:opacity-100"),
				children: "×"
			})
		]
	});
}
function tt({ documentId: e, editable: t }) {
	let { attachments: n, addFile: r, addDocumentLink: i, remove: a } = X(e), [o, s] = k(null), c = n.length > 0;
	return /* @__PURE__ */ M("div", {
		className: p("mt-4 border border-border rounded-[10px] overflow-hidden"),
		children: [
			/* @__PURE__ */ M("div", {
				className: p("flex items-center justify-between px-3.5 py-2.5 bg-surface-panel", c || o ? "border-b border-border" : ""),
				children: [/* @__PURE__ */ M("span", {
					className: p("text-[13px] font-semibold text-text-primary"),
					children: ["Attachments", c && /* @__PURE__ */ j("span", {
						className: p("ml-1.5 text-[11px] text-text-tertiary font-normal"),
						children: n.length
					})]
				}), t && o === null && /* @__PURE__ */ M("div", {
					className: p("flex gap-1.5"),
					children: [/* @__PURE__ */ j("button", {
						type: "button",
						onClick: () => s("file"),
						className: p("text-xs px-2.5 py-1 font-semibold bg-surface border border-border-field rounded-[5px] cursor-pointer font-[inherit] text-text-primary"),
						children: "+ File"
					}), /* @__PURE__ */ j("button", {
						type: "button",
						onClick: () => s("document"),
						className: p("text-xs px-2.5 py-1 font-semibold bg-surface border border-border-field rounded-[5px] cursor-pointer font-[inherit] text-text-primary"),
						children: "+ Document"
					})]
				})]
			}),
			c && /* @__PURE__ */ j("div", {
				className: p("flex flex-col gap-1.5 px-3.5 py-2.5"),
				children: n.map((e) => /* @__PURE__ */ j(et, {
					attachment: e,
					onRemove: () => a(e.id),
					editable: t
				}, e.id))
			}),
			o === "file" && /* @__PURE__ */ j("div", {
				className: p("px-3.5 py-2.5", c ? "border-t border-border" : ""),
				children: /* @__PURE__ */ j(Qe, {
					onAdd: (e, t) => {
						r(e, t), s(null);
					},
					onCancel: () => s(null)
				})
			}),
			o === "document" && /* @__PURE__ */ j("div", {
				className: p("px-3.5 py-2.5", c ? "border-t border-border" : ""),
				children: /* @__PURE__ */ j($e, {
					onAdd: (e) => {
						i(e), s(null);
					},
					onCancel: () => s(null)
				})
			}),
			!c && !o && /* @__PURE__ */ j("div", {
				className: p("px-3.5 py-3.5 text-xs text-text-tertiary text-center"),
				children: t ? "No attachments yet — add a file or link a document above." : "No attachments."
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/MentionDropdown.tsx
function nt(e) {
	let t = e.trim().split(/\s+/);
	return t.length === 0 ? "?" : t.length === 1 ? t[0].charAt(0).toUpperCase() : (t[0].charAt(0) + t[t.length - 1].charAt(0)).toUpperCase();
}
var rt = C(function({ query: e, users: t, position: n, onSelect: r, onDismiss: i }, a) {
	let [o, s] = k(0), c = O(null), l = t.filter((t) => t.displayName.toLowerCase().includes(e.toLowerCase())).slice(0, 6);
	T(() => {
		s(0);
	}, [e]), T(() => {
		let e = c.current;
		if (!e) return;
		let t = e.children[o];
		t && t.scrollIntoView({ block: "nearest" });
	}, [o]);
	let u = w((e) => e.key === "ArrowDown" ? (e.preventDefault(), s((e) => (e + 1) % Math.max(l.length, 1)), !0) : e.key === "ArrowUp" ? (e.preventDefault(), s((e) => (e - 1 + Math.max(l.length, 1)) % Math.max(l.length, 1)), !0) : e.key === "Enter" || e.key === "Tab" ? (e.preventDefault(), l.length > 0 && r(l[o]), !0) : e.key === "Escape" && (e.preventDefault(), i(), !0), [
		l,
		o,
		r,
		i
	]);
	return E(a, () => ({ handleKeyDown: u }), [u]), N.createPortal(/* @__PURE__ */ j("div", {
		ref: c,
		role: "listbox",
		className: p("fixed z-[1000] bg-surface border border-border rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.12)] max-h-60 overflow-y-auto min-w-[200px]"),
		style: {
			top: n.top,
			left: n.left
		},
		children: l.length === 0 ? /* @__PURE__ */ j("div", {
			className: p("px-4 py-3 text-[13px] text-text-tertiary text-center"),
			children: "No users found"
		}) : l.map((e, t) => /* @__PURE__ */ M("div", {
			role: "option",
			"aria-selected": t === o,
			className: p("flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors duration-100", t === o ? "bg-info-bg" : "bg-transparent"),
			onMouseEnter: () => s(t),
			onMouseDown: (t) => {
				t.preventDefault(), r(e);
			},
			children: [/* @__PURE__ */ j("div", {
				className: p("w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[11px] font-semibold text-white leading-none"),
				style: { background: e.color },
				children: e.type === "group" ? "#" : nt(e.displayName)
			}), /* @__PURE__ */ M("div", {
				className: p("flex items-center gap-1.5 flex-1 min-w-0"),
				children: [
					/* @__PURE__ */ j("span", {
						className: p("text-[13px] font-medium text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
						children: e.type === "group" ? `@${e.displayName.toLowerCase()}` : e.displayName
					}),
					e.type === "user" && /* @__PURE__ */ j("span", { className: p("w-2 h-2 rounded-full shrink-0", e.online ? "bg-success" : "bg-text-disabled") }),
					e.type === "user" && e.mode && /* @__PURE__ */ j("span", {
						className: p("text-[11px] text-text-tertiary shrink-0"),
						children: e.mode
					}),
					e.type === "group" && e.memberCount != null && /* @__PURE__ */ M("span", {
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
function it(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function at(e) {
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
function ot(e) {
	let t = 0;
	for (let n of e) t += 1 + ot(n.replies);
	return t;
}
function st(e) {
	return e.split(/(@[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)*)/g).map((e, t) => e.startsWith("@") && /^@[A-Z]/.test(e) ? /* @__PURE__ */ j("span", {
		className: p("text-info-fg font-semibold bg-info-bg px-0.5 rounded-sm"),
		children: e
	}, t) : e);
}
var Z = {
	active: !1,
	query: "",
	position: {
		top: 0,
		left: 0
	},
	atIndex: -1
};
function ct(e, t, n) {
	let r = t - 1;
	for (; r >= 0 && e[r] !== "@" && e[r] !== " " && e[r] !== "\n";) r--;
	if (r < 0 || e[r] !== "@" || r > 0 && e[r - 1] !== " " && e[r - 1] !== "\n") return Z;
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
function lt(e, t, n) {
	let r = e.slice(0, t.atIndex), i = e.slice(t.atIndex + 1 + t.query.length), a = `@${n.displayName} `;
	return {
		newValue: r + a + i,
		newCursor: r.length + a.length
	};
}
function ut({ comment: e, depth: t, onReply: n, mentionUsers: r, onResolveThread: i, onUnresolveThread: a }) {
	let [o, s] = k(!1), [c, l] = k(""), [u, d] = k(!1), f = O(null), m = O(null), [h, v] = k(Z), [y, b] = k(!1), x = t === 0 && !!e.resolved, S = Math.min(t, 5), C = () => {
		if (h.active) return;
		let t = c.trim();
		t && (n(e.id, t), l(""), s(!1), v(Z));
	}, T = (e) => {
		let t = e.target.value;
		l(t);
		let n = ct(t, e.target.selectionStart ?? t.length, f.current);
		v(n);
	}, E = w((e) => {
		let { newValue: t, newCursor: n } = lt(c, h, e);
		l(t), v(Z), requestAnimationFrame(() => {
			let e = f.current;
			e && (e.focus(), e.setSelectionRange(n, n));
		});
	}, [c, h]), D = (e) => {
		h.active && m.current && m.current.handleKeyDown(e) || (e.key === "Enter" && !e.shiftKey && (e.preventDefault(), C()), e.key === "Escape" && s(!1));
	}, A = u ? e.color : t === 0 ? "var(--color-border)" : "var(--color-border-emphasis)";
	return x && !y ? /* @__PURE__ */ j("div", {
		className: p(S > 0 ? "ml-5" : "ml-0"),
		children: /* @__PURE__ */ M("div", {
			role: "button",
			tabIndex: 0,
			"aria-expanded": !1,
			className: p("bg-success-bg border-l-[3px] border-l-success px-3 py-2 mb-1 rounded cursor-pointer flex items-center justify-between"),
			onClick: () => b(!0),
			onKeyDown: _(() => b(!0)),
			children: [/* @__PURE__ */ M("div", {
				className: p("flex items-center gap-1.5"),
				children: [
					/* @__PURE__ */ j("span", {
						className: p("text-success-fg text-xs"),
						children: "✔"
					}),
					/* @__PURE__ */ M("span", {
						className: p("text-success-fg text-xs font-semibold"),
						children: ["Resolved by ", e.resolvedBy]
					}),
					e.resolvedAt && /* @__PURE__ */ j("span", {
						className: p("text-code-green text-[11px]"),
						children: at(e.resolvedAt)
					}),
					/* @__PURE__ */ j("span", {
						className: p("text-text-tertiary text-[11px] ml-1"),
						children: "— click to expand"
					})
				]
			}), /* @__PURE__ */ j("button", {
				type: "button",
				onClick: (t) => {
					t.stopPropagation(), a?.(e.id);
				},
				className: p("bg-transparent border border-border-emphasis rounded px-2 py-0.5 text-neutral text-[11px] cursor-pointer font-[inherit]"),
				children: "Reopen"
			})]
		})
	}) : /* @__PURE__ */ M("div", {
		className: p(S > 0 ? "ml-5" : "ml-0", x ? "opacity-60" : ""),
		children: [
			x && y && /* @__PURE__ */ M("div", {
				role: "button",
				tabIndex: 0,
				"aria-expanded": !0,
				className: p("bg-success-bg border-l-[3px] border-l-success px-3 py-2 mb-1 rounded cursor-pointer flex items-center justify-between"),
				onClick: () => b(!1),
				onKeyDown: _(() => b(!1)),
				children: [/* @__PURE__ */ M("div", {
					className: p("flex items-center gap-1.5"),
					children: [
						/* @__PURE__ */ j("span", {
							className: p("text-success-fg text-xs"),
							children: "✔"
						}),
						/* @__PURE__ */ M("span", {
							className: p("text-success-fg text-xs font-semibold"),
							children: ["Resolved by ", e.resolvedBy]
						}),
						e.resolvedAt && /* @__PURE__ */ j("span", {
							className: p("text-code-green text-[11px]"),
							children: at(e.resolvedAt)
						}),
						/* @__PURE__ */ j("span", {
							className: p("text-text-tertiary text-[11px] ml-1"),
							children: "— click to collapse"
						})
					]
				}), /* @__PURE__ */ j("button", {
					type: "button",
					onClick: (t) => {
						t.stopPropagation(), a?.(e.id);
					},
					className: p("bg-transparent border border-border-emphasis rounded px-2 py-0.5 text-neutral text-[11px] cursor-pointer font-[inherit]"),
					children: "Reopen"
				})]
			}),
			/* @__PURE__ */ M("div", {
				className: p("px-3 py-2 mb-1 transition-colors duration-200"),
				style: { borderLeft: `3px solid ${A}` },
				onMouseEnter: () => d(!0),
				onMouseLeave: () => d(!1),
				children: [
					/* @__PURE__ */ M("div", {
						className: p("flex items-center gap-1.5 mb-1"),
						children: [
							/* @__PURE__ */ j("div", {
								className: p("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold shrink-0"),
								style: { background: `linear-gradient(135deg, ${e.color}, ${e.color}dd)` },
								children: it(e.displayName)
							}),
							/* @__PURE__ */ j("span", {
								className: p("font-semibold text-[13px] text-text-primary"),
								children: e.displayName
							}),
							/* @__PURE__ */ j("span", {
								className: p("text-[11px] text-text-tertiary"),
								children: at(e.timestamp)
							})
						]
					}),
					/* @__PURE__ */ j("div", {
						className: p("text-[13px] leading-normal text-text-primary pl-[30px] whitespace-pre-wrap"),
						children: st(e.text)
					}),
					/* @__PURE__ */ M("div", {
						className: p("pl-[30px] mt-1 flex gap-2"),
						children: [/* @__PURE__ */ j("button", {
							type: "button",
							onClick: () => {
								s(!o), o || setTimeout(() => f.current?.focus(), 50);
							},
							className: p("bg-transparent border-none text-neutral text-xs cursor-pointer py-0.5 px-0 font-[inherit]"),
							children: "Reply"
						}), t === 0 && !x && i && /* @__PURE__ */ M("button", {
							type: "button",
							onClick: () => i(e.id),
							className: p("bg-transparent border-none text-neutral text-xs cursor-pointer py-0.5 px-0 font-[inherit]"),
							children: ["✔", " Resolve"]
						})]
					}),
					o && /* @__PURE__ */ M("div", {
						className: p("pl-[30px] mt-2 overflow-hidden animate-[sectionCommentsSlideDown_0.2s_ease-out]"),
						children: [/* @__PURE__ */ M("div", {
							className: p("relative"),
							children: [/* @__PURE__ */ j(g, {
								ref: f,
								value: c,
								onChange: T,
								onKeyDown: D,
								placeholder: "Write a reply... (type @ to mention)",
								rows: 2,
								className: p("resize-y min-h-12")
							}), h.active && /* @__PURE__ */ j(rt, {
								ref: m,
								query: h.query,
								users: r,
								position: h.position,
								onSelect: E,
								onDismiss: () => v(Z)
							})]
						}), /* @__PURE__ */ M("div", {
							className: p("flex gap-1.5 mt-1.5"),
							children: [/* @__PURE__ */ j("button", {
								type: "button",
								onClick: C,
								className: p("px-3 py-1 text-xs font-semibold border-none rounded-md bg-info text-white cursor-pointer font-[inherit]"),
								children: "Reply"
							}), /* @__PURE__ */ j("button", {
								type: "button",
								onClick: () => s(!1),
								className: p("px-3 py-1 text-xs font-medium border border-border rounded-md bg-transparent text-neutral cursor-pointer font-[inherit]"),
								children: "Cancel"
							})]
						})]
					})
				]
			}),
			e.replies.map((e) => /* @__PURE__ */ j(ut, {
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
function dt({ comments: e, onAddComment: t, participants: n = [], onResolveThread: i, onUnresolveThread: a }) {
	let [o, s] = k(!0), [c, l] = k(""), u = O(null), d = O(null), [f, m] = k(Z), h = r(n), _ = ot(e), [v, y] = k(!0), b = [...e].sort((e, t) => {
		if (e.resolved && !t.resolved) return 1;
		if (!e.resolved && t.resolved) return -1;
		let n = new Date(e.timestamp).getTime(), r = new Date(t.timestamp).getTime();
		return v ? r - n : n - r;
	}), x = () => {
		if (f.active) return;
		let e = c.trim();
		e && (t(e, null), l(""), m(Z));
	}, S = (e) => {
		let t = e.target.value;
		l(t);
		let n = ct(t, e.target.selectionStart ?? t.length, u.current);
		m(n);
	}, C = w((e) => {
		let { newValue: t, newCursor: n } = lt(c, f, e);
		l(t), m(Z), requestAnimationFrame(() => {
			let e = u.current;
			e && (e.focus(), e.setSelectionRange(n, n));
		});
	}, [c, f]), T = (e) => {
		f.active && d.current && d.current.handleKeyDown(e) || e.key === "Enter" && !e.shiftKey && (e.preventDefault(), x());
	}, E = (e, n) => {
		t(n, e);
	};
	return /* @__PURE__ */ M("div", { children: [/* @__PURE__ */ M("button", {
		type: "button",
		onClick: () => {
			s((e) => !e), o || setTimeout(() => u.current?.focus(), 100);
		},
		className: p("inline-flex items-center gap-1 mt-2.5 px-2.5 py-1 text-xs font-medium border border-border rounded-md cursor-pointer font-[inherit]", _ > 0 ? "bg-info-bg text-info-fg" : "bg-transparent text-neutral"),
		children: [
			o ? "▼" : "▶",
			" Comments",
			_ > 0 ? ` (${_})` : ""
		]
	}), o && /* @__PURE__ */ M("div", {
		className: p("mt-2 border border-border rounded-lg bg-surface-panel overflow-hidden animate-[sectionCommentsSlideDown_0.2s_ease-out]"),
		children: [
			/* @__PURE__ */ M("div", {
				className: p("flex items-start gap-1.5 px-3 py-2.5 border-b border-border bg-surface"),
				children: [/* @__PURE__ */ M("div", {
					className: p("flex-1 relative"),
					children: [/* @__PURE__ */ j(g, {
						ref: u,
						value: c,
						onChange: S,
						onKeyDown: T,
						placeholder: "Add a comment... (type @ to mention)",
						rows: 2,
						className: p("resize-y min-h-12")
					}), f.active && /* @__PURE__ */ j(rt, {
						ref: d,
						query: f.query,
						users: h,
						position: f.position,
						onSelect: C,
						onDismiss: () => m(Z)
					})]
				}), /* @__PURE__ */ j("button", {
					type: "button",
					onClick: x,
					className: p("px-3.5 py-1.5 text-xs font-semibold border-none rounded-md bg-info text-white cursor-pointer font-[inherit] whitespace-nowrap self-end"),
					children: "Post"
				})]
			}),
			e.length > 1 && /* @__PURE__ */ j("div", {
				className: p("flex justify-end px-3 pt-1 border-b border-border-subtle"),
				children: /* @__PURE__ */ j("button", {
					type: "button",
					onClick: () => y((e) => !e),
					className: p("bg-transparent border-none cursor-pointer text-[11px] text-neutral px-1.5 py-0.5 font-[inherit]"),
					children: v ? "↓ Newest first" : "↑ Oldest first"
				})
			}),
			/* @__PURE__ */ M("div", {
				className: p("max-h-[420px] overflow-y-auto px-3 py-2"),
				children: [e.length === 0 && /* @__PURE__ */ j("div", {
					className: p("p-3 text-center text-text-tertiary text-xs"),
					children: "No comments yet. Start the discussion!"
				}), b.map((e) => /* @__PURE__ */ j(ut, {
					comment: e,
					depth: 0,
					onReply: E,
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
var ft = {
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
}, pt = {
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
function Q(e) {
	return pt[e] ?? {
		label: String(e ?? "Unknown"),
		color: "var(--color-text-secondary)",
		bg: "var(--color-surface-hover)",
		icon: "•"
	};
}
function mt({ sections: e, participants: t, userId: n, getSectionFragment: r, ydoc: i, provider: a, sectionReviews: o, reviewSection: s, comments: c, onAddComment: l, onResolveThread: u, onUnresolveThread: d, onSectionFocus: f }) {
	let [m, h] = k({}), g = e.filter((e) => (o[e.id] ?? []).some((e) => e.userId === n)).length, _ = /* @__PURE__ */ new Map();
	for (let t of e) for (let e of o[t.id] ?? []) {
		let t = _.get(e.userId) ?? {
			displayName: e.displayName,
			statuses: []
		};
		t.statuses.push(e.status), _.set(e.userId, t);
	}
	let v = e.length > 0 ? Math.round(g / e.length * 100) : 0;
	return e.length === 0 ? /* @__PURE__ */ j("div", {
		className: p("text-center p-12 text-text-secondary text-[15px]"),
		children: "No sections to review."
	}) : /* @__PURE__ */ M("div", {
		"data-testid": "review-mode",
		className: p("max-w-[800px] mx-auto"),
		children: [
			/* @__PURE__ */ M("div", {
				"data-testid": "review-progress",
				className: p("mb-6"),
				children: [/* @__PURE__ */ M("div", {
					className: p("text-[13px] text-text-secondary mb-1 flex justify-between"),
					children: [/* @__PURE__ */ M("span", {
						"data-testid": "review-progress-text",
						children: [
							g,
							" of ",
							e.length,
							" sections reviewed by you"
						]
					}), /* @__PURE__ */ M("span", {
						"data-testid": "review-progress-pct",
						children: [v, "%"]
					})]
				}), /* @__PURE__ */ j("div", {
					className: p("h-2 bg-surface-emphasis rounded overflow-hidden"),
					children: /* @__PURE__ */ j("div", {
						className: p("h-full rounded transition-[width] duration-300 ease-in-out", g === e.length ? "bg-success" : "bg-info"),
						style: { width: `${v}%` }
					})
				})]
			}),
			/* @__PURE__ */ j("div", {
				className: p("flex flex-col gap-6"),
				children: e.map((e) => {
					let g = r(e.id), _ = ft[e.type] ?? ft.custom, v = o[e.id] ?? [], y = v.find((e) => e.userId === n), x = v.filter((e) => e.userId !== n), S = t.filter((t) => t.currentSectionId === e.id), C = m[e.id] ?? !1;
					return /* @__PURE__ */ M("div", {
						id: `section-${e.id}`,
						"data-testid": `review-section-${e.id}`,
						className: p("bg-surface border border-border rounded-lg p-5"),
						style: { borderLeft: y ? `3px solid ${Q(y.status).color}` : "3px solid #d1d5db" },
						onMouseEnter: () => f?.(e.id),
						children: [
							/* @__PURE__ */ M("div", {
								className: p("flex items-center gap-2 mb-1"),
								children: [/* @__PURE__ */ j("h3", {
									className: p("text-lg font-bold m-0 text-text-primary flex-1"),
									children: e.title
								}), /* @__PURE__ */ j("span", {
									className: p("inline-block text-[11px] font-semibold py-0.5 px-2.5 rounded-full"),
									style: {
										background: _.bg,
										color: _.text
									},
									children: e.sectionType ?? e.type
								})]
							}),
							g && /* @__PURE__ */ j("div", {
								className: p(e.items.length > 0 ? "mb-4" : "mb-2"),
								children: /* @__PURE__ */ j(b, {
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
							!g && e.items.length === 0 && /* @__PURE__ */ j("div", {
								className: p("py-4 text-text-tertiary text-sm text-center"),
								children: "This section has no content."
							}),
							e.items.length > 0 && /* @__PURE__ */ j("div", {
								className: p("mb-3"),
								children: e.items.map((e) => {
									let t = e.status === "acked" ? "var(--color-success)" : e.status === "rejected" ? "var(--color-danger)" : e.status === "done" ? "var(--color-neutral)" : "var(--color-text-tertiary)";
									return /* @__PURE__ */ M("div", {
										className: p("flex items-start gap-2 py-1.5 border-b border-border-subtle text-sm"),
										children: [
											/* @__PURE__ */ j("span", {
												className: p("inline-block w-2 h-2 rounded-full mt-[5px] shrink-0"),
												style: { background: t }
											}),
											/* @__PURE__ */ M("div", {
												className: p("flex-1"),
												children: [
													/* @__PURE__ */ j("span", {
														className: p("text-text-primary"),
														children: e.text
													}),
													e.assignee && /* @__PURE__ */ M("span", {
														className: p("text-text-secondary text-xs ml-2"),
														children: ["— ", e.assignee]
													}),
													e.priority && e.priority !== "medium" && /* @__PURE__ */ j("span", {
														className: p("text-[10px] font-semibold ml-1.5 px-1.5 py-px rounded", e.priority === "high" ? "bg-danger-bg text-danger-fg" : "bg-success-bg text-success-fg"),
														children: e.priority
													})
												]
											}),
											/* @__PURE__ */ j("span", {
												className: p("text-[11px] font-semibold capitalize shrink-0"),
												style: { color: t },
												children: e.status
											})
										]
									}, e.id);
								})
							}),
							/* @__PURE__ */ M("div", {
								className: p("flex items-center gap-2 pt-2.5 pb-1 border-t border-border-subtle flex-wrap"),
								children: [
									!y || C ? /* @__PURE__ */ M(A, { children: [
										/* @__PURE__ */ j(ht, {
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
										/* @__PURE__ */ j(ht, {
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
										/* @__PURE__ */ j(ht, {
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
										C && /* @__PURE__ */ j("button", {
											"data-testid": `section-${e.id}-cancel-change`,
											onClick: () => h((t) => ({
												...t,
												[e.id]: !1
											})),
											className: p("bg-transparent border-none text-text-secondary text-xs cursor-pointer underline"),
											children: "Cancel"
										})
									] }) : /* @__PURE__ */ M(A, { children: [
										/* @__PURE__ */ M("span", {
											"data-testid": `section-${e.id}-status`,
											"data-status": y.status,
											className: p("inline-flex items-center gap-1 text-[13px] font-semibold py-1 px-2.5 rounded-md"),
											style: {
												background: Q(y.status).bg,
												color: Q(y.status).color
											},
											children: [/* @__PURE__ */ j("span", {
												className: p("text-sm"),
												children: Q(y.status).icon
											}), Q(y.status).label]
										}),
										/* @__PURE__ */ M("span", {
											className: p("text-xs text-text-secondary"),
											children: ["by you · ", new Date(y.timestamp).toLocaleString(void 0, {
												month: "short",
												day: "numeric",
												hour: "2-digit",
												minute: "2-digit"
											})]
										}),
										/* @__PURE__ */ j("button", {
											"data-testid": `section-${e.id}-change-review`,
											onClick: () => h((t) => ({
												...t,
												[e.id]: !0
											})),
											className: p("bg-transparent border-none text-info-fg text-xs cursor-pointer underline p-0"),
											children: "Change"
										})
									] }),
									x.length > 0 && /* @__PURE__ */ j("div", {
										className: p("flex gap-1 ml-auto items-center"),
										children: x.map((e) => {
											let t = Q(e.status), n = typeof e.displayName == "string" && e.displayName ? e.displayName : "?", r = n.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2);
											return /* @__PURE__ */ j("div", {
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
									S.length > 0 && /* @__PURE__ */ M("div", {
										className: p("flex gap-1 items-center"),
										style: { marginLeft: x.length > 0 ? 0 : "auto" },
										children: [/* @__PURE__ */ j("span", {
											className: p("text-[11px] text-text-tertiary"),
											children: "Viewing:"
										}), S.map((e) => /* @__PURE__ */ j("div", {
											title: e.displayName,
											className: p("w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-semibold"),
											style: { background: e.color },
											children: e.displayName.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2)
										}, e.clientId))]
									})
								]
							}),
							l && /* @__PURE__ */ j(dt, {
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
			_.size > 0 && /* @__PURE__ */ M("div", {
				"data-testid": "review-summary",
				className: p("mt-8 p-4 px-5 bg-surface-panel border border-border rounded-lg"),
				children: [/* @__PURE__ */ j("h4", {
					className: p("m-0 mb-3 text-sm font-bold text-text-secondary"),
					children: "Document Review Summary"
				}), /* @__PURE__ */ j("div", {
					className: p("flex flex-col gap-2"),
					children: Array.from(_.entries()).map(([t, r]) => {
						let i = r.statuses.filter((e) => e === "approved").length, a = r.statuses.filter((e) => e === "changes_requested").length, o = r.statuses.filter((e) => e === "reviewed").length;
						return /* @__PURE__ */ M("div", {
							className: p("flex items-center gap-2.5 text-[13px]"),
							children: [
								/* @__PURE__ */ M("span", {
									className: p("font-semibold text-text-primary min-w-[100px]"),
									children: [r.displayName, t === n ? " (you)" : ""]
								}),
								/* @__PURE__ */ M("span", {
									className: p("text-text-secondary"),
									children: [
										r.statuses.length,
										" of ",
										e.length,
										" sections"
									]
								}),
								i > 0 && /* @__PURE__ */ M("span", {
									className: p("text-[11px] px-2 py-px rounded bg-success-bg text-success-fg font-semibold"),
									children: [i, " approved"]
								}),
								o > 0 && /* @__PURE__ */ M("span", {
									className: p("text-[11px] px-2 py-px rounded bg-surface-hover text-text-primary font-semibold"),
									children: [o, " reviewed"]
								}),
								a > 0 && /* @__PURE__ */ M("span", {
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
function ht({ label: e, bg: t, color: n, hoverBg: r, onClick: i, testid: a }) {
	let [o, s] = k(!1);
	return /* @__PURE__ */ j("button", {
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
var gt = {
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
function _t(e) {
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
function vt(e) {
	let t = [], n = [], r = [];
	for (let i of e) i.status === "rejected" ? r.push(i) : i.status === "acked" || i.status === "done" ? n.push(i) : t.push(i);
	return {
		pending: t,
		completed: n,
		rejected: r
	};
}
function yt(e, t) {
	let { pending: n, completed: r, rejected: i } = vt(e), a = e.length, o = [];
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
function bt({ meta: e, participantCount: t }) {
	let n = gt[e.status] ?? gt.draft;
	return /* @__PURE__ */ M("div", {
		className: p("border-t-[3px] border-t-info rounded-t-lg pt-5 pb-4 px-6 mb-4 bg-gradient-to-b from-surface-panel to-white col-span-full"),
		children: [/* @__PURE__ */ M("div", {
			className: p("flex items-center gap-3 mb-1.5"),
			children: [/* @__PURE__ */ j("h1", {
				className: p("text-xl font-bold m-0 text-text-primary flex-1"),
				children: e.title || "Untitled Document"
			}), /* @__PURE__ */ j("span", {
				className: p("inline-block text-xs font-semibold py-[3px] px-3 rounded-full capitalize"),
				style: {
					background: n.bg,
					color: n.text
				},
				children: e.status
			})]
		}), /* @__PURE__ */ M("div", {
			className: p("text-xs text-neutral"),
			children: [
				e.createdBy && /* @__PURE__ */ M(A, { children: ["Created by ", e.createdByName || e.createdBy] }),
				e.createdAt && /* @__PURE__ */ M(A, { children: [" · ", _t(e.createdAt)] }),
				t > 0 && /* @__PURE__ */ M(A, { children: [
					" · ",
					t,
					" participant",
					t === 1 ? "" : "s"
				] })
			]
		})]
	});
}
function xt({ bullets: e, contentText: t, fragment: n, ydoc: r, provider: i }) {
	let a = n && r, o = t && t.trim().length > 0;
	return /* @__PURE__ */ M("div", {
		className: p("bg-surface border border-border rounded-lg p-4 mb-4"),
		children: [
			/* @__PURE__ */ j("h2", {
				className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
				children: "Executive Summary"
			}),
			a ? /* @__PURE__ */ j("div", {
				className: p("py-1 px-3 bg-surface-panel rounded-md border-l-[3px] border-l-accent", e.length > 0 ? "mb-3" : ""),
				children: /* @__PURE__ */ j(b, {
					fragment: n,
					ydoc: r,
					provider: i ?? null,
					user: {
						name: "",
						color: ""
					},
					editable: !1
				})
			}) : o ? /* @__PURE__ */ j("div", {
				className: p("text-sm text-text-primary leading-relaxed whitespace-pre-wrap py-2 px-3 bg-surface-panel rounded-md border-l-[3px] border-l-accent", e.length > 0 ? "mb-3" : ""),
				children: t.trim()
			}) : null,
			/* @__PURE__ */ j("ul", {
				className: p("m-0 pl-[18px] text-[13px] text-text-primary leading-relaxed"),
				children: e.map((e, t) => /* @__PURE__ */ j("li", { children: e }, t))
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/ReaderSectionCard.tsx
var $ = {
	pending: "var(--color-warning)",
	done: "var(--color-success)",
	acked: "var(--color-success)",
	rejected: "var(--color-danger)"
}, St = {
	high: "var(--color-danger)",
	medium: "var(--color-warning)",
	low: "var(--color-neutral)"
};
function Ct(e) {
	switch (e) {
		case "acked":
		case "done": return "✅";
		case "rejected": return "❌";
		default: return "⬜";
	}
}
function wt(e) {
	let t = [], n = [], r = [];
	for (let i of e) i.status === "rejected" ? r.push(i) : i.status === "acked" || i.status === "done" ? n.push(i) : t.push(i);
	return {
		pending: t,
		completed: n,
		rejected: r
	};
}
function Tt({ label: e, count: t, color: n, defaultOpen: r, children: i }) {
	let [a, o] = k(r);
	return /* @__PURE__ */ M("div", {
		className: p("mb-2"),
		children: [/* @__PURE__ */ M("button", {
			onClick: () => o(!a),
			className: p("bg-transparent border-none cursor-pointer flex items-center gap-1.5 py-1 px-0 text-[13px] font-semibold text-text-primary font-[inherit] w-full"),
			children: [
				/* @__PURE__ */ j("span", {
					className: p("inline-block text-[10px] transition-transform duration-150 ease-in-out", a ? "rotate-90" : "rotate-0"),
					children: "▶"
				}),
				/* @__PURE__ */ j("span", {
					style: { color: n },
					children: e
				}),
				/* @__PURE__ */ j("span", {
					className: p("text-[11px] px-2 py-px rounded-full font-semibold"),
					style: {
						background: `${n}18`,
						color: n
					},
					children: t
				})
			]
		}), a && /* @__PURE__ */ j("div", {
			className: p("pl-4 mt-1"),
			children: i
		})]
	});
}
function Et({ item: e, variant: t }) {
	let n = t === "pending" ? $.pending : t === "completed" ? $.done : $.rejected;
	return /* @__PURE__ */ M("div", {
		className: p("flex items-center gap-2 py-[5px] px-2 mb-1 rounded-r", t === "pending" ? "bg-warning-bg" : "bg-surface"),
		style: { borderLeft: `3px solid ${n}` },
		children: [
			/* @__PURE__ */ j("span", {
				className: p("text-[13px] flex-1"),
				children: /* @__PURE__ */ j("span", {
					className: p(t === "completed" ? "line-through text-text-tertiary" : "text-text-primary"),
					children: e.text
				})
			}),
			e.priority && /* @__PURE__ */ j("span", {
				className: p("text-[10px] font-semibold px-1.5 py-px rounded-full uppercase shrink-0"),
				style: {
					background: `${St[e.priority]}18`,
					color: St[e.priority]
				},
				children: e.priority
			}),
			e.ackedBy && /* @__PURE__ */ j("span", {
				className: p("text-[11px] text-text-tertiary shrink-0"),
				children: e.ackedBy
			})
		]
	});
}
function Dt({ sections: e }) {
	let t = e.filter((e) => e.type === "decisions").flatMap((e) => e.items);
	return /* @__PURE__ */ M("div", {
		className: p("bg-surface border border-border rounded-lg p-4 mb-4"),
		children: [/* @__PURE__ */ j("h2", {
			className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
			children: "Key Decisions"
		}), t.length === 0 ? /* @__PURE__ */ j("div", {
			className: p("text-[13px] text-text-tertiary italic"),
			children: "No decisions recorded"
		}) : /* @__PURE__ */ j("div", {
			className: p("flex flex-col gap-1.5"),
			children: t.map((e) => /* @__PURE__ */ M("div", {
				className: p("flex items-start gap-2 text-[13px] text-text-primary"),
				children: [/* @__PURE__ */ j("span", {
					className: p("shrink-0"),
					children: Ct(e.status)
				}), /* @__PURE__ */ j("span", { children: e.text })]
			}, e.id))
		})]
	});
}
function Ot({ allItems: e }) {
	let { pending: t, completed: n, rejected: r } = wt(e);
	return /* @__PURE__ */ M("div", {
		className: p("bg-surface border border-border rounded-lg p-4 mb-4"),
		children: [/* @__PURE__ */ j("h2", {
			className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
			children: "Action Items"
		}), e.length === 0 ? /* @__PURE__ */ j("div", {
			className: p("text-[13px] text-text-tertiary italic"),
			children: "No action items yet"
		}) : /* @__PURE__ */ M(A, { children: [
			t.length > 0 && /* @__PURE__ */ j(Tt, {
				label: "Pending",
				count: t.length,
				color: $.pending,
				defaultOpen: !0,
				children: t.map((e) => /* @__PURE__ */ j(Et, {
					item: e,
					variant: "pending"
				}, e.id))
			}),
			n.length > 0 && /* @__PURE__ */ j(Tt, {
				label: "Completed",
				count: n.length,
				color: $.done,
				defaultOpen: !1,
				children: n.map((e) => /* @__PURE__ */ j(Et, {
					item: e,
					variant: "completed"
				}, e.id))
			}),
			r.length > 0 && /* @__PURE__ */ j(Tt, {
				label: "Rejected",
				count: r.length,
				color: $.rejected,
				defaultOpen: !1,
				children: r.map((e) => /* @__PURE__ */ j(Et, {
					item: e,
					variant: "rejected"
				}, e.id))
			})
		] })]
	});
}
function kt({ sections: e, commentCounts: t, sectionContentTexts: n, comments: r, getSectionFragment: i, ydoc: a, provider: o }) {
	let [s, c] = k({}), l = (e) => c((t) => ({
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
	return /* @__PURE__ */ M("div", {
		className: p("bg-surface border border-border rounded-lg p-4 mb-4"),
		children: [/* @__PURE__ */ j("h2", {
			className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
			children: "Section Summaries"
		}), e.length === 0 ? /* @__PURE__ */ j("div", {
			className: p("text-[13px] text-text-tertiary italic"),
			children: "No sections"
		}) : /* @__PURE__ */ j("div", {
			className: p("flex flex-col gap-0.5"),
			children: e.map((e) => {
				let c = e.items.filter((e) => e.status === "acked" || e.status === "done").length, d = e.items.length, f = t?.[e.id] ?? 0, m = n?.[e.id] ?? "", h = r?.[e.id] ?? [], g = !!s[e.id], _ = m.trim().length > 0, v = u[e.type] ?? u.custom;
				return /* @__PURE__ */ M("div", {
					id: `section-${e.id}`,
					"data-testid": `reader-section-${e.id}`,
					children: [/* @__PURE__ */ M("button", {
						onClick: () => l(e.id),
						className: p("border-none cursor-pointer flex items-center gap-2 py-2 px-1.5 rounded-md w-full font-[inherit] text-[13px] text-text-primary transition-colors duration-100", g ? "bg-surface-panel" : "bg-transparent"),
						children: [
							/* @__PURE__ */ j("span", {
								className: p("text-[10px] transition-transform duration-150 ease-in-out shrink-0", g ? "rotate-90" : "rotate-0"),
								children: "▶"
							}),
							/* @__PURE__ */ j("span", {
								className: p("font-semibold flex-1 text-left"),
								children: e.title
							}),
							/* @__PURE__ */ j("span", {
								className: p("text-[10px] font-semibold px-2 py-px rounded-full capitalize shrink-0"),
								style: {
									background: v.bg,
									color: v.text
								},
								children: e.type
							}),
							d > 0 && /* @__PURE__ */ M("span", {
								className: p("text-[11px] text-neutral shrink-0"),
								children: [
									c,
									"/",
									d,
									" done"
								]
							}),
							f > 0 && /* @__PURE__ */ M("span", {
								className: p("text-[11px] text-neutral shrink-0"),
								children: [
									f,
									" comment",
									f === 1 ? "" : "s"
								]
							})
						]
					}), g && /* @__PURE__ */ M("div", {
						className: p("pl-6 pb-2"),
						children: [
							(() => {
								let t = i?.(e.id);
								return t && a ? /* @__PURE__ */ j("div", {
									className: p("py-1 px-2.5 bg-surface-panel rounded border-l-2 border-l-border-emphasis", e.items.length > 0 ? "mb-2" : ""),
									children: /* @__PURE__ */ j(b, {
										fragment: t,
										ydoc: a,
										provider: o ?? null,
										user: {
											name: "",
											color: ""
										},
										editable: !1
									})
								}) : _ ? /* @__PURE__ */ j("div", {
									className: p("text-[13px] text-text-primary leading-relaxed whitespace-pre-wrap py-2 px-2.5 bg-surface-panel rounded border-l-2 border-l-border-emphasis", e.items.length > 0 ? "mb-2" : ""),
									children: m.trim()
								}) : null;
							})(),
							e.items.map((e) => /* @__PURE__ */ M("div", {
								className: p("flex items-center gap-1.5 py-[3px] text-xs text-neutral"),
								children: [/* @__PURE__ */ j("span", {
									className: p("shrink-0"),
									children: Ct(e.status)
								}), /* @__PURE__ */ j("span", {
									className: p(e.status === "acked" || e.status === "done" ? "line-through" : ""),
									children: e.text
								})]
							}, e.id)),
							h.length > 0 && /* @__PURE__ */ M("div", {
								className: p("mt-2 pt-1.5 border-t border-border-subtle"),
								children: [
									/* @__PURE__ */ M("div", {
										className: p("text-[11px] font-semibold text-text-tertiary mb-1"),
										children: [
											"Comments (",
											f,
											")"
										]
									}),
									h.slice(0, 3).map((e) => /* @__PURE__ */ M("div", {
										className: p("text-xs text-neutral py-0.5 flex gap-1.5"),
										children: [/* @__PURE__ */ M("span", {
											className: p("font-semibold text-text-secondary shrink-0"),
											children: [e.displayName, ":"]
										}), /* @__PURE__ */ j("span", {
											className: p("overflow-hidden text-ellipsis whitespace-nowrap"),
											children: e.text
										})]
									}, e.id)),
									h.length > 3 && /* @__PURE__ */ M("div", {
										className: p("text-[11px] text-text-tertiary mt-0.5"),
										children: [
											"+",
											h.length - 3,
											" more"
										]
									})
								]
							}),
							!_ && e.items.length === 0 && h.length === 0 && /* @__PURE__ */ j("div", {
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
function At(e) {
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
function jt(e) {
	return e >= 75 ? "var(--color-success)" : e >= 25 ? "var(--color-warning)" : "var(--color-danger)";
}
var Mt = {
	editor: "var(--color-success)",
	reviewer: "var(--color-warning)",
	reader: "var(--color-text-tertiary)"
}, Nt = {
	editor: "editing",
	reviewer: "reviewing",
	reader: "reading"
};
function Pt({ sections: e }) {
	let t = (e, t) => {
		e.preventDefault();
		let n = document.getElementById(`section-${t}`);
		n && n.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};
	return /* @__PURE__ */ M("aside", {
		"data-testid": "reader-toc",
		className: p("sticky top-4 self-start bg-surface border border-border rounded-lg p-4 mb-3"),
		children: [/* @__PURE__ */ j("h3", {
			className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
			children: "Contents"
		}), /* @__PURE__ */ j("nav", { children: /* @__PURE__ */ j("ol", {
			className: p("list-none m-0 p-0 flex flex-col gap-1"),
			children: e.map((e, n) => /* @__PURE__ */ j("li", { children: /* @__PURE__ */ M("a", {
				href: `#section-${e.id}`,
				"data-testid": `toc-link-${e.id}`,
				onClick: (n) => t(n, e.id),
				className: p("block py-1 px-1.5 text-[13px] text-text-secondary no-underline rounded border-l-2 border-l-transparent transition-colors duration-75 hover:bg-surface-hover hover:border-l-primary"),
				children: [
					/* @__PURE__ */ M("span", {
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
function Ft({ reviewed: e, total: t }) {
	let n = t > 0 ? Math.round(e / t * 100) : 0, r = jt(n);
	return /* @__PURE__ */ M("div", {
		className: p("bg-surface border border-border rounded-lg p-4 mb-3"),
		children: [
			/* @__PURE__ */ j("h3", {
				className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
				children: "Progress"
			}),
			/* @__PURE__ */ j("div", {
				className: p("flex items-baseline gap-1 mb-2"),
				children: /* @__PURE__ */ M("span", {
					className: p("text-[28px] font-bold leading-none"),
					style: { color: r },
					children: [n, "%"]
				})
			}),
			/* @__PURE__ */ j("div", {
				className: p("h-2 bg-surface-emphasis rounded overflow-hidden mb-1.5"),
				children: /* @__PURE__ */ j("div", {
					className: p("h-full rounded transition-[width] duration-300 ease-in-out"),
					style: {
						width: `${n}%`,
						background: r
					}
				})
			}),
			/* @__PURE__ */ M("div", {
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
function It({ participants: e, meta: t }) {
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
	}), /* @__PURE__ */ M("div", {
		className: p("bg-surface border border-border rounded-lg p-4 mb-3"),
		children: [
			/* @__PURE__ */ j("h3", {
				className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
				children: "Contributors"
			}),
			/* @__PURE__ */ j("div", {
				className: p("flex flex-wrap gap-1.5 mb-3"),
				children: r.map((e, t) => {
					let n = e.name.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
					return /* @__PURE__ */ M("div", {
						title: `${e.name}${e.mode ? ` (${Nt[e.mode] ?? e.mode})` : ""}`,
						className: p("relative"),
						children: [/* @__PURE__ */ j("div", {
							className: p("w-8 h-8 rounded-full text-white flex items-center justify-center text-[11px] font-bold"),
							style: { background: e.color },
							children: n
						}), e.isOnline && /* @__PURE__ */ j("div", {
							className: p("absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white"),
							style: { background: Mt[e.mode ?? "reader"] ?? "var(--color-text-tertiary)" }
						})]
					}, `${e.name}-${t}`);
				})
			}),
			/* @__PURE__ */ j("div", {
				className: p("flex flex-col gap-1.5"),
				children: r.map((e, t) => /* @__PURE__ */ M("div", {
					className: p("flex items-center gap-2 text-[13px]"),
					children: [
						/* @__PURE__ */ j("span", {
							className: p("w-2 h-2 rounded-full shrink-0"),
							style: { background: e.isOnline ? Mt[e.mode ?? "reader"] ?? "var(--color-text-tertiary)" : "var(--color-border-field)" }
						}),
						/* @__PURE__ */ j("span", {
							className: p("font-medium text-text-primary flex-1"),
							children: e.name
						}),
						/* @__PURE__ */ j("span", {
							className: p("text-[11px] text-text-tertiary"),
							children: e.isOnline ? Nt[e.mode ?? ""] ?? "online" : "offline"
						})
					]
				}, `detail-${e.name}-${t}`))
			})
		]
	});
}
function Lt({ sections: e, allItems: t, completedCount: n, commentCounts: r, meta: i }) {
	let a = r ? Object.values(r).reduce((e, t) => e + t, 0) : 0;
	return /* @__PURE__ */ M("div", {
		className: p("bg-surface border border-border rounded-lg p-4 mb-3"),
		children: [
			/* @__PURE__ */ j("h3", {
				className: p("text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3"),
				children: "Document Info"
			}),
			/* @__PURE__ */ M("div", {
				className: p("flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle"),
				children: [/* @__PURE__ */ j("span", {
					className: p("text-neutral"),
					children: "Sections"
				}), /* @__PURE__ */ j("span", {
					className: p("font-semibold"),
					children: e.length
				})]
			}),
			/* @__PURE__ */ M("div", {
				className: p("flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle"),
				children: [/* @__PURE__ */ j("span", {
					className: p("text-neutral"),
					children: "Total tasks"
				}), /* @__PURE__ */ j("span", {
					className: p("font-semibold"),
					children: t.length
				})]
			}),
			/* @__PURE__ */ M("div", {
				className: p("flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle"),
				children: [/* @__PURE__ */ j("span", {
					className: p("text-neutral"),
					children: "Completed"
				}), /* @__PURE__ */ j("span", {
					className: p("font-semibold text-success-fg"),
					children: n
				})]
			}),
			a > 0 && /* @__PURE__ */ M("div", {
				className: p("flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle"),
				children: [/* @__PURE__ */ j("span", {
					className: p("text-neutral"),
					children: "Comments"
				}), /* @__PURE__ */ j("span", {
					className: p("font-semibold"),
					children: a
				})]
			}),
			i.createdAt && /* @__PURE__ */ M("div", {
				className: p("flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle"),
				children: [/* @__PURE__ */ j("span", {
					className: p("text-neutral"),
					children: "Created"
				}), /* @__PURE__ */ j("span", {
					className: p("font-medium text-xs"),
					children: At(i.createdAt)
				})]
			}),
			i.updatedAt && /* @__PURE__ */ M("div", {
				className: p("flex justify-between py-1 text-[13px] text-text-primary"),
				children: [/* @__PURE__ */ j("span", {
					className: p("text-neutral"),
					children: "Last changed"
				}), /* @__PURE__ */ j("span", {
					className: p("font-medium text-xs"),
					children: At(i.updatedAt)
				})]
			})
		]
	});
}
function Rt({ sections: e, participants: t, meta: n, commentCounts: r, sectionContentTexts: i, comments: a, getSectionFragment: o, ydoc: s, provider: c }) {
	let l = e.flatMap((e) => e.items), u = l.filter((e) => e.status !== "pending").length, d = l.filter((e) => e.status === "acked" || e.status === "done").length, f = yt(l, e), m = e.length >= 2;
	return /* @__PURE__ */ M("div", {
		className: p("grid gap-4 mx-auto", m ? "[grid-template-columns:200px_1fr_280px] max-w-[1300px]" : "[grid-template-columns:1fr_280px] max-w-[1100px]"),
		children: [
			/* @__PURE__ */ j(bt, {
				meta: n,
				participantCount: t.length
			}),
			m && /* @__PURE__ */ j(Pt, { sections: e }),
			/* @__PURE__ */ M("div", { children: [
				/* @__PURE__ */ j(xt, {
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
				/* @__PURE__ */ j(Dt, { sections: e }),
				/* @__PURE__ */ j(Ot, { allItems: l }),
				/* @__PURE__ */ j(kt, {
					sections: e,
					commentCounts: r,
					sectionContentTexts: i,
					comments: a,
					getSectionFragment: o,
					ydoc: s,
					provider: c
				})
			] }),
			/* @__PURE__ */ M("div", { children: [
				/* @__PURE__ */ j(Ft, {
					reviewed: u,
					total: l.length
				}),
				/* @__PURE__ */ j(It, {
					participants: t,
					meta: n
				}),
				/* @__PURE__ */ j(Lt, {
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
function zt({ mode: e, isEmpty: t, isCanvas: n = !1, isFinalized: r, sections: i, documentId: a, displayName: o, color: s, userId: c, ydoc: l, provider: u, getSectionFragment: d, updateSection: f, participants: m, focusedSectionId: h, onSectionFocus: g, comments: _, onAddComment: v, onResolveThread: y, onUnresolveThread: b, onUpdateCursorInfo: x, onOpenComments: S, onAddItem: C, onUpdateItem: w, onRemoveItem: T, restItems: E, itemErrors: D, commentSidebarOpen: O, commentSectionId: k, commentSidebarTop: N, sectionListRef: P, onCloseComments: F, showVideoCall: ee, isVideoDocked: te, showInlineVideo: ne, sidebarFixed: re, videoSpacerRef: ie, videoLeft: ae, FIXED_TOP: oe, showTOC: I, sectionReviews: L, reviewSection: se, headerMeta: ce, onLoadDemo: le, activityPublish: R }) {
	let z = Object.keys(D ?? {}).map((e) => i.find((t) => t.id === e)?.title || e);
	return /* @__PURE__ */ M(A, { children: [
		z.length > 0 && /* @__PURE__ */ M("div", {
			role: "alert",
			"data-testid": "item-load-error-banner",
			className: p("rounded-lg border px-4 py-2.5 mb-3 text-[13px]", "bg-warning-bg border-warning-border text-warning-fg"),
			children: [
				"Action items could not be loaded for",
				" ",
				z.length === 1 ? `"${z[0]}"` : `${z.length} sections: ${z.map((e) => `"${e}"`).join(", ")}`,
				". These sections may have items that are not shown."
			]
		}),
		r && e === "editor" && /* @__PURE__ */ j("div", {
			className: p("rounded-lg border px-4 py-2.5 mb-3 text-center text-[13px] font-medium", "bg-warning-bg border-warning-border text-warning-fg"),
			children: "This document has been finalized and is read-only"
		}),
		n && /* @__PURE__ */ M("div", {
			"data-testid": "canvas-not-section-routable",
			className: "text-center py-12 px-4 text-text-secondary",
			children: [/* @__PURE__ */ j("p", {
				className: "text-[15px] mb-1",
				children: "This is a page document."
			}), /* @__PURE__ */ j("p", {
				className: "text-[13px] text-text-tertiary",
				children: "Section, review and reader views describe a sectioned document. Render a page with CanvasDocumentView."
			})]
		}),
		!n && t && /* @__PURE__ */ M("div", {
			className: "text-center py-12 px-4 text-text-secondary",
			children: [
				/* @__PURE__ */ j("p", {
					className: "text-lg mb-4",
					children: "No document content yet."
				}),
				/* @__PURE__ */ j("button", {
					onClick: le,
					className: p("px-6 py-2.5 text-[15px] font-semibold border-none rounded-lg", "bg-primary text-white cursor-pointer font-[inherit]"),
					children: "Load Demo Document"
				}),
				/* @__PURE__ */ j("p", {
					className: "text-[13px] mt-3 text-text-tertiary",
					children: "Loads a sample Q2 Sprint Planning document with tasks, decisions, and notes."
				})
			]
		}),
		!n && !t && e === "editor" && l && /* @__PURE__ */ M("div", {
			ref: P,
			className: "flex gap-4 relative min-w-0",
			children: [
				ee && !te && ne && /* @__PURE__ */ j("div", {
					ref: ie,
					className: "w-[240px] shrink-0",
					children: /* @__PURE__ */ j("div", {
						id: "inline-video-slot",
						className: p(re && "fixed z-30"),
						style: re ? {
							top: oe,
							left: ae,
							width: 240
						} : void 0
					})
				}),
				/* @__PURE__ */ M("div", {
					className: p("flex-1 min-w-0", O ? "pr-0" : I && i.length > 1 && e === "editor" ? "pr-48" : "pr-12"),
					children: [/* @__PURE__ */ j(Xe, {
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
					}), /* @__PURE__ */ j(tt, {
						documentId: a,
						editable: !r
					})]
				}),
				O && k && /* @__PURE__ */ M("div", {
					className: p("w-[420px] shrink-0 rounded-lg border border-border", "bg-surface-inset flex flex-col max-h-[calc(100vh-180px)] overflow-hidden"),
					style: { marginTop: N },
					children: [/* @__PURE__ */ M("div", {
						className: "flex items-center justify-between px-3.5 py-3 border-b border-border shrink-0",
						children: [/* @__PURE__ */ j("div", {
							className: "text-[13px] font-semibold text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap flex-1 mr-2",
							children: i.find((e) => e.id === k)?.title ?? "Comments"
						}), /* @__PURE__ */ j("button", {
							type: "button",
							onClick: F,
							className: p("border-none bg-transparent cursor-pointer", "text-base text-neutral px-1.5 py-0.5 rounded leading-none shrink-0"),
							title: "Close comments",
							children: "✕"
						})]
					}), /* @__PURE__ */ j("div", {
						className: "flex-1 overflow-y-auto px-3 py-3.5",
						children: /* @__PURE__ */ j(dt, {
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
		!n && !t && e === "ack" && l && /* @__PURE__ */ j(mt, {
			sections: i,
			participants: m,
			userId: c,
			getSectionFragment: d,
			ydoc: l,
			provider: u,
			sectionReviews: L,
			reviewSection: (e, t, n) => {
				se(e, t, n);
				let r = i.find((t) => t.id === e);
				R(`doc.review_${t}`, {
					sectionTitle: r?.title,
					status: t,
					documentId: a,
					documentTitle: ce?.title
				});
			},
			comments: _,
			onAddComment: v,
			onResolveThread: y,
			onUnresolveThread: b,
			onSectionFocus: g
		}),
		!n && !t && e === "reader" && l && /* @__PURE__ */ j(Rt, {
			sections: i,
			participants: m,
			meta: ce,
			commentCounts: Object.fromEntries(Object.entries(_).map(([e, t]) => [e, ot(t)])),
			sectionContentTexts: Object.fromEntries(i.map((e) => {
				let t = d(e.id);
				return [e.id, t ? H(t) : ""];
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
function Bt(e, t) {
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
function Vt(e, t) {
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
			let n = t.title !== e.title, r = (t.textContent || "") !== (e.textContent || ""), a = Bt(t.items, e.items), o = n || r || a.some((e) => e.status !== "unchanged");
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
var Ht = {
	added: "bg-success-bg border-success-border",
	removed: "bg-danger-bg border-danger-border",
	modified: "bg-warning-bg border-warning-border",
	unchanged: "bg-transparent border-border"
};
function Ut(e) {
	return e === "added" ? "text-success-fg bg-success-bg" : e === "removed" ? "text-danger-fg bg-danger-bg" : e === "modified" ? "text-warning-fg bg-warning-border" : "text-text-secondary bg-surface-hover";
}
function Wt(e) {
	return e === "added" ? "bg-success-bg text-success-fg" : e === "removed" ? "bg-danger-bg text-danger-fg line-through" : e === "modified" ? "bg-warning-bg text-warning-fg" : "bg-transparent text-text-primary";
}
function Gt({ oldSections: e, newSections: t, onClose: n }) {
	let r = Vt(e, t), i = r.some((e) => e.status !== "unchanged");
	return /* @__PURE__ */ M("div", {
		className: p("border-t border-border bg-surface-inset max-h-[400px] overflow-auto px-4 py-3"),
		children: [
			/* @__PURE__ */ M("div", {
				className: p("flex items-center justify-between mb-2"),
				children: [/* @__PURE__ */ j("h4", {
					className: p("text-[13px] font-semibold text-text-primary m-0"),
					children: "Changes from selected version to current"
				}), /* @__PURE__ */ j("button", {
					type: "button",
					className: p("px-2 py-0.5 text-xs border border-border-field rounded bg-surface text-text-secondary cursor-pointer font-[inherit]"),
					onClick: n,
					children: "Dismiss"
				})]
			}),
			!i && /* @__PURE__ */ j("div", {
				className: p("text-[13px] text-text-tertiary text-center p-4"),
				children: "No differences found. The documents are identical."
			}),
			r.filter((e) => e.status !== "unchanged").map((e) => /* @__PURE__ */ M("div", {
				className: p("border rounded-md p-2 px-2.5 mb-1.5", Ht[e.status]),
				children: [
					/* @__PURE__ */ M("div", {
						className: p("flex items-center gap-2 mb-1"),
						children: [
							/* @__PURE__ */ j("span", {
								className: p("text-[10px] font-semibold uppercase px-1.5 py-px rounded-sm", Ut(e.status)),
								children: e.status
							}),
							/* @__PURE__ */ j("span", {
								className: p("text-[13px] font-semibold text-text-primary"),
								children: e.status === "removed" ? e.oldTitle : e.newTitle ?? e.oldTitle
							}),
							e.titleChanged && /* @__PURE__ */ M("span", {
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
						return /* @__PURE__ */ M("div", { children: [/* @__PURE__ */ M("div", {
							className: p("text-xs px-2 py-0.5 rounded-sm mt-0.5", Wt(e.status)),
							children: [
								e.status === "added" && "+ ",
								e.status === "removed" && "- ",
								e.status === "modified" && "~ ",
								n?.text ?? "(untitled)",
								n?.assignee ? ` [${n.assignee}]` : ""
							]
						}), e.changes.length > 0 && /* @__PURE__ */ j("div", {
							className: p("text-[11px] text-warning-fg ml-4 italic"),
							children: e.changes.join(", ")
						})] }, n?.id ?? t);
					}),
					e.textChanged && /* @__PURE__ */ M("div", {
						className: p("mt-1 text-xs"),
						children: [e.oldTextContent && /* @__PURE__ */ M("div", {
							className: p("px-2 py-1 rounded-sm bg-danger-bg text-danger-fg line-through mb-0.5"),
							children: [e.oldTextContent.substring(0, 200), (e.oldTextContent?.length ?? 0) > 200 ? "..." : ""]
						}), e.newTextContent && /* @__PURE__ */ M("div", {
							className: p("px-2 py-1 rounded-sm bg-success-bg text-success-fg"),
							children: [e.newTextContent.substring(0, 200), (e.newTextContent?.length ?? 0) > 200 ? "..." : ""]
						})]
					}),
					e.status === "modified" && !e.textChanged && e.itemDiffs.every((e) => e.status === "unchanged") && e.titleChanged && /* @__PURE__ */ j("div", {
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
function Kt(e) {
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
function qt({ versions: e, loading: t, previewTimestamp: n, onFetch: r, onPreview: i, onClearPreview: a, onClose: o, onSaveVersion: s, onCompare: c, onClearCompare: l, compareSections: u, compareTimestamp: d, currentSections: f, onRestore: m }) {
	let h = () => {
		a(), l(), o();
	}, g = () => {
		let e = window.prompt("Enter a name for this version:");
		e && e.trim() && s(e.trim());
	}, v = (e, t) => {
		e.stopPropagation(), d === t ? l() : c(t);
	}, y = (e) => e.type === "pre-restore" ? "Before restore" : e.type === "auto" ? "Auto-save" : "";
	return /* @__PURE__ */ M(Pe, {
		width: 320,
		children: [
			/* @__PURE__ */ j(Fe, {
				title: "Version History",
				onClose: h,
				actions: /* @__PURE__ */ j(J, {
					size: "sm",
					onClick: g,
					children: "Save Version"
				})
			}),
			/* @__PURE__ */ M(Ie, {
				padding: "0.5rem 0",
				children: [
					t && /* @__PURE__ */ j("div", {
						className: p("py-8 px-4 text-center text-text-tertiary text-[13px]"),
						children: "Loading..."
					}),
					!t && e.length === 0 && /* @__PURE__ */ j("div", {
						className: p("py-8 px-4 text-center text-text-tertiary text-[13px]"),
						children: "No saved versions yet"
					}),
					!t && e.map((e) => /* @__PURE__ */ M("div", {
						role: "button",
						tabIndex: 0,
						className: p("flex items-center justify-between py-2.5 px-4 cursor-pointer text-[13px] text-text-primary", n === e.timestamp ? "bg-info-bg border-l-[3px] border-l-info" : "bg-transparent border-l-[3px] border-l-transparent"),
						onClick: () => i(e.timestamp),
						onKeyDown: _(() => i(e.timestamp)),
						children: [/* @__PURE__ */ M("div", {
							className: p("flex-1 min-w-0"),
							children: [
								e.name && /* @__PURE__ */ j("span", {
									className: p("text-xs font-semibold text-text-primary block mb-px"),
									children: e.name
								}),
								/* @__PURE__ */ M("span", {
									className: p("flex items-center gap-1"),
									children: [Kt(e.age), e.type && e.type !== "manual" && /* @__PURE__ */ j("span", {
										className: p("text-[10px] font-medium px-[5px] py-px rounded-[3px] ml-1.5", e.type === "pre-restore" ? "bg-warning-bg text-warning-fg" : e.type === "auto" ? "bg-surface-hover text-text-tertiary" : "bg-info-bg text-info-fg"),
										children: y(e)
									})]
								}),
								e.author && /* @__PURE__ */ M("span", {
									className: p("text-[10px] text-text-tertiary block"),
									children: ["by ", e.author]
								}),
								/* @__PURE__ */ j("span", {
									className: p("text-[11px] text-text-tertiary"),
									children: new Date(e.timestamp).toLocaleString()
								})
							]
						}), /* @__PURE__ */ j("button", {
							type: "button",
							className: p("px-2 py-[3px] text-[11px] font-medium border rounded-[4px] cursor-pointer font-[inherit] whitespace-nowrap", d === e.timestamp ? "bg-info-bg border-info text-info-fg" : "bg-surface border-border text-text-secondary"),
							onClick: (t) => v(t, e.timestamp),
							children: d === e.timestamp ? "Hide Diff" : "Compare"
						})]
					}, e.timestamp))
				]
			}),
			u != null && /* @__PURE__ */ j(Gt, {
				oldSections: u,
				newSections: f,
				onClose: l
			}),
			m && d != null && /* @__PURE__ */ M("div", {
				className: p("py-3 px-4 border-t border-border shrink-0"),
				children: [/* @__PURE__ */ j(J, {
					variant: "primary",
					onClick: () => {
						window.confirm("Restore this version?\n\nA checkpoint of the current state will be saved first. All connected users will see the restored content. Comments and reviews added after this version may be lost.") && (m(d), l());
					},
					className: "w-full px-4 py-2.5 text-sm font-semibold rounded-lg",
					children: "Restore this version"
				}), /* @__PURE__ */ j("div", {
					className: p("text-[11px] text-text-tertiary text-center mt-1.5"),
					children: "A pre-restore checkpoint will be saved automatically"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/MyMentionsPanel.tsx
function Jt(e) {
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
function Yt(e) {
	return e.split(/\s+/).map((e) => e[0]).join("").toUpperCase().slice(0, 2);
}
function Xt({ item: e, onClick: t, onDismiss: n }) {
	return /* @__PURE__ */ M("div", {
		role: "button",
		tabIndex: 0,
		className: p("flex gap-2.5 py-2.5 px-4 cursor-pointer border-b border-border-subtle items-start hover:bg-surface-inset"),
		onClick: t,
		onKeyDown: _(t),
		children: [
			/* @__PURE__ */ j("div", {
				className: p("w-7 h-7 rounded-full text-white text-[11px] font-semibold flex items-center justify-center shrink-0"),
				style: { background: e.authorColor },
				children: Yt(e.authorName)
			}),
			/* @__PURE__ */ M("div", {
				className: p("flex-1 min-w-0"),
				children: [/* @__PURE__ */ j("div", {
					className: p("text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
					children: e.commentText
				}), e.sectionTitle && /* @__PURE__ */ j("div", {
					className: p("text-[11px] text-text-tertiary mt-0.5"),
					children: e.sectionTitle
				})]
			}),
			/* @__PURE__ */ j("div", {
				className: p("text-[11px] text-text-tertiary shrink-0 mt-0.5"),
				children: Jt(e.timestamp)
			}),
			/* @__PURE__ */ j("button", {
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
function Zt({ item: e, onClick: t, onDismiss: n }) {
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
	return /* @__PURE__ */ M("div", {
		role: "button",
		tabIndex: 0,
		className: p("flex gap-2.5 py-2.5 px-4 cursor-pointer border-b border-border-subtle items-start hover:bg-surface-inset"),
		onClick: t,
		onKeyDown: _(t),
		children: [
			/* @__PURE__ */ j("div", {
				className: p("w-2 h-2 rounded-full shrink-0 mt-1"),
				style: { background: r[e.priority] ?? "var(--color-text-tertiary)" }
			}),
			/* @__PURE__ */ M("div", {
				className: p("flex-1 min-w-0"),
				children: [/* @__PURE__ */ M("div", {
					className: p("text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
					children: [e.taskText, /* @__PURE__ */ j("span", {
						className: p("inline-block text-[10px] font-semibold px-1.5 py-px rounded-full ml-1.5"),
						style: {
							background: a.bg,
							color: a.text
						},
						children: e.status
					})]
				}), e.sectionTitle && /* @__PURE__ */ j("div", {
					className: p("text-[11px] text-text-tertiary mt-0.5"),
					children: e.sectionTitle
				})]
			}),
			/* @__PURE__ */ j("button", {
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
function Qt({ items: e, onNavigateToSection: t, onClose: n }) {
	let [r, i] = k("all"), [a, o] = k(/* @__PURE__ */ new Set()), s = (e) => {
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
	return /* @__PURE__ */ M(Pe, {
		width: 340,
		children: [
			/* @__PURE__ */ j(Fe, {
				title: "My Mentions & Tasks",
				onClose: n,
				actions: l.length > 0 ? /* @__PURE__ */ j(J, {
					variant: "default",
					size: "sm",
					onClick: c,
					children: "Clear all"
				}) : void 0
			}),
			/* @__PURE__ */ j("div", {
				className: p("flex gap-0 border-b border-border shrink-0"),
				children: [
					"all",
					"mentions",
					"tasks"
				].map((e) => /* @__PURE__ */ j("button", {
					type: "button",
					className: p("flex-1 py-2 text-[13px] bg-transparent border-none cursor-pointer font-[inherit]", r === e ? "font-semibold text-primary border-b-2 border-b-primary" : "font-normal text-text-secondary border-b-2 border-b-transparent"),
					onClick: () => i(e),
					children: e === "all" ? "All" : e === "mentions" ? "Mentions" : "Tasks"
				}, e))
			}),
			/* @__PURE__ */ M(Ie, {
				padding: "0.5rem 0",
				children: [l.length === 0 && /* @__PURE__ */ j("div", {
					className: p("py-8 px-4 text-center text-text-tertiary text-[13px]"),
					children: "No mentions or tasks for you"
				}), l.map((e) => e.kind === "mention" ? /* @__PURE__ */ j(Xt, {
					item: e,
					onClick: () => t(e.sectionId, e.commentId),
					onDismiss: () => s(e.commentId)
				}, e.commentId) : /* @__PURE__ */ j(Zt, {
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
function $t(e, t) {
	let n = new Date(e).getTime(), r = (t ? new Date(t).getTime() : Date.now()) - n, i = Math.floor(r / 6e4);
	return i < 1 ? "<1m" : i < 60 ? `${i}m` : `${Math.floor(i / 60)}h ${i % 60}m`;
}
function en(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 6e4);
	if (n < 1) return "just now";
	if (n < 60) return `${n}m ago`;
	let r = Math.floor(n / 60);
	return r < 24 ? `${r}h ago` : `${Math.floor(r / 24)}d ago`;
}
function tn({ sessions: e, loading: t, onFetch: n, onClose: r }) {
	T(() => {
		n();
	}, [n]);
	let i = e.filter((e) => e.status === "ended"), a = e.filter((e) => e.status === "active");
	return /* @__PURE__ */ M(Pe, {
		width: 340,
		children: [/* @__PURE__ */ j(Fe, {
			title: "Past Conversations",
			onClose: r
		}), /* @__PURE__ */ M(Ie, {
			padding: "12px",
			children: [
				t && /* @__PURE__ */ j("div", {
					className: p("text-center text-text-tertiary text-[13px] py-6"),
					children: "Loading..."
				}),
				!t && e.length === 0 && /* @__PURE__ */ j("div", {
					className: p("text-center text-text-tertiary text-[13px] py-6"),
					children: "No video conversations yet for this document."
				}),
				a.map((e) => /* @__PURE__ */ j(nn, {
					session: e,
					isActive: !0
				}, e.sessionId)),
				i.map((e) => /* @__PURE__ */ j(nn, { session: e }, e.sessionId))
			]
		})]
	});
}
function nn({ session: e, isActive: t }) {
	return /* @__PURE__ */ M("div", {
		className: p("rounded-lg p-3 mb-2", t ? "border border-success bg-[rgba(16,185,129,0.04)]" : "border border-border bg-surface"),
		children: [
			/* @__PURE__ */ M("div", {
				className: p("flex justify-between items-center mb-1"),
				children: [/* @__PURE__ */ j("span", {
					className: p("text-[11px] text-text-tertiary"),
					children: en(e.startedAt)
				}), /* @__PURE__ */ M("div", {
					className: p("flex items-center gap-1"),
					children: [t && /* @__PURE__ */ j("span", {
						className: p("text-[11px] font-semibold text-success-fg bg-[rgba(16,185,129,0.1)] px-1.5 py-px rounded-full"),
						children: "Live"
					}), /* @__PURE__ */ j("span", {
						className: p("text-[11px] text-text-secondary"),
						children: $t(e.startedAt, e.endedAt)
					})]
				})]
			}),
			/* @__PURE__ */ j("div", {
				className: p("flex flex-wrap gap-1 mb-2"),
				children: e.participants.map((e, t) => /* @__PURE__ */ j("span", {
					className: p("text-[11px] text-text-secondary bg-surface-panel px-2 py-0.5 rounded-full"),
					children: e.displayName || e.userId.slice(0, 10)
				}, `${e.userId}-${t}`))
			}),
			e.aiSummary && /* @__PURE__ */ j("div", {
				className: p("text-[11px] text-text-primary bg-surface-panel p-2 rounded-md leading-normal"),
				children: e.aiSummary
			}),
			e.transcriptStatus && e.transcriptStatus !== "available" && /* @__PURE__ */ M("div", {
				className: p("text-[11px] text-text-tertiary mt-1"),
				children: ["Transcript: ", e.transcriptStatus]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/TableOfContents.tsx
function rn({ sections: e, focusedSectionId: t }) {
	let [n, r] = k(null);
	T(() => {
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
	let i = n || t, a = w((e) => {
		let t = document.getElementById(`section-${e}`);
		t && t.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}, []), o = e.filter((e, t, n) => n.findIndex((t) => t.id === e.id) === t);
	if (o.length === 0) return null;
	let s = o.findIndex((e) => e.id === i);
	return /* @__PURE__ */ M("div", {
		className: p("flex flex-col gap-0 text-[11px] w-[140px] max-h-[calc(100vh-160px)] overflow-y-auto"),
		children: [
			/* @__PURE__ */ j("div", {
				className: p("text-[10px] font-semibold text-text-tertiary uppercase tracking-wide mb-1.5"),
				children: "Contents"
			}),
			o.map((e, t) => {
				let n = e.id === i, r = s >= 0 && t < s;
				return /* @__PURE__ */ M("button", {
					type: "button",
					onClick: () => a(e.id),
					className: p("flex items-center gap-2 py-1 border-none bg-transparent cursor-pointer text-left font-[inherit]"),
					children: [/* @__PURE__ */ j("div", {
						className: p("flex flex-col items-center w-3 shrink-0"),
						children: /* @__PURE__ */ j("div", { className: p("rounded-full transition-all duration-200", n ? "w-2 h-2 bg-info shadow-[0_0_0_3px_rgba(59,130,246,0.2)]" : r ? "w-1.5 h-1.5 bg-neutral" : "w-1.5 h-1.5 bg-state-idle") })
					}), /* @__PURE__ */ j("span", {
						className: p("text-[11px] overflow-hidden text-ellipsis whitespace-nowrap transition-colors duration-200", n ? "font-semibold text-text-primary" : r ? "font-normal text-neutral" : "font-normal text-text-tertiary"),
						children: e.title || "Untitled"
					})]
				}, e.id);
			}),
			s >= 0 && /* @__PURE__ */ M("div", {
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
function an({ showHistory: e, showMyItems: t, showVideoHistory: n, closePanel: r, versionHistory: i, ydoc: a, myItems: o, onNavigateToSection: s, videoSessions: c, showTOC: l, isCanvas: u = !1, commentSidebarOpen: d, sections: f, focusedSectionId: m, mode: h }) {
	return /* @__PURE__ */ M(A, { children: [
		e && /* @__PURE__ */ j(qt, {
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
		t && /* @__PURE__ */ j(Qt, {
			items: o,
			onNavigateToSection: s,
			onClose: r
		}),
		n && /* @__PURE__ */ j(tn, {
			sessions: c.sessions,
			loading: c.loading,
			onFetch: c.fetchSessions,
			onClose: r
		}),
		!u && l && !d && f.length > 1 && h === "editor" && /* @__PURE__ */ j("div", {
			className: p("fixed bottom-4 right-4 w-40 max-h-[280px] overflow-y-auto", "bg-surface border border-border rounded-[10px] px-3 py-2.5", "shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-30"),
			children: /* @__PURE__ */ j(rn, {
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
var on = /* @__PURE__ */ e({ default: () => sn });
function sn({ documentId: e, documentType: t, ws: n, userId: r, displayName: i, color: a = "var(--color-info)", onMessage: o, activityPublish: s, onBack: c, isVideoDocked: l, onDockVideo: u, onUndockVideo: d }) {
	let f = U({
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
		onUndockVideo: d,
		onBack: c
	}), p = !f.isCanvas && f.sections.length === 0 && !f.demoLoaded, [m] = k(() => {
		if (typeof document > "u") return null;
		let e = document.createElement("div");
		return e.style.width = "100%", e;
	});
	T(() => {
		if (!m) return;
		if (!f.showVideoCall) {
			m.parentNode?.removeChild(m);
			return;
		}
		let e = f.isVideoDocked ? "sidebar-video-slot" : "inline-video-slot", t = () => {
			let t = document.getElementById(e);
			return t && t !== m.parentNode ? (t.appendChild(m), !0) : t === m.parentNode;
		};
		if (t()) return;
		let n = setInterval(() => {
			t() && clearInterval(n);
		}, 50), r = setTimeout(() => clearInterval(n), 2e3);
		return () => {
			clearInterval(n), clearTimeout(r);
		};
	}, [
		m,
		f.showVideoCall,
		f.isVideoDocked,
		f.mode
	]), T(() => () => {
		m?.parentNode?.removeChild(m);
	}, [m]);
	let h = f.showVideoCall && m ? P(/* @__PURE__ */ j(Ue, {
		documentId: e,
		userId: r,
		idToken: f.idToken,
		meta: f.meta,
		updateMeta: f.updateMeta,
		sendMessage: n.sendMessage,
		isDocked: f.isVideoDocked,
		onClose: () => {
			f.setShowVideoCall(!1), f.isVideoDocked && d?.();
		},
		onDockToSidebar: f.isVideoDocked ? void 0 : (() => {
			u?.();
		}),
		onUndock: f.isVideoDocked ? (() => {
			d?.();
		}) : void 0,
		onCallEnd: () => {
			f.setShowVideoCall(!1), d?.();
		}
	}), m) : null;
	return /* @__PURE__ */ M("div", {
		"data-testid": "document-editor-page",
		className: "flex flex-col h-full",
		children: [
			h,
			/* @__PURE__ */ j(q, {
				meta: f.headerMeta,
				mode: f.mode,
				onModeChange: f.handleModeChange,
				participants: f.participants,
				onUpdateMeta: f.updateMeta,
				onExport: f.handleExport,
				onToggleHistory: f.handleToggleHistory,
				onToggleVideoCall: f.handleToggleVideoCall,
				onToggleVideoHistory: f.handleToggleVideoHistory,
				isCallActive: !!f.meta?.activeCallSessionId,
				onClearDocument: f.handleClearDocument,
				onJumpToUser: f.handleJumpToUser,
				sections: f.isCanvas ? [] : f.sections.map((e) => ({
					id: e.id,
					title: e.title
				})),
				onToggleMyItems: f.handleToggleMyItems,
				myItemCount: f.myItems.length,
				commentCount: Object.values(f.comments).reduce((e, t) => e + t.length, 0),
				onBack: f.handleBack,
				onFollowUser: f.handleFollowUser,
				followingUserId: f.followingUserId,
				onFinalize: f.handleFinalize,
				onUnlock: f.handleUnlock,
				pastCallsCount: f.videoSessions.sessions.length
			}),
			/* @__PURE__ */ j(Ne, {
				followingUserId: f.followingUserId,
				participants: f.participants,
				onStopFollow: f.handleStopFollow
			}),
			/* @__PURE__ */ j("div", {
				className: "flex-1 overflow-auto p-4",
				children: /* @__PURE__ */ j(zt, {
					mode: f.mode,
					isEmpty: p,
					isCanvas: f.isCanvas,
					isFinalized: f.isFinalized,
					sections: f.sections,
					documentId: e,
					displayName: i,
					color: a,
					userId: r,
					ydoc: f.ydoc,
					provider: f.provider,
					getSectionFragment: f.getSectionFragment,
					updateSection: f.updateSection,
					participants: f.participants,
					focusedSectionId: f.focusedSectionId,
					onSectionFocus: f.handleSectionFocus,
					comments: f.comments,
					onAddComment: f.handleAddComment,
					onResolveThread: f.handleResolveThread,
					onUnresolveThread: f.handleUnresolveThread,
					onUpdateCursorInfo: f.awareness.updateCursorInfo,
					onOpenComments: f.handleOpenComments,
					onAddItem: f.handleAddItem,
					onUpdateItem: f.handleUpdateItem,
					onRemoveItem: f.handleRemoveItem,
					restItems: f.restItems,
					itemErrors: f.itemErrors,
					commentSidebarOpen: f.commentSidebarOpen,
					commentSectionId: f.commentSectionId,
					commentSidebarTop: f.commentSidebarTop,
					sectionListRef: f.sectionListRef,
					onCloseComments: f.handleCloseComments,
					showVideoCall: f.showVideoCall,
					isVideoDocked: f.isVideoDocked,
					showInlineVideo: f.showInlineVideo,
					sidebarFixed: f.sidebarFixed,
					videoSpacerRef: f.videoSpacerRef,
					videoLeft: f.videoLeft,
					FIXED_TOP: f.FIXED_TOP,
					showTOC: f.showTOC,
					sectionReviews: f.sectionReviews,
					reviewSection: f.restReviewSection,
					headerMeta: f.headerMeta,
					onLoadDemo: f.handleLoadDemo,
					activityPublish: s
				})
			}),
			/* @__PURE__ */ j(an, {
				showHistory: f.showHistory,
				showMyItems: f.showMyItems,
				showVideoHistory: f.showVideoHistory,
				closePanel: f.closePanel,
				versionHistory: f.versionHistory,
				ydoc: f.ydoc,
				myItems: f.myItems,
				onNavigateToSection: f.handleNavigateToSection,
				videoSessions: f.videoSessions,
				showTOC: f.showTOC,
				isCanvas: f.isCanvas,
				commentSidebarOpen: f.commentSidebarOpen,
				sections: f.sections,
				focusedSectionId: f.focusedSectionId,
				mode: f.mode
			})
		]
	});
}
//#endregion
export { be as A, Xe as C, q as D, Ne as E, B as F, ge as I, de as L, fe as M, he as N, ke as O, me as P, ce as R, tt as S, Ue as T, ut as _, Qt as a, at as b, Rt as c, kt as d, xt as f, dt as g, mt as h, tn as i, pe as j, ye as k, Ot as l, yt as m, on as n, qt as o, bt as p, rn as r, Gt as s, sn as t, Dt as u, ot as v, Ye as w, rt as x, it as y, ue as z };
