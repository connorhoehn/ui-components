import { a as e, i as t, n, o as r, r as i, t as a } from "./useSocialProfile-5S1qyvsv.js";
import { n as o } from "./ToastProvider-DPq8u2eM.js";
import { t as s } from "./cn-DhjIN-s0.js";
import { t as c } from "./PresenceDot-3gBZGPvX.js";
import { n as l, t as u } from "./Avatar-BzicCOft.js";
import { t as d } from "./Input-DcK2h-jK.js";
import { i as f, r as p } from "./PresencePanel-D_-C0sP7.js";
import { t as m } from "./Textarea-C3t5PCLv.js";
import { t as h } from "./rovingFocus-Bj5Y6kwY.js";
import { t as g } from "./Select-Z0TLUVeL.js";
import { useCallback as _, useEffect as v, useId as y, useLayoutEffect as b, useMemo as x, useRef as S, useState as C } from "react";
import { Fragment as w, jsx as T, jsxs as E } from "react/jsx-runtime";
import { Command as D } from "cmdk";
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
	return e.avatarUrl ? /* @__PURE__ */ T("div", {
		className: s("rounded-full bg-border flex items-center justify-center font-semibold text-text-primary shrink-0 overflow-hidden", t === 48 ? "w-12 h-12 text-base" : "w-8 h-8 text-xs"),
		children: /* @__PURE__ */ T("img", {
			src: e.avatarUrl,
			alt: `${e.displayName}'s avatar`,
			className: "w-full h-full object-cover"
		})
	}) : /* @__PURE__ */ T("div", {
		className: s("rounded-full bg-border flex items-center justify-center font-semibold text-text-primary shrink-0 overflow-hidden", t === 48 ? "w-12 h-12 text-base" : "w-8 h-8 text-xs"),
		"aria-label": `Avatar placeholder for ${e.displayName}`,
		children: n
	});
}
function j({ targetUser: e, followState: t, compact: n = !1, onFollowChange: r }) {
	let [i, a] = C(!1);
	return t === "not-following" ? /* @__PURE__ */ T("button", {
		className: s("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border-none font-[system-ui,-apple-system,sans-serif] bg-primary text-white font-semibold", n ? "h-7" : "h-9"),
		onClick: () => {
			r(e.id, "pending");
		},
		"aria-label": `Follow ${e.displayName}`,
		children: "Follow"
	}) : t === "pending" ? /* @__PURE__ */ T("button", {
		className: s("rounded-lg text-sm min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface-hover text-text-secondary font-normal cursor-default", n ? "h-7" : "h-9"),
		disabled: !0,
		"aria-label": `Follow ${e.displayName}`,
		children: "Following…"
	}) : /* @__PURE__ */ E("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ T("button", {
			className: s("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface text-text-primary font-normal", n ? "h-7" : "h-9"),
			onClick: () => a(!0),
			"aria-label": `Unfollow ${e.displayName}`,
			children: "Following"
		}), i && /* @__PURE__ */ E("div", {
			role: "group",
			"aria-label": "Confirm unfollow",
			className: "flex gap-2 items-center",
			children: [
				/* @__PURE__ */ E("span", {
					className: "text-sm text-text-primary mr-1",
					children: [
						"Unfollow ",
						e.displayName,
						"?"
					]
				}),
				/* @__PURE__ */ T("button", {
					onClick: () => a(!1),
					className: "h-9 rounded-lg text-sm px-3 bg-surface text-text-primary border border-border cursor-pointer font-[system-ui,-apple-system,sans-serif]",
					children: "Keep Following"
				}),
				/* @__PURE__ */ T("button", {
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
	let [r, i] = C(!1), [a, o] = C(e.displayName), [c, l] = C(e.bio), [u, f] = C(e.avatarUrl ?? ""), [p, g] = C(e.visibility), [_, b] = C(!1), [x, S] = C(null), w = y();
	v(() => {
		o(e.displayName), l(e.bio), f(e.avatarUrl ?? ""), g(e.visibility);
	}, [e.id]);
	let D = async () => {
		b(!0), S(null);
		try {
			await n({
				displayName: a,
				bio: c,
				avatarUrl: u || void 0,
				visibility: p
			}), i(!1);
		} catch (e) {
			S(e instanceof Error ? e.message : "Failed to save profile");
		} finally {
			b(!1);
		}
	};
	return r ? /* @__PURE__ */ E("div", { children: [
		/* @__PURE__ */ E("div", {
			className: "mb-3",
			children: [/* @__PURE__ */ T("label", {
				htmlFor: `${w}-display-name`,
				className: "text-sm text-text-primary block mb-1",
				children: "Display name"
			}), /* @__PURE__ */ T(d, {
				id: `${w}-display-name`,
				value: a,
				onChange: (e) => o(e.target.value.slice(0, 50)),
				placeholder: "Your name",
				maxLength: 50
			})]
		}),
		/* @__PURE__ */ E("div", {
			className: "mb-3",
			children: [/* @__PURE__ */ T("label", {
				htmlFor: `${w}-bio`,
				className: "text-sm text-text-primary block mb-1",
				children: "Bio"
			}), /* @__PURE__ */ T(m, {
				id: `${w}-bio`,
				value: c,
				onChange: (e) => l(e.target.value.slice(0, 160)),
				placeholder: "Tell people a bit about yourself (max 160 characters)",
				maxLength: 160,
				rows: 3,
				className: "resize-y"
			})]
		}),
		/* @__PURE__ */ E("div", {
			className: "mb-4",
			children: [/* @__PURE__ */ T("label", {
				htmlFor: `${w}-avatar-url`,
				className: "text-sm text-text-primary block mb-1",
				children: "Avatar URL"
			}), /* @__PURE__ */ T(d, {
				id: `${w}-avatar-url`,
				value: u,
				onChange: (e) => f(e.target.value),
				placeholder: "https://example.com/avatar.png"
			})]
		}),
		/* @__PURE__ */ T("div", {
			className: "mb-4",
			children: /* @__PURE__ */ T("div", {
				role: "radiogroup",
				"aria-label": "Profile visibility",
				onKeyDown: (e) => h(e, { itemSelector: "[role=\"radio\"]" }),
				className: "flex gap-2",
				children: ["public", "private"].map((e) => /* @__PURE__ */ T("button", {
					type: "button",
					role: "radio",
					"aria-checked": p === e,
					tabIndex: p === e ? 0 : -1,
					onClick: () => g(e),
					className: s("px-4 py-1 rounded-full text-sm cursor-pointer border border-border font-[system-ui,-apple-system,sans-serif]", p === e ? "bg-primary text-white" : "bg-surface text-text-primary"),
					children: e.charAt(0).toUpperCase() + e.slice(1)
				}, e))
			})
		}),
		/* @__PURE__ */ E("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ T("button", {
				onClick: () => {
					D();
				},
				disabled: _,
				className: s("flex-1 h-9 bg-primary text-white border-none rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", _ ? "cursor-default" : "cursor-pointer"),
				children: _ ? "Saving…" : "Save Changes"
			}), /* @__PURE__ */ T("button", {
				onClick: () => i(!1),
				className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Discard Changes"
			})]
		}),
		x && /* @__PURE__ */ T("div", {
			role: "alert",
			"data-testid": "profile-save-error",
			className: "text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
			children: x
		})
	] }) : /* @__PURE__ */ E("div", { children: [
		/* @__PURE__ */ E("div", {
			className: "flex items-start gap-3 mb-3",
			children: [/* @__PURE__ */ T(A, {
				user: e,
				size: 48
			}), /* @__PURE__ */ E("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ E("div", {
					className: "flex items-center gap-2 mb-1",
					children: [/* @__PURE__ */ T("span", {
						className: "text-xl font-semibold text-text-primary",
						children: e.displayName
					}), /* @__PURE__ */ T("span", {
						className: s("text-xs px-2 py-0.5 rounded", e.visibility === "public" ? "bg-success-bg text-success" : "bg-surface-hover text-text-secondary"),
						children: e.visibility === "public" ? "Public" : "Private"
					})]
				}), /* @__PURE__ */ T("p", {
					className: "text-base text-text-primary m-0 overflow-hidden line-clamp-3",
					children: e.bio
				})]
			})]
		}),
		/* @__PURE__ */ E("div", {
			className: "flex gap-4 text-sm text-text-secondary mb-3",
			children: [
				/* @__PURE__ */ E("span", { children: [/* @__PURE__ */ T("strong", {
					className: "text-text-primary",
					children: e.followersCount ?? "—"
				}), " Followers"] }),
				/* @__PURE__ */ E("span", { children: [/* @__PURE__ */ T("strong", {
					className: "text-text-primary",
					children: e.followingCount ?? "—"
				}), " Following"] }),
				/* @__PURE__ */ E("span", { children: [/* @__PURE__ */ T("strong", {
					className: "text-text-primary",
					children: e.friendsCount ?? "—"
				}), " Friends"] })
			]
		}),
		t && /* @__PURE__ */ T("button", {
			onClick: () => i(!0),
			className: "text-sm text-primary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
			children: "Edit profile"
		})
	] });
}
function N({ followers: e, following: t, friends: n, followStates: r, onFollowChange: i, loadError: a }) {
	let [o, c] = C("followers"), l = (e) => a ? "" : ` (${e.length})`, u = [
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
	return /* @__PURE__ */ E("div", {
		className: "mt-4",
		children: [/* @__PURE__ */ T("div", {
			role: "tablist",
			"aria-label": "Connections",
			onKeyDown: h,
			className: "flex border-b border-border mb-3",
			children: u.map((e) => /* @__PURE__ */ T("button", {
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
		}), /* @__PURE__ */ T("div", {
			role: "tabpanel",
			id: "social-tabpanel",
			"aria-labelledby": `social-tab-${o}`,
			className: "min-h-[120px]",
			children: a && f.length === 0 ? /* @__PURE__ */ E("div", {
				role: "alert",
				"data-testid": "social-graph-error",
				className: "py-6 text-center",
				children: [/* @__PURE__ */ T("div", {
					className: "text-sm font-semibold text-danger-fg mb-1",
					children: "Couldn’t load your connections"
				}), /* @__PURE__ */ T("div", {
					className: "text-sm text-text-tertiary",
					children: a
				})]
			}) : f.length === 0 ? /* @__PURE__ */ E("div", {
				className: "py-6 text-center",
				children: [/* @__PURE__ */ T("div", {
					className: "text-sm font-semibold text-text-primary mb-1",
					children: d[o].heading
				}), /* @__PURE__ */ T("div", {
					className: "text-sm text-text-tertiary",
					children: d[o].body
				})]
			}) : /* @__PURE__ */ T("div", { children: f.map((e) => /* @__PURE__ */ E("div", {
				className: "flex items-center gap-2 h-14 border-b border-surface-hover",
				children: [
					/* @__PURE__ */ T(A, {
						user: e,
						size: 32
					}),
					/* @__PURE__ */ E("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ T("div", {
							className: "text-base text-text-primary",
							children: e.displayName
						}), /* @__PURE__ */ T("div", {
							className: "text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap max-w-[240px]",
							children: e.visibility === "private" ? /* @__PURE__ */ T("em", {
								className: "text-text-tertiary",
								children: "This profile is private."
							}) : e.bio
						})]
					}),
					/* @__PURE__ */ T(j, {
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
	let [_, v] = C(null), y = async (e, t) => {
		v(null);
		try {
			t === "following" || t === "pending" ? await d(e) : await f(e);
		} catch (e) {
			v(e instanceof Error ? e.message : "Follow action failed");
		}
	}, b = c.map((e) => O(e, g[e.userId] ?? "not-following")), x = l.map((e) => O(e, "following")), S = u.map((e) => O(e, "following")), D = r ? {
		...k(r),
		followersCount: m ? void 0 : c.length,
		followingCount: m ? void 0 : l.length,
		friendsCount: m ? void 0 : u.length
	} : null;
	return /* @__PURE__ */ E("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ T("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
				children: "Social Profile"
			}),
			i && !D ? /* @__PURE__ */ T("div", {
				className: "py-10 text-center text-text-tertiary text-sm",
				children: "Loading profile…"
			}) : D ? /* @__PURE__ */ E(w, { children: [/* @__PURE__ */ T(M, {
				user: D,
				isOwnProfile: !0,
				onSave: s
			}), /* @__PURE__ */ T(N, {
				followers: b,
				following: x,
				friends: S,
				followStates: g,
				onFollowChange: y,
				loadError: m
			})] }) : null,
			(_ ?? o ?? p) && /* @__PURE__ */ T("div", {
				role: "alert",
				"data-testid": "social-panel-error",
				className: "text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
				children: _ ?? o ?? p
			})
		]
	});
}
//#endregion
//#region src/components/social/RoomList.tsx
function F({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = C(""), [a, o] = C(null), c = async (t) => {
		if (t.preventDefault(), r.trim()) {
			o(null);
			try {
				await e(r.trim()), i("");
			} catch (e) {
				o(e instanceof Error ? e.message : "Failed to create room");
			}
		}
	};
	return /* @__PURE__ */ E("form", {
		onSubmit: (e) => {
			c(e);
		},
		className: "my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border",
		children: [
			/* @__PURE__ */ T(d, {
				size: "sm",
				value: r,
				onChange: (e) => i(e.target.value.slice(0, 50)),
				placeholder: "Room name",
				maxLength: 50,
				required: !0,
				autoFocus: !0,
				className: "mb-1.5"
			}),
			/* @__PURE__ */ E("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ T("button", {
					type: "submit",
					disabled: !r.trim() || n,
					className: s("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !r.trim() || n ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: n ? "Creating…" : "Create"
				}), /* @__PURE__ */ T("button", {
					type: "button",
					onClick: t,
					className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
					children: "Cancel"
				})]
			}),
			a && /* @__PURE__ */ T("div", {
				className: "text-danger-fg text-[11px] mt-1",
				children: a
			})
		]
	});
}
function I({ onCreateDM: e, loading: t, friends: n, friendsError: r }) {
	let [i, a] = C(""), [o, c] = C(!1), [l, u] = C(null), d = async (t) => {
		if (t.preventDefault(), i.trim()) {
			u(null);
			try {
				await e(i.trim()), a(""), c(!1);
			} catch (e) {
				u(e instanceof Error ? e.message : "Failed to open DM");
			}
		}
	};
	return o ? /* @__PURE__ */ E("form", {
		onSubmit: (e) => {
			d(e);
		},
		className: "my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border",
		children: [
			/* @__PURE__ */ T(g, {
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
			r && n.length === 0 && /* @__PURE__ */ T("div", {
				role: "alert",
				"data-testid": "dm-friends-error",
				className: "text-danger-fg text-[11px] mb-1.5",
				children: r
			}),
			/* @__PURE__ */ E("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ T("button", {
					type: "submit",
					disabled: !i.trim() || t || n.length === 0,
					className: s("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !i.trim() || t ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: "Open DM"
				}), /* @__PURE__ */ T("button", {
					type: "button",
					onClick: () => c(!1),
					className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
					children: "Cancel"
				})]
			}),
			l && /* @__PURE__ */ T("div", {
				className: "text-danger-fg text-[11px] mt-1",
				children: l
			})
		]
	}) : /* @__PURE__ */ T("button", {
		onClick: () => c(!0),
		className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded mb-1",
		children: "+ New DM"
	});
}
function L({ room: e, isActive: t, onClick: n }) {
	return /* @__PURE__ */ E("button", {
		type: "button",
		onClick: n,
		"aria-pressed": t,
		className: s("flex items-center h-14 border-b border-surface-hover cursor-pointer pr-2", "w-full text-left font-[inherit]", t ? "bg-surface-hover border-l-[3px] border-l-primary pl-[13px]" : "bg-transparent border-l-[3px] border-l-transparent"),
		children: [/* @__PURE__ */ T("div", {
			className: s("flex-1 text-base text-text-primary", t ? "font-semibold" : "font-normal"),
			children: e.name
		}), /* @__PURE__ */ T("span", {
			className: ((e) => e === "standalone" ? "bg-accent-bg text-primary text-xs px-2 py-0.5 rounded" : e === "group" ? "bg-info-bg text-info text-xs px-2 py-0.5 rounded" : "bg-success-bg text-success text-xs px-2 py-0.5 rounded")(e.type),
			children: e.type
		})]
	});
}
function ee({ room: e, isActive: t, onClick: n }) {
	return /* @__PURE__ */ E("button", {
		onClick: n,
		className: s("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]", t ? "bg-accent-bg text-accent-fg font-semibold" : "bg-transparent text-text-primary font-normal"),
		children: [/* @__PURE__ */ T("span", {
			className: s("text-[13px] shrink-0", t ? "text-primary" : "text-text-tertiary"),
			children: e.type === "dm" ? "●" : "#"
		}), /* @__PURE__ */ T("span", {
			className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1",
			children: e.name
		})]
	});
}
function R({ message: e, onRetry: t, compact: n }) {
	return /* @__PURE__ */ E("div", {
		role: "alert",
		className: s("text-center flex flex-col items-center gap-1.5", n ? "px-2 py-3" : "px-4 py-6"),
		children: [
			/* @__PURE__ */ T("div", {
				className: s("font-semibold text-danger-fg", n ? "text-xs" : "text-sm"),
				children: "Couldn't load rooms"
			}),
			/* @__PURE__ */ T("div", {
				className: s("text-text-secondary", n ? "text-[11px]" : "text-xs"),
				children: e
			}),
			t && /* @__PURE__ */ T("button", {
				type: "button",
				onClick: t,
				className: s("mt-1 font-medium text-info-fg bg-info-bg border border-info-border rounded cursor-pointer font-[system-ui,-apple-system,sans-serif]", n ? "px-2.5 py-0.5 text-[11px]" : "px-3.5 py-1 text-xs"),
				children: "Retry"
			})
		]
	});
}
function z({ idToken: t, rooms: n, createRoom: r, createDM: i, loading: a, error: o, onRetry: s, onRoomSelect: c, activeRoomId: l, compact: u }) {
	let { friends: d, loadError: f } = e({ idToken: t }), [p, m] = C(!1), h = async (e) => {
		await r(e), m(!1);
	};
	return u ? /* @__PURE__ */ E("div", {
		className: "px-2 pt-2",
		children: [
			/* @__PURE__ */ T("button", {
				onClick: () => m((e) => !e),
				className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
				children: "+ New Room"
			}),
			p && /* @__PURE__ */ T(F, {
				onCreate: h,
				onDiscard: () => m(!1),
				loading: a
			}),
			/* @__PURE__ */ T(I, {
				onCreateDM: i,
				loading: a,
				friends: d,
				friendsError: f
			}),
			/* @__PURE__ */ T("div", { children: a && n.length === 0 ? /* @__PURE__ */ T("div", {
				className: "p-2 text-text-tertiary text-xs text-center",
				children: "Loading…"
			}) : o && n.length === 0 ? /* @__PURE__ */ T(R, {
				message: o,
				onRetry: s,
				compact: !0
			}) : n.length === 0 ? /* @__PURE__ */ T("div", {
				className: "px-2 py-3 text-text-tertiary text-xs",
				children: "No rooms yet"
			}) : n.map((e) => /* @__PURE__ */ T(ee, {
				room: e,
				isActive: e.roomId === l,
				onClick: () => c(e)
			}, e.roomId)) })
		]
	}) : /* @__PURE__ */ E("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ T("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
				children: "Rooms"
			}),
			/* @__PURE__ */ T("button", {
				onClick: () => m((e) => !e),
				className: "w-full h-9 mb-2 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Create Room"
			}),
			p && /* @__PURE__ */ T(F, {
				onCreate: h,
				onDiscard: () => m(!1),
				loading: a
			}),
			/* @__PURE__ */ T(I, {
				onCreateDM: i,
				loading: a,
				friends: d,
				friendsError: f
			}),
			/* @__PURE__ */ T("div", {
				className: "max-h-80 overflow-y-auto",
				children: a && n.length === 0 ? /* @__PURE__ */ E("div", {
					className: "flex items-center gap-2 p-4 justify-center text-text-secondary",
					children: [/* @__PURE__ */ T("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }), "Loading..."]
				}) : o && n.length === 0 ? /* @__PURE__ */ T(R, {
					message: o,
					onRetry: s
				}) : n.length === 0 ? /* @__PURE__ */ E("div", {
					className: "py-6 text-center",
					children: [/* @__PURE__ */ T("div", {
						className: "text-sm font-semibold text-text-primary mb-1",
						children: "No rooms yet"
					}), /* @__PURE__ */ T("div", {
						className: "text-sm text-text-tertiary",
						children: "Create a room or ask to be added."
					})]
				}) : n.map((e) => /* @__PURE__ */ T(L, {
					room: e,
					isActive: e.roomId === l,
					onClick: () => c(e)
				}, e.roomId))
			})
		]
	});
}
//#endregion
//#region src/components/social/GroupPanel.tsx
function te({ group: e, isSelected: t, onClick: n }) {
	return /* @__PURE__ */ E("button", {
		onClick: n,
		className: s("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]", t ? "bg-accent-bg text-accent-fg font-semibold" : "bg-transparent text-text-primary font-normal"),
		children: [/* @__PURE__ */ T("span", {
			className: s("text-xs shrink-0", t ? "text-primary" : "text-text-tertiary"),
			children: e.visibility === "private" ? "🔒" : "👥"
		}), /* @__PURE__ */ T("span", {
			className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1",
			children: e.name
		})]
	});
}
function ne({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = C(""), [a, o] = C(null), c = async (t) => {
		if (t.preventDefault(), r.trim()) {
			o(null);
			try {
				await e(r.trim()), i("");
			} catch (e) {
				o(e instanceof Error ? e.message : "Failed to create group");
			}
		}
	};
	return /* @__PURE__ */ E("form", {
		onSubmit: (e) => {
			c(e);
		},
		className: "p-2 bg-surface-panel rounded-md border border-border my-1 mb-2",
		children: [
			/* @__PURE__ */ T(d, {
				size: "sm",
				value: r,
				onChange: (e) => i(e.target.value.slice(0, 50)),
				placeholder: "Group name",
				maxLength: 50,
				required: !0,
				autoFocus: !0,
				className: "mb-1.5"
			}),
			/* @__PURE__ */ E("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ T("button", {
					type: "submit",
					disabled: !r.trim() || n,
					className: s("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !r.trim() || n ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: n ? "Creating…" : "Create"
				}), /* @__PURE__ */ T("button", {
					type: "button",
					onClick: t,
					className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
					children: "Cancel"
				})]
			}),
			a && /* @__PURE__ */ T("div", {
				className: "text-danger-fg text-[11px] mt-1",
				children: a
			})
		]
	});
}
function re({ group: e, members: t, rooms: n, groupId: r, currentUserId: i, createGroupRoom: a, onRoomSelect: o, inviteUser: c, loading: l }) {
	let [u, f] = C(!1), [p, m] = C(""), [h, g] = C(null), [_, v] = C(!1), [y, b] = C(""), [x, S] = C(null), w = e.ownerId === i, D = n.filter((e) => e.groupId === r), O = async (e) => {
		if (e.preventDefault(), p.trim()) {
			g(null);
			try {
				await c(r, p.trim());
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
	return /* @__PURE__ */ E("div", {
		className: "px-2 pb-2 pt-1 border-t border-border mt-1",
		children: [
			/* @__PURE__ */ E("div", {
				className: "flex items-center justify-between mb-1",
				children: [/* @__PURE__ */ E("span", {
					className: "text-[11px] text-text-secondary font-semibold uppercase tracking-wide",
					children: [
						"Members (",
						t.length,
						")"
					]
				}), w && /* @__PURE__ */ T("button", {
					onClick: () => f((e) => !e),
					className: "text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]",
					children: "+ Invite"
				})]
			}),
			u && /* @__PURE__ */ E("form", {
				onSubmit: (e) => {
					O(e);
				},
				className: "flex gap-1 mb-1.5",
				children: [/* @__PURE__ */ T(d, {
					size: "sm",
					value: p,
					onChange: (e) => m(e.target.value),
					placeholder: "User ID",
					className: "flex-1"
				}), /* @__PURE__ */ T("button", {
					type: "submit",
					disabled: !p.trim(),
					className: s("h-6 px-2 border-none rounded text-[11px] font-[inherit]", p.trim() ? "bg-primary text-white cursor-pointer" : "bg-border text-text-tertiary cursor-default"),
					children: "Invite"
				})]
			}),
			u && h && /* @__PURE__ */ T("div", {
				role: "alert",
				"data-testid": "compact-invite-error",
				className: "text-danger-fg text-[11px] mb-1.5",
				children: h
			}),
			/* @__PURE__ */ E("div", {
				className: "flex flex-wrap gap-1 mb-2",
				children: [t.slice(0, 8).map((e) => /* @__PURE__ */ T("div", {
					title: e.displayName ?? e.userId,
					className: "w-6 h-6 rounded-full bg-border flex items-center justify-center text-[10px] font-semibold text-text-primary",
					children: (e.displayName ?? e.userId).slice(0, 2).toUpperCase()
				}, e.userId)), t.length > 8 && /* @__PURE__ */ E("span", {
					className: "text-[11px] text-text-tertiary self-center",
					children: ["+", t.length - 8]
				})]
			}),
			/* @__PURE__ */ E("div", {
				className: "flex items-center justify-between mb-1",
				children: [/* @__PURE__ */ E("span", {
					className: "text-[11px] text-text-secondary font-semibold uppercase tracking-wide",
					children: [
						"Rooms (",
						D.length,
						")"
					]
				}), w && /* @__PURE__ */ T("button", {
					onClick: () => v((e) => !e),
					className: "text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]",
					children: "+ Room"
				})]
			}),
			_ && /* @__PURE__ */ E("form", {
				onSubmit: (e) => {
					k(e);
				},
				className: "flex gap-1 mb-1.5",
				children: [/* @__PURE__ */ T(d, {
					size: "sm",
					value: y,
					onChange: (e) => b(e.target.value.slice(0, 50)),
					placeholder: "Room name",
					className: "flex-1"
				}), /* @__PURE__ */ T("button", {
					type: "submit",
					disabled: !y.trim() || l,
					className: s("h-6 px-2 border-none rounded text-[11px] font-[inherit]", !y.trim() || l ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: "Create"
				})]
			}),
			_ && x && /* @__PURE__ */ T("div", {
				role: "alert",
				"data-testid": "compact-group-room-error",
				className: "text-danger-fg text-[11px] mb-1.5",
				children: x
			}),
			D.map((e) => /* @__PURE__ */ E(o ? "button" : "div", {
				type: o ? "button" : void 0,
				onClick: o ? () => o(e) : void 0,
				className: s("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1 bg-transparent text-text-primary text-[13px] text-left font-[inherit]", o && "cursor-pointer"),
				children: [/* @__PURE__ */ T("span", {
					className: "text-text-tertiary text-xs",
					children: "#"
				}), /* @__PURE__ */ T("span", {
					className: "overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.name
				})]
			}, e.roomId))
		]
	});
}
function ie({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = C(""), [a, o] = C("public"), [c, l] = C(null), u = y(), f = async (t) => {
		if (t.preventDefault(), r.trim()) {
			l(null);
			try {
				await e(r.trim(), void 0, a);
			} catch (e) {
				l(e instanceof Error ? e.message : "Failed to create group");
			}
		}
	};
	return /* @__PURE__ */ E("form", {
		onSubmit: (e) => {
			f(e);
		},
		className: "mb-3 p-3 bg-surface-panel rounded-lg border border-border",
		children: [
			/* @__PURE__ */ E("div", {
				className: "mb-3",
				children: [/* @__PURE__ */ T("label", {
					htmlFor: `${u}-group-name`,
					className: "text-sm text-text-primary block mb-1",
					children: "Group name"
				}), /* @__PURE__ */ T(d, {
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
			/* @__PURE__ */ E("div", {
				className: "flex items-center gap-2.5 mb-3.5",
				children: [
					/* @__PURE__ */ T("span", {
						className: "text-[13px] text-text-primary min-w-[42px]",
						children: a === "public" ? "Public" : "Private"
					}),
					/* @__PURE__ */ T("button", {
						type: "button",
						role: "switch",
						"aria-label": "Private group",
						"aria-checked": a === "private",
						onClick: () => o((e) => e === "public" ? "private" : "public"),
						className: s("relative w-11 h-6 rounded-xl border-none cursor-pointer p-0 shrink-0 transition-colors duration-200", a === "private" ? "bg-primary" : "bg-state-idle"),
						children: /* @__PURE__ */ T("span", { className: s("absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-[left] duration-200", a === "private" ? "left-[23px]" : "left-[3px]") })
					}),
					/* @__PURE__ */ T("span", {
						className: "text-xs text-text-tertiary",
						children: a === "public" ? "Visible to everyone" : "Invite only"
					})
				]
			}),
			/* @__PURE__ */ E("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ T("button", {
					type: "submit",
					disabled: !r.trim() || n,
					className: s("flex-1 h-9 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !r.trim() || n ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
					children: n ? "Creating…" : "Create Group"
				}), /* @__PURE__ */ T("button", {
					type: "button",
					onClick: t,
					className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
					children: "Cancel"
				})]
			}),
			c && /* @__PURE__ */ T("div", {
				id: `${u}-form-error`,
				role: "alert",
				className: "text-danger-fg text-[13px] mt-1.5",
				children: c
			})
		]
	});
}
function ae({ group: e, currentUserId: t, isSelected: n, onSelect: r, onDelete: i }) {
	let [a, o] = C(null), c = e.ownerId === t;
	return /* @__PURE__ */ E("div", {
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
			/* @__PURE__ */ E("div", {
				className: "flex-1 min-w-0 pr-2",
				children: [/* @__PURE__ */ T("div", {
					className: s("text-base text-text-primary", n ? "font-semibold" : "font-normal"),
					children: e.name
				}), e.description && /* @__PURE__ */ T("div", {
					className: "text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.description
				})]
			}),
			/* @__PURE__ */ T("span", {
				className: s("text-xs px-2 py-0.5 rounded shrink-0 mr-2", e.visibility === "public" ? "bg-success-bg text-success" : "bg-surface-hover text-text-secondary"),
				children: e.visibility
			}),
			c && /* @__PURE__ */ T("div", {
				className: "shrink-0",
				onClick: (e) => e.stopPropagation(),
				children: a === e.groupId ? /* @__PURE__ */ E("div", {
					role: "group",
					"aria-label": "Confirm delete group",
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ T("button", {
						onClick: () => o(null),
						className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Cancel"
					}), /* @__PURE__ */ T("button", {
						onClick: () => {
							i(e.groupId), o(null);
						},
						className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Delete"
					})]
				}) : /* @__PURE__ */ T("button", {
					onClick: () => o(e.groupId),
					className: "text-xs text-danger-fg bg-transparent border-none cursor-pointer px-2 py-1 font-[system-ui,-apple-system,sans-serif]",
					"aria-label": `Delete group ${e.name}`,
					children: "Delete"
				})
			})
		]
	});
}
function oe({ groupId: e, onInvite: t }) {
	let [n, r] = C(""), [i, a] = C(null), o = async (i) => {
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
	return /* @__PURE__ */ E(w, { children: [/* @__PURE__ */ E("form", {
		onSubmit: (e) => {
			o(e);
		},
		className: "flex gap-2 mt-2",
		children: [/* @__PURE__ */ T(d, {
			className: "flex-1",
			value: n,
			onChange: (e) => r(e.target.value),
			placeholder: "User ID to invite"
		}), /* @__PURE__ */ T("button", {
			type: "submit",
			disabled: !n.trim(),
			className: s("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", n.trim() ? "bg-primary text-white border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"),
			children: "Invite"
		})]
	}), i && /* @__PURE__ */ T("div", {
		role: "alert",
		"data-testid": "invite-error",
		className: "text-danger-fg text-xs mt-1",
		children: i
	})] });
}
function se({ members: e }) {
	let t = (e) => e === "owner" ? "bg-success-bg text-success text-xs px-2 py-0.5 rounded" : e === "admin" ? "bg-info-bg text-info text-xs px-2 py-0.5 rounded" : "bg-surface-hover text-text-secondary text-xs px-2 py-0.5 rounded";
	return /* @__PURE__ */ T("div", {
		className: "max-h-[200px] overflow-y-auto mt-2 border-t border-border",
		children: e.map((e) => /* @__PURE__ */ E("div", {
			className: "flex items-center gap-2 h-12 border-b border-surface-hover",
			children: [
				/* @__PURE__ */ T("div", {
					className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
					children: (e.displayName ?? e.userId).slice(0, 2).toUpperCase()
				}),
				/* @__PURE__ */ T("div", {
					className: "flex-1 text-base text-text-primary",
					children: e.displayName ?? e.userId
				}),
				/* @__PURE__ */ T("span", {
					className: t(e.role),
					children: e.role
				})
			]
		}, e.userId))
	});
}
function ce({ rooms: e, groupId: t, selectedGroupRole: n, createGroupRoom: r, onRoomSelect: i, loading: a }) {
	let [o, c] = C(!1), [l, u] = C(""), [f, p] = C(null), m = e.filter((e) => e.groupId === t), h = async (e) => {
		if (e.preventDefault(), l.trim()) {
			p(null);
			try {
				await r(t, l.trim());
			} catch (e) {
				p(e instanceof Error ? e.message : "Failed to create room");
				return;
			}
			u(""), c(!1);
		}
	};
	return /* @__PURE__ */ E("div", {
		className: "mt-3",
		children: [
			/* @__PURE__ */ T("h3", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-2",
				children: "GROUP ROOMS"
			}),
			(n === "owner" || n === "admin") && (o ? /* @__PURE__ */ E("form", {
				onSubmit: (e) => {
					h(e);
				},
				className: "mb-2 p-3 bg-surface-panel rounded-lg border border-border",
				children: [/* @__PURE__ */ E("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ T(d, {
							className: "flex-1",
							value: l,
							onChange: (e) => u(e.target.value.slice(0, 50)),
							placeholder: "Room name",
							maxLength: 50,
							required: !0
						}),
						/* @__PURE__ */ T("button", {
							type: "submit",
							disabled: !l.trim() || a,
							className: s("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !l.trim() || a ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
							children: a ? "Creating…" : "Create Room"
						}),
						/* @__PURE__ */ T("button", {
							type: "button",
							onClick: () => c(!1),
							className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
							children: "Cancel"
						})
					]
				}), f && /* @__PURE__ */ T("div", {
					role: "alert",
					"data-testid": "group-room-error",
					className: "text-danger-fg text-[13px] mt-1.5",
					children: f
				})]
			}) : /* @__PURE__ */ T("button", {
				onClick: () => c(!0),
				className: "w-full h-9 mb-2 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Create Room"
			})),
			m.length === 0 ? /* @__PURE__ */ T("div", {
				className: "text-sm text-text-tertiary py-2",
				children: "No rooms in this group yet."
			}) : m.map((e) => /* @__PURE__ */ E("div", {
				role: i ? "button" : void 0,
				tabIndex: i ? 0 : void 0,
				"aria-label": i ? `Open room ${e.name}` : void 0,
				className: s("flex items-center h-12 border-b border-surface-hover pr-2", i && "cursor-pointer"),
				onClick: i ? () => i(e) : void 0,
				onKeyDown: i ? (t) => {
					(t.key === "Enter" || t.key === " ") && (t.preventDefault(), i(e));
				} : void 0,
				children: [/* @__PURE__ */ T("div", {
					className: "flex-1 text-base text-text-primary",
					children: e.name
				}), /* @__PURE__ */ T("span", {
					className: "bg-info-bg text-info text-xs px-2 py-0.5 rounded",
					children: "group"
				})]
			}, e.roomId))
		]
	});
}
function B({ idToken: e, rooms: n, createGroupRoom: r, onRoomSelect: i, roomsLoading: a, compact: o }) {
	let { groups: c, createGroup: l, deleteGroup: u, inviteUser: d, loadMembers: f, members: p, loading: m, loaded: h, loadError: g, refresh: _ } = t({ idToken: e }), v = !h && !g, [y, b] = C(!1), [x, S] = C(null), w = e ? (() => {
		try {
			return JSON.parse(atob(e.split(".")[1])).sub;
		} catch {
			return null;
		}
	})() : null, D = async (e, t, n) => {
		await l(e, t, n), b(!1);
	}, O = (e) => {
		x === e ? S(null) : (S(e), f(e));
	};
	if (o) {
		let e = x ? c.find((e) => e.groupId === x) : null;
		return /* @__PURE__ */ E("div", {
			className: "px-2 pt-2",
			children: [
				/* @__PURE__ */ T("button", {
					onClick: () => b((e) => !e),
					className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
					children: "+ New Group"
				}),
				y && /* @__PURE__ */ T(ne, {
					onCreate: D,
					onDiscard: () => b(!1),
					loading: m
				}),
				/* @__PURE__ */ T("div", { children: v && c.length === 0 ? /* @__PURE__ */ T("div", {
					role: "status",
					className: "p-2 text-text-tertiary text-xs text-center",
					children: "Loading…"
				}) : g && c.length === 0 ? /* @__PURE__ */ E("div", {
					role: "alert",
					"data-testid": "compact-groups-load-error",
					className: "px-2 py-3 text-danger-fg text-xs",
					children: [
						/* @__PURE__ */ T("div", { children: "Couldn’t load groups." }),
						/* @__PURE__ */ T("div", {
							className: "text-text-tertiary mt-0.5",
							children: g
						}),
						/* @__PURE__ */ T("button", {
							type: "button",
							onClick: () => {
								_();
							},
							className: "mt-1 text-[11px] text-primary bg-transparent border-none cursor-pointer p-0 font-[inherit]",
							children: "Retry"
						})
					]
				}) : c.length === 0 ? /* @__PURE__ */ T("div", {
					className: "px-2 py-3 text-text-tertiary text-xs",
					children: "No groups yet"
				}) : c.map((e) => /* @__PURE__ */ T(te, {
					group: e,
					isSelected: e.groupId === x,
					onClick: () => O(e.groupId)
				}, e.groupId)) }),
				e && /* @__PURE__ */ T(re, {
					group: e,
					members: p,
					rooms: n,
					groupId: e.groupId,
					currentUserId: w,
					createGroupRoom: r,
					onRoomSelect: i,
					inviteUser: d,
					loading: a
				})
			]
		});
	}
	let k = x ? c.find((e) => e.groupId === x) : null, A = k && w && k.ownerId === w ? "owner" : "member";
	return /* @__PURE__ */ E("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ T("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
				children: "Groups"
			}),
			/* @__PURE__ */ T("div", {
				className: "max-h-80 overflow-y-auto mb-3",
				children: v && c.length === 0 ? /* @__PURE__ */ T("div", {
					role: "status",
					className: "py-4 text-center text-sm text-text-tertiary",
					children: "Loading groups…"
				}) : g && c.length === 0 ? /* @__PURE__ */ E("div", {
					role: "alert",
					"data-testid": "groups-load-error",
					className: "py-4 text-center",
					children: [
						/* @__PURE__ */ T("div", {
							className: "text-sm font-semibold text-danger-fg mb-1",
							children: "Couldn’t load groups"
						}),
						/* @__PURE__ */ T("div", {
							className: "text-sm text-text-tertiary mb-2",
							children: g
						}),
						/* @__PURE__ */ T("button", {
							type: "button",
							onClick: () => {
								_();
							},
							className: "text-sm text-primary bg-transparent border border-border rounded-lg px-3 py-1 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
							children: "Retry"
						})
					]
				}) : c.length === 0 ? /* @__PURE__ */ E("div", {
					className: "py-4 text-center",
					children: [/* @__PURE__ */ T("div", {
						className: "text-sm font-semibold text-text-primary mb-1",
						children: "No groups yet"
					}), /* @__PURE__ */ T("div", {
						className: "text-sm text-text-tertiary",
						children: "Create a group or join a public one."
					})]
				}) : c.map((e) => /* @__PURE__ */ T(ae, {
					group: e,
					currentUserId: w,
					isSelected: x === e.groupId,
					onSelect: O,
					onDelete: u
				}, e.groupId))
			}),
			x && /* @__PURE__ */ E("div", {
				className: "mb-3",
				children: [
					/* @__PURE__ */ T(se, { members: p }),
					(A === "owner" || A === "admin") && /* @__PURE__ */ T(oe, {
						groupId: x,
						onInvite: d
					}),
					/* @__PURE__ */ T(ce, {
						rooms: n,
						groupId: x,
						selectedGroupRole: A,
						createGroupRoom: r,
						onRoomSelect: i,
						loading: a
					})
				]
			}),
			/* @__PURE__ */ T("button", {
				onClick: () => b((e) => !e),
				className: s("w-full h-9 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]", y && "mb-2"),
				children: y ? "Cancel" : "Create Group"
			}),
			y && /* @__PURE__ */ T(ie, {
				onCreate: D,
				onDiscard: () => b(!1),
				loading: m
			})
		]
	});
}
//#endregion
//#region src/components/social/ChatRoom.tsx
var V = [
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
function H(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) >>> 0;
	return V[t % V.length];
}
function U(e) {
	let t = e.split(/[\s._@-]/);
	return t.length >= 2 ? (t[0][0] + t[1][0]).toUpperCase() : e.slice(0, 2).toUpperCase();
}
function W(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : new Date(e).toLocaleDateString();
}
function G(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function le({ post: e, isOwn: t, showSender: n }) {
	let r = H(e.authorId);
	return /* @__PURE__ */ E("div", {
		className: s("flex items-end gap-2", t ? "flex-row-reverse" : "flex-row", n ? "pt-2 px-4 pb-0.5" : "py-px px-4"),
		children: [/* @__PURE__ */ T("div", {
			className: "w-8 shrink-0 self-end",
			children: !t && n && /* @__PURE__ */ T("div", {
				className: "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white select-none",
				style: { background: r },
				children: U(e.authorId)
			})
		}), /* @__PURE__ */ E("div", {
			className: s("max-w-[68%] flex flex-col gap-0.5", t ? "items-end" : "items-start"),
			children: [
				!t && n && /* @__PURE__ */ T("span", {
					className: "text-[11px] font-semibold pl-1",
					style: { color: r },
					children: e.authorId
				}),
				/* @__PURE__ */ T("div", {
					className: s("px-3.5 py-2 text-sm leading-relaxed break-words transition-opacity duration-200", t ? "bg-primary text-white rounded-[18px_18px_4px_18px]" : "bg-surface-hover text-text-primary rounded-[4px_18px_18px_18px]", e._fadeIn ? "opacity-0" : "opacity-100"),
					children: e.content
				}),
				n && /* @__PURE__ */ T("span", {
					className: "text-[10px] text-text-tertiary px-1",
					children: W(e.createdAt)
				})
			]
		})]
	});
}
function K({ idToken: e, roomId: t, roomName: r, onMessage: i }) {
	let { posts: a, createPost: o, loading: c, hasMore: l, loadMore: u, error: f, loadError: p } = n({
		idToken: e,
		roomId: t,
		onMessage: i
	}), [m, h] = C(""), [g, _] = C(!1), [y, b] = C(null), x = S(null), w = G(e), D = [...a].reverse(), O = a[0]?.postId;
	v(() => {
		O && x.current?.scrollIntoView({ behavior: "smooth" });
	}, [O]);
	let k = async () => {
		if (!m.trim() || g) return;
		let e = m.trim();
		h(""), b(null), _(!0);
		try {
			await o(e);
		} catch (t) {
			b(t instanceof Error ? t.message : "Failed to send message"), h(e);
		} finally {
			_(!1);
		}
	};
	return /* @__PURE__ */ E("div", {
		className: "flex flex-col h-full bg-surface rounded-lg border border-border overflow-hidden",
		children: [
			/* @__PURE__ */ T("div", {
				className: "flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface shrink-0",
				children: /* @__PURE__ */ E("span", {
					className: "text-[15px] font-semibold text-text-primary",
					children: ["# ", r]
				})
			}),
			/* @__PURE__ */ E("div", {
				className: "flex-1 overflow-y-auto flex flex-col pb-1",
				children: [
					l && /* @__PURE__ */ T("div", {
						className: "text-center py-2",
						children: /* @__PURE__ */ T("button", {
							onClick: () => void u(),
							disabled: c,
							className: s("text-xs text-text-secondary bg-transparent border border-border rounded-full px-3.5 py-0.5 font-[inherit]", c ? "cursor-default" : "cursor-pointer"),
							children: c ? "Loading…" : "Load earlier"
						})
					}),
					c && D.length === 0 ? /* @__PURE__ */ T("div", {
						className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px]",
						children: "Loading messages…"
					}) : p && D.length === 0 ? /* @__PURE__ */ E("div", {
						role: "alert",
						className: "flex-1 flex flex-col items-center justify-center gap-1.5 px-6 text-center",
						children: [
							/* @__PURE__ */ T("span", {
								className: "text-[28px]",
								children: "⚠️"
							}),
							/* @__PURE__ */ T("span", {
								className: "text-sm font-semibold text-danger-fg",
								children: "Couldn’t load messages"
							}),
							/* @__PURE__ */ T("span", {
								className: "text-[13px] text-text-tertiary",
								children: p
							})
						]
					}) : D.length === 0 ? /* @__PURE__ */ E("div", {
						className: "flex-1 flex flex-col items-center justify-center text-text-tertiary gap-1.5",
						children: [
							/* @__PURE__ */ T("span", {
								className: "text-[28px]",
								children: "💬"
							}),
							/* @__PURE__ */ T("span", {
								className: "text-sm font-semibold text-text-primary",
								children: "No messages yet"
							}),
							/* @__PURE__ */ T("span", {
								className: "text-[13px]",
								children: "Be the first to say something!"
							})
						]
					}) : D.map((e, t) => {
						let n = e.authorId === w, r = D[t - 1], i = !r || r.authorId !== e.authorId || new Date(e.createdAt).getTime() - new Date(r.createdAt).getTime() > 3e5;
						return /* @__PURE__ */ T(le, {
							post: e,
							isOwn: n,
							showSender: i
						}, e.postId);
					}),
					/* @__PURE__ */ T("div", { ref: x })
				]
			}),
			(f || y) && /* @__PURE__ */ T("div", {
				className: "px-4 py-1.5 bg-danger-bg border-t border-danger-border text-xs text-danger-fg",
				children: y ?? f
			}),
			/* @__PURE__ */ E("div", {
				className: "flex items-center gap-2 px-3 py-2.5 border-t border-border bg-surface shrink-0",
				children: [/* @__PURE__ */ T(d, {
					value: m,
					onChange: (e) => h(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && !e.shiftKey && (e.preventDefault(), k());
					},
					placeholder: `Message #${r}…`,
					disabled: g,
					className: "flex-1 rounded-[22px] px-4"
				}), /* @__PURE__ */ T("button", {
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
function q({ title: e, count: t, unreadTotal: n, defaultOpen: r = !0, children: i }) {
	let [a, o] = C(r);
	return /* @__PURE__ */ E("div", {
		className: "mb-0.5",
		children: [/* @__PURE__ */ E("button", {
			onClick: () => o((e) => !e),
			className: "flex items-center gap-1 w-full px-3 py-1.5 bg-transparent border-none cursor-pointer font-[inherit] text-left",
			children: [
				/* @__PURE__ */ T("span", {
					className: s("text-[10px] text-text-secondary inline-block w-3 transition-transform duration-150", a ? "rotate-90" : "rotate-0"),
					children: "▶"
				}),
				/* @__PURE__ */ T("span", {
					className: "text-[11px] font-bold text-text-tertiary uppercase tracking-wide flex-1",
					children: e
				}),
				!a && n !== void 0 && n > 0 && /* @__PURE__ */ T("span", {
					className: "min-w-[18px] h-[18px] rounded-[9px] bg-danger text-white text-[10px] font-bold flex items-center justify-center px-1.5",
					children: n > 99 ? "99+" : n
				}),
				t !== void 0 && /* @__PURE__ */ T("span", {
					className: "text-[11px] text-text-secondary",
					children: t
				})
			]
		}), a && i]
	});
}
function J({ room: e, isActive: t, unread: n, onClick: r }) {
	return /* @__PURE__ */ E("button", {
		onClick: r,
		className: s("flex items-center gap-1.5 w-full border-none rounded-[5px] pt-1.5 pb-1.5 pr-2 pl-6 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]", t ? "bg-primary/15 text-primary font-semibold" : n > 0 ? "bg-transparent text-text-primary font-semibold" : "bg-transparent text-text-tertiary font-normal"),
		children: [
			/* @__PURE__ */ T("span", {
				className: s("text-[13px] shrink-0", t ? "text-primary" : "text-text-secondary"),
				children: e.type === "dm" ? "●" : "#"
			}),
			/* @__PURE__ */ T("span", {
				className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1",
				children: e.name
			}),
			n > 0 && !t && /* @__PURE__ */ T("span", {
				className: "min-w-[18px] h-[18px] rounded-[9px] bg-danger text-white text-[10px] font-bold flex items-center justify-center px-1.5 shrink-0",
				children: n > 99 ? "99+" : n
			})
		]
	});
}
function ue({ userId: e, displayName: t, idToken: n, rooms: r, createRoom: i, createDM: a, createGroupRoom: o, roomsLoading: c, roomsError: l, onRoomsRetry: u, handleRoomSelect: d, activeRoomId: f, onMessage: p }) {
	let [m, h] = C(!0), g = m ? 240 : 0, [y, b] = C({}), x = S(f);
	v(() => {
		x.current = f;
	}, [f]);
	let w = _((e) => {
		b((t) => {
			if (!t[e.roomId]) return t;
			let n = { ...t };
			return delete n[e.roomId], n;
		}), d(e);
	}, [d]);
	v(() => p((e) => {
		if (e.type === "social:post") {
			let t = (e.payload ?? e).roomId;
			t && t !== x.current && b((e) => ({
				...e,
				[t]: (e[t] ?? 0) + 1
			}));
		}
	}), [p]);
	let [D, O] = C(!1), k = t ? t.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2) : e.slice(0, 2).toUpperCase(), A = r.find((e) => e.roomId === f) ?? null, j = r.filter((e) => e.type === "standalone" || e.type === "group"), M = r.filter((e) => e.type === "dm"), N = j.reduce((e, t) => e + (y[t.roomId] ?? 0), 0), P = M.reduce((e, t) => e + (y[t.roomId] ?? 0), 0), F = "var(--color-border)", I = "var(--color-text-primary)", L = "var(--color-text-secondary)";
	return /* @__PURE__ */ E("div", {
		className: "flex overflow-hidden rounded-lg transition-colors duration-200 h-[calc(100vh-120px)]",
		style: {
			background: "var(--color-surface)",
			border: `1px solid ${F}`
		},
		children: [/* @__PURE__ */ E("div", {
			className: s("shrink-0 flex-col overflow-hidden transition-[width] duration-[180ms]", m ? "flex" : "hidden"),
			style: {
				width: g,
				borderRight: `1px solid ${F}`,
				background: "var(--color-surface-panel)"
			},
			children: [/* @__PURE__ */ E("div", {
				className: "flex items-center gap-2 shrink-0 px-[14px] pt-[14px] pb-3",
				style: { borderBottom: `1px solid ${F}` },
				children: [
					/* @__PURE__ */ T("div", {
						className: "w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-[11px] shrink-0 bg-[linear-gradient(135deg,#646cff,#9b59b6)]",
						children: k
					}),
					/* @__PURE__ */ E("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ T("div", {
							className: "text-[13px] font-bold overflow-hidden text-ellipsis whitespace-nowrap",
							style: { color: I },
							children: t || e
						}), /* @__PURE__ */ E("div", {
							className: "text-[11px] flex items-center gap-1",
							style: { color: L },
							children: [/* @__PURE__ */ T("span", { className: "w-1.5 h-1.5 rounded-full bg-success inline-block" }), "Active"]
						})]
					}),
					/* @__PURE__ */ T("button", {
						onClick: () => h(!1),
						title: "Collapse sidebar",
						className: "bg-transparent border-none cursor-pointer text-base leading-none px-1 py-0.5 rounded",
						style: { color: L },
						children: "«"
					})
				]
			}), /* @__PURE__ */ E("div", {
				className: "flex-1 overflow-y-auto pt-2",
				children: [
					/* @__PURE__ */ T(q, {
						title: "Channels",
						count: l ? void 0 : j.length,
						unreadTotal: N,
						children: /* @__PURE__ */ E("div", {
							className: "px-1",
							children: [
								c && j.length === 0 ? /* @__PURE__ */ T("div", {
									className: "px-6 py-2 text-xs",
									style: { color: L },
									children: "Loading…"
								}) : l && j.length === 0 ? /* @__PURE__ */ T("div", {
									role: "alert",
									"data-testid": "channels-error",
									className: "px-6 py-2 text-xs text-danger-fg",
									children: "Couldn’t load channels"
								}) : j.length === 0 ? /* @__PURE__ */ T("div", {
									className: "px-6 py-2 text-xs",
									style: { color: L },
									children: "No channels yet"
								}) : j.map((e) => /* @__PURE__ */ T(J, {
									room: e,
									isActive: e.roomId === f,
									unread: y[e.roomId] ?? 0,
									onClick: () => w(e)
								}, e.roomId)),
								/* @__PURE__ */ E("button", {
									onClick: () => O((e) => !e),
									className: "flex items-center gap-1.5 w-full bg-transparent border-none cursor-pointer text-xs font-[inherit] rounded pt-[5px] pr-2 pb-[5px] pl-6",
									style: { color: L },
									children: [/* @__PURE__ */ T("span", {
										className: "text-sm leading-none",
										children: "+"
									}), " Add channel"]
								}),
								D && /* @__PURE__ */ T("div", {
									className: "px-2",
									children: /* @__PURE__ */ T(z, {
										idToken: n,
										rooms: [],
										createRoom: i,
										createDM: a,
										loading: c,
										error: l,
										onRetry: u,
										onRoomSelect: w,
										activeRoomId: f,
										compact: !0
									})
								})
							]
						})
					}),
					/* @__PURE__ */ T(q, {
						title: "Direct Messages",
						count: l ? void 0 : M.length,
						unreadTotal: P,
						children: /* @__PURE__ */ T("div", {
							className: "px-1",
							children: c && M.length === 0 ? /* @__PURE__ */ T("div", {
								className: "px-6 py-2 text-xs",
								style: { color: L },
								children: "Loading…"
							}) : l && M.length === 0 ? /* @__PURE__ */ T("div", {
								role: "alert",
								"data-testid": "dms-error",
								className: "px-6 py-2 text-xs text-danger-fg",
								children: "Couldn’t load conversations"
							}) : M.length === 0 ? /* @__PURE__ */ T("div", {
								className: "px-6 py-2 text-xs",
								style: { color: L },
								children: "No conversations yet"
							}) : M.map((e) => /* @__PURE__ */ T(J, {
								room: e,
								isActive: e.roomId === f,
								unread: y[e.roomId] ?? 0,
								onClick: () => w(e)
							}, e.roomId))
						})
					}),
					/* @__PURE__ */ T(q, {
						title: "Groups",
						defaultOpen: !1,
						children: /* @__PURE__ */ T(B, {
							idToken: n,
							rooms: r,
							createGroupRoom: o,
							onRoomSelect: w,
							roomsLoading: c,
							compact: !0
						})
					})
				]
			})]
		}), /* @__PURE__ */ E("div", {
			className: "flex-1 min-w-0 flex flex-col",
			children: [!m && /* @__PURE__ */ E("div", {
				className: "flex items-center gap-2 px-3 py-1.5",
				style: { borderBottom: `1px solid ${F}` },
				children: [/* @__PURE__ */ T("button", {
					onClick: () => h(!0),
					title: "Expand sidebar",
					className: "bg-transparent rounded cursor-pointer text-sm px-2 py-0.5 font-[inherit]",
					style: {
						border: `1px solid ${F}`,
						color: L
					},
					children: "»"
				}), A && /* @__PURE__ */ E("span", {
					className: "text-[13px] font-semibold",
					style: { color: I },
					children: [
						A.type === "dm" ? "●" : "#",
						" ",
						A.name
					]
				})]
			}), /* @__PURE__ */ T("div", {
				className: "flex-1 min-h-0",
				children: A ? /* @__PURE__ */ T(K, {
					idToken: n,
					roomId: A.roomId,
					roomName: A.name,
					onMessage: p
				}, A.roomId) : /* @__PURE__ */ E("div", {
					className: "h-full flex flex-col items-center justify-center gap-2",
					style: { color: L },
					children: [
						/* @__PURE__ */ T("span", {
							className: "text-4xl",
							children: "💬"
						}),
						/* @__PURE__ */ T("span", {
							className: "text-[15px] font-semibold",
							style: { color: I },
							children: "Select a room to start chatting"
						}),
						/* @__PURE__ */ T("span", {
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
	return r.length === 0 ? null : /* @__PURE__ */ T("div", {
		"data-testid": "message-group",
		"data-author": e,
		"data-row-count": r.length,
		className: s("flex flex-col", i),
		children: r.map((r, i) => /* @__PURE__ */ T(p, {
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
//#region src/components/social/CommentThread.tsx
function fe(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function pe(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function Y({ onSubmit: e, placeholder: t = "Write a reply…", loading: n }) {
	let [r, i] = C(""), [a, o] = C(null), c = async (t) => {
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
	return /* @__PURE__ */ E("form", {
		onSubmit: (e) => {
			c(e);
		},
		className: "flex flex-wrap gap-2 mt-2",
		children: [
			/* @__PURE__ */ T(d, {
				value: r,
				onChange: (e) => i(e.target.value),
				placeholder: t,
				className: "flex-1"
			}),
			/* @__PURE__ */ T("button", {
				type: "submit",
				disabled: !r.trim() || n,
				className: s("h-7 px-2.5 rounded-md text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !r.trim() || n ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
				children: "Comment"
			}),
			a && /* @__PURE__ */ T("div", {
				role: "alert",
				"data-testid": "comment-submit-error",
				className: "basis-full text-danger-fg text-[13px]",
				children: a
			})
		]
	});
}
function me({ comment: e, currentUserId: t, loading: n, onDelete: r, onReply: i }) {
	let [a, o] = C(!1), [s, c] = C(!1), [l, u] = C(+!e._fadeIn);
	v(() => {
		if (e._fadeIn) {
			let e = setTimeout(() => u(1), 10);
			return () => clearTimeout(e);
		}
	}, []);
	let d = e.authorId === t, f = !!e.parentCommentId, p = e.authorId.slice(0, 2).toUpperCase(), m = /* @__PURE__ */ T("div", {
		style: { opacity: l },
		className: "transition-opacity duration-200 ease-[ease]",
		children: /* @__PURE__ */ E("div", {
			className: "flex items-start gap-2",
			children: [/* @__PURE__ */ T("div", {
				className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
				children: p
			}), /* @__PURE__ */ E("div", {
				className: "flex-1",
				children: [
					/* @__PURE__ */ E("div", {
						className: "flex items-center gap-2 mb-0.5",
						children: [/* @__PURE__ */ T("span", {
							className: "text-sm font-semibold text-text-primary",
							children: e.authorId
						}), /* @__PURE__ */ T("span", {
							className: "text-xs text-text-tertiary",
							children: fe(e.createdAt)
						})]
					}),
					/* @__PURE__ */ T("div", {
						className: "text-sm text-text-primary mb-1",
						children: e.content
					}),
					/* @__PURE__ */ E("div", {
						className: "flex gap-2 items-center",
						children: [
							/* @__PURE__ */ T("button", {
								onClick: () => c((e) => !e),
								className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
								children: "Reply"
							}),
							d && !a && /* @__PURE__ */ T("button", {
								onClick: () => o(!0),
								className: "text-sm text-text-tertiary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
								"aria-label": "Delete comment",
								children: "Delete"
							}),
							d && a && /* @__PURE__ */ E("div", {
								role: "group",
								"aria-label": "Confirm delete comment",
								className: "flex gap-1.5 items-center",
								children: [
									/* @__PURE__ */ T("span", {
										className: "text-xs text-text-primary",
										children: "Delete this comment?"
									}),
									/* @__PURE__ */ T("button", {
										onClick: () => o(!1),
										className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
										children: "Cancel"
									}),
									/* @__PURE__ */ T("button", {
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
					s && /* @__PURE__ */ T(Y, {
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
	return f ? /* @__PURE__ */ T("div", {
		className: "pl-8 py-2",
		children: m
	}) : /* @__PURE__ */ T("div", {
		className: "py-2 border-b border-surface-hover",
		children: m
	});
}
function X({ idToken: e, roomId: t, postId: n, onMessage: i }) {
	let { comments: a, createComment: o, deleteComment: s, loading: c, submitting: l, error: u } = r({
		idToken: e,
		roomId: t,
		postId: n,
		onMessage: i
	}), d = pe(e), f = async (e, t) => {
		await o(t, e);
	};
	return /* @__PURE__ */ E("div", {
		className: "pt-2 pl-2 border-t border-surface-hover",
		children: [
			c ? /* @__PURE__ */ T("div", {
				className: "text-sm text-text-tertiary py-2",
				children: "Loading comments…"
			}) : u && a.length === 0 ? /* @__PURE__ */ T("div", {
				role: "alert",
				className: "text-sm text-danger-fg py-2",
				children: u
			}) : a.length === 0 ? /* @__PURE__ */ T("div", {
				className: "text-sm text-text-tertiary text-center py-4",
				children: "No comments yet"
			}) : a.map((e) => /* @__PURE__ */ T(me, {
				comment: e,
				currentUserId: d,
				loading: l,
				onDelete: s,
				onReply: f
			}, e.commentId)),
			u && a.length > 0 && /* @__PURE__ */ T("div", {
				role: "alert",
				"data-testid": "comment-thread-error",
				className: "text-sm text-danger-fg py-1",
				children: u
			}),
			/* @__PURE__ */ T(Y, {
				onSubmit: (e) => o(e),
				placeholder: "Write a comment…",
				loading: l
			})
		]
	});
}
//#endregion
//#region src/components/social/PostFeed.tsx
var he = [
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
function ge(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function _e(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function ve({ onCreate: e, loading: t }) {
	let [n, r] = C(""), [i, a] = C(null), o = async (t) => {
		if (t.preventDefault(), n.trim()) {
			a(null);
			try {
				await e(n.trim()), r("");
			} catch (e) {
				a(e instanceof Error ? e.message : "Failed to create post");
			}
		}
	};
	return /* @__PURE__ */ E("form", {
		onSubmit: (e) => {
			o(e);
		},
		children: [
			/* @__PURE__ */ T(m, {
				value: n,
				onChange: (e) => r(e.target.value),
				placeholder: "What's on your mind?",
				maxLength: 1e4,
				rows: 3,
				className: "resize-y mb-2"
			}),
			/* @__PURE__ */ T("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ T("button", {
					type: "submit",
					disabled: !n.trim() || t,
					className: s("h-9 px-4 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !n.trim() || t ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
					children: t ? "Posting…" : "Post"
				})
			}),
			i && /* @__PURE__ */ T("div", {
				className: "text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
				children: i
			})
		]
	});
}
function ye({ isLiked: e, likeCount: t, whoLiked: n, toggle: r }) {
	return /* @__PURE__ */ E(w, { children: [/* @__PURE__ */ E("button", {
		onClick: () => void r(),
		"aria-label": "Like post",
		className: "bg-transparent border-none cursor-pointer flex items-center gap-1 p-0 font-[system-ui,-apple-system,sans-serif]",
		children: [/* @__PURE__ */ T("span", {
			className: s("text-base", e ? "text-primary" : "text-text-tertiary"),
			children: "❤"
		}), /* @__PURE__ */ T("span", {
			className: s("text-sm", e ? "text-primary" : "text-text-tertiary"),
			children: t
		})]
	}), n.length > 0 && /* @__PURE__ */ E("span", {
		className: "text-xs text-text-secondary ml-1",
		children: [
			"Liked by: ",
			n.slice(0, 3).map((e) => e.displayName).join(", "),
			n.length > 3 ? ` and ${n.length - 3} more` : ""
		]
	})] });
}
function be({ reactWithEmoji: e }) {
	return /* @__PURE__ */ T("div", {
		className: "flex flex-wrap gap-0",
		children: he.map((t) => /* @__PURE__ */ T("button", {
			onClick: () => void e(t),
			className: "text-base bg-transparent border-none px-1 py-0.5 cursor-pointer",
			title: t,
			children: t
		}, t))
	});
}
function xe({ post: e, idToken: t, roomId: n, currentUserId: r, onMessage: a, onEdit: o, onDelete: c }) {
	let { isLiked: l, likeCount: u, whoLiked: d, toggle: f, reactWithEmoji: p, error: h } = i({
		idToken: t,
		roomId: n,
		postId: e.postId,
		onMessage: a
	}), [g, _] = C(+!e._fadeIn), [y, b] = C(!1), [x, S] = C(!1), [w, D] = C(!1), [O, k] = C(e.content), [A, j] = C(null), M = async () => {
		j(null);
		try {
			await o(e.postId, O);
		} catch (e) {
			j(e instanceof Error ? e.message : "Failed to save post");
			return;
		}
		D(!1);
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
	v(() => {
		if (e._fadeIn) {
			let e = setTimeout(() => _(1), 10);
			return () => clearTimeout(e);
		}
	}, []);
	let P = e.authorId === r, F = e.authorId.slice(0, 2).toUpperCase();
	return /* @__PURE__ */ E("div", {
		style: { opacity: g },
		className: "border-b border-surface-hover pb-4 mb-4 transition-opacity duration-200 ease-[ease]",
		children: [
			/* @__PURE__ */ E("div", {
				className: "flex items-center gap-2 mb-2",
				children: [/* @__PURE__ */ T("div", {
					className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
					children: F
				}), /* @__PURE__ */ E("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ T("span", {
						className: "text-base font-semibold text-text-primary",
						children: e.authorId
					}), /* @__PURE__ */ T("span", {
						className: "text-sm text-text-tertiary ml-2",
						children: ge(e.createdAt)
					})]
				})]
			}),
			w ? /* @__PURE__ */ E("div", {
				className: "mb-2",
				children: [/* @__PURE__ */ T(m, {
					value: O,
					onChange: (e) => k(e.target.value),
					rows: 3,
					className: "resize-y mb-2"
				}), /* @__PURE__ */ E("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ T("button", {
						onClick: () => {
							M();
						},
						disabled: !O.trim(),
						className: s("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", O.trim() ? "bg-primary text-white border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"),
						children: "Save"
					}), /* @__PURE__ */ T("button", {
						onClick: () => {
							D(!1), k(e.content);
						},
						className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Discard Changes"
					})]
				})]
			}) : /* @__PURE__ */ T("div", {
				className: "text-base text-text-primary mt-2 mb-2",
				children: e.content
			}),
			/* @__PURE__ */ E("div", {
				className: "flex gap-4 text-sm mt-1 items-center flex-wrap",
				children: [
					/* @__PURE__ */ T(ye, {
						isLiked: l,
						likeCount: u,
						whoLiked: d,
						toggle: f
					}),
					/* @__PURE__ */ T(be, { reactWithEmoji: p }),
					/* @__PURE__ */ T("button", {
						onClick: () => b((e) => !e),
						className: "bg-transparent border-none text-sm text-text-secondary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Comment"
					}),
					P && !w && /* @__PURE__ */ T("button", {
						onClick: () => D(!0),
						className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Edit"
					}),
					P && !x && !w && /* @__PURE__ */ T("button", {
						onClick: () => S(!0),
						className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Delete"
					}),
					P && x && /* @__PURE__ */ E("div", {
						role: "group",
						"aria-label": "Confirm delete post",
						className: "flex gap-1.5 items-center",
						children: [
							/* @__PURE__ */ T("span", {
								className: "text-xs text-text-primary",
								children: "Delete this post?"
							}),
							/* @__PURE__ */ T("button", {
								onClick: () => S(!1),
								className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
								children: "Cancel"
							}),
							/* @__PURE__ */ T("button", {
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
			(A ?? h) && /* @__PURE__ */ T("div", {
				role: "alert",
				"data-testid": "post-action-error",
				className: "text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
				children: A ?? h
			}),
			y && /* @__PURE__ */ T(X, {
				idToken: t,
				roomId: n,
				postId: e.postId,
				onMessage: a
			})
		]
	});
}
function Se({ idToken: e, roomId: t, onMessage: r }) {
	let { posts: i, createPost: a, editPost: o, deletePost: c, loading: l, mutating: u, error: d, loadError: f, hasMore: p, loadMore: m } = n({
		idToken: e,
		roomId: t,
		onMessage: r
	}), h = _e(e);
	return /* @__PURE__ */ E("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ T(ve, {
				onCreate: a,
				loading: l || u
			}),
			/* @__PURE__ */ T("div", { className: "border-t border-border my-4" }),
			p && /* @__PURE__ */ T("button", {
				onClick: () => void m(),
				disabled: l,
				className: s("w-full h-9 mb-4 bg-surface text-text-primary border border-border rounded-lg text-sm font-[system-ui,-apple-system,sans-serif]", l ? "cursor-default" : "cursor-pointer"),
				children: l ? "Loading…" : "Load more"
			}),
			d && i.length > 0 && /* @__PURE__ */ T("div", {
				role: "alert",
				"data-testid": "post-feed-error",
				className: "text-danger-fg text-[13px] mb-3 font-[system-ui,-apple-system,sans-serif]",
				children: d
			}),
			l && i.length === 0 ? /* @__PURE__ */ E("div", {
				className: "flex items-center gap-2 p-4 justify-center text-text-secondary",
				children: [/* @__PURE__ */ T("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }), "Loading..."]
			}) : f && i.length === 0 ? /* @__PURE__ */ E("div", {
				role: "alert",
				className: "py-6 text-center",
				children: [/* @__PURE__ */ T("div", {
					className: "text-sm font-semibold text-danger-fg mb-1",
					children: "Couldn’t load posts"
				}), /* @__PURE__ */ T("div", {
					className: "text-sm text-text-tertiary",
					children: f
				})]
			}) : i.length === 0 ? /* @__PURE__ */ E("div", {
				className: "py-6 text-center",
				children: [/* @__PURE__ */ T("div", {
					className: "text-sm font-semibold text-text-primary mb-1",
					children: "No posts yet"
				}), /* @__PURE__ */ T("div", {
					className: "text-sm text-text-tertiary",
					children: "Be the first to post in this room."
				})]
			}) : i.map((n) => /* @__PURE__ */ T(xe, {
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
//#region src/components/social/ActivityPanel.tsx
function Z() {
	return "";
}
var Ce = 50;
function we(e) {
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
function Te(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function Ee(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function De({ idToken: e, sendMessage: t, onMessage: n, connectionState: r }) {
	let [i, a] = C([]), [s, c] = C(!0), [l, u] = C(!1), [d, f] = C(null), [p, m] = C(0), h = S(t);
	v(() => {
		h.current = t;
	}, [t]);
	let { toast: g } = o(), y = Ee(e), b = _(() => m((e) => e + 1), []);
	return v(() => {
		let t = Z();
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
	]), v(() => {
		if (r !== "connected" || !y) {
			u(!1);
			return;
		}
		let e = `activity:${y}`;
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
	}, [r, y]), v(() => n((e) => {
		if (e.type !== "activity:event") return;
		let t = e.payload;
		t && a((e) => e.length > 0 && e[0].timestamp === t.timestamp && e[0].eventType === t.eventType ? e : [{
			eventType: t.eventType,
			timestamp: t.timestamp,
			detail: t.detail
		}, ...e].slice(0, Ce));
	}), [n]), {
		items: i,
		loading: s,
		isLive: l,
		error: d,
		retry: b
	};
}
function Oe({ idToken: e, sendMessage: t, onMessage: n, connectionState: r }) {
	let { items: i, loading: a, isLive: o, error: c, retry: l } = De({
		idToken: e,
		sendMessage: t,
		onMessage: n,
		connectionState: r
	});
	return /* @__PURE__ */ E("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [/* @__PURE__ */ E("h2", {
			className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
			children: ["Activity", o && /* @__PURE__ */ T("span", {
				className: "inline-block w-2 h-2 rounded-full bg-success ml-2 align-middle",
				title: "Live"
			})]
		}), a ? /* @__PURE__ */ E("div", {
			className: "flex items-center gap-2 p-4 justify-center text-text-secondary",
			children: [/* @__PURE__ */ T("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }), "Loading..."]
		}) : c && i.length === 0 ? /* @__PURE__ */ E("div", {
			role: "alert",
			className: "py-6 px-4 text-center text-danger-fg text-sm flex flex-col items-center gap-2",
			children: [
				/* @__PURE__ */ T("span", { children: "Couldn't load activity" }),
				/* @__PURE__ */ T("span", {
					className: "text-text-secondary text-xs",
					children: c
				}),
				/* @__PURE__ */ T("button", {
					type: "button",
					onClick: l,
					className: "mt-1 px-3 py-1 text-xs font-medium text-info-fg bg-info-bg border border-info-border rounded cursor-pointer",
					children: "Retry"
				})
			]
		}) : i.length === 0 ? /* @__PURE__ */ T("div", {
			className: "py-10 text-center text-text-tertiary text-sm",
			children: "No activity yet"
		}) : /* @__PURE__ */ T("div", { children: i.map((e, t) => {
			let { icon: n, text: r } = we(e);
			return /* @__PURE__ */ E("div", {
				className: s("flex flex-row items-center gap-2 py-2", t < i.length - 1 && "border-b border-surface-hover"),
				children: [
					/* @__PURE__ */ T("span", {
						className: "w-6 shrink-0 text-center",
						children: n
					}),
					/* @__PURE__ */ T("span", {
						className: "flex-1 text-sm text-text-primary",
						children: r
					}),
					/* @__PURE__ */ T("span", {
						className: "text-xs text-text-tertiary shrink-0",
						children: Te(e.timestamp)
					})
				]
			}, t);
		}) })]
	});
}
//#endregion
//#region src/components/social/ConversationList.tsx
function ke({ items: e, activeChannel: t, onSelect: n, onNewChat: r, emptyLabel: i = "No conversations yet", tone: a = "light", className: o, "data-testid": d }) {
	let p = a === "dark";
	return /* @__PURE__ */ E("div", {
		className: s("flex min-h-0 flex-col gap-1", o),
		"data-testid": d,
		children: [r && /* @__PURE__ */ E("button", {
			type: "button",
			onClick: r,
			"data-testid": "conversation-new-chat",
			className: s("flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] font-medium", p ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"),
			children: [/* @__PURE__ */ T("span", {
				"aria-hidden": "true",
				className: s("grid h-6 w-6 place-items-center rounded-full border border-dashed text-sm leading-none", p ? "border-white/30" : "border-border"),
				children: "+"
			}), "New chat"]
		}), e.length === 0 ? /* @__PURE__ */ T("p", {
			className: s("m-0 px-2 py-1.5 text-[13px]", p ? "text-white/60" : "text-text-secondary"),
			"data-testid": "conversation-empty",
			children: i
		}) : /* @__PURE__ */ T("ul", {
			className: "m-0 flex min-h-0 list-none flex-col gap-0.5 overflow-y-auto p-0",
			"aria-label": "Conversations",
			children: e.map((e) => {
				let r = e.channel === t, i = e.peers.length > 1, a = e.peers[0], o = e.peers.map((e) => e.displayName).join(", "), d = e.lastMessageAt ? f(e.lastMessageAt) : "", m = e.unreadCount ?? 0;
				return /* @__PURE__ */ T("li", { children: /* @__PURE__ */ E("button", {
					type: "button",
					onClick: () => n(e.channel),
					"data-testid": "conversation-row",
					"data-channel": e.channel,
					"data-active": r ? "true" : "false",
					"aria-current": r ? "true" : void 0,
					className: s("flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-left", p ? "hover:bg-white/10" : "hover:bg-surface-hover", r && (p ? "bg-white/10" : "bg-surface-hover")),
					children: [
						i ? /* @__PURE__ */ T(l, {
							size: 28,
							maxVisible: 2,
							items: e.peers.map((e) => ({
								name: e.displayName,
								color: e.color,
								src: e.avatarUrl
							}))
						}) : a ? /* @__PURE__ */ E("span", {
							className: "relative inline-flex shrink-0",
							children: [/* @__PURE__ */ T(u, {
								name: a.displayName,
								color: a.color,
								src: a.avatarUrl,
								size: 28
							}), a.online !== void 0 && /* @__PURE__ */ T(c, {
								state: a.online ? "online" : "offline",
								pulse: !1,
								className: s("absolute -bottom-0.5 -right-0.5 rounded-full ring-2", p ? "ring-surface-inverse" : "ring-surface")
							})]
						}) : null,
						/* @__PURE__ */ E("span", {
							className: "flex min-w-0 flex-1 flex-col",
							children: [/* @__PURE__ */ E("span", {
								className: "flex items-baseline gap-2",
								children: [/* @__PURE__ */ T("span", {
									className: s("min-w-0 flex-1 truncate text-[13px]", m > 0 ? "font-semibold" : "font-medium", p ? "text-white" : "text-text-primary"),
									children: o
								}), d && /* @__PURE__ */ T("span", {
									className: s("shrink-0 text-[11px] tabular-nums", p ? "text-white/50" : "text-text-tertiary"),
									"data-testid": "conversation-time",
									children: d
								})]
							}), e.lastMessagePreview && /* @__PURE__ */ T("span", {
								className: s("truncate text-[12px]", p ? "text-white/60" : "text-text-secondary"),
								"data-testid": "conversation-preview",
								children: e.lastMessagePreview
							})]
						}),
						m > 0 && /* @__PURE__ */ T("span", {
							"data-testid": "conversation-unread",
							className: "grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-primary px-1.5 text-[11px] font-semibold leading-none text-white",
							children: m > 99 ? "99+" : m
						})
					]
				}) }, e.channel);
			})
		})]
	});
}
//#endregion
//#region src/components/social/ReactionPickerPopover.tsx
var Q = /* @__PURE__ */ "👍.❤️.🔥.😂.👏.🎉.😮.💯.😀.😅.😉.😍.😘.🤣.🥰.😇.🤔.😎.😢.😡.🤯.😱.🙃.🤩.🙏.🤝.👋.👌.✌️.🤞.🤘.🫶.✨.⭐.💫.🌟.⚡.💥.☀️.🌈.🚀.🎯.🏆.💪.🎊.🎈.🥳.🎁.☕.🍕.🍔.🍩.🍦.🍓.🍻.🍷.👀.🤖.👻.😺.🐶.🦄.🐝.🌸".split(".");
function Ae(e, t) {
	let [n, r] = C(null);
	return b(() => {
		if (!t || !e?.current) {
			r(null);
			return;
		}
		let n = () => {
			let t = e.current;
			if (!t) return;
			let n = t.getBoundingClientRect();
			r({
				top: Math.max(8, n.top - 12),
				left: n.left
			});
		};
		return n(), window.addEventListener("scroll", n, !0), window.addEventListener("resize", n), () => {
			window.removeEventListener("scroll", n, !0), window.removeEventListener("resize", n);
		};
	}, [t, e]), n;
}
function $({ open: e, onSelect: t, onClose: n, triggerRef: r, emojis: i = Q, showSearch: a = !0, className: o, style: c }) {
	let l = S(null), u = y(), d = Ae(r, e);
	v(() => {
		if (!e) return;
		let t = (e) => {
			let t = e.target;
			l.current?.contains(t) || r?.current?.contains(t) || n();
		};
		return document.addEventListener("mousedown", t), () => document.removeEventListener("mousedown", t);
	}, [
		e,
		n,
		r
	]), v(() => {
		if (!e) return;
		let t = (e) => {
			e.key === "Escape" && (e.stopPropagation(), n());
		};
		return document.addEventListener("keydown", t), () => document.removeEventListener("keydown", t);
	}, [e, n]);
	let f = _((e) => {
		t(e), n();
	}, [t, n]), p = x(() => d ? {
		position: "fixed",
		top: d.top,
		left: d.left,
		transform: "translateY(-100%)"
	} : { position: "absolute" }, [d]);
	return e ? /* @__PURE__ */ T("div", {
		ref: l,
		role: "dialog",
		"aria-label": "Pick a reaction",
		"data-testid": "reaction-picker-popover",
		className: s("z-50 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg p-2", "w-[18rem]", o),
		style: {
			...p,
			...c
		},
		children: /* @__PURE__ */ E(D, {
			label: "Pick a reaction",
			loop: !0,
			children: [a && /* @__PURE__ */ T(D.Input, {
				id: `${u}-search`,
				placeholder: "Search reactions…",
				className: s("w-full rounded-md border border-[var(--color-border-field)] bg-transparent", "px-2 py-1.5 text-sm text-[var(--color-text-primary)] mb-2", "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"),
				autoFocus: !0
			}), /* @__PURE__ */ E(D.List, {
				className: "max-h-[14rem] overflow-y-auto",
				"data-testid": "reaction-picker-list",
				children: [/* @__PURE__ */ T(D.Empty, {
					className: "px-2 py-3 text-xs text-[var(--color-text-secondary)]",
					children: "No reactions match."
				}), /* @__PURE__ */ T("div", {
					role: "presentation",
					className: "grid grid-cols-8 gap-1",
					children: i.map((e) => /* @__PURE__ */ T(D.Item, {
						value: e,
						onSelect: () => f(e),
						"data-testid": "reaction-picker-item",
						"data-emoji": e,
						className: s("flex items-center justify-center text-xl rounded-md", "h-9 cursor-pointer select-none", "aria-selected:bg-[var(--color-primary)]/20", "hover:bg-white/5"),
						children: e
					}, e))
				})]
			})]
		})
	}) : null;
}
//#endregion
//#region src/components/social/ReactionsBar.tsx
function je({ reactions: e, onReact: t, disabled: n = !1, pickerEmojis: r = Q, addTriggerLabel: i, hideAddTrigger: a = !1, className: o }) {
	let [c, l] = C(!1), u = S(null), d = (e) => {
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
	return /* @__PURE__ */ E("div", {
		"data-testid": "reactions-bar",
		className: s("relative inline-flex flex-wrap items-center gap-1", o),
		children: [
			p.map((e) => /* @__PURE__ */ E("button", {
				type: "button",
				onClick: () => d(e.emoji),
				disabled: n,
				"aria-pressed": e.mine ?? !1,
				"data-testid": "reaction-chip",
				"data-emoji": e.emoji,
				"data-mine": e.mine ? "true" : "false",
				className: s("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs leading-none transition-colors", e.mine ? "border-[var(--color-primary)] bg-[var(--color-primary)]/15 text-[var(--color-text-primary)]" : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/60 hover:text-[var(--color-text-primary)]", n && "opacity-50 cursor-not-allowed"),
				children: [/* @__PURE__ */ T("span", {
					"aria-hidden": !0,
					className: "text-sm leading-none",
					children: e.emoji
				}), /* @__PURE__ */ T("span", {
					className: "tabular-nums",
					children: e.count
				})]
			}, e.emoji)),
			!a && /* @__PURE__ */ E("button", {
				ref: u,
				type: "button",
				onClick: () => !n && l((e) => !e),
				disabled: n,
				"aria-haspopup": "dialog",
				"aria-expanded": c,
				"data-testid": "reactions-bar-add",
				className: s("inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-border)]", "h-6 min-w-6 px-1.5 text-xs text-[var(--color-text-secondary)] transition-colors", !n && "hover:border-[var(--color-primary)] hover:text-[var(--color-text-primary)]", n && "opacity-50 cursor-not-allowed"),
				children: [i ?? /* @__PURE__ */ T("span", {
					"aria-hidden": !0,
					children: "+ 😀"
				}), /* @__PURE__ */ T("span", {
					className: "sr-only",
					children: "Add reaction"
				})]
			}),
			/* @__PURE__ */ T($, {
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
export { Oe as a, de as c, B as d, z as f, ke as i, ue as l, Q as n, Se as o, P as p, $ as r, X as s, je as t, K as u };
