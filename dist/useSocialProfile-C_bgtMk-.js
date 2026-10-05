import { useCallback as e, useEffect as t, useRef as n, useState as r } from "react";
//#region src/hooks/useComments.ts
function i({ idToken: i, roomId: a, postId: o, onMessage: s }) {
	let [c, l] = r([]), [u, d] = r(!1), [f, p] = r(!1), [m, h] = r(null), g = n(s);
	t(() => {
		g.current = s;
	}, [s]);
	let _ = n(o);
	return t(() => {
		_.current = o;
	}, [o]), t(() => {
		if (l([]), h(null), !i || !a || !o) {
			d(!1);
			return;
		}
		d(!0);
		let e = !1;
		return fetch(`/api/rooms/${a}/posts/${o}/comments`, { headers: { Authorization: `Bearer ${i}` } }).then(async (e) => {
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
		i,
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
			if (i && a && o) {
				p(!0), h(null);
				try {
					let n = { content: e };
					t && (n.parentCommentId = t);
					let r = await fetch(`/api/rooms/${a}/posts/${o}/comments`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${i}`
						},
						body: JSON.stringify(n)
					});
					if (!r.ok) throw Error(`Failed to create comment (${r.status})`);
					let s = await r.json();
					l((e) => e.some((e) => e.commentId === s.commentId) ? e.map((e) => e.commentId === s.commentId ? s : e) : [...e, s]);
				} catch (e) {
					throw h(e.message), e;
				} finally {
					p(!1);
				}
			}
		}, [
			i,
			a,
			o,
			""
		]),
		deleteComment: e(async (e) => {
			if (i && a && o) {
				h(null);
				try {
					let t = await fetch(`/api/rooms/${a}/posts/${o}/comments/${e}`, {
						method: "DELETE",
						headers: { Authorization: `Bearer ${i}` }
					});
					if (!t.ok) throw Error(`Failed to delete comment (${t.status})`);
					l((t) => t.filter((t) => t.commentId !== e));
				} catch (e) {
					throw h(e.message), e;
				}
			}
		}, [
			i,
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
function a({ idToken: n }) {
	let [i, a] = r([]), [o, s] = r([]), [c, l] = r([]), [u, d] = r(!1), [f, p] = r(null), [m, h] = r(null);
	t(() => {}, [n, ""]);
	let g = e(async () => {
		if (!n) return;
		let e = await fetch("/api/social/following", { headers: { Authorization: `Bearer ${n}` } });
		if (!e.ok) throw Error(`Failed to refresh following (${e.status})`);
		let t = await e.json();
		s(t.following ?? []);
	}, [n, ""]);
	return {
		followers: i,
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
function o({ idToken: i }) {
	let [a, o] = r([]), [s, c] = r([]), [l, u] = r(() => !!i), [d, f] = r(!1), [p, m] = r(null), [h, g] = r(null), _ = e(() => ({
		"Content-Type": "application/json",
		Authorization: `Bearer ${i}`
	}), [i]), v = n(!0), y = n(0), b = e(async () => {
		if (!i) return;
		let e = ++y.current, t = () => v.current && e === y.current;
		u(!0), m(null), g(null);
		try {
			let e = await fetch("/api/groups", { headers: { Authorization: `Bearer ${i}` } });
			if (!e.ok) throw Error(`Failed to load groups (${e.status})`);
			let n = await e.json();
			t() && o(n.groups ?? []);
		} catch (e) {
			t() && (m(e.message), g(e.message));
		} finally {
			t() && (u(!1), f(!0));
		}
	}, [i, ""]);
	return t(() => (v.current = !0, b(), () => {
		v.current = !1, y.current += 1;
	}), [b]), {
		groups: a,
		refresh: b,
		loaded: d,
		loadError: h,
		createGroup: e(async (e, t, n) => {
			if (i) {
				u(!0), m(null);
				try {
					let r = await fetch("/api/groups", {
						method: "POST",
						headers: _(),
						body: JSON.stringify({
							name: e,
							description: t,
							visibility: n
						})
					});
					if (!r.ok) throw Error(`Failed to create group (${r.status})`);
					let i = await r.json();
					o((e) => [i, ...e]);
				} catch (e) {
					throw m(e.message), e;
				} finally {
					u(!1);
				}
			}
		}, [
			i,
			"",
			_
		]),
		deleteGroup: e(async (e) => {
			if (i) {
				u(!0), m(null);
				try {
					let t = await fetch(`/api/groups/${e}`, {
						method: "DELETE",
						headers: { Authorization: `Bearer ${i}` }
					});
					if (!t.ok) throw Error(`Failed to delete group (${t.status})`);
					o((t) => t.filter((t) => t.groupId !== e));
				} catch (e) {
					m(e.message);
				} finally {
					u(!1);
				}
			}
		}, [i, ""]),
		joinGroup: e(async (e) => {
			if (i) {
				m(null);
				try {
					let t = await fetch(`/api/groups/${e}/join`, {
						method: "POST",
						headers: { Authorization: `Bearer ${i}` }
					});
					if (!t.ok) throw Error(`Failed to join group (${t.status})`);
				} catch (e) {
					m(e.message);
				}
			}
		}, [i, ""]),
		leaveGroup: e(async (e) => {
			if (i) {
				m(null);
				try {
					let t = await fetch(`/api/groups/${e}/leave`, {
						method: "DELETE",
						headers: { Authorization: `Bearer ${i}` }
					});
					if (!t.ok) throw Error(`Failed to leave group (${t.status})`);
					o((t) => t.filter((t) => t.groupId !== e));
				} catch (e) {
					m(e.message);
				}
			}
		}, [i, ""]),
		inviteUser: e(async (e, t) => {
			if (i) {
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
			i,
			"",
			_
		]),
		acceptInvite: e(async (e, t) => {
			if (i) {
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
			i,
			"",
			_
		]),
		loadMembers: e(async (e) => {
			if (i) {
				u(!0), m(null);
				try {
					let t = await fetch(`/api/groups/${e}/members`, { headers: { Authorization: `Bearer ${i}` } });
					if (!t.ok) throw Error(`Failed to load members (${t.status})`);
					let n = await t.json();
					c(n.members ?? []);
				} catch (e) {
					m(e.message);
				} finally {
					u(!1);
				}
			}
		}, [i, ""]),
		members: s,
		loading: l,
		error: p
	};
}
//#endregion
//#region src/hooks/useLikes.ts
function s(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub ?? null;
	} catch {
		return null;
	}
}
function c({ idToken: i, roomId: a, postId: o, commentId: c, onMessage: l }) {
	let [u, d] = r(!1), [f, p] = r(0), [m, h] = r([]), [g, _] = r(!1), [v, y] = r(null), b = n(l);
	t(() => {
		b.current = l;
	}, [l]);
	let x = n(o);
	return t(() => {
		x.current = o;
	}, [o]), t(() => {
		if (p(0), h([]), d(!1), y(null), !i || !a || !o) {
			_(!1);
			return;
		}
		if (c) {
			_(!1);
			return;
		}
		_(!0);
		let e = !1;
		return fetch(`/api/rooms/${a}/posts/${o}/likes`, { headers: { Authorization: `Bearer ${i}` } }).then(async (e) => {
			if (!e.ok) throw Error(`Failed to load likes (${e.status})`);
			return e.json();
		}).then((t) => {
			if (e) return;
			let n = t.users ?? [];
			p(t.count ?? 0), h(n);
			let r = s(i);
			d(r !== null && n.some((e) => e.userId === r));
		}).catch((t) => {
			e || y(t.message);
		}).finally(() => {
			e || _(!1);
		}), () => {
			e = !0;
		};
	}, [
		i,
		a,
		o,
		c,
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
			if (!i || !a || !o) return;
			_(!0), y(null);
			let e = u;
			d(!e), p((t) => e ? t - 1 : t + 1);
			try {
				let t;
				t = c ? `/api/rooms/${a}/posts/${o}/comments/${c}/likes` : `/api/rooms/${a}/posts/${o}/likes`;
				let n = await fetch(t, {
					method: e ? "DELETE" : "POST",
					headers: { Authorization: `Bearer ${i}` }
				});
				if (!n.ok) throw Error(`Failed to toggle like (${n.status})`);
			} catch (t) {
				d(e), p((t) => e ? t + 1 : t - 1), y(t.message);
			} finally {
				_(!1);
			}
		}, [
			i,
			a,
			o,
			c,
			u,
			""
		]),
		reactWithEmoji: e(async (e) => {
			if (i && a && o) {
				y(null);
				try {
					let t = await fetch(`/api/rooms/${a}/posts/${o}/reactions`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${i}`
						},
						body: JSON.stringify({ emoji: e })
					});
					if (!t.ok) throw Error(`Failed to react (${t.status})`);
				} catch (e) {
					y(e.message);
				}
			}
		}, [
			i,
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
function l({ idToken: i, roomId: a, onMessage: o }) {
	let [s, c] = r([]), [l, u] = r(void 0), [d, f] = r(!1), [p, m] = r(!1), [h, g] = r(null), [_, v] = r(null), y = n(o);
	t(() => {
		y.current = o;
	}, [o]);
	let b = n(a);
	t(() => {
		b.current = a;
	}, [a]), t(() => {
		if (c([]), u(void 0), g(null), v(null), !i || !a) {
			f(!1);
			return;
		}
		f(!0);
		let e = !1;
		return fetch(`/api/rooms/${a}/posts`, { headers: { Authorization: `Bearer ${i}` } }).then(async (e) => {
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
		i,
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
		if (i && a && l) {
			f(!0), g(null), v(null);
			try {
				let e = await fetch(`/api/rooms/${a}/posts?lastKey=${encodeURIComponent(l)}`, { headers: { Authorization: `Bearer ${i}` } });
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
		i,
		a,
		l,
		""
	]);
	return {
		posts: s,
		createPost: e(async (e) => {
			if (i && a) {
				m(!0), g(null);
				try {
					let t = await fetch(`/api/rooms/${a}/posts`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${i}`
						},
						body: JSON.stringify({ content: e })
					});
					if (!t.ok) throw Error(`Failed to create post (${t.status})`);
					let n = await t.json();
					c((e) => e.some((e) => e.postId === n.postId) ? e.map((e) => e.postId === n.postId ? n : e) : [n, ...e]);
				} catch (e) {
					throw g(e.message), e;
				} finally {
					m(!1);
				}
			}
		}, [
			i,
			a,
			""
		]),
		editPost: e(async (e, t) => {
			if (i && a) {
				m(!0), g(null);
				try {
					let n = await fetch(`/api/rooms/${a}/posts/${e}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${i}`
						},
						body: JSON.stringify({ content: t })
					});
					if (!n.ok) throw Error(`Failed to edit post (${n.status})`);
					let r = await n.json();
					c((t) => t.map((t) => t.postId === e ? r : t));
				} catch (e) {
					throw g(e.message), e;
				} finally {
					m(!1);
				}
			}
		}, [
			i,
			a,
			""
		]),
		deletePost: e(async (e) => {
			if (i && a) {
				m(!0), g(null);
				try {
					let t = await fetch(`/api/rooms/${a}/posts/${e}`, {
						method: "DELETE",
						headers: { Authorization: `Bearer ${i}` }
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
			i,
			a,
			""
		]),
		getUserPosts: e(async (e) => {
			if (!i) return [];
			let t = await fetch(`/api/posts/${e}`, { headers: { Authorization: `Bearer ${i}` } });
			if (!t.ok) throw Error(`Failed to load user posts (${t.status})`);
			return (await t.json()).posts;
		}, [i, ""]),
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
function u({ idToken: n }) {
	let [i, a] = r(null), [o, s] = r(!1), [c, l] = r(null), u = e(() => ({
		"Content-Type": "application/json",
		Authorization: `Bearer ${n}`
	}), [n]);
	return t(() => {}, [n, ""]), {
		profile: i,
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
export { a, o as i, l as n, i as o, c as r, u as t };
