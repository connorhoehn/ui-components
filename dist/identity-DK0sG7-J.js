import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./useEventCallback-Cwx9QVSi.js";
import { n } from "./Button-uREUOWUk.js";
import { t as r } from "./Card-CbTNNNkk.js";
import { a as i, i as a, n as o, o as s, r as c, t as l } from "./Table-4OdCexrN.js";
import { n as u } from "./overlayStack-C0EBgmzL.js";
import { t as d } from "./PageSection-Ew6PhQVZ.js";
import { t as f } from "./Banner-CU6GChN-.js";
import { t as p } from "./Modal-CEiWhFnj.js";
import { t as m } from "./ConfirmDialog-DVS3MsJN.js";
import { t as h } from "./Input-_B49FdRY.js";
import { t as g } from "./Select-DjpQtNw3.js";
import { t as _ } from "./FormField-CQ27qxWt.js";
import { t as v } from "./DataTable-ByQQBfJy.js";
import { t as y } from "./EmptyState-ChFI22O0.js";
import { t as b } from "./Textarea-BwvE1HPn.js";
import { t as x } from "./Checkbox-Jycr-rlf.js";
import { t as S } from "./rovingFocus-Bj5Y6kwY.js";
import { useCallback as C, useEffect as w, useId as T, useMemo as E, useRef as D, useState as O } from "react";
import { Fragment as k, jsx as A, jsxs as j } from "react/jsx-runtime";
//#region src/components/identity/admin/AdminDashboardPage.tsx
function M({ stats: e, pools: t, onNavigate: i, loading: a }) {
	let o = E(() => [
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
	return a ? /* @__PURE__ */ j("div", {
		className: "flex flex-col gap-8",
		children: [/* @__PURE__ */ A("div", {
			className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4",
			children: [
				1,
				2,
				3
			].map((e) => /* @__PURE__ */ j(r, {
				padding: "md",
				children: [/* @__PURE__ */ A("div", { className: "h-5 w-12 rounded bg-surface-hover animate-pulse mb-2" }), /* @__PURE__ */ A("div", { className: "h-3 w-20 rounded bg-surface-hover animate-pulse" })]
			}, e))
		}), /* @__PURE__ */ A(r, { className: "h-[200px] animate-pulse" })]
	}) : /* @__PURE__ */ j(d, {
		title: "Dashboard",
		children: [
			/* @__PURE__ */ A("section", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4",
				children: o.map((e) => /* @__PURE__ */ j(r, {
					padding: "md",
					children: [/* @__PURE__ */ A("div", {
						className: "text-[2rem] font-bold text-info-fg mb-1",
						children: e.value
					}), /* @__PURE__ */ A("div", {
						className: "text-sm text-neutral",
						children: e.label
					})]
				}, e.label))
			}),
			/* @__PURE__ */ j("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ A("h2", {
					className: "text-lg font-semibold text-text-primary m-0",
					children: "User Pools"
				}), /* @__PURE__ */ A(r, { children: t.length === 0 ? /* @__PURE__ */ A(y, {
					title: "No pools created yet",
					actionLabel: "Create Pool",
					onAction: () => i("/identity/admin/pools/new")
				}) : t.map((e, r) => /* @__PURE__ */ j("div", {
					className: `flex items-center justify-between px-4 py-3 ${r < t.length - 1 ? "border-b border-border-subtle" : ""}`,
					children: [/* @__PURE__ */ j("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ A("span", {
							className: "font-medium text-text-primary",
							children: e.poolName
						}), /* @__PURE__ */ A("span", {
							className: "text-xs text-text-tertiary",
							children: e.createdAt
						})]
					}), /* @__PURE__ */ A(n, {
						variant: "ghost",
						size: "sm",
						onClick: () => i(`/identity/admin/pools/${e.poolId}`),
						children: "View"
					})]
				}, e.poolId)) })]
			}),
			/* @__PURE__ */ j("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ A("h2", {
					className: "text-lg font-semibold text-text-primary m-0",
					children: "Quick Actions"
				}), /* @__PURE__ */ j("div", {
					className: "flex flex-wrap gap-3",
					children: [
						/* @__PURE__ */ A(n, {
							variant: "secondary",
							size: "lg",
							onClick: () => i("/identity/admin/pools/new"),
							children: "Create Pool"
						}),
						/* @__PURE__ */ A(n, {
							variant: "secondary",
							size: "lg",
							onClick: () => i("/identity/admin/applications/new"),
							children: "Create Application"
						}),
						/* @__PURE__ */ A(n, {
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
function N({ columns: e, data: t, keyField: n, onRowClick: i, actions: a, emptyMessage: o = "No records found.", emptyIcon: s = "📋", loading: c = !1 }) {
	let l = E(() => e.map((e) => ({
		key: e.key,
		header: e.header,
		render: e.render ? (t) => e.render(t) : void 0,
		sortable: e.sortable,
		width: e.width,
		align: e.align
	})), [e]), u = Array.isArray(t) ? t : [];
	return !c && u.length === 0 ? /* @__PURE__ */ j(r, {
		className: "flex flex-col items-center justify-center min-h-[220px] p-8",
		children: [/* @__PURE__ */ A("span", {
			className: "text-[42px] mb-3",
			children: s
		}), /* @__PURE__ */ A("p", {
			className: "text-sm font-medium text-neutral text-center max-w-[280px] m-0",
			children: o
		})]
	}) : /* @__PURE__ */ A(r, { children: /* @__PURE__ */ A(v, {
		data: u,
		columns: l,
		keyField: (e) => String(e[n]),
		onRowClick: i,
		rowActions: a,
		loading: c,
		frameless: !0
	}) });
}
//#endregion
//#region src/components/identity/admin/PoolListPage.tsx
function P({ pools: e, onCreatePool: t, onEditPool: r, onDeletePool: i, onViewPool: a, loading: o }) {
	let [s, c] = O(null), [l, u] = O(!1), [p, h] = O(null), g = C(async (e) => {
		u(!0), h(null);
		try {
			await i(e), c(null);
		} catch (e) {
			h(e instanceof Error ? e.message : "Failed to delete pool.");
		} finally {
			u(!1);
		}
	}, [i]), _ = C(() => {
		c(null), h(null);
	}, []), v = E(() => [
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
	], []), y = C((e) => /* @__PURE__ */ j(k, { children: [
		/* @__PURE__ */ A(n, {
			variant: "ghost",
			size: "sm",
			onClick: () => a(e.poolId),
			children: "View"
		}),
		/* @__PURE__ */ A(n, {
			variant: "ghost",
			size: "sm",
			onClick: () => r(e.poolId),
			children: "Edit"
		}),
		/* @__PURE__ */ A(n, {
			variant: "danger",
			size: "sm",
			onClick: () => {
				c(e.poolId), h(null);
			},
			children: "Delete"
		})
	] }), [r, a]);
	return /* @__PURE__ */ j(d, {
		title: "User Pools",
		actions: /* @__PURE__ */ A(n, {
			variant: "primary",
			size: "lg",
			onClick: t,
			children: "Create Pool"
		}),
		children: [/* @__PURE__ */ A(N, {
			columns: v,
			data: e,
			keyField: "poolId",
			actions: y,
			loading: o,
			emptyMessage: "No user pools found. Create one to get started.",
			emptyIcon: "🏊"
		}), /* @__PURE__ */ A(m, {
			open: !!s,
			onConfirm: () => {
				s && g(s);
			},
			onCancel: _,
			title: "Delete Pool",
			body: "This action cannot be undone. All users in this pool will be affected.",
			tone: "destructive",
			confirmLabel: "Delete",
			confirmDisabled: l,
			children: p && /* @__PURE__ */ A(f, {
				variant: "error",
				children: p
			})
		})]
	});
}
//#endregion
//#region src/components/identity/shared/FormField.tsx
function F({ label: e, name: t, type: n = "text", value: r, onChange: i, error: a, required: o, placeholder: s, options: c, helpText: l, disabled: u }) {
	let d = T(), f = C((e) => {
		if (n === "number") {
			let t = e.target.value;
			if (t.trim() === "") return;
			let n = Number(t);
			if (Number.isNaN(n)) return;
			i(n);
		} else i(e.target.value);
	}, [i, n]);
	if (n === "checkbox") {
		let n = a || l ? `${d}-desc` : void 0;
		return /* @__PURE__ */ j("div", {
			className: "mb-4",
			children: [
				/* @__PURE__ */ j("label", {
					className: "flex items-center gap-2 cursor-pointer",
					children: [/* @__PURE__ */ A(x, {
						name: t,
						checked: !!r,
						onChange: (e) => i(e),
						disabled: u,
						"aria-describedby": n
					}), /* @__PURE__ */ j("span", {
						className: "text-sm text-text-primary",
						children: [e, o && /* @__PURE__ */ A("span", {
							"aria-hidden": "true",
							className: "text-danger-fg",
							children: " *"
						})]
					})]
				}),
				a && /* @__PURE__ */ A("p", {
					id: n,
					role: "alert",
					className: "mt-1 text-sm text-danger-fg",
					children: a
				}),
				l && !a && /* @__PURE__ */ A("p", {
					id: n,
					className: "mt-1 text-sm text-text-tertiary",
					children: l
				})
			]
		});
	}
	return /* @__PURE__ */ A(_, {
		label: e,
		required: o,
		error: a,
		hint: l,
		className: "mb-4",
		children: ({ labelId: e, ...i }) => n === "textarea" ? /* @__PURE__ */ A(b, {
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
		}) : n === "select" ? /* @__PURE__ */ A(g, {
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
		}) : /* @__PURE__ */ A(h, {
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
function I({ pool: e, isEdit: t, onSubmit: i, onCancel: a, error: o }) {
	let [s, c] = O(e?.poolName ?? ""), [l, u] = O(e?.settings?.mfaConfiguration ?? "OFF"), [p, m] = O(e?.settings?.passwordPolicy?.minLength ?? 8), [g, _] = O(e?.settings?.passwordPolicy?.requireUppercase ?? !0), [v, y] = O(e?.settings?.passwordPolicy?.requireLowercase ?? !0), [b, x] = O(e?.settings?.passwordPolicy?.requireNumbers ?? !0), [S, w] = O(e?.settings?.passwordPolicy?.requireSymbols ?? !1), [T, E] = O(Object.entries(e?.customAttributes ?? {}).map(([e, t]) => ({
		key: e,
		value: t
	}))), [D, k] = O(!1), M = C(() => {
		E((e) => [...e, {
			key: "",
			value: ""
		}]);
	}, []), N = C((e) => {
		E((t) => t.filter((t, n) => n !== e));
	}, []), P = C((e, t, n) => {
		E((r) => r.map((r, i) => i === e ? {
			...r,
			[t]: n
		} : r));
	}, []), I = C(async (e) => {
		e.preventDefault(), k(!0);
		try {
			let e = {};
			for (let { key: t, value: n } of T) t.trim() && (e[t.trim()] = n);
			await i({
				poolName: s,
				customAttributes: e,
				settings: {
					mfaConfiguration: l,
					passwordPolicy: {
						minLength: p,
						requireUppercase: g,
						requireLowercase: v,
						requireNumbers: b,
						requireSymbols: S
					}
				}
			});
		} finally {
			k(!1);
		}
	}, [
		s,
		l,
		p,
		g,
		v,
		b,
		S,
		T,
		i
	]);
	return /* @__PURE__ */ j(d, {
		title: t ? "Edit Pool" : "Create Pool",
		className: "max-w-[640px]",
		children: [o && /* @__PURE__ */ A(f, {
			variant: "error",
			children: o
		}), /* @__PURE__ */ A(r, {
			padding: "md",
			children: /* @__PURE__ */ j("form", {
				onSubmit: I,
				children: [
					/* @__PURE__ */ A(F, {
						label: "Pool Name",
						name: "poolName",
						value: s,
						onChange: (e) => c(String(e)),
						required: !0,
						placeholder: "my-user-pool"
					}),
					/* @__PURE__ */ j("section", {
						className: "mb-6",
						children: [/* @__PURE__ */ A("h3", {
							className: "text-base font-semibold text-text-primary mb-2",
							children: "MFA Configuration"
						}), /* @__PURE__ */ A(F, {
							label: "MFA Mode",
							name: "mfaConfig",
							type: "select",
							value: l,
							onChange: (e) => u(String(e)),
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
					/* @__PURE__ */ j("section", {
						className: "mb-6",
						children: [
							/* @__PURE__ */ A("h3", {
								className: "text-base font-semibold text-text-primary mb-2",
								children: "Password Policy"
							}),
							/* @__PURE__ */ A(F, {
								label: "Minimum Length",
								name: "minLength",
								type: "number",
								value: p,
								onChange: (e) => m(Number(e))
							}),
							/* @__PURE__ */ A(F, {
								label: "Require Uppercase",
								name: "requireUppercase",
								type: "checkbox",
								value: g,
								onChange: (e) => _(!!e)
							}),
							/* @__PURE__ */ A(F, {
								label: "Require Lowercase",
								name: "requireLowercase",
								type: "checkbox",
								value: v,
								onChange: (e) => y(!!e)
							}),
							/* @__PURE__ */ A(F, {
								label: "Require Numbers",
								name: "requireNumbers",
								type: "checkbox",
								value: b,
								onChange: (e) => x(!!e)
							}),
							/* @__PURE__ */ A(F, {
								label: "Require Symbols",
								name: "requireSymbols",
								type: "checkbox",
								value: S,
								onChange: (e) => w(!!e)
							})
						]
					}),
					/* @__PURE__ */ j("section", {
						className: "mb-6",
						children: [
							/* @__PURE__ */ A("h3", {
								className: "text-base font-semibold text-text-primary mb-2",
								children: "Custom Attributes"
							}),
							T.map((e, t) => /* @__PURE__ */ j("div", {
								className: "flex gap-2 items-center mb-2",
								children: [
									/* @__PURE__ */ A(h, {
										"aria-label": `Attribute ${t + 1} name`,
										className: "flex-1",
										placeholder: "Attribute name",
										value: e.key,
										onChange: (e) => P(t, "key", e.target.value)
									}),
									/* @__PURE__ */ A(h, {
										"aria-label": `Attribute ${t + 1} type`,
										className: "flex-1",
										placeholder: "Type (string, number, etc.)",
										value: e.value,
										onChange: (e) => P(t, "value", e.target.value)
									}),
									/* @__PURE__ */ A(n, {
										variant: "danger",
										size: "sm",
										"aria-label": `Remove attribute ${t + 1}`,
										onClick: () => N(t),
										children: "Remove"
									})
								]
							}, t)),
							/* @__PURE__ */ A(n, {
								variant: "ghost",
								size: "sm",
								onClick: M,
								children: "+ Add Attribute"
							})
						]
					}),
					/* @__PURE__ */ j("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ A(n, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: D,
							children: D ? "Saving..." : t ? "Update Pool" : "Create Pool"
						}), /* @__PURE__ */ A(n, {
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
var L = {
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
}, R = {
	success: "success",
	warning: "warning",
	danger: "danger",
	info: "info",
	neutral: "neutral"
};
function z({ status: e, variant: t }) {
	let n = t ? R[t] || "neutral" : L[e] || "neutral";
	return /* @__PURE__ */ A(u, {
		tone: n,
		size: "sm",
		children: e
	});
}
//#endregion
//#region src/components/identity/admin/UserListPage.tsx
function B({ users: e, poolName: t, onCreateUser: r, onEditUser: i, onDeleteUser: a, loading: o }) {
	let [s, c] = O(null), [l, u] = O(!1), [p, h] = O(null), g = C(async (e) => {
		u(!0), h(null);
		try {
			await a(e), c(null);
		} catch (e) {
			h(e instanceof Error ? e.message : "Failed to delete user.");
		} finally {
			u(!1);
		}
	}, [a]), _ = C(() => {
		c(null), h(null);
	}, []), v = E(() => [
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
			render: (e) => /* @__PURE__ */ A(z, { status: e.status })
		},
		{
			key: "createdAt",
			header: "Created",
			sortable: !0
		}
	], []), y = C((e) => /* @__PURE__ */ j(k, { children: [/* @__PURE__ */ A(n, {
		variant: "ghost",
		size: "sm",
		onClick: () => i(e.userId),
		children: "Edit"
	}), /* @__PURE__ */ A(n, {
		variant: "danger",
		size: "sm",
		onClick: () => {
			c(e.userId), h(null);
		},
		children: "Delete"
	})] }), [i]);
	return /* @__PURE__ */ j(d, {
		title: `Users — ${t}`,
		actions: /* @__PURE__ */ A(n, {
			variant: "primary",
			size: "lg",
			onClick: r,
			children: "Create User"
		}),
		children: [/* @__PURE__ */ A(N, {
			columns: v,
			data: e,
			keyField: "userId",
			actions: y,
			loading: o,
			emptyMessage: "No users in this pool yet.",
			emptyIcon: "👤"
		}), /* @__PURE__ */ A(m, {
			open: !!s,
			onConfirm: () => {
				s && g(s);
			},
			onCancel: _,
			title: "Delete User",
			body: "This action cannot be undone. The user will be permanently removed.",
			tone: "destructive",
			confirmLabel: "Delete",
			confirmDisabled: l,
			children: p && /* @__PURE__ */ A(f, {
				variant: "error",
				children: p
			})
		})]
	});
}
//#endregion
//#region src/components/identity/admin/UserFormPage.tsx
function V({ user: e, isEdit: t, customAttributeDefinitions: i, onSubmit: a, onCancel: o, error: s }) {
	let [c, l] = O(e?.email ?? ""), [u, p] = O(""), [m, h] = O(e?.givenName ?? ""), [g, _] = O(e?.familyName ?? ""), [v, y] = O(e?.nickname ?? ""), [b, x] = O(e?.picture ?? ""), [S, w] = O(e?.website ?? ""), [T, E] = O(Object.fromEntries(Object.entries(e?.customAttributes ?? {}).map(([e, t]) => [e, String(t)]))), [D, k] = O(!1), M = C((e, t) => {
		E((n) => ({
			...n,
			[e]: t
		}));
	}, []), N = C(async (e) => {
		e.preventDefault(), k(!0);
		try {
			await a({
				email: c,
				...!t && u ? { password: u } : {},
				givenName: m || void 0,
				familyName: g || void 0,
				nickname: v || void 0,
				picture: b || void 0,
				website: S || void 0,
				customAttributes: T
			});
		} finally {
			k(!1);
		}
	}, [
		c,
		u,
		m,
		g,
		v,
		b,
		S,
		T,
		t,
		a
	]);
	return /* @__PURE__ */ j(d, {
		title: t ? "Edit User" : "Create User",
		className: "max-w-[640px]",
		children: [s && /* @__PURE__ */ A(f, {
			variant: "error",
			children: s
		}), /* @__PURE__ */ A(r, {
			padding: "md",
			children: /* @__PURE__ */ j("form", {
				onSubmit: N,
				children: [
					/* @__PURE__ */ A(F, {
						label: "Email",
						name: "email",
						type: "email",
						value: c,
						onChange: (e) => l(String(e)),
						required: !0,
						placeholder: "user@example.com"
					}),
					!t && /* @__PURE__ */ A(F, {
						label: "Password",
						name: "password",
						type: "password",
						value: u,
						onChange: (e) => p(String(e)),
						required: !0,
						placeholder: "Temporary password",
						helpText: "User will be prompted to change on first login."
					}),
					/* @__PURE__ */ A(F, {
						label: "Given Name",
						name: "givenName",
						value: m,
						onChange: (e) => h(String(e)),
						placeholder: "John"
					}),
					/* @__PURE__ */ A(F, {
						label: "Family Name",
						name: "familyName",
						value: g,
						onChange: (e) => _(String(e)),
						placeholder: "Doe"
					}),
					/* @__PURE__ */ A(F, {
						label: "Nickname",
						name: "nickname",
						value: v,
						onChange: (e) => y(String(e)),
						placeholder: "johnny"
					}),
					/* @__PURE__ */ A(F, {
						label: "Picture URL",
						name: "picture",
						value: b,
						onChange: (e) => x(String(e)),
						placeholder: "https://..."
					}),
					/* @__PURE__ */ A(F, {
						label: "Website",
						name: "website",
						value: S,
						onChange: (e) => w(String(e)),
						placeholder: "https://..."
					}),
					i && Object.keys(i).length > 0 && /* @__PURE__ */ j("section", { children: [/* @__PURE__ */ A("h3", {
						className: "text-base font-semibold text-text-primary mt-6 mb-2",
						children: "Custom Attributes"
					}), Object.entries(i).map(([e, t]) => /* @__PURE__ */ A(F, {
						label: e,
						name: `custom_${e}`,
						type: t === "number" ? "number" : "text",
						value: T[e] ?? "",
						onChange: (t) => M(e, String(t)),
						helpText: `Type: ${t}`
					}, e))] }),
					/* @__PURE__ */ j("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ A(n, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: D,
							children: D ? "Saving..." : t ? "Update User" : "Create User"
						}), /* @__PURE__ */ A(n, {
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
function H({ groups: e, poolName: t, onCreateGroup: r, onEditGroup: i, onDeleteGroup: a, loading: o }) {
	let [s, c] = O(null), [l, p] = O(!1), [h, g] = O(null), _ = C(async (e) => {
		p(!0), g(null);
		try {
			await a(e), c(null);
		} catch (e) {
			g(e instanceof Error ? e.message : "Failed to delete group.");
		} finally {
			p(!1);
		}
	}, [a]), v = C(() => {
		c(null), g(null);
	}, []), y = E(() => [
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
			render: (e) => {
				let t = Array.isArray(e.permissions) ? e.permissions : [];
				return /* @__PURE__ */ A("div", {
					className: "flex flex-wrap gap-1",
					children: t.length === 0 ? /* @__PURE__ */ A("span", {
						className: "text-text-tertiary text-xs",
						children: "None"
					}) : t.map((e) => /* @__PURE__ */ A(u, {
						tone: "info",
						size: "xs",
						children: e
					}, e))
				});
			}
		}
	], []), b = C((e) => /* @__PURE__ */ j(k, { children: [/* @__PURE__ */ A(n, {
		variant: "ghost",
		size: "sm",
		onClick: () => i(e.groupId),
		children: "Edit"
	}), /* @__PURE__ */ A(n, {
		variant: "danger",
		size: "sm",
		onClick: () => {
			c(e.groupId), g(null);
		},
		children: "Delete"
	})] }), [i]);
	return /* @__PURE__ */ j(d, {
		title: `Groups — ${t}`,
		actions: /* @__PURE__ */ A(n, {
			variant: "primary",
			size: "lg",
			onClick: r,
			children: "Create Group"
		}),
		children: [/* @__PURE__ */ A(N, {
			columns: y,
			data: e,
			keyField: "groupId",
			actions: b,
			loading: o,
			emptyMessage: "No groups in this pool yet.",
			emptyIcon: "👥"
		}), /* @__PURE__ */ A(m, {
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
			children: h && /* @__PURE__ */ A(f, {
				variant: "error",
				children: h
			})
		})]
	});
}
//#endregion
//#region src/components/identity/admin/GroupFormPage.tsx
function U({ group: e, isEdit: t, members: i, availableUsers: a, onSubmit: o, onAddMember: s, onRemoveMember: c, onCancel: l, error: u }) {
	let [p, m] = O(e?.groupName ?? ""), [_, v] = O(e?.description ?? ""), [y, b] = O(e?.permissions ?? []), [x, S] = O(""), [w, E] = O(""), [D, k] = O(!1), M = T(), N = C((e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			let t = x.trim();
			t && !y.includes(t) && b((e) => [...e, t]), S("");
		}
	}, [x, y]), P = C((e) => {
		b((t) => t.filter((t) => t !== e));
	}, []), I = C(async () => {
		w && s && (await s(w), E(""));
	}, [w, s]), L = C(async (e) => {
		e.preventDefault(), k(!0);
		try {
			await o({
				groupName: p,
				description: _,
				permissions: y
			});
		} finally {
			k(!1);
		}
	}, [
		p,
		_,
		y,
		o
	]);
	return /* @__PURE__ */ j(d, {
		title: t ? "Edit Group" : "Create Group",
		className: "max-w-[640px]",
		children: [u && /* @__PURE__ */ A(f, {
			variant: "error",
			children: u
		}), /* @__PURE__ */ A(r, {
			padding: "md",
			children: /* @__PURE__ */ j("form", {
				onSubmit: L,
				children: [
					/* @__PURE__ */ A(F, {
						label: "Group Name",
						name: "groupName",
						value: p,
						onChange: (e) => m(String(e)),
						required: !0,
						placeholder: "admins"
					}),
					/* @__PURE__ */ A(F, {
						label: "Description",
						name: "description",
						type: "textarea",
						value: _,
						onChange: (e) => v(String(e)),
						placeholder: "Describe this group's purpose..."
					}),
					/* @__PURE__ */ j("section", { children: [
						/* @__PURE__ */ A("h3", {
							id: `${M}-permissions`,
							className: "text-base font-semibold text-text-primary mt-6 mb-2",
							children: "Permissions"
						}),
						/* @__PURE__ */ A("div", {
							className: "flex flex-wrap gap-1.5 mb-2",
							children: y.map((e) => /* @__PURE__ */ j("span", {
								className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-info text-white text-sm font-medium",
								children: [e, /* @__PURE__ */ A(n, {
									variant: "ghost",
									size: "sm",
									className: "p-0 text-white text-[14px] leading-none min-w-0 min-h-0",
									onClick: () => P(e),
									"aria-label": `Remove permission ${e}`,
									children: "x"
								})]
							}, e))
						}),
						/* @__PURE__ */ A(h, {
							"aria-labelledby": `${M}-permissions`,
							placeholder: "Type a permission and press Enter",
							value: x,
							onChange: (e) => S(e.target.value),
							onKeyDown: N
						})
					] }),
					t && i && /* @__PURE__ */ j("section", { children: [
						/* @__PURE__ */ A("h3", {
							id: `${M}-members`,
							className: "text-base font-semibold text-text-primary mt-6 mb-2",
							children: "Members"
						}),
						i.length === 0 ? /* @__PURE__ */ A("p", {
							className: "text-text-tertiary text-sm",
							children: "No members yet."
						}) : i.map((e) => /* @__PURE__ */ j("div", {
							className: "flex items-center justify-between py-1.5 border-b border-border",
							children: [/* @__PURE__ */ A("span", {
								className: "text-base",
								children: e.email
							}), c && /* @__PURE__ */ A(n, {
								variant: "danger",
								size: "sm",
								onClick: () => c(e.userId),
								children: "Remove"
							})]
						}, e.userId)),
						a && a.length > 0 && s && /* @__PURE__ */ j("div", {
							className: "flex gap-2 mt-2",
							children: [/* @__PURE__ */ A(g, {
								"aria-label": "Add member",
								className: "flex-1",
								value: w,
								onChange: (e) => E(e.target.value),
								placeholder: "Select user to add...",
								options: a.map((e) => ({
									value: e.userId,
									label: e.email
								}))
							}), /* @__PURE__ */ A(n, {
								variant: "ghost",
								size: "sm",
								onClick: I,
								disabled: !w,
								children: "Add"
							})]
						})
					] }),
					/* @__PURE__ */ j("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ A(n, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: D,
							children: D ? "Saving..." : t ? "Update Group" : "Create Group"
						}), /* @__PURE__ */ A(n, {
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
function W({ applications: e, onCreateApp: t, onCreateAppWithPool: r, onEditApp: i, onDeleteApp: a, loading: o }) {
	let [s, c] = O(null), [l, p] = O(!1), [h, g] = O(null), _ = C(async (e) => {
		p(!0), g(null);
		try {
			await a(e), c(null);
		} catch (e) {
			g(e instanceof Error ? e.message : "Failed to delete application.");
		} finally {
			p(!1);
		}
	}, [a]), v = C(() => {
		c(null), g(null);
	}, []), y = E(() => [
		{
			key: "clientName",
			header: "Name",
			sortable: !0
		},
		{
			key: "clientId",
			header: "Client ID",
			render: (e) => /* @__PURE__ */ A("span", {
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
			render: (e) => {
				let t = Array.isArray(e.redirectUris) ? e.redirectUris : [];
				return /* @__PURE__ */ j("div", {
					className: "flex flex-wrap gap-1",
					children: [
						t.length === 0 && /* @__PURE__ */ A("span", {
							className: "text-text-tertiary text-xs",
							children: "None"
						}),
						t.slice(0, 2).map((e) => /* @__PURE__ */ A(u, {
							tone: "neutral",
							size: "xs",
							children: e
						}, e)),
						t.length > 2 && /* @__PURE__ */ j(u, {
							tone: "neutral",
							size: "xs",
							children: [
								"+",
								t.length - 2,
								" more"
							]
						})
					]
				});
			}
		}
	], []), b = C((e) => /* @__PURE__ */ j(k, { children: [/* @__PURE__ */ A(n, {
		variant: "ghost",
		size: "sm",
		onClick: () => i(e.clientId),
		children: "Edit"
	}), /* @__PURE__ */ A(n, {
		variant: "danger",
		size: "sm",
		onClick: () => {
			c(e.clientId), g(null);
		},
		children: "Delete"
	})] }), [i]);
	return /* @__PURE__ */ j(d, {
		title: "Applications",
		actions: /* @__PURE__ */ j(k, { children: [/* @__PURE__ */ A(n, {
			variant: "primary",
			size: "lg",
			onClick: t,
			children: "New Application"
		}), /* @__PURE__ */ A(n, {
			variant: "secondary",
			size: "lg",
			onClick: r,
			children: "New App + Pool"
		})] }),
		children: [/* @__PURE__ */ A(N, {
			columns: y,
			data: e,
			keyField: "clientId",
			actions: b,
			loading: o,
			emptyMessage: "No applications registered yet.",
			emptyIcon: "🔐"
		}), /* @__PURE__ */ A(m, {
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
			children: h && /* @__PURE__ */ A(f, {
				variant: "error",
				children: h
			})
		})]
	});
}
//#endregion
//#region src/components/identity/admin/ApplicationFormPage.tsx
function G({ label: e, values: t, onChange: r, placeholder: i }) {
	let a = T(), o = () => r([...t, ""]), s = (e) => r(t.filter((t, n) => n !== e)), c = (e, n) => r(t.map((t, r) => r === e ? n : t)), l = `${a}-label`;
	return /* @__PURE__ */ j("div", {
		className: "mb-4",
		children: [/* @__PURE__ */ A("label", {
			id: l,
			className: "block mb-1 text-sm font-semibold text-text-primary",
			children: e
		}), /* @__PURE__ */ j("div", {
			role: "group",
			"aria-labelledby": l,
			children: [t.map((t, r) => /* @__PURE__ */ j("div", {
				className: "flex gap-2 items-center mb-1.5",
				children: [/* @__PURE__ */ A(h, {
					"aria-label": `${e} ${r + 1}`,
					className: "flex-1",
					value: t,
					onChange: (e) => c(r, e.target.value),
					placeholder: i
				}), /* @__PURE__ */ A(n, {
					variant: "danger",
					size: "sm",
					"aria-label": `Remove ${e} ${r + 1}`,
					onClick: () => s(r),
					children: "Remove"
				})]
			}, r)), /* @__PURE__ */ A(n, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Add ${e}`,
				onClick: o,
				children: "+ Add"
			})]
		})]
	});
}
var K = [
	"authorization_code",
	"client_credentials",
	"refresh_token"
], q = [
	"code",
	"token",
	"id_token"
];
function ee({ application: e, isEdit: t, pools: i, onSubmit: a, onCancel: o, error: s }) {
	let [c, l] = O(e?.clientName ?? ""), [u, p] = O(e?.poolId ?? ""), [m, h] = O(e?.redirectUris ?? [""]), [g, _] = O(e?.postLogoutRedirectUris ?? []), [v, y] = O(e?.grantTypes ?? ["authorization_code"]), [b, S] = O(e?.responseTypes ?? ["code"]), [w, T] = O(e?.scope ?? "openid profile email"), [E, D] = O(!1), k = C((e) => {
		y((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}, []), M = C((e) => {
		S((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}, []), N = C(async (e) => {
		e.preventDefault(), D(!0);
		try {
			await a({
				clientName: c,
				poolId: u,
				redirectUris: m.filter((e) => e.trim()),
				postLogoutRedirectUris: g.filter((e) => e.trim()),
				grantTypes: v,
				responseTypes: b,
				scope: w
			});
		} finally {
			D(!1);
		}
	}, [
		c,
		u,
		m,
		g,
		v,
		b,
		w,
		a
	]);
	return /* @__PURE__ */ j(d, {
		title: t ? "Edit Application" : "New Application",
		className: "max-w-[640px]",
		children: [s && /* @__PURE__ */ A(f, {
			variant: "error",
			children: s
		}), /* @__PURE__ */ A(r, {
			padding: "md",
			children: /* @__PURE__ */ j("form", {
				onSubmit: N,
				children: [
					/* @__PURE__ */ A(F, {
						label: "Application Name",
						name: "clientName",
						value: c,
						onChange: (e) => l(String(e)),
						required: !0,
						placeholder: "My App"
					}),
					/* @__PURE__ */ A(F, {
						label: "User Pool",
						name: "poolId",
						type: "select",
						value: u,
						onChange: (e) => p(String(e)),
						required: !0,
						options: i.map((e) => ({
							value: e.poolId,
							label: e.poolName
						})),
						placeholder: "Select a pool..."
					}),
					/* @__PURE__ */ A(G, {
						label: "Redirect URIs",
						values: m,
						onChange: h,
						placeholder: "https://app.example.com/callback"
					}),
					/* @__PURE__ */ A(G, {
						label: "Post-Logout Redirect URIs",
						values: g,
						onChange: _,
						placeholder: "https://app.example.com/logout"
					}),
					/* @__PURE__ */ j("section", { children: [/* @__PURE__ */ A("h3", {
						className: "text-base font-semibold text-text-primary mt-6 mb-2",
						children: "Grant Types"
					}), /* @__PURE__ */ A("div", {
						className: "flex flex-col gap-2 mb-4",
						children: K.map((e) => /* @__PURE__ */ j("label", {
							className: "flex items-center gap-2 text-base text-text-primary cursor-pointer",
							children: [/* @__PURE__ */ A(x, {
								checked: v.includes(e),
								onChange: () => k(e)
							}), e]
						}, e))
					})] }),
					/* @__PURE__ */ j("section", { children: [/* @__PURE__ */ A("h3", {
						className: "text-base font-semibold text-text-primary mt-6 mb-2",
						children: "Response Types"
					}), /* @__PURE__ */ A("div", {
						className: "flex flex-col gap-2 mb-4",
						children: q.map((e) => /* @__PURE__ */ j("label", {
							className: "flex items-center gap-2 text-base text-text-primary cursor-pointer",
							children: [/* @__PURE__ */ A(x, {
								checked: b.includes(e),
								onChange: () => M(e)
							}), e]
						}, e))
					})] }),
					/* @__PURE__ */ A(F, {
						label: "Scope",
						name: "scope",
						value: w,
						onChange: (e) => T(String(e)),
						placeholder: "openid profile email",
						helpText: "Space-separated list of scopes."
					}),
					/* @__PURE__ */ j("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ A(n, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: E,
							children: E ? "Saving..." : t ? "Update Application" : "Create Application"
						}), /* @__PURE__ */ A(n, {
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
var J = [
	"authorization_code",
	"client_credentials",
	"refresh_token"
];
function Y({ onSubmit: e, onCancel: t, error: i }) {
	let [a, o] = O(""), [s, c] = O(""), [l, u] = O([""]), [p, m] = O(["authorization_code"]), [g, _] = O(!1), v = C((e) => {
		m((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}, []), y = C(() => {
		u((e) => [...e, ""]);
	}, []), b = C((e) => {
		u((t) => t.filter((t, n) => n !== e));
	}, []), S = C((e, t) => {
		u((n) => n.map((n, r) => r === e ? t : n));
	}, []), w = C(async (t) => {
		t.preventDefault(), _(!0);
		try {
			await e({
				poolName: a,
				clientName: s,
				redirectUris: l.filter((e) => e.trim()),
				grantTypes: p
			});
		} finally {
			_(!1);
		}
	}, [
		a,
		s,
		l,
		p,
		e
	]);
	return /* @__PURE__ */ j(d, {
		title: "New Application + Pool",
		description: "Create a user pool and register an application in one step.",
		className: "max-w-[640px]",
		children: [i && /* @__PURE__ */ A(f, {
			variant: "error",
			children: i
		}), /* @__PURE__ */ A(r, {
			padding: "md",
			children: /* @__PURE__ */ j("form", {
				onSubmit: w,
				children: [
					/* @__PURE__ */ A(F, {
						label: "Pool Name",
						name: "poolName",
						value: a,
						onChange: (e) => o(String(e)),
						required: !0,
						placeholder: "my-user-pool"
					}),
					/* @__PURE__ */ A(F, {
						label: "Application Name",
						name: "clientName",
						value: s,
						onChange: (e) => c(String(e)),
						required: !0,
						placeholder: "My App"
					}),
					/* @__PURE__ */ j("section", { children: [
						/* @__PURE__ */ A("h3", {
							className: "text-base font-semibold text-text-primary mt-6 mb-2",
							children: "Redirect URIs"
						}),
						l.map((e, t) => /* @__PURE__ */ j("div", {
							className: "flex gap-2 items-center mb-1.5",
							children: [/* @__PURE__ */ A(h, {
								"aria-label": `Redirect URI ${t + 1}`,
								className: "flex-1",
								value: e,
								onChange: (e) => S(t, e.target.value),
								placeholder: "https://app.example.com/callback"
							}), l.length > 1 && /* @__PURE__ */ A(n, {
								variant: "danger",
								size: "sm",
								"aria-label": `Remove redirect URI ${t + 1}`,
								onClick: () => b(t),
								children: "Remove"
							})]
						}, t)),
						/* @__PURE__ */ A(n, {
							variant: "ghost",
							size: "sm",
							onClick: y,
							children: "+ Add URI"
						})
					] }),
					/* @__PURE__ */ j("section", { children: [/* @__PURE__ */ A("h3", {
						className: "text-base font-semibold text-text-primary mt-6 mb-2",
						children: "Grant Types"
					}), /* @__PURE__ */ A("div", {
						className: "flex flex-col gap-2 mb-4",
						children: J.map((e) => /* @__PURE__ */ j("label", {
							className: "flex items-center gap-2 text-base text-text-primary cursor-pointer",
							children: [/* @__PURE__ */ A(x, {
								checked: p.includes(e),
								onChange: () => v(e)
							}), e]
						}, e))
					})] }),
					/* @__PURE__ */ j("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ A(n, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: g,
							children: g ? "Creating..." : "Create Pool + Application"
						}), /* @__PURE__ */ A(n, {
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
function X({ templates: e, onCreateTemplate: t, onEditTemplate: r, onDeleteTemplate: i, onTestSend: a, loading: o }) {
	let [s, c] = O(null), [l, u] = O(!1), [h, g] = O(null), [_, v] = O(null), [y, b] = O(""), [x, S] = O(!1), [w, T] = O(null), D = C(async (e) => {
		u(!0), g(null);
		try {
			await i(e), c(null);
		} catch (e) {
			g(e instanceof Error ? e.message : "Failed to delete template.");
		} finally {
			u(!1);
		}
	}, [i]), M = C(() => {
		c(null), g(null);
	}, []), P = C(async () => {
		if (!(!_ || !y.trim())) {
			S(!0), T(null);
			try {
				await a(_, y.trim()), v(null), b("");
			} catch (e) {
				T(e instanceof Error ? e.message : "Failed to send test email.");
			} finally {
				S(!1);
			}
		}
	}, [
		_,
		y,
		a
	]), I = E(() => [{
		key: "name",
		header: "Name",
		sortable: !0
	}, {
		key: "subject",
		header: "Subject"
	}], []), L = C((e) => /* @__PURE__ */ j(k, { children: [
		/* @__PURE__ */ A(n, {
			variant: "ghost",
			size: "sm",
			onClick: () => r(e.templateId),
			children: "Edit"
		}),
		/* @__PURE__ */ A(n, {
			variant: "ghost",
			size: "sm",
			onClick: () => {
				v(e.templateId), b(""), T(null);
			},
			children: "Test Send"
		}),
		/* @__PURE__ */ A(n, {
			variant: "danger",
			size: "sm",
			onClick: () => {
				c(e.templateId), g(null);
			},
			children: "Delete"
		})
	] }), [r]);
	return /* @__PURE__ */ j(d, {
		title: "Email Templates",
		actions: /* @__PURE__ */ A(n, {
			variant: "primary",
			size: "lg",
			onClick: t,
			children: "Create Template"
		}),
		children: [
			/* @__PURE__ */ A(N, {
				columns: I,
				data: e,
				keyField: "templateId",
				actions: L,
				loading: o,
				emptyMessage: "No email templates configured.",
				emptyIcon: "✉️"
			}),
			/* @__PURE__ */ j(p, {
				open: !!_,
				onClose: () => {
					v(null), T(null);
				},
				title: "Send Test Email",
				footer: /* @__PURE__ */ j(k, { children: [/* @__PURE__ */ A(n, {
					variant: "ghost",
					size: "md",
					onClick: () => {
						v(null), T(null);
					},
					children: "Cancel"
				}), /* @__PURE__ */ A(n, {
					variant: "primary",
					size: "md",
					onClick: () => {
						P();
					},
					disabled: x || !y.trim(),
					children: x ? "Sending..." : "Send"
				})] }),
				children: [w && /* @__PURE__ */ A("div", {
					className: "mb-3",
					children: /* @__PURE__ */ A(f, {
						variant: "error",
						children: w
					})
				}), /* @__PURE__ */ A(F, {
					label: "Recipient Email",
					name: "test-email",
					type: "email",
					value: y,
					onChange: (e) => b(String(e)),
					placeholder: "recipient@example.com"
				})]
			}),
			/* @__PURE__ */ A(m, {
				open: !!s,
				onConfirm: () => {
					s && D(s);
				},
				onCancel: M,
				title: "Delete Template",
				body: "This action cannot be undone. The template will be permanently removed.",
				tone: "destructive",
				confirmLabel: "Delete",
				confirmDisabled: l,
				children: h && /* @__PURE__ */ A(f, {
					variant: "error",
					children: h
				})
			})
		]
	});
}
//#endregion
//#region src/components/identity/admin/EmailTemplateFormPage.tsx
function te({ template: e, isEdit: t, onSubmit: i, onCancel: a, error: o }) {
	let [s, c] = O(e?.name ?? ""), [l, u] = O(e?.subject ?? ""), [p, m] = O(e?.htmlBody ?? ""), [g, _] = O(e?.textBody ?? ""), [v, y] = O(e?.variables ?? []), [x, S] = O(""), [w, E] = O(!1), D = T(), [k, M] = O(!1), N = C((e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			let t = x.trim();
			t && !v.includes(t) && y((e) => [...e, t]), S("");
		}
	}, [x, v]), P = C((e) => {
		y((t) => t.filter((t) => t !== e));
	}, []), I = C(async (e) => {
		e.preventDefault(), M(!0);
		try {
			await i({
				name: s,
				subject: l,
				htmlBody: p,
				textBody: g,
				variables: v
			});
		} finally {
			M(!1);
		}
	}, [
		s,
		l,
		p,
		g,
		v,
		i
	]);
	return /* @__PURE__ */ j(d, {
		title: t ? "Edit Email Template" : "Create Email Template",
		className: "max-w-[800px]",
		children: [o && /* @__PURE__ */ A(f, {
			variant: "error",
			children: o
		}), /* @__PURE__ */ A(r, {
			padding: "md",
			children: /* @__PURE__ */ j("form", {
				onSubmit: I,
				children: [
					/* @__PURE__ */ A(F, {
						label: "Template Name",
						name: "name",
						value: s,
						onChange: (e) => c(String(e)),
						required: !0,
						placeholder: "welcome-email"
					}),
					/* @__PURE__ */ A(F, {
						label: "Subject",
						name: "subject",
						value: l,
						onChange: (e) => u(String(e)),
						required: !0,
						placeholder: "Welcome to {{appName}}"
					}),
					/* @__PURE__ */ j("div", {
						className: "mb-4",
						children: [
							/* @__PURE__ */ j("div", {
								className: "flex items-center justify-between mb-1",
								children: [/* @__PURE__ */ A("label", {
									htmlFor: `${D}-html-body`,
									className: "text-sm font-semibold text-text-primary",
									children: "HTML Body"
								}), /* @__PURE__ */ A(n, {
									variant: "ghost",
									size: "sm",
									onClick: () => E((e) => !e),
									children: w ? "Hide Preview" : "Show Preview"
								})]
							}),
							/* @__PURE__ */ A(b, {
								id: `${D}-html-body`,
								value: p,
								onChange: (e) => m(e.target.value),
								placeholder: "<html><body>...</body></html>",
								rows: 10,
								className: "resize-y font-mono"
							}),
							w && /* @__PURE__ */ A("div", {
								className: "border border-border rounded-sm p-4 bg-surface min-h-[200px] mt-2",
								dangerouslySetInnerHTML: { __html: p }
							})
						]
					}),
					/* @__PURE__ */ A(F, {
						label: "Text Body",
						name: "textBody",
						type: "textarea",
						value: g,
						onChange: (e) => _(String(e)),
						placeholder: "Plain text version of the email..."
					}),
					/* @__PURE__ */ j("section", { children: [
						/* @__PURE__ */ A("h3", {
							id: `${D}-variables`,
							className: "text-base font-semibold text-text-primary mt-6 mb-2",
							children: "Variables"
						}),
						/* @__PURE__ */ A("div", {
							className: "flex flex-wrap gap-1.5 mb-2",
							children: v.map((e) => /* @__PURE__ */ j("span", {
								className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-info text-white text-sm font-medium",
								children: ["{{" + e + "}}", /* @__PURE__ */ A(n, {
									variant: "ghost",
									size: "sm",
									className: "p-0 text-white text-[14px] leading-none min-w-0 min-h-0",
									onClick: () => P(e),
									"aria-label": `Remove variable ${e}`,
									children: "x"
								})]
							}, e))
						}),
						/* @__PURE__ */ A(h, {
							"aria-labelledby": `${D}-variables`,
							placeholder: "Type variable name and press Enter",
							value: x,
							onChange: (e) => S(e.target.value),
							onKeyDown: N
						})
					] }),
					/* @__PURE__ */ j("div", {
						className: "flex gap-3 mt-6 pt-5 border-t border-border-subtle",
						children: [/* @__PURE__ */ A(n, {
							type: "submit",
							variant: "primary",
							size: "lg",
							disabled: k,
							children: k ? "Saving..." : t ? "Update Template" : "Create Template"
						}), /* @__PURE__ */ A(n, {
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
//#region src/components/identity/shared/FilterField.tsx
function Z({ label: t, hint: n, children: r, layout: i = "stacked", className: a }) {
	return /* @__PURE__ */ A(_, {
		label: t,
		hint: n,
		layout: i,
		className: a ?? (i === "stacked" ? "gap-1.5" : void 0),
		labelClassName: e("text-xs font-semibold text-neutral uppercase tracking-wide", i === "inline" && "min-w-0"),
		children: ({ labelId: e, ...t }) => r(t)
	});
}
//#endregion
//#region src/components/identity/admin/MfaManagementPage.tsx
function ne({ metrics: e, users: t, pools: i, onRefresh: a, loading: o }) {
	let [s, c] = O(""), l = E(() => (t ?? []).some((e) => e.poolId !== void 0), [t]), u = E(() => {
		let e = t ?? [];
		return !s || !l ? e : e.filter((e) => e.poolId === s);
	}, [
		t,
		s,
		l
	]), f = E(() => [
		{
			key: "email",
			header: "Email",
			sortable: !0
		},
		{
			key: "mfaEnabled",
			header: "MFA Status",
			width: "140px",
			render: (e) => /* @__PURE__ */ A(z, {
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
	return o ? /* @__PURE__ */ j(d, {
		title: "MFA Management",
		children: [/* @__PURE__ */ A("div", {
			className: "grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4",
			children: [
				1,
				2,
				3,
				4
			].map((e) => /* @__PURE__ */ j(r, {
				padding: "md",
				children: [/* @__PURE__ */ A("div", { className: "h-5 w-12 rounded bg-surface-hover animate-pulse mb-2" }), /* @__PURE__ */ A("div", { className: "h-3 w-20 rounded bg-surface-hover animate-pulse" })]
			}, e))
		}), /* @__PURE__ */ A(r, { className: "h-[200px] animate-pulse" })]
	}) : /* @__PURE__ */ j(d, {
		title: "MFA Management",
		actions: /* @__PURE__ */ A(n, {
			variant: "ghost",
			size: "lg",
			onClick: a,
			children: "Refresh"
		}),
		children: [
			e && /* @__PURE__ */ j("section", {
				className: "grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4",
				children: [
					/* @__PURE__ */ j(r, {
						padding: "md",
						children: [/* @__PURE__ */ A("div", {
							className: "text-[1.75rem] font-bold text-info-fg mb-1",
							children: e.totalUsers
						}), /* @__PURE__ */ A("div", {
							className: "text-sm text-neutral",
							children: "Total Users"
						})]
					}),
					/* @__PURE__ */ j(r, {
						padding: "md",
						children: [/* @__PURE__ */ A("div", {
							className: "text-[1.75rem] font-bold text-success-fg mb-1",
							children: e.mfaEnabled
						}), /* @__PURE__ */ A("div", {
							className: "text-sm text-neutral",
							children: "MFA Enabled"
						})]
					}),
					/* @__PURE__ */ j(r, {
						padding: "md",
						children: [/* @__PURE__ */ A("div", {
							className: "text-[1.75rem] font-bold text-warning-fg mb-1",
							children: e.mfaDisabled
						}), /* @__PURE__ */ A("div", {
							className: "text-sm text-neutral",
							children: "MFA Disabled"
						})]
					}),
					/* @__PURE__ */ j(r, {
						padding: "md",
						children: [/* @__PURE__ */ j("div", {
							className: "text-[1.75rem] font-bold text-info-fg mb-1",
							children: [e.adoptionRate, "%"]
						}), /* @__PURE__ */ A("div", {
							className: "text-sm text-neutral",
							children: "Adoption Rate"
						})]
					})
				]
			}),
			i && i.length > 0 && l && /* @__PURE__ */ A(Z, {
				label: "Filter by pool",
				layout: "inline",
				children: (e) => /* @__PURE__ */ A(g, {
					...e,
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
				})
			}),
			/* @__PURE__ */ A(N, {
				columns: f,
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
var re = [
	"",
	"user",
	"pool",
	"client",
	"group",
	"template"
];
function ie({ records: e, onQuery: t, onViewEntity: i, onReplay: a, loading: o, totalRecords: s }) {
	let [c, l] = O(""), [u, f] = O(""), [p, m] = O(""), [_, v] = O(""), [y, b] = O("50"), [x, S] = O(""), [w, T] = O(""), [D, k] = O(null), [M, P] = O(!1), F = C(async () => {
		await t({
			entityType: c || void 0,
			entityId: u || void 0,
			fromTime: p ? new Date(p).getTime() : void 0,
			toTime: _ ? new Date(_).getTime() : void 0,
			limit: y ? Number(y) : void 0
		});
	}, [
		c,
		u,
		p,
		_,
		y,
		t
	]), I = C(async () => {
		if (!(!x || !w)) {
			P(!0);
			try {
				let e = await a(x, new Date(w).getTime());
				k(e);
			} finally {
				P(!1);
			}
		}
	}, [
		x,
		w,
		a
	]), L = E(() => [
		{
			key: "timestamp",
			header: "Timestamp",
			sortable: !0,
			render: (e) => /* @__PURE__ */ A("span", {
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
			render: (e) => /* @__PURE__ */ A(n, {
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
	return /* @__PURE__ */ j(d, {
		title: "Audit Log",
		children: [
			/* @__PURE__ */ A(r, {
				padding: "md",
				children: /* @__PURE__ */ j("div", {
					className: "flex flex-wrap gap-4 items-end",
					children: [
						/* @__PURE__ */ A(Z, {
							label: "Entity Type",
							children: (e) => /* @__PURE__ */ A(g, {
								...e,
								className: "w-40",
								value: c,
								onChange: (e) => l(e.target.value),
								options: [{
									value: "",
									label: "All"
								}, ...re.filter(Boolean).map((e) => ({
									value: e,
									label: e
								}))]
							})
						}),
						/* @__PURE__ */ A(Z, {
							label: "Entity ID",
							children: (e) => /* @__PURE__ */ A(h, {
								...e,
								className: "w-44",
								value: u,
								onChange: (e) => f(e.target.value),
								placeholder: "Optional"
							})
						}),
						/* @__PURE__ */ A(Z, {
							label: "From",
							children: (e) => /* @__PURE__ */ A(h, {
								...e,
								className: "w-52",
								type: "datetime-local",
								value: p,
								onChange: (e) => m(e.target.value)
							})
						}),
						/* @__PURE__ */ A(Z, {
							label: "To",
							children: (e) => /* @__PURE__ */ A(h, {
								...e,
								className: "w-52",
								type: "datetime-local",
								value: _,
								onChange: (e) => v(e.target.value)
							})
						}),
						/* @__PURE__ */ A(Z, {
							label: "Limit",
							children: (e) => /* @__PURE__ */ A(h, {
								...e,
								className: "w-[70px]",
								type: "number",
								value: y,
								onChange: (e) => b(e.target.value)
							})
						}),
						/* @__PURE__ */ A(n, {
							variant: "primary",
							size: "lg",
							onClick: F,
							disabled: o,
							children: o ? "Querying..." : "Query"
						})
					]
				})
			}),
			s !== void 0 && /* @__PURE__ */ j("p", {
				className: "text-sm text-text-tertiary m-0",
				children: [s, " total record(s)"]
			}),
			/* @__PURE__ */ A(N, {
				columns: L,
				data: e,
				keyField: "timestamp",
				loading: o,
				emptyMessage: "No audit records found. Adjust filters and query.",
				emptyIcon: "📜"
			}),
			/* @__PURE__ */ j(r, {
				padding: "md",
				children: [
					/* @__PURE__ */ A("h3", {
						className: "text-base font-semibold text-text-primary mb-4 mt-0",
						children: "Point-in-Time Replay"
					}),
					/* @__PURE__ */ j("div", {
						className: "flex flex-wrap gap-4 items-end mb-4",
						children: [
							/* @__PURE__ */ A(Z, {
								label: "Entity ID",
								children: (e) => /* @__PURE__ */ A(h, {
									...e,
									className: "w-44",
									value: x,
									onChange: (e) => S(e.target.value),
									placeholder: "entity-id"
								})
							}),
							/* @__PURE__ */ A(Z, {
								label: "At Timestamp",
								children: (e) => /* @__PURE__ */ A(h, {
									...e,
									className: "w-52",
									type: "datetime-local",
									value: w,
									onChange: (e) => T(e.target.value)
								})
							}),
							/* @__PURE__ */ A(n, {
								variant: "primary",
								size: "lg",
								onClick: I,
								disabled: M || !x || !w,
								children: M ? "Replaying..." : "Replay"
							})
						]
					}),
					D && /* @__PURE__ */ A("pre", {
						className: "p-4 bg-surface-panel border border-border rounded-md font-mono text-xs text-text-primary overflow-x-auto whitespace-pre-wrap max-h-[300px] overflow-y-auto m-0",
						children: JSON.stringify(D, null, 2)
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/identity/admin/SetupGuidePage.tsx
function ae({ status: t, onNavigate: i }) {
	let [a, o] = O(null), s = T(), c = C((e) => {
		o((t) => t === e ? null : e);
	}, []), l = E(() => [
		{
			title: "Create User Pool",
			done: t.hasUserPools,
			content: /* @__PURE__ */ j("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ A("p", {
					className: "m-0 text-sm text-text-secondary",
					children: t.hasUserPools ? `${t.poolCount} pool(s) configured.` : "No user pools yet."
				}), /* @__PURE__ */ A("div", { children: /* @__PURE__ */ A(n, {
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
			content: /* @__PURE__ */ j("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ A("p", {
					className: "m-0 text-sm text-text-secondary",
					children: t.hasClients ? `${t.clientCount} application(s) registered.` : "No applications registered."
				}), /* @__PURE__ */ A("div", { children: /* @__PURE__ */ A(n, {
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
			content: /* @__PURE__ */ j("div", {
				className: "flex flex-col gap-2",
				children: [t.hasAdminUser ? /* @__PURE__ */ j(k, { children: [/* @__PURE__ */ j("p", {
					className: "m-0 text-sm text-text-secondary",
					children: ["Admin users: ", t.adminEmails.join(", ")]
				}), /* @__PURE__ */ j("p", {
					className: "m-0 text-sm text-text-secondary",
					children: [t.totalUsers, " total user(s) across all pools."]
				})] }) : /* @__PURE__ */ A("p", {
					className: "m-0 text-sm text-text-secondary",
					children: "No admin user found. Create one in a user pool."
				}), t.firstPoolId && /* @__PURE__ */ A("div", { children: /* @__PURE__ */ A(n, {
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
			content: /* @__PURE__ */ A("p", {
				className: "m-0 text-sm text-text-secondary",
				children: t.smtpConfigured ? `SMTP configured: ${t.smtpHost}` : "SMTP is not yet configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS environment variables."
			})
		},
		{
			title: "Configure Issuer",
			done: t.issuerConfigured,
			content: /* @__PURE__ */ j("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ j("p", {
					className: "m-0 text-sm text-text-secondary",
					children: ["Issuer: ", /* @__PURE__ */ A("code", {
						className: "px-1.5 py-0.5 bg-surface-hover rounded text-xs font-mono",
						children: t.issuer || "Not set"
					})]
				}), t.wellKnownUrl && /* @__PURE__ */ j("p", {
					className: "m-0 text-sm text-text-secondary",
					children: [
						"Well-known URL:",
						" ",
						/* @__PURE__ */ A("a", {
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
			content: /* @__PURE__ */ A("div", {
				className: "flex flex-col gap-3",
				children: t.firstClientId ? /* @__PURE__ */ j(k, { children: [
					/* @__PURE__ */ j("p", {
						className: "m-0 text-sm text-text-secondary",
						children: ["Client ID: ", /* @__PURE__ */ A("code", {
							className: "px-1.5 py-0.5 bg-surface-hover rounded text-xs font-mono",
							children: t.firstClientId
						})]
					}),
					/* @__PURE__ */ A("p", {
						className: "m-0 text-sm text-text-secondary",
						children: "Use this code snippet to test the OIDC authorization flow:"
					}),
					/* @__PURE__ */ A("pre", {
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
				] }) : /* @__PURE__ */ A("p", {
					className: "m-0 text-sm text-text-secondary",
					children: "Complete the previous steps first to test the integration."
				})
			})
		}
	], [t, i]), u = l.filter((e) => e.done).length, f = Math.round(u / l.length * 100);
	return /* @__PURE__ */ j(d, {
		title: "Setup Guide",
		description: `${u} of ${l.length} steps completed (${f}%)`,
		children: [/* @__PURE__ */ A("div", {
			className: "h-2 bg-surface-hover rounded-full overflow-hidden",
			children: /* @__PURE__ */ A("div", {
				className: "h-full bg-success rounded-full transition-[width] duration-300 ease-in-out",
				style: { width: `${f}%` }
			})
		}), /* @__PURE__ */ A("div", {
			className: "flex flex-col gap-2",
			children: l.map((t, n) => /* @__PURE__ */ j(r, { children: [/* @__PURE__ */ j("button", {
				type: "button",
				className: "flex items-center justify-between w-full text-left px-5 py-4 cursor-pointer select-none bg-transparent border-none font-[inherit]",
				onClick: () => c(n),
				"aria-expanded": a === n,
				"aria-controls": `${s}-${n}`,
				children: [/* @__PURE__ */ j("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ A("div", {
						className: e("w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0", t.done ? "bg-success text-white" : "bg-surface-hover text-text-tertiary"),
						children: t.done ? "✓" : n + 1
					}), /* @__PURE__ */ A("span", {
						className: "text-sm font-medium text-text-primary",
						children: t.title
					})]
				}), /* @__PURE__ */ A("span", {
					className: "text-text-tertiary text-sm",
					"aria-hidden": "true",
					children: a === n ? "▲" : "▼"
				})]
			}), a === n && /* @__PURE__ */ A("div", {
				id: `${s}-${n}`,
				className: "px-5 pb-5 pt-0 border-t border-border-subtle",
				children: /* @__PURE__ */ A("div", {
					className: "pt-4",
					children: t.content
				})
			})] }, n))
		})]
	});
}
//#endregion
//#region src/components/identity/admin/DiagnosticsPage.tsx
function oe({ data: e }) {
	return /* @__PURE__ */ A("pre", {
		className: "p-5 font-mono text-xs text-text-primary overflow-x-auto whitespace-pre-wrap max-h-[400px] overflow-y-auto m-0 bg-surface-panel",
		children: JSON.stringify(e, null, 2)
	});
}
function se({ rates: e }) {
	let t = Object.entries(e);
	return t.length === 0 ? /* @__PURE__ */ A("p", {
		className: "p-5 text-center text-text-tertiary text-sm m-0",
		children: "No rate limiter data available."
	}) : /* @__PURE__ */ j(l, { children: [/* @__PURE__ */ A(c, { children: /* @__PURE__ */ j("tr", { children: [/* @__PURE__ */ A(s, { children: "Key" }), /* @__PURE__ */ A(s, { children: "Value" })] }) }), /* @__PURE__ */ A(o, { children: t.map(([e, t]) => /* @__PURE__ */ j(a, { children: [/* @__PURE__ */ A(i, {
		className: "font-mono text-xs",
		children: e
	}), /* @__PURE__ */ A(i, { children: typeof t == "object" ? JSON.stringify(t) : String(t) })] }, e)) })] });
}
function ce({ diagnostics: e, rates: p, dlq: m, onRedrive: h, onPurge: g, onRefresh: _, loading: v }) {
	let [y, b] = O(!1), S = D(null), T = t(_);
	w(() => (y ? S.current = setInterval(T, 1e4) : S.current &&= (clearInterval(S.current), null), () => {
		S.current && clearInterval(S.current);
	}), [y, T]);
	let [E, k] = O(null), [M, N] = O(null), P = C(async (e, t, n) => {
		N(e), k(null);
		try {
			await t(e);
		} catch (t) {
			k(t instanceof Error ? `${n} failed for ${e}: ${t.message}` : `${n} failed for ${e}.`);
		} finally {
			N(null);
		}
	}, []), F = C((e) => P(e, h, "Redrive"), [P, h]), I = C((e) => P(e, g, "Purge"), [P, g]);
	return v ? /* @__PURE__ */ A(d, {
		title: "Diagnostics",
		children: /* @__PURE__ */ A("div", {
			className: "flex flex-col gap-4",
			children: [
				1,
				2,
				3
			].map((e) => /* @__PURE__ */ A(r, { className: "h-[120px] animate-pulse" }, e))
		})
	}) : /* @__PURE__ */ j(d, {
		title: "Diagnostics",
		actions: /* @__PURE__ */ j("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ j("label", {
				className: "flex items-center gap-1.5 text-sm text-neutral cursor-pointer",
				children: [/* @__PURE__ */ A(x, {
					checked: y,
					onChange: b,
					className: "rounded"
				}), "Auto-refresh (10s)"]
			}), /* @__PURE__ */ A(n, {
				variant: "ghost",
				size: "lg",
				onClick: _,
				children: "Refresh"
			})]
		}),
		children: [
			/* @__PURE__ */ j(r, { children: [/* @__PURE__ */ A("div", {
				className: "px-5 py-3 border-b border-border bg-surface-panel",
				children: /* @__PURE__ */ A("h3", {
					className: "text-sm font-semibold text-text-primary m-0",
					children: "Node / Cluster Diagnostics"
				})
			}), e ? /* @__PURE__ */ A(oe, { data: e }) : /* @__PURE__ */ A("p", {
				className: "p-5 text-center text-text-tertiary text-sm m-0",
				children: "No diagnostics data available."
			})] }),
			/* @__PURE__ */ j(r, { children: [/* @__PURE__ */ A("div", {
				className: "px-5 py-3 border-b border-border bg-surface-panel",
				children: /* @__PURE__ */ A("h3", {
					className: "text-sm font-semibold text-text-primary m-0",
					children: "Rate Limiter Stats"
				})
			}), p ? /* @__PURE__ */ A(se, { rates: p }) : /* @__PURE__ */ A("p", {
				className: "p-5 text-center text-text-tertiary text-sm m-0",
				children: "No rate data available."
			})] }),
			/* @__PURE__ */ j(r, { children: [
				/* @__PURE__ */ A("div", {
					className: "px-5 py-3 border-b border-border bg-surface-panel",
					children: /* @__PURE__ */ A("h3", {
						className: "text-sm font-semibold text-text-primary m-0",
						children: "Dead Letter Queue"
					})
				}),
				E && /* @__PURE__ */ A("div", {
					className: "px-5 pt-4",
					children: /* @__PURE__ */ A(f, {
						variant: "error",
						onDismiss: () => k(null),
						children: E
					})
				}),
				!m || m.length === 0 ? /* @__PURE__ */ A("p", {
					className: "p-5 text-center text-text-tertiary text-sm m-0",
					children: "Dead letter queue is empty."
				}) : /* @__PURE__ */ j(l, { children: [/* @__PURE__ */ A(c, { children: /* @__PURE__ */ j("tr", { children: [
					/* @__PURE__ */ A(s, { children: "ID" }),
					/* @__PURE__ */ A(s, { children: "Error" }),
					/* @__PURE__ */ A(s, { children: "Failed At" }),
					/* @__PURE__ */ A(s, { children: "Retries" }),
					/* @__PURE__ */ A(s, {
						className: "text-right",
						children: "Actions"
					})
				] }) }), /* @__PURE__ */ A(o, { children: m.map((e) => /* @__PURE__ */ j(a, { children: [
					/* @__PURE__ */ j(i, {
						className: "font-mono text-xs",
						children: [e.id.substring(0, 12), "..."]
					}),
					/* @__PURE__ */ A(i, { children: /* @__PURE__ */ A(u, {
						tone: "danger",
						size: "xs",
						children: e.error
					}) }),
					/* @__PURE__ */ A(i, {
						className: "text-xs text-neutral",
						children: new Date(e.failedAt).toLocaleString()
					}),
					/* @__PURE__ */ A(i, { children: /* @__PURE__ */ A(u, {
						tone: "neutral",
						size: "xs",
						mono: !0,
						children: e.retryCount
					}) }),
					/* @__PURE__ */ A(i, {
						className: "text-right",
						children: /* @__PURE__ */ j("div", {
							className: "flex items-center justify-end gap-2",
							children: [/* @__PURE__ */ A(n, {
								variant: "ghost",
								size: "sm",
								disabled: M === e.id,
								onClick: () => {
									F(e.id);
								},
								children: "Redrive"
							}), /* @__PURE__ */ A(n, {
								variant: "danger",
								size: "sm",
								disabled: M === e.id,
								onClick: () => {
									I(e.id);
								},
								children: "Purge"
							})]
						})
					})
				] }, e.id)) })] })
			] })
		]
	});
}
//#endregion
//#region src/components/identity/auth/LoginPage.tsx
function le({ uid: t, interactionUrl: r, clientName: i, logoUrl: a, error: o = null, onLogin: s, onRegister: c, onForgotPassword: l, registrationEnabled: u = !0, forgotPasswordEnabled: d = !0, defaultTab: p = "signin" }) {
	let [m, h] = O(() => p === "register" && !u || p === "forgot" && !d ? "signin" : p), [g, _] = O(!1), [v, y] = O(null), [b, x] = O(""), [w, T] = O(""), [E, D] = O(""), [M, N] = O(""), [P, I] = O(""), [L, R] = O(""), [z, B] = O(""), [V, H] = O(!1), [U, W] = O(""), [G, K] = O(!1), q = o || v, ee = C(async (e) => {
		e.preventDefault(), y(null), _(!0);
		try {
			await s(b, w);
		} catch (e) {
			y(e instanceof Error ? e.message : "Login failed");
		} finally {
			_(!1);
		}
	}, [
		b,
		w,
		s
	]), J = C(async (e) => {
		if (e.preventDefault(), y(null), M !== P) {
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
				enableMfa: V || void 0
			});
		} catch (e) {
			y(e instanceof Error ? e.message : "Registration failed");
		} finally {
			_(!1);
		}
	}, [
		E,
		M,
		P,
		L,
		z,
		V,
		c
	]), Y = C(async (e) => {
		e.preventDefault(), y(null), _(!0);
		try {
			await l(U), K(!0);
		} catch (e) {
			y(e instanceof Error ? e.message : "Request failed");
		} finally {
			_(!1);
		}
	}, [U, l]), X = (e) => {
		h(e), y(null), K(!1);
	};
	return /* @__PURE__ */ A("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ j("div", {
			className: "w-full max-w-[440px] bg-surface rounded-xl shadow-md p-8",
			role: "main",
			"aria-label": "Authentication",
			children: [
				/* @__PURE__ */ j("header", {
					className: "flex flex-col items-center gap-3 mb-6",
					children: [a && /* @__PURE__ */ A("img", {
						src: a,
						alt: "",
						className: "w-14 h-14 object-contain rounded-md"
					}), i && /* @__PURE__ */ A("h1", {
						className: "text-xl font-bold text-text-primary m-0",
						children: i
					})]
				}),
				/* @__PURE__ */ j("div", {
					className: "flex border-b border-border mb-6",
					role: "tablist",
					"aria-label": "Authentication method",
					onKeyDown: S,
					children: [
						/* @__PURE__ */ A(n, {
							variant: "ghost",
							size: "sm",
							role: "tab",
							"aria-selected": m === "signin",
							tabIndex: m === "signin" ? 0 : -1,
							className: e("flex-1 rounded-none border-b-2", m === "signin" ? "border-b-info text-info-fg font-semibold" : "border-b-transparent text-neutral font-normal"),
							onClick: () => X("signin"),
							children: "Sign In"
						}),
						u && /* @__PURE__ */ A(n, {
							variant: "ghost",
							size: "sm",
							role: "tab",
							"aria-selected": m === "register",
							tabIndex: m === "register" ? 0 : -1,
							className: e("flex-1 rounded-none border-b-2", m === "register" ? "border-b-info text-info-fg font-semibold" : "border-b-transparent text-neutral font-normal"),
							onClick: () => X("register"),
							children: "Register"
						}),
						d && /* @__PURE__ */ A(n, {
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
				q && /* @__PURE__ */ A("div", {
					className: "mb-5",
					children: /* @__PURE__ */ A(f, {
						variant: "error",
						children: q
					})
				}),
				m === "signin" && /* @__PURE__ */ j("form", {
					onSubmit: ee,
					"aria-label": "Sign in form",
					children: [
						/* @__PURE__ */ A("input", {
							type: "hidden",
							name: "uid",
							value: t
						}),
						/* @__PURE__ */ A(F, {
							label: "Email",
							name: "login-email",
							type: "email",
							value: b,
							onChange: (e) => x(String(e)),
							required: !0,
							placeholder: "you@example.com",
							disabled: g
						}),
						/* @__PURE__ */ A(F, {
							label: "Password",
							name: "login-password",
							type: "password",
							value: w,
							onChange: (e) => T(String(e)),
							required: !0,
							disabled: g
						}),
						/* @__PURE__ */ A(n, {
							type: "submit",
							variant: "primary",
							size: "lg",
							fullWidth: !0,
							disabled: g,
							children: g ? "Signing in..." : "Sign In"
						})
					]
				}),
				m === "register" && /* @__PURE__ */ j("form", {
					onSubmit: J,
					"aria-label": "Registration form",
					children: [
						/* @__PURE__ */ A(F, {
							label: "Email",
							name: "reg-email",
							type: "email",
							value: E,
							onChange: (e) => D(String(e)),
							required: !0,
							placeholder: "you@example.com",
							disabled: g
						}),
						/* @__PURE__ */ j("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ A("div", {
								className: "flex-1",
								children: /* @__PURE__ */ A(F, {
									label: "Given Name",
									name: "reg-given",
									value: L,
									onChange: (e) => R(String(e)),
									disabled: g
								})
							}), /* @__PURE__ */ A("div", {
								className: "flex-1",
								children: /* @__PURE__ */ A(F, {
									label: "Family Name",
									name: "reg-family",
									value: z,
									onChange: (e) => B(String(e)),
									disabled: g
								})
							})]
						}),
						/* @__PURE__ */ A(F, {
							label: "Password",
							name: "reg-password",
							type: "password",
							value: M,
							onChange: (e) => N(String(e)),
							required: !0,
							disabled: g
						}),
						/* @__PURE__ */ A(F, {
							label: "Confirm Password",
							name: "reg-confirm",
							type: "password",
							value: P,
							onChange: (e) => I(String(e)),
							required: !0,
							disabled: g
						}),
						/* @__PURE__ */ A(F, {
							label: "Enable Multi-Factor Authentication",
							name: "reg-mfa",
							type: "checkbox",
							value: V,
							onChange: (e) => H(!!e),
							disabled: g
						}),
						/* @__PURE__ */ A(n, {
							type: "submit",
							variant: "primary",
							size: "lg",
							fullWidth: !0,
							disabled: g,
							children: g ? "Creating account..." : "Create Account"
						})
					]
				}),
				m === "forgot" && /* @__PURE__ */ A("form", {
					onSubmit: Y,
					"aria-label": "Forgot password form",
					children: G ? /* @__PURE__ */ A(f, {
						variant: "success",
						children: "If an account exists for that email, a password reset link has been sent."
					}) : /* @__PURE__ */ j(k, { children: [
						/* @__PURE__ */ A("p", {
							className: "text-sm text-neutral mb-4 mt-0 leading-relaxed",
							children: "Enter your email address and we'll send you a link to reset your password."
						}),
						/* @__PURE__ */ A(F, {
							label: "Email",
							name: "forgot-email",
							type: "email",
							value: U,
							onChange: (e) => W(String(e)),
							required: !0,
							placeholder: "you@example.com",
							disabled: g
						}),
						/* @__PURE__ */ A(n, {
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
var ue = {
	openid: "Verify your identity",
	profile: "Access your name and profile information",
	email: "Access your email address",
	address: "Access your mailing address",
	phone: "Access your phone number",
	offline_access: "Maintain access when you are not present"
};
function de(e) {
	return ue[e] || `Access: ${e}`;
}
function fe({ clientName: t, scopes: r, redirectUri: i, onAuthorize: a, onDeny: o, logoUrl: s }) {
	let [c, l] = O(!1), u = C(async () => {
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
	return /* @__PURE__ */ A("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ j("div", {
			className: "w-full max-w-[440px] bg-surface rounded-xl shadow-md overflow-hidden",
			role: "main",
			"aria-label": "Authorization consent",
			children: [
				/* @__PURE__ */ j("header", {
					className: "flex flex-col items-center gap-3 px-8 pt-8 pb-5",
					children: [
						s && /* @__PURE__ */ A("img", {
							src: s,
							alt: "",
							className: "w-14 h-14 object-contain rounded-md"
						}),
						/* @__PURE__ */ j("h1", {
							className: "text-xl font-bold text-text-primary m-0 text-center",
							children: ["Authorize ", t]
						}),
						/* @__PURE__ */ A("p", {
							className: "text-sm text-neutral m-0 text-center leading-relaxed",
							children: "This application is requesting access to your account."
						})
					]
				}),
				/* @__PURE__ */ j("div", {
					className: "mx-8 border border-border rounded-md overflow-hidden mb-6",
					children: [/* @__PURE__ */ A("p", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-neutral px-4 py-2.5 m-0 bg-surface-panel border-b border-border",
						children: "Requested Permissions"
					}), /* @__PURE__ */ A("ul", {
						className: "list-none p-0 m-0",
						"aria-label": "Requested permissions",
						children: r.map((t, n) => /* @__PURE__ */ j("li", {
							className: e("flex items-center gap-3 px-4 py-3 text-sm text-text-primary", n < r.length - 1 && "border-b border-border"),
							children: [/* @__PURE__ */ A("span", {
								className: "w-2 h-2 rounded-full bg-info shrink-0",
								"aria-hidden": "true"
							}), /* @__PURE__ */ A("span", { children: de(t) })]
						}, t))
					})]
				}),
				/* @__PURE__ */ j("div", {
					className: "px-8 pb-8",
					children: [i && /* @__PURE__ */ j("p", {
						className: "text-[11px] text-text-tertiary mb-5 mt-0 break-all leading-relaxed",
						children: ["You will be redirected to: ", /* @__PURE__ */ A("strong", {
							className: "text-neutral",
							children: i
						})]
					}), /* @__PURE__ */ j("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ A(n, {
							variant: "ghost",
							size: "lg",
							fullWidth: !0,
							onClick: d,
							disabled: c,
							children: "Deny"
						}), /* @__PURE__ */ A(n, {
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
	return /* @__PURE__ */ j("figure", {
		className: "flex flex-col items-center gap-2 m-0 p-4 border border-border rounded-md bg-white",
		children: [/* @__PURE__ */ A("img", {
			src: e,
			alt: n || "QR Code",
			width: t,
			height: t,
			className: "block rounded-sm [image-rendering:pixelated]"
		}), n && /* @__PURE__ */ A("figcaption", {
			className: "text-sm text-neutral text-center",
			children: n
		})]
	});
}
//#endregion
//#region src/components/identity/shared/CodeInput.tsx
function $({ length: t = 6, onComplete: n, error: r = null, disabled: i = !1, autoFocus: a = !1 }) {
	let [o, s] = O(Array(t).fill("")), c = D([]);
	w(() => {
		a && c.current[0] && c.current[0].focus();
	}, [a]);
	let l = C((e) => {
		e >= 0 && e < t && c.current[e] && (c.current[e].focus(), c.current[e].select());
	}, [t]), u = D(null);
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
	return /* @__PURE__ */ j("div", {
		className: "flex flex-col items-center gap-2",
		children: [/* @__PURE__ */ A("div", {
			className: "flex gap-2",
			role: "group",
			"aria-label": "Verification code input",
			children: Array.from({ length: t }, (n, a) => /* @__PURE__ */ A("input", {
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
				className: e("w-11 h-[52px] text-center text-lg font-semibold font-[inherit]", "rounded-md outline-none transition-[border-color,box-shadow] duration-150", "border-2", r ? "border-danger" : "border-border", i ? "bg-surface-panel cursor-not-allowed" : "bg-surface cursor-text", "text-text-primary", "focus:border-info focus:ring-2 focus:ring-info/20")
			}, a))
		}), r && /* @__PURE__ */ A("p", {
			role: "alert",
			className: "m-0 text-sm text-danger-fg",
			children: r
		})]
	});
}
//#endregion
//#region src/components/identity/auth/MfaSetupPage.tsx
var pe = [
	"name",
	"scan",
	"verify",
	"backup"
], me = [
	"Name",
	"Scan",
	"Verify",
	"Backup"
];
function he({ onSetup: t, onVerify: r, onComplete: i, userEmail: a, initialStep: o = "name", initialSetupResult: s, initialDeviceName: c = "" }) {
	let [l, u] = O(o === "scan" && !s ? "name" : o), [d, p] = O(!1), [m, h] = O(null), [g, _] = O(c), [v, y] = O(s ?? null), [b, x] = O(s?.backupCodes ?? []), [S, T] = O(!1), E = pe.indexOf(l), k = C(async (e) => {
		if (e.preventDefault(), g.trim()) {
			h(null), p(!0);
			try {
				let e = await t(g.trim());
				y(e), x(e.backupCodes), u("scan");
			} catch (e) {
				h(e instanceof Error ? e.message : "Setup failed");
			} finally {
				p(!1);
			}
		}
	}, [g, t]), M = C(async (e) => {
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
	}, [v, r]), N = D(null);
	w(() => () => {
		N.current && clearTimeout(N.current);
	}, []);
	let P = C(async () => {
		try {
			await navigator.clipboard.writeText(b.join("\n")), T(!0), N.current && clearTimeout(N.current), N.current = setTimeout(() => T(!1), 2e3);
		} catch {}
	}, [b]);
	return /* @__PURE__ */ A("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ j("div", {
			className: "w-full max-w-[480px] bg-surface rounded-xl shadow-md p-8",
			role: "main",
			"aria-label": "MFA setup",
			children: [
				/* @__PURE__ */ A("h1", {
					className: "text-xl font-bold text-text-primary mb-2 mt-0 text-center",
					children: "Set Up Multi-Factor Authentication"
				}),
				a && /* @__PURE__ */ A("p", {
					className: "text-sm text-neutral mb-5 mt-0 text-center",
					children: a
				}),
				/* @__PURE__ */ A("div", {
					className: "flex justify-center gap-6 mb-6",
					role: "group",
					"aria-label": "Setup progress",
					children: pe.map((t, n) => /* @__PURE__ */ j("div", {
						className: "flex flex-col items-center gap-1.5",
						children: [/* @__PURE__ */ A("div", {
							className: e("w-3 h-3 rounded-full transition-colors duration-200", n < E ? "bg-success" : n === E ? "bg-info" : "bg-surface-emphasis"),
							"aria-label": `Step ${n + 1}${n === E ? " (current)" : n < E ? " (completed)" : ""}`
						}), /* @__PURE__ */ A("span", {
							className: e("text-[10px] uppercase tracking-wide font-medium", n === E ? "text-text-primary" : "text-text-tertiary"),
							children: me[n]
						})]
					}, t))
				}),
				m && /* @__PURE__ */ A("div", {
					className: "mb-5",
					children: /* @__PURE__ */ A(f, {
						variant: "error",
						children: m
					})
				}),
				l === "name" && /* @__PURE__ */ j("form", {
					onSubmit: k,
					"aria-label": "Name your device",
					children: [
						/* @__PURE__ */ A("p", {
							className: "text-sm text-neutral mb-4 mt-0 text-center leading-relaxed",
							children: "Give your authenticator device a name so you can identify it later."
						}),
						/* @__PURE__ */ A(F, {
							label: "Device Name",
							name: "device-name",
							value: g,
							onChange: (e) => _(String(e)),
							required: !0,
							placeholder: "e.g., My Phone",
							disabled: d
						}),
						/* @__PURE__ */ A(n, {
							type: "submit",
							variant: "primary",
							size: "lg",
							fullWidth: !0,
							disabled: d || !g.trim(),
							children: d ? "Setting up..." : "Continue"
						})
					]
				}),
				l === "scan" && v && /* @__PURE__ */ j("div", { children: [
					/* @__PURE__ */ A(n, {
						variant: "ghost",
						size: "sm",
						className: "p-0 mb-4",
						onClick: () => u("name"),
						"aria-label": "Go back to name step",
						children: "← Back"
					}),
					/* @__PURE__ */ A("p", {
						className: "text-sm text-neutral mb-5 mt-0 text-center leading-relaxed",
						children: "Scan this QR code with your authenticator app"
					}),
					/* @__PURE__ */ A("div", {
						className: "flex justify-center mb-5",
						children: /* @__PURE__ */ A(Q, {
							value: v.qrCode,
							size: 200,
							label: g ? `Device: ${g}` : void 0
						})
					}),
					/* @__PURE__ */ A("p", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary text-center mb-2 mt-0",
						children: "Or enter this secret manually"
					}),
					/* @__PURE__ */ A("div", {
						className: "px-4 py-3 bg-surface-panel border border-border rounded-md font-mono text-sm text-text-primary break-all text-center mb-6 select-all",
						children: v.secret
					}),
					/* @__PURE__ */ A(n, {
						variant: "primary",
						size: "lg",
						fullWidth: !0,
						onClick: () => u("verify"),
						children: "I've scanned it"
					})
				] }),
				l === "verify" && /* @__PURE__ */ j("div", { children: [
					/* @__PURE__ */ A(n, {
						variant: "ghost",
						size: "sm",
						className: "p-0 mb-4",
						onClick: () => u("scan"),
						"aria-label": "Go back to scan step",
						children: "← Back"
					}),
					/* @__PURE__ */ A("p", {
						className: "text-sm text-neutral mb-6 mt-0 text-center leading-relaxed",
						children: "Enter the 6-digit code from your authenticator app to confirm setup"
					}),
					/* @__PURE__ */ A($, {
						onComplete: M,
						error: m,
						disabled: d,
						autoFocus: !0
					}),
					d && /* @__PURE__ */ A("p", {
						className: "text-center text-sm text-text-tertiary mt-3",
						children: "Verifying..."
					})
				] }),
				l === "backup" && /* @__PURE__ */ j("div", { children: [
					/* @__PURE__ */ A("div", {
						className: "w-14 h-14 mx-auto mb-5 rounded-full bg-success-bg flex items-center justify-center",
						children: /* @__PURE__ */ A("svg", {
							width: "28",
							height: "28",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							className: "text-success-fg",
							children: /* @__PURE__ */ A("polyline", { points: "20 6 9 17 4 12" })
						})
					}),
					/* @__PURE__ */ A("p", {
						className: "text-sm text-neutral mb-5 mt-0 text-center leading-relaxed",
						children: "Save these backup codes in a safe place. Each code can only be used once."
					}),
					/* @__PURE__ */ A("div", {
						className: "grid grid-cols-2 gap-2.5 mb-6",
						children: b.map((e, t) => /* @__PURE__ */ A("div", {
							className: "px-3 py-2.5 bg-surface-panel border border-border rounded-md font-mono text-sm text-text-primary text-center select-all",
							children: e
						}, t))
					}),
					/* @__PURE__ */ A(n, {
						variant: "primary",
						size: "lg",
						fullWidth: !0,
						onClick: P,
						children: S ? "Copied!" : "Copy All Codes"
					}),
					/* @__PURE__ */ A("div", {
						className: "mt-3",
						children: /* @__PURE__ */ A(n, {
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
function ge({ onVerify: e, onVerifyBackup: t, error: r = null, defaultMode: i = "totp" }) {
	let [a, o] = O(i), [s, c] = O(!1), [l, u] = O(null), [d, p] = O(""), m = r || l, h = C(async (t) => {
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
	return /* @__PURE__ */ A("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ j("div", {
			className: "w-full max-w-[440px] bg-surface rounded-xl shadow-md p-8",
			role: "main",
			"aria-label": "Multi-factor verification",
			children: [
				/* @__PURE__ */ A("div", {
					className: "w-14 h-14 mx-auto mb-5 rounded-full bg-info-bg flex items-center justify-center",
					children: /* @__PURE__ */ j("svg", {
						width: "28",
						height: "28",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						className: "text-info-fg",
						children: [/* @__PURE__ */ A("rect", {
							x: "3",
							y: "11",
							width: "18",
							height: "11",
							rx: "2",
							ry: "2"
						}), /* @__PURE__ */ A("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })]
					})
				}),
				/* @__PURE__ */ A("h1", {
					className: "text-xl font-bold text-text-primary mb-2 mt-0 text-center",
					children: "Verify Your Identity"
				}),
				a === "totp" ? /* @__PURE__ */ j(k, { children: [
					/* @__PURE__ */ A("p", {
						className: "text-sm text-neutral mb-6 mt-0 text-center leading-relaxed",
						children: "Enter the 6-digit code from your authenticator app"
					}),
					m && /* @__PURE__ */ A("div", {
						className: "mb-5",
						children: /* @__PURE__ */ A(f, {
							variant: "error",
							children: m
						})
					}),
					/* @__PURE__ */ A($, {
						onComplete: h,
						error: null,
						disabled: s,
						autoFocus: !0
					}),
					s && /* @__PURE__ */ A("p", {
						className: "text-center text-sm text-text-tertiary mt-3",
						children: "Verifying..."
					}),
					/* @__PURE__ */ A(n, {
						variant: "ghost",
						size: "sm",
						className: "block mt-6 mx-auto underline text-info-fg",
						onClick: () => {
							o("backup"), u(null);
						},
						children: "Use a backup code instead"
					})
				] }) : /* @__PURE__ */ j(k, { children: [
					/* @__PURE__ */ A("p", {
						className: "text-sm text-neutral mb-6 mt-0 text-center leading-relaxed",
						children: "Enter one of your backup codes"
					}),
					m && /* @__PURE__ */ A("div", {
						className: "mb-5",
						children: /* @__PURE__ */ A(f, {
							variant: "error",
							children: m
						})
					}),
					/* @__PURE__ */ j("form", {
						onSubmit: g,
						"aria-label": "Backup code verification",
						children: [/* @__PURE__ */ A(F, {
							label: "Backup Code",
							name: "backup-code",
							value: d,
							onChange: (e) => p(String(e)),
							required: !0,
							placeholder: "XXXX-XXXX-XXXX",
							disabled: s
						}), /* @__PURE__ */ A(n, {
							type: "submit",
							variant: "primary",
							size: "lg",
							fullWidth: !0,
							disabled: s || !d.trim(),
							children: s ? "Verifying..." : "Verify Backup Code"
						})]
					}),
					/* @__PURE__ */ A(n, {
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
function _e(e) {
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
function ve({ devices: e, userEmail: t, mfaEnabled: r, onAddDevice: i, onRenameDevice: a, onRemoveDevice: o, loading: s = !1 }) {
	let [c, l] = O(null), [d, p] = O(null), [h, g] = O(""), [_, v] = O(!1), [b, x] = O(null), S = C(async () => {
		if (c) {
			v(!0), x(null);
			try {
				await o(c), l(null);
			} catch (e) {
				x(e instanceof Error ? e.message : "Failed to remove device.");
			} finally {
				v(!1);
			}
		}
	}, [c, o]), w = C(async (e) => {
		if (h.trim()) {
			v(!0), x(null);
			try {
				await a(e, h.trim()), p(null), g("");
			} catch (e) {
				x(e instanceof Error ? e.message : "Failed to rename device.");
			} finally {
				v(!1);
			}
		}
	}, [h, a]), T = (e) => {
		p(e.deviceId), g(e.deviceName), x(null);
	};
	return /* @__PURE__ */ A("div", {
		className: "min-h-full flex items-start justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ j("div", {
			className: "w-full max-w-[600px] bg-surface rounded-xl shadow-md p-8",
			role: "main",
			"aria-label": "MFA device management",
			children: [
				/* @__PURE__ */ j("div", {
					className: "flex items-center justify-between mb-6 flex-wrap gap-3",
					children: [/* @__PURE__ */ j("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ A("h1", {
							className: "text-xl font-bold text-text-primary m-0",
							children: "MFA Devices"
						}), t && /* @__PURE__ */ A("p", {
							className: "text-sm text-neutral m-0",
							children: t
						})]
					}), /* @__PURE__ */ j("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ A(u, {
							tone: r ? "success" : "warning",
							children: r ? "Enabled" : "Disabled"
						}), /* @__PURE__ */ A(n, {
							variant: "primary",
							size: "md",
							onClick: i,
							children: "Add Device"
						})]
					})]
				}),
				b && !c && /* @__PURE__ */ A("div", {
					className: "mb-5",
					children: /* @__PURE__ */ A(f, {
						variant: "error",
						children: b
					})
				}),
				s && /* @__PURE__ */ A("p", {
					className: "text-center text-text-tertiary text-sm py-8",
					children: "Loading devices..."
				}),
				!s && e.length === 0 && /* @__PURE__ */ A(y, {
					icon: "🔐",
					title: "No MFA devices configured",
					body: "Add a device to secure your account with multi-factor authentication.",
					actionLabel: "Add Device",
					onAction: i
				}),
				!s && e.length > 0 && /* @__PURE__ */ A("div", {
					className: "flex flex-col gap-3",
					role: "list",
					"aria-label": "MFA devices",
					children: e.map((e) => /* @__PURE__ */ j("div", {
						className: "p-5 border border-border rounded-lg bg-surface",
						role: "listitem",
						children: [
							/* @__PURE__ */ A("div", {
								className: "flex items-center justify-between mb-2",
								children: /* @__PURE__ */ A("div", {
									className: "flex items-center gap-2.5",
									children: d === e.deviceId ? /* @__PURE__ */ j("form", {
										onSubmit: (t) => {
											t.preventDefault(), w(e.deviceId);
										},
										className: "flex gap-2 items-center",
										children: [
											/* @__PURE__ */ A(F, {
												label: "",
												name: `rename-${e.deviceId}`,
												value: h,
												onChange: (e) => g(String(e)),
												disabled: _
											}),
											/* @__PURE__ */ A(n, {
												type: "submit",
												variant: "primary",
												size: "sm",
												disabled: _ || !h.trim(),
												children: "Save"
											}),
											/* @__PURE__ */ A(n, {
												variant: "ghost",
												size: "sm",
												onClick: () => p(null),
												children: "Cancel"
											})
										]
									}) : /* @__PURE__ */ j(k, { children: [/* @__PURE__ */ A("h3", {
										className: "text-[15px] font-semibold text-text-primary m-0",
										children: e.deviceName
									}), /* @__PURE__ */ A(z, { status: e.isVerified ? "CONFIRMED" : "UNCONFIRMED" })] })
								})
							}),
							/* @__PURE__ */ j("p", {
								className: "text-[11px] text-text-tertiary m-0 mb-3",
								children: [
									"Type: ",
									e.deviceType,
									" · Added: ",
									_e(e.createdAt),
									e.lastUsed && ` · Last used: ${_e(e.lastUsed)}`
								]
							}),
							d !== e.deviceId && /* @__PURE__ */ j("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ A(n, {
									variant: "ghost",
									size: "sm",
									onClick: () => T(e),
									children: "Rename"
								}), /* @__PURE__ */ A(n, {
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
				/* @__PURE__ */ A(m, {
					open: !!c,
					onConfirm: () => {
						S();
					},
					onCancel: () => {
						l(null), x(null);
					},
					title: "Remove Device",
					body: "Are you sure you want to remove this MFA device? You will no longer be able to use it for verification.",
					confirmLabel: _ ? "Removing..." : "Remove",
					confirmDisabled: _,
					tone: "destructive",
					children: b && /* @__PURE__ */ A(f, {
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
function ye({ onConfirm: e, onCancel: t, clientName: r }) {
	return /* @__PURE__ */ A("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ j("div", {
			className: "w-full max-w-[420px] bg-surface rounded-xl shadow-md p-8 text-center",
			role: "main",
			"aria-label": "Sign out confirmation",
			children: [
				/* @__PURE__ */ A("div", {
					className: "w-14 h-14 mx-auto mb-5 rounded-full bg-danger-bg flex items-center justify-center",
					children: /* @__PURE__ */ j("svg", {
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
							/* @__PURE__ */ A("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
							/* @__PURE__ */ A("polyline", { points: "16 17 21 12 16 7" }),
							/* @__PURE__ */ A("line", {
								x1: "21",
								y1: "12",
								x2: "9",
								y2: "12"
							})
						]
					})
				}),
				/* @__PURE__ */ A("h1", {
					className: "text-xl font-bold text-text-primary mb-3 mt-0",
					children: "Sign Out"
				}),
				/* @__PURE__ */ j("p", {
					className: "text-sm text-neutral mb-6 mt-0 leading-relaxed",
					children: [
						"Are you sure you want to sign out",
						r ? /* @__PURE__ */ j(k, { children: [" from ", /* @__PURE__ */ A("strong", {
							className: "text-text-primary",
							children: r
						})] }) : "",
						"? You will need to sign in again to access your account."
					]
				}),
				/* @__PURE__ */ j("div", {
					className: "flex gap-3 justify-center",
					children: [t && /* @__PURE__ */ A(n, {
						variant: "ghost",
						size: "lg",
						fullWidth: !0,
						onClick: t,
						children: "Cancel"
					}), /* @__PURE__ */ A(n, {
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
function be({ title: e = "Something went wrong", message: t, error: r, onRetry: i, onBack: a }) {
	return /* @__PURE__ */ A("div", {
		className: "min-h-full flex items-center justify-center p-6 bg-surface-panel",
		children: /* @__PURE__ */ j("div", {
			className: "w-full max-w-[420px] bg-surface rounded-xl shadow-md p-8 text-center",
			role: "main",
			"aria-label": "Error",
			children: [
				/* @__PURE__ */ A("div", {
					className: "w-14 h-14 rounded-full bg-danger-bg flex items-center justify-center mx-auto mb-5",
					"aria-hidden": "true",
					children: /* @__PURE__ */ j("svg", {
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
							/* @__PURE__ */ A("circle", {
								cx: "12",
								cy: "12",
								r: "10"
							}),
							/* @__PURE__ */ A("line", {
								x1: "15",
								y1: "9",
								x2: "9",
								y2: "15"
							}),
							/* @__PURE__ */ A("line", {
								x1: "9",
								y1: "9",
								x2: "15",
								y2: "15"
							})
						]
					})
				}),
				/* @__PURE__ */ A("h1", {
					className: "text-xl font-bold text-text-primary mb-3 mt-0",
					children: e
				}),
				/* @__PURE__ */ A("p", {
					className: "text-sm text-neutral mb-3 mt-0 leading-relaxed",
					children: t
				}),
				r && /* @__PURE__ */ A("code", {
					className: "text-[11px] text-text-tertiary font-mono mb-5 px-3.5 py-2 bg-surface-panel border border-border rounded-md inline-block max-w-full overflow-x-auto",
					children: r
				}),
				(i || a) && /* @__PURE__ */ j("div", {
					className: "flex gap-3 justify-center mt-6",
					children: [a && /* @__PURE__ */ A(n, {
						variant: "ghost",
						size: "lg",
						onClick: a,
						children: "Go Back"
					}), i && /* @__PURE__ */ A(n, {
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
var xe = [
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
function Se({ item: t, active: n, onNavigate: r }) {
	return /* @__PURE__ */ A("li", { children: /* @__PURE__ */ j("button", {
		type: "button",
		className: e("flex items-center gap-2 w-full text-left px-3 py-2 text-sm font-medium cursor-pointer", "border-none rounded-none border-l-[3px] transition-colors", n ? "bg-surface-panel text-info-fg font-semibold border-l-info" : "bg-transparent text-text-primary border-l-transparent hover:bg-surface-hover"),
		onClick: () => r(t.path),
		"aria-current": n ? "page" : void 0,
		children: [/* @__PURE__ */ A("span", { children: t.icon }), /* @__PURE__ */ A("span", { children: t.label })]
	}) });
}
function Ce({ children: t, activePath: r, adminEmail: i, onNavigate: a, onLogout: o, defaultSidebarOpen: s = !0 }) {
	let [c, l] = O(s), u = C(() => l((e) => !e), []);
	return /* @__PURE__ */ j("div", {
		className: "flex min-h-screen bg-surface-panel font-[inherit]",
		children: [/* @__PURE__ */ j("aside", {
			className: e("bg-surface border-r border-border flex flex-col shrink-0 transition-[width] duration-200 overflow-hidden", c ? "w-60" : "w-0 border-r-0"),
			children: [/* @__PURE__ */ A("div", {
				className: "p-4 font-bold text-lg text-info-fg border-b border-border",
				children: "Identity Admin"
			}), /* @__PURE__ */ A("ul", {
				className: "list-none m-0 p-0 py-2 flex-1",
				children: xe.map((e) => /* @__PURE__ */ A(Se, {
					item: e,
					active: r === e.path,
					onNavigate: a
				}, e.path))
			})]
		}), /* @__PURE__ */ j("div", {
			className: "flex-1 flex flex-col min-w-0",
			children: [/* @__PURE__ */ j("header", {
				className: "flex items-center justify-between px-4 py-2 bg-surface border-b border-border",
				children: [/* @__PURE__ */ A(n, {
					variant: "ghost",
					size: "sm",
					onClick: u,
					"aria-label": "Toggle sidebar",
					children: c ? "←" : "→"
				}), /* @__PURE__ */ j("div", {
					className: "flex items-center gap-4",
					children: [i && /* @__PURE__ */ A("span", {
						className: "text-sm text-neutral",
						children: i
					}), o && /* @__PURE__ */ A(n, {
						variant: "danger-solid",
						size: "sm",
						onClick: o,
						children: "Logout"
					})]
				})]
			}), /* @__PURE__ */ A("main", {
				className: "flex-1 p-6 overflow-y-auto",
				children: t
			})]
		})]
	});
}
//#endregion
//#region src/components/identity/shared/PoolScopedLayout.tsx
var we = [
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
function Te({ label: t, active: r, onClick: i }) {
	return /* @__PURE__ */ A(n, {
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
function Ee({ children: e, poolId: t, poolName: r, activeSection: i, onNavigate: a, onBack: o }) {
	let s = C((e) => {
		a(`/identity/admin/pools/${t}/${e}`);
	}, [a, t]), c = i ? i.charAt(0).toUpperCase() + i.slice(1) : "";
	return /* @__PURE__ */ j("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ j("nav", {
				className: "flex items-center gap-1.5 text-sm text-text-tertiary",
				"aria-label": "Breadcrumb",
				children: [
					/* @__PURE__ */ A(n, {
						variant: "ghost",
						size: "sm",
						className: "p-0 underline text-info-fg",
						onClick: o,
						"aria-label": "Navigate to Pools",
						children: "Pools"
					}),
					/* @__PURE__ */ A("span", { children: "/" }),
					/* @__PURE__ */ A("span", {
						className: "text-text-primary font-medium",
						children: r
					}),
					i && /* @__PURE__ */ j(k, { children: [/* @__PURE__ */ A("span", { children: "/" }), /* @__PURE__ */ A("span", { children: c })] })
				]
			}),
			/* @__PURE__ */ A("div", { children: /* @__PURE__ */ A(n, {
				variant: "secondary",
				size: "sm",
				onClick: o,
				children: "← Back to Pools"
			}) }),
			/* @__PURE__ */ A("div", {
				role: "tablist",
				"aria-label": "Pool sections",
				onKeyDown: S,
				className: "flex border-b-2 border-border",
				children: we.map((e) => /* @__PURE__ */ A(Te, {
					label: e.label,
					active: i === e.key,
					onClick: () => s(e.key)
				}, e.key))
			}),
			/* @__PURE__ */ A("div", { children: e })
		]
	});
}
//#endregion
export { M as A, V as C, F as D, I as E, P as O, H as S, z as T, X as _, ve as a, W as b, $ as c, le as d, ce as f, te as g, ne as h, ye as i, N as k, Q as l, ie as m, Ce as n, ge as o, ae as p, be as r, he as s, Ee as t, fe as u, Y as v, B as w, U as x, ee as y };
