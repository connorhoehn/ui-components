import { jsxs as t, jsx as e, Fragment as j } from "react/jsx-runtime";
import { useMemo as G, useState as o, useCallback as w, useId as xe, useRef as ce, useEffect as de } from "react";
import { C as U } from "./Card-B2uO9v1w.js";
import { P as F, T as J, b as Z, e as q, a as ee, c as te, d as B } from "./PageSection-Dj8r4YIt.js";
import { a as f, B as V } from "./Banner-B8AcwPH_.js";
import { E as me } from "./EmptyState-PM9wTjxk.js";
import { C as H } from "./ConfirmDialog-CNoxvYGu.js";
import { C as K } from "./Chip-BXdhqVFm.js";
import { M as ye } from "./Modal-2jg4229_.js";
import { c as O } from "./cn-B6yFEsav.js";
function Xe({ stats: a, pools: s, onNavigate: i, loading: u }) {
  const b = G(
    () => [
      { label: "User Pools", value: a.userPools },
      { label: "Applications", value: a.clients },
      { label: "Total Users", value: a.totalUsers }
    ],
    [a]
  );
  return u ? /* @__PURE__ */ t("div", { className: "flex flex-col gap-8", children: [
    /* @__PURE__ */ e("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4", children: [1, 2, 3].map((c) => /* @__PURE__ */ t(U, { padding: "md", children: [
      /* @__PURE__ */ e("div", { className: "h-5 w-12 rounded bg-slate-100 animate-pulse mb-2" }),
      /* @__PURE__ */ e("div", { className: "h-3 w-20 rounded bg-slate-100 animate-pulse" })
    ] }, c)) }),
    /* @__PURE__ */ e(U, { className: "h-[200px] animate-pulse" })
  ] }) : /* @__PURE__ */ t(F, { title: "Dashboard", children: [
    /* @__PURE__ */ e("section", { className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4", children: b.map((c) => /* @__PURE__ */ t(U, { padding: "md", children: [
      /* @__PURE__ */ e("div", { className: "text-[2rem] font-bold text-blue-600 mb-1", children: c.value }),
      /* @__PURE__ */ e("div", { className: "text-sm text-slate-500", children: c.label })
    ] }, c.label)) }),
    /* @__PURE__ */ t("section", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ e("h2", { className: "text-lg font-semibold text-slate-900 m-0", children: "User Pools" }),
      /* @__PURE__ */ e(U, { children: s.length === 0 ? /* @__PURE__ */ e(me, { title: "No pools created yet", actionLabel: "Create Pool", onAction: () => i("/identity/admin/pools/new") }) : s.map((c, h) => /* @__PURE__ */ t(
        "div",
        {
          className: `flex items-center justify-between px-4 py-3 ${h < s.length - 1 ? "border-b border-slate-100" : ""}`,
          children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ e("span", { className: "font-medium text-slate-800", children: c.poolName }),
              /* @__PURE__ */ e("span", { className: "text-xs text-slate-400", children: c.createdAt })
            ] }),
            /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => i(`/identity/admin/pools/${c.poolId}`), children: "View" })
          ]
        },
        c.poolId
      )) })
    ] }),
    /* @__PURE__ */ t("section", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ e("h2", { className: "text-lg font-semibold text-slate-900 m-0", children: "Quick Actions" }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ e(f, { variant: "secondary", size: "lg", onClick: () => i("/identity/admin/pools/new"), children: "Create Pool" }),
        /* @__PURE__ */ e(f, { variant: "secondary", size: "lg", onClick: () => i("/identity/admin/applications/new"), children: "Create Application" }),
        /* @__PURE__ */ e(f, { variant: "secondary", size: "lg", onClick: () => i("/identity/admin/setup"), children: "Setup Guide" })
      ] })
    ] })
  ] });
}
function X({
  columns: a,
  data: s,
  keyField: i,
  onRowClick: u,
  actions: b,
  emptyMessage: c = "No records found.",
  emptyIcon: h = "📋",
  loading: m = !1
}) {
  const [r, p] = o(null), [g, N] = o("asc"), l = w(
    (d) => {
      r === d ? N((x) => x === "asc" ? "desc" : "asc") : (p(d), N("asc"));
    },
    [r]
  ), n = G(() => r ? [...s].sort((d, x) => {
    const A = String(d[r] ?? ""), E = String(x[r] ?? ""), y = A.localeCompare(E);
    return g === "asc" ? y : -y;
  }) : s, [s, r, g]);
  return m ? /* @__PURE__ */ e(U, { children: /* @__PURE__ */ t(J, { children: [
    /* @__PURE__ */ e(Z, { children: /* @__PURE__ */ t("tr", { children: [
      a.map((d) => /* @__PURE__ */ e(q, { style: d.width ? { width: d.width } : void 0, children: d.header }, d.key)),
      b && /* @__PURE__ */ e(q, { className: "text-right", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ e(ee, { children: Array.from({ length: 5 }).map((d, x) => /* @__PURE__ */ t(te, { children: [
      a.map((A) => /* @__PURE__ */ e(B, { children: /* @__PURE__ */ e("div", { className: "h-4 rounded bg-slate-100 animate-pulse", style: { width: `${60 + Math.random() * 30}%` } }) }, A.key)),
      b && /* @__PURE__ */ e(B, { className: "text-right", children: /* @__PURE__ */ e("div", { className: "h-4 w-20 rounded bg-slate-100 animate-pulse ml-auto" }) })
    ] }, x)) })
  ] }) }) : s.length === 0 ? /* @__PURE__ */ t(U, { className: "flex flex-col items-center justify-center min-h-[220px] p-8", children: [
    /* @__PURE__ */ e("span", { className: "text-[42px] mb-3", children: h }),
    /* @__PURE__ */ e("p", { className: "text-sm font-medium text-slate-500 text-center max-w-[280px] m-0", children: c })
  ] }) : /* @__PURE__ */ e(U, { children: /* @__PURE__ */ t(J, { children: [
    /* @__PURE__ */ e(Z, { children: /* @__PURE__ */ t("tr", { children: [
      a.map((d) => /* @__PURE__ */ e(
        q,
        {
          sortable: d.sortable,
          sortDirection: d.sortable && r === d.key ? g : null,
          style: d.width ? { width: d.width } : void 0,
          className: d.align === "right" ? "text-right" : d.align === "center" ? "text-center" : void 0,
          onClick: d.sortable ? () => l(d.key) : void 0,
          children: d.header
        },
        d.key
      )),
      b && /* @__PURE__ */ e(q, { className: "text-right", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ e(ee, { children: n.map((d) => /* @__PURE__ */ t(
      te,
      {
        clickable: !!u,
        onClick: u ? () => u(d) : void 0,
        children: [
          a.map((x) => /* @__PURE__ */ e(
            B,
            {
              style: x.width ? { width: x.width } : void 0,
              className: x.align === "right" ? "text-right" : x.align === "center" ? "text-center" : void 0,
              children: x.render ? x.render(d) : String(d[x.key] ?? "")
            },
            x.key
          )),
          b && /* @__PURE__ */ e(B, { className: "text-right", onClick: (x) => x.stopPropagation(), children: /* @__PURE__ */ e("div", { className: "flex items-center justify-end gap-2", children: b(d) }) })
        ]
      },
      String(d[i])
    )) })
  ] }) });
}
function He({
  pools: a,
  onCreatePool: s,
  onEditPool: i,
  onDeletePool: u,
  onViewPool: b,
  loading: c
}) {
  const [h, m] = o(null), [r, p] = o(!1), g = w(
    async (n) => {
      p(!0);
      try {
        await u(n);
      } finally {
        p(!1), m(null);
      }
    },
    [u]
  ), N = G(
    () => [
      { key: "poolName", header: "Name", sortable: !0 },
      { key: "clientId", header: "Client ID" },
      { key: "createdAt", header: "Created", sortable: !0 }
    ],
    []
  ), l = w(
    (n) => /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => b(n.poolId), children: "View" }),
      /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => i(n.poolId), children: "Edit" }),
      /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => m(n.poolId), children: "Delete" })
    ] }),
    [i, b]
  );
  return /* @__PURE__ */ t(
    F,
    {
      title: "User Pools",
      actions: /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: s, children: "Create Pool" }),
      children: [
        /* @__PURE__ */ e(
          X,
          {
            columns: N,
            data: a,
            keyField: "poolId",
            actions: l,
            loading: c,
            emptyMessage: "No user pools found. Create one to get started.",
            emptyIcon: "🏊"
          }
        ),
        /* @__PURE__ */ e(
          H,
          {
            open: !!h,
            onConfirm: () => h && g(h),
            onCancel: () => m(null),
            title: "Delete Pool",
            body: "This action cannot be undone. All users in this pool will be affected.",
            tone: "destructive",
            confirmLabel: "Delete",
            confirmDisabled: r
          }
        )
      ]
    }
  );
}
const ve = "block w-full px-3 py-2 text-sm border border-[#e2e8f0] rounded-md bg-white text-slate-800 outline-none box-border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500", Ne = "block w-full px-3 py-2 text-sm border border-red-500 rounded-md bg-white text-slate-800 outline-none box-border focus:ring-2 focus:ring-red-500/20 focus:border-red-500";
function D({
  label: a,
  name: s,
  type: i = "text",
  value: u,
  onChange: b,
  error: c,
  required: h,
  placeholder: m,
  options: r,
  helpText: p,
  disabled: g
}) {
  const N = xe(), l = w(
    (x) => {
      b(i === "checkbox" ? x.target.checked : i === "number" ? Number(x.target.value) : x.target.value);
    },
    [b, i]
  ), n = c ? Ne : ve, d = () => i === "checkbox" ? /* @__PURE__ */ t("label", { className: "flex items-center gap-2 cursor-pointer", children: [
    /* @__PURE__ */ e(
      "input",
      {
        id: N,
        type: "checkbox",
        name: s,
        checked: !!u,
        onChange: l,
        disabled: g
      }
    ),
    /* @__PURE__ */ t("span", { className: "text-sm text-slate-800", children: [
      a,
      h && /* @__PURE__ */ e("span", { className: "text-red-600", children: " *" })
    ] })
  ] }) : i === "textarea" ? /* @__PURE__ */ e(
    "textarea",
    {
      id: N,
      name: s,
      value: String(u),
      onChange: l,
      placeholder: m,
      disabled: g,
      required: h,
      rows: 5,
      className: O(n, "resize-y min-h-[100px]")
    }
  ) : i === "select" ? /* @__PURE__ */ t(
    "select",
    {
      id: N,
      name: s,
      value: String(u),
      onChange: l,
      disabled: g,
      required: h,
      className: n,
      children: [
        /* @__PURE__ */ e("option", { value: "", children: m || "Select..." }),
        r?.map((x) => /* @__PURE__ */ e("option", { value: x.value, children: x.label }, x.value))
      ]
    }
  ) : /* @__PURE__ */ e(
    "input",
    {
      id: N,
      type: i,
      name: s,
      value: String(u),
      onChange: l,
      placeholder: m,
      disabled: g,
      required: h,
      className: n
    }
  );
  return i === "checkbox" ? /* @__PURE__ */ t("div", { className: "mb-4", children: [
    d(),
    c && /* @__PURE__ */ e("p", { className: "mt-1 text-sm text-red-600", children: c }),
    p && !c && /* @__PURE__ */ e("p", { className: "mt-1 text-sm text-slate-400", children: p })
  ] }) : /* @__PURE__ */ t("div", { className: "mb-4", children: [
    /* @__PURE__ */ t("label", { htmlFor: N, className: "block mb-1 text-sm font-semibold text-slate-800", children: [
      a,
      h && /* @__PURE__ */ e("span", { className: "text-red-600", children: " *" })
    ] }),
    d(),
    c && /* @__PURE__ */ e("p", { className: "mt-1 text-sm text-red-600", children: c }),
    p && !c && /* @__PURE__ */ e("p", { className: "mt-1 text-sm text-slate-400", children: p })
  ] });
}
function Qe({ pool: a, isEdit: s, onSubmit: i, onCancel: u, error: b }) {
  const [c, h] = o(a?.poolName ?? ""), [m, r] = o(a?.settings?.mfaConfiguration ?? "OFF"), [p, g] = o(a?.settings?.passwordPolicy?.minLength ?? 8), [N, l] = o(a?.settings?.passwordPolicy?.requireUppercase ?? !0), [n, d] = o(a?.settings?.passwordPolicy?.requireLowercase ?? !0), [x, A] = o(a?.settings?.passwordPolicy?.requireNumbers ?? !0), [E, y] = o(a?.settings?.passwordPolicy?.requireSymbols ?? !1), [P, I] = o(
    Object.entries(a?.customAttributes ?? {}).map(([S, k]) => ({ key: S, value: k }))
  ), [M, R] = o(!1), T = w(() => {
    I((S) => [...S, { key: "", value: "" }]);
  }, []), z = w((S) => {
    I((k) => k.filter((_, $) => $ !== S));
  }, []), v = w((S, k, _) => {
    I(
      ($) => $.map((Y, Q) => Q === S ? { ...Y, [k]: _ } : Y)
    );
  }, []), C = w(
    async (S) => {
      S.preventDefault(), R(!0);
      try {
        const k = {};
        for (const { key: _, value: $ } of P)
          _.trim() && (k[_.trim()] = $);
        await i({
          poolName: c,
          customAttributes: k,
          settings: {
            mfaConfiguration: m,
            passwordPolicy: {
              minLength: p,
              requireUppercase: N,
              requireLowercase: n,
              requireNumbers: x,
              requireSymbols: E
            }
          }
        });
      } finally {
        R(!1);
      }
    },
    [c, m, p, N, n, x, E, P, i]
  );
  return /* @__PURE__ */ t(F, { title: s ? "Edit Pool" : "Create Pool", className: "max-w-[640px]", children: [
    b && /* @__PURE__ */ e(V, { variant: "error", children: b }),
    /* @__PURE__ */ e(U, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: C, children: [
      /* @__PURE__ */ e(
        D,
        {
          label: "Pool Name",
          name: "poolName",
          value: c,
          onChange: (S) => h(String(S)),
          required: !0,
          placeholder: "my-user-pool"
        }
      ),
      /* @__PURE__ */ t("section", { className: "mb-6", children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-slate-800 mb-2", children: "MFA Configuration" }),
        /* @__PURE__ */ e(
          D,
          {
            label: "MFA Mode",
            name: "mfaConfig",
            type: "select",
            value: m,
            onChange: (S) => r(String(S)),
            options: [
              { value: "OFF", label: "Off" },
              { value: "OPTIONAL", label: "Optional" },
              { value: "REQUIRED", label: "Required" }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ t("section", { className: "mb-6", children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-slate-800 mb-2", children: "Password Policy" }),
        /* @__PURE__ */ e(
          D,
          {
            label: "Minimum Length",
            name: "minLength",
            type: "number",
            value: p,
            onChange: (S) => g(Number(S))
          }
        ),
        /* @__PURE__ */ e(
          D,
          {
            label: "Require Uppercase",
            name: "requireUppercase",
            type: "checkbox",
            value: N,
            onChange: (S) => l(!!S)
          }
        ),
        /* @__PURE__ */ e(
          D,
          {
            label: "Require Lowercase",
            name: "requireLowercase",
            type: "checkbox",
            value: n,
            onChange: (S) => d(!!S)
          }
        ),
        /* @__PURE__ */ e(
          D,
          {
            label: "Require Numbers",
            name: "requireNumbers",
            type: "checkbox",
            value: x,
            onChange: (S) => A(!!S)
          }
        ),
        /* @__PURE__ */ e(
          D,
          {
            label: "Require Symbols",
            name: "requireSymbols",
            type: "checkbox",
            value: E,
            onChange: (S) => y(!!S)
          }
        )
      ] }),
      /* @__PURE__ */ t("section", { className: "mb-6", children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-slate-800 mb-2", children: "Custom Attributes" }),
        P.map((S, k) => /* @__PURE__ */ t("div", { className: "flex gap-2 items-center mb-2", children: [
          /* @__PURE__ */ e(
            "input",
            {
              className: "flex-1 p-2 text-base border border-slate-200 rounded-sm bg-white text-slate-800",
              placeholder: "Attribute name",
              value: S.key,
              onChange: (_) => v(k, "key", _.target.value)
            }
          ),
          /* @__PURE__ */ e(
            "input",
            {
              className: "flex-1 p-2 text-base border border-slate-200 rounded-sm bg-white text-slate-800",
              placeholder: "Type (string, number, etc.)",
              value: S.value,
              onChange: (_) => v(k, "value", _.target.value)
            }
          ),
          /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => z(k), children: "Remove" })
        ] }, k)),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: T, children: "+ Add Attribute" })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-slate-100", children: [
        /* @__PURE__ */ e(f, { type: "submit", variant: "primary", size: "lg", disabled: M, children: M ? "Saving..." : s ? "Update Pool" : "Create Pool" }),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: u, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
const we = {
  CONFIRMED: "success",
  ACTIVE: "success",
  ENABLED: "success",
  UNCONFIRMED: "warning",
  PENDING: "warning",
  FORCE_CHANGE_PASSWORD: "caution",
  DISABLED: "danger",
  COMPROMISED: "danger",
  ARCHIVED: "neutral",
  UNKNOWN: "neutral"
}, Ce = {
  success: "success",
  warning: "warning",
  danger: "danger",
  info: "info",
  neutral: "neutral"
};
function le({ status: a, variant: s }) {
  const i = s ? Ce[s] || "neutral" : we[a] || "neutral";
  return /* @__PURE__ */ e(K, { tone: i, size: "sm", children: a });
}
function Ye({
  users: a,
  poolName: s,
  onCreateUser: i,
  onEditUser: u,
  onDeleteUser: b,
  loading: c
}) {
  const [h, m] = o(null), [r, p] = o(!1), g = w(
    async (n) => {
      p(!0);
      try {
        await b(n);
      } finally {
        p(!1), m(null);
      }
    },
    [b]
  ), N = G(
    () => [
      { key: "email", header: "Email", sortable: !0 },
      {
        key: "name",
        header: "Name",
        render: (n) => [n.givenName, n.familyName].filter(Boolean).join(" ") || "—"
      },
      {
        key: "status",
        header: "Status",
        width: "180px",
        render: (n) => /* @__PURE__ */ e(le, { status: n.status })
      },
      { key: "createdAt", header: "Created", sortable: !0 }
    ],
    []
  ), l = w(
    (n) => /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => u(n.userId), children: "Edit" }),
      /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => m(n.userId), children: "Delete" })
    ] }),
    [u]
  );
  return /* @__PURE__ */ t(
    F,
    {
      title: `Users — ${s}`,
      actions: /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: i, children: "Create User" }),
      children: [
        /* @__PURE__ */ e(
          X,
          {
            columns: N,
            data: a,
            keyField: "userId",
            actions: l,
            loading: c,
            emptyMessage: "No users in this pool yet.",
            emptyIcon: "👤"
          }
        ),
        /* @__PURE__ */ e(
          H,
          {
            open: !!h,
            onConfirm: () => h && g(h),
            onCancel: () => m(null),
            title: "Delete User",
            body: "This action cannot be undone. The user will be permanently removed.",
            tone: "destructive",
            confirmLabel: "Delete",
            confirmDisabled: r
          }
        )
      ]
    }
  );
}
function Je({
  user: a,
  isEdit: s,
  customAttributeDefinitions: i,
  onSubmit: u,
  onCancel: b,
  error: c
}) {
  const [h, m] = o(a?.email ?? ""), [r, p] = o(""), [g, N] = o(a?.givenName ?? ""), [l, n] = o(a?.familyName ?? ""), [d, x] = o(a?.nickname ?? ""), [A, E] = o(a?.picture ?? ""), [y, P] = o(a?.website ?? ""), [I, M] = o(
    Object.fromEntries(
      Object.entries(a?.customAttributes ?? {}).map(([C, S]) => [C, String(S)])
    )
  ), [R, T] = o(!1), z = w((C, S) => {
    M((k) => ({ ...k, [C]: S }));
  }, []), v = w(
    async (C) => {
      C.preventDefault(), T(!0);
      try {
        await u({
          email: h,
          ...!s && r ? { password: r } : {},
          givenName: g || void 0,
          familyName: l || void 0,
          nickname: d || void 0,
          picture: A || void 0,
          website: y || void 0,
          customAttributes: I
        });
      } finally {
        T(!1);
      }
    },
    [h, r, g, l, d, A, y, I, s, u]
  );
  return /* @__PURE__ */ t(F, { title: s ? "Edit User" : "Create User", className: "max-w-[640px]", children: [
    c && /* @__PURE__ */ e(V, { variant: "error", children: c }),
    /* @__PURE__ */ e(U, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: v, children: [
      /* @__PURE__ */ e(
        D,
        {
          label: "Email",
          name: "email",
          type: "email",
          value: h,
          onChange: (C) => m(String(C)),
          required: !0,
          placeholder: "user@example.com"
        }
      ),
      !s && /* @__PURE__ */ e(
        D,
        {
          label: "Password",
          name: "password",
          type: "password",
          value: r,
          onChange: (C) => p(String(C)),
          required: !0,
          placeholder: "Temporary password",
          helpText: "User will be prompted to change on first login."
        }
      ),
      /* @__PURE__ */ e(
        D,
        {
          label: "Given Name",
          name: "givenName",
          value: g,
          onChange: (C) => N(String(C)),
          placeholder: "John"
        }
      ),
      /* @__PURE__ */ e(
        D,
        {
          label: "Family Name",
          name: "familyName",
          value: l,
          onChange: (C) => n(String(C)),
          placeholder: "Doe"
        }
      ),
      /* @__PURE__ */ e(
        D,
        {
          label: "Nickname",
          name: "nickname",
          value: d,
          onChange: (C) => x(String(C)),
          placeholder: "johnny"
        }
      ),
      /* @__PURE__ */ e(
        D,
        {
          label: "Picture URL",
          name: "picture",
          value: A,
          onChange: (C) => E(String(C)),
          placeholder: "https://..."
        }
      ),
      /* @__PURE__ */ e(
        D,
        {
          label: "Website",
          name: "website",
          value: y,
          onChange: (C) => P(String(C)),
          placeholder: "https://..."
        }
      ),
      i && Object.keys(i).length > 0 && /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-slate-800 mt-6 mb-2", children: "Custom Attributes" }),
        Object.entries(i).map(([C, S]) => /* @__PURE__ */ e(
          D,
          {
            label: C,
            name: `custom_${C}`,
            type: S === "number" ? "number" : "text",
            value: I[C] ?? "",
            onChange: (k) => z(C, String(k)),
            helpText: `Type: ${S}`
          },
          C
        ))
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-slate-100", children: [
        /* @__PURE__ */ e(f, { type: "submit", variant: "primary", size: "lg", disabled: R, children: R ? "Saving..." : s ? "Update User" : "Create User" }),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: b, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
function Ze({
  groups: a,
  poolName: s,
  onCreateGroup: i,
  onEditGroup: u,
  onDeleteGroup: b,
  loading: c
}) {
  const [h, m] = o(null), [r, p] = o(!1), g = w(
    async (n) => {
      p(!0);
      try {
        await b(n);
      } finally {
        p(!1), m(null);
      }
    },
    [b]
  ), N = G(
    () => [
      { key: "groupName", header: "Name", sortable: !0 },
      { key: "description", header: "Description" },
      {
        key: "permissions",
        header: "Permissions",
        render: (n) => /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: n.permissions.length === 0 ? /* @__PURE__ */ e("span", { className: "text-slate-400 text-xs", children: "None" }) : n.permissions.map((d) => /* @__PURE__ */ e(K, { tone: "info", size: "xs", children: d }, d)) })
      }
    ],
    []
  ), l = w(
    (n) => /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => u(n.groupId), children: "Edit" }),
      /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => m(n.groupId), children: "Delete" })
    ] }),
    [u]
  );
  return /* @__PURE__ */ t(
    F,
    {
      title: `Groups — ${s}`,
      actions: /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: i, children: "Create Group" }),
      children: [
        /* @__PURE__ */ e(
          X,
          {
            columns: N,
            data: a,
            keyField: "groupId",
            actions: l,
            loading: c,
            emptyMessage: "No groups in this pool yet.",
            emptyIcon: "👥"
          }
        ),
        /* @__PURE__ */ e(
          H,
          {
            open: !!h,
            onConfirm: () => h && g(h),
            onCancel: () => m(null),
            title: "Delete Group",
            body: "This action cannot be undone. Members will lose their group permissions.",
            tone: "destructive",
            confirmLabel: "Delete",
            confirmDisabled: r
          }
        )
      ]
    }
  );
}
function et({
  group: a,
  isEdit: s,
  members: i,
  availableUsers: u,
  onSubmit: b,
  onAddMember: c,
  onRemoveMember: h,
  onCancel: m,
  error: r
}) {
  const [p, g] = o(a?.groupName ?? ""), [N, l] = o(a?.description ?? ""), [n, d] = o(a?.permissions ?? []), [x, A] = o(""), [E, y] = o(""), [P, I] = o(!1), M = w(
    (v) => {
      if (v.key === "Enter") {
        v.preventDefault();
        const C = x.trim();
        C && !n.includes(C) && d((S) => [...S, C]), A("");
      }
    },
    [x, n]
  ), R = w((v) => {
    d((C) => C.filter((S) => S !== v));
  }, []), T = w(async () => {
    E && c && (await c(E), y(""));
  }, [E, c]), z = w(
    async (v) => {
      v.preventDefault(), I(!0);
      try {
        await b({ groupName: p, description: N, permissions: n });
      } finally {
        I(!1);
      }
    },
    [p, N, n, b]
  );
  return /* @__PURE__ */ t(F, { title: s ? "Edit Group" : "Create Group", className: "max-w-[640px]", children: [
    r && /* @__PURE__ */ e(V, { variant: "error", children: r }),
    /* @__PURE__ */ e(U, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: z, children: [
      /* @__PURE__ */ e(
        D,
        {
          label: "Group Name",
          name: "groupName",
          value: p,
          onChange: (v) => g(String(v)),
          required: !0,
          placeholder: "admins"
        }
      ),
      /* @__PURE__ */ e(
        D,
        {
          label: "Description",
          name: "description",
          type: "textarea",
          value: N,
          onChange: (v) => l(String(v)),
          placeholder: "Describe this group's purpose..."
        }
      ),
      /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-slate-800 mt-6 mb-2", children: "Permissions" }),
        /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5 mb-2", children: n.map((v) => /* @__PURE__ */ t("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500 text-white text-sm font-medium", children: [
          v,
          /* @__PURE__ */ e(
            f,
            {
              variant: "ghost",
              size: "sm",
              className: "p-0 text-white text-[14px] leading-none min-w-0 min-h-0",
              onClick: () => R(v),
              "aria-label": `Remove permission ${v}`,
              children: "x"
            }
          )
        ] }, v)) }),
        /* @__PURE__ */ e(
          "input",
          {
            className: "w-full p-2 text-base border border-slate-200 rounded-sm bg-white text-slate-800 box-border",
            placeholder: "Type a permission and press Enter",
            value: x,
            onChange: (v) => A(v.target.value),
            onKeyDown: M
          }
        )
      ] }),
      s && i && /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-slate-800 mt-6 mb-2", children: "Members" }),
        i.length === 0 ? /* @__PURE__ */ e("p", { className: "text-slate-400 text-sm", children: "No members yet." }) : i.map((v) => /* @__PURE__ */ t("div", { className: "flex items-center justify-between py-1.5 border-b border-slate-200", children: [
          /* @__PURE__ */ e("span", { className: "text-base", children: v.email }),
          h && /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => h(v.userId), children: "Remove" })
        ] }, v.userId)),
        u && u.length > 0 && c && /* @__PURE__ */ t("div", { className: "flex gap-2 mt-2", children: [
          /* @__PURE__ */ t(
            "select",
            {
              className: "flex-1 p-2 text-base border border-slate-200 rounded-sm bg-white text-slate-800",
              value: E,
              onChange: (v) => y(v.target.value),
              children: [
                /* @__PURE__ */ e("option", { value: "", children: "Select user to add..." }),
                u.map((v) => /* @__PURE__ */ e("option", { value: v.userId, children: v.email }, v.userId))
              ]
            }
          ),
          /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: T, disabled: !E, children: "Add" })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-slate-100", children: [
        /* @__PURE__ */ e(f, { type: "submit", variant: "primary", size: "lg", disabled: P, children: P ? "Saving..." : s ? "Update Group" : "Create Group" }),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: m, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
function tt({
  applications: a,
  onCreateApp: s,
  onCreateAppWithPool: i,
  onEditApp: u,
  onDeleteApp: b,
  loading: c
}) {
  const [h, m] = o(null), [r, p] = o(!1), g = w(
    async (n) => {
      p(!0);
      try {
        await b(n);
      } finally {
        p(!1), m(null);
      }
    },
    [b]
  ), N = G(
    () => [
      { key: "clientName", header: "Name", sortable: !0 },
      {
        key: "clientId",
        header: "Client ID",
        render: (n) => /* @__PURE__ */ e("span", { className: "font-mono text-xs text-slate-500", children: n.clientId })
      },
      { key: "poolName", header: "Pool", render: (n) => n.poolName || n.poolId },
      {
        key: "redirectUris",
        header: "Redirect URIs",
        render: (n) => /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", children: [
          n.redirectUris.slice(0, 2).map((d) => /* @__PURE__ */ e(K, { tone: "neutral", size: "xs", children: d }, d)),
          n.redirectUris.length > 2 && /* @__PURE__ */ t(K, { tone: "neutral", size: "xs", children: [
            "+",
            n.redirectUris.length - 2,
            " more"
          ] })
        ] })
      }
    ],
    []
  ), l = w(
    (n) => /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => u(n.clientId), children: "Edit" }),
      /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => m(n.clientId), children: "Delete" })
    ] }),
    [u]
  );
  return /* @__PURE__ */ t(
    F,
    {
      title: "Applications",
      actions: /* @__PURE__ */ t(j, { children: [
        /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: s, children: "New Application" }),
        /* @__PURE__ */ e(f, { variant: "secondary", size: "lg", onClick: i, children: "New App + Pool" })
      ] }),
      children: [
        /* @__PURE__ */ e(
          X,
          {
            columns: N,
            data: a,
            keyField: "clientId",
            actions: l,
            loading: c,
            emptyMessage: "No applications registered yet.",
            emptyIcon: "🔐"
          }
        ),
        /* @__PURE__ */ e(
          H,
          {
            open: !!h,
            onConfirm: () => h && g(h),
            onCancel: () => m(null),
            title: "Delete Application",
            body: "This action cannot be undone. The application will lose access immediately.",
            tone: "destructive",
            confirmLabel: "Delete",
            confirmDisabled: r
          }
        )
      ]
    }
  );
}
function se({
  label: a,
  values: s,
  onChange: i,
  placeholder: u
}) {
  const b = () => i([...s, ""]), c = (m) => i(s.filter((r, p) => p !== m)), h = (m, r) => i(s.map((p, g) => g === m ? r : p));
  return /* @__PURE__ */ t("div", { className: "mb-4", children: [
    /* @__PURE__ */ e("label", { className: "block mb-1 text-sm font-semibold text-slate-800", children: a }),
    s.map((m, r) => /* @__PURE__ */ t("div", { className: "flex gap-2 items-center mb-1.5", children: [
      /* @__PURE__ */ e(
        "input",
        {
          className: "flex-1 p-2 text-base border border-slate-200 rounded-sm bg-white text-slate-800",
          value: m,
          onChange: (p) => h(r, p.target.value),
          placeholder: u
        }
      ),
      /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => c(r), children: "Remove" })
    ] }, r)),
    /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: b, children: "+ Add" })
  ] });
}
const ke = [
  "authorization_code",
  "client_credentials",
  "refresh_token"
], Se = ["code", "token", "id_token"];
function at({
  application: a,
  isEdit: s,
  pools: i,
  onSubmit: u,
  onCancel: b,
  error: c
}) {
  const [h, m] = o(a?.clientName ?? ""), [r, p] = o(a?.poolId ?? ""), [g, N] = o(a?.redirectUris ?? [""]), [l, n] = o(a?.postLogoutRedirectUris ?? []), [d, x] = o(a?.grantTypes ?? ["authorization_code"]), [A, E] = o(a?.responseTypes ?? ["code"]), [y, P] = o(a?.scope ?? "openid profile email"), [I, M] = o(!1), R = w((v) => {
    x(
      (C) => C.includes(v) ? C.filter((S) => S !== v) : [...C, v]
    );
  }, []), T = w((v) => {
    E(
      (C) => C.includes(v) ? C.filter((S) => S !== v) : [...C, v]
    );
  }, []), z = w(
    async (v) => {
      v.preventDefault(), M(!0);
      try {
        await u({
          clientName: h,
          poolId: r,
          redirectUris: g.filter((C) => C.trim()),
          postLogoutRedirectUris: l.filter((C) => C.trim()),
          grantTypes: d,
          responseTypes: A,
          scope: y
        });
      } finally {
        M(!1);
      }
    },
    [h, r, g, l, d, A, y, u]
  );
  return /* @__PURE__ */ t(F, { title: s ? "Edit Application" : "New Application", className: "max-w-[640px]", children: [
    c && /* @__PURE__ */ e(V, { variant: "error", children: c }),
    /* @__PURE__ */ e(U, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: z, children: [
      /* @__PURE__ */ e(
        D,
        {
          label: "Application Name",
          name: "clientName",
          value: h,
          onChange: (v) => m(String(v)),
          required: !0,
          placeholder: "My App"
        }
      ),
      /* @__PURE__ */ e(
        D,
        {
          label: "User Pool",
          name: "poolId",
          type: "select",
          value: r,
          onChange: (v) => p(String(v)),
          required: !0,
          options: i.map((v) => ({ value: v.poolId, label: v.poolName })),
          placeholder: "Select a pool..."
        }
      ),
      /* @__PURE__ */ e(
        se,
        {
          label: "Redirect URIs",
          values: g,
          onChange: N,
          placeholder: "https://app.example.com/callback"
        }
      ),
      /* @__PURE__ */ e(
        se,
        {
          label: "Post-Logout Redirect URIs",
          values: l,
          onChange: n,
          placeholder: "https://app.example.com/logout"
        }
      ),
      /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-slate-800 mt-6 mb-2", children: "Grant Types" }),
        /* @__PURE__ */ e("div", { className: "flex flex-col gap-2 mb-4", children: ke.map((v) => /* @__PURE__ */ t("label", { className: "flex items-center gap-2 text-base text-slate-800 cursor-pointer", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "checkbox",
              checked: d.includes(v),
              onChange: () => R(v)
            }
          ),
          v
        ] }, v)) })
      ] }),
      /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-slate-800 mt-6 mb-2", children: "Response Types" }),
        /* @__PURE__ */ e("div", { className: "flex flex-col gap-2 mb-4", children: Se.map((v) => /* @__PURE__ */ t("label", { className: "flex items-center gap-2 text-base text-slate-800 cursor-pointer", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "checkbox",
              checked: A.includes(v),
              onChange: () => T(v)
            }
          ),
          v
        ] }, v)) })
      ] }),
      /* @__PURE__ */ e(
        D,
        {
          label: "Scope",
          name: "scope",
          value: y,
          onChange: (v) => P(String(v)),
          placeholder: "openid profile email",
          helpText: "Space-separated list of scopes."
        }
      ),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-slate-100", children: [
        /* @__PURE__ */ e(f, { type: "submit", variant: "primary", size: "lg", disabled: I, children: I ? "Saving..." : s ? "Update Application" : "Create Application" }),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: b, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
