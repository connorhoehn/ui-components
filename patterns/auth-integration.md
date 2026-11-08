# Auth Integration

The library requires authenticated user identity for collaborative features (presence, cursors, document attribution). You provide this via `<IdentityProvider>`, which accepts any auth backend — Cognito, Auth0, Firebase, or a simple static object for development.

## Prerequisites

- React 19+
- An authentication system that can provide: user ID, display name, and optionally email and JWT token

## The IdentityContextValue Interface

```tsx
interface IdentityContextValue {
  userId: string;
  displayName: string;
  userEmail: string | null;
  idToken: string | null;
  onSignOut: () => void;
}
```

All fields are required. Set `userEmail` and `idToken` to `null` if not applicable.

## Minimal Provider Setup

For development or static auth scenarios:

```tsx
import { IdentityProvider } from '@connorhoehn/ui-components';

function App({ children }: { children: React.ReactNode }) {
  const identity = {
    userId: 'user-123',
    displayName: 'Jane Doe',
    userEmail: 'jane@example.com',
    idToken: null,
    onSignOut: () => { window.location.href = '/login'; },
  };

  return (
    <IdentityProvider value={identity}>
      {children}
    </IdentityProvider>
  );
}
```

## Integrating with AWS Cognito

If your app uses Cognito, map the Cognito user attributes to `IdentityContextValue`:

```tsx
import { useEffect, useState } from 'react';
import { fetchAuthSession, getCurrentUser, signOut } from 'aws-amplify/auth';
import { IdentityProvider } from '@connorhoehn/ui-components';
import type { IdentityContextValue } from '@connorhoehn/ui-components';

function AuthenticatedApp({ children }: { children: React.ReactNode }) {
  const [identity, setIdentity] = useState<IdentityContextValue | null>(null);

  useEffect(() => {
    async function loadIdentity() {
      const user = await getCurrentUser();
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString() ?? null;

      setIdentity({
        userId: user.userId,
        displayName: user.signInDetails?.loginId ?? user.username,
        userEmail: session.tokens?.idToken?.payload?.email as string ?? null,
        idToken,
        onSignOut: () => signOut(),
      });
    }

    loadIdentity();
  }, []);

  if (!identity) return <div>Loading...</div>;

  return (
    <IdentityProvider value={identity}>
      {children}
    </IdentityProvider>
  );
}
```

## Integrating with Custom Auth

For any custom authentication system, construct the value from your auth state:

```tsx
import { useMemo } from 'react';
import { IdentityProvider } from '@connorhoehn/ui-components';
import { useAuth } from './your-auth-hook';

function AuthBridge({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  const identity = useMemo(() => ({
    userId: auth.user.id,
    displayName: auth.user.name,
    userEmail: auth.user.email ?? null,
    idToken: auth.accessToken ?? null,
    onSignOut: auth.logout,
  }), [auth]);

  return (
    <IdentityProvider value={identity}>
      {children}
    </IdentityProvider>
  );
}
```

## Consuming Identity in Components

Any component within the provider tree can access identity via the `useIdentityContext` hook:

```tsx
import { useIdentityContext } from '@connorhoehn/ui-components';

function UserGreeting() {
  const { displayName, userEmail } = useIdentityContext();

  return (
    <div>
      <p>Welcome, {displayName}</p>
      {userEmail && <p className="text-muted">{userEmail}</p>}
    </div>
  );
}
```

The hook throws if used outside of an `<IdentityProvider>`. This is intentional — it ensures components always have a valid identity context rather than silently rendering with undefined values.

## Token Refresh

If your auth tokens expire, update the `IdentityProvider` value with the new token. Since the provider accepts a value prop, re-rendering the parent with a fresh `idToken` propagates to all consumers:

```tsx
function AuthBridge({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Refresh token periodically
    const interval = setInterval(async () => {
      const newToken = await refreshToken();
      setToken(newToken);
    }, 5 * 60 * 1000); // every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const identity = useMemo(() => ({
    userId: 'user-123',
    displayName: 'Jane Doe',
    userEmail: 'jane@example.com',
    idToken: token,
    onSignOut: () => {},
  }), [token]);

  return (
    <IdentityProvider value={identity}>
      {children}
    </IdentityProvider>
  );
}
```

## Presence Context

For collaborative presence (showing who is online, typing indicators), there is also a `<PresenceProvider>`:

```tsx
import { PresenceProvider } from '@connorhoehn/ui-components';

interface PresenceContextValue {
  presenceUsers: PresenceUser[];
  currentClientId: string | null;
  setTyping: (isTyping: boolean) => void;
}
```

This is typically populated by the `usePresence` hook which subscribes to presence gateway messages. See the [WebSocket Provider](./websocket-provider.md) documentation for how message subscriptions work.
