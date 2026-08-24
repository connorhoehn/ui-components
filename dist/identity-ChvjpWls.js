import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-CTpms90-.js";
import { t as n } from "./Card-CcJetqWt.js";
import { a as r, c as i, i as a, l as o, n as s, o as c, r as l, s as u, t as d } from "./FormField-6WM9sVys.js";
import { t as f } from "./Banner-BLOg1hC_.js";
import { t as p } from "./Chip-2lIuHwy5.js";
import { t as m } from "./Modal-DbKyLw86.js";
import { t as h } from "./ConfirmDialog-DTHQQziN.js";
import { t as g } from "./EmptyState-CUHf5NYN.js";
import { t as _ } from "./Input-DcK2h-jK.js";
import { t as v } from "./Textarea-C3t5PCLv.js";
import { t as y } from "./rovingFocus-Bj5Y6kwY.js";
import { t as b } from "./Select-Z0TLUVeL.js";
import { t as x } from "./Checkbox-CsbxMNgR.js";
import { useCallback as S, useEffect as C, useMemo as w, useRef as T, useState as E } from "react";
import { Fragment as D, jsx as O, jsxs as k } from "react/jsx-runtime";
//#region src/components/identity/admin/AdminDashboardPage.tsx
function A({ stats: e, pools: r, onNavigate: i, loading: a }) {
	let o = w(() => [
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
	return a ? /* @__PURE__ */ k("div", {
		className: "flex flex-col gap-8",
		children: [/* @__PURE__ */ O("div", {
			className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4",
			children: [
				1,
				2,
				3
			].map((e) => /* @__PURE__ */ k(n, {
				padding: "md",
				children: [/* @__PURE__ */ O("div", { className: "h-5 w-12 rounded bg-surface-hover animate-pulse mb-2" }), /* @__PURE__ */ O("div", { className: "h-3 w-20 rounded bg-surface-hover animate-pulse" })]
			}, e))
		}), /* @__PURE__ */ O(n, { className: "h-[200px] animate-pulse" })]
	}) : /* @__PURE__ */ k(l, {
		title: "Dashboard",
		children: [
			/* @__PURE__ */ O("section", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4",
				children: o.map((e) => /* @__PURE__ */ k(n, {
					padding: "md",
					children: [/* @__PURE__ */ O("div", {
						className: "text-[2rem] font-bold text-info-fg mb-1",
						children: e.value
					}), /* @__PURE__ */ O("div", {
						className: "text-sm text-neutral",
						children: e.label
					})]
				}, e.label))
			}),
			/* @__PURE__ */ k("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ O("h2", {
					className: "text-lg font-semibold text-text-primary m-0",
					children: "User Pools"
				}), /* @__PURE__ */ O(n, { children: r.length === 0 ? /* @__PURE__ */ O(g, {
					title: "No pools created yet",
					actionLabel: "Create Pool",
					onAction: () => i("/identity/admin/pools/new")
				}) : r.map((e, n) => /* @__PURE__ */ k("div", {
					className: `flex items-center justify-between px-4 py-3 ${n < r.length - 1 ? "border-b border-border-subtle" : ""}`,
					children: [/* @__PURE__ */ k("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ O("span", {
							className: "font-medium text-text-primary",
							children: e.poolName
						}), /* @__PURE__ */ O("span", {
							className: "text-xs text-text-tertiary",
							children: e.createdAt
						})]
					}), /* @__PURE__ */ O(t, {
						variant: "ghost",
						size: "sm",
						onClick: () => i(`/identity/admin/pools/${e.poolId}`),
						children: "View"
					})]
				}, e.poolId)) })]
			}),
			/* @__PURE__ */ k("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ O("h2", {
					className: "text-lg font-semibold text-text-primary m-0",
					children: "Quick Actions"
				}), /* @__PURE__ */ k("div", {
					className: "flex flex-wrap gap-3",
					children: [
						/* @__PURE__ */ O(t, {
							variant: "secondary",
							size: "lg",
							onClick: () => i("/identity/admin/pools/new"),
							children: "Create Pool"
						}),
						/* @__PURE__ */ O(t, {
							variant: "secondary",
							size: "lg",
							onClick: () => i("/identity/admin/applications/new"),
							children: "Create Application"
						}),
						/* @__PURE__ */ O(t, {
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
function j({ columns: e, data: t, keyField: r, onRowClick: i, actions: a, emptyMessage: o = "No records found.", emptyIcon: c = "📋", loading: l = !1 }) {
	let u = w(() => e.map((e) => ({
		key: e.key,
		header: e.header,
		render: e.render ? (t) => e.render(t) : void 0,
		sortable: e.sortable,
		width: e.width,
		align: e.align
	})), [e]);
	return !l && t.length === 0 ? /* @__PURE__ */ k(n, {
		className: "flex flex-col items-center justify-center min-h-[220px] p-8",
		children: [/* @__PURE__ */ O("span", {
			className: "text-[42px] mb-3",
			children: c
		}), /* @__PURE__ */ O("p", {
			className: "text-sm font-medium text-neutral text-center max-w-[280px] m-0",
			children: o
		})]
	}) : /* @__PURE__ */ O(n, { children: /* @__PURE__ */ O(s, {
		data: t,
		columns: u,
		keyField: (e) => String(e[r]),
		onRowClick: i,
		rowActions: a,
		loading: l,
		frameless: !0
	}) });
}
//#endregion
//#region src/components/identity/admin/PoolListPage.tsx
function M({ pools: e, onCreatePool: n, onEditPool: r, onDeletePool: i, onViewPool: a, loading: o }) {
	let [s, c] = E(null), [u, d] = E(!1), f = S(async (e) => {
		d(!0);
		try {
			await i(e);
		} finally {
			d(!1), c(null);
		}
	}, [i]), p = w(() => [
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
	], []), m = S((e) => /* @__PURE__ */ k(D, { children: [
		/* @__PURE__ */ O(t, {
			variant: "ghost",
			size: "sm",
			onClick: () => a(e.poolId),
			children: "View"
		}),
		/* @__PURE__ */ O(t, {
			variant: "ghost",
			size: "sm",
			onClick: () => r(e.poolId),
			children: "Edit"
		}),
		/* @__PURE__ */ O(t, {
			variant: "danger",
			size: "sm",
			onClick: () => c(e.poolId),
			children: "Delete"
		})
	] }), [r, a]);
	return /* @__PURE__ */ k(l, {
		title: "User Pools",
		actions: /* @__PURE__ */ O(t, {
			variant: "primary",
			size: "lg",
			onClick: n,
			children: "Create Pool"
		}),
		children: [/* @__PURE__ */ O(j, {
			columns: p,
			data: e,
			keyField: "poolId",
			actions: m,
			loading: o,
			emptyMessage: "No user pools found. Create one to get started.",
			emptyIcon: "🏊"
		}), /* @__PURE__ */ O(h, {
			open: !!s,
			onConfirm: () => s && f(s),
			onCancel: () => c(null),
			title: "Delete Pool",
			body: "This action cannot be undone. All users in this pool will be affected.",
			tone: "destructive",
			confirmLabel: "Delete",
			confirmDisabled: u
		})]
	});
}
//#endregion
//#region src/components/identity/shared/FormField.tsx
function N({ label: e, name: t, type: n = "text", value: r, onChange: i, error: a, required: o, placeholder: s, options: c, helpText: l, disabled: u }) {
	let f = S((e) => {
		i(n === "number" ? Number(e.target.value) : e.target.value);
	}, [i, n]);
	return n === "checkbox" ? /* @__PURE__ */ k("div", {
		className: "mb-4",
		children: [
			/* @__PURE__ */ k("label", {
				className: "flex items-center gap-2 cursor-pointer",
				children: [/* @__PURE__ */ O(x, {
					name: t,
					checked: !!r,
					onChange: i,
					disabled: u
				}), /* @__PURE__ */ k("span", {
					className: "text-sm text-text-primary",
					children: [e, o && /* @__PURE__ */ O("span", {
						className: "text-danger-fg",
						children: " *"
					})]
				})]
			}),
			a && /* @__PURE__ */ O("p", {
				className: "mt-1 text-sm text-danger-fg",
				children: a
			}),
			l && !a && /* @__PURE__ */ O("p", {
				className: "mt-1 text-sm text-text-tertiary",
				children: l
			})
		]
	}) : /* @__PURE__ */ O(d, {
		label: e,
		required: o,
		error: a,
		hint: l,
		className: "mb-4",
		children: ({ labelId: e, ...i }) => n === "textarea" ? /* @__PURE__ */ O(v, {
			...i,
			name: t,
			value: String(r),
			onChange: f,
			placeholder: s,
			disabled: u,
			required: o,
			rows: 5,
			invalid: !!a,
			className: "resize-y min-h-[100px]"
		}) : n === "select" ? /* @__PURE__ */ O(b, {
			...i,
			name: t,
			value: String(r),
			onChange: f,
			disabled: u,
			required: o,
			invalid: !!a,
			options: [{
				value: "",
				label: s || "Select..."
			}, ...c ?? []]
		}) : /* @__PURE__ */ O(_, {
			...i,
			type: n,
			name: t,
			value: String(r),
			onChange: f,
			placeholder: s,
			disabled: u,
			required: o,
			invalid: !!a
		})
	});
}
//#endregion
//#region src/components/identity/admin/PoolFormPage.tsx
function P({ pool: e, isEdit: r, onSubmit: i, onCancel: a, error: o }) {
	let [s, c] = E(e?.poolName ?? ""), [u, d] = E(e?.settings?.mfaConfiguration ?? "OFF"), [p, m] = E(e?.settings?.passwordPolicy?.minLength ?? 8), [h, g] = E(e?.settings?.passwordPolicy?.requireUppercase ?? !0), [v, y] = E(e?.settings?.passwordPolicy?.requireLowercase ?? !0), [b, x] = E(e?.settings?.passwordPolicy?.requireNumbers ?? !0), [C, w] = E(e?.settings?.passwordPolicy?.requireSymbols ?? !1), [T, D] = E(Object.entries(e?.customAttributes ?? {}).map(([e, t]) => ({
		key: e,
		value: t
	}))), [A, j] = E(!1), M = S(() => {
		D((e) => [...e, {
			key: "",
			value: ""
		}]);
	}, []), P = S((e) => {
		D((t) => t.filter((t, n) => n !== e));
	}, []), F = S((e, t, n) => {
		D((r) => r.map((r, i) => i === e ? {
			...r,
			[t]: n
		} : r));
	}, []), I = S(async (e) => {
		e.preventDefault(), j(!0);
		try {
			let e = {};
			for (let { key: t, value: n } of T) t.trim() && (e[t.trim()] = n);
			await i({
				poolName: s,
				customAttributes: e,
				settings: {
					mfaConfiguration: u,
					passwordPolicy: {
						minLength: p,
						requireUppercase: h,
						requireLowercase: v,
						requireNumbers: b,
						requireSymbols: C
					}
				}
			});
		} finally {
			j(!1);
		}
	}, [
		s,
		u,
		p,
		h,
		v,
		b,
		C,
		T,
		i
	]);
	return /* @__PURE__ */ k(l, {
		title: r ? "Edit Pool" : "Create Pool",
		className: "max-w-[640px]",
		children: [o && /* @__PURE__ */ O(f, {
			variant: "error",
			children: o
		}), /* @__PURE__ */ O(n, {
			padding: "md",
			children: /* @__PURE__ */ k("form", {
				onSubmit: I,
				children: [
					/* @__PURE__ */ O(N, {
						label: "Pool Name",
						name: "poolName",
						value: s,
						onChange: (e) => c(String(e)),
						required: !0,
						placeholder: "my-user-pool"
					}),
					/* @__PURE__ */ k("section", {
						className: "mb-6",
						children: [/* @__PURE__ */ O("h3", {
							className: "text-base font-semibold text-text-primary mb-2",
							children: "MFA Configuration"
						}), /* @__PURE__ */ O(N, {
							label: "MFA Mode",
							name: "mfaConfig",
							type: "select",
							value: u,
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
					/* @__PURE__ */ k("section", {
						className: "mb-6",
						children: [
							/* @__PURE__ */ O("h3", {
								className: "text-base font-semibold text-text-primary mb-2",
								children: "Password Policy"
							}),
							/* @__PURE__ */ O(N, {
								label: "Minimum Length",
								name: "minLength",
								type: "number",
								value: p,
								onChange: (e) => m(Number(e))
							}),
							/* @__PURE__ */ O(N, {
								label: "Require Uppercase",
								name: "requireUppercase",
								type: "checkbox",
								value: h,
								onChange: (e) => g(!!e)
							}),
							/* @__PURE__ */ O(N, {
								label: "Require Lowercase",
								name: "requireLowercase",
								type: "checkbox",
								value: v,
								onChange: (e) => y(!!e)
							}),
							/* @__PURE__ */ O(N, {
								label: "Require Numbers",
								name: "requireNumbers",
								type: "checkbox",
								value: b,
								onChange: (e) => x(!!e)
							}),
							/* @__PURE__ */ O(N, {
								label: "Require Symbols",
								name: "requireSymbols",
								type: "checkbox",
								value: C,
								onChange: (e) => w(!!e)
							})
						]
					}),
					/* @__PURE__ */ k("section", {
						className: "mb-6",
						children: [
							/* @__PURE__ */ O("h3", {
								className: "text-base font-semibold text-text-primary mb-2",
								children: "Custom Attributes"
							}),
							T.map((e, n) => /* @__PURE__ */ k("div", {
								className: "flex gap-2 items-center mb-2",
								children: [
									/* @__PURE__ */ O(_, {
										className: "flex-1",
										placeholder: "Attribute name",
										value: e.key,
										onChange: (e) => F(n, "key", e.target.value)
									}),
									/* @__PURE__ */ O(_, {
										className: "flex-1",
										placeholder: "Type (string, number, etc.)",
										value: e.value,
										onChange: (e) => F(n, "value", e.target.value)
									}),
									/* @__PURE__ */ O(t, {
										variant: "danger",
										size: "sm",
										onClick: () => P(n),
										children: "Remove"
									})
								]
							}, n)),
							/* @__PURE__ */ O(t, {
								variant: "ghost",
								size: "sm",
								onClick: M,
								children: "+ Add Attribute"
							})
						]
					}),
					/* @__PURE__ */ k("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ O(t, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: A,
							children: A ? "Saving..." : r ? "Update Pool" : "Create Pool"
						}), /* @__PURE__ */ O(t, {
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
var F = {
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
}, I = {
	success: "success",
	warning: "warning",
	danger: "danger",
	info: "info",
	neutral: "neutral"
};
function L({ status: e, variant: t }) {
	let n = t ? I[t] || "neutral" : F[e] || "neutral";
	return /* @__PURE__ */ O(p, {
		tone: n,
		size: "sm",
		children: e
	});
}
//#endregion
//#region src/components/identity/admin/UserListPage.tsx
function R({ users: e, poolName: n, onCreateUser: r, onEditUser: i, onDeleteUser: a, loading: o }) {
	let [s, c] = E(null), [u, d] = E(!1), f = S(async (e) => {
		d(!0);
		try {
			await a(e);
		} finally {
			d(!1), c(null);
		}
	}, [a]), p = w(() => [
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
			render: (e) => /* @__PURE__ */ O(L, { status: e.status })
		},
		{
			key: "createdAt",
			header: "Created",
			sortable: !0
		}
	], []), m = S((e) => /* @__PURE__ */ k(D, { children: [/* @__PURE__ */ O(t, {
		variant: "ghost",
		size: "sm",
		onClick: () => i(e.userId),
		children: "Edit"
	}), /* @__PURE__ */ O(t, {
		variant: "danger",
		size: "sm",
		onClick: () => c(e.userId),
		children: "Delete"
	})] }), [i]);
	return /* @__PURE__ */ k(l, {
		title: `Users — ${n}`,
		actions: /* @__PURE__ */ O(t, {
			variant: "primary",
			size: "lg",
			onClick: r,
			children: "Create User"
		}),
		children: [/* @__PURE__ */ O(j, {
			columns: p,
			data: e,
			keyField: "userId",
			actions: m,
			loading: o,
			emptyMessage: "No users in this pool yet.",
			emptyIcon: "👤"
		}), /* @__PURE__ */ O(h, {
			open: !!s,
			onConfirm: () => s && f(s),
			onCancel: () => c(null),
			title: "Delete User",
			body: "This action cannot be undone. The user will be permanently removed.",
			tone: "destructive",
			confirmLabel: "Delete",
			confirmDisabled: u
		})]
	});
}
//#endregion
//#region src/components/identity/admin/UserFormPage.tsx
function z({ user: e, isEdit: r, customAttributeDefinitions: i, onSubmit: a, onCancel: o, error: s }) {
	let [c, u] = E(e?.email ?? ""), [d, p] = E(""), [m, h] = E(e?.givenName ?? ""), [g, _] = E(e?.familyName ?? ""), [v, y] = E(e?.nickname ?? ""), [b, x] = E(e?.picture ?? ""), [C, w] = E(e?.website ?? ""), [T, D] = E(Object.fromEntries(Object.entries(e?.customAttributes ?? {}).map(([e, t]) => [e, String(t)]))), [A, j] = E(!1), M = S((e, t) => {
		D((n) => ({
			...n,
			[e]: t
		}));
	}, []), P = S(async (e) => {
		e.preventDefault(), j(!0);
		try {
			await a({
				email: c,
				...!r && d ? { password: d } : {},
				givenName: m || void 0,
				familyName: g || void 0,
				nickname: v || void 0,
				picture: b || void 0,
				website: C || void 0,
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
		C,
		T,
		r,
		a
	]);
	return /* @__PURE__ */ k(l, {
		title: r ? "Edit User" : "Create User",
		className: "max-w-[640px]",
		children: [s && /* @__PURE__ */ O(f, {
			variant: "error",
			children: s
		}), /* @__PURE__ */ O(n, {
			padding: "md",
			children: /* @__PURE__ */ k("form", {
				onSubmit: P,
				children: [
					/* @__PURE__ */ O(N, {
						label: "Email",
						name: "email",
						type: "email",
						value: c,
						onChange: (e) => u(String(e)),
						required: !0,
						placeholder: "user@example.com"
					}),
					!r && /* @__PURE__ */ O(N, {
						label: "Password",
						name: "password",
						type: "password",
						value: d,
						onChange: (e) => p(String(e)),
						required: !0,
						placeholder: "Temporary password",
						helpText: "User will be prompted to change on first login."
					}),
					/* @__PURE__ */ O(N, {
						label: "Given Name",
						name: "givenName",
						value: m,
						onChange: (e) => h(String(e)),
						placeholder: "John"
					}),
					/* @__PURE__ */ O(N, {
						label: "Family Name",
						name: "familyName",
						value: g,
						onChange: (e) => _(String(e)),
						placeholder: "Doe"
					}),
					/* @__PURE__ */ O(N, {
						label: "Nickname",
						name: "nickname",
						value: v,
						onChange: (e) => y(String(e)),
						placeholder: "johnny"
					}),
					/* @__PURE__ */ O(N, {
						label: "Picture URL",
						name: "picture",
						value: b,
						onChange: (e) => x(String(e)),
						placeholder: "https://..."
					}),
					/* @__PURE__ */ O(N, {
						label: "Website",
						name: "website",
						value: C,
						onChange: (e) => w(String(e)),
						placeholder: "https://..."
					}),
					i && Object.keys(i).length > 0 && /* @__PURE__ */ k("section", { children: [/* @__PURE__ */ O("h3", {
						className: "text-base font-semibold text-text-primary mt-6 mb-2",
						children: "Custom Attributes"
					}), Object.entries(i).map(([e, t]) => /* @__PURE__ */ O(N, {
						label: e,
						name: `custom_${e}`,
						type: t === "number" ? "number" : "text",
						value: T[e] ?? "",
						onChange: (t) => M(e, String(t)),
						helpText: `Type: ${t}`
					}, e))] }),
					/* @__PURE__ */ k("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ O(t, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: A,
							children: A ? "Saving..." : r ? "Update User" : "Create User"
						}), /* @__PURE__ */ O(t, {
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
function B({ groups: e, poolName: n, onCreateGroup: r, onEditGroup: i, onDeleteGroup: a, loading: o }) {
	let [s, c] = E(null), [u, d] = E(!1), f = S(async (e) => {
		d(!0);
		try {
			await a(e);
		} finally {
			d(!1), c(null);
		}
	}, [a]), m = w(() => [
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
			render: (e) => /* @__PURE__ */ O("div", {
				className: "flex flex-wrap gap-1",
				children: e.permissions.length === 0 ? /* @__PURE__ */ O("span", {
					className: "text-text-tertiary text-xs",
					children: "None"
				}) : e.permissions.map((e) => /* @__PURE__ */ O(p, {
					tone: "info",
					size: "xs",
					children: e
				}, e))
			})
		}
	], []), g = S((e) => /* @__PURE__ */ k(D, { children: [/* @__PURE__ */ O(t, {
		variant: "ghost",
		size: "sm",
		onClick: () => i(e.groupId),
		children: "Edit"
	}), /* @__PURE__ */ O(t, {
		variant: "danger",
		size: "sm",
		onClick: () => c(e.groupId),
		children: "Delete"
	})] }), [i]);
	return /* @__PURE__ */ k(l, {
		title: `Groups — ${n}`,
		actions: /* @__PURE__ */ O(t, {
			variant: "primary",
			size: "lg",
			onClick: r,
			children: "Create Group"
		}),
		children: [/* @__PURE__ */ O(j, {
			columns: m,
			data: e,
			keyField: "groupId",
			actions: g,
			loading: o,
			emptyMessage: "No groups in this pool yet.",
			emptyIcon: "👥"
		}), /* @__PURE__ */ O(h, {
			open: !!s,
			onConfirm: () => s && f(s),
			onCancel: () => c(null),
			title: "Delete Group",
			body: "This action cannot be undone. Members will lose their group permissions.",
			tone: "destructive",
			confirmLabel: "Delete",
			confirmDisabled: u
		})]
	});
}
//#endregion
//#region src/components/identity/admin/GroupFormPage.tsx
function V({ group: e, isEdit: r, members: i, availableUsers: a, onSubmit: o, onAddMember: s, onRemoveMember: c, onCancel: u, error: d }) {
	let [p, m] = E(e?.groupName ?? ""), [h, g] = E(e?.description ?? ""), [v, y] = E(e?.permissions ?? []), [x, C] = E(""), [w, T] = E(""), [D, A] = E(!1), j = S((e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			let t = x.trim();
			t && !v.includes(t) && y((e) => [...e, t]), C("");
		}
	}, [x, v]), M = S((e) => {
		y((t) => t.filter((t) => t !== e));
	}, []), P = S(async () => {
		w && s && (await s(w), T(""));
	}, [w, s]), F = S(async (e) => {
		e.preventDefault(), A(!0);
		try {
			await o({
				groupName: p,
				description: h,
				permissions: v
			});
		} finally {
			A(!1);
		}
	}, [
		p,
		h,
		v,
		o
	]);
	return /* @__PURE__ */ k(l, {
		title: r ? "Edit Group" : "Create Group",
		className: "max-w-[640px]",
		children: [d && /* @__PURE__ */ O(f, {
			variant: "error",
			children: d
		}), /* @__PURE__ */ O(n, {
			padding: "md",
			children: /* @__PURE__ */ k("form", {
				onSubmit: F,
				children: [
					/* @__PURE__ */ O(N, {
						label: "Group Name",
						name: "groupName",
						value: p,
						onChange: (e) => m(String(e)),
						required: !0,
						placeholder: "admins"
					}),
					/* @__PURE__ */ O(N, {
						label: "Description",
						name: "description",
						type: "textarea",
						value: h,
						onChange: (e) => g(String(e)),
						placeholder: "Describe this group's purpose..."
					}),
					/* @__PURE__ */ k("section", { children: [
						/* @__PURE__ */ O("h3", {
							className: "text-base font-semibold text-text-primary mt-6 mb-2",
							children: "Permissions"
						}),
						/* @__PURE__ */ O("div", {
							className: "flex flex-wrap gap-1.5 mb-2",
							children: v.map((e) => /* @__PURE__ */ k("span", {
								className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-info text-white text-sm font-medium",
								children: [e, /* @__PURE__ */ O(t, {
									variant: "ghost",
									size: "sm",
									className: "p-0 text-white text-[14px] leading-none min-w-0 min-h-0",
									onClick: () => M(e),
									"aria-label": `Remove permission ${e}`,
									children: "x"
								})]
							}, e))
						}),
						/* @__PURE__ */ O(_, {
							placeholder: "Type a permission and press Enter",
							value: x,
							onChange: (e) => C(e.target.value),
							onKeyDown: j
						})
					] }),
					r && i && /* @__PURE__ */ k("section", { children: [
						/* @__PURE__ */ O("h3", {
							className: "text-base font-semibold text-text-primary mt-6 mb-2",
							children: "Members"
						}),
						i.length === 0 ? /* @__PURE__ */ O("p", {
							className: "text-text-tertiary text-sm",
							children: "No members yet."
						}) : i.map((e) => /* @__PURE__ */ k("div", {
							className: "flex items-center justify-between py-1.5 border-b border-border",
							children: [/* @__PURE__ */ O("span", {
								className: "text-base",
								children: e.email
							}), c && /* @__PURE__ */ O(t, {
								variant: "danger",
								size: "sm",
								onClick: () => c(e.userId),
								children: "Remove"
							})]
						}, e.userId)),
						a && a.length > 0 && s && /* @__PURE__ */ k("div", {
							className: "flex gap-2 mt-2",
							children: [/* @__PURE__ */ O(b, {
								className: "flex-1",
								value: w,
								onChange: (e) => T(e.target.value),
								placeholder: "Select user to add...",
								options: a.map((e) => ({
									value: e.userId,
									label: e.email
								}))
							}), /* @__PURE__ */ O(t, {
								variant: "ghost",
								size: "sm",
								onClick: P,
								disabled: !w,
								children: "Add"
							})]
						})
					] }),
					/* @__PURE__ */ k("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ O(t, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: D,
							children: D ? "Saving..." : r ? "Update Group" : "Create Group"
						}), /* @__PURE__ */ O(t, {
							variant: "ghost",
							size: "lg",
							onClick: u,
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
function H({ applications: e, onCreateApp: n, onCreateAppWithPool: r, onEditApp: i, onDeleteApp: a, loading: o }) {
	let [s, c] = E(null), [u, d] = E(!1), f = S(async (e) => {
		d(!0);
		try {
			await a(e);
		} finally {
			d(!1), c(null);
		}
	}, [a]), m = w(() => [
		{
			key: "clientName",
			header: "Name",
			sortable: !0
		},
		{
			key: "clientId",
			header: "Client ID",
			render: (e) => /* @__PURE__ */ O("span", {
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
			render: (e) => /* @__PURE__ */ k("div", {
				className: "flex flex-wrap gap-1",
				children: [e.redirectUris.slice(0, 2).map((e) => /* @__PURE__ */ O(p, {
					tone: "neutral",
					size: "xs",
					children: e
				}, e)), e.redirectUris.length > 2 && /* @__PURE__ */ k(p, {
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
	], []), g = S((e) => /* @__PURE__ */ k(D, { children: [/* @__PURE__ */ O(t, {
		variant: "ghost",
		size: "sm",
		onClick: () => i(e.clientId),
		children: "Edit"
	}), /* @__PURE__ */ O(t, {
		variant: "danger",
		size: "sm",
		onClick: () => c(e.clientId),
		children: "Delete"
	})] }), [i]);
	return /* @__PURE__ */ k(l, {
		title: "Applications",
		actions: /* @__PURE__ */ k(D, { children: [/* @__PURE__ */ O(t, {
			variant: "primary",
			size: "lg",
			onClick: n,
			children: "New Application"
		}), /* @__PURE__ */ O(t, {
			variant: "secondary",
			size: "lg",
			onClick: r,
			children: "New App + Pool"
		})] }),
		children: [/* @__PURE__ */ O(j, {
			columns: m,
			data: e,
			keyField: "clientId",
			actions: g,
			loading: o,
			emptyMessage: "No applications registered yet.",
			emptyIcon: "🔐"
		}), /* @__PURE__ */ O(h, {
			open: !!s,
			onConfirm: () => s && f(s),
			onCancel: () => c(null),
			title: "Delete Application",
			body: "This action cannot be undone. The application will lose access immediately.",
			tone: "destructive",
			confirmLabel: "Delete",
			confirmDisabled: u
		})]
	});
}
//#endregion
//#region src/components/identity/admin/ApplicationFormPage.tsx
function U({ label: e, values: n, onChange: r, placeholder: i }) {
	let a = () => r([...n, ""]), o = (e) => r(n.filter((t, n) => n !== e)), s = (e, t) => r(n.map((n, r) => r === e ? t : n));
	return /* @__PURE__ */ k("div", {
		className: "mb-4",
		children: [
			/* @__PURE__ */ O("label", {
				className: "block mb-1 text-sm font-semibold text-text-primary",
				children: e
			}),
			n.map((e, n) => /* @__PURE__ */ k("div", {
				className: "flex gap-2 items-center mb-1.5",
				children: [/* @__PURE__ */ O(_, {
					className: "flex-1",
					value: e,
					onChange: (e) => s(n, e.target.value),
					placeholder: i
				}), /* @__PURE__ */ O(t, {
					variant: "danger",
					size: "sm",
					onClick: () => o(n),
					children: "Remove"
				})]
			}, n)),
			/* @__PURE__ */ O(t, {
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
function K({ application: e, isEdit: r, pools: i, onSubmit: a, onCancel: o, error: s }) {
	let [c, u] = E(e?.clientName ?? ""), [d, p] = E(e?.poolId ?? ""), [m, h] = E(e?.redirectUris ?? [""]), [g, _] = E(e?.postLogoutRedirectUris ?? []), [v, y] = E(e?.grantTypes ?? ["authorization_code"]), [b, C] = E(e?.responseTypes ?? ["code"]), [w, T] = E(e?.scope ?? "openid profile email"), [D, A] = E(!1), j = S((e) => {
		y((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}, []), M = S((e) => {
		C((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}, []), P = S(async (e) => {
		e.preventDefault(), A(!0);
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
			A(!1);
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
	return /* @__PURE__ */ k(l, {
		title: r ? "Edit Application" : "New Application",
		className: "max-w-[640px]",
		children: [s && /* @__PURE__ */ O(f, {
			variant: "error",
			children: s
		}), /* @__PURE__ */ O(n, {
			padding: "md",
			children: /* @__PURE__ */ k("form", {
				onSubmit: P,
				children: [
					/* @__PURE__ */ O(N, {
						label: "Application Name",
						name: "clientName",
						value: c,
						onChange: (e) => u(String(e)),
						required: !0,
						placeholder: "My App"
					}),
					/* @__PURE__ */ O(N, {
						label: "User Pool",
						name: "poolId",
						type: "select",
						value: d,
						onChange: (e) => p(String(e)),
						required: !0,
						options: i.map((e) => ({
							value: e.poolId,
							label: e.poolName
						})),
						placeholder: "Select a pool..."
					}),
					/* @__PURE__ */ O(U, {
						label: "Redirect URIs",
						values: m,
						onChange: h,
						placeholder: "https://app.example.com/callback"
					}),
					/* @__PURE__ */ O(U, {
						label: "Post-Logout Redirect URIs",
						values: g,
						onChange: _,
						placeholder: "https://app.example.com/logout"
					}),
					/* @__PURE__ */ k("section", { children: [/* @__PURE__ */ O("h3", {
						className: "text-base font-semibold text-text-primary mt-6 mb-2",
						children: "Grant Types"
					}), /* @__PURE__ */ O("div", {
						className: "flex flex-col gap-2 mb-4",
						children: W.map((e) => /* @__PURE__ */ k("label", {
							className: "flex items-center gap-2 text-base text-text-primary cursor-pointer",
							children: [/* @__PURE__ */ O(x, {
								checked: v.includes(e),
								onChange: () => j(e)
							}), e]
						}, e))
					})] }),
					/* @__PURE__ */ k("section", { children: [/* @__PURE__ */ O("h3", {
						className: "text-base font-semibold text-text-primary mt-6 mb-2",
						children: "Response Types"
					}), /* @__PURE__ */ O("div", {
						className: "flex flex-col gap-2 mb-4",
						children: G.map((e) => /* @__PURE__ */ k("label", {
							className: "flex items-center gap-2 text-base text-text-primary cursor-pointer",
							children: [/* @__PURE__ */ O(x, {
								checked: b.includes(e),
								onChange: () => M(e)
							}), e]
						}, e))
					})] }),
					/* @__PURE__ */ O(N, {
						label: "Scope",
						name: "scope",
						value: w,
						onChange: (e) => T(String(e)),
						placeholder: "openid profile email",
						helpText: "Space-separated list of scopes."
					}),
					/* @__PURE__ */ k("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ O(t, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: D,
							children: D ? "Saving..." : r ? "Update Application" : "Create Application"
						}), /* @__PURE__ */ O(t, {
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
function J({ onSubmit: e, onCancel: r, error: i }) {
	let [a, o] = E(""), [s, c] = E(""), [u, d] = E([""]), [p, m] = E(["authorization_code"]), [h, g] = E(!1), v = S((e) => {
		m((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}, []), y = S(() => {
		d((e) => [...e, ""]);
	}, []), b = S((e) => {
		d((t) => t.filter((t, n) => n !== e));
	}, []), C = S((e, t) => {
		d((n) => n.map((n, r) => r === e ? t : n));
	}, []), w = S(async (t) => {
		t.preventDefault(), g(!0);
		try {
			await e({
				poolName: a,
				clientName: s,
				redirectUris: u.filter((e) => e.trim()),
				grantTypes: p
			});
		} finally {
			g(!1);
		}
	}, [
		a,
		s,
		u,
		p,
		e
	]);
	return /* @__PURE__ */ k(l, {
		title: "New Application + Pool",
		description: "Create a user pool and register an application in one step.",
		className: "max-w-[640px]",
		children: [i && /* @__PURE__ */ O(f, {
			variant: "error",
			children: i
		}), /* @__PURE__ */ O(n, {
			padding: "md",
			children: /* @__PURE__ */ k("form", {
				onSubmit: w,
				children: [
					/* @__PURE__ */ O(N, {
						label: "Pool Name",
						name: "poolName",
						value: a,
						onChange: (e) => o(String(e)),
						required: !0,
						placeholder: "my-user-pool"
					}),
					/* @__PURE__ */ O(N, {
						label: "Application Name",
						name: "clientName",
						value: s,
						onChange: (e) => c(String(e)),
						required: !0,
						placeholder: "My App"
					}),
					/* @__PURE__ */ k("section", { children: [
						/* @__PURE__ */ O("h3", {
							className: "text-base font-semibold text-text-primary mt-6 mb-2",
							children: "Redirect URIs"
						}),
						u.map((e, n) => /* @__PURE__ */ k("div", {
							className: "flex gap-2 items-center mb-1.5",
							children: [/* @__PURE__ */ O(_, {
								className: "flex-1",
								value: e,
								onChange: (e) => C(n, e.target.value),
								placeholder: "https://app.example.com/callback"
							}), u.length > 1 && /* @__PURE__ */ O(t, {
								variant: "danger",
								size: "sm",
								onClick: () => b(n),
								children: "Remove"
							})]
						}, n)),
						/* @__PURE__ */ O(t, {
							variant: "ghost",
							size: "sm",
							onClick: y,
							children: "+ Add URI"
						})
					] }),
					/* @__PURE__ */ k("section", { children: [/* @__PURE__ */ O("h3", {
						className: "text-base font-semibold text-text-primary mt-6 mb-2",
						children: "Grant Types"
					}), /* @__PURE__ */ O("div", {
						className: "flex flex-col gap-2 mb-4",
						children: q.map((e) => /* @__PURE__ */ k("label", {
							className: "flex items-center gap-2 text-base text-text-primary cursor-pointer",
							children: [/* @__PURE__ */ O(x, {
								checked: p.includes(e),
								onChange: () => v(e)
							}), e]
						}, e))
					})] }),
					/* @__PURE__ */ k("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ O(t, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: h,
							children: h ? "Creating..." : "Create Pool + Application"
						}), /* @__PURE__ */ O(t, {
							variant: "ghost",
							size: "lg",
							onClick: r,
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
function Y({ templates: e, onCreateTemplate: n, onEditTemplate: r, onDeleteTemplate: i, onTestSend: a, loading: o }) {
	let [s, c] = E(null), [u, d] = E(!1), [f, p] = E(null), [g, _] = E(""), [v, y] = E(!1), b = S(async (e) => {
		d(!0);
		try {
			await i(e);
		} finally {
			d(!1), c(null);
		}
	}, [i]), x = S(async () => {
		if (!(!f || !g.trim())) {
			y(!0);
			try {
				await a(f, g.trim()), p(null), _("");
			} finally {
				y(!1);
			}
		}
	}, [
		f,
		g,
		a
	]), C = w(() => [{
		key: "name",
		header: "Name",
		sortable: !0
	}, {
		key: "subject",
		header: "Subject"
	}], []), T = S((e) => /* @__PURE__ */ k(D, { children: [
		/* @__PURE__ */ O(t, {
			variant: "ghost",
			size: "sm",
			onClick: () => r(e.templateId),
			children: "Edit"
		}),
		/* @__PURE__ */ O(t, {
			variant: "ghost",
			size: "sm",
			onClick: () => {
				p(e.templateId), _("");
			},
			children: "Test Send"
		}),
		/* @__PURE__ */ O(t, {
			variant: "danger",
			size: "sm",
			onClick: () => c(e.templateId),
			children: "Delete"
		})
	] }), [r]);
	return /* @__PURE__ */ k(l, {
		title: "Email Templates",
		actions: /* @__PURE__ */ O(t, {
			variant: "primary",
			size: "lg",
			onClick: n,
			children: "Create Template"
		}),
		children: [
			/* @__PURE__ */ O(j, {
				columns: C,
				data: e,
				keyField: "templateId",
				actions: T,
				loading: o,
				emptyMessage: "No email templates configured.",
				emptyIcon: "✉️"
			}),
			/* @__PURE__ */ O(m, {
				open: !!f,
				onClose: () => p(null),
				title: "Send Test Email",
				footer: /* @__PURE__ */ k(D, { children: [/* @__PURE__ */ O(t, {
					variant: "ghost",
					size: "md",
					onClick: () => p(null),
					children: "Cancel"
				}), /* @__PURE__ */ O(t, {
					variant: "primary",
					size: "md",
					onClick: x,
					disabled: v || !g.trim(),
					children: v ? "Sending..." : "Send"
				})] }),
				children: /* @__PURE__ */ O(N, {
					label: "Recipient Email",
					name: "test-email",
					type: "email",
					value: g,
					onChange: (e) => _(String(e)),
					placeholder: "recipient@example.com"
				})
			}),
			/* @__PURE__ */ O(h, {
				open: !!s,
				onConfirm: () => s && b(s),
				onCancel: () => c(null),
				title: "Delete Template",
				body: "This action cannot be undone. The template will be permanently removed.",
				tone: "destructive",
				confirmLabel: "Delete",
				confirmDisabled: u
			})
		]
	});
}
//#endregion
//#region src/components/identity/admin/EmailTemplateFormPage.tsx
function X({ template: e, isEdit: r, onSubmit: i, onCancel: a, error: o }) {
	let [s, c] = E(e?.name ?? ""), [u, d] = E(e?.subject ?? ""), [p, m] = E(e?.htmlBody ?? ""), [h, g] = E(e?.textBody ?? ""), [y, b] = E(e?.variables ?? []), [x, C] = E(""), [w, T] = E(!1), [D, A] = E(!1), j = S((e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			let t = x.trim();
			t && !y.includes(t) && b((e) => [...e, t]), C("");
		}
	}, [x, y]), M = S((e) => {
		b((t) => t.filter((t) => t !== e));
	}, []), P = S(async (e) => {
		e.preventDefault(), A(!0);
		try {
			await i({
				name: s,
				subject: u,
				htmlBody: p,
				textBody: h,
				variables: y
			});
		} finally {
			A(!1);
		}
	}, [
		s,
		u,
		p,
		h,
		y,
		i
	]);
	return /* @__PURE__ */ k(l, {
		title: r ? "Edit Email Template" : "Create Email Template",
		className: "max-w-[800px]",
		children: [o && /* @__PURE__ */ O(f, {
			variant: "error",
			children: o
		}), /* @__PURE__ */ O(n, {
			padding: "md",
			children: /* @__PURE__ */ k("form", {
				onSubmit: P,
				children: [
					/* @__PURE__ */ O(N, {
						label: "Template Name",
						name: "name",
						value: s,
						onChange: (e) => c(String(e)),
						required: !0,
						placeholder: "welcome-email"
					}),
					/* @__PURE__ */ O(N, {
						label: "Subject",
						name: "subject",
						value: u,
						onChange: (e) => d(String(e)),
						required: !0,
						placeholder: "Welcome to {{appName}}"
					}),
					/* @__PURE__ */ k("div", {
						className: "mb-4",
						children: [
							/* @__PURE__ */ k("div", {
								className: "flex items-center justify-between mb-1",
								children: [/* @__PURE__ */ O("label", {
									className: "text-sm font-semibold text-text-primary",
									children: "HTML Body"
								}), /* @__PURE__ */ O(t, {
									variant: "ghost",
									size: "sm",
									onClick: () => T((e) => !e),
									children: w ? "Hide Preview" : "Show Preview"
								})]
							}),
							/* @__PURE__ */ O(v, {
								value: p,
								onChange: (e) => m(e.target.value),
								placeholder: "<html><body>...</body></html>",
								rows: 10,
								className: "resize-y font-mono"
							}),
							w && /* @__PURE__ */ O("div", {
								className: "border border-border rounded-sm p-4 bg-white min-h-[200px] mt-2",
								dangerouslySetInnerHTML: { __html: p }
							})
						]
					}),
					/* @__PURE__ */ O(N, {
						label: "Text Body",
						name: "textBody",
						type: "textarea",
						value: h,
						onChange: (e) => g(String(e)),
						placeholder: "Plain text version of the email..."
					}),
					/* @__PURE__ */ k("section", { children: [
						/* @__PURE__ */ O("h3", {
							className: "text-base font-semibold text-text-primary mt-6 mb-2",
							children: "Variables"
						}),
						/* @__PURE__ */ O("div", {
							className: "flex flex-wrap gap-1.5 mb-2",
							children: y.map((e) => /* @__PURE__ */ k("span", {
								className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-info text-white text-sm font-medium",
								children: ["{{" + e + "}}", /* @__PURE__ */ O(t, {
									variant: "ghost",
									size: "sm",
									className: "p-0 text-white text-[14px] leading-none min-w-0 min-h-0",
									onClick: () => M(e),
									"aria-label": `Remove variable ${e}`,
									children: "x"
								})]
							}, e))
						}),
						/* @__PURE__ */ O(_, {
							placeholder: "Type variable name and press Enter",
							value: x,
							onChange: (e) => C(e.target.value),
							onKeyDown: j
						})
					] }),
					/* @__PURE__ */ k("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ O(t, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: D,
							children: D ? "Saving..." : r ? "Update Template" : "Create Template"
						}), /* @__PURE__ */ O(t, {
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
function Z({ metrics: e, users: r, pools: i, onRefresh: a, loading: o }) {
	let [s, c] = E(""), u = w(() => r ?? [], [r]), d = w(() => [
		{
			key: "email",
			header: "Email",
			sortable: !0
		},
		{
			key: "mfaEnabled",
			header: "MFA Status",
			width: "140px",
			render: (e) => /* @__PURE__ */ O(L, {
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
	return o ? /* @__PURE__ */ k(l, {
		title: "MFA Management",
		children: [/* @__PURE__ */ O("div", {
			className: "grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4",
			children: [
				1,
				2,
				3,
				4
			].map((e) => /* @__PURE__ */ k(n, {
				padding: "md",
				children: [/* @__PURE__ */ O("div", { className: "h-5 w-12 rounded bg-surface-hover animate-pulse mb-2" }), /* @__PURE__ */ O("div", { className: "h-3 w-20 rounded bg-surface-hover animate-pulse" })]
			}, e))
		}), /* @__PURE__ */ O(n, { className: "h-[200px] animate-pulse" })]
	}) : /* @__PURE__ */ k(l, {
		title: "MFA Management",
		actions: /* @__PURE__ */ O(t, {
			variant: "ghost",
			size: "lg",
			onClick: a,
			children: "Refresh"
		}),
		children: [
			e && /* @__PURE__ */ k("section", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4",
				children: [
					/* @__PURE__ */ k(n, {
						padding: "md",
						children: [/* @__PURE__ */ O("div", {
							className: "text-[1.75rem] font-bold text-info-fg mb-1",
							children: e.totalUsers
						}), /* @__PURE__ */ O("div", {
							className: "text-sm text-neutral",
							children: "Total Users"
						})]
					}),
					/* @__PURE__ */ k(n, {
						padding: "md",
						children: [/* @__PURE__ */ O("div", {
							className: "text-[1.75rem] font-bold text-success-fg mb-1",
							children: e.mfaEnabled
						}), /* @__PURE__ */ O("div", {
							className: "text-sm text-neutral",
							children: "MFA Enabled"
						})]
					}),
					/* @__PURE__ */ k(n, {
						padding: "md",
						children: [/* @__PURE__ */ O("div", {
							className: "text-[1.75rem] font-bold text-warning-fg mb-1",
							children: e.mfaDisabled
						}), /* @__PURE__ */ O("div", {
							className: "text-sm text-neutral",
							children: "MFA Disabled"
						})]
					}),
					/* @__PURE__ */ k(n, {
						padding: "md",
						children: [/* @__PURE__ */ k("div", {
							className: "text-[1.75rem] font-bold text-info-fg mb-1",
							children: [e.adoptionRate, "%"]
						}), /* @__PURE__ */ O("div", {
							className: "text-sm text-neutral",
							children: "Adoption Rate"
						})]
					})
				]
			}),
			i && i.length > 0 && /* @__PURE__ */ k("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ O("label", {
					className: "text-xs font-semibold text-neutral uppercase tracking-wide",
					children: "Filter by pool"
				}), /* @__PURE__ */ O(b, {
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
			/* @__PURE__ */ O(j, {
				columns: d,
				data: u,
				keyField: "userId",
				emptyMessage: "No user MFA data available.",
				emptyIcon: "🔑"
			})
		]
	});
}
//#endregion
//#region src/components/identity/admin/AuditPage.tsx
var ee = [
	"",
	"user",
	"pool",
	"client",
	"group",
	"template"
];
function te({ records: e, onQuery: r, onViewEntity: i, onReplay: a, loading: o, totalRecords: s }) {
	let [c, u] = E(""), [d, f] = E(""), [p, m] = E(""), [h, g] = E(""), [v, y] = E("50"), [x, C] = E(""), [T, D] = E(""), [A, M] = E(null), [N, P] = E(!1), F = S(async () => {
		await r({
			entityType: c || void 0,
			entityId: d || void 0,
			fromTime: p ? new Date(p).getTime() : void 0,
			toTime: h ? new Date(h).getTime() : void 0,
			limit: v ? Number(v) : void 0
		});
	}, [
		c,
		d,
		p,
		h,
		v,
		r
	]), I = S(async () => {
		if (!(!x || !T)) {
			P(!0);
			try {
				let e = await a(x, new Date(T).getTime());
				M(e);
			} finally {
				P(!1);
			}
		}
	}, [
		x,
		T,
		a
	]), L = w(() => [
		{
			key: "timestamp",
			header: "Timestamp",
			sortable: !0,
			render: (e) => /* @__PURE__ */ O("span", {
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
			render: (e) => /* @__PURE__ */ O(t, {
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
	return /* @__PURE__ */ k(l, {
		title: "Audit Log",
		children: [
			/* @__PURE__ */ O(n, {
				padding: "md",
				children: /* @__PURE__ */ k("div", {
					className: "flex flex-wrap gap-4 items-end",
					children: [
						/* @__PURE__ */ k("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ O("label", {
								className: "text-xs font-semibold text-neutral uppercase tracking-wide",
								children: "Entity Type"
							}), /* @__PURE__ */ O(b, {
								className: "w-40",
								value: c,
								onChange: (e) => u(e.target.value),
								options: [{
									value: "",
									label: "All"
								}, ...ee.filter(Boolean).map((e) => ({
									value: e,
									label: e
								}))]
							})]
						}),
						/* @__PURE__ */ k("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ O("label", {
								className: "text-xs font-semibold text-neutral uppercase tracking-wide",
								children: "Entity ID"
							}), /* @__PURE__ */ O(_, {
								className: "w-44",
								value: d,
								onChange: (e) => f(e.target.value),
								placeholder: "Optional"
							})]
						}),
						/* @__PURE__ */ k("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ O("label", {
								className: "text-xs font-semibold text-neutral uppercase tracking-wide",
								children: "From"
							}), /* @__PURE__ */ O(_, {
								className: "w-52",
								type: "datetime-local",
								value: p,
								onChange: (e) => m(e.target.value)
							})]
						}),
						/* @__PURE__ */ k("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ O("label", {
								className: "text-xs font-semibold text-neutral uppercase tracking-wide",
								children: "To"
							}), /* @__PURE__ */ O(_, {
								className: "w-52",
								type: "datetime-local",
								value: h,
								onChange: (e) => g(e.target.value)
							})]
						}),
						/* @__PURE__ */ k("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ O("label", {
								className: "text-xs font-semibold text-neutral uppercase tracking-wide",
								children: "Limit"
							}), /* @__PURE__ */ O(_, {
								className: "w-[70px]",
								type: "number",
								value: v,
								onChange: (e) => y(e.target.value)
							})]
						}),
						/* @__PURE__ */ O(t, {
							variant: "primary",
							size: "lg",
							onClick: F,
							disabled: o,
							children: o ? "Querying..." : "Query"
						})
					]
				})
			}),
			s !== void 0 && /* @__PURE__ */ k("p", {
				className: "text-sm text-text-tertiary m-0",
				children: [s, " total record(s)"]
			}),
			/* @__PURE__ */ O(j, {
				columns: L,
				data: e,
				keyField: "timestamp",
				loading: o,
				emptyMessage: "No audit records found. Adjust filters and query.",
				emptyIcon: "📜"
			}),
			/* @__PURE__ */ k(n, {
				padding: "md",
				children: [
					/* @__PURE__ */ O("h3", {
						className: "text-base font-semibold text-text-primary mb-4 mt-0",
						children: "Point-in-Time Replay"
					}),
					/* @__PURE__ */ k("div", {
						className: "flex flex-wrap gap-4 items-end mb-4",
						children: [
							/* @__PURE__ */ k("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ O("label", {
									className: "text-xs font-semibold text-neutral uppercase tracking-wide",
									children: "Entity ID"
								}), /* @__PURE__ */ O(_, {
									className: "w-44",
									value: x,
									onChange: (e) => C(e.target.value),
									placeholder: "entity-id"
								})]
							}),
							/* @__PURE__ */ k("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ O("label", {
									className: "text-xs font-semibold text-neutral uppercase tracking-wide",
									children: "At Timestamp"
								}), /* @__PURE__ */ O(_, {
									className: "w-52",
									type: "datetime-local",
									value: T,
									onChange: (e) => D(e.target.value)
								})]
							}),
							/* @__PURE__ */ O(t, {
								variant: "primary",
								size: "lg",
								onClick: I,
								disabled: N || !x || !T,
								children: N ? "Replaying..." : "Replay"
							})
						]
					}),
					A && /* @__PURE__ */ O("pre", {
						className: "p-4 bg-surface-panel border border-border rounded-md font-mono text-xs text-text-primary overflow-x-auto whitespace-pre-wrap max-h-[300px] overflow-y-auto m-0",
						children: JSON.stringify(A, null, 2)
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/identity/admin/SetupGuidePage.tsx
function ne({ status: r, onNavigate: i }) {
	let [a, o] = E(null), s = S((e) => {
		o((t) => t === e ? null : e);
	}, []), c = w(() => [
		{
			title: "Create User Pool",
			done: r.hasUserPools,
			content: /* @__PURE__ */ k("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ O("p", {
					className: "m-0 text-sm text-text-secondary",
					children: r.hasUserPools ? `${r.poolCount} pool(s) configured.` : "No user pools yet."
				}), /* @__PURE__ */ O("div", { children: /* @__PURE__ */ O(t, {
					variant: "ghost",
					size: "sm",
					onClick: () => i("/identity/admin/pools/new"),
					children: "Create a User Pool"
				}) })]
			})
		},
		{
			title: "Register Application",
			done: r.hasClients,
			content: /* @__PURE__ */ k("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ O("p", {
					className: "m-0 text-sm text-text-secondary",
					children: r.hasClients ? `${r.clientCount} application(s) registered.` : "No applications registered."
				}), /* @__PURE__ */ O("div", { children: /* @__PURE__ */ O(t, {
					variant: "ghost",
					size: "sm",
					onClick: () => i("/identity/admin/applications/new"),
					children: "Register an Application"
				}) })]
			})
		},
		{
			title: "Create Admin User",
			done: r.hasAdminUser,
			content: /* @__PURE__ */ k("div", {
				className: "flex flex-col gap-2",
				children: [r.hasAdminUser ? /* @__PURE__ */ k(D, { children: [/* @__PURE__ */ k("p", {
					className: "m-0 text-sm text-text-secondary",
					children: ["Admin users: ", r.adminEmails.join(", ")]
				}), /* @__PURE__ */ k("p", {
					className: "m-0 text-sm text-text-secondary",
					children: [r.totalUsers, " total user(s) across all pools."]
				})] }) : /* @__PURE__ */ O("p", {
					className: "m-0 text-sm text-text-secondary",
					children: "No admin user found. Create one in a user pool."
				}), r.firstPoolId && /* @__PURE__ */ O("div", { children: /* @__PURE__ */ O(t, {
					variant: "ghost",
					size: "sm",
					onClick: () => i(`/identity/admin/pools/${r.firstPoolId}/users/new`),
					children: "Create Admin User"
				}) })]
			})
		},
		{
			title: "Configure SMTP",
			done: r.smtpConfigured,
			content: /* @__PURE__ */ O("p", {
				className: "m-0 text-sm text-text-secondary",
				children: r.smtpConfigured ? `SMTP configured: ${r.smtpHost}` : "SMTP is not yet configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS environment variables."
			})
		},
		{
			title: "Configure Issuer",
			done: r.issuerConfigured,
			content: /* @__PURE__ */ k("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ k("p", {
					className: "m-0 text-sm text-text-secondary",
					children: ["Issuer: ", /* @__PURE__ */ O("code", {
						className: "px-1.5 py-0.5 bg-surface-hover rounded text-xs font-mono",
						children: r.issuer || "Not set"
					})]
				}), r.wellKnownUrl && /* @__PURE__ */ k("p", {
					className: "m-0 text-sm text-text-secondary",
					children: [
						"Well-known URL:",
						" ",
						/* @__PURE__ */ O("a", {
							href: r.wellKnownUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-info-fg underline",
							children: r.wellKnownUrl
						})
					]
				})]
			})
		},
		{
			title: "Test Integration",
			done: r.hasUserPools && r.hasClients && r.issuerConfigured,
			content: /* @__PURE__ */ O("div", {
				className: "flex flex-col gap-3",
				children: r.firstClientId ? /* @__PURE__ */ k(D, { children: [
					/* @__PURE__ */ k("p", {
						className: "m-0 text-sm text-text-secondary",
						children: ["Client ID: ", /* @__PURE__ */ O("code", {
							className: "px-1.5 py-0.5 bg-surface-hover rounded text-xs font-mono",
							children: r.firstClientId
						})]
					}),
					/* @__PURE__ */ O("p", {
						className: "m-0 text-sm text-text-secondary",
						children: "Use this code snippet to test the OIDC authorization flow:"
					}),
					/* @__PURE__ */ O("pre", {
						className: "px-4 py-3 bg-surface-inverse text-text-inverse rounded-md font-mono text-xs overflow-x-auto whitespace-pre m-0",
						children: `// OIDC Authorization Code Flow
const authUrl = \`\${issuer}/authorize?\` + new URLSearchParams({
  client_id: '${r.firstClientId}',
  response_type: 'code',
  redirect_uri: 'http://localhost:3000/callback',
  scope: 'openid profile email',
}).toString();

window.location.href = authUrl;`
					})
				] }) : /* @__PURE__ */ O("p", {
					className: "m-0 text-sm text-text-secondary",
					children: "Complete the previous steps first to test the integration."
				})
			})
		}
	], [r, i]), u = c.filter((e) => e.done).length, d = Math.round(u / c.length * 100);
	return /* @__PURE__ */ k(l, {
		title: "Setup Guide",
		description: `${u} of ${c.length} steps completed (${d}%)`,
		children: [/* @__PURE__ */ O("div", {
			className: "h-2 bg-surface-hover rounded-full overflow-hidden",
			children: /* @__PURE__ */ O("div", {
				className: "h-full bg-success rounded-full transition-[width] duration-300 ease-in-out",
				style: { width: `${d}%` }
			})
		}), /* @__PURE__ */ O("div", {
			className: "flex flex-col gap-2",
			children: c.map((t, r) => /* @__PURE__ */ k(n, { children: [/* @__PURE__ */ k("div", {
				className: "flex items-center justify-between px-5 py-4 cursor-pointer select-none",
				onClick: () => s(r),
				role: "button",
				"aria-expanded": a === r,
				children: [/* @__PURE__ */ k("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ O("div", {
						className: e("w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0", t.done ? "bg-success text-white" : "bg-surface-hover text-text-tertiary"),
						children: t.done ? "✓" : r + 1
					}), /* @__PURE__ */ O("span", {
						className: "text-sm font-medium text-text-primary",
						children: t.title
					})]
				}), /* @__PURE__ */ O("span", {
					className: "text-text-tertiary text-sm",
					children: a === r ? "▲" : "▼"
				})]
			}), a === r && /* @__PURE__ */ O("div", {
				className: "px-5 pb-5 pt-0 border-t border-border-subtle",
				children: /* @__PURE__ */ O("div", {
					className: "pt-4",
					children: t.content
				})
			})] }, r))
		})]
	});
}
//#endregion
//#region src/components/identity/admin/DiagnosticsPage.tsx
function re({ data: e }) {
	return /* @__PURE__ */ O("pre", {
		className: "p-5 font-mono text-xs text-text-primary overflow-x-auto whitespace-pre-wrap max-h-[400px] overflow-y-auto m-0 bg-surface-panel",
		children: JSON.stringify(e, null, 2)
	});
}
function ie({ rates: e }) {
	let t = Object.entries(e);
	return t.length === 0 ? /* @__PURE__ */ O("p", {
		className: "p-5 text-center text-text-tertiary text-sm m-0",
		children: "No rate limiter data available."
	}) : /* @__PURE__ */ k(a, { children: [/* @__PURE__ */ O(c, { children: /* @__PURE__ */ k("tr", { children: [/* @__PURE__ */ O(o, { children: "Key" }), /* @__PURE__ */ O(o, { children: "Value" })] }) }), /* @__PURE__ */ O(r, { children: t.map(([e, t]) => /* @__PURE__ */ k(u, { children: [/* @__PURE__ */ O(i, {
		className: "font-mono text-xs",
		children: e
	}), /* @__PURE__ */ O(i, { children: typeof t == "object" ? JSON.stringify(t) : String(t) })] }, e)) })] });
}
function ae({ diagnostics: e, rates: s, dlq: d, onRedrive: f, onPurge: m, onRefresh: h, loading: g }) {
	let [_, v] = E(!1), y = T(null);
	C(() => (_ ? y.current = setInterval(h, 1e4) : y.current &&= (clearInterval(y.current), null), () => {
		y.current && clearInterval(y.current);
	}), [_, h]);
	let b = S(async (e) => {
		await f(e);
	}, [f]), w = S(async (e) => {
		await m(e);
	}, [m]);
	return g ? /* @__PURE__ */ O(l, {
		title: "Diagnostics",
		children: /* @__PURE__ */ O("div", {
			className: "flex flex-col gap-4",
			children: [
				1,
				2,
				3
			].map((e) => /* @__PURE__ */ O(n, { className: "h-[120px] animate-pulse" }, e))
		})
	}) : /* @__PURE__ */ k(l, {
		title: "Diagnostics",
		actions: /* @__PURE__ */ k("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ k("label", {
				className: "flex items-center gap-1.5 text-sm text-neutral cursor-pointer",
				children: [/* @__PURE__ */ O(x, {
					checked: _,
					onChange: v,
					className: "rounded"
				}), "Auto-refresh (10s)"]
			}), /* @__PURE__ */ O(t, {
				variant: "ghost",
				size: "lg",
				onClick: h,
				children: "Refresh"
			})]
		}),
		children: [
			/* @__PURE__ */ k(n, { children: [/* @__PURE__ */ O("div", {
				className: "px-5 py-3 border-b border-border bg-surface-panel",
				children: /* @__PURE__ */ O("h3", {
					className: "text-sm font-semibold text-text-primary m-0",
					children: "Node / Cluster Diagnostics"
				})
			}), e ? /* @__PURE__ */ O(re, { data: e }) : /* @__PURE__ */ O("p", {
				className: "p-5 text-center text-text-tertiary text-sm m-0",
				children: "No diagnostics data available."
			})] }),
			/* @__PURE__ */ k(n, { children: [/* @__PURE__ */ O("div", {
				className: "px-5 py-3 border-b border-border bg-surface-panel",
				children: /* @__PURE__ */ O("h3", {
					className: "text-sm font-semibold text-text-primary m-0",
					children: "Rate Limiter Stats"
				})
			}), s ? /* @__PURE__ */ O(ie, { rates: s }) : /* @__PURE__ */ O("p", {
				className: "p-5 text-center text-text-tertiary text-sm m-0",
				children: "No rate data available."
			})] }),
			/* @__PURE__ */ k(n, { children: [/* @__PURE__ */ O("div", {
				className: "px-5 py-3 border-b border-border bg-surface-panel",
				children: /* @__PURE__ */ O("h3", {
					className: "text-sm font-semibold text-text-primary m-0",
					children: "Dead Letter Queue"
				})
			}), !d || d.length === 0 ? /* @__PURE__ */ O("p", {
				className: "p-5 text-center text-text-tertiary text-sm m-0",
				children: "Dead letter queue is empty."
			}) : /* @__PURE__ */ k(a, { children: [/* @__PURE__ */ O(c, { children: /* @__PURE__ */ k("tr", { children: [
				/* @__PURE__ */ O(o, { children: "ID" }),
				/* @__PURE__ */ O(o, { children: "Error" }),
				/* @__PURE__ */ O(o, { children: "Failed At" }),
				/* @__PURE__ */ O(o, { children: "Retries" }),
				/* @__PURE__ */ O(o, {
					className: "text-right",
					children: "Actions"
				})
			] }) }), /* @__PURE__ */ O(r, { children: d.map((e) => /* @__PURE__ */ k(u, { children: [
				/* @__PURE__ */ k(i, {
					className: "font-mono text-xs",
					children: [e.id.substring(0, 12), "..."]
				}),
				/* @__PURE__ */ O(i, { children: /* @__PURE__ */ O(p, {
					tone: "danger",
					size: "xs",
					children: e.error
				}) }),
				/* @__PURE__ */ O(i, {
					className: "text-xs text-neutral",
					children: new Date(e.failedAt).toLocaleString()
				}),
				/* @__PURE__ */ O(i, { children: /* @__PURE__ */ O(p, {
					tone: "neutral",
					size: "xs",
					mono: !0,
					children: e.retryCount
				}) }),
				/* @__PURE__ */ O(i, {
					className: "text-right",
					children: /* @__PURE__ */ k("div", {
						className: "flex items-center justify-end gap-2",
						children: [/* @__PURE__ */ O(t, {
							variant: "ghost",
							size: "sm",
							onClick: () => b(e.id),
							children: "Redrive"
						}), /* @__PURE__ */ O(t, {
							variant: "danger",
							size: "sm",
							onClick: () => w(e.id),
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
function oe({ uid: n, interactionUrl: r, clientName: i, logoUrl: a, error: o = null, onLogin: s, onRegister: c, onForgotPassword: l, registrationEnabled: u = !0, forgotPasswordEnabled: d = !0, defaultTab: p = "signin" }) {
	let [m, h] = E(() => p === "register" && !u || p === "forgot" && !d ? "signin" : p), [g, _] = E(!1), [v, b] = E(null), [x, C] = E(""), [w, T] = E(""), [A, j] = E(""), [M, P] = E(""), [F, I] = E(""), [L, R] = E(""), [z, B] = E(""), [V, H] = E(!1), [U, W] = E(""), [G, K] = E(!1), q = o || v, J = S(async (e) => {
		e.preventDefault(), b(null), _(!0);
		try {
			await s(x, w);
		} catch (e) {
			b(e instanceof Error ? e.message : "Login failed");
		} finally {
			_(!1);
		}
	}, [
		x,
		w,
		s
	]), Y = S(async (e) => {
		if (e.preventDefault(), b(null), M !== F) {
			b("Passwords do not match");
			return;
		}
		_(!0);
		try {
			await c({
				email: A,
				password: M,
				givenName: L || void 0,
				familyName: z || void 0,
				enableMfa: V || void 0
			});
		} catch (e) {
			b(e instanceof Error ? e.message : "Registration failed");
		} finally {
			_(!1);
		}
	}, [
		A,
		M,
		F,
		L,
		z,
		V,
		c
	]), X = S(async (e) => {
		e.preventDefault(), b(null), _(!0);
		try {
			await l(U), K(!0);
		} catch (e) {
			b(e instanceof Error ? e.message : "Request failed");
		} finally {
			_(!1);
		}
	}, [U, l]), Z = (e) => {
		h(e), b(null), K(!1);
	};
	return /* @__PURE__ */ O("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ k("div", {
			className: "w-full max-w-[440px] bg-white rounded-xl shadow-md p-8",
			role: "main",
			"aria-label": "Authentication",
			children: [
				/* @__PURE__ */ k("header", {
					className: "flex flex-col items-center gap-3 mb-6",
					children: [a && /* @__PURE__ */ O("img", {
						src: a,
						alt: "",
						className: "w-14 h-14 object-contain rounded-md"
					}), i && /* @__PURE__ */ O("h1", {
						className: "text-xl font-bold text-text-primary m-0",
						children: i
					})]
				}),
				/* @__PURE__ */ k("div", {
					className: "flex border-b border-border mb-6",
					role: "tablist",
					"aria-label": "Authentication method",
					onKeyDown: y,
					children: [
						/* @__PURE__ */ O(t, {
							variant: "ghost",
							size: "sm",
							role: "tab",
							"aria-selected": m === "signin",
							tabIndex: m === "signin" ? 0 : -1,
							className: e("flex-1 rounded-none border-b-2", m === "signin" ? "border-b-info text-info-fg font-semibold" : "border-b-transparent text-neutral font-normal"),
							onClick: () => Z("signin"),
							children: "Sign In"
						}),
						u && /* @__PURE__ */ O(t, {
							variant: "ghost",
							size: "sm",
							role: "tab",
							"aria-selected": m === "register",
							tabIndex: m === "register" ? 0 : -1,
							className: e("flex-1 rounded-none border-b-2", m === "register" ? "border-b-info text-info-fg font-semibold" : "border-b-transparent text-neutral font-normal"),
							onClick: () => Z("register"),
							children: "Register"
						}),
						d && /* @__PURE__ */ O(t, {
							variant: "ghost",
							size: "sm",
							role: "tab",
							"aria-selected": m === "forgot",
							tabIndex: m === "forgot" ? 0 : -1,
							className: e("flex-1 rounded-none border-b-2", m === "forgot" ? "border-b-info text-info-fg font-semibold" : "border-b-transparent text-neutral font-normal"),
							onClick: () => Z("forgot"),
							children: "Forgot Password"
						})
					]
				}),
				q && /* @__PURE__ */ O("div", {
					className: "mb-5",
					children: /* @__PURE__ */ O(f, {
						variant: "error",
						children: q
					})
				}),
				m === "signin" && /* @__PURE__ */ k("form", {
					onSubmit: J,
					"aria-label": "Sign in form",
					children: [
						/* @__PURE__ */ O("input", {
							type: "hidden",
							name: "uid",
							value: n
						}),
						/* @__PURE__ */ O(N, {
							label: "Email",
							name: "login-email",
							type: "email",
							value: x,
							onChange: (e) => C(String(e)),
							required: !0,
							placeholder: "you@example.com",
							disabled: g
						}),
						/* @__PURE__ */ O(N, {
							label: "Password",
							name: "login-password",
							type: "password",
							value: w,
							onChange: (e) => T(String(e)),
							required: !0,
							disabled: g
						}),
						/* @__PURE__ */ O(t, {
							type: "submit",
							variant: "primary",
							size: "lg",
							fullWidth: !0,
							disabled: g,
							children: g ? "Signing in..." : "Sign In"
						})
					]
				}),
				m === "register" && /* @__PURE__ */ k("form", {
					onSubmit: Y,
					"aria-label": "Registration form",
					children: [
						/* @__PURE__ */ O(N, {
							label: "Email",
							name: "reg-email",
							type: "email",
							value: A,
							onChange: (e) => j(String(e)),
							required: !0,
							placeholder: "you@example.com",
							disabled: g
						}),
						/* @__PURE__ */ k("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ O("div", {
								className: "flex-1",
								children: /* @__PURE__ */ O(N, {
									label: "Given Name",
									name: "reg-given",
									value: L,
									onChange: (e) => R(String(e)),
									disabled: g
								})
							}), /* @__PURE__ */ O("div", {
								className: "flex-1",
								children: /* @__PURE__ */ O(N, {
									label: "Family Name",
									name: "reg-family",
									value: z,
									onChange: (e) => B(String(e)),
									disabled: g
								})
							})]
						}),
						/* @__PURE__ */ O(N, {
							label: "Password",
							name: "reg-password",
							type: "password",
							value: M,
							onChange: (e) => P(String(e)),
							required: !0,
							disabled: g
						}),
						/* @__PURE__ */ O(N, {
							label: "Confirm Password",
							name: "reg-confirm",
							type: "password",
							value: F,
							onChange: (e) => I(String(e)),
							required: !0,
							disabled: g
						}),
						/* @__PURE__ */ O(N, {
							label: "Enable Multi-Factor Authentication",
							name: "reg-mfa",
							type: "checkbox",
							value: V,
							onChange: (e) => H(!!e),
							disabled: g
						}),
						/* @__PURE__ */ O(t, {
							type: "submit",
							variant: "primary",
							size: "lg",
							fullWidth: !0,
							disabled: g,
							children: g ? "Creating account..." : "Create Account"
						})
					]
				}),
				m === "forgot" && /* @__PURE__ */ O("form", {
					onSubmit: X,
					"aria-label": "Forgot password form",
					children: G ? /* @__PURE__ */ O(f, {
						variant: "success",
						children: "If an account exists for that email, a password reset link has been sent."
					}) : /* @__PURE__ */ k(D, { children: [
						/* @__PURE__ */ O("p", {
							className: "text-sm text-neutral mb-4 mt-0 leading-relaxed",
							children: "Enter your email address and we'll send you a link to reset your password."
						}),
						/* @__PURE__ */ O(N, {
							label: "Email",
							name: "forgot-email",
							type: "email",
							value: U,
							onChange: (e) => W(String(e)),
							required: !0,
							placeholder: "you@example.com",
							disabled: g
						}),
						/* @__PURE__ */ O(t, {
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
var se = {
	openid: "Verify your identity",
	profile: "Access your name and profile information",
	email: "Access your email address",
	address: "Access your mailing address",
	phone: "Access your phone number",
	offline_access: "Maintain access when you are not present"
};
function ce(e) {
	return se[e] || `Access: ${e}`;
}
function le({ clientName: n, scopes: r, redirectUri: i, onAuthorize: a, onDeny: o, logoUrl: s }) {
	let [c, l] = E(!1), u = S(async () => {
		l(!0);
		try {
			await a();
		} finally {
			l(!1);
		}
	}, [a]), d = S(async () => {
		l(!0);
		try {
			await o();
		} finally {
			l(!1);
		}
	}, [o]);
	return /* @__PURE__ */ O("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ k("div", {
			className: "w-full max-w-[440px] bg-white rounded-xl shadow-md overflow-hidden",
			role: "main",
			"aria-label": "Authorization consent",
			children: [
				/* @__PURE__ */ k("header", {
					className: "flex flex-col items-center gap-3 px-8 pt-8 pb-5",
					children: [
						s && /* @__PURE__ */ O("img", {
							src: s,
							alt: "",
							className: "w-14 h-14 object-contain rounded-md"
						}),
						/* @__PURE__ */ k("h1", {
							className: "text-xl font-bold text-text-primary m-0 text-center",
							children: ["Authorize ", n]
						}),
						/* @__PURE__ */ O("p", {
							className: "text-sm text-neutral m-0 text-center leading-relaxed",
							children: "This application is requesting access to your account."
						})
					]
				}),
				/* @__PURE__ */ k("div", {
					className: "mx-8 border border-border rounded-md overflow-hidden mb-6",
					children: [/* @__PURE__ */ O("p", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-neutral px-4 py-2.5 m-0 bg-surface-panel border-b border-border",
						children: "Requested Permissions"
					}), /* @__PURE__ */ O("ul", {
						className: "list-none p-0 m-0",
						"aria-label": "Requested permissions",
						children: r.map((t, n) => /* @__PURE__ */ k("li", {
							className: e("flex items-center gap-3 px-4 py-3 text-sm text-text-primary", n < r.length - 1 && "border-b border-border"),
							children: [/* @__PURE__ */ O("span", {
								className: "w-2 h-2 rounded-full bg-info shrink-0",
								"aria-hidden": "true"
							}), /* @__PURE__ */ O("span", { children: ce(t) })]
						}, t))
					})]
				}),
				/* @__PURE__ */ k("div", {
					className: "px-8 pb-8",
					children: [i && /* @__PURE__ */ k("p", {
						className: "text-[11px] text-text-tertiary mb-5 mt-0 break-all leading-relaxed",
						children: ["You will be redirected to: ", /* @__PURE__ */ O("strong", {
							className: "text-neutral",
							children: i
						})]
					}), /* @__PURE__ */ k("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ O(t, {
							variant: "ghost",
							size: "lg",
							fullWidth: !0,
							onClick: d,
							disabled: c,
							children: "Deny"
						}), /* @__PURE__ */ O(t, {
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
function Q({ value: e, size: t = 200, label: n }) {
	return /* @__PURE__ */ k("figure", {
		className: "flex flex-col items-center gap-2 m-0 p-4 border border-border rounded-md bg-white",
		children: [/* @__PURE__ */ O("img", {
			src: e,
			alt: n || "QR Code",
			width: t,
			height: t,
			className: "block rounded-sm [image-rendering:pixelated]"
		}), n && /* @__PURE__ */ O("figcaption", {
			className: "text-sm text-neutral text-center",
			children: n
		})]
	});
}
//#endregion
//#region src/components/identity/shared/CodeInput.tsx
function $({ length: t = 6, onComplete: n, error: r = null, disabled: i = !1, autoFocus: a = !1 }) {
	let [o, s] = E(Array(t).fill("")), c = T([]);
	C(() => {
		a && c.current[0] && c.current[0].focus();
	}, [a]);
	let l = S((e) => {
		e >= 0 && e < t && c.current[e] && (c.current[e].focus(), c.current[e].select());
	}, [t]), u = T(null);
	C(() => {
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
	let d = S((e, n) => {
		let r = n.replace(/\D/g, "").slice(-1);
		s((t) => {
			let n = [...t];
			return n[e] = r, n;
		}), r && e < t - 1 && l(e + 1);
	}, [t, l]), f = S((e, n) => {
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
	]), p = S((e) => {
		e.preventDefault();
		let r = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, t);
		if (!r) return;
		let i = Array(t).fill("");
		for (let e = 0; e < r.length; e++) i[e] = r[e];
		s(i), r.length === t ? setTimeout(() => n(r), 0) : l(Math.min(r.length, t - 1));
	}, [
		t,
		n,
		l
	]);
	return /* @__PURE__ */ k("div", {
		className: "flex flex-col items-center gap-2",
		children: [/* @__PURE__ */ O("div", {
			className: "flex gap-2",
			role: "group",
			"aria-label": "Verification code input",
			children: Array.from({ length: t }, (n, a) => /* @__PURE__ */ O("input", {
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
		}), r && /* @__PURE__ */ O("p", {
			role: "alert",
			className: "m-0 text-sm text-danger-fg",
			children: r
		})]
	});
}
//#endregion
//#region src/components/identity/auth/MfaSetupPage.tsx
var ue = [
	"name",
	"scan",
	"verify",
	"backup"
], de = [
	"Name",
	"Scan",
	"Verify",
	"Backup"
];
function fe({ onSetup: n, onVerify: r, onComplete: i, userEmail: a, initialStep: o = "name", initialSetupResult: s, initialDeviceName: c = "" }) {
	let [l, u] = E(o === "scan" && !s ? "name" : o), [d, p] = E(!1), [m, h] = E(null), [g, _] = E(c), [v, y] = E(s ?? null), [b, x] = E(s?.backupCodes ?? []), [w, D] = E(!1), A = ue.indexOf(l), j = S(async (e) => {
		if (e.preventDefault(), g.trim()) {
			h(null), p(!0);
			try {
				let e = await n(g.trim());
				y(e), x(e.backupCodes), u("scan");
			} catch (e) {
				h(e instanceof Error ? e.message : "Setup failed");
			} finally {
				p(!1);
			}
		}
	}, [g, n]), M = S(async (e) => {
		if (v) {
			h(null), p(!0);
			try {
				let t = await r(v.deviceId, e);
				t.success ? (t.backupCodes && x(t.backupCodes), u("backup")) : h("Verification failed. Please try again.");
			} catch (e) {
				h(e instanceof Error ? e.message : "Verification failed");
			} finally {
				p(!1);
			}
		}
	}, [v, r]), P = T(null);
	C(() => () => {
		P.current && clearTimeout(P.current);
	}, []);
	let F = S(async () => {
		try {
			await navigator.clipboard.writeText(b.join("\n")), D(!0), P.current && clearTimeout(P.current), P.current = setTimeout(() => D(!1), 2e3);
		} catch {}
	}, [b]);
	return /* @__PURE__ */ O("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ k("div", {
			className: "w-full max-w-[480px] bg-white rounded-xl shadow-md p-8",
			role: "main",
			"aria-label": "MFA setup",
			children: [
				/* @__PURE__ */ O("h1", {
					className: "text-xl font-bold text-text-primary mb-2 mt-0 text-center",
					children: "Set Up Multi-Factor Authentication"
				}),
				a && /* @__PURE__ */ O("p", {
					className: "text-sm text-neutral mb-5 mt-0 text-center",
					children: a
				}),
				/* @__PURE__ */ O("div", {
					className: "flex justify-center gap-6 mb-6",
					role: "group",
					"aria-label": "Setup progress",
					children: ue.map((t, n) => /* @__PURE__ */ k("div", {
						className: "flex flex-col items-center gap-1.5",
						children: [/* @__PURE__ */ O("div", {
							className: e("w-3 h-3 rounded-full transition-colors duration-200", n < A ? "bg-success" : n === A ? "bg-info" : "bg-surface-emphasis"),
							"aria-label": `Step ${n + 1}${n === A ? " (current)" : n < A ? " (completed)" : ""}`
						}), /* @__PURE__ */ O("span", {
							className: e("text-[10px] uppercase tracking-wide font-medium", n === A ? "text-text-primary" : "text-text-tertiary"),
							children: de[n]
						})]
					}, t))
				}),
				m && /* @__PURE__ */ O("div", {
					className: "mb-5",
					children: /* @__PURE__ */ O(f, {
						variant: "error",
						children: m
					})
				}),
				l === "name" && /* @__PURE__ */ k("form", {
					onSubmit: j,
					"aria-label": "Name your device",
					children: [
						/* @__PURE__ */ O("p", {
							className: "text-sm text-neutral mb-4 mt-0 text-center leading-relaxed",
							children: "Give your authenticator device a name so you can identify it later."
						}),
						/* @__PURE__ */ O(N, {
							label: "Device Name",
							name: "device-name",
							value: g,
							onChange: (e) => _(String(e)),
							required: !0,
							placeholder: "e.g., My Phone",
							disabled: d
						}),
						/* @__PURE__ */ O(t, {
							type: "submit",
							variant: "primary",
							size: "lg",
							fullWidth: !0,
							disabled: d || !g.trim(),
							children: d ? "Setting up..." : "Continue"
						})
					]
				}),
				l === "scan" && v && /* @__PURE__ */ k("div", { children: [
					/* @__PURE__ */ O(t, {
						variant: "ghost",
						size: "sm",
						className: "p-0 mb-4",
						onClick: () => u("name"),
						"aria-label": "Go back to name step",
						children: "← Back"
					}),
					/* @__PURE__ */ O("p", {
						className: "text-sm text-neutral mb-5 mt-0 text-center leading-relaxed",
						children: "Scan this QR code with your authenticator app"
					}),
					/* @__PURE__ */ O("div", {
						className: "flex justify-center mb-5",
						children: /* @__PURE__ */ O(Q, {
							value: v.qrCode,
							size: 200,
							label: g ? `Device: ${g}` : void 0
						})
					}),
					/* @__PURE__ */ O("p", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary text-center mb-2 mt-0",
						children: "Or enter this secret manually"
					}),
					/* @__PURE__ */ O("div", {
						className: "px-4 py-3 bg-surface-panel border border-border rounded-md font-mono text-sm text-text-primary break-all text-center mb-6 select-all",
						children: v.secret
					}),
					/* @__PURE__ */ O(t, {
						variant: "primary",
						size: "lg",
						fullWidth: !0,
						onClick: () => u("verify"),
						children: "I've scanned it"
					})
				] }),
				l === "verify" && /* @__PURE__ */ k("div", { children: [
					/* @__PURE__ */ O(t, {
						variant: "ghost",
						size: "sm",
						className: "p-0 mb-4",
						onClick: () => u("scan"),
						"aria-label": "Go back to scan step",
						children: "← Back"
					}),
					/* @__PURE__ */ O("p", {
						className: "text-sm text-neutral mb-6 mt-0 text-center leading-relaxed",
						children: "Enter the 6-digit code from your authenticator app to confirm setup"
					}),
					/* @__PURE__ */ O($, {
						onComplete: M,
						error: m,
						disabled: d,
						autoFocus: !0
					}),
					d && /* @__PURE__ */ O("p", {
						className: "text-center text-sm text-text-tertiary mt-3",
						children: "Verifying..."
					})
				] }),
				l === "backup" && /* @__PURE__ */ k("div", { children: [
					/* @__PURE__ */ O("div", {
						className: "w-14 h-14 mx-auto mb-5 rounded-full bg-success-bg flex items-center justify-center",
						children: /* @__PURE__ */ O("svg", {
							width: "28",
							height: "28",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							className: "text-success-fg",
							children: /* @__PURE__ */ O("polyline", { points: "20 6 9 17 4 12" })
						})
					}),
					/* @__PURE__ */ O("p", {
						className: "text-sm text-neutral mb-5 mt-0 text-center leading-relaxed",
						children: "Save these backup codes in a safe place. Each code can only be used once."
					}),
					/* @__PURE__ */ O("div", {
						className: "grid grid-cols-2 gap-2.5 mb-6",
						children: b.map((e, t) => /* @__PURE__ */ O("div", {
							className: "px-3 py-2.5 bg-surface-panel border border-border rounded-md font-mono text-sm text-text-primary text-center select-all",
							children: e
						}, t))
					}),
					/* @__PURE__ */ O(t, {
						variant: "primary",
						size: "lg",
						fullWidth: !0,
						onClick: F,
						children: w ? "Copied!" : "Copy All Codes"
					}),
					/* @__PURE__ */ O("div", {
						className: "mt-3",
						children: /* @__PURE__ */ O(t, {
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
function pe({ onVerify: e, onVerifyBackup: n, error: r = null, defaultMode: i = "totp" }) {
	let [a, o] = E(i), [s, c] = E(!1), [l, u] = E(null), [d, p] = E(""), m = r || l, h = S(async (t) => {
		u(null), c(!0);
		try {
			await e(t);
		} catch (e) {
			u(e instanceof Error ? e.message : "Verification failed");
		} finally {
			c(!1);
		}
	}, [e]), g = S(async (e) => {
		if (e.preventDefault(), d.trim()) {
			u(null), c(!0);
			try {
				await n(d.trim());
			} catch (e) {
				u(e instanceof Error ? e.message : "Verification failed");
			} finally {
				c(!1);
			}
		}
	}, [d, n]);
	return /* @__PURE__ */ O("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ k("div", {
			className: "w-full max-w-[440px] bg-white rounded-xl shadow-md p-8",
			role: "main",
			"aria-label": "Multi-factor verification",
			children: [
				/* @__PURE__ */ O("div", {
					className: "w-14 h-14 mx-auto mb-5 rounded-full bg-info-bg flex items-center justify-center",
					children: /* @__PURE__ */ k("svg", {
						width: "28",
						height: "28",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						className: "text-info-fg",
						children: [/* @__PURE__ */ O("rect", {
							x: "3",
							y: "11",
							width: "18",
							height: "11",
							rx: "2",
							ry: "2"
						}), /* @__PURE__ */ O("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })]
					})
				}),
				/* @__PURE__ */ O("h1", {
					className: "text-xl font-bold text-text-primary mb-2 mt-0 text-center",
					children: "Verify Your Identity"
				}),
				a === "totp" ? /* @__PURE__ */ k(D, { children: [
					/* @__PURE__ */ O("p", {
						className: "text-sm text-neutral mb-6 mt-0 text-center leading-relaxed",
						children: "Enter the 6-digit code from your authenticator app"
					}),
					m && /* @__PURE__ */ O("div", {
						className: "mb-5",
						children: /* @__PURE__ */ O(f, {
							variant: "error",
							children: m
						})
					}),
					/* @__PURE__ */ O($, {
						onComplete: h,
						error: null,
						disabled: s,
						autoFocus: !0
					}),
					s && /* @__PURE__ */ O("p", {
						className: "text-center text-sm text-text-tertiary mt-3",
						children: "Verifying..."
					}),
					/* @__PURE__ */ O(t, {
						variant: "ghost",
						size: "sm",
						className: "block mt-6 mx-auto underline text-info-fg",
						onClick: () => {
							o("backup"), u(null);
						},
						children: "Use a backup code instead"
					})
				] }) : /* @__PURE__ */ k(D, { children: [
					/* @__PURE__ */ O("p", {
						className: "text-sm text-neutral mb-6 mt-0 text-center leading-relaxed",
						children: "Enter one of your backup codes"
					}),
					m && /* @__PURE__ */ O("div", {
						className: "mb-5",
						children: /* @__PURE__ */ O(f, {
							variant: "error",
							children: m
						})
					}),
					/* @__PURE__ */ k("form", {
						onSubmit: g,
						"aria-label": "Backup code verification",
						children: [/* @__PURE__ */ O(N, {
							label: "Backup Code",
							name: "backup-code",
							value: d,
							onChange: (e) => p(String(e)),
							required: !0,
							placeholder: "XXXX-XXXX-XXXX",
							disabled: s
						}), /* @__PURE__ */ O(t, {
							type: "submit",
							variant: "primary",
							size: "lg",
							fullWidth: !0,
							disabled: s || !d.trim(),
							children: s ? "Verifying..." : "Verify Backup Code"
						})]
					}),
					/* @__PURE__ */ O(t, {
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
function me(e) {
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
function he({ devices: e, userEmail: n, mfaEnabled: r, onAddDevice: i, onRenameDevice: a, onRemoveDevice: o, loading: s = !1 }) {
	let [c, l] = E(null), [u, d] = E(null), [f, m] = E(""), [_, v] = E(!1), y = S(async () => {
		if (c) {
			v(!0);
			try {
				await o(c);
			} finally {
				v(!1), l(null);
			}
		}
	}, [c, o]), b = S(async (e) => {
		if (f.trim()) {
			v(!0);
			try {
				await a(e, f.trim());
			} finally {
				v(!1), d(null), m("");
			}
		}
	}, [f, a]), x = (e) => {
		d(e.deviceId), m(e.deviceName);
	};
	return /* @__PURE__ */ O("div", {
		className: "min-h-full flex items-start justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ k("div", {
			className: "w-full max-w-[600px] bg-white rounded-xl shadow-md p-8",
			role: "main",
			"aria-label": "MFA device management",
			children: [
				/* @__PURE__ */ k("div", {
					className: "flex items-center justify-between mb-6 flex-wrap gap-3",
					children: [/* @__PURE__ */ k("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ O("h1", {
							className: "text-xl font-bold text-text-primary m-0",
							children: "MFA Devices"
						}), n && /* @__PURE__ */ O("p", {
							className: "text-sm text-neutral m-0",
							children: n
						})]
					}), /* @__PURE__ */ k("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ O(p, {
							tone: r ? "success" : "warning",
							children: r ? "Enabled" : "Disabled"
						}), /* @__PURE__ */ O(t, {
							variant: "primary",
							size: "md",
							onClick: i,
							children: "Add Device"
						})]
					})]
				}),
				s && /* @__PURE__ */ O("p", {
					className: "text-center text-text-tertiary text-sm py-8",
					children: "Loading devices..."
				}),
				!s && e.length === 0 && /* @__PURE__ */ O(g, {
					icon: "🔐",
					title: "No MFA devices configured",
					body: "Add a device to secure your account with multi-factor authentication.",
					actionLabel: "Add Device",
					onAction: i
				}),
				!s && e.length > 0 && /* @__PURE__ */ O("div", {
					className: "flex flex-col gap-3",
					role: "list",
					"aria-label": "MFA devices",
					children: e.map((e) => /* @__PURE__ */ k("div", {
						className: "p-5 border border-border rounded-lg bg-white",
						role: "listitem",
						children: [
							/* @__PURE__ */ O("div", {
								className: "flex items-center justify-between mb-2",
								children: /* @__PURE__ */ O("div", {
									className: "flex items-center gap-2.5",
									children: u === e.deviceId ? /* @__PURE__ */ k("form", {
										onSubmit: (t) => {
											t.preventDefault(), b(e.deviceId);
										},
										className: "flex gap-2 items-center",
										children: [
											/* @__PURE__ */ O(N, {
												label: "",
												name: `rename-${e.deviceId}`,
												value: f,
												onChange: (e) => m(String(e)),
												disabled: _
											}),
											/* @__PURE__ */ O(t, {
												type: "submit",
												variant: "primary",
												size: "sm",
												disabled: _ || !f.trim(),
												children: "Save"
											}),
											/* @__PURE__ */ O(t, {
												variant: "ghost",
												size: "sm",
												onClick: () => d(null),
												children: "Cancel"
											})
										]
									}) : /* @__PURE__ */ k(D, { children: [/* @__PURE__ */ O("h3", {
										className: "text-[15px] font-semibold text-text-primary m-0",
										children: e.deviceName
									}), /* @__PURE__ */ O(L, { status: e.isVerified ? "CONFIRMED" : "UNCONFIRMED" })] })
								})
							}),
							/* @__PURE__ */ k("p", {
								className: "text-[11px] text-text-tertiary m-0 mb-3",
								children: [
									"Type: ",
									e.deviceType,
									" · Added: ",
									me(e.createdAt),
									e.lastUsed && ` · Last used: ${me(e.lastUsed)}`
								]
							}),
							u !== e.deviceId && /* @__PURE__ */ k("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ O(t, {
									variant: "ghost",
									size: "sm",
									onClick: () => x(e),
									children: "Rename"
								}), /* @__PURE__ */ O(t, {
									variant: "danger",
									size: "sm",
									onClick: () => l(e.deviceId),
									children: "Remove"
								})]
							})
						]
					}, e.deviceId))
				}),
				/* @__PURE__ */ O(h, {
					open: !!c,
					onConfirm: y,
					onCancel: () => l(null),
					title: "Remove Device",
					body: "Are you sure you want to remove this MFA device? You will no longer be able to use it for verification.",
					confirmLabel: _ ? "Removing..." : "Remove",
					confirmDisabled: _,
					tone: "destructive"
				})
			]
		})
	});
}
//#endregion
//#region src/components/identity/auth/LogoutPage.tsx
function ge({ onConfirm: e, onCancel: n, clientName: r }) {
	return /* @__PURE__ */ O("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ k("div", {
			className: "w-full max-w-[420px] bg-white rounded-xl shadow-md p-8 text-center",
			role: "main",
			"aria-label": "Sign out confirmation",
			children: [
				/* @__PURE__ */ O("div", {
					className: "w-14 h-14 mx-auto mb-5 rounded-full bg-danger-bg flex items-center justify-center",
					children: /* @__PURE__ */ k("svg", {
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
							/* @__PURE__ */ O("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
							/* @__PURE__ */ O("polyline", { points: "16 17 21 12 16 7" }),
							/* @__PURE__ */ O("line", {
								x1: "21",
								y1: "12",
								x2: "9",
								y2: "12"
							})
						]
					})
				}),
				/* @__PURE__ */ O("h1", {
					className: "text-xl font-bold text-text-primary mb-3 mt-0",
					children: "Sign Out"
				}),
				/* @__PURE__ */ k("p", {
					className: "text-sm text-neutral mb-6 mt-0 leading-relaxed",
					children: [
						"Are you sure you want to sign out",
						r ? /* @__PURE__ */ k(D, { children: [" from ", /* @__PURE__ */ O("strong", {
							className: "text-text-primary",
							children: r
						})] }) : "",
						"? You will need to sign in again to access your account."
					]
				}),
				/* @__PURE__ */ k("div", {
					className: "flex gap-3 justify-center",
					children: [n && /* @__PURE__ */ O(t, {
						variant: "ghost",
						size: "lg",
						fullWidth: !0,
						onClick: n,
						children: "Cancel"
					}), /* @__PURE__ */ O(t, {
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
function _e({ title: e = "Something went wrong", message: n, error: r, onRetry: i, onBack: a }) {
	return /* @__PURE__ */ O("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ k("div", {
			className: "w-full max-w-[420px] bg-white rounded-xl shadow-md p-8 text-center",
			role: "main",
			"aria-label": "Error",
			children: [
				/* @__PURE__ */ O("div", {
					className: "w-14 h-14 rounded-full bg-danger-bg flex items-center justify-center mx-auto mb-5",
					"aria-hidden": "true",
					children: /* @__PURE__ */ k("svg", {
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
							/* @__PURE__ */ O("circle", {
								cx: "12",
								cy: "12",
								r: "10"
							}),
							/* @__PURE__ */ O("line", {
								x1: "15",
								y1: "9",
								x2: "9",
								y2: "15"
							}),
							/* @__PURE__ */ O("line", {
								x1: "9",
								y1: "9",
								x2: "15",
								y2: "15"
							})
						]
					})
				}),
				/* @__PURE__ */ O("h1", {
					className: "text-xl font-bold text-text-primary mb-3 mt-0",
					children: e
				}),
				/* @__PURE__ */ O("p", {
					className: "text-sm text-neutral mb-3 mt-0 leading-relaxed",
					children: n
				}),
				r && /* @__PURE__ */ O("code", {
					className: "text-[11px] text-text-tertiary font-mono mb-5 px-3.5 py-2 bg-surface-panel border border-border rounded-md inline-block max-w-full overflow-x-auto",
					children: r
				}),
				(i || a) && /* @__PURE__ */ k("div", {
					className: "flex gap-3 justify-center mt-6",
					children: [a && /* @__PURE__ */ O(t, {
						variant: "ghost",
						size: "lg",
						onClick: a,
						children: "Go Back"
					}), i && /* @__PURE__ */ O(t, {
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
var ve = [
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
function ye({ item: t, active: n, onNavigate: r }) {
	return /* @__PURE__ */ O("li", { children: /* @__PURE__ */ k("button", {
		type: "button",
		className: e("flex items-center gap-2 w-full text-left px-3 py-2 text-sm font-medium cursor-pointer", "border-none rounded-none border-l-[3px] transition-colors", n ? "bg-surface-panel text-info-fg font-semibold border-l-info" : "bg-transparent text-text-primary border-l-transparent hover:bg-surface-hover"),
		onClick: () => r(t.path),
		"aria-current": n ? "page" : void 0,
		children: [/* @__PURE__ */ O("span", { children: t.icon }), /* @__PURE__ */ O("span", { children: t.label })]
	}) });
}
function be({ children: n, activePath: r, adminEmail: i, onNavigate: a, onLogout: o, defaultSidebarOpen: s = !0 }) {
	let [c, l] = E(s), u = S(() => l((e) => !e), []);
	return /* @__PURE__ */ k("div", {
		className: "flex min-h-screen bg-surface-panel font-[inherit]",
		children: [/* @__PURE__ */ k("aside", {
			className: e("bg-white border-r border-border flex flex-col shrink-0 transition-[width] duration-200 overflow-hidden", c ? "w-60" : "w-0 border-r-0"),
			children: [/* @__PURE__ */ O("div", {
				className: "p-4 font-bold text-lg text-info-fg border-b border-border",
				children: "Identity Admin"
			}), /* @__PURE__ */ O("ul", {
				className: "list-none m-0 p-0 py-2 flex-1",
				children: ve.map((e) => /* @__PURE__ */ O(ye, {
					item: e,
					active: r === e.path,
					onNavigate: a
				}, e.path))
			})]
		}), /* @__PURE__ */ k("div", {
			className: "flex-1 flex flex-col min-w-0",
			children: [/* @__PURE__ */ k("header", {
				className: "flex items-center justify-between px-4 py-2 bg-white border-b border-border",
				children: [/* @__PURE__ */ O(t, {
					variant: "ghost",
					size: "sm",
					onClick: u,
					"aria-label": "Toggle sidebar",
					children: c ? "←" : "→"
				}), /* @__PURE__ */ k("div", {
					className: "flex items-center gap-4",
					children: [i && /* @__PURE__ */ O("span", {
						className: "text-sm text-neutral",
						children: i
					}), o && /* @__PURE__ */ O(t, {
						variant: "danger-solid",
						size: "sm",
						onClick: o,
						children: "Logout"
					})]
				})]
			}), /* @__PURE__ */ O("main", {
				className: "flex-1 p-6 overflow-y-auto",
				children: n
			})]
		})]
	});
}
//#endregion
//#region src/components/identity/shared/PoolScopedLayout.tsx
var xe = [
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
function Se({ label: n, active: r, onClick: i }) {
	return /* @__PURE__ */ O(t, {
		variant: "ghost",
		size: "sm",
		className: e("rounded-none -mb-[2px] border-b-2", r ? "font-semibold text-info-fg border-b-info" : "font-normal text-neutral border-b-transparent"),
		onClick: i,
		"aria-selected": r,
		role: "tab",
		tabIndex: r ? 0 : -1,
		children: n
	});
}
function Ce({ children: e, poolId: n, poolName: r, activeSection: i, onNavigate: a, onBack: o }) {
	let s = S((e) => {
		a(`/identity/admin/pools/${n}/${e}`);
	}, [a, n]), c = i ? i.charAt(0).toUpperCase() + i.slice(1) : "";
	return /* @__PURE__ */ k("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ k("nav", {
				className: "flex items-center gap-1.5 text-sm text-text-tertiary",
				"aria-label": "Breadcrumb",
				children: [
					/* @__PURE__ */ O(t, {
						variant: "ghost",
						size: "sm",
						className: "p-0 underline text-info-fg",
						onClick: o,
						"aria-label": "Navigate to Pools",
						children: "Pools"
					}),
					/* @__PURE__ */ O("span", { children: "/" }),
					/* @__PURE__ */ O("span", {
						className: "text-text-primary font-medium",
						children: r
					}),
					i && /* @__PURE__ */ k(D, { children: [/* @__PURE__ */ O("span", { children: "/" }), /* @__PURE__ */ O("span", { children: c })] })
				]
			}),
			/* @__PURE__ */ O("div", { children: /* @__PURE__ */ O(t, {
				variant: "secondary",
				size: "sm",
				onClick: o,
				children: "← Back to Pools"
			}) }),
			/* @__PURE__ */ O("div", {
				role: "tablist",
				"aria-label": "Pool sections",
				onKeyDown: y,
				className: "flex border-b-2 border-border",
				children: xe.map((e) => /* @__PURE__ */ O(Se, {
					label: e.label,
					active: i === e.key,
					onClick: () => s(e.key)
				}, e.key))
			}),
			/* @__PURE__ */ O("div", { children: e })
		]
	});
}
//#endregion
export { A, z as C, N as D, P as E, M as O, B as S, L as T, Y as _, he as a, H as b, $ as c, oe as d, ae as f, X as g, Z as h, ge as i, j as k, Q as l, te as m, be as n, pe as o, ne as p, _e as r, fe as s, Ce as t, le as u, J as v, R as w, V as x, K as y };