const Ae = ["authorization_code", "client_credentials", "refresh_token"];
function lt({ onSubmit: a, onCancel: s, error: i }) {
  const [u, b] = o(""), [c, h] = o(""), [m, r] = o([""]), [p, g] = o(["authorization_code"]), [N, l] = o(!1), n = w((y) => {
    g(
      (P) => P.includes(y) ? P.filter((I) => I !== y) : [...P, y]
    );
  }, []), d = w(() => {
    r((y) => [...y, ""]);
  }, []), x = w((y) => {
    r((P) => P.filter((I, M) => M !== y));
  }, []), A = w((y, P) => {
    r((I) => I.map((M, R) => R === y ? P : M));
  }, []), E = w(
    async (y) => {
      y.preventDefault(), l(!0);
      try {
        await a({
          poolName: u,
          clientName: c,
          redirectUris: m.filter((P) => P.trim()),
          grantTypes: p
        });
      } finally {
        l(!1);
      }
    },
    [u, c, m, p, a]
  );
  return /* @__PURE__ */ t(F, { title: "New Application + Pool", description: "Create a user pool and register an application in one step.", className: "max-w-[640px]", children: [
    i && /* @__PURE__ */ e(V, { variant: "error", children: i }),
    /* @__PURE__ */ e(U, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: E, children: [
      /* @__PURE__ */ e(
        D,
        {
          label: "Pool Name",
          name: "poolName",
          value: u,
          onChange: (y) => b(String(y)),
          required: !0,
          placeholder: "my-user-pool"
        }
      ),
      /* @__PURE__ */ e(
        D,
        {
          label: "Application Name",
          name: "clientName",
          value: c,
          onChange: (y) => h(String(y)),
          required: !0,
          placeholder: "My App"
        }
      ),
      /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-slate-800 mt-6 mb-2", children: "Redirect URIs" }),
        m.map((y, P) => /* @__PURE__ */ t("div", { className: "flex gap-2 items-center mb-1.5", children: [
          /* @__PURE__ */ e(
            "input",
            {
              className: "flex-1 p-2 text-base border border-slate-200 rounded-sm bg-white text-slate-800",
              value: y,
              onChange: (I) => A(P, I.target.value),
              placeholder: "https://app.example.com/callback"
            }
          ),
          m.length > 1 && /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => x(P), children: "Remove" })
        ] }, P)),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: d, children: "+ Add URI" })
      ] }),
      /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-slate-800 mt-6 mb-2", children: "Grant Types" }),
        /* @__PURE__ */ e("div", { className: "flex flex-col gap-2 mb-4", children: Ae.map((y) => /* @__PURE__ */ t("label", { className: "flex items-center gap-2 text-base text-slate-800 cursor-pointer", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "checkbox",
              checked: p.includes(y),
              onChange: () => n(y)
            }
          ),
          y
        ] }, y)) })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-slate-100", children: [
        /* @__PURE__ */ e(f, { type: "submit", variant: "primary", size: "lg", disabled: N, children: N ? "Creating..." : "Create Pool + Application" }),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: s, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
