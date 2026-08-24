import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./useEventCallback-Cwx9QVSi.js";
import { t as n } from "./Button-CTpms90-.js";
import { t as r } from "./Card-CcJetqWt.js";
import { a as i, c as a, i as o, l as s, n as c, o as l, r as u, s as d, t as f } from "./FormField-6WM9sVys.js";
import { t as p } from "./Banner-BLOg1hC_.js";
import { t as m } from "./Chip-2lIuHwy5.js";
import { t as h } from "./Modal-DbKyLw86.js";
import { t as g } from "./ConfirmDialog-DTHQQziN.js";
import { t as _ } from "./EmptyState-CUHf5NYN.js";
import { t as v } from "./Input-DcK2h-jK.js";
import { t as y } from "./Textarea-C3t5PCLv.js";
import { t as b } from "./rovingFocus-Bj5Y6kwY.js";
import { t as x } from "./Select-Z0TLUVeL.js";
import { t as S } from "./Checkbox-CsbxMNgR.js";
import { useCallback as C, useEffect as w, useMemo as T, useRef as E, useState as D } from "react";
import { Fragment as O, jsx as k, jsxs as A } from "react/jsx-runtime";
//#region src/components/identity/admin/AdminDashboardPage.tsx
function j({ stats: e, pools: t, onNavigate: i, loading: a }) {
	let o = T(() => [
		{
			label: "User Pools",
			value: e.userPools
		},
		{
			label: "Applications",
			value: e.clients
		},
		{
			label: "Total Users",
			value: e.totalUsers
		}
	], [e]);
	return a ? /* @__PURE__ */ A("div", {
		className: "flex flex-col gap-8",
		children: [/* @__PURE__ */ k("div", {
			className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4",
			children: [
				1,
				2,
				3
			].map((e) => /* @__PURE__ */ A(r, {
				padding: "md",
				children: [/* @__PURE__ */ k("div", { className: "h-5 w-12 rounded bg-surface-hover animate-pulse mb-2" }), /* @__PURE__ */ k("div", { className: "h-3 w-20 rounded bg-surface-hover animate-pulse" })]
			}, e))
		}), /* @__PURE__ */ k(r, { className: "h-[200px] animate-pulse" })]
	}) : /* @__PURE__ */ A(u, {
		title: "Dashboard",
		children: [
			/* @__PURE__ */ k("section", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4",
				children: o.map((e) => /* @__PURE__ */ A(r, {
					padding: "md",
					children: [/* @__PURE__ */ k("div", {
						className: "text-[2rem] font-bold text-info-fg mb-1",
						children: e.value
					}), /* @__PURE__ */ k("div", {
						className: "text-sm text-neutral",
						children: e.label
					})]
				}, e.label))
			}),
			/* @__PURE__ */ A("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ k("h2", {
					className: "text-lg font-semibold text-text-primary m-0",
					children: "User Pools"
				}), /* @__PURE__ */ k(r, { children: t.length === 0 ? /* @__PURE__ */ k(_, {
					title: "No pools created yet",
					actionLabel: "Create Pool",
					onAction: () => i("/identity/admin/pools/new")
				}) : t.map((e, r) => /* @__PURE__ */ A("div", {
					className: `flex items-center justify-between px-4 py-3 ${r < t.length - 1 ? "border-b border-border-subtle" : ""}`,
					children: [/* @__PURE__ */ A("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ k("span", {
							className: "font-medium text-text-primary",
							children: e.poolName
						}), /* @__PURE__ */ k("span", {
							className: "text-xs text-text-tertiary",
							children: e.createdAt
						})]
					}), /* @__PURE__ */ k(n, {
						variant: "ghost",
						size: "sm",
						onClick: () => i(`/identity/admin/pools/${e.poolId}`),
						children: "View"
					})]
				}, e.poolId)) })]
			}),
			/* @__PURE__ */ A("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ k("h2", {
					className: "text-lg font-semibold text-text-primary m-0",
					children: "Quick Actions"
				}), /* @__PURE__ */ A("div", {
					className: "flex flex-wrap gap-3",
					children: [
						/* @__PURE__ */ k(n, {
							variant: "secondary",
							size: "lg",
							onClick: () => i("/identity/admin/pools/new"),
							children: "Create Pool"
						}),
						/* @__PURE__ */ k(n, {
							variant: "secondary",
							size: "lg",
							onClick: () => i("/identity/admin/applications/new"),
							children: "Create Application"
						}),
						/* @__PURE__ */ k(n, {
							variant: "secondary",
							size: "lg",
							onClick: () => i("/identity/admin/setup"),
							children: "Setup Guide"
						})
					]
				})]
			})
		]
	});
}
//#endregion
//#region src/components/identity/shared/EntityTable.tsx
function M({ columns: e, data: t, keyField: n, onRowClick: i, actions: a, emptyMessage: o = "No records found.", emptyIcon: s = "📋", loading: l = !1 }) {
	let u = T(() => e.map((e) => ({
		key: e.key,
		header: e.header,
		render: e.render ? (t) => e.render(t) : void 0,
		sortable: e.sortable,
		width: e.width,
		align: e.align
	})), [e]);
	return !l && t.length === 0 ? /* @__PURE__ */ A(r, {
		className: "flex flex-col items-center justify-center min-h-[220px] p-8",
		children: [/* @__PURE__ */ k("span", {
			className: "text-[42px] mb-3",
			children: s
		}), /* @__PURE__ */ k("p", {
			className: "text-sm font-medium text-neutral text-center max-w-[280px] m-0",
			children: o
		})]
	}) : /* @__PURE__ */ k(r, { children: /* @__PURE__ */ k(c, {
		data: t,
		columns: u,
		keyField: (e) => String(e[n]),
		onRowClick: i,
		rowActions: a,
		loading: l,
		frameless: !0
	}) });
}
//#endregion
//#region src/components/identity/admin/PoolListPage.tsx
function N({ pools: e, onCreatePool: t, onEditPool: r, onDeletePool: i, onViewPool: a, loading: o }) {
	let [s, c] = D(null), [l, d] = D(!1), [f, m] = D(null), h = C(async (e) => {
		d(!0), m(null);
		try {
			await i(e), c(null);
		} catch (e) {
			m(e instanceof Error ? e.message : "Failed to delete pool.");
		} finally {
			d(!1);
		}
	}, [i]), _ = C(() => {
		c(null), m(null);
	}, []), v = T(() => [
		{
			key: "poolName",
			header: "Name",
			sortable: !0
		},
		{
			key: "clientId",
			header: "Client ID"
		},
		{
			key: "createdAt",
			header: "Created",
			sortable: !0
		}
	], []), y = C((e) => /* @__PURE__ */ A(O, { children: [
		/* @__PURE__ */ k(n, {
			variant: "ghost",
			size: "sm",
			onClick: () => a(e.poolId),
			children: "View"
		}),
		/* @__PURE__ */ k(n, {
			variant: "ghost",
			size: "sm",
			onClick: () => r(e.poolId),
			children: "Edit"
		}),
		/* @__PURE__ */ k(n, {
			variant: "danger",
			size: "sm",
			onClick: () => {
				c(e.poolId), m(null);
			},
			children: "Delete"
		})
	] }), [r, a]);
	return /* @__PURE__ */ A(u, {
		title: "User Pools",
		actions: /* @__PURE__ */ k(n, {
			variant: "primary",
			size: "lg",
			onClick: t,
			children: "Create Pool"
		}),
		children: [/* @__PURE__ */ k(M, {
			columns: v,
			data: e,
			keyField: "poolId",
			actions: y,
			loading: o,
			emptyMessage: "No user pools found. Create one to get started.",
			emptyIcon: "🏊"
		}), /* @__PURE__ */ k(g, {
			open: !!s,
			onConfirm: () => {
				s && h(s);
			},
			onCancel: _,
			title: "Delete Pool",
			body: "This action cannot be undone. All users in this pool will be affected.",
			tone: "destructive",
			confirmLabel: "Delete",
			confirmDisabled: l,
			children: f && /* @__PURE__ */ k(p, {
				variant: "error",
				children: f
			})
		})]
	});
}
//#endregion
//#region src/components/identity/shared/FormField.tsx
function P({ label: e, name: t, type: n = "text", value: r, onChange: i, error: a, required: o, placeholder: s, options: c, helpText: l, disabled: u }) {
	let d = C((e) => {
		i(n === "number" ? Number(e.target.value) : e.target.value);
	}, [i, n]);
	return n === "checkbox" ? /* @__PURE__ */ A("div", {
		className: "mb-4",
		children: [
			/* @__PURE__ */ A("label", {
				className: "flex items-center gap-2 cursor-pointer",
				children: [/* @__PURE__ */ k(S, {
					name: t,
					checked: !!r,
					onChange: i,
					disabled: u
				}), /* @__PURE__ */ A("span", {
					className: "text-sm text-text-primary",
					children: [e, o && /* @__PURE__ */ k("span", {
						className: "text-danger-fg",
						children: " *"
					})]
				})]
			}),
			a && /* @__PURE__ */ k("p", {
				className: "mt-1 text-sm text-danger-fg",
				children: a
			}),
			l && !a && /* @__PURE__ */ k("p", {
				className: "mt-1 text-sm text-text-tertiary",
				children: l
			})
		]
	}) : /* @__PURE__ */ k(f, {
		label: e,
		required: o,
		error: a,
		hint: l,
		className: "mb-4",
		children: ({ labelId: e, ...i }) => n === "textarea" ? /* @__PURE__ */ k(y, {
			...i,
			name: t,
			value: String(r),
			onChange: d,
			placeholder: s,
			disabled: u,
			required: o,
			rows: 5,
			invalid: !!a,
			className: "resize-y min-h-[100px]"
		}) : n === "select" ? /* @__PURE__ */ k(x, {
			...i,
			name: t,
			value: String(r),
			onChange: d,
			disabled: u,
			required: o,
			invalid: !!a,
			options: [{
				value: "",
				label: s || "Select..."
			}, ...c ?? []]
		}) : /* @__PURE__ */ k(v, {
			...i,
			type: n,
			name: t,
			value: String(r),
			onChange: d,
			placeholder: s,
			disabled: u,
			required: o,
			invalid: !!a
		})
	});
}
//#endregion
//#region src/components/identity/admin/PoolFormPage.tsx
function F({ pool: e, isEdit: t, onSubmit: i, onCancel: a, error: o }) {
	let [s, c] = D(e?.poolName ?? ""), [l, d] = D(e?.settings?.mfaConfiguration ?? "OFF"), [f, m] = D(e?.settings?.passwordPolicy?.minLength ?? 8), [h, g] = D(e?.settings?.passwordPolicy?.requireUppercase ?? !0), [_, y] = D(e?.settings?.passwordPolicy?.requireLowercase ?? !0), [b, x] = D(e?.settings?.passwordPolicy?.requireNumbers ?? !0), [S, w] = D(e?.settings?.passwordPolicy?.requireSymbols ?? !1), [T, E] = D(Object.entries(e?.customAttributes ?? {}).map(([e, t]) => ({
		key: e,
		value: t
	}))), [O, j] = D(!1), M = C(() => {
		E((e) => [...e, {
			key: "",
			value: ""
		}]);
	}, []), N = C((e) => {
		E((t) => t.filter((t, n) => n !== e));
	}, []), F = C((e, t, n) => {
		E((r) => r.map((r, i) => i === e ? {
			...r,
			[t]: n
		} : r));
	}, []), I = C(async (e) => {
		e.preventDefault(), j(!0);
		try {
			let e = {};
			for (let { key: t, value: n } of T) t.trim() && (e[t.trim()] = n);
			await i({
				poolName: s,
				customAttributes: e,
				settings: {
					mfaConfiguration: l,
					passwordPolicy: {
						minLength: f,
						requireUppercase: h,
						requireLowercase: _,
						requireNumbers: b,
						requireSymbols: S
					}
				}
			});
		} finally {
			j(!1);
		}
	}, [
		s,
		l,
		f,
		h,
		_,
		b,
		S,
		T,
		i
	]);
	return /* @__PURE__ */ A(u, {
		title: t ? "Edit Pool" : "Create Pool",
		className: "max-w-[640px]",
		children: [o && /* @__PURE__ */ k(p, {
			variant: "error",
			children: o
		}), /* @__PURE__ */ k(r, {
			padding: "md",
			children: /* @__PURE__ */ A("form", {
				onSubmit: I,
				children: [
					/* @__PURE__ */ k(P, {
						label: "Pool Name",
						name: "poolName",
						value: s,
						onChange: (e) => c(String(e)),
						required: !0,
						placeholder: "my-user-pool"
					}),
					/* @__PURE__ */ A("section", {
						className: "mb-6",
						children: [/* @__PURE__ */ k("h3", {
							className: "text-base font-semibold text-text-primary mb-2",
							children: "MFA Configuration"
						}), /* @__PURE__ */ k(P, {
							label: "MFA Mode",
							name: "mfaConfig",
							type: "select",
							value: l,
							onChange: (e) => d(String(e)),
							options: [
								{
									value: "OFF",
									label: "Off"
								},
								{
									value: "OPTIONAL",
									label: "Optional"
								},
								{
									value: "REQUIRED",
									label: "Required"
								}
							]
						})]
					}),
					/* @__PURE__ */ A("section", {
						className: "mb-6",
						children: [
							/* @__PURE__ */ k("h3", {
								className: "text-base font-semibold text-text-primary mb-2",
								children: "Password Policy"
							}),
							/* @__PURE__ */ k(P, {
								label: "Minimum Length",
								name: "minLength",
								type: "number",
								value: f,
								onChange: (e) => m(Number(e))
							}),
							/* @__PURE__ */ k(P, {
								label: "Require Uppercase",
								name: "requireUppercase",
								type: "checkbox",
								value: h,
								onChange: (e) => g(!!e)
							}),
							/* @__PURE__ */ k(P, {
								label: "Require Lowercase",
								name: "requireLowercase",
								type: "checkbox",
								value: _,
								onChange: (e) => y(!!e)
							}),
							/* @__PURE__ */ k(P, {
								label: "Require Numbers",
								name: "requireNumbers",
								type: "checkbox",
								value: b,
								onChange: (e) => x(!!e)
							}),
							/* @__PURE__ */ k(P, {
								label: "Require Symbols",
								name: "requireSymbols",
								type: "checkbox",
								value: S,
								onChange: (e) => w(!!e)
							})
						]
					}),
					/* @__PURE__ */ A("section", {
						className: "mb-6",
						children: [
							/* @__PURE__ */ k("h3", {
								className: "text-base font-semibold text-text-primary mb-2",
								children: "Custom Attributes"
							}),
							T.map((e, t) => /* @__PURE__ */ A("div", {
								className: "flex gap-2 items-center mb-2",
								children: [
									/* @__PURE__ */ k(v, {
										className: "flex-1",
										placeholder: "Attribute name",
										value: e.key,
										onChange: (e) => F(t, "key", e.target.value)
									}),
									/* @__PURE__ */ k(v, {
										className: "flex-1",
										placeholder: "Type (string, number, etc.)",
										value: e.value,
										onChange: (e) => F(t, "value", e.target.value)
									}),
									/* @__PURE__ */ k(n, {
										variant: "danger",
										size: "sm",
										onClick: () => N(t),
										children: "Remove"
									})
								]
							}, t)),
							/* @__PURE__ */ k(n, {
								variant: "ghost",
								size: "sm",
								onClick: M,
								children: "+ Add Attribute"
							})
						]
					}),
					/* @__PURE__ */ A("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ k(n, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: O,
							children: O ? "Saving..." : t ? "Update Pool" : "Create Pool"
						}), /* @__PURE__ */ k(n, {
							variant: "ghost",
							size: "lg",
							onClick: a,
							children: "Cancel"
						})]
					})
				]
			})
		})]
	});
}
//#endregion
//#region src/components/identity/shared/StatusBadge.tsx
var I = {
	CONFIRMED: "success",
	ACTIVE: "success",
	ENABLED: "success",
	UNCONFIRMED: "warning",
	PENDING: "warning",
	FORCE_CHANGE_PASSWORD: "caution",
	DISABLED: "danger",
	COMPROMISED: "danger",
	ARCHIVED: "neutral",
	UNKNOWN: "neutral"
}, L = {
	success: "success",
	warning: "warning",
	danger: "danger",
	info: "info",
	neutral: "neutral"
};
function R({ status: e, variant: t }) {
	let n = t ? L[t] || "neutral" : I[e] || "neutral";
	return /* @__PURE__ */ k(m, {
		tone: n,
		size: "sm",
		children: e
	});
}
//#endregion
//#region src/components/identity/admin/UserListPage.tsx
function z({ users: e, poolName: t, onCreateUser: r, onEditUser: i, onDeleteUser: a, loading: o }) {
	let [s, c] = D(null), [l, d] = D(!1), [f, m] = D(null), h = C(async (e) => {
		d(!0), m(null);
		try {
			await a(e), c(null);
		} catch (e) {
			m(e instanceof Error ? e.message : "Failed to delete user.");
		} finally {
			d(!1);
		}
	}, [a]), _ = C(() => {
		c(null), m(null);
	}, []), v = T(() => [
		{
			key: "email",
			header: "Email",
			sortable: !0
		},
		{
			key: "name",
			header: "Name",
			render: (e) => [e.givenName, e.familyName].filter(Boolean).join(" ") || "—"
		},
		{
			key: "status",
			header: "Status",
			width: "180px",
			render: (e) => /* @__PURE__ */ k(R, { status: e.status })
		},
		{
			key: "createdAt",
			header: "Created",
			sortable: !0
		}
	], []), y = C((e) => /* @__PURE__ */ A(O, { children: [/* @__PURE__ */ k(n, {
		variant: "ghost",
		size: "sm",
		onClick: () => i(e.userId),
		children: "Edit"
	}), /* @__PURE__ */ k(n, {
		variant: "danger",
		size: "sm",
		onClick: () => {
			c(e.userId), m(null);
		},
		children: "Delete"
	})] }), [i]);
	return /* @__PURE__ */ A(u, {
		title: `Users — ${t}`,
		actions: /* @__PURE__ */ k(n, {
			variant: "primary",
			size: "lg",
			onClick: r,
			children: "Create User"
		}),
		children: [/* @__PURE__ */ k(M, {
			columns: v,
			data: e,
			keyField: "userId",
			actions: y,
			loading: o,
			emptyMessage: "No users in this pool yet.",
			emptyIcon: "👤"
		}), /* @__PURE__ */ k(g, {
			open: !!s,
			onConfirm: () => {
				s && h(s);
			},
			onCancel: _,
			title: "Delete User",
			body: "This action cannot be undone. The user will be permanently removed.",
			tone: "destructive",
			confirmLabel: "Delete",
			confirmDisabled: l,
			children: f && /* @__PURE__ */ k(p, {
				variant: "error",
				children: f
			})
		})]
	});
}
//#endregion
//#region src/components/identity/admin/UserFormPage.tsx
function ee({ user: e, isEdit: t, customAttributeDefinitions: i, onSubmit: a, onCancel: o, error: s }) {
	let [c, l] = D(e?.email ?? ""), [d, f] = D(""), [m, h] = D(e?.givenName ?? ""), [g, _] = D(e?.familyName ?? ""), [v, y] = D(e?.nickname ?? ""), [b, x] = D(e?.picture ?? ""), [S, w] = D(e?.website ?? ""), [T, E] = D(Object.fromEntries(Object.entries(e?.customAttributes ?? {}).map(([e, t]) => [e, String(t)]))), [O, j] = D(!1), M = C((e, t) => {
		E((n) => ({
			...n,
			[e]: t
		}));
	}, []), N = C(async (e) => {
		e.preventDefault(), j(!0);
		try {
			await a({
				email: c,
				...!t && d ? { password: d } : {},
				givenName: m || void 0,
				familyName: g || void 0,
				nickname: v || void 0,
				picture: b || void 0,
				website: S || void 0,
				customAttributes: T
			});
		} finally {
			j(!1);
		}
	}, [
		c,
		d,
		m,
		g,
		v,
		b,
		S,
		T,
		t,
		a
	]);
	return /* @__PURE__ */ A(u, {
		title: t ? "Edit User" : "Create User",
		className: "max-w-[640px]",
		children: [s && /* @__PURE__ */ k(p, {
			variant: "error",
			children: s
		}), /* @__PURE__ */ k(r, {
			padding: "md",
			children: /* @__PURE__ */ A("form", {
				onSubmit: N,
				children: [
					/* @__PURE__ */ k(P, {
						label: "Email",
						name: "email",
						type: "email",
						value: c,
						onChange: (e) => l(String(e)),
						required: !0,
						placeholder: "user@example.com"
					}),
					!t && /* @__PURE__ */ k(P, {
						label: "Password",
						name: "password",
						type: "password",
						value: d,
						onChange: (e) => f(String(e)),
						required: !0,
						placeholder: "Temporary password",
						helpText: "User will be prompted to change on first login."
					}),
					/* @__PURE__ */ k(P, {
						label: "Given Name",
						name: "givenName",
						value: m,
						onChange: (e) => h(String(e)),
						placeholder: "John"
					}),
					/* @__PURE__ */ k(P, {
						label: "Family Name",
						name: "familyName",
						value: g,
						onChange: (e) => _(String(e)),
						placeholder: "Doe"
					}),
					/* @__PURE__ */ k(P, {
						label: "Nickname",
						name: "nickname",
						value: v,
						onChange: (e) => y(String(e)),
						placeholder: "johnny"
					}),
					/* @__PURE__ */ k(P, {
						label: "Picture URL",
						name: "picture",
						value: b,
						onChange: (e) => x(String(e)),
						placeholder: "https://..."
					}),
					/* @__PURE__ */ k(P, {
						label: "Website",
						name: "website",
						value: S,
						onChange: (e) => w(String(e)),
						placeholder: "https://..."
					}),
					i && Object.keys(i).length > 0 && /* @__PURE__ */ A("section", { children: [/* @__PURE__ */ k("h3", {
						className: "text-base font-semibold text-text-primary mt-6 mb-2",
						children: "Custom Attributes"
					}), Object.entries(i).map(([e, t]) => /* @__PURE__ */ k(P, {
						label: e,
						name: `custom_${e}`,
						type: t === "number" ? "number" : "text",
						value: T[e] ?? "",
						onChange: (t) => M(e, String(t)),
						helpText: `Type: ${t}`
					}, e))] }),
					/* @__PURE__ */ A("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ k(n, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: O,
							children: O ? "Saving..." : t ? "Update User" : "Create User"
						}), /* @__PURE__ */ k(n, {
							variant: "ghost",
							size: "lg",
							onClick: o,
							children: "Cancel"
						})]
					})
				]
			})
		})]
	});
}
//#endregion
//#region src/components/identity/admin/GroupListPage.tsx
function B({ groups: e, poolName: t, onCreateGroup: r, onEditGroup: i, onDeleteGroup: a, loading: o }) {
	let [s, c] = D(null), [l, d] = D(!1), [f, h] = D(null), _ = C(async (e) => {
		d(!0), h(null);
		try {
			await a(e), c(null);
		} catch (e) {
			h(e instanceof Error ? e.message : "Failed to delete group.");
		} finally {
			d(!1);
		}
	}, [a]), v = C(() => {
		c(null), h(null);
	}, []), y = T(() => [
		{
			key: "groupName",
			header: "Name",
			sortable: !0
		},
		{
			key: "description",
			header: "Description"
		},
		{
			key: "permissions",
			header: "Permissions",
			render: (e) => /* @__PURE__ */ k("div", {
				className: "flex flex-wrap gap-1",
				children: e.permissions.length === 0 ? /* @__PURE__ */ k("span", {
					className: "text-text-tertiary text-xs",
					children: "None"
				}) : e.permissions.map((e) => /* @__PURE__ */ k(m, {
					tone: "info",
					size: "xs",
					children: e
				}, e))
			})
		}
	], []), b = C((e) => /* @__PURE__ */ A(O, { children: [/* @__PURE__ */ k(n, {
		variant: "ghost",
		size: "sm",
		onClick: () => i(e.groupId),
		children: "Edit"
	}), /* @__PURE__ */ k(n, {
		variant: "danger",
		size: "sm",
		onClick: () => {
			c(e.groupId), h(null);
		},
		children: "Delete"
	})] }), [i]);
	return /* @__PURE__ */ A(u, {
		title: `Groups — ${t}`,
		actions: /* @__PURE__ */ k(n, {
			variant: "primary",
			size: "lg",
			onClick: r,
			children: "Create Group"
		}),
		children: [/* @__PURE__ */ k(M, {
			columns: y,
			data: e,
			keyField: "groupId",
			actions: b,
			loading: o,
			emptyMessage: "No groups in this pool yet.",
			emptyIcon: "👥"
		}), /* @__PURE__ */ k(g, {
			open: !!s,
			onConfirm: () => {
				s && _(s);
			},
			onCancel: v,
			title: "Delete Group",
			body: "This action cannot be undone. Members will lose their group permissions.",
			tone: "destructive",
			confirmLabel: "Delete",
			confirmDisabled: l,
			children: f && /* @__PURE__ */ k(p, {
				variant: "error",
				children: f
			})
		})]
	});
}
//#endregion
//#region src/components/identity/admin/GroupFormPage.tsx
function V({ group: e, isEdit: t, members: i, availableUsers: a, onSubmit: o, onAddMember: s, onRemoveMember: c, onCancel: l, error: d }) {
	let [f, m] = D(e?.groupName ?? ""), [h, g] = D(e?.description ?? ""), [_, y] = D(e?.permissions ?? []), [b, S] = D(""), [w, T] = D(""), [E, O] = D(!1), j = C((e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			let t = b.trim();
			t && !_.includes(t) && y((e) => [...e, t]), S("");
		}
	}, [b, _]), M = C((e) => {
		y((t) => t.filter((t) => t !== e));
	}, []), N = C(async () => {
		w && s && (await s(w), T(""));
	}, [w, s]), F = C(async (e) => {
		e.preventDefault(), O(!0);
		try {
			await o({
				groupName: f,
				description: h,
				permissions: _
			});
		} finally {
			O(!1);
		}
	}, [
		f,
		h,
		_,
		o
	]);
	return /* @__PURE__ */ A(u, {
		title: t ? "Edit Group" : "Create Group",
		className: "max-w-[640px]",
		children: [d && /* @__PURE__ */ k(p, {
			variant: "error",
			children: d
		}), /* @__PURE__ */ k(r, {
			padding: "md",
			children: /* @__PURE__ */ A("form", {
				onSubmit: F,
				children: [
					/* @__PURE__ */ k(P, {
						label: "Group Name",
						name: "groupName",
						value: f,
						onChange: (e) => m(String(e)),
						required: !0,
						placeholder: "admins"
					}),
					/* @__PURE__ */ k(P, {
						label: "Description",
						name: "description",
						type: "textarea",
						value: h,
						onChange: (e) => g(String(e)),
						placeholder: "Describe this group's purpose..."
					}),
					/* @__PURE__ */ A("section", { children: [
						/* @__PURE__ */ k("h3", {
							className: "text-base font-semibold text-text-primary mt-6 mb-2",
							children: "Permissions"
						}),
						/* @__PURE__ */ k("div", {
							className: "flex flex-wrap gap-1.5 mb-2",
							children: _.map((e) => /* @__PURE__ */ A("span", {
								className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-info text-white text-sm font-medium",
								children: [e, /* @__PURE__ */ k(n, {
									variant: "ghost",
									size: "sm",
									className: "p-0 text-white text-[14px] leading-none min-w-0 min-h-0",
									onClick: () => M(e),
									"aria-label": `Remove permission ${e}`,
									children: "x"
								})]
							}, e))
						}),
						/* @__PURE__ */ k(v, {
							placeholder: "Type a permission and press Enter",
							value: b,
							onChange: (e) => S(e.target.value),
							onKeyDown: j
						})
					] }),
					t && i && /* @__PURE__ */ A("section", { children: [
						/* @__PURE__ */ k("h3", {
							className: "text-base font-semibold text-text-primary mt-6 mb-2",
							children: "Members"
						}),
						i.length === 0 ? /* @__PURE__ */ k("p", {
							className: "text-text-tertiary text-sm",
							children: "No members yet."
						}) : i.map((e) => /* @__PURE__ */ A("div", {
							className: "flex items-center justify-between py-1.5 border-b border-border",
							children: [/* @__PURE__ */ k("span", {
								className: "text-base",
								children: e.email
							}), c && /* @__PURE__ */ k(n, {
								variant: "danger",
								size: "sm",
								onClick: () => c(e.userId),
								children: "Remove"
							})]
						}, e.userId)),
						a && a.length > 0 && s && /* @__PURE__ */ A("div", {
							className: "flex gap-2 mt-2",
							children: [/* @__PURE__ */ k(x, {
								className: "flex-1",
								value: w,
								onChange: (e) => T(e.target.value),
								placeholder: "Select user to add...",
								options: a.map((e) => ({
									value: e.userId,
									label: e.email
								}))
							}), /* @__PURE__ */ k(n, {
								variant: "ghost",
								size: "sm",
								onClick: N,
								disabled: !w,
								children: "Add"
							})]
						})
					] }),
					/* @__PURE__ */ A("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ k(n, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: E,
							children: E ? "Saving..." : t ? "Update Group" : "Create Group"
						}), /* @__PURE__ */ k(n, {
							variant: "ghost",
							size: "lg",
							onClick: l,
							children: "Cancel"
						})]
					})
				]
			})
		})]
	});
}
//#endregion
//#region src/components/identity/admin/ApplicationListPage.tsx
function H({ applications: e, onCreateApp: t, onCreateAppWithPool: r, onEditApp: i, onDeleteApp: a, loading: o }) {
	let [s, c] = D(null), [l, d] = D(!1), [f, h] = D(null), _ = C(async (e) => {
		d(!0), h(null);
		try {
			await a(e), c(null);
		} catch (e) {
			h(e instanceof Error ? e.message : "Failed to delete application.");
		} finally {
			d(!1);
		}
	}, [a]), v = C(() => {
		c(null), h(null);
	}, []), y = T(() => [
		{
			key: "clientName",
			header: "Name",
			sortable: !0
		},
		{
			key: "clientId",
			header: "Client ID",
			render: (e) => /* @__PURE__ */ k("span", {
				className: "font-mono text-xs text-neutral",
				children: e.clientId
			})
		},
		{
			key: "poolName",
			header: "Pool",
			render: (e) => e.poolName || e.poolId
		},
		{
			key: "redirectUris",
			header: "Redirect URIs",
			render: (e) => /* @__PURE__ */ A("div", {
				className: "flex flex-wrap gap-1",
				children: [e.redirectUris.slice(0, 2).map((e) => /* @__PURE__ */ k(m, {
					tone: "neutral",
					size: "xs",
					children: e
				}, e)), e.redirectUris.length > 2 && /* @__PURE__ */ A(m, {
					tone: "neutral",
					size: "xs",
					children: [
						"+",
						e.redirectUris.length - 2,
						" more"
					]
				})]
			})
		}
	], []), b = C((e) => /* @__PURE__ */ A(O, { children: [/* @__PURE__ */ k(n, {
		variant: "ghost",
		size: "sm",
		onClick: () => i(e.clientId),
		children: "Edit"
	}), /* @__PURE__ */ k(n, {
		variant: "danger",
		size: "sm",
		onClick: () => {
			c(e.clientId), h(null);
		},
		children: "Delete"
	})] }), [i]);
	return /* @__PURE__ */ A(u, {
		title: "Applications",
		actions: /* @__PURE__ */ A(O, { children: [/* @__PURE__ */ k(n, {
			variant: "primary",
			size: "lg",
			onClick: t,
			children: "New Application"
		}), /* @__PURE__ */ k(n, {
			variant: "secondary",
			size: "lg",
			onClick: r,
			children: "New App + Pool"
		})] }),
		children: [/* @__PURE__ */ k(M, {
			columns: y,
			data: e,
			keyField: "clientId",
			actions: b,
			loading: o,
			emptyMessage: "No applications registered yet.",
			emptyIcon: "🔐"
		}), /* @__PURE__ */ k(g, {
			open: !!s,
			onConfirm: () => {
				s && _(s);
			},
			onCancel: v,
			title: "Delete Application",
			body: "This action cannot be undone. The application will lose access immediately.",
			tone: "destructive",
			confirmLabel: "Delete",
			confirmDisabled: l,
			children: f && /* @__PURE__ */ k(p, {
				variant: "error",
				children: f
			})
		})]
	});
}
//#endregion
//#region src/components/identity/admin/ApplicationFormPage.tsx
function U({ label: e, values: t, onChange: r, placeholder: i }) {
	let a = () => r([...t, ""]), o = (e) => r(t.filter((t, n) => n !== e)), s = (e, n) => r(t.map((t, r) => r === e ? n : t));
	return /* @__PURE__ */ A("div", {
		className: "mb-4",
		children: [
			/* @__PURE__ */ k("label", {
				className: "block mb-1 text-sm font-semibold text-text-primary",
				children: e
			}),
			t.map((e, t) => /* @__PURE__ */ A("div", {
				className: "flex gap-2 items-center mb-1.5",
				children: [/* @__PURE__ */ k(v, {
					className: "flex-1",
					value: e,
					onChange: (e) => s(t, e.target.value),
					placeholder: i
				}), /* @__PURE__ */ k(n, {
					variant: "danger",
					size: "sm",
					onClick: () => o(t),
					children: "Remove"
				})]
			}, t)),
			/* @__PURE__ */ k(n, {
				variant: "ghost",
				size: "sm",
				onClick: a,
				children: "+ Add"
			})
		]
	});
}
var W = [
	"authorization_code",
	"client_credentials",
	"refresh_token"
], G = [
	"code",
	"token",
	"id_token"
];
function K({ application: e, isEdit: t, pools: i, onSubmit: a, onCancel: o, error: s }) {
	let [c, l] = D(e?.clientName ?? ""), [d, f] = D(e?.poolId ?? ""), [m, h] = D(e?.redirectUris ?? [""]), [g, _] = D(e?.postLogoutRedirectUris ?? []), [v, y] = D(e?.grantTypes ?? ["authorization_code"]), [b, x] = D(e?.responseTypes ?? ["code"]), [w, T] = D(e?.scope ?? "openid profile email"), [E, O] = D(!1), j = C((e) => {
		y((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}, []), M = C((e) => {
		x((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}, []), N = C(async (e) => {
		e.preventDefault(), O(!0);
		try {
			await a({
				clientName: c,
				poolId: d,
				redirectUris: m.filter((e) => e.trim()),
				postLogoutRedirectUris: g.filter((e) => e.trim()),
				grantTypes: v,
				responseTypes: b,
				scope: w
			});
		} finally {
			O(!1);
		}
	}, [
		c,
		d,
		m,
		g,
		v,
		b,
		w,
		a
	]);
	return /* @__PURE__ */ A(u, {
		title: t ? "Edit Application" : "New Application",
		className: "max-w-[640px]",
		children: [s && /* @__PURE__ */ k(p, {
			variant: "error",
			children: s
		}), /* @__PURE__ */ k(r, {
			padding: "md",
			children: /* @__PURE__ */ A("form", {
				onSubmit: N,
				children: [
					/* @__PURE__ */ k(P, {
						label: "Application Name",
						name: "clientName",
						value: c,
						onChange: (e) => l(String(e)),
						required: !0,
						placeholder: "My App"
					}),
					/* @__PURE__ */ k(P, {
						label: "User Pool",
						name: "poolId",
						type: "select",
						value: d,
						onChange: (e) => f(String(e)),
						required: !0,
						options: i.map((e) => ({
							value: e.poolId,
							label: e.poolName
						})),
						placeholder: "Select a pool..."
					}),
					/* @__PURE__ */ k(U, {
						label: "Redirect URIs",
						values: m,
						onChange: h,
						placeholder: "https://app.example.com/callback"
					}),
					/* @__PURE__ */ k(U, {
						label: "Post-Logout Redirect URIs",
						values: g,
						onChange: _,
						placeholder: "https://app.example.com/logout"
					}),
					/* @__PURE__ */ A("section", { children: [/* @__PURE__ */ k("h3", {
						className: "text-base font-semibold text-text-primary mt-6 mb-2",
						children: "Grant Types"
					}), /* @__PURE__ */ k("div", {
						className: "flex flex-col gap-2 mb-4",
						children: W.map((e) => /* @__PURE__ */ A("label", {
							className: "flex items-center gap-2 text-base text-text-primary cursor-pointer",
							children: [/* @__PURE__ */ k(S, {
								checked: v.includes(e),
								onChange: () => j(e)
							}), e]
						}, e))
					})] }),
					/* @__PURE__ */ A("section", { children: [/* @__PURE__ */ k("h3", {
						className: "text-base font-semibold text-text-primary mt-6 mb-2",
						children: "Response Types"
					}), /* @__PURE__ */ k("div", {
						className: "flex flex-col gap-2 mb-4",
						children: G.map((e) => /* @__PURE__ */ A("label", {
							className: "flex items-center gap-2 text-base text-text-primary cursor-pointer",
							children: [/* @__PURE__ */ k(S, {
								checked: b.includes(e),
								onChange: () => M(e)
							}), e]
						}, e))
					})] }),
					/* @__PURE__ */ k(P, {
						label: "Scope",
						name: "scope",
						value: w,
						onChange: (e) => T(String(e)),
						placeholder: "openid profile email",
						helpText: "Space-separated list of scopes."
					}),
					/* @__PURE__ */ A("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ k(n, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: E,
							children: E ? "Saving..." : t ? "Update Application" : "Create Application"
						}), /* @__PURE__ */ k(n, {
							variant: "ghost",
							size: "lg",
							onClick: o,
							children: "Cancel"
						})]
					})
				]
			})
		})]
	});
}
//#endregion
//#region src/components/identity/admin/ApplicationPoolFormPage.tsx
var q = [
	"authorization_code",
	"client_credentials",
	"refresh_token"
];
function J({ onSubmit: e, onCancel: t, error: i }) {
	let [a, o] = D(""), [s, c] = D(""), [l, d] = D([""]), [f, m] = D(["authorization_code"]), [h, g] = D(!1), _ = C((e) => {
		m((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}, []), y = C(() => {
		d((e) => [...e, ""]);
	}, []), b = C((e) => {
		d((t) => t.filter((t, n) => n !== e));
	}, []), x = C((e, t) => {
		d((n) => n.map((n, r) => r === e ? t : n));
	}, []), w = C(async (t) => {
		t.preventDefault(), g(!0);
		try {
			await e({
				poolName: a,
				clientName: s,
				redirectUris: l.filter((e) => e.trim()),
				grantTypes: f
			});
		} finally {
			g(!1);
		}
	}, [
		a,
		s,
		l,
		f,
		e
	]);
	return /* @__PURE__ */ A(u, {
		title: "New Application + Pool",
		description: "Create a user pool and register an application in one step.",
		className: "max-w-[640px]",
		children: [i && /* @__PURE__ */ k(p, {
			variant: "error",
			children: i
		}), /* @__PURE__ */ k(r, {
			padding: "md",
			children: /* @__PURE__ */ A("form", {
				onSubmit: w,
				children: [
					/* @__PURE__ */ k(P, {
						label: "Pool Name",
						name: "poolName",
						value: a,
						onChange: (e) => o(String(e)),
						required: !0,
						placeholder: "my-user-pool"
					}),
					/* @__PURE__ */ k(P, {
						label: "Application Name",
						name: "clientName",
						value: s,
						onChange: (e) => c(String(e)),
						required: !0,
						placeholder: "My App"
					}),
					/* @__PURE__ */ A("section", { children: [
						/* @__PURE__ */ k("h3", {
							className: "text-base font-semibold text-text-primary mt-6 mb-2",
							children: "Redirect URIs"
						}),
						l.map((e, t) => /* @__PURE__ */ A("div", {
							className: "flex gap-2 items-center mb-1.5",
							children: [/* @__PURE__ */ k(v, {
								className: "flex-1",
								value: e,
								onChange: (e) => x(t, e.target.value),
								placeholder: "https://app.example.com/callback"
							}), l.length > 1 && /* @__PURE__ */ k(n, {
								variant: "danger",
								size: "sm",
								onClick: () => b(t),
								children: "Remove"
							})]
						}, t)),
						/* @__PURE__ */ k(n, {
							variant: "ghost",
							size: "sm",
							onClick: y,
							children: "+ Add URI"
						})
					] }),
					/* @__PURE__ */ A("section", { children: [/* @__PURE__ */ k("h3", {
						className: "text-base font-semibold text-text-primary mt-6 mb-2",
						children: "Grant Types"
					}), /* @__PURE__ */ k("div", {
						className: "flex flex-col gap-2 mb-4",
						children: q.map((e) => /* @__PURE__ */ A("label", {
							className: "flex items-center gap-2 text-base text-text-primary cursor-pointer",
							children: [/* @__PURE__ */ k(S, {
								checked: f.includes(e),
								onChange: () => _(e)
							}), e]
						}, e))
					})] }),
					/* @__PURE__ */ A("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ k(n, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: h,
							children: h ? "Creating..." : "Create Pool + Application"
						}), /* @__PURE__ */ k(n, {
							variant: "ghost",
							size: "lg",
							onClick: t,
							children: "Cancel"
						})]
					})
				]
			})
		})]
	});
}
//#endregion
//#region src/components/identity/admin/EmailTemplateListPage.tsx
function Y({ templates: e, onCreateTemplate: t, onEditTemplate: r, onDeleteTemplate: i, onTestSend: a, loading: o }) {
	let [s, c] = D(null), [l, d] = D(!1), [f, m] = D(null), [_, v] = D(null), [y, b] = D(""), [x, S] = D(!1), [w, E] = D(null), j = C(async (e) => {
		d(!0), m(null);
		try {
			await i(e), c(null);
		} catch (e) {
			m(e instanceof Error ? e.message : "Failed to delete template.");
		} finally {
			d(!1);
		}
	}, [i]), N = C(() => {
		c(null), m(null);
	}, []), F = C(async () => {
		if (!(!_ || !y.trim())) {
			S(!0), E(null);
			try {
				await a(_, y.trim()), v(null), b("");
			} catch (e) {
				E(e instanceof Error ? e.message : "Failed to send test email.");
			} finally {
				S(!1);
			}
		}
	}, [
		_,
		y,
		a
	]), I = T(() => [{
		key: "name",
		header: "Name",
		sortable: !0
	}, {
		key: "subject",
		header: "Subject"
	}], []), L = C((e) => /* @__PURE__ */ A(O, { children: [
		/* @__PURE__ */ k(n, {
			variant: "ghost",
			size: "sm",
			onClick: () => r(e.templateId),
			children: "Edit"
		}),
		/* @__PURE__ */ k(n, {
			variant: "ghost",
			size: "sm",
			onClick: () => {
				v(e.templateId), b(""), E(null);
			},
			children: "Test Send"
		}),
		/* @__PURE__ */ k(n, {
			variant: "danger",
			size: "sm",
			onClick: () => {
				c(e.templateId), m(null);
			},
			children: "Delete"
		})
	] }), [r]);
	return /* @__PURE__ */ A(u, {
		title: "Email Templates",
		actions: /* @__PURE__ */ k(n, {
			variant: "primary",
			size: "lg",
			onClick: t,
			children: "Create Template"
		}),
		children: [
			/* @__PURE__ */ k(M, {
				columns: I,
				data: e,
				keyField: "templateId",
				actions: L,
				loading: o,
				emptyMessage: "No email templates configured.",
				emptyIcon: "✉️"
			}),
			/* @__PURE__ */ A(h, {
				open: !!_,
				onClose: () => {
					v(null), E(null);
				},
				title: "Send Test Email",
				footer: /* @__PURE__ */ A(O, { children: [/* @__PURE__ */ k(n, {
					variant: "ghost",
					size: "md",
					onClick: () => {
						v(null), E(null);
					},
					children: "Cancel"
				}), /* @__PURE__ */ k(n, {
					variant: "primary",
					size: "md",
					onClick: () => {
						F();
					},
					disabled: x || !y.trim(),
					children: x ? "Sending..." : "Send"
				})] }),
				children: [w && /* @__PURE__ */ k("div", {
					className: "mb-3",
					children: /* @__PURE__ */ k(p, {
						variant: "error",
						children: w
					})
				}), /* @__PURE__ */ k(P, {
					label: "Recipient Email",
					name: "test-email",
					type: "email",
					value: y,
					onChange: (e) => b(String(e)),
					placeholder: "recipient@example.com"
				})]
			}),
			/* @__PURE__ */ k(g, {
				open: !!s,
				onConfirm: () => {
					s && j(s);
				},
				onCancel: N,
				title: "Delete Template",
				body: "This action cannot be undone. The template will be permanently removed.",
				tone: "destructive",
				confirmLabel: "Delete",
				confirmDisabled: l,
				children: f && /* @__PURE__ */ k(p, {
					variant: "error",
					children: f
				})
			})
		]
	});
}
//#endregion
//#region src/components/identity/admin/EmailTemplateFormPage.tsx
function X({ template: e, isEdit: t, onSubmit: i, onCancel: a, error: o }) {
	let [s, c] = D(e?.name ?? ""), [l, d] = D(e?.subject ?? ""), [f, m] = D(e?.htmlBody ?? ""), [h, g] = D(e?.textBody ?? ""), [_, b] = D(e?.variables ?? []), [x, S] = D(""), [w, T] = D(!1), [E, O] = D(!1), j = C((e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			let t = x.trim();
			t && !_.includes(t) && b((e) => [...e, t]), S("");
		}
	}, [x, _]), M = C((e) => {
		b((t) => t.filter((t) => t !== e));
	}, []), N = C(async (e) => {
		e.preventDefault(), O(!0);
		try {
			await i({
				name: s,
				subject: l,
				htmlBody: f,
				textBody: h,
				variables: _
			});
		} finally {
			O(!1);
		}
	}, [
		s,
		l,
		f,
		h,
		_,
		i
	]);
	return /* @__PURE__ */ A(u, {
		title: t ? "Edit Email Template" : "Create Email Template",
		className: "max-w-[800px]",
		children: [o && /* @__PURE__ */ k(p, {
			variant: "error",
			children: o
		}), /* @__PURE__ */ k(r, {
			padding: "md",
			children: /* @__PURE__ */ A("form", {
				onSubmit: N,
				children: [
					/* @__PURE__ */ k(P, {
						label: "Template Name",
						name: "name",
						value: s,
						onChange: (e) => c(String(e)),
						required: !0,
						placeholder: "welcome-email"
					}),
					/* @__PURE__ */ k(P, {
						label: "Subject",
						name: "subject",
						value: l,
						onChange: (e) => d(String(e)),
						required: !0,
						placeholder: "Welcome to {{appName}}"
					}),
					/* @__PURE__ */ A("div", {
						className: "mb-4",
						children: [
							/* @__PURE__ */ A("div", {
								className: "flex items-center justify-between mb-1",
								children: [/* @__PURE__ */ k("label", {
									className: "text-sm font-semibold text-text-primary",
									children: "HTML Body"
								}), /* @__PURE__ */ k(n, {
									variant: "ghost",
									size: "sm",
									onClick: () => T((e) => !e),
									children: w ? "Hide Preview" : "Show Preview"
								})]
							}),
							/* @__PURE__ */ k(y, {
								value: f,
								onChange: (e) => m(e.target.value),
								placeholder: "<html><body>...</body></html>",
								rows: 10,
								className: "resize-y font-mono"
							}),
							w && /* @__PURE__ */ k("div", {
								className: "border border-border rounded-sm p-4 bg-white min-h-[200px] mt-2",
								dangerouslySetInnerHTML: { __html: f }
							})
						]
					}),
					/* @__PURE__ */ k(P, {
						label: "Text Body",
						name: "textBody",
						type: "textarea",
						value: h,
						onChange: (e) => g(String(e)),
						placeholder: "Plain text version of the email..."
					}),
					/* @__PURE__ */ A("section", { children: [
						/* @__PURE__ */ k("h3", {
							className: "text-base font-semibold text-text-primary mt-6 mb-2",
							children: "Variables"
						}),
						/* @__PURE__ */ k("div", {
							className: "flex flex-wrap gap-1.5 mb-2",
							children: _.map((e) => /* @__PURE__ */ A("span", {
								className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-info text-white text-sm font-medium",
								children: ["{{" + e + "}}", /* @__PURE__ */ k(n, {
									variant: "ghost",
									size: "sm",
									className: "p-0 text-white text-[14px] leading-none min-w-0 min-h-0",
									onClick: () => M(e),
									"aria-label": `Remove variable ${e}`,
									children: "x"
								})]
							}, e))
						}),
						/* @__PURE__ */ k(v, {
							placeholder: "Type variable name and press Enter",
							value: x,
							onChange: (e) => S(e.target.value),
							onKeyDown: j
						})
					] }),
					/* @__PURE__ */ A("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ k(n, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: E,
							children: E ? "Saving..." : t ? "Update Template" : "Create Template"
						}), /* @__PURE__ */ k(n, {
							variant: "ghost",
							size: "lg",
							onClick: a,
							children: "Cancel"
						})]
					})
				]
			})
		})]
	});
}
//#endregion
//#region src/components/identity/admin/MfaManagementPage.tsx
function te({ metrics: e, users: t, pools: i, onRefresh: a, loading: o }) {
	let [s, c] = D(""), l = T(() => (t ?? []).some((e) => e.poolId !== void 0), [t]), d = T(() => {
		let e = t ?? [];
		return !s || !l ? e : e.filter((e) => e.poolId === s);
	}, [
		t,
		s,
		l
	]), f = T(() => [
		{
			key: "email",
			header: "Email",
			sortable: !0
		},
		{
			key: "mfaEnabled",
			header: "MFA Status",
			width: "140px",
			render: (e) => /* @__PURE__ */ k(R, {
				status: e.mfaEnabled ? "ENABLED" : "DISABLED",
				variant: e.mfaEnabled ? "success" : "warning"
			})
		},
		{
			key: "deviceCount",
			header: "Devices",
			width: "100px"
		}
	], []);
	return o ? /* @__PURE__ */ A(u, {
		title: "MFA Management",
		children: [/* @__PURE__ */ k("div", {
			className: "grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4",
			children: [
				1,
				2,
				3,
				4
			].map((e) => /* @__PURE__ */ A(r, {
				padding: "md",
				children: [/* @__PURE__ */ k("div", { className: "h-5 w-12 rounded bg-surface-hover animate-pulse mb-2" }), /* @__PURE__ */ k("div", { className: "h-3 w-20 rounded bg-surface-hover animate-pulse" })]
			}, e))
		}), /* @__PURE__ */ k(r, { className: "h-[200px] animate-pulse" })]
	}) : /* @__PURE__ */ A(u, {
		title: "MFA Management",
		actions: /* @__PURE__ */ k(n, {
			variant: "ghost",
			size: "lg",
			onClick: a,
			children: "Refresh"
		}),
		children: [
			e && /* @__PURE__ */ A("section", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4",
				children: [
					/* @__PURE__ */ A(r, {
						padding: "md",
						children: [/* @__PURE__ */ k("div", {
							className: "text-[1.75rem] font-bold text-info-fg mb-1",
							children: e.totalUsers
						}), /* @__PURE__ */ k("div", {
							className: "text-sm text-neutral",
							children: "Total Users"
						})]
					}),
					/* @__PURE__ */ A(r, {
						padding: "md",
						children: [/* @__PURE__ */ k("div", {
							className: "text-[1.75rem] font-bold text-success-fg mb-1",
							children: e.mfaEnabled
						}), /* @__PURE__ */ k("div", {
							className: "text-sm text-neutral",
							children: "MFA Enabled"
						})]
					}),
					/* @__PURE__ */ A(r, {
						padding: "md",
						children: [/* @__PURE__ */ k("div", {
							className: "text-[1.75rem] font-bold text-warning-fg mb-1",
							children: e.mfaDisabled
						}), /* @__PURE__ */ k("div", {
							className: "text-sm text-neutral",
							children: "MFA Disabled"
						})]
					}),
					/* @__PURE__ */ A(r, {
						padding: "md",
						children: [/* @__PURE__ */ A("div", {
							className: "text-[1.75rem] font-bold text-info-fg mb-1",
							children: [e.adoptionRate, "%"]
						}), /* @__PURE__ */ k("div", {
							className: "text-sm text-neutral",
							children: "Adoption Rate"
						})]
					})
				]
			}),
			i && i.length > 0 && l && /* @__PURE__ */ A("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ k("label", {
					className: "text-xs font-semibold text-neutral uppercase tracking-wide",
					children: "Filter by pool"
				}), /* @__PURE__ */ k(x, {
					className: "w-64",
					value: s,
					onChange: (e) => c(e.target.value),
					options: [{
						value: "",
						label: "All Pools"
					}, ...i.map((e) => ({
						value: e.poolId,
						label: `${e.poolName} (${e.userCount} users)`
					}))]
				})]
			}),
			/* @__PURE__ */ k(M, {
				columns: f,
				data: d,
				keyField: "userId",
				emptyMessage: "No user MFA data available.",
				emptyIcon: "🔑"
			})
		]
	});
}
//#endregion
//#region src/components/identity/admin/AuditPage.tsx
var ne = [
	"",
	"user",
	"pool",
	"client",
	"group",
	"template"
];
function re({ records: e, onQuery: t, onViewEntity: i, onReplay: a, loading: o, totalRecords: s }) {
	let [c, l] = D(""), [d, f] = D(""), [p, m] = D(""), [h, g] = D(""), [_, y] = D("50"), [b, S] = D(""), [w, E] = D(""), [O, j] = D(null), [N, P] = D(!1), F = C(async () => {
		await t({
			entityType: c || void 0,
			entityId: d || void 0,
			fromTime: p ? new Date(p).getTime() : void 0,
			toTime: h ? new Date(h).getTime() : void 0,
			limit: _ ? Number(_) : void 0
		});
	}, [
		c,
		d,
		p,
		h,
		_,
		t
	]), I = C(async () => {
		if (!(!b || !w)) {
			P(!0);
			try {
				let e = await a(b, new Date(w).getTime());
				j(e);
			} finally {
				P(!1);
			}
		}
	}, [
		b,
		w,
		a
	]), L = T(() => [
		{
			key: "timestamp",
			header: "Timestamp",
			sortable: !0,
			render: (e) => /* @__PURE__ */ k("span", {
				className: "font-mono text-xs text-neutral",
				children: new Date(e.timestamp).toLocaleString()
			})
		},
		{
			key: "actor",
			header: "Actor",
			render: (e) => typeof e.actor == "string" ? e.actor : e.actor?.email || e.actor?.id || JSON.stringify(e.actor)
		},
		{
			key: "entityType",
			header: "Entity Type"
		},
		{
			key: "entityId",
			header: "Entity ID",
			render: (e) => /* @__PURE__ */ k(n, {
				variant: "ghost",
				size: "sm",
				className: "p-0 underline text-info-fg font-mono text-xs",
				onClick: () => i(e.entityType, e.entityId),
				children: e.entityId
			})
		},
		{
			key: "operation",
			header: "Operation"
		}
	], [i]);
	return /* @__PURE__ */ A(u, {
		title: "Audit Log",
		children: [
			/* @__PURE__ */ k(r, {
				padding: "md",
				children: /* @__PURE__ */ A("div", {
					className: "flex flex-wrap gap-4 items-end",
					children: [
						/* @__PURE__ */ A("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ k("label", {
								className: "text-xs font-semibold text-neutral uppercase tracking-wide",
								children: "Entity Type"
							}), /* @__PURE__ */ k(x, {
								className: "w-40",
								value: c,
								onChange: (e) => l(e.target.value),
								options: [{
									value: "",
									label: "All"
								}, ...ne.filter(Boolean).map((e) => ({
									value: e,
									label: e
								}))]
							})]
						}),
						/* @__PURE__ */ A("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ k("label", {
								className: "text-xs font-semibold text-neutral uppercase tracking-wide",
								children: "Entity ID"
							}), /* @__PURE__ */ k(v, {
								className: "w-44",
								value: d,
								onChange: (e) => f(e.target.value),
								placeholder: "Optional"
							})]
						}),
						/* @__PURE__ */ A("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ k("label", {
								className: "text-xs font-semibold text-neutral uppercase tracking-wide",
								children: "From"
							}), /* @__PURE__ */ k(v, {
								className: "w-52",
								type: "datetime-local",
								value: p,
								onChange: (e) => m(e.target.value)
							})]
						}),
						/* @__PURE__ */ A("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ k("label", {
								className: "text-xs font-semibold text-neutral uppercase tracking-wide",
								children: "To"
							}), /* @__PURE__ */ k(v, {
								className: "w-52",
								type: "datetime-local",
								value: h,
								onChange: (e) => g(e.target.value)
							})]
						}),
						/* @__PURE__ */ A("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ k("label", {
								className: "text-xs font-semibold text-neutral uppercase tracking-wide",
								children: "Limit"
							}), /* @__PURE__ */ k(v, {
								className: "w-[70px]",
								type: "number",
								value: _,
								onChange: (e) => y(e.target.value)
							})]
						}),
						/* @__PURE__ */ k(n, {
							variant: "primary",
							size: "lg",
							onClick: F,
							disabled: o,
							children: o ? "Querying..." : "Query"
						})
					]
				})
			}),
			s !== void 0 && /* @__PURE__ */ A("p", {
				className: "text-sm text-text-tertiary m-0",
				children: [s, " total record(s)"]
			}),
			/* @__PURE__ */ k(M, {
				columns: L,
				data: e,
				keyField: "timestamp",
				loading: o,
				emptyMessage: "No audit records found. Adjust filters and query.",
				emptyIcon: "📜"
			}),
			/* @__PURE__ */ A(r, {
				padding: "md",
				children: [
					/* @__PURE__ */ k("h3", {
						className: "text-base font-semibold text-text-primary mb-4 mt-0",
						children: "Point-in-Time Replay"
					}),
					/* @__PURE__ */ A("div", {
						className: "flex flex-wrap gap-4 items-end mb-4",
						children: [
							/* @__PURE__ */ A("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ k("label", {
									className: "text-xs font-semibold text-neutral uppercase tracking-wide",
									children: "Entity ID"
								}), /* @__PURE__ */ k(v, {
									className: "w-44",
									value: b,
									onChange: (e) => S(e.target.value),
									placeholder: "entity-id"
								})]
							}),
							/* @__PURE__ */ A("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ k("label", {
									className: "text-xs font-semibold text-neutral uppercase tracking-wide",
									children: "At Timestamp"
								}), /* @__PURE__ */ k(v, {
									className: "w-52",
									type: "datetime-local",
									value: w,
									onChange: (e) => E(e.target.value)
								})]
							}),
							/* @__PURE__ */ k(n, {
								variant: "primary",
								size: "lg",
								onClick: I,
								disabled: N || !b || !w,
								children: N ? "Replaying..." : "Replay"
							})
						]
					}),
					O && /* @__PURE__ */ k("pre", {
						className: "p-4 bg-surface-panel border border-border rounded-md font-mono text-xs text-text-primary overflow-x-auto whitespace-pre-wrap max-h-[300px] overflow-y-auto m-0",
						children: JSON.stringify(O, null, 2)
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/identity/admin/SetupGuidePage.tsx
function ie({ status: t, onNavigate: i }) {
	let [a, o] = D(null), s = C((e) => {
		o((t) => t === e ? null : e);
	}, []), c = T(() => [
		{
			title: "Create User Pool",
			done: t.hasUserPools,
			content: /* @__PURE__ */ A("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ k("p", {
					className: "m-0 text-sm text-text-secondary",
					children: t.hasUserPools ? `${t.poolCount} pool(s) configured.` : "No user pools yet."
				}), /* @__PURE__ */ k("div", { children: /* @__PURE__ */ k(n, {
					variant: "ghost",
					size: "sm",
					onClick: () => i("/identity/admin/pools/new"),
					children: "Create a User Pool"
				}) })]
			})
		},
		{
			title: "Register Application",
			done: t.hasClients,
			content: /* @__PURE__ */ A("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ k("p", {
					className: "m-0 text-sm text-text-secondary",
					children: t.hasClients ? `${t.clientCount} application(s) registered.` : "No applications registered."
				}), /* @__PURE__ */ k("div", { children: /* @__PURE__ */ k(n, {
					variant: "ghost",
					size: "sm",
					onClick: () => i("/identity/admin/applications/new"),
					children: "Register an Application"
				}) })]
			})
		},
		{
			title: "Create Admin User",
			done: t.hasAdminUser,
			content: /* @__PURE__ */ A("div", {
				className: "flex flex-col gap-2",
				children: [t.hasAdminUser ? /* @__PURE__ */ A(O, { children: [/* @__PURE__ */ A("p", {
					className: "m-0 text-sm text-text-secondary",
					children: ["Admin users: ", t.adminEmails.join(", ")]
				}), /* @__PURE__ */ A("p", {
					className: "m-0 text-sm text-text-secondary",
					children: [t.totalUsers, " total user(s) across all pools."]
				})] }) : /* @__PURE__ */ k("p", {
					className: "m-0 text-sm text-text-secondary",
					children: "No admin user found. Create one in a user pool."
				}), t.firstPoolId && /* @__PURE__ */ k("div", { children: /* @__PURE__ */ k(n, {
					variant: "ghost",
					size: "sm",
					onClick: () => i(`/identity/admin/pools/${t.firstPoolId}/users/new`),
					children: "Create Admin User"
				}) })]
			})
		},
		{
			title: "Configure SMTP",
			done: t.smtpConfigured,
			content: /* @__PURE__ */ k("p", {
				className: "m-0 text-sm text-text-secondary",
				children: t.smtpConfigured ? `SMTP configured: ${t.smtpHost}` : "SMTP is not yet configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS environment variables."
			})
		},
		{
			title: "Configure Issuer",
			done: t.issuerConfigured,
			content: /* @__PURE__ */ A("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ A("p", {
					className: "m-0 text-sm text-text-secondary",
					children: ["Issuer: ", /* @__PURE__ */ k("code", {
						className: "px-1.5 py-0.5 bg-surface-hover rounded text-xs font-mono",
						children: t.issuer || "Not set"
					})]
				}), t.wellKnownUrl && /* @__PURE__ */ A("p", {
					className: "m-0 text-sm text-text-secondary",
					children: [
						"Well-known URL:",
						" ",
						/* @__PURE__ */ k("a", {
							href: t.wellKnownUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-info-fg underline",
							children: t.wellKnownUrl
						})
					]
				})]
			})
		},
		{
			title: "Test Integration",
			done: t.hasUserPools && t.hasClients && t.issuerConfigured,
			content: /* @__PURE__ */ k("div", {
				className: "flex flex-col gap-3",
				children: t.firstClientId ? /* @__PURE__ */ A(O, { children: [
					/* @__PURE__ */ A("p", {
						className: "m-0 text-sm text-text-secondary",
						children: ["Client ID: ", /* @__PURE__ */ k("code", {
							className: "px-1.5 py-0.5 bg-surface-hover rounded text-xs font-mono",
							children: t.firstClientId
						})]
					}),
					/* @__PURE__ */ k("p", {
						className: "m-0 text-sm text-text-secondary",
						children: "Use this code snippet to test the OIDC authorization flow:"
					}),
					/* @__PURE__ */ k("pre", {
						className: "px-4 py-3 bg-surface-inverse text-text-inverse rounded-md font-mono text-xs overflow-x-auto whitespace-pre m-0",
						children: `// OIDC Authorization Code Flow
const authUrl = \`\${issuer}/authorize?\` + new URLSearchParams({
  client_id: '${t.firstClientId}',
  response_type: 'code',
  redirect_uri: 'http://localhost:3000/callback',
  scope: 'openid profile email',
}).toString();

window.location.href = authUrl;`
					})
				] }) : /* @__PURE__ */ k("p", {
					className: "m-0 text-sm text-text-secondary",
					children: "Complete the previous steps first to test the integration."
				})
			})
		}
	], [t, i]), l = c.filter((e) => e.done).length, d = Math.round(l / c.length * 100);
	return /* @__PURE__ */ A(u, {
		title: "Setup Guide",
		description: `${l} of ${c.length} steps completed (${d}%)`,
		children: [/* @__PURE__ */ k("div", {
			className: "h-2 bg-surface-hover rounded-full overflow-hidden",
			children: /* @__PURE__ */ k("div", {
				className: "h-full bg-success rounded-full transition-[width] duration-300 ease-in-out",
				style: { width: `${d}%` }
			})
		}), /* @__PURE__ */ k("div", {
			className: "flex flex-col gap-2",
			children: c.map((t, n) => /* @__PURE__ */ A(r, { children: [/* @__PURE__ */ A("div", {
				className: "flex items-center justify-between px-5 py-4 cursor-pointer select-none",
				onClick: () => s(n),
				role: "button",
				"aria-expanded": a === n,
				children: [/* @__PURE__ */ A("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ k("div", {
						className: e("w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0", t.done ? "bg-success text-white" : "bg-surface-hover text-text-tertiary"),
						children: t.done ? "✓" : n + 1
					}), /* @__PURE__ */ k("span", {
						className: "text-sm font-medium text-text-primary",
						children: t.title
					})]
				}), /* @__PURE__ */ k("span", {
					className: "text-text-tertiary text-sm",
					children: a === n ? "▲" : "▼"
				})]
			}), a === n && /* @__PURE__ */ k("div", {
				className: "px-5 pb-5 pt-0 border-t border-border-subtle",
				children: /* @__PURE__ */ k("div", {
					className: "pt-4",
					children: t.content
				})
			})] }, n))
		})]
	});
}
//#endregion
//#region src/components/identity/admin/DiagnosticsPage.tsx
function ae({ data: e }) {
	return /* @__PURE__ */ k("pre", {
		className: "p-5 font-mono text-xs text-text-primary overflow-x-auto whitespace-pre-wrap max-h-[400px] overflow-y-auto m-0 bg-surface-panel",
		children: JSON.stringify(e, null, 2)
	});
}
function oe({ rates: e }) {
	let t = Object.entries(e);
	return t.length === 0 ? /* @__PURE__ */ k("p", {
		className: "p-5 text-center text-text-tertiary text-sm m-0",
		children: "No rate limiter data available."
	}) : /* @__PURE__ */ A(o, { children: [/* @__PURE__ */ k(l, { children: /* @__PURE__ */ A("tr", { children: [/* @__PURE__ */ k(s, { children: "Key" }), /* @__PURE__ */ k(s, { children: "Value" })] }) }), /* @__PURE__ */ k(i, { children: t.map(([e, t]) => /* @__PURE__ */ A(d, { children: [/* @__PURE__ */ k(a, {
		className: "font-mono text-xs",
		children: e
	}), /* @__PURE__ */ k(a, { children: typeof t == "object" ? JSON.stringify(t) : String(t) })] }, e)) })] });
}
function se({ diagnostics: e, rates: c, dlq: f, onRedrive: p, onPurge: h, onRefresh: g, loading: _ }) {
	let [v, y] = D(!1), b = E(null), x = t(g);
	w(() => (v ? b.current = setInterval(x, 1e4) : b.current &&= (clearInterval(b.current), null), () => {
		b.current && clearInterval(b.current);
	}), [v, x]);
	let T = C(async (e) => {
		await p(e);
	}, [p]), O = C(async (e) => {
		await h(e);
	}, [h]);
	return _ ? /* @__PURE__ */ k(u, {
		title: "Diagnostics",
		children: /* @__PURE__ */ k("div", {
			className: "flex flex-col gap-4",
			children: [
				1,
				2,
				3
			].map((e) => /* @__PURE__ */ k(r, { className: "h-[120px] animate-pulse" }, e))
		})
	}) : /* @__PURE__ */ A(u, {
		title: "Diagnostics",
		actions: /* @__PURE__ */ A("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ A("label", {
				className: "flex items-center gap-1.5 text-sm text-neutral cursor-pointer",
				children: [/* @__PURE__ */ k(S, {
					checked: v,
					onChange: y,
					className: "rounded"
				}), "Auto-refresh (10s)"]
			}), /* @__PURE__ */ k(n, {
				variant: "ghost",
				size: "lg",
				onClick: g,
				children: "Refresh"
			})]
		}),
		children: [
			/* @__PURE__ */ A(r, { children: [/* @__PURE__ */ k("div", {
				className: "px-5 py-3 border-b border-border bg-surface-panel",
				children: /* @__PURE__ */ k("h3", {
					className: "text-sm font-semibold text-text-primary m-0",
					children: "Node / Cluster Diagnostics"
				})
			}), e ? /* @__PURE__ */ k(ae, { data: e }) : /* @__PURE__ */ k("p", {
				className: "p-5 text-center text-text-tertiary text-sm m-0",
				children: "No diagnostics data available."
			})] }),
			/* @__PURE__ */ A(r, { children: [/* @__PURE__ */ k("div", {
				className: "px-5 py-3 border-b border-border bg-surface-panel",
				children: /* @__PURE__ */ k("h3", {
					className: "text-sm font-semibold text-text-primary m-0",
					children: "Rate Limiter Stats"
				})
			}), c ? /* @__PURE__ */ k(oe, { rates: c }) : /* @__PURE__ */ k("p", {
				className: "p-5 text-center text-text-tertiary text-sm m-0",
				children: "No rate data available."
			})] }),
			/* @__PURE__ */ A(r, { children: [/* @__PURE__ */ k("div", {
				className: "px-5 py-3 border-b border-border bg-surface-panel",
				children: /* @__PURE__ */ k("h3", {
					className: "text-sm font-semibold text-text-primary m-0",
					children: "Dead Letter Queue"
				})
			}), !f || f.length === 0 ? /* @__PURE__ */ k("p", {
				className: "p-5 text-center text-text-tertiary text-sm m-0",
				children: "Dead letter queue is empty."
			}) : /* @__PURE__ */ A(o, { children: [/* @__PURE__ */ k(l, { children: /* @__PURE__ */ A("tr", { children: [
				/* @__PURE__ */ k(s, { children: "ID" }),
				/* @__PURE__ */ k(s, { children: "Error" }),
				/* @__PURE__ */ k(s, { children: "Failed At" }),
				/* @__PURE__ */ k(s, { children: "Retries" }),
				/* @__PURE__ */ k(s, {
					className: "text-right",
					children: "Actions"
				})
			] }) }), /* @__PURE__ */ k(i, { children: f.map((e) => /* @__PURE__ */ A(d, { children: [
				/* @__PURE__ */ A(a, {
					className: "font-mono text-xs",
					children: [e.id.substring(0, 12), "..."]
				}),
				/* @__PURE__ */ k(a, { children: /* @__PURE__ */ k(m, {
					tone: "danger",
					size: "xs",
					children: e.error
				}) }),
				/* @__PURE__ */ k(a, {
					className: "text-xs text-neutral",
					children: new Date(e.failedAt).toLocaleString()
				}),
				/* @__PURE__ */ k(a, { children: /* @__PURE__ */ k(m, {
					tone: "neutral",
					size: "xs",
					mono: !0,
					children: e.retryCount
				}) }),
				/* @__PURE__ */ k(a, {
					className: "text-right",
					children: /* @__PURE__ */ A("div", {
						className: "flex items-center justify-end gap-2",
						children: [/* @__PURE__ */ k(n, {
							variant: "ghost",
							size: "sm",
							onClick: () => T(e.id),
							children: "Redrive"
						}), /* @__PURE__ */ k(n, {
							variant: "danger",
							size: "sm",
							onClick: () => O(e.id),
							children: "Purge"
						})]
					})
				})
			] }, e.id)) })] })] })
		]
	});
}
//#endregion
//#region src/components/identity/auth/LoginPage.tsx
function ce({ uid: t, interactionUrl: r, clientName: i, logoUrl: a, error: o = null, onLogin: s, onRegister: c, onForgotPassword: l, registrationEnabled: u = !0, forgotPasswordEnabled: d = !0, defaultTab: f = "signin" }) {
	let [m, h] = D(() => f === "register" && !u || f === "forgot" && !d ? "signin" : f), [g, _] = D(!1), [v, y] = D(null), [x, S] = D(""), [w, T] = D(""), [E, j] = D(""), [M, N] = D(""), [F, I] = D(""), [L, R] = D(""), [z, ee] = D(""), [B, V] = D(!1), [H, U] = D(""), [W, G] = D(!1), K = o || v, q = C(async (e) => {
		e.preventDefault(), y(null), _(!0);
		try {
			await s(x, w);
		} catch (e) {
			y(e instanceof Error ? e.message : "Login failed");
		} finally {
			_(!1);
		}
	}, [
		x,
		w,
		s
	]), J = C(async (e) => {
		if (e.preventDefault(), y(null), M !== F) {
			y("Passwords do not match");
			return;
		}
		_(!0);
		try {
			await c({
				email: E,
				password: M,
				givenName: L || void 0,
				familyName: z || void 0,
				enableMfa: B || void 0
			});
		} catch (e) {
			y(e instanceof Error ? e.message : "Registration failed");
		} finally {
			_(!1);
		}
	}, [
		E,
		M,
		F,
		L,
		z,
		B,
		c
	]), Y = C(async (e) => {
		e.preventDefault(), y(null), _(!0);
		try {
			await l(H), G(!0);
		} catch (e) {
			y(e instanceof Error ? e.message : "Request failed");
		} finally {
			_(!1);
		}
	}, [H, l]), X = (e) => {
		h(e), y(null), G(!1);
	};
	return /* @__PURE__ */ k("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ A("div", {
			className: "w-full max-w-[440px] bg-white rounded-xl shadow-md p-8",
			role: "main",
			"aria-label": "Authentication",
			children: [
				/* @__PURE__ */ A("header", {
					className: "flex flex-col items-center gap-3 mb-6",
					children: [a && /* @__PURE__ */ k("img", {
						src: a,
						alt: "",
						className: "w-14 h-14 object-contain rounded-md"
					}), i && /* @__PURE__ */ k("h1", {
						className: "text-xl font-bold text-text-primary m-0",
						children: i
					})]
				}),
				/* @__PURE__ */ A("div", {
					className: "flex border-b border-border mb-6",
					role: "tablist",
					"aria-label": "Authentication method",
					onKeyDown: b,
					children: [
						/* @__PURE__ */ k(n, {
							variant: "ghost",
							size: "sm",
							role: "tab",
							"aria-selected": m === "signin",
							tabIndex: m === "signin" ? 0 : -1,
							className: e("flex-1 rounded-none border-b-2", m === "signin" ? "border-b-info text-info-fg font-semibold" : "border-b-transparent text-neutral font-normal"),
							onClick: () => X("signin"),
							children: "Sign In"
						}),
						u && /* @__PURE__ */ k(n, {
							variant: "ghost",
							size: "sm",
							role: "tab",
							"aria-selected": m === "register",
							tabIndex: m === "register" ? 0 : -1,
							className: e("flex-1 rounded-none border-b-2", m === "register" ? "border-b-info text-info-fg font-semibold" : "border-b-transparent text-neutral font-normal"),
							onClick: () => X("register"),
							children: "Register"
						}),
						d && /* @__PURE__ */ k(n, {
							variant: "ghost",
							size: "sm",
							role: "tab",
							"aria-selected": m === "forgot",
							tabIndex: m === "forgot" ? 0 : -1,
							className: e("flex-1 rounded-none border-b-2", m === "forgot" ? "border-b-info text-info-fg font-semibold" : "border-b-transparent text-neutral font-normal"),
							onClick: () => X("forgot"),
							children: "Forgot Password"
						})
					]
				}),
				K && /* @__PURE__ */ k("div", {
					className: "mb-5",
					children: /* @__PURE__ */ k(p, {
						variant: "error",
						children: K
					})
				}),
				m === "signin" && /* @__PURE__ */ A("form", {
					onSubmit: q,
					"aria-label": "Sign in form",
					children: [
						/* @__PURE__ */ k("input", {
							type: "hidden",
							name: "uid",
							value: t
						}),
						/* @__PURE__ */ k(P, {
							label: "Email",
							name: "login-email",
							type: "email",
							value: x,
							onChange: (e) => S(String(e)),
							required: !0,
							placeholder: "you@example.com",
							disabled: g
						}),
						/* @__PURE__ */ k(P, {
							label: "Password",
							name: "login-password",
							type: "password",
							value: w,
							onChange: (e) => T(String(e)),
							required: !0,
							disabled: g
						}),
						/* @__PURE__ */ k(n, {
							type: "submit",
							variant: "primary",
							size: "lg",
							fullWidth: !0,
							disabled: g,
							children: g ? "Signing in..." : "Sign In"
						})
					]
				}),
				m === "register" && /* @__PURE__ */ A("form", {
					onSubmit: J,
					"aria-label": "Registration form",
					children: [
						/* @__PURE__ */ k(P, {
							label: "Email",
							name: "reg-email",
							type: "email",
							value: E,
							onChange: (e) => j(String(e)),
							required: !0,
							placeholder: "you@example.com",
							disabled: g
						}),
						/* @__PURE__ */ A("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ k("div", {
								className: "flex-1",
								children: /* @__PURE__ */ k(P, {
									label: "Given Name",
									name: "reg-given",
									value: L,
									onChange: (e) => R(String(e)),
									disabled: g
								})
							}), /* @__PURE__ */ k("div", {
								className: "flex-1",
								children: /* @__PURE__ */ k(P, {
									label: "Family Name",
									name: "reg-family",
									value: z,
									onChange: (e) => ee(String(e)),
									disabled: g
								})
							})]
						}),
						/* @__PURE__ */ k(P, {
							label: "Password",
							name: "reg-password",
							type: "password",
							value: M,
							onChange: (e) => N(String(e)),
							required: !0,
							disabled: g
						}),
						/* @__PURE__ */ k(P, {
							label: "Confirm Password",
							name: "reg-confirm",
							type: "password",
							value: F,
							onChange: (e) => I(String(e)),
							required: !0,
							disabled: g
						}),
						/* @__PURE__ */ k(P, {
							label: "Enable Multi-Factor Authentication",
							name: "reg-mfa",
							type: "checkbox",
							value: B,
							onChange: (e) => V(!!e),
							disabled: g
						}),
						/* @__PURE__ */ k(n, {
							type: "submit",
							variant: "primary",
							size: "lg",
							fullWidth: !0,
							disabled: g,
							children: g ? "Creating account..." : "Create Account"
						})
					]
				}),
				m === "forgot" && /* @__PURE__ */ k("form", {
					onSubmit: Y,
					"aria-label": "Forgot password form",
					children: W ? /* @__PURE__ */ k(p, {
						variant: "success",
						children: "If an account exists for that email, a password reset link has been sent."
					}) : /* @__PURE__ */ A(O, { children: [
						/* @__PURE__ */ k("p", {
							className: "text-sm text-neutral mb-4 mt-0 leading-relaxed",
							children: "Enter your email address and we'll send you a link to reset your password."
						}),
						/* @__PURE__ */ k(P, {
							label: "Email",
							name: "forgot-email",
							type: "email",
							value: H,
							onChange: (e) => U(String(e)),
							required: !0,
							placeholder: "you@example.com",
							disabled: g
						}),
						/* @__PURE__ */ k(n, {
							type: "submit",
							variant: "primary",
							size: "lg",
							fullWidth: !0,
							disabled: g,
							children: g ? "Sending..." : "Send Reset Link"
						})
					] })
				})
			]
		})
	});
}
//#endregion
//#region src/components/identity/auth/ConsentPage.tsx
var le = {
	openid: "Verify your identity",
	profile: "Access your name and profile information",
	email: "Access your email address",
	address: "Access your mailing address",
	phone: "Access your phone number",
	offline_access: "Maintain access when you are not present"
};
function ue(e) {
	return le[e] || `Access: ${e}`;
}
function de({ clientName: t, scopes: r, redirectUri: i, onAuthorize: a, onDeny: o, logoUrl: s }) {
	let [c, l] = D(!1), u = C(async () => {
		l(!0);
		try {
			await a();
		} finally {
			l(!1);
		}
	}, [a]), d = C(async () => {
		l(!0);
		try {
			await o();
		} finally {
			l(!1);
		}
	}, [o]);
	return /* @__PURE__ */ k("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ A("div", {
			className: "w-full max-w-[440px] bg-white rounded-xl shadow-md overflow-hidden",
			role: "main",
			"aria-label": "Authorization consent",
			children: [
				/* @__PURE__ */ A("header", {
					className: "flex flex-col items-center gap-3 px-8 pt-8 pb-5",
					children: [
						s && /* @__PURE__ */ k("img", {
							src: s,
							alt: "",
							className: "w-14 h-14 object-contain rounded-md"
						}),
						/* @__PURE__ */ A("h1", {
							className: "text-xl font-bold text-text-primary m-0 text-center",
							children: ["Authorize ", t]
						}),
						/* @__PURE__ */ k("p", {
							className: "text-sm text-neutral m-0 text-center leading-relaxed",
							children: "This application is requesting access to your account."
						})
					]
				}),
				/* @__PURE__ */ A("div", {
					className: "mx-8 border border-border rounded-md overflow-hidden mb-6",
					children: [/* @__PURE__ */ k("p", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-neutral px-4 py-2.5 m-0 bg-surface-panel border-b border-border",
						children: "Requested Permissions"
					}), /* @__PURE__ */ k("ul", {
						className: "list-none p-0 m-0",
						"aria-label": "Requested permissions",
						children: r.map((t, n) => /* @__PURE__ */ A("li", {
							className: e("flex items-center gap-3 px-4 py-3 text-sm text-text-primary", n < r.length - 1 && "border-b border-border"),
							children: [/* @__PURE__ */ k("span", {
								className: "w-2 h-2 rounded-full bg-info shrink-0",
								"aria-hidden": "true"
							}), /* @__PURE__ */ k("span", { children: ue(t) })]
						}, t))
					})]
				}),
				/* @__PURE__ */ A("div", {
					className: "px-8 pb-8",
					children: [i && /* @__PURE__ */ A("p", {
						className: "text-[11px] text-text-tertiary mb-5 mt-0 break-all leading-relaxed",
						children: ["You will be redirected to: ", /* @__PURE__ */ k("strong", {
							className: "text-neutral",
							children: i
						})]
					}), /* @__PURE__ */ A("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ k(n, {
							variant: "ghost",
							size: "lg",
							fullWidth: !0,
							onClick: d,
							disabled: c,
							children: "Deny"
						}), /* @__PURE__ */ k(n, {
							variant: "primary",
							size: "lg",
							fullWidth: !0,
							onClick: u,
							disabled: c,
							children: c ? "Authorizing..." : "Authorize"
						})]
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/identity/shared/QrCodeDisplay.tsx
function Z({ value: e, size: t = 200, label: n }) {
	return /* @__PURE__ */ A("figure", {
		className: "flex flex-col items-center gap-2 m-0 p-4 border border-border rounded-md bg-white",
		children: [/* @__PURE__ */ k("img", {
			src: e,
			alt: n || "QR Code",
			width: t,
			height: t,
			className: "block rounded-sm [image-rendering:pixelated]"
		}), n && /* @__PURE__ */ k("figcaption", {
			className: "text-sm text-neutral text-center",
			children: n
		})]
	});
}
//#endregion
//#region src/components/identity/shared/CodeInput.tsx
function Q({ length: t = 6, onComplete: n, error: r = null, disabled: i = !1, autoFocus: a = !1 }) {
	let [o, s] = D(Array(t).fill("")), c = E([]);
	w(() => {
		a && c.current[0] && c.current[0].focus();
	}, [a]);
	let l = C((e) => {
		e >= 0 && e < t && c.current[e] && (c.current[e].focus(), c.current[e].select());
	}, [t]), u = E(null);
	w(() => {
		let e = o.join("");
		if (!(e.length === t && o.every((e) => e !== ""))) {
			u.current = null;
			return;
		}
		u.current !== e && (u.current = e, n(e));
	}, [
		o,
		t,
		n
	]);
	let d = C((e, n) => {
		let r = n.replace(/\D/g, "").slice(-1);
		s((t) => {
			let n = [...t];
			if (n[e] = r, r && t.every((e) => e !== "")) for (let t = e + 1; t < n.length; t++) n[t] = "";
			return n;
		}), r && e < t - 1 && l(e + 1);
	}, [t, l]), f = C((e, n) => {
		n.key === "Backspace" ? o[e] === "" && e > 0 ? (n.preventDefault(), s((t) => {
			let n = [...t];
			return n[e - 1] = "", n;
		}), l(e - 1)) : s((t) => {
			let n = [...t];
			return n[e] = "", n;
		}) : n.key === "ArrowLeft" && e > 0 ? (n.preventDefault(), l(e - 1)) : n.key === "ArrowRight" && e < t - 1 && (n.preventDefault(), l(e + 1));
	}, [
		o,
		t,
		l
	]), p = C((e) => {
		e.preventDefault();
		let n = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, t);
		if (!n) return;
		let r = Array(t).fill("");
		for (let e = 0; e < n.length; e++) r[e] = n[e];
		s(r), n.length < t && l(Math.min(n.length, t - 1));
	}, [t, l]);
	return /* @__PURE__ */ A("div", {
		className: "flex flex-col items-center gap-2",
		children: [/* @__PURE__ */ k("div", {
			className: "flex gap-2",
			role: "group",
			"aria-label": "Verification code input",
			children: Array.from({ length: t }, (n, a) => /* @__PURE__ */ k("input", {
				ref: (e) => {
					c.current[a] = e;
				},
				type: "text",
				inputMode: "numeric",
				pattern: "[0-9]",
				maxLength: 1,
				value: o[a],
				disabled: i,
				"aria-label": `Digit ${a + 1} of ${t}`,
				onChange: (e) => d(a, e.target.value),
				onKeyDown: (e) => f(a, e),
				onPaste: p,
				onFocus: (e) => e.target.select(),
				className: e("w-11 h-[52px] text-center text-lg font-semibold font-[inherit]", "rounded-md outline-none transition-[border-color,box-shadow] duration-150", "border-2", r ? "border-danger" : "border-border", i ? "bg-surface-panel cursor-not-allowed" : "bg-white cursor-text", "text-text-primary", "focus:border-info focus:ring-2 focus:ring-info/20")
			}, a))
		}), r && /* @__PURE__ */ k("p", {
			role: "alert",
			className: "m-0 text-sm text-danger-fg",
			children: r
		})]
	});
}
//#endregion
//#region src/components/identity/auth/MfaSetupPage.tsx
var $ = [
	"name",
	"scan",
	"verify",
	"backup"
], fe = [
	"Name",
	"Scan",
	"Verify",
	"Backup"
];
function pe({ onSetup: t, onVerify: r, onComplete: i, userEmail: a, initialStep: o = "name", initialSetupResult: s, initialDeviceName: c = "" }) {
	let [l, u] = D(o === "scan" && !s ? "name" : o), [d, f] = D(!1), [m, h] = D(null), [g, _] = D(c), [v, y] = D(s ?? null), [b, x] = D(s?.backupCodes ?? []), [S, T] = D(!1), O = $.indexOf(l), j = C(async (e) => {
		if (e.preventDefault(), g.trim()) {
			h(null), f(!0);
			try {
				let e = await t(g.trim());
				y(e), x(e.backupCodes), u("scan");
			} catch (e) {
				h(e instanceof Error ? e.message : "Setup failed");
			} finally {
				f(!1);
			}
		}
	}, [g, t]), M = C(async (e) => {
		if (v) {
			h(null), f(!0);
			try {
				let t = await r(v.deviceId, e);
				t.success ? (t.backupCodes && x(t.backupCodes), u("backup")) : h("Verification failed. Please try again.");
			} catch (e) {
				h(e instanceof Error ? e.message : "Verification failed");
			} finally {
				f(!1);
			}
		}
	}, [v, r]), N = E(null);
	w(() => () => {
		N.current && clearTimeout(N.current);
	}, []);
	let F = C(async () => {
		try {
			await navigator.clipboard.writeText(b.join("\n")), T(!0), N.current && clearTimeout(N.current), N.current = setTimeout(() => T(!1), 2e3);
		} catch {}
	}, [b]);
	return /* @__PURE__ */ k("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ A("div", {
			className: "w-full max-w-[480px] bg-white rounded-xl shadow-md p-8",
			role: "main",
			"aria-label": "MFA setup",
			children: [
				/* @__PURE__ */ k("h1", {
					className: "text-xl font-bold text-text-primary mb-2 mt-0 text-center",
					children: "Set Up Multi-Factor Authentication"
				}),
				a && /* @__PURE__ */ k("p", {
					className: "text-sm text-neutral mb-5 mt-0 text-center",
					children: a
				}),
				/* @__PURE__ */ k("div", {
					className: "flex justify-center gap-6 mb-6",
					role: "group",
					"aria-label": "Setup progress",
					children: $.map((t, n) => /* @__PURE__ */ A("div", {
						className: "flex flex-col items-center gap-1.5",
						children: [/* @__PURE__ */ k("div", {
							className: e("w-3 h-3 rounded-full transition-colors duration-200", n < O ? "bg-success" : n === O ? "bg-info" : "bg-surface-emphasis"),
							"aria-label": `Step ${n + 1}${n === O ? " (current)" : n < O ? " (completed)" : ""}`
						}), /* @__PURE__ */ k("span", {
							className: e("text-[10px] uppercase tracking-wide font-medium", n === O ? "text-text-primary" : "text-text-tertiary"),
							children: fe[n]
						})]
					}, t))
				}),
				m && /* @__PURE__ */ k("div", {
					className: "mb-5",
					children: /* @__PURE__ */ k(p, {
						variant: "error",
						children: m
					})
				}),
				l === "name" && /* @__PURE__ */ A("form", {
					onSubmit: j,
					"aria-label": "Name your device",
					children: [
						/* @__PURE__ */ k("p", {
							className: "text-sm text-neutral mb-4 mt-0 text-center leading-relaxed",
							children: "Give your authenticator device a name so you can identify it later."
						}),
						/* @__PURE__ */ k(P, {
							label: "Device Name",
							name: "device-name",
							value: g,
							onChange: (e) => _(String(e)),
							required: !0,
							placeholder: "e.g., My Phone",
							disabled: d
						}),
						/* @__PURE__ */ k(n, {
							type: "submit",
							variant: "primary",
							size: "lg",
							fullWidth: !0,
							disabled: d || !g.trim(),
							children: d ? "Setting up..." : "Continue"
						})
					]
				}),
				l === "scan" && v && /* @__PURE__ */ A("div", { children: [
					/* @__PURE__ */ k(n, {
						variant: "ghost",
						size: "sm",
						className: "p-0 mb-4",
						onClick: () => u("name"),
						"aria-label": "Go back to name step",
						children: "← Back"
					}),
					/* @__PURE__ */ k("p", {
						className: "text-sm text-neutral mb-5 mt-0 text-center leading-relaxed",
						children: "Scan this QR code with your authenticator app"
					}),
					/* @__PURE__ */ k("div", {
						className: "flex justify-center mb-5",
						children: /* @__PURE__ */ k(Z, {
							value: v.qrCode,
							size: 200,
							label: g ? `Device: ${g}` : void 0
						})
					}),
					/* @__PURE__ */ k("p", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary text-center mb-2 mt-0",
						children: "Or enter this secret manually"
					}),
					/* @__PURE__ */ k("div", {
						className: "px-4 py-3 bg-surface-panel border border-border rounded-md font-mono text-sm text-text-primary break-all text-center mb-6 select-all",
						children: v.secret
					}),
					/* @__PURE__ */ k(n, {
						variant: "primary",
						size: "lg",
						fullWidth: !0,
						onClick: () => u("verify"),
						children: "I've scanned it"
					})
				] }),
				l === "verify" && /* @__PURE__ */ A("div", { children: [
					/* @__PURE__ */ k(n, {
						variant: "ghost",
						size: "sm",
						className: "p-0 mb-4",
						onClick: () => u("scan"),
						"aria-label": "Go back to scan step",
						children: "← Back"
					}),
					/* @__PURE__ */ k("p", {
						className: "text-sm text-neutral mb-6 mt-0 text-center leading-relaxed",
						children: "Enter the 6-digit code from your authenticator app to confirm setup"
					}),
					/* @__PURE__ */ k(Q, {
						onComplete: M,
						error: m,
						disabled: d,
						autoFocus: !0
					}),
					d && /* @__PURE__ */ k("p", {
						className: "text-center text-sm text-text-tertiary mt-3",
						children: "Verifying..."
					})
				] }),
				l === "backup" && /* @__PURE__ */ A("div", { children: [
					/* @__PURE__ */ k("div", {
						className: "w-14 h-14 mx-auto mb-5 rounded-full bg-success-bg flex items-center justify-center",
						children: /* @__PURE__ */ k("svg", {
							width: "28",
							height: "28",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							className: "text-success-fg",
							children: /* @__PURE__ */ k("polyline", { points: "20 6 9 17 4 12" })
						})
					}),
					/* @__PURE__ */ k("p", {
						className: "text-sm text-neutral mb-5 mt-0 text-center leading-relaxed",
						children: "Save these backup codes in a safe place. Each code can only be used once."
					}),
					/* @__PURE__ */ k("div", {
						className: "grid grid-cols-2 gap-2.5 mb-6",
						children: b.map((e, t) => /* @__PURE__ */ k("div", {
							className: "px-3 py-2.5 bg-surface-panel border border-border rounded-md font-mono text-sm text-text-primary text-center select-all",
							children: e
						}, t))
					}),
					/* @__PURE__ */ k(n, {
						variant: "primary",
						size: "lg",
						fullWidth: !0,
						onClick: F,
						children: S ? "Copied!" : "Copy All Codes"
					}),
					/* @__PURE__ */ k("div", {
						className: "mt-3",
						children: /* @__PURE__ */ k(n, {
							variant: "ghost",
							size: "lg",
							fullWidth: !0,
							onClick: i,
							children: "I've saved them — Continue"
						})
					})
				] })
			]
		})
	});
}
//#endregion
//#region src/components/identity/auth/MfaVerifyPage.tsx
function me({ onVerify: e, onVerifyBackup: t, error: r = null, defaultMode: i = "totp" }) {
	let [a, o] = D(i), [s, c] = D(!1), [l, u] = D(null), [d, f] = D(""), m = r || l, h = C(async (t) => {
		u(null), c(!0);
		try {
			await e(t);
		} catch (e) {
			u(e instanceof Error ? e.message : "Verification failed");
		} finally {
			c(!1);
		}
	}, [e]), g = C(async (e) => {
		if (e.preventDefault(), d.trim()) {
			u(null), c(!0);
			try {
				await t(d.trim());
			} catch (e) {
				u(e instanceof Error ? e.message : "Verification failed");
			} finally {
				c(!1);
			}
		}
	}, [d, t]);
	return /* @__PURE__ */ k("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ A("div", {
			className: "w-full max-w-[440px] bg-white rounded-xl shadow-md p-8",
			role: "main",
			"aria-label": "Multi-factor verification",
			children: [
				/* @__PURE__ */ k("div", {
					className: "w-14 h-14 mx-auto mb-5 rounded-full bg-info-bg flex items-center justify-center",
					children: /* @__PURE__ */ A("svg", {
						width: "28",
						height: "28",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						className: "text-info-fg",
						children: [/* @__PURE__ */ k("rect", {
							x: "3",
							y: "11",
							width: "18",
							height: "11",
							rx: "2",
							ry: "2"
						}), /* @__PURE__ */ k("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })]
					})
				}),
				/* @__PURE__ */ k("h1", {
					className: "text-xl font-bold text-text-primary mb-2 mt-0 text-center",
					children: "Verify Your Identity"
				}),
				a === "totp" ? /* @__PURE__ */ A(O, { children: [
					/* @__PURE__ */ k("p", {
						className: "text-sm text-neutral mb-6 mt-0 text-center leading-relaxed",
						children: "Enter the 6-digit code from your authenticator app"
					}),
					m && /* @__PURE__ */ k("div", {
						className: "mb-5",
						children: /* @__PURE__ */ k(p, {
							variant: "error",
							children: m
						})
					}),
					/* @__PURE__ */ k(Q, {
						onComplete: h,
						error: null,
						disabled: s,
						autoFocus: !0
					}),
					s && /* @__PURE__ */ k("p", {
						className: "text-center text-sm text-text-tertiary mt-3",
						children: "Verifying..."
					}),
					/* @__PURE__ */ k(n, {
						variant: "ghost",
						size: "sm",
						className: "block mt-6 mx-auto underline text-info-fg",
						onClick: () => {
							o("backup"), u(null);
						},
						children: "Use a backup code instead"
					})
				] }) : /* @__PURE__ */ A(O, { children: [
					/* @__PURE__ */ k("p", {
						className: "text-sm text-neutral mb-6 mt-0 text-center leading-relaxed",
						children: "Enter one of your backup codes"
					}),
					m && /* @__PURE__ */ k("div", {
						className: "mb-5",
						children: /* @__PURE__ */ k(p, {
							variant: "error",
							children: m
						})
					}),
					/* @__PURE__ */ A("form", {
						onSubmit: g,
						"aria-label": "Backup code verification",
						children: [/* @__PURE__ */ k(P, {
							label: "Backup Code",
							name: "backup-code",
							value: d,
							onChange: (e) => f(String(e)),
							required: !0,
							placeholder: "XXXX-XXXX-XXXX",
							disabled: s
						}), /* @__PURE__ */ k(n, {
							type: "submit",
							variant: "primary",
							size: "lg",
							fullWidth: !0,
							disabled: s || !d.trim(),
							children: s ? "Verifying..." : "Verify Backup Code"
						})]
					}),
					/* @__PURE__ */ k(n, {
						variant: "ghost",
						size: "sm",
						className: "block mt-6 mx-auto underline text-info-fg",
						onClick: () => {
							o("totp"), u(null);
						},
						children: "Use authenticator code instead"
					})
				] })
			]
		})
	});
}
//#endregion
//#region src/components/identity/auth/MfaDashboardPage.tsx
function he(e) {
	try {
		return new Date(e).toLocaleDateString(void 0, {
			year: "numeric",
			month: "short",
			day: "numeric"
		});
	} catch {
		return e;
	}
}
function ge({ devices: e, userEmail: t, mfaEnabled: r, onAddDevice: i, onRenameDevice: a, onRemoveDevice: o, loading: s = !1 }) {
	let [c, l] = D(null), [u, d] = D(null), [f, h] = D(""), [v, y] = D(!1), [b, x] = D(null), S = C(async () => {
		if (c) {
			y(!0), x(null);
			try {
				await o(c), l(null);
			} catch (e) {
				x(e instanceof Error ? e.message : "Failed to remove device.");
			} finally {
				y(!1);
			}
		}
	}, [c, o]), w = C(async (e) => {
		if (f.trim()) {
			y(!0), x(null);
			try {
				await a(e, f.trim()), d(null), h("");
			} catch (e) {
				x(e instanceof Error ? e.message : "Failed to rename device.");
			} finally {
				y(!1);
			}
		}
	}, [f, a]), T = (e) => {
		d(e.deviceId), h(e.deviceName), x(null);
	};
	return /* @__PURE__ */ k("div", {
		className: "min-h-full flex items-start justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ A("div", {
			className: "w-full max-w-[600px] bg-white rounded-xl shadow-md p-8",
			role: "main",
			"aria-label": "MFA device management",
			children: [
				/* @__PURE__ */ A("div", {
					className: "flex items-center justify-between mb-6 flex-wrap gap-3",
					children: [/* @__PURE__ */ A("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ k("h1", {
							className: "text-xl font-bold text-text-primary m-0",
							children: "MFA Devices"
						}), t && /* @__PURE__ */ k("p", {
							className: "text-sm text-neutral m-0",
							children: t
						})]
					}), /* @__PURE__ */ A("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ k(m, {
							tone: r ? "success" : "warning",
							children: r ? "Enabled" : "Disabled"
						}), /* @__PURE__ */ k(n, {
							variant: "primary",
							size: "md",
							onClick: i,
							children: "Add Device"
						})]
					})]
				}),
				b && !c && /* @__PURE__ */ k("div", {
					className: "mb-5",
					children: /* @__PURE__ */ k(p, {
						variant: "error",
						children: b
					})
				}),
				s && /* @__PURE__ */ k("p", {
					className: "text-center text-text-tertiary text-sm py-8",
					children: "Loading devices..."
				}),
				!s && e.length === 0 && /* @__PURE__ */ k(_, {
					icon: "🔐",
					title: "No MFA devices configured",
					body: "Add a device to secure your account with multi-factor authentication.",
					actionLabel: "Add Device",
					onAction: i
				}),
				!s && e.length > 0 && /* @__PURE__ */ k("div", {
					className: "flex flex-col gap-3",
					role: "list",
					"aria-label": "MFA devices",
					children: e.map((e) => /* @__PURE__ */ A("div", {
						className: "p-5 border border-border rounded-lg bg-white",
						role: "listitem",
						children: [
							/* @__PURE__ */ k("div", {
								className: "flex items-center justify-between mb-2",
								children: /* @__PURE__ */ k("div", {
									className: "flex items-center gap-2.5",
									children: u === e.deviceId ? /* @__PURE__ */ A("form", {
										onSubmit: (t) => {
											t.preventDefault(), w(e.deviceId);
										},
										className: "flex gap-2 items-center",
										children: [
											/* @__PURE__ */ k(P, {
												label: "",
												name: `rename-${e.deviceId}`,
												value: f,
												onChange: (e) => h(String(e)),
												disabled: v
											}),
											/* @__PURE__ */ k(n, {
												type: "submit",
												variant: "primary",
												size: "sm",
												disabled: v || !f.trim(),
												children: "Save"
											}),
											/* @__PURE__ */ k(n, {
												variant: "ghost",
												size: "sm",
												onClick: () => d(null),
												children: "Cancel"
											})
										]
									}) : /* @__PURE__ */ A(O, { children: [/* @__PURE__ */ k("h3", {
										className: "text-[15px] font-semibold text-text-primary m-0",
										children: e.deviceName
									}), /* @__PURE__ */ k(R, { status: e.isVerified ? "CONFIRMED" : "UNCONFIRMED" })] })
								})
							}),
							/* @__PURE__ */ A("p", {
								className: "text-[11px] text-text-tertiary m-0 mb-3",
								children: [
									"Type: ",
									e.deviceType,
									" · Added: ",
									he(e.createdAt),
									e.lastUsed && ` · Last used: ${he(e.lastUsed)}`
								]
							}),
							u !== e.deviceId && /* @__PURE__ */ A("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ k(n, {
									variant: "ghost",
									size: "sm",
									onClick: () => T(e),
									children: "Rename"
								}), /* @__PURE__ */ k(n, {
									variant: "danger",
									size: "sm",
									onClick: () => {
										l(e.deviceId), x(null);
									},
									children: "Remove"
								})]
							})
						]
					}, e.deviceId))
				}),
				/* @__PURE__ */ k(g, {
					open: !!c,
					onConfirm: () => {
						S();
					},
					onCancel: () => {
						l(null), x(null);
					},
					title: "Remove Device",
					body: "Are you sure you want to remove this MFA device? You will no longer be able to use it for verification.",
					confirmLabel: v ? "Removing..." : "Remove",
					confirmDisabled: v,
					tone: "destructive",
					children: b && /* @__PURE__ */ k(p, {
						variant: "error",
						children: b
					})
				})
			]
		})
	});
}
//#endregion
//#region src/components/identity/auth/LogoutPage.tsx
function _e({ onConfirm: e, onCancel: t, clientName: r }) {
	return /* @__PURE__ */ k("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ A("div", {
			className: "w-full max-w-[420px] bg-white rounded-xl shadow-md p-8 text-center",
			role: "main",
			"aria-label": "Sign out confirmation",
			children: [
				/* @__PURE__ */ k("div", {
					className: "w-14 h-14 mx-auto mb-5 rounded-full bg-danger-bg flex items-center justify-center",
					children: /* @__PURE__ */ A("svg", {
						width: "28",
						height: "28",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						className: "text-danger-fg",
						children: [
							/* @__PURE__ */ k("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
							/* @__PURE__ */ k("polyline", { points: "16 17 21 12 16 7" }),
							/* @__PURE__ */ k("line", {
								x1: "21",
								y1: "12",
								x2: "9",
								y2: "12"
							})
						]
					})
				}),
				/* @__PURE__ */ k("h1", {
					className: "text-xl font-bold text-text-primary mb-3 mt-0",
					children: "Sign Out"
				}),
				/* @__PURE__ */ A("p", {
					className: "text-sm text-neutral mb-6 mt-0 leading-relaxed",
					children: [
						"Are you sure you want to sign out",
						r ? /* @__PURE__ */ A(O, { children: [" from ", /* @__PURE__ */ k("strong", {
							className: "text-text-primary",
							children: r
						})] }) : "",
						"? You will need to sign in again to access your account."
					]
				}),
				/* @__PURE__ */ A("div", {
					className: "flex gap-3 justify-center",
					children: [t && /* @__PURE__ */ k(n, {
						variant: "ghost",
						size: "lg",
						fullWidth: !0,
						onClick: t,
						children: "Cancel"
					}), /* @__PURE__ */ k(n, {
						variant: "danger-solid",
						size: "lg",
						fullWidth: !0,
						onClick: e,
						children: "Sign Out"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/identity/auth/ErrorPage.tsx
function ve({ title: e = "Something went wrong", message: t, error: r, onRetry: i, onBack: a }) {
	return /* @__PURE__ */ k("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ A("div", {
			className: "w-full max-w-[420px] bg-white rounded-xl shadow-md p-8 text-center",
			role: "main",
			"aria-label": "Error",
			children: [
				/* @__PURE__ */ k("div", {
					className: "w-14 h-14 rounded-full bg-danger-bg flex items-center justify-center mx-auto mb-5",
					"aria-hidden": "true",
					children: /* @__PURE__ */ A("svg", {
						width: "28",
						height: "28",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						className: "text-danger-fg",
						children: [
							/* @__PURE__ */ k("circle", {
								cx: "12",
								cy: "12",
								r: "10"
							}),
							/* @__PURE__ */ k("line", {
								x1: "15",
								y1: "9",
								x2: "9",
								y2: "15"
							}),
							/* @__PURE__ */ k("line", {
								x1: "9",
								y1: "9",
								x2: "15",
								y2: "15"
							})
						]
					})
				}),
				/* @__PURE__ */ k("h1", {
					className: "text-xl font-bold text-text-primary mb-3 mt-0",
					children: e
				}),
				/* @__PURE__ */ k("p", {
					className: "text-sm text-neutral mb-3 mt-0 leading-relaxed",
					children: t
				}),
				r && /* @__PURE__ */ k("code", {
					className: "text-[11px] text-text-tertiary font-mono mb-5 px-3.5 py-2 bg-surface-panel border border-border rounded-md inline-block max-w-full overflow-x-auto",
					children: r
				}),
				(i || a) && /* @__PURE__ */ A("div", {
					className: "flex gap-3 justify-center mt-6",
					children: [a && /* @__PURE__ */ k(n, {
						variant: "ghost",
						size: "lg",
						onClick: a,
						children: "Go Back"
					}), i && /* @__PURE__ */ k(n, {
						variant: "primary",
						size: "lg",
						onClick: i,
						children: "Try Again"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/identity/shared/IdentityAdminLayout.tsx
var ye = [
	{
		label: "Dashboard",
		path: "/identity/admin",
		icon: "⌂"
	},
	{
		label: "Pools",
		path: "/identity/admin/pools",
		icon: "☰"
	},
	{
		label: "Applications",
		path: "/identity/admin/applications",
		icon: "⬚"
	},
	{
		label: "Email Templates",
		path: "/identity/admin/email-templates",
		icon: "✉"
	},
	{
		label: "Audit",
		path: "/identity/admin/audit",
		icon: "⌸"
	},
	{
		label: "Diagnostics",
		path: "/identity/admin/diagnostics",
		icon: "⚙"
	},
	{
		label: "Setup Guide",
		path: "/identity/admin/setup",
		icon: "✓"
	}
];
function be({ item: t, active: n, onNavigate: r }) {
	return /* @__PURE__ */ k("li", { children: /* @__PURE__ */ A("button", {
		type: "button",
		className: e("flex items-center gap-2 w-full text-left px-3 py-2 text-sm font-medium cursor-pointer", "border-none rounded-none border-l-[3px] transition-colors", n ? "bg-surface-panel text-info-fg font-semibold border-l-info" : "bg-transparent text-text-primary border-l-transparent hover:bg-surface-hover"),
		onClick: () => r(t.path),
		"aria-current": n ? "page" : void 0,
		children: [/* @__PURE__ */ k("span", { children: t.icon }), /* @__PURE__ */ k("span", { children: t.label })]
	}) });
}
function xe({ children: t, activePath: r, adminEmail: i, onNavigate: a, onLogout: o, defaultSidebarOpen: s = !0 }) {
	let [c, l] = D(s), u = C(() => l((e) => !e), []);
	return /* @__PURE__ */ A("div", {
		className: "flex min-h-screen bg-surface-panel font-[inherit]",
		children: [/* @__PURE__ */ A("aside", {
			className: e("bg-white border-r border-border flex flex-col shrink-0 transition-[width] duration-200 overflow-hidden", c ? "w-60" : "w-0 border-r-0"),
			children: [/* @__PURE__ */ k("div", {
				className: "p-4 font-bold text-lg text-info-fg border-b border-border",
				children: "Identity Admin"
			}), /* @__PURE__ */ k("ul", {
				className: "list-none m-0 p-0 py-2 flex-1",
				children: ye.map((e) => /* @__PURE__ */ k(be, {
					item: e,
					active: r === e.path,
					onNavigate: a
				}, e.path))
			})]
		}), /* @__PURE__ */ A("div", {
			className: "flex-1 flex flex-col min-w-0",
			children: [/* @__PURE__ */ A("header", {
				className: "flex items-center justify-between px-4 py-2 bg-white border-b border-border",
				children: [/* @__PURE__ */ k(n, {
					variant: "ghost",
					size: "sm",
					onClick: u,
					"aria-label": "Toggle sidebar",
					children: c ? "←" : "→"
				}), /* @__PURE__ */ A("div", {
					className: "flex items-center gap-4",
					children: [i && /* @__PURE__ */ k("span", {
						className: "text-sm text-neutral",
						children: i
					}), o && /* @__PURE__ */ k(n, {
						variant: "danger-solid",
						size: "sm",
						onClick: o,
						children: "Logout"
					})]
				})]
			}), /* @__PURE__ */ k("main", {
				className: "flex-1 p-6 overflow-y-auto",
				children: t
			})]
		})]
	});
}
//#endregion
//#region src/components/identity/shared/PoolScopedLayout.tsx
var Se = [
	{
		key: "users",
		label: "Users"
	},
	{
		key: "groups",
		label: "Groups"
	},
	{
		key: "mfa",
		label: "MFA"
	}
];
function Ce({ label: t, active: r, onClick: i }) {
	return /* @__PURE__ */ k(n, {
		variant: "ghost",
		size: "sm",
		className: e("rounded-none -mb-[2px] border-b-2", r ? "font-semibold text-info-fg border-b-info" : "font-normal text-neutral border-b-transparent"),
		onClick: i,
		"aria-selected": r,
		role: "tab",
		tabIndex: r ? 0 : -1,
		children: t
	});
}
function we({ children: e, poolId: t, poolName: r, activeSection: i, onNavigate: a, onBack: o }) {
	let s = C((e) => {
		a(`/identity/admin/pools/${t}/${e}`);
	}, [a, t]), c = i ? i.charAt(0).toUpperCase() + i.slice(1) : "";
	return /* @__PURE__ */ A("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ A("nav", {
				className: "flex items-center gap-1.5 text-sm text-text-tertiary",
				"aria-label": "Breadcrumb",
				children: [
					/* @__PURE__ */ k(n, {
						variant: "ghost",
						size: "sm",
						className: "p-0 underline text-info-fg",
						onClick: o,
						"aria-label": "Navigate to Pools",
						children: "Pools"
					}),
					/* @__PURE__ */ k("span", { children: "/" }),
					/* @__PURE__ */ k("span", {
						className: "text-text-primary font-medium",
						children: r
					}),
					i && /* @__PURE__ */ A(O, { children: [/* @__PURE__ */ k("span", { children: "/" }), /* @__PURE__ */ k("span", { children: c })] })
				]
			}),
			/* @__PURE__ */ k("div", { children: /* @__PURE__ */ k(n, {
				variant: "secondary",
				size: "sm",
				onClick: o,
				children: "← Back to Pools"
			}) }),
			/* @__PURE__ */ k("div", {
				role: "tablist",
				"aria-label": "Pool sections",
				onKeyDown: b,
				className: "flex border-b-2 border-border",
				children: Se.map((e) => /* @__PURE__ */ k(Ce, {
					label: e.label,
					active: i === e.key,
					onClick: () => s(e.key)
				}, e.key))
			}),
			/* @__PURE__ */ k("div", { children: e })
		]
	});
}
//#endregion
export { j as A, ee as C, P as D, F as E, N as O, B as S, R as T, Y as _, ge as a, H as b, Q as c, ce as d, se as f, X as g, te as h, _e as i, M as k, Z as l, re as m, xe as n, me as o, ie as p, ve as r, pe as s, we as t, de as u, J as v, z as w, V as x, K as y };
