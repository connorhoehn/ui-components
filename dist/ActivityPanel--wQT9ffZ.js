import { jsx as e, jsxs as n, Fragment as X } from "react/jsx-runtime";
import { createContext as ie, useState as x, useEffect as U, useCallback as _, useContext as le, useRef as K } from "react";
import { e as de, a as Q, b as ce, d as Z, u as me, c as ee } from "./useSocialProfile-D-SUgbn2.js";
import { c as h } from "./cn-B6yFEsav.js";
import { a as pe } from "./ToastProvider-aHBNxMTO.js";
const te = ie({ theme: "light", toggleTheme: () => {
} }), W = "wsg-theme";
function nt({ children: t }) {
  const [s, r] = x(() => {
    try {
      const i = localStorage.getItem(W);
      if (i === "dark" || i === "light") return i;
    } catch {
    }
    return "light";
  });
  U(() => {
    try {
      localStorage.setItem(W, s);
    } catch {
    }
    document.documentElement.setAttribute("data-theme", s);
  }, [s]);
  const a = _(() => {
    r((i) => i === "light" ? "dark" : "light");
  }, []);
  return /* @__PURE__ */ e(te.Provider, { value: { theme: s, toggleTheme: a }, children: t });
}
function xe() {
  return le(te);
}
function O(t, s) {
  return {
    id: t.userId,
    displayName: t.displayName,
    bio: "",
    avatarUrl: t.avatarUrl ?? null,
    visibility: t.visibility,
    followState: s
  };
}
function ue(t) {
  return {
    id: t.userId,
    displayName: t.displayName,
    bio: t.bio ?? "",
    avatarUrl: t.avatarUrl ?? null,
    visibility: t.visibility
  };
}
function re({ user: t, size: s }) {
  const r = t.displayName.slice(0, 2).toUpperCase();
  return t.avatarUrl ? /* @__PURE__ */ e(
    "div",
    {
      className: h(
        "rounded-full bg-border flex items-center justify-center font-semibold text-text-primary shrink-0 overflow-hidden",
        s === 48 ? "w-12 h-12 text-base" : "w-8 h-8 text-xs"
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
        s === 48 ? "w-12 h-12 text-base" : "w-8 h-8 text-xs"
      ),
      "aria-label": `Avatar placeholder for ${t.displayName}`,
      children: r
    }
  );
}
function fe({ targetUser: t, followState: s, compact: r = !1, onFollowChange: a }) {
  const [i, o] = x(!1), d = () => {
    a(t.id, "pending");
  }, c = () => o(!0), m = () => o(!1), f = () => {
    o(!1), a(t.id, "not-following");
  };
  return s === "not-following" ? /* @__PURE__ */ e(
    "button",
    {
      className: h("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border-none font-[system-ui,-apple-system,sans-serif] bg-primary text-white font-semibold", r ? "h-7" : "h-9"),
      onClick: d,
      "aria-label": `Follow ${t.displayName}`,
      children: "Follow"
    }
  ) : s === "pending" ? /* @__PURE__ */ e(
    "button",
    {
      className: h("rounded-lg text-sm min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface-hover text-text-secondary font-normal cursor-default", r ? "h-7" : "h-9"),
      disabled: !0,
      "aria-label": `Follow ${t.displayName}`,
      children: "Following…"
    }
  ) : /* @__PURE__ */ n("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ e(
      "button",
      {
        className: h("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface text-text-primary font-normal", r ? "h-7" : "h-9"),
        onClick: c,
        "aria-label": `Unfollow ${t.displayName}`,
        children: "Following"
      }
    ),
    i && /* @__PURE__ */ n("div", { role: "group", "aria-label": "Confirm unfollow", className: "flex gap-2 items-center", children: [
      /* @__PURE__ */ n("span", { className: "text-sm text-text-primary mr-1", children: [
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
function be({ user: t, isOwnProfile: s, onSave: r }) {
  const [a, i] = x(!1), [o, d] = x(t.displayName), [c, m] = x(t.bio), [f, l] = x(t.avatarUrl ?? ""), [u, y] = x(t.visibility), [C, b] = x(!1);
  U(() => {
    d(t.displayName), m(t.bio), l(t.avatarUrl ?? ""), y(t.visibility);
  }, [t]);
  const g = async () => {
    b(!0);
    try {
      await r({ displayName: o, bio: c, avatarUrl: f || void 0, visibility: u }), i(!1);
    } finally {
      b(!1);
    }
  };
  return a ? /* @__PURE__ */ n("div", { children: [
    /* @__PURE__ */ n("div", { className: "mb-3", children: [
      /* @__PURE__ */ e("label", { className: "text-sm text-text-primary block mb-1", children: "Display name" }),
      /* @__PURE__ */ e(
        "input",
        {
          value: o,
          onChange: (v) => d(v.target.value.slice(0, 50)),
          placeholder: "Your name",
          maxLength: 50,
          className: "w-full box-border border border-border-field rounded-md px-2.5 py-1.5 text-sm font-[system-ui,-apple-system,sans-serif] bg-surface-inset text-text-primary"
        }
      )
    ] }),
    /* @__PURE__ */ n("div", { className: "mb-3", children: [
      /* @__PURE__ */ e("label", { className: "text-sm text-text-primary block mb-1", children: "Bio" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          value: c,
          onChange: (v) => m(v.target.value.slice(0, 160)),
          placeholder: "Tell people a bit about yourself (max 160 characters)",
          maxLength: 160,
          rows: 3,
          className: "w-full box-border border border-border-field rounded-md px-2.5 py-1.5 text-sm font-[system-ui,-apple-system,sans-serif] bg-surface-inset text-text-primary resize-y"
        }
      )
    ] }),
    /* @__PURE__ */ n("div", { className: "mb-4", children: [
      /* @__PURE__ */ e("label", { className: "text-sm text-text-primary block mb-1", children: "Avatar URL" }),
      /* @__PURE__ */ e(
        "input",
        {
          value: f,
          onChange: (v) => l(v.target.value),
          placeholder: "https://example.com/avatar.png",
          className: "w-full box-border border border-border-field rounded-md px-2.5 py-1.5 text-sm font-[system-ui,-apple-system,sans-serif] bg-surface-inset text-text-primary"
        }
      )
    ] }),
    /* @__PURE__ */ e("div", { className: "mb-4", children: /* @__PURE__ */ e("div", { role: "radiogroup", "aria-label": "Profile visibility", className: "flex gap-2", children: ["public", "private"].map((v) => /* @__PURE__ */ e(
      "button",
      {
        role: "radio",
        "aria-checked": u === v,
        onClick: () => y(v),
        className: h(
          "px-4 py-1 rounded-full text-sm cursor-pointer border border-border font-[system-ui,-apple-system,sans-serif]",
          u === v ? "bg-primary text-white" : "bg-surface text-text-primary"
        ),
        children: v.charAt(0).toUpperCase() + v.slice(1)
      },
      v
    )) }) }),
    /* @__PURE__ */ n("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => {
            g();
          },
          disabled: C,
          className: h("flex-1 h-9 bg-primary text-white border-none rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", C ? "cursor-default" : "cursor-pointer"),
          children: C ? "Saving…" : "Save Changes"
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
  ] }) : /* @__PURE__ */ n("div", { children: [
    /* @__PURE__ */ n("div", { className: "flex items-start gap-3 mb-3", children: [
      /* @__PURE__ */ e(re, { user: t, size: 48 }),
      /* @__PURE__ */ n("div", { className: "flex-1", children: [
        /* @__PURE__ */ n("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ e("span", { className: "text-xl font-semibold text-text-primary", children: t.displayName }),
          /* @__PURE__ */ e("span", { className: h(
            "text-xs px-2 py-0.5 rounded",
            t.visibility === "public" ? "bg-success-bg text-success" : "bg-surface-hover text-text-secondary"
          ), children: t.visibility === "public" ? "Public" : "Private" })
        ] }),
        /* @__PURE__ */ e("p", { className: "text-base text-text-primary m-0 overflow-hidden line-clamp-3", children: t.bio })
      ] })
    ] }),
    /* @__PURE__ */ n("div", { className: "flex gap-4 text-sm text-text-secondary mb-3", children: [
      /* @__PURE__ */ n("span", { children: [
        /* @__PURE__ */ e("strong", { className: "text-text-primary", children: t.followersCount ?? 0 }),
        " Followers"
      ] }),
      /* @__PURE__ */ n("span", { children: [
        /* @__PURE__ */ e("strong", { className: "text-text-primary", children: t.followingCount ?? 0 }),
        " Following"
      ] }),
      /* @__PURE__ */ n("span", { children: [
        /* @__PURE__ */ e("strong", { className: "text-text-primary", children: t.friendsCount ?? 0 }),
        " Friends"
      ] })
    ] }),
    s && /* @__PURE__ */ e(
      "button",
      {
        onClick: () => i(!0),
        className: "text-sm text-primary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
        children: "Edit profile"
      }
    )
  ] });
}
function he({ followers: t, following: s, friends: r, followStates: a, onFollowChange: i }) {
  const [o, d] = x("followers"), c = [
    { key: "followers", label: `Followers (${t.length})`, users: t },
    { key: "following", label: `Following (${s.length})`, users: s },
    { key: "friends", label: `Friends (${r.length})`, users: r }
  ], m = {
    followers: { heading: "No followers yet", body: "When someone follows you, they'll appear here." },
    following: { heading: "Not following anyone yet", body: "Find people to follow from the profile list above." },
    friends: { heading: "No mutual friends yet", body: "Mutual follows become friends. Start by following someone." }
  }, f = c.find((l) => l.key === o)?.users ?? [];
  return /* @__PURE__ */ n("div", { className: "mt-4", children: [
    /* @__PURE__ */ e("div", { role: "tablist", className: "flex border-b border-border mb-3", children: c.map((l) => /* @__PURE__ */ e(
      "button",
      {
        role: "tab",
        "aria-selected": o === l.key,
        onClick: () => d(l.key),
        className: h(
          "px-4 py-2 text-sm font-normal bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif] -mb-px",
          o === l.key ? "text-text-primary border-b-2 border-b-primary" : "text-text-secondary border-b-2 border-b-transparent"
        ),
        children: l.label
      },
      l.key
    )) }),
    /* @__PURE__ */ e(
      "div",
      {
        role: "tabpanel",
        "aria-label": o,
        className: "min-h-[120px]",
        children: f.length === 0 ? /* @__PURE__ */ n("div", { className: "py-6 text-center", children: [
          /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary mb-1", children: m[o].heading }),
          /* @__PURE__ */ e("div", { className: "text-sm text-text-tertiary", children: m[o].body })
        ] }) : /* @__PURE__ */ e("div", { children: f.map((l) => /* @__PURE__ */ n(
          "div",
          {
            className: "flex items-center gap-2 h-14 border-b border-surface-hover",
            children: [
              /* @__PURE__ */ e(re, { user: l, size: 32 }),
              /* @__PURE__ */ n("div", { className: "flex-1", children: [
                /* @__PURE__ */ e("div", { className: "text-base text-text-primary", children: l.displayName }),
                /* @__PURE__ */ e("div", { className: "text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap max-w-[240px]", children: l.visibility === "private" ? /* @__PURE__ */ e("em", { className: "text-text-tertiary", children: "This profile is private." }) : l.bio })
              ] }),
              /* @__PURE__ */ e(
                fe,
                {
                  targetUser: l,
                  followState: a[l.id] ?? "not-following",
                  compact: !0,
                  onFollowChange: i
                }
              )
            ]
          },
          l.id
        )) })
      }
    )
  ] });
}
function at({ idToken: t, onMessage: s }) {
  const { profile: r, loading: a, updateProfile: i } = de({ idToken: t }), { followers: o, following: d, friends: c, follow: m, unfollow: f } = Q({ idToken: t }), l = new Set(d.map((N) => N.userId)), u = {};
  [...o, ...d, ...c].forEach((N) => {
    u[N.userId] = l.has(N.userId) ? "following" : "not-following";
  });
  const [y, C] = x(null), b = async (N, D) => {
    C(null);
    try {
      D === "following" || D === "pending" ? await m(N) : await f(N);
    } catch (p) {
      C(p instanceof Error ? p.message : "Follow action failed");
    }
  }, g = o.map((N) => O(N, u[N.userId] ?? "not-following")), v = d.map((N) => O(N, "following")), S = c.map((N) => O(N, "following")), I = r ? {
    ...ue(r),
    followersCount: o.length,
    followingCount: d.length,
    friendsCount: c.length
  } : null;
  return /* @__PURE__ */ n("div", { className: "bg-surface border border-border rounded-lg p-5", children: [
    /* @__PURE__ */ e("h2", { className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3", children: "Social Profile" }),
    a && !I ? /* @__PURE__ */ e("div", { className: "py-10 text-center text-text-tertiary text-sm", children: "Loading profile…" }) : I ? /* @__PURE__ */ n(X, { children: [
      /* @__PURE__ */ e(
        be,
        {
          user: I,
          isOwnProfile: !0,
          onSave: i
        }
      ),
      /* @__PURE__ */ e(
        he,
        {
          followers: g,
          following: v,
          friends: S,
          followStates: u,
          onFollowChange: b
        }
      )
    ] }) : null,
    y && /* @__PURE__ */ e("div", { className: "text-danger text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]", children: y })
  ] });
}
function q({ onCreate: t, onDiscard: s, loading: r }) {
  const [a, i] = x(""), [o, d] = x(null), c = async (m) => {
    if (m.preventDefault(), !!a.trim()) {
      d(null);
      try {
        await t(a.trim()), i("");
      } catch (f) {
        d(f instanceof Error ? f.message : "Failed to create room");
      }
    }
  };
  return /* @__PURE__ */ n("form", { onSubmit: (m) => {
    c(m);
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
    /* @__PURE__ */ n("div", { className: "flex gap-1.5", children: [
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
          onClick: s,
          className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
          children: "Cancel"
        }
      )
    ] }),
    o && /* @__PURE__ */ e("div", { className: "text-danger text-[11px] mt-1", children: o })
  ] });
}
function V({ onCreateDM: t, loading: s, friends: r }) {
  const [a, i] = x(""), [o, d] = x(!1), [c, m] = x(null), f = async (l) => {
    if (l.preventDefault(), !!a.trim()) {
      m(null);
      try {
        await t(a.trim()), i(""), d(!1);
      } catch (u) {
        m(u instanceof Error ? u.message : "Failed to open DM");
      }
    }
  };
  return o ? /* @__PURE__ */ n("form", { onSubmit: (l) => {
    f(l);
  }, className: "my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border", children: [
    /* @__PURE__ */ n(
      "select",
      {
        value: a,
        onChange: (l) => i(l.target.value),
        disabled: r.length === 0,
        className: "w-full box-border border border-border-field rounded-[5px] px-2 py-1 text-[13px] font-[system-ui,-apple-system,sans-serif] bg-surface text-text-primary mb-1.5",
        children: [
          /* @__PURE__ */ e("option", { value: "", children: r.length === 0 ? "No mutual friends yet" : "Select a friend…" }),
          r.map((l) => /* @__PURE__ */ e("option", { value: l.userId, children: l.displayName }, l.userId))
        ]
      }
    ),
    /* @__PURE__ */ n("div", { className: "flex gap-1.5", children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "submit",
          disabled: !a.trim() || s || r.length === 0,
          className: h(
            "flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]",
            !a.trim() || s ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"
          ),
          children: "Open DM"
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => d(!1),
          className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
          children: "Cancel"
        }
      )
    ] }),
    c && /* @__PURE__ */ e("div", { className: "text-danger text-[11px] mt-1", children: c })
  ] }) : /* @__PURE__ */ e(
    "button",
    {
      onClick: () => d(!0),
      className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded mb-1",
      children: "+ New DM"
    }
  );
}
function ye({ room: t, isActive: s, onClick: r }) {
  const a = (i) => i === "standalone" ? "bg-[#ede9fe] text-primary text-xs px-2 py-0.5 rounded" : i === "group" ? "bg-info-bg text-info text-xs px-2 py-0.5 rounded" : "bg-success-bg text-success text-xs px-2 py-0.5 rounded";
  return /* @__PURE__ */ n(
    "div",
    {
      onClick: r,
      className: h(
        "flex items-center h-14 border-b border-surface-hover cursor-pointer pr-2",
        s ? "bg-surface-hover border-l-[3px] border-l-primary pl-[13px]" : "bg-transparent border-l-[3px] border-l-transparent"
      ),
      children: [
        /* @__PURE__ */ e("div", { className: h("flex-1 text-base text-text-primary", s ? "font-semibold" : "font-normal"), children: t.name }),
        /* @__PURE__ */ e("span", { className: a(t.type), children: t.type })
      ]
    }
  );
}
function ge({ room: t, isActive: s, onClick: r }) {
  return /* @__PURE__ */ n(
    "button",
    {
      onClick: r,
      className: h(
        "flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]",
        s ? "bg-[#ede9fe] text-[#4c1d95] font-semibold" : "bg-transparent text-text-primary font-normal"
      ),
      children: [
        /* @__PURE__ */ e("span", { className: h("text-[13px] shrink-0", s ? "text-primary" : "text-text-tertiary"), children: t.type === "dm" ? "●" : "#" }),
        /* @__PURE__ */ e("span", { className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1", children: t.name })
      ]
    }
  );
}
function z({ message: t, onRetry: s, compact: r }) {
  return /* @__PURE__ */ n(
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
        s && /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: s,
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
function Ne({ idToken: t, rooms: s, createRoom: r, createDM: a, loading: i, error: o, onRetry: d, onRoomSelect: c, activeRoomId: m, compact: f }) {
  const { friends: l } = Q({ idToken: t }), [u, y] = x(!1), C = async (b) => {
    await r(b), y(!1);
  };
  return f ? /* @__PURE__ */ n("div", { className: "px-2 pt-2", children: [
    /* @__PURE__ */ e(
      "button",
      {
        onClick: () => y((b) => !b),
        className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
        children: "+ New Room"
      }
    ),
    u && /* @__PURE__ */ e(
      q,
      {
        onCreate: C,
        onDiscard: () => y(!1),
        loading: i
      }
    ),
    /* @__PURE__ */ e(V, { onCreateDM: a, loading: i, friends: l }),
    /* @__PURE__ */ e("div", { children: i && s.length === 0 ? /* @__PURE__ */ e("div", { className: "p-2 text-text-tertiary text-xs text-center", children: "Loading…" }) : o && s.length === 0 ? /* @__PURE__ */ e(z, { message: o, onRetry: d, compact: !0 }) : s.length === 0 ? /* @__PURE__ */ e("div", { className: "px-2 py-3 text-text-tertiary text-xs", children: "No rooms yet" }) : s.map((b) => /* @__PURE__ */ e(
      ge,
      {
        room: b,
        isActive: b.roomId === m,
        onClick: () => c(b)
      },
      b.roomId
    )) })
  ] }) : /* @__PURE__ */ n("div", { className: "bg-surface border border-border rounded-lg p-5", children: [
    /* @__PURE__ */ e("h2", { className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3", children: "Rooms" }),
    /* @__PURE__ */ e(
      "button",
      {
        onClick: () => y((b) => !b),
        className: "w-full h-9 mb-2 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]",
        children: "Create Room"
      }
    ),
    u && /* @__PURE__ */ e(
      q,
      {
        onCreate: C,
        onDiscard: () => y(!1),
        loading: i
      }
    ),
    /* @__PURE__ */ e(V, { onCreateDM: a, loading: i, friends: l }),
    /* @__PURE__ */ e("div", { className: "max-h-80 overflow-y-auto", children: i && s.length === 0 ? /* @__PURE__ */ n("div", { className: "flex items-center gap-2 p-4 justify-center text-text-secondary", children: [
      /* @__PURE__ */ e("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }),
      "Loading..."
    ] }) : o && s.length === 0 ? /* @__PURE__ */ e(z, { message: o, onRetry: d }) : s.length === 0 ? /* @__PURE__ */ n("div", { className: "py-6 text-center", children: [
      /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary mb-1", children: "No rooms yet" }),
      /* @__PURE__ */ e("div", { className: "text-sm text-text-tertiary", children: "Create a room or ask to be added." })
    ] }) : s.map((b) => /* @__PURE__ */ e(
      ye,
      {
        room: b,
        isActive: b.roomId === m,
        onClick: () => c(b)
      },
      b.roomId
    )) })
  ] });
}
function ve({ group: t, isSelected: s, onClick: r }) {
  return /* @__PURE__ */ n(
    "button",
    {
      onClick: r,
      className: h(
        "flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]",
        s ? "bg-[#ede9fe] text-[#4c1d95] font-semibold" : "bg-transparent text-text-primary font-normal"
      ),
      children: [
        /* @__PURE__ */ e("span", { className: h("text-xs shrink-0", s ? "text-primary" : "text-text-tertiary"), children: t.visibility === "private" ? "🔒" : "👥" }),
        /* @__PURE__ */ e("span", { className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1", children: t.name })
      ]
    }
  );
}
function we({ onCreate: t, onDiscard: s, loading: r }) {
  const [a, i] = x(""), [o, d] = x(null), c = async (m) => {
    if (m.preventDefault(), !!a.trim()) {
      d(null);
      try {
        await t(a.trim()), i("");
      } catch (f) {
        d(f instanceof Error ? f.message : "Failed to create group");
      }
    }
  };
  return /* @__PURE__ */ n("form", { onSubmit: (m) => {
    c(m);
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
    /* @__PURE__ */ n("div", { className: "flex gap-1.5", children: [
      /* @__PURE__ */ e("button", { type: "submit", disabled: !a.trim() || r, className: h(
        "flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]",
        !a.trim() || r ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"
      ), children: r ? "Creating…" : "Create" }),
      /* @__PURE__ */ e("button", { type: "button", onClick: s, className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]", children: "Cancel" })
    ] }),
    o && /* @__PURE__ */ e("div", { className: "text-danger text-[11px] mt-1", children: o })
  ] });
}
function Ce({ group: t, members: s, rooms: r, groupId: a, currentUserId: i, createGroupRoom: o, onRoomSelect: d, inviteUser: c, loading: m }) {
  const [f, l] = x(!1), [u, y] = x(""), [C, b] = x(!1), [g, v] = x(""), S = t.ownerId === i, I = r.filter((p) => p.groupId === a), N = async (p) => {
    p.preventDefault(), u.trim() && (await c(a, u.trim()), y(""), l(!1));
  }, D = async (p) => {
    p.preventDefault(), g.trim() && (await o(a, g.trim()), v(""), b(!1));
  };
  return /* @__PURE__ */ n("div", { className: "px-2 pb-2 pt-1 border-t border-border mt-1", children: [
    /* @__PURE__ */ n("div", { className: "flex items-center justify-between mb-1", children: [
      /* @__PURE__ */ n("span", { className: "text-[11px] text-text-secondary font-semibold uppercase tracking-wide", children: [
        "Members (",
        s.length,
        ")"
      ] }),
      S && /* @__PURE__ */ e("button", { onClick: () => l((p) => !p), className: "text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]", children: "+ Invite" })
    ] }),
    f && /* @__PURE__ */ n("form", { onSubmit: (p) => {
      N(p);
    }, className: "flex gap-1 mb-1.5", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: u,
          onChange: (p) => y(p.target.value),
          placeholder: "User ID",
          className: "flex-1 border border-border-field rounded px-1.5 py-0.5 text-xs font-[inherit] bg-surface text-text-primary"
        }
      ),
      /* @__PURE__ */ e("button", { type: "submit", disabled: !u.trim(), className: h(
        "h-6 px-2 border-none rounded text-[11px] font-[inherit]",
        u.trim() ? "bg-primary text-white cursor-pointer" : "bg-border text-text-tertiary cursor-default"
      ), children: "Invite" })
    ] }),
    /* @__PURE__ */ n("div", { className: "flex flex-wrap gap-1 mb-2", children: [
      s.slice(0, 8).map((p) => /* @__PURE__ */ e("div", { title: p.displayName ?? p.userId, className: "w-6 h-6 rounded-full bg-border flex items-center justify-center text-[10px] font-semibold text-text-primary", children: (p.displayName ?? p.userId).slice(0, 2).toUpperCase() }, p.userId)),
      s.length > 8 && /* @__PURE__ */ n("span", { className: "text-[11px] text-text-tertiary self-center", children: [
        "+",
        s.length - 8
      ] })
    ] }),
    /* @__PURE__ */ n("div", { className: "flex items-center justify-between mb-1", children: [
      /* @__PURE__ */ n("span", { className: "text-[11px] text-text-secondary font-semibold uppercase tracking-wide", children: [
        "Rooms (",
        I.length,
        ")"
      ] }),
      S && /* @__PURE__ */ e("button", { onClick: () => b((p) => !p), className: "text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]", children: "+ Room" })
    ] }),
    C && /* @__PURE__ */ n("form", { onSubmit: (p) => {
      D(p);
    }, className: "flex gap-1 mb-1.5", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: g,
          onChange: (p) => v(p.target.value.slice(0, 50)),
          placeholder: "Room name",
          className: "flex-1 border border-border-field rounded px-1.5 py-0.5 text-xs font-[inherit] bg-surface text-text-primary"
        }
      ),
      /* @__PURE__ */ e("button", { type: "submit", disabled: !g.trim() || m, className: h(
        "h-6 px-2 border-none rounded text-[11px] font-[inherit]",
        !g.trim() || m ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"
      ), children: "Create" })
    ] }),
    I.map((p) => /* @__PURE__ */ n(
      "button",
      {
        onClick: () => d?.(p),
        className: "flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1 cursor-pointer bg-transparent text-text-primary text-[13px] text-left font-[inherit]",
        children: [
          /* @__PURE__ */ e("span", { className: "text-text-tertiary text-xs", children: "#" }),
          /* @__PURE__ */ e("span", { className: "overflow-hidden text-ellipsis whitespace-nowrap", children: p.name })
        ]
      },
      p.roomId
    ))
  ] });
}
function Ie({ onCreate: t, onDiscard: s, loading: r }) {
  const [a, i] = x(""), [o, d] = x("public"), [c, m] = x(null), f = async (l) => {
    if (l.preventDefault(), !!a.trim()) {
      m(null);
      try {
        await t(a.trim(), void 0, o);
      } catch (u) {
        m(u instanceof Error ? u.message : "Failed to create group");
      }
    }
  };
  return /* @__PURE__ */ n("form", { onSubmit: (l) => {
    f(l);
  }, className: "mb-3 p-3 bg-surface-panel rounded-lg border border-border", children: [
    /* @__PURE__ */ n("div", { className: "mb-3", children: [
      /* @__PURE__ */ e("label", { className: "text-sm text-text-primary block mb-1", children: "Group name" }),
      /* @__PURE__ */ e("input", { value: a, onChange: (l) => i(l.target.value.slice(0, 50)), placeholder: "Group name", maxLength: 50, required: !0, className: "w-full box-border border border-border-field rounded-md px-2.5 py-1.5 text-sm font-[system-ui,-apple-system,sans-serif] bg-surface-inset text-text-primary" })
    ] }),
    /* @__PURE__ */ n("div", { className: "flex items-center gap-2.5 mb-3.5", children: [
      /* @__PURE__ */ e("span", { className: "text-[13px] text-text-primary min-w-[42px]", children: o === "public" ? "Public" : "Private" }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": o === "private",
          onClick: () => d((l) => l === "public" ? "private" : "public"),
          className: h(
            "relative w-11 h-6 rounded-xl border-none cursor-pointer p-0 shrink-0 transition-colors duration-200",
            o === "private" ? "bg-primary" : "bg-state-idle"
          ),
          children: /* @__PURE__ */ e("span", { className: h("absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-[left] duration-200", o === "private" ? "left-[23px]" : "left-[3px]") })
        }
      ),
      /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary", children: o === "public" ? "Visible to everyone" : "Invite only" })
    ] }),
    /* @__PURE__ */ n("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ e("button", { type: "submit", disabled: !a.trim() || r, className: h(
        "flex-1 h-9 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]",
        !a.trim() || r ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"
      ), children: r ? "Creating…" : "Create Group" }),
      /* @__PURE__ */ e("button", { type: "button", onClick: s, className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]", children: "Cancel" })
    ] }),
    c && /* @__PURE__ */ e("div", { className: "text-danger text-[13px] mt-1.5", children: c })
  ] });
}
function ke({ group: t, currentUserId: s, isSelected: r, onSelect: a, onDelete: i }) {
  const [o, d] = x(null), c = t.ownerId === s;
  return /* @__PURE__ */ n("div", { className: "flex items-center h-14 border-b border-surface-hover cursor-pointer", onClick: () => a(t.groupId), children: [
    /* @__PURE__ */ n("div", { className: "flex-1 min-w-0 pr-2", children: [
      /* @__PURE__ */ e("div", { className: h("text-base text-text-primary", r ? "font-semibold" : "font-normal"), children: t.name }),
      t.description && /* @__PURE__ */ e("div", { className: "text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap", children: t.description })
    ] }),
    /* @__PURE__ */ e("span", { className: h(
      "text-xs px-2 py-0.5 rounded shrink-0 mr-2",
      t.visibility === "public" ? "bg-success-bg text-success" : "bg-surface-hover text-text-secondary"
    ), children: t.visibility }),
    c && /* @__PURE__ */ e("div", { className: "shrink-0", onClick: (m) => m.stopPropagation(), children: o === t.groupId ? /* @__PURE__ */ n("div", { role: "group", "aria-label": "Confirm delete group", className: "flex items-center gap-1", children: [
      /* @__PURE__ */ e("button", { onClick: () => d(null), className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]", children: "Cancel" }),
      /* @__PURE__ */ e("button", { onClick: () => {
        i(t.groupId), d(null);
      }, className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]", children: "Delete" })
    ] }) : /* @__PURE__ */ e("button", { onClick: () => d(t.groupId), className: "text-xs text-danger bg-transparent border-none cursor-pointer px-2 py-1 font-[system-ui,-apple-system,sans-serif]", "aria-label": `Delete group ${t.name}`, children: "Delete" }) })
  ] });
}
function Se({ groupId: t, onInvite: s }) {
  const [r, a] = x("");
  return /* @__PURE__ */ n("form", { onSubmit: (o) => {
    o.preventDefault(), r.trim() && (s(t, r.trim()), a(""));
  }, className: "flex gap-2 mt-2", children: [
    /* @__PURE__ */ e("input", { value: r, onChange: (o) => a(o.target.value), placeholder: "User ID to invite", className: "flex-1 border border-border-field rounded-md px-2.5 py-1.5 text-sm font-[system-ui,-apple-system,sans-serif] bg-surface-inset text-text-primary" }),
    /* @__PURE__ */ e("button", { type: "submit", disabled: !r.trim(), className: h(
      "h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]",
      r.trim() ? "bg-primary text-white border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"
    ), children: "Invite" })
  ] });
}
function De({ members: t }) {
  const s = (r) => r === "owner" ? "bg-success-bg text-success text-xs px-2 py-0.5 rounded" : r === "admin" ? "bg-info-bg text-info text-xs px-2 py-0.5 rounded" : "bg-surface-hover text-text-secondary text-xs px-2 py-0.5 rounded";
  return /* @__PURE__ */ e("div", { className: "max-h-[200px] overflow-y-auto mt-2 border-t border-border", children: t.map((r) => /* @__PURE__ */ n("div", { className: "flex items-center gap-2 h-12 border-b border-surface-hover", children: [
    /* @__PURE__ */ e("div", { className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0", children: (r.displayName ?? r.userId).slice(0, 2).toUpperCase() }),
    /* @__PURE__ */ e("div", { className: "flex-1 text-base text-text-primary", children: r.displayName ?? r.userId }),
    /* @__PURE__ */ e("span", { className: s(r.role), children: r.role })
  ] }, r.userId)) });
}
function Fe({ rooms: t, groupId: s, selectedGroupRole: r, createGroupRoom: a, onRoomSelect: i, loading: o }) {
  const [d, c] = x(!1), [m, f] = x(""), l = t.filter((y) => y.groupId === s);
  return /* @__PURE__ */ n("div", { className: "mt-3", children: [
    /* @__PURE__ */ e("h3", { className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-2", children: "GROUP ROOMS" }),
    (r === "owner" || r === "admin") && (d ? /* @__PURE__ */ e("form", { onSubmit: async (y) => {
      y.preventDefault(), m.trim() && (await a(s, m.trim()), f(""), c(!1));
    }, className: "mb-2 p-3 bg-surface-panel rounded-lg border border-border", children: /* @__PURE__ */ n("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ e("input", { value: m, onChange: (y) => f(y.target.value.slice(0, 50)), placeholder: "Room name", maxLength: 50, required: !0, className: "flex-1 border border-border-field rounded-md px-2.5 py-1.5 text-sm font-[system-ui,-apple-system,sans-serif] bg-surface-inset text-text-primary" }),
      /* @__PURE__ */ e("button", { type: "submit", disabled: !m.trim() || o, className: h(
        "h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]",
        !m.trim() || o ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"
      ), children: o ? "Creating…" : "Create Room" }),
      /* @__PURE__ */ e("button", { type: "button", onClick: () => c(!1), className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]", children: "Cancel" })
    ] }) }) : /* @__PURE__ */ e("button", { onClick: () => c(!0), className: "w-full h-9 mb-2 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]", children: "Create Room" })),
    l.length === 0 ? /* @__PURE__ */ e("div", { className: "text-sm text-text-tertiary py-2", children: "No rooms in this group yet." }) : l.map((y) => /* @__PURE__ */ n("div", { onClick: () => i?.(y), className: "flex items-center h-12 border-b border-surface-hover cursor-pointer pr-2", children: [
      /* @__PURE__ */ e("div", { className: "flex-1 text-base text-text-primary", children: y.name }),
      /* @__PURE__ */ e("span", { className: "bg-info-bg text-info text-xs px-2 py-0.5 rounded", children: "group" })
    ] }, y.roomId))
  ] });
}
function Re({ idToken: t, rooms: s, createGroupRoom: r, onRoomSelect: a, roomsLoading: i, compact: o }) {
  const {
    groups: d,
    createGroup: c,
    deleteGroup: m,
    inviteUser: f,
    loadMembers: l,
    members: u,
    loading: y
  } = ce({ idToken: t }), [C, b] = x(!1), [g, v] = x(null), S = t ? (() => {
    try {
      return JSON.parse(atob(t.split(".")[1])).sub;
    } catch {
      return null;
    }
  })() : null, I = async (k, F, $) => {
    await c(k, F, $), b(!1);
  }, N = (k) => {
    g === k ? v(null) : (v(k), l(k));
  };
  if (o) {
    const k = g ? d.find((F) => F.groupId === g) : null;
    return /* @__PURE__ */ n("div", { className: "px-2 pt-2", children: [
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => b((F) => !F),
          className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
          children: "+ New Group"
        }
      ),
      C && /* @__PURE__ */ e(
        we,
        {
          onCreate: I,
          onDiscard: () => b(!1),
          loading: y
        }
      ),
      /* @__PURE__ */ e("div", { children: y && d.length === 0 ? /* @__PURE__ */ e("div", { className: "p-2 text-text-tertiary text-xs text-center", children: "Loading…" }) : d.length === 0 ? /* @__PURE__ */ e("div", { className: "px-2 py-3 text-text-tertiary text-xs", children: "No groups yet" }) : d.map((F) => /* @__PURE__ */ e(
        ve,
        {
          group: F,
          isSelected: F.groupId === g,
          onClick: () => N(F.groupId)
        },
        F.groupId
      )) }),
      k && /* @__PURE__ */ e(
        Ce,
        {
          group: k,
          members: u,
          rooms: s,
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
  const D = g ? d.find((k) => k.groupId === g) : null, p = D && S && D.ownerId === S ? "owner" : "member";
  return /* @__PURE__ */ n("div", { className: "bg-surface border border-border rounded-lg p-5", children: [
    /* @__PURE__ */ e("h2", { className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3", children: "Groups" }),
    /* @__PURE__ */ e("div", { className: "max-h-80 overflow-y-auto mb-3", children: d.length === 0 ? /* @__PURE__ */ n("div", { className: "py-4 text-center", children: [
      /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary mb-1", children: "No groups yet" }),
      /* @__PURE__ */ e("div", { className: "text-sm text-text-tertiary", children: "Create a group or join a public one." })
    ] }) : d.map((k) => /* @__PURE__ */ e(ke, { group: k, currentUserId: S, isSelected: g === k.groupId, onSelect: N, onDelete: m }, k.groupId)) }),
    g && /* @__PURE__ */ n("div", { className: "mb-3", children: [
      /* @__PURE__ */ e(De, { members: u }),
      (p === "owner" || p === "admin") && /* @__PURE__ */ e(Se, { groupId: g, onInvite: f }),
      /* @__PURE__ */ e(Fe, { rooms: s, groupId: g, selectedGroupRole: p, createGroupRoom: r, onRoomSelect: a, loading: i })
    ] }),
    /* @__PURE__ */ e(
      "button",
      {
        onClick: () => b((k) => !k),
        className: h("w-full h-9 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]", C && "mb-2"),
        children: C ? "Cancel" : "Create Group"
      }
    ),
    C && /* @__PURE__ */ e(Ie, { onCreate: I, onDiscard: () => b(!1), loading: y })
  ] });
}
const H = [
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
function Ue(t) {
  let s = 0;
  for (let r = 0; r < t.length; r++) s = s * 31 + t.charCodeAt(r) >>> 0;
  return H[s % H.length];
}
function Pe(t) {
  const s = t.split(/[\s._@-]/);
  return s.length >= 2 ? (s[0][0] + s[1][0]).toUpperCase() : t.slice(0, 2).toUpperCase();
}
function Ee(t) {
  const s = Date.now() - new Date(t).getTime(), r = Math.floor(s / 1e3);
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
function Le({ post: t, isOwn: s, showSender: r }) {
  const a = Ue(t.authorId);
  return /* @__PURE__ */ n(
    "div",
    {
      className: h(
        "flex items-end gap-2",
        s ? "flex-row-reverse" : "flex-row",
        r ? "pt-2 px-4 pb-0.5" : "py-px px-4"
      ),
      children: [
        /* @__PURE__ */ e("div", { className: "w-8 shrink-0 self-end", children: !s && r && /* @__PURE__ */ e(
          "div",
          {
            className: "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white select-none",
            style: { background: a },
            children: Pe(t.authorId)
          }
        ) }),
        /* @__PURE__ */ n(
          "div",
          {
            className: h(
              "max-w-[68%] flex flex-col gap-0.5",
              s ? "items-end" : "items-start"
            ),
            children: [
              !s && r && /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold pl-1", style: { color: a }, children: t.authorId }),
              /* @__PURE__ */ e(
                "div",
                {
                  className: h(
                    "px-3.5 py-2 text-sm leading-relaxed break-words transition-opacity duration-200",
                    s ? "bg-primary text-white rounded-[18px_18px_4px_18px]" : "bg-surface-hover text-text-primary rounded-[4px_18px_18px_18px]",
                    t._fadeIn ? "opacity-0" : "opacity-100"
                  ),
                  children: t.content
                }
              ),
              r && /* @__PURE__ */ e("span", { className: "text-[10px] text-text-tertiary px-1", children: Ee(t.createdAt) })
            ]
          }
        )
      ]
    }
  );
}
function je({ idToken: t, roomId: s, roomName: r, onMessage: a }) {
  const { posts: i, createPost: o, loading: d, hasMore: c, loadMore: m, error: f } = Z({ idToken: t, roomId: s, onMessage: a }), [l, u] = x(""), [y, C] = x(!1), [b, g] = x(null), v = K(null), S = $e(t), I = [...i].reverse();
  U(() => {
    v.current?.scrollIntoView({ behavior: "smooth" });
  }, [i.length]);
  const N = async () => {
    if (!l.trim() || y) return;
    const p = l.trim();
    u(""), g(null), C(!0);
    try {
      await o(p);
    } catch (k) {
      g(k instanceof Error ? k.message : "Failed to send message"), u(p);
    } finally {
      C(!1);
    }
  }, D = (p) => {
    p.key === "Enter" && !p.shiftKey && (p.preventDefault(), N());
  };
  return /* @__PURE__ */ n("div", { className: "flex flex-col h-full bg-surface rounded-lg border border-border overflow-hidden", children: [
    /* @__PURE__ */ e("div", { className: "flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface shrink-0", children: /* @__PURE__ */ n("span", { className: "text-[15px] font-semibold text-text-primary", children: [
      "# ",
      r
    ] }) }),
    /* @__PURE__ */ n("div", { className: "flex-1 overflow-y-auto flex flex-col pb-1", children: [
      c && /* @__PURE__ */ e("div", { className: "text-center py-2", children: /* @__PURE__ */ e(
        "button",
        {
          onClick: () => {
            m();
          },
          disabled: d,
          className: h(
            "text-xs text-text-secondary bg-transparent border border-border rounded-full px-3.5 py-0.5 font-[inherit]",
            d ? "cursor-default" : "cursor-pointer"
          ),
          children: d ? "Loading…" : "Load earlier"
        }
      ) }),
      d && I.length === 0 ? /* @__PURE__ */ e("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px]", children: "Loading messages…" }) : I.length === 0 ? /* @__PURE__ */ n("div", { className: "flex-1 flex flex-col items-center justify-center text-text-tertiary gap-1.5", children: [
        /* @__PURE__ */ e("span", { className: "text-[28px]", children: "💬" }),
        /* @__PURE__ */ e("span", { className: "text-sm font-semibold text-text-primary", children: "No messages yet" }),
        /* @__PURE__ */ e("span", { className: "text-[13px]", children: "Be the first to say something!" })
      ] }) : I.map((p, k) => {
        const F = p.authorId === S, $ = I[k - 1], P = !$ || $.authorId !== p.authorId || new Date(p.createdAt).getTime() - new Date($.createdAt).getTime() > 300 * 1e3;
        return /* @__PURE__ */ e(Le, { post: p, isOwn: F, showSender: P }, p.postId);
      }),
      /* @__PURE__ */ e("div", { ref: v })
    ] }),
    (f || b) && /* @__PURE__ */ e("div", { className: "px-4 py-1.5 bg-danger-bg border-t border-danger-border text-xs text-danger", children: b ?? f }),
    /* @__PURE__ */ n("div", { className: "flex items-center gap-2 px-3 py-2.5 border-t border-border bg-surface shrink-0", children: [
      /* @__PURE__ */ e(
        "input",
        {
          value: l,
          onChange: (p) => u(p.target.value),
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
          disabled: !l.trim() || y,
          className: h(
            "w-[34px] h-[34px] rounded-full shrink-0 border-none flex items-center justify-center text-base",
            !l.trim() || y ? "bg-surface-hover text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"
          ),
          children: "↑"
        }
      )
    ] })
  ] });
}
function B({ title: t, count: s, unreadTotal: r, defaultOpen: a = !0, children: i }) {
  const [o, d] = x(a);
  return /* @__PURE__ */ n("div", { className: "mb-0.5", children: [
    /* @__PURE__ */ n(
      "button",
      {
        onClick: () => d((c) => !c),
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
          /* @__PURE__ */ e("span", { className: "text-[11px] text-[#6b7280]", children: s })
        ]
      }
    ),
    o && i
  ] });
}
function Y({ room: t, isActive: s, unread: r, onClick: a }) {
  return /* @__PURE__ */ n(
    "button",
    {
      onClick: a,
      className: h(
        "flex items-center gap-1.5 w-full border-none rounded-[5px] pt-1.5 pb-1.5 pr-2 pl-6 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]",
        s ? "bg-[rgba(100,108,255,0.15)] text-[#a5b4fc] font-semibold" : r > 0 ? "bg-transparent text-surface-hover font-semibold" : "bg-transparent text-text-tertiary font-normal"
      ),
      children: [
        /* @__PURE__ */ e("span", { className: h("text-[13px] shrink-0", s ? "text-[#a5b4fc]" : "text-[#6b7280]"), children: t.type === "dm" ? "●" : "#" }),
        /* @__PURE__ */ e("span", { className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1", children: t.name }),
        r > 0 && !s && /* @__PURE__ */ e("span", { className: "min-w-[18px] h-[18px] rounded-[9px] bg-danger text-white text-[10px] font-bold flex items-center justify-center px-1.5 shrink-0", children: r > 99 ? "99+" : r })
      ]
    }
  );
}
function ot({
  userId: t,
  displayName: s,
  idToken: r,
  rooms: a,
  createRoom: i,
  createDM: o,
  createGroupRoom: d,
  roomsLoading: c,
  roomsError: m,
  onRoomsRetry: f,
  handleRoomSelect: l,
  activeRoomId: u,
  onMessage: y
}) {
  const { theme: C } = xe(), b = C === "dark", [g, v] = x(!0), S = g ? 240 : 0, [I, N] = x({}), D = K(u);
  U(() => {
    D.current = u;
  }, [u]);
  const p = _((w) => {
    N((R) => {
      if (!R[w.roomId]) return R;
      const A = { ...R };
      return delete A[w.roomId], A;
    }), l(w);
  }, [l]);
  U(() => y((R) => {
    if (R.type === "social:post") {
      const G = (R.payload ?? R).roomId;
      G && G !== D.current && N((J) => ({ ...J, [G]: (J[G] ?? 0) + 1 }));
    }
  }), [y]);
  const [k, F] = x(!1), $ = s ? s.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) : t.slice(0, 2).toUpperCase(), P = a.find((w) => w.roomId === u) ?? null, L = a.filter((w) => w.type === "standalone" || w.type === "group"), M = a.filter((w) => w.type === "dm"), ne = L.reduce((w, R) => w + (I[R.roomId] ?? 0), 0), ae = M.reduce((w, R) => w + (I[R.roomId] ?? 0), 0), oe = b ? "#1e1f2e" : "#f8fafc", j = b ? "rgba(255,255,255,0.06)" : "#e2e8f0", T = b ? "#fff" : "#0f172a", E = b ? "#94a3b8" : "#64748b";
  return /* @__PURE__ */ n(
    "div",
    {
      className: "flex overflow-hidden rounded-lg transition-colors duration-200 h-[calc(100vh-120px)]",
      style: {
        background: b ? "#0f172a" : "#fff",
        border: `1px solid ${j}`
      },
      children: [
        /* @__PURE__ */ n(
          "div",
          {
            className: h("shrink-0 flex-col overflow-hidden transition-[width] duration-[180ms]", g ? "flex" : "hidden"),
            style: {
              width: S,
              borderRight: `1px solid ${j}`,
              background: oe
            },
            children: [
              /* @__PURE__ */ n(
                "div",
                {
                  className: "flex items-center gap-2 shrink-0 px-[14px] pt-[14px] pb-3",
                  style: { borderBottom: `1px solid ${j}` },
                  children: [
                    /* @__PURE__ */ e("div", { className: "w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-[11px] shrink-0 bg-[linear-gradient(135deg,#646cff,#9b59b6)]", children: $ }),
                    /* @__PURE__ */ n("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ e("div", { className: "text-[13px] font-bold overflow-hidden text-ellipsis whitespace-nowrap", style: { color: T }, children: s || t }),
                      /* @__PURE__ */ n("div", { className: "text-[11px] flex items-center gap-1", style: { color: E }, children: [
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
              /* @__PURE__ */ n("div", { className: "flex-1 overflow-y-auto pt-2", children: [
                /* @__PURE__ */ e(B, { title: "Channels", count: L.length, unreadTotal: ne, children: /* @__PURE__ */ n("div", { className: "px-1", children: [
                  c && L.length === 0 ? /* @__PURE__ */ e("div", { className: "px-6 py-2 text-xs", style: { color: E }, children: "Loading…" }) : L.length === 0 ? /* @__PURE__ */ e("div", { className: "px-6 py-2 text-xs", style: { color: E }, children: "No channels yet" }) : L.map((w) => /* @__PURE__ */ e(
                    Y,
                    {
                      room: w,
                      isActive: w.roomId === u,
                      unread: I[w.roomId] ?? 0,
                      onClick: () => p(w)
                    },
                    w.roomId
                  )),
                  /* @__PURE__ */ n(
                    "button",
                    {
                      onClick: () => F((w) => !w),
                      className: "flex items-center gap-1.5 w-full bg-transparent border-none cursor-pointer text-xs font-[inherit] rounded pt-[5px] pr-2 pb-[5px] pl-6",
                      style: { color: E },
                      children: [
                        /* @__PURE__ */ e("span", { className: "text-sm leading-none", children: "+" }),
                        " Add channel"
                      ]
                    }
                  ),
                  k && /* @__PURE__ */ e("div", { className: "px-2", children: /* @__PURE__ */ e(
                    Ne,
                    {
                      idToken: r,
                      rooms: [],
                      createRoom: i,
                      createDM: o,
                      loading: c,
                      error: m,
                      onRetry: f,
                      onRoomSelect: p,
                      activeRoomId: u,
                      compact: !0
                    }
                  ) })
                ] }) }),
                /* @__PURE__ */ e(B, { title: "Direct Messages", count: M.length, unreadTotal: ae, children: /* @__PURE__ */ e("div", { className: "px-1", children: M.length === 0 ? /* @__PURE__ */ e("div", { className: "px-6 py-2 text-xs", style: { color: E }, children: "No conversations yet" }) : M.map((w) => /* @__PURE__ */ e(
                  Y,
                  {
                    room: w,
                    isActive: w.roomId === u,
                    unread: I[w.roomId] ?? 0,
                    onClick: () => p(w)
                  },
                  w.roomId
                )) }) }),
                /* @__PURE__ */ e(B, { title: "Groups", count: 0, defaultOpen: !1, children: /* @__PURE__ */ e(
                  Re,
                  {
                    idToken: r,
                    rooms: a,
                    createGroupRoom: d,
                    onRoomSelect: p,
                    roomsLoading: c,
                    compact: !0
                  }
                ) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ n("div", { className: "flex-1 min-w-0 flex flex-col", children: [
          !g && /* @__PURE__ */ n(
            "div",
            {
              className: "flex items-center gap-2 px-3 py-1.5",
              style: { borderBottom: `1px solid ${j}` },
              children: [
                /* @__PURE__ */ e(
                  "button",
                  {
                    onClick: () => v(!0),
                    title: "Expand sidebar",
                    className: "bg-transparent rounded cursor-pointer text-sm px-2 py-0.5 font-[inherit]",
                    style: { border: `1px solid ${j}`, color: E },
                    children: "»"
                  }
                ),
                P && /* @__PURE__ */ n("span", { className: "text-[13px] font-semibold", style: { color: T }, children: [
                  P.type === "dm" ? "●" : "#",
                  " ",
                  P.name
                ] })
              ]
            }
          ),
          /* @__PURE__ */ e("div", { className: "flex-1 min-h-0", children: P ? /* @__PURE__ */ e(
            je,
            {
              idToken: r,
              roomId: P.roomId,
              roomName: P.name,
              onMessage: y
            },
            P.roomId
          ) : /* @__PURE__ */ n(
            "div",
            {
              className: "h-full flex flex-col items-center justify-center gap-2",
              style: { color: E },
              children: [
                /* @__PURE__ */ e("span", { className: "text-4xl", children: "💬" }),
                /* @__PURE__ */ e("span", { className: "text-[15px] font-semibold", style: { color: T }, children: "Select a room to start chatting" }),
                /* @__PURE__ */ e("span", { className: "text-[13px]", children: "Choose a channel or DM from the sidebar" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Me(t) {
  const s = Date.now() - new Date(t).getTime(), r = Math.floor(s / 1e3);
  return r < 60 ? "just now" : r < 3600 ? `${Math.floor(r / 60)}m ago` : t.slice(0, 10);
}
function Ge(t) {
  if (!t) return null;
  try {
    return JSON.parse(atob(t.split(".")[1])).sub;
  } catch {
    return null;
  }
}
function se({ onSubmit: t, placeholder: s = "Write a reply…", loading: r }) {
  const [a, i] = x("");
  return /* @__PURE__ */ n("form", { onSubmit: (d) => {
    d.preventDefault(), a.trim() && (t(a.trim()), i(""));
  }, className: "flex gap-2 mt-2", children: [
    /* @__PURE__ */ e(
      "input",
      {
        value: a,
        onChange: (d) => i(d.target.value),
        placeholder: s,
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
function Te({ comment: t, currentUserId: s, loading: r, onDelete: a, onReply: i }) {
  const [o, d] = x(!1), [c, m] = x(!1), [f, l] = x(t._fadeIn ? 0 : 1);
  U(() => {
    if (t._fadeIn) {
      const g = setTimeout(() => l(1), 10);
      return () => clearTimeout(g);
    }
  }, []);
  const u = t.authorId === s, y = !!t.parentCommentId, C = t.authorId.slice(0, 2).toUpperCase(), b = /* @__PURE__ */ e("div", { style: { opacity: f }, className: "transition-opacity duration-200 ease-[ease]", children: /* @__PURE__ */ n("div", { className: "flex items-start gap-2", children: [
    /* @__PURE__ */ e("div", { className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0", children: C }),
    /* @__PURE__ */ n("div", { className: "flex-1", children: [
      /* @__PURE__ */ n("div", { className: "flex items-center gap-2 mb-0.5", children: [
        /* @__PURE__ */ e("span", { className: "text-sm font-semibold text-text-primary", children: t.authorId }),
        /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary", children: Me(t.createdAt) })
      ] }),
      /* @__PURE__ */ e("div", { className: "text-sm text-text-primary mb-1", children: t.content }),
      /* @__PURE__ */ n("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => m((g) => !g),
            className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
            children: "Reply"
          }
        ),
        u && !o && /* @__PURE__ */ e(
          "button",
          {
            onClick: () => d(!0),
            className: "text-sm text-text-tertiary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
            "aria-label": "Delete comment",
            children: "Delete"
          }
        ),
        u && o && /* @__PURE__ */ n("div", { role: "group", "aria-label": "Confirm delete comment", className: "flex gap-1.5 items-center", children: [
          /* @__PURE__ */ e("span", { className: "text-xs text-text-primary", children: "Delete this comment?" }),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => d(!1),
              className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => {
                a(t.commentId), d(!1);
              },
              className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
              children: "Delete"
            }
          )
        ] })
      ] }),
      c && /* @__PURE__ */ e(
        se,
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
function Ae({ idToken: t, roomId: s, postId: r, onMessage: a }) {
  const { comments: i, createComment: o, deleteComment: d, loading: c } = me({ idToken: t, roomId: s, postId: r, onMessage: a }), m = Ge(t), f = async (l, u) => {
    await o(u, l);
  };
  return /* @__PURE__ */ n("div", { className: "pt-2 pl-2 border-t border-surface-hover", children: [
    c ? /* @__PURE__ */ e("div", { className: "text-sm text-text-tertiary py-2", children: "Loading comments…" }) : i.length === 0 ? /* @__PURE__ */ e("div", { className: "text-sm text-text-tertiary text-center py-4", children: "No comments yet" }) : i.map((l) => /* @__PURE__ */ e(
      Te,
      {
        comment: l,
        currentUserId: m,
        loading: c,
        onDelete: d,
        onReply: f
      },
      l.commentId
    )),
    /* @__PURE__ */ e(
      se,
      {
        onSubmit: (l) => o(l),
        placeholder: "Write a comment…",
        loading: c
      }
    )
  ] });
}
const Oe = ["❤️", "😂", "👍", "👎", "😮", "😢", "😡", "🎉", "🔥", "⚡", "💯", "🚀"];
function Be(t) {
  const s = Date.now() - new Date(t).getTime(), r = Math.floor(s / 1e3);
  return r < 60 ? "just now" : r < 3600 ? `${Math.floor(r / 60)}m ago` : t.slice(0, 10);
}
function _e(t) {
  if (!t) return null;
  try {
    return JSON.parse(atob(t.split(".")[1])).sub;
  } catch {
    return null;
  }
}
function Ke({ onCreate: t, loading: s }) {
  const [r, a] = x(""), [i, o] = x(null), d = async (c) => {
    if (c.preventDefault(), !!r.trim()) {
      o(null);
      try {
        await t(r.trim()), a("");
      } catch (m) {
        o(m instanceof Error ? m.message : "Failed to create post");
      }
    }
  };
  return /* @__PURE__ */ n("form", { onSubmit: (c) => {
    d(c);
  }, children: [
    /* @__PURE__ */ e(
      "textarea",
      {
        value: r,
        onChange: (c) => a(c.target.value),
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
        disabled: !r.trim() || s,
        className: h(
          "h-9 px-4 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]",
          !r.trim() || s ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"
        ),
        children: s ? "Posting…" : "Post"
      }
    ) }),
    i && /* @__PURE__ */ e("div", { className: "text-danger text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]", children: i })
  ] });
}
function Je({ idToken: t, roomId: s, postId: r, onMessage: a }) {
  const { isLiked: i, likeCount: o, toggle: d, whoLiked: c } = ee({ idToken: t, roomId: s, postId: r, onMessage: a });
  return /* @__PURE__ */ n(X, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        onClick: () => {
          d();
        },
        "aria-label": "Like post",
        className: "bg-transparent border-none cursor-pointer flex items-center gap-1 p-0 font-[system-ui,-apple-system,sans-serif]",
        children: [
          /* @__PURE__ */ e("span", { className: h("text-base", i ? "text-primary" : "text-text-tertiary"), children: "❤" }),
          /* @__PURE__ */ e("span", { className: h("text-sm", i ? "text-primary" : "text-text-tertiary"), children: o })
        ]
      }
    ),
    c.length > 0 && /* @__PURE__ */ n("span", { className: "text-xs text-text-secondary ml-1", children: [
      "Liked by: ",
      c.slice(0, 3).map((m) => m.displayName).join(", "),
      c.length > 3 ? ` and ${c.length - 3} more` : ""
    ] })
  ] });
}
function We({ idToken: t, roomId: s, postId: r, onMessage: a }) {
  const { reactWithEmoji: i } = ee({ idToken: t, roomId: s, postId: r, onMessage: a });
  return /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-0", children: Oe.map((o) => /* @__PURE__ */ e(
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
function qe({ post: t, idToken: s, roomId: r, currentUserId: a, onMessage: i, onEdit: o, onDelete: d }) {
  const [c, m] = x(t._fadeIn ? 0 : 1), [f, l] = x(!1), [u, y] = x(!1), [C, b] = x(!1), [g, v] = x(t.content);
  U(() => {
    if (t._fadeIn) {
      const N = setTimeout(() => m(1), 10);
      return () => clearTimeout(N);
    }
  }, []);
  const S = t.authorId === a, I = t.authorId.slice(0, 2).toUpperCase();
  return /* @__PURE__ */ n("div", { style: { opacity: c }, className: "border-b border-surface-hover pb-4 mb-4 transition-opacity duration-200 ease-[ease]", children: [
    /* @__PURE__ */ n("div", { className: "flex items-center gap-2 mb-2", children: [
      /* @__PURE__ */ e("div", { className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0", children: I }),
      /* @__PURE__ */ n("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("span", { className: "text-base font-semibold text-text-primary", children: t.authorId }),
        /* @__PURE__ */ e("span", { className: "text-sm text-text-tertiary ml-2", children: Be(t.createdAt) })
      ] })
    ] }),
    C ? /* @__PURE__ */ n("div", { className: "mb-2", children: [
      /* @__PURE__ */ e(
        "textarea",
        {
          value: g,
          onChange: (N) => v(N.target.value),
          rows: 3,
          className: "w-full box-border border border-border-field rounded-md px-2.5 py-1.5 text-sm font-[system-ui,-apple-system,sans-serif] bg-surface-inset text-text-primary resize-y mb-2"
        }
      ),
      /* @__PURE__ */ n("div", { className: "flex gap-2", children: [
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
    /* @__PURE__ */ n("div", { className: "flex gap-4 text-sm mt-1 items-center flex-wrap", children: [
      /* @__PURE__ */ e(Je, { idToken: s, roomId: r, postId: t.postId, onMessage: i }),
      /* @__PURE__ */ e(We, { idToken: s, roomId: r, postId: t.postId, onMessage: i }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => l((N) => !N),
          className: "bg-transparent border-none text-sm text-text-secondary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
          children: "Comment"
        }
      ),
      S && !C && /* @__PURE__ */ e(
        "button",
        {
          onClick: () => b(!0),
          className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
          children: "Edit"
        }
      ),
      S && !u && !C && /* @__PURE__ */ e(
        "button",
        {
          onClick: () => y(!0),
          className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
          children: "Delete"
        }
      ),
      S && u && /* @__PURE__ */ n("div", { role: "group", "aria-label": "Confirm delete post", className: "flex gap-1.5 items-center", children: [
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
              d(t.postId), y(!1);
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
        idToken: s,
        roomId: r,
        postId: t.postId,
        onMessage: i
      }
    )
  ] });
}
function it({ idToken: t, roomId: s, onMessage: r }) {
  const { posts: a, createPost: i, editPost: o, deletePost: d, loading: c, hasMore: m, loadMore: f } = Z({ idToken: t, roomId: s, onMessage: r }), l = _e(t);
  return /* @__PURE__ */ n("div", { className: "bg-surface border border-border rounded-lg p-5", children: [
    /* @__PURE__ */ e(Ke, { onCreate: i, loading: c }),
    /* @__PURE__ */ e("div", { className: "border-t border-border my-4" }),
    m && /* @__PURE__ */ e(
      "button",
      {
        onClick: () => {
          f();
        },
        disabled: c,
        className: h(
          "w-full h-9 mb-4 bg-surface text-text-primary border border-border rounded-lg text-sm font-[system-ui,-apple-system,sans-serif]",
          c ? "cursor-default" : "cursor-pointer"
        ),
        children: c ? "Loading…" : "Load more"
      }
    ),
    c && a.length === 0 ? /* @__PURE__ */ n("div", { className: "flex items-center gap-2 p-4 justify-center text-text-secondary", children: [
      /* @__PURE__ */ e("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }),
      "Loading..."
    ] }) : a.length === 0 ? /* @__PURE__ */ n("div", { className: "py-6 text-center", children: [
      /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary mb-1", children: "No posts yet" }),
      /* @__PURE__ */ e("div", { className: "text-sm text-text-tertiary", children: "Be the first to post in this room." })
    ] }) : a.map((u) => /* @__PURE__ */ e(
      qe,
      {
        post: u,
        idToken: t,
        roomId: s,
        currentUserId: l,
        onMessage: r,
        onEdit: o,
        onDelete: d
      },
      u.postId
    ))
  ] });
}
const Ve = 50;
function ze(t) {
  const s = t.detail;
  switch (t.eventType) {
    case "social.room.join":
      return { icon: "🚪", text: `Joined room ${s.roomId?.slice(0, 8) ?? ""}` };
    case "social.room.leave":
      return { icon: "🚪", text: `Left room ${s.roomId?.slice(0, 8) ?? ""}` };
    case "social.follow":
      return { icon: "👥", text: `Followed @${s.followeeId?.slice(0, 8) ?? ""}` };
    case "social.unfollow":
      return { icon: "👥", text: `Unfollowed @${s.followeeId?.slice(0, 8) ?? ""}` };
    case "social.like":
      return { icon: "❤️", text: `Liked ${s.contentId?.slice(0, 8) ?? "content"}` };
    case "social.reaction":
      return { icon: s.emoji ?? "😀", text: `Reacted to ${s.contentId?.slice(0, 8) ?? "content"}` };
    case "social.post.created":
      return { icon: "📝", text: `Posted in room ${s.roomId?.slice(0, 8) ?? ""}` };
    case "social.comment.created":
      return { icon: "💬", text: `Commented in room ${s.roomId?.slice(0, 8) ?? ""}` };
    // Pipeline run-lifecycle events (relayed via usePipelineActivityRelay)
    case "pipeline.run.started": {
      const r = s.pipelineId ?? "";
      return { icon: "▶", text: r ? `Triggered pipeline ${r}` : "Triggered pipeline" };
    }
    case "pipeline.run.completed":
      return {
        icon: "✓",
        text: typeof s.durationMs == "number" ? `Pipeline run completed in ${s.durationMs}ms` : "Pipeline run completed"
      };
    case "pipeline.run.failed":
      return {
        icon: "✕",
        text: `Pipeline run failed: ${s.error ?? "unknown error"}`
      };
    case "pipeline.approval.requested":
      return { icon: "✋", text: "Approval requested" };
    default:
      return { icon: "ℹ️", text: t.eventType };
  }
}
function He(t) {
  const s = Date.now() - new Date(t).getTime(), r = Math.floor(s / 1e3);
  return r < 60 ? "just now" : r < 3600 ? `${Math.floor(r / 60)}m ago` : t.slice(0, 10);
}
function Ye(t) {
  if (!t) return null;
  try {
    return JSON.parse(atob(t.split(".")[1])).sub;
  } catch {
    return null;
  }
}
function Xe({
  idToken: t,
  sendMessage: s,
  onMessage: r,
  connectionState: a
}) {
  const [i, o] = x([]), [d, c] = x(!0), [m, f] = x(!1), [l, u] = x(null), [y, C] = x(0), b = K(s);
  U(() => {
    b.current = s;
  }, [s]);
  const { toast: g } = pe(), v = Ye(t), S = _(() => C((I) => I + 1), []);
  return U(() => {
  }, [t, y, g]), U(() => {
    if (a !== "connected" || !v) {
      f(!1);
      return;
    }
    const I = `activity:${v}`;
    return b.current({ service: "activity", action: "subscribe", channelId: I }), f(!0), () => {
      b.current({ service: "activity", action: "unsubscribe", channelId: I }), f(!1);
    };
  }, [a, v]), U(() => r((N) => {
    if (N.type !== "activity:event") return;
    const D = N.payload;
    D && o((p) => p.length > 0 && p[0].timestamp === D.timestamp && p[0].eventType === D.eventType ? p : [
      { eventType: D.eventType, timestamp: D.timestamp, detail: D.detail },
      ...p
    ].slice(0, Ve));
  }), [r]), { items: i, loading: d, isLive: m, error: l, retry: S };
}
function lt({ idToken: t, sendMessage: s, onMessage: r, connectionState: a }) {
  const { items: i, loading: o, isLive: d, error: c, retry: m } = Xe({ idToken: t, sendMessage: s, onMessage: r, connectionState: a });
  return /* @__PURE__ */ n("div", { className: "bg-surface border border-border rounded-lg p-5", children: [
    /* @__PURE__ */ n("h2", { className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3", children: [
      "Activity",
      d && /* @__PURE__ */ e(
        "span",
        {
          className: "inline-block w-2 h-2 rounded-full bg-[#22c55e] ml-2 align-middle",
          title: "Live"
        }
      )
    ] }),
    o ? /* @__PURE__ */ n("div", { className: "flex items-center gap-2 p-4 justify-center text-text-secondary", children: [
      /* @__PURE__ */ e("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }),
      "Loading..."
    ] }) : c && i.length === 0 ? /* @__PURE__ */ n(
      "div",
      {
        role: "alert",
        className: "py-6 px-4 text-center text-[#b91c1c] text-sm flex flex-col items-center gap-2",
        children: [
          /* @__PURE__ */ e("span", { children: "Couldn't load activity" }),
          /* @__PURE__ */ e("span", { className: "text-text-secondary text-xs", children: c }),
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
    ) : i.length === 0 ? /* @__PURE__ */ e("div", { className: "py-10 text-center text-text-tertiary text-sm", children: "No activity yet" }) : /* @__PURE__ */ e("div", { children: i.map((f, l) => {
      const { icon: u, text: y } = ze(f);
      return /* @__PURE__ */ n(
        "div",
        {
          className: h(
            "flex flex-row items-center gap-2 py-2",
            l < i.length - 1 && "border-b border-surface-hover"
          ),
          children: [
            /* @__PURE__ */ e("span", { className: "w-6 shrink-0 text-center", children: u }),
            /* @__PURE__ */ e("span", { className: "flex-1 text-sm text-text-primary", children: y }),
            /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary shrink-0", children: He(f.timestamp) })
          ]
        },
        l
      );
    }) })
  ] });
}
export {
  lt as A,
  je as C,
  Re as G,
  it as P,
  Ne as R,
  at as S,
  Ae as a,
  ot as b,
  nt as c,
  xe as u
};
