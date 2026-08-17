import { jsxs as t, jsx as e, Fragment as j } from "react/jsx-runtime";
import { useMemo as G, useState as o, useCallback as w, useId as xe, useRef as ce, useEffect as de } from "react";
import { C as U } from "./Card-qOg_oC77.js";
import { P as F, T as J, b as Z, e as _, a as ee, c as te, d as q } from "./Table-CGM2zaOL.js";
import { B as f } from "./Button-Qsbxqsl9.js";
import { E as me } from "./EmptyState-CpAOblv3.js";
import { C as H } from "./ConfirmDialog-Ix7G_Mb4.js";
import { B as V } from "./Banner-DKb3JiLs.js";
import { C as K } from "./Chip-BDT8ro4h.js";
import { M as ye } from "./Modal-fp5zcyw8.js";
import { c as O } from "./cn-B6yFEsav.js";
function He({ stats: a, pools: i, onNavigate: r, loading: h }) {
  const b = G(
    () => [
      { label: "User Pools", value: a.userPools },
      { label: "Applications", value: a.clients },
      { label: "Total Users", value: a.totalUsers }
    ],
    [a]
  );
  return h ? /* @__PURE__ */ t("div", { className: "flex flex-col gap-8", children: [
    /* @__PURE__ */ e("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4", children: [1, 2, 3].map((c) => /* @__PURE__ */ t(U, { padding: "md", children: [
      /* @__PURE__ */ e("div", { className: "h-5 w-12 rounded bg-surface-hover animate-pulse mb-2" }),
      /* @__PURE__ */ e("div", { className: "h-3 w-20 rounded bg-surface-hover animate-pulse" })
    ] }, c)) }),
    /* @__PURE__ */ e(U, { className: "h-[200px] animate-pulse" })
  ] }) : /* @__PURE__ */ t(F, { title: "Dashboard", children: [
    /* @__PURE__ */ e("section", { className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4", children: b.map((c) => /* @__PURE__ */ t(U, { padding: "md", children: [
      /* @__PURE__ */ e("div", { className: "text-[2rem] font-bold text-info-fg mb-1", children: c.value }),
      /* @__PURE__ */ e("div", { className: "text-sm text-neutral", children: c.label })
    ] }, c.label)) }),
    /* @__PURE__ */ t("section", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ e("h2", { className: "text-lg font-semibold text-text-primary m-0", children: "User Pools" }),
      /* @__PURE__ */ e(U, { children: i.length === 0 ? /* @__PURE__ */ e(me, { title: "No pools created yet", actionLabel: "Create Pool", onAction: () => r("/identity/admin/pools/new") }) : i.map((c, u) => /* @__PURE__ */ t(
        "div",
        {
          className: `flex items-center justify-between px-4 py-3 ${u < i.length - 1 ? "border-b border-slate-100" : ""}`,
          children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ e("span", { className: "font-medium text-slate-800", children: c.poolName }),
              /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary", children: c.createdAt })
            ] }),
            /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => r(`/identity/admin/pools/${c.poolId}`), children: "View" })
          ]
        },
        c.poolId
      )) })
    ] }),
    /* @__PURE__ */ t("section", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ e("h2", { className: "text-lg font-semibold text-text-primary m-0", children: "Quick Actions" }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ e(f, { variant: "secondary", size: "lg", onClick: () => r("/identity/admin/pools/new"), children: "Create Pool" }),
        /* @__PURE__ */ e(f, { variant: "secondary", size: "lg", onClick: () => r("/identity/admin/applications/new"), children: "Create Application" }),
        /* @__PURE__ */ e(f, { variant: "secondary", size: "lg", onClick: () => r("/identity/admin/setup"), children: "Setup Guide" })
      ] })
    ] })
  ] });
}
function X({
  columns: a,
  data: i,
  keyField: r,
  onRowClick: h,
  actions: b,
  emptyMessage: c = "No records found.",
  emptyIcon: u = "📋",
  loading: m = !1
}) {
  const [s, p] = o(null), [g, N] = o("asc"), n = w(
    (d) => {
      s === d ? N((x) => x === "asc" ? "desc" : "asc") : (p(d), N("asc"));
    },
    [s]
  ), l = G(() => s ? [...i].sort((d, x) => {
    const A = String(d[s] ?? ""), E = String(x[s] ?? ""), y = A.localeCompare(E);
    return g === "asc" ? y : -y;
  }) : i, [i, s, g]);
  return m ? /* @__PURE__ */ e(U, { children: /* @__PURE__ */ t(J, { children: [
    /* @__PURE__ */ e(Z, { children: /* @__PURE__ */ t("tr", { children: [
      a.map((d) => /* @__PURE__ */ e(_, { style: d.width ? { width: d.width } : void 0, children: d.header }, d.key)),
      b && /* @__PURE__ */ e(_, { className: "text-right", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ e(ee, { children: Array.from({ length: 5 }).map((d, x) => /* @__PURE__ */ t(te, { children: [
      a.map((A) => /* @__PURE__ */ e(q, { children: /* @__PURE__ */ e("div", { className: "h-4 rounded bg-surface-hover animate-pulse", style: { width: `${60 + Math.random() * 30}%` } }) }, A.key)),
      b && /* @__PURE__ */ e(q, { className: "text-right", children: /* @__PURE__ */ e("div", { className: "h-4 w-20 rounded bg-surface-hover animate-pulse ml-auto" }) })
    ] }, x)) })
  ] }) }) : i.length === 0 ? /* @__PURE__ */ t(U, { className: "flex flex-col items-center justify-center min-h-[220px] p-8", children: [
    /* @__PURE__ */ e("span", { className: "text-[42px] mb-3", children: u }),
    /* @__PURE__ */ e("p", { className: "text-sm font-medium text-neutral text-center max-w-[280px] m-0", children: c })
  ] }) : /* @__PURE__ */ e(U, { children: /* @__PURE__ */ t(J, { children: [
    /* @__PURE__ */ e(Z, { children: /* @__PURE__ */ t("tr", { children: [
      a.map((d) => /* @__PURE__ */ e(
        _,
        {
          sortable: d.sortable,
          sortDirection: d.sortable && s === d.key ? g : null,
          style: d.width ? { width: d.width } : void 0,
          className: d.align === "right" ? "text-right" : d.align === "center" ? "text-center" : void 0,
          onClick: d.sortable ? () => n(d.key) : void 0,
          children: d.header
        },
        d.key
      )),
      b && /* @__PURE__ */ e(_, { className: "text-right", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ e(ee, { children: l.map((d) => /* @__PURE__ */ t(
      te,
      {
        clickable: !!h,
        onClick: h ? () => h(d) : void 0,
        children: [
          a.map((x) => /* @__PURE__ */ e(
            q,
            {
              style: x.width ? { width: x.width } : void 0,
              className: x.align === "right" ? "text-right" : x.align === "center" ? "text-center" : void 0,
              children: x.render ? x.render(d) : String(d[x.key] ?? "")
            },
            x.key
          )),
          b && /* @__PURE__ */ e(q, { className: "text-right", onClick: (x) => x.stopPropagation(), children: /* @__PURE__ */ e("div", { className: "flex items-center justify-end gap-2", children: b(d) }) })
        ]
      },
      String(d[r])
    )) })
  ] }) });
}
function Qe({
  pools: a,
  onCreatePool: i,
  onEditPool: r,
  onDeletePool: h,
  onViewPool: b,
  loading: c
}) {
  const [u, m] = o(null), [s, p] = o(!1), g = w(
    async (l) => {
      p(!0);
      try {
        await h(l);
      } finally {
        p(!1), m(null);
      }
    },
    [h]
  ), N = G(
    () => [
      { key: "poolName", header: "Name", sortable: !0 },
      { key: "clientId", header: "Client ID" },
      { key: "createdAt", header: "Created", sortable: !0 }
    ],
    []
  ), n = w(
    (l) => /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => b(l.poolId), children: "View" }),
      /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => r(l.poolId), children: "Edit" }),
      /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => m(l.poolId), children: "Delete" })
    ] }),
    [r, b]
  );
  return /* @__PURE__ */ t(
    F,
    {
      title: "User Pools",
      actions: /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: i, children: "Create Pool" }),
      children: [
        /* @__PURE__ */ e(
          X,
          {
            columns: N,
            data: a,
            keyField: "poolId",
            actions: n,
            loading: c,
            emptyMessage: "No user pools found. Create one to get started.",
            emptyIcon: "🏊"
          }
        ),
        /* @__PURE__ */ e(
          H,
          {
            open: !!u,
            onConfirm: () => u && g(u),
            onCancel: () => m(null),
            title: "Delete Pool",
            body: "This action cannot be undone. All users in this pool will be affected.",
            tone: "destructive",
            confirmLabel: "Delete",
            confirmDisabled: s
          }
        )
      ]
    }
  );
}
const ve = "block w-full px-3 py-2 text-sm border border-[#e2e8f0] rounded-md bg-white text-slate-800 outline-none box-border focus:ring-2 focus:ring-info/20 focus:border-info", Ne = "block w-full px-3 py-2 text-sm border border-danger rounded-md bg-white text-slate-800 outline-none box-border focus:ring-2 focus:ring-danger/20 focus:border-danger";
function D({
  label: a,
  name: i,
  type: r = "text",
  value: h,
  onChange: b,
  error: c,
  required: u,
  placeholder: m,
  options: s,
  helpText: p,
  disabled: g
}) {
  const N = xe(), n = w(
    (x) => {
      b(r === "checkbox" ? x.target.checked : r === "number" ? Number(x.target.value) : x.target.value);
    },
    [b, r]
  ), l = c ? Ne : ve, d = () => r === "checkbox" ? /* @__PURE__ */ t("label", { className: "flex items-center gap-2 cursor-pointer", children: [
    /* @__PURE__ */ e(
      "input",
      {
        id: N,
        type: "checkbox",
        name: i,
        checked: !!h,
        onChange: n,
        disabled: g
      }
    ),
    /* @__PURE__ */ t("span", { className: "text-sm text-slate-800", children: [
      a,
      u && /* @__PURE__ */ e("span", { className: "text-danger-fg", children: " *" })
    ] })
  ] }) : r === "textarea" ? /* @__PURE__ */ e(
    "textarea",
    {
      id: N,
      name: i,
      value: String(h),
      onChange: n,
      placeholder: m,
      disabled: g,
      required: u,
      rows: 5,
      className: O(l, "resize-y min-h-[100px]")
    }
  ) : r === "select" ? /* @__PURE__ */ t(
    "select",
    {
      id: N,
      name: i,
      value: String(h),
      onChange: n,
      disabled: g,
      required: u,
      className: l,
      children: [
        /* @__PURE__ */ e("option", { value: "", children: m || "Select..." }),
        s?.map((x) => /* @__PURE__ */ e("option", { value: x.value, children: x.label }, x.value))
      ]
    }
  ) : /* @__PURE__ */ e(
    "input",
    {
      id: N,
      type: r,
      name: i,
      value: String(h),
      onChange: n,
      placeholder: m,
      disabled: g,
      required: u,
      className: l
    }
  );
  return r === "checkbox" ? /* @__PURE__ */ t("div", { className: "mb-4", children: [
    d(),
    c && /* @__PURE__ */ e("p", { className: "mt-1 text-sm text-danger-fg", children: c }),
    p && !c && /* @__PURE__ */ e("p", { className: "mt-1 text-sm text-text-tertiary", children: p })
  ] }) : /* @__PURE__ */ t("div", { className: "mb-4", children: [
    /* @__PURE__ */ t("label", { htmlFor: N, className: "block mb-1 text-sm font-semibold text-slate-800", children: [
      a,
      u && /* @__PURE__ */ e("span", { className: "text-danger-fg", children: " *" })
    ] }),
    d(),
    c && /* @__PURE__ */ e("p", { className: "mt-1 text-sm text-danger-fg", children: c }),
    p && !c && /* @__PURE__ */ e("p", { className: "mt-1 text-sm text-text-tertiary", children: p })
  ] });
}
function Ye({ pool: a, isEdit: i, onSubmit: r, onCancel: h, error: b }) {
  const [c, u] = o(a?.poolName ?? ""), [m, s] = o(a?.settings?.mfaConfiguration ?? "OFF"), [p, g] = o(a?.settings?.passwordPolicy?.minLength ?? 8), [N, n] = o(a?.settings?.passwordPolicy?.requireUppercase ?? !0), [l, d] = o(a?.settings?.passwordPolicy?.requireLowercase ?? !0), [x, A] = o(a?.settings?.passwordPolicy?.requireNumbers ?? !0), [E, y] = o(a?.settings?.passwordPolicy?.requireSymbols ?? !1), [P, I] = o(
    Object.entries(a?.customAttributes ?? {}).map(([S, k]) => ({ key: S, value: k }))
  ), [M, R] = o(!1), T = w(() => {
    I((S) => [...S, { key: "", value: "" }]);
  }, []), z = w((S) => {
    I((k) => k.filter((B, $) => $ !== S));
  }, []), v = w((S, k, B) => {
    I(
      ($) => $.map((Y, Q) => Q === S ? { ...Y, [k]: B } : Y)
    );
  }, []), C = w(
    async (S) => {
      S.preventDefault(), R(!0);
      try {
        const k = {};
        for (const { key: B, value: $ } of P)
          B.trim() && (k[B.trim()] = $);
        await r({
          poolName: c,
          customAttributes: k,
          settings: {
            mfaConfiguration: m,
            passwordPolicy: {
              minLength: p,
              requireUppercase: N,
              requireLowercase: l,
              requireNumbers: x,
              requireSymbols: E
            }
          }
        });
      } finally {
        R(!1);
      }
    },
    [c, m, p, N, l, x, E, P, r]
  );
  return /* @__PURE__ */ t(F, { title: i ? "Edit Pool" : "Create Pool", className: "max-w-[640px]", children: [
    b && /* @__PURE__ */ e(V, { variant: "error", children: b }),
    /* @__PURE__ */ e(U, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: C, children: [
      /* @__PURE__ */ e(
        D,
        {
          label: "Pool Name",
          name: "poolName",
          value: c,
          onChange: (S) => u(String(S)),
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
            onChange: (S) => s(String(S)),
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
            onChange: (S) => n(!!S)
          }
        ),
        /* @__PURE__ */ e(
          D,
          {
            label: "Require Lowercase",
            name: "requireLowercase",
            type: "checkbox",
            value: l,
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
              className: "flex-1 p-2 text-base border border-border rounded-sm bg-white text-slate-800",
              placeholder: "Attribute name",
              value: S.key,
              onChange: (B) => v(k, "key", B.target.value)
            }
          ),
          /* @__PURE__ */ e(
            "input",
            {
              className: "flex-1 p-2 text-base border border-border rounded-sm bg-white text-slate-800",
              placeholder: "Type (string, number, etc.)",
              value: S.value,
              onChange: (B) => v(k, "value", B.target.value)
            }
          ),
          /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => z(k), children: "Remove" })
        ] }, k)),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: T, children: "+ Add Attribute" })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-slate-100", children: [
        /* @__PURE__ */ e(f, { type: "submit", variant: "primary", size: "lg", disabled: M, children: M ? "Saving..." : i ? "Update Pool" : "Create Pool" }),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: h, children: "Cancel" })
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
function ne({ status: a, variant: i }) {
  const r = i ? Ce[i] || "neutral" : we[a] || "neutral";
  return /* @__PURE__ */ e(K, { tone: r, size: "sm", children: a });
}
function Je({
  users: a,
  poolName: i,
  onCreateUser: r,
  onEditUser: h,
  onDeleteUser: b,
  loading: c
}) {
  const [u, m] = o(null), [s, p] = o(!1), g = w(
    async (l) => {
      p(!0);
      try {
        await b(l);
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
        render: (l) => [l.givenName, l.familyName].filter(Boolean).join(" ") || "—"
      },
      {
        key: "status",
        header: "Status",
        width: "180px",
        render: (l) => /* @__PURE__ */ e(ne, { status: l.status })
      },
      { key: "createdAt", header: "Created", sortable: !0 }
    ],
    []
  ), n = w(
    (l) => /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => h(l.userId), children: "Edit" }),
      /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => m(l.userId), children: "Delete" })
    ] }),
    [h]
  );
  return /* @__PURE__ */ t(
    F,
    {
      title: `Users — ${i}`,
      actions: /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: r, children: "Create User" }),
      children: [
        /* @__PURE__ */ e(
          X,
          {
            columns: N,
            data: a,
            keyField: "userId",
            actions: n,
            loading: c,
            emptyMessage: "No users in this pool yet.",
            emptyIcon: "👤"
          }
        ),
        /* @__PURE__ */ e(
          H,
          {
            open: !!u,
            onConfirm: () => u && g(u),
            onCancel: () => m(null),
            title: "Delete User",
            body: "This action cannot be undone. The user will be permanently removed.",
            tone: "destructive",
            confirmLabel: "Delete",
            confirmDisabled: s
          }
        )
      ]
    }
  );
}
function Ze({
  user: a,
  isEdit: i,
  customAttributeDefinitions: r,
  onSubmit: h,
  onCancel: b,
  error: c
}) {
  const [u, m] = o(a?.email ?? ""), [s, p] = o(""), [g, N] = o(a?.givenName ?? ""), [n, l] = o(a?.familyName ?? ""), [d, x] = o(a?.nickname ?? ""), [A, E] = o(a?.picture ?? ""), [y, P] = o(a?.website ?? ""), [I, M] = o(
    Object.fromEntries(
      Object.entries(a?.customAttributes ?? {}).map(([C, S]) => [C, String(S)])
    )
  ), [R, T] = o(!1), z = w((C, S) => {
    M((k) => ({ ...k, [C]: S }));
  }, []), v = w(
    async (C) => {
      C.preventDefault(), T(!0);
      try {
        await h({
          email: u,
          ...!i && s ? { password: s } : {},
          givenName: g || void 0,
          familyName: n || void 0,
          nickname: d || void 0,
          picture: A || void 0,
          website: y || void 0,
          customAttributes: I
        });
      } finally {
        T(!1);
      }
    },
    [u, s, g, n, d, A, y, I, i, h]
  );
  return /* @__PURE__ */ t(F, { title: i ? "Edit User" : "Create User", className: "max-w-[640px]", children: [
    c && /* @__PURE__ */ e(V, { variant: "error", children: c }),
    /* @__PURE__ */ e(U, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: v, children: [
      /* @__PURE__ */ e(
        D,
        {
          label: "Email",
          name: "email",
          type: "email",
          value: u,
          onChange: (C) => m(String(C)),
          required: !0,
          placeholder: "user@example.com"
        }
      ),
      !i && /* @__PURE__ */ e(
        D,
        {
          label: "Password",
          name: "password",
          type: "password",
          value: s,
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
          value: n,
          onChange: (C) => l(String(C)),
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
      r && Object.keys(r).length > 0 && /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-slate-800 mt-6 mb-2", children: "Custom Attributes" }),
        Object.entries(r).map(([C, S]) => /* @__PURE__ */ e(
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
        /* @__PURE__ */ e(f, { type: "submit", variant: "primary", size: "lg", disabled: R, children: R ? "Saving..." : i ? "Update User" : "Create User" }),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: b, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
function et({
  groups: a,
  poolName: i,
  onCreateGroup: r,
  onEditGroup: h,
  onDeleteGroup: b,
  loading: c
}) {
  const [u, m] = o(null), [s, p] = o(!1), g = w(
    async (l) => {
      p(!0);
      try {
        await b(l);
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
        render: (l) => /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: l.permissions.length === 0 ? /* @__PURE__ */ e("span", { className: "text-text-tertiary text-xs", children: "None" }) : l.permissions.map((d) => /* @__PURE__ */ e(K, { tone: "info", size: "xs", children: d }, d)) })
      }
    ],
    []
  ), n = w(
    (l) => /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => h(l.groupId), children: "Edit" }),
      /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => m(l.groupId), children: "Delete" })
    ] }),
    [h]
  );
  return /* @__PURE__ */ t(
    F,
    {
      title: `Groups — ${i}`,
      actions: /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: r, children: "Create Group" }),
      children: [
        /* @__PURE__ */ e(
          X,
          {
            columns: N,
            data: a,
            keyField: "groupId",
            actions: n,
            loading: c,
            emptyMessage: "No groups in this pool yet.",
            emptyIcon: "👥"
          }
        ),
        /* @__PURE__ */ e(
          H,
          {
            open: !!u,
            onConfirm: () => u && g(u),
            onCancel: () => m(null),
            title: "Delete Group",
            body: "This action cannot be undone. Members will lose their group permissions.",
            tone: "destructive",
            confirmLabel: "Delete",
            confirmDisabled: s
          }
        )
      ]
    }
  );
}
function tt({
  group: a,
  isEdit: i,
  members: r,
  availableUsers: h,
  onSubmit: b,
  onAddMember: c,
  onRemoveMember: u,
  onCancel: m,
  error: s
}) {
  const [p, g] = o(a?.groupName ?? ""), [N, n] = o(a?.description ?? ""), [l, d] = o(a?.permissions ?? []), [x, A] = o(""), [E, y] = o(""), [P, I] = o(!1), M = w(
    (v) => {
      if (v.key === "Enter") {
        v.preventDefault();
        const C = x.trim();
        C && !l.includes(C) && d((S) => [...S, C]), A("");
      }
    },
    [x, l]
  ), R = w((v) => {
    d((C) => C.filter((S) => S !== v));
  }, []), T = w(async () => {
    E && c && (await c(E), y(""));
  }, [E, c]), z = w(
    async (v) => {
      v.preventDefault(), I(!0);
      try {
        await b({ groupName: p, description: N, permissions: l });
      } finally {
        I(!1);
      }
    },
    [p, N, l, b]
  );
  return /* @__PURE__ */ t(F, { title: i ? "Edit Group" : "Create Group", className: "max-w-[640px]", children: [
    s && /* @__PURE__ */ e(V, { variant: "error", children: s }),
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
          onChange: (v) => n(String(v)),
          placeholder: "Describe this group's purpose..."
        }
      ),
      /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-slate-800 mt-6 mb-2", children: "Permissions" }),
        /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5 mb-2", children: l.map((v) => /* @__PURE__ */ t("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-info text-white text-sm font-medium", children: [
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
            className: "w-full p-2 text-base border border-border rounded-sm bg-white text-slate-800 box-border",
            placeholder: "Type a permission and press Enter",
            value: x,
            onChange: (v) => A(v.target.value),
            onKeyDown: M
          }
        )
      ] }),
      i && r && /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-slate-800 mt-6 mb-2", children: "Members" }),
        r.length === 0 ? /* @__PURE__ */ e("p", { className: "text-text-tertiary text-sm", children: "No members yet." }) : r.map((v) => /* @__PURE__ */ t("div", { className: "flex items-center justify-between py-1.5 border-b border-border", children: [
          /* @__PURE__ */ e("span", { className: "text-base", children: v.email }),
          u && /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => u(v.userId), children: "Remove" })
        ] }, v.userId)),
        h && h.length > 0 && c && /* @__PURE__ */ t("div", { className: "flex gap-2 mt-2", children: [
          /* @__PURE__ */ t(
            "select",
            {
              className: "flex-1 p-2 text-base border border-border rounded-sm bg-white text-slate-800",
              value: E,
              onChange: (v) => y(v.target.value),
              children: [
                /* @__PURE__ */ e("option", { value: "", children: "Select user to add..." }),
                h.map((v) => /* @__PURE__ */ e("option", { value: v.userId, children: v.email }, v.userId))
              ]
            }
          ),
          /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: T, disabled: !E, children: "Add" })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-slate-100", children: [
        /* @__PURE__ */ e(f, { type: "submit", variant: "primary", size: "lg", disabled: P, children: P ? "Saving..." : i ? "Update Group" : "Create Group" }),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: m, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
function at({
  applications: a,
  onCreateApp: i,
  onCreateAppWithPool: r,
  onEditApp: h,
  onDeleteApp: b,
  loading: c
}) {
  const [u, m] = o(null), [s, p] = o(!1), g = w(
    async (l) => {
      p(!0);
      try {
        await b(l);
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
        render: (l) => /* @__PURE__ */ e("span", { className: "font-mono text-xs text-neutral", children: l.clientId })
      },
      { key: "poolName", header: "Pool", render: (l) => l.poolName || l.poolId },
      {
        key: "redirectUris",
        header: "Redirect URIs",
        render: (l) => /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", children: [
          l.redirectUris.slice(0, 2).map((d) => /* @__PURE__ */ e(K, { tone: "neutral", size: "xs", children: d }, d)),
          l.redirectUris.length > 2 && /* @__PURE__ */ t(K, { tone: "neutral", size: "xs", children: [
            "+",
            l.redirectUris.length - 2,
            " more"
          ] })
        ] })
      }
    ],
    []
  ), n = w(
    (l) => /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => h(l.clientId), children: "Edit" }),
      /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => m(l.clientId), children: "Delete" })
    ] }),
    [h]
  );
  return /* @__PURE__ */ t(
    F,
    {
      title: "Applications",
      actions: /* @__PURE__ */ t(j, { children: [
        /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: i, children: "New Application" }),
        /* @__PURE__ */ e(f, { variant: "secondary", size: "lg", onClick: r, children: "New App + Pool" })
      ] }),
      children: [
        /* @__PURE__ */ e(
          X,
          {
            columns: N,
            data: a,
            keyField: "clientId",
            actions: n,
            loading: c,
            emptyMessage: "No applications registered yet.",
            emptyIcon: "🔐"
          }
        ),
        /* @__PURE__ */ e(
          H,
          {
            open: !!u,
            onConfirm: () => u && g(u),
            onCancel: () => m(null),
            title: "Delete Application",
            body: "This action cannot be undone. The application will lose access immediately.",
            tone: "destructive",
            confirmLabel: "Delete",
            confirmDisabled: s
          }
        )
      ]
    }
  );
}
function ie({
  label: a,
  values: i,
  onChange: r,
  placeholder: h
}) {
  const b = () => r([...i, ""]), c = (m) => r(i.filter((s, p) => p !== m)), u = (m, s) => r(i.map((p, g) => g === m ? s : p));
  return /* @__PURE__ */ t("div", { className: "mb-4", children: [
    /* @__PURE__ */ e("label", { className: "block mb-1 text-sm font-semibold text-slate-800", children: a }),
    i.map((m, s) => /* @__PURE__ */ t("div", { className: "flex gap-2 items-center mb-1.5", children: [
      /* @__PURE__ */ e(
        "input",
        {
          className: "flex-1 p-2 text-base border border-border rounded-sm bg-white text-slate-800",
          value: m,
          onChange: (p) => u(s, p.target.value),
          placeholder: h
        }
      ),
      /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => c(s), children: "Remove" })
    ] }, s)),
    /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: b, children: "+ Add" })
  ] });
}
const ke = [
  "authorization_code",
  "client_credentials",
  "refresh_token"
], Se = ["code", "token", "id_token"];
function nt({
  application: a,
  isEdit: i,
  pools: r,
  onSubmit: h,
  onCancel: b,
  error: c
}) {
  const [u, m] = o(a?.clientName ?? ""), [s, p] = o(a?.poolId ?? ""), [g, N] = o(a?.redirectUris ?? [""]), [n, l] = o(a?.postLogoutRedirectUris ?? []), [d, x] = o(a?.grantTypes ?? ["authorization_code"]), [A, E] = o(a?.responseTypes ?? ["code"]), [y, P] = o(a?.scope ?? "openid profile email"), [I, M] = o(!1), R = w((v) => {
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
        await h({
          clientName: u,
          poolId: s,
          redirectUris: g.filter((C) => C.trim()),
          postLogoutRedirectUris: n.filter((C) => C.trim()),
          grantTypes: d,
          responseTypes: A,
          scope: y
        });
      } finally {
        M(!1);
      }
    },
    [u, s, g, n, d, A, y, h]
  );
  return /* @__PURE__ */ t(F, { title: i ? "Edit Application" : "New Application", className: "max-w-[640px]", children: [
    c && /* @__PURE__ */ e(V, { variant: "error", children: c }),
    /* @__PURE__ */ e(U, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: z, children: [
      /* @__PURE__ */ e(
        D,
        {
          label: "Application Name",
          name: "clientName",
          value: u,
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
          value: s,
          onChange: (v) => p(String(v)),
          required: !0,
          options: r.map((v) => ({ value: v.poolId, label: v.poolName })),
          placeholder: "Select a pool..."
        }
      ),
      /* @__PURE__ */ e(
        ie,
        {
          label: "Redirect URIs",
          values: g,
          onChange: N,
          placeholder: "https://app.example.com/callback"
        }
      ),
      /* @__PURE__ */ e(
        ie,
        {
          label: "Post-Logout Redirect URIs",
          values: n,
          onChange: l,
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
        /* @__PURE__ */ e(f, { type: "submit", variant: "primary", size: "lg", disabled: I, children: I ? "Saving..." : i ? "Update Application" : "Create Application" }),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: b, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
const Ae = ["authorization_code", "client_credentials", "refresh_token"];
function lt({ onSubmit: a, onCancel: i, error: r }) {
  const [h, b] = o(""), [c, u] = o(""), [m, s] = o([""]), [p, g] = o(["authorization_code"]), [N, n] = o(!1), l = w((y) => {
    g(
      (P) => P.includes(y) ? P.filter((I) => I !== y) : [...P, y]
    );
  }, []), d = w(() => {
    s((y) => [...y, ""]);
  }, []), x = w((y) => {
    s((P) => P.filter((I, M) => M !== y));
  }, []), A = w((y, P) => {
    s((I) => I.map((M, R) => R === y ? P : M));
  }, []), E = w(
    async (y) => {
      y.preventDefault(), n(!0);
      try {
        await a({
          poolName: h,
          clientName: c,
          redirectUris: m.filter((P) => P.trim()),
          grantTypes: p
        });
      } finally {
        n(!1);
      }
    },
    [h, c, m, p, a]
  );
  return /* @__PURE__ */ t(F, { title: "New Application + Pool", description: "Create a user pool and register an application in one step.", className: "max-w-[640px]", children: [
    r && /* @__PURE__ */ e(V, { variant: "error", children: r }),
    /* @__PURE__ */ e(U, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: E, children: [
      /* @__PURE__ */ e(
        D,
        {
          label: "Pool Name",
          name: "poolName",
          value: h,
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
          onChange: (y) => u(String(y)),
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
              className: "flex-1 p-2 text-base border border-border rounded-sm bg-white text-slate-800",
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
              onChange: () => l(y)
            }
          ),
          y
        ] }, y)) })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-slate-100", children: [
        /* @__PURE__ */ e(f, { type: "submit", variant: "primary", size: "lg", disabled: N, children: N ? "Creating..." : "Create Pool + Application" }),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: i, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
function rt({
  templates: a,
  onCreateTemplate: i,
  onEditTemplate: r,
  onDeleteTemplate: h,
  onTestSend: b,
  loading: c
}) {
  const [u, m] = o(null), [s, p] = o(!1), [g, N] = o(null), [n, l] = o(""), [d, x] = o(!1), A = w(
    async (I) => {
      p(!0);
      try {
        await h(I);
      } finally {
        p(!1), m(null);
      }
    },
    [h]
  ), E = w(async () => {
    if (!(!g || !n.trim())) {
      x(!0);
      try {
        await b(g, n.trim()), N(null), l("");
      } finally {
        x(!1);
      }
    }
  }, [g, n, b]), y = G(
    () => [
      { key: "name", header: "Name", sortable: !0 },
      { key: "subject", header: "Subject" }
    ],
    []
  ), P = w(
    (I) => /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => r(I.templateId), children: "Edit" }),
      /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => {
        N(I.templateId), l("");
      }, children: "Test Send" }),
      /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => m(I.templateId), children: "Delete" })
    ] }),
    [r]
  );
  return /* @__PURE__ */ t(
    F,
    {
      title: "Email Templates",
      actions: /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: i, children: "Create Template" }),
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
              /* @__PURE__ */ e(f, { variant: "primary", size: "md", onClick: E, disabled: d || !n.trim(), children: d ? "Sending..." : "Send" })
            ] }),
            children: /* @__PURE__ */ e(
              D,
              {
                label: "Recipient Email",
                name: "test-email",
                type: "email",
                value: n,
                onChange: (I) => l(String(I)),
                placeholder: "recipient@example.com"
              }
            )
          }
        ),
        /* @__PURE__ */ e(
          H,
          {
            open: !!u,
            onConfirm: () => u && A(u),
            onCancel: () => m(null),
            title: "Delete Template",
            body: "This action cannot be undone. The template will be permanently removed.",
            tone: "destructive",
            confirmLabel: "Delete",
            confirmDisabled: s
          }
        )
      ]
    }
  );
}
function it({
  template: a,
  isEdit: i,
  onSubmit: r,
  onCancel: h,
  error: b
}) {
  const [c, u] = o(a?.name ?? ""), [m, s] = o(a?.subject ?? ""), [p, g] = o(a?.htmlBody ?? ""), [N, n] = o(a?.textBody ?? ""), [l, d] = o(a?.variables ?? []), [x, A] = o(""), [E, y] = o(!1), [P, I] = o(!1), M = w(
    (z) => {
      if (z.key === "Enter") {
        z.preventDefault();
        const v = x.trim();
        v && !l.includes(v) && d((C) => [...C, v]), A("");
      }
    },
    [x, l]
  ), R = w((z) => {
    d((v) => v.filter((C) => C !== z));
  }, []), T = w(
    async (z) => {
      z.preventDefault(), I(!0);
      try {
        await r({ name: c, subject: m, htmlBody: p, textBody: N, variables: l });
      } finally {
        I(!1);
      }
    },
    [c, m, p, N, l, r]
  );
  return /* @__PURE__ */ t(F, { title: i ? "Edit Email Template" : "Create Email Template", className: "max-w-[800px]", children: [
    b && /* @__PURE__ */ e(V, { variant: "error", children: b }),
    /* @__PURE__ */ e(U, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: T, children: [
      /* @__PURE__ */ e(
        D,
        {
          label: "Template Name",
          name: "name",
          value: c,
          onChange: (z) => u(String(z)),
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
          onChange: (z) => s(String(z)),
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
            className: "w-full p-2 text-base border border-border rounded-sm bg-white text-slate-800 resize-y box-border font-mono"
          }
        ),
        E && /* @__PURE__ */ e(
          "div",
          {
            className: "border border-border rounded-sm p-4 bg-white min-h-[200px] mt-2",
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
          onChange: (z) => n(String(z)),
          placeholder: "Plain text version of the email..."
        }
      ),
      /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-slate-800 mt-6 mb-2", children: "Variables" }),
        /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5 mb-2", children: l.map((z) => /* @__PURE__ */ t("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-info text-white text-sm font-medium", children: [
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
            className: "w-full p-2 text-base border border-border rounded-sm bg-white text-slate-800 box-border",
            placeholder: "Type variable name and press Enter",
            value: x,
            onChange: (z) => A(z.target.value),
            onKeyDown: M
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-slate-100", children: [
        /* @__PURE__ */ e(f, { type: "submit", variant: "primary", size: "lg", disabled: P, children: P ? "Saving..." : i ? "Update Template" : "Create Template" }),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: h, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
function st({
  metrics: a,
  users: i,
  pools: r,
  onRefresh: h,
  loading: b
}) {
  const [c, u] = o(""), m = G(() => i ?? [], [i]), s = G(
    () => [
      { key: "email", header: "Email", sortable: !0 },
      {
        key: "mfaEnabled",
        header: "MFA Status",
        width: "140px",
        render: (g) => /* @__PURE__ */ e(
          ne,
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
      /* @__PURE__ */ e("div", { className: "h-5 w-12 rounded bg-surface-hover animate-pulse mb-2" }),
      /* @__PURE__ */ e("div", { className: "h-3 w-20 rounded bg-surface-hover animate-pulse" })
    ] }, g)) }),
    /* @__PURE__ */ e(U, { className: "h-[200px] animate-pulse" })
  ] }) : /* @__PURE__ */ t(
    F,
    {
      title: "MFA Management",
      actions: /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: h, children: "Refresh" }),
      children: [
        a && /* @__PURE__ */ t("section", { className: "grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4", children: [
          /* @__PURE__ */ t(U, { padding: "md", children: [
            /* @__PURE__ */ e("div", { className: "text-[1.75rem] font-bold text-info-fg mb-1", children: a.totalUsers }),
            /* @__PURE__ */ e("div", { className: "text-sm text-neutral", children: "Total Users" })
          ] }),
          /* @__PURE__ */ t(U, { padding: "md", children: [
            /* @__PURE__ */ e("div", { className: "text-[1.75rem] font-bold text-success-fg mb-1", children: a.mfaEnabled }),
            /* @__PURE__ */ e("div", { className: "text-sm text-neutral", children: "MFA Enabled" })
          ] }),
          /* @__PURE__ */ t(U, { padding: "md", children: [
            /* @__PURE__ */ e("div", { className: "text-[1.75rem] font-bold text-warning-fg mb-1", children: a.mfaDisabled }),
            /* @__PURE__ */ e("div", { className: "text-sm text-neutral", children: "MFA Disabled" })
          ] }),
          /* @__PURE__ */ t(U, { padding: "md", children: [
            /* @__PURE__ */ t("div", { className: "text-[1.75rem] font-bold text-info-fg mb-1", children: [
              a.adoptionRate,
              "%"
            ] }),
            /* @__PURE__ */ e("div", { className: "text-sm text-neutral", children: "Adoption Rate" })
          ] })
        ] }),
        r && r.length > 0 && /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "Filter by pool" }),
          /* @__PURE__ */ t("select", { className: "px-3 py-2 text-sm border border-border rounded-md bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-info focus:border-info transition-shadow", value: c, onChange: (g) => u(g.target.value), children: [
            /* @__PURE__ */ e("option", { value: "", children: "All Pools" }),
            r.map((g) => /* @__PURE__ */ t("option", { value: g.poolId, children: [
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
            columns: s,
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
function ot({
  records: a,
  onQuery: i,
  onViewEntity: r,
  onReplay: h,
  loading: b,
  totalRecords: c
}) {
  const [u, m] = o(""), [s, p] = o(""), [g, N] = o(""), [n, l] = o(""), [d, x] = o("50"), [A, E] = o(""), [y, P] = o(""), [I, M] = o(null), [R, T] = o(!1), z = w(async () => {
    await i({
      entityType: u || void 0,
      entityId: s || void 0,
      fromTime: g ? new Date(g).getTime() : void 0,
      toTime: n ? new Date(n).getTime() : void 0,
      limit: d ? Number(d) : void 0
    });
  }, [u, s, g, n, d, i]), v = w(async () => {
    if (!(!A || !y)) {
      T(!0);
      try {
        const k = await h(A, new Date(y).getTime());
        M(k);
      } finally {
        T(!1);
      }
    }
  }, [A, y, h]), C = G(
    () => [
      {
        key: "timestamp",
        header: "Timestamp",
        sortable: !0,
        render: (k) => /* @__PURE__ */ e("span", { className: "font-mono text-xs text-neutral", children: new Date(k.timestamp).toLocaleString() })
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
            className: "p-0 underline text-info-fg font-mono text-xs",
            onClick: () => r(k.entityType, k.entityId),
            children: k.entityId
          }
        )
      },
      { key: "operation", header: "Operation" }
    ],
    [r]
  ), S = "px-3 py-2 text-sm border border-border rounded-md bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-info focus:border-info transition-shadow";
  return /* @__PURE__ */ t(F, { title: "Audit Log", children: [
    /* @__PURE__ */ e(U, { padding: "md", children: /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-4 items-end", children: [
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "Entity Type" }),
        /* @__PURE__ */ t("select", { className: S, value: u, onChange: (k) => m(k.target.value), children: [
          /* @__PURE__ */ e("option", { value: "", children: "All" }),
          Ie.filter(Boolean).map((k) => /* @__PURE__ */ e("option", { value: k, children: k }, k))
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "Entity ID" }),
        /* @__PURE__ */ e("input", { className: S, value: s, onChange: (k) => p(k.target.value), placeholder: "Optional" })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "From" }),
        /* @__PURE__ */ e("input", { className: S, type: "datetime-local", value: g, onChange: (k) => N(k.target.value) })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "To" }),
        /* @__PURE__ */ e("input", { className: S, type: "datetime-local", value: n, onChange: (k) => l(k.target.value) })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "Limit" }),
        /* @__PURE__ */ e("input", { className: `${S} w-[70px]`, type: "number", value: d, onChange: (k) => x(k.target.value) })
      ] }),
      /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: z, disabled: b, children: b ? "Querying..." : "Query" })
    ] }) }),
    c !== void 0 && /* @__PURE__ */ t("p", { className: "text-sm text-text-tertiary m-0", children: [
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
      /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mb-4 mt-0", children: "Point-in-Time Replay" }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-4 items-end mb-4", children: [
        /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "Entity ID" }),
          /* @__PURE__ */ e("input", { className: S, value: A, onChange: (k) => E(k.target.value), placeholder: "entity-id" })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "At Timestamp" }),
          /* @__PURE__ */ e("input", { className: S, type: "datetime-local", value: y, onChange: (k) => P(k.target.value) })
        ] }),
        /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: v, disabled: R || !A || !y, children: R ? "Replaying..." : "Replay" })
      ] }),
      I && /* @__PURE__ */ e("pre", { className: "p-4 bg-surface-panel border border-border rounded-md font-mono text-xs text-slate-700 overflow-x-auto whitespace-pre-wrap max-h-[300px] overflow-y-auto m-0", children: JSON.stringify(I, null, 2) })
    ] })
  ] });
}
function ct({ status: a, onNavigate: i }) {
  const [r, h] = o(null), b = w((s) => {
    h((p) => p === s ? null : s);
  }, []), c = G(
    () => [
      {
        title: "Create User Pool",
        done: a.hasUserPools,
        content: /* @__PURE__ */ t("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ e("p", { className: "m-0 text-sm text-text-secondary", children: a.hasUserPools ? `${a.poolCount} pool(s) configured.` : "No user pools yet." }),
          /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => i("/identity/admin/pools/new"), children: "Create a User Pool" }) })
        ] })
      },
      {
        title: "Register Application",
        done: a.hasClients,
        content: /* @__PURE__ */ t("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ e("p", { className: "m-0 text-sm text-text-secondary", children: a.hasClients ? `${a.clientCount} application(s) registered.` : "No applications registered." }),
          /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => i("/identity/admin/applications/new"), children: "Register an Application" }) })
        ] })
      },
      {
        title: "Create Admin User",
        done: a.hasAdminUser,
        content: /* @__PURE__ */ t("div", { className: "flex flex-col gap-2", children: [
          a.hasAdminUser ? /* @__PURE__ */ t(j, { children: [
            /* @__PURE__ */ t("p", { className: "m-0 text-sm text-text-secondary", children: [
              "Admin users: ",
              a.adminEmails.join(", ")
            ] }),
            /* @__PURE__ */ t("p", { className: "m-0 text-sm text-text-secondary", children: [
              a.totalUsers,
              " total user(s) across all pools."
            ] })
          ] }) : /* @__PURE__ */ e("p", { className: "m-0 text-sm text-text-secondary", children: "No admin user found. Create one in a user pool." }),
          a.firstPoolId && /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => i(`/identity/admin/pools/${a.firstPoolId}/users/new`), children: "Create Admin User" }) })
        ] })
      },
      {
        title: "Configure SMTP",
        done: a.smtpConfigured,
        content: /* @__PURE__ */ e("p", { className: "m-0 text-sm text-text-secondary", children: a.smtpConfigured ? `SMTP configured: ${a.smtpHost}` : "SMTP is not yet configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS environment variables." })
      },
      {
        title: "Configure Issuer",
        done: a.issuerConfigured,
        content: /* @__PURE__ */ t("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ t("p", { className: "m-0 text-sm text-text-secondary", children: [
            "Issuer: ",
            /* @__PURE__ */ e("code", { className: "px-1.5 py-0.5 bg-surface-hover rounded text-xs font-mono", children: a.issuer || "Not set" })
          ] }),
          a.wellKnownUrl && /* @__PURE__ */ t("p", { className: "m-0 text-sm text-text-secondary", children: [
            "Well-known URL:",
            " ",
            /* @__PURE__ */ e("a", { href: a.wellKnownUrl, target: "_blank", rel: "noopener noreferrer", className: "text-info-fg underline", children: a.wellKnownUrl })
          ] })
        ] })
      },
      {
        title: "Test Integration",
        done: a.hasUserPools && a.hasClients && a.issuerConfigured,
        content: /* @__PURE__ */ e("div", { className: "flex flex-col gap-3", children: a.firstClientId ? /* @__PURE__ */ t(j, { children: [
          /* @__PURE__ */ t("p", { className: "m-0 text-sm text-text-secondary", children: [
            "Client ID: ",
            /* @__PURE__ */ e("code", { className: "px-1.5 py-0.5 bg-surface-hover rounded text-xs font-mono", children: a.firstClientId })
          ] }),
          /* @__PURE__ */ e("p", { className: "m-0 text-sm text-text-secondary", children: "Use this code snippet to test the OIDC authorization flow:" }),
          /* @__PURE__ */ e("pre", { className: "px-4 py-3 bg-slate-900 text-slate-200 rounded-md font-mono text-xs overflow-x-auto whitespace-pre m-0", children: `// OIDC Authorization Code Flow
const authUrl = \`\${issuer}/authorize?\` + new URLSearchParams({
  client_id: '${a.firstClientId}',
  response_type: 'code',
  redirect_uri: 'http://localhost:3000/callback',
  scope: 'openid profile email',
}).toString();

window.location.href = authUrl;` })
        ] }) : /* @__PURE__ */ e("p", { className: "m-0 text-sm text-text-secondary", children: "Complete the previous steps first to test the integration." }) })
      }
    ],
    [a, i]
  ), u = c.filter((s) => s.done).length, m = Math.round(u / c.length * 100);
  return /* @__PURE__ */ t(
    F,
    {
      title: "Setup Guide",
      description: `${u} of ${c.length} steps completed (${m}%)`,
      children: [
        /* @__PURE__ */ e("div", { className: "h-2 bg-surface-hover rounded-full overflow-hidden", children: /* @__PURE__ */ e(
          "div",
          {
            className: "h-full bg-success rounded-full transition-[width] duration-300 ease-in-out",
            style: { width: `${m}%` }
          }
        ) }),
        /* @__PURE__ */ e("div", { className: "flex flex-col gap-2", children: c.map((s, p) => /* @__PURE__ */ t(U, { children: [
          /* @__PURE__ */ t(
            "div",
            {
              className: "flex items-center justify-between px-5 py-4 cursor-pointer select-none",
              onClick: () => b(p),
              role: "button",
              "aria-expanded": r === p,
              children: [
                /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ e(
                    "div",
                    {
                      className: O(
                        "w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0",
                        s.done ? "bg-success text-white" : "bg-surface-hover text-text-tertiary"
                      ),
                      children: s.done ? "✓" : p + 1
                    }
                  ),
                  /* @__PURE__ */ e("span", { className: "text-sm font-medium text-slate-800", children: s.title })
                ] }),
                /* @__PURE__ */ e("span", { className: "text-text-tertiary text-sm", children: r === p ? "▲" : "▼" })
              ]
            }
          ),
          r === p && /* @__PURE__ */ e("div", { className: "px-5 pb-5 pt-0 border-t border-slate-100", children: /* @__PURE__ */ e("div", { className: "pt-4", children: s.content }) })
        ] }, p)) })
      ]
    }
  );
}
function Pe({ data: a }) {
  return /* @__PURE__ */ e("pre", { className: "p-5 font-mono text-xs text-slate-700 overflow-x-auto whitespace-pre-wrap max-h-[400px] overflow-y-auto m-0 bg-surface-panel", children: JSON.stringify(a, null, 2) });
}
function Te({ rates: a }) {
  const i = Object.entries(a);
  return i.length === 0 ? /* @__PURE__ */ e("p", { className: "p-5 text-center text-text-tertiary text-sm m-0", children: "No rate limiter data available." }) : /* @__PURE__ */ t(J, { children: [
    /* @__PURE__ */ e(Z, { children: /* @__PURE__ */ t("tr", { children: [
      /* @__PURE__ */ e(_, { children: "Key" }),
      /* @__PURE__ */ e(_, { children: "Value" })
    ] }) }),
    /* @__PURE__ */ e(ee, { children: i.map(([r, h]) => /* @__PURE__ */ t(te, { children: [
      /* @__PURE__ */ e(q, { className: "font-mono text-xs", children: r }),
      /* @__PURE__ */ e(q, { children: typeof h == "object" ? JSON.stringify(h) : String(h) })
    ] }, r)) })
  ] });
}
function dt({
  diagnostics: a,
  rates: i,
  dlq: r,
  onRedrive: h,
  onPurge: b,
  onRefresh: c,
  loading: u
}) {
  const [m, s] = o(!1), p = ce(null);
  de(() => (m ? p.current = setInterval(c, 1e4) : p.current && (clearInterval(p.current), p.current = null), () => {
    p.current && clearInterval(p.current);
  }), [m, c]);
  const g = w(
    async (n) => {
      await h(n);
    },
    [h]
  ), N = w(
    async (n) => {
      await b(n);
    },
    [b]
  );
  return u ? /* @__PURE__ */ e(F, { title: "Diagnostics", children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-4", children: [1, 2, 3].map((n) => /* @__PURE__ */ e(U, { className: "h-[120px] animate-pulse" }, n)) }) }) : /* @__PURE__ */ t(
    F,
    {
      title: "Diagnostics",
      actions: /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ t("label", { className: "flex items-center gap-1.5 text-sm text-neutral cursor-pointer", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "checkbox",
              checked: m,
              onChange: (n) => s(n.target.checked),
              className: "rounded"
            }
          ),
          "Auto-refresh (10s)"
        ] }),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: c, children: "Refresh" })
      ] }),
      children: [
        /* @__PURE__ */ t(U, { children: [
          /* @__PURE__ */ e("div", { className: "px-5 py-3 border-b border-border bg-surface-panel", children: /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-slate-700 m-0", children: "Node / Cluster Diagnostics" }) }),
          a ? /* @__PURE__ */ e(Pe, { data: a }) : /* @__PURE__ */ e("p", { className: "p-5 text-center text-text-tertiary text-sm m-0", children: "No diagnostics data available." })
        ] }),
        /* @__PURE__ */ t(U, { children: [
          /* @__PURE__ */ e("div", { className: "px-5 py-3 border-b border-border bg-surface-panel", children: /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-slate-700 m-0", children: "Rate Limiter Stats" }) }),
          i ? /* @__PURE__ */ e(Te, { rates: i }) : /* @__PURE__ */ e("p", { className: "p-5 text-center text-text-tertiary text-sm m-0", children: "No rate data available." })
        ] }),
        /* @__PURE__ */ t(U, { children: [
          /* @__PURE__ */ e("div", { className: "px-5 py-3 border-b border-border bg-surface-panel", children: /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-slate-700 m-0", children: "Dead Letter Queue" }) }),
          !r || r.length === 0 ? /* @__PURE__ */ e("p", { className: "p-5 text-center text-text-tertiary text-sm m-0", children: "Dead letter queue is empty." }) : /* @__PURE__ */ t(J, { children: [
            /* @__PURE__ */ e(Z, { children: /* @__PURE__ */ t("tr", { children: [
              /* @__PURE__ */ e(_, { children: "ID" }),
              /* @__PURE__ */ e(_, { children: "Error" }),
              /* @__PURE__ */ e(_, { children: "Failed At" }),
              /* @__PURE__ */ e(_, { children: "Retries" }),
              /* @__PURE__ */ e(_, { className: "text-right", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ e(ee, { children: r.map((n) => /* @__PURE__ */ t(te, { children: [
              /* @__PURE__ */ t(q, { className: "font-mono text-xs", children: [
                n.id.substring(0, 12),
                "..."
              ] }),
              /* @__PURE__ */ e(q, { children: /* @__PURE__ */ e(K, { tone: "danger", size: "xs", children: n.error }) }),
              /* @__PURE__ */ e(q, { className: "text-xs text-neutral", children: new Date(n.failedAt).toLocaleString() }),
              /* @__PURE__ */ e(q, { children: /* @__PURE__ */ e(K, { tone: "neutral", size: "xs", mono: !0, children: n.retryCount }) }),
              /* @__PURE__ */ e(q, { className: "text-right", children: /* @__PURE__ */ t("div", { className: "flex items-center justify-end gap-2", children: [
                /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => g(n.id), children: "Redrive" }),
                /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => N(n.id), children: "Purge" })
              ] }) })
            ] }, n.id)) })
          ] })
        ] })
      ]
    }
  );
}
function mt({
  uid: a,
  interactionUrl: i,
  clientName: r,
  logoUrl: h,
  error: b = null,
  onLogin: c,
  onRegister: u,
  onForgotPassword: m,
  registrationEnabled: s = !0,
  forgotPasswordEnabled: p = !0
}) {
  const [g, N] = o("signin"), [n, l] = o(!1), [d, x] = o(null), [A, E] = o(""), [y, P] = o(""), [I, M] = o(""), [R, T] = o(""), [z, v] = o(""), [C, S] = o(""), [k, B] = o(""), [$, Y] = o(!1), [Q, he] = o(""), [pe, le] = o(!1), re = b || d, fe = w(async (L) => {
    L.preventDefault(), x(null), l(!0);
    try {
      await c(A, y);
    } catch (W) {
      x(W instanceof Error ? W.message : "Login failed");
    } finally {
      l(!1);
    }
  }, [A, y, c]), ge = w(async (L) => {
    if (L.preventDefault(), x(null), R !== z) {
      x("Passwords do not match");
      return;
    }
    l(!0);
    try {
      await u({
        email: I,
        password: R,
        givenName: C || void 0,
        familyName: k || void 0,
        enableMfa: $ || void 0
      });
    } catch (W) {
      x(W instanceof Error ? W.message : "Registration failed");
    } finally {
      l(!1);
    }
  }, [I, R, z, C, k, $, u]), be = w(async (L) => {
    L.preventDefault(), x(null), l(!0);
    try {
      await m(Q), le(!0);
    } catch (W) {
      x(W instanceof Error ? W.message : "Request failed");
    } finally {
      l(!1);
    }
  }, [Q, m]), ae = (L) => {
    N(L), x(null), le(!1);
  };
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-surface-panel", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[440px] bg-white rounded-xl shadow-md p-8", role: "main", "aria-label": "Authentication", children: [
    /* @__PURE__ */ t("header", { className: "flex flex-col items-center gap-3 mb-6", children: [
      h && /* @__PURE__ */ e("img", { src: h, alt: "", className: "w-14 h-14 object-contain rounded-md" }),
      r && /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-slate-800 m-0", children: r })
    ] }),
    /* @__PURE__ */ t("nav", { className: "flex border-b border-border mb-6", role: "tablist", "aria-label": "Authentication method", children: [
      /* @__PURE__ */ e(
        f,
        {
          variant: "ghost",
          size: "sm",
          role: "tab",
          "aria-selected": g === "signin",
          className: O(
            "flex-1 rounded-none border-b-2",
            g === "signin" ? "border-b-[#3b82f6] text-info-fg font-semibold" : "border-b-transparent text-neutral font-normal"
          ),
          onClick: () => ae("signin"),
          children: "Sign In"
        }
      ),
      s && /* @__PURE__ */ e(
        f,
        {
          variant: "ghost",
          size: "sm",
          role: "tab",
          "aria-selected": g === "register",
          className: O(
            "flex-1 rounded-none border-b-2",
            g === "register" ? "border-b-[#3b82f6] text-info-fg font-semibold" : "border-b-transparent text-neutral font-normal"
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
            g === "forgot" ? "border-b-[#3b82f6] text-info-fg font-semibold" : "border-b-transparent text-neutral font-normal"
          ),
          onClick: () => ae("forgot"),
          children: "Forgot Password"
        }
      )
    ] }),
    re && /* @__PURE__ */ e("div", { className: "mb-5", children: /* @__PURE__ */ e(V, { variant: "error", children: re }) }),
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
          disabled: n
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
          disabled: n
        }
      ),
      /* @__PURE__ */ e(
        f,
        {
          type: "submit",
          variant: "primary",
          size: "lg",
          fullWidth: !0,
          disabled: n,
          children: n ? "Signing in..." : "Sign In"
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
          disabled: n
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
            disabled: n
          }
        ) }),
        /* @__PURE__ */ e("div", { className: "flex-1", children: /* @__PURE__ */ e(
          D,
          {
            label: "Family Name",
            name: "reg-family",
            value: k,
            onChange: (L) => B(String(L)),
            disabled: n
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
          disabled: n
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
          disabled: n
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
          disabled: n
        }
      ),
      /* @__PURE__ */ e(
        f,
        {
          type: "submit",
          variant: "primary",
          size: "lg",
          fullWidth: !0,
          disabled: n,
          children: n ? "Creating account..." : "Create Account"
        }
      )
    ] }),
    g === "forgot" && /* @__PURE__ */ e("form", { onSubmit: be, "aria-label": "Forgot password form", children: pe ? /* @__PURE__ */ e(V, { variant: "success", children: "If an account exists for that email, a password reset link has been sent." }) : /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-4 mt-0 leading-relaxed", children: "Enter your email address and we'll send you a link to reset your password." }),
      /* @__PURE__ */ e(
        D,
        {
          label: "Email",
          name: "forgot-email",
          type: "email",
          value: Q,
          onChange: (L) => he(String(L)),
          required: !0,
          placeholder: "you@example.com",
          disabled: n
        }
      ),
      /* @__PURE__ */ e(
        f,
        {
          type: "submit",
          variant: "primary",
          size: "lg",
          fullWidth: !0,
          disabled: n,
          children: n ? "Sending..." : "Send Reset Link"
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
function ut({
  clientName: a,
  scopes: i,
  redirectUri: r,
  onAuthorize: h,
  onDeny: b,
  logoUrl: c
}) {
  const [u, m] = o(!1), s = w(async () => {
    m(!0);
    try {
      await h();
    } finally {
      m(!1);
    }
  }, [h]), p = w(async () => {
    m(!0);
    try {
      await b();
    } finally {
      m(!1);
    }
  }, [b]);
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-surface-panel", children: /* @__PURE__ */ t(
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
          /* @__PURE__ */ e("p", { className: "text-sm text-neutral m-0 text-center leading-relaxed", children: "This application is requesting access to your account." })
        ] }),
        /* @__PURE__ */ t("div", { className: "mx-8 border border-border rounded-md overflow-hidden mb-6", children: [
          /* @__PURE__ */ e("p", { className: "text-[11px] font-semibold uppercase tracking-wide text-neutral px-4 py-2.5 m-0 bg-surface-panel border-b border-border", children: "Requested Permissions" }),
          /* @__PURE__ */ e("ul", { className: "list-none p-0 m-0", "aria-label": "Requested permissions", children: i.map((g, N) => /* @__PURE__ */ t(
            "li",
            {
              className: O(
                "flex items-center gap-3 px-4 py-3 text-sm text-slate-800",
                N < i.length - 1 && "border-b border-border"
              ),
              children: [
                /* @__PURE__ */ e("span", { className: "w-2 h-2 rounded-full bg-info shrink-0", "aria-hidden": "true" }),
                /* @__PURE__ */ e("span", { children: ze(g) })
              ]
            },
            g
          )) })
        ] }),
        /* @__PURE__ */ t("div", { className: "px-8 pb-8", children: [
          r && /* @__PURE__ */ t("p", { className: "text-[11px] text-text-tertiary mb-5 mt-0 break-all leading-relaxed", children: [
            "You will be redirected to: ",
            /* @__PURE__ */ e("strong", { className: "text-neutral", children: r })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ e(
              f,
              {
                variant: "ghost",
                size: "lg",
                fullWidth: !0,
                onClick: p,
                disabled: u,
                children: "Deny"
              }
            ),
            /* @__PURE__ */ e(
              f,
              {
                variant: "primary",
                size: "lg",
                fullWidth: !0,
                onClick: s,
                disabled: u,
                children: u ? "Authorizing..." : "Authorize"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function Ee({ value: a, size: i = 200, label: r }) {
  return /* @__PURE__ */ t("figure", { className: "flex flex-col items-center gap-2 m-0 p-4 border border-border rounded-md bg-white", children: [
    /* @__PURE__ */ e(
      "img",
      {
        src: a,
        alt: r || "QR Code",
        width: i,
        height: i,
        className: "block rounded-sm [image-rendering:pixelated]"
      }
    ),
    r && /* @__PURE__ */ e("figcaption", { className: "text-sm text-neutral text-center", children: r })
  ] });
}
function ue({
  length: a = 6,
  onComplete: i,
  error: r = null,
  disabled: h = !1,
  autoFocus: b = !1
}) {
  const [c, u] = o(Array(a).fill("")), m = ce([]);
  de(() => {
    b && m.current[0] && m.current[0].focus();
  }, [b]);
  const s = w((n) => {
    n >= 0 && n < a && m.current[n] && (m.current[n].focus(), m.current[n].select());
  }, [a]), p = w((n, l) => {
    const d = l.replace(/\D/g, "").slice(-1);
    u((x) => {
      const A = [...x];
      A[n] = d;
      const E = A.join("");
      return E.length === a && A.every((y) => y !== "") && setTimeout(() => i(E), 0), A;
    }), d && n < a - 1 && s(n + 1);
  }, [a, i, s]), g = w((n, l) => {
    l.key === "Backspace" ? c[n] === "" && n > 0 ? (l.preventDefault(), u((d) => {
      const x = [...d];
      return x[n - 1] = "", x;
    }), s(n - 1)) : u((d) => {
      const x = [...d];
      return x[n] = "", x;
    }) : l.key === "ArrowLeft" && n > 0 ? (l.preventDefault(), s(n - 1)) : l.key === "ArrowRight" && n < a - 1 && (l.preventDefault(), s(n + 1));
  }, [c, a, s]), N = w((n) => {
    n.preventDefault();
    const l = n.clipboardData.getData("text").replace(/\D/g, "").slice(0, a);
    if (!l) return;
    const d = Array(a).fill("");
    for (let x = 0; x < l.length; x++)
      d[x] = l[x];
    u(d), l.length === a ? setTimeout(() => i(l), 0) : s(Math.min(l.length, a - 1));
  }, [a, i, s]);
  return /* @__PURE__ */ t("div", { className: "flex flex-col items-center gap-2", children: [
    /* @__PURE__ */ e(
      "div",
      {
        className: "flex gap-2",
        role: "group",
        "aria-label": "Verification code input",
        children: Array.from({ length: a }, (n, l) => /* @__PURE__ */ e(
          "input",
          {
            ref: (d) => {
              m.current[l] = d;
            },
            type: "text",
            inputMode: "numeric",
            pattern: "[0-9]",
            maxLength: 1,
            value: c[l],
            disabled: h,
            "aria-label": `Digit ${l + 1} of ${a}`,
            onChange: (d) => p(l, d.target.value),
            onKeyDown: (d) => g(l, d),
            onPaste: N,
            onFocus: (d) => d.target.select(),
            className: O(
              "w-11 h-[52px] text-center text-lg font-semibold font-[inherit]",
              "rounded-md outline-none transition-[border-color,box-shadow] duration-150",
              "border-2",
              r ? "border-danger" : "border-border",
              h ? "bg-surface-panel cursor-not-allowed" : "bg-white cursor-text",
              "text-slate-800",
              "focus:border-info focus:ring-2 focus:ring-info/20"
            )
          },
          l
        ))
      }
    ),
    r && /* @__PURE__ */ e(
      "p",
      {
        role: "alert",
        className: "m-0 text-sm text-danger-fg",
        children: r
      }
    )
  ] });
}
const se = ["name", "scan", "verify", "backup"], Re = ["Name", "Scan", "Verify", "Backup"];
function ht({
  onSetup: a,
  onVerify: i,
  onComplete: r,
  userEmail: h
}) {
  const [b, c] = o("name"), [u, m] = o(!1), [s, p] = o(null), [g, N] = o(""), [n, l] = o(null), [d, x] = o([]), [A, E] = o(!1), y = se.indexOf(b), P = w(async (R) => {
    if (R.preventDefault(), !!g.trim()) {
      p(null), m(!0);
      try {
        const T = await a(g.trim());
        l(T), x(T.backupCodes), c("scan");
      } catch (T) {
        p(T instanceof Error ? T.message : "Setup failed");
      } finally {
        m(!1);
      }
    }
  }, [g, a]), I = w(async (R) => {
    if (n) {
      p(null), m(!0);
      try {
        const T = await i(n.deviceId, R);
        T.success ? (T.backupCodes && x(T.backupCodes), c("backup")) : p("Verification failed. Please try again.");
      } catch (T) {
        p(T instanceof Error ? T.message : "Verification failed");
      } finally {
        m(!1);
      }
    }
  }, [n, i]), M = w(async () => {
    try {
      await navigator.clipboard.writeText(d.join(`
`)), E(!0), setTimeout(() => E(!1), 2e3);
    } catch {
    }
  }, [d]);
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-surface-panel", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[480px] bg-white rounded-xl shadow-md p-8", role: "main", "aria-label": "MFA setup", children: [
    /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-slate-800 mb-2 mt-0 text-center", children: "Set Up Multi-Factor Authentication" }),
    h && /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-5 mt-0 text-center", children: h }),
    /* @__PURE__ */ e("div", { className: "flex justify-center gap-6 mb-6", role: "group", "aria-label": "Setup progress", children: se.map((R, T) => /* @__PURE__ */ t("div", { className: "flex flex-col items-center gap-1.5", children: [
      /* @__PURE__ */ e(
        "div",
        {
          className: O(
            "w-3 h-3 rounded-full transition-colors duration-200",
            T < y ? "bg-success" : T === y ? "bg-info" : "bg-slate-200"
          ),
          "aria-label": `Step ${T + 1}${T === y ? " (current)" : T < y ? " (completed)" : ""}`
        }
      ),
      /* @__PURE__ */ e("span", { className: O(
        "text-[10px] uppercase tracking-wide font-medium",
        T === y ? "text-slate-800" : "text-text-tertiary"
      ), children: Re[T] })
    ] }, R)) }),
    s && /* @__PURE__ */ e("div", { className: "mb-5", children: /* @__PURE__ */ e(V, { variant: "error", children: s }) }),
    b === "name" && /* @__PURE__ */ t("form", { onSubmit: P, "aria-label": "Name your device", children: [
      /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-4 mt-0 text-center leading-relaxed", children: "Give your authenticator device a name so you can identify it later." }),
      /* @__PURE__ */ e(
        D,
        {
          label: "Device Name",
          name: "device-name",
          value: g,
          onChange: (R) => N(String(R)),
          required: !0,
          placeholder: "e.g., My Phone",
          disabled: u
        }
      ),
      /* @__PURE__ */ e(
        f,
        {
          type: "submit",
          variant: "primary",
          size: "lg",
          fullWidth: !0,
          disabled: u || !g.trim(),
          children: u ? "Setting up..." : "Continue"
        }
      )
    ] }),
    b === "scan" && n && /* @__PURE__ */ t("div", { children: [
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
      /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-5 mt-0 text-center leading-relaxed", children: "Scan this QR code with your authenticator app" }),
      /* @__PURE__ */ e("div", { className: "flex justify-center mb-5", children: /* @__PURE__ */ e(
        Ee,
        {
          value: n.qrCode,
          size: 200,
          label: `Device: ${g}`
        }
      ) }),
      /* @__PURE__ */ e("p", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary text-center mb-2 mt-0", children: "Or enter this secret manually" }),
      /* @__PURE__ */ e("div", { className: "px-4 py-3 bg-surface-panel border border-border rounded-md font-mono text-sm text-slate-800 break-all text-center mb-6 select-all", children: n.secret }),
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
      /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-6 mt-0 text-center leading-relaxed", children: "Enter the 6-digit code from your authenticator app to confirm setup" }),
      /* @__PURE__ */ e(
        ue,
        {
          onComplete: I,
          error: s,
          disabled: u,
          autoFocus: !0
        }
      ),
      u && /* @__PURE__ */ e("p", { className: "text-center text-sm text-text-tertiary mt-3", children: "Verifying..." })
    ] }),
    b === "backup" && /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ e("div", { className: "w-14 h-14 mx-auto mb-5 rounded-full bg-[#f0fdf4] flex items-center justify-center", children: /* @__PURE__ */ e("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-success-fg", children: /* @__PURE__ */ e("polyline", { points: "20 6 9 17 4 12" }) }) }),
      /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-5 mt-0 text-center leading-relaxed", children: "Save these backup codes in a safe place. Each code can only be used once." }),
      /* @__PURE__ */ e("div", { className: "grid grid-cols-2 gap-2.5 mb-6", children: d.map((R, T) => /* @__PURE__ */ e("div", { className: "px-3 py-2.5 bg-surface-panel border border-border rounded-md font-mono text-sm text-slate-800 text-center select-all", children: R }, T)) }),
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
          onClick: r,
          children: "I've saved them — Continue"
        }
      ) })
    ] })
  ] }) });
}
function pt({
  onVerify: a,
  onVerifyBackup: i,
  error: r = null
}) {
  const [h, b] = o("totp"), [c, u] = o(!1), [m, s] = o(null), [p, g] = o(""), N = r || m, n = w(async (d) => {
    s(null), u(!0);
    try {
      await a(d);
    } catch (x) {
      s(x instanceof Error ? x.message : "Verification failed");
    } finally {
      u(!1);
    }
  }, [a]), l = w(async (d) => {
    if (d.preventDefault(), !!p.trim()) {
      s(null), u(!0);
      try {
        await i(p.trim());
      } catch (x) {
        s(x instanceof Error ? x.message : "Verification failed");
      } finally {
        u(!1);
      }
    }
  }, [p, i]);
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-surface-panel", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[440px] bg-white rounded-xl shadow-md p-8", role: "main", "aria-label": "Multi-factor verification", children: [
    /* @__PURE__ */ e("div", { className: "w-14 h-14 mx-auto mb-5 rounded-full bg-[#eff6ff] flex items-center justify-center", children: /* @__PURE__ */ t("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-info-fg", children: [
      /* @__PURE__ */ e("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
      /* @__PURE__ */ e("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
    ] }) }),
    /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-slate-800 mb-2 mt-0 text-center", children: "Verify Your Identity" }),
    h === "totp" ? /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-6 mt-0 text-center leading-relaxed", children: "Enter the 6-digit code from your authenticator app" }),
      N && /* @__PURE__ */ e("div", { className: "mb-5", children: /* @__PURE__ */ e(V, { variant: "error", children: N }) }),
      /* @__PURE__ */ e(
        ue,
        {
          onComplete: n,
          error: null,
          disabled: c,
          autoFocus: !0
        }
      ),
      c && /* @__PURE__ */ e("p", { className: "text-center text-sm text-text-tertiary mt-3", children: "Verifying..." }),
      /* @__PURE__ */ e(
        f,
        {
          variant: "ghost",
          size: "sm",
          className: "block mt-6 mx-auto underline text-info-fg",
          onClick: () => {
            b("backup"), s(null);
          },
          children: "Use a backup code instead"
        }
      )
    ] }) : /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-6 mt-0 text-center leading-relaxed", children: "Enter one of your backup codes" }),
      N && /* @__PURE__ */ e("div", { className: "mb-5", children: /* @__PURE__ */ e(V, { variant: "error", children: N }) }),
      /* @__PURE__ */ t("form", { onSubmit: l, "aria-label": "Backup code verification", children: [
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
          className: "block mt-6 mx-auto underline text-info-fg",
          onClick: () => {
            b("totp"), s(null);
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
function ft({
  devices: a,
  userEmail: i,
  mfaEnabled: r,
  onAddDevice: h,
  onRenameDevice: b,
  onRemoveDevice: c,
  loading: u = !1
}) {
  const [m, s] = o(null), [p, g] = o(null), [N, n] = o(""), [l, d] = o(!1), x = w(async () => {
    if (m) {
      d(!0);
      try {
        await c(m);
      } finally {
        d(!1), s(null);
      }
    }
  }, [m, c]), A = w(async (y) => {
    if (N.trim()) {
      d(!0);
      try {
        await b(y, N.trim());
      } finally {
        d(!1), g(null), n("");
      }
    }
  }, [N, b]), E = (y) => {
    g(y.deviceId), n(y.deviceName);
  };
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-start justify-center p-6 bg-surface-panel", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[600px] bg-white rounded-xl shadow-md p-8", role: "main", "aria-label": "MFA device management", children: [
    /* @__PURE__ */ t("div", { className: "flex items-center justify-between mb-6 flex-wrap gap-3", children: [
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-slate-800 m-0", children: "MFA Devices" }),
        i && /* @__PURE__ */ e("p", { className: "text-sm text-neutral m-0", children: i })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ e(K, { tone: r ? "success" : "warning", children: r ? "Enabled" : "Disabled" }),
        /* @__PURE__ */ e(f, { variant: "primary", size: "md", onClick: h, children: "Add Device" })
      ] })
    ] }),
    u && /* @__PURE__ */ e("p", { className: "text-center text-text-tertiary text-sm py-8", children: "Loading devices..." }),
    !u && a.length === 0 && /* @__PURE__ */ e(
      me,
      {
        icon: "🔐",
        title: "No MFA devices configured",
        body: "Add a device to secure your account with multi-factor authentication.",
        actionLabel: "Add Device",
        onAction: h
      }
    ),
    !u && a.length > 0 && /* @__PURE__ */ e("div", { className: "flex flex-col gap-3", role: "list", "aria-label": "MFA devices", children: a.map((y) => /* @__PURE__ */ t("div", { className: "p-5 border border-border rounded-lg bg-white", role: "listitem", children: [
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
                onChange: (P) => n(String(P)),
                disabled: l
              }
            ),
            /* @__PURE__ */ e(f, { type: "submit", variant: "primary", size: "sm", disabled: l || !N.trim(), children: "Save" }),
            /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => g(null), children: "Cancel" })
          ]
        }
      ) : /* @__PURE__ */ t(j, { children: [
        /* @__PURE__ */ e("h3", { className: "text-[15px] font-semibold text-slate-800 m-0", children: y.deviceName }),
        /* @__PURE__ */ e(
          ne,
          {
            status: y.isVerified ? "CONFIRMED" : "UNCONFIRMED"
          }
        )
      ] }) }) }),
      /* @__PURE__ */ t("p", { className: "text-[11px] text-text-tertiary m-0 mb-3", children: [
        "Type: ",
        y.deviceType,
        " · Added: ",
        oe(y.createdAt),
        y.lastUsed && ` · Last used: ${oe(y.lastUsed)}`
      ] }),
      p !== y.deviceId && /* @__PURE__ */ t("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => E(y), children: "Rename" }),
        /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => s(y.deviceId), children: "Remove" })
      ] })
    ] }, y.deviceId)) }),
    /* @__PURE__ */ e(
      H,
      {
        open: !!m,
        onConfirm: x,
        onCancel: () => s(null),
        title: "Remove Device",
        body: "Are you sure you want to remove this MFA device? You will no longer be able to use it for verification.",
        confirmLabel: l ? "Removing..." : "Remove",
        confirmDisabled: l,
        tone: "destructive"
      }
    )
  ] }) });
}
function gt({ onConfirm: a, onCancel: i, clientName: r }) {
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-surface-panel", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[420px] bg-white rounded-xl shadow-md p-8 text-center", role: "main", "aria-label": "Sign out confirmation", children: [
    /* @__PURE__ */ e("div", { className: "w-14 h-14 mx-auto mb-5 rounded-full bg-[#fef2f2] flex items-center justify-center", children: /* @__PURE__ */ t("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-danger-fg", children: [
      /* @__PURE__ */ e("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
      /* @__PURE__ */ e("polyline", { points: "16 17 21 12 16 7" }),
      /* @__PURE__ */ e("line", { x1: "21", y1: "12", x2: "9", y2: "12" })
    ] }) }),
    /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-slate-800 mb-3 mt-0", children: "Sign Out" }),
    /* @__PURE__ */ t("p", { className: "text-sm text-neutral mb-6 mt-0 leading-relaxed", children: [
      "Are you sure you want to sign out",
      r ? /* @__PURE__ */ t(j, { children: [
        " from ",
        /* @__PURE__ */ e("strong", { className: "text-slate-800", children: r })
      ] }) : "",
      "? You will need to sign in again to access your account."
    ] }),
    /* @__PURE__ */ t("div", { className: "flex gap-3 justify-center", children: [
      i && /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", fullWidth: !0, onClick: i, children: "Cancel" }),
      /* @__PURE__ */ e(f, { variant: "danger-solid", size: "lg", fullWidth: !0, onClick: a, children: "Sign Out" })
    ] })
  ] }) });
}
function bt({
  title: a = "Something went wrong",
  message: i,
  error: r,
  onRetry: h,
  onBack: b
}) {
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-surface-panel", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[420px] bg-white rounded-xl shadow-md p-8 text-center", role: "main", "aria-label": "Error", children: [
    /* @__PURE__ */ e("div", { className: "w-14 h-14 rounded-full bg-[#fef2f2] flex items-center justify-center mx-auto mb-5", "aria-hidden": "true", children: /* @__PURE__ */ t("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-danger-fg", children: [
      /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ e("line", { x1: "15", y1: "9", x2: "9", y2: "15" }),
      /* @__PURE__ */ e("line", { x1: "9", y1: "9", x2: "15", y2: "15" })
    ] }) }),
    /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-slate-800 mb-3 mt-0", children: a }),
    /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-3 mt-0 leading-relaxed", children: i }),
    r && /* @__PURE__ */ e("code", { className: "text-[11px] text-text-tertiary font-mono mb-5 px-3.5 py-2 bg-surface-panel border border-border rounded-md inline-block max-w-full overflow-x-auto", children: r }),
    (h || b) && /* @__PURE__ */ t("div", { className: "flex gap-3 justify-center mt-6", children: [
      b && /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: b, children: "Go Back" }),
      h && /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: h, children: "Try Again" })
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
  active: i,
  onNavigate: r
}) {
  return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: O(
        "flex items-center gap-2 w-full text-left px-3 py-2 text-sm font-medium cursor-pointer",
        "border-none rounded-none border-l-[3px] transition-colors",
        i ? "bg-surface-panel text-info-fg font-semibold border-l-info" : "bg-transparent text-[#334155] border-l-transparent hover:bg-[#f1f5f9]"
      ),
      onClick: () => r(a.path),
      "aria-current": i ? "page" : void 0,
      children: [
        /* @__PURE__ */ e("span", { children: a.icon }),
        /* @__PURE__ */ e("span", { children: a.label })
      ]
    }
  ) });
}
function xt({
  children: a,
  activePath: i,
  adminEmail: r,
  onNavigate: h,
  onLogout: b
}) {
  const [c, u] = o(!0), m = w(() => u((s) => !s), []);
  return /* @__PURE__ */ t("div", { className: "flex min-h-screen bg-surface-panel font-[inherit]", children: [
    /* @__PURE__ */ t(
      "aside",
      {
        className: O(
          "bg-white border-r border-border flex flex-col shrink-0 transition-[width] duration-200 overflow-hidden",
          c ? "w-60" : "w-0 border-r-0"
        ),
        children: [
          /* @__PURE__ */ e("div", { className: "p-4 font-bold text-lg text-info-fg border-b border-border", children: "Identity Admin" }),
          /* @__PURE__ */ e("ul", { className: "list-none m-0 p-0 py-2 flex-1", children: Ue.map((s) => /* @__PURE__ */ e(
            Le,
            {
              item: s,
              active: i === s.path,
              onNavigate: h
            },
            s.path
          )) })
        ]
      }
    ),
    /* @__PURE__ */ t("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ t("header", { className: "flex items-center justify-between px-4 py-2 bg-white border-b border-border", children: [
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
          r && /* @__PURE__ */ e("span", { className: "text-sm text-neutral", children: r }),
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
  active: i,
  onClick: r
}) {
  return /* @__PURE__ */ e(
    f,
    {
      variant: "ghost",
      size: "sm",
      className: O(
        "rounded-none -mb-[2px] border-b-2",
        i ? "font-semibold text-info-fg border-b-[#3b82f6]" : "font-normal text-neutral border-b-transparent"
      ),
      onClick: r,
      "aria-selected": i,
      role: "tab",
      children: a
    }
  );
}
function yt({
  children: a,
  poolId: i,
  poolName: r,
  activeSection: h,
  onNavigate: b,
  onBack: c
}) {
  const u = w(
    (s) => {
      b(`/identity/admin/pools/${i}/${s}`);
    },
    [b, i]
  ), m = h ? h.charAt(0).toUpperCase() + h.slice(1) : "";
  return /* @__PURE__ */ t("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ t("nav", { className: "flex items-center gap-1.5 text-sm text-text-tertiary", "aria-label": "Breadcrumb", children: [
      /* @__PURE__ */ e(
        f,
        {
          variant: "ghost",
          size: "sm",
          className: "p-0 underline text-info-fg",
          onClick: c,
          "aria-label": "Navigate to Pools",
          children: "Pools"
        }
      ),
      /* @__PURE__ */ e("span", { children: "/" }),
      /* @__PURE__ */ e("span", { className: "text-slate-800 font-medium", children: r }),
      h && /* @__PURE__ */ t(j, { children: [
        /* @__PURE__ */ e("span", { children: "/" }),
        /* @__PURE__ */ e("span", { children: m })
      ] })
    ] }),
    /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(f, { variant: "secondary", size: "sm", onClick: c, children: "← Back to Pools" }) }),
    /* @__PURE__ */ e("div", { className: "flex border-b-2 border-border", children: Me.map((s) => /* @__PURE__ */ e(
      Fe,
      {
        label: s.label,
        active: h === s.key,
        onClick: () => u(s.key)
      },
      s.key
    )) }),
    /* @__PURE__ */ e("div", { children: a })
  ] });
}
export {
  He as A,
  ue as C,
  dt as D,
  it as E,
  D as F,
  tt as G,
  xt as I,
  mt as L,
  ft as M,
  Ye as P,
  Ee as Q,
  ct as S,
  Ze as U,
  nt as a,
  at as b,
  lt as c,
  ot as d,
  ut as e,
  rt as f,
  X as g,
  bt as h,
  et as i,
  gt as j,
  st as k,
  ht as l,
  pt as m,
  Qe as n,
  yt as o,
  ne as p,
  Je as q
};
