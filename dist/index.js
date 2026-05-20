import { DOCUMENT_TYPE_ICONS as Q, getPageConfig as z, getPagesView as G, makeEmptyField as H } from "./types.js";
import { C as Y, i as q } from "./fieldType-BJfRz7mO.js";
import { B as J, a as Z, u as ee, b as se, c as ae, d as re, e as te, f as oe, g as ie, h as ne, i as ue, j as de, k as ce, l as pe, m as fe, n as xe, o as ge, p as me, q as le, r as be, s as ye, t as he, v as Se, w as Le, x as Ce, y as we, z as Te, A as Pe, C as ve, D as Ie, E as ke } from "./useWebSocket-xoTVPcp0.js";
import { u as De, a as Ee, b as Re, c as Ae, d as Fe, e as Oe, f as Xe, g as je, h as $e, i as Be, j as Ve, k as _e, l as Ne, m as Ue, n as Qe, o as ze } from "./useVideoSessions-hr67KvHn.js";
import { u as He, a as Ke, b as Ye, c as qe, d as We, e as Je } from "./useSocialProfile-D-SUgbn2.js";
import { u as es, a as ss, b as as, c as rs, d as ts, e as os, f as is, g as ns, h as us, i as ds } from "./useSyncConflicts-DruS2duy.js";
import { u as ps } from "./useDocumentTypes-C29MkgPl.js";
import { T as xs, u as gs, a as ms } from "./ToastProvider-aHBNxMTO.js";
import { W as bs, u as ys } from "./WebSocketContext-DPGFyPeZ.js";
import { I as Ss, u as Ls } from "./IdentityContext-CLalsm_M.js";
import { C as ws, D as Ts, I as Ps, P as vs, T as Is, u as ks } from "./TagEditor-CuaVtW7o.js";
import { C as Ds, u as Es } from "./ThemeContext-Bi6AQuIL.js";
import { C as As, a as Fs, b as Os, F as Xs, S as js, u as $s } from "./Switch-C8FGRY3F.js";
import { B as Vs, a as _s, C as Ns } from "./ConfirmDialog-C1XfACNk.js";
import { C as Qs, P as zs, T as Gs, a as Hs, b as Ks, c as Ys, d as qs, e as Ws } from "./PageSection-B_nBFSjK.js";
import { B as Zs, L as ea, S as sa } from "./Chart-ByoxeiYX.js";
import { C as ra } from "./Chip-BXdhqVFm.js";
import { E as oa } from "./EmptyState-C3KCJ6Ae.js";
import { S as na, e as ua, g as da, a as ca } from "./Sparkline-B8POanAQ.js";
import { jsx as f } from "react/jsx-runtime";
import "clsx";
import "tailwind-merge";
import { M as fa } from "./Modal-2jg4229_.js";
import { S as ga } from "./SkeletonCard-C89GWQ3p.js";
import { createContext as x, useMemo as g, useEffect as m, useContext as l } from "react";
import { P as la, a as ba, b as ya, f as ha, g as Sa, c as La, l as Ca, r as wa, d as Ta, e as Pa, s as va } from "./pipelineAudit-HIi3aStK.js";
import "./index-BhrGxmJW.js";
import { g as ka, a as Ma, b as Da, l as Ea, r as Ra, c as Aa } from "./registry-BZU57zws.js";
function n(s) {
  return `--ui-${s.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
}
function b(s) {
  const a = {};
  for (const r of Object.keys(s))
    a[n(r)] = s[r];
  return a;
}
function M(s) {
  const a = b(s);
  return `:root {
${Object.entries(a).map(([t, o]) => `  ${t}: ${o};`).join(`
`)}
}`;
}
function e(s) {
  return `var(${n(s)})`;
}
const y = {
  primary: "#3b82f6",
  primaryDark: "#1d4ed8",
  primaryLight: "#93c5fd",
  danger: "#dc2626",
  dangerLight: "#fca5a5",
  success: "#10b981",
  successLight: "#6ee7b7",
  warning: "#f59e0b",
  warningLight: "#fcd34d",
  info: "#0ea5e9",
  infoLight: "#7dd3fc",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  textMuted: "#94a3b8",
  textInverse: "#ffffff",
  border: "#e2e8f0",
  borderLight: "#f1f5f9",
  background: "#f8fafc",
  surface: "#ffffff",
  surfaceRaised: "#ffffff",
  surfaceOverlay: "rgba(15, 23, 42, 0.5)"
}, h = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 }, S = { xs: 11, sm: 13, md: 14, lg: 16, xl: 22 }, L = { sm: 4, md: 6, lg: 8, xl: 12, full: 9999 }, D = {
  colors: y,
  spacing: h,
  fontSize: S,
  borderRadius: L
}, E = {
  primary: e("primary"),
  primaryDark: e("primaryDark"),
  primaryLight: e("primaryLight"),
  danger: e("danger"),
  dangerLight: e("dangerLight"),
  success: e("success"),
  successLight: e("successLight"),
  warning: e("warning"),
  warningLight: e("warningLight"),
  info: e("info"),
  infoLight: e("infoLight"),
  textPrimary: e("textPrimary"),
  textSecondary: e("textSecondary"),
  textMuted: e("textMuted"),
  textInverse: e("textInverse"),
  border: e("border"),
  borderLight: e("borderLight"),
  background: e("background"),
  surface: e("surface"),
  surfaceRaised: e("surfaceRaised"),
  surfaceOverlay: e("surfaceOverlay")
}, R = {
  xs: e("spaceXs"),
  sm: e("spaceSm"),
  md: e("spaceMd"),
  lg: e("spaceLg"),
  xl: e("spaceXl")
}, A = {
  xs: e("fontXs"),
  sm: e("fontSm"),
  md: e("fontMd"),
  lg: e("fontLg"),
  xl: e("fontXl")
}, F = {
  sm: e("radiusSm"),
  md: e("radiusMd"),
  lg: e("radiusLg"),
  xl: e("radiusXl"),
  full: e("radiusFull")
}, c = {
  // Colors
  primary: "#3b82f6",
  primaryDark: "#1d4ed8",
  primaryLight: "#93c5fd",
  danger: "#dc2626",
  dangerLight: "#fca5a5",
  success: "#10b981",
  successLight: "#6ee7b7",
  warning: "#f59e0b",
  warningLight: "#fcd34d",
  info: "#0ea5e9",
  infoLight: "#7dd3fc",
  // Text
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  textMuted: "#94a3b8",
  textInverse: "#ffffff",
  // Surfaces
  background: "#f8fafc",
  surface: "#ffffff",
  surfaceRaised: "#ffffff",
  surfaceOverlay: "rgba(15, 23, 42, 0.5)",
  border: "#e2e8f0",
  borderLight: "#f1f5f9",
  // Spacing
  spaceXs: "4px",
  spaceSm: "8px",
  spaceMd: "16px",
  spaceLg: "24px",
  spaceXl: "32px",
  // Font sizes
  fontXs: "11px",
  fontSm: "13px",
  fontMd: "14px",
  fontLg: "16px",
  fontXl: "22px",
  // Border radius
  radiusSm: "4px",
  radiusMd: "6px",
  radiusLg: "8px",
  radiusXl: "12px",
  radiusFull: "9999px",
  // Shadows
  shadowSm: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
  shadowMd: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
  shadowLg: "0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)",
  shadowXl: "0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04)"
}, C = {
  // Colors
  primary: "#60a5fa",
  primaryDark: "#3b82f6",
  primaryLight: "#1e40af",
  danger: "#f87171",
  dangerLight: "#7f1d1d",
  success: "#34d399",
  successLight: "#064e3b",
  warning: "#fbbf24",
  warningLight: "#78350f",
  info: "#38bdf8",
  infoLight: "#0c4a6e",
  // Text
  textPrimary: "#f1f5f9",
  textSecondary: "#cbd5e1",
  textMuted: "#64748b",
  textInverse: "#0f172a",
  // Surfaces
  background: "#0f172a",
  surface: "#1e293b",
  surfaceRaised: "#334155",
  surfaceOverlay: "rgba(0, 0, 0, 0.6)",
  border: "#334155",
  borderLight: "#1e293b",
  // Spacing (unchanged)
  spaceXs: "4px",
  spaceSm: "8px",
  spaceMd: "16px",
  spaceLg: "24px",
  spaceXl: "32px",
  // Font sizes (unchanged)
  fontXs: "11px",
  fontSm: "13px",
  fontMd: "14px",
  fontLg: "16px",
  fontXl: "22px",
  // Border radius (unchanged)
  radiusSm: "4px",
  radiusMd: "6px",
  radiusLg: "8px",
  radiusXl: "12px",
  radiusFull: "9999px",
  // Shadows — softer, using darker/more opaque values for dark backgrounds
  shadowSm: "0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)",
  shadowMd: "0 4px 6px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.15)",
  shadowLg: "0 10px 15px rgba(0,0,0,0.3), 0 4px 6px rgba(0,0,0,0.15)",
  shadowXl: "0 20px 25px rgba(0,0,0,0.4), 0 10px 10px rgba(0,0,0,0.2)"
}, p = x(c);
function O({ children: s, preset: a = "light", theme: r }) {
  const t = a === "dark" ? C : c, o = g(
    () => ({ ...t, ...r }),
    [t, r]
  );
  return m(() => {
    const u = document.documentElement, d = Object.keys(o);
    for (const i of d)
      u.style.setProperty(n(i), o[i]);
    return () => {
      for (const i of d)
        u.style.removeProperty(n(i));
    };
  }, [o]), /* @__PURE__ */ f(p.Provider, { value: o, children: s });
}
function w() {
  return l(p);
}
function X() {
  return w();
}
const j = {
  /** Subtle shadow for cards, panels */
  sm: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
  /** Medium shadow for dropdowns, popovers */
  md: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
  /** Strong shadow for modals, dialogs */
  lg: "0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)",
  /** Extra strong shadow for elevated modals */
  xl: "0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04)"
}, $ = {
  /** Sticky headers, fixed toolbars */
  sticky: 20,
  /** Dropdowns, popovers, tooltips */
  dropdown: 50,
  /** Modals, dialogs, overlays */
  modal: 100,
  /** Toast notifications (above modals) */
  toast: 200
};
async function B(s) {
  const a = new URLSearchParams();
  s?.limit && a.set("limit", String(s.limit)), s?.cursor && a.set("cursor", s.cursor), s?.errorKind && a.set("errorKind", s.errorKind), s?.sinceMs && a.set("sinceMs", String(s.sinceMs));
  const r = `/api/pipelines/dlq${a.toString() ? `?${a}` : ""}`, t = await fetch(r, {
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  });
  if (t.status === 503)
    return { items: [] };
  if (!t.ok) {
    const o = await t.text();
    throw new Error(`Failed to fetch DLQ: ${t.status} ${o}`);
  }
  return t.json();
}
async function V(s, a) {
  const r = await fetch("/api/pipelines/dlq/redrive", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      ids: s,
      ...a?.resetAttempts ? { resetAttempts: !0 } : {},
      ...a?.preview ? { preview: !0 } : {}
    })
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`Redrive failed: ${r.status} ${t}`);
  }
  return r.json();
}
async function _(s, a) {
  const r = await fetch("/api/pipelines/dlq/purge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      ids: s,
      ...a?.preview ? { preview: !0 } : {}
    })
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`Purge failed: ${r.status} ${t}`);
  }
  return r.json();
}
export {
  Vs as Banner,
  Zs as BarChart,
  _s as Button,
  Y as CUSTOM_FIELD_TYPE_STORAGE_KEY,
  Qs as Card,
  ra as Chip,
  ws as CodeEditor,
  Ds as ColorSchemeProvider,
  As as CommandPalette,
  Fs as CommandPaletteHint,
  Os as CommandPaletteProvider,
  Ns as ConfirmDialog,
  Ts as DEFAULT_PIPELINE_ICONS,
  Q as DOCUMENT_TYPE_ICONS,
  oa as EmptyState,
  Xs as FormField,
  J as IDENTITY_BASE_URL,
  Ps as IconButton,
  Ss as IdentityProvider,
  ea as LineChart,
  fa as Modal,
  zs as PageSection,
  la as PatchHttpError,
  ba as PatchValidationRejectedError,
  vs as PresenceProvider,
  ga as SkeletonCard,
  na as Sparkline,
  sa as StackedAreaChart,
  js as Switch,
  Gs as Table,
  Hs as TableBody,
  Ks as TableHead,
  Ys as TableRow,
  qs as TableTd,
  Ws as TableTh,
  Is as TagEditor,
  O as ThemeProvider,
  xs as ToastProvider,
  bs as WebSocketProvider,
  ya as applyPatch,
  F as borderRadius,
  E as colors,
  e as cssVar,
  C as darkTheme,
  ua as eventGlyphs,
  A as fontSize,
  ha as forceFail,
  da as getEventCategory,
  ca as getEventGlyph,
  ka as getFieldType,
  Ma as getFieldTypes,
  z as getPageConfig,
  G as getPagesView,
  Sa as getPipelineRun,
  Da as getRenderer,
  La as getRunAuditLog,
  Z as identityApiFetch,
  M as injectThemeVars,
  q as isValidCustomFieldType,
  c as lightTheme,
  B as listDLQEntries,
  Ca as listPipelineRuns,
  Ea as listRegisteredRenderers,
  H as makeEmptyField,
  _ as purgeDLQEntries,
  L as rawBorderRadius,
  y as rawColors,
  S as rawFontSize,
  h as rawSpacing,
  D as rawTokens,
  V as redriveDLQEntries,
  Ra as registerFieldType,
  Aa as registerRenderer,
  wa as resumeFromStep,
  Ta as retryFromNode,
  Pa as revertPatch,
  va as searchAudit,
  j as shadows,
  R as spacing,
  b as themeToCssVars,
  n as tokenToCssVarName,
  ee as useActivityBus,
  se as useApiCall,
  ae as useApiHealth,
  re as useAuth,
  De as useAwareness,
  Ee as useAwarenessState,
  te as useCRDT,
  oe as useChat,
  ie as useClickOutside,
  Re as useCollaborativeDoc,
  Es as useColorScheme,
  $s as useCommandPalette,
  He as useComments,
  ne as useCursors,
  ue as useCustomFieldTypes,
  es as useDocTypeProposals,
  Ae as useDocumentComments,
  Fe as useDocumentExport,
  Oe as useDocumentItems,
  Xe as useDocumentMetadata,
  je as useDocumentReviews,
  ps as useDocumentTypes,
  de as useDocuments,
  Ke as useFriends,
  Ye as useGroups,
  ce as useIdentityAdmin,
  pe as useIdentityAudit,
  fe as useIdentityClients,
  Ls as useIdentityContext,
  xe as useIdentityDiagnostics,
  ge as useIdentityEmailTemplates,
  me as useIdentityGroups,
  le as useIdentityMfa,
  be as useIdentityMfaAdmin,
  ye as useIdentityPools,
  he as useIdentityResource,
  Se as useIdentitySetupStatus,
  Le as useIdentityUsers,
  $e as useIdleDetector,
  ss as useIngestAudit,
  as as useIngestDLQ,
  rs as useIngestItems,
  ts as useIngestProgress,
  os as useIngestSources,
  Ce as useKeyboardShortcuts,
  qe as useLikes,
  is as useMappingReviewQueue,
  Be as useMentionUsers,
  Ve as useMyMentionsAndTasks,
  ns as usePipelineDefs,
  We as usePosts,
  gs as usePrefersReducedMotion,
  we as usePresence,
  ks as usePresenceContext,
  Te as useReactions,
  Pe as useRooms,
  _e as useSectionList,
  Je as useSocialProfile,
  us as useSourceSloMetrics,
  ds as useSyncConflicts,
  X as useTheme,
  w as useThemeContext,
  ms as useToast,
  ve as useTypedDocuments,
  Ie as useUrlFilterState,
  Ne as useVersionHistory,
  Ue as useVideoCall,
  Qe as useVideoSessions,
  ke as useWebSocket,
  ys as useWebSocketContext,
  ze as useYjsDoc,
  $ as zIndex
};
