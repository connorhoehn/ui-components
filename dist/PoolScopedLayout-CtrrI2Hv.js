import { jsxs as t, jsx as e, Fragment as j } from "react/jsx-runtime";
import { useMemo as V, useState as o, useCallback as w, useId as Ce, useRef as ue, useEffect as he } from "react";
import { C as R } from "./Card-qOg_oC77.js";
import { P as F, T as ee, b as te, e as _, a as ae, c as ne, d as q } from "./Table-D7HV0dS-.js";
import { B as f } from "./Button-DILgRebO.js";
import { E as pe } from "./EmptyState-Ejc9dJA3.js";
import { C as Q } from "./ConfirmDialog-Ix7G_Mb4.js";
import { I as O } from "./Input-Dt0yAs9r.js";
import { B as $ } from "./Banner-DKb3JiLs.js";
import { C as X } from "./Chip-BDT8ro4h.js";
import { S as re } from "./Select-DAEcKWg2.js";
import { C as J } from "./Checkbox-vOc5I8kn.js";
import { M as we } from "./Modal-fp5zcyw8.js";
import { T as fe } from "./Textarea-kaa9rHUL.js";
import { c as G } from "./cn-B6yFEsav.js";
function tt({ stats: a, pools: l, onNavigate: i, loading: p }) {
  const g = V(
    () => [
      { label: "User Pools", value: a.userPools },
      { label: "Applications", value: a.clients },
      { label: "Total Users", value: a.totalUsers }
    ],
    [a]
  );
  return p ? /* @__PURE__ */ t("div", { className: "flex flex-col gap-8", children: [
    /* @__PURE__ */ e("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4", children: [1, 2, 3].map((c) => /* @__PURE__ */ t(R, { padding: "md", children: [
      /* @__PURE__ */ e("div", { className: "h-5 w-12 rounded bg-surface-hover animate-pulse mb-2" }),
      /* @__PURE__ */ e("div", { className: "h-3 w-20 rounded bg-surface-hover animate-pulse" })
    ] }, c)) }),
    /* @__PURE__ */ e(R, { className: "h-[200px] animate-pulse" })
  ] }) : /* @__PURE__ */ t(F, { title: "Dashboard", children: [
    /* @__PURE__ */ e("section", { className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4", children: g.map((c) => /* @__PURE__ */ t(R, { padding: "md", children: [
      /* @__PURE__ */ e("div", { className: "text-[2rem] font-bold text-info-fg mb-1", children: c.value }),
      /* @__PURE__ */ e("div", { className: "text-sm text-neutral", children: c.label })
    ] }, c.label)) }),
    /* @__PURE__ */ t("section", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ e("h2", { className: "text-lg font-semibold text-text-primary m-0", children: "User Pools" }),
      /* @__PURE__ */ e(R, { children: l.length === 0 ? /* @__PURE__ */ e(pe, { title: "No pools created yet", actionLabel: "Create Pool", onAction: () => i("/identity/admin/pools/new") }) : l.map((c, h) => /* @__PURE__ */ t(
        "div",
        {
          className: `flex items-center justify-between px-4 py-3 ${h < l.length - 1 ? "border-b border-border-subtle" : ""}`,
          children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ e("span", { className: "font-medium text-text-primary", children: c.poolName }),
              /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary", children: c.createdAt })
            ] }),
            /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => i(`/identity/admin/pools/${c.poolId}`), children: "View" })
          ]
        },
        c.poolId
      )) })
    ] }),
    /* @__PURE__ */ t("section", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ e("h2", { className: "text-lg font-semibold text-text-primary m-0", children: "Quick Actions" }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ e(f, { variant: "secondary", size: "lg", onClick: () => i("/identity/admin/pools/new"), children: "Create Pool" }),
        /* @__PURE__ */ e(f, { variant: "secondary", size: "lg", onClick: () => i("/identity/admin/applications/new"), children: "Create Application" }),
        /* @__PURE__ */ e(f, { variant: "secondary", size: "lg", onClick: () => i("/identity/admin/setup"), children: "Setup Guide" })
      ] })
    ] })
  ] });
}
function H({
  columns: a,
  data: l,
  keyField: i,
  onRowClick: p,
  actions: g,
  emptyMessage: c = "No records found.",
  emptyIcon: h = "📋",
  loading: u = !1
}) {
  const [s, d] = o(null), [b, C] = o("asc"), r = w(
    (m) => {
      s === m ? C((v) => v === "asc" ? "desc" : "asc") : (d(m), C("asc"));
    },
    [s]
  ), n = V(() => s ? [...l].sort((m, v) => {
    const S = String(m[s] ?? ""), z = String(v[s] ?? ""), x = S.localeCompare(z);
    return b === "asc" ? x : -x;
  }) : l, [l, s, b]);
  return u ? /* @__PURE__ */ e(R, { children: /* @__PURE__ */ t(ee, { children: [
    /* @__PURE__ */ e(te, { children: /* @__PURE__ */ t("tr", { children: [
      a.map((m) => /* @__PURE__ */ e(_, { style: m.width ? { width: m.width } : void 0, children: m.header }, m.key)),
      g && /* @__PURE__ */ e(_, { className: "text-right", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ e(ae, { children: Array.from({ length: 5 }).map((m, v) => /* @__PURE__ */ t(ne, { children: [
      a.map((S) => /* @__PURE__ */ e(q, { children: /* @__PURE__ */ e("div", { className: "h-4 rounded bg-surface-hover animate-pulse", style: { width: `${60 + Math.random() * 30}%` } }) }, S.key)),
      g && /* @__PURE__ */ e(q, { className: "text-right", children: /* @__PURE__ */ e("div", { className: "h-4 w-20 rounded bg-surface-hover animate-pulse ml-auto" }) })
    ] }, v)) })
  ] }) }) : l.length === 0 ? /* @__PURE__ */ t(R, { className: "flex flex-col items-center justify-center min-h-[220px] p-8", children: [
    /* @__PURE__ */ e("span", { className: "text-[42px] mb-3", children: h }),
    /* @__PURE__ */ e("p", { className: "text-sm font-medium text-neutral text-center max-w-[280px] m-0", children: c })
  ] }) : /* @__PURE__ */ e(R, { children: /* @__PURE__ */ t(ee, { children: [
    /* @__PURE__ */ e(te, { children: /* @__PURE__ */ t("tr", { children: [
      a.map((m) => /* @__PURE__ */ e(
        _,
        {
          sortable: m.sortable,
          sortDirection: m.sortable && s === m.key ? b : null,
          style: m.width ? { width: m.width } : void 0,
          className: m.align === "right" ? "text-right" : m.align === "center" ? "text-center" : void 0,
          onClick: m.sortable ? () => r(m.key) : void 0,
          children: m.header
        },
        m.key
      )),
      g && /* @__PURE__ */ e(_, { className: "text-right", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ e(ae, { children: n.map((m) => /* @__PURE__ */ t(
      ne,
      {
        clickable: !!p,
        onClick: p ? () => p(m) : void 0,
        children: [
          a.map((v) => /* @__PURE__ */ e(
            q,
            {
              style: v.width ? { width: v.width } : void 0,
              className: v.align === "right" ? "text-right" : v.align === "center" ? "text-center" : void 0,
              children: v.render ? v.render(m) : String(m[v.key] ?? "")
            },
            v.key
          )),
          g && /* @__PURE__ */ e(q, { className: "text-right", onClick: (v) => v.stopPropagation(), children: /* @__PURE__ */ e("div", { className: "flex items-center justify-end gap-2", children: g(m) }) })
        ]
      },
      String(m[i])
    )) })
  ] }) });
}
function at({
  pools: a,
  onCreatePool: l,
  onEditPool: i,
  onDeletePool: p,
  onViewPool: g,
  loading: c
}) {
  const [h, u] = o(null), [s, d] = o(!1), b = w(
    async (n) => {
      d(!0);
      try {
        await p(n);
      } finally {
        d(!1), u(null);
      }
    },
    [p]
  ), C = V(
    () => [
      { key: "poolName", header: "Name", sortable: !0 },
      { key: "clientId", header: "Client ID" },
      { key: "createdAt", header: "Created", sortable: !0 }
    ],
    []
  ), r = w(
    (n) => /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => g(n.poolId), children: "View" }),
      /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => i(n.poolId), children: "Edit" }),
      /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => u(n.poolId), children: "Delete" })
    ] }),
    [i, g]
  );
  return /* @__PURE__ */ t(
    F,
    {
      title: "User Pools",
      actions: /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: l, children: "Create Pool" }),
      children: [
        /* @__PURE__ */ e(
          H,
          {
            columns: C,
            data: a,
            keyField: "poolId",
            actions: r,
            loading: c,
            emptyMessage: "No user pools found. Create one to get started.",
            emptyIcon: "🏊"
          }
        ),
        /* @__PURE__ */ e(
          Q,
          {
            open: !!h,
            onConfirm: () => h && b(h),
            onCancel: () => u(null),
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
function T({
  label: a,
  name: l,
  type: i = "text",
  value: p,
  onChange: g,
  error: c,
  required: h,
  placeholder: u,
  options: s,
  helpText: d,
  disabled: b
}) {
  const C = Ce(), r = w(
    (m) => {
      g(i === "number" ? Number(m.target.value) : m.target.value);
    },
    [g, i]
  ), n = () => i === "checkbox" ? /* @__PURE__ */ t("label", { className: "flex items-center gap-2 cursor-pointer", children: [
    /* @__PURE__ */ e(
      J,
      {
        id: C,
        name: l,
        checked: !!p,
        onChange: g,
        disabled: b
      }
    ),
    /* @__PURE__ */ t("span", { className: "text-sm text-text-primary", children: [
      a,
      h && /* @__PURE__ */ e("span", { className: "text-danger-fg", children: " *" })
    ] })
  ] }) : i === "textarea" ? /* @__PURE__ */ e(
    fe,
    {
      id: C,
      name: l,
      value: String(p),
      onChange: r,
      placeholder: u,
      disabled: b,
      required: h,
      rows: 5,
      invalid: !!c,
      className: "resize-y min-h-[100px]"
    }
  ) : i === "select" ? /* @__PURE__ */ e(
    re,
    {
      id: C,
      name: l,
      value: String(p),
      onChange: r,
      disabled: b,
      required: h,
      invalid: !!c,
      options: [
        { value: "", label: u || "Select..." },
        ...s ?? []
      ]
    }
  ) : /* @__PURE__ */ e(
    O,
    {
      id: C,
      type: i,
      name: l,
      value: String(p),
      onChange: r,
      placeholder: u,
      disabled: b,
      required: h,
      invalid: !!c
    }
  );
  return i === "checkbox" ? /* @__PURE__ */ t("div", { className: "mb-4", children: [
    n(),
    c && /* @__PURE__ */ e("p", { className: "mt-1 text-sm text-danger-fg", children: c }),
    d && !c && /* @__PURE__ */ e("p", { className: "mt-1 text-sm text-text-tertiary", children: d })
  ] }) : /* @__PURE__ */ t("div", { className: "mb-4", children: [
    /* @__PURE__ */ t("label", { htmlFor: C, className: "block mb-1 text-sm font-semibold text-text-primary", children: [
      a,
      h && /* @__PURE__ */ e("span", { className: "text-danger-fg", children: " *" })
    ] }),
    n(),
    c && /* @__PURE__ */ e("p", { className: "mt-1 text-sm text-danger-fg", children: c }),
    d && !c && /* @__PURE__ */ e("p", { className: "mt-1 text-sm text-text-tertiary", children: d })
  ] });
}
function nt({ pool: a, isEdit: l, onSubmit: i, onCancel: p, error: g }) {
  const [c, h] = o(a?.poolName ?? ""), [u, s] = o(a?.settings?.mfaConfiguration ?? "OFF"), [d, b] = o(a?.settings?.passwordPolicy?.minLength ?? 8), [C, r] = o(a?.settings?.passwordPolicy?.requireUppercase ?? !0), [n, m] = o(a?.settings?.passwordPolicy?.requireLowercase ?? !0), [v, S] = o(a?.settings?.passwordPolicy?.requireNumbers ?? !0), [z, x] = o(a?.settings?.passwordPolicy?.requireSymbols ?? !1), [I, A] = o(
    Object.entries(a?.customAttributes ?? {}).map(([y, M]) => ({ key: y, value: M }))
  ), [L, E] = o(!1), P = w(() => {
    A((y) => [...y, { key: "", value: "" }]);
  }, []), D = w((y) => {
    A((M) => M.filter((B, W) => W !== y));
  }, []), N = w((y, M, B) => {
    A(
      (W) => W.map((Z, Y) => Y === y ? { ...Z, [M]: B } : Z)
    );
  }, []), k = w(
    async (y) => {
      y.preventDefault(), E(!0);
      try {
        const M = {};
        for (const { key: B, value: W } of I)
          B.trim() && (M[B.trim()] = W);
        await i({
          poolName: c,
          customAttributes: M,
          settings: {
            mfaConfiguration: u,
            passwordPolicy: {
              minLength: d,
              requireUppercase: C,
              requireLowercase: n,
              requireNumbers: v,
              requireSymbols: z
            }
          }
        });
      } finally {
        E(!1);
      }
    },
    [c, u, d, C, n, v, z, I, i]
  );
  return /* @__PURE__ */ t(F, { title: l ? "Edit Pool" : "Create Pool", className: "max-w-[640px]", children: [
    g && /* @__PURE__ */ e($, { variant: "error", children: g }),
    /* @__PURE__ */ e(R, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: k, children: [
      /* @__PURE__ */ e(
        T,
        {
          label: "Pool Name",
          name: "poolName",
          value: c,
          onChange: (y) => h(String(y)),
          required: !0,
          placeholder: "my-user-pool"
        }
      ),
      /* @__PURE__ */ t("section", { className: "mb-6", children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mb-2", children: "MFA Configuration" }),
        /* @__PURE__ */ e(
          T,
          {
            label: "MFA Mode",
            name: "mfaConfig",
            type: "select",
            value: u,
            onChange: (y) => s(String(y)),
            options: [
              { value: "OFF", label: "Off" },
              { value: "OPTIONAL", label: "Optional" },
              { value: "REQUIRED", label: "Required" }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ t("section", { className: "mb-6", children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mb-2", children: "Password Policy" }),
        /* @__PURE__ */ e(
          T,
          {
            label: "Minimum Length",
            name: "minLength",
            type: "number",
            value: d,
            onChange: (y) => b(Number(y))
          }
        ),
        /* @__PURE__ */ e(
          T,
          {
            label: "Require Uppercase",
            name: "requireUppercase",
            type: "checkbox",
            value: C,
            onChange: (y) => r(!!y)
          }
        ),
        /* @__PURE__ */ e(
          T,
          {
            label: "Require Lowercase",
            name: "requireLowercase",
            type: "checkbox",
            value: n,
            onChange: (y) => m(!!y)
          }
        ),
        /* @__PURE__ */ e(
          T,
          {
            label: "Require Numbers",
            name: "requireNumbers",
            type: "checkbox",
            value: v,
            onChange: (y) => S(!!y)
          }
        ),
        /* @__PURE__ */ e(
          T,
          {
            label: "Require Symbols",
            name: "requireSymbols",
            type: "checkbox",
            value: z,
            onChange: (y) => x(!!y)
          }
        )
      ] }),
      /* @__PURE__ */ t("section", { className: "mb-6", children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mb-2", children: "Custom Attributes" }),
        I.map((y, M) => /* @__PURE__ */ t("div", { className: "flex gap-2 items-center mb-2", children: [
          /* @__PURE__ */ e(
            O,
            {
              className: "flex-1",
              placeholder: "Attribute name",
              value: y.key,
              onChange: (B) => N(M, "key", B.target.value)
            }
          ),
          /* @__PURE__ */ e(
            O,
            {
              className: "flex-1",
              placeholder: "Type (string, number, etc.)",
              value: y.value,
              onChange: (B) => N(M, "value", B.target.value)
            }
          ),
          /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => D(M), children: "Remove" })
        ] }, M)),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: P, children: "+ Add Attribute" })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle", children: [
        /* @__PURE__ */ e(f, { type: "submit", variant: "primary", size: "lg", disabled: L, children: L ? "Saving..." : l ? "Update Pool" : "Create Pool" }),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: p, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
const ke = {
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
}, Se = {
  success: "success",
  warning: "warning",
  danger: "danger",
  info: "info",
  neutral: "neutral"
};
function ie({ status: a, variant: l }) {
  const i = l ? Se[l] || "neutral" : ke[a] || "neutral";
  return /* @__PURE__ */ e(X, { tone: i, size: "sm", children: a });
}
function rt({
  users: a,
  poolName: l,
  onCreateUser: i,
  onEditUser: p,
  onDeleteUser: g,
  loading: c
}) {
  const [h, u] = o(null), [s, d] = o(!1), b = w(
    async (n) => {
      d(!0);
      try {
        await g(n);
      } finally {
        d(!1), u(null);
      }
    },
    [g]
  ), C = V(
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
        render: (n) => /* @__PURE__ */ e(ie, { status: n.status })
      },
      { key: "createdAt", header: "Created", sortable: !0 }
    ],
    []
  ), r = w(
    (n) => /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => p(n.userId), children: "Edit" }),
      /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => u(n.userId), children: "Delete" })
    ] }),
    [p]
  );
  return /* @__PURE__ */ t(
    F,
    {
      title: `Users — ${l}`,
      actions: /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: i, children: "Create User" }),
      children: [
        /* @__PURE__ */ e(
          H,
          {
            columns: C,
            data: a,
            keyField: "userId",
            actions: r,
            loading: c,
            emptyMessage: "No users in this pool yet.",
            emptyIcon: "👤"
          }
        ),
        /* @__PURE__ */ e(
          Q,
          {
            open: !!h,
            onConfirm: () => h && b(h),
            onCancel: () => u(null),
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
function lt({
  user: a,
  isEdit: l,
  customAttributeDefinitions: i,
  onSubmit: p,
  onCancel: g,
  error: c
}) {
  const [h, u] = o(a?.email ?? ""), [s, d] = o(""), [b, C] = o(a?.givenName ?? ""), [r, n] = o(a?.familyName ?? ""), [m, v] = o(a?.nickname ?? ""), [S, z] = o(a?.picture ?? ""), [x, I] = o(a?.website ?? ""), [A, L] = o(
    Object.fromEntries(
      Object.entries(a?.customAttributes ?? {}).map(([k, y]) => [k, String(y)])
    )
  ), [E, P] = o(!1), D = w((k, y) => {
    L((M) => ({ ...M, [k]: y }));
  }, []), N = w(
    async (k) => {
      k.preventDefault(), P(!0);
      try {
        await p({
          email: h,
          ...!l && s ? { password: s } : {},
          givenName: b || void 0,
          familyName: r || void 0,
          nickname: m || void 0,
          picture: S || void 0,
          website: x || void 0,
          customAttributes: A
        });
      } finally {
        P(!1);
      }
    },
    [h, s, b, r, m, S, x, A, l, p]
  );
  return /* @__PURE__ */ t(F, { title: l ? "Edit User" : "Create User", className: "max-w-[640px]", children: [
    c && /* @__PURE__ */ e($, { variant: "error", children: c }),
    /* @__PURE__ */ e(R, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: N, children: [
      /* @__PURE__ */ e(
        T,
        {
          label: "Email",
          name: "email",
          type: "email",
          value: h,
          onChange: (k) => u(String(k)),
          required: !0,
          placeholder: "user@example.com"
        }
      ),
      !l && /* @__PURE__ */ e(
        T,
        {
          label: "Password",
          name: "password",
          type: "password",
          value: s,
          onChange: (k) => d(String(k)),
          required: !0,
          placeholder: "Temporary password",
          helpText: "User will be prompted to change on first login."
        }
      ),
      /* @__PURE__ */ e(
        T,
        {
          label: "Given Name",
          name: "givenName",
          value: b,
          onChange: (k) => C(String(k)),
          placeholder: "John"
        }
      ),
      /* @__PURE__ */ e(
        T,
        {
          label: "Family Name",
          name: "familyName",
          value: r,
          onChange: (k) => n(String(k)),
          placeholder: "Doe"
        }
      ),
      /* @__PURE__ */ e(
        T,
        {
          label: "Nickname",
          name: "nickname",
          value: m,
          onChange: (k) => v(String(k)),
          placeholder: "johnny"
        }
      ),
      /* @__PURE__ */ e(
        T,
        {
          label: "Picture URL",
          name: "picture",
          value: S,
          onChange: (k) => z(String(k)),
          placeholder: "https://..."
        }
      ),
      /* @__PURE__ */ e(
        T,
        {
          label: "Website",
          name: "website",
          value: x,
          onChange: (k) => I(String(k)),
          placeholder: "https://..."
        }
      ),
      i && Object.keys(i).length > 0 && /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mt-6 mb-2", children: "Custom Attributes" }),
        Object.entries(i).map(([k, y]) => /* @__PURE__ */ e(
          T,
          {
            label: k,
            name: `custom_${k}`,
            type: y === "number" ? "number" : "text",
            value: A[k] ?? "",
            onChange: (M) => D(k, String(M)),
            helpText: `Type: ${y}`
          },
          k
        ))
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle", children: [
        /* @__PURE__ */ e(f, { type: "submit", variant: "primary", size: "lg", disabled: E, children: E ? "Saving..." : l ? "Update User" : "Create User" }),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: g, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
function it({
  groups: a,
  poolName: l,
  onCreateGroup: i,
  onEditGroup: p,
  onDeleteGroup: g,
  loading: c
}) {
  const [h, u] = o(null), [s, d] = o(!1), b = w(
    async (n) => {
      d(!0);
      try {
        await g(n);
      } finally {
        d(!1), u(null);
      }
    },
    [g]
  ), C = V(
    () => [
      { key: "groupName", header: "Name", sortable: !0 },
      { key: "description", header: "Description" },
      {
        key: "permissions",
        header: "Permissions",
        render: (n) => /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: n.permissions.length === 0 ? /* @__PURE__ */ e("span", { className: "text-text-tertiary text-xs", children: "None" }) : n.permissions.map((m) => /* @__PURE__ */ e(X, { tone: "info", size: "xs", children: m }, m)) })
      }
    ],
    []
  ), r = w(
    (n) => /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => p(n.groupId), children: "Edit" }),
      /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => u(n.groupId), children: "Delete" })
    ] }),
    [p]
  );
  return /* @__PURE__ */ t(
    F,
    {
      title: `Groups — ${l}`,
      actions: /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: i, children: "Create Group" }),
      children: [
        /* @__PURE__ */ e(
          H,
          {
            columns: C,
            data: a,
            keyField: "groupId",
            actions: r,
            loading: c,
            emptyMessage: "No groups in this pool yet.",
            emptyIcon: "👥"
          }
        ),
        /* @__PURE__ */ e(
          Q,
          {
            open: !!h,
            onConfirm: () => h && b(h),
            onCancel: () => u(null),
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
function st({
  group: a,
  isEdit: l,
  members: i,
  availableUsers: p,
  onSubmit: g,
  onAddMember: c,
  onRemoveMember: h,
  onCancel: u,
  error: s
}) {
  const [d, b] = o(a?.groupName ?? ""), [C, r] = o(a?.description ?? ""), [n, m] = o(a?.permissions ?? []), [v, S] = o(""), [z, x] = o(""), [I, A] = o(!1), L = w(
    (N) => {
      if (N.key === "Enter") {
        N.preventDefault();
        const k = v.trim();
        k && !n.includes(k) && m((y) => [...y, k]), S("");
      }
    },
    [v, n]
  ), E = w((N) => {
    m((k) => k.filter((y) => y !== N));
  }, []), P = w(async () => {
    z && c && (await c(z), x(""));
  }, [z, c]), D = w(
    async (N) => {
      N.preventDefault(), A(!0);
      try {
        await g({ groupName: d, description: C, permissions: n });
      } finally {
        A(!1);
      }
    },
    [d, C, n, g]
  );
  return /* @__PURE__ */ t(F, { title: l ? "Edit Group" : "Create Group", className: "max-w-[640px]", children: [
    s && /* @__PURE__ */ e($, { variant: "error", children: s }),
    /* @__PURE__ */ e(R, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: D, children: [
      /* @__PURE__ */ e(
        T,
        {
          label: "Group Name",
          name: "groupName",
          value: d,
          onChange: (N) => b(String(N)),
          required: !0,
          placeholder: "admins"
        }
      ),
      /* @__PURE__ */ e(
        T,
        {
          label: "Description",
          name: "description",
          type: "textarea",
          value: C,
          onChange: (N) => r(String(N)),
          placeholder: "Describe this group's purpose..."
        }
      ),
      /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mt-6 mb-2", children: "Permissions" }),
        /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5 mb-2", children: n.map((N) => /* @__PURE__ */ t("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-info text-white text-sm font-medium", children: [
          N,
          /* @__PURE__ */ e(
            f,
            {
              variant: "ghost",
              size: "sm",
              className: "p-0 text-white text-[14px] leading-none min-w-0 min-h-0",
              onClick: () => E(N),
              "aria-label": `Remove permission ${N}`,
              children: "x"
            }
          )
        ] }, N)) }),
        /* @__PURE__ */ e(
          O,
          {
            placeholder: "Type a permission and press Enter",
            value: v,
            onChange: (N) => S(N.target.value),
            onKeyDown: L
          }
        )
      ] }),
      l && i && /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mt-6 mb-2", children: "Members" }),
        i.length === 0 ? /* @__PURE__ */ e("p", { className: "text-text-tertiary text-sm", children: "No members yet." }) : i.map((N) => /* @__PURE__ */ t("div", { className: "flex items-center justify-between py-1.5 border-b border-border", children: [
          /* @__PURE__ */ e("span", { className: "text-base", children: N.email }),
          h && /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => h(N.userId), children: "Remove" })
        ] }, N.userId)),
        p && p.length > 0 && c && /* @__PURE__ */ t("div", { className: "flex gap-2 mt-2", children: [
          /* @__PURE__ */ e(
            re,
            {
              className: "flex-1",
              value: z,
              onChange: (N) => x(N.target.value),
              placeholder: "Select user to add...",
              options: p.map((N) => ({ value: N.userId, label: N.email }))
            }
          ),
          /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: P, disabled: !z, children: "Add" })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle", children: [
        /* @__PURE__ */ e(f, { type: "submit", variant: "primary", size: "lg", disabled: I, children: I ? "Saving..." : l ? "Update Group" : "Create Group" }),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: u, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
function ot({
  applications: a,
  onCreateApp: l,
  onCreateAppWithPool: i,
  onEditApp: p,
  onDeleteApp: g,
  loading: c
}) {
  const [h, u] = o(null), [s, d] = o(!1), b = w(
    async (n) => {
      d(!0);
      try {
        await g(n);
      } finally {
        d(!1), u(null);
      }
    },
    [g]
  ), C = V(
    () => [
      { key: "clientName", header: "Name", sortable: !0 },
      {
        key: "clientId",
        header: "Client ID",
        render: (n) => /* @__PURE__ */ e("span", { className: "font-mono text-xs text-neutral", children: n.clientId })
      },
      { key: "poolName", header: "Pool", render: (n) => n.poolName || n.poolId },
      {
        key: "redirectUris",
        header: "Redirect URIs",
        render: (n) => /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", children: [
          n.redirectUris.slice(0, 2).map((m) => /* @__PURE__ */ e(X, { tone: "neutral", size: "xs", children: m }, m)),
          n.redirectUris.length > 2 && /* @__PURE__ */ t(X, { tone: "neutral", size: "xs", children: [
            "+",
            n.redirectUris.length - 2,
            " more"
          ] })
        ] })
      }
    ],
    []
  ), r = w(
    (n) => /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => p(n.clientId), children: "Edit" }),
      /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => u(n.clientId), children: "Delete" })
    ] }),
    [p]
  );
  return /* @__PURE__ */ t(
    F,
    {
      title: "Applications",
      actions: /* @__PURE__ */ t(j, { children: [
        /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: l, children: "New Application" }),
        /* @__PURE__ */ e(f, { variant: "secondary", size: "lg", onClick: i, children: "New App + Pool" })
      ] }),
      children: [
        /* @__PURE__ */ e(
          H,
          {
            columns: C,
            data: a,
            keyField: "clientId",
            actions: r,
            loading: c,
            emptyMessage: "No applications registered yet.",
            emptyIcon: "🔐"
          }
        ),
        /* @__PURE__ */ e(
          Q,
          {
            open: !!h,
            onConfirm: () => h && b(h),
            onCancel: () => u(null),
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
function ce({
  label: a,
  values: l,
  onChange: i,
  placeholder: p
}) {
  const g = () => i([...l, ""]), c = (u) => i(l.filter((s, d) => d !== u)), h = (u, s) => i(l.map((d, b) => b === u ? s : d));
  return /* @__PURE__ */ t("div", { className: "mb-4", children: [
    /* @__PURE__ */ e("label", { className: "block mb-1 text-sm font-semibold text-text-primary", children: a }),
    l.map((u, s) => /* @__PURE__ */ t("div", { className: "flex gap-2 items-center mb-1.5", children: [
      /* @__PURE__ */ e(
        O,
        {
          className: "flex-1",
          value: u,
          onChange: (d) => h(s, d.target.value),
          placeholder: p
        }
      ),
      /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => c(s), children: "Remove" })
    ] }, s)),
    /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: g, children: "+ Add" })
  ] });
}
const Ae = [
  "authorization_code",
  "client_credentials",
  "refresh_token"
], Ie = ["code", "token", "id_token"];
function ct({
  application: a,
  isEdit: l,
  pools: i,
  onSubmit: p,
  onCancel: g,
  error: c
}) {
  const [h, u] = o(a?.clientName ?? ""), [s, d] = o(a?.poolId ?? ""), [b, C] = o(a?.redirectUris ?? [""]), [r, n] = o(a?.postLogoutRedirectUris ?? []), [m, v] = o(a?.grantTypes ?? ["authorization_code"]), [S, z] = o(a?.responseTypes ?? ["code"]), [x, I] = o(a?.scope ?? "openid profile email"), [A, L] = o(!1), E = w((N) => {
    v(
      (k) => k.includes(N) ? k.filter((y) => y !== N) : [...k, N]
    );
  }, []), P = w((N) => {
    z(
      (k) => k.includes(N) ? k.filter((y) => y !== N) : [...k, N]
    );
  }, []), D = w(
    async (N) => {
      N.preventDefault(), L(!0);
      try {
        await p({
          clientName: h,
          poolId: s,
          redirectUris: b.filter((k) => k.trim()),
          postLogoutRedirectUris: r.filter((k) => k.trim()),
          grantTypes: m,
          responseTypes: S,
          scope: x
        });
      } finally {
        L(!1);
      }
    },
    [h, s, b, r, m, S, x, p]
  );
  return /* @__PURE__ */ t(F, { title: l ? "Edit Application" : "New Application", className: "max-w-[640px]", children: [
    c && /* @__PURE__ */ e($, { variant: "error", children: c }),
    /* @__PURE__ */ e(R, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: D, children: [
      /* @__PURE__ */ e(
        T,
        {
          label: "Application Name",
          name: "clientName",
          value: h,
          onChange: (N) => u(String(N)),
          required: !0,
          placeholder: "My App"
        }
      ),
      /* @__PURE__ */ e(
        T,
        {
          label: "User Pool",
          name: "poolId",
          type: "select",
          value: s,
          onChange: (N) => d(String(N)),
          required: !0,
          options: i.map((N) => ({ value: N.poolId, label: N.poolName })),
          placeholder: "Select a pool..."
        }
      ),
      /* @__PURE__ */ e(
        ce,
        {
          label: "Redirect URIs",
          values: b,
          onChange: C,
          placeholder: "https://app.example.com/callback"
        }
      ),
      /* @__PURE__ */ e(
        ce,
        {
          label: "Post-Logout Redirect URIs",
          values: r,
          onChange: n,
          placeholder: "https://app.example.com/logout"
        }
      ),
      /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mt-6 mb-2", children: "Grant Types" }),
        /* @__PURE__ */ e("div", { className: "flex flex-col gap-2 mb-4", children: Ae.map((N) => /* @__PURE__ */ t("label", { className: "flex items-center gap-2 text-base text-text-primary cursor-pointer", children: [
          /* @__PURE__ */ e(
            J,
            {
              checked: m.includes(N),
              onChange: () => E(N)
            }
          ),
          N
        ] }, N)) })
      ] }),
      /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mt-6 mb-2", children: "Response Types" }),
        /* @__PURE__ */ e("div", { className: "flex flex-col gap-2 mb-4", children: Ie.map((N) => /* @__PURE__ */ t("label", { className: "flex items-center gap-2 text-base text-text-primary cursor-pointer", children: [
          /* @__PURE__ */ e(
            J,
            {
              checked: S.includes(N),
              onChange: () => P(N)
            }
          ),
          N
        ] }, N)) })
      ] }),
      /* @__PURE__ */ e(
        T,
        {
          label: "Scope",
          name: "scope",
          value: x,
          onChange: (N) => I(String(N)),
          placeholder: "openid profile email",
          helpText: "Space-separated list of scopes."
        }
      ),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle", children: [
        /* @__PURE__ */ e(f, { type: "submit", variant: "primary", size: "lg", disabled: A, children: A ? "Saving..." : l ? "Update Application" : "Create Application" }),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: g, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
