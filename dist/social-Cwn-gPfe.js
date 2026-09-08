import { a as e, i as t, n, o as r, r as i, t as a } from "./useSocialProfile-5S1qyvsv.js";
import { n as o } from "./ToastProvider-BKjV21G4.js";
import { t as s } from "./cn-DhjIN-s0.js";
import { t as c } from "./Input-DLknWXri.js";
import { t as l } from "./Textarea-Dz4doxTv.js";
import { n as u, t as d } from "./Avatar-BzicCOft.js";
import { t as f } from "./PresenceDot-3gBZGPvX.js";
import { t as p } from "./Select-CqVokE2v.js";
import { A as m, j as h } from "./ConversationSurface-CZGBp_Gz.js";
import { t as g } from "./rovingFocus-Bj5Y6kwY.js";
import { n as _, t as v } from "./ReactionPickerPopover-CcL-n6gt.js";
import "./LinkDialog-DazAeDjI.js";
import { useCallback as y, useEffect as b, useId as x, useMemo as S, useRef as C, useState as w } from "react";
import { Fragment as T, jsx as E, jsxs as D } from "react/jsx-runtime";
//#region src/components/social/SocialPanel.tsx
function O(e, t) {
	return {
		id: e.userId,
		displayName: e.displayName,
		bio: "",
		avatarUrl: e.avatarUrl ?? null,
		visibility: e.visibility,
		followState: t
	};
}
function k(e) {
	return {
		id: e.userId,
		displayName: e.displayName,
		bio: e.bio ?? "",
		avatarUrl: e.avatarUrl ?? null,
		visibility: e.visibility
	};
}
function A({ user: e, size: t }) {
	let n = e.displayName.slice(0, 2).toUpperCase();
	return e.avatarUrl ? /* @__PURE__ */ E("div", {
		className: s("rounded-full bg-border flex items-center justify-center font-semibold text-text-primary shrink-0 overflow-hidden", t === 48 ? "w-12 h-12 text-base" : "w-8 h-8 text-xs"),
		children: /* @__PURE__ */ E("img", {
			src: e.avatarUrl,
			alt: `${e.displayName}'s avatar`,
			className: "w-full h-full object-cover"
		})
	}) : /* @__PURE__ */ E("div", {
		className: s("rounded-full bg-border flex items-center justify-center font-semibold text-text-primary shrink-0 overflow-hidden", t === 48 ? "w-12 h-12 text-base" : "w-8 h-8 text-xs"),
		"aria-label": `Avatar placeholder for ${e.displayName}`,
		children: n
	});
}
function j({ targetUser: e, followState: t, compact: n = !1, onFollowChange: r }) {
	let [i, a] = w(!1);
	return t === "not-following" ? /* @__PURE__ */ E("button", {
		className: s("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border-none font-[system-ui,-apple-system,sans-serif] bg-primary text-white font-semibold", n ? "h-7" : "h-9"),
		onClick: () => {
			r(e.id, "pending");
		},
		"aria-label": `Follow ${e.displayName}`,
		children: "Follow"
	}) : t === "pending" ? /* @__PURE__ */ E("button", {
		className: s("rounded-lg text-sm min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface-hover text-text-secondary font-normal cursor-default", n ? "h-7" : "h-9"),
		disabled: !0,
		"aria-label": `Follow ${e.displayName}`,
		children: "Following…"
	}) : /* @__PURE__ */ D("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ E("button", {
			className: s("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface text-text-primary font-normal", n ? "h-7" : "h-9"),
			onClick: () => a(!0),
			"aria-label": `Unfollow ${e.displayName}`,
			children: "Following"
		}), i && /* @__PURE__ */ D("div", {
			role: "group",
			"aria-label": "Confirm unfollow",
			className: "flex gap-2 items-center",
			children: [
				/* @__PURE__ */ D("span", {
					className: "text-sm text-text-primary mr-1",
					children: [
						"Unfollow ",
						e.displayName,
						"?"
					]
				}),
				/* @__PURE__ */ E("button", {
					onClick: () => a(!1),
					className: "h-9 rounded-lg text-sm px-3 bg-surface text-text-primary border border-border cursor-pointer font-[system-ui,-apple-system,sans-serif]",
					children: "Keep Following"
				}),
				/* @__PURE__ */ E("button", {
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
function M({ user: e, isOwnProfile: t, onSave: n }) {
	let [r, i] = w(!1), [a, o] = w(e.displayName), [u, d] = w(e.bio), [f, p] = w(e.avatarUrl ?? ""), [m, h] = w(e.visibility), [_, v] = w(!1), [y, S] = w(null), C = x();
	b(() => {
		o(e.displayName), d(e.bio), p(e.avatarUrl ?? ""), h(e.visibility);
	}, [e.id]);
	let T = async () => {
		v(!0), S(null);
		try {
			await n({
				displayName: a,
				bio: u,
				avatarUrl: f || void 0,
				visibility: m
			}), i(!1);
		} catch (e) {
			S(e instanceof Error ? e.message : "Failed to save profile");
		} finally {
			v(!1);
		}
	};
	return r ? /* @__PURE__ */ D("div", { children: [
		/* @__PURE__ */ D("div", {
			className: "mb-3",
			children: [/* @__PURE__ */ E("label", {
				htmlFor: `${C}-display-name`,
				className: "text-sm text-text-primary block mb-1",
				children: "Display name"
			}), /* @__PURE__ */ E(c, {
				id: `${C}-display-name`,
				value: a,
				onChange: (e) => o(e.target.value.slice(0, 50)),
				placeholder: "Your name",
				maxLength: 50
			})]
		}),
		/* @__PURE__ */ D("div", {
			className: "mb-3",
			children: [/* @__PURE__ */ E("label", {
				htmlFor: `${C}-bio`,
				className: "text-sm text-text-primary block mb-1",
				children: "Bio"
			}), /* @__PURE__ */ E(l, {
				id: `${C}-bio`,
				value: u,
				onChange: (e) => d(e.target.value.slice(0, 160)),
				placeholder: "Tell people a bit about yourself (max 160 characters)",
				maxLength: 160,
				rows: 3,
				className: "resize-y"
			})]
		}),
		/* @__PURE__ */ D("div", {
			className: "mb-4",
			children: [/* @__PURE__ */ E("label", {
				htmlFor: `${C}-avatar-url`,
				className: "text-sm text-text-primary block mb-1",
				children: "Avatar URL"
			}), /* @__PURE__ */ E(c, {
				id: `${C}-avatar-url`,
				value: f,
				onChange: (e) => p(e.target.value),
				placeholder: "https://example.com/avatar.png"
			})]
		}),
		/* @__PURE__ */ E("div", {
			className: "mb-4",
			children: /* @__PURE__ */ E("div", {
				role: "radiogroup",
				"aria-label": "Profile visibility",
				onKeyDown: (e) => g(e, { itemSelector: "[role=\"radio\"]" }),
				className: "flex gap-2",
				children: ["public", "private"].map((e) => /* @__PURE__ */ E("button", {
					type: "button",
					role: "radio",
					"aria-checked": m === e,
					tabIndex: m === e ? 0 : -1,
					onClick: () => h(e),
					className: s("px-4 py-1 rounded-full text-sm cursor-pointer border border-border font-[system-ui,-apple-system,sans-serif]", m === e ? "bg-primary text-white" : "bg-surface text-text-primary"),
					children: e.charAt(0).toUpperCase() + e.slice(1)
				}, e))
			})
		}),
		/* @__PURE__ */ D("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ E("button", {
				onClick: () => {
					T();
				},
				disabled: _,
				className: s("flex-1 h-9 bg-primary text-white border-none rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", _ ? "cursor-default" : "cursor-pointer"),
				children: _ ? "Saving…" : "Save Changes"
			}), /* @__PURE__ */ E("button", {
				onClick: () => i(!1),
				className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Discard Changes"
			})]
		}),
		y && /* @__PURE__ */ E("div", {
			role: "alert",
			"data-testid": "profile-save-error",
			className: "text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
			children: y
		})
	] }) : /* @__PURE__ */ D("div", { children: [
		/* @__PURE__ */ D("div", {
			className: "flex items-start gap-3 mb-3",
			children: [/* @__PURE__ */ E(A, {
				user: e,
				size: 48
			}), /* @__PURE__ */ D("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ D("div", {
					className: "flex items-center gap-2 mb-1",
					children: [/* @__PURE__ */ E("span", {
						className: "text-xl font-semibold text-text-primary",
						children: e.displayName
					}), /* @__PURE__ */ E("span", {
						className: s("text-xs px-2 py-0.5 rounded", e.visibility === "public" ? "bg-success-bg text-success" : "bg-surface-hover text-text-secondary"),
						children: e.visibility === "public" ? "Public" : "Private"
					})]
				}), /* @__PURE__ */ E("p", {
					className: "text-base text-text-primary m-0 overflow-hidden line-clamp-3",
					children: e.bio
				})]
			})]
		}),
		/* @__PURE__ */ D("div", {
			className: "flex gap-4 text-sm text-text-secondary mb-3",
			children: [
				/* @__PURE__ */ D("span", { children: [/* @__PURE__ */ E("strong", {
					className: "text-text-primary",
					children: e.followersCount ?? "—"
				}), " Followers"] }),
				/* @__PURE__ */ D("span", { children: [/* @__PURE__ */ E("strong", {
					className: "text-text-primary",
					children: e.followingCount ?? "—"
				}), " Following"] }),
				/* @__PURE__ */ D("span", { children: [/* @__PURE__ */ E("strong", {
					className: "text-text-primary",
					children: e.friendsCount ?? "—"
				}), " Friends"] })
			]
		}),
		t && /* @__PURE__ */ E("button", {
			onClick: () => i(!0),
			className: "text-sm text-primary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
			children: "Edit profile"
		})
	] });
}
function N({ followers: e, following: t, friends: n, followStates: r, onFollowChange: i, loadError: a }) {
	let [o, c] = w("followers"), l = (e) => a ? "" : ` (${e.length})`, u = [
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
	return /* @__PURE__ */ D("div", {
		className: "mt-4",
		children: [/* @__PURE__ */ E("div", {
			role: "tablist",
			"aria-label": "Connections",
			onKeyDown: g,
			className: "flex border-b border-border mb-3",
			children: u.map((e) => /* @__PURE__ */ E("button", {
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
		}), /* @__PURE__ */ E("div", {
			role: "tabpanel",
			id: "social-tabpanel",
			"aria-labelledby": `social-tab-${o}`,
			className: "min-h-[120px]",
			children: a && f.length === 0 ? /* @__PURE__ */ D("div", {
				role: "alert",
				"data-testid": "social-graph-error",
				className: "py-6 text-center",
				children: [/* @__PURE__ */ E("div", {
					className: "text-sm font-semibold text-danger-fg mb-1",
					children: "Couldn’t load your connections"
				}), /* @__PURE__ */ E("div", {
					className: "text-sm text-text-tertiary",
					children: a
				})]
			}) : f.length === 0 ? /* @__PURE__ */ D("div", {
				className: "py-6 text-center",
				children: [/* @__PURE__ */ E("div", {
					className: "text-sm font-semibold text-text-primary mb-1",
					children: d[o].heading
				}), /* @__PURE__ */ E("div", {
					className: "text-sm text-text-tertiary",
					children: d[o].body
				})]
			}) : /* @__PURE__ */ E("div", { children: f.map((e) => /* @__PURE__ */ D("div", {
				className: "flex items-center gap-2 h-14 border-b border-surface-hover",
				children: [
					/* @__PURE__ */ E(A, {
						user: e,
						size: 32
					}),
					/* @__PURE__ */ D("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ E("div", {
							className: "text-base text-text-primary",
							children: e.displayName
						}), /* @__PURE__ */ E("div", {
							className: "text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap max-w-[240px]",
							children: e.visibility === "private" ? /* @__PURE__ */ E("em", {
								className: "text-text-tertiary",
								children: "This profile is private."
							}) : e.bio
						})]
					}),
					/* @__PURE__ */ E(j, {
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
function P({ idToken: t, onMessage: n }) {
	let { profile: r, loading: i, error: o, updateProfile: s } = a({ idToken: t }), { followers: c, following: l, friends: u, follow: d, unfollow: f, error: p, loadError: m } = e({ idToken: t }), h = new Set(l.map((e) => e.userId)), g = {};
	[
		...c,
		...l,
		...u
	].forEach((e) => {
		g[e.userId] = h.has(e.userId) ? "following" : "not-following";
	});
	let [_, v] = w(null), y = async (e, t) => {
		v(null);
		try {
			t === "following" || t === "pending" ? await d(e) : await f(e);
		} catch (e) {
			v(e instanceof Error ? e.message : "Follow action failed");
		}
	}, b = c.map((e) => O(e, g[e.userId] ?? "not-following")), x = l.map((e) => O(e, "following")), S = u.map((e) => O(e, "following")), C = r ? {
		...k(r),
		followersCount: m ? void 0 : c.length,
		followingCount: m ? void 0 : l.length,
		friendsCount: m ? void 0 : u.length
	} : null;
	return /* @__PURE__ */ D("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ E("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
				children: "Social Profile"
			}),
			i && !C ? /* @__PURE__ */ E("div", {
				className: "py-10 text-center text-text-tertiary text-sm",
				children: "Loading profile…"
			}) : C ? /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ E(M, {
				user: C,
				isOwnProfile: !0,
				onSave: s
			}), /* @__PURE__ */ E(N, {
				followers: b,
				following: x,
				friends: S,
				followStates: g,
				onFollowChange: y,
				loadError: m
			})] }) : null,
			(_ ?? o ?? p) && /* @__PURE__ */ E("div", {
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
function F(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64);
}
function I({ people: e, onStartDm: t, onCreateChannel: n, onCancel: r, peopleError: i = null, busy: a = !1, className: o, "data-testid": l = "new-conversation" }) {
	let [u, f] = w(""), p = C(null), m = S(() => {
		let t = u.trim().toLowerCase();
		return t ? e.filter((e) => e.displayName.toLowerCase().includes(t)) : e;
	}, [e, u]), h = F(u), g = !!n && h.length > 0;
	return /* @__PURE__ */ D("div", {
		"data-testid": l,
		className: s("flex flex-col gap-1 rounded-lg border border-border bg-surface p-2", o),
		children: [/* @__PURE__ */ D("div", {
			className: "flex items-center gap-1.5",
			children: [/* @__PURE__ */ E(c, {
				ref: p,
				size: "sm",
				autoFocus: !0,
				value: u,
				onChange: (e) => f(e.target.value),
				onKeyDown: (e) => {
					e.key === "Escape" && r?.(), e.key === "Enter" && (m.length === 1 ? t(m[0].userId) : m.length === 0 && g && n?.(h));
				},
				placeholder: "Search people, or name a new channel",
				"aria-label": "Search people, or name a new channel",
				"data-testid": `${l}-query`,
				disabled: a,
				className: "min-w-0 flex-1"
			}), r && /* @__PURE__ */ E("button", {
				type: "button",
				onClick: r,
				disabled: a,
				"data-testid": `${l}-cancel`,
				className: "rounded px-2 py-1 text-xs text-text-secondary hover:bg-surface-hover",
				children: "Cancel"
			})]
		}), i ? /* @__PURE__ */ D("p", {
			role: "alert",
			"data-testid": `${l}-error`,
			className: "m-0 px-1 py-1.5 text-xs text-danger-fg",
			children: ["Couldn’t load people. ", i]
		}) : /* @__PURE__ */ D("ul", {
			className: "m-0 flex max-h-64 list-none flex-col gap-0.5 overflow-y-auto p-0",
			children: [
				m.map((e) => /* @__PURE__ */ E("li", { children: /* @__PURE__ */ D("button", {
					type: "button",
					onClick: () => void t(e.userId),
					disabled: a,
					"data-testid": `${l}-person`,
					className: "flex w-full items-center gap-2 rounded px-1.5 py-1.5 text-left hover:bg-surface-hover",
					children: [/* @__PURE__ */ E(d, {
						name: e.displayName,
						src: e.avatarUrl,
						color: e.color,
						size: 26
					}), /* @__PURE__ */ D("span", {
						className: "flex min-w-0 flex-col",
						children: [/* @__PURE__ */ E("span", {
							className: "truncate text-[13px] text-text-primary",
							children: e.displayName
						}), e.hint && /* @__PURE__ */ E("span", {
							className: "truncate text-[11px] text-text-tertiary",
							children: e.hint
						})]
					})]
				}) }, e.userId)),
				m.length === 0 && !g && /* @__PURE__ */ E("li", {
					className: "px-1.5 py-2 text-xs text-text-secondary",
					"data-testid": `${l}-empty`,
					children: u.trim() ? "Nobody by that name." : "Nobody to talk to yet."
				}),
				g && /* @__PURE__ */ E("li", { children: /* @__PURE__ */ D("button", {
					type: "button",
					onClick: () => void n?.(h),
					disabled: a,
					"data-testid": `${l}-create-channel`,
					className: "flex w-full items-center gap-2 rounded px-1.5 py-1.5 text-left hover:bg-surface-hover",
					children: [/* @__PURE__ */ E("span", {
						"aria-hidden": !0,
						className: "grid h-[26px] w-[26px] shrink-0 place-items-center rounded-lg bg-surface-inset text-sm text-text-secondary",
						children: "#"
					}), /* @__PURE__ */ D("span", {
						className: "min-w-0 truncate text-[13px] text-text-primary",
						children: ["Create channel ", /* @__PURE__ */ D("span", {
							className: "font-semibold",
							children: ["#", h]
						})]
					})]
				}) })
			]
		})]
	});
}
//#endregion
//#region src/components/social/ConversationList.tsx
function L(e, t) {
	let n = e.lastMessageAt ? Date.parse(e.lastMessageAt) : NaN, r = t.lastMessageAt ? Date.parse(t.lastMessageAt) : NaN, i = Number.isNaN(n) ? null : n, a = Number.isNaN(r) ? null : r;
	return i === null && a === null ? 0 : i === null ? 1 : a === null ? -1 : a - i;
}
function R({ items: e, grouped: t = !1, sectionOrder: n = "channels-first", sortByRecency: r = !0, activeChannel: i, onSelect: a, onNewChat: o, emptyLabel: c = "No conversations yet", tone: l = "light", className: p, "data-testid": m }) {
	let g = l === "dark", _ = r ? [...e].sort(L) : e, v = [];
	if (t) {
		let e = (e) => (e.kind ?? (e.peers.length > 1 ? "group" : "dm")) === "channel", t = _.filter(e), r = _.filter((t) => !e(t)), i = {
			heading: "Channels",
			label: "Channels",
			items: t
		}, a = {
			heading: "Direct messages",
			label: "Direct messages",
			items: r
		}, o = n === "dms-first" ? [a, i] : [i, a];
		for (let e of o) e.items.length > 0 && v.push(e);
	} else v.push({
		label: "Conversations",
		items: _
	});
	let y = v.flatMap((e) => e.items), x = C(null), [S, T] = w(null), O = (S && y.some((e) => e.channel === S) ? S : null) ?? (i && y.some((e) => e.channel === i) ? i : null) ?? y[0]?.channel ?? null, k = C(null);
	b(() => {
		let e = k.current;
		if (!e) return;
		k.current = null;
		let t = x.current?.querySelector(`[data-testid="conversation-row"][data-channel="${CSS.escape(e)}"]`);
		t?.focus(), t?.scrollIntoView({ block: "nearest" });
	});
	function A(e) {
		let t = Math.max(0, Math.min(y.length - 1, e)), n = y[t];
		!n || n.channel === O || (k.current = n.channel, T(n.channel));
	}
	function j(e) {
		if (y.length === 0) return;
		let t = y.findIndex((e) => e.channel === O), n = t < 0 ? 0 : t;
		switch (e.key) {
			case "ArrowDown":
				A(n + 1);
				break;
			case "ArrowUp":
				A(n - 1);
				break;
			case "Home":
				A(0);
				break;
			case "End":
				A(y.length - 1);
				break;
			default: return;
		}
		e.preventDefault();
	}
	return /* @__PURE__ */ D("div", {
		className: s("flex min-h-0 flex-col gap-1", p),
		"data-testid": m,
		children: [o && /* @__PURE__ */ D("button", {
			type: "button",
			onClick: o,
			"data-testid": "conversation-new-chat",
			className: s("flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] font-medium", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", g ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"),
			children: [/* @__PURE__ */ E("span", {
				"aria-hidden": "true",
				className: s("grid h-6 w-6 place-items-center rounded-full border border-dashed text-sm leading-none", g ? "border-white/30" : "border-border"),
				children: "+"
			}), "New chat"]
		}), e.length === 0 ? /* @__PURE__ */ E("p", {
			className: s("m-0 px-2 py-1.5 text-[13px]", g ? "text-white/60" : "text-text-secondary"),
			"data-testid": "conversation-empty",
			children: c
		}) : /* @__PURE__ */ E("div", {
			ref: x,
			onKeyDown: j,
			className: "m-0 flex min-h-0 flex-col overflow-y-auto p-0",
			children: v.map((e) => /* @__PURE__ */ D("div", { children: [e.heading && /* @__PURE__ */ E("p", {
				"data-testid": "conversation-section",
				"aria-hidden": !0,
				className: s("m-0 px-2 pb-0.5 pt-3 text-[11px] font-semibold uppercase tracking-wide", g ? "text-white/40" : "text-text-tertiary"),
				children: e.heading
			}), /* @__PURE__ */ E("ul", {
				className: "m-0 flex list-none flex-col gap-0.5 p-0",
				"aria-label": e.label,
				children: e.items.map((e) => {
					let t = e.channel === i, n = e.channel === O, r = e.kind ?? (e.peers.length > 1 ? "group" : "dm"), o = r === "channel", c = r === "group", l = e.peers[0], p = o ? e.name ?? e.channel : e.peers.map((e) => e.displayName).join(", "), m = e.lastMessageAt ? h(e.lastMessageAt) : "", _ = e.unreadCount ?? 0, v = !!e.mentioned, y = !!e.live;
					return /* @__PURE__ */ E("li", { children: /* @__PURE__ */ D("button", {
						type: "button",
						onClick: () => a(e.channel),
						onFocus: () => T(e.channel),
						"data-testid": "conversation-row",
						"data-channel": e.channel,
						"data-active": t ? "true" : "false",
						"aria-current": t ? "true" : void 0,
						tabIndex: n ? 0 : -1,
						className: s("flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-left", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", g ? "hover:bg-white/10" : "hover:bg-surface-hover", t && (g ? "bg-white/10" : "bg-surface-hover")),
						children: [
							o ? /* @__PURE__ */ E("span", {
								"aria-hidden": "true",
								"data-testid": "conversation-channel-glyph",
								className: s("grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[15px] font-semibold leading-none", g ? "bg-white/10 text-white/70" : "bg-surface-inset text-text-secondary"),
								children: "#"
							}) : c ? /* @__PURE__ */ E(u, {
								size: 28,
								maxVisible: 2,
								items: e.peers.map((e) => ({
									name: e.displayName,
									color: e.color,
									src: e.avatarUrl
								}))
							}) : l ? /* @__PURE__ */ D("span", {
								className: "relative inline-flex shrink-0",
								children: [/* @__PURE__ */ E(d, {
									name: l.displayName,
									color: l.color,
									src: l.avatarUrl,
									size: 28
								}), l.online !== void 0 && /* @__PURE__ */ E(f, {
									state: l.online ? "online" : "offline",
									pulse: !1,
									className: s("absolute -bottom-0.5 -right-0.5 rounded-full ring-2", g ? "ring-call-chrome" : "ring-surface")
								})]
							}) : null,
							/* @__PURE__ */ D("span", {
								className: "flex min-w-0 flex-1 flex-col",
								children: [/* @__PURE__ */ D("span", {
									className: "flex items-baseline gap-2",
									children: [/* @__PURE__ */ E("span", {
										className: s("min-w-0 flex-1 truncate text-[13px]", _ > 0 ? "font-semibold" : "font-medium", g ? "text-white" : "text-text-primary"),
										children: p
									}), m && /* @__PURE__ */ E("span", {
										className: s("shrink-0 text-[11px] tabular-nums", g ? "text-white/50" : "text-text-tertiary"),
										"data-testid": "conversation-time",
										children: m
									})]
								}), e.lastMessagePreview && /* @__PURE__ */ E("span", {
									className: s("truncate text-[12px]", g ? "text-white/60" : "text-text-secondary"),
									"data-testid": "conversation-preview",
									children: e.lastMessagePreview
								})]
							}),
							y && /* @__PURE__ */ D("span", {
								"data-testid": "conversation-live",
								"aria-label": "Call in progress",
								title: "Call in progress",
								className: "inline-flex shrink-0 items-center gap-1 rounded-full bg-danger px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none tracking-wide text-white",
								children: [/* @__PURE__ */ E("span", {
									"aria-hidden": !0,
									className: "h-1.5 w-1.5 rounded-full bg-white"
								}), "Live"]
							}),
							v && /* @__PURE__ */ E("span", {
								"data-testid": "conversation-mention",
								"aria-label": "You were mentioned",
								title: "You were mentioned",
								className: "grid h-5 w-5 shrink-0 place-items-center rounded-full bg-danger text-[11px] font-bold leading-none text-white",
								children: "@"
							}),
							_ > 0 && /* @__PURE__ */ E("span", {
								"data-testid": "conversation-unread",
								className: "grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-primary px-1.5 text-[11px] font-semibold leading-none text-white",
								children: _ > 99 ? "99+" : _
							})
						]
					}) }, e.channel);
				})
			})] }, e.label))
		})]
	});
}
//#endregion
//#region src/components/social/ChatRoom.tsx
var z = [
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
function B(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) >>> 0;
	return z[t % z.length];
}
function V(e) {
	let t = e.split(/[\s._@-]/);
	return t.length >= 2 ? (t[0][0] + t[1][0]).toUpperCase() : e.slice(0, 2).toUpperCase();
}
function H(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : new Date(e).toLocaleDateString();
}
function U(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function W({ post: e, isOwn: t, showSender: n }) {
	let r = B(e.authorId);
	return /* @__PURE__ */ D("div", {
		className: s("flex items-end gap-2", t ? "flex-row-reverse" : "flex-row", n ? "pt-2 px-4 pb-0.5" : "py-px px-4"),
		children: [/* @__PURE__ */ E("div", {
			className: "w-8 shrink-0 self-end",
			children: !t && n && /* @__PURE__ */ E("div", {
				className: "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white select-none",
				style: { background: r },
				children: V(e.authorId)
			})
		}), /* @__PURE__ */ D("div", {
			className: s("max-w-[68%] flex flex-col gap-0.5", t ? "items-end" : "items-start"),
			children: [
				!t && n && /* @__PURE__ */ E("span", {
					className: "text-[11px] font-semibold pl-1",
					style: { color: r },
					children: e.authorId
				}),
				/* @__PURE__ */ E("div", {
					className: s("px-3.5 py-2 text-sm leading-relaxed break-words transition-opacity duration-200", t ? "bg-primary text-white rounded-[18px_18px_4px_18px]" : "bg-surface-hover text-text-primary rounded-[4px_18px_18px_18px]", e._fadeIn ? "opacity-0" : "opacity-100"),
					children: e.content
				}),
				n && /* @__PURE__ */ E("span", {
					className: "text-[10px] text-text-tertiary px-1",
					children: H(e.createdAt)
				})
			]
		})]
	});
}
function G({ idToken: e, roomId: t, roomName: r, onMessage: i }) {
	let { posts: a, createPost: o, loading: l, hasMore: u, loadMore: d, error: f, loadError: p } = n({
		idToken: e,
		roomId: t,
		onMessage: i
	}), [m, h] = w(""), [g, _] = w(!1), [v, y] = w(null), x = C(null), S = U(e), T = [...a].reverse(), O = a[0]?.postId;
	b(() => {
		O && x.current?.scrollIntoView({ behavior: "smooth" });
	}, [O]);
	let k = async () => {
		if (!m.trim() || g) return;
		let e = m.trim();
		h(""), y(null), _(!0);
		try {
			await o(e);
		} catch (t) {
			y(t instanceof Error ? t.message : "Failed to send message"), h(e);
		} finally {
			_(!1);
		}
	};
	return /* @__PURE__ */ D("div", {
		className: "flex flex-col h-full bg-surface rounded-lg border border-border overflow-hidden",
		children: [
			/* @__PURE__ */ E("div", {
				className: "flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface shrink-0",
				children: /* @__PURE__ */ D("span", {
					className: "text-[15px] font-semibold text-text-primary",
					children: ["# ", r]
				})
			}),
			/* @__PURE__ */ D("div", {
				className: "flex-1 overflow-y-auto flex flex-col pb-1",
				children: [
					u && /* @__PURE__ */ E("div", {
						className: "text-center py-2",
						children: /* @__PURE__ */ E("button", {
							onClick: () => void d(),
							disabled: l,
							className: s("text-xs text-text-secondary bg-transparent border border-border rounded-full px-3.5 py-0.5 font-[inherit]", l ? "cursor-default" : "cursor-pointer"),
							children: l ? "Loading…" : "Load earlier"
						})
					}),
					l && T.length === 0 ? /* @__PURE__ */ E("div", {
						className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px]",
						children: "Loading messages…"
					}) : p && T.length === 0 ? /* @__PURE__ */ D("div", {
						role: "alert",
						className: "flex-1 flex flex-col items-center justify-center gap-1.5 px-6 text-center",
						children: [
							/* @__PURE__ */ E("span", {
								className: "text-[28px]",
								children: "⚠️"
							}),
							/* @__PURE__ */ E("span", {
								className: "text-sm font-semibold text-danger-fg",
								children: "Couldn’t load messages"
							}),
							/* @__PURE__ */ E("span", {
								className: "text-[13px] text-text-tertiary",
								children: p
							})
						]
					}) : T.length === 0 ? /* @__PURE__ */ D("div", {
						className: "flex-1 flex flex-col items-center justify-center text-text-tertiary gap-1.5",
						children: [
							/* @__PURE__ */ E("span", {
								className: "text-[28px]",
								children: "💬"
							}),
							/* @__PURE__ */ E("span", {
								className: "text-sm font-semibold text-text-primary",
								children: "No messages yet"
							}),
							/* @__PURE__ */ E("span", {
								className: "text-[13px]",
								children: "Be the first to say something!"
							})
						]
					}) : T.map((e, t) => {
						let n = e.authorId === S, r = T[t - 1], i = !r || r.authorId !== e.authorId || new Date(e.createdAt).getTime() - new Date(r.createdAt).getTime() > 3e5;
						return /* @__PURE__ */ E(W, {
							post: e,
							isOwn: n,
							showSender: i
						}, e.postId);
					}),
					/* @__PURE__ */ E("div", { ref: x })
				]
			}),
			(f || v) && /* @__PURE__ */ E("div", {
				className: "px-4 py-1.5 bg-danger-bg border-t border-danger-border text-xs text-danger-fg",
				children: v ?? f
			}),
			/* @__PURE__ */ D("div", {
				className: "flex items-center gap-2 px-3 py-2.5 border-t border-border bg-surface shrink-0",
				children: [/* @__PURE__ */ E(c, {
					value: m,
					onChange: (e) => h(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && !e.shiftKey && (e.preventDefault(), k());
					},
					placeholder: `Message #${r}…`,
					disabled: g,
					className: "flex-1 rounded-[22px] px-4"
				}), /* @__PURE__ */ E("button", {
					onClick: () => void k(),
					disabled: !m.trim() || g,
					className: s("w-[34px] h-[34px] rounded-full shrink-0 border-none flex items-center justify-center text-base", !m.trim() || g ? "bg-surface-hover text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: "↑"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/social/SocialTabContent.tsx
function K({ userId: t, displayName: n, idToken: r, rooms: i, createRoom: a, createDM: o, createGroupRoom: c, roomsLoading: l, roomsError: u, onRoomsRetry: d, handleRoomSelect: f, activeRoomId: p, onMessage: m }) {
	let [h, g] = w(!0), _ = h ? 240 : 0, [v, x] = w({}), T = C(p);
	b(() => {
		T.current = p;
	}, [p]);
	let O = y((e) => {
		x((t) => {
			if (!t[e.roomId]) return t;
			let n = { ...t };
			return delete n[e.roomId], n;
		}), f(e);
	}, [f]);
	b(() => m((e) => {
		if (e.type === "social:post") {
			let t = (e.payload ?? e).roomId;
			t && t !== T.current && x((e) => ({
				...e,
				[t]: (e[t] ?? 0) + 1
			}));
		}
	}), [m]);
	let [k, A] = w(!1), [j, M] = w(!1), { friends: N, loadError: P } = e({ idToken: r }), F = n ? n.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2) : t.slice(0, 2).toUpperCase(), L = i.find((e) => e.roomId === p) ?? null, z = i.filter((e) => e.type === "standalone" || e.type === "group"), B = i.filter((e) => e.type === "dm"), V = S(() => [...z.map((e) => ({
		channel: e.roomId,
		kind: "channel",
		name: e.name,
		peers: [],
		unreadCount: v[e.roomId] ?? 0
	})), ...B.map((e) => ({
		channel: e.roomId,
		kind: "dm",
		peers: [{
			userId: e.dmPeerUserId ?? e.roomId,
			displayName: e.name
		}],
		unreadCount: v[e.roomId] ?? 0
	}))], [
		z,
		B,
		v
	]), H = y((e) => {
		let t = i.find((t) => t.roomId === e);
		t && O(t);
	}, [i, O]), U = "var(--color-border)", W = "var(--color-text-primary)", K = "var(--color-text-secondary)";
	return /* @__PURE__ */ D("div", {
		className: "flex overflow-hidden rounded-lg transition-colors duration-200 h-[calc(100vh-120px)]",
		style: {
			background: "var(--color-surface)",
			border: `1px solid ${U}`
		},
		children: [/* @__PURE__ */ D("div", {
			className: s("shrink-0 flex-col overflow-hidden transition-[width] duration-[180ms]", h ? "flex" : "hidden"),
			style: {
				width: _,
				borderRight: `1px solid ${U}`,
				background: "var(--color-surface-panel)"
			},
			children: [/* @__PURE__ */ D("div", {
				className: "flex items-center gap-2 shrink-0 px-[14px] pt-[14px] pb-3",
				style: { borderBottom: `1px solid ${U}` },
				children: [
					/* @__PURE__ */ E("div", {
						className: "w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-[11px] shrink-0 bg-[linear-gradient(135deg,#646cff,#9b59b6)]",
						children: F
					}),
					/* @__PURE__ */ D("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ E("div", {
							className: "text-[13px] font-bold overflow-hidden text-ellipsis whitespace-nowrap",
							style: { color: W },
							children: n || t
						}), /* @__PURE__ */ D("div", {
							className: "text-[11px] flex items-center gap-1",
							style: { color: K },
							children: [/* @__PURE__ */ E("span", { className: "w-1.5 h-1.5 rounded-full bg-success inline-block" }), "Active"]
						})]
					}),
					/* @__PURE__ */ E("button", {
						onClick: () => g(!1),
						title: "Collapse sidebar",
						className: "bg-transparent border-none cursor-pointer text-base leading-none px-1 py-0.5 rounded",
						style: { color: K },
						children: "«"
					})
				]
			}), /* @__PURE__ */ E("div", {
				className: "flex-1 overflow-y-auto pt-2",
				children: /* @__PURE__ */ D("div", {
					className: "px-1 pt-1",
					children: [l && V.length === 0 ? /* @__PURE__ */ E("div", {
						className: "px-2 py-2 text-xs",
						style: { color: K },
						children: "Loading…"
					}) : u && V.length === 0 ? /* @__PURE__ */ E("div", {
						role: "alert",
						"data-testid": "conversations-error",
						className: "px-2 py-2 text-xs text-danger-fg",
						children: "Couldn’t load conversations"
					}) : /* @__PURE__ */ E(R, {
						items: V,
						activeChannel: p ?? null,
						onSelect: H,
						onNewChat: () => A((e) => !e),
						emptyLabel: "No conversations yet",
						"data-testid": "social-conversations"
					}), k && /* @__PURE__ */ E("div", {
						className: "px-1 pt-1.5",
						children: /* @__PURE__ */ E(I, {
							people: N.map((e) => ({
								userId: e.userId,
								displayName: e.displayName,
								avatarUrl: e.avatarUrl
							})),
							peopleError: P,
							busy: j,
							onCancel: () => A(!1),
							onStartDm: async (e) => {
								M(!0);
								try {
									await o(e), A(!1);
								} finally {
									M(!1);
								}
							},
							onCreateChannel: async (e) => {
								M(!0);
								try {
									await a(e), A(!1);
								} finally {
									M(!1);
								}
							}
						})
					})]
				})
			})]
		}), /* @__PURE__ */ D("div", {
			className: "flex-1 min-w-0 flex flex-col",
			children: [!h && /* @__PURE__ */ D("div", {
				className: "flex items-center gap-2 px-3 py-1.5",
				style: { borderBottom: `1px solid ${U}` },
				children: [/* @__PURE__ */ E("button", {
					onClick: () => g(!0),
					title: "Expand sidebar",
					className: "bg-transparent rounded cursor-pointer text-sm px-2 py-0.5 font-[inherit]",
					style: {
						border: `1px solid ${U}`,
						color: K
					},
					children: "»"
				}), L && /* @__PURE__ */ D("span", {
					className: "text-[13px] font-semibold",
					style: { color: W },
					children: [
						L.type === "dm" ? "●" : "#",
						" ",
						L.name
					]
				})]
			}), /* @__PURE__ */ E("div", {
				className: "flex-1 min-h-0",
				children: L ? /* @__PURE__ */ E(G, {
					idToken: r,
					roomId: L.roomId,
					roomName: L.name,
					onMessage: m
				}, L.roomId) : /* @__PURE__ */ D("div", {
					className: "h-full flex flex-col items-center justify-center gap-2",
					style: { color: K },
					children: [
						/* @__PURE__ */ E("span", {
							className: "text-4xl",
							children: "💬"
						}),
						/* @__PURE__ */ E("span", {
							className: "text-[15px] font-semibold",
							style: { color: W },
							children: "Select a room to start chatting"
						}),
						/* @__PURE__ */ E("span", {
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
function ee({ author: e, avatarUrl: t, mine: n = !1, messages: r, className: i }) {
	return r.length === 0 ? null : /* @__PURE__ */ E("div", {
		"data-testid": "message-group",
		"data-author": e,
		"data-row-count": r.length,
		className: s("flex flex-col", i),
		children: r.map((r, i) => /* @__PURE__ */ E(m, {
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
function q({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = w(""), [a, o] = w(null), l = async (t) => {
		if (t.preventDefault(), r.trim()) {
			o(null);
			try {
				await e(r.trim()), i("");
			} catch (e) {
				o(e instanceof Error ? e.message : "Failed to create room");
			}
		}
	};
	return /* @__PURE__ */ D("form", {
		onSubmit: (e) => {
			l(e);
		},
		className: "my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border",
		children: [
			/* @__PURE__ */ E(c, {
				size: "sm",
				value: r,
				onChange: (e) => i(e.target.value.slice(0, 50)),
				placeholder: "Room name",
				maxLength: 50,
				required: !0,
				autoFocus: !0,
				className: "mb-1.5"
			}),
			/* @__PURE__ */ D("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ E("button", {
					type: "submit",
					disabled: !r.trim() || n,
					className: s("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !r.trim() || n ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: n ? "Creating…" : "Create"
				}), /* @__PURE__ */ E("button", {
					type: "button",
					onClick: t,
					className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
					children: "Cancel"
				})]
			}),
			a && /* @__PURE__ */ E("div", {
				className: "text-danger-fg text-[11px] mt-1",
				children: a
			})
		]
	});
}
function J({ onCreateDM: e, loading: t, friends: n, friendsError: r }) {
	let [i, a] = w(""), [o, c] = w(!1), [l, u] = w(null), d = async (t) => {
		if (t.preventDefault(), i.trim()) {
			u(null);
			try {
				await e(i.trim()), a(""), c(!1);
			} catch (e) {
				u(e instanceof Error ? e.message : "Failed to open DM");
			}
		}
	};
	return o ? /* @__PURE__ */ D("form", {
		onSubmit: (e) => {
			d(e);
		},
		className: "my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border",
		children: [
			/* @__PURE__ */ E(p, {
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
			r && n.length === 0 && /* @__PURE__ */ E("div", {
				role: "alert",
				"data-testid": "dm-friends-error",
				className: "text-danger-fg text-[11px] mb-1.5",
				children: r
			}),
			/* @__PURE__ */ D("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ E("button", {
					type: "submit",
					disabled: !i.trim() || t || n.length === 0,
					className: s("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !i.trim() || t ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: "Open DM"
				}), /* @__PURE__ */ E("button", {
					type: "button",
					onClick: () => c(!1),
					className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
					children: "Cancel"
				})]
			}),
			l && /* @__PURE__ */ E("div", {
				className: "text-danger-fg text-[11px] mt-1",
				children: l
			})
		]
	}) : /* @__PURE__ */ E("button", {
		onClick: () => c(!0),
		className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded mb-1",
		children: "+ New DM"
	});
}
function te({ room: e, isActive: t, onClick: n }) {
	return /* @__PURE__ */ D("button", {
		type: "button",
		onClick: n,
		"aria-pressed": t,
		className: s("flex items-center h-14 border-b border-surface-hover cursor-pointer pr-2", "w-full text-left font-[inherit]", t ? "bg-surface-hover border-l-[3px] border-l-primary pl-[13px]" : "bg-transparent border-l-[3px] border-l-transparent"),
		children: [/* @__PURE__ */ E("div", {
			className: s("flex-1 text-base text-text-primary", t ? "font-semibold" : "font-normal"),
			children: e.name
		}), /* @__PURE__ */ E("span", {
			className: ((e) => e === "standalone" ? "bg-accent-bg text-primary text-xs px-2 py-0.5 rounded" : e === "group" ? "bg-info-bg text-info text-xs px-2 py-0.5 rounded" : "bg-success-bg text-success text-xs px-2 py-0.5 rounded")(e.type),
			children: e.type
		})]
	});
}
function ne({ room: e, isActive: t, onClick: n }) {
	return /* @__PURE__ */ D("button", {
		onClick: n,
		className: s("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]", t ? "bg-accent-bg text-accent-fg font-semibold" : "bg-transparent text-text-primary font-normal"),
		children: [/* @__PURE__ */ E("span", {
			className: s("text-[13px] shrink-0", t ? "text-primary" : "text-text-tertiary"),
			children: e.type === "dm" ? "●" : "#"
		}), /* @__PURE__ */ E("span", {
			className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1",
			children: e.name
		})]
	});
}
function Y({ message: e, onRetry: t, compact: n }) {
	return /* @__PURE__ */ D("div", {
		role: "alert",
		className: s("text-center flex flex-col items-center gap-1.5", n ? "px-2 py-3" : "px-4 py-6"),
		children: [
			/* @__PURE__ */ E("div", {
				className: s("font-semibold text-danger-fg", n ? "text-xs" : "text-sm"),
				children: "Couldn't load rooms"
			}),
			/* @__PURE__ */ E("div", {
				className: s("text-text-secondary", n ? "text-[11px]" : "text-xs"),
				children: e
			}),
			t && /* @__PURE__ */ E("button", {
				type: "button",
				onClick: t,
				className: s("mt-1 font-medium text-info-fg bg-info-bg border border-info-border rounded cursor-pointer font-[system-ui,-apple-system,sans-serif]", n ? "px-2.5 py-0.5 text-[11px]" : "px-3.5 py-1 text-xs"),
				children: "Retry"
			})
		]
	});
}
function re({ idToken: t, rooms: n, createRoom: r, createDM: i, loading: a, error: o, onRetry: s, onRoomSelect: c, activeRoomId: l, compact: u }) {
	let { friends: d, loadError: f } = e({ idToken: t }), [p, m] = w(!1), h = async (e) => {
		await r(e), m(!1);
	};
	return u ? /* @__PURE__ */ D("div", {
		className: "px-2 pt-2",
		children: [
			/* @__PURE__ */ E("button", {
				onClick: () => m((e) => !e),
				className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
				children: "+ New Room"
			}),
			p && /* @__PURE__ */ E(q, {
				onCreate: h,
				onDiscard: () => m(!1),
				loading: a
			}),
			/* @__PURE__ */ E(J, {
				onCreateDM: i,
				loading: a,
				friends: d,
				friendsError: f
			}),
			/* @__PURE__ */ E("div", { children: a && n.length === 0 ? /* @__PURE__ */ E("div", {
				className: "p-2 text-text-tertiary text-xs text-center",
				children: "Loading…"
			}) : o && n.length === 0 ? /* @__PURE__ */ E(Y, {
				message: o,
				onRetry: s,
				compact: !0
			}) : n.length === 0 ? /* @__PURE__ */ E("div", {
				className: "px-2 py-3 text-text-tertiary text-xs",
				children: "No rooms yet"
			}) : n.map((e) => /* @__PURE__ */ E(ne, {
				room: e,
				isActive: e.roomId === l,
				onClick: () => c(e)
			}, e.roomId)) })
		]
	}) : /* @__PURE__ */ D("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ E("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
				children: "Rooms"
			}),
			/* @__PURE__ */ E("button", {
				onClick: () => m((e) => !e),
				className: "w-full h-9 mb-2 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Create Room"
			}),
			p && /* @__PURE__ */ E(q, {
				onCreate: h,
				onDiscard: () => m(!1),
				loading: a
			}),
			/* @__PURE__ */ E(J, {
				onCreateDM: i,
				loading: a,
				friends: d,
				friendsError: f
			}),
			/* @__PURE__ */ E("div", {
				className: "max-h-80 overflow-y-auto",
				children: a && n.length === 0 ? /* @__PURE__ */ D("div", {
					className: "flex items-center gap-2 p-4 justify-center text-text-secondary",
					children: [/* @__PURE__ */ E("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }), "Loading..."]
				}) : o && n.length === 0 ? /* @__PURE__ */ E(Y, {
					message: o,
					onRetry: s
				}) : n.length === 0 ? /* @__PURE__ */ D("div", {
					className: "py-6 text-center",
					children: [/* @__PURE__ */ E("div", {
						className: "text-sm font-semibold text-text-primary mb-1",
						children: "No rooms yet"
					}), /* @__PURE__ */ E("div", {
						className: "text-sm text-text-tertiary",
						children: "Create a room or ask to be added."
					})]
				}) : n.map((e) => /* @__PURE__ */ E(te, {
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
function ie(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function ae(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function X({ onSubmit: e, placeholder: t = "Write a reply…", loading: n }) {
	let [r, i] = w(""), [a, o] = w(null), l = async (t) => {
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
	return /* @__PURE__ */ D("form", {
		onSubmit: (e) => {
			l(e);
		},
		className: "flex flex-wrap gap-2 mt-2",
		children: [
			/* @__PURE__ */ E(c, {
				value: r,
				onChange: (e) => i(e.target.value),
				placeholder: t,
				className: "flex-1"
			}),
			/* @__PURE__ */ E("button", {
				type: "submit",
				disabled: !r.trim() || n,
				className: s("h-7 px-2.5 rounded-md text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !r.trim() || n ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
				children: "Comment"
			}),
			a && /* @__PURE__ */ E("div", {
				role: "alert",
				"data-testid": "comment-submit-error",
				className: "basis-full text-danger-fg text-[13px]",
				children: a
			})
		]
	});
}
function oe({ comment: e, currentUserId: t, loading: n, onDelete: r, onReply: i }) {
	let [a, o] = w(!1), [s, c] = w(!1), [l, u] = w(+!e._fadeIn);
	b(() => {
		if (e._fadeIn) {
			let e = setTimeout(() => u(1), 10);
			return () => clearTimeout(e);
		}
	}, []);
	let d = e.authorId === t, f = !!e.parentCommentId, p = e.authorId.slice(0, 2).toUpperCase(), m = /* @__PURE__ */ E("div", {
		style: { opacity: l },
		className: "transition-opacity duration-200 ease-[ease]",
		children: /* @__PURE__ */ D("div", {
			className: "flex items-start gap-2",
			children: [/* @__PURE__ */ E("div", {
				className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
				children: p
			}), /* @__PURE__ */ D("div", {
				className: "flex-1",
				children: [
					/* @__PURE__ */ D("div", {
						className: "flex items-center gap-2 mb-0.5",
						children: [/* @__PURE__ */ E("span", {
							className: "text-sm font-semibold text-text-primary",
							children: e.authorId
						}), /* @__PURE__ */ E("span", {
							className: "text-xs text-text-tertiary",
							children: ie(e.createdAt)
						})]
					}),
					/* @__PURE__ */ E("div", {
						className: "text-sm text-text-primary mb-1",
						children: e.content
					}),
					/* @__PURE__ */ D("div", {
						className: "flex gap-2 items-center",
						children: [
							/* @__PURE__ */ E("button", {
								onClick: () => c((e) => !e),
								className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
								children: "Reply"
							}),
							d && !a && /* @__PURE__ */ E("button", {
								onClick: () => o(!0),
								className: "text-sm text-text-tertiary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
								"aria-label": "Delete comment",
								children: "Delete"
							}),
							d && a && /* @__PURE__ */ D("div", {
								role: "group",
								"aria-label": "Confirm delete comment",
								className: "flex gap-1.5 items-center",
								children: [
									/* @__PURE__ */ E("span", {
										className: "text-xs text-text-primary",
										children: "Delete this comment?"
									}),
									/* @__PURE__ */ E("button", {
										onClick: () => o(!1),
										className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
										children: "Cancel"
									}),
									/* @__PURE__ */ E("button", {
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
					s && /* @__PURE__ */ E(X, {
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
	return f ? /* @__PURE__ */ E("div", {
		className: "pl-8 py-2",
		children: m
	}) : /* @__PURE__ */ E("div", {
		className: "py-2 border-b border-surface-hover",
		children: m
	});
}
function Z({ idToken: e, roomId: t, postId: n, onMessage: i }) {
	let { comments: a, createComment: o, deleteComment: s, loading: c, submitting: l, error: u } = r({
		idToken: e,
		roomId: t,
		postId: n,
		onMessage: i
	}), d = ae(e), f = async (e, t) => {
		await o(t, e);
	};
	return /* @__PURE__ */ D("div", {
		className: "pt-2 pl-2 border-t border-surface-hover",
		children: [
			c ? /* @__PURE__ */ E("div", {
				className: "text-sm text-text-tertiary py-2",
				children: "Loading comments…"
			}) : u && a.length === 0 ? /* @__PURE__ */ E("div", {
				role: "alert",
				className: "text-sm text-danger-fg py-2",
				children: u
			}) : a.length === 0 ? /* @__PURE__ */ E("div", {
				className: "text-sm text-text-tertiary text-center py-4",
				children: "No comments yet"
			}) : a.map((e) => /* @__PURE__ */ E(oe, {
				comment: e,
				currentUserId: d,
				loading: l,
				onDelete: s,
				onReply: f
			}, e.commentId)),
			u && a.length > 0 && /* @__PURE__ */ E("div", {
				role: "alert",
				"data-testid": "comment-thread-error",
				className: "text-sm text-danger-fg py-1",
				children: u
			}),
			/* @__PURE__ */ E(X, {
				onSubmit: (e) => o(e),
				placeholder: "Write a comment…",
				loading: l
			})
		]
	});
}
//#endregion
//#region src/components/social/PostFeed.tsx
var se = [
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
function ce(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function le(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function ue({ onCreate: e, loading: t }) {
	let [n, r] = w(""), [i, a] = w(null), o = async (t) => {
		if (t.preventDefault(), n.trim()) {
			a(null);
			try {
				await e(n.trim()), r("");
			} catch (e) {
				a(e instanceof Error ? e.message : "Failed to create post");
			}
		}
	};
	return /* @__PURE__ */ D("form", {
		onSubmit: (e) => {
			o(e);
		},
		children: [
			/* @__PURE__ */ E(l, {
				value: n,
				onChange: (e) => r(e.target.value),
				placeholder: "What's on your mind?",
				maxLength: 1e4,
				rows: 3,
				className: "resize-y mb-2"
			}),
			/* @__PURE__ */ E("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ E("button", {
					type: "submit",
					disabled: !n.trim() || t,
					className: s("h-9 px-4 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !n.trim() || t ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
					children: t ? "Posting…" : "Post"
				})
			}),
			i && /* @__PURE__ */ E("div", {
				className: "text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
				children: i
			})
		]
	});
}
function de({ isLiked: e, likeCount: t, whoLiked: n, toggle: r }) {
	return /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ D("button", {
		onClick: () => void r(),
		"aria-label": "Like post",
		className: "bg-transparent border-none cursor-pointer flex items-center gap-1 p-0 font-[system-ui,-apple-system,sans-serif]",
		children: [/* @__PURE__ */ E("span", {
			className: s("text-base", e ? "text-primary" : "text-text-tertiary"),
			children: "❤"
		}), /* @__PURE__ */ E("span", {
			className: s("text-sm", e ? "text-primary" : "text-text-tertiary"),
			children: t
		})]
	}), n.length > 0 && /* @__PURE__ */ D("span", {
		className: "text-xs text-text-secondary ml-1",
		children: [
			"Liked by: ",
			n.slice(0, 3).map((e) => e.displayName).join(", "),
			n.length > 3 ? ` and ${n.length - 3} more` : ""
		]
	})] });
}
function fe({ reactWithEmoji: e }) {
	return /* @__PURE__ */ E("div", {
		className: "flex flex-wrap gap-0",
		children: se.map((t) => /* @__PURE__ */ E("button", {
			onClick: () => void e(t),
			className: "text-base bg-transparent border-none px-1 py-0.5 cursor-pointer",
			title: t,
			children: t
		}, t))
	});
}
function pe({ post: e, idToken: t, roomId: n, currentUserId: r, onMessage: a, onEdit: o, onDelete: c }) {
	let { isLiked: u, likeCount: d, whoLiked: f, toggle: p, reactWithEmoji: m, error: h } = i({
		idToken: t,
		roomId: n,
		postId: e.postId,
		onMessage: a
	}), [g, _] = w(+!e._fadeIn), [v, y] = w(!1), [x, S] = w(!1), [C, T] = w(!1), [O, k] = w(e.content), [A, j] = w(null), M = async () => {
		j(null);
		try {
			await o(e.postId, O);
		} catch (e) {
			j(e instanceof Error ? e.message : "Failed to save post");
			return;
		}
		T(!1);
	}, N = async () => {
		j(null);
		try {
			await c(e.postId);
		} catch (e) {
			j(e instanceof Error ? e.message : "Failed to delete post");
			return;
		}
		S(!1);
	};
	b(() => {
		if (e._fadeIn) {
			let e = setTimeout(() => _(1), 10);
			return () => clearTimeout(e);
		}
	}, []);
	let P = e.authorId === r, F = e.authorId.slice(0, 2).toUpperCase();
	return /* @__PURE__ */ D("div", {
		style: { opacity: g },
		className: "border-b border-surface-hover pb-4 mb-4 transition-opacity duration-200 ease-[ease]",
		children: [
			/* @__PURE__ */ D("div", {
				className: "flex items-center gap-2 mb-2",
				children: [/* @__PURE__ */ E("div", {
					className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
					children: F
				}), /* @__PURE__ */ D("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ E("span", {
						className: "text-base font-semibold text-text-primary",
						children: e.authorId
					}), /* @__PURE__ */ E("span", {
						className: "text-sm text-text-tertiary ml-2",
						children: ce(e.createdAt)
					})]
				})]
			}),
			C ? /* @__PURE__ */ D("div", {
				className: "mb-2",
				children: [/* @__PURE__ */ E(l, {
					value: O,
					onChange: (e) => k(e.target.value),
					rows: 3,
					className: "resize-y mb-2"
				}), /* @__PURE__ */ D("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ E("button", {
						onClick: () => {
							M();
						},
						disabled: !O.trim(),
						className: s("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", O.trim() ? "bg-primary text-white border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"),
						children: "Save"
					}), /* @__PURE__ */ E("button", {
						onClick: () => {
							T(!1), k(e.content);
						},
						className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Discard Changes"
					})]
				})]
			}) : /* @__PURE__ */ E("div", {
				className: "text-base text-text-primary mt-2 mb-2",
				children: e.content
			}),
			/* @__PURE__ */ D("div", {
				className: "flex gap-4 text-sm mt-1 items-center flex-wrap",
				children: [
					/* @__PURE__ */ E(de, {
						isLiked: u,
						likeCount: d,
						whoLiked: f,
						toggle: p
					}),
					/* @__PURE__ */ E(fe, { reactWithEmoji: m }),
					/* @__PURE__ */ E("button", {
						onClick: () => y((e) => !e),
						className: "bg-transparent border-none text-sm text-text-secondary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Comment"
					}),
					P && !C && /* @__PURE__ */ E("button", {
						onClick: () => T(!0),
						className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Edit"
					}),
					P && !x && !C && /* @__PURE__ */ E("button", {
						onClick: () => S(!0),
						className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Delete"
					}),
					P && x && /* @__PURE__ */ D("div", {
						role: "group",
						"aria-label": "Confirm delete post",
						className: "flex gap-1.5 items-center",
						children: [
							/* @__PURE__ */ E("span", {
								className: "text-xs text-text-primary",
								children: "Delete this post?"
							}),
							/* @__PURE__ */ E("button", {
								onClick: () => S(!1),
								className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
								children: "Cancel"
							}),
							/* @__PURE__ */ E("button", {
								onClick: () => {
									N();
								},
								className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
								children: "Delete"
							})
						]
					})
				]
			}),
			(A ?? h) && /* @__PURE__ */ E("div", {
				role: "alert",
				"data-testid": "post-action-error",
				className: "text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
				children: A ?? h
			}),
			v && /* @__PURE__ */ E(Z, {
				idToken: t,
				roomId: n,
				postId: e.postId,
				onMessage: a
			})
		]
	});
}
function me({ idToken: e, roomId: t, onMessage: r }) {
	let { posts: i, createPost: a, editPost: o, deletePost: c, loading: l, mutating: u, error: d, loadError: f, hasMore: p, loadMore: m } = n({
		idToken: e,
		roomId: t,
		onMessage: r
	}), h = le(e);
	return /* @__PURE__ */ D("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ E(ue, {
				onCreate: a,
				loading: l || u
			}),
			/* @__PURE__ */ E("div", { className: "border-t border-border my-4" }),
			p && /* @__PURE__ */ E("button", {
				onClick: () => void m(),
				disabled: l,
				className: s("w-full h-9 mb-4 bg-surface text-text-primary border border-border rounded-lg text-sm font-[system-ui,-apple-system,sans-serif]", l ? "cursor-default" : "cursor-pointer"),
				children: l ? "Loading…" : "Load more"
			}),
			d && i.length > 0 && /* @__PURE__ */ E("div", {
				role: "alert",
				"data-testid": "post-feed-error",
				className: "text-danger-fg text-[13px] mb-3 font-[system-ui,-apple-system,sans-serif]",
				children: d
			}),
			l && i.length === 0 ? /* @__PURE__ */ D("div", {
				className: "flex items-center gap-2 p-4 justify-center text-text-secondary",
				children: [/* @__PURE__ */ E("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }), "Loading..."]
			}) : f && i.length === 0 ? /* @__PURE__ */ D("div", {
				role: "alert",
				className: "py-6 text-center",
				children: [/* @__PURE__ */ E("div", {
					className: "text-sm font-semibold text-danger-fg mb-1",
					children: "Couldn’t load posts"
				}), /* @__PURE__ */ E("div", {
					className: "text-sm text-text-tertiary",
					children: f
				})]
			}) : i.length === 0 ? /* @__PURE__ */ D("div", {
				className: "py-6 text-center",
				children: [/* @__PURE__ */ E("div", {
					className: "text-sm font-semibold text-text-primary mb-1",
					children: "No posts yet"
				}), /* @__PURE__ */ E("div", {
					className: "text-sm text-text-tertiary",
					children: "Be the first to post in this room."
				})]
			}) : i.map((n) => /* @__PURE__ */ E(pe, {
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
function he({ group: e, isSelected: t, onClick: n }) {
	return /* @__PURE__ */ D("button", {
		onClick: n,
		className: s("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]", t ? "bg-accent-bg text-accent-fg font-semibold" : "bg-transparent text-text-primary font-normal"),
		children: [/* @__PURE__ */ E("span", {
			className: s("text-xs shrink-0", t ? "text-primary" : "text-text-tertiary"),
			children: e.visibility === "private" ? "🔒" : "👥"
		}), /* @__PURE__ */ E("span", {
			className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1",
			children: e.name
		})]
	});
}
function ge({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = w(""), [a, o] = w(null), l = async (t) => {
		if (t.preventDefault(), r.trim()) {
			o(null);
			try {
				await e(r.trim()), i("");
			} catch (e) {
				o(e instanceof Error ? e.message : "Failed to create group");
			}
		}
	};
	return /* @__PURE__ */ D("form", {
		onSubmit: (e) => {
			l(e);
		},
		className: "p-2 bg-surface-panel rounded-md border border-border my-1 mb-2",
		children: [
			/* @__PURE__ */ E(c, {
				size: "sm",
				value: r,
				onChange: (e) => i(e.target.value.slice(0, 50)),
				placeholder: "Group name",
				maxLength: 50,
				required: !0,
				autoFocus: !0,
				className: "mb-1.5"
			}),
			/* @__PURE__ */ D("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ E("button", {
					type: "submit",
					disabled: !r.trim() || n,
					className: s("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !r.trim() || n ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: n ? "Creating…" : "Create"
				}), /* @__PURE__ */ E("button", {
					type: "button",
					onClick: t,
					className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
					children: "Cancel"
				})]
			}),
			a && /* @__PURE__ */ E("div", {
				className: "text-danger-fg text-[11px] mt-1",
				children: a
			})
		]
	});
}
function _e({ group: e, members: t, rooms: n, groupId: r, currentUserId: i, createGroupRoom: a, onRoomSelect: o, inviteUser: l, loading: u }) {
	let [d, f] = w(!1), [p, m] = w(""), [h, g] = w(null), [_, v] = w(!1), [y, b] = w(""), [x, S] = w(null), C = e.ownerId === i, T = n.filter((e) => e.groupId === r), O = async (e) => {
		if (e.preventDefault(), p.trim()) {
			g(null);
			try {
				await l(r, p.trim());
			} catch (e) {
				g(e instanceof Error ? e.message : "Failed to invite user");
				return;
			}
			m(""), f(!1);
		}
	}, k = async (e) => {
		if (e.preventDefault(), y.trim()) {
			S(null);
			try {
				await a(r, y.trim());
			} catch (e) {
				S(e instanceof Error ? e.message : "Failed to create room");
				return;
			}
			b(""), v(!1);
		}
	};
	return /* @__PURE__ */ D("div", {
		className: "px-2 pb-2 pt-1 border-t border-border mt-1",
		children: [
			/* @__PURE__ */ D("div", {
				className: "flex items-center justify-between mb-1",
				children: [/* @__PURE__ */ D("span", {
					className: "text-[11px] text-text-secondary font-semibold uppercase tracking-wide",
					children: [
						"Members (",
						t.length,
						")"
					]
				}), C && /* @__PURE__ */ E("button", {
					onClick: () => f((e) => !e),
					className: "text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]",
					children: "+ Invite"
				})]
			}),
			d && /* @__PURE__ */ D("form", {
				onSubmit: (e) => {
					O(e);
				},
				className: "flex gap-1 mb-1.5",
				children: [/* @__PURE__ */ E(c, {
					size: "sm",
					value: p,
					onChange: (e) => m(e.target.value),
					placeholder: "User ID",
					className: "flex-1"
				}), /* @__PURE__ */ E("button", {
					type: "submit",
					disabled: !p.trim(),
					className: s("h-6 px-2 border-none rounded text-[11px] font-[inherit]", p.trim() ? "bg-primary text-white cursor-pointer" : "bg-border text-text-tertiary cursor-default"),
					children: "Invite"
				})]
			}),
			d && h && /* @__PURE__ */ E("div", {
				role: "alert",
				"data-testid": "compact-invite-error",
				className: "text-danger-fg text-[11px] mb-1.5",
				children: h
			}),
			/* @__PURE__ */ D("div", {
				className: "flex flex-wrap gap-1 mb-2",
				children: [t.slice(0, 8).map((e) => /* @__PURE__ */ E("div", {
					title: e.displayName ?? e.userId,
					className: "w-6 h-6 rounded-full bg-border flex items-center justify-center text-[10px] font-semibold text-text-primary",
					children: (e.displayName ?? e.userId).slice(0, 2).toUpperCase()
				}, e.userId)), t.length > 8 && /* @__PURE__ */ D("span", {
					className: "text-[11px] text-text-tertiary self-center",
					children: ["+", t.length - 8]
				})]
			}),
			/* @__PURE__ */ D("div", {
				className: "flex items-center justify-between mb-1",
				children: [/* @__PURE__ */ D("span", {
					className: "text-[11px] text-text-secondary font-semibold uppercase tracking-wide",
					children: [
						"Rooms (",
						T.length,
						")"
					]
				}), C && /* @__PURE__ */ E("button", {
					onClick: () => v((e) => !e),
					className: "text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]",
					children: "+ Room"
				})]
			}),
			_ && /* @__PURE__ */ D("form", {
				onSubmit: (e) => {
					k(e);
				},
				className: "flex gap-1 mb-1.5",
				children: [/* @__PURE__ */ E(c, {
					size: "sm",
					value: y,
					onChange: (e) => b(e.target.value.slice(0, 50)),
					placeholder: "Room name",
					className: "flex-1"
				}), /* @__PURE__ */ E("button", {
					type: "submit",
					disabled: !y.trim() || u,
					className: s("h-6 px-2 border-none rounded text-[11px] font-[inherit]", !y.trim() || u ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: "Create"
				})]
			}),
			_ && x && /* @__PURE__ */ E("div", {
				role: "alert",
				"data-testid": "compact-group-room-error",
				className: "text-danger-fg text-[11px] mb-1.5",
				children: x
			}),
			T.map((e) => /* @__PURE__ */ D(o ? "button" : "div", {
				type: o ? "button" : void 0,
				onClick: o ? () => o(e) : void 0,
				className: s("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1 bg-transparent text-text-primary text-[13px] text-left font-[inherit]", o && "cursor-pointer"),
				children: [/* @__PURE__ */ E("span", {
					className: "text-text-tertiary text-xs",
					children: "#"
				}), /* @__PURE__ */ E("span", {
					className: "overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.name
				})]
			}, e.roomId))
		]
	});
}
function ve({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = w(""), [a, o] = w("public"), [l, u] = w(null), d = x(), f = async (t) => {
		if (t.preventDefault(), r.trim()) {
			u(null);
			try {
				await e(r.trim(), void 0, a);
			} catch (e) {
				u(e instanceof Error ? e.message : "Failed to create group");
			}
		}
	};
	return /* @__PURE__ */ D("form", {
		onSubmit: (e) => {
			f(e);
		},
		className: "mb-3 p-3 bg-surface-panel rounded-lg border border-border",
		children: [
			/* @__PURE__ */ D("div", {
				className: "mb-3",
				children: [/* @__PURE__ */ E("label", {
					htmlFor: `${d}-group-name`,
					className: "text-sm text-text-primary block mb-1",
					children: "Group name"
				}), /* @__PURE__ */ E(c, {
					id: `${d}-group-name`,
					"aria-describedby": l ? `${d}-form-error` : void 0,
					"aria-invalid": l ? !0 : void 0,
					value: r,
					onChange: (e) => i(e.target.value.slice(0, 50)),
					placeholder: "Group name",
					maxLength: 50,
					required: !0
				})]
			}),
			/* @__PURE__ */ D("div", {
				className: "flex items-center gap-2.5 mb-3.5",
				children: [
					/* @__PURE__ */ E("span", {
						className: "text-[13px] text-text-primary min-w-[42px]",
						children: a === "public" ? "Public" : "Private"
					}),
					/* @__PURE__ */ E("button", {
						type: "button",
						role: "switch",
						"aria-label": "Private group",
						"aria-checked": a === "private",
						onClick: () => o((e) => e === "public" ? "private" : "public"),
						className: s("relative w-11 h-6 rounded-xl border-none cursor-pointer p-0 shrink-0 transition-colors duration-200", a === "private" ? "bg-primary" : "bg-state-idle"),
						children: /* @__PURE__ */ E("span", { className: s("absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-[left] duration-200", a === "private" ? "left-[23px]" : "left-[3px]") })
					}),
					/* @__PURE__ */ E("span", {
						className: "text-xs text-text-tertiary",
						children: a === "public" ? "Visible to everyone" : "Invite only"
					})
				]
			}),
			/* @__PURE__ */ D("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ E("button", {
					type: "submit",
					disabled: !r.trim() || n,
					className: s("flex-1 h-9 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !r.trim() || n ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
					children: n ? "Creating…" : "Create Group"
				}), /* @__PURE__ */ E("button", {
					type: "button",
					onClick: t,
					className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
					children: "Cancel"
				})]
			}),
			l && /* @__PURE__ */ E("div", {
				id: `${d}-form-error`,
				role: "alert",
				className: "text-danger-fg text-[13px] mt-1.5",
				children: l
			})
		]
	});
}
function ye({ group: e, currentUserId: t, isSelected: n, onSelect: r, onDelete: i }) {
	let [a, o] = w(null), c = e.ownerId === t;
	return /* @__PURE__ */ D("div", {
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
			/* @__PURE__ */ D("div", {
				className: "flex-1 min-w-0 pr-2",
				children: [/* @__PURE__ */ E("div", {
					className: s("text-base text-text-primary", n ? "font-semibold" : "font-normal"),
					children: e.name
				}), e.description && /* @__PURE__ */ E("div", {
					className: "text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.description
				})]
			}),
			/* @__PURE__ */ E("span", {
				className: s("text-xs px-2 py-0.5 rounded shrink-0 mr-2", e.visibility === "public" ? "bg-success-bg text-success" : "bg-surface-hover text-text-secondary"),
				children: e.visibility
			}),
			c && /* @__PURE__ */ E("div", {
				className: "shrink-0",
				onClick: (e) => e.stopPropagation(),
				children: a === e.groupId ? /* @__PURE__ */ D("div", {
					role: "group",
					"aria-label": "Confirm delete group",
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ E("button", {
						onClick: () => o(null),
						className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Cancel"
					}), /* @__PURE__ */ E("button", {
						onClick: () => {
							i(e.groupId), o(null);
						},
						className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Delete"
					})]
				}) : /* @__PURE__ */ E("button", {
					onClick: () => o(e.groupId),
					className: "text-xs text-danger-fg bg-transparent border-none cursor-pointer px-2 py-1 font-[system-ui,-apple-system,sans-serif]",
					"aria-label": `Delete group ${e.name}`,
					children: "Delete"
				})
			})
		]
	});
}
function be({ groupId: e, onInvite: t }) {
	let [n, r] = w(""), [i, a] = w(null), o = async (i) => {
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
	return /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ D("form", {
		onSubmit: (e) => {
			o(e);
		},
		className: "flex gap-2 mt-2",
		children: [/* @__PURE__ */ E(c, {
			className: "flex-1",
			value: n,
			onChange: (e) => r(e.target.value),
			placeholder: "User ID to invite"
		}), /* @__PURE__ */ E("button", {
			type: "submit",
			disabled: !n.trim(),
			className: s("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", n.trim() ? "bg-primary text-white border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"),
			children: "Invite"
		})]
	}), i && /* @__PURE__ */ E("div", {
		role: "alert",
		"data-testid": "invite-error",
		className: "text-danger-fg text-xs mt-1",
		children: i
	})] });
}
function xe({ members: e }) {
	let t = (e) => e === "owner" ? "bg-success-bg text-success text-xs px-2 py-0.5 rounded" : e === "admin" ? "bg-info-bg text-info text-xs px-2 py-0.5 rounded" : "bg-surface-hover text-text-secondary text-xs px-2 py-0.5 rounded";
	return /* @__PURE__ */ E("div", {
		className: "max-h-[200px] overflow-y-auto mt-2 border-t border-border",
		children: e.map((e) => /* @__PURE__ */ D("div", {
			className: "flex items-center gap-2 h-12 border-b border-surface-hover",
			children: [
				/* @__PURE__ */ E("div", {
					className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
					children: (e.displayName ?? e.userId).slice(0, 2).toUpperCase()
				}),
				/* @__PURE__ */ E("div", {
					className: "flex-1 text-base text-text-primary",
					children: e.displayName ?? e.userId
				}),
				/* @__PURE__ */ E("span", {
					className: t(e.role),
					children: e.role
				})
			]
		}, e.userId))
	});
}
function Se({ rooms: e, groupId: t, selectedGroupRole: n, createGroupRoom: r, onRoomSelect: i, loading: a }) {
	let [o, l] = w(!1), [u, d] = w(""), [f, p] = w(null), m = e.filter((e) => e.groupId === t), h = async (e) => {
		if (e.preventDefault(), u.trim()) {
			p(null);
			try {
				await r(t, u.trim());
			} catch (e) {
				p(e instanceof Error ? e.message : "Failed to create room");
				return;
			}
			d(""), l(!1);
		}
	};
	return /* @__PURE__ */ D("div", {
		className: "mt-3",
		children: [
			/* @__PURE__ */ E("h3", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-2",
				children: "GROUP ROOMS"
			}),
			(n === "owner" || n === "admin") && (o ? /* @__PURE__ */ D("form", {
				onSubmit: (e) => {
					h(e);
				},
				className: "mb-2 p-3 bg-surface-panel rounded-lg border border-border",
				children: [/* @__PURE__ */ D("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ E(c, {
							className: "flex-1",
							value: u,
							onChange: (e) => d(e.target.value.slice(0, 50)),
							placeholder: "Room name",
							maxLength: 50,
							required: !0
						}),
						/* @__PURE__ */ E("button", {
							type: "submit",
							disabled: !u.trim() || a,
							className: s("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !u.trim() || a ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
							children: a ? "Creating…" : "Create Room"
						}),
						/* @__PURE__ */ E("button", {
							type: "button",
							onClick: () => l(!1),
							className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
							children: "Cancel"
						})
					]
				}), f && /* @__PURE__ */ E("div", {
					role: "alert",
					"data-testid": "group-room-error",
					className: "text-danger-fg text-[13px] mt-1.5",
					children: f
				})]
			}) : /* @__PURE__ */ E("button", {
				onClick: () => l(!0),
				className: "w-full h-9 mb-2 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Create Room"
			})),
			m.length === 0 ? /* @__PURE__ */ E("div", {
				className: "text-sm text-text-tertiary py-2",
				children: "No rooms in this group yet."
			}) : m.map((e) => /* @__PURE__ */ D("div", {
				role: i ? "button" : void 0,
				tabIndex: i ? 0 : void 0,
				"aria-label": i ? `Open room ${e.name}` : void 0,
				className: s("flex items-center h-12 border-b border-surface-hover pr-2", i && "cursor-pointer"),
				onClick: i ? () => i(e) : void 0,
				onKeyDown: i ? (t) => {
					(t.key === "Enter" || t.key === " ") && (t.preventDefault(), i(e));
				} : void 0,
				children: [/* @__PURE__ */ E("div", {
					className: "flex-1 text-base text-text-primary",
					children: e.name
				}), /* @__PURE__ */ E("span", {
					className: "bg-info-bg text-info text-xs px-2 py-0.5 rounded",
					children: "group"
				})]
			}, e.roomId))
		]
	});
}
function Ce({ idToken: e, rooms: n, createGroupRoom: r, onRoomSelect: i, roomsLoading: a, compact: o }) {
	let { groups: c, createGroup: l, deleteGroup: u, inviteUser: d, loadMembers: f, members: p, loading: m, loaded: h, loadError: g, refresh: _ } = t({ idToken: e }), v = !h && !g, [y, b] = w(!1), [x, S] = w(null), C = e ? (() => {
		try {
			return JSON.parse(atob(e.split(".")[1])).sub;
		} catch {
			return null;
		}
	})() : null, T = async (e, t, n) => {
		await l(e, t, n), b(!1);
	}, O = (e) => {
		x === e ? S(null) : (S(e), f(e));
	};
	if (o) {
		let e = x ? c.find((e) => e.groupId === x) : null;
		return /* @__PURE__ */ D("div", {
			className: "px-2 pt-2",
			children: [
				/* @__PURE__ */ E("button", {
					onClick: () => b((e) => !e),
					className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
					children: "+ New Group"
				}),
				y && /* @__PURE__ */ E(ge, {
					onCreate: T,
					onDiscard: () => b(!1),
					loading: m
				}),
				/* @__PURE__ */ E("div", { children: v && c.length === 0 ? /* @__PURE__ */ E("div", {
					role: "status",
					className: "p-2 text-text-tertiary text-xs text-center",
					children: "Loading…"
				}) : g && c.length === 0 ? /* @__PURE__ */ D("div", {
					role: "alert",
					"data-testid": "compact-groups-load-error",
					className: "px-2 py-3 text-danger-fg text-xs",
					children: [
						/* @__PURE__ */ E("div", { children: "Couldn’t load groups." }),
						/* @__PURE__ */ E("div", {
							className: "text-text-tertiary mt-0.5",
							children: g
						}),
						/* @__PURE__ */ E("button", {
							type: "button",
							onClick: () => {
								_();
							},
							className: "mt-1 text-[11px] text-primary bg-transparent border-none cursor-pointer p-0 font-[inherit]",
							children: "Retry"
						})
					]
				}) : c.length === 0 ? /* @__PURE__ */ E("div", {
					className: "px-2 py-3 text-text-tertiary text-xs",
					children: "No groups yet"
				}) : c.map((e) => /* @__PURE__ */ E(he, {
					group: e,
					isSelected: e.groupId === x,
					onClick: () => O(e.groupId)
				}, e.groupId)) }),
				e && /* @__PURE__ */ E(_e, {
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
	let k = x ? c.find((e) => e.groupId === x) : null, A = k && C && k.ownerId === C ? "owner" : "member";
	return /* @__PURE__ */ D("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ E("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
				children: "Groups"
			}),
			/* @__PURE__ */ E("div", {
				className: "max-h-80 overflow-y-auto mb-3",
				children: v && c.length === 0 ? /* @__PURE__ */ E("div", {
					role: "status",
					className: "py-4 text-center text-sm text-text-tertiary",
					children: "Loading groups…"
				}) : g && c.length === 0 ? /* @__PURE__ */ D("div", {
					role: "alert",
					"data-testid": "groups-load-error",
					className: "py-4 text-center",
					children: [
						/* @__PURE__ */ E("div", {
							className: "text-sm font-semibold text-danger-fg mb-1",
							children: "Couldn’t load groups"
						}),
						/* @__PURE__ */ E("div", {
							className: "text-sm text-text-tertiary mb-2",
							children: g
						}),
						/* @__PURE__ */ E("button", {
							type: "button",
							onClick: () => {
								_();
							},
							className: "text-sm text-primary bg-transparent border border-border rounded-lg px-3 py-1 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
							children: "Retry"
						})
					]
				}) : c.length === 0 ? /* @__PURE__ */ D("div", {
					className: "py-4 text-center",
					children: [/* @__PURE__ */ E("div", {
						className: "text-sm font-semibold text-text-primary mb-1",
						children: "No groups yet"
					}), /* @__PURE__ */ E("div", {
						className: "text-sm text-text-tertiary",
						children: "Create a group or join a public one."
					})]
				}) : c.map((e) => /* @__PURE__ */ E(ye, {
					group: e,
					currentUserId: C,
					isSelected: x === e.groupId,
					onSelect: O,
					onDelete: u
				}, e.groupId))
			}),
			x && /* @__PURE__ */ D("div", {
				className: "mb-3",
				children: [
					/* @__PURE__ */ E(xe, { members: p }),
					(A === "owner" || A === "admin") && /* @__PURE__ */ E(be, {
						groupId: x,
						onInvite: d
					}),
					/* @__PURE__ */ E(Se, {
						rooms: n,
						groupId: x,
						selectedGroupRole: A,
						createGroupRoom: r,
						onRoomSelect: i,
						loading: a
					})
				]
			}),
			/* @__PURE__ */ E("button", {
				onClick: () => b((e) => !e),
				className: s("w-full h-9 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]", y && "mb-2"),
				children: y ? "Cancel" : "Create Group"
			}),
			y && /* @__PURE__ */ E(ve, {
				onCreate: T,
				onDiscard: () => b(!1),
				loading: m
			})
		]
	});
}
//#endregion
//#region src/components/social/ActivityPanel.tsx
function we() {
	return "";
}
var Q = 50;
function Te(e) {
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
function Ee(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function De(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function Oe({ idToken: e, sendMessage: t, onMessage: n, connectionState: r }) {
	let [i, a] = w([]), [s, c] = w(!0), [l, u] = w(!1), [d, f] = w(null), [p, m] = w(0), h = C(t);
	b(() => {
		h.current = t;
	}, [t]);
	let { toast: g } = o(), _ = De(e), v = y(() => m((e) => e + 1), []);
	return b(() => {
		let t = we();
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
	]), b(() => {
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
	}, [r, _]), b(() => n((e) => {
		if (e.type !== "activity:event") return;
		let t = e.payload;
		t && a((e) => e.length > 0 && e[0].timestamp === t.timestamp && e[0].eventType === t.eventType ? e : [{
			eventType: t.eventType,
			timestamp: t.timestamp,
			detail: t.detail
		}, ...e].slice(0, Q));
	}), [n]), {
		items: i,
		loading: s,
		isLive: l,
		error: d,
		retry: v
	};
}
function ke({ idToken: e, sendMessage: t, onMessage: n, connectionState: r }) {
	let { items: i, loading: a, isLive: o, error: c, retry: l } = Oe({
		idToken: e,
		sendMessage: t,
		onMessage: n,
		connectionState: r
	});
	return /* @__PURE__ */ D("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [/* @__PURE__ */ D("h2", {
			className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
			children: ["Activity", o && /* @__PURE__ */ E("span", {
				className: "inline-block w-2 h-2 rounded-full bg-success ml-2 align-middle",
				title: "Live"
			})]
		}), a ? /* @__PURE__ */ D("div", {
			className: "flex items-center gap-2 p-4 justify-center text-text-secondary",
			children: [/* @__PURE__ */ E("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }), "Loading..."]
		}) : c && i.length === 0 ? /* @__PURE__ */ D("div", {
			role: "alert",
			className: "py-6 px-4 text-center text-danger-fg text-sm flex flex-col items-center gap-2",
			children: [
				/* @__PURE__ */ E("span", { children: "Couldn't load activity" }),
				/* @__PURE__ */ E("span", {
					className: "text-text-secondary text-xs",
					children: c
				}),
				/* @__PURE__ */ E("button", {
					type: "button",
					onClick: l,
					className: "mt-1 px-3 py-1 text-xs font-medium text-info-fg bg-info-bg border border-info-border rounded cursor-pointer",
					children: "Retry"
				})
			]
		}) : i.length === 0 ? /* @__PURE__ */ E("div", {
			className: "py-10 text-center text-text-tertiary text-sm",
			children: "No activity yet"
		}) : /* @__PURE__ */ E("div", { children: i.map((e, t) => {
			let { icon: n, text: r } = Te(e);
			return /* @__PURE__ */ D("div", {
				className: s("flex flex-row items-center gap-2 py-2", t < i.length - 1 && "border-b border-surface-hover"),
				children: [
					/* @__PURE__ */ E("span", {
						className: "w-6 shrink-0 text-center",
						children: n
					}),
					/* @__PURE__ */ E("span", {
						className: "flex-1 text-sm text-text-primary",
						children: r
					}),
					/* @__PURE__ */ E("span", {
						className: "text-xs text-text-tertiary shrink-0",
						children: Ee(e.timestamp)
					})
				]
			}, t);
		}) })]
	});
}
//#endregion
//#region src/components/social/ReactionsBar.tsx
function Ae({ reactions: e, onReact: t, disabled: n = !1, pickerEmojis: r = v, addTriggerLabel: i, hideAddTrigger: a = !1, className: o }) {
	let [c, l] = w(!1), u = C(null), d = (e) => {
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
	return /* @__PURE__ */ D("div", {
		"data-testid": "reactions-bar",
		className: s("relative inline-flex flex-wrap items-center gap-1", o),
		children: [
			p.map((e) => /* @__PURE__ */ D("button", {
				type: "button",
				onClick: () => d(e.emoji),
				disabled: n,
				"aria-pressed": e.mine ?? !1,
				"data-testid": "reaction-chip",
				"data-emoji": e.emoji,
				"data-mine": e.mine ? "true" : "false",
				className: s("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs leading-none transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", e.mine ? "border-[var(--color-primary)] bg-[var(--color-primary)]/15 text-[var(--color-text-primary)]" : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/60 hover:text-[var(--color-text-primary)]", n && "opacity-50 cursor-not-allowed"),
				children: [/* @__PURE__ */ E("span", {
					"aria-hidden": !0,
					className: "text-sm leading-none",
					children: e.emoji
				}), /* @__PURE__ */ E("span", {
					className: "tabular-nums",
					children: e.count
				})]
			}, e.emoji)),
			!a && /* @__PURE__ */ D("button", {
				ref: u,
				type: "button",
				onClick: () => !n && l((e) => !e),
				disabled: n,
				"aria-haspopup": "dialog",
				"aria-expanded": c,
				"data-testid": "reactions-bar-add",
				className: s("inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-border)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", "h-6 min-w-6 px-1.5 text-xs text-[var(--color-text-secondary)] transition-colors", !n && "hover:border-[var(--color-primary)] hover:text-[var(--color-text-primary)]", n && "opacity-50 cursor-not-allowed"),
				children: [i ?? /* @__PURE__ */ E("span", {
					"aria-hidden": !0,
					children: "+ 😀"
				}), /* @__PURE__ */ E("span", {
					className: "sr-only",
					children: "Add reaction"
				})]
			}),
			/* @__PURE__ */ E(_, {
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
function $({ items: e, activeId: t, onSelect: n, className: r, "data-testid": i = "conversation-shelf" }) {
	return e.length === 0 ? null : /* @__PURE__ */ E("ul", {
		"data-testid": i,
		className: s("m-0 flex list-none flex-col gap-0.5 p-0", r),
		children: e.map((e) => {
			let r = e.id === t, a = e.count ?? 0;
			return /* @__PURE__ */ E("li", { children: /* @__PURE__ */ D("button", {
				type: "button",
				onClick: () => n(e.id),
				"data-testid": `${i}-${e.id}`,
				"data-active": r ? "true" : "false",
				"aria-current": r ? "true" : void 0,
				className: s("flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-left", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", "hover:bg-surface-hover", r && "bg-surface-hover"),
				children: [
					/* @__PURE__ */ E("span", {
						"aria-hidden": !0,
						className: "grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-surface-inset text-[13px]",
						children: e.icon ?? "•"
					}),
					/* @__PURE__ */ E("span", {
						className: s("min-w-0 flex-1 truncate text-[13px]", a > 0 ? "font-semibold text-text-primary" : "font-medium text-text-secondary"),
						children: e.label
					}),
					a > 0 && /* @__PURE__ */ E("span", {
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
function je({ shelf: e = [], conversations: t, selected: n = null, onSelect: r, onNewChat: i, grouped: a = !0, sectionOrder: o = "channels-first", emptyLabel: c, header: l, footer: u, className: d, "data-testid": f = "conversation-rail" }) {
	return /* @__PURE__ */ D("aside", {
		"data-testid": f,
		className: s("flex min-h-0 w-80 shrink-0 flex-col border-r border-border bg-surface", d),
		children: [
			l && /* @__PURE__ */ E("div", {
				className: "shrink-0",
				children: l
			}),
			e.length > 0 && /* @__PURE__ */ E($, {
				items: e,
				activeId: n?.kind === "shelf" ? n.id : null,
				onSelect: (e) => r({
					kind: "shelf",
					id: e
				}),
				className: "shrink-0 px-2 pt-2",
				"data-testid": `${f}-shelf`
			}),
			/* @__PURE__ */ E(R, {
				items: t,
				grouped: a,
				sectionOrder: o,
				activeChannel: n?.kind === "conversation" ? n.channel : null,
				onSelect: (e) => r({
					kind: "conversation",
					channel: e
				}),
				onNewChat: i,
				emptyLabel: c,
				className: "min-h-0 flex-1 overflow-y-auto p-2",
				"data-testid": `${f}-list`
			}),
			u && /* @__PURE__ */ E("div", {
				className: "shrink-0",
				children: u
			})
		]
	});
}
//#endregion
export { Ce as a, re as c, G as d, R as f, P as h, ke as i, ee as l, F as m, $ as n, me as o, I as p, Ae as r, Z as s, je as t, K as u };
