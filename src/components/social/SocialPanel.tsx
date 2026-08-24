// frontend/src/components/SocialPanel.tsx
//
// Social Profile section card — all sub-components co-located as unexported internals.
// Only SocialPanel is exported. Connected to live social API hooks.

import { useState, useEffect } from 'react';
import { useSocialProfile } from '../../hooks/useSocialProfile';
import { useFriends } from '../../hooks/useFriends';
import type { ProfileItem, OnMessageFn } from '../../hooks/useSocialProfile';
import type { PublicProfile } from '../../hooks/useFriends';
import { cn } from '../../lib/cn';
import { handleRovingKeyDown } from '../../lib/rovingFocus';
import { Input } from '../forms/Input';
import { Textarea } from '../forms/Textarea';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Visibility = 'public' | 'private';
type FollowState = 'not-following' | 'following' | 'pending';

// Internal display shape (derived from live hook data for sub-components)
interface UserProfile {
  id: string;
  displayName: string;
  bio: string;
  avatarUrl: string | null;
  visibility: Visibility;
  followersCount?: number;
  followingCount?: number;
  friendsCount?: number;
  followState?: FollowState;
}

function publicProfileToUserProfile(p: PublicProfile, followState: FollowState): UserProfile {
  return {
    id: p.userId,
    displayName: p.displayName,
    bio: '',
    avatarUrl: p.avatarUrl ?? null,
    visibility: p.visibility,
    followState,
  };
}

function profileItemToUserProfile(p: ProfileItem): UserProfile {
  return {
    id: p.userId,
    displayName: p.displayName,
    bio: p.bio ?? '',
    avatarUrl: p.avatarUrl ?? null,
    visibility: p.visibility,
  };
}

// ---------------------------------------------------------------------------
// Avatar (internal)
// ---------------------------------------------------------------------------

