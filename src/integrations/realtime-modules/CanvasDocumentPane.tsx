// src/integrations/realtime-modules/CanvasDocumentPane.tsx
//
// The shared canvas-document assembly bound to the canonical
// `@connorhoehn/realtime-modules` hooks. An app installed under another scope
// imports `createCanvasDocumentPane` from `integrations/realtime` instead and
// passes its own `useGateway` / `useYjsDoc` / `useCanvasDocument`.

import { useCanvasDocument, useGateway, useYjsDoc } from '@connorhoehn/realtime-modules/client';
import { createCanvasDocumentPane, type CanvasDocumentPaneModules } from '../realtime/CanvasDocumentPane';

export const CanvasDocumentPane = createCanvasDocumentPane(
  // Cast: a linked realtime-modules checkout carries its own copy of yjs's
  // types, which TypeScript will not unify with this package's. The runtime
  // shapes are the structural ones `CanvasDocumentPaneModules` documents.
  { useGateway, useYjsDoc, useCanvasDocument } as unknown as CanvasDocumentPaneModules,
);
