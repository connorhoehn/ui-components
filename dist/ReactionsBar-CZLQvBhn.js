import { jsxs as s, jsx as e, Fragment as ee } from "react/jsx-runtime";
import { useState as f, useEffect as R, createContext as me, useContext as pe, useCallback as _, useRef as T, useId as ue, useMemo as xe, useLayoutEffect as fe } from "react";
import { e as be, a as te, b as he, d as re, u as ye, c as ne } from "./useComments-Bocx7XyC.js";
import { c as h } from "./cn-B6yFEsav.js";
import { I as P } from "./Input-Dt0yAs9r.js";
import { T as W } from "./Textarea-kaa9rHUL.js";
import { S as ge } from "./Select-DAEcKWg2.js";
import { M as ve } from "./PresencePanel-19UCWiYi.js";
import { u as Ne } from "./ToastProvider-D3MHbP-u.js";
import { _ as A } from "./index-Bjylubtc.js";
function K(t, n) {
  return {
    id: t.userId,
    displayName: t.displayName,
    bio: "",
    avatarUrl: t.avatarUrl ?? null,
    visibility: t.visibility,
    followState: n
  };
}
function we(t) {
  return {
    id: t.userId,
    displayName: t.displayName,
    bio: t.bio ?? "",
    avatarUrl: t.avatarUrl ?? null,
    visibility: t.visibility
  };
}
function se({ user: t, size: n }) {
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
function Ce({ targetUser: t, followState: n, compact: r = !1, onFollowChange: a }) {
  const [i, o] = f(!1), c = () => {
    a(t.id, "pending");
  }, m = () => o(!0), p = () => o(!1), y = () => {
    o(!1), a(t.id, "not-following");
  };
  return n === "not-following" ? /* @__PURE__ */ e(
    "button",
    {
      className: h("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border-none font-[system-ui,-apple-system,sans-serif] bg-primary text-white font-semibold", r ? "h-7" : "h-9"),
      onClick: c,
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
        onClick: m,
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
          onClick: p,
          className: "h-9 rounded-lg text-sm px-3 bg-surface text-text-primary border border-border cursor-pointer font-[system-ui,-apple-system,sans-serif]",
          children: "Keep Following"
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: y,
          className: "h-9 rounded-lg text-sm px-3 bg-danger text-white border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
          children: "Unfollow"
        }
      )
    ] })
  ] });
}
function Ie({ user: t, isOwnProfile: n, onSave: r }) {
  const [a, i] = f(!1), [o, c] = f(t.displayName), [m, p] = f(t.bio), [y, l] = f(t.avatarUrl ?? ""), [x, b] = f(t.visibility), [g, d] = f(!1);
  R(() => {
    c(t.displayName), p(t.bio), l(t.avatarUrl ?? ""), b(t.visibility);
  }, [t]);
  const v = async () => {
    d(!0);
    try {
      await r({ displayName: o, bio: m, avatarUrl: y || void 0, visibility: x }), i(!1);
    } finally {
      d(!1);
    }
  };
  return a ? /* @__PURE__ */ s("div", { children: [
    /* @__PURE__ */ s("div", { className: "mb-3", children: [
      /* @__PURE__ */ e("label", { className: "text-sm text-text-primary block mb-1", children: "Display name" }),
      /* @__PURE__ */ e(
        P,
        {
          value: o,
          onChange: (N) => c(N.target.value.slice(0, 50)),
          placeholder: "Your name",
          maxLength: 50
        }
      )
    ] }),
    /* @__PURE__ */ s("div", { className: "mb-3", children: [
      /* @__PURE__ */ e("label", { className: "text-sm text-text-primary block mb-1", children: "Bio" }),
      /* @__PURE__ */ e(
        W,
        {
          value: m,
          onChange: (N) => p(N.target.value.slice(0, 160)),
          placeholder: "Tell people a bit about yourself (max 160 characters)",
          maxLength: 160,
          rows: 3,
          className: "resize-y"
        }
      )
    ] }),
    /* @__PURE__ */ s("div", { className: "mb-4", children: [
      /* @__PURE__ */ e("label", { className: "text-sm text-text-primary block mb-1", children: "Avatar URL" }),
      /* @__PURE__ */ e(
        P,
        {
          value: y,
          onChange: (N) => l(N.target.value),
          placeholder: "https://example.com/avatar.png"
        }
      )
    ] }),
    /* @__PURE__ */ e("div", { className: "mb-4", children: /* @__PURE__ */ e("div", { role: "radiogroup", "aria-label": "Profile visibility", className: "flex gap-2", children: ["public", "private"].map((N) => /* @__PURE__ */ e(
      "button",
      {
        role: "radio",
        "aria-checked": x === N,
        onClick: () => b(N),
        className: h(
          "px-4 py-1 rounded-full text-sm cursor-pointer border border-border font-[system-ui,-apple-system,sans-serif]",
          x === N ? "bg-primary text-white" : "bg-surface text-text-primary"
        ),
        children: N.charAt(0).toUpperCase() + N.slice(1)
      },
      N
    )) }) }),
    /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => {
            v();
          },
          disabled: g,
          className: h("flex-1 h-9 bg-primary text-white border-none rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", g ? "cursor-default" : "cursor-pointer"),
          children: g ? "Saving…" : "Save Changes"
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
      /* @__PURE__ */ e(se, { user: t, size: 48 }),
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
function ke({ followers: t, following: n, friends: r, followStates: a, onFollowChange: i }) {
  const [o, c] = f("followers"), m = [
    { key: "followers", label: `Followers (${t.length})`, users: t },
    { key: "following", label: `Following (${n.length})`, users: n },
    { key: "friends", label: `Friends (${r.length})`, users: r }
  ], p = {
    followers: { heading: "No followers yet", body: "When someone follows you, they'll appear here." },
    following: { heading: "Not following anyone yet", body: "Find people to follow from the profile list above." },
    friends: { heading: "No mutual friends yet", body: "Mutual follows become friends. Start by following someone." }
  }, y = m.find((l) => l.key === o)?.users ?? [];
  return /* @__PURE__ */ s("div", { className: "mt-4", children: [
    /* @__PURE__ */ e("div", { role: "tablist", className: "flex border-b border-border mb-3", children: m.map((l) => /* @__PURE__ */ e(
      "button",
      {
        role: "tab",
        "aria-selected": o === l.key,
        onClick: () => c(l.key),
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
        children: y.length === 0 ? /* @__PURE__ */ s("div", { className: "py-6 text-center", children: [
          /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary mb-1", children: p[o].heading }),
          /* @__PURE__ */ e("div", { className: "text-sm text-text-tertiary", children: p[o].body })
        ] }) : /* @__PURE__ */ e("div", { children: y.map((l) => /* @__PURE__ */ s(
          "div",
          {
            className: "flex items-center gap-2 h-14 border-b border-surface-hover",
            children: [
              /* @__PURE__ */ e(se, { user: l, size: 32 }),
              /* @__PURE__ */ s("div", { className: "flex-1", children: [
                /* @__PURE__ */ e("div", { className: "text-base text-text-primary", children: l.displayName }),
                /* @__PURE__ */ e("div", { className: "text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap max-w-[240px]", children: l.visibility === "private" ? /* @__PURE__ */ e("em", { className: "text-text-tertiary", children: "This profile is private." }) : l.bio })
              ] }),
              /* @__PURE__ */ e(
                Ce,
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
function vt({ idToken: t, onMessage: n }) {
  const { profile: r, loading: a, updateProfile: i } = be({ idToken: t }), { followers: o, following: c, friends: m, follow: p, unfollow: y } = te({ idToken: t }), l = new Set(c.map((w) => w.userId)), x = {};
  [...o, ...c, ...m].forEach((w) => {
    x[w.userId] = l.has(w.userId) ? "following" : "not-following";
  });
  const [b, g] = f(null), d = async (w, D) => {
    g(null);
    try {
      D === "following" || D === "pending" ? await p(w) : await y(w);
    } catch (u) {
      g(u instanceof Error ? u.message : "Follow action failed");
    }
  }, v = o.map((w) => K(w, x[w.userId] ?? "not-following")), N = c.map((w) => K(w, "following")), S = m.map((w) => K(w, "following")), I = r ? {
    ...we(r),
    followersCount: o.length,
    followingCount: c.length,
    friendsCount: m.length
  } : null;
  return /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-lg p-5", children: [
    /* @__PURE__ */ e("h2", { className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3", children: "Social Profile" }),
    a && !I ? /* @__PURE__ */ e("div", { className: "py-10 text-center text-text-tertiary text-sm", children: "Loading profile…" }) : I ? /* @__PURE__ */ s(ee, { children: [
      /* @__PURE__ */ e(
        Ie,
        {
          user: I,
          isOwnProfile: !0,
          onSave: i
        }
      ),
      /* @__PURE__ */ e(
        ke,
        {
          followers: v,
          following: N,
          friends: S,
          followStates: x,
          onFollowChange: d
        }
      )
    ] }) : null,
    b && /* @__PURE__ */ e("div", { className: "text-danger text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]", children: b })
  ] });
}
const ae = me({ theme: "light", toggleTheme: () => {
} }), V = "wsg-theme";
function Nt({ children: t }) {
  const [n, r] = f(() => {
    try {
      const i = localStorage.getItem(V);
      if (i === "dark" || i === "light") return i;
    } catch {
    }
    return "light";
  });
  R(() => {
    try {
      localStorage.setItem(V, n);
    } catch {
    }
    document.documentElement.setAttribute("data-theme", n);
  }, [n]);
  const a = _(() => {
    r((i) => i === "light" ? "dark" : "light");
  }, []);
  return /* @__PURE__ */ e(ae.Provider, { value: { theme: n, toggleTheme: a }, children: t });
}
function Se() {
  return pe(ae);
}
function Y({ onCreate: t, onDiscard: n, loading: r }) {
  const [a, i] = f(""), [o, c] = f(null), m = async (p) => {
    if (p.preventDefault(), !!a.trim()) {
      c(null);
      try {
        await t(a.trim()), i("");
      } catch (y) {
        c(y instanceof Error ? y.message : "Failed to create room");
      }
    }
  };
  return /* @__PURE__ */ s("form", { onSubmit: (p) => {
    m(p);
  }, className: "my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border", children: [
    /* @__PURE__ */ e(
      P,
      {
        size: "sm",
        value: a,
        onChange: (p) => i(p.target.value.slice(0, 50)),
        placeholder: "Room name",
        maxLength: 50,
        required: !0,
        autoFocus: !0,
        className: "mb-1.5"
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
function H({ onCreateDM: t, loading: n, friends: r }) {
  const [a, i] = f(""), [o, c] = f(!1), [m, p] = f(null), y = async (l) => {
    if (l.preventDefault(), !!a.trim()) {
      p(null);
      try {
        await t(a.trim()), i(""), c(!1);
      } catch (x) {
        p(x instanceof Error ? x.message : "Failed to open DM");
      }
    }
  };
  return o ? /* @__PURE__ */ s("form", { onSubmit: (l) => {
    y(l);
  }, className: "my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border", children: [
    /* @__PURE__ */ e(
      ge,
      {
        size: "sm",
        value: a,
        onChange: (l) => i(l.target.value),
        disabled: r.length === 0,
        className: "mb-1.5",
        options: [
          { value: "", label: r.length === 0 ? "No mutual friends yet" : "Select a friend…" },
          ...r.map((l) => ({ value: l.userId, label: l.displayName }))
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
          onClick: () => c(!1),
          className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
          children: "Cancel"
        }
      )
    ] }),
    m && /* @__PURE__ */ e("div", { className: "text-danger text-[11px] mt-1", children: m })
  ] }) : /* @__PURE__ */ e(
    "button",
    {
      onClick: () => c(!0),
      className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded mb-1",
      children: "+ New DM"
    }
  );
}
function De({ room: t, isActive: n, onClick: r }) {
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
function Fe({ room: t, isActive: n, onClick: r }) {
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
function X({ message: t, onRetry: n, compact: r }) {
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
function Re({ idToken: t, rooms: n, createRoom: r, createDM: a, loading: i, error: o, onRetry: c, onRoomSelect: m, activeRoomId: p, compact: y }) {
  const { friends: l } = te({ idToken: t }), [x, b] = f(!1), g = async (d) => {
    await r(d), b(!1);
  };
  return y ? /* @__PURE__ */ s("div", { className: "px-2 pt-2", children: [
    /* @__PURE__ */ e(
      "button",
      {
        onClick: () => b((d) => !d),
        className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
        children: "+ New Room"
      }
    ),
    x && /* @__PURE__ */ e(
      Y,
      {
        onCreate: g,
        onDiscard: () => b(!1),
        loading: i
      }
    ),
    /* @__PURE__ */ e(H, { onCreateDM: a, loading: i, friends: l }),
    /* @__PURE__ */ e("div", { children: i && n.length === 0 ? /* @__PURE__ */ e("div", { className: "p-2 text-text-tertiary text-xs text-center", children: "Loading…" }) : o && n.length === 0 ? /* @__PURE__ */ e(X, { message: o, onRetry: c, compact: !0 }) : n.length === 0 ? /* @__PURE__ */ e("div", { className: "px-2 py-3 text-text-tertiary text-xs", children: "No rooms yet" }) : n.map((d) => /* @__PURE__ */ e(
      Fe,
      {
        room: d,
        isActive: d.roomId === p,
        onClick: () => m(d)
      },
      d.roomId
    )) })
  ] }) : /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-lg p-5", children: [
    /* @__PURE__ */ e("h2", { className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3", children: "Rooms" }),
    /* @__PURE__ */ e(
      "button",
      {
        onClick: () => b((d) => !d),
        className: "w-full h-9 mb-2 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]",
        children: "Create Room"
      }
    ),
    x && /* @__PURE__ */ e(
      Y,
      {
        onCreate: g,
        onDiscard: () => b(!1),
        loading: i
      }
    ),
    /* @__PURE__ */ e(H, { onCreateDM: a, loading: i, friends: l }),
    /* @__PURE__ */ e("div", { className: "max-h-80 overflow-y-auto", children: i && n.length === 0 ? /* @__PURE__ */ s("div", { className: "flex items-center gap-2 p-4 justify-center text-text-secondary", children: [
      /* @__PURE__ */ e("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }),
      "Loading..."
    ] }) : o && n.length === 0 ? /* @__PURE__ */ e(X, { message: o, onRetry: c }) : n.length === 0 ? /* @__PURE__ */ s("div", { className: "py-6 text-center", children: [
      /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary mb-1", children: "No rooms yet" }),
      /* @__PURE__ */ e("div", { className: "text-sm text-text-tertiary", children: "Create a room or ask to be added." })
    ] }) : n.map((d) => /* @__PURE__ */ e(
      De,
      {
        room: d,
        isActive: d.roomId === p,
        onClick: () => m(d)
      },
      d.roomId
    )) })
  ] });
}
function Ee({ group: t, isSelected: n, onClick: r }) {
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
function Pe({ onCreate: t, onDiscard: n, loading: r }) {
  const [a, i] = f(""), [o, c] = f(null), m = async (p) => {
    if (p.preventDefault(), !!a.trim()) {
      c(null);
      try {
        await t(a.trim()), i("");
      } catch (y) {
        c(y instanceof Error ? y.message : "Failed to create group");
      }
    }
  };
  return /* @__PURE__ */ s("form", { onSubmit: (p) => {
    m(p);
  }, className: "p-2 bg-surface-panel rounded-md border border-border my-1 mb-2", children: [
    /* @__PURE__ */ e(
      P,
      {
        size: "sm",
        value: a,
        onChange: (p) => i(p.target.value.slice(0, 50)),
        placeholder: "Group name",
        maxLength: 50,
        required: !0,
        autoFocus: !0,
        className: "mb-1.5"
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
function Ue({ group: t, members: n, rooms: r, groupId: a, currentUserId: i, createGroupRoom: o, onRoomSelect: c, inviteUser: m, loading: p }) {
  const [y, l] = f(!1), [x, b] = f(""), [g, d] = f(!1), [v, N] = f(""), S = t.ownerId === i, I = r.filter((u) => u.groupId === a), w = async (u) => {
    u.preventDefault(), x.trim() && (await m(a, x.trim()), b(""), l(!1));
  }, D = async (u) => {
    u.preventDefault(), v.trim() && (await o(a, v.trim()), N(""), d(!1));
  };
  return /* @__PURE__ */ s("div", { className: "px-2 pb-2 pt-1 border-t border-border mt-1", children: [
    /* @__PURE__ */ s("div", { className: "flex items-center justify-between mb-1", children: [
      /* @__PURE__ */ s("span", { className: "text-[11px] text-text-secondary font-semibold uppercase tracking-wide", children: [
        "Members (",
        n.length,
        ")"
      ] }),
      S && /* @__PURE__ */ e("button", { onClick: () => l((u) => !u), className: "text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]", children: "+ Invite" })
    ] }),
    y && /* @__PURE__ */ s("form", { onSubmit: (u) => {
      w(u);
    }, className: "flex gap-1 mb-1.5", children: [
      /* @__PURE__ */ e(
        P,
        {
          size: "sm",
          value: x,
          onChange: (u) => b(u.target.value),
          placeholder: "User ID",
          className: "flex-1"
        }
      ),
      /* @__PURE__ */ e("button", { type: "submit", disabled: !x.trim(), className: h(
        "h-6 px-2 border-none rounded text-[11px] font-[inherit]",
        x.trim() ? "bg-primary text-white cursor-pointer" : "bg-border text-text-tertiary cursor-default"
      ), children: "Invite" })
    ] }),
    /* @__PURE__ */ s("div", { className: "flex flex-wrap gap-1 mb-2", children: [
      n.slice(0, 8).map((u) => /* @__PURE__ */ e("div", { title: u.displayName ?? u.userId, className: "w-6 h-6 rounded-full bg-border flex items-center justify-center text-[10px] font-semibold text-text-primary", children: (u.displayName ?? u.userId).slice(0, 2).toUpperCase() }, u.userId)),
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
      S && /* @__PURE__ */ e("button", { onClick: () => d((u) => !u), className: "text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]", children: "+ Room" })
    ] }),
    g && /* @__PURE__ */ s("form", { onSubmit: (u) => {
      D(u);
    }, className: "flex gap-1 mb-1.5", children: [
      /* @__PURE__ */ e(
        P,
        {
          size: "sm",
          value: v,
          onChange: (u) => N(u.target.value.slice(0, 50)),
          placeholder: "Room name",
          className: "flex-1"
        }
      ),
      /* @__PURE__ */ e("button", { type: "submit", disabled: !v.trim() || p, className: h(
        "h-6 px-2 border-none rounded text-[11px] font-[inherit]",
        !v.trim() || p ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"
      ), children: "Create" })
    ] }),
    I.map((u) => /* @__PURE__ */ s(
      "button",
      {
        onClick: () => c?.(u),
        className: "flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1 cursor-pointer bg-transparent text-text-primary text-[13px] text-left font-[inherit]",
        children: [
          /* @__PURE__ */ e("span", { className: "text-text-tertiary text-xs", children: "#" }),
          /* @__PURE__ */ e("span", { className: "overflow-hidden text-ellipsis whitespace-nowrap", children: u.name })
        ]
      },
      u.roomId
    ))
  ] });
}
function Le({ onCreate: t, onDiscard: n, loading: r }) {
  const [a, i] = f(""), [o, c] = f("public"), [m, p] = f(null), y = async (l) => {
    if (l.preventDefault(), !!a.trim()) {
      p(null);
      try {
        await t(a.trim(), void 0, o);
      } catch (x) {
        p(x instanceof Error ? x.message : "Failed to create group");
      }
    }
  };
  return /* @__PURE__ */ s("form", { onSubmit: (l) => {
    y(l);
  }, className: "mb-3 p-3 bg-surface-panel rounded-lg border border-border", children: [
    /* @__PURE__ */ s("div", { className: "mb-3", children: [
      /* @__PURE__ */ e("label", { className: "text-sm text-text-primary block mb-1", children: "Group name" }),
      /* @__PURE__ */ e(P, { value: a, onChange: (l) => i(l.target.value.slice(0, 50)), placeholder: "Group name", maxLength: 50, required: !0 })
    ] }),
    /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 mb-3.5", children: [
      /* @__PURE__ */ e("span", { className: "text-[13px] text-text-primary min-w-[42px]", children: o === "public" ? "Public" : "Private" }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": o === "private",
          onClick: () => c((l) => l === "public" ? "private" : "public"),
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
    m && /* @__PURE__ */ e("div", { className: "text-danger text-[13px] mt-1.5", children: m })
  ] });
}
function je({ group: t, currentUserId: n, isSelected: r, onSelect: a, onDelete: i }) {
  const [o, c] = f(null), m = t.ownerId === n;
  return /* @__PURE__ */ s("div", { className: "flex items-center h-14 border-b border-surface-hover cursor-pointer", onClick: () => a(t.groupId), children: [
    /* @__PURE__ */ s("div", { className: "flex-1 min-w-0 pr-2", children: [
      /* @__PURE__ */ e("div", { className: h("text-base text-text-primary", r ? "font-semibold" : "font-normal"), children: t.name }),
      t.description && /* @__PURE__ */ e("div", { className: "text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap", children: t.description })
    ] }),
    /* @__PURE__ */ e("span", { className: h(
      "text-xs px-2 py-0.5 rounded shrink-0 mr-2",
      t.visibility === "public" ? "bg-success-bg text-success" : "bg-surface-hover text-text-secondary"
    ), children: t.visibility }),
    m && /* @__PURE__ */ e("div", { className: "shrink-0", onClick: (p) => p.stopPropagation(), children: o === t.groupId ? /* @__PURE__ */ s("div", { role: "group", "aria-label": "Confirm delete group", className: "flex items-center gap-1", children: [
      /* @__PURE__ */ e("button", { onClick: () => c(null), className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]", children: "Cancel" }),
      /* @__PURE__ */ e("button", { onClick: () => {
        i(t.groupId), c(null);
      }, className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]", children: "Delete" })
    ] }) : /* @__PURE__ */ e("button", { onClick: () => c(t.groupId), className: "text-xs text-danger bg-transparent border-none cursor-pointer px-2 py-1 font-[system-ui,-apple-system,sans-serif]", "aria-label": `Delete group ${t.name}`, children: "Delete" }) })
  ] });
}
function $e({ groupId: t, onInvite: n }) {
  const [r, a] = f("");
  return /* @__PURE__ */ s("form", { onSubmit: (o) => {
    o.preventDefault(), r.trim() && (n(t, r.trim()), a(""));
  }, className: "flex gap-2 mt-2", children: [
    /* @__PURE__ */ e(P, { className: "flex-1", value: r, onChange: (o) => a(o.target.value), placeholder: "User ID to invite" }),
    /* @__PURE__ */ e("button", { type: "submit", disabled: !r.trim(), className: h(
      "h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]",
      r.trim() ? "bg-primary text-white border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"
    ), children: "Invite" })
  ] });
}
function Me({ members: t }) {
  const n = (r) => r === "owner" ? "bg-success-bg text-success text-xs px-2 py-0.5 rounded" : r === "admin" ? "bg-info-bg text-info text-xs px-2 py-0.5 rounded" : "bg-surface-hover text-text-secondary text-xs px-2 py-0.5 rounded";
  return /* @__PURE__ */ e("div", { className: "max-h-[200px] overflow-y-auto mt-2 border-t border-border", children: t.map((r) => /* @__PURE__ */ s("div", { className: "flex items-center gap-2 h-12 border-b border-surface-hover", children: [
    /* @__PURE__ */ e("div", { className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0", children: (r.displayName ?? r.userId).slice(0, 2).toUpperCase() }),
    /* @__PURE__ */ e("div", { className: "flex-1 text-base text-text-primary", children: r.displayName ?? r.userId }),
    /* @__PURE__ */ e("span", { className: n(r.role), children: r.role })
  ] }, r.userId)) });
}
function Ae({ rooms: t, groupId: n, selectedGroupRole: r, createGroupRoom: a, onRoomSelect: i, loading: o }) {
  const [c, m] = f(!1), [p, y] = f(""), l = t.filter((b) => b.groupId === n);
  return /* @__PURE__ */ s("div", { className: "mt-3", children: [
    /* @__PURE__ */ e("h3", { className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-2", children: "GROUP ROOMS" }),
    (r === "owner" || r === "admin") && (c ? /* @__PURE__ */ e("form", { onSubmit: async (b) => {
      b.preventDefault(), p.trim() && (await a(n, p.trim()), y(""), m(!1));
    }, className: "mb-2 p-3 bg-surface-panel rounded-lg border border-border", children: /* @__PURE__ */ s("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ e(P, { className: "flex-1", value: p, onChange: (b) => y(b.target.value.slice(0, 50)), placeholder: "Room name", maxLength: 50, required: !0 }),
      /* @__PURE__ */ e("button", { type: "submit", disabled: !p.trim() || o, className: h(
        "h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]",
        !p.trim() || o ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"
      ), children: o ? "Creating…" : "Create Room" }),
      /* @__PURE__ */ e("button", { type: "button", onClick: () => m(!1), className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]", children: "Cancel" })
    ] }) }) : /* @__PURE__ */ e("button", { onClick: () => m(!0), className: "w-full h-9 mb-2 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]", children: "Create Room" })),
    l.length === 0 ? /* @__PURE__ */ e("div", { className: "text-sm text-text-tertiary py-2", children: "No rooms in this group yet." }) : l.map((b) => /* @__PURE__ */ s("div", { onClick: () => i?.(b), className: "flex items-center h-12 border-b border-surface-hover cursor-pointer pr-2", children: [
      /* @__PURE__ */ e("div", { className: "flex-1 text-base text-text-primary", children: b.name }),
      /* @__PURE__ */ e("span", { className: "bg-info-bg text-info text-xs px-2 py-0.5 rounded", children: "group" })
    ] }, b.roomId))
  ] });
}
function Te({ idToken: t, rooms: n, createGroupRoom: r, onRoomSelect: a, roomsLoading: i, compact: o }) {
  const {
    groups: c,
    createGroup: m,
    deleteGroup: p,
    inviteUser: y,
    loadMembers: l,
    members: x,
    loading: b
  } = he({ idToken: t }), [g, d] = f(!1), [v, N] = f(null), S = t ? (() => {
    try {
      return JSON.parse(atob(t.split(".")[1])).sub;
    } catch {
      return null;
    }
  })() : null, I = async (k, F, j) => {
    await m(k, F, j), d(!1);
  }, w = (k) => {
    v === k ? N(null) : (N(k), l(k));
  };
  if (o) {
    const k = v ? c.find((F) => F.groupId === v) : null;
    return /* @__PURE__ */ s("div", { className: "px-2 pt-2", children: [
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => d((F) => !F),
          className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
          children: "+ New Group"
        }
      ),
      g && /* @__PURE__ */ e(
        Pe,
        {
          onCreate: I,
          onDiscard: () => d(!1),
          loading: b
        }
      ),
      /* @__PURE__ */ e("div", { children: b && c.length === 0 ? /* @__PURE__ */ e("div", { className: "p-2 text-text-tertiary text-xs text-center", children: "Loading…" }) : c.length === 0 ? /* @__PURE__ */ e("div", { className: "px-2 py-3 text-text-tertiary text-xs", children: "No groups yet" }) : c.map((F) => /* @__PURE__ */ e(
        Ee,
        {
          group: F,
          isSelected: F.groupId === v,
          onClick: () => w(F.groupId)
        },
        F.groupId
      )) }),
      k && /* @__PURE__ */ e(
        Ue,
        {
          group: k,
          members: x,
          rooms: n,
          groupId: k.groupId,
          currentUserId: S,
          createGroupRoom: r,
          onRoomSelect: a,
          inviteUser: y,
          loading: i
        }
      )
    ] });
  }
  const D = v ? c.find((k) => k.groupId === v) : null, u = D && S && D.ownerId === S ? "owner" : "member";
  return /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-lg p-5", children: [
    /* @__PURE__ */ e("h2", { className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3", children: "Groups" }),
    /* @__PURE__ */ e("div", { className: "max-h-80 overflow-y-auto mb-3", children: c.length === 0 ? /* @__PURE__ */ s("div", { className: "py-4 text-center", children: [
      /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary mb-1", children: "No groups yet" }),
      /* @__PURE__ */ e("div", { className: "text-sm text-text-tertiary", children: "Create a group or join a public one." })
    ] }) : c.map((k) => /* @__PURE__ */ e(je, { group: k, currentUserId: S, isSelected: v === k.groupId, onSelect: w, onDelete: p }, k.groupId)) }),
    v && /* @__PURE__ */ s("div", { className: "mb-3", children: [
      /* @__PURE__ */ e(Me, { members: x }),
      (u === "owner" || u === "admin") && /* @__PURE__ */ e($e, { groupId: v, onInvite: y }),
      /* @__PURE__ */ e(Ae, { rooms: n, groupId: v, selectedGroupRole: u, createGroupRoom: r, onRoomSelect: a, loading: i })
    ] }),
    /* @__PURE__ */ e(
      "button",
      {
        onClick: () => d((k) => !k),
        className: h("w-full h-9 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]", g && "mb-2"),
        children: g ? "Cancel" : "Create Group"
      }
    ),
    g && /* @__PURE__ */ e(Le, { onCreate: I, onDiscard: () => d(!1), loading: b })
  ] });
}
const Q = [
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
function Ge(t) {
  let n = 0;
  for (let r = 0; r < t.length; r++) n = n * 31 + t.charCodeAt(r) >>> 0;
  return Q[n % Q.length];
}
function Oe(t) {
  const n = t.split(/[\s._@-]/);
  return n.length >= 2 ? (n[0][0] + n[1][0]).toUpperCase() : t.slice(0, 2).toUpperCase();
}
function _e(t) {
  const n = Date.now() - new Date(t).getTime(), r = Math.floor(n / 1e3);
  return r < 60 ? "just now" : r < 3600 ? `${Math.floor(r / 60)}m ago` : r < 86400 ? `${Math.floor(r / 3600)}h ago` : new Date(t).toLocaleDateString();
}
function Be(t) {
  if (!t) return null;
  try {
    return JSON.parse(atob(t.split(".")[1])).sub;
  } catch {
    return null;
  }
}
function ze({ post: t, isOwn: n, showSender: r }) {
  const a = Ge(t.authorId);
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
            children: Oe(t.authorId)
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
              r && /* @__PURE__ */ e("span", { className: "text-[10px] text-text-tertiary px-1", children: _e(t.createdAt) })
            ]
          }
        )
      ]
    }
  );
}
function Ke({ idToken: t, roomId: n, roomName: r, onMessage: a }) {
  const { posts: i, createPost: o, loading: c, hasMore: m, loadMore: p, error: y } = re({ idToken: t, roomId: n, onMessage: a }), [l, x] = f(""), [b, g] = f(!1), [d, v] = f(null), N = T(null), S = Be(t), I = [...i].reverse();
  R(() => {
    N.current?.scrollIntoView({ behavior: "smooth" });
  }, [i.length]);
  const w = async () => {
    if (!l.trim() || b) return;
    const u = l.trim();
    x(""), v(null), g(!0);
    try {
      await o(u);
    } catch (k) {
      v(k instanceof Error ? k.message : "Failed to send message"), x(u);
    } finally {
      g(!1);
    }
  }, D = (u) => {
    u.key === "Enter" && !u.shiftKey && (u.preventDefault(), w());
  };
  return /* @__PURE__ */ s("div", { className: "flex flex-col h-full bg-surface rounded-lg border border-border overflow-hidden", children: [
    /* @__PURE__ */ e("div", { className: "flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface shrink-0", children: /* @__PURE__ */ s("span", { className: "text-[15px] font-semibold text-text-primary", children: [
      "# ",
      r
    ] }) }),
    /* @__PURE__ */ s("div", { className: "flex-1 overflow-y-auto flex flex-col pb-1", children: [
      m && /* @__PURE__ */ e("div", { className: "text-center py-2", children: /* @__PURE__ */ e(
        "button",
        {
          onClick: () => {
            p();
          },
          disabled: c,
          className: h(
            "text-xs text-text-secondary bg-transparent border border-border rounded-full px-3.5 py-0.5 font-[inherit]",
            c ? "cursor-default" : "cursor-pointer"
          ),
          children: c ? "Loading…" : "Load earlier"
        }
      ) }),
      c && I.length === 0 ? /* @__PURE__ */ e("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px]", children: "Loading messages…" }) : I.length === 0 ? /* @__PURE__ */ s("div", { className: "flex-1 flex flex-col items-center justify-center text-text-tertiary gap-1.5", children: [
        /* @__PURE__ */ e("span", { className: "text-[28px]", children: "💬" }),
        /* @__PURE__ */ e("span", { className: "text-sm font-semibold text-text-primary", children: "No messages yet" }),
        /* @__PURE__ */ e("span", { className: "text-[13px]", children: "Be the first to say something!" })
      ] }) : I.map((u, k) => {
        const F = u.authorId === S, j = I[k - 1], U = !j || j.authorId !== u.authorId || new Date(u.createdAt).getTime() - new Date(j.createdAt).getTime() > 300 * 1e3;
        return /* @__PURE__ */ e(ze, { post: u, isOwn: F, showSender: U }, u.postId);
      }),
      /* @__PURE__ */ e("div", { ref: N })
    ] }),
    (y || d) && /* @__PURE__ */ e("div", { className: "px-4 py-1.5 bg-danger-bg border-t border-danger-border text-xs text-danger", children: d ?? y }),
    /* @__PURE__ */ s("div", { className: "flex items-center gap-2 px-3 py-2.5 border-t border-border bg-surface shrink-0", children: [
      /* @__PURE__ */ e(
        P,
        {
          value: l,
          onChange: (u) => x(u.target.value),
          onKeyDown: D,
          placeholder: `Message #${r}…`,
          disabled: b,
          className: "flex-1 rounded-[22px] px-4"
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => {
            w();
          },
          disabled: !l.trim() || b,
          className: h(
            "w-[34px] h-[34px] rounded-full shrink-0 border-none flex items-center justify-center text-base",
            !l.trim() || b ? "bg-surface-hover text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"
          ),
          children: "↑"
        }
      )
    ] })
  ] });
}
function J({ title: t, count: n, unreadTotal: r, defaultOpen: a = !0, children: i }) {
  const [o, c] = f(a);
  return /* @__PURE__ */ s("div", { className: "mb-0.5", children: [
    /* @__PURE__ */ s(
      "button",
      {
        onClick: () => c((m) => !m),
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
function Z({ room: t, isActive: n, unread: r, onClick: a }) {
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
function wt({
  userId: t,
  displayName: n,
  idToken: r,
  rooms: a,
  createRoom: i,
  createDM: o,
  createGroupRoom: c,
  roomsLoading: m,
  roomsError: p,
  onRoomsRetry: y,
  handleRoomSelect: l,
  activeRoomId: x,
  onMessage: b
}) {
  const { theme: g } = Se(), d = g === "dark", [v, N] = f(!0), S = v ? 240 : 0, [I, w] = f({}), D = T(x);
  R(() => {
    D.current = x;
  }, [x]);
  const u = _((C) => {
    w((E) => {
      if (!E[C.roomId]) return E;
      const z = { ...E };
      return delete z[C.roomId], z;
    }), l(C);
  }, [l]);
  R(() => b((E) => {
    if (E.type === "social:post") {
      const O = (E.payload ?? E).roomId;
      O && O !== D.current && w((q) => ({ ...q, [O]: (q[O] ?? 0) + 1 }));
    }
  }), [b]);
  const [k, F] = f(!1), j = n ? n.split(" ").map((C) => C[0]).join("").toUpperCase().slice(0, 2) : t.slice(0, 2).toUpperCase(), U = a.find((C) => C.roomId === x) ?? null, $ = a.filter((C) => C.type === "standalone" || C.type === "group"), G = a.filter((C) => C.type === "dm"), le = $.reduce((C, E) => C + (I[E.roomId] ?? 0), 0), ce = G.reduce((C, E) => C + (I[E.roomId] ?? 0), 0), de = d ? "#1e1f2e" : "#f8fafc", M = d ? "rgba(255,255,255,0.06)" : "#e2e8f0", B = d ? "#fff" : "#0f172a", L = d ? "#94a3b8" : "#64748b";
  return /* @__PURE__ */ s(
    "div",
    {
      className: "flex overflow-hidden rounded-lg transition-colors duration-200 h-[calc(100vh-120px)]",
      style: {
        background: d ? "#0f172a" : "#fff",
        border: `1px solid ${M}`
      },
      children: [
        /* @__PURE__ */ s(
          "div",
          {
            className: h("shrink-0 flex-col overflow-hidden transition-[width] duration-[180ms]", v ? "flex" : "hidden"),
            style: {
              width: S,
              borderRight: `1px solid ${M}`,
              background: de
            },
            children: [
              /* @__PURE__ */ s(
                "div",
                {
                  className: "flex items-center gap-2 shrink-0 px-[14px] pt-[14px] pb-3",
                  style: { borderBottom: `1px solid ${M}` },
                  children: [
                    /* @__PURE__ */ e("div", { className: "w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-[11px] shrink-0 bg-[linear-gradient(135deg,#646cff,#9b59b6)]", children: j }),
                    /* @__PURE__ */ s("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ e("div", { className: "text-[13px] font-bold overflow-hidden text-ellipsis whitespace-nowrap", style: { color: B }, children: n || t }),
                      /* @__PURE__ */ s("div", { className: "text-[11px] flex items-center gap-1", style: { color: L }, children: [
                        /* @__PURE__ */ e("span", { className: "w-1.5 h-1.5 rounded-full bg-[#22c55e] inline-block" }),
                        "Active"
                      ] })
                    ] }),
                    /* @__PURE__ */ e(
                      "button",
                      {
                        onClick: () => N(!1),
                        title: "Collapse sidebar",
                        className: "bg-transparent border-none cursor-pointer text-base leading-none px-1 py-0.5 rounded",
                        style: { color: L },
                        children: "«"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ s("div", { className: "flex-1 overflow-y-auto pt-2", children: [
                /* @__PURE__ */ e(J, { title: "Channels", count: $.length, unreadTotal: le, children: /* @__PURE__ */ s("div", { className: "px-1", children: [
                  m && $.length === 0 ? /* @__PURE__ */ e("div", { className: "px-6 py-2 text-xs", style: { color: L }, children: "Loading…" }) : $.length === 0 ? /* @__PURE__ */ e("div", { className: "px-6 py-2 text-xs", style: { color: L }, children: "No channels yet" }) : $.map((C) => /* @__PURE__ */ e(
                    Z,
                    {
                      room: C,
                      isActive: C.roomId === x,
                      unread: I[C.roomId] ?? 0,
                      onClick: () => u(C)
                    },
                    C.roomId
                  )),
                  /* @__PURE__ */ s(
                    "button",
                    {
                      onClick: () => F((C) => !C),
                      className: "flex items-center gap-1.5 w-full bg-transparent border-none cursor-pointer text-xs font-[inherit] rounded pt-[5px] pr-2 pb-[5px] pl-6",
                      style: { color: L },
                      children: [
                        /* @__PURE__ */ e("span", { className: "text-sm leading-none", children: "+" }),
                        " Add channel"
                      ]
                    }
                  ),
                  k && /* @__PURE__ */ e("div", { className: "px-2", children: /* @__PURE__ */ e(
                    Re,
                    {
                      idToken: r,
                      rooms: [],
                      createRoom: i,
                      createDM: o,
                      loading: m,
                      error: p,
                      onRetry: y,
                      onRoomSelect: u,
                      activeRoomId: x,
                      compact: !0
                    }
                  ) })
                ] }) }),
                /* @__PURE__ */ e(J, { title: "Direct Messages", count: G.length, unreadTotal: ce, children: /* @__PURE__ */ e("div", { className: "px-1", children: G.length === 0 ? /* @__PURE__ */ e("div", { className: "px-6 py-2 text-xs", style: { color: L }, children: "No conversations yet" }) : G.map((C) => /* @__PURE__ */ e(
                  Z,
                  {
                    room: C,
                    isActive: C.roomId === x,
                    unread: I[C.roomId] ?? 0,
                    onClick: () => u(C)
                  },
                  C.roomId
                )) }) }),
                /* @__PURE__ */ e(J, { title: "Groups", count: 0, defaultOpen: !1, children: /* @__PURE__ */ e(
                  Te,
                  {
                    idToken: r,
                    rooms: a,
                    createGroupRoom: c,
                    onRoomSelect: u,
                    roomsLoading: m,
                    compact: !0
                  }
                ) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ s("div", { className: "flex-1 min-w-0 flex flex-col", children: [
          !v && /* @__PURE__ */ s(
            "div",
            {
              className: "flex items-center gap-2 px-3 py-1.5",
              style: { borderBottom: `1px solid ${M}` },
              children: [
                /* @__PURE__ */ e(
                  "button",
                  {
                    onClick: () => N(!0),
                    title: "Expand sidebar",
                    className: "bg-transparent rounded cursor-pointer text-sm px-2 py-0.5 font-[inherit]",
                    style: { border: `1px solid ${M}`, color: L },
                    children: "»"
                  }
                ),
                U && /* @__PURE__ */ s("span", { className: "text-[13px] font-semibold", style: { color: B }, children: [
                  U.type === "dm" ? "●" : "#",
                  " ",
                  U.name
                ] })
              ]
            }
          ),
          /* @__PURE__ */ e("div", { className: "flex-1 min-h-0", children: U ? /* @__PURE__ */ e(
            Ke,
            {
              idToken: r,
              roomId: U.roomId,
              roomName: U.name,
              onMessage: b
            },
            U.roomId
          ) : /* @__PURE__ */ s(
            "div",
            {
              className: "h-full flex flex-col items-center justify-center gap-2",
              style: { color: L },
              children: [
                /* @__PURE__ */ e("span", { className: "text-4xl", children: "💬" }),
                /* @__PURE__ */ e("span", { className: "text-[15px] font-semibold", style: { color: B }, children: "Select a room to start chatting" }),
                /* @__PURE__ */ e("span", { className: "text-[13px]", children: "Choose a channel or DM from the sidebar" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Ct({
  author: t,
  avatarUrl: n,
  mine: r = !1,
  messages: a,
  className: i
}) {
  return a.length === 0 ? null : /* @__PURE__ */ e(
    "div",
    {
      "data-testid": "message-group",
      "data-author": t,
      "data-row-count": a.length,
      className: h("flex flex-col", i),
      children: a.map((o, c) => /* @__PURE__ */ e(
        ve,
        {
          author: t,
          content: o.content,
          timestamp: o.timestamp,
          avatarUrl: n,
          hideAvatar: c > 0,
          hideAuthor: c > 0,
          mine: r,
          footer: o.footer
        },
        o.id
      ))
    }
  );
}
function Je(t) {
  const n = Date.now() - new Date(t).getTime(), r = Math.floor(n / 1e3);
  return r < 60 ? "just now" : r < 3600 ? `${Math.floor(r / 60)}m ago` : t.slice(0, 10);
}
function We(t) {
  if (!t) return null;
  try {
    return JSON.parse(atob(t.split(".")[1])).sub;
  } catch {
    return null;
  }
}
function oe({ onSubmit: t, placeholder: n = "Write a reply…", loading: r }) {
  const [a, i] = f("");
  return /* @__PURE__ */ s("form", { onSubmit: (c) => {
    c.preventDefault(), a.trim() && (t(a.trim()), i(""));
  }, className: "flex gap-2 mt-2", children: [
    /* @__PURE__ */ e(
      P,
      {
        value: a,
        onChange: (c) => i(c.target.value),
        placeholder: n,
        className: "flex-1"
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
function qe({ comment: t, currentUserId: n, loading: r, onDelete: a, onReply: i }) {
  const [o, c] = f(!1), [m, p] = f(!1), [y, l] = f(t._fadeIn ? 0 : 1);
  R(() => {
    if (t._fadeIn) {
      const v = setTimeout(() => l(1), 10);
      return () => clearTimeout(v);
    }
  }, []);
  const x = t.authorId === n, b = !!t.parentCommentId, g = t.authorId.slice(0, 2).toUpperCase(), d = /* @__PURE__ */ e("div", { style: { opacity: y }, className: "transition-opacity duration-200 ease-[ease]", children: /* @__PURE__ */ s("div", { className: "flex items-start gap-2", children: [
    /* @__PURE__ */ e("div", { className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0", children: g }),
    /* @__PURE__ */ s("div", { className: "flex-1", children: [
      /* @__PURE__ */ s("div", { className: "flex items-center gap-2 mb-0.5", children: [
        /* @__PURE__ */ e("span", { className: "text-sm font-semibold text-text-primary", children: t.authorId }),
        /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary", children: Je(t.createdAt) })
      ] }),
      /* @__PURE__ */ e("div", { className: "text-sm text-text-primary mb-1", children: t.content }),
      /* @__PURE__ */ s("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => p((v) => !v),
            className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
            children: "Reply"
          }
        ),
        x && !o && /* @__PURE__ */ e(
          "button",
          {
            onClick: () => c(!0),
            className: "text-sm text-text-tertiary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
            "aria-label": "Delete comment",
            children: "Delete"
          }
        ),
        x && o && /* @__PURE__ */ s("div", { role: "group", "aria-label": "Confirm delete comment", className: "flex gap-1.5 items-center", children: [
          /* @__PURE__ */ e("span", { className: "text-xs text-text-primary", children: "Delete this comment?" }),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => c(!1),
              className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => {
                a(t.commentId), c(!1);
              },
              className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
              children: "Delete"
            }
          )
        ] })
      ] }),
      m && /* @__PURE__ */ e(
        oe,
        {
          onSubmit: async (v) => {
            await i(t.commentId, v), p(!1);
          },
          placeholder: "Write a reply…",
          loading: r
        }
      )
    ] })
  ] }) });
  return b ? /* @__PURE__ */ e("div", { className: "pl-8 py-2", children: d }) : /* @__PURE__ */ e("div", { className: "py-2 border-b border-surface-hover", children: d });
}
function Ve({ idToken: t, roomId: n, postId: r, onMessage: a }) {
  const { comments: i, createComment: o, deleteComment: c, loading: m } = ye({ idToken: t, roomId: n, postId: r, onMessage: a }), p = We(t), y = async (l, x) => {
    await o(x, l);
  };
  return /* @__PURE__ */ s("div", { className: "pt-2 pl-2 border-t border-surface-hover", children: [
    m ? /* @__PURE__ */ e("div", { className: "text-sm text-text-tertiary py-2", children: "Loading comments…" }) : i.length === 0 ? /* @__PURE__ */ e("div", { className: "text-sm text-text-tertiary text-center py-4", children: "No comments yet" }) : i.map((l) => /* @__PURE__ */ e(
      qe,
      {
        comment: l,
        currentUserId: p,
        loading: m,
        onDelete: c,
        onReply: y
      },
      l.commentId
    )),
    /* @__PURE__ */ e(
      oe,
      {
        onSubmit: (l) => o(l),
        placeholder: "Write a comment…",
        loading: m
      }
    )
  ] });
}
const Ye = ["❤️", "😂", "👍", "👎", "😮", "😢", "😡", "🎉", "🔥", "⚡", "💯", "🚀"];
function He(t) {
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
function Qe({ onCreate: t, loading: n }) {
  const [r, a] = f(""), [i, o] = f(null), c = async (m) => {
    if (m.preventDefault(), !!r.trim()) {
      o(null);
      try {
        await t(r.trim()), a("");
      } catch (p) {
        o(p instanceof Error ? p.message : "Failed to create post");
      }
    }
  };
  return /* @__PURE__ */ s("form", { onSubmit: (m) => {
    c(m);
  }, children: [
    /* @__PURE__ */ e(
      W,
      {
        value: r,
        onChange: (m) => a(m.target.value),
        placeholder: "What's on your mind?",
        maxLength: 1e4,
        rows: 3,
        className: "resize-y mb-2"
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
function Ze({ idToken: t, roomId: n, postId: r, onMessage: a }) {
  const { isLiked: i, likeCount: o, toggle: c, whoLiked: m } = ne({ idToken: t, roomId: n, postId: r, onMessage: a });
  return /* @__PURE__ */ s(ee, { children: [
    /* @__PURE__ */ s(
      "button",
      {
        onClick: () => {
          c();
        },
        "aria-label": "Like post",
        className: "bg-transparent border-none cursor-pointer flex items-center gap-1 p-0 font-[system-ui,-apple-system,sans-serif]",
        children: [
          /* @__PURE__ */ e("span", { className: h("text-base", i ? "text-primary" : "text-text-tertiary"), children: "❤" }),
          /* @__PURE__ */ e("span", { className: h("text-sm", i ? "text-primary" : "text-text-tertiary"), children: o })
        ]
      }
    ),
    m.length > 0 && /* @__PURE__ */ s("span", { className: "text-xs text-text-secondary ml-1", children: [
      "Liked by: ",
      m.slice(0, 3).map((p) => p.displayName).join(", "),
      m.length > 3 ? ` and ${m.length - 3} more` : ""
    ] })
  ] });
}
function et({ idToken: t, roomId: n, postId: r, onMessage: a }) {
  const { reactWithEmoji: i } = ne({ idToken: t, roomId: n, postId: r, onMessage: a });
  return /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-0", children: Ye.map((o) => /* @__PURE__ */ e(
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
function tt({ post: t, idToken: n, roomId: r, currentUserId: a, onMessage: i, onEdit: o, onDelete: c }) {
  const [m, p] = f(t._fadeIn ? 0 : 1), [y, l] = f(!1), [x, b] = f(!1), [g, d] = f(!1), [v, N] = f(t.content);
  R(() => {
    if (t._fadeIn) {
      const w = setTimeout(() => p(1), 10);
      return () => clearTimeout(w);
    }
  }, []);
  const S = t.authorId === a, I = t.authorId.slice(0, 2).toUpperCase();
  return /* @__PURE__ */ s("div", { style: { opacity: m }, className: "border-b border-surface-hover pb-4 mb-4 transition-opacity duration-200 ease-[ease]", children: [
    /* @__PURE__ */ s("div", { className: "flex items-center gap-2 mb-2", children: [
      /* @__PURE__ */ e("div", { className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0", children: I }),
      /* @__PURE__ */ s("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("span", { className: "text-base font-semibold text-text-primary", children: t.authorId }),
        /* @__PURE__ */ e("span", { className: "text-sm text-text-tertiary ml-2", children: He(t.createdAt) })
      ] })
    ] }),
    g ? /* @__PURE__ */ s("div", { className: "mb-2", children: [
      /* @__PURE__ */ e(
        W,
        {
          value: v,
          onChange: (w) => N(w.target.value),
          rows: 3,
          className: "resize-y mb-2"
        }
      ),
      /* @__PURE__ */ s("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => {
              o(t.postId, v), d(!1);
            },
            disabled: !v.trim(),
            className: h(
              "h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]",
              v.trim() ? "bg-primary text-white border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"
            ),
            children: "Save"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => {
              d(!1), N(t.content);
            },
            className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
            children: "Discard Changes"
          }
        )
      ] })
    ] }) : /* @__PURE__ */ e("div", { className: "text-base text-text-primary mt-2 mb-2", children: t.content }),
    /* @__PURE__ */ s("div", { className: "flex gap-4 text-sm mt-1 items-center flex-wrap", children: [
      /* @__PURE__ */ e(Ze, { idToken: n, roomId: r, postId: t.postId, onMessage: i }),
      /* @__PURE__ */ e(et, { idToken: n, roomId: r, postId: t.postId, onMessage: i }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => l((w) => !w),
          className: "bg-transparent border-none text-sm text-text-secondary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
          children: "Comment"
        }
      ),
      S && !g && /* @__PURE__ */ e(
        "button",
        {
          onClick: () => d(!0),
          className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
          children: "Edit"
        }
      ),
      S && !x && !g && /* @__PURE__ */ e(
        "button",
        {
          onClick: () => b(!0),
          className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
          children: "Delete"
        }
      ),
      S && x && /* @__PURE__ */ s("div", { role: "group", "aria-label": "Confirm delete post", className: "flex gap-1.5 items-center", children: [
        /* @__PURE__ */ e("span", { className: "text-xs text-text-primary", children: "Delete this post?" }),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => b(!1),
            className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => {
              c(t.postId), b(!1);
            },
            className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
            children: "Delete"
          }
        )
      ] })
    ] }),
    y && /* @__PURE__ */ e(
      Ve,
      {
        idToken: n,
        roomId: r,
        postId: t.postId,
        onMessage: i
      }
    )
  ] });
}
function It({ idToken: t, roomId: n, onMessage: r }) {
  const { posts: a, createPost: i, editPost: o, deletePost: c, loading: m, hasMore: p, loadMore: y } = re({ idToken: t, roomId: n, onMessage: r }), l = Xe(t);
  return /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-lg p-5", children: [
    /* @__PURE__ */ e(Qe, { onCreate: i, loading: m }),
    /* @__PURE__ */ e("div", { className: "border-t border-border my-4" }),
    p && /* @__PURE__ */ e(
      "button",
      {
        onClick: () => {
          y();
        },
        disabled: m,
        className: h(
          "w-full h-9 mb-4 bg-surface text-text-primary border border-border rounded-lg text-sm font-[system-ui,-apple-system,sans-serif]",
          m ? "cursor-default" : "cursor-pointer"
        ),
        children: m ? "Loading…" : "Load more"
      }
    ),
    m && a.length === 0 ? /* @__PURE__ */ s("div", { className: "flex items-center gap-2 p-4 justify-center text-text-secondary", children: [
      /* @__PURE__ */ e("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }),
      "Loading..."
    ] }) : a.length === 0 ? /* @__PURE__ */ s("div", { className: "py-6 text-center", children: [
      /* @__PURE__ */ e("div", { className: "text-sm font-semibold text-text-primary mb-1", children: "No posts yet" }),
      /* @__PURE__ */ e("div", { className: "text-sm text-text-tertiary", children: "Be the first to post in this room." })
    ] }) : a.map((x) => /* @__PURE__ */ e(
      tt,
      {
        post: x,
        idToken: t,
        roomId: n,
        currentUserId: l,
        onMessage: r,
        onEdit: o,
        onDelete: c
      },
      x.postId
    ))
  ] });
}
const rt = 50;
function nt(t) {
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
function st(t) {
  const n = Date.now() - new Date(t).getTime(), r = Math.floor(n / 1e3);
  return r < 60 ? "just now" : r < 3600 ? `${Math.floor(r / 60)}m ago` : t.slice(0, 10);
}
function at(t) {
  if (!t) return null;
  try {
    return JSON.parse(atob(t.split(".")[1])).sub;
  } catch {
    return null;
  }
}
function ot({
  idToken: t,
  sendMessage: n,
  onMessage: r,
  connectionState: a
}) {
  const [i, o] = f([]), [c, m] = f(!0), [p, y] = f(!1), [l, x] = f(null), [b, g] = f(0), d = T(n);
  R(() => {
    d.current = n;
  }, [n]);
  const { toast: v } = Ne(), N = at(t), S = _(() => g((I) => I + 1), []);
  return R(() => {
  }, [t, b, v]), R(() => {
    if (a !== "connected" || !N) {
      y(!1);
      return;
    }
    const I = `activity:${N}`;
    return d.current({ service: "activity", action: "subscribe", channelId: I }), y(!0), () => {
      d.current({ service: "activity", action: "unsubscribe", channelId: I }), y(!1);
    };
  }, [a, N]), R(() => r((w) => {
    if (w.type !== "activity:event") return;
    const D = w.payload;
    D && o((u) => u.length > 0 && u[0].timestamp === D.timestamp && u[0].eventType === D.eventType ? u : [
      { eventType: D.eventType, timestamp: D.timestamp, detail: D.detail },
      ...u
    ].slice(0, rt));
  }), [r]), { items: i, loading: c, isLive: p, error: l, retry: S };
}
function kt({ idToken: t, sendMessage: n, onMessage: r, connectionState: a }) {
  const { items: i, loading: o, isLive: c, error: m, retry: p } = ot({ idToken: t, sendMessage: n, onMessage: r, connectionState: a });
  return /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-lg p-5", children: [
    /* @__PURE__ */ s("h2", { className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3", children: [
      "Activity",
      c && /* @__PURE__ */ e(
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
    ] }) : m && i.length === 0 ? /* @__PURE__ */ s(
      "div",
      {
        role: "alert",
        className: "py-6 px-4 text-center text-[#b91c1c] text-sm flex flex-col items-center gap-2",
        children: [
          /* @__PURE__ */ e("span", { children: "Couldn't load activity" }),
          /* @__PURE__ */ e("span", { className: "text-text-secondary text-xs", children: m }),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: p,
              className: "mt-1 px-3 py-1 text-xs font-medium text-[#1d4ed8] bg-info-bg border border-info-border rounded cursor-pointer",
              children: "Retry"
            }
          )
        ]
      }
    ) : i.length === 0 ? /* @__PURE__ */ e("div", { className: "py-10 text-center text-text-tertiary text-sm", children: "No activity yet" }) : /* @__PURE__ */ e("div", { children: i.map((y, l) => {
      const { icon: x, text: b } = nt(y);
      return /* @__PURE__ */ s(
        "div",
        {
          className: h(
            "flex flex-row items-center gap-2 py-2",
            l < i.length - 1 && "border-b border-surface-hover"
          ),
          children: [
            /* @__PURE__ */ e("span", { className: "w-6 shrink-0 text-center", children: x }),
            /* @__PURE__ */ e("span", { className: "flex-1 text-sm text-text-primary", children: b }),
            /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary shrink-0", children: st(y.timestamp) })
          ]
        },
        l
      );
    }) })
  ] });
}
const ie = [
  "👍",
  "❤️",
  "🔥",
  "😂",
  "👏",
  "🎉",
  "😮",
  "💯",
  "😀",
  "😅",
  "😉",
  "😍",
  "😘",
  "🤣",
  "🥰",
  "😇",
  "🤔",
  "😎",
  "😢",
  "😡",
  "🤯",
  "😱",
  "🙃",
  "🤩",
  "🙏",
  "🤝",
  "👋",
  "👌",
  "✌️",
  "🤞",
  "🤘",
  "🫶",
  "✨",
  "⭐",
  "💫",
  "🌟",
  "⚡",
  "💥",
  "☀️",
  "🌈",
  "🚀",
  "🎯",
  "🏆",
  "💪",
  "🎊",
  "🎈",
  "🥳",
  "🎁",
  "☕",
  "🍕",
  "🍔",
  "🍩",
  "🍦",
  "🍓",
  "🍻",
  "🍷",
  "👀",
  "🤖",
  "👻",
  "😺",
  "🐶",
  "🦄",
  "🐝",
  "🌸"
];
function it(t, n) {
  const [r, a] = f(null);
  return fe(() => {
    if (!n || !t?.current) {
      a(null);
      return;
    }
    const i = t.current.getBoundingClientRect();
    a({
      top: Math.max(8, i.top + window.scrollY - 12),
      left: i.left + window.scrollX
    });
  }, [n, t]), r;
}
function lt({
  open: t,
  onSelect: n,
  onClose: r,
  triggerRef: a,
  emojis: i = ie,
  showSearch: o = !0,
  className: c,
  style: m
}) {
  const p = T(null), y = ue(), l = it(a, t);
  R(() => {
    if (!t) return;
    const g = (d) => {
      const v = d.target;
      p.current?.contains(v) || a?.current?.contains(v) || r();
    };
    return document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
  }, [t, r, a]), R(() => {
    if (!t) return;
    const g = (d) => {
      d.key === "Escape" && (d.stopPropagation(), r());
    };
    return document.addEventListener("keydown", g), () => document.removeEventListener("keydown", g);
  }, [t, r]);
  const x = _(
    (g) => {
      n(g), r();
    },
    [n, r]
  ), b = xe(() => l ? { position: "absolute", top: l.top, left: l.left, transform: "translateY(-100%)" } : { position: "absolute" }, [l]);
  return t ? /* @__PURE__ */ e(
    "div",
    {
      ref: p,
      role: "dialog",
      "aria-label": "Pick a reaction",
      "data-testid": "reaction-picker-popover",
      className: h(
        "z-50 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg p-2",
        "w-[18rem]",
        c
      ),
      style: { ...b, ...m },
      children: /* @__PURE__ */ s(
        A,
        {
          label: "Pick a reaction",
          loop: !0,
          children: [
            o && /* @__PURE__ */ e(
              A.Input,
              {
                id: `${y}-search`,
                placeholder: "Search reactions…",
                className: h(
                  "w-full rounded-md border border-[var(--color-border-field)] bg-transparent",
                  "px-2 py-1.5 text-sm text-[var(--color-text-primary)] mb-2",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
                ),
                autoFocus: !0
              }
            ),
            /* @__PURE__ */ s(
              A.List,
              {
                className: "max-h-[14rem] overflow-y-auto",
                "data-testid": "reaction-picker-list",
                children: [
                  /* @__PURE__ */ e(A.Empty, { className: "px-2 py-3 text-xs text-[var(--color-text-secondary)]", children: "No reactions match." }),
                  /* @__PURE__ */ e("div", { role: "presentation", className: "grid grid-cols-8 gap-1", children: i.map((g) => /* @__PURE__ */ e(
                    A.Item,
                    {
                      value: g,
                      onSelect: () => x(g),
                      "data-testid": "reaction-picker-item",
                      "data-emoji": g,
                      className: h(
                        "flex items-center justify-center text-xl rounded-md",
                        "h-9 cursor-pointer select-none",
                        "aria-selected:bg-[var(--color-primary)]/20",
                        "hover:bg-white/5"
                      ),
                      children: g
                    },
                    g
                  )) })
                ]
              }
            )
          ]
        }
      )
    }
  ) : null;
}
function St({
  reactions: t,
  onReact: n,
  disabled: r = !1,
  pickerEmojis: a = ie,
  addTriggerLabel: i,
  hideAddTrigger: o = !1,
  className: c
}) {
  const [m, p] = f(!1), y = T(null), l = (d) => {
    r || n(d);
  }, x = (d) => {
    n(d);
  }, b = [], g = /* @__PURE__ */ new Map();
  for (const d of t)
    if (g.has(d.emoji)) {
      const v = g.get(d.emoji), N = b[v];
      b[v] = {
        emoji: d.emoji,
        count: N.count + d.count,
        mine: N.mine || d.mine
      };
    } else
      g.set(d.emoji, b.length), b.push({ ...d });
  return /* @__PURE__ */ s(
    "div",
    {
      "data-testid": "reactions-bar",
      className: h("relative inline-flex flex-wrap items-center gap-1", c),
      children: [
        b.map((d) => /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            onClick: () => l(d.emoji),
            disabled: r,
            "aria-pressed": d.mine ?? !1,
            "data-testid": "reaction-chip",
            "data-emoji": d.emoji,
            "data-mine": d.mine ? "true" : "false",
            className: h(
              "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs leading-none transition-colors",
              d.mine ? "border-[var(--color-primary)] bg-[var(--color-primary)]/15 text-[var(--color-text-primary)]" : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/60 hover:text-[var(--color-text-primary)]",
              r && "opacity-50 cursor-not-allowed"
            ),
            children: [
              /* @__PURE__ */ e("span", { "aria-hidden": !0, className: "text-sm leading-none", children: d.emoji }),
              /* @__PURE__ */ e("span", { className: "tabular-nums", children: d.count })
            ]
          },
          d.emoji
        )),
        !o && /* @__PURE__ */ s(
          "button",
          {
            ref: y,
            type: "button",
            onClick: () => !r && p((d) => !d),
            disabled: r,
            "aria-haspopup": "dialog",
            "aria-expanded": m,
            "data-testid": "reactions-bar-add",
            className: h(
              "inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-border)]",
              "h-6 min-w-6 px-1.5 text-xs text-[var(--color-text-secondary)] transition-colors",
              !r && "hover:border-[var(--color-primary)] hover:text-[var(--color-text-primary)]",
              r && "opacity-50 cursor-not-allowed"
            ),
            children: [
              i ?? /* @__PURE__ */ e("span", { "aria-hidden": !0, children: "+ 😀" }),
              /* @__PURE__ */ e("span", { className: "sr-only", children: "Add reaction" })
            ]
          }
        ),
        /* @__PURE__ */ e(
          lt,
          {
            open: m,
            onSelect: x,
            onClose: () => p(!1),
            triggerRef: y,
            emojis: a
          }
        )
      ]
    }
  );
}
export {
  kt as A,
  Ke as C,
  ie as D,
  Te as G,
  Ct as M,
  It as P,
  lt as R,
  vt as S,
  Ve as a,
  St as b,
  Re as c,
  wt as d,
  Nt as e,
  Se as u
};
