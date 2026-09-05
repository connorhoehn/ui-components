import { n as e, r as t } from "./useWebSocket-16eHDqT5.js";
import { useCallback as n, useEffect as r, useMemo as i, useRef as a, useState as o } from "react";
import * as s from "yjs";
//#region src/hooks/useIdleDetector.ts
var c = 12e4, l = 500;
function u(e = {}) {
	let { timeoutMs: t = c } = e, [i, s] = o(!1), u = a(null), d = a(null), f = a(!1), p = n(() => {
		u.current !== null && clearTimeout(u.current), f.current && (f.current = !1, s(!1)), u.current = setTimeout(() => {
			f.current = !0, s(!0);
		}, t);
	}, [t]), m = n(() => {
		d.current === null && (d.current = setTimeout(() => {
			d.current = null;
		}, l), p());
	}, [p]);
	return r(() => {
		let e = [
			"mousemove",
			"keydown",
			"click",
			"touchstart",
			"scroll"
		];
		for (let t of e) window.addEventListener(t, m, { passive: !0 });
		return p(), () => {
			for (let t of e) window.removeEventListener(t, m);
			u.current !== null && clearTimeout(u.current), d.current !== null && clearTimeout(d.current);
		};
	}, [m, p]), { isIdle: i };
}
//#endregion
//#region src/hooks/useAwarenessState.ts
function d(e, t) {
	let o = a({
		...t,
		name: t.displayName,
		lastSeen: Date.now(),
		idle: !1
	}), s = a(e);
	s.current = e;
	let c = n(() => {
		let e = s.current;
		e?.awareness && (o.current.lastSeen = Date.now(), e.awareness.setLocalStateField("user", { ...o.current }));
	}, []);
	r(() => {
		e?.awareness && (o.current = {
			...o.current,
			...t,
			name: t.displayName,
			lastSeen: Date.now()
		}, c());
	}, [
		e,
		t.userId,
		t.displayName,
		t.color,
		t.mode,
		c
	]);
	let { isIdle: l } = u();
	r(() => {
		o.current.idle = l, c();
	}, [l, c]);
	let d = n((e) => {
		o.current.currentSectionId = e, c();
	}, [c]), f = n((e) => {
		o.current.mode = e, c();
	}, [c]), p = n((e) => {
		o.current.idle = e, c();
	}, [c]), m = n((e, t) => {
		o.current.name = e, o.current.color = t, c();
	}, [c]);
	return i(() => ({
		updateSection: d,
		updateMode: f,
		updateIdle: p,
		updateCursorInfo: m
	}), [
		d,
		f,
		p,
		m
	]);
}
//#endregion
//#region src/hooks/useAwareness.ts
function f(e, t) {
	let [n, a] = o([]), s = d(e, {
		userId: t.userId,
		displayName: t.displayName,
		color: t.color,
		mode: t.mode,
		currentSectionId: null
	});
	return r(() => {
		if (!e) {
			a([]);
			return;
		}
		let t = "", n = () => {
			let n = e.awareness.getStates(), r = [];
			n.forEach((t, n) => {
				if (n === e.awareness.clientID) return;
				let i = t.user;
				i && r.push({
					clientId: String(n),
					userId: i.userId ?? "",
					displayName: i.displayName ?? "Anonymous",
					color: i.color ?? "#3b82f6",
					mode: i.mode === "ack" ? "reviewer" : i.mode === "reader" ? "reader" : "editor",
					currentSectionId: i.currentSectionId ?? null,
					lastSeen: i.lastSeen ?? Date.now(),
					idle: i.idle ?? !1
				});
			});
			let i = /* @__PURE__ */ new Map();
			for (let e of r) {
				let t = e.userId || e.displayName || e.clientId, n = i.get(t);
				(!n || (e.lastSeen ?? 0) > (n.lastSeen ?? 0)) && i.set(t, e);
			}
			let o = Array.from(i.values()), s = o.map((e) => `${e.clientId}:${e.currentSectionId}:${e.mode}:${e.idle}`).join("|");
			s !== t && (t = s, queueMicrotask(() => a(o)));
		};
		return e.awareness.on("change", n), n(), () => {
			e.awareness.off("change", n);
		};
	}, [e]), i(() => ({
		awareness: s,
		participants: n
	}), [s, n]);
}
//#endregion
//#region src/hooks/useDocumentMetadata.ts
function p(e) {
	let t = {};
	return e.forEach((e, n) => {
		t[n] = e;
	}), t;
}
function m(e) {
	let [t, i] = o(null);
	return r(() => {
		if (!e) {
			i(null);
			return;
		}
		let t = e.getMap("meta"), n = () => {
			t.size > 0 && i(p(t));
		};
		return t.observe(n), n(), () => {
			t.unobserve(n);
		};
	}, [e]), {
		meta: t,
		updateMeta: n((t) => {
			if (!e) return;
			let n = e.getMap("meta");
			e.transact(() => {
				for (let [e, r] of Object.entries(t)) n.set(e, r);
			});
		}, [e])
	};
}
//#endregion
//#region src/hooks/useSectionList.ts
function h(e) {
	let t = {};
	return e.forEach((e, n) => {
		t[n] = e;
	}), t;
}
function g(e) {
	let t = [];
	return e.forEach((e) => {
		t.push(h(e));
	}), t;
}
function _(e) {
	let t = [];
	return e.forEach((e) => {
		let n = h(e), r = e.get("items");
		n.items = r instanceof s.Array ? g(r) : [], t.push(n);
	}), t;
}
function v(e, t) {
	for (let [n, r] of Object.entries(t)) e.set(n, r);
}
function y(e) {
	let t = [];
	return e.forEach((e) => {
		t.push(h(e));
	}), t;
}
function b(e) {
	let t = /* @__PURE__ */ new Map(), n = [];
	for (let n of e) t.set(n.id, {
		...n,
		replies: []
	});
	for (let r of e) {
		let e = t.get(r.id);
		r.parentCommentId && t.has(r.parentCommentId) ? t.get(r.parentCommentId).replies.push(e) : n.push(e);
	}
	return n;
}
function x(e) {
	let [t, i] = o([]), [a, c] = o({});
	r(() => {
		if (!e) {
			i([]), c({});
			return;
		}
		let t = e.getArray("sections"), n = null, r = () => {
			n && clearTimeout(n), n = setTimeout(() => {
				let e = _(t);
				i(e);
				let n = {};
				for (let e = 0; e < t.length; e++) {
					let r = t.get(e), i = r.get("id"), a = r.get("comments");
					a instanceof s.Array && (n[i] = b(y(a)));
				}
				c(n);
			}, 16);
		};
		return t.observeDeep(r), r(), () => {
			n && clearTimeout(n), t.unobserveDeep(r);
		};
	}, [e]);
	let l = n((t) => {
		if (!e) return null;
		let n = e.getArray("sections");
		for (let e = 0; e < n.length; e++) {
			let r = n.get(e);
			if (r.get("id") === t) return {
				ySection: r,
				index: e
			};
		}
		return null;
	}, [e]), u = n((e, t) => {
		let n = l(e);
		if (!n) return null;
		let r = n.ySection.get("items");
		if (!(r instanceof s.Array)) return null;
		for (let e = 0; e < r.length; e++) {
			let n = r.get(e);
			if (n.get("id") === t) return n;
		}
		return null;
	}, [l]), d = n((t) => {
		if (!e) return null;
		let n = l(t);
		if (!n) return null;
		let r = n.ySection.get("comments");
		return r instanceof s.Array || (r = new s.Array(), n.ySection.set("comments", r)), r;
	}, [e, l]), f = n((t) => {
		if (!e) return;
		let n = e.getArray("sections");
		e.transact(() => {
			let e = new s.Map(), { items: r, ...i } = t;
			v(e, i);
			let a = new s.Array();
			for (let e of r) {
				let t = new s.Map();
				v(t, e), a.push([t]);
			}
			e.set("items", a), n.push([e]);
		});
	}, [e]), p = n((t, n) => {
		if (!e) return;
		let r = l(t);
		r && e.transact(() => {
			let { items: e, ...t } = n;
			for (let [e, n] of Object.entries(t)) r.ySection.set(e, n);
		});
	}, [e, l]), m = n((t) => {
		if (!e) return;
		let n = l(t);
		if (!n) return;
		let r = e.getArray("sections");
		e.transact(() => {
			r.delete(n.index, 1);
		});
	}, [e, l]), h = n((t, n) => {
		if (!e) return;
		let r = l(t);
		r && e.transact(() => {
			let e = r.ySection.get("items");
			e instanceof s.Array || (e = new s.Array(), r.ySection.set("items", e));
			let t = new s.Map();
			v(t, n), e.push([t]);
		});
	}, [e, l]), g = n((t, n, r) => {
		if (!e) return;
		let i = u(t, n);
		i && e.transact(() => {
			for (let [e, t] of Object.entries(r)) i.set(e, t);
		});
	}, [e, u]);
	return {
		sections: t,
		comments: a,
		addSection: f,
		updateSection: p,
		removeSection: m,
		addItem: h,
		updateItem: g,
		removeItem: n((t, n) => {
			if (!e) return;
			let r = l(t);
			if (!r) return;
			let i = r.ySection.get("items");
			if (i instanceof s.Array) {
				for (let t = 0; t < i.length; t++) if (i.get(t).get("id") === n) {
					e.transact(() => {
						i.delete(t, 1);
					});
					return;
				}
			}
		}, [e, l]),
		ackItem: n((e, t, n) => {
			g(e, t, {
				status: "acked",
				ackedBy: n,
				ackedAt: (/* @__PURE__ */ new Date()).toISOString()
			});
		}, [g]),
		rejectItem: n((e, t, n) => {
			g(e, t, {
				status: "rejected",
				ackedBy: n,
				ackedAt: (/* @__PURE__ */ new Date()).toISOString()
			});
		}, [g]),
		getSectionFragment: n((t) => {
			let n = l(t);
			if (!n) return null;
			let r = n.ySection.get("content");
			return r instanceof s.XmlFragment ? r : (queueMicrotask(() => {
				e && (n.ySection.get("content") instanceof s.XmlFragment || e.transact(() => {
					n.ySection.set("content", new s.XmlFragment());
				}));
			}), null);
		}, [e, l]),
		addComment: n((t, n) => {
			e && e.transact(() => {
				let e = d(t);
				if (!e) return;
				let r = new s.Map();
				r.set("id", crypto.randomUUID()), r.set("text", n.text), r.set("userId", n.userId), r.set("displayName", n.displayName), r.set("color", n.color), r.set("timestamp", (/* @__PURE__ */ new Date()).toISOString()), r.set("parentCommentId", n.parentCommentId ?? null), e.push([r]);
			});
		}, [e, d]),
		resolveThread: n((t, n, r) => {
			if (!e) return;
			let i = d(t);
			if (!i) return;
			let a = !1;
			e.transact(() => {
				for (let e = 0; e < i.length; e++) {
					let t = i.get(e);
					if (t.get("id") === n) {
						t.set("resolved", !0), t.set("resolvedBy", r), t.set("resolvedAt", (/* @__PURE__ */ new Date()).toISOString()), a = !0;
						break;
					}
				}
			}), a || console.warn(`resolveThread: comment ${n} not found in section ${t}`);
		}, [e, d]),
		unresolveThread: n((t, n) => {
			if (!e) return;
			let r = d(t);
			if (!r) return;
			let i = !1;
			e.transact(() => {
				for (let e = 0; e < r.length; e++) {
					let t = r.get(e);
					if (t.get("id") === n) {
						t.set("resolved", !1), t.delete("resolvedBy"), t.delete("resolvedAt"), i = !0;
						break;
					}
				}
			}), i || console.warn(`unresolveThread: comment ${n} not found in section ${t}`);
		}, [e, d])
	};
}
//#endregion
//#region src/hooks/useDocumentExport.ts
function S(e) {
	let t = {};
	return e.forEach((e, n) => {
		t[n] = e;
	}), t;
}
function C(e) {
	let t = [];
	return e.forEach((e) => {
		t.push(S(e));
	}), t;
}
function w(e) {
	let t = [];
	return e.forEach((e) => {
		let n = S(e), r = e.get("items");
		n.items = r instanceof s.Array ? C(r) : [], t.push(n);
	}), t;
}
function T(e) {
	return { exportJSON: n(() => {
		if (!e) return null;
		let t = e.getMap("meta");
		if (t.size === 0) return null;
		let n = e.getArray("sections");
		return {
			meta: S(t),
			sections: w(n)
		};
	}, [e]) };
}
//#endregion
//#region src/hooks/useCollaborativeDoc.ts
function E(e) {
	let t = {};
	return e.forEach((e, n) => {
		t[n] = e;
	}), t;
}
function D(t) {
	let { documentId: i, mode: a, ws: c, userId: l, displayName: u, color: d, onMessage: p } = t, { ydoc: h, provider: g, synced: _ } = e({
		documentId: i,
		ws: c,
		onMessage: p
	}), { meta: v, updateMeta: y } = m(h), b = x(h), { awareness: S, participants: C } = f(g, {
		userId: l,
		displayName: u,
		color: d,
		mode: a
	}), { exportJSON: w } = T(h), [D, O] = o({});
	r(() => {
		if (!h) {
			O({});
			return;
		}
		let e = h.getMap("sectionReviews"), t = () => {
			let t = {};
			e.forEach((e, n) => {
				if (!(e instanceof s.Map)) return;
				let r = E(e), i = n.split(":")[0];
				t[i] || (t[i] = []), t[i].push(r);
			}), O(t);
		};
		return e.observeDeep(t), t(), () => {
			e.unobserveDeep(t);
		};
	}, [h]);
	let k = n((e, t, n) => {
		if (!h) return;
		let r = h.getMap("sectionReviews"), i = `${e}:${l}`;
		h.transact(() => {
			let e = new s.Map();
			e.set("userId", l), e.set("displayName", u), e.set("status", t), e.set("timestamp", (/* @__PURE__ */ new Date()).toISOString()), n && e.set("comment", n), r.set(i, e);
		});
	}, [
		h,
		l,
		u
	]), A = n((e) => {
		console.warn("[useCollaborativeDoc] loadFromMarkdown is not implemented and does nothing.");
	}, []);
	return {
		meta: v,
		sections: b.sections,
		synced: _,
		updateMeta: y,
		addSection: b.addSection,
		updateSection: b.updateSection,
		removeSection: b.removeSection,
		addItem: b.addItem,
		updateItem: b.updateItem,
		removeItem: b.removeItem,
		ackItem: b.ackItem,
		rejectItem: b.rejectItem,
		getSectionFragment: b.getSectionFragment,
		ydoc: h,
		provider: g,
		loadFromMarkdown: A,
		exportJSON: w,
		participants: C,
		comments: b.comments,
		addComment: b.addComment,
		resolveThread: b.resolveThread,
		unresolveThread: b.unresolveThread,
		sectionReviews: D,
		reviewSection: k,
		awareness: S
	};
}
//#endregion
//#region src/hooks/useDocumentComments.ts
function O(e) {
	let t = /* @__PURE__ */ new Map(), n = [];
	for (let n of e) t.set(n.id, {
		...n,
		replies: []
	});
	for (let r of e) {
		let e = t.get(r.id);
		r.parentCommentId && t.has(r.parentCommentId) ? t.get(r.parentCommentId).replies.push(e) : n.push(e);
	}
	return n;
}
function k(e) {
	return {
		...e,
		id: e.id ?? e.commentId ?? ""
	};
}
function A(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = n.sectionId ?? "__unknown";
		t.has(e) || t.set(e, []), t.get(e).push(n);
	}
	let n = {};
	for (let [e, r] of t) n[e] = O(r);
	return n;
}
function j(e) {
	let { documentId: t, idToken: s, sendMessage: c, onMessage: l } = e, [u, d] = o([]), [f, p] = o(!1), m = a(c);
	r(() => {
		m.current = c;
	}, [c]);
	let h = a(t);
	r(() => {
		h.current = t;
	}, [t]);
	let g = i(() => {
		let e = { "Content-Type": "application/json" };
		return s && (e.Authorization = `Bearer ${s}`), e;
	}, [s]);
	return r(() => {
		!t || !s || (p(!0), fetch(`/api/documents/${t}/comments`, { headers: { Authorization: `Bearer ${s}` } }).then(async (e) => {
			if (!e.ok) throw Error(`Failed to load comments (${e.status})`);
			return e.json();
		}).then((e) => {
			d((e.comments ?? []).map((e) => k(e)));
		}).catch((e) => {
			console.warn("[useDocumentComments] fetch error:", e.message);
		}).finally(() => {
			p(!1);
		}));
	}, [t, s]), r(() => l((e) => {
		let t = e.type, n = e.payload;
		if (!n) return;
		let r = n.documentId;
		if (!(r && r !== h.current)) {
			if (t === "doc:comment_added") {
				let e = n.comment;
				if (!e) return;
				let t = k(e);
				d((e) => e.some((e) => e.id === t.id) ? e : [...e, t]);
				return;
			}
			if (t === "doc:comment_resolved") {
				let e = n.commentId, t = n.resolved;
				if (!e) return;
				d((r) => r.map((r) => r.id === e ? {
					...r,
					resolved: t,
					...t ? {
						resolvedBy: n.resolvedBy,
						resolvedAt: n.resolvedAt
					} : {
						resolvedBy: void 0,
						resolvedAt: void 0
					}
				} : r));
				return;
			}
			if (t === "doc:comment_deleted") {
				let e = n.commentId;
				if (!e) return;
				d((t) => t.filter((t) => t.id !== e));
				return;
			}
		}
	}), [l]), {
		comments: i(() => A(u), [u]),
		addComment: n(async (e, t, n) => {
			if (!s) return;
			let r = await fetch(`/api/documents/${h.current}/comments`, {
				method: "POST",
				headers: g,
				body: JSON.stringify({
					sectionId: e,
					text: t,
					...n ? { parentCommentId: n } : {}
				})
			});
			if (!r.ok) throw Error(`Failed to add comment (${r.status})`);
			let i = k((await r.json()).comment);
			d((e) => e.some((e) => e.id === i.id) ? e : [...e, i]);
		}, [s, g]),
		resolveThread: n(async (e, t) => {
			if (!s) return;
			let n = await fetch(`/api/documents/${h.current}/comments/${t}`, {
				method: "PATCH",
				headers: g,
				body: JSON.stringify({ resolved: !0 })
			});
			if (!n.ok) throw Error(`Failed to resolve thread (${n.status})`);
			let r = await n.json();
			d((e) => e.map((e) => e.id === t ? {
				...e,
				resolved: !0,
				resolvedBy: r.comment.resolvedBy,
				resolvedAt: r.comment.resolvedAt
			} : e));
		}, [s, g]),
		unresolveThread: n(async (e, t) => {
			if (!s) return;
			let n = await fetch(`/api/documents/${h.current}/comments/${t}`, {
				method: "PATCH",
				headers: g,
				body: JSON.stringify({ resolved: !1 })
			});
			if (!n.ok) throw Error(`Failed to unresolve thread (${n.status})`);
			d((e) => e.map((e) => e.id === t ? {
				...e,
				resolved: !1,
				resolvedBy: void 0,
				resolvedAt: void 0
			} : e));
		}, [s, g]),
		loading: f
	};
}
//#endregion
//#region src/hooks/useDocumentItems.ts
function M(e) {
	return {
		id: e.id ?? e.itemId,
		text: e.text ?? "",
		status: {
			open: "pending",
			pending: "pending",
			acked: "acked",
			done: "done",
			rejected: "rejected"
		}[e.status ?? "open"] ?? "pending",
		assignee: e.assignee ?? "",
		ackedBy: e.ackedBy ?? "",
		ackedAt: e.ackedAt ?? "",
		priority: e.priority ?? "medium",
		notes: e.notes ?? "",
		dueDate: e.dueDate,
		category: e.category
	};
}
function N(e) {
	let { documentId: t, sectionIds: s, idToken: c, sendMessage: l, onMessage: u } = e, [d, f] = o({}), [p, m] = o({}), [h, g] = o(!1), _ = a(l);
	r(() => {
		_.current = l;
	}, [l]);
	let v = a(t);
	r(() => {
		v.current = t;
	}, [t]);
	let y = i(() => {
		let e = { "Content-Type": "application/json" };
		return c && (e.Authorization = `Bearer ${c}`), e;
	}, [c]), b = s.join(",");
	return r(() => {
		if (!t || !c || s.length === 0) return;
		g(!0);
		let e = !1, n = s.map(async (e) => {
			try {
				let n = await fetch(`/api/documents/${t}/sections/${e}/items`, { headers: { Authorization: `Bearer ${c}` } });
				if (!n.ok) throw Error(`Failed to load items for section ${e} (${n.status})`);
				return {
					sectionId: e,
					items: ((await n.json()).items ?? []).map(M),
					error: null
				};
			} catch (t) {
				return console.warn(`[useDocumentItems] fetch error for section ${e}:`, t.message), {
					sectionId: e,
					items: [],
					error: t.message
				};
			}
		});
		return Promise.all(n).then((t) => {
			if (e) return;
			let n = {}, r = {};
			for (let { sectionId: e, items: i, error: a } of t) n[e] = i, a && (r[e] = a);
			f(n), m(r);
		}).finally(() => {
			e || g(!1);
		}), () => {
			e = !0;
		};
	}, [
		t,
		c,
		b
	]), r(() => u((e) => {
		let t = e.type, n = e.payload;
		if (!n) return;
		let r = n.documentId;
		if (!(r && r !== v.current)) {
			if (t === "social:post" && n.type === "section:item:created") {
				let e = n.sectionId, t = n.item;
				if (!e || !t) return;
				let r = M(t);
				f((t) => {
					let n = t[e] ?? [];
					return n.some((e) => e.id === r.id) ? t : {
						...t,
						[e]: [...n, r]
					};
				});
				return;
			}
			if (t === "social:post" && n.type === "section:item:updated") {
				let e = n.sectionId, t = n.itemId, r = n.updates;
				if (!e || !t || !r) return;
				f((n) => {
					let i = n[e];
					return i ? {
						...n,
						[e]: i.map((e) => e.id === t ? {
							...e,
							...r
						} : e)
					} : n;
				});
				return;
			}
			if (t === "social:post" && n.type === "section:item:deleted") {
				let e = n.sectionId, t = n.itemId;
				if (!e || !t) return;
				f((n) => {
					let r = n[e];
					return r ? {
						...n,
						[e]: r.filter((e) => e.id !== t)
					} : n;
				});
				return;
			}
			if (t === "social:post" && n.type === "section:item:acked") {
				let e = n.sectionId, t = n.itemId, r = n.ackedBy;
				if (!e || !t) return;
				f((n) => {
					let i = n[e];
					return i ? {
						...n,
						[e]: i.map((e) => e.id === t ? {
							...e,
							status: "acked",
							ackedBy: r ?? e.ackedBy,
							ackedAt: (/* @__PURE__ */ new Date()).toISOString()
						} : e)
					} : n;
				});
				return;
			}
		}
	}), [u]), {
		items: d,
		addItem: n(async (e, t) => {
			if (!c) return;
			let n = await fetch(`/api/documents/${v.current}/sections/${e}/items`, {
				method: "POST",
				headers: y,
				body: JSON.stringify(t)
			});
			if (!n.ok) throw Error(`Failed to add item (${n.status})`);
			let r = M((await n.json()).item);
			f((t) => {
				let n = t[e] ?? [];
				return n.some((e) => e.id === r.id) ? t : {
					...t,
					[e]: [...n, r]
				};
			});
		}, [c, y]),
		updateItem: n(async (e, t, n) => {
			if (!c) return;
			let r = await fetch(`/api/documents/${v.current}/sections/${e}/items/${t}`, {
				method: "PATCH",
				headers: y,
				body: JSON.stringify(n)
			});
			if (!r.ok) throw Error(`Failed to update item (${r.status})`);
			let i = M((await r.json()).item);
			f((n) => {
				let r = n[e];
				return r ? {
					...n,
					[e]: r.map((e) => e.id === t ? i : e)
				} : n;
			});
		}, [c, y]),
		removeItem: n(async (e, t) => {
			if (!c) return;
			let n = await fetch(`/api/documents/${v.current}/sections/${e}/items/${t}`, {
				method: "DELETE",
				headers: y
			});
			if (!n.ok) throw Error(`Failed to remove item (${n.status})`);
			f((n) => {
				let r = n[e];
				return r ? {
					...n,
					[e]: r.filter((e) => e.id !== t)
				} : n;
			});
		}, [c, y]),
		ackItem: n(async (e, t) => {
			if (!c) return;
			let n = await fetch(`/api/documents/${v.current}/sections/${e}/items/${t}/ack`, {
				method: "POST",
				headers: y
			});
			if (!n.ok) throw Error(`Failed to acknowledge item (${n.status})`);
			let r = M((await n.json()).item);
			f((n) => {
				let i = n[e];
				return i ? {
					...n,
					[e]: i.map((e) => e.id === t ? r : e)
				} : n;
			});
		}, [c, y]),
		loading: h,
		itemErrors: p
	};
}
//#endregion
//#region src/hooks/useDocumentReviews.ts
function P(e) {
	let t = {};
	for (let n of e) {
		let e = n.sectionId ?? "__unknown";
		t[e] || (t[e] = []);
		let { sectionId: r, ...i } = n;
		t[e].push(i);
	}
	return t;
}
function F(e) {
	let { documentId: t, idToken: s, sendMessage: c, onMessage: l } = e, [u, d] = o({}), [f, p] = o(!1), m = a(c);
	r(() => {
		m.current = c;
	}, [c]);
	let h = a(t);
	r(() => {
		h.current = t;
	}, [t]);
	let g = i(() => {
		let e = { "Content-Type": "application/json" };
		return s && (e.Authorization = `Bearer ${s}`), e;
	}, [s]);
	return r(() => {
		!t || !s || (p(!0), fetch(`/api/documents/${t}/reviews`, { headers: { Authorization: `Bearer ${s}` } }).then(async (e) => {
			if (!e.ok) throw Error(`Failed to load reviews (${e.status})`);
			return e.json();
		}).then((e) => {
			d(P(e.reviews ?? []));
		}).catch((e) => {
			console.warn("[useDocumentReviews] fetch error:", e.message);
		}).finally(() => {
			p(!1);
		}));
	}, [t, s]), r(() => l((e) => {
		let t = e.type, n = e.payload;
		if (!n) return;
		let r = n.documentId;
		if (!(r && r !== h.current) && t === "social:post" && n.type === "section:review") {
			let e = n.sectionId, t = n.review;
			if (!e || !t) return;
			d((n) => {
				let r = n[e] ?? [], i = r.findIndex((e) => e.userId === t.userId), a = [...r];
				return i >= 0 ? a[i] = t : a.push(t), {
					...n,
					[e]: a
				};
			});
			return;
		}
	}), [l]), {
		sectionReviews: u,
		reviewSection: n(async (e, t, n) => {
			if (!s) return;
			let r = await fetch(`/api/documents/${h.current}/sections/${e}/reviews`, {
				method: "POST",
				headers: g,
				body: JSON.stringify({
					status: t,
					...n === void 0 ? {} : { comment: n }
				})
			});
			if (!r.ok) throw Error(`Failed to submit review (${r.status})`);
			let i = await r.json();
			d((t) => {
				let n = t[e] ?? [], r = n.findIndex((e) => e.userId === i.review.userId), a = [...n];
				return r >= 0 ? a[r] = i.review : a.push(i.review), {
					...t,
					[e]: a
				};
			});
		}, [s, g]),
		loading: f
	};
}
//#endregion
//#region src/data/userDirectory.ts
var I = [
	{
		userId: "alice",
		displayName: "Alice Chen",
		email: "alice.chen@local.dev",
		color: "#3b82f6"
	},
	{
		userId: "bob",
		displayName: "Bob Martinez",
		email: "bob.martinez@local.dev",
		color: "#ef4444"
	},
	{
		userId: "carol",
		displayName: "Carol Johnson",
		email: "carol.johnson@local.dev",
		color: "#8b5cf6"
	},
	{
		userId: "dave",
		displayName: "Dave Williams",
		email: "dave.williams@local.dev",
		color: "#f59e0b"
	},
	{
		userId: "eve",
		displayName: "Eve Thompson",
		email: "eve.thompson@local.dev",
		color: "#10b981"
	},
	{
		userId: "frank",
		displayName: "Frank Davis",
		email: "frank.davis@local.dev",
		color: "#ec4899"
	},
	{
		userId: "grace",
		displayName: "Grace Wilson",
		email: "grace.wilson@local.dev",
		color: "#6366f1"
	},
	{
		userId: "hank",
		displayName: "Hank Anderson",
		email: "hank.anderson@local.dev",
		color: "#14b8a6"
	}
], L = [
	{
		id: "grp-engineering",
		name: "Engineering",
		handle: "engineering",
		memberIds: [
			"alice",
			"bob",
			"dave",
			"frank"
		],
		color: "#3b82f6"
	},
	{
		id: "grp-design",
		name: "Design",
		handle: "design",
		memberIds: ["carol", "eve"],
		color: "#8b5cf6"
	},
	{
		id: "grp-reviewers",
		name: "Reviewers",
		handle: "reviewers",
		memberIds: [
			"alice",
			"carol",
			"grace"
		],
		color: "#f59e0b"
	},
	{
		id: "grp-everyone",
		name: "Everyone",
		handle: "everyone",
		memberIds: [
			"alice",
			"bob",
			"carol",
			"dave",
			"eve",
			"frank",
			"grace",
			"hank"
		],
		color: "#6b7280"
	}
];
function R(e) {
	let t = e.toLowerCase();
	return I.filter((e) => e.displayName.toLowerCase().includes(t) || e.email.toLowerCase().includes(t));
}
//#endregion
//#region src/hooks/useMentionUsers.ts
function z(e) {
	return i(() => {
		let t = /* @__PURE__ */ new Set(), n = [];
		for (let r of e) {
			let e = r.userId || r.clientId;
			if (t.has(e)) continue;
			t.add(e);
			let i = I.find((e) => e.displayName.toLowerCase() === r.displayName.toLowerCase() || e.displayName.split(" ")[0].toLowerCase() === r.displayName.split(" ")[0].toLowerCase());
			n.push({
				userId: r.userId || r.clientId,
				displayName: i?.displayName || r.displayName,
				color: i?.color || r.color,
				online: !0,
				mode: r.mode,
				type: "user"
			});
		}
		for (let e of I) t.has(e.userId) || n.some((t) => t.displayName === e.displayName) || n.push({
			userId: e.userId,
			displayName: e.displayName,
			color: e.color,
			online: !1,
			type: "user"
		});
		for (let e of L) n.push({
			userId: e.id,
			displayName: e.name,
			color: e.color,
			online: !1,
			type: "group",
			memberCount: e.memberIds.length
		});
		return n;
	}, [e]);
}
//#endregion
//#region src/hooks/useMyMentionsAndTasks.ts
function B(e) {
	let t = [];
	for (let n of e) t.push(n), n.replies && n.replies.length > 0 && t.push(...B(n.replies));
	return t;
}
function V(e, t) {
	let n = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	return RegExp(`@${n}(?=\\s|$|[.!?,;:])`, "i").test(e);
}
function H({ sections: e, comments: t, displayName: n, userId: r }) {
	return i(() => {
		let i = [], a = [];
		for (let a of e) {
			let e = t[a.id];
			if (!e) continue;
			let o = B(e);
			for (let e of o) e.userId !== r && V(e.text, n) && i.push({
				kind: "mention",
				sectionId: a.id,
				sectionTitle: a.title,
				commentId: e.id,
				authorName: e.displayName,
				authorColor: e.color,
				commentText: e.text,
				timestamp: e.timestamp
			});
		}
		for (let t of e) for (let e of t.items) {
			let i = (e.assignee ?? "").toLowerCase();
			(i === n.toLowerCase() || i === r.toLowerCase()) && a.push({
				kind: "task",
				sectionId: t.id,
				sectionTitle: t.title,
				itemId: e.id,
				taskText: e.text,
				status: e.status,
				priority: e.priority
			});
		}
		return i.sort((e, t) => new Date(t.timestamp).getTime() - new Date(e.timestamp).getTime()), [...i, ...a];
	}, [
		e,
		t,
		n,
		r
	]);
}
//#endregion
//#region src/hooks/useVersionHistory.ts
function U(e) {
	let t = e.getArray("sections"), n = [];
	for (let e = 0; e < t.length; e++) {
		let r = t.get(e);
		if (!r || typeof r.get != "function") continue;
		let i = r.get("id") ?? "", a = r.get("type") ?? "tasks", o = r.get("title") ?? "", s = r.get("items"), c = [];
		if (s && typeof s.toArray == "function") for (let e of s.toArray()) {
			if (!e || typeof e.get != "function") continue;
			let t = e;
			c.push({
				id: t.get("id") ?? "",
				text: t.get("text") ?? "",
				status: t.get("status") ?? "pending",
				assignee: t.get("assignee") ?? "",
				priority: t.get("priority") ?? "medium"
			});
		}
		let l = "", u = r.get("content");
		u && typeof u.toString == "function" && (l = u.toString().replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()), n.push({
			id: i,
			type: a,
			title: o,
			textContent: l,
			items: c
		});
	}
	return n;
}
function W(e) {
	let { channel: i, sendMessage: c, onMessage: l } = e, [u, d] = o([]), [f, p] = o(!1), [m, h] = o(null), [g, _] = o(null), [v, y] = o(null), [b, x] = o(null), S = a(null), C = a(null), w = a(!1);
	return r(() => l((e) => {
		if (e.type === "error" && e.service === "crdt") {
			p(!1);
			return;
		}
		if (e.type === "crdt" && e.channel === i) switch (e.action) {
			case "snapshotList": {
				let t = e.snapshots;
				d(t ?? []), p(!1);
				break;
			}
			case "snapshot": {
				if (!e.version) break;
				let n = e.update;
				if (!n) break;
				let r = new s.Doc({ gc: !1 }), i = t(n);
				s.applyUpdate(r, i), w.current ? (w.current = !1, C.current && C.current.destroy(), C.current = r, y(U(r))) : (S.current && S.current.destroy(), S.current = r, h(r));
				break;
			}
			case "versionSaved":
				p(!0), c({
					service: "crdt",
					action: "listSnapshots",
					channel: i,
					limit: 20
				});
				break;
			case "snapshotRestored": p(!0), c({
				service: "crdt",
				action: "listSnapshots",
				channel: i,
				limit: 20
			});
		}
	}), [
		i,
		l,
		c
	]), r(() => () => {
		S.current &&= (S.current.destroy(), null), C.current &&= (C.current.destroy(), null);
	}, []), {
		versions: u,
		loading: f,
		fetchVersions: n(() => {
			p(!0), c({
				service: "crdt",
				action: "listSnapshots",
				channel: i,
				limit: 20
			});
		}, [i, c]),
		previewVersion: n((e) => {
			_(e), c({
				service: "crdt",
				action: "getSnapshotAtVersion",
				channel: i,
				timestamp: e
			});
		}, [i, c]),
		restoreVersion: n((e) => {
			c({
				service: "crdt",
				action: "restoreSnapshot",
				channel: i,
				timestamp: e
			});
		}, [i, c]),
		previewDoc: m,
		previewTimestamp: g,
		clearPreview: n(() => {
			S.current &&= (S.current.destroy(), null), h(null), _(null);
		}, []),
		saveVersion: n((e) => {
			c({
				service: "crdt",
				action: "saveVersion",
				channel: i,
				name: e
			});
		}, [i, c]),
		extractSections: n((e) => U(e), []),
		compareSections: v,
		compareTimestamp: b,
		compareVersion: n((e) => {
			w.current = !0, x(e), c({
				service: "crdt",
				action: "getSnapshotAtVersion",
				channel: i,
				timestamp: e
			});
		}, [i, c]),
		clearCompare: n(() => {
			C.current &&= (C.current.destroy(), null), y(null), x(null);
		}, [])
	};
}
//#endregion
//#region src/hooks/useVideoCall.ts
function G(e) {
	let { documentId: t, idToken: i, meta: s, updateMeta: c, sendMessage: l, displayName: u } = e, [d, f] = o("idle"), [p, m] = o(null), [h, g] = o(null), [_, v] = o(null), [y, b] = o(null), [x, S] = o(null), C = a(p);
	r(() => {
		C.current = p;
	}, [p]), r(() => {
		let e = () => {
			let e = C.current;
			e && navigator.sendBeacon(`/api/video/sessions/${e}/end`, new Blob([JSON.stringify({ documentId: t })], { type: "application/json" }));
		};
		return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
	}, []);
	let w = !!s?.activeCallSessionId && !p, T = a(i);
	r(() => {
		T.current = i;
	}, [i]);
	let E = n(() => {
		let e = T.current, t = { "Content-Type": "application/json" };
		return e && (t.Authorization = `Bearer ${e}`), t;
	}, []), D = n(async (e) => {
		f("joining"), S(null);
		try {
			let n = await fetch(`/api/video/sessions/${e}/join`, {
				method: "POST",
				headers: E(),
				body: JSON.stringify({
					documentId: t,
					displayName: u
				})
			});
			if (!n.ok) {
				let r = await n.json().catch(() => ({ error: "Join failed" })), i = n.status;
				throw i === 404 || i === 410 ? (console.warn("[useVideoCall] Session", e, "no longer exists, clearing stale meta"), c({ activeCallSessionId: "" }), l({
					service: "crdt",
					action: "updateDocumentMeta",
					documentId: t,
					meta: { activeCallSessionId: "" }
				}), Error("This call has ended. The page has been updated.")) : Error(r.error);
			}
			let r = await n.json();
			return m(e), g(r.token), v(r.participantId), b(r.userId), f("active"), !0;
		} catch (e) {
			return S(e.message), f("error"), !1;
		}
	}, [
		t,
		u,
		E,
		c,
		l
	]);
	return {
		callState: d,
		sessionId: p,
		stageToken: h,
		participantId: _,
		userId: y,
		error: x,
		hasActiveCall: w,
		startCall: n(async () => {
			f("creating"), S(null);
			try {
				let e = await fetch("/api/video/sessions", {
					method: "POST",
					headers: E(),
					body: JSON.stringify({
						documentId: t,
						displayName: u
					})
				});
				if (!e.ok) {
					let t = await e.json().catch(() => ({ error: "Create failed" }));
					throw Error(t.error);
				}
				let n = (await e.json()).sessionId;
				if (!await D(n)) return;
				c({ activeCallSessionId: n }), l({
					service: "crdt",
					action: "updateDocumentMeta",
					documentId: t,
					meta: { activeCallSessionId: n }
				});
			} catch (e) {
				S(e.message), f("error");
			}
		}, [
			t,
			u,
			E,
			c,
			l,
			D
		]),
		joinCall: n(async (e) => {
			await D(e);
		}, [D]),
		endCall: n(async () => {
			let e = C.current;
			e && fetch(`/api/video/sessions/${e}/end`, {
				method: "POST",
				headers: E(),
				body: JSON.stringify({ documentId: t })
			}).catch((e) => {
				console.error("[useVideoCall] Failed to end session on server:", e);
			}), c({ activeCallSessionId: "" }), l({
				service: "crdt",
				action: "updateDocumentMeta",
				documentId: t,
				meta: { activeCallSessionId: "" }
			}), m(null), g(null), v(null), b(null), f("idle"), S(null);
		}, [
			t,
			E,
			c,
			l
		])
	};
}
//#endregion
//#region src/hooks/useVideoSessions.ts
function K(e, t) {
	let [r, i] = o([]), [a, s] = o(!1);
	return {
		sessions: r,
		loading: a,
		fetchSessions: n(async () => {
			s(!0);
			try {
				let n = { "Content-Type": "application/json" };
				t && (n.Authorization = `Bearer ${t}`);
				let r = await fetch(`/api/video/sessions/document/${e}`, { headers: n });
				if (!r.ok) return;
				let a = await r.json();
				i(a.sessions);
			} catch {} finally {
				s(!1);
			}
		}, [e, t])
	};
}
//#endregion
export { u as _, z as a, F as c, D as d, T as f, d as g, f as h, H as i, N as l, m, G as n, I as o, x as p, W as r, R as s, K as t, j as u };
