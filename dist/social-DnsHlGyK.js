import { a as e, i as t, n, o as r, r as i, t as a } from "./useSocialProfile-Cs3kuR7d.js";
import { n as o } from "./ToastProvider-DPq8u2eM.js";
import { t as s } from "./cn-DhjIN-s0.js";
import { r as c } from "./PresencePanel-CSfDAAq8.js";
import { t as l } from "./Input-DcK2h-jK.js";
import { t as u } from "./Textarea-C3t5PCLv.js";
import { t as d } from "./rovingFocus-Bj5Y6kwY.js";
import { t as f } from "./Select-Z0TLUVeL.js";
import { createContext as p, useCallback as m, useContext as h, useEffect as g, useId as _, useLayoutEffect as v, useMemo as y, useRef as b, useState as x } from "react";
import { Fragment as S, jsx as C, jsxs as w } from "react/jsx-runtime";
import { Command as T } from "cmdk";
//#region src/contexts/ThemeContext.tsx
var E = p({
	theme: "light",
	toggleTheme: () => {}
}), D = "wsg-theme";
function O({ children: e }) {
	let [t, n] = x(() => {
		try {
			let e = localStorage.getItem(D);
			if (e === "dark" || e === "light") return e;
		} catch {}
		return "light";
	});
	g(() => {
		try {
			localStorage.setItem(D, t);
		} catch {}
		document.documentElement.setAttribute("data-theme", t);
	}, [t]);
	let r = m(() => {
		n((e) => e === "light" ? "dark" : "light");
	}, []), i = y(() => ({
		theme: t,
		toggleTheme: r
	}), [t, r]);
	return /* @__PURE__ */ C(E.Provider, {
		value: i,
		children: e
	});
}
function k() {
	return h(E);
}
//#endregion
//#region src/components/social/SocialPanel.tsx
function A(e, t) {
	return {
		id: e.userId,
		displayName: e.displayName,
		bio: "",
		avatarUrl: e.avatarUrl ?? null,
		visibility: e.visibility,
		followState: t
	};
}
function j(e) {
	return {
		id: e.userId,
		displayName: e.displayName,
		bio: e.bio ?? "",
		avatarUrl: e.avatarUrl ?? null,
		visibility: e.visibility
	};
}
function M({ user: e, size: t }) {
	let n = e.displayName.slice(0, 2).toUpperCase();
	return e.avatarUrl ? /* @__PURE__ */ C("div", {
		className: s("rounded-full bg-border flex items-center justify-center font-semibold text-text-primary shrink-0 overflow-hidden", t === 48 ? "w-12 h-12 text-base" : "w-8 h-8 text-xs"),
		children: /* @__PURE__ */ C("img", {
			src: e.avatarUrl,
			alt: `${e.displayName}'s avatar`,
			className: "w-full h-full object-cover"
		})
	}) : /* @__PURE__ */ C("div", {
		className: s("rounded-full bg-border flex items-center justify-center font-semibold text-text-primary shrink-0 overflow-hidden", t === 48 ? "w-12 h-12 text-base" : "w-8 h-8 text-xs"),
		"aria-label": `Avatar placeholder for ${e.displayName}`,
		children: n
	});
}
function N({ targetUser: e, followState: t, compact: n = !1, onFollowChange: r }) {
	let [i, a] = x(!1);
	return t === "not-following" ? /* @__PURE__ */ C("button", {
		className: s("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border-none font-[system-ui,-apple-system,sans-serif] bg-primary text-white font-semibold", n ? "h-7" : "h-9"),
		onClick: () => {
			r(e.id, "pending");
		},
		"aria-label": `Follow ${e.displayName}`,
		children: "Follow"
	}) : t === "pending" ? /* @__PURE__ */ C("button", {
		className: s("rounded-lg text-sm min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface-hover text-text-secondary font-normal cursor-default", n ? "h-7" : "h-9"),
		disabled: !0,
		"aria-label": `Follow ${e.displayName}`,
		children: "Following…"
	}) : /* @__PURE__ */ w("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ C("button", {
			className: s("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface text-text-primary font-normal", n ? "h-7" : "h-9"),
			onClick: () => a(!0),
			"aria-label": `Unfollow ${e.displayName}`,
			children: "Following"
		}), i && /* @__PURE__ */ w("div", {
			role: "group",
			"aria-label": "Confirm unfollow",
			className: "flex gap-2 items-center",
			children: [
				/* @__PURE__ */ w("span", {
					className: "text-sm text-text-primary mr-1",
					children: [
						"Unfollow ",
						e.displayName,
						"?"
					]
				}),
				/* @__PURE__ */ C("button", {
					onClick: () => a(!1),
					className: "h-9 rounded-lg text-sm px-3 bg-surface text-text-primary border border-border cursor-pointer font-[system-ui,-apple-system,sans-serif]",
					children: "Keep Following"
				}),
				/* @__PURE__ */ C("button", {
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
function P({ user: e, isOwnProfile: t, onSave: n }) {
	let [r, i] = x(!1), [a, o] = x(e.displayName), [c, f] = x(e.bio), [p, m] = x(e.avatarUrl ?? ""), [h, _] = x(e.visibility), [v, y] = x(!1);
	g(() => {
		o(e.displayName), f(e.bio), m(e.avatarUrl ?? ""), _(e.visibility);
	}, [e.id]);
	let b = async () => {
		y(!0);
		try {
			await n({
				displayName: a,
				bio: c,
				avatarUrl: p || void 0,
				visibility: h
			}), i(!1);
		} finally {
			y(!1);
		}
	};
	return r ? /* @__PURE__ */ w("div", { children: [
		/* @__PURE__ */ w("div", {
			className: "mb-3",
			children: [/* @__PURE__ */ C("label", {
				className: "text-sm text-text-primary block mb-1",
				children: "Display name"
			}), /* @__PURE__ */ C(l, {
				value: a,
				onChange: (e) => o(e.target.value.slice(0, 50)),
				placeholder: "Your name",
				maxLength: 50
			})]
		}),
		/* @__PURE__ */ w("div", {
			className: "mb-3",
			children: [/* @__PURE__ */ C("label", {
				className: "text-sm text-text-primary block mb-1",
				children: "Bio"
			}), /* @__PURE__ */ C(u, {
				value: c,
				onChange: (e) => f(e.target.value.slice(0, 160)),
				placeholder: "Tell people a bit about yourself (max 160 characters)",
				maxLength: 160,
				rows: 3,
				className: "resize-y"
			})]
		}),
		/* @__PURE__ */ w("div", {
			className: "mb-4",
			children: [/* @__PURE__ */ C("label", {
				className: "text-sm text-text-primary block mb-1",
				children: "Avatar URL"
			}), /* @__PURE__ */ C(l, {
				value: p,
				onChange: (e) => m(e.target.value),
				placeholder: "https://example.com/avatar.png"
			})]
		}),
		/* @__PURE__ */ C("div", {
			className: "mb-4",
			children: /* @__PURE__ */ C("div", {
				role: "radiogroup",
				"aria-label": "Profile visibility",
				onKeyDown: (e) => d(e, { itemSelector: "[role=\"radio\"]" }),
				className: "flex gap-2",
				children: ["public", "private"].map((e) => /* @__PURE__ */ C("button", {
					type: "button",
					role: "radio",
					"aria-checked": h === e,
					tabIndex: h === e ? 0 : -1,
					onClick: () => _(e),
					className: s("px-4 py-1 rounded-full text-sm cursor-pointer border border-border font-[system-ui,-apple-system,sans-serif]", h === e ? "bg-primary text-white" : "bg-surface text-text-primary"),
					children: e.charAt(0).toUpperCase() + e.slice(1)
				}, e))
			})
		}),
		/* @__PURE__ */ w("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ C("button", {
				onClick: () => {
					b();
				},
				disabled: v,
				className: s("flex-1 h-9 bg-primary text-white border-none rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", v ? "cursor-default" : "cursor-pointer"),
				children: v ? "Saving…" : "Save Changes"
			}), /* @__PURE__ */ C("button", {
				onClick: () => i(!1),
				className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Discard Changes"
			})]
		})
	] }) : /* @__PURE__ */ w("div", { children: [
		/* @__PURE__ */ w("div", {
			className: "flex items-start gap-3 mb-3",
			children: [/* @__PURE__ */ C(M, {
				user: e,
				size: 48
			}), /* @__PURE__ */ w("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ w("div", {
					className: "flex items-center gap-2 mb-1",
					children: [/* @__PURE__ */ C("span", {
						className: "text-xl font-semibold text-text-primary",
						children: e.displayName
					}), /* @__PURE__ */ C("span", {
						className: s("text-xs px-2 py-0.5 rounded", e.visibility === "public" ? "bg-success-bg text-success" : "bg-surface-hover text-text-secondary"),
						children: e.visibility === "public" ? "Public" : "Private"
					})]
				}), /* @__PURE__ */ C("p", {
					className: "text-base text-text-primary m-0 overflow-hidden line-clamp-3",
					children: e.bio
				})]
			})]
		}),
		/* @__PURE__ */ w("div", {
			className: "flex gap-4 text-sm text-text-secondary mb-3",
			children: [
				/* @__PURE__ */ w("span", { children: [/* @__PURE__ */ C("strong", {
					className: "text-text-primary",
					children: e.followersCount ?? 0
				}), " Followers"] }),
				/* @__PURE__ */ w("span", { children: [/* @__PURE__ */ C("strong", {
					className: "text-text-primary",
					children: e.followingCount ?? 0
				}), " Following"] }),
				/* @__PURE__ */ w("span", { children: [/* @__PURE__ */ C("strong", {
					className: "text-text-primary",
					children: e.friendsCount ?? 0
				}), " Friends"] })
			]
		}),
		t && /* @__PURE__ */ C("button", {
			onClick: () => i(!0),
			className: "text-sm text-primary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
			children: "Edit profile"
		})
	] });
}
function F({ followers: e, following: t, friends: n, followStates: r, onFollowChange: i }) {
	let [a, o] = x("followers"), c = [
		{
			key: "followers",
			label: `Followers (${e.length})`,
			users: e
		},
		{
			key: "following",
			label: `Following (${t.length})`,
			users: t
		},
		{
			key: "friends",
			label: `Friends (${n.length})`,
			users: n
		}
	], l = {
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
	}, u = c.find((e) => e.key === a)?.users ?? [];
	return /* @__PURE__ */ w("div", {
		className: "mt-4",
		children: [/* @__PURE__ */ C("div", {
			role: "tablist",
			"aria-label": "Connections",
			onKeyDown: d,
			className: "flex border-b border-border mb-3",
			children: c.map((e) => /* @__PURE__ */ C("button", {
				type: "button",
				role: "tab",
				id: `social-tab-${e.key}`,
				"aria-controls": "social-tabpanel",
				"aria-selected": a === e.key,
				tabIndex: a === e.key ? 0 : -1,
				onClick: () => o(e.key),
				className: s("px-4 py-2 text-sm font-normal bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif] -mb-px", a === e.key ? "text-text-primary border-b-2 border-b-primary" : "text-text-secondary border-b-2 border-b-transparent"),
				children: e.label
			}, e.key))
		}), /* @__PURE__ */ C("div", {
			role: "tabpanel",
			id: "social-tabpanel",
			"aria-labelledby": `social-tab-${a}`,
			className: "min-h-[120px]",
			children: u.length === 0 ? /* @__PURE__ */ w("div", {
				className: "py-6 text-center",
				children: [/* @__PURE__ */ C("div", {
					className: "text-sm font-semibold text-text-primary mb-1",
					children: l[a].heading
				}), /* @__PURE__ */ C("div", {
					className: "text-sm text-text-tertiary",
					children: l[a].body
				})]
			}) : /* @__PURE__ */ C("div", { children: u.map((e) => /* @__PURE__ */ w("div", {
				className: "flex items-center gap-2 h-14 border-b border-surface-hover",
				children: [
					/* @__PURE__ */ C(M, {
						user: e,
						size: 32
					}),
					/* @__PURE__ */ w("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ C("div", {
							className: "text-base text-text-primary",
							children: e.displayName
						}), /* @__PURE__ */ C("div", {
							className: "text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap max-w-[240px]",
							children: e.visibility === "private" ? /* @__PURE__ */ C("em", {
								className: "text-text-tertiary",
								children: "This profile is private."
							}) : e.bio
						})]
					}),
					/* @__PURE__ */ C(N, {
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
function I({ idToken: t, onMessage: n }) {
	let { profile: r, loading: i, updateProfile: o } = a({ idToken: t }), { followers: s, following: c, friends: l, follow: u, unfollow: d } = e({ idToken: t }), f = new Set(c.map((e) => e.userId)), p = {};
	[
		...s,
		...c,
		...l
	].forEach((e) => {
		p[e.userId] = f.has(e.userId) ? "following" : "not-following";
	});
	let [m, h] = x(null), g = async (e, t) => {
		h(null);
		try {
			t === "following" || t === "pending" ? await u(e) : await d(e);
		} catch (e) {
			h(e instanceof Error ? e.message : "Follow action failed");
		}
	}, _ = s.map((e) => A(e, p[e.userId] ?? "not-following")), v = c.map((e) => A(e, "following")), y = l.map((e) => A(e, "following")), b = r ? {
		...j(r),
		followersCount: s.length,
		followingCount: c.length,
		friendsCount: l.length
	} : null;
	return /* @__PURE__ */ w("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ C("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
				children: "Social Profile"
			}),
			i && !b ? /* @__PURE__ */ C("div", {
				className: "py-10 text-center text-text-tertiary text-sm",
				children: "Loading profile…"
			}) : b ? /* @__PURE__ */ w(S, { children: [/* @__PURE__ */ C(P, {
				user: b,
				isOwnProfile: !0,
				onSave: o
			}), /* @__PURE__ */ C(F, {
				followers: _,
				following: v,
				friends: y,
				followStates: p,
				onFollowChange: g
			})] }) : null,
			m && /* @__PURE__ */ C("div", {
				className: "text-danger text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
				children: m
			})
		]
	});
}
//#endregion
//#region src/components/social/RoomList.tsx
function L({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = x(""), [a, o] = x(null), c = async (t) => {
		if (t.preventDefault(), r.trim()) {
			o(null);
			try {
				await e(r.trim()), i("");
			} catch (e) {
				o(e instanceof Error ? e.message : "Failed to create room");
			}
		}
	};
	return /* @__PURE__ */ w("form", {
		onSubmit: (e) => {
			c(e);
		},
		className: "my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border",
		children: [
			/* @__PURE__ */ C(l, {
				size: "sm",
				value: r,
				onChange: (e) => i(e.target.value.slice(0, 50)),
				placeholder: "Room name",
				maxLength: 50,
				required: !0,
				autoFocus: !0,
				className: "mb-1.5"
			}),
			/* @__PURE__ */ w("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ C("button", {
					type: "submit",
					disabled: !r.trim() || n,
					className: s("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !r.trim() || n ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: n ? "Creating…" : "Create"
				}), /* @__PURE__ */ C("button", {
					type: "button",
					onClick: t,
					className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
					children: "Cancel"
				})]
			}),
			a && /* @__PURE__ */ C("div", {
				className: "text-danger text-[11px] mt-1",
				children: a
			})
		]
	});
}
function R({ onCreateDM: e, loading: t, friends: n }) {
	let [r, i] = x(""), [a, o] = x(!1), [c, l] = x(null), u = async (t) => {
		if (t.preventDefault(), r.trim()) {
			l(null);
			try {
				await e(r.trim()), i(""), o(!1);
			} catch (e) {
				l(e instanceof Error ? e.message : "Failed to open DM");
			}
		}
	};
	return a ? /* @__PURE__ */ w("form", {
		onSubmit: (e) => {
			u(e);
		},
		className: "my-1 mb-2 p-2 bg-surface-panel rounded-md border border-border",
		children: [
			/* @__PURE__ */ C(f, {
				size: "sm",
				value: r,
				onChange: (e) => i(e.target.value),
				disabled: n.length === 0,
				className: "mb-1.5",
				options: [{
					value: "",
					label: n.length === 0 ? "No mutual friends yet" : "Select a friend…"
				}, ...n.map((e) => ({
					value: e.userId,
					label: e.displayName
				}))]
			}),
			/* @__PURE__ */ w("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ C("button", {
					type: "submit",
					disabled: !r.trim() || t || n.length === 0,
					className: s("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !r.trim() || t ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: "Open DM"
				}), /* @__PURE__ */ C("button", {
					type: "button",
					onClick: () => o(!1),
					className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
					children: "Cancel"
				})]
			}),
			c && /* @__PURE__ */ C("div", {
				className: "text-danger text-[11px] mt-1",
				children: c
			})
		]
	}) : /* @__PURE__ */ C("button", {
		onClick: () => o(!0),
		className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded mb-1",
		children: "+ New DM"
	});
}
function z({ room: e, isActive: t, onClick: n }) {
	return /* @__PURE__ */ w("div", {
		onClick: n,
		className: s("flex items-center h-14 border-b border-surface-hover cursor-pointer pr-2", t ? "bg-surface-hover border-l-[3px] border-l-primary pl-[13px]" : "bg-transparent border-l-[3px] border-l-transparent"),
		children: [/* @__PURE__ */ C("div", {
			className: s("flex-1 text-base text-text-primary", t ? "font-semibold" : "font-normal"),
			children: e.name
		}), /* @__PURE__ */ C("span", {
			className: ((e) => e === "standalone" ? "bg-accent-bg text-primary text-xs px-2 py-0.5 rounded" : e === "group" ? "bg-info-bg text-info text-xs px-2 py-0.5 rounded" : "bg-success-bg text-success text-xs px-2 py-0.5 rounded")(e.type),
			children: e.type
		})]
	});
}
function B({ room: e, isActive: t, onClick: n }) {
	return /* @__PURE__ */ w("button", {
		onClick: n,
		className: s("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]", t ? "bg-accent-bg text-accent-fg font-semibold" : "bg-transparent text-text-primary font-normal"),
		children: [/* @__PURE__ */ C("span", {
			className: s("text-[13px] shrink-0", t ? "text-primary" : "text-text-tertiary"),
			children: e.type === "dm" ? "●" : "#"
		}), /* @__PURE__ */ C("span", {
			className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1",
			children: e.name
		})]
	});
}
function V({ message: e, onRetry: t, compact: n }) {
	return /* @__PURE__ */ w("div", {
		role: "alert",
		className: s("text-center flex flex-col items-center gap-1.5", n ? "px-2 py-3" : "px-4 py-6"),
		children: [
			/* @__PURE__ */ C("div", {
				className: s("font-semibold text-danger-fg", n ? "text-xs" : "text-sm"),
				children: "Couldn't load rooms"
			}),
			/* @__PURE__ */ C("div", {
				className: s("text-text-secondary", n ? "text-[11px]" : "text-xs"),
				children: e
			}),
			t && /* @__PURE__ */ C("button", {
				type: "button",
				onClick: t,
				className: s("mt-1 font-medium text-info-fg bg-info-bg border border-info-border rounded cursor-pointer font-[system-ui,-apple-system,sans-serif]", n ? "px-2.5 py-0.5 text-[11px]" : "px-3.5 py-1 text-xs"),
				children: "Retry"
			})
		]
	});
}
function H({ idToken: t, rooms: n, createRoom: r, createDM: i, loading: a, error: o, onRetry: s, onRoomSelect: c, activeRoomId: l, compact: u }) {
	let { friends: d } = e({ idToken: t }), [f, p] = x(!1), m = async (e) => {
		await r(e), p(!1);
	};
	return u ? /* @__PURE__ */ w("div", {
		className: "px-2 pt-2",
		children: [
			/* @__PURE__ */ C("button", {
				onClick: () => p((e) => !e),
				className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
				children: "+ New Room"
			}),
			f && /* @__PURE__ */ C(L, {
				onCreate: m,
				onDiscard: () => p(!1),
				loading: a
			}),
			/* @__PURE__ */ C(R, {
				onCreateDM: i,
				loading: a,
				friends: d
			}),
			/* @__PURE__ */ C("div", { children: a && n.length === 0 ? /* @__PURE__ */ C("div", {
				className: "p-2 text-text-tertiary text-xs text-center",
				children: "Loading…"
			}) : o && n.length === 0 ? /* @__PURE__ */ C(V, {
				message: o,
				onRetry: s,
				compact: !0
			}) : n.length === 0 ? /* @__PURE__ */ C("div", {
				className: "px-2 py-3 text-text-tertiary text-xs",
				children: "No rooms yet"
			}) : n.map((e) => /* @__PURE__ */ C(B, {
				room: e,
				isActive: e.roomId === l,
				onClick: () => c(e)
			}, e.roomId)) })
		]
	}) : /* @__PURE__ */ w("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ C("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
				children: "Rooms"
			}),
			/* @__PURE__ */ C("button", {
				onClick: () => p((e) => !e),
				className: "w-full h-9 mb-2 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Create Room"
			}),
			f && /* @__PURE__ */ C(L, {
				onCreate: m,
				onDiscard: () => p(!1),
				loading: a
			}),
			/* @__PURE__ */ C(R, {
				onCreateDM: i,
				loading: a,
				friends: d
			}),
			/* @__PURE__ */ C("div", {
				className: "max-h-80 overflow-y-auto",
				children: a && n.length === 0 ? /* @__PURE__ */ w("div", {
					className: "flex items-center gap-2 p-4 justify-center text-text-secondary",
					children: [/* @__PURE__ */ C("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }), "Loading..."]
				}) : o && n.length === 0 ? /* @__PURE__ */ C(V, {
					message: o,
					onRetry: s
				}) : n.length === 0 ? /* @__PURE__ */ w("div", {
					className: "py-6 text-center",
					children: [/* @__PURE__ */ C("div", {
						className: "text-sm font-semibold text-text-primary mb-1",
						children: "No rooms yet"
					}), /* @__PURE__ */ C("div", {
						className: "text-sm text-text-tertiary",
						children: "Create a room or ask to be added."
					})]
				}) : n.map((e) => /* @__PURE__ */ C(z, {
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
function ee({ group: e, isSelected: t, onClick: n }) {
	return /* @__PURE__ */ w("button", {
		onClick: n,
		className: s("flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1.5 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]", t ? "bg-accent-bg text-accent-fg font-semibold" : "bg-transparent text-text-primary font-normal"),
		children: [/* @__PURE__ */ C("span", {
			className: s("text-xs shrink-0", t ? "text-primary" : "text-text-tertiary"),
			children: e.visibility === "private" ? "🔒" : "👥"
		}), /* @__PURE__ */ C("span", {
			className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1",
			children: e.name
		})]
	});
}
function te({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = x(""), [a, o] = x(null), c = async (t) => {
		if (t.preventDefault(), r.trim()) {
			o(null);
			try {
				await e(r.trim()), i("");
			} catch (e) {
				o(e instanceof Error ? e.message : "Failed to create group");
			}
		}
	};
	return /* @__PURE__ */ w("form", {
		onSubmit: (e) => {
			c(e);
		},
		className: "p-2 bg-surface-panel rounded-md border border-border my-1 mb-2",
		children: [
			/* @__PURE__ */ C(l, {
				size: "sm",
				value: r,
				onChange: (e) => i(e.target.value.slice(0, 50)),
				placeholder: "Group name",
				maxLength: 50,
				required: !0,
				autoFocus: !0,
				className: "mb-1.5"
			}),
			/* @__PURE__ */ w("div", {
				className: "flex gap-1.5",
				children: [/* @__PURE__ */ C("button", {
					type: "submit",
					disabled: !r.trim() || n,
					className: s("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !r.trim() || n ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: n ? "Creating…" : "Create"
				}), /* @__PURE__ */ C("button", {
					type: "button",
					onClick: t,
					className: "h-7 px-2 border border-border rounded-[5px] bg-surface text-text-secondary text-xs cursor-pointer font-[inherit]",
					children: "Cancel"
				})]
			}),
			a && /* @__PURE__ */ C("div", {
				className: "text-danger text-[11px] mt-1",
				children: a
			})
		]
	});
}
function ne({ group: e, members: t, rooms: n, groupId: r, currentUserId: i, createGroupRoom: a, onRoomSelect: o, inviteUser: c, loading: u }) {
	let [d, f] = x(!1), [p, m] = x(""), [h, g] = x(!1), [_, v] = x(""), y = e.ownerId === i, b = n.filter((e) => e.groupId === r), S = async (e) => {
		e.preventDefault(), p.trim() && (await c(r, p.trim()), m(""), f(!1));
	}, T = async (e) => {
		e.preventDefault(), _.trim() && (await a(r, _.trim()), v(""), g(!1));
	};
	return /* @__PURE__ */ w("div", {
		className: "px-2 pb-2 pt-1 border-t border-border mt-1",
		children: [
			/* @__PURE__ */ w("div", {
				className: "flex items-center justify-between mb-1",
				children: [/* @__PURE__ */ w("span", {
					className: "text-[11px] text-text-secondary font-semibold uppercase tracking-wide",
					children: [
						"Members (",
						t.length,
						")"
					]
				}), y && /* @__PURE__ */ C("button", {
					onClick: () => f((e) => !e),
					className: "text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]",
					children: "+ Invite"
				})]
			}),
			d && /* @__PURE__ */ w("form", {
				onSubmit: (e) => {
					S(e);
				},
				className: "flex gap-1 mb-1.5",
				children: [/* @__PURE__ */ C(l, {
					size: "sm",
					value: p,
					onChange: (e) => m(e.target.value),
					placeholder: "User ID",
					className: "flex-1"
				}), /* @__PURE__ */ C("button", {
					type: "submit",
					disabled: !p.trim(),
					className: s("h-6 px-2 border-none rounded text-[11px] font-[inherit]", p.trim() ? "bg-primary text-white cursor-pointer" : "bg-border text-text-tertiary cursor-default"),
					children: "Invite"
				})]
			}),
			/* @__PURE__ */ w("div", {
				className: "flex flex-wrap gap-1 mb-2",
				children: [t.slice(0, 8).map((e) => /* @__PURE__ */ C("div", {
					title: e.displayName ?? e.userId,
					className: "w-6 h-6 rounded-full bg-border flex items-center justify-center text-[10px] font-semibold text-text-primary",
					children: (e.displayName ?? e.userId).slice(0, 2).toUpperCase()
				}, e.userId)), t.length > 8 && /* @__PURE__ */ w("span", {
					className: "text-[11px] text-text-tertiary self-center",
					children: ["+", t.length - 8]
				})]
			}),
			/* @__PURE__ */ w("div", {
				className: "flex items-center justify-between mb-1",
				children: [/* @__PURE__ */ w("span", {
					className: "text-[11px] text-text-secondary font-semibold uppercase tracking-wide",
					children: [
						"Rooms (",
						b.length,
						")"
					]
				}), y && /* @__PURE__ */ C("button", {
					onClick: () => g((e) => !e),
					className: "text-[11px] text-primary bg-transparent border-none cursor-pointer font-[inherit]",
					children: "+ Room"
				})]
			}),
			h && /* @__PURE__ */ w("form", {
				onSubmit: (e) => {
					T(e);
				},
				className: "flex gap-1 mb-1.5",
				children: [/* @__PURE__ */ C(l, {
					size: "sm",
					value: _,
					onChange: (e) => v(e.target.value.slice(0, 50)),
					placeholder: "Room name",
					className: "flex-1"
				}), /* @__PURE__ */ C("button", {
					type: "submit",
					disabled: !_.trim() || u,
					className: s("h-6 px-2 border-none rounded text-[11px] font-[inherit]", !_.trim() || u ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-white cursor-pointer"),
					children: "Create"
				})]
			}),
			b.map((e) => /* @__PURE__ */ w("button", {
				onClick: () => o?.(e),
				className: "flex items-center gap-1.5 w-full border-none rounded-[5px] px-2 py-1 cursor-pointer bg-transparent text-text-primary text-[13px] text-left font-[inherit]",
				children: [/* @__PURE__ */ C("span", {
					className: "text-text-tertiary text-xs",
					children: "#"
				}), /* @__PURE__ */ C("span", {
					className: "overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.name
				})]
			}, e.roomId))
		]
	});
}
function re({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = x(""), [a, o] = x("public"), [c, u] = x(null), d = async (t) => {
		if (t.preventDefault(), r.trim()) {
			u(null);
			try {
				await e(r.trim(), void 0, a);
			} catch (e) {
				u(e instanceof Error ? e.message : "Failed to create group");
			}
		}
	};
	return /* @__PURE__ */ w("form", {
		onSubmit: (e) => {
			d(e);
		},
		className: "mb-3 p-3 bg-surface-panel rounded-lg border border-border",
		children: [
			/* @__PURE__ */ w("div", {
				className: "mb-3",
				children: [/* @__PURE__ */ C("label", {
					className: "text-sm text-text-primary block mb-1",
					children: "Group name"
				}), /* @__PURE__ */ C(l, {
					value: r,
					onChange: (e) => i(e.target.value.slice(0, 50)),
					placeholder: "Group name",
					maxLength: 50,
					required: !0
				})]
			}),
			/* @__PURE__ */ w("div", {
				className: "flex items-center gap-2.5 mb-3.5",
				children: [
					/* @__PURE__ */ C("span", {
						className: "text-[13px] text-text-primary min-w-[42px]",
						children: a === "public" ? "Public" : "Private"
					}),
					/* @__PURE__ */ C("button", {
						type: "button",
						role: "switch",
						"aria-checked": a === "private",
						onClick: () => o((e) => e === "public" ? "private" : "public"),
						className: s("relative w-11 h-6 rounded-xl border-none cursor-pointer p-0 shrink-0 transition-colors duration-200", a === "private" ? "bg-primary" : "bg-state-idle"),
						children: /* @__PURE__ */ C("span", { className: s("absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-[left] duration-200", a === "private" ? "left-[23px]" : "left-[3px]") })
					}),
					/* @__PURE__ */ C("span", {
						className: "text-xs text-text-tertiary",
						children: a === "public" ? "Visible to everyone" : "Invite only"
					})
				]
			}),
			/* @__PURE__ */ w("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ C("button", {
					type: "submit",
					disabled: !r.trim() || n,
					className: s("flex-1 h-9 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !r.trim() || n ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
					children: n ? "Creating…" : "Create Group"
				}), /* @__PURE__ */ C("button", {
					type: "button",
					onClick: t,
					className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
					children: "Cancel"
				})]
			}),
			c && /* @__PURE__ */ C("div", {
				className: "text-danger text-[13px] mt-1.5",
				children: c
			})
		]
	});
}
function ie({ group: e, currentUserId: t, isSelected: n, onSelect: r, onDelete: i }) {
	let [a, o] = x(null), c = e.ownerId === t;
	return /* @__PURE__ */ w("div", {
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
			/* @__PURE__ */ w("div", {
				className: "flex-1 min-w-0 pr-2",
				children: [/* @__PURE__ */ C("div", {
					className: s("text-base text-text-primary", n ? "font-semibold" : "font-normal"),
					children: e.name
				}), e.description && /* @__PURE__ */ C("div", {
					className: "text-sm text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.description
				})]
			}),
			/* @__PURE__ */ C("span", {
				className: s("text-xs px-2 py-0.5 rounded shrink-0 mr-2", e.visibility === "public" ? "bg-success-bg text-success" : "bg-surface-hover text-text-secondary"),
				children: e.visibility
			}),
			c && /* @__PURE__ */ C("div", {
				className: "shrink-0",
				onClick: (e) => e.stopPropagation(),
				children: a === e.groupId ? /* @__PURE__ */ w("div", {
					role: "group",
					"aria-label": "Confirm delete group",
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ C("button", {
						onClick: () => o(null),
						className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Cancel"
					}), /* @__PURE__ */ C("button", {
						onClick: () => {
							i(e.groupId), o(null);
						},
						className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Delete"
					})]
				}) : /* @__PURE__ */ C("button", {
					onClick: () => o(e.groupId),
					className: "text-xs text-danger bg-transparent border-none cursor-pointer px-2 py-1 font-[system-ui,-apple-system,sans-serif]",
					"aria-label": `Delete group ${e.name}`,
					children: "Delete"
				})
			})
		]
	});
}
function ae({ groupId: e, onInvite: t }) {
	let [n, r] = x("");
	return /* @__PURE__ */ w("form", {
		onSubmit: (i) => {
			i.preventDefault(), n.trim() && (t(e, n.trim()), r(""));
		},
		className: "flex gap-2 mt-2",
		children: [/* @__PURE__ */ C(l, {
			className: "flex-1",
			value: n,
			onChange: (e) => r(e.target.value),
			placeholder: "User ID to invite"
		}), /* @__PURE__ */ C("button", {
			type: "submit",
			disabled: !n.trim(),
			className: s("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", n.trim() ? "bg-primary text-white border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"),
			children: "Invite"
		})]
	});
}
function oe({ members: e }) {
	let t = (e) => e === "owner" ? "bg-success-bg text-success text-xs px-2 py-0.5 rounded" : e === "admin" ? "bg-info-bg text-info text-xs px-2 py-0.5 rounded" : "bg-surface-hover text-text-secondary text-xs px-2 py-0.5 rounded";
	return /* @__PURE__ */ C("div", {
		className: "max-h-[200px] overflow-y-auto mt-2 border-t border-border",
		children: e.map((e) => /* @__PURE__ */ w("div", {
			className: "flex items-center gap-2 h-12 border-b border-surface-hover",
			children: [
				/* @__PURE__ */ C("div", {
					className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
					children: (e.displayName ?? e.userId).slice(0, 2).toUpperCase()
				}),
				/* @__PURE__ */ C("div", {
					className: "flex-1 text-base text-text-primary",
					children: e.displayName ?? e.userId
				}),
				/* @__PURE__ */ C("span", {
					className: t(e.role),
					children: e.role
				})
			]
		}, e.userId))
	});
}
function se({ rooms: e, groupId: t, selectedGroupRole: n, createGroupRoom: r, onRoomSelect: i, loading: a }) {
	let [o, c] = x(!1), [u, d] = x(""), f = e.filter((e) => e.groupId === t);
	return /* @__PURE__ */ w("div", {
		className: "mt-3",
		children: [
			/* @__PURE__ */ C("h3", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-2",
				children: "GROUP ROOMS"
			}),
			(n === "owner" || n === "admin") && (o ? /* @__PURE__ */ C("form", {
				onSubmit: async (e) => {
					e.preventDefault(), u.trim() && (await r(t, u.trim()), d(""), c(!1));
				},
				className: "mb-2 p-3 bg-surface-panel rounded-lg border border-border",
				children: /* @__PURE__ */ w("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ C(l, {
							className: "flex-1",
							value: u,
							onChange: (e) => d(e.target.value.slice(0, 50)),
							placeholder: "Room name",
							maxLength: 50,
							required: !0
						}),
						/* @__PURE__ */ C("button", {
							type: "submit",
							disabled: !u.trim() || a,
							className: s("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !u.trim() || a ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
							children: a ? "Creating…" : "Create Room"
						}),
						/* @__PURE__ */ C("button", {
							type: "button",
							onClick: () => c(!1),
							className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
							children: "Cancel"
						})
					]
				})
			}) : /* @__PURE__ */ C("button", {
				onClick: () => c(!0),
				className: "w-full h-9 mb-2 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Create Room"
			})),
			f.length === 0 ? /* @__PURE__ */ C("div", {
				className: "text-sm text-text-tertiary py-2",
				children: "No rooms in this group yet."
			}) : f.map((e) => /* @__PURE__ */ w("div", {
				role: "button",
				tabIndex: 0,
				"aria-label": `Open room ${e.name}`,
				className: "flex items-center h-12 border-b border-surface-hover cursor-pointer pr-2",
				onClick: () => i?.(e),
				onKeyDown: (t) => {
					(t.key === "Enter" || t.key === " ") && (t.preventDefault(), i?.(e));
				},
				children: [/* @__PURE__ */ C("div", {
					className: "flex-1 text-base text-text-primary",
					children: e.name
				}), /* @__PURE__ */ C("span", {
					className: "bg-info-bg text-info text-xs px-2 py-0.5 rounded",
					children: "group"
				})]
			}, e.roomId))
		]
	});
}
function U({ idToken: e, rooms: n, createGroupRoom: r, onRoomSelect: i, roomsLoading: a, compact: o }) {
	let { groups: c, createGroup: l, deleteGroup: u, inviteUser: d, loadMembers: f, members: p, loading: m } = t({ idToken: e }), [h, g] = x(!1), [_, v] = x(null), y = e ? (() => {
		try {
			return JSON.parse(atob(e.split(".")[1])).sub;
		} catch {
			return null;
		}
	})() : null, b = async (e, t, n) => {
		await l(e, t, n), g(!1);
	}, S = (e) => {
		_ === e ? v(null) : (v(e), f(e));
	};
	if (o) {
		let e = _ ? c.find((e) => e.groupId === _) : null;
		return /* @__PURE__ */ w("div", {
			className: "px-2 pt-2",
			children: [
				/* @__PURE__ */ C("button", {
					onClick: () => g((e) => !e),
					className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
					children: "+ New Group"
				}),
				h && /* @__PURE__ */ C(te, {
					onCreate: b,
					onDiscard: () => g(!1),
					loading: m
				}),
				/* @__PURE__ */ C("div", { children: m && c.length === 0 ? /* @__PURE__ */ C("div", {
					className: "p-2 text-text-tertiary text-xs text-center",
					children: "Loading…"
				}) : c.length === 0 ? /* @__PURE__ */ C("div", {
					className: "px-2 py-3 text-text-tertiary text-xs",
					children: "No groups yet"
				}) : c.map((e) => /* @__PURE__ */ C(ee, {
					group: e,
					isSelected: e.groupId === _,
					onClick: () => S(e.groupId)
				}, e.groupId)) }),
				e && /* @__PURE__ */ C(ne, {
					group: e,
					members: p,
					rooms: n,
					groupId: e.groupId,
					currentUserId: y,
					createGroupRoom: r,
					onRoomSelect: i,
					inviteUser: d,
					loading: a
				})
			]
		});
	}
	let T = _ ? c.find((e) => e.groupId === _) : null, E = T && y && T.ownerId === y ? "owner" : "member";
	return /* @__PURE__ */ w("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ C("h2", {
				className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
				children: "Groups"
			}),
			/* @__PURE__ */ C("div", {
				className: "max-h-80 overflow-y-auto mb-3",
				children: c.length === 0 ? /* @__PURE__ */ w("div", {
					className: "py-4 text-center",
					children: [/* @__PURE__ */ C("div", {
						className: "text-sm font-semibold text-text-primary mb-1",
						children: "No groups yet"
					}), /* @__PURE__ */ C("div", {
						className: "text-sm text-text-tertiary",
						children: "Create a group or join a public one."
					})]
				}) : c.map((e) => /* @__PURE__ */ C(ie, {
					group: e,
					currentUserId: y,
					isSelected: _ === e.groupId,
					onSelect: S,
					onDelete: u
				}, e.groupId))
			}),
			_ && /* @__PURE__ */ w("div", {
				className: "mb-3",
				children: [
					/* @__PURE__ */ C(oe, { members: p }),
					(E === "owner" || E === "admin") && /* @__PURE__ */ C(ae, {
						groupId: _,
						onInvite: d
					}),
					/* @__PURE__ */ C(se, {
						rooms: n,
						groupId: _,
						selectedGroupRole: E,
						createGroupRoom: r,
						onRoomSelect: i,
						loading: a
					})
				]
			}),
			/* @__PURE__ */ C("button", {
				onClick: () => g((e) => !e),
				className: s("w-full h-9 bg-primary text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]", h && "mb-2"),
				children: h ? "Cancel" : "Create Group"
			}),
			h && /* @__PURE__ */ C(re, {
				onCreate: b,
				onDiscard: () => g(!1),
				loading: m
			})
		]
	});
}
//#endregion
//#region src/components/social/ChatRoom.tsx
var W = [
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
function ce(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) >>> 0;
	return W[t % W.length];
}
function G(e) {
	let t = e.split(/[\s._@-]/);
	return t.length >= 2 ? (t[0][0] + t[1][0]).toUpperCase() : e.slice(0, 2).toUpperCase();
}
function le(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : new Date(e).toLocaleDateString();
}
function ue(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function de({ post: e, isOwn: t, showSender: n }) {
	let r = ce(e.authorId);
	return /* @__PURE__ */ w("div", {
		className: s("flex items-end gap-2", t ? "flex-row-reverse" : "flex-row", n ? "pt-2 px-4 pb-0.5" : "py-px px-4"),
		children: [/* @__PURE__ */ C("div", {
			className: "w-8 shrink-0 self-end",
			children: !t && n && /* @__PURE__ */ C("div", {
				className: "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white select-none",
				style: { background: r },
				children: G(e.authorId)
			})
		}), /* @__PURE__ */ w("div", {
			className: s("max-w-[68%] flex flex-col gap-0.5", t ? "items-end" : "items-start"),
			children: [
				!t && n && /* @__PURE__ */ C("span", {
					className: "text-[11px] font-semibold pl-1",
					style: { color: r },
					children: e.authorId
				}),
				/* @__PURE__ */ C("div", {
					className: s("px-3.5 py-2 text-sm leading-relaxed break-words transition-opacity duration-200", t ? "bg-primary text-white rounded-[18px_18px_4px_18px]" : "bg-surface-hover text-text-primary rounded-[4px_18px_18px_18px]", e._fadeIn ? "opacity-0" : "opacity-100"),
					children: e.content
				}),
				n && /* @__PURE__ */ C("span", {
					className: "text-[10px] text-text-tertiary px-1",
					children: le(e.createdAt)
				})
			]
		})]
	});
}
function K({ idToken: e, roomId: t, roomName: r, onMessage: i }) {
	let { posts: a, createPost: o, loading: c, hasMore: u, loadMore: d, error: f } = n({
		idToken: e,
		roomId: t,
		onMessage: i
	}), [p, m] = x(""), [h, _] = x(!1), [v, y] = x(null), S = b(null), T = ue(e), E = [...a].reverse();
	g(() => {
		S.current?.scrollIntoView({ behavior: "smooth" });
	}, [a.length]);
	let D = async () => {
		if (!p.trim() || h) return;
		let e = p.trim();
		m(""), y(null), _(!0);
		try {
			await o(e);
		} catch (t) {
			y(t instanceof Error ? t.message : "Failed to send message"), m(e);
		} finally {
			_(!1);
		}
	};
	return /* @__PURE__ */ w("div", {
		className: "flex flex-col h-full bg-surface rounded-lg border border-border overflow-hidden",
		children: [
			/* @__PURE__ */ C("div", {
				className: "flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface shrink-0",
				children: /* @__PURE__ */ w("span", {
					className: "text-[15px] font-semibold text-text-primary",
					children: ["# ", r]
				})
			}),
			/* @__PURE__ */ w("div", {
				className: "flex-1 overflow-y-auto flex flex-col pb-1",
				children: [
					u && /* @__PURE__ */ C("div", {
						className: "text-center py-2",
						children: /* @__PURE__ */ C("button", {
							onClick: () => void d(),
							disabled: c,
							className: s("text-xs text-text-secondary bg-transparent border border-border rounded-full px-3.5 py-0.5 font-[inherit]", c ? "cursor-default" : "cursor-pointer"),
							children: c ? "Loading…" : "Load earlier"
						})
					}),
					c && E.length === 0 ? /* @__PURE__ */ C("div", {
						className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px]",
						children: "Loading messages…"
					}) : E.length === 0 ? /* @__PURE__ */ w("div", {
						className: "flex-1 flex flex-col items-center justify-center text-text-tertiary gap-1.5",
						children: [
							/* @__PURE__ */ C("span", {
								className: "text-[28px]",
								children: "💬"
							}),
							/* @__PURE__ */ C("span", {
								className: "text-sm font-semibold text-text-primary",
								children: "No messages yet"
							}),
							/* @__PURE__ */ C("span", {
								className: "text-[13px]",
								children: "Be the first to say something!"
							})
						]
					}) : E.map((e, t) => {
						let n = e.authorId === T, r = E[t - 1], i = !r || r.authorId !== e.authorId || new Date(e.createdAt).getTime() - new Date(r.createdAt).getTime() > 3e5;
						return /* @__PURE__ */ C(de, {
							post: e,
							isOwn: n,
							showSender: i
						}, e.postId);
					}),
					/* @__PURE__ */ C("div", { ref: S })
				]
			}),
			(f || v) && /* @__PURE__ */ C("div", {
				className: "px-4 py-1.5 bg-danger-bg border-t border-danger-border text-xs text-danger",
				children: v ?? f
			}),
			/* @__PURE__ */ w("div", {
				className: "flex items-center gap-2 px-3 py-2.5 border-t border-border bg-surface shrink-0",
				children: [/* @__PURE__ */ C(l, {
					value: p,
					onChange: (e) => m(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && !e.shiftKey && (e.preventDefault(), D());
					},
					placeholder: `Message #${r}…`,
					disabled: h,
					className: "flex-1 rounded-[22px] px-4"
				}), /* @__PURE__ */ C("button", {
					onClick: () => void D(),
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
function q({ title: e, count: t, unreadTotal: n, defaultOpen: r = !0, children: i }) {
	let [a, o] = x(r);
	return /* @__PURE__ */ w("div", {
		className: "mb-0.5",
		children: [/* @__PURE__ */ w("button", {
			onClick: () => o((e) => !e),
			className: "flex items-center gap-1 w-full px-3 py-1.5 bg-transparent border-none cursor-pointer font-[inherit] text-left",
			children: [
				/* @__PURE__ */ C("span", {
					className: s("text-[10px] text-text-secondary inline-block w-3 transition-transform duration-150", a ? "rotate-90" : "rotate-0"),
					children: "▶"
				}),
				/* @__PURE__ */ C("span", {
					className: "text-[11px] font-bold text-text-tertiary uppercase tracking-wide flex-1",
					children: e
				}),
				!a && n !== void 0 && n > 0 && /* @__PURE__ */ C("span", {
					className: "min-w-[18px] h-[18px] rounded-[9px] bg-danger text-white text-[10px] font-bold flex items-center justify-center px-1.5",
					children: n > 99 ? "99+" : n
				}),
				/* @__PURE__ */ C("span", {
					className: "text-[11px] text-text-secondary",
					children: t
				})
			]
		}), a && i]
	});
}
function J({ room: e, isActive: t, unread: n, onClick: r }) {
	return /* @__PURE__ */ w("button", {
		onClick: r,
		className: s("flex items-center gap-1.5 w-full border-none rounded-[5px] pt-1.5 pb-1.5 pr-2 pl-6 cursor-pointer text-[13px] text-left font-[system-ui,-apple-system,sans-serif]", t ? "bg-primary/15 text-primary font-semibold" : n > 0 ? "bg-transparent text-surface-hover font-semibold" : "bg-transparent text-text-tertiary font-normal"),
		children: [
			/* @__PURE__ */ C("span", {
				className: s("text-[13px] shrink-0", t ? "text-primary" : "text-text-secondary"),
				children: e.type === "dm" ? "●" : "#"
			}),
			/* @__PURE__ */ C("span", {
				className: "overflow-hidden text-ellipsis whitespace-nowrap flex-1",
				children: e.name
			}),
			n > 0 && !t && /* @__PURE__ */ C("span", {
				className: "min-w-[18px] h-[18px] rounded-[9px] bg-danger text-white text-[10px] font-bold flex items-center justify-center px-1.5 shrink-0",
				children: n > 99 ? "99+" : n
			})
		]
	});
}
function fe({ userId: e, displayName: t, idToken: n, rooms: r, createRoom: i, createDM: a, createGroupRoom: o, roomsLoading: c, roomsError: l, onRoomsRetry: u, handleRoomSelect: d, activeRoomId: f, onMessage: p }) {
	let { theme: h } = k(), _ = h === "dark", [v, y] = x(!0), S = v ? 240 : 0, [T, E] = x({}), D = b(f);
	g(() => {
		D.current = f;
	}, [f]);
	let O = m((e) => {
		E((t) => {
			if (!t[e.roomId]) return t;
			let n = { ...t };
			return delete n[e.roomId], n;
		}), d(e);
	}, [d]);
	g(() => p((e) => {
		if (e.type === "social:post") {
			let t = (e.payload ?? e).roomId;
			t && t !== D.current && E((e) => ({
				...e,
				[t]: (e[t] ?? 0) + 1
			}));
		}
	}), [p]);
	let [A, j] = x(!1), M = t ? t.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2) : e.slice(0, 2).toUpperCase(), N = r.find((e) => e.roomId === f) ?? null, P = r.filter((e) => e.type === "standalone" || e.type === "group"), F = r.filter((e) => e.type === "dm"), I = P.reduce((e, t) => e + (T[t.roomId] ?? 0), 0), L = F.reduce((e, t) => e + (T[t.roomId] ?? 0), 0), R = _ ? "#1e1f2e" : "var(--color-surface-panel)", z = _ ? "rgba(255,255,255,0.06)" : "var(--color-border)", B = _ ? "#fff" : "var(--color-text-primary)", V = _ ? "var(--color-text-tertiary)" : "var(--color-neutral)";
	return /* @__PURE__ */ w("div", {
		className: "flex overflow-hidden rounded-lg transition-colors duration-200 h-[calc(100vh-120px)]",
		style: {
			background: _ ? "var(--color-text-primary)" : "#fff",
			border: `1px solid ${z}`
		},
		children: [/* @__PURE__ */ w("div", {
			className: s("shrink-0 flex-col overflow-hidden transition-[width] duration-[180ms]", v ? "flex" : "hidden"),
			style: {
				width: S,
				borderRight: `1px solid ${z}`,
				background: R
			},
			children: [/* @__PURE__ */ w("div", {
				className: "flex items-center gap-2 shrink-0 px-[14px] pt-[14px] pb-3",
				style: { borderBottom: `1px solid ${z}` },
				children: [
					/* @__PURE__ */ C("div", {
						className: "w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-[11px] shrink-0 bg-[linear-gradient(135deg,#646cff,#9b59b6)]",
						children: M
					}),
					/* @__PURE__ */ w("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ C("div", {
							className: "text-[13px] font-bold overflow-hidden text-ellipsis whitespace-nowrap",
							style: { color: B },
							children: t || e
						}), /* @__PURE__ */ w("div", {
							className: "text-[11px] flex items-center gap-1",
							style: { color: V },
							children: [/* @__PURE__ */ C("span", { className: "w-1.5 h-1.5 rounded-full bg-success inline-block" }), "Active"]
						})]
					}),
					/* @__PURE__ */ C("button", {
						onClick: () => y(!1),
						title: "Collapse sidebar",
						className: "bg-transparent border-none cursor-pointer text-base leading-none px-1 py-0.5 rounded",
						style: { color: V },
						children: "«"
					})
				]
			}), /* @__PURE__ */ w("div", {
				className: "flex-1 overflow-y-auto pt-2",
				children: [
					/* @__PURE__ */ C(q, {
						title: "Channels",
						count: P.length,
						unreadTotal: I,
						children: /* @__PURE__ */ w("div", {
							className: "px-1",
							children: [
								c && P.length === 0 ? /* @__PURE__ */ C("div", {
									className: "px-6 py-2 text-xs",
									style: { color: V },
									children: "Loading…"
								}) : P.length === 0 ? /* @__PURE__ */ C("div", {
									className: "px-6 py-2 text-xs",
									style: { color: V },
									children: "No channels yet"
								}) : P.map((e) => /* @__PURE__ */ C(J, {
									room: e,
									isActive: e.roomId === f,
									unread: T[e.roomId] ?? 0,
									onClick: () => O(e)
								}, e.roomId)),
								/* @__PURE__ */ w("button", {
									onClick: () => j((e) => !e),
									className: "flex items-center gap-1.5 w-full bg-transparent border-none cursor-pointer text-xs font-[inherit] rounded pt-[5px] pr-2 pb-[5px] pl-6",
									style: { color: V },
									children: [/* @__PURE__ */ C("span", {
										className: "text-sm leading-none",
										children: "+"
									}), " Add channel"]
								}),
								A && /* @__PURE__ */ C("div", {
									className: "px-2",
									children: /* @__PURE__ */ C(H, {
										idToken: n,
										rooms: [],
										createRoom: i,
										createDM: a,
										loading: c,
										error: l,
										onRetry: u,
										onRoomSelect: O,
										activeRoomId: f,
										compact: !0
									})
								})
							]
						})
					}),
					/* @__PURE__ */ C(q, {
						title: "Direct Messages",
						count: F.length,
						unreadTotal: L,
						children: /* @__PURE__ */ C("div", {
							className: "px-1",
							children: F.length === 0 ? /* @__PURE__ */ C("div", {
								className: "px-6 py-2 text-xs",
								style: { color: V },
								children: "No conversations yet"
							}) : F.map((e) => /* @__PURE__ */ C(J, {
								room: e,
								isActive: e.roomId === f,
								unread: T[e.roomId] ?? 0,
								onClick: () => O(e)
							}, e.roomId))
						})
					}),
					/* @__PURE__ */ C(q, {
						title: "Groups",
						count: 0,
						defaultOpen: !1,
						children: /* @__PURE__ */ C(U, {
							idToken: n,
							rooms: r,
							createGroupRoom: o,
							onRoomSelect: O,
							roomsLoading: c,
							compact: !0
						})
					})
				]
			})]
		}), /* @__PURE__ */ w("div", {
			className: "flex-1 min-w-0 flex flex-col",
			children: [!v && /* @__PURE__ */ w("div", {
				className: "flex items-center gap-2 px-3 py-1.5",
				style: { borderBottom: `1px solid ${z}` },
				children: [/* @__PURE__ */ C("button", {
					onClick: () => y(!0),
					title: "Expand sidebar",
					className: "bg-transparent rounded cursor-pointer text-sm px-2 py-0.5 font-[inherit]",
					style: {
						border: `1px solid ${z}`,
						color: V
					},
					children: "»"
				}), N && /* @__PURE__ */ w("span", {
					className: "text-[13px] font-semibold",
					style: { color: B },
					children: [
						N.type === "dm" ? "●" : "#",
						" ",
						N.name
					]
				})]
			}), /* @__PURE__ */ C("div", {
				className: "flex-1 min-h-0",
				children: N ? /* @__PURE__ */ C(K, {
					idToken: n,
					roomId: N.roomId,
					roomName: N.name,
					onMessage: p
				}, N.roomId) : /* @__PURE__ */ w("div", {
					className: "h-full flex flex-col items-center justify-center gap-2",
					style: { color: V },
					children: [
						/* @__PURE__ */ C("span", {
							className: "text-4xl",
							children: "💬"
						}),
						/* @__PURE__ */ C("span", {
							className: "text-[15px] font-semibold",
							style: { color: B },
							children: "Select a room to start chatting"
						}),
						/* @__PURE__ */ C("span", {
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
function pe({ author: e, avatarUrl: t, mine: n = !1, messages: r, className: i }) {
	return r.length === 0 ? null : /* @__PURE__ */ C("div", {
		"data-testid": "message-group",
		"data-author": e,
		"data-row-count": r.length,
		className: s("flex flex-col", i),
		children: r.map((r, i) => /* @__PURE__ */ C(c, {
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
function me(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function he(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function Y({ onSubmit: e, placeholder: t = "Write a reply…", loading: n }) {
	let [r, i] = x("");
	return /* @__PURE__ */ w("form", {
		onSubmit: (t) => {
			t.preventDefault(), r.trim() && (e(r.trim()), i(""));
		},
		className: "flex gap-2 mt-2",
		children: [/* @__PURE__ */ C(l, {
			value: r,
			onChange: (e) => i(e.target.value),
			placeholder: t,
			className: "flex-1"
		}), /* @__PURE__ */ C("button", {
			type: "submit",
			disabled: !r.trim() || n,
			className: s("h-7 px-2.5 rounded-md text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !r.trim() || n ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
			children: "Comment"
		})]
	});
}
function ge({ comment: e, currentUserId: t, loading: n, onDelete: r, onReply: i }) {
	let [a, o] = x(!1), [s, c] = x(!1), [l, u] = x(+!e._fadeIn);
	g(() => {
		if (e._fadeIn) {
			let e = setTimeout(() => u(1), 10);
			return () => clearTimeout(e);
		}
	}, []);
	let d = e.authorId === t, f = !!e.parentCommentId, p = e.authorId.slice(0, 2).toUpperCase(), m = /* @__PURE__ */ C("div", {
		style: { opacity: l },
		className: "transition-opacity duration-200 ease-[ease]",
		children: /* @__PURE__ */ w("div", {
			className: "flex items-start gap-2",
			children: [/* @__PURE__ */ C("div", {
				className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
				children: p
			}), /* @__PURE__ */ w("div", {
				className: "flex-1",
				children: [
					/* @__PURE__ */ w("div", {
						className: "flex items-center gap-2 mb-0.5",
						children: [/* @__PURE__ */ C("span", {
							className: "text-sm font-semibold text-text-primary",
							children: e.authorId
						}), /* @__PURE__ */ C("span", {
							className: "text-xs text-text-tertiary",
							children: me(e.createdAt)
						})]
					}),
					/* @__PURE__ */ C("div", {
						className: "text-sm text-text-primary mb-1",
						children: e.content
					}),
					/* @__PURE__ */ w("div", {
						className: "flex gap-2 items-center",
						children: [
							/* @__PURE__ */ C("button", {
								onClick: () => c((e) => !e),
								className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
								children: "Reply"
							}),
							d && !a && /* @__PURE__ */ C("button", {
								onClick: () => o(!0),
								className: "text-sm text-text-tertiary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
								"aria-label": "Delete comment",
								children: "Delete"
							}),
							d && a && /* @__PURE__ */ w("div", {
								role: "group",
								"aria-label": "Confirm delete comment",
								className: "flex gap-1.5 items-center",
								children: [
									/* @__PURE__ */ C("span", {
										className: "text-xs text-text-primary",
										children: "Delete this comment?"
									}),
									/* @__PURE__ */ C("button", {
										onClick: () => o(!1),
										className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
										children: "Cancel"
									}),
									/* @__PURE__ */ C("button", {
										onClick: () => {
											r(e.commentId), o(!1);
										},
										className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
										children: "Delete"
									})
								]
							})
						]
					}),
					s && /* @__PURE__ */ C(Y, {
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
	return f ? /* @__PURE__ */ C("div", {
		className: "pl-8 py-2",
		children: m
	}) : /* @__PURE__ */ C("div", {
		className: "py-2 border-b border-surface-hover",
		children: m
	});
}
function X({ idToken: e, roomId: t, postId: n, onMessage: i }) {
	let { comments: a, createComment: o, deleteComment: s, loading: c } = r({
		idToken: e,
		roomId: t,
		postId: n,
		onMessage: i
	}), l = he(e), u = async (e, t) => {
		await o(t, e);
	};
	return /* @__PURE__ */ w("div", {
		className: "pt-2 pl-2 border-t border-surface-hover",
		children: [c ? /* @__PURE__ */ C("div", {
			className: "text-sm text-text-tertiary py-2",
			children: "Loading comments…"
		}) : a.length === 0 ? /* @__PURE__ */ C("div", {
			className: "text-sm text-text-tertiary text-center py-4",
			children: "No comments yet"
		}) : a.map((e) => /* @__PURE__ */ C(ge, {
			comment: e,
			currentUserId: l,
			loading: c,
			onDelete: s,
			onReply: u
		}, e.commentId)), /* @__PURE__ */ C(Y, {
			onSubmit: (e) => o(e),
			placeholder: "Write a comment…",
			loading: c
		})]
	});
}
//#endregion
//#region src/components/social/PostFeed.tsx
var _e = [
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
function ve(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function ye(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function be({ onCreate: e, loading: t }) {
	let [n, r] = x(""), [i, a] = x(null), o = async (t) => {
		if (t.preventDefault(), n.trim()) {
			a(null);
			try {
				await e(n.trim()), r("");
			} catch (e) {
				a(e instanceof Error ? e.message : "Failed to create post");
			}
		}
	};
	return /* @__PURE__ */ w("form", {
		onSubmit: (e) => {
			o(e);
		},
		children: [
			/* @__PURE__ */ C(u, {
				value: n,
				onChange: (e) => r(e.target.value),
				placeholder: "What's on your mind?",
				maxLength: 1e4,
				rows: 3,
				className: "resize-y mb-2"
			}),
			/* @__PURE__ */ C("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ C("button", {
					type: "submit",
					disabled: !n.trim() || t,
					className: s("h-9 px-4 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !n.trim() || t ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-white border-none cursor-pointer"),
					children: t ? "Posting…" : "Post"
				})
			}),
			i && /* @__PURE__ */ C("div", {
				className: "text-danger text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]",
				children: i
			})
		]
	});
}
function xe({ idToken: e, roomId: t, postId: n, onMessage: r }) {
	let { isLiked: a, likeCount: o, toggle: c, whoLiked: l } = i({
		idToken: e,
		roomId: t,
		postId: n,
		onMessage: r
	});
	return /* @__PURE__ */ w(S, { children: [/* @__PURE__ */ w("button", {
		onClick: () => void c(),
		"aria-label": "Like post",
		className: "bg-transparent border-none cursor-pointer flex items-center gap-1 p-0 font-[system-ui,-apple-system,sans-serif]",
		children: [/* @__PURE__ */ C("span", {
			className: s("text-base", a ? "text-primary" : "text-text-tertiary"),
			children: "❤"
		}), /* @__PURE__ */ C("span", {
			className: s("text-sm", a ? "text-primary" : "text-text-tertiary"),
			children: o
		})]
	}), l.length > 0 && /* @__PURE__ */ w("span", {
		className: "text-xs text-text-secondary ml-1",
		children: [
			"Liked by: ",
			l.slice(0, 3).map((e) => e.displayName).join(", "),
			l.length > 3 ? ` and ${l.length - 3} more` : ""
		]
	})] });
}
function Se({ idToken: e, roomId: t, postId: n, onMessage: r }) {
	let { reactWithEmoji: a } = i({
		idToken: e,
		roomId: t,
		postId: n,
		onMessage: r
	});
	return /* @__PURE__ */ C("div", {
		className: "flex flex-wrap gap-0",
		children: _e.map((e) => /* @__PURE__ */ C("button", {
			onClick: () => void a(e),
			className: "text-base bg-transparent border-none px-1 py-0.5 cursor-pointer",
			title: e,
			children: e
		}, e))
	});
}
function Z({ post: e, idToken: t, roomId: n, currentUserId: r, onMessage: i, onEdit: a, onDelete: o }) {
	let [c, l] = x(+!e._fadeIn), [d, f] = x(!1), [p, m] = x(!1), [h, _] = x(!1), [v, y] = x(e.content);
	g(() => {
		if (e._fadeIn) {
			let e = setTimeout(() => l(1), 10);
			return () => clearTimeout(e);
		}
	}, []);
	let b = e.authorId === r, S = e.authorId.slice(0, 2).toUpperCase();
	return /* @__PURE__ */ w("div", {
		style: { opacity: c },
		className: "border-b border-surface-hover pb-4 mb-4 transition-opacity duration-200 ease-[ease]",
		children: [
			/* @__PURE__ */ w("div", {
				className: "flex items-center gap-2 mb-2",
				children: [/* @__PURE__ */ C("div", {
					className: "w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0",
					children: S
				}), /* @__PURE__ */ w("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ C("span", {
						className: "text-base font-semibold text-text-primary",
						children: e.authorId
					}), /* @__PURE__ */ C("span", {
						className: "text-sm text-text-tertiary ml-2",
						children: ve(e.createdAt)
					})]
				})]
			}),
			h ? /* @__PURE__ */ w("div", {
				className: "mb-2",
				children: [/* @__PURE__ */ C(u, {
					value: v,
					onChange: (e) => y(e.target.value),
					rows: 3,
					className: "resize-y mb-2"
				}), /* @__PURE__ */ w("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ C("button", {
						onClick: () => {
							a(e.postId, v), _(!1);
						},
						disabled: !v.trim(),
						className: s("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", v.trim() ? "bg-primary text-white border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"),
						children: "Save"
					}), /* @__PURE__ */ C("button", {
						onClick: () => {
							_(!1), y(e.content);
						},
						className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Discard Changes"
					})]
				})]
			}) : /* @__PURE__ */ C("div", {
				className: "text-base text-text-primary mt-2 mb-2",
				children: e.content
			}),
			/* @__PURE__ */ w("div", {
				className: "flex gap-4 text-sm mt-1 items-center flex-wrap",
				children: [
					/* @__PURE__ */ C(xe, {
						idToken: t,
						roomId: n,
						postId: e.postId,
						onMessage: i
					}),
					/* @__PURE__ */ C(Se, {
						idToken: t,
						roomId: n,
						postId: e.postId,
						onMessage: i
					}),
					/* @__PURE__ */ C("button", {
						onClick: () => f((e) => !e),
						className: "bg-transparent border-none text-sm text-text-secondary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Comment"
					}),
					b && !h && /* @__PURE__ */ C("button", {
						onClick: () => _(!0),
						className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Edit"
					}),
					b && !p && !h && /* @__PURE__ */ C("button", {
						onClick: () => m(!0),
						className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Delete"
					}),
					b && p && /* @__PURE__ */ w("div", {
						role: "group",
						"aria-label": "Confirm delete post",
						className: "flex gap-1.5 items-center",
						children: [
							/* @__PURE__ */ C("span", {
								className: "text-xs text-text-primary",
								children: "Delete this post?"
							}),
							/* @__PURE__ */ C("button", {
								onClick: () => m(!1),
								className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
								children: "Cancel"
							}),
							/* @__PURE__ */ C("button", {
								onClick: () => {
									o(e.postId), m(!1);
								},
								className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
								children: "Delete"
							})
						]
					})
				]
			}),
			d && /* @__PURE__ */ C(X, {
				idToken: t,
				roomId: n,
				postId: e.postId,
				onMessage: i
			})
		]
	});
}
function Ce({ idToken: e, roomId: t, onMessage: r }) {
	let { posts: i, createPost: a, editPost: o, deletePost: c, loading: l, hasMore: u, loadMore: d } = n({
		idToken: e,
		roomId: t,
		onMessage: r
	}), f = ye(e);
	return /* @__PURE__ */ w("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ C(be, {
				onCreate: a,
				loading: l
			}),
			/* @__PURE__ */ C("div", { className: "border-t border-border my-4" }),
			u && /* @__PURE__ */ C("button", {
				onClick: () => void d(),
				disabled: l,
				className: s("w-full h-9 mb-4 bg-surface text-text-primary border border-border rounded-lg text-sm font-[system-ui,-apple-system,sans-serif]", l ? "cursor-default" : "cursor-pointer"),
				children: l ? "Loading…" : "Load more"
			}),
			l && i.length === 0 ? /* @__PURE__ */ w("div", {
				className: "flex items-center gap-2 p-4 justify-center text-text-secondary",
				children: [/* @__PURE__ */ C("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }), "Loading..."]
			}) : i.length === 0 ? /* @__PURE__ */ w("div", {
				className: "py-6 text-center",
				children: [/* @__PURE__ */ C("div", {
					className: "text-sm font-semibold text-text-primary mb-1",
					children: "No posts yet"
				}), /* @__PURE__ */ C("div", {
					className: "text-sm text-text-tertiary",
					children: "Be the first to post in this room."
				})]
			}) : i.map((n) => /* @__PURE__ */ C(Z, {
				post: n,
				idToken: e,
				roomId: t,
				currentUserId: f,
				onMessage: r,
				onEdit: o,
				onDelete: c
			}, n.postId))
		]
	});
}
//#endregion
//#region src/components/social/ActivityPanel.tsx
function we() {
	return "";
}
var Te = 50;
function Ee(e) {
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
function De(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function Oe(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function ke({ idToken: e, sendMessage: t, onMessage: n, connectionState: r }) {
	let [i, a] = x([]), [s, c] = x(!0), [l, u] = x(!1), [d, f] = x(null), [p, h] = x(0), _ = b(t);
	g(() => {
		_.current = t;
	}, [t]);
	let { toast: v } = o(), y = Oe(e), S = m(() => h((e) => e + 1), []);
	return g(() => {
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
			console.error("[activity] fetch failed:", e), f(t), v("Couldn't load activity feed", { type: "error" });
		}).finally(() => {
			n || c(!1);
		}), () => {
			n = !0;
		};
	}, [
		e,
		p,
		v
	]), g(() => {
		if (r !== "connected" || !y) {
			u(!1);
			return;
		}
		let e = `activity:${y}`;
		return _.current({
			service: "activity",
			action: "subscribe",
			channelId: e
		}), u(!0), () => {
			_.current({
				service: "activity",
				action: "unsubscribe",
				channelId: e
			}), u(!1);
		};
	}, [r, y]), g(() => n((e) => {
		if (e.type !== "activity:event") return;
		let t = e.payload;
		t && a((e) => e.length > 0 && e[0].timestamp === t.timestamp && e[0].eventType === t.eventType ? e : [{
			eventType: t.eventType,
			timestamp: t.timestamp,
			detail: t.detail
		}, ...e].slice(0, Te));
	}), [n]), {
		items: i,
		loading: s,
		isLive: l,
		error: d,
		retry: S
	};
}
function Ae({ idToken: e, sendMessage: t, onMessage: n, connectionState: r }) {
	let { items: i, loading: a, isLive: o, error: c, retry: l } = ke({
		idToken: e,
		sendMessage: t,
		onMessage: n,
		connectionState: r
	});
	return /* @__PURE__ */ w("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [/* @__PURE__ */ w("h2", {
			className: "text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3",
			children: ["Activity", o && /* @__PURE__ */ C("span", {
				className: "inline-block w-2 h-2 rounded-full bg-success ml-2 align-middle",
				title: "Live"
			})]
		}), a ? /* @__PURE__ */ w("div", {
			className: "flex items-center gap-2 p-4 justify-center text-text-secondary",
			children: [/* @__PURE__ */ C("span", { className: "inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" }), "Loading..."]
		}) : c && i.length === 0 ? /* @__PURE__ */ w("div", {
			role: "alert",
			className: "py-6 px-4 text-center text-danger-fg text-sm flex flex-col items-center gap-2",
			children: [
				/* @__PURE__ */ C("span", { children: "Couldn't load activity" }),
				/* @__PURE__ */ C("span", {
					className: "text-text-secondary text-xs",
					children: c
				}),
				/* @__PURE__ */ C("button", {
					type: "button",
					onClick: l,
					className: "mt-1 px-3 py-1 text-xs font-medium text-info-fg bg-info-bg border border-info-border rounded cursor-pointer",
					children: "Retry"
				})
			]
		}) : i.length === 0 ? /* @__PURE__ */ C("div", {
			className: "py-10 text-center text-text-tertiary text-sm",
			children: "No activity yet"
		}) : /* @__PURE__ */ C("div", { children: i.map((e, t) => {
			let { icon: n, text: r } = Ee(e);
			return /* @__PURE__ */ w("div", {
				className: s("flex flex-row items-center gap-2 py-2", t < i.length - 1 && "border-b border-surface-hover"),
				children: [
					/* @__PURE__ */ C("span", {
						className: "w-6 shrink-0 text-center",
						children: n
					}),
					/* @__PURE__ */ C("span", {
						className: "flex-1 text-sm text-text-primary",
						children: r
					}),
					/* @__PURE__ */ C("span", {
						className: "text-xs text-text-tertiary shrink-0",
						children: De(e.timestamp)
					})
				]
			}, t);
		}) })]
	});
}
//#endregion
//#region src/components/social/ReactionPickerPopover.tsx
var Q = /* @__PURE__ */ "👍.❤️.🔥.😂.👏.🎉.😮.💯.😀.😅.😉.😍.😘.🤣.🥰.😇.🤔.😎.😢.😡.🤯.😱.🙃.🤩.🙏.🤝.👋.👌.✌️.🤞.🤘.🫶.✨.⭐.💫.🌟.⚡.💥.☀️.🌈.🚀.🎯.🏆.💪.🎊.🎈.🥳.🎁.☕.🍕.🍔.🍩.🍦.🍓.🍻.🍷.👀.🤖.👻.😺.🐶.🦄.🐝.🌸".split(".");
function je(e, t) {
	let [n, r] = x(null);
	return v(() => {
		if (!t || !e?.current) {
			r(null);
			return;
		}
		let n = e.current.getBoundingClientRect();
		r({
			top: Math.max(8, n.top + window.scrollY - 12),
			left: n.left + window.scrollX
		});
	}, [t, e]), n;
}
function $({ open: e, onSelect: t, onClose: n, triggerRef: r, emojis: i = Q, showSearch: a = !0, className: o, style: c }) {
	let l = b(null), u = _(), d = je(r, e);
	g(() => {
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
	]), g(() => {
		if (!e) return;
		let t = (e) => {
			e.key === "Escape" && (e.stopPropagation(), n());
		};
		return document.addEventListener("keydown", t), () => document.removeEventListener("keydown", t);
	}, [e, n]);
	let f = m((e) => {
		t(e), n();
	}, [t, n]), p = y(() => d ? {
		position: "absolute",
		top: d.top,
		left: d.left,
		transform: "translateY(-100%)"
	} : { position: "absolute" }, [d]);
	return e ? /* @__PURE__ */ C("div", {
		ref: l,
		role: "dialog",
		"aria-label": "Pick a reaction",
		"data-testid": "reaction-picker-popover",
		className: s("z-50 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg p-2", "w-[18rem]", o),
		style: {
			...p,
			...c
		},
		children: /* @__PURE__ */ w(T, {
			label: "Pick a reaction",
			loop: !0,
			children: [a && /* @__PURE__ */ C(T.Input, {
				id: `${u}-search`,
				placeholder: "Search reactions…",
				className: s("w-full rounded-md border border-[var(--color-border-field)] bg-transparent", "px-2 py-1.5 text-sm text-[var(--color-text-primary)] mb-2", "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"),
				autoFocus: !0
			}), /* @__PURE__ */ w(T.List, {
				className: "max-h-[14rem] overflow-y-auto",
				"data-testid": "reaction-picker-list",
				children: [/* @__PURE__ */ C(T.Empty, {
					className: "px-2 py-3 text-xs text-[var(--color-text-secondary)]",
					children: "No reactions match."
				}), /* @__PURE__ */ C("div", {
					role: "presentation",
					className: "grid grid-cols-8 gap-1",
					children: i.map((e) => /* @__PURE__ */ C(T.Item, {
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
function Me({ reactions: e, onReact: t, disabled: n = !1, pickerEmojis: r = Q, addTriggerLabel: i, hideAddTrigger: a = !1, className: o }) {
	let [c, l] = x(!1), u = b(null), d = (e) => {
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
	return /* @__PURE__ */ w("div", {
		"data-testid": "reactions-bar",
		className: s("relative inline-flex flex-wrap items-center gap-1", o),
		children: [
			p.map((e) => /* @__PURE__ */ w("button", {
				type: "button",
				onClick: () => d(e.emoji),
				disabled: n,
				"aria-pressed": e.mine ?? !1,
				"data-testid": "reaction-chip",
				"data-emoji": e.emoji,
				"data-mine": e.mine ? "true" : "false",
				className: s("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs leading-none transition-colors", e.mine ? "border-[var(--color-primary)] bg-[var(--color-primary)]/15 text-[var(--color-text-primary)]" : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/60 hover:text-[var(--color-text-primary)]", n && "opacity-50 cursor-not-allowed"),
				children: [/* @__PURE__ */ C("span", {
					"aria-hidden": !0,
					className: "text-sm leading-none",
					children: e.emoji
				}), /* @__PURE__ */ C("span", {
					className: "tabular-nums",
					children: e.count
				})]
			}, e.emoji)),
			!a && /* @__PURE__ */ w("button", {
				ref: u,
				type: "button",
				onClick: () => !n && l((e) => !e),
				disabled: n,
				"aria-haspopup": "dialog",
				"aria-expanded": c,
				"data-testid": "reactions-bar-add",
				className: s("inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-border)]", "h-6 min-w-6 px-1.5 text-xs text-[var(--color-text-secondary)] transition-colors", !n && "hover:border-[var(--color-primary)] hover:text-[var(--color-text-primary)]", n && "opacity-50 cursor-not-allowed"),
				children: [i ?? /* @__PURE__ */ C("span", {
					"aria-hidden": !0,
					children: "+ 😀"
				}), /* @__PURE__ */ C("span", {
					className: "sr-only",
					children: "Add reaction"
				})]
			}),
			/* @__PURE__ */ C($, {
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
export { Ce as a, fe as c, H as d, I as f, Ae as i, K as l, k as m, Q as n, X as o, O as p, $ as r, pe as s, Me as t, U as u };