const Pe = ["authorization_code", "client_credentials", "refresh_token"];
function dt({ onSubmit: a, onCancel: l, error: i }) {
  const [p, g] = o(""), [c, h] = o(""), [u, s] = o([""]), [d, b] = o(["authorization_code"]), [C, r] = o(!1), n = w((x) => {
    b(
      (I) => I.includes(x) ? I.filter((A) => A !== x) : [...I, x]
    );
  }, []), m = w(() => {
    s((x) => [...x, ""]);
  }, []), v = w((x) => {
    s((I) => I.filter((A, L) => L !== x));
  }, []), S = w((x, I) => {
    s((A) => A.map((L, E) => E === x ? I : L));
  }, []), z = w(
    async (x) => {
      x.preventDefault(), r(!0);
      try {
        await a({
          poolName: p,
          clientName: c,
          redirectUris: u.filter((I) => I.trim()),
          grantTypes: d
        });
      } finally {
        r(!1);
      }
    },
    [p, c, u, d, a]
  );
  return /* @__PURE__ */ t(F, { title: "New Application + Pool", description: "Create a user pool and register an application in one step.", className: "max-w-[640px]", children: [
    i && /* @__PURE__ */ e($, { variant: "error", children: i }),
    /* @__PURE__ */ e(R, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: z, children: [
      /* @__PURE__ */ e(
        T,
        {
          label: "Pool Name",
          name: "poolName",
          value: p,
          onChange: (x) => g(String(x)),
          required: !0,
          placeholder: "my-user-pool"
        }
      ),
      /* @__PURE__ */ e(
        T,
        {
          label: "Application Name",
          name: "clientName",
          value: c,
          onChange: (x) => h(String(x)),
          required: !0,
          placeholder: "My App"
        }
      ),
      /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mt-6 mb-2", children: "Redirect URIs" }),
        u.map((x, I) => /* @__PURE__ */ t("div", { className: "flex gap-2 items-center mb-1.5", children: [
          /* @__PURE__ */ e(
            O,
            {
              className: "flex-1",
              value: x,
              onChange: (A) => S(I, A.target.value),
              placeholder: "https://app.example.com/callback"
            }
          ),
          u.length > 1 && /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => v(I), children: "Remove" })
        ] }, I)),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: m, children: "+ Add URI" })
      ] }),
      /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mt-6 mb-2", children: "Grant Types" }),
        /* @__PURE__ */ e("div", { className: "flex flex-col gap-2 mb-4", children: Pe.map((x) => /* @__PURE__ */ t("label", { className: "flex items-center gap-2 text-base text-text-primary cursor-pointer", children: [
          /* @__PURE__ */ e(
            J,
            {
              checked: d.includes(x),
              onChange: () => n(x)
            }
          ),
          x
        ] }, x)) })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle", children: [
        /* @__PURE__ */ e(f, { type: "submit", variant: "primary", size: "lg", disabled: C, children: C ? "Creating..." : "Create Pool + Application" }),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: l, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
