import { useState as w, useCallback as y, useEffect as P, useRef as O } from "react";
function U({ idToken: t }) {
  const [r, a] = w(null), [z, m] = w(!1), [E, F] = w(null), j = "", u = y(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${t}`
  }), [t]);
  P(() => {
  }, [t, j]);
  const h = y(async (b) => {
    if (t) {
      m(!0), F(null);
      try {
        const o = await fetch(`${j}/api/profiles`, {
          method: "PUT",
          headers: u(),
          body: JSON.stringify(b)
        });
        if (!o.ok) throw new Error(`Failed to update profile (${o.status})`);
        const p = await o.json();
        a(p);
      } catch (o) {
        F(o.message);
      } finally {
        m(!1);
      }
    }
  }, [t, j, u]), f = y(async (b) => {
    if (!t) return null;
    try {
      const o = await fetch(`${j}/api/profiles/${b}`, {
        headers: { Authorization: `Bearer ${t}` }
      });
      if (o.status === 403 || o.status === 404) return null;
      if (!o.ok) throw new Error(`Failed to view profile (${o.status})`);
      return await o.json();
    } catch {
      return null;
    }
  }, [t, j]);
  return { profile: r, loading: z, error: E, updateProfile: h, viewProfile: f };
}
function v({ idToken: t }) {
  const [r, a] = w([]), [z, m] = w([]), [E, F] = w([]), [j, u] = w(!1), [h, f] = w(null), b = "";
  P(() => {
  }, [t, b]);
  const o = y(async () => {
    if (!t) return;
    const i = await fetch(`${b}/api/social/following`, {
      headers: { Authorization: `Bearer ${t}` }
    });
    if (i.ok) {
      const c = await i.json();
      m(c.following ?? []);
    }
  }, [t, b]), p = y(async (i) => {
    if (t) {
      f(null);
      try {
        const c = await fetch(`${b}/api/social/follow/${i}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${t}` }
        });
        if (!c.ok) throw new Error(`Failed to follow (${c.status})`);
        await o();
      } catch (c) {
        throw f(c.message), c;
      }
    }
  }, [t, b, o]), B = y(async (i) => {
    if (t) {
      f(null);
      try {
        const c = await fetch(`${b}/api/social/follow/${i}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${t}` }
        });
        if (!c.ok) throw new Error(`Failed to unfollow (${c.status})`);
        await o();
      } catch (c) {
        throw f(c.message), c;
      }
    }
  }, [t, b, o]);
  return { followers: r, following: z, friends: E, follow: p, unfollow: B, loading: j, error: h };
}
function J({ idToken: t }) {
  const [r, a] = w([]), [z, m] = w([]), [E, F] = w(!1), [j, u] = w(null), h = "", f = y(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${t}`
  }), [t]), b = y(async ($, n, s) => {
    if (t) {
      F(!0), u(null);
      try {
        const e = await fetch(`${h}/api/groups`, {
          method: "POST",
          headers: f(),
          body: JSON.stringify({ name: $, description: n, visibility: s })
        });
        if (!e.ok) throw new Error(`Failed to create group (${e.status})`);
        const l = await e.json();
        a((g) => [l, ...g]);
      } catch (e) {
        throw u(e.message), e;
      } finally {
        F(!1);
      }
    }
  }, [t, h, f]), o = y(async ($) => {
    if (t) {
      F(!0), u(null);
      try {
        const n = await fetch(`${h}/api/groups/${$}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${t}` }
        });
        if (!n.ok) throw new Error(`Failed to delete group (${n.status})`);
        a((s) => s.filter((e) => e.groupId !== $));
      } catch (n) {
        u(n.message);
      } finally {
        F(!1);
      }
    }
  }, [t, h]), p = y(async ($) => {
    if (t) {
      u(null);
      try {
        const n = await fetch(`${h}/api/groups/${$}/join`, {
          method: "POST",
          headers: { Authorization: `Bearer ${t}` }
        });
        if (!n.ok) throw new Error(`Failed to join group (${n.status})`);
      } catch (n) {
        u(n.message);
      }
    }
  }, [t, h]), B = y(async ($) => {
    if (t) {
      u(null);
      try {
        const n = await fetch(`${h}/api/groups/${$}/leave`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${t}` }
        });
        if (!n.ok) throw new Error(`Failed to leave group (${n.status})`);
        a((s) => s.filter((e) => e.groupId !== $));
      } catch (n) {
        u(n.message);
      }
    }
  }, [t, h]), i = y(async ($, n) => {
    if (t) {
      u(null);
      try {
        const s = await fetch(`${h}/api/groups/${$}/invite`, {
          method: "POST",
          headers: f(),
          body: JSON.stringify({ userId: n })
        });
        if (!s.ok) throw new Error(`Failed to invite user (${s.status})`);
      } catch (s) {
        u(s.message);
      }
    }
  }, [t, h, f]), c = y(async ($, n) => {
    if (t) {
      u(null);
      try {
        const s = await fetch(`${h}/api/groups/${$}/accept`, {
          method: "POST",
          headers: f(),
          body: JSON.stringify({ accept: n })
        });
        if (!s.ok) throw new Error(`Failed to respond to invite (${s.status})`);
      } catch (s) {
        u(s.message);
      }
    }
  }, [t, h, f]), A = y(async ($) => {
    if (t) {
      F(!0), u(null);
      try {
        const n = await fetch(`${h}/api/groups/${$}/members`, {
          headers: { Authorization: `Bearer ${t}` }
        });
        if (!n.ok) throw new Error(`Failed to load members (${n.status})`);
        const s = await n.json();
        m(s.members ?? []);
      } catch (n) {
        u(n.message);
      } finally {
        F(!1);
      }
    }
  }, [t, h]);
  return {
    groups: r,
    createGroup: b,
    deleteGroup: o,
    joinGroup: p,
    leaveGroup: B,
    inviteUser: i,
    acceptInvite: c,
    loadMembers: A,
    members: z,
    loading: E,
    error: j
  };
}
function N({ idToken: t, roomId: r, onMessage: a }) {
  const [z, m] = w([]), [E, F] = w(void 0), [j, u] = w(!1), [h, f] = w(!1), [b, o] = w(null), p = "", B = O(a);
  P(() => {
    B.current = a;
  }, [a]);
  const i = O(r);
  P(() => {
    i.current = r;
  }, [r]), P(() => {
    !t || !r || (u(!0), o(null), m([]), F(void 0), fetch(`${p}/api/rooms/${r}/posts`, {
      headers: { Authorization: `Bearer ${t}` }
    }).then(async (e) => {
      if (!e.ok) throw new Error(`Failed to load posts (${e.status})`);
      return e.json();
    }).then((e) => {
      m(e.posts ?? []), F(e.lastKey);
    }).catch((e) => {
      o(e.message);
    }).finally(() => {
      u(!1);
    }));
  }, [t, r, p]), P(() => B.current((l) => {
    if (l.type === "social:post") {
      const g = l.payload ?? l;
      if (g.roomId !== i.current) return;
      const L = { ...g, _fadeIn: !0 };
      m((d) => [L, ...d]), setTimeout(() => {
        m(
          (d) => d.map((S) => S.postId === L.postId ? { ...S, _fadeIn: !1 } : S)
        );
      }, 300);
    }
  }), []);
  const c = y(async () => {
    if (!(!t || !r || !E)) {
      u(!0), o(null);
      try {
        const e = await fetch(
          `${p}/api/rooms/${r}/posts?lastKey=${encodeURIComponent(E)}`,
          { headers: { Authorization: `Bearer ${t}` } }
        );
        if (!e.ok) throw new Error(`Failed to load more posts (${e.status})`);
        const l = await e.json();
        m((g) => [...g, ...l.posts ?? []]), F(l.lastKey);
      } catch (e) {
        o(e.message);
      } finally {
        u(!1);
      }
    }
  }, [t, r, E, p]), A = y(async (e) => {
    if (!(!t || !r)) {
      f(!0), o(null);
      try {
        const l = await fetch(`${p}/api/rooms/${r}/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${t}`
          },
          body: JSON.stringify({ content: e })
        });
        if (!l.ok) throw new Error(`Failed to create post (${l.status})`);
        const g = await l.json();
        m((L) => [g, ...L]);
      } catch (l) {
        throw o(l.message), l;
      } finally {
        f(!1);
      }
    }
  }, [t, r, p]), $ = y(async (e, l) => {
    if (!(!t || !r)) {
      f(!0), o(null);
      try {
        const g = await fetch(`${p}/api/rooms/${r}/posts/${e}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${t}`
          },
          body: JSON.stringify({ content: l })
        });
        if (!g.ok) throw new Error(`Failed to edit post (${g.status})`);
        const L = await g.json();
        m((d) => d.map((S) => S.postId === e ? L : S));
      } catch (g) {
        o(g.message);
      } finally {
        f(!1);
      }
    }
  }, [t, r, p]), n = y(async (e) => {
    if (!(!t || !r)) {
      f(!0), o(null);
      try {
        const l = await fetch(`${p}/api/rooms/${r}/posts/${e}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${t}` }
        });
        if (!l.ok) throw new Error(`Failed to delete post (${l.status})`);
        m((g) => g.filter((L) => L.postId !== e));
      } catch (l) {
        o(l.message);
      } finally {
        f(!1);
      }
    }
  }, [t, r, p]), s = y(async (e) => {
    if (!t) return [];
    const l = await fetch(`${p}/api/posts/${e}`, {
      headers: { Authorization: `Bearer ${t}` }
    });
    if (!l.ok) throw new Error(`Failed to load user posts (${l.status})`);
    return (await l.json()).posts;
  }, [t, p]);
  return {
    posts: z,
    createPost: A,
    editPost: $,
    deletePost: n,
    getUserPosts: s,
    loading: j,
    error: b,
    hasMore: E !== void 0,
    loadMore: c
  };
}
function R({ idToken: t, roomId: r, postId: a, commentId: z, onMessage: m }) {
  const [E, F] = w(!1), [j, u] = w(0), [h, f] = w([]), [b, o] = w(!1), [p, B] = w(null), i = "", c = O(m);
  P(() => {
    c.current = m;
  }, [m]);
  const A = O(a);
  P(() => {
    A.current = a;
  }, [a]), P(() => {
    !t || !r || !a || z || (o(!0), B(null), fetch(`${i}/api/rooms/${r}/posts/${a}/likes`, {
      headers: { Authorization: `Bearer ${t}` }
    }).then(async (s) => {
      if (!s.ok) throw new Error(`Failed to load likes (${s.status})`);
      return s.json();
    }).then((s) => {
      u(s.count ?? 0), f(s.users ?? []), F(!1);
    }).catch((s) => {
      B(s.message);
    }).finally(() => {
      o(!1);
    }));
  }, [t, r, a, z, i]), P(() => c.current((e) => {
    if (e.type === "social:like") {
      const l = e.payload ?? e;
      if (l.postId !== A.current) return;
      u((g) => l.action === "unliked" ? Math.max(0, g - 1) : g + 1);
    }
  }), []);
  const $ = y(async () => {
    if (!t || !r || !a) return;
    o(!0), B(null);
    const s = E;
    F(!s), u((e) => s ? e - 1 : e + 1);
    try {
      let e;
      z ? e = `${i}/api/rooms/${r}/posts/${a}/comments/${z}/likes` : e = `${i}/api/rooms/${r}/posts/${a}/likes`;
      const l = await fetch(e, {
        method: s ? "DELETE" : "POST",
        headers: { Authorization: `Bearer ${t}` }
      });
      if (!l.ok)
        throw F(s), u((g) => s ? g + 1 : g - 1), new Error(`Failed to toggle like (${l.status})`);
    } catch (e) {
      B(e.message);
    } finally {
      o(!1);
    }
  }, [t, r, a, z, E, i]), n = y(async (s) => {
    if (!(!t || !r || !a)) {
      B(null);
      try {
        const e = await fetch(`${i}/api/rooms/${r}/posts/${a}/reactions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${t}`
          },
          body: JSON.stringify({ emoji: s })
        });
        if (!e.ok) throw new Error(`Failed to react (${e.status})`);
      } catch (e) {
        B(e.message);
      }
    }
  }, [t, r, a, i]);
  return { isLiked: E, likeCount: j, whoLiked: h, toggle: $, reactWithEmoji: n, loading: b, error: p };
}
function D({ idToken: t, roomId: r, postId: a, onMessage: z }) {
  const [m, E] = w([]), [F, j] = w(!1), [u, h] = w(null), f = "", b = O(z);
  P(() => {
    b.current = z;
  }, [z]);
  const o = O(a);
  P(() => {
    o.current = a;
  }, [a]), P(() => {
    !t || !r || !a || (j(!0), h(null), fetch(`${f}/api/rooms/${r}/posts/${a}/comments`, {
      headers: { Authorization: `Bearer ${t}` }
    }).then(async (i) => {
      if (!i.ok) throw new Error(`Failed to load comments (${i.status})`);
      return i.json();
    }).then((i) => {
      E(i.comments ?? []);
    }).catch((i) => {
      h(i.message);
    }).finally(() => {
      j(!1);
    }));
  }, [t, r, a, f]), P(() => b.current((c) => {
    if (c.type === "social:comment") {
      const A = c.payload ?? c;
      if (A.postId !== o.current) return;
      const $ = { ...A, _fadeIn: !0 };
      E((n) => [...n, $]), setTimeout(() => {
        E(
          (n) => n.map(
            (s) => s.commentId === $.commentId ? { ...s, _fadeIn: !1 } : s
          )
        );
      }, 300);
    }
  }), []);
  const p = y(async (i, c) => {
    if (!(!t || !r || !a)) {
      j(!0), h(null);
      try {
        const A = { content: i };
        c && (A.parentCommentId = c);
        const $ = await fetch(`${f}/api/rooms/${r}/posts/${a}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${t}`
          },
          body: JSON.stringify(A)
        });
        if (!$.ok) throw new Error(`Failed to create comment (${$.status})`);
        const n = await $.json();
        E((s) => [...s, n]);
      } catch (A) {
        h(A.message);
      } finally {
        j(!1);
      }
    }
  }, [t, r, a, f]), B = y(async (i) => {
    if (!(!t || !r || !a)) {
      h(null);
      try {
        const c = await fetch(
          `${f}/api/rooms/${r}/posts/${a}/comments/${i}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${t}` }
          }
        );
        if (!c.ok) throw new Error(`Failed to delete comment (${c.status})`);
        E((A) => A.filter(($) => $.commentId !== i));
      } catch (c) {
        h(c.message);
      }
    }
  }, [t, r, a, f]);
  return { comments: m, createComment: p, deleteComment: B, loading: F, error: u };
}
export {
  v as a,
  J as b,
  R as c,
  N as d,
  U as e,
  D as u
};
