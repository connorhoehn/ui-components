declare module 'reactflow' {
  export type HandleType = 'source' | 'target';
  export type Position = 'top' | 'bottom' | 'left' | 'right';
  export interface Connection {
    source: string | null;
    target: string | null;
    sourceHandle: string | null;
    targetHandle: string | null;
  }
  export interface Edge {
    id: string;
    source: string;
    target: string;
    sourceHandle?: string | null;
    targetHandle?: string | null;
    [key: string]: any;
  }
  export interface Node {
    id: string;
    type?: string;
    position: { x: number; y: number };
    data: any;
    [key: string]: any;
  }
  export function getConnectedEdges(edges: any[], nodes: any[]): any[];
}

declare module 'amazon-cognito-identity-js' {
  export class CognitoUserPool {
    constructor(data: { UserPoolId: string; ClientId: string });
    getCurrentUser(): CognitoUser | null;
    signUp(username: string, password: string, attributes: any[], validationData: any[], callback: (err: any, result: any) => void): void;
  }
  export class CognitoUser {
    constructor(data: { Username: string; Pool: CognitoUserPool });
    authenticateUser(details: AuthenticationDetails, callbacks: any): void;
    signOut(): void;
    getSession(callback: (err: any, session: any) => void): void;
    confirmRegistration(code: string, force: boolean, callback: (err: any, result: any) => void): void;
    forgotPassword(callbacks: any): void;
    confirmPassword(code: string, newPassword: string, callbacks: any): void;
    getUserAttributes(callback: (err: any, attributes: any) => void): void;
    refreshSession(token: CognitoRefreshToken, callback: (err: any, session: any) => void): void;
    getUsername(): string;
  }
  export class AuthenticationDetails {
    constructor(data: { Username: string; Password: string });
  }
  export class CognitoUserAttribute {
    constructor(data: { Name: string; Value: string });
  }
  export class CognitoRefreshToken {
    constructor(data: { RefreshToken: string });
  }
  export interface CognitoUserSession {
    getIdToken(): { getJwtToken(): string };
    getRefreshToken(): { getToken(): string };
    getAccessToken(): { getJwtToken(): string };
    isValid(): boolean;
  }
}

declare module 'amazon-ivs-web-broadcast' {
  const content: any;
  export default content;
  export interface StageStrategy {
    stageStreamsToPublish: () => LocalStageStream[];
    shouldPublishParticipant: (participant: any) => boolean;
    shouldSubscribeToParticipant: (participant: any) => any;
  }
  export class LocalStageStream {
    constructor(track: MediaStreamTrack);
    mediaStreamTrack: MediaStreamTrack;
    setMuted(muted: boolean): void;
  }
  export class Stage {
    constructor(token: string, strategy: StageStrategy);
    on(event: string, callback: (...args: any[]) => void): void;
    join(): Promise<void>;
    leave(): void;
    refreshStrategy(): void;
  }
  export const SubscribeType: any;
  export const StageEvents: any;
}

declare module '@schemas/pipeline.schema.json' {
  const schema: Record<string, unknown>;
  export default schema;
}
