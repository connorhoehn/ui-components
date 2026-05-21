import { DOCUMENT_TYPE_ICONS as Q, getPageConfig as G, getPagesView as H, makeEmptyField as q } from "./types.js";
import { C as K, i as Y } from "./fieldType-BJfRz7mO.js";
import { B as J, a as Z, u as ee, b as se, c as ae, d as re, e as te, f as oe, g as ie, h as ne, i as de, j as ue, k as ce, l as pe, m as fe, n as le, o as ge, p as xe, q as me, r as be, s as he, t as ye, v as Se, w as Ce, x as Le, y as Te, z as Pe, A as we, C as ke, D as ve, E as Ie } from "./useWebSocket-xoTVPcp0.js";
import { u as Me, a as Ee, b as Re, c as Ae, d as Fe, e as Oe, f as je, g as Xe, h as Be, i as $e, j as Ve, k as _e, l as Ne, m as Ue, n as Qe, o as Ge } from "./useVideoSessions-hr67KvHn.js";
import { u as qe, a as ze, b as Ke, c as Ye, d as We, e as Je } from "./useSocialProfile-D-SUgbn2.js";
import { u as es, a as ss, b as as, c as rs, d as ts, e as os, f as is, g as ns, h as ds, i as us } from "./useSyncConflicts-DruS2duy.js";
import { u as ps } from "./useDocumentTypes-C29MkgPl.js";
import { T as ls, u as gs, a as xs } from "./ToastProvider-aHBNxMTO.js";
import { W as bs, u as hs } from "./WebSocketContext-DPGFyPeZ.js";
import { I as Ss, u as Cs } from "./IdentityContext-CLalsm_M.js";
import { C as Ts, D as Ps, I as ws, P as ks, T as vs, u as Is } from "./TagEditor-CuaVtW7o.js";
import { C as Ms, u as Es } from "./ThemeContext-Bi6AQuIL.js";
import { A as As, a as Fs, C as Os, b as js, c as Xs, d as Bs, e as $s, f as Vs, D as _s, E as Ns, F as Us, g as Qs, h as Gs, I as Hs, M as qs, P as zs, i as Ks, Q as Ys, S as Ws, j as Js, k as Zs, l as ea, m as sa, n as aa, T as ra, o as ta, p as oa, q as ia, r as na, s as da, u as ua } from "./FollowUpChips-NqdK_Ex0.js";
import { B as pa, a as fa, C as la } from "./ConfirmDialog-C1XfACNk.js";
import { C as xa, P as ma, T as ba, a as ha, b as ya, c as Sa, d as Ca, e as La } from "./PageSection-B_nBFSjK.js";
import { B as Pa, L as wa, S as ka } from "./Chart-ByoxeiYX.js";
import { C as Ia } from "./Chip-BXdhqVFm.js";
import { E as Ma } from "./EmptyState-C3KCJ6Ae.js";
import { S as Ra, e as Aa, g as Fa, a as Oa } from "./Sparkline-B8POanAQ.js";
import { jsx as f } from "react/jsx-runtime";
import "clsx";
import "tailwind-merge";
import { M as Xa } from "./Modal-2jg4229_.js";
import { S as $a } from "./SkeletonCard-C89GWQ3p.js";
import { createContext as l, useMemo as g, useEffect as x, useContext as m } from "react";
import { P as _a, a as Na, b as Ua, f as Qa, g as Ga, c as Ha, l as qa, r as za, d as Ka, e as Ya, s as Wa } from "./pipelineAudit-HIi3aStK.js";
import "./index-BhrGxmJW.js";
import { g as Za, a as er, b as sr, l as ar, r as rr, c as tr } from "./registry-BZU57zws.js";
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
function O({ children: s, preset: a = "light", theme: r }) {
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
function j() {
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
  As as Avatar,
  Fs as AvatarGroup,
  pa as Banner,
  Pa as BarChart,
  fa as Button,
  K as CUSTOM_FIELD_TYPE_STORAGE_KEY,
  xa as Card,
  Os as CardHeader,
  js as ChatComposer,
  Ia as Chip,
  Ts as CodeEditor,
  Xs as CollapsibleSection,
  Ms as ColorSchemeProvider,
  Bs as CommandPalette,
  $s as CommandPaletteHint,
  Vs as CommandPaletteProvider,
  la as ConfirmDialog,
  Ps as DEFAULT_PIPELINE_ICONS,
  Q as DOCUMENT_TYPE_ICONS,
  _s as Drawer,
  Ma as EmptyState,
  Ns as EntityCell,
  Us as FilterChip,
  Qs as FollowUpChips,
  Gs as FormField,
  J as IDENTITY_BASE_URL,
  ws as IconButton,
  Ss as IdentityProvider,
  Hs as InlineAlert,
  wa as LineChart,
  qs as MessageBubble,
  Xa as Modal,
  zs as PageHeader,
  ma as PageSection,
  _a as PatchHttpError,
  Na as PatchValidationRejectedError,
  ks as PresenceProvider,
  Ks as ProgressBar,
  Ys as QuickPromptGrid,
  Ws as SearchInput,
  Js as SegmentedControl,
  $a as SkeletonCard,
  Ra as Sparkline,
  Zs as Spinner,
  ka as StackedAreaChart,
  ea as StatCard,
  sa as StatusDot,
  aa as Switch,
  ba as Table,
  ha as TableBody,
  ya as TableHead,
  Sa as TableRow,
  Ca as TableTd,
  La as TableTh,
  vs as TagEditor,
  O as ThemeProvider,
  ra as ThinkingBlock,
  ta as ThinkingDots,
  ls as ToastProvider,
  oa as ToolCallPill,
  ia as ToolCallStrip,
  bs as WebSocketProvider,
  Ua as applyPatch,
  F as borderRadius,
  E as colors,
  e as cssVar,
  L as darkTheme,
  Aa as eventGlyphs,
  A as fontSize,
  Qa as forceFail,
  Fa as getEventCategory,
  Oa as getEventGlyph,
  Za as getFieldType,
  er as getFieldTypes,
  G as getPageConfig,
  H as getPagesView,
  Ga as getPipelineRun,
  sr as getRenderer,
  Ha as getRunAuditLog,
  Z as identityApiFetch,
  D as injectThemeVars,
  Y as isValidCustomFieldType,
  c as lightTheme,
  $ as listDLQEntries,
  qa as listPipelineRuns,
  ar as listRegisteredRenderers,
  q as makeEmptyField,
  na as nameToColor,
  da as nameToInitials,
  _ as purgeDLQEntries,
  C as rawBorderRadius,
  h as rawColors,
  S as rawFontSize,
  y as rawSpacing,
  M as rawTokens,
  V as redriveDLQEntries,
  rr as registerFieldType,
  tr as registerRenderer,
  za as resumeFromStep,
  Ka as retryFromNode,
  Ya as revertPatch,
  Wa as searchAudit,
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
  ua as useCommandPalette,
  qe as useComments,
  ne as useCursors,
  de as useCustomFieldTypes,
  es as useDocTypeProposals,
  Ae as useDocumentComments,
  Fe as useDocumentExport,
  Oe as useDocumentItems,
  je as useDocumentMetadata,
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
  Ve as useMyMentionsAndTasks,
  ns as usePipelineDefs,
  We as usePosts,
  gs as usePrefersReducedMotion,
  Te as usePresence,
  Is as usePresenceContext,
  Pe as useReactions,
  we as useRooms,
  _e as useSectionList,
  Je as useSocialProfile,
  ds as useSourceSloMetrics,
  us as useSyncConflicts,
  j as useTheme,
  T as useThemeContext,
  xs as useToast,
  ke as useTypedDocuments,
  ve as useUrlFilterState,
  Ne as useVersionHistory,
  Ue as useVideoCall,
  Qe as useVideoSessions,
  Ie as useWebSocket,
  hs as useWebSocketContext,
  Ge as useYjsDoc,
  B as zIndex
};
