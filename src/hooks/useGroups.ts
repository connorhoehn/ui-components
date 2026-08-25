// frontend/src/hooks/useGroups.ts
//
// Groups hook — list, create/delete/join/leave groups and manage members.
// All requests use Authorization: Bearer idToken against VITE_SOCIAL_API_URL.

import { useState, useCallback, useEffect, useRef } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GroupItem {
  groupId: string;
  name: string;
  description?: string;
  visibility: 'public' | 'private';
  ownerId: string;
  createdAt: string;
}

export interface MemberItem {
  groupId: string;
  userId: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
  displayName?: string;
  status?: string;
}

export interface UseGroupsOptions {
  idToken: string | null;
}

export interface UseGroupsReturn {
  groups: GroupItem[];
  /**
   * Re-run `GET /api/groups`. Called once on mount (and on every `idToken`
   * change); exposed so a failed load can be retried without a remount.
   */
  refresh: () => Promise<void>;
  /**
   * `false` until the first `GET /api/groups` has settled. Distinguishes
   * "the server says you have no groups" from "we have not asked yet" —
   * without it an empty `groups` array renders the same "No groups yet"
   * empty state in both cases.
   */
  loaded: boolean;
  /**
   * Failure of the list load specifically. Kept separate from `error`, which
   * is whatever the last create/join/invite/… attempt reported: a refused
   * invite must not blank out a list that loaded perfectly well.
   */
  loadError: string | null;
  createGroup: (name: string, description?: string, visibility?: 'public' | 'private') => Promise<void>;
  deleteGroup: (groupId: string) => Promise<void>;
  joinGroup: (groupId: string) => Promise<void>;
  leaveGroup: (groupId: string) => Promise<void>;
  inviteUser: (groupId: string, userId: string) => Promise<void>;
  acceptInvite: (groupId: string, accept: boolean) => Promise<void>;
  loadMembers: (groupId: string) => Promise<void>;
  members: MemberItem[];
  loading: boolean;
  error: string | null;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useGroups({ idToken }: UseGroupsOptions): UseGroupsReturn {
  const [groups, setGroups] = useState<GroupItem[]>([]);
  const [members, setMembers] = useState<MemberItem[]>([]);
  // Starts true whenever there is a token, because a fetch is guaranteed to be
  // issued by the mount effect below. Starting at `false` would paint one
  // frame of "No groups yet" before the request had even been made.
  const [loading, setLoading] = useState(() => Boolean(idToken));
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const baseUrl = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';

  const authHeaders = useCallback((): Record<string, string> => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${idToken}`,
  }), [idToken]);

  // ---- Hydrate: GET /api/groups --------------------------------------------
  //
  // This hook used to expose no list loader at all, so `groups` only ever held
  // what the current session had created. Nothing hydrated it, no host could
  // hydrate it, and GroupPanel's "No groups yet" empty state was therefore a
  // lie for every user who already had groups on the server.
  //
  // Two DIFFERENT concerns, deliberately not one shared boolean. `mountedRef`
  // answers "is this hook still mounted" and is shared across effect runs —
  // correct, because a re-run means we are still mounted. `requestIdRef`
  // answers "is this response still the one we want", and that question cannot
  // be answered by a flag each effect run resets: under StrictMode, and on
  // every `idToken` refresh, the cleanup marks the in-flight request cancelled
  // and the next run immediately un-cancels it, so whichever response landed
  // last won regardless of which was issued last. A monotonic id cannot be
  // resurrected — each call claims the next one and only the current holder
  // may write.
  const mountedRef = useRef(true);
  const requestIdRef = useRef(0);

  const refresh = useCallback(async (): Promise<void> => {
    if (!idToken) return;
    const token = ++requestIdRef.current;
    const current = () => mountedRef.current && token === requestIdRef.current;
    setLoading(true);
    setError(null);
    setLoadError(null);
    try {
      const res = await fetch(`${baseUrl}/api/groups`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) throw new Error(`Failed to load groups (${res.status})`);
      const data = await res.json() as { groups?: GroupItem[] };
      if (current()) setGroups(data.groups ?? []);
    } catch (err) {
      if (current()) {
        setError((err as Error).message);
        setLoadError((err as Error).message);
      }
    } finally {
      if (current()) {
        setLoading(false);
        setLoaded(true);
      }
    }
  }, [idToken, baseUrl]);

  useEffect(() => {
    mountedRef.current = true;
    void refresh();
    return () => {
      mountedRef.current = false;
      // Retire whatever is in flight so a superseded run can never write.
      requestIdRef.current += 1;
    };
  }, [refresh]);

  // ---- createGroup ---------------------------------------------------------

  const createGroup = useCallback(async (
    name: string,
    description?: string,
    visibility?: 'public' | 'private',
  ): Promise<void> => {
    if (!idToken) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/groups`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ name, description, visibility }),
      });
      if (!res.ok) throw new Error(`Failed to create group (${res.status})`);
      const group = await res.json() as GroupItem;
      setGroups((prev) => [group, ...prev]);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [idToken, baseUrl, authHeaders]);  

  // ---- deleteGroup (GRUP-02) -----------------------------------------------

  const deleteGroup = useCallback(async (groupId: string): Promise<void> => {
    if (!idToken) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/groups/${groupId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) throw new Error(`Failed to delete group (${res.status})`);
      setGroups((prev) => prev.filter((g) => g.groupId !== groupId));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken, baseUrl]);  

  // ---- joinGroup -----------------------------------------------------------

  const joinGroup = useCallback(async (groupId: string): Promise<void> => {
    if (!idToken) return;
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/groups/${groupId}/join`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) throw new Error(`Failed to join group (${res.status})`);
    } catch (err) {
      setError((err as Error).message);
    }
  }, [idToken, baseUrl]);  

  // ---- leaveGroup ----------------------------------------------------------

  const leaveGroup = useCallback(async (groupId: string): Promise<void> => {
    if (!idToken) return;
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/groups/${groupId}/leave`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) throw new Error(`Failed to leave group (${res.status})`);
      setGroups((prev) => prev.filter((g) => g.groupId !== groupId));
    } catch (err) {
      setError((err as Error).message);
    }
  }, [idToken, baseUrl]);  

  // ---- inviteUser ----------------------------------------------------------

  const inviteUser = useCallback(async (groupId: string, userId: string): Promise<void> => {
    if (!idToken) return;
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/groups/${groupId}/invite`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error(`Failed to invite user (${res.status})`);
    } catch (err) {
      setError((err as Error).message);
      // Rethrow, like createGroup does. This used to absorb the failure and
      // resolve normally, so every call site's `await inviteUser(...)` fell
      // through to clearing the user-id field and closing the invite form —
      // pixel-identical to a successful invite. Nothing rendered `error`, so
      // a rejected invite was completely invisible.
      throw err;
    }
  }, [idToken, baseUrl, authHeaders]);

  // ---- acceptInvite --------------------------------------------------------

  const acceptInvite = useCallback(async (groupId: string, accept: boolean): Promise<void> => {
    if (!idToken) return;
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/groups/${groupId}/accept`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ accept }),
      });
      if (!res.ok) throw new Error(`Failed to respond to invite (${res.status})`);
    } catch (err) {
      setError((err as Error).message);
    }
  }, [idToken, baseUrl, authHeaders]);  

  // ---- loadMembers ---------------------------------------------------------

  const loadMembers = useCallback(async (groupId: string): Promise<void> => {
    if (!idToken) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/groups/${groupId}/members`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) throw new Error(`Failed to load members (${res.status})`);
      const data = await res.json() as { members: MemberItem[] };
      setMembers(data.members ?? []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken, baseUrl]);  

  return {
    groups,
    refresh,
    loaded,
    loadError,
    createGroup,
    deleteGroup,
    joinGroup,
    leaveGroup,
    inviteUser,
    acceptInvite,
    loadMembers,
    members,
    loading,
    error,
  };
}