function Avatar({ user, size }: { user: UserProfile; size: 32 | 48 }) {
  const initials = user.displayName.slice(0, 2).toUpperCase();
  if (user.avatarUrl) {
    return (
      <div
        className={cn(
          'rounded-full bg-border flex items-center justify-center font-semibold text-text-primary shrink-0 overflow-hidden',
          size === 48 ? 'w-12 h-12 text-base' : 'w-8 h-8 text-xs',
        )}
      >
        <img
          src={user.avatarUrl}
          alt={`${user.displayName}'s avatar`}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className={cn(
        'rounded-full bg-border flex items-center justify-center font-semibold text-text-primary shrink-0 overflow-hidden',
        size === 48 ? 'w-12 h-12 text-base' : 'w-8 h-8 text-xs',
      )}
      aria-label={`Avatar placeholder for ${user.displayName}`}
    >
      {initials}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FollowButton (internal)
// ---------------------------------------------------------------------------

interface FollowButtonProps {
  targetUser: UserProfile;
  followState: FollowState;
  compact?: boolean;
  onFollowChange: (userId: string, newState: FollowState) => void | Promise<void>;
}

function FollowButton({ targetUser, followState, compact = false, onFollowChange }: FollowButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleFollow = () => {
    void onFollowChange(targetUser.id, 'pending');
  };

  const handleUnfollowClick = () => setShowConfirm(true);
  const handleKeepFollowing = () => setShowConfirm(false);
  const handleConfirmUnfollow = () => {
    setShowConfirm(false);
    void onFollowChange(targetUser.id, 'not-following');
  };

  if (followState === 'not-following') {
    return (
      <button
        className={cn('rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border-none font-[system-ui,-apple-system,sans-serif] bg-primary text-white font-semibold', compact ? 'h-7' : 'h-9')}
        onClick={handleFollow}
        aria-label={`Follow ${targetUser.displayName}`}
      >
        Follow
      </button>
    );
  }

  if (followState === 'pending') {
    return (
      <button
        className={cn('rounded-lg text-sm min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface-hover text-text-secondary font-normal cursor-default', compact ? 'h-7' : 'h-9')}
        disabled
        aria-label={`Follow ${targetUser.displayName}`}
      >
        Following…
      </button>
    );
  }

  // following state
  return (
    <div className="flex flex-col gap-1">
      <button
        className={cn('rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface text-text-primary font-normal', compact ? 'h-7' : 'h-9')}
        onClick={handleUnfollowClick}
        aria-label={`Unfollow ${targetUser.displayName}`}
      >
        Following
      </button>
      {showConfirm && (
        <div role="group" aria-label="Confirm unfollow" className="flex gap-2 items-center">
          <span className="text-sm text-text-primary mr-1">
            Unfollow {targetUser.displayName}?
          </span>
          <button
            onClick={handleKeepFollowing}
            className="h-9 rounded-lg text-sm px-3 bg-surface text-text-primary border border-border cursor-pointer font-[system-ui,-apple-system,sans-serif]"
          >
            Keep Following
          </button>
          <button
            onClick={handleConfirmUnfollow}
            className="h-9 rounded-lg text-sm px-3 bg-danger text-white border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]"
          >
            Unfollow
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ProfileCard (internal)
// ---------------------------------------------------------------------------

interface ProfileCardProps {
  user: UserProfile;
  isOwnProfile: boolean;
  onSave: (updates: Partial<ProfileItem>) => Promise<void>;
}

function ProfileCard({ user, isOwnProfile, onSave }: ProfileCardProps) {
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl ?? '');
  const [visibility, setVisibility] = useState<Visibility>(user.visibility);
  const [saving, setSaving] = useState(false);

  // Reset the form when a DIFFERENT user is shown — keyed on `user.id`, not
  // on the object identity.
  //
  // This used to depend on `[user]`. `publicProfileToUserProfile` builds a
  // fresh object on every call, so the effect fired on essentially every
  // parent render and overwrote all four fields with the server's values —
  // wiping whatever the user had typed, mid-edit, with no warning. Keying on
  // the id preserves the intent (switching profiles resets the form) while
  // leaving an in-progress edit alone.
  useEffect(() => {
    setDisplayName(user.displayName);
    setBio(user.bio);
    setAvatarUrl(user.avatarUrl ?? '');
    setVisibility(user.visibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- see above: keying
    // on the profile identity is the point; re-syncing on every new object
    // identity is the bug this replaced.
  }, [user.id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({ displayName, bio, avatarUrl: avatarUrl || undefined, visibility });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  if (editing) {
    return (
      <div>
        <div className="mb-3">
          <label className="text-sm text-text-primary block mb-1">Display name</label>
          <Input
            value={displayName}
            onChange={e => setDisplayName(e.target.value.slice(0, 50))}
            placeholder="Your name"
            maxLength={50}
          />
        </div>
        <div className="mb-3">
          <label className="text-sm text-text-primary block mb-1">Bio</label>
          <Textarea
            value={bio}
            onChange={e => setBio(e.target.value.slice(0, 160))}
            placeholder="Tell people a bit about yourself (max 160 characters)"
            maxLength={160}
            rows={3}
            className="resize-y"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-text-primary block mb-1">Avatar URL</label>
          <Input
            value={avatarUrl}
            onChange={e => setAvatarUrl(e.target.value)}
            placeholder="https://example.com/avatar.png"
          />
        </div>
        <div className="mb-4">
          <div
            role="radiogroup"
            aria-label="Profile visibility"
            onKeyDown={(e) => handleRovingKeyDown(e, { itemSelector: '[role="radio"]' })}
            className="flex gap-2"
          >
            {(['public', 'private'] as Visibility[]).map(v => (
              <button
                key={v}
                type="button"
                role="radio"
                aria-checked={visibility === v}
                // radiogroup semantics: one Tab stop, arrows move between
                // the options.
                tabIndex={visibility === v ? 0 : -1}
                onClick={() => setVisibility(v)}
                className={cn(
                  'px-4 py-1 rounded-full text-sm cursor-pointer border border-border font-[system-ui,-apple-system,sans-serif]',
                  visibility === v ? 'bg-primary text-white' : 'bg-surface text-text-primary',
                )}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { void handleSave(); }}
            disabled={saving}
            className={cn('flex-1 h-9 bg-primary text-white border-none rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]', saving ? 'cursor-default' : 'cursor-pointer')}
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          <button
            onClick={() => setEditing(false)}
            className="text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]"
          >
            Discard Changes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-start gap-3 mb-3">
        <Avatar user={user} size={48} />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-semibold text-text-primary">{user.displayName}</span>
            <span className={cn(
              'text-xs px-2 py-0.5 rounded',
              user.visibility === 'public' ? 'bg-success-bg text-success' : 'bg-surface-hover text-text-secondary',
            )}>
              {user.visibility === 'public' ? 'Public' : 'Private'}
            </span>
          </div>
          <p className="text-base text-text-primary m-0 overflow-hidden line-clamp-3">
            {user.bio}
          </p>
        </div>
      </div>
      <div className="flex gap-4 text-sm text-text-secondary mb-3">
        <span><strong className="text-text-primary">{user.followersCount ?? 0}</strong> Followers</span>
        <span><strong className="text-text-primary">{user.followingCount ?? 0}</strong> Following</span>
        <span><strong className="text-text-primary">{user.friendsCount ?? 0}</strong> Friends</span>
      </div>
      {isOwnProfile && (
        <button
          onClick={() => setEditing(true)}
          className="text-sm text-primary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]"
        >
          Edit profile
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SocialGraphPanel (internal)
// ---------------------------------------------------------------------------

type TabKey = 'followers' | 'following' | 'friends';

interface SocialGraphPanelProps {
  followers: UserProfile[];
  following: UserProfile[];
  friends: UserProfile[];
  followStates: Record<string, FollowState>;
  onFollowChange: (userId: string, newState: FollowState) => void | Promise<void>;
}

function SocialGraphPanel({ followers, following, friends, followStates, onFollowChange }: SocialGraphPanelProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('followers');

  const tabs: { key: TabKey; label: string; users: UserProfile[] }[] = [
    { key: 'followers', label: `Followers (${followers.length})`, users: followers },
    { key: 'following', label: `Following (${following.length})`, users: following },
    { key: 'friends', label: `Friends (${friends.length})`, users: friends },
  ];

  const emptyStates: Record<TabKey, { heading: string; body: string }> = {
    followers: { heading: 'No followers yet', body: "When someone follows you, they'll appear here." },
    following: { heading: 'Not following anyone yet', body: 'Find people to follow from the profile list above.' },
    friends: { heading: 'No mutual friends yet', body: 'Mutual follows become friends. Start by following someone.' },
  };

  const activeUsers = tabs.find(t => t.key === activeTab)?.users ?? [];

  return (
    <div className="mt-4">
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Connections"
        onKeyDown={handleRovingKeyDown}
        className="flex border-b border-border mb-3"
      >
        {tabs.map(tab => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            id={`social-tab-${tab.key}`}
            aria-controls="social-tabpanel"
            aria-selected={activeTab === tab.key}
            // Roving tabindex: the tablist is one Tab stop, arrows move
            // between Followers / Following / Friends.
            tabIndex={activeTab === tab.key ? 0 : -1}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'px-4 py-2 text-sm font-normal bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif] -mb-px',
              activeTab === tab.key
                ? 'text-text-primary border-b-2 border-b-primary'
                : 'text-text-secondary border-b-2 border-b-transparent',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div
        role="tabpanel"
        id="social-tabpanel"
        // Labelled BY the selected tab rather than by a duplicate raw key
        // string, so the panel and its trigger announce the same name.
        aria-labelledby={`social-tab-${activeTab}`}
        className="min-h-[120px]"
      >
        {activeUsers.length === 0 ? (
          <div className="py-6 text-center">
            <div className="text-sm font-semibold text-text-primary mb-1">
              {emptyStates[activeTab].heading}
            </div>
            <div className="text-sm text-text-tertiary">
              {emptyStates[activeTab].body}
            </div>
          </div>
        ) : (
          <div>
            {activeUsers.map(user => (
              <div
                key={user.id}
                className="flex items-center gap-2 h-14 border-b border-surface-hover"
              >
                <Avatar user={user} size={32} />
                <div className="flex-1">
                  <div className="text-base text-text-primary">{user.displayName}</div>
                  <div className="text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap max-w-[240px]">
                    {user.visibility === 'private' ? (
                      <em className="text-text-tertiary">This profile is private.</em>
                    ) : user.bio}
                  </div>
                </div>
                <FollowButton
                  targetUser={user}
                  followState={followStates[user.id] ?? 'not-following'}
                  compact
                  onFollowChange={onFollowChange}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SocialPanel (exported)
// ---------------------------------------------------------------------------

export function SocialPanel({ idToken, onMessage }: { idToken: string | null; onMessage: OnMessageFn }) {
  const { profile, loading: profileLoading, updateProfile } = useSocialProfile({ idToken });
  // `error` was previously dropped on the floor, so a failed social-graph load
  // rendered as empty Followers/Following/Friends tabs with nothing to explain
  // them. Surface it in the banner this panel already has.
  const { followers, following, friends, follow, unfollow, error: graphError } = useFriends({ idToken });

  // Derive follow states from live following array
  const followingIds = new Set(following.map(u => u.userId));
  const followStates: Record<string, FollowState> = {};
  [...followers, ...following, ...friends].forEach(u => {
    followStates[u.userId] = followingIds.has(u.userId) ? 'following' : 'not-following';
  });

  const [formError, setFormError] = useState<string | null>(null);

  const handleFollowChange = async (userId: string, newState: FollowState) => {
    setFormError(null);
    try {
      if (newState === 'following' || newState === 'pending') {
        await follow(userId);
      } else {
        await unfollow(userId);
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Follow action failed');
    }
  };

  const followersProfiles = followers.map(u => publicProfileToUserProfile(u, followStates[u.userId] ?? 'not-following'));
  const followingProfiles = following.map(u => publicProfileToUserProfile(u, 'following'));
  const friendsProfiles = friends.map(u => publicProfileToUserProfile(u, 'following'));

  const currentUserProfile: UserProfile | null = profile ? {
    ...profileItemToUserProfile(profile),
    followersCount: followers.length,
    followingCount: following.length,
    friendsCount: friends.length,
  } : null;

  // Suppress unused warning for onMessage — it's accepted as a prop for symmetry
  // with GroupPanel / RoomList but SocialPanel itself does not subscribe to WS events.
  void onMessage;

  return (
    <div className="bg-surface border border-border rounded-lg p-5">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3">Social Profile</h2>
      {profileLoading && !currentUserProfile ? (
        <div className="py-10 text-center text-text-tertiary text-sm">
          Loading profile…
        </div>
      ) : currentUserProfile ? (
        <>
          <ProfileCard
            user={currentUserProfile}
            isOwnProfile={true}
            onSave={updateProfile}
          />
          <SocialGraphPanel
            followers={followersProfiles}
            following={followingProfiles}
            friends={friendsProfiles}
            followStates={followStates}
            onFollowChange={handleFollowChange}
          />
        </>
      ) : null}
      {(formError ?? graphError) && (
        <div role="alert" data-testid="social-panel-error" className="text-danger text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]">
          {formError ?? graphError}
        </div>
      )}
    </div>
  );
}
