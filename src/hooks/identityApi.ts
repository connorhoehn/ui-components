// Shared helper for authenticated fetch calls to the Identity API.

const BASE_URL = (import.meta.env as Record<string, string>).VITE_IDENTITY_API_URL ?? '';

export { BASE_URL };

export async function apiFetch<T>(
  path: string,
  idToken: string | null,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || res.statusText);
  }
  return res.json();
}
