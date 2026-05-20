import { jsxs as s, jsx as e, Fragment as Y } from "react/jsx-runtime";
import { useState as u, useEffect as R, useRef as j, useCallback as X } from "react";
import { e as oe, a as Q, b as ie, d as Z, u as le, c as ee } from "./useSocialProfile-D-SUgbn2.js";
import { c as h } from "./cn-B6yFEsav.js";
import { u as de } from "./ThemeContext-Bi6AQuIL.js";
import { a as ce } from "./ToastProvider-aHBNxMTO.js";
function O(t, n) {
  return {
    id: t.userId,
    displayName: t.displayName,
    bio: "",
    avatarUrl: t.avatarUrl ?? null,
    visibility: t.visibility,
    followState: n
  };
}
function me(t) {
  return {
    id: t.userId,
    displayName: t.displayName,
    bio: t.bio ?? "",
    avatarUrl: t.avatarUrl ?? null,
    visibility: t.visibility
  };
}
function te({ user: t, size: n }) {
  const r = t.displayName.slice(0, 2).toUpperCase();
  return t.avatarUrl ? /* @__PURE__ */ e(
    "div",
    {
      className: h(
        "rounded-full bg-border flex items-center justify-center font-semibold text-text-primary shrink-0 overflow-hidden",
        n === 48 ? "w-12 h-12 text-base" : "w-8 h-8 text-xs"
      ),
      children: /* @__PURE__ */ e(
        "img",
        {
          src: t.avatarUrl,
          alt: `${t.displayName}'s avatar`,
          className: "w-full h-full object-cover"
        }
      )
    }
  ) : /* @__PURE__ */ e(
    "div",
    {
      className: h(
        "rounded-full bg-border flex items-center justify-center font-semibold text-text-primary shrink-0 overflow-hidden",
        n === 48 ? "w-12 h-12 text-base" : "w-8 h-8 text-xs"
      ),
      "aria-label": `Avatar placeholder for ${t.displayName}`,
      children: r
    }
  );
}
function pe({ targetUser: t, followState: n, compact: r = !1, onFollowChange: a }) {
  const [i, o] = u(!1), l = () => {
    a(t.id, "pending");
  }, d = () => o(!0), m = () => o(!1), f = () => {
    o(!1), a(t.id, "not-following");
  };
  return n === "not-following" ? /* @__PURE__ */ e(
    "button",
    {
      className: h("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border-none font-[system-ui,-apple-system,sans-serif] bg-primary text-white font-semibold", r ? "h-7" : "h-9"),
      onClick: l,
      "aria-label": `Follow ${t.displayName}`,
      children: "Follow"
    }
  ) : n === "pending" ? /* @__PURE__ */ e(
    "button",
    {
      className: h("rounded-lg text-sm min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface-hover text-text-secondary font-normal cursor-default", r ? "h-7" : "h-9"),
      disabled: !0,
      "aria-label": `Follow ${t.displayName}`,
      children: "Following…"
    }
  ) : /* @__PURE__ */ s("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ e(
      "button",
      {
        className: h("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface text-text-primary font-normal", r ? "h-7" : "h-9"),
        onClick: d,
        "aria-label": `Unfollow ${t.displayName}`,
        children: "Following"
      }
    ),
    i && /* @__PURE__ */ s("div", { role: "group", "aria-label": "Confirm unfollow", className: "flex gap-2 items-center", children: [
      /* @__PURE__ */ s("span", { className: "text-sm text-text-primary mr-1", children: [
        "Unfollow ",
        t.displayName,
        "?"
      ] }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: m,
          className: "h-9 rounded-lg text-sm px-3 bg-surface text-text-primary border border-border cursor-pointer font-[system-ui,-apple-system,sans-serif]",
          children: "Keep Following"
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: f,
          className: "h-9 rounded-lg text-sm px-3 bg-danger text-white border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
          children: "Unfollow"
        }
      )
    ] })
  ] });
}
function xe({ user: t, isOwnProfile: n, onSave: r }) {
  const [a, i] = u(!1), [o, l] = u(t.displayName), [d, m] = u(t.bio), [f, c] = u(t.avatarUrl ?? ""), [p, y] = u(t.visibility), [w, b] = u(!1);
  R(() => {
    l(t.displayName), m(t.bio), c(t.avatarUrl ?? ""), y(t.visibility);
  }, [t]);
  const g = async () => {
    b(!0);
    try {
      await r({ displayName: o, bio: d, avatarUrl: f || void 0, visibility: p }), i(!1);
    } finally {
      b(!1);
    }
  };
  return a ? /* @__PURE__ */ s("div", { children: [
    /* @__PURE__ */ s("div", { className: "mb-3", children: [
      /* @__PURE__ */ e("label", { className: "text-sm text-text-primary block mb-1", children: "Display name" }),
      /* @__PURE__ */ e(
        "input",
        {
          value: o,
          onChange: (v) => l(v.target.value.slice(0, 50)),
          placeholder: "Your name",
          maxLength: 50,
          className: "w-full box-border border border-border-field rounded-md px-2.5 py-1.5 text-sm font-[system-ui,-apple-system,sans-serif] bg-surface-inset text-text-primary"
        }
      )
    ] }),
    /* @__PURE__ */ s("div", { className: "mb-3", children: [
      /* @__PURE__ */ e("label", { className: "text-sm text-text-primary block mb-1", children: "Bio" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          value: d,
          onChange: (v) => m(v.target.value.slice(0, 160)),
          placeholder: "Tell people a bit about yourself (max 160 characters)",
          maxLength: 160,
          rows: 3,
          className: "w-full box-border border border-border-field rounded-md px-2.5 py-1.5 text-sm font-[system-ui,-apple-system,sans-serif] bg-surface-inset text-text-primary resize-y"
        }
      )
    ] }),
    /* @__PURE__ */ s("div", { className: "mb-4", children: [
      /* @__PURE__ */ e("label", { className: "text-sm text-text-primary block mb-1", children: "Avatar URL" }),
      /* @__PURE__ */ e(
        "input",
        {
          value: f,
          onChange: (v) => c(v.target.value),
          placeholder: "https://example.com/avatar.png",
          className: "w-full box-border border border-border-field rounded-md px-2.5 py-1.5 text-sm font-[system-ui,-apple-system,sans-serif] bg-surface-inset text-text-primary"
        }
      )
    ] }),
    /* @__PURE__ */ e("div", { className: "mb-4", children: /* @__PURE__ */ e("div", { role: "radiogroup", "aria-label": "Profile visibility", className: "flex gap-2", children: ["public", "private"].map((v) => /* @__PURE__ */ e(
      "button",
      {
        role: "radio",
        "aria-checked": p === v,
        onClick: () => y(v),
        className: h(
          "px-4 py-1 rounded-full text-sm cursor-pointer border border-border font-[system-ui,-apple-system,sans-serif]",
          p === v ? "bg-primary text-white" : "bg-surface text-text-primary"
        ),
        children: v.charAt(0).toUpperCase() + v.slice(1)
      },
      v
    )) }) }),
    /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => {
            g();
          },
          disabled: w,
          className: h("flex-1 h-9 bg-primary text-white border-none rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", w ? "cursor-default" : "cursor-pointer"),
          children: w ? "Saving…" : "Save Changes"
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => i(!1),
          className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
          children: "Discard Changes"
        }
      )
    ] })
  ] }) : /* @__PURE__ */ s("div", { children: [
    /* @__PURE__ */ s("div", { className: "flex items-start gap-3 mb-3", children: [
      /* @__PURE__ */ e(te, { user: t, size: 48 }),
      /* @__PURE__ */ s("div", { className: "flex-1", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ e("span", { className: "text-xl font-semibold text-text-primary", children: t.displayName }),
          /* @__PURE__ */ e("span", { className: h(
            "text-xs px-2 py-0.5 rounded",
            t.visibility === "public" ? "bg-success-bg text-success" : "bg-surface-hover text-text-secondary"
          ), children: t.visibility === "public" ? "Public" : "Private" })
        ] }),
        /* @__PURE__ */ e("p", { className: "text-base text-text-primary m-0 overflow-hidden line-clamp-3", children: t.bio })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "flex gap-4 text-sm text-text-secondary mb-3", children: [
      /* @__PURE__ */ s("span", { children: [
        /* @__PURE__ */ e("strong", { className: "text-text-primary", children: t.followersCount ?? 0 }),
        " Followers"
      ] }),
      /* @__PURE__ */ s("span", { children: [
        /* @__PURE__ */ e("strong", { className: "text-text-primary", children: t.followingCount ?? 0 }),
        " Following"
      ] }),
      /* @__PURE__ */ s("span", { children: [
        /* @__PURE__ */ e("strong", { className: "text-text-primary", children: t.friendsCount ?? 0 }),
        " Friends"
      ] })
    ] }),
    n && /* @__PURE__ */ e(
      "button",
      {
        onClick: () => i(!0),
        className: "text-sm text-primary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
        children: "Edit profile"
      }
    )
  ] });
}
function ue({ followers: t, following: n, friends: r, followStates: a, onFollowChange: i }) {
  const [o, l] = u("followers"), d = [
    { key: "followers", label: `Followers (${t.length})`, users: t },
    { key: "following", label: `Following (${n.length})`, users: n },
    { key: "friends", label: `Friends (${r.length})`, users: r }
  ], m = {
    followers: { heading: "No followers yet", body: "When someone follows you, they'll appear here." },
    following: { heading: "Not following anyone yet", body: "Find people to follow from the profile list above." },
    friends: { heading: "No mutual friends yet", body: "Mutual follows become friends. Start by following someone." }
  }, f = d.find((c) => c.key === o)?.users ?? [];
  return /* @__PURE__ */ s("div", { className: "mt-4", children: [
    /* @__PURE__ */ e("div", { role: "tablist", className: "flex border-b border-border mb-3", children: d.map((c) => /* @__PURE__ */ e(
      "button",
      {
        role: "tab",
        "aria-selected": o === c.key,
        onClick: () => l(c.key),
        className: h(
          "px-4 py-2 text-sm font-normal bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif] -mb-px",
          o === c.key ? "text-text-primary border-b-2 border-b-primary" : "text-text-secondary border-b-2 border-b-transparent"
        ),
        children: c.label
      },
      c.key
    )) }),
    /* @__PURE__ */ e(
      "div",
      {
        role: "tabpanel",
        "aria-label": o,
        className: "min-h-[120px]",
        children: f.length === 0 ? /* @__PURE__ */ s("div", { className: "py-6 text-center", children: [
          /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary mb-1", children: m[o].heading }),
          /* @__PURE__ */ e("div", { className: "text-sm text-text-tertiary", children: m[o].body })
        ] }) : /* @__PURE__ */ e("div", { children: f.map((c) => /* @__PURE__ */ s(
          "div",
          {
            className: "flex items-center gap-2 h-14 border-b border-surface-hover",
            children: [
              /* @__PURE__ */ e(te, { user: c, size: 32 }),
              /* @__PURE__ */ s("div", { className: "flex-1", children: [
                /* @__PURE__ */ e("div", { className: "text-base text-text-primary", children: c.displayName }),
                /* @__PURE__ */ e("div", { className: "text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap max-w-[240px]", children: c.visibility === "private" ? /* @__PURE__ */ e("em", { className: "text-text-tertiary", children: "This profile is private." }) : c.bio })
              ] }),
              /* @__PURE__ */ e(
                pe,
                {
                  targetUser: c,
                  followState: a[c.id] ?? "not-following",
                  compact: !0,
                  onFollowChange: i
                }
              )
            ]
          },
          c.id
        )) })
      }
    )
  ] });
}
function ot({ idToken: t, onMessage: n }) {
  const { profile: r, loading: a, updateProfile: i } = oe({ idToken: t }), { followers: o, following: l, friends: d, follow: m, unfollow: f } = Q({ idToken: t }), c = new Set(l.map((N) => N.userId)), p = {};
  [...o, ...l, ...d].forEach((N) => {
    p[N.userId] = c.has(N.userId) ? "following" : "not-following";
  });
  const [y, w] = u(null), b = async (N, D) => {
    w(null);
    try {
      D === "following" || D === "pending" ? await m(N) : await f(N);
    } catch (x) {
      w(x instanceof Error ? x.message : "Follow action failed");
    }
  }, g = o.map((N) => O(N, p[N.userId] ?? "not-following")), v = l.map((N) => O(N, "following")), S = d.map((N) => O(N, "following")), I = r ? {
    ...me(r),
    followersCount: o.length,
    followingCount: l.length,
    friendsCount: d.length
  } : null;
  return /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-lg p-5", children: [
    /* @__PURE__ */ e("h2", { className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3", children: "Social Profile" }),
    a && !I ? /* @__PURE__ */ e("div", { className: "py-10 text-center text-text-tertiary text-sm", children: "Loading profile…" }) : I ? /* @__PURE__ */ s(Y, { children: [
      /* @__PURE__ */ e(
        xe,
        {
          user: I,
          isOwnProfile: !0,
          onSave: i
        }
      ),
      /* @__PURE__ */ e(
        ue,
        {
          followers: g,
          following: v,
          friends: S,
          followStates: p,
          onFollowChange: b
        }
      )
    ] }) : null,
    y && /* @__PURE__ */ e("div", { className: "text-danger text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]", children: y })
  ] });
}
function V({ onCreate: t, onDiscard: n, loading: r }) {
  const [a, i] = u(""), [o, l] = u(null), d = async (m) => {
    if (m.preventDefault(), !!a.trim()) {
      l(null);
      try {
        await t(a.trim()), i("");
      } catch (f) {
        l(f instanceof Error ? f.message : "Failed to create room");
      }
    }
  };
  return /* @__PURE__ */ s("form", { onSubmit: (m) => {
    d(m);
  }, className: "my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border", children: [
    /* @__PURE__ */ e(
      "input",
      {
        value: a,
        onChange: (m) => i(m.target.value.slice(0, 50)),
        placeholder: "Room name",
        maxLength: 50,
        required: !0,
        autoFocus: !0,
        className: "w-full box-border border border-border-field rounded-[5px] px-2 py-1 text-[13px] font-[system-ui,-apple-system,sans-serif] bg-surface text-text-primary mb-1.5"
      }
    ),
    /* @__PURE__ */ s("div", { className: "flex gap-1.5", children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "submit",
          disabled: !a.trim() || r,
          className: h(
            "flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]",
            !a.trim() || r ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"
          ),
          children: r ? "Creating…" : "Create"
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: n,
          className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
          children: "Cancel"
        }
      )
    ] }),
    o && /* @__PURE__ */ e("div", { className: "text-danger text-[11px] mt-1", children: o })
  ] });
}
function J({ onCreateDM: t, loading: n, friends: r }) {
  const [a, i] = u(""), [o, l] = u(!1), [d, m] = u(null), f = async (c) => {
    if (c.preventDefault(), !!a.trim()) {
      m(null);
      try {
        await t(a.trim()), i(""), l(!1);
      } catch (p) {
        m(p instanceof Error ? p.message : "Failed to open DM");
      }
    }
  };
  return o ? /* @__PURE__ */ s("form", { onSubmit: (c) => {
    f(c);
  }, className: "my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border", children: [
    /* @__PURE__ */ s(
      "select",
      {
        value: a,
        onChange: (c) => i(c.target.value),
        disabled: r.length === 0,
        className: "w-full box-border border border-border-field rounded-[5px] px-2 py-1 text-[13px] font-[system-ui,-apple-system,sans-serif] bg-surface text-text-primary mb-1.5",
        children: [
          /* @__PURE__ */ e("option", { value: "", children: r.length === 0 ? "No mutual friends yet" : "Select a friend…" }),
          r.map((c) => /* @__PURE__ */ e("option", { value: c.userId, children: c.displayName }, c.userId))
        ]
      }
    ),
    /* @__PURE__ */ s("div", { className: "flex gap-1.5", children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "submit",
          disabled: !a.trim() || n || r.length === 0,
          className: h(
            "flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]",
            !a.trim() || n ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"
          ),
          children: "Open DM"
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => l(!1),
          className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
          children: "Cancel"
        }
      )
    ] }),
    d && /* @__PURE__ */ e("div", { className: "text-danger text-[11px] mt-1", children: d })
  ] }) : /* @__PURE__ */ e(
    "button",
    {
      onClick: () => l(!0),
      className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded mb-1",
      children: "+ New DM"
    }
  );
}
function fe({ room: t, isActive: n, onClick: r }) {
  const a = (i) => i === "standalone" ? "bg-[#ede9fe] text-primary text-xs px-2 py-0.5 rounded" : i === "group" ? "bg-info-bg text-info text-xs px-2 py-0.5 rounded" : "bg-success-bg text-success text-xs px-2 py-0.5 rounded";
  return /* @__PURE__ */ s(
    "div",
    {
      onClick: r,
      className: h(
        "flex items-center h-14 border-b border-surface-hover cursor-pointer pr-2",
        n ? "bg-surface-hover border-l-[3px] border-l-primary pl-[13px]" : "bg-transparent border-l-[3px] border-l-transparent"
      ),
      children: [
        /* @__PURE__ */ e("div", { className: h("flex-1 text-base text-text-primary", n ? "font-semibold" : "font-normal"), children: t.name }),
        /* @__PURE__ */ e("span", { className: a(t.type), children: t.type })
      ]
    }
  );
}
function be({ room: t, isActive: n, onClick: r }) {
  return /* @__PURE__ */ s(
    "button",
    {
      onClick: r,
      className: h(
        "flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]",
        n ? "bg-[#ede9fe] text-[#4c1d95] font-semibold" : "bg-transparent text-text-primary font-normal"
      ),
      children: [
        /* @__PURE__ */ e("span", { className: h("text-[13px] shrink-0", n ? "text-primary" : "text-text-tertiary"), children: t.type === "dm" ? "●" : "#" }),
        /* @__PURE__ */ e("span", { className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1", children: t.name })
      ]
    }
  );
}
function W({ message: t, onRetry: n, compact: r }) {
  return /* @__PURE__ */ s(
    "div",
    {
      role: "alert",
      className: h(
        "text-center flex flex-col items-center gap-1.5",
        r ? "px-2 py-3" : "px-4 py-6"
      ),
      children: [
        /* @__PURE__ */ e("div", { className: h("font-semibold text-[#b91c1c]", r ? "text-xs" : "text-sm"), children: "Couldn't load rooms" }),
        /* @__PURE__ */ e("div", { className: h("text-text-secondary", r ? "text-[11px]" : "text-xs"), children: t }),
        n && /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: n,
            className: h(
              "mt-1 font-medium text-[#1d4ed8] bg-info-bg border border-info-border rounded cursor-pointer font-[system-ui,-apple-system,sans-serif]",
              r ? "px-2.5 py-0.5 text-[11px]" : "px-3.5 py-1 text-xs"
            ),
            children: "Retry"
          }
        )
      ]
    }
  );
}
function he({ idToken: t, rooms: n, createRoom: r, createDM: a, loading: i, error: o, onRetry: l, onRoomSelect: d, activeRoomId: m, compact: f }) {
  const { friends: c } = Q({ idToken: t }), [p, y] = u(!1), w = async (b) => {
    await r(b), y(!1);
  };
  return f ? /* @__PURE__ */ s("div", { className: "px-2 pt-2", children: [
    /* @__PURE__ */ e(
      "button",
      {
        onClick: () => y((b) => !b),
        className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
        children: "+ New Room"
      }
    ),
    p && /* @__PURE__ */ e(
      V,
      {
        onCreate: w,
        onDiscard: () => y(!1),
        loading: i
      }
    ),
    /* @__PURE__ */ e(J, { onCreateDM: a, loading: i, friends: c }),
    /* @__PURE__ */ e("div", { children: i && n.length === 0 ? /* @__PURE__ */ e("div", { className: "p-2 text-text-tertiary text-xs text-center", children: "Loading…" }) : o && n.length === 0 ? /* @__PURE__ */ e(W, { message: o, onRetry: l, compact: !0 }) : n.length === 0 ? /* @__PURE__ */ e("div", { className: "px-2 py-3 text-text-tertiary text-xs", children: "No rooms yet" }) : n.map((b) => /* @__PURE__ */ e(
      be,
      {
        room: b,
        isActive: b.roomId === m,
        onClick: () => d(b)
      },
      b.roomId
    )) })
  ] }) : /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-lg p-5", children: [
    /* @__PURE__ */ e("h2", { className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3", children: "Rooms" }),
    /* @__PURE__ */ e(
      "button",
      {
        onClick: () => y((b) => !b),
        className: "w-full h-9 mb-2 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]",
        children: "Create Room"
      }
    ),
    p && /* @__PURE__ */ e(
      V,
      {
        onCreate: w,
        onDiscard: () => y(!1),
        loading: i
      }
    ),
    /* @__PURE__ */ e(J, { onCreateDM: a, loading: i, friends: c }),
    /* @__PURE__ */ e("div", { className: "max-h-80 overflow-y-auto", children: i && n.length === 0 ? /* @__PURE__ */ s("div", { className: "flex items-center gap-2 p-4 justify-center text-text-secondary", children: [
      /* @__PURE__ */ e("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }),
      "Loading..."
    ] }) : o && n.length === 0 ? /* @__PURE__ */ e(W, { message: o, onRetry: l }) : n.length === 0 ? /* @__PURE__ */ s("div", { className: "py-6 text-center", children: [
      /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary mb-1", children: "No rooms yet" }),
      /* @__PURE__ */ e("div", { className: "text-sm text-text-tertiary", children: "Create a room or ask to be added." })
    ] }) : n.map((b) => /* @__PURE__ */ e(
      fe,
      {
        room: b,
        isActive: b.roomId === m,
        onClick: () => d(b)
      },
      b.roomId
    )) })
  ] });
}
function ye({ group: t, isSelected: n, onClick: r }) {
  return /* @__PURE__ */ s(
    "button",
    {
      onClick: r,
      className: h(
        "flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]",
        n ? "bg-[#ede9fe] text-[#4c1d95] font-semibold" : "bg-transparent text-text-primary font-normal"
      ),
      children: [
        /* @__PURE__ */ e("span", { className: h("text-xs shrink-0", n ? "text-primary" : "text-text-tertiary"), children: t.visibility === "private" ? "🔒" : "👥" }),
        /* @__PURE__ */ e("span", { className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1", children: t.name })
      ]
    }
  );
}
function ge({ onCreate: t, onDiscard: n, loading: r }) {
  const [a, i] = u(""), [o, l] = u(null), d = async (m) => {
    if (m.preventDefault(), !!a.trim()) {
      l(null);
      try {
        await t(a.trim()), i("");
      } catch (f) {
        l(f instanceof Error ? f.message : "Failed to create group");
      }
    }
  };
  return /* @__PURE__ */ s("form", { onSubmit: (m) => {
    d(m);
  }, className: "p-2 bg-surface-panel rounded-md border border-border my-1 mb-2", children: [
    /* @__PURE__ */ e(
      "input",
      {
        value: a,
        onChange: (m) => i(m.target.value.slice(0, 50)),
        placeholder: "Group name",
        maxLength: 50,
        required: !0,
        autoFocus: !0,
        className: "w-full box-border border border-border-field rounded-[5px] px-2 py-1 text-[13px] font-[system-ui,-apple-system,sans-serif] bg-surface text-text-primary mb-1.5"
      }
    ),
    /* @__PURE__ */ s("div", { className: "flex gap-1.5", children: [
      /* @__PURE__ */ e("button", { type: "submit", disabled: !a.trim() || r, className: h(
        "flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]",
        !a.trim() || r ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"
      ), children: r ? "Creating…" : "Create" }),
      /* @__PURE__ */ e("button", { type: "button", onClick: n, className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]", children: "Cancel" })
    ] }),
    o && /* @__PURE__ */ e("div", { className: "text-danger text-[11px] mt-1", children: o })
  ] });
}
function Ne({ group: t, members: n, rooms: r, groupId: a, currentUserId: i, createGroupRoom: o, onRoomSelect: l, inviteUser: d, loading: m }) {
  const [f, c] = u(!1), [p, y] = u(""), [w, b] = u(!1), [g, v] = u(""), S = t.ownerId === i, I = r.filter((x) => x.groupId === a), N = async (x) => {
    x.preventDefault(), p.trim() && (await d(a, p.trim()), y(""), c(!1));
  }, D = async (x) => {
    x.preventDefault(), g.trim() && (await o(a, g.trim()), v(""), b(!1));
  };
  return /* @__PURE__ */ s("div", { className: "px-2 pb-2 pt-1 border-t border-border mt-1", children: [
    /* @__PURE__ */ s("div", { className: "flex items-center justify-between mb-1", children: [
      /* @__PURE__ */ s("span", { className: "text-[11px] text-text-secondary font-semibold uppercase tracking-wide", children: [
        "Members (",
        n.length,
        ")"
      ] }),
      S && /* @__PURE__ */ e("button", { onClick: () => c((x) => !x), className: "text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]", children: "+ Invite" })
    ] }),
    f && /* @__PURE__ */ s("form", { onSubmit: (x) => {
      N(x);
    }, className: "flex gap-1 mb-1.5", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: p,
          onChange: (x) => y(x.target.value),
          placeholder: "User ID",
          className: "flex-1 border border-border-field rounded px-1.5 py-0.5 text-xs font-[inherit] bg-surface text-text-primary"
        }
      ),
      /* @__PURE__ */ e("button", { type: "submit", disabled: !p.trim(), className: h(
        "h-6 px-2 border-none rounded text-[11px] font-[inherit]",
        p.trim() ? "bg-primary text-white cursor-pointer" : "bg-border text-text-tertiary cursor-default"
      ), children: "Invite" })
    ] }),
    /* @__PURE__ */ s("div", { className: "flex flex-wrap gap-1 mb-2", children: [
      n.slice(0, 8).map((x) => /* @__PURE__ */ e("div", { title: x.displayName ?? x.userId, className: "w-6 h-6 rounded-full bg-border flex items-center justify-center text-[10px] font-semibold text-text-primary", children: (x.displayName ?? x.userId).slice(0, 2).toUpperCase() }, x.userId)),
      n.length > 8 && /* @__PURE__ */ s("span", { className: "text-[11px] text-text-tertiary self-center", children: [
        "+",
        n.length - 8
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "flex items-center justify-between mb-1", children: [
      /* @__PURE__ */ s("span", { className: "text-[11px] text-text-secondary font-semibold uppercase tracking-wide", children: [
        "Rooms (",
        I.length,
        ")"
      ] }),
      S && /* @__PURE__ */ e("button", { onClick: () => b((x) => !x), className: "text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]", children: "+ Room" })
    ] }),
    w && /* @__PURE__ */ s("form", { onSubmit: (x) => {
      D(x);
    }, className: "flex gap-1 mb-1.5", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: g,
          onChange: (x) => v(x.target.value.slice(0, 50)),
          placeholder: "Room name",
          className: "flex-1 border border-border-field rounded px-1.5 py-0.5 text-xs font-[inherit] bg-surface text-text-primary"
        }
      ),
      /* @__PURE__ */ e("button", { type: "submit", disabled: !g.trim() || m, className: h(
        "h-6 px-2 border-none rounded text-[11px] font-[inherit]",
        !g.trim() || m ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"
      ), children: "Create" })
    ] }),
    I.map((x) => /* @__PURE__ */ s(
      "button",
      {
        onClick: () => l?.(x),
        className: "flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1 cursor-pointer bg-transparent text-text-primary text-[13px] text-left font-[inherit]",
        children: [
          /* @__PURE__ */ e("span", { className: "text-text-tertiary text-xs", children: "#" }),
          /* @__PURE__ */ e("span", { className: "overflow-hidden text-ellipsis whitespace-nowrap", children: x.name })
        ]
      },
      x.roomId
    ))
  ] });
}
function ve({ onCreate: t, onDiscard: n, loading: r }) {
  const [a, i] = u(""), [o, l] = u("public"), [d, m] = u(null), f = async (c) => {
    if (c.preventDefault(), !!a.trim()) {
      m(null);
      try {
        await t(a.trim(), void 0, o);
      } catch (p) {
        m(p instanceof Error ? p.message : "Failed to create group");
      }
    }
  };
  return /* @__PURE__ */ s("form", { onSubmit: (c) => {
    f(c);
  }, className: "mb-3 p-3 bg-surface-panel rounded-lg border border-border", children: [
    /* @__PURE__ */ s("div", { className: "mb-3", children: [
      /* @__PURE__ */ e("label", { className: "text-sm text-text-primary block mb-1", children: "Group name" }),
      /* @__PURE__ */ e("input", { value: a, onChange: (c) => i(c.target.value.slice(0, 50)), placeholder: "Group name", maxLength: 50, required: !0, className: "w-full box-border border border-border-field rounded-md px-2.5 py-1.5 text-sm font-[system-ui,-apple-system,sans-serif] bg-surface-inset text-text-primary" })
    ] }),
    /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 mb-3.5", children: [
      /* @__PURE__ */ e("span", { className: "text-[13px] text-text-primary min-w-[42px]", children: o === "public" ? "Public" : "Private" }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": o === "private",
          onClick: () => l((c) => c === "public" ? "private" : "public"),
          className: h(
            "relative w-11 h-6 rounded-xl border-none cursor-pointer p-0 shrink-0 transition-colors duration-200",
            o === "private" ? "bg-primary" : "bg-state-idle"
          ),
          children: /* @__PURE__ */ e("span", { className: h("absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-[left] duration-200", o === "private" ? "left-[23px]" : "left-[3px]") })
        }
      ),
      /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary", children: o === "public" ? "Visible to everyone" : "Invite only" })
    ] }),
    /* @__PURE__ */ s("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ e("button", { type: "submit", disabled: !a.trim() || r, className: h(
        "flex-1 h-9 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]",
        !a.trim() || r ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"
      ), children: r ? "Creating…" : "Create Group" }),
      /* @__PURE__ */ e("button", { type: "button", onClick: n, className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]", children: "Cancel" })
    ] }),
    d && /* @__PURE__ */ e("div", { className: "text-danger text-[13px] mt-1.5", children: d })
  ] });
}
function we({ group: t, currentUserId: n, isSelected: r, onSelect: a, onDelete: i }) {
  const [o, l] = u(null), d = t.ownerId === n;
  return /* @__PURE__ */ s("div", { className: "flex items-center h-14 border-b border-surface-hover cursor-pointer", onClick: () => a(t.groupId), children: [
    /* @__PURE__ */ s("div", { className: "flex-1 min-w-0 pr-2", children: [
      /* @__PURE__ */ e("div", { className: h("text-base text-text-primary", r ? "font-semibold" : "font-normal"), children: t.name }),
      t.description && /* @__PURE__ */ e("div", { className: "text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap", children: t.description })
    ] }),
    /* @__PURE__ */ e("span", { className: h(
      "text-xs px-2 py-0.5 rounded shrink-0 mr-2",
      t.visibility === "public" ? "bg-success-bg text-success" : "bg-surface-hover text-text-secondary"
    ), children: t.visibility }),
    d && /* @__PURE__ */ e("div", { className: "shrink-0", onClick: (m) => m.stopPropagation(), children: o === t.groupId ? /* @__PURE__ */ s("div", { role: "group", "aria-label": "Confirm delete group", className: "flex items-center gap-1", children: [
      /* @__PURE__ */ e("button", { onClick: () => l(null), className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]", children: "Cancel" }),
      /* @__PURE__ */ e("button", { onClick: () => {
        i(t.groupId), l(null);
      }, className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]", children: "Delete" })
    ] }) : /* @__PURE__ */ e("button", { onClick: () => l(t.groupId), className: "text-xs text-danger bg-transparent border-none cursor-pointer px-2 py-1 font-[system-ui,-apple-system,sans-serif]", "aria-label": `Delete group ${t.name}`, children: "Delete" }) })
  ] });
}
function Ce({ groupId: t, onInvite: n }) {
  const [r, a] = u("");
  return /* @__PURE__ */ s("form", { onSubmit: (o) => {
    o.preventDefault(), r.trim() && (n(t, r.trim()), a(""));
  }, className: "flex gap-2 mt-2", children: [
    /* @__PURE__ */ e("input", { value: r, onChange: (o) => a(o.target.value), placeholder: "User ID to invite", className: "flex-1 border border-border-field rounded-md px-2.5 py-1.5 text-sm font-[system-ui,-apple-system,sans-serif] bg-surface-inset text-text-primary" }),
    /* @__PURE__ */ e("button", { type: "submit", disabled: !r.trim(), className: h(
      "h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]",
      r.trim() ? "bg-primary text-white border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"
    ), children: "Invite" })
  ] });
}
function Ie({ members: t }) {
  const n = (r) => r === "owner" ? "bg-success-bg text-success text-xs px-2 py-0.5 rounded" : r === "admin" ? "bg-info-bg text-info text-xs px-2 py-0.5 rounded" : "bg-surface-hover text-text-secondary text-xs px-2 py-0.5 rounded";
  return /* @__PURE__ */ e("div", { className: "max-h-[200px] overflow-y-auto mt-2 border-t border-border", children: t.map((r) => /* @__PURE__ */ s("div", { className: "flex items-center gap-2 h-12 border-b border-surface-hover", children: [
    /* @__PURE__ */ e("div", { className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0", children: (r.displayName ?? r.userId).slice(0, 2).toUpperCase() }),
    /* @__PURE__ */ e("div", { className: "flex-1 text-base text-text-primary", children: r.displayName ?? r.userId }),
    /* @__PURE__ */ e("span", { className: n(r.role), children: r.role })
  ] }, r.userId)) });
}
function ke({ rooms: t, groupId: n, selectedGroupRole: r, createGroupRoom: a, onRoomSelect: i, loading: o }) {
  const [l, d] = u(!1), [m, f] = u(""), c = t.filter((y) => y.groupId === n);
  return /* @__PURE__ */ s("div", { className: "mt-3", children: [
    /* @__PURE__ */ e("h3", { className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-2", children: "GROUP ROOMS" }),
    (r === "owner" || r === "admin") && (l ? /* @__PURE__ */ e("form", { onSubmit: async (y) => {
      y.preventDefault(), m.trim() && (await a(n, m.trim()), f(""), d(!1));
    }, className: "mb-2 p-3 bg-surface-panel rounded-lg border border-border", children: /* @__PURE__ */ s("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ e("input", { value: m, onChange: (y) => f(y.target.value.slice(0, 50)), placeholder: "Room name", maxLength: 50, required: !0, className: "flex-1 border border-border-field rounded-md px-2.5 py-1.5 text-sm font-[system-ui,-apple-system,sans-serif] bg-surface-inset text-text-primary" }),
      /* @__PURE__ */ e("button", { type: "submit", disabled: !m.trim() || o, className: h(
        "h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]",
        !m.trim() || o ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"
      ), children: o ? "Creating…" : "Create Room" }),
      /* @__PURE__ */ e("button", { type: "button", onClick: () => d(!1), className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]", children: "Cancel" })
    ] }) }) : /* @__PURE__ */ e("button", { onClick: () => d(!0), className: "w-full h-9 mb-2 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]", children: "Create Room" })),
    c.length === 0 ? /* @__PURE__ */ e("div", { className: "text-sm text-text-tertiary py-2", children: "No rooms in this group yet." }) : c.map((y) => /* @__PURE__ */ s("div", { onClick: () => i?.(y), className: "flex items-center h-12 border-b border-surface-hover cursor-pointer pr-2", children: [
      /* @__PURE__ */ e("div", { className: "flex-1 text-base text-text-primary", children: y.name }),
      /* @__PURE__ */ e("span", { className: "bg-info-bg text-info text-xs px-2 py-0.5 rounded", children: "group" })
    ] }, y.roomId))
  ] });
}
function Se({ idToken: t, rooms: n, createGroupRoom: r, onRoomSelect: a, roomsLoading: i, compact: o }) {
  const {
    groups: l,
    createGroup: d,
    deleteGroup: m,
    inviteUser: f,
    loadMembers: c,
    members: p,
    loading: y
  } = ie({ idToken: t }), [w, b] = u(!1), [g, v] = u(null), S = t ? (() => {
    try {
      return JSON.parse(atob(t.split(".")[1])).sub;
    } catch {
      return null;
    }
  })() : null, I = async (k, F, P) => {
    await d(k, F, P), b(!1);
  }, N = (k) => {
    g === k ? v(null) : (v(k), c(k));
  };
  if (o) {
    const k = g ? l.find((F) => F.groupId === g) : null;
    return /* @__PURE__ */ s("div", { className: "px-2 pt-2", children: [
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => b((F) => !F),
          className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
          children: "+ New Group"
        }
      ),
      w && /* @__PURE__ */ e(
        ge,
        {
          onCreate: I,
          onDiscard: () => b(!1),
          loading: y
        }
      ),
      /* @__PURE__ */ e("div", { children: y && l.length === 0 ? /* @__PURE__ */ e("div", { className: "p-2 text-text-tertiary text-xs text-center", children: "Loading…" }) : l.length === 0 ? /* @__PURE__ */ e("div", { className: "px-2 py-3 text-text-tertiary text-xs", children: "No groups yet" }) : l.map((F) => /* @__PURE__ */ e(
        ye,
        {
          group: F,
          isSelected: F.groupId === g,
          onClick: () => N(F.groupId)
        },
        F.groupId
      )) }),
      k && /* @__PURE__ */ e(
        Ne,
        {
          group: k,
          members: p,
          rooms: n,
          groupId: k.groupId,
          currentUserId: S,
          createGroupRoom: r,
          onRoomSelect: a,
          inviteUser: f,
          loading: i
        }
      )
    ] });
  }
  const D = g ? l.find((k) => k.groupId === g) : null, x = D && S && D.ownerId === S ? "owner" : "member";
  return /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-lg p-5", children: [
    /* @__PURE__ */ e("h2", { className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3", children: "Groups" }),
    /* @__PURE__ */ e("div", { className: "max-h-80 overflow-y-auto mb-3", children: l.length === 0 ? /* @__PURE__ */ s("div", { className: "py-4 text-center", children: [
      /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary mb-1", children: "No groups yet" }),
      /* @__PURE__ */ e("div", { className: "text-sm text-text-tertiary", children: "Create a group or join a public one." })
    ] }) : l.map((k) => /* @__PURE__ */ e(we, { group: k, currentUserId: S, isSelected: g === k.groupId, onSelect: N, onDelete: m }, k.groupId)) }),
    g && /* @__PURE__ */ s("div", { className: "mb-3", children: [
      /* @__PURE__ */ e(Ie, { members: p }),
      (x === "owner" || x === "admin") && /* @__PURE__ */ e(Ce, { groupId: g, onInvite: f }),
      /* @__PURE__ */ e(ke, { rooms: n, groupId: g, selectedGroupRole: x, createGroupRoom: r, onRoomSelect: a, loading: i })
    ] }),
    /* @__PURE__ */ e(
      "button",
      {
        onClick: () => b((k) => !k),
        className: h("w-full h-9 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]", w && "mb-2"),
        children: w ? "Cancel" : "Create Group"
      }
    ),
    w && /* @__PURE__ */ e(ve, { onCreate: I, onDiscard: () => b(!1), loading: y })
  ] });
}
const q = [
  "#e57373",
  "#f06292",
  "#ba68c8",
  "#9575cd",
  "#7986cb",
  "#64b5f6",
  "#4dd0e1",
  "#4db6ac",
  "#81c784",
  "#ffb74d",
  "#ff8a65",
  "#a1887f",
  "#90a4ae",
  "#4fc3f7",
  "#aed581"
];
function De(t) {
  let n = 0;
  for (let r = 0; r < t.length; r++) n = n * 31 + t.charCodeAt(r) >>> 0;
  return q[n % q.length];
}
function Fe(t) {
  const n = t.split(/[\s._@-]/);
  return n.length >= 2 ? (n[0][0] + n[1][0]).toUpperCase() : t.slice(0, 2).toUpperCase();
}
function Re(t) {
  const n = Date.now() - new Date(t).getTime(), r = Math.floor(n / 1e3);
  return r < 60 ? "just now" : r < 3600 ? `${Math.floor(r / 60)}m ago` : r < 86400 ? `${Math.floor(r / 3600)}h ago` : new Date(t).toLocaleDateString();
}
function $e(t) {
  if (!t) return null;
  try {
    return JSON.parse(atob(t.split(".")[1])).sub;
  } catch {
    return null;
  }
}
function Ue({ post: t, isOwn: n, showSender: r }) {
  const a = De(t.authorId);
  return /* @__PURE__ */ s(
    "div",
    {
      className: h(
        "flex items-end gap-2",
        n ? "flex-row-reverse" : "flex-row",
        r ? "pt-2 px-4 pb-0.5" : "py-px px-4"
      ),
      children: [
        /* @__PURE__ */ e("div", { className: "w-8 shrink-0 self-end", children: !n && r && /* @__PURE__ */ e(
          "div",
          {
            className: "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white select-none",
            style: { background: a },
            children: Fe(t.authorId)
          }
        ) }),
        /* @__PURE__ */ s(
          "div",
          {
            className: h(
              "max-w-[68%] flex flex-col gap-0.5",
              n ? "items-end" : "items-start"
            ),
            children: [
              !n && r && /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold pl-1", style: { color: a }, children: t.authorId }),
              /* @__PURE__ */ e(
                "div",
                {
                  className: h(
                    "px-3.5 py-2 text-sm leading-relaxed break-words transition-opacity duration-200",
                    n ? "bg-primary text-white rounded-[18px_18px_4px_18px]" : "bg-surface-hover text-text-primary rounded-[4px_18px_18px_18px]",
                    t._fadeIn ? "opacity-0" : "opacity-100"
                  ),
                  children: t.content
                }
              ),
              r && /* @__PURE__ */ e("span", { className: "text-[10px] text-text-tertiary px-1", children: Re(t.createdAt) })
            ]
          }
        )
      ]
    }
  );
}
function Ee({ idToken: t, roomId: n, roomName: r, onMessage: a }) {
  const { posts: i, createPost: o, loading: l, hasMore: d, loadMore: m, error: f } = Z({ idToken: t, roomId: n, onMessage: a }), [c, p] = u(""), [y, w] = u(!1), [b, g] = u(null), v = j(null), S = $e(t), I = [...i].reverse();
  R(() => {
    v.current?.scrollIntoView({ behavior: "smooth" });
  }, [i.length]);
  const N = async () => {
    if (!c.trim() || y) return;
    const x = c.trim();
    p(""), g(null), w(!0);
    try {
      await o(x);
    } catch (k) {
      g(k instanceof Error ? k.message : "Failed to send message"), p(x);
    } finally {
      w(!1);
    }
  }, D = (x) => {
    x.key === "Enter" && !x.shiftKey && (x.preventDefault(), N());
  };
  return /* @__PURE__ */ s("div", { className: "flex flex-col h-full bg-surface rounded-lg border border-border overflow-hidden", children: [
    /* @__PURE__ */ e("div", { className: "flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface shrink-0", children: /* @__PURE__ */ s("span", { className: "text-[15px] font-semibold text-text-primary", children: [
      "# ",
      r
    ] }) }),
    /* @__PURE__ */ s("div", { className: "flex-1 overflow-y-auto flex flex-col pb-1", children: [
      d && /* @__PURE__ */ e("div", { className: "text-center py-2", children: /* @__PURE__ */ e(
        "button",
        {
          onClick: () => {
            m();
          },
          disabled: l,
          className: h(
            "text-xs text-text-secondary bg-transparent border border-border rounded-full px-3.5 py-0.5 font-[inherit]",
            l ? "cursor-default" : "cursor-pointer"
          ),
          children: l ? "Loading…" : "Load earlier"
        }
      ) }),
      l && I.length === 0 ? /* @__PURE__ */ e("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px]", children: "Loading messages…" }) : I.length === 0 ? /* @__PURE__ */ s("div", { className: "flex-1 flex flex-col items-center justify-center text-text-tertiary gap-1.5", children: [
        /* @__PURE__ */ e("span", { className: "text-[28px]", children: "💬" }),
        /* @__PURE__ */ e("span", { className: "text-sm font-semibold text-text-primary", children: "No messages yet" }),
        /* @__PURE__ */ e("span", { className: "text-[13px]", children: "Be the first to say something!" })
      ] }) : I.map((x, k) => {
        const F = x.authorId === S, P = I[k - 1], U = !P || P.authorId !== x.authorId || new Date(x.createdAt).getTime() - new Date(P.createdAt).getTime() > 300 * 1e3;
        return /* @__PURE__ */ e(Ue, { post: x, isOwn: F, showSender: U }, x.postId);
      }),
      /* @__PURE__ */ e("div", { ref: v })
    ] }),
    (f || b) && /* @__PURE__ */ e("div", { className: "px-4 py-1.5 bg-danger-bg border-t border-danger-border text-xs text-danger", children: b ?? f }),
    /* @__PURE__ */ s("div", { className: "flex items-center gap-2 px-3 py-2.5 border-t border-border bg-surface shrink-0", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: c,
          onChange: (x) => p(x.target.value),
          onKeyDown: D,
          placeholder: `Message #${r}…`,
          disabled: y,
          className: "flex-1 border border-border-field rounded-[22px] px-4 py-2 text-sm font-[system-ui,-apple-system,sans-serif] bg-surface-panel text-text-primary outline-none"
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => {
            N();
          },
          disabled: !c.trim() || y,
          className: h(
            "w-[34px] h-[34px] rounded-full shrink-0 border-none flex items-center justify-center text-base",
            !c.trim() || y ? "bg-surface-hover text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"
          ),
          children: "↑"
        }
      )
    ] })
  ] });
}
function _({ title: t, count: n, unreadTotal: r, defaultOpen: a = !0, children: i }) {
  const [o, l] = u(a);
  return /* @__PURE__ */ s("div", { className: "mb-0.5", children: [
    /* @__PURE__ */ s(
      "button",
      {
        onClick: () => l((d) => !d),
        className: "flex items-center gap-1 w-full px-3 py-1.5 bg-transparent border-none cursor-pointer font-[inherit] text-left",
        children: [
          /* @__PURE__ */ e(
            "span",
            {
              className: h(
                "text-[10px] text-[#6b7280] inline-block w-3 transition-transform duration-150",
                o ? "rotate-90" : "rotate-0"
              ),
              children: "▶"
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-[11px] font-bold text-text-tertiary uppercase tracking-wide flex-1", children: t }),
          !o && r !== void 0 && r > 0 && /* @__PURE__ */ e("span", { className: "min-w-[18px] h-[18px] rounded-[9px] bg-danger text-white text-[10px] font-bold flex items-center justify-center px-1.5", children: r > 99 ? "99+" : r }),
          /* @__PURE__ */ e("span", { className: "text-[11px] text-[#6b7280]", children: n })
        ]
      }
    ),
    o && i
  ] });
}
function H({ room: t, isActive: n, unread: r, onClick: a }) {
  return /* @__PURE__ */ s(
    "button",
    {
      onClick: a,
      className: h(
        "flex items-center gap-1.5 w-full border-none rounded-[5px] pt-1.5 pb-1.5 pr-2 pl-6 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]",
        n ? "bg-[rgba(100,108,255,0.15)] text-[#a5b4fc] font-semibold" : r > 0 ? "bg-transparent text-surface-hover font-semibold" : "bg-transparent text-text-tertiary font-normal"
      ),
      children: [
        /* @__PURE__ */ e("span", { className: h("text-[13px] shrink-0", n ? "text-[#a5b4fc]" : "text-[#6b7280]"), children: t.type === "dm" ? "●" : "#" }),
        /* @__PURE__ */ e("span", { className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1", children: t.name }),
        r > 0 && !n && /* @__PURE__ */ e("span", { className: "min-w-[18px] h-[18px] rounded-[9px] bg-danger text-white text-[10px] font-bold flex items-center justify-center px-1.5 shrink-0", children: r > 99 ? "99+" : r })
      ]
    }
  );
}
function it({
  userId: t,
  displayName: n,
  idToken: r,
  rooms: a,
  createRoom: i,
  createDM: o,
  createGroupRoom: l,
  roomsLoading: d,
  roomsError: m,
  onRoomsRetry: f,
  handleRoomSelect: c,
  activeRoomId: p,
  onMessage: y
}) {
  const { theme: w } = de(), b = w === "dark", [g, v] = u(!0), S = g ? 240 : 0, [I, N] = u({}), D = j(p);
  R(() => {
    D.current = p;
  }, [p]);
  const x = X((C) => {
    N(($) => {
      if (!$[C.roomId]) return $;
      const B = { ...$ };
      return delete B[C.roomId], B;
    }), c(C);
  }, [c]);
  R(() => y(($) => {
    if ($.type === "social:post") {
      const A = ($.payload ?? $).roomId;
      A && A !== D.current && N((K) => ({ ...K, [A]: (K[A] ?? 0) + 1 }));
    }
  }), [y]);
  const [k, F] = u(!1), P = n ? n.split(" ").map((C) => C[0]).join("").toUpperCase().slice(0, 2) : t.slice(0, 2).toUpperCase(), U = a.find((C) => C.roomId === p) ?? null, L = a.filter((C) => C.type === "standalone" || C.type === "group"), M = a.filter((C) => C.type === "dm"), ne = L.reduce((C, $) => C + (I[$.roomId] ?? 0), 0), se = M.reduce((C, $) => C + (I[$.roomId] ?? 0), 0), ae = b ? "#1e1f2e" : "#f8fafc", T = b ? "rgba(255,255,255,0.06)" : "#e2e8f0", G = b ? "#fff" : "#0f172a", E = b ? "#94a3b8" : "#64748b";
  return /* @__PURE__ */ s(
    "div",
    {
      className: "flex overflow-hidden rounded-lg transition-colors duration-200 h-[calc(100vh-120px)]",
      style: {
        background: b ? "#0f172a" : "#fff",
        border: `1px solid ${T}`
      },
      children: [
        /* @__PURE__ */ s(
          "div",
          {
            className: h("shrink-0 flex-col overflow-hidden transition-[width] duration-[180ms]", g ? "flex" : "hidden"),
            style: {
              width: S,
              borderRight: `1px solid ${T}`,
              background: ae
            },
            children: [
              /* @__PURE__ */ s(
                "div",
                {
                  className: "flex items-center gap-2 shrink-0 px-[14px] pt-[14px] pb-3",
                  style: { borderBottom: `1px solid ${T}` },
                  children: [
                    /* @__PURE__ */ e("div", { className: "w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-[11px] shrink-0 bg-[linear-gradient(135deg,#646cff,#9b59b6)]", children: P }),
                    /* @__PURE__ */ s("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ e("div", { className: "text-[13px] font-bold overflow-hidden text-ellipsis whitespace-nowrap", style: { color: G }, children: n || t }),
                      /* @__PURE__ */ s("div", { className: "text-[11px] flex items-center gap-1", style: { color: E }, children: [
                        /* @__PURE__ */ e("span", { className: "w-1.5 h-1.5 rounded-full bg-[#22c55e] inline-block" }),
                        "Active"
                      ] })
                    ] }),
                    /* @__PURE__ */ e(
                      "button",
                      {
                        onClick: () => v(!1),
                        title: "Collapse sidebar",
                        className: "bg-transparent border-none cursor-pointer text-base leading-none px-1 py-0.5 rounded",
                        style: { color: E },
                        children: "«"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ s("div", { className: "flex-1 overflow-y-auto pt-2", children: [
                /* @__PURE__ */ e(_, { title: "Channels", count: L.length, unreadTotal: ne, children: /* @__PURE__ */ s("div", { className: "px-1", children: [
                  d && L.length === 0 ? /* @__PURE__ */ e("div", { className: "px-6 py-2 text-xs", style: { color: E }, children: "Loading…" }) : L.length === 0 ? /* @__PURE__ */ e("div", { className: "px-6 py-2 text-xs", style: { color: E }, children: "No channels yet" }) : L.map((C) => /* @__PURE__ */ e(
                    H,
                    {
                      room: C,
                      isActive: C.roomId === p,
                      unread: I[C.roomId] ?? 0,
                      onClick: () => x(C)
                    },
                    C.roomId
                  )),
                  /* @__PURE__ */ s(
                    "button",
                    {
                      onClick: () => F((C) => !C),
                      className: "flex items-center gap-1.5 w-full bg-transparent border-none cursor-pointer text-xs font-[inherit] rounded pt-[5px] pr-2 pb-[5px] pl-6",
                      style: { color: E },
                      children: [
                        /* @__PURE__ */ e("span", { className: "text-sm leading-none", children: "+" }),
                        " Add channel"
                      ]
                    }
                  ),
                  k && /* @__PURE__ */ e("div", { className: "px-2", children: /* @__PURE__ */ e(
                    he,
                    {
                      idToken: r,
                      rooms: [],
                      createRoom: i,
                      createDM: o,
                      loading: d,
                      error: m,
                      onRetry: f,
                      onRoomSelect: x,
                      activeRoomId: p,
                      compact: !0
                    }
                  ) })
                ] }) }),
                /* @__PURE__ */ e(_, { title: "Direct Messages", count: M.length, unreadTotal: se, children: /* @__PURE__ */ e("div", { className: "px-1", children: M.length === 0 ? /* @__PURE__ */ e("div", { className: "px-6 py-2 text-xs", style: { color: E }, children: "No conversations yet" }) : M.map((C) => /* @__PURE__ */ e(
                  H,
                  {
                    room: C,
                    isActive: C.roomId === p,
                    unread: I[C.roomId] ?? 0,
                    onClick: () => x(C)
                  },
                  C.roomId
                )) }) }),
                /* @__PURE__ */ e(_, { title: "Groups", count: 0, defaultOpen: !1, children: /* @__PURE__ */ e(
                  Se,
                  {
                    idToken: r,
                    rooms: a,
                    createGroupRoom: l,
                    onRoomSelect: x,
                    roomsLoading: d,
                    compact: !0
                  }
                ) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ s("div", { className: "flex-1 min-w-0 flex flex-col", children: [
          !g && /* @__PURE__ */ s(
            "div",
            {
              className: "flex items-center gap-2 px-3 py-1.5",
              style: { borderBottom: `1px solid ${T}` },
              children: [
                /* @__PURE__ */ e(
                  "button",
                  {
                    onClick: () => v(!0),
                    title: "Expand sidebar",
                    className: "bg-transparent rounded cursor-pointer text-sm px-2 py-0.5 font-[inherit]",
                    style: { border: `1px solid ${T}`, color: E },
                    children: "»"
                  }
                ),
                U && /* @__PURE__ */ s("span", { className: "text-[13px] font-semibold", style: { color: G }, children: [
                  U.type === "dm" ? "●" : "#",
                  " ",
                  U.name
                ] })
              ]
            }
          ),
          /* @__PURE__ */ e("div", { className: "flex-1 min-h-0", children: U ? /* @__PURE__ */ e(
            Ee,
            {
              idToken: r,
              roomId: U.roomId,
              roomName: U.name,
              onMessage: y
            },
            U.roomId
          ) : /* @__PURE__ */ s(
            "div",
            {
              className: "h-full flex flex-col items-center justify-center gap-2",
              style: { color: E },
              children: [
                /* @__PURE__ */ e("span", { className: "text-4xl", children: "💬" }),
                /* @__PURE__ */ e("span", { className: "text-[15px] font-semibold", style: { color: G }, children: "Select a room to start chatting" }),
                /* @__PURE__ */ e("span", { className: "text-[13px]", children: "Choose a channel or DM from the sidebar" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Pe(t) {
  try {
    const n = new Date(t), r = n.getHours().toString().padStart(2, "0"), a = n.getMinutes().toString().padStart(2, "0");
    return `${r}:${a}`;
  } catch {
    return "";
  }
}
function Le(t) {
  if (t.length === 0) return "";
  if (t.length === 1) return `${t[0]} is typing...`;
  if (t.length === 2) return `${t[0]} and ${t[1]} are typing...`;
  const n = t.length - 2;
  return `${t[0]}, ${t[1]} and ${n} other${n > 1 ? "s" : ""} are typing...`;
}
function lt({ messages: t, onSend: n, disabled: r = !1, onTyping: a, typingUsers: i = [] }) {
  const [o, l] = u(""), d = j(null), m = j(null);
  R(() => {
    d.current && (d.current.scrollTop = d.current.scrollHeight);
  }, [t.length]), R(() => () => {
    m.current && clearTimeout(m.current);
  }, []);
  function f() {
    const p = o.trim();
    !p || r || (m.current && clearTimeout(m.current), m.current = null, a?.(!1), n(p), l(""));
  }
  function c(p) {
    r || (a?.(!0), m.current && clearTimeout(m.current), m.current = setTimeout(() => a?.(!1), 2e3)), p.key === "Enter" && !r && o.trim() && f();
  }
  return /* @__PURE__ */ s("div", { className: "border border-border rounded p-3 mt-4 font-mono", children: [
    /* @__PURE__ */ s("div", { className: "text-[0.8rem] font-bold mb-2 text-text-primary", children: [
      "Chat (",
      t.length,
      ")"
    ] }),
    i.length > 0 && /* @__PURE__ */ e("div", { className: "text-[0.7rem] text-text-tertiary italic mb-1", children: Le(i) }),
    /* @__PURE__ */ e(
      "div",
      {
        ref: d,
        className: "max-h-[200px] overflow-y-auto mb-2",
        children: t.length === 0 ? /* @__PURE__ */ e("div", { className: "text-text-tertiary text-xs", children: "No messages yet" }) : t.map((p, y) => {
          const w = p.displayName ?? p.clientId.slice(0, 8), b = Pe(p.timestamp);
          return /* @__PURE__ */ s(
            "div",
            {
              className: "flex items-baseline gap-1.5 py-0.5 flex-wrap",
              children: [
                /* @__PURE__ */ e("span", { className: "text-[0.7rem] text-text-secondary shrink-0", children: w }),
                /* @__PURE__ */ e("span", { className: "text-[0.8rem] text-text-primary grow", children: p.content }),
                /* @__PURE__ */ e("span", { className: "text-[0.65rem] text-text-tertiary shrink-0", children: b })
              ]
            },
            y
          );
        })
      }
    ),
    /* @__PURE__ */ s("div", { className: "flex flex-row gap-2", children: [
      /* @__PURE__ */ e(
        "input",
        {
          type: "text",
          value: o,
          onChange: (p) => l(p.target.value),
          onKeyDown: c,
          disabled: r,
          placeholder: r ? "Not connected" : "Type a message...",
          className: h(
            "flex-1 text-[0.8rem] px-2 py-1 border border-border-field rounded font-mono text-text-primary",
            r ? "bg-surface-inset" : "bg-surface"
          )
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: f,
          disabled: r || !o.trim(),
          className: h(
            "text-[0.8rem] px-3 py-1 border border-border-field rounded font-mono",
            r || !o.trim() ? "bg-surface-inset text-text-tertiary cursor-default" : "bg-[#007bff] text-white cursor-pointer"
          ),
          children: "Send"
        }
      )
    ] })
  ] });
}
function Te(t) {
  const n = Date.now() - new Date(t).getTime(), r = Math.floor(n / 1e3);
  return r < 60 ? "just now" : r < 3600 ? `${Math.floor(r / 60)}m ago` : t.slice(0, 10);
}
function je(t) {
  if (!t) return null;
  try {
    return JSON.parse(atob(t.split(".")[1])).sub;
  } catch {
    return null;
  }
}
function re({ onSubmit: t, placeholder: n = "Write a reply…", loading: r }) {
  const [a, i] = u("");
  return /* @__PURE__ */ s("form", { onSubmit: (l) => {
    l.preventDefault(), a.trim() && (t(a.trim()), i(""));
  }, className: "flex gap-2 mt-2", children: [
    /* @__PURE__ */ e(
      "input",
      {
        value: a,
        onChange: (l) => i(l.target.value),
        placeholder: n,
        className: "flex-1 border border-border-field rounded-md px-2.5 py-1.5 text-sm font-[system-ui,-apple-system,sans-serif] bg-surface-inset text-text-primary"
      }
    ),
    /* @__PURE__ */ e(
      "button",
      {
        type: "submit",
        disabled: !a.trim() || r,
        className: h(
          "h-7 px-2.5 rounded-md text-sm font-semibold font-[system-ui,-apple-system,sans-serif]",
          !a.trim() || r ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"
        ),
        children: "Comment"
      }
    )
  ] });
}
function Me({ comment: t, currentUserId: n, loading: r, onDelete: a, onReply: i }) {
  const [o, l] = u(!1), [d, m] = u(!1), [f, c] = u(t._fadeIn ? 0 : 1);
  R(() => {
    if (t._fadeIn) {
      const g = setTimeout(() => c(1), 10);
      return () => clearTimeout(g);
    }
  }, []);
  const p = t.authorId === n, y = !!t.parentCommentId, w = t.authorId.slice(0, 2).toUpperCase(), b = /* @__PURE__ */ e("div", { style: { opacity: f }, className: "transition-opacity duration-200 ease-[ease]", children: /* @__PURE__ */ s("div", { className: "flex items-start gap-2", children: [
    /* @__PURE__ */ e("div", { className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0", children: w }),
    /* @__PURE__ */ s("div", { className: "flex-1", children: [
      /* @__PURE__ */ s("div", { className: "flex items-center gap-2 mb-0.5", children: [
        /* @__PURE__ */ e("span", { className: "text-sm font-semibold text-text-primary", children: t.authorId }),
        /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary", children: Te(t.createdAt) })
      ] }),
      /* @__PURE__ */ e("div", { className: "text-sm text-text-primary mb-1", children: t.content }),
      /* @__PURE__ */ s("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => m((g) => !g),
            className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
            children: "Reply"
          }
        ),
        p && !o && /* @__PURE__ */ e(
          "button",
          {
            onClick: () => l(!0),
            className: "text-sm text-text-tertiary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
            "aria-label": "Delete comment",
            children: "Delete"
          }
        ),
        p && o && /* @__PURE__ */ s("div", { role: "group", "aria-label": "Confirm delete comment", className: "flex gap-1.5 items-center", children: [
          /* @__PURE__ */ e("span", { className: "text-xs text-text-primary", children: "Delete this comment?" }),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => l(!1),
              className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => {
                a(t.commentId), l(!1);
              },
              className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
              children: "Delete"
            }
          )
        ] })
      ] }),
      d && /* @__PURE__ */ e(
        re,
        {
          onSubmit: async (g) => {
            await i(t.commentId, g), m(!1);
          },
          placeholder: "Write a reply…",
          loading: r
        }
      )
    ] })
  ] }) });
  return y ? /* @__PURE__ */ e("div", { className: "pl-8 py-2", children: b }) : /* @__PURE__ */ e("div", { className: "py-2 border-b border-surface-hover", children: b });
}
function Ae({ idToken: t, roomId: n, postId: r, onMessage: a }) {
  const { comments: i, createComment: o, deleteComment: l, loading: d } = le({ idToken: t, roomId: n, postId: r, onMessage: a }), m = je(t), f = async (c, p) => {
    await o(p, c);
  };
  return /* @__PURE__ */ s("div", { className: "pt-2 pl-2 border-t border-surface-hover", children: [
    d ? /* @__PURE__ */ e("div", { className: "text-sm text-text-tertiary py-2", children: "Loading comments…" }) : i.length === 0 ? /* @__PURE__ */ e("div", { className: "text-sm text-text-tertiary text-center py-4", children: "No comments yet" }) : i.map((c) => /* @__PURE__ */ e(
      Me,
      {
        comment: c,
        currentUserId: m,
        loading: d,
        onDelete: l,
        onReply: f
      },
      c.commentId
    )),
    /* @__PURE__ */ e(
      re,
      {
        onSubmit: (c) => o(c),
        placeholder: "Write a comment…",
        loading: d
      }
    )
  ] });
}
const Ge = ["❤️", "😂", "👍", "👎", "😮", "😢", "😡", "🎉", "🔥", "⚡", "💯", "🚀"];
function Be(t) {
  const n = Date.now() - new Date(t).getTime(), r = Math.floor(n / 1e3);
  return r < 60 ? "just now" : r < 3600 ? `${Math.floor(r / 60)}m ago` : t.slice(0, 10);
}
function Oe(t) {
  if (!t) return null;
  try {
    return JSON.parse(atob(t.split(".")[1])).sub;
  } catch {
    return null;
  }
}
function _e({ onCreate: t, loading: n }) {
  const [r, a] = u(""), [i, o] = u(null), l = async (d) => {
    if (d.preventDefault(), !!r.trim()) {
      o(null);
      try {
        await t(r.trim()), a("");
      } catch (m) {
        o(m instanceof Error ? m.message : "Failed to create post");
      }
    }
  };
  return /* @__PURE__ */ s("form", { onSubmit: (d) => {
    l(d);
  }, children: [
    /* @__PURE__ */ e(
      "textarea",
      {
        value: r,
        onChange: (d) => a(d.target.value),
        placeholder: "What's on your mind?",
        maxLength: 1e4,
        rows: 3,
        className: "w-full box-border border border-border-field rounded-md px-2.5 py-1.5 text-sm font-[system-ui,-apple-system,sans-serif] bg-surface-inset text-text-primary resize-y mb-2"
      }
    ),
    /* @__PURE__ */ e("div", { className: "flex justify-end", children: /* @__PURE__ */ e(
      "button",
      {
        type: "submit",
        disabled: !r.trim() || n,
        className: h(
          "h-9 px-4 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]",
          !r.trim() || n ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"
        ),
        children: n ? "Posting…" : "Post"
      }
    ) }),
    i && /* @__PURE__ */ e("div", { className: "text-danger text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]", children: i })
  ] });
}
function Ke({ idToken: t, roomId: n, postId: r, onMessage: a }) {
  const { isLiked: i, likeCount: o, toggle: l, whoLiked: d } = ee({ idToken: t, roomId: n, postId: r, onMessage: a });
  return /* @__PURE__ */ s(Y, { children: [
    /* @__PURE__ */ s(
      "button",
      {
        onClick: () => {
          l();
        },
        "aria-label": "Like post",
        className: "bg-transparent border-none cursor-pointer flex items-center gap-1 p-0 font-[system-ui,-apple-system,sans-serif]",
        children: [
          /* @__PURE__ */ e("span", { className: h("text-base", i ? "text-primary" : "text-text-tertiary"), children: "❤" }),
          /* @__PURE__ */ e("span", { className: h("text-sm", i ? "text-primary" : "text-text-tertiary"), children: o })
        ]
      }
    ),
    d.length > 0 && /* @__PURE__ */ s("span", { className: "text-xs text-text-secondary ml-1", children: [
      "Liked by: ",
      d.slice(0, 3).map((m) => m.displayName).join(", "),
      d.length > 3 ? ` and ${d.length - 3} more` : ""
    ] })
  ] });
}
function Ve({ idToken: t, roomId: n, postId: r, onMessage: a }) {
  const { reactWithEmoji: i } = ee({ idToken: t, roomId: n, postId: r, onMessage: a });
  return /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-0", children: Ge.map((o) => /* @__PURE__ */ e(
    "button",
    {
      onClick: () => {
        i(o);
      },
      className: "text-base bg-transparent border-none px-1 py-0.5 cursor-pointer",
      title: o,
      children: o
    },
    o
  )) });
}
function Je({ post: t, idToken: n, roomId: r, currentUserId: a, onMessage: i, onEdit: o, onDelete: l }) {
  const [d, m] = u(t._fadeIn ? 0 : 1), [f, c] = u(!1), [p, y] = u(!1), [w, b] = u(!1), [g, v] = u(t.content);
  R(() => {
    if (t._fadeIn) {
      const N = setTimeout(() => m(1), 10);
      return () => clearTimeout(N);
    }
  }, []);
  const S = t.authorId === a, I = t.authorId.slice(0, 2).toUpperCase();
  return /* @__PURE__ */ s("div", { style: { opacity: d }, className: "border-b border-surface-hover pb-4 mb-4 transition-opacity duration-200 ease-[ease]", children: [
    /* @__PURE__ */ s("div", { className: "flex items-center gap-2 mb-2", children: [
      /* @__PURE__ */ e("div", { className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0", children: I }),
      /* @__PURE__ */ s("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("span", { className: "text-base font-semibold text-text-primary", children: t.authorId }),
        /* @__PURE__ */ e("span", { className: "text-sm text-text-tertiary ml-2", children: Be(t.createdAt) })
      ] })
    ] }),
    w ? /* @__PURE__ */ s("div", { className: "mb-2", children: [
      /* @__PURE__ */ e(
        "textarea",
        {
          value: g,
          onChange: (N) => v(N.target.value),
          rows: 3,
          className: "w-full box-border border border-border-field rounded-md px-2.5 py-1.5 text-sm font-[system-ui,-apple-system,sans-serif] bg-surface-inset text-text-primary resize-y mb-2"
        }
      ),
      /* @__PURE__ */ s("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => {
              o(t.postId, g), b(!1);
            },
            disabled: !g.trim(),
            className: h(
              "h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]",
              g.trim() ? "bg-primary text-white border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"
            ),
            children: "Save"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => {
              b(!1), v(t.content);
            },
            className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
            children: "Discard Changes"
          }
        )
      ] })
    ] }) : /* @__PURE__ */ e("div", { className: "text-base text-text-primary mt-2 mb-2", children: t.content }),
    /* @__PURE__ */ s("div", { className: "flex gap-4 text-sm mt-1 items-center flex-wrap", children: [
      /* @__PURE__ */ e(Ke, { idToken: n, roomId: r, postId: t.postId, onMessage: i }),
      /* @__PURE__ */ e(Ve, { idToken: n, roomId: r, postId: t.postId, onMessage: i }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => c((N) => !N),
          className: "bg-transparent border-none text-sm text-text-secondary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
          children: "Comment"
        }
      ),
      S && !w && /* @__PURE__ */ e(
        "button",
        {
          onClick: () => b(!0),
          className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
          children: "Edit"
        }
      ),
      S && !p && !w && /* @__PURE__ */ e(
        "button",
        {
          onClick: () => y(!0),
          className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
          children: "Delete"
        }
      ),
      S && p && /* @__PURE__ */ s("div", { role: "group", "aria-label": "Confirm delete post", className: "flex gap-1.5 items-center", children: [
        /* @__PURE__ */ e("span", { className: "text-xs text-text-primary", children: "Delete this post?" }),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => y(!1),
            className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => {
              l(t.postId), y(!1);
            },
            className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
            children: "Delete"
          }
        )
      ] })
    ] }),
    f && /* @__PURE__ */ e(
      Ae,
      {
        idToken: n,
        roomId: r,
        postId: t.postId,
        onMessage: i
      }
    )
  ] });
}
function dt({ idToken: t, roomId: n, onMessage: r }) {
  const { posts: a, createPost: i, editPost: o, deletePost: l, loading: d, hasMore: m, loadMore: f } = Z({ idToken: t, roomId: n, onMessage: r }), c = Oe(t);
  return /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-lg p-5", children: [
    /* @__PURE__ */ e(_e, { onCreate: i, loading: d }),
    /* @__PURE__ */ e("div", { className: "border-t border-border my-4" }),
    m && /* @__PURE__ */ e(
      "button",
      {
        onClick: () => {
          f();
        },
        disabled: d,
        className: h(
          "w-full h-9 mb-4 bg-surface text-text-primary border border-border rounded-lg text-sm font-[system-ui,-apple-system,sans-serif]",
          d ? "cursor-default" : "cursor-pointer"
        ),
        children: d ? "Loading…" : "Load more"
      }
    ),
    d && a.length === 0 ? /* @__PURE__ */ s("div", { className: "flex items-center gap-2 p-4 justify-center text-text-secondary", children: [
      /* @__PURE__ */ e("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }),
      "Loading..."
    ] }) : a.length === 0 ? /* @__PURE__ */ s("div", { className: "py-6 text-center", children: [
      /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary mb-1", children: "No posts yet" }),
      /* @__PURE__ */ e("div", { className: "text-sm text-text-tertiary", children: "Be the first to post in this room." })
    ] }) : a.map((p) => /* @__PURE__ */ e(
      Je,
      {
        post: p,
        idToken: t,
        roomId: n,
        currentUserId: c,
        onMessage: r,
        onEdit: o,
        onDelete: l
      },
      p.postId
    ))
  ] });
}
const z = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FECA57",
  "#FF9FF3",
  "#54A0FF",
  "#5F27CD",
  "#00D2D3",
  "#FF9F43",
  "#1DD1A1",
  "#F368E0",
  "#3742FA",
  "#2F3542",
  "#FF3838"
];
function We(t) {
  let n = 0;
  for (let r = 0; r < t.length; r++)
    n = t.charCodeAt(r) + ((n << 5) - n);
  return z[Math.abs(n) % z.length];
}
function qe(t) {
  if (!t) return "?";
  const n = t.trim().split(/\s+/);
  if (n.length >= 2) {
    const r = n[0][0] ?? "", a = n[n.length - 1][0] ?? "";
    return (r + a).toUpperCase();
  }
  return t.slice(0, 2).toUpperCase();
}
function ct({ users: t, currentClientId: n }) {
  return /* @__PURE__ */ s("div", { className: "border border-border rounded p-3 font-mono", children: [
    /* @__PURE__ */ s("div", { className: "text-[0.8rem] font-bold mb-2 text-text-primary", children: [
      "Users in channel (",
      t.length,
      ")"
    ] }),
    t.length === 0 ? /* @__PURE__ */ e("div", { className: "text-text-tertiary text-xs", children: "No other users connected" }) : /* @__PURE__ */ e("div", { children: t.map((r) => {
      const a = We(
        r.metadata.email ?? r.clientId
      ), i = qe(
        r.metadata.displayName ?? r.clientId.slice(0, 2)
      ), o = r.metadata.isTyping === !0, l = r.clientId === n, d = r.metadata.displayName ?? (r.clientId.length > 12 ? r.clientId.slice(0, 12) + "..." : r.clientId);
      return /* @__PURE__ */ s(
        "div",
        {
          className: "flex items-center gap-2 py-1 text-xs",
          children: [
            /* @__PURE__ */ e(
              "div",
              {
                className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
                style: { backgroundColor: a },
                children: i
              }
            ),
            /* @__PURE__ */ e("span", { className: "text-text-primary", children: d }),
            l && /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "(you)" }),
            o && /* @__PURE__ */ e("span", { className: "text-text-tertiary italic", children: "typing..." })
          ]
        },
        r.clientId
      );
    }) })
  ] });
}
const He = 50;
function ze(t) {
  const n = t.detail;
  switch (t.eventType) {
    case "social.room.join":
      return { icon: "🚪", text: `Joined room ${n.roomId?.slice(0, 8) ?? ""}` };
    case "social.room.leave":
      return { icon: "🚪", text: `Left room ${n.roomId?.slice(0, 8) ?? ""}` };
    case "social.follow":
      return { icon: "👥", text: `Followed @${n.followeeId?.slice(0, 8) ?? ""}` };
    case "social.unfollow":
      return { icon: "👥", text: `Unfollowed @${n.followeeId?.slice(0, 8) ?? ""}` };
    case "social.like":
      return { icon: "❤️", text: `Liked ${n.contentId?.slice(0, 8) ?? "content"}` };
    case "social.reaction":
      return { icon: n.emoji ?? "😀", text: `Reacted to ${n.contentId?.slice(0, 8) ?? "content"}` };
    case "social.post.created":
      return { icon: "📝", text: `Posted in room ${n.roomId?.slice(0, 8) ?? ""}` };
    case "social.comment.created":
      return { icon: "💬", text: `Commented in room ${n.roomId?.slice(0, 8) ?? ""}` };
    // Pipeline run-lifecycle events (relayed via usePipelineActivityRelay)
    case "pipeline.run.started": {
      const r = n.pipelineId ?? "";
      return { icon: "▶", text: r ? `Triggered pipeline ${r}` : "Triggered pipeline" };
    }
    case "pipeline.run.completed":
      return {
        icon: "✓",
        text: typeof n.durationMs == "number" ? `Pipeline run completed in ${n.durationMs}ms` : "Pipeline run completed"
      };
    case "pipeline.run.failed":
      return {
        icon: "✕",
        text: `Pipeline run failed: ${n.error ?? "unknown error"}`
      };
    case "pipeline.approval.requested":
      return { icon: "✋", text: "Approval requested" };
    default:
      return { icon: "ℹ️", text: t.eventType };
  }
}
function Ye(t) {
  const n = Date.now() - new Date(t).getTime(), r = Math.floor(n / 1e3);
  return r < 60 ? "just now" : r < 3600 ? `${Math.floor(r / 60)}m ago` : t.slice(0, 10);
}
function Xe(t) {
  if (!t) return null;
  try {
    return JSON.parse(atob(t.split(".")[1])).sub;
  } catch {
    return null;
  }
}
function Qe({
  idToken: t,
  sendMessage: n,
  onMessage: r,
  connectionState: a
}) {
  const [i, o] = u([]), [l, d] = u(!0), [m, f] = u(!1), [c, p] = u(null), [y, w] = u(0), b = j(n);
  R(() => {
    b.current = n;
  }, [n]);
  const { toast: g } = ce(), v = Xe(t), S = X(() => w((I) => I + 1), []);
  return R(() => {
  }, [t, y, g]), R(() => {
    if (a !== "connected" || !v) {
      f(!1);
      return;
    }
    const I = `activity:${v}`;
    return b.current({ service: "activity", action: "subscribe", channelId: I }), f(!0), () => {
      b.current({ service: "activity", action: "unsubscribe", channelId: I }), f(!1);
    };
  }, [a, v]), R(() => r((N) => {
    if (N.type !== "activity:event") return;
    const D = N.payload;
    D && o((x) => x.length > 0 && x[0].timestamp === D.timestamp && x[0].eventType === D.eventType ? x : [
      { eventType: D.eventType, timestamp: D.timestamp, detail: D.detail },
      ...x
    ].slice(0, He));
  }), [r]), { items: i, loading: l, isLive: m, error: c, retry: S };
}
function mt({ idToken: t, sendMessage: n, onMessage: r, connectionState: a }) {
  const { items: i, loading: o, isLive: l, error: d, retry: m } = Qe({ idToken: t, sendMessage: n, onMessage: r, connectionState: a });
  return /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-lg p-5", children: [
    /* @__PURE__ */ s("h2", { className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3", children: [
      "Activity",
      l && /* @__PURE__ */ e(
        "span",
        {
          className: "inline-block w-2 h-2 rounded-full bg-[#22c55e] ml-2 align-middle",
          title: "Live"
        }
      )
    ] }),
    o ? /* @__PURE__ */ s("div", { className: "flex items-center gap-2 p-4 justify-center text-text-secondary", children: [
      /* @__PURE__ */ e("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }),
      "Loading..."
    ] }) : d && i.length === 0 ? /* @__PURE__ */ s(
      "div",
      {
        role: "alert",
        className: "py-6 px-4 text-center text-[#b91c1c] text-sm flex flex-col items-center gap-2",
        children: [
          /* @__PURE__ */ e("span", { children: "Couldn't load activity" }),
          /* @__PURE__ */ e("span", { className: "text-text-secondary text-xs", children: d }),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: m,
              className: "mt-1 px-3 py-1 text-xs font-medium text-[#1d4ed8] bg-info-bg border border-info-border rounded cursor-pointer",
              children: "Retry"
            }
          )
        ]
      }
    ) : i.length === 0 ? /* @__PURE__ */ e("div", { className: "py-10 text-center text-text-tertiary text-sm", children: "No activity yet" }) : /* @__PURE__ */ e("div", { children: i.map((f, c) => {
      const { icon: p, text: y } = ze(f);
      return /* @__PURE__ */ s(
        "div",
        {
          className: h(
            "flex flex-row items-center gap-2 py-2",
            c < i.length - 1 && "border-b border-surface-hover"
          ),
          children: [
            /* @__PURE__ */ e("span", { className: "w-6 shrink-0 text-center", children: p }),
            /* @__PURE__ */ e("span", { className: "flex-1 text-sm text-text-primary", children: y }),
            /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary shrink-0", children: Ye(f.timestamp) })
          ]
        },
        c
      );
    }) })
  ] });
}
export {
  mt as ActivityPanel,
  lt as ChatPanel,
  Ee as ChatRoom,
  Ae as CommentThread,
  Se as GroupPanel,
  dt as PostFeed,
  ct as PresencePanel,
  he as RoomList,
  ot as SocialPanel,
  it as SocialTabContent
};