function nt({
  templates: a,
  onCreateTemplate: s,
  onEditTemplate: i,
  onDeleteTemplate: u,
  onTestSend: b,
  loading: c
}) {
  const [h, m] = o(null), [r, p] = o(!1), [g, N] = o(null), [l, n] = o(""), [d, x] = o(!1), A = w(
    async (I) => {
      p(!0);
      try {
        await u(I);
      } finally {
        p(!1), m(null);
      }
    },
    [u]
  ), E = w(async () => {
    if (!(!g || !l.trim())) {
      x(!0);
      try {
        await b(g, l.trim()), N(null), n("");
      } finally {
        x(!1);
      }
    }
  }, [g, l, b]), y = G(
    () => [
      { key: "name", header: "Name", sortable: !0 },
      { key: "subject", header: "Subject" }
    ],
    []
  ), P = w(
    (I) => /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => i(I.templateId), children: "Edit" }),
      /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => {
        N(I.templateId), n("");
      }, children: "Test Send" }),
      /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => m(I.templateId), children: "Delete" })
    ] }),
    [i]
  );
  return /* @__PURE__ */ t(
    F,
    {
      title: "Email Templates",
      actions: /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: s, children: "Create Template" }),
      children: [
        /* @__PURE__ */ e(
          X,
          {
            columns: y,
            data: a,
            keyField: "templateId",
            actions: P,
            loading: c,
            emptyMessage: "No email templates configured.",
            emptyIcon: "✉️"
          }
        ),
        /* @__PURE__ */ e(
          ye,
          {
            open: !!g,
            onClose: () => N(null),
            title: "Send Test Email",
            footer: /* @__PURE__ */ t(j, { children: [
              /* @__PURE__ */ e(f, { variant: "ghost", size: "md", onClick: () => N(null), children: "Cancel" }),
              /* @__PURE__ */ e(f, { variant: "primary", size: "md", onClick: E, disabled: d || !l.trim(), children: d ? "Sending..." : "Send" })
            ] }),
            children: /* @__PURE__ */ e(
              D,
              {
                label: "Recipient Email",
                name: "test-email",
                type: "email",
                value: l,
                onChange: (I) => n(String(I)),
                placeholder: "recipient@example.com"
              }
            )
          }
        ),
        /* @__PURE__ */ e(
          H,
          {
            open: !!h,
            onConfirm: () => h && A(h),
            onCancel: () => m(null),
            title: "Delete Template",
            body: "This action cannot be undone. The template will be permanently removed.",
            tone: "destructive",
            confirmLabel: "Delete",
            confirmDisabled: r
          }
        )
      ]
    }
  );
}
function it({
  template: a,
  isEdit: s,
  onSubmit: i,
  onCancel: u,
  error: b
}) {
  const [c, h] = o(a?.name ?? ""), [m, r] = o(a?.subject ?? ""), [p, g] = o(a?.htmlBody ?? ""), [N, l] = o(a?.textBody ?? ""), [n, d] = o(a?.variables ?? []), [x, A] = o(""), [E, y] = o(!1), [P, I] = o(!1), M = w(
    (z) => {
      if (z.key === "Enter") {
        z.preventDefault();
        const v = x.trim();
        v && !n.includes(v) && d((C) => [...C, v]), A("");
      }
    },
    [x, n]
  ), R = w((z) => {
    d((v) => v.filter((C) => C !== z));
  }, []), T = w(
    async (z) => {
      z.preventDefault(), I(!0);
      try {
        await i({ name: c, subject: m, htmlBody: p, textBody: N, variables: n });
      } finally {
        I(!1);
      }
    },
    [c, m, p, N, n, i]
  );
  return /* @__PURE__ */ t(F, { title: s ? "Edit Email Template" : "Create Email Template", className: "max-w-[800px]", children: [
    b && /* @__PURE__ */ e(V, { variant: "error", children: b }),
    /* @__PURE__ */ e(U, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: T, children: [
      /* @__PURE__ */ e(
        D,
        {
          label: "Template Name",
          name: "name",
          value: c,
          onChange: (z) => h(String(z)),
          required: !0,
          placeholder: "welcome-email"
        }
      ),
      /* @__PURE__ */ e(
        D,
        {
          label: "Subject",
          name: "subject",
          value: m,
          onChange: (z) => r(String(z)),
          required: !0,
          placeholder: "Welcome to {{appName}}"
        }
      ),
      /* @__PURE__ */ t("div", { className: "mb-4", children: [
        /* @__PURE__ */ t("div", { className: "flex items-center justify-between mb-1", children: [
          /* @__PURE__ */ e("label", { className: "text-sm font-semibold text-slate-800", children: "HTML Body" }),
          /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => y((z) => !z), children: E ? "Hide Preview" : "Show Preview" })
        ] }),
        /* @__PURE__ */ e(
          "textarea",
          {
            value: p,
            onChange: (z) => g(z.target.value),
            placeholder: "<html><body>...</body></html>",
            rows: 10,
            className: "w-full p-2 text-base border border-slate-200 rounded-sm bg-white text-slate-800 resize-y box-border font-mono"
          }
        ),
        E && /* @__PURE__ */ e(
          "div",
          {
            className: "border border-slate-200 rounded-sm p-4 bg-white min-h-[200px] mt-2",
            dangerouslySetInnerHTML: { __html: p }
          }
        )
      ] }),
      /* @__PURE__ */ e(
        D,
        {
          label: "Text Body",
          name: "textBody",
          type: "textarea",
          value: N,
          onChange: (z) => l(String(z)),
          placeholder: "Plain text version of the email..."
        }
      ),
      /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-slate-800 mt-6 mb-2", children: "Variables" }),
        /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5 mb-2", children: n.map((z) => /* @__PURE__ */ t("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500 text-white text-sm font-medium", children: [
          "{{" + z + "}}",
          /* @__PURE__ */ e(
            f,
            {
              variant: "ghost",
              size: "sm",
              className: "p-0 text-white text-[14px] leading-none min-w-0 min-h-0",
              onClick: () => R(z),
              "aria-label": `Remove variable ${z}`,
              children: "x"
            }
          )
        ] }, z)) }),
        /* @__PURE__ */ e(
          "input",
          {
            className: "w-full p-2 text-base border border-slate-200 rounded-sm bg-white text-slate-800 box-border",
            placeholder: "Type variable name and press Enter",
            value: x,
            onChange: (z) => A(z.target.value),
            onKeyDown: M
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-slate-100", children: [
        /* @__PURE__ */ e(f, { type: "submit", variant: "primary", size: "lg", disabled: P, children: P ? "Saving..." : s ? "Update Template" : "Create Template" }),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: u, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
function st({
  metrics: a,
  users: s,
  pools: i,
  onRefresh: u,
  loading: b
}) {
  const [c, h] = o(""), m = G(() => s ?? [], [s]), r = G(
    () => [
      { key: "email", header: "Email", sortable: !0 },
      {
        key: "mfaEnabled",
        header: "MFA Status",
        width: "140px",
        render: (g) => /* @__PURE__ */ e(
          le,
          {
            status: g.mfaEnabled ? "ENABLED" : "DISABLED",
            variant: g.mfaEnabled ? "success" : "warning"
          }
        )
      },
      { key: "deviceCount", header: "Devices", width: "100px" }
    ],
    []
  );
  return b ? /* @__PURE__ */ t(F, { title: "MFA Management", children: [
    /* @__PURE__ */ e("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4", children: [1, 2, 3, 4].map((g) => /* @__PURE__ */ t(U, { padding: "md", children: [
      /* @__PURE__ */ e("div", { className: "h-5 w-12 rounded bg-slate-100 animate-pulse mb-2" }),
      /* @__PURE__ */ e("div", { className: "h-3 w-20 rounded bg-slate-100 animate-pulse" })
    ] }, g)) }),
    /* @__PURE__ */ e(U, { className: "h-[200px] animate-pulse" })
  ] }) : /* @__PURE__ */ t(
    F,
    {
      title: "MFA Management",
      actions: /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: u, children: "Refresh" }),
      children: [
        a && /* @__PURE__ */ t("section", { className: "grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4", children: [
          /* @__PURE__ */ t(U, { padding: "md", children: [
            /* @__PURE__ */ e("div", { className: "text-[1.75rem] font-bold text-blue-600 mb-1", children: a.totalUsers }),
            /* @__PURE__ */ e("div", { className: "text-sm text-slate-500", children: "Total Users" })
          ] }),
          /* @__PURE__ */ t(U, { padding: "md", children: [
            /* @__PURE__ */ e("div", { className: "text-[1.75rem] font-bold text-green-600 mb-1", children: a.mfaEnabled }),
            /* @__PURE__ */ e("div", { className: "text-sm text-slate-500", children: "MFA Enabled" })
          ] }),
          /* @__PURE__ */ t(U, { padding: "md", children: [
            /* @__PURE__ */ e("div", { className: "text-[1.75rem] font-bold text-amber-600 mb-1", children: a.mfaDisabled }),
            /* @__PURE__ */ e("div", { className: "text-sm text-slate-500", children: "MFA Disabled" })
          ] }),
          /* @__PURE__ */ t(U, { padding: "md", children: [
            /* @__PURE__ */ t("div", { className: "text-[1.75rem] font-bold text-blue-600 mb-1", children: [
              a.adoptionRate,
              "%"
            ] }),
            /* @__PURE__ */ e("div", { className: "text-sm text-slate-500", children: "Adoption Rate" })
          ] })
        ] }),
        i && i.length > 0 && /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-slate-500 uppercase tracking-wide", children: "Filter by pool" }),
          /* @__PURE__ */ t("select", { className: "px-3 py-2 text-sm border border-slate-200 rounded-md bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-shadow", value: c, onChange: (g) => h(g.target.value), children: [
            /* @__PURE__ */ e("option", { value: "", children: "All Pools" }),
            i.map((g) => /* @__PURE__ */ t("option", { value: g.poolId, children: [
              g.poolName,
              " (",
              g.userCount,
              " users)"
            ] }, g.poolId))
          ] })
        ] }),
        /* @__PURE__ */ e(
          X,
          {
            columns: r,
            data: m,
            keyField: "userId",
            emptyMessage: "No user MFA data available.",
            emptyIcon: "🔑"
          }
        )
      ]
    }
  );
}
const Ie = ["", "user", "pool", "client", "group", "template"];
function rt({
  records: a,
  onQuery: s,
  onViewEntity: i,
  onReplay: u,
  loading: b,
  totalRecords: c
}) {
  const [h, m] = o(""), [r, p] = o(""), [g, N] = o(""), [l, n] = o(""), [d, x] = o("50"), [A, E] = o(""), [y, P] = o(""), [I, M] = o(null), [R, T] = o(!1), z = w(async () => {
    await s({
      entityType: h || void 0,
      entityId: r || void 0,
      fromTime: g ? new Date(g).getTime() : void 0,
      toTime: l ? new Date(l).getTime() : void 0,
      limit: d ? Number(d) : void 0
    });
  }, [h, r, g, l, d, s]), v = w(async () => {
    if (!(!A || !y)) {
      T(!0);
      try {
        const k = await u(A, new Date(y).getTime());
        M(k);
      } finally {
        T(!1);
      }
    }
  }, [A, y, u]), C = G(
    () => [
      {
        key: "timestamp",
        header: "Timestamp",
        sortable: !0,
        render: (k) => /* @__PURE__ */ e("span", { className: "font-mono text-xs text-slate-500", children: new Date(k.timestamp).toLocaleString() })
      },
      {
        key: "actor",
        header: "Actor",
        render: (k) => typeof k.actor == "string" ? k.actor : k.actor?.email || k.actor?.id || JSON.stringify(k.actor)
      },
      { key: "entityType", header: "Entity Type" },
      {
        key: "entityId",
        header: "Entity ID",
        render: (k) => /* @__PURE__ */ e(
          f,
          {
            variant: "ghost",
            size: "sm",
            className: "p-0 underline text-blue-600 font-mono text-xs",
            onClick: () => i(k.entityType, k.entityId),
            children: k.entityId
          }
        )
      },
      { key: "operation", header: "Operation" }
    ],
    [i]
  ), S = "px-3 py-2 text-sm border border-slate-200 rounded-md bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-shadow";
  return /* @__PURE__ */ t(F, { title: "Audit Log", children: [
    /* @__PURE__ */ e(U, { padding: "md", children: /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-4 items-end", children: [
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-slate-500 uppercase tracking-wide", children: "Entity Type" }),
        /* @__PURE__ */ t("select", { className: S, value: h, onChange: (k) => m(k.target.value), children: [
          /* @__PURE__ */ e("option", { value: "", children: "All" }),
          Ie.filter(Boolean).map((k) => /* @__PURE__ */ e("option", { value: k, children: k }, k))
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-slate-500 uppercase tracking-wide", children: "Entity ID" }),
        /* @__PURE__ */ e("input", { className: S, value: r, onChange: (k) => p(k.target.value), placeholder: "Optional" })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-slate-500 uppercase tracking-wide", children: "From" }),
        /* @__PURE__ */ e("input", { className: S, type: "datetime-local", value: g, onChange: (k) => N(k.target.value) })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-slate-500 uppercase tracking-wide", children: "To" }),
        /* @__PURE__ */ e("input", { className: S, type: "datetime-local", value: l, onChange: (k) => n(k.target.value) })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-slate-500 uppercase tracking-wide", children: "Limit" }),
        /* @__PURE__ */ e("input", { className: `${S} w-[70px]`, type: "number", value: d, onChange: (k) => x(k.target.value) })
      ] }),
      /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: z, disabled: b, children: b ? "Querying..." : "Query" })
    ] }) }),
    c !== void 0 && /* @__PURE__ */ t("p", { className: "text-sm text-slate-400 m-0", children: [
      c,
      " total record(s)"
    ] }),
    /* @__PURE__ */ e(
      X,
      {
        columns: C,
        data: a,
        keyField: "timestamp",
        loading: b,
        emptyMessage: "No audit records found. Adjust filters and query.",
        emptyIcon: "📜"
      }
    ),
    /* @__PURE__ */ t(U, { padding: "md", children: [
      /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-slate-900 mb-4 mt-0", children: "Point-in-Time Replay" }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-4 items-end mb-4", children: [
        /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-slate-500 uppercase tracking-wide", children: "Entity ID" }),
          /* @__PURE__ */ e("input", { className: S, value: A, onChange: (k) => E(k.target.value), placeholder: "entity-id" })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-slate-500 uppercase tracking-wide", children: "At Timestamp" }),
          /* @__PURE__ */ e("input", { className: S, type: "datetime-local", value: y, onChange: (k) => P(k.target.value) })
        ] }),
        /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: v, disabled: R || !A || !y, children: R ? "Replaying..." : "Replay" })
      ] }),
      I && /* @__PURE__ */ e("pre", { className: "p-4 bg-slate-50 border border-slate-200 rounded-md font-mono text-xs text-slate-700 overflow-x-auto whitespace-pre-wrap max-h-[300px] overflow-y-auto m-0", children: JSON.stringify(I, null, 2) })
    ] })
  ] });
}
function ot({ status: a, onNavigate: s }) {
  const [i, u] = o(null), b = w((r) => {
    u((p) => p === r ? null : r);
  }, []), c = G(
    () => [
      {
        title: "Create User Pool",
        done: a.hasUserPools,
        content: /* @__PURE__ */ t("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ e("p", { className: "m-0 text-sm text-slate-600", children: a.hasUserPools ? `${a.poolCount} pool(s) configured.` : "No user pools yet." }),
          /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => s("/identity/admin/pools/new"), children: "Create a User Pool" }) })
        ] })
      },
      {
        title: "Register Application",
        done: a.hasClients,
        content: /* @__PURE__ */ t("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ e("p", { className: "m-0 text-sm text-slate-600", children: a.hasClients ? `${a.clientCount} application(s) registered.` : "No applications registered." }),
          /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => s("/identity/admin/applications/new"), children: "Register an Application" }) })
        ] })
      },
      {
        title: "Create Admin User",
        done: a.hasAdminUser,
        content: /* @__PURE__ */ t("div", { className: "flex flex-col gap-2", children: [
          a.hasAdminUser ? /* @__PURE__ */ t(j, { children: [
            /* @__PURE__ */ t("p", { className: "m-0 text-sm text-slate-600", children: [
              "Admin users: ",
              a.adminEmails.join(", ")
            ] }),
            /* @__PURE__ */ t("p", { className: "m-0 text-sm text-slate-600", children: [
              a.totalUsers,
              " total user(s) across all pools."
            ] })
          ] }) : /* @__PURE__ */ e("p", { className: "m-0 text-sm text-slate-600", children: "No admin user found. Create one in a user pool." }),
          a.firstPoolId && /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => s(`/identity/admin/pools/${a.firstPoolId}/users/new`), children: "Create Admin User" }) })
        ] })
      },
      {
        title: "Configure SMTP",
        done: a.smtpConfigured,
        content: /* @__PURE__ */ e("p", { className: "m-0 text-sm text-slate-600", children: a.smtpConfigured ? `SMTP configured: ${a.smtpHost}` : "SMTP is not yet configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS environment variables." })
      },
      {
        title: "Configure Issuer",
        done: a.issuerConfigured,
        content: /* @__PURE__ */ t("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ t("p", { className: "m-0 text-sm text-slate-600", children: [
            "Issuer: ",
            /* @__PURE__ */ e("code", { className: "px-1.5 py-0.5 bg-slate-100 rounded text-xs font-mono", children: a.issuer || "Not set" })
          ] }),
          a.wellKnownUrl && /* @__PURE__ */ t("p", { className: "m-0 text-sm text-slate-600", children: [
            "Well-known URL:",
            " ",
            /* @__PURE__ */ e("a", { href: a.wellKnownUrl, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 underline", children: a.wellKnownUrl })
          ] })
        ] })
      },
      {
        title: "Test Integration",
        done: a.hasUserPools && a.hasClients && a.issuerConfigured,
        content: /* @__PURE__ */ e("div", { className: "flex flex-col gap-3", children: a.firstClientId ? /* @__PURE__ */ t(j, { children: [
          /* @__PURE__ */ t("p", { className: "m-0 text-sm text-slate-600", children: [
            "Client ID: ",
            /* @__PURE__ */ e("code", { className: "px-1.5 py-0.5 bg-slate-100 rounded text-xs font-mono", children: a.firstClientId })
          ] }),
          /* @__PURE__ */ e("p", { className: "m-0 text-sm text-slate-600", children: "Use this code snippet to test the OIDC authorization flow:" }),
          /* @__PURE__ */ e("pre", { className: "px-4 py-3 bg-slate-900 text-slate-200 rounded-md font-mono text-xs overflow-x-auto whitespace-pre m-0", children: `// OIDC Authorization Code Flow
const authUrl = \`\${issuer}/authorize?\` + new URLSearchParams({
  client_id: '${a.firstClientId}',
  response_type: 'code',
  redirect_uri: 'http://localhost:3000/callback',
  scope: 'openid profile email',
}).toString();

window.location.href = authUrl;` })
        ] }) : /* @__PURE__ */ e("p", { className: "m-0 text-sm text-slate-600", children: "Complete the previous steps first to test the integration." }) })
      }
    ],
    [a, s]
  ), h = c.filter((r) => r.done).length, m = Math.round(h / c.length * 100);
  return /* @__PURE__ */ t(
    F,
    {
      title: "Setup Guide",
      description: `${h} of ${c.length} steps completed (${m}%)`,
      children: [
        /* @__PURE__ */ e("div", { className: "h-2 bg-slate-100 rounded-full overflow-hidden", children: /* @__PURE__ */ e(
          "div",
          {
            className: "h-full bg-green-500 rounded-full transition-[width] duration-300 ease-in-out",
            style: { width: `${m}%` }
          }
        ) }),
        /* @__PURE__ */ e("div", { className: "flex flex-col gap-2", children: c.map((r, p) => /* @__PURE__ */ t(U, { children: [
          /* @__PURE__ */ t(
            "div",
            {
              className: "flex items-center justify-between px-5 py-4 cursor-pointer select-none",
              onClick: () => b(p),
              role: "button",
              "aria-expanded": i === p,
              children: [
                /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ e(
                    "div",
                    {
                      className: O(
                        "w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0",
                        r.done ? "bg-green-500 text-white" : "bg-slate-100 text-slate-400"
                      ),
                      children: r.done ? "✓" : p + 1
                    }
                  ),
                  /* @__PURE__ */ e("span", { className: "text-sm font-medium text-slate-800", children: r.title })
                ] }),
                /* @__PURE__ */ e("span", { className: "text-slate-400 text-sm", children: i === p ? "▲" : "▼" })
              ]
            }
          ),
          i === p && /* @__PURE__ */ e("div", { className: "px-5 pb-5 pt-0 border-t border-slate-100", children: /* @__PURE__ */ e("div", { className: "pt-4", children: r.content }) })
        ] }, p)) })
      ]
    }
  );
}
function Pe({ data: a }) {
  return /* @__PURE__ */ e("pre", { className: "p-5 font-mono text-xs text-slate-700 overflow-x-auto whitespace-pre-wrap max-h-[400px] overflow-y-auto m-0 bg-slate-50", children: JSON.stringify(a, null, 2) });
}
function Te({ rates: a }) {
  const s = Object.entries(a);
  return s.length === 0 ? /* @__PURE__ */ e("p", { className: "p-5 text-center text-slate-400 text-sm m-0", children: "No rate limiter data available." }) : /* @__PURE__ */ t(J, { children: [
    /* @__PURE__ */ e(Z, { children: /* @__PURE__ */ t("tr", { children: [
      /* @__PURE__ */ e(q, { children: "Key" }),
      /* @__PURE__ */ e(q, { children: "Value" })
    ] }) }),
    /* @__PURE__ */ e(ee, { children: s.map(([i, u]) => /* @__PURE__ */ t(te, { children: [
      /* @__PURE__ */ e(B, { className: "font-mono text-xs", children: i }),
      /* @__PURE__ */ e(B, { children: typeof u == "object" ? JSON.stringify(u) : String(u) })
    ] }, i)) })
  ] });
}
function ct({
  diagnostics: a,
  rates: s,
  dlq: i,
  onRedrive: u,
  onPurge: b,
  onRefresh: c,
  loading: h
}) {
  const [m, r] = o(!1), p = ce(null);
  de(() => (m ? p.current = setInterval(c, 1e4) : p.current && (clearInterval(p.current), p.current = null), () => {
    p.current && clearInterval(p.current);
  }), [m, c]);
  const g = w(
    async (l) => {
      await u(l);
    },
    [u]
  ), N = w(
    async (l) => {
      await b(l);
    },
    [b]
  );
  return h ? /* @__PURE__ */ e(F, { title: "Diagnostics", children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-4", children: [1, 2, 3].map((l) => /* @__PURE__ */ e(U, { className: "h-[120px] animate-pulse" }, l)) }) }) : /* @__PURE__ */ t(
    F,
    {
      title: "Diagnostics",
      actions: /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ t("label", { className: "flex items-center gap-1.5 text-sm text-slate-500 cursor-pointer", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "checkbox",
              checked: m,
              onChange: (l) => r(l.target.checked),
              className: "rounded"
            }
          ),
          "Auto-refresh (10s)"
        ] }),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: c, children: "Refresh" })
      ] }),
      children: [
        /* @__PURE__ */ t(U, { children: [
          /* @__PURE__ */ e("div", { className: "px-5 py-3 border-b border-slate-200 bg-slate-50", children: /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-slate-700 m-0", children: "Node / Cluster Diagnostics" }) }),
          a ? /* @__PURE__ */ e(Pe, { data: a }) : /* @__PURE__ */ e("p", { className: "p-5 text-center text-slate-400 text-sm m-0", children: "No diagnostics data available." })
        ] }),
        /* @__PURE__ */ t(U, { children: [
          /* @__PURE__ */ e("div", { className: "px-5 py-3 border-b border-slate-200 bg-slate-50", children: /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-slate-700 m-0", children: "Rate Limiter Stats" }) }),
          s ? /* @__PURE__ */ e(Te, { rates: s }) : /* @__PURE__ */ e("p", { className: "p-5 text-center text-slate-400 text-sm m-0", children: "No rate data available." })
        ] }),
        /* @__PURE__ */ t(U, { children: [
          /* @__PURE__ */ e("div", { className: "px-5 py-3 border-b border-slate-200 bg-slate-50", children: /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-slate-700 m-0", children: "Dead Letter Queue" }) }),
          !i || i.length === 0 ? /* @__PURE__ */ e("p", { className: "p-5 text-center text-slate-400 text-sm m-0", children: "Dead letter queue is empty." }) : /* @__PURE__ */ t(J, { children: [
            /* @__PURE__ */ e(Z, { children: /* @__PURE__ */ t("tr", { children: [
              /* @__PURE__ */ e(q, { children: "ID" }),
              /* @__PURE__ */ e(q, { children: "Error" }),
              /* @__PURE__ */ e(q, { children: "Failed At" }),
              /* @__PURE__ */ e(q, { children: "Retries" }),
              /* @__PURE__ */ e(q, { className: "text-right", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ e(ee, { children: i.map((l) => /* @__PURE__ */ t(te, { children: [
              /* @__PURE__ */ t(B, { className: "font-mono text-xs", children: [
                l.id.substring(0, 12),
                "..."
              ] }),
              /* @__PURE__ */ e(B, { children: /* @__PURE__ */ e(K, { tone: "danger", size: "xs", children: l.error }) }),
              /* @__PURE__ */ e(B, { className: "text-xs text-slate-500", children: new Date(l.failedAt).toLocaleString() }),
              /* @__PURE__ */ e(B, { children: /* @__PURE__ */ e(K, { tone: "neutral", size: "xs", mono: !0, children: l.retryCount }) }),
              /* @__PURE__ */ e(B, { className: "text-right", children: /* @__PURE__ */ t("div", { className: "flex items-center justify-end gap-2", children: [
                /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => g(l.id), children: "Redrive" }),
                /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => N(l.id), children: "Purge" })
              ] }) })
            ] }, l.id)) })
          ] })
        ] })
      ]
    }
  );
}
function dt({
  uid: a,
  interactionUrl: s,
  clientName: i,
  logoUrl: u,
  error: b = null,
  onLogin: c,
  onRegister: h,
  onForgotPassword: m,
  registrationEnabled: r = !0,
  forgotPasswordEnabled: p = !0
}) {
  const [g, N] = o("signin"), [l, n] = o(!1), [d, x] = o(null), [A, E] = o(""), [y, P] = o(""), [I, M] = o(""), [R, T] = o(""), [z, v] = o(""), [C, S] = o(""), [k, _] = o(""), [$, Y] = o(!1), [Q, ue] = o(""), [pe, ne] = o(!1), ie = b || d, fe = w(async (L) => {
    L.preventDefault(), x(null), n(!0);
    try {
      await c(A, y);
    } catch (W) {
      x(W instanceof Error ? W.message : "Login failed");
    } finally {
      n(!1);
    }
  }, [A, y, c]), ge = w(async (L) => {
    if (L.preventDefault(), x(null), R !== z) {
      x("Passwords do not match");
      return;
    }
    n(!0);
    try {
      await h({
        email: I,
        password: R,
        givenName: C || void 0,
        familyName: k || void 0,
        enableMfa: $ || void 0
      });
    } catch (W) {
      x(W instanceof Error ? W.message : "Registration failed");
    } finally {
      n(!1);
    }
  }, [I, R, z, C, k, $, h]), be = w(async (L) => {
    L.preventDefault(), x(null), n(!0);
    try {
      await m(Q), ne(!0);
    } catch (W) {
      x(W instanceof Error ? W.message : "Request failed");
    } finally {
      n(!1);
    }
  }, [Q, m]), ae = (L) => {
    N(L), x(null), ne(!1);
  };
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-slate-50", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[440px] bg-white rounded-xl shadow-md p-8", role: "main", "aria-label": "Authentication", children: [
    /* @__PURE__ */ t("header", { className: "flex flex-col items-center gap-3 mb-6", children: [
      u && /* @__PURE__ */ e("img", { src: u, alt: "", className: "w-14 h-14 object-contain rounded-md" }),
      i && /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-slate-800 m-0", children: i })
    ] }),
    /* @__PURE__ */ t("nav", { className: "flex border-b border-slate-200 mb-6", role: "tablist", "aria-label": "Authentication method", children: [
      /* @__PURE__ */ e(
        f,
        {
          variant: "ghost",
          size: "sm",
          role: "tab",
          "aria-selected": g === "signin",
          className: O(
            "flex-1 rounded-none border-b-2",
            g === "signin" ? "border-b-[#3b82f6] text-blue-600 font-semibold" : "border-b-transparent text-slate-500 font-normal"
          ),
          onClick: () => ae("signin"),
          children: "Sign In"
        }
      ),
      r && /* @__PURE__ */ e(
        f,
        {
          variant: "ghost",
          size: "sm",
          role: "tab",
          "aria-selected": g === "register",
          className: O(
            "flex-1 rounded-none border-b-2",
            g === "register" ? "border-b-[#3b82f6] text-blue-600 font-semibold" : "border-b-transparent text-slate-500 font-normal"
          ),
          onClick: () => ae("register"),
          children: "Register"
        }
      ),
      p && /* @__PURE__ */ e(
        f,
        {
          variant: "ghost",
          size: "sm",
          role: "tab",
          "aria-selected": g === "forgot",
          className: O(
            "flex-1 rounded-none border-b-2",
            g === "forgot" ? "border-b-[#3b82f6] text-blue-600 font-semibold" : "border-b-transparent text-slate-500 font-normal"
          ),
          onClick: () => ae("forgot"),
          children: "Forgot Password"
        }
      )
    ] }),
    ie && /* @__PURE__ */ e("div", { className: "mb-5", children: /* @__PURE__ */ e(V, { variant: "error", children: ie }) }),
    g === "signin" && /* @__PURE__ */ t("form", { onSubmit: fe, "aria-label": "Sign in form", children: [
      /* @__PURE__ */ e("input", { type: "hidden", name: "uid", value: a }),
      /* @__PURE__ */ e(
        D,
        {
          label: "Email",
          name: "login-email",
          type: "email",
          value: A,
          onChange: (L) => E(String(L)),
          required: !0,
          placeholder: "you@example.com",
          disabled: l
        }
      ),
      /* @__PURE__ */ e(
        D,
        {
          label: "Password",
          name: "login-password",
          type: "password",
          value: y,
          onChange: (L) => P(String(L)),
          required: !0,
          disabled: l
        }
      ),
      /* @__PURE__ */ e(
        f,
        {
          type: "submit",
          variant: "primary",
          size: "lg",
          fullWidth: !0,
          disabled: l,
          children: l ? "Signing in..." : "Sign In"
        }
      )
    ] }),
    g === "register" && /* @__PURE__ */ t("form", { onSubmit: ge, "aria-label": "Registration form", children: [
      /* @__PURE__ */ e(
        D,
        {
          label: "Email",
          name: "reg-email",
          type: "email",
          value: I,
          onChange: (L) => M(String(L)),
          required: !0,
          placeholder: "you@example.com",
          disabled: l
        }
      ),
      /* @__PURE__ */ t("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ e("div", { className: "flex-1", children: /* @__PURE__ */ e(
          D,
          {
            label: "Given Name",
            name: "reg-given",
            value: C,
            onChange: (L) => S(String(L)),
            disabled: l
          }
        ) }),
        /* @__PURE__ */ e("div", { className: "flex-1", children: /* @__PURE__ */ e(
          D,
          {
            label: "Family Name",
            name: "reg-family",
            value: k,
            onChange: (L) => _(String(L)),
            disabled: l
          }
        ) })
      ] }),
      /* @__PURE__ */ e(
        D,
        {
          label: "Password",
          name: "reg-password",
          type: "password",
          value: R,
          onChange: (L) => T(String(L)),
          required: !0,
          disabled: l
        }
      ),
      /* @__PURE__ */ e(
        D,
        {
          label: "Confirm Password",
          name: "reg-confirm",
          type: "password",
          value: z,
          onChange: (L) => v(String(L)),
          required: !0,
          disabled: l
        }
      ),
      /* @__PURE__ */ e(
        D,
        {
          label: "Enable Multi-Factor Authentication",
          name: "reg-mfa",
          type: "checkbox",
          value: $,
          onChange: (L) => Y(!!L),
          disabled: l
        }
      ),
      /* @__PURE__ */ e(
        f,
        {
          type: "submit",
          variant: "primary",
          size: "lg",
          fullWidth: !0,
          disabled: l,
          children: l ? "Creating account..." : "Create Account"
        }
      )
    ] }),
    g === "forgot" && /* @__PURE__ */ e("form", { onSubmit: be, "aria-label": "Forgot password form", children: pe ? /* @__PURE__ */ e(V, { variant: "success", children: "If an account exists for that email, a password reset link has been sent." }) : /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e("p", { className: "text-sm text-slate-500 mb-4 mt-0 leading-relaxed", children: "Enter your email address and we'll send you a link to reset your password." }),
      /* @__PURE__ */ e(
        D,
        {
          label: "Email",
          name: "forgot-email",
          type: "email",
          value: Q,
          onChange: (L) => ue(String(L)),
          required: !0,
          placeholder: "you@example.com",
          disabled: l
        }
      ),
      /* @__PURE__ */ e(
        f,
        {
          type: "submit",
          variant: "primary",
          size: "lg",
          fullWidth: !0,
          disabled: l,
          children: l ? "Sending..." : "Send Reset Link"
        }
      )
    ] }) })
  ] }) });
}
const De = {
  openid: "Verify your identity",
  profile: "Access your name and profile information",
  email: "Access your email address",
  address: "Access your mailing address",
  phone: "Access your phone number",
  offline_access: "Maintain access when you are not present"
};
function ze(a) {
  return De[a] || `Access: ${a}`;
}
function mt({
  clientName: a,
  scopes: s,
  redirectUri: i,
  onAuthorize: u,
  onDeny: b,
  logoUrl: c
}) {
  const [h, m] = o(!1), r = w(async () => {
    m(!0);
    try {
      await u();
    } finally {
      m(!1);
    }
  }, [u]), p = w(async () => {
    m(!0);
    try {
      await b();
    } finally {
      m(!1);
    }
  }, [b]);
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-slate-50", children: /* @__PURE__ */ t(
    "div",
    {
      className: "w-full max-w-[440px] bg-white rounded-xl shadow-md overflow-hidden",
      role: "main",
      "aria-label": "Authorization consent",
      children: [
        /* @__PURE__ */ t("header", { className: "flex flex-col items-center gap-3 px-8 pt-8 pb-5", children: [
          c && /* @__PURE__ */ e("img", { src: c, alt: "", className: "w-14 h-14 object-contain rounded-md" }),
          /* @__PURE__ */ t("h1", { className: "text-xl font-bold text-slate-800 m-0 text-center", children: [
            "Authorize ",
            a
          ] }),
          /* @__PURE__ */ e("p", { className: "text-sm text-slate-500 m-0 text-center leading-relaxed", children: "This application is requesting access to your account." })
        ] }),
        /* @__PURE__ */ t("div", { className: "mx-8 border border-slate-200 rounded-md overflow-hidden mb-6", children: [
          /* @__PURE__ */ e("p", { className: "text-[11px] font-semibold uppercase tracking-wide text-slate-500 px-4 py-2.5 m-0 bg-slate-50 border-b border-slate-200", children: "Requested Permissions" }),
          /* @__PURE__ */ e("ul", { className: "list-none p-0 m-0", "aria-label": "Requested permissions", children: s.map((g, N) => /* @__PURE__ */ t(
            "li",
            {
              className: O(
                "flex items-center gap-3 px-4 py-3 text-sm text-slate-800",
                N < s.length - 1 && "border-b border-slate-200"
              ),
              children: [
                /* @__PURE__ */ e("span", { className: "w-2 h-2 rounded-full bg-blue-500 shrink-0", "aria-hidden": "true" }),
                /* @__PURE__ */ e("span", { children: ze(g) })
              ]
            },
            g
          )) })
        ] }),
        /* @__PURE__ */ t("div", { className: "px-8 pb-8", children: [
          i && /* @__PURE__ */ t("p", { className: "text-[11px] text-slate-400 mb-5 mt-0 break-all leading-relaxed", children: [
            "You will be redirected to: ",
            /* @__PURE__ */ e("strong", { className: "text-slate-500", children: i })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ e(
              f,
              {
                variant: "ghost",
                size: "lg",
                fullWidth: !0,
                onClick: p,
                disabled: h,
                children: "Deny"
              }
            ),
            /* @__PURE__ */ e(
              f,
              {
                variant: "primary",
                size: "lg",
                fullWidth: !0,
                onClick: r,
                disabled: h,
                children: h ? "Authorizing..." : "Authorize"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function Ee({ value: a, size: s = 200, label: i }) {
  return /* @__PURE__ */ t("figure", { className: "flex flex-col items-center gap-2 m-0 p-4 border border-slate-200 rounded-md bg-white", children: [
    /* @__PURE__ */ e(
      "img",
      {
        src: a,
        alt: i || "QR Code",
        width: s,
        height: s,
        className: "block rounded-sm [image-rendering:pixelated]"
      }
    ),
    i && /* @__PURE__ */ e("figcaption", { className: "text-sm text-slate-500 text-center", children: i })
  ] });
}
function he({
  length: a = 6,
  onComplete: s,
  error: i = null,
  disabled: u = !1,
  autoFocus: b = !1
}) {
  const [c, h] = o(Array(a).fill("")), m = ce([]);
  de(() => {
    b && m.current[0] && m.current[0].focus();
  }, [b]);
  const r = w((l) => {
    l >= 0 && l < a && m.current[l] && (m.current[l].focus(), m.current[l].select());
  }, [a]), p = w((l, n) => {
    const d = n.replace(/\D/g, "").slice(-1);
    h((x) => {
      const A = [...x];
      A[l] = d;
      const E = A.join("");
      return E.length === a && A.every((y) => y !== "") && setTimeout(() => s(E), 0), A;
    }), d && l < a - 1 && r(l + 1);
  }, [a, s, r]), g = w((l, n) => {
    n.key === "Backspace" ? c[l] === "" && l > 0 ? (n.preventDefault(), h((d) => {
      const x = [...d];
      return x[l - 1] = "", x;
    }), r(l - 1)) : h((d) => {
      const x = [...d];
      return x[l] = "", x;
    }) : n.key === "ArrowLeft" && l > 0 ? (n.preventDefault(), r(l - 1)) : n.key === "ArrowRight" && l < a - 1 && (n.preventDefault(), r(l + 1));
  }, [c, a, r]), N = w((l) => {
    l.preventDefault();
    const n = l.clipboardData.getData("text").replace(/\D/g, "").slice(0, a);
    if (!n) return;
    const d = Array(a).fill("");
    for (let x = 0; x < n.length; x++)
      d[x] = n[x];
    h(d), n.length === a ? setTimeout(() => s(n), 0) : r(Math.min(n.length, a - 1));
  }, [a, s, r]);
  return /* @__PURE__ */ t("div", { className: "flex flex-col items-center gap-2", children: [
    /* @__PURE__ */ e(
      "div",
      {
        className: "flex gap-2",
        role: "group",
        "aria-label": "Verification code input",
        children: Array.from({ length: a }, (l, n) => /* @__PURE__ */ e(
          "input",
          {
            ref: (d) => {
              m.current[n] = d;
            },
            type: "text",
            inputMode: "numeric",
            pattern: "[0-9]",
            maxLength: 1,
            value: c[n],
            disabled: u,
            "aria-label": `Digit ${n + 1} of ${a}`,
            onChange: (d) => p(n, d.target.value),
            onKeyDown: (d) => g(n, d),
            onPaste: N,
            onFocus: (d) => d.target.select(),
            className: O(
              "w-11 h-[52px] text-center text-lg font-semibold font-[inherit]",
              "rounded-md outline-none transition-[border-color,box-shadow] duration-150",
              "border-2",
              i ? "border-red-500" : "border-slate-200",
              u ? "bg-slate-50 cursor-not-allowed" : "bg-white cursor-text",
              "text-slate-800",
              "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            )
          },
          n
        ))
      }
    ),
    i && /* @__PURE__ */ e(
      "p",
      {
        role: "alert",
        className: "m-0 text-sm text-red-600",
        children: i
      }
    )
  ] });
}
const re = ["name", "scan", "verify", "backup"], Re = ["Name", "Scan", "Verify", "Backup"];
function ht({
  onSetup: a,
  onVerify: s,
  onComplete: i,
  userEmail: u
}) {
  const [b, c] = o("name"), [h, m] = o(!1), [r, p] = o(null), [g, N] = o(""), [l, n] = o(null), [d, x] = o([]), [A, E] = o(!1), y = re.indexOf(b), P = w(async (R) => {
    if (R.preventDefault(), !!g.trim()) {
      p(null), m(!0);
      try {
        const T = await a(g.trim());
        n(T), x(T.backupCodes), c("scan");
      } catch (T) {
        p(T instanceof Error ? T.message : "Setup failed");
      } finally {
        m(!1);
      }
    }
  }, [g, a]), I = w(async (R) => {
    if (l) {
      p(null), m(!0);
      try {
        const T = await s(l.deviceId, R);
        T.success ? (T.backupCodes && x(T.backupCodes), c("backup")) : p("Verification failed. Please try again.");
      } catch (T) {
        p(T instanceof Error ? T.message : "Verification failed");
      } finally {
        m(!1);
      }
    }
  }, [l, s]), M = w(async () => {
    try {
      await navigator.clipboard.writeText(d.join(`
`)), E(!0), setTimeout(() => E(!1), 2e3);
    } catch {
    }
  }, [d]);
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-slate-50", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[480px] bg-white rounded-xl shadow-md p-8", role: "main", "aria-label": "MFA setup", children: [
    /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-slate-800 mb-2 mt-0 text-center", children: "Set Up Multi-Factor Authentication" }),
    u && /* @__PURE__ */ e("p", { className: "text-sm text-slate-500 mb-5 mt-0 text-center", children: u }),
    /* @__PURE__ */ e("div", { className: "flex justify-center gap-6 mb-6", role: "group", "aria-label": "Setup progress", children: re.map((R, T) => /* @__PURE__ */ t("div", { className: "flex flex-col items-center gap-1.5", children: [
      /* @__PURE__ */ e(
        "div",
        {
          className: O(
            "w-3 h-3 rounded-full transition-colors duration-200",
            T < y ? "bg-green-500" : T === y ? "bg-blue-500" : "bg-slate-200"
          ),
          "aria-label": `Step ${T + 1}${T === y ? " (current)" : T < y ? " (completed)" : ""}`
        }
      ),
      /* @__PURE__ */ e("span", { className: O(
        "text-[10px] uppercase tracking-wide font-medium",
        T === y ? "text-slate-800" : "text-slate-400"
      ), children: Re[T] })
    ] }, R)) }),
    r && /* @__PURE__ */ e("div", { className: "mb-5", children: /* @__PURE__ */ e(V, { variant: "error", children: r }) }),
    b === "name" && /* @__PURE__ */ t("form", { onSubmit: P, "aria-label": "Name your device", children: [
      /* @__PURE__ */ e("p", { className: "text-sm text-slate-500 mb-4 mt-0 text-center leading-relaxed", children: "Give your authenticator device a name so you can identify it later." }),
      /* @__PURE__ */ e(
        D,
        {
          label: "Device Name",
          name: "device-name",
          value: g,
          onChange: (R) => N(String(R)),
          required: !0,
          placeholder: "e.g., My Phone",
          disabled: h
        }
      ),
      /* @__PURE__ */ e(
        f,
        {
          type: "submit",
          variant: "primary",
          size: "lg",
          fullWidth: !0,
          disabled: h || !g.trim(),
          children: h ? "Setting up..." : "Continue"
        }
      )
    ] }),
    b === "scan" && l && /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ e(
        f,
        {
          variant: "ghost",
          size: "sm",
          className: "p-0 mb-4",
          onClick: () => c("name"),
          "aria-label": "Go back to name step",
          children: "← Back"
        }
      ),
      /* @__PURE__ */ e("p", { className: "text-sm text-slate-500 mb-5 mt-0 text-center leading-relaxed", children: "Scan this QR code with your authenticator app" }),
      /* @__PURE__ */ e("div", { className: "flex justify-center mb-5", children: /* @__PURE__ */ e(
        Ee,
        {
          value: l.qrCode,
          size: 200,
          label: `Device: ${g}`
        }
      ) }),
      /* @__PURE__ */ e("p", { className: "text-[11px] font-semibold uppercase tracking-wide text-slate-400 text-center mb-2 mt-0", children: "Or enter this secret manually" }),
      /* @__PURE__ */ e("div", { className: "px-4 py-3 bg-slate-50 border border-slate-200 rounded-md font-mono text-sm text-slate-800 break-all text-center mb-6 select-all", children: l.secret }),
      /* @__PURE__ */ e(
        f,
        {
          variant: "primary",
          size: "lg",
          fullWidth: !0,
          onClick: () => c("verify"),
          children: "I've scanned it"
        }
      )
    ] }),
    b === "verify" && /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ e(
        f,
        {
          variant: "ghost",
          size: "sm",
          className: "p-0 mb-4",
          onClick: () => c("scan"),
          "aria-label": "Go back to scan step",
          children: "← Back"
        }
      ),
      /* @__PURE__ */ e("p", { className: "text-sm text-slate-500 mb-6 mt-0 text-center leading-relaxed", children: "Enter the 6-digit code from your authenticator app to confirm setup" }),
      /* @__PURE__ */ e(
        he,
        {
          onComplete: I,
          error: r,
          disabled: h,
          autoFocus: !0
        }
      ),
      h && /* @__PURE__ */ e("p", { className: "text-center text-sm text-slate-400 mt-3", children: "Verifying..." })
    ] }),
    b === "backup" && /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ e("div", { className: "w-14 h-14 mx-auto mb-5 rounded-full bg-[#f0fdf4] flex items-center justify-center", children: /* @__PURE__ */ e("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-green-600", children: /* @__PURE__ */ e("polyline", { points: "20 6 9 17 4 12" }) }) }),
      /* @__PURE__ */ e("p", { className: "text-sm text-slate-500 mb-5 mt-0 text-center leading-relaxed", children: "Save these backup codes in a safe place. Each code can only be used once." }),
      /* @__PURE__ */ e("div", { className: "grid grid-cols-2 gap-2.5 mb-6", children: d.map((R, T) => /* @__PURE__ */ e("div", { className: "px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-md font-mono text-sm text-slate-800 text-center select-all", children: R }, T)) }),
      /* @__PURE__ */ e(
        f,
        {
          variant: "primary",
          size: "lg",
          fullWidth: !0,
          onClick: M,
          children: A ? "Copied!" : "Copy All Codes"
        }
      ),
      /* @__PURE__ */ e("div", { className: "mt-3", children: /* @__PURE__ */ e(
        f,
        {
          variant: "ghost",
          size: "lg",
          fullWidth: !0,
          onClick: i,
          children: "I've saved them — Continue"
        }
      ) })
    ] })
  ] }) });
}
function ut({
  onVerify: a,
  onVerifyBackup: s,
  error: i = null
}) {
  const [u, b] = o("totp"), [c, h] = o(!1), [m, r] = o(null), [p, g] = o(""), N = i || m, l = w(async (d) => {
    r(null), h(!0);
    try {
      await a(d);
    } catch (x) {
      r(x instanceof Error ? x.message : "Verification failed");
    } finally {
      h(!1);
    }
  }, [a]), n = w(async (d) => {
    if (d.preventDefault(), !!p.trim()) {
      r(null), h(!0);
      try {
        await s(p.trim());
      } catch (x) {
        r(x instanceof Error ? x.message : "Verification failed");
      } finally {
        h(!1);
      }
    }
  }, [p, s]);
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-slate-50", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[440px] bg-white rounded-xl shadow-md p-8", role: "main", "aria-label": "Multi-factor verification", children: [
    /* @__PURE__ */ e("div", { className: "w-14 h-14 mx-auto mb-5 rounded-full bg-[#eff6ff] flex items-center justify-center", children: /* @__PURE__ */ t("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-blue-500", children: [
      /* @__PURE__ */ e("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
      /* @__PURE__ */ e("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
    ] }) }),
    /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-slate-800 mb-2 mt-0 text-center", children: "Verify Your Identity" }),
    u === "totp" ? /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e("p", { className: "text-sm text-slate-500 mb-6 mt-0 text-center leading-relaxed", children: "Enter the 6-digit code from your authenticator app" }),
      N && /* @__PURE__ */ e("div", { className: "mb-5", children: /* @__PURE__ */ e(V, { variant: "error", children: N }) }),
      /* @__PURE__ */ e(
        he,
        {
          onComplete: l,
          error: null,
          disabled: c,
          autoFocus: !0
        }
      ),
      c && /* @__PURE__ */ e("p", { className: "text-center text-sm text-slate-400 mt-3", children: "Verifying..." }),
      /* @__PURE__ */ e(
        f,
        {
          variant: "ghost",
          size: "sm",
          className: "block mt-6 mx-auto underline text-blue-600",
          onClick: () => {
            b("backup"), r(null);
          },
          children: "Use a backup code instead"
        }
      )
    ] }) : /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e("p", { className: "text-sm text-slate-500 mb-6 mt-0 text-center leading-relaxed", children: "Enter one of your backup codes" }),
      N && /* @__PURE__ */ e("div", { className: "mb-5", children: /* @__PURE__ */ e(V, { variant: "error", children: N }) }),
      /* @__PURE__ */ t("form", { onSubmit: n, "aria-label": "Backup code verification", children: [
        /* @__PURE__ */ e(
          D,
          {
            label: "Backup Code",
            name: "backup-code",
            value: p,
            onChange: (d) => g(String(d)),
            required: !0,
            placeholder: "XXXX-XXXX-XXXX",
            disabled: c
          }
        ),
        /* @__PURE__ */ e(
          f,
          {
            type: "submit",
            variant: "primary",
            size: "lg",
            fullWidth: !0,
            disabled: c || !p.trim(),
            children: c ? "Verifying..." : "Verify Backup Code"
          }
        )
      ] }),
      /* @__PURE__ */ e(
        f,
        {
          variant: "ghost",
          size: "sm",
          className: "block mt-6 mx-auto underline text-blue-600",
          onClick: () => {
            b("totp"), r(null);
          },
          children: "Use authenticator code instead"
        }
      )
    ] })
  ] }) });
}
function oe(a) {
  try {
    return new Date(a).toLocaleDateString(void 0, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  } catch {
    return a;
  }
}
function pt({
  devices: a,
  userEmail: s,
  mfaEnabled: i,
  onAddDevice: u,
  onRenameDevice: b,
  onRemoveDevice: c,
  loading: h = !1
}) {
  const [m, r] = o(null), [p, g] = o(null), [N, l] = o(""), [n, d] = o(!1), x = w(async () => {
    if (m) {
      d(!0);
      try {
        await c(m);
      } finally {
        d(!1), r(null);
      }
    }
  }, [m, c]), A = w(async (y) => {
    if (N.trim()) {
      d(!0);
      try {
        await b(y, N.trim());
      } finally {
        d(!1), g(null), l("");
      }
    }
  }, [N, b]), E = (y) => {
    g(y.deviceId), l(y.deviceName);
  };
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-start justify-center p-6 bg-slate-50", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[600px] bg-white rounded-xl shadow-md p-8", role: "main", "aria-label": "MFA device management", children: [
    /* @__PURE__ */ t("div", { className: "flex items-center justify-between mb-6 flex-wrap gap-3", children: [
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-slate-800 m-0", children: "MFA Devices" }),
        s && /* @__PURE__ */ e("p", { className: "text-sm text-slate-500 m-0", children: s })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ e(K, { tone: i ? "success" : "warning", children: i ? "Enabled" : "Disabled" }),
        /* @__PURE__ */ e(f, { variant: "primary", size: "md", onClick: u, children: "Add Device" })
      ] })
    ] }),
    h && /* @__PURE__ */ e("p", { className: "text-center text-slate-400 text-sm py-8", children: "Loading devices..." }),
    !h && a.length === 0 && /* @__PURE__ */ e(
      me,
      {
        icon: "🔐",
        title: "No MFA devices configured",
        body: "Add a device to secure your account with multi-factor authentication.",
        actionLabel: "Add Device",
        onAction: u
      }
    ),
    !h && a.length > 0 && /* @__PURE__ */ e("div", { className: "flex flex-col gap-3", role: "list", "aria-label": "MFA devices", children: a.map((y) => /* @__PURE__ */ t("div", { className: "p-5 border border-slate-200 rounded-lg bg-white", role: "listitem", children: [
      /* @__PURE__ */ e("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ e("div", { className: "flex items-center gap-2.5", children: p === y.deviceId ? /* @__PURE__ */ t(
        "form",
        {
          onSubmit: (P) => {
            P.preventDefault(), A(y.deviceId);
          },
          className: "flex gap-2 items-center",
          children: [
            /* @__PURE__ */ e(
              D,
              {
                label: "",
                name: `rename-${y.deviceId}`,
                value: N,
                onChange: (P) => l(String(P)),
                disabled: n
              }
            ),
            /* @__PURE__ */ e(f, { type: "submit", variant: "primary", size: "sm", disabled: n || !N.trim(), children: "Save" }),
            /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => g(null), children: "Cancel" })
          ]
        }
      ) : /* @__PURE__ */ t(j, { children: [
        /* @__PURE__ */ e("h3", { className: "text-[15px] font-semibold text-slate-800 m-0", children: y.deviceName }),
        /* @__PURE__ */ e(
          le,
          {
            status: y.isVerified ? "CONFIRMED" : "UNCONFIRMED"
          }
        )
      ] }) }) }),
      /* @__PURE__ */ t("p", { className: "text-[11px] text-slate-400 m-0 mb-3", children: [
        "Type: ",
        y.deviceType,
        " · Added: ",
        oe(y.createdAt),
        y.lastUsed && ` · Last used: ${oe(y.lastUsed)}`
      ] }),
      p !== y.deviceId && /* @__PURE__ */ t("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => E(y), children: "Rename" }),
        /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => r(y.deviceId), children: "Remove" })
      ] })
    ] }, y.deviceId)) }),
    /* @__PURE__ */ e(
      H,
      {
        open: !!m,
        onConfirm: x,
        onCancel: () => r(null),
        title: "Remove Device",
        body: "Are you sure you want to remove this MFA device? You will no longer be able to use it for verification.",
        confirmLabel: n ? "Removing..." : "Remove",
        confirmDisabled: n,
        tone: "destructive"
      }
    )
  ] }) });
}
function ft({ onConfirm: a, onCancel: s, clientName: i }) {
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-slate-50", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[420px] bg-white rounded-xl shadow-md p-8 text-center", role: "main", "aria-label": "Sign out confirmation", children: [
    /* @__PURE__ */ e("div", { className: "w-14 h-14 mx-auto mb-5 rounded-full bg-[#fef2f2] flex items-center justify-center", children: /* @__PURE__ */ t("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-red-600", children: [
      /* @__PURE__ */ e("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
      /* @__PURE__ */ e("polyline", { points: "16 17 21 12 16 7" }),
      /* @__PURE__ */ e("line", { x1: "21", y1: "12", x2: "9", y2: "12" })
    ] }) }),
    /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-slate-800 mb-3 mt-0", children: "Sign Out" }),
    /* @__PURE__ */ t("p", { className: "text-sm text-slate-500 mb-6 mt-0 leading-relaxed", children: [
      "Are you sure you want to sign out",
      i ? /* @__PURE__ */ t(j, { children: [
        " from ",
        /* @__PURE__ */ e("strong", { className: "text-slate-800", children: i })
      ] }) : "",
      "? You will need to sign in again to access your account."
    ] }),
    /* @__PURE__ */ t("div", { className: "flex gap-3 justify-center", children: [
      s && /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", fullWidth: !0, onClick: s, children: "Cancel" }),
      /* @__PURE__ */ e(f, { variant: "danger-solid", size: "lg", fullWidth: !0, onClick: a, children: "Sign Out" })
    ] })
  ] }) });
}
function gt({
  title: a = "Something went wrong",
  message: s,
  error: i,
  onRetry: u,
  onBack: b
}) {
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-slate-50", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[420px] bg-white rounded-xl shadow-md p-8 text-center", role: "main", "aria-label": "Error", children: [
    /* @__PURE__ */ e("div", { className: "w-14 h-14 rounded-full bg-[#fef2f2] flex items-center justify-center mx-auto mb-5", "aria-hidden": "true", children: /* @__PURE__ */ t("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-red-600", children: [
      /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ e("line", { x1: "15", y1: "9", x2: "9", y2: "15" }),
      /* @__PURE__ */ e("line", { x1: "9", y1: "9", x2: "15", y2: "15" })
    ] }) }),
    /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-slate-800 mb-3 mt-0", children: a }),
    /* @__PURE__ */ e("p", { className: "text-sm text-slate-500 mb-3 mt-0 leading-relaxed", children: s }),
    i && /* @__PURE__ */ e("code", { className: "text-[11px] text-slate-400 font-mono mb-5 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-md inline-block max-w-full overflow-x-auto", children: i }),
    (u || b) && /* @__PURE__ */ t("div", { className: "flex gap-3 justify-center mt-6", children: [
      b && /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: b, children: "Go Back" }),
      u && /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: u, children: "Try Again" })
    ] })
  ] }) });
}
const Ue = [
  { label: "Dashboard", path: "/identity/admin", icon: "⌂" },
  { label: "Pools", path: "/identity/admin/pools", icon: "☰" },
  { label: "Applications", path: "/identity/admin/applications", icon: "⬚" },
  { label: "Email Templates", path: "/identity/admin/email-templates", icon: "✉" },
  { label: "Audit", path: "/identity/admin/audit", icon: "⌸" },
  { label: "Diagnostics", path: "/identity/admin/diagnostics", icon: "⚙" },
  { label: "Setup Guide", path: "/identity/admin/setup", icon: "✓" }
];
function Le({
  item: a,
  active: s,
  onNavigate: i
}) {
  return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: O(
        "flex items-center gap-2 w-full text-left px-3 py-2 text-sm font-medium cursor-pointer",
        "border-none rounded-none border-l-[3px] transition-colors",
        s ? "bg-slate-50 text-blue-600 font-semibold border-l-blue-600" : "bg-transparent text-[#334155] border-l-transparent hover:bg-[#f1f5f9]"
      ),
      onClick: () => i(a.path),
      "aria-current": s ? "page" : void 0,
      children: [
        /* @__PURE__ */ e("span", { children: a.icon }),
        /* @__PURE__ */ e("span", { children: a.label })
      ]
    }
  ) });
}
function bt({
  children: a,
  activePath: s,
  adminEmail: i,
  onNavigate: u,
  onLogout: b
}) {
  const [c, h] = o(!0), m = w(() => h((r) => !r), []);
  return /* @__PURE__ */ t("div", { className: "flex min-h-screen bg-slate-50 font-[inherit]", children: [
    /* @__PURE__ */ t(
      "aside",
      {
        className: O(
          "bg-white border-r border-slate-200 flex flex-col shrink-0 transition-[width] duration-200 overflow-hidden",
          c ? "w-60" : "w-0 border-r-0"
        ),
        children: [
          /* @__PURE__ */ e("div", { className: "p-4 font-bold text-lg text-blue-600 border-b border-slate-200", children: "Identity Admin" }),
          /* @__PURE__ */ e("ul", { className: "list-none m-0 p-0 py-2 flex-1", children: Ue.map((r) => /* @__PURE__ */ e(
            Le,
            {
              item: r,
              active: s === r.path,
              onNavigate: u
            },
            r.path
          )) })
        ]
      }
    ),
    /* @__PURE__ */ t("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ t("header", { className: "flex items-center justify-between px-4 py-2 bg-white border-b border-slate-200", children: [
        /* @__PURE__ */ e(
          f,
          {
            variant: "ghost",
            size: "sm",
            onClick: m,
            "aria-label": "Toggle sidebar",
            children: c ? "←" : "→"
          }
        ),
        /* @__PURE__ */ t("div", { className: "flex items-center gap-4", children: [
          i && /* @__PURE__ */ e("span", { className: "text-sm text-slate-500", children: i }),
          b && /* @__PURE__ */ e(f, { variant: "danger-solid", size: "sm", onClick: b, children: "Logout" })
        ] })
      ] }),
      /* @__PURE__ */ e("main", { className: "flex-1 p-6 overflow-y-auto", children: a })
    ] })
  ] });
}
const Me = [
  { key: "users", label: "Users" },
  { key: "groups", label: "Groups" },
  { key: "mfa", label: "MFA" }
];
function Fe({
  label: a,
  active: s,
  onClick: i
}) {
  return /* @__PURE__ */ e(
    f,
    {
      variant: "ghost",
      size: "sm",
      className: O(
        "rounded-none -mb-[2px] border-b-2",
        s ? "font-semibold text-blue-600 border-b-[#3b82f6]" : "font-normal text-slate-500 border-b-transparent"
      ),
      onClick: i,
      "aria-selected": s,
      role: "tab",
      children: a
    }
  );
}
function xt({
  children: a,
  poolId: s,
  poolName: i,
  activeSection: u,
  onNavigate: b,
  onBack: c
}) {
  const h = w(
    (r) => {
      b(`/identity/admin/pools/${s}/${r}`);
    },
    [b, s]
  ), m = u ? u.charAt(0).toUpperCase() + u.slice(1) : "";
  return /* @__PURE__ */ t("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ t("nav", { className: "flex items-center gap-1.5 text-sm text-slate-400", "aria-label": "Breadcrumb", children: [
      /* @__PURE__ */ e(
        f,
        {
          variant: "ghost",
          size: "sm",
          className: "p-0 underline text-blue-600",
          onClick: c,
          "aria-label": "Navigate to Pools",
          children: "Pools"
        }
      ),
      /* @__PURE__ */ e("span", { children: "/" }),
      /* @__PURE__ */ e("span", { className: "text-slate-800 font-medium", children: i }),
      u && /* @__PURE__ */ t(j, { children: [
        /* @__PURE__ */ e("span", { children: "/" }),
        /* @__PURE__ */ e("span", { children: m })
      ] })
    ] }),
    /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(f, { variant: "secondary", size: "sm", onClick: c, children: "← Back to Pools" }) }),
    /* @__PURE__ */ e("div", { className: "flex border-b-2 border-slate-200", children: Me.map((r) => /* @__PURE__ */ e(
      Fe,
      {
        label: r.label,
        active: u === r.key,
        onClick: () => h(r.key)
      },
      r.key
    )) }),
    /* @__PURE__ */ e("div", { children: a })
  ] });
}
export {
  Xe as A,
  he as C,
  ct as D,
  it as E,
  D as F,
  et as G,
  bt as I,
  dt as L,
  pt as M,
  Qe as P,
  Ee as Q,
  ot as S,
  Je as U,
  at as a,
  tt as b,
  lt as c,
  rt as d,
  mt as e,
  nt as f,
  X as g,
  gt as h,
  Ze as i,
  ft as j,
  st as k,
  ht as l,
  ut as m,
  He as n,
  xt as o,
  le as p,
  Ye as q
};
