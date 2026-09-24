import { n as e, r as t } from "./useWebSocket-16eHDqT5.js";
import { n, t as r } from "./userDirectory-CyWbVxFq.js";
import { useCallback as i, useEffect as a, useMemo as o, useRef as s, useState as c } from "react";
import * as l from "yjs";
//#region src/hooks/useIdleDetector.ts
var u = 12e4, d = 500;
function f(e = {}) {
	let { timeoutMs: t = u } = e, [n, r] = c(!1), o = s(null), l = s(null), f = s(!1), p = i(() => {
		o.current !== null && clearTimeout(o.current), f.current && (f.current = !1, r(!1)), o.current = setTimeout(() => {
			f.current = !0, r(!0);
		}, t);
	}, [t]), m = i(() => {
		l.current === null && (l.current = setTimeout(() => {
			l.current = null;
		}, d), p());
	}, [p]);
	return a(() => {
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
			o.current !== null && clearTimeout(o.current), l.current !== null && clearTimeout(l.current);
		};
	}, [m, p]), { isIdle: n };
}
//#endregion
//#region src/hooks/useAwarenessState.ts
function p(e, t) {
	let n = s({
		...t,
		name: t.displayName,
		lastSeen: Date.now(),
		idle: !1
	}), r = s(e);
	r.current = e;
	let c = i(() => {
		let e = r.current;
		e?.awareness && (n.current.lastSeen = Date.now(), e.awareness.setLocalStateField("user", { ...n.current }));
	}, []);
	a(() => {
		e?.awareness && (n.current = {
			...n.current,
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
	let { isIdle: l } = f();
	a(() => {
		n.current.idle = l, c();
	}, [l, c]);
	let u = i((e) => {
		n.current.currentSectionId = e, c();
	}, [c]), d = i((e) => {
		n.current.mode = e, c();
	}, [c]), p = i((e) => {
		n.current.idle = e, c();
	}, [c]), m = i((e, t) => {
		n.current.name = e, n.current.color = t, c();
	}, [c]);
	return o(() => ({
		updateSection: u,
		updateMode: d,
		updateIdle: p,
		updateCursorInfo: m
	}), [
		u,
		d,
		p,
		m
	]);
}
//#endregion
//#region src/hooks/useAwareness.ts
function m(e, t) {
	let [n, r] = c([]), i = p(e, {
		userId: t.userId,
		displayName: t.displayName,
		color: t.color,
		mode: t.mode,
		currentSectionId: null
	});
	return a(() => {
		if (!e) {
			r([]);
			return;
		}
		let t = "", n = () => {
			let n = e.awareness.getStates(), i = [];
			n.forEach((t, n) => {
				if (n === e.awareness.clientID) return;
				let r = t.user;
				r && i.push({
					clientId: String(n),
					userId: r.userId ?? "",
					displayName: r.displayName ?? "Anonymous",
					color: r.color ?? "#3b82f6",
					mode: r.mode === "ack" ? "reviewer" : r.mode === "reader" ? "reader" : "editor",
					currentSectionId: r.currentSectionId ?? null,
					lastSeen: r.lastSeen ?? Date.now(),
					idle: r.idle ?? !1
				});
			});
			let a = /* @__PURE__ */ new Map();
			for (let e of i) {
				let t = e.userId || e.displayName || e.clientId, n = a.get(t);
				(!n || (e.lastSeen ?? 0) > (n.lastSeen ?? 0)) && a.set(t, e);
			}
			let o = Array.from(a.values()), s = o.map((e) => `${e.clientId}:${e.currentSectionId}:${e.mode}:${e.idle}`).join("|");
			s !== t && (t = s, queueMicrotask(() => r(o)));
		};
		return e.awareness.on("change", n), n(), () => {
			e.awareness.off("change", n);
		};
	}, [e]), o(() => ({
		awareness: i,
		participants: n
	}), [i, n]);
}
//#endregion
//#region src/hooks/useDocumentMetadata.ts
function h(e) {
	let t = {};
	return e.forEach((e, n) => {
		t[n] = e;
	}), t;
}
function g(e) {
	let [t, n] = c(null);
	return a(() => {
		if (!e) {
			n(null);
			return;
		}
		let t = e.getMap("meta"), r = () => {
			t.size > 0 && n(h(t));
		};
		return t.observe(r), r(), () => {
			t.unobserve(r);
		};
	}, [e]), {
		meta: t,
		updateMeta: i((t) => {
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
function _(e) {
	let t = {};
	return e.forEach((e, n) => {
		t[n] = e;
	}), t;
}
function v(e) {
	let t = [];
	return e.forEach((e) => {
		t.push(_(e));
	}), t;
}
function y(e) {
	let t = [];
	return e.forEach((e) => {
		let n = _(e), r = e.get("items");
		n.items = r instanceof l.Array ? v(r) : [], t.push(n);
	}), t;
}
function b(e, t) {
	for (let [n, r] of Object.entries(t)) e.set(n, r);
}
function x(e) {
	let t = [];
	return e.forEach((e) => {
		t.push(_(e));
	}), t;
}
function S(e) {
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
function C(e) {
	let [t, n] = c([]), [r, o] = c({});
	a(() => {
		if (!e) {
			n([]), o({});
			return;
		}
		let t = e.getArray("sections"), r = null, i = () => {
			r && clearTimeout(r), r = setTimeout(() => {
				let e = y(t);
				n(e);
				let r = {};
				for (let e = 0; e < t.length; e++) {
					let n = t.get(e), i = n.get("id"), a = n.get("comments");
					a instanceof l.Array && (r[i] = S(x(a)));
				}
				o(r);
			}, 16);
		};
		return t.observeDeep(i), i(), () => {
			r && clearTimeout(r), t.unobserveDeep(i);
		};
	}, [e]);
	let s = i((t) => {
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
	}, [e]), u = i((e, t) => {
		let n = s(e);
		if (!n) return null;
		let r = n.ySection.get("items");
		if (!(r instanceof l.Array)) return null;
		for (let e = 0; e < r.length; e++) {
			let n = r.get(e);
			if (n.get("id") === t) return n;
		}
		return null;
	}, [s]), d = i((t) => {
		if (!e) return null;
		let n = s(t);
		if (!n) return null;
		let r = n.ySection.get("comments");
		return r instanceof l.Array || (r = new l.Array(), n.ySection.set("comments", r)), r;
	}, [e, s]), f = i((t) => {
		if (!e) return;
		let n = e.getArray("sections");
		e.transact(() => {
			let e = new l.Map(), { items: r, ...i } = t;
			b(e, i);
			let a = new l.Array();
			for (let e of r) {
				let t = new l.Map();
				b(t, e), a.push([t]);
			}
			e.set("items", a), n.push([e]);
		});
	}, [e]), p = i((t, n) => {
		if (!e) return;
		let r = s(t);
		r && e.transact(() => {
			let { items: e, ...t } = n;
			for (let [e, n] of Object.entries(t)) r.ySection.set(e, n);
		});
	}, [e, s]), m = i((t) => {
		if (!e) return;
		let n = s(t);
		if (!n) return;
		let r = e.getArray("sections");
		e.transact(() => {
			r.delete(n.index, 1);
		});
	}, [e, s]), h = i((t, n) => {
		if (!e) return;
		let r = s(t);
		r && e.transact(() => {
			let e = r.ySection.get("items");
			e instanceof l.Array || (e = new l.Array(), r.ySection.set("items", e));
			let t = new l.Map();
			b(t, n), e.push([t]);
		});
	}, [e, s]), g = i((t, n, r) => {
		if (!e) return;
		let i = u(t, n);
		i && e.transact(() => {
			for (let [e, t] of Object.entries(r)) i.set(e, t);
		});
	}, [e, u]);
	return {
		sections: t,
		comments: r,
		addSection: f,
		updateSection: p,
		removeSection: m,
		addItem: h,
		updateItem: g,
		removeItem: i((t, n) => {
			if (!e) return;
			let r = s(t);
			if (!r) return;
			let i = r.ySection.get("items");
			if (i instanceof l.Array) {
				for (let t = 0; t < i.length; t++) if (i.get(t).get("id") === n) {
					e.transact(() => {
						i.delete(t, 1);
					});
					return;
				}
			}
		}, [e, s]),
		ackItem: i((e, t, n) => {
			g(e, t, {
				status: "acked",
				ackedBy: n,
				ackedAt: (/* @__PURE__ */ new Date()).toISOString()
			});
		}, [g]),
		rejectItem: i((e, t, n) => {
			g(e, t, {
				status: "rejected",
				ackedBy: n,
				ackedAt: (/* @__PURE__ */ new Date()).toISOString()
			});
		}, [g]),
		getSectionFragment: i((t) => {
			let n = s(t);
			if (!n) return null;
			let r = n.ySection.get("content");
			return r instanceof l.XmlFragment ? r : (queueMicrotask(() => {
				e && (n.ySection.get("content") instanceof l.XmlFragment || e.transact(() => {
					n.ySection.set("content", new l.XmlFragment());
				}));
			}), null);
		}, [e, s]),
		addComment: i((t, n) => {
			e && e.transact(() => {
				let e = d(t);
				if (!e) return;
				let r = new l.Map();
				r.set("id", crypto.randomUUID()), r.set("text", n.text), r.set("userId", n.userId), r.set("displayName", n.displayName), r.set("color", n.color), r.set("timestamp", (/* @__PURE__ */ new Date()).toISOString()), r.set("parentCommentId", n.parentCommentId ?? null), e.push([r]);
			});
		}, [e, d]),
		resolveThread: i((t, n, r) => {
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
		unresolveThread: i((t, n) => {
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
function w(e) {
	let t = {};
	return e.forEach((e, n) => {
		t[n] = e;
	}), t;
}
function T(e) {
	let t = [];
	return e.forEach((e) => {
		t.push(w(e));
	}), t;
}
function E(e) {
	let t = [];
	return e.forEach((e) => {
		let n = w(e), r = e.get("items");
		n.items = r instanceof l.Array ? T(r) : [], t.push(n);
	}), t;
}
function D(e) {
	return { exportJSON: i(() => {
		if (!e) return null;
		let t = e.getMap("meta");
		if (t.size === 0) return null;
		let n = e.getArray("sections");
		return {
			meta: w(t),
			sections: E(n)
		};
	}, [e]) };
}
//#endregion
//#region src/hooks/useCollaborativeDoc.ts
function O(e) {
	let t = {};
	return e.forEach((e, n) => {
		t[n] = e;
	}), t;
}
function k(t) {
	let { documentId: n, mode: r, ws: o, userId: s, displayName: u, color: d, onMessage: f } = t, { ydoc: p, provider: h, synced: _ } = e({
		documentId: n,
		ws: o,
		onMessage: f
	}), { meta: v, updateMeta: y } = g(p), b = C(p), { awareness: x, participants: S } = m(h, {
		userId: s,
		displayName: u,
		color: d,
		mode: r
	}), { exportJSON: w } = D(p), [T, E] = c({});
	a(() => {
		if (!p) {
			E({});
			return;
		}
		let e = p.getMap("sectionReviews"), t = () => {
			let t = {};
			e.forEach((e, n) => {
				if (!(e instanceof l.Map)) return;
				let r = O(e), i = n.split(":")[0];
				t[i] || (t[i] = []), t[i].push(r);
			}), E(t);
		};
		return e.observeDeep(t), t(), () => {
			e.unobserveDeep(t);
		};
	}, [p]);
	let k = i((e, t, n) => {
		if (!p) return;
		let r = p.getMap("sectionReviews"), i = `${e}:${s}`;
		p.transact(() => {
			let e = new l.Map();
			e.set("userId", s), e.set("displayName", u), e.set("status", t), e.set("timestamp", (/* @__PURE__ */ new Date()).toISOString()), n && e.set("comment", n), r.set(i, e);
		});
	}, [
		p,
		s,
		u
	]), A = i((e) => {
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
		ydoc: p,
		provider: h,
		loadFromMarkdown: A,
		exportJSON: w,
		participants: S,
		comments: b.comments,
		addComment: b.addComment,
		resolveThread: b.resolveThread,
		unresolveThread: b.unresolveThread,
		sectionReviews: T,
		reviewSection: k,
		awareness: x
	};
}
//#endregion
//#region src/hooks/useDocumentComments.ts
function A(e) {
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
function j(e) {
	return {
		...e,
		id: e.id ?? e.commentId ?? ""
	};
}
function M(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = n.sectionId ?? "__unknown";
		t.has(e) || t.set(e, []), t.get(e).push(n);
	}
	let n = {};
	for (let [e, r] of t) n[e] = A(r);
	return n;
}
function N(e) {
	let { documentId: t, idToken: n, sendMessage: r, onMessage: l } = e, [u, d] = c([]), [f, p] = c(!1), m = s(r);
	a(() => {
		m.current = r;
	}, [r]);
	let h = s(t);
	a(() => {
		h.current = t;
	}, [t]);
	let g = o(() => {
		let e = { "Content-Type": "application/json" };
		return n && (e.Authorization = `Bearer ${n}`), e;
	}, [n]);
	return a(() => {
		!t || !n || (p(!0), fetch(`/api/documents/${t}/comments`, { headers: { Authorization: `Bearer ${n}` } }).then(async (e) => {
			if (!e.ok) throw Error(`Failed to load comments (${e.status})`);
			return e.json();
		}).then((e) => {
			d((e.comments ?? []).map((e) => j(e)));
		}).catch((e) => {
			console.warn("[useDocumentComments] fetch error:", e.message);
		}).finally(() => {
			p(!1);
		}));
	}, [t, n]), a(() => l((e) => {
		let t = e.type, n = e.payload;
		if (!n) return;
		let r = n.documentId;
		if (!(r && r !== h.current)) {
			if (t === "doc:comment_added") {
				let e = n.comment;
				if (!e) return;
				let t = j(e);
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
		comments: o(() => M(u), [u]),
		addComment: i(async (e, t, r) => {
			if (!n) return;
			let i = await fetch(`/api/documents/${h.current}/comments`, {
				method: "POST",
				headers: g,
				body: JSON.stringify({
					sectionId: e,
					text: t,
					...r ? { parentCommentId: r } : {}
				})
			});
			if (!i.ok) throw Error(`Failed to add comment (${i.status})`);
			let a = j((await i.json()).comment);
			d((e) => e.some((e) => e.id === a.id) ? e : [...e, a]);
		}, [n, g]),
		resolveThread: i(async (e, t) => {
			if (!n) return;
			let r = await fetch(`/api/documents/${h.current}/comments/${t}`, {
				method: "PATCH",
				headers: g,
				body: JSON.stringify({ resolved: !0 })
			});
			if (!r.ok) throw Error(`Failed to resolve thread (${r.status})`);
			let i = await r.json();
			d((e) => e.map((e) => e.id === t ? {
				...e,
				resolved: !0,
				resolvedBy: i.comment.resolvedBy,
				resolvedAt: i.comment.resolvedAt
			} : e));
		}, [n, g]),
		unresolveThread: i(async (e, t) => {
			if (!n) return;
			let r = await fetch(`/api/documents/${h.current}/comments/${t}`, {
				method: "PATCH",
				headers: g,
				body: JSON.stringify({ resolved: !1 })
			});
			if (!r.ok) throw Error(`Failed to unresolve thread (${r.status})`);
			d((e) => e.map((e) => e.id === t ? {
				...e,
				resolved: !1,
				resolvedBy: void 0,
				resolvedAt: void 0
			} : e));
		}, [n, g]),
		loading: f
	};
}
//#endregion
//#region src/hooks/useDocumentItems.ts
function P(e) {
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
function F(e) {
	let { documentId: t, sectionIds: n, idToken: r, sendMessage: l, onMessage: u } = e, [d, f] = c({}), [p, m] = c({}), [h, g] = c(!1), _ = s(l);
	a(() => {
		_.current = l;
	}, [l]);
	let v = s(t);
	a(() => {
		v.current = t;
	}, [t]);
	let y = o(() => {
		let e = { "Content-Type": "application/json" };
		return r && (e.Authorization = `Bearer ${r}`), e;
	}, [r]), b = n.join(",");
	return a(() => {
		if (!t || !r || n.length === 0) return;
		g(!0);
		let e = !1, i = n.map(async (e) => {
			try {
				let n = await fetch(`/api/documents/${t}/sections/${e}/items`, { headers: { Authorization: `Bearer ${r}` } });
				if (!n.ok) throw Error(`Failed to load items for section ${e} (${n.status})`);
				return {
					sectionId: e,
					items: ((await n.json()).items ?? []).map(P),
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
		return Promise.all(i).then((t) => {
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
		r,
		b
	]), a(() => u((e) => {
		let t = e.type, n = e.payload;
		if (!n) return;
		let r = n.documentId;
		if (!(r && r !== v.current)) {
			if (t === "social:post" && n.type === "section:item:created") {
				let e = n.sectionId, t = n.item;
				if (!e || !t) return;
				let r = P(t);
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
		addItem: i(async (e, t) => {
			if (!r) return;
			let n = await fetch(`/api/documents/${v.current}/sections/${e}/items`, {
				method: "POST",
				headers: y,
				body: JSON.stringify(t)
			});
			if (!n.ok) throw Error(`Failed to add item (${n.status})`);
			let i = P((await n.json()).item);
			f((t) => {
				let n = t[e] ?? [];
				return n.some((e) => e.id === i.id) ? t : {
					...t,
					[e]: [...n, i]
				};
			});
		}, [r, y]),
		updateItem: i(async (e, t, n) => {
			if (!r) return;
			let i = await fetch(`/api/documents/${v.current}/sections/${e}/items/${t}`, {
				method: "PATCH",
				headers: y,
				body: JSON.stringify(n)
			});
			if (!i.ok) throw Error(`Failed to update item (${i.status})`);
			let a = P((await i.json()).item);
			f((n) => {
				let r = n[e];
				return r ? {
					...n,
					[e]: r.map((e) => e.id === t ? a : e)
				} : n;
			});
		}, [r, y]),
		removeItem: i(async (e, t) => {
			if (!r) return;
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
		}, [r, y]),
		ackItem: i(async (e, t) => {
			if (!r) return;
			let n = await fetch(`/api/documents/${v.current}/sections/${e}/items/${t}/ack`, {
				method: "POST",
				headers: y
			});
			if (!n.ok) throw Error(`Failed to acknowledge item (${n.status})`);
			let i = P((await n.json()).item);
			f((n) => {
				let r = n[e];
				return r ? {
					...n,
					[e]: r.map((e) => e.id === t ? i : e)
				} : n;
			});
		}, [r, y]),
		loading: h,
		itemErrors: p
	};
}
//#endregion
//#region src/hooks/useDocumentReviews.ts
function I(e) {
	let t = {};
	for (let n of e) {
		let e = n.sectionId ?? "__unknown";
		t[e] || (t[e] = []);
		let { sectionId: r, ...i } = n;
		t[e].push(i);
	}
	return t;
}
function L(e) {
	let { documentId: t, idToken: n, sendMessage: r, onMessage: l } = e, [u, d] = c({}), [f, p] = c(!1), m = s(r);
	a(() => {
		m.current = r;
	}, [r]);
	let h = s(t);
	a(() => {
		h.current = t;
	}, [t]);
	let g = o(() => {
		let e = { "Content-Type": "application/json" };
		return n && (e.Authorization = `Bearer ${n}`), e;
	}, [n]);
	return a(() => {
		!t || !n || (p(!0), fetch(`/api/documents/${t}/reviews`, { headers: { Authorization: `Bearer ${n}` } }).then(async (e) => {
			if (!e.ok) throw Error(`Failed to load reviews (${e.status})`);
			return e.json();
		}).then((e) => {
			d(I(e.reviews ?? []));
		}).catch((e) => {
			console.warn("[useDocumentReviews] fetch error:", e.message);
		}).finally(() => {
			p(!1);
		}));
	}, [t, n]), a(() => l((e) => {
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
		reviewSection: i(async (e, t, r) => {
			if (!n) return;
			let i = await fetch(`/api/documents/${h.current}/sections/${e}/reviews`, {
				method: "POST",
				headers: g,
				body: JSON.stringify({
					status: t,
					...r === void 0 ? {} : { comment: r }
				})
			});
			if (!i.ok) throw Error(`Failed to submit review (${i.status})`);
			let a = await i.json();
			d((t) => {
				let n = t[e] ?? [], r = n.findIndex((e) => e.userId === a.review.userId), i = [...n];
				return r >= 0 ? i[r] = a.review : i.push(a.review), {
					...t,
					[e]: i
				};
			});
		}, [n, g]),
		loading: f
	};
}
//#endregion
//#region src/hooks/useMentionUsers.ts
function R(e) {
	return o(() => {
		let t = /* @__PURE__ */ new Set(), i = [];
		for (let r of e) {
			let e = r.userId || r.clientId;
			if (t.has(e)) continue;
			t.add(e);
			let a = n.find((e) => e.displayName.toLowerCase() === r.displayName.toLowerCase() || e.displayName.split(" ")[0].toLowerCase() === r.displayName.split(" ")[0].toLowerCase());
			i.push({
				userId: r.userId || r.clientId,
				displayName: a?.displayName || r.displayName,
				color: a?.color || r.color,
				online: !0,
				mode: r.mode,
				type: "user"
			});
		}
		for (let e of n) t.has(e.userId) || i.some((t) => t.displayName === e.displayName) || i.push({
			userId: e.userId,
			displayName: e.displayName,
			color: e.color,
			online: !1,
			type: "user"
		});
		for (let e of r) i.push({
			userId: e.id,
			displayName: e.name,
			color: e.color,
			online: !1,
			type: "group",
			memberCount: e.memberIds.length
		});
		return i;
	}, [e]);
}
//#endregion
//#region src/hooks/useMyMentionsAndTasks.ts
function z(e) {
	let t = [];
	for (let n of e) t.push(n), n.replies && n.replies.length > 0 && t.push(...z(n.replies));
	return t;
}
function B(e, t) {
	let n = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	return RegExp(`@${n}(?=\\s|$|[.!?,;:])`, "i").test(e);
}
function V({ sections: e, comments: t, displayName: n, userId: r }) {
	return o(() => {
		let i = [], a = [];
		for (let [a, o] of Object.entries(t)) {
			if (!o) continue;
			let t = e.find((e) => e.id === a), s = z(o);
			for (let e of s) e.userId !== r && B(e.text, n) && i.push({
				kind: "mention",
				sectionId: a,
				sectionTitle: t?.title ?? "",
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
function H(e) {
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
function U(e) {
	let { channel: n, sendMessage: r, onMessage: o } = e, [u, d] = c([]), [f, p] = c(!1), [m, h] = c(null), [g, _] = c(null), [v, y] = c(null), [b, x] = c(null), S = s(null), C = s(null), w = s(!1);
	return a(() => o((e) => {
		if (e.type === "error" && e.service === "crdt") {
			p(!1);
			return;
		}
		if (e.type === "crdt" && e.channel === n) switch (e.action) {
			case "snapshotList": {
				let t = e.snapshots;
				d(t ?? []), p(!1);
				break;
			}
			case "snapshot": {
				if (!e.version) break;
				let n = e.update;
				if (!n) break;
				let r = new l.Doc({ gc: !1 }), i = t(n);
				l.applyUpdate(r, i), w.current ? (w.current = !1, C.current && C.current.destroy(), C.current = r, y(H(r))) : (S.current && S.current.destroy(), S.current = r, h(r));
				break;
			}
			case "versionSaved":
				p(!0), r({
					service: "crdt",
					action: "listSnapshots",
					channel: n,
					limit: 20
				});
				break;
			case "snapshotRestored": p(!0), r({
				service: "crdt",
				action: "listSnapshots",
				channel: n,
				limit: 20
			});
		}
	}), [
		n,
		o,
		r
	]), a(() => () => {
		S.current &&= (S.current.destroy(), null), C.current &&= (C.current.destroy(), null);
	}, []), {
		versions: u,
		loading: f,
		fetchVersions: i(() => {
			p(!0), r({
				service: "crdt",
				action: "listSnapshots",
				channel: n,
				limit: 20
			});
		}, [n, r]),
		previewVersion: i((e) => {
			_(e), r({
				service: "crdt",
				action: "getSnapshotAtVersion",
				channel: n,
				timestamp: e
			});
		}, [n, r]),
		restoreVersion: i((e) => {
			r({
				service: "crdt",
				action: "restoreSnapshot",
				channel: n,
				timestamp: e
			});
		}, [n, r]),
		previewDoc: m,
		previewTimestamp: g,
		clearPreview: i(() => {
			S.current &&= (S.current.destroy(), null), h(null), _(null);
		}, []),
		saveVersion: i((e) => {
			r({
				service: "crdt",
				action: "saveVersion",
				channel: n,
				name: e
			});
		}, [n, r]),
		extractSections: i((e) => H(e), []),
		compareSections: v,
		compareTimestamp: b,
		compareVersion: i((e) => {
			w.current = !0, x(e), r({
				service: "crdt",
				action: "getSnapshotAtVersion",
				channel: n,
				timestamp: e
			});
		}, [n, r]),
		clearCompare: i(() => {
			C.current &&= (C.current.destroy(), null), y(null), x(null);
		}, [])
	};
}
//#endregion
//#region src/hooks/useVideoCall.ts
function W(e) {
	let { documentId: t, idToken: n, meta: r, updateMeta: o, sendMessage: l, displayName: u } = e, [d, f] = c("idle"), [p, m] = c(null), [h, g] = c(null), [_, v] = c(null), [y, b] = c(null), [x, S] = c(null), C = s(p);
	a(() => {
		C.current = p;
	}, [p]), a(() => {
		let e = () => {
			let e = C.current;
			e && navigator.sendBeacon(`/api/video/sessions/${e}/end`, new Blob([JSON.stringify({ documentId: t })], { type: "application/json" }));
		};
		return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
	}, []);
	let w = !!r?.activeCallSessionId && !p, T = s(n);
	a(() => {
		T.current = n;
	}, [n]);
	let E = i(() => {
		let e = T.current, t = { "Content-Type": "application/json" };
		return e && (t.Authorization = `Bearer ${e}`), t;
	}, []), D = i(async (e) => {
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
				throw i === 404 || i === 410 ? (console.warn("[useVideoCall] Session", e, "no longer exists, clearing stale meta"), o({ activeCallSessionId: "" }), l({
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
		o,
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
		startCall: i(async () => {
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
				o({ activeCallSessionId: n }), l({
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
			o,
			l,
			D
		]),
		joinCall: i(async (e) => {
			await D(e);
		}, [D]),
		endCall: i(async () => {
			let e = C.current;
			e && fetch(`/api/video/sessions/${e}/end`, {
				method: "POST",
				headers: E(),
				body: JSON.stringify({ documentId: t })
			}).catch((e) => {
				console.error("[useVideoCall] Failed to end session on server:", e);
			}), o({ activeCallSessionId: "" }), l({
				service: "crdt",
				action: "updateDocumentMeta",
				documentId: t,
				meta: { activeCallSessionId: "" }
			}), m(null), g(null), v(null), b(null), f("idle"), S(null);
		}, [
			t,
			E,
			o,
			l
		])
	};
}
//#endregion
//#region src/hooks/useVideoSessions.ts
function G(e, t) {
	let [n, r] = c([]), [a, o] = c(!1);
	return {
		sessions: n,
		loading: a,
		fetchSessions: i(async () => {
			o(!0);
			try {
				let n = { "Content-Type": "application/json" };
				t && (n.Authorization = `Bearer ${t}`);
				let i = await fetch(`/api/video/sessions/document/${e}`, { headers: n });
				if (!i.ok) return;
				let a = await i.json();
				r(a.sessions);
			} catch {} finally {
				o(!1);
			}
		}, [e, t])
	};
}
//#endregion
export { R as a, N as c, C as d, g as f, f as h, V as i, k as l, p as m, W as n, L as o, m as p, U as r, F as s, G as t, D as u };
