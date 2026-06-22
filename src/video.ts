// Transport-agnostic video widgets + the pure-DOM useActiveSpeaker hook.
//
// IVS-specific wiring (useHangoutEmbed, which consumes the
// `amazon-ivs-web-broadcast` SDK) lives at the separate subpath
// `@connorhoehnslalom/ui-components/video-ivs` so consumers who only want the
// dumb components / WHEP integration aren't forced to install
// amazon-ivs-web-broadcast.
export * from './components/video';
export * from './lib/video/useActiveSpeaker';
