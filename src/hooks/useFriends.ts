// frontend/src/hooks/useFriends.ts
//
// Social graph hook — followers, following, friends lists with follow/unfollow.
// All requests use Authorization: Bearer idToken against VITE_SOCIAL_API_URL.

import { useState, useEffect, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PublicProfile {
  userId: string;
  displayName: string;
  avatarUrl?: string;
  visibility: 'public' | 'private';
}

export interface UseFriendsOptions {
  idToken: string | null;
}

export interface UseFriendsReturn {
  followers: PublicProfile[];
  following: PublicProfile[];
  friends: PublicProfile[];
  follow: (userId: string) => Promise<void>;
  unfollow: (userId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  /**
   * Failure of the three list loads specifically. Kept separate from `error`,
   * which is whatever the last follow/unfollow reported.
   *
   * A caller cannot use `error` to decide between "you follow nobody" and "we
   * never managed to read your graph": a refused *follow* also sets `error`,
   * so keying an error state off it made a rejected button click claim the
   * whole graph had failed to load. Only `loadError` means the lists below are
   * empty because we do not know, not because they are empty.
   */
  loadError: string | null;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useFriends({ idToken }: UseFriendsOptions): UseFriendsReturn {
  const [followers, setFollowers] = useState<PublicProfile[]>([]);
  const [following, setFollowing] = useState<PublicProfile[]>([]);
  const [friends, setFriends] = useState<PublicProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const baseUrl = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';

  // ---- On mount: fetch all three lists in parallel -------------------------

  useEffect(() => {
    if (!idToken || !baseUrl) return;

    setLoading(true);
    setError(null);
    setLoadError(null);

    const headers = { Authorization: `Bearer ${idToken}` };

    // `res.ok` MUST be checked before parsing. Without it a 401/500 whose body
    // still parses as JSON produced `{ followers: undefined }` → `?? []`, so an
    // auth or backend failure rendered as "you follow nobody" in SocialPanel's
    // tabs and as an empty friend list in RoomList's DM picker — with `error`
    // null, so no banner and no retry were offered.
    const getList = async (path: string): Promise<unknown> => {
      const r = await fetch(`${baseUrl}${path}`, { headers });
      if (!r.ok) throw new Error(`Failed to load ${path.split('/').pop()} (${r.status})`);
      return r.json();
    };

    Promise.all([
      getList('/api/social/followers'),
      getList('/api/social/following'),
      getList('/api/social/friends'),
    ])
      .then(([followersRes, followingRes, friendsRes]) => {
        setFollowers((followersRes as { followers: PublicProfile[] }).followers ?? []);
        setFollowing((followingRes as { following: PublicProfile[] }).following ?? []);
        setFriends((friendsRes as { friends: PublicProfile[] }).friends ?? []);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoadError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [idToken, baseUrl]);  

  // ---- Refresh following list helper ---------------------------------------

  const refreshFollowing = useCallback(async (): Promise<void> => {
    if (!idToken) return;
    const res = await fetch(`${baseUrl}/api/social/following`, {
      headers: { Authorization: `Bearer ${idToken}` },
    });
    // Throw rather than no-op: a swallowed refresh left the Follow button
    // unchanged after a successful follow, which looks exactly like the click
    // never registered. The caller turns this into a visible message.
    if (!res.ok) throw new Error(`Failed to refresh following (${res.status})`);
    const data = await res.json() as { following: PublicProfile[] };
    setFollowing(data.following ?? []);
  }, [idToken, baseUrl]);

  // ---- follow --------------------------------------------------------------

  const follow = useCallback(async (userId: string): Promise<void> => {
    if (!idToken) return;
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/social/follow/${userId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) throw new Error(`Failed to follow (${res.status})`);
      await refreshFollowing();
    } catch (err) {
      setError((err as Error).message);
      throw err;
    }
  }, [idToken, baseUrl, refreshFollowing]);  

  // ---- unfollow ------------------------------------------------------------

  const unfollow = useCallback(async (userId: string): Promise<void> => {
    if (!idToken) return;
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/social/follow/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) throw new Error(`Failed to unfollow (${res.status})`);
      await refreshFollowing();
    } catch (err) {
      setError((err as Error).message);
      throw err;
    }
  }, [idToken, baseUrl, refreshFollowing]);  

  return { followers, following, friends, follow, unfollow, loading, error, loadError };
}
