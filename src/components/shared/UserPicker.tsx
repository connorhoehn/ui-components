// frontend/src/components/shared/UserPicker.tsx
//
// Multi-select user picker. Candidate users come from two sources that are
// merged in the dropdown:
//   1. Presence — everyone currently visible in the app (instant, local, no
//      network). Used as an immediate-result fallback.
//   2. `GET /api/profiles?q=<search>` — server-side search across all users
//      (debounced 250ms). Catches users who aren't currently online.
// Manual free-text entry is also supported: typing a value that doesn't match
// any candidate and pressing Enter accepts the raw string as a userId.
//
// By default, presence comes from this library's `usePresenceContext()` and
// the search token from `useIdentityContext()` — both non-throwing here (see
// `useOptionalPresenceContext`/`useOptionalIdentityContext`), so a host that
// mounts neither provider still renders, just with no candidates until it
// passes `presenceUsers`/`idToken` explicitly. `presenceUsers`, `idToken`,
// `searchUsers`, and `baseUrl` all take precedence over the contexts/env when
// given, so a host with its own presence + identity providers (and possibly
// its own profile-search backend) never needs to mount this library's
// providers at all — see each prop's doc comment below.
//
// `VITE_SOCIAL_API_URL` is STATICALLY REPLACED at build time — and the build
// that matters is THIS library's, not the consumer's (same story as
// `ActivityPanel`'s `getBaseUrl`). `baseUrl` exists to let a host override it.

import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { cn } from '../../lib/cn';
import { useOptionalPresenceContext } from '../../contexts/PresenceContext';
import { useOptionalIdentityContext } from '../../contexts/IdentityContext';
import type { PresenceUser } from '../../hooks/usePresence';

const SOCIAL_API_URL = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';

