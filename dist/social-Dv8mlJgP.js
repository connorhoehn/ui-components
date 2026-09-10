import { a as e, i as t, n, o as r, r as i, t as a } from "./useSocialProfile-5S1qyvsv.js";
import { n as o } from "./ToastProvider-BKjV21G4.js";
import { t as s } from "./cn-DhjIN-s0.js";
import { t as c } from "./Button-cRZd1Oud.js";
import { t as l } from "./IconButton-C3DMtvSx.js";
import { n as u, t as d } from "./PresenceDot-wQL5_SbP.js";
import { t as f } from "./EmptyState-JzzL2z1E.js";
import { t as p } from "./Input-DLknWXri.js";
import { t as m } from "./Textarea-Dz4doxTv.js";
import { n as h, t as g } from "./Avatar-BzicCOft.js";
import { t as _ } from "./Select-CqVokE2v.js";
import { M as v, N as y } from "./ConversationSurface-BLs4tFPb.js";
import { t as b } from "./rovingFocus-Bj5Y6kwY.js";
import { n as x, t as S } from "./ReactionPickerPopover-CcL-n6gt.js";
import { n as C, t as w } from "./composerCommands-2lcV365k.js";
import { createContext as T, useCallback as E, useContext as D, useEffect as O, useId as k, useMemo as A, useRef as j, useState as M } from "react";
import { Fragment as N, jsx as P, jsxs as F } from "react/jsx-runtime";
//#region src/components/social/SocialPanel.tsx
function I(e, t) {
	return {
		id: e.userId,
		displayName: e.displayName,
		bio: "",
		avatarUrl: e.avatarUrl ?? null,
		visibility: e.visibility,
		followState: t
	};
}
function L(e) {
	return {
		id: e.userId,
		displayName: e.displayName,
		bio: e.bio ?? "",
		avatarUrl: e.avatarUrl ?? null,
		visibility: e.visibility
	};
}
function R({ user: e, size: t }) {
	let n = e.displayName.slice(0, 2).toUpperCase();
	return e.avatarUrl ? /* @__PURE__ */ P("div", {
		className: s("rounded-full bg-border flex items-center justify-center font-semibold text-text-primary shrink-0 overflow-hidden", t === 48 ? "w-12 h-12 text-base" : "w-8 h-8 text-xs"),
		children: /* @__PURE__ */ P("img", {
			src: e.avatarUrl,
			alt: `${e.displayName}'s avatar`,
			className: "w-full h-full object-cover"
		})
	}) : /* @__PURE__ */ P("div", {
		className: s("rounded-full bg-border flex items-center justify-center font-semibold text-text-primary shrink-0 overflow-hidden", t === 48 ? "w-12 h-12 text-base" : "w-8 h-8 text-xs"),
		"aria-label": `Avatar placeholder for ${e.displayName}`,
		children: n
	});
}
function z({ targetUser: e, followState: t, compact: n = !1, onFollowChange: r }) {
	let [i, a] = M(!1);
	return t === "not-following" ? /* @__PURE__ */ P("button", {
		className: s("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border-none font-[system-ui,-apple-system,sans-serif] bg-primary text-white font-semibold", n ? "h-7" : "h-9"),
		onClick: () => {
			r(e.id, "pending");
		},
		"aria-label": `Follow ${e.displayName}`,
		children: "Follow"
	}) : t === "pending" ? /* @__PURE__ */ P("button", {
		className: s("rounded-lg text-sm min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface-hover text-text-secondary font-normal cursor-default", n ? "h-7" : "h-9"),
		disabled: !0,
		"aria-label": `Follow ${e.displayName}`,
		children: "Following…"
	}) : /* @__PURE__ */ F("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ P("button", {
			className: s("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface text-text-primary font-normal", n ? "h-7" : "h-9"),
			onClick: () => a(!0),
			"aria-label": `Unfollow ${e.displayName}`,
			children: "Following"
		}), i && /* @__PURE__ */ F("div", {
			role: "group",
			"aria-label": "Confirm unfollow",
			className: "flex gap-2 items-center",
			children: [
				/* @__PURE__ */ F("span", {
					className: "text-sm text-text-primary mr-1",
					children: [
						"Unfollow ",
						e.displayName,
						"?"
					]
				}),
				/* @__PURE__ */ P("button", {
					onClick: () => a(!1),
					className: "h-9 rounded-lg text-sm px-3 bg-surface text-text-primary border border-border cursor-pointer font-[system-ui,-apple-system,sans-serif]",
					children: "Keep Following"
				}),
				/* @__PURE__ */ P("button", {
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
function ee({ user: e, isOwnProfile: t, onSave: n }) {
	let [r, i] = M(!1), [a, o] = M(e.displayName), [c, l] = M(e.bio), [u, d] = M(e.avatarUrl ?? ""), [f, h] = M(e.visibility), [g, _] = M(!1), [v, y] = M(null), x = k();
	O(() => {
		o(e.displayName), l(e.bio), d(e.avatarUrl ?? ""), h(e.visibility);
	}, [e.id]);
	let S = async () => {
		_(!0), y(null);
		try {
			await n({
				displayName: a,
				bio: c,
				avatarUrl: u || void 0,
				visibility: f
			}), i(!1);
		} catch (e) {
			y(e instanceof Error ? e.message : "Failed to save profile");
		} finally {
			_(!1);
		}
	};
	return r ? /* @__PURE__ */ F("div", { children: [
		/* @__PURE__ */ F("div", {
			className: "mb-3",
			children: [/* @__PURE__ */ P("label", {
				htmlFor: `${x}-display-name`,
				className: "text-sm text-text-primary block mb-1",
				children: "Display name"
			}), /* @__PURE__ */ P(p, {
				id: `${x}-display-name`,
				value: a,
				onChange: (e) => o(e.target.value.slice(0, 50)),
				placeholder: "Your name",
				maxLength: 50
			})]
		}),
		/* @__PURE__ */ F("div", {
			className: "mb-3",
			children: [/* @__PURE__ */ P("label", {
				htmlFor: `${x}-bio`,
				className: "text-sm text-text-primary block mb-1",
				children: "Bio"
			}), /* @__PURE__ */ P(m, {
				id: `${x}-bio`,
				value: c,
				onChange: (e) => l(e.target.value.slice(0, 160)),
				placeholder: "Tell people a bit about yourself (max 160 characters)",
				maxLength: 160,
				rows: 3,
				className: "resize-y"
			})]
		}),
		/* @__PURE__ */ F("div", {
			className: "mb-4",
			children: [/* @__PURE__ */ P("label", {
				htmlFor: `${x}-avatar-url`,
				className: "text-sm text-text-primary block mb-1",
				children: "Avatar URL"
			}), /* @__PURE__ */ P(p, {
				id: `${x}-avatar-url`,
				value: u,
				onChange: (e) => d(e.target.value),
				placeholder: "https://example.com/avatar.png"
			})]
		}),
		/* @__PURE__ */ P("div", {
			className: "mb-4",
			children: /* @__PURE__ */ P("div", {
				role: "radiogroup",
				"aria-label": "Profile visibility",
				onKeyDown: (e) => b(e, { itemSelector: "[role=\"radio\"]" }),
				className: "flex gap-2",
				children: ["public", "private"].map((e) => /* @__PURE__ */ P("button", {
					type: "button",
					role: "radio",
					"aria-checked": f === e,
					tabIndex: f === e ? 0 : -1,
					onClick: () => h(e),
					className: s("px-4 py-1 rounded-full text-sm cursor-pointer border border-border font-[system-ui,-apple-system,sans-serif]", f === e ? "bg-primary text-white" : "bg-surface text-text-primary"),
					children: e.charAt(0).toUpperCase() + e.slice(1)
				}, e))
			})
		}),
		/* @__PURE__ */ F("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ P("button", {
				onClick: () => {
					S();
				},
				disabled: g,
				className: s("flex-1 h-9 bg-primary text-white border-none rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", g ? "cursor-default" : "cursor-pointer"),
				children: g ? "Saving…" : "Save Changes"
			}), /* @__PURE__ */ P("button", {
				onClick: () => i(!1),
				className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Discard Changes"
			})]
		}),
		v && /* @__PURE__ */ P("div", {
			role: "alert",
			"data-testid": "profile-save-error",
			className: "text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
			children: v
		})
	] }) : /* @__PURE__ */ F("div", { children: [
		/* @__PURE__ */ F("div", {
			className: "flex items-start gap-3 mb-3",
			children: [/* @__PURE__ */ P(R, {
				user: e,
				size: 48
			}), /* @__PURE__ */ F("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ F("div", {
					className: "flex items-center gap-2 mb-1",
					children: [/* @__PURE__ */ P("span", {
						className: "text-xl font-semibold text-text-primary",
						children: e.displayName
					}), /* @__PURE__ */ P("span", {
						className: s("text-xs px-2 py-0.5 rounded", e.visibility === "public" ? "bg-success-bg text-success" : "bg-surface-hover text-text-secondary"),
						children: e.visibility === "public" ? "Public" : "Private"
					})]
				}), /* @__PURE__ */ P("p", {
					className: "text-base text-text-primary m-0 overflow-hidden line-clamp-3",
					children: e.bio
				})]
			})]
		}),
		/* @__PURE__ */ F("div", {
			className: "flex gap-4 text-sm text-text-secondary mb-3",
			children: [
				/* @__PURE__ */ F("span", { children: [/* @__PURE__ */ P("strong", {
					className: "text-text-primary",
					children: e.followersCount ?? "—"
				}), " Followers"] }),
				/* @__PURE__ */ F("span", { children: [/* @__PURE__ */ P("strong", {
					className: "text-text-primary",
					children: e.followingCount ?? "—"
				}), " Following"] }),
				/* @__PURE__ */ F("span", { children: [/* @__PURE__ */ P("strong", {
					className: "text-text-primary",
					children: e.friendsCount ?? "—"
				}), " Friends"] })
			]
		}),
		t && /* @__PURE__ */ P("button", {
			onClick: () => i(!0),
			className: "text-sm text-primary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
			children: "Edit profile"
		})
	] });
}
function B({ followers: e, following: t, friends: n, followStates: r, onFollowChange: i, loadError: a }) {
	let [o, c] = M("followers"), l = (e) => a ? "" : ` (${e.length})`, u = [
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
	return /* @__PURE__ */ F("div", {
		className: "mt-4",
		children: [/* @__PURE__ */ P("div", {
			role: "tablist",
			"aria-label": "Connections",
			onKeyDown: b,
			className: "flex border-b border-border mb-3",
			children: u.map((e) => /* @__PURE__ */ P("button", {
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
		}), /* @__PURE__ */ P("div", {
			role: "tabpanel",
			id: "social-tabpanel",
			"aria-labelledby": `social-tab-${o}`,
			className: "min-h-[120px]",
			children: a && f.length === 0 ? /* @__PURE__ */ F("div", {
				role: "alert",
				"data-testid": "social-graph-error",
				className: "py-6 text-center",
				children: [/* @__PURE__ */ P("div", {
					className: "text-sm font-semibold text-danger-fg mb-1",
					children: "Couldn’t load your connections"
				}), /* @__PURE__ */ P("div", {
					className: "text-sm text-text-tertiary",
					children: a
				})]
			}) : f.length === 0 ? /* @__PURE__ */ F("div", {
				className: "py-6 text-center",
				children: [/* @__PURE__ */ P("div", {
					className: "text-sm font-semibold text-text-primary mb-1",
					children: d[o].heading
				}), /* @__PURE__ */ P("div", {
					className: "text-sm text-text-tertiary",
					children: d[o].body
				})]
			}) : /* @__PURE__ */ P("div", { children: f.map((e) => /* @__PURE__ */ F("div", {
				className: "flex items-center gap-2 h-14 border-b border-surface-hover",
				children: [
					/* @__PURE__ */ P(R, {
						user: e,
						size: 32
					}),
					/* @__PURE__ */ F("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ P("div", {
							className: "text-base text-text-primary",
							children: e.displayName
						}), /* @__PURE__ */ P("div", {
							className: "text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap max-w-[240px]",
							children: e.visibility === "private" ? /* @__PURE__ */ P("em", {
								className: "text-text-tertiary",
								children: "This profile is private."
							}) : e.bio
						})]
					}),
					/* @__PURE__ */ P(z, {
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
function V({ idToken: t, onMessage: n }) {
	let { profile: r, loading: i, error: o, updateProfile: s } = a({ idToken: t }), { followers: c, following: l, friends: u, follow: d, unfollow: f, error: p, loadError: m } = e({ idToken: t }), h = new Set(l.map((e) => e.userId)), g = {};
	[
		...c,
		...l,
		...u
	].forEach((e) => {
		g[e.userId] = h.has(e.userId) ? "following" : "not-following";
	});
	let [_, v] = M(null), y = async (e, t) => {
		v(null);
		try {
			t === "following" || t === "pending" ? await d(e) : await f(e);
		} catch (e) {
			v(e instanceof Error ? e.message : "Follow action failed");
		}
	}, b = c.map((e) => I(e, g[e.userId] ?? "not-following")), x = l.map((e) => I(e, "following")), S = u.map((e) => I(e, "following")), C = r ? {
		...L(r),
		followersCount: m ? void 0 : c.length,
		followingCount: m ? void 0 : l.length,
		friendsCount: m ? void 0 : u.length
	} : null;
	return /* @__PURE__ */ F("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ P("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
				children: "Social Profile"
			}),
			i && !C ? /* @__PURE__ */ P("div", {
				className: "py-10 text-center text-text-tertiary text-sm",
				children: "Loading profile…"
			}) : C ? /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ P(ee, {
				user: C,
				isOwnProfile: !0,
				onSave: s
			}), /* @__PURE__ */ P(B, {
				followers: b,
				following: x,
				friends: S,
				followStates: g,
				onFollowChange: y,
				loadError: m
			})] }) : null,
			(_ ?? o ?? p) && /* @__PURE__ */ P("div", {
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
function H(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64);
}
function te({ people: e, onStartDm: t, onCreateChannel: n, onCancel: r, peopleError: i = null, busy: a = !1, className: o, "data-testid": c = "new-conversation" }) {
	let [l, u] = M(""), d = j(null), f = A(() => {
		let t = l.trim().toLowerCase();
		return t ? e.filter((e) => e.displayName.toLowerCase().includes(t)) : e;
	}, [e, l]), m = H(l), h = !!n && m.length > 0;
	return /* @__PURE__ */ F("div", {
		"data-testid": c,
		className: s("flex flex-col gap-1 rounded-lg border border-border bg-surface p-2", o),
		children: [/* @__PURE__ */ F("div", {
			className: "flex items-center gap-1.5",
			children: [/* @__PURE__ */ P(p, {
				ref: d,
				size: "sm",
				autoFocus: !0,
				value: l,
				onChange: (e) => u(e.target.value),
				onKeyDown: (e) => {
					e.key === "Escape" && r?.(), e.key === "Enter" && (f.length === 1 ? t(f[0].userId) : f.length === 0 && h && n?.(m));
				},
				placeholder: "Search people, or name a new channel",
				"aria-label": "Search people, or name a new channel",
				"data-testid": `${c}-query`,
				disabled: a,
				className: "min-w-0 flex-1"
			}), r && /* @__PURE__ */ P("button", {
				type: "button",
				onClick: r,
				disabled: a,
				"data-testid": `${c}-cancel`,
				className: "rounded px-2 py-1 text-xs text-text-secondary hover:bg-surface-hover",
				children: "Cancel"
			})]
		}), i ? /* @__PURE__ */ F("p", {
			role: "alert",
			"data-testid": `${c}-error`,
			className: "m-0 px-1 py-1.5 text-xs text-danger-fg",
			children: ["Couldn’t load people. ", i]
		}) : /* @__PURE__ */ F("ul", {
			className: "m-0 flex max-h-64 list-none flex-col gap-0.5 overflow-y-auto p-0",
			children: [
				f.map((e) => /* @__PURE__ */ P("li", { children: /* @__PURE__ */ F("button", {
					type: "button",
					onClick: () => void t(e.userId),
					disabled: a,
					"data-testid": `${c}-person`,
					className: "flex w-full items-center gap-2 rounded px-1.5 py-1.5 text-left hover:bg-surface-hover",
					children: [/* @__PURE__ */ P(g, {
						name: e.displayName,
						src: e.avatarUrl,
						color: e.color,
						size: 26
					}), /* @__PURE__ */ F("span", {
						className: "flex min-w-0 flex-col",
						children: [/* @__PURE__ */ P("span", {
							className: "truncate text-[13px] text-text-primary",
							children: e.displayName
						}), e.hint && /* @__PURE__ */ P("span", {
							className: "truncate text-[11px] text-text-tertiary",
							children: e.hint
						})]
					})]
				}) }, e.userId)),
				f.length === 0 && !h && /* @__PURE__ */ P("li", {
					className: "px-1.5 py-2 text-xs text-text-secondary",
					"data-testid": `${c}-empty`,
					children: l.trim() ? "Nobody by that name." : "Nobody to talk to yet."
				}),
				h && /* @__PURE__ */ P("li", { children: /* @__PURE__ */ F("button", {
					type: "button",
					onClick: () => void n?.(m),
					disabled: a,
					"data-testid": `${c}-create-channel`,
					className: "flex w-full items-center gap-2 rounded px-1.5 py-1.5 text-left hover:bg-surface-hover",
					children: [/* @__PURE__ */ P("span", {
						"aria-hidden": !0,
						className: "grid h-[26px] w-[26px] shrink-0 place-items-center rounded-lg bg-surface-inset text-sm text-text-secondary",
						children: "#"
					}), /* @__PURE__ */ F("span", {
						className: "min-w-0 truncate text-[13px] text-text-primary",
						children: ["Create channel ", /* @__PURE__ */ F("span", {
							className: "font-semibold",
							children: ["#", m]
						})]
					})]
				}) })
			]
		})]
	});
}
//#endregion
//#region src/components/social/ConversationList.tsx
function ne(e, t) {
	let n = e.lastMessageAt ? Date.parse(e.lastMessageAt) : NaN, r = t.lastMessageAt ? Date.parse(t.lastMessageAt) : NaN, i = Number.isNaN(n) ? null : n, a = Number.isNaN(r) ? null : r;
	return i === null && a === null ? 0 : i === null ? 1 : a === null ? -1 : a - i;
}
function U({ items: e, grouped: t = !1, sectionOrder: n = "channels-first", sortByRecency: r = !0, maxVisible: i, activeChannel: a, onSelect: o, onNewChat: c, emptyLabel: l = "No conversations yet", tone: u = "light", className: f, "data-testid": p }) {
	let m = u === "dark", _ = r ? [...e].sort(ne) : e, v = [];
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
	let [b, x] = M(() => /* @__PURE__ */ new Set()), S = v.map((e) => {
		let t = i !== void 0 && i >= 0 && e.items.length > i;
		if (!t || b.has(e.label)) return {
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
	}), C = (e) => x((t) => {
		let n = new Set(t);
		return n.has(e) ? n.delete(e) : n.add(e), n;
	}), w = S.flatMap((e) => e.shown), T = j(null), [E, D] = M(null), k = (E && w.some((e) => e.channel === E) ? E : null) ?? (a && w.some((e) => e.channel === a) ? a : null) ?? w[0]?.channel ?? null, A = j(null);
	O(() => {
		let e = A.current;
		if (!e) return;
		A.current = null;
		let t = T.current?.querySelector(`[data-testid="conversation-row"][data-channel="${CSS.escape(e)}"]`);
		t?.focus(), t?.scrollIntoView({ block: "nearest" });
	});
	function N(e) {
		let t = Math.max(0, Math.min(w.length - 1, e)), n = w[t];
		!n || n.channel === k || (A.current = n.channel, D(n.channel));
	}
	function I(e) {
		if (w.length === 0) return;
		let t = w.findIndex((e) => e.channel === k), n = t < 0 ? 0 : t;
		switch (e.key) {
			case "ArrowDown":
				N(n + 1);
				break;
			case "ArrowUp":
				N(n - 1);
				break;
			case "Home":
				N(0);
				break;
			case "End":
				N(w.length - 1);
				break;
			default: return;
		}
		e.preventDefault();
	}
	return /* @__PURE__ */ F("div", {
		className: s("flex min-h-0 flex-col gap-1", f),
		"data-testid": p,
		children: [c && /* @__PURE__ */ F("button", {
			type: "button",
			onClick: c,
			"data-testid": "conversation-new-chat",
			className: s("flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] font-medium", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", m ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"),
			children: [/* @__PURE__ */ P("span", {
				"aria-hidden": "true",
				className: s("grid h-6 w-6 place-items-center rounded-full border border-dashed text-sm leading-none", m ? "border-white/30" : "border-border"),
				children: "+"
			}), "New chat"]
		}), e.length === 0 ? /* @__PURE__ */ P("p", {
			className: s("m-0 px-2 py-1.5 text-[13px]", m ? "text-white/60" : "text-text-secondary"),
			"data-testid": "conversation-empty",
			children: l
		}) : /* @__PURE__ */ P("div", {
			ref: T,
			onKeyDown: I,
			className: "m-0 flex min-h-0 flex-col overflow-y-auto p-0",
			children: S.map((e) => /* @__PURE__ */ F("div", { children: [
				e.heading && /* @__PURE__ */ P("p", {
					"data-testid": "conversation-section",
					"aria-hidden": !0,
					className: s("m-0 px-2 pb-0.5 pt-3 text-[11px] font-semibold uppercase tracking-wide", m ? "text-white/40" : "text-text-tertiary"),
					children: e.heading
				}),
				/* @__PURE__ */ P("ul", {
					className: "m-0 flex list-none flex-col gap-0.5 p-0",
					"aria-label": e.label,
					children: e.shown.map((e) => {
						let t = e.channel === a, n = e.channel === k, r = e.kind ?? (e.peers.length > 1 ? "group" : "dm"), i = r === "channel", c = r === "group", l = e.peers[0], u = i ? e.name ?? e.channel : e.peers.map((e) => e.displayName).join(", "), f = e.lastMessageAt ? y(e.lastMessageAt) : "", p = e.unreadCount ?? 0, _ = !!e.mentioned, v = !!e.live;
						return /* @__PURE__ */ P("li", { children: /* @__PURE__ */ F("button", {
							type: "button",
							onClick: () => o(e.channel),
							onFocus: () => D(e.channel),
							"data-testid": "conversation-row",
							"data-channel": e.channel,
							"data-active": t ? "true" : "false",
							"aria-current": t ? "true" : void 0,
							tabIndex: n ? 0 : -1,
							className: s("flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-left", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", m ? "hover:bg-white/10" : "hover:bg-surface-hover", t && (m ? "bg-white/10" : "bg-surface-hover")),
							children: [
								i ? /* @__PURE__ */ P("span", {
									"aria-hidden": "true",
									"data-testid": "conversation-channel-glyph",
									className: s("grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[15px] font-semibold leading-none", m ? "bg-white/10 text-white/70" : "bg-surface-inset text-text-secondary"),
									children: "#"
								}) : c ? /* @__PURE__ */ P(h, {
									size: 28,
									maxVisible: 2,
									items: e.peers.map((e) => ({
										name: e.displayName,
										color: e.color,
										src: e.avatarUrl
									}))
								}) : l ? /* @__PURE__ */ F("span", {
									className: "relative inline-flex shrink-0",
									children: [/* @__PURE__ */ P(g, {
										name: l.displayName,
										color: l.color,
										src: l.avatarUrl,
										size: 28
									}), l.online !== void 0 && /* @__PURE__ */ P(d, {
										state: l.online ? "online" : "offline",
										pulse: !1,
										className: s("absolute -bottom-0.5 -right-0.5 rounded-full ring-2", m ? "ring-call-chrome" : "ring-surface")
									})]
								}) : null,
								/* @__PURE__ */ F("span", {
									className: "flex min-w-0 flex-1 flex-col",
									children: [/* @__PURE__ */ F("span", {
										className: "flex items-baseline gap-2",
										children: [/* @__PURE__ */ P("span", {
											className: s("min-w-0 flex-1 truncate text-[13px]", p > 0 ? "font-semibold" : "font-medium", m ? "text-white" : "text-text-primary"),
											children: u
										}), f && /* @__PURE__ */ P("span", {
											className: s("shrink-0 text-[11px] tabular-nums", m ? "text-white/50" : "text-text-tertiary"),
											"data-testid": "conversation-time",
											children: f
										})]
									}), e.lastMessagePreview && /* @__PURE__ */ P("span", {
										className: s("truncate text-[12px]", m ? "text-white/60" : "text-text-secondary"),
										"data-testid": "conversation-preview",
										children: e.lastMessagePreview
									})]
								}),
								v && /* @__PURE__ */ F("span", {
									"data-testid": "conversation-live",
									"aria-label": "Call in progress",
									title: "Call in progress",
									className: "inline-flex shrink-0 items-center gap-1 rounded-full bg-danger px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none tracking-wide text-white",
									children: [/* @__PURE__ */ P("span", {
										"aria-hidden": !0,
										className: "h-1.5 w-1.5 rounded-full bg-white"
									}), "Live"]
								}),
								_ && /* @__PURE__ */ P("span", {
									"data-testid": "conversation-mention",
									"aria-label": "You were mentioned",
									title: "You were mentioned",
									className: "grid h-5 w-5 shrink-0 place-items-center rounded-full bg-danger text-[11px] font-bold leading-none text-white",
									children: "@"
								}),
								p > 0 && /* @__PURE__ */ P("span", {
									"data-testid": "conversation-unread",
									className: "grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-primary px-1.5 text-[11px] font-semibold leading-none text-white",
									children: p > 99 ? "99+" : p
								})
							]
						}) }, e.channel);
					})
				}),
				e.capped && /* @__PURE__ */ P("button", {
					type: "button",
					onClick: () => C(e.label),
					"aria-expanded": e.hidden === 0,
					"data-testid": "conversation-show-more",
					className: s("mt-0.5 flex w-full cursor-pointer items-center rounded-lg px-2 py-1 text-left text-[12px] font-medium", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", m ? "text-white/60 hover:bg-white/10 hover:text-white" : "text-text-tertiary hover:bg-surface-hover hover:text-text-primary"),
					children: e.hidden > 0 ? `Show ${e.hidden} more` : "Show less"
				})
			] }, e.label))
		})]
	});
}
//#endregion
//#region src/components/social/ChatRoom.tsx
var re = [
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
function ie(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) >>> 0;
	return re[t % re.length];
}
function ae(e) {
	let t = e.split(/[\s._@-]/);
	return t.length >= 2 ? (t[0][0] + t[1][0]).toUpperCase() : e.slice(0, 2).toUpperCase();
}
function oe(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : new Date(e).toLocaleDateString();
}
function se(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function ce({ post: e, isOwn: t, showSender: n }) {
	let r = ie(e.authorId);
	return /* @__PURE__ */ F("div", {
		className: s("flex items-end gap-2", t ? "flex-row-reverse" : "flex-row", n ? "pt-2 px-4 pb-0.5" : "py-px px-4"),
		children: [/* @__PURE__ */ P("div", {
			className: "w-8 shrink-0 self-end",
			children: !t && n && /* @__PURE__ */ P("div", {
				className: "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white select-none",
				style: { background: r },
				children: ae(e.authorId)
			})
		}), /* @__PURE__ */ F("div", {
			className: s("max-w-[68%] flex flex-col gap-0.5", t ? "items-end" : "items-start"),
			children: [
				!t && n && /* @__PURE__ */ P("span", {
					className: "text-[11px] font-semibold pl-1",
					style: { color: r },
					children: e.authorId
				}),
				/* @__PURE__ */ P("div", {
					className: s("px-3.5 py-2 text-sm leading-relaxed break-words transition-opacity duration-200", t ? "bg-primary text-white rounded-[18px_18px_4px_18px]" : "bg-surface-hover text-text-primary rounded-[4px_18px_18px_18px]", e._fadeIn ? "opacity-0" : "opacity-100"),
					children: e.content
				}),
				n && /* @__PURE__ */ P("span", {
					className: "text-[10px] text-text-tertiary px-1",
					children: oe(e.createdAt)
				})
			]
		})]
	});
}
function le({ idToken: e, roomId: t, roomName: r, onMessage: i }) {
	let { posts: a, createPost: o, loading: c, hasMore: l, loadMore: u, error: d, loadError: f } = n({
		idToken: e,
		roomId: t,
		onMessage: i
	}), [m, h] = M(""), [g, _] = M(!1), [v, y] = M(null), b = j(null), x = se(e), S = [...a].reverse(), C = a[0]?.postId;
	O(() => {
		C && b.current?.scrollIntoView({ behavior: "smooth" });
	}, [C]);
	let w = async () => {
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
	return /* @__PURE__ */ F("div", {
		className: "flex flex-col h-full bg-surface rounded-lg border border-border overflow-hidden",
		children: [
			/* @__PURE__ */ P("div", {
				className: "flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface shrink-0",
				children: /* @__PURE__ */ F("span", {
					className: "text-[15px] font-semibold text-text-primary",
					children: ["# ", r]
				})
			}),
			/* @__PURE__ */ F("div", {
				className: "flex-1 overflow-y-auto flex flex-col pb-1",
				children: [
					l && /* @__PURE__ */ P("div", {
						className: "text-center py-2",
						children: /* @__PURE__ */ P("button", {
							onClick: () => void u(),
							disabled: c,
							className: s("text-xs text-text-secondary bg-transparent border border-border rounded-full px-3.5 py-0.5 font-[inherit]", c ? "cursor-default" : "cursor-pointer"),
							children: c ? "Loading…" : "Load earlier"
						})
					}),
					c && S.length === 0 ? /* @__PURE__ */ P("div", {
						className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px]",
						children: "Loading messages…"
					}) : f && S.length === 0 ? /* @__PURE__ */ F("div", {
						role: "alert",
						className: "flex-1 flex flex-col items-center justify-center gap-1.5 px-6 text-center",
						children: [
							/* @__PURE__ */ P("span", {
								className: "text-[28px]",
								children: "⚠️"
							}),
							/* @__PURE__ */ P("span", {
								className: "text-sm font-semibold text-danger-fg",
								children: "Couldn’t load messages"
							}),
							/* @__PURE__ */ P("span", {
								className: "text-[13px] text-text-tertiary",
								children: f
							})
						]
					}) : S.length === 0 ? /* @__PURE__ */ F("div", {
						className: "flex-1 flex flex-col items-center justify-center text-text-tertiary gap-1.5",
						children: [
							/* @__PURE__ */ P("span", {
								className: "text-[28px]",
								children: "💬"
							}),
							/* @__PURE__ */ P("span", {
								className: "text-sm font-semibold text-text-primary",
								children: "No messages yet"
							}),
							/* @__PURE__ */ P("span", {
								className: "text-[13px]",
								children: "Be the first to say something!"
							})
						]
					}) : S.map((e, t) => {
						let n = e.authorId === x, r = S[t - 1], i = !r || r.authorId !== e.authorId || new Date(e.createdAt).getTime() - new Date(r.createdAt).getTime() > 3e5;
						return /* @__PURE__ */ P(ce, {
							post: e,
							isOwn: n,
							showSender: i
						}, e.postId);
					}),
					/* @__PURE__ */ P("div", { ref: b })
				]
			}),
			(d || v) && /* @__PURE__ */ P("div", {
				className: "px-4 py-1.5 bg-danger-bg border-t border-danger-border text-xs text-danger-fg",
				children: v ?? d
			}),
			/* @__PURE__ */ F("div", {
				className: "flex items-center gap-2 px-3 py-2.5 border-t border-border bg-surface shrink-0",
				children: [/* @__PURE__ */ P(p, {
					value: m,
					onChange: (e) => h(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && !e.shiftKey && (e.preventDefault(), w());
					},
					placeholder: `Message #${r}…`,
					disabled: g,
					className: "flex-1 rounded-[22px] px-4"
				}), /* @__PURE__ */ P("button", {
					onClick: () => void w(),
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
function ue({ userId: t, displayName: n, idToken: r, rooms: i, createRoom: a, createDM: o, createGroupRoom: c, roomsLoading: l, roomsError: u, onRoomsRetry: d, handleRoomSelect: f, activeRoomId: p, onMessage: m }) {
	let [h, g] = M(!0), _ = h ? 240 : 0, [v, y] = M({}), b = j(p);
	O(() => {
		b.current = p;
	}, [p]);
	let x = E((e) => {
		y((t) => {
			if (!t[e.roomId]) return t;
			let n = { ...t };
			return delete n[e.roomId], n;
		}), f(e);
	}, [f]);
	O(() => m((e) => {
		if (e.type === "social:post") {
			let t = (e.payload ?? e).roomId;
			t && t !== b.current && y((e) => ({
				...e,
				[t]: (e[t] ?? 0) + 1
			}));
		}
	}), [m]);
	let [S, C] = M(!1), [w, T] = M(!1), { friends: D, loadError: k } = e({ idToken: r }), N = n ? n.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2) : t.slice(0, 2).toUpperCase(), I = i.find((e) => e.roomId === p) ?? null, L = i.filter((e) => e.type === "standalone" || e.type === "group"), R = i.filter((e) => e.type === "dm"), z = A(() => [...L.map((e) => ({
		channel: e.roomId,
		kind: "channel",
		name: e.name,
		peers: [],
		unreadCount: v[e.roomId] ?? 0
	})), ...R.map((e) => ({
		channel: e.roomId,
		kind: "dm",
		peers: [{
			userId: e.dmPeerUserId ?? e.roomId,
			displayName: e.name
		}],
		unreadCount: v[e.roomId] ?? 0
	}))], [
		L,
		R,
		v
	]), ee = E((e) => {
		let t = i.find((t) => t.roomId === e);
		t && x(t);
	}, [i, x]), B = "var(--color-border)", V = "var(--color-text-primary)", H = "var(--color-text-secondary)";
	return /* @__PURE__ */ F("div", {
		className: "flex overflow-hidden rounded-lg transition-colors duration-200 h-[calc(100vh-120px)]",
		style: {
			background: "var(--color-surface)",
			border: `1px solid ${B}`
		},
		children: [/* @__PURE__ */ F("div", {
			className: s("shrink-0 flex-col overflow-hidden transition-[width] duration-[180ms]", h ? "flex" : "hidden"),
			style: {
				width: _,
				borderRight: `1px solid ${B}`,
				background: "var(--color-surface-panel)"
			},
			children: [/* @__PURE__ */ F("div", {
				className: "flex items-center gap-2 shrink-0 px-[14px] pt-[14px] pb-3",
				style: { borderBottom: `1px solid ${B}` },
				children: [
					/* @__PURE__ */ P("div", {
						className: "w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-[11px] shrink-0 bg-[linear-gradient(135deg,#646cff,#9b59b6)]",
						children: N
					}),
					/* @__PURE__ */ F("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ P("div", {
							className: "text-[13px] font-bold overflow-hidden text-ellipsis whitespace-nowrap",
							style: { color: V },
							children: n || t
						}), /* @__PURE__ */ F("div", {
							className: "text-[11px] flex items-center gap-1",
							style: { color: H },
							children: [/* @__PURE__ */ P("span", { className: "w-1.5 h-1.5 rounded-full bg-success inline-block" }), "Active"]
						})]
					}),
					/* @__PURE__ */ P("button", {
						onClick: () => g(!1),
						title: "Collapse sidebar",
						className: "bg-transparent border-none cursor-pointer text-base leading-none px-1 py-0.5 rounded",
						style: { color: H },
						children: "«"
					})
				]
			}), /* @__PURE__ */ P("div", {
				className: "flex-1 overflow-y-auto pt-2",
				children: /* @__PURE__ */ F("div", {
					className: "px-1 pt-1",
					children: [l && z.length === 0 ? /* @__PURE__ */ P("div", {
						className: "px-2 py-2 text-xs",
						style: { color: H },
						children: "Loading…"
					}) : u && z.length === 0 ? /* @__PURE__ */ P("div", {
						role: "alert",
						"data-testid": "conversations-error",
						className: "px-2 py-2 text-xs text-danger-fg",
						children: "Couldn’t load conversations"
					}) : /* @__PURE__ */ P(U, {
						items: z,
						activeChannel: p ?? null,
						onSelect: ee,
						onNewChat: () => C((e) => !e),
						emptyLabel: "No conversations yet",
						"data-testid": "social-conversations"
					}), S && /* @__PURE__ */ P("div", {
						className: "px-1 pt-1.5",
						children: /* @__PURE__ */ P(te, {
							people: D.map((e) => ({
								userId: e.userId,
								displayName: e.displayName,
								avatarUrl: e.avatarUrl
							})),
							peopleError: k,
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
		}), /* @__PURE__ */ F("div", {
			className: "flex-1 min-w-0 flex flex-col",
			children: [!h && /* @__PURE__ */ F("div", {
				className: "flex items-center gap-2 px-3 py-1.5",
				style: { borderBottom: `1px solid ${B}` },
				children: [/* @__PURE__ */ P("button", {
					onClick: () => g(!0),
					title: "Expand sidebar",
					className: "bg-transparent rounded cursor-pointer text-sm px-2 py-0.5 font-[inherit]",
					style: {
						border: `1px solid ${B}`,
						color: H
					},
					children: "»"
				}), I && /* @__PURE__ */ F("span", {
					className: "text-[13px] font-semibold",
					style: { color: V },
					children: [
						I.type === "dm" ? "●" : "#",
						" ",
						I.name
					]
				})]
			}), /* @__PURE__ */ P("div", {
				className: "flex-1 min-h-0",
				children: I ? /* @__PURE__ */ P(le, {
					idToken: r,
					roomId: I.roomId,
					roomName: I.name,
					onMessage: m
				}, I.roomId) : /* @__PURE__ */ F("div", {
					className: "h-full flex flex-col items-center justify-center gap-2",
					style: { color: H },
					children: [
						/* @__PURE__ */ P("span", {
							className: "text-4xl",
							children: "💬"
						}),
						/* @__PURE__ */ P("span", {
							className: "text-[15px] font-semibold",
							style: { color: V },
							children: "Select a room to start chatting"
						}),
						/* @__PURE__ */ P("span", {
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
function de({ author: e, avatarUrl: t, mine: n = !1, messages: r, className: i }) {
	return r.length === 0 ? null : /* @__PURE__ */ P("div", {
		"data-testid": "message-group",
		"data-author": e,
		"data-row-count": r.length,
		className: s("flex flex-col", i),
		children: r.map((r, i) => /* @__PURE__ */ P(v, {
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
function fe({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = M(""), [a, o] = M(null), c = async (t) => {
		if (t.preventDefault(), r.trim()) {
			o(null);
			try {
				await e(r.trim()), i("");
			} catch (e) {
				o(e instanceof Error ? e.message : "Failed to create room");
			}
		}
	};
	return /* @__PURE__ */ F("form", {
		onSubmit: (e) => {
			c(e);
		},
		className: "my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border",
		children: [
			/* @__PURE__ */ P(p, {
				size: "sm",
				value: r,
				onChange: (e) => i(e.target.value.slice(0, 50)),
				placeholder: "Room name",
				maxLength: 50,
				required: !0,
				autoFocus: !0,
				className: "mb-1.5"
			}),
			/* @__PURE__ */ F("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ P("button", {
					type: "submit",
					disabled: !r.trim() || n,
					className: s("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !r.trim() || n ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: n ? "Creating…" : "Create"
				}), /* @__PURE__ */ P("button", {
					type: "button",
					onClick: t,
					className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
					children: "Cancel"
				})]
			}),
			a && /* @__PURE__ */ P("div", {
				className: "text-danger-fg text-[11px] mt-1",
				children: a
			})
		]
	});
}
function pe({ onCreateDM: e, loading: t, friends: n, friendsError: r }) {
	let [i, a] = M(""), [o, c] = M(!1), [l, u] = M(null), d = async (t) => {
		if (t.preventDefault(), i.trim()) {
			u(null);
			try {
				await e(i.trim()), a(""), c(!1);
			} catch (e) {
				u(e instanceof Error ? e.message : "Failed to open DM");
			}
		}
	};
	return o ? /* @__PURE__ */ F("form", {
		onSubmit: (e) => {
			d(e);
		},
		className: "my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border",
		children: [
			/* @__PURE__ */ P(_, {
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
			r && n.length === 0 && /* @__PURE__ */ P("div", {
				role: "alert",
				"data-testid": "dm-friends-error",
				className: "text-danger-fg text-[11px] mb-1.5",
				children: r
			}),
			/* @__PURE__ */ F("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ P("button", {
					type: "submit",
					disabled: !i.trim() || t || n.length === 0,
					className: s("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !i.trim() || t ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: "Open DM"
				}), /* @__PURE__ */ P("button", {
					type: "button",
					onClick: () => c(!1),
					className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
					children: "Cancel"
				})]
			}),
			l && /* @__PURE__ */ P("div", {
				className: "text-danger-fg text-[11px] mt-1",
				children: l
			})
		]
	}) : /* @__PURE__ */ P("button", {
		onClick: () => c(!0),
		className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded mb-1",
		children: "+ New DM"
	});
}
function me({ room: e, isActive: t, onClick: n }) {
	return /* @__PURE__ */ F("button", {
		type: "button",
		onClick: n,
		"aria-pressed": t,
		className: s("flex items-center h-14 border-b border-surface-hover cursor-pointer pr-2", "w-full text-left font-[inherit]", t ? "bg-surface-hover border-l-[3px] border-l-primary pl-[13px]" : "bg-transparent border-l-[3px] border-l-transparent"),
		children: [/* @__PURE__ */ P("div", {
			className: s("flex-1 text-base text-text-primary", t ? "font-semibold" : "font-normal"),
			children: e.name
		}), /* @__PURE__ */ P("span", {
			className: ((e) => e === "standalone" ? "bg-accent-bg text-primary text-xs px-2 py-0.5 rounded" : e === "group" ? "bg-info-bg text-info text-xs px-2 py-0.5 rounded" : "bg-success-bg text-success text-xs px-2 py-0.5 rounded")(e.type),
			children: e.type
		})]
	});
}
function he({ room: e, isActive: t, onClick: n }) {
	return /* @__PURE__ */ F("button", {
		onClick: n,
		className: s("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]", t ? "bg-accent-bg text-accent-fg font-semibold" : "bg-transparent text-text-primary font-normal"),
		children: [/* @__PURE__ */ P("span", {
			className: s("text-[13px] shrink-0", t ? "text-primary" : "text-text-tertiary"),
			children: e.type === "dm" ? "●" : "#"
		}), /* @__PURE__ */ P("span", {
			className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1",
			children: e.name
		})]
	});
}
function W({ message: e, onRetry: t, compact: n }) {
	return /* @__PURE__ */ F("div", {
		role: "alert",
		className: s("text-center flex flex-col items-center gap-1.5", n ? "px-2 py-3" : "px-4 py-6"),
		children: [
			/* @__PURE__ */ P("div", {
				className: s("font-semibold text-danger-fg", n ? "text-xs" : "text-sm"),
				children: "Couldn't load rooms"
			}),
			/* @__PURE__ */ P("div", {
				className: s("text-text-secondary", n ? "text-[11px]" : "text-xs"),
				children: e
			}),
			t && /* @__PURE__ */ P("button", {
				type: "button",
				onClick: t,
				className: s("mt-1 font-medium text-info-fg bg-info-bg border border-info-border rounded cursor-pointer font-[system-ui,-apple-system,sans-serif]", n ? "px-2.5 py-0.5 text-[11px]" : "px-3.5 py-1 text-xs"),
				children: "Retry"
			})
		]
	});
}
function ge({ idToken: t, rooms: n, createRoom: r, createDM: i, loading: a, error: o, onRetry: s, onRoomSelect: c, activeRoomId: l, compact: u }) {
	let { friends: d, loadError: f } = e({ idToken: t }), [p, m] = M(!1), h = async (e) => {
		await r(e), m(!1);
	};
	return u ? /* @__PURE__ */ F("div", {
		className: "px-2 pt-2",
		children: [
			/* @__PURE__ */ P("button", {
				onClick: () => m((e) => !e),
				className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
				children: "+ New Room"
			}),
			p && /* @__PURE__ */ P(fe, {
				onCreate: h,
				onDiscard: () => m(!1),
				loading: a
			}),
			/* @__PURE__ */ P(pe, {
				onCreateDM: i,
				loading: a,
				friends: d,
				friendsError: f
			}),
			/* @__PURE__ */ P("div", { children: a && n.length === 0 ? /* @__PURE__ */ P("div", {
				className: "p-2 text-text-tertiary text-xs text-center",
				children: "Loading…"
			}) : o && n.length === 0 ? /* @__PURE__ */ P(W, {
				message: o,
				onRetry: s,
				compact: !0
			}) : n.length === 0 ? /* @__PURE__ */ P("div", {
				className: "px-2 py-3 text-text-tertiary text-xs",
				children: "No rooms yet"
			}) : n.map((e) => /* @__PURE__ */ P(he, {
				room: e,
				isActive: e.roomId === l,
				onClick: () => c(e)
			}, e.roomId)) })
		]
	}) : /* @__PURE__ */ F("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ P("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
				children: "Rooms"
			}),
			/* @__PURE__ */ P("button", {
				onClick: () => m((e) => !e),
				className: "w-full h-9 mb-2 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Create Room"
			}),
			p && /* @__PURE__ */ P(fe, {
				onCreate: h,
				onDiscard: () => m(!1),
				loading: a
			}),
			/* @__PURE__ */ P(pe, {
				onCreateDM: i,
				loading: a,
				friends: d,
				friendsError: f
			}),
			/* @__PURE__ */ P("div", {
				className: "max-h-80 overflow-y-auto",
				children: a && n.length === 0 ? /* @__PURE__ */ F("div", {
					className: "flex items-center gap-2 p-4 justify-center text-text-secondary",
					children: [/* @__PURE__ */ P("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }), "Loading..."]
				}) : o && n.length === 0 ? /* @__PURE__ */ P(W, {
					message: o,
					onRetry: s
				}) : n.length === 0 ? /* @__PURE__ */ F("div", {
					className: "py-6 text-center",
					children: [/* @__PURE__ */ P("div", {
						className: "text-sm font-semibold text-text-primary mb-1",
						children: "No rooms yet"
					}), /* @__PURE__ */ P("div", {
						className: "text-sm text-text-tertiary",
						children: "Create a room or ask to be added."
					})]
				}) : n.map((e) => /* @__PURE__ */ P(me, {
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
function _e(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function ve(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function ye({ onSubmit: e, placeholder: t = "Write a reply…", loading: n }) {
	let [r, i] = M(""), [a, o] = M(null), c = async (t) => {
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
	return /* @__PURE__ */ F("form", {
		onSubmit: (e) => {
			c(e);
		},
		className: "flex flex-wrap gap-2 mt-2",
		children: [
			/* @__PURE__ */ P(p, {
				value: r,
				onChange: (e) => i(e.target.value),
				placeholder: t,
				className: "flex-1"
			}),
			/* @__PURE__ */ P("button", {
				type: "submit",
				disabled: !r.trim() || n,
				className: s("h-7 px-2.5 rounded-md text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !r.trim() || n ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
				children: "Comment"
			}),
			a && /* @__PURE__ */ P("div", {
				role: "alert",
				"data-testid": "comment-submit-error",
				className: "basis-full text-danger-fg text-[13px]",
				children: a
			})
		]
	});
}
function be({ comment: e, currentUserId: t, loading: n, onDelete: r, onReply: i }) {
	let [a, o] = M(!1), [s, c] = M(!1), [l, u] = M(+!e._fadeIn);
	O(() => {
		if (e._fadeIn) {
			let e = setTimeout(() => u(1), 10);
			return () => clearTimeout(e);
		}
	}, []);
	let d = e.authorId === t, f = !!e.parentCommentId, p = e.authorId.slice(0, 2).toUpperCase(), m = /* @__PURE__ */ P("div", {
		style: { opacity: l },
		className: "transition-opacity duration-200 ease-[ease]",
		children: /* @__PURE__ */ F("div", {
			className: "flex items-start gap-2",
			children: [/* @__PURE__ */ P("div", {
				className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
				children: p
			}), /* @__PURE__ */ F("div", {
				className: "flex-1",
				children: [
					/* @__PURE__ */ F("div", {
						className: "flex items-center gap-2 mb-0.5",
						children: [/* @__PURE__ */ P("span", {
							className: "text-sm font-semibold text-text-primary",
							children: e.authorId
						}), /* @__PURE__ */ P("span", {
							className: "text-xs text-text-tertiary",
							children: _e(e.createdAt)
						})]
					}),
					/* @__PURE__ */ P("div", {
						className: "text-sm text-text-primary mb-1",
						children: e.content
					}),
					/* @__PURE__ */ F("div", {
						className: "flex gap-2 items-center",
						children: [
							/* @__PURE__ */ P("button", {
								onClick: () => c((e) => !e),
								className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
								children: "Reply"
							}),
							d && !a && /* @__PURE__ */ P("button", {
								onClick: () => o(!0),
								className: "text-sm text-text-tertiary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
								"aria-label": "Delete comment",
								children: "Delete"
							}),
							d && a && /* @__PURE__ */ F("div", {
								role: "group",
								"aria-label": "Confirm delete comment",
								className: "flex gap-1.5 items-center",
								children: [
									/* @__PURE__ */ P("span", {
										className: "text-xs text-text-primary",
										children: "Delete this comment?"
									}),
									/* @__PURE__ */ P("button", {
										onClick: () => o(!1),
										className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
										children: "Cancel"
									}),
									/* @__PURE__ */ P("button", {
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
					s && /* @__PURE__ */ P(ye, {
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
	return f ? /* @__PURE__ */ P("div", {
		className: "pl-8 py-2",
		children: m
	}) : /* @__PURE__ */ P("div", {
		className: "py-2 border-b border-surface-hover",
		children: m
	});
}
function xe({ idToken: e, roomId: t, postId: n, onMessage: i }) {
	let { comments: a, createComment: o, deleteComment: s, loading: c, submitting: l, error: u } = r({
		idToken: e,
		roomId: t,
		postId: n,
		onMessage: i
	}), d = ve(e), f = async (e, t) => {
		await o(t, e);
	};
	return /* @__PURE__ */ F("div", {
		className: "pt-2 pl-2 border-t border-surface-hover",
		children: [
			c ? /* @__PURE__ */ P("div", {
				className: "text-sm text-text-tertiary py-2",
				children: "Loading comments…"
			}) : u && a.length === 0 ? /* @__PURE__ */ P("div", {
				role: "alert",
				className: "text-sm text-danger-fg py-2",
				children: u
			}) : a.length === 0 ? /* @__PURE__ */ P("div", {
				className: "text-sm text-text-tertiary text-center py-4",
				children: "No comments yet"
			}) : a.map((e) => /* @__PURE__ */ P(be, {
				comment: e,
				currentUserId: d,
				loading: l,
				onDelete: s,
				onReply: f
			}, e.commentId)),
			u && a.length > 0 && /* @__PURE__ */ P("div", {
				role: "alert",
				"data-testid": "comment-thread-error",
				className: "text-sm text-danger-fg py-1",
				children: u
			}),
			/* @__PURE__ */ P(ye, {
				onSubmit: (e) => o(e),
				placeholder: "Write a comment…",
				loading: l
			})
		]
	});
}
//#endregion
//#region src/components/social/PostFeed.tsx
var Se = [
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
function Ce(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function we(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function Te({ onCreate: e, loading: t }) {
	let [n, r] = M(""), [i, a] = M(null), o = async (t) => {
		if (t.preventDefault(), n.trim()) {
			a(null);
			try {
				await e(n.trim()), r("");
			} catch (e) {
				a(e instanceof Error ? e.message : "Failed to create post");
			}
		}
	};
	return /* @__PURE__ */ F("form", {
		onSubmit: (e) => {
			o(e);
		},
		children: [
			/* @__PURE__ */ P(m, {
				value: n,
				onChange: (e) => r(e.target.value),
				placeholder: "What's on your mind?",
				maxLength: 1e4,
				rows: 3,
				className: "resize-y mb-2"
			}),
			/* @__PURE__ */ P("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ P("button", {
					type: "submit",
					disabled: !n.trim() || t,
					className: s("h-9 px-4 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !n.trim() || t ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
					children: t ? "Posting…" : "Post"
				})
			}),
			i && /* @__PURE__ */ P("div", {
				className: "text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
				children: i
			})
		]
	});
}
function Ee({ isLiked: e, likeCount: t, whoLiked: n, toggle: r }) {
	return /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ F("button", {
		onClick: () => void r(),
		"aria-label": "Like post",
		className: "bg-transparent border-none cursor-pointer flex items-center gap-1 p-0 font-[system-ui,-apple-system,sans-serif]",
		children: [/* @__PURE__ */ P("span", {
			className: s("text-base", e ? "text-primary" : "text-text-tertiary"),
			children: "❤"
		}), /* @__PURE__ */ P("span", {
			className: s("text-sm", e ? "text-primary" : "text-text-tertiary"),
			children: t
		})]
	}), n.length > 0 && /* @__PURE__ */ F("span", {
		className: "text-xs text-text-secondary ml-1",
		children: [
			"Liked by: ",
			n.slice(0, 3).map((e) => e.displayName).join(", "),
			n.length > 3 ? ` and ${n.length - 3} more` : ""
		]
	})] });
}
function De({ reactWithEmoji: e }) {
	return /* @__PURE__ */ P("div", {
		className: "flex flex-wrap gap-0",
		children: Se.map((t) => /* @__PURE__ */ P("button", {
			onClick: () => void e(t),
			className: "text-base bg-transparent border-none px-1 py-0.5 cursor-pointer",
			title: t,
			children: t
		}, t))
	});
}
function Oe({ post: e, idToken: t, roomId: n, currentUserId: r, onMessage: a, onEdit: o, onDelete: c }) {
	let { isLiked: l, likeCount: u, whoLiked: d, toggle: f, reactWithEmoji: p, error: h } = i({
		idToken: t,
		roomId: n,
		postId: e.postId,
		onMessage: a
	}), [g, _] = M(+!e._fadeIn), [v, y] = M(!1), [b, x] = M(!1), [S, C] = M(!1), [w, T] = M(e.content), [E, D] = M(null), k = async () => {
		D(null);
		try {
			await o(e.postId, w);
		} catch (e) {
			D(e instanceof Error ? e.message : "Failed to save post");
			return;
		}
		C(!1);
	}, A = async () => {
		D(null);
		try {
			await c(e.postId);
		} catch (e) {
			D(e instanceof Error ? e.message : "Failed to delete post");
			return;
		}
		x(!1);
	};
	O(() => {
		if (e._fadeIn) {
			let e = setTimeout(() => _(1), 10);
			return () => clearTimeout(e);
		}
	}, []);
	let j = e.authorId === r, N = e.authorId.slice(0, 2).toUpperCase();
	return /* @__PURE__ */ F("div", {
		style: { opacity: g },
		className: "border-b border-surface-hover pb-4 mb-4 transition-opacity duration-200 ease-[ease]",
		children: [
			/* @__PURE__ */ F("div", {
				className: "flex items-center gap-2 mb-2",
				children: [/* @__PURE__ */ P("div", {
					className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
					children: N
				}), /* @__PURE__ */ F("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ P("span", {
						className: "text-base font-semibold text-text-primary",
						children: e.authorId
					}), /* @__PURE__ */ P("span", {
						className: "text-sm text-text-tertiary ml-2",
						children: Ce(e.createdAt)
					})]
				})]
			}),
			S ? /* @__PURE__ */ F("div", {
				className: "mb-2",
				children: [/* @__PURE__ */ P(m, {
					value: w,
					onChange: (e) => T(e.target.value),
					rows: 3,
					className: "resize-y mb-2"
				}), /* @__PURE__ */ F("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ P("button", {
						onClick: () => {
							k();
						},
						disabled: !w.trim(),
						className: s("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", w.trim() ? "bg-primary text-white border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"),
						children: "Save"
					}), /* @__PURE__ */ P("button", {
						onClick: () => {
							C(!1), T(e.content);
						},
						className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Discard Changes"
					})]
				})]
			}) : /* @__PURE__ */ P("div", {
				className: "text-base text-text-primary mt-2 mb-2",
				children: e.content
			}),
			/* @__PURE__ */ F("div", {
				className: "flex gap-4 text-sm mt-1 items-center flex-wrap",
				children: [
					/* @__PURE__ */ P(Ee, {
						isLiked: l,
						likeCount: u,
						whoLiked: d,
						toggle: f
					}),
					/* @__PURE__ */ P(De, { reactWithEmoji: p }),
					/* @__PURE__ */ P("button", {
						onClick: () => y((e) => !e),
						className: "bg-transparent border-none text-sm text-text-secondary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Comment"
					}),
					j && !S && /* @__PURE__ */ P("button", {
						onClick: () => C(!0),
						className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Edit"
					}),
					j && !b && !S && /* @__PURE__ */ P("button", {
						onClick: () => x(!0),
						className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Delete"
					}),
					j && b && /* @__PURE__ */ F("div", {
						role: "group",
						"aria-label": "Confirm delete post",
						className: "flex gap-1.5 items-center",
						children: [
							/* @__PURE__ */ P("span", {
								className: "text-xs text-text-primary",
								children: "Delete this post?"
							}),
							/* @__PURE__ */ P("button", {
								onClick: () => x(!1),
								className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
								children: "Cancel"
							}),
							/* @__PURE__ */ P("button", {
								onClick: () => {
									A();
								},
								className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
								children: "Delete"
							})
						]
					})
				]
			}),
			(E ?? h) && /* @__PURE__ */ P("div", {
				role: "alert",
				"data-testid": "post-action-error",
				className: "text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
				children: E ?? h
			}),
			v && /* @__PURE__ */ P(xe, {
				idToken: t,
				roomId: n,
				postId: e.postId,
				onMessage: a
			})
		]
	});
}
function ke({ idToken: e, roomId: t, onMessage: r }) {
	let { posts: i, createPost: a, editPost: o, deletePost: c, loading: l, mutating: u, error: d, loadError: f, hasMore: p, loadMore: m } = n({
		idToken: e,
		roomId: t,
		onMessage: r
	}), h = we(e);
	return /* @__PURE__ */ F("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ P(Te, {
				onCreate: a,
				loading: l || u
			}),
			/* @__PURE__ */ P("div", { className: "border-t border-border my-4" }),
			p && /* @__PURE__ */ P("button", {
				onClick: () => void m(),
				disabled: l,
				className: s("w-full h-9 mb-4 bg-surface text-text-primary border border-border rounded-lg text-sm font-[system-ui,-apple-system,sans-serif]", l ? "cursor-default" : "cursor-pointer"),
				children: l ? "Loading…" : "Load more"
			}),
			d && i.length > 0 && /* @__PURE__ */ P("div", {
				role: "alert",
				"data-testid": "post-feed-error",
				className: "text-danger-fg text-[13px] mb-3 font-[system-ui,-apple-system,sans-serif]",
				children: d
			}),
			l && i.length === 0 ? /* @__PURE__ */ F("div", {
				className: "flex items-center gap-2 p-4 justify-center text-text-secondary",
				children: [/* @__PURE__ */ P("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }), "Loading..."]
			}) : f && i.length === 0 ? /* @__PURE__ */ F("div", {
				role: "alert",
				className: "py-6 text-center",
				children: [/* @__PURE__ */ P("div", {
					className: "text-sm font-semibold text-danger-fg mb-1",
					children: "Couldn’t load posts"
				}), /* @__PURE__ */ P("div", {
					className: "text-sm text-text-tertiary",
					children: f
				})]
			}) : i.length === 0 ? /* @__PURE__ */ F("div", {
				className: "py-6 text-center",
				children: [/* @__PURE__ */ P("div", {
					className: "text-sm font-semibold text-text-primary mb-1",
					children: "No posts yet"
				}), /* @__PURE__ */ P("div", {
					className: "text-sm text-text-tertiary",
					children: "Be the first to post in this room."
				})]
			}) : i.map((n) => /* @__PURE__ */ P(Oe, {
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
function Ae({ group: e, isSelected: t, onClick: n }) {
	return /* @__PURE__ */ F("button", {
		onClick: n,
		className: s("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]", t ? "bg-accent-bg text-accent-fg font-semibold" : "bg-transparent text-text-primary font-normal"),
		children: [/* @__PURE__ */ P("span", {
			className: s("text-xs shrink-0", t ? "text-primary" : "text-text-tertiary"),
			children: e.visibility === "private" ? "🔒" : "👥"
		}), /* @__PURE__ */ P("span", {
			className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1",
			children: e.name
		})]
	});
}
function je({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = M(""), [a, o] = M(null), c = async (t) => {
		if (t.preventDefault(), r.trim()) {
			o(null);
			try {
				await e(r.trim()), i("");
			} catch (e) {
				o(e instanceof Error ? e.message : "Failed to create group");
			}
		}
	};
	return /* @__PURE__ */ F("form", {
		onSubmit: (e) => {
			c(e);
		},
		className: "p-2 bg-surface-panel rounded-md border border-border my-1 mb-2",
		children: [
			/* @__PURE__ */ P(p, {
				size: "sm",
				value: r,
				onChange: (e) => i(e.target.value.slice(0, 50)),
				placeholder: "Group name",
				maxLength: 50,
				required: !0,
				autoFocus: !0,
				className: "mb-1.5"
			}),
			/* @__PURE__ */ F("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ P("button", {
					type: "submit",
					disabled: !r.trim() || n,
					className: s("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !r.trim() || n ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: n ? "Creating…" : "Create"
				}), /* @__PURE__ */ P("button", {
					type: "button",
					onClick: t,
					className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
					children: "Cancel"
				})]
			}),
			a && /* @__PURE__ */ P("div", {
				className: "text-danger-fg text-[11px] mt-1",
				children: a
			})
		]
	});
}
function Me({ group: e, members: t, rooms: n, groupId: r, currentUserId: i, createGroupRoom: a, onRoomSelect: o, inviteUser: c, loading: l }) {
	let [u, d] = M(!1), [f, m] = M(""), [h, g] = M(null), [_, v] = M(!1), [y, b] = M(""), [x, S] = M(null), C = e.ownerId === i, w = n.filter((e) => e.groupId === r), T = async (e) => {
		if (e.preventDefault(), f.trim()) {
			g(null);
			try {
				await c(r, f.trim());
			} catch (e) {
				g(e instanceof Error ? e.message : "Failed to invite user");
				return;
			}
			m(""), d(!1);
		}
	}, E = async (e) => {
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
	return /* @__PURE__ */ F("div", {
		className: "px-2 pb-2 pt-1 border-t border-border mt-1",
		children: [
			/* @__PURE__ */ F("div", {
				className: "flex items-center justify-between mb-1",
				children: [/* @__PURE__ */ F("span", {
					className: "text-[11px] text-text-secondary font-semibold uppercase tracking-wide",
					children: [
						"Members (",
						t.length,
						")"
					]
				}), C && /* @__PURE__ */ P("button", {
					onClick: () => d((e) => !e),
					className: "text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]",
					children: "+ Invite"
				})]
			}),
			u && /* @__PURE__ */ F("form", {
				onSubmit: (e) => {
					T(e);
				},
				className: "flex gap-1 mb-1.5",
				children: [/* @__PURE__ */ P(p, {
					size: "sm",
					value: f,
					onChange: (e) => m(e.target.value),
					placeholder: "User ID",
					className: "flex-1"
				}), /* @__PURE__ */ P("button", {
					type: "submit",
					disabled: !f.trim(),
					className: s("h-6 px-2 border-none rounded text-[11px] font-[inherit]", f.trim() ? "bg-primary text-white cursor-pointer" : "bg-border text-text-tertiary cursor-default"),
					children: "Invite"
				})]
			}),
			u && h && /* @__PURE__ */ P("div", {
				role: "alert",
				"data-testid": "compact-invite-error",
				className: "text-danger-fg text-[11px] mb-1.5",
				children: h
			}),
			/* @__PURE__ */ F("div", {
				className: "flex flex-wrap gap-1 mb-2",
				children: [t.slice(0, 8).map((e) => /* @__PURE__ */ P("div", {
					title: e.displayName ?? e.userId,
					className: "w-6 h-6 rounded-full bg-border flex items-center justify-center text-[10px] font-semibold text-text-primary",
					children: (e.displayName ?? e.userId).slice(0, 2).toUpperCase()
				}, e.userId)), t.length > 8 && /* @__PURE__ */ F("span", {
					className: "text-[11px] text-text-tertiary self-center",
					children: ["+", t.length - 8]
				})]
			}),
			/* @__PURE__ */ F("div", {
				className: "flex items-center justify-between mb-1",
				children: [/* @__PURE__ */ F("span", {
					className: "text-[11px] text-text-secondary font-semibold uppercase tracking-wide",
					children: [
						"Rooms (",
						w.length,
						")"
					]
				}), C && /* @__PURE__ */ P("button", {
					onClick: () => v((e) => !e),
					className: "text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]",
					children: "+ Room"
				})]
			}),
			_ && /* @__PURE__ */ F("form", {
				onSubmit: (e) => {
					E(e);
				},
				className: "flex gap-1 mb-1.5",
				children: [/* @__PURE__ */ P(p, {
					size: "sm",
					value: y,
					onChange: (e) => b(e.target.value.slice(0, 50)),
					placeholder: "Room name",
					className: "flex-1"
				}), /* @__PURE__ */ P("button", {
					type: "submit",
					disabled: !y.trim() || l,
					className: s("h-6 px-2 border-none rounded text-[11px] font-[inherit]", !y.trim() || l ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: "Create"
				})]
			}),
			_ && x && /* @__PURE__ */ P("div", {
				role: "alert",
				"data-testid": "compact-group-room-error",
				className: "text-danger-fg text-[11px] mb-1.5",
				children: x
			}),
			w.map((e) => /* @__PURE__ */ F(o ? "button" : "div", {
				type: o ? "button" : void 0,
				onClick: o ? () => o(e) : void 0,
				className: s("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1 bg-transparent text-text-primary text-[13px] text-left font-[inherit]", o && "cursor-pointer"),
				children: [/* @__PURE__ */ P("span", {
					className: "text-text-tertiary text-xs",
					children: "#"
				}), /* @__PURE__ */ P("span", {
					className: "overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.name
				})]
			}, e.roomId))
		]
	});
}
function Ne({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = M(""), [a, o] = M("public"), [c, l] = M(null), u = k(), d = async (t) => {
		if (t.preventDefault(), r.trim()) {
			l(null);
			try {
				await e(r.trim(), void 0, a);
			} catch (e) {
				l(e instanceof Error ? e.message : "Failed to create group");
			}
		}
	};
	return /* @__PURE__ */ F("form", {
		onSubmit: (e) => {
			d(e);
		},
		className: "mb-3 p-3 bg-surface-panel rounded-lg border border-border",
		children: [
			/* @__PURE__ */ F("div", {
				className: "mb-3",
				children: [/* @__PURE__ */ P("label", {
					htmlFor: `${u}-group-name`,
					className: "text-sm text-text-primary block mb-1",
					children: "Group name"
				}), /* @__PURE__ */ P(p, {
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
			/* @__PURE__ */ F("div", {
				className: "flex items-center gap-2.5 mb-3.5",
				children: [
					/* @__PURE__ */ P("span", {
						className: "text-[13px] text-text-primary min-w-[42px]",
						children: a === "public" ? "Public" : "Private"
					}),
					/* @__PURE__ */ P("button", {
						type: "button",
						role: "switch",
						"aria-label": "Private group",
						"aria-checked": a === "private",
						onClick: () => o((e) => e === "public" ? "private" : "public"),
						className: s("relative w-11 h-6 rounded-xl border-none cursor-pointer p-0 shrink-0 transition-colors duration-200", a === "private" ? "bg-primary" : "bg-state-idle"),
						children: /* @__PURE__ */ P("span", { className: s("absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-[left] duration-200", a === "private" ? "left-[23px]" : "left-[3px]") })
					}),
					/* @__PURE__ */ P("span", {
						className: "text-xs text-text-tertiary",
						children: a === "public" ? "Visible to everyone" : "Invite only"
					})
				]
			}),
			/* @__PURE__ */ F("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ P("button", {
					type: "submit",
					disabled: !r.trim() || n,
					className: s("flex-1 h-9 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !r.trim() || n ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
					children: n ? "Creating…" : "Create Group"
				}), /* @__PURE__ */ P("button", {
					type: "button",
					onClick: t,
					className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
					children: "Cancel"
				})]
			}),
			c && /* @__PURE__ */ P("div", {
				id: `${u}-form-error`,
				role: "alert",
				className: "text-danger-fg text-[13px] mt-1.5",
				children: c
			})
		]
	});
}
function Pe({ group: e, currentUserId: t, isSelected: n, onSelect: r, onDelete: i }) {
	let [a, o] = M(null), c = e.ownerId === t;
	return /* @__PURE__ */ F("div", {
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
			/* @__PURE__ */ F("div", {
				className: "flex-1 min-w-0 pr-2",
				children: [/* @__PURE__ */ P("div", {
					className: s("text-base text-text-primary", n ? "font-semibold" : "font-normal"),
					children: e.name
				}), e.description && /* @__PURE__ */ P("div", {
					className: "text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.description
				})]
			}),
			/* @__PURE__ */ P("span", {
				className: s("text-xs px-2 py-0.5 rounded shrink-0 mr-2", e.visibility === "public" ? "bg-success-bg text-success" : "bg-surface-hover text-text-secondary"),
				children: e.visibility
			}),
			c && /* @__PURE__ */ P("div", {
				className: "shrink-0",
				onClick: (e) => e.stopPropagation(),
				children: a === e.groupId ? /* @__PURE__ */ F("div", {
					role: "group",
					"aria-label": "Confirm delete group",
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ P("button", {
						onClick: () => o(null),
						className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Cancel"
					}), /* @__PURE__ */ P("button", {
						onClick: () => {
							i(e.groupId), o(null);
						},
						className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Delete"
					})]
				}) : /* @__PURE__ */ P("button", {
					onClick: () => o(e.groupId),
					className: "text-xs text-danger-fg bg-transparent border-none cursor-pointer px-2 py-1 font-[system-ui,-apple-system,sans-serif]",
					"aria-label": `Delete group ${e.name}`,
					children: "Delete"
				})
			})
		]
	});
}
function Fe({ groupId: e, onInvite: t }) {
	let [n, r] = M(""), [i, a] = M(null), o = async (i) => {
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
	return /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ F("form", {
		onSubmit: (e) => {
			o(e);
		},
		className: "flex gap-2 mt-2",
		children: [/* @__PURE__ */ P(p, {
			className: "flex-1",
			value: n,
			onChange: (e) => r(e.target.value),
			placeholder: "User ID to invite"
		}), /* @__PURE__ */ P("button", {
			type: "submit",
			disabled: !n.trim(),
			className: s("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", n.trim() ? "bg-primary text-white border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"),
			children: "Invite"
		})]
	}), i && /* @__PURE__ */ P("div", {
		role: "alert",
		"data-testid": "invite-error",
		className: "text-danger-fg text-xs mt-1",
		children: i
	})] });
}
function Ie({ members: e }) {
	let t = (e) => e === "owner" ? "bg-success-bg text-success text-xs px-2 py-0.5 rounded" : e === "admin" ? "bg-info-bg text-info text-xs px-2 py-0.5 rounded" : "bg-surface-hover text-text-secondary text-xs px-2 py-0.5 rounded";
	return /* @__PURE__ */ P("div", {
		className: "max-h-[200px] overflow-y-auto mt-2 border-t border-border",
		children: e.map((e) => /* @__PURE__ */ F("div", {
			className: "flex items-center gap-2 h-12 border-b border-surface-hover",
			children: [
				/* @__PURE__ */ P("div", {
					className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
					children: (e.displayName ?? e.userId).slice(0, 2).toUpperCase()
				}),
				/* @__PURE__ */ P("div", {
					className: "flex-1 text-base text-text-primary",
					children: e.displayName ?? e.userId
				}),
				/* @__PURE__ */ P("span", {
					className: t(e.role),
					children: e.role
				})
			]
		}, e.userId))
	});
}
function Le({ rooms: e, groupId: t, selectedGroupRole: n, createGroupRoom: r, onRoomSelect: i, loading: a }) {
	let [o, c] = M(!1), [l, u] = M(""), [d, f] = M(null), m = e.filter((e) => e.groupId === t), h = async (e) => {
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
	return /* @__PURE__ */ F("div", {
		className: "mt-3",
		children: [
			/* @__PURE__ */ P("h3", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-2",
				children: "GROUP ROOMS"
			}),
			(n === "owner" || n === "admin") && (o ? /* @__PURE__ */ F("form", {
				onSubmit: (e) => {
					h(e);
				},
				className: "mb-2 p-3 bg-surface-panel rounded-lg border border-border",
				children: [/* @__PURE__ */ F("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ P(p, {
							className: "flex-1",
							value: l,
							onChange: (e) => u(e.target.value.slice(0, 50)),
							placeholder: "Room name",
							maxLength: 50,
							required: !0
						}),
						/* @__PURE__ */ P("button", {
							type: "submit",
							disabled: !l.trim() || a,
							className: s("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !l.trim() || a ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
							children: a ? "Creating…" : "Create Room"
						}),
						/* @__PURE__ */ P("button", {
							type: "button",
							onClick: () => c(!1),
							className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
							children: "Cancel"
						})
					]
				}), d && /* @__PURE__ */ P("div", {
					role: "alert",
					"data-testid": "group-room-error",
					className: "text-danger-fg text-[13px] mt-1.5",
					children: d
				})]
			}) : /* @__PURE__ */ P("button", {
				onClick: () => c(!0),
				className: "w-full h-9 mb-2 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Create Room"
			})),
			m.length === 0 ? /* @__PURE__ */ P("div", {
				className: "text-sm text-text-tertiary py-2",
				children: "No rooms in this group yet."
			}) : m.map((e) => /* @__PURE__ */ F("div", {
				role: i ? "button" : void 0,
				tabIndex: i ? 0 : void 0,
				"aria-label": i ? `Open room ${e.name}` : void 0,
				className: s("flex items-center h-12 border-b border-surface-hover pr-2", i && "cursor-pointer"),
				onClick: i ? () => i(e) : void 0,
				onKeyDown: i ? (t) => {
					(t.key === "Enter" || t.key === " ") && (t.preventDefault(), i(e));
				} : void 0,
				children: [/* @__PURE__ */ P("div", {
					className: "flex-1 text-base text-text-primary",
					children: e.name
				}), /* @__PURE__ */ P("span", {
					className: "bg-info-bg text-info text-xs px-2 py-0.5 rounded",
					children: "group"
				})]
			}, e.roomId))
		]
	});
}
function Re({ idToken: e, rooms: n, createGroupRoom: r, onRoomSelect: i, roomsLoading: a, compact: o }) {
	let { groups: c, createGroup: l, deleteGroup: u, inviteUser: d, loadMembers: f, members: p, loading: m, loaded: h, loadError: g, refresh: _ } = t({ idToken: e }), v = !h && !g, [y, b] = M(!1), [x, S] = M(null), C = e ? (() => {
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
		return /* @__PURE__ */ F("div", {
			className: "px-2 pt-2",
			children: [
				/* @__PURE__ */ P("button", {
					onClick: () => b((e) => !e),
					className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
					children: "+ New Group"
				}),
				y && /* @__PURE__ */ P(je, {
					onCreate: w,
					onDiscard: () => b(!1),
					loading: m
				}),
				/* @__PURE__ */ P("div", { children: v && c.length === 0 ? /* @__PURE__ */ P("div", {
					role: "status",
					className: "p-2 text-text-tertiary text-xs text-center",
					children: "Loading…"
				}) : g && c.length === 0 ? /* @__PURE__ */ F("div", {
					role: "alert",
					"data-testid": "compact-groups-load-error",
					className: "px-2 py-3 text-danger-fg text-xs",
					children: [
						/* @__PURE__ */ P("div", { children: "Couldn’t load groups." }),
						/* @__PURE__ */ P("div", {
							className: "text-text-tertiary mt-0.5",
							children: g
						}),
						/* @__PURE__ */ P("button", {
							type: "button",
							onClick: () => {
								_();
							},
							className: "mt-1 text-[11px] text-primary bg-transparent border-none cursor-pointer p-0 font-[inherit]",
							children: "Retry"
						})
					]
				}) : c.length === 0 ? /* @__PURE__ */ P("div", {
					className: "px-2 py-3 text-text-tertiary text-xs",
					children: "No groups yet"
				}) : c.map((e) => /* @__PURE__ */ P(Ae, {
					group: e,
					isSelected: e.groupId === x,
					onClick: () => T(e.groupId)
				}, e.groupId)) }),
				e && /* @__PURE__ */ P(Me, {
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
	return /* @__PURE__ */ F("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ P("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
				children: "Groups"
			}),
			/* @__PURE__ */ P("div", {
				className: "max-h-80 overflow-y-auto mb-3",
				children: v && c.length === 0 ? /* @__PURE__ */ P("div", {
					role: "status",
					className: "py-4 text-center text-sm text-text-tertiary",
					children: "Loading groups…"
				}) : g && c.length === 0 ? /* @__PURE__ */ F("div", {
					role: "alert",
					"data-testid": "groups-load-error",
					className: "py-4 text-center",
					children: [
						/* @__PURE__ */ P("div", {
							className: "text-sm font-semibold text-danger-fg mb-1",
							children: "Couldn’t load groups"
						}),
						/* @__PURE__ */ P("div", {
							className: "text-sm text-text-tertiary mb-2",
							children: g
						}),
						/* @__PURE__ */ P("button", {
							type: "button",
							onClick: () => {
								_();
							},
							className: "text-sm text-primary bg-transparent border border-border rounded-lg px-3 py-1 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
							children: "Retry"
						})
					]
				}) : c.length === 0 ? /* @__PURE__ */ F("div", {
					className: "py-4 text-center",
					children: [/* @__PURE__ */ P("div", {
						className: "text-sm font-semibold text-text-primary mb-1",
						children: "No groups yet"
					}), /* @__PURE__ */ P("div", {
						className: "text-sm text-text-tertiary",
						children: "Create a group or join a public one."
					})]
				}) : c.map((e) => /* @__PURE__ */ P(Pe, {
					group: e,
					currentUserId: C,
					isSelected: x === e.groupId,
					onSelect: T,
					onDelete: u
				}, e.groupId))
			}),
			x && /* @__PURE__ */ F("div", {
				className: "mb-3",
				children: [
					/* @__PURE__ */ P(Ie, { members: p }),
					(D === "owner" || D === "admin") && /* @__PURE__ */ P(Fe, {
						groupId: x,
						onInvite: d
					}),
					/* @__PURE__ */ P(Le, {
						rooms: n,
						groupId: x,
						selectedGroupRole: D,
						createGroupRoom: r,
						onRoomSelect: i,
						loading: a
					})
				]
			}),
			/* @__PURE__ */ P("button", {
				onClick: () => b((e) => !e),
				className: s("w-full h-9 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]", y && "mb-2"),
				children: y ? "Cancel" : "Create Group"
			}),
			y && /* @__PURE__ */ P(Ne, {
				onCreate: w,
				onDiscard: () => b(!1),
				loading: m
			})
		]
	});
}
//#endregion
//#region src/components/social/ActivityPanel.tsx
function ze() {
	return "";
}
var Be = 50;
function Ve(e) {
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
function He(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function Ue(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function We({ idToken: e, sendMessage: t, onMessage: n, connectionState: r }) {
	let [i, a] = M([]), [s, c] = M(!0), [l, u] = M(!1), [d, f] = M(null), [p, m] = M(0), h = j(t);
	O(() => {
		h.current = t;
	}, [t]);
	let { toast: g } = o(), _ = Ue(e), v = E(() => m((e) => e + 1), []);
	return O(() => {
		let t = ze();
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
	]), O(() => {
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
	}, [r, _]), O(() => n((e) => {
		if (e.type !== "activity:event") return;
		let t = e.payload;
		t && a((e) => e.length > 0 && e[0].timestamp === t.timestamp && e[0].eventType === t.eventType ? e : [{
			eventType: t.eventType,
			timestamp: t.timestamp,
			detail: t.detail
		}, ...e].slice(0, Be));
	}), [n]), {
		items: i,
		loading: s,
		isLive: l,
		error: d,
		retry: v
	};
}
function Ge({ idToken: e, sendMessage: t, onMessage: n, connectionState: r }) {
	let { items: i, loading: a, isLive: o, error: c, retry: l } = We({
		idToken: e,
		sendMessage: t,
		onMessage: n,
		connectionState: r
	});
	return /* @__PURE__ */ F("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [/* @__PURE__ */ F("h2", {
			className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
			children: ["Activity", o && /* @__PURE__ */ P("span", {
				className: "inline-block w-2 h-2 rounded-full bg-success ml-2 align-middle",
				title: "Live"
			})]
		}), a ? /* @__PURE__ */ F("div", {
			className: "flex items-center gap-2 p-4 justify-center text-text-secondary",
			children: [/* @__PURE__ */ P("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }), "Loading..."]
		}) : c && i.length === 0 ? /* @__PURE__ */ F("div", {
			role: "alert",
			className: "py-6 px-4 text-center text-danger-fg text-sm flex flex-col items-center gap-2",
			children: [
				/* @__PURE__ */ P("span", { children: "Couldn't load activity" }),
				/* @__PURE__ */ P("span", {
					className: "text-text-secondary text-xs",
					children: c
				}),
				/* @__PURE__ */ P("button", {
					type: "button",
					onClick: l,
					className: "mt-1 px-3 py-1 text-xs font-medium text-info-fg bg-info-bg border border-info-border rounded cursor-pointer",
					children: "Retry"
				})
			]
		}) : i.length === 0 ? /* @__PURE__ */ P("div", {
			className: "py-10 text-center text-text-tertiary text-sm",
			children: "No activity yet"
		}) : /* @__PURE__ */ P("div", { children: i.map((e, t) => {
			let { icon: n, text: r } = Ve(e);
			return /* @__PURE__ */ F("div", {
				className: s("flex flex-row items-center gap-2 py-2", t < i.length - 1 && "border-b border-surface-hover"),
				children: [
					/* @__PURE__ */ P("span", {
						className: "w-6 shrink-0 text-center",
						children: n
					}),
					/* @__PURE__ */ P("span", {
						className: "flex-1 text-sm text-text-primary",
						children: r
					}),
					/* @__PURE__ */ P("span", {
						className: "text-xs text-text-tertiary shrink-0",
						children: He(e.timestamp)
					})
				]
			}, t);
		}) })]
	});
}
//#endregion
//#region src/components/social/ReactionsBar.tsx
function Ke({ reactions: e, onReact: t, disabled: n = !1, pickerEmojis: r = S, addTriggerLabel: i, hideAddTrigger: a = !1, className: o }) {
	let [c, l] = M(!1), u = j(null), d = (e) => {
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
	return /* @__PURE__ */ F("div", {
		"data-testid": "reactions-bar",
		className: s("relative inline-flex flex-wrap items-center gap-1", o),
		children: [
			p.map((e) => /* @__PURE__ */ F("button", {
				type: "button",
				onClick: () => d(e.emoji),
				disabled: n,
				"aria-pressed": e.mine ?? !1,
				"data-testid": "reaction-chip",
				"data-emoji": e.emoji,
				"data-mine": e.mine ? "true" : "false",
				className: s("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs leading-none transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", e.mine ? "border-[var(--color-primary)] bg-[var(--color-primary)]/15 text-[var(--color-text-primary)]" : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/60 hover:text-[var(--color-text-primary)]", n && "opacity-50 cursor-not-allowed"),
				children: [/* @__PURE__ */ P("span", {
					"aria-hidden": !0,
					className: "text-sm leading-none",
					children: e.emoji
				}), /* @__PURE__ */ P("span", {
					className: "tabular-nums",
					children: e.count
				})]
			}, e.emoji)),
			!a && /* @__PURE__ */ F("button", {
				ref: u,
				type: "button",
				onClick: () => !n && l((e) => !e),
				disabled: n,
				"aria-haspopup": "dialog",
				"aria-expanded": c,
				"data-testid": "reactions-bar-add",
				className: s("inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-border)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", "h-6 min-w-6 px-1.5 text-xs text-[var(--color-text-secondary)] transition-colors", !n && "hover:border-[var(--color-primary)] hover:text-[var(--color-text-primary)]", n && "opacity-50 cursor-not-allowed"),
				children: [i ?? /* @__PURE__ */ P("span", {
					"aria-hidden": !0,
					children: "+ 😀"
				}), /* @__PURE__ */ P("span", {
					className: "sr-only",
					children: "Add reaction"
				})]
			}),
			/* @__PURE__ */ P(x, {
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
function qe({ items: e, activeId: t, onSelect: n, className: r, "data-testid": i = "conversation-shelf" }) {
	return e.length === 0 ? null : /* @__PURE__ */ P("ul", {
		"data-testid": i,
		className: s("m-0 flex list-none flex-col gap-0.5 p-0", r),
		children: e.map((e) => {
			let r = e.id === t, a = e.count ?? 0;
			return /* @__PURE__ */ P("li", { children: /* @__PURE__ */ F("button", {
				type: "button",
				onClick: () => n(e.id),
				"data-testid": `${i}-${e.id}`,
				"data-active": r ? "true" : "false",
				"aria-current": r ? "true" : void 0,
				className: s("flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-left", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", "hover:bg-surface-hover", r && "bg-surface-hover"),
				children: [
					/* @__PURE__ */ P("span", {
						"aria-hidden": !0,
						className: "grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-surface-inset text-[13px]",
						children: e.icon ?? "•"
					}),
					/* @__PURE__ */ P("span", {
						className: s("min-w-0 flex-1 truncate text-[13px]", a > 0 ? "font-semibold text-text-primary" : "font-medium text-text-secondary"),
						children: e.label
					}),
					a > 0 && /* @__PURE__ */ P("span", {
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
function Je({ shelf: e = [], conversations: t, selected: n = null, onSelect: r, onNewChat: i, grouped: a = !0, sectionOrder: o = "channels-first", maxVisible: c, emptyLabel: l, header: u, footer: d, className: f, "data-testid": p = "conversation-rail" }) {
	return /* @__PURE__ */ F("aside", {
		"data-testid": p,
		className: s("flex min-h-0 w-80 shrink-0 flex-col border-r border-border bg-surface", f),
		children: [
			u && /* @__PURE__ */ P("div", {
				className: "shrink-0",
				children: u
			}),
			e.length > 0 && /* @__PURE__ */ P(qe, {
				items: e,
				activeId: n?.kind === "shelf" ? n.id : null,
				onSelect: (e) => r({
					kind: "shelf",
					id: e
				}),
				className: "shrink-0 px-2 pt-2",
				"data-testid": `${p}-shelf`
			}),
			/* @__PURE__ */ P(U, {
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
				className: "min-h-0 flex-1 overflow-y-auto p-2",
				"data-testid": `${p}-list`
			}),
			d && /* @__PURE__ */ P("div", {
				className: "shrink-0",
				children: d
			})
		]
	});
}
//#endregion
//#region src/components/social/chatCommands.ts
var Ye = /^chat:dmg?:/;
function G(e) {
	return e.channelKind ?? (Ye.test(e.channel) ? "dm" : "room");
}
function K(e, t) {
	let n = e.scope ?? "always";
	if (typeof n == "function") return n(t);
	switch (n) {
		case "always": return !0;
		case "document-open": return t.sidePanel.current?.kind === "document";
		case "room": return G(t) === "room";
		case "dm": return G(t) === "dm";
		default: return !0;
	}
}
function q(e) {
	if (e.disabledHint) return e.disabledHint;
	switch (e.scope) {
		case "document-open": return "Open a document beside the chat first";
		case "room": return "Only in rooms";
		case "dm": return "Only in direct messages";
		default: return e.hint ?? "Not available here";
	}
}
function Xe(e, t) {
	return e.map((e) => {
		let { run: n, scope: r, disabledHint: i, ...a } = e;
		return K({ scope: r }, t) ? a : {
			...a,
			disabled: !0,
			hint: q({
				scope: r,
				disabledHint: i,
				hint: a.hint
			})
		};
	});
}
function Ze(e, t) {
	let n = C(e, t);
	return n ? {
		command: n,
		argumentText: w(e, n).trim()
	} : null;
}
var J = "doc", Y = "panel", X = "panel.";
function Qe(e) {
	return e instanceof URLSearchParams ? new URLSearchParams(e) : new URLSearchParams(e ?? "");
}
function $e(e) {
	e.delete(J), e.delete(Y);
	for (let t of [...e.keys()]) t.startsWith(X) && e.delete(t);
}
function et(e, t) {
	let n = Qe(t);
	if ($e(n), !e) return n;
	if (e.kind === "document") n.set(J, e.id);
	else {
		if (e.kind.includes(":")) throw Error(`A side panel kind cannot contain ':' (got "${e.kind}")`);
		n.set(Y, `${e.kind}:${e.id}`);
	}
	for (let [t, r] of Object.entries(e.params ?? {})) n.set(`${X}${t}`, r);
	return n;
}
function tt(e) {
	let t = Qe(e), n = {};
	for (let [e, r] of t.entries()) e.startsWith(X) && (n[e.slice(6)] = r);
	let r = (e) => Object.keys(n).length ? {
		...e,
		params: n
	} : e, i = t.get(J);
	if (i) return r({
		kind: "document",
		id: i
	});
	let a = t.get(Y);
	if (!a) return null;
	let o = a.indexOf(":");
	return o <= 0 || o === a.length - 1 ? null : r({
		kind: a.slice(0, o),
		id: a.slice(o + 1)
	});
}
//#endregion
//#region src/components/social/ChatCommandProvider.tsx
var Z = T(null);
function nt(...e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) for (let e of n ?? []) t.set(e.trigger.toLowerCase(), e);
	return [...t.values()];
}
function rt({ commands: e, children: t }) {
	let n = D(Z), [r, i] = M([]), a = E((e) => (i((t) => [...t, e]), () => i((t) => t.filter((t) => t !== e))), []), o = A(() => ({
		commands: nt(n?.commands, e, ...r),
		register: a
	}), [
		n?.commands,
		e,
		r,
		a
	]);
	return /* @__PURE__ */ P(Z.Provider, {
		value: o,
		children: t
	});
}
function it() {
	return D(Z)?.commands ?? at;
}
var at = [];
function ot(e) {
	let t = D(Z);
	if (!t) throw Error("useRegisterChatCommands needs a <ChatCommandProvider> above it");
	let { register: n } = t;
	O(() => {
		if (!(!e || e.length === 0)) return n(e);
	}, [n, e]);
}
function st() {
	let e = it();
	return E(async (t, n) => {
		let r = Ze(t, e);
		if (!r) return null;
		let { command: i, argumentText: a } = r;
		if (!K(i, n)) throw Error(`${i.trigger}: ${q(i)}`);
		return i.run({
			...n,
			text: t,
			argumentText: a
		});
	}, [e]);
}
//#endregion
//#region src/components/social/ChatSidePanelRegistry.tsx
var Q = T(null);
function ct({ renderers: e, children: t }) {
	let n = D(Q), r = A(() => ({
		...n ?? {},
		...e ?? {}
	}), [n, e]);
	return /* @__PURE__ */ P(Q.Provider, {
		value: r,
		children: t
	});
}
function lt() {
	return D(Q) ?? ut;
}
var ut = {};
function dt(e) {
	return lt()[e] ?? null;
}
function ft({ title: e, subtitle: t, onClose: n, onOpenFullPage: r, actions: i, children: a, className: o, "data-testid": d = "chat-side-panel" }) {
	return /* @__PURE__ */ F("section", {
		"aria-label": e,
		"data-testid": d,
		className: s("flex h-full min-h-0 flex-col border-l border-border bg-surface", o),
		children: [/* @__PURE__ */ F("header", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-1.5",
			children: [/* @__PURE__ */ F("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ P("span", {
					className: "truncate text-[12px] font-semibold text-text-secondary",
					"data-testid": `${d}-title`,
					children: e
				}), t && /* @__PURE__ */ P("span", {
					className: "truncate text-[11px] text-text-tertiary",
					"data-testid": `${d}-subtitle`,
					children: t
				})]
			}), /* @__PURE__ */ F(u, {
				gap: "xs",
				align: "center",
				wrap: !1,
				className: "shrink-0",
				children: [
					i,
					r && /* @__PURE__ */ P(c, {
						variant: "ghost",
						size: "sm",
						onClick: r,
						"data-testid": `${d}-open-full`,
						children: "Open full page"
					}),
					/* @__PURE__ */ P(l, {
						size: "sm",
						"aria-label": "Close panel",
						onClick: n,
						"data-testid": `${d}-close`,
						children: "✕"
					})
				]
			})]
		}), /* @__PURE__ */ P("div", {
			className: "min-h-0 flex-1 overflow-auto",
			children: a
		})]
	});
}
function $(e) {
	let t = e.replace(/[-_]+/g, " ").trim();
	return t ? t[0].toUpperCase() + t.slice(1) : "Panel";
}
function pt({ panel: e, onClose: t, onOpenFullPage: n, className: r, "data-testid": i = "chat-side-panel" }) {
	let a = dt(e.kind), [o, s] = M(null), c = A(() => ({
		close: t,
		openFullPage: n ? () => n(e) : void 0,
		setTitle: s
	}), [
		t,
		n,
		e
	]), l = o || e.title || $(e.kind);
	return /* @__PURE__ */ P(ft, {
		title: l,
		onClose: t,
		onOpenFullPage: c.openFullPage,
		className: r,
		"data-testid": i,
		children: a ? /* @__PURE__ */ P("div", {
			className: "flex h-full min-h-0 flex-col",
			"data-kind": e.kind,
			"data-id": e.id,
			children: a(e, c)
		}, `${e.kind}:${e.id}`) : /* @__PURE__ */ P(f, {
			size: "sm",
			icon: "🧩",
			title: `No view registered for ${e.kind}`,
			body: "Register a renderer for this kind with ChatSidePanelProvider.",
			testId: `${i}-empty`
		})
	});
}
//#endregion
export { U as A, Re as C, de as D, ge as E, H as M, V as N, ue as O, Ge as S, xe as T, tt as _, dt as a, qe as b, nt as c, st as d, G as f, Ze as g, K as h, $ as i, te as j, le as k, it as l, Xe as m, ft as n, lt as o, q as p, ct as r, rt as s, pt as t, ot as u, et as v, ke as w, Ke as x, Je as y };
