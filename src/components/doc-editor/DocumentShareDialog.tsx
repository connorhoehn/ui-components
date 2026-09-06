// Who can open this document.
//
// ## What is real here and what is not
//
// The PEOPLE half is real: the host passes who has access and what each of
// them may do, and every change is reported back through `onChangeRole` /
// `onInvite` for the host to persist. The ORG half — "anyone at Acme can
// view" — is presentational until there is an org model to hang it on, which
// is why `generalAccess` is a controlled value with no default opinion: the
// host says what the current state is, and if it lies, this lies with it.
//
// It is deliberately NOT a permissions engine. It renders the answer someone
// else computed. A share dialog that decides access is a security surface, and
// this one has no business being that.

import { useState } from 'react';
import Modal from '../shared/Modal';
import Avatar from '../shared/Avatar';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';
import type { DocumentPerson } from './DocumentOwnership';

/** What a person may do with the document. */
export type ShareRole = 'owner' | 'editor' | 'commenter' | 'viewer';

export const SHARE_ROLES: readonly ShareRole[] = ['owner', 'editor', 'commenter', 'viewer'];

export interface ShareEntry extends DocumentPerson {
  role: ShareRole;
}

/** How the wider organisation sees this document. */
export type GeneralAccess = 'restricted' | 'org-view' | 'org-edit' | 'link-view';

export interface DocumentShareDialogProps {
  open: boolean;
  onClose: () => void;
  documentTitle?: string;
  /** Everyone with explicit access, owner first. */
  people: readonly ShareEntry[];
  generalAccess?: GeneralAccess;
  /** Name of the org, for the general-access wording. */
  orgName?: string;
  onChangeGeneralAccess?: (next: GeneralAccess) => void;
  onChangeRole?: (userId: string, next: ShareRole) => void;
  /** Invite by email or name. The host resolves it to a person. */
  onInvite?: (query: string) => void;
  /** Copy a link to the document. */
  onCopyLink?: () => void;
  'data-testid'?: string;
}

const GENERAL_ACCESS_LABEL: Record<GeneralAccess, (org: string) => string> = {
  restricted: () => 'Restricted — only people added here',
  'org-view': (org) => `Anyone at ${org} can view`,
  'org-edit': (org) => `Anyone at ${org} can edit`,
  'link-view': () => 'Anyone with the link can view',
};

export function DocumentShareDialog({
  open,
  onClose,
  documentTitle,
  people,
  generalAccess = 'restricted',
  orgName = 'your organisation',
  onChangeGeneralAccess,
  onChangeRole,
  onInvite,
  onCopyLink,
  'data-testid': testId = 'document-share-dialog',
}: DocumentShareDialogProps) {
  const [query, setQuery] = useState('');

  const invite = () => {
    const trimmed = query.trim();
    if (!trimmed || !onInvite) return;
    onInvite(trimmed);
    setQuery('');
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={documentTitle ? `Share “${documentTitle}”` : 'Share'}
      maxWidth={460}
    >
      <div className="flex flex-col gap-4" data-testid={testId}>
        {onInvite && (
          <div className="flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') invite(); }}
              placeholder="Add people by name or email"
              aria-label="Add people"
              data-testid={`${testId}-invite-input`}
              className="min-w-0 flex-1 rounded border border-border bg-surface px-2 py-1.5 text-sm text-text-primary"
            />
            <Button size="sm" onClick={invite} disabled={!query.trim()} data-testid={`${testId}-invite`}>
              Invite
            </Button>
          </div>
        )}

        <div className="flex flex-col gap-1" data-testid={`${testId}-people`}>
          {people.map((p) => (
            <div key={p.userId} className="flex items-center gap-2" data-testid={`${testId}-person`}>
              <Avatar name={p.displayName} size={26} {...(p.avatarUrl ? { src: p.avatarUrl } : {})} />
              <span className="min-w-0 flex-1 truncate text-sm text-text-primary">{p.displayName}</span>
              {/* The owner's role is a fact about the document, not a setting:
                  a document with no owner is a document nobody is responsible
                  for, so it is stated rather than offered. */}
              {p.role === 'owner' || !onChangeRole ? (
                <span className="text-xs text-text-tertiary" data-testid={`${testId}-role-static`}>
                  {p.role === 'owner' ? 'Owner' : p.role}
                </span>
              ) : (
                <select
                  value={p.role}
                  onChange={(e) => onChangeRole(p.userId, e.target.value as ShareRole)}
                  aria-label={`Access for ${p.displayName}`}
                  data-testid={`${testId}-role`}
                  className="rounded border border-border bg-surface px-1 py-0.5 text-xs text-text-secondary"
                >
                  {SHARE_ROLES.filter((r) => r !== 'owner').map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1.5 border-t border-border pt-3">
          <span className="text-xs font-medium text-text-secondary">General access</span>
          <select
            value={generalAccess}
            onChange={(e) => onChangeGeneralAccess?.(e.target.value as GeneralAccess)}
            disabled={!onChangeGeneralAccess}
            aria-label="General access"
            data-testid={`${testId}-general-access`}
            className="rounded border border-border bg-surface px-2 py-1.5 text-sm text-text-primary disabled:opacity-60"
          >
            {(Object.keys(GENERAL_ACCESS_LABEL) as GeneralAccess[]).map((k) => (
              <option key={k} value={k}>{GENERAL_ACCESS_LABEL[k](orgName)}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          {onCopyLink ? (
            <Button variant="secondary" size="sm" onClick={onCopyLink} data-testid={`${testId}-copy-link`}>
              Copy link
            </Button>
          ) : <span />}
          <Button size="sm" onClick={onClose} data-testid={`${testId}-done`}>Done</Button>
        </div>
      </div>
    </Modal>
  );
}

export default DocumentShareDialog;
