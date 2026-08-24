import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-CTpms90-.js";
import { t as n } from "./Card-CcJetqWt.js";
import { a as r, c as i, i as a, l as o, n as s, o as c, r as l, s as u, t as d } from "./FormField-BqiOU8mh.js";
import { t as f } from "./Banner-BLOg1hC_.js";
import { t as p } from "./Chip-2lIuHwy5.js";
import { t as m } from "./Modal-B75saHcP.js";
import { t as h } from "./ConfirmDialog-Dz8muYP8.js";
import { t as g } from "./EmptyState-CUHf5NYN.js";
import { t as _ } from "./Input-HA4mVi1W.js";
import { t as v } from "./Textarea-DPCoGI7q.js";
import { t as y } from "./Select-CBb9fCiw.js";
import { t as b } from "./Checkbox-CsbxMNgR.js";
import { useCallback as x, useEffect as S, useMemo as C, useRef as w, useState as T } from "react";
import { Fragment as E, jsx as D, jsxs as O } from "react/jsx-runtime";
//#region src/components/identity/admin/AdminDashboardPage.tsx
function k({ stats: e, pools: r, onNavigate: i, loading: a }) {
	let o = C(() => [
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
	return a ? /* @__PURE__ */ O("div", {
		className: "flex flex-col gap-8",
		children: [/* @__PURE__ */ D("div", {
			className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4",
			children: [
				1,
				2,
				3
			].map((e) => /* @__PURE__ */ O(n, {
				padding: "md",
				children: [/* @__PURE__ */ D("div", { className: "h-5 w-12 rounded bg-surface-hover animate-pulse mb-2" }), /* @__PURE__ */ D("div", { className: "h-3 w-20 rounded bg-surface-hover animate-pulse" })]
			}, e))
		}), /* @__PURE__ */ D(n, { className: "h-[200px] animate-pulse" })]
	}) : /* @__PURE__ */ O(l, {
		title: "Dashboard",
		children: [
			/* @__PURE__ */ D("section", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4",
				children: o.map((e) => /* @__PURE__ */ O(n, {
					padding: "md",
					children: [/* @__PURE__ */ D("div", {
						className: "text-[2rem] font-bold text-info-fg mb-1",
						children: e.value
					}), /* @__PURE__ */ D("div", {
						className: "text-sm text-neutral",
						children: e.label
					})]
				}, e.label))
			}),
			/* @__PURE__ */ O("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ D("h2", {
					className: "text-lg font-semibold text-text-primary m-0",
					children: "User Pools"
				}), /* @__PURE__ */ D(n, { children: r.length === 0 ? /* @__PURE__ */ D(g, {
					title: "No pools created yet",
					actionLabel: "Create Pool",
					onAction: () => i("/identity/admin/pools/new")
				}) : r.map((e, n) => /* @__PURE__ */ O("div", {
					className: `flex items-center justify-between px-4 py-3 ${n < r.length - 1 ? "border-b border-border-subtle" : ""}`,
					children: [/* @__PURE__ */ O("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ D("span", {
							className: "font-medium text-text-primary",
							children: e.poolName
						}), /* @__PURE__ */ D("span", {
							className: "text-xs text-text-tertiary",
							children: e.createdAt
						})]
					}), /* @__PURE__ */ D(t, {
						variant: "ghost",
						size: "sm",
						onClick: () => i(`/identity/admin/pools/${e.poolId}`),
						children: "View"
					})]
				}, e.poolId)) })]
			}),
			/* @__PURE__ */ O("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ D("h2", {
					className: "text-lg font-semibold text-text-primary m-0",
					children: "Quick Actions"
				}), /* @__PURE__ */ O("div", {
					className: "flex flex-wrap gap-3",
					children: [
						/* @__PURE__ */ D(t, {
							variant: "secondary",
							size: "lg",
							onClick: () => i("/identity/admin/pools/new"),
							children: "Create Pool"
						}),
						/* @__PURE__ */ D(t, {
							variant: "secondary",
							size: "lg",
							onClick: () => i("/identity/admin/applications/new"),
							children: "Create Application"
						}),
						/* @__PURE__ */ D(t, {
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
function A({ columns: e, data: t, keyField: r, onRowClick: i, actions: a, emptyMessage: o = "No records found.", emptyIcon: c = "📋", loading: l = !1 }) {
	if (!l && t.length === 0) return /* @__PURE__ */ O(n, {
		className: "flex flex-col items-center justify-center min-h-[220px] p-8",
		children: [/* @__PURE__ */ D("span", {
			className: "text-[42px] mb-3",
			children: c
		}), /* @__PURE__ */ D("p", {
			className: "text-sm font-medium text-neutral text-center max-w-[280px] m-0",
			children: o
		})]
	});
	let u = e.map((e) => ({
		key: e.key,
		header: e.header,
		render: e.render ? (t) => e.render(t) : void 0,
		sortable: e.sortable,
		width: e.width,
		align: e.align
	}));
	return /* @__PURE__ */ D(n, { children: /* @__PURE__ */ D(s, {
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
function j({ pools: e, onCreatePool: n, onEditPool: r, onDeletePool: i, onViewPool: a, loading: o }) {
	let [s, c] = T(null), [u, d] = T(!1), f = x(async (e) => {
		d(!0);
		try {
			await i(e);
		} finally {
			d(!1), c(null);
		}
	}, [i]), p = C(() => [
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
	], []), m = x((e) => /* @__PURE__ */ O(E, { children: [
		/* @__PURE__ */ D(t, {
			variant: "ghost",
			size: "sm",
			onClick: () => a(e.poolId),
			children: "View"
		}),
		/* @__PURE__ */ D(t, {
			variant: "ghost",
			size: "sm",
			onClick: () => r(e.poolId),
			children: "Edit"
		}),
		/* @__PURE__ */ D(t, {
			variant: "danger",
			size: "sm",
			onClick: () => c(e.poolId),
			children: "Delete"
		})
	] }), [r, a]);
	return /* @__PURE__ */ O(l, {
		title: "User Pools",
		actions: /* @__PURE__ */ D(t, {
			variant: "primary",
			size: "lg",
			onClick: n,
			children: "Create Pool"
		}),
		children: [/* @__PURE__ */ D(A, {
			columns: p,
			data: e,
			keyField: "poolId",
			actions: m,
			loading: o,
			emptyMessage: "No user pools found. Create one to get started.",
			emptyIcon: "🏊"
		}), /* @__PURE__ */ D(h, {
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
function M({ label: e, name: t, type: n = "text", value: r, onChange: i, error: a, required: o, placeholder: s, options: c, helpText: l, disabled: u }) {
	let f = x((e) => {
		i(n === "number" ? Number(e.target.value) : e.target.value);
	}, [i, n]);
	return n === "checkbox" ? /* @__PURE__ */ O("div", {
		className: "mb-4",
		children: [
			/* @__PURE__ */ O("label", {
				className: "flex items-center gap-2 cursor-pointer",
				children: [/* @__PURE__ */ D(b, {
					name: t,
					checked: !!r,
					onChange: i,
					disabled: u
				}), /* @__PURE__ */ O("span", {
					className: "text-sm text-text-primary",
					children: [e, o && /* @__PURE__ */ D("span", {
						className: "text-danger-fg",
						children: " *"
					})]
				})]
			}),
			a && /* @__PURE__ */ D("p", {
				className: "mt-1 text-sm text-danger-fg",
				children: a
			}),
			l && !a && /* @__PURE__ */ D("p", {
				className: "mt-1 text-sm text-text-tertiary",
				children: l
			})
		]
	}) : /* @__PURE__ */ D(d, {
		label: e,
		required: o,
		error: a,
		hint: l,
		className: "mb-4",
		children: ({ labelId: e, ...i }) => n === "textarea" ? /* @__PURE__ */ D(v, {
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
		}) : n === "select" ? /* @__PURE__ */ D(y, {
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
		}) : /* @__PURE__ */ D(_, {
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
function N({ pool: e, isEdit: r, onSubmit: i, onCancel: a, error: o }) {
	let [s, c] = T(e?.poolName ?? ""), [u, d] = T(e?.settings?.mfaConfiguration ?? "OFF"), [p, m] = T(e?.settings?.passwordPolicy?.minLength ?? 8), [h, g] = T(e?.settings?.passwordPolicy?.requireUppercase ?? !0), [v, y] = T(e?.settings?.passwordPolicy?.requireLowercase ?? !0), [b, S] = T(e?.settings?.passwordPolicy?.requireNumbers ?? !0), [C, w] = T(e?.settings?.passwordPolicy?.requireSymbols ?? !1), [E, k] = T(Object.entries(e?.customAttributes ?? {}).map(([e, t]) => ({
		key: e,
		value: t
	}))), [A, j] = T(!1), N = x(() => {
		k((e) => [...e, {
			key: "",
			value: ""
		}]);
	}, []), P = x((e) => {
		k((t) => t.filter((t, n) => n !== e));
	}, []), F = x((e, t, n) => {
		k((r) => r.map((r, i) => i === e ? {
			...r,
			[t]: n
		} : r));
	}, []), I = x(async (e) => {
		e.preventDefault(), j(!0);
		try {
			let e = {};
			for (let { key: t, value: n } of E) t.trim() && (e[t.trim()] = n);
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
		E,
		i
	]);
	return /* @__PURE__ */ O(l, {
		title: r ? "Edit Pool" : "Create Pool",
		className: "max-w-[640px]",
		children: [o && /* @__PURE__ */ D(f, {
			variant: "error",
			children: o
		}), /* @__PURE__ */ D(n, {
			padding: "md",
			children: /* @__PURE__ */ O("form", {
				onSubmit: I,
				children: [
					/* @__PURE__ */ D(M, {
						label: "Pool Name",
						name: "poolName",
						value: s,
						onChange: (e) => c(String(e)),
						required: !0,
						placeholder: "my-user-pool"
					}),
					/* @__PURE__ */ O("section", {
						className: "mb-6",
						children: [/* @__PURE__ */ D("h3", {
							className: "text-base font-semibold text-text-primary mb-2",
							children: "MFA Configuration"
						}), /* @__PURE__ */ D(M, {
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
					/* @__PURE__ */ O("section", {
						className: "mb-6",
						children: [
							/* @__PURE__ */ D("h3", {
								className: "text-base font-semibold text-text-primary mb-2",
								children: "Password Policy"
							}),
							/* @__PURE__ */ D(M, {
								label: "Minimum Length",
								name: "minLength",
								type: "number",
								value: p,
								onChange: (e) => m(Number(e))
							}),
							/* @__PURE__ */ D(M, {
								label: "Require Uppercase",
								name: "requireUppercase",
								type: "checkbox",
								value: h,
								onChange: (e) => g(!!e)
							}),
							/* @__PURE__ */ D(M, {
								label: "Require Lowercase",
								name: "requireLowercase",
								type: "checkbox",
								value: v,
								onChange: (e) => y(!!e)
							}),
							/* @__PURE__ */ D(M, {
								label: "Require Numbers",
								name: "requireNumbers",
								type: "checkbox",
								value: b,
								onChange: (e) => S(!!e)
							}),
							/* @__PURE__ */ D(M, {
								label: "Require Symbols",
								name: "requireSymbols",
								type: "checkbox",
								value: C,
								onChange: (e) => w(!!e)
							})
						]
					}),
					/* @__PURE__ */ O("section", {
						className: "mb-6",
						children: [
							/* @__PURE__ */ D("h3", {
								className: "text-base font-semibold text-text-primary mb-2",
								children: "Custom Attributes"
							}),
							E.map((e, n) => /* @__PURE__ */ O("div", {
								className: "flex gap-2 items-center mb-2",
								children: [
									/* @__PURE__ */ D(_, {
										className: "flex-1",
										placeholder: "Attribute name",
										value: e.key,
										onChange: (e) => F(n, "key", e.target.value)
									}),
									/* @__PURE__ */ D(_, {
										className: "flex-1",
										placeholder: "Type (string, number, etc.)",
										value: e.value,
										onChange: (e) => F(n, "value", e.target.value)
									}),
									/* @__PURE__ */ D(t, {
										variant: "danger",
										size: "sm",
										onClick: () => P(n),
										children: "Remove"
									})
								]
							}, n)),
							/* @__PURE__ */ D(t, {
								variant: "ghost",
								size: "sm",
								onClick: N,
								children: "+ Add Attribute"
							})
						]
					}),
					/* @__PURE__ */ O("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ D(t, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: A,
							children: A ? "Saving..." : r ? "Update Pool" : "Create Pool"
						}), /* @__PURE__ */ D(t, {
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
var P = {
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
}, F = {
	success: "success",
	warning: "warning",
	danger: "danger",
	info: "info",
	neutral: "neutral"
};
function I({ status: e, variant: t }) {
	let n = t ? F[t] || "neutral" : P[e] || "neutral";
	return /* @__PURE__ */ D(p, {
		tone: n,
		size: "sm",
		children: e
	});
}
//#endregion
//#region src/components/identity/admin/UserListPage.tsx
function L({ users: e, poolName: n, onCreateUser: r, onEditUser: i, onDeleteUser: a, loading: o }) {
	let [s, c] = T(null), [u, d] = T(!1), f = x(async (e) => {
		d(!0);
		try {
			await a(e);
		} finally {
			d(!1), c(null);
		}
	}, [a]), p = C(() => [
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
			render: (e) => /* @__PURE__ */ D(I, { status: e.status })
		},
		{
			key: "createdAt",
			header: "Created",
			sortable: !0
		}
	], []), m = x((e) => /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D(t, {
		variant: "ghost",
		size: "sm",
		onClick: () => i(e.userId),
		children: "Edit"
	}), /* @__PURE__ */ D(t, {
		variant: "danger",
		size: "sm",
		onClick: () => c(e.userId),
		children: "Delete"
	})] }), [i]);
	return /* @__PURE__ */ O(l, {
		title: `Users — ${n}`,
		actions: /* @__PURE__ */ D(t, {
			variant: "primary",
			size: "lg",
			onClick: r,
			children: "Create User"
		}),
		children: [/* @__PURE__ */ D(A, {
			columns: p,
			data: e,
			keyField: "userId",
			actions: m,
			loading: o,
			emptyMessage: "No users in this pool yet.",
			emptyIcon: "👤"
		}), /* @__PURE__ */ D(h, {
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
function R({ user: e, isEdit: r, customAttributeDefinitions: i, onSubmit: a, onCancel: o, error: s }) {
	let [c, u] = T(e?.email ?? ""), [d, p] = T(""), [m, h] = T(e?.givenName ?? ""), [g, _] = T(e?.familyName ?? ""), [v, y] = T(e?.nickname ?? ""), [b, S] = T(e?.picture ?? ""), [C, w] = T(e?.website ?? ""), [E, k] = T(Object.fromEntries(Object.entries(e?.customAttributes ?? {}).map(([e, t]) => [e, String(t)]))), [A, j] = T(!1), N = x((e, t) => {
		k((n) => ({
			...n,
			[e]: t
		}));
	}, []), P = x(async (e) => {
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
				customAttributes: E
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
		E,
		r,
		a
	]);
	return /* @__PURE__ */ O(l, {
		title: r ? "Edit User" : "Create User",
		className: "max-w-[640px]",
		children: [s && /* @__PURE__ */ D(f, {
			variant: "error",
			children: s
		}), /* @__PURE__ */ D(n, {
			padding: "md",
			children: /* @__PURE__ */ O("form", {
				onSubmit: P,
				children: [
					/* @__PURE__ */ D(M, {
						label: "Email",
						name: "email",
						type: "email",
						value: c,
						onChange: (e) => u(String(e)),
						required: !0,
						placeholder: "user@example.com"
					}),
					!r && /* @__PURE__ */ D(M, {
						label: "Password",
						name: "password",
						type: "password",
						value: d,
						onChange: (e) => p(String(e)),
						required: !0,
						placeholder: "Temporary password",
						helpText: "User will be prompted to change on first login."
					}),
					/* @__PURE__ */ D(M, {
						label: "Given Name",
						name: "givenName",
						value: m,
						onChange: (e) => h(String(e)),
						placeholder: "John"
					}),
					/* @__PURE__ */ D(M, {
						label: "Family Name",
						name: "familyName",
						value: g,
						onChange: (e) => _(String(e)),
						placeholder: "Doe"
					}),
					/* @__PURE__ */ D(M, {
						label: "Nickname",
						name: "nickname",
						value: v,
						onChange: (e) => y(String(e)),
						placeholder: "johnny"
					}),
					/* @__PURE__ */ D(M, {
						label: "Picture URL",
						name: "picture",
						value: b,
						onChange: (e) => S(String(e)),
						placeholder: "https://..."
					}),
					/* @__PURE__ */ D(M, {
						label: "Website",
						name: "website",
						value: C,
						onChange: (e) => w(String(e)),
						placeholder: "https://..."
					}),
					i && Object.keys(i).length > 0 && /* @__PURE__ */ O("section", { children: [/* @__PURE__ */ D("h3", {
						className: "text-base font-semibold text-text-primary mt-6 mb-2",
						children: "Custom Attributes"
					}), Object.entries(i).map(([e, t]) => /* @__PURE__ */ D(M, {
						label: e,
						name: `custom_${e}`,
						type: t === "number" ? "number" : "text",
						value: E[e] ?? "",
						onChange: (t) => N(e, String(t)),
						helpText: `Type: ${t}`
					}, e))] }),
					/* @__PURE__ */ O("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ D(t, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: A,
							children: A ? "Saving..." : r ? "Update User" : "Create User"
						}), /* @__PURE__ */ D(t, {
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
function z({ groups: e, poolName: n, onCreateGroup: r, onEditGroup: i, onDeleteGroup: a, loading: o }) {
	let [s, c] = T(null), [u, d] = T(!1), f = x(async (e) => {
		d(!0);
		try {
			await a(e);
		} finally {
			d(!1), c(null);
		}
	}, [a]), m = C(() => [
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
			render: (e) => /* @__PURE__ */ D("div", {
				className: "flex flex-wrap gap-1",
				children: e.permissions.length === 0 ? /* @__PURE__ */ D("span", {
					className: "text-text-tertiary text-xs",
					children: "None"
				}) : e.permissions.map((e) => /* @__PURE__ */ D(p, {
					tone: "info",
					size: "xs",
					children: e
				}, e))
			})
		}
	], []), g = x((e) => /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D(t, {
		variant: "ghost",
		size: "sm",
		onClick: () => i(e.groupId),
		children: "Edit"
	}), /* @__PURE__ */ D(t, {
		variant: "danger",
		size: "sm",
		onClick: () => c(e.groupId),
		children: "Delete"
	})] }), [i]);
	return /* @__PURE__ */ O(l, {
		title: `Groups — ${n}`,
		actions: /* @__PURE__ */ D(t, {
			variant: "primary",
			size: "lg",
			onClick: r,
			children: "Create Group"
		}),
		children: [/* @__PURE__ */ D(A, {
			columns: m,
			data: e,
			keyField: "groupId",
			actions: g,
			loading: o,
			emptyMessage: "No groups in this pool yet.",
			emptyIcon: "👥"
		}), /* @__PURE__ */ D(h, {
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
function B({ group: e, isEdit: r, members: i, availableUsers: a, onSubmit: o, onAddMember: s, onRemoveMember: c, onCancel: u, error: d }) {
	let [p, m] = T(e?.groupName ?? ""), [h, g] = T(e?.description ?? ""), [v, b] = T(e?.permissions ?? []), [S, C] = T(""), [w, E] = T(""), [k, A] = T(!1), j = x((e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			let t = S.trim();
			t && !v.includes(t) && b((e) => [...e, t]), C("");
		}
	}, [S, v]), N = x((e) => {
		b((t) => t.filter((t) => t !== e));
	}, []), P = x(async () => {
		w && s && (await s(w), E(""));
	}, [w, s]), F = x(async (e) => {
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
	return /* @__PURE__ */ O(l, {
		title: r ? "Edit Group" : "Create Group",
		className: "max-w-[640px]",
		children: [d && /* @__PURE__ */ D(f, {
			variant: "error",
			children: d
		}), /* @__PURE__ */ D(n, {
			padding: "md",
			children: /* @__PURE__ */ O("form", {
				onSubmit: F,
				children: [
					/* @__PURE__ */ D(M, {
						label: "Group Name",
						name: "groupName",
						value: p,
						onChange: (e) => m(String(e)),
						required: !0,
						placeholder: "admins"
					}),
					/* @__PURE__ */ D(M, {
						label: "Description",
						name: "description",
						type: "textarea",
						value: h,
						onChange: (e) => g(String(e)),
						placeholder: "Describe this group's purpose..."
					}),
					/* @__PURE__ */ O("section", { children: [
						/* @__PURE__ */ D("h3", {
							className: "text-base font-semibold text-text-primary mt-6 mb-2",
							children: "Permissions"
						}),
						/* @__PURE__ */ D("div", {
							className: "flex flex-wrap gap-1.5 mb-2",
							children: v.map((e) => /* @__PURE__ */ O("span", {
								className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-info text-white text-sm font-medium",
								children: [e, /* @__PURE__ */ D(t, {
									variant: "ghost",
									size: "sm",
									className: "p-0 text-white text-[14px] leading-none min-w-0 min-h-0",
									onClick: () => N(e),
									"aria-label": `Remove permission ${e}`,
									children: "x"
								})]
							}, e))
						}),
						/* @__PURE__ */ D(_, {
							placeholder: "Type a permission and press Enter",
							value: S,
							onChange: (e) => C(e.target.value),
							onKeyDown: j
						})
					] }),
					r && i && /* @__PURE__ */ O("section", { children: [
						/* @__PURE__ */ D("h3", {
							className: "text-base font-semibold text-text-primary mt-6 mb-2",
							children: "Members"
						}),
						i.length === 0 ? /* @__PURE__ */ D("p", {
							className: "text-text-tertiary text-sm",
							children: "No members yet."
						}) : i.map((e) => /* @__PURE__ */ O("div", {
							className: "flex items-center justify-between py-1.5 border-b border-border",
							children: [/* @__PURE__ */ D("span", {
								className: "text-base",
								children: e.email
							}), c && /* @__PURE__ */ D(t, {
								variant: "danger",
								size: "sm",
								onClick: () => c(e.userId),
								children: "Remove"
							})]
						}, e.userId)),
						a && a.length > 0 && s && /* @__PURE__ */ O("div", {
							className: "flex gap-2 mt-2",
							children: [/* @__PURE__ */ D(y, {
								className: "flex-1",
								value: w,
								onChange: (e) => E(e.target.value),
								placeholder: "Select user to add...",
								options: a.map((e) => ({
									value: e.userId,
									label: e.email
								}))
							}), /* @__PURE__ */ D(t, {
								variant: "ghost",
								size: "sm",
								onClick: P,
								disabled: !w,
								children: "Add"
							})]
						})
					] }),
					/* @__PURE__ */ O("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ D(t, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: k,
							children: k ? "Saving..." : r ? "Update Group" : "Create Group"
						}), /* @__PURE__ */ D(t, {
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
function V({ applications: e, onCreateApp: n, onCreateAppWithPool: r, onEditApp: i, onDeleteApp: a, loading: o }) {
	let [s, c] = T(null), [u, d] = T(!1), f = x(async (e) => {
		d(!0);
		try {
			await a(e);
		} finally {
			d(!1), c(null);
		}
	}, [a]), m = C(() => [
		{
			key: "clientName",
			header: "Name",
			sortable: !0
		},
		{
			key: "clientId",
			header: "Client ID",
			render: (e) => /* @__PURE__ */ D("span", {
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
			render: (e) => /* @__PURE__ */ O("div", {
				className: "flex flex-wrap gap-1",
				children: [e.redirectUris.slice(0, 2).map((e) => /* @__PURE__ */ D(p, {
					tone: "neutral",
					size: "xs",
					children: e
				}, e)), e.redirectUris.length > 2 && /* @__PURE__ */ O(p, {
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
	], []), g = x((e) => /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D(t, {
		variant: "ghost",
		size: "sm",
		onClick: () => i(e.clientId),
		children: "Edit"
	}), /* @__PURE__ */ D(t, {
		variant: "danger",
		size: "sm",
		onClick: () => c(e.clientId),
		children: "Delete"
	})] }), [i]);
	return /* @__PURE__ */ O(l, {
		title: "Applications",
		actions: /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D(t, {
			variant: "primary",
			size: "lg",
			onClick: n,
			children: "New Application"
		}), /* @__PURE__ */ D(t, {
			variant: "secondary",
			size: "lg",
			onClick: r,
			children: "New App + Pool"
		})] }),
		children: [/* @__PURE__ */ D(A, {
			columns: m,
			data: e,
			keyField: "clientId",
			actions: g,
			loading: o,
			emptyMessage: "No applications registered yet.",
			emptyIcon: "🔐"
		}), /* @__PURE__ */ D(h, {
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
function H({ label: e, values: n, onChange: r, placeholder: i }) {
	let a = () => r([...n, ""]), o = (e) => r(n.filter((t, n) => n !== e)), s = (e, t) => r(n.map((n, r) => r === e ? t : n));
	return /* @__PURE__ */ O("div", {
		className: "mb-4",
		children: [
			/* @__PURE__ */ D("label", {
				className: "block mb-1 text-sm font-semibold text-text-primary",
				children: e
			}),
			n.map((e, n) => /* @__PURE__ */ O("div", {
				className: "flex gap-2 items-center mb-1.5",
				children: [/* @__PURE__ */ D(_, {
					className: "flex-1",
					value: e,
					onChange: (e) => s(n, e.target.value),
					placeholder: i
				}), /* @__PURE__ */ D(t, {
					variant: "danger",
					size: "sm",
					onClick: () => o(n),
					children: "Remove"
				})]
			}, n)),
			/* @__PURE__ */ D(t, {
				variant: "ghost",
				size: "sm",
				onClick: a,
				children: "+ Add"
			})
		]
	});
}
var U = [
	"authorization_code",
	"client_credentials",
	"refresh_token"
], W = [
	"code",
	"token",
	"id_token"
];
function G({ application: e, isEdit: r, pools: i, onSubmit: a, onCancel: o, error: s }) {
	let [c, u] = T(e?.clientName ?? ""), [d, p] = T(e?.poolId ?? ""), [m, h] = T(e?.redirectUris ?? [""]), [g, _] = T(e?.postLogoutRedirectUris ?? []), [v, y] = T(e?.grantTypes ?? ["authorization_code"]), [S, C] = T(e?.responseTypes ?? ["code"]), [w, E] = T(e?.scope ?? "openid profile email"), [k, A] = T(!1), j = x((e) => {
		y((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}, []), N = x((e) => {
		C((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}, []), P = x(async (e) => {
		e.preventDefault(), A(!0);
		try {
			await a({
				clientName: c,
				poolId: d,
				redirectUris: m.filter((e) => e.trim()),
				postLogoutRedirectUris: g.filter((e) => e.trim()),
				grantTypes: v,
				responseTypes: S,
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
		S,
		w,
		a
	]);
	return /* @__PURE__ */ O(l, {
		title: r ? "Edit Application" : "New Application",
		className: "max-w-[640px]",
		children: [s && /* @__PURE__ */ D(f, {
			variant: "error",
			children: s
		}), /* @__PURE__ */ D(n, {
			padding: "md",
			children: /* @__PURE__ */ O("form", {
				onSubmit: P,
				children: [
					/* @__PURE__ */ D(M, {
						label: "Application Name",
						name: "clientName",
						value: c,
						onChange: (e) => u(String(e)),
						required: !0,
						placeholder: "My App"
					}),
					/* @__PURE__ */ D(M, {
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
					/* @__PURE__ */ D(H, {
						label: "Redirect URIs",
						values: m,
						onChange: h,
						placeholder: "https://app.example.com/callback"
					}),
					/* @__PURE__ */ D(H, {
						label: "Post-Logout Redirect URIs",
						values: g,
						onChange: _,
						placeholder: "https://app.example.com/logout"
					}),
					/* @__PURE__ */ O("section", { children: [/* @__PURE__ */ D("h3", {
						className: "text-base font-semibold text-text-primary mt-6 mb-2",
						children: "Grant Types"
					}), /* @__PURE__ */ D("div", {
						className: "flex flex-col gap-2 mb-4",
						children: U.map((e) => /* @__PURE__ */ O("label", {
							className: "flex items-center gap-2 text-base text-text-primary cursor-pointer",
							children: [/* @__PURE__ */ D(b, {
								checked: v.includes(e),
								onChange: () => j(e)
							}), e]
						}, e))
					})] }),
					/* @__PURE__ */ O("section", { children: [/* @__PURE__ */ D("h3", {
						className: "text-base font-semibold text-text-primary mt-6 mb-2",
						children: "Response Types"
					}), /* @__PURE__ */ D("div", {
						className: "flex flex-col gap-2 mb-4",
						children: W.map((e) => /* @__PURE__ */ O("label", {
							className: "flex items-center gap-2 text-base text-text-primary cursor-pointer",
							children: [/* @__PURE__ */ D(b, {
								checked: S.includes(e),
								onChange: () => N(e)
							}), e]
						}, e))
					})] }),
					/* @__PURE__ */ D(M, {
						label: "Scope",
						name: "scope",
						value: w,
						onChange: (e) => E(String(e)),
						placeholder: "openid profile email",
						helpText: "Space-separated list of scopes."
					}),
					/* @__PURE__ */ O("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ D(t, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: k,
							children: k ? "Saving..." : r ? "Update Application" : "Create Application"
						}), /* @__PURE__ */ D(t, {
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
var K = [
	"authorization_code",
	"client_credentials",
	"refresh_token"
];
function q({ onSubmit: e, onCancel: r, error: i }) {
	let [a, o] = T(""), [s, c] = T(""), [u, d] = T([""]), [p, m] = T(["authorization_code"]), [h, g] = T(!1), v = x((e) => {
		m((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}, []), y = x(() => {
		d((e) => [...e, ""]);
	}, []), S = x((e) => {
		d((t) => t.filter((t, n) => n !== e));
	}, []), C = x((e, t) => {
		d((n) => n.map((n, r) => r === e ? t : n));
	}, []), w = x(async (t) => {
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
	return /* @__PURE__ */ O(l, {
		title: "New Application + Pool",
		description: "Create a user pool and register an application in one step.",
		className: "max-w-[640px]",
		children: [i && /* @__PURE__ */ D(f, {
			variant: "error",
			children: i
		}), /* @__PURE__ */ D(n, {
			padding: "md",
			children: /* @__PURE__ */ O("form", {
				onSubmit: w,
				children: [
					/* @__PURE__ */ D(M, {
						label: "Pool Name",
						name: "poolName",
						value: a,
						onChange: (e) => o(String(e)),
						required: !0,
						placeholder: "my-user-pool"
					}),
					/* @__PURE__ */ D(M, {
						label: "Application Name",
						name: "clientName",
						value: s,
						onChange: (e) => c(String(e)),
						required: !0,
						placeholder: "My App"
					}),
					/* @__PURE__ */ O("section", { children: [
						/* @__PURE__ */ D("h3", {
							className: "text-base font-semibold text-text-primary mt-6 mb-2",
							children: "Redirect URIs"
						}),
						u.map((e, n) => /* @__PURE__ */ O("div", {
							className: "flex gap-2 items-center mb-1.5",
							children: [/* @__PURE__ */ D(_, {
								className: "flex-1",
								value: e,
								onChange: (e) => C(n, e.target.value),
								placeholder: "https://app.example.com/callback"
							}), u.length > 1 && /* @__PURE__ */ D(t, {
								variant: "danger",
								size: "sm",
								onClick: () => S(n),
								children: "Remove"
							})]
						}, n)),
						/* @__PURE__ */ D(t, {
							variant: "ghost",
							size: "sm",
							onClick: y,
							children: "+ Add URI"
						})
					] }),
					/* @__PURE__ */ O("section", { children: [/* @__PURE__ */ D("h3", {
						className: "text-base font-semibold text-text-primary mt-6 mb-2",
						children: "Grant Types"
					}), /* @__PURE__ */ D("div", {
						className: "flex flex-col gap-2 mb-4",
						children: K.map((e) => /* @__PURE__ */ O("label", {
							className: "flex items-center gap-2 text-base text-text-primary cursor-pointer",
							children: [/* @__PURE__ */ D(b, {
								checked: p.includes(e),
								onChange: () => v(e)
							}), e]
						}, e))
					})] }),
					/* @__PURE__ */ O("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ D(t, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: h,
							children: h ? "Creating..." : "Create Pool + Application"
						}), /* @__PURE__ */ D(t, {
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
function J({ templates: e, onCreateTemplate: n, onEditTemplate: r, onDeleteTemplate: i, onTestSend: a, loading: o }) {
	let [s, c] = T(null), [u, d] = T(!1), [f, p] = T(null), [g, _] = T(""), [v, y] = T(!1), b = x(async (e) => {
		d(!0);
		try {
			await i(e);
		} finally {
			d(!1), c(null);
		}
	}, [i]), S = x(async () => {
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
	]), w = C(() => [{
		key: "name",
		header: "Name",
		sortable: !0
	}, {
		key: "subject",
		header: "Subject"
	}], []), k = x((e) => /* @__PURE__ */ O(E, { children: [
		/* @__PURE__ */ D(t, {
			variant: "ghost",
			size: "sm",
			onClick: () => r(e.templateId),
			children: "Edit"
		}),
		/* @__PURE__ */ D(t, {
			variant: "ghost",
			size: "sm",
			onClick: () => {
				p(e.templateId), _("");
			},
			children: "Test Send"
		}),
		/* @__PURE__ */ D(t, {
			variant: "danger",
			size: "sm",
			onClick: () => c(e.templateId),
			children: "Delete"
		})
	] }), [r]);
	return /* @__PURE__ */ O(l, {
		title: "Email Templates",
		actions: /* @__PURE__ */ D(t, {
			variant: "primary",
			size: "lg",
			onClick: n,
			children: "Create Template"
		}),
		children: [
			/* @__PURE__ */ D(A, {
				columns: w,
				data: e,
				keyField: "templateId",
				actions: k,
				loading: o,
				emptyMessage: "No email templates configured.",
				emptyIcon: "✉️"
			}),
			/* @__PURE__ */ D(m, {
				open: !!f,
				onClose: () => p(null),
				title: "Send Test Email",
				footer: /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D(t, {
					variant: "ghost",
					size: "md",
					onClick: () => p(null),
					children: "Cancel"
				}), /* @__PURE__ */ D(t, {
					variant: "primary",
					size: "md",
					onClick: S,
					disabled: v || !g.trim(),
					children: v ? "Sending..." : "Send"
				})] }),
				children: /* @__PURE__ */ D(M, {
					label: "Recipient Email",
					name: "test-email",
					type: "email",
					value: g,
					onChange: (e) => _(String(e)),
					placeholder: "recipient@example.com"
				})
			}),
			/* @__PURE__ */ D(h, {
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
function Y({ template: e, isEdit: r, onSubmit: i, onCancel: a, error: o }) {
	let [s, c] = T(e?.name ?? ""), [u, d] = T(e?.subject ?? ""), [p, m] = T(e?.htmlBody ?? ""), [h, g] = T(e?.textBody ?? ""), [y, b] = T(e?.variables ?? []), [S, C] = T(""), [w, E] = T(!1), [k, A] = T(!1), j = x((e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			let t = S.trim();
			t && !y.includes(t) && b((e) => [...e, t]), C("");
		}
	}, [S, y]), N = x((e) => {
		b((t) => t.filter((t) => t !== e));
	}, []), P = x(async (e) => {
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
	return /* @__PURE__ */ O(l, {
		title: r ? "Edit Email Template" : "Create Email Template",
		className: "max-w-[800px]",
		children: [o && /* @__PURE__ */ D(f, {
			variant: "error",
			children: o
		}), /* @__PURE__ */ D(n, {
			padding: "md",
			children: /* @__PURE__ */ O("form", {
				onSubmit: P,
				children: [
					/* @__PURE__ */ D(M, {
						label: "Template Name",
						name: "name",
						value: s,
						onChange: (e) => c(String(e)),
						required: !0,
						placeholder: "welcome-email"
					}),
					/* @__PURE__ */ D(M, {
						label: "Subject",
						name: "subject",
						value: u,
						onChange: (e) => d(String(e)),
						required: !0,
						placeholder: "Welcome to {{appName}}"
					}),
					/* @__PURE__ */ O("div", {
						className: "mb-4",
						children: [
							/* @__PURE__ */ O("div", {
								className: "flex items-center justify-between mb-1",
								children: [/* @__PURE__ */ D("label", {
									className: "text-sm font-semibold text-text-primary",
									children: "HTML Body"
								}), /* @__PURE__ */ D(t, {
									variant: "ghost",
									size: "sm",
									onClick: () => E((e) => !e),
									children: w ? "Hide Preview" : "Show Preview"
								})]
							}),
							/* @__PURE__ */ D(v, {
								value: p,
								onChange: (e) => m(e.target.value),
								placeholder: "<html><body>...</body></html>",
								rows: 10,
								className: "resize-y font-mono"
							}),
							w && /* @__PURE__ */ D("div", {
								className: "border border-border rounded-sm p-4 bg-white min-h-[200px] mt-2",
								dangerouslySetInnerHTML: { __html: p }
							})
						]
					}),
					/* @__PURE__ */ D(M, {
						label: "Text Body",
						name: "textBody",
						type: "textarea",
						value: h,
						onChange: (e) => g(String(e)),
						placeholder: "Plain text version of the email..."
					}),
					/* @__PURE__ */ O("section", { children: [
						/* @__PURE__ */ D("h3", {
							className: "text-base font-semibold text-text-primary mt-6 mb-2",
							children: "Variables"
						}),
						/* @__PURE__ */ D("div", {
							className: "flex flex-wrap gap-1.5 mb-2",
							children: y.map((e) => /* @__PURE__ */ O("span", {
								className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-info text-white text-sm font-medium",
								children: ["{{" + e + "}}", /* @__PURE__ */ D(t, {
									variant: "ghost",
									size: "sm",
									className: "p-0 text-white text-[14px] leading-none min-w-0 min-h-0",
									onClick: () => N(e),
									"aria-label": `Remove variable ${e}`,
									children: "x"
								})]
							}, e))
						}),
						/* @__PURE__ */ D(_, {
							placeholder: "Type variable name and press Enter",
							value: S,
							onChange: (e) => C(e.target.value),
							onKeyDown: j
						})
					] }),
					/* @__PURE__ */ O("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ D(t, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: k,
							children: k ? "Saving..." : r ? "Update Template" : "Create Template"
						}), /* @__PURE__ */ D(t, {
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
function X({ metrics: e, users: r, pools: i, onRefresh: a, loading: o }) {
	let [s, c] = T(""), u = C(() => r ?? [], [r]), d = C(() => [
		{
			key: "email",
			header: "Email",
			sortable: !0
		},
		{
			key: "mfaEnabled",
			header: "MFA Status",
			width: "140px",
			render: (e) => /* @__PURE__ */ D(I, {
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
	return o ? /* @__PURE__ */ O(l, {
		title: "MFA Management",
		children: [/* @__PURE__ */ D("div", {
			className: "grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4",
			children: [
				1,
				2,
				3,
				4
			].map((e) => /* @__PURE__ */ O(n, {
				padding: "md",
				children: [/* @__PURE__ */ D("div", { className: "h-5 w-12 rounded bg-surface-hover animate-pulse mb-2" }), /* @__PURE__ */ D("div", { className: "h-3 w-20 rounded bg-surface-hover animate-pulse" })]
			}, e))
		}), /* @__PURE__ */ D(n, { className: "h-[200px] animate-pulse" })]
	}) : /* @__PURE__ */ O(l, {
		title: "MFA Management",
		actions: /* @__PURE__ */ D(t, {
			variant: "ghost",
			size: "lg",
			onClick: a,
			children: "Refresh"
		}),
		children: [
			e && /* @__PURE__ */ O("section", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4",
				children: [
					/* @__PURE__ */ O(n, {
						padding: "md",
						children: [/* @__PURE__ */ D("div", {
							className: "text-[1.75rem] font-bold text-info-fg mb-1",
							children: e.totalUsers
						}), /* @__PURE__ */ D("div", {
							className: "text-sm text-neutral",
							children: "Total Users"
						})]
					}),
					/* @__PURE__ */ O(n, {
						padding: "md",
						children: [/* @__PURE__ */ D("div", {
							className: "text-[1.75rem] font-bold text-success-fg mb-1",
							children: e.mfaEnabled
						}), /* @__PURE__ */ D("div", {
							className: "text-sm text-neutral",
							children: "MFA Enabled"
						})]
					}),
					/* @__PURE__ */ O(n, {
						padding: "md",
						children: [/* @__PURE__ */ D("div", {
							className: "text-[1.75rem] font-bold text-warning-fg mb-1",
							children: e.mfaDisabled
						}), /* @__PURE__ */ D("div", {
							className: "text-sm text-neutral",
							children: "MFA Disabled"
						})]
					}),
					/* @__PURE__ */ O(n, {
						padding: "md",
						children: [/* @__PURE__ */ O("div", {
							className: "text-[1.75rem] font-bold text-info-fg mb-1",
							children: [e.adoptionRate, "%"]
						}), /* @__PURE__ */ D("div", {
							className: "text-sm text-neutral",
							children: "Adoption Rate"
						})]
					})
				]
			}),
			i && i.length > 0 && /* @__PURE__ */ O("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ D("label", {
					className: "text-xs font-semibold text-neutral uppercase tracking-wide",
					children: "Filter by pool"
				}), /* @__PURE__ */ D(y, {
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
			/* @__PURE__ */ D(A, {
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
	let [c, u] = T(""), [d, f] = T(""), [p, m] = T(""), [h, g] = T(""), [v, b] = T("50"), [S, w] = T(""), [E, k] = T(""), [j, M] = T(null), [N, P] = T(!1), F = x(async () => {
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
	]), I = x(async () => {
		if (!(!S || !E)) {
			P(!0);
			try {
				let e = await a(S, new Date(E).getTime());
				M(e);
			} finally {
				P(!1);
			}
		}
	}, [
		S,
		E,
		a
	]), L = C(() => [
		{
			key: "timestamp",
			header: "Timestamp",
			sortable: !0,
			render: (e) => /* @__PURE__ */ D("span", {
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
			render: (e) => /* @__PURE__ */ D(t, {
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
	return /* @__PURE__ */ O(l, {
		title: "Audit Log",
		children: [
			/* @__PURE__ */ D(n, {
				padding: "md",
				children: /* @__PURE__ */ O("div", {
					className: "flex flex-wrap gap-4 items-end",
					children: [
						/* @__PURE__ */ O("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ D("label", {
								className: "text-xs font-semibold text-neutral uppercase tracking-wide",
								children: "Entity Type"
							}), /* @__PURE__ */ D(y, {
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
						/* @__PURE__ */ O("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ D("label", {
								className: "text-xs font-semibold text-neutral uppercase tracking-wide",
								children: "Entity ID"
							}), /* @__PURE__ */ D(_, {
								className: "w-44",
								value: d,
								onChange: (e) => f(e.target.value),
								placeholder: "Optional"
							})]
						}),
						/* @__PURE__ */ O("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ D("label", {
								className: "text-xs font-semibold text-neutral uppercase tracking-wide",
								children: "From"
							}), /* @__PURE__ */ D(_, {
								className: "w-52",
								type: "datetime-local",
								value: p,
								onChange: (e) => m(e.target.value)
							})]
						}),
						/* @__PURE__ */ O("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ D("label", {
								className: "text-xs font-semibold text-neutral uppercase tracking-wide",
								children: "To"
							}), /* @__PURE__ */ D(_, {
								className: "w-52",
								type: "datetime-local",
								value: h,
								onChange: (e) => g(e.target.value)
							})]
						}),
						/* @__PURE__ */ O("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ D("label", {
								className: "text-xs font-semibold text-neutral uppercase tracking-wide",
								children: "Limit"
							}), /* @__PURE__ */ D(_, {
								className: "w-[70px]",
								type: "number",
								value: v,
								onChange: (e) => b(e.target.value)
							})]
						}),
						/* @__PURE__ */ D(t, {
							variant: "primary",
							size: "lg",
							onClick: F,
							disabled: o,
							children: o ? "Querying..." : "Query"
						})
					]
				})
			}),
			s !== void 0 && /* @__PURE__ */ O("p", {
				className: "text-sm text-text-tertiary m-0",
				children: [s, " total record(s)"]
			}),
			/* @__PURE__ */ D(A, {
				columns: L,
				data: e,
				keyField: "timestamp",
				loading: o,
				emptyMessage: "No audit records found. Adjust filters and query.",
				emptyIcon: "📜"
			}),
			/* @__PURE__ */ O(n, {
				padding: "md",
				children: [
					/* @__PURE__ */ D("h3", {
						className: "text-base font-semibold text-text-primary mb-4 mt-0",
						children: "Point-in-Time Replay"
					}),
					/* @__PURE__ */ O("div", {
						className: "flex flex-wrap gap-4 items-end mb-4",
						children: [
							/* @__PURE__ */ O("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ D("label", {
									className: "text-xs font-semibold text-neutral uppercase tracking-wide",
									children: "Entity ID"
								}), /* @__PURE__ */ D(_, {
									className: "w-44",
									value: S,
									onChange: (e) => w(e.target.value),
									placeholder: "entity-id"
								})]
							}),
							/* @__PURE__ */ O("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ D("label", {
									className: "text-xs font-semibold text-neutral uppercase tracking-wide",
									children: "At Timestamp"
								}), /* @__PURE__ */ D(_, {
									className: "w-52",
									type: "datetime-local",
									value: E,
									onChange: (e) => k(e.target.value)
								})]
							}),
							/* @__PURE__ */ D(t, {
								variant: "primary",
								size: "lg",
								onClick: I,
								disabled: N || !S || !E,
								children: N ? "Replaying..." : "Replay"
							})
						]
					}),
					j && /* @__PURE__ */ D("pre", {
						className: "p-4 bg-surface-panel border border-border rounded-md font-mono text-xs text-text-primary overflow-x-auto whitespace-pre-wrap max-h-[300px] overflow-y-auto m-0",
						children: JSON.stringify(j, null, 2)
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/identity/admin/SetupGuidePage.tsx
function ne({ status: r, onNavigate: i }) {
	let [a, o] = T(null), s = x((e) => {
		o((t) => t === e ? null : e);
	}, []), c = C(() => [
		{
			title: "Create User Pool",
			done: r.hasUserPools,
			content: /* @__PURE__ */ O("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ D("p", {
					className: "m-0 text-sm text-text-secondary",
					children: r.hasUserPools ? `${r.poolCount} pool(s) configured.` : "No user pools yet."
				}), /* @__PURE__ */ D("div", { children: /* @__PURE__ */ D(t, {
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
			content: /* @__PURE__ */ O("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ D("p", {
					className: "m-0 text-sm text-text-secondary",
					children: r.hasClients ? `${r.clientCount} application(s) registered.` : "No applications registered."
				}), /* @__PURE__ */ D("div", { children: /* @__PURE__ */ D(t, {
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
			content: /* @__PURE__ */ O("div", {
				className: "flex flex-col gap-2",
				children: [r.hasAdminUser ? /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ O("p", {
					className: "m-0 text-sm text-text-secondary",
					children: ["Admin users: ", r.adminEmails.join(", ")]
				}), /* @__PURE__ */ O("p", {
					className: "m-0 text-sm text-text-secondary",
					children: [r.totalUsers, " total user(s) across all pools."]
				})] }) : /* @__PURE__ */ D("p", {
					className: "m-0 text-sm text-text-secondary",
					children: "No admin user found. Create one in a user pool."
				}), r.firstPoolId && /* @__PURE__ */ D("div", { children: /* @__PURE__ */ D(t, {
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
			content: /* @__PURE__ */ D("p", {
				className: "m-0 text-sm text-text-secondary",
				children: r.smtpConfigured ? `SMTP configured: ${r.smtpHost}` : "SMTP is not yet configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS environment variables."
			})
		},
		{
			title: "Configure Issuer",
			done: r.issuerConfigured,
			content: /* @__PURE__ */ O("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ O("p", {
					className: "m-0 text-sm text-text-secondary",
					children: ["Issuer: ", /* @__PURE__ */ D("code", {
						className: "px-1.5 py-0.5 bg-surface-hover rounded text-xs font-mono",
						children: r.issuer || "Not set"
					})]
				}), r.wellKnownUrl && /* @__PURE__ */ O("p", {
					className: "m-0 text-sm text-text-secondary",
					children: [
						"Well-known URL:",
						" ",
						/* @__PURE__ */ D("a", {
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
			content: /* @__PURE__ */ D("div", {
				className: "flex flex-col gap-3",
				children: r.firstClientId ? /* @__PURE__ */ O(E, { children: [
					/* @__PURE__ */ O("p", {
						className: "m-0 text-sm text-text-secondary",
						children: ["Client ID: ", /* @__PURE__ */ D("code", {
							className: "px-1.5 py-0.5 bg-surface-hover rounded text-xs font-mono",
							children: r.firstClientId
						})]
					}),
					/* @__PURE__ */ D("p", {
						className: "m-0 text-sm text-text-secondary",
						children: "Use this code snippet to test the OIDC authorization flow:"
					}),
					/* @__PURE__ */ D("pre", {
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
				] }) : /* @__PURE__ */ D("p", {
					className: "m-0 text-sm text-text-secondary",
					children: "Complete the previous steps first to test the integration."
				})
			})
		}
	], [r, i]), u = c.filter((e) => e.done).length, d = Math.round(u / c.length * 100);
	return /* @__PURE__ */ O(l, {
		title: "Setup Guide",
		description: `${u} of ${c.length} steps completed (${d}%)`,
		children: [/* @__PURE__ */ D("div", {
			className: "h-2 bg-surface-hover rounded-full overflow-hidden",
			children: /* @__PURE__ */ D("div", {
				className: "h-full bg-success rounded-full transition-[width] duration-300 ease-in-out",
				style: { width: `${d}%` }
			})
		}), /* @__PURE__ */ D("div", {
			className: "flex flex-col gap-2",
			children: c.map((t, r) => /* @__PURE__ */ O(n, { children: [/* @__PURE__ */ O("div", {
				className: "flex items-center justify-between px-5 py-4 cursor-pointer select-none",
				onClick: () => s(r),
				role: "button",
				"aria-expanded": a === r,
				children: [/* @__PURE__ */ O("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ D("div", {
						className: e("w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0", t.done ? "bg-success text-white" : "bg-surface-hover text-text-tertiary"),
						children: t.done ? "✓" : r + 1
					}), /* @__PURE__ */ D("span", {
						className: "text-sm font-medium text-text-primary",
						children: t.title
					})]
				}), /* @__PURE__ */ D("span", {
					className: "text-text-tertiary text-sm",
					children: a === r ? "▲" : "▼"
				})]
			}), a === r && /* @__PURE__ */ D("div", {
				className: "px-5 pb-5 pt-0 border-t border-border-subtle",
				children: /* @__PURE__ */ D("div", {
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
	return /* @__PURE__ */ D("pre", {
		className: "p-5 font-mono text-xs text-text-primary overflow-x-auto whitespace-pre-wrap max-h-[400px] overflow-y-auto m-0 bg-surface-panel",
		children: JSON.stringify(e, null, 2)
	});
}
function ie({ rates: e }) {
	let t = Object.entries(e);
	return t.length === 0 ? /* @__PURE__ */ D("p", {
		className: "p-5 text-center text-text-tertiary text-sm m-0",
		children: "No rate limiter data available."
	}) : /* @__PURE__ */ O(a, { children: [/* @__PURE__ */ D(c, { children: /* @__PURE__ */ O("tr", { children: [/* @__PURE__ */ D(o, { children: "Key" }), /* @__PURE__ */ D(o, { children: "Value" })] }) }), /* @__PURE__ */ D(r, { children: t.map(([e, t]) => /* @__PURE__ */ O(u, { children: [/* @__PURE__ */ D(i, {
		className: "font-mono text-xs",
		children: e
	}), /* @__PURE__ */ D(i, { children: typeof t == "object" ? JSON.stringify(t) : String(t) })] }, e)) })] });
}
function ae({ diagnostics: e, rates: s, dlq: d, onRedrive: f, onPurge: m, onRefresh: h, loading: g }) {
	let [_, v] = T(!1), y = w(null);
	S(() => (_ ? y.current = setInterval(h, 1e4) : y.current &&= (clearInterval(y.current), null), () => {
		y.current && clearInterval(y.current);
	}), [_, h]);
	let C = x(async (e) => {
		await f(e);
	}, [f]), E = x(async (e) => {
		await m(e);
	}, [m]);
	return g ? /* @__PURE__ */ D(l, {
		title: "Diagnostics",
		children: /* @__PURE__ */ D("div", {
			className: "flex flex-col gap-4",
			children: [
				1,
				2,
				3
			].map((e) => /* @__PURE__ */ D(n, { className: "h-[120px] animate-pulse" }, e))
		})
	}) : /* @__PURE__ */ O(l, {
		title: "Diagnostics",
		actions: /* @__PURE__ */ O("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ O("label", {
				className: "flex items-center gap-1.5 text-sm text-neutral cursor-pointer",
				children: [/* @__PURE__ */ D(b, {
					checked: _,
					onChange: v,
					className: "rounded"
				}), "Auto-refresh (10s)"]
			}), /* @__PURE__ */ D(t, {
				variant: "ghost",
				size: "lg",
				onClick: h,
				children: "Refresh"
			})]
		}),
		children: [
			/* @__PURE__ */ O(n, { children: [/* @__PURE__ */ D("div", {
				className: "px-5 py-3 border-b border-border bg-surface-panel",
				children: /* @__PURE__ */ D("h3", {
					className: "text-sm font-semibold text-text-primary m-0",
					children: "Node / Cluster Diagnostics"
				})
			}), e ? /* @__PURE__ */ D(re, { data: e }) : /* @__PURE__ */ D("p", {
				className: "p-5 text-center text-text-tertiary text-sm m-0",
				children: "No diagnostics data available."
			})] }),
			/* @__PURE__ */ O(n, { children: [/* @__PURE__ */ D("div", {
				className: "px-5 py-3 border-b border-border bg-surface-panel",
				children: /* @__PURE__ */ D("h3", {
					className: "text-sm font-semibold text-text-primary m-0",
					children: "Rate Limiter Stats"
				})
			}), s ? /* @__PURE__ */ D(ie, { rates: s }) : /* @__PURE__ */ D("p", {
				className: "p-5 text-center text-text-tertiary text-sm m-0",
				children: "No rate data available."
			})] }),
			/* @__PURE__ */ O(n, { children: [/* @__PURE__ */ D("div", {
				className: "px-5 py-3 border-b border-border bg-surface-panel",
				children: /* @__PURE__ */ D("h3", {
					className: "text-sm font-semibold text-text-primary m-0",
					children: "Dead Letter Queue"
				})
			}), !d || d.length === 0 ? /* @__PURE__ */ D("p", {
				className: "p-5 text-center text-text-tertiary text-sm m-0",
				children: "Dead letter queue is empty."
			}) : /* @__PURE__ */ O(a, { children: [/* @__PURE__ */ D(c, { children: /* @__PURE__ */ O("tr", { children: [
				/* @__PURE__ */ D(o, { children: "ID" }),
				/* @__PURE__ */ D(o, { children: "Error" }),
				/* @__PURE__ */ D(o, { children: "Failed At" }),
				/* @__PURE__ */ D(o, { children: "Retries" }),
				/* @__PURE__ */ D(o, {
					className: "text-right",
					children: "Actions"
				})
			] }) }), /* @__PURE__ */ D(r, { children: d.map((e) => /* @__PURE__ */ O(u, { children: [
				/* @__PURE__ */ O(i, {
					className: "font-mono text-xs",
					children: [e.id.substring(0, 12), "..."]
				}),
				/* @__PURE__ */ D(i, { children: /* @__PURE__ */ D(p, {
					tone: "danger",
					size: "xs",
					children: e.error
				}) }),
				/* @__PURE__ */ D(i, {
					className: "text-xs text-neutral",
					children: new Date(e.failedAt).toLocaleString()
				}),
				/* @__PURE__ */ D(i, { children: /* @__PURE__ */ D(p, {
					tone: "neutral",
					size: "xs",
					mono: !0,
					children: e.retryCount
				}) }),
				/* @__PURE__ */ D(i, {
					className: "text-right",
					children: /* @__PURE__ */ O("div", {
						className: "flex items-center justify-end gap-2",
						children: [/* @__PURE__ */ D(t, {
							variant: "ghost",
							size: "sm",
							onClick: () => C(e.id),
							children: "Redrive"
						}), /* @__PURE__ */ D(t, {
							variant: "danger",
							size: "sm",
							onClick: () => E(e.id),
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
	let [m, h] = T(() => p === "register" && !u || p === "forgot" && !d ? "signin" : p), [g, _] = T(!1), [v, y] = T(null), [b, S] = T(""), [C, w] = T(""), [k, A] = T(""), [j, N] = T(""), [P, F] = T(""), [I, L] = T(""), [R, z] = T(""), [B, V] = T(!1), [H, U] = T(""), [W, G] = T(!1), K = o || v, q = x(async (e) => {
		e.preventDefault(), y(null), _(!0);
		try {
			await s(b, C);
		} catch (e) {
			y(e instanceof Error ? e.message : "Login failed");
		} finally {
			_(!1);
		}
	}, [
		b,
		C,
		s
	]), J = x(async (e) => {
		if (e.preventDefault(), y(null), j !== P) {
			y("Passwords do not match");
			return;
		}
		_(!0);
		try {
			await c({
				email: k,
				password: j,
				givenName: I || void 0,
				familyName: R || void 0,
				enableMfa: B || void 0
			});
		} catch (e) {
			y(e instanceof Error ? e.message : "Registration failed");
		} finally {
			_(!1);
		}
	}, [
		k,
		j,
		P,
		I,
		R,
		B,
		c
	]), Y = x(async (e) => {
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
	return /* @__PURE__ */ D("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ O("div", {
			className: "w-full max-w-[440px] bg-white rounded-xl shadow-md p-8",
			role: "main",
			"aria-label": "Authentication",
			children: [
				/* @__PURE__ */ O("header", {
					className: "flex flex-col items-center gap-3 mb-6",
					children: [a && /* @__PURE__ */ D("img", {
						src: a,
						alt: "",
						className: "w-14 h-14 object-contain rounded-md"
					}), i && /* @__PURE__ */ D("h1", {
						className: "text-xl font-bold text-text-primary m-0",
						children: i
					})]
				}),
				/* @__PURE__ */ O("nav", {
					className: "flex border-b border-border mb-6",
					role: "tablist",
					"aria-label": "Authentication method",
					children: [
						/* @__PURE__ */ D(t, {
							variant: "ghost",
							size: "sm",
							role: "tab",
							"aria-selected": m === "signin",
							className: e("flex-1 rounded-none border-b-2", m === "signin" ? "border-b-info text-info-fg font-semibold" : "border-b-transparent text-neutral font-normal"),
							onClick: () => X("signin"),
							children: "Sign In"
						}),
						u && /* @__PURE__ */ D(t, {
							variant: "ghost",
							size: "sm",
							role: "tab",
							"aria-selected": m === "register",
							className: e("flex-1 rounded-none border-b-2", m === "register" ? "border-b-info text-info-fg font-semibold" : "border-b-transparent text-neutral font-normal"),
							onClick: () => X("register"),
							children: "Register"
						}),
						d && /* @__PURE__ */ D(t, {
							variant: "ghost",
							size: "sm",
							role: "tab",
							"aria-selected": m === "forgot",
							className: e("flex-1 rounded-none border-b-2", m === "forgot" ? "border-b-info text-info-fg font-semibold" : "border-b-transparent text-neutral font-normal"),
							onClick: () => X("forgot"),
							children: "Forgot Password"
						})
					]
				}),
				K && /* @__PURE__ */ D("div", {
					className: "mb-5",
					children: /* @__PURE__ */ D(f, {
						variant: "error",
						children: K
					})
				}),
				m === "signin" && /* @__PURE__ */ O("form", {
					onSubmit: q,
					"aria-label": "Sign in form",
					children: [
						/* @__PURE__ */ D("input", {
							type: "hidden",
							name: "uid",
							value: n
						}),
						/* @__PURE__ */ D(M, {
							label: "Email",
							name: "login-email",
							type: "email",
							value: b,
							onChange: (e) => S(String(e)),
							required: !0,
							placeholder: "you@example.com",
							disabled: g
						}),
						/* @__PURE__ */ D(M, {
							label: "Password",
							name: "login-password",
							type: "password",
							value: C,
							onChange: (e) => w(String(e)),
							required: !0,
							disabled: g
						}),
						/* @__PURE__ */ D(t, {
							type: "submit",
							variant: "primary",
							size: "lg",
							fullWidth: !0,
							disabled: g,
							children: g ? "Signing in..." : "Sign In"
						})
					]
				}),
				m === "register" && /* @__PURE__ */ O("form", {
					onSubmit: J,
					"aria-label": "Registration form",
					children: [
						/* @__PURE__ */ D(M, {
							label: "Email",
							name: "reg-email",
							type: "email",
							value: k,
							onChange: (e) => A(String(e)),
							required: !0,
							placeholder: "you@example.com",
							disabled: g
						}),
						/* @__PURE__ */ O("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ D("div", {
								className: "flex-1",
								children: /* @__PURE__ */ D(M, {
									label: "Given Name",
									name: "reg-given",
									value: I,
									onChange: (e) => L(String(e)),
									disabled: g
								})
							}), /* @__PURE__ */ D("div", {
								className: "flex-1",
								children: /* @__PURE__ */ D(M, {
									label: "Family Name",
									name: "reg-family",
									value: R,
									onChange: (e) => z(String(e)),
									disabled: g
								})
							})]
						}),
						/* @__PURE__ */ D(M, {
							label: "Password",
							name: "reg-password",
							type: "password",
							value: j,
							onChange: (e) => N(String(e)),
							required: !0,
							disabled: g
						}),
						/* @__PURE__ */ D(M, {
							label: "Confirm Password",
							name: "reg-confirm",
							type: "password",
							value: P,
							onChange: (e) => F(String(e)),
							required: !0,
							disabled: g
						}),
						/* @__PURE__ */ D(M, {
							label: "Enable Multi-Factor Authentication",
							name: "reg-mfa",
							type: "checkbox",
							value: B,
							onChange: (e) => V(!!e),
							disabled: g
						}),
						/* @__PURE__ */ D(t, {
							type: "submit",
							variant: "primary",
							size: "lg",
							fullWidth: !0,
							disabled: g,
							children: g ? "Creating account..." : "Create Account"
						})
					]
				}),
				m === "forgot" && /* @__PURE__ */ D("form", {
					onSubmit: Y,
					"aria-label": "Forgot password form",
					children: W ? /* @__PURE__ */ D(f, {
						variant: "success",
						children: "If an account exists for that email, a password reset link has been sent."
					}) : /* @__PURE__ */ O(E, { children: [
						/* @__PURE__ */ D("p", {
							className: "text-sm text-neutral mb-4 mt-0 leading-relaxed",
							children: "Enter your email address and we'll send you a link to reset your password."
						}),
						/* @__PURE__ */ D(M, {
							label: "Email",
							name: "forgot-email",
							type: "email",
							value: H,
							onChange: (e) => U(String(e)),
							required: !0,
							placeholder: "you@example.com",
							disabled: g
						}),
						/* @__PURE__ */ D(t, {
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
	let [c, l] = T(!1), u = x(async () => {
		l(!0);
		try {
			await a();
		} finally {
			l(!1);
		}
	}, [a]), d = x(async () => {
		l(!0);
		try {
			await o();
		} finally {
			l(!1);
		}
	}, [o]);
	return /* @__PURE__ */ D("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ O("div", {
			className: "w-full max-w-[440px] bg-white rounded-xl shadow-md overflow-hidden",
			role: "main",
			"aria-label": "Authorization consent",
			children: [
				/* @__PURE__ */ O("header", {
					className: "flex flex-col items-center gap-3 px-8 pt-8 pb-5",
					children: [
						s && /* @__PURE__ */ D("img", {
							src: s,
							alt: "",
							className: "w-14 h-14 object-contain rounded-md"
						}),
						/* @__PURE__ */ O("h1", {
							className: "text-xl font-bold text-text-primary m-0 text-center",
							children: ["Authorize ", n]
						}),
						/* @__PURE__ */ D("p", {
							className: "text-sm text-neutral m-0 text-center leading-relaxed",
							children: "This application is requesting access to your account."
						})
					]
				}),
				/* @__PURE__ */ O("div", {
					className: "mx-8 border border-border rounded-md overflow-hidden mb-6",
					children: [/* @__PURE__ */ D("p", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-neutral px-4 py-2.5 m-0 bg-surface-panel border-b border-border",
						children: "Requested Permissions"
					}), /* @__PURE__ */ D("ul", {
						className: "list-none p-0 m-0",
						"aria-label": "Requested permissions",
						children: r.map((t, n) => /* @__PURE__ */ O("li", {
							className: e("flex items-center gap-3 px-4 py-3 text-sm text-text-primary", n < r.length - 1 && "border-b border-border"),
							children: [/* @__PURE__ */ D("span", {
								className: "w-2 h-2 rounded-full bg-info shrink-0",
								"aria-hidden": "true"
							}), /* @__PURE__ */ D("span", { children: ce(t) })]
						}, t))
					})]
				}),
				/* @__PURE__ */ O("div", {
					className: "px-8 pb-8",
					children: [i && /* @__PURE__ */ O("p", {
						className: "text-[11px] text-text-tertiary mb-5 mt-0 break-all leading-relaxed",
						children: ["You will be redirected to: ", /* @__PURE__ */ D("strong", {
							className: "text-neutral",
							children: i
						})]
					}), /* @__PURE__ */ O("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ D(t, {
							variant: "ghost",
							size: "lg",
							fullWidth: !0,
							onClick: d,
							disabled: c,
							children: "Deny"
						}), /* @__PURE__ */ D(t, {
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
	return /* @__PURE__ */ O("figure", {
		className: "flex flex-col items-center gap-2 m-0 p-4 border border-border rounded-md bg-white",
		children: [/* @__PURE__ */ D("img", {
			src: e,
			alt: n || "QR Code",
			width: t,
			height: t,
			className: "block rounded-sm [image-rendering:pixelated]"
		}), n && /* @__PURE__ */ D("figcaption", {
			className: "text-sm text-neutral text-center",
			children: n
		})]
	});
}
//#endregion
//#region src/components/identity/shared/CodeInput.tsx
function Q({ length: t = 6, onComplete: n, error: r = null, disabled: i = !1, autoFocus: a = !1 }) {
	let [o, s] = T(Array(t).fill("")), c = w([]);
	S(() => {
		a && c.current[0] && c.current[0].focus();
	}, [a]);
	let l = x((e) => {
		e >= 0 && e < t && c.current[e] && (c.current[e].focus(), c.current[e].select());
	}, [t]), u = w(null);
	S(() => {
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
	let d = x((e, n) => {
		let r = n.replace(/\D/g, "").slice(-1);
		s((t) => {
			let n = [...t];
			return n[e] = r, n;
		}), r && e < t - 1 && l(e + 1);
	}, [t, l]), f = x((e, n) => {
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
	]), p = x((e) => {
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
	return /* @__PURE__ */ O("div", {
		className: "flex flex-col items-center gap-2",
		children: [/* @__PURE__ */ D("div", {
			className: "flex gap-2",
			role: "group",
			"aria-label": "Verification code input",
			children: Array.from({ length: t }, (n, a) => /* @__PURE__ */ D("input", {
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
		}), r && /* @__PURE__ */ D("p", {
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
], ue = [
	"Name",
	"Scan",
	"Verify",
	"Backup"
];
function de({ onSetup: n, onVerify: r, onComplete: i, userEmail: a, initialStep: o = "name", initialSetupResult: s, initialDeviceName: c = "" }) {
	let [l, u] = T(o === "scan" && !s ? "name" : o), [d, p] = T(!1), [m, h] = T(null), [g, _] = T(c), [v, y] = T(s ?? null), [b, C] = T(s?.backupCodes ?? []), [E, k] = T(!1), A = $.indexOf(l), j = x(async (e) => {
		if (e.preventDefault(), g.trim()) {
			h(null), p(!0);
			try {
				let e = await n(g.trim());
				y(e), C(e.backupCodes), u("scan");
			} catch (e) {
				h(e instanceof Error ? e.message : "Setup failed");
			} finally {
				p(!1);
			}
		}
	}, [g, n]), N = x(async (e) => {
		if (v) {
			h(null), p(!0);
			try {
				let t = await r(v.deviceId, e);
				t.success ? (t.backupCodes && C(t.backupCodes), u("backup")) : h("Verification failed. Please try again.");
			} catch (e) {
				h(e instanceof Error ? e.message : "Verification failed");
			} finally {
				p(!1);
			}
		}
	}, [v, r]), P = w(null);
	S(() => () => {
		P.current && clearTimeout(P.current);
	}, []);
	let F = x(async () => {
		try {
			await navigator.clipboard.writeText(b.join("\n")), k(!0), P.current && clearTimeout(P.current), P.current = setTimeout(() => k(!1), 2e3);
		} catch {}
	}, [b]);
	return /* @__PURE__ */ D("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ O("div", {
			className: "w-full max-w-[480px] bg-white rounded-xl shadow-md p-8",
			role: "main",
			"aria-label": "MFA setup",
			children: [
				/* @__PURE__ */ D("h1", {
					className: "text-xl font-bold text-text-primary mb-2 mt-0 text-center",
					children: "Set Up Multi-Factor Authentication"
				}),
				a && /* @__PURE__ */ D("p", {
					className: "text-sm text-neutral mb-5 mt-0 text-center",
					children: a
				}),
				/* @__PURE__ */ D("div", {
					className: "flex justify-center gap-6 mb-6",
					role: "group",
					"aria-label": "Setup progress",
					children: $.map((t, n) => /* @__PURE__ */ O("div", {
						className: "flex flex-col items-center gap-1.5",
						children: [/* @__PURE__ */ D("div", {
							className: e("w-3 h-3 rounded-full transition-colors duration-200", n < A ? "bg-success" : n === A ? "bg-info" : "bg-surface-emphasis"),
							"aria-label": `Step ${n + 1}${n === A ? " (current)" : n < A ? " (completed)" : ""}`
						}), /* @__PURE__ */ D("span", {
							className: e("text-[10px] uppercase tracking-wide font-medium", n === A ? "text-text-primary" : "text-text-tertiary"),
							children: ue[n]
						})]
					}, t))
				}),
				m && /* @__PURE__ */ D("div", {
					className: "mb-5",
					children: /* @__PURE__ */ D(f, {
						variant: "error",
						children: m
					})
				}),
				l === "name" && /* @__PURE__ */ O("form", {
					onSubmit: j,
					"aria-label": "Name your device",
					children: [
						/* @__PURE__ */ D("p", {
							className: "text-sm text-neutral mb-4 mt-0 text-center leading-relaxed",
							children: "Give your authenticator device a name so you can identify it later."
						}),
						/* @__PURE__ */ D(M, {
							label: "Device Name",
							name: "device-name",
							value: g,
							onChange: (e) => _(String(e)),
							required: !0,
							placeholder: "e.g., My Phone",
							disabled: d
						}),
						/* @__PURE__ */ D(t, {
							type: "submit",
							variant: "primary",
							size: "lg",
							fullWidth: !0,
							disabled: d || !g.trim(),
							children: d ? "Setting up..." : "Continue"
						})
					]
				}),
				l === "scan" && v && /* @__PURE__ */ O("div", { children: [
					/* @__PURE__ */ D(t, {
						variant: "ghost",
						size: "sm",
						className: "p-0 mb-4",
						onClick: () => u("name"),
						"aria-label": "Go back to name step",
						children: "← Back"
					}),
					/* @__PURE__ */ D("p", {
						className: "text-sm text-neutral mb-5 mt-0 text-center leading-relaxed",
						children: "Scan this QR code with your authenticator app"
					}),
					/* @__PURE__ */ D("div", {
						className: "flex justify-center mb-5",
						children: /* @__PURE__ */ D(Z, {
							value: v.qrCode,
							size: 200,
							label: g ? `Device: ${g}` : void 0
						})
					}),
					/* @__PURE__ */ D("p", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary text-center mb-2 mt-0",
						children: "Or enter this secret manually"
					}),
					/* @__PURE__ */ D("div", {
						className: "px-4 py-3 bg-surface-panel border border-border rounded-md font-mono text-sm text-text-primary break-all text-center mb-6 select-all",
						children: v.secret
					}),
					/* @__PURE__ */ D(t, {
						variant: "primary",
						size: "lg",
						fullWidth: !0,
						onClick: () => u("verify"),
						children: "I've scanned it"
					})
				] }),
				l === "verify" && /* @__PURE__ */ O("div", { children: [
					/* @__PURE__ */ D(t, {
						variant: "ghost",
						size: "sm",
						className: "p-0 mb-4",
						onClick: () => u("scan"),
						"aria-label": "Go back to scan step",
						children: "← Back"
					}),
					/* @__PURE__ */ D("p", {
						className: "text-sm text-neutral mb-6 mt-0 text-center leading-relaxed",
						children: "Enter the 6-digit code from your authenticator app to confirm setup"
					}),
					/* @__PURE__ */ D(Q, {
						onComplete: N,
						error: m,
						disabled: d,
						autoFocus: !0
					}),
					d && /* @__PURE__ */ D("p", {
						className: "text-center text-sm text-text-tertiary mt-3",
						children: "Verifying..."
					})
				] }),
				l === "backup" && /* @__PURE__ */ O("div", { children: [
					/* @__PURE__ */ D("div", {
						className: "w-14 h-14 mx-auto mb-5 rounded-full bg-success-bg flex items-center justify-center",
						children: /* @__PURE__ */ D("svg", {
							width: "28",
							height: "28",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							className: "text-success-fg",
							children: /* @__PURE__ */ D("polyline", { points: "20 6 9 17 4 12" })
						})
					}),
					/* @__PURE__ */ D("p", {
						className: "text-sm text-neutral mb-5 mt-0 text-center leading-relaxed",
						children: "Save these backup codes in a safe place. Each code can only be used once."
					}),
					/* @__PURE__ */ D("div", {
						className: "grid grid-cols-2 gap-2.5 mb-6",
						children: b.map((e, t) => /* @__PURE__ */ D("div", {
							className: "px-3 py-2.5 bg-surface-panel border border-border rounded-md font-mono text-sm text-text-primary text-center select-all",
							children: e
						}, t))
					}),
					/* @__PURE__ */ D(t, {
						variant: "primary",
						size: "lg",
						fullWidth: !0,
						onClick: F,
						children: E ? "Copied!" : "Copy All Codes"
					}),
					/* @__PURE__ */ D("div", {
						className: "mt-3",
						children: /* @__PURE__ */ D(t, {
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
function fe({ onVerify: e, onVerifyBackup: n, error: r = null, defaultMode: i = "totp" }) {
	let [a, o] = T(i), [s, c] = T(!1), [l, u] = T(null), [d, p] = T(""), m = r || l, h = x(async (t) => {
		u(null), c(!0);
		try {
			await e(t);
		} catch (e) {
			u(e instanceof Error ? e.message : "Verification failed");
		} finally {
			c(!1);
		}
	}, [e]), g = x(async (e) => {
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
	return /* @__PURE__ */ D("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ O("div", {
			className: "w-full max-w-[440px] bg-white rounded-xl shadow-md p-8",
			role: "main",
			"aria-label": "Multi-factor verification",
			children: [
				/* @__PURE__ */ D("div", {
					className: "w-14 h-14 mx-auto mb-5 rounded-full bg-info-bg flex items-center justify-center",
					children: /* @__PURE__ */ O("svg", {
						width: "28",
						height: "28",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						className: "text-info-fg",
						children: [/* @__PURE__ */ D("rect", {
							x: "3",
							y: "11",
							width: "18",
							height: "11",
							rx: "2",
							ry: "2"
						}), /* @__PURE__ */ D("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })]
					})
				}),
				/* @__PURE__ */ D("h1", {
					className: "text-xl font-bold text-text-primary mb-2 mt-0 text-center",
					children: "Verify Your Identity"
				}),
				a === "totp" ? /* @__PURE__ */ O(E, { children: [
					/* @__PURE__ */ D("p", {
						className: "text-sm text-neutral mb-6 mt-0 text-center leading-relaxed",
						children: "Enter the 6-digit code from your authenticator app"
					}),
					m && /* @__PURE__ */ D("div", {
						className: "mb-5",
						children: /* @__PURE__ */ D(f, {
							variant: "error",
							children: m
						})
					}),
					/* @__PURE__ */ D(Q, {
						onComplete: h,
						error: null,
						disabled: s,
						autoFocus: !0
					}),
					s && /* @__PURE__ */ D("p", {
						className: "text-center text-sm text-text-tertiary mt-3",
						children: "Verifying..."
					}),
					/* @__PURE__ */ D(t, {
						variant: "ghost",
						size: "sm",
						className: "block mt-6 mx-auto underline text-info-fg",
						onClick: () => {
							o("backup"), u(null);
						},
						children: "Use a backup code instead"
					})
				] }) : /* @__PURE__ */ O(E, { children: [
					/* @__PURE__ */ D("p", {
						className: "text-sm text-neutral mb-6 mt-0 text-center leading-relaxed",
						children: "Enter one of your backup codes"
					}),
					m && /* @__PURE__ */ D("div", {
						className: "mb-5",
						children: /* @__PURE__ */ D(f, {
							variant: "error",
							children: m
						})
					}),
					/* @__PURE__ */ O("form", {
						onSubmit: g,
						"aria-label": "Backup code verification",
						children: [/* @__PURE__ */ D(M, {
							label: "Backup Code",
							name: "backup-code",
							value: d,
							onChange: (e) => p(String(e)),
							required: !0,
							placeholder: "XXXX-XXXX-XXXX",
							disabled: s
						}), /* @__PURE__ */ D(t, {
							type: "submit",
							variant: "primary",
							size: "lg",
							fullWidth: !0,
							disabled: s || !d.trim(),
							children: s ? "Verifying..." : "Verify Backup Code"
						})]
					}),
					/* @__PURE__ */ D(t, {
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
function pe(e) {
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
function me({ devices: e, userEmail: n, mfaEnabled: r, onAddDevice: i, onRenameDevice: a, onRemoveDevice: o, loading: s = !1 }) {
	let [c, l] = T(null), [u, d] = T(null), [f, m] = T(""), [_, v] = T(!1), y = x(async () => {
		if (c) {
			v(!0);
			try {
				await o(c);
			} finally {
				v(!1), l(null);
			}
		}
	}, [c, o]), b = x(async (e) => {
		if (f.trim()) {
			v(!0);
			try {
				await a(e, f.trim());
			} finally {
				v(!1), d(null), m("");
			}
		}
	}, [f, a]), S = (e) => {
		d(e.deviceId), m(e.deviceName);
	};
	return /* @__PURE__ */ D("div", {
		className: "min-h-full flex items-start justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ O("div", {
			className: "w-full max-w-[600px] bg-white rounded-xl shadow-md p-8",
			role: "main",
			"aria-label": "MFA device management",
			children: [
				/* @__PURE__ */ O("div", {
					className: "flex items-center justify-between mb-6 flex-wrap gap-3",
					children: [/* @__PURE__ */ O("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ D("h1", {
							className: "text-xl font-bold text-text-primary m-0",
							children: "MFA Devices"
						}), n && /* @__PURE__ */ D("p", {
							className: "text-sm text-neutral m-0",
							children: n
						})]
					}), /* @__PURE__ */ O("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ D(p, {
							tone: r ? "success" : "warning",
							children: r ? "Enabled" : "Disabled"
						}), /* @__PURE__ */ D(t, {
							variant: "primary",
							size: "md",
							onClick: i,
							children: "Add Device"
						})]
					})]
				}),
				s && /* @__PURE__ */ D("p", {
					className: "text-center text-text-tertiary text-sm py-8",
					children: "Loading devices..."
				}),
				!s && e.length === 0 && /* @__PURE__ */ D(g, {
					icon: "🔐",
					title: "No MFA devices configured",
					body: "Add a device to secure your account with multi-factor authentication.",
					actionLabel: "Add Device",
					onAction: i
				}),
				!s && e.length > 0 && /* @__PURE__ */ D("div", {
					className: "flex flex-col gap-3",
					role: "list",
					"aria-label": "MFA devices",
					children: e.map((e) => /* @__PURE__ */ O("div", {
						className: "p-5 border border-border rounded-lg bg-white",
						role: "listitem",
						children: [
							/* @__PURE__ */ D("div", {
								className: "flex items-center justify-between mb-2",
								children: /* @__PURE__ */ D("div", {
									className: "flex items-center gap-2.5",
									children: u === e.deviceId ? /* @__PURE__ */ O("form", {
										onSubmit: (t) => {
											t.preventDefault(), b(e.deviceId);
										},
										className: "flex gap-2 items-center",
										children: [
											/* @__PURE__ */ D(M, {
												label: "",
												name: `rename-${e.deviceId}`,
												value: f,
												onChange: (e) => m(String(e)),
												disabled: _
											}),
											/* @__PURE__ */ D(t, {
												type: "submit",
												variant: "primary",
												size: "sm",
												disabled: _ || !f.trim(),
												children: "Save"
											}),
											/* @__PURE__ */ D(t, {
												variant: "ghost",
												size: "sm",
												onClick: () => d(null),
												children: "Cancel"
											})
										]
									}) : /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D("h3", {
										className: "text-[15px] font-semibold text-text-primary m-0",
										children: e.deviceName
									}), /* @__PURE__ */ D(I, { status: e.isVerified ? "CONFIRMED" : "UNCONFIRMED" })] })
								})
							}),
							/* @__PURE__ */ O("p", {
								className: "text-[11px] text-text-tertiary m-0 mb-3",
								children: [
									"Type: ",
									e.deviceType,
									" · Added: ",
									pe(e.createdAt),
									e.lastUsed && ` · Last used: ${pe(e.lastUsed)}`
								]
							}),
							u !== e.deviceId && /* @__PURE__ */ O("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ D(t, {
									variant: "ghost",
									size: "sm",
									onClick: () => S(e),
									children: "Rename"
								}), /* @__PURE__ */ D(t, {
									variant: "danger",
									size: "sm",
									onClick: () => l(e.deviceId),
									children: "Remove"
								})]
							})
						]
					}, e.deviceId))
				}),
				/* @__PURE__ */ D(h, {
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
function he({ onConfirm: e, onCancel: n, clientName: r }) {
	return /* @__PURE__ */ D("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ O("div", {
			className: "w-full max-w-[420px] bg-white rounded-xl shadow-md p-8 text-center",
			role: "main",
			"aria-label": "Sign out confirmation",
			children: [
				/* @__PURE__ */ D("div", {
					className: "w-14 h-14 mx-auto mb-5 rounded-full bg-danger-bg flex items-center justify-center",
					children: /* @__PURE__ */ O("svg", {
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
							/* @__PURE__ */ D("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
							/* @__PURE__ */ D("polyline", { points: "16 17 21 12 16 7" }),
							/* @__PURE__ */ D("line", {
								x1: "21",
								y1: "12",
								x2: "9",
								y2: "12"
							})
						]
					})
				}),
				/* @__PURE__ */ D("h1", {
					className: "text-xl font-bold text-text-primary mb-3 mt-0",
					children: "Sign Out"
				}),
				/* @__PURE__ */ O("p", {
					className: "text-sm text-neutral mb-6 mt-0 leading-relaxed",
					children: [
						"Are you sure you want to sign out",
						r ? /* @__PURE__ */ O(E, { children: [" from ", /* @__PURE__ */ D("strong", {
							className: "text-text-primary",
							children: r
						})] }) : "",
						"? You will need to sign in again to access your account."
					]
				}),
				/* @__PURE__ */ O("div", {
					className: "flex gap-3 justify-center",
					children: [n && /* @__PURE__ */ D(t, {
						variant: "ghost",
						size: "lg",
						fullWidth: !0,
						onClick: n,
						children: "Cancel"
					}), /* @__PURE__ */ D(t, {
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
function ge({ title: e = "Something went wrong", message: n, error: r, onRetry: i, onBack: a }) {
	return /* @__PURE__ */ D("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ O("div", {
			className: "w-full max-w-[420px] bg-white rounded-xl shadow-md p-8 text-center",
			role: "main",
			"aria-label": "Error",
			children: [
				/* @__PURE__ */ D("div", {
					className: "w-14 h-14 rounded-full bg-danger-bg flex items-center justify-center mx-auto mb-5",
					"aria-hidden": "true",
					children: /* @__PURE__ */ O("svg", {
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
							/* @__PURE__ */ D("circle", {
								cx: "12",
								cy: "12",
								r: "10"
							}),
							/* @__PURE__ */ D("line", {
								x1: "15",
								y1: "9",
								x2: "9",
								y2: "15"
							}),
							/* @__PURE__ */ D("line", {
								x1: "9",
								y1: "9",
								x2: "15",
								y2: "15"
							})
						]
					})
				}),
				/* @__PURE__ */ D("h1", {
					className: "text-xl font-bold text-text-primary mb-3 mt-0",
					children: e
				}),
				/* @__PURE__ */ D("p", {
					className: "text-sm text-neutral mb-3 mt-0 leading-relaxed",
					children: n
				}),
				r && /* @__PURE__ */ D("code", {
					className: "text-[11px] text-text-tertiary font-mono mb-5 px-3.5 py-2 bg-surface-panel border border-border rounded-md inline-block max-w-full overflow-x-auto",
					children: r
				}),
				(i || a) && /* @__PURE__ */ O("div", {
					className: "flex gap-3 justify-center mt-6",
					children: [a && /* @__PURE__ */ D(t, {
						variant: "ghost",
						size: "lg",
						onClick: a,
						children: "Go Back"
					}), i && /* @__PURE__ */ D(t, {
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
var _e = [
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
function ve({ item: t, active: n, onNavigate: r }) {
	return /* @__PURE__ */ D("li", { children: /* @__PURE__ */ O("button", {
		type: "button",
		className: e("flex items-center gap-2 w-full text-left px-3 py-2 text-sm font-medium cursor-pointer", "border-none rounded-none border-l-[3px] transition-colors", n ? "bg-surface-panel text-info-fg font-semibold border-l-info" : "bg-transparent text-text-primary border-l-transparent hover:bg-surface-hover"),
		onClick: () => r(t.path),
		"aria-current": n ? "page" : void 0,
		children: [/* @__PURE__ */ D("span", { children: t.icon }), /* @__PURE__ */ D("span", { children: t.label })]
	}) });
}
function ye({ children: n, activePath: r, adminEmail: i, onNavigate: a, onLogout: o, defaultSidebarOpen: s = !0 }) {
	let [c, l] = T(s), u = x(() => l((e) => !e), []);
	return /* @__PURE__ */ O("div", {
		className: "flex min-h-screen bg-surface-panel font-[inherit]",
		children: [/* @__PURE__ */ O("aside", {
			className: e("bg-white border-r border-border flex flex-col shrink-0 transition-[width] duration-200 overflow-hidden", c ? "w-60" : "w-0 border-r-0"),
			children: [/* @__PURE__ */ D("div", {
				className: "p-4 font-bold text-lg text-info-fg border-b border-border",
				children: "Identity Admin"
			}), /* @__PURE__ */ D("ul", {
				className: "list-none m-0 p-0 py-2 flex-1",
				children: _e.map((e) => /* @__PURE__ */ D(ve, {
					item: e,
					active: r === e.path,
					onNavigate: a
				}, e.path))
			})]
		}), /* @__PURE__ */ O("div", {
			className: "flex-1 flex flex-col min-w-0",
			children: [/* @__PURE__ */ O("header", {
				className: "flex items-center justify-between px-4 py-2 bg-white border-b border-border",
				children: [/* @__PURE__ */ D(t, {
					variant: "ghost",
					size: "sm",
					onClick: u,
					"aria-label": "Toggle sidebar",
					children: c ? "←" : "→"
				}), /* @__PURE__ */ O("div", {
					className: "flex items-center gap-4",
					children: [i && /* @__PURE__ */ D("span", {
						className: "text-sm text-neutral",
						children: i
					}), o && /* @__PURE__ */ D(t, {
						variant: "danger-solid",
						size: "sm",
						onClick: o,
						children: "Logout"
					})]
				})]
			}), /* @__PURE__ */ D("main", {
				className: "flex-1 p-6 overflow-y-auto",
				children: n
			})]
		})]
	});
}
//#endregion
//#region src/components/identity/shared/PoolScopedLayout.tsx
var be = [
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
function xe({ label: n, active: r, onClick: i }) {
	return /* @__PURE__ */ D(t, {
		variant: "ghost",
		size: "sm",
		className: e("rounded-none -mb-[2px] border-b-2", r ? "font-semibold text-info-fg border-b-info" : "font-normal text-neutral border-b-transparent"),
		onClick: i,
		"aria-selected": r,
		role: "tab",
		children: n
	});
}
function Se({ children: e, poolId: n, poolName: r, activeSection: i, onNavigate: a, onBack: o }) {
	let s = x((e) => {
		a(`/identity/admin/pools/${n}/${e}`);
	}, [a, n]), c = i ? i.charAt(0).toUpperCase() + i.slice(1) : "";
	return /* @__PURE__ */ O("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ O("nav", {
				className: "flex items-center gap-1.5 text-sm text-text-tertiary",
				"aria-label": "Breadcrumb",
				children: [
					/* @__PURE__ */ D(t, {
						variant: "ghost",
						size: "sm",
						className: "p-0 underline text-info-fg",
						onClick: o,
						"aria-label": "Navigate to Pools",
						children: "Pools"
					}),
					/* @__PURE__ */ D("span", { children: "/" }),
					/* @__PURE__ */ D("span", {
						className: "text-text-primary font-medium",
						children: r
					}),
					i && /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D("span", { children: "/" }), /* @__PURE__ */ D("span", { children: c })] })
				]
			}),
			/* @__PURE__ */ D("div", { children: /* @__PURE__ */ D(t, {
				variant: "secondary",
				size: "sm",
				onClick: o,
				children: "← Back to Pools"
			}) }),
			/* @__PURE__ */ D("div", {
				className: "flex border-b-2 border-border",
				children: be.map((e) => /* @__PURE__ */ D(xe, {
					label: e.label,
					active: i === e.key,
					onClick: () => s(e.key)
				}, e.key))
			}),
			/* @__PURE__ */ D("div", { children: e })
		]
	});
}
//#endregion
export { k as A, R as C, M as D, N as E, j as O, z as S, I as T, J as _, me as a, V as b, Q as c, oe as d, ae as f, Y as g, X as h, he as i, A as k, Z as l, te as m, ye as n, fe as o, ne as p, ge as r, de as s, Se as t, le as u, q as v, L as w, B as x, G as y };
