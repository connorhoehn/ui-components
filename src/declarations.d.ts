

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
