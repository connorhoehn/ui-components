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
