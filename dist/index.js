import { DOCUMENT_TYPE_ICONS as de, getPageConfig as ce, getPagesView as le, makeEmptyField as ue } from "./types.js";
import { C as fe, i as me } from "./fieldType-BJfRz7mO.js";
import { B as ge, a as he, u as be, b as ye, c as Se, d as Ce, e as we, f as ve, g as Le, h as Pe, i as Te, j as Ie, k as ke, l as De, m as Me, n as Ee, o as Re, p as Ae, q as Fe, r as Ne, s as je, t as Oe, v as $e, w as Be, x as Xe, y as Ue, z as Ve, A as _e, C as ze, D as He, E as Qe } from "./useWebSocket-xoTVPcp0.js";
import { u as Ye, a as qe, b as Ke, c as We, d as Je, e as Ze, f as ea, g as aa, h as sa, i as ta, j as ra, k as oa, l as na, m as ia, n as da, o as ca } from "./useVideoSessions-hr67KvHn.js";
import { u as ua, a as pa, b as fa, c as ma, d as xa, e as ga } from "./useSocialProfile-D-SUgbn2.js";
import { u as ba, a as ya, b as Sa, c as Ca, d as wa, e as va, f as La, g as Pa, h as Ta, i as Ia } from "./useSyncConflicts-DruS2duy.js";
import { u as Da } from "./useDocumentTypes-C29MkgPl.js";
import { T as Ea, u as Ra, a as Aa } from "./ToastProvider-aHBNxMTO.js";
import { W as Na, u as ja } from "./WebSocketContext-DPGFyPeZ.js";
import { I as $a, u as Ba } from "./IdentityContext-CLalsm_M.js";
import { C as Ua, D as Va, P as _a, T as za, u as Ha } from "./TagEditor-Dc6-WL1y.js";
import { C as Ga, u as Ya } from "./ThemeContext-Bi6AQuIL.js";
import { B as Ka, C as Wa, a as Ja, b as Za, c as es, d as as, e as ss, f as ts, D as rs, E as os, F as ns, g as is, h as ds, I as cs, i as ls, M as us, P as ps, j as fs, k as ms, Q as xs, S as gs, l as hs, m as bs, n as ys, o as Ss, T as Cs, p as ws, q as vs, r as Ls, U as Ps, u as Ts } from "./InlinePopover-CrKesHX_.js";
import { a as g } from "./Banner-B8AcwPH_.js";
import { B as ks } from "./Banner-B8AcwPH_.js";
import { C as Ms, P as Es, T as Rs, a as As, b as Fs, c as Ns, d as js, e as Os } from "./PageSection-B_nBFSjK.js";
import { I as Bs } from "./IconButton-Da1kJ5WO.js";
import { B as Us, L as Vs, S as _s } from "./Chart-ByoxeiYX.js";
import { C as Hs } from "./Chip-BXdhqVFm.js";
import { C as Gs } from "./ConfirmDialog-CNoxvYGu.js";
import { E as qs } from "./EmptyState-PM9wTjxk.js";
import { S as Ws, e as Js, g as Zs, a as et } from "./Sparkline-B8POanAQ.js";
import { jsx as n, jsxs as u, Fragment as h } from "react/jsx-runtime";
import "clsx";
import "tailwind-merge";
import { M as L } from "./Modal-2jg4229_.js";
import { S as st } from "./SkeletonCard-C89GWQ3p.js";
import { A as rt, B as ot, F as nt, N as it, P as dt, S as ct, a as lt } from "./Badge-FT03wujO.js";
import { useState as b, useEffect as y, createContext as P, useMemo as T, useContext as I } from "react";
import { A as k } from "./Avatar-Q-j4vnWn.js";
import { a as pt, n as ft, b as mt } from "./Avatar-Q-j4vnWn.js";
import { S as gt, a as ht } from "./SidebarRow-Cw4xIxer.js";
import { P as yt, a as St, b as Ct, f as wt, g as vt, c as Lt, l as Pt, r as Tt, d as It, e as kt, s as Dt } from "./pipelineAudit-HIi3aStK.js";
import "./index-BhrGxmJW.js";
import { g as Et, a as Rt, b as At, l as Ft, r as Nt, c as jt } from "./registry-BZU57zws.js";
function D(a) {
  const s = Math.max(0, Math.floor(a / 1e3)), t = Math.floor(s / 3600), r = Math.floor(s % 3600 / 60), o = s % 60, d = String(r).padStart(2, "0"), c = String(o).padStart(2, "0");
  return t > 0 ? `${t}:${d}:${c}` : `${d}:${c}`;
}
function Q({
  open: a,
  onClose: s,
  onReconnect: t,
  callerName: r,
  lobbyName: o,
  elapsedMs: d,
  participants: c,
  loading: l = !1
}) {
  const [f, m] = b(null), [w, x] = b(() => Date.now());
  y(() => {
    if (!a) {
      m(null);
      return;
    }
    m(Date.now()), x(Date.now());
    const i = setInterval(() => x(Date.now()), 1e3);
    return () => clearInterval(i);
  }, [a]);
  const v = f !== null ? d + (w - f) : d;
  return /* @__PURE__ */ n(
    L,
    {
      open: a,
      onClose: s,
      title: "Reconnect to your call?",
      maxWidth: 420,
      footer: /* @__PURE__ */ u(h, { children: [
        /* @__PURE__ */ n(
          g,
          {
            variant: "ghost",
            size: "md",
            onClick: s,
            disabled: l,
            "data-testid": "resume-call-dismiss",
            children: "Dismiss"
          }
        ),
        /* @__PURE__ */ n(
          g,
          {
            variant: "primary",
            size: "md",
            onClick: () => {
              t();
            },
            disabled: l,
            "data-autofocus": !0,
            "data-testid": "resume-call-reconnect",
            children: l ? "Reconnecting…" : "Reconnect"
          }
        )
      ] }),
      backdropTestId: "resume-call-backdrop",
      children: /* @__PURE__ */ u(
        "div",
        {
          className: "flex flex-col gap-3",
          "data-testid": "resume-call-dialog",
          "data-lobby-name": o,
          children: [
            /* @__PURE__ */ u("p", { className: "text-[13px] text-[#475569]", children: [
              "You were in a call with",
              " ",
              /* @__PURE__ */ n("span", { className: "font-semibold text-slate-900", children: r }),
              o ? /* @__PURE__ */ u(h, { children: [
                " ",
                "in",
                " ",
                /* @__PURE__ */ n("span", { className: "font-mono text-[12px] text-slate-700", children: o })
              ] }) : null,
              "."
            ] }),
            /* @__PURE__ */ u("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ n("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-slate-500", children: "Elapsed" }),
              /* @__PURE__ */ n(
                "span",
                {
                  className: "font-mono text-[13px] text-slate-900",
                  "data-testid": "resume-call-elapsed",
                  "aria-live": "polite",
                  children: D(v)
                }
              )
            ] }),
            c.length > 0 && /* @__PURE__ */ n(
              "div",
              {
                className: "flex flex-wrap items-center gap-2",
                role: "list",
                "aria-label": "Other participants in the call",
                children: c.map((i) => /* @__PURE__ */ u(
                  "div",
                  {
                    role: "listitem",
                    "data-testid": "resume-call-participant",
                    "data-participant-id": i.userId,
                    "data-participant-name": i.name,
                    className: "inline-flex items-center gap-1.5 rounded-full bg-slate-100 pl-1 pr-2.5 py-1",
                    title: i.name,
                    children: [
                      i.avatarUrl ? /* @__PURE__ */ n(
                        "img",
                        {
                          src: i.avatarUrl,
                          alt: i.name,
                          className: "rounded-full object-cover w-5 h-5"
                        }
                      ) : /* @__PURE__ */ n(k, { name: i.name, size: 20 }),
                      /* @__PURE__ */ n("span", { className: "text-[12px] font-medium text-slate-700", children: i.name })
                    ]
                  },
                  i.userId
                ))
              }
            )
          ]
        }
      )
    }
  );
}
function p(a) {
  return `--ui-${a.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
}
function M(a) {
  const s = {};
  for (const t of Object.keys(a))
    s[p(t)] = a[t];
  return s;
}
function G(a) {
  const s = M(a);
  return `:root {
${Object.entries(s).map(([r, o]) => `  ${r}: ${o};`).join(`
`)}
}`;
}
function e(a) {
  return `var(${p(a)})`;
}
const E = {
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
}, R = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 }, A = { xs: 11, sm: 13, md: 14, lg: 16, xl: 22 }, F = { sm: 4, md: 6, lg: 8, xl: 12, full: 9999 }, Y = {
  colors: E,
  spacing: R,
  fontSize: A,
  borderRadius: F
}, q = {
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
}, K = {
  xs: e("spaceXs"),
  sm: e("spaceSm"),
  md: e("spaceMd"),
  lg: e("spaceLg"),
  xl: e("spaceXl")
}, W = {
  xs: e("fontXs"),
  sm: e("fontSm"),
  md: e("fontMd"),
  lg: e("fontLg"),
  xl: e("fontXl")
}, J = {
  sm: e("radiusSm"),
  md: e("radiusMd"),
  lg: e("radiusLg"),
  xl: e("radiusXl"),
  full: e("radiusFull")
}, S = {
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
}, N = {
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
}, C = P(S);
function Z({ children: a, preset: s = "light", theme: t }) {
  const r = s === "dark" ? N : S, o = T(
    () => ({ ...r, ...t }),
    [r, t]
  );
  return y(() => {
    const d = document.documentElement, c = Object.keys(o);
    for (const l of c)
      d.style.setProperty(p(l), o[l]);
    return () => {
      for (const l of c)
        d.style.removeProperty(p(l));
    };
  }, [o]), /* @__PURE__ */ n(C.Provider, { value: o, children: a });
}
function j() {
  return I(C);
}
function ee() {
  return j();
}
const ae = {
  /** Subtle shadow for cards, panels */
  sm: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
  /** Medium shadow for dropdowns, popovers */
  md: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
  /** Strong shadow for modals, dialogs */
  lg: "0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)",
  /** Extra strong shadow for elevated modals */
  xl: "0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04)"
}, se = {
  /** Sticky headers, fixed toolbars */
  sticky: 20,
  /** Dropdowns, popovers, tooltips */
  dropdown: 50,
  /** Modals, dialogs, overlays */
  modal: 100,
  /** Toast notifications (above modals) */
  toast: 200
};
async function te(a) {
  const s = new URLSearchParams();
  a?.limit && s.set("limit", String(a.limit)), a?.cursor && s.set("cursor", a.cursor), a?.errorKind && s.set("errorKind", a.errorKind), a?.sinceMs && s.set("sinceMs", String(a.sinceMs));
  const t = `/api/pipelines/dlq${s.toString() ? `?${s}` : ""}`, r = await fetch(t, {
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  });
  if (r.status === 503)
    return { items: [] };
  if (!r.ok) {
    const o = await r.text();
    throw new Error(`Failed to fetch DLQ: ${r.status} ${o}`);
  }
  return r.json();
}
async function re(a, s) {
  const t = await fetch("/api/pipelines/dlq/redrive", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      ids: a,
      ...s?.resetAttempts ? { resetAttempts: !0 } : {},
      ...s?.preview ? { preview: !0 } : {}
    })
  });
  if (!t.ok) {
    const r = await t.text();
    throw new Error(`Redrive failed: ${t.status} ${r}`);
  }
  return t.json();
}
async function oe(a, s) {
  const t = await fetch("/api/pipelines/dlq/purge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      ids: a,
      ...s?.preview ? { preview: !0 } : {}
    })
  });
  if (!t.ok) {
    const r = await t.text();
    throw new Error(`Purge failed: ${t.status} ${r}`);
  }
  return t.json();
}
export {
  rt as ActivityFeed,
  k as Avatar,
  pt as AvatarGroup,
  ot as Badge,
  ks as Banner,
  Us as BarChart,
  Ka as Breadcrumbs,
  g as Button,
  fe as CUSTOM_FIELD_TYPE_STORAGE_KEY,
  Ms as Card,
  Wa as CardHeader,
  Ja as ChannelHeader,
  Za as ChatComposer,
  Hs as Chip,
  Ua as CodeEditor,
  es as CollapsibleSection,
  Ga as ColorSchemeProvider,
  as as CommandPalette,
  ss as CommandPaletteHint,
  ts as CommandPaletteProvider,
  Gs as ConfirmDialog,
  Va as DEFAULT_PIPELINE_ICONS,
  de as DOCUMENT_TYPE_ICONS,
  rs as Drawer,
  qs as EmptyState,
  os as EntityCell,
  nt as FileUploadDrop,
  ns as FilterChip,
  is as FollowUpChips,
  ds as FormField,
  ge as IDENTITY_BASE_URL,
  Bs as IconButton,
  $a as IdentityProvider,
  cs as InlineAlert,
  ls as InlinePopover,
  Vs as LineChart,
  us as MessageBubble,
  L as Modal,
  it as NotificationCenter,
  ps as PageHeader,
  Es as PageSection,
  yt as PatchHttpError,
  St as PatchValidationRejectedError,
  dt as PresenceAvatars,
  _a as PresenceProvider,
  fs as ProgressBar,
  ms as ProjectCard,
  xs as QuickPromptGrid,
  Q as ResumeCallDialog,
  gs as SearchInput,
  hs as SegmentedControl,
  gt as SidebarRow,
  ht as SidebarSection,
  st as SkeletonCard,
  Ws as Sparkline,
  bs as Spinner,
  _s as StackedAreaChart,
  ys as StatCard,
  ct as StatusDot,
  Ss as SubNavLayout,
  lt as Switch,
  Rs as Table,
  As as TableBody,
  Fs as TableHead,
  Ns as TableRow,
  js as TableTd,
  Os as TableTh,
  za as TagEditor,
  Z as ThemeProvider,
  Cs as ThinkingBlock,
  ws as ThinkingDots,
  Ea as ToastProvider,
  vs as ToolCallPill,
  Ls as ToolCallStrip,
  Ps as UserMenu,
  Na as WebSocketProvider,
  Ct as applyPatch,
  J as borderRadius,
  q as colors,
  e as cssVar,
  N as darkTheme,
  Js as eventGlyphs,
  W as fontSize,
  wt as forceFail,
  Zs as getEventCategory,
  et as getEventGlyph,
  Et as getFieldType,
  Rt as getFieldTypes,
  ce as getPageConfig,
  le as getPagesView,
  vt as getPipelineRun,
  At as getRenderer,
  Lt as getRunAuditLog,
  he as identityApiFetch,
  G as injectThemeVars,
  me as isValidCustomFieldType,
  S as lightTheme,
  te as listDLQEntries,
  Pt as listPipelineRuns,
  Ft as listRegisteredRenderers,
  ue as makeEmptyField,
  ft as nameToColor,
  mt as nameToInitials,
  oe as purgeDLQEntries,
  F as rawBorderRadius,
  E as rawColors,
  A as rawFontSize,
  R as rawSpacing,
  Y as rawTokens,
  re as redriveDLQEntries,
  Nt as registerFieldType,
  jt as registerRenderer,
  Tt as resumeFromStep,
  It as retryFromNode,
  kt as revertPatch,
  Dt as searchAudit,
  ae as shadows,
  K as spacing,
  M as themeToCssVars,
  p as tokenToCssVarName,
  be as useActivityBus,
  ye as useApiCall,
  Se as useApiHealth,
  Ce as useAuth,
  Ye as useAwareness,
  qe as useAwarenessState,
  we as useCRDT,
  ve as useChat,
  Le as useClickOutside,
  Ke as useCollaborativeDoc,
  Ya as useColorScheme,
  Ts as useCommandPalette,
  ua as useComments,
  Pe as useCursors,
  Te as useCustomFieldTypes,
  ba as useDocTypeProposals,
  We as useDocumentComments,
  Je as useDocumentExport,
  Ze as useDocumentItems,
  ea as useDocumentMetadata,
  aa as useDocumentReviews,
  Da as useDocumentTypes,
  Ie as useDocuments,
  pa as useFriends,
  fa as useGroups,
  ke as useIdentityAdmin,
  De as useIdentityAudit,
  Me as useIdentityClients,
  Ba as useIdentityContext,
  Ee as useIdentityDiagnostics,
  Re as useIdentityEmailTemplates,
  Ae as useIdentityGroups,
  Fe as useIdentityMfa,
  Ne as useIdentityMfaAdmin,
  je as useIdentityPools,
  Oe as useIdentityResource,
  $e as useIdentitySetupStatus,
  Be as useIdentityUsers,
  sa as useIdleDetector,
  ya as useIngestAudit,
  Sa as useIngestDLQ,
  Ca as useIngestItems,
  wa as useIngestProgress,
  va as useIngestSources,
  Xe as useKeyboardShortcuts,
  ma as useLikes,
  La as useMappingReviewQueue,
  ta as useMentionUsers,
  ra as useMyMentionsAndTasks,
  Pa as usePipelineDefs,
  xa as usePosts,
  Ra as usePrefersReducedMotion,
  Ue as usePresence,
  Ha as usePresenceContext,
  Ve as useReactions,
  _e as useRooms,
  oa as useSectionList,
  ga as useSocialProfile,
  Ta as useSourceSloMetrics,
  Ia as useSyncConflicts,
  ee as useTheme,
  j as useThemeContext,
  Aa as useToast,
  ze as useTypedDocuments,
  He as useUrlFilterState,
  na as useVersionHistory,
  ia as useVideoCall,
  da as useVideoSessions,
  Qe as useWebSocket,
  ja as useWebSocketContext,
  ca as useYjsDoc,
  se as zIndex
};
