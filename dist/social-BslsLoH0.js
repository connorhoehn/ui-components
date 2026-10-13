import { a as e, i as t, n, o as r, r as i, t as a } from "./useSocialProfile-5S1qyvsv.js";
import { t as o } from "./cn-D4QmbyEy.js";
import { n as s } from "./ToastProvider-CJAceUvq.js";
import { s as c } from "./usePromptContext-CUNhKC01.js";
import { n as l, o as u } from "./Button-uREUOWUk.js";
import { t as d } from "./Card-CbTNNNkk.js";
import { t as f } from "./Chip-DJyxHDn3.js";
import { t as p } from "./IconButton-IE5g44md.js";
import { H as m, K as h, Q as g, S as _, St as v, Z as y, h as b, k as x, lt as S, m as C, o as w, t as T, tt as E, w as D } from "./Icons-B_xESAH3.js";
import { c as O, i as k, l as A, t as j } from "./Text-DtCnB-EA.js";
import { t as M } from "./Banner-8ngXUtJu.js";
import { t as N } from "./Modal-DPLD8hWq.js";
import { t as P } from "./Input-DE3zl--S.js";
import { t as F } from "./Select-DcKBWGgP.js";
import { t as I } from "./InlinePopover-Cv9rmVEh.js";
import { t as L } from "./SearchInput-HK4TcIG4.js";
import { t as R } from "./DataTable-D01RJRFE.js";
import { t as z } from "./EmptyState-iFs0woF1.js";
import { n as B } from "./ThinkingDots-BZOWJ3Fp.js";
import { n as ee } from "./StatusPill-c89IbU1L.js";
import { t as te } from "./SkeletonCard-D3FL0TB7.js";
import { t as ne } from "./DropdownMenu-ddSmhqzy.js";
import { t as V } from "./Textarea-BwvE1HPn.js";
import { n as re, t as H } from "./Avatar-MKwdWqLr.js";
import { t as ie } from "./DotMeter-KxyExwVb.js";
import { t as U } from "./StatusDot-ClFcLvD7.js";
import { i as ae, n as W, r as oe, t as se } from "./ChoiceList-DFLtTVha.js";
import { t as G } from "./SegmentedControl-DzCwfWbm.js";
import { t as ce } from "./InlineAlert-CBtteaVZ.js";
import { t as le } from "./LogStream-Bk8DVIVb.js";
import { a as ue, n as de, o as fe, s as pe, t as me } from "./backdropTone-BzPocySl.js";
import { l as he } from "./railType-DaEA_kg6.js";
import { n as ge, s as _e, t as ve } from "./PopoverForm-CtdIKc4B.js";
import { t as ye } from "./InlinePlaceholder-CbIBYc-_.js";
import { t as be } from "./MetaLine-BtHTTScI.js";
import { F as xe, R as Se, j as Ce, lt as we, rt as Te, st as Ee, tt as De } from "./ConversationSurface-Dw1nRD09.js";
import "./ChatSidePanelRegistry-YW12xDGw.js";
import { t as Oe } from "./rovingFocus-Bj5Y6kwY.js";
import { n as ke, t as Ae } from "./ReactionPickerPopover-Dhgm8O2_.js";
import { n as je } from "./useComputeProjects-ZSazDRet.js";
import "./QuoteBlock-qqQqscMP.js";
import { i as Me, r as Ne } from "./composerSendError-DC0r4nYR.js";
import { r as Pe } from "./PaneStatusLine-_boWR8wZ.js";
import { Suspense as Fe, createContext as Ie, lazy as Le, useCallback as K, useContext as Re, useEffect as q, useId as ze, useMemo as J, useRef as Y, useState as X } from "react";
import { Fragment as Z, jsx as Q, jsxs as $ } from "react/jsx-runtime";
//#region src/components/hangout/InviteCandidateList.tsx
function Be({ candidates: e, onInvite: t, loading: n = !1, resetKey: r, children: i, tone: a = "light", searchable: s = !1, grouped: c = !1, selectMode: u = "multi", onPick: d, confirmLabel: f = "Invite", confirmLoadingLabel: p = "Inviting…", confirmCountLabel: m, className: h, "data-testid": g }) {
	let _ = a === "dark", v = u === "single", [y, b] = X(() => /* @__PURE__ */ new Set()), [x, S] = X("");
	q(() => {
		b(/* @__PURE__ */ new Set()), S("");
	}, [r]);
	let C = J(() => e.filter((e) => !e.alreadyInCall), [e]);
	q(() => {
		b((e) => {
			if (e.size === 0) return e;
			let t = new Set(C.map((e) => e.userId)), n = !1, r = /* @__PURE__ */ new Set();
			for (let i of e) t.has(i) ? r.add(i) : n = !0;
			return n ? r : e;
		});
	}, [C]);
	let w = J(() => {
		let t = x.trim().toLowerCase();
		return !s || !t ? e : e.filter((e) => e.name.toLowerCase().includes(t) || e.userId.toLowerCase().includes(t));
	}, [
		e,
		s,
		x
	]), T = (e) => {
		b((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), n;
		});
	}, E = y.size, D = (e) => {
		let t = !!e.alreadyInCall || !!e.disabled || n, r = !v && y.has(e.userId);
		return /* @__PURE__ */ Q("li", { children: /* @__PURE__ */ $("button", {
			type: "button",
			disabled: t,
			"aria-pressed": v ? void 0 : r,
			onClick: () => {
				v ? d?.(e.userId) : T(e.userId);
			},
			"data-testid": "invite-candidate",
			"data-user-id": e.userId,
			"data-selected": r ? "true" : "false",
			"data-already-in-call": e.alreadyInCall ? "true" : "false",
			"data-disabled": t ? "true" : "false",
			className: o("flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left", t ? "opacity-50 cursor-not-allowed" : o("cursor-pointer", _ ? "hover:bg-white/10" : "hover:bg-surface-hover"), r && (_ ? "bg-white/10" : "bg-surface-hover")),
			children: [
				/* @__PURE__ */ $("span", {
					className: "relative inline-flex shrink-0",
					children: [/* @__PURE__ */ Q(H, {
						name: e.name,
						src: e.avatarUrl,
						color: e.color,
						size: 24
					}), e.online !== void 0 && /* @__PURE__ */ Q(ae, {
						state: e.online ? "online" : "offline",
						pulse: !1,
						size: "xs",
						className: o("absolute -bottom-0.5 -right-0.5 rounded-full ring-2", _ ? "ring-call-chrome" : "ring-surface")
					})]
				}),
				/* @__PURE__ */ Q("span", {
					className: o("flex-1 truncate text-[13px]", _ ? "text-white" : "text-text-primary"),
					children: e.name
				}),
				e.online === !1 && e.lastSeenLabel && /* @__PURE__ */ Q("span", {
					"data-testid": "invite-candidate-last-seen",
					className: o("shrink-0 text-[11px]", _ ? "text-white/50" : "text-neutral"),
					children: e.lastSeenLabel
				}),
				e.statusLabel && !e.alreadyInCall && !e.pending && /* @__PURE__ */ Q("span", {
					"data-testid": "invite-candidate-status",
					className: o("shrink-0 text-[11px]", _ ? "text-white/50" : "text-neutral"),
					children: e.statusLabel
				}),
				e.alreadyInCall ? /* @__PURE__ */ Q("span", {
					className: o("text-[11px]", _ ? "text-white/50" : "text-neutral"),
					children: "In call"
				}) : e.pending ? /* @__PURE__ */ Q("span", {
					className: o("text-[11px]", _ ? "text-white/50" : "text-neutral"),
					children: "Ringing…"
				}) : v || e.disabled ? null : /* @__PURE__ */ Q("span", {
					"aria-hidden": "true",
					className: o("grid h-4 w-4 place-items-center rounded border text-[10px]", r ? "border-transparent bg-primary text-on-primary" : o("text-transparent", _ ? "border-white/30" : "border-border")),
					children: "✓"
				})
			]
		}) }, e.userId);
	}, O = (e, t) => /* @__PURE__ */ Q("li", {
		"data-testid": `people-group-${t}`,
		"aria-hidden": "true",
		className: o("px-2 pb-0.5 pt-2 text-[11px] font-semibold uppercase tracking-wide first:pt-0", _ ? "text-white/40" : "text-text-tertiary"),
		children: e
	}, `section-${t}`), k = c ? w.filter((e) => e.online === !0) : [], A = c ? w.filter((e) => e.online !== !0) : [], j = /* @__PURE__ */ $(Z, { children: [s && /* @__PURE__ */ Q(P, {
		type: "search",
		size: "sm",
		value: x,
		onChange: (e) => S(e.target.value),
		placeholder: "Search people",
		"aria-label": "Search people",
		"data-testid": "people-search",
		className: o("mb-1", _ && "border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
	}), e.length === 0 ? /* @__PURE__ */ Q("p", {
		className: o("m-0 text-[13px]", _ ? "text-white/60" : "text-text-secondary"),
		"data-testid": "invite-to-call-empty",
		children: c ? "No one to show yet." : "Nobody else is online right now."
	}) : C.length === 0 ? /* @__PURE__ */ Q("p", {
		className: o("m-0 text-[13px]", _ ? "text-white/60" : "text-text-secondary"),
		"data-testid": "invite-to-call-everyone-here",
		children: "Everyone who's online is already on this call."
	}) : w.length === 0 ? /* @__PURE__ */ $("p", {
		className: o("m-0 text-[13px]", _ ? "text-white/60" : "text-text-secondary"),
		"data-testid": "people-search-empty",
		children: [
			"No one matches “",
			x.trim(),
			"”."
		]
	}) : /* @__PURE__ */ Q("ul", {
		className: "flex flex-col gap-1 m-0 p-0 list-none max-h-[min(55vh,480px)] overflow-y-auto overscroll-contain [scrollbar-width:thin] [scrollbar-gutter:stable]",
		"aria-label": "People you can invite",
		children: c ? /* @__PURE__ */ $(Z, { children: [
			k.length > 0 && O("Online", "online"),
			k.map(D),
			A.length > 0 && O("Offline", "offline"),
			A.map(D)
		] }) : w.map(D)
	})] }), M = v ? null : /* @__PURE__ */ Q(l, {
		variant: "primary",
		size: "md",
		onClick: () => {
			let e = [...y];
			b(/* @__PURE__ */ new Set()), t(e);
		},
		disabled: n || E === 0,
		"data-autofocus": !0,
		"data-testid": g ? `${g}-confirm` : "invite-to-call-confirm",
		children: n ? p : E === 0 ? f : m ? m(E) : `${f} ${E} ${E === 1 ? "person" : "people"}`
	});
	return i ? /* @__PURE__ */ Q(Z, { children: i({
		list: j,
		confirm: M
	}) }) : /* @__PURE__ */ $("div", {
		className: o("flex flex-col gap-3", h),
		"data-testid": g,
		children: [j, M && /* @__PURE__ */ Q("div", {
			className: "flex justify-end",
			children: M
		})]
	});
}
//#endregion
//#region src/components/layout/WorkspaceRail.tsx
var Ve = o("inline-flex items-center gap-1 rounded border-0 bg-transparent p-0 text-[13px] font-medium text-primary no-underline", "cursor-pointer hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary");
function He({ title: e, label: t, actions: n, header: r, footer: i, children: a, width: s = "md", count: c, heading: l = "compact", countStyle: u = "chip", back: d, collapsed: m = !1, collapsedContent: h, onToggle: g, toggleLabel: _, toggleTestId: v, className: y, "data-testid": b = "workspace-rail" }) {
	let x = u === "plain" || l === "label", S = !!(e || n || g);
	_e(S && l === "compact");
	let w = _ ?? `${m ? "Show" : "Hide"} ${t ?? e ?? "the list"}`;
	return /* @__PURE__ */ $("nav", {
		"aria-label": t ?? e ?? "Workspace",
		"data-testid": b,
		"data-collapsed": m,
		className: o("flex h-full min-h-0 shrink-0 flex-col border-r border-border bg-surface-panel", m ? "w-9" : s === "xs" ? "w-[220px]" : s === "sm" ? "w-[240px]" : s === "ms" ? "w-[264px]" : s === "lg" ? "w-[368px]" : s === "ml" ? "w-[320px]" : "w-[300px]", y),
		children: [
			d && !m && /* @__PURE__ */ Q("div", {
				className: o("flex shrink-0 items-center pt-4", l === "compact" ? "px-3.5" : "px-5"),
				"data-testid": `${b}-back-row`,
				children: d.href ? /* @__PURE__ */ $("a", {
					href: d.href,
					onClick: d.onClick,
					className: Ve,
					"data-testid": `${b}-back`,
					children: [/* @__PURE__ */ Q(C, {
						dir: "left",
						size: 14
					}), d.label]
				}) : /* @__PURE__ */ $("button", {
					type: "button",
					onClick: d.onClick,
					className: Ve,
					"data-testid": `${b}-back`,
					children: [/* @__PURE__ */ Q(C, {
						dir: "left",
						size: 14
					}), d.label]
				})
			}),
			S && /* @__PURE__ */ $("div", {
				className: o("flex shrink-0 items-center gap-1", l === "compact" ? "h-9 border-b border-border" : "h-14", m ? "justify-center" : l === "compact" ? "pl-3.5 pr-1.5" : "pl-5 pr-3"),
				"data-testid": `${b}-header`,
				children: [
					!m && (e ? /* @__PURE__ */ $("h2", {
						className: o("m-0 flex min-w-0 flex-1 items-center gap-2 text-text-primary", l === "prominent" ? "text-[18px] font-semibold" : l === "label" ? o("text-[11px] font-semibold uppercase leading-4 tracking-wide", "text-text-secondary") : l === "caption" ? "text-[12px] font-semibold uppercase tracking-[0.06em]" : "text-[12px] font-semibold"),
						"data-testid": `${b}-title`,
						children: [
							/* @__PURE__ */ Q("span", {
								className: "min-w-0 truncate",
								children: e
							}),
							typeof c == "number" && x && /* @__PURE__ */ Q("span", {
								className: o("shrink-0", l === "label" ? "text-[11px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary" : "text-[13px] font-medium text-text-secondary"),
								"aria-label": `${c} items`,
								"data-testid": `${b}-count`,
								"data-count-style": "plain",
								children: c
							}),
							typeof c == "number" && !x && /* @__PURE__ */ Q(f, {
								size: l === "prominent" ? "md" : l === "caption" ? "sm" : "xs",
								tone: "neutral",
								className: "shrink-0",
								"aria-label": `${c} items`,
								"data-testid": `${b}-count`,
								children: c
							})
						]
					}) : /* @__PURE__ */ Q("span", { className: "flex-1" })),
					!m && n != null && /* @__PURE__ */ Q("div", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${b}-actions`,
						children: n
					}),
					g && /* @__PURE__ */ Q(p, {
						size: "sm",
						variant: "ghost",
						"aria-label": w,
						title: w,
						"aria-expanded": !m,
						onClick: g,
						icon: /* @__PURE__ */ Q(C, {
							dir: m ? "right" : "left",
							size: 14
						}),
						"data-testid": v ?? `${b}-${m ? "unfold" : "fold"}`
					})
				]
			}),
			!m && r && /* @__PURE__ */ Q("div", {
				className: o("shrink-0 py-3", l === "compact" ? "px-3.5" : "px-5 pt-0"),
				children: r
			}),
			/* @__PURE__ */ Q("div", {
				className: "min-h-0 flex-1 overflow-y-auto overflow-x-hidden",
				"data-testid": `${b}-scroll`,
				children: m ? h : a
			}),
			!m && i && /* @__PURE__ */ Q("div", {
				className: "shrink-0 border-t border-border px-3.5 py-2",
				children: i
			})
		]
	});
}
//#endregion
//#region src/components/social/SocialPanel.tsx
function Ue(e, t) {
	return {
		id: e.userId,
		displayName: e.displayName,
		bio: "",
		avatarUrl: e.avatarUrl ?? null,
		visibility: e.visibility,
		followState: t
	};
}
function We(e) {
	return {
		id: e.userId,
		displayName: e.displayName,
		bio: e.bio ?? "",
		avatarUrl: e.avatarUrl ?? null,
		visibility: e.visibility
	};
}
function Ge({ user: e, size: t }) {
	let n = e.displayName.slice(0, 2).toUpperCase();
	return e.avatarUrl ? /* @__PURE__ */ Q("div", {
		className: o("rounded-full bg-border flex items-center justify-center font-semibold text-text-primary shrink-0 overflow-hidden", t === 48 ? "w-12 h-12 text-base" : "w-8 h-8 text-xs"),
		children: /* @__PURE__ */ Q("img", {
			src: e.avatarUrl,
			alt: `${e.displayName}'s avatar`,
			className: "w-full h-full object-cover"
		})
	}) : /* @__PURE__ */ Q("div", {
		className: o("rounded-full bg-border flex items-center justify-center font-semibold text-text-primary shrink-0 overflow-hidden", t === 48 ? "w-12 h-12 text-base" : "w-8 h-8 text-xs"),
		"aria-label": `Avatar placeholder for ${e.displayName}`,
		children: n
	});
}
function Ke({ targetUser: e, followState: t, compact: n = !1, onFollowChange: r }) {
	let [i, a] = X(!1);
	return t === "not-following" ? /* @__PURE__ */ Q("button", {
		className: o("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border-none font-[system-ui,-apple-system,sans-serif] bg-primary text-on-primary font-semibold", n ? "h-7" : "h-9"),
		onClick: () => {
			r(e.id, "pending");
		},
		"aria-label": `Follow ${e.displayName}`,
		children: "Follow"
	}) : t === "pending" ? /* @__PURE__ */ Q("button", {
		className: o("rounded-lg text-sm min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface-hover text-text-secondary font-normal cursor-default", n ? "h-7" : "h-9"),
		disabled: !0,
		"aria-label": `Follow ${e.displayName}`,
		children: "Following…"
	}) : /* @__PURE__ */ $("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ Q("button", {
			className: o("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface text-text-primary font-normal", n ? "h-7" : "h-9"),
			onClick: () => a(!0),
			"aria-label": `Unfollow ${e.displayName}`,
			children: "Following"
		}), i && /* @__PURE__ */ $("div", {
			role: "group",
			"aria-label": "Confirm unfollow",
			className: "flex gap-2 items-center",
			children: [
				/* @__PURE__ */ $("span", {
					className: "text-sm text-text-primary mr-1",
					children: [
						"Unfollow ",
						e.displayName,
						"?"
					]
				}),
				/* @__PURE__ */ Q("button", {
					onClick: () => a(!1),
					className: "h-9 rounded-lg text-sm px-3 bg-surface text-text-primary border border-border cursor-pointer font-[system-ui,-apple-system,sans-serif]",
					children: "Keep Following"
				}),
				/* @__PURE__ */ Q("button", {
					onClick: () => {
						a(!1), r(e.id, "not-following");
					},
					className: "h-9 rounded-lg text-sm px-3 bg-danger text-white border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
					children: "Unfollow"
				})
			]
		})]
	});
}
function qe({ user: e, isOwnProfile: t, onSave: n }) {
	let [r, i] = X(!1), [a, s] = X(e.displayName), [c, l] = X(e.bio), [u, d] = X(e.avatarUrl ?? ""), [f, p] = X(e.visibility), [m, h] = X(!1), [g, _] = X(null), v = ze();
	q(() => {
		s(e.displayName), l(e.bio), d(e.avatarUrl ?? ""), p(e.visibility);
	}, [e.id]);
	let y = async () => {
		h(!0), _(null);
		try {
			await n({
				displayName: a,
				bio: c,
				avatarUrl: u || void 0,
				visibility: f
			}), i(!1);
		} catch (e) {
			_(e instanceof Error ? e.message : "Failed to save profile");
		} finally {
			h(!1);
		}
	};
	return r ? /* @__PURE__ */ $("div", { children: [
		/* @__PURE__ */ $("div", {
			className: "mb-3",
			children: [/* @__PURE__ */ Q("label", {
				htmlFor: `${v}-display-name`,
				className: "text-sm text-text-primary block mb-1",
				children: "Display name"
			}), /* @__PURE__ */ Q(P, {
				id: `${v}-display-name`,
				value: a,
				onChange: (e) => s(e.target.value.slice(0, 50)),
				placeholder: "Your name",
				maxLength: 50
			})]
		}),
		/* @__PURE__ */ $("div", {
			className: "mb-3",
			children: [/* @__PURE__ */ Q("label", {
				htmlFor: `${v}-bio`,
				className: "text-sm text-text-primary block mb-1",
				children: "Bio"
			}), /* @__PURE__ */ Q(V, {
				id: `${v}-bio`,
				value: c,
				onChange: (e) => l(e.target.value.slice(0, 160)),
				placeholder: "Tell people a bit about yourself (max 160 characters)",
				maxLength: 160,
				rows: 3,
				className: "resize-y"
			})]
		}),
		/* @__PURE__ */ $("div", {
			className: "mb-4",
			children: [/* @__PURE__ */ Q("label", {
				htmlFor: `${v}-avatar-url`,
				className: "text-sm text-text-primary block mb-1",
				children: "Avatar URL"
			}), /* @__PURE__ */ Q(P, {
				id: `${v}-avatar-url`,
				value: u,
				onChange: (e) => d(e.target.value),
				placeholder: "https://example.com/avatar.png"
			})]
		}),
		/* @__PURE__ */ Q("div", {
			className: "mb-4",
			children: /* @__PURE__ */ Q("div", {
				role: "radiogroup",
				"aria-label": "Profile visibility",
				onKeyDown: (e) => Oe(e, { itemSelector: "[role=\"radio\"]" }),
				className: "flex gap-2",
				children: ["public", "private"].map((e) => /* @__PURE__ */ Q("button", {
					type: "button",
					role: "radio",
					"aria-checked": f === e,
					tabIndex: f === e ? 0 : -1,
					onClick: () => p(e),
					className: o("px-4 py-1 rounded-full text-sm cursor-pointer border border-border font-[system-ui,-apple-system,sans-serif]", f === e ? "bg-primary text-on-primary" : "bg-surface text-text-primary"),
					children: e.charAt(0).toUpperCase() + e.slice(1)
				}, e))
			})
		}),
		/* @__PURE__ */ $("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ Q("button", {
				onClick: () => {
					y();
				},
				disabled: m,
				className: o("flex-1 h-9 bg-primary text-on-primary border-none rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", m ? "cursor-default" : "cursor-pointer"),
				children: m ? "Saving…" : "Save Changes"
			}), /* @__PURE__ */ Q("button", {
				onClick: () => i(!1),
				className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Discard Changes"
			})]
		}),
		g && /* @__PURE__ */ Q("div", {
			role: "alert",
			"data-testid": "profile-save-error",
			className: "text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
			children: g
		})
	] }) : /* @__PURE__ */ $("div", { children: [
		/* @__PURE__ */ $("div", {
			className: "flex items-start gap-3 mb-3",
			children: [/* @__PURE__ */ Q(Ge, {
				user: e,
				size: 48
			}), /* @__PURE__ */ $("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ $("div", {
					className: "flex items-center gap-2 mb-1",
					children: [/* @__PURE__ */ Q("span", {
						className: "text-xl font-semibold text-text-primary",
						children: e.displayName
					}), /* @__PURE__ */ Q("span", {
						className: o("text-xs px-2 py-0.5 rounded", e.visibility === "public" ? "bg-success-bg text-success" : "bg-surface-hover text-text-secondary"),
						children: e.visibility === "public" ? "Public" : "Private"
					})]
				}), /* @__PURE__ */ Q("p", {
					className: "text-base text-text-primary m-0 overflow-hidden line-clamp-3",
					children: e.bio
				})]
			})]
		}),
		/* @__PURE__ */ $("div", {
			className: "flex gap-4 text-sm text-text-secondary mb-3",
			children: [
				/* @__PURE__ */ $("span", { children: [/* @__PURE__ */ Q("strong", {
					className: "text-text-primary",
					children: e.followersCount ?? "—"
				}), " Followers"] }),
				/* @__PURE__ */ $("span", { children: [/* @__PURE__ */ Q("strong", {
					className: "text-text-primary",
					children: e.followingCount ?? "—"
				}), " Following"] }),
				/* @__PURE__ */ $("span", { children: [/* @__PURE__ */ Q("strong", {
					className: "text-text-primary",
					children: e.friendsCount ?? "—"
				}), " Friends"] })
			]
		}),
		t && /* @__PURE__ */ Q("button", {
			onClick: () => i(!0),
			className: "text-sm text-primary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
			children: "Edit profile"
		})
	] });
}
function Je({ followers: e, following: t, friends: n, followStates: r, onFollowChange: i, loadError: a }) {
	let [s, c] = X("followers"), l = (e) => a ? "" : ` (${e.length})`, u = [
		{
			key: "followers",
			label: `Followers${l(e)}`,
			users: e
		},
		{
			key: "following",
			label: `Following${l(t)}`,
			users: t
		},
		{
			key: "friends",
			label: `Friends${l(n)}`,
			users: n
		}
	], d = {
		followers: {
			heading: "No followers yet",
			body: "When someone follows you, they'll appear here."
		},
		following: {
			heading: "Not following anyone yet",
			body: "Find people to follow from the profile list above."
		},
		friends: {
			heading: "No mutual friends yet",
			body: "Mutual follows become friends. Start by following someone."
		}
	}, f = u.find((e) => e.key === s)?.users ?? [];
	return /* @__PURE__ */ $("div", {
		className: "mt-4",
		children: [/* @__PURE__ */ Q("div", {
			role: "tablist",
			"aria-label": "Connections",
			onKeyDown: Oe,
			className: "flex border-b border-border mb-3",
			children: u.map((e) => /* @__PURE__ */ Q("button", {
				type: "button",
				role: "tab",
				id: `social-tab-${e.key}`,
				"aria-controls": "social-tabpanel",
				"aria-selected": s === e.key,
				tabIndex: s === e.key ? 0 : -1,
				onClick: () => c(e.key),
				className: o("px-4 py-2 text-sm font-normal bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif] -mb-px", s === e.key ? "text-text-primary border-b-2 border-b-primary" : "text-text-secondary border-b-2 border-b-transparent"),
				children: e.label
			}, e.key))
		}), /* @__PURE__ */ Q("div", {
			role: "tabpanel",
			id: "social-tabpanel",
			"aria-labelledby": `social-tab-${s}`,
			className: "min-h-[120px]",
			children: a && f.length === 0 ? /* @__PURE__ */ $("div", {
				role: "alert",
				"data-testid": "social-graph-error",
				className: "py-6 text-center",
				children: [/* @__PURE__ */ Q("div", {
					className: "text-sm font-semibold text-danger-fg mb-1",
					children: "Couldn’t load your connections"
				}), /* @__PURE__ */ Q("div", {
					className: "text-sm text-text-tertiary",
					children: a
				})]
			}) : f.length === 0 ? /* @__PURE__ */ $("div", {
				className: "py-6 text-center",
				children: [/* @__PURE__ */ Q("div", {
					className: "text-sm font-semibold text-text-primary mb-1",
					children: d[s].heading
				}), /* @__PURE__ */ Q("div", {
					className: "text-sm text-text-tertiary",
					children: d[s].body
				})]
			}) : /* @__PURE__ */ Q("div", { children: f.map((e) => /* @__PURE__ */ $("div", {
				className: "flex items-center gap-2 h-14 border-b border-surface-hover",
				children: [
					/* @__PURE__ */ Q(Ge, {
						user: e,
						size: 32
					}),
					/* @__PURE__ */ $("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ Q("div", {
							className: "text-base text-text-primary",
							children: e.displayName
						}), /* @__PURE__ */ Q("div", {
							className: "text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap max-w-[240px]",
							children: e.visibility === "private" ? /* @__PURE__ */ Q("em", {
								className: "text-text-tertiary",
								children: "This profile is private."
							}) : e.bio
						})]
					}),
					/* @__PURE__ */ Q(Ke, {
						targetUser: e,
						followState: r[e.id] ?? "not-following",
						compact: !0,
						onFollowChange: i
					})
				]
			}, e.id)) })
		})]
	});
}
function Ye({ idToken: t, onMessage: n }) {
	let { profile: r, loading: i, error: o, updateProfile: s } = a({ idToken: t }), { followers: c, following: l, friends: u, follow: d, unfollow: f, error: p, loadError: m } = e({ idToken: t }), h = new Set(l.map((e) => e.userId)), g = {};
	[
		...c,
		...l,
		...u
	].forEach((e) => {
		g[e.userId] = h.has(e.userId) ? "following" : "not-following";
	});
	let [_, v] = X(null), y = async (e, t) => {
		v(null);
		try {
			t === "following" || t === "pending" ? await d(e) : await f(e);
		} catch (e) {
			v(e instanceof Error ? e.message : "Follow action failed");
		}
	}, b = c.map((e) => Ue(e, g[e.userId] ?? "not-following")), x = l.map((e) => Ue(e, "following")), S = u.map((e) => Ue(e, "following")), C = r ? {
		...We(r),
		followersCount: m ? void 0 : c.length,
		followingCount: m ? void 0 : l.length,
		friendsCount: m ? void 0 : u.length
	} : null;
	return /* @__PURE__ */ $("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ Q("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
				children: "Social Profile"
			}),
			i && !C ? /* @__PURE__ */ Q("div", {
				className: "py-10 text-center text-text-tertiary text-sm",
				children: "Loading profile…"
			}) : C ? /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q(qe, {
				user: C,
				isOwnProfile: !0,
				onSave: s
			}), /* @__PURE__ */ Q(Je, {
				followers: b,
				following: x,
				friends: S,
				followStates: g,
				onFollowChange: y,
				loadError: m
			})] }) : null,
			(_ ?? o ?? p) && /* @__PURE__ */ Q("div", {
				role: "alert",
				"data-testid": "social-panel-error",
				className: "text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
				children: _ ?? o ?? p
			})
		]
	});
}
//#endregion
//#region src/components/social/NewConversationPanel.tsx
function Xe(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64);
}
function Ze({ people: e, onStartDm: t, onCreateChannel: n, onCancel: r, peopleError: i = null, busy: a = !1, className: s, "data-testid": c = "new-conversation" }) {
	let [l, u] = X(""), d = Y(null), f = J(() => {
		let t = l.trim().toLowerCase();
		return t ? e.filter((e) => e.displayName.toLowerCase().includes(t)) : e;
	}, [e, l]), p = Xe(l), m = !!n && p.length > 0;
	return /* @__PURE__ */ $("div", {
		"data-testid": c,
		className: o("flex flex-col gap-1 rounded-lg border border-border bg-surface p-2", s),
		children: [/* @__PURE__ */ $("div", {
			className: "flex items-center gap-1.5",
			children: [/* @__PURE__ */ Q(P, {
				ref: d,
				size: "sm",
				autoFocus: !0,
				value: l,
				onChange: (e) => u(e.target.value),
				onKeyDown: (e) => {
					e.key === "Escape" && r?.(), e.key === "Enter" && (f.length === 1 ? t(f[0].userId) : f.length === 0 && m && n?.(p));
				},
				placeholder: "Search people, or name a new channel",
				"aria-label": "Search people, or name a new channel",
				"data-testid": `${c}-query`,
				disabled: a,
				className: "min-w-0 flex-1"
			}), r && /* @__PURE__ */ Q("button", {
				type: "button",
				onClick: r,
				disabled: a,
				"data-testid": `${c}-cancel`,
				className: "rounded px-2 py-1 text-xs text-text-secondary hover:bg-surface-hover",
				children: "Cancel"
			})]
		}), i ? /* @__PURE__ */ $("p", {
			role: "alert",
			"data-testid": `${c}-error`,
			className: "m-0 px-1 py-1.5 text-xs text-danger-fg",
			children: ["Couldn’t load people. ", i]
		}) : /* @__PURE__ */ $("ul", {
			className: "m-0 flex max-h-64 list-none flex-col gap-0.5 overflow-y-auto p-0",
			children: [
				f.map((e) => /* @__PURE__ */ Q("li", { children: /* @__PURE__ */ $("button", {
					type: "button",
					onClick: () => void t(e.userId),
					disabled: a,
					"data-testid": `${c}-person`,
					className: "flex w-full items-center gap-2 rounded px-1.5 py-1.5 text-left hover:bg-surface-hover",
					children: [/* @__PURE__ */ Q(H, {
						name: e.displayName,
						src: e.avatarUrl,
						color: e.color,
						size: 26
					}), /* @__PURE__ */ $("span", {
						className: "flex min-w-0 flex-col",
						children: [/* @__PURE__ */ Q("span", {
							className: "truncate text-[13px] text-text-primary",
							children: e.displayName
						}), e.hint && /* @__PURE__ */ Q("span", {
							className: "truncate text-[11px] text-text-tertiary",
							children: e.hint
						})]
					})]
				}) }, e.userId)),
				f.length === 0 && !m && /* @__PURE__ */ Q("li", {
					className: "px-1.5 py-2 text-xs text-text-secondary",
					"data-testid": `${c}-empty`,
					children: l.trim() ? "Nobody by that name." : "Nobody to talk to yet."
				}),
				m && /* @__PURE__ */ Q("li", { children: /* @__PURE__ */ $("button", {
					type: "button",
					onClick: () => void n?.(p),
					disabled: a,
					"data-testid": `${c}-create-channel`,
					className: "flex w-full items-center gap-2 rounded px-1.5 py-1.5 text-left hover:bg-surface-hover",
					children: [/* @__PURE__ */ Q("span", {
						"aria-hidden": !0,
						className: "grid h-[26px] w-[26px] shrink-0 place-items-center rounded-lg bg-surface-inset text-sm text-text-secondary",
						children: "#"
					}), /* @__PURE__ */ $("span", {
						className: "min-w-0 truncate text-[13px] text-text-primary",
						children: ["Create channel ", /* @__PURE__ */ $("span", {
							className: "font-semibold",
							children: ["#", p]
						})]
					})]
				}) })
			]
		})]
	});
}
//#endregion
//#region src/components/social/ConversationList.tsx
function Qe(e, t) {
	let n = e.lastMessageAt ? Date.parse(e.lastMessageAt) : NaN, r = t.lastMessageAt ? Date.parse(t.lastMessageAt) : NaN, i = Number.isNaN(n) ? null : n, a = Number.isNaN(r) ? null : r;
	return i === null && a === null ? 0 : i === null ? 1 : a === null ? -1 : a - i;
}
function $e({ items: e, grouped: t = !1, sectionOrder: n = "channels-first", sectionActions: r, collapsedSections: i, onToggleSection: a, onStartCall: s, sortByRecency: c = !0, maxVisible: l, activeChannel: u, onSelect: d, onNewChat: f, emptyLabel: p = "No conversations yet", onTogglePin: m, onToggleMute: h, onMarkUnread: _, onRename: b, canRename: S, onSetSection: C, tone: T = "light", className: E, "data-testid": O }) {
	let k = T === "dark", A = O ?? "conversation", j = a !== void 0, M = ze(), N = (e, t) => `${M}${e.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${t}`, P = c ? [...e].sort(Qe) : e, F = [], I = P.filter((e) => e.pinned), L = I.length > 0 ? P.filter((e) => !e.pinned) : P;
	I.length > 0 && F.push({
		heading: "Pinned",
		label: "Pinned",
		items: I
	});
	let R = (e) => (e.section ?? "").trim(), z = L.filter((e) => R(e) !== ""), B = z.length > 0 ? L.filter((e) => R(e) === "") : L;
	if (z.length > 0) {
		let e = /* @__PURE__ */ new Map();
		for (let t of z) {
			let n = R(t), r = e.get(n);
			r ? r.push(t) : e.set(n, [t]);
		}
		for (let t of [...e.keys()].sort((e, t) => e.localeCompare(t))) F.push({
			heading: t,
			label: t,
			items: e.get(t)
		});
	}
	if (t) {
		let e = (e) => (e.kind ?? (e.peers.length > 1 ? "group" : "dm")) === "channel", t = B.filter(e), r = B.filter((t) => !e(t)), i = {
			heading: "Channels",
			label: "Channels",
			items: t
		}, a = {
			heading: "Direct messages",
			label: "Direct messages",
			items: r
		}, o = n === "dms-first" ? [a, i] : [i, a];
		for (let e of o) e.items.length > 0 && F.push(e);
	} else B.length > 0 && F.push({
		label: "Conversations",
		items: B
	});
	let [ee, te] = X(() => /* @__PURE__ */ new Set()), V = F.map((e) => {
		let t = j && e.heading !== void 0, n = t && i?.[e.label] === !0, r = l !== void 0 && l >= 0 && e.items.length > l, a = {
			...e,
			collapsible: t,
			collapsed: n,
			capped: r
		};
		if (!r || ee.has(e.label)) return {
			...a,
			shown: e.items,
			hidden: 0
		};
		let o = e.items.slice(0, l), s = u ? e.items.find((e) => e.channel === u) : void 0;
		return s && !o.includes(s) && (o = l === 0 ? [s] : [...o.slice(0, -1), s]), {
			...a,
			shown: o,
			hidden: e.items.length - o.length
		};
	}), ie = (e) => te((t) => {
		let n = new Set(t);
		return n.has(e) ? n.delete(e) : n.add(e), n;
	}), U = V.flatMap((e) => e.collapsed ? [] : e.shown), W = Y(null), [oe, se] = X(null), G = (oe && U.some((e) => e.channel === oe) ? oe : null) ?? (u && U.some((e) => e.channel === u) ? u : null) ?? U[0]?.channel ?? null, ce = Y(null);
	q(() => {
		let e = ce.current;
		if (!e) return;
		ce.current = null;
		let t = W.current?.querySelector(`[data-testid="conversation-row"][data-channel="${CSS.escape(e)}"]`);
		t?.focus(), t?.scrollIntoView({ block: "nearest" });
	});
	function le(e) {
		let t = Math.max(0, Math.min(U.length - 1, e)), n = U[t];
		!n || n.channel === G || (ce.current = n.channel, se(n.channel));
	}
	function ue(e) {
		if (U.length === 0) return;
		let t = U.findIndex((e) => e.channel === G), n = t < 0 ? 0 : t;
		switch (e.key) {
			case "ArrowDown":
				le(n + 1);
				break;
			case "ArrowUp":
				le(n - 1);
				break;
			case "Home":
				le(0);
				break;
			case "End":
				le(U.length - 1);
				break;
			default: return;
		}
		e.preventDefault();
	}
	return /* @__PURE__ */ $("div", {
		className: o("flex min-h-0 flex-col gap-1", E),
		"data-testid": O,
		children: [f && /* @__PURE__ */ $("button", {
			type: "button",
			onClick: f,
			"data-testid": "conversation-new-chat",
			className: o("flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] font-medium", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", k ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"),
			children: [/* @__PURE__ */ Q("span", {
				"aria-hidden": "true",
				className: o("grid h-6 w-6 place-items-center rounded-full border border-dashed text-sm leading-none", k ? "border-white/30" : "border-border"),
				children: "+"
			}), "New chat"]
		}), e.length === 0 ? /* @__PURE__ */ Q("p", {
			className: o("m-0 px-2 py-1.5 text-[13px]", k ? "text-white/60" : "text-text-secondary"),
			"data-testid": "conversation-empty",
			children: p
		}) : /* @__PURE__ */ Q("div", {
			ref: W,
			onKeyDown: ue,
			className: "m-0 flex min-h-0 flex-col overflow-y-auto p-0",
			children: V.map((e) => {
				let t = N(e.label, "content"), n = N(e.label, "toggle"), i = e.collapsed ? null : /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q("ul", {
					className: "m-0 flex list-none flex-col gap-0.5 p-0",
					"aria-label": e.collapsible ? void 0 : e.label,
					"aria-labelledby": e.collapsible ? n : void 0,
					children: e.shown.map((e) => {
						let t = e.channel === u, n = e.channel === G, r = e.kind ?? (e.peers.length > 1 ? "group" : "dm"), i = r === "channel", a = r === "group", c = e.peers[0], l = i ? e.name ?? e.channel : e.peers.map((e) => e.displayName).join(", "), f = e.lastMessageAt ? Te(e.lastMessageAt) : "", p = e.lastMessageAt ? Ee(e.lastMessageAt) : "", T = e.unreadCount ?? 0, E = !!e.mentioned, O = !!e.live, j = !!e.muted, M = `${A}-row-menu-${e.channel}`, N = [];
						return s && (N.push({
							label: "Call",
							icon: /* @__PURE__ */ Q(y, { size: 14 }),
							onSelect: () => s(e.channel, "audio"),
							"data-testid": `${M}-call`
						}), N.push({
							label: "Video call",
							icon: /* @__PURE__ */ Q(v, { size: 14 }),
							onSelect: () => s(e.channel, "video"),
							"data-testid": `${M}-video-call`
						})), m && N.push({
							label: e.pinned ? "Unpin" : "Pin",
							icon: /* @__PURE__ */ Q(g, { size: 14 }),
							onSelect: () => m(e.channel, !e.pinned),
							"data-testid": `${M}-pin`
						}), h && N.push({
							label: j ? "Unmute" : "Mute",
							icon: /* @__PURE__ */ Q(w, { size: 14 }),
							onSelect: () => h(e.channel, !j),
							"data-testid": `${M}-mute`
						}), b && (!S || S(e)) && N.push({
							label: "Rename",
							icon: /* @__PURE__ */ Q(D, { size: 14 }),
							onSelect: () => b(e.channel),
							"data-testid": `${M}-rename`
						}), C && N.push({
							label: R(e) ? `Move from ${R(e)}\u2026` : "Move to section…",
							icon: /* @__PURE__ */ Q(x, { size: 14 }),
							onSelect: () => C(e.channel),
							"data-testid": `${M}-section`
						}), _ && T === 0 && N.push({
							label: "Mark as unread",
							onSelect: () => _(e.channel),
							"data-testid": `${M}-unread`
						}), /* @__PURE__ */ $("li", {
							className: o("relative", N.length > 0 && "group"),
							children: [/* @__PURE__ */ $("button", {
								type: "button",
								onClick: () => d(e.channel),
								onFocus: () => se(e.channel),
								"data-testid": "conversation-row",
								"data-channel": e.channel,
								"data-active": t ? "true" : "false",
								"aria-current": t ? "true" : void 0,
								tabIndex: n ? 0 : -1,
								className: o("flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-left", N.length > 0 && "pr-8", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", k ? "hover:bg-white/10" : "hover:bg-surface-hover", t && (k ? "bg-white/10" : "bg-surface-hover")),
								children: [
									i ? /* @__PURE__ */ Q("span", {
										"aria-hidden": "true",
										"data-testid": "conversation-channel-glyph",
										className: o("grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[15px] font-semibold leading-none", k ? "bg-white/10 text-white/70" : "bg-surface-inset text-text-secondary"),
										children: "#"
									}) : a ? /* @__PURE__ */ Q(re, {
										size: 28,
										maxVisible: 2,
										items: e.peers.map((e) => ({
											name: e.displayName,
											color: e.color,
											src: e.avatarUrl
										}))
									}) : c ? /* @__PURE__ */ $("span", {
										className: "relative inline-flex shrink-0",
										children: [/* @__PURE__ */ Q(H, {
											name: c.displayName,
											color: c.color,
											src: c.avatarUrl,
											size: 28
										}), c.online !== void 0 && /* @__PURE__ */ Q(ae, {
											state: c.online ? "online" : "offline",
											pulse: !1,
											className: o("absolute -bottom-0.5 -right-0.5 rounded-full ring-2", k ? "ring-call-chrome" : "ring-surface")
										})]
									}) : null,
									/* @__PURE__ */ $("span", {
										className: "flex min-w-0 flex-1 flex-col",
										children: [/* @__PURE__ */ $("span", {
											className: "flex items-baseline gap-2",
											children: [
												/* @__PURE__ */ Q("span", {
													className: o("min-w-0 flex-1 truncate text-[13px]", T > 0 ? "font-semibold" : "font-medium", k ? "text-white" : "text-text-primary"),
													children: l
												}),
												e.pinned && /* @__PURE__ */ Q("span", {
													"data-testid": `${A}-pinned`,
													title: "Pinned",
													className: o("shrink-0", k ? "text-white/50" : "text-text-tertiary"),
													children: /* @__PURE__ */ Q(g, { size: 12 })
												}),
												j && /* @__PURE__ */ Q("span", {
													"data-testid": `${A}-muted`,
													title: "Muted",
													className: o("shrink-0", k ? "text-white/50" : "text-text-tertiary"),
													children: /* @__PURE__ */ Q(w, { size: 12 })
												}),
												f && /* @__PURE__ */ Q("time", {
													dateTime: e.lastMessageAt,
													title: p,
													className: o("shrink-0 text-[11px] tabular-nums", k ? "text-white/50" : "text-text-tertiary"),
													"data-testid": "conversation-time",
													children: f
												})
											]
										}), e.lastMessagePreview && /* @__PURE__ */ Q("span", {
											className: o("truncate text-[12px]", k ? "text-white/60" : "text-text-secondary"),
											"data-testid": "conversation-preview",
											children: e.lastMessagePreview
										})]
									}),
									O && /* @__PURE__ */ $("span", {
										"data-testid": "conversation-live",
										"aria-label": "Call in progress",
										title: "Call in progress",
										className: "inline-flex shrink-0 items-center gap-1 rounded-full bg-danger px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none tracking-wide text-white",
										children: [/* @__PURE__ */ Q("span", {
											"aria-hidden": !0,
											className: "h-1.5 w-1.5 rounded-full bg-white"
										}), "Live"]
									}),
									E && /* @__PURE__ */ Q("span", {
										"data-testid": "conversation-mention",
										"aria-label": "You were mentioned",
										title: "You were mentioned",
										className: "grid h-5 w-5 shrink-0 place-items-center rounded-full bg-danger text-[11px] font-bold leading-none text-white",
										children: "@"
									}),
									T > 0 && /* @__PURE__ */ Q("span", {
										"data-testid": "conversation-unread",
										"data-muted": j ? "true" : "false",
										className: o("grid h-5 min-w-5 shrink-0 place-items-center rounded-full px-1.5 text-[11px] font-semibold leading-none", j ? k ? "bg-white/15 text-white/70" : "bg-surface-inset text-text-secondary" : "bg-primary text-on-primary"),
										children: T > 99 ? "99+" : T
									})
								]
							}), N.length > 0 && /* @__PURE__ */ Q("span", {
								className: o("absolute right-1 top-1/2 -translate-y-1/2 opacity-0 transition-opacity", "group-hover:opacity-100 group-focus-within:opacity-100", "has-[[aria-expanded=true]]:opacity-100", "[@media(hover:none)]:opacity-100"),
								children: /* @__PURE__ */ Q(ne, {
									trigger: /* @__PURE__ */ Q("span", {
										"aria-hidden": !0,
										className: "leading-none tracking-wide",
										children: "⋯"
									}),
									triggerLabel: `More options for ${l}`,
									triggerTitle: "More options",
									triggerTabIndex: n ? 0 : -1,
									triggerTestId: M,
									triggerClassName: o("h-6 w-6 rounded-md border-0 p-0 text-[13px]", k ? "text-white/70 hover:bg-white/15" : "text-text-secondary hover:bg-surface-hover"),
									align: "end",
									sections: [{ items: N }],
									"data-testid": `${M}-panel`
								})
							})]
						}, e.channel);
					})
				}), e.capped && /* @__PURE__ */ Q("button", {
					type: "button",
					onClick: () => ie(e.label),
					"aria-expanded": e.hidden === 0,
					"data-testid": "conversation-show-more",
					className: o("mt-0.5 flex w-full cursor-pointer items-center rounded-lg px-2 py-1 text-left text-[12px] font-medium", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", k ? "text-white/60 hover:bg-white/10 hover:text-white" : "text-text-tertiary hover:bg-surface-hover hover:text-text-primary"),
					children: e.hidden > 0 ? `Show ${e.hidden} more` : "Show less"
				})] });
				return /* @__PURE__ */ $("div", { children: [e.heading && /* @__PURE__ */ Q(we, {
					label: e.heading,
					dark: k,
					actions: r?.[e.label] ?? [],
					...e.collapsible ? {
						collapsed: e.collapsed,
						onToggleCollapse: (t) => a?.(e.label, t),
						controls: t,
						toggleId: n,
						collapsedCount: e.items.reduce((e, t) => e + (t.unreadCount ?? 0), 0)
					} : {},
					"data-testid": "conversation-section"
				}), e.collapsible ? /* @__PURE__ */ Q("div", {
					id: t,
					children: i
				}) : i] }, e.label);
			})
		})]
	});
}
//#endregion
//#region src/components/social/ChatRoom.tsx
var et = [
	"#e57373",
	"#f06292",
	"#ba68c8",
	"#9575cd",
	"#7986cb",
	"#64b5f6",
	"#4dd0e1",
	"#4db6ac",
	"#81c784",
	"#ffb74d",
	"#ff8a65",
	"#a1887f",
	"#90a4ae",
	"#4fc3f7",
	"#aed581"
];
function tt(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) >>> 0;
	return et[t % et.length];
}
function nt(e) {
	let t = e.split(/[\s._@-]/);
	return t.length >= 2 ? (t[0][0] + t[1][0]).toUpperCase() : e.slice(0, 2).toUpperCase();
}
function rt(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : new Date(e).toLocaleDateString();
}
function it(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function at({ post: e, isOwn: t, showSender: n }) {
	let r = tt(e.authorId);
	return /* @__PURE__ */ $("div", {
		className: o("flex items-end gap-2", t ? "flex-row-reverse" : "flex-row", n ? "pt-2 px-4 pb-0.5" : "py-px px-4"),
		children: [/* @__PURE__ */ Q("div", {
			className: "w-8 shrink-0 self-end",
			children: !t && n && /* @__PURE__ */ Q("div", {
				className: "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white select-none",
				style: { background: r },
				children: nt(e.authorId)
			})
		}), /* @__PURE__ */ $("div", {
			className: o("max-w-[68%] flex flex-col gap-0.5", t ? "items-end" : "items-start"),
			children: [
				!t && n && /* @__PURE__ */ Q("span", {
					className: "text-[11px] font-semibold pl-1",
					style: { color: r },
					children: e.authorId
				}),
				/* @__PURE__ */ Q("div", {
					className: o("px-3.5 py-2 text-sm leading-relaxed break-words transition-opacity duration-200", t ? "bg-primary text-on-primary rounded-[18px_18px_4px_18px]" : "bg-surface-hover text-text-primary rounded-[4px_18px_18px_18px]", e._fadeIn ? "opacity-0" : "opacity-100"),
					children: e.content
				}),
				n && /* @__PURE__ */ Q("span", {
					className: "text-[10px] text-text-tertiary px-1",
					children: rt(e.createdAt)
				})
			]
		})]
	});
}
function ot({ idToken: e, roomId: t, roomName: r, onMessage: i }) {
	let { posts: a, createPost: s, loading: c, hasMore: l, loadMore: u, error: d, loadError: f } = n({
		idToken: e,
		roomId: t,
		onMessage: i
	}), [p, m] = X(""), [h, g] = X(!1), [_, v] = X(null), y = Y(null), b = it(e), x = [...a].reverse(), S = a[0]?.postId;
	q(() => {
		S && y.current?.scrollIntoView({ behavior: "smooth" });
	}, [S]);
	let C = async () => {
		if (!p.trim() || h) return;
		let e = p.trim();
		m(""), v(null), g(!0);
		try {
			await s(e);
		} catch (t) {
			v(t instanceof Error ? t.message : "Failed to send message"), m(e);
		} finally {
			g(!1);
		}
	};
	return /* @__PURE__ */ $("div", {
		className: "flex flex-col h-full bg-surface rounded-lg border border-border overflow-hidden",
		children: [
			/* @__PURE__ */ Q("div", {
				className: "flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface shrink-0",
				children: /* @__PURE__ */ $("span", {
					className: "text-[15px] font-semibold text-text-primary",
					children: ["# ", r]
				})
			}),
			/* @__PURE__ */ $("div", {
				className: "flex-1 overflow-y-auto flex flex-col pb-1",
				children: [
					l && /* @__PURE__ */ Q("div", {
						className: "text-center py-2",
						children: /* @__PURE__ */ Q("button", {
							onClick: () => void u(),
							disabled: c,
							className: o("text-xs text-text-secondary bg-transparent border border-border rounded-full px-3.5 py-0.5 font-[inherit]", c ? "cursor-default" : "cursor-pointer"),
							children: c ? "Loading…" : "Load earlier"
						})
					}),
					c && x.length === 0 ? /* @__PURE__ */ Q("div", {
						className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px]",
						children: "Loading messages…"
					}) : f && x.length === 0 ? /* @__PURE__ */ $("div", {
						role: "alert",
						className: "flex-1 flex flex-col items-center justify-center gap-1.5 px-6 text-center",
						children: [
							/* @__PURE__ */ Q("span", {
								className: "text-[28px]",
								children: "⚠️"
							}),
							/* @__PURE__ */ Q("span", {
								className: "text-sm font-semibold text-danger-fg",
								children: "Couldn’t load messages"
							}),
							/* @__PURE__ */ Q("span", {
								className: "text-[13px] text-text-tertiary",
								children: f
							})
						]
					}) : x.length === 0 ? /* @__PURE__ */ $("div", {
						className: "flex-1 flex flex-col items-center justify-center text-text-tertiary gap-1.5",
						children: [
							/* @__PURE__ */ Q("span", {
								className: "text-[28px]",
								children: "💬"
							}),
							/* @__PURE__ */ Q("span", {
								className: "text-sm font-semibold text-text-primary",
								children: "No messages yet"
							}),
							/* @__PURE__ */ Q("span", {
								className: "text-[13px]",
								children: "Be the first to say something!"
							})
						]
					}) : x.map((e, t) => {
						let n = e.authorId === b, r = x[t - 1], i = !r || r.authorId !== e.authorId || new Date(e.createdAt).getTime() - new Date(r.createdAt).getTime() > 3e5;
						return /* @__PURE__ */ Q(at, {
							post: e,
							isOwn: n,
							showSender: i
						}, e.postId);
					}),
					/* @__PURE__ */ Q("div", { ref: y })
				]
			}),
			(d || _) && /* @__PURE__ */ Q("div", {
				className: "px-4 py-1.5 bg-danger-bg border-t border-danger-border text-xs text-danger-fg",
				children: _ ?? d
			}),
			/* @__PURE__ */ $("div", {
				className: "flex items-center gap-2 px-3 py-2.5 border-t border-border bg-surface shrink-0",
				children: [/* @__PURE__ */ Q(P, {
					value: p,
					onChange: (e) => m(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && !e.shiftKey && (e.preventDefault(), C());
					},
					placeholder: `Message #${r}…`,
					disabled: h,
					className: "flex-1 rounded-[22px] px-4"
				}), /* @__PURE__ */ Q("button", {
					onClick: () => void C(),
					disabled: !p.trim() || h,
					className: o("w-[34px] h-[34px] rounded-full shrink-0 border-none flex items-center justify-center text-base", !p.trim() || h ? "bg-surface-hover text-text-tertiary cursor-default" : "bg-primary text-on-primary cursor-pointer"),
					children: "↑"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/social/SocialTabContent.tsx
function st({ userId: t, displayName: n, idToken: r, rooms: i, createRoom: a, createDM: s, createGroupRoom: c, roomsLoading: l, roomsError: u, onRoomsRetry: d, handleRoomSelect: f, activeRoomId: p, onMessage: m }) {
	let [h, g] = X(!0), _ = h ? 240 : 0, [v, y] = X({}), b = Y(p);
	q(() => {
		b.current = p;
	}, [p]);
	let x = K((e) => {
		y((t) => {
			if (!t[e.roomId]) return t;
			let n = { ...t };
			return delete n[e.roomId], n;
		}), f(e);
	}, [f]);
	q(() => m((e) => {
		if (e.type === "social:post") {
			let t = (e.payload ?? e).roomId;
			t && t !== b.current && y((e) => ({
				...e,
				[t]: (e[t] ?? 0) + 1
			}));
		}
	}), [m]);
	let [S, C] = X(!1), [w, T] = X(!1), { friends: E, loadError: D } = e({ idToken: r }), O = n ? n.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2) : t.slice(0, 2).toUpperCase(), k = i.find((e) => e.roomId === p) ?? null, A = i.filter((e) => e.type === "standalone" || e.type === "group"), j = i.filter((e) => e.type === "dm"), M = J(() => [...A.map((e) => ({
		channel: e.roomId,
		kind: "channel",
		name: e.name,
		peers: [],
		unreadCount: v[e.roomId] ?? 0
	})), ...j.map((e) => ({
		channel: e.roomId,
		kind: "dm",
		peers: [{
			userId: e.dmPeerUserId ?? e.roomId,
			displayName: e.name
		}],
		unreadCount: v[e.roomId] ?? 0
	}))], [
		A,
		j,
		v
	]), N = K((e) => {
		let t = i.find((t) => t.roomId === e);
		t && x(t);
	}, [i, x]), P = "var(--color-border)", F = "var(--color-text-primary)", I = "var(--color-text-secondary)";
	return /* @__PURE__ */ $("div", {
		className: "flex overflow-hidden rounded-lg transition-colors duration-200 h-[calc(100vh-120px)]",
		style: {
			background: "var(--color-surface)",
			border: `1px solid ${P}`
		},
		children: [/* @__PURE__ */ $("div", {
			className: o("shrink-0 flex-col overflow-hidden transition-[width] duration-[180ms]", h ? "flex" : "hidden"),
			style: {
				width: _,
				borderRight: `1px solid ${P}`,
				background: "var(--color-surface-panel)"
			},
			children: [/* @__PURE__ */ $("div", {
				className: "flex items-center gap-2 shrink-0 px-[14px] pt-[14px] pb-3",
				style: { borderBottom: `1px solid ${P}` },
				children: [
					/* @__PURE__ */ Q("div", {
						className: "w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-[11px] shrink-0 bg-[linear-gradient(135deg,#646cff,#9b59b6)]",
						children: O
					}),
					/* @__PURE__ */ $("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ Q("div", {
							className: "text-[13px] font-bold overflow-hidden text-ellipsis whitespace-nowrap",
							style: { color: F },
							children: n || t
						}), /* @__PURE__ */ $("div", {
							className: "text-[11px] flex items-center gap-1",
							style: { color: I },
							children: [/* @__PURE__ */ Q("span", { className: "w-1.5 h-1.5 rounded-full bg-success inline-block" }), "Active"]
						})]
					}),
					/* @__PURE__ */ Q("button", {
						onClick: () => g(!1),
						title: "Collapse sidebar",
						className: "bg-transparent border-none cursor-pointer text-base leading-none px-1 py-0.5 rounded",
						style: { color: I },
						children: "«"
					})
				]
			}), /* @__PURE__ */ Q("div", {
				className: "flex-1 overflow-y-auto pt-2",
				children: /* @__PURE__ */ $("div", {
					className: "px-1 pt-1",
					children: [l && M.length === 0 ? /* @__PURE__ */ Q("div", {
						className: "px-2 py-2 text-xs",
						style: { color: I },
						children: "Loading…"
					}) : u && M.length === 0 ? /* @__PURE__ */ Q("div", {
						role: "alert",
						"data-testid": "conversations-error",
						className: "px-2 py-2 text-xs text-danger-fg",
						children: "Couldn’t load conversations"
					}) : /* @__PURE__ */ Q($e, {
						items: M,
						activeChannel: p ?? null,
						onSelect: N,
						onNewChat: () => C((e) => !e),
						emptyLabel: "No conversations yet",
						"data-testid": "social-conversations"
					}), S && /* @__PURE__ */ Q("div", {
						className: "px-1 pt-1.5",
						children: /* @__PURE__ */ Q(Ze, {
							people: E.map((e) => ({
								userId: e.userId,
								displayName: e.displayName,
								avatarUrl: e.avatarUrl
							})),
							peopleError: D,
							busy: w,
							onCancel: () => C(!1),
							onStartDm: async (e) => {
								T(!0);
								try {
									await s(e), C(!1);
								} finally {
									T(!1);
								}
							},
							onCreateChannel: async (e) => {
								T(!0);
								try {
									await a(e), C(!1);
								} finally {
									T(!1);
								}
							}
						})
					})]
				})
			})]
		}), /* @__PURE__ */ $("div", {
			className: "flex-1 min-w-0 flex flex-col",
			children: [!h && /* @__PURE__ */ $("div", {
				className: "flex items-center gap-2 px-3 py-1.5",
				style: { borderBottom: `1px solid ${P}` },
				children: [/* @__PURE__ */ Q("button", {
					onClick: () => g(!0),
					title: "Expand sidebar",
					className: "bg-transparent rounded cursor-pointer text-sm px-2 py-0.5 font-[inherit]",
					style: {
						border: `1px solid ${P}`,
						color: I
					},
					children: "»"
				}), k && /* @__PURE__ */ $("span", {
					className: "text-[13px] font-semibold",
					style: { color: F },
					children: [
						k.type === "dm" ? "●" : "#",
						" ",
						k.name
					]
				})]
			}), /* @__PURE__ */ Q("div", {
				className: "flex-1 min-h-0",
				children: k ? /* @__PURE__ */ Q(ot, {
					idToken: r,
					roomId: k.roomId,
					roomName: k.name,
					onMessage: m
				}, k.roomId) : /* @__PURE__ */ $("div", {
					className: "h-full flex flex-col items-center justify-center gap-2",
					style: { color: I },
					children: [
						/* @__PURE__ */ Q("span", {
							className: "text-4xl",
							children: "💬"
						}),
						/* @__PURE__ */ Q("span", {
							className: "text-[15px] font-semibold",
							style: { color: F },
							children: "Select a room to start chatting"
						}),
						/* @__PURE__ */ Q("span", {
							className: "text-[13px]",
							children: "Choose a channel or DM from the sidebar"
						})
					]
				})
			})]
		})]
	});
}
//#endregion
//#region src/components/social/MessageGroup.tsx
function ct({ author: e, avatarUrl: t, mine: n = !1, messages: r, className: i }) {
	return r.length === 0 ? null : /* @__PURE__ */ Q("div", {
		"data-testid": "message-group",
		"data-author": e,
		"data-row-count": r.length,
		className: o("flex flex-col", i),
		children: r.map((r, i) => /* @__PURE__ */ Q(De, {
			author: e,
			content: r.content,
			timestamp: r.timestamp,
			avatarUrl: t,
			hideAvatar: i > 0,
			hideAuthor: i > 0,
			mine: n,
			footer: r.footer
		}, r.id))
	});
}
//#endregion
//#region src/components/social/RoomList.tsx
function lt({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = X(""), [a, s] = X(null), c = async (t) => {
		if (t.preventDefault(), r.trim()) {
			s(null);
			try {
				await e(r.trim()), i("");
			} catch (e) {
				s(e instanceof Error ? e.message : "Failed to create room");
			}
		}
	};
	return /* @__PURE__ */ $("form", {
		onSubmit: (e) => {
			c(e);
		},
		className: "my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border",
		children: [
			/* @__PURE__ */ Q(P, {
				size: "sm",
				value: r,
				onChange: (e) => i(e.target.value.slice(0, 50)),
				placeholder: "Room name",
				maxLength: 50,
				required: !0,
				autoFocus: !0,
				className: "mb-1.5"
			}),
			/* @__PURE__ */ $("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ Q("button", {
					type: "submit",
					disabled: !r.trim() || n,
					className: o("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !r.trim() || n ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-on-primary cursor-pointer"),
					children: n ? "Creating…" : "Create"
				}), /* @__PURE__ */ Q("button", {
					type: "button",
					onClick: t,
					className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
					children: "Cancel"
				})]
			}),
			a && /* @__PURE__ */ Q("div", {
				className: "text-danger-fg text-[11px] mt-1",
				children: a
			})
		]
	});
}
function ut({ onCreateDM: e, loading: t, friends: n, friendsError: r }) {
	let [i, a] = X(""), [s, c] = X(!1), [l, u] = X(null), d = async (t) => {
		if (t.preventDefault(), i.trim()) {
			u(null);
			try {
				await e(i.trim()), a(""), c(!1);
			} catch (e) {
				u(e instanceof Error ? e.message : "Failed to open DM");
			}
		}
	};
	return s ? /* @__PURE__ */ $("form", {
		onSubmit: (e) => {
			d(e);
		},
		className: "my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border",
		children: [
			/* @__PURE__ */ Q(F, {
				size: "sm",
				value: i,
				onChange: (e) => a(e.target.value),
				disabled: n.length === 0,
				className: "mb-1.5",
				options: [{
					value: "",
					label: r ? "Couldn't load your friends" : n.length === 0 ? "No mutual friends yet" : "Select a friend…"
				}, ...n.map((e) => ({
					value: e.userId,
					label: e.displayName
				}))]
			}),
			r && n.length === 0 && /* @__PURE__ */ Q("div", {
				role: "alert",
				"data-testid": "dm-friends-error",
				className: "text-danger-fg text-[11px] mb-1.5",
				children: r
			}),
			/* @__PURE__ */ $("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ Q("button", {
					type: "submit",
					disabled: !i.trim() || t || n.length === 0,
					className: o("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !i.trim() || t ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-on-primary cursor-pointer"),
					children: "Open DM"
				}), /* @__PURE__ */ Q("button", {
					type: "button",
					onClick: () => c(!1),
					className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
					children: "Cancel"
				})]
			}),
			l && /* @__PURE__ */ Q("div", {
				className: "text-danger-fg text-[11px] mt-1",
				children: l
			})
		]
	}) : /* @__PURE__ */ Q("button", {
		onClick: () => c(!0),
		className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded mb-1",
		children: "+ New DM"
	});
}
function dt({ room: e, isActive: t, onClick: n }) {
	return /* @__PURE__ */ $("button", {
		type: "button",
		onClick: n,
		"aria-pressed": t,
		className: o("flex items-center h-14 border-b border-surface-hover cursor-pointer pr-2", "w-full text-left font-[inherit]", t ? "bg-surface-hover border-l-[3px] border-l-primary pl-[13px]" : "bg-transparent border-l-[3px] border-l-transparent"),
		children: [/* @__PURE__ */ Q("div", {
			className: o("flex-1 text-base text-text-primary", t ? "font-semibold" : "font-normal"),
			children: e.name
		}), /* @__PURE__ */ Q("span", {
			className: ((e) => e === "standalone" ? "bg-accent-bg text-primary text-xs px-2 py-0.5 rounded" : e === "group" ? "bg-info-bg text-info text-xs px-2 py-0.5 rounded" : "bg-success-bg text-success text-xs px-2 py-0.5 rounded")(e.type),
			children: e.type
		})]
	});
}
function ft({ room: e, isActive: t, onClick: n }) {
	return /* @__PURE__ */ $("button", {
		onClick: n,
		className: o("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]", t ? "bg-accent-bg text-accent-fg font-semibold" : "bg-transparent text-text-primary font-normal"),
		children: [/* @__PURE__ */ Q("span", {
			className: o("text-[13px] shrink-0", t ? "text-primary" : "text-text-tertiary"),
			children: e.type === "dm" ? "●" : "#"
		}), /* @__PURE__ */ Q("span", {
			className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1",
			children: e.name
		})]
	});
}
function pt({ message: e, onRetry: t, compact: n }) {
	return /* @__PURE__ */ $("div", {
		role: "alert",
		className: o("text-center flex flex-col items-center gap-1.5", n ? "px-2 py-3" : "px-4 py-6"),
		children: [
			/* @__PURE__ */ Q("div", {
				className: o("font-semibold text-danger-fg", n ? "text-xs" : "text-sm"),
				children: "Couldn't load rooms"
			}),
			/* @__PURE__ */ Q("div", {
				className: o("text-text-secondary", n ? "text-[11px]" : "text-xs"),
				children: e
			}),
			t && /* @__PURE__ */ Q("button", {
				type: "button",
				onClick: t,
				className: o("mt-1 font-medium text-info-fg bg-info-bg border border-info-border rounded cursor-pointer font-[system-ui,-apple-system,sans-serif]", n ? "px-2.5 py-0.5 text-[11px]" : "px-3.5 py-1 text-xs"),
				children: "Retry"
			})
		]
	});
}
function mt({ idToken: t, rooms: n, createRoom: r, createDM: i, loading: a, error: o, onRetry: s, onRoomSelect: c, activeRoomId: l, compact: u }) {
	let { friends: d, loadError: f } = e({ idToken: t }), [p, m] = X(!1), h = async (e) => {
		await r(e), m(!1);
	};
	return u ? /* @__PURE__ */ $("div", {
		className: "px-2 pt-2",
		children: [
			/* @__PURE__ */ Q("button", {
				onClick: () => m((e) => !e),
				className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
				children: "+ New Room"
			}),
			p && /* @__PURE__ */ Q(lt, {
				onCreate: h,
				onDiscard: () => m(!1),
				loading: a
			}),
			/* @__PURE__ */ Q(ut, {
				onCreateDM: i,
				loading: a,
				friends: d,
				friendsError: f
			}),
			/* @__PURE__ */ Q("div", { children: a && n.length === 0 ? /* @__PURE__ */ Q("div", {
				className: "p-2 text-text-tertiary text-xs text-center",
				children: "Loading…"
			}) : o && n.length === 0 ? /* @__PURE__ */ Q(pt, {
				message: o,
				onRetry: s,
				compact: !0
			}) : n.length === 0 ? /* @__PURE__ */ Q("div", {
				className: "px-2 py-3 text-text-tertiary text-xs",
				children: "No rooms yet"
			}) : n.map((e) => /* @__PURE__ */ Q(ft, {
				room: e,
				isActive: e.roomId === l,
				onClick: () => c(e)
			}, e.roomId)) })
		]
	}) : /* @__PURE__ */ $("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ Q("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
				children: "Rooms"
			}),
			/* @__PURE__ */ Q("button", {
				onClick: () => m((e) => !e),
				className: "w-full h-9 mb-2 bg-primary text-on-primary border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Create Room"
			}),
			p && /* @__PURE__ */ Q(lt, {
				onCreate: h,
				onDiscard: () => m(!1),
				loading: a
			}),
			/* @__PURE__ */ Q(ut, {
				onCreateDM: i,
				loading: a,
				friends: d,
				friendsError: f
			}),
			/* @__PURE__ */ Q("div", {
				className: "max-h-80 overflow-y-auto",
				children: a && n.length === 0 ? /* @__PURE__ */ $("div", {
					className: "flex items-center gap-2 p-4 justify-center text-text-secondary",
					children: [/* @__PURE__ */ Q("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }), "Loading..."]
				}) : o && n.length === 0 ? /* @__PURE__ */ Q(pt, {
					message: o,
					onRetry: s
				}) : n.length === 0 ? /* @__PURE__ */ $("div", {
					className: "py-6 text-center",
					children: [/* @__PURE__ */ Q("div", {
						className: "text-sm font-semibold text-text-primary mb-1",
						children: "No rooms yet"
					}), /* @__PURE__ */ Q("div", {
						className: "text-sm text-text-tertiary",
						children: "Create a room or ask to be added."
					})]
				}) : n.map((e) => /* @__PURE__ */ Q(dt, {
					room: e,
					isActive: e.roomId === l,
					onClick: () => c(e)
				}, e.roomId))
			})
		]
	});
}
//#endregion
//#region src/components/social/CommentThread.tsx
function ht(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function gt(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function _t({ onSubmit: e, placeholder: t = "Write a reply…", loading: n }) {
	let [r, i] = X(""), [a, s] = X(null), c = async (t) => {
		t.preventDefault();
		let n = r.trim();
		if (n) {
			s(null);
			try {
				await e(n);
			} catch (e) {
				s(e instanceof Error ? e.message : "Failed to post comment");
				return;
			}
			i("");
		}
	};
	return /* @__PURE__ */ $("form", {
		onSubmit: (e) => {
			c(e);
		},
		className: "flex flex-wrap gap-2 mt-2",
		children: [
			/* @__PURE__ */ Q(P, {
				value: r,
				onChange: (e) => i(e.target.value),
				placeholder: t,
				className: "flex-1"
			}),
			/* @__PURE__ */ Q("button", {
				type: "submit",
				disabled: !r.trim() || n,
				className: o("h-7 px-2.5 rounded-md text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !r.trim() || n ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-on-primary border-none cursor-pointer"),
				children: "Comment"
			}),
			a && /* @__PURE__ */ Q("div", {
				role: "alert",
				"data-testid": "comment-submit-error",
				className: "basis-full text-danger-fg text-[13px]",
				children: a
			})
		]
	});
}
function vt({ comment: e, currentUserId: t, loading: n, onDelete: r, onReply: i }) {
	let [a, o] = X(!1), [s, c] = X(!1), [l, u] = X(+!e._fadeIn);
	q(() => {
		if (e._fadeIn) {
			let e = setTimeout(() => u(1), 10);
			return () => clearTimeout(e);
		}
	}, []);
	let d = e.authorId === t, f = !!e.parentCommentId, p = e.authorId.slice(0, 2).toUpperCase(), m = /* @__PURE__ */ Q("div", {
		style: { opacity: l },
		className: "transition-opacity duration-200 ease-[ease]",
		children: /* @__PURE__ */ $("div", {
			className: "flex items-start gap-2",
			children: [/* @__PURE__ */ Q("div", {
				className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
				children: p
			}), /* @__PURE__ */ $("div", {
				className: "flex-1",
				children: [
					/* @__PURE__ */ $("div", {
						className: "flex items-center gap-2 mb-0.5",
						children: [/* @__PURE__ */ Q("span", {
							className: "text-sm font-semibold text-text-primary",
							children: e.authorId
						}), /* @__PURE__ */ Q("span", {
							className: "text-xs text-text-tertiary",
							children: ht(e.createdAt)
						})]
					}),
					/* @__PURE__ */ Q("div", {
						className: "text-sm text-text-primary mb-1",
						children: e.content
					}),
					/* @__PURE__ */ $("div", {
						className: "flex gap-2 items-center",
						children: [
							/* @__PURE__ */ Q("button", {
								onClick: () => c((e) => !e),
								className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
								children: "Reply"
							}),
							d && !a && /* @__PURE__ */ Q("button", {
								onClick: () => o(!0),
								className: "text-sm text-text-tertiary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
								"aria-label": "Delete comment",
								children: "Delete"
							}),
							d && a && /* @__PURE__ */ $("div", {
								role: "group",
								"aria-label": "Confirm delete comment",
								className: "flex gap-1.5 items-center",
								children: [
									/* @__PURE__ */ Q("span", {
										className: "text-xs text-text-primary",
										children: "Delete this comment?"
									}),
									/* @__PURE__ */ Q("button", {
										onClick: () => o(!1),
										className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
										children: "Cancel"
									}),
									/* @__PURE__ */ Q("button", {
										onClick: () => {
											r(e.commentId).then(() => o(!1), () => void 0);
										},
										className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
										children: "Delete"
									})
								]
							})
						]
					}),
					s && /* @__PURE__ */ Q(_t, {
						onSubmit: async (t) => {
							await i(e.commentId, t), c(!1);
						},
						placeholder: "Write a reply…",
						loading: n
					})
				]
			})]
		})
	});
	return f ? /* @__PURE__ */ Q("div", {
		className: "pl-8 py-2",
		children: m
	}) : /* @__PURE__ */ Q("div", {
		className: "py-2 border-b border-surface-hover",
		children: m
	});
}
function yt({ idToken: e, roomId: t, postId: n, onMessage: i }) {
	let { comments: a, createComment: o, deleteComment: s, loading: c, submitting: l, error: u } = r({
		idToken: e,
		roomId: t,
		postId: n,
		onMessage: i
	}), d = gt(e), f = async (e, t) => {
		await o(t, e);
	};
	return /* @__PURE__ */ $("div", {
		className: "pt-2 pl-2 border-t border-surface-hover",
		children: [
			c ? /* @__PURE__ */ Q("div", {
				className: "text-sm text-text-tertiary py-2",
				children: "Loading comments…"
			}) : u && a.length === 0 ? /* @__PURE__ */ Q("div", {
				role: "alert",
				className: "text-sm text-danger-fg py-2",
				children: u
			}) : a.length === 0 ? /* @__PURE__ */ Q("div", {
				className: "text-sm text-text-tertiary text-center py-4",
				children: "No comments yet"
			}) : a.map((e) => /* @__PURE__ */ Q(vt, {
				comment: e,
				currentUserId: d,
				loading: l,
				onDelete: s,
				onReply: f
			}, e.commentId)),
			u && a.length > 0 && /* @__PURE__ */ Q("div", {
				role: "alert",
				"data-testid": "comment-thread-error",
				className: "text-sm text-danger-fg py-1",
				children: u
			}),
			/* @__PURE__ */ Q(_t, {
				onSubmit: (e) => o(e),
				placeholder: "Write a comment…",
				loading: l
			})
		]
	});
}
//#endregion
//#region src/components/social/PostFeed.tsx
var bt = [
	"❤️",
	"😂",
	"👍",
	"👎",
	"😮",
	"😢",
	"😡",
	"🎉",
	"🔥",
	"⚡",
	"💯",
	"🚀"
];
function xt(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function St(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function Ct({ onCreate: e, loading: t }) {
	let [n, r] = X(""), [i, a] = X(null), s = async (t) => {
		if (t.preventDefault(), n.trim()) {
			a(null);
			try {
				await e(n.trim()), r("");
			} catch (e) {
				a(e instanceof Error ? e.message : "Failed to create post");
			}
		}
	};
	return /* @__PURE__ */ $("form", {
		onSubmit: (e) => {
			s(e);
		},
		children: [
			/* @__PURE__ */ Q(V, {
				value: n,
				onChange: (e) => r(e.target.value),
				placeholder: "What's on your mind?",
				maxLength: 1e4,
				rows: 3,
				className: "resize-y mb-2"
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ Q("button", {
					type: "submit",
					disabled: !n.trim() || t,
					className: o("h-9 px-4 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !n.trim() || t ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-on-primary border-none cursor-pointer"),
					children: t ? "Posting…" : "Post"
				})
			}),
			i && /* @__PURE__ */ Q("div", {
				className: "text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
				children: i
			})
		]
	});
}
function wt({ isLiked: e, likeCount: t, whoLiked: n, toggle: r }) {
	return /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ $("button", {
		onClick: () => void r(),
		"aria-label": "Like post",
		className: "bg-transparent border-none cursor-pointer flex items-center gap-1 p-0 font-[system-ui,-apple-system,sans-serif]",
		children: [/* @__PURE__ */ Q("span", {
			className: o("text-base", e ? "text-primary" : "text-text-tertiary"),
			children: "❤"
		}), /* @__PURE__ */ Q("span", {
			className: o("text-sm", e ? "text-primary" : "text-text-tertiary"),
			children: t
		})]
	}), n.length > 0 && /* @__PURE__ */ $("span", {
		className: "text-xs text-text-secondary ml-1",
		children: [
			"Liked by: ",
			n.slice(0, 3).map((e) => e.displayName).join(", "),
			n.length > 3 ? ` and ${n.length - 3} more` : ""
		]
	})] });
}
function Tt({ reactWithEmoji: e }) {
	return /* @__PURE__ */ Q("div", {
		className: "flex flex-wrap gap-0",
		children: bt.map((t) => /* @__PURE__ */ Q("button", {
			onClick: () => void e(t),
			className: "text-base bg-transparent border-none px-1 py-0.5 cursor-pointer",
			title: t,
			children: t
		}, t))
	});
}
function Et({ post: e, idToken: t, roomId: n, currentUserId: r, onMessage: a, onEdit: s, onDelete: c }) {
	let { isLiked: l, likeCount: u, whoLiked: d, toggle: f, reactWithEmoji: p, error: m } = i({
		idToken: t,
		roomId: n,
		postId: e.postId,
		onMessage: a
	}), [h, g] = X(+!e._fadeIn), [_, v] = X(!1), [y, b] = X(!1), [x, S] = X(!1), [C, w] = X(e.content), [T, E] = X(null), D = async () => {
		E(null);
		try {
			await s(e.postId, C);
		} catch (e) {
			E(e instanceof Error ? e.message : "Failed to save post");
			return;
		}
		S(!1);
	}, O = async () => {
		E(null);
		try {
			await c(e.postId);
		} catch (e) {
			E(e instanceof Error ? e.message : "Failed to delete post");
			return;
		}
		b(!1);
	};
	q(() => {
		if (e._fadeIn) {
			let e = setTimeout(() => g(1), 10);
			return () => clearTimeout(e);
		}
	}, []);
	let k = e.authorId === r, A = e.authorId.slice(0, 2).toUpperCase();
	return /* @__PURE__ */ $("div", {
		style: { opacity: h },
		className: "border-b border-surface-hover pb-4 mb-4 transition-opacity duration-200 ease-[ease]",
		children: [
			/* @__PURE__ */ $("div", {
				className: "flex items-center gap-2 mb-2",
				children: [/* @__PURE__ */ Q("div", {
					className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
					children: A
				}), /* @__PURE__ */ $("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ Q("span", {
						className: "text-base font-semibold text-text-primary",
						children: e.authorId
					}), /* @__PURE__ */ Q("span", {
						className: "text-sm text-text-tertiary ml-2",
						children: xt(e.createdAt)
					})]
				})]
			}),
			x ? /* @__PURE__ */ $("div", {
				className: "mb-2",
				children: [/* @__PURE__ */ Q(V, {
					value: C,
					onChange: (e) => w(e.target.value),
					rows: 3,
					className: "resize-y mb-2"
				}), /* @__PURE__ */ $("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ Q("button", {
						onClick: () => {
							D();
						},
						disabled: !C.trim(),
						className: o("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", C.trim() ? "bg-primary text-on-primary border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"),
						children: "Save"
					}), /* @__PURE__ */ Q("button", {
						onClick: () => {
							S(!1), w(e.content);
						},
						className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Discard Changes"
					})]
				})]
			}) : /* @__PURE__ */ Q("div", {
				className: "text-base text-text-primary mt-2 mb-2",
				children: e.content
			}),
			/* @__PURE__ */ $("div", {
				className: "flex gap-4 text-sm mt-1 items-center flex-wrap",
				children: [
					/* @__PURE__ */ Q(wt, {
						isLiked: l,
						likeCount: u,
						whoLiked: d,
						toggle: f
					}),
					/* @__PURE__ */ Q(Tt, { reactWithEmoji: p }),
					/* @__PURE__ */ Q("button", {
						onClick: () => v((e) => !e),
						className: "bg-transparent border-none text-sm text-text-secondary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Comment"
					}),
					k && !x && /* @__PURE__ */ Q("button", {
						onClick: () => S(!0),
						className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Edit"
					}),
					k && !y && !x && /* @__PURE__ */ Q("button", {
						onClick: () => b(!0),
						className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Delete"
					}),
					k && y && /* @__PURE__ */ $("div", {
						role: "group",
						"aria-label": "Confirm delete post",
						className: "flex gap-1.5 items-center",
						children: [
							/* @__PURE__ */ Q("span", {
								className: "text-xs text-text-primary",
								children: "Delete this post?"
							}),
							/* @__PURE__ */ Q("button", {
								onClick: () => b(!1),
								className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
								children: "Cancel"
							}),
							/* @__PURE__ */ Q("button", {
								onClick: () => {
									O();
								},
								className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
								children: "Delete"
							})
						]
					})
				]
			}),
			(T ?? m) && /* @__PURE__ */ Q("div", {
				role: "alert",
				"data-testid": "post-action-error",
				className: "text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
				children: T ?? m
			}),
			_ && /* @__PURE__ */ Q(yt, {
				idToken: t,
				roomId: n,
				postId: e.postId,
				onMessage: a
			})
		]
	});
}
function Dt({ idToken: e, roomId: t, onMessage: r }) {
	let { posts: i, createPost: a, editPost: s, deletePost: c, loading: l, mutating: u, error: d, loadError: f, hasMore: p, loadMore: m } = n({
		idToken: e,
		roomId: t,
		onMessage: r
	}), h = St(e);
	return /* @__PURE__ */ $("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ Q(Ct, {
				onCreate: a,
				loading: l || u
			}),
			/* @__PURE__ */ Q("div", { className: "border-t border-border my-4" }),
			p && /* @__PURE__ */ Q("button", {
				onClick: () => void m(),
				disabled: l,
				className: o("w-full h-9 mb-4 bg-surface text-text-primary border border-border rounded-lg text-sm font-[system-ui,-apple-system,sans-serif]", l ? "cursor-default" : "cursor-pointer"),
				children: l ? "Loading…" : "Load more"
			}),
			d && i.length > 0 && /* @__PURE__ */ Q("div", {
				role: "alert",
				"data-testid": "post-feed-error",
				className: "text-danger-fg text-[13px] mb-3 font-[system-ui,-apple-system,sans-serif]",
				children: d
			}),
			l && i.length === 0 ? /* @__PURE__ */ $("div", {
				className: "flex items-center gap-2 p-4 justify-center text-text-secondary",
				children: [/* @__PURE__ */ Q("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }), "Loading..."]
			}) : f && i.length === 0 ? /* @__PURE__ */ $("div", {
				role: "alert",
				className: "py-6 text-center",
				children: [/* @__PURE__ */ Q("div", {
					className: "text-sm font-semibold text-danger-fg mb-1",
					children: "Couldn’t load posts"
				}), /* @__PURE__ */ Q("div", {
					className: "text-sm text-text-tertiary",
					children: f
				})]
			}) : i.length === 0 ? /* @__PURE__ */ $("div", {
				className: "py-6 text-center",
				children: [/* @__PURE__ */ Q("div", {
					className: "text-sm font-semibold text-text-primary mb-1",
					children: "No posts yet"
				}), /* @__PURE__ */ Q("div", {
					className: "text-sm text-text-tertiary",
					children: "Be the first to post in this room."
				})]
			}) : i.map((n) => /* @__PURE__ */ Q(Et, {
				post: n,
				idToken: e,
				roomId: t,
				currentUserId: h,
				onMessage: r,
				onEdit: s,
				onDelete: c
			}, n.postId))
		]
	});
}
//#endregion
//#region src/components/social/GroupPanel.tsx
function Ot({ group: e, isSelected: t, onClick: n }) {
	return /* @__PURE__ */ $("button", {
		onClick: n,
		className: o("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]", t ? "bg-accent-bg text-accent-fg font-semibold" : "bg-transparent text-text-primary font-normal"),
		children: [/* @__PURE__ */ Q("span", {
			className: o("text-xs shrink-0", t ? "text-primary" : "text-text-tertiary"),
			children: e.visibility === "private" ? "🔒" : "👥"
		}), /* @__PURE__ */ Q("span", {
			className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1",
			children: e.name
		})]
	});
}
function kt({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = X(""), [a, s] = X(null), c = async (t) => {
		if (t.preventDefault(), r.trim()) {
			s(null);
			try {
				await e(r.trim()), i("");
			} catch (e) {
				s(e instanceof Error ? e.message : "Failed to create group");
			}
		}
	};
	return /* @__PURE__ */ $("form", {
		onSubmit: (e) => {
			c(e);
		},
		className: "p-2 bg-surface-panel rounded-md border border-border my-1 mb-2",
		children: [
			/* @__PURE__ */ Q(P, {
				size: "sm",
				value: r,
				onChange: (e) => i(e.target.value.slice(0, 50)),
				placeholder: "Group name",
				maxLength: 50,
				required: !0,
				autoFocus: !0,
				className: "mb-1.5"
			}),
			/* @__PURE__ */ $("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ Q("button", {
					type: "submit",
					disabled: !r.trim() || n,
					className: o("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !r.trim() || n ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-on-primary cursor-pointer"),
					children: n ? "Creating…" : "Create"
				}), /* @__PURE__ */ Q("button", {
					type: "button",
					onClick: t,
					className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
					children: "Cancel"
				})]
			}),
			a && /* @__PURE__ */ Q("div", {
				className: "text-danger-fg text-[11px] mt-1",
				children: a
			})
		]
	});
}
function At({ group: e, members: t, rooms: n, groupId: r, currentUserId: i, createGroupRoom: a, onRoomSelect: s, inviteUser: c, loading: l }) {
	let [u, d] = X(!1), [f, p] = X(""), [m, h] = X(null), [g, _] = X(!1), [v, y] = X(""), [b, x] = X(null), S = e.ownerId === i, C = n.filter((e) => e.groupId === r), w = async (e) => {
		if (e.preventDefault(), f.trim()) {
			h(null);
			try {
				await c(r, f.trim());
			} catch (e) {
				h(e instanceof Error ? e.message : "Failed to invite user");
				return;
			}
			p(""), d(!1);
		}
	}, T = async (e) => {
		if (e.preventDefault(), v.trim()) {
			x(null);
			try {
				await a(r, v.trim());
			} catch (e) {
				x(e instanceof Error ? e.message : "Failed to create room");
				return;
			}
			y(""), _(!1);
		}
	};
	return /* @__PURE__ */ $("div", {
		className: "px-2 pb-2 pt-1 border-t border-border mt-1",
		children: [
			/* @__PURE__ */ $("div", {
				className: "flex items-center justify-between mb-1",
				children: [/* @__PURE__ */ $("span", {
					className: "text-[11px] text-text-secondary font-semibold uppercase tracking-wide",
					children: [
						"Members (",
						t.length,
						")"
					]
				}), S && /* @__PURE__ */ Q("button", {
					onClick: () => d((e) => !e),
					className: "text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]",
					children: "+ Invite"
				})]
			}),
			u && /* @__PURE__ */ $("form", {
				onSubmit: (e) => {
					w(e);
				},
				className: "flex gap-1 mb-1.5",
				children: [/* @__PURE__ */ Q(P, {
					size: "sm",
					value: f,
					onChange: (e) => p(e.target.value),
					placeholder: "User ID",
					className: "flex-1"
				}), /* @__PURE__ */ Q("button", {
					type: "submit",
					disabled: !f.trim(),
					className: o("h-6 px-2 border-none rounded text-[11px] font-[inherit]", f.trim() ? "bg-primary text-on-primary cursor-pointer" : "bg-border text-text-tertiary cursor-default"),
					children: "Invite"
				})]
			}),
			u && m && /* @__PURE__ */ Q("div", {
				role: "alert",
				"data-testid": "compact-invite-error",
				className: "text-danger-fg text-[11px] mb-1.5",
				children: m
			}),
			/* @__PURE__ */ $("div", {
				className: "flex flex-wrap gap-1 mb-2",
				children: [t.slice(0, 8).map((e) => /* @__PURE__ */ Q("div", {
					title: e.displayName ?? e.userId,
					className: "w-6 h-6 rounded-full bg-border flex items-center justify-center text-[10px] font-semibold text-text-primary",
					children: (e.displayName ?? e.userId).slice(0, 2).toUpperCase()
				}, e.userId)), t.length > 8 && /* @__PURE__ */ $("span", {
					className: "text-[11px] text-text-tertiary self-center",
					children: ["+", t.length - 8]
				})]
			}),
			/* @__PURE__ */ $("div", {
				className: "flex items-center justify-between mb-1",
				children: [/* @__PURE__ */ $("span", {
					className: "text-[11px] text-text-secondary font-semibold uppercase tracking-wide",
					children: [
						"Rooms (",
						C.length,
						")"
					]
				}), S && /* @__PURE__ */ Q("button", {
					onClick: () => _((e) => !e),
					className: "text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]",
					children: "+ Room"
				})]
			}),
			g && /* @__PURE__ */ $("form", {
				onSubmit: (e) => {
					T(e);
				},
				className: "flex gap-1 mb-1.5",
				children: [/* @__PURE__ */ Q(P, {
					size: "sm",
					value: v,
					onChange: (e) => y(e.target.value.slice(0, 50)),
					placeholder: "Room name",
					className: "flex-1"
				}), /* @__PURE__ */ Q("button", {
					type: "submit",
					disabled: !v.trim() || l,
					className: o("h-6 px-2 border-none rounded text-[11px] font-[inherit]", !v.trim() || l ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-on-primary cursor-pointer"),
					children: "Create"
				})]
			}),
			g && b && /* @__PURE__ */ Q("div", {
				role: "alert",
				"data-testid": "compact-group-room-error",
				className: "text-danger-fg text-[11px] mb-1.5",
				children: b
			}),
			C.map((e) => /* @__PURE__ */ $(s ? "button" : "div", {
				type: s ? "button" : void 0,
				onClick: s ? () => s(e) : void 0,
				className: o("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1 bg-transparent text-text-primary text-[13px] text-left font-[inherit]", s && "cursor-pointer"),
				children: [/* @__PURE__ */ Q("span", {
					className: "text-text-tertiary text-xs",
					children: "#"
				}), /* @__PURE__ */ Q("span", {
					className: "overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.name
				})]
			}, e.roomId))
		]
	});
}
function jt({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = X(""), [a, s] = X("public"), [c, l] = X(null), u = ze(), d = async (t) => {
		if (t.preventDefault(), r.trim()) {
			l(null);
			try {
				await e(r.trim(), void 0, a);
			} catch (e) {
				l(e instanceof Error ? e.message : "Failed to create group");
			}
		}
	};
	return /* @__PURE__ */ $("form", {
		onSubmit: (e) => {
			d(e);
		},
		className: "mb-3 p-3 bg-surface-panel rounded-lg border border-border",
		children: [
			/* @__PURE__ */ $("div", {
				className: "mb-3",
				children: [/* @__PURE__ */ Q("label", {
					htmlFor: `${u}-group-name`,
					className: "text-sm text-text-primary block mb-1",
					children: "Group name"
				}), /* @__PURE__ */ Q(P, {
					id: `${u}-group-name`,
					"aria-describedby": c ? `${u}-form-error` : void 0,
					"aria-invalid": c ? !0 : void 0,
					value: r,
					onChange: (e) => i(e.target.value.slice(0, 50)),
					placeholder: "Group name",
					maxLength: 50,
					required: !0
				})]
			}),
			/* @__PURE__ */ $("div", {
				className: "flex items-center gap-2.5 mb-3.5",
				children: [
					/* @__PURE__ */ Q("span", {
						className: "text-[13px] text-text-primary min-w-[42px]",
						children: a === "public" ? "Public" : "Private"
					}),
					/* @__PURE__ */ Q("button", {
						type: "button",
						role: "switch",
						"aria-label": "Private group",
						"aria-checked": a === "private",
						onClick: () => s((e) => e === "public" ? "private" : "public"),
						className: o("relative w-11 h-6 rounded-xl border-none cursor-pointer p-0 shrink-0 transition-colors duration-200", a === "private" ? "bg-primary" : "bg-state-idle"),
						children: /* @__PURE__ */ Q("span", { className: o("absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-[left] duration-200", a === "private" ? "left-[23px]" : "left-[3px]") })
					}),
					/* @__PURE__ */ Q("span", {
						className: "text-xs text-text-tertiary",
						children: a === "public" ? "Visible to everyone" : "Invite only"
					})
				]
			}),
			/* @__PURE__ */ $("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ Q("button", {
					type: "submit",
					disabled: !r.trim() || n,
					className: o("flex-1 h-9 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !r.trim() || n ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-on-primary border-none cursor-pointer"),
					children: n ? "Creating…" : "Create Group"
				}), /* @__PURE__ */ Q("button", {
					type: "button",
					onClick: t,
					className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
					children: "Cancel"
				})]
			}),
			c && /* @__PURE__ */ Q("div", {
				id: `${u}-form-error`,
				role: "alert",
				className: "text-danger-fg text-[13px] mt-1.5",
				children: c
			})
		]
	});
}
function Mt({ group: e, currentUserId: t, isSelected: n, onSelect: r, onDelete: i }) {
	let [a, s] = X(null), c = e.ownerId === t;
	return /* @__PURE__ */ $("div", {
		role: "button",
		tabIndex: 0,
		"aria-pressed": n,
		"aria-label": `Select group ${e.name}`,
		className: "flex items-center h-14 border-b border-surface-hover cursor-pointer",
		onClick: () => r(e.groupId),
		onKeyDown: (t) => {
			(t.key === "Enter" || t.key === " ") && (t.preventDefault(), r(e.groupId));
		},
		children: [
			/* @__PURE__ */ $("div", {
				className: "flex-1 min-w-0 pr-2",
				children: [/* @__PURE__ */ Q("div", {
					className: o("text-base text-text-primary", n ? "font-semibold" : "font-normal"),
					children: e.name
				}), e.description && /* @__PURE__ */ Q("div", {
					className: "text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.description
				})]
			}),
			/* @__PURE__ */ Q("span", {
				className: o("text-xs px-2 py-0.5 rounded shrink-0 mr-2", e.visibility === "public" ? "bg-success-bg text-success" : "bg-surface-hover text-text-secondary"),
				children: e.visibility
			}),
			c && /* @__PURE__ */ Q("div", {
				className: "shrink-0",
				onClick: (e) => e.stopPropagation(),
				children: a === e.groupId ? /* @__PURE__ */ $("div", {
					role: "group",
					"aria-label": "Confirm delete group",
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ Q("button", {
						onClick: () => s(null),
						className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Cancel"
					}), /* @__PURE__ */ Q("button", {
						onClick: () => {
							i(e.groupId), s(null);
						},
						className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Delete"
					})]
				}) : /* @__PURE__ */ Q("button", {
					onClick: () => s(e.groupId),
					className: "text-xs text-danger-fg bg-transparent border-none cursor-pointer px-2 py-1 font-[system-ui,-apple-system,sans-serif]",
					"aria-label": `Delete group ${e.name}`,
					children: "Delete"
				})
			})
		]
	});
}
function Nt({ groupId: e, onInvite: t }) {
	let [n, r] = X(""), [i, a] = X(null), s = async (i) => {
		if (i.preventDefault(), n.trim()) {
			a(null);
			try {
				await t(e, n.trim());
			} catch (e) {
				a(e instanceof Error ? e.message : "Failed to invite user");
				return;
			}
			r("");
		}
	};
	return /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ $("form", {
		onSubmit: (e) => {
			s(e);
		},
		className: "flex gap-2 mt-2",
		children: [/* @__PURE__ */ Q(P, {
			className: "flex-1",
			value: n,
			onChange: (e) => r(e.target.value),
			placeholder: "User ID to invite"
		}), /* @__PURE__ */ Q("button", {
			type: "submit",
			disabled: !n.trim(),
			className: o("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", n.trim() ? "bg-primary text-on-primary border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"),
			children: "Invite"
		})]
	}), i && /* @__PURE__ */ Q("div", {
		role: "alert",
		"data-testid": "invite-error",
		className: "text-danger-fg text-xs mt-1",
		children: i
	})] });
}
function Pt({ members: e }) {
	let t = (e) => e === "owner" ? "bg-success-bg text-success text-xs px-2 py-0.5 rounded" : e === "admin" ? "bg-info-bg text-info text-xs px-2 py-0.5 rounded" : "bg-surface-hover text-text-secondary text-xs px-2 py-0.5 rounded";
	return /* @__PURE__ */ Q("div", {
		className: "max-h-[200px] overflow-y-auto mt-2 border-t border-border",
		children: e.map((e) => /* @__PURE__ */ $("div", {
			className: "flex items-center gap-2 h-12 border-b border-surface-hover",
			children: [
				/* @__PURE__ */ Q("div", {
					className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
					children: (e.displayName ?? e.userId).slice(0, 2).toUpperCase()
				}),
				/* @__PURE__ */ Q("div", {
					className: "flex-1 text-base text-text-primary",
					children: e.displayName ?? e.userId
				}),
				/* @__PURE__ */ Q("span", {
					className: t(e.role),
					children: e.role
				})
			]
		}, e.userId))
	});
}
function Ft({ rooms: e, groupId: t, selectedGroupRole: n, createGroupRoom: r, onRoomSelect: i, loading: a }) {
	let [s, c] = X(!1), [l, u] = X(""), [d, f] = X(null), p = e.filter((e) => e.groupId === t), m = async (e) => {
		if (e.preventDefault(), l.trim()) {
			f(null);
			try {
				await r(t, l.trim());
			} catch (e) {
				f(e instanceof Error ? e.message : "Failed to create room");
				return;
			}
			u(""), c(!1);
		}
	};
	return /* @__PURE__ */ $("div", {
		className: "mt-3",
		children: [
			/* @__PURE__ */ Q("h3", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-2",
				children: "GROUP ROOMS"
			}),
			(n === "owner" || n === "admin") && (s ? /* @__PURE__ */ $("form", {
				onSubmit: (e) => {
					m(e);
				},
				className: "mb-2 p-3 bg-surface-panel rounded-lg border border-border",
				children: [/* @__PURE__ */ $("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ Q(P, {
							className: "flex-1",
							value: l,
							onChange: (e) => u(e.target.value.slice(0, 50)),
							placeholder: "Room name",
							maxLength: 50,
							required: !0
						}),
						/* @__PURE__ */ Q("button", {
							type: "submit",
							disabled: !l.trim() || a,
							className: o("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !l.trim() || a ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-on-primary border-none cursor-pointer"),
							children: a ? "Creating…" : "Create Room"
						}),
						/* @__PURE__ */ Q("button", {
							type: "button",
							onClick: () => c(!1),
							className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
							children: "Cancel"
						})
					]
				}), d && /* @__PURE__ */ Q("div", {
					role: "alert",
					"data-testid": "group-room-error",
					className: "text-danger-fg text-[13px] mt-1.5",
					children: d
				})]
			}) : /* @__PURE__ */ Q("button", {
				onClick: () => c(!0),
				className: "w-full h-9 mb-2 bg-primary text-on-primary border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Create Room"
			})),
			p.length === 0 ? /* @__PURE__ */ Q("div", {
				className: "text-sm text-text-tertiary py-2",
				children: "No rooms in this group yet."
			}) : p.map((e) => /* @__PURE__ */ $("div", {
				role: i ? "button" : void 0,
				tabIndex: i ? 0 : void 0,
				"aria-label": i ? `Open room ${e.name}` : void 0,
				className: o("flex items-center h-12 border-b border-surface-hover pr-2", i && "cursor-pointer"),
				onClick: i ? () => i(e) : void 0,
				onKeyDown: i ? (t) => {
					(t.key === "Enter" || t.key === " ") && (t.preventDefault(), i(e));
				} : void 0,
				children: [/* @__PURE__ */ Q("div", {
					className: "flex-1 text-base text-text-primary",
					children: e.name
				}), /* @__PURE__ */ Q("span", {
					className: "bg-info-bg text-info text-xs px-2 py-0.5 rounded",
					children: "group"
				})]
			}, e.roomId))
		]
	});
}
function It({ idToken: e, rooms: n, createGroupRoom: r, onRoomSelect: i, roomsLoading: a, compact: s }) {
	let { groups: c, createGroup: l, deleteGroup: u, inviteUser: d, loadMembers: f, members: p, loading: m, loaded: h, loadError: g, refresh: _ } = t({ idToken: e }), v = !h && !g, [y, b] = X(!1), [x, S] = X(null), C = e ? (() => {
		try {
			return JSON.parse(atob(e.split(".")[1])).sub;
		} catch {
			return null;
		}
	})() : null, w = async (e, t, n) => {
		await l(e, t, n), b(!1);
	}, T = (e) => {
		x === e ? S(null) : (S(e), f(e));
	};
	if (s) {
		let e = x ? c.find((e) => e.groupId === x) : null;
		return /* @__PURE__ */ $("div", {
			className: "px-2 pt-2",
			children: [
				/* @__PURE__ */ Q("button", {
					onClick: () => b((e) => !e),
					className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
					children: "+ New Group"
				}),
				y && /* @__PURE__ */ Q(kt, {
					onCreate: w,
					onDiscard: () => b(!1),
					loading: m
				}),
				/* @__PURE__ */ Q("div", { children: v && c.length === 0 ? /* @__PURE__ */ Q("div", {
					role: "status",
					className: "p-2 text-text-tertiary text-xs text-center",
					children: "Loading…"
				}) : g && c.length === 0 ? /* @__PURE__ */ $("div", {
					role: "alert",
					"data-testid": "compact-groups-load-error",
					className: "px-2 py-3 text-danger-fg text-xs",
					children: [
						/* @__PURE__ */ Q("div", { children: "Couldn’t load groups." }),
						/* @__PURE__ */ Q("div", {
							className: "text-text-tertiary mt-0.5",
							children: g
						}),
						/* @__PURE__ */ Q("button", {
							type: "button",
							onClick: () => {
								_();
							},
							className: "mt-1 text-[11px] text-primary bg-transparent border-none cursor-pointer p-0 font-[inherit]",
							children: "Retry"
						})
					]
				}) : c.length === 0 ? /* @__PURE__ */ Q("div", {
					className: "px-2 py-3 text-text-tertiary text-xs",
					children: "No groups yet"
				}) : c.map((e) => /* @__PURE__ */ Q(Ot, {
					group: e,
					isSelected: e.groupId === x,
					onClick: () => T(e.groupId)
				}, e.groupId)) }),
				e && /* @__PURE__ */ Q(At, {
					group: e,
					members: p,
					rooms: n,
					groupId: e.groupId,
					currentUserId: C,
					createGroupRoom: r,
					onRoomSelect: i,
					inviteUser: d,
					loading: a
				})
			]
		});
	}
	let E = x ? c.find((e) => e.groupId === x) : null, D = E && C && E.ownerId === C ? "owner" : "member";
	return /* @__PURE__ */ $("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ Q("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
				children: "Groups"
			}),
			/* @__PURE__ */ Q("div", {
				className: "max-h-80 overflow-y-auto mb-3",
				children: v && c.length === 0 ? /* @__PURE__ */ Q("div", {
					role: "status",
					className: "py-4 text-center text-sm text-text-tertiary",
					children: "Loading groups…"
				}) : g && c.length === 0 ? /* @__PURE__ */ $("div", {
					role: "alert",
					"data-testid": "groups-load-error",
					className: "py-4 text-center",
					children: [
						/* @__PURE__ */ Q("div", {
							className: "text-sm font-semibold text-danger-fg mb-1",
							children: "Couldn’t load groups"
						}),
						/* @__PURE__ */ Q("div", {
							className: "text-sm text-text-tertiary mb-2",
							children: g
						}),
						/* @__PURE__ */ Q("button", {
							type: "button",
							onClick: () => {
								_();
							},
							className: "text-sm text-primary bg-transparent border border-border rounded-lg px-3 py-1 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
							children: "Retry"
						})
					]
				}) : c.length === 0 ? /* @__PURE__ */ $("div", {
					className: "py-4 text-center",
					children: [/* @__PURE__ */ Q("div", {
						className: "text-sm font-semibold text-text-primary mb-1",
						children: "No groups yet"
					}), /* @__PURE__ */ Q("div", {
						className: "text-sm text-text-tertiary",
						children: "Create a group or join a public one."
					})]
				}) : c.map((e) => /* @__PURE__ */ Q(Mt, {
					group: e,
					currentUserId: C,
					isSelected: x === e.groupId,
					onSelect: T,
					onDelete: u
				}, e.groupId))
			}),
			x && /* @__PURE__ */ $("div", {
				className: "mb-3",
				children: [
					/* @__PURE__ */ Q(Pt, { members: p }),
					(D === "owner" || D === "admin") && /* @__PURE__ */ Q(Nt, {
						groupId: x,
						onInvite: d
					}),
					/* @__PURE__ */ Q(Ft, {
						rooms: n,
						groupId: x,
						selectedGroupRole: D,
						createGroupRoom: r,
						onRoomSelect: i,
						loading: a
					})
				]
			}),
			/* @__PURE__ */ Q("button", {
				onClick: () => b((e) => !e),
				className: o("w-full h-9 bg-primary text-on-primary border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]", y && "mb-2"),
				children: y ? "Cancel" : "Create Group"
			}),
			y && /* @__PURE__ */ Q(jt, {
				onCreate: w,
				onDiscard: () => b(!1),
				loading: m
			})
		]
	});
}
//#endregion
//#region src/components/social/ActivityPanel.tsx
function Lt() {
	return "";
}
var Rt = 50;
function zt(e) {
	let t = e.detail;
	switch (e.eventType) {
		case "social.room.join": return {
			icon: "🚪",
			text: `Joined room ${t.roomId?.slice(0, 8) ?? ""}`
		};
		case "social.room.leave": return {
			icon: "🚪",
			text: `Left room ${t.roomId?.slice(0, 8) ?? ""}`
		};
		case "social.follow": return {
			icon: "👥",
			text: `Followed @${t.followeeId?.slice(0, 8) ?? ""}`
		};
		case "social.unfollow": return {
			icon: "👥",
			text: `Unfollowed @${t.followeeId?.slice(0, 8) ?? ""}`
		};
		case "social.like": return {
			icon: "❤️",
			text: `Liked ${t.contentId?.slice(0, 8) ?? "content"}`
		};
		case "social.reaction": return {
			icon: t.emoji ?? "😀",
			text: `Reacted to ${t.contentId?.slice(0, 8) ?? "content"}`
		};
		case "social.post.created": return {
			icon: "📝",
			text: `Posted in room ${t.roomId?.slice(0, 8) ?? ""}`
		};
		case "social.comment.created": return {
			icon: "💬",
			text: `Commented in room ${t.roomId?.slice(0, 8) ?? ""}`
		};
		case "pipeline.run.started": {
			let e = t.pipelineId ?? "";
			return {
				icon: "▶",
				text: e ? `Triggered pipeline ${e}` : "Triggered pipeline"
			};
		}
		case "pipeline.run.completed": return {
			icon: "✓",
			text: typeof t.durationMs == "number" ? `Pipeline run completed in ${t.durationMs}ms` : "Pipeline run completed"
		};
		case "pipeline.run.failed": return {
			icon: "✕",
			text: `Pipeline run failed: ${t.error ?? "unknown error"}`
		};
		case "pipeline.approval.requested": return {
			icon: "✋",
			text: "Approval requested"
		};
		default: return {
			icon: "ℹ️",
			text: e.eventType
		};
	}
}
function Bt(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function Vt(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function Ht({ idToken: e, sendMessage: t, onMessage: n, connectionState: r, baseUrl: i, fetchActivity: a, onError: o }) {
	let [c, l] = X([]), [u, d] = X(!0), [f, p] = X(!1), [m, h] = X(null), [g, _] = X(0), v = Y(t);
	q(() => {
		v.current = t;
	}, [t]);
	let { toast: y } = s(), b = Y(o);
	q(() => {
		b.current = o;
	}, [o]);
	let x = Vt(e), S = K(() => _((e) => e + 1), []);
	return q(() => {
		if (a) {
			let t = !1;
			return d(!0), h(null), Promise.resolve(a({
				idToken: e,
				limit: 20
			})).then((e) => {
				t || (l(e?.items ?? []), h(null));
			}).catch((e) => {
				if (t) return;
				let n = e instanceof Error ? e : Error(String(e));
				console.error("[activity] fetch failed:", e), h(n.message), y("Couldn't load activity feed", { type: "error" }), b.current?.(n);
			}).finally(() => {
				t || d(!1);
			}), () => {
				t = !0;
			};
		}
		let t = i ?? Lt();
		if (!e || !t) {
			d(!1);
			return;
		}
		let n = !1;
		return d(!0), h(null), fetch(`${t}/api/activity?limit=20`, { headers: { Authorization: `Bearer ${e}` } }).then((e) => {
			if (!e.ok) throw Error(`HTTP ${e.status}`);
			return e.json();
		}).then((e) => {
			!n && e?.items && (l(e.items), h(null));
		}).catch((e) => {
			if (n) return;
			let t = e instanceof Error ? e : Error(String(e));
			console.error("[activity] fetch failed:", e), h(t.message), y("Couldn't load activity feed", { type: "error" }), b.current?.(t);
		}).finally(() => {
			n || d(!1);
		}), () => {
			n = !0;
		};
	}, [
		e,
		g,
		y,
		i,
		a
	]), q(() => {
		if (r !== "connected" || !x) {
			p(!1);
			return;
		}
		let e = `activity:${x}`;
		return v.current({
			service: "activity",
			action: "subscribe",
			channelId: e
		}), p(!0), () => {
			v.current({
				service: "activity",
				action: "unsubscribe",
				channelId: e
			}), p(!1);
		};
	}, [r, x]), q(() => n((e) => {
		if (e.type !== "activity:event") return;
		let t = e.payload;
		t && l((e) => e.length > 0 && e[0].timestamp === t.timestamp && e[0].eventType === t.eventType ? e : [{
			eventType: t.eventType,
			timestamp: t.timestamp,
			detail: t.detail
		}, ...e].slice(0, Rt));
	}), [n]), {
		items: c,
		loading: u,
		isLive: f,
		error: m,
		retry: S
	};
}
function Ut({ idToken: e, sendMessage: t, onMessage: n, connectionState: r, baseUrl: i, fetchActivity: a, onError: s }) {
	let { items: c, loading: u, isLive: f, error: p, retry: m } = Ht({
		idToken: e,
		sendMessage: t,
		onMessage: n,
		connectionState: r,
		baseUrl: i,
		fetchActivity: a,
		onError: s
	});
	return /* @__PURE__ */ $(d, {
		padding: "md",
		children: [/* @__PURE__ */ $(O, {
			gap: "sm",
			align: "center",
			className: "mb-3",
			children: [/* @__PURE__ */ Q("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary m-0",
				children: "Activity"
			}), f && /* @__PURE__ */ Q(U, {
				color: "var(--color-success)",
				size: "xs",
				title: "Live",
				"aria-label": "Live"
			})]
		}), u ? /* @__PURE__ */ Q(ee, { label: "Loading..." }) : p && c.length === 0 ? /* @__PURE__ */ Q(B, {
			title: "Couldn't load activity",
			body: p,
			action: /* @__PURE__ */ Q(l, {
				variant: "secondary",
				size: "sm",
				onClick: m,
				children: "Retry"
			})
		}) : c.length === 0 ? /* @__PURE__ */ Q(z, { title: "No activity yet" }) : /* @__PURE__ */ Q(A, {
			gap: "none",
			children: c.map((e, t) => {
				let { icon: n, text: r } = zt(e);
				return /* @__PURE__ */ $(O, {
					gap: "sm",
					align: "center",
					className: o("py-2", t < c.length - 1 && "border-b border-surface-hover"),
					children: [
						/* @__PURE__ */ Q("span", {
							className: "w-6 shrink-0 text-center",
							children: n
						}),
						/* @__PURE__ */ Q("span", {
							className: "flex-1 text-sm text-text-primary",
							children: r
						}),
						/* @__PURE__ */ Q("span", {
							className: "text-xs text-text-tertiary shrink-0",
							children: Bt(e.timestamp)
						})
					]
				}, t);
			})
		})]
	});
}
//#endregion
//#region src/components/social/ReactionsBar.tsx
function Wt({ reactions: e, onReact: t, disabled: n = !1, pickerEmojis: r = Ae, addTriggerLabel: i, hideAddTrigger: a = !1, className: s }) {
	let [c, l] = X(!1), u = Y(null), d = (e) => {
		n || t(e);
	}, f = (e) => {
		t(e);
	}, p = [], m = /* @__PURE__ */ new Map();
	for (let t of e) if (m.has(t.emoji)) {
		let e = m.get(t.emoji), n = p[e];
		p[e] = {
			emoji: t.emoji,
			count: n.count + t.count,
			mine: n.mine || t.mine
		};
	} else m.set(t.emoji, p.length), p.push({ ...t });
	return /* @__PURE__ */ $("div", {
		"data-testid": "reactions-bar",
		className: o("relative inline-flex flex-wrap items-center gap-1", s),
		children: [
			p.map((e) => /* @__PURE__ */ $("button", {
				type: "button",
				onClick: () => d(e.emoji),
				disabled: n,
				"aria-pressed": e.mine ?? !1,
				"data-testid": "reaction-chip",
				"data-emoji": e.emoji,
				"data-mine": e.mine ? "true" : "false",
				className: o("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs leading-none transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", e.mine ? "border-[var(--color-primary)] bg-[var(--color-primary)]/15 text-[var(--color-text-primary)]" : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/60 hover:text-[var(--color-text-primary)]", n && "opacity-50 cursor-not-allowed"),
				children: [/* @__PURE__ */ Q("span", {
					"aria-hidden": !0,
					className: "text-sm leading-none",
					children: e.emoji
				}), /* @__PURE__ */ Q("span", {
					className: "tabular-nums",
					children: e.count
				})]
			}, e.emoji)),
			!a && /* @__PURE__ */ $("button", {
				ref: u,
				type: "button",
				onClick: () => !n && l((e) => !e),
				disabled: n,
				"aria-haspopup": "dialog",
				"aria-expanded": c,
				"data-testid": "reactions-bar-add",
				className: o("inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-border)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", "h-6 min-w-6 px-1.5 text-xs text-[var(--color-text-secondary)] transition-colors", !n && "hover:border-[var(--color-primary)] hover:text-[var(--color-text-primary)]", n && "opacity-50 cursor-not-allowed"),
				children: [i ?? /* @__PURE__ */ Q("span", {
					"aria-hidden": !0,
					children: "+ 😀"
				}), /* @__PURE__ */ Q("span", {
					className: "sr-only",
					children: "Add reaction"
				})]
			}),
			/* @__PURE__ */ Q(ke, {
				open: c,
				onSelect: f,
				onClose: () => l(!1),
				triggerRef: u,
				emojis: r
			})
		]
	});
}
//#endregion
//#region src/components/social/ConversationShelf.tsx
function Gt({ items: e, activeId: t, onSelect: n, compact: r = !1, iconOnly: i = !1, size: a = "sm", plain: s = !1, layout: c = "list", className: l, "data-testid": u = "conversation-shelf" }) {
	if (e.length === 0) return null;
	if (c === "bar") return /* @__PURE__ */ Q("ul", {
		"data-testid": u,
		"data-layout": "bar",
		className: o("m-0 flex list-none items-center gap-1 p-0", l),
		children: e.map((e) => {
			let r = e.id === t, i = e.count ?? 0, a = i > 0 ? `${e.label}, ${i > 99 ? "99+" : i} ${e.urgent ? "waiting" : "new"}` : e.label;
			return /* @__PURE__ */ Q("li", { children: /* @__PURE__ */ $("button", {
				type: "button",
				onClick: () => n(e.id),
				title: e.label,
				"data-testid": `${u}-${e.id}`,
				"data-active": r ? "true" : "false",
				"aria-current": r ? "true" : void 0,
				className: o("relative grid h-8 w-8 cursor-pointer place-items-center rounded-md border-none bg-transparent p-0 text-text-secondary", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", r ? "bg-primary-bg text-primary-fg" : "hover:bg-surface-hover hover:text-text-primary"),
				children: [
					/* @__PURE__ */ Q("span", {
						"aria-hidden": !0,
						className: "grid h-[18px] w-[18px] place-items-center [&>svg]:h-[18px] [&>svg]:w-[18px]",
						children: e.icon ?? /* @__PURE__ */ Q("span", { className: "h-1.5 w-1.5 rounded-full bg-current" })
					}),
					/* @__PURE__ */ Q("span", {
						className: "sr-only",
						children: a
					}),
					i > 0 && /* @__PURE__ */ Q("span", {
						"aria-hidden": !0,
						"data-testid": `${u}-${e.id}-count`,
						className: o("absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] font-semibold leading-none text-white", e.urgent ? "bg-danger" : "bg-primary"),
						children: i > 99 ? "99+" : i
					})
				]
			}) }, e.id);
		})
	});
	let d = a === "rail", f = a === "md" || d;
	return /* @__PURE__ */ Q("ul", {
		"data-testid": u,
		className: o("m-0 flex list-none flex-col gap-0.5 p-0", l),
		children: e.map((e) => {
			let a = e.id === t, c = e.count ?? 0;
			return /* @__PURE__ */ Q("li", { children: /* @__PURE__ */ $("button", {
				type: "button",
				onClick: () => n(e.id),
				"aria-label": i ? e.label : void 0,
				title: i ? e.label : void 0,
				"data-testid": `${u}-${e.id}`,
				"data-active": a ? "true" : "false",
				"aria-current": a ? "true" : void 0,
				className: o("relative flex w-full cursor-pointer items-center gap-2 text-left", r ? o("border-l-2 border-transparent px-2", d ? o("min-h-9 gap-3", he) : f ? "min-h-9 gap-3 py-1.5" : "min-h-8 py-1") : "rounded-lg px-2 py-1.5", r && a && (s ? "border-primary bg-primary-bg" : "border-primary bg-surface-hover"), s && f && "pl-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", !(s && a) && "hover:bg-surface-hover", a && !s && "bg-surface-hover"),
				children: [
					!s && /* @__PURE__ */ Q("span", {
						"aria-hidden": !0,
						className: r ? f ? "grid h-5 w-5 shrink-0 place-items-center" : "grid h-4 w-4 shrink-0 place-items-center" : "grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-surface-inset",
						children: /* @__PURE__ */ Q("span", {
							className: o("grid shrink-0 place-items-center text-text-secondary", f ? "h-5 w-5 [&>svg]:h-[18px] [&>svg]:w-[18px]" : "h-4 w-4"),
							children: e.icon ?? /* @__PURE__ */ Q("span", { className: "h-1.5 w-1.5 rounded-full bg-current" })
						})
					}),
					!i && /* @__PURE__ */ Q("span", {
						className: o("min-w-0 flex-1 truncate", d ? "text-[13px] font-medium leading-5" : f ? "text-[15px]" : "text-[13px]", s && a ? "font-medium text-primary-fg" : c > 0 || a ? "font-semibold text-text-primary" : d ? "text-text-primary" : f ? "font-normal text-text-primary" : "font-medium text-text-secondary"),
						children: e.label
					}),
					c > 0 && /* @__PURE__ */ Q("span", {
						"data-testid": `${u}-${e.id}-count`,
						className: o("grid h-5 min-w-5 shrink-0 place-items-center rounded px-1 text-[11px] font-semibold leading-none text-white", i && "absolute right-0 top-0 scale-75", e.urgent ? "bg-danger" : "bg-primary"),
						children: c > 99 ? "99+" : c
					})
				]
			}) }, e.id);
		})
	});
}
//#endregion
//#region src/components/social/ConversationRail.tsx
var Kt = "px-2", qt = "px-2", Jt = "dms", Yt = "channels";
function Xt(e, t) {
	let n = new Set(e), r = (t ?? []).filter((e, t, r) => n.has(e) && r.indexOf(e) === t), i = e.filter((e) => !r.includes(e)), a = [...r];
	for (let t of i) {
		let n = e.slice(0, e.indexOf(t)).reverse().find((e) => a.includes(e));
		a.splice(n ? a.indexOf(n) + 1 : 0, 0, t);
	}
	return a;
}
function Zt({ shelf: e = [], conversations: t, selected: n = null, onSelect: r, onNewChat: i, grouped: a = !0, sectionOrder: s = "channels-first", sectionActions: c, collapsedSections: l, onToggleSection: u, onStartCall: d, maxVisible: f, emptyLabel: m, header: g, title: _, actions: v, beforeList: y, footer: b, onTogglePin: x, onToggleMute: w, onMarkUnread: T, onRename: E, canRename: D, onSetSection: O, collapsible: k = !1, collapsed: A = !1, onToggleCollapse: M, shelfLayout: N = "list", search: P, sections: F, sectionLayout: I, onSectionLayoutChange: R, className: z, "data-testid": B = "conversation-rail" }) {
	let [ee, te] = X(!1), [V, re] = X(!1), H = Y(null), ie = !!P && (ee || P.value !== ""), U = P?.label ?? "Find a chat", ae = () => {
		P?.onChange(""), te(!1), H.current?.focus();
	}, W = k && A, oe = n?.kind === "shelf" ? n.id : null, se = {
		sectionActions: c,
		collapsedSections: l,
		onToggleSection: u,
		onStartCall: d,
		maxVisible: f,
		activeChannel: n?.kind === "conversation" ? n.channel : null,
		onSelect: (e) => r({
			kind: "conversation",
			channel: e
		}),
		onTogglePin: x,
		onToggleMute: w,
		onMarkUnread: T,
		onRename: E,
		canRename: D,
		onSetSection: O
	}, G = (e) => (e.kind ?? (e.peers.length > 1 ? "group" : "dm")) === "channel", ce = F ? [{
		id: "dms",
		label: "Direct messages",
		node: null
	}, {
		id: Yt,
		label: "Channels",
		node: null
	}] : [], le = F ? [...F, ...s === "dms-first" ? ce : [...ce].reverse()] : [], ue = le.map((e) => e.id), de = F ? Xt(ue, I) : [], fe = new Map(le.map((e) => [e.id, e])), pe = (e, t) => {
		let n = [...de], r = n.indexOf(e), i = r + t;
		r < 0 || i < 0 || i >= n.length || ([n[r], n[i]] = [n[i], n[r]], R?.(n));
	}, me = t.filter((e) => !G(e)), he = t.filter(G), ge = (e) => {
		if (e === "dms" || e === "channels") {
			let t = e === "dms" ? me : he;
			return t.length === 0 ? null : /* @__PURE__ */ Q($e, {
				items: t,
				grouped: !0,
				sectionOrder: s,
				...se,
				onNewChat: e === "dms" ? i : void 0,
				className: o(Kt, "pb-2"),
				"data-testid": `${B}-list-${e}`
			}, e);
		}
		let t = fe.get(e);
		if (!t) return null;
		let n = t["data-testid"], r = !!l?.[t.label], a = (t.rows || t.heading) && /* @__PURE__ */ Q(we, {
			label: t.label,
			presentational: !1,
			...typeof t.count == "number" ? { count: t.count } : {},
			...u ? {
				collapsed: r,
				onToggleCollapse: (e) => u(t.label, e)
			} : {},
			...n ? { controls: n } : {}
		}), c = t.rows ? t.note ? /* @__PURE__ */ Q(j, {
			as: "div",
			size: "xs",
			tone: "tertiary",
			wrap: !0,
			className: qt,
			...n ? { "data-testid": `${n}-note` } : {},
			children: t.note
		}) : /* @__PURE__ */ Q($e, {
			items: t.rows,
			activeChannel: t.activeRow ?? null,
			onSelect: (e) => t.onSelectRow?.(e),
			grouped: !1,
			sortByRecency: !1,
			...t.maxVisible ? { maxVisible: t.maxVisible } : {},
			...t.emptyLabel ? { emptyLabel: t.emptyLabel } : {},
			...n ? { "data-testid": n } : {}
		}) : t.node;
		return /* @__PURE__ */ $("div", {
			className: o("shrink-0", Kt),
			"data-rail-section": e,
			...n && a ? { "data-testid": `${n}-section` } : {},
			children: [a, a && u && r ? null : c]
		}, e);
	}, _e = P || R || v != null ? /* @__PURE__ */ $(Z, { children: [
		P && /* @__PURE__ */ Q(p, {
			ref: H,
			size: "sm",
			variant: "ghost",
			"aria-label": U,
			title: U,
			"aria-pressed": ie,
			"aria-expanded": ie,
			icon: /* @__PURE__ */ Q(S, { size: 14 }),
			onClick: () => ie ? ae() : te(!0),
			"data-testid": `${B}-search-toggle`
		}),
		v,
		R && F && /* @__PURE__ */ Q(ne, {
			trigger: /* @__PURE__ */ Q(h, { size: 14 }),
			triggerLabel: "Rail options",
			triggerTitle: "Rail options",
			align: "end",
			triggerTestId: `${B}-options`,
			triggerClassName: "h-7 w-7 border-transparent px-0 py-0 text-text-secondary",
			sections: [{ items: [{
				label: V ? "Done arranging" : "Arrange sections…",
				onSelect: () => re((e) => !e),
				"data-testid": `${B}-arrange`
			}, {
				label: "Reset layout",
				onSelect: () => {
					R(null), re(!1);
				},
				"data-testid": `${B}-reset-layout`
			}] }]
		})
	] }) : void 0, ve = ie && P ? /* @__PURE__ */ Q(L, {
		value: P.value,
		onChange: P.onChange,
		placeholder: P.placeholder ?? U,
		size: "sm",
		className: "w-full",
		"aria-label": U,
		autoFocus: !0,
		onKeyDown: (e) => {
			e.key === "Escape" && (e.preventDefault(), ae());
		},
		"data-testid": P["data-testid"] ?? `${B}-search`
	}) : null;
	return /* @__PURE__ */ $(He, {
		title: _,
		label: "Chat",
		actions: _e,
		header: ve || g ? /* @__PURE__ */ $(Z, { children: [ve, g] }) : void 0,
		footer: b,
		collapsed: W,
		onToggle: k ? () => M?.(!W) : void 0,
		toggleLabel: W ? "Expand the sidebar" : "Collapse the sidebar",
		toggleTestId: `${B}-collapse`,
		"data-testid": B,
		className: z,
		collapsedContent: W && e.length > 0 ? /* @__PURE__ */ Q(Gt, {
			items: e,
			activeId: oe,
			onSelect: (e) => r({
				kind: "shelf",
				id: e
			}),
			compact: !0,
			iconOnly: !0,
			"data-testid": `${B}-collapsed-shelf`
		}) : void 0,
		children: [
			!W && e.length > 0 && /* @__PURE__ */ Q(Gt, {
				items: e,
				activeId: oe,
				onSelect: (e) => r({
					kind: "shelf",
					id: e
				}),
				compact: !0,
				layout: N,
				className: N === "bar" ? "shrink-0 border-b border-border px-[9px] py-1" : "shrink-0 px-3.5 pb-2",
				"data-testid": `${B}-shelf`
			}),
			!W && y && /* @__PURE__ */ Q("div", {
				className: o("shrink-0", "px-2"),
				children: y
			}),
			!W && F && V && /* @__PURE__ */ Q("div", {
				className: o("shrink-0 py-2", "px-2"),
				"data-testid": `${B}-arranging`,
				children: /* @__PURE__ */ Q("ul", {
					"aria-label": "Arrange sections",
					className: "m-0 flex list-none flex-col gap-0.5 p-0",
					children: de.map((e, t) => /* @__PURE__ */ $("li", {
						className: "flex items-center gap-1 px-2 py-1",
						"data-testid": `${B}-arrange-${e}`,
						children: [
							/* @__PURE__ */ Q("span", {
								className: o("min-w-0 flex-1 truncate", "text-[11px] font-semibold uppercase leading-4 tracking-wide", "text-text-secondary"),
								children: fe.get(e)?.label ?? e
							}),
							/* @__PURE__ */ Q(p, {
								size: "sm",
								variant: "ghost",
								"aria-label": `Move ${fe.get(e)?.label ?? e} up`,
								disabled: t === 0,
								icon: /* @__PURE__ */ Q(C, {
									dir: "up",
									size: 14
								}),
								onClick: () => pe(e, -1),
								"data-testid": `${B}-arrange-${e}-up`
							}),
							/* @__PURE__ */ Q(p, {
								size: "sm",
								variant: "ghost",
								"aria-label": `Move ${fe.get(e)?.label ?? e} down`,
								disabled: t === de.length - 1,
								icon: /* @__PURE__ */ Q(C, {
									dir: "down",
									size: 14
								}),
								onClick: () => pe(e, 1),
								"data-testid": `${B}-arrange-${e}-down`
							})
						]
					}, e))
				})
			}),
			!W && F && !V && de.map(ge),
			!W && F && !V && t.length === 0 && /* @__PURE__ */ Q($e, {
				items: [],
				...se,
				emptyLabel: m,
				className: o("px-2", "pb-2"),
				"data-testid": `${B}-list`
			}),
			!W && !F && /* @__PURE__ */ Q($e, {
				items: t,
				grouped: a,
				sectionOrder: s,
				sectionActions: c,
				collapsedSections: l,
				onToggleSection: u,
				onStartCall: d,
				maxVisible: f,
				activeChannel: n?.kind === "conversation" ? n.channel : null,
				onSelect: (e) => r({
					kind: "conversation",
					channel: e
				}),
				onNewChat: i,
				emptyLabel: m,
				onTogglePin: x,
				onToggleMute: w,
				onMarkUnread: T,
				onRename: E,
				canRename: D,
				onSetSection: O,
				className: "px-2 pb-2",
				"data-testid": `${B}-list`
			})
		]
	});
}
//#endregion
//#region src/components/social/railSections.ts
function Qt(e, t) {
	let n = (t ?? "").trim().toLowerCase();
	return !n || e.toLowerCase().includes(n);
}
function $t(e) {
	let t = e.items.filter((t) => Qt(e.name(t), e.query)).map((t) => ({
		kind: "channel",
		peers: [],
		...e.row?.(t) ?? {},
		channel: e.key(t),
		name: e.name(t)
	})), n = e.state ?? {}, r = n.noun ?? "items", i = n.error ? `Couldn’t load your ${r} — ${n.error}.` : n.loading ? "Loading…" : (e.query ?? "").trim() ? "No match" : n.emptyLabel ?? `You are not on any ${r} yet.`;
	return {
		id: e.id,
		label: e.label,
		count: n.note ? 0 : e.items.length,
		rows: t,
		activeRow: e.active ?? null,
		onSelectRow: e.onSelect,
		emptyLabel: i,
		...n.note ? { note: n.note } : {},
		maxVisible: e.maxVisible ?? 8,
		...e["data-testid"] ? { "data-testid": e["data-testid"] } : {}
	};
}
function en(e, t) {
	if (typeof window > "u") return null;
	try {
		let n = JSON.parse(window.localStorage.getItem(e) ?? "null");
		return t(n) ? n : null;
	} catch {
		return null;
	}
}
function tn(e, t) {
	try {
		t == null ? window.localStorage.removeItem(e) : window.localStorage.setItem(e, JSON.stringify(t));
	} catch {}
}
var nn = (e) => !!e && typeof e == "object" && !Array.isArray(e), rn = (e) => Array.isArray(e) && e.every((e) => typeof e == "string");
function an(e, t = {}) {
	let n = `${e}.folded`, r = `${e}.layout`, [i, a] = X(() => en(n, nn) ?? {}), [o, s] = X(() => en(r, rn)), c = K((e, t) => a((r) => {
		let i = {
			...r,
			[e]: t
		};
		return tn(n, i), i;
	}), [n]), l = K((e) => {
		s(e), tn(r, e);
	}, [r]), u = (t.opened ?? []).join("|"), d = t.defaultFolded, f = J(() => {
		let e = new Set(u ? u.split("|") : []), t = {};
		for (let [n, r] of Object.entries(d ?? {})) r && !e.has(n) && (t[n] = !0);
		return {
			...t,
			...i
		};
	}, [
		d,
		u,
		i
	]);
	return {
		collapsedSections: f,
		isFolded: K((e) => !!f[e], [f]),
		setFolded: c,
		sectionLayout: o,
		setSectionLayout: l,
		railProps: {
			collapsedSections: f,
			onToggleSection: c,
			sectionLayout: o,
			onSectionLayoutChange: l
		}
	};
}
//#endregion
//#region src/components/social/ChatLabShell.tsx
var on = Le(() => import("./ChatLabTerminal-D_nLOzc8.js")), sn = {
	planning: {
		label: "Planning",
		dot: "bg-code-mauve",
		text: "text-code-mauve",
		busy: !0
	},
	starting: {
		label: "Starting",
		dot: "bg-code-blue",
		text: "text-code-blue",
		busy: !0
	},
	running: {
		label: "Running",
		dot: "bg-code-green",
		text: "text-code-green",
		busy: !0
	},
	waiting: {
		label: "Waiting",
		dot: "bg-code-yellow",
		text: "text-code-yellow",
		busy: !1
	},
	done: {
		label: "Done",
		dot: "bg-code-green",
		text: "text-code-green",
		busy: !1
	},
	failed: {
		label: "Failed",
		dot: "bg-code-red",
		text: "text-code-red",
		busy: !1
	},
	stopped: {
		label: "Stopped",
		dot: "bg-code-raised",
		text: "text-code-muted",
		busy: !1
	},
	budget: {
		label: "Budget spent",
		dot: "bg-code-peach",
		text: "text-code-peach",
		busy: !1
	}
}, cn = {
	pending: "bg-code-raised",
	running: "bg-code-green animate-pulse motion-reduce:animate-none",
	done: "bg-code-blue",
	failed: "bg-code-red",
	skipped: "bg-code-raised"
}, ln = {
	pending: "text-code-muted",
	running: "text-code-text",
	done: "text-code-subtle",
	failed: "text-code-red",
	skipped: "text-code-muted line-through"
}, un = {
	command: "text-code-mauve",
	text: "text-code-text",
	tool: "text-code-blue",
	result: "text-code-green",
	error: "text-code-red",
	status: "text-code-subtle",
	iteration: "text-code-yellow"
};
function dn(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n += 1) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
	return t >>> 0;
}
function fn(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleTimeString([], { hour12: !1 });
}
function pn({ title: e, status: t, model: n, contextBudgetTokens: r, contextTokens: i, iterations: a, planSource: s, steps: c, events: u, onInstruct: d, onStop: p, onBackToChat: m, onOpenRun: h, onOpenGraph: g, shell: _, notice: v, headerAccessory: y, variant: b = "column", className: x, "data-testid": S = "chat-lab-shell" }) {
	let C = b === "pane", [w, T] = X("stream"), [E, D] = X(""), [O, A] = X([]), j = sn[t] ?? sn.running, M = r > 0 ? Math.min(1, Math.max(0, i / r)) : 0, N = j.busy, P = K((e) => {
		A((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}, []), F = K(() => {
		let e = E.trim();
		!e || N || !d || (D(""), d(e));
	}, [
		E,
		N,
		d
	]), I = K((e) => {
		e.key === "Escape" && (e.stopPropagation(), m());
	}, [m]), L = J(() => u.map((e) => {
		let t = O.includes(e.id), n = /* @__PURE__ */ $("span", {
			className: "flex flex-wrap items-baseline gap-1.5",
			children: [
				/* @__PURE__ */ Q("span", {
					className: o("whitespace-pre-wrap break-words", un[e.kind]),
					children: e.text
				}),
				e.mock && /* @__PURE__ */ Q(f, {
					size: "xs",
					mono: !0,
					uppercase: !0,
					palette: "code",
					tone: "caution",
					title: "Produced by a mock runtime, not a real box",
					"data-testid": `${S}-mock`,
					children: "mock"
				}),
				e.detail && /* @__PURE__ */ Q("button", {
					type: "button",
					onClick: () => P(e.id),
					"aria-expanded": t,
					"data-testid": `${S}-detail-toggle`,
					className: "cursor-pointer border-none bg-transparent p-0 text-[10px] uppercase tracking-wide text-code-muted hover:text-code-text",
					children: t ? "− hide" : "+ detail"
				}),
				e.detail && t && /* @__PURE__ */ Q("span", {
					"data-testid": `${S}-detail`,
					className: "mt-1 block w-full whitespace-pre-wrap break-words rounded border border-code-border bg-code-bg px-2 py-1 text-[11px] text-code-subtle",
					children: e.detail
				})
			]
		});
		return {
			id: e.id,
			timestamp: fn(e.at),
			source: e.kind,
			...e.kind === "error" ? { level: "error" } : {},
			message: n
		};
	}), [
		u,
		O,
		P,
		S
	]), R = J(() => [{
		id: "stream",
		label: "Stream"
	}, ..._ ? [{
		id: "terminal",
		label: "Terminal"
	}] : []], [_]), z = w === "terminal" && !_ ? "stream" : w, B = /* @__PURE__ */ $(Z, { children: [
		/* @__PURE__ */ Q("span", {
			"aria-hidden": "true",
			"data-testid": `${S}-status-dot`,
			className: o("inline-block h-2 w-2 shrink-0 rounded-full", j.dot, N && "animate-pulse motion-reduce:animate-none")
		}),
		/* @__PURE__ */ Q("span", {
			className: o("shrink-0 font-semibold", j.text),
			"data-testid": `${S}-status-label`,
			children: j.label
		}),
		/* @__PURE__ */ Q("span", {
			"aria-hidden": "true",
			className: "text-code-raised",
			children: "│"
		}),
		/* @__PURE__ */ Q(f, {
			size: "xs",
			mono: !0,
			palette: "code",
			tone: "accent",
			title: n,
			"data-testid": `${S}-model`,
			children: Pe(n)
		})
	] }), ee = /* @__PURE__ */ $(Z, { children: [
		/* @__PURE__ */ $("span", {
			className: "shrink-0 tabular-nums text-code-subtle",
			title: "Context spent against this loop's budget",
			"data-testid": `${S}-budget`,
			children: [
				je(i),
				" / ",
				je(r)
			]
		}),
		/* @__PURE__ */ Q(ie, {
			value: M,
			segments: 8,
			showPercent: !1,
			tone: "code",
			label: "context",
			className: "shrink-0",
			"data-testid": `${S}-budget-meter`
		}),
		/* @__PURE__ */ Q("span", {
			"aria-hidden": "true",
			className: "text-code-raised",
			children: "│"
		}),
		/* @__PURE__ */ $("span", {
			className: "shrink-0 tabular-nums text-code-muted",
			"data-testid": `${S}-iterations`,
			children: [
				a,
				" ",
				a === 1 ? "turn" : "turns"
			]
		})
	] }), te = /* @__PURE__ */ Q("span", {
		className: "min-w-0 flex-1 truncate text-code-comment",
		title: e,
		"data-testid": `${S}-title`,
		children: e
	}), ne = /* @__PURE__ */ $(Z, { children: [
		y != null && y !== !1 && /* @__PURE__ */ Q("span", {
			className: "flex shrink-0 items-center",
			"data-testid": `${S}-header-accessory`,
			children: y
		}),
		g && /* @__PURE__ */ Q(l, {
			tone: "code",
			variant: "ghost",
			size: "sm",
			onClick: g,
			"data-testid": `${S}-open-graph`,
			children: "Graph"
		}),
		h && /* @__PURE__ */ Q(l, {
			tone: "code",
			variant: "ghost",
			size: "sm",
			onClick: h,
			"data-testid": `${S}-open-run`,
			children: "Run"
		}),
		p && /* @__PURE__ */ Q(l, {
			tone: "code",
			variant: "danger",
			size: "sm",
			onClick: p,
			disabled: !N && t !== "waiting",
			"data-testid": `${S}-stop`,
			children: "Stop"
		}),
		/* @__PURE__ */ Q(l, {
			tone: "code",
			variant: "secondary",
			size: "sm",
			onClick: m,
			"data-testid": `${S}-back`,
			children: C ? "Close" : "Back to chat"
		})
	] });
	return /* @__PURE__ */ $("div", {
		"data-testid": S,
		"data-status": t,
		"data-variant": b,
		onKeyDown: I,
		className: o("flex h-full min-h-0 flex-col bg-code-bg font-mono text-code-text", x),
		children: [
			/* @__PURE__ */ Q("div", {
				"data-testid": `${S}-status`,
				"data-layout": C ? "stacked" : "row",
				className: o("flex shrink-0 border-b border-code-border bg-code-panel px-3 py-2 text-[11px] leading-none", C ? "flex-col gap-1.5" : "flex-wrap items-center gap-x-2 gap-y-1"),
				children: C ? /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ $("div", {
					className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1",
					"data-testid": `${S}-status-where`,
					children: [
						B,
						/* @__PURE__ */ Q("span", {
							className: "min-w-0 flex-1",
							"aria-hidden": "true"
						}),
						ne
					]
				}), /* @__PURE__ */ $("div", {
					className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1",
					"data-testid": `${S}-status-spend`,
					children: [ee, te]
				})] }) : /* @__PURE__ */ $(Z, { children: [
					B,
					/* @__PURE__ */ Q("span", {
						"aria-hidden": "true",
						className: "text-code-raised",
						children: "│"
					}),
					ee,
					te,
					ne
				] })
			}),
			(v || s === "fallback") && /* @__PURE__ */ Q("div", {
				role: "status",
				"data-testid": `${S}-notice`,
				className: "shrink-0 border-b border-code-border bg-code-surface px-3 py-1.5 text-[11px] text-code-peach",
				children: v ?? "Planner unavailable · single step"
			}),
			c.length > 0 && /* @__PURE__ */ Q("ol", {
				"data-testid": `${S}-steps`,
				"aria-label": "Loop steps",
				className: o("flex shrink-0 list-none items-center gap-1.5 border-b border-code-border bg-code-panel px-3 py-1.5", C ? "flex-wrap" : "overflow-x-auto"),
				children: c.map((e) => /* @__PURE__ */ $("li", {
					"data-testid": `${S}-step`,
					"data-state": e.status,
					title: `${e.kind} · ${e.status}${e.iterations ? ` · ${e.iterations} turns` : ""}`,
					className: "flex shrink-0 items-center gap-1.5 rounded-full border border-code-border bg-code-surface px-2 py-0.5 text-[11px] leading-none",
					children: [/* @__PURE__ */ Q("span", {
						"aria-hidden": "true",
						className: o("inline-block h-1.5 w-1.5 shrink-0 rounded-full", cn[e.status])
					}), /* @__PURE__ */ Q("span", {
						className: o(C ? "max-w-[12rem]" : "max-w-[16rem]", "truncate", ln[e.status]),
						children: e.title
					})]
				}, e.id))
			}),
			/* @__PURE__ */ Q("div", {
				className: "shrink-0 border-b border-code-border bg-code-panel px-3",
				children: /* @__PURE__ */ Q(k, {
					items: R,
					value: z,
					onValueChange: (e) => T(e === "terminal" ? "terminal" : "stream"),
					variant: "underline",
					size: "sm",
					"aria-label": "Lab view",
					className: "border-b-0"
				})
			}),
			/* @__PURE__ */ $(pe, {
				active: N,
				particleCount: 220,
				speed: .14,
				alphaParticles: !0,
				moveParticlesOnHover: !0,
				particleHoverFactor: .6,
				particleColors: fe,
				fallbackIntensity: "medium",
				seed: dn(_?.sessionId ?? e),
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${S}-particles`,
				children: [/* @__PURE__ */ Q("div", {
					className: "flex min-h-0 flex-1 flex-col",
					children: z === "stream" ? /* @__PURE__ */ Q(le, {
						lines: L,
						title: null,
						showLevel: !1,
						emptyMessage: "No output yet.",
						tone: N ? "transparent" : "code",
						className: "min-h-0 flex-1 rounded-none border-none",
						"data-testid": `${S}-stream`
					}) : _?.shellUrl ? /* @__PURE__ */ Q(Fe, {
						fallback: /* @__PURE__ */ Q("div", {
							className: "flex flex-1 items-center justify-center text-[11px] text-code-muted",
							children: "Loading terminal…"
						}),
						children: /* @__PURE__ */ Q(on, {
							sessionId: _.sessionId,
							shellUrl: _.shellUrl,
							"data-testid": `${S}-terminal`
						})
					}) : /* @__PURE__ */ $("div", {
						className: "flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center",
						children: [/* @__PURE__ */ Q("p", {
							className: "text-[11px] text-code-muted",
							children: "The loop is working in a cloud computer. Open a shell to look around its workspace."
						}), /* @__PURE__ */ Q(l, {
							tone: "code",
							variant: "primary",
							size: "sm",
							onClick: _?.onRequestShell,
							disabled: !_?.onRequestShell,
							"data-testid": `${S}-connect-terminal`,
							children: "Connect terminal"
						})]
					})
				}), /* @__PURE__ */ $("div", {
					"data-testid": `${S}-prompt-row`,
					className: o("flex shrink-0 items-center gap-2 border-t border-code-border px-3 py-2", N ? "bg-transparent" : "bg-code-panel"),
					children: [
						/* @__PURE__ */ Q("span", {
							"aria-hidden": "true",
							className: "shrink-0 text-code-green",
							children: "›"
						}),
						/* @__PURE__ */ Q("input", {
							type: "text",
							value: E,
							onChange: (e) => D(e.target.value),
							onKeyDown: (e) => {
								e.key !== "Enter" || e.shiftKey || (e.preventDefault(), F());
							},
							disabled: N || !d,
							placeholder: N ? "Working — the prompt opens between turns" : "Continue with…",
							"aria-label": "Instruct the agent",
							"data-testid": `${S}-prompt`,
							className: "min-w-0 flex-1 border-none bg-transparent text-[12px] text-code-text outline-none placeholder:text-code-muted disabled:cursor-not-allowed disabled:text-code-muted"
						}),
						/* @__PURE__ */ Q(l, {
							tone: "code",
							variant: "primary",
							size: "sm",
							onClick: F,
							disabled: N || !d || E.trim().length === 0,
							"data-testid": `${S}-send`,
							children: "Send"
						})
					]
				})]
			})
		]
	});
}
function mn({ status: e, contextTokens: t, contextBudgetTokens: n, onOpen: r, className: i, "data-testid": a = "chat-lab-pill" }) {
	let s = sn[e] ?? sn.running;
	return /* @__PURE__ */ $("button", {
		type: "button",
		onClick: r,
		"data-testid": a,
		"data-status": e,
		className: o("inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-surface-inset px-2.5 py-1", "font-mono text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary", i),
		children: [
			/* @__PURE__ */ Q("span", {
				"aria-hidden": "true",
				className: o("inline-block h-1.5 w-1.5 shrink-0 rounded-full", s.dot, s.busy && "animate-pulse motion-reduce:animate-none")
			}),
			/* @__PURE__ */ $("span", {
				className: "truncate",
				children: [
					"Agent loop · ",
					s.label.toLowerCase(),
					" · ",
					je(t),
					"/",
					je(n)
				]
			}),
			/* @__PURE__ */ Q("span", {
				className: "shrink-0 font-semibold text-text-primary",
				children: "Open"
			})
		]
	});
}
//#endregion
//#region src/components/social/ChatColumnBackdrop.tsx
var hn = 300;
function gn({ mode: e = "chat", working: t = !1, tone: n = "auto", className: r, children: i, "data-testid": a = "chat-column-backdrop" }) {
	let s = Y(null), c = ue(s, n, e !== "chat"), l = e !== "chat" && c !== "none", [u, d] = X(l);
	q(() => {
		if (l) {
			d(!0);
			return;
		}
		let e = setTimeout(() => d(!1), hn);
		return () => clearTimeout(e);
	}, [l]);
	let f = J(() => ({
		painting: l,
		working: t
	}), [l, t]);
	return /* @__PURE__ */ Q("div", {
		ref: s,
		"data-testid": a,
		"data-mode": e,
		"data-console": l ? "true" : "false",
		"data-working": t ? "true" : "false",
		...u ? {
			"data-theme": "dark",
			"data-backdrop-tone": c === "graphite" ? "graphite" : "night"
		} : {},
		className: o("relative flex min-h-0 min-w-0 flex-1 flex-col transition-colors duration-300 motion-reduce:transition-none", u && "uic-chat-console", r),
		children: /* @__PURE__ */ Q(pe, {
			active: l,
			tone: c === "graphite" ? "graphite" : "night",
			particleCount: t ? 260 : 170,
			density: t ? 14 : 10,
			speed: t ? .16 : .07,
			moveParticlesOnHover: t,
			particleHoverFactor: .6,
			alphaParticles: !0,
			particleColors: c === "graphite" ? de : fe,
			particleBaseSize: t ? 110 : 90,
			fallbackIntensity: t ? "medium" : "low",
			className: "flex min-h-0 min-w-0 flex-1 flex-col",
			"data-testid": `${a}-particles`,
			children: /* @__PURE__ */ Q(me.Provider, {
				value: f,
				children: i
			})
		})
	});
}
//#endregion
//#region src/components/social/RunSummaryPanel.tsx
function _n(e, t) {
	return `${e}:${t}`;
}
function vn(e) {
	let t = e.indexOf(":");
	return t <= 0 || t === e.length - 1 ? null : {
		pipelineId: e.slice(0, t),
		runId: e.slice(t + 1)
	};
}
function yn(e) {
	return e === "received" || e === "running" || e === "awaiting_approval";
}
var bn = {
	received: "Received",
	running: "Running",
	awaiting_approval: "Needs approval",
	completed: "Completed",
	rejected: "Rejected",
	failed: "Failed"
}, xn = {
	received: "neutral",
	running: "info",
	awaiting_approval: "warning",
	completed: "success",
	rejected: "danger",
	failed: "danger"
}, Sn = 8;
function Cn(e) {
	return e.kind === "link" ? e.label ?? "Open link" : e.kind === "panel" ? e.panel.title ? `Open ${e.panel.title}` : "Open result" : "Open beside the chat";
}
function wn({ data: e, onOpenFull: t, onOpenChat: n, onOpenDocument: r, onOpenResult: i, className: a, "data-testid": s = "run-summary-panel" }) {
	let { status: c } = e, u = e.pipelineName || e.pipelineId, d = xe({
		startedAt: e.startedAt,
		completedAt: e.completedAt
	}), p = e.ops ?? [], m = e.result && i && !(e.result.kind === "document" && e.document && r), h = e.document?.title || "Document", g = c === "failed" ? e.error || "The run failed" : void 0;
	return /* @__PURE__ */ $("div", {
		className: o("flex h-full min-h-0 flex-col text-[12px]", a),
		"data-testid": s,
		"data-status": c,
		"data-run-id": e.runId,
		"data-pipeline-id": e.pipelineId,
		children: [/* @__PURE__ */ $("div", {
			className: "flex min-h-0 flex-1 flex-col gap-3 overflow-auto p-3",
			children: [
				/* @__PURE__ */ $("header", {
					className: "flex flex-col gap-1",
					"data-testid": `${s}-header`,
					children: [
						/* @__PURE__ */ $("div", {
							className: "flex min-w-0 items-center gap-2",
							children: [/* @__PURE__ */ Q("span", {
								className: "min-w-0 flex-1 truncate text-[13px] font-semibold text-text-primary",
								"data-testid": `${s}-name`,
								children: u
							}), /* @__PURE__ */ Q(f, {
								size: "xs",
								tone: xn[c],
								dot: c === "running" ? "pulse" : void 0,
								"data-testid": `${s}-status`,
								children: bn[c]
							})]
						}),
						d && /* @__PURE__ */ Q("span", {
							className: "text-[11px] text-text-tertiary",
							"data-testid": `${s}-timings`,
							children: d
						}),
						(e.command || e.instruction) && /* @__PURE__ */ $("p", {
							className: "m-0 min-w-0 text-text-primary",
							"data-testid": `${s}-instruction`,
							children: [
								e.command && /* @__PURE__ */ Q("span", {
									className: "font-mono text-text-tertiary",
									children: e.command
								}),
								e.command && e.instruction ? " " : "",
								e.instruction
							]
						})
					]
				}),
				e.steps.length > 0 && /* @__PURE__ */ $("section", {
					"aria-label": "Steps",
					"data-testid": `${s}-steps`,
					children: [/* @__PURE__ */ Q("h3", {
						className: "m-0 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: "Steps"
					}), /* @__PURE__ */ Q("ol", {
						className: "m-0 mt-1 flex list-none flex-col p-0",
						children: e.steps.map((t, n) => /* @__PURE__ */ $("li", {
							className: "relative flex items-start gap-2 pb-2 last:pb-0",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [
								n < e.steps.length - 1 && /* @__PURE__ */ Q("span", {
									"aria-hidden": "true",
									className: "absolute left-[3px] top-3 h-[calc(100%-6px)] w-px bg-border"
								}),
								/* @__PURE__ */ Q("span", {
									"aria-hidden": "true",
									className: o("relative mt-[5px] inline-block h-[7px] w-[7px] shrink-0 rounded-full", Ce[t.status] ?? Ce.pending)
								}),
								/* @__PURE__ */ $("span", {
									className: "flex min-w-0 flex-1 items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ Q("span", {
										className: o("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "font-medium text-text-primary" : "text-text-secondary"),
										children: t.label
									}), /* @__PURE__ */ Q("span", {
										className: "shrink-0 text-[10px] text-text-tertiary",
										children: t.status === "awaiting" ? "needs approval" : t.status
									})]
								})
							]
						}, t.id))
					})]
				}),
				p.length > 0 && /* @__PURE__ */ $("section", {
					"data-testid": `${s}-ops`,
					children: [
						/* @__PURE__ */ Q("h3", {
							className: "m-0 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
							children: "What changed"
						}),
						/* @__PURE__ */ Q("ul", {
							className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
							children: p.slice(0, Sn).map((e, t) => /* @__PURE__ */ Q("li", {
								className: "truncate",
								"data-op": e.op,
								title: e.text,
								children: Se(e)
							}, t))
						}),
						p.length > Sn && /* @__PURE__ */ $("div", {
							className: "text-[11px] text-text-tertiary",
							"data-testid": `${s}-more-ops`,
							children: [
								"+",
								p.length - Sn,
								" more"
							]
						})
					]
				}),
				e.document && /* @__PURE__ */ $("div", {
					className: "flex items-start gap-2 rounded-md border border-border bg-surface-inset px-2 py-1.5",
					"data-testid": `${s}-document`,
					children: [
						/* @__PURE__ */ Q(_, {
							size: 14,
							className: "mt-0.5 shrink-0 text-text-tertiary",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ $("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ Q("span", {
								className: "block truncate font-medium text-text-primary",
								children: h
							}), e.document.snippet && /* @__PURE__ */ Q("span", {
								className: "line-clamp-2 block text-[11px] text-text-secondary",
								children: e.document.snippet
							})]
						}),
						r && /* @__PURE__ */ Q(l, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0.5 text-[11px] leading-5",
							onClick: () => r(e.document.id),
							"data-testid": `${s}-open-document`,
							children: "Open beside the chat"
						})
					]
				}),
				m && e.result && /* @__PURE__ */ $("div", {
					className: "flex items-center gap-2",
					"data-testid": `${s}-result`,
					"data-result-kind": e.result.kind,
					children: [/* @__PURE__ */ Q("span", {
						className: "min-w-0 flex-1 text-text-secondary",
						children: "Result"
					}), /* @__PURE__ */ Q(l, {
						size: "sm",
						variant: "secondary",
						className: "!px-2 !py-0.5 text-[11px] leading-5",
						onClick: () => i(e.result),
						"data-testid": `${s}-open-result`,
						children: Cn(e.result)
					})]
				}),
				g && /* @__PURE__ */ Q(ce, {
					tone: "error",
					className: "text-[11px]",
					children: /* @__PURE__ */ Q("span", {
						"data-testid": `${s}-error`,
						children: g
					})
				})
			]
		}), /* @__PURE__ */ $("footer", {
			className: "flex shrink-0 items-center gap-2 border-t border-border px-3 py-2",
			"data-testid": `${s}-footer`,
			children: [/* @__PURE__ */ Q(l, {
				size: "sm",
				variant: "primary",
				onClick: t,
				"data-testid": `${s}-open-full`,
				children: "Open full run"
			}), n && e.channel && /* @__PURE__ */ Q(l, {
				size: "sm",
				variant: "secondary",
				onClick: n,
				"data-testid": `${s}-open-chat`,
				children: "Open chat"
			})]
		})]
	});
}
function Tn({ panel: e, api: t, options: n }) {
	let { load: r, onOpenFull: i, onOpenChat: a, onOpenDocument: o, onOpenResult: s, refreshMs: c = 2e3, "data-testid": u = "run-panel" } = n, [d, f] = X({ status: "loading" }), [p, m] = X(0), h = Y(r);
	q(() => {
		h.current = r;
	}, [r]), q(() => {
		let n = !1;
		return f({ status: "loading" }), h.current(e).then((e) => {
			n || (f({
				status: "ready",
				data: e
			}), e.pipelineName && t.setTitle(e.pipelineName));
		}, (e) => {
			n || f({
				status: "error",
				message: e instanceof Error ? e.message : String(e)
			});
		}), () => {
			n = !0;
		};
	}, [
		e.kind,
		e.id,
		p
	]);
	let g = d.status === "ready" && yn(d.data.status);
	q(() => {
		if (!g || c <= 0) return;
		let n = !1, r = window.setInterval(() => {
			h.current(e).then((e) => {
				n || (f({
					status: "ready",
					data: e
				}), e.pipelineName && t.setTitle(e.pipelineName));
			}, () => {});
		}, c);
		return () => {
			n = !0, window.clearInterval(r);
		};
	}, [
		g,
		c,
		e.kind,
		e.id
	]);
	let _ = K(() => m((e) => e + 1), []);
	if (d.status === "loading") return /* @__PURE__ */ $("div", {
		className: "flex flex-col gap-3 p-3",
		"data-testid": `${u}-loading`,
		"aria-busy": "true",
		children: [
			/* @__PURE__ */ Q(te, {
				height: 20,
				width: "60%",
				rounded: "md"
			}),
			/* @__PURE__ */ Q(te, {
				height: 14,
				width: "40%",
				rounded: "md"
			}),
			/* @__PURE__ */ Q(te, { height: 96 }),
			/* @__PURE__ */ Q(te, { height: 44 })
		]
	});
	if (d.status === "error") return /* @__PURE__ */ $("div", {
		className: "flex flex-col gap-2 p-3",
		"data-testid": `${u}-error`,
		children: [/* @__PURE__ */ $(ce, {
			tone: "error",
			children: ["Could not load this run: ", d.message]
		}), /* @__PURE__ */ Q(l, {
			size: "sm",
			variant: "secondary",
			onClick: _,
			className: "self-start",
			"data-testid": `${u}-retry`,
			children: "Try again"
		})]
	});
	let { data: v } = d;
	return /* @__PURE__ */ Q(wn, {
		data: v,
		onOpenFull: () => i(e, v),
		onOpenChat: a ? () => a(e, v) : void 0,
		onOpenDocument: o,
		onOpenResult: s,
		"data-testid": u
	});
}
function En(e) {
	return (t, n) => /* @__PURE__ */ Q(Tn, {
		panel: t,
		api: n,
		options: e
	});
}
//#endregion
//#region src/components/social/chatCommands.ts
var Dn = /^chat:dmg?:/;
function On(e) {
	return e.channelKind ?? (Dn.test(e.channel) ? "dm" : "room");
}
function kn(e, t) {
	let n = e.scope ?? "always";
	if (typeof n == "function") return n(t);
	switch (n) {
		case "always": return !0;
		case "document-open": return t.sidePanel.current?.kind === "document";
		case "room": return On(t) === "room";
		case "dm": return On(t) === "dm";
		default: return !0;
	}
}
function An(e) {
	if (e.disabledHint) return e.disabledHint;
	switch (e.scope) {
		case "document-open": return "Open a document beside the chat first";
		case "room": return "Only in rooms";
		case "dm": return "Only in direct messages";
		default: return e.hint ?? "Not available here";
	}
}
function jn(e, t) {
	return e.map((e) => {
		let { run: n, scope: r, disabledHint: i, ...a } = e;
		return kn({ scope: r }, t) ? a : {
			...a,
			disabled: !0,
			hint: An({
				scope: r,
				disabledHint: i,
				hint: a.hint
			})
		};
	});
}
function Mn(e, t) {
	let n = Me(e, t);
	return n ? {
		command: n,
		argumentText: Ne(e, n).trim()
	} : null;
}
var Nn = "doc", Pn = "panel", Fn = "panel.";
function In(e) {
	return e instanceof URLSearchParams ? new URLSearchParams(e) : new URLSearchParams(e ?? "");
}
function Ln(e) {
	e.delete(Nn), e.delete(Pn);
	for (let t of [...e.keys()]) t.startsWith(Fn) && e.delete(t);
}
function Rn(e, t) {
	let n = In(t);
	if (Ln(n), !e) return n;
	if (e.kind === "document") n.set(Nn, e.id);
	else {
		if (e.kind.includes(":")) throw Error(`A side panel kind cannot contain ':' (got "${e.kind}")`);
		n.set(Pn, `${e.kind}:${e.id}`);
	}
	for (let [t, r] of Object.entries(e.params ?? {})) n.set(`${Fn}${t}`, r);
	return n;
}
function zn(e) {
	let t = In(e), n = {};
	for (let [e, r] of t.entries()) e.startsWith(Fn) && (n[e.slice(6)] = r);
	let r = (e) => Object.keys(n).length ? {
		...e,
		params: n
	} : e, i = t.get(Nn);
	if (i) return r({
		kind: "document",
		id: i
	});
	let a = t.get(Pn);
	if (!a) return null;
	let o = a.indexOf(":");
	return o <= 0 || o === a.length - 1 ? null : r({
		kind: a.slice(0, o),
		id: a.slice(o + 1)
	});
}
//#endregion
//#region src/components/social/ChatCommandProvider.tsx
var Bn = Ie(null);
function Vn(...e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) for (let e of n ?? []) t.set(e.trigger.toLowerCase(), e);
	return [...t.values()];
}
function Hn({ commands: e, children: t }) {
	let n = Re(Bn), [r, i] = X([]), a = K((e) => (i((t) => [...t, e]), () => i((t) => t.filter((t) => t !== e))), []), o = J(() => ({
		commands: Vn(n?.commands, e, ...r),
		register: a
	}), [
		n?.commands,
		e,
		r,
		a
	]);
	return /* @__PURE__ */ Q(Bn.Provider, {
		value: o,
		children: t
	});
}
function Un() {
	return Re(Bn)?.commands ?? Wn;
}
var Wn = [];
function Gn(e) {
	let t = Re(Bn);
	if (!t) throw Error("useRegisterChatCommands needs a <ChatCommandProvider> above it");
	let { register: n } = t;
	q(() => {
		if (!(!e || e.length === 0)) return n(e);
	}, [n, e]);
}
function Kn() {
	let e = Un();
	return K(async (t, n) => {
		let r = Mn(t, e);
		if (!r) return null;
		let { command: i, argumentText: a } = r;
		if (!kn(i, n)) throw Error(`${i.trigger}: ${An(i)}`);
		return i.run({
			...n,
			text: t,
			argumentText: a
		});
	}, [e]);
}
//#endregion
//#region src/components/social/ChatBubbleStack.tsx
function qn({ bubble: e, onOpen: t, onDismiss: n, dismissAfterMs: r }) {
	return q(() => {
		let e = setTimeout(n, r);
		return () => clearTimeout(e);
	}, [e.id, r]), /* @__PURE__ */ $("div", {
		role: "status",
		className: "pointer-events-auto flex w-80 max-w-[calc(100vw-2rem)] items-start gap-2.5 rounded-xl border border-border bg-surface p-3 shadow-lg",
		"data-testid": "chat-bubble",
		"data-bubble-id": e.id,
		children: [/* @__PURE__ */ $("button", {
			type: "button",
			className: "flex min-w-0 flex-1 items-start gap-2.5 border-none bg-transparent p-0 text-left cursor-pointer",
			onClick: t,
			"aria-label": `Open the conversation: ${e.author} said ${e.text}`,
			children: [/* @__PURE__ */ Q(H, {
				name: e.author,
				size: 28,
				...e.avatarUrl ? { src: e.avatarUrl } : {},
				...e.color ? { color: e.color } : {}
			}), /* @__PURE__ */ $("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ $("span", {
					className: "flex items-baseline gap-1.5",
					children: [/* @__PURE__ */ Q("span", {
						className: "truncate text-[12px] font-semibold text-text-primary",
						children: e.author
					}), e.channelLabel && /* @__PURE__ */ Q("span", {
						className: "truncate text-[11px] text-text-tertiary",
						children: e.channelLabel
					})]
				}), /* @__PURE__ */ Q("span", {
					className: "line-clamp-3 text-[13px] leading-snug text-text-primary",
					children: e.text
				})]
			})]
		}), /* @__PURE__ */ Q("button", {
			type: "button",
			className: "shrink-0 border-none bg-transparent p-0.5 text-text-tertiary hover:text-text-primary cursor-pointer",
			"aria-label": "Dismiss",
			onClick: n,
			"data-testid": "chat-bubble-dismiss",
			children: "✕"
		})]
	});
}
function Jn({ bubbles: e, onOpen: t, onDismiss: n, dismissAfterMs: r = 8e3, max: i = 3, className: a, "data-testid": s = "chat-bubble-stack" }) {
	let c = e.slice(-i);
	return c.length === 0 ? null : /* @__PURE__ */ Q("div", {
		className: o("pointer-events-none fixed bottom-4 right-[calc(1rem+var(--uic-context-column-inset,0px))] z-[60] flex flex-col items-end gap-2", a),
		"data-testid": s,
		"aria-live": "polite",
		children: c.map((e) => /* @__PURE__ */ Q(qn, {
			bubble: e,
			dismissAfterMs: r,
			onOpen: () => t(e.id),
			onDismiss: () => n(e.id)
		}, e.id))
	});
}
//#endregion
//#region src/components/social/ConversationStart.tsx
function Yn({ d: e }) {
	return /* @__PURE__ */ Q("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.75",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: /* @__PURE__ */ Q("path", { d: e })
	});
}
var Xn = "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM12 8v6M9 11h6", Zn = "M4 4h16v12H8l-4 4zM9 9h6M9 12h4", Qn = "M22 2 11 13M22 2l-7 20-4-9-9-4z";
function $n({ items: e, onPick: t, disabled: n, searchAbove: r, kind: i, testId: a }) {
	let [o, s] = X(""), c = J(() => {
		let t = o.trim().toLowerCase();
		return t ? e.filter((e) => e.label.toLowerCase().includes(t)) : e;
	}, [e, o]);
	return /* @__PURE__ */ $(A, {
		gap: "none",
		children: [e.length > r && /* @__PURE__ */ Q("div", {
			className: "px-4 pb-1 pt-2",
			children: /* @__PURE__ */ Q(L, {
				value: o,
				onChange: s,
				placeholder: i === "room" ? "Find a room" : "Find a person",
				"data-testid": `${a}-search`
			})
		}), c.length === 0 ? /* @__PURE__ */ $(ye, {
			"data-testid": `${a}-none`,
			children: [
				"Nothing matches “",
				o.trim(),
				"”."
			]
		}) : c.map((e) => /* @__PURE__ */ Q(W, {
			label: e.label,
			icon: e.icon ?? (i === "person" ? /* @__PURE__ */ Q(H, {
				name: e.label,
				size: 20
			}) : void 0),
			onSelect: () => t(e.id),
			disabled: n,
			"data-testid": `${a}-option`
		}, e.id))]
	});
}
function er({ title: e = "No conversation yet", body: t = "Whichever you choose, the conversation shows up here.", onStart: n, startLabel: r = "Start a conversation", startDescription: i = "A new room, named after this page", rooms: a = [], onAddToRoom: o, people: s = [], onShareWith: c, busy: u = !1, receipt: d = null, searchAbove: f = 6, "data-testid": p = "conversation-start" }) {
	return /* @__PURE__ */ $(A, {
		gap: "none",
		className: "min-h-0 flex-1 overflow-y-auto",
		"data-testid": p,
		children: [
			/* @__PURE__ */ $("div", {
				className: "px-4 pb-3 pt-4",
				children: [/* @__PURE__ */ Q("div", {
					className: "text-[13px] font-semibold text-text-primary",
					children: e
				}), /* @__PURE__ */ Q("p", {
					className: "m-0 mt-0.5 text-[12px] leading-snug text-text-secondary",
					children: t
				})]
			}),
			d && /* @__PURE__ */ Q("div", {
				className: "px-4 pb-3",
				children: /* @__PURE__ */ Q(M, {
					variant: d.tone,
					layout: "stacked",
					"data-testid": `${p}-receipt`,
					children: /* @__PURE__ */ $("span", {
						className: "flex flex-wrap items-center gap-x-2 gap-y-1",
						children: [/* @__PURE__ */ Q("span", { children: d.text }), d.actionLabel && d.onAction && /* @__PURE__ */ Q(l, {
							variant: "ghost",
							size: "sm",
							onClick: d.onAction,
							"data-testid": `${p}-receipt-action`,
							children: d.actionLabel
						})]
					})
				})
			}),
			/* @__PURE__ */ $(se, {
				"data-testid": `${p}-choices`,
				children: [
					n && /* @__PURE__ */ Q(oe, {
						icon: /* @__PURE__ */ Q(Yn, { d: Xn }),
						title: r,
						description: i,
						onSelect: n,
						busy: u,
						"data-testid": `${p}-start`
					}),
					o && /* @__PURE__ */ Q(oe, {
						icon: /* @__PURE__ */ Q(Yn, { d: Zn }),
						title: "Add to a room",
						description: a.length === 0 ? "No rooms yet" : `${a.length} room${a.length === 1 ? "" : "s"} your team is in`,
						disabled: a.length === 0,
						disabledReason: "There are no rooms to add it to yet",
						busy: u,
						"data-testid": `${p}-rooms`,
						children: /* @__PURE__ */ Q($n, {
							items: a,
							onPick: o,
							disabled: u,
							searchAbove: f,
							kind: "room",
							testId: `${p}-rooms`
						})
					}),
					c && /* @__PURE__ */ Q(oe, {
						icon: /* @__PURE__ */ Q(Yn, { d: Qn }),
						title: "Send to someone",
						description: s.length === 0 ? "Nobody to send to yet" : "It lands in their chat",
						disabled: s.length === 0,
						disabledReason: "There is nobody to send it to yet",
						busy: u,
						"data-testid": `${p}-people`,
						children: /* @__PURE__ */ Q($n, {
							items: s,
							onPick: c,
							disabled: u,
							searchAbove: f,
							kind: "person",
							testId: `${p}-people`
						})
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/social/AddToChatDialog.tsx
var tr = 7, nr = 1, rr = 3650, ir = [
	{
		label: "None",
		value: "none"
	},
	{
		label: "Recent",
		value: "days"
	},
	{
		label: "All",
		value: "all"
	}
], ar = {
	none: "They see what is said from now on.",
	days: "A recent stretch of the conversation.",
	all: "Everything ever said here."
};
function or({ open: e, conversationName: t, people: n, preselectedIds: r = [], busy: i = !1, anchor: a, placement: s = "bottom-end", onAdd: c, onClose: l, "data-testid": d = "add-to-chat-dialog", historyChoice: f = !0 }) {
	let [p, m] = X(""), [h, g] = X([...r]), [_, v] = X("none"), [y, x] = X(7), [S, C] = X(!1), [w, T] = X(null);
	q(() => {
		e && (m(""), g([...r]), v("none"), x(7), C(!1), T(null));
	}, [e, r.join("\n")]);
	let E = J(() => new Map(n.map((e) => [e.id, e])), [n]), D = J(() => {
		let e = p.trim().toLowerCase();
		return n.filter((t) => !e || t.name.toLowerCase().includes(e) || (t.subtitle ?? "").toLowerCase().includes(e));
	}, [n, p]), O = (e) => g((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), k = Number.isInteger(y) && y >= 1 && y <= 3650, A = i || S, j = h.length > 0 && (!f || _ !== "days" || k) && !A, M = async () => {
		if (j) {
			C(!0), T(null);
			try {
				await c(h, f ? _ === "days" ? {
					mode: _,
					days: y
				} : { mode: _ } : { mode: "all" }), l();
			} catch (e) {
				T(e instanceof Error ? e.message : String(e)), C(!1);
			}
		}
	};
	return /* @__PURE__ */ $(ge, {
		open: e,
		anchor: a,
		placement: s,
		width: "lg",
		title: "Add people",
		subtitle: t,
		submitLabel: h.length > 1 ? `Add ${h.length}` : "Add",
		submitTestId: `${d}-add`,
		submitDisabled: !j,
		busy: A,
		error: w,
		onSubmit: () => void M(),
		onClose: l,
		"data-testid": d,
		children: [
			/* @__PURE__ */ Q(L, {
				value: p,
				onChange: m,
				placeholder: "Enter a name",
				"aria-label": "Find people to add",
				className: "w-full",
				"data-testid": `${d}-search`
			}),
			h.length > 0 && /* @__PURE__ */ Q("div", {
				className: "flex flex-wrap gap-1",
				"data-testid": `${d}-picked`,
				children: h.map((e) => {
					let t = E.get(e);
					return /* @__PURE__ */ $("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-primary-bg py-0.5 pl-0.5 pr-1 text-[11px] text-primary-fg",
						"data-testid": `${d}-picked-${e}`,
						children: [
							/* @__PURE__ */ Q(H, {
								name: t?.name ?? e,
								src: t?.avatarUrl,
								size: 16
							}),
							/* @__PURE__ */ Q("span", {
								className: "max-w-[9rem] truncate",
								children: t?.name ?? e
							}),
							/* @__PURE__ */ Q("button", {
								type: "button",
								"aria-label": `Remove ${t?.name ?? e}`,
								onClick: () => O(e),
								disabled: A,
								className: "inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border-none bg-transparent p-0 text-current hover:bg-black/10",
								"data-testid": `${d}-unpick-${e}`,
								children: /* @__PURE__ */ Q(b, { size: 9 })
							})
						]
					}, e);
				})
			}),
			/* @__PURE__ */ $("ul", {
				role: "listbox",
				"aria-label": "People",
				"aria-multiselectable": "true",
				className: "m-0 max-h-44 list-none overflow-y-auto rounded-md border border-border p-0",
				"data-testid": `${d}-people`,
				children: [D.length === 0 && /* @__PURE__ */ Q("li", {
					className: "px-2.5 py-2 text-[11px] text-text-tertiary",
					"data-testid": `${d}-nobody`,
					children: n.length === 0 ? "Everyone is already here." : "Nobody by that name."
				}), D.map((e) => {
					let t = h.includes(e.id);
					return /* @__PURE__ */ Q("li", {
						role: "option",
						"aria-selected": t,
						children: /* @__PURE__ */ $("button", {
							type: "button",
							onClick: () => O(e.id),
							disabled: A,
							className: o("flex w-full items-center gap-2 border-none bg-transparent px-2.5 py-1.5 text-left font-[inherit] text-[13px] hover:bg-surface-hover", t && "bg-surface-inset"),
							"data-testid": `${d}-person-${e.id}`,
							children: [
								/* @__PURE__ */ Q(H, {
									name: e.name,
									src: e.avatarUrl,
									size: 22
								}),
								/* @__PURE__ */ $("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ Q("span", {
										className: "block truncate leading-tight text-text-primary",
										children: e.name
									}), e.subtitle && /* @__PURE__ */ Q("span", {
										className: "block truncate text-[11px] leading-tight text-text-tertiary",
										children: e.subtitle
									})]
								}),
								/* @__PURE__ */ Q("span", {
									className: o("text-[11px]", t ? "text-primary" : "text-transparent"),
									"aria-hidden": "true",
									children: "✓"
								})
							]
						})
					}, e.id);
				})]
			}),
			f && /* @__PURE__ */ Q(ve, {
				label: "Chat history",
				hint: _ === "days" ? void 0 : ar[_],
				"data-testid": `${d}-history-field`,
				children: /* @__PURE__ */ Q(u, {
					density: "compact",
					children: /* @__PURE__ */ Q(G, {
						fullWidth: !0,
						disabled: A,
						"aria-label": "How much chat history they get",
						options: ir,
						value: _,
						onChange: (e) => v(e),
						"data-testid": `${d}-history`
					})
				})
			}),
			f && _ === "days" && /* @__PURE__ */ $("div", {
				className: "flex items-center gap-2 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ Q("span", { children: "The past" }),
					/* @__PURE__ */ Q("input", {
						type: "number",
						min: 1,
						max: 3650,
						value: Number.isFinite(y) ? y : "",
						disabled: A,
						"aria-label": "Number of days of history",
						onChange: (e) => x(e.target.value === "" ? NaN : Number(e.target.value)),
						className: o("h-7 w-16 rounded-md border bg-surface px-2 text-[12px] text-text-primary", k ? "border-border" : "border-danger-fg"),
						"data-testid": `${d}-days`
					}),
					/* @__PURE__ */ Q("span", { children: "days" }),
					!k && /* @__PURE__ */ $("span", {
						className: "text-danger-fg",
						children: [
							1,
							"–",
							3650
						]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/social/MembersPanel.tsx
function sr(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `Added ${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})}`;
}
function cr({ members: e, open: t = !1, canManage: n = !1, currentUserId: r, onAdd: i, onRemove: a, className: s, "data-testid": c = "members-panel" }) {
	let d = [...e].sort((e, t) => e.role === t.role ? e.name.localeCompare(t.name) : e.role === "owner" ? -1 : 1);
	return /* @__PURE__ */ $("div", {
		className: o("flex min-h-0 flex-col", s),
		"data-testid": c,
		"data-open": String(t),
		children: [/* @__PURE__ */ $("div", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-2",
			children: [/* @__PURE__ */ Q("span", {
				className: "text-xs text-text-tertiary",
				"data-testid": `${c}-count`,
				children: t ? "Open channel" : `${e.length} ${e.length === 1 ? "member" : "members"}`
			}), i && /* @__PURE__ */ Q(l, {
				variant: "secondary",
				size: "sm",
				onClick: (e) => i(e.currentTarget),
				"data-testid": `${c}-add`,
				children: /* @__PURE__ */ $("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ Q(E, { size: 12 }), " Add people"]
				})
			})]
		}), t && e.length === 0 ? /* @__PURE__ */ Q(u, {
			density: "compact",
			children: /* @__PURE__ */ Q(z, {
				title: "Everyone can read this channel.",
				body: "Add people to make it members-only.",
				...i ? {
					actionLabel: "Add people",
					onAction: () => i()
				} : {},
				testId: `${c}-empty`
			})
		}) : /* @__PURE__ */ Q("ul", {
			className: "m-0 min-h-0 flex-1 list-none overflow-y-auto p-0",
			"data-testid": `${c}-list`,
			children: d.map((e) => {
				let t = e.id === r, i = !!a && (n || t);
				return /* @__PURE__ */ $("li", {
					className: "flex items-center gap-2 px-3 py-2",
					"data-testid": `${c}-member-${e.id}`,
					children: [
						/* @__PURE__ */ Q(H, {
							name: e.name,
							src: e.avatarUrl,
							size: 28
						}),
						/* @__PURE__ */ $("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ $("span", {
								className: "block truncate text-sm text-text-primary",
								children: [e.name, t && /* @__PURE__ */ Q("span", {
									className: "text-text-tertiary",
									children: " (you)"
								})]
							}), e.addedAt && /* @__PURE__ */ Q("span", {
								className: "block truncate text-xs text-text-tertiary",
								children: sr(e.addedAt)
							})]
						}),
						e.role === "owner" && /* @__PURE__ */ Q(f, {
							tone: "neutral",
							size: "xs",
							"data-testid": `${c}-owner-${e.id}`,
							children: "Owner"
						}),
						i && /* @__PURE__ */ Q(p, {
							"aria-label": t ? "Leave" : `Remove ${e.name}`,
							title: t ? "Leave" : "Remove",
							variant: "ghost",
							size: "sm",
							onClick: () => a?.(e.id),
							icon: /* @__PURE__ */ Q(b, { size: 12 }),
							"data-testid": `${c}-remove-${e.id}`
						})
					]
				}, e.id);
			})
		})]
	});
}
//#endregion
//#region src/components/social/ActivePeopleGrid.tsx
var lr = 40, ur = {
	online: "online",
	busy: "busy",
	away: "away",
	offline: "offline"
}, dr = "flex w-full min-w-0 flex-col items-center gap-1 rounded-lg p-1 text-center", fr = "cursor-pointer border-0 bg-transparent hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1";
function pr(e) {
	let t = e.trim();
	return t ? t.split(/\s+/)[0] : e;
}
function mr(e) {
	let t = e.status ?? "online", n = [e.displayName, ur[t]];
	return e.activity && n.push(e.activity), e.inCall && n.push("in a call"), n.join(", ");
}
function hr({ person: e, testId: t }) {
	let n = e.status ?? "online";
	return /* @__PURE__ */ $("span", {
		className: "relative inline-flex shrink-0",
		children: [
			/* @__PURE__ */ Q(H, {
				name: e.displayName,
				src: e.avatarUrl,
				size: lr,
				className: o(e.inCall && "ring-2 ring-primary ring-offset-2 ring-offset-[var(--color-surface)]")
			}),
			/* @__PURE__ */ Q(ae, {
				state: n,
				className: "absolute -bottom-0.5 -right-0.5 rounded-full ring-2 ring-[var(--color-surface)]"
			}),
			e.activity && /* @__PURE__ */ Q("span", {
				"aria-hidden": "true",
				"data-testid": `${t}-activity-glyph`,
				className: "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-surface-emphasis text-text-secondary ring-2 ring-[var(--color-surface)]",
				children: /* @__PURE__ */ Q(T, { size: 9 })
			}),
			e.workSharing && /* @__PURE__ */ Q("span", {
				"aria-hidden": "true",
				"data-testid": `${t}-work-sharing-marker`,
				"data-sharing-state": e.workSharing.state,
				"data-sharing-fresh": e.workSharing.fresh ? "true" : "false",
				className: o("absolute -bottom-1 -left-1 h-3 w-3 rounded-full border-2 border-[var(--color-surface)] bg-primary", e.workSharing.state === "historical" && "bg-text-tertiary", e.workSharing.state === "active" && e.workSharing.fresh && "animate-pulse motion-reduce:animate-none")
			})
		]
	});
}
function gr({ people: e, maxVisible: t = 8, onSelectPerson: n, onShowAll: r, onSelectSharedWork: i, emptyLabel: a = "Nobody is around right now.", className: s, "data-testid": c = "active-people-grid" }) {
	if (e.length === 0) return /* @__PURE__ */ Q("p", {
		"data-testid": `${c}-empty`,
		className: o("text-[12px] text-text-tertiary", s),
		children: a
	});
	let l = e.slice(0, t), u = e.length - l.length;
	return /* @__PURE__ */ $("div", {
		"data-testid": c,
		role: "list",
		"aria-label": "Active now",
		className: o("grid grid-cols-4 gap-x-1 gap-y-2", s),
		children: [l.map((e) => {
			let t = `${c}-person-${e.userId}`, r = mr(e), a = /* @__PURE__ */ $("span", {
				className: "flex w-full min-w-0 items-center justify-center gap-1",
				children: [e.inCall && /* @__PURE__ */ Q("span", {
					"aria-hidden": "true",
					"data-testid": `${t}-live`,
					className: "h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
				}), /* @__PURE__ */ Q("span", {
					"data-ui-text": "active-person-caption",
					className: "min-w-0 truncate text-[11px] font-medium text-text-primary",
					children: pr(e.displayName)
				})]
			});
			if (e.workSharing && i) {
				let s = n ? /* @__PURE__ */ $("button", {
					type: "button",
					onClick: () => n(e.userId),
					title: r,
					"aria-label": r,
					"data-testid": t,
					className: o(dr, fr),
					children: [/* @__PURE__ */ Q(hr, {
						person: e,
						testId: t
					}), a]
				}) : /* @__PURE__ */ $("div", {
					title: r,
					"aria-label": r,
					"data-testid": t,
					className: dr,
					children: [/* @__PURE__ */ Q(hr, {
						person: e,
						testId: t
					}), a]
				});
				return /* @__PURE__ */ $("div", {
					role: "listitem",
					className: "relative min-w-0",
					children: [s, /* @__PURE__ */ Q("button", {
						type: "button",
						onClick: () => i(e.userId),
						"aria-label": `View ${e.displayName}'s ${e.workSharing.state === "historical" ? "shared work history" : "shared work"}`,
						className: "mt-1 w-full truncate rounded px-1 text-xs font-medium text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
						children: e.workSharing.state === "historical" ? "History" : "Active now"
					})]
				}, e.userId);
			}
			return n ? /* @__PURE__ */ $("button", {
				type: "button",
				role: "listitem",
				onClick: () => n(e.userId),
				title: r,
				"aria-label": r,
				"data-testid": t,
				className: o(dr, fr),
				children: [/* @__PURE__ */ Q(hr, {
					person: e,
					testId: t
				}), a]
			}, e.userId) : /* @__PURE__ */ $("div", {
				role: "listitem",
				title: r,
				"aria-label": r,
				"data-testid": t,
				className: dr,
				children: [/* @__PURE__ */ Q(hr, {
					person: e,
					testId: t
				}), a]
			}, e.userId);
		}), u > 0 && (r ? /* @__PURE__ */ $("button", {
			type: "button",
			onClick: r,
			"aria-label": `${u} more people`,
			"data-testid": `${c}-more`,
			className: o(dr, fr),
			children: [/* @__PURE__ */ $("span", {
				className: "flex h-10 w-10 items-center justify-center rounded-full bg-surface-emphasis text-[12px] font-semibold text-text-secondary",
				children: ["+", u]
			}), /* @__PURE__ */ Q("span", {
				"data-ui-text": "active-person-caption",
				className: "w-full min-w-0 truncate text-[11px] font-medium text-text-tertiary",
				children: "More"
			})]
		}) : /* @__PURE__ */ $("div", {
			"data-testid": `${c}-more`,
			className: dr,
			children: [/* @__PURE__ */ $("span", {
				className: "flex h-10 w-10 items-center justify-center rounded-full bg-surface-emphasis text-[12px] font-semibold text-text-secondary",
				children: ["+", u]
			}), /* @__PURE__ */ Q("span", {
				"data-ui-text": "active-person-caption",
				className: "w-full min-w-0 truncate text-[11px] font-medium text-text-tertiary",
				children: "More"
			})]
		}))]
	});
}
//#endregion
//#region src/components/social/TeamChannelTree.tsx
function _r(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
}
function vr(e) {
	return [...e].sort((e, t) => Number(!!t.pinned) - Number(!!e.pinned));
}
function yr({ teams: e, activeChannel: t = null, onSelectChannel: n, onToggleTeam: r, onCreateChannel: i, onManageTeam: a, onLeaveTeam: s, onTogglePinTeam: c, onTogglePinChannel: l, onCreateTeam: u, heading: d = "Teams", filter: f, collapsed: p = !1, onToggleCollapse: h, className: _, "data-testid": v = "team-channel-tree" }) {
	let y = d !== !1 && h !== void 0, b = y && p, x = ze(), S = `${x}teams-toggle`, w = `${x}teams`, T = r !== void 0, [D, O] = X(() => new Set(e.filter((e) => e.expanded).map((e) => e.teamId))), k = Y(null), [A, j] = X(null), M = (e) => I ? !0 : T ? !!e.expanded : D.has(e.teamId), N = (e, t) => {
		r?.(e, t), !T && O((n) => {
			if (n.has(e) === t) return n;
			let r = new Set(n);
			return t ? r.add(e) : r.delete(e), r;
		});
	}, P = (t) => {
		let n = e.find((e) => e.teamId === t);
		n && N(t, !M(n));
	}, F = f?.trim().toLowerCase() ?? "", I = F.length > 0, L = vr(I ? e.reduce((e, t) => {
		let n = t.name.toLowerCase().includes(F), r = n ? t.channels : t.channels.filter((e) => e.name.toLowerCase().includes(F));
		return (n || r.length > 0) && e.push({
			...t,
			channels: r
		}), e;
	}, []) : e), R = [];
	for (let e of b ? [] : L) if (R.push({
		id: `team:${e.teamId}`,
		kind: "team",
		teamId: e.teamId
	}), M(e)) for (let t of vr(e.channels)) R.push({
		id: `channel:${t.channel}`,
		kind: "channel",
		teamId: e.teamId,
		channel: t.channel
	});
	let z = A && R.some((e) => e.id === A) ? A : t && R.some((e) => e.kind === "channel" && e.channel === t) ? `channel:${t}` : R[0]?.id ?? null, B = (e) => {
		e && (j(e), k.current?.querySelector(`[data-row-id="${_r(e)}"]`)?.focus());
	}, ee = (t) => {
		let r = t.target.closest("[role=\"treeitem\"]")?.dataset.rowId;
		if (!r) return;
		let i = R.findIndex((e) => e.id === r);
		if (i < 0) return;
		let a = R[i], o = e.find((e) => e.teamId === a.teamId);
		if (o) switch (t.key) {
			case "ArrowDown":
				t.preventDefault(), B(R[Math.min(i + 1, R.length - 1)]?.id ?? null);
				return;
			case "ArrowUp":
				t.preventDefault(), B(R[Math.max(i - 1, 0)]?.id ?? null);
				return;
			case "Home":
				t.preventDefault(), B(R[0]?.id ?? null);
				return;
			case "End":
				t.preventDefault(), B(R[R.length - 1]?.id ?? null);
				return;
			case "ArrowRight":
				if (t.preventDefault(), a.kind === "team") {
					if (!M(o)) N(o.teamId, !0);
					else {
						let e = R[i + 1];
						e && e.kind === "channel" && e.teamId === o.teamId && B(e.id);
					}
				}
				return;
			case "ArrowLeft":
				t.preventDefault(), a.kind === "team" ? M(o) && N(o.teamId, !1) : (N(a.teamId, !1), B(`team:${a.teamId}`));
				return;
			case "Enter":
			case " ":
				t.preventDefault(), a.kind === "team" ? P(a.teamId) : n(a.channel);
				return;
		}
	};
	return /* @__PURE__ */ $("div", {
		className: o("flex flex-col", _),
		children: [d !== !1 && /* @__PURE__ */ Q(we, {
			label: d,
			presentational: !1,
			className: "pt-2",
			...y ? {
				collapsed: p,
				onToggleCollapse: h,
				controls: w,
				toggleId: S,
				collapsedCount: e.reduce((e, t) => e + t.channels.reduce((e, t) => e + (t.unreadCount ?? 0), 0), 0)
			} : {},
			actions: u ? [{
				label: "Create a team",
				onClick: (e) => u(e),
				"data-testid": `${v}-create-team`
			}] : [],
			"data-testid": `${v}-heading`
		}), /* @__PURE__ */ Q("div", {
			ref: k,
			role: "tree",
			id: y ? w : void 0,
			"aria-label": d === !1 ? "Teams" : void 0,
			"aria-labelledby": y ? S : void 0,
			className: "flex flex-col gap-0.5",
			"data-testid": v,
			onKeyDown: ee,
			children: !b && L.map((e) => {
				let r = M(e), u = `team:${e.teamId}`, d = z === u, f = [];
				return a && f.push({
					label: "Manage team",
					onSelect: () => a(e.teamId),
					"data-testid": `${v}-team-${e.teamId}-menu-manage`
				}), c && f.push({
					label: e.pinned ? "Unpin" : "Pin",
					icon: /* @__PURE__ */ Q(g, { size: 14 }),
					onSelect: () => c(e.teamId, !e.pinned),
					"data-testid": `${v}-team-${e.teamId}-menu-pin`
				}), s && f.push({
					label: "Leave team",
					onSelect: () => s(e.teamId),
					"data-testid": `${v}-team-${e.teamId}-menu-leave`
				}), /* @__PURE__ */ $("div", { children: [/* @__PURE__ */ $("div", {
					role: "treeitem",
					"aria-expanded": r,
					"aria-level": 1,
					tabIndex: d ? 0 : -1,
					"data-row-id": u,
					"data-testid": `${v}-team-${e.teamId}`,
					onClick: () => P(e.teamId),
					onFocus: () => j(u),
					className: o("group flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left", "hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"),
					children: [
						/* @__PURE__ */ Q(C, {
							dir: r ? "down" : "right",
							size: 14,
							className: "shrink-0 text-text-tertiary transition-transform"
						}),
						/* @__PURE__ */ Q(H, {
							name: e.name,
							src: e.avatarUrl,
							size: 22
						}),
						/* @__PURE__ */ $("span", {
							className: "flex min-w-0 flex-1 items-center gap-1.5",
							children: [/* @__PURE__ */ Q("span", {
								className: "min-w-0 truncate text-[13px] font-semibold text-text-primary",
								children: e.name
							}), e.pinned && /* @__PURE__ */ Q("span", {
								"data-testid": `${v}-team-${e.teamId}-pinned`,
								title: "Pinned",
								className: "shrink-0 text-text-tertiary",
								children: /* @__PURE__ */ Q(g, { size: 12 })
							})]
						}),
						i && /* @__PURE__ */ Q("button", {
							type: "button",
							title: `Create a channel in ${e.name}`,
							"aria-label": `Create a channel in ${e.name}`,
							tabIndex: d ? 0 : -1,
							onClick: (t) => {
								t.stopPropagation(), i(e.teamId, t.currentTarget);
							},
							"data-testid": `${v}-team-${e.teamId}-add-channel`,
							className: o("grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-md border-none bg-transparent p-0", "text-text-secondary hover:bg-surface-hover hover:text-text-primary", "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", "[@media(hover:none)]:opacity-100", "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: /* @__PURE__ */ Q(E, { size: 14 })
						}),
						f.length > 0 && /* @__PURE__ */ Q("span", {
							onClick: (e) => e.stopPropagation(),
							className: o("shrink-0 opacity-0 transition-opacity", "group-hover:opacity-100 group-focus-within:opacity-100", "has-[[aria-expanded=true]]:opacity-100", "[@media(hover:none)]:opacity-100"),
							children: /* @__PURE__ */ Q(ne, {
								trigger: /* @__PURE__ */ Q("span", {
									"aria-hidden": !0,
									className: "leading-none tracking-wide",
									children: "⋯"
								}),
								triggerLabel: `More options for ${e.name}`,
								triggerTitle: "More options",
								triggerTabIndex: d ? 0 : -1,
								triggerTestId: `${v}-team-${e.teamId}-menu`,
								triggerClassName: "h-6 w-6 rounded-md border-0 p-0 text-[13px] text-text-secondary hover:bg-surface-hover",
								align: "end",
								sections: [{ items: f }],
								"data-testid": `${v}-team-${e.teamId}-menu-panel`
							})
						})
					]
				}), r && vr(e.channels).map((e) => {
					let r = `channel:${e.channel}`, i = z === r, a = e.channel === t, s = e.unreadCount ?? 0, c = !!e.muted;
					return /* @__PURE__ */ $("div", {
						role: "treeitem",
						"aria-level": 2,
						"aria-selected": a,
						tabIndex: i ? 0 : -1,
						"data-row-id": r,
						"data-testid": `${v}-channel-${e.channel}`,
						"data-active": a ? "true" : "false",
						onClick: () => n(e.channel),
						onFocus: () => j(r),
						className: o("group flex w-full cursor-pointer items-center gap-2 rounded-md py-1.5 pl-8 pr-2 text-left text-[13px]", "hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", a && "bg-surface-hover"),
						children: [
							/* @__PURE__ */ Q("span", {
								"aria-hidden": !e.private,
								className: "flex h-4 w-4 shrink-0 items-center justify-center text-text-tertiary",
								children: e.private ? /* @__PURE__ */ Q(m, { size: 12 }) : "#"
							}),
							/* @__PURE__ */ $("span", {
								className: "flex min-w-0 flex-1 items-center gap-1.5",
								children: [/* @__PURE__ */ Q("span", {
									className: o("min-w-0 truncate", s > 0 ? "font-semibold" : "font-medium", "text-text-primary"),
									children: e.name
								}), e.pinned && /* @__PURE__ */ Q("span", {
									"data-testid": `${v}-channel-${e.channel}-pinned`,
									title: "Pinned",
									className: "shrink-0 text-text-tertiary",
									children: /* @__PURE__ */ Q(g, { size: 12 })
								})]
							}),
							e.mentioned && /* @__PURE__ */ Q("span", {
								"data-testid": `${v}-channel-${e.channel}-mention`,
								"aria-label": "You were mentioned",
								title: "You were mentioned",
								className: "grid h-4 w-4 shrink-0 place-items-center rounded-full bg-danger text-[10px] font-bold leading-none text-white",
								children: "@"
							}),
							e.live && /* @__PURE__ */ Q("span", {
								"data-testid": `${v}-channel-${e.channel}-live`,
								"aria-label": "Call in progress",
								title: "Call in progress",
								className: "inline-flex shrink-0 items-center gap-1 rounded-full bg-danger px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none tracking-wide text-white",
								children: "Live"
							}),
							s > 0 && /* @__PURE__ */ Q("span", {
								"data-testid": `${v}-channel-${e.channel}-unread`,
								"data-muted": c ? "true" : "false",
								className: o("grid h-5 min-w-5 shrink-0 place-items-center rounded-full px-1.5 text-[11px] font-semibold leading-none", c ? "bg-surface-inset text-text-secondary" : "bg-primary text-on-primary"),
								children: s > 99 ? "99+" : s
							}),
							l && /* @__PURE__ */ Q("button", {
								type: "button",
								title: e.pinned ? "Unpin" : "Pin",
								"aria-label": `${e.pinned ? "Unpin" : "Pin"} ${e.name}`,
								tabIndex: i ? 0 : -1,
								onClick: (t) => {
									t.stopPropagation(), l(e.channel, !e.pinned);
								},
								"data-testid": `${v}-channel-${e.channel}-pin-toggle`,
								className: o("grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-md border-none bg-transparent p-0", "text-text-secondary hover:bg-surface-hover hover:text-text-primary", "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", "[@media(hover:none)]:opacity-100", "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
								children: /* @__PURE__ */ Q(g, { size: 12 })
							})
						]
					}, e.channel);
				})] }, e.teamId);
			})
		})]
	});
}
//#endregion
//#region src/components/social/CreateChannelDialog.tsx
var br = 80, xr = [{
	label: "Standard",
	value: "standard"
}, {
	label: "Private",
	value: "private",
	icon: /* @__PURE__ */ Q(m, { size: 12 })
}];
function Sr({ open: e, teamName: t, busy: n = !1, anchor: r, placement: i = "right", onCreate: a, onClose: o, "data-testid": s = "create-channel-dialog" }) {
	let [c, l] = X(""), [d, f] = X(""), [p, m] = X("standard"), [h, g] = X(!1), [_, v] = X(null);
	q(() => {
		e && (l(""), f(""), m("standard"), g(!1), v(null));
	}, [e]);
	let y = c.trim(), b = n || h, x = y.length > 0 && y.length <= br && !b, S = async () => {
		if (x) {
			g(!0), v(null);
			try {
				await a({
					name: y,
					description: d.trim() || void 0,
					privacy: p
				}), o();
			} catch (e) {
				v(e instanceof Error ? e.message : String(e)), g(!1);
			}
		}
	};
	return /* @__PURE__ */ $(ge, {
		open: e,
		anchor: r,
		placement: i,
		icon: /* @__PURE__ */ Q("span", {
			className: "text-[13px] font-semibold leading-none",
			children: "#"
		}),
		title: "Create a channel",
		subtitle: t,
		submitLabel: "Create",
		submitTestId: `${s}-create`,
		submitDisabled: !x,
		busy: b,
		error: _,
		onSubmit: () => void S(),
		onClose: o,
		"data-testid": s,
		children: [
			/* @__PURE__ */ Q(ve, {
				label: "Name",
				"data-testid": `${s}-name-field`,
				children: /* @__PURE__ */ Q(P, {
					size: "sm",
					value: c,
					maxLength: br,
					disabled: b,
					placeholder: "e.g. design-reviews",
					onChange: (e) => l(e.target.value),
					"data-testid": `${s}-name`
				})
			}),
			/* @__PURE__ */ Q(ve, {
				label: "Description",
				"data-testid": `${s}-description-field`,
				children: /* @__PURE__ */ Q(V, {
					value: d,
					rows: 2,
					disabled: b,
					placeholder: "What is this channel for?",
					onChange: (e) => f(e.target.value),
					"data-testid": `${s}-description`
				})
			}),
			/* @__PURE__ */ Q(ve, {
				label: "Privacy",
				hint: p === "private" ? "Only people you add can see it." : "Everyone on the team can see it.",
				"data-testid": `${s}-privacy-field`,
				children: /* @__PURE__ */ Q(u, {
					density: "compact",
					children: /* @__PURE__ */ Q(G, {
						fullWidth: !0,
						disabled: b,
						"aria-label": "Channel privacy",
						options: xr,
						value: p,
						onChange: (e) => m(e),
						"data-testid": `${s}-privacy`
					})
				})
			})
		]
	});
}
//#endregion
//#region src/components/social/NewChatDialog.tsx
function Cr({ open: e, candidates: t, anchor: n, placement: r = "bottom-start", busy: i = !1, error: a = null, onStart: o, onClose: s, "data-testid": c = "new-chat" }) {
	return e ? /* @__PURE__ */ Q(Be, {
		candidates: t,
		onInvite: (e) => {
			o(e);
		},
		loading: i,
		resetKey: e,
		searchable: !0,
		grouped: !0,
		confirmLabel: "Start chat",
		confirmCountLabel: (e) => `Start chat with ${e}`,
		confirmLoadingLabel: "Starting…",
		"data-testid": `${c}-people`,
		children: ({ list: t, confirm: o }) => /* @__PURE__ */ Q(ge, {
			open: e,
			anchor: n,
			placement: r,
			title: "New chat",
			subtitle: "Pick one person, or several for a group",
			busy: i,
			error: a,
			submitSlot: o,
			onSubmit: () => {},
			onClose: s,
			width: "md",
			"data-testid": c,
			children: /* @__PURE__ */ Q("div", {
				className: "-mx-1 max-h-[min(22rem,50vh)] overflow-y-auto px-1",
				children: t
			})
		})
	}) : null;
}
//#endregion
//#region src/components/social/CreateTeamDialog.tsx
var wr = 80, Tr = [{
	label: "Org-wide",
	value: "org"
}, {
	label: "Private",
	value: "private",
	icon: /* @__PURE__ */ Q(m, { size: 12 })
}];
function Er({ open: e, busy: t = !1, anchor: n, placement: r = "bottom-end", onCreate: i, onClose: a, "data-testid": o = "create-team-dialog" }) {
	let [s, c] = X(""), [l, d] = X(""), [f, p] = X("org"), [m, h] = X(!1), [g, _] = X(null);
	q(() => {
		e && (c(""), d(""), p("org"), h(!1), _(null));
	}, [e]);
	let v = s.trim(), y = t || m, b = v.length > 0 && v.length <= wr && !y, x = async () => {
		if (b) {
			h(!0), _(null);
			try {
				await i({
					name: v,
					description: l.trim() || void 0,
					visibility: f
				}), a();
			} catch (e) {
				_(e instanceof Error ? e.message : String(e)), h(!1);
			}
		}
	};
	return /* @__PURE__ */ $(ge, {
		open: e,
		anchor: n,
		placement: r,
		title: "Create a team",
		subtitle: "A team gets a General channel to start",
		submitLabel: "Create",
		submitTestId: `${o}-create`,
		submitDisabled: !b,
		busy: y,
		error: g,
		onSubmit: () => void x(),
		onClose: a,
		"data-testid": o,
		children: [
			/* @__PURE__ */ Q(ve, {
				label: "Name",
				"data-testid": `${o}-name-field`,
				children: /* @__PURE__ */ Q(P, {
					size: "sm",
					value: s,
					maxLength: wr,
					disabled: y,
					placeholder: "e.g. Design",
					onChange: (e) => c(e.target.value),
					"data-testid": `${o}-name`
				})
			}),
			/* @__PURE__ */ Q(ve, {
				label: "Description",
				"data-testid": `${o}-description-field`,
				children: /* @__PURE__ */ Q(V, {
					value: l,
					rows: 2,
					disabled: y,
					placeholder: "What does this team work on?",
					onChange: (e) => d(e.target.value),
					"data-testid": `${o}-description`
				})
			}),
			/* @__PURE__ */ Q(ve, {
				label: "Who can join",
				hint: f === "private" ? "People need an invitation." : "Anyone in the org can join.",
				"data-testid": `${o}-visibility-field`,
				children: /* @__PURE__ */ Q(u, {
					density: "compact",
					children: /* @__PURE__ */ Q(G, {
						fullWidth: !0,
						disabled: y,
						"aria-label": "Team visibility",
						options: Tr,
						value: f,
						onChange: (e) => p(e),
						"data-testid": `${o}-visibility`
					})
				})
			})
		]
	});
}
//#endregion
//#region src/components/social/PromptContextPicker.tsx
function Dr({ search: e, scope: t = "documents", label: n = "Add a document to the prompt", placeholder: r = "Search documents", debounceMs: i = 200, "data-testid": a = "prompt-context-picker" }) {
	let s = c(t), [l, u] = X(!1), [d, f] = X(""), [p, m] = X([]), [h, g] = X("idle"), [v, y] = X(null), b = Y(null), x = Y(e);
	x.current = e, q(() => {
		if (!l) return;
		let e = !0;
		g("loading");
		let t = setTimeout(() => {
			Promise.resolve().then(() => x.current(d.trim())).then((t) => {
				e && (m(t.slice(0, 20)), g("idle"), y(null));
			}).catch((t) => {
				e && (g("error"), y(t instanceof Error && t.message ? t.message : "Search failed"));
			});
		}, d ? i : 0);
		return () => {
			e = !1, clearTimeout(t);
		};
	}, [
		l,
		d,
		i
	]);
	let S = s.items.length >= 10;
	return /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q("button", {
		ref: b,
		type: "button",
		"aria-label": n,
		title: n,
		"aria-haspopup": "dialog",
		"aria-expanded": l,
		onClick: () => u((e) => !e),
		"data-testid": a,
		className: o("inline-flex h-8 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-text-secondary", "hover:bg-surface-hover hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary", l && "bg-surface-hover text-text-primary"),
		children: /* @__PURE__ */ Q(E, {
			size: 16,
			"aria-hidden": "true"
		})
	}), /* @__PURE__ */ $(I, {
		trigger: b,
		open: l,
		onClose: () => u(!1),
		placement: "bottom-start",
		"aria-label": n,
		className: "w-80 rounded-lg p-2",
		"data-testid": `${a}-popover`,
		children: [/* @__PURE__ */ Q(L, {
			value: d,
			onChange: f,
			placeholder: r,
			"aria-label": r,
			autoFocus: !0,
			size: "sm"
		}), /* @__PURE__ */ $("ul", {
			className: "mt-2 max-h-72 overflow-y-auto",
			"data-testid": `${a}-results`,
			children: [
				h === "loading" && p.length === 0 && /* @__PURE__ */ Q("li", {
					className: "px-2 py-2 text-sm text-text-tertiary",
					children: "Searching…"
				}),
				h === "error" && /* @__PURE__ */ Q("li", {
					role: "alert",
					className: "px-2 py-2 text-sm text-danger-fg",
					children: v
				}),
				h === "idle" && p.length === 0 && /* @__PURE__ */ Q("li", {
					className: "px-2 py-2 text-sm text-text-tertiary",
					children: d.trim() ? "No documents match" : "No documents yet"
				}),
				p.map((e) => {
					let t = s.has(e.id), n = !t && S;
					return /* @__PURE__ */ Q("li", { children: /* @__PURE__ */ $("button", {
						type: "button",
						"aria-pressed": t,
						disabled: n,
						title: n ? "A prompt takes at most 10 documents" : void 0,
						onClick: () => s.toggle(e),
						"data-testid": `${a}-result`,
						"data-document-id": e.id,
						className: o("flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-text-primary", "hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"),
						children: [
							/* @__PURE__ */ Q(_, {
								size: 14,
								"aria-hidden": "true",
								className: "shrink-0 text-text-secondary"
							}),
							/* @__PURE__ */ Q("span", {
								className: "min-w-0 flex-1 truncate",
								children: e.title
							}),
							/* @__PURE__ */ Q("span", {
								className: o("shrink-0 text-xs font-medium", t ? "text-primary" : "text-text-tertiary"),
								children: t ? "✓ Added" : "Add"
							})
						]
					}) }, e.id);
				})
			]
		})]
	})] });
}
//#endregion
//#region src/components/social/ChannelBindingStrip.tsx
function Or({ label: e, channel: t, latest: n, notice: r, openLabel: i = "Open in Social", onOpen: a, openDisabled: s, choices: c = [], onBind: u, onUnbind: d, busy: p = !1, error: m, unboundLabel: h = "No channel bound", className: g, "data-testid": _ = "channel-binding" }) {
	let [v, y] = X("");
	return /* @__PURE__ */ $("div", {
		className: o("flex min-w-0 flex-wrap items-center gap-2", g),
		"data-testid": _,
		children: [
			/* @__PURE__ */ Q("span", {
				className: "text-[12px] font-medium text-text-secondary",
				children: e
			}),
			t ? /* @__PURE__ */ $(Z, { children: [
				/* @__PURE__ */ $(f, {
					tone: "accent",
					size: "xs",
					"data-testid": `${_}-channel`,
					children: [
						"#",
						t.name,
						t.privacy === "private" ? " (private)" : ""
					]
				}),
				n && /* @__PURE__ */ Q("span", {
					className: "min-w-0 truncate text-[12px] text-text-tertiary",
					title: n,
					"data-testid": `${_}-latest`,
					children: n
				}),
				r && /* @__PURE__ */ Q(be, {
					size: "xs",
					tone: "tertiary",
					items: [r]
				}),
				a && /* @__PURE__ */ Q(l, {
					size: "sm",
					variant: "ghost",
					className: "h-7 border-0 text-[12px] font-medium",
					"data-testid": `${_}-open`,
					onClick: a,
					disabled: s,
					children: i
				}),
				d && /* @__PURE__ */ Q(l, {
					size: "sm",
					variant: "ghost",
					className: "h-7 border-0 text-[12px] font-medium",
					"data-testid": `${_}-unbind`,
					disabled: p,
					onClick: () => {
						d();
					},
					children: "Unbind"
				})
			] }) : /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q(be, {
				size: "xs",
				tone: "tertiary",
				items: [h]
			}), u && /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q(F, {
				"aria-label": "Channel to bind",
				size: "sm",
				className: "w-48",
				value: v,
				placeholder: "Choose a channel",
				onChange: (e) => y(e.target.value),
				options: c.map((e) => ({
					value: e.value,
					label: e.label
				})),
				"data-testid": `${_}-choice`
			}), /* @__PURE__ */ Q(l, {
				size: "sm",
				variant: "secondary",
				className: "h-7 text-[12px] font-medium",
				"data-testid": `${_}-bind`,
				disabled: !v || p,
				onClick: () => {
					Promise.resolve(u(v)).then(() => y(""));
				},
				children: "Bind"
			})] })] }),
			m && /* @__PURE__ */ Q("span", {
				className: "text-[12px] text-danger",
				role: "alert",
				"data-testid": `${_}-error`,
				children: m
			})
		]
	});
}
//#endregion
//#region src/components/social/CallLogList.tsx
var kr = (e) => new Date(e).toLocaleString(void 0, {
	month: "short",
	day: "numeric",
	hour: "numeric",
	minute: "2-digit"
});
function Ar({ rows: e, onCallBack: t, callBackLabel: n = () => "Call back", callBackDisabled: r, formatWhen: i = kr, defaultFilter: a = "all", className: o, "data-testid": s = "call-log" }) {
	let [c, u] = X(a), d = J(() => e.filter((e) => e.missed).length, [e]), p = c === "missed" ? e.filter((e) => e.missed) : e;
	return /* @__PURE__ */ $("div", {
		className: ["flex flex-col gap-2", o].filter(Boolean).join(" "),
		"data-testid": s,
		children: [/* @__PURE__ */ Q(G, {
			"aria-label": "Which calls",
			value: c,
			onChange: (e) => u(e),
			options: [{
				value: "all",
				label: "All"
			}, {
				value: "missed",
				label: `Missed${d ? ` (${d})` : ""}`
			}],
			"data-testid": `${s}-filter`
		}), /* @__PURE__ */ Q(R, {
			data: p,
			columns: [
				{
					key: "who",
					header: "Who",
					sortable: !0
				},
				{
					key: "direction",
					header: "Direction",
					width: "120px"
				},
				{
					key: "outcome",
					header: "Outcome",
					width: "130px",
					render: (e) => /* @__PURE__ */ Q(f, {
						tone: e.missed ? "danger" : "neutral",
						size: "xs",
						children: e.outcome
					})
				},
				{
					key: "startedAt",
					header: "When",
					width: "170px",
					sortable: !0,
					render: (e) => i(e.startedAt)
				},
				{
					key: "duration",
					header: "Length",
					width: "100px",
					align: "right"
				}
			],
			keyField: (e) => e.id,
			emptyMessage: c === "missed" ? "No missed calls." : "No calls yet.",
			...t ? { rowActions: (e) => /* @__PURE__ */ Q(l, {
				variant: "ghost",
				size: "sm",
				disabled: r,
				onClick: () => t(e),
				"data-testid": `${s}-call-back`,
				children: n(e)
			}) } : {},
			"data-testid": `${s}-table`
		})]
	});
}
//#endregion
//#region src/components/social/AddPeoplePicker.tsx
function jr({ open: e, onClose: t, candidates: n, onAdd: r, title: i = "Add people", searchPlaceholder: a = "Find a person", emptyMessage: s = "No one left to add.", confirmLabel: c = "Add", busy: u = !1, error: d = null, "data-testid": p = "add-people" }) {
	let [m, h] = X(""), [g, _] = X([]);
	q(() => {
		e || (h(""), _([]));
	}, [e]), q(() => {
		_((e) => {
			let t = e.filter((e) => n.some((t) => t.userId === e));
			return t.length === e.length ? e : t;
		});
	}, [n]);
	let v = m.trim().toLowerCase(), y = J(() => n.filter((e) => !v || e.displayName.toLowerCase().includes(v) || (e.subtitle ?? "").toLowerCase().includes(v)), [n, v]), b = (e) => n.find((t) => t.userId === e)?.displayName ?? e, x = (e) => _((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	return /* @__PURE__ */ Q(N, {
		open: e,
		onClose: t,
		title: i,
		maxWidth: 560,
		footer: /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q(l, {
			variant: "secondary",
			size: "sm",
			onClick: t,
			children: "Cancel"
		}), /* @__PURE__ */ Q(l, {
			size: "sm",
			disabled: g.length === 0 || u,
			onClick: () => {
				r(g);
			},
			"data-testid": `${p}-confirm`,
			children: g.length ? `${c} ${g.length}` : c
		})] }),
		children: /* @__PURE__ */ $("div", {
			className: "flex flex-col gap-3",
			"data-testid": p,
			children: [
				/* @__PURE__ */ Q(L, {
					value: m,
					onChange: h,
					placeholder: a,
					"data-testid": `${p}-search`
				}),
				g.length > 0 && /* @__PURE__ */ Q("div", {
					className: "flex flex-wrap gap-1",
					"data-testid": `${p}-selected`,
					children: g.map((e) => /* @__PURE__ */ Q(f, {
						size: "sm",
						tone: "accent",
						onRemove: () => x(e),
						children: b(e)
					}, e))
				}),
				y.length === 0 ? /* @__PURE__ */ Q("p", {
					className: "m-0 py-4 text-center text-[13px] text-text-tertiary",
					children: n.length === 0 ? s : "No one matches."
				}) : /* @__PURE__ */ Q("ul", {
					className: "m-0 flex max-h-72 list-none flex-col gap-0.5 overflow-y-auto p-0",
					"aria-label": "People",
					"data-testid": `${p}-list`,
					children: y.map((e) => {
						let t = g.includes(e.userId);
						return /* @__PURE__ */ Q("li", { children: /* @__PURE__ */ $("button", {
							type: "button",
							"aria-pressed": t,
							onClick: () => x(e.userId),
							"data-testid": `${p}-person`,
							className: o("flex w-full items-center gap-2 rounded-md border-0 px-2 py-1.5 text-left", t ? "bg-primary-bg" : "bg-transparent hover:bg-surface-hover"),
							children: [
								/* @__PURE__ */ Q(H, {
									name: e.displayName,
									size: 28
								}),
								/* @__PURE__ */ $("span", {
									className: "flex min-w-0 flex-1 flex-col",
									children: [/* @__PURE__ */ Q("span", {
										className: "truncate text-[13px] font-medium text-text-primary",
										children: e.displayName
									}), e.subtitle && /* @__PURE__ */ Q("span", {
										className: "truncate text-[11px] text-text-tertiary",
										children: e.subtitle
									})]
								}),
								/* @__PURE__ */ Q("span", {
									"aria-hidden": !0,
									className: "text-[12px] text-primary-fg",
									children: t ? "✓" : ""
								})
							]
						}) }, e.userId);
					})
				}),
				d && /* @__PURE__ */ Q("p", {
					className: "m-0 text-[12px] text-danger",
					role: "alert",
					children: d
				})
			]
		})
	});
}
//#endregion
export { mt as $, wn as A, an as B, An as C, zn as D, Mn as E, gn as F, Kt as G, Yt as H, mn as I, Wt as J, Xt as K, pn as L, yn as M, vn as N, Rn as O, _n as P, yt as Q, $t as R, On as S, kn as T, Jt as U, Zt as V, qt as W, It as X, Ut as Y, Dt as Z, Hn as _, Er as a, Xe as at, Gn as b, yr as c, Be as ct, or as d, ct as et, tr as f, Jn as g, er as h, Dr as i, Ze as it, En as j, Tn as k, gr as l, nr as m, Ar as n, ot as nt, Cr as o, Ye as ot, rr as p, Gt as q, Or as r, $e as rt, Sr as s, He as st, jr as t, st as tt, cr as u, Vn as v, jn as w, Kn as x, Un as y, Qt as z };
