// The demo's shell backend.
//
// The simulator itself lives in the library, next to the fixtures, because
// `ComputerLab.stories.tsx` needs it too and a story reaching into the demo
// app would invert the dependency. This file is the demo-facing name for it,
// so the wiring below reads as "the demo installs a mock shell" rather than
// "the demo imports a fixture".

export {
  installMockShellSocket,
  mockShellUrl,
  MOCK_SHELL_SCHEME,
  type MockShellOptions,
} from '../../../../src/components/compute';
