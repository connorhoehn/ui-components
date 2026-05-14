// Amazon-IVS-specific video wiring. Pulls in `amazon-ivs-web-broadcast`
// transitively — kept on a dedicated subpath so consumers who only want
// the dumb components in `/video` aren't forced to install the SDK.
export * from './lib/video/useHangoutEmbed';
export type { HangoutParticipant } from './lib/video/types';
