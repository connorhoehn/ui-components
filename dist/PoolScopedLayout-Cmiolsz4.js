import { jsxs as t, jsx as e, Fragment as j } from "react/jsx-runtime";
import { useMemo as G, useState as o, useCallback as C, useRef as oe, useEffect as ce } from "react";
import { C as U } from "./Card-qOg_oC77.js";
import { P as F, D as Ce, F as we, T as de, b as me, e as W, a as ue, c as he, d as X } from "./FormField-BftBYBdG.js";
import { B as h } from "./Button-DILgRebO.js";
import { E as pe } from "./EmptyState-Ejc9dJA3.js";
import { C as Q } from "./ConfirmDialog-B0yXaqxp.js";
import { I as O } from "./Input-Dt0yAs9r.js";
import { B as q } from "./Banner-BoO81CCz.js";
import { C as K } from "./Chip-BDT8ro4h.js";
import { S as ee } from "./Select-DAEcKWg2.js";
import { C as J } from "./Checkbox-vOc5I8kn.js";
import { M as ke } from "./Modal-X8tdpRKs.js";
import { T as fe } from "./Textarea-kaa9rHUL.js";
import { c as _ } from "./cn-B6yFEsav.js";
function at({ stats: a, pools: s, onNavigate: l, loading: p }) {
  const f = G(
    () => [
      { label: "User Pools", value: a.userPools },
      { label: "Applications", value: a.clients },
      { label: "Total Users", value: a.totalUsers }
    ],
    [a]
  );
  return p ? /* @__PURE__ */ t("div", { className: "flex flex-col gap-8", children: [
    /* @__PURE__ */ e("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4", children: [1, 2, 3].map((c) => /* @__PURE__ */ t(U, { padding: "md", children: [
      /* @__PURE__ */ e("div", { className: "h-5 w-12 rounded bg-surface-hover animate-pulse mb-2" }),
      /* @__PURE__ */ e("div", { className: "h-3 w-20 rounded bg-surface-hover animate-pulse" })
    ] }, c)) }),
    /* @__PURE__ */ e(U, { className: "h-[200px] animate-pulse" })
  ] }) : /* @__PURE__ */ t(F, { title: "Dashboard", children: [
    /* @__PURE__ */ e("section", { className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4", children: f.map((c) => /* @__PURE__ */ t(U, { padding: "md", children: [
      /* @__PURE__ */ e("div", { className: "text-[2rem] font-bold text-info-fg mb-1", children: c.value }),
      /* @__PURE__ */ e("div", { className: "text-sm text-neutral", children: c.label })
    ] }, c.label)) }),
    /* @__PURE__ */ t("section", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ e("h2", { className: "text-lg font-semibold text-text-primary m-0", children: "User Pools" }),
      /* @__PURE__ */ e(U, { children: s.length === 0 ? /* @__PURE__ */ e(pe, { title: "No pools created yet", actionLabel: "Create Pool", onAction: () => l("/identity/admin/pools/new") }) : s.map((c, u) => /* @__PURE__ */ t(
        "div",
        {
          className: `flex items-center justify-between px-4 py-3 ${u < s.length - 1 ? "border-b border-border-subtle" : ""}`,
          children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ e("span", { className: "font-medium text-text-primary", children: c.poolName }),
              /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary", children: c.createdAt })
            ] }),
            /* @__PURE__ */ e(h, { variant: "ghost", size: "sm", onClick: () => l(`/identity/admin/pools/${c.poolId}`), children: "View" })
          ]
        },
        c.poolId
      )) })
    ] }),
    /* @__PURE__ */ t("section", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ e("h2", { className: "text-lg font-semibold text-text-primary m-0", children: "Quick Actions" }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ e(h, { variant: "secondary", size: "lg", onClick: () => l("/identity/admin/pools/new"), children: "Create Pool" }),
        /* @__PURE__ */ e(h, { variant: "secondary", size: "lg", onClick: () => l("/identity/admin/applications/new"), children: "Create Application" }),
        /* @__PURE__ */ e(h, { variant: "secondary", size: "lg", onClick: () => l("/identity/admin/setup"), children: "Setup Guide" })
      ] })
    ] })
  ] });
}
function H({
  columns: a,
  data: s,
  keyField: l,
  onRowClick: p,
  actions: f,
  emptyMessage: c = "No records found.",
  emptyIcon: u = "📋",
  loading: m = !1
}) {
  if (!m && s.length === 0)
    return /* @__PURE__ */ t(U, { className: "flex flex-col items-center justify-center min-h-[220px] p-8", children: [
      /* @__PURE__ */ e("span", { className: "text-[42px] mb-3", children: u }),
      /* @__PURE__ */ e("p", { className: "text-sm font-medium text-neutral text-center max-w-[280px] m-0", children: c })
    ] });
  const d = a.map((i) => ({
    key: i.key,
    header: i.header,
    render: i.render ? (x) => i.render(x) : void 0,
    sortable: i.sortable,
    width: i.width,
    align: i.align
  }));
  return /* @__PURE__ */ e(U, { children: /* @__PURE__ */ e(
    Ce,
    {
      data: s,
      columns: d,
      keyField: (i) => String(i[l]),
      onRowClick: p,
      rowActions: f,
      loading: m,
      frameless: !0
    }
  ) });
}
function nt({
  pools: a,
  onCreatePool: s,
  onEditPool: l,
  onDeletePool: p,
  onViewPool: f,
  loading: c
}) {
  const [u, m] = o(null), [d, i] = o(!1), x = C(
    async (n) => {
      i(!0);
      try {
        await p(n);
      } finally {
        i(!1), m(null);
      }
    },
    [p]
  ), N = G(
    () => [
      { key: "poolName", header: "Name", sortable: !0 },
      { key: "clientId", header: "Client ID" },
      { key: "createdAt", header: "Created", sortable: !0 }
    ],
    []
  ), r = C(
    (n) => /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e(h, { variant: "ghost", size: "sm", onClick: () => f(n.poolId), children: "View" }),
      /* @__PURE__ */ e(h, { variant: "ghost", size: "sm", onClick: () => l(n.poolId), children: "Edit" }),
      /* @__PURE__ */ e(h, { variant: "danger", size: "sm", onClick: () => m(n.poolId), children: "Delete" })
    ] }),
    [l, f]
  );
  return /* @__PURE__ */ t(
    F,
    {
      title: "User Pools",
      actions: /* @__PURE__ */ e(h, { variant: "primary", size: "lg", onClick: s, children: "Create Pool" }),
      children: [
        /* @__PURE__ */ e(
          H,
          {
            columns: N,
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
            open: !!u,
            onConfirm: () => u && x(u),
            onCancel: () => m(null),
            title: "Delete Pool",
            body: "This action cannot be undone. All users in this pool will be affected.",
            tone: "destructive",
            confirmLabel: "Delete",
            confirmDisabled: d
          }
        )
      ]
    }
  );
}
function T({
  label: a,
  name: s,
  type: l = "text",
  value: p,
  onChange: f,
  error: c,
  required: u,
  placeholder: m,
  options: d,
  helpText: i,
  disabled: x
}) {
  const N = C(
    (r) => {
      f(l === "number" ? Number(r.target.value) : r.target.value);
    },
    [f, l]
  );
  return l === "checkbox" ? /* @__PURE__ */ t("div", { className: "mb-4", children: [
    /* @__PURE__ */ t("label", { className: "flex items-center gap-2 cursor-pointer", children: [
      /* @__PURE__ */ e(
        J,
        {
          name: s,
          checked: !!p,
          onChange: f,
          disabled: x
        }
      ),
      /* @__PURE__ */ t("span", { className: "text-sm text-text-primary", children: [
        a,
        u && /* @__PURE__ */ e("span", { className: "text-danger-fg", children: " *" })
      ] })
    ] }),
    c && /* @__PURE__ */ e("p", { className: "mt-1 text-sm text-danger-fg", children: c }),
    i && !c && /* @__PURE__ */ e("p", { className: "mt-1 text-sm text-text-tertiary", children: i })
  ] }) : /* @__PURE__ */ e(
    we,
    {
      label: a,
      required: u,
      error: c,
      hint: i,
      className: "mb-4",
      children: ({ labelId: r, ...n }) => l === "textarea" ? /* @__PURE__ */ e(
        fe,
        {
          ...n,
          name: s,
          value: String(p),
          onChange: N,
          placeholder: m,
          disabled: x,
          required: u,
          rows: 5,
          invalid: !!c,
          className: "resize-y min-h-[100px]"
        }
      ) : l === "select" ? /* @__PURE__ */ e(
        ee,
        {
          ...n,
          name: s,
          value: String(p),
          onChange: N,
          disabled: x,
          required: u,
          invalid: !!c,
          options: [
            { value: "", label: m || "Select..." },
            ...d ?? []
          ]
        }
      ) : /* @__PURE__ */ e(
        O,
        {
          ...n,
          type: l,
          name: s,
          value: String(p),
          onChange: N,
          placeholder: m,
          disabled: x,
          required: u,
          invalid: !!c
        }
      )
    }
  );
}
function rt({ pool: a, isEdit: s, onSubmit: l, onCancel: p, error: f }) {
  const [c, u] = o(a?.poolName ?? ""), [m, d] = o(a?.settings?.mfaConfiguration ?? "OFF"), [i, x] = o(a?.settings?.passwordPolicy?.minLength ?? 8), [N, r] = o(a?.settings?.passwordPolicy?.requireUppercase ?? !0), [n, v] = o(a?.settings?.passwordPolicy?.requireLowercase ?? !0), [w, I] = o(a?.settings?.passwordPolicy?.requireNumbers ?? !0), [z, g] = o(a?.settings?.passwordPolicy?.requireSymbols ?? !1), [A, S] = o(
    Object.entries(a?.customAttributes ?? {}).map(([b, M]) => ({ key: b, value: M }))
  ), [L, R] = o(!1), P = C(() => {
    S((b) => [...b, { key: "", value: "" }]);
  }, []), D = C((b) => {
    S((M) => M.filter((B, $) => $ !== b));
  }, []), y = C((b, M, B) => {
    S(
      ($) => $.map((Z, Y) => Y === b ? { ...Z, [M]: B } : Z)
    );
  }, []), k = C(
    async (b) => {
      b.preventDefault(), R(!0);
      try {
        const M = {};
        for (const { key: B, value: $ } of A)
          B.trim() && (M[B.trim()] = $);
        await l({
          poolName: c,
          customAttributes: M,
          settings: {
            mfaConfiguration: m,
            passwordPolicy: {
              minLength: i,
              requireUppercase: N,
              requireLowercase: n,
              requireNumbers: w,
              requireSymbols: z
            }
          }
        });
      } finally {
        R(!1);
      }
    },
    [c, m, i, N, n, w, z, A, l]
  );
  return /* @__PURE__ */ t(F, { title: s ? "Edit Pool" : "Create Pool", className: "max-w-[640px]", children: [
    f && /* @__PURE__ */ e(q, { variant: "error", children: f }),
    /* @__PURE__ */ e(U, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: k, children: [
      /* @__PURE__ */ e(
        T,
        {
          label: "Pool Name",
          name: "poolName",
          value: c,
          onChange: (b) => u(String(b)),
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
            value: m,
            onChange: (b) => d(String(b)),
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
            value: i,
            onChange: (b) => x(Number(b))
          }
        ),
        /* @__PURE__ */ e(
          T,
          {
            label: "Require Uppercase",
            name: "requireUppercase",
            type: "checkbox",
            value: N,
            onChange: (b) => r(!!b)
          }
        ),
        /* @__PURE__ */ e(
          T,
          {
            label: "Require Lowercase",
            name: "requireLowercase",
            type: "checkbox",
            value: n,
            onChange: (b) => v(!!b)
          }
        ),
        /* @__PURE__ */ e(
          T,
          {
            label: "Require Numbers",
            name: "requireNumbers",
            type: "checkbox",
            value: w,
            onChange: (b) => I(!!b)
          }
        ),
        /* @__PURE__ */ e(
          T,
          {
            label: "Require Symbols",
            name: "requireSymbols",
            type: "checkbox",
            value: z,
            onChange: (b) => g(!!b)
          }
        )
      ] }),
      /* @__PURE__ */ t("section", { className: "mb-6", children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mb-2", children: "Custom Attributes" }),
        A.map((b, M) => /* @__PURE__ */ t("div", { className: "flex gap-2 items-center mb-2", children: [
          /* @__PURE__ */ e(
            O,
            {
              className: "flex-1",
              placeholder: "Attribute name",
              value: b.key,
              onChange: (B) => y(M, "key", B.target.value)
            }
          ),
          /* @__PURE__ */ e(
            O,
            {
              className: "flex-1",
              placeholder: "Type (string, number, etc.)",
              value: b.value,
              onChange: (B) => y(M, "value", B.target.value)
            }
          ),
          /* @__PURE__ */ e(h, { variant: "danger", size: "sm", onClick: () => D(M), children: "Remove" })
        ] }, M)),
        /* @__PURE__ */ e(h, { variant: "ghost", size: "sm", onClick: P, children: "+ Add Attribute" })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle", children: [
        /* @__PURE__ */ e(h, { type: "submit", variant: "primary", size: "lg", disabled: L, children: L ? "Saving..." : s ? "Update Pool" : "Create Pool" }),
        /* @__PURE__ */ e(h, { variant: "ghost", size: "lg", onClick: p, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
const Se = {
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
}, Ae = {
  success: "success",
  warning: "warning",
  danger: "danger",
  info: "info",
  neutral: "neutral"
};
function ae({ status: a, variant: s }) {
  const l = s ? Ae[s] || "neutral" : Se[a] || "neutral";
  return /* @__PURE__ */ e(K, { tone: l, size: "sm", children: a });
}
function lt({
  users: a,
  poolName: s,
  onCreateUser: l,
  onEditUser: p,
  onDeleteUser: f,
  loading: c
}) {
  const [u, m] = o(null), [d, i] = o(!1), x = C(
    async (n) => {
      i(!0);
      try {
        await f(n);
      } finally {
        i(!1), m(null);
      }
    },
    [f]
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
        render: (n) => /* @__PURE__ */ e(ae, { status: n.status })
      },
      { key: "createdAt", header: "Created", sortable: !0 }
    ],
    []
  ), r = C(
    (n) => /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e(h, { variant: "ghost", size: "sm", onClick: () => p(n.userId), children: "Edit" }),
      /* @__PURE__ */ e(h, { variant: "danger", size: "sm", onClick: () => m(n.userId), children: "Delete" })
    ] }),
    [p]
  );
  return /* @__PURE__ */ t(
    F,
    {
      title: `Users — ${s}`,
      actions: /* @__PURE__ */ e(h, { variant: "primary", size: "lg", onClick: l, children: "Create User" }),
      children: [
        /* @__PURE__ */ e(
          H,
          {
            columns: N,
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
            open: !!u,
            onConfirm: () => u && x(u),
            onCancel: () => m(null),
            title: "Delete User",
            body: "This action cannot be undone. The user will be permanently removed.",
            tone: "destructive",
            confirmLabel: "Delete",
            confirmDisabled: d
          }
        )
      ]
    }
  );
}
function it({
  user: a,
  isEdit: s,
  customAttributeDefinitions: l,
  onSubmit: p,
  onCancel: f,
  error: c
}) {
  const [u, m] = o(a?.email ?? ""), [d, i] = o(""), [x, N] = o(a?.givenName ?? ""), [r, n] = o(a?.familyName ?? ""), [v, w] = o(a?.nickname ?? ""), [I, z] = o(a?.picture ?? ""), [g, A] = o(a?.website ?? ""), [S, L] = o(
    Object.fromEntries(
      Object.entries(a?.customAttributes ?? {}).map(([k, b]) => [k, String(b)])
    )
  ), [R, P] = o(!1), D = C((k, b) => {
    L((M) => ({ ...M, [k]: b }));
  }, []), y = C(
    async (k) => {
      k.preventDefault(), P(!0);
      try {
        await p({
          email: u,
          ...!s && d ? { password: d } : {},
          givenName: x || void 0,
          familyName: r || void 0,
          nickname: v || void 0,
          picture: I || void 0,
          website: g || void 0,
          customAttributes: S
        });
      } finally {
        P(!1);
      }
    },
    [u, d, x, r, v, I, g, S, s, p]
  );
  return /* @__PURE__ */ t(F, { title: s ? "Edit User" : "Create User", className: "max-w-[640px]", children: [
    c && /* @__PURE__ */ e(q, { variant: "error", children: c }),
    /* @__PURE__ */ e(U, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: y, children: [
      /* @__PURE__ */ e(
        T,
        {
          label: "Email",
          name: "email",
          type: "email",
          value: u,
          onChange: (k) => m(String(k)),
          required: !0,
          placeholder: "user@example.com"
        }
      ),
      !s && /* @__PURE__ */ e(
        T,
        {
          label: "Password",
          name: "password",
          type: "password",
          value: d,
          onChange: (k) => i(String(k)),
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
          value: x,
          onChange: (k) => N(String(k)),
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
          value: v,
          onChange: (k) => w(String(k)),
          placeholder: "johnny"
        }
      ),
      /* @__PURE__ */ e(
        T,
        {
          label: "Picture URL",
          name: "picture",
          value: I,
          onChange: (k) => z(String(k)),
          placeholder: "https://..."
        }
      ),
      /* @__PURE__ */ e(
        T,
        {
          label: "Website",
          name: "website",
          value: g,
          onChange: (k) => A(String(k)),
          placeholder: "https://..."
        }
      ),
      l && Object.keys(l).length > 0 && /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mt-6 mb-2", children: "Custom Attributes" }),
        Object.entries(l).map(([k, b]) => /* @__PURE__ */ e(
          T,
          {
            label: k,
            name: `custom_${k}`,
            type: b === "number" ? "number" : "text",
            value: S[k] ?? "",
            onChange: (M) => D(k, String(M)),
            helpText: `Type: ${b}`
          },
          k
        ))
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle", children: [
        /* @__PURE__ */ e(h, { type: "submit", variant: "primary", size: "lg", disabled: R, children: R ? "Saving..." : s ? "Update User" : "Create User" }),
        /* @__PURE__ */ e(h, { variant: "ghost", size: "lg", onClick: f, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
function st({
  groups: a,
  poolName: s,
  onCreateGroup: l,
  onEditGroup: p,
  onDeleteGroup: f,
  loading: c
}) {
  const [u, m] = o(null), [d, i] = o(!1), x = C(
    async (n) => {
      i(!0);
      try {
        await f(n);
      } finally {
        i(!1), m(null);
      }
    },
    [f]
  ), N = G(
    () => [
      { key: "groupName", header: "Name", sortable: !0 },
      { key: "description", header: "Description" },
      {
        key: "permissions",
        header: "Permissions",
        render: (n) => /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: n.permissions.length === 0 ? /* @__PURE__ */ e("span", { className: "text-text-tertiary text-xs", children: "None" }) : n.permissions.map((v) => /* @__PURE__ */ e(K, { tone: "info", size: "xs", children: v }, v)) })
      }
    ],
    []
  ), r = C(
    (n) => /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e(h, { variant: "ghost", size: "sm", onClick: () => p(n.groupId), children: "Edit" }),
      /* @__PURE__ */ e(h, { variant: "danger", size: "sm", onClick: () => m(n.groupId), children: "Delete" })
    ] }),
    [p]
  );
  return /* @__PURE__ */ t(
    F,
    {
      title: `Groups — ${s}`,
      actions: /* @__PURE__ */ e(h, { variant: "primary", size: "lg", onClick: l, children: "Create Group" }),
      children: [
        /* @__PURE__ */ e(
          H,
          {
            columns: N,
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
            open: !!u,
            onConfirm: () => u && x(u),
            onCancel: () => m(null),
            title: "Delete Group",
            body: "This action cannot be undone. Members will lose their group permissions.",
            tone: "destructive",
            confirmLabel: "Delete",
            confirmDisabled: d
          }
        )
      ]
    }
  );
}
function ot({
  group: a,
  isEdit: s,
  members: l,
  availableUsers: p,
  onSubmit: f,
  onAddMember: c,
  onRemoveMember: u,
  onCancel: m,
  error: d
}) {
  const [i, x] = o(a?.groupName ?? ""), [N, r] = o(a?.description ?? ""), [n, v] = o(a?.permissions ?? []), [w, I] = o(""), [z, g] = o(""), [A, S] = o(!1), L = C(
    (y) => {
      if (y.key === "Enter") {
        y.preventDefault();
        const k = w.trim();
        k && !n.includes(k) && v((b) => [...b, k]), I("");
      }
    },
    [w, n]
  ), R = C((y) => {
    v((k) => k.filter((b) => b !== y));
  }, []), P = C(async () => {
    z && c && (await c(z), g(""));
  }, [z, c]), D = C(
    async (y) => {
      y.preventDefault(), S(!0);
      try {
        await f({ groupName: i, description: N, permissions: n });
      } finally {
        S(!1);
      }
    },
    [i, N, n, f]
  );
  return /* @__PURE__ */ t(F, { title: s ? "Edit Group" : "Create Group", className: "max-w-[640px]", children: [
    d && /* @__PURE__ */ e(q, { variant: "error", children: d }),
    /* @__PURE__ */ e(U, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: D, children: [
      /* @__PURE__ */ e(
        T,
        {
          label: "Group Name",
          name: "groupName",
          value: i,
          onChange: (y) => x(String(y)),
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
          value: N,
          onChange: (y) => r(String(y)),
          placeholder: "Describe this group's purpose..."
        }
      ),
      /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mt-6 mb-2", children: "Permissions" }),
        /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5 mb-2", children: n.map((y) => /* @__PURE__ */ t("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-info text-white text-sm font-medium", children: [
          y,
          /* @__PURE__ */ e(
            h,
            {
              variant: "ghost",
              size: "sm",
              className: "p-0 text-white text-[14px] leading-none min-w-0 min-h-0",
              onClick: () => R(y),
              "aria-label": `Remove permission ${y}`,
              children: "x"
            }
          )
        ] }, y)) }),
        /* @__PURE__ */ e(
          O,
          {
            placeholder: "Type a permission and press Enter",
            value: w,
            onChange: (y) => I(y.target.value),
            onKeyDown: L
          }
        )
      ] }),
      s && l && /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mt-6 mb-2", children: "Members" }),
        l.length === 0 ? /* @__PURE__ */ e("p", { className: "text-text-tertiary text-sm", children: "No members yet." }) : l.map((y) => /* @__PURE__ */ t("div", { className: "flex items-center justify-between py-1.5 border-b border-border", children: [
          /* @__PURE__ */ e("span", { className: "text-base", children: y.email }),
          u && /* @__PURE__ */ e(h, { variant: "danger", size: "sm", onClick: () => u(y.userId), children: "Remove" })
        ] }, y.userId)),
        p && p.length > 0 && c && /* @__PURE__ */ t("div", { className: "flex gap-2 mt-2", children: [
          /* @__PURE__ */ e(
            ee,
            {
              className: "flex-1",
              value: z,
              onChange: (y) => g(y.target.value),
              placeholder: "Select user to add...",
              options: p.map((y) => ({ value: y.userId, label: y.email }))
            }
          ),
          /* @__PURE__ */ e(h, { variant: "ghost", size: "sm", onClick: P, disabled: !z, children: "Add" })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle", children: [
        /* @__PURE__ */ e(h, { type: "submit", variant: "primary", size: "lg", disabled: A, children: A ? "Saving..." : s ? "Update Group" : "Create Group" }),
        /* @__PURE__ */ e(h, { variant: "ghost", size: "lg", onClick: m, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
function ct({
  applications: a,
  onCreateApp: s,
  onCreateAppWithPool: l,
  onEditApp: p,
  onDeleteApp: f,
  loading: c
}) {
  const [u, m] = o(null), [d, i] = o(!1), x = C(
    async (n) => {
      i(!0);
      try {
        await f(n);
      } finally {
        i(!1), m(null);
      }
    },
    [f]
  ), N = G(
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
          n.redirectUris.slice(0, 2).map((v) => /* @__PURE__ */ e(K, { tone: "neutral", size: "xs", children: v }, v)),
          n.redirectUris.length > 2 && /* @__PURE__ */ t(K, { tone: "neutral", size: "xs", children: [
            "+",
            n.redirectUris.length - 2,
            " more"
          ] })
        ] })
      }
    ],
    []
  ), r = C(
    (n) => /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e(h, { variant: "ghost", size: "sm", onClick: () => p(n.clientId), children: "Edit" }),
      /* @__PURE__ */ e(h, { variant: "danger", size: "sm", onClick: () => m(n.clientId), children: "Delete" })
    ] }),
    [p]
  );
  return /* @__PURE__ */ t(
    F,
    {
      title: "Applications",
      actions: /* @__PURE__ */ t(j, { children: [
        /* @__PURE__ */ e(h, { variant: "primary", size: "lg", onClick: s, children: "New Application" }),
        /* @__PURE__ */ e(h, { variant: "secondary", size: "lg", onClick: l, children: "New App + Pool" })
      ] }),
      children: [
        /* @__PURE__ */ e(
          H,
          {
            columns: N,
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
            open: !!u,
            onConfirm: () => u && x(u),
            onCancel: () => m(null),
            title: "Delete Application",
            body: "This action cannot be undone. The application will lose access immediately.",
            tone: "destructive",
            confirmLabel: "Delete",
            confirmDisabled: d
          }
        )
      ]
    }
  );
}
function le({
  label: a,
  values: s,
  onChange: l,
  placeholder: p
}) {
  const f = () => l([...s, ""]), c = (m) => l(s.filter((d, i) => i !== m)), u = (m, d) => l(s.map((i, x) => x === m ? d : i));
  return /* @__PURE__ */ t("div", { className: "mb-4", children: [
    /* @__PURE__ */ e("label", { className: "block mb-1 text-sm font-semibold text-text-primary", children: a }),
    s.map((m, d) => /* @__PURE__ */ t("div", { className: "flex gap-2 items-center mb-1.5", children: [
      /* @__PURE__ */ e(
        O,
        {
          className: "flex-1",
          value: m,
          onChange: (i) => u(d, i.target.value),
          placeholder: p
        }
      ),
      /* @__PURE__ */ e(h, { variant: "danger", size: "sm", onClick: () => c(d), children: "Remove" })
    ] }, d)),
    /* @__PURE__ */ e(h, { variant: "ghost", size: "sm", onClick: f, children: "+ Add" })
  ] });
}
const Ie = [
  "authorization_code",
  "client_credentials",
  "refresh_token"
], Pe = ["code", "token", "id_token"];
function dt({
  application: a,
  isEdit: s,
  pools: l,
  onSubmit: p,
  onCancel: f,
  error: c
}) {
  const [u, m] = o(a?.clientName ?? ""), [d, i] = o(a?.poolId ?? ""), [x, N] = o(a?.redirectUris ?? [""]), [r, n] = o(a?.postLogoutRedirectUris ?? []), [v, w] = o(a?.grantTypes ?? ["authorization_code"]), [I, z] = o(a?.responseTypes ?? ["code"]), [g, A] = o(a?.scope ?? "openid profile email"), [S, L] = o(!1), R = C((y) => {
    w(
      (k) => k.includes(y) ? k.filter((b) => b !== y) : [...k, y]
    );
  }, []), P = C((y) => {
    z(
      (k) => k.includes(y) ? k.filter((b) => b !== y) : [...k, y]
    );
  }, []), D = C(
    async (y) => {
      y.preventDefault(), L(!0);
      try {
        await p({
          clientName: u,
          poolId: d,
          redirectUris: x.filter((k) => k.trim()),
          postLogoutRedirectUris: r.filter((k) => k.trim()),
          grantTypes: v,
          responseTypes: I,
          scope: g
        });
      } finally {
        L(!1);
      }
    },
    [u, d, x, r, v, I, g, p]
  );
  return /* @__PURE__ */ t(F, { title: s ? "Edit Application" : "New Application", className: "max-w-[640px]", children: [
    c && /* @__PURE__ */ e(q, { variant: "error", children: c }),
    /* @__PURE__ */ e(U, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: D, children: [
      /* @__PURE__ */ e(
        T,
        {
          label: "Application Name",
          name: "clientName",
          value: u,
          onChange: (y) => m(String(y)),
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
          value: d,
          onChange: (y) => i(String(y)),
          required: !0,
          options: l.map((y) => ({ value: y.poolId, label: y.poolName })),
          placeholder: "Select a pool..."
        }
      ),
      /* @__PURE__ */ e(
        le,
        {
          label: "Redirect URIs",
          values: x,
          onChange: N,
          placeholder: "https://app.example.com/callback"
        }
      ),
      /* @__PURE__ */ e(
        le,
        {
          label: "Post-Logout Redirect URIs",
          values: r,
          onChange: n,
          placeholder: "https://app.example.com/logout"
        }
      ),
      /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mt-6 mb-2", children: "Grant Types" }),
        /* @__PURE__ */ e("div", { className: "flex flex-col gap-2 mb-4", children: Ie.map((y) => /* @__PURE__ */ t("label", { className: "flex items-center gap-2 text-base text-text-primary cursor-pointer", children: [
          /* @__PURE__ */ e(
            J,
            {
              checked: v.includes(y),
              onChange: () => R(y)
            }
          ),
          y
        ] }, y)) })
      ] }),
      /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mt-6 mb-2", children: "Response Types" }),
        /* @__PURE__ */ e("div", { className: "flex flex-col gap-2 mb-4", children: Pe.map((y) => /* @__PURE__ */ t("label", { className: "flex items-center gap-2 text-base text-text-primary cursor-pointer", children: [
          /* @__PURE__ */ e(
            J,
            {
              checked: I.includes(y),
              onChange: () => P(y)
            }
          ),
          y
        ] }, y)) })
      ] }),
      /* @__PURE__ */ e(
        T,
        {
          label: "Scope",
          name: "scope",
          value: g,
          onChange: (y) => A(String(y)),
          placeholder: "openid profile email",
          helpText: "Space-separated list of scopes."
        }
      ),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle", children: [
        /* @__PURE__ */ e(h, { type: "submit", variant: "primary", size: "lg", disabled: S, children: S ? "Saving..." : s ? "Update Application" : "Create Application" }),
        /* @__PURE__ */ e(h, { variant: "ghost", size: "lg", onClick: f, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
const Te = ["authorization_code", "client_credentials", "refresh_token"];
function mt({ onSubmit: a, onCancel: s, error: l }) {
  const [p, f] = o(""), [c, u] = o(""), [m, d] = o([""]), [i, x] = o(["authorization_code"]), [N, r] = o(!1), n = C((g) => {
    x(
      (A) => A.includes(g) ? A.filter((S) => S !== g) : [...A, g]
    );
  }, []), v = C(() => {
    d((g) => [...g, ""]);
  }, []), w = C((g) => {
    d((A) => A.filter((S, L) => L !== g));
  }, []), I = C((g, A) => {
    d((S) => S.map((L, R) => R === g ? A : L));
  }, []), z = C(
    async (g) => {
      g.preventDefault(), r(!0);
      try {
        await a({
          poolName: p,
          clientName: c,
          redirectUris: m.filter((A) => A.trim()),
          grantTypes: i
        });
      } finally {
        r(!1);
      }
    },
    [p, c, m, i, a]
  );
  return /* @__PURE__ */ t(F, { title: "New Application + Pool", description: "Create a user pool and register an application in one step.", className: "max-w-[640px]", children: [
    l && /* @__PURE__ */ e(q, { variant: "error", children: l }),
    /* @__PURE__ */ e(U, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: z, children: [
      /* @__PURE__ */ e(
        T,
        {
          label: "Pool Name",
          name: "poolName",
          value: p,
          onChange: (g) => f(String(g)),
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
          onChange: (g) => u(String(g)),
          required: !0,
          placeholder: "My App"
        }
      ),
      /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mt-6 mb-2", children: "Redirect URIs" }),
        m.map((g, A) => /* @__PURE__ */ t("div", { className: "flex gap-2 items-center mb-1.5", children: [
          /* @__PURE__ */ e(
            O,
            {
              className: "flex-1",
              value: g,
              onChange: (S) => I(A, S.target.value),
              placeholder: "https://app.example.com/callback"
            }
          ),
          m.length > 1 && /* @__PURE__ */ e(h, { variant: "danger", size: "sm", onClick: () => w(A), children: "Remove" })
        ] }, A)),
        /* @__PURE__ */ e(h, { variant: "ghost", size: "sm", onClick: v, children: "+ Add URI" })
      ] }),
      /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mt-6 mb-2", children: "Grant Types" }),
        /* @__PURE__ */ e("div", { className: "flex flex-col gap-2 mb-4", children: Te.map((g) => /* @__PURE__ */ t("label", { className: "flex items-center gap-2 text-base text-text-primary cursor-pointer", children: [
          /* @__PURE__ */ e(
            J,
            {
              checked: i.includes(g),
              onChange: () => n(g)
            }
          ),
          g
        ] }, g)) })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle", children: [
        /* @__PURE__ */ e(h, { type: "submit", variant: "primary", size: "lg", disabled: N, children: N ? "Creating..." : "Create Pool + Application" }),
        /* @__PURE__ */ e(h, { variant: "ghost", size: "lg", onClick: s, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
function ut({
  templates: a,
  onCreateTemplate: s,
  onEditTemplate: l,
  onDeleteTemplate: p,
  onTestSend: f,
  loading: c
}) {
  const [u, m] = o(null), [d, i] = o(!1), [x, N] = o(null), [r, n] = o(""), [v, w] = o(!1), I = C(
    async (S) => {
      i(!0);
      try {
        await p(S);
      } finally {
        i(!1), m(null);
      }
    },
    [p]
  ), z = C(async () => {
    if (!(!x || !r.trim())) {
      w(!0);
      try {
        await f(x, r.trim()), N(null), n("");
      } finally {
        w(!1);
      }
    }
  }, [x, r, f]), g = G(
    () => [
      { key: "name", header: "Name", sortable: !0 },
      { key: "subject", header: "Subject" }
    ],
    []
  ), A = C(
    (S) => /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e(h, { variant: "ghost", size: "sm", onClick: () => l(S.templateId), children: "Edit" }),
      /* @__PURE__ */ e(h, { variant: "ghost", size: "sm", onClick: () => {
        N(S.templateId), n("");
      }, children: "Test Send" }),
      /* @__PURE__ */ e(h, { variant: "danger", size: "sm", onClick: () => m(S.templateId), children: "Delete" })
    ] }),
    [l]
  );
  return /* @__PURE__ */ t(
    F,
    {
      title: "Email Templates",
      actions: /* @__PURE__ */ e(h, { variant: "primary", size: "lg", onClick: s, children: "Create Template" }),
      children: [
        /* @__PURE__ */ e(
          H,
          {
            columns: g,
            data: a,
            keyField: "templateId",
            actions: A,
            loading: c,
            emptyMessage: "No email templates configured.",
            emptyIcon: "✉️"
          }
        ),
        /* @__PURE__ */ e(
          ke,
          {
            open: !!x,
            onClose: () => N(null),
            title: "Send Test Email",
            footer: /* @__PURE__ */ t(j, { children: [
              /* @__PURE__ */ e(h, { variant: "ghost", size: "md", onClick: () => N(null), children: "Cancel" }),
              /* @__PURE__ */ e(h, { variant: "primary", size: "md", onClick: z, disabled: v || !r.trim(), children: v ? "Sending..." : "Send" })
            ] }),
            children: /* @__PURE__ */ e(
              T,
              {
                label: "Recipient Email",
                name: "test-email",
                type: "email",
                value: r,
                onChange: (S) => n(String(S)),
                placeholder: "recipient@example.com"
              }
            )
          }
        ),
        /* @__PURE__ */ e(
          Q,
          {
            open: !!u,
            onConfirm: () => u && I(u),
            onCancel: () => m(null),
            title: "Delete Template",
            body: "This action cannot be undone. The template will be permanently removed.",
            tone: "destructive",
            confirmLabel: "Delete",
            confirmDisabled: d
          }
        )
      ]
    }
  );
}
function ht({
  template: a,
  isEdit: s,
  onSubmit: l,
  onCancel: p,
  error: f
}) {
  const [c, u] = o(a?.name ?? ""), [m, d] = o(a?.subject ?? ""), [i, x] = o(a?.htmlBody ?? ""), [N, r] = o(a?.textBody ?? ""), [n, v] = o(a?.variables ?? []), [w, I] = o(""), [z, g] = o(!1), [A, S] = o(!1), L = C(
    (D) => {
      if (D.key === "Enter") {
        D.preventDefault();
        const y = w.trim();
        y && !n.includes(y) && v((k) => [...k, y]), I("");
      }
    },
    [w, n]
  ), R = C((D) => {
    v((y) => y.filter((k) => k !== D));
  }, []), P = C(
    async (D) => {
      D.preventDefault(), S(!0);
      try {
        await l({ name: c, subject: m, htmlBody: i, textBody: N, variables: n });
      } finally {
        S(!1);
      }
    },
    [c, m, i, N, n, l]
  );
  return /* @__PURE__ */ t(F, { title: s ? "Edit Email Template" : "Create Email Template", className: "max-w-[800px]", children: [
    f && /* @__PURE__ */ e(q, { variant: "error", children: f }),
    /* @__PURE__ */ e(U, { padding: "md", children: /* @__PURE__ */ t("form", { onSubmit: P, children: [
      /* @__PURE__ */ e(
        T,
        {
          label: "Template Name",
          name: "name",
          value: c,
          onChange: (D) => u(String(D)),
          required: !0,
          placeholder: "welcome-email"
        }
      ),
      /* @__PURE__ */ e(
        T,
        {
          label: "Subject",
          name: "subject",
          value: m,
          onChange: (D) => d(String(D)),
          required: !0,
          placeholder: "Welcome to {{appName}}"
        }
      ),
      /* @__PURE__ */ t("div", { className: "mb-4", children: [
        /* @__PURE__ */ t("div", { className: "flex items-center justify-between mb-1", children: [
          /* @__PURE__ */ e("label", { className: "text-sm font-semibold text-text-primary", children: "HTML Body" }),
          /* @__PURE__ */ e(h, { variant: "ghost", size: "sm", onClick: () => g((D) => !D), children: z ? "Hide Preview" : "Show Preview" })
        ] }),
        /* @__PURE__ */ e(
          fe,
          {
            value: i,
            onChange: (D) => x(D.target.value),
            placeholder: "<html><body>...</body></html>",
            rows: 10,
            className: "resize-y font-mono"
          }
        ),
        z && /* @__PURE__ */ e(
          "div",
          {
            className: "border border-border rounded-sm p-4 bg-white min-h-[200px] mt-2",
            dangerouslySetInnerHTML: { __html: i }
          }
        )
      ] }),
      /* @__PURE__ */ e(
        T,
        {
          label: "Text Body",
          name: "textBody",
          type: "textarea",
          value: N,
          onChange: (D) => r(String(D)),
          placeholder: "Plain text version of the email..."
        }
      ),
      /* @__PURE__ */ t("section", { children: [
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mt-6 mb-2", children: "Variables" }),
        /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5 mb-2", children: n.map((D) => /* @__PURE__ */ t("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-info text-white text-sm font-medium", children: [
          "{{" + D + "}}",
          /* @__PURE__ */ e(
            h,
            {
              variant: "ghost",
              size: "sm",
              className: "p-0 text-white text-[14px] leading-none min-w-0 min-h-0",
              onClick: () => R(D),
              "aria-label": `Remove variable ${D}`,
              children: "x"
            }
          )
        ] }, D)) }),
        /* @__PURE__ */ e(
          O,
          {
            placeholder: "Type variable name and press Enter",
            value: w,
            onChange: (D) => I(D.target.value),
            onKeyDown: L
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle", children: [
        /* @__PURE__ */ e(h, { type: "submit", variant: "primary", size: "lg", disabled: A, children: A ? "Saving..." : s ? "Update Template" : "Create Template" }),
        /* @__PURE__ */ e(h, { variant: "ghost", size: "lg", onClick: p, children: "Cancel" })
      ] })
    ] }) })
  ] });
}
function pt({
  metrics: a,
  users: s,
  pools: l,
  onRefresh: p,
  loading: f
}) {
  const [c, u] = o(""), m = G(() => s ?? [], [s]), d = G(
    () => [
      { key: "email", header: "Email", sortable: !0 },
      {
        key: "mfaEnabled",
        header: "MFA Status",
        width: "140px",
        render: (i) => /* @__PURE__ */ e(
          ae,
          {
            status: i.mfaEnabled ? "ENABLED" : "DISABLED",
            variant: i.mfaEnabled ? "success" : "warning"
          }
        )
      },
      { key: "deviceCount", header: "Devices", width: "100px" }
    ],
    []
  );
  return f ? /* @__PURE__ */ t(F, { title: "MFA Management", children: [
    /* @__PURE__ */ e("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ t(U, { padding: "md", children: [
      /* @__PURE__ */ e("div", { className: "h-5 w-12 rounded bg-surface-hover animate-pulse mb-2" }),
      /* @__PURE__ */ e("div", { className: "h-3 w-20 rounded bg-surface-hover animate-pulse" })
    ] }, i)) }),
    /* @__PURE__ */ e(U, { className: "h-[200px] animate-pulse" })
  ] }) : /* @__PURE__ */ t(
    F,
    {
      title: "MFA Management",
      actions: /* @__PURE__ */ e(h, { variant: "ghost", size: "lg", onClick: p, children: "Refresh" }),
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
        l && l.length > 0 && /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "Filter by pool" }),
          /* @__PURE__ */ e(
            ee,
            {
              className: "w-64",
              value: c,
              onChange: (i) => u(i.target.value),
              options: [
                { value: "", label: "All Pools" },
                ...l.map((i) => ({
                  value: i.poolId,
                  label: `${i.poolName} (${i.userCount} users)`
                }))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ e(
          H,
          {
            columns: d,
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
const De = ["", "user", "pool", "client", "group", "template"];
function ft({
  records: a,
  onQuery: s,
  onViewEntity: l,
  onReplay: p,
  loading: f,
  totalRecords: c
}) {
  const [u, m] = o(""), [d, i] = o(""), [x, N] = o(""), [r, n] = o(""), [v, w] = o("50"), [I, z] = o(""), [g, A] = o(""), [S, L] = o(null), [R, P] = o(!1), D = C(async () => {
    await s({
      entityType: u || void 0,
      entityId: d || void 0,
      fromTime: x ? new Date(x).getTime() : void 0,
      toTime: r ? new Date(r).getTime() : void 0,
      limit: v ? Number(v) : void 0
    });
  }, [u, d, x, r, v, s]), y = C(async () => {
    if (!(!I || !g)) {
      P(!0);
      try {
        const b = await p(I, new Date(g).getTime());
        L(b);
      } finally {
        P(!1);
      }
    }
  }, [I, g, p]), k = G(
    () => [
      {
        key: "timestamp",
        header: "Timestamp",
        sortable: !0,
        render: (b) => /* @__PURE__ */ e("span", { className: "font-mono text-xs text-neutral", children: new Date(b.timestamp).toLocaleString() })
      },
      {
        key: "actor",
        header: "Actor",
        render: (b) => typeof b.actor == "string" ? b.actor : b.actor?.email || b.actor?.id || JSON.stringify(b.actor)
      },
      { key: "entityType", header: "Entity Type" },
      {
        key: "entityId",
        header: "Entity ID",
        render: (b) => /* @__PURE__ */ e(
          h,
          {
            variant: "ghost",
            size: "sm",
            className: "p-0 underline text-info-fg font-mono text-xs",
            onClick: () => l(b.entityType, b.entityId),
            children: b.entityId
          }
        )
      },
      { key: "operation", header: "Operation" }
    ],
    [l]
  );
  return /* @__PURE__ */ t(F, { title: "Audit Log", children: [
    /* @__PURE__ */ e(U, { padding: "md", children: /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-4 items-end", children: [
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "Entity Type" }),
        /* @__PURE__ */ e(
          ee,
          {
            className: "w-40",
            value: u,
            onChange: (b) => m(b.target.value),
            options: [
              { value: "", label: "All" },
              ...De.filter(Boolean).map((b) => ({ value: b, label: b }))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "Entity ID" }),
        /* @__PURE__ */ e(O, { className: "w-44", value: d, onChange: (b) => i(b.target.value), placeholder: "Optional" })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "From" }),
        /* @__PURE__ */ e(O, { className: "w-52", type: "datetime-local", value: x, onChange: (b) => N(b.target.value) })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "To" }),
        /* @__PURE__ */ e(O, { className: "w-52", type: "datetime-local", value: r, onChange: (b) => n(b.target.value) })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "Limit" }),
        /* @__PURE__ */ e(O, { className: "w-[70px]", type: "number", value: v, onChange: (b) => w(b.target.value) })
      ] }),
      /* @__PURE__ */ e(h, { variant: "primary", size: "lg", onClick: D, disabled: f, children: f ? "Querying..." : "Query" })
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
        loading: f,
        emptyMessage: "No audit records found. Adjust filters and query.",
        emptyIcon: "📜"
      }
    ),
    /* @__PURE__ */ t(U, { padding: "md", children: [
      /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-text-primary mb-4 mt-0", children: "Point-in-Time Replay" }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-4 items-end mb-4", children: [
        /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "Entity ID" }),
          /* @__PURE__ */ e(O, { className: "w-44", value: I, onChange: (b) => z(b.target.value), placeholder: "entity-id" })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-neutral uppercase tracking-wide", children: "At Timestamp" }),
          /* @__PURE__ */ e(O, { className: "w-52", type: "datetime-local", value: g, onChange: (b) => A(b.target.value) })
        ] }),
        /* @__PURE__ */ e(h, { variant: "primary", size: "lg", onClick: y, disabled: R || !I || !g, children: R ? "Replaying..." : "Replay" })
      ] }),
      S && /* @__PURE__ */ e("pre", { className: "p-4 bg-surface-panel border border-border rounded-md font-mono text-xs text-text-primary overflow-x-auto whitespace-pre-wrap max-h-[300px] overflow-y-auto m-0", children: JSON.stringify(S, null, 2) })
    ] })
  ] });
}
function gt({ status: a, onNavigate: s }) {
  const [l, p] = o(null), f = C((d) => {
    p((i) => i === d ? null : d);
  }, []), c = G(
    () => [
      {
        title: "Create User Pool",
        done: a.hasUserPools,
        content: /* @__PURE__ */ t("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ e("p", { className: "m-0 text-sm text-text-secondary", children: a.hasUserPools ? `${a.poolCount} pool(s) configured.` : "No user pools yet." }),
          /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(h, { variant: "ghost", size: "sm", onClick: () => s("/identity/admin/pools/new"), children: "Create a User Pool" }) })
        ] })
      },
      {
        title: "Register Application",
        done: a.hasClients,
        content: /* @__PURE__ */ t("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ e("p", { className: "m-0 text-sm text-text-secondary", children: a.hasClients ? `${a.clientCount} application(s) registered.` : "No applications registered." }),
          /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(h, { variant: "ghost", size: "sm", onClick: () => s("/identity/admin/applications/new"), children: "Register an Application" }) })
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
          a.firstPoolId && /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(h, { variant: "ghost", size: "sm", onClick: () => s(`/identity/admin/pools/${a.firstPoolId}/users/new`), children: "Create Admin User" }) })
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
    [a, s]
  ), u = c.filter((d) => d.done).length, m = Math.round(u / c.length * 100);
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
        /* @__PURE__ */ e("div", { className: "flex flex-col gap-2", children: c.map((d, i) => /* @__PURE__ */ t(U, { children: [
          /* @__PURE__ */ t(
            "div",
            {
              className: "flex items-center justify-between px-5 py-4 cursor-pointer select-none",
              onClick: () => f(i),
              role: "button",
              "aria-expanded": l === i,
              children: [
                /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ e(
                    "div",
                    {
                      className: _(
                        "w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0",
                        d.done ? "bg-success text-white" : "bg-surface-hover text-text-tertiary"
                      ),
                      children: d.done ? "✓" : i + 1
                    }
                  ),
                  /* @__PURE__ */ e("span", { className: "text-sm font-medium text-text-primary", children: d.title })
                ] }),
                /* @__PURE__ */ e("span", { className: "text-text-tertiary text-sm", children: l === i ? "▲" : "▼" })
              ]
            }
          ),
          l === i && /* @__PURE__ */ e("div", { className: "px-5 pb-5 pt-0 border-t border-border-subtle", children: /* @__PURE__ */ e("div", { className: "pt-4", children: d.content }) })
        ] }, i)) })
      ]
    }
  );
}
function ze({ data: a }) {
  return /* @__PURE__ */ e("pre", { className: "p-5 font-mono text-xs text-text-primary overflow-x-auto whitespace-pre-wrap max-h-[400px] overflow-y-auto m-0 bg-surface-panel", children: JSON.stringify(a, null, 2) });
}
function Re({ rates: a }) {
  const s = Object.entries(a);
  return s.length === 0 ? /* @__PURE__ */ e("p", { className: "p-5 text-center text-text-tertiary text-sm m-0", children: "No rate limiter data available." }) : /* @__PURE__ */ t(de, { children: [
    /* @__PURE__ */ e(me, { children: /* @__PURE__ */ t("tr", { children: [
      /* @__PURE__ */ e(W, { children: "Key" }),
      /* @__PURE__ */ e(W, { children: "Value" })
    ] }) }),
    /* @__PURE__ */ e(ue, { children: s.map(([l, p]) => /* @__PURE__ */ t(he, { children: [
      /* @__PURE__ */ e(X, { className: "font-mono text-xs", children: l }),
      /* @__PURE__ */ e(X, { children: typeof p == "object" ? JSON.stringify(p) : String(p) })
    ] }, l)) })
  ] });
}
function bt({
  diagnostics: a,
  rates: s,
  dlq: l,
  onRedrive: p,
  onPurge: f,
  onRefresh: c,
  loading: u
}) {
  const [m, d] = o(!1), i = oe(null);
  ce(() => (m ? i.current = setInterval(c, 1e4) : i.current && (clearInterval(i.current), i.current = null), () => {
    i.current && clearInterval(i.current);
  }), [m, c]);
  const x = C(
    async (r) => {
      await p(r);
    },
    [p]
  ), N = C(
    async (r) => {
      await f(r);
    },
    [f]
  );
  return u ? /* @__PURE__ */ e(F, { title: "Diagnostics", children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-4", children: [1, 2, 3].map((r) => /* @__PURE__ */ e(U, { className: "h-[120px] animate-pulse" }, r)) }) }) : /* @__PURE__ */ t(
    F,
    {
      title: "Diagnostics",
      actions: /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ t("label", { className: "flex items-center gap-1.5 text-sm text-neutral cursor-pointer", children: [
          /* @__PURE__ */ e(
            J,
            {
              checked: m,
              onChange: d,
              className: "rounded"
            }
          ),
          "Auto-refresh (10s)"
        ] }),
        /* @__PURE__ */ e(h, { variant: "ghost", size: "lg", onClick: c, children: "Refresh" })
      ] }),
      children: [
        /* @__PURE__ */ t(U, { children: [
          /* @__PURE__ */ e("div", { className: "px-5 py-3 border-b border-border bg-surface-panel", children: /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-text-primary m-0", children: "Node / Cluster Diagnostics" }) }),
          a ? /* @__PURE__ */ e(ze, { data: a }) : /* @__PURE__ */ e("p", { className: "p-5 text-center text-text-tertiary text-sm m-0", children: "No diagnostics data available." })
        ] }),
        /* @__PURE__ */ t(U, { children: [
          /* @__PURE__ */ e("div", { className: "px-5 py-3 border-b border-border bg-surface-panel", children: /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-text-primary m-0", children: "Rate Limiter Stats" }) }),
          s ? /* @__PURE__ */ e(Re, { rates: s }) : /* @__PURE__ */ e("p", { className: "p-5 text-center text-text-tertiary text-sm m-0", children: "No rate data available." })
        ] }),
        /* @__PURE__ */ t(U, { children: [
          /* @__PURE__ */ e("div", { className: "px-5 py-3 border-b border-border bg-surface-panel", children: /* @__PURE__ */ e("h3", { className: "text-sm font-semibold text-text-primary m-0", children: "Dead Letter Queue" }) }),
          !l || l.length === 0 ? /* @__PURE__ */ e("p", { className: "p-5 text-center text-text-tertiary text-sm m-0", children: "Dead letter queue is empty." }) : /* @__PURE__ */ t(de, { children: [
            /* @__PURE__ */ e(me, { children: /* @__PURE__ */ t("tr", { children: [
              /* @__PURE__ */ e(W, { children: "ID" }),
              /* @__PURE__ */ e(W, { children: "Error" }),
              /* @__PURE__ */ e(W, { children: "Failed At" }),
              /* @__PURE__ */ e(W, { children: "Retries" }),
              /* @__PURE__ */ e(W, { className: "text-right", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ e(ue, { children: l.map((r) => /* @__PURE__ */ t(he, { children: [
              /* @__PURE__ */ t(X, { className: "font-mono text-xs", children: [
                r.id.substring(0, 12),
                "..."
              ] }),
              /* @__PURE__ */ e(X, { children: /* @__PURE__ */ e(K, { tone: "danger", size: "xs", children: r.error }) }),
              /* @__PURE__ */ e(X, { className: "text-xs text-neutral", children: new Date(r.failedAt).toLocaleString() }),
              /* @__PURE__ */ e(X, { children: /* @__PURE__ */ e(K, { tone: "neutral", size: "xs", mono: !0, children: r.retryCount }) }),
              /* @__PURE__ */ e(X, { className: "text-right", children: /* @__PURE__ */ t("div", { className: "flex items-center justify-end gap-2", children: [
                /* @__PURE__ */ e(h, { variant: "ghost", size: "sm", onClick: () => x(r.id), children: "Redrive" }),
                /* @__PURE__ */ e(h, { variant: "danger", size: "sm", onClick: () => N(r.id), children: "Purge" })
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
  interactionUrl: s,
  clientName: l,
  logoUrl: p,
  error: f = null,
  onLogin: c,
  onRegister: u,
  onForgotPassword: m,
  registrationEnabled: d = !0,
  forgotPasswordEnabled: i = !0
}) {
  const [x, N] = o("signin"), [r, n] = o(!1), [v, w] = o(null), [I, z] = o(""), [g, A] = o(""), [S, L] = o(""), [R, P] = o(""), [D, y] = o(""), [k, b] = o(""), [M, B] = o(""), [$, Z] = o(!1), [Y, be] = o(""), [xe, ne] = o(!1), re = f || v, ye = C(async (E) => {
    E.preventDefault(), w(null), n(!0);
    try {
      await c(I, g);
    } catch (V) {
      w(V instanceof Error ? V.message : "Login failed");
    } finally {
      n(!1);
    }
  }, [I, g, c]), ve = C(async (E) => {
    if (E.preventDefault(), w(null), R !== D) {
      w("Passwords do not match");
      return;
    }
    n(!0);
    try {
      await u({
        email: S,
        password: R,
        givenName: k || void 0,
        familyName: M || void 0,
        enableMfa: $ || void 0
      });
    } catch (V) {
      w(V instanceof Error ? V.message : "Registration failed");
    } finally {
      n(!1);
    }
  }, [S, R, D, k, M, $, u]), Ne = C(async (E) => {
    E.preventDefault(), w(null), n(!0);
    try {
      await m(Y), ne(!0);
    } catch (V) {
      w(V instanceof Error ? V.message : "Request failed");
    } finally {
      n(!1);
    }
  }, [Y, m]), te = (E) => {
    N(E), w(null), ne(!1);
  };
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-surface-panel", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[440px] bg-white rounded-xl shadow-md p-8", role: "main", "aria-label": "Authentication", children: [
    /* @__PURE__ */ t("header", { className: "flex flex-col items-center gap-3 mb-6", children: [
      p && /* @__PURE__ */ e("img", { src: p, alt: "", className: "w-14 h-14 object-contain rounded-md" }),
      l && /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-text-primary m-0", children: l })
    ] }),
    /* @__PURE__ */ t("nav", { className: "flex border-b border-border mb-6", role: "tablist", "aria-label": "Authentication method", children: [
      /* @__PURE__ */ e(
        h,
        {
          variant: "ghost",
          size: "sm",
          role: "tab",
          "aria-selected": x === "signin",
          className: _(
            "flex-1 rounded-none border-b-2",
            x === "signin" ? "border-b-[#3b82f6] text-info-fg font-semibold" : "border-b-transparent text-neutral font-normal"
          ),
          onClick: () => te("signin"),
          children: "Sign In"
        }
      ),
      d && /* @__PURE__ */ e(
        h,
        {
          variant: "ghost",
          size: "sm",
          role: "tab",
          "aria-selected": x === "register",
          className: _(
            "flex-1 rounded-none border-b-2",
            x === "register" ? "border-b-[#3b82f6] text-info-fg font-semibold" : "border-b-transparent text-neutral font-normal"
          ),
          onClick: () => te("register"),
          children: "Register"
        }
      ),
      i && /* @__PURE__ */ e(
        h,
        {
          variant: "ghost",
          size: "sm",
          role: "tab",
          "aria-selected": x === "forgot",
          className: _(
            "flex-1 rounded-none border-b-2",
            x === "forgot" ? "border-b-[#3b82f6] text-info-fg font-semibold" : "border-b-transparent text-neutral font-normal"
          ),
          onClick: () => te("forgot"),
          children: "Forgot Password"
        }
      )
    ] }),
    re && /* @__PURE__ */ e("div", { className: "mb-5", children: /* @__PURE__ */ e(q, { variant: "error", children: re }) }),
    x === "signin" && /* @__PURE__ */ t("form", { onSubmit: ye, "aria-label": "Sign in form", children: [
      /* @__PURE__ */ e("input", { type: "hidden", name: "uid", value: a }),
      /* @__PURE__ */ e(
        T,
        {
          label: "Email",
          name: "login-email",
          type: "email",
          value: I,
          onChange: (E) => z(String(E)),
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
          value: g,
          onChange: (E) => A(String(E)),
          required: !0,
          disabled: r
        }
      ),
      /* @__PURE__ */ e(
        h,
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
    x === "register" && /* @__PURE__ */ t("form", { onSubmit: ve, "aria-label": "Registration form", children: [
      /* @__PURE__ */ e(
        T,
        {
          label: "Email",
          name: "reg-email",
          type: "email",
          value: S,
          onChange: (E) => L(String(E)),
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
            onChange: (E) => b(String(E)),
            disabled: r
          }
        ) }),
        /* @__PURE__ */ e("div", { className: "flex-1", children: /* @__PURE__ */ e(
          T,
          {
            label: "Family Name",
            name: "reg-family",
            value: M,
            onChange: (E) => B(String(E)),
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
          value: R,
          onChange: (E) => P(String(E)),
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
          onChange: (E) => y(String(E)),
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
          value: $,
          onChange: (E) => Z(!!E),
          disabled: r
        }
      ),
      /* @__PURE__ */ e(
        h,
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
    x === "forgot" && /* @__PURE__ */ e("form", { onSubmit: Ne, "aria-label": "Forgot password form", children: xe ? /* @__PURE__ */ e(q, { variant: "success", children: "If an account exists for that email, a password reset link has been sent." }) : /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-4 mt-0 leading-relaxed", children: "Enter your email address and we'll send you a link to reset your password." }),
      /* @__PURE__ */ e(
        T,
        {
          label: "Email",
          name: "forgot-email",
          type: "email",
          value: Y,
          onChange: (E) => be(String(E)),
          required: !0,
          placeholder: "you@example.com",
          disabled: r
        }
      ),
      /* @__PURE__ */ e(
        h,
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
function Ue(a) {
  return Ee[a] || `Access: ${a}`;
}
function yt({
  clientName: a,
  scopes: s,
  redirectUri: l,
  onAuthorize: p,
  onDeny: f,
  logoUrl: c
}) {
  const [u, m] = o(!1), d = C(async () => {
    m(!0);
    try {
      await p();
    } finally {
      m(!1);
    }
  }, [p]), i = C(async () => {
    m(!0);
    try {
      await f();
    } finally {
      m(!1);
    }
  }, [f]);
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
          /* @__PURE__ */ e("ul", { className: "list-none p-0 m-0", "aria-label": "Requested permissions", children: s.map((x, N) => /* @__PURE__ */ t(
            "li",
            {
              className: _(
                "flex items-center gap-3 px-4 py-3 text-sm text-text-primary",
                N < s.length - 1 && "border-b border-border"
              ),
              children: [
                /* @__PURE__ */ e("span", { className: "w-2 h-2 rounded-full bg-info shrink-0", "aria-hidden": "true" }),
                /* @__PURE__ */ e("span", { children: Ue(x) })
              ]
            },
            x
          )) })
        ] }),
        /* @__PURE__ */ t("div", { className: "px-8 pb-8", children: [
          l && /* @__PURE__ */ t("p", { className: "text-[11px] text-text-tertiary mb-5 mt-0 break-all leading-relaxed", children: [
            "You will be redirected to: ",
            /* @__PURE__ */ e("strong", { className: "text-neutral", children: l })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ e(
              h,
              {
                variant: "ghost",
                size: "lg",
                fullWidth: !0,
                onClick: i,
                disabled: u,
                children: "Deny"
              }
            ),
            /* @__PURE__ */ e(
              h,
              {
                variant: "primary",
                size: "lg",
                fullWidth: !0,
                onClick: d,
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
function Le({ value: a, size: s = 200, label: l }) {
  return /* @__PURE__ */ t("figure", { className: "flex flex-col items-center gap-2 m-0 p-4 border border-border rounded-md bg-white", children: [
    /* @__PURE__ */ e(
      "img",
      {
        src: a,
        alt: l || "QR Code",
        width: s,
        height: s,
        className: "block rounded-sm [image-rendering:pixelated]"
      }
    ),
    l && /* @__PURE__ */ e("figcaption", { className: "text-sm text-neutral text-center", children: l })
  ] });
}
function ge({
  length: a = 6,
  onComplete: s,
  error: l = null,
  disabled: p = !1,
  autoFocus: f = !1
}) {
  const [c, u] = o(Array(a).fill("")), m = oe([]);
  ce(() => {
    f && m.current[0] && m.current[0].focus();
  }, [f]);
  const d = C((r) => {
    r >= 0 && r < a && m.current[r] && (m.current[r].focus(), m.current[r].select());
  }, [a]), i = C((r, n) => {
    const v = n.replace(/\D/g, "").slice(-1);
    u((w) => {
      const I = [...w];
      I[r] = v;
      const z = I.join("");
      return z.length === a && I.every((g) => g !== "") && setTimeout(() => s(z), 0), I;
    }), v && r < a - 1 && d(r + 1);
  }, [a, s, d]), x = C((r, n) => {
    n.key === "Backspace" ? c[r] === "" && r > 0 ? (n.preventDefault(), u((v) => {
      const w = [...v];
      return w[r - 1] = "", w;
    }), d(r - 1)) : u((v) => {
      const w = [...v];
      return w[r] = "", w;
    }) : n.key === "ArrowLeft" && r > 0 ? (n.preventDefault(), d(r - 1)) : n.key === "ArrowRight" && r < a - 1 && (n.preventDefault(), d(r + 1));
  }, [c, a, d]), N = C((r) => {
    r.preventDefault();
    const n = r.clipboardData.getData("text").replace(/\D/g, "").slice(0, a);
    if (!n) return;
    const v = Array(a).fill("");
    for (let w = 0; w < n.length; w++)
      v[w] = n[w];
    u(v), n.length === a ? setTimeout(() => s(n), 0) : d(Math.min(n.length, a - 1));
  }, [a, s, d]);
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
            ref: (v) => {
              m.current[n] = v;
            },
            type: "text",
            inputMode: "numeric",
            pattern: "[0-9]",
            maxLength: 1,
            value: c[n],
            disabled: p,
            "aria-label": `Digit ${n + 1} of ${a}`,
            onChange: (v) => i(n, v.target.value),
            onKeyDown: (v) => x(n, v),
            onPaste: N,
            onFocus: (v) => v.target.select(),
            className: _(
              "w-11 h-[52px] text-center text-lg font-semibold font-[inherit]",
              "rounded-md outline-none transition-[border-color,box-shadow] duration-150",
              "border-2",
              l ? "border-danger" : "border-border",
              p ? "bg-surface-panel cursor-not-allowed" : "bg-white cursor-text",
              "text-text-primary",
              "focus:border-info focus:ring-2 focus:ring-info/20"
            )
          },
          n
        ))
      }
    ),
    l && /* @__PURE__ */ e(
      "p",
      {
        role: "alert",
        className: "m-0 text-sm text-danger-fg",
        children: l
      }
    )
  ] });
}
const ie = ["name", "scan", "verify", "backup"], Me = ["Name", "Scan", "Verify", "Backup"];
function vt({
  onSetup: a,
  onVerify: s,
  onComplete: l,
  userEmail: p
}) {
  const [f, c] = o("name"), [u, m] = o(!1), [d, i] = o(null), [x, N] = o(""), [r, n] = o(null), [v, w] = o([]), [I, z] = o(!1), g = ie.indexOf(f), A = C(async (R) => {
    if (R.preventDefault(), !!x.trim()) {
      i(null), m(!0);
      try {
        const P = await a(x.trim());
        n(P), w(P.backupCodes), c("scan");
      } catch (P) {
        i(P instanceof Error ? P.message : "Setup failed");
      } finally {
        m(!1);
      }
    }
  }, [x, a]), S = C(async (R) => {
    if (r) {
      i(null), m(!0);
      try {
        const P = await s(r.deviceId, R);
        P.success ? (P.backupCodes && w(P.backupCodes), c("backup")) : i("Verification failed. Please try again.");
      } catch (P) {
        i(P instanceof Error ? P.message : "Verification failed");
      } finally {
        m(!1);
      }
    }
  }, [r, s]), L = C(async () => {
    try {
      await navigator.clipboard.writeText(v.join(`
`)), z(!0), setTimeout(() => z(!1), 2e3);
    } catch {
    }
  }, [v]);
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-surface-panel", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[480px] bg-white rounded-xl shadow-md p-8", role: "main", "aria-label": "MFA setup", children: [
    /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-text-primary mb-2 mt-0 text-center", children: "Set Up Multi-Factor Authentication" }),
    p && /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-5 mt-0 text-center", children: p }),
    /* @__PURE__ */ e("div", { className: "flex justify-center gap-6 mb-6", role: "group", "aria-label": "Setup progress", children: ie.map((R, P) => /* @__PURE__ */ t("div", { className: "flex flex-col items-center gap-1.5", children: [
      /* @__PURE__ */ e(
        "div",
        {
          className: _(
            "w-3 h-3 rounded-full transition-colors duration-200",
            P < g ? "bg-success" : P === g ? "bg-info" : "bg-surface-emphasis"
          ),
          "aria-label": `Step ${P + 1}${P === g ? " (current)" : P < g ? " (completed)" : ""}`
        }
      ),
      /* @__PURE__ */ e("span", { className: _(
        "text-[10px] uppercase tracking-wide font-medium",
        P === g ? "text-text-primary" : "text-text-tertiary"
      ), children: Me[P] })
    ] }, R)) }),
    d && /* @__PURE__ */ e("div", { className: "mb-5", children: /* @__PURE__ */ e(q, { variant: "error", children: d }) }),
    f === "name" && /* @__PURE__ */ t("form", { onSubmit: A, "aria-label": "Name your device", children: [
      /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-4 mt-0 text-center leading-relaxed", children: "Give your authenticator device a name so you can identify it later." }),
      /* @__PURE__ */ e(
        T,
        {
          label: "Device Name",
          name: "device-name",
          value: x,
          onChange: (R) => N(String(R)),
          required: !0,
          placeholder: "e.g., My Phone",
          disabled: u
        }
      ),
      /* @__PURE__ */ e(
        h,
        {
          type: "submit",
          variant: "primary",
          size: "lg",
          fullWidth: !0,
          disabled: u || !x.trim(),
          children: u ? "Setting up..." : "Continue"
        }
      )
    ] }),
    f === "scan" && r && /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ e(
        h,
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
        Le,
        {
          value: r.qrCode,
          size: 200,
          label: `Device: ${x}`
        }
      ) }),
      /* @__PURE__ */ e("p", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary text-center mb-2 mt-0", children: "Or enter this secret manually" }),
      /* @__PURE__ */ e("div", { className: "px-4 py-3 bg-surface-panel border border-border rounded-md font-mono text-sm text-text-primary break-all text-center mb-6 select-all", children: r.secret }),
      /* @__PURE__ */ e(
        h,
        {
          variant: "primary",
          size: "lg",
          fullWidth: !0,
          onClick: () => c("verify"),
          children: "I've scanned it"
        }
      )
    ] }),
    f === "verify" && /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ e(
        h,
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
          onComplete: S,
          error: d,
          disabled: u,
          autoFocus: !0
        }
      ),
      u && /* @__PURE__ */ e("p", { className: "text-center text-sm text-text-tertiary mt-3", children: "Verifying..." })
    ] }),
    f === "backup" && /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ e("div", { className: "w-14 h-14 mx-auto mb-5 rounded-full bg-success-bg flex items-center justify-center", children: /* @__PURE__ */ e("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-success-fg", children: /* @__PURE__ */ e("polyline", { points: "20 6 9 17 4 12" }) }) }),
      /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-5 mt-0 text-center leading-relaxed", children: "Save these backup codes in a safe place. Each code can only be used once." }),
      /* @__PURE__ */ e("div", { className: "grid grid-cols-2 gap-2.5 mb-6", children: v.map((R, P) => /* @__PURE__ */ e("div", { className: "px-3 py-2.5 bg-surface-panel border border-border rounded-md font-mono text-sm text-text-primary text-center select-all", children: R }, P)) }),
      /* @__PURE__ */ e(
        h,
        {
          variant: "primary",
          size: "lg",
          fullWidth: !0,
          onClick: L,
          children: I ? "Copied!" : "Copy All Codes"
        }
      ),
      /* @__PURE__ */ e("div", { className: "mt-3", children: /* @__PURE__ */ e(
        h,
        {
          variant: "ghost",
          size: "lg",
          fullWidth: !0,
          onClick: l,
          children: "I've saved them — Continue"
        }
      ) })
    ] })
  ] }) });
}
function Nt({
  onVerify: a,
  onVerifyBackup: s,
  error: l = null
}) {
  const [p, f] = o("totp"), [c, u] = o(!1), [m, d] = o(null), [i, x] = o(""), N = l || m, r = C(async (v) => {
    d(null), u(!0);
    try {
      await a(v);
    } catch (w) {
      d(w instanceof Error ? w.message : "Verification failed");
    } finally {
      u(!1);
    }
  }, [a]), n = C(async (v) => {
    if (v.preventDefault(), !!i.trim()) {
      d(null), u(!0);
      try {
        await s(i.trim());
      } catch (w) {
        d(w instanceof Error ? w.message : "Verification failed");
      } finally {
        u(!1);
      }
    }
  }, [i, s]);
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-surface-panel", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[440px] bg-white rounded-xl shadow-md p-8", role: "main", "aria-label": "Multi-factor verification", children: [
    /* @__PURE__ */ e("div", { className: "w-14 h-14 mx-auto mb-5 rounded-full bg-info-bg flex items-center justify-center", children: /* @__PURE__ */ t("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-info-fg", children: [
      /* @__PURE__ */ e("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
      /* @__PURE__ */ e("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
    ] }) }),
    /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-text-primary mb-2 mt-0 text-center", children: "Verify Your Identity" }),
    p === "totp" ? /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-6 mt-0 text-center leading-relaxed", children: "Enter the 6-digit code from your authenticator app" }),
      N && /* @__PURE__ */ e("div", { className: "mb-5", children: /* @__PURE__ */ e(q, { variant: "error", children: N }) }),
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
        h,
        {
          variant: "ghost",
          size: "sm",
          className: "block mt-6 mx-auto underline text-info-fg",
          onClick: () => {
            f("backup"), d(null);
          },
          children: "Use a backup code instead"
        }
      )
    ] }) : /* @__PURE__ */ t(j, { children: [
      /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-6 mt-0 text-center leading-relaxed", children: "Enter one of your backup codes" }),
      N && /* @__PURE__ */ e("div", { className: "mb-5", children: /* @__PURE__ */ e(q, { variant: "error", children: N }) }),
      /* @__PURE__ */ t("form", { onSubmit: n, "aria-label": "Backup code verification", children: [
        /* @__PURE__ */ e(
          T,
          {
            label: "Backup Code",
            name: "backup-code",
            value: i,
            onChange: (v) => x(String(v)),
            required: !0,
            placeholder: "XXXX-XXXX-XXXX",
            disabled: c
          }
        ),
        /* @__PURE__ */ e(
          h,
          {
            type: "submit",
            variant: "primary",
            size: "lg",
            fullWidth: !0,
            disabled: c || !i.trim(),
            children: c ? "Verifying..." : "Verify Backup Code"
          }
        )
      ] }),
      /* @__PURE__ */ e(
        h,
        {
          variant: "ghost",
          size: "sm",
          className: "block mt-6 mx-auto underline text-info-fg",
          onClick: () => {
            f("totp"), d(null);
          },
          children: "Use authenticator code instead"
        }
      )
    ] })
  ] }) });
}
function se(a) {
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
function Ct({
  devices: a,
  userEmail: s,
  mfaEnabled: l,
  onAddDevice: p,
  onRenameDevice: f,
  onRemoveDevice: c,
  loading: u = !1
}) {
  const [m, d] = o(null), [i, x] = o(null), [N, r] = o(""), [n, v] = o(!1), w = C(async () => {
    if (m) {
      v(!0);
      try {
        await c(m);
      } finally {
        v(!1), d(null);
      }
    }
  }, [m, c]), I = C(async (g) => {
    if (N.trim()) {
      v(!0);
      try {
        await f(g, N.trim());
      } finally {
        v(!1), x(null), r("");
      }
    }
  }, [N, f]), z = (g) => {
    x(g.deviceId), r(g.deviceName);
  };
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-start justify-center p-6 bg-surface-panel", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[600px] bg-white rounded-xl shadow-md p-8", role: "main", "aria-label": "MFA device management", children: [
    /* @__PURE__ */ t("div", { className: "flex items-center justify-between mb-6 flex-wrap gap-3", children: [
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-text-primary m-0", children: "MFA Devices" }),
        s && /* @__PURE__ */ e("p", { className: "text-sm text-neutral m-0", children: s })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ e(K, { tone: l ? "success" : "warning", children: l ? "Enabled" : "Disabled" }),
        /* @__PURE__ */ e(h, { variant: "primary", size: "md", onClick: p, children: "Add Device" })
      ] })
    ] }),
    u && /* @__PURE__ */ e("p", { className: "text-center text-text-tertiary text-sm py-8", children: "Loading devices..." }),
    !u && a.length === 0 && /* @__PURE__ */ e(
      pe,
      {
        icon: "🔐",
        title: "No MFA devices configured",
        body: "Add a device to secure your account with multi-factor authentication.",
        actionLabel: "Add Device",
        onAction: p
      }
    ),
    !u && a.length > 0 && /* @__PURE__ */ e("div", { className: "flex flex-col gap-3", role: "list", "aria-label": "MFA devices", children: a.map((g) => /* @__PURE__ */ t("div", { className: "p-5 border border-border rounded-lg bg-white", role: "listitem", children: [
      /* @__PURE__ */ e("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ e("div", { className: "flex items-center gap-2.5", children: i === g.deviceId ? /* @__PURE__ */ t(
        "form",
        {
          onSubmit: (A) => {
            A.preventDefault(), I(g.deviceId);
          },
          className: "flex gap-2 items-center",
          children: [
            /* @__PURE__ */ e(
              T,
              {
                label: "",
                name: `rename-${g.deviceId}`,
                value: N,
                onChange: (A) => r(String(A)),
                disabled: n
              }
            ),
            /* @__PURE__ */ e(h, { type: "submit", variant: "primary", size: "sm", disabled: n || !N.trim(), children: "Save" }),
            /* @__PURE__ */ e(h, { variant: "ghost", size: "sm", onClick: () => x(null), children: "Cancel" })
          ]
        }
      ) : /* @__PURE__ */ t(j, { children: [
        /* @__PURE__ */ e("h3", { className: "text-[15px] font-semibold text-text-primary m-0", children: g.deviceName }),
        /* @__PURE__ */ e(
          ae,
          {
            status: g.isVerified ? "CONFIRMED" : "UNCONFIRMED"
          }
        )
      ] }) }) }),
      /* @__PURE__ */ t("p", { className: "text-[11px] text-text-tertiary m-0 mb-3", children: [
        "Type: ",
        g.deviceType,
        " · Added: ",
        se(g.createdAt),
        g.lastUsed && ` · Last used: ${se(g.lastUsed)}`
      ] }),
      i !== g.deviceId && /* @__PURE__ */ t("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ e(h, { variant: "ghost", size: "sm", onClick: () => z(g), children: "Rename" }),
        /* @__PURE__ */ e(h, { variant: "danger", size: "sm", onClick: () => d(g.deviceId), children: "Remove" })
      ] })
    ] }, g.deviceId)) }),
    /* @__PURE__ */ e(
      Q,
      {
        open: !!m,
        onConfirm: w,
        onCancel: () => d(null),
        title: "Remove Device",
        body: "Are you sure you want to remove this MFA device? You will no longer be able to use it for verification.",
        confirmLabel: n ? "Removing..." : "Remove",
        confirmDisabled: n,
        tone: "destructive"
      }
    )
  ] }) });
}
function wt({ onConfirm: a, onCancel: s, clientName: l }) {
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-surface-panel", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[420px] bg-white rounded-xl shadow-md p-8 text-center", role: "main", "aria-label": "Sign out confirmation", children: [
    /* @__PURE__ */ e("div", { className: "w-14 h-14 mx-auto mb-5 rounded-full bg-danger-bg flex items-center justify-center", children: /* @__PURE__ */ t("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-danger-fg", children: [
      /* @__PURE__ */ e("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
      /* @__PURE__ */ e("polyline", { points: "16 17 21 12 16 7" }),
      /* @__PURE__ */ e("line", { x1: "21", y1: "12", x2: "9", y2: "12" })
    ] }) }),
    /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-text-primary mb-3 mt-0", children: "Sign Out" }),
    /* @__PURE__ */ t("p", { className: "text-sm text-neutral mb-6 mt-0 leading-relaxed", children: [
      "Are you sure you want to sign out",
      l ? /* @__PURE__ */ t(j, { children: [
        " from ",
        /* @__PURE__ */ e("strong", { className: "text-text-primary", children: l })
      ] }) : "",
      "? You will need to sign in again to access your account."
    ] }),
    /* @__PURE__ */ t("div", { className: "flex gap-3 justify-center", children: [
      s && /* @__PURE__ */ e(h, { variant: "ghost", size: "lg", fullWidth: !0, onClick: s, children: "Cancel" }),
      /* @__PURE__ */ e(h, { variant: "danger-solid", size: "lg", fullWidth: !0, onClick: a, children: "Sign Out" })
    ] })
  ] }) });
}
function kt({
  title: a = "Something went wrong",
  message: s,
  error: l,
  onRetry: p,
  onBack: f
}) {
  return /* @__PURE__ */ e("div", { className: "min-h-full flex items-center justify-center p-6 bg-surface-panel", children: /* @__PURE__ */ t("div", { className: "w-full max-w-[420px] bg-white rounded-xl shadow-md p-8 text-center", role: "main", "aria-label": "Error", children: [
    /* @__PURE__ */ e("div", { className: "w-14 h-14 rounded-full bg-danger-bg flex items-center justify-center mx-auto mb-5", "aria-hidden": "true", children: /* @__PURE__ */ t("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-danger-fg", children: [
      /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ e("line", { x1: "15", y1: "9", x2: "9", y2: "15" }),
      /* @__PURE__ */ e("line", { x1: "9", y1: "9", x2: "15", y2: "15" })
    ] }) }),
    /* @__PURE__ */ e("h1", { className: "text-xl font-bold text-text-primary mb-3 mt-0", children: a }),
    /* @__PURE__ */ e("p", { className: "text-sm text-neutral mb-3 mt-0 leading-relaxed", children: s }),
    l && /* @__PURE__ */ e("code", { className: "text-[11px] text-text-tertiary font-mono mb-5 px-3.5 py-2 bg-surface-panel border border-border rounded-md inline-block max-w-full overflow-x-auto", children: l }),
    (p || f) && /* @__PURE__ */ t("div", { className: "flex gap-3 justify-center mt-6", children: [
      f && /* @__PURE__ */ e(h, { variant: "ghost", size: "lg", onClick: f, children: "Go Back" }),
      p && /* @__PURE__ */ e(h, { variant: "primary", size: "lg", onClick: p, children: "Try Again" })
    ] })
  ] }) });
}
const Fe = [
  { label: "Dashboard", path: "/identity/admin", icon: "⌂" },
  { label: "Pools", path: "/identity/admin/pools", icon: "☰" },
  { label: "Applications", path: "/identity/admin/applications", icon: "⬚" },
  { label: "Email Templates", path: "/identity/admin/email-templates", icon: "✉" },
  { label: "Audit", path: "/identity/admin/audit", icon: "⌸" },
  { label: "Diagnostics", path: "/identity/admin/diagnostics", icon: "⚙" },
  { label: "Setup Guide", path: "/identity/admin/setup", icon: "✓" }
];
function je({
  item: a,
  active: s,
  onNavigate: l
}) {
  return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: _(
        "flex items-center gap-2 w-full text-left px-3 py-2 text-sm font-medium cursor-pointer",
        "border-none rounded-none border-l-[3px] transition-colors",
        s ? "bg-surface-panel text-info-fg font-semibold border-l-info" : "bg-transparent text-text-primary border-l-transparent hover:bg-surface-hover"
      ),
      onClick: () => l(a.path),
      "aria-current": s ? "page" : void 0,
      children: [
        /* @__PURE__ */ e("span", { children: a.icon }),
        /* @__PURE__ */ e("span", { children: a.label })
      ]
    }
  ) });
}
function St({
  children: a,
  activePath: s,
  adminEmail: l,
  onNavigate: p,
  onLogout: f
}) {
  const [c, u] = o(!0), m = C(() => u((d) => !d), []);
  return /* @__PURE__ */ t("div", { className: "flex min-h-screen bg-surface-panel font-[inherit]", children: [
    /* @__PURE__ */ t(
      "aside",
      {
        className: _(
          "bg-white border-r border-border flex flex-col shrink-0 transition-[width] duration-200 overflow-hidden",
          c ? "w-60" : "w-0 border-r-0"
        ),
        children: [
          /* @__PURE__ */ e("div", { className: "p-4 font-bold text-lg text-info-fg border-b border-border", children: "Identity Admin" }),
          /* @__PURE__ */ e("ul", { className: "list-none m-0 p-0 py-2 flex-1", children: Fe.map((d) => /* @__PURE__ */ e(
            je,
            {
              item: d,
              active: s === d.path,
              onNavigate: p
            },
            d.path
          )) })
        ]
      }
    ),
    /* @__PURE__ */ t("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ t("header", { className: "flex items-center justify-between px-4 py-2 bg-white border-b border-border", children: [
        /* @__PURE__ */ e(
          h,
          {
            variant: "ghost",
            size: "sm",
            onClick: m,
            "aria-label": "Toggle sidebar",
            children: c ? "←" : "→"
          }
        ),
        /* @__PURE__ */ t("div", { className: "flex items-center gap-4", children: [
          l && /* @__PURE__ */ e("span", { className: "text-sm text-neutral", children: l }),
          f && /* @__PURE__ */ e(h, { variant: "danger-solid", size: "sm", onClick: f, children: "Logout" })
        ] })
      ] }),
      /* @__PURE__ */ e("main", { className: "flex-1 p-6 overflow-y-auto", children: a })
    ] })
  ] });
}
const Oe = [
  { key: "users", label: "Users" },
  { key: "groups", label: "Groups" },
  { key: "mfa", label: "MFA" }
];
function Be({
  label: a,
  active: s,
  onClick: l
}) {
  return /* @__PURE__ */ e(
    h,
    {
      variant: "ghost",
      size: "sm",
      className: _(
        "rounded-none -mb-[2px] border-b-2",
        s ? "font-semibold text-info-fg border-b-[#3b82f6]" : "font-normal text-neutral border-b-transparent"
      ),
      onClick: l,
      "aria-selected": s,
      role: "tab",
      children: a
    }
  );
}
function At({
  children: a,
  poolId: s,
  poolName: l,
  activeSection: p,
  onNavigate: f,
  onBack: c
}) {
  const u = C(
    (d) => {
      f(`/identity/admin/pools/${s}/${d}`);
    },
    [f, s]
  ), m = p ? p.charAt(0).toUpperCase() + p.slice(1) : "";
  return /* @__PURE__ */ t("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ t("nav", { className: "flex items-center gap-1.5 text-sm text-text-tertiary", "aria-label": "Breadcrumb", children: [
      /* @__PURE__ */ e(
        h,
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
      /* @__PURE__ */ e("span", { className: "text-text-primary font-medium", children: l }),
      p && /* @__PURE__ */ t(j, { children: [
        /* @__PURE__ */ e("span", { children: "/" }),
        /* @__PURE__ */ e("span", { children: m })
      ] })
    ] }),
    /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(h, { variant: "secondary", size: "sm", onClick: c, children: "← Back to Pools" }) }),
    /* @__PURE__ */ e("div", { className: "flex border-b-2 border-border", children: Oe.map((d) => /* @__PURE__ */ e(
      Be,
      {
        label: d.label,
        active: p === d.key,
        onClick: () => u(d.key)
      },
      d.key
    )) }),
    /* @__PURE__ */ e("div", { children: a })
  ] });
}
export {
  at as A,
  ge as C,
  bt as D,
  ht as E,
  T as F,
  ot as G,
  St as I,
  xt as L,
  Ct as M,
  rt as P,
  Le as Q,
  gt as S,
  it as U,
  dt as a,
  ct as b,
  mt as c,
  ft as d,
  yt as e,
  ut as f,
  H as g,
  kt as h,
  st as i,
  wt as j,
  pt as k,
  vt as l,
  Nt as m,
  nt as n,
  At as o,
  ae as p,
  lt as q
};
