# Identity — `@connorhoehn/ui-components/identity`

Authentication flows, admin identity panels, and the `IdentityContext`
provider. Also reachable from the root barrel.

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
} from '@connorhoehn/ui-components/identity';
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

**Stable.** Public surface used by consumer admin UIs and social flows;
changing its exports needs a major version bump.

Three name disambiguations apply at the root barrel, to avoid colliding with
other root exports:

- `FormField` / `FormFieldProps` — root resolves to the
  `shared/FormField`. Identity-flavoured variants are exported at root
  under `IdentityFormField` / `IdentityFormFieldProps`. Both reachable
  via the subpath.
- `AuditPage` — root resolves to the pipelines `api/pipelineAudit`
  interface. Identity admin component exported at root as
  `IdentityAuditPage`.
- `MfaDevice` — root resolves to `types/identity`. The page-local
  `MfaDevice` shape in `auth/MfaDashboardPage.tsx` stays subpath-only.

## See also

- Demo route `/workflows/identity` for the live flows.
