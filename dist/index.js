import { DOCUMENT_TYPE_ICONS as de, getPageConfig as ce, getPagesView as le, makeEmptyField as ue } from "./types.js";
import { C as fe, i as me } from "./fieldType-BJfRz7mO.js";
import { B as ge, a as he, u as be, b as ye, c as Se, d as Ce, e as we, f as ve, g as Le, h as Pe, i as Te, j as Ie, k as ke, l as De, m as Me, n as Ee, o as Re, p as Ae, q as Fe, r as Ne, s as je, t as Oe, v as $e, w as Be, x as Xe, y as Ue, z as Ve, A as _e, C as ze, D as He, E as Qe } from "./useWebSocket-xoTVPcp0.js";
import { u as Ye, a as qe, b as Ke, c as We, d as Je, e as Ze, f as es, g as ss, h as as, i as ts, j as rs, k as os, l as ns, m as is, n as ds, o as cs } from "./useVideoSessions-hr67KvHn.js";
import { u as us, a as ps, b as fs, c as ms, d as xs, e as gs } from "./useSocialProfile-D-SUgbn2.js";
import { u as bs, a as ys, b as Ss, c as Cs, d as ws, e as vs, f as Ls, g as Ps, h as Ts, i as Is } from "./useSyncConflicts-DruS2duy.js";
import { u as Ds } from "./useDocumentTypes-C29MkgPl.js";
import { T as Es, u as Rs, a as As } from "./ToastProvider-aHBNxMTO.js";
import { W as Ns, u as js } from "./WebSocketContext-DPGFyPeZ.js";
import { I as $s, u as Bs } from "./IdentityContext-CLalsm_M.js";
import { C as Us, D as Vs, P as _s, T as zs, u as Hs } from "./TagEditor-Dc6-WL1y.js";
import { C as Gs, u as Ys } from "./ThemeContext-Bi6AQuIL.js";
import { B as Ks, C as Ws, a as Js, b as Zs, c as ea, d as sa, e as aa, f as ta, D as ra, E as oa, F as na, g as ia, h as da, I as ca, i as la, M as ua, P as pa, j as fa, k as ma, Q as xa, S as ga, l as ha, m as ba, n as ya, o as Sa, T as Ca, p as wa, q as va, r as La, U as Pa, u as Ta } from "./InlinePopover-DWV6D_AI.js";
import { a as g } from "./Banner-B8AcwPH_.js";
import { B as ka } from "./Banner-B8AcwPH_.js";
import { C as Ma, P as Ea, T as Ra, a as Aa, b as Fa, c as Na, d as ja, e as Oa } from "./PageSection-B_nBFSjK.js";
import { I as Ba } from "./IconButton-Da1kJ5WO.js";
import { B as Ua, L as Va, S as _a } from "./Chart-ByoxeiYX.js";
import { C as Ha } from "./Chip-BXdhqVFm.js";
import { C as Ga } from "./ConfirmDialog-CNoxvYGu.js";
import { E as qa } from "./EmptyState-PM9wTjxk.js";
import { S as Wa, e as Ja, g as Za, a as et } from "./Sparkline-B8POanAQ.js";
import { jsx as n, jsxs as u, Fragment as h } from "react/jsx-runtime";
import "clsx";
import "tailwind-merge";
import { M as L } from "./Modal-2jg4229_.js";
import { S as at } from "./SkeletonCard-C89GWQ3p.js";
import { a as P } from "./Badge-CCsRykoK.js";
import { A as rt, b as ot, B as nt, F as it, N as dt, P as ct, S as lt, c as ut, n as pt, d as ft } from "./Badge-CCsRykoK.js";
import { useState as b, useEffect as y, createContext as T, useMemo as I, useContext as k } from "react";
import { S as xt, a as gt } from "./SidebarRow-Cw4xIxer.js";
import { P as bt, a as yt, b as St, f as Ct, g as wt, c as vt, l as Lt, r as Pt, d as Tt, e as It, s as kt } from "./pipelineAudit-HIi3aStK.js";
import "./index-BhrGxmJW.js";
import { g as Mt, a as Et, b as Rt, l as At, r as Ft, c as Nt } from "./registry-BZU57zws.js";
function D(s) {
  const a = Math.max(0, Math.floor(s / 1e3)), t = Math.floor(a / 3600), r = Math.floor(a % 3600 / 60), o = a % 60, d = String(r).padStart(2, "0"), c = String(o).padStart(2, "0");
  return t > 0 ? `${t}:${d}:${c}` : `${d}:${c}`;
}
function Q({
  open: s,
  onClose: a,
  onReconnect: t,
  callerName: r,
  lobbyName: o,
  elapsedMs: d,
  participants: c,
  loading: l = !1
}) {
  const [f, m] = b(null), [w, x] = b(() => Date.now());
  y(() => {
    if (!s) {
      m(null);
      return;
    }
    m(Date.now()), x(Date.now());
    const i = setInterval(() => x(Date.now()), 1e3);
    return () => clearInterval(i);
  }, [s]);
  const v = f !== null ? d + (w - f) : d;
  return /* @__PURE__ */ n(
    L,
    {
      open: s,
      onClose: a,
      title: "Reconnect to your call?",
      maxWidth: 420,
      footer: /* @__PURE__ */ u(h, { children: [
        /* @__PURE__ */ n(
          g,
          {
            variant: "ghost",
            size: "md",
            onClick: a,
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
                      ) : /* @__PURE__ */ n(P, { name: i.name, size: 20 }),
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
function p(s) {
  return `--ui-${s.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
}
function M(s) {
  const a = {};
  for (const t of Object.keys(s))
    a[p(t)] = s[t];
  return a;
}
function G(s) {
  const a = M(s);
  return `:root {
${Object.entries(a).map(([r, o]) => `  ${r}: ${o};`).join(`
`)}
}`;
}
function e(s) {
  return `var(${p(s)})`;
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
}, C = T(S);
function Z({ children: s, preset: a = "light", theme: t }) {
  const r = a === "dark" ? N : S, o = I(
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
  }, [o]), /* @__PURE__ */ n(C.Provider, { value: o, children: s });
}
function j() {
  return k(C);
}
function ee() {
  return j();
}
const se = {
  /** Subtle shadow for cards, panels */
  sm: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
  /** Medium shadow for dropdowns, popovers */
  md: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
  /** Strong shadow for modals, dialogs */
  lg: "0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)",
  /** Extra strong shadow for elevated modals */
  xl: "0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04)"
}, ae = {
  /** Sticky headers, fixed toolbars */
  sticky: 20,
  /** Dropdowns, popovers, tooltips */
  dropdown: 50,
  /** Modals, dialogs, overlays */
  modal: 100,
  /** Toast notifications (above modals) */
  toast: 200
};
async function te(s) {
  const a = new URLSearchParams();
  s?.limit && a.set("limit", String(s.limit)), s?.cursor && a.set("cursor", s.cursor), s?.errorKind && a.set("errorKind", s.errorKind), s?.sinceMs && a.set("sinceMs", String(s.sinceMs));
  const t = `/api/pipelines/dlq${a.toString() ? `?${a}` : ""}`, r = await fetch(t, {
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
async function re(s, a) {
  const t = await fetch("/api/pipelines/dlq/redrive", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      ids: s,
      ...a?.resetAttempts ? { resetAttempts: !0 } : {},
      ...a?.preview ? { preview: !0 } : {}
    })
  });
  if (!t.ok) {
    const r = await t.text();
    throw new Error(`Redrive failed: ${t.status} ${r}`);
  }
  return t.json();
}
async function oe(s, a) {
  const t = await fetch("/api/pipelines/dlq/purge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      ids: s,
      ...a?.preview ? { preview: !0 } : {}
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
  P as Avatar,
  ot as AvatarGroup,
  nt as Badge,
  ka as Banner,
  Ua as BarChart,
  Ks as Breadcrumbs,
  g as Button,
  fe as CUSTOM_FIELD_TYPE_STORAGE_KEY,
  Ma as Card,
  Ws as CardHeader,
  Js as ChannelHeader,
  Zs as ChatComposer,
  Ha as Chip,
  Us as CodeEditor,
  ea as CollapsibleSection,
  Gs as ColorSchemeProvider,
  sa as CommandPalette,
  aa as CommandPaletteHint,
  ta as CommandPaletteProvider,
  Ga as ConfirmDialog,
  Vs as DEFAULT_PIPELINE_ICONS,
  de as DOCUMENT_TYPE_ICONS,
  ra as Drawer,
  qa as EmptyState,
  oa as EntityCell,
  it as FileUploadDrop,
  na as FilterChip,
  ia as FollowUpChips,
  da as FormField,
  ge as IDENTITY_BASE_URL,
  Ba as IconButton,
  $s as IdentityProvider,
  ca as InlineAlert,
  la as InlinePopover,
  Va as LineChart,
  ua as MessageBubble,
  L as Modal,
  dt as NotificationCenter,
  pa as PageHeader,
  Ea as PageSection,
  bt as PatchHttpError,
  yt as PatchValidationRejectedError,
  ct as PresenceAvatars,
  _s as PresenceProvider,
  fa as ProgressBar,
  ma as ProjectCard,
  xa as QuickPromptGrid,
  Q as ResumeCallDialog,
  ga as SearchInput,
  ha as SegmentedControl,
  xt as SidebarRow,
  gt as SidebarSection,
  at as SkeletonCard,
  Wa as Sparkline,
  ba as Spinner,
  _a as StackedAreaChart,
  ya as StatCard,
  lt as StatusDot,
  Sa as SubNavLayout,
  ut as Switch,
  Ra as Table,
  Aa as TableBody,
  Fa as TableHead,
  Na as TableRow,
  ja as TableTd,
  Oa as TableTh,
  zs as TagEditor,
  Z as ThemeProvider,
  Ca as ThinkingBlock,
  wa as ThinkingDots,
  Es as ToastProvider,
  va as ToolCallPill,
  La as ToolCallStrip,
  Pa as UserMenu,
  Ns as WebSocketProvider,
  St as applyPatch,
  J as borderRadius,
  q as colors,
  e as cssVar,
  N as darkTheme,
  Ja as eventGlyphs,
  W as fontSize,
  Ct as forceFail,
  Za as getEventCategory,
  et as getEventGlyph,
  Mt as getFieldType,
  Et as getFieldTypes,
  ce as getPageConfig,
  le as getPagesView,
  wt as getPipelineRun,
  Rt as getRenderer,
  vt as getRunAuditLog,
  he as identityApiFetch,
  G as injectThemeVars,
  me as isValidCustomFieldType,
  S as lightTheme,
  te as listDLQEntries,
  Lt as listPipelineRuns,
  At as listRegisteredRenderers,
  ue as makeEmptyField,
  pt as nameToColor,
  ft as nameToInitials,
  oe as purgeDLQEntries,
  F as rawBorderRadius,
  E as rawColors,
  A as rawFontSize,
  R as rawSpacing,
  Y as rawTokens,
  re as redriveDLQEntries,
  Ft as registerFieldType,
  Nt as registerRenderer,
  Pt as resumeFromStep,
  Tt as retryFromNode,
  It as revertPatch,
  kt as searchAudit,
  se as shadows,
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
  Ys as useColorScheme,
  Ta as useCommandPalette,
  us as useComments,
  Pe as useCursors,
  Te as useCustomFieldTypes,
  bs as useDocTypeProposals,
  We as useDocumentComments,
  Je as useDocumentExport,
  Ze as useDocumentItems,
  es as useDocumentMetadata,
  ss as useDocumentReviews,
  Ds as useDocumentTypes,
  Ie as useDocuments,
  ps as useFriends,
  fs as useGroups,
  ke as useIdentityAdmin,
  De as useIdentityAudit,
  Me as useIdentityClients,
  Bs as useIdentityContext,
  Ee as useIdentityDiagnostics,
  Re as useIdentityEmailTemplates,
  Ae as useIdentityGroups,
  Fe as useIdentityMfa,
  Ne as useIdentityMfaAdmin,
  je as useIdentityPools,
  Oe as useIdentityResource,
  $e as useIdentitySetupStatus,
  Be as useIdentityUsers,
  as as useIdleDetector,
  ys as useIngestAudit,
  Ss as useIngestDLQ,
  Cs as useIngestItems,
  ws as useIngestProgress,
  vs as useIngestSources,
  Xe as useKeyboardShortcuts,
  ms as useLikes,
  Ls as useMappingReviewQueue,
  ts as useMentionUsers,
  rs as useMyMentionsAndTasks,
  Ps as usePipelineDefs,
  xs as usePosts,
  Rs as usePrefersReducedMotion,
  Ue as usePresence,
  Hs as usePresenceContext,
  Ve as useReactions,
  _e as useRooms,
  os as useSectionList,
  gs as useSocialProfile,
  Ts as useSourceSloMetrics,
  Is as useSyncConflicts,
  ee as useTheme,
  j as useThemeContext,
  As as useToast,
  ze as useTypedDocuments,
  He as useUrlFilterState,
  ns as useVersionHistory,
  is as useVideoCall,
  ds as useVideoSessions,
  Qe as useWebSocket,
  js as useWebSocketContext,
  cs as useYjsDoc,
  ae as zIndex
};