export interface UserPickerProps {
  value: string[];
  onChange: (userIds: string[]) => void;
  placeholder?: string;
  maxSelect?: number;
  /**
   * Presence-sourced candidates. Wins over this library's
   * `usePresenceContext()`, so a host running its own presence provider can
   * hand its list in directly instead of mounting this library's
   * `<PresenceProvider>` just for `UserPicker`. Defaults to the context's
   * `presenceUsers` (or `[]` when no provider is mounted).
   */
  presenceUsers?: PresenceUser[];
  /**
   * Bearer token for the default `GET /api/profiles` search request. Wins
   * over `useIdentityContext().idToken`. Pass `null` explicitly to disable
   * the default search request while still showing presence candidates.
   * Ignored when `searchUsers` is given. Defaults to the context's `idToken`
   * (or `null` when no provider is mounted).
   */
  idToken?: string | null;
  /**
   * Full replacement for the default profile-search request, for a host that
   * already owns an authorized client (signed requests, a proxy, a mock in
   * tests) or whose search endpoint isn't `GET {baseUrl}/api/profiles?q=`.
   * Wins over `baseUrl` and does not require `idToken`. Called (debounced
   * 250ms) with the trimmed query and an `AbortSignal` tied to the request's
   * lifetime — abort on unmount/requery the way the default `fetch` does.
   */
  searchUsers?: (query: string, signal: AbortSignal) => Promise<ProfileSummary[]>;
  /**
   * Origin for the default `GET /api/profiles` request. Wins over the
   * build-time `VITE_SOCIAL_API_URL`, which is baked into THIS library's own
   * build and cannot be influenced by a consumer's `.env` — see the note on
   * `VITE_SOCIAL_API_URL` above. Ignored when `searchUsers` is given.
   */
  baseUrl?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface Candidate {
  userId: string;
  displayName: string;
}

export interface ProfileSummary {
  userId: string;
  displayName: string;
  email?: string;
  avatarUrl?: string;
}

function extractDisplayName(metadata: Record<string, unknown>, fallbackId: string): string {
  const dn = metadata.displayName;
  if (typeof dn === 'string' && dn.length > 0) return dn;
  return fallbackId.slice(0, 8);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function UserPicker({
  value,
  onChange,
  placeholder,
  maxSelect,
  presenceUsers: presenceUsersProp,
  idToken: idTokenProp,
  searchUsers,
  baseUrl,
}: UserPickerProps) {
  const presenceCtx = useOptionalPresenceContext();
  const identityCtx = useOptionalIdentityContext();
  const presenceUsers = presenceUsersProp ?? presenceCtx?.presenceUsers ?? [];
  const idToken = idTokenProp !== undefined ? idTokenProp : (identityCtx?.idToken ?? null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [remoteProfiles, setRemoteProfiles] = useState<ProfileSummary[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Build presence-sourced candidate list, deduped by userId and excluding
  // already-selected. This is the instant/local layer.
  const presenceCandidates = useMemo<Candidate[]>(() => {
    const seen = new Set<string>(value);
    const list: Candidate[] = [];
    for (const u of presenceUsers) {
      // The candidate id MUST be the stable Cognito sub, not the per-WS
      // clientId — a picked clientId is a UUID that stops resolving the
      // moment that tab reloads, and the same human showed up once per tab.
      const userId = (u.metadata.userId as string | undefined) ?? u.clientId;
      if (seen.has(userId)) continue;
      seen.add(userId);
      list.push({
        userId,
        displayName: extractDisplayName(u.metadata, userId),
      });
    }
    return list;
  }, [presenceUsers, value]);

  // Debounced server-side profile search (250ms). `searchUsers` (when given)
  // runs regardless of `idToken` — a host that provides its own search seam
  // owns its own auth. The default `fetch` still requires a non-null
  // `idToken` the way it always has. Presence results still show instantly
  // below while the network round-trip is in flight.
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setRemoteProfiles([]);
      return;
    }
    if (!searchUsers && !idToken) {
      setRemoteProfiles([]);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => {
      if (searchUsers) {
        Promise.resolve(searchUsers(trimmed, controller.signal))
          .then(profiles => setRemoteProfiles(Array.isArray(profiles) ? profiles : []))
          .catch(() => {
            // Network or abort — silently fall back to presence-only candidates.
          });
        return;
      }
      const resolvedBase = baseUrl ?? SOCIAL_API_URL;
      const url = `${resolvedBase}/api/profiles?q=${encodeURIComponent(trimmed)}&limit=20`;
      fetch(url, {
        headers: { Authorization: `Bearer ${idToken}` },
        signal: controller.signal,
      })
        .then(r => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
        .then((data: { profiles?: ProfileSummary[] }) => {
          setRemoteProfiles(Array.isArray(data.profiles) ? data.profiles : []);
        })
        .catch(() => {
          // Network or abort — silently fall back to presence-only candidates.
        });
    }, 250);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, idToken, searchUsers, baseUrl]);

  // Merge presence + remote candidates. Presence entries win on dedup because
  // they carry live metadata; remote entries fill in offline users.
  const candidates = useMemo<Candidate[]>(() => {
    const seen = new Set<string>(value);
    const list: Candidate[] = [];
    for (const c of presenceCandidates) {
      if (seen.has(c.userId)) continue;
      seen.add(c.userId);
      list.push(c);
    }
    for (const p of remoteProfiles) {
      if (seen.has(p.userId)) continue;
      seen.add(p.userId);
      list.push({
        userId: p.userId,
        displayName: p.displayName || p.userId.slice(0, 8),
      });
    }
    return list;
  }, [presenceCandidates, remoteProfiles, value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return candidates;
    return candidates.filter(c =>
      c.displayName.toLowerCase().includes(q) ||
      c.userId.toLowerCase().includes(q)
    );
  }, [candidates, query]);

  const atMax = typeof maxSelect === 'number' && value.length >= maxSelect;

  const addUser = (userId: string) => {
    const trimmed = userId.trim();
    if (!trimmed) return;
    if (value.includes(trimmed)) return;
    if (atMax) return;
    onChange([...value, trimmed]);
    setQuery('');
    setActiveIdx(0);
  };

  const removeUser = (userId: string) => {
    onChange(value.filter(v => v !== userId));
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActiveIdx(idx => Math.min(idx + 1, Math.max(filtered.length - 1, 0)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(idx => Math.max(idx - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const match = filtered[activeIdx];
      if (match) {
        addUser(match.userId);
      } else if (query.trim()) {
        // Fallback — accept raw input as userId.
        addUser(query.trim());
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'Backspace' && !query && value.length > 0) {
      // Remove trailing chip on backspace at empty input.
      removeUser(value[value.length - 1]);
    }
  };

  // Map selected userIds back to display names for chips. Checks presence
  // first (live metadata) then the last-seen remote search results, and
  // finally falls back to the raw userId.
  const chipLabel = (userId: string): string => {
    const match = presenceUsers.find(
      u => ((u.metadata.userId as string | undefined) ?? u.clientId) === userId,
    );
    if (match) return extractDisplayName(match.metadata, userId);
    const remote = remoteProfiles.find(p => p.userId === userId);
    if (remote && remote.displayName) return remote.displayName;
    return userId;
  };

  return (
    <div className="flex flex-col gap-1.5 font-[inherit]">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map(userId => (
            <span
              key={userId}
              className="inline-flex items-center gap-1 bg-primary-bg border border-primary-border text-primary-fg rounded-full py-0.5 pr-2 pl-2.5 text-[12px] font-medium"
            >
              {chipLabel(userId)}
              <button
                data-ui-part=""
                type="button"
                onClick={() => removeUser(userId)}
                aria-label={`Remove ${chipLabel(userId)}`
                }
                className="bg-transparent border-none text-primary-fg cursor-pointer text-[14px] leading-none px-0.5 py-0"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="relative">
        <input
          data-ui-part=""
          ref={inputRef}
          type="text"
          value={query}
          disabled={atMax}
          // Named from the same string the placeholder shows, because the
          // placeholder alone stops being the accessible name as soon as a
          // query is typed — which is exactly when the listbox opens.
          aria-label={atMax ? `Max ${maxSelect} selected` : (placeholder ?? 'Search users…')}
          placeholder={atMax ? `Max ${maxSelect} selected` : (placeholder ?? 'Search users…')}
          onChange={e => { setQuery(e.target.value); setOpen(true); setActiveIdx(0); }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            // Delay closing so option mousedowns still register.
            blurTimer.current = setTimeout(() => setOpen(false), 120);
          }}
          onKeyDown={handleKeyDown}
          className="w-full py-1.5 px-2.5 text-[13px] border border-border rounded-md font-[inherit] box-border outline-none"
        />
        {open && !atMax && filtered.length > 0 && (
          <div
            className="absolute top-full left-0 right-0 bg-surface border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] mt-1 max-h-[200px] overflow-y-auto z-10"
            onMouseDown={e => {
              // Prevent input blur from dismissing before click fires.
              e.preventDefault();
              if (blurTimer.current) clearTimeout(blurTimer.current);
            }}
          >
            {filtered.map((c, idx) => (
              <div
                key={c.userId}
                className={cn(
                  'py-1.5 px-2.5 text-[13px] text-text-primary cursor-pointer',
                  idx === activeIdx ? 'bg-surface-hover' : 'bg-transparent',
                )}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => { addUser(c.userId); inputRef.current?.focus(); }}
              >
                <span className="font-medium">{c.displayName}</span>
                {c.displayName !== c.userId && (
                  <span className="text-text-tertiary ml-2 text-[11px] font-mono">
                    {c.userId.slice(0, 12)}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPicker;