function mt({
  templates: a,
  onCreateTemplate: l,
  onEditTemplate: i,
  onDeleteTemplate: p,
  onTestSend: g,
  loading: c
}) {
  const [h, u] = o(null), [s, d] = o(!1), [b, C] = o(null), [r, n] = o(""), [m, v] = o(!1), S = w(
    async (A) => {
      d(!0);
      try {
        await p(A);
      } finally {
        d(!1), u(null);
      }
    },
    [p]
  ), z = w(async () => {
    if (!(!b || !r.trim())) {
      v(!0);
      try {
        await g(b, r.trim()), C(null), n("");
      } finally {
        v(!1);
      }
    }
  }, [b, r, g]), x = V(
    () => [
      { key: "name", header: "Name", sortable: !0 },
      { key: "subject", header: "Subject" }
    ],
    []
  ), I = w(
    (A) => /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => i(A.templateId), children: "Edit" }),
      /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => {
        C(A.templateId), n("");
      }, children: "Test Send" }),
      /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => u(A.templateId), children: "Delete" })
    ] }),
    [i]
  );
  return /* @__PURE__ */ t(
    F,
    {
      title: "Email Templates",
      actions: /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: l, children: "Create Template" }),
      children: [
        /* @__PURE__ */ e(
          H,
          {
            columns: x,
            data: a,
            keyField: "templateId",
            actions: I,
            loading: c,
            emptyMessage: "No email templates configured.",
            emptyIcon: "✉️"
          }
        ),
        /* @__PURE__ */ e(
          we,
          {
            open: !!b,
            onClose: () => C(null),
            title: "Send Test Email",
            footer: /* @__PURE__ */ t(j, { children: [
              /* @__PURE__ */ e(f, { variant: "ghost", size: "md", onClick: () => C(null), children: "Cancel" }),
              /* @__PURE__ */ e(f, { variant: "primary", size: "md", onClick: z, disabled: m || !r.trim(), children: m ? "Sending..." : "Send" })
            ] }),
            children: /* @__PURE__ */ e(
              T,
              {
                label: "Recipient Email",
                name: "test-email",
                type: "email",
                value: r,
                onChange: (A) => n(String(A)),
                placeholder: "recipient@example.com"
              }
            )
          }
        ),
        /* @__PURE__ */ e(
          Q,
          {
            open: !!h,
            onConfirm: () => h && S(h),
            onCancel: () => u(null),
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
function ut({
  template: a,
  isEdit: l,
  onSubmit: i,
  onCancel: p,
  error: g
}) {
  const [c, h] = o(a?.name ?? ""), [u, s] = o(a?.subject ?? ""), [d, b] = o(a?.htmlBody ?? ""), [C, r] = o(a?.textBody ?? ""), [n, m] = o(a?.variables ?? []), [v, S] = o(""), [z, x] = o(!1), [I, A] = o(!1), L = w(
    (D) => {
      if (D.key === "Enter") {
        D.preventDefault();
        const N = v.trim();
        N && !n.includes(N) && m((k) => [...k, N]), S("");
      }
    },
    [v, n]
  ), E = w((D) => {
    m((N) => N.filter((k) => k !== D));
  }, []), P = w(
    async (D) => {
      D.preventDefault(), A(!0);
      try {
        await i({ name: c, subject: u, htmlBody: d, textBody: C, variables: n });
      } finally {
        A(!1);
      }
    },
    [c, u, d, C, n, i]
  );
  return /* @__PURE__ */ t(F, { title: l ? "Edit Email Template" : "Create Email Template", className: "max-w-[800px]", children: [
    g && /* @__PURE__ */ e($, { variant: "error", children: g }),
    /* @__PURE__ */ e(R, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: P, children: [
      /* @__PURE__ */ e(
        T,
        {
          label: "Template Name",
          name: "name",
          value: c,
          onChange: (D) => h(String(D)),
          required: !0,
          placeholder: "welcome-email"
        }
      ),
      /* @__PURE__ */ e(
        T,
        {
          label: "Subject",
          name: "subject",
          value: u,
          onChange: (D) => s(String(D)),
          required: !0,
          placeholder: "Welcome to {{appName}}"
        }
      ),
      /* @__PURE__ */ t("div", { className: "mb-4", children: [
        /* @__PURE__ */ t("div", { className: "flex items-center justify-between mb-1", children: [
          /* @__PURE__ */ e("label", { className: "text-sm font-semibold text-text-primary", children: "HTML Body" }),
          /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => x((D) => !D), children: z ? "Hide Preview" : "Show Preview" })
        ] }),
        /* @__PURE__ */ e(
          fe,
          {
            value: d,
            onChange: (D) => b(D.target.value),
            placeholder: "<html><body>...</body></html>",
            rows: 10,
            className: "resize-y font-mono"
          }
        ),
        z && /* @__PURE__ */ e(
          "div",
          {
            className: "border border-border rounded-sm p-4 bg-white min-h-[200px] mt-2",
            dangerouslySetInnerHTML: { __html: d }
          }
        )
      ] }),
      /* @__PURE__ */ e(
        T,
        {
          label: "Text Body",
          name: "textBody",
          type: "textarea",
          value: C,
          onChange: (D) => r(String(D)),
          placeholder: "Plain text version of the email..."
        }
      ),
      /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mt-6 mb-2", children: "Variables" }),
        /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5 mb-2", children: n.map((D) => /* @__PURE__ */ t("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-info text-white text-sm font-medium", children: [
          "{{" + D + "}}",
          /* @__PURE__ */ e(
            f,
            {
              variant: "ghost",
              size: "sm",
              className: "p-0 text-white text-[14px] leading-none min-w-0 min-h-0",
              onClick: () => E(D),
              "aria-label": `Remove variable ${D}`,
              children: "x"
            }
          )
        ] }, D)) }),
        /* @__PURE__ */ e(
          O,
          {
            placeholder: "Type variable name and press Enter",
            value: v,
            onChange: (D) => S(D.target.value),
            onKeyDown: L
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle", children: [
        /* @__PURE__ */ e(f, { type: "submit", variant: "primary", size: "lg", disabled: I, children: I ? "Saving..." : l ? "Update Template" : "Create Template" }),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: p, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
function ht({
  metrics: a,
  users: l,
  pools: i,
  onRefresh: p,
  loading: g
}) {
  const [c, h] = o(""), u = V(() => l ?? [], [l]), s = V(
    () => [
      { key: "email", header: "Email", sortable: !0 },
      {
        key: "mfaEnabled",
        header: "MFA Status",
        width: "140px",
        render: (d) => /* @__PURE__ */ e(
          ie,
          {
            status: d.mfaEnabled ? "ENABLED" : "DISABLED",
            variant: d.mfaEnabled ? "success" : "warning"
          }
        )
      },
      { key: "deviceCount", header: "Devices", width: "100px" }
    ],
    []
  );
  return g ? /* @__PURE__ */ t(F, { title: "MFA Management", children: [
    /* @__PURE__ */ e("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4", children: [1, 2, 3, 4].map((d) => /* @__PURE__ */ t(R, { padding: "md", children: [
      /* @__PURE__ */ e("div", { className: "h-5 w-12 rounded bg-surface-hover animate-pulse mb-2" }),
      /* @__PURE__ */ e("div", { className: "h-3 w-20 rounded bg-surface-hover animate-pulse" })
    ] }, d)) }),
    /* @__PURE__ */ e(R, { className: "h-[200px] animate-pulse" })
  ] }) : /* @__PURE__ */ t(
    F,
    {
      title: "MFA Management",
      actions: /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: p, children: "Refresh" }),
      children: [
        a && /* @__PURE__ */ t("section", { className: "grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4", children: [
          /* @__PURE__ */ t(R, { padding: "md", children: [
            /* @__PURE__ */ e("div", { className: "text-[1.75rem] font-bold text-info-fg mb-1", children: a.totalUsers }),
            /* @__PURE__ */ e("div", { className: "text-sm text-neutral", children: "Total Users" })
          ] }),
          /* @__PURE__ */ t(R, { padding: "md", children: [
            /* @__PURE__ */ e("div", { className: "text-[1.75rem] font-bold text-success-fg mb-1", children: a.mfaEnabled }),
            /* @__PURE__ */ e("div", { className: "text-sm text-neutral", children: "MFA Enabled" })
          ] }),
          /* @__PURE__ */ t(R, { padding: "md", children: [
            /* @__PURE__ */ e("div", { className: "text-[1.75rem] font-bold text-warning-fg mb-1", children: a.mfaDisabled }),
            /* @__PURE__ */ e("div", { className: "text-sm text-neutral", children: "MFA Disabled" })
          ] }),
          /* @__PURE__ */ t(R, { padding: "md", children: [
            /* @__PURE__ */ t("div", { className: "text-[1.75rem] font-bold text-info-fg mb-1", children: [
              a.adoptionRate,
              "%"
            ] }),
            /* @__PURE__ */ e("div", { className: "text-sm text-neutral", children: "Adoption Rate" })
          ] })
        ] }),
        i && i.length > 0 && /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "Filter by pool" }),
          /* @__PURE__ */ e(
            re,
            {
              className: "w-64",
              value: c,
              onChange: (d) => h(d.target.value),
              options: [
                { value: "", label: "All Pools" },
                ...i.map((d) => ({
                  value: d.poolId,
                  label: `${d.poolName} (${d.userCount} users)`
                }))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ e(
          H,
          {
            columns: s,
            data: u,
            keyField: "userId",
            emptyMessage: "No user MFA data available.",
            emptyIcon: "🔑"
          }
        )
      ]
    }
  );
}
const Te = ["", "user", "pool", "client", "group", "template"];
function pt({
  records: a,
  onQuery: l,
  onViewEntity: i,
  onReplay: p,
  loading: g,
  totalRecords: c
}) {
  const [h, u] = o(""), [s, d] = o(""), [b, C] = o(""), [r, n] = o(""), [m, v] = o("50"), [S, z] = o(""), [x, I] = o(""), [A, L] = o(null), [E, P] = o(!1), D = w(async () => {
    await l({
      entityType: h || void 0,
      entityId: s || void 0,
      fromTime: b ? new Date(b).getTime() : void 0,
      toTime: r ? new Date(r).getTime() : void 0,
      limit: m ? Number(m) : void 0
    });
  }, [h, s, b, r, m, l]), N = w(async () => {
    if (!(!S || !x)) {
      P(!0);
      try {
        const y = await p(S, new Date(x).getTime());
        L(y);
      } finally {
        P(!1);
      }
    }
  }, [S, x, p]), k = V(
    () => [
      {
        key: "timestamp",
        header: "Timestamp",
        sortable: !0,
        render: (y) => /* @__PURE__ */ e("span", { className: "font-mono text-xs text-neutral", children: new Date(y.timestamp).toLocaleString() })
      },
      {
        key: "actor",
        header: "Actor",
        render: (y) => typeof y.actor == "string" ? y.actor : y.actor?.email || y.actor?.id || JSON.stringify(y.actor)
      },
      { key: "entityType", header: "Entity Type" },
      {
        key: "entityId",
        header: "Entity ID",
        render: (y) => /* @__PURE__ */ e(
          f,
          {
            variant: "ghost",
            size: "sm",
            className: "p-0 underline text-info-fg font-mono text-xs",
            onClick: () => i(y.entityType, y.entityId),
            children: y.entityId
          }
        )
      },
      { key: "operation", header: "Operation" }
    ],
    [i]
  );
  return /* @__PURE__ */ t(F, { title: "Audit Log", children: [
    /* @__PURE__ */ e(R, { padding: "md", children: /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-4 items-end", children: [
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "Entity Type" }),
        /* @__PURE__ */ e(
          re,
          {
            className: "w-40",
            value: h,
            onChange: (y) => u(y.target.value),
            options: [
              { value: "", label: "All" },
              ...Te.filter(Boolean).map((y) => ({ value: y, label: y }))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "Entity ID" }),
        /* @__PURE__ */ e(O, { className: "w-44", value: s, onChange: (y) => d(y.target.value), placeholder: "Optional" })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "From" }),
        /* @__PURE__ */ e(O, { className: "w-52", type: "datetime-local", value: b, onChange: (y) => C(y.target.value) })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "To" }),
        /* @__PURE__ */ e(O, { className: "w-52", type: "datetime-local", value: r, onChange: (y) => n(y.target.value) })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "Limit" }),
        /* @__PURE__ */ e(O, { className: "w-[70px]", type: "number", value: m, onChange: (y) => v(y.target.value) })
      ] }),
      /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: D, disabled: g, children: g ? "Querying..." : "Query" })
    ] }) }),
    c !== void 0 && /* @__PURE__ */ t("p", { className: "text-sm text-text-tertiary m-0", children: [
      c,
      " total record(s)"
    ] }),
    /* @__PURE__ */ e(
      H,
      {
        columns: k,
        data: a,
        keyField: "timestamp",
        loading: g,
        emptyMessage: "No audit records found. Adjust filters and query.",
        emptyIcon: "📜"
      }
    ),
    /* @__PURE__ */ t(R, { padding: "md", children: [
      /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mb-4 mt-0", children: "Point-in-Time Replay" }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-4 items-end mb-4", children: [
        /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "Entity ID" }),
          /* @__PURE__ */ e(O, { className: "w-44", value: S, onChange: (y) => z(y.target.value), placeholder: "entity-id" })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "At Timestamp" }),
          /* @__PURE__ */ e(O, { className: "w-52", type: "datetime-local", value: x, onChange: (y) => I(y.target.value) })
        ] }),
        /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: N, disabled: E || !S || !x, children: E ? "Replaying..." : "Replay" })
      ] }),
      A && /* @__PURE__ */ e("pre", { className: "p-4 bg-surface-panel border border-border rounded-md font-mono text-xs text-text-primary overflow-x-auto whitespace-pre-wrap max-h-[300px] overflow-y-auto m-0", children: JSON.stringify(A, null, 2) })
    ] })
  ] });
}
function ft({ status: a, onNavigate: l }) {
  const [i, p] = o(null), g = w((s) => {
    p((d) => d === s ? null : s);
  }, []), c = V(
    () => [
      {
        title: "Create User Pool",
        done: a.hasUserPools,
        content: /* @__PURE__ */ t("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ e("p", { className: "m-0 text-sm text-text-secondary", children: a.hasUserPools ? `${a.poolCount} pool(s) configured.` : "No user pools yet." }),
          /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => l("/identity/admin/pools/new"), children: "Create a User Pool" }) })
        ] })
      },
      {
        title: "Register Application",
        done: a.hasClients,
        content: /* @__PURE__ */ t("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ e("p", { className: "m-0 text-sm text-text-secondary", children: a.hasClients ? `${a.clientCount} application(s) registered.` : "No applications registered." }),
          /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => l("/identity/admin/applications/new"), children: "Register an Application" }) })
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
          a.firstPoolId && /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => l(`/identity/admin/pools/${a.firstPoolId}/users/new`), children: "Create Admin User" }) })
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
          /* @__PURE__ */ e("pre", { className: "px-4 py-3 bg-surface-inverse text-text-inverse rounded-md font-mono text-xs overflow-x-auto whitespace-pre m-0", children: `// OIDC Authorization Code Flow
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
    [a, l]
  ), h = c.filter((s) => s.done).length, u = Math.round(h / c.length * 100);
  return /* @__PURE__ */ t(
    F,
    {
      title: "Setup Guide",
      description: `${h} of ${c.length} steps completed (${u}%)`,
      children: [
        /* @__PURE__ */ e("div", { className: "h-2 bg-surface-hover rounded-full overflow-hidden", children: /* @__PURE__ */ e(
          "div",
          {
            className: "h-full bg-success rounded-full transition-[width] duration-300 ease-in-out",
            style: { width: `${u}%` }
          }
        ) }),
        /* @__PURE__ */ e("div", { className: "flex flex-col gap-2", children: c.map((s, d) => /* @__PURE__ */ t(R, { children: [
          /* @__PURE__ */ t(
            "div",
            {
              className: "flex items-center justify-between px-5 py-4 cursor-pointer select-none",
              onClick: () => g(d),
              role: "button",
              "aria-expanded": i === d,
              children: [
                /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ e(
                    "div",
                    {
                      className: G(
                        "w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0",
                        s.done ? "bg-success text-white" : "bg-surface-hover text-text-tertiary"
                      ),
                      children: s.done ? "✓" : d + 1
                    }
                  ),
                  /* @__PURE__ */ e("span", { className: "text-sm font-medium text-text-primary", children: s.title })
                ] }),
                /* @__PURE__ */ e("span", { className: "text-text-tertiary text-sm", children: i === d ? "▲" : "▼" })
              ]
            }
          ),
          i === d && /* @__PURE__ */ e("div", { className: "px-5 pb-5 pt-0 border-t border-border-subtle", children: /* @__PURE__ */ e("div", { className: "pt-4", children: s.content }) })
        ] }, d)) })
      ]
    }
  );
}
function De({ data: a }) {
  return /* @__PURE__ */ e("pre", { className: "p-5 font-mono text-xs text-text-primary overflow-x-auto whitespace-pre-wrap max-h-[400px] overflow-y-auto m-0 bg-surface-panel", children: JSON.stringify(a, null, 2) });
}
function ze({ rates: a }) {
  const l = Object.entries(a);
  return l.length === 0 ? /* @__PURE__ */ e("p", { className: "p-5 text-center text-text-tertiary text-sm m-0", children: "No rate limiter data available." }) : /* @__PURE__ */ t(ee, { children: [
    /* @__PURE__ */ e(te, { children: /* @__PURE__ */ t("tr", { children: [
      /* @__PURE__ */ e(_, { children: "Key" }),
      /* @__PURE__ */ e(_, { children: "Value" })
    ] }) }),
    /* @__PURE__ */ e(ae, { children: l.map(([i, p]) => /* @__PURE__ */ t(ne, { children: [
      /* @__PURE__ */ e(q, { className: "font-mono text-xs", children: i }),
      /* @__PURE__ */ e(q, { children: typeof p == "object" ? JSON.stringify(p) : String(p) })
    ] }, i)) })
  ] });
}
function gt({
  diagnostics: a,
  rates: l,
  dlq: i,
  onRedrive: p,
  onPurge: g,
  onRefresh: c,
  loading: h
}) {
  const [u, s] = o(!1), d = ue(null);
  he(() => (u ? d.current = setInterval(c, 1e4) : d.current && (clearInterval(d.current), d.current = null), () => {
    d.current && clearInterval(d.current);
  }), [u, c]);
  const b = w(
    async (r) => {
      await p(r);
    },
    [p]
  ), C = w(
    async (r) => {
      await g(r);
    },
    [g]
  );
  return h ? /* @__PURE__ */ e(F, { title: "Diagnostics", children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-4", children: [1, 2, 3].map((r) => /* @__PURE__ */ e(R, { className: "h-[120px] animate-pulse" }, r)) }) }) : /* @__PURE__ */ t(
    F,
    {
      title: "Diagnostics",
      actions: /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ t("label", { className: "flex items-center gap-1.5 text-sm text-neutral cursor-pointer", children: [
          /* @__PURE__ */ e(
            J,
            {
              checked: u,
              onChange: s,
              className: "rounded"
            }
          ),
          "Auto-refresh (10s)"
        ] }),
        /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: c, children: "Refresh" })
      ] }),
      children: [
        /* @__PURE__ */ t(R, { children: [
          /* @__PURE__ */ e("div", { className: "px-5 py-3 border-b border-border bg-surface-panel", children: /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-text-primary m-0", children: "Node / Cluster Diagnostics" }) }),
          a ? /* @__PURE__ */ e(De, { data: a }) : /* @__PURE__ */ e("p", { className: "p-5 text-center text-text-tertiary text-sm m-0", children: "No diagnostics data available." })
        ] }),
        /* @__PURE__ */ t(R, { children: [
          /* @__PURE__ */ e("div", { className: "px-5 py-3 border-b border-border bg-surface-panel", children: /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-text-primary m-0", children: "Rate Limiter Stats" }) }),
          l ? /* @__PURE__ */ e(ze, { rates: l }) : /* @__PURE__ */ e("p", { className: "p-5 text-center text-text-tertiary text-sm m-0", children: "No rate data available." })
        ] }),
        /* @__PURE__ */ t(R, { children: [
          /* @__PURE__ */ e("div", { className: "px-5 py-3 border-b border-border bg-surface-panel", children: /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-text-primary m-0", children: "Dead Letter Queue" }) }),
          !i || i.length === 0 ? /* @__PURE__ */ e("p", { className: "p-5 text-center text-text-tertiary text-sm m-0", children: "Dead letter queue is empty." }) : /* @__PURE__ */ t(ee, { children: [
            /* @__PURE__ */ e(te, { children: /* @__PURE__ */ t("tr", { children: [
              /* @__PURE__ */ e(_, { children: "ID" }),
              /* @__PURE__ */ e(_, { children: "Error" }),
              /* @__PURE__ */ e(_, { children: "Failed At" }),
              /* @__PURE__ */ e(_, { children: "Retries" }),
              /* @__PURE__ */ e(_, { className: "text-right", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ e(ae, { children: i.map((r) => /* @__PURE__ */ t(ne, { children: [
              /* @__PURE__ */ t(q, { className: "font-mono text-xs", children: [
                r.id.substring(0, 12),
                "..."
              ] }),
              /* @__PURE__ */ e(q, { children: /* @__PURE__ */ e(X, { tone: "danger", size: "xs", children: r.error }) }),
              /* @__PURE__ */ e(q, { className: "text-xs text-neutral", children: new Date(r.failedAt).toLocaleString() }),
              /* @__PURE__ */ e(q, { children: /* @__PURE__ */ e(X, { tone: "neutral", size: "xs", mono: !0, children: r.retryCount }) }),
              /* @__PURE__ */ e(q, { className: "text-right", children: /* @__PURE__ */ t("div", { className: "flex items-center justify-end gap-2", children: [
                /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => b(r.id), children: "Redrive" }),
                /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => C(r.id), children: "Purge" })
              ] }) })
            ] }, r.id)) })
          ] })
        ] })
      ]
    }
  );
}
function xt({
  uid: a,
  interactionUrl: l,
  clientName: i,
  logoUrl: p,
  error: g = null,
  onLogin: c,
  onRegister: h,
  onForgotPassword: u,
  registrationEnabled: s = !0,
  forgotPasswordEnabled: d = !0
}) {
  const [b, C] = o("signin"), [r, n] = o(!1), [m, v] = o(null), [S, z] = o(""), [x, I] = o(""), [A, L] = o(""), [E, P] = o(""), [D, N] = o(""), [k, y] = o(""), [M, B] = o(""), [W, Z] = o(!1), [Y, xe] = o(""), [be, se] = o(!1), oe = g || m, ye = w(async (U) => {
    U.preventDefault(), v(null), n(!0);
    try {
      await c(S, x);
    } catch (K) {
      v(K instanceof Error ? K.message : "Login failed");
    } finally {
      n(!1);
    }
  }, [S, x, c]), ve = w(async (U) => {
    if (U.preventDefault(), v(null), E !== D) {
      v("Passwords do not match");
      return;
    }
    n(!0);
    try {
      await h({
        email: A,
        password: E,
        givenName: k || void 0,
        familyName: M || void 0,
        enableMfa: W || void 0
      });
    } catch (K) {
      v(K instanceof Error ? K.message : "Registration failed");
    } finally {
      n(!1);
    }
  }, [A, E, D, k, M, W, h]), Ne = w(async (U) => {
    U.preventDefault(), v(null), n(!0);
    try {
      await u(Y), se(!0);
    } catch (K) {
      v(K instanceof Error ? K.message : "Request failed");
    } finally {
      n(!1);
    }
  }, [Y, u]), le = (U) => {
    C(U), v(null), se(!1);
  };
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-surface-panel", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[440px] bg-white rounded-xl shadow-md p-8", role: "main", "aria-label": "Authentication", children: [
    /* @__PURE__ */ t("header", { className: "flex flex-col items-center gap-3 mb-6", children: [
      p && /* @__PURE__ */ e("img", { src: p, alt: "", className: "w-14 h-14 object-contain rounded-md" }),
      i && /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-text-primary m-0", children: i })
    ] }),
    /* @__PURE__ */ t("nav", { className: "flex border-b border-border mb-6", role: "tablist", "aria-label": "Authentication method", children: [
      /* @__PURE__ */ e(
        f,
        {
          variant: "ghost",
          size: "sm",
          role: "tab",
          "aria-selected": b === "signin",
          className: G(
            "flex-1 rounded-none border-b-2",
            b === "signin" ? "border-b-[#3b82f6] text-info-fg font-semibold" : "border-b-transparent text-neutral font-normal"
          ),
          onClick: () => le("signin"),
          children: "Sign In"
        }
      ),
      s && /* @__PURE__ */ e(
        f,
        {
          variant: "ghost",
          size: "sm",
          role: "tab",
          "aria-selected": b === "register",
          className: G(
            "flex-1 rounded-none border-b-2",
            b === "register" ? "border-b-[#3b82f6] text-info-fg font-semibold" : "border-b-transparent text-neutral font-normal"
          ),
          onClick: () => le("register"),
          children: "Register"
        }
      ),
      d && /* @__PURE__ */ e(
        f,
        {
          variant: "ghost",
          size: "sm",
          role: "tab",
          "aria-selected": b === "forgot",
          className: G(
            "flex-1 rounded-none border-b-2",
            b === "forgot" ? "border-b-[#3b82f6] text-info-fg font-semibold" : "border-b-transparent text-neutral font-normal"
          ),
          onClick: () => le("forgot"),
          children: "Forgot Password"
        }
      )
    ] }),
    oe && /* @__PURE__ */ e("div", { className: "mb-5", children: /* @__PURE__ */ e($, { variant: "error", children: oe }) }),
    b === "signin" && /* @__PURE__ */ t("form", { onSubmit: ye, "aria-label": "Sign in form", children: [
      /* @__PURE__ */ e("input", { type: "hidden", name: "uid", value: a }),
      /* @__PURE__ */ e(
        T,
        {
          label: "Email",
          name: "login-email",
          type: "email",
          value: S,
          onChange: (U) => z(String(U)),
          required: !0,
          placeholder: "you@example.com",
          disabled: r
        }
      ),
      /* @__PURE__ */ e(
        T,
        {
          label: "Password",
          name: "login-password",
          type: "password",
          value: x,
          onChange: (U) => I(String(U)),
          required: !0,
          disabled: r
        }
      ),
      /* @__PURE__ */ e(
        f,
        {
          type: "submit",
          variant: "primary",
          size: "lg",
          fullWidth: !0,
          disabled: r,
          children: r ? "Signing in..." : "Sign In"
        }
      )
    ] }),
    b === "register" && /* @__PURE__ */ t("form", { onSubmit: ve, "aria-label": "Registration form", children: [
      /* @__PURE__ */ e(
        T,
        {
          label: "Email",
          name: "reg-email",
          type: "email",
          value: A,
          onChange: (U) => L(String(U)),
          required: !0,
          placeholder: "you@example.com",
          disabled: r
        }
      ),
      /* @__PURE__ */ t("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ e("div", { className: "flex-1", children: /* @__PURE__ */ e(
          T,
          {
            label: "Given Name",
            name: "reg-given",
            value: k,
            onChange: (U) => y(String(U)),
            disabled: r
          }
        ) }),
        /* @__PURE__ */ e("div", { className: "flex-1", children: /* @__PURE__ */ e(
          T,
          {
            label: "Family Name",
            name: "reg-family",
            value: M,
            onChange: (U) => B(String(U)),
            disabled: r
          }
        ) })
      ] }),
      /* @__PURE__ */ e(
        T,
        {
          label: "Password",
          name: "reg-password",
          type: "password",
          value: E,
          onChange: (U) => P(String(U)),
          required: !0,
          disabled: r
        }
      ),
      /* @__PURE__ */ e(
        T,
        {
          label: "Confirm Password",
          name: "reg-confirm",
          type: "password",
          value: D,
          onChange: (U) => N(String(U)),
          required: !0,
          disabled: r
        }
      ),
      /* @__PURE__ */ e(
        T,
        {
          label: "Enable Multi-Factor Authentication",
          name: "reg-mfa",
          type: "checkbox",
          value: W,
          onChange: (U) => Z(!!U),
          disabled: r
        }
      ),
      /* @__PURE__ */ e(
        f,
        {
          type: "submit",
          variant: "primary",
          size: "lg",
          fullWidth: !0,
          disabled: r,
          children: r ? "Creating account..." : "Create Account"
        }
      )
    ] }),
    b === "forgot" && /* @__PURE__ */ e("form", { onSubmit: Ne, "aria-label": "Forgot password form", children: be ? /* @__PURE__ */ e($, { variant: "success", children: "If an account exists for that email, a password reset link has been sent." }) : /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-4 mt-0 leading-relaxed", children: "Enter your email address and we'll send you a link to reset your password." }),
      /* @__PURE__ */ e(
        T,
        {
          label: "Email",
          name: "forgot-email",
          type: "email",
          value: Y,
          onChange: (U) => xe(String(U)),
          required: !0,
          placeholder: "you@example.com",
          disabled: r
        }
      ),
      /* @__PURE__ */ e(
        f,
        {
          type: "submit",
          variant: "primary",
          size: "lg",
          fullWidth: !0,
          disabled: r,
          children: r ? "Sending..." : "Send Reset Link"
        }
      )
    ] }) })
  ] }) });
}
const Ee = {
  openid: "Verify your identity",
  profile: "Access your name and profile information",
  email: "Access your email address",
  address: "Access your mailing address",
  phone: "Access your phone number",
  offline_access: "Maintain access when you are not present"
};
function Re(a) {
  return Ee[a] || `Access: ${a}`;
}
function bt({
  clientName: a,
  scopes: l,
  redirectUri: i,
  onAuthorize: p,
  onDeny: g,
  logoUrl: c
}) {
  const [h, u] = o(!1), s = w(async () => {
    u(!0);
    try {
      await p();
    } finally {
      u(!1);
    }
  }, [p]), d = w(async () => {
    u(!0);
    try {
      await g();
    } finally {
      u(!1);
    }
  }, [g]);
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-surface-panel", children: /* @__PURE__ */ t(
    "div",
    {
      className: "w-full max-w-[440px] bg-white rounded-xl shadow-md overflow-hidden",
      role: "main",
      "aria-label": "Authorization consent",
      children: [
        /* @__PURE__ */ t("header", { className: "flex flex-col items-center gap-3 px-8 pt-8 pb-5", children: [
          c && /* @__PURE__ */ e("img", { src: c, alt: "", className: "w-14 h-14 object-contain rounded-md" }),
          /* @__PURE__ */ t("h1", { className: "text-xl font-bold text-text-primary m-0 text-center", children: [
            "Authorize ",
            a
          ] }),
          /* @__PURE__ */ e("p", { className: "text-sm text-neutral m-0 text-center leading-relaxed", children: "This application is requesting access to your account." })
        ] }),
        /* @__PURE__ */ t("div", { className: "mx-8 border border-border rounded-md overflow-hidden mb-6", children: [
          /* @__PURE__ */ e("p", { className: "text-[11px] font-semibold uppercase tracking-wide text-neutral px-4 py-2.5 m-0 bg-surface-panel border-b border-border", children: "Requested Permissions" }),
          /* @__PURE__ */ e("ul", { className: "list-none p-0 m-0", "aria-label": "Requested permissions", children: l.map((b, C) => /* @__PURE__ */ t(
            "li",
            {
              className: G(
                "flex items-center gap-3 px-4 py-3 text-sm text-text-primary",
                C < l.length - 1 && "border-b border-border"
              ),
              children: [
                /* @__PURE__ */ e("span", { className: "w-2 h-2 rounded-full bg-info shrink-0", "aria-hidden": "true" }),
                /* @__PURE__ */ e("span", { children: Re(b) })
              ]
            },
            b
          )) })
        ] }),
        /* @__PURE__ */ t("div", { className: "px-8 pb-8", children: [
          i && /* @__PURE__ */ t("p", { className: "text-[11px] text-text-tertiary mb-5 mt-0 break-all leading-relaxed", children: [
            "You will be redirected to: ",
            /* @__PURE__ */ e("strong", { className: "text-neutral", children: i })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ e(
              f,
              {
                variant: "ghost",
                size: "lg",
                fullWidth: !0,
                onClick: d,
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
                onClick: s,
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
function Ue({ value: a, size: l = 200, label: i }) {
  return /* @__PURE__ */ t("figure", { className: "flex flex-col items-center gap-2 m-0 p-4 border border-border rounded-md bg-white", children: [
    /* @__PURE__ */ e(
      "img",
      {
        src: a,
        alt: i || "QR Code",
        width: l,
        height: l,
        className: "block rounded-sm [image-rendering:pixelated]"
      }
    ),
    i && /* @__PURE__ */ e("figcaption", { className: "text-sm text-neutral text-center", children: i })
  ] });
}
function ge({
  length: a = 6,
  onComplete: l,
  error: i = null,
  disabled: p = !1,
  autoFocus: g = !1
}) {
  const [c, h] = o(Array(a).fill("")), u = ue([]);
  he(() => {
    g && u.current[0] && u.current[0].focus();
  }, [g]);
  const s = w((r) => {
    r >= 0 && r < a && u.current[r] && (u.current[r].focus(), u.current[r].select());
  }, [a]), d = w((r, n) => {
    const m = n.replace(/\D/g, "").slice(-1);
    h((v) => {
      const S = [...v];
      S[r] = m;
      const z = S.join("");
      return z.length === a && S.every((x) => x !== "") && setTimeout(() => l(z), 0), S;
    }), m && r < a - 1 && s(r + 1);
  }, [a, l, s]), b = w((r, n) => {
    n.key === "Backspace" ? c[r] === "" && r > 0 ? (n.preventDefault(), h((m) => {
      const v = [...m];
      return v[r - 1] = "", v;
    }), s(r - 1)) : h((m) => {
      const v = [...m];
      return v[r] = "", v;
    }) : n.key === "ArrowLeft" && r > 0 ? (n.preventDefault(), s(r - 1)) : n.key === "ArrowRight" && r < a - 1 && (n.preventDefault(), s(r + 1));
  }, [c, a, s]), C = w((r) => {
    r.preventDefault();
    const n = r.clipboardData.getData("text").replace(/\D/g, "").slice(0, a);
    if (!n) return;
    const m = Array(a).fill("");
    for (let v = 0; v < n.length; v++)
      m[v] = n[v];
    h(m), n.length === a ? setTimeout(() => l(n), 0) : s(Math.min(n.length, a - 1));
  }, [a, l, s]);
  return /* @__PURE__ */ t("div", { className: "flex flex-col items-center gap-2", children: [
    /* @__PURE__ */ e(
      "div",
      {
        className: "flex gap-2",
        role: "group",
        "aria-label": "Verification code input",
        children: Array.from({ length: a }, (r, n) => /* @__PURE__ */ e(
          "input",
          {
            ref: (m) => {
              u.current[n] = m;
            },
            type: "text",
            inputMode: "numeric",
            pattern: "[0-9]",
            maxLength: 1,
            value: c[n],
            disabled: p,
            "aria-label": `Digit ${n + 1} of ${a}`,
            onChange: (m) => d(n, m.target.value),
            onKeyDown: (m) => b(n, m),
            onPaste: C,
            onFocus: (m) => m.target.select(),
            className: G(
              "w-11 h-[52px] text-center text-lg font-semibold font-[inherit]",
              "rounded-md outline-none transition-[border-color,box-shadow] duration-150",
              "border-2",
              i ? "border-danger" : "border-border",
              p ? "bg-surface-panel cursor-not-allowed" : "bg-white cursor-text",
              "text-text-primary",
              "focus:border-info focus:ring-2 focus:ring-info/20"
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
        className: "m-0 text-sm text-danger-fg",
        children: i
      }
    )
  ] });
}
const de = ["name", "scan", "verify", "backup"], Le = ["Name", "Scan", "Verify", "Backup"];
function yt({
  onSetup: a,
  onVerify: l,
  onComplete: i,
  userEmail: p
}) {
  const [g, c] = o("name"), [h, u] = o(!1), [s, d] = o(null), [b, C] = o(""), [r, n] = o(null), [m, v] = o([]), [S, z] = o(!1), x = de.indexOf(g), I = w(async (E) => {
    if (E.preventDefault(), !!b.trim()) {
      d(null), u(!0);
      try {
        const P = await a(b.trim());
        n(P), v(P.backupCodes), c("scan");
      } catch (P) {
        d(P instanceof Error ? P.message : "Setup failed");
      } finally {
        u(!1);
      }
    }
  }, [b, a]), A = w(async (E) => {
    if (r) {
      d(null), u(!0);
      try {
        const P = await l(r.deviceId, E);
        P.success ? (P.backupCodes && v(P.backupCodes), c("backup")) : d("Verification failed. Please try again.");
      } catch (P) {
        d(P instanceof Error ? P.message : "Verification failed");
      } finally {
        u(!1);
      }
    }
  }, [r, l]), L = w(async () => {
    try {
      await navigator.clipboard.writeText(m.join(`
`)), z(!0), setTimeout(() => z(!1), 2e3);
    } catch {
    }
  }, [m]);
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-surface-panel", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[480px] bg-white rounded-xl shadow-md p-8", role: "main", "aria-label": "MFA setup", children: [
    /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-text-primary mb-2 mt-0 text-center", children: "Set Up Multi-Factor Authentication" }),
    p && /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-5 mt-0 text-center", children: p }),
    /* @__PURE__ */ e("div", { className: "flex justify-center gap-6 mb-6", role: "group", "aria-label": "Setup progress", children: de.map((E, P) => /* @__PURE__ */ t("div", { className: "flex flex-col items-center gap-1.5", children: [
      /* @__PURE__ */ e(
        "div",
        {
          className: G(
            "w-3 h-3 rounded-full transition-colors duration-200",
            P < x ? "bg-success" : P === x ? "bg-info" : "bg-surface-emphasis"
          ),
          "aria-label": `Step ${P + 1}${P === x ? " (current)" : P < x ? " (completed)" : ""}`
        }
      ),
      /* @__PURE__ */ e("span", { className: G(
        "text-[10px] uppercase tracking-wide font-medium",
        P === x ? "text-text-primary" : "text-text-tertiary"
      ), children: Le[P] })
    ] }, E)) }),
    s && /* @__PURE__ */ e("div", { className: "mb-5", children: /* @__PURE__ */ e($, { variant: "error", children: s }) }),
    g === "name" && /* @__PURE__ */ t("form", { onSubmit: I, "aria-label": "Name your device", children: [
      /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-4 mt-0 text-center leading-relaxed", children: "Give your authenticator device a name so you can identify it later." }),
      /* @__PURE__ */ e(
        T,
        {
          label: "Device Name",
          name: "device-name",
          value: b,
          onChange: (E) => C(String(E)),
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
          disabled: h || !b.trim(),
          children: h ? "Setting up..." : "Continue"
        }
      )
    ] }),
    g === "scan" && r && /* @__PURE__ */ t("div", { children: [
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
        Ue,
        {
          value: r.qrCode,
          size: 200,
          label: `Device: ${b}`
        }
      ) }),
      /* @__PURE__ */ e("p", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary text-center mb-2 mt-0", children: "Or enter this secret manually" }),
      /* @__PURE__ */ e("div", { className: "px-4 py-3 bg-surface-panel border border-border rounded-md font-mono text-sm text-text-primary break-all text-center mb-6 select-all", children: r.secret }),
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
    g === "verify" && /* @__PURE__ */ t("div", { children: [
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
        ge,
        {
          onComplete: A,
          error: s,
          disabled: h,
          autoFocus: !0
        }
      ),
      h && /* @__PURE__ */ e("p", { className: "text-center text-sm text-text-tertiary mt-3", children: "Verifying..." })
    ] }),
    g === "backup" && /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ e("div", { className: "w-14 h-14 mx-auto mb-5 rounded-full bg-[#f0fdf4] flex items-center justify-center", children: /* @__PURE__ */ e("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-success-fg", children: /* @__PURE__ */ e("polyline", { points: "20 6 9 17 4 12" }) }) }),
      /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-5 mt-0 text-center leading-relaxed", children: "Save these backup codes in a safe place. Each code can only be used once." }),
      /* @__PURE__ */ e("div", { className: "grid grid-cols-2 gap-2.5 mb-6", children: m.map((E, P) => /* @__PURE__ */ e("div", { className: "px-3 py-2.5 bg-surface-panel border border-border rounded-md font-mono text-sm text-text-primary text-center select-all", children: E }, P)) }),
      /* @__PURE__ */ e(
        f,
        {
          variant: "primary",
          size: "lg",
          fullWidth: !0,
          onClick: L,
          children: S ? "Copied!" : "Copy All Codes"
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
function vt({
  onVerify: a,
  onVerifyBackup: l,
  error: i = null
}) {
  const [p, g] = o("totp"), [c, h] = o(!1), [u, s] = o(null), [d, b] = o(""), C = i || u, r = w(async (m) => {
    s(null), h(!0);
    try {
      await a(m);
    } catch (v) {
      s(v instanceof Error ? v.message : "Verification failed");
    } finally {
      h(!1);
    }
  }, [a]), n = w(async (m) => {
    if (m.preventDefault(), !!d.trim()) {
      s(null), h(!0);
      try {
        await l(d.trim());
      } catch (v) {
        s(v instanceof Error ? v.message : "Verification failed");
      } finally {
        h(!1);
      }
    }
  }, [d, l]);
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-surface-panel", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[440px] bg-white rounded-xl shadow-md p-8", role: "main", "aria-label": "Multi-factor verification", children: [
    /* @__PURE__ */ e("div", { className: "w-14 h-14 mx-auto mb-5 rounded-full bg-[#eff6ff] flex items-center justify-center", children: /* @__PURE__ */ t("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-info-fg", children: [
      /* @__PURE__ */ e("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
      /* @__PURE__ */ e("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
    ] }) }),
    /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-text-primary mb-2 mt-0 text-center", children: "Verify Your Identity" }),
    p === "totp" ? /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-6 mt-0 text-center leading-relaxed", children: "Enter the 6-digit code from your authenticator app" }),
      C && /* @__PURE__ */ e("div", { className: "mb-5", children: /* @__PURE__ */ e($, { variant: "error", children: C }) }),
      /* @__PURE__ */ e(
        ge,
        {
          onComplete: r,
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
            g("backup"), s(null);
          },
          children: "Use a backup code instead"
        }
      )
    ] }) : /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-6 mt-0 text-center leading-relaxed", children: "Enter one of your backup codes" }),
      C && /* @__PURE__ */ e("div", { className: "mb-5", children: /* @__PURE__ */ e($, { variant: "error", children: C }) }),
      /* @__PURE__ */ t("form", { onSubmit: n, "aria-label": "Backup code verification", children: [
        /* @__PURE__ */ e(
          T,
          {
            label: "Backup Code",
            name: "backup-code",
            value: d,
            onChange: (m) => b(String(m)),
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
            disabled: c || !d.trim(),
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
            g("totp"), s(null);
          },
          children: "Use authenticator code instead"
        }
      )
    ] })
  ] }) });
}
function me(a) {
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
function Nt({
  devices: a,
  userEmail: l,
  mfaEnabled: i,
  onAddDevice: p,
  onRenameDevice: g,
  onRemoveDevice: c,
  loading: h = !1
}) {
  const [u, s] = o(null), [d, b] = o(null), [C, r] = o(""), [n, m] = o(!1), v = w(async () => {
    if (u) {
      m(!0);
      try {
        await c(u);
      } finally {
        m(!1), s(null);
      }
    }
  }, [u, c]), S = w(async (x) => {
    if (C.trim()) {
      m(!0);
      try {
        await g(x, C.trim());
      } finally {
        m(!1), b(null), r("");
      }
    }
  }, [C, g]), z = (x) => {
    b(x.deviceId), r(x.deviceName);
  };
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-start justify-center p-6 bg-surface-panel", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[600px] bg-white rounded-xl shadow-md p-8", role: "main", "aria-label": "MFA device management", children: [
    /* @__PURE__ */ t("div", { className: "flex items-center justify-between mb-6 flex-wrap gap-3", children: [
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-text-primary m-0", children: "MFA Devices" }),
        l && /* @__PURE__ */ e("p", { className: "text-sm text-neutral m-0", children: l })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ e(X, { tone: i ? "success" : "warning", children: i ? "Enabled" : "Disabled" }),
        /* @__PURE__ */ e(f, { variant: "primary", size: "md", onClick: p, children: "Add Device" })
      ] })
    ] }),
    h && /* @__PURE__ */ e("p", { className: "text-center text-text-tertiary text-sm py-8", children: "Loading devices..." }),
    !h && a.length === 0 && /* @__PURE__ */ e(
      pe,
      {
        icon: "🔐",
        title: "No MFA devices configured",
        body: "Add a device to secure your account with multi-factor authentication.",
        actionLabel: "Add Device",
        onAction: p
      }
    ),
    !h && a.length > 0 && /* @__PURE__ */ e("div", { className: "flex flex-col gap-3", role: "list", "aria-label": "MFA devices", children: a.map((x) => /* @__PURE__ */ t("div", { className: "p-5 border border-border rounded-lg bg-white", role: "listitem", children: [
      /* @__PURE__ */ e("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ e("div", { className: "flex items-center gap-2.5", children: d === x.deviceId ? /* @__PURE__ */ t(
        "form",
        {
          onSubmit: (I) => {
            I.preventDefault(), S(x.deviceId);
          },
          className: "flex gap-2 items-center",
          children: [
            /* @__PURE__ */ e(
              T,
              {
                label: "",
                name: `rename-${x.deviceId}`,
                value: C,
                onChange: (I) => r(String(I)),
                disabled: n
              }
            ),
            /* @__PURE__ */ e(f, { type: "submit", variant: "primary", size: "sm", disabled: n || !C.trim(), children: "Save" }),
            /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => b(null), children: "Cancel" })
          ]
        }
      ) : /* @__PURE__ */ t(j, { children: [
        /* @__PURE__ */ e("h3", { className: "text-[15px] font-semibold text-text-primary m-0", children: x.deviceName }),
        /* @__PURE__ */ e(
          ie,
          {
            status: x.isVerified ? "CONFIRMED" : "UNCONFIRMED"
          }
        )
      ] }) }) }),
      /* @__PURE__ */ t("p", { className: "text-[11px] text-text-tertiary m-0 mb-3", children: [
        "Type: ",
        x.deviceType,
        " · Added: ",
        me(x.createdAt),
        x.lastUsed && ` · Last used: ${me(x.lastUsed)}`
      ] }),
      d !== x.deviceId && /* @__PURE__ */ t("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ e(f, { variant: "ghost", size: "sm", onClick: () => z(x), children: "Rename" }),
        /* @__PURE__ */ e(f, { variant: "danger", size: "sm", onClick: () => s(x.deviceId), children: "Remove" })
      ] })
    ] }, x.deviceId)) }),
    /* @__PURE__ */ e(
      Q,
      {
        open: !!u,
        onConfirm: v,
        onCancel: () => s(null),
        title: "Remove Device",
        body: "Are you sure you want to remove this MFA device? You will no longer be able to use it for verification.",
        confirmLabel: n ? "Removing..." : "Remove",
        confirmDisabled: n,
        tone: "destructive"
      }
    )
  ] }) });
}
function Ct({ onConfirm: a, onCancel: l, clientName: i }) {
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-surface-panel", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[420px] bg-white rounded-xl shadow-md p-8 text-center", role: "main", "aria-label": "Sign out confirmation", children: [
    /* @__PURE__ */ e("div", { className: "w-14 h-14 mx-auto mb-5 rounded-full bg-[#fef2f2] flex items-center justify-center", children: /* @__PURE__ */ t("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-danger-fg", children: [
      /* @__PURE__ */ e("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
      /* @__PURE__ */ e("polyline", { points: "16 17 21 12 16 7" }),
      /* @__PURE__ */ e("line", { x1: "21", y1: "12", x2: "9", y2: "12" })
    ] }) }),
    /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-text-primary mb-3 mt-0", children: "Sign Out" }),
    /* @__PURE__ */ t("p", { className: "text-sm text-neutral mb-6 mt-0 leading-relaxed", children: [
      "Are you sure you want to sign out",
      i ? /* @__PURE__ */ t(j, { children: [
        " from ",
        /* @__PURE__ */ e("strong", { className: "text-text-primary", children: i })
      ] }) : "",
      "? You will need to sign in again to access your account."
    ] }),
    /* @__PURE__ */ t("div", { className: "flex gap-3 justify-center", children: [
      l && /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", fullWidth: !0, onClick: l, children: "Cancel" }),
      /* @__PURE__ */ e(f, { variant: "danger-solid", size: "lg", fullWidth: !0, onClick: a, children: "Sign Out" })
    ] })
  ] }) });
}
function wt({
  title: a = "Something went wrong",
  message: l,
  error: i,
  onRetry: p,
  onBack: g
}) {
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-surface-panel", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[420px] bg-white rounded-xl shadow-md p-8 text-center", role: "main", "aria-label": "Error", children: [
    /* @__PURE__ */ e("div", { className: "w-14 h-14 rounded-full bg-[#fef2f2] flex items-center justify-center mx-auto mb-5", "aria-hidden": "true", children: /* @__PURE__ */ t("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-danger-fg", children: [
      /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ e("line", { x1: "15", y1: "9", x2: "9", y2: "15" }),
      /* @__PURE__ */ e("line", { x1: "9", y1: "9", x2: "15", y2: "15" })
    ] }) }),
    /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-text-primary mb-3 mt-0", children: a }),
    /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-3 mt-0 leading-relaxed", children: l }),
    i && /* @__PURE__ */ e("code", { className: "text-[11px] text-text-tertiary font-mono mb-5 px-3.5 py-2 bg-surface-panel border border-border rounded-md inline-block max-w-full overflow-x-auto", children: i }),
    (p || g) && /* @__PURE__ */ t("div", { className: "flex gap-3 justify-center mt-6", children: [
      g && /* @__PURE__ */ e(f, { variant: "ghost", size: "lg", onClick: g, children: "Go Back" }),
      p && /* @__PURE__ */ e(f, { variant: "primary", size: "lg", onClick: p, children: "Try Again" })
    ] })
  ] }) });
}
const Me = [
  { label: "Dashboard", path: "/identity/admin", icon: "⌂" },
  { label: "Pools", path: "/identity/admin/pools", icon: "☰" },
  { label: "Applications", path: "/identity/admin/applications", icon: "⬚" },
  { label: "Email Templates", path: "/identity/admin/email-templates", icon: "✉" },
  { label: "Audit", path: "/identity/admin/audit", icon: "⌸" },
  { label: "Diagnostics", path: "/identity/admin/diagnostics", icon: "⚙" },
  { label: "Setup Guide", path: "/identity/admin/setup", icon: "✓" }
];
function Fe({
  item: a,
  active: l,
  onNavigate: i
}) {
  return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: G(
        "flex items-center gap-2 w-full text-left px-3 py-2 text-sm font-medium cursor-pointer",
        "border-none rounded-none border-l-[3px] transition-colors",
        l ? "bg-surface-panel text-info-fg font-semibold border-l-info" : "bg-transparent text-[#334155] border-l-transparent hover:bg-[#f1f5f9]"
      ),
      onClick: () => i(a.path),
      "aria-current": l ? "page" : void 0,
      children: [
        /* @__PURE__ */ e("span", { children: a.icon }),
        /* @__PURE__ */ e("span", { children: a.label })
      ]
    }
  ) });
}
function kt({
  children: a,
  activePath: l,
  adminEmail: i,
  onNavigate: p,
  onLogout: g
}) {
  const [c, h] = o(!0), u = w(() => h((s) => !s), []);
  return /* @__PURE__ */ t("div", { className: "flex min-h-screen bg-surface-panel font-[inherit]", children: [
    /* @__PURE__ */ t(
      "aside",
      {
        className: G(
          "bg-white border-r border-border flex flex-col shrink-0 transition-[width] duration-200 overflow-hidden",
          c ? "w-60" : "w-0 border-r-0"
        ),
        children: [
          /* @__PURE__ */ e("div", { className: "p-4 font-bold text-lg text-info-fg border-b border-border", children: "Identity Admin" }),
          /* @__PURE__ */ e("ul", { className: "list-none m-0 p-0 py-2 flex-1", children: Me.map((s) => /* @__PURE__ */ e(
            Fe,
            {
              item: s,
              active: l === s.path,
              onNavigate: p
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
            onClick: u,
            "aria-label": "Toggle sidebar",
            children: c ? "←" : "→"
          }
        ),
        /* @__PURE__ */ t("div", { className: "flex items-center gap-4", children: [
          i && /* @__PURE__ */ e("span", { className: "text-sm text-neutral", children: i }),
          g && /* @__PURE__ */ e(f, { variant: "danger-solid", size: "sm", onClick: g, children: "Logout" })
        ] })
      ] }),
      /* @__PURE__ */ e("main", { className: "flex-1 p-6 overflow-y-auto", children: a })
    ] })
  ] });
}
const je = [
  { key: "users", label: "Users" },
  { key: "groups", label: "Groups" },
  { key: "mfa", label: "MFA" }
];
function Oe({
  label: a,
  active: l,
  onClick: i
}) {
  return /* @__PURE__ */ e(
    f,
    {
      variant: "ghost",
      size: "sm",
      className: G(
        "rounded-none -mb-[2px] border-b-2",
        l ? "font-semibold text-info-fg border-b-[#3b82f6]" : "font-normal text-neutral border-b-transparent"
      ),
      onClick: i,
      "aria-selected": l,
      role: "tab",
      children: a
    }
  );
}
function St({
  children: a,
  poolId: l,
  poolName: i,
  activeSection: p,
  onNavigate: g,
  onBack: c
}) {
  const h = w(
    (s) => {
      g(`/identity/admin/pools/${l}/${s}`);
    },
    [g, l]
  ), u = p ? p.charAt(0).toUpperCase() + p.slice(1) : "";
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
      /* @__PURE__ */ e("span", { className: "text-text-primary font-medium", children: i }),
      p && /* @__PURE__ */ t(j, { children: [
        /* @__PURE__ */ e("span", { children: "/" }),
        /* @__PURE__ */ e("span", { children: u })
      ] })
    ] }),
    /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(f, { variant: "secondary", size: "sm", onClick: c, children: "← Back to Pools" }) }),
    /* @__PURE__ */ e("div", { className: "flex border-b-2 border-border", children: je.map((s) => /* @__PURE__ */ e(
      Oe,
      {
        label: s.label,
        active: p === s.key,
        onClick: () => h(s.key)
      },
      s.key
    )) }),
    /* @__PURE__ */ e("div", { children: a })
  ] });
}
export {
  tt as A,
  ge as C,
  gt as D,
  ut as E,
  T as F,
  st as G,
  kt as I,
  xt as L,
  Nt as M,
  nt as P,
  Ue as Q,
  ft as S,
  lt as U,
  ct as a,
  ot as b,
  dt as c,
  pt as d,
  bt as e,
  mt as f,
  H as g,
  wt as h,
  it as i,
  Ct as j,
  ht as k,
  yt as l,
  vt as m,
  at as n,
  St as o,
  ie as p,
  rt as q
};
