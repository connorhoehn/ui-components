import { a as e, i as t, n, o as r, r as i, t as a } from "./useSocialProfile-5S1qyvsv.js";
import { n as o } from "./ToastProvider-BKjV21G4.js";
import { t as s } from "./cn-DhjIN-s0.js";
import { t as c } from "./Button-BhS4-R6_.js";
import { t as l } from "./IconButton-C3DMtvSx.js";
import { a as u, c as d, f, h as p, m, p as h, r as g, s as _, t as v, y } from "./DropdownMenu-aZxk83gS.js";
import { a as b, i as x, n as S, o as C, r as w, t as T } from "./PopoverForm-DHjrX-Np.js";
import { t as E } from "./Banner-C3Wgh62A.js";
import { t as D } from "./Chip-BENLwTlq.js";
import { t as O } from "./EmptyState-JzzL2z1E.js";
import { t as k } from "./SkeletonCard-CGe8XFPB.js";
import { t as A } from "./Input-DLknWXri.js";
import { t as j } from "./Textarea-Dz4doxTv.js";
import { n as M, t as N } from "./Avatar-BzicCOft.js";
import { t as P } from "./SegmentedControl-18MqeMsn.js";
import { t as F } from "./InlineAlert-Myf3oJZf.js";
import { t as I } from "./InlinePlaceholder-51dbPRGn.js";
import { t as ee } from "./Select-CqVokE2v.js";
import { n as L, r as R, t as z } from "./ChoiceList-CaZ4rZrS.js";
import { G as B, K as te, M as V, N as ne, O as re } from "./ConversationSurface-D38wYeCB.js";
import { t as ie } from "./rovingFocus-Bj5Y6kwY.js";
import { n as ae, t as oe } from "./ReactionPickerPopover-CcL-n6gt.js";
import { n as se, t as ce } from "./composerCommands-DXer0id_.js";
import { createContext as le, useCallback as H, useContext as U, useEffect as W, useId as ue, useMemo as G, useRef as K, useState as q } from "react";
import { Fragment as de, jsx as J, jsxs as Y } from "react/jsx-runtime";
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
function fe(e) {
	return {
		id: e.userId,
		displayName: e.displayName,
		bio: e.bio ?? "",
		avatarUrl: e.avatarUrl ?? null,
		visibility: e.visibility
	};
}
function pe({ user: e, size: t }) {
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
function me({ targetUser: e, followState: t, compact: n = !1, onFollowChange: r }) {
	let [i, a] = q(!1);
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
function he({ user: e, isOwnProfile: t, onSave: n }) {
	let [r, i] = q(!1), [a, o] = q(e.displayName), [c, l] = q(e.bio), [u, d] = q(e.avatarUrl ?? ""), [f, p] = q(e.visibility), [m, h] = q(!1), [g, _] = q(null), v = ue();
	W(() => {
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
			}), /* @__PURE__ */ J(A, {
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
			}), /* @__PURE__ */ J(j, {
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
			}), /* @__PURE__ */ J(A, {
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
				onKeyDown: (e) => ie(e, { itemSelector: "[role=\"radio\"]" }),
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
			children: [/* @__PURE__ */ J(pe, {
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
function ge({ followers: e, following: t, friends: n, followStates: r, onFollowChange: i, loadError: a }) {
	let [o, c] = q("followers"), l = (e) => a ? "" : ` (${e.length})`, u = [
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
			onKeyDown: ie,
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
					/* @__PURE__ */ J(pe, {
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
					/* @__PURE__ */ J(me, {
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
function _e({ idToken: t, onMessage: n }) {
	let { profile: r, loading: i, error: o, updateProfile: s } = a({ idToken: t }), { followers: c, following: l, friends: u, follow: d, unfollow: f, error: p, loadError: m } = e({ idToken: t }), h = new Set(l.map((e) => e.userId)), g = {};
	[
		...c,
		...l,
		...u
	].forEach((e) => {
		g[e.userId] = h.has(e.userId) ? "following" : "not-following";
	});
	let [_, v] = q(null), y = async (e, t) => {
		v(null);
		try {
			t === "following" || t === "pending" ? await d(e) : await f(e);
		} catch (e) {
			v(e instanceof Error ? e.message : "Follow action failed");
		}
	}, b = c.map((e) => X(e, g[e.userId] ?? "not-following")), x = l.map((e) => X(e, "following")), S = u.map((e) => X(e, "following")), C = r ? {
		...fe(r),
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
			}) : C ? /* @__PURE__ */ Y(de, { children: [/* @__PURE__ */ J(he, {
				user: C,
				isOwnProfile: !0,
				onSave: s
			}), /* @__PURE__ */ J(ge, {
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
function ve(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64);
}
function ye({ people: e, onStartDm: t, onCreateChannel: n, onCancel: r, peopleError: i = null, busy: a = !1, className: o, "data-testid": c = "new-conversation" }) {
	let [l, u] = q(""), d = K(null), f = G(() => {
		let t = l.trim().toLowerCase();
		return t ? e.filter((e) => e.displayName.toLowerCase().includes(t)) : e;
	}, [e, l]), p = ve(l), m = !!n && p.length > 0;
	return /* @__PURE__ */ Y("div", {
		"data-testid": c,
		className: s("flex flex-col gap-1 rounded-lg border border-border bg-surface p-2", o),
		children: [/* @__PURE__ */ Y("div", {
			className: "flex items-center gap-1.5",
			children: [/* @__PURE__ */ J(A, {
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
					children: [/* @__PURE__ */ J(N, {
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
//#region src/components/social/RailSectionHeader.tsx
function be({ label: e, actions: t = [], presentational: n = !0, dark: r = !1, className: i, "data-testid": a = "rail-section-header" }) {
	return /* @__PURE__ */ Y("div", {
		"data-testid": a,
		className: s("flex items-center gap-1 px-2 pb-1 pt-3", i),
		children: [/* @__PURE__ */ J("span", {
			"aria-hidden": n || void 0,
			className: s("min-w-0 flex-1 truncate text-[11px] font-semibold uppercase tracking-wide", r ? "text-white/40" : "text-text-tertiary"),
			children: e
		}), t.map((e) => /* @__PURE__ */ J("button", {
			type: "button",
			title: e.label,
			"aria-label": e.label,
			onClick: (t) => e.onClick(t.currentTarget),
			"data-testid": e["data-testid"],
			className: s("grid h-5 w-5 shrink-0 cursor-pointer place-items-center rounded border-none bg-transparent p-0", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", r ? "text-white/50 hover:bg-white/10 hover:text-white" : "text-text-tertiary hover:bg-surface-hover hover:text-text-primary"),
			children: e.icon ?? /* @__PURE__ */ J(p, { size: 13 })
		}, e.label))]
	});
}
//#endregion
//#region src/components/social/ConversationList.tsx
function xe(e, t) {
	let n = e.lastMessageAt ? Date.parse(e.lastMessageAt) : NaN, r = t.lastMessageAt ? Date.parse(t.lastMessageAt) : NaN, i = Number.isNaN(n) ? null : n, a = Number.isNaN(r) ? null : r;
	return i === null && a === null ? 0 : i === null ? 1 : a === null ? -1 : a - i;
}
function Se({ items: e, grouped: t = !1, sectionOrder: n = "channels-first", sectionActions: r, onStartCall: i, sortByRecency: a = !0, maxVisible: o, activeChannel: c, onSelect: l, onNewChat: d, emptyLabel: f = "No conversations yet", onTogglePin: p, onToggleMute: g, onMarkUnread: _, tone: b = "light", className: S, "data-testid": C }) {
	let w = b === "dark", T = C ?? "conversation", E = a ? [...e].sort(xe) : e, D = [], O = E.filter((e) => e.pinned), k = O.length > 0 ? E.filter((e) => !e.pinned) : E;
	if (O.length > 0 && D.push({
		heading: "Pinned",
		label: "Pinned",
		items: O
	}), t) {
		let e = (e) => (e.kind ?? (e.peers.length > 1 ? "group" : "dm")) === "channel", t = k.filter(e), r = k.filter((t) => !e(t)), i = {
			heading: "Channels",
			label: "Channels",
			items: t
		}, a = {
			heading: "Direct messages",
			label: "Direct messages",
			items: r
		}, o = n === "dms-first" ? [a, i] : [i, a];
		for (let e of o) e.items.length > 0 && D.push(e);
	} else k.length > 0 && D.push({
		label: "Conversations",
		items: k
	});
	let [A, j] = q(() => /* @__PURE__ */ new Set()), P = D.map((e) => {
		let t = o !== void 0 && o >= 0 && e.items.length > o;
		if (!t || A.has(e.label)) return {
			...e,
			shown: e.items,
			hidden: 0,
			capped: t
		};
		let n = e.items.slice(0, o), r = c ? e.items.find((e) => e.channel === c) : void 0;
		return r && !n.includes(r) && (n = o === 0 ? [r] : [...n.slice(0, -1), r]), {
			...e,
			shown: n,
			hidden: e.items.length - n.length,
			capped: t
		};
	}), F = (e) => j((t) => {
		let n = new Set(t);
		return n.has(e) ? n.delete(e) : n.add(e), n;
	}), I = P.flatMap((e) => e.shown), ee = K(null), [L, R] = q(null), z = (L && I.some((e) => e.channel === L) ? L : null) ?? (c && I.some((e) => e.channel === c) ? c : null) ?? I[0]?.channel ?? null, B = K(null);
	W(() => {
		let e = B.current;
		if (!e) return;
		B.current = null;
		let t = ee.current?.querySelector(`[data-testid="conversation-row"][data-channel="${CSS.escape(e)}"]`);
		t?.focus(), t?.scrollIntoView({ block: "nearest" });
	});
	function V(e) {
		let t = Math.max(0, Math.min(I.length - 1, e)), n = I[t];
		!n || n.channel === z || (B.current = n.channel, R(n.channel));
	}
	function ne(e) {
		if (I.length === 0) return;
		let t = I.findIndex((e) => e.channel === z), n = t < 0 ? 0 : t;
		switch (e.key) {
			case "ArrowDown":
				V(n + 1);
				break;
			case "ArrowUp":
				V(n - 1);
				break;
			case "Home":
				V(0);
				break;
			case "End":
				V(I.length - 1);
				break;
			default: return;
		}
		e.preventDefault();
	}
	return /* @__PURE__ */ Y("div", {
		className: s("flex min-h-0 flex-col gap-1", S),
		"data-testid": C,
		children: [d && /* @__PURE__ */ Y("button", {
			type: "button",
			onClick: d,
			"data-testid": "conversation-new-chat",
			className: s("flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] font-medium", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", w ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"),
			children: [/* @__PURE__ */ J("span", {
				"aria-hidden": "true",
				className: s("grid h-6 w-6 place-items-center rounded-full border border-dashed text-sm leading-none", w ? "border-white/30" : "border-border"),
				children: "+"
			}), "New chat"]
		}), e.length === 0 ? /* @__PURE__ */ J("p", {
			className: s("m-0 px-2 py-1.5 text-[13px]", w ? "text-white/60" : "text-text-secondary"),
			"data-testid": "conversation-empty",
			children: f
		}) : /* @__PURE__ */ J("div", {
			ref: ee,
			onKeyDown: ne,
			className: "m-0 flex min-h-0 flex-col overflow-y-auto p-0",
			children: P.map((e) => /* @__PURE__ */ Y("div", { children: [
				e.heading && /* @__PURE__ */ J(be, {
					label: e.heading,
					dark: w,
					actions: r?.[e.label] ?? [],
					"data-testid": "conversation-section"
				}),
				/* @__PURE__ */ J("ul", {
					className: "m-0 flex list-none flex-col gap-0.5 p-0",
					"aria-label": e.label,
					children: e.shown.map((e) => {
						let t = e.channel === c, n = e.channel === z, r = e.kind ?? (e.peers.length > 1 ? "group" : "dm"), a = r === "channel", o = r === "group", d = e.peers[0], f = a ? e.name ?? e.channel : e.peers.map((e) => e.displayName).join(", "), b = e.lastMessageAt ? te(e.lastMessageAt) : "", S = e.unreadCount ?? 0, C = !!e.mentioned, E = !!e.live, D = !!e.muted, O = `${T}-row-menu-${e.channel}`, k = [];
						return i && (k.push({
							label: "Call",
							icon: /* @__PURE__ */ J(h, { size: 14 }),
							onSelect: () => i(e.channel, "audio"),
							"data-testid": `${O}-call`
						}), k.push({
							label: "Video call",
							icon: /* @__PURE__ */ J(y, { size: 14 }),
							onSelect: () => i(e.channel, "video"),
							"data-testid": `${O}-video-call`
						})), p && k.push({
							label: e.pinned ? "Unpin" : "Pin",
							icon: /* @__PURE__ */ J(m, { size: 14 }),
							onSelect: () => p(e.channel, !e.pinned),
							"data-testid": `${O}-pin`
						}), g && k.push({
							label: D ? "Unmute" : "Mute",
							icon: /* @__PURE__ */ J(u, { size: 14 }),
							onSelect: () => g(e.channel, !D),
							"data-testid": `${O}-mute`
						}), _ && S === 0 && k.push({
							label: "Mark as unread",
							onSelect: () => _(e.channel),
							"data-testid": `${O}-unread`
						}), /* @__PURE__ */ Y("li", {
							className: s("relative", k.length > 0 && "group"),
							children: [/* @__PURE__ */ Y("button", {
								type: "button",
								onClick: () => l(e.channel),
								onFocus: () => R(e.channel),
								"data-testid": "conversation-row",
								"data-channel": e.channel,
								"data-active": t ? "true" : "false",
								"aria-current": t ? "true" : void 0,
								tabIndex: n ? 0 : -1,
								className: s("flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-left", k.length > 0 && "pr-8", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", w ? "hover:bg-white/10" : "hover:bg-surface-hover", t && (w ? "bg-white/10" : "bg-surface-hover")),
								children: [
									a ? /* @__PURE__ */ J("span", {
										"aria-hidden": "true",
										"data-testid": "conversation-channel-glyph",
										className: s("grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[15px] font-semibold leading-none", w ? "bg-white/10 text-white/70" : "bg-surface-inset text-text-secondary"),
										children: "#"
									}) : o ? /* @__PURE__ */ J(M, {
										size: 28,
										maxVisible: 2,
										items: e.peers.map((e) => ({
											name: e.displayName,
											color: e.color,
											src: e.avatarUrl
										}))
									}) : d ? /* @__PURE__ */ Y("span", {
										className: "relative inline-flex shrink-0",
										children: [/* @__PURE__ */ J(N, {
											name: d.displayName,
											color: d.color,
											src: d.avatarUrl,
											size: 28
										}), d.online !== void 0 && /* @__PURE__ */ J(x, {
											state: d.online ? "online" : "offline",
											pulse: !1,
											className: s("absolute -bottom-0.5 -right-0.5 rounded-full ring-2", w ? "ring-call-chrome" : "ring-surface")
										})]
									}) : null,
									/* @__PURE__ */ Y("span", {
										className: "flex min-w-0 flex-1 flex-col",
										children: [/* @__PURE__ */ Y("span", {
											className: "flex items-baseline gap-2",
											children: [
												/* @__PURE__ */ J("span", {
													className: s("min-w-0 flex-1 truncate text-[13px]", S > 0 ? "font-semibold" : "font-medium", w ? "text-white" : "text-text-primary"),
													children: f
												}),
												e.pinned && /* @__PURE__ */ J("span", {
													"data-testid": `${T}-pinned`,
													title: "Pinned",
													className: s("shrink-0", w ? "text-white/50" : "text-text-tertiary"),
													children: /* @__PURE__ */ J(m, { size: 12 })
												}),
												D && /* @__PURE__ */ J("span", {
													"data-testid": `${T}-muted`,
													title: "Muted",
													className: s("shrink-0", w ? "text-white/50" : "text-text-tertiary"),
													children: /* @__PURE__ */ J(u, { size: 12 })
												}),
												b && /* @__PURE__ */ J("span", {
													className: s("shrink-0 text-[11px] tabular-nums", w ? "text-white/50" : "text-text-tertiary"),
													"data-testid": "conversation-time",
													children: b
												})
											]
										}), e.lastMessagePreview && /* @__PURE__ */ J("span", {
											className: s("truncate text-[12px]", w ? "text-white/60" : "text-text-secondary"),
											"data-testid": "conversation-preview",
											children: e.lastMessagePreview
										})]
									}),
									E && /* @__PURE__ */ Y("span", {
										"data-testid": "conversation-live",
										"aria-label": "Call in progress",
										title: "Call in progress",
										className: "inline-flex shrink-0 items-center gap-1 rounded-full bg-danger px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none tracking-wide text-white",
										children: [/* @__PURE__ */ J("span", {
											"aria-hidden": !0,
											className: "h-1.5 w-1.5 rounded-full bg-white"
										}), "Live"]
									}),
									C && /* @__PURE__ */ J("span", {
										"data-testid": "conversation-mention",
										"aria-label": "You were mentioned",
										title: "You were mentioned",
										className: "grid h-5 w-5 shrink-0 place-items-center rounded-full bg-danger text-[11px] font-bold leading-none text-white",
										children: "@"
									}),
									S > 0 && /* @__PURE__ */ J("span", {
										"data-testid": "conversation-unread",
										"data-muted": D ? "true" : "false",
										className: s("grid h-5 min-w-5 shrink-0 place-items-center rounded-full px-1.5 text-[11px] font-semibold leading-none", D ? w ? "bg-white/15 text-white/70" : "bg-surface-inset text-text-secondary" : "bg-primary text-white"),
										children: S > 99 ? "99+" : S
									})
								]
							}), k.length > 0 && /* @__PURE__ */ J("span", {
								className: s("absolute right-1 top-1/2 -translate-y-1/2 opacity-0 transition-opacity", "group-hover:opacity-100 group-focus-within:opacity-100", "has-[[aria-expanded=true]]:opacity-100", "[@media(hover:none)]:opacity-100"),
								children: /* @__PURE__ */ J(v, {
									trigger: /* @__PURE__ */ J("span", {
										"aria-hidden": !0,
										className: "leading-none tracking-wide",
										children: "⋯"
									}),
									triggerLabel: `More options for ${f}`,
									triggerTitle: "More options",
									triggerTabIndex: n ? 0 : -1,
									triggerTestId: O,
									triggerClassName: s("h-6 w-6 rounded-md border-0 p-0 text-[13px]", w ? "text-white/70 hover:bg-white/15" : "text-text-secondary hover:bg-surface-hover"),
									align: "end",
									sections: [{ items: k }],
									"data-testid": `${O}-panel`
								})
							})]
						}, e.channel);
					})
				}),
				e.capped && /* @__PURE__ */ J("button", {
					type: "button",
					onClick: () => F(e.label),
					"aria-expanded": e.hidden === 0,
					"data-testid": "conversation-show-more",
					className: s("mt-0.5 flex w-full cursor-pointer items-center rounded-lg px-2 py-1 text-left text-[12px] font-medium", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", w ? "text-white/60 hover:bg-white/10 hover:text-white" : "text-text-tertiary hover:bg-surface-hover hover:text-text-primary"),
					children: e.hidden > 0 ? `Show ${e.hidden} more` : "Show less"
				})
			] }, e.label))
		})]
	});
}
//#endregion
//#region src/components/social/ChatRoom.tsx
var Ce = [
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
function we(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) >>> 0;
	return Ce[t % Ce.length];
}
function Te(e) {
	let t = e.split(/[\s._@-]/);
	return t.length >= 2 ? (t[0][0] + t[1][0]).toUpperCase() : e.slice(0, 2).toUpperCase();
}
function Ee(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : new Date(e).toLocaleDateString();
}
function De(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function Oe({ post: e, isOwn: t, showSender: n }) {
	let r = we(e.authorId);
	return /* @__PURE__ */ Y("div", {
		className: s("flex items-end gap-2", t ? "flex-row-reverse" : "flex-row", n ? "pt-2 px-4 pb-0.5" : "py-px px-4"),
		children: [/* @__PURE__ */ J("div", {
			className: "w-8 shrink-0 self-end",
			children: !t && n && /* @__PURE__ */ J("div", {
				className: "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white select-none",
				style: { background: r },
				children: Te(e.authorId)
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
					children: Ee(e.createdAt)
				})
			]
		})]
	});
}
function ke({ idToken: e, roomId: t, roomName: r, onMessage: i }) {
	let { posts: a, createPost: o, loading: c, hasMore: l, loadMore: u, error: d, loadError: f } = n({
		idToken: e,
		roomId: t,
		onMessage: i
	}), [p, m] = q(""), [h, g] = q(!1), [_, v] = q(null), y = K(null), b = De(e), x = [...a].reverse(), S = a[0]?.postId;
	W(() => {
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
						return /* @__PURE__ */ J(Oe, {
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
				children: [/* @__PURE__ */ J(A, {
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
function Ae({ userId: t, displayName: n, idToken: r, rooms: i, createRoom: a, createDM: o, createGroupRoom: c, roomsLoading: l, roomsError: u, onRoomsRetry: d, handleRoomSelect: f, activeRoomId: p, onMessage: m }) {
	let [h, g] = q(!0), _ = h ? 240 : 0, [v, y] = q({}), b = K(p);
	W(() => {
		b.current = p;
	}, [p]);
	let x = H((e) => {
		y((t) => {
			if (!t[e.roomId]) return t;
			let n = { ...t };
			return delete n[e.roomId], n;
		}), f(e);
	}, [f]);
	W(() => m((e) => {
		if (e.type === "social:post") {
			let t = (e.payload ?? e).roomId;
			t && t !== b.current && y((e) => ({
				...e,
				[t]: (e[t] ?? 0) + 1
			}));
		}
	}), [m]);
	let [S, C] = q(!1), [w, T] = q(!1), { friends: E, loadError: D } = e({ idToken: r }), O = n ? n.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2) : t.slice(0, 2).toUpperCase(), k = i.find((e) => e.roomId === p) ?? null, A = i.filter((e) => e.type === "standalone" || e.type === "group"), j = i.filter((e) => e.type === "dm"), M = G(() => [...A.map((e) => ({
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
	]), N = H((e) => {
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
					}) : /* @__PURE__ */ J(Se, {
						items: M,
						activeChannel: p ?? null,
						onSelect: N,
						onNewChat: () => C((e) => !e),
						emptyLabel: "No conversations yet",
						"data-testid": "social-conversations"
					}), S && /* @__PURE__ */ J("div", {
						className: "px-1 pt-1.5",
						children: /* @__PURE__ */ J(ye, {
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
				children: k ? /* @__PURE__ */ J(ke, {
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
function je({ author: e, avatarUrl: t, mine: n = !1, messages: r, className: i }) {
	return r.length === 0 ? null : /* @__PURE__ */ J("div", {
		"data-testid": "message-group",
		"data-author": e,
		"data-row-count": r.length,
		className: s("flex flex-col", i),
		children: r.map((r, i) => /* @__PURE__ */ J(B, {
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
function Me({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = q(""), [a, o] = q(null), c = async (t) => {
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
			/* @__PURE__ */ J(A, {
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
function Ne({ onCreateDM: e, loading: t, friends: n, friendsError: r }) {
	let [i, a] = q(""), [o, c] = q(!1), [l, u] = q(null), d = async (t) => {
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
			/* @__PURE__ */ J(ee, {
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
function Pe({ room: e, isActive: t, onClick: n }) {
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
function Fe({ room: e, isActive: t, onClick: n }) {
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
function Ie({ message: e, onRetry: t, compact: n }) {
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
function Le({ idToken: t, rooms: n, createRoom: r, createDM: i, loading: a, error: o, onRetry: s, onRoomSelect: c, activeRoomId: l, compact: u }) {
	let { friends: d, loadError: f } = e({ idToken: t }), [p, m] = q(!1), h = async (e) => {
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
			p && /* @__PURE__ */ J(Me, {
				onCreate: h,
				onDiscard: () => m(!1),
				loading: a
			}),
			/* @__PURE__ */ J(Ne, {
				onCreateDM: i,
				loading: a,
				friends: d,
				friendsError: f
			}),
			/* @__PURE__ */ J("div", { children: a && n.length === 0 ? /* @__PURE__ */ J("div", {
				className: "p-2 text-text-tertiary text-xs text-center",
				children: "Loading…"
			}) : o && n.length === 0 ? /* @__PURE__ */ J(Ie, {
				message: o,
				onRetry: s,
				compact: !0
			}) : n.length === 0 ? /* @__PURE__ */ J("div", {
				className: "px-2 py-3 text-text-tertiary text-xs",
				children: "No rooms yet"
			}) : n.map((e) => /* @__PURE__ */ J(Fe, {
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
			p && /* @__PURE__ */ J(Me, {
				onCreate: h,
				onDiscard: () => m(!1),
				loading: a
			}),
			/* @__PURE__ */ J(Ne, {
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
				}) : o && n.length === 0 ? /* @__PURE__ */ J(Ie, {
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
				}) : n.map((e) => /* @__PURE__ */ J(Pe, {
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
function Re(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function ze(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function Be({ onSubmit: e, placeholder: t = "Write a reply…", loading: n }) {
	let [r, i] = q(""), [a, o] = q(null), c = async (t) => {
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
			/* @__PURE__ */ J(A, {
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
function Ve({ comment: e, currentUserId: t, loading: n, onDelete: r, onReply: i }) {
	let [a, o] = q(!1), [s, c] = q(!1), [l, u] = q(+!e._fadeIn);
	W(() => {
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
							children: Re(e.createdAt)
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
					s && /* @__PURE__ */ J(Be, {
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
function He({ idToken: e, roomId: t, postId: n, onMessage: i }) {
	let { comments: a, createComment: o, deleteComment: s, loading: c, submitting: l, error: u } = r({
		idToken: e,
		roomId: t,
		postId: n,
		onMessage: i
	}), d = ze(e), f = async (e, t) => {
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
			}) : a.map((e) => /* @__PURE__ */ J(Ve, {
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
			/* @__PURE__ */ J(Be, {
				onSubmit: (e) => o(e),
				placeholder: "Write a comment…",
				loading: l
			})
		]
	});
}
//#endregion
//#region src/components/social/PostFeed.tsx
var Ue = [
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
function Ke({ onCreate: e, loading: t }) {
	let [n, r] = q(""), [i, a] = q(null), o = async (t) => {
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
			/* @__PURE__ */ J(j, {
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
function qe({ isLiked: e, likeCount: t, whoLiked: n, toggle: r }) {
	return /* @__PURE__ */ Y(de, { children: [/* @__PURE__ */ Y("button", {
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
function Je({ reactWithEmoji: e }) {
	return /* @__PURE__ */ J("div", {
		className: "flex flex-wrap gap-0",
		children: Ue.map((t) => /* @__PURE__ */ J("button", {
			onClick: () => void e(t),
			className: "text-base bg-transparent border-none px-1 py-0.5 cursor-pointer",
			title: t,
			children: t
		}, t))
	});
}
function Ye({ post: e, idToken: t, roomId: n, currentUserId: r, onMessage: a, onEdit: o, onDelete: c }) {
	let { isLiked: l, likeCount: u, whoLiked: d, toggle: f, reactWithEmoji: p, error: m } = i({
		idToken: t,
		roomId: n,
		postId: e.postId,
		onMessage: a
	}), [h, g] = q(+!e._fadeIn), [_, v] = q(!1), [y, b] = q(!1), [x, S] = q(!1), [C, w] = q(e.content), [T, E] = q(null), D = async () => {
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
	W(() => {
		if (e._fadeIn) {
			let e = setTimeout(() => g(1), 10);
			return () => clearTimeout(e);
		}
	}, []);
	let k = e.authorId === r, A = e.authorId.slice(0, 2).toUpperCase();
	return /* @__PURE__ */ Y("div", {
		style: { opacity: h },
		className: "border-b border-surface-hover pb-4 mb-4 transition-opacity duration-200 ease-[ease]",
		children: [
			/* @__PURE__ */ Y("div", {
				className: "flex items-center gap-2 mb-2",
				children: [/* @__PURE__ */ J("div", {
					className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
					children: A
				}), /* @__PURE__ */ Y("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ J("span", {
						className: "text-base font-semibold text-text-primary",
						children: e.authorId
					}), /* @__PURE__ */ J("span", {
						className: "text-sm text-text-tertiary ml-2",
						children: We(e.createdAt)
					})]
				})]
			}),
			x ? /* @__PURE__ */ Y("div", {
				className: "mb-2",
				children: [/* @__PURE__ */ J(j, {
					value: C,
					onChange: (e) => w(e.target.value),
					rows: 3,
					className: "resize-y mb-2"
				}), /* @__PURE__ */ Y("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ J("button", {
						onClick: () => {
							D();
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
					/* @__PURE__ */ J(qe, {
						isLiked: l,
						likeCount: u,
						whoLiked: d,
						toggle: f
					}),
					/* @__PURE__ */ J(Je, { reactWithEmoji: p }),
					/* @__PURE__ */ J("button", {
						onClick: () => v((e) => !e),
						className: "bg-transparent border-none text-sm text-text-secondary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Comment"
					}),
					k && !x && /* @__PURE__ */ J("button", {
						onClick: () => S(!0),
						className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Edit"
					}),
					k && !y && !x && /* @__PURE__ */ J("button", {
						onClick: () => b(!0),
						className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Delete"
					}),
					k && y && /* @__PURE__ */ Y("div", {
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
									O();
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
			_ && /* @__PURE__ */ J(He, {
				idToken: t,
				roomId: n,
				postId: e.postId,
				onMessage: a
			})
		]
	});
}
function Xe({ idToken: e, roomId: t, onMessage: r }) {
	let { posts: i, createPost: a, editPost: o, deletePost: c, loading: l, mutating: u, error: d, loadError: f, hasMore: p, loadMore: m } = n({
		idToken: e,
		roomId: t,
		onMessage: r
	}), h = Ge(e);
	return /* @__PURE__ */ Y("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ J(Ke, {
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
			}) : i.map((n) => /* @__PURE__ */ J(Ye, {
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
function Ze({ group: e, isSelected: t, onClick: n }) {
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
function Qe({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = q(""), [a, o] = q(null), c = async (t) => {
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
			/* @__PURE__ */ J(A, {
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
function $e({ group: e, members: t, rooms: n, groupId: r, currentUserId: i, createGroupRoom: a, onRoomSelect: o, inviteUser: c, loading: l }) {
	let [u, d] = q(!1), [f, p] = q(""), [m, h] = q(null), [g, _] = q(!1), [v, y] = q(""), [b, x] = q(null), S = e.ownerId === i, C = n.filter((e) => e.groupId === r), w = async (e) => {
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
				children: [/* @__PURE__ */ J(A, {
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
					T(e);
				},
				className: "flex gap-1 mb-1.5",
				children: [/* @__PURE__ */ J(A, {
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
function et({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = q(""), [a, o] = q("public"), [c, l] = q(null), u = ue(), d = async (t) => {
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
				}), /* @__PURE__ */ J(A, {
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
function tt({ group: e, currentUserId: t, isSelected: n, onSelect: r, onDelete: i }) {
	let [a, o] = q(null), c = e.ownerId === t;
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
function nt({ groupId: e, onInvite: t }) {
	let [n, r] = q(""), [i, a] = q(null), o = async (i) => {
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
	return /* @__PURE__ */ Y(de, { children: [/* @__PURE__ */ Y("form", {
		onSubmit: (e) => {
			o(e);
		},
		className: "flex gap-2 mt-2",
		children: [/* @__PURE__ */ J(A, {
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
function rt({ members: e }) {
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
function it({ rooms: e, groupId: t, selectedGroupRole: n, createGroupRoom: r, onRoomSelect: i, loading: a }) {
	let [o, c] = q(!1), [l, u] = q(""), [d, f] = q(null), p = e.filter((e) => e.groupId === t), m = async (e) => {
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
						/* @__PURE__ */ J(A, {
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
function at({ idToken: e, rooms: n, createGroupRoom: r, onRoomSelect: i, roomsLoading: a, compact: o }) {
	let { groups: c, createGroup: l, deleteGroup: u, inviteUser: d, loadMembers: f, members: p, loading: m, loaded: h, loadError: g, refresh: _ } = t({ idToken: e }), v = !h && !g, [y, b] = q(!1), [x, S] = q(null), C = e ? (() => {
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
				y && /* @__PURE__ */ J(Qe, {
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
				}) : c.map((e) => /* @__PURE__ */ J(Ze, {
					group: e,
					isSelected: e.groupId === x,
					onClick: () => T(e.groupId)
				}, e.groupId)) }),
				e && /* @__PURE__ */ J($e, {
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
				}) : c.map((e) => /* @__PURE__ */ J(tt, {
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
					/* @__PURE__ */ J(rt, { members: p }),
					(D === "owner" || D === "admin") && /* @__PURE__ */ J(nt, {
						groupId: x,
						onInvite: d
					}),
					/* @__PURE__ */ J(it, {
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
			y && /* @__PURE__ */ J(et, {
				onCreate: w,
				onDiscard: () => b(!1),
				loading: m
			})
		]
	});
}
//#endregion
//#region src/components/social/ActivityPanel.tsx
function ot() {
	return "";
}
var st = 50;
function ct(e) {
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
function lt(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function ut(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function dt({ idToken: e, sendMessage: t, onMessage: n, connectionState: r }) {
	let [i, a] = q([]), [s, c] = q(!0), [l, u] = q(!1), [d, f] = q(null), [p, m] = q(0), h = K(t);
	W(() => {
		h.current = t;
	}, [t]);
	let { toast: g } = o(), _ = ut(e), v = H(() => m((e) => e + 1), []);
	return W(() => {
		let t = ot();
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
	]), W(() => {
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
	}, [r, _]), W(() => n((e) => {
		if (e.type !== "activity:event") return;
		let t = e.payload;
		t && a((e) => e.length > 0 && e[0].timestamp === t.timestamp && e[0].eventType === t.eventType ? e : [{
			eventType: t.eventType,
			timestamp: t.timestamp,
			detail: t.detail
		}, ...e].slice(0, st));
	}), [n]), {
		items: i,
		loading: s,
		isLive: l,
		error: d,
		retry: v
	};
}
function ft({ idToken: e, sendMessage: t, onMessage: n, connectionState: r }) {
	let { items: i, loading: a, isLive: o, error: c, retry: l } = dt({
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
			let { icon: n, text: r } = ct(e);
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
						children: lt(e.timestamp)
					})
				]
			}, t);
		}) })]
	});
}
//#endregion
//#region src/components/social/ReactionsBar.tsx
function pt({ reactions: e, onReact: t, disabled: n = !1, pickerEmojis: r = oe, addTriggerLabel: i, hideAddTrigger: a = !1, className: o }) {
	let [c, l] = q(!1), u = K(null), d = (e) => {
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
			/* @__PURE__ */ J(ae, {
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
function mt({ items: e, activeId: t, onSelect: n, className: r, "data-testid": i = "conversation-shelf" }) {
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
						className: "grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-surface-inset",
						children: /* @__PURE__ */ J("span", {
							className: "grid h-4 w-4 shrink-0 place-items-center text-text-secondary",
							children: e.icon ?? /* @__PURE__ */ J("span", { className: "h-1.5 w-1.5 rounded-full bg-current" })
						})
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
function ht({ shelf: e = [], conversations: t, selected: n = null, onSelect: r, onNewChat: i, grouped: a = !0, sectionOrder: o = "channels-first", sectionActions: c, onStartCall: u, maxVisible: d, emptyLabel: f, header: p, beforeList: m, footer: h, onTogglePin: g, onToggleMute: v, onMarkUnread: y, collapsible: b = !1, collapsed: x = !1, onToggleCollapse: S, className: C, "data-testid": w = "conversation-rail" }) {
	let T = b && x, E = n?.kind === "shelf" ? n.id : null;
	return /* @__PURE__ */ Y("aside", {
		"data-testid": w,
		className: s("flex min-h-0 shrink-0 flex-col border-r border-border bg-surface", T ? "w-14" : "w-80", b && "relative", C),
		children: [
			b && /* @__PURE__ */ J("div", {
				className: "absolute right-1 top-1 z-10",
				children: /* @__PURE__ */ J(l, {
					"aria-label": T ? "Expand the sidebar" : "Collapse the sidebar",
					title: T ? "Expand the sidebar" : "Collapse the sidebar",
					"aria-expanded": !T,
					"data-testid": `${w}-collapse`,
					size: "sm",
					onClick: () => S?.(!T),
					icon: /* @__PURE__ */ J(_, { dir: T ? "right" : "left" })
				})
			}),
			!T && p && /* @__PURE__ */ J("div", {
				className: "shrink-0",
				children: p
			}),
			!T && e.length > 0 && /* @__PURE__ */ J(mt, {
				items: e,
				activeId: E,
				onSelect: (e) => r({
					kind: "shelf",
					id: e
				}),
				className: "shrink-0 px-2 pt-2",
				"data-testid": `${w}-shelf`
			}),
			T && e.length > 0 && /* @__PURE__ */ J("ul", {
				"data-testid": `${w}-collapsed-shelf`,
				className: "m-0 flex list-none flex-col items-center gap-0.5 p-2 pt-9",
				children: e.map((e) => {
					let t = e.id === E, n = e.count ?? 0;
					return /* @__PURE__ */ J("li", { children: /* @__PURE__ */ Y("button", {
						type: "button",
						onClick: () => r({
							kind: "shelf",
							id: e.id
						}),
						title: e.label,
						"aria-label": e.label,
						"data-testid": `${w}-collapsed-shelf-${e.id}`,
						"data-active": t ? "true" : "false",
						"aria-current": t ? "true" : void 0,
						className: s("relative grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-lg", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", "hover:bg-surface-hover", t && "bg-surface-hover"),
						children: [/* @__PURE__ */ J("span", {
							"aria-hidden": !0,
							className: "grid h-4 w-4 shrink-0 place-items-center text-text-secondary",
							children: e.icon ?? /* @__PURE__ */ J("span", { className: "h-1.5 w-1.5 rounded-full bg-current" })
						}), n > 0 && /* @__PURE__ */ J("span", {
							"data-testid": `${w}-collapsed-shelf-${e.id}-count`,
							className: s("absolute -right-1 -top-1 grid h-4 min-w-4 shrink-0 place-items-center rounded-full px-1 text-[9px] font-semibold leading-none text-white", e.urgent ? "bg-danger" : "bg-primary"),
							children: n > 99 ? "99+" : n
						})]
					}) }, e.id);
				})
			}),
			!T && m && /* @__PURE__ */ J("div", {
				className: "shrink-0 px-2",
				children: m
			}),
			!T && /* @__PURE__ */ J(Se, {
				items: t,
				grouped: a,
				sectionOrder: o,
				sectionActions: c,
				onStartCall: u,
				maxVisible: d,
				activeChannel: n?.kind === "conversation" ? n.channel : null,
				onSelect: (e) => r({
					kind: "conversation",
					channel: e
				}),
				onNewChat: i,
				emptyLabel: f,
				onTogglePin: g,
				onToggleMute: v,
				onMarkUnread: y,
				className: "min-h-0 flex-1 overflow-y-auto p-2",
				"data-testid": `${w}-list`
			}),
			!T && h && /* @__PURE__ */ J("div", {
				className: "shrink-0",
				children: h
			})
		]
	});
}
//#endregion
//#region src/components/social/RunSummaryPanel.tsx
function gt(e, t) {
	return `${e}:${t}`;
}
function _t(e) {
	let t = e.indexOf(":");
	return t <= 0 || t === e.length - 1 ? null : {
		pipelineId: e.slice(0, t),
		runId: e.slice(t + 1)
	};
}
function vt(e) {
	return e === "received" || e === "running" || e === "awaiting_approval";
}
var yt = {
	received: "Received",
	running: "Running",
	awaiting_approval: "Needs approval",
	completed: "Completed",
	rejected: "Rejected",
	failed: "Failed"
}, bt = {
	received: "neutral",
	running: "info",
	awaiting_approval: "warning",
	completed: "success",
	rejected: "danger",
	failed: "danger"
}, xt = 8;
function St(e) {
	return e.kind === "link" ? e.label ?? "Open link" : e.kind === "panel" ? e.panel.title ? `Open ${e.panel.title}` : "Open result" : "Open beside the chat";
}
function Ct({ data: e, onOpenFull: t, onOpenChat: n, onOpenDocument: r, onOpenResult: i, className: a, "data-testid": o = "run-summary-panel" }) {
	let { status: l } = e, u = e.pipelineName || e.pipelineId, d = V({
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
							}), /* @__PURE__ */ J(D, {
								size: "xs",
								tone: bt[l],
								dot: l === "running" ? "pulse" : void 0,
								"data-testid": `${o}-status`,
								children: yt[l]
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
									className: s("relative mt-[5px] inline-block h-[7px] w-[7px] shrink-0 rounded-full", re[t.status] ?? re.pending)
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
							children: f.slice(0, xt).map((e, t) => /* @__PURE__ */ J("li", {
								className: "truncate",
								"data-op": e.op,
								title: e.text,
								children: ne(e)
							}, t))
						}),
						f.length > xt && /* @__PURE__ */ Y("div", {
							className: "text-[11px] text-text-tertiary",
							"data-testid": `${o}-more-ops`,
							children: [
								"+",
								f.length - xt,
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
						children: St(e.result)
					})]
				}),
				h && /* @__PURE__ */ J(F, {
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
function wt({ panel: e, api: t, options: n }) {
	let { load: r, onOpenFull: i, onOpenChat: a, onOpenDocument: o, onOpenResult: s, refreshMs: l = 2e3, "data-testid": u = "run-panel" } = n, [d, f] = q({ status: "loading" }), [p, m] = q(0), h = K(r);
	W(() => {
		h.current = r;
	}, [r]), W(() => {
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
	let g = d.status === "ready" && vt(d.data.status);
	W(() => {
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
	let _ = H(() => m((e) => e + 1), []);
	if (d.status === "loading") return /* @__PURE__ */ Y("div", {
		className: "flex flex-col gap-3 p-3",
		"data-testid": `${u}-loading`,
		"aria-busy": "true",
		children: [
			/* @__PURE__ */ J(k, {
				height: 20,
				width: "60%",
				rounded: "md"
			}),
			/* @__PURE__ */ J(k, {
				height: 14,
				width: "40%",
				rounded: "md"
			}),
			/* @__PURE__ */ J(k, { height: 96 }),
			/* @__PURE__ */ J(k, { height: 44 })
		]
	});
	if (d.status === "error") return /* @__PURE__ */ Y("div", {
		className: "flex flex-col gap-2 p-3",
		"data-testid": `${u}-error`,
		children: [/* @__PURE__ */ Y(F, {
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
	return /* @__PURE__ */ J(Ct, {
		data: v,
		onOpenFull: () => i(e, v),
		onOpenChat: a ? () => a(e, v) : void 0,
		onOpenDocument: o,
		onOpenResult: s,
		"data-testid": u
	});
}
function Tt(e) {
	return (t, n) => /* @__PURE__ */ J(wt, {
		panel: t,
		api: n,
		options: e
	});
}
//#endregion
//#region src/components/social/chatCommands.ts
var Et = /^chat:dmg?:/;
function Dt(e) {
	return e.channelKind ?? (Et.test(e.channel) ? "dm" : "room");
}
function Ot(e, t) {
	let n = e.scope ?? "always";
	if (typeof n == "function") return n(t);
	switch (n) {
		case "always": return !0;
		case "document-open": return t.sidePanel.current?.kind === "document";
		case "room": return Dt(t) === "room";
		case "dm": return Dt(t) === "dm";
		default: return !0;
	}
}
function kt(e) {
	if (e.disabledHint) return e.disabledHint;
	switch (e.scope) {
		case "document-open": return "Open a document beside the chat first";
		case "room": return "Only in rooms";
		case "dm": return "Only in direct messages";
		default: return e.hint ?? "Not available here";
	}
}
function At(e, t) {
	return e.map((e) => {
		let { run: n, scope: r, disabledHint: i, ...a } = e;
		return Ot({ scope: r }, t) ? a : {
			...a,
			disabled: !0,
			hint: kt({
				scope: r,
				disabledHint: i,
				hint: a.hint
			})
		};
	});
}
function jt(e, t) {
	let n = se(e, t);
	return n ? {
		command: n,
		argumentText: ce(e, n).trim()
	} : null;
}
var Mt = "doc", Nt = "panel", Pt = "panel.";
function Ft(e) {
	return e instanceof URLSearchParams ? new URLSearchParams(e) : new URLSearchParams(e ?? "");
}
function It(e) {
	e.delete(Mt), e.delete(Nt);
	for (let t of [...e.keys()]) t.startsWith(Pt) && e.delete(t);
}
function Lt(e, t) {
	let n = Ft(t);
	if (It(n), !e) return n;
	if (e.kind === "document") n.set(Mt, e.id);
	else {
		if (e.kind.includes(":")) throw Error(`A side panel kind cannot contain ':' (got "${e.kind}")`);
		n.set(Nt, `${e.kind}:${e.id}`);
	}
	for (let [t, r] of Object.entries(e.params ?? {})) n.set(`${Pt}${t}`, r);
	return n;
}
function Rt(e) {
	let t = Ft(e), n = {};
	for (let [e, r] of t.entries()) e.startsWith(Pt) && (n[e.slice(6)] = r);
	let r = (e) => Object.keys(n).length ? {
		...e,
		params: n
	} : e, i = t.get(Mt);
	if (i) return r({
		kind: "document",
		id: i
	});
	let a = t.get(Nt);
	if (!a) return null;
	let o = a.indexOf(":");
	return o <= 0 || o === a.length - 1 ? null : r({
		kind: a.slice(0, o),
		id: a.slice(o + 1)
	});
}
//#endregion
//#region src/components/social/ChatCommandProvider.tsx
var Z = le(null);
function zt(...e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) for (let e of n ?? []) t.set(e.trigger.toLowerCase(), e);
	return [...t.values()];
}
function Bt({ commands: e, children: t }) {
	let n = U(Z), [r, i] = q([]), a = H((e) => (i((t) => [...t, e]), () => i((t) => t.filter((t) => t !== e))), []), o = G(() => ({
		commands: zt(n?.commands, e, ...r),
		register: a
	}), [
		n?.commands,
		e,
		r,
		a
	]);
	return /* @__PURE__ */ J(Z.Provider, {
		value: o,
		children: t
	});
}
function Vt() {
	return U(Z)?.commands ?? Ht;
}
var Ht = [];
function Ut(e) {
	let t = U(Z);
	if (!t) throw Error("useRegisterChatCommands needs a <ChatCommandProvider> above it");
	let { register: n } = t;
	W(() => {
		if (!(!e || e.length === 0)) return n(e);
	}, [n, e]);
}
function Wt() {
	let e = Vt();
	return H(async (t, n) => {
		let r = jt(t, e);
		if (!r) return null;
		let { command: i, argumentText: a } = r;
		if (!Ot(i, n)) throw Error(`${i.trigger}: ${kt(i)}`);
		return i.run({
			...n,
			text: t,
			argumentText: a
		});
	}, [e]);
}
//#endregion
//#region src/components/social/ChatSidePanelRegistry.tsx
var Gt = le(null);
function Kt({ renderers: e, children: t }) {
	let n = U(Gt), r = G(() => ({
		...n ?? {},
		...e ?? {}
	}), [n, e]);
	return /* @__PURE__ */ J(Gt.Provider, {
		value: r,
		children: t
	});
}
function qt() {
	return U(Gt) ?? Jt;
}
var Jt = {};
function Yt(e) {
	return qt()[e] ?? null;
}
function Xt({ title: e, subtitle: t, onClose: n, onOpenFullPage: r, actions: i, children: a, className: o, "data-testid": u = "chat-side-panel" }) {
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
			}), /* @__PURE__ */ Y(b, {
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
function Zt(e) {
	let t = e.replace(/[-_]+/g, " ").trim();
	return t ? t[0].toUpperCase() + t.slice(1) : "Panel";
}
function Qt({ panel: e, onClose: t, onOpenFullPage: n, className: r, "data-testid": i = "chat-side-panel" }) {
	let a = Yt(e.kind), [o, s] = q(null), c = G(() => ({
		close: t,
		openFullPage: n ? () => n(e) : void 0,
		setTitle: s
	}), [
		t,
		n,
		e
	]), l = o || e.title || Zt(e.kind);
	return /* @__PURE__ */ J(Xt, {
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
		}, `${e.kind}:${e.id}`) : /* @__PURE__ */ J(O, {
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
function $t({ bubble: e, onOpen: t, onDismiss: n, dismissAfterMs: r }) {
	return W(() => {
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
			children: [/* @__PURE__ */ J(N, {
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
function en({ bubbles: e, onOpen: t, onDismiss: n, dismissAfterMs: r = 8e3, max: i = 3, className: a, "data-testid": o = "chat-bubble-stack" }) {
	let c = e.slice(-i);
	return c.length === 0 ? null : /* @__PURE__ */ J("div", {
		className: s("pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2", a),
		"data-testid": o,
		"aria-live": "polite",
		children: c.map((e) => /* @__PURE__ */ J($t, {
			bubble: e,
			dismissAfterMs: r,
			onOpen: () => t(e.id),
			onDismiss: () => n(e.id)
		}, e.id))
	});
}
//#endregion
//#region src/components/social/ConversationStart.tsx
function tn({ d: e }) {
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
var nn = "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM12 8v6M9 11h6", rn = "M4 4h16v12H8l-4 4zM9 9h6M9 12h4", an = "M22 2 11 13M22 2l-7 20-4-9-9-4z";
function on({ items: e, onPick: t, disabled: n, searchAbove: r, kind: i, testId: a }) {
	let [o, s] = q(""), c = G(() => {
		let t = o.trim().toLowerCase();
		return t ? e.filter((e) => e.label.toLowerCase().includes(t)) : e;
	}, [e, o]);
	return /* @__PURE__ */ Y(C, {
		gap: "none",
		children: [e.length > r && /* @__PURE__ */ J("div", {
			className: "px-4 pb-1 pt-2",
			children: /* @__PURE__ */ J(w, {
				value: o,
				onChange: s,
				placeholder: i === "room" ? "Find a room" : "Find a person",
				"data-testid": `${a}-search`
			})
		}), c.length === 0 ? /* @__PURE__ */ Y(I, {
			"data-testid": `${a}-none`,
			children: [
				"Nothing matches “",
				o.trim(),
				"”."
			]
		}) : c.map((e) => /* @__PURE__ */ J(L, {
			label: e.label,
			icon: e.icon ?? (i === "person" ? /* @__PURE__ */ J(N, {
				name: e.label,
				size: 20
			}) : void 0),
			onSelect: () => t(e.id),
			disabled: n,
			"data-testid": `${a}-option`
		}, e.id))]
	});
}
function sn({ title: e = "No conversation yet", body: t = "Whichever you choose, the conversation shows up here.", onStart: n, startLabel: r = "Start a conversation", startDescription: i = "A new room, named after this page", rooms: a = [], onAddToRoom: o, people: s = [], onShareWith: l, busy: u = !1, receipt: d = null, searchAbove: f = 6, "data-testid": p = "conversation-start" }) {
	return /* @__PURE__ */ Y(C, {
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
				children: /* @__PURE__ */ J(E, {
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
			/* @__PURE__ */ Y(z, {
				"data-testid": `${p}-choices`,
				children: [
					n && /* @__PURE__ */ J(R, {
						icon: /* @__PURE__ */ J(tn, { d: nn }),
						title: r,
						description: i,
						onSelect: n,
						busy: u,
						"data-testid": `${p}-start`
					}),
					o && /* @__PURE__ */ J(R, {
						icon: /* @__PURE__ */ J(tn, { d: rn }),
						title: "Add to a room",
						description: a.length === 0 ? "No rooms yet" : `${a.length} room${a.length === 1 ? "" : "s"} your team is in`,
						disabled: a.length === 0,
						disabledReason: "There are no rooms to add it to yet",
						busy: u,
						"data-testid": `${p}-rooms`,
						children: /* @__PURE__ */ J(on, {
							items: a,
							onPick: o,
							disabled: u,
							searchAbove: f,
							kind: "room",
							testId: `${p}-rooms`
						})
					}),
					l && /* @__PURE__ */ J(R, {
						icon: /* @__PURE__ */ J(tn, { d: an }),
						title: "Send to someone",
						description: s.length === 0 ? "Nobody to send to yet" : "It lands in their chat",
						disabled: s.length === 0,
						disabledReason: "There is nobody to send it to yet",
						busy: u,
						"data-testid": `${p}-people`,
						children: /* @__PURE__ */ J(on, {
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
var cn = 7, ln = 1, un = 3650, dn = [
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
], fn = {
	none: "They see what is said from now on.",
	days: "A recent stretch of the conversation.",
	all: "Everything ever said here."
};
function pn({ open: e, conversationName: t, people: n, preselectedIds: r = [], busy: i = !1, anchor: a, placement: o = "bottom-end", onAdd: c, onClose: l, "data-testid": u = "add-to-chat-dialog", historyChoice: f = !0 }) {
	let [p, m] = q(""), [h, g] = q([...r]), [_, v] = q("none"), [y, b] = q(7), [x, C] = q(!1), [E, D] = q(null);
	W(() => {
		e && (m(""), g([...r]), v("none"), b(7), C(!1), D(null));
	}, [e, r.join("\n")]);
	let O = G(() => new Map(n.map((e) => [e.id, e])), [n]), k = G(() => {
		let e = p.trim().toLowerCase();
		return n.filter((t) => !e || t.name.toLowerCase().includes(e) || (t.subtitle ?? "").toLowerCase().includes(e));
	}, [n, p]), A = (e) => g((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), j = Number.isInteger(y) && y >= 1 && y <= 3650, M = i || x, F = h.length > 0 && (!f || _ !== "days" || j) && !M, I = async () => {
		if (F) {
			C(!0), D(null);
			try {
				await c(h, f ? _ === "days" ? {
					mode: _,
					days: y
				} : { mode: _ } : { mode: "all" }), l();
			} catch (e) {
				D(e instanceof Error ? e.message : String(e)), C(!1);
			}
		}
	};
	return /* @__PURE__ */ Y(S, {
		open: e,
		anchor: a,
		placement: o,
		width: "lg",
		title: "Add people",
		subtitle: t,
		submitLabel: h.length > 1 ? `Add ${h.length}` : "Add",
		submitTestId: `${u}-add`,
		submitDisabled: !F,
		busy: M,
		error: E,
		onSubmit: () => void I(),
		onClose: l,
		"data-testid": u,
		children: [
			/* @__PURE__ */ J(w, {
				value: p,
				onChange: m,
				placeholder: "Enter a name",
				"aria-label": "Find people to add",
				className: "w-full",
				"data-testid": `${u}-search`
			}),
			h.length > 0 && /* @__PURE__ */ J("div", {
				className: "flex flex-wrap gap-1",
				"data-testid": `${u}-picked`,
				children: h.map((e) => {
					let t = O.get(e);
					return /* @__PURE__ */ Y("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-primary-bg py-0.5 pl-0.5 pr-1 text-[11px] text-primary-fg",
						"data-testid": `${u}-picked-${e}`,
						children: [
							/* @__PURE__ */ J(N, {
								name: t?.name ?? e,
								src: t?.avatarUrl,
								size: 16
							}),
							/* @__PURE__ */ J("span", {
								className: "max-w-[9rem] truncate",
								children: t?.name ?? e
							}),
							/* @__PURE__ */ J("button", {
								type: "button",
								"aria-label": `Remove ${t?.name ?? e}`,
								onClick: () => A(e),
								disabled: M,
								className: "inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border-none bg-transparent p-0 text-current hover:bg-black/10",
								"data-testid": `${u}-unpick-${e}`,
								children: /* @__PURE__ */ J(d, { size: 9 })
							})
						]
					}, e);
				})
			}),
			/* @__PURE__ */ Y("ul", {
				role: "listbox",
				"aria-label": "People",
				"aria-multiselectable": "true",
				className: "m-0 max-h-44 list-none overflow-y-auto rounded-md border border-border p-0",
				"data-testid": `${u}-people`,
				children: [k.length === 0 && /* @__PURE__ */ J("li", {
					className: "px-2.5 py-2 text-[11px] text-text-tertiary",
					"data-testid": `${u}-nobody`,
					children: n.length === 0 ? "Everyone is already here." : "Nobody by that name."
				}), k.map((e) => {
					let t = h.includes(e.id);
					return /* @__PURE__ */ J("li", {
						role: "option",
						"aria-selected": t,
						children: /* @__PURE__ */ Y("button", {
							type: "button",
							onClick: () => A(e.id),
							disabled: M,
							className: s("flex w-full items-center gap-2 border-none bg-transparent px-2.5 py-1.5 text-left font-[inherit] text-[13px] hover:bg-surface-hover", t && "bg-surface-inset"),
							"data-testid": `${u}-person-${e.id}`,
							children: [
								/* @__PURE__ */ J(N, {
									name: e.name,
									src: e.avatarUrl,
									size: 22
								}),
								/* @__PURE__ */ Y("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ J("span", {
										className: "block truncate leading-tight text-text-primary",
										children: e.name
									}), e.subtitle && /* @__PURE__ */ J("span", {
										className: "block truncate text-[11px] leading-tight text-text-tertiary",
										children: e.subtitle
									})]
								}),
								/* @__PURE__ */ J("span", {
									className: s("text-[11px]", t ? "text-primary" : "text-transparent"),
									"aria-hidden": "true",
									children: "✓"
								})
							]
						})
					}, e.id);
				})]
			}),
			f && /* @__PURE__ */ J(T, {
				label: "Chat history",
				hint: _ === "days" ? void 0 : fn[_],
				"data-testid": `${u}-history-field`,
				children: /* @__PURE__ */ J(P, {
					size: "sm",
					fullWidth: !0,
					disabled: M,
					"aria-label": "How much chat history they get",
					options: dn,
					value: _,
					onChange: (e) => v(e),
					"data-testid": `${u}-history`
				})
			}),
			f && _ === "days" && /* @__PURE__ */ Y("div", {
				className: "flex items-center gap-2 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ J("span", { children: "The past" }),
					/* @__PURE__ */ J("input", {
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
					/* @__PURE__ */ J("span", { children: "days" }),
					!j && /* @__PURE__ */ Y("span", {
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
function mn(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `Added ${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})}`;
}
function hn({ members: e, open: t = !1, canManage: n = !1, currentUserId: r, onAdd: i, onRemove: a, className: o, "data-testid": u = "members-panel" }) {
	let f = [...e].sort((e, t) => e.role === t.role ? e.name.localeCompare(t.name) : e.role === "owner" ? -1 : 1);
	return /* @__PURE__ */ Y("div", {
		className: s("flex min-h-0 flex-col", o),
		"data-testid": u,
		"data-open": String(t),
		children: [/* @__PURE__ */ Y("div", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-2",
			children: [/* @__PURE__ */ J("span", {
				className: "text-xs text-text-tertiary",
				"data-testid": `${u}-count`,
				children: t ? "Open channel" : `${e.length} ${e.length === 1 ? "member" : "members"}`
			}), i && /* @__PURE__ */ J(c, {
				variant: "secondary",
				size: "sm",
				onClick: (e) => i(e.currentTarget),
				"data-testid": `${u}-add`,
				children: /* @__PURE__ */ Y("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ J(p, { size: 12 }), " Add people"]
				})
			})]
		}), t && e.length === 0 ? /* @__PURE__ */ J(O, {
			size: "sm",
			title: "Everyone can read this channel.",
			body: "Add people to make it members-only.",
			...i ? {
				actionLabel: "Add people",
				onAction: () => i()
			} : {},
			testId: `${u}-empty`
		}) : /* @__PURE__ */ J("ul", {
			className: "m-0 min-h-0 flex-1 list-none overflow-y-auto p-0",
			"data-testid": `${u}-list`,
			children: f.map((e) => {
				let t = e.id === r, i = !!a && (n || t);
				return /* @__PURE__ */ Y("li", {
					className: "flex items-center gap-2 px-3 py-2",
					"data-testid": `${u}-member-${e.id}`,
					children: [
						/* @__PURE__ */ J(N, {
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
								children: mn(e.addedAt)
							})]
						}),
						e.role === "owner" && /* @__PURE__ */ J(D, {
							tone: "neutral",
							size: "xs",
							"data-testid": `${u}-owner-${e.id}`,
							children: "Owner"
						}),
						i && /* @__PURE__ */ J(l, {
							"aria-label": t ? "Leave" : `Remove ${e.name}`,
							title: t ? "Leave" : "Remove",
							variant: "ghost",
							size: "sm",
							onClick: () => a?.(e.id),
							icon: /* @__PURE__ */ J(d, { size: 12 }),
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
var gn = 40, _n = {
	online: "online",
	busy: "busy",
	away: "away"
}, Q = "flex w-full min-w-0 flex-col items-center gap-1 rounded-lg p-1 text-center", vn = "cursor-pointer border-0 bg-transparent hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1";
function yn(e) {
	let t = e.trim();
	return t ? t.split(/\s+/)[0] : e;
}
function bn(e) {
	let t = e.status ?? "online", n = [e.displayName, _n[t]];
	return e.activity && n.push(e.activity), e.inCall && n.push("in a call"), n.join(", ");
}
function xn({ person: e, testId: t }) {
	let n = e.status ?? "online";
	return /* @__PURE__ */ Y("span", {
		className: "relative inline-flex shrink-0",
		children: [
			/* @__PURE__ */ J(N, {
				name: e.displayName,
				src: e.avatarUrl,
				size: gn,
				className: s(e.inCall && "ring-2 ring-primary ring-offset-2 ring-offset-[var(--color-surface)]")
			}),
			/* @__PURE__ */ J(x, {
				state: n,
				className: "absolute -bottom-0.5 -right-0.5 rounded-full ring-2 ring-[var(--color-surface)]"
			}),
			e.activity && /* @__PURE__ */ J("span", {
				"aria-hidden": "true",
				"data-testid": `${t}-activity-glyph`,
				className: "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-surface-emphasis text-text-secondary ring-2 ring-[var(--color-surface)]",
				children: /* @__PURE__ */ J(g, { size: 9 })
			})
		]
	});
}
function Sn({ people: e, maxVisible: t = 8, onSelectPerson: n, onShowAll: r, emptyLabel: i = "Nobody is around right now.", className: a, "data-testid": o = "active-people-grid" }) {
	if (e.length === 0) return /* @__PURE__ */ J("p", {
		"data-testid": `${o}-empty`,
		className: s("text-[12px] text-text-tertiary", a),
		children: i
	});
	let c = e.slice(0, t), l = e.length - c.length;
	return /* @__PURE__ */ Y("div", {
		"data-testid": o,
		role: "list",
		"aria-label": "Active now",
		className: s("grid grid-cols-4 gap-x-1 gap-y-2", a),
		children: [c.map((e) => {
			let t = `${o}-person-${e.userId}`, r = bn(e), i = /* @__PURE__ */ Y("span", {
				className: "flex w-full min-w-0 items-center justify-center gap-1",
				children: [e.inCall && /* @__PURE__ */ J("span", {
					"aria-hidden": "true",
					"data-testid": `${t}-live`,
					className: "h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
				}), /* @__PURE__ */ J("span", {
					className: "min-w-0 truncate text-[11px] font-medium text-text-primary",
					children: yn(e.displayName)
				})]
			});
			return n ? /* @__PURE__ */ Y("button", {
				type: "button",
				role: "listitem",
				onClick: () => n(e.userId),
				title: r,
				"aria-label": r,
				"data-testid": t,
				className: s(Q, vn),
				children: [/* @__PURE__ */ J(xn, {
					person: e,
					testId: t
				}), i]
			}, e.userId) : /* @__PURE__ */ Y("div", {
				role: "listitem",
				title: r,
				"aria-label": r,
				"data-testid": t,
				className: Q,
				children: [/* @__PURE__ */ J(xn, {
					person: e,
					testId: t
				}), i]
			}, e.userId);
		}), l > 0 && (r ? /* @__PURE__ */ Y("button", {
			type: "button",
			onClick: r,
			"aria-label": `${l} more people`,
			"data-testid": `${o}-more`,
			className: s(Q, vn),
			children: [/* @__PURE__ */ Y("span", {
				className: "flex h-10 w-10 items-center justify-center rounded-full bg-surface-emphasis text-[12px] font-semibold text-text-secondary",
				children: ["+", l]
			}), /* @__PURE__ */ J("span", {
				className: "w-full min-w-0 truncate text-[11px] font-medium text-text-tertiary",
				children: "More"
			})]
		}) : /* @__PURE__ */ Y("div", {
			"data-testid": `${o}-more`,
			className: Q,
			children: [/* @__PURE__ */ Y("span", {
				className: "flex h-10 w-10 items-center justify-center rounded-full bg-surface-emphasis text-[12px] font-semibold text-text-secondary",
				children: ["+", l]
			}), /* @__PURE__ */ J("span", {
				className: "w-full min-w-0 truncate text-[11px] font-medium text-text-tertiary",
				children: "More"
			})]
		}))]
	});
}
//#endregion
//#region src/components/social/TeamChannelTree.tsx
function Cn(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
}
function $(e) {
	return [...e].sort((e, t) => Number(!!t.pinned) - Number(!!e.pinned));
}
function wn({ teams: e, activeChannel: t = null, onSelectChannel: n, onToggleTeam: r, onCreateChannel: i, onManageTeam: a, onLeaveTeam: o, onTogglePinTeam: c, onTogglePinChannel: l, onCreateTeam: u, heading: d = "Teams", className: h, "data-testid": g = "team-channel-tree" }) {
	let y = r !== void 0, [b, x] = q(() => new Set(e.filter((e) => e.expanded).map((e) => e.teamId))), S = K(null), [C, w] = q(null), T = (e) => y ? !!e.expanded : b.has(e.teamId), E = (e, t) => {
		r?.(e, t), !y && x((n) => {
			if (n.has(e) === t) return n;
			let r = new Set(n);
			return t ? r.add(e) : r.delete(e), r;
		});
	}, D = (t) => {
		let n = e.find((e) => e.teamId === t);
		n && E(t, !T(n));
	}, O = $(e), k = [];
	for (let e of O) if (k.push({
		id: `team:${e.teamId}`,
		kind: "team",
		teamId: e.teamId
	}), T(e)) for (let t of $(e.channels)) k.push({
		id: `channel:${t.channel}`,
		kind: "channel",
		teamId: e.teamId,
		channel: t.channel
	});
	let A = C && k.some((e) => e.id === C) ? C : t && k.some((e) => e.kind === "channel" && e.channel === t) ? `channel:${t}` : k[0]?.id ?? null, j = (e) => {
		e && (w(e), S.current?.querySelector(`[data-row-id="${Cn(e)}"]`)?.focus());
	};
	return /* @__PURE__ */ Y("div", {
		className: s("flex flex-col", h),
		children: [d !== !1 && /* @__PURE__ */ J(be, {
			label: d,
			presentational: !1,
			className: "pt-2",
			actions: u ? [{
				label: "Create a team",
				onClick: (e) => u(e),
				"data-testid": `${g}-create-team`
			}] : [],
			"data-testid": `${g}-heading`
		}), /* @__PURE__ */ J("div", {
			ref: S,
			role: "tree",
			"aria-label": d === !1 ? "Teams" : void 0,
			"aria-labelledby": void 0,
			className: "flex flex-col gap-0.5",
			"data-testid": g,
			onKeyDown: (t) => {
				let r = t.target.closest("[role=\"treeitem\"]")?.dataset.rowId;
				if (!r) return;
				let i = k.findIndex((e) => e.id === r);
				if (i < 0) return;
				let a = k[i], o = e.find((e) => e.teamId === a.teamId);
				if (o) switch (t.key) {
					case "ArrowDown":
						t.preventDefault(), j(k[Math.min(i + 1, k.length - 1)]?.id ?? null);
						return;
					case "ArrowUp":
						t.preventDefault(), j(k[Math.max(i - 1, 0)]?.id ?? null);
						return;
					case "Home":
						t.preventDefault(), j(k[0]?.id ?? null);
						return;
					case "End":
						t.preventDefault(), j(k[k.length - 1]?.id ?? null);
						return;
					case "ArrowRight":
						if (t.preventDefault(), a.kind === "team") {
							if (!T(o)) E(o.teamId, !0);
							else {
								let e = k[i + 1];
								e && e.kind === "channel" && e.teamId === o.teamId && j(e.id);
							}
						}
						return;
					case "ArrowLeft":
						t.preventDefault(), a.kind === "team" ? T(o) && E(o.teamId, !1) : (E(a.teamId, !1), j(`team:${a.teamId}`));
						return;
					case "Enter":
					case " ":
						t.preventDefault(), a.kind === "team" ? D(a.teamId) : n(a.channel);
						return;
				}
			},
			children: O.map((e) => {
				let r = T(e), u = `team:${e.teamId}`, d = A === u, h = [];
				return a && h.push({
					label: "Manage team",
					onSelect: () => a(e.teamId),
					"data-testid": `${g}-team-${e.teamId}-menu-manage`
				}), c && h.push({
					label: e.pinned ? "Unpin" : "Pin",
					icon: /* @__PURE__ */ J(m, { size: 14 }),
					onSelect: () => c(e.teamId, !e.pinned),
					"data-testid": `${g}-team-${e.teamId}-menu-pin`
				}), o && h.push({
					label: "Leave team",
					onSelect: () => o(e.teamId),
					"data-testid": `${g}-team-${e.teamId}-menu-leave`
				}), /* @__PURE__ */ Y("div", { children: [/* @__PURE__ */ Y("div", {
					role: "treeitem",
					"aria-expanded": r,
					"aria-level": 1,
					tabIndex: d ? 0 : -1,
					"data-row-id": u,
					"data-testid": `${g}-team-${e.teamId}`,
					onClick: () => D(e.teamId),
					onFocus: () => w(u),
					className: s("group flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left", "hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"),
					children: [
						/* @__PURE__ */ J(_, {
							dir: r ? "down" : "right",
							size: 14,
							className: "shrink-0 text-text-tertiary transition-transform"
						}),
						/* @__PURE__ */ J(N, {
							name: e.name,
							src: e.avatarUrl,
							size: 22
						}),
						/* @__PURE__ */ J("span", {
							className: "min-w-0 flex-1 truncate text-[13px] font-semibold text-text-primary",
							children: e.name
						}),
						e.pinned && /* @__PURE__ */ J("span", {
							"data-testid": `${g}-team-${e.teamId}-pinned`,
							title: "Pinned",
							className: "shrink-0 text-text-tertiary",
							children: /* @__PURE__ */ J(m, { size: 12 })
						}),
						i && /* @__PURE__ */ J("button", {
							type: "button",
							title: `Create a channel in ${e.name}`,
							"aria-label": `Create a channel in ${e.name}`,
							tabIndex: d ? 0 : -1,
							onClick: (t) => {
								t.stopPropagation(), i(e.teamId, t.currentTarget);
							},
							"data-testid": `${g}-team-${e.teamId}-add-channel`,
							className: s("grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-md border-none bg-transparent p-0", "text-text-secondary hover:bg-surface-hover hover:text-text-primary", "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", "[@media(hover:none)]:opacity-100", "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: /* @__PURE__ */ J(p, { size: 14 })
						}),
						h.length > 0 && /* @__PURE__ */ J("span", {
							onClick: (e) => e.stopPropagation(),
							className: s("shrink-0 opacity-0 transition-opacity", "group-hover:opacity-100 group-focus-within:opacity-100", "has-[[aria-expanded=true]]:opacity-100", "[@media(hover:none)]:opacity-100"),
							children: /* @__PURE__ */ J(v, {
								trigger: /* @__PURE__ */ J("span", {
									"aria-hidden": !0,
									className: "leading-none tracking-wide",
									children: "⋯"
								}),
								triggerLabel: `More options for ${e.name}`,
								triggerTitle: "More options",
								triggerTabIndex: d ? 0 : -1,
								triggerTestId: `${g}-team-${e.teamId}-menu`,
								triggerClassName: "h-6 w-6 rounded-md border-0 p-0 text-[13px] text-text-secondary hover:bg-surface-hover",
								align: "end",
								sections: [{ items: h }],
								"data-testid": `${g}-team-${e.teamId}-menu-panel`
							})
						})
					]
				}), r && $(e.channels).map((e) => {
					let r = `channel:${e.channel}`, i = A === r, a = e.channel === t, o = e.unreadCount ?? 0, c = !!e.muted;
					return /* @__PURE__ */ Y("div", {
						role: "treeitem",
						"aria-level": 2,
						"aria-selected": a,
						tabIndex: i ? 0 : -1,
						"data-row-id": r,
						"data-testid": `${g}-channel-${e.channel}`,
						"data-active": a ? "true" : "false",
						onClick: () => n(e.channel),
						onFocus: () => w(r),
						className: s("group flex w-full cursor-pointer items-center gap-2 rounded-md py-1.5 pl-8 pr-2 text-left text-[13px]", "hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", a && "bg-surface-hover"),
						children: [
							/* @__PURE__ */ J("span", {
								"aria-hidden": !e.private,
								className: "flex h-4 w-4 shrink-0 items-center justify-center text-text-tertiary",
								children: e.private ? /* @__PURE__ */ J(f, { size: 12 }) : "#"
							}),
							/* @__PURE__ */ J("span", {
								className: s("min-w-0 flex-1 truncate", o > 0 ? "font-semibold" : "font-medium", "text-text-primary"),
								children: e.name
							}),
							e.pinned && /* @__PURE__ */ J("span", {
								"data-testid": `${g}-channel-${e.channel}-pinned`,
								title: "Pinned",
								className: "shrink-0 text-text-tertiary",
								children: /* @__PURE__ */ J(m, { size: 12 })
							}),
							e.mentioned && /* @__PURE__ */ J("span", {
								"data-testid": `${g}-channel-${e.channel}-mention`,
								"aria-label": "You were mentioned",
								title: "You were mentioned",
								className: "grid h-4 w-4 shrink-0 place-items-center rounded-full bg-danger text-[10px] font-bold leading-none text-white",
								children: "@"
							}),
							e.live && /* @__PURE__ */ J("span", {
								"data-testid": `${g}-channel-${e.channel}-live`,
								"aria-label": "Call in progress",
								title: "Call in progress",
								className: "inline-flex shrink-0 items-center gap-1 rounded-full bg-danger px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none tracking-wide text-white",
								children: "Live"
							}),
							o > 0 && /* @__PURE__ */ J("span", {
								"data-testid": `${g}-channel-${e.channel}-unread`,
								"data-muted": c ? "true" : "false",
								className: s("grid h-5 min-w-5 shrink-0 place-items-center rounded-full px-1.5 text-[11px] font-semibold leading-none", c ? "bg-surface-inset text-text-secondary" : "bg-primary text-white"),
								children: o > 99 ? "99+" : o
							}),
							l && /* @__PURE__ */ J("button", {
								type: "button",
								title: e.pinned ? "Unpin" : "Pin",
								"aria-label": `${e.pinned ? "Unpin" : "Pin"} ${e.name}`,
								tabIndex: i ? 0 : -1,
								onClick: (t) => {
									t.stopPropagation(), l(e.channel, !e.pinned);
								},
								"data-testid": `${g}-channel-${e.channel}-pin-toggle`,
								className: s("grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-md border-none bg-transparent p-0", "text-text-secondary hover:bg-surface-hover hover:text-text-primary", "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", "[@media(hover:none)]:opacity-100", "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
								children: /* @__PURE__ */ J(m, { size: 12 })
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
var Tn = 80, En = [{
	label: "Standard",
	value: "standard"
}, {
	label: "Private",
	value: "private",
	icon: /* @__PURE__ */ J(f, { size: 12 })
}];
function Dn({ open: e, teamName: t, busy: n = !1, anchor: r, placement: i = "right", onCreate: a, onClose: o, "data-testid": s = "create-channel-dialog" }) {
	let [c, l] = q(""), [u, d] = q(""), [f, p] = q("standard"), [m, h] = q(!1), [g, _] = q(null);
	W(() => {
		e && (l(""), d(""), p("standard"), h(!1), _(null));
	}, [e]);
	let v = c.trim(), y = n || m, b = v.length > 0 && v.length <= Tn && !y, x = async () => {
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
	return /* @__PURE__ */ Y(S, {
		open: e,
		anchor: r,
		placement: i,
		icon: /* @__PURE__ */ J("span", {
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
			/* @__PURE__ */ J(T, {
				label: "Name",
				"data-testid": `${s}-name-field`,
				children: /* @__PURE__ */ J(A, {
					size: "sm",
					value: c,
					maxLength: Tn,
					disabled: y,
					placeholder: "e.g. design-reviews",
					onChange: (e) => l(e.target.value),
					"data-testid": `${s}-name`
				})
			}),
			/* @__PURE__ */ J(T, {
				label: "Description",
				"data-testid": `${s}-description-field`,
				children: /* @__PURE__ */ J(j, {
					value: u,
					rows: 2,
					disabled: y,
					placeholder: "What is this channel for?",
					onChange: (e) => d(e.target.value),
					"data-testid": `${s}-description`
				})
			}),
			/* @__PURE__ */ J(T, {
				label: "Privacy",
				hint: f === "private" ? "Only people you add can see it." : "Everyone on the team can see it.",
				"data-testid": `${s}-privacy-field`,
				children: /* @__PURE__ */ J(P, {
					size: "sm",
					fullWidth: !0,
					disabled: y,
					"aria-label": "Channel privacy",
					options: En,
					value: f,
					onChange: (e) => p(e),
					"data-testid": `${s}-privacy`
				})
			})
		]
	});
}
//#endregion
//#region src/components/social/CreateTeamDialog.tsx
var On = 80, kn = [{
	label: "Org-wide",
	value: "org"
}, {
	label: "Private",
	value: "private",
	icon: /* @__PURE__ */ J(f, { size: 12 })
}];
function An({ open: e, busy: t = !1, anchor: n, placement: r = "bottom-end", onCreate: i, onClose: a, "data-testid": o = "create-team-dialog" }) {
	let [s, c] = q(""), [l, u] = q(""), [d, f] = q("org"), [p, m] = q(!1), [h, g] = q(null);
	W(() => {
		e && (c(""), u(""), f("org"), m(!1), g(null));
	}, [e]);
	let _ = s.trim(), v = t || p, y = _.length > 0 && _.length <= On && !v, b = async () => {
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
	return /* @__PURE__ */ Y(S, {
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
			/* @__PURE__ */ J(T, {
				label: "Name",
				"data-testid": `${o}-name-field`,
				children: /* @__PURE__ */ J(A, {
					size: "sm",
					value: s,
					maxLength: On,
					disabled: v,
					placeholder: "e.g. Design",
					onChange: (e) => c(e.target.value),
					"data-testid": `${o}-name`
				})
			}),
			/* @__PURE__ */ J(T, {
				label: "Description",
				"data-testid": `${o}-description-field`,
				children: /* @__PURE__ */ J(j, {
					value: l,
					rows: 2,
					disabled: v,
					placeholder: "What does this team work on?",
					onChange: (e) => u(e.target.value),
					"data-testid": `${o}-description`
				})
			}),
			/* @__PURE__ */ J(T, {
				label: "Who can join",
				hint: d === "private" ? "People need an invitation." : "Anyone in the org can join.",
				"data-testid": `${o}-visibility-field`,
				children: /* @__PURE__ */ J(P, {
					size: "sm",
					fullWidth: !0,
					disabled: v,
					"aria-label": "Team visibility",
					options: kn,
					value: d,
					onChange: (e) => f(e),
					"data-testid": `${o}-visibility`
				})
			})
		]
	});
}
//#endregion
export { wt as A, at as B, Dt as C, jt as D, Ot as E, gt as F, Ae as G, He as H, ht as I, be as J, ke as K, mt as L, Tt as M, vt as N, Rt as O, _t as P, pt as R, Wt as S, At as T, Le as U, Xe as V, je as W, ve as X, ye as Y, _e as Z, qt as _, hn as a, Vt as b, un as c, en as d, Qt as f, Yt as g, Zt as h, Sn as i, Ct as j, Lt as k, ln as l, Kt as m, Dn as n, pn as o, Xt as p, Se as q, wn as r, cn as s, An as t, sn as u, Bt as v, kt as w, Ut as x, zt as y, ft as z };
