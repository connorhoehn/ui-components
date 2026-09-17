import { a as e, i as t, n, o as r, r as i, t as a } from "./useSocialProfile-5S1qyvsv.js";
import { n as o } from "./ToastProvider-BKjV21G4.js";
import { t as s } from "./cn-DhjIN-s0.js";
import { t as c } from "./Button-BhS4-R6_.js";
import { t as l } from "./IconButton-C3DMtvSx.js";
import { P as u, S as d, b as f, c as p, g as m, r as h, s as g, t as _, u as v, w as y, x as b } from "./Icons-dYlqbmVH.js";
import { a as x, i as S, n as C, o as w, r as T, t as E } from "./PopoverForm-Dc-_KS0a.js";
import { t as D } from "./Banner-C3Wgh62A.js";
import { t as O } from "./Chip-BENLwTlq.js";
import { t as k } from "./EmptyState-JzzL2z1E.js";
import { t as A } from "./SkeletonCard-CGe8XFPB.js";
import { t as j } from "./Input-DLknWXri.js";
import { t as M } from "./Textarea-Dz4doxTv.js";
import { n as N, t as P } from "./Avatar-BzicCOft.js";
import { t as F } from "./SegmentedControl-18MqeMsn.js";
import { t as I } from "./InlineAlert-Myf3oJZf.js";
import { t as ee } from "./DropdownMenu--cgRPg4y.js";
import { t as te } from "./InlinePlaceholder-51dbPRGn.js";
import { t as L } from "./Select-CqVokE2v.js";
import { n as ne, r as R, t as re } from "./ChoiceList-CaZ4rZrS.js";
import { L as z, N as B, Q as ie, R as V, X as H, nt as ae } from "./ConversationSurface-B804ZlZF.js";
import { t as U } from "./rovingFocus-Bj5Y6kwY.js";
import { n as oe, t as se } from "./ReactionPickerPopover-CcL-n6gt.js";
import { n as ce, t as le } from "./composerCommands-DXer0id_.js";
import { createContext as ue, useCallback as W, useContext as G, useEffect as K, useId as q, useMemo as J, useRef as Y, useState as X } from "react";
import { Fragment as Z, jsx as Q, jsxs as $ } from "react/jsx-runtime";
//#region src/components/hangout/InviteCandidateList.tsx
function de({ candidates: e, onInvite: t, loading: n = !1, resetKey: r, children: i, tone: a = "light", searchable: o = !1, grouped: l = !1, selectMode: u = "multi", onPick: d, confirmLabel: f = "Invite", confirmLoadingLabel: p = "Inviting…", confirmCountLabel: m, className: h, "data-testid": g }) {
	let _ = a === "dark", v = u === "single", [y, b] = X(() => /* @__PURE__ */ new Set()), [x, C] = X("");
	K(() => {
		b(/* @__PURE__ */ new Set()), C("");
	}, [r]);
	let w = J(() => e.filter((e) => !e.alreadyInCall), [e]);
	K(() => {
		b((e) => {
			if (e.size === 0) return e;
			let t = new Set(w.map((e) => e.userId)), n = !1, r = /* @__PURE__ */ new Set();
			for (let i of e) t.has(i) ? r.add(i) : n = !0;
			return n ? r : e;
		});
	}, [w]);
	let T = J(() => {
		let t = x.trim().toLowerCase();
		return !o || !t ? e : e.filter((e) => e.name.toLowerCase().includes(t) || e.userId.toLowerCase().includes(t));
	}, [
		e,
		o,
		x
	]), E = (e) => {
		b((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), n;
		});
	}, D = y.size, O = (e) => {
		let t = !!e.alreadyInCall || !!e.disabled || n, r = !v && y.has(e.userId);
		return /* @__PURE__ */ Q("li", { children: /* @__PURE__ */ $("button", {
			type: "button",
			disabled: t,
			"aria-pressed": v ? void 0 : r,
			onClick: () => {
				v ? d?.(e.userId) : E(e.userId);
			},
			"data-testid": "invite-candidate",
			"data-user-id": e.userId,
			"data-selected": r ? "true" : "false",
			"data-already-in-call": e.alreadyInCall ? "true" : "false",
			"data-disabled": t ? "true" : "false",
			className: s("flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left", t ? "opacity-50 cursor-not-allowed" : s("cursor-pointer", _ ? "hover:bg-white/10" : "hover:bg-surface-hover"), r && (_ ? "bg-white/10" : "bg-surface-hover")),
			children: [
				/* @__PURE__ */ $("span", {
					className: "relative inline-flex shrink-0",
					children: [/* @__PURE__ */ Q(P, {
						name: e.name,
						src: e.avatarUrl,
						color: e.color,
						size: 24
					}), e.online !== void 0 && /* @__PURE__ */ Q(S, {
						state: e.online ? "online" : "offline",
						pulse: !1,
						size: "xs",
						className: s("absolute -bottom-0.5 -right-0.5 rounded-full ring-2", _ ? "ring-call-chrome" : "ring-surface")
					})]
				}),
				/* @__PURE__ */ Q("span", {
					className: s("flex-1 truncate text-[13px]", _ ? "text-white" : "text-text-primary"),
					children: e.name
				}),
				e.online === !1 && e.lastSeenLabel && /* @__PURE__ */ Q("span", {
					"data-testid": "invite-candidate-last-seen",
					className: s("shrink-0 text-[11px]", _ ? "text-white/50" : "text-neutral"),
					children: e.lastSeenLabel
				}),
				e.statusLabel && !e.alreadyInCall && !e.pending && /* @__PURE__ */ Q("span", {
					"data-testid": "invite-candidate-status",
					className: s("shrink-0 text-[11px]", _ ? "text-white/50" : "text-neutral"),
					children: e.statusLabel
				}),
				e.alreadyInCall ? /* @__PURE__ */ Q("span", {
					className: s("text-[11px]", _ ? "text-white/50" : "text-neutral"),
					children: "In call"
				}) : e.pending ? /* @__PURE__ */ Q("span", {
					className: s("text-[11px]", _ ? "text-white/50" : "text-neutral"),
					children: "Ringing…"
				}) : v || e.disabled ? null : /* @__PURE__ */ Q("span", {
					"aria-hidden": "true",
					className: s("grid h-4 w-4 place-items-center rounded border text-[10px]", r ? "border-transparent bg-primary text-white" : s("text-transparent", _ ? "border-white/30" : "border-border")),
					children: "✓"
				})
			]
		}) }, e.userId);
	}, k = (e, t) => /* @__PURE__ */ Q("li", {
		"data-testid": `people-group-${t}`,
		"aria-hidden": "true",
		className: s("px-2 pb-0.5 pt-2 text-[11px] font-semibold uppercase tracking-wide first:pt-0", _ ? "text-white/40" : "text-text-tertiary"),
		children: e
	}, `section-${t}`), A = l ? T.filter((e) => e.online === !0) : [], M = l ? T.filter((e) => e.online !== !0) : [], N = /* @__PURE__ */ $(Z, { children: [o && /* @__PURE__ */ Q(j, {
		type: "search",
		size: "sm",
		value: x,
		onChange: (e) => C(e.target.value),
		placeholder: "Search people",
		"aria-label": "Search people",
		"data-testid": "people-search",
		className: s("mb-1", _ && "border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
	}), e.length === 0 ? /* @__PURE__ */ Q("p", {
		className: s("m-0 text-[13px]", _ ? "text-white/60" : "text-text-secondary"),
		"data-testid": "invite-to-call-empty",
		children: l ? "No one to show yet." : "Nobody else is online right now."
	}) : w.length === 0 ? /* @__PURE__ */ Q("p", {
		className: s("m-0 text-[13px]", _ ? "text-white/60" : "text-text-secondary"),
		"data-testid": "invite-to-call-everyone-here",
		children: "Everyone who's online is already on this call."
	}) : T.length === 0 ? /* @__PURE__ */ $("p", {
		className: s("m-0 text-[13px]", _ ? "text-white/60" : "text-text-secondary"),
		"data-testid": "people-search-empty",
		children: [
			"No one matches “",
			x.trim(),
			"”."
		]
	}) : /* @__PURE__ */ Q("ul", {
		className: "flex flex-col gap-1 m-0 p-0 list-none max-h-[min(55vh,480px)] overflow-y-auto overscroll-contain [scrollbar-width:thin] [scrollbar-gutter:stable]",
		"aria-label": "People you can invite",
		children: l ? /* @__PURE__ */ $(Z, { children: [
			A.length > 0 && k("Online", "online"),
			A.map(O),
			M.length > 0 && k("Offline", "offline"),
			M.map(O)
		] }) : T.map(O)
	})] }), F = v ? null : /* @__PURE__ */ Q(c, {
		variant: "primary",
		size: "md",
		onClick: () => {
			let e = [...y];
			b(/* @__PURE__ */ new Set()), t(e);
		},
		disabled: n || D === 0,
		"data-autofocus": !0,
		"data-testid": g ? `${g}-confirm` : "invite-to-call-confirm",
		children: n ? p : D === 0 ? f : m ? m(D) : `${f} ${D} ${D === 1 ? "person" : "people"}`
	});
	return i ? /* @__PURE__ */ Q(Z, { children: i({
		list: N,
		confirm: F
	}) }) : /* @__PURE__ */ $("div", {
		className: s("flex flex-col gap-3", h),
		"data-testid": g,
		children: [N, F && /* @__PURE__ */ Q("div", {
			className: "flex justify-end",
			children: F
		})]
	});
}
//#endregion
//#region src/components/social/SocialPanel.tsx
function fe(e, t) {
	return {
		id: e.userId,
		displayName: e.displayName,
		bio: "",
		avatarUrl: e.avatarUrl ?? null,
		visibility: e.visibility,
		followState: t
	};
}
function pe(e) {
	return {
		id: e.userId,
		displayName: e.displayName,
		bio: e.bio ?? "",
		avatarUrl: e.avatarUrl ?? null,
		visibility: e.visibility
	};
}
function me({ user: e, size: t }) {
	let n = e.displayName.slice(0, 2).toUpperCase();
	return e.avatarUrl ? /* @__PURE__ */ Q("div", {
		className: s("rounded-full bg-border flex items-center justify-center font-semibold text-text-primary shrink-0 overflow-hidden", t === 48 ? "w-12 h-12 text-base" : "w-8 h-8 text-xs"),
		children: /* @__PURE__ */ Q("img", {
			src: e.avatarUrl,
			alt: `${e.displayName}'s avatar`,
			className: "w-full h-full object-cover"
		})
	}) : /* @__PURE__ */ Q("div", {
		className: s("rounded-full bg-border flex items-center justify-center font-semibold text-text-primary shrink-0 overflow-hidden", t === 48 ? "w-12 h-12 text-base" : "w-8 h-8 text-xs"),
		"aria-label": `Avatar placeholder for ${e.displayName}`,
		children: n
	});
}
function he({ targetUser: e, followState: t, compact: n = !1, onFollowChange: r }) {
	let [i, a] = X(!1);
	return t === "not-following" ? /* @__PURE__ */ Q("button", {
		className: s("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border-none font-[system-ui,-apple-system,sans-serif] bg-primary text-white font-semibold", n ? "h-7" : "h-9"),
		onClick: () => {
			r(e.id, "pending");
		},
		"aria-label": `Follow ${e.displayName}`,
		children: "Follow"
	}) : t === "pending" ? /* @__PURE__ */ Q("button", {
		className: s("rounded-lg text-sm min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface-hover text-text-secondary font-normal cursor-default", n ? "h-7" : "h-9"),
		disabled: !0,
		"aria-label": `Follow ${e.displayName}`,
		children: "Following…"
	}) : /* @__PURE__ */ $("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ Q("button", {
			className: s("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface text-text-primary font-normal", n ? "h-7" : "h-9"),
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
function ge({ user: e, isOwnProfile: t, onSave: n }) {
	let [r, i] = X(!1), [a, o] = X(e.displayName), [c, l] = X(e.bio), [u, d] = X(e.avatarUrl ?? ""), [f, p] = X(e.visibility), [m, h] = X(!1), [g, _] = X(null), v = q();
	K(() => {
		o(e.displayName), l(e.bio), d(e.avatarUrl ?? ""), p(e.visibility);
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
			}), /* @__PURE__ */ Q(j, {
				id: `${v}-display-name`,
				value: a,
				onChange: (e) => o(e.target.value.slice(0, 50)),
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
			}), /* @__PURE__ */ Q(M, {
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
			}), /* @__PURE__ */ Q(j, {
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
				onKeyDown: (e) => U(e, { itemSelector: "[role=\"radio\"]" }),
				className: "flex gap-2",
				children: ["public", "private"].map((e) => /* @__PURE__ */ Q("button", {
					type: "button",
					role: "radio",
					"aria-checked": f === e,
					tabIndex: f === e ? 0 : -1,
					onClick: () => p(e),
					className: s("px-4 py-1 rounded-full text-sm cursor-pointer border border-border font-[system-ui,-apple-system,sans-serif]", f === e ? "bg-primary text-white" : "bg-surface text-text-primary"),
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
				className: s("flex-1 h-9 bg-primary text-white border-none rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", m ? "cursor-default" : "cursor-pointer"),
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
			children: [/* @__PURE__ */ Q(me, {
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
						className: s("text-xs px-2 py-0.5 rounded", e.visibility === "public" ? "bg-success-bg text-success" : "bg-surface-hover text-text-secondary"),
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
function _e({ followers: e, following: t, friends: n, followStates: r, onFollowChange: i, loadError: a }) {
	let [o, c] = X("followers"), l = (e) => a ? "" : ` (${e.length})`, u = [
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
	}, f = u.find((e) => e.key === o)?.users ?? [];
	return /* @__PURE__ */ $("div", {
		className: "mt-4",
		children: [/* @__PURE__ */ Q("div", {
			role: "tablist",
			"aria-label": "Connections",
			onKeyDown: U,
			className: "flex border-b border-border mb-3",
			children: u.map((e) => /* @__PURE__ */ Q("button", {
				type: "button",
				role: "tab",
				id: `social-tab-${e.key}`,
				"aria-controls": "social-tabpanel",
				"aria-selected": o === e.key,
				tabIndex: o === e.key ? 0 : -1,
				onClick: () => c(e.key),
				className: s("px-4 py-2 text-sm font-normal bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif] -mb-px", o === e.key ? "text-text-primary border-b-2 border-b-primary" : "text-text-secondary border-b-2 border-b-transparent"),
				children: e.label
			}, e.key))
		}), /* @__PURE__ */ Q("div", {
			role: "tabpanel",
			id: "social-tabpanel",
			"aria-labelledby": `social-tab-${o}`,
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
					children: d[o].heading
				}), /* @__PURE__ */ Q("div", {
					className: "text-sm text-text-tertiary",
					children: d[o].body
				})]
			}) : /* @__PURE__ */ Q("div", { children: f.map((e) => /* @__PURE__ */ $("div", {
				className: "flex items-center gap-2 h-14 border-b border-surface-hover",
				children: [
					/* @__PURE__ */ Q(me, {
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
					/* @__PURE__ */ Q(he, {
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
function ve({ idToken: t, onMessage: n }) {
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
	}, b = c.map((e) => fe(e, g[e.userId] ?? "not-following")), x = l.map((e) => fe(e, "following")), S = u.map((e) => fe(e, "following")), C = r ? {
		...pe(r),
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
			}) : C ? /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q(ge, {
				user: C,
				isOwnProfile: !0,
				onSave: s
			}), /* @__PURE__ */ Q(_e, {
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
function ye(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64);
}
function be({ people: e, onStartDm: t, onCreateChannel: n, onCancel: r, peopleError: i = null, busy: a = !1, className: o, "data-testid": c = "new-conversation" }) {
	let [l, u] = X(""), d = Y(null), f = J(() => {
		let t = l.trim().toLowerCase();
		return t ? e.filter((e) => e.displayName.toLowerCase().includes(t)) : e;
	}, [e, l]), p = ye(l), m = !!n && p.length > 0;
	return /* @__PURE__ */ $("div", {
		"data-testid": c,
		className: s("flex flex-col gap-1 rounded-lg border border-border bg-surface p-2", o),
		children: [/* @__PURE__ */ $("div", {
			className: "flex items-center gap-1.5",
			children: [/* @__PURE__ */ Q(j, {
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
					children: [/* @__PURE__ */ Q(P, {
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
//#region src/components/social/RailSectionHeader.tsx
function xe({ label: e, actions: t = [], presentational: n = !0, collapsed: r = !1, onToggleCollapse: i, controls: a, toggleId: o, collapsedCount: c = 0, dark: l = !1, className: u, "data-testid": f = "rail-section-header" }) {
	let p = i !== void 0, m = s("min-w-0 flex-1 truncate text-[11px] font-semibold uppercase tracking-wide", l ? "text-white/40" : "text-text-tertiary");
	return /* @__PURE__ */ $("div", {
		"data-testid": f,
		className: s("flex items-center gap-1 px-2 pb-1 pt-3", u),
		children: [p ? /* @__PURE__ */ $("button", {
			type: "button",
			id: o,
			"aria-expanded": !r,
			"aria-controls": a,
			onClick: () => i(!r),
			"data-testid": `${f}-toggle`,
			className: s("flex min-w-0 flex-1 cursor-pointer items-center gap-1 rounded border-none bg-transparent p-0 text-left", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", l ? "hover:text-white" : "hover:text-text-primary"),
			children: [
				/* @__PURE__ */ Q(g, {
					dir: r ? "right" : "down",
					size: 12,
					className: s("shrink-0", l ? "text-white/40" : "text-text-tertiary")
				}),
				/* @__PURE__ */ Q("span", {
					className: m,
					children: e
				}),
				r && c > 0 && /* @__PURE__ */ $(Z, { children: [" ", /* @__PURE__ */ Q("span", {
					"aria-label": `${c} unread`,
					"data-testid": `${f}-collapsed-count`,
					className: s("grid h-4 min-w-4 shrink-0 place-items-center rounded-full px-1 text-[10px] font-semibold leading-none", l ? "bg-white/15 text-white" : "bg-primary text-white"),
					children: c > 99 ? "99+" : c
				})] })
			]
		}) : /* @__PURE__ */ Q("span", {
			"aria-hidden": n || void 0,
			className: m,
			children: e
		}), t.map((e) => /* @__PURE__ */ Q("button", {
			type: "button",
			title: e.label,
			"aria-label": e.label,
			onClick: (t) => {
				r && i?.(!1), e.onClick(t.currentTarget);
			},
			"data-testid": e["data-testid"],
			className: s("grid h-5 w-5 shrink-0 cursor-pointer place-items-center rounded border-none bg-transparent p-0", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", l ? "text-white/50 hover:bg-white/10 hover:text-white" : "text-text-tertiary hover:bg-surface-hover hover:text-text-primary"),
			children: e.icon ?? /* @__PURE__ */ Q(d, { size: 13 })
		}, e.label))]
	});
}
//#endregion
//#region src/components/social/ConversationList.tsx
function Se(e, t) {
	let n = e.lastMessageAt ? Date.parse(e.lastMessageAt) : NaN, r = t.lastMessageAt ? Date.parse(t.lastMessageAt) : NaN, i = Number.isNaN(n) ? null : n, a = Number.isNaN(r) ? null : r;
	return i === null && a === null ? 0 : i === null ? 1 : a === null ? -1 : a - i;
}
function Ce({ items: e, grouped: t = !1, sectionOrder: n = "channels-first", sectionActions: r, collapsedSections: i, onToggleSection: a, onStartCall: o, sortByRecency: c = !0, maxVisible: l, activeChannel: d, onSelect: p, onNewChat: m, emptyLabel: g = "No conversations yet", onTogglePin: _, onToggleMute: v, onMarkUnread: y, tone: x = "light", className: C, "data-testid": w }) {
	let T = x === "dark", E = w ?? "conversation", D = a !== void 0, O = q(), k = (e, t) => `${O}${e.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${t}`, A = c ? [...e].sort(Se) : e, j = [], M = A.filter((e) => e.pinned), F = M.length > 0 ? A.filter((e) => !e.pinned) : A;
	if (M.length > 0 && j.push({
		heading: "Pinned",
		label: "Pinned",
		items: M
	}), t) {
		let e = (e) => (e.kind ?? (e.peers.length > 1 ? "group" : "dm")) === "channel", t = F.filter(e), r = F.filter((t) => !e(t)), i = {
			heading: "Channels",
			label: "Channels",
			items: t
		}, a = {
			heading: "Direct messages",
			label: "Direct messages",
			items: r
		}, o = n === "dms-first" ? [a, i] : [i, a];
		for (let e of o) e.items.length > 0 && j.push(e);
	} else F.length > 0 && j.push({
		label: "Conversations",
		items: F
	});
	let [I, te] = X(() => /* @__PURE__ */ new Set()), L = j.map((e) => {
		let t = D && e.heading !== void 0, n = t && i?.[e.label] === !0, r = l !== void 0 && l >= 0 && e.items.length > l, a = {
			...e,
			collapsible: t,
			collapsed: n,
			capped: r
		};
		if (!r || I.has(e.label)) return {
			...a,
			shown: e.items,
			hidden: 0
		};
		let o = e.items.slice(0, l), s = d ? e.items.find((e) => e.channel === d) : void 0;
		return s && !o.includes(s) && (o = l === 0 ? [s] : [...o.slice(0, -1), s]), {
			...a,
			shown: o,
			hidden: e.items.length - o.length
		};
	}), ne = (e) => te((t) => {
		let n = new Set(t);
		return n.has(e) ? n.delete(e) : n.add(e), n;
	}), R = L.flatMap((e) => e.collapsed ? [] : e.shown), re = Y(null), [z, B] = X(null), V = (z && R.some((e) => e.channel === z) ? z : null) ?? (d && R.some((e) => e.channel === d) ? d : null) ?? R[0]?.channel ?? null, H = Y(null);
	K(() => {
		let e = H.current;
		if (!e) return;
		H.current = null;
		let t = re.current?.querySelector(`[data-testid="conversation-row"][data-channel="${CSS.escape(e)}"]`);
		t?.focus(), t?.scrollIntoView({ block: "nearest" });
	});
	function U(e) {
		let t = Math.max(0, Math.min(R.length - 1, e)), n = R[t];
		!n || n.channel === V || (H.current = n.channel, B(n.channel));
	}
	function oe(e) {
		if (R.length === 0) return;
		let t = R.findIndex((e) => e.channel === V), n = t < 0 ? 0 : t;
		switch (e.key) {
			case "ArrowDown":
				U(n + 1);
				break;
			case "ArrowUp":
				U(n - 1);
				break;
			case "Home":
				U(0);
				break;
			case "End":
				U(R.length - 1);
				break;
			default: return;
		}
		e.preventDefault();
	}
	return /* @__PURE__ */ $("div", {
		className: s("flex min-h-0 flex-col gap-1", C),
		"data-testid": w,
		children: [m && /* @__PURE__ */ $("button", {
			type: "button",
			onClick: m,
			"data-testid": "conversation-new-chat",
			className: s("flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] font-medium", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", T ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"),
			children: [/* @__PURE__ */ Q("span", {
				"aria-hidden": "true",
				className: s("grid h-6 w-6 place-items-center rounded-full border border-dashed text-sm leading-none", T ? "border-white/30" : "border-border"),
				children: "+"
			}), "New chat"]
		}), e.length === 0 ? /* @__PURE__ */ Q("p", {
			className: s("m-0 px-2 py-1.5 text-[13px]", T ? "text-white/60" : "text-text-secondary"),
			"data-testid": "conversation-empty",
			children: g
		}) : /* @__PURE__ */ Q("div", {
			ref: re,
			onKeyDown: oe,
			className: "m-0 flex min-h-0 flex-col overflow-y-auto p-0",
			children: L.map((e) => {
				let t = k(e.label, "content"), n = k(e.label, "toggle"), i = e.collapsed ? null : /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q("ul", {
					className: "m-0 flex list-none flex-col gap-0.5 p-0",
					"aria-label": e.collapsible ? void 0 : e.label,
					"aria-labelledby": e.collapsible ? n : void 0,
					children: e.shown.map((e) => {
						let t = e.channel === d, n = e.channel === V, r = e.kind ?? (e.peers.length > 1 ? "group" : "dm"), i = r === "channel", a = r === "group", c = e.peers[0], l = i ? e.name ?? e.channel : e.peers.map((e) => e.displayName).join(", "), m = e.lastMessageAt ? ie(e.lastMessageAt) : "", g = e.lastMessageAt ? ae(e.lastMessageAt) : "", x = e.unreadCount ?? 0, C = !!e.mentioned, w = !!e.live, D = !!e.muted, O = `${E}-row-menu-${e.channel}`, k = [];
						return o && (k.push({
							label: "Call",
							icon: /* @__PURE__ */ Q(f, { size: 14 }),
							onSelect: () => o(e.channel, "audio"),
							"data-testid": `${O}-call`
						}), k.push({
							label: "Video call",
							icon: /* @__PURE__ */ Q(u, { size: 14 }),
							onSelect: () => o(e.channel, "video"),
							"data-testid": `${O}-video-call`
						})), _ && k.push({
							label: e.pinned ? "Unpin" : "Pin",
							icon: /* @__PURE__ */ Q(b, { size: 14 }),
							onSelect: () => _(e.channel, !e.pinned),
							"data-testid": `${O}-pin`
						}), v && k.push({
							label: D ? "Unmute" : "Mute",
							icon: /* @__PURE__ */ Q(h, { size: 14 }),
							onSelect: () => v(e.channel, !D),
							"data-testid": `${O}-mute`
						}), y && x === 0 && k.push({
							label: "Mark as unread",
							onSelect: () => y(e.channel),
							"data-testid": `${O}-unread`
						}), /* @__PURE__ */ $("li", {
							className: s("relative", k.length > 0 && "group"),
							children: [/* @__PURE__ */ $("button", {
								type: "button",
								onClick: () => p(e.channel),
								onFocus: () => B(e.channel),
								"data-testid": "conversation-row",
								"data-channel": e.channel,
								"data-active": t ? "true" : "false",
								"aria-current": t ? "true" : void 0,
								tabIndex: n ? 0 : -1,
								className: s("flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-left", k.length > 0 && "pr-8", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", T ? "hover:bg-white/10" : "hover:bg-surface-hover", t && (T ? "bg-white/10" : "bg-surface-hover")),
								children: [
									i ? /* @__PURE__ */ Q("span", {
										"aria-hidden": "true",
										"data-testid": "conversation-channel-glyph",
										className: s("grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[15px] font-semibold leading-none", T ? "bg-white/10 text-white/70" : "bg-surface-inset text-text-secondary"),
										children: "#"
									}) : a ? /* @__PURE__ */ Q(N, {
										size: 28,
										maxVisible: 2,
										items: e.peers.map((e) => ({
											name: e.displayName,
											color: e.color,
											src: e.avatarUrl
										}))
									}) : c ? /* @__PURE__ */ $("span", {
										className: "relative inline-flex shrink-0",
										children: [/* @__PURE__ */ Q(P, {
											name: c.displayName,
											color: c.color,
											src: c.avatarUrl,
											size: 28
										}), c.online !== void 0 && /* @__PURE__ */ Q(S, {
											state: c.online ? "online" : "offline",
											pulse: !1,
											className: s("absolute -bottom-0.5 -right-0.5 rounded-full ring-2", T ? "ring-call-chrome" : "ring-surface")
										})]
									}) : null,
									/* @__PURE__ */ $("span", {
										className: "flex min-w-0 flex-1 flex-col",
										children: [/* @__PURE__ */ $("span", {
											className: "flex items-baseline gap-2",
											children: [
												/* @__PURE__ */ Q("span", {
													className: s("min-w-0 flex-1 truncate text-[13px]", x > 0 ? "font-semibold" : "font-medium", T ? "text-white" : "text-text-primary"),
													children: l
												}),
												e.pinned && /* @__PURE__ */ Q("span", {
													"data-testid": `${E}-pinned`,
													title: "Pinned",
													className: s("shrink-0", T ? "text-white/50" : "text-text-tertiary"),
													children: /* @__PURE__ */ Q(b, { size: 12 })
												}),
												D && /* @__PURE__ */ Q("span", {
													"data-testid": `${E}-muted`,
													title: "Muted",
													className: s("shrink-0", T ? "text-white/50" : "text-text-tertiary"),
													children: /* @__PURE__ */ Q(h, { size: 12 })
												}),
												m && /* @__PURE__ */ Q("time", {
													dateTime: e.lastMessageAt,
													title: g,
													className: s("shrink-0 text-[11px] tabular-nums", T ? "text-white/50" : "text-text-tertiary"),
													"data-testid": "conversation-time",
													children: m
												})
											]
										}), e.lastMessagePreview && /* @__PURE__ */ Q("span", {
											className: s("truncate text-[12px]", T ? "text-white/60" : "text-text-secondary"),
											"data-testid": "conversation-preview",
											children: e.lastMessagePreview
										})]
									}),
									w && /* @__PURE__ */ $("span", {
										"data-testid": "conversation-live",
										"aria-label": "Call in progress",
										title: "Call in progress",
										className: "inline-flex shrink-0 items-center gap-1 rounded-full bg-danger px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none tracking-wide text-white",
										children: [/* @__PURE__ */ Q("span", {
											"aria-hidden": !0,
											className: "h-1.5 w-1.5 rounded-full bg-white"
										}), "Live"]
									}),
									C && /* @__PURE__ */ Q("span", {
										"data-testid": "conversation-mention",
										"aria-label": "You were mentioned",
										title: "You were mentioned",
										className: "grid h-5 w-5 shrink-0 place-items-center rounded-full bg-danger text-[11px] font-bold leading-none text-white",
										children: "@"
									}),
									x > 0 && /* @__PURE__ */ Q("span", {
										"data-testid": "conversation-unread",
										"data-muted": D ? "true" : "false",
										className: s("grid h-5 min-w-5 shrink-0 place-items-center rounded-full px-1.5 text-[11px] font-semibold leading-none", D ? T ? "bg-white/15 text-white/70" : "bg-surface-inset text-text-secondary" : "bg-primary text-white"),
										children: x > 99 ? "99+" : x
									})
								]
							}), k.length > 0 && /* @__PURE__ */ Q("span", {
								className: s("absolute right-1 top-1/2 -translate-y-1/2 opacity-0 transition-opacity", "group-hover:opacity-100 group-focus-within:opacity-100", "has-[[aria-expanded=true]]:opacity-100", "[@media(hover:none)]:opacity-100"),
								children: /* @__PURE__ */ Q(ee, {
									trigger: /* @__PURE__ */ Q("span", {
										"aria-hidden": !0,
										className: "leading-none tracking-wide",
										children: "⋯"
									}),
									triggerLabel: `More options for ${l}`,
									triggerTitle: "More options",
									triggerTabIndex: n ? 0 : -1,
									triggerTestId: O,
									triggerClassName: s("h-6 w-6 rounded-md border-0 p-0 text-[13px]", T ? "text-white/70 hover:bg-white/15" : "text-text-secondary hover:bg-surface-hover"),
									align: "end",
									sections: [{ items: k }],
									"data-testid": `${O}-panel`
								})
							})]
						}, e.channel);
					})
				}), e.capped && /* @__PURE__ */ Q("button", {
					type: "button",
					onClick: () => ne(e.label),
					"aria-expanded": e.hidden === 0,
					"data-testid": "conversation-show-more",
					className: s("mt-0.5 flex w-full cursor-pointer items-center rounded-lg px-2 py-1 text-left text-[12px] font-medium", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", T ? "text-white/60 hover:bg-white/10 hover:text-white" : "text-text-tertiary hover:bg-surface-hover hover:text-text-primary"),
					children: e.hidden > 0 ? `Show ${e.hidden} more` : "Show less"
				})] });
				return /* @__PURE__ */ $("div", { children: [e.heading && /* @__PURE__ */ Q(xe, {
					label: e.heading,
					dark: T,
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
var we = [
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
function Te(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) >>> 0;
	return we[t % we.length];
}
function Ee(e) {
	let t = e.split(/[\s._@-]/);
	return t.length >= 2 ? (t[0][0] + t[1][0]).toUpperCase() : e.slice(0, 2).toUpperCase();
}
function De(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : new Date(e).toLocaleDateString();
}
function Oe(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function ke({ post: e, isOwn: t, showSender: n }) {
	let r = Te(e.authorId);
	return /* @__PURE__ */ $("div", {
		className: s("flex items-end gap-2", t ? "flex-row-reverse" : "flex-row", n ? "pt-2 px-4 pb-0.5" : "py-px px-4"),
		children: [/* @__PURE__ */ Q("div", {
			className: "w-8 shrink-0 self-end",
			children: !t && n && /* @__PURE__ */ Q("div", {
				className: "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white select-none",
				style: { background: r },
				children: Ee(e.authorId)
			})
		}), /* @__PURE__ */ $("div", {
			className: s("max-w-[68%] flex flex-col gap-0.5", t ? "items-end" : "items-start"),
			children: [
				!t && n && /* @__PURE__ */ Q("span", {
					className: "text-[11px] font-semibold pl-1",
					style: { color: r },
					children: e.authorId
				}),
				/* @__PURE__ */ Q("div", {
					className: s("px-3.5 py-2 text-sm leading-relaxed break-words transition-opacity duration-200", t ? "bg-primary text-white rounded-[18px_18px_4px_18px]" : "bg-surface-hover text-text-primary rounded-[4px_18px_18px_18px]", e._fadeIn ? "opacity-0" : "opacity-100"),
					children: e.content
				}),
				n && /* @__PURE__ */ Q("span", {
					className: "text-[10px] text-text-tertiary px-1",
					children: De(e.createdAt)
				})
			]
		})]
	});
}
function Ae({ idToken: e, roomId: t, roomName: r, onMessage: i }) {
	let { posts: a, createPost: o, loading: c, hasMore: l, loadMore: u, error: d, loadError: f } = n({
		idToken: e,
		roomId: t,
		onMessage: i
	}), [p, m] = X(""), [h, g] = X(!1), [_, v] = X(null), y = Y(null), b = Oe(e), x = [...a].reverse(), S = a[0]?.postId;
	K(() => {
		S && y.current?.scrollIntoView({ behavior: "smooth" });
	}, [S]);
	let C = async () => {
		if (!p.trim() || h) return;
		let e = p.trim();
		m(""), v(null), g(!0);
		try {
			await o(e);
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
							className: s("text-xs text-text-secondary bg-transparent border border-border rounded-full px-3.5 py-0.5 font-[inherit]", c ? "cursor-default" : "cursor-pointer"),
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
						return /* @__PURE__ */ Q(ke, {
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
				children: [/* @__PURE__ */ Q(j, {
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
					className: s("w-[34px] h-[34px] rounded-full shrink-0 border-none flex items-center justify-center text-base", !p.trim() || h ? "bg-surface-hover text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: "↑"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/social/SocialTabContent.tsx
function je({ userId: t, displayName: n, idToken: r, rooms: i, createRoom: a, createDM: o, createGroupRoom: c, roomsLoading: l, roomsError: u, onRoomsRetry: d, handleRoomSelect: f, activeRoomId: p, onMessage: m }) {
	let [h, g] = X(!0), _ = h ? 240 : 0, [v, y] = X({}), b = Y(p);
	K(() => {
		b.current = p;
	}, [p]);
	let x = W((e) => {
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
	]), N = W((e) => {
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
			className: s("shrink-0 flex-col overflow-hidden transition-[width] duration-[180ms]", h ? "flex" : "hidden"),
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
					}) : /* @__PURE__ */ Q(Ce, {
						items: M,
						activeChannel: p ?? null,
						onSelect: N,
						onNewChat: () => C((e) => !e),
						emptyLabel: "No conversations yet",
						"data-testid": "social-conversations"
					}), S && /* @__PURE__ */ Q("div", {
						className: "px-1 pt-1.5",
						children: /* @__PURE__ */ Q(be, {
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
									await o(e), C(!1);
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
				children: k ? /* @__PURE__ */ Q(Ae, {
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
function Me({ author: e, avatarUrl: t, mine: n = !1, messages: r, className: i }) {
	return r.length === 0 ? null : /* @__PURE__ */ Q("div", {
		"data-testid": "message-group",
		"data-author": e,
		"data-row-count": r.length,
		className: s("flex flex-col", i),
		children: r.map((r, i) => /* @__PURE__ */ Q(H, {
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
function Ne({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = X(""), [a, o] = X(null), c = async (t) => {
		if (t.preventDefault(), r.trim()) {
			o(null);
			try {
				await e(r.trim()), i("");
			} catch (e) {
				o(e instanceof Error ? e.message : "Failed to create room");
			}
		}
	};
	return /* @__PURE__ */ $("form", {
		onSubmit: (e) => {
			c(e);
		},
		className: "my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border",
		children: [
			/* @__PURE__ */ Q(j, {
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
					className: s("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !r.trim() || n ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
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
function Pe({ onCreateDM: e, loading: t, friends: n, friendsError: r }) {
	let [i, a] = X(""), [o, c] = X(!1), [l, u] = X(null), d = async (t) => {
		if (t.preventDefault(), i.trim()) {
			u(null);
			try {
				await e(i.trim()), a(""), c(!1);
			} catch (e) {
				u(e instanceof Error ? e.message : "Failed to open DM");
			}
		}
	};
	return o ? /* @__PURE__ */ $("form", {
		onSubmit: (e) => {
			d(e);
		},
		className: "my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border",
		children: [
			/* @__PURE__ */ Q(L, {
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
					className: s("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !i.trim() || t ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
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
function Fe({ room: e, isActive: t, onClick: n }) {
	return /* @__PURE__ */ $("button", {
		type: "button",
		onClick: n,
		"aria-pressed": t,
		className: s("flex items-center h-14 border-b border-surface-hover cursor-pointer pr-2", "w-full text-left font-[inherit]", t ? "bg-surface-hover border-l-[3px] border-l-primary pl-[13px]" : "bg-transparent border-l-[3px] border-l-transparent"),
		children: [/* @__PURE__ */ Q("div", {
			className: s("flex-1 text-base text-text-primary", t ? "font-semibold" : "font-normal"),
			children: e.name
		}), /* @__PURE__ */ Q("span", {
			className: ((e) => e === "standalone" ? "bg-accent-bg text-primary text-xs px-2 py-0.5 rounded" : e === "group" ? "bg-info-bg text-info text-xs px-2 py-0.5 rounded" : "bg-success-bg text-success text-xs px-2 py-0.5 rounded")(e.type),
			children: e.type
		})]
	});
}
function Ie({ room: e, isActive: t, onClick: n }) {
	return /* @__PURE__ */ $("button", {
		onClick: n,
		className: s("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]", t ? "bg-accent-bg text-accent-fg font-semibold" : "bg-transparent text-text-primary font-normal"),
		children: [/* @__PURE__ */ Q("span", {
			className: s("text-[13px] shrink-0", t ? "text-primary" : "text-text-tertiary"),
			children: e.type === "dm" ? "●" : "#"
		}), /* @__PURE__ */ Q("span", {
			className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1",
			children: e.name
		})]
	});
}
function Le({ message: e, onRetry: t, compact: n }) {
	return /* @__PURE__ */ $("div", {
		role: "alert",
		className: s("text-center flex flex-col items-center gap-1.5", n ? "px-2 py-3" : "px-4 py-6"),
		children: [
			/* @__PURE__ */ Q("div", {
				className: s("font-semibold text-danger-fg", n ? "text-xs" : "text-sm"),
				children: "Couldn't load rooms"
			}),
			/* @__PURE__ */ Q("div", {
				className: s("text-text-secondary", n ? "text-[11px]" : "text-xs"),
				children: e
			}),
			t && /* @__PURE__ */ Q("button", {
				type: "button",
				onClick: t,
				className: s("mt-1 font-medium text-info-fg bg-info-bg border border-info-border rounded cursor-pointer font-[system-ui,-apple-system,sans-serif]", n ? "px-2.5 py-0.5 text-[11px]" : "px-3.5 py-1 text-xs"),
				children: "Retry"
			})
		]
	});
}
function Re({ idToken: t, rooms: n, createRoom: r, createDM: i, loading: a, error: o, onRetry: s, onRoomSelect: c, activeRoomId: l, compact: u }) {
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
			p && /* @__PURE__ */ Q(Ne, {
				onCreate: h,
				onDiscard: () => m(!1),
				loading: a
			}),
			/* @__PURE__ */ Q(Pe, {
				onCreateDM: i,
				loading: a,
				friends: d,
				friendsError: f
			}),
			/* @__PURE__ */ Q("div", { children: a && n.length === 0 ? /* @__PURE__ */ Q("div", {
				className: "p-2 text-text-tertiary text-xs text-center",
				children: "Loading…"
			}) : o && n.length === 0 ? /* @__PURE__ */ Q(Le, {
				message: o,
				onRetry: s,
				compact: !0
			}) : n.length === 0 ? /* @__PURE__ */ Q("div", {
				className: "px-2 py-3 text-text-tertiary text-xs",
				children: "No rooms yet"
			}) : n.map((e) => /* @__PURE__ */ Q(Ie, {
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
				className: "w-full h-9 mb-2 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Create Room"
			}),
			p && /* @__PURE__ */ Q(Ne, {
				onCreate: h,
				onDiscard: () => m(!1),
				loading: a
			}),
			/* @__PURE__ */ Q(Pe, {
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
				}) : o && n.length === 0 ? /* @__PURE__ */ Q(Le, {
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
				}) : n.map((e) => /* @__PURE__ */ Q(Fe, {
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
function ze(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function Be(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function Ve({ onSubmit: e, placeholder: t = "Write a reply…", loading: n }) {
	let [r, i] = X(""), [a, o] = X(null), c = async (t) => {
		t.preventDefault();
		let n = r.trim();
		if (n) {
			o(null);
			try {
				await e(n);
			} catch (e) {
				o(e instanceof Error ? e.message : "Failed to post comment");
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
			/* @__PURE__ */ Q(j, {
				value: r,
				onChange: (e) => i(e.target.value),
				placeholder: t,
				className: "flex-1"
			}),
			/* @__PURE__ */ Q("button", {
				type: "submit",
				disabled: !r.trim() || n,
				className: s("h-7 px-2.5 rounded-md text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !r.trim() || n ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
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
function He({ comment: e, currentUserId: t, loading: n, onDelete: r, onReply: i }) {
	let [a, o] = X(!1), [s, c] = X(!1), [l, u] = X(+!e._fadeIn);
	K(() => {
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
							children: ze(e.createdAt)
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
					s && /* @__PURE__ */ Q(Ve, {
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
function Ue({ idToken: e, roomId: t, postId: n, onMessage: i }) {
	let { comments: a, createComment: o, deleteComment: s, loading: c, submitting: l, error: u } = r({
		idToken: e,
		roomId: t,
		postId: n,
		onMessage: i
	}), d = Be(e), f = async (e, t) => {
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
			}) : a.map((e) => /* @__PURE__ */ Q(He, {
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
			/* @__PURE__ */ Q(Ve, {
				onSubmit: (e) => o(e),
				placeholder: "Write a comment…",
				loading: l
			})
		]
	});
}
//#endregion
//#region src/components/social/PostFeed.tsx
var We = [
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
function Ge(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function Ke(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function qe({ onCreate: e, loading: t }) {
	let [n, r] = X(""), [i, a] = X(null), o = async (t) => {
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
			o(e);
		},
		children: [
			/* @__PURE__ */ Q(M, {
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
					className: s("h-9 px-4 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !n.trim() || t ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
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
function Je({ isLiked: e, likeCount: t, whoLiked: n, toggle: r }) {
	return /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ $("button", {
		onClick: () => void r(),
		"aria-label": "Like post",
		className: "bg-transparent border-none cursor-pointer flex items-center gap-1 p-0 font-[system-ui,-apple-system,sans-serif]",
		children: [/* @__PURE__ */ Q("span", {
			className: s("text-base", e ? "text-primary" : "text-text-tertiary"),
			children: "❤"
		}), /* @__PURE__ */ Q("span", {
			className: s("text-sm", e ? "text-primary" : "text-text-tertiary"),
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
function Ye({ reactWithEmoji: e }) {
	return /* @__PURE__ */ Q("div", {
		className: "flex flex-wrap gap-0",
		children: We.map((t) => /* @__PURE__ */ Q("button", {
			onClick: () => void e(t),
			className: "text-base bg-transparent border-none px-1 py-0.5 cursor-pointer",
			title: t,
			children: t
		}, t))
	});
}
function Xe({ post: e, idToken: t, roomId: n, currentUserId: r, onMessage: a, onEdit: o, onDelete: c }) {
	let { isLiked: l, likeCount: u, whoLiked: d, toggle: f, reactWithEmoji: p, error: m } = i({
		idToken: t,
		roomId: n,
		postId: e.postId,
		onMessage: a
	}), [h, g] = X(+!e._fadeIn), [_, v] = X(!1), [y, b] = X(!1), [x, S] = X(!1), [C, w] = X(e.content), [T, E] = X(null), D = async () => {
		E(null);
		try {
			await o(e.postId, C);
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
						children: Ge(e.createdAt)
					})]
				})]
			}),
			x ? /* @__PURE__ */ $("div", {
				className: "mb-2",
				children: [/* @__PURE__ */ Q(M, {
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
						className: s("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", C.trim() ? "bg-primary text-white border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"),
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
					/* @__PURE__ */ Q(Je, {
						isLiked: l,
						likeCount: u,
						whoLiked: d,
						toggle: f
					}),
					/* @__PURE__ */ Q(Ye, { reactWithEmoji: p }),
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
			_ && /* @__PURE__ */ Q(Ue, {
				idToken: t,
				roomId: n,
				postId: e.postId,
				onMessage: a
			})
		]
	});
}
function Ze({ idToken: e, roomId: t, onMessage: r }) {
	let { posts: i, createPost: a, editPost: o, deletePost: c, loading: l, mutating: u, error: d, loadError: f, hasMore: p, loadMore: m } = n({
		idToken: e,
		roomId: t,
		onMessage: r
	}), h = Ke(e);
	return /* @__PURE__ */ $("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ Q(qe, {
				onCreate: a,
				loading: l || u
			}),
			/* @__PURE__ */ Q("div", { className: "border-t border-border my-4" }),
			p && /* @__PURE__ */ Q("button", {
				onClick: () => void m(),
				disabled: l,
				className: s("w-full h-9 mb-4 bg-surface text-text-primary border border-border rounded-lg text-sm font-[system-ui,-apple-system,sans-serif]", l ? "cursor-default" : "cursor-pointer"),
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
			}) : i.map((n) => /* @__PURE__ */ Q(Xe, {
				post: n,
				idToken: e,
				roomId: t,
				currentUserId: h,
				onMessage: r,
				onEdit: o,
				onDelete: c
			}, n.postId))
		]
	});
}
//#endregion
//#region src/components/social/GroupPanel.tsx
function Qe({ group: e, isSelected: t, onClick: n }) {
	return /* @__PURE__ */ $("button", {
		onClick: n,
		className: s("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]", t ? "bg-accent-bg text-accent-fg font-semibold" : "bg-transparent text-text-primary font-normal"),
		children: [/* @__PURE__ */ Q("span", {
			className: s("text-xs shrink-0", t ? "text-primary" : "text-text-tertiary"),
			children: e.visibility === "private" ? "🔒" : "👥"
		}), /* @__PURE__ */ Q("span", {
			className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1",
			children: e.name
		})]
	});
}
function $e({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = X(""), [a, o] = X(null), c = async (t) => {
		if (t.preventDefault(), r.trim()) {
			o(null);
			try {
				await e(r.trim()), i("");
			} catch (e) {
				o(e instanceof Error ? e.message : "Failed to create group");
			}
		}
	};
	return /* @__PURE__ */ $("form", {
		onSubmit: (e) => {
			c(e);
		},
		className: "p-2 bg-surface-panel rounded-md border border-border my-1 mb-2",
		children: [
			/* @__PURE__ */ Q(j, {
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
					className: s("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !r.trim() || n ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
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
function et({ group: e, members: t, rooms: n, groupId: r, currentUserId: i, createGroupRoom: a, onRoomSelect: o, inviteUser: c, loading: l }) {
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
				children: [/* @__PURE__ */ Q(j, {
					size: "sm",
					value: f,
					onChange: (e) => p(e.target.value),
					placeholder: "User ID",
					className: "flex-1"
				}), /* @__PURE__ */ Q("button", {
					type: "submit",
					disabled: !f.trim(),
					className: s("h-6 px-2 border-none rounded text-[11px] font-[inherit]", f.trim() ? "bg-primary text-white cursor-pointer" : "bg-border text-text-tertiary cursor-default"),
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
				children: [/* @__PURE__ */ Q(j, {
					size: "sm",
					value: v,
					onChange: (e) => y(e.target.value.slice(0, 50)),
					placeholder: "Room name",
					className: "flex-1"
				}), /* @__PURE__ */ Q("button", {
					type: "submit",
					disabled: !v.trim() || l,
					className: s("h-6 px-2 border-none rounded text-[11px] font-[inherit]", !v.trim() || l ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: "Create"
				})]
			}),
			g && b && /* @__PURE__ */ Q("div", {
				role: "alert",
				"data-testid": "compact-group-room-error",
				className: "text-danger-fg text-[11px] mb-1.5",
				children: b
			}),
			C.map((e) => /* @__PURE__ */ $(o ? "button" : "div", {
				type: o ? "button" : void 0,
				onClick: o ? () => o(e) : void 0,
				className: s("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1 bg-transparent text-text-primary text-[13px] text-left font-[inherit]", o && "cursor-pointer"),
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
function tt({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = X(""), [a, o] = X("public"), [c, l] = X(null), u = q(), d = async (t) => {
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
				}), /* @__PURE__ */ Q(j, {
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
						onClick: () => o((e) => e === "public" ? "private" : "public"),
						className: s("relative w-11 h-6 rounded-xl border-none cursor-pointer p-0 shrink-0 transition-colors duration-200", a === "private" ? "bg-primary" : "bg-state-idle"),
						children: /* @__PURE__ */ Q("span", { className: s("absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-[left] duration-200", a === "private" ? "left-[23px]" : "left-[3px]") })
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
					className: s("flex-1 h-9 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !r.trim() || n ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
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
function nt({ group: e, currentUserId: t, isSelected: n, onSelect: r, onDelete: i }) {
	let [a, o] = X(null), c = e.ownerId === t;
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
					className: s("text-base text-text-primary", n ? "font-semibold" : "font-normal"),
					children: e.name
				}), e.description && /* @__PURE__ */ Q("div", {
					className: "text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.description
				})]
			}),
			/* @__PURE__ */ Q("span", {
				className: s("text-xs px-2 py-0.5 rounded shrink-0 mr-2", e.visibility === "public" ? "bg-success-bg text-success" : "bg-surface-hover text-text-secondary"),
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
						onClick: () => o(null),
						className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Cancel"
					}), /* @__PURE__ */ Q("button", {
						onClick: () => {
							i(e.groupId), o(null);
						},
						className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Delete"
					})]
				}) : /* @__PURE__ */ Q("button", {
					onClick: () => o(e.groupId),
					className: "text-xs text-danger-fg bg-transparent border-none cursor-pointer px-2 py-1 font-[system-ui,-apple-system,sans-serif]",
					"aria-label": `Delete group ${e.name}`,
					children: "Delete"
				})
			})
		]
	});
}
function rt({ groupId: e, onInvite: t }) {
	let [n, r] = X(""), [i, a] = X(null), o = async (i) => {
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
			o(e);
		},
		className: "flex gap-2 mt-2",
		children: [/* @__PURE__ */ Q(j, {
			className: "flex-1",
			value: n,
			onChange: (e) => r(e.target.value),
			placeholder: "User ID to invite"
		}), /* @__PURE__ */ Q("button", {
			type: "submit",
			disabled: !n.trim(),
			className: s("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", n.trim() ? "bg-primary text-white border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"),
			children: "Invite"
		})]
	}), i && /* @__PURE__ */ Q("div", {
		role: "alert",
		"data-testid": "invite-error",
		className: "text-danger-fg text-xs mt-1",
		children: i
	})] });
}
function it({ members: e }) {
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
function at({ rooms: e, groupId: t, selectedGroupRole: n, createGroupRoom: r, onRoomSelect: i, loading: a }) {
	let [o, c] = X(!1), [l, u] = X(""), [d, f] = X(null), p = e.filter((e) => e.groupId === t), m = async (e) => {
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
			(n === "owner" || n === "admin") && (o ? /* @__PURE__ */ $("form", {
				onSubmit: (e) => {
					m(e);
				},
				className: "mb-2 p-3 bg-surface-panel rounded-lg border border-border",
				children: [/* @__PURE__ */ $("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ Q(j, {
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
							className: s("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !l.trim() || a ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
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
				className: "w-full h-9 mb-2 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Create Room"
			})),
			p.length === 0 ? /* @__PURE__ */ Q("div", {
				className: "text-sm text-text-tertiary py-2",
				children: "No rooms in this group yet."
			}) : p.map((e) => /* @__PURE__ */ $("div", {
				role: i ? "button" : void 0,
				tabIndex: i ? 0 : void 0,
				"aria-label": i ? `Open room ${e.name}` : void 0,
				className: s("flex items-center h-12 border-b border-surface-hover pr-2", i && "cursor-pointer"),
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
function ot({ idToken: e, rooms: n, createGroupRoom: r, onRoomSelect: i, roomsLoading: a, compact: o }) {
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
	if (o) {
		let e = x ? c.find((e) => e.groupId === x) : null;
		return /* @__PURE__ */ $("div", {
			className: "px-2 pt-2",
			children: [
				/* @__PURE__ */ Q("button", {
					onClick: () => b((e) => !e),
					className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
					children: "+ New Group"
				}),
				y && /* @__PURE__ */ Q($e, {
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
				}) : c.map((e) => /* @__PURE__ */ Q(Qe, {
					group: e,
					isSelected: e.groupId === x,
					onClick: () => T(e.groupId)
				}, e.groupId)) }),
				e && /* @__PURE__ */ Q(et, {
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
				}) : c.map((e) => /* @__PURE__ */ Q(nt, {
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
					/* @__PURE__ */ Q(it, { members: p }),
					(D === "owner" || D === "admin") && /* @__PURE__ */ Q(rt, {
						groupId: x,
						onInvite: d
					}),
					/* @__PURE__ */ Q(at, {
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
				className: s("w-full h-9 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]", y && "mb-2"),
				children: y ? "Cancel" : "Create Group"
			}),
			y && /* @__PURE__ */ Q(tt, {
				onCreate: w,
				onDiscard: () => b(!1),
				loading: m
			})
		]
	});
}
//#endregion
//#region src/components/social/ActivityPanel.tsx
function st() {
	return "";
}
var ct = 50;
function lt(e) {
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
function ut(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function dt(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function ft({ idToken: e, sendMessage: t, onMessage: n, connectionState: r }) {
	let [i, a] = X([]), [s, c] = X(!0), [l, u] = X(!1), [d, f] = X(null), [p, m] = X(0), h = Y(t);
	K(() => {
		h.current = t;
	}, [t]);
	let { toast: g } = o(), _ = dt(e), v = W(() => m((e) => e + 1), []);
	return K(() => {
		let t = st();
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
		}, ...e].slice(0, ct));
	}), [n]), {
		items: i,
		loading: s,
		isLive: l,
		error: d,
		retry: v
	};
}
function pt({ idToken: e, sendMessage: t, onMessage: n, connectionState: r }) {
	let { items: i, loading: a, isLive: o, error: c, retry: l } = ft({
		idToken: e,
		sendMessage: t,
		onMessage: n,
		connectionState: r
	});
	return /* @__PURE__ */ $("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [/* @__PURE__ */ $("h2", {
			className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
			children: ["Activity", o && /* @__PURE__ */ Q("span", {
				className: "inline-block w-2 h-2 rounded-full bg-success ml-2 align-middle",
				title: "Live"
			})]
		}), a ? /* @__PURE__ */ $("div", {
			className: "flex items-center gap-2 p-4 justify-center text-text-secondary",
			children: [/* @__PURE__ */ Q("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }), "Loading..."]
		}) : c && i.length === 0 ? /* @__PURE__ */ $("div", {
			role: "alert",
			className: "py-6 px-4 text-center text-danger-fg text-sm flex flex-col items-center gap-2",
			children: [
				/* @__PURE__ */ Q("span", { children: "Couldn't load activity" }),
				/* @__PURE__ */ Q("span", {
					className: "text-text-secondary text-xs",
					children: c
				}),
				/* @__PURE__ */ Q("button", {
					type: "button",
					onClick: l,
					className: "mt-1 px-3 py-1 text-xs font-medium text-info-fg bg-info-bg border border-info-border rounded cursor-pointer",
					children: "Retry"
				})
			]
		}) : i.length === 0 ? /* @__PURE__ */ Q("div", {
			className: "py-10 text-center text-text-tertiary text-sm",
			children: "No activity yet"
		}) : /* @__PURE__ */ Q("div", { children: i.map((e, t) => {
			let { icon: n, text: r } = lt(e);
			return /* @__PURE__ */ $("div", {
				className: s("flex flex-row items-center gap-2 py-2", t < i.length - 1 && "border-b border-surface-hover"),
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
						children: ut(e.timestamp)
					})
				]
			}, t);
		}) })]
	});
}
//#endregion
//#region src/components/social/ReactionsBar.tsx
function mt({ reactions: e, onReact: t, disabled: n = !1, pickerEmojis: r = se, addTriggerLabel: i, hideAddTrigger: a = !1, className: o }) {
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
		className: s("relative inline-flex flex-wrap items-center gap-1", o),
		children: [
			p.map((e) => /* @__PURE__ */ $("button", {
				type: "button",
				onClick: () => d(e.emoji),
				disabled: n,
				"aria-pressed": e.mine ?? !1,
				"data-testid": "reaction-chip",
				"data-emoji": e.emoji,
				"data-mine": e.mine ? "true" : "false",
				className: s("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs leading-none transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", e.mine ? "border-[var(--color-primary)] bg-[var(--color-primary)]/15 text-[var(--color-text-primary)]" : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/60 hover:text-[var(--color-text-primary)]", n && "opacity-50 cursor-not-allowed"),
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
				className: s("inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-border)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", "h-6 min-w-6 px-1.5 text-xs text-[var(--color-text-secondary)] transition-colors", !n && "hover:border-[var(--color-primary)] hover:text-[var(--color-text-primary)]", n && "opacity-50 cursor-not-allowed"),
				children: [i ?? /* @__PURE__ */ Q("span", {
					"aria-hidden": !0,
					children: "+ 😀"
				}), /* @__PURE__ */ Q("span", {
					className: "sr-only",
					children: "Add reaction"
				})]
			}),
			/* @__PURE__ */ Q(oe, {
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
function ht({ items: e, activeId: t, onSelect: n, className: r, "data-testid": i = "conversation-shelf" }) {
	return e.length === 0 ? null : /* @__PURE__ */ Q("ul", {
		"data-testid": i,
		className: s("m-0 flex list-none flex-col gap-0.5 p-0", r),
		children: e.map((e) => {
			let r = e.id === t, a = e.count ?? 0;
			return /* @__PURE__ */ Q("li", { children: /* @__PURE__ */ $("button", {
				type: "button",
				onClick: () => n(e.id),
				"data-testid": `${i}-${e.id}`,
				"data-active": r ? "true" : "false",
				"aria-current": r ? "true" : void 0,
				className: s("flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-left", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", "hover:bg-surface-hover", r && "bg-surface-hover"),
				children: [
					/* @__PURE__ */ Q("span", {
						"aria-hidden": !0,
						className: "grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-surface-inset",
						children: /* @__PURE__ */ Q("span", {
							className: "grid h-4 w-4 shrink-0 place-items-center text-text-secondary",
							children: e.icon ?? /* @__PURE__ */ Q("span", { className: "h-1.5 w-1.5 rounded-full bg-current" })
						})
					}),
					/* @__PURE__ */ Q("span", {
						className: s("min-w-0 flex-1 truncate text-[13px]", a > 0 ? "font-semibold text-text-primary" : "font-medium text-text-secondary"),
						children: e.label
					}),
					a > 0 && /* @__PURE__ */ Q("span", {
						"data-testid": `${i}-${e.id}-count`,
						className: s("grid h-5 min-w-5 shrink-0 place-items-center rounded-full px-1.5 text-[11px] font-semibold leading-none text-white", e.urgent ? "bg-danger" : "bg-primary"),
						children: a > 99 ? "99+" : a
					})
				]
			}) }, e.id);
		})
	});
}
//#endregion
//#region src/components/social/ConversationRail.tsx
function gt({ shelf: e = [], conversations: t, selected: n = null, onSelect: r, onNewChat: i, grouped: a = !0, sectionOrder: o = "channels-first", sectionActions: c, collapsedSections: u, onToggleSection: d, onStartCall: f, maxVisible: p, emptyLabel: m, header: h, beforeList: _, footer: v, onTogglePin: y, onToggleMute: b, onMarkUnread: x, collapsible: S = !1, collapsed: C = !1, onToggleCollapse: w, className: T, "data-testid": E = "conversation-rail" }) {
	let D = S && C, O = n?.kind === "shelf" ? n.id : null;
	return /* @__PURE__ */ $("aside", {
		"data-testid": E,
		className: s("flex min-h-0 shrink-0 flex-col border-r border-border bg-surface", D ? "w-14" : "w-80", S && "relative", T),
		children: [
			S && /* @__PURE__ */ Q("div", {
				className: "absolute right-1 top-1 z-10",
				children: /* @__PURE__ */ Q(l, {
					"aria-label": D ? "Expand the sidebar" : "Collapse the sidebar",
					title: D ? "Expand the sidebar" : "Collapse the sidebar",
					"aria-expanded": !D,
					"data-testid": `${E}-collapse`,
					size: "sm",
					onClick: () => w?.(!D),
					icon: /* @__PURE__ */ Q(g, { dir: D ? "right" : "left" })
				})
			}),
			!D && h && /* @__PURE__ */ Q("div", {
				className: "shrink-0",
				children: h
			}),
			!D && e.length > 0 && /* @__PURE__ */ Q(ht, {
				items: e,
				activeId: O,
				onSelect: (e) => r({
					kind: "shelf",
					id: e
				}),
				className: "shrink-0 px-2 pt-2",
				"data-testid": `${E}-shelf`
			}),
			D && e.length > 0 && /* @__PURE__ */ Q("ul", {
				"data-testid": `${E}-collapsed-shelf`,
				className: "m-0 flex list-none flex-col items-center gap-0.5 p-2 pt-9",
				children: e.map((e) => {
					let t = e.id === O, n = e.count ?? 0;
					return /* @__PURE__ */ Q("li", { children: /* @__PURE__ */ $("button", {
						type: "button",
						onClick: () => r({
							kind: "shelf",
							id: e.id
						}),
						title: e.label,
						"aria-label": e.label,
						"data-testid": `${E}-collapsed-shelf-${e.id}`,
						"data-active": t ? "true" : "false",
						"aria-current": t ? "true" : void 0,
						className: s("relative grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-lg", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", "hover:bg-surface-hover", t && "bg-surface-hover"),
						children: [/* @__PURE__ */ Q("span", {
							"aria-hidden": !0,
							className: "grid h-4 w-4 shrink-0 place-items-center text-text-secondary",
							children: e.icon ?? /* @__PURE__ */ Q("span", { className: "h-1.5 w-1.5 rounded-full bg-current" })
						}), n > 0 && /* @__PURE__ */ Q("span", {
							"data-testid": `${E}-collapsed-shelf-${e.id}-count`,
							className: s("absolute -right-1 -top-1 grid h-4 min-w-4 shrink-0 place-items-center rounded-full px-1 text-[9px] font-semibold leading-none text-white", e.urgent ? "bg-danger" : "bg-primary"),
							children: n > 99 ? "99+" : n
						})]
					}) }, e.id);
				})
			}),
			!D && _ && /* @__PURE__ */ Q("div", {
				className: "shrink-0 px-2",
				children: _
			}),
			!D && /* @__PURE__ */ Q(Ce, {
				items: t,
				grouped: a,
				sectionOrder: o,
				sectionActions: c,
				collapsedSections: u,
				onToggleSection: d,
				onStartCall: f,
				maxVisible: p,
				activeChannel: n?.kind === "conversation" ? n.channel : null,
				onSelect: (e) => r({
					kind: "conversation",
					channel: e
				}),
				onNewChat: i,
				emptyLabel: m,
				onTogglePin: y,
				onToggleMute: b,
				onMarkUnread: x,
				className: "min-h-0 flex-1 overflow-y-auto p-2",
				"data-testid": `${E}-list`
			}),
			!D && v && /* @__PURE__ */ Q("div", {
				className: "shrink-0",
				children: v
			})
		]
	});
}
//#endregion
//#region src/components/social/RunSummaryPanel.tsx
function _t(e, t) {
	return `${e}:${t}`;
}
function vt(e) {
	let t = e.indexOf(":");
	return t <= 0 || t === e.length - 1 ? null : {
		pipelineId: e.slice(0, t),
		runId: e.slice(t + 1)
	};
}
function yt(e) {
	return e === "received" || e === "running" || e === "awaiting_approval";
}
var bt = {
	received: "Received",
	running: "Running",
	awaiting_approval: "Needs approval",
	completed: "Completed",
	rejected: "Rejected",
	failed: "Failed"
}, xt = {
	received: "neutral",
	running: "info",
	awaiting_approval: "warning",
	completed: "success",
	rejected: "danger",
	failed: "danger"
}, St = 8;
function Ct(e) {
	return e.kind === "link" ? e.label ?? "Open link" : e.kind === "panel" ? e.panel.title ? `Open ${e.panel.title}` : "Open result" : "Open beside the chat";
}
function wt({ data: e, onOpenFull: t, onOpenChat: n, onOpenDocument: r, onOpenResult: i, className: a, "data-testid": o = "run-summary-panel" }) {
	let { status: l } = e, u = e.pipelineName || e.pipelineId, d = z({
		startedAt: e.startedAt,
		completedAt: e.completedAt
	}), f = e.ops ?? [], p = e.result && i && !(e.result.kind === "document" && e.document && r), m = e.document?.title || "Document", h = l === "failed" ? e.error || "The run failed" : void 0;
	return /* @__PURE__ */ $("div", {
		className: s("flex h-full min-h-0 flex-col text-[12px]", a),
		"data-testid": o,
		"data-status": l,
		"data-run-id": e.runId,
		"data-pipeline-id": e.pipelineId,
		children: [/* @__PURE__ */ $("div", {
			className: "flex min-h-0 flex-1 flex-col gap-3 overflow-auto p-3",
			children: [
				/* @__PURE__ */ $("header", {
					className: "flex flex-col gap-1",
					"data-testid": `${o}-header`,
					children: [
						/* @__PURE__ */ $("div", {
							className: "flex min-w-0 items-center gap-2",
							children: [/* @__PURE__ */ Q("span", {
								className: "min-w-0 flex-1 truncate text-[13px] font-semibold text-text-primary",
								"data-testid": `${o}-name`,
								children: u
							}), /* @__PURE__ */ Q(O, {
								size: "xs",
								tone: xt[l],
								dot: l === "running" ? "pulse" : void 0,
								"data-testid": `${o}-status`,
								children: bt[l]
							})]
						}),
						d && /* @__PURE__ */ Q("span", {
							className: "text-[11px] text-text-tertiary",
							"data-testid": `${o}-timings`,
							children: d
						}),
						(e.command || e.instruction) && /* @__PURE__ */ $("p", {
							className: "m-0 min-w-0 text-text-primary",
							"data-testid": `${o}-instruction`,
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
					"data-testid": `${o}-steps`,
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
									className: s("relative mt-[5px] inline-block h-[7px] w-[7px] shrink-0 rounded-full", B[t.status] ?? B.pending)
								}),
								/* @__PURE__ */ $("span", {
									className: "flex min-w-0 flex-1 items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ Q("span", {
										className: s("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "font-medium text-text-primary" : "text-text-secondary"),
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
				f.length > 0 && /* @__PURE__ */ $("section", {
					"data-testid": `${o}-ops`,
					children: [
						/* @__PURE__ */ Q("h3", {
							className: "m-0 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
							children: "What changed"
						}),
						/* @__PURE__ */ Q("ul", {
							className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
							children: f.slice(0, St).map((e, t) => /* @__PURE__ */ Q("li", {
								className: "truncate",
								"data-op": e.op,
								title: e.text,
								children: V(e)
							}, t))
						}),
						f.length > St && /* @__PURE__ */ $("div", {
							className: "text-[11px] text-text-tertiary",
							"data-testid": `${o}-more-ops`,
							children: [
								"+",
								f.length - St,
								" more"
							]
						})
					]
				}),
				e.document && /* @__PURE__ */ $("div", {
					className: "flex items-start gap-2 rounded-md border border-border bg-surface-inset px-2 py-1.5",
					"data-testid": `${o}-document`,
					children: [
						/* @__PURE__ */ Q(v, {
							size: 14,
							className: "mt-0.5 shrink-0 text-text-tertiary",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ $("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ Q("span", {
								className: "block truncate font-medium text-text-primary",
								children: m
							}), e.document.snippet && /* @__PURE__ */ Q("span", {
								className: "line-clamp-2 block text-[11px] text-text-secondary",
								children: e.document.snippet
							})]
						}),
						r && /* @__PURE__ */ Q(c, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0.5 text-[11px] leading-5",
							onClick: () => r(e.document.id),
							"data-testid": `${o}-open-document`,
							children: "Open beside the chat"
						})
					]
				}),
				p && e.result && /* @__PURE__ */ $("div", {
					className: "flex items-center gap-2",
					"data-testid": `${o}-result`,
					"data-result-kind": e.result.kind,
					children: [/* @__PURE__ */ Q("span", {
						className: "min-w-0 flex-1 text-text-secondary",
						children: "Result"
					}), /* @__PURE__ */ Q(c, {
						size: "sm",
						variant: "secondary",
						className: "!px-2 !py-0.5 text-[11px] leading-5",
						onClick: () => i(e.result),
						"data-testid": `${o}-open-result`,
						children: Ct(e.result)
					})]
				}),
				h && /* @__PURE__ */ Q(I, {
					tone: "error",
					className: "text-[11px]",
					children: /* @__PURE__ */ Q("span", {
						"data-testid": `${o}-error`,
						children: h
					})
				})
			]
		}), /* @__PURE__ */ $("footer", {
			className: "flex shrink-0 items-center gap-2 border-t border-border px-3 py-2",
			"data-testid": `${o}-footer`,
			children: [/* @__PURE__ */ Q(c, {
				size: "sm",
				variant: "primary",
				onClick: t,
				"data-testid": `${o}-open-full`,
				children: "Open full run"
			}), n && e.channel && /* @__PURE__ */ Q(c, {
				size: "sm",
				variant: "secondary",
				onClick: n,
				"data-testid": `${o}-open-chat`,
				children: "Open chat"
			})]
		})]
	});
}
function Tt({ panel: e, api: t, options: n }) {
	let { load: r, onOpenFull: i, onOpenChat: a, onOpenDocument: o, onOpenResult: s, refreshMs: l = 2e3, "data-testid": u = "run-panel" } = n, [d, f] = X({ status: "loading" }), [p, m] = X(0), h = Y(r);
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
	let g = d.status === "ready" && yt(d.data.status);
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
	let _ = W(() => m((e) => e + 1), []);
	if (d.status === "loading") return /* @__PURE__ */ $("div", {
		className: "flex flex-col gap-3 p-3",
		"data-testid": `${u}-loading`,
		"aria-busy": "true",
		children: [
			/* @__PURE__ */ Q(A, {
				height: 20,
				width: "60%",
				rounded: "md"
			}),
			/* @__PURE__ */ Q(A, {
				height: 14,
				width: "40%",
				rounded: "md"
			}),
			/* @__PURE__ */ Q(A, { height: 96 }),
			/* @__PURE__ */ Q(A, { height: 44 })
		]
	});
	if (d.status === "error") return /* @__PURE__ */ $("div", {
		className: "flex flex-col gap-2 p-3",
		"data-testid": `${u}-error`,
		children: [/* @__PURE__ */ $(I, {
			tone: "error",
			children: ["Could not load this run: ", d.message]
		}), /* @__PURE__ */ Q(c, {
			size: "sm",
			variant: "secondary",
			onClick: _,
			className: "self-start",
			"data-testid": `${u}-retry`,
			children: "Try again"
		})]
	});
	let { data: v } = d;
	return /* @__PURE__ */ Q(wt, {
		data: v,
		onOpenFull: () => i(e, v),
		onOpenChat: a ? () => a(e, v) : void 0,
		onOpenDocument: o,
		onOpenResult: s,
		"data-testid": u
	});
}
function Et(e) {
	return (t, n) => /* @__PURE__ */ Q(Tt, {
		panel: t,
		api: n,
		options: e
	});
}
//#endregion
//#region src/components/social/chatCommands.ts
var Dt = /^chat:dmg?:/;
function Ot(e) {
	return e.channelKind ?? (Dt.test(e.channel) ? "dm" : "room");
}
function kt(e, t) {
	let n = e.scope ?? "always";
	if (typeof n == "function") return n(t);
	switch (n) {
		case "always": return !0;
		case "document-open": return t.sidePanel.current?.kind === "document";
		case "room": return Ot(t) === "room";
		case "dm": return Ot(t) === "dm";
		default: return !0;
	}
}
function At(e) {
	if (e.disabledHint) return e.disabledHint;
	switch (e.scope) {
		case "document-open": return "Open a document beside the chat first";
		case "room": return "Only in rooms";
		case "dm": return "Only in direct messages";
		default: return e.hint ?? "Not available here";
	}
}
function jt(e, t) {
	return e.map((e) => {
		let { run: n, scope: r, disabledHint: i, ...a } = e;
		return kt({ scope: r }, t) ? a : {
			...a,
			disabled: !0,
			hint: At({
				scope: r,
				disabledHint: i,
				hint: a.hint
			})
		};
	});
}
function Mt(e, t) {
	let n = ce(e, t);
	return n ? {
		command: n,
		argumentText: le(e, n).trim()
	} : null;
}
var Nt = "doc", Pt = "panel", Ft = "panel.";
function It(e) {
	return e instanceof URLSearchParams ? new URLSearchParams(e) : new URLSearchParams(e ?? "");
}
function Lt(e) {
	e.delete(Nt), e.delete(Pt);
	for (let t of [...e.keys()]) t.startsWith(Ft) && e.delete(t);
}
function Rt(e, t) {
	let n = It(t);
	if (Lt(n), !e) return n;
	if (e.kind === "document") n.set(Nt, e.id);
	else {
		if (e.kind.includes(":")) throw Error(`A side panel kind cannot contain ':' (got "${e.kind}")`);
		n.set(Pt, `${e.kind}:${e.id}`);
	}
	for (let [t, r] of Object.entries(e.params ?? {})) n.set(`${Ft}${t}`, r);
	return n;
}
function zt(e) {
	let t = It(e), n = {};
	for (let [e, r] of t.entries()) e.startsWith(Ft) && (n[e.slice(6)] = r);
	let r = (e) => Object.keys(n).length ? {
		...e,
		params: n
	} : e, i = t.get(Nt);
	if (i) return r({
		kind: "document",
		id: i
	});
	let a = t.get(Pt);
	if (!a) return null;
	let o = a.indexOf(":");
	return o <= 0 || o === a.length - 1 ? null : r({
		kind: a.slice(0, o),
		id: a.slice(o + 1)
	});
}
//#endregion
//#region src/components/social/ChatCommandProvider.tsx
var Bt = ue(null);
function Vt(...e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) for (let e of n ?? []) t.set(e.trigger.toLowerCase(), e);
	return [...t.values()];
}
function Ht({ commands: e, children: t }) {
	let n = G(Bt), [r, i] = X([]), a = W((e) => (i((t) => [...t, e]), () => i((t) => t.filter((t) => t !== e))), []), o = J(() => ({
		commands: Vt(n?.commands, e, ...r),
		register: a
	}), [
		n?.commands,
		e,
		r,
		a
	]);
	return /* @__PURE__ */ Q(Bt.Provider, {
		value: o,
		children: t
	});
}
function Ut() {
	return G(Bt)?.commands ?? Wt;
}
var Wt = [];
function Gt(e) {
	let t = G(Bt);
	if (!t) throw Error("useRegisterChatCommands needs a <ChatCommandProvider> above it");
	let { register: n } = t;
	K(() => {
		if (!(!e || e.length === 0)) return n(e);
	}, [n, e]);
}
function Kt() {
	let e = Ut();
	return W(async (t, n) => {
		let r = Mt(t, e);
		if (!r) return null;
		let { command: i, argumentText: a } = r;
		if (!kt(i, n)) throw Error(`${i.trigger}: ${At(i)}`);
		return i.run({
			...n,
			text: t,
			argumentText: a
		});
	}, [e]);
}
//#endregion
//#region src/components/social/ChatSidePanelRegistry.tsx
var qt = ue(null);
function Jt({ renderers: e, children: t }) {
	let n = G(qt), r = J(() => ({
		...n ?? {},
		...e ?? {}
	}), [n, e]);
	return /* @__PURE__ */ Q(qt.Provider, {
		value: r,
		children: t
	});
}
function Yt() {
	return G(qt) ?? Xt;
}
var Xt = {};
function Zt(e) {
	return Yt()[e] ?? null;
}
function Qt({ title: e, subtitle: t, onClose: n, onOpenFullPage: r, actions: i, children: a, className: o, "data-testid": u = "chat-side-panel" }) {
	return /* @__PURE__ */ $("section", {
		"aria-label": e,
		"data-testid": u,
		className: s("flex h-full min-h-0 flex-col border-l border-border bg-surface", o),
		children: [/* @__PURE__ */ $("header", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-1.5",
			children: [/* @__PURE__ */ $("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ Q("span", {
					className: "truncate text-[12px] font-semibold text-text-secondary",
					"data-testid": `${u}-title`,
					children: e
				}), t && /* @__PURE__ */ Q("span", {
					className: "truncate text-[11px] text-text-tertiary",
					"data-testid": `${u}-subtitle`,
					children: t
				})]
			}), /* @__PURE__ */ $(x, {
				gap: "xs",
				align: "center",
				wrap: !1,
				className: "shrink-0",
				children: [
					i,
					r && /* @__PURE__ */ Q(c, {
						variant: "ghost",
						size: "sm",
						onClick: r,
						"data-testid": `${u}-open-full`,
						children: "Open full page"
					}),
					/* @__PURE__ */ Q(l, {
						size: "sm",
						"aria-label": "Close panel",
						onClick: n,
						"data-testid": `${u}-close`,
						children: "✕"
					})
				]
			})]
		}), /* @__PURE__ */ Q("div", {
			className: "min-h-0 flex-1 overflow-auto",
			children: a
		})]
	});
}
function $t(e) {
	let t = e.replace(/[-_]+/g, " ").trim();
	return t ? t[0].toUpperCase() + t.slice(1) : "Panel";
}
function en({ panel: e, onClose: t, onOpenFullPage: n, className: r, "data-testid": i = "chat-side-panel" }) {
	let a = Zt(e.kind), [o, s] = X(null), c = J(() => ({
		close: t,
		openFullPage: n ? () => n(e) : void 0,
		setTitle: s
	}), [
		t,
		n,
		e
	]), l = o || e.title || $t(e.kind);
	return /* @__PURE__ */ Q(Qt, {
		title: l,
		onClose: t,
		onOpenFullPage: c.openFullPage,
		className: r,
		"data-testid": i,
		children: a ? /* @__PURE__ */ Q("div", {
			className: "flex h-full min-h-0 flex-col",
			"data-kind": e.kind,
			"data-id": e.id,
			children: a(e, c)
		}, `${e.kind}:${e.id}`) : /* @__PURE__ */ Q(k, {
			size: "sm",
			icon: /* @__PURE__ */ Q(y, { size: 28 }),
			title: `No view registered for ${e.kind}`,
			body: "Register a renderer for this kind with ChatSidePanelProvider.",
			testId: `${i}-empty`
		})
	});
}
//#endregion
//#region src/components/social/ChatBubbleStack.tsx
function tn({ bubble: e, onOpen: t, onDismiss: n, dismissAfterMs: r }) {
	return K(() => {
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
			children: [/* @__PURE__ */ Q(P, {
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
function nn({ bubbles: e, onOpen: t, onDismiss: n, dismissAfterMs: r = 8e3, max: i = 3, className: a, "data-testid": o = "chat-bubble-stack" }) {
	let c = e.slice(-i);
	return c.length === 0 ? null : /* @__PURE__ */ Q("div", {
		className: s("pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2", a),
		"data-testid": o,
		"aria-live": "polite",
		children: c.map((e) => /* @__PURE__ */ Q(tn, {
			bubble: e,
			dismissAfterMs: r,
			onOpen: () => t(e.id),
			onDismiss: () => n(e.id)
		}, e.id))
	});
}
//#endregion
//#region src/components/social/ConversationStart.tsx
function rn({ d: e }) {
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
var an = "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM12 8v6M9 11h6", on = "M4 4h16v12H8l-4 4zM9 9h6M9 12h4", sn = "M22 2 11 13M22 2l-7 20-4-9-9-4z";
function cn({ items: e, onPick: t, disabled: n, searchAbove: r, kind: i, testId: a }) {
	let [o, s] = X(""), c = J(() => {
		let t = o.trim().toLowerCase();
		return t ? e.filter((e) => e.label.toLowerCase().includes(t)) : e;
	}, [e, o]);
	return /* @__PURE__ */ $(w, {
		gap: "none",
		children: [e.length > r && /* @__PURE__ */ Q("div", {
			className: "px-4 pb-1 pt-2",
			children: /* @__PURE__ */ Q(T, {
				value: o,
				onChange: s,
				placeholder: i === "room" ? "Find a room" : "Find a person",
				"data-testid": `${a}-search`
			})
		}), c.length === 0 ? /* @__PURE__ */ $(te, {
			"data-testid": `${a}-none`,
			children: [
				"Nothing matches “",
				o.trim(),
				"”."
			]
		}) : c.map((e) => /* @__PURE__ */ Q(ne, {
			label: e.label,
			icon: e.icon ?? (i === "person" ? /* @__PURE__ */ Q(P, {
				name: e.label,
				size: 20
			}) : void 0),
			onSelect: () => t(e.id),
			disabled: n,
			"data-testid": `${a}-option`
		}, e.id))]
	});
}
function ln({ title: e = "No conversation yet", body: t = "Whichever you choose, the conversation shows up here.", onStart: n, startLabel: r = "Start a conversation", startDescription: i = "A new room, named after this page", rooms: a = [], onAddToRoom: o, people: s = [], onShareWith: l, busy: u = !1, receipt: d = null, searchAbove: f = 6, "data-testid": p = "conversation-start" }) {
	return /* @__PURE__ */ $(w, {
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
				children: /* @__PURE__ */ Q(D, {
					variant: d.tone,
					layout: "stacked",
					"data-testid": `${p}-receipt`,
					children: /* @__PURE__ */ $("span", {
						className: "flex flex-wrap items-center gap-x-2 gap-y-1",
						children: [/* @__PURE__ */ Q("span", { children: d.text }), d.actionLabel && d.onAction && /* @__PURE__ */ Q(c, {
							variant: "ghost",
							size: "sm",
							onClick: d.onAction,
							"data-testid": `${p}-receipt-action`,
							children: d.actionLabel
						})]
					})
				})
			}),
			/* @__PURE__ */ $(re, {
				"data-testid": `${p}-choices`,
				children: [
					n && /* @__PURE__ */ Q(R, {
						icon: /* @__PURE__ */ Q(rn, { d: an }),
						title: r,
						description: i,
						onSelect: n,
						busy: u,
						"data-testid": `${p}-start`
					}),
					o && /* @__PURE__ */ Q(R, {
						icon: /* @__PURE__ */ Q(rn, { d: on }),
						title: "Add to a room",
						description: a.length === 0 ? "No rooms yet" : `${a.length} room${a.length === 1 ? "" : "s"} your team is in`,
						disabled: a.length === 0,
						disabledReason: "There are no rooms to add it to yet",
						busy: u,
						"data-testid": `${p}-rooms`,
						children: /* @__PURE__ */ Q(cn, {
							items: a,
							onPick: o,
							disabled: u,
							searchAbove: f,
							kind: "room",
							testId: `${p}-rooms`
						})
					}),
					l && /* @__PURE__ */ Q(R, {
						icon: /* @__PURE__ */ Q(rn, { d: sn }),
						title: "Send to someone",
						description: s.length === 0 ? "Nobody to send to yet" : "It lands in their chat",
						disabled: s.length === 0,
						disabledReason: "There is nobody to send it to yet",
						busy: u,
						"data-testid": `${p}-people`,
						children: /* @__PURE__ */ Q(cn, {
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
var un = 7, dn = 1, fn = 3650, pn = [
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
], mn = {
	none: "They see what is said from now on.",
	days: "A recent stretch of the conversation.",
	all: "Everything ever said here."
};
function hn({ open: e, conversationName: t, people: n, preselectedIds: r = [], busy: i = !1, anchor: a, placement: o = "bottom-end", onAdd: c, onClose: l, "data-testid": u = "add-to-chat-dialog", historyChoice: d = !0 }) {
	let [f, m] = X(""), [h, g] = X([...r]), [_, v] = X("none"), [y, b] = X(7), [x, S] = X(!1), [w, D] = X(null);
	K(() => {
		e && (m(""), g([...r]), v("none"), b(7), S(!1), D(null));
	}, [e, r.join("\n")]);
	let O = J(() => new Map(n.map((e) => [e.id, e])), [n]), k = J(() => {
		let e = f.trim().toLowerCase();
		return n.filter((t) => !e || t.name.toLowerCase().includes(e) || (t.subtitle ?? "").toLowerCase().includes(e));
	}, [n, f]), A = (e) => g((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), j = Number.isInteger(y) && y >= 1 && y <= 3650, M = i || x, N = h.length > 0 && (!d || _ !== "days" || j) && !M, I = async () => {
		if (N) {
			S(!0), D(null);
			try {
				await c(h, d ? _ === "days" ? {
					mode: _,
					days: y
				} : { mode: _ } : { mode: "all" }), l();
			} catch (e) {
				D(e instanceof Error ? e.message : String(e)), S(!1);
			}
		}
	};
	return /* @__PURE__ */ $(C, {
		open: e,
		anchor: a,
		placement: o,
		width: "lg",
		title: "Add people",
		subtitle: t,
		submitLabel: h.length > 1 ? `Add ${h.length}` : "Add",
		submitTestId: `${u}-add`,
		submitDisabled: !N,
		busy: M,
		error: w,
		onSubmit: () => void I(),
		onClose: l,
		"data-testid": u,
		children: [
			/* @__PURE__ */ Q(T, {
				value: f,
				onChange: m,
				placeholder: "Enter a name",
				"aria-label": "Find people to add",
				className: "w-full",
				"data-testid": `${u}-search`
			}),
			h.length > 0 && /* @__PURE__ */ Q("div", {
				className: "flex flex-wrap gap-1",
				"data-testid": `${u}-picked`,
				children: h.map((e) => {
					let t = O.get(e);
					return /* @__PURE__ */ $("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-primary-bg py-0.5 pl-0.5 pr-1 text-[11px] text-primary-fg",
						"data-testid": `${u}-picked-${e}`,
						children: [
							/* @__PURE__ */ Q(P, {
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
								onClick: () => A(e),
								disabled: M,
								className: "inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border-none bg-transparent p-0 text-current hover:bg-black/10",
								"data-testid": `${u}-unpick-${e}`,
								children: /* @__PURE__ */ Q(p, { size: 9 })
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
				"data-testid": `${u}-people`,
				children: [k.length === 0 && /* @__PURE__ */ Q("li", {
					className: "px-2.5 py-2 text-[11px] text-text-tertiary",
					"data-testid": `${u}-nobody`,
					children: n.length === 0 ? "Everyone is already here." : "Nobody by that name."
				}), k.map((e) => {
					let t = h.includes(e.id);
					return /* @__PURE__ */ Q("li", {
						role: "option",
						"aria-selected": t,
						children: /* @__PURE__ */ $("button", {
							type: "button",
							onClick: () => A(e.id),
							disabled: M,
							className: s("flex w-full items-center gap-2 border-none bg-transparent px-2.5 py-1.5 text-left font-[inherit] text-[13px] hover:bg-surface-hover", t && "bg-surface-inset"),
							"data-testid": `${u}-person-${e.id}`,
							children: [
								/* @__PURE__ */ Q(P, {
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
									className: s("text-[11px]", t ? "text-primary" : "text-transparent"),
									"aria-hidden": "true",
									children: "✓"
								})
							]
						})
					}, e.id);
				})]
			}),
			d && /* @__PURE__ */ Q(E, {
				label: "Chat history",
				hint: _ === "days" ? void 0 : mn[_],
				"data-testid": `${u}-history-field`,
				children: /* @__PURE__ */ Q(F, {
					size: "sm",
					fullWidth: !0,
					disabled: M,
					"aria-label": "How much chat history they get",
					options: pn,
					value: _,
					onChange: (e) => v(e),
					"data-testid": `${u}-history`
				})
			}),
			d && _ === "days" && /* @__PURE__ */ $("div", {
				className: "flex items-center gap-2 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ Q("span", { children: "The past" }),
					/* @__PURE__ */ Q("input", {
						type: "number",
						min: 1,
						max: 3650,
						value: Number.isFinite(y) ? y : "",
						disabled: M,
						"aria-label": "Number of days of history",
						onChange: (e) => b(e.target.value === "" ? NaN : Number(e.target.value)),
						className: s("h-7 w-16 rounded-md border bg-surface px-2 text-[12px] text-text-primary", j ? "border-border" : "border-danger-fg"),
						"data-testid": `${u}-days`
					}),
					/* @__PURE__ */ Q("span", { children: "days" }),
					!j && /* @__PURE__ */ $("span", {
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
function gn(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `Added ${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})}`;
}
function _n({ members: e, open: t = !1, canManage: n = !1, currentUserId: r, onAdd: i, onRemove: a, className: o, "data-testid": u = "members-panel" }) {
	let f = [...e].sort((e, t) => e.role === t.role ? e.name.localeCompare(t.name) : e.role === "owner" ? -1 : 1);
	return /* @__PURE__ */ $("div", {
		className: s("flex min-h-0 flex-col", o),
		"data-testid": u,
		"data-open": String(t),
		children: [/* @__PURE__ */ $("div", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-2",
			children: [/* @__PURE__ */ Q("span", {
				className: "text-xs text-text-tertiary",
				"data-testid": `${u}-count`,
				children: t ? "Open channel" : `${e.length} ${e.length === 1 ? "member" : "members"}`
			}), i && /* @__PURE__ */ Q(c, {
				variant: "secondary",
				size: "sm",
				onClick: (e) => i(e.currentTarget),
				"data-testid": `${u}-add`,
				children: /* @__PURE__ */ $("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ Q(d, { size: 12 }), " Add people"]
				})
			})]
		}), t && e.length === 0 ? /* @__PURE__ */ Q(k, {
			size: "sm",
			title: "Everyone can read this channel.",
			body: "Add people to make it members-only.",
			...i ? {
				actionLabel: "Add people",
				onAction: () => i()
			} : {},
			testId: `${u}-empty`
		}) : /* @__PURE__ */ Q("ul", {
			className: "m-0 min-h-0 flex-1 list-none overflow-y-auto p-0",
			"data-testid": `${u}-list`,
			children: f.map((e) => {
				let t = e.id === r, i = !!a && (n || t);
				return /* @__PURE__ */ $("li", {
					className: "flex items-center gap-2 px-3 py-2",
					"data-testid": `${u}-member-${e.id}`,
					children: [
						/* @__PURE__ */ Q(P, {
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
								children: gn(e.addedAt)
							})]
						}),
						e.role === "owner" && /* @__PURE__ */ Q(O, {
							tone: "neutral",
							size: "xs",
							"data-testid": `${u}-owner-${e.id}`,
							children: "Owner"
						}),
						i && /* @__PURE__ */ Q(l, {
							"aria-label": t ? "Leave" : `Remove ${e.name}`,
							title: t ? "Leave" : "Remove",
							variant: "ghost",
							size: "sm",
							onClick: () => a?.(e.id),
							icon: /* @__PURE__ */ Q(p, { size: 12 }),
							"data-testid": `${u}-remove-${e.id}`
						})
					]
				}, e.id);
			})
		})]
	});
}
//#endregion
//#region src/components/social/ActivePeopleGrid.tsx
var vn = 40, yn = {
	online: "online",
	busy: "busy",
	away: "away"
}, bn = "flex w-full min-w-0 flex-col items-center gap-1 rounded-lg p-1 text-center", xn = "cursor-pointer border-0 bg-transparent hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1";
function Sn(e) {
	let t = e.trim();
	return t ? t.split(/\s+/)[0] : e;
}
function Cn(e) {
	let t = e.status ?? "online", n = [e.displayName, yn[t]];
	return e.activity && n.push(e.activity), e.inCall && n.push("in a call"), n.join(", ");
}
function wn({ person: e, testId: t }) {
	let n = e.status ?? "online";
	return /* @__PURE__ */ $("span", {
		className: "relative inline-flex shrink-0",
		children: [
			/* @__PURE__ */ Q(P, {
				name: e.displayName,
				src: e.avatarUrl,
				size: vn,
				className: s(e.inCall && "ring-2 ring-primary ring-offset-2 ring-offset-[var(--color-surface)]")
			}),
			/* @__PURE__ */ Q(S, {
				state: n,
				className: "absolute -bottom-0.5 -right-0.5 rounded-full ring-2 ring-[var(--color-surface)]"
			}),
			e.activity && /* @__PURE__ */ Q("span", {
				"aria-hidden": "true",
				"data-testid": `${t}-activity-glyph`,
				className: "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-surface-emphasis text-text-secondary ring-2 ring-[var(--color-surface)]",
				children: /* @__PURE__ */ Q(_, { size: 9 })
			})
		]
	});
}
function Tn({ people: e, maxVisible: t = 8, onSelectPerson: n, onShowAll: r, emptyLabel: i = "Nobody is around right now.", className: a, "data-testid": o = "active-people-grid" }) {
	if (e.length === 0) return /* @__PURE__ */ Q("p", {
		"data-testid": `${o}-empty`,
		className: s("text-[12px] text-text-tertiary", a),
		children: i
	});
	let c = e.slice(0, t), l = e.length - c.length;
	return /* @__PURE__ */ $("div", {
		"data-testid": o,
		role: "list",
		"aria-label": "Active now",
		className: s("grid grid-cols-4 gap-x-1 gap-y-2", a),
		children: [c.map((e) => {
			let t = `${o}-person-${e.userId}`, r = Cn(e), i = /* @__PURE__ */ $("span", {
				className: "flex w-full min-w-0 items-center justify-center gap-1",
				children: [e.inCall && /* @__PURE__ */ Q("span", {
					"aria-hidden": "true",
					"data-testid": `${t}-live`,
					className: "h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
				}), /* @__PURE__ */ Q("span", {
					className: "min-w-0 truncate text-[11px] font-medium text-text-primary",
					children: Sn(e.displayName)
				})]
			});
			return n ? /* @__PURE__ */ $("button", {
				type: "button",
				role: "listitem",
				onClick: () => n(e.userId),
				title: r,
				"aria-label": r,
				"data-testid": t,
				className: s(bn, xn),
				children: [/* @__PURE__ */ Q(wn, {
					person: e,
					testId: t
				}), i]
			}, e.userId) : /* @__PURE__ */ $("div", {
				role: "listitem",
				title: r,
				"aria-label": r,
				"data-testid": t,
				className: bn,
				children: [/* @__PURE__ */ Q(wn, {
					person: e,
					testId: t
				}), i]
			}, e.userId);
		}), l > 0 && (r ? /* @__PURE__ */ $("button", {
			type: "button",
			onClick: r,
			"aria-label": `${l} more people`,
			"data-testid": `${o}-more`,
			className: s(bn, xn),
			children: [/* @__PURE__ */ $("span", {
				className: "flex h-10 w-10 items-center justify-center rounded-full bg-surface-emphasis text-[12px] font-semibold text-text-secondary",
				children: ["+", l]
			}), /* @__PURE__ */ Q("span", {
				className: "w-full min-w-0 truncate text-[11px] font-medium text-text-tertiary",
				children: "More"
			})]
		}) : /* @__PURE__ */ $("div", {
			"data-testid": `${o}-more`,
			className: bn,
			children: [/* @__PURE__ */ $("span", {
				className: "flex h-10 w-10 items-center justify-center rounded-full bg-surface-emphasis text-[12px] font-semibold text-text-secondary",
				children: ["+", l]
			}), /* @__PURE__ */ Q("span", {
				className: "w-full min-w-0 truncate text-[11px] font-medium text-text-tertiary",
				children: "More"
			})]
		}))]
	});
}
//#endregion
//#region src/components/social/TeamChannelTree.tsx
function En(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
}
function Dn(e) {
	return [...e].sort((e, t) => Number(!!t.pinned) - Number(!!e.pinned));
}
function On({ teams: e, activeChannel: t = null, onSelectChannel: n, onToggleTeam: r, onCreateChannel: i, onManageTeam: a, onLeaveTeam: o, onTogglePinTeam: c, onTogglePinChannel: l, onCreateTeam: u, heading: f = "Teams", collapsed: p = !1, onToggleCollapse: h, className: _, "data-testid": v = "team-channel-tree" }) {
	let y = f !== !1 && h !== void 0, x = y && p, S = q(), C = `${S}teams-toggle`, w = `${S}teams`, T = r !== void 0, [E, D] = X(() => new Set(e.filter((e) => e.expanded).map((e) => e.teamId))), O = Y(null), [k, A] = X(null), j = (e) => T ? !!e.expanded : E.has(e.teamId), M = (e, t) => {
		r?.(e, t), !T && D((n) => {
			if (n.has(e) === t) return n;
			let r = new Set(n);
			return t ? r.add(e) : r.delete(e), r;
		});
	}, N = (t) => {
		let n = e.find((e) => e.teamId === t);
		n && M(t, !j(n));
	}, F = Dn(e), I = [];
	for (let e of x ? [] : F) if (I.push({
		id: `team:${e.teamId}`,
		kind: "team",
		teamId: e.teamId
	}), j(e)) for (let t of Dn(e.channels)) I.push({
		id: `channel:${t.channel}`,
		kind: "channel",
		teamId: e.teamId,
		channel: t.channel
	});
	let te = k && I.some((e) => e.id === k) ? k : t && I.some((e) => e.kind === "channel" && e.channel === t) ? `channel:${t}` : I[0]?.id ?? null, L = (e) => {
		e && (A(e), O.current?.querySelector(`[data-row-id="${En(e)}"]`)?.focus());
	}, ne = (t) => {
		let r = t.target.closest("[role=\"treeitem\"]")?.dataset.rowId;
		if (!r) return;
		let i = I.findIndex((e) => e.id === r);
		if (i < 0) return;
		let a = I[i], o = e.find((e) => e.teamId === a.teamId);
		if (o) switch (t.key) {
			case "ArrowDown":
				t.preventDefault(), L(I[Math.min(i + 1, I.length - 1)]?.id ?? null);
				return;
			case "ArrowUp":
				t.preventDefault(), L(I[Math.max(i - 1, 0)]?.id ?? null);
				return;
			case "Home":
				t.preventDefault(), L(I[0]?.id ?? null);
				return;
			case "End":
				t.preventDefault(), L(I[I.length - 1]?.id ?? null);
				return;
			case "ArrowRight":
				if (t.preventDefault(), a.kind === "team") {
					if (!j(o)) M(o.teamId, !0);
					else {
						let e = I[i + 1];
						e && e.kind === "channel" && e.teamId === o.teamId && L(e.id);
					}
				}
				return;
			case "ArrowLeft":
				t.preventDefault(), a.kind === "team" ? j(o) && M(o.teamId, !1) : (M(a.teamId, !1), L(`team:${a.teamId}`));
				return;
			case "Enter":
			case " ":
				t.preventDefault(), a.kind === "team" ? N(a.teamId) : n(a.channel);
				return;
		}
	};
	return /* @__PURE__ */ $("div", {
		className: s("flex flex-col", _),
		children: [f !== !1 && /* @__PURE__ */ Q(xe, {
			label: f,
			presentational: !1,
			className: "pt-2",
			...y ? {
				collapsed: p,
				onToggleCollapse: h,
				controls: w,
				toggleId: C,
				collapsedCount: e.reduce((e, t) => e + t.channels.reduce((e, t) => e + (t.unreadCount ?? 0), 0), 0)
			} : {},
			actions: u ? [{
				label: "Create a team",
				onClick: (e) => u(e),
				"data-testid": `${v}-create-team`
			}] : [],
			"data-testid": `${v}-heading`
		}), /* @__PURE__ */ Q("div", {
			ref: O,
			role: "tree",
			id: y ? w : void 0,
			"aria-label": f === !1 ? "Teams" : void 0,
			"aria-labelledby": y ? C : void 0,
			className: "flex flex-col gap-0.5",
			"data-testid": v,
			onKeyDown: ne,
			children: !x && F.map((e) => {
				let r = j(e), u = `team:${e.teamId}`, f = te === u, p = [];
				return a && p.push({
					label: "Manage team",
					onSelect: () => a(e.teamId),
					"data-testid": `${v}-team-${e.teamId}-menu-manage`
				}), c && p.push({
					label: e.pinned ? "Unpin" : "Pin",
					icon: /* @__PURE__ */ Q(b, { size: 14 }),
					onSelect: () => c(e.teamId, !e.pinned),
					"data-testid": `${v}-team-${e.teamId}-menu-pin`
				}), o && p.push({
					label: "Leave team",
					onSelect: () => o(e.teamId),
					"data-testid": `${v}-team-${e.teamId}-menu-leave`
				}), /* @__PURE__ */ $("div", { children: [/* @__PURE__ */ $("div", {
					role: "treeitem",
					"aria-expanded": r,
					"aria-level": 1,
					tabIndex: f ? 0 : -1,
					"data-row-id": u,
					"data-testid": `${v}-team-${e.teamId}`,
					onClick: () => N(e.teamId),
					onFocus: () => A(u),
					className: s("group flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left", "hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"),
					children: [
						/* @__PURE__ */ Q(g, {
							dir: r ? "down" : "right",
							size: 14,
							className: "shrink-0 text-text-tertiary transition-transform"
						}),
						/* @__PURE__ */ Q(P, {
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
								children: /* @__PURE__ */ Q(b, { size: 12 })
							})]
						}),
						i && /* @__PURE__ */ Q("button", {
							type: "button",
							title: `Create a channel in ${e.name}`,
							"aria-label": `Create a channel in ${e.name}`,
							tabIndex: f ? 0 : -1,
							onClick: (t) => {
								t.stopPropagation(), i(e.teamId, t.currentTarget);
							},
							"data-testid": `${v}-team-${e.teamId}-add-channel`,
							className: s("grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-md border-none bg-transparent p-0", "text-text-secondary hover:bg-surface-hover hover:text-text-primary", "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", "[@media(hover:none)]:opacity-100", "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: /* @__PURE__ */ Q(d, { size: 14 })
						}),
						p.length > 0 && /* @__PURE__ */ Q("span", {
							onClick: (e) => e.stopPropagation(),
							className: s("shrink-0 opacity-0 transition-opacity", "group-hover:opacity-100 group-focus-within:opacity-100", "has-[[aria-expanded=true]]:opacity-100", "[@media(hover:none)]:opacity-100"),
							children: /* @__PURE__ */ Q(ee, {
								trigger: /* @__PURE__ */ Q("span", {
									"aria-hidden": !0,
									className: "leading-none tracking-wide",
									children: "⋯"
								}),
								triggerLabel: `More options for ${e.name}`,
								triggerTitle: "More options",
								triggerTabIndex: f ? 0 : -1,
								triggerTestId: `${v}-team-${e.teamId}-menu`,
								triggerClassName: "h-6 w-6 rounded-md border-0 p-0 text-[13px] text-text-secondary hover:bg-surface-hover",
								align: "end",
								sections: [{ items: p }],
								"data-testid": `${v}-team-${e.teamId}-menu-panel`
							})
						})
					]
				}), r && Dn(e.channels).map((e) => {
					let r = `channel:${e.channel}`, i = te === r, a = e.channel === t, o = e.unreadCount ?? 0, c = !!e.muted;
					return /* @__PURE__ */ $("div", {
						role: "treeitem",
						"aria-level": 2,
						"aria-selected": a,
						tabIndex: i ? 0 : -1,
						"data-row-id": r,
						"data-testid": `${v}-channel-${e.channel}`,
						"data-active": a ? "true" : "false",
						onClick: () => n(e.channel),
						onFocus: () => A(r),
						className: s("group flex w-full cursor-pointer items-center gap-2 rounded-md py-1.5 pl-8 pr-2 text-left text-[13px]", "hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", a && "bg-surface-hover"),
						children: [
							/* @__PURE__ */ Q("span", {
								"aria-hidden": !e.private,
								className: "flex h-4 w-4 shrink-0 items-center justify-center text-text-tertiary",
								children: e.private ? /* @__PURE__ */ Q(m, { size: 12 }) : "#"
							}),
							/* @__PURE__ */ $("span", {
								className: "flex min-w-0 flex-1 items-center gap-1.5",
								children: [/* @__PURE__ */ Q("span", {
									className: s("min-w-0 truncate", o > 0 ? "font-semibold" : "font-medium", "text-text-primary"),
									children: e.name
								}), e.pinned && /* @__PURE__ */ Q("span", {
									"data-testid": `${v}-channel-${e.channel}-pinned`,
									title: "Pinned",
									className: "shrink-0 text-text-tertiary",
									children: /* @__PURE__ */ Q(b, { size: 12 })
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
							o > 0 && /* @__PURE__ */ Q("span", {
								"data-testid": `${v}-channel-${e.channel}-unread`,
								"data-muted": c ? "true" : "false",
								className: s("grid h-5 min-w-5 shrink-0 place-items-center rounded-full px-1.5 text-[11px] font-semibold leading-none", c ? "bg-surface-inset text-text-secondary" : "bg-primary text-white"),
								children: o > 99 ? "99+" : o
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
								className: s("grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-md border-none bg-transparent p-0", "text-text-secondary hover:bg-surface-hover hover:text-text-primary", "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", "[@media(hover:none)]:opacity-100", "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
								children: /* @__PURE__ */ Q(b, { size: 12 })
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
var kn = 80, An = [{
	label: "Standard",
	value: "standard"
}, {
	label: "Private",
	value: "private",
	icon: /* @__PURE__ */ Q(m, { size: 12 })
}];
function jn({ open: e, teamName: t, busy: n = !1, anchor: r, placement: i = "right", onCreate: a, onClose: o, "data-testid": s = "create-channel-dialog" }) {
	let [c, l] = X(""), [u, d] = X(""), [f, p] = X("standard"), [m, h] = X(!1), [g, _] = X(null);
	K(() => {
		e && (l(""), d(""), p("standard"), h(!1), _(null));
	}, [e]);
	let v = c.trim(), y = n || m, b = v.length > 0 && v.length <= kn && !y, x = async () => {
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
	return /* @__PURE__ */ $(C, {
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
		submitDisabled: !b,
		busy: y,
		error: g,
		onSubmit: () => void x(),
		onClose: o,
		"data-testid": s,
		children: [
			/* @__PURE__ */ Q(E, {
				label: "Name",
				"data-testid": `${s}-name-field`,
				children: /* @__PURE__ */ Q(j, {
					size: "sm",
					value: c,
					maxLength: kn,
					disabled: y,
					placeholder: "e.g. design-reviews",
					onChange: (e) => l(e.target.value),
					"data-testid": `${s}-name`
				})
			}),
			/* @__PURE__ */ Q(E, {
				label: "Description",
				"data-testid": `${s}-description-field`,
				children: /* @__PURE__ */ Q(M, {
					value: u,
					rows: 2,
					disabled: y,
					placeholder: "What is this channel for?",
					onChange: (e) => d(e.target.value),
					"data-testid": `${s}-description`
				})
			}),
			/* @__PURE__ */ Q(E, {
				label: "Privacy",
				hint: f === "private" ? "Only people you add can see it." : "Everyone on the team can see it.",
				"data-testid": `${s}-privacy-field`,
				children: /* @__PURE__ */ Q(F, {
					size: "sm",
					fullWidth: !0,
					disabled: y,
					"aria-label": "Channel privacy",
					options: An,
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
function Mn({ open: e, candidates: t, anchor: n, placement: r = "bottom-start", busy: i = !1, error: a = null, onStart: o, onClose: s, "data-testid": c = "new-chat" }) {
	return e ? /* @__PURE__ */ Q(de, {
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
		children: ({ list: t, confirm: o }) => /* @__PURE__ */ Q(C, {
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
var Nn = 80, Pn = [{
	label: "Org-wide",
	value: "org"
}, {
	label: "Private",
	value: "private",
	icon: /* @__PURE__ */ Q(m, { size: 12 })
}];
function Fn({ open: e, busy: t = !1, anchor: n, placement: r = "bottom-end", onCreate: i, onClose: a, "data-testid": o = "create-team-dialog" }) {
	let [s, c] = X(""), [l, u] = X(""), [d, f] = X("org"), [p, m] = X(!1), [h, g] = X(null);
	K(() => {
		e && (c(""), u(""), f("org"), m(!1), g(null));
	}, [e]);
	let _ = s.trim(), v = t || p, y = _.length > 0 && _.length <= Nn && !v, b = async () => {
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
	return /* @__PURE__ */ $(C, {
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
			/* @__PURE__ */ Q(E, {
				label: "Name",
				"data-testid": `${o}-name-field`,
				children: /* @__PURE__ */ Q(j, {
					size: "sm",
					value: s,
					maxLength: Nn,
					disabled: v,
					placeholder: "e.g. Design",
					onChange: (e) => c(e.target.value),
					"data-testid": `${o}-name`
				})
			}),
			/* @__PURE__ */ Q(E, {
				label: "Description",
				"data-testid": `${o}-description-field`,
				children: /* @__PURE__ */ Q(M, {
					value: l,
					rows: 2,
					disabled: v,
					placeholder: "What does this team work on?",
					onChange: (e) => u(e.target.value),
					"data-testid": `${o}-description`
				})
			}),
			/* @__PURE__ */ Q(E, {
				label: "Who can join",
				hint: d === "private" ? "People need an invitation." : "Anyone in the org can join.",
				"data-testid": `${o}-visibility-field`,
				children: /* @__PURE__ */ Q(F, {
					size: "sm",
					fullWidth: !0,
					disabled: v,
					"aria-label": "Team visibility",
					options: Pn,
					value: d,
					onChange: (e) => f(e),
					"data-testid": `${o}-visibility`
				})
			})
		]
	});
}
//#endregion
export { de as $, Rt as A, pt as B, Kt as C, kt as D, jt as E, vt as F, Me as G, Ze as H, _t as I, Ce as J, je as K, gt as L, wt as M, Et as N, Mt as O, yt as P, ve as Q, ht as R, Gt as S, At as T, Ue as U, ot as V, Re as W, be as X, xe as Y, ye as Z, Zt as _, Tn as a, Vt as b, un as c, ln as d, nn as f, $t as g, Jt as h, On as i, Tt as j, zt as k, fn as l, Qt as m, Mn as n, _n as o, en as p, Ae as q, jn as r, hn as s, Fn as t, dn as u, Yt as v, Ot as w, Ut as x, Ht as y, mt as z };
