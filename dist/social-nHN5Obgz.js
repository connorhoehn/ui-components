import { a as e, i as t, n, o as r, r as i, t as a } from "./useSocialProfile-5S1qyvsv.js";
import { d as o, n as s, o as c } from "./Button-DQoeE5dN.js";
import { r as l } from "./safeHref-CSAycLWi.js";
import { n as u } from "./Stack-CE1FjEn8.js";
import { t as d } from "./Text-XdCzxWMv.js";
import { s as f } from "./usePromptContext-CUNhKC01.js";
import { t as p } from "./IconButton-BgM9MvwA.js";
import { J as m, S as h, Tt as g, U as _, et as v, ft as y, h as b, it as x, k as S, m as C, o as w, t as T, tt as E, w as D } from "./Icons-CqVFbuiZ.js";
import { t as O } from "./Banner-DPR4sIxI.js";
import { t as k } from "./Modal-C88cabjQ.js";
import { t as A } from "./Input-DiOEvL5h.js";
import { t as j } from "./Select-CDxAVVnW.js";
import { t as M } from "./InlinePopover-BJntntHW.js";
import { t as N } from "./SearchInput-Dk3D9lhs.js";
import { t as P } from "./DataTable-CnZhsNyD.js";
import { t as F } from "./EmptyState-DqWgLbIq.js";
import { t as ee } from "./DropdownMenu-DsOGcoH4.js";
import { l as I } from "./railType-OvWDaK-G.js";
import { t as L } from "./SegmentedControl-n6nEQjaK.js";
import "./ChatSidePanelRegistry-bJp9YAUR.js";
import { n as R } from "./Tabs-GZcuU5Qk.js";
import { n as z, r as te } from "./Avatar-KvxS_RDw.js";
import { t as B } from "./SkeletonCard-BryltcC7.js";
import { D as V, K as ne, W as re, X as ie, b as ae, et as oe, w as se } from "./ChatPanel-DlXZ3YM3.js";
import { t as H } from "./Textarea-Cf4WFXAs.js";
import { t as U } from "./DotMeter-DJzl5dNX.js";
import { i as ce, n as le, r as ue, t as de } from "./ChoiceList-DHsxqQ1Y.js";
import { t as fe } from "./InlineAlert-Cpf1ooBU.js";
import { t as pe } from "./LogStream-WjbAlUsk.js";
import { a as W, n as me, o as he, s as ge, t as _e } from "./backdropTone-DokCqPDL.js";
import { a as G, i as ve, n as ye, o as be } from "./ActivityPanel-Bm8taSAz.js";
import { t as xe } from "./InlinePlaceholder-CKUJyqFh.js";
import { t as Se } from "./MetaLine-CXoGFWAF.js";
import { n as Ce, t as we } from "./ReactionPickerPopover-B8d6ocKT.js";
import { n as Te } from "./useComputeProjects-ZSazDRet.js";
import "./QuoteBlock-Dks53Idi.js";
import { t as Ee } from "./rovingFocus-Bj5Y6kwY.js";
import { d as De } from "./ConversationSurface-DezOPsBI.js";
import { i as Oe, r as ke } from "./composerSendError-BFTLY93R.js";
import { r as Ae } from "./PaneStatusLine-VpOyLce6.js";
import { Suspense as je, createContext as Me, lazy as Ne, useCallback as K, useContext as Pe, useEffect as q, useId as Fe, useMemo as J, useRef as Y, useState as X } from "react";
import { Fragment as Z, jsx as Q, jsxs as $ } from "react/jsx-runtime";
//#region src/components/social/SocialPanel.tsx
function Ie(e, t) {
	return {
		id: e.userId,
		displayName: e.displayName,
		bio: "",
		avatarUrl: e.avatarUrl ?? null,
		visibility: e.visibility,
		followState: t
	};
}
function Le(e) {
	return {
		id: e.userId,
		displayName: e.displayName,
		bio: e.bio ?? "",
		avatarUrl: e.avatarUrl ?? null,
		visibility: e.visibility
	};
}
function Re({ user: e, size: t }) {
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
function ze({ targetUser: e, followState: t, compact: n = !1, onFollowChange: r }) {
	let [i, a] = X(!1);
	return t === "not-following" ? /* @__PURE__ */ Q("button", {
		"data-ui-part": "",
		className: o("rounded-lg text-sm cursor-pointer min-w-[88px] px-4 border-none font-[system-ui,-apple-system,sans-serif] bg-primary text-on-primary font-semibold", n ? "h-7" : "h-9"),
		onClick: () => {
			r(e.id, "pending");
		},
		"aria-label": `Follow ${e.displayName}`,
		children: "Follow"
	}) : t === "pending" ? /* @__PURE__ */ Q("button", {
		"data-ui-part": "",
		className: o("rounded-lg text-sm min-w-[88px] px-4 border border-border font-[system-ui,-apple-system,sans-serif] bg-surface-hover text-text-secondary font-normal cursor-default", n ? "h-7" : "h-9"),
		disabled: !0,
		"aria-label": `Follow ${e.displayName}`,
		children: "Following…"
	}) : /* @__PURE__ */ $("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ Q("button", {
			"data-ui-part": "",
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
					"data-ui-part": "",
					onClick: () => a(!1),
					className: "h-9 rounded-lg text-sm px-3 bg-surface text-text-primary border border-border cursor-pointer font-[system-ui,-apple-system,sans-serif]",
					children: "Keep Following"
				}),
				/* @__PURE__ */ Q("button", {
					"data-ui-part": "",
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
function Be({ user: e, isOwnProfile: t, onSave: n }) {
	let [r, i] = X(!1), [a, s] = X(e.displayName), [c, l] = X(e.bio), [u, d] = X(e.avatarUrl ?? ""), [f, p] = X(e.visibility), [m, h] = X(!1), [g, _] = X(null), v = Fe();
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
			}), /* @__PURE__ */ Q(A, {
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
			}), /* @__PURE__ */ Q(H, {
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
			}), /* @__PURE__ */ Q(A, {
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
				onKeyDown: (e) => Ee(e, { itemSelector: "[role=\"radio\"]" }),
				className: "flex gap-2",
				children: ["public", "private"].map((e) => /* @__PURE__ */ Q("button", {
					"data-ui-part": "",
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
				"data-ui-part": "",
				onClick: () => {
					y();
				},
				disabled: m,
				className: o("flex-1 h-9 bg-primary text-on-primary border-none rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", m ? "cursor-default" : "cursor-pointer"),
				children: m ? "Saving…" : "Save Changes"
			}), /* @__PURE__ */ Q("button", {
				"data-ui-part": "",
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
			children: [/* @__PURE__ */ Q(Re, {
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
			"data-ui-part": "",
			onClick: () => i(!0),
			className: "text-sm text-primary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
			children: "Edit profile"
		})
	] });
}
function Ve({ followers: e, following: t, friends: n, followStates: r, onFollowChange: i, loadError: a }) {
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
			onKeyDown: Ee,
			className: "flex border-b border-border mb-3",
			children: u.map((e) => /* @__PURE__ */ Q("button", {
				"data-ui-part": "",
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
					/* @__PURE__ */ Q(Re, {
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
					/* @__PURE__ */ Q(ze, {
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
function He({ idToken: t, onMessage: n }) {
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
	}, b = c.map((e) => Ie(e, g[e.userId] ?? "not-following")), x = l.map((e) => Ie(e, "following")), S = u.map((e) => Ie(e, "following")), C = r ? {
		...Le(r),
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
			}) : C ? /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q(Be, {
				user: C,
				isOwnProfile: !0,
				onSave: s
			}), /* @__PURE__ */ Q(Ve, {
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
function Ue(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64);
}
function We({ people: e, onStartDm: t, onCreateChannel: n, onCancel: r, peopleError: i = null, busy: a = !1, className: s, "data-testid": c = "new-conversation" }) {
	let [l, u] = X(""), d = Y(null), f = J(() => {
		let t = l.trim().toLowerCase();
		return t ? e.filter((e) => e.displayName.toLowerCase().includes(t)) : e;
	}, [e, l]), p = Ue(l), m = !!n && p.length > 0;
	return /* @__PURE__ */ $("div", {
		"data-testid": c,
		className: o("flex flex-col gap-1 rounded-lg border border-border bg-surface p-2", s),
		children: [/* @__PURE__ */ $("div", {
			className: "flex items-center gap-1.5",
			children: [/* @__PURE__ */ Q(A, {
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
				"data-ui-part": "",
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
					"data-ui-part": "",
					type: "button",
					onClick: () => void t(e.userId),
					disabled: a,
					"data-testid": `${c}-person`,
					className: "flex w-full items-center gap-2 rounded px-1.5 py-1.5 text-left hover:bg-surface-hover",
					children: [/* @__PURE__ */ Q(z, {
						name: e.displayName,
						src: e.avatarUrl,
						color: e.color,
						size: 26
					}), /* @__PURE__ */ $("span", {
						className: "flex min-w-0 flex-col",
						children: [/* @__PURE__ */ Q("span", {
							className: "truncate text-sm text-text-primary",
							children: e.displayName
						}), e.hint && /* @__PURE__ */ Q("span", {
							className: "truncate text-xs text-text-tertiary",
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
					"data-ui-part": "",
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
						className: "min-w-0 truncate text-sm text-text-primary",
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
function Ge(e, t) {
	let n = e.lastMessageAt ? Date.parse(e.lastMessageAt) : NaN, r = t.lastMessageAt ? Date.parse(t.lastMessageAt) : NaN, i = Number.isNaN(n) ? null : n, a = Number.isNaN(r) ? null : r;
	return i === null && a === null ? 0 : i === null ? 1 : a === null ? -1 : a - i;
}
function Ke({ items: e, grouped: t = !1, sectionOrder: n = "channels-first", sectionActions: r, collapsedSections: i, onToggleSection: a, onStartCall: s, sortByRecency: c = !0, maxVisible: l, activeChannel: u, onSelect: d, onNewChat: f, emptyLabel: p = "No conversations yet", onTogglePin: m, onToggleMute: h, onMarkUnread: _, onRename: y, canRename: b, onSetSection: x, tone: C = "light", className: T, "data-testid": O }) {
	let k = C === "dark", A = O ?? "conversation", j = a !== void 0, M = Fe(), N = (e, t) => `${M}${e.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${t}`, P = c ? [...e].sort(Ge) : e, F = [], I = P.filter((e) => e.pinned), L = I.length > 0 ? P.filter((e) => !e.pinned) : P;
	I.length > 0 && F.push({
		heading: "Pinned",
		label: "Pinned",
		items: I
	});
	let R = (e) => (e.section ?? "").trim(), B = L.filter((e) => R(e) !== ""), V = B.length > 0 ? L.filter((e) => R(e) === "") : L;
	if (B.length > 0) {
		let e = /* @__PURE__ */ new Map();
		for (let t of B) {
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
		let e = (e) => (e.kind ?? (e.peers.length > 1 ? "group" : "dm")) === "channel", t = V.filter(e), r = V.filter((t) => !e(t)), i = {
			heading: "Channels",
			label: "Channels",
			items: t
		}, a = {
			heading: "Direct messages",
			label: "Direct messages",
			items: r
		}, o = n === "dms-first" ? [a, i] : [i, a];
		for (let e of o) e.items.length > 0 && F.push(e);
	} else V.length > 0 && F.push({
		label: "Conversations",
		items: V
	});
	let [re, ae] = X(() => /* @__PURE__ */ new Set()), oe = F.map((e) => {
		let t = j && e.heading !== void 0, n = t && i?.[e.label] === !0, r = l !== void 0 && l >= 0 && e.items.length > l, a = {
			...e,
			collapsible: t,
			collapsed: n,
			capped: r
		};
		if (!r || re.has(e.label)) return {
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
	}), se = (e) => ae((t) => {
		let n = new Set(t);
		return n.has(e) ? n.delete(e) : n.add(e), n;
	}), H = oe.flatMap((e) => e.collapsed ? [] : e.shown), U = Y(null), [le, ue] = X(null), de = (le && H.some((e) => e.channel === le) ? le : null) ?? (u && H.some((e) => e.channel === u) ? u : null) ?? H[0]?.channel ?? null, fe = Y(null);
	q(() => {
		let e = fe.current;
		if (!e) return;
		fe.current = null;
		let t = U.current?.querySelector(`[data-testid="conversation-row"][data-channel="${CSS.escape(e)}"]`);
		t?.focus(), t?.scrollIntoView({ block: "nearest" });
	});
	function pe(e) {
		let t = Math.max(0, Math.min(H.length - 1, e)), n = H[t];
		!n || n.channel === de || (fe.current = n.channel, ue(n.channel));
	}
	function W(e) {
		if (H.length === 0) return;
		let t = H.findIndex((e) => e.channel === de), n = t < 0 ? 0 : t;
		switch (e.key) {
			case "ArrowDown":
				pe(n + 1);
				break;
			case "ArrowUp":
				pe(n - 1);
				break;
			case "Home":
				pe(0);
				break;
			case "End":
				pe(H.length - 1);
				break;
			default: return;
		}
		e.preventDefault();
	}
	return /* @__PURE__ */ $("div", {
		className: o("flex min-h-0 flex-col gap-1", T),
		"data-testid": O,
		children: [f && /* @__PURE__ */ $("button", {
			"data-ui-part": "",
			type: "button",
			onClick: f,
			"data-testid": "conversation-new-chat",
			className: o("flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[14px] font-medium", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", k ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"),
			children: [/* @__PURE__ */ Q("span", {
				"aria-hidden": "true",
				className: o("grid h-6 w-6 place-items-center rounded-full border border-dashed text-sm leading-none", k ? "border-white/30" : "border-border"),
				children: "+"
			}), "New chat"]
		}), e.length === 0 ? /* @__PURE__ */ Q("p", {
			className: o("m-0 px-2 py-1.5 text-[14px]", k ? "text-white/60" : "text-text-secondary"),
			"data-testid": "conversation-empty",
			children: p
		}) : /* @__PURE__ */ Q("div", {
			ref: U,
			onKeyDown: W,
			className: "m-0 flex min-h-0 flex-col overflow-y-auto p-0",
			children: oe.map((e) => {
				let t = N(e.label, "content"), n = N(e.label, "toggle"), i = e.collapsed ? null : /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q("ul", {
					className: "m-0 flex list-none flex-col gap-0.5 p-0",
					"aria-label": e.collapsible ? void 0 : e.label,
					"aria-labelledby": e.collapsible ? n : void 0,
					children: e.shown.map((e) => {
						let t = e.channel === u, n = e.channel === de, r = e.kind ?? (e.peers.length > 1 ? "group" : "dm"), i = r === "channel", a = r === "group", c = e.peers[0], l = i ? e.name ?? e.channel : e.peers.map((e) => e.displayName).join(", "), f = e.lastMessageAt ? ne(e.lastMessageAt) : "", p = e.lastMessageAt ? ie(e.lastMessageAt) : "", C = e.unreadCount ?? 0, T = !!e.mentioned, O = !!e.live, j = !!e.muted, M = `${A}-row-menu-${e.channel}`, N = [];
						return s && (N.push({
							label: "Call",
							icon: /* @__PURE__ */ Q(v, { size: 14 }),
							onSelect: () => s(e.channel, "audio"),
							"data-testid": `${M}-call`
						}), N.push({
							label: "Video call",
							icon: /* @__PURE__ */ Q(g, { size: 14 }),
							onSelect: () => s(e.channel, "video"),
							"data-testid": `${M}-video-call`
						})), m && N.push({
							label: e.pinned ? "Unpin" : "Pin",
							icon: /* @__PURE__ */ Q(E, { size: 14 }),
							onSelect: () => m(e.channel, !e.pinned),
							"data-testid": `${M}-pin`
						}), h && N.push({
							label: j ? "Unmute" : "Mute",
							icon: /* @__PURE__ */ Q(w, { size: 14 }),
							onSelect: () => h(e.channel, !j),
							"data-testid": `${M}-mute`
						}), y && (!b || b(e)) && N.push({
							label: "Rename",
							icon: /* @__PURE__ */ Q(D, { size: 14 }),
							onSelect: () => y(e.channel),
							"data-testid": `${M}-rename`
						}), x && N.push({
							label: R(e) ? `Move from ${R(e)}\u2026` : "Move to section…",
							icon: /* @__PURE__ */ Q(S, { size: 14 }),
							onSelect: () => x(e.channel),
							"data-testid": `${M}-section`
						}), _ && C === 0 && N.push({
							label: "Mark as unread",
							onSelect: () => _(e.channel),
							"data-testid": `${M}-unread`
						}), /* @__PURE__ */ $("li", {
							className: o("relative", N.length > 0 && "group"),
							children: [/* @__PURE__ */ $("button", {
								"data-ui-part": "",
								type: "button",
								onClick: () => d(e.channel),
								onFocus: () => ue(e.channel),
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
										className: o("grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[14px] font-semibold leading-none", k ? "bg-white/10 text-white/70" : "bg-surface-inset text-text-secondary"),
										children: "#"
									}) : a ? /* @__PURE__ */ Q(te, {
										size: 28,
										maxVisible: 2,
										items: e.peers.map((e) => ({
											name: e.displayName,
											color: e.color,
											src: e.avatarUrl
										}))
									}) : c ? /* @__PURE__ */ $("span", {
										className: "relative inline-flex shrink-0",
										children: [/* @__PURE__ */ Q(z, {
											name: c.displayName,
											color: c.color,
											src: c.avatarUrl,
											size: 28
										}), c.online !== void 0 && /* @__PURE__ */ Q(ce, {
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
													className: o("min-w-0 flex-1 truncate text-[14px]", C > 0 ? "font-semibold" : "font-medium", k ? "text-white" : "text-text-primary"),
													children: l
												}),
												e.pinned && /* @__PURE__ */ Q("span", {
													"data-testid": `${A}-pinned`,
													title: "Pinned",
													className: o("shrink-0", k ? "text-white/50" : "text-text-tertiary"),
													children: /* @__PURE__ */ Q(E, { size: 12 })
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
													className: o("shrink-0 text-[12px] tabular-nums", k ? "text-white/50" : "text-text-tertiary"),
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
									T && /* @__PURE__ */ Q("span", {
										"data-testid": "conversation-mention",
										"aria-label": "You were mentioned",
										title: "You were mentioned",
										className: "grid h-5 w-5 shrink-0 place-items-center rounded-full bg-danger text-xs font-bold leading-none text-white",
										children: "@"
									}),
									C > 0 && /* @__PURE__ */ Q("span", {
										"data-testid": "conversation-unread",
										"data-muted": j ? "true" : "false",
										className: o("grid h-5 min-w-5 shrink-0 place-items-center rounded-full px-1.5 text-xs font-semibold leading-none", j ? k ? "bg-white/15 text-white/70" : "bg-surface-inset text-text-secondary" : "bg-primary text-on-primary"),
										children: C > 99 ? "99+" : C
									})
								]
							}), N.length > 0 && /* @__PURE__ */ Q("span", {
								className: o("absolute right-1 top-1/2 -translate-y-1/2 opacity-0 transition-opacity", "group-hover:opacity-100 group-focus-within:opacity-100", "has-[[aria-expanded=true]]:opacity-100", "[@media(hover:none)]:opacity-100"),
								children: /* @__PURE__ */ Q(ee, {
									trigger: /* @__PURE__ */ Q("span", {
										"aria-hidden": !0,
										className: "leading-none tracking-wide",
										children: "⋯"
									}),
									triggerLabel: `More options for ${l}`,
									triggerTitle: "More options",
									triggerTabIndex: n ? 0 : -1,
									triggerTestId: M,
									triggerClassName: o("h-6 w-6 rounded-md border-0 p-0 text-[14px]", k ? "text-white/70 hover:bg-white/15" : "text-text-secondary hover:bg-surface-hover"),
									align: "end",
									sections: [{ items: N }],
									"data-testid": `${M}-panel`
								})
							})]
						}, e.channel);
					})
				}), e.capped && /* @__PURE__ */ Q("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => se(e.label),
					"aria-expanded": e.hidden === 0,
					"data-testid": "conversation-show-more",
					className: o("mt-0.5 flex w-full cursor-pointer items-center rounded-lg px-2 py-1 text-left text-[12px] font-medium", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", k ? "text-white/60 hover:bg-white/10 hover:text-white" : "text-text-tertiary hover:bg-surface-hover hover:text-text-primary"),
					children: e.hidden > 0 ? `Show ${e.hidden} more` : "Show less"
				})] });
				return /* @__PURE__ */ $("div", { children: [e.heading && /* @__PURE__ */ Q(De, {
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
var qe = [
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
function Je(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = t * 31 + e.charCodeAt(n) >>> 0;
	return qe[t % qe.length];
}
function Ye(e) {
	let t = e.split(/[\s._@-]/);
	return t.length >= 2 ? (t[0][0] + t[1][0]).toUpperCase() : e.slice(0, 2).toUpperCase();
}
function Xe(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : n < 86400 ? `${Math.floor(n / 3600)}h ago` : new Date(e).toLocaleDateString();
}
function Ze(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function Qe({ post: e, isOwn: t, showSender: n }) {
	let r = Je(e.authorId);
	return /* @__PURE__ */ $("div", {
		className: o("flex items-end gap-2", t ? "flex-row-reverse" : "flex-row", n ? "pt-2 px-4 pb-0.5" : "py-px px-4"),
		children: [/* @__PURE__ */ Q("div", {
			className: "w-8 shrink-0 self-end",
			children: !t && n && /* @__PURE__ */ Q("div", {
				className: "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white select-none",
				style: { background: r },
				children: Ye(e.authorId)
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
					children: Xe(e.createdAt)
				})
			]
		})]
	});
}
function $e({ idToken: e, roomId: t, roomName: r, onMessage: i }) {
	let { posts: a, createPost: s, loading: c, hasMore: l, loadMore: u, error: d, loadError: f } = n({
		idToken: e,
		roomId: t,
		onMessage: i
	}), [p, m] = X(""), [h, g] = X(!1), [_, v] = X(null), y = Y(null), b = Ze(e), x = [...a].reverse(), S = a[0]?.postId;
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
							"data-ui-part": "",
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
						return /* @__PURE__ */ Q(Qe, {
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
				children: [/* @__PURE__ */ Q(A, {
					value: p,
					onChange: (e) => m(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && !e.shiftKey && (e.preventDefault(), C());
					},
					placeholder: `Message #${r}…`,
					disabled: h,
					className: "flex-1 rounded-[22px] px-4"
				}), /* @__PURE__ */ Q("button", {
					"data-ui-part": "",
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
function et({ userId: t, displayName: n, idToken: r, rooms: i, createRoom: a, createDM: s, createGroupRoom: c, roomsLoading: l, roomsError: u, onRoomsRetry: d, handleRoomSelect: f, activeRoomId: p, onMessage: m }) {
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
	}, [i, x]), P = "var(--color-border)", F = "var(--color-text-primary)", ee = "var(--color-text-secondary)";
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
							style: { color: ee },
							children: [/* @__PURE__ */ Q("span", { className: "w-1.5 h-1.5 rounded-full bg-success inline-block" }), "Active"]
						})]
					}),
					/* @__PURE__ */ Q("button", {
						"data-ui-part": "",
						onClick: () => g(!1),
						title: "Collapse sidebar",
						className: "bg-transparent border-none cursor-pointer text-base leading-none px-1 py-0.5 rounded",
						style: { color: ee },
						children: "«"
					})
				]
			}), /* @__PURE__ */ Q("div", {
				className: "flex-1 overflow-y-auto pt-2",
				children: /* @__PURE__ */ $("div", {
					className: "px-1 pt-1",
					children: [l && M.length === 0 ? /* @__PURE__ */ Q("div", {
						className: "px-2 py-2 text-xs",
						style: { color: ee },
						children: "Loading…"
					}) : u && M.length === 0 ? /* @__PURE__ */ Q("div", {
						role: "alert",
						"data-testid": "conversations-error",
						className: "px-2 py-2 text-xs text-danger-fg",
						children: "Couldn’t load conversations"
					}) : /* @__PURE__ */ Q(Ke, {
						items: M,
						activeChannel: p ?? null,
						onSelect: N,
						onNewChat: () => C((e) => !e),
						emptyLabel: "No conversations yet",
						"data-testid": "social-conversations"
					}), S && /* @__PURE__ */ Q("div", {
						className: "px-1 pt-1.5",
						children: /* @__PURE__ */ Q(We, {
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
					"data-ui-part": "",
					onClick: () => g(!0),
					title: "Expand sidebar",
					className: "bg-transparent rounded cursor-pointer text-sm px-2 py-0.5 font-[inherit]",
					style: {
						border: `1px solid ${P}`,
						color: ee
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
				children: k ? /* @__PURE__ */ Q($e, {
					idToken: r,
					roomId: k.roomId,
					roomName: k.name,
					onMessage: m
				}, k.roomId) : /* @__PURE__ */ $("div", {
					className: "h-full flex flex-col items-center justify-center gap-2",
					style: { color: ee },
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
function tt({ author: e, avatarUrl: t, mine: n = !1, messages: r, className: i }) {
	return r.length === 0 ? null : /* @__PURE__ */ Q("div", {
		"data-testid": "message-group",
		"data-author": e,
		"data-row-count": r.length,
		className: o("flex flex-col", i),
		children: r.map((r, i) => /* @__PURE__ */ Q(re, {
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
function nt({ onCreate: e, onDiscard: t, loading: n }) {
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
			/* @__PURE__ */ Q(A, {
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
					"data-ui-part": "",
					type: "submit",
					disabled: !r.trim() || n,
					className: o("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !r.trim() || n ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-on-primary cursor-pointer"),
					children: n ? "Creating…" : "Create"
				}), /* @__PURE__ */ Q("button", {
					"data-ui-part": "",
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
function rt({ onCreateDM: e, loading: t, friends: n, friendsError: r }) {
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
			/* @__PURE__ */ Q(j, {
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
					"data-ui-part": "",
					type: "submit",
					disabled: !i.trim() || t || n.length === 0,
					className: o("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !i.trim() || t ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-on-primary cursor-pointer"),
					children: "Open DM"
				}), /* @__PURE__ */ Q("button", {
					"data-ui-part": "",
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
		"data-ui-part": "",
		onClick: () => c(!0),
		className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded mb-1",
		children: "+ New DM"
	});
}
function it({ room: e, isActive: t, onClick: n }) {
	return /* @__PURE__ */ $("button", {
		"data-ui-part": "",
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
function at({ room: e, isActive: t, onClick: n }) {
	return /* @__PURE__ */ $("button", {
		"data-ui-part": "",
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
function ot({ message: e, onRetry: t, compact: n }) {
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
				"data-ui-part": "",
				type: "button",
				onClick: t,
				className: o("mt-1 font-medium text-info-fg bg-info-bg border border-info-border rounded cursor-pointer font-[system-ui,-apple-system,sans-serif]", n ? "px-2.5 py-0.5 text-[11px]" : "px-3.5 py-1 text-xs"),
				children: "Retry"
			})
		]
	});
}
function st({ idToken: t, rooms: n, createRoom: r, createDM: i, loading: a, error: o, onRetry: s, onRoomSelect: c, activeRoomId: l, compact: u }) {
	let { friends: d, loadError: f } = e({ idToken: t }), [p, m] = X(!1), h = async (e) => {
		await r(e), m(!1);
	};
	return u ? /* @__PURE__ */ $("div", {
		className: "px-2 pt-2",
		children: [
			/* @__PURE__ */ Q("button", {
				"data-ui-part": "",
				onClick: () => m((e) => !e),
				className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
				children: "+ New Room"
			}),
			p && /* @__PURE__ */ Q(nt, {
				onCreate: h,
				onDiscard: () => m(!1),
				loading: a
			}),
			/* @__PURE__ */ Q(rt, {
				onCreateDM: i,
				loading: a,
				friends: d,
				friendsError: f
			}),
			/* @__PURE__ */ Q("div", { children: a && n.length === 0 ? /* @__PURE__ */ Q("div", {
				className: "p-2 text-text-tertiary text-xs text-center",
				children: "Loading…"
			}) : o && n.length === 0 ? /* @__PURE__ */ Q(ot, {
				message: o,
				onRetry: s,
				compact: !0
			}) : n.length === 0 ? /* @__PURE__ */ Q("div", {
				className: "px-2 py-3 text-text-tertiary text-xs",
				children: "No rooms yet"
			}) : n.map((e) => /* @__PURE__ */ Q(at, {
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
				"data-ui-part": "",
				onClick: () => m((e) => !e),
				className: "w-full h-9 mb-2 bg-primary text-on-primary border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]",
				children: "Create Room"
			}),
			p && /* @__PURE__ */ Q(nt, {
				onCreate: h,
				onDiscard: () => m(!1),
				loading: a
			}),
			/* @__PURE__ */ Q(rt, {
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
				}) : o && n.length === 0 ? /* @__PURE__ */ Q(ot, {
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
				}) : n.map((e) => /* @__PURE__ */ Q(it, {
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
function ct(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function lt(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function ut({ onSubmit: e, placeholder: t = "Write a reply…", loading: n }) {
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
			/* @__PURE__ */ Q(A, {
				value: r,
				onChange: (e) => i(e.target.value),
				placeholder: t,
				className: "flex-1"
			}),
			/* @__PURE__ */ Q("button", {
				"data-ui-part": "",
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
function dt({ comment: e, currentUserId: t, loading: n, onDelete: r, onReply: i }) {
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
							children: ct(e.createdAt)
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
								"data-ui-part": "",
								onClick: () => c((e) => !e),
								className: "text-sm text-text-secondary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]",
								children: "Reply"
							}),
							d && !a && /* @__PURE__ */ Q("button", {
								"data-ui-part": "",
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
										"data-ui-part": "",
										onClick: () => o(!1),
										className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
										children: "Cancel"
									}),
									/* @__PURE__ */ Q("button", {
										"data-ui-part": "",
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
					s && /* @__PURE__ */ Q(ut, {
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
function ft({ idToken: e, roomId: t, postId: n, onMessage: i }) {
	let { comments: a, createComment: o, deleteComment: s, loading: c, submitting: l, error: u } = r({
		idToken: e,
		roomId: t,
		postId: n,
		onMessage: i
	}), d = lt(e), f = async (e, t) => {
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
			}) : a.map((e) => /* @__PURE__ */ Q(dt, {
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
			/* @__PURE__ */ Q(ut, {
				onSubmit: (e) => o(e),
				placeholder: "Write a comment…",
				loading: l
			})
		]
	});
}
//#endregion
//#region src/components/social/PostFeed.tsx
var pt = [
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
function mt(e) {
	let t = Date.now() - new Date(e).getTime(), n = Math.floor(t / 1e3);
	return n < 60 ? "just now" : n < 3600 ? `${Math.floor(n / 60)}m ago` : e.slice(0, 10);
}
function ht(e) {
	if (!e) return null;
	try {
		return JSON.parse(atob(e.split(".")[1])).sub;
	} catch {
		return null;
	}
}
function gt({ onCreate: e, loading: t }) {
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
			/* @__PURE__ */ Q(H, {
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
					"data-ui-part": "",
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
function _t({ isLiked: e, likeCount: t, whoLiked: n, toggle: r }) {
	return /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ $("button", {
		"data-ui-part": "",
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
function vt({ reactWithEmoji: e }) {
	return /* @__PURE__ */ Q("div", {
		className: "flex flex-wrap gap-0",
		children: pt.map((t) => /* @__PURE__ */ Q("button", {
			"data-ui-part": "",
			onClick: () => void e(t),
			className: "text-base bg-transparent border-none px-1 py-0.5 cursor-pointer",
			title: t,
			children: t
		}, t))
	});
}
function yt({ post: e, idToken: t, roomId: n, currentUserId: r, onMessage: a, onEdit: s, onDelete: c }) {
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
						children: mt(e.createdAt)
					})]
				})]
			}),
			x ? /* @__PURE__ */ $("div", {
				className: "mb-2",
				children: [/* @__PURE__ */ Q(H, {
					value: C,
					onChange: (e) => w(e.target.value),
					rows: 3,
					className: "resize-y mb-2"
				}), /* @__PURE__ */ $("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ Q("button", {
						"data-ui-part": "",
						onClick: () => {
							D();
						},
						disabled: !C.trim(),
						className: o("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", C.trim() ? "bg-primary text-on-primary border-none cursor-pointer" : "bg-surface-hover text-text-tertiary border border-border cursor-default"),
						children: "Save"
					}), /* @__PURE__ */ Q("button", {
						"data-ui-part": "",
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
					/* @__PURE__ */ Q(_t, {
						isLiked: l,
						likeCount: u,
						whoLiked: d,
						toggle: f
					}),
					/* @__PURE__ */ Q(vt, { reactWithEmoji: p }),
					/* @__PURE__ */ Q("button", {
						"data-ui-part": "",
						onClick: () => v((e) => !e),
						className: "bg-transparent border-none text-sm text-text-secondary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Comment"
					}),
					k && !x && /* @__PURE__ */ Q("button", {
						"data-ui-part": "",
						onClick: () => S(!0),
						className: "bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0",
						children: "Edit"
					}),
					k && !y && !x && /* @__PURE__ */ Q("button", {
						"data-ui-part": "",
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
								"data-ui-part": "",
								onClick: () => b(!1),
								className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
								children: "Cancel"
							}),
							/* @__PURE__ */ Q("button", {
								"data-ui-part": "",
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
			_ && /* @__PURE__ */ Q(ft, {
				idToken: t,
				roomId: n,
				postId: e.postId,
				onMessage: a
			})
		]
	});
}
function bt({ idToken: e, roomId: t, onMessage: r }) {
	let { posts: i, createPost: a, editPost: s, deletePost: c, loading: l, mutating: u, error: d, loadError: f, hasMore: p, loadMore: m } = n({
		idToken: e,
		roomId: t,
		onMessage: r
	}), h = ht(e);
	return /* @__PURE__ */ $("div", {
		className: "bg-surface border border-border rounded-lg p-5",
		children: [
			/* @__PURE__ */ Q(gt, {
				onCreate: a,
				loading: l || u
			}),
			/* @__PURE__ */ Q("div", { className: "border-t border-border my-4" }),
			p && /* @__PURE__ */ Q("button", {
				"data-ui-part": "",
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
			}) : i.map((n) => /* @__PURE__ */ Q(yt, {
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
function xt({ group: e, isSelected: t, onClick: n }) {
	return /* @__PURE__ */ $("button", {
		"data-ui-part": "",
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
function St({ onCreate: e, onDiscard: t, loading: n }) {
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
			/* @__PURE__ */ Q(A, {
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
					"data-ui-part": "",
					type: "submit",
					disabled: !r.trim() || n,
					className: o("flex-1 h-7 border-none rounded-[5px] text-xs font-semibold font-[inherit]", !r.trim() || n ? "bg-border text-text-tertiary cursor-default" : "bg-primary text-on-primary cursor-pointer"),
					children: n ? "Creating…" : "Create"
				}), /* @__PURE__ */ Q("button", {
					"data-ui-part": "",
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
function Ct({ group: e, members: t, rooms: n, groupId: r, currentUserId: i, createGroupRoom: a, onRoomSelect: s, inviteUser: c, loading: l }) {
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
					"data-ui-part": "",
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
				children: [/* @__PURE__ */ Q(A, {
					size: "sm",
					value: f,
					onChange: (e) => p(e.target.value),
					placeholder: "User ID",
					className: "flex-1"
				}), /* @__PURE__ */ Q("button", {
					"data-ui-part": "",
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
					"data-ui-part": "",
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
				children: [/* @__PURE__ */ Q(A, {
					size: "sm",
					value: v,
					onChange: (e) => y(e.target.value.slice(0, 50)),
					placeholder: "Room name",
					className: "flex-1"
				}), /* @__PURE__ */ Q("button", {
					"data-ui-part": "",
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
function wt({ onCreate: e, onDiscard: t, loading: n }) {
	let [r, i] = X(""), [a, s] = X("public"), [c, l] = X(null), u = Fe(), d = async (t) => {
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
				}), /* @__PURE__ */ Q(A, {
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
						"data-ui-part": "",
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
					"data-ui-part": "",
					type: "submit",
					disabled: !r.trim() || n,
					className: o("flex-1 h-9 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !r.trim() || n ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-on-primary border-none cursor-pointer"),
					children: n ? "Creating…" : "Create Group"
				}), /* @__PURE__ */ Q("button", {
					"data-ui-part": "",
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
function Tt({ group: e, currentUserId: t, isSelected: n, onSelect: r, onDelete: i }) {
	let [a, s] = X(null), c = e.ownerId === t;
	return /* @__PURE__ */ $("div", {
		"data-ui-part": "",
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
						"data-ui-part": "",
						onClick: () => s(null),
						className: "text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Cancel"
					}), /* @__PURE__ */ Q("button", {
						"data-ui-part": "",
						onClick: () => {
							i(e.groupId), s(null);
						},
						className: "text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]",
						children: "Delete"
					})]
				}) : /* @__PURE__ */ Q("button", {
					"data-ui-part": "",
					onClick: () => s(e.groupId),
					className: "text-xs text-danger-fg bg-transparent border-none cursor-pointer px-2 py-1 font-[system-ui,-apple-system,sans-serif]",
					"aria-label": `Delete group ${e.name}`,
					children: "Delete"
				})
			})
		]
	});
}
function Et({ groupId: e, onInvite: t }) {
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
		children: [/* @__PURE__ */ Q(A, {
			className: "flex-1",
			value: n,
			onChange: (e) => r(e.target.value),
			placeholder: "User ID to invite"
		}), /* @__PURE__ */ Q("button", {
			"data-ui-part": "",
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
function Dt({ members: e }) {
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
function Ot({ rooms: e, groupId: t, selectedGroupRole: n, createGroupRoom: r, onRoomSelect: i, loading: a }) {
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
						/* @__PURE__ */ Q(A, {
							className: "flex-1",
							value: l,
							onChange: (e) => u(e.target.value.slice(0, 50)),
							placeholder: "Room name",
							maxLength: 50,
							required: !0
						}),
						/* @__PURE__ */ Q("button", {
							"data-ui-part": "",
							type: "submit",
							disabled: !l.trim() || a,
							className: o("h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]", !l.trim() || a ? "bg-surface-hover text-text-tertiary border border-border cursor-default" : "bg-primary text-on-primary border-none cursor-pointer"),
							children: a ? "Creating…" : "Create Room"
						}),
						/* @__PURE__ */ Q("button", {
							"data-ui-part": "",
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
				"data-ui-part": "",
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
function kt({ idToken: e, rooms: n, createGroupRoom: r, onRoomSelect: i, roomsLoading: a, compact: s }) {
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
					"data-ui-part": "",
					onClick: () => b((e) => !e),
					className: "w-full text-left px-2 py-1 bg-transparent border-none cursor-pointer text-xs text-primary font-semibold font-[system-ui,-apple-system,sans-serif] rounded",
					children: "+ New Group"
				}),
				y && /* @__PURE__ */ Q(St, {
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
							"data-ui-part": "",
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
				}) : c.map((e) => /* @__PURE__ */ Q(xt, {
					group: e,
					isSelected: e.groupId === x,
					onClick: () => T(e.groupId)
				}, e.groupId)) }),
				e && /* @__PURE__ */ Q(Ct, {
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
							"data-ui-part": "",
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
				}) : c.map((e) => /* @__PURE__ */ Q(Tt, {
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
					/* @__PURE__ */ Q(Dt, { members: p }),
					(D === "owner" || D === "admin") && /* @__PURE__ */ Q(Et, {
						groupId: x,
						onInvite: d
					}),
					/* @__PURE__ */ Q(Ot, {
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
				"data-ui-part": "",
				onClick: () => b((e) => !e),
				className: o("w-full h-9 bg-primary text-on-primary border-none rounded-lg text-sm font-semibold cursor-pointer font-[system-ui,-apple-system,sans-serif]", y && "mb-2"),
				children: y ? "Cancel" : "Create Group"
			}),
			y && /* @__PURE__ */ Q(wt, {
				onCreate: w,
				onDiscard: () => b(!1),
				loading: m
			})
		]
	});
}
//#endregion
//#region src/components/social/ReactionsBar.tsx
function At({ reactions: e, onReact: t, disabled: n = !1, pickerEmojis: r = we, addTriggerLabel: i, hideAddTrigger: a = !1, className: s }) {
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
				"data-ui-part": "",
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
				"data-ui-part": "",
				ref: u,
				type: "button",
				onClick: () => !n && l((e) => !e),
				disabled: n,
				"aria-haspopup": "dialog",
				"aria-expanded": c,
				"data-testid": "reactions-bar-add",
				className: o("inline-flex items-center justify-center rounded-full border border-solid border-[var(--color-border)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", "h-6 min-w-6 px-1.5 text-xs text-[var(--color-text-secondary)] transition-colors", !n && "hover:border-[var(--color-primary)] hover:text-[var(--color-text-primary)]", n && "opacity-50 cursor-not-allowed"),
				children: [i ?? /* @__PURE__ */ Q("span", {
					"aria-hidden": !0,
					children: "+ 😀"
				}), /* @__PURE__ */ Q("span", {
					className: "sr-only",
					children: "Add reaction"
				})]
			}),
			/* @__PURE__ */ Q(Ce, {
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
function jt({ items: e, activeId: t, onSelect: n, compact: r = !1, iconOnly: i = !1, size: a = "sm", plain: s = !1, layout: c = "list", className: l, "data-testid": u = "conversation-shelf" }) {
	if (e.length === 0) return null;
	if (c === "bar") return /* @__PURE__ */ Q("ul", {
		"data-testid": u,
		"data-layout": "bar",
		className: o("m-0 flex list-none items-center gap-1 p-0", l),
		children: e.map((e) => {
			let r = e.id === t, i = e.count ?? 0, a = i > 0 ? `${e.label}, ${i > 99 ? "99+" : i} ${e.urgent ? "waiting" : "new"}` : e.label;
			return /* @__PURE__ */ Q("li", { children: /* @__PURE__ */ $("button", {
				"data-ui-part": "",
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
				"data-ui-part": "",
				type: "button",
				onClick: () => n(e.id),
				"aria-label": i ? e.label : void 0,
				title: i ? e.label : void 0,
				"data-testid": `${u}-${e.id}`,
				"data-active": a ? "true" : "false",
				"aria-current": a ? "true" : void 0,
				className: o("relative flex w-full cursor-pointer items-center gap-2 text-left", r ? o("border-l-2 border-transparent px-2", d ? o("min-h-9 gap-3", I) : f ? "min-h-9 gap-3 py-1.5" : "min-h-8 py-1") : "rounded-lg px-2 py-1.5", r && a && (s ? "border-primary bg-primary-bg" : "border-primary bg-surface-hover"), s && f && "pl-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", !(s && a) && "hover:bg-surface-hover", a && !s && "bg-surface-hover"),
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
						className: o("min-w-0 flex-1 truncate", d ? "text-[14px] font-medium leading-5" : f ? "text-[15px]" : "text-[13px]", s && a ? "font-medium text-primary-fg" : c > 0 || a ? "font-semibold text-text-primary" : d ? "text-text-primary" : f ? "font-normal text-text-primary" : "font-medium text-text-secondary"),
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
var Mt = "px-2", Nt = "px-2", Pt = "dms", Ft = "channels";
function It(e, t) {
	let n = new Set(e), r = (t ?? []).filter((e, t, r) => n.has(e) && r.indexOf(e) === t), i = e.filter((e) => !r.includes(e)), a = [...r];
	for (let t of i) {
		let n = e.slice(0, e.indexOf(t)).reverse().find((e) => a.includes(e));
		a.splice(n ? a.indexOf(n) + 1 : 0, 0, t);
	}
	return a;
}
function Lt({ shelf: e = [], conversations: t, selected: n = null, onSelect: r, onNewChat: i, grouped: a = !0, sectionOrder: s = "channels-first", sectionActions: c, collapsedSections: l, onToggleSection: u, onStartCall: f, maxVisible: h, emptyLabel: g, header: _, title: v, actions: b, beforeList: x, footer: S, onTogglePin: w, onToggleMute: T, onMarkUnread: E, onRename: D, canRename: O, onSetSection: k, collapsible: A = !1, collapsed: j = !1, onToggleCollapse: M, shelfLayout: P = "list", search: F, sections: I, sectionLayout: L, onSectionLayoutChange: R, showSections: z, className: te, "data-testid": B = "conversation-rail" }) {
	let [V, ne] = X(!1), [re, ie] = X(!1), ae = Y(null), oe = !!F && (V || F.value !== ""), se = F?.label ?? "Find a chat", H = () => {
		F?.onChange(""), ne(!1), ae.current?.focus();
	}, U = A && j, ce = n?.kind === "shelf" ? n.id : null, le = {
		sectionActions: c,
		collapsedSections: l,
		onToggleSection: u,
		onStartCall: f,
		maxVisible: h,
		activeChannel: n?.kind === "conversation" ? n.channel : null,
		onSelect: (e) => r({
			kind: "conversation",
			channel: e
		}),
		onTogglePin: w,
		onToggleMute: T,
		onMarkUnread: E,
		onRename: D,
		canRename: O,
		onSetSection: k
	}, ue = (e) => (e.kind ?? (e.peers.length > 1 ? "group" : "dm")) === "channel", de = I ? [{
		id: "dms",
		label: "Direct messages",
		node: null
	}, {
		id: Ft,
		label: "Channels",
		node: null
	}] : [], fe = I ? [...I, ...s === "dms-first" ? de : [...de].reverse()] : [], pe = fe.map((e) => e.id), W = I && z ? new Set(z) : null, me = I ? It(pe, L).filter((e) => !W || W.has(e)) : [], he = new Map(fe.map((e) => [e.id, e])), ge = (e, t) => {
		let n = [...me], r = n.indexOf(e), i = r + t;
		r < 0 || i < 0 || i >= n.length || ([n[r], n[i]] = [n[i], n[r]], R?.(n));
	}, _e = t.filter((e) => !ue(e)), G = t.filter(ue), ye = !W || W.has("dms") || W.has("channels"), be = W ? (W.has("dms") ? _e.length : 0) + (W.has("channels") ? G.length : 0) : t.length, xe = (e) => {
		if (e === "dms" || e === "channels") {
			let t = e === "dms" ? _e : G;
			return t.length === 0 ? null : /* @__PURE__ */ Q(Ke, {
				items: t,
				grouped: !0,
				sectionOrder: s,
				...le,
				onNewChat: e === "dms" ? i : void 0,
				className: o(Mt, "pb-2"),
				"data-testid": `${B}-list-${e}`
			}, e);
		}
		let t = he.get(e);
		if (!t) return null;
		let n = t["data-testid"], r = !!l?.[t.label], a = (t.rows || t.heading) && /* @__PURE__ */ Q(De, {
			label: t.label,
			presentational: !1,
			...typeof t.count == "number" ? { count: t.count } : {},
			...u ? {
				collapsed: r,
				onToggleCollapse: (e) => u(t.label, e)
			} : {},
			...n ? { controls: n } : {}
		}), c = t.rows ? t.note ? /* @__PURE__ */ Q(d, {
			as: "div",
			size: "xs",
			tone: "tertiary",
			wrap: !0,
			className: Nt,
			...n ? { "data-testid": `${n}-note` } : {},
			children: t.note
		}) : /* @__PURE__ */ Q(Ke, {
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
			className: o("shrink-0", Mt),
			"data-rail-section": e,
			...n && a ? { "data-testid": `${n}-section` } : {},
			children: [a, a && u && r ? null : c]
		}, e);
	}, Se = F || R && !W || b != null ? /* @__PURE__ */ $(Z, { children: [
		F && /* @__PURE__ */ Q(p, {
			ref: ae,
			size: "sm",
			variant: "ghost",
			"aria-label": se,
			title: se,
			"aria-pressed": oe,
			"aria-expanded": oe,
			icon: /* @__PURE__ */ Q(y, { size: 14 }),
			onClick: () => oe ? H() : ne(!0),
			"data-testid": `${B}-search-toggle`
		}),
		b,
		R && I && !W && /* @__PURE__ */ Q(ee, {
			trigger: /* @__PURE__ */ Q(m, { size: 14 }),
			triggerLabel: "Rail options",
			triggerTitle: "Rail options",
			align: "end",
			triggerTestId: `${B}-options`,
			triggerClassName: "h-7 w-7 border-transparent px-0 py-0 text-text-secondary",
			sections: [{ items: [{
				label: re ? "Done arranging" : "Arrange sections…",
				onSelect: () => ie((e) => !e),
				"data-testid": `${B}-arrange`
			}, {
				label: "Reset layout",
				onSelect: () => {
					R(null), ie(!1);
				},
				"data-testid": `${B}-reset-layout`
			}] }]
		})
	] }) : void 0, Ce = oe && F ? /* @__PURE__ */ Q(N, {
		value: F.value,
		onChange: F.onChange,
		placeholder: F.placeholder ?? se,
		size: "sm",
		className: "w-full",
		"aria-label": se,
		autoFocus: !0,
		onKeyDown: (e) => {
			e.key === "Escape" && (e.preventDefault(), H());
		},
		"data-testid": F["data-testid"] ?? `${B}-search`
	}) : null;
	return /* @__PURE__ */ $(ve, {
		title: v,
		label: "Chat",
		actions: Se,
		header: Ce || _ ? /* @__PURE__ */ $(Z, { children: [Ce, _] }) : void 0,
		footer: S,
		collapsed: U,
		onToggle: A ? () => M?.(!U) : void 0,
		toggleLabel: U ? "Expand the sidebar" : "Collapse the sidebar",
		toggleTestId: `${B}-collapse`,
		"data-testid": B,
		className: te,
		collapsedContent: U && e.length > 0 ? /* @__PURE__ */ Q(jt, {
			items: e,
			activeId: ce,
			onSelect: (e) => r({
				kind: "shelf",
				id: e
			}),
			compact: !0,
			iconOnly: !0,
			"data-testid": `${B}-collapsed-shelf`
		}) : void 0,
		children: [
			!U && e.length > 0 && /* @__PURE__ */ Q(jt, {
				items: e,
				activeId: ce,
				onSelect: (e) => r({
					kind: "shelf",
					id: e
				}),
				compact: !0,
				layout: P,
				className: P === "bar" ? "shrink-0 border-b border-border px-[9px] py-1" : "shrink-0 px-3.5 pb-2",
				"data-testid": `${B}-shelf`
			}),
			!U && x && /* @__PURE__ */ Q("div", {
				className: o("shrink-0", "px-2"),
				children: x
			}),
			!U && I && re && /* @__PURE__ */ Q("div", {
				className: o("shrink-0 py-2", "px-2"),
				"data-testid": `${B}-arranging`,
				children: /* @__PURE__ */ Q("ul", {
					"aria-label": "Arrange sections",
					className: "m-0 flex list-none flex-col gap-0.5 p-0",
					children: me.map((e, t) => /* @__PURE__ */ $("li", {
						className: "flex items-center gap-1 px-2 py-1",
						"data-testid": `${B}-arrange-${e}`,
						children: [
							/* @__PURE__ */ Q("span", {
								className: o("min-w-0 flex-1 truncate", "text-[12px] font-semibold uppercase leading-4 tracking-wide", "text-text-secondary"),
								children: he.get(e)?.label ?? e
							}),
							/* @__PURE__ */ Q(p, {
								size: "sm",
								variant: "ghost",
								"aria-label": `Move ${he.get(e)?.label ?? e} up`,
								disabled: t === 0,
								icon: /* @__PURE__ */ Q(C, {
									dir: "up",
									size: 14
								}),
								onClick: () => ge(e, -1),
								"data-testid": `${B}-arrange-${e}-up`
							}),
							/* @__PURE__ */ Q(p, {
								size: "sm",
								variant: "ghost",
								"aria-label": `Move ${he.get(e)?.label ?? e} down`,
								disabled: t === me.length - 1,
								icon: /* @__PURE__ */ Q(C, {
									dir: "down",
									size: 14
								}),
								onClick: () => ge(e, 1),
								"data-testid": `${B}-arrange-${e}-down`
							})
						]
					}, e))
				})
			}),
			!U && I && !re && me.map(xe),
			!U && I && !re && ye && be === 0 && /* @__PURE__ */ Q(Ke, {
				items: [],
				...le,
				emptyLabel: g,
				className: o("px-2", "pb-2"),
				"data-testid": `${B}-list`
			}),
			!U && !I && /* @__PURE__ */ Q(Ke, {
				items: t,
				grouped: a,
				sectionOrder: s,
				sectionActions: c,
				collapsedSections: l,
				onToggleSection: u,
				onStartCall: f,
				maxVisible: h,
				activeChannel: n?.kind === "conversation" ? n.channel : null,
				onSelect: (e) => r({
					kind: "conversation",
					channel: e
				}),
				onNewChat: i,
				emptyLabel: g,
				onTogglePin: w,
				onToggleMute: T,
				onMarkUnread: E,
				onRename: D,
				canRename: O,
				onSetSection: k,
				className: "px-2 pb-2",
				"data-testid": `${B}-list`
			})
		]
	});
}
//#endregion
//#region src/components/social/railSections.ts
function Rt(e, t) {
	let n = (t ?? "").trim().toLowerCase();
	return !n || e.toLowerCase().includes(n);
}
function zt(e) {
	let t = e.items.filter((t) => Rt(e.name(t), e.query)).map((t) => ({
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
function Bt(e, t) {
	if (typeof window > "u") return null;
	try {
		let n = JSON.parse(window.localStorage.getItem(e) ?? "null");
		return t(n) ? n : null;
	} catch {
		return null;
	}
}
function Vt(e, t) {
	try {
		t == null ? window.localStorage.removeItem(e) : window.localStorage.setItem(e, JSON.stringify(t));
	} catch {}
}
var Ht = (e) => !!e && typeof e == "object" && !Array.isArray(e), Ut = (e) => Array.isArray(e) && e.every((e) => typeof e == "string");
function Wt(e, t = {}) {
	let n = `${e}.folded`, r = `${e}.layout`, [i, a] = X(() => Bt(n, Ht) ?? {}), [o, s] = X(() => Bt(r, Ut)), c = K((e, t) => a((r) => {
		let i = {
			...r,
			[e]: t
		};
		return Vt(n, i), i;
	}), [n]), l = K((e) => {
		s(e), Vt(r, e);
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
var Gt = Ne(() => import("./ChatLabTerminal-DzQfdWid.js")), Kt = {
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
}, qt = {
	pending: "bg-code-raised",
	running: "bg-code-green animate-pulse motion-reduce:animate-none",
	done: "bg-code-blue",
	failed: "bg-code-red",
	skipped: "bg-code-raised"
}, Jt = {
	pending: "text-code-muted",
	running: "text-code-text",
	done: "text-code-subtle",
	failed: "text-code-red",
	skipped: "text-code-muted line-through"
}, Yt = {
	command: "text-code-mauve",
	text: "text-code-text",
	tool: "text-code-blue",
	result: "text-code-green",
	error: "text-code-red",
	status: "text-code-subtle",
	iteration: "text-code-yellow"
};
function Xt(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n += 1) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
	return t >>> 0;
}
function Zt(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleTimeString([], { hour12: !1 });
}
function Qt({ title: e, status: t, model: n, contextBudgetTokens: r, contextTokens: i, iterations: a, planSource: c, steps: u, events: d, onInstruct: f, onStop: p, onBackToChat: m, onOpenRun: h, onOpenGraph: g, shell: _, notice: v, headerAccessory: y, variant: b = "column", className: x, "data-testid": S = "chat-lab-shell" }) {
	let C = b === "pane", [w, T] = X("stream"), [E, D] = X(""), [O, k] = X([]), A = Kt[t] ?? Kt.running, j = r > 0 ? Math.min(1, Math.max(0, i / r)) : 0, M = A.busy, N = K((e) => {
		k((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}, []), P = K(() => {
		let e = E.trim();
		!e || M || !f || (D(""), f(e));
	}, [
		E,
		M,
		f
	]), F = K((e) => {
		e.key === "Escape" && (e.stopPropagation(), m());
	}, [m]), ee = J(() => d.map((e) => {
		let t = O.includes(e.id), n = /* @__PURE__ */ $("span", {
			className: "flex flex-wrap items-baseline gap-1.5",
			children: [
				/* @__PURE__ */ Q("span", {
					className: o("whitespace-pre-wrap break-words", Yt[e.kind]),
					children: e.text
				}),
				e.mock && /* @__PURE__ */ Q(l, {
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
					"data-ui-part": "",
					type: "button",
					onClick: () => N(e.id),
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
			timestamp: Zt(e.at),
			source: e.kind,
			...e.kind === "error" ? { level: "error" } : {},
			message: n
		};
	}), [
		d,
		O,
		N,
		S
	]), I = J(() => [{
		id: "stream",
		label: "Stream"
	}, ..._ ? [{
		id: "terminal",
		label: "Terminal"
	}] : []], [_]), L = w === "terminal" && !_ ? "stream" : w, z = /* @__PURE__ */ $(Z, { children: [
		/* @__PURE__ */ Q("span", {
			"aria-hidden": "true",
			"data-testid": `${S}-status-dot`,
			className: o("inline-block h-2 w-2 shrink-0 rounded-full", A.dot, M && "animate-pulse motion-reduce:animate-none")
		}),
		/* @__PURE__ */ Q("span", {
			className: o("shrink-0 font-semibold", A.text),
			"data-testid": `${S}-status-label`,
			children: A.label
		}),
		/* @__PURE__ */ Q("span", {
			"aria-hidden": "true",
			className: "text-code-raised",
			children: "│"
		}),
		/* @__PURE__ */ Q(l, {
			size: "xs",
			mono: !0,
			palette: "code",
			tone: "accent",
			title: n,
			"data-testid": `${S}-model`,
			children: Ae(n)
		})
	] }), te = /* @__PURE__ */ $(Z, { children: [
		/* @__PURE__ */ $("span", {
			className: "shrink-0 tabular-nums text-code-subtle",
			title: "Context spent against this loop's budget",
			"data-testid": `${S}-budget`,
			children: [
				Te(i),
				" / ",
				Te(r)
			]
		}),
		/* @__PURE__ */ Q(U, {
			value: j,
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
	] }), B = /* @__PURE__ */ Q("span", {
		className: "min-w-0 flex-1 truncate text-code-comment",
		title: e,
		"data-testid": `${S}-title`,
		children: e
	}), V = /* @__PURE__ */ $(Z, { children: [
		y != null && y !== !1 && /* @__PURE__ */ Q("span", {
			className: "flex shrink-0 items-center",
			"data-testid": `${S}-header-accessory`,
			children: y
		}),
		g && /* @__PURE__ */ Q(s, {
			tone: "code",
			variant: "ghost",
			size: "sm",
			onClick: g,
			"data-testid": `${S}-open-graph`,
			children: "Graph"
		}),
		h && /* @__PURE__ */ Q(s, {
			tone: "code",
			variant: "ghost",
			size: "sm",
			onClick: h,
			"data-testid": `${S}-open-run`,
			children: "Run"
		}),
		p && /* @__PURE__ */ Q(s, {
			tone: "code",
			variant: "danger",
			size: "sm",
			onClick: p,
			disabled: !M && t !== "waiting",
			"data-testid": `${S}-stop`,
			children: "Stop"
		}),
		/* @__PURE__ */ Q(s, {
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
		onKeyDown: F,
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
						z,
						/* @__PURE__ */ Q("span", {
							className: "min-w-0 flex-1",
							"aria-hidden": "true"
						}),
						V
					]
				}), /* @__PURE__ */ $("div", {
					className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1",
					"data-testid": `${S}-status-spend`,
					children: [te, B]
				})] }) : /* @__PURE__ */ $(Z, { children: [
					z,
					/* @__PURE__ */ Q("span", {
						"aria-hidden": "true",
						className: "text-code-raised",
						children: "│"
					}),
					te,
					B,
					V
				] })
			}),
			(v || c === "fallback") && /* @__PURE__ */ Q("div", {
				role: "status",
				"data-testid": `${S}-notice`,
				className: "shrink-0 border-b border-code-border bg-code-surface px-3 py-1.5 text-[11px] text-code-peach",
				children: v ?? "Planner unavailable · single step"
			}),
			u.length > 0 && /* @__PURE__ */ Q("ol", {
				"data-testid": `${S}-steps`,
				"aria-label": "Loop steps",
				className: o("flex shrink-0 list-none items-center gap-1.5 border-b border-code-border bg-code-panel px-3 py-1.5", C ? "flex-wrap" : "overflow-x-auto"),
				children: u.map((e) => /* @__PURE__ */ $("li", {
					"data-testid": `${S}-step`,
					"data-state": e.status,
					title: `${e.kind} · ${e.status}${e.iterations ? ` · ${e.iterations} turns` : ""}`,
					className: "flex shrink-0 items-center gap-1.5 rounded-full border border-code-border bg-code-surface px-2 py-0.5 text-[11px] leading-none",
					children: [/* @__PURE__ */ Q("span", {
						"aria-hidden": "true",
						className: o("inline-block h-1.5 w-1.5 shrink-0 rounded-full", qt[e.status])
					}), /* @__PURE__ */ Q("span", {
						className: o(C ? "max-w-[12rem]" : "max-w-[16rem]", "truncate", Jt[e.status]),
						children: e.title
					})]
				}, e.id))
			}),
			/* @__PURE__ */ Q("div", {
				className: "shrink-0 border-b border-code-border bg-code-panel px-3",
				children: /* @__PURE__ */ Q(R, {
					items: I,
					value: L,
					onValueChange: (e) => T(e === "terminal" ? "terminal" : "stream"),
					variant: "underline",
					size: "sm",
					"aria-label": "Lab view",
					className: "border-b-0"
				})
			}),
			/* @__PURE__ */ $(ge, {
				active: M,
				particleCount: 220,
				speed: .14,
				alphaParticles: !0,
				moveParticlesOnHover: !0,
				particleHoverFactor: .6,
				particleColors: he,
				fallbackIntensity: "medium",
				seed: Xt(_?.sessionId ?? e),
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${S}-particles`,
				children: [/* @__PURE__ */ Q("div", {
					className: "flex min-h-0 flex-1 flex-col",
					children: L === "stream" ? /* @__PURE__ */ Q(pe, {
						lines: ee,
						title: null,
						showLevel: !1,
						emptyMessage: "No output yet.",
						tone: M ? "transparent" : "code",
						className: "min-h-0 flex-1 rounded-none border-none",
						"data-testid": `${S}-stream`
					}) : _?.shellUrl ? /* @__PURE__ */ Q(je, {
						fallback: /* @__PURE__ */ Q("div", {
							className: "flex flex-1 items-center justify-center text-[11px] text-code-muted",
							children: "Loading terminal…"
						}),
						children: /* @__PURE__ */ Q(Gt, {
							sessionId: _.sessionId,
							shellUrl: _.shellUrl,
							"data-testid": `${S}-terminal`
						})
					}) : /* @__PURE__ */ $("div", {
						className: "flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center",
						children: [/* @__PURE__ */ Q("p", {
							className: "text-[11px] text-code-muted",
							children: "The loop is working in a cloud computer. Open a shell to look around its workspace."
						}), /* @__PURE__ */ Q(s, {
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
					className: o("flex shrink-0 items-center gap-2 border-t border-code-border px-3 py-2", M ? "bg-transparent" : "bg-code-panel"),
					children: [
						/* @__PURE__ */ Q("span", {
							"aria-hidden": "true",
							className: "shrink-0 text-code-green",
							children: "›"
						}),
						/* @__PURE__ */ Q("input", {
							"data-ui-part": "",
							type: "text",
							value: E,
							onChange: (e) => D(e.target.value),
							onKeyDown: (e) => {
								e.key !== "Enter" || e.shiftKey || (e.preventDefault(), P());
							},
							disabled: M || !f,
							placeholder: M ? "Working — the prompt opens between turns" : "Continue with…",
							"aria-label": "Instruct the agent",
							"data-testid": `${S}-prompt`,
							className: "min-w-0 flex-1 border-none bg-transparent text-[12px] text-code-text outline-none placeholder:text-code-muted disabled:cursor-not-allowed disabled:text-code-muted"
						}),
						/* @__PURE__ */ Q(s, {
							tone: "code",
							variant: "primary",
							size: "sm",
							onClick: P,
							disabled: M || !f || E.trim().length === 0,
							"data-testid": `${S}-send`,
							children: "Send"
						})
					]
				})]
			})
		]
	});
}
function $t({ status: e, contextTokens: t, contextBudgetTokens: n, onOpen: r, className: i, "data-testid": a = "chat-lab-pill" }) {
	let s = Kt[e] ?? Kt.running;
	return /* @__PURE__ */ $("button", {
		"data-ui-part": "",
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
					Te(t),
					"/",
					Te(n)
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
var en = 300;
function tn({ mode: e = "chat", working: t = !1, tone: n = "auto", className: r, children: i, "data-testid": a = "chat-column-backdrop" }) {
	let s = Y(null), c = W(s, n, e !== "chat"), l = e !== "chat" && c !== "none", [u, d] = X(l);
	q(() => {
		if (l) {
			d(!0);
			return;
		}
		let e = setTimeout(() => d(!1), en);
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
		children: /* @__PURE__ */ Q(ge, {
			active: l,
			tone: c === "graphite" ? "graphite" : "night",
			particleCount: t ? 260 : 170,
			density: t ? 14 : 10,
			speed: t ? .16 : .07,
			moveParticlesOnHover: t,
			particleHoverFactor: .6,
			alphaParticles: !0,
			particleColors: c === "graphite" ? me : he,
			particleBaseSize: t ? 110 : 90,
			fallbackIntensity: t ? "medium" : "low",
			className: "flex min-h-0 min-w-0 flex-1 flex-col",
			"data-testid": `${a}-particles`,
			children: /* @__PURE__ */ Q(_e.Provider, {
				value: f,
				children: i
			})
		})
	});
}
//#endregion
//#region src/components/social/RunSummaryPanel.tsx
function nn(e, t) {
	return `${e}:${t}`;
}
function rn(e) {
	let t = e.indexOf(":");
	return t <= 0 || t === e.length - 1 ? null : {
		pipelineId: e.slice(0, t),
		runId: e.slice(t + 1)
	};
}
function an(e) {
	return e === "received" || e === "running" || e === "awaiting_approval";
}
var on = {
	received: "Received",
	running: "Running",
	awaiting_approval: "Needs approval",
	completed: "Completed",
	rejected: "Rejected",
	failed: "Failed"
}, sn = {
	received: "neutral",
	running: "info",
	awaiting_approval: "warning",
	completed: "success",
	rejected: "danger",
	failed: "danger"
}, cn = 8;
function ln(e) {
	return e.kind === "link" ? e.label ?? "Open link" : e.kind === "panel" ? e.panel.title ? `Open ${e.panel.title}` : "Open result" : "Open beside the chat";
}
function un({ data: e, onOpenFull: t, onOpenChat: n, onOpenDocument: r, onOpenResult: i, className: a, "data-testid": c = "run-summary-panel" }) {
	let { status: u } = e, d = e.pipelineName || e.pipelineId, f = se({
		startedAt: e.startedAt,
		completedAt: e.completedAt
	}), p = e.ops ?? [], m = e.result && i && !(e.result.kind === "document" && e.document && r), g = e.document?.title || "Document", _ = u === "failed" ? e.error || "The run failed" : void 0;
	return /* @__PURE__ */ $("div", {
		className: o("flex h-full min-h-0 flex-col text-[12px]", a),
		"data-testid": c,
		"data-status": u,
		"data-run-id": e.runId,
		"data-pipeline-id": e.pipelineId,
		children: [/* @__PURE__ */ $("div", {
			className: "flex min-h-0 flex-1 flex-col gap-3 overflow-auto p-3",
			children: [
				/* @__PURE__ */ $("header", {
					className: "flex flex-col gap-1",
					"data-testid": `${c}-header`,
					children: [
						/* @__PURE__ */ $("div", {
							className: "flex min-w-0 items-center gap-2",
							children: [/* @__PURE__ */ Q("span", {
								className: "min-w-0 flex-1 truncate text-[13px] font-semibold text-text-primary",
								"data-testid": `${c}-name`,
								children: d
							}), /* @__PURE__ */ Q(l, {
								size: "xs",
								tone: sn[u],
								dot: u === "running" ? "pulse" : void 0,
								"data-testid": `${c}-status`,
								children: on[u]
							})]
						}),
						f && /* @__PURE__ */ Q("span", {
							className: "text-[11px] text-text-tertiary",
							"data-testid": `${c}-timings`,
							children: f
						}),
						(e.command || e.instruction) && /* @__PURE__ */ $("p", {
							className: "m-0 min-w-0 text-text-primary",
							"data-testid": `${c}-instruction`,
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
					"data-ui-part": "",
					"aria-label": "Steps",
					"data-testid": `${c}-steps`,
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
									className: o("relative mt-[5px] inline-block h-[7px] w-[7px] shrink-0 rounded-full", ae[t.status] ?? ae.pending)
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
					"data-ui-part": "",
					"data-testid": `${c}-ops`,
					children: [
						/* @__PURE__ */ Q("h3", {
							className: "m-0 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
							children: "What changed"
						}),
						/* @__PURE__ */ Q("ul", {
							className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
							children: p.slice(0, cn).map((e, t) => /* @__PURE__ */ Q("li", {
								className: "truncate",
								"data-op": e.op,
								title: e.text,
								children: V(e)
							}, t))
						}),
						p.length > cn && /* @__PURE__ */ $("div", {
							className: "text-[11px] text-text-tertiary",
							"data-testid": `${c}-more-ops`,
							children: [
								"+",
								p.length - cn,
								" more"
							]
						})
					]
				}),
				e.document && /* @__PURE__ */ $("div", {
					className: "flex items-start gap-2 rounded-md border border-border bg-surface-inset px-2 py-1.5",
					"data-testid": `${c}-document`,
					children: [
						/* @__PURE__ */ Q(h, {
							size: 14,
							className: "mt-0.5 shrink-0 text-text-tertiary",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ $("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ Q("span", {
								className: "block truncate font-medium text-text-primary",
								children: g
							}), e.document.snippet && /* @__PURE__ */ Q("span", {
								className: "line-clamp-2 block text-[11px] text-text-secondary",
								children: e.document.snippet
							})]
						}),
						r && /* @__PURE__ */ Q(s, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0.5 text-[11px] leading-5",
							onClick: () => r(e.document.id),
							"data-testid": `${c}-open-document`,
							children: "Open beside the chat"
						})
					]
				}),
				m && e.result && /* @__PURE__ */ $("div", {
					className: "flex items-center gap-2",
					"data-testid": `${c}-result`,
					"data-result-kind": e.result.kind,
					children: [/* @__PURE__ */ Q("span", {
						className: "min-w-0 flex-1 text-text-secondary",
						children: "Result"
					}), /* @__PURE__ */ Q(s, {
						size: "sm",
						variant: "secondary",
						className: "!px-2 !py-0.5 text-[11px] leading-5",
						onClick: () => i(e.result),
						"data-testid": `${c}-open-result`,
						children: ln(e.result)
					})]
				}),
				_ && /* @__PURE__ */ Q(fe, {
					tone: "error",
					className: "text-[11px]",
					children: /* @__PURE__ */ Q("span", {
						"data-testid": `${c}-error`,
						children: _
					})
				})
			]
		}), /* @__PURE__ */ $("footer", {
			className: "flex shrink-0 items-center gap-2 border-t border-border px-3 py-2",
			"data-testid": `${c}-footer`,
			children: [/* @__PURE__ */ Q(s, {
				size: "sm",
				variant: "primary",
				onClick: t,
				"data-testid": `${c}-open-full`,
				children: "Open full run"
			}), n && e.channel && /* @__PURE__ */ Q(s, {
				size: "sm",
				variant: "secondary",
				onClick: n,
				"data-testid": `${c}-open-chat`,
				children: "Open chat"
			})]
		})]
	});
}
function dn({ panel: e, api: t, options: n }) {
	let { load: r, onOpenFull: i, onOpenChat: a, onOpenDocument: o, onOpenResult: c, refreshMs: l = 2e3, "data-testid": u = "run-panel" } = n, [d, f] = X({ status: "loading" }), [p, m] = X(0), h = Y(r);
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
	let g = d.status === "ready" && an(d.data.status);
	q(() => {
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
	let _ = K(() => m((e) => e + 1), []);
	if (d.status === "loading") return /* @__PURE__ */ $("div", {
		className: "flex flex-col gap-3 p-3",
		"data-testid": `${u}-loading`,
		"aria-busy": "true",
		children: [
			/* @__PURE__ */ Q(B, {
				height: 20,
				width: "60%",
				rounded: "md"
			}),
			/* @__PURE__ */ Q(B, {
				height: 14,
				width: "40%",
				rounded: "md"
			}),
			/* @__PURE__ */ Q(B, { height: 96 }),
			/* @__PURE__ */ Q(B, { height: 44 })
		]
	});
	if (d.status === "error") return /* @__PURE__ */ $("div", {
		className: "flex flex-col gap-2 p-3",
		"data-testid": `${u}-error`,
		children: [/* @__PURE__ */ $(fe, {
			tone: "error",
			children: ["Could not load this run: ", d.message]
		}), /* @__PURE__ */ Q(s, {
			size: "sm",
			variant: "secondary",
			onClick: _,
			className: "self-start",
			"data-testid": `${u}-retry`,
			children: "Try again"
		})]
	});
	let { data: v } = d;
	return /* @__PURE__ */ Q(un, {
		data: v,
		onOpenFull: () => i(e, v),
		onOpenChat: a ? () => a(e, v) : void 0,
		onOpenDocument: o,
		onOpenResult: c,
		"data-testid": u
	});
}
function fn(e) {
	return (t, n) => /* @__PURE__ */ Q(dn, {
		panel: t,
		api: n,
		options: e
	});
}
//#endregion
//#region src/components/social/chatCommands.ts
var pn = /^chat:dmg?:/;
function mn(e) {
	return e.channelKind ?? (pn.test(e.channel) ? "dm" : "room");
}
function hn(e, t) {
	let n = e.scope ?? "always";
	if (typeof n == "function") return n(t);
	switch (n) {
		case "always": return !0;
		case "document-open": return t.sidePanel.current?.kind === "document";
		case "room": return mn(t) === "room";
		case "dm": return mn(t) === "dm";
		default: return !0;
	}
}
function gn(e) {
	if (e.disabledHint) return e.disabledHint;
	switch (e.scope) {
		case "document-open": return "Open a document beside the chat first";
		case "room": return "Only in rooms";
		case "dm": return "Only in direct messages";
		default: return e.hint ?? "Not available here";
	}
}
function _n(e, t) {
	return e.map((e) => {
		let { run: n, scope: r, disabledHint: i, ...a } = e;
		return hn({ scope: r }, t) ? a : {
			...a,
			disabled: !0,
			hint: gn({
				scope: r,
				disabledHint: i,
				hint: a.hint
			})
		};
	});
}
function vn(e, t) {
	let n = Oe(e, t);
	return n ? {
		command: n,
		argumentText: ke(e, n).trim()
	} : null;
}
var yn = "doc", bn = "panel", xn = "panel.";
function Sn(e) {
	return e instanceof URLSearchParams ? new URLSearchParams(e) : new URLSearchParams(e ?? "");
}
function Cn(e) {
	e.delete(yn), e.delete(bn);
	for (let t of [...e.keys()]) t.startsWith(xn) && e.delete(t);
}
function wn(e, t) {
	let n = Sn(t);
	if (Cn(n), !e) return n;
	if (e.kind === "document") n.set(yn, e.id);
	else {
		if (e.kind.includes(":")) throw Error(`A side panel kind cannot contain ':' (got "${e.kind}")`);
		n.set(bn, `${e.kind}:${e.id}`);
	}
	for (let [t, r] of Object.entries(e.params ?? {})) n.set(`${xn}${t}`, r);
	return n;
}
function Tn(e) {
	let t = Sn(e), n = {};
	for (let [e, r] of t.entries()) e.startsWith(xn) && (n[e.slice(6)] = r);
	let r = (e) => Object.keys(n).length ? {
		...e,
		params: n
	} : e, i = t.get(yn);
	if (i) return r({
		kind: "document",
		id: i
	});
	let a = t.get(bn);
	if (!a) return null;
	let o = a.indexOf(":");
	return o <= 0 || o === a.length - 1 ? null : r({
		kind: a.slice(0, o),
		id: a.slice(o + 1)
	});
}
//#endregion
//#region src/components/social/ChatCommandProvider.tsx
var En = Me(null);
function Dn(...e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) for (let e of n ?? []) t.set(e.trigger.toLowerCase(), e);
	return [...t.values()];
}
function On({ commands: e, children: t }) {
	let n = Pe(En), [r, i] = X([]), a = K((e) => (i((t) => [...t, e]), () => i((t) => t.filter((t) => t !== e))), []), o = J(() => ({
		commands: Dn(n?.commands, e, ...r),
		register: a
	}), [
		n?.commands,
		e,
		r,
		a
	]);
	return /* @__PURE__ */ Q(En.Provider, {
		value: o,
		children: t
	});
}
function kn() {
	return Pe(En)?.commands ?? An;
}
var An = [];
function jn(e) {
	let t = Pe(En);
	if (!t) throw Error("useRegisterChatCommands needs a <ChatCommandProvider> above it");
	let { register: n } = t;
	q(() => {
		if (!(!e || e.length === 0)) return n(e);
	}, [n, e]);
}
function Mn() {
	let e = kn();
	return K(async (t, n) => {
		let r = vn(t, e);
		if (!r) return null;
		let { command: i, argumentText: a } = r;
		if (!hn(i, n)) throw Error(`${i.trigger}: ${gn(i)}`);
		return i.run({
			...n,
			text: t,
			argumentText: a
		});
	}, [e]);
}
//#endregion
//#region src/components/social/ChatBubbleStack.tsx
function Nn({ bubble: e, onOpen: t, onDismiss: n, dismissAfterMs: r }) {
	return q(() => {
		let e = setTimeout(n, r);
		return () => clearTimeout(e);
	}, [e.id, r]), /* @__PURE__ */ $("div", {
		role: "status",
		className: "pointer-events-auto flex w-80 max-w-[calc(100vw-2rem)] items-start gap-2.5 rounded-xl border border-border bg-surface p-3 shadow-lg",
		"data-testid": "chat-bubble",
		"data-bubble-id": e.id,
		children: [/* @__PURE__ */ $("button", {
			"data-ui-part": "",
			type: "button",
			className: "flex min-w-0 flex-1 items-start gap-2.5 border-none bg-transparent p-0 text-left cursor-pointer",
			onClick: t,
			"aria-label": `Open the conversation: ${e.author} said ${e.text}`,
			children: [/* @__PURE__ */ Q(z, {
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
			"data-ui-part": "",
			type: "button",
			className: "shrink-0 border-none bg-transparent p-0.5 text-text-tertiary hover:text-text-primary cursor-pointer",
			"aria-label": "Dismiss",
			onClick: n,
			"data-testid": "chat-bubble-dismiss",
			children: "✕"
		})]
	});
}
function Pn({ bubbles: e, onOpen: t, onDismiss: n, dismissAfterMs: r = 8e3, max: i = 3, className: a, "data-testid": s = "chat-bubble-stack" }) {
	let c = e.slice(-i);
	return c.length === 0 ? null : /* @__PURE__ */ Q("div", {
		className: o("pointer-events-none fixed bottom-4 right-[calc(1rem+var(--uic-context-column-inset,0px))] z-[60] flex flex-col items-end gap-2", a),
		"data-testid": s,
		"aria-live": "polite",
		children: c.map((e) => /* @__PURE__ */ Q(Nn, {
			bubble: e,
			dismissAfterMs: r,
			onOpen: () => t(e.id),
			onDismiss: () => n(e.id)
		}, e.id))
	});
}
//#endregion
//#region src/components/social/ConversationStart.tsx
function Fn({ d: e }) {
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
var In = "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM12 8v6M9 11h6", Ln = "M4 4h16v12H8l-4 4zM9 9h6M9 12h4", Rn = "M22 2 11 13M22 2l-7 20-4-9-9-4z";
function zn({ items: e, onPick: t, disabled: n, searchAbove: r, kind: i, testId: a }) {
	let [o, s] = X(""), c = J(() => {
		let t = o.trim().toLowerCase();
		return t ? e.filter((e) => e.label.toLowerCase().includes(t)) : e;
	}, [e, o]);
	return /* @__PURE__ */ $(u, {
		gap: "none",
		children: [e.length > r && /* @__PURE__ */ Q("div", {
			className: "px-4 pb-1 pt-2",
			children: /* @__PURE__ */ Q(N, {
				value: o,
				onChange: s,
				placeholder: i === "room" ? "Find a room" : "Find a person",
				"data-testid": `${a}-search`
			})
		}), c.length === 0 ? /* @__PURE__ */ $(xe, {
			"data-testid": `${a}-none`,
			children: [
				"Nothing matches “",
				o.trim(),
				"”."
			]
		}) : c.map((e) => /* @__PURE__ */ Q(le, {
			label: e.label,
			icon: e.icon ?? (i === "person" ? /* @__PURE__ */ Q(z, {
				name: e.label,
				size: 20
			}) : void 0),
			onSelect: () => t(e.id),
			disabled: n,
			"data-testid": `${a}-option`
		}, e.id))]
	});
}
function Bn({ title: e = "No conversation yet", body: t = "Whichever you choose, the conversation shows up here.", onStart: n, startLabel: r = "Start a conversation", startDescription: i = "A new room, named after this page", rooms: a = [], onAddToRoom: o, people: c = [], onShareWith: l, busy: d = !1, receipt: f = null, searchAbove: p = 6, "data-testid": m = "conversation-start" }) {
	return /* @__PURE__ */ $(u, {
		gap: "none",
		className: "min-h-0 flex-1 overflow-y-auto",
		"data-testid": m,
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
			f && /* @__PURE__ */ Q("div", {
				className: "px-4 pb-3",
				children: /* @__PURE__ */ Q(O, {
					variant: f.tone,
					layout: "stacked",
					"data-testid": `${m}-receipt`,
					children: /* @__PURE__ */ $("span", {
						className: "flex flex-wrap items-center gap-x-2 gap-y-1",
						children: [/* @__PURE__ */ Q("span", { children: f.text }), f.actionLabel && f.onAction && /* @__PURE__ */ Q(s, {
							variant: "ghost",
							size: "sm",
							onClick: f.onAction,
							"data-testid": `${m}-receipt-action`,
							children: f.actionLabel
						})]
					})
				})
			}),
			/* @__PURE__ */ $(de, {
				"data-testid": `${m}-choices`,
				children: [
					n && /* @__PURE__ */ Q(ue, {
						icon: /* @__PURE__ */ Q(Fn, { d: In }),
						title: r,
						description: i,
						onSelect: n,
						busy: d,
						"data-testid": `${m}-start`
					}),
					o && /* @__PURE__ */ Q(ue, {
						icon: /* @__PURE__ */ Q(Fn, { d: Ln }),
						title: "Add to a room",
						description: a.length === 0 ? "No rooms yet" : `${a.length} room${a.length === 1 ? "" : "s"} your team is in`,
						disabled: a.length === 0,
						disabledReason: "There are no rooms to add it to yet",
						busy: d,
						"data-testid": `${m}-rooms`,
						children: /* @__PURE__ */ Q(zn, {
							items: a,
							onPick: o,
							disabled: d,
							searchAbove: p,
							kind: "room",
							testId: `${m}-rooms`
						})
					}),
					l && /* @__PURE__ */ Q(ue, {
						icon: /* @__PURE__ */ Q(Fn, { d: Rn }),
						title: "Send to someone",
						description: c.length === 0 ? "Nobody to send to yet" : "It lands in their chat",
						disabled: c.length === 0,
						disabledReason: "There is nobody to send it to yet",
						busy: d,
						"data-testid": `${m}-people`,
						children: /* @__PURE__ */ Q(zn, {
							items: c,
							onPick: l,
							disabled: d,
							searchAbove: p,
							kind: "person",
							testId: `${m}-people`
						})
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/social/AddToChatDialog.tsx
var Vn = 7, Hn = 1, Un = 3650, Wn = [
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
], Gn = {
	none: "They see what is said from now on.",
	days: "A recent stretch of the conversation.",
	all: "Everything ever said here."
};
function Kn({ open: e, conversationName: t, people: n, preselectedIds: r = [], busy: i = !1, anchor: a, placement: s = "bottom-end", onAdd: l, onClose: u, "data-testid": d = "add-to-chat-dialog", historyChoice: f = !0 }) {
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
				await l(h, f ? _ === "days" ? {
					mode: _,
					days: y
				} : { mode: _ } : { mode: "all" }), u();
			} catch (e) {
				T(e instanceof Error ? e.message : String(e)), C(!1);
			}
		}
	};
	return /* @__PURE__ */ $(be, {
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
		onClose: u,
		"data-testid": d,
		children: [
			/* @__PURE__ */ Q(N, {
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
							/* @__PURE__ */ Q(z, {
								name: t?.name ?? e,
								src: t?.avatarUrl,
								size: 16
							}),
							/* @__PURE__ */ Q("span", {
								className: "max-w-[9rem] truncate",
								children: t?.name ?? e
							}),
							/* @__PURE__ */ Q("button", {
								"data-ui-part": "",
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
				"data-ui-listbox": "add-to-chat",
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
							"data-ui-part": "",
							type: "button",
							onClick: () => O(e.id),
							disabled: A,
							className: o("flex w-full items-center gap-2 border-none bg-transparent px-2.5 py-1.5 text-left font-[inherit] text-[13px] hover:bg-surface-hover", t && "bg-surface-inset"),
							"data-testid": `${d}-person-${e.id}`,
							children: [
								/* @__PURE__ */ Q(z, {
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
			f && /* @__PURE__ */ Q(G, {
				label: "Chat history",
				hint: _ === "days" ? void 0 : Gn[_],
				"data-testid": `${d}-history-field`,
				children: /* @__PURE__ */ Q(c, {
					density: "compact",
					children: /* @__PURE__ */ Q(L, {
						fullWidth: !0,
						disabled: A,
						"aria-label": "How much chat history they get",
						options: Wn,
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
						"data-ui-part": "",
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
function qn(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `Added ${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})}`;
}
function Jn({ members: e, open: t = !1, canManage: n = !1, currentUserId: r, onAdd: i, onRemove: a, className: u, "data-testid": d = "members-panel" }) {
	let f = [...e].sort((e, t) => e.role === t.role ? e.name.localeCompare(t.name) : e.role === "owner" ? -1 : 1);
	return /* @__PURE__ */ $("div", {
		className: o("flex min-h-0 flex-col", u),
		"data-testid": d,
		"data-open": String(t),
		children: [/* @__PURE__ */ $("div", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-2",
			children: [/* @__PURE__ */ Q("span", {
				className: "text-xs text-text-tertiary",
				"data-testid": `${d}-count`,
				children: t ? "Open channel" : `${e.length} ${e.length === 1 ? "member" : "members"}`
			}), i && /* @__PURE__ */ Q(s, {
				variant: "secondary",
				size: "sm",
				onClick: (e) => i(e.currentTarget),
				"data-testid": `${d}-add`,
				children: /* @__PURE__ */ $("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ Q(x, { size: 12 }), " Add people"]
				})
			})]
		}), t && e.length === 0 ? /* @__PURE__ */ Q(c, {
			density: "compact",
			children: /* @__PURE__ */ Q(F, {
				title: "Everyone can read this channel.",
				body: "Add people to make it members-only.",
				...i ? {
					actionLabel: "Add people",
					onAction: () => i()
				} : {},
				testId: `${d}-empty`
			})
		}) : /* @__PURE__ */ Q("ul", {
			className: "m-0 min-h-0 flex-1 list-none overflow-y-auto p-0",
			"data-testid": `${d}-list`,
			children: f.map((e) => {
				let t = e.id === r, i = !!a && (n || t);
				return /* @__PURE__ */ $("li", {
					className: "flex items-center gap-2 px-3 py-2",
					"data-testid": `${d}-member-${e.id}`,
					children: [
						/* @__PURE__ */ Q(z, {
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
								children: qn(e.addedAt)
							})]
						}),
						e.role === "owner" && /* @__PURE__ */ Q(l, {
							tone: "neutral",
							size: "xs",
							"data-testid": `${d}-owner-${e.id}`,
							children: "Owner"
						}),
						i && /* @__PURE__ */ Q(p, {
							"aria-label": t ? "Leave" : `Remove ${e.name}`,
							title: t ? "Leave" : "Remove",
							variant: "ghost",
							size: "sm",
							onClick: () => a?.(e.id),
							icon: /* @__PURE__ */ Q(b, { size: 12 }),
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
var Yn = 40, Xn = {
	online: "online",
	busy: "busy",
	away: "away",
	offline: "offline"
}, Zn = "flex w-full min-w-0 flex-col items-center gap-1 rounded-lg p-1 text-center", Qn = "cursor-pointer border-0 bg-transparent hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1";
function $n(e) {
	let t = e.trim();
	return t ? t.split(/\s+/)[0] : e;
}
function er(e) {
	let t = e.status ?? "online", n = [e.displayName, Xn[t]];
	return e.activity && n.push(e.activity), e.inCall && n.push("in a call"), n.join(", ");
}
function tr({ person: e, testId: t }) {
	let n = e.status ?? "online";
	return /* @__PURE__ */ $("span", {
		className: "relative inline-flex shrink-0",
		children: [
			/* @__PURE__ */ Q(z, {
				name: e.displayName,
				src: e.avatarUrl,
				size: Yn,
				className: o(e.inCall && "ring-2 ring-primary ring-offset-2 ring-offset-[var(--color-surface)]")
			}),
			/* @__PURE__ */ Q(ce, {
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
function nr({ people: e, maxVisible: t = 8, onSelectPerson: n, onShowAll: r, onSelectSharedWork: i, emptyLabel: a = "Nobody is around right now.", columns: s = 4, className: c, "data-testid": l = "active-people-grid" }) {
	if (e.length === 0) return /* @__PURE__ */ Q("p", {
		"data-testid": `${l}-empty`,
		className: o("text-[12px] text-text-tertiary", c),
		children: a
	});
	let u = e.slice(0, t), d = e.length - u.length;
	return /* @__PURE__ */ $("div", {
		"data-testid": l,
		role: "list",
		"aria-label": "Active now",
		"data-columns": s,
		className: o("grid gap-x-1 gap-y-2", s === "fit" ? "grid-cols-[repeat(auto-fill,4.5rem)]" : "grid-cols-4", c),
		children: [u.map((e) => {
			let t = `${l}-person-${e.userId}`, r = er(e), a = /* @__PURE__ */ $("span", {
				className: "flex w-full min-w-0 items-center justify-center gap-1",
				children: [e.inCall && /* @__PURE__ */ Q("span", {
					"aria-hidden": "true",
					"data-testid": `${t}-live`,
					className: "h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
				}), /* @__PURE__ */ Q("span", {
					"data-ui-text": "active-person-caption",
					className: "min-w-0 truncate text-[12px] font-medium text-text-primary",
					children: $n(e.displayName)
				})]
			});
			if (e.workSharing && i) {
				let s = n ? /* @__PURE__ */ $("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => n(e.userId),
					title: r,
					"aria-label": r,
					"data-testid": t,
					className: o(Zn, Qn),
					children: [/* @__PURE__ */ Q(tr, {
						person: e,
						testId: t
					}), a]
				}) : /* @__PURE__ */ $("div", {
					title: r,
					"aria-label": r,
					"data-testid": t,
					className: Zn,
					children: [/* @__PURE__ */ Q(tr, {
						person: e,
						testId: t
					}), a]
				});
				return /* @__PURE__ */ $("div", {
					role: "listitem",
					className: "relative min-w-0",
					children: [s, /* @__PURE__ */ Q("button", {
						"data-ui-part": "",
						type: "button",
						onClick: () => i(e.userId),
						"aria-label": `View ${e.displayName}'s ${e.workSharing.state === "historical" ? "shared work history" : "shared work"}`,
						className: "mt-1 w-full truncate rounded px-1 text-xs font-medium text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
						children: e.workSharing.state === "historical" ? "History" : "Active now"
					})]
				}, e.userId);
			}
			return n ? /* @__PURE__ */ $("button", {
				"data-ui-part": "",
				type: "button",
				role: "listitem",
				onClick: () => n(e.userId),
				title: r,
				"aria-label": r,
				"data-testid": t,
				className: o(Zn, Qn),
				children: [/* @__PURE__ */ Q(tr, {
					person: e,
					testId: t
				}), a]
			}, e.userId) : /* @__PURE__ */ $("div", {
				role: "listitem",
				title: r,
				"aria-label": r,
				"data-testid": t,
				className: Zn,
				children: [/* @__PURE__ */ Q(tr, {
					person: e,
					testId: t
				}), a]
			}, e.userId);
		}), d > 0 && (r ? /* @__PURE__ */ $("button", {
			"data-ui-part": "",
			type: "button",
			onClick: r,
			"aria-label": `${d} more people`,
			"data-testid": `${l}-more`,
			className: o(Zn, Qn),
			children: [/* @__PURE__ */ $("span", {
				className: "flex h-10 w-10 items-center justify-center rounded-full bg-surface-emphasis text-[12px] font-semibold text-text-secondary",
				children: ["+", d]
			}), /* @__PURE__ */ Q("span", {
				"data-ui-text": "active-person-caption",
				className: "w-full min-w-0 truncate text-[12px] font-medium text-text-tertiary",
				children: "More"
			})]
		}) : /* @__PURE__ */ $("div", {
			"data-testid": `${l}-more`,
			className: Zn,
			children: [/* @__PURE__ */ $("span", {
				className: "flex h-10 w-10 items-center justify-center rounded-full bg-surface-emphasis text-[12px] font-semibold text-text-secondary",
				children: ["+", d]
			}), /* @__PURE__ */ Q("span", {
				"data-ui-text": "active-person-caption",
				className: "w-full min-w-0 truncate text-[12px] font-medium text-text-tertiary",
				children: "More"
			})]
		}))]
	});
}
//#endregion
//#region src/components/social/TeamChannelTree.tsx
function rr(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e;
}
function ir(e) {
	return [...e].sort((e, t) => Number(!!t.pinned) - Number(!!e.pinned));
}
function ar({ teams: e, activeChannel: t = null, onSelectChannel: n, onToggleTeam: r, onCreateChannel: i, onManageTeam: a, onLeaveTeam: s, onTogglePinTeam: c, onTogglePinChannel: l, onCreateTeam: u, heading: d = "Teams", filter: f, collapsed: p = !1, onToggleCollapse: m, className: h, "data-testid": g = "team-channel-tree" }) {
	let v = d !== !1 && m !== void 0, y = v && p, b = Fe(), S = `${b}teams-toggle`, w = `${b}teams`, T = r !== void 0, [D, O] = X(() => new Set(e.filter((e) => e.expanded).map((e) => e.teamId))), k = Y(null), [A, j] = X(null), M = (e) => I ? !0 : T ? !!e.expanded : D.has(e.teamId), N = (e, t) => {
		r?.(e, t), !T && O((n) => {
			if (n.has(e) === t) return n;
			let r = new Set(n);
			return t ? r.add(e) : r.delete(e), r;
		});
	}, P = (t) => {
		let n = e.find((e) => e.teamId === t);
		n && N(t, !M(n));
	}, F = f?.trim().toLowerCase() ?? "", I = F.length > 0, L = ir(I ? e.reduce((e, t) => {
		let n = t.name.toLowerCase().includes(F), r = n ? t.channels : t.channels.filter((e) => e.name.toLowerCase().includes(F));
		return (n || r.length > 0) && e.push({
			...t,
			channels: r
		}), e;
	}, []) : e), R = [];
	for (let e of y ? [] : L) if (R.push({
		id: `team:${e.teamId}`,
		kind: "team",
		teamId: e.teamId
	}), M(e)) for (let t of ir(e.channels)) R.push({
		id: `channel:${t.channel}`,
		kind: "channel",
		teamId: e.teamId,
		channel: t.channel
	});
	let te = A && R.some((e) => e.id === A) ? A : t && R.some((e) => e.kind === "channel" && e.channel === t) ? `channel:${t}` : R[0]?.id ?? null, B = (e) => {
		e && (j(e), k.current?.querySelector(`[data-row-id="${rr(e)}"]`)?.focus());
	}, V = (t) => {
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
		className: o("flex flex-col", h),
		children: [d !== !1 && /* @__PURE__ */ Q(De, {
			label: d,
			presentational: !1,
			className: "pt-2",
			...v ? {
				collapsed: p,
				onToggleCollapse: m,
				controls: w,
				toggleId: S,
				collapsedCount: e.reduce((e, t) => e + t.channels.reduce((e, t) => e + (t.unreadCount ?? 0), 0), 0)
			} : {},
			actions: u ? [{
				label: "Create a team",
				onClick: (e) => u(e),
				"data-testid": `${g}-create-team`
			}] : [],
			"data-testid": `${g}-heading`
		}), /* @__PURE__ */ Q("div", {
			ref: k,
			role: "tree",
			id: v ? w : void 0,
			"aria-label": d === !1 ? "Teams" : void 0,
			"aria-labelledby": v ? S : void 0,
			className: "flex flex-col gap-0.5",
			"data-testid": g,
			onKeyDown: V,
			children: !y && L.map((e) => {
				let r = M(e), u = `team:${e.teamId}`, d = te === u, f = [];
				return a && f.push({
					label: "Manage team",
					onSelect: () => a(e.teamId),
					"data-testid": `${g}-team-${e.teamId}-menu-manage`
				}), c && f.push({
					label: e.pinned ? "Unpin" : "Pin",
					icon: /* @__PURE__ */ Q(E, { size: 14 }),
					onSelect: () => c(e.teamId, !e.pinned),
					"data-testid": `${g}-team-${e.teamId}-menu-pin`
				}), s && f.push({
					label: "Leave team",
					onSelect: () => s(e.teamId),
					"data-testid": `${g}-team-${e.teamId}-menu-leave`
				}), /* @__PURE__ */ $("div", { children: [/* @__PURE__ */ $("div", {
					role: "treeitem",
					"aria-expanded": r,
					"aria-level": 1,
					tabIndex: d ? 0 : -1,
					"data-row-id": u,
					"data-testid": `${g}-team-${e.teamId}`,
					onClick: () => P(e.teamId),
					onFocus: () => j(u),
					className: o("group flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left", "hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"),
					children: [
						/* @__PURE__ */ Q(C, {
							dir: r ? "down" : "right",
							size: 14,
							className: "shrink-0 text-text-tertiary transition-transform"
						}),
						/* @__PURE__ */ Q(z, {
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
								"data-testid": `${g}-team-${e.teamId}-pinned`,
								title: "Pinned",
								className: "shrink-0 text-text-tertiary",
								children: /* @__PURE__ */ Q(E, { size: 12 })
							})]
						}),
						i && /* @__PURE__ */ Q("button", {
							"data-ui-part": "",
							type: "button",
							title: `Create a channel in ${e.name}`,
							"aria-label": `Create a channel in ${e.name}`,
							tabIndex: d ? 0 : -1,
							onClick: (t) => {
								t.stopPropagation(), i(e.teamId, t.currentTarget);
							},
							"data-testid": `${g}-team-${e.teamId}-add-channel`,
							className: o("grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-md border-none bg-transparent p-0", "text-text-secondary hover:bg-surface-hover hover:text-text-primary", "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", "[@media(hover:none)]:opacity-100", "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: /* @__PURE__ */ Q(x, { size: 14 })
						}),
						f.length > 0 && /* @__PURE__ */ Q("span", {
							onClick: (e) => e.stopPropagation(),
							className: o("shrink-0 opacity-0 transition-opacity", "group-hover:opacity-100 group-focus-within:opacity-100", "has-[[aria-expanded=true]]:opacity-100", "[@media(hover:none)]:opacity-100"),
							children: /* @__PURE__ */ Q(ee, {
								trigger: /* @__PURE__ */ Q("span", {
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
								sections: [{ items: f }],
								"data-testid": `${g}-team-${e.teamId}-menu-panel`
							})
						})
					]
				}), r && ir(e.channels).map((e) => {
					let r = `channel:${e.channel}`, i = te === r, a = e.channel === t, s = e.unreadCount ?? 0, c = !!e.muted;
					return /* @__PURE__ */ $("div", {
						role: "treeitem",
						"aria-level": 2,
						"aria-selected": a,
						tabIndex: i ? 0 : -1,
						"data-row-id": r,
						"data-testid": `${g}-channel-${e.channel}`,
						"data-active": a ? "true" : "false",
						onClick: () => n(e.channel),
						onFocus: () => j(r),
						className: o("group flex w-full cursor-pointer items-center gap-2 rounded-md py-1.5 pl-8 pr-2 text-left text-[13px]", "hover:bg-surface-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset", a && "bg-surface-hover"),
						children: [
							/* @__PURE__ */ Q("span", {
								"aria-hidden": !e.private,
								className: "flex h-4 w-4 shrink-0 items-center justify-center text-text-tertiary",
								children: e.private ? /* @__PURE__ */ Q(_, { size: 12 }) : "#"
							}),
							/* @__PURE__ */ $("span", {
								className: "flex min-w-0 flex-1 items-center gap-1.5",
								children: [/* @__PURE__ */ Q("span", {
									className: o("min-w-0 truncate", s > 0 ? "font-semibold" : "font-medium", "text-text-primary"),
									children: e.name
								}), e.pinned && /* @__PURE__ */ Q("span", {
									"data-testid": `${g}-channel-${e.channel}-pinned`,
									title: "Pinned",
									className: "shrink-0 text-text-tertiary",
									children: /* @__PURE__ */ Q(E, { size: 12 })
								})]
							}),
							e.mentioned && /* @__PURE__ */ Q("span", {
								"data-testid": `${g}-channel-${e.channel}-mention`,
								"aria-label": "You were mentioned",
								title: "You were mentioned",
								className: "grid h-4 w-4 shrink-0 place-items-center rounded-full bg-danger text-[10px] font-bold leading-none text-white",
								children: "@"
							}),
							e.live && /* @__PURE__ */ Q("span", {
								"data-testid": `${g}-channel-${e.channel}-live`,
								"aria-label": "Call in progress",
								title: "Call in progress",
								className: "inline-flex shrink-0 items-center gap-1 rounded-full bg-danger px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none tracking-wide text-white",
								children: "Live"
							}),
							s > 0 && /* @__PURE__ */ Q("span", {
								"data-testid": `${g}-channel-${e.channel}-unread`,
								"data-muted": c ? "true" : "false",
								className: o("grid h-5 min-w-5 shrink-0 place-items-center rounded-full px-1.5 text-[11px] font-semibold leading-none", c ? "bg-surface-inset text-text-secondary" : "bg-primary text-on-primary"),
								children: s > 99 ? "99+" : s
							}),
							l && /* @__PURE__ */ Q("button", {
								"data-ui-part": "",
								type: "button",
								title: e.pinned ? "Unpin" : "Pin",
								"aria-label": `${e.pinned ? "Unpin" : "Pin"} ${e.name}`,
								tabIndex: i ? 0 : -1,
								onClick: (t) => {
									t.stopPropagation(), l(e.channel, !e.pinned);
								},
								"data-testid": `${g}-channel-${e.channel}-pin-toggle`,
								className: o("grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-md border-none bg-transparent p-0", "text-text-secondary hover:bg-surface-hover hover:text-text-primary", "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", "[@media(hover:none)]:opacity-100", "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
								children: /* @__PURE__ */ Q(E, { size: 12 })
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
var or = 80, sr = [{
	label: "Standard",
	value: "standard"
}, {
	label: "Private",
	value: "private",
	icon: /* @__PURE__ */ Q(_, { size: 12 })
}];
function cr({ open: e, teamName: t, busy: n = !1, anchor: r, placement: i = "right", onCreate: a, onClose: o, "data-testid": s = "create-channel-dialog" }) {
	let [l, u] = X(""), [d, f] = X(""), [p, m] = X("standard"), [h, g] = X(!1), [_, v] = X(null);
	q(() => {
		e && (u(""), f(""), m("standard"), g(!1), v(null));
	}, [e]);
	let y = l.trim(), b = n || h, x = y.length > 0 && y.length <= or && !b, S = async () => {
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
	return /* @__PURE__ */ $(be, {
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
			/* @__PURE__ */ Q(G, {
				label: "Name",
				"data-testid": `${s}-name-field`,
				children: /* @__PURE__ */ Q(A, {
					size: "sm",
					value: l,
					maxLength: or,
					disabled: b,
					placeholder: "e.g. design-reviews",
					onChange: (e) => u(e.target.value),
					"data-testid": `${s}-name`
				})
			}),
			/* @__PURE__ */ Q(G, {
				label: "Description",
				"data-testid": `${s}-description-field`,
				children: /* @__PURE__ */ Q(H, {
					value: d,
					rows: 2,
					disabled: b,
					placeholder: "What is this channel for?",
					onChange: (e) => f(e.target.value),
					"data-testid": `${s}-description`
				})
			}),
			/* @__PURE__ */ Q(G, {
				label: "Privacy",
				hint: p === "private" ? "Only people you add can see it." : "Everyone on the team can see it.",
				"data-testid": `${s}-privacy-field`,
				children: /* @__PURE__ */ Q(c, {
					density: "compact",
					children: /* @__PURE__ */ Q(L, {
						fullWidth: !0,
						disabled: b,
						"aria-label": "Channel privacy",
						options: sr,
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
function lr({ open: e, candidates: t, anchor: n, placement: r = "bottom-start", busy: i = !1, error: a = null, onStart: o, onClose: s, "data-testid": c = "new-chat" }) {
	return e ? /* @__PURE__ */ Q(ye, {
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
		children: ({ list: t, confirm: o }) => /* @__PURE__ */ Q(be, {
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
var ur = 80, dr = [{
	label: "Org-wide",
	value: "org"
}, {
	label: "Private",
	value: "private",
	icon: /* @__PURE__ */ Q(_, { size: 12 })
}];
function fr({ open: e, busy: t = !1, anchor: n, placement: r = "bottom-end", onCreate: i, onClose: a, "data-testid": o = "create-team-dialog" }) {
	let [s, l] = X(""), [u, d] = X(""), [f, p] = X("org"), [m, h] = X(!1), [g, _] = X(null);
	q(() => {
		e && (l(""), d(""), p("org"), h(!1), _(null));
	}, [e]);
	let v = s.trim(), y = t || m, b = v.length > 0 && v.length <= ur && !y, x = async () => {
		if (b) {
			h(!0), _(null);
			try {
				await i({
					name: v,
					description: u.trim() || void 0,
					visibility: f
				}), a();
			} catch (e) {
				_(e instanceof Error ? e.message : String(e)), h(!1);
			}
		}
	};
	return /* @__PURE__ */ $(be, {
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
			/* @__PURE__ */ Q(G, {
				label: "Name",
				"data-testid": `${o}-name-field`,
				children: /* @__PURE__ */ Q(A, {
					size: "sm",
					value: s,
					maxLength: ur,
					disabled: y,
					placeholder: "e.g. Design",
					onChange: (e) => l(e.target.value),
					"data-testid": `${o}-name`
				})
			}),
			/* @__PURE__ */ Q(G, {
				label: "Description",
				"data-testid": `${o}-description-field`,
				children: /* @__PURE__ */ Q(H, {
					value: u,
					rows: 2,
					disabled: y,
					placeholder: "What does this team work on?",
					onChange: (e) => d(e.target.value),
					"data-testid": `${o}-description`
				})
			}),
			/* @__PURE__ */ Q(G, {
				label: "Who can join",
				hint: f === "private" ? "People need an invitation." : "Anyone in the org can join.",
				"data-testid": `${o}-visibility-field`,
				children: /* @__PURE__ */ Q(c, {
					density: "compact",
					children: /* @__PURE__ */ Q(L, {
						fullWidth: !0,
						disabled: y,
						"aria-label": "Team visibility",
						options: dr,
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
function pr({ search: e, scope: t = "documents", label: n = "Add a document to the prompt", placeholder: r = "Search documents", debounceMs: i = 200, "data-testid": a = "prompt-context-picker" }) {
	let s = f(t), [c, l] = X(!1), [u, d] = X(""), [p, m] = X([]), [g, _] = X("idle"), [v, y] = X(null), b = Y(null), S = Y(e);
	S.current = e, q(() => {
		if (!c) return;
		let e = !0;
		_("loading");
		let t = setTimeout(() => {
			Promise.resolve().then(() => S.current(u.trim())).then((t) => {
				e && (m(t.slice(0, 20)), _("idle"), y(null));
			}).catch((t) => {
				e && (_("error"), y(t instanceof Error && t.message ? t.message : "Search failed"));
			});
		}, u ? i : 0);
		return () => {
			e = !1, clearTimeout(t);
		};
	}, [
		c,
		u,
		i
	]);
	let C = s.items.length >= 10;
	return /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q("button", {
		"data-ui-part": "",
		ref: b,
		type: "button",
		"aria-label": n,
		title: n,
		"aria-haspopup": "dialog",
		"aria-expanded": c,
		onClick: () => l((e) => !e),
		"data-testid": a,
		className: o("inline-flex h-8 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-text-secondary", "hover:bg-surface-hover hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary", c && "bg-surface-hover text-text-primary"),
		children: /* @__PURE__ */ Q(x, {
			size: 16,
			"aria-hidden": "true"
		})
	}), /* @__PURE__ */ $(M, {
		trigger: b,
		open: c,
		onClose: () => l(!1),
		placement: "bottom-start",
		"aria-label": n,
		className: "w-80 rounded-lg p-2",
		"data-testid": `${a}-popover`,
		children: [/* @__PURE__ */ Q(N, {
			value: u,
			onChange: d,
			placeholder: r,
			"aria-label": r,
			autoFocus: !0,
			size: "sm"
		}), /* @__PURE__ */ $("ul", {
			className: "mt-2 max-h-72 overflow-y-auto",
			"data-testid": `${a}-results`,
			children: [
				g === "loading" && p.length === 0 && /* @__PURE__ */ Q("li", {
					className: "px-2 py-2 text-sm text-text-tertiary",
					children: "Searching…"
				}),
				g === "error" && /* @__PURE__ */ Q("li", {
					role: "alert",
					className: "px-2 py-2 text-sm text-danger-fg",
					children: v
				}),
				g === "idle" && p.length === 0 && /* @__PURE__ */ Q("li", {
					className: "px-2 py-2 text-sm text-text-tertiary",
					children: u.trim() ? "No documents match" : "No documents yet"
				}),
				p.map((e) => {
					let t = s.has(e.id), n = !t && C;
					return /* @__PURE__ */ Q("li", { children: /* @__PURE__ */ $("button", {
						"data-ui-part": "",
						type: "button",
						"aria-pressed": t,
						disabled: n,
						title: n ? "A prompt takes at most 10 documents" : void 0,
						onClick: () => s.toggle(e),
						"data-testid": `${a}-result`,
						"data-document-id": e.id,
						className: o("flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-text-primary", "hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"),
						children: [
							/* @__PURE__ */ Q(h, {
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
function mr({ label: e, channel: t, latest: n, notice: r, openLabel: i = "Open in Social", onOpen: a, openDisabled: c, choices: u = [], onBind: d, onUnbind: f, busy: p = !1, error: m, unboundLabel: h = "No channel bound", className: g, "data-testid": _ = "channel-binding" }) {
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
				/* @__PURE__ */ $(l, {
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
				r && /* @__PURE__ */ Q(Se, {
					size: "xs",
					tone: "tertiary",
					items: [r]
				}),
				a && /* @__PURE__ */ Q(s, {
					size: "sm",
					variant: "ghost",
					className: "h-7 border-0 text-[12px] font-medium",
					"data-testid": `${_}-open`,
					onClick: a,
					disabled: c,
					children: i
				}),
				f && /* @__PURE__ */ Q(s, {
					size: "sm",
					variant: "ghost",
					className: "h-7 border-0 text-[12px] font-medium",
					"data-testid": `${_}-unbind`,
					disabled: p,
					onClick: () => {
						f();
					},
					children: "Unbind"
				})
			] }) : /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q(Se, {
				size: "xs",
				tone: "tertiary",
				items: [h]
			}), d && /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q(j, {
				"aria-label": "Channel to bind",
				size: "sm",
				className: "w-48",
				value: v,
				placeholder: "Choose a channel",
				onChange: (e) => y(e.target.value),
				options: u.map((e) => ({
					value: e.value,
					label: e.label
				})),
				"data-testid": `${_}-choice`
			}), /* @__PURE__ */ Q(s, {
				size: "sm",
				variant: "secondary",
				className: "h-7 text-[12px] font-medium",
				"data-testid": `${_}-bind`,
				disabled: !v || p,
				onClick: () => {
					Promise.resolve(d(v)).then(() => y(""));
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
var hr = (e) => new Date(e).toLocaleString(void 0, {
	month: "short",
	day: "numeric",
	hour: "numeric",
	minute: "2-digit"
});
function gr({ rows: e, onCallBack: t, callBackLabel: n = () => "Call back", callBackDisabled: r, formatWhen: i = hr, defaultFilter: a = "all", className: o, "data-testid": c = "call-log" }) {
	let [u, d] = X(a), f = J(() => e.filter((e) => e.missed).length, [e]), p = u === "missed" ? e.filter((e) => e.missed) : e;
	return /* @__PURE__ */ $("div", {
		className: ["flex flex-col gap-2", o].filter(Boolean).join(" "),
		"data-testid": c,
		children: [/* @__PURE__ */ Q(L, {
			"aria-label": "Which calls",
			value: u,
			onChange: (e) => d(e),
			options: [{
				value: "all",
				label: "All"
			}, {
				value: "missed",
				label: `Missed${f ? ` (${f})` : ""}`
			}],
			"data-testid": `${c}-filter`
		}), /* @__PURE__ */ Q(P, {
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
					render: (e) => /* @__PURE__ */ Q(l, {
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
			emptyMessage: u === "missed" ? "No missed calls." : "No calls yet.",
			...t ? { rowActions: (e) => /* @__PURE__ */ Q(s, {
				variant: "ghost",
				size: "sm",
				disabled: r,
				onClick: () => t(e),
				"data-testid": `${c}-call-back`,
				children: n(e)
			}) } : {},
			"data-testid": `${c}-table`
		})]
	});
}
//#endregion
//#region src/components/social/AddPeoplePicker.tsx
function _r({ open: e, onClose: t, candidates: n, onAdd: r, title: i = "Add people", searchPlaceholder: a = "Find a person", emptyMessage: c = "No one left to add.", confirmLabel: u = "Add", busy: d = !1, error: f = null, "data-testid": p = "add-people" }) {
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
	return /* @__PURE__ */ Q(k, {
		open: e,
		onClose: t,
		title: i,
		maxWidth: 560,
		footer: /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q(s, {
			variant: "secondary",
			size: "sm",
			onClick: t,
			children: "Cancel"
		}), /* @__PURE__ */ Q(s, {
			size: "sm",
			disabled: g.length === 0 || d,
			onClick: () => {
				r(g);
			},
			"data-testid": `${p}-confirm`,
			children: g.length ? `${u} ${g.length}` : u
		})] }),
		children: /* @__PURE__ */ $("div", {
			className: "flex flex-col gap-3",
			"data-testid": p,
			children: [
				/* @__PURE__ */ Q(N, {
					value: m,
					onChange: h,
					placeholder: a,
					"data-testid": `${p}-search`
				}),
				g.length > 0 && /* @__PURE__ */ Q("div", {
					className: "flex flex-wrap gap-1",
					"data-testid": `${p}-selected`,
					children: g.map((e) => /* @__PURE__ */ Q(l, {
						size: "sm",
						tone: "accent",
						onRemove: () => x(e),
						children: b(e)
					}, e))
				}),
				y.length === 0 ? /* @__PURE__ */ Q("p", {
					className: "m-0 py-4 text-center text-[13px] text-text-tertiary",
					children: n.length === 0 ? c : "No one matches."
				}) : /* @__PURE__ */ Q("ul", {
					className: "m-0 flex max-h-72 list-none flex-col gap-0.5 overflow-y-auto p-0",
					"aria-label": "People",
					"data-testid": `${p}-list`,
					children: y.map((e) => {
						let t = g.includes(e.userId);
						return /* @__PURE__ */ Q("li", { children: /* @__PURE__ */ $("button", {
							"data-ui-part": "",
							type: "button",
							"aria-pressed": t,
							onClick: () => x(e.userId),
							"data-testid": `${p}-person`,
							className: o("flex w-full items-center gap-2 rounded-md border-0 px-2 py-1.5 text-left", t ? "bg-primary-bg" : "bg-transparent hover:bg-surface-hover"),
							children: [
								/* @__PURE__ */ Q(z, {
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
				f && /* @__PURE__ */ Q("p", {
					className: "m-0 text-[12px] text-danger",
					role: "alert",
					children: f
				})
			]
		})
	});
}
//#endregion
//#region src/components/social/DialogueSegment.tsx
function vr({ author: e, avatarUrl: t, text: n, metadata: r, status: i, actions: a = [], reserveActions: s = !1, className: c, onDragStart: l }) {
	let u = a.length > 0, d = u ? s ? "reserve" : "overlay" : "none";
	return /* @__PURE__ */ $("div", {
		"data-dialogue-segment": !0,
		"data-dialogue-actions": d,
		draggable: !!l,
		onDragStart: l,
		className: o("group relative flex min-w-0 items-center gap-2 border-b border-border-subtle px-2 py-1 hover:bg-surface-hover focus-within:bg-surface-hover", c),
		children: [
			/* @__PURE__ */ Q(z, {
				name: e,
				src: t,
				size: 32,
				tone: "neutral"
			}),
			/* @__PURE__ */ $("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ $("div", {
					className: o("flex h-5 min-w-0 items-center gap-2 text-xs text-text-secondary", d === "reserve" && "pr-24"),
					"data-dialogue-meta": "",
					children: [
						/* @__PURE__ */ Q("strong", {
							className: "shrink-0 font-semibold text-text-primary",
							children: e
						}),
						/* @__PURE__ */ Q("span", {
							className: "truncate",
							children: r
						}),
						i && /* @__PURE__ */ Q("span", {
							className: "shrink-0",
							children: i
						})
					]
				}), /* @__PURE__ */ Q("span", {
					className: "block truncate text-sm leading-5 text-text-primary",
					title: n,
					children: n
				})]
			}),
			u && /* @__PURE__ */ Q(oe, {
				label: `Actions for ${e}`,
				actions: a,
				className: "absolute right-2 top-0.5 rounded bg-surface-hover opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100"
			})
		]
	});
}
//#endregion
export { st as $, dn as A, Rt as B, mn as C, vn as D, hn as E, nn as F, Nt as G, Lt as H, tn as I, jt as J, Mt as K, $t as L, fn as M, an as N, Tn as O, rn as P, ft as Q, Qt as R, Mn as S, _n as T, Ft as U, Wt as V, Pt as W, kt as X, At as Y, bt as Z, Pn as _, pr as a, Ue as at, kn as b, cr as c, Jn as d, tt as et, Kn as f, Bn as g, Hn as h, mr as i, We as it, un as j, wn as k, ar as l, Un as m, _r as n, $e as nt, fr as o, He as ot, Vn as p, It as q, gr as r, Ke as rt, lr as s, vr as t, et as tt, nr as u, On as v, gn as w, jn as x, Dn as y, zt as z };
