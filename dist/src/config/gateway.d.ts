import type { GatewayConfig } from '../types/gateway';
/**
 * Read gateway connection config from Vite env vars.
 * Throws a descriptive error if required vars are missing so developers
 * get an actionable message instead of a silent connection failure.
 *
 * VITE_COGNITO_TOKEN is optional — when using the in-app login form (the
 * default), cognitoToken is supplied at runtime via useAuth.idToken and
 * callers spread it over this config. The env var remains for legacy
 * local-dev token bypass only.
 */
export declare function getGatewayConfig(): GatewayConfig;
//# sourceMappingURL=gateway.d.ts.map