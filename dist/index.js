import { DOCUMENT_TYPE_ICONS as H, getPageConfig as Q, getPagesView as G, makeEmptyField as q } from "./types.js";
import { C as K, i as Y } from "./fieldType-BJfRz7mO.js";
import { B as J, a as Z, u as ee, b as se, c as ae, d as re, e as te, f as oe, g as ie, h as ne, i as de, j as ue, k as ce, l as pe, m as fe, n as le, o as ge, p as me, q as xe, r as be, s as he, t as ye, v as Se, w as Ce, x as Le, y as Pe, z as Te, A as we, C as ve, D as Ie, E as ke } from "./useWebSocket-xoTVPcp0.js";
import { u as Me, a as Ee, b as Re, c as Ae, d as Fe, e as je, f as Be, g as Oe, h as Xe, i as $e, j as Ne, k as Ue, l as Ve, m as _e, n as He, o as Qe } from "./useVideoSessions-hr67KvHn.js";
import { u as qe, a as ze, b as Ke, c as Ye, d as We, e as Je } from "./useSocialProfile-D-SUgbn2.js";
import { u as es, a as ss, b as as, c as rs, d as ts, e as os, f as is, g as ns, h as ds, i as us } from "./useSyncConflicts-DruS2duy.js";
import { u as ps } from "./useDocumentTypes-C29MkgPl.js";
import { T as ls, u as gs, a as ms } from "./ToastProvider-aHBNxMTO.js";
import { W as bs, u as hs } from "./WebSocketContext-DPGFyPeZ.js";
import { I as Ss, u as Cs } from "./IdentityContext-CLalsm_M.js";
import { C as Ps, D as Ts, P as ws, T as vs, u as Is } from "./TagEditor-Dc6-WL1y.js";
import { C as Ds, u as Ms } from "./ThemeContext-Bi6AQuIL.js";
import { B as Rs, C as As, a as Fs, b as js, c as Bs, d as Os, e as Xs, f as $s, D as Ns, E as Us, F as Vs, g as _s, h as Hs, I as Qs, i as Gs, M as qs, P as zs, j as Ks, k as Ys, Q as Ws, S as Js, l as Zs, m as ea, n as sa, o as aa, T as ra, p as ta, q as oa, r as ia, U as na, u as da } from "./InlinePopover-DK5m64En.js";
import { B as ca, a as pa } from "./Banner-B8AcwPH_.js";
import { C as la, P as ga, T as ma, a as xa, b as ba, c as ha, d as ya, e as Sa } from "./PageSection-B_nBFSjK.js";
import { I as La } from "./IconButton-Da1kJ5WO.js";
import { B as Ta, L as wa, S as va } from "./Chart-ByoxeiYX.js";
import { C as ka } from "./Chip-BXdhqVFm.js";
import { C as Ma } from "./ConfirmDialog-CNoxvYGu.js";
import { E as Ra } from "./EmptyState-PM9wTjxk.js";
import { S as Fa, e as ja, g as Ba, a as Oa } from "./Sparkline-B8POanAQ.js";
import { jsx as f } from "react/jsx-runtime";
import "clsx";
import "tailwind-merge";
import { M as $a } from "./Modal-2jg4229_.js";
import { S as Ua } from "./SkeletonCard-C89GWQ3p.js";
import { A as _a, a as Ha, b as Qa, B as Ga, F as qa, N as za, P as Ka, S as Ya, c as Wa, n as Ja, d as Za } from "./Badge-CSuOT81L.js";
import { createContext as l, useMemo as g, useEffect as m, useContext as x } from "react";
import { S as sr, a as ar } from "./SidebarRow-Dw9aePkr.js";
import { P as tr, a as or, b as ir, f as nr, g as dr, c as ur, l as cr, r as pr, d as fr, e as lr, s as gr } from "./pipelineAudit-HIi3aStK.js";
import "./index-BhrGxmJW.js";
import { g as xr, a as br, b as hr, l as yr, r as Sr, c as Cr } from "./registry-BZU57zws.js";
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
}, y = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 }, S = { xs: 11, sm: 13, md: 14, lg: 16, xl: 22 }, C = { sm: 4, md: 6, lg: 8, xl: 12, full: 9999 }, M = {
  colors: h,
  spacing: y,
  fontSize: S,
  borderRadius: C
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
function P() {
  return x(p);
}
function B() {
  return P();
}
const O = {
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
  _a as ActivityFeed,
  Ha as Avatar,
  Qa as AvatarGroup,
  Ga as Badge,
  ca as Banner,
  Ta as BarChart,
  Rs as Breadcrumbs,
  pa as Button,
  K as CUSTOM_FIELD_TYPE_STORAGE_KEY,
  la as Card,
  As as CardHeader,
  Fs as ChannelHeader,
  js as ChatComposer,
  ka as Chip,
  Ps as CodeEditor,
  Bs as CollapsibleSection,
  Ds as ColorSchemeProvider,
  Os as CommandPalette,
  Xs as CommandPaletteHint,
  $s as CommandPaletteProvider,
  Ma as ConfirmDialog,
  Ts as DEFAULT_PIPELINE_ICONS,
  H as DOCUMENT_TYPE_ICONS,
  Ns as Drawer,
  Ra as EmptyState,
  Us as EntityCell,
  qa as FileUploadDrop,
  Vs as FilterChip,
  _s as FollowUpChips,
  Hs as FormField,
  J as IDENTITY_BASE_URL,
  La as IconButton,
  Ss as IdentityProvider,
  Qs as InlineAlert,
  Gs as InlinePopover,
  wa as LineChart,
  qs as MessageBubble,
  $a as Modal,
  za as NotificationCenter,
  zs as PageHeader,
  ga as PageSection,
  tr as PatchHttpError,
  or as PatchValidationRejectedError,
  Ka as PresenceAvatars,
  ws as PresenceProvider,
  Ks as ProgressBar,
  Ys as ProjectCard,
  Ws as QuickPromptGrid,
  Js as SearchInput,
  Zs as SegmentedControl,
  sr as SidebarRow,
  ar as SidebarSection,
  Ua as SkeletonCard,
  Fa as Sparkline,
  ea as Spinner,
  va as StackedAreaChart,
  sa as StatCard,
  Ya as StatusDot,
  aa as SubNavLayout,
  Wa as Switch,
  ma as Table,
  xa as TableBody,
  ba as TableHead,
  ha as TableRow,
  ya as TableTd,
  Sa as TableTh,
  vs as TagEditor,
  j as ThemeProvider,
  ra as ThinkingBlock,
  ta as ThinkingDots,
  ls as ToastProvider,
  oa as ToolCallPill,
  ia as ToolCallStrip,
  na as UserMenu,
  bs as WebSocketProvider,
  ir as applyPatch,
  F as borderRadius,
  E as colors,
  e as cssVar,
  L as darkTheme,
  ja as eventGlyphs,
  A as fontSize,
  nr as forceFail,
  Ba as getEventCategory,
  Oa as getEventGlyph,
  xr as getFieldType,
  br as getFieldTypes,
  Q as getPageConfig,
  G as getPagesView,
  dr as getPipelineRun,
  hr as getRenderer,
  ur as getRunAuditLog,
  Z as identityApiFetch,
  D as injectThemeVars,
  Y as isValidCustomFieldType,
  c as lightTheme,
  $ as listDLQEntries,
  cr as listPipelineRuns,
  yr as listRegisteredRenderers,
  q as makeEmptyField,
  Ja as nameToColor,
  Za as nameToInitials,
  U as purgeDLQEntries,
  C as rawBorderRadius,
  h as rawColors,
  S as rawFontSize,
  y as rawSpacing,
  M as rawTokens,
  N as redriveDLQEntries,
  Sr as registerFieldType,
  Cr as registerRenderer,
  pr as resumeFromStep,
  fr as retryFromNode,
  lr as revertPatch,
  gr as searchAudit,
  O as shadows,
  R as spacing,
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
  Re as useCollaborativeDoc,
  Ms as useColorScheme,
  da as useCommandPalette,
  qe as useComments,
  ne as useCursors,
  de as useCustomFieldTypes,
  es as useDocTypeProposals,
  Ae as useDocumentComments,
  Fe as useDocumentExport,
  je as useDocumentItems,
  Be as useDocumentMetadata,
  Oe as useDocumentReviews,
  ps as useDocumentTypes,
  ue as useDocuments,
  ze as useFriends,
  Ke as useGroups,
  ce as useIdentityAdmin,
  pe as useIdentityAudit,
  fe as useIdentityClients,
  Cs as useIdentityContext,
  le as useIdentityDiagnostics,
  ge as useIdentityEmailTemplates,
  me as useIdentityGroups,
  xe as useIdentityMfa,
  be as useIdentityMfaAdmin,
  he as useIdentityPools,
  ye as useIdentityResource,
  Se as useIdentitySetupStatus,
  Ce as useIdentityUsers,
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
  Pe as usePresence,
  Is as usePresenceContext,
  Te as useReactions,
  we as useRooms,
  Ue as useSectionList,
  Je as useSocialProfile,
  ds as useSourceSloMetrics,
  us as useSyncConflicts,
  B as useTheme,
  P as useThemeContext,
  ms as useToast,
  ve as useTypedDocuments,
  Ie as useUrlFilterState,
  Ve as useVersionHistory,
  _e as useVideoCall,
  He as useVideoSessions,
  ke as useWebSocket,
  hs as useWebSocketContext,
  Qe as useYjsDoc,
  X as zIndex
};
