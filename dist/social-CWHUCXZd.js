import { a as e, i as t, n, o as r, r as i, t as a } from "./useSocialProfile-5S1qyvsv.js";
import { n as o } from "./ToastProvider-BKjV21G4.js";
import { t as s } from "./cn-DhjIN-s0.js";
import { t as c } from "./Button-BhS4-R6_.js";
import { t as l } from "./IconButton-C3DMtvSx.js";
import { d as u, o as d, r as f, t as p, u as m } from "./DropdownMenu-Bjmwaxsw.js";
import { i as h, n as g, r as _, t as v } from "./SearchInput-B-r0inFw.js";
import { t as y } from "./Banner-C3Wgh62A.js";
import { t as b } from "./Chip-BENLwTlq.js";
import { t as x } from "./Modal-CyoyiNKN.js";
import { t as S } from "./EmptyState-JzzL2z1E.js";
import { t as C } from "./FormField-CimyMT7N.js";
import { t as w } from "./SkeletonCard-CGe8XFPB.js";
import { t as T } from "./Input-DLknWXri.js";
import { t as E } from "./Textarea-Dz4doxTv.js";
import { n as D, t as O } from "./Avatar-BzicCOft.js";
import { t as k } from "./InlineAlert-Myf3oJZf.js";
import { t as A } from "./InlinePlaceholder-51dbPRGn.js";
import { t as j } from "./Select-CqVokE2v.js";
import { n as M, r as N, t as P } from "./ChoiceList-CaZ4rZrS.js";
import { G as F, K as I, M as L, N as R, O as z } from "./ConversationSurface-C8ASfaav.js";
import { t as B } from "./rovingFocus-Bj5Y6kwY.js";
import { n as ee, t as te } from "./ReactionPickerPopover-CcL-n6gt.js";
import { n as ne, t as re } from "./composerCommands-DXer0id_.js";
import { createContext as ie, useCallback as V, useContext as H, useEffect as U, useId as ae, useMemo as W, useRef as G, useState as K } from "react";
import { Fragment as q, jsx as J, jsxs as Y } from "react/jsx-runtime";
//#region src/components/social/SocialPanel.tsx
function X(e, t) {
	return {
		id: e.userId,
		displayName: e.displayName,
		bio: "",
		avatarUrl: e.avatarUrl ?? null,
		visibility: e.visibility,
		followState: t
	};
}
function oe(e) {
	return {
		id: e.userId,
		displayName: e.displayName,
		bio: e.bio ?? "",
		avatarUrl: e.avatarUrl ?? null,
		visibility: e.visibility
	};
}
function se({ user: e, size: t }) {
	let n = e.displayName.slice(0, 2).toUpperCase();
	return e.avatarUrl ? /* @__PURE__ */ J("div", {
		className: s("rounded-full bg-border flex items-center justify-center font-semibold text-text-primary shrink-0 overflow-hidden", t === 48 ? "w-12 h-12 text-base" : "w-8 h-8 text-xs"),
		children: /* @__PURE__ */ J("img", {
			src: e.avatarUrl,
			alt: `${e.displayName}'s avatar`,
			className: "w-full h-full object-cover"
		})
	}) : /* @__PURE__ */ J("div", {
		className: s("rounded-full bg-border flex items-center justify-center font-semibold text-text-primary shrink-0 overflow-hidden", t === 48 ? "w-12 h-12 text-base" : "w-8 h-8 text-xs"),
		"aria-label": `Avatar placeholder for ${e.displayName}`,
		children: n
	});
}
function ce({ targetUser: e, followState: t, compact: n = !1, onFollowChange: r }) {
	let [i, a] = K(!1);
	return t === "not-following" ? /* @__PURE__ */ J("button", {
		className: s("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border-none font-[system-ui,-apple-system,sans-serif] bg-primary text-white font-semibold", n ? "h-7" : "h-9"),
		onClick: () => {
			r(e.id, "pending");
		},
		"aria-label": `Follow ${e.displayName}`,
		children: "Follow"
	}) : t === "pending" ? /* @__PURE__ */ J("button", {
		className: s("rounded-lg text-sm min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface-hover text-text-secondary font-normal cursor-default", n ? "h-7" : "h-9"),
		disabled: !0,
		"aria-label": `Follow ${e.displayName}`,
		children: "Following…"
	}) : /* @__PURE__ */ Y("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ J("button", {
			className: s("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface text-text-primary font-normal", n ? "h-7" : "h-9"),
			onClick: () => a(!0),
			"aria-label": `Unfollow ${e.displayName}`,
			children: "Following"
		}), i && /* @__PURE__ */ Y("div", {
			role: "group",
			"aria-label": "Confirm unfollow",
			className: "flex gap-2 items-center",
			children: [
				/* @__PURE__ */ Y("span", {
					className: "text-sm text-text-primary mr-1",
					children: [
						"Unfollow ",
						e.displayName,
						"?"
					]
				}),
				/* @__PURE__ */ J("button", {
					onClick: () => a(!1),
					className: "h-9 rounded-lg text-sm px-3 bg-surface text-text-primary border border-border cursor-pointer font-[system-ui,-apple-system,sans-serif]",
					children: "Keep Following"
				}),
				/* @__PURE__ */ J("button", {
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
function le({ user: e, isOwnProfile: t, onSave: n }) {
	let [r, i] = K(!1), [a, o] = K(e.displayName), [c, l] = K(e.bio), [u, d] = K(e.avatarUrl ?? ""), [f, p] = K(e.visibility), [m, h] = K(!1), [g, _] = K(null), v = ae();
	U(() => {
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
	return r ? /* @__PURE__ */ Y("div", { children: [
		/* @__PURE__ */ Y("div", {
			className: "mb-3",
			children: [/* @__PURE__ */ J("label", {
				htmlFor: `${v}-display-name`,
				className: "text-sm text-text-primary block mb-1",
				children: "Display name"
			}), /* @__PURE__ */ J(T, {
				id: `${v}-display-name`,
				value: a,
				onChange: (e) => o(e.target.value.slice(0, 50)),
				placeholder: "Your name",
				maxLength: 50
			})]
		}),
		/* @__PURE__ */ Y("div", {
			className: "mb-3",
			children: [/* @__PURE__ */ J("label", {
				htmlFor: `${v}-bio`,
				className: "text-sm text-text-primary block mb-1",
				children: "Bio"
			}), /* @__PURE__ */ J(E, {
				id: `${v}-bio`,
				value: c,
				onChange: (e) => l(e.target.value.slice(0, 160)),
				placeholder: "Tell people a bit about yourself (max 160 characters)",
				maxLength: 160,
				rows: 3,
				className: "resize-y"
			})]
		}),
		/* @__PURE__ */ Y("div", {
			className: "mb-4",
			children: [/* @__PURE__ */ J("label", {
				htmlFor: `${v}-avatar-url`,
				className: "text-sm text-text-primary block mb-1",
				children: "Avatar URL"
			}), /* @__PURE__ */ J(T, {
				id: `${v}-avatar-url`,
				value: u,
				onChange: (e) => d(e.target.value),
				placeholder: "https://example.com/avatar.png"
			})]
		}),
		/* @__PURE__ */ J("div", {
			className: "mb-4",
			children: /* @__PURE__ */ J("div", {
				role: "radiogroup",
				"aria-label": "Profile visibility",
				onKeyDown: (e) => B(e, { itemSelector: "[role=\"radio\"]" }),
				className: "flex gap-2",
				children: ["public", "private"].map((e) => /* @__PURE__ */ J("button", {
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
		/* @__PURE__ */ Y("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ J("button", {
				onClick: () => {
					y();
				},
				disabled: m,
				className: s("flex-1 h-9 bg-primary text-white border-none rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", m ? "cursor-default" : "cursor-pointer"),
				children: m ? "Saving…" : "Save Changes"
			}), /* @__PURE__ */ J("button", {
				onClick: () => i(!1),
				className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Discard Changes"
			})]
		}),
		g && /* @__PURE__ */ J("div", {
			role: "alert",
			"data-testid": "profile-save-error",
			className: "text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
			children: g
		})
	] }) : /* @__PURE__ */ Y("div", { children: [
		/* @__PURE__ */ Y("div", {
			className: "flex items-start gap-3 mb-3",
			children: [/* @__PURE__ */ J(se, {
				user: e,
				size: 48
			}), /* @__PURE__ */ Y("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ Y("div", {
					className: "flex items-center gap-2 mb-1",
					children: [/* @__PURE__ */ J("span", {
						className: "text-xl font-semibold text-text-primary",
						children: e.displayName
					}), /* @__PURE__ */ J("span", {
						className: s("text-xs px-2 py-0.5 rounded", e.visibility === "public" ? "bg-success-bg text-success" : "bg-surface-hover text-text-secondary"),
						children: e.visibility === "public" ? "Public" : "Private"
					})]
				}), /* @__PURE__ */ J("p", {
					className: "text-base text-text-primary m-0 overflow-hidden line-clamp-3",
					children: e.bio
				})]
			})]
		}),
		/* @__PURE__ */ Y("div", {
			className: "flex gap-4 text-sm text-text-secondary mb-3",
			children: [
				/* @__PURE__ */ Y("span", { children: [/* @__PURE__ */ J("strong", {
					className: "text-text-primary",
					children: e.followersCount ?? "—"
				}), " Followers"] }),
				/* @__PURE__ */ Y("span", { children: [/* @__PURE__ */ J("strong", {
					className: "text-text-primary",
					children: e.followingCount ?? "—"
				}), " Following"] }),
				/* @__PURE__ */ Y("span", { children: [/* @__PURE__ */ J("strong", {
					className: "text-text-primary",
					children: e.friendsCount ?? "—"
				}), " Friends"] })
			]
		}),
		t && /* @__PURE__ */ J("button", {
			onClick: () => i(!0),
			className: "text-sm text-primary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
			children: "Edit profile"
		})
	] });
}
function ue({ followers: e, following: t, friends: n, followStates: r, onFollowChange: i, loadError: a }) {
	let [o, c] = K("followers"), l = (e) => a ? "" : ` (${e.length})`, u = [
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
	return /* @__PURE__ */ Y("div", {
		className: "mt-4",
		children: [/* @__PURE__ */ J("div", {
			role: "tablist",
			"aria-label": "Connections",
			onKeyDown: B,
			className: "flex border-b border-border mb-3",
			children: u.map((e) => /* @__PURE__ */ J("button", {
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
		}), /* @__PURE__ */ J("div", {
			role: "tabpanel",
			id: "social-tabpanel",
			"aria-labelledby": `social-tab-${o}`,
			className: "min-h-[120px]",
			children: a && f.length === 0 ? /* @__PURE__ */ Y("div", {
				role: "alert",
				"data-testid": "social-graph-error",
				className: "py-6 text-center",
				children: [/* @__PURE__ */ J("div", {
					className: "text-sm font-semibold text-danger-fg mb-1",
					children: "Couldn’t load your connections"
				}), /* @__PURE__ */ J("div", {
					className: "text-sm text-text-tertiary",
					children: a
				})]
			}) : f.length === 0 ? /* @__PURE__ */ Y("div", {
				className: "py-6 text-center",
				children: [/* @__PURE__ */ J("div", {
					className: "text-sm font-semibold text-text-primary mb-1",
					children: d[o].heading
				}), /* @__PURE__ */ J("div", {
					className: "text-sm text-text-tertiary",
					children: d[o].body
				})]
			}) : /* @__PURE__ */ J("div", { children: f.map((e) => /* @__PURE__ */ Y("div", {
				className: "flex items-center gap-2 h-14 border-b border-surface-hover",
				children: [
					/* @__PURE__ */ J(se, {
						user: e,
						size: 32
					}),
					/* @__PURE__ */ Y("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ J("div", {
							className: "text-base text-text-primary",
							children: e.displayName
						}), /* @__PURE__ */ J("div", {
							className: "text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap max-w-[240px]",
							children: e.visibility === "private" ? /* @__PURE__ */ J("em", {
								className: "text-text-tertiary",
								children: "This profile is private."
							}) : e.bio
						})]
					}),
					/* @__PURE__ */ J(ce, {
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
function de({ idToken: t, onMessage: n }) {
	let { profile: r, loading: i, error: o, updateProfile: s } = a({ idToken: t }), { followers: c, following: l, friends: u, follow: d, unfollow: f, error: p, loadError: m } = e({ idToken: t }), h = new Set(l.map((e) => e.userId)), g = {};
	[
		...c,
		...l,
		...u
	].forEach((e) => {
		g[e.userId] = h.has(e.userId) ? "following" : "not-following";
	});
	let [_, v] = K(null), y = async (e, t) => {
		v(null);
		try {
			t === "following" || t === "pending" ? await d(e) : await f(e);
		} catch (e) {
			v(e instanceof Error ? e.message : "Follow action failed");
		}
	}, b = c.map((e) => X(e, g[e.userId] ?? "not-following")), x = l.map((e) => X(e, "following")), S = u.map((e) => X(e, "following")), C = r ? {
		...oe(r),
		followersCount: m ? void 0 : c.length,
		followingCount: m ? void 0 : l.length,
		friendsCount: m ? void 0 : u.length
	} : null;
	return /* @__PURE__ */ Y("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ J("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
				children: "Social Profile"
			}),
			i && !C ? /* @__PURE__ */ J("div", {
				className: "py-10 text-center text-text-tertiary text-sm",
				children: "Loading profile…"
			}) : C ? /* @__PURE__ */ Y(q, { children: [/* @__PURE__ */ J(le, {
				user: C,
				isOwnProfile: !0,
				onSave: s
			}), /* @__PURE__ */ J(ue, {
				followers: b,
				following: x,
				friends: S,
				followStates: g,
				onFollowChange: y,
				loadError: m
			})] }) : null,
			(_ ?? o ?? p) && /* @__PURE__ */ J("div", {
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
function fe(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64);
}
function pe({ people: e, onStartDm: t, onCreateChannel: n, onCancel: r, peopleError: i = null, busy: a = !1, className: o, "data-testid": c = "new-conversation" }) {
	let [l, u] = K(""), d = G(null), f = W(() => {
		let t = l.trim().toLowerCase();
		return t ? e.filter((e) => e.displayName.toLowerCase().includes(t)) : e;
	}, [e, l]), p = fe(l), m = !!n && p.length > 0;
	return /* @__PURE__ */ Y("div", {
		"data-testid": c,
		className: s("flex flex-col gap-1 rounded-lg border border-border bg-surface p-2", o),
		children: [/* @__PURE__ */ Y("div", {
			className: "flex items-center gap-1.5",
			children: [/* @__PURE__ */ J(T, {
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
			}), r && /* @__PURE__ */ J("button", {
				type: "button",
				onClick: r,
				disabled: a,
				"data-testid": `${c}-cancel`,
				className: "rounded px-2 py-1 text-xs text-text-secondary hover:bg-surface-hover",
				children: "Cancel"
			})]
		}), i ? /* @__PURE__ */ Y("p", {
			role: "alert",
			"data-testid": `${c}-error`,
			className: "m-0 px-1 py-1.5 text-xs text-danger-fg",
			children: ["Couldn’t load people. ", i]
		}) : /* @__PURE__ */ Y("ul", {
			className: "m-0 flex max-h-64 list-none flex-col gap-0.5 overflow-y-auto p-0",
			children: [
				f.map((e) => /* @__PURE__ */ J("li", { children: /* @__PURE__ */ Y("button", {
					type: "button",
					onClick: () => void t(e.userId),
					disabled: a,
					"data-testid": `${c}-person`,
					className: "flex w-full items-center gap-2 rounded px-1.5 py-1.5 text-left hover:bg-surface-hover",
					children: [/* @__PURE__ */ J(O, {
						name: e.displayName,
						src: e.avatarUrl,
						color: e.color,
						size: 26
					}), /* @__PURE__ */ Y("span", {
						className: "flex min-w-0 flex-col",
						children: [/* @__PURE__ */ J("span", {
							className: "truncate text-[13px] text-text-primary",
							children: e.displayName
						}), e.hint && /* @__PURE__ */ J("span", {
							className: "truncate text-[11px] text-text-tertiary",
							children: e.hint
						})]
					})]
				}) }, e.userId)),
				f.length === 0 && !m && /* @__PURE__ */ J("li", {
					className: "px-1.5 py-2 text-xs text-text-secondary",
					"data-testid": `${c}-empty`,
					children: l.trim() ? "Nobody by that name." : "Nobody to talk to yet."
				}),
				m && /* @__PURE__ */ J("li", { children: /* @__PURE__ */ Y("button", {
					type: "button",
					onClick: () => void n?.(p),
					disabled: a,
					"data-testid": `${c}-create-channel`,
					className: "flex w-full items-center gap-2 rounded px-1.5 py-1.5 text-left hover:bg-surface-hover",
					children: [/* @__PURE__ */ J("span", {
						"aria-hidden": !0,
						className: "grid h-[26px] w-[26px] shrink-0 place-items-center rounded-lg bg-surface-inset text-sm text-text-secondary",
						children: "#"
					}), /* @__PURE__ */ Y("span", {
						className: "min-w-0 truncate text-[13px] text-text-primary",
						children: ["Create channel ", /* @__PURE__ */ Y("span", {
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
function me(e, t) {
	let n = e.lastMessageAt ? Date.parse(e.lastMessageAt) : NaN, r = t.lastMessageAt ? Date.parse(t.lastMessageAt) : NaN, i = Number.isNaN(n) ? null : n, a = Number.isNaN(r) ? null : r;
	return i === null && a === null ? 0 : i === null ? 1 : a === null ? -1 : a - i;
}
function Z({ items: e, grouped: t = !1, sectionOrder: n = "channels-first", sortByRecency: r = !0, maxVisible: i, activeChannel: a, onSelect: o, onNewChat: c, emptyLabel: l = "No conversations yet", onTogglePin: u, onToggleMute: d, onMarkUnread: h, tone: _ = "light", className: v, "data-testid": y }) {
	let b = _ === "dark", x = y ?? "conversation", S = r ? [...e].sort(me) : e, C = [], w = S.filter((e) => e.pinned), T = w.length > 0 ? S.filter((e) => !e.pinned) : S;
	if (w.length > 0 && C.push({
		heading: "Pinned",
		label: "Pinned",
		items: w
	}), t) {
		let e = (e) => (e.kind ?? (e.peers.length > 1 ? "group" : "dm")) === "channel", t = T.filter(e), r = T.filter((t) => !e(t)), i = {
			heading: "Channels",
			label: "Channels",
			items: t
		}, a = {
			heading: "Direct messages",
			label: "Direct messages",
			items: r
		}, o = n === "dms-first" ? [a, i] : [i, a];
		for (let e of o) e.items.length > 0 && C.push(e);
	} else T.length > 0 && C.push({
		label: "Conversations",
		items: T
	});
	let [E, k] = K(() => /* @__PURE__ */ new Set()), A = C.map((e) => {
		let t = i !== void 0 && i >= 0 && e.items.length > i;
		if (!t || E.has(e.label)) return {
			...e,
			shown: e.items,
			hidden: 0,
			capped: t
		};
		let n = e.items.slice(0, i), r = a ? e.items.find((e) => e.channel === a) : void 0;
		return r && !n.includes(r) && (n = i === 0 ? [r] : [...n.slice(0, -1), r]), {
			...e,
			shown: n,
			hidden: e.items.length - n.length,
			capped: t
		};
	}), j = (e) => k((t) => {
		let n = new Set(t);
		return n.has(e) ? n.delete(e) : n.add(e), n;
	}), M = A.flatMap((e) => e.shown), N = G(null), [P, F] = K(null), L = (P && M.some((e) => e.channel === P) ? P : null) ?? (a && M.some((e) => e.channel === a) ? a : null) ?? M[0]?.channel ?? null, R = G(null);
	U(() => {
		let e = R.current;
		if (!e) return;
		R.current = null;
		let t = N.current?.querySelector(`[data-testid="conversation-row"][data-channel="${CSS.escape(e)}"]`);
		t?.focus(), t?.scrollIntoView({ block: "nearest" });
	});
	function z(e) {
		let t = Math.max(0, Math.min(M.length - 1, e)), n = M[t];
		!n || n.channel === L || (R.current = n.channel, F(n.channel));
	}
	function B(e) {
		if (M.length === 0) return;
		let t = M.findIndex((e) => e.channel === L), n = t < 0 ? 0 : t;
		switch (e.key) {
			case "ArrowDown":
				z(n + 1);
				break;
			case "ArrowUp":
				z(n - 1);
				break;
			case "Home":
				z(0);
				break;
			case "End":
				z(M.length - 1);
				break;
			default: return;
		}
		e.preventDefault();
	}
	return /* @__PURE__ */ Y("div", {
		className: s("flex min-h-0 flex-col gap-1", v),
		"data-testid": y,
		children: [c && /* @__PURE__ */ Y("button", {
			type: "button",
			onClick: c,
			"data-testid": "conversation-new-chat",
			className: s("flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] font-medium", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", b ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"),
			children: [/* @__PURE__ */ J("span", {
				"aria-hidden": "true",
				className: s("grid h-6 w-6 place-items-center rounded-full border border-dashed text-sm leading-none", b ? "border-white/30" : "border-border"),
				children: "+"
			}), "New chat"]
		}), e.length === 0 ? /* @__PURE__ */ J("p", {
			className: s("m-0 px-2 py-1.5 text-[13px]", b ? "text-white/60" : "text-text-secondary"),
			"data-testid": "conversation-empty",
			children: l
		}) : /* @__PURE__ */ J("div", {
			ref: N,
			onKeyDown: B,
			className: "m-0 flex min-h-0 flex-col overflow-y-auto p-0",
			children: A.map((e) => /* @__PURE__ */ Y("div", { children: [
				e.heading && /* @__PURE__ */ J("p", {
					"data-testid": "conversation-section",
					"aria-hidden": !0,
					className: s("m-0 px-2 pb-0.5 pt-3 text-[11px] font-semibold uppercase tracking-wide", b ? "text-white/40" : "text-text-tertiary"),
					children: e.heading
				}),
				/* @__PURE__ */ J("ul", {
					className: "m-0 flex list-none flex-col gap-0.5 p-0",
					"aria-label": e.label,
					children: e.shown.map((e) => {
						let t = e.channel === a, n = e.channel === L, r = e.kind ?? (e.peers.length > 1 ? "group" : "dm"), i = r === "channel", c = r === "group", l = e.peers[0], _ = i ? e.name ?? e.channel : e.peers.map((e) => e.displayName).join(", "), v = e.lastMessageAt ? I(e.lastMessageAt) : "", y = e.unreadCount ?? 0, S = !!e.mentioned, C = !!e.live, w = !!e.muted, T = `${x}-row-menu-${e.channel}`, E = [];
						return u && E.push({
							label: e.pinned ? "Unpin" : "Pin",
							icon: /* @__PURE__ */ J(m, { size: 14 }),
							onSelect: () => u(e.channel, !e.pinned),
							"data-testid": `${T}-pin`
						}), d && E.push({
							label: w ? "Unmute" : "Mute",
							icon: /* @__PURE__ */ J(f, { size: 14 }),
							onSelect: () => d(e.channel, !w),
							"data-testid": `${T}-mute`
						}), h && y === 0 && E.push({
							label: "Mark as unread",
							onSelect: () => h(e.channel),
							"data-testid": `${T}-unread`
						}), /* @__PURE__ */ Y("li", {
							className: s("relative", E.length > 0 && "group"),
							children: [/* @__PURE__ */ Y("button", {
								type: "button",
								onClick: () => o(e.channel),
								onFocus: () => F(e.channel),
								"data-testid": "conversation-row",
								"data-channel": e.channel,
								"data-active": t ? "true" : "false",
								"aria-current": t ? "true" : void 0,
								tabIndex: n ? 0 : -1,
								className: s("flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-left", E.length > 0 && "pr-8", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", b ? "hover:bg-white/10" : "hover:bg-surface-hover", t && (b ? "bg-white/10" : "bg-surface-hover")),
								children: [
									i ? /* @__PURE__ */ J("span", {
										"aria-hidden": "true",
										"data-testid": "conversation-channel-glyph",
										className: s("grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[15px] font-semibold leading-none", b ? "bg-white/10 text-white/70" : "bg-surface-inset text-text-secondary"),
										children: "#"
									}) : c ? /* @__PURE__ */ J(D, {
										size: 28,
										maxVisible: 2,
										items: e.peers.map((e) => ({
											name: e.displayName,
											color: e.color,
											src: e.avatarUrl
										}))
									}) : l ? /* @__PURE__ */ Y("span", {
										className: "relative inline-flex shrink-0",
										children: [/* @__PURE__ */ J(O, {
											name: l.displayName,
											color: l.color,
											src: l.avatarUrl,
											size: 28
										}), l.online !== void 0 && /* @__PURE__ */ J(g, {
											state: l.online ? "online" : "offline",
											pulse: !1,
											className: s("absolute -bottom-0.5 -right-0.5 rounded-full ring-2", b ? "ring-call-chrome" : "ring-surface")
										})]
									}) : null,
									/* @__PURE__ */ Y("span", {
										className: "flex min-w-0 flex-1 flex-col",
										children: [/* @__PURE__ */ Y("span", {
											className: "flex items-baseline gap-2",
											children: [
												/* @__PURE__ */ J("span", {
													className: s("min-w-0 flex-1 truncate text-[13px]", y > 0 ? "font-semibold" : "font-medium", b ? "text-white" : "text-text-primary"),
													children: _
												}),
												e.pinned && /* @__PURE__ */ J("span", {
													"data-testid": `${x}-pinned`,
													title: "Pinned",
													className: s("shrink-0", b ? "text-white/50" : "text-text-tertiary"),
													children: /* @__PURE__ */ J(m, { size: 12 })
												}),
												w && /* @__PURE__ */ J("span", {
													"data-testid": `${x}-muted`,
													title: "Muted",
													className: s("shrink-0", b ? "text-white/50" : "text-text-tertiary"),
													children: /* @__PURE__ */ J(f, { size: 12 })
												}),
												v && /* @__PURE__ */ J("span", {
													className: s("shrink-0 text-[11px] tabular-nums", b ? "text-white/50" : "text-text-tertiary"),
													"data-testid": "conversation-time",
													children: v
												})
											]
										}), e.lastMessagePreview && /* @__PURE__ */ J("span", {
											className: s("truncate text-[12px]", b ? "text-white/60" : "text-text-secondary"),
											"data-testid": "conversation-preview",
											children: e.lastMessagePreview
										})]
									}),
									C && /* @__PURE__ */ Y("span", {
										"data-testid": "conversation-live",
										"aria-label": "Call in progress",
										title: "Call in progress",
										className: "inline-flex shrink-0 items-center gap-1 rounded-full bg-danger px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none tracking-wide text-white",
										children: [/* @__PURE__ */ J("span", {
											"aria-hidden": !0,
											className: "h-1.5 w-1.5 rounded-full bg-white"
										}), "Live"]
									}),
									S && /* @__PURE__ */ J("span", {
										"data-testid": "conversation-mention",
										"aria-label": "You were mentioned",
										title: "You were mentioned",
										className: "grid h-5 w-5 shrink-0 place-items-center rounded-full bg-danger text-[11px] font-bold leading-none text-white",
										children: "@"
									}),
									y > 0 && /* @__PURE__ */ J("span", {
										"data-testid": "conversation-unread",
										"data-muted": w ? "true" : "false",
										className: s("grid h-5 min-w-5 shrink-0 place-items-center rounded-full px-1.5 text-[11px] font-semibold leading-none", w ? b ? "bg-white/15 text-white/70" : "bg-surface-inset text-text-secondary" : "bg-primary text-white"),
										children: y > 99 ? "99+" : y
									})
								]
							}), E.length > 0 && /* @__PURE__ */ J("span", {
								className: s("absolute right-1 top-1/2 -translate-y-1/2 opacity-0 transition-opacity", "group-hover:opacity-100 group-focus-within:opacity-100", "has-[[aria-expanded=true]]:opacity-100", "[@media(hover:none)]:opacity-100"),
								children: /* @__PURE__ */ J(p, {
									trigger: /* @__PURE__ */ J("span", {
										"aria-hidden": !0,
										className: "leading-none tracking-wide",
										children: "⋯"
									}),
									triggerLabel: `More options for ${_}`,
									triggerTitle: "More options",
									triggerTabIndex: n ? 0 : -1,
									triggerTestId: T,
									triggerClassName: s("h-6 w-6 rounded-md border-0 p-0 text-[13px]", b ? "text-white/70 hover:bg-white/15" : "text-text-secondary hover:bg-surface-hover"),
									align: "end",
									sections: [{ items: E }],
									"data-testid": `${T}-panel`
								})
							})]
						}, e.channel);
					})
				}),
				e.capped && /* @__PURE__ */ J("button", {
					type: "button",
					onClick: () => j(e.label),
					"aria-expanded": e.hidden === 0,
					"data-testid": "conversation-show-more",
					className: s("mt-0.5 flex w-full cursor-pointer items-center rounded-lg px-2 py-1 text-left text-[12px] font-medium", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", b ? "text-white/60 hover:bg-white/10 hover:text-white" : "text-text-tertiary hover:bg-surface-hover hover:text-text-primary"),
					children: e.hidden > 0 ? `Show ${e.hidden} more` : "Show less"
				})
			] }, e.label))
		})]
	});
}
//#endregion
//#region src/components/social/ChatRoom.tsx
var he = [
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
function ge(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) >>> 0;
	return he[t % he.length];
}
function _e(e) {
	let t = e.split(/[\s._@-]/);
	return t.length >= 2 ? (t[0][0] + t[1][0]).toUpperCase() : e.slice(0, 2).toUpperCase();
}
function ve(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : new Date(e).toLocaleDateString();
}
function ye(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function be({ post: e, isOwn: t, showSender: n }) {
	let r = ge(e.authorId);
	return /* @__PURE__ */ Y("div", {
		className: s("flex items-end gap-2", t ? "flex-row-reverse" : "flex-row", n ? "pt-2 px-4 pb-0.5" : "py-px px-4"),
		children: [/* @__PURE__ */ J("div", {
			className: "w-8 shrink-0 self-end",
			children: !t && n && /* @__PURE__ */ J("div", {
				className: "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white select-none",
				style: { background: r },
				children: _e(e.authorId)
			})
		}), /* @__PURE__ */ Y("div", {
			className: s("max-w-[68%] flex flex-col gap-0.5", t ? "items-end" : "items-start"),
			children: [
				!t && n && /* @__PURE__ */ J("span", {
					className: "text-[11px] font-semibold pl-1",
					style: { color: r },
					children: e.authorId
				}),
				/* @__PURE__ */ J("div", {
					className: s("px-3.5 py-2 text-sm leading-relaxed break-words transition-opacity duration-200", t ? "bg-primary text-white rounded-[18px_18px_4px_18px]" : "bg-surface-hover text-text-primary rounded-[4px_18px_18px_18px]", e._fadeIn ? "opacity-0" : "opacity-100"),
					children: e.content
				}),
				n && /* @__PURE__ */ J("span", {
					className: "text-[10px] text-text-tertiary px-1",
					children: ve(e.createdAt)
				})
			]
		})]
	});
}
function xe({ idToken: e, roomId: t, roomName: r, onMessage: i }) {
	let { posts: a, createPost: o, loading: c, hasMore: l, loadMore: u, error: d, loadError: f } = n({
		idToken: e,
		roomId: t,
		onMessage: i
	}), [p, m] = K(""), [h, g] = K(!1), [_, v] = K(null), y = G(null), b = ye(e), x = [...a].reverse(), S = a[0]?.postId;
	U(() => {
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
	return /* @__PURE__ */ Y("div", {
		className: "flex flex-col h-full bg-surface rounded-lg border border-border overflow-hidden",
		children: [
			/* @__PURE__ */ J("div", {
				className: "flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface shrink-0",
				children: /* @__PURE__ */ Y("span", {
					className: "text-[15px] font-semibold text-text-primary",
					children: ["# ", r]
				})
			}),
			/* @__PURE__ */ Y("div", {
				className: "flex-1 overflow-y-auto flex flex-col pb-1",
				children: [
					l && /* @__PURE__ */ J("div", {
						className: "text-center py-2",
						children: /* @__PURE__ */ J("button", {
							onClick: () => void u(),
							disabled: c,
							className: s("text-xs text-text-secondary bg-transparent border border-border rounded-full px-3.5 py-0.5 font-[inherit]", c ? "cursor-default" : "cursor-pointer"),
							children: c ? "Loading…" : "Load earlier"
						})
					}),
					c && x.length === 0 ? /* @__PURE__ */ J("div", {
						className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px]",
						children: "Loading messages…"
					}) : f && x.length === 0 ? /* @__PURE__ */ Y("div", {
						role: "alert",
						className: "flex-1 flex flex-col items-center justify-center gap-1.5 px-6 text-center",
						children: [
							/* @__PURE__ */ J("span", {
								className: "text-[28px]",
								children: "⚠️"
							}),
							/* @__PURE__ */ J("span", {
								className: "text-sm font-semibold text-danger-fg",
								children: "Couldn’t load messages"
							}),
							/* @__PURE__ */ J("span", {
								className: "text-[13px] text-text-tertiary",
								children: f
							})
						]
					}) : x.length === 0 ? /* @__PURE__ */ Y("div", {
						className: "flex-1 flex flex-col items-center justify-center text-text-tertiary gap-1.5",
						children: [
							/* @__PURE__ */ J("span", {
								className: "text-[28px]",
								children: "💬"
							}),
							/* @__PURE__ */ J("span", {
								className: "text-sm font-semibold text-text-primary",
								children: "No messages yet"
							}),
							/* @__PURE__ */ J("span", {
								className: "text-[13px]",
								children: "Be the first to say something!"
							})
						]
					}) : x.map((e, t) => {
						let n = e.authorId === b, r = x[t - 1], i = !r || r.authorId !== e.authorId || new Date(e.createdAt).getTime() - new Date(r.createdAt).getTime() > 3e5;
						return /* @__PURE__ */ J(be, {
							post: e,
							isOwn: n,
							showSender: i
						}, e.postId);
					}),
					/* @__PURE__ */ J("div", { ref: y })
				]
			}),
			(d || _) && /* @__PURE__ */ J("div", {
				className: "px-4 py-1.5 bg-danger-bg border-t border-danger-border text-xs text-danger-fg",
				children: _ ?? d
			}),
			/* @__PURE__ */ Y("div", {
				className: "flex items-center gap-2 px-3 py-2.5 border-t border-border bg-surface shrink-0",
				children: [/* @__PURE__ */ J(T, {
					value: p,
					onChange: (e) => m(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && !e.shiftKey && (e.preventDefault(), C());
					},
					placeholder: `Message #${r}…`,
					disabled: h,
					className: "flex-1 rounded-[22px] px-4"
				}), /* @__PURE__ */ J("button", {
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
function Se({ userId: t, displayName: n, idToken: r, rooms: i, createRoom: a, createDM: o, createGroupRoom: c, roomsLoading: l, roomsError: u, onRoomsRetry: d, handleRoomSelect: f, activeRoomId: p, onMessage: m }) {
	let [h, g] = K(!0), _ = h ? 240 : 0, [v, y] = K({}), b = G(p);
	U(() => {
		b.current = p;
	}, [p]);
	let x = V((e) => {
		y((t) => {
			if (!t[e.roomId]) return t;
			let n = { ...t };
			return delete n[e.roomId], n;
		}), f(e);
	}, [f]);
	U(() => m((e) => {
		if (e.type === "social:post") {
			let t = (e.payload ?? e).roomId;
			t && t !== b.current && y((e) => ({
				...e,
				[t]: (e[t] ?? 0) + 1
			}));
		}
	}), [m]);
	let [S, C] = K(!1), [w, T] = K(!1), { friends: E, loadError: D } = e({ idToken: r }), O = n ? n.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2) : t.slice(0, 2).toUpperCase(), k = i.find((e) => e.roomId === p) ?? null, A = i.filter((e) => e.type === "standalone" || e.type === "group"), j = i.filter((e) => e.type === "dm"), M = W(() => [...A.map((e) => ({
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
	]), N = V((e) => {
		let t = i.find((t) => t.roomId === e);
		t && x(t);
	}, [i, x]), P = "var(--color-border)", F = "var(--color-text-primary)", I = "var(--color-text-secondary)";
	return /* @__PURE__ */ Y("div", {
		className: "flex overflow-hidden rounded-lg transition-colors duration-200 h-[calc(100vh-120px)]",
		style: {
			background: "var(--color-surface)",
			border: `1px solid ${P}`
		},
		children: [/* @__PURE__ */ Y("div", {
			className: s("shrink-0 flex-col overflow-hidden transition-[width] duration-[180ms]", h ? "flex" : "hidden"),
			style: {
				width: _,
				borderRight: `1px solid ${P}`,
				background: "var(--color-surface-panel)"
			},
			children: [/* @__PURE__ */ Y("div", {
				className: "flex items-center gap-2 shrink-0 px-[14px] pt-[14px] pb-3",
				style: { borderBottom: `1px solid ${P}` },
				children: [
					/* @__PURE__ */ J("div", {
						className: "w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-[11px] shrink-0 bg-[linear-gradient(135deg,#646cff,#9b59b6)]",
						children: O
					}),
					/* @__PURE__ */ Y("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ J("div", {
							className: "text-[13px] font-bold overflow-hidden text-ellipsis whitespace-nowrap",
							style: { color: F },
							children: n || t
						}), /* @__PURE__ */ Y("div", {
							className: "text-[11px] flex items-center gap-1",
							style: { color: I },
							children: [/* @__PURE__ */ J("span", { className: "w-1.5 h-1.5 rounded-full bg-success inline-block" }), "Active"]
						})]
					}),
					/* @__PURE__ */ J("button", {
						onClick: () => g(!1),
						title: "Collapse sidebar",
						className: "bg-transparent border-none cursor-pointer text-base leading-none px-1 py-0.5 rounded",
						style: { color: I },
						children: "«"
					})
				]
			}), /* @__PURE__ */ J("div", {
				className: "flex-1 overflow-y-auto pt-2",
				children: /* @__PURE__ */ Y("div", {
					className: "px-1 pt-1",
					children: [l && M.length === 0 ? /* @__PURE__ */ J("div", {
						className: "px-2 py-2 text-xs",
						style: { color: I },
						children: "Loading…"
					}) : u && M.length === 0 ? /* @__PURE__ */ J("div", {
						role: "alert",
						"data-testid": "conversations-error",
						className: "px-2 py-2 text-xs text-danger-fg",
						children: "Couldn’t load conversations"
					}) : /* @__PURE__ */ J(Z, {
						items: M,
						activeChannel: p ?? null,
						onSelect: N,
						onNewChat: () => C((e) => !e),
						emptyLabel: "No conversations yet",
						"data-testid": "social-conversations"
					}), S && /* @__PURE__ */ J("div", {
						className: "px-1 pt-1.5",
						children: /* @__PURE__ */ J(pe, {
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
		}), /* @__PURE__ */ Y("div", {
			className: "flex-1 min-w-0 flex flex-col",
			children: [!h && /* @__PURE__ */ Y("div", {
				className: "flex items-center gap-2 px-3 py-1.5",
				style: { borderBottom: `1px solid ${P}` },
				children: [/* @__PURE__ */ J("button", {
					onClick: () => g(!0),
					title: "Expand sidebar",
					className: "bg-transparent rounded cursor-pointer text-sm px-2 py-0.5 font-[inherit]",
					style: {
						border: `1px solid ${P}`,
						color: I
					},
					children: "»"
				}), k && /* @__PURE__ */ Y("span", {
					className: "text-[13px] font-semibold",
					style: { color: F },
					children: [
						k.type === "dm" ? "●" : "#",
						" ",
						k.name
					]
				})]
			}), /* @__PURE__ */ J("div", {
				className: "flex-1 min-h-0",
				children: k ? /* @__PURE__ */ J(xe, {
					idToken: r,
					roomId: k.roomId,
					roomName: k.name,
					onMessage: m
				}, k.roomId) : /* @__PURE__ */ Y("div", {
					className: "h-full flex flex-col items-center justify-center gap-2",
					style: { color: I },
					children: [
						/* @__PURE__ */ J("span", {
							className: "text-4xl",
							children: "💬"
						}),
						/* @__PURE__ */ J("span", {
							className: "text-[15px] font-semibold",
							style: { color: F },
							children: "Select a room to start chatting"
						}),
						/* @__PURE__ */ J("span", {
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
function Ce({ author: e, avatarUrl: t, mine: n = !1, messages: r, className: i }) {
	return r.length === 0 ? null : /* @__PURE__ */ J("div", {
		"data-testid": "message-group",
		"data-author": e,
		"data-row-count": r.length,
		className: s("flex flex-col", i),
		children: r.map((r, i) => /* @__PURE__ */ J(F, {
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
function we({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = K(""), [a, o] = K(null), c = async (t) => {
		if (t.preventDefault(), r.trim()) {
			o(null);
			try {
				await e(r.trim()), i("");
			} catch (e) {
				o(e instanceof Error ? e.message : "Failed to create room");
			}
		}
	};
	return /* @__PURE__ */ Y("form", {
		onSubmit: (e) => {
			c(e);
		},
		className: "my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border",
		children: [
			/* @__PURE__ */ J(T, {
				size: "sm",
				value: r,
				onChange: (e) => i(e.target.value.slice(0, 50)),
				placeholder: "Room name",
				maxLength: 50,
				required: !0,
				autoFocus: !0,
				className: "mb-1.5"
			}),
			/* @__PURE__ */ Y("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ J("button", {
					type: "submit",
					disabled: !r.trim() || n,
					className: s("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !r.trim() || n ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: n ? "Creating…" : "Create"
				}), /* @__PURE__ */ J("button", {
					type: "button",
					onClick: t,
					className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
					children: "Cancel"
				})]
			}),
			a && /* @__PURE__ */ J("div", {
				className: "text-danger-fg text-[11px] mt-1",
				children: a
			})
		]
	});
}
function Te({ onCreateDM: e, loading: t, friends: n, friendsError: r }) {
	let [i, a] = K(""), [o, c] = K(!1), [l, u] = K(null), d = async (t) => {
		if (t.preventDefault(), i.trim()) {
			u(null);
			try {
				await e(i.trim()), a(""), c(!1);
			} catch (e) {
				u(e instanceof Error ? e.message : "Failed to open DM");
			}
		}
	};
	return o ? /* @__PURE__ */ Y("form", {
		onSubmit: (e) => {
			d(e);
		},
		className: "my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border",
		children: [
			/* @__PURE__ */ J(j, {
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
			r && n.length === 0 && /* @__PURE__ */ J("div", {
				role: "alert",
				"data-testid": "dm-friends-error",
				className: "text-danger-fg text-[11px] mb-1.5",
				children: r
			}),
			/* @__PURE__ */ Y("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ J("button", {
					type: "submit",
					disabled: !i.trim() || t || n.length === 0,
					className: s("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !i.trim() || t ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: "Open DM"
				}), /* @__PURE__ */ J("button", {
					type: "button",
					onClick: () => c(!1),
					className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
					children: "Cancel"
				})]
			}),
			l && /* @__PURE__ */ J("div", {
				className: "text-danger-fg text-[11px] mt-1",
				children: l
			})
		]
	}) : /* @__PURE__ */ J("button", {
		onClick: () => c(!0),
		className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded mb-1",
		children: "+ New DM"
	});
}
function Ee({ room: e, isActive: t, onClick: n }) {
	return /* @__PURE__ */ Y("button", {
		type: "button",
		onClick: n,
		"aria-pressed": t,
		className: s("flex items-center h-14 border-b border-surface-hover cursor-pointer pr-2", "w-full text-left font-[inherit]", t ? "bg-surface-hover border-l-[3px] border-l-primary pl-[13px]" : "bg-transparent border-l-[3px] border-l-transparent"),
		children: [/* @__PURE__ */ J("div", {
			className: s("flex-1 text-base text-text-primary", t ? "font-semibold" : "font-normal"),
			children: e.name
		}), /* @__PURE__ */ J("span", {
			className: ((e) => e === "standalone" ? "bg-accent-bg text-primary text-xs px-2 py-0.5 rounded" : e === "group" ? "bg-info-bg text-info text-xs px-2 py-0.5 rounded" : "bg-success-bg text-success text-xs px-2 py-0.5 rounded")(e.type),
			children: e.type
		})]
	});
}
function De({ room: e, isActive: t, onClick: n }) {
	return /* @__PURE__ */ Y("button", {
		onClick: n,
		className: s("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]", t ? "bg-accent-bg text-accent-fg font-semibold" : "bg-transparent text-text-primary font-normal"),
		children: [/* @__PURE__ */ J("span", {
			className: s("text-[13px] shrink-0", t ? "text-primary" : "text-text-tertiary"),
			children: e.type === "dm" ? "●" : "#"
		}), /* @__PURE__ */ J("span", {
			className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1",
			children: e.name
		})]
	});
}
function Oe({ message: e, onRetry: t, compact: n }) {
	return /* @__PURE__ */ Y("div", {
		role: "alert",
		className: s("text-center flex flex-col items-center gap-1.5", n ? "px-2 py-3" : "px-4 py-6"),
		children: [
			/* @__PURE__ */ J("div", {
				className: s("font-semibold text-danger-fg", n ? "text-xs" : "text-sm"),
				children: "Couldn't load rooms"
			}),
			/* @__PURE__ */ J("div", {
				className: s("text-text-secondary", n ? "text-[11px]" : "text-xs"),
				children: e
			}),
			t && /* @__PURE__ */ J("button", {
				type: "button",
				onClick: t,
				className: s("mt-1 font-medium text-info-fg bg-info-bg border border-info-border rounded cursor-pointer font-[system-ui,-apple-system,sans-serif]", n ? "px-2.5 py-0.5 text-[11px]" : "px-3.5 py-1 text-xs"),
				children: "Retry"
			})
		]
	});
}
function ke({ idToken: t, rooms: n, createRoom: r, createDM: i, loading: a, error: o, onRetry: s, onRoomSelect: c, activeRoomId: l, compact: u }) {
	let { friends: d, loadError: f } = e({ idToken: t }), [p, m] = K(!1), h = async (e) => {
		await r(e), m(!1);
	};
	return u ? /* @__PURE__ */ Y("div", {
		className: "px-2 pt-2",
		children: [
			/* @__PURE__ */ J("button", {
				onClick: () => m((e) => !e),
				className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
				children: "+ New Room"
			}),
			p && /* @__PURE__ */ J(we, {
				onCreate: h,
				onDiscard: () => m(!1),
				loading: a
			}),
			/* @__PURE__ */ J(Te, {
				onCreateDM: i,
				loading: a,
				friends: d,
				friendsError: f
			}),
			/* @__PURE__ */ J("div", { children: a && n.length === 0 ? /* @__PURE__ */ J("div", {
				className: "p-2 text-text-tertiary text-xs text-center",
				children: "Loading…"
			}) : o && n.length === 0 ? /* @__PURE__ */ J(Oe, {
				message: o,
				onRetry: s,
				compact: !0
			}) : n.length === 0 ? /* @__PURE__ */ J("div", {
				className: "px-2 py-3 text-text-tertiary text-xs",
				children: "No rooms yet"
			}) : n.map((e) => /* @__PURE__ */ J(De, {
				room: e,
				isActive: e.roomId === l,
				onClick: () => c(e)
			}, e.roomId)) })
		]
	}) : /* @__PURE__ */ Y("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ J("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
				children: "Rooms"
			}),
			/* @__PURE__ */ J("button", {
				onClick: () => m((e) => !e),
				className: "w-full h-9 mb-2 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Create Room"
			}),
			p && /* @__PURE__ */ J(we, {
				onCreate: h,
				onDiscard: () => m(!1),
				loading: a
			}),
			/* @__PURE__ */ J(Te, {
				onCreateDM: i,
				loading: a,
				friends: d,
				friendsError: f
			}),
			/* @__PURE__ */ J("div", {
				className: "max-h-80 overflow-y-auto",
				children: a && n.length === 0 ? /* @__PURE__ */ Y("div", {
					className: "flex items-center gap-2 p-4 justify-center text-text-secondary",
					children: [/* @__PURE__ */ J("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }), "Loading..."]
				}) : o && n.length === 0 ? /* @__PURE__ */ J(Oe, {
					message: o,
					onRetry: s
				}) : n.length === 0 ? /* @__PURE__ */ Y("div", {
					className: "py-6 text-center",
					children: [/* @__PURE__ */ J("div", {
						className: "text-sm font-semibold text-text-primary mb-1",
						children: "No rooms yet"
					}), /* @__PURE__ */ J("div", {
						className: "text-sm text-text-tertiary",
						children: "Create a room or ask to be added."
					})]
				}) : n.map((e) => /* @__PURE__ */ J(Ee, {
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
function Ae(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function je(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function Me({ onSubmit: e, placeholder: t = "Write a reply…", loading: n }) {
	let [r, i] = K(""), [a, o] = K(null), c = async (t) => {
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
	return /* @__PURE__ */ Y("form", {
		onSubmit: (e) => {
			c(e);
		},
		className: "flex flex-wrap gap-2 mt-2",
		children: [
			/* @__PURE__ */ J(T, {
				value: r,
				onChange: (e) => i(e.target.value),
				placeholder: t,
				className: "flex-1"
			}),
			/* @__PURE__ */ J("button", {
				type: "submit",
				disabled: !r.trim() || n,
				className: s("h-7 px-2.5 rounded-md text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !r.trim() || n ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
				children: "Comment"
			}),
			a && /* @__PURE__ */ J("div", {
				role: "alert",
				"data-testid": "comment-submit-error",
				className: "basis-full text-danger-fg text-[13px]",
				children: a
			})
		]
	});
}
function Ne({ comment: e, currentUserId: t, loading: n, onDelete: r, onReply: i }) {
	let [a, o] = K(!1), [s, c] = K(!1), [l, u] = K(+!e._fadeIn);
	U(() => {
		if (e._fadeIn) {
			let e = setTimeout(() => u(1), 10);
			return () => clearTimeout(e);
		}
	}, []);
	let d = e.authorId === t, f = !!e.parentCommentId, p = e.authorId.slice(0, 2).toUpperCase(), m = /* @__PURE__ */ J("div", {
		style: { opacity: l },
		className: "transition-opacity duration-200 ease-[ease]",
		children: /* @__PURE__ */ Y("div", {
			className: "flex items-start gap-2",
			children: [/* @__PURE__ */ J("div", {
				className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
				children: p
			}), /* @__PURE__ */ Y("div", {
				className: "flex-1",
				children: [
					/* @__PURE__ */ Y("div", {
						className: "flex items-center gap-2 mb-0.5",
						children: [/* @__PURE__ */ J("span", {
							className: "text-sm font-semibold text-text-primary",
							children: e.authorId
						}), /* @__PURE__ */ J("span", {
							className: "text-xs text-text-tertiary",
							children: Ae(e.createdAt)
						})]
					}),
					/* @__PURE__ */ J("div", {
						className: "text-sm text-text-primary mb-1",
						children: e.content
					}),
					/* @__PURE__ */ Y("div", {
						className: "flex gap-2 items-center",
						children: [
							/* @__PURE__ */ J("button", {
								onClick: () => c((e) => !e),
								className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
								children: "Reply"
							}),
							d && !a && /* @__PURE__ */ J("button", {
								onClick: () => o(!0),
								className: "text-sm text-text-tertiary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
								"aria-label": "Delete comment",
								children: "Delete"
							}),
							d && a && /* @__PURE__ */ Y("div", {
								role: "group",
								"aria-label": "Confirm delete comment",
								className: "flex gap-1.5 items-center",
								children: [
									/* @__PURE__ */ J("span", {
										className: "text-xs text-text-primary",
										children: "Delete this comment?"
									}),
									/* @__PURE__ */ J("button", {
										onClick: () => o(!1),
										className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
										children: "Cancel"
									}),
									/* @__PURE__ */ J("button", {
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
					s && /* @__PURE__ */ J(Me, {
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
	return f ? /* @__PURE__ */ J("div", {
		className: "pl-8 py-2",
		children: m
	}) : /* @__PURE__ */ J("div", {
		className: "py-2 border-b border-surface-hover",
		children: m
	});
}
function Pe({ idToken: e, roomId: t, postId: n, onMessage: i }) {
	let { comments: a, createComment: o, deleteComment: s, loading: c, submitting: l, error: u } = r({
		idToken: e,
		roomId: t,
		postId: n,
		onMessage: i
	}), d = je(e), f = async (e, t) => {
		await o(t, e);
	};
	return /* @__PURE__ */ Y("div", {
		className: "pt-2 pl-2 border-t border-surface-hover",
		children: [
			c ? /* @__PURE__ */ J("div", {
				className: "text-sm text-text-tertiary py-2",
				children: "Loading comments…"
			}) : u && a.length === 0 ? /* @__PURE__ */ J("div", {
				role: "alert",
				className: "text-sm text-danger-fg py-2",
				children: u
			}) : a.length === 0 ? /* @__PURE__ */ J("div", {
				className: "text-sm text-text-tertiary text-center py-4",
				children: "No comments yet"
			}) : a.map((e) => /* @__PURE__ */ J(Ne, {
				comment: e,
				currentUserId: d,
				loading: l,
				onDelete: s,
				onReply: f
			}, e.commentId)),
			u && a.length > 0 && /* @__PURE__ */ J("div", {
				role: "alert",
				"data-testid": "comment-thread-error",
				className: "text-sm text-danger-fg py-1",
				children: u
			}),
			/* @__PURE__ */ J(Me, {
				onSubmit: (e) => o(e),
				placeholder: "Write a comment…",
				loading: l
			})
		]
	});
}
//#endregion
//#region src/components/social/PostFeed.tsx
var Fe = [
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
function Ie(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function Le(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function Re({ onCreate: e, loading: t }) {
	let [n, r] = K(""), [i, a] = K(null), o = async (t) => {
		if (t.preventDefault(), n.trim()) {
			a(null);
			try {
				await e(n.trim()), r("");
			} catch (e) {
				a(e instanceof Error ? e.message : "Failed to create post");
			}
		}
	};
	return /* @__PURE__ */ Y("form", {
		onSubmit: (e) => {
			o(e);
		},
		children: [
			/* @__PURE__ */ J(E, {
				value: n,
				onChange: (e) => r(e.target.value),
				placeholder: "What's on your mind?",
				maxLength: 1e4,
				rows: 3,
				className: "resize-y mb-2"
			}),
			/* @__PURE__ */ J("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ J("button", {
					type: "submit",
					disabled: !n.trim() || t,
					className: s("h-9 px-4 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !n.trim() || t ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
					children: t ? "Posting…" : "Post"
				})
			}),
			i && /* @__PURE__ */ J("div", {
				className: "text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
				children: i
			})
		]
	});
}
function ze({ isLiked: e, likeCount: t, whoLiked: n, toggle: r }) {
	return /* @__PURE__ */ Y(q, { children: [/* @__PURE__ */ Y("button", {
		onClick: () => void r(),
		"aria-label": "Like post",
		className: "bg-transparent border-none cursor-pointer flex items-center gap-1 p-0 font-[system-ui,-apple-system,sans-serif]",
		children: [/* @__PURE__ */ J("span", {
			className: s("text-base", e ? "text-primary" : "text-text-tertiary"),
			children: "❤"
		}), /* @__PURE__ */ J("span", {
			className: s("text-sm", e ? "text-primary" : "text-text-tertiary"),
			children: t
		})]
	}), n.length > 0 && /* @__PURE__ */ Y("span", {
		className: "text-xs text-text-secondary ml-1",
		children: [
			"Liked by: ",
			n.slice(0, 3).map((e) => e.displayName).join(", "),
			n.length > 3 ? ` and ${n.length - 3} more` : ""
		]
	})] });
}
function Be({ reactWithEmoji: e }) {
	return /* @__PURE__ */ J("div", {
		className: "flex flex-wrap gap-0",
		children: Fe.map((t) => /* @__PURE__ */ J("button", {
			onClick: () => void e(t),
			className: "text-base bg-transparent border-none px-1 py-0.5 cursor-pointer",
			title: t,
			children: t
		}, t))
	});
}
function Ve({ post: e, idToken: t, roomId: n, currentUserId: r, onMessage: a, onEdit: o, onDelete: c }) {
	let { isLiked: l, likeCount: u, whoLiked: d, toggle: f, reactWithEmoji: p, error: m } = i({
		idToken: t,
		roomId: n,
		postId: e.postId,
		onMessage: a
	}), [h, g] = K(+!e._fadeIn), [_, v] = K(!1), [y, b] = K(!1), [x, S] = K(!1), [C, w] = K(e.content), [T, D] = K(null), O = async () => {
		D(null);
		try {
			await o(e.postId, C);
		} catch (e) {
			D(e instanceof Error ? e.message : "Failed to save post");
			return;
		}
		S(!1);
	}, k = async () => {
		D(null);
		try {
			await c(e.postId);
		} catch (e) {
			D(e instanceof Error ? e.message : "Failed to delete post");
			return;
		}
		b(!1);
	};
	U(() => {
		if (e._fadeIn) {
			let e = setTimeout(() => g(1), 10);
			return () => clearTimeout(e);
		}
	}, []);
	let A = e.authorId === r, j = e.authorId.slice(0, 2).toUpperCase();
	return /* @__PURE__ */ Y("div", {
		style: { opacity: h },
		className: "border-b border-surface-hover pb-4 mb-4 transition-opacity duration-200 ease-[ease]",
		children: [
			/* @__PURE__ */ Y("div", {
				className: "flex items-center gap-2 mb-2",
				children: [/* @__PURE__ */ J("div", {
					className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
					children: j
				}), /* @__PURE__ */ Y("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ J("span", {
						className: "text-base font-semibold text-text-primary",
						children: e.authorId
					}), /* @__PURE__ */ J("span", {
						className: "text-sm text-text-tertiary ml-2",
						children: Ie(e.createdAt)
					})]
				})]
			}),
			x ? /* @__PURE__ */ Y("div", {
				className: "mb-2",
				children: [/* @__PURE__ */ J(E, {
					value: C,
					onChange: (e) => w(e.target.value),
					rows: 3,
					className: "resize-y mb-2"
				}), /* @__PURE__ */ Y("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ J("button", {
						onClick: () => {
							O();
						},
						disabled: !C.trim(),
						className: s("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", C.trim() ? "bg-primary text-white border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"),
						children: "Save"
					}), /* @__PURE__ */ J("button", {
						onClick: () => {
							S(!1), w(e.content);
						},
						className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Discard Changes"
					})]
				})]
			}) : /* @__PURE__ */ J("div", {
				className: "text-base text-text-primary mt-2 mb-2",
				children: e.content
			}),
			/* @__PURE__ */ Y("div", {
				className: "flex gap-4 text-sm mt-1 items-center flex-wrap",
				children: [
					/* @__PURE__ */ J(ze, {
						isLiked: l,
						likeCount: u,
						whoLiked: d,
						toggle: f
					}),
					/* @__PURE__ */ J(Be, { reactWithEmoji: p }),
					/* @__PURE__ */ J("button", {
						onClick: () => v((e) => !e),
						className: "bg-transparent border-none text-sm text-text-secondary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Comment"
					}),
					A && !x && /* @__PURE__ */ J("button", {
						onClick: () => S(!0),
						className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Edit"
					}),
					A && !y && !x && /* @__PURE__ */ J("button", {
						onClick: () => b(!0),
						className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Delete"
					}),
					A && y && /* @__PURE__ */ Y("div", {
						role: "group",
						"aria-label": "Confirm delete post",
						className: "flex gap-1.5 items-center",
						children: [
							/* @__PURE__ */ J("span", {
								className: "text-xs text-text-primary",
								children: "Delete this post?"
							}),
							/* @__PURE__ */ J("button", {
								onClick: () => b(!1),
								className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
								children: "Cancel"
							}),
							/* @__PURE__ */ J("button", {
								onClick: () => {
									k();
								},
								className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
								children: "Delete"
							})
						]
					})
				]
			}),
			(T ?? m) && /* @__PURE__ */ J("div", {
				role: "alert",
				"data-testid": "post-action-error",
				className: "text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
				children: T ?? m
			}),
			_ && /* @__PURE__ */ J(Pe, {
				idToken: t,
				roomId: n,
				postId: e.postId,
				onMessage: a
			})
		]
	});
}
function He({ idToken: e, roomId: t, onMessage: r }) {
	let { posts: i, createPost: a, editPost: o, deletePost: c, loading: l, mutating: u, error: d, loadError: f, hasMore: p, loadMore: m } = n({
		idToken: e,
		roomId: t,
		onMessage: r
	}), h = Le(e);
	return /* @__PURE__ */ Y("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ J(Re, {
				onCreate: a,
				loading: l || u
			}),
			/* @__PURE__ */ J("div", { className: "border-t border-border my-4" }),
			p && /* @__PURE__ */ J("button", {
				onClick: () => void m(),
				disabled: l,
				className: s("w-full h-9 mb-4 bg-surface text-text-primary border border-border rounded-lg text-sm font-[system-ui,-apple-system,sans-serif]", l ? "cursor-default" : "cursor-pointer"),
				children: l ? "Loading…" : "Load more"
			}),
			d && i.length > 0 && /* @__PURE__ */ J("div", {
				role: "alert",
				"data-testid": "post-feed-error",
				className: "text-danger-fg text-[13px] mb-3 font-[system-ui,-apple-system,sans-serif]",
				children: d
			}),
			l && i.length === 0 ? /* @__PURE__ */ Y("div", {
				className: "flex items-center gap-2 p-4 justify-center text-text-secondary",
				children: [/* @__PURE__ */ J("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }), "Loading..."]
			}) : f && i.length === 0 ? /* @__PURE__ */ Y("div", {
				role: "alert",
				className: "py-6 text-center",
				children: [/* @__PURE__ */ J("div", {
					className: "text-sm font-semibold text-danger-fg mb-1",
					children: "Couldn’t load posts"
				}), /* @__PURE__ */ J("div", {
					className: "text-sm text-text-tertiary",
					children: f
				})]
			}) : i.length === 0 ? /* @__PURE__ */ Y("div", {
				className: "py-6 text-center",
				children: [/* @__PURE__ */ J("div", {
					className: "text-sm font-semibold text-text-primary mb-1",
					children: "No posts yet"
				}), /* @__PURE__ */ J("div", {
					className: "text-sm text-text-tertiary",
					children: "Be the first to post in this room."
				})]
			}) : i.map((n) => /* @__PURE__ */ J(Ve, {
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
function Ue({ group: e, isSelected: t, onClick: n }) {
	return /* @__PURE__ */ Y("button", {
		onClick: n,
		className: s("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]", t ? "bg-accent-bg text-accent-fg font-semibold" : "bg-transparent text-text-primary font-normal"),
		children: [/* @__PURE__ */ J("span", {
			className: s("text-xs shrink-0", t ? "text-primary" : "text-text-tertiary"),
			children: e.visibility === "private" ? "🔒" : "👥"
		}), /* @__PURE__ */ J("span", {
			className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1",
			children: e.name
		})]
	});
}
function We({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = K(""), [a, o] = K(null), c = async (t) => {
		if (t.preventDefault(), r.trim()) {
			o(null);
			try {
				await e(r.trim()), i("");
			} catch (e) {
				o(e instanceof Error ? e.message : "Failed to create group");
			}
		}
	};
	return /* @__PURE__ */ Y("form", {
		onSubmit: (e) => {
			c(e);
		},
		className: "p-2 bg-surface-panel rounded-md border border-border my-1 mb-2",
		children: [
			/* @__PURE__ */ J(T, {
				size: "sm",
				value: r,
				onChange: (e) => i(e.target.value.slice(0, 50)),
				placeholder: "Group name",
				maxLength: 50,
				required: !0,
				autoFocus: !0,
				className: "mb-1.5"
			}),
			/* @__PURE__ */ Y("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ J("button", {
					type: "submit",
					disabled: !r.trim() || n,
					className: s("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !r.trim() || n ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: n ? "Creating…" : "Create"
				}), /* @__PURE__ */ J("button", {
					type: "button",
					onClick: t,
					className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
					children: "Cancel"
				})]
			}),
			a && /* @__PURE__ */ J("div", {
				className: "text-danger-fg text-[11px] mt-1",
				children: a
			})
		]
	});
}
function Ge({ group: e, members: t, rooms: n, groupId: r, currentUserId: i, createGroupRoom: a, onRoomSelect: o, inviteUser: c, loading: l }) {
	let [u, d] = K(!1), [f, p] = K(""), [m, h] = K(null), [g, _] = K(!1), [v, y] = K(""), [b, x] = K(null), S = e.ownerId === i, C = n.filter((e) => e.groupId === r), w = async (e) => {
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
	}, E = async (e) => {
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
	return /* @__PURE__ */ Y("div", {
		className: "px-2 pb-2 pt-1 border-t border-border mt-1",
		children: [
			/* @__PURE__ */ Y("div", {
				className: "flex items-center justify-between mb-1",
				children: [/* @__PURE__ */ Y("span", {
					className: "text-[11px] text-text-secondary font-semibold uppercase tracking-wide",
					children: [
						"Members (",
						t.length,
						")"
					]
				}), S && /* @__PURE__ */ J("button", {
					onClick: () => d((e) => !e),
					className: "text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]",
					children: "+ Invite"
				})]
			}),
			u && /* @__PURE__ */ Y("form", {
				onSubmit: (e) => {
					w(e);
				},
				className: "flex gap-1 mb-1.5",
				children: [/* @__PURE__ */ J(T, {
					size: "sm",
					value: f,
					onChange: (e) => p(e.target.value),
					placeholder: "User ID",
					className: "flex-1"
				}), /* @__PURE__ */ J("button", {
					type: "submit",
					disabled: !f.trim(),
					className: s("h-6 px-2 border-none rounded text-[11px] font-[inherit]", f.trim() ? "bg-primary text-white cursor-pointer" : "bg-border text-text-tertiary cursor-default"),
					children: "Invite"
				})]
			}),
			u && m && /* @__PURE__ */ J("div", {
				role: "alert",
				"data-testid": "compact-invite-error",
				className: "text-danger-fg text-[11px] mb-1.5",
				children: m
			}),
			/* @__PURE__ */ Y("div", {
				className: "flex flex-wrap gap-1 mb-2",
				children: [t.slice(0, 8).map((e) => /* @__PURE__ */ J("div", {
					title: e.displayName ?? e.userId,
					className: "w-6 h-6 rounded-full bg-border flex items-center justify-center text-[10px] font-semibold text-text-primary",
					children: (e.displayName ?? e.userId).slice(0, 2).toUpperCase()
				}, e.userId)), t.length > 8 && /* @__PURE__ */ Y("span", {
					className: "text-[11px] text-text-tertiary self-center",
					children: ["+", t.length - 8]
				})]
			}),
			/* @__PURE__ */ Y("div", {
				className: "flex items-center justify-between mb-1",
				children: [/* @__PURE__ */ Y("span", {
					className: "text-[11px] text-text-secondary font-semibold uppercase tracking-wide",
					children: [
						"Rooms (",
						C.length,
						")"
					]
				}), S && /* @__PURE__ */ J("button", {
					onClick: () => _((e) => !e),
					className: "text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]",
					children: "+ Room"
				})]
			}),
			g && /* @__PURE__ */ Y("form", {
				onSubmit: (e) => {
					E(e);
				},
				className: "flex gap-1 mb-1.5",
				children: [/* @__PURE__ */ J(T, {
					size: "sm",
					value: v,
					onChange: (e) => y(e.target.value.slice(0, 50)),
					placeholder: "Room name",
					className: "flex-1"
				}), /* @__PURE__ */ J("button", {
					type: "submit",
					disabled: !v.trim() || l,
					className: s("h-6 px-2 border-none rounded text-[11px] font-[inherit]", !v.trim() || l ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: "Create"
				})]
			}),
			g && b && /* @__PURE__ */ J("div", {
				role: "alert",
				"data-testid": "compact-group-room-error",
				className: "text-danger-fg text-[11px] mb-1.5",
				children: b
			}),
			C.map((e) => /* @__PURE__ */ Y(o ? "button" : "div", {
				type: o ? "button" : void 0,
				onClick: o ? () => o(e) : void 0,
				className: s("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1 bg-transparent text-text-primary text-[13px] text-left font-[inherit]", o && "cursor-pointer"),
				children: [/* @__PURE__ */ J("span", {
					className: "text-text-tertiary text-xs",
					children: "#"
				}), /* @__PURE__ */ J("span", {
					className: "overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.name
				})]
			}, e.roomId))
		]
	});
}
function Ke({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = K(""), [a, o] = K("public"), [c, l] = K(null), u = ae(), d = async (t) => {
		if (t.preventDefault(), r.trim()) {
			l(null);
			try {
				await e(r.trim(), void 0, a);
			} catch (e) {
				l(e instanceof Error ? e.message : "Failed to create group");
			}
		}
	};
	return /* @__PURE__ */ Y("form", {
		onSubmit: (e) => {
			d(e);
		},
		className: "mb-3 p-3 bg-surface-panel rounded-lg border border-border",
		children: [
			/* @__PURE__ */ Y("div", {
				className: "mb-3",
				children: [/* @__PURE__ */ J("label", {
					htmlFor: `${u}-group-name`,
					className: "text-sm text-text-primary block mb-1",
					children: "Group name"
				}), /* @__PURE__ */ J(T, {
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
			/* @__PURE__ */ Y("div", {
				className: "flex items-center gap-2.5 mb-3.5",
				children: [
					/* @__PURE__ */ J("span", {
						className: "text-[13px] text-text-primary min-w-[42px]",
						children: a === "public" ? "Public" : "Private"
					}),
					/* @__PURE__ */ J("button", {
						type: "button",
						role: "switch",
						"aria-label": "Private group",
						"aria-checked": a === "private",
						onClick: () => o((e) => e === "public" ? "private" : "public"),
						className: s("relative w-11 h-6 rounded-xl border-none cursor-pointer p-0 shrink-0 transition-colors duration-200", a === "private" ? "bg-primary" : "bg-state-idle"),
						children: /* @__PURE__ */ J("span", { className: s("absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-[left] duration-200", a === "private" ? "left-[23px]" : "left-[3px]") })
					}),
					/* @__PURE__ */ J("span", {
						className: "text-xs text-text-tertiary",
						children: a === "public" ? "Visible to everyone" : "Invite only"
					})
				]
			}),
			/* @__PURE__ */ Y("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ J("button", {
					type: "submit",
					disabled: !r.trim() || n,
					className: s("flex-1 h-9 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !r.trim() || n ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
					children: n ? "Creating…" : "Create Group"
				}), /* @__PURE__ */ J("button", {
					type: "button",
					onClick: t,
					className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
					children: "Cancel"
				})]
			}),
			c && /* @__PURE__ */ J("div", {
				id: `${u}-form-error`,
				role: "alert",
				className: "text-danger-fg text-[13px] mt-1.5",
				children: c
			})
		]
	});
}
function qe({ group: e, currentUserId: t, isSelected: n, onSelect: r, onDelete: i }) {
	let [a, o] = K(null), c = e.ownerId === t;
	return /* @__PURE__ */ Y("div", {
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
			/* @__PURE__ */ Y("div", {
				className: "flex-1 min-w-0 pr-2",
				children: [/* @__PURE__ */ J("div", {
					className: s("text-base text-text-primary", n ? "font-semibold" : "font-normal"),
					children: e.name
				}), e.description && /* @__PURE__ */ J("div", {
					className: "text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.description
				})]
			}),
			/* @__PURE__ */ J("span", {
				className: s("text-xs px-2 py-0.5 rounded shrink-0 mr-2", e.visibility === "public" ? "bg-success-bg text-success" : "bg-surface-hover text-text-secondary"),
				children: e.visibility
			}),
			c && /* @__PURE__ */ J("div", {
				className: "shrink-0",
				onClick: (e) => e.stopPropagation(),
				children: a === e.groupId ? /* @__PURE__ */ Y("div", {
					role: "group",
					"aria-label": "Confirm delete group",
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ J("button", {
						onClick: () => o(null),
						className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Cancel"
					}), /* @__PURE__ */ J("button", {
						onClick: () => {
							i(e.groupId), o(null);
						},
						className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Delete"
					})]
				}) : /* @__PURE__ */ J("button", {
					onClick: () => o(e.groupId),
					className: "text-xs text-danger-fg bg-transparent border-none cursor-pointer px-2 py-1 font-[system-ui,-apple-system,sans-serif]",
					"aria-label": `Delete group ${e.name}`,
					children: "Delete"
				})
			})
		]
	});
}
function Je({ groupId: e, onInvite: t }) {
	let [n, r] = K(""), [i, a] = K(null), o = async (i) => {
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
	return /* @__PURE__ */ Y(q, { children: [/* @__PURE__ */ Y("form", {
		onSubmit: (e) => {
			o(e);
		},
		className: "flex gap-2 mt-2",
		children: [/* @__PURE__ */ J(T, {
			className: "flex-1",
			value: n,
			onChange: (e) => r(e.target.value),
			placeholder: "User ID to invite"
		}), /* @__PURE__ */ J("button", {
			type: "submit",
			disabled: !n.trim(),
			className: s("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", n.trim() ? "bg-primary text-white border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"),
			children: "Invite"
		})]
	}), i && /* @__PURE__ */ J("div", {
		role: "alert",
		"data-testid": "invite-error",
		className: "text-danger-fg text-xs mt-1",
		children: i
	})] });
}
function Ye({ members: e }) {
	let t = (e) => e === "owner" ? "bg-success-bg text-success text-xs px-2 py-0.5 rounded" : e === "admin" ? "bg-info-bg text-info text-xs px-2 py-0.5 rounded" : "bg-surface-hover text-text-secondary text-xs px-2 py-0.5 rounded";
	return /* @__PURE__ */ J("div", {
		className: "max-h-[200px] overflow-y-auto mt-2 border-t border-border",
		children: e.map((e) => /* @__PURE__ */ Y("div", {
			className: "flex items-center gap-2 h-12 border-b border-surface-hover",
			children: [
				/* @__PURE__ */ J("div", {
					className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
					children: (e.displayName ?? e.userId).slice(0, 2).toUpperCase()
				}),
				/* @__PURE__ */ J("div", {
					className: "flex-1 text-base text-text-primary",
					children: e.displayName ?? e.userId
				}),
				/* @__PURE__ */ J("span", {
					className: t(e.role),
					children: e.role
				})
			]
		}, e.userId))
	});
}
function Xe({ rooms: e, groupId: t, selectedGroupRole: n, createGroupRoom: r, onRoomSelect: i, loading: a }) {
	let [o, c] = K(!1), [l, u] = K(""), [d, f] = K(null), p = e.filter((e) => e.groupId === t), m = async (e) => {
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
	return /* @__PURE__ */ Y("div", {
		className: "mt-3",
		children: [
			/* @__PURE__ */ J("h3", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-2",
				children: "GROUP ROOMS"
			}),
			(n === "owner" || n === "admin") && (o ? /* @__PURE__ */ Y("form", {
				onSubmit: (e) => {
					m(e);
				},
				className: "mb-2 p-3 bg-surface-panel rounded-lg border border-border",
				children: [/* @__PURE__ */ Y("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ J(T, {
							className: "flex-1",
							value: l,
							onChange: (e) => u(e.target.value.slice(0, 50)),
							placeholder: "Room name",
							maxLength: 50,
							required: !0
						}),
						/* @__PURE__ */ J("button", {
							type: "submit",
							disabled: !l.trim() || a,
							className: s("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !l.trim() || a ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
							children: a ? "Creating…" : "Create Room"
						}),
						/* @__PURE__ */ J("button", {
							type: "button",
							onClick: () => c(!1),
							className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
							children: "Cancel"
						})
					]
				}), d && /* @__PURE__ */ J("div", {
					role: "alert",
					"data-testid": "group-room-error",
					className: "text-danger-fg text-[13px] mt-1.5",
					children: d
				})]
			}) : /* @__PURE__ */ J("button", {
				onClick: () => c(!0),
				className: "w-full h-9 mb-2 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Create Room"
			})),
			p.length === 0 ? /* @__PURE__ */ J("div", {
				className: "text-sm text-text-tertiary py-2",
				children: "No rooms in this group yet."
			}) : p.map((e) => /* @__PURE__ */ Y("div", {
				role: i ? "button" : void 0,
				tabIndex: i ? 0 : void 0,
				"aria-label": i ? `Open room ${e.name}` : void 0,
				className: s("flex items-center h-12 border-b border-surface-hover pr-2", i && "cursor-pointer"),
				onClick: i ? () => i(e) : void 0,
				onKeyDown: i ? (t) => {
					(t.key === "Enter" || t.key === " ") && (t.preventDefault(), i(e));
				} : void 0,
				children: [/* @__PURE__ */ J("div", {
					className: "flex-1 text-base text-text-primary",
					children: e.name
				}), /* @__PURE__ */ J("span", {
					className: "bg-info-bg text-info text-xs px-2 py-0.5 rounded",
					children: "group"
				})]
			}, e.roomId))
		]
	});
}
function Ze({ idToken: e, rooms: n, createGroupRoom: r, onRoomSelect: i, roomsLoading: a, compact: o }) {
	let { groups: c, createGroup: l, deleteGroup: u, inviteUser: d, loadMembers: f, members: p, loading: m, loaded: h, loadError: g, refresh: _ } = t({ idToken: e }), v = !h && !g, [y, b] = K(!1), [x, S] = K(null), C = e ? (() => {
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
		return /* @__PURE__ */ Y("div", {
			className: "px-2 pt-2",
			children: [
				/* @__PURE__ */ J("button", {
					onClick: () => b((e) => !e),
					className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
					children: "+ New Group"
				}),
				y && /* @__PURE__ */ J(We, {
					onCreate: w,
					onDiscard: () => b(!1),
					loading: m
				}),
				/* @__PURE__ */ J("div", { children: v && c.length === 0 ? /* @__PURE__ */ J("div", {
					role: "status",
					className: "p-2 text-text-tertiary text-xs text-center",
					children: "Loading…"
				}) : g && c.length === 0 ? /* @__PURE__ */ Y("div", {
					role: "alert",
					"data-testid": "compact-groups-load-error",
					className: "px-2 py-3 text-danger-fg text-xs",
					children: [
						/* @__PURE__ */ J("div", { children: "Couldn’t load groups." }),
						/* @__PURE__ */ J("div", {
							className: "text-text-tertiary mt-0.5",
							children: g
						}),
						/* @__PURE__ */ J("button", {
							type: "button",
							onClick: () => {
								_();
							},
							className: "mt-1 text-[11px] text-primary bg-transparent border-none cursor-pointer p-0 font-[inherit]",
							children: "Retry"
						})
					]
				}) : c.length === 0 ? /* @__PURE__ */ J("div", {
					className: "px-2 py-3 text-text-tertiary text-xs",
					children: "No groups yet"
				}) : c.map((e) => /* @__PURE__ */ J(Ue, {
					group: e,
					isSelected: e.groupId === x,
					onClick: () => T(e.groupId)
				}, e.groupId)) }),
				e && /* @__PURE__ */ J(Ge, {
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
	return /* @__PURE__ */ Y("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ J("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
				children: "Groups"
			}),
			/* @__PURE__ */ J("div", {
				className: "max-h-80 overflow-y-auto mb-3",
				children: v && c.length === 0 ? /* @__PURE__ */ J("div", {
					role: "status",
					className: "py-4 text-center text-sm text-text-tertiary",
					children: "Loading groups…"
				}) : g && c.length === 0 ? /* @__PURE__ */ Y("div", {
					role: "alert",
					"data-testid": "groups-load-error",
					className: "py-4 text-center",
					children: [
						/* @__PURE__ */ J("div", {
							className: "text-sm font-semibold text-danger-fg mb-1",
							children: "Couldn’t load groups"
						}),
						/* @__PURE__ */ J("div", {
							className: "text-sm text-text-tertiary mb-2",
							children: g
						}),
						/* @__PURE__ */ J("button", {
							type: "button",
							onClick: () => {
								_();
							},
							className: "text-sm text-primary bg-transparent border border-border rounded-lg px-3 py-1 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
							children: "Retry"
						})
					]
				}) : c.length === 0 ? /* @__PURE__ */ Y("div", {
					className: "py-4 text-center",
					children: [/* @__PURE__ */ J("div", {
						className: "text-sm font-semibold text-text-primary mb-1",
						children: "No groups yet"
					}), /* @__PURE__ */ J("div", {
						className: "text-sm text-text-tertiary",
						children: "Create a group or join a public one."
					})]
				}) : c.map((e) => /* @__PURE__ */ J(qe, {
					group: e,
					currentUserId: C,
					isSelected: x === e.groupId,
					onSelect: T,
					onDelete: u
				}, e.groupId))
			}),
			x && /* @__PURE__ */ Y("div", {
				className: "mb-3",
				children: [
					/* @__PURE__ */ J(Ye, { members: p }),
					(D === "owner" || D === "admin") && /* @__PURE__ */ J(Je, {
						groupId: x,
						onInvite: d
					}),
					/* @__PURE__ */ J(Xe, {
						rooms: n,
						groupId: x,
						selectedGroupRole: D,
						createGroupRoom: r,
						onRoomSelect: i,
						loading: a
					})
				]
			}),
			/* @__PURE__ */ J("button", {
				onClick: () => b((e) => !e),
				className: s("w-full h-9 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]", y && "mb-2"),
				children: y ? "Cancel" : "Create Group"
			}),
			y && /* @__PURE__ */ J(Ke, {
				onCreate: w,
				onDiscard: () => b(!1),
				loading: m
			})
		]
	});
}
//#endregion
//#region src/components/social/ActivityPanel.tsx
function Qe() {
	return "";
}
var $e = 50;
function et(e) {
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
function tt(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function nt(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function rt({ idToken: e, sendMessage: t, onMessage: n, connectionState: r }) {
	let [i, a] = K([]), [s, c] = K(!0), [l, u] = K(!1), [d, f] = K(null), [p, m] = K(0), h = G(t);
	U(() => {
		h.current = t;
	}, [t]);
	let { toast: g } = o(), _ = nt(e), v = V(() => m((e) => e + 1), []);
	return U(() => {
		let t = Qe();
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
	]), U(() => {
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
	}, [r, _]), U(() => n((e) => {
		if (e.type !== "activity:event") return;
		let t = e.payload;
		t && a((e) => e.length > 0 && e[0].timestamp === t.timestamp && e[0].eventType === t.eventType ? e : [{
			eventType: t.eventType,
			timestamp: t.timestamp,
			detail: t.detail
		}, ...e].slice(0, $e));
	}), [n]), {
		items: i,
		loading: s,
		isLive: l,
		error: d,
		retry: v
	};
}
function it({ idToken: e, sendMessage: t, onMessage: n, connectionState: r }) {
	let { items: i, loading: a, isLive: o, error: c, retry: l } = rt({
		idToken: e,
		sendMessage: t,
		onMessage: n,
		connectionState: r
	});
	return /* @__PURE__ */ Y("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [/* @__PURE__ */ Y("h2", {
			className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
			children: ["Activity", o && /* @__PURE__ */ J("span", {
				className: "inline-block w-2 h-2 rounded-full bg-success ml-2 align-middle",
				title: "Live"
			})]
		}), a ? /* @__PURE__ */ Y("div", {
			className: "flex items-center gap-2 p-4 justify-center text-text-secondary",
			children: [/* @__PURE__ */ J("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }), "Loading..."]
		}) : c && i.length === 0 ? /* @__PURE__ */ Y("div", {
			role: "alert",
			className: "py-6 px-4 text-center text-danger-fg text-sm flex flex-col items-center gap-2",
			children: [
				/* @__PURE__ */ J("span", { children: "Couldn't load activity" }),
				/* @__PURE__ */ J("span", {
					className: "text-text-secondary text-xs",
					children: c
				}),
				/* @__PURE__ */ J("button", {
					type: "button",
					onClick: l,
					className: "mt-1 px-3 py-1 text-xs font-medium text-info-fg bg-info-bg border border-info-border rounded cursor-pointer",
					children: "Retry"
				})
			]
		}) : i.length === 0 ? /* @__PURE__ */ J("div", {
			className: "py-10 text-center text-text-tertiary text-sm",
			children: "No activity yet"
		}) : /* @__PURE__ */ J("div", { children: i.map((e, t) => {
			let { icon: n, text: r } = et(e);
			return /* @__PURE__ */ Y("div", {
				className: s("flex flex-row items-center gap-2 py-2", t < i.length - 1 && "border-b border-surface-hover"),
				children: [
					/* @__PURE__ */ J("span", {
						className: "w-6 shrink-0 text-center",
						children: n
					}),
					/* @__PURE__ */ J("span", {
						className: "flex-1 text-sm text-text-primary",
						children: r
					}),
					/* @__PURE__ */ J("span", {
						className: "text-xs text-text-tertiary shrink-0",
						children: tt(e.timestamp)
					})
				]
			}, t);
		}) })]
	});
}
//#endregion
//#region src/components/social/ReactionsBar.tsx
function at({ reactions: e, onReact: t, disabled: n = !1, pickerEmojis: r = te, addTriggerLabel: i, hideAddTrigger: a = !1, className: o }) {
	let [c, l] = K(!1), u = G(null), d = (e) => {
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
	return /* @__PURE__ */ Y("div", {
		"data-testid": "reactions-bar",
		className: s("relative inline-flex flex-wrap items-center gap-1", o),
		children: [
			p.map((e) => /* @__PURE__ */ Y("button", {
				type: "button",
				onClick: () => d(e.emoji),
				disabled: n,
				"aria-pressed": e.mine ?? !1,
				"data-testid": "reaction-chip",
				"data-emoji": e.emoji,
				"data-mine": e.mine ? "true" : "false",
				className: s("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs leading-none transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", e.mine ? "border-[var(--color-primary)] bg-[var(--color-primary)]/15 text-[var(--color-text-primary)]" : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/60 hover:text-[var(--color-text-primary)]", n && "opacity-50 cursor-not-allowed"),
				children: [/* @__PURE__ */ J("span", {
					"aria-hidden": !0,
					className: "text-sm leading-none",
					children: e.emoji
				}), /* @__PURE__ */ J("span", {
					className: "tabular-nums",
					children: e.count
				})]
			}, e.emoji)),
			!a && /* @__PURE__ */ Y("button", {
				ref: u,
				type: "button",
				onClick: () => !n && l((e) => !e),
				disabled: n,
				"aria-haspopup": "dialog",
				"aria-expanded": c,
				"data-testid": "reactions-bar-add",
				className: s("inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-border)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", "h-6 min-w-6 px-1.5 text-xs text-[var(--color-text-secondary)] transition-colors", !n && "hover:border-[var(--color-primary)] hover:text-[var(--color-text-primary)]", n && "opacity-50 cursor-not-allowed"),
				children: [i ?? /* @__PURE__ */ J("span", {
					"aria-hidden": !0,
					children: "+ 😀"
				}), /* @__PURE__ */ J("span", {
					className: "sr-only",
					children: "Add reaction"
				})]
			}),
			/* @__PURE__ */ J(ee, {
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
function ot({ items: e, activeId: t, onSelect: n, className: r, "data-testid": i = "conversation-shelf" }) {
	return e.length === 0 ? null : /* @__PURE__ */ J("ul", {
		"data-testid": i,
		className: s("m-0 flex list-none flex-col gap-0.5 p-0", r),
		children: e.map((e) => {
			let r = e.id === t, a = e.count ?? 0;
			return /* @__PURE__ */ J("li", { children: /* @__PURE__ */ Y("button", {
				type: "button",
				onClick: () => n(e.id),
				"data-testid": `${i}-${e.id}`,
				"data-active": r ? "true" : "false",
				"aria-current": r ? "true" : void 0,
				className: s("flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-left", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", "hover:bg-surface-hover", r && "bg-surface-hover"),
				children: [
					/* @__PURE__ */ J("span", {
						"aria-hidden": !0,
						className: "grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-surface-inset text-[13px]",
						children: e.icon ?? "•"
					}),
					/* @__PURE__ */ J("span", {
						className: s("min-w-0 flex-1 truncate text-[13px]", a > 0 ? "font-semibold text-text-primary" : "font-medium text-text-secondary"),
						children: e.label
					}),
					a > 0 && /* @__PURE__ */ J("span", {
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
function st({ shelf: e = [], conversations: t, selected: n = null, onSelect: r, onNewChat: i, grouped: a = !0, sectionOrder: o = "channels-first", maxVisible: c, emptyLabel: l, header: u, footer: d, onTogglePin: f, onToggleMute: p, onMarkUnread: m, className: h, "data-testid": g = "conversation-rail" }) {
	return /* @__PURE__ */ Y("aside", {
		"data-testid": g,
		className: s("flex min-h-0 w-80 shrink-0 flex-col border-r border-border bg-surface", h),
		children: [
			u && /* @__PURE__ */ J("div", {
				className: "shrink-0",
				children: u
			}),
			e.length > 0 && /* @__PURE__ */ J(ot, {
				items: e,
				activeId: n?.kind === "shelf" ? n.id : null,
				onSelect: (e) => r({
					kind: "shelf",
					id: e
				}),
				className: "shrink-0 px-2 pt-2",
				"data-testid": `${g}-shelf`
			}),
			/* @__PURE__ */ J(Z, {
				items: t,
				grouped: a,
				sectionOrder: o,
				maxVisible: c,
				activeChannel: n?.kind === "conversation" ? n.channel : null,
				onSelect: (e) => r({
					kind: "conversation",
					channel: e
				}),
				onNewChat: i,
				emptyLabel: l,
				onTogglePin: f,
				onToggleMute: p,
				onMarkUnread: m,
				className: "min-h-0 flex-1 overflow-y-auto p-2",
				"data-testid": `${g}-list`
			}),
			d && /* @__PURE__ */ J("div", {
				className: "shrink-0",
				children: d
			})
		]
	});
}
//#endregion
//#region src/components/social/RunSummaryPanel.tsx
function ct(e, t) {
	return `${e}:${t}`;
}
function lt(e) {
	let t = e.indexOf(":");
	return t <= 0 || t === e.length - 1 ? null : {
		pipelineId: e.slice(0, t),
		runId: e.slice(t + 1)
	};
}
function ut(e) {
	return e === "received" || e === "running" || e === "awaiting_approval";
}
var dt = {
	received: "Received",
	running: "Running",
	awaiting_approval: "Needs approval",
	completed: "Completed",
	rejected: "Rejected",
	failed: "Failed"
}, ft = {
	received: "neutral",
	running: "info",
	awaiting_approval: "warning",
	completed: "success",
	rejected: "danger",
	failed: "danger"
}, Q = 8;
function pt(e) {
	return e.kind === "link" ? e.label ?? "Open link" : e.kind === "panel" ? e.panel.title ? `Open ${e.panel.title}` : "Open result" : "Open beside the chat";
}
function mt({ data: e, onOpenFull: t, onOpenChat: n, onOpenDocument: r, onOpenResult: i, className: a, "data-testid": o = "run-summary-panel" }) {
	let { status: l } = e, u = e.pipelineName || e.pipelineId, d = L({
		startedAt: e.startedAt,
		completedAt: e.completedAt
	}), f = e.ops ?? [], p = e.result && i && !(e.result.kind === "document" && e.document && r), m = e.document?.title || "Document", h = l === "failed" ? e.error || "The run failed" : void 0;
	return /* @__PURE__ */ Y("div", {
		className: s("flex h-full min-h-0 flex-col text-[12px]", a),
		"data-testid": o,
		"data-status": l,
		"data-run-id": e.runId,
		"data-pipeline-id": e.pipelineId,
		children: [/* @__PURE__ */ Y("div", {
			className: "flex min-h-0 flex-1 flex-col gap-3 overflow-auto p-3",
			children: [
				/* @__PURE__ */ Y("header", {
					className: "flex flex-col gap-1",
					"data-testid": `${o}-header`,
					children: [
						/* @__PURE__ */ Y("div", {
							className: "flex min-w-0 items-center gap-2",
							children: [/* @__PURE__ */ J("span", {
								className: "min-w-0 flex-1 truncate text-[13px] font-semibold text-text-primary",
								"data-testid": `${o}-name`,
								children: u
							}), /* @__PURE__ */ J(b, {
								size: "xs",
								tone: ft[l],
								dot: l === "running" ? "pulse" : void 0,
								"data-testid": `${o}-status`,
								children: dt[l]
							})]
						}),
						d && /* @__PURE__ */ J("span", {
							className: "text-[11px] text-text-tertiary",
							"data-testid": `${o}-timings`,
							children: d
						}),
						(e.command || e.instruction) && /* @__PURE__ */ Y("p", {
							className: "m-0 min-w-0 text-text-primary",
							"data-testid": `${o}-instruction`,
							children: [
								e.command && /* @__PURE__ */ J("span", {
									className: "font-mono text-text-tertiary",
									children: e.command
								}),
								e.command && e.instruction ? " " : "",
								e.instruction
							]
						})
					]
				}),
				e.steps.length > 0 && /* @__PURE__ */ Y("section", {
					"aria-label": "Steps",
					"data-testid": `${o}-steps`,
					children: [/* @__PURE__ */ J("h3", {
						className: "m-0 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: "Steps"
					}), /* @__PURE__ */ J("ol", {
						className: "m-0 mt-1 flex list-none flex-col p-0",
						children: e.steps.map((t, n) => /* @__PURE__ */ Y("li", {
							className: "relative flex items-start gap-2 pb-2 last:pb-0",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [
								n < e.steps.length - 1 && /* @__PURE__ */ J("span", {
									"aria-hidden": "true",
									className: "absolute left-[3px] top-3 h-[calc(100%-6px)] w-px bg-border"
								}),
								/* @__PURE__ */ J("span", {
									"aria-hidden": "true",
									className: s("relative mt-[5px] inline-block h-[7px] w-[7px] shrink-0 rounded-full", z[t.status] ?? z.pending)
								}),
								/* @__PURE__ */ Y("span", {
									className: "flex min-w-0 flex-1 items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ J("span", {
										className: s("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "font-medium text-text-primary" : "text-text-secondary"),
										children: t.label
									}), /* @__PURE__ */ J("span", {
										className: "shrink-0 text-[10px] text-text-tertiary",
										children: t.status === "awaiting" ? "needs approval" : t.status
									})]
								})
							]
						}, t.id))
					})]
				}),
				f.length > 0 && /* @__PURE__ */ Y("section", {
					"data-testid": `${o}-ops`,
					children: [
						/* @__PURE__ */ J("h3", {
							className: "m-0 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
							children: "What changed"
						}),
						/* @__PURE__ */ J("ul", {
							className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
							children: f.slice(0, Q).map((e, t) => /* @__PURE__ */ J("li", {
								className: "truncate",
								"data-op": e.op,
								title: e.text,
								children: R(e)
							}, t))
						}),
						f.length > Q && /* @__PURE__ */ Y("div", {
							className: "text-[11px] text-text-tertiary",
							"data-testid": `${o}-more-ops`,
							children: [
								"+",
								f.length - Q,
								" more"
							]
						})
					]
				}),
				e.document && /* @__PURE__ */ Y("div", {
					className: "flex items-start gap-2 rounded-md border border-border bg-surface-inset px-2 py-1.5",
					"data-testid": `${o}-document`,
					children: [
						/* @__PURE__ */ J("span", {
							"aria-hidden": "true",
							className: "shrink-0",
							children: "📄"
						}),
						/* @__PURE__ */ Y("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ J("span", {
								className: "block truncate font-medium text-text-primary",
								children: m
							}), e.document.snippet && /* @__PURE__ */ J("span", {
								className: "line-clamp-2 block text-[11px] text-text-secondary",
								children: e.document.snippet
							})]
						}),
						r && /* @__PURE__ */ J(c, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0.5 text-[11px] leading-5",
							onClick: () => r(e.document.id),
							"data-testid": `${o}-open-document`,
							children: "Open beside the chat"
						})
					]
				}),
				p && e.result && /* @__PURE__ */ Y("div", {
					className: "flex items-center gap-2",
					"data-testid": `${o}-result`,
					"data-result-kind": e.result.kind,
					children: [/* @__PURE__ */ J("span", {
						className: "min-w-0 flex-1 text-text-secondary",
						children: "Result"
					}), /* @__PURE__ */ J(c, {
						size: "sm",
						variant: "secondary",
						className: "!px-2 !py-0.5 text-[11px] leading-5",
						onClick: () => i(e.result),
						"data-testid": `${o}-open-result`,
						children: pt(e.result)
					})]
				}),
				h && /* @__PURE__ */ J(k, {
					tone: "error",
					className: "text-[11px]",
					children: /* @__PURE__ */ J("span", {
						"data-testid": `${o}-error`,
						children: h
					})
				})
			]
		}), /* @__PURE__ */ Y("footer", {
			className: "flex shrink-0 items-center gap-2 border-t border-border px-3 py-2",
			"data-testid": `${o}-footer`,
			children: [/* @__PURE__ */ J(c, {
				size: "sm",
				variant: "primary",
				onClick: t,
				"data-testid": `${o}-open-full`,
				children: "Open full run"
			}), n && e.channel && /* @__PURE__ */ J(c, {
				size: "sm",
				variant: "secondary",
				onClick: n,
				"data-testid": `${o}-open-chat`,
				children: "Open chat"
			})]
		})]
	});
}
function ht({ panel: e, api: t, options: n }) {
	let { load: r, onOpenFull: i, onOpenChat: a, onOpenDocument: o, onOpenResult: s, refreshMs: l = 2e3, "data-testid": u = "run-panel" } = n, [d, f] = K({ status: "loading" }), [p, m] = K(0), h = G(r);
	U(() => {
		h.current = r;
	}, [r]), U(() => {
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
	let g = d.status === "ready" && ut(d.data.status);
	U(() => {
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
	let _ = V(() => m((e) => e + 1), []);
	if (d.status === "loading") return /* @__PURE__ */ Y("div", {
		className: "flex flex-col gap-3 p-3",
		"data-testid": `${u}-loading`,
		"aria-busy": "true",
		children: [
			/* @__PURE__ */ J(w, {
				height: 20,
				width: "60%",
				rounded: "md"
			}),
			/* @__PURE__ */ J(w, {
				height: 14,
				width: "40%",
				rounded: "md"
			}),
			/* @__PURE__ */ J(w, { height: 96 }),
			/* @__PURE__ */ J(w, { height: 44 })
		]
	});
	if (d.status === "error") return /* @__PURE__ */ Y("div", {
		className: "flex flex-col gap-2 p-3",
		"data-testid": `${u}-error`,
		children: [/* @__PURE__ */ Y(k, {
			tone: "error",
			children: ["Could not load this run: ", d.message]
		}), /* @__PURE__ */ J(c, {
			size: "sm",
			variant: "secondary",
			onClick: _,
			className: "self-start",
			"data-testid": `${u}-retry`,
			children: "Try again"
		})]
	});
	let { data: v } = d;
	return /* @__PURE__ */ J(mt, {
		data: v,
		onOpenFull: () => i(e, v),
		onOpenChat: a ? () => a(e, v) : void 0,
		onOpenDocument: o,
		onOpenResult: s,
		"data-testid": u
	});
}
function gt(e) {
	return (t, n) => /* @__PURE__ */ J(ht, {
		panel: t,
		api: n,
		options: e
	});
}
//#endregion
//#region src/components/social/chatCommands.ts
var _t = /^chat:dmg?:/;
function vt(e) {
	return e.channelKind ?? (_t.test(e.channel) ? "dm" : "room");
}
function yt(e, t) {
	let n = e.scope ?? "always";
	if (typeof n == "function") return n(t);
	switch (n) {
		case "always": return !0;
		case "document-open": return t.sidePanel.current?.kind === "document";
		case "room": return vt(t) === "room";
		case "dm": return vt(t) === "dm";
		default: return !0;
	}
}
function bt(e) {
	if (e.disabledHint) return e.disabledHint;
	switch (e.scope) {
		case "document-open": return "Open a document beside the chat first";
		case "room": return "Only in rooms";
		case "dm": return "Only in direct messages";
		default: return e.hint ?? "Not available here";
	}
}
function xt(e, t) {
	return e.map((e) => {
		let { run: n, scope: r, disabledHint: i, ...a } = e;
		return yt({ scope: r }, t) ? a : {
			...a,
			disabled: !0,
			hint: bt({
				scope: r,
				disabledHint: i,
				hint: a.hint
			})
		};
	});
}
function St(e, t) {
	let n = ne(e, t);
	return n ? {
		command: n,
		argumentText: re(e, n).trim()
	} : null;
}
var Ct = "doc", wt = "panel", Tt = "panel.";
function Et(e) {
	return e instanceof URLSearchParams ? new URLSearchParams(e) : new URLSearchParams(e ?? "");
}
function Dt(e) {
	e.delete(Ct), e.delete(wt);
	for (let t of [...e.keys()]) t.startsWith(Tt) && e.delete(t);
}
function Ot(e, t) {
	let n = Et(t);
	if (Dt(n), !e) return n;
	if (e.kind === "document") n.set(Ct, e.id);
	else {
		if (e.kind.includes(":")) throw Error(`A side panel kind cannot contain ':' (got "${e.kind}")`);
		n.set(wt, `${e.kind}:${e.id}`);
	}
	for (let [t, r] of Object.entries(e.params ?? {})) n.set(`${Tt}${t}`, r);
	return n;
}
function kt(e) {
	let t = Et(e), n = {};
	for (let [e, r] of t.entries()) e.startsWith(Tt) && (n[e.slice(6)] = r);
	let r = (e) => Object.keys(n).length ? {
		...e,
		params: n
	} : e, i = t.get(Ct);
	if (i) return r({
		kind: "document",
		id: i
	});
	let a = t.get(wt);
	if (!a) return null;
	let o = a.indexOf(":");
	return o <= 0 || o === a.length - 1 ? null : r({
		kind: a.slice(0, o),
		id: a.slice(o + 1)
	});
}
//#endregion
//#region src/components/social/ChatCommandProvider.tsx
var $ = ie(null);
function At(...e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) for (let e of n ?? []) t.set(e.trigger.toLowerCase(), e);
	return [...t.values()];
}
function jt({ commands: e, children: t }) {
	let n = H($), [r, i] = K([]), a = V((e) => (i((t) => [...t, e]), () => i((t) => t.filter((t) => t !== e))), []), o = W(() => ({
		commands: At(n?.commands, e, ...r),
		register: a
	}), [
		n?.commands,
		e,
		r,
		a
	]);
	return /* @__PURE__ */ J($.Provider, {
		value: o,
		children: t
	});
}
function Mt() {
	return H($)?.commands ?? Nt;
}
var Nt = [];
function Pt(e) {
	let t = H($);
	if (!t) throw Error("useRegisterChatCommands needs a <ChatCommandProvider> above it");
	let { register: n } = t;
	U(() => {
		if (!(!e || e.length === 0)) return n(e);
	}, [n, e]);
}
function Ft() {
	let e = Mt();
	return V(async (t, n) => {
		let r = St(t, e);
		if (!r) return null;
		let { command: i, argumentText: a } = r;
		if (!yt(i, n)) throw Error(`${i.trigger}: ${bt(i)}`);
		return i.run({
			...n,
			text: t,
			argumentText: a
		});
	}, [e]);
}
//#endregion
//#region src/components/social/ChatSidePanelRegistry.tsx
var It = ie(null);
function Lt({ renderers: e, children: t }) {
	let n = H(It), r = W(() => ({
		...n ?? {},
		...e ?? {}
	}), [n, e]);
	return /* @__PURE__ */ J(It.Provider, {
		value: r,
		children: t
	});
}
function Rt() {
	return H(It) ?? zt;
}
var zt = {};
function Bt(e) {
	return Rt()[e] ?? null;
}
function Vt({ title: e, subtitle: t, onClose: n, onOpenFullPage: r, actions: i, children: a, className: o, "data-testid": u = "chat-side-panel" }) {
	return /* @__PURE__ */ Y("section", {
		"aria-label": e,
		"data-testid": u,
		className: s("flex h-full min-h-0 flex-col border-l border-border bg-surface", o),
		children: [/* @__PURE__ */ Y("header", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-1.5",
			children: [/* @__PURE__ */ Y("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ J("span", {
					className: "truncate text-[12px] font-semibold text-text-secondary",
					"data-testid": `${u}-title`,
					children: e
				}), t && /* @__PURE__ */ J("span", {
					className: "truncate text-[11px] text-text-tertiary",
					"data-testid": `${u}-subtitle`,
					children: t
				})]
			}), /* @__PURE__ */ Y(_, {
				gap: "xs",
				align: "center",
				wrap: !1,
				className: "shrink-0",
				children: [
					i,
					r && /* @__PURE__ */ J(c, {
						variant: "ghost",
						size: "sm",
						onClick: r,
						"data-testid": `${u}-open-full`,
						children: "Open full page"
					}),
					/* @__PURE__ */ J(l, {
						size: "sm",
						"aria-label": "Close panel",
						onClick: n,
						"data-testid": `${u}-close`,
						children: "✕"
					})
				]
			})]
		}), /* @__PURE__ */ J("div", {
			className: "min-h-0 flex-1 overflow-auto",
			children: a
		})]
	});
}
function Ht(e) {
	let t = e.replace(/[-_]+/g, " ").trim();
	return t ? t[0].toUpperCase() + t.slice(1) : "Panel";
}
function Ut({ panel: e, onClose: t, onOpenFullPage: n, className: r, "data-testid": i = "chat-side-panel" }) {
	let a = Bt(e.kind), [o, s] = K(null), c = W(() => ({
		close: t,
		openFullPage: n ? () => n(e) : void 0,
		setTitle: s
	}), [
		t,
		n,
		e
	]), l = o || e.title || Ht(e.kind);
	return /* @__PURE__ */ J(Vt, {
		title: l,
		onClose: t,
		onOpenFullPage: c.openFullPage,
		className: r,
		"data-testid": i,
		children: a ? /* @__PURE__ */ J("div", {
			className: "flex h-full min-h-0 flex-col",
			"data-kind": e.kind,
			"data-id": e.id,
			children: a(e, c)
		}, `${e.kind}:${e.id}`) : /* @__PURE__ */ J(S, {
			size: "sm",
			icon: "🧩",
			title: `No view registered for ${e.kind}`,
			body: "Register a renderer for this kind with ChatSidePanelProvider.",
			testId: `${i}-empty`
		})
	});
}
//#endregion
//#region src/components/social/ChatBubbleStack.tsx
function Wt({ bubble: e, onOpen: t, onDismiss: n, dismissAfterMs: r }) {
	return U(() => {
		let e = setTimeout(n, r);
		return () => clearTimeout(e);
	}, [e.id, r]), /* @__PURE__ */ Y("div", {
		role: "status",
		className: "pointer-events-auto flex w-80 max-w-[calc(100vw-2rem)] items-start gap-2.5 rounded-xl border border-border bg-surface p-3 shadow-lg",
		"data-testid": "chat-bubble",
		"data-bubble-id": e.id,
		children: [/* @__PURE__ */ Y("button", {
			type: "button",
			className: "flex min-w-0 flex-1 items-start gap-2.5 border-none bg-transparent p-0 text-left cursor-pointer",
			onClick: t,
			"aria-label": `Open the conversation: ${e.author} said ${e.text}`,
			children: [/* @__PURE__ */ J(O, {
				name: e.author,
				size: 28,
				...e.avatarUrl ? { src: e.avatarUrl } : {},
				...e.color ? { color: e.color } : {}
			}), /* @__PURE__ */ Y("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ Y("span", {
					className: "flex items-baseline gap-1.5",
					children: [/* @__PURE__ */ J("span", {
						className: "truncate text-[12px] font-semibold text-text-primary",
						children: e.author
					}), e.channelLabel && /* @__PURE__ */ J("span", {
						className: "truncate text-[11px] text-text-tertiary",
						children: e.channelLabel
					})]
				}), /* @__PURE__ */ J("span", {
					className: "line-clamp-3 text-[13px] leading-snug text-text-primary",
					children: e.text
				})]
			})]
		}), /* @__PURE__ */ J("button", {
			type: "button",
			className: "shrink-0 border-none bg-transparent p-0.5 text-text-tertiary hover:text-text-primary cursor-pointer",
			"aria-label": "Dismiss",
			onClick: n,
			"data-testid": "chat-bubble-dismiss",
			children: "✕"
		})]
	});
}
function Gt({ bubbles: e, onOpen: t, onDismiss: n, dismissAfterMs: r = 8e3, max: i = 3, className: a, "data-testid": o = "chat-bubble-stack" }) {
	let c = e.slice(-i);
	return c.length === 0 ? null : /* @__PURE__ */ J("div", {
		className: s("pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2", a),
		"data-testid": o,
		"aria-live": "polite",
		children: c.map((e) => /* @__PURE__ */ J(Wt, {
			bubble: e,
			dismissAfterMs: r,
			onOpen: () => t(e.id),
			onDismiss: () => n(e.id)
		}, e.id))
	});
}
//#endregion
//#region src/components/social/ConversationStart.tsx
function Kt({ d: e }) {
	return /* @__PURE__ */ J("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.75",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: /* @__PURE__ */ J("path", { d: e })
	});
}
var qt = "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM12 8v6M9 11h6", Jt = "M4 4h16v12H8l-4 4zM9 9h6M9 12h4", Yt = "M22 2 11 13M22 2l-7 20-4-9-9-4z";
function Xt({ items: e, onPick: t, disabled: n, searchAbove: r, kind: i, testId: a }) {
	let [o, s] = K(""), c = W(() => {
		let t = o.trim().toLowerCase();
		return t ? e.filter((e) => e.label.toLowerCase().includes(t)) : e;
	}, [e, o]);
	return /* @__PURE__ */ Y(h, {
		gap: "none",
		children: [e.length > r && /* @__PURE__ */ J("div", {
			className: "px-4 pb-1 pt-2",
			children: /* @__PURE__ */ J(v, {
				value: o,
				onChange: s,
				placeholder: i === "room" ? "Find a room" : "Find a person",
				"data-testid": `${a}-search`
			})
		}), c.length === 0 ? /* @__PURE__ */ Y(A, {
			"data-testid": `${a}-none`,
			children: [
				"Nothing matches “",
				o.trim(),
				"”."
			]
		}) : c.map((e) => /* @__PURE__ */ J(M, {
			label: e.label,
			icon: e.icon ?? (i === "person" ? /* @__PURE__ */ J(O, {
				name: e.label,
				size: 20
			}) : void 0),
			onSelect: () => t(e.id),
			disabled: n,
			"data-testid": `${a}-option`
		}, e.id))]
	});
}
function Zt({ title: e = "No conversation yet", body: t = "Whichever you choose, the conversation shows up here.", onStart: n, startLabel: r = "Start a conversation", startDescription: i = "A new room, named after this page", rooms: a = [], onAddToRoom: o, people: s = [], onShareWith: l, busy: u = !1, receipt: d = null, searchAbove: f = 6, "data-testid": p = "conversation-start" }) {
	return /* @__PURE__ */ Y(h, {
		gap: "none",
		className: "min-h-0 flex-1 overflow-y-auto",
		"data-testid": p,
		children: [
			/* @__PURE__ */ Y("div", {
				className: "px-4 pb-3 pt-4",
				children: [/* @__PURE__ */ J("div", {
					className: "text-[13px] font-semibold text-text-primary",
					children: e
				}), /* @__PURE__ */ J("p", {
					className: "m-0 mt-0.5 text-[12px] leading-snug text-text-secondary",
					children: t
				})]
			}),
			d && /* @__PURE__ */ J("div", {
				className: "px-4 pb-3",
				children: /* @__PURE__ */ J(y, {
					variant: d.tone,
					layout: "stacked",
					"data-testid": `${p}-receipt`,
					children: /* @__PURE__ */ Y("span", {
						className: "flex flex-wrap items-center gap-x-2 gap-y-1",
						children: [/* @__PURE__ */ J("span", { children: d.text }), d.actionLabel && d.onAction && /* @__PURE__ */ J(c, {
							variant: "ghost",
							size: "sm",
							onClick: d.onAction,
							"data-testid": `${p}-receipt-action`,
							children: d.actionLabel
						})]
					})
				})
			}),
			/* @__PURE__ */ Y(P, {
				"data-testid": `${p}-choices`,
				children: [
					n && /* @__PURE__ */ J(N, {
						icon: /* @__PURE__ */ J(Kt, { d: qt }),
						title: r,
						description: i,
						onSelect: n,
						busy: u,
						"data-testid": `${p}-start`
					}),
					o && /* @__PURE__ */ J(N, {
						icon: /* @__PURE__ */ J(Kt, { d: Jt }),
						title: "Add to a room",
						description: a.length === 0 ? "No rooms yet" : `${a.length} room${a.length === 1 ? "" : "s"} your team is in`,
						disabled: a.length === 0,
						disabledReason: "There are no rooms to add it to yet",
						busy: u,
						"data-testid": `${p}-rooms`,
						children: /* @__PURE__ */ J(Xt, {
							items: a,
							onPick: o,
							disabled: u,
							searchAbove: f,
							kind: "room",
							testId: `${p}-rooms`
						})
					}),
					l && /* @__PURE__ */ J(N, {
						icon: /* @__PURE__ */ J(Kt, { d: Yt }),
						title: "Send to someone",
						description: s.length === 0 ? "Nobody to send to yet" : "It lands in their chat",
						disabled: s.length === 0,
						disabledReason: "There is nobody to send it to yet",
						busy: u,
						"data-testid": `${p}-people`,
						children: /* @__PURE__ */ J(Xt, {
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
var Qt = [
	{
		mode: "none",
		title: "Don't include chat history",
		description: "They see what is said from now on"
	},
	{
		mode: "days",
		title: "Include history from the past days",
		description: "A recent stretch of the conversation"
	},
	{
		mode: "all",
		title: "Include all chat history",
		description: "Everything ever said here"
	}
], $t = 7, en = 1, tn = 3650;
function nn({ open: e, conversationName: t, people: n, preselectedIds: r = [], busy: i = !1, onAdd: a, onClose: o, "data-testid": l = "add-to-chat-dialog", historyChoice: u = !0 }) {
	let [f, p] = K(""), [m, h] = K([...r]), [g, _] = K("none"), [y, S] = K(7), [w, T] = K(!1), [E, D] = K(null);
	U(() => {
		e && (p(""), h([...r]), _("none"), S(7), T(!1), D(null));
	}, [e, r.join("\n")]);
	let k = W(() => new Map(n.map((e) => [e.id, e])), [n]), A = W(() => {
		let e = f.trim().toLowerCase();
		return n.filter((t) => !e || t.name.toLowerCase().includes(e) || (t.subtitle ?? "").toLowerCase().includes(e));
	}, [n, f]), j = (e) => h((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), M = Number.isInteger(y) && y >= 1 && y <= 3650, F = i || w, I = m.length > 0 && (g !== "days" || M) && !F, L = async () => {
		if (I) {
			T(!0), D(null);
			try {
				await a(m, u ? g === "days" ? {
					mode: g,
					days: y
				} : { mode: g } : { mode: "all" }), o();
			} catch (e) {
				D(e instanceof Error ? e.message : String(e)), T(!1);
			}
		}
	};
	return /* @__PURE__ */ J(x, {
		open: e,
		onClose: o,
		title: `Add people to ${t}`,
		maxWidth: 520,
		footer: /* @__PURE__ */ Y(q, { children: [/* @__PURE__ */ J(c, {
			variant: "secondary",
			size: "sm",
			onClick: o,
			disabled: F,
			"data-testid": `${l}-cancel`,
			children: "Cancel"
		}), /* @__PURE__ */ J(c, {
			variant: "primary",
			size: "sm",
			onClick: () => void L(),
			disabled: !I,
			"data-testid": `${l}-add`,
			children: w ? "Adding…" : m.length > 1 ? `Add ${m.length} people` : "Add"
		})] }),
		children: /* @__PURE__ */ Y("div", {
			className: "flex min-h-[26rem] flex-col gap-3 text-sm",
			"data-testid": l,
			children: [
				/* @__PURE__ */ J(v, {
					value: f,
					onChange: p,
					placeholder: "Enter a name",
					autoFocus: !0,
					"aria-label": "Find people to add",
					"data-testid": `${l}-search`
				}),
				m.length > 0 && /* @__PURE__ */ J("div", {
					className: "flex flex-wrap gap-1.5",
					"data-testid": `${l}-picked`,
					children: m.map((e) => {
						let t = k.get(e);
						return /* @__PURE__ */ J(b, {
							tone: "info",
							size: "sm",
							className: "rounded-full pr-1",
							"data-testid": `${l}-picked-${e}`,
							children: /* @__PURE__ */ Y("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ J(O, {
										name: t?.name ?? e,
										src: t?.avatarUrl,
										size: 16
									}),
									t?.name ?? e,
									/* @__PURE__ */ J("button", {
										type: "button",
										"aria-label": `Remove ${t?.name ?? e}`,
										onClick: () => j(e),
										disabled: F,
										className: "ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full border-none bg-transparent text-current hover:bg-black/10",
										"data-testid": `${l}-unpick-${e}`,
										children: /* @__PURE__ */ J(d, { size: 10 })
									})
								]
							})
						}, e);
					})
				}),
				/* @__PURE__ */ Y("ul", {
					role: "listbox",
					"aria-label": "People",
					"aria-multiselectable": "true",
					className: "m-0 max-h-48 list-none overflow-y-auto rounded-md border border-border p-0",
					"data-testid": `${l}-people`,
					children: [A.length === 0 && /* @__PURE__ */ J("li", {
						className: "px-3 py-3 text-xs text-text-tertiary",
						"data-testid": `${l}-nobody`,
						children: n.length === 0 ? "Everyone is already here." : "Nobody by that name."
					}), A.map((e) => {
						let t = m.includes(e.id);
						return /* @__PURE__ */ J("li", {
							role: "option",
							"aria-selected": t,
							children: /* @__PURE__ */ Y("button", {
								type: "button",
								onClick: () => j(e.id),
								disabled: F,
								className: s("flex w-full items-center gap-2 border-none bg-transparent px-3 py-2 text-left font-[inherit] hover:bg-surface-hover", t && "bg-surface-inset"),
								"data-testid": `${l}-person-${e.id}`,
								children: [
									/* @__PURE__ */ J(O, {
										name: e.name,
										src: e.avatarUrl,
										size: 24
									}),
									/* @__PURE__ */ Y("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ J("span", {
											className: "block truncate text-text-primary",
											children: e.name
										}), e.subtitle && /* @__PURE__ */ J("span", {
											className: "block truncate text-xs text-text-tertiary",
											children: e.subtitle
										})]
									}),
									/* @__PURE__ */ J("span", {
										className: s("text-xs", t ? "text-primary" : "text-transparent"),
										"aria-hidden": "true",
										children: "✓"
									})
								]
							})
						}, e.id);
					})]
				}),
				u && /* @__PURE__ */ Y(q, { children: [
					/* @__PURE__ */ J("div", {
						className: "text-xs font-semibold uppercase tracking-wide text-text-tertiary",
						children: "Chat history"
					}),
					/* @__PURE__ */ J(P, {
						"data-testid": `${l}-history`,
						children: Qt.map((e) => /* @__PURE__ */ J(N, {
							title: e.mode === "days" && g === "days" ? `Include history from the past ${y || 7} days` : e.title,
							description: e.description,
							selected: g === e.mode,
							onSelect: () => _(e.mode),
							disabled: F,
							"data-testid": `${l}-history-${e.mode}`
						}, e.mode))
					}),
					/* @__PURE__ */ J("div", {
						className: "min-h-[3.75rem]",
						children: g === "days" && /* @__PURE__ */ J(C, {
							label: "Number of days",
							...M ? {} : { error: "Between 1 and 3650." },
							children: (e) => /* @__PURE__ */ J("input", {
								...e,
								type: "number",
								min: 1,
								max: 3650,
								value: Number.isFinite(y) ? y : "",
								onChange: (e) => S(e.target.value === "" ? NaN : Number(e.target.value)),
								className: "w-24 rounded-md border border-border bg-surface px-2 py-1.5 text-sm text-text-primary",
								"data-testid": `${l}-days`
							})
						})
					})
				] }),
				E && /* @__PURE__ */ J("p", {
					className: "m-0 text-xs text-danger-fg",
					role: "alert",
					"data-testid": `${l}-error`,
					children: E
				})
			]
		})
	});
}
//#endregion
//#region src/components/social/MembersPanel.tsx
function rn(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `Added ${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})}`;
}
function an({ members: e, open: t = !1, canManage: n = !1, currentUserId: r, onAdd: i, onRemove: a, className: o, "data-testid": f = "members-panel" }) {
	let p = [...e].sort((e, t) => e.role === t.role ? e.name.localeCompare(t.name) : e.role === "owner" ? -1 : 1);
	return /* @__PURE__ */ Y("div", {
		className: s("flex min-h-0 flex-col", o),
		"data-testid": f,
		"data-open": String(t),
		children: [/* @__PURE__ */ Y("div", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-2",
			children: [/* @__PURE__ */ J("span", {
				className: "text-xs text-text-tertiary",
				"data-testid": `${f}-count`,
				children: t ? "Open channel" : `${e.length} ${e.length === 1 ? "member" : "members"}`
			}), i && /* @__PURE__ */ J(c, {
				variant: "secondary",
				size: "sm",
				onClick: i,
				"data-testid": `${f}-add`,
				children: /* @__PURE__ */ Y("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ J(u, { size: 12 }), " Add people"]
				})
			})]
		}), t && e.length === 0 ? /* @__PURE__ */ J(S, {
			size: "sm",
			title: "Everyone can read this channel.",
			body: "Add people to make it members-only.",
			...i ? {
				actionLabel: "Add people",
				onAction: i
			} : {},
			testId: `${f}-empty`
		}) : /* @__PURE__ */ J("ul", {
			className: "m-0 min-h-0 flex-1 list-none overflow-y-auto p-0",
			"data-testid": `${f}-list`,
			children: p.map((e) => {
				let t = e.id === r, i = !!a && (n || t);
				return /* @__PURE__ */ Y("li", {
					className: "flex items-center gap-2 px-3 py-2",
					"data-testid": `${f}-member-${e.id}`,
					children: [
						/* @__PURE__ */ J(O, {
							name: e.name,
							src: e.avatarUrl,
							size: 28
						}),
						/* @__PURE__ */ Y("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ Y("span", {
								className: "block truncate text-sm text-text-primary",
								children: [e.name, t && /* @__PURE__ */ J("span", {
									className: "text-text-tertiary",
									children: " (you)"
								})]
							}), e.addedAt && /* @__PURE__ */ J("span", {
								className: "block truncate text-xs text-text-tertiary",
								children: rn(e.addedAt)
							})]
						}),
						e.role === "owner" && /* @__PURE__ */ J(b, {
							tone: "neutral",
							size: "xs",
							"data-testid": `${f}-owner-${e.id}`,
							children: "Owner"
						}),
						i && /* @__PURE__ */ J(l, {
							"aria-label": t ? "Leave" : `Remove ${e.name}`,
							title: t ? "Leave" : "Remove",
							variant: "ghost",
							size: "sm",
							onClick: () => a?.(e.id),
							icon: /* @__PURE__ */ J(d, { size: 12 }),
							"data-testid": `${f}-remove-${e.id}`
						})
					]
				}, e.id);
			})
		})]
	});
}
//#endregion
export { lt as A, Ce as B, St as C, mt as D, ht as E, it as F, fe as G, xe as H, Ze as I, de as K, He as L, st as M, ot as N, gt as O, at as P, Pe as R, yt as S, Ot as T, Z as U, Se as V, pe as W, Pt as _, en as a, bt as b, Ut as c, Ht as d, Bt as f, Mt as g, At as h, tn as i, ct as j, ut as k, Vt as l, jt as m, nn as n, Zt as o, Rt as p, $t as r, Gt as s, an as t, Lt as u, Ft as v, kt as w, xt as x, vt as y, ke as z };
