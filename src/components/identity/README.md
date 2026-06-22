# Identity — `@connorhoehnslalom/ui-components/identity`

Authentication flows, admin identity panels, and the `IdentityContext`
provider. Root-reachable since v2.12.0 (hub#1058).

Subpath import:

```tsx
import {
  LoginPage,
  LogoutPage,
  MfaSetupPage,
  MfaVerifyPage,
  MfaDashboardPage,
  ConsentPage,
  ErrorPage,
  IdentityAdminLayout,
  PoolScopedLayout,
  EntityTable,
  CodeInput,
  QrCodeDisplay,
  StatusBadge,
} from '@connorhoehnslalom/ui-components/identity';
// also reachable from the root barrel.
```

## Layout

```
identity/
  auth/        — LoginPage, LogoutPage, Mfa*, ConsentPage, ErrorPage
  admin/       — IdentityAdminLayout, PoolScopedLayout, EntityTable, AuditPage
  shared/      — CodeInput, QrCodeDisplay, StatusBadge, identity-flavored FormField
  context/     — IdentityContext provider + hook
```

## Stability

**Stable.** Public surface used by `websocket-gateway` admin UI and
`vnl-ads` social flows. On the charter §1 no-touch list.

Two name disambiguations apply at the root barrel (introduced with
hub#1058 to avoid colliding with pre-existing root exports):

- `FormField` / `FormFieldProps` — root resolves to the
  `shared/FormField`. Identity-flavoured variants are exported at root
  under `IdentityFormField` / `IdentityFormFieldProps`. Both reachable
  via the subpath.
- `AuditPage` — root resolves to the pipelines `api/pipelineAudit`
  interface. Identity admin component exported at root as
  `IdentityAuditPage`.
- `MfaDevice` — root resolves to `types/identity`. The page-local
  `MfaDevice` shape in `auth/MfaDashboardPage.tsx` stays subpath-only.

## Tests

Light overall. Auth happy-path flows have demo coverage in
`/workflows/identity`. Targeted test coverage tracked under #1051.

## See also

- [`../../../docs/AUTONOMY_CHARTER.md`](../../../docs/AUTONOMY_CHARTER.md)
  §1 — identity stable-exports list.
- Demo route `/workflows/identity` for the live flows.
