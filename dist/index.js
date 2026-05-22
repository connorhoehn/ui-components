import { DOCUMENT_TYPE_ICONS as H, getPageConfig as Q, getPagesView as G, makeEmptyField as q } from "./types.js";
import { C as K, i as Y } from "./fieldType-BJfRz7mO.js";
import { B as J, a as Z, u as ee, b as se, c as ae, d as re, e as te, f as oe, g as ie, h as ne, i as de, j as ue, k as ce, l as pe, m as fe, n as le, o as ge, p as me, q as xe, r as be, s as he, t as ye, v as Ce, w as Se, x as Le, y as Te, z as Pe, A as we, C as ve, D as ke, E as Ie } from "./useWebSocket-xoTVPcp0.js";
import { u as Me, a as Ee, b as Ae, c as Re, d as Fe, e as je, f as Oe, g as Be, h as Xe, i as $e, j as Ne, k as Ue, l as Ve, m as _e, n as He, o as Qe } from "./useVideoSessions-hr67KvHn.js";
import { u as qe, a as ze, b as Ke, c as Ye, d as We, e as Je } from "./useSocialProfile-D-SUgbn2.js";
import { u as es, a as ss, b as as, c as rs, d as ts, e as os, f as is, g as ns, h as ds, i as us } from "./useSyncConflicts-DruS2duy.js";
import { u as ps } from "./useDocumentTypes-C29MkgPl.js";
import { T as ls, u as gs, a as ms } from "./ToastProvider-aHBNxMTO.js";
import { W as bs, u as hs } from "./WebSocketContext-DPGFyPeZ.js";
import { I as Cs, u as Ss } from "./IdentityContext-CLalsm_M.js";
import { C as Ts, D as Ps, I as ws, P as vs, T as ks, u as Is } from "./TagEditor-CuaVtW7o.js";
import { C as Ms, u as Es } from "./ThemeContext-Bi6AQuIL.js";
import { B as Rs, C as Fs, a as js, b as Os, c as Bs, d as Xs, e as $s, f as Ns, D as Us, E as Vs, F as _s, g as Hs, h as Qs, I as Gs, M as qs, N as zs, P as Ks, i as Ys, j as Ws, k as Js, Q as Zs, S as ea, l as sa, m as aa, n as ra, o as ta, p as oa, q as ia, T as na, r as da, s as ua, t as ca, U as pa, u as fa } from "./SubNavLayout-DNCBpliH.js";
import { B as ga, C as ma } from "./ConfirmDialog-Ch54mLuZ.js";
import { C as ba, P as ha, T as ya, a as Ca, b as Sa, c as La, d as Ta, e as Pa } from "./PageSection-B_nBFSjK.js";
import { B as va } from "./Banner-DKb3JiLs.js";
import { B as Ia, L as Da, S as Ma } from "./Chart-ByoxeiYX.js";
import { C as Aa } from "./Chip-BXdhqVFm.js";
import { E as Fa } from "./EmptyState-C3KCJ6Ae.js";
import { S as Oa, e as Ba, g as Xa, a as $a } from "./Sparkline-B8POanAQ.js";
import { jsx as f } from "react/jsx-runtime";
import "clsx";
import "tailwind-merge";
import { M as Ua } from "./Modal-2jg4229_.js";
import { S as _a } from "./SkeletonCard-C89GWQ3p.js";
import { createContext as l, useMemo as g, useEffect as m, useContext as x } from "react";
import { A as Qa, a as Ga, b as qa, F as za, n as Ka, c as Ya } from "./ActivityFeed-BmTHbekH.js";
import { P as Ja, a as Za, b as er, f as sr, g as ar, c as rr, l as tr, r as or, d as ir, e as nr, s as dr } from "./pipelineAudit-HIi3aStK.js";
import "./index-BhrGxmJW.js";
import { g as cr, a as pr, b as fr, l as lr, r as gr, c as mr } from "./registry-BZU57zws.js";
function n(s) {
  return `--ui-${s.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
}
function b(s) {
  const a = {};
  for (const r of Object.keys(s))
    a[n(r)] = s[r];
  return a;
}
function D(s) {
  const a = b(s);
  return `:root {
${Object.entries(a).map(([t, o]) => `  ${t}: ${o};`).join(`
`)}
}`;
}
function e(s) {
  return `var(${n(s)})`;
}
const h = {
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
}, y = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 }, C = { xs: 11, sm: 13, md: 14, lg: 16, xl: 22 }, S = { sm: 4, md: 6, lg: 8, xl: 12, full: 9999 }, M = {
  colors: h,
  spacing: y,
  fontSize: C,
  borderRadius: S
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
}, A = {
  xs: e("spaceXs"),
  sm: e("spaceSm"),
  md: e("spaceMd"),
  lg: e("spaceLg"),
  xl: e("spaceXl")
}, R = {
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
}, L = {
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
}, p = l(c);
function j({ children: s, preset: a = "light", theme: r }) {
  const t = a === "dark" ? L : c, o = g(
    () => ({ ...t, ...r }),
    [t, r]
  );
  return m(() => {
    const d = document.documentElement, u = Object.keys(o);
    for (const i of u)
      d.style.setProperty(n(i), o[i]);
    return () => {
      for (const i of u)
        d.style.removeProperty(n(i));
    };
  }, [o]), /* @__PURE__ */ f(p.Provider, { value: o, children: s });
}
function T() {
  return x(p);
}
function O() {
  return T();
}
const B = {
  /** Subtle shadow for cards, panels */
  sm: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
  /** Medium shadow for dropdowns, popovers */
  md: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
  /** Strong shadow for modals, dialogs */
  lg: "0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)",
  /** Extra strong shadow for elevated modals */
  xl: "0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04)"
}, X = {
  /** Sticky headers, fixed toolbars */
  sticky: 20,
  /** Dropdowns, popovers, tooltips */
  dropdown: 50,
  /** Modals, dialogs, overlays */
  modal: 100,
  /** Toast notifications (above modals) */
  toast: 200
};
async function $(s) {
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
async function N(s, a) {
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
async function U(s, a) {
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
  Qa as ActivityFeed,
  Ga as Avatar,
  qa as AvatarGroup,
  va as Banner,
  Ia as BarChart,
  Rs as Breadcrumbs,
  ga as Button,
  K as CUSTOM_FIELD_TYPE_STORAGE_KEY,
  ba as Card,
  Fs as CardHeader,
  js as ChannelHeader,
  Os as ChatComposer,
  Aa as Chip,
  Ts as CodeEditor,
  Bs as CollapsibleSection,
  Ms as ColorSchemeProvider,
  Xs as CommandPalette,
  $s as CommandPaletteHint,
  Ns as CommandPaletteProvider,
  ma as ConfirmDialog,
  Ps as DEFAULT_PIPELINE_ICONS,
  H as DOCUMENT_TYPE_ICONS,
  Us as Drawer,
  Fa as EmptyState,
  Vs as EntityCell,
  za as FileUploadDrop,
  _s as FilterChip,
  Hs as FollowUpChips,
  Qs as FormField,
  J as IDENTITY_BASE_URL,
  ws as IconButton,
  Cs as IdentityProvider,
  Gs as InlineAlert,
  Da as LineChart,
  qs as MessageBubble,
  Ua as Modal,
  zs as NotificationCenter,
  Ks as PageHeader,
  ha as PageSection,
  Ja as PatchHttpError,
  Za as PatchValidationRejectedError,
  Ys as PresenceAvatars,
  vs as PresenceProvider,
  Ws as ProgressBar,
  Js as ProjectCard,
  Zs as QuickPromptGrid,
  ea as SearchInput,
  sa as SegmentedControl,
  _a as SkeletonCard,
  Oa as Sparkline,
  aa as Spinner,
  Ma as StackedAreaChart,
  ra as StatCard,
  ta as StatusDot,
  oa as SubNavLayout,
  ia as Switch,
  ya as Table,
  Ca as TableBody,
  Sa as TableHead,
  La as TableRow,
  Ta as TableTd,
  Pa as TableTh,
  ks as TagEditor,
  j as ThemeProvider,
  na as ThinkingBlock,
  da as ThinkingDots,
  ls as ToastProvider,
  ua as ToolCallPill,
  ca as ToolCallStrip,
  pa as UserMenu,
  bs as WebSocketProvider,
  er as applyPatch,
  F as borderRadius,
  E as colors,
  e as cssVar,
  L as darkTheme,
  Ba as eventGlyphs,
  R as fontSize,
  sr as forceFail,
  Xa as getEventCategory,
  $a as getEventGlyph,
  cr as getFieldType,
  pr as getFieldTypes,
  Q as getPageConfig,
  G as getPagesView,
  ar as getPipelineRun,
  fr as getRenderer,
  rr as getRunAuditLog,
  Z as identityApiFetch,
  D as injectThemeVars,
  Y as isValidCustomFieldType,
  c as lightTheme,
  $ as listDLQEntries,
  tr as listPipelineRuns,
  lr as listRegisteredRenderers,
  q as makeEmptyField,
  Ka as nameToColor,
  Ya as nameToInitials,
  U as purgeDLQEntries,
  S as rawBorderRadius,
  h as rawColors,
  C as rawFontSize,
  y as rawSpacing,
  M as rawTokens,
  N as redriveDLQEntries,
  gr as registerFieldType,
  mr as registerRenderer,
  or as resumeFromStep,
  ir as retryFromNode,
  nr as revertPatch,
  dr as searchAudit,
  B as shadows,
  A as spacing,
  b as themeToCssVars,
  n as tokenToCssVarName,
  ee as useActivityBus,
  se as useApiCall,
  ae as useApiHealth,
  re as useAuth,
  Me as useAwareness,
  Ee as useAwarenessState,
  te as useCRDT,
  oe as useChat,
  ie as useClickOutside,
  Ae as useCollaborativeDoc,
  Es as useColorScheme,
  fa as useCommandPalette,
  qe as useComments,
  ne as useCursors,
  de as useCustomFieldTypes,
  es as useDocTypeProposals,
  Re as useDocumentComments,
  Fe as useDocumentExport,
  je as useDocumentItems,
  Oe as useDocumentMetadata,
  Be as useDocumentReviews,
  ps as useDocumentTypes,
  ue as useDocuments,
  ze as useFriends,
  Ke as useGroups,
  ce as useIdentityAdmin,
  pe as useIdentityAudit,
  fe as useIdentityClients,
  Ss as useIdentityContext,
  le as useIdentityDiagnostics,
  ge as useIdentityEmailTemplates,
  me as useIdentityGroups,
  xe as useIdentityMfa,
  be as useIdentityMfaAdmin,
  he as useIdentityPools,
  ye as useIdentityResource,
  Ce as useIdentitySetupStatus,
  Se as useIdentityUsers,
  Xe as useIdleDetector,
  ss as useIngestAudit,
  as as useIngestDLQ,
  rs as useIngestItems,
  ts as useIngestProgress,
  os as useIngestSources,
  Le as useKeyboardShortcuts,
  Ye as useLikes,
  is as useMappingReviewQueue,
  $e as useMentionUsers,
  Ne as useMyMentionsAndTasks,
  ns as usePipelineDefs,
  We as usePosts,
  gs as usePrefersReducedMotion,
  Te as usePresence,
  Is as usePresenceContext,
  Pe as useReactions,
  we as useRooms,
  Ue as useSectionList,
  Je as useSocialProfile,
  ds as useSourceSloMetrics,
  us as useSyncConflicts,
  O as useTheme,
  T as useThemeContext,
  ms as useToast,
  ve as useTypedDocuments,
  ke as useUrlFilterState,
  Ve as useVersionHistory,
  _e as useVideoCall,
  He as useVideoSessions,
  Ie as useWebSocket,
  hs as useWebSocketContext,
  Qe as useYjsDoc,
  X as zIndex
};
