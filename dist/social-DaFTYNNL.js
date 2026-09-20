import { a as e, i as t, n, o as r, r as i, t as a } from "./useSocialProfile-5S1qyvsv.js";
import { t as o } from "./cn-DhjIN-s0.js";
import { n as s } from "./ToastProvider-B0D0SLKU.js";
import { t as c } from "./Button-BhS4-R6_.js";
import { t as l } from "./IconButton-C3DMtvSx.js";
import { C as u, F as d, S as f, T as p, _ as m, c as h, d as g, p as _, r as v, s as y, t as b, u as x, x as S } from "./Icons-CQiDn2Ki.js";
import { n as C, t as w } from "./Stack-CkiMw5K0.js";
import { t as T } from "./Banner-C3Wgh62A.js";
import { t as E } from "./Chip-BENLwTlq.js";
import { t as D } from "./EmptyState-JzzL2z1E.js";
import { t as O } from "./SkeletonCard-CGe8XFPB.js";
import { t as k } from "./Input-DLknWXri.js";
import { t as A } from "./Textarea-Dz4doxTv.js";
import { n as j, t as M } from "./Avatar-BzicCOft.js";
import { a as N, i as P, n as F, r as I, t as L } from "./Tooltip-DVdtkVc0.js";
import { t as R } from "./SegmentedControl-BhRaBRce.js";
import { t as z } from "./InlineAlert-CRnIKeAF.js";
import { t as B } from "./InlinePlaceholder-51dbPRGn.js";
import { t as ee } from "./DropdownMenu--xElGnK6.js";
import { t as V } from "./Select-CqVokE2v.js";
import { n as te, r as H, t as ne } from "./ChoiceList-CaZ4rZrS.js";
import { L as re, N as ie, Q as ae, R as oe, X as U, nt as se } from "./ConversationSurface-EqVv_tP_.js";
import { t as ce } from "./rovingFocus-Bj5Y6kwY.js";
import { n as le, t as ue } from "./ReactionPickerPopover-CcL-n6gt.js";
import { n as de, t as fe } from "./composerCommands-DXer0id_.js";
import { createContext as W, useCallback as G, useContext as pe, useEffect as K, useId as me, useMemo as q, useRef as J, useState as Y } from "react";
import { Fragment as X, jsx as Z, jsxs as Q } from "react/jsx-runtime";
//#region src/components/hangout/InviteCandidateList.tsx
function he({ candidates: e, onInvite: t, loading: n = !1, resetKey: r, children: i, tone: a = "light", searchable: s = !1, grouped: l = !1, selectMode: u = "multi", onPick: d, confirmLabel: f = "Invite", confirmLoadingLabel: p = "Inviting…", confirmCountLabel: m, className: h, "data-testid": g }) {
	let _ = a === "dark", v = u === "single", [y, b] = Y(() => /* @__PURE__ */ new Set()), [x, S] = Y("");
	K(() => {
		b(/* @__PURE__ */ new Set()), S("");
	}, [r]);
	let C = q(() => e.filter((e) => !e.alreadyInCall), [e]);
	K(() => {
		b((e) => {
			if (e.size === 0) return e;
			let t = new Set(C.map((e) => e.userId)), n = !1, r = /* @__PURE__ */ new Set();
			for (let i of e) t.has(i) ? r.add(i) : n = !0;
			return n ? r : e;
		});
	}, [C]);
	let w = q(() => {
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
		return /* @__PURE__ */ Z("li", { children: /* @__PURE__ */ Q("button", {
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
				/* @__PURE__ */ Q("span", {
					className: "relative inline-flex shrink-0",
					children: [/* @__PURE__ */ Z(M, {
						name: e.name,
						src: e.avatarUrl,
						color: e.color,
						size: 24
					}), e.online !== void 0 && /* @__PURE__ */ Z(N, {
						state: e.online ? "online" : "offline",
						pulse: !1,
						size: "xs",
						className: o("absolute -bottom-0.5 -right-0.5 rounded-full ring-2", _ ? "ring-call-chrome" : "ring-surface")
					})]
				}),
				/* @__PURE__ */ Z("span", {
					className: o("flex-1 truncate text-[13px]", _ ? "text-white" : "text-text-primary"),
					children: e.name
				}),
				e.online === !1 && e.lastSeenLabel && /* @__PURE__ */ Z("span", {
					"data-testid": "invite-candidate-last-seen",
					className: o("shrink-0 text-[11px]", _ ? "text-white/50" : "text-neutral"),
					children: e.lastSeenLabel
				}),
				e.statusLabel && !e.alreadyInCall && !e.pending && /* @__PURE__ */ Z("span", {
					"data-testid": "invite-candidate-status",
					className: o("shrink-0 text-[11px]", _ ? "text-white/50" : "text-neutral"),
					children: e.statusLabel
				}),
				e.alreadyInCall ? /* @__PURE__ */ Z("span", {
					className: o("text-[11px]", _ ? "text-white/50" : "text-neutral"),
					children: "In call"
				}) : e.pending ? /* @__PURE__ */ Z("span", {
					className: o("text-[11px]", _ ? "text-white/50" : "text-neutral"),
					children: "Ringing…"
				}) : v || e.disabled ? null : /* @__PURE__ */ Z("span", {
					"aria-hidden": "true",
					className: o("grid h-4 w-4 place-items-center rounded border text-[10px]", r ? "border-transparent bg-primary text-white" : o("text-transparent", _ ? "border-white/30" : "border-border")),
					children: "✓"
				})
			]
		}) }, e.userId);
	}, O = (e, t) => /* @__PURE__ */ Z("li", {
		"data-testid": `people-group-${t}`,
		"aria-hidden": "true",
		className: o("px-2 pb-0.5 pt-2 text-[11px] font-semibold uppercase tracking-wide first:pt-0", _ ? "text-white/40" : "text-text-tertiary"),
		children: e
	}, `section-${t}`), A = l ? w.filter((e) => e.online === !0) : [], j = l ? w.filter((e) => e.online !== !0) : [], P = /* @__PURE__ */ Q(X, { children: [s && /* @__PURE__ */ Z(k, {
		type: "search",
		size: "sm",
		value: x,
		onChange: (e) => S(e.target.value),
		placeholder: "Search people",
		"aria-label": "Search people",
		"data-testid": "people-search",
		className: o("mb-1", _ && "border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
	}), e.length === 0 ? /* @__PURE__ */ Z("p", {
		className: o("m-0 text-[13px]", _ ? "text-white/60" : "text-text-secondary"),
		"data-testid": "invite-to-call-empty",
		children: l ? "No one to show yet." : "Nobody else is online right now."
	}) : C.length === 0 ? /* @__PURE__ */ Z("p", {
		className: o("m-0 text-[13px]", _ ? "text-white/60" : "text-text-secondary"),
		"data-testid": "invite-to-call-everyone-here",
		children: "Everyone who's online is already on this call."
	}) : w.length === 0 ? /* @__PURE__ */ Q("p", {
		className: o("m-0 text-[13px]", _ ? "text-white/60" : "text-text-secondary"),
		"data-testid": "people-search-empty",
		children: [
			"No one matches “",
			x.trim(),
			"”."
		]
	}) : /* @__PURE__ */ Z("ul", {
		className: "flex flex-col gap-1 m-0 p-0 list-none max-h-[min(55vh,480px)] overflow-y-auto overscroll-contain [scrollbar-width:thin] [scrollbar-gutter:stable]",
		"aria-label": "People you can invite",
		children: l ? /* @__PURE__ */ Q(X, { children: [
			A.length > 0 && O("Online", "online"),
			A.map(D),
			j.length > 0 && O("Offline", "offline"),
			j.map(D)
		] }) : w.map(D)
	})] }), F = v ? null : /* @__PURE__ */ Z(c, {
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
	return i ? /* @__PURE__ */ Z(X, { children: i({
		list: P,
		confirm: F
	}) }) : /* @__PURE__ */ Q("div", {
		className: o("flex flex-col gap-3", h),
		"data-testid": g,
		children: [P, F && /* @__PURE__ */ Z("div", {
			className: "flex justify-end",
			children: F
		})]
	});
}
//#endregion
//#region src/components/layout/WorkspaceRail.tsx
function ge({ title: e, label: t, actions: n, header: r, footer: i, children: a, width: s = "md", collapsed: c = !1, collapsedContent: u, onToggle: d, toggleLabel: f, toggleTestId: p, className: m, "data-testid": h = "workspace-rail" }) {
	let g = f ?? `${c ? "Show" : "Hide"} ${t ?? e ?? "the list"}`;
	return /* @__PURE__ */ Q("nav", {
		"aria-label": t ?? e ?? "Workspace",
		"data-testid": h,
		"data-collapsed": c,
		className: o("flex h-full min-h-0 shrink-0 flex-col border-r border-border bg-surface-panel", c ? "w-9" : s === "sm" ? "w-[240px]" : "w-[300px]", m),
		children: [
			(e || n || d) && /* @__PURE__ */ Q("div", {
				className: o("flex h-9 shrink-0 items-center gap-1 border-b border-border", c ? "justify-center" : "pl-3.5 pr-1.5"),
				"data-testid": `${h}-header`,
				children: [
					!c && (e ? /* @__PURE__ */ Z("h2", {
						className: "m-0 min-w-0 flex-1 truncate text-[12px] font-semibold text-text-primary",
						"data-testid": `${h}-title`,
						children: e
					}) : /* @__PURE__ */ Z("span", { className: "flex-1" })),
					!c && n,
					d && /* @__PURE__ */ Z(l, {
						size: "sm",
						variant: "ghost",
						"aria-label": g,
						title: g,
						"aria-expanded": !c,
						onClick: d,
						icon: /* @__PURE__ */ Z(y, {
							dir: c ? "right" : "left",
							size: 14
						}),
						"data-testid": p ?? `${h}-${c ? "unfold" : "fold"}`
					})
				]
			}),
			!c && r && /* @__PURE__ */ Z("div", {
				className: "shrink-0 px-3.5 py-3",
				children: r
			}),
			/* @__PURE__ */ Z("div", {
				className: "min-h-0 flex-1 overflow-y-auto overflow-x-hidden",
				"data-testid": `${h}-scroll`,
				children: c ? u : a
			}),
			!c && i && /* @__PURE__ */ Z("div", {
				className: "shrink-0 border-t border-border px-3.5 py-2",
				children: i
			})
		]
	});
}
//#endregion
//#region src/components/social/SocialPanel.tsx
function _e(e, t) {
	return {
		id: e.userId,
		displayName: e.displayName,
		bio: "",
		avatarUrl: e.avatarUrl ?? null,
		visibility: e.visibility,
		followState: t
	};
}
function ve(e) {
	return {
		id: e.userId,
		displayName: e.displayName,
		bio: e.bio ?? "",
		avatarUrl: e.avatarUrl ?? null,
		visibility: e.visibility
	};
}
function ye({ user: e, size: t }) {
	let n = e.displayName.slice(0, 2).toUpperCase();
	return e.avatarUrl ? /* @__PURE__ */ Z("div", {
		className: o("rounded-full bg-border flex items-center justify-center font-semibold text-text-primary shrink-0 overflow-hidden", t === 48 ? "w-12 h-12 text-base" : "w-8 h-8 text-xs"),
		children: /* @__PURE__ */ Z("img", {
			src: e.avatarUrl,
			alt: `${e.displayName}'s avatar`,
			className: "w-full h-full object-cover"
		})
	}) : /* @__PURE__ */ Z("div", {
		className: o("rounded-full bg-border flex items-center justify-center font-semibold text-text-primary shrink-0 overflow-hidden", t === 48 ? "w-12 h-12 text-base" : "w-8 h-8 text-xs"),
		"aria-label": `Avatar placeholder for ${e.displayName}`,
		children: n
	});
}
function be({ targetUser: e, followState: t, compact: n = !1, onFollowChange: r }) {
	let [i, a] = Y(!1);
	return t === "not-following" ? /* @__PURE__ */ Z("button", {
		className: o("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border-none font-[system-ui,-apple-system,sans-serif] bg-primary text-white font-semibold", n ? "h-7" : "h-9"),
		onClick: () => {
			r(e.id, "pending");
		},
		"aria-label": `Follow ${e.displayName}`,
		children: "Follow"
	}) : t === "pending" ? /* @__PURE__ */ Z("button", {
		className: o("rounded-lg text-sm min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface-hover text-text-secondary font-normal cursor-default", n ? "h-7" : "h-9"),
		disabled: !0,
		"aria-label": `Follow ${e.displayName}`,
		children: "Following…"
	}) : /* @__PURE__ */ Q("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ Z("button", {
			className: o("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface text-text-primary font-normal", n ? "h-7" : "h-9"),
			onClick: () => a(!0),
			"aria-label": `Unfollow ${e.displayName}`,
			children: "Following"
		}), i && /* @__PURE__ */ Q("div", {
			role: "group",
			"aria-label": "Confirm unfollow",
			className: "flex gap-2 items-center",
			children: [
				/* @__PURE__ */ Q("span", {
					className: "text-sm text-text-primary mr-1",
					children: [
						"Unfollow ",
						e.displayName,
						"?"
					]
				}),
				/* @__PURE__ */ Z("button", {
					onClick: () => a(!1),
					className: "h-9 rounded-lg text-sm px-3 bg-surface text-text-primary border border-border cursor-pointer font-[system-ui,-apple-system,sans-serif]",
					children: "Keep Following"
				}),
				/* @__PURE__ */ Z("button", {
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
function xe({ user: e, isOwnProfile: t, onSave: n }) {
	let [r, i] = Y(!1), [a, s] = Y(e.displayName), [c, l] = Y(e.bio), [u, d] = Y(e.avatarUrl ?? ""), [f, p] = Y(e.visibility), [m, h] = Y(!1), [g, _] = Y(null), v = me();
	K(() => {
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
	return r ? /* @__PURE__ */ Q("div", { children: [
		/* @__PURE__ */ Q("div", {
			className: "mb-3",
			children: [/* @__PURE__ */ Z("label", {
				htmlFor: `${v}-display-name`,
				className: "text-sm text-text-primary block mb-1",
				children: "Display name"
			}), /* @__PURE__ */ Z(k, {
				id: `${v}-display-name`,
				value: a,
				onChange: (e) => s(e.target.value.slice(0, 50)),
				placeholder: "Your name",
				maxLength: 50
			})]
		}),
		/* @__PURE__ */ Q("div", {
			className: "mb-3",
			children: [/* @__PURE__ */ Z("label", {
				htmlFor: `${v}-bio`,
				className: "text-sm text-text-primary block mb-1",
				children: "Bio"
			}), /* @__PURE__ */ Z(A, {
				id: `${v}-bio`,
				value: c,
				onChange: (e) => l(e.target.value.slice(0, 160)),
				placeholder: "Tell people a bit about yourself (max 160 characters)",
				maxLength: 160,
				rows: 3,
				className: "resize-y"
			})]
		}),
		/* @__PURE__ */ Q("div", {
			className: "mb-4",
			children: [/* @__PURE__ */ Z("label", {
				htmlFor: `${v}-avatar-url`,
				className: "text-sm text-text-primary block mb-1",
				children: "Avatar URL"
			}), /* @__PURE__ */ Z(k, {
				id: `${v}-avatar-url`,
				value: u,
				onChange: (e) => d(e.target.value),
				placeholder: "https://example.com/avatar.png"
			})]
		}),
		/* @__PURE__ */ Z("div", {
			className: "mb-4",
			children: /* @__PURE__ */ Z("div", {
				role: "radiogroup",
				"aria-label": "Profile visibility",
				onKeyDown: (e) => ce(e, { itemSelector: "[role=\"radio\"]" }),
				className: "flex gap-2",
				children: ["public", "private"].map((e) => /* @__PURE__ */ Z("button", {
					type: "button",
					role: "radio",
					"aria-checked": f === e,
					tabIndex: f === e ? 0 : -1,
					onClick: () => p(e),
					className: o("px-4 py-1 rounded-full text-sm cursor-pointer border border-border font-[system-ui,-apple-system,sans-serif]", f === e ? "bg-primary text-white" : "bg-surface text-text-primary"),
					children: e.charAt(0).toUpperCase() + e.slice(1)
				}, e))
			})
		}),
		/* @__PURE__ */ Q("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ Z("button", {
				onClick: () => {
					y();
				},
				disabled: m,
				className: o("flex-1 h-9 bg-primary text-white border-none rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", m ? "cursor-default" : "cursor-pointer"),
				children: m ? "Saving…" : "Save Changes"
			}), /* @__PURE__ */ Z("button", {
				onClick: () => i(!1),
				className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Discard Changes"
			})]
		}),
		g && /* @__PURE__ */ Z("div", {
			role: "alert",
			"data-testid": "profile-save-error",
			className: "text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
			children: g
		})
	] }) : /* @__PURE__ */ Q("div", { children: [
		/* @__PURE__ */ Q("div", {
			className: "flex items-start gap-3 mb-3",
			children: [/* @__PURE__ */ Z(ye, {
				user: e,
				size: 48
			}), /* @__PURE__ */ Q("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ Q("div", {
					className: "flex items-center gap-2 mb-1",
					children: [/* @__PURE__ */ Z("span", {
						className: "text-xl font-semibold text-text-primary",
						children: e.displayName
					}), /* @__PURE__ */ Z("span", {
						className: o("text-xs px-2 py-0.5 rounded", e.visibility === "public" ? "bg-success-bg text-success" : "bg-surface-hover text-text-secondary"),
						children: e.visibility === "public" ? "Public" : "Private"
					})]
				}), /* @__PURE__ */ Z("p", {
					className: "text-base text-text-primary m-0 overflow-hidden line-clamp-3",
					children: e.bio
				})]
			})]
		}),
		/* @__PURE__ */ Q("div", {
			className: "flex gap-4 text-sm text-text-secondary mb-3",
			children: [
				/* @__PURE__ */ Q("span", { children: [/* @__PURE__ */ Z("strong", {
					className: "text-text-primary",
					children: e.followersCount ?? "—"
				}), " Followers"] }),
				/* @__PURE__ */ Q("span", { children: [/* @__PURE__ */ Z("strong", {
					className: "text-text-primary",
					children: e.followingCount ?? "—"
				}), " Following"] }),
				/* @__PURE__ */ Q("span", { children: [/* @__PURE__ */ Z("strong", {
					className: "text-text-primary",
					children: e.friendsCount ?? "—"
				}), " Friends"] })
			]
		}),
		t && /* @__PURE__ */ Z("button", {
			onClick: () => i(!0),
			className: "text-sm text-primary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
			children: "Edit profile"
		})
	] });
}
function Se({ followers: e, following: t, friends: n, followStates: r, onFollowChange: i, loadError: a }) {
	let [s, c] = Y("followers"), l = (e) => a ? "" : ` (${e.length})`, u = [
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
	return /* @__PURE__ */ Q("div", {
		className: "mt-4",
		children: [/* @__PURE__ */ Z("div", {
			role: "tablist",
			"aria-label": "Connections",
			onKeyDown: ce,
			className: "flex border-b border-border mb-3",
			children: u.map((e) => /* @__PURE__ */ Z("button", {
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
		}), /* @__PURE__ */ Z("div", {
			role: "tabpanel",
			id: "social-tabpanel",
			"aria-labelledby": `social-tab-${s}`,
			className: "min-h-[120px]",
			children: a && f.length === 0 ? /* @__PURE__ */ Q("div", {
				role: "alert",
				"data-testid": "social-graph-error",
				className: "py-6 text-center",
				children: [/* @__PURE__ */ Z("div", {
					className: "text-sm font-semibold text-danger-fg mb-1",
					children: "Couldn’t load your connections"
				}), /* @__PURE__ */ Z("div", {
					className: "text-sm text-text-tertiary",
					children: a
				})]
			}) : f.length === 0 ? /* @__PURE__ */ Q("div", {
				className: "py-6 text-center",
				children: [/* @__PURE__ */ Z("div", {
					className: "text-sm font-semibold text-text-primary mb-1",
					children: d[s].heading
				}), /* @__PURE__ */ Z("div", {
					className: "text-sm text-text-tertiary",
					children: d[s].body
				})]
			}) : /* @__PURE__ */ Z("div", { children: f.map((e) => /* @__PURE__ */ Q("div", {
				className: "flex items-center gap-2 h-14 border-b border-surface-hover",
				children: [
					/* @__PURE__ */ Z(ye, {
						user: e,
						size: 32
					}),
					/* @__PURE__ */ Q("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ Z("div", {
							className: "text-base text-text-primary",
							children: e.displayName
						}), /* @__PURE__ */ Z("div", {
							className: "text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap max-w-[240px]",
							children: e.visibility === "private" ? /* @__PURE__ */ Z("em", {
								className: "text-text-tertiary",
								children: "This profile is private."
							}) : e.bio
						})]
					}),
					/* @__PURE__ */ Z(be, {
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
function Ce({ idToken: t, onMessage: n }) {
	let { profile: r, loading: i, error: o, updateProfile: s } = a({ idToken: t }), { followers: c, following: l, friends: u, follow: d, unfollow: f, error: p, loadError: m } = e({ idToken: t }), h = new Set(l.map((e) => e.userId)), g = {};
	[
		...c,
		...l,
		...u
	].forEach((e) => {
		g[e.userId] = h.has(e.userId) ? "following" : "not-following";
	});
	let [_, v] = Y(null), y = async (e, t) => {
		v(null);
		try {
			t === "following" || t === "pending" ? await d(e) : await f(e);
		} catch (e) {
			v(e instanceof Error ? e.message : "Follow action failed");
		}
	}, b = c.map((e) => _e(e, g[e.userId] ?? "not-following")), x = l.map((e) => _e(e, "following")), S = u.map((e) => _e(e, "following")), C = r ? {
		...ve(r),
		followersCount: m ? void 0 : c.length,
		followingCount: m ? void 0 : l.length,
		friendsCount: m ? void 0 : u.length
	} : null;
	return /* @__PURE__ */ Q("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ Z("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
				children: "Social Profile"
			}),
			i && !C ? /* @__PURE__ */ Z("div", {
				className: "py-10 text-center text-text-tertiary text-sm",
				children: "Loading profile…"
			}) : C ? /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z(xe, {
				user: C,
				isOwnProfile: !0,
				onSave: s
			}), /* @__PURE__ */ Z(Se, {
				followers: b,
				following: x,
				friends: S,
				followStates: g,
				onFollowChange: y,
				loadError: m
			})] }) : null,
			(_ ?? o ?? p) && /* @__PURE__ */ Z("div", {
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
function we(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64);
}
function Te({ people: e, onStartDm: t, onCreateChannel: n, onCancel: r, peopleError: i = null, busy: a = !1, className: s, "data-testid": c = "new-conversation" }) {
	let [l, u] = Y(""), d = J(null), f = q(() => {
		let t = l.trim().toLowerCase();
		return t ? e.filter((e) => e.displayName.toLowerCase().includes(t)) : e;
	}, [e, l]), p = we(l), m = !!n && p.length > 0;
	return /* @__PURE__ */ Q("div", {
		"data-testid": c,
		className: o("flex flex-col gap-1 rounded-lg border border-border bg-surface p-2", s),
		children: [/* @__PURE__ */ Q("div", {
			className: "flex items-center gap-1.5",
			children: [/* @__PURE__ */ Z(k, {
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
			}), r && /* @__PURE__ */ Z("button", {
				type: "button",
				onClick: r,
				disabled: a,
				"data-testid": `${c}-cancel`,
				className: "rounded px-2 py-1 text-xs text-text-secondary hover:bg-surface-hover",
				children: "Cancel"
			})]
		}), i ? /* @__PURE__ */ Q("p", {
			role: "alert",
			"data-testid": `${c}-error`,
			className: "m-0 px-1 py-1.5 text-xs text-danger-fg",
			children: ["Couldn’t load people. ", i]
		}) : /* @__PURE__ */ Q("ul", {
			className: "m-0 flex max-h-64 list-none flex-col gap-0.5 overflow-y-auto p-0",
			children: [
				f.map((e) => /* @__PURE__ */ Z("li", { children: /* @__PURE__ */ Q("button", {
					type: "button",
					onClick: () => void t(e.userId),
					disabled: a,
					"data-testid": `${c}-person`,
					className: "flex w-full items-center gap-2 rounded px-1.5 py-1.5 text-left hover:bg-surface-hover",
					children: [/* @__PURE__ */ Z(M, {
						name: e.displayName,
						src: e.avatarUrl,
						color: e.color,
						size: 26
					}), /* @__PURE__ */ Q("span", {
						className: "flex min-w-0 flex-col",
						children: [/* @__PURE__ */ Z("span", {
							className: "truncate text-[13px] text-text-primary",
							children: e.displayName
						}), e.hint && /* @__PURE__ */ Z("span", {
							className: "truncate text-[11px] text-text-tertiary",
							children: e.hint
						})]
					})]
				}) }, e.userId)),
				f.length === 0 && !m && /* @__PURE__ */ Z("li", {
					className: "px-1.5 py-2 text-xs text-text-secondary",
					"data-testid": `${c}-empty`,
					children: l.trim() ? "Nobody by that name." : "Nobody to talk to yet."
				}),
				m && /* @__PURE__ */ Z("li", { children: /* @__PURE__ */ Q("button", {
					type: "button",
					onClick: () => void n?.(p),
					disabled: a,
					"data-testid": `${c}-create-channel`,
					className: "flex w-full items-center gap-2 rounded px-1.5 py-1.5 text-left hover:bg-surface-hover",
					children: [/* @__PURE__ */ Z("span", {
						"aria-hidden": !0,
						className: "grid h-[26px] w-[26px] shrink-0 place-items-center rounded-lg bg-surface-inset text-sm text-text-secondary",
						children: "#"
					}), /* @__PURE__ */ Q("span", {
						className: "min-w-0 truncate text-[13px] text-text-primary",
						children: ["Create channel ", /* @__PURE__ */ Q("span", {
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
//#region src/components/social/RailSectionHeader.tsx
function Ee({ label: e, actions: t = [], presentational: n = !0, collapsed: r = !1, onToggleCollapse: i, controls: a, toggleId: s, collapsedCount: c = 0, dark: l = !1, className: d, "data-testid": f = "rail-section-header" }) {
	let p = i !== void 0, m = o("min-w-0 flex-1 truncate text-[11px] font-semibold uppercase tracking-wide", l ? "text-white/40" : "text-text-tertiary");
	return /* @__PURE__ */ Q("div", {
		"data-testid": f,
		className: o("flex items-center gap-1 px-2 pb-1 pt-3", d),
		children: [p ? /* @__PURE__ */ Q("button", {
			type: "button",
			id: s,
			"aria-expanded": !r,
			"aria-controls": a,
			onClick: () => i(!r),
			"data-testid": `${f}-toggle`,
			className: o("flex min-w-0 flex-1 cursor-pointer items-center gap-1 rounded border-none bg-transparent p-0 text-left", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", l ? "hover:text-white" : "hover:text-text-primary"),
			children: [
				/* @__PURE__ */ Z(y, {
					dir: r ? "right" : "down",
					size: 12,
					className: o("shrink-0", l ? "text-white/40" : "text-text-tertiary")
				}),
				/* @__PURE__ */ Z("span", {
					className: m,
					children: e
				}),
				r && c > 0 && /* @__PURE__ */ Q(X, { children: [" ", /* @__PURE__ */ Z("span", {
					"aria-label": `${c} unread`,
					"data-testid": `${f}-collapsed-count`,
					className: o("grid h-4 min-w-4 shrink-0 place-items-center rounded-full px-1 text-[10px] font-semibold leading-none", l ? "bg-white/15 text-white" : "bg-primary text-white"),
					children: c > 99 ? "99+" : c
				})] })
			]
		}) : /* @__PURE__ */ Z("span", {
			"aria-hidden": n || void 0,
			className: m,
			children: e
		}), t.map((e) => /* @__PURE__ */ Z("button", {
			type: "button",
			title: e.label,
			"aria-label": e.label,
			onClick: (t) => {
				r && i?.(!1), e.onClick(t.currentTarget);
			},
			"data-testid": e["data-testid"],
			className: o("grid h-5 w-5 shrink-0 cursor-pointer place-items-center rounded border-none bg-transparent p-0", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", l ? "text-white/50 hover:bg-white/10 hover:text-white" : "text-text-tertiary hover:bg-surface-hover hover:text-text-primary"),
			children: e.icon ?? /* @__PURE__ */ Z(u, { size: 13 })
		}, e.label))]
	});
}
//#endregion
//#region src/components/social/ConversationList.tsx
function De(e, t) {
	let n = e.lastMessageAt ? Date.parse(e.lastMessageAt) : NaN, r = t.lastMessageAt ? Date.parse(t.lastMessageAt) : NaN, i = Number.isNaN(n) ? null : n, a = Number.isNaN(r) ? null : r;
	return i === null && a === null ? 0 : i === null ? 1 : a === null ? -1 : a - i;
}
function Oe({ items: e, grouped: t = !1, sectionOrder: n = "channels-first", sectionActions: r, collapsedSections: i, onToggleSection: a, onStartCall: s, sortByRecency: c = !0, maxVisible: l, activeChannel: u, onSelect: p, onNewChat: m, emptyLabel: h = "No conversations yet", onTogglePin: y, onToggleMute: b, onMarkUnread: x, onRename: C, canRename: w, onSetSection: T, tone: E = "light", className: D, "data-testid": O }) {
	let k = E === "dark", A = O ?? "conversation", P = a !== void 0, F = me(), I = (e, t) => `${F}${e.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${t}`, L = c ? [...e].sort(De) : e, R = [], z = L.filter((e) => e.pinned), B = z.length > 0 ? L.filter((e) => !e.pinned) : L;
	z.length > 0 && R.push({
		heading: "Pinned",
		label: "Pinned",
		items: z
	});
	let V = (e) => (e.section ?? "").trim(), te = B.filter((e) => V(e) !== ""), H = te.length > 0 ? B.filter((e) => V(e) === "") : B;
	if (te.length > 0) {
		let e = /* @__PURE__ */ new Map();
		for (let t of te) {
			let n = V(t), r = e.get(n);
			r ? r.push(t) : e.set(n, [t]);
		}
		for (let t of [...e.keys()].sort((e, t) => e.localeCompare(t))) R.push({
			heading: t,
			label: t,
			items: e.get(t)
		});
	}
	if (t) {
		let e = (e) => (e.kind ?? (e.peers.length > 1 ? "group" : "dm")) === "channel", t = H.filter(e), r = H.filter((t) => !e(t)), i = {
			heading: "Channels",
			label: "Channels",
			items: t
		}, a = {
			heading: "Direct messages",
			label: "Direct messages",
			items: r
		}, o = n === "dms-first" ? [a, i] : [i, a];
		for (let e of o) e.items.length > 0 && R.push(e);
	} else H.length > 0 && R.push({
		label: "Conversations",
		items: H
	});
	let [ne, re] = Y(() => /* @__PURE__ */ new Set()), ie = R.map((e) => {
		let t = P && e.heading !== void 0, n = t && i?.[e.label] === !0, r = l !== void 0 && l >= 0 && e.items.length > l, a = {
			...e,
			collapsible: t,
			collapsed: n,
			capped: r
		};
		if (!r || ne.has(e.label)) return {
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
	}), oe = (e) => re((t) => {
		let n = new Set(t);
		return n.has(e) ? n.delete(e) : n.add(e), n;
	}), U = ie.flatMap((e) => e.collapsed ? [] : e.shown), ce = J(null), [le, ue] = Y(null), de = (le && U.some((e) => e.channel === le) ? le : null) ?? (u && U.some((e) => e.channel === u) ? u : null) ?? U[0]?.channel ?? null, fe = J(null);
	K(() => {
		let e = fe.current;
		if (!e) return;
		fe.current = null;
		let t = ce.current?.querySelector(`[data-testid="conversation-row"][data-channel="${CSS.escape(e)}"]`);
		t?.focus(), t?.scrollIntoView({ block: "nearest" });
	});
	function W(e) {
		let t = Math.max(0, Math.min(U.length - 1, e)), n = U[t];
		!n || n.channel === de || (fe.current = n.channel, ue(n.channel));
	}
	function G(e) {
		if (U.length === 0) return;
		let t = U.findIndex((e) => e.channel === de), n = t < 0 ? 0 : t;
		switch (e.key) {
			case "ArrowDown":
				W(n + 1);
				break;
			case "ArrowUp":
				W(n - 1);
				break;
			case "Home":
				W(0);
				break;
			case "End":
				W(U.length - 1);
				break;
			default: return;
		}
		e.preventDefault();
	}
	return /* @__PURE__ */ Q("div", {
		className: o("flex min-h-0 flex-col gap-1", D),
		"data-testid": O,
		children: [m && /* @__PURE__ */ Q("button", {
			type: "button",
			onClick: m,
			"data-testid": "conversation-new-chat",
			className: o("flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] font-medium", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", k ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"),
			children: [/* @__PURE__ */ Z("span", {
				"aria-hidden": "true",
				className: o("grid h-6 w-6 place-items-center rounded-full border border-dashed text-sm leading-none", k ? "border-white/30" : "border-border"),
				children: "+"
			}), "New chat"]
		}), e.length === 0 ? /* @__PURE__ */ Z("p", {
			className: o("m-0 px-2 py-1.5 text-[13px]", k ? "text-white/60" : "text-text-secondary"),
			"data-testid": "conversation-empty",
			children: h
		}) : /* @__PURE__ */ Z("div", {
			ref: ce,
			onKeyDown: G,
			className: "m-0 flex min-h-0 flex-col overflow-y-auto p-0",
			children: ie.map((e) => {
				let t = I(e.label, "content"), n = I(e.label, "toggle"), i = e.collapsed ? null : /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z("ul", {
					className: "m-0 flex list-none flex-col gap-0.5 p-0",
					"aria-label": e.collapsible ? void 0 : e.label,
					"aria-labelledby": e.collapsible ? n : void 0,
					children: e.shown.map((e) => {
						let t = e.channel === u, n = e.channel === de, r = e.kind ?? (e.peers.length > 1 ? "group" : "dm"), i = r === "channel", a = r === "group", c = e.peers[0], l = i ? e.name ?? e.channel : e.peers.map((e) => e.displayName).join(", "), m = e.lastMessageAt ? ae(e.lastMessageAt) : "", h = e.lastMessageAt ? se(e.lastMessageAt) : "", E = e.unreadCount ?? 0, D = !!e.mentioned, O = !!e.live, P = !!e.muted, F = `${A}-row-menu-${e.channel}`, I = [];
						return s && (I.push({
							label: "Call",
							icon: /* @__PURE__ */ Z(S, { size: 14 }),
							onSelect: () => s(e.channel, "audio"),
							"data-testid": `${F}-call`
						}), I.push({
							label: "Video call",
							icon: /* @__PURE__ */ Z(d, { size: 14 }),
							onSelect: () => s(e.channel, "video"),
							"data-testid": `${F}-video-call`
						})), y && I.push({
							label: e.pinned ? "Unpin" : "Pin",
							icon: /* @__PURE__ */ Z(f, { size: 14 }),
							onSelect: () => y(e.channel, !e.pinned),
							"data-testid": `${F}-pin`
						}), b && I.push({
							label: P ? "Unmute" : "Mute",
							icon: /* @__PURE__ */ Z(v, { size: 14 }),
							onSelect: () => b(e.channel, !P),
							"data-testid": `${F}-mute`
						}), C && (!w || w(e)) && I.push({
							label: "Rename",
							icon: /* @__PURE__ */ Z(g, { size: 14 }),
							onSelect: () => C(e.channel),
							"data-testid": `${F}-rename`
						}), T && I.push({
							label: V(e) ? `Move from ${V(e)}\u2026` : "Move to section…",
							icon: /* @__PURE__ */ Z(_, { size: 14 }),
							onSelect: () => T(e.channel),
							"data-testid": `${F}-section`
						}), x && E === 0 && I.push({
							label: "Mark as unread",
							onSelect: () => x(e.channel),
							"data-testid": `${F}-unread`
						}), /* @__PURE__ */ Q("li", {
							className: o("relative", I.length > 0 && "group"),
							children: [/* @__PURE__ */ Q("button", {
								type: "button",
								onClick: () => p(e.channel),
								onFocus: () => ue(e.channel),
								"data-testid": "conversation-row",
								"data-channel": e.channel,
								"data-active": t ? "true" : "false",
								"aria-current": t ? "true" : void 0,
								tabIndex: n ? 0 : -1,
								className: o("flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-left", I.length > 0 && "pr-8", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", k ? "hover:bg-white/10" : "hover:bg-surface-hover", t && (k ? "bg-white/10" : "bg-surface-hover")),
								children: [
									i ? /* @__PURE__ */ Z("span", {
										"aria-hidden": "true",
										"data-testid": "conversation-channel-glyph",
										className: o("grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[15px] font-semibold leading-none", k ? "bg-white/10 text-white/70" : "bg-surface-inset text-text-secondary"),
										children: "#"
									}) : a ? /* @__PURE__ */ Z(j, {
										size: 28,
										maxVisible: 2,
										items: e.peers.map((e) => ({
											name: e.displayName,
											color: e.color,
											src: e.avatarUrl
										}))
									}) : c ? /* @__PURE__ */ Q("span", {
										className: "relative inline-flex shrink-0",
										children: [/* @__PURE__ */ Z(M, {
											name: c.displayName,
											color: c.color,
											src: c.avatarUrl,
											size: 28
										}), c.online !== void 0 && /* @__PURE__ */ Z(N, {
											state: c.online ? "online" : "offline",
											pulse: !1,
											className: o("absolute -bottom-0.5 -right-0.5 rounded-full ring-2", k ? "ring-call-chrome" : "ring-surface")
										})]
									}) : null,
									/* @__PURE__ */ Q("span", {
										className: "flex min-w-0 flex-1 flex-col",
										children: [/* @__PURE__ */ Q("span", {
											className: "flex items-baseline gap-2",
											children: [
												/* @__PURE__ */ Z("span", {
													className: o("min-w-0 flex-1 truncate text-[13px]", E > 0 ? "font-semibold" : "font-medium", k ? "text-white" : "text-text-primary"),
													children: l
												}),
												e.pinned && /* @__PURE__ */ Z("span", {
													"data-testid": `${A}-pinned`,
													title: "Pinned",
													className: o("shrink-0", k ? "text-white/50" : "text-text-tertiary"),
													children: /* @__PURE__ */ Z(f, { size: 12 })
												}),
												P && /* @__PURE__ */ Z("span", {
													"data-testid": `${A}-muted`,
													title: "Muted",
													className: o("shrink-0", k ? "text-white/50" : "text-text-tertiary"),
													children: /* @__PURE__ */ Z(v, { size: 12 })
												}),
												m && /* @__PURE__ */ Z("time", {
													dateTime: e.lastMessageAt,
													title: h,
													className: o("shrink-0 text-[11px] tabular-nums", k ? "text-white/50" : "text-text-tertiary"),
													"data-testid": "conversation-time",
													children: m
												})
											]
										}), e.lastMessagePreview && /* @__PURE__ */ Z("span", {
											className: o("truncate text-[12px]", k ? "text-white/60" : "text-text-secondary"),
											"data-testid": "conversation-preview",
											children: e.lastMessagePreview
										})]
									}),
									O && /* @__PURE__ */ Q("span", {
										"data-testid": "conversation-live",
										"aria-label": "Call in progress",
										title: "Call in progress",
										className: "inline-flex shrink-0 items-center gap-1 rounded-full bg-danger px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none tracking-wide text-white",
										children: [/* @__PURE__ */ Z("span", {
											"aria-hidden": !0,
											className: "h-1.5 w-1.5 rounded-full bg-white"
										}), "Live"]
									}),
									D && /* @__PURE__ */ Z("span", {
										"data-testid": "conversation-mention",
										"aria-label": "You were mentioned",
										title: "You were mentioned",
										className: "grid h-5 w-5 shrink-0 place-items-center rounded-full bg-danger text-[11px] font-bold leading-none text-white",
										children: "@"
									}),
									E > 0 && /* @__PURE__ */ Z("span", {
										"data-testid": "conversation-unread",
										"data-muted": P ? "true" : "false",
										className: o("grid h-5 min-w-5 shrink-0 place-items-center rounded-full px-1.5 text-[11px] font-semibold leading-none", P ? k ? "bg-white/15 text-white/70" : "bg-surface-inset text-text-secondary" : "bg-primary text-white"),
										children: E > 99 ? "99+" : E
									})
								]
							}), I.length > 0 && /* @__PURE__ */ Z("span", {
								className: o("absolute right-1 top-1/2 -translate-y-1/2 opacity-0 transition-opacity", "group-hover:opacity-100 group-focus-within:opacity-100", "has-[[aria-expanded=true]]:opacity-100", "[@media(hover:none)]:opacity-100"),
								children: /* @__PURE__ */ Z(ee, {
									trigger: /* @__PURE__ */ Z("span", {
										"aria-hidden": !0,
										className: "leading-none tracking-wide",
										children: "⋯"
									}),
									triggerLabel: `More options for ${l}`,
									triggerTitle: "More options",
									triggerTabIndex: n ? 0 : -1,
									triggerTestId: F,
									triggerClassName: o("h-6 w-6 rounded-md border-0 p-0 text-[13px]", k ? "text-white/70 hover:bg-white/15" : "text-text-secondary hover:bg-surface-hover"),
									align: "end",
									sections: [{ items: I }],
									"data-testid": `${F}-panel`
								})
							})]
						}, e.channel);
					})
				}), e.capped && /* @__PURE__ */ Z("button", {
					type: "button",
					onClick: () => oe(e.label),
					"aria-expanded": e.hidden === 0,
					"data-testid": "conversation-show-more",
					className: o("mt-0.5 flex w-full cursor-pointer items-center rounded-lg px-2 py-1 text-left text-[12px] font-medium", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", k ? "text-white/60 hover:bg-white/10 hover:text-white" : "text-text-tertiary hover:bg-surface-hover hover:text-text-primary"),
					children: e.hidden > 0 ? `Show ${e.hidden} more` : "Show less"
				})] });
				return /* @__PURE__ */ Q("div", { children: [e.heading && /* @__PURE__ */ Z(Ee, {
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
				}), e.collapsible ? /* @__PURE__ */ Z("div", {
					id: t,
					children: i
				}) : i] }, e.label);
			})
		})]
	});
}
//#endregion
//#region src/components/social/ChatRoom.tsx
var ke = [
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
function Ae(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) >>> 0;
	return ke[t % ke.length];
}
function je(e) {
	let t = e.split(/[\s._@-]/);
	return t.length >= 2 ? (t[0][0] + t[1][0]).toUpperCase() : e.slice(0, 2).toUpperCase();
}
function Me(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : new Date(e).toLocaleDateString();
}
function Ne(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function Pe({ post: e, isOwn: t, showSender: n }) {
	let r = Ae(e.authorId);
	return /* @__PURE__ */ Q("div", {
		className: o("flex items-end gap-2", t ? "flex-row-reverse" : "flex-row", n ? "pt-2 px-4 pb-0.5" : "py-px px-4"),
		children: [/* @__PURE__ */ Z("div", {
			className: "w-8 shrink-0 self-end",
			children: !t && n && /* @__PURE__ */ Z("div", {
				className: "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white select-none",
				style: { background: r },
				children: je(e.authorId)
			})
		}), /* @__PURE__ */ Q("div", {
			className: o("max-w-[68%] flex flex-col gap-0.5", t ? "items-end" : "items-start"),
			children: [
				!t && n && /* @__PURE__ */ Z("span", {
					className: "text-[11px] font-semibold pl-1",
					style: { color: r },
					children: e.authorId
				}),
				/* @__PURE__ */ Z("div", {
					className: o("px-3.5 py-2 text-sm leading-relaxed break-words transition-opacity duration-200", t ? "bg-primary text-white rounded-[18px_18px_4px_18px]" : "bg-surface-hover text-text-primary rounded-[4px_18px_18px_18px]", e._fadeIn ? "opacity-0" : "opacity-100"),
					children: e.content
				}),
				n && /* @__PURE__ */ Z("span", {
					className: "text-[10px] text-text-tertiary px-1",
					children: Me(e.createdAt)
				})
			]
		})]
	});
}
function Fe({ idToken: e, roomId: t, roomName: r, onMessage: i }) {
	let { posts: a, createPost: s, loading: c, hasMore: l, loadMore: u, error: d, loadError: f } = n({
		idToken: e,
		roomId: t,
		onMessage: i
	}), [p, m] = Y(""), [h, g] = Y(!1), [_, v] = Y(null), y = J(null), b = Ne(e), x = [...a].reverse(), S = a[0]?.postId;
	K(() => {
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
	return /* @__PURE__ */ Q("div", {
		className: "flex flex-col h-full bg-surface rounded-lg border border-border overflow-hidden",
		children: [
			/* @__PURE__ */ Z("div", {
				className: "flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface shrink-0",
				children: /* @__PURE__ */ Q("span", {
					className: "text-[15px] font-semibold text-text-primary",
					children: ["# ", r]
				})
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex-1 overflow-y-auto flex flex-col pb-1",
				children: [
					l && /* @__PURE__ */ Z("div", {
						className: "text-center py-2",
						children: /* @__PURE__ */ Z("button", {
							onClick: () => void u(),
							disabled: c,
							className: o("text-xs text-text-secondary bg-transparent border border-border rounded-full px-3.5 py-0.5 font-[inherit]", c ? "cursor-default" : "cursor-pointer"),
							children: c ? "Loading…" : "Load earlier"
						})
					}),
					c && x.length === 0 ? /* @__PURE__ */ Z("div", {
						className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px]",
						children: "Loading messages…"
					}) : f && x.length === 0 ? /* @__PURE__ */ Q("div", {
						role: "alert",
						className: "flex-1 flex flex-col items-center justify-center gap-1.5 px-6 text-center",
						children: [
							/* @__PURE__ */ Z("span", {
								className: "text-[28px]",
								children: "⚠️"
							}),
							/* @__PURE__ */ Z("span", {
								className: "text-sm font-semibold text-danger-fg",
								children: "Couldn’t load messages"
							}),
							/* @__PURE__ */ Z("span", {
								className: "text-[13px] text-text-tertiary",
								children: f
							})
						]
					}) : x.length === 0 ? /* @__PURE__ */ Q("div", {
						className: "flex-1 flex flex-col items-center justify-center text-text-tertiary gap-1.5",
						children: [
							/* @__PURE__ */ Z("span", {
								className: "text-[28px]",
								children: "💬"
							}),
							/* @__PURE__ */ Z("span", {
								className: "text-sm font-semibold text-text-primary",
								children: "No messages yet"
							}),
							/* @__PURE__ */ Z("span", {
								className: "text-[13px]",
								children: "Be the first to say something!"
							})
						]
					}) : x.map((e, t) => {
						let n = e.authorId === b, r = x[t - 1], i = !r || r.authorId !== e.authorId || new Date(e.createdAt).getTime() - new Date(r.createdAt).getTime() > 3e5;
						return /* @__PURE__ */ Z(Pe, {
							post: e,
							isOwn: n,
							showSender: i
						}, e.postId);
					}),
					/* @__PURE__ */ Z("div", { ref: y })
				]
			}),
			(d || _) && /* @__PURE__ */ Z("div", {
				className: "px-4 py-1.5 bg-danger-bg border-t border-danger-border text-xs text-danger-fg",
				children: _ ?? d
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex items-center gap-2 px-3 py-2.5 border-t border-border bg-surface shrink-0",
				children: [/* @__PURE__ */ Z(k, {
					value: p,
					onChange: (e) => m(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && !e.shiftKey && (e.preventDefault(), C());
					},
					placeholder: `Message #${r}…`,
					disabled: h,
					className: "flex-1 rounded-[22px] px-4"
				}), /* @__PURE__ */ Z("button", {
					onClick: () => void C(),
					disabled: !p.trim() || h,
					className: o("w-[34px] h-[34px] rounded-full shrink-0 border-none flex items-center justify-center text-base", !p.trim() || h ? "bg-surface-hover text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: "↑"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/social/SocialTabContent.tsx
function Ie({ userId: t, displayName: n, idToken: r, rooms: i, createRoom: a, createDM: s, createGroupRoom: c, roomsLoading: l, roomsError: u, onRoomsRetry: d, handleRoomSelect: f, activeRoomId: p, onMessage: m }) {
	let [h, g] = Y(!0), _ = h ? 240 : 0, [v, y] = Y({}), b = J(p);
	K(() => {
		b.current = p;
	}, [p]);
	let x = G((e) => {
		y((t) => {
			if (!t[e.roomId]) return t;
			let n = { ...t };
			return delete n[e.roomId], n;
		}), f(e);
	}, [f]);
	K(() => m((e) => {
		if (e.type === "social:post") {
			let t = (e.payload ?? e).roomId;
			t && t !== b.current && y((e) => ({
				...e,
				[t]: (e[t] ?? 0) + 1
			}));
		}
	}), [m]);
	let [S, C] = Y(!1), [w, T] = Y(!1), { friends: E, loadError: D } = e({ idToken: r }), O = n ? n.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2) : t.slice(0, 2).toUpperCase(), k = i.find((e) => e.roomId === p) ?? null, A = i.filter((e) => e.type === "standalone" || e.type === "group"), j = i.filter((e) => e.type === "dm"), M = q(() => [...A.map((e) => ({
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
	]), N = G((e) => {
		let t = i.find((t) => t.roomId === e);
		t && x(t);
	}, [i, x]), P = "var(--color-border)", F = "var(--color-text-primary)", I = "var(--color-text-secondary)";
	return /* @__PURE__ */ Q("div", {
		className: "flex overflow-hidden rounded-lg transition-colors duration-200 h-[calc(100vh-120px)]",
		style: {
			background: "var(--color-surface)",
			border: `1px solid ${P}`
		},
		children: [/* @__PURE__ */ Q("div", {
			className: o("shrink-0 flex-col overflow-hidden transition-[width] duration-[180ms]", h ? "flex" : "hidden"),
			style: {
				width: _,
				borderRight: `1px solid ${P}`,
				background: "var(--color-surface-panel)"
			},
			children: [/* @__PURE__ */ Q("div", {
				className: "flex items-center gap-2 shrink-0 px-[14px] pt-[14px] pb-3",
				style: { borderBottom: `1px solid ${P}` },
				children: [
					/* @__PURE__ */ Z("div", {
						className: "w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-[11px] shrink-0 bg-[linear-gradient(135deg,#646cff,#9b59b6)]",
						children: O
					}),
					/* @__PURE__ */ Q("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ Z("div", {
							className: "text-[13px] font-bold overflow-hidden text-ellipsis whitespace-nowrap",
							style: { color: F },
							children: n || t
						}), /* @__PURE__ */ Q("div", {
							className: "text-[11px] flex items-center gap-1",
							style: { color: I },
							children: [/* @__PURE__ */ Z("span", { className: "w-1.5 h-1.5 rounded-full bg-success inline-block" }), "Active"]
						})]
					}),
					/* @__PURE__ */ Z("button", {
						onClick: () => g(!1),
						title: "Collapse sidebar",
						className: "bg-transparent border-none cursor-pointer text-base leading-none px-1 py-0.5 rounded",
						style: { color: I },
						children: "«"
					})
				]
			}), /* @__PURE__ */ Z("div", {
				className: "flex-1 overflow-y-auto pt-2",
				children: /* @__PURE__ */ Q("div", {
					className: "px-1 pt-1",
					children: [l && M.length === 0 ? /* @__PURE__ */ Z("div", {
						className: "px-2 py-2 text-xs",
						style: { color: I },
						children: "Loading…"
					}) : u && M.length === 0 ? /* @__PURE__ */ Z("div", {
						role: "alert",
						"data-testid": "conversations-error",
						className: "px-2 py-2 text-xs text-danger-fg",
						children: "Couldn’t load conversations"
					}) : /* @__PURE__ */ Z(Oe, {
						items: M,
						activeChannel: p ?? null,
						onSelect: N,
						onNewChat: () => C((e) => !e),
						emptyLabel: "No conversations yet",
						"data-testid": "social-conversations"
					}), S && /* @__PURE__ */ Z("div", {
						className: "px-1 pt-1.5",
						children: /* @__PURE__ */ Z(Te, {
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
		}), /* @__PURE__ */ Q("div", {
			className: "flex-1 min-w-0 flex flex-col",
			children: [!h && /* @__PURE__ */ Q("div", {
				className: "flex items-center gap-2 px-3 py-1.5",
				style: { borderBottom: `1px solid ${P}` },
				children: [/* @__PURE__ */ Z("button", {
					onClick: () => g(!0),
					title: "Expand sidebar",
					className: "bg-transparent rounded cursor-pointer text-sm px-2 py-0.5 font-[inherit]",
					style: {
						border: `1px solid ${P}`,
						color: I
					},
					children: "»"
				}), k && /* @__PURE__ */ Q("span", {
					className: "text-[13px] font-semibold",
					style: { color: F },
					children: [
						k.type === "dm" ? "●" : "#",
						" ",
						k.name
					]
				})]
			}), /* @__PURE__ */ Z("div", {
				className: "flex-1 min-h-0",
				children: k ? /* @__PURE__ */ Z(Fe, {
					idToken: r,
					roomId: k.roomId,
					roomName: k.name,
					onMessage: m
				}, k.roomId) : /* @__PURE__ */ Q("div", {
					className: "h-full flex flex-col items-center justify-center gap-2",
					style: { color: I },
					children: [
						/* @__PURE__ */ Z("span", {
							className: "text-4xl",
							children: "💬"
						}),
						/* @__PURE__ */ Z("span", {
							className: "text-[15px] font-semibold",
							style: { color: F },
							children: "Select a room to start chatting"
						}),
						/* @__PURE__ */ Z("span", {
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
function Le({ author: e, avatarUrl: t, mine: n = !1, messages: r, className: i }) {
	return r.length === 0 ? null : /* @__PURE__ */ Z("div", {
		"data-testid": "message-group",
		"data-author": e,
		"data-row-count": r.length,
		className: o("flex flex-col", i),
		children: r.map((r, i) => /* @__PURE__ */ Z(U, {
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
function Re({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = Y(""), [a, s] = Y(null), c = async (t) => {
		if (t.preventDefault(), r.trim()) {
			s(null);
			try {
				await e(r.trim()), i("");
			} catch (e) {
				s(e instanceof Error ? e.message : "Failed to create room");
			}
		}
	};
	return /* @__PURE__ */ Q("form", {
		onSubmit: (e) => {
			c(e);
		},
		className: "my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border",
		children: [
			/* @__PURE__ */ Z(k, {
				size: "sm",
				value: r,
				onChange: (e) => i(e.target.value.slice(0, 50)),
				placeholder: "Room name",
				maxLength: 50,
				required: !0,
				autoFocus: !0,
				className: "mb-1.5"
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ Z("button", {
					type: "submit",
					disabled: !r.trim() || n,
					className: o("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !r.trim() || n ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: n ? "Creating…" : "Create"
				}), /* @__PURE__ */ Z("button", {
					type: "button",
					onClick: t,
					className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
					children: "Cancel"
				})]
			}),
			a && /* @__PURE__ */ Z("div", {
				className: "text-danger-fg text-[11px] mt-1",
				children: a
			})
		]
	});
}
function ze({ onCreateDM: e, loading: t, friends: n, friendsError: r }) {
	let [i, a] = Y(""), [s, c] = Y(!1), [l, u] = Y(null), d = async (t) => {
		if (t.preventDefault(), i.trim()) {
			u(null);
			try {
				await e(i.trim()), a(""), c(!1);
			} catch (e) {
				u(e instanceof Error ? e.message : "Failed to open DM");
			}
		}
	};
	return s ? /* @__PURE__ */ Q("form", {
		onSubmit: (e) => {
			d(e);
		},
		className: "my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border",
		children: [
			/* @__PURE__ */ Z(V, {
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
			r && n.length === 0 && /* @__PURE__ */ Z("div", {
				role: "alert",
				"data-testid": "dm-friends-error",
				className: "text-danger-fg text-[11px] mb-1.5",
				children: r
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ Z("button", {
					type: "submit",
					disabled: !i.trim() || t || n.length === 0,
					className: o("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !i.trim() || t ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: "Open DM"
				}), /* @__PURE__ */ Z("button", {
					type: "button",
					onClick: () => c(!1),
					className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
					children: "Cancel"
				})]
			}),
			l && /* @__PURE__ */ Z("div", {
				className: "text-danger-fg text-[11px] mt-1",
				children: l
			})
		]
	}) : /* @__PURE__ */ Z("button", {
		onClick: () => c(!0),
		className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded mb-1",
		children: "+ New DM"
	});
}
function Be({ room: e, isActive: t, onClick: n }) {
	return /* @__PURE__ */ Q("button", {
		type: "button",
		onClick: n,
		"aria-pressed": t,
		className: o("flex items-center h-14 border-b border-surface-hover cursor-pointer pr-2", "w-full text-left font-[inherit]", t ? "bg-surface-hover border-l-[3px] border-l-primary pl-[13px]" : "bg-transparent border-l-[3px] border-l-transparent"),
		children: [/* @__PURE__ */ Z("div", {
			className: o("flex-1 text-base text-text-primary", t ? "font-semibold" : "font-normal"),
			children: e.name
		}), /* @__PURE__ */ Z("span", {
			className: ((e) => e === "standalone" ? "bg-accent-bg text-primary text-xs px-2 py-0.5 rounded" : e === "group" ? "bg-info-bg text-info text-xs px-2 py-0.5 rounded" : "bg-success-bg text-success text-xs px-2 py-0.5 rounded")(e.type),
			children: e.type
		})]
	});
}
function Ve({ room: e, isActive: t, onClick: n }) {
	return /* @__PURE__ */ Q("button", {
		onClick: n,
		className: o("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]", t ? "bg-accent-bg text-accent-fg font-semibold" : "bg-transparent text-text-primary font-normal"),
		children: [/* @__PURE__ */ Z("span", {
			className: o("text-[13px] shrink-0", t ? "text-primary" : "text-text-tertiary"),
			children: e.type === "dm" ? "●" : "#"
		}), /* @__PURE__ */ Z("span", {
			className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1",
			children: e.name
		})]
	});
}
function He({ message: e, onRetry: t, compact: n }) {
	return /* @__PURE__ */ Q("div", {
		role: "alert",
		className: o("text-center flex flex-col items-center gap-1.5", n ? "px-2 py-3" : "px-4 py-6"),
		children: [
			/* @__PURE__ */ Z("div", {
				className: o("font-semibold text-danger-fg", n ? "text-xs" : "text-sm"),
				children: "Couldn't load rooms"
			}),
			/* @__PURE__ */ Z("div", {
				className: o("text-text-secondary", n ? "text-[11px]" : "text-xs"),
				children: e
			}),
			t && /* @__PURE__ */ Z("button", {
				type: "button",
				onClick: t,
				className: o("mt-1 font-medium text-info-fg bg-info-bg border border-info-border rounded cursor-pointer font-[system-ui,-apple-system,sans-serif]", n ? "px-2.5 py-0.5 text-[11px]" : "px-3.5 py-1 text-xs"),
				children: "Retry"
			})
		]
	});
}
function Ue({ idToken: t, rooms: n, createRoom: r, createDM: i, loading: a, error: o, onRetry: s, onRoomSelect: c, activeRoomId: l, compact: u }) {
	let { friends: d, loadError: f } = e({ idToken: t }), [p, m] = Y(!1), h = async (e) => {
		await r(e), m(!1);
	};
	return u ? /* @__PURE__ */ Q("div", {
		className: "px-2 pt-2",
		children: [
			/* @__PURE__ */ Z("button", {
				onClick: () => m((e) => !e),
				className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
				children: "+ New Room"
			}),
			p && /* @__PURE__ */ Z(Re, {
				onCreate: h,
				onDiscard: () => m(!1),
				loading: a
			}),
			/* @__PURE__ */ Z(ze, {
				onCreateDM: i,
				loading: a,
				friends: d,
				friendsError: f
			}),
			/* @__PURE__ */ Z("div", { children: a && n.length === 0 ? /* @__PURE__ */ Z("div", {
				className: "p-2 text-text-tertiary text-xs text-center",
				children: "Loading…"
			}) : o && n.length === 0 ? /* @__PURE__ */ Z(He, {
				message: o,
				onRetry: s,
				compact: !0
			}) : n.length === 0 ? /* @__PURE__ */ Z("div", {
				className: "px-2 py-3 text-text-tertiary text-xs",
				children: "No rooms yet"
			}) : n.map((e) => /* @__PURE__ */ Z(Ve, {
				room: e,
				isActive: e.roomId === l,
				onClick: () => c(e)
			}, e.roomId)) })
		]
	}) : /* @__PURE__ */ Q("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ Z("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
				children: "Rooms"
			}),
			/* @__PURE__ */ Z("button", {
				onClick: () => m((e) => !e),
				className: "w-full h-9 mb-2 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Create Room"
			}),
			p && /* @__PURE__ */ Z(Re, {
				onCreate: h,
				onDiscard: () => m(!1),
				loading: a
			}),
			/* @__PURE__ */ Z(ze, {
				onCreateDM: i,
				loading: a,
				friends: d,
				friendsError: f
			}),
			/* @__PURE__ */ Z("div", {
				className: "max-h-80 overflow-y-auto",
				children: a && n.length === 0 ? /* @__PURE__ */ Q("div", {
					className: "flex items-center gap-2 p-4 justify-center text-text-secondary",
					children: [/* @__PURE__ */ Z("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }), "Loading..."]
				}) : o && n.length === 0 ? /* @__PURE__ */ Z(He, {
					message: o,
					onRetry: s
				}) : n.length === 0 ? /* @__PURE__ */ Q("div", {
					className: "py-6 text-center",
					children: [/* @__PURE__ */ Z("div", {
						className: "text-sm font-semibold text-text-primary mb-1",
						children: "No rooms yet"
					}), /* @__PURE__ */ Z("div", {
						className: "text-sm text-text-tertiary",
						children: "Create a room or ask to be added."
					})]
				}) : n.map((e) => /* @__PURE__ */ Z(Be, {
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
function We(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function Ge(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function Ke({ onSubmit: e, placeholder: t = "Write a reply…", loading: n }) {
	let [r, i] = Y(""), [a, s] = Y(null), c = async (t) => {
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
	return /* @__PURE__ */ Q("form", {
		onSubmit: (e) => {
			c(e);
		},
		className: "flex flex-wrap gap-2 mt-2",
		children: [
			/* @__PURE__ */ Z(k, {
				value: r,
				onChange: (e) => i(e.target.value),
				placeholder: t,
				className: "flex-1"
			}),
			/* @__PURE__ */ Z("button", {
				type: "submit",
				disabled: !r.trim() || n,
				className: o("h-7 px-2.5 rounded-md text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !r.trim() || n ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
				children: "Comment"
			}),
			a && /* @__PURE__ */ Z("div", {
				role: "alert",
				"data-testid": "comment-submit-error",
				className: "basis-full text-danger-fg text-[13px]",
				children: a
			})
		]
	});
}
function qe({ comment: e, currentUserId: t, loading: n, onDelete: r, onReply: i }) {
	let [a, o] = Y(!1), [s, c] = Y(!1), [l, u] = Y(+!e._fadeIn);
	K(() => {
		if (e._fadeIn) {
			let e = setTimeout(() => u(1), 10);
			return () => clearTimeout(e);
		}
	}, []);
	let d = e.authorId === t, f = !!e.parentCommentId, p = e.authorId.slice(0, 2).toUpperCase(), m = /* @__PURE__ */ Z("div", {
		style: { opacity: l },
		className: "transition-opacity duration-200 ease-[ease]",
		children: /* @__PURE__ */ Q("div", {
			className: "flex items-start gap-2",
			children: [/* @__PURE__ */ Z("div", {
				className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
				children: p
			}), /* @__PURE__ */ Q("div", {
				className: "flex-1",
				children: [
					/* @__PURE__ */ Q("div", {
						className: "flex items-center gap-2 mb-0.5",
						children: [/* @__PURE__ */ Z("span", {
							className: "text-sm font-semibold text-text-primary",
							children: e.authorId
						}), /* @__PURE__ */ Z("span", {
							className: "text-xs text-text-tertiary",
							children: We(e.createdAt)
						})]
					}),
					/* @__PURE__ */ Z("div", {
						className: "text-sm text-text-primary mb-1",
						children: e.content
					}),
					/* @__PURE__ */ Q("div", {
						className: "flex gap-2 items-center",
						children: [
							/* @__PURE__ */ Z("button", {
								onClick: () => c((e) => !e),
								className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
								children: "Reply"
							}),
							d && !a && /* @__PURE__ */ Z("button", {
								onClick: () => o(!0),
								className: "text-sm text-text-tertiary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
								"aria-label": "Delete comment",
								children: "Delete"
							}),
							d && a && /* @__PURE__ */ Q("div", {
								role: "group",
								"aria-label": "Confirm delete comment",
								className: "flex gap-1.5 items-center",
								children: [
									/* @__PURE__ */ Z("span", {
										className: "text-xs text-text-primary",
										children: "Delete this comment?"
									}),
									/* @__PURE__ */ Z("button", {
										onClick: () => o(!1),
										className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
										children: "Cancel"
									}),
									/* @__PURE__ */ Z("button", {
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
					s && /* @__PURE__ */ Z(Ke, {
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
	return f ? /* @__PURE__ */ Z("div", {
		className: "pl-8 py-2",
		children: m
	}) : /* @__PURE__ */ Z("div", {
		className: "py-2 border-b border-surface-hover",
		children: m
	});
}
function Je({ idToken: e, roomId: t, postId: n, onMessage: i }) {
	let { comments: a, createComment: o, deleteComment: s, loading: c, submitting: l, error: u } = r({
		idToken: e,
		roomId: t,
		postId: n,
		onMessage: i
	}), d = Ge(e), f = async (e, t) => {
		await o(t, e);
	};
	return /* @__PURE__ */ Q("div", {
		className: "pt-2 pl-2 border-t border-surface-hover",
		children: [
			c ? /* @__PURE__ */ Z("div", {
				className: "text-sm text-text-tertiary py-2",
				children: "Loading comments…"
			}) : u && a.length === 0 ? /* @__PURE__ */ Z("div", {
				role: "alert",
				className: "text-sm text-danger-fg py-2",
				children: u
			}) : a.length === 0 ? /* @__PURE__ */ Z("div", {
				className: "text-sm text-text-tertiary text-center py-4",
				children: "No comments yet"
			}) : a.map((e) => /* @__PURE__ */ Z(qe, {
				comment: e,
				currentUserId: d,
				loading: l,
				onDelete: s,
				onReply: f
			}, e.commentId)),
			u && a.length > 0 && /* @__PURE__ */ Z("div", {
				role: "alert",
				"data-testid": "comment-thread-error",
				className: "text-sm text-danger-fg py-1",
				children: u
			}),
			/* @__PURE__ */ Z(Ke, {
				onSubmit: (e) => o(e),
				placeholder: "Write a comment…",
				loading: l
			})
		]
	});
}
//#endregion
//#region src/components/social/PostFeed.tsx
var Ye = [
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
function Xe(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function Ze(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function Qe({ onCreate: e, loading: t }) {
	let [n, r] = Y(""), [i, a] = Y(null), s = async (t) => {
		if (t.preventDefault(), n.trim()) {
			a(null);
			try {
				await e(n.trim()), r("");
			} catch (e) {
				a(e instanceof Error ? e.message : "Failed to create post");
			}
		}
	};
	return /* @__PURE__ */ Q("form", {
		onSubmit: (e) => {
			s(e);
		},
		children: [
			/* @__PURE__ */ Z(A, {
				value: n,
				onChange: (e) => r(e.target.value),
				placeholder: "What's on your mind?",
				maxLength: 1e4,
				rows: 3,
				className: "resize-y mb-2"
			}),
			/* @__PURE__ */ Z("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ Z("button", {
					type: "submit",
					disabled: !n.trim() || t,
					className: o("h-9 px-4 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !n.trim() || t ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
					children: t ? "Posting…" : "Post"
				})
			}),
			i && /* @__PURE__ */ Z("div", {
				className: "text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
				children: i
			})
		]
	});
}
function $e({ isLiked: e, likeCount: t, whoLiked: n, toggle: r }) {
	return /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Q("button", {
		onClick: () => void r(),
		"aria-label": "Like post",
		className: "bg-transparent border-none cursor-pointer flex items-center gap-1 p-0 font-[system-ui,-apple-system,sans-serif]",
		children: [/* @__PURE__ */ Z("span", {
			className: o("text-base", e ? "text-primary" : "text-text-tertiary"),
			children: "❤"
		}), /* @__PURE__ */ Z("span", {
			className: o("text-sm", e ? "text-primary" : "text-text-tertiary"),
			children: t
		})]
	}), n.length > 0 && /* @__PURE__ */ Q("span", {
		className: "text-xs text-text-secondary ml-1",
		children: [
			"Liked by: ",
			n.slice(0, 3).map((e) => e.displayName).join(", "),
			n.length > 3 ? ` and ${n.length - 3} more` : ""
		]
	})] });
}
function et({ reactWithEmoji: e }) {
	return /* @__PURE__ */ Z("div", {
		className: "flex flex-wrap gap-0",
		children: Ye.map((t) => /* @__PURE__ */ Z("button", {
			onClick: () => void e(t),
			className: "text-base bg-transparent border-none px-1 py-0.5 cursor-pointer",
			title: t,
			children: t
		}, t))
	});
}
function tt({ post: e, idToken: t, roomId: n, currentUserId: r, onMessage: a, onEdit: s, onDelete: c }) {
	let { isLiked: l, likeCount: u, whoLiked: d, toggle: f, reactWithEmoji: p, error: m } = i({
		idToken: t,
		roomId: n,
		postId: e.postId,
		onMessage: a
	}), [h, g] = Y(+!e._fadeIn), [_, v] = Y(!1), [y, b] = Y(!1), [x, S] = Y(!1), [C, w] = Y(e.content), [T, E] = Y(null), D = async () => {
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
	K(() => {
		if (e._fadeIn) {
			let e = setTimeout(() => g(1), 10);
			return () => clearTimeout(e);
		}
	}, []);
	let k = e.authorId === r, j = e.authorId.slice(0, 2).toUpperCase();
	return /* @__PURE__ */ Q("div", {
		style: { opacity: h },
		className: "border-b border-surface-hover pb-4 mb-4 transition-opacity duration-200 ease-[ease]",
		children: [
			/* @__PURE__ */ Q("div", {
				className: "flex items-center gap-2 mb-2",
				children: [/* @__PURE__ */ Z("div", {
					className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
					children: j
				}), /* @__PURE__ */ Q("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ Z("span", {
						className: "text-base font-semibold text-text-primary",
						children: e.authorId
					}), /* @__PURE__ */ Z("span", {
						className: "text-sm text-text-tertiary ml-2",
						children: Xe(e.createdAt)
					})]
				})]
			}),
			x ? /* @__PURE__ */ Q("div", {
				className: "mb-2",
				children: [/* @__PURE__ */ Z(A, {
					value: C,
					onChange: (e) => w(e.target.value),
					rows: 3,
					className: "resize-y mb-2"
				}), /* @__PURE__ */ Q("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ Z("button", {
						onClick: () => {
							D();
						},
						disabled: !C.trim(),
						className: o("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", C.trim() ? "bg-primary text-white border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"),
						children: "Save"
					}), /* @__PURE__ */ Z("button", {
						onClick: () => {
							S(!1), w(e.content);
						},
						className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Discard Changes"
					})]
				})]
			}) : /* @__PURE__ */ Z("div", {
				className: "text-base text-text-primary mt-2 mb-2",
				children: e.content
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex gap-4 text-sm mt-1 items-center flex-wrap",
				children: [
					/* @__PURE__ */ Z($e, {
						isLiked: l,
						likeCount: u,
						whoLiked: d,
						toggle: f
					}),
					/* @__PURE__ */ Z(et, { reactWithEmoji: p }),
					/* @__PURE__ */ Z("button", {
						onClick: () => v((e) => !e),
						className: "bg-transparent border-none text-sm text-text-secondary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Comment"
					}),
					k && !x && /* @__PURE__ */ Z("button", {
						onClick: () => S(!0),
						className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Edit"
					}),
					k && !y && !x && /* @__PURE__ */ Z("button", {
						onClick: () => b(!0),
						className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Delete"
					}),
					k && y && /* @__PURE__ */ Q("div", {
						role: "group",
						"aria-label": "Confirm delete post",
						className: "flex gap-1.5 items-center",
						children: [
							/* @__PURE__ */ Z("span", {
								className: "text-xs text-text-primary",
								children: "Delete this post?"
							}),
							/* @__PURE__ */ Z("button", {
								onClick: () => b(!1),
								className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
								children: "Cancel"
							}),
							/* @__PURE__ */ Z("button", {
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
			(T ?? m) && /* @__PURE__ */ Z("div", {
				role: "alert",
				"data-testid": "post-action-error",
				className: "text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
				children: T ?? m
			}),
			_ && /* @__PURE__ */ Z(Je, {
				idToken: t,
				roomId: n,
				postId: e.postId,
				onMessage: a
			})
		]
	});
}
function nt({ idToken: e, roomId: t, onMessage: r }) {
	let { posts: i, createPost: a, editPost: s, deletePost: c, loading: l, mutating: u, error: d, loadError: f, hasMore: p, loadMore: m } = n({
		idToken: e,
		roomId: t,
		onMessage: r
	}), h = Ze(e);
	return /* @__PURE__ */ Q("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ Z(Qe, {
				onCreate: a,
				loading: l || u
			}),
			/* @__PURE__ */ Z("div", { className: "border-t border-border my-4" }),
			p && /* @__PURE__ */ Z("button", {
				onClick: () => void m(),
				disabled: l,
				className: o("w-full h-9 mb-4 bg-surface text-text-primary border border-border rounded-lg text-sm font-[system-ui,-apple-system,sans-serif]", l ? "cursor-default" : "cursor-pointer"),
				children: l ? "Loading…" : "Load more"
			}),
			d && i.length > 0 && /* @__PURE__ */ Z("div", {
				role: "alert",
				"data-testid": "post-feed-error",
				className: "text-danger-fg text-[13px] mb-3 font-[system-ui,-apple-system,sans-serif]",
				children: d
			}),
			l && i.length === 0 ? /* @__PURE__ */ Q("div", {
				className: "flex items-center gap-2 p-4 justify-center text-text-secondary",
				children: [/* @__PURE__ */ Z("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }), "Loading..."]
			}) : f && i.length === 0 ? /* @__PURE__ */ Q("div", {
				role: "alert",
				className: "py-6 text-center",
				children: [/* @__PURE__ */ Z("div", {
					className: "text-sm font-semibold text-danger-fg mb-1",
					children: "Couldn’t load posts"
				}), /* @__PURE__ */ Z("div", {
					className: "text-sm text-text-tertiary",
					children: f
				})]
			}) : i.length === 0 ? /* @__PURE__ */ Q("div", {
				className: "py-6 text-center",
				children: [/* @__PURE__ */ Z("div", {
					className: "text-sm font-semibold text-text-primary mb-1",
					children: "No posts yet"
				}), /* @__PURE__ */ Z("div", {
					className: "text-sm text-text-tertiary",
					children: "Be the first to post in this room."
				})]
			}) : i.map((n) => /* @__PURE__ */ Z(tt, {
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
function rt({ group: e, isSelected: t, onClick: n }) {
	return /* @__PURE__ */ Q("button", {
		onClick: n,
		className: o("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]", t ? "bg-accent-bg text-accent-fg font-semibold" : "bg-transparent text-text-primary font-normal"),
		children: [/* @__PURE__ */ Z("span", {
			className: o("text-xs shrink-0", t ? "text-primary" : "text-text-tertiary"),
			children: e.visibility === "private" ? "🔒" : "👥"
		}), /* @__PURE__ */ Z("span", {
			className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1",
			children: e.name
		})]
	});
}
function it({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = Y(""), [a, s] = Y(null), c = async (t) => {
		if (t.preventDefault(), r.trim()) {
			s(null);
			try {
				await e(r.trim()), i("");
			} catch (e) {
				s(e instanceof Error ? e.message : "Failed to create group");
			}
		}
	};
	return /* @__PURE__ */ Q("form", {
		onSubmit: (e) => {
			c(e);
		},
		className: "p-2 bg-surface-panel rounded-md border border-border my-1 mb-2",
		children: [
			/* @__PURE__ */ Z(k, {
				size: "sm",
				value: r,
				onChange: (e) => i(e.target.value.slice(0, 50)),
				placeholder: "Group name",
				maxLength: 50,
				required: !0,
				autoFocus: !0,
				className: "mb-1.5"
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ Z("button", {
					type: "submit",
					disabled: !r.trim() || n,
					className: o("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !r.trim() || n ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: n ? "Creating…" : "Create"
				}), /* @__PURE__ */ Z("button", {
					type: "button",
					onClick: t,
					className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
					children: "Cancel"
				})]
			}),
			a && /* @__PURE__ */ Z("div", {
				className: "text-danger-fg text-[11px] mt-1",
				children: a
			})
		]
	});
}
function at({ group: e, members: t, rooms: n, groupId: r, currentUserId: i, createGroupRoom: a, onRoomSelect: s, inviteUser: c, loading: l }) {
	let [u, d] = Y(!1), [f, p] = Y(""), [m, h] = Y(null), [g, _] = Y(!1), [v, y] = Y(""), [b, x] = Y(null), S = e.ownerId === i, C = n.filter((e) => e.groupId === r), w = async (e) => {
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
	return /* @__PURE__ */ Q("div", {
		className: "px-2 pb-2 pt-1 border-t border-border mt-1",
		children: [
			/* @__PURE__ */ Q("div", {
				className: "flex items-center justify-between mb-1",
				children: [/* @__PURE__ */ Q("span", {
					className: "text-[11px] text-text-secondary font-semibold uppercase tracking-wide",
					children: [
						"Members (",
						t.length,
						")"
					]
				}), S && /* @__PURE__ */ Z("button", {
					onClick: () => d((e) => !e),
					className: "text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]",
					children: "+ Invite"
				})]
			}),
			u && /* @__PURE__ */ Q("form", {
				onSubmit: (e) => {
					w(e);
				},
				className: "flex gap-1 mb-1.5",
				children: [/* @__PURE__ */ Z(k, {
					size: "sm",
					value: f,
					onChange: (e) => p(e.target.value),
					placeholder: "User ID",
					className: "flex-1"
				}), /* @__PURE__ */ Z("button", {
					type: "submit",
					disabled: !f.trim(),
					className: o("h-6 px-2 border-none rounded text-[11px] font-[inherit]", f.trim() ? "bg-primary text-white cursor-pointer" : "bg-border text-text-tertiary cursor-default"),
					children: "Invite"
				})]
			}),
			u && m && /* @__PURE__ */ Z("div", {
				role: "alert",
				"data-testid": "compact-invite-error",
				className: "text-danger-fg text-[11px] mb-1.5",
				children: m
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex flex-wrap gap-1 mb-2",
				children: [t.slice(0, 8).map((e) => /* @__PURE__ */ Z("div", {
					title: e.displayName ?? e.userId,
					className: "w-6 h-6 rounded-full bg-border flex items-center justify-center text-[10px] font-semibold text-text-primary",
					children: (e.displayName ?? e.userId).slice(0, 2).toUpperCase()
				}, e.userId)), t.length > 8 && /* @__PURE__ */ Q("span", {
					className: "text-[11px] text-text-tertiary self-center",
					children: ["+", t.length - 8]
				})]
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex items-center justify-between mb-1",
				children: [/* @__PURE__ */ Q("span", {
					className: "text-[11px] text-text-secondary font-semibold uppercase tracking-wide",
					children: [
						"Rooms (",
						C.length,
						")"
					]
				}), S && /* @__PURE__ */ Z("button", {
					onClick: () => _((e) => !e),
					className: "text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]",
					children: "+ Room"
				})]
			}),
			g && /* @__PURE__ */ Q("form", {
				onSubmit: (e) => {
					T(e);
				},
				className: "flex gap-1 mb-1.5",
				children: [/* @__PURE__ */ Z(k, {
					size: "sm",
					value: v,
					onChange: (e) => y(e.target.value.slice(0, 50)),
					placeholder: "Room name",
					className: "flex-1"
				}), /* @__PURE__ */ Z("button", {
					type: "submit",
					disabled: !v.trim() || l,
					className: o("h-6 px-2 border-none rounded text-[11px] font-[inherit]", !v.trim() || l ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: "Create"
				})]
			}),
			g && b && /* @__PURE__ */ Z("div", {
				role: "alert",
				"data-testid": "compact-group-room-error",
				className: "text-danger-fg text-[11px] mb-1.5",
				children: b
			}),
			C.map((e) => /* @__PURE__ */ Q(s ? "button" : "div", {
				type: s ? "button" : void 0,
				onClick: s ? () => s(e) : void 0,
				className: o("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1 bg-transparent text-text-primary text-[13px] text-left font-[inherit]", s && "cursor-pointer"),
				children: [/* @__PURE__ */ Z("span", {
					className: "text-text-tertiary text-xs",
					children: "#"
				}), /* @__PURE__ */ Z("span", {
					className: "overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.name
				})]
			}, e.roomId))
		]
	});
}
function ot({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = Y(""), [a, s] = Y("public"), [c, l] = Y(null), u = me(), d = async (t) => {
		if (t.preventDefault(), r.trim()) {
			l(null);
			try {
				await e(r.trim(), void 0, a);
			} catch (e) {
				l(e instanceof Error ? e.message : "Failed to create group");
			}
		}
	};
	return /* @__PURE__ */ Q("form", {
		onSubmit: (e) => {
			d(e);
		},
		className: "mb-3 p-3 bg-surface-panel rounded-lg border border-border",
		children: [
			/* @__PURE__ */ Q("div", {
				className: "mb-3",
				children: [/* @__PURE__ */ Z("label", {
					htmlFor: `${u}-group-name`,
					className: "text-sm text-text-primary block mb-1",
					children: "Group name"
				}), /* @__PURE__ */ Z(k, {
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
			/* @__PURE__ */ Q("div", {
				className: "flex items-center gap-2.5 mb-3.5",
				children: [
					/* @__PURE__ */ Z("span", {
						className: "text-[13px] text-text-primary min-w-[42px]",
						children: a === "public" ? "Public" : "Private"
					}),
					/* @__PURE__ */ Z("button", {
						type: "button",
						role: "switch",
						"aria-label": "Private group",
						"aria-checked": a === "private",
						onClick: () => s((e) => e === "public" ? "private" : "public"),
						className: o("relative w-11 h-6 rounded-xl border-none cursor-pointer p-0 shrink-0 transition-colors duration-200", a === "private" ? "bg-primary" : "bg-state-idle"),
						children: /* @__PURE__ */ Z("span", { className: o("absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-[left] duration-200", a === "private" ? "left-[23px]" : "left-[3px]") })
					}),
					/* @__PURE__ */ Z("span", {
						className: "text-xs text-text-tertiary",
						children: a === "public" ? "Visible to everyone" : "Invite only"
					})
				]
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ Z("button", {
					type: "submit",
					disabled: !r.trim() || n,
					className: o("flex-1 h-9 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !r.trim() || n ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
					children: n ? "Creating…" : "Create Group"
				}), /* @__PURE__ */ Z("button", {
					type: "button",
					onClick: t,
					className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
					children: "Cancel"
				})]
			}),
			c && /* @__PURE__ */ Z("div", {
				id: `${u}-form-error`,
				role: "alert",
				className: "text-danger-fg text-[13px] mt-1.5",
				children: c
			})
		]
	});
}
function st({ group: e, currentUserId: t, isSelected: n, onSelect: r, onDelete: i }) {
	let [a, s] = Y(null), c = e.ownerId === t;
	return /* @__PURE__ */ Q("div", {
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
			/* @__PURE__ */ Q("div", {
				className: "flex-1 min-w-0 pr-2",
				children: [/* @__PURE__ */ Z("div", {
					className: o("text-base text-text-primary", n ? "font-semibold" : "font-normal"),
					children: e.name
				}), e.description && /* @__PURE__ */ Z("div", {
					className: "text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.description
				})]
			}),
			/* @__PURE__ */ Z("span", {
				className: o("text-xs px-2 py-0.5 rounded shrink-0 mr-2", e.visibility === "public" ? "bg-success-bg text-success" : "bg-surface-hover text-text-secondary"),
				children: e.visibility
			}),
			c && /* @__PURE__ */ Z("div", {
				className: "shrink-0",
				onClick: (e) => e.stopPropagation(),
				children: a === e.groupId ? /* @__PURE__ */ Q("div", {
					role: "group",
					"aria-label": "Confirm delete group",
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ Z("button", {
						onClick: () => s(null),
						className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Cancel"
					}), /* @__PURE__ */ Z("button", {
						onClick: () => {
							i(e.groupId), s(null);
						},
						className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Delete"
					})]
				}) : /* @__PURE__ */ Z("button", {
					onClick: () => s(e.groupId),
					className: "text-xs text-danger-fg bg-transparent border-none cursor-pointer px-2 py-1 font-[system-ui,-apple-system,sans-serif]",
					"aria-label": `Delete group ${e.name}`,
					children: "Delete"
				})
			})
		]
	});
}
function ct({ groupId: e, onInvite: t }) {
	let [n, r] = Y(""), [i, a] = Y(null), s = async (i) => {
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
	return /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Q("form", {
		onSubmit: (e) => {
			s(e);
		},
		className: "flex gap-2 mt-2",
		children: [/* @__PURE__ */ Z(k, {
			className: "flex-1",
			value: n,
			onChange: (e) => r(e.target.value),
			placeholder: "User ID to invite"
		}), /* @__PURE__ */ Z("button", {
			type: "submit",
			disabled: !n.trim(),
			className: o("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", n.trim() ? "bg-primary text-white border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"),
			children: "Invite"
		})]
	}), i && /* @__PURE__ */ Z("div", {
		role: "alert",
		"data-testid": "invite-error",
		className: "text-danger-fg text-xs mt-1",
		children: i
	})] });
}
function lt({ members: e }) {
	let t = (e) => e === "owner" ? "bg-success-bg text-success text-xs px-2 py-0.5 rounded" : e === "admin" ? "bg-info-bg text-info text-xs px-2 py-0.5 rounded" : "bg-surface-hover text-text-secondary text-xs px-2 py-0.5 rounded";
	return /* @__PURE__ */ Z("div", {
		className: "max-h-[200px] overflow-y-auto mt-2 border-t border-border",
		children: e.map((e) => /* @__PURE__ */ Q("div", {
			className: "flex items-center gap-2 h-12 border-b border-surface-hover",
			children: [
				/* @__PURE__ */ Z("div", {
					className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
					children: (e.displayName ?? e.userId).slice(0, 2).toUpperCase()
				}),
				/* @__PURE__ */ Z("div", {
					className: "flex-1 text-base text-text-primary",
					children: e.displayName ?? e.userId
				}),
				/* @__PURE__ */ Z("span", {
					className: t(e.role),
					children: e.role
				})
			]
		}, e.userId))
	});
}
function ut({ rooms: e, groupId: t, selectedGroupRole: n, createGroupRoom: r, onRoomSelect: i, loading: a }) {
	let [s, c] = Y(!1), [l, u] = Y(""), [d, f] = Y(null), p = e.filter((e) => e.groupId === t), m = async (e) => {
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
	return /* @__PURE__ */ Q("div", {
		className: "mt-3",
		children: [
			/* @__PURE__ */ Z("h3", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-2",
				children: "GROUP ROOMS"
			}),
			(n === "owner" || n === "admin") && (s ? /* @__PURE__ */ Q("form", {
				onSubmit: (e) => {
					m(e);
				},
				className: "mb-2 p-3 bg-surface-panel rounded-lg border border-border",
				children: [/* @__PURE__ */ Q("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ Z(k, {
							className: "flex-1",
							value: l,
							onChange: (e) => u(e.target.value.slice(0, 50)),
							placeholder: "Room name",
							maxLength: 50,
							required: !0
						}),
						/* @__PURE__ */ Z("button", {
							type: "submit",
							disabled: !l.trim() || a,
							className: o("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !l.trim() || a ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
							children: a ? "Creating…" : "Create Room"
						}),
						/* @__PURE__ */ Z("button", {
							type: "button",
							onClick: () => c(!1),
							className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
							children: "Cancel"
						})
					]
				}), d && /* @__PURE__ */ Z("div", {
					role: "alert",
					"data-testid": "group-room-error",
					className: "text-danger-fg text-[13px] mt-1.5",
					children: d
				})]
			}) : /* @__PURE__ */ Z("button", {
				onClick: () => c(!0),
				className: "w-full h-9 mb-2 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Create Room"
			})),
			p.length === 0 ? /* @__PURE__ */ Z("div", {
				className: "text-sm text-text-tertiary py-2",
				children: "No rooms in this group yet."
			}) : p.map((e) => /* @__PURE__ */ Q("div", {
				role: i ? "button" : void 0,
				tabIndex: i ? 0 : void 0,
				"aria-label": i ? `Open room ${e.name}` : void 0,
				className: o("flex items-center h-12 border-b border-surface-hover pr-2", i && "cursor-pointer"),
				onClick: i ? () => i(e) : void 0,
				onKeyDown: i ? (t) => {
					(t.key === "Enter" || t.key === " ") && (t.preventDefault(), i(e));
				} : void 0,
				children: [/* @__PURE__ */ Z("div", {
					className: "flex-1 text-base text-text-primary",
					children: e.name
				}), /* @__PURE__ */ Z("span", {
					className: "bg-info-bg text-info text-xs px-2 py-0.5 rounded",
					children: "group"
				})]
			}, e.roomId))
		]
	});
}
function dt({ idToken: e, rooms: n, createGroupRoom: r, onRoomSelect: i, roomsLoading: a, compact: s }) {
	let { groups: c, createGroup: l, deleteGroup: u, inviteUser: d, loadMembers: f, members: p, loading: m, loaded: h, loadError: g, refresh: _ } = t({ idToken: e }), v = !h && !g, [y, b] = Y(!1), [x, S] = Y(null), C = e ? (() => {
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
		return /* @__PURE__ */ Q("div", {
			className: "px-2 pt-2",
			children: [
				/* @__PURE__ */ Z("button", {
					onClick: () => b((e) => !e),
					className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
					children: "+ New Group"
				}),
				y && /* @__PURE__ */ Z(it, {
					onCreate: w,
					onDiscard: () => b(!1),
					loading: m
				}),
				/* @__PURE__ */ Z("div", { children: v && c.length === 0 ? /* @__PURE__ */ Z("div", {
					role: "status",
					className: "p-2 text-text-tertiary text-xs text-center",
					children: "Loading…"
				}) : g && c.length === 0 ? /* @__PURE__ */ Q("div", {
					role: "alert",
					"data-testid": "compact-groups-load-error",
					className: "px-2 py-3 text-danger-fg text-xs",
					children: [
						/* @__PURE__ */ Z("div", { children: "Couldn’t load groups." }),
						/* @__PURE__ */ Z("div", {
							className: "text-text-tertiary mt-0.5",
							children: g
						}),
						/* @__PURE__ */ Z("button", {
							type: "button",
							onClick: () => {
								_();
							},
							className: "mt-1 text-[11px] text-primary bg-transparent border-none cursor-pointer p-0 font-[inherit]",
							children: "Retry"
						})
					]
				}) : c.length === 0 ? /* @__PURE__ */ Z("div", {
					className: "px-2 py-3 text-text-tertiary text-xs",
					children: "No groups yet"
				}) : c.map((e) => /* @__PURE__ */ Z(rt, {
					group: e,
					isSelected: e.groupId === x,
					onClick: () => T(e.groupId)
				}, e.groupId)) }),
				e && /* @__PURE__ */ Z(at, {
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
	return /* @__PURE__ */ Q("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ Z("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
				children: "Groups"
			}),
			/* @__PURE__ */ Z("div", {
				className: "max-h-80 overflow-y-auto mb-3",
				children: v && c.length === 0 ? /* @__PURE__ */ Z("div", {
					role: "status",
					className: "py-4 text-center text-sm text-text-tertiary",
					children: "Loading groups…"
				}) : g && c.length === 0 ? /* @__PURE__ */ Q("div", {
					role: "alert",
					"data-testid": "groups-load-error",
					className: "py-4 text-center",
					children: [
						/* @__PURE__ */ Z("div", {
							className: "text-sm font-semibold text-danger-fg mb-1",
							children: "Couldn’t load groups"
						}),
						/* @__PURE__ */ Z("div", {
							className: "text-sm text-text-tertiary mb-2",
							children: g
						}),
						/* @__PURE__ */ Z("button", {
							type: "button",
							onClick: () => {
								_();
							},
							className: "text-sm text-primary bg-transparent border border-border rounded-lg px-3 py-1 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
							children: "Retry"
						})
					]
				}) : c.length === 0 ? /* @__PURE__ */ Q("div", {
					className: "py-4 text-center",
					children: [/* @__PURE__ */ Z("div", {
						className: "text-sm font-semibold text-text-primary mb-1",
						children: "No groups yet"
					}), /* @__PURE__ */ Z("div", {
						className: "text-sm text-text-tertiary",
						children: "Create a group or join a public one."
					})]
				}) : c.map((e) => /* @__PURE__ */ Z(st, {
					group: e,
					currentUserId: C,
					isSelected: x === e.groupId,
					onSelect: T,
					onDelete: u
				}, e.groupId))
			}),
			x && /* @__PURE__ */ Q("div", {
				className: "mb-3",
				children: [
					/* @__PURE__ */ Z(lt, { members: p }),
					(D === "owner" || D === "admin") && /* @__PURE__ */ Z(ct, {
						groupId: x,
						onInvite: d
					}),
					/* @__PURE__ */ Z(ut, {
						rooms: n,
						groupId: x,
						selectedGroupRole: D,
						createGroupRoom: r,
						onRoomSelect: i,
						loading: a
					})
				]
			}),
			/* @__PURE__ */ Z("button", {
				onClick: () => b((e) => !e),
				className: o("w-full h-9 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]", y && "mb-2"),
				children: y ? "Cancel" : "Create Group"
			}),
			y && /* @__PURE__ */ Z(ot, {
				onCreate: w,
				onDiscard: () => b(!1),
				loading: m
			})
		]
	});
}
//#endregion
//#region src/components/social/ActivityPanel.tsx
function ft() {
	return "";
}
var pt = 50;
function mt(e) {
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
function _t({ idToken: e, sendMessage: t, onMessage: n, connectionState: r }) {
	let [i, a] = Y([]), [o, c] = Y(!0), [l, u] = Y(!1), [d, f] = Y(null), [p, m] = Y(0), h = J(t);
	K(() => {
		h.current = t;
	}, [t]);
	let { toast: g } = s(), _ = gt(e), v = G(() => m((e) => e + 1), []);
	return K(() => {
		let t = ft();
		if (!e || !t) {
			c(!1);
			return;
		}
		let n = !1;
		return c(!0), f(null), fetch(`${t}/api/activity?limit=20`, { headers: { Authorization: `Bearer ${e}` } }).then((e) => {
			if (!e.ok) throw Error(`HTTP ${e.status}`);
			return e.json();
		}).then((e) => {
			!n && e?.items && (a(e.items), f(null));
		}).catch((e) => {
			if (n) return;
			let t = e instanceof Error ? e.message : String(e);
			console.error("[activity] fetch failed:", e), f(t), g("Couldn't load activity feed", { type: "error" });
		}).finally(() => {
			n || c(!1);
		}), () => {
			n = !0;
		};
	}, [
		e,
		p,
		g
	]), K(() => {
		if (r !== "connected" || !_) {
			u(!1);
			return;
		}
		let e = `activity:${_}`;
		return h.current({
			service: "activity",
			action: "subscribe",
			channelId: e
		}), u(!0), () => {
			h.current({
				service: "activity",
				action: "unsubscribe",
				channelId: e
			}), u(!1);
		};
	}, [r, _]), K(() => n((e) => {
		if (e.type !== "activity:event") return;
		let t = e.payload;
		t && a((e) => e.length > 0 && e[0].timestamp === t.timestamp && e[0].eventType === t.eventType ? e : [{
			eventType: t.eventType,
			timestamp: t.timestamp,
			detail: t.detail
		}, ...e].slice(0, pt));
	}), [n]), {
		items: i,
		loading: o,
		isLive: l,
		error: d,
		retry: v
	};
}
function vt({ idToken: e, sendMessage: t, onMessage: n, connectionState: r }) {
	let { items: i, loading: a, isLive: s, error: c, retry: l } = _t({
		idToken: e,
		sendMessage: t,
		onMessage: n,
		connectionState: r
	});
	return /* @__PURE__ */ Q("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [/* @__PURE__ */ Q("h2", {
			className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
			children: ["Activity", s && /* @__PURE__ */ Z("span", {
				className: "inline-block w-2 h-2 rounded-full bg-success ml-2 align-middle",
				title: "Live"
			})]
		}), a ? /* @__PURE__ */ Q("div", {
			className: "flex items-center gap-2 p-4 justify-center text-text-secondary",
			children: [/* @__PURE__ */ Z("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }), "Loading..."]
		}) : c && i.length === 0 ? /* @__PURE__ */ Q("div", {
			role: "alert",
			className: "py-6 px-4 text-center text-danger-fg text-sm flex flex-col items-center gap-2",
			children: [
				/* @__PURE__ */ Z("span", { children: "Couldn't load activity" }),
				/* @__PURE__ */ Z("span", {
					className: "text-text-secondary text-xs",
					children: c
				}),
				/* @__PURE__ */ Z("button", {
					type: "button",
					onClick: l,
					className: "mt-1 px-3 py-1 text-xs font-medium text-info-fg bg-info-bg border border-info-border rounded cursor-pointer",
					children: "Retry"
				})
			]
		}) : i.length === 0 ? /* @__PURE__ */ Z("div", {
			className: "py-10 text-center text-text-tertiary text-sm",
			children: "No activity yet"
		}) : /* @__PURE__ */ Z("div", { children: i.map((e, t) => {
			let { icon: n, text: r } = mt(e);
			return /* @__PURE__ */ Q("div", {
				className: o("flex flex-row items-center gap-2 py-2", t < i.length - 1 && "border-b border-surface-hover"),
				children: [
					/* @__PURE__ */ Z("span", {
						className: "w-6 shrink-0 text-center",
						children: n
					}),
					/* @__PURE__ */ Z("span", {
						className: "flex-1 text-sm text-text-primary",
						children: r
					}),
					/* @__PURE__ */ Z("span", {
						className: "text-xs text-text-tertiary shrink-0",
						children: ht(e.timestamp)
					})
				]
			}, t);
		}) })]
	});
}
//#endregion
//#region src/components/social/ReactionsBar.tsx
function yt({ reactions: e, onReact: t, disabled: n = !1, pickerEmojis: r = ue, addTriggerLabel: i, hideAddTrigger: a = !1, className: s }) {
	let [c, l] = Y(!1), u = J(null), d = (e) => {
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
	return /* @__PURE__ */ Q("div", {
		"data-testid": "reactions-bar",
		className: o("relative inline-flex flex-wrap items-center gap-1", s),
		children: [
			p.map((e) => /* @__PURE__ */ Q("button", {
				type: "button",
				onClick: () => d(e.emoji),
				disabled: n,
				"aria-pressed": e.mine ?? !1,
				"data-testid": "reaction-chip",
				"data-emoji": e.emoji,
				"data-mine": e.mine ? "true" : "false",
				className: o("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs leading-none transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", e.mine ? "border-[var(--color-primary)] bg-[var(--color-primary)]/15 text-[var(--color-text-primary)]" : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/60 hover:text-[var(--color-text-primary)]", n && "opacity-50 cursor-not-allowed"),
				children: [/* @__PURE__ */ Z("span", {
					"aria-hidden": !0,
					className: "text-sm leading-none",
					children: e.emoji
				}), /* @__PURE__ */ Z("span", {
					className: "tabular-nums",
					children: e.count
				})]
			}, e.emoji)),
			!a && /* @__PURE__ */ Q("button", {
				ref: u,
				type: "button",
				onClick: () => !n && l((e) => !e),
				disabled: n,
				"aria-haspopup": "dialog",
				"aria-expanded": c,
				"data-testid": "reactions-bar-add",
				className: o("inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-border)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", "h-6 min-w-6 px-1.5 text-xs text-[var(--color-text-secondary)] transition-colors", !n && "hover:border-[var(--color-primary)] hover:text-[var(--color-text-primary)]", n && "opacity-50 cursor-not-allowed"),
				children: [i ?? /* @__PURE__ */ Z("span", {
					"aria-hidden": !0,
					children: "+ 😀"
				}), /* @__PURE__ */ Z("span", {
					className: "sr-only",
					children: "Add reaction"
				})]
			}),
			/* @__PURE__ */ Z(le, {
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
function bt({ items: e, activeId: t, onSelect: n, compact: r = !1, iconOnly: i = !1, className: a, "data-testid": s = "conversation-shelf" }) {
	return e.length === 0 ? null : /* @__PURE__ */ Z("ul", {
		"data-testid": s,
		className: o("m-0 flex list-none flex-col gap-0.5 p-0", a),
		children: e.map((e) => {
			let a = e.id === t, c = e.count ?? 0;
			return /* @__PURE__ */ Z("li", { children: /* @__PURE__ */ Q("button", {
				type: "button",
				onClick: () => n(e.id),
				"aria-label": i ? e.label : void 0,
				title: i ? e.label : void 0,
				"data-testid": `${s}-${e.id}`,
				"data-active": a ? "true" : "false",
				"aria-current": a ? "true" : void 0,
				className: o("relative flex w-full cursor-pointer items-center gap-2 text-left", r ? "min-h-8 border-l-2 px-2 py-1 border-transparent" : "rounded-lg px-2 py-1.5", r && a && "border-primary bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", "hover:bg-surface-hover", a && "bg-surface-hover"),
				children: [
					/* @__PURE__ */ Z("span", {
						"aria-hidden": !0,
						className: r ? "grid h-4 w-4 shrink-0 place-items-center" : "grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-surface-inset",
						children: /* @__PURE__ */ Z("span", {
							className: "grid h-4 w-4 shrink-0 place-items-center text-text-secondary",
							children: e.icon ?? /* @__PURE__ */ Z("span", { className: "h-1.5 w-1.5 rounded-full bg-current" })
						})
					}),
					!i && /* @__PURE__ */ Z("span", {
						className: o("min-w-0 flex-1 truncate text-[13px]", c > 0 || a ? "font-semibold text-text-primary" : "font-medium text-text-secondary"),
						children: e.label
					}),
					c > 0 && /* @__PURE__ */ Z("span", {
						"data-testid": `${s}-${e.id}-count`,
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
function xt({ shelf: e = [], conversations: t, selected: n = null, onSelect: r, onNewChat: i, grouped: a = !0, sectionOrder: o = "channels-first", sectionActions: s, collapsedSections: c, onToggleSection: l, onStartCall: u, maxVisible: d, emptyLabel: f, header: p, title: m, actions: h, beforeList: g, footer: _, onTogglePin: v, onToggleMute: y, onMarkUnread: b, onRename: x, canRename: S, onSetSection: C, collapsible: w = !1, collapsed: T = !1, onToggleCollapse: E, className: D, "data-testid": O = "conversation-rail" }) {
	let k = w && T, A = n?.kind === "shelf" ? n.id : null;
	return /* @__PURE__ */ Q(ge, {
		title: m,
		label: "Chat",
		actions: h,
		header: p,
		footer: _,
		collapsed: k,
		onToggle: w ? () => E?.(!k) : void 0,
		toggleLabel: k ? "Expand the sidebar" : "Collapse the sidebar",
		toggleTestId: `${O}-collapse`,
		"data-testid": O,
		className: D,
		collapsedContent: k && e.length > 0 ? /* @__PURE__ */ Z(bt, {
			items: e,
			activeId: A,
			onSelect: (e) => r({
				kind: "shelf",
				id: e
			}),
			compact: !0,
			iconOnly: !0,
			"data-testid": `${O}-collapsed-shelf`
		}) : void 0,
		children: [
			!k && e.length > 0 && /* @__PURE__ */ Z(bt, {
				items: e,
				activeId: A,
				onSelect: (e) => r({
					kind: "shelf",
					id: e
				}),
				compact: !0,
				className: "shrink-0 px-3.5 pb-2",
				"data-testid": `${O}-shelf`
			}),
			!k && g && /* @__PURE__ */ Z("div", {
				className: "shrink-0 px-2",
				children: g
			}),
			!k && /* @__PURE__ */ Z(Oe, {
				items: t,
				grouped: a,
				sectionOrder: o,
				sectionActions: s,
				collapsedSections: c,
				onToggleSection: l,
				onStartCall: u,
				maxVisible: d,
				activeChannel: n?.kind === "conversation" ? n.channel : null,
				onSelect: (e) => r({
					kind: "conversation",
					channel: e
				}),
				onNewChat: i,
				emptyLabel: f,
				onTogglePin: v,
				onToggleMute: y,
				onMarkUnread: b,
				onRename: x,
				canRename: S,
				onSetSection: C,
				className: "px-2 pb-2",
				"data-testid": `${O}-list`
			})
		]
	});
}
//#endregion
//#region src/components/social/RunSummaryPanel.tsx
function St(e, t) {
	return `${e}:${t}`;
}
function Ct(e) {
	let t = e.indexOf(":");
	return t <= 0 || t === e.length - 1 ? null : {
		pipelineId: e.slice(0, t),
		runId: e.slice(t + 1)
	};
}
function wt(e) {
	return e === "received" || e === "running" || e === "awaiting_approval";
}
var Tt = {
	received: "Received",
	running: "Running",
	awaiting_approval: "Needs approval",
	completed: "Completed",
	rejected: "Rejected",
	failed: "Failed"
}, Et = {
	received: "neutral",
	running: "info",
	awaiting_approval: "warning",
	completed: "success",
	rejected: "danger",
	failed: "danger"
}, Dt = 8;
function Ot(e) {
	return e.kind === "link" ? e.label ?? "Open link" : e.kind === "panel" ? e.panel.title ? `Open ${e.panel.title}` : "Open result" : "Open beside the chat";
}
function kt({ data: e, onOpenFull: t, onOpenChat: n, onOpenDocument: r, onOpenResult: i, className: a, "data-testid": s = "run-summary-panel" }) {
	let { status: l } = e, u = e.pipelineName || e.pipelineId, d = re({
		startedAt: e.startedAt,
		completedAt: e.completedAt
	}), f = e.ops ?? [], p = e.result && i && !(e.result.kind === "document" && e.document && r), m = e.document?.title || "Document", h = l === "failed" ? e.error || "The run failed" : void 0;
	return /* @__PURE__ */ Q("div", {
		className: o("flex h-full min-h-0 flex-col text-[12px]", a),
		"data-testid": s,
		"data-status": l,
		"data-run-id": e.runId,
		"data-pipeline-id": e.pipelineId,
		children: [/* @__PURE__ */ Q("div", {
			className: "flex min-h-0 flex-1 flex-col gap-3 overflow-auto p-3",
			children: [
				/* @__PURE__ */ Q("header", {
					className: "flex flex-col gap-1",
					"data-testid": `${s}-header`,
					children: [
						/* @__PURE__ */ Q("div", {
							className: "flex min-w-0 items-center gap-2",
							children: [/* @__PURE__ */ Z("span", {
								className: "min-w-0 flex-1 truncate text-[13px] font-semibold text-text-primary",
								"data-testid": `${s}-name`,
								children: u
							}), /* @__PURE__ */ Z(E, {
								size: "xs",
								tone: Et[l],
								dot: l === "running" ? "pulse" : void 0,
								"data-testid": `${s}-status`,
								children: Tt[l]
							})]
						}),
						d && /* @__PURE__ */ Z("span", {
							className: "text-[11px] text-text-tertiary",
							"data-testid": `${s}-timings`,
							children: d
						}),
						(e.command || e.instruction) && /* @__PURE__ */ Q("p", {
							className: "m-0 min-w-0 text-text-primary",
							"data-testid": `${s}-instruction`,
							children: [
								e.command && /* @__PURE__ */ Z("span", {
									className: "font-mono text-text-tertiary",
									children: e.command
								}),
								e.command && e.instruction ? " " : "",
								e.instruction
							]
						})
					]
				}),
				e.steps.length > 0 && /* @__PURE__ */ Q("section", {
					"aria-label": "Steps",
					"data-testid": `${s}-steps`,
					children: [/* @__PURE__ */ Z("h3", {
						className: "m-0 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: "Steps"
					}), /* @__PURE__ */ Z("ol", {
						className: "m-0 mt-1 flex list-none flex-col p-0",
						children: e.steps.map((t, n) => /* @__PURE__ */ Q("li", {
							className: "relative flex items-start gap-2 pb-2 last:pb-0",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [
								n < e.steps.length - 1 && /* @__PURE__ */ Z("span", {
									"aria-hidden": "true",
									className: "absolute left-[3px] top-3 h-[calc(100%-6px)] w-px bg-border"
								}),
								/* @__PURE__ */ Z("span", {
									"aria-hidden": "true",
									className: o("relative mt-[5px] inline-block h-[7px] w-[7px] shrink-0 rounded-full", ie[t.status] ?? ie.pending)
								}),
								/* @__PURE__ */ Q("span", {
									className: "flex min-w-0 flex-1 items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ Z("span", {
										className: o("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "font-medium text-text-primary" : "text-text-secondary"),
										children: t.label
									}), /* @__PURE__ */ Z("span", {
										className: "shrink-0 text-[10px] text-text-tertiary",
										children: t.status === "awaiting" ? "needs approval" : t.status
									})]
								})
							]
						}, t.id))
					})]
				}),
				f.length > 0 && /* @__PURE__ */ Q("section", {
					"data-testid": `${s}-ops`,
					children: [
						/* @__PURE__ */ Z("h3", {
							className: "m-0 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
							children: "What changed"
						}),
						/* @__PURE__ */ Z("ul", {
							className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
							children: f.slice(0, Dt).map((e, t) => /* @__PURE__ */ Z("li", {
								className: "truncate",
								"data-op": e.op,
								title: e.text,
								children: oe(e)
							}, t))
						}),
						f.length > Dt && /* @__PURE__ */ Q("div", {
							className: "text-[11px] text-text-tertiary",
							"data-testid": `${s}-more-ops`,
							children: [
								"+",
								f.length - Dt,
								" more"
							]
						})
					]
				}),
				e.document && /* @__PURE__ */ Q("div", {
					className: "flex items-start gap-2 rounded-md border border-border bg-surface-inset px-2 py-1.5",
					"data-testid": `${s}-document`,
					children: [
						/* @__PURE__ */ Z(x, {
							size: 14,
							className: "mt-0.5 shrink-0 text-text-tertiary",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ Q("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ Z("span", {
								className: "block truncate font-medium text-text-primary",
								children: m
							}), e.document.snippet && /* @__PURE__ */ Z("span", {
								className: "line-clamp-2 block text-[11px] text-text-secondary",
								children: e.document.snippet
							})]
						}),
						r && /* @__PURE__ */ Z(c, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0.5 text-[11px] leading-5",
							onClick: () => r(e.document.id),
							"data-testid": `${s}-open-document`,
							children: "Open beside the chat"
						})
					]
				}),
				p && e.result && /* @__PURE__ */ Q("div", {
					className: "flex items-center gap-2",
					"data-testid": `${s}-result`,
					"data-result-kind": e.result.kind,
					children: [/* @__PURE__ */ Z("span", {
						className: "min-w-0 flex-1 text-text-secondary",
						children: "Result"
					}), /* @__PURE__ */ Z(c, {
						size: "sm",
						variant: "secondary",
						className: "!px-2 !py-0.5 text-[11px] leading-5",
						onClick: () => i(e.result),
						"data-testid": `${s}-open-result`,
						children: Ot(e.result)
					})]
				}),
				h && /* @__PURE__ */ Z(z, {
					tone: "error",
					className: "text-[11px]",
					children: /* @__PURE__ */ Z("span", {
						"data-testid": `${s}-error`,
						children: h
					})
				})
			]
		}), /* @__PURE__ */ Q("footer", {
			className: "flex shrink-0 items-center gap-2 border-t border-border px-3 py-2",
			"data-testid": `${s}-footer`,
			children: [/* @__PURE__ */ Z(c, {
				size: "sm",
				variant: "primary",
				onClick: t,
				"data-testid": `${s}-open-full`,
				children: "Open full run"
			}), n && e.channel && /* @__PURE__ */ Z(c, {
				size: "sm",
				variant: "secondary",
				onClick: n,
				"data-testid": `${s}-open-chat`,
				children: "Open chat"
			})]
		})]
	});
}
function At({ panel: e, api: t, options: n }) {
	let { load: r, onOpenFull: i, onOpenChat: a, onOpenDocument: o, onOpenResult: s, refreshMs: l = 2e3, "data-testid": u = "run-panel" } = n, [d, f] = Y({ status: "loading" }), [p, m] = Y(0), h = J(r);
	K(() => {
		h.current = r;
	}, [r]), K(() => {
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
	let g = d.status === "ready" && wt(d.data.status);
	K(() => {
		if (!g || l <= 0) return;
		let n = !1, r = window.setInterval(() => {
			h.current(e).then((e) => {
				n || (f({
					status: "ready",
					data: e
				}), e.pipelineName && t.setTitle(e.pipelineName));
			}, () => {});
		}, l);
		return () => {
			n = !0, window.clearInterval(r);
		};
	}, [
		g,
		l,
		e.kind,
		e.id
	]);
	let _ = G(() => m((e) => e + 1), []);
	if (d.status === "loading") return /* @__PURE__ */ Q("div", {
		className: "flex flex-col gap-3 p-3",
		"data-testid": `${u}-loading`,
		"aria-busy": "true",
		children: [
			/* @__PURE__ */ Z(O, {
				height: 20,
				width: "60%",
				rounded: "md"
			}),
			/* @__PURE__ */ Z(O, {
				height: 14,
				width: "40%",
				rounded: "md"
			}),
			/* @__PURE__ */ Z(O, { height: 96 }),
			/* @__PURE__ */ Z(O, { height: 44 })
		]
	});
	if (d.status === "error") return /* @__PURE__ */ Q("div", {
		className: "flex flex-col gap-2 p-3",
		"data-testid": `${u}-error`,
		children: [/* @__PURE__ */ Q(z, {
			tone: "error",
			children: ["Could not load this run: ", d.message]
		}), /* @__PURE__ */ Z(c, {
			size: "sm",
			variant: "secondary",
			onClick: _,
			className: "self-start",
			"data-testid": `${u}-retry`,
			children: "Try again"
		})]
	});
	let { data: v } = d;
	return /* @__PURE__ */ Z(kt, {
		data: v,
		onOpenFull: () => i(e, v),
		onOpenChat: a ? () => a(e, v) : void 0,
		onOpenDocument: o,
		onOpenResult: s,
		"data-testid": u
	});
}
function jt(e) {
	return (t, n) => /* @__PURE__ */ Z(At, {
		panel: t,
		api: n,
		options: e
	});
}
//#endregion
//#region src/components/social/chatCommands.ts
var Mt = /^chat:dmg?:/;
function Nt(e) {
	return e.channelKind ?? (Mt.test(e.channel) ? "dm" : "room");
}
function Pt(e, t) {
	let n = e.scope ?? "always";
	if (typeof n == "function") return n(t);
	switch (n) {
		case "always": return !0;
		case "document-open": return t.sidePanel.current?.kind === "document";
		case "room": return Nt(t) === "room";
		case "dm": return Nt(t) === "dm";
		default: return !0;
	}
}
function Ft(e) {
	if (e.disabledHint) return e.disabledHint;
	switch (e.scope) {
		case "document-open": return "Open a document beside the chat first";
		case "room": return "Only in rooms";
		case "dm": return "Only in direct messages";
		default: return e.hint ?? "Not available here";
	}
}
function It(e, t) {
	return e.map((e) => {
		let { run: n, scope: r, disabledHint: i, ...a } = e;
		return Pt({ scope: r }, t) ? a : {
			...a,
			disabled: !0,
			hint: Ft({
				scope: r,
				disabledHint: i,
				hint: a.hint
			})
		};
	});
}
function Lt(e, t) {
	let n = de(e, t);
	return n ? {
		command: n,
		argumentText: fe(e, n).trim()
	} : null;
}
var Rt = "doc", zt = "panel", Bt = "panel.";
function Vt(e) {
	return e instanceof URLSearchParams ? new URLSearchParams(e) : new URLSearchParams(e ?? "");
}
function Ht(e) {
	e.delete(Rt), e.delete(zt);
	for (let t of [...e.keys()]) t.startsWith(Bt) && e.delete(t);
}
function Ut(e, t) {
	let n = Vt(t);
	if (Ht(n), !e) return n;
	if (e.kind === "document") n.set(Rt, e.id);
	else {
		if (e.kind.includes(":")) throw Error(`A side panel kind cannot contain ':' (got "${e.kind}")`);
		n.set(zt, `${e.kind}:${e.id}`);
	}
	for (let [t, r] of Object.entries(e.params ?? {})) n.set(`${Bt}${t}`, r);
	return n;
}
function Wt(e) {
	let t = Vt(e), n = {};
	for (let [e, r] of t.entries()) e.startsWith(Bt) && (n[e.slice(6)] = r);
	let r = (e) => Object.keys(n).length ? {
		...e,
		params: n
	} : e, i = t.get(Rt);
	if (i) return r({
		kind: "document",
		id: i
	});
	let a = t.get(zt);
	if (!a) return null;
	let o = a.indexOf(":");
	return o <= 0 || o === a.length - 1 ? null : r({
		kind: a.slice(0, o),
		id: a.slice(o + 1)
	});
}
//#endregion
//#region src/components/social/ChatCommandProvider.tsx
var Gt = W(null);
function Kt(...e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) for (let e of n ?? []) t.set(e.trigger.toLowerCase(), e);
	return [...t.values()];
}
function qt({ commands: e, children: t }) {
	let n = pe(Gt), [r, i] = Y([]), a = G((e) => (i((t) => [...t, e]), () => i((t) => t.filter((t) => t !== e))), []), o = q(() => ({
		commands: Kt(n?.commands, e, ...r),
		register: a
	}), [
		n?.commands,
		e,
		r,
		a
	]);
	return /* @__PURE__ */ Z(Gt.Provider, {
		value: o,
		children: t
	});
}
function Jt() {
	return pe(Gt)?.commands ?? Yt;
}
var Yt = [];
function Xt(e) {
	let t = pe(Gt);
	if (!t) throw Error("useRegisterChatCommands needs a <ChatCommandProvider> above it");
	let { register: n } = t;
	K(() => {
		if (!(!e || e.length === 0)) return n(e);
	}, [n, e]);
}
function Zt() {
	let e = Jt();
	return G(async (t, n) => {
		let r = Lt(t, e);
		if (!r) return null;
		let { command: i, argumentText: a } = r;
		if (!Pt(i, n)) throw Error(`${i.trigger}: ${Ft(i)}`);
		return i.run({
			...n,
			text: t,
			argumentText: a
		});
	}, [e]);
}
//#endregion
//#region src/components/social/ChatSidePanelRegistry.tsx
var Qt = W(null);
function $t({ renderers: e, children: t }) {
	let n = pe(Qt), r = q(() => ({
		...n ?? {},
		...e ?? {}
	}), [n, e]);
	return /* @__PURE__ */ Z(Qt.Provider, {
		value: r,
		children: t
	});
}
function en() {
	return pe(Qt) ?? tn;
}
var tn = {};
function nn(e) {
	return en()[e] ?? null;
}
function rn({ title: e, subtitle: t, onClose: n, onOpenFullPage: r, actions: i, expanded: a = !1, onToggleExpanded: s, children: c, className: u, "data-testid": d = "chat-side-panel" }) {
	return /* @__PURE__ */ Q("section", {
		"aria-label": e,
		"data-testid": d,
		className: o("flex h-full min-h-0 flex-col border-l border-border bg-surface", u),
		children: [/* @__PURE__ */ Q("header", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-1.5",
			children: [/* @__PURE__ */ Q(w, {
				gap: "sm",
				align: "center",
				wrap: !1,
				className: "min-w-0",
				children: [/* @__PURE__ */ Q("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ Z("span", {
						className: "truncate text-[12px] font-semibold text-text-secondary",
						"data-testid": `${d}-title`,
						children: e
					}), t && /* @__PURE__ */ Z("span", {
						className: "truncate text-[11px] text-text-tertiary",
						"data-testid": `${d}-subtitle`,
						children: t
					})]
				}), /* @__PURE__ */ Q(w, {
					gap: "xs",
					align: "center",
					wrap: !1,
					className: "shrink-0",
					children: [
						s && /* @__PURE__ */ Z(L, {
							content: a ? "Show chat" : "Expand board",
							placement: "bottom",
							children: /* @__PURE__ */ Z(l, {
								size: "md",
								"aria-label": a ? "Show chat" : "Expand board",
								"aria-pressed": a,
								onClick: s,
								"data-testid": `${d}-expand`,
								children: /* @__PURE__ */ Z("svg", {
									width: "16",
									height: "16",
									viewBox: "0 0 16 16",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									"aria-hidden": "true",
									children: a ? /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z("rect", {
										x: "2",
										y: "2.5",
										width: "12",
										height: "11",
										rx: "1.5"
									}), /* @__PURE__ */ Z("path", { d: "M6 2.5v11" })] }) : /* @__PURE__ */ Z("path", { d: "M6 2H2v4M10 2h4v4M14 10v4h-4M6 14H2v-4" })
								})
							})
						}),
						r && /* @__PURE__ */ Z(L, {
							content: "Open full page",
							placement: "bottom",
							children: /* @__PURE__ */ Z(l, {
								size: "md",
								"aria-label": "Open full page",
								onClick: r,
								"data-testid": `${d}-open-full`,
								children: /* @__PURE__ */ Z("svg", {
									width: "16",
									height: "16",
									viewBox: "0 0 16 16",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									"aria-hidden": "true",
									children: /* @__PURE__ */ Z("path", { d: "M9 2h5v5M14 2 7 9M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3" })
								})
							})
						}),
						i
					]
				})]
			}), /* @__PURE__ */ Z(L, {
				content: "Close panel",
				placement: "bottom",
				children: /* @__PURE__ */ Z(l, {
					size: "md",
					"aria-label": "Close panel",
					onClick: n,
					"data-testid": `${d}-close`,
					className: "shrink-0",
					children: /* @__PURE__ */ Z(h, {})
				})
			})]
		}), /* @__PURE__ */ Z("div", {
			className: "min-h-0 flex-1 overflow-auto",
			children: c
		})]
	});
}
function an(e) {
	let t = e.replace(/[-_]+/g, " ").trim();
	return t ? t[0].toUpperCase() + t.slice(1) : "Panel";
}
function on({ panel: e, onClose: t, onOpenFullPage: n, subtitle: r, actions: i, expanded: a, onToggleExpanded: o, className: s, "data-testid": c = "chat-side-panel" }) {
	let l = nn(e.kind), [u, d] = Y(null), f = q(() => ({
		close: t,
		openFullPage: n ? () => n(e) : void 0,
		setTitle: d
	}), [
		t,
		n,
		e
	]), m = u || e.title || an(e.kind);
	return /* @__PURE__ */ Z(rn, {
		title: m,
		subtitle: r,
		actions: i,
		expanded: a,
		onToggleExpanded: o,
		onClose: t,
		onOpenFullPage: f.openFullPage,
		className: s,
		"data-testid": c,
		children: l ? /* @__PURE__ */ Z("div", {
			className: "flex h-full min-h-0 flex-col",
			"data-kind": e.kind,
			"data-id": e.id,
			children: l(e, f)
		}, `${e.kind}:${e.id}`) : /* @__PURE__ */ Z(D, {
			size: "sm",
			icon: /* @__PURE__ */ Z(p, { size: 28 }),
			title: `No view registered for ${e.kind}`,
			body: "Register a renderer for this kind with ChatSidePanelProvider.",
			testId: `${c}-empty`
		})
	});
}
//#endregion
//#region src/components/social/ChatBubbleStack.tsx
function sn({ bubble: e, onOpen: t, onDismiss: n, dismissAfterMs: r }) {
	return K(() => {
		let e = setTimeout(n, r);
		return () => clearTimeout(e);
	}, [e.id, r]), /* @__PURE__ */ Q("div", {
		role: "status",
		className: "pointer-events-auto flex w-80 max-w-[calc(100vw-2rem)] items-start gap-2.5 rounded-xl border border-border bg-surface p-3 shadow-lg",
		"data-testid": "chat-bubble",
		"data-bubble-id": e.id,
		children: [/* @__PURE__ */ Q("button", {
			type: "button",
			className: "flex min-w-0 flex-1 items-start gap-2.5 border-none bg-transparent p-0 text-left cursor-pointer",
			onClick: t,
			"aria-label": `Open the conversation: ${e.author} said ${e.text}`,
			children: [/* @__PURE__ */ Z(M, {
				name: e.author,
				size: 28,
				...e.avatarUrl ? { src: e.avatarUrl } : {},
				...e.color ? { color: e.color } : {}
			}), /* @__PURE__ */ Q("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ Q("span", {
					className: "flex items-baseline gap-1.5",
					children: [/* @__PURE__ */ Z("span", {
						className: "truncate text-[12px] font-semibold text-text-primary",
						children: e.author
					}), e.channelLabel && /* @__PURE__ */ Z("span", {
						className: "truncate text-[11px] text-text-tertiary",
						children: e.channelLabel
					})]
				}), /* @__PURE__ */ Z("span", {
					className: "line-clamp-3 text-[13px] leading-snug text-text-primary",
					children: e.text
				})]
			})]
		}), /* @__PURE__ */ Z("button", {
			type: "button",
			className: "shrink-0 border-none bg-transparent p-0.5 text-text-tertiary hover:text-text-primary cursor-pointer",
			"aria-label": "Dismiss",
			onClick: n,
			"data-testid": "chat-bubble-dismiss",
			children: "✕"
		})]
	});
}
function cn({ bubbles: e, onOpen: t, onDismiss: n, dismissAfterMs: r = 8e3, max: i = 3, className: a, "data-testid": s = "chat-bubble-stack" }) {
	let c = e.slice(-i);
	return c.length === 0 ? null : /* @__PURE__ */ Z("div", {
		className: o("pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2", a),
		"data-testid": s,
		"aria-live": "polite",
		children: c.map((e) => /* @__PURE__ */ Z(sn, {
			bubble: e,
			dismissAfterMs: r,
			onOpen: () => t(e.id),
			onDismiss: () => n(e.id)
		}, e.id))
	});
}
//#endregion
//#region src/components/social/ConversationStart.tsx
function ln({ d: e }) {
	return /* @__PURE__ */ Z("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.75",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: /* @__PURE__ */ Z("path", { d: e })
	});
}
var un = "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM12 8v6M9 11h6", dn = "M4 4h16v12H8l-4 4zM9 9h6M9 12h4", fn = "M22 2 11 13M22 2l-7 20-4-9-9-4z";
function pn({ items: e, onPick: t, disabled: n, searchAbove: r, kind: i, testId: a }) {
	let [o, s] = Y(""), c = q(() => {
		let t = o.trim().toLowerCase();
		return t ? e.filter((e) => e.label.toLowerCase().includes(t)) : e;
	}, [e, o]);
	return /* @__PURE__ */ Q(C, {
		gap: "none",
		children: [e.length > r && /* @__PURE__ */ Z("div", {
			className: "px-4 pb-1 pt-2",
			children: /* @__PURE__ */ Z(P, {
				value: o,
				onChange: s,
				placeholder: i === "room" ? "Find a room" : "Find a person",
				"data-testid": `${a}-search`
			})
		}), c.length === 0 ? /* @__PURE__ */ Q(B, {
			"data-testid": `${a}-none`,
			children: [
				"Nothing matches “",
				o.trim(),
				"”."
			]
		}) : c.map((e) => /* @__PURE__ */ Z(te, {
			label: e.label,
			icon: e.icon ?? (i === "person" ? /* @__PURE__ */ Z(M, {
				name: e.label,
				size: 20
			}) : void 0),
			onSelect: () => t(e.id),
			disabled: n,
			"data-testid": `${a}-option`
		}, e.id))]
	});
}
function mn({ title: e = "No conversation yet", body: t = "Whichever you choose, the conversation shows up here.", onStart: n, startLabel: r = "Start a conversation", startDescription: i = "A new room, named after this page", rooms: a = [], onAddToRoom: o, people: s = [], onShareWith: l, busy: u = !1, receipt: d = null, searchAbove: f = 6, "data-testid": p = "conversation-start" }) {
	return /* @__PURE__ */ Q(C, {
		gap: "none",
		className: "min-h-0 flex-1 overflow-y-auto",
		"data-testid": p,
		children: [
			/* @__PURE__ */ Q("div", {
				className: "px-4 pb-3 pt-4",
				children: [/* @__PURE__ */ Z("div", {
					className: "text-[13px] font-semibold text-text-primary",
					children: e
				}), /* @__PURE__ */ Z("p", {
					className: "m-0 mt-0.5 text-[12px] leading-snug text-text-secondary",
					children: t
				})]
			}),
			d && /* @__PURE__ */ Z("div", {
				className: "px-4 pb-3",
				children: /* @__PURE__ */ Z(T, {
					variant: d.tone,
					layout: "stacked",
					"data-testid": `${p}-receipt`,
					children: /* @__PURE__ */ Q("span", {
						className: "flex flex-wrap items-center gap-x-2 gap-y-1",
						children: [/* @__PURE__ */ Z("span", { children: d.text }), d.actionLabel && d.onAction && /* @__PURE__ */ Z(c, {
							variant: "ghost",
							size: "sm",
							onClick: d.onAction,
							"data-testid": `${p}-receipt-action`,
							children: d.actionLabel
						})]
					})
				})
			}),
			/* @__PURE__ */ Q(ne, {
				"data-testid": `${p}-choices`,
				children: [
					n && /* @__PURE__ */ Z(H, {
						icon: /* @__PURE__ */ Z(ln, { d: un }),
						title: r,
						description: i,
						onSelect: n,
						busy: u,
						"data-testid": `${p}-start`
					}),
					o && /* @__PURE__ */ Z(H, {
						icon: /* @__PURE__ */ Z(ln, { d: dn }),
						title: "Add to a room",
						description: a.length === 0 ? "No rooms yet" : `${a.length} room${a.length === 1 ? "" : "s"} your team is in`,
						disabled: a.length === 0,
						disabledReason: "There are no rooms to add it to yet",
						busy: u,
						"data-testid": `${p}-rooms`,
						children: /* @__PURE__ */ Z(pn, {
							items: a,
							onPick: o,
							disabled: u,
							searchAbove: f,
							kind: "room",
							testId: `${p}-rooms`
						})
					}),
					l && /* @__PURE__ */ Z(H, {
						icon: /* @__PURE__ */ Z(ln, { d: fn }),
						title: "Send to someone",
						description: s.length === 0 ? "Nobody to send to yet" : "It lands in their chat",
						disabled: s.length === 0,
						disabledReason: "There is nobody to send it to yet",
						busy: u,
						"data-testid": `${p}-people`,
						children: /* @__PURE__ */ Z(pn, {
							items: s,
							onPick: l,
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
var hn = 7, gn = 1, _n = 3650, vn = [
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
], yn = {
	none: "They see what is said from now on.",
	days: "A recent stretch of the conversation.",
	all: "Everything ever said here."
};
function bn({ open: e, conversationName: t, people: n, preselectedIds: r = [], busy: i = !1, anchor: a, placement: s = "bottom-end", onAdd: c, onClose: l, "data-testid": u = "add-to-chat-dialog", historyChoice: d = !0 }) {
	let [f, p] = Y(""), [m, g] = Y([...r]), [_, v] = Y("none"), [y, b] = Y(7), [x, S] = Y(!1), [C, w] = Y(null);
	K(() => {
		e && (p(""), g([...r]), v("none"), b(7), S(!1), w(null));
	}, [e, r.join("\n")]);
	let T = q(() => new Map(n.map((e) => [e.id, e])), [n]), E = q(() => {
		let e = f.trim().toLowerCase();
		return n.filter((t) => !e || t.name.toLowerCase().includes(e) || (t.subtitle ?? "").toLowerCase().includes(e));
	}, [n, f]), D = (e) => g((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), O = Number.isInteger(y) && y >= 1 && y <= 3650, k = i || x, A = m.length > 0 && (!d || _ !== "days" || O) && !k, j = async () => {
		if (A) {
			S(!0), w(null);
			try {
				await c(m, d ? _ === "days" ? {
					mode: _,
					days: y
				} : { mode: _ } : { mode: "all" }), l();
			} catch (e) {
				w(e instanceof Error ? e.message : String(e)), S(!1);
			}
		}
	};
	return /* @__PURE__ */ Q(I, {
		open: e,
		anchor: a,
		placement: s,
		width: "lg",
		title: "Add people",
		subtitle: t,
		submitLabel: m.length > 1 ? `Add ${m.length}` : "Add",
		submitTestId: `${u}-add`,
		submitDisabled: !A,
		busy: k,
		error: C,
		onSubmit: () => void j(),
		onClose: l,
		"data-testid": u,
		children: [
			/* @__PURE__ */ Z(P, {
				value: f,
				onChange: p,
				placeholder: "Enter a name",
				"aria-label": "Find people to add",
				className: "w-full",
				"data-testid": `${u}-search`
			}),
			m.length > 0 && /* @__PURE__ */ Z("div", {
				className: "flex flex-wrap gap-1",
				"data-testid": `${u}-picked`,
				children: m.map((e) => {
					let t = T.get(e);
					return /* @__PURE__ */ Q("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-primary-bg py-0.5 pl-0.5 pr-1 text-[11px] text-primary-fg",
						"data-testid": `${u}-picked-${e}`,
						children: [
							/* @__PURE__ */ Z(M, {
								name: t?.name ?? e,
								src: t?.avatarUrl,
								size: 16
							}),
							/* @__PURE__ */ Z("span", {
								className: "max-w-[9rem] truncate",
								children: t?.name ?? e
							}),
							/* @__PURE__ */ Z("button", {
								type: "button",
								"aria-label": `Remove ${t?.name ?? e}`,
								onClick: () => D(e),
								disabled: k,
								className: "inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border-none bg-transparent p-0 text-current hover:bg-black/10",
								"data-testid": `${u}-unpick-${e}`,
								children: /* @__PURE__ */ Z(h, { size: 9 })
							})
						]
					}, e);
				})
			}),
			/* @__PURE__ */ Q("ul", {
				role: "listbox",
				"aria-label": "People",
				"aria-multiselectable": "true",
				className: "m-0 max-h-44 list-none overflow-y-auto rounded-md border border-border p-0",
				"data-testid": `${u}-people`,
				children: [E.length === 0 && /* @__PURE__ */ Z("li", {
					className: "px-2.5 py-2 text-[11px] text-text-tertiary",
					"data-testid": `${u}-nobody`,
					children: n.length === 0 ? "Everyone is already here." : "Nobody by that name."
				}), E.map((e) => {
					let t = m.includes(e.id);
					return /* @__PURE__ */ Z("li", {
						role: "option",
						"aria-selected": t,
						children: /* @__PURE__ */ Q("button", {
							type: "button",
							onClick: () => D(e.id),
							disabled: k,
							className: o("flex w-full items-center gap-2 border-none bg-transparent px-2.5 py-1.5 text-left font-[inherit] text-[13px] hover:bg-surface-hover", t && "bg-surface-inset"),
							"data-testid": `${u}-person-${e.id}`,
							children: [
								/* @__PURE__ */ Z(M, {
									name: e.name,
									src: e.avatarUrl,
									size: 22
								}),
								/* @__PURE__ */ Q("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ Z("span", {
										className: "block truncate leading-tight text-text-primary",
										children: e.name
									}), e.subtitle && /* @__PURE__ */ Z("span", {
										className: "block truncate text-[11px] leading-tight text-text-tertiary",
										children: e.subtitle
									})]
								}),
								/* @__PURE__ */ Z("span", {
									className: o("text-[11px]", t ? "text-primary" : "text-transparent"),
									"aria-hidden": "true",
									children: "✓"
								})
							]
						})
					}, e.id);
				})]
			}),
			d && /* @__PURE__ */ Z(F, {
				label: "Chat history",
				hint: _ === "days" ? void 0 : yn[_],
				"data-testid": `${u}-history-field`,
				children: /* @__PURE__ */ Z(R, {
					size: "sm",
					fullWidth: !0,
					disabled: k,
					"aria-label": "How much chat history they get",
					options: vn,
					value: _,
					onChange: (e) => v(e),
					"data-testid": `${u}-history`
				})
			}),
			d && _ === "days" && /* @__PURE__ */ Q("div", {
				className: "flex items-center gap-2 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ Z("span", { children: "The past" }),
					/* @__PURE__ */ Z("input", {
						type: "number",
						min: 1,
						max: 3650,
						value: Number.isFinite(y) ? y : "",
						disabled: k,
						"aria-label": "Number of days of history",
						onChange: (e) => b(e.target.value === "" ? NaN : Number(e.target.value)),
						className: o("h-7 w-16 rounded-md border bg-surface px-2 text-[12px] text-text-primary", O ? "border-border" : "border-danger-fg"),
						"data-testid": `${u}-days`
					}),
					/* @__PURE__ */ Z("span", { children: "days" }),
					!O && /* @__PURE__ */ Q("span", {
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
function xn(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `Added ${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})}`;
}
function Sn({ members: e, open: t = !1, canManage: n = !1, currentUserId: r, onAdd: i, onRemove: a, className: s, "data-testid": d = "members-panel" }) {
	let f = [...e].sort((e, t) => e.role === t.role ? e.name.localeCompare(t.name) : e.role === "owner" ? -1 : 1);
	return /* @__PURE__ */ Q("div", {
		className: o("flex min-h-0 flex-col", s),
		"data-testid": d,
		"data-open": String(t),
		children: [/* @__PURE__ */ Q("div", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-2",
			children: [/* @__PURE__ */ Z("span", {
				className: "text-xs text-text-tertiary",
				"data-testid": `${d}-count`,
				children: t ? "Open channel" : `${e.length} ${e.length === 1 ? "member" : "members"}`
			}), i && /* @__PURE__ */ Z(c, {
				variant: "secondary",
				size: "sm",
				onClick: (e) => i(e.currentTarget),
				"data-testid": `${d}-add`,
				children: /* @__PURE__ */ Q("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ Z(u, { size: 12 }), " Add people"]
				})
			})]
		}), t && e.length === 0 ? /* @__PURE__ */ Z(D, {
			size: "sm",
			title: "Everyone can read this channel.",
			body: "Add people to make it members-only.",
			...i ? {
				actionLabel: "Add people",
				onAction: () => i()
			} : {},
			testId: `${d}-empty`
		}) : /* @__PURE__ */ Z("ul", {
			className: "m-0 min-h-0 flex-1 list-none overflow-y-auto p-0",
			"data-testid": `${d}-list`,
			children: f.map((e) => {
				let t = e.id === r, i = !!a && (n || t);
				return /* @__PURE__ */ Q("li", {
					className: "flex items-center gap-2 px-3 py-2",
					"data-testid": `${d}-member-${e.id}`,
					children: [
						/* @__PURE__ */ Z(M, {
							name: e.name,
							src: e.avatarUrl,
							size: 28
						}),
						/* @__PURE__ */ Q("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ Q("span", {
								className: "block truncate text-sm text-text-primary",
								children: [e.name, t && /* @__PURE__ */ Z("span", {
									className: "text-text-tertiary",
									children: " (you)"
								})]
							}), e.addedAt && /* @__PURE__ */ Z("span", {
								className: "block truncate text-xs text-text-tertiary",
								children: xn(e.addedAt)
							})]
						}),
						e.role === "owner" && /* @__PURE__ */ Z(E, {
							tone: "neutral",
							size: "xs",
							"data-testid": `${d}-owner-${e.id}`,
							children: "Owner"
						}),
						i && /* @__PURE__ */ Z(l, {
							"aria-label": t ? "Leave" : `Remove ${e.name}`,
							title: t ? "Leave" : "Remove",
							variant: "ghost",
							size: "sm",
							onClick: () => a?.(e.id),
							icon: /* @__PURE__ */ Z(h, { size: 12 }),
							"data-testid": `${d}-remove-${e.id}`
						})
					]
				}, e.id);
			})
		})]
	});
}
//#endregion
//#region src/components/social/ActivePeopleGrid.tsx
var Cn = 40, wn = {
	online: "online",
	busy: "busy",
	away: "away"
}, $ = "flex w-full min-w-0 flex-col items-center gap-1 rounded-lg p-1 text-center", Tn = "cursor-pointer border-0 bg-transparent hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1";
function En(e) {
	let t = e.trim();
	return t ? t.split(/\s+/)[0] : e;
}
function Dn(e) {
	let t = e.status ?? "online", n = [e.displayName, wn[t]];
	return e.activity && n.push(e.activity), e.inCall && n.push("in a call"), n.join(", ");
}
function On({ person: e, testId: t }) {
	let n = e.status ?? "online";
	return /* @__PURE__ */ Q("span", {
		className: "relative inline-flex shrink-0",
		children: [
			/* @__PURE__ */ Z(M, {
				name: e.displayName,
				src: e.avatarUrl,
				size: Cn,
				className: o(e.inCall && "ring-2 ring-primary ring-offset-2 ring-offset-[var(--color-surface)]")
			}),
			/* @__PURE__ */ Z(N, {
				state: n,
				className: "absolute -bottom-0.5 -right-0.5 rounded-full ring-2 ring-[var(--color-surface)]"
			}),
			e.activity && /* @__PURE__ */ Z("span", {
				"aria-hidden": "true",
				"data-testid": `${t}-activity-glyph`,
				className: "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-surface-emphasis text-text-secondary ring-2 ring-[var(--color-surface)]",
				children: /* @__PURE__ */ Z(b, { size: 9 })
			}),
			e.workSharing && /* @__PURE__ */ Z("span", {
				"aria-hidden": "true",
				"data-testid": `${t}-work-sharing-marker`,
				"data-sharing-state": e.workSharing.state,
				"data-sharing-fresh": e.workSharing.fresh ? "true" : "false",
				className: o("absolute -bottom-1 -left-1 h-3 w-3 rounded-full border-2 border-[var(--color-surface)] bg-primary", e.workSharing.state === "historical" && "bg-text-tertiary", e.workSharing.state === "active" && e.workSharing.fresh && "animate-pulse motion-reduce:animate-none")
			})
		]
	});
}
function kn({ people: e, maxVisible: t = 8, onSelectPerson: n, onShowAll: r, onSelectSharedWork: i, emptyLabel: a = "Nobody is around right now.", className: s, "data-testid": c = "active-people-grid" }) {
	if (e.length === 0) return /* @__PURE__ */ Z("p", {
		"data-testid": `${c}-empty`,
		className: o("text-[12px] text-text-tertiary", s),
		children: a
	});
	let l = e.slice(0, t), u = e.length - l.length;
	return /* @__PURE__ */ Q("div", {
		"data-testid": c,
		role: "list",
		"aria-label": "Active now",
		className: o("grid grid-cols-4 gap-x-1 gap-y-2", s),
		children: [l.map((e) => {
			let t = `${c}-person-${e.userId}`, r = Dn(e), a = /* @__PURE__ */ Q("span", {
				className: "flex w-full min-w-0 items-center justify-center gap-1",
				children: [e.inCall && /* @__PURE__ */ Z("span", {
					"aria-hidden": "true",
					"data-testid": `${t}-live`,
					className: "h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
				}), /* @__PURE__ */ Z("span", {
					className: "min-w-0 truncate text-[11px] font-medium text-text-primary",
					children: En(e.displayName)
				})]
			});
			if (e.workSharing && i) {
				let s = n ? /* @__PURE__ */ Q("button", {
					type: "button",
					onClick: () => n(e.userId),
					title: r,
					"aria-label": r,
					"data-testid": t,
					className: o($, Tn),
					children: [/* @__PURE__ */ Z(On, {
						person: e,
						testId: t
					}), a]
				}) : /* @__PURE__ */ Q("div", {
					title: r,
					"aria-label": r,
					"data-testid": t,
					className: $,
					children: [/* @__PURE__ */ Z(On, {
						person: e,
						testId: t
					}), a]
				});
				return /* @__PURE__ */ Q("div", {
					role: "listitem",
					className: "relative min-w-0",
					children: [s, /* @__PURE__ */ Z("button", {
						type: "button",
						onClick: () => i(e.userId),
						"aria-label": `View ${e.displayName}'s ${e.workSharing.state === "historical" ? "shared work history" : "shared work"}`,
						className: "mt-1 w-full truncate rounded px-1 text-[10px] font-medium text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
						children: e.workSharing.state === "historical" ? "History" : "Active now"
					})]
				}, e.userId);
			}
			return n ? /* @__PURE__ */ Q("button", {
				type: "button",
				role: "listitem",
				onClick: () => n(e.userId),
				title: r,
				"aria-label": r,
				"data-testid": t,
				className: o($, Tn),
				children: [/* @__PURE__ */ Z(On, {
					person: e,
					testId: t
				}), a]
			}, e.userId) : /* @__PURE__ */ Q("div", {
				role: "listitem",
				title: r,
				"aria-label": r,
				"data-testid": t,
				className: $,
				children: [/* @__PURE__ */ Z(On, {
					person: e,
					testId: t
				}), a]
			}, e.userId);
		}), u > 0 && (r ? /* @__PURE__ */ Q("button", {
			type: "button",
			onClick: r,
			"aria-label": `${u} more people`,
			"data-testid": `${c}-more`,
			className: o($, Tn),
			children: [/* @__PURE__ */ Q("span", {
				className: "flex h-10 w-10 items-center justify-center rounded-full bg-surface-emphasis text-[12px] font-semibold text-text-secondary",
				children: ["+", u]
			}), /* @__PURE__ */ Z("span", {
				className: "w-full min-w-0 truncate text-[11px] font-medium text-text-tertiary",
				children: "More"
			})]
		}) : /* @__PURE__ */ Q("div", {
			"data-testid": `${c}-more`,
			className: $,
			children: [/* @__PURE__ */ Q("span", {
				className: "flex h-10 w-10 items-center justify-center rounded-full bg-surface-emphasis text-[12px] font-semibold text-text-secondary",
				children: ["+", u]
			}), /* @__PURE__ */ Z("span", {
				className: "w-full min-w-0 truncate text-[11px] font-medium text-text-tertiary",
				children: "More"
			})]
		}))]
	});
}
//#endregion
//#region src/components/social/TeamChannelTree.tsx
function An(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
}
function jn(e) {
	return [...e].sort((e, t) => Number(!!t.pinned) - Number(!!e.pinned));
}
function Mn({ teams: e, activeChannel: t = null, onSelectChannel: n, onToggleTeam: r, onCreateChannel: i, onManageTeam: a, onLeaveTeam: s, onTogglePinTeam: c, onTogglePinChannel: l, onCreateTeam: d, heading: p = "Teams", filter: h, collapsed: g = !1, onToggleCollapse: _, className: v, "data-testid": b = "team-channel-tree" }) {
	let x = p !== !1 && _ !== void 0, S = x && g, C = me(), w = `${C}teams-toggle`, T = `${C}teams`, E = r !== void 0, [D, O] = Y(() => new Set(e.filter((e) => e.expanded).map((e) => e.teamId))), k = J(null), [A, j] = Y(null), N = (e) => L ? !0 : E ? !!e.expanded : D.has(e.teamId), P = (e, t) => {
		r?.(e, t), !E && O((n) => {
			if (n.has(e) === t) return n;
			let r = new Set(n);
			return t ? r.add(e) : r.delete(e), r;
		});
	}, F = (t) => {
		let n = e.find((e) => e.teamId === t);
		n && P(t, !N(n));
	}, I = h?.trim().toLowerCase() ?? "", L = I.length > 0, R = jn(L ? e.reduce((e, t) => {
		let n = t.name.toLowerCase().includes(I), r = n ? t.channels : t.channels.filter((e) => e.name.toLowerCase().includes(I));
		return (n || r.length > 0) && e.push({
			...t,
			channels: r
		}), e;
	}, []) : e), z = [];
	for (let e of S ? [] : R) if (z.push({
		id: `team:${e.teamId}`,
		kind: "team",
		teamId: e.teamId
	}), N(e)) for (let t of jn(e.channels)) z.push({
		id: `channel:${t.channel}`,
		kind: "channel",
		teamId: e.teamId,
		channel: t.channel
	});
	let B = A && z.some((e) => e.id === A) ? A : t && z.some((e) => e.kind === "channel" && e.channel === t) ? `channel:${t}` : z[0]?.id ?? null, V = (e) => {
		e && (j(e), k.current?.querySelector(`[data-row-id="${An(e)}"]`)?.focus());
	}, te = (t) => {
		let r = t.target.closest("[role=\"treeitem\"]")?.dataset.rowId;
		if (!r) return;
		let i = z.findIndex((e) => e.id === r);
		if (i < 0) return;
		let a = z[i], o = e.find((e) => e.teamId === a.teamId);
		if (o) switch (t.key) {
			case "ArrowDown":
				t.preventDefault(), V(z[Math.min(i + 1, z.length - 1)]?.id ?? null);
				return;
			case "ArrowUp":
				t.preventDefault(), V(z[Math.max(i - 1, 0)]?.id ?? null);
				return;
			case "Home":
				t.preventDefault(), V(z[0]?.id ?? null);
				return;
			case "End":
				t.preventDefault(), V(z[z.length - 1]?.id ?? null);
				return;
			case "ArrowRight":
				if (t.preventDefault(), a.kind === "team") {
					if (!N(o)) P(o.teamId, !0);
					else {
						let e = z[i + 1];
						e && e.kind === "channel" && e.teamId === o.teamId && V(e.id);
					}
				}
				return;
			case "ArrowLeft":
				t.preventDefault(), a.kind === "team" ? N(o) && P(o.teamId, !1) : (P(a.teamId, !1), V(`team:${a.teamId}`));
				return;
			case "Enter":
			case " ":
				t.preventDefault(), a.kind === "team" ? F(a.teamId) : n(a.channel);
				return;
		}
	};
	return /* @__PURE__ */ Q("div", {
		className: o("flex flex-col", v),
		children: [p !== !1 && /* @__PURE__ */ Z(Ee, {
			label: p,
			presentational: !1,
			className: "pt-2",
			...x ? {
				collapsed: g,
				onToggleCollapse: _,
				controls: T,
				toggleId: w,
				collapsedCount: e.reduce((e, t) => e + t.channels.reduce((e, t) => e + (t.unreadCount ?? 0), 0), 0)
			} : {},
			actions: d ? [{
				label: "Create a team",
				onClick: (e) => d(e),
				"data-testid": `${b}-create-team`
			}] : [],
			"data-testid": `${b}-heading`
		}), /* @__PURE__ */ Z("div", {
			ref: k,
			role: "tree",
			id: x ? T : void 0,
			"aria-label": p === !1 ? "Teams" : void 0,
			"aria-labelledby": x ? w : void 0,
			className: "flex flex-col gap-0.5",
			"data-testid": b,
			onKeyDown: te,
			children: !S && R.map((e) => {
				let r = N(e), d = `team:${e.teamId}`, p = B === d, h = [];
				return a && h.push({
					label: "Manage team",
					onSelect: () => a(e.teamId),
					"data-testid": `${b}-team-${e.teamId}-menu-manage`
				}), c && h.push({
					label: e.pinned ? "Unpin" : "Pin",
					icon: /* @__PURE__ */ Z(f, { size: 14 }),
					onSelect: () => c(e.teamId, !e.pinned),
					"data-testid": `${b}-team-${e.teamId}-menu-pin`
				}), s && h.push({
					label: "Leave team",
					onSelect: () => s(e.teamId),
					"data-testid": `${b}-team-${e.teamId}-menu-leave`
				}), /* @__PURE__ */ Q("div", { children: [/* @__PURE__ */ Q("div", {
					role: "treeitem",
					"aria-expanded": r,
					"aria-level": 1,
					tabIndex: p ? 0 : -1,
					"data-row-id": d,
					"data-testid": `${b}-team-${e.teamId}`,
					onClick: () => F(e.teamId),
					onFocus: () => j(d),
					className: o("group flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left", "hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"),
					children: [
						/* @__PURE__ */ Z(y, {
							dir: r ? "down" : "right",
							size: 14,
							className: "shrink-0 text-text-tertiary transition-transform"
						}),
						/* @__PURE__ */ Z(M, {
							name: e.name,
							src: e.avatarUrl,
							size: 22
						}),
						/* @__PURE__ */ Q("span", {
							className: "flex min-w-0 flex-1 items-center gap-1.5",
							children: [/* @__PURE__ */ Z("span", {
								className: "min-w-0 truncate text-[13px] font-semibold text-text-primary",
								children: e.name
							}), e.pinned && /* @__PURE__ */ Z("span", {
								"data-testid": `${b}-team-${e.teamId}-pinned`,
								title: "Pinned",
								className: "shrink-0 text-text-tertiary",
								children: /* @__PURE__ */ Z(f, { size: 12 })
							})]
						}),
						i && /* @__PURE__ */ Z("button", {
							type: "button",
							title: `Create a channel in ${e.name}`,
							"aria-label": `Create a channel in ${e.name}`,
							tabIndex: p ? 0 : -1,
							onClick: (t) => {
								t.stopPropagation(), i(e.teamId, t.currentTarget);
							},
							"data-testid": `${b}-team-${e.teamId}-add-channel`,
							className: o("grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-md border-none bg-transparent p-0", "text-text-secondary hover:bg-surface-hover hover:text-text-primary", "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", "[@media(hover:none)]:opacity-100", "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: /* @__PURE__ */ Z(u, { size: 14 })
						}),
						h.length > 0 && /* @__PURE__ */ Z("span", {
							onClick: (e) => e.stopPropagation(),
							className: o("shrink-0 opacity-0 transition-opacity", "group-hover:opacity-100 group-focus-within:opacity-100", "has-[[aria-expanded=true]]:opacity-100", "[@media(hover:none)]:opacity-100"),
							children: /* @__PURE__ */ Z(ee, {
								trigger: /* @__PURE__ */ Z("span", {
									"aria-hidden": !0,
									className: "leading-none tracking-wide",
									children: "⋯"
								}),
								triggerLabel: `More options for ${e.name}`,
								triggerTitle: "More options",
								triggerTabIndex: p ? 0 : -1,
								triggerTestId: `${b}-team-${e.teamId}-menu`,
								triggerClassName: "h-6 w-6 rounded-md border-0 p-0 text-[13px] text-text-secondary hover:bg-surface-hover",
								align: "end",
								sections: [{ items: h }],
								"data-testid": `${b}-team-${e.teamId}-menu-panel`
							})
						})
					]
				}), r && jn(e.channels).map((e) => {
					let r = `channel:${e.channel}`, i = B === r, a = e.channel === t, s = e.unreadCount ?? 0, c = !!e.muted;
					return /* @__PURE__ */ Q("div", {
						role: "treeitem",
						"aria-level": 2,
						"aria-selected": a,
						tabIndex: i ? 0 : -1,
						"data-row-id": r,
						"data-testid": `${b}-channel-${e.channel}`,
						"data-active": a ? "true" : "false",
						onClick: () => n(e.channel),
						onFocus: () => j(r),
						className: o("group flex w-full cursor-pointer items-center gap-2 rounded-md py-1.5 pl-8 pr-2 text-left text-[13px]", "hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", a && "bg-surface-hover"),
						children: [
							/* @__PURE__ */ Z("span", {
								"aria-hidden": !e.private,
								className: "flex h-4 w-4 shrink-0 items-center justify-center text-text-tertiary",
								children: e.private ? /* @__PURE__ */ Z(m, { size: 12 }) : "#"
							}),
							/* @__PURE__ */ Q("span", {
								className: "flex min-w-0 flex-1 items-center gap-1.5",
								children: [/* @__PURE__ */ Z("span", {
									className: o("min-w-0 truncate", s > 0 ? "font-semibold" : "font-medium", "text-text-primary"),
									children: e.name
								}), e.pinned && /* @__PURE__ */ Z("span", {
									"data-testid": `${b}-channel-${e.channel}-pinned`,
									title: "Pinned",
									className: "shrink-0 text-text-tertiary",
									children: /* @__PURE__ */ Z(f, { size: 12 })
								})]
							}),
							e.mentioned && /* @__PURE__ */ Z("span", {
								"data-testid": `${b}-channel-${e.channel}-mention`,
								"aria-label": "You were mentioned",
								title: "You were mentioned",
								className: "grid h-4 w-4 shrink-0 place-items-center rounded-full bg-danger text-[10px] font-bold leading-none text-white",
								children: "@"
							}),
							e.live && /* @__PURE__ */ Z("span", {
								"data-testid": `${b}-channel-${e.channel}-live`,
								"aria-label": "Call in progress",
								title: "Call in progress",
								className: "inline-flex shrink-0 items-center gap-1 rounded-full bg-danger px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none tracking-wide text-white",
								children: "Live"
							}),
							s > 0 && /* @__PURE__ */ Z("span", {
								"data-testid": `${b}-channel-${e.channel}-unread`,
								"data-muted": c ? "true" : "false",
								className: o("grid h-5 min-w-5 shrink-0 place-items-center rounded-full px-1.5 text-[11px] font-semibold leading-none", c ? "bg-surface-inset text-text-secondary" : "bg-primary text-white"),
								children: s > 99 ? "99+" : s
							}),
							l && /* @__PURE__ */ Z("button", {
								type: "button",
								title: e.pinned ? "Unpin" : "Pin",
								"aria-label": `${e.pinned ? "Unpin" : "Pin"} ${e.name}`,
								tabIndex: i ? 0 : -1,
								onClick: (t) => {
									t.stopPropagation(), l(e.channel, !e.pinned);
								},
								"data-testid": `${b}-channel-${e.channel}-pin-toggle`,
								className: o("grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-md border-none bg-transparent p-0", "text-text-secondary hover:bg-surface-hover hover:text-text-primary", "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", "[@media(hover:none)]:opacity-100", "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
								children: /* @__PURE__ */ Z(f, { size: 12 })
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
var Nn = 80, Pn = [{
	label: "Standard",
	value: "standard"
}, {
	label: "Private",
	value: "private",
	icon: /* @__PURE__ */ Z(m, { size: 12 })
}];
function Fn({ open: e, teamName: t, busy: n = !1, anchor: r, placement: i = "right", onCreate: a, onClose: o, "data-testid": s = "create-channel-dialog" }) {
	let [c, l] = Y(""), [u, d] = Y(""), [f, p] = Y("standard"), [m, h] = Y(!1), [g, _] = Y(null);
	K(() => {
		e && (l(""), d(""), p("standard"), h(!1), _(null));
	}, [e]);
	let v = c.trim(), y = n || m, b = v.length > 0 && v.length <= Nn && !y, x = async () => {
		if (b) {
			h(!0), _(null);
			try {
				await a({
					name: v,
					description: u.trim() || void 0,
					privacy: f
				}), o();
			} catch (e) {
				_(e instanceof Error ? e.message : String(e)), h(!1);
			}
		}
	};
	return /* @__PURE__ */ Q(I, {
		open: e,
		anchor: r,
		placement: i,
		icon: /* @__PURE__ */ Z("span", {
			className: "text-[13px] font-semibold leading-none",
			children: "#"
		}),
		title: "Create a channel",
		subtitle: t,
		submitLabel: "Create",
		submitTestId: `${s}-create`,
		submitDisabled: !b,
		busy: y,
		error: g,
		onSubmit: () => void x(),
		onClose: o,
		"data-testid": s,
		children: [
			/* @__PURE__ */ Z(F, {
				label: "Name",
				"data-testid": `${s}-name-field`,
				children: /* @__PURE__ */ Z(k, {
					size: "sm",
					value: c,
					maxLength: Nn,
					disabled: y,
					placeholder: "e.g. design-reviews",
					onChange: (e) => l(e.target.value),
					"data-testid": `${s}-name`
				})
			}),
			/* @__PURE__ */ Z(F, {
				label: "Description",
				"data-testid": `${s}-description-field`,
				children: /* @__PURE__ */ Z(A, {
					value: u,
					rows: 2,
					disabled: y,
					placeholder: "What is this channel for?",
					onChange: (e) => d(e.target.value),
					"data-testid": `${s}-description`
				})
			}),
			/* @__PURE__ */ Z(F, {
				label: "Privacy",
				hint: f === "private" ? "Only people you add can see it." : "Everyone on the team can see it.",
				"data-testid": `${s}-privacy-field`,
				children: /* @__PURE__ */ Z(R, {
					size: "sm",
					fullWidth: !0,
					disabled: y,
					"aria-label": "Channel privacy",
					options: Pn,
					value: f,
					onChange: (e) => p(e),
					"data-testid": `${s}-privacy`
				})
			})
		]
	});
}
//#endregion
//#region src/components/social/NewChatDialog.tsx
function In({ open: e, candidates: t, anchor: n, placement: r = "bottom-start", busy: i = !1, error: a = null, onStart: o, onClose: s, "data-testid": c = "new-chat" }) {
	return e ? /* @__PURE__ */ Z(he, {
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
		children: ({ list: t, confirm: o }) => /* @__PURE__ */ Z(I, {
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
			children: /* @__PURE__ */ Z("div", {
				className: "-mx-1 max-h-[min(22rem,50vh)] overflow-y-auto px-1",
				children: t
			})
		})
	}) : null;
}
//#endregion
//#region src/components/social/CreateTeamDialog.tsx
var Ln = 80, Rn = [{
	label: "Org-wide",
	value: "org"
}, {
	label: "Private",
	value: "private",
	icon: /* @__PURE__ */ Z(m, { size: 12 })
}];
function zn({ open: e, busy: t = !1, anchor: n, placement: r = "bottom-end", onCreate: i, onClose: a, "data-testid": o = "create-team-dialog" }) {
	let [s, c] = Y(""), [l, u] = Y(""), [d, f] = Y("org"), [p, m] = Y(!1), [h, g] = Y(null);
	K(() => {
		e && (c(""), u(""), f("org"), m(!1), g(null));
	}, [e]);
	let _ = s.trim(), v = t || p, y = _.length > 0 && _.length <= Ln && !v, b = async () => {
		if (y) {
			m(!0), g(null);
			try {
				await i({
					name: _,
					description: l.trim() || void 0,
					visibility: d
				}), a();
			} catch (e) {
				g(e instanceof Error ? e.message : String(e)), m(!1);
			}
		}
	};
	return /* @__PURE__ */ Q(I, {
		open: e,
		anchor: n,
		placement: r,
		title: "Create a team",
		subtitle: "A team gets a General channel to start",
		submitLabel: "Create",
		submitTestId: `${o}-create`,
		submitDisabled: !y,
		busy: v,
		error: h,
		onSubmit: () => void b(),
		onClose: a,
		"data-testid": o,
		children: [
			/* @__PURE__ */ Z(F, {
				label: "Name",
				"data-testid": `${o}-name-field`,
				children: /* @__PURE__ */ Z(k, {
					size: "sm",
					value: s,
					maxLength: Ln,
					disabled: v,
					placeholder: "e.g. Design",
					onChange: (e) => c(e.target.value),
					"data-testid": `${o}-name`
				})
			}),
			/* @__PURE__ */ Z(F, {
				label: "Description",
				"data-testid": `${o}-description-field`,
				children: /* @__PURE__ */ Z(A, {
					value: l,
					rows: 2,
					disabled: v,
					placeholder: "What does this team work on?",
					onChange: (e) => u(e.target.value),
					"data-testid": `${o}-description`
				})
			}),
			/* @__PURE__ */ Z(F, {
				label: "Who can join",
				hint: d === "private" ? "People need an invitation." : "Anyone in the org can join.",
				"data-testid": `${o}-visibility-field`,
				children: /* @__PURE__ */ Z(R, {
					size: "sm",
					fullWidth: !0,
					disabled: v,
					"aria-label": "Team visibility",
					options: Rn,
					value: d,
					onChange: (e) => f(e),
					"data-testid": `${o}-visibility`
				})
			})
		]
	});
}
//#endregion
export { ge as $, Ut as A, vt as B, Zt as C, Pt as D, It as E, Ct as F, Le as G, nt as H, St as I, Oe as J, Ie as K, xt as L, kt as M, jt as N, Lt as O, wt as P, Ce as Q, bt as R, Xt as S, Ft as T, Je as U, dt as V, Ue as W, Te as X, Ee as Y, we as Z, nn as _, kn as a, Kt as b, hn as c, mn as d, he as et, cn as f, an as g, $t as h, Mn as i, At as j, Wt as k, _n as l, rn as m, In as n, Sn as o, on as p, Fe as q, Fn as r, bn as s, zn as t, gn as u, en as v, Nt as w, Jt as x, qt as y, yt as z };
