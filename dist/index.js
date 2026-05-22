import { DOCUMENT_TYPE_ICONS as Q, getPageConfig as G, getPagesView as H, makeEmptyField as q } from "./types.js";
import { C as K, i as Y } from "./fieldType-BJfRz7mO.js";
import { B as J, a as Z, u as ee, b as se, c as ae, d as re, e as te, f as oe, g as ie, h as ne, i as de, j as ue, k as ce, l as pe, m as fe, n as le, o as ge, p as xe, q as me, r as be, s as he, t as ye, v as Se, w as Ce, x as Le, y as Te, z as Pe, A as we, C as ve, D as ke, E as Ie } from "./useWebSocket-xoTVPcp0.js";
import { u as Me, a as Ee, b as Re, c as Ae, d as Fe, e as je, f as Oe, g as Xe, h as Be, i as $e, j as Ne, k as Ve, l as _e, m as Ue, n as Qe, o as Ge } from "./useVideoSessions-hr67KvHn.js";
import { u as qe, a as ze, b as Ke, c as Ye, d as We, e as Je } from "./useSocialProfile-D-SUgbn2.js";
import { u as es, a as ss, b as as, c as rs, d as ts, e as os, f as is, g as ns, h as ds, i as us } from "./useSyncConflicts-DruS2duy.js";
import { u as ps } from "./useDocumentTypes-C29MkgPl.js";
import { T as ls, u as gs, a as xs } from "./ToastProvider-aHBNxMTO.js";
import { W as bs, u as hs } from "./WebSocketContext-DPGFyPeZ.js";
import { I as Ss, u as Cs } from "./IdentityContext-CLalsm_M.js";
import { C as Ts, D as Ps, I as ws, P as vs, T as ks, u as Is } from "./TagEditor-CuaVtW7o.js";
import { C as Ms, u as Es } from "./ThemeContext-Bi6AQuIL.js";
import { A as As, a as Fs, b as js, C as Os, c as Xs, d as Bs, e as $s, f as Ns, g as Vs, D as _s, E as Us, F as Qs, h as Gs, i as Hs, I as qs, M as zs, P as Ks, j as Ys, k as Ws, Q as Js, S as Zs, l as ea, m as sa, n as aa, o as ra, p as ta, q as oa, T as ia, r as na, s as da, t as ua, u as ca, v as pa, w as fa } from "./SubNavLayout-1ySGqOdk.js";
import { B as ga, a as xa, C as ma } from "./ConfirmDialog-DCCuBtRb.js";
import { C as ha, P as ya, T as Sa, a as Ca, b as La, c as Ta, d as Pa, e as wa } from "./PageSection-B_nBFSjK.js";
import { B as ka, L as Ia, S as Da } from "./Chart-ByoxeiYX.js";
import { C as Ea } from "./Chip-BXdhqVFm.js";
import { E as Aa } from "./EmptyState-C3KCJ6Ae.js";
import { S as ja, e as Oa, g as Xa, a as Ba } from "./Sparkline-B8POanAQ.js";
import { jsx as f } from "react/jsx-runtime";
import "clsx";
import "tailwind-merge";
import { M as Na } from "./Modal-2jg4229_.js";
import { S as _a } from "./SkeletonCard-C89GWQ3p.js";
import { createContext as l, useMemo as g, useEffect as x, useContext as m } from "react";
import { P as Qa, a as Ga, b as Ha, f as qa, g as za, c as Ka, l as Ya, r as Wa, d as Ja, e as Za, s as er } from "./pipelineAudit-HIi3aStK.js";
import "./index-BhrGxmJW.js";
import { g as ar, a as rr, b as tr, l as or, r as ir, c as nr } from "./registry-BZU57zws.js";
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
  return x(() => {
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
  return m(p);
}
function O() {
  return T();
}
const X = {
  /** Subtle shadow for cards, panels */
  sm: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
  /** Medium shadow for dropdowns, popovers */
  md: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
  /** Strong shadow for modals, dialogs */
  lg: "0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)",
  /** Extra strong shadow for elevated modals */
  xl: "0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04)"
}, B = {
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
async function V(s, a) {
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
  As as ActivityFeed,
  Fs as Avatar,
  js as AvatarGroup,
  ga as Banner,
  ka as BarChart,
  xa as Button,
  K as CUSTOM_FIELD_TYPE_STORAGE_KEY,
  ha as Card,
  Os as CardHeader,
  Xs as ChatComposer,
  Ea as Chip,
  Ts as CodeEditor,
  Bs as CollapsibleSection,
  Ms as ColorSchemeProvider,
  $s as CommandPalette,
  Ns as CommandPaletteHint,
  Vs as CommandPaletteProvider,
  ma as ConfirmDialog,
  Ps as DEFAULT_PIPELINE_ICONS,
  Q as DOCUMENT_TYPE_ICONS,
  _s as Drawer,
  Aa as EmptyState,
  Us as EntityCell,
  Qs as FilterChip,
  Gs as FollowUpChips,
  Hs as FormField,
  J as IDENTITY_BASE_URL,
  ws as IconButton,
  Ss as IdentityProvider,
  qs as InlineAlert,
  Ia as LineChart,
  zs as MessageBubble,
  Na as Modal,
  Ks as PageHeader,
  ya as PageSection,
  Qa as PatchHttpError,
  Ga as PatchValidationRejectedError,
  vs as PresenceProvider,
  Ys as ProgressBar,
  Ws as ProjectCard,
  Js as QuickPromptGrid,
  Zs as SearchInput,
  ea as SegmentedControl,
  _a as SkeletonCard,
  ja as Sparkline,
  sa as Spinner,
  Da as StackedAreaChart,
  aa as StatCard,
  ra as StatusDot,
  ta as SubNavLayout,
  oa as Switch,
  Sa as Table,
  Ca as TableBody,
  La as TableHead,
  Ta as TableRow,
  Pa as TableTd,
  wa as TableTh,
  ks as TagEditor,
  j as ThemeProvider,
  ia as ThinkingBlock,
  na as ThinkingDots,
  ls as ToastProvider,
  da as ToolCallPill,
  ua as ToolCallStrip,
  bs as WebSocketProvider,
  Ha as applyPatch,
  F as borderRadius,
  E as colors,
  e as cssVar,
  L as darkTheme,
  Oa as eventGlyphs,
  A as fontSize,
  qa as forceFail,
  Xa as getEventCategory,
  Ba as getEventGlyph,
  ar as getFieldType,
  rr as getFieldTypes,
  G as getPageConfig,
  H as getPagesView,
  za as getPipelineRun,
  tr as getRenderer,
  Ka as getRunAuditLog,
  Z as identityApiFetch,
  D as injectThemeVars,
  Y as isValidCustomFieldType,
  c as lightTheme,
  $ as listDLQEntries,
  Ya as listPipelineRuns,
  or as listRegisteredRenderers,
  q as makeEmptyField,
  ca as nameToColor,
  pa as nameToInitials,
  V as purgeDLQEntries,
  C as rawBorderRadius,
  h as rawColors,
  S as rawFontSize,
  y as rawSpacing,
  M as rawTokens,
  N as redriveDLQEntries,
  ir as registerFieldType,
  nr as registerRenderer,
  Wa as resumeFromStep,
  Ja as retryFromNode,
  Za as revertPatch,
  er as searchAudit,
  X as shadows,
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
  Es as useColorScheme,
  fa as useCommandPalette,
  qe as useComments,
  ne as useCursors,
  de as useCustomFieldTypes,
  es as useDocTypeProposals,
  Ae as useDocumentComments,
  Fe as useDocumentExport,
  je as useDocumentItems,
  Oe as useDocumentMetadata,
  Xe as useDocumentReviews,
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
  xe as useIdentityGroups,
  me as useIdentityMfa,
  be as useIdentityMfaAdmin,
  he as useIdentityPools,
  ye as useIdentityResource,
  Se as useIdentitySetupStatus,
  Ce as useIdentityUsers,
  Be as useIdleDetector,
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
  Ve as useSectionList,
  Je as useSocialProfile,
  ds as useSourceSloMetrics,
  us as useSyncConflicts,
  O as useTheme,
  T as useThemeContext,
  xs as useToast,
  ve as useTypedDocuments,
  ke as useUrlFilterState,
  _e as useVersionHistory,
  Ue as useVideoCall,
  Qe as useVideoSessions,
  Ie as useWebSocket,
  hs as useWebSocketContext,
  Ge as useYjsDoc,
  B as zIndex
};
