export * from './types';
export * from './hooks';
export * from './contexts';
export * from './components/shared';
export * from './components/sidebar';
export * from './components/hangout';
export * from './components/layout';
export * from './components/social';
export * from './components/video';
export * from './components/identity';
export * from './styles';
export * from './theme';
export * from './api';
export * from './renderers';

// Disambiguators for names that collide between domains.
// Each line below resolves a TS2308 by picking the pre-existing canonical
// source at root (so existing consumers see no change). New-domain
// counterparts remain reachable via their subpath import (e.g.
// `@connorhoehn/ui-components/social`), and are also re-exported here under
// disambiguated aliases for root-import convenience.
export type { CommentThread } from './types';
export type { Participant } from './types';
export type { MfaDevice } from './types';
export { FormField } from './components/shared';
export type { FormFieldProps } from './components/shared';
export type { AuditPage } from './api/pipelineAudit';

// Aliases for new-domain symbols whose original name collides with a pre-existing root export.
// Consumers wanting the unaliased name should use the subpath import.
export { CommentThread as CommentThreadPanel } from './components/social';
export type { Participant as VideoParticipant } from './components/video';
export { FormField as IdentityFormField } from './components/identity';
export type { FormFieldProps as IdentityFormFieldProps } from './components/identity';
export { AuditPage as IdentityAuditPage } from './components/identity';
