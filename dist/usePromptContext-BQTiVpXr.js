import { useCallback as e, useEffect as t, useMemo as n, useRef as r, useState as i, useSyncExternalStore as a } from "react";
//#region src/hooks/useComments.ts
function o({ idToken: n, roomId: a, postId: o, onMessage: s }) {
	let [c, l] = i([]), [u, d] = i(!1), [f, p] = i(!1), [m, h] = i(null), g = r(s);
	t(() => {
		g.current = s;
	}, [s]);
	let _ = r(o);
	return t(() => {
		_.current = o;
	}, [o]), t(() => {
		if (l([]), h(null), !n || !a || !o) {
			d(!1);
			return;
		}
		d(!0);
		let e = !1;
		return fetch(`/api/rooms/${a}/posts/${o}/comments`, { headers: { Authorization: `Bearer ${n}` } }).then(async (e) => {
			if (!e.ok) throw Error(`Failed to load comments (${e.status})`);
			return e.json();
		}).then((t) => {
			e || l(t.comments ?? []);
		}).catch((t) => {
			e || h(t.message);
		}).finally(() => {
			e || d(!1);
		}), () => {
			e = !0;
		};
	}, [
		n,
		a,
		o,
		""
	]), t(() => {
		let e = /* @__PURE__ */ new Set(), t = g.current((t) => {
			if (t.type === "social:comment") {
				let n = t.payload ?? t;
				if (n.postId !== _.current) return;
				let r = {
					...n,
					_fadeIn: !0
				};
				l((e) => r.commentId && e.some((e) => e.commentId === r.commentId) ? e : [...e, r]);
				let i = setTimeout(() => {
					e.delete(i), l((e) => e.map((e) => e.commentId === r.commentId ? {
						...e,
						_fadeIn: !1
					} : e));
				}, 300);
				e.add(i);
			}
		});
		return () => {
			t(), e.forEach((e) => clearTimeout(e)), e.clear();
		};
	}, []), {
		comments: c,
		createComment: e(async (e, t) => {
			if (!(!n || !a || !o)) {
				p(!0), h(null);
				try {
					let r = { content: e };
					t && (r.parentCommentId = t);
					let i = await fetch(`/api/rooms/${a}/posts/${o}/comments`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${n}`
						},
						body: JSON.stringify(r)
					});
					if (!i.ok) throw Error(`Failed to create comment (${i.status})`);
					let s = await i.json();
					l((e) => e.some((e) => e.commentId === s.commentId) ? e.map((e) => e.commentId === s.commentId ? s : e) : [...e, s]);
				} catch (e) {
					throw h(e.message), e;
				} finally {
					p(!1);
				}
			}
		}, [
			n,
			a,
			o,
			""
		]),
		deleteComment: e(async (e) => {
			if (!(!n || !a || !o)) {
				h(null);
				try {
					let t = await fetch(`/api/rooms/${a}/posts/${o}/comments/${e}`, {
						method: "DELETE",
						headers: { Authorization: `Bearer ${n}` }
					});
					if (!t.ok) throw Error(`Failed to delete comment (${t.status})`);
					l((t) => t.filter((t) => t.commentId !== e));
				} catch (e) {
					throw h(e.message), e;
				}
			}
		}, [
			n,
			a,
			o,
			""
		]),
		loading: u,
		submitting: f,
		error: m
	};
}
//#endregion
//#region src/hooks/useFriends.ts
function s({ idToken: n }) {
	let [r, a] = i([]), [o, s] = i([]), [c, l] = i([]), [u, d] = i(!1), [f, p] = i(null), [m, h] = i(null);
	t(() => {}, [n, ""]);
	let g = e(async () => {
		if (!n) return;
		let e = await fetch("/api/social/following", { headers: { Authorization: `Bearer ${n}` } });
		if (!e.ok) throw Error(`Failed to refresh following (${e.status})`);
		let t = await e.json();
		s(t.following ?? []);
	}, [n, ""]);
	return {
		followers: r,
		following: o,
		friends: c,
		follow: e(async (e) => {
			if (n) {
				p(null);
				try {
					let t = await fetch(`/api/social/follow/${e}`, {
						method: "POST",
						headers: { Authorization: `Bearer ${n}` }
					});
					if (!t.ok) throw Error(`Failed to follow (${t.status})`);
					await g();
				} catch (e) {
					throw p(e.message), e;
				}
			}
		}, [
			n,
			"",
			g
		]),
		unfollow: e(async (e) => {
			if (n) {
				p(null);
				try {
					let t = await fetch(`/api/social/follow/${e}`, {
						method: "DELETE",
						headers: { Authorization: `Bearer ${n}` }
					});
					if (!t.ok) throw Error(`Failed to unfollow (${t.status})`);
					await g();
				} catch (e) {
					throw p(e.message), e;
				}
			}
		}, [
			n,
			"",
			g
		]),
		loading: u,
		error: f,
		loadError: m
	};
}
//#endregion
//#region src/hooks/useGroups.ts
function c({ idToken: n }) {
	let [a, o] = i([]), [s, c] = i([]), [l, u] = i(() => !!n), [d, f] = i(!1), [p, m] = i(null), [h, g] = i(null), _ = e(() => ({
		"Content-Type": "application/json",
		Authorization: `Bearer ${n}`
	}), [n]), v = r(!0), y = r(0), b = e(async () => {
		if (!n) return;
		let e = ++y.current, t = () => v.current && e === y.current;
		u(!0), m(null), g(null);
		try {
			let e = await fetch("/api/groups", { headers: { Authorization: `Bearer ${n}` } });
			if (!e.ok) throw Error(`Failed to load groups (${e.status})`);
			let r = await e.json();
			t() && o(r.groups ?? []);
		} catch (e) {
			t() && (m(e.message), g(e.message));
		} finally {
			t() && (u(!1), f(!0));
		}
	}, [n, ""]);
	return t(() => (v.current = !0, b(), () => {
		v.current = !1, y.current += 1;
	}), [b]), {
		groups: a,
		refresh: b,
		loaded: d,
		loadError: h,
		createGroup: e(async (e, t, r) => {
			if (n) {
				u(!0), m(null);
				try {
					let n = await fetch("/api/groups", {
						method: "POST",
						headers: _(),
						body: JSON.stringify({
							name: e,
							description: t,
							visibility: r
						})
					});
					if (!n.ok) throw Error(`Failed to create group (${n.status})`);
					let i = await n.json();
					o((e) => [i, ...e]);
				} catch (e) {
					throw m(e.message), e;
				} finally {
					u(!1);
				}
			}
		}, [
			n,
			"",
			_
		]),
		deleteGroup: e(async (e) => {
			if (n) {
				u(!0), m(null);
				try {
					let t = await fetch(`/api/groups/${e}`, {
						method: "DELETE",
						headers: { Authorization: `Bearer ${n}` }
					});
					if (!t.ok) throw Error(`Failed to delete group (${t.status})`);
					o((t) => t.filter((t) => t.groupId !== e));
				} catch (e) {
					m(e.message);
				} finally {
					u(!1);
				}
			}
		}, [n, ""]),
		joinGroup: e(async (e) => {
			if (n) {
				m(null);
				try {
					let t = await fetch(`/api/groups/${e}/join`, {
						method: "POST",
						headers: { Authorization: `Bearer ${n}` }
					});
					if (!t.ok) throw Error(`Failed to join group (${t.status})`);
				} catch (e) {
					m(e.message);
				}
			}
		}, [n, ""]),
		leaveGroup: e(async (e) => {
			if (n) {
				m(null);
				try {
					let t = await fetch(`/api/groups/${e}/leave`, {
						method: "DELETE",
						headers: { Authorization: `Bearer ${n}` }
					});
					if (!t.ok) throw Error(`Failed to leave group (${t.status})`);
					o((t) => t.filter((t) => t.groupId !== e));
				} catch (e) {
					m(e.message);
				}
			}
		}, [n, ""]),
		inviteUser: e(async (e, t) => {
			if (n) {
				m(null);
				try {
					let n = await fetch(`/api/groups/${e}/invite`, {
						method: "POST",
						headers: _(),
						body: JSON.stringify({ userId: t })
					});
					if (!n.ok) throw Error(`Failed to invite user (${n.status})`);
				} catch (e) {
					throw m(e.message), e;
				}
			}
		}, [
			n,
			"",
			_
		]),
		acceptInvite: e(async (e, t) => {
			if (n) {
				m(null);
				try {
					let n = await fetch(`/api/groups/${e}/accept`, {
						method: "POST",
						headers: _(),
						body: JSON.stringify({ accept: t })
					});
					if (!n.ok) throw Error(`Failed to respond to invite (${n.status})`);
				} catch (e) {
					m(e.message);
				}
			}
		}, [
			n,
			"",
			_
		]),
		loadMembers: e(async (e) => {
			if (n) {
				u(!0), m(null);
				try {
					let t = await fetch(`/api/groups/${e}/members`, { headers: { Authorization: `Bearer ${n}` } });
					if (!t.ok) throw Error(`Failed to load members (${t.status})`);
					let r = await t.json();
					c(r.members ?? []);
				} catch (e) {
					m(e.message);
				} finally {
					u(!1);
				}
			}
		}, [n, ""]),
		members: s,
		loading: l,
		error: p
	};
}
//#endregion
//#region src/hooks/useLikes.ts
function l(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub ?? null;
	} catch {
		return null;
	}
}
function u({ idToken: n, roomId: a, postId: o, commentId: s, onMessage: c }) {
	let [u, d] = i(!1), [f, p] = i(0), [m, h] = i([]), [g, _] = i(!1), [v, y] = i(null), b = r(c);
	t(() => {
		b.current = c;
	}, [c]);
	let x = r(o);
	return t(() => {
		x.current = o;
	}, [o]), t(() => {
		if (p(0), h([]), d(!1), y(null), !n || !a || !o) {
			_(!1);
			return;
		}
		if (s) {
			_(!1);
			return;
		}
		_(!0);
		let e = !1;
		return fetch(`/api/rooms/${a}/posts/${o}/likes`, { headers: { Authorization: `Bearer ${n}` } }).then(async (e) => {
			if (!e.ok) throw Error(`Failed to load likes (${e.status})`);
			return e.json();
		}).then((t) => {
			if (e) return;
			let r = t.users ?? [];
			p(t.count ?? 0), h(r);
			let i = l(n);
			d(i !== null && r.some((e) => e.userId === i));
		}).catch((t) => {
			e || y(t.message);
		}).finally(() => {
			e || _(!1);
		}), () => {
			e = !0;
		};
	}, [
		n,
		a,
		o,
		s,
		""
	]), t(() => b.current((e) => {
		if (e.type === "social:like") {
			let t = e.payload ?? e;
			if (t.postId !== x.current) return;
			p((e) => t.action === "unliked" ? Math.max(0, e - 1) : e + 1);
		}
	}), []), {
		isLiked: u,
		likeCount: f,
		whoLiked: m,
		toggle: e(async () => {
			if (!n || !a || !o) return;
			_(!0), y(null);
			let e = u;
			d(!e), p((t) => e ? t - 1 : t + 1);
			try {
				let t;
				t = s ? `/api/rooms/${a}/posts/${o}/comments/${s}/likes` : `/api/rooms/${a}/posts/${o}/likes`;
				let r = await fetch(t, {
					method: e ? "DELETE" : "POST",
					headers: { Authorization: `Bearer ${n}` }
				});
				if (!r.ok) throw Error(`Failed to toggle like (${r.status})`);
			} catch (t) {
				d(e), p((t) => e ? t + 1 : t - 1), y(t.message);
			} finally {
				_(!1);
			}
		}, [
			n,
			a,
			o,
			s,
			u,
			""
		]),
		reactWithEmoji: e(async (e) => {
			if (!(!n || !a || !o)) {
				y(null);
				try {
					let t = await fetch(`/api/rooms/${a}/posts/${o}/reactions`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${n}`
						},
						body: JSON.stringify({ emoji: e })
					});
					if (!t.ok) throw Error(`Failed to react (${t.status})`);
				} catch (e) {
					y(e.message);
				}
			}
		}, [
			n,
			a,
			o,
			""
		]),
		loading: g,
		error: v
	};
}
//#endregion
//#region src/hooks/usePosts.ts
function d({ idToken: n, roomId: a, onMessage: o }) {
	let [s, c] = i([]), [l, u] = i(void 0), [d, f] = i(!1), [p, m] = i(!1), [h, g] = i(null), [_, v] = i(null), y = r(o);
	t(() => {
		y.current = o;
	}, [o]);
	let b = r(a);
	t(() => {
		b.current = a;
	}, [a]), t(() => {
		if (c([]), u(void 0), g(null), v(null), !n || !a) {
			f(!1);
			return;
		}
		f(!0);
		let e = !1;
		return fetch(`/api/rooms/${a}/posts`, { headers: { Authorization: `Bearer ${n}` } }).then(async (e) => {
			if (!e.ok) throw Error(`Failed to load posts (${e.status})`);
			return e.json();
		}).then((t) => {
			e || (c(t.posts ?? []), u(t.lastKey));
		}).catch((t) => {
			e || (g(t.message), v(t.message));
		}).finally(() => {
			e || f(!1);
		}), () => {
			e = !0;
		};
	}, [
		n,
		a,
		""
	]), t(() => {
		let e = /* @__PURE__ */ new Set(), t = y.current((t) => {
			if (t.type === "social:post") {
				let n = t.payload ?? t;
				if (n.roomId !== b.current) return;
				let r = {
					...n,
					_fadeIn: !0
				};
				c((e) => r.postId && e.some((e) => e.postId === r.postId) ? e : [r, ...e]);
				let i = setTimeout(() => {
					e.delete(i), c((e) => e.map((e) => e.postId === r.postId ? {
						...e,
						_fadeIn: !1
					} : e));
				}, 300);
				e.add(i);
			}
		});
		return () => {
			t(), e.forEach((e) => clearTimeout(e)), e.clear();
		};
	}, []);
	let x = e(async () => {
		if (!(!n || !a || !l)) {
			f(!0), g(null), v(null);
			try {
				let e = await fetch(`/api/rooms/${a}/posts?lastKey=${encodeURIComponent(l)}`, { headers: { Authorization: `Bearer ${n}` } });
				if (!e.ok) throw Error(`Failed to load more posts (${e.status})`);
				let t = await e.json();
				c((e) => {
					let n = new Set(e.map((e) => e.postId));
					return [...e, ...(t.posts ?? []).filter((e) => !n.has(e.postId))];
				}), u(t.lastKey);
			} catch (e) {
				g(e.message), v(e.message);
			} finally {
				f(!1);
			}
		}
	}, [
		n,
		a,
		l,
		""
	]);
	return {
		posts: s,
		createPost: e(async (e) => {
			if (!(!n || !a)) {
				m(!0), g(null);
				try {
					let t = await fetch(`/api/rooms/${a}/posts`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${n}`
						},
						body: JSON.stringify({ content: e })
					});
					if (!t.ok) throw Error(`Failed to create post (${t.status})`);
					let r = await t.json();
					c((e) => e.some((e) => e.postId === r.postId) ? e.map((e) => e.postId === r.postId ? r : e) : [r, ...e]);
				} catch (e) {
					throw g(e.message), e;
				} finally {
					m(!1);
				}
			}
		}, [
			n,
			a,
			""
		]),
		editPost: e(async (e, t) => {
			if (!(!n || !a)) {
				m(!0), g(null);
				try {
					let r = await fetch(`/api/rooms/${a}/posts/${e}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${n}`
						},
						body: JSON.stringify({ content: t })
					});
					if (!r.ok) throw Error(`Failed to edit post (${r.status})`);
					let i = await r.json();
					c((t) => t.map((t) => t.postId === e ? i : t));
				} catch (e) {
					throw g(e.message), e;
				} finally {
					m(!1);
				}
			}
		}, [
			n,
			a,
			""
		]),
		deletePost: e(async (e) => {
			if (!(!n || !a)) {
				m(!0), g(null);
				try {
					let t = await fetch(`/api/rooms/${a}/posts/${e}`, {
						method: "DELETE",
						headers: { Authorization: `Bearer ${n}` }
					});
					if (!t.ok) throw Error(`Failed to delete post (${t.status})`);
					c((t) => t.filter((t) => t.postId !== e));
				} catch (e) {
					throw g(e.message), e;
				} finally {
					m(!1);
				}
			}
		}, [
			n,
			a,
			""
		]),
		getUserPosts: e(async (e) => {
			if (!n) return [];
			let t = await fetch(`/api/posts/${e}`, { headers: { Authorization: `Bearer ${n}` } });
			if (!t.ok) throw Error(`Failed to load user posts (${t.status})`);
			return (await t.json()).posts;
		}, [n, ""]),
		loading: d,
		mutating: p,
		error: h,
		loadError: _,
		hasMore: l !== void 0,
		loadMore: x
	};
}
//#endregion
//#region src/hooks/useSocialProfile.ts
function f({ idToken: n }) {
	let [r, a] = i(null), [o, s] = i(!1), [c, l] = i(null), u = e(() => ({
		"Content-Type": "application/json",
		Authorization: `Bearer ${n}`
	}), [n]);
	return t(() => {}, [n, ""]), {
		profile: r,
		loading: o,
		error: c,
		updateProfile: e(async (e) => {
			if (n) {
				s(!0), l(null);
				try {
					let t = await fetch("/api/profiles", {
						method: "PUT",
						headers: u(),
						body: JSON.stringify(e)
					});
					if (!t.ok) throw Error(`Failed to update profile (${t.status})`);
					let n = await t.json();
					a(n);
				} catch (e) {
					throw l(e.message), e;
				} finally {
					s(!1);
				}
			}
		}, [
			n,
			"",
			u
		]),
		viewProfile: e(async (e) => {
			if (!n) return null;
			try {
				let t = await fetch(`/api/profiles/${e}`, { headers: { Authorization: `Bearer ${n}` } });
				if (t.status === 403 || t.status === 404) return null;
				if (!t.ok) throw Error(`Failed to view profile (${t.status})`);
				return await t.json();
			} catch {
				return null;
			}
		}, [n, ""])
	};
}
//#endregion
//#region src/hooks/usePromptContext.ts
var p = 10, m = "application/x-uic-prompt-context", h = "uic:prompt-context:", g = Object.freeze([]), _ = /* @__PURE__ */ new Map();
function v(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	if (typeof t.id != "string" || !t.id.trim()) return null;
	let n = typeof t.title == "string" && t.title.trim() ? t.title.trim().slice(0, 200) : t.id;
	return {
		id: t.id.trim(),
		title: n,
		...typeof t.kind == "string" && t.kind ? { kind: t.kind } : {}
	};
}
function y(e) {
	if (!Array.isArray(e)) return [];
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of e) {
		let e = v(r);
		if (!(!e || t.has(e.id)) && (t.add(e.id), n.push(e), n.length >= 10)) break;
	}
	return n;
}
function b(e) {
	try {
		let t = globalThis.sessionStorage?.getItem(h + e);
		if (!t) return g;
		let n = y(JSON.parse(t));
		return n.length ? n : g;
	} catch {
		return g;
	}
}
function x(e) {
	let t = _.get(e);
	return t || (t = {
		items: b(e),
		listeners: /* @__PURE__ */ new Set()
	}, _.set(e, t)), t;
}
function S(e, t) {
	let n = x(e);
	n.items = t.length ? t : g;
	try {
		t.length ? globalThis.sessionStorage?.setItem(h + e, JSON.stringify(t)) : globalThis.sessionStorage?.removeItem(h + e);
	} catch {}
	for (let e of [...n.listeners]) e();
}
function C(e = "documents") {
	let t = () => x(e).items, n = (e) => t().some((t) => t.id === e), r = (n) => {
		let r = v(n);
		if (!r) return !1;
		let i = t(), a = i.findIndex((e) => e.id === r.id);
		return a >= 0 ? ((i[a].title !== r.title || i[a].kind !== r.kind) && S(e, i.map((e, t) => t === a ? r : e)), !0) : i.length >= 10 ? !1 : (S(e, [...i, r]), !0);
	}, i = (n) => {
		let r = t();
		r.some((e) => e.id === n) && S(e, r.filter((e) => e.id !== n));
	};
	return {
		get: t,
		add: r,
		remove: i,
		has: n,
		toggle: (e) => n(e.id) ? (i(e.id), !1) : r(e),
		clear: () => {
			t().length && S(e, g);
		}
	};
}
function w() {
	_.clear();
}
function T(t = "documents") {
	let r = e((e) => {
		let n = x(t);
		return n.listeners.add(e), () => {
			n.listeners.delete(e);
		};
	}, [t]), i = e(() => x(t).items, [t]), o = a(r, i, () => g), s = n(() => C(t), [t]);
	return n(() => ({
		items: o,
		add: s.add,
		remove: s.remove,
		has: (e) => o.some((t) => t.id === e),
		toggle: s.toggle,
		clear: s.clear
	}), [o, s]);
}
function E(e, t) {
	let n = y(t);
	n.length && (e.setData(m, JSON.stringify(n)), e.setData("text/plain", n.map((e) => e.title).join("\n")), e.effectAllowed = "copy");
}
function D(e) {
	return !!e && Array.from(e.types ?? []).includes("application/x-uic-prompt-context");
}
function O(e) {
	if (!e) return [];
	try {
		let t = e.getData(m);
		return t ? y(JSON.parse(t)) : [];
	} catch {
		return [];
	}
}
//#endregion
export { O as a, E as c, u as d, c as f, C as i, f as l, o as m, p as n, w as o, s as p, D as r, T as s, m as t, d as u };
