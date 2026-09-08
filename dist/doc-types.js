import { n as e, t } from "./registry-DbX3MVAA.js";
import { i as n, n as r, r as i } from "./documentType-rRZpKWbO.js";
import { r as a } from "./useDocumentTypes-CrsHC24c.js";
import { t as o } from "./cn-DhjIN-s0.js";
import { t as s } from "./Modal-CyoyiNKN.js";
import { t as c } from "./EmptyState-ClmWoqCb.js";
import { t as l } from "./Input-DLknWXri.js";
import { t as u } from "./Textarea-Dz4doxTv.js";
import { t as d } from "./Select-CqVokE2v.js";
import { t as f } from "./Checkbox-DsS7fIUO.js";
import "./renderers-CoOnJdXH.js";
import { useEffect as p, useId as m, useMemo as h, useRef as g, useState as _ } from "react";
import { Fragment as v, jsx as y, jsxs as b } from "react/jsx-runtime";
import { DndContext as x, KeyboardSensor as S, PointerSensor as C, closestCorners as w, useSensor as T, useSensors as E } from "@dnd-kit/core";
import { SortableContext as D, arrayMove as O, sortableKeyboardCoordinates as k, useSortable as A, verticalListSortingStrategy as j } from "@dnd-kit/sortable";
import { CSS as M } from "@dnd-kit/utilities";
//#region src/components/doc-types/WizardStepNavigation.tsx
var N = [
	"Basic Info",
	"Sections",
	"View Modes"
];
function P({ step: e, total: t }) {
	return /* @__PURE__ */ y("div", {
		className: "flex items-center gap-0 mb-7",
		children: Array.from({ length: t }, (n, r) => {
			let i = r + 1, a = i === e, s = i < e;
			return /* @__PURE__ */ b("div", {
				className: "flex items-center",
				children: [
					/* @__PURE__ */ y("div", {
						className: o("w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold", s && "bg-primary text-white border-2 border-transparent", a && "bg-accent-bg text-accent-fg border-2 border-primary", !s && !a && "bg-surface-hover text-text-tertiary border-2 border-transparent"),
						children: s ? "✓" : i
					}),
					/* @__PURE__ */ y("span", {
						className: o("ml-1.5 text-xs whitespace-nowrap", a ? "font-semibold text-text-primary" : "font-normal text-text-tertiary"),
						children: N[r]
					}),
					i < t && /* @__PURE__ */ y("div", { className: "w-8 h-px bg-border mx-2.5 shrink-0" })
				]
			}, i);
		})
	});
}
function F({ step: e, totalSteps: t, canAdvance: n, isEditing: r, onCancel: i, onBack: a, onNext: s, onExportSchema: c, exportError: l }) {
	return /* @__PURE__ */ b("div", {
		className: "flex items-center justify-between pt-4 border-t border-border mt-4 shrink-0",
		children: [/* @__PURE__ */ b("div", {
			className: "flex gap-2",
			children: [
				/* @__PURE__ */ y("button", {
					type: "button",
					onClick: i,
					className: "px-4 py-[7px] text-[13px] font-semibold rounded-[7px] cursor-pointer font-inherit bg-transparent border-none text-neutral",
					children: "Cancel"
				}),
				c && /* @__PURE__ */ y("button", {
					type: "button",
					onClick: c,
					title: "Download JSON Schema",
					className: "px-4 py-[7px] text-[13px] font-semibold rounded-[7px] cursor-pointer font-inherit bg-surface text-text-primary border border-border-field",
					children: "Export Schema"
				}),
				l && /* @__PURE__ */ y("div", {
					"data-testid": "export-schema-error",
					role: "alert",
					className: "text-danger-fg text-[13px] self-center",
					children: l
				})
			]
		}), /* @__PURE__ */ b("div", {
			className: "flex gap-2",
			children: [e > 1 && /* @__PURE__ */ y("button", {
				type: "button",
				onClick: a,
				className: "px-4 py-[7px] text-[13px] font-semibold rounded-[7px] cursor-pointer font-inherit bg-surface text-text-primary border border-border-field",
				children: "← Back"
			}), /* @__PURE__ */ y("button", {
				type: "button",
				"data-testid": "wizard-next",
				onClick: s,
				disabled: !n,
				className: o("px-4 py-[7px] text-[13px] font-semibold rounded-[7px] font-inherit border-none bg-primary text-white", n ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-50"),
				children: e === t ? r ? "Save Changes" : "Create Type" : "Next →"
			})]
		})]
	});
}
//#endregion
//#region src/components/doc-types/FieldDefinitionEditor.tsx
function I({ field: n, index: r, total: i, onRename: a, onChangeType: s, onRemove: c, onMoveUp: u, onMoveDown: f, onToggleRequired: p, onToggleCollapsed: m }) {
	let h = t(n.sectionType), g = e(), _ = n.name.trim() || `Section ${r + 1}`;
	return /* @__PURE__ */ b("div", {
		className: "flex items-center gap-2 py-2 px-2.5 rounded-lg bg-surface-panel border border-border mb-1.5",
		children: [
			/* @__PURE__ */ b("div", {
				className: "flex flex-col gap-px shrink-0",
				children: [/* @__PURE__ */ y("button", {
					type: "button",
					disabled: r === 0,
					onClick: u,
					"data-testid": `field-up-${n.id}`,
					"aria-label": `Move ${n.name} up`,
					className: o("px-1 py-px text-[10px] leading-none font-semibold rounded-[7px] font-inherit border-none bg-transparent", r === 0 ? "text-neutral opacity-50 cursor-not-allowed" : "text-neutral cursor-pointer"),
					children: "▲"
				}), /* @__PURE__ */ y("button", {
					type: "button",
					disabled: r === i - 1,
					onClick: f,
					"data-testid": `field-down-${n.id}`,
					"aria-label": `Move ${n.name} down`,
					className: o("px-1 py-px text-[10px] leading-none font-semibold rounded-[7px] font-inherit border-none bg-transparent", r === i - 1 ? "text-neutral opacity-50 cursor-not-allowed" : "text-neutral cursor-pointer"),
					children: "▼"
				})]
			}),
			/* @__PURE__ */ y("span", {
				className: "text-base shrink-0",
				children: h?.icon ?? "📄"
			}),
			/* @__PURE__ */ y(l, {
				"aria-label": `${_} name`,
				"data-testid": `field-name-${n.id}`,
				size: "sm",
				value: n.name,
				onChange: (e) => a(e.target.value),
				className: "flex-1 min-w-0 bg-transparent border-transparent focus:border-accent-border focus:bg-surface"
			}),
			/* @__PURE__ */ y(d, {
				"aria-label": `${_} type`,
				"data-testid": `field-type-${n.id}`,
				size: "sm",
				value: n.sectionType,
				onChange: (e) => s(e.target.value),
				className: "w-auto shrink-0 text-[11px] font-semibold bg-accent-bg text-accent-fg border-accent-border",
				options: g.map((e) => ({
					value: e.type,
					label: e.label
				}))
			}),
			/* @__PURE__ */ y("button", {
				type: "button",
				onClick: p,
				"data-testid": `field-required-${n.id}`,
				title: "Required",
				className: o("px-2 py-[3px] text-[11px] font-semibold rounded-[7px] font-inherit shrink-0 cursor-pointer", n.required ? "bg-accent-bg text-accent-fg border border-accent-border" : "bg-surface-panel text-text-tertiary border border-border"),
				children: "Required"
			}),
			/* @__PURE__ */ y("button", {
				type: "button",
				onClick: m,
				"data-testid": `field-collapsed-${n.id}`,
				title: "Collapsed by default",
				className: o("px-2 py-[3px] text-[11px] font-semibold rounded-[7px] font-inherit shrink-0 cursor-pointer", n.defaultCollapsed ? "bg-success-bg text-success-fg border border-success-border" : "bg-surface-panel text-text-tertiary border border-border"),
				children: "Collapsed"
			}),
			/* @__PURE__ */ y("button", {
				type: "button",
				onClick: c,
				"data-testid": `field-remove-${n.id}`,
				"aria-label": `Remove ${n.name}`,
				className: "px-1.5 py-0.5 text-sm bg-transparent border-none text-danger-fg cursor-pointer shrink-0 font-semibold rounded-[7px] font-inherit",
				children: "×"
			})
		]
	});
}
//#endregion
//#region src/components/doc-types/DocumentTypeWizard.tsx
function L({ name: e, setName: t, description: n, setDescription: r }) {
	let i = m();
	return /* @__PURE__ */ b("div", {
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ b("div", { children: [/* @__PURE__ */ b("label", {
			htmlFor: `${i}-name`,
			className: "block text-xs font-semibold text-text-primary mb-[5px] tracking-wide",
			children: ["Name ", /* @__PURE__ */ y("span", {
				"aria-hidden": "true",
				className: "text-danger-fg",
				children: "*"
			})]
		}), /* @__PURE__ */ y(l, {
			id: `${i}-name`,
			"aria-required": "true",
			"data-testid": "name-input",
			value: e,
			onChange: (e) => t(e.target.value),
			placeholder: "e.g. Sprint Planning, Retrospective, Meeting Notes…",
			maxLength: 80,
			autoFocus: !0
		})] }), /* @__PURE__ */ b("div", { children: [/* @__PURE__ */ y("label", {
			htmlFor: `${i}-description`,
			className: "block text-xs font-semibold text-text-primary mb-[5px] tracking-wide",
			children: "Description"
		}), /* @__PURE__ */ y(u, {
			id: `${i}-description`,
			"data-testid": "description-input",
			className: "min-h-[72px] resize-y",
			value: n,
			onChange: (e) => r(e.target.value),
			placeholder: "Optional — describe when this document type is used",
			maxLength: 300
		})] })]
	});
}
function R({ page: e, pageIdx: t, totalPages: n, isActive: r, setActivePageId: i, movePage: a, removePage: s, renamePage: c, pages: u, fieldsById: d, renderRow: f, moveSectionToPage: p }) {
	let { attributes: m, listeners: h, setNodeRef: g, transform: _, transition: v, isDragging: x } = A({ id: e.id }), S = {
		transform: M.Transform.toString(_),
		transition: v,
		opacity: x ? .5 : 1
	};
	return /* @__PURE__ */ y("div", {
		ref: g,
		style: S,
		"data-testid": `wizard-page-${e.id}`,
		children: /* @__PURE__ */ b("div", {
			className: o("bg-surface border rounded-[10px] p-4 mb-3", r ? "bg-accent-bg border-accent-border" : "border-border"),
			children: [/* @__PURE__ */ b("div", {
				className: "flex items-center gap-2 mb-2.5",
				children: [
					/* @__PURE__ */ y("button", {
						type: "button",
						"data-testid": `page-drag-handle-${e.id}`,
						...m,
						...h,
						className: "cursor-grab px-1 py-0.5 text-sm text-text-tertiary border-none bg-transparent select-none touch-none",
						title: "Drag to reorder pages",
						children: "⋮⋮"
					}),
					/* @__PURE__ */ y("button", {
						type: "button",
						"data-testid": `page-up-${e.id}`,
						disabled: t === 0,
						onClick: () => a(e.id, -1),
						className: o("px-1.5 py-0.5 text-[11px] font-semibold rounded-[7px] font-inherit border-none bg-transparent", t === 0 ? "text-neutral opacity-50 cursor-not-allowed" : "text-neutral cursor-pointer"),
						children: "▲"
					}),
					/* @__PURE__ */ y("button", {
						type: "button",
						"data-testid": `page-down-${e.id}`,
						disabled: t === n - 1,
						onClick: () => a(e.id, 1),
						className: o("px-1.5 py-0.5 text-[11px] font-semibold rounded-[7px] font-inherit border-none bg-transparent", t === n - 1 ? "text-neutral opacity-50 cursor-not-allowed" : "text-neutral cursor-pointer"),
						children: "▼"
					}),
					/* @__PURE__ */ b("span", {
						className: "text-xs font-semibold text-text-tertiary min-w-14",
						children: ["Page ", t + 1]
					}),
					/* @__PURE__ */ y(l, {
						"aria-label": `Page ${t + 1} title`,
						"data-testid": `page-title-${e.id}`,
						size: "sm",
						className: "flex-1",
						value: e.title ?? "",
						placeholder: `Page ${t + 1}`,
						onChange: (t) => c(e.id, t.target.value),
						onFocus: () => i(e.id)
					}),
					/* @__PURE__ */ y("button", {
						type: "button",
						"data-testid": `page-remove-${e.id}`,
						disabled: n <= 1,
						onClick: () => s(e.id),
						className: o("px-2 py-0.5 text-[13px] font-semibold rounded-[7px] font-inherit border-none bg-transparent text-danger-fg", n <= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"),
						title: "Remove page (sections move to first page)",
						children: "✕"
					})
				]
			}), e.sectionIds.length === 0 ? /* @__PURE__ */ y("div", {
				"data-testid": `page-empty-${e.id}`,
				className: "py-3 px-2 text-text-tertiary text-xs italic",
				children: "No sections on this page yet — click the page header to make it active, then pick a section type."
			}) : /* @__PURE__ */ y(D, {
				items: e.sectionIds,
				strategy: j,
				children: /* @__PURE__ */ y("div", {
					"data-testid": `page-sections-${e.id}`,
					children: e.sectionIds.map((t, n) => d.get(t) ? /* @__PURE__ */ y(z, {
						sectionId: t,
						page: e,
						idx: n,
						pages: u,
						renderRow: f,
						moveSectionToPage: p
					}, t) : null)
				})
			})]
		})
	});
}
function z({ sectionId: e, page: t, idx: n, pages: r, renderRow: i, moveSectionToPage: a }) {
	let { attributes: o, listeners: s, setNodeRef: c, transform: l, transition: u, isDragging: f } = A({ id: e }), p = {
		transform: M.Transform.toString(l),
		transition: u,
		opacity: f ? .4 : 1
	};
	return /* @__PURE__ */ b("div", {
		ref: c,
		style: p,
		className: "flex items-center gap-1.5",
		children: [
			/* @__PURE__ */ y("button", {
				type: "button",
				"data-testid": `section-drag-handle-${e}`,
				...o,
				...s,
				className: "cursor-grab px-1 py-0.5 text-sm text-text-tertiary border-none bg-transparent select-none touch-none shrink-0",
				title: "Drag to reorder sections (or drop on another page)",
				children: "⋮⋮"
			}),
			/* @__PURE__ */ y("div", {
				className: "flex-1",
				children: i(e, t, n)
			}),
			r.length > 1 && /* @__PURE__ */ y(d, {
				"data-testid": `section-move-page-${e}`,
				size: "sm",
				className: "w-auto text-[11px]",
				value: t.id,
				onChange: (n) => a(e, t.id, n.target.value),
				title: "Move section to another page",
				options: r.map((e, t) => ({
					value: e.id,
					label: e.title || `Page ${t + 1}`
				}))
			})
		]
	});
}
function B({ fields: t, setFields: r, pages: i, setPages: a, pageConfig: o, setPageConfig: s }) {
	let [c, l] = _(i[0]?.id ?? "page-default");
	p(() => {
		i.length > 0 && !i.find((e) => e.id === c) && l(i[0].id);
	}, [i, c]);
	let u = (e) => {
		let o = n(e);
		r([...t, o]), a(i.map((e) => e.id === c ? {
			...e,
			sectionIds: [...e.sectionIds, o.id]
		} : e));
	}, d = (e, n) => {
		r(t.map((t) => t.id === e ? {
			...t,
			...n
		} : t));
	}, m = (e) => {
		r(t.filter((t) => t.id !== e)), a(i.map((t) => ({
			...t,
			sectionIds: t.sectionIds.filter((t) => t !== e)
		})));
	}, h = (e, t, n) => {
		a(i.map((r) => {
			if (r.id !== e) return r;
			let i = r.sectionIds.indexOf(t), a = i + n;
			if (i < 0 || a < 0 || a >= r.sectionIds.length) return r;
			let o = [...r.sectionIds];
			return [o[i], o[a]] = [o[a], o[i]], {
				...r,
				sectionIds: o
			};
		}));
	}, g = (e, t, n) => {
		t !== n && a(i.map((r) => r.id === t ? {
			...r,
			sectionIds: r.sectionIds.filter((t) => t !== e)
		} : r.id === n ? {
			...r,
			sectionIds: [...r.sectionIds, e]
		} : r));
	}, v = (e, t) => {
		let n = i.findIndex((t) => t.id === e), r = n + t;
		if (n < 0 || r < 0 || r >= i.length) return;
		let o = [...i];
		[o[n], o[r]] = [o[r], o[n]], a(o);
	}, A = () => {
		let e = `page-${typeof crypto < "u" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2, 10)}`;
		a([...i, {
			id: e,
			sectionIds: []
		}]), l(e);
	}, M = (e, t) => {
		a(i.map((n) => n.id === e ? {
			...n,
			title: t || void 0
		} : n));
	}, N = (e) => {
		if (i.length <= 1) return;
		let t = i.find((t) => t.id === e)?.sectionIds ?? [], n = i.filter((t) => t.id !== e);
		t.length > 0 && n.length > 0 && (n[0] = {
			...n[0],
			sectionIds: [...n[0].sectionIds, ...t]
		}), a(n), c === e && l(n[0]?.id ?? "");
	}, P = new Map(t.map((e) => [e.id, e])), F = i.length === 1, L = (e) => {
		if (i.some((t) => t.id === e)) return e;
		for (let t of i) if (t.sectionIds.includes(e)) return t.id;
	}, z = E(T(C, { activationConstraint: { distance: 5 } }), T(S, { coordinateGetter: k })), B = (e) => {
		let { active: t, over: n } = e;
		if (!n) return;
		let r = String(t.id), o = String(n.id), s = L(r), c = L(o);
		!s || !c || s !== c && (i.some((e) => e.id === r) || a(i.map((e) => e.id === s ? {
			...e,
			sectionIds: e.sectionIds.filter((e) => e !== r)
		} : e.id === c ? {
			...e,
			sectionIds: [...e.sectionIds, r]
		} : e)));
	}, V = (e) => {
		let { active: t, over: n } = e;
		if (!n) return;
		let r = String(t.id), o = String(n.id);
		if (i.some((e) => e.id === r) && i.some((e) => e.id === o)) {
			let e = i.findIndex((e) => e.id === r), t = i.findIndex((e) => e.id === o);
			e !== -1 && t !== -1 && e !== t && a(O(i, e, t));
			return;
		}
		let s = L(r);
		if (!s) return;
		let c = i.find((e) => e.id === s);
		if (!c) return;
		let l = c.sectionIds.indexOf(r), u = c.sectionIds.indexOf(o);
		l !== -1 && u !== -1 && l !== u && a(i.map((e) => e.id === s ? {
			...e,
			sectionIds: O(e.sectionIds, l, u)
		} : e));
	}, H = (e, t, n) => {
		let r = P.get(e);
		return r ? /* @__PURE__ */ y(I, {
			field: r,
			index: n,
			total: t.sectionIds.length,
			onRename: (e) => d(r.id, { name: e }),
			onChangeType: (e) => d(r.id, {
				sectionType: e,
				rendererOverrides: {}
			}),
			onRemove: () => m(r.id),
			onMoveUp: () => h(t.id, r.id, -1),
			onMoveDown: () => h(t.id, r.id, 1),
			onToggleRequired: () => d(r.id, { required: !r.required }),
			onToggleCollapsed: () => d(r.id, { defaultCollapsed: !r.defaultCollapsed })
		}, r.id) : null;
	};
	return /* @__PURE__ */ b("div", {
		className: "flex gap-5 items-start",
		children: [/* @__PURE__ */ b("div", {
			className: "flex-1 min-w-0",
			children: [
				/* @__PURE__ */ b("div", {
					className: "text-xs font-semibold text-text-primary mb-2.5 tracking-wide",
					children: ["SECTIONS ", t.length > 0 && /* @__PURE__ */ b("span", {
						className: "text-primary",
						children: [
							"(",
							t.length,
							F ? "" : ` across ${i.length} pages`,
							")"
						]
					})]
				}),
				F ? t.length === 0 ? /* @__PURE__ */ b("div", {
					className: "bg-surface border border-dashed border-border rounded-[10px] text-center py-8 px-4 text-text-tertiary text-[13px]",
					children: [/* @__PURE__ */ y("div", {
						className: "text-[28px] mb-2",
						children: "📋"
					}), "No sections yet — pick a section type →"]
				}) : /* @__PURE__ */ y("div", {
					"data-testid": "fields-list",
					children: i[0].sectionIds.map((e, t) => H(e, i[0], t))
				}) : /* @__PURE__ */ y(x, {
					sensors: z,
					collisionDetection: w,
					onDragOver: B,
					onDragEnd: V,
					children: /* @__PURE__ */ y(D, {
						items: i.map((e) => e.id),
						strategy: j,
						children: i.map((e, t) => /* @__PURE__ */ y(R, {
							page: e,
							pageIdx: t,
							totalPages: i.length,
							isActive: e.id === c,
							setActivePageId: l,
							movePage: v,
							removePage: N,
							renamePage: M,
							pages: i,
							fieldsById: P,
							renderRow: H,
							moveSectionToPage: g
						}, e.id))
					})
				}),
				/* @__PURE__ */ y("button", {
					type: "button",
					"data-testid": "add-page",
					onClick: A,
					className: "mt-2 text-xs px-3 py-1.5 font-semibold rounded-md font-inherit border border-dashed border-accent-border bg-transparent text-primary cursor-pointer",
					children: "+ Add Page"
				}),
				i.length > 1 && /* @__PURE__ */ y("div", {
					"data-testid": "page-config-toc",
					className: "mt-4 p-2.5 bg-surface-panel rounded-md text-[13px]",
					children: /* @__PURE__ */ b("label", {
						className: "flex items-center gap-2 cursor-pointer",
						children: [/* @__PURE__ */ y(f, {
							checked: o.showTableOfContents,
							onChange: (e) => s({
								...o,
								showTableOfContents: e
							})
						}), /* @__PURE__ */ y("span", { children: "Show table of contents (multi-page documents only)" })]
					})
				})
			]
		}), /* @__PURE__ */ b("div", {
			className: "w-[220px] shrink-0",
			children: [/* @__PURE__ */ y("div", {
				className: "text-xs font-semibold text-text-primary mb-2.5 tracking-wide",
				children: "SECTION TYPES"
			}), /* @__PURE__ */ y("div", {
				className: "flex flex-col gap-1.5",
				children: e().map((e) => /* @__PURE__ */ b("button", {
					"data-testid": `add-field-${e.type}`,
					type: "button",
					onClick: () => u(e.type),
					className: "flex items-center gap-2.5 py-2.5 px-3 rounded-lg w-full bg-surface border border-border cursor-pointer text-left font-inherit transition-colors hover:border-accent-border hover:bg-accent-bg",
					children: [/* @__PURE__ */ y("span", {
						className: "text-xl shrink-0",
						children: e.icon
					}), /* @__PURE__ */ b("div", { children: [/* @__PURE__ */ y("div", {
						className: "text-[13px] font-semibold text-text-primary",
						children: e.label
					}), /* @__PURE__ */ y("div", {
						className: "text-[11px] text-text-tertiary mt-px",
						children: e.description
					})] })]
				}, e.type))
			})]
		})]
	});
}
function V({ field: e, mode: n, onToggleHidden: r, onOverrideChange: i }) {
	let a = (e.hiddenInModes ?? []).includes(n), s = t(e.sectionType), c = s?.rendererKeys[n] ?? [], l = (e.rendererOverrides ?? {})[n] ?? c[0] ?? "";
	return /* @__PURE__ */ y("td", {
		className: "p-[10px_12px] align-top",
		children: /* @__PURE__ */ b("div", {
			className: "flex flex-col gap-1.5",
			children: [
				/* @__PURE__ */ b("label", {
					className: "flex items-center gap-1.5 cursor-pointer select-none",
					children: [/* @__PURE__ */ y(f, {
						"data-testid": `visibility-${e.id}-${n}`,
						checked: !a,
						onChange: r
					}), /* @__PURE__ */ y("span", {
						className: o("text-xs", a ? "text-text-tertiary" : "text-text-primary"),
						children: a ? "Hidden" : "Visible"
					})]
				}),
				!a && c.length > 0 && /* @__PURE__ */ y(d, {
					"aria-label": `${e.name} renderer in ${n} mode`,
					"data-testid": `renderer-${e.id}-${n}`,
					size: "sm",
					className: "w-auto text-[11px]",
					value: l,
					onChange: (e) => i(e.target.value),
					options: c.map((e) => ({
						value: e,
						label: s?.rendererLabels[e] ?? e
					}))
				}),
				!a && c.length === 0 && /* @__PURE__ */ y("span", {
					className: "text-[11px] text-text-tertiary",
					children: "Default renderer"
				})
			]
		})
	});
}
function H({ fields: e, setFields: n }) {
	let r = [
		"editor",
		"ack",
		"reader"
	], i = {
		editor: "Editor",
		ack: "Review",
		reader: "Read"
	}, a = (t, r) => {
		n(e.map((e) => e.id === t ? {
			...e,
			...r
		} : e));
	}, s = (t, n) => {
		let r = e.find((e) => e.id === t).hiddenInModes ?? [], i = r.includes(n);
		a(t, { hiddenInModes: i ? r.filter((e) => e !== n) : [...r, n] });
	}, c = (t, n, r) => {
		let i = e.find((e) => e.id === t);
		a(t, { rendererOverrides: {
			...i.rendererOverrides ?? {},
			[n]: r
		} });
	};
	return e.length === 0 ? /* @__PURE__ */ y("div", {
		className: "bg-surface border border-border rounded-[10px] text-center py-10 px-4 text-text-tertiary",
		children: "No fields defined — go back to Step 2 and add some fields first."
	}) : /* @__PURE__ */ b("div", {
		className: "overflow-x-auto",
		children: [/* @__PURE__ */ y("p", {
			className: "text-[13px] text-neutral mb-4",
			children: "Configure which view modes each field appears in and which renderer to use."
		}), /* @__PURE__ */ b("table", {
			className: "w-full border-collapse text-[13px]",
			children: [/* @__PURE__ */ y("thead", { children: /* @__PURE__ */ b("tr", {
				className: "bg-surface-panel",
				children: [/* @__PURE__ */ y("th", {
					className: "p-[10px_12px] text-left font-semibold text-text-primary border-b-2 border-border whitespace-nowrap",
					children: "Field"
				}), r.map((e) => /* @__PURE__ */ y("th", {
					className: "p-[10px_12px] text-left font-semibold text-text-primary border-b-2 border-border min-w-[130px]",
					children: i[e]
				}, e))]
			}) }), /* @__PURE__ */ y("tbody", { children: e.map((e, n) => {
				let i = t(e.sectionType);
				return /* @__PURE__ */ b("tr", {
					className: o("border-b border-border-subtle", n % 2 == 0 ? "bg-surface" : "bg-surface-inset"),
					children: [/* @__PURE__ */ y("td", {
						className: "p-[10px_12px] align-middle",
						children: /* @__PURE__ */ b("div", {
							className: "flex items-center gap-[7px]",
							children: [
								/* @__PURE__ */ y("span", { children: i?.icon }),
								/* @__PURE__ */ y("span", {
									className: "font-medium text-text-primary",
									children: e.name
								}),
								e.required && /* @__PURE__ */ y("span", {
									className: "text-[10px] bg-accent-bg text-accent-fg px-[5px] py-px rounded",
									children: "required"
								})
							]
						})
					}), r.map((t) => /* @__PURE__ */ y(V, {
						field: e,
						mode: t,
						onToggleHidden: () => s(e.id, t),
						onOverrideChange: (n) => c(e.id, t, n)
					}, t))]
				}, e.id);
			}) })]
		})]
	});
}
function U({ initialType: e, onSave: t, onCancel: n, idToken: a, onExportSchema: o }) {
	let [s, c] = _(e ? 2 : 1), [l, u] = _(e?.name ?? ""), [d, f] = _(e?.description ?? ""), p = e?.icon ?? "📄", [m, h] = _(e?.fields ?? []), [g, v] = _(() => e ? i(e) : [{
		id: "page-default",
		sectionIds: []
	}]), [x, S] = _(() => e ? r(e) : { showTableOfContents: !1 }), [C, w] = _(""), [T, E] = _(""), D = () => s !== 1 || l.trim().length > 0, O = () => {
		if (s === 1 && !l.trim()) {
			w("Name is required");
			return;
		}
		w(""), s < 3 ? c((e) => e + 1) : k();
	}, k = () => {
		t({
			name: l.trim(),
			description: d,
			icon: p,
			fields: m,
			pages: g,
			pageConfig: x
		});
	};
	return /* @__PURE__ */ b("div", {
		className: "flex flex-col h-full",
		children: [
			/* @__PURE__ */ y(P, {
				step: s,
				total: 3
			}),
			/* @__PURE__ */ b("div", {
				className: "flex-1 overflow-y-auto pr-1",
				children: [
					s === 1 && /* @__PURE__ */ y(L, {
						name: l,
						setName: (e) => {
							u(e), e.trim() && w("");
						},
						description: d,
						setDescription: f
					}),
					s === 2 && /* @__PURE__ */ y(B, {
						fields: m,
						setFields: h,
						pages: g,
						setPages: v,
						pageConfig: x,
						setPageConfig: S
					}),
					s === 3 && /* @__PURE__ */ y(H, {
						fields: m,
						setFields: h
					}),
					C && /* @__PURE__ */ y("div", {
						className: "text-danger-fg text-[13px] mt-2",
						children: C
					})
				]
			}),
			/* @__PURE__ */ y(F, {
				step: s,
				totalSteps: 3,
				canAdvance: D(),
				isEditing: !!e,
				onCancel: n,
				onBack: () => c((e) => e - 1),
				onNext: O,
				onExportSchema: e?.id ? async () => {
					if (e?.id) {
						E("");
						try {
							if (o) {
								await o(e);
								return;
							}
							let t = await fetch(`/api/document-types/${e.id}/schema`, { headers: a ? { Authorization: `Bearer ${a}` } : {} });
							if (!t.ok) throw Error(`Export failed: ${t.statusText}`);
							let n = await t.json(), r = new Blob([JSON.stringify(n, null, 2)], { type: "application/json" }), i = URL.createObjectURL(r), s = document.createElement("a");
							s.href = i, s.download = `${l.trim().replace(/\s+/g, "-").toLowerCase()}-schema.json`, s.click(), URL.revokeObjectURL(i);
						} catch (e) {
							E(`Export failed: ${e.message}`);
						}
					}
				} : void 0,
				exportError: T
			})
		]
	});
}
//#endregion
//#region src/components/doc-types/cookbooks/index.ts
var W = [
	"General",
	"Engineering",
	"Operations",
	"Product",
	"People",
	"Sales & CRM",
	"Finance",
	"Legal"
];
function G(e, t, n = {}) {
	return {
		id: crypto.randomUUID(),
		name: e,
		sectionType: t,
		required: n.required ?? !1,
		defaultCollapsed: n.defaultCollapsed ?? !1,
		placeholder: n.placeholder ?? "",
		hiddenInModes: n.hiddenInModes ?? [],
		rendererOverrides: {}
	};
}
function K() {
	return {
		name: "Bug Report",
		description: "Track bugs with severity, reproduction steps, and resolution notes.",
		icon: "🐛",
		fields: [
			G("Title", "text", { required: !0 }),
			G("Severity", "text", {
				required: !0,
				placeholder: "Critical / High / Medium / Low"
			}),
			G("Status", "text", {
				required: !0,
				placeholder: "Open / In Progress / Resolved / Won't Fix"
			}),
			G("Reported By", "text", { required: !0 }),
			G("Reported Date", "date", { required: !0 }),
			G("Assigned To", "text"),
			G("Environment", "text", { placeholder: "Production / Staging / Development / Local" }),
			G("Steps to Reproduce", "rich-text", {
				required: !0,
				placeholder: "Detailed steps to reproduce the issue..."
			}),
			G("Expected Behavior", "rich-text", {
				required: !0,
				placeholder: "What should happen..."
			}),
			G("Actual Behavior", "rich-text", {
				required: !0,
				placeholder: "What actually happens..."
			}),
			G("Screenshots / Evidence", "rich-text", { placeholder: "Paste screenshots or supporting evidence..." }),
			G("Root Cause", "rich-text", {
				placeholder: "What caused the issue...",
				defaultCollapsed: !0
			}),
			G("Resolution Notes", "rich-text", {
				placeholder: "How the issue was resolved...",
				defaultCollapsed: !0
			})
		]
	};
}
function q() {
	return {
		name: "Employee Onboarding",
		description: "New hire onboarding tasks, milestones, and equipment tracking.",
		icon: "👋",
		fields: [
			G("Employee Name", "text", { required: !0 }),
			G("Start Date", "date", { required: !0 }),
			G("Department", "text", {
				required: !0,
				placeholder: "Engineering / Product / Design / Sales / Marketing / Operations / HR / Finance"
			}),
			G("Manager", "text", { required: !0 }),
			G("Role Title", "text", { required: !0 }),
			G("Equipment Issued", "boolean"),
			G("Accounts Created", "boolean"),
			G("Orientation Complete", "boolean"),
			G("First Week Goals", "rich-text", { placeholder: "Goals for the first week..." }),
			G("30-Day Milestones", "rich-text", { placeholder: "What should be accomplished by day 30..." }),
			G("60-Day Milestones", "rich-text", {
				placeholder: "What should be accomplished by day 60...",
				defaultCollapsed: !0
			}),
			G("90-Day Review Date", "date"),
			G("Mentor Assigned", "text"),
			G("Notes", "rich-text")
		]
	};
}
function J() {
	return {
		name: "Invoice",
		description: "Track invoices with line items, amounts, and payment status.",
		icon: "💰",
		fields: [
			G("Invoice Number", "text", {
				required: !0,
				placeholder: "INV-0001"
			}),
			G("Issue Date", "date", { required: !0 }),
			G("Due Date", "date", { required: !0 }),
			G("Status", "text", {
				required: !0,
				placeholder: "Draft / Sent / Paid / Overdue / Void"
			}),
			G("Client Name", "text", { required: !0 }),
			G("Client Email", "text"),
			G("Line Items", "rich-text", {
				required: !0,
				placeholder: "Description of goods or services..."
			}),
			G("Subtotal", "number", { required: !0 }),
			G("Tax Rate (%)", "number"),
			G("Tax Amount", "number"),
			G("Total Amount", "number", { required: !0 }),
			G("Currency", "text", {
				required: !0,
				placeholder: "USD / EUR / GBP / CAD / AUD"
			}),
			G("Payment Terms", "text", { placeholder: "Net 15 / Net 30 / Net 60 / Due on Receipt" }),
			G("Payment Method", "text", { placeholder: "Wire / ACH / Check / Credit Card" }),
			G("Notes", "rich-text"),
			G("Paid Date", "date", { defaultCollapsed: !0 })
		]
	};
}
function Y() {
	return {
		name: "Meeting Notes",
		description: "Capture agendas, discussion points, decisions, and action items.",
		icon: "📝",
		fields: [
			G("Meeting Title", "text", { required: !0 }),
			G("Date", "date", { required: !0 }),
			G("Meeting Type", "text", {
				required: !0,
				placeholder: "Standup / Sprint Planning / Retro / 1:1 / All Hands / Design Review / Ad Hoc"
			}),
			G("Attendees", "text", { placeholder: "Comma-separated names" }),
			G("Facilitator", "text"),
			G("Agenda", "rich-text", { placeholder: "Topics to cover..." }),
			G("Discussion Notes", "rich-text", {
				required: !0,
				placeholder: "Key discussion points..."
			}),
			G("Action Items", "rich-text", { placeholder: "Who does what by when..." }),
			G("Decisions Made", "rich-text", { placeholder: "Decisions reached during the meeting..." }),
			G("Follow-Up Date", "date"),
			G("Recording Link", "text", { placeholder: "URL to meeting recording" })
		]
	};
}
function X() {
	return {
		name: "Sales Lead",
		description: "Track leads through the sales pipeline with deal values and follow-ups.",
		icon: "💼",
		fields: [
			G("Contact Name", "text", { required: !0 }),
			G("Company", "text", { required: !0 }),
			G("Email", "text", {
				required: !0,
				placeholder: "email@example.com"
			}),
			G("Phone", "text"),
			G("Lead Source", "text", {
				required: !0,
				placeholder: "Inbound / Outbound / Referral / Event / Website / Cold Call"
			}),
			G("Stage", "text", {
				required: !0,
				placeholder: "New / Contacted / Qualified / Proposal / Negotiation / Closed Won / Closed Lost"
			}),
			G("Deal Value", "number"),
			G("Currency", "text", { placeholder: "USD / EUR / GBP / CAD" }),
			G("Expected Close Date", "date"),
			G("Last Contact Date", "date"),
			G("Next Follow-Up", "date"),
			G("Owner", "text"),
			G("Notes", "rich-text"),
			G("Lost Reason", "text", {
				placeholder: "Price / Competitor / Timing / No Budget / No Response / Other",
				defaultCollapsed: !0
			})
		]
	};
}
function Z() {
	return {
		name: "Incident Report",
		description: "Document incidents with severity, timeline, root cause, and remediation.",
		icon: "🚨",
		fields: [
			G("Incident Title", "text", { required: !0 }),
			G("Severity", "text", {
				required: !0,
				placeholder: "SEV1 / SEV2 / SEV3 / SEV4"
			}),
			G("Status", "text", {
				required: !0,
				placeholder: "Investigating / Identified / Monitoring / Resolved / Postmortem"
			}),
			G("Detected At", "date", { required: !0 }),
			G("Resolved At", "date", { defaultCollapsed: !0 }),
			G("Duration", "text", {
				defaultCollapsed: !0,
				placeholder: "e.g. 2h 15m"
			}),
			G("Incident Commander", "text", { required: !0 }),
			G("Services Affected", "text", { placeholder: "Comma-separated service names" }),
			G("Customer Impact", "rich-text", {
				required: !0,
				placeholder: "Describe the user-facing impact..."
			}),
			G("Timeline", "rich-text", {
				required: !0,
				placeholder: "Chronological sequence of events..."
			}),
			G("Root Cause", "rich-text", {
				placeholder: "What caused the incident...",
				defaultCollapsed: !0
			}),
			G("Remediation Steps", "rich-text", { placeholder: "Steps taken to resolve..." }),
			G("Action Items", "rich-text", {
				placeholder: "Follow-up tasks to prevent recurrence...",
				defaultCollapsed: !0
			}),
			G("Lessons Learned", "rich-text", {
				placeholder: "What we can do better next time...",
				defaultCollapsed: !0
			}),
			G("Related Incidents", "text", { placeholder: "Links to related incident reports" })
		]
	};
}
function ee() {
	return {
		name: "RFC / Technical Proposal",
		description: "Request for comments with problem statement, proposed solution, and alternatives.",
		icon: "📨",
		fields: [
			G("RFC Title", "text", { required: !0 }),
			G("Author", "text", { required: !0 }),
			G("Status", "text", {
				required: !0,
				placeholder: "Draft / In Review / Accepted / Rejected / Superseded"
			}),
			G("Created Date", "date", { required: !0 }),
			G("Decision Date", "date", { defaultCollapsed: !0 }),
			G("Reviewers", "text", { placeholder: "Comma-separated reviewer names" }),
			G("Problem Statement", "rich-text", {
				required: !0,
				placeholder: "What problem are we solving?"
			}),
			G("Proposed Solution", "rich-text", {
				required: !0,
				placeholder: "Detailed proposal..."
			}),
			G("Alternatives Considered", "rich-text", { placeholder: "Other approaches evaluated..." }),
			G("Technical Design", "rich-text", { placeholder: "Architecture, data flow, API changes..." }),
			G("Migration Plan", "rich-text", {
				placeholder: "How to roll out the change...",
				defaultCollapsed: !0
			}),
			G("Risks", "rich-text", { placeholder: "Known risks and mitigations..." }),
			G("Open Questions", "rich-text", { placeholder: "Unresolved questions for discussion..." }),
			G("Decision", "rich-text", {
				placeholder: "Final decision and rationale...",
				defaultCollapsed: !0
			}),
			G("Superseded By", "text", {
				placeholder: "Link to successor RFC",
				defaultCollapsed: !0
			})
		]
	};
}
function te() {
	return {
		name: "Feature Request",
		description: "Capture feature requests with user stories, priority, and effort estimates.",
		icon: "💡",
		fields: [
			G("Feature Title", "text", { required: !0 }),
			G("Requested By", "text", { required: !0 }),
			G("Priority", "text", {
				required: !0,
				placeholder: "Critical / High / Medium / Low / Nice to Have"
			}),
			G("Status", "text", {
				required: !0,
				placeholder: "New / Under Review / Planned / In Progress / Shipped / Declined"
			}),
			G("Category", "text", { placeholder: "UX / Performance / Integration / New Capability / Infrastructure" }),
			G("Target Release", "text"),
			G("User Story", "rich-text", {
				required: !0,
				placeholder: "As a [user], I want [goal] so that [benefit]"
			}),
			G("Problem Description", "rich-text", {
				required: !0,
				placeholder: "What problem does this solve?"
			}),
			G("Proposed Solution", "rich-text", { placeholder: "How should this work?" }),
			G("Success Metrics", "rich-text", { placeholder: "How will we measure success?" }),
			G("Effort Estimate", "text", { placeholder: "XS / S / M / L / XL" }),
			G("Business Value", "text", { placeholder: "Revenue / Retention / Adoption / Compliance / Internal Efficiency" }),
			G("Dependencies", "rich-text", { defaultCollapsed: !0 }),
			G("Decline Reason", "rich-text", {
				placeholder: "Why was this declined?",
				defaultCollapsed: !0
			}),
			G("Ship Date", "date", { defaultCollapsed: !0 })
		]
	};
}
function ne() {
	return {
		name: "Contract / Agreement",
		description: "Track contracts with counterparty, terms, renewal dates, and status.",
		icon: "📜",
		fields: [
			G("Contract Title", "text", { required: !0 }),
			G("Contract Type", "text", {
				required: !0,
				placeholder: "NDA / MSA / SOW / SLA / Employment / Vendor / Licensing / Other"
			}),
			G("Status", "text", {
				required: !0,
				placeholder: "Draft / In Review / Pending Signature / Active / Expired / Terminated"
			}),
			G("Counterparty", "text", { required: !0 }),
			G("Effective Date", "date", { required: !0 }),
			G("Expiration Date", "date"),
			G("Auto-Renew", "boolean"),
			G("Renewal Term", "text", {
				placeholder: "Monthly / Quarterly / Annual / Biennial",
				defaultCollapsed: !0
			}),
			G("Contract Value", "number"),
			G("Currency", "text", { placeholder: "USD / EUR / GBP / CAD" }),
			G("Payment Terms", "text", { placeholder: "Net 15 / Net 30 / Net 60 / Upfront" }),
			G("Internal Owner", "text", { required: !0 }),
			G("Key Terms", "rich-text", { placeholder: "Important clauses and obligations..." }),
			G("Termination Clause", "rich-text", { defaultCollapsed: !0 }),
			G("Notes", "rich-text"),
			G("Termination Date", "date", { defaultCollapsed: !0 }),
			G("Termination Reason", "rich-text", {
				placeholder: "Why was this terminated?",
				defaultCollapsed: !0
			})
		]
	};
}
function re() {
	return {
		name: "Sprint Retrospective",
		description: "Reflect on the sprint with what went well, what didn't, and action items.",
		icon: "🔄",
		fields: [
			G("Sprint Name", "text", { required: !0 }),
			G("Sprint Dates", "text", {
				required: !0,
				placeholder: "Jan 6 – Jan 17"
			}),
			G("Facilitator", "text"),
			G("Team", "text", { required: !0 }),
			G("Velocity", "number"),
			G("Planned Points", "number"),
			G("Completed Points", "number"),
			G("What Went Well", "rich-text", {
				required: !0,
				placeholder: "Celebrate wins..."
			}),
			G("What Didn't Go Well", "rich-text", {
				required: !0,
				placeholder: "Identify pain points..."
			}),
			G("Start Doing", "rich-text", { placeholder: "New practices to adopt..." }),
			G("Stop Doing", "rich-text", { placeholder: "Practices to drop..." }),
			G("Continue Doing", "rich-text", { placeholder: "Practices to keep..." }),
			G("Action Items", "rich-text", {
				required: !0,
				placeholder: "Specific follow-up tasks..."
			}),
			G("Action Item Owners", "text", { placeholder: "Comma-separated names" }),
			G("Follow-Up Date", "date"),
			G("Overall Sentiment", "text", {
				required: !0,
				placeholder: "Great / Good / Mixed / Rough"
			})
		]
	};
}
function ie() {
	return {
		name: "Job Posting",
		description: "Job listings with requirements, compensation, and hiring status.",
		icon: "📋",
		fields: [
			G("Job Title", "text", { required: !0 }),
			G("Department", "text", {
				required: !0,
				placeholder: "Engineering / Product / Design / Sales / Marketing / Operations / HR / Finance / Legal"
			}),
			G("Location", "text", {
				required: !0,
				placeholder: "Remote / Hybrid / On-site"
			}),
			G("Office Location", "text", { defaultCollapsed: !0 }),
			G("Employment Type", "text", {
				required: !0,
				placeholder: "Full-time / Part-time / Contract / Intern"
			}),
			G("Level", "text", {
				required: !0,
				placeholder: "Junior / Mid / Senior / Staff / Principal / Director / VP"
			}),
			G("Status", "text", {
				required: !0,
				placeholder: "Draft / Open / On Hold / Filled / Closed"
			}),
			G("Hiring Manager", "text", { required: !0 }),
			G("Salary Range Min", "number"),
			G("Salary Range Max", "number"),
			G("Currency", "text", { placeholder: "USD / EUR / GBP / CAD" }),
			G("Job Description", "rich-text", {
				required: !0,
				placeholder: "Role overview and responsibilities..."
			}),
			G("Requirements", "rich-text", {
				required: !0,
				placeholder: "Must-have qualifications..."
			}),
			G("Nice to Have", "rich-text", { placeholder: "Preferred but not required..." }),
			G("Benefits", "rich-text", { placeholder: "Compensation and perks..." }),
			G("Posted Date", "date"),
			G("Closing Date", "date"),
			G("Filled By", "text", { defaultCollapsed: !0 }),
			G("Filled Date", "date", { defaultCollapsed: !0 })
		]
	};
}
function ae() {
	return {
		name: "Vendor Evaluation",
		description: "Evaluate vendors with scoring, compliance checks, and recommendations.",
		icon: "🔍",
		fields: [
			G("Vendor Name", "text", { required: !0 }),
			G("Category", "text", {
				required: !0,
				placeholder: "SaaS / Infrastructure / Consulting / Hardware / Staffing / Other"
			}),
			G("Evaluation Status", "text", {
				required: !0,
				placeholder: "Researching / In Trial / Evaluating / Approved / Rejected / Active Vendor"
			}),
			G("Evaluator", "text", { required: !0 }),
			G("Evaluation Date", "date", { required: !0 }),
			G("Website", "text"),
			G("Primary Contact", "text"),
			G("Annual Cost", "number"),
			G("Currency", "text", { placeholder: "USD / EUR / GBP / CAD" }),
			G("Contract Length", "text", { placeholder: "Monthly / Annual / Multi-Year" }),
			G("Security Review Complete", "boolean"),
			G("SOC2 Compliant", "boolean"),
			G("GDPR Compliant", "boolean"),
			G("Strengths", "rich-text", { placeholder: "Key advantages..." }),
			G("Weaknesses", "rich-text", { placeholder: "Gaps and concerns..." }),
			G("Integration Requirements", "rich-text", { placeholder: "Technical integration needs..." }),
			G("Score (1–10)", "number"),
			G("Recommendation", "rich-text", { placeholder: "Final recommendation..." }),
			G("Rejection Reason", "rich-text", {
				placeholder: "Why was this vendor rejected?",
				defaultCollapsed: !0
			})
		]
	};
}
function oe() {
	return {
		name: "Project Status Report",
		description: "Weekly project status with health indicators, accomplishments, and risks.",
		icon: "📊",
		fields: [
			G("Project Name", "text", { required: !0 }),
			G("Reporting Period", "text", {
				required: !0,
				placeholder: "Week of Jan 6, 2025"
			}),
			G("Project Lead", "text", { required: !0 }),
			G("Overall Status", "text", {
				required: !0,
				placeholder: "On Track / At Risk / Blocked / Complete"
			}),
			G("Health: Scope", "text", {
				required: !0,
				placeholder: "Green / Yellow / Red"
			}),
			G("Health: Timeline", "text", {
				required: !0,
				placeholder: "Green / Yellow / Red"
			}),
			G("Health: Budget", "text", {
				required: !0,
				placeholder: "Green / Yellow / Red"
			}),
			G("Percent Complete", "number"),
			G("Summary", "rich-text", {
				required: !0,
				placeholder: "High-level status overview..."
			}),
			G("Accomplishments This Period", "rich-text", {
				required: !0,
				placeholder: "What was delivered..."
			}),
			G("Planned Next Period", "rich-text", {
				required: !0,
				placeholder: "What's coming up..."
			}),
			G("Risks & Issues", "rich-text", { placeholder: "Active risks and open issues..." }),
			G("Blockers", "rich-text", {
				placeholder: "Blocking items requiring escalation...",
				defaultCollapsed: !0
			}),
			G("Decisions Needed", "rich-text", { placeholder: "Pending decisions from stakeholders..." }),
			G("Budget Spent", "number"),
			G("Budget Remaining", "number"),
			G("Target Completion Date", "date"),
			G("Stakeholder Notes", "rich-text", { defaultCollapsed: !0 })
		]
	};
}
function se() {
	return {
		name: "Change Request",
		description: "Formalized change management with risk assessment and rollback plans.",
		icon: "🔄",
		fields: [
			G("Change Title", "text", { required: !0 }),
			G("Change ID", "text", {
				required: !0,
				placeholder: "CR-0001"
			}),
			G("Requester", "text", { required: !0 }),
			G("Request Date", "date", { required: !0 }),
			G("Priority", "text", {
				required: !0,
				placeholder: "Emergency / High / Medium / Low"
			}),
			G("Status", "text", {
				required: !0,
				placeholder: "Submitted / Under Review / Approved / Scheduled / In Progress / Completed / Rolled Back / Rejected"
			}),
			G("Change Type", "text", {
				required: !0,
				placeholder: "Standard / Normal / Emergency"
			}),
			G("Systems Affected", "text", { placeholder: "Comma-separated system names" }),
			G("Description of Change", "rich-text", {
				required: !0,
				placeholder: "What is being changed and why..."
			}),
			G("Business Justification", "rich-text", {
				required: !0,
				placeholder: "Why this change is needed..."
			}),
			G("Risk Assessment", "text", {
				required: !0,
				placeholder: "Low / Medium / High / Critical"
			}),
			G("Risk Mitigation", "rich-text", {
				placeholder: "Steps to reduce risk...",
				defaultCollapsed: !0
			}),
			G("Rollback Plan", "rich-text", {
				required: !0,
				placeholder: "How to revert if something goes wrong..."
			}),
			G("Scheduled Date", "date", { defaultCollapsed: !0 }),
			G("Implementation Notes", "rich-text", {
				placeholder: "Notes from the change window...",
				defaultCollapsed: !0
			}),
			G("Approver", "text"),
			G("Approval Date", "date", { defaultCollapsed: !0 }),
			G("Post-Implementation Review", "rich-text", {
				placeholder: "Review after the change is complete...",
				defaultCollapsed: !0
			})
		]
	};
}
var Q = [
	{
		id: "meeting-notes",
		name: "Meeting Notes",
		description: "Capture agendas, discussion points, decisions, and action items.",
		icon: "📝",
		category: "General",
		tags: [
			"meetings",
			"notes",
			"action items",
			"decisions"
		],
		build: Y
	},
	{
		id: "bug-report",
		name: "Bug Report",
		description: "Track bugs with severity, reproduction steps, and resolution notes.",
		icon: "🐛",
		category: "Engineering",
		tags: [
			"bugs",
			"qa",
			"testing",
			"defects"
		],
		build: K
	},
	{
		id: "rfc",
		name: "RFC / Technical Proposal",
		description: "Request for comments with problem statement, proposed solution, and alternatives.",
		icon: "📨",
		category: "Engineering",
		tags: [
			"rfc",
			"proposal",
			"architecture",
			"design"
		],
		build: ee
	},
	{
		id: "sprint-retro",
		name: "Sprint Retrospective",
		description: "Reflect on the sprint with what went well, what didn't, and action items.",
		icon: "🔄",
		category: "Engineering",
		tags: [
			"agile",
			"sprint",
			"retro",
			"retrospective"
		],
		build: re
	},
	{
		id: "incident-report",
		name: "Incident Report",
		description: "Document incidents with severity, timeline, root cause, and remediation.",
		icon: "🚨",
		category: "Operations",
		tags: [
			"incidents",
			"postmortem",
			"sev",
			"outage"
		],
		build: Z
	},
	{
		id: "vendor-evaluation",
		name: "Vendor Evaluation",
		description: "Evaluate vendors with scoring, compliance checks, and recommendations.",
		icon: "🔍",
		category: "Operations",
		tags: [
			"vendors",
			"procurement",
			"evaluation",
			"compliance"
		],
		build: ae
	},
	{
		id: "change-request",
		name: "Change Request",
		description: "Formalized change management with risk assessment and rollback plans.",
		icon: "🔄",
		category: "Operations",
		tags: [
			"change",
			"itil",
			"rollback",
			"risk"
		],
		build: se
	},
	{
		id: "feature-request",
		name: "Feature Request",
		description: "Capture feature requests with user stories, priority, and effort estimates.",
		icon: "💡",
		category: "Product",
		tags: [
			"features",
			"product",
			"backlog",
			"user stories"
		],
		build: te
	},
	{
		id: "status-report",
		name: "Project Status Report",
		description: "Weekly project status with health indicators, accomplishments, and risks.",
		icon: "📊",
		category: "Product",
		tags: [
			"status",
			"project",
			"reporting",
			"weekly"
		],
		build: oe
	},
	{
		id: "onboarding",
		name: "Employee Onboarding",
		description: "New hire onboarding tasks, milestones, and equipment tracking.",
		icon: "👋",
		category: "People",
		tags: [
			"onboarding",
			"hr",
			"new hire",
			"checklist"
		],
		build: q
	},
	{
		id: "job-posting",
		name: "Job Posting",
		description: "Job listings with requirements, compensation, and hiring status.",
		icon: "📋",
		category: "People",
		tags: [
			"hiring",
			"recruiting",
			"jobs",
			"positions"
		],
		build: ie
	},
	{
		id: "sales-lead",
		name: "Sales Lead",
		description: "Track leads through the sales pipeline with deal values and follow-ups.",
		icon: "💼",
		category: "Sales & CRM",
		tags: [
			"sales",
			"crm",
			"leads",
			"pipeline",
			"deals"
		],
		build: X
	},
	{
		id: "invoice",
		name: "Invoice",
		description: "Track invoices with line items, amounts, and payment status.",
		icon: "💰",
		category: "Finance",
		tags: [
			"invoices",
			"billing",
			"payments",
			"accounting"
		],
		build: J
	},
	{
		id: "contract",
		name: "Contract / Agreement",
		description: "Track contracts with counterparty, terms, renewal dates, and status.",
		icon: "📜",
		category: "Legal",
		tags: [
			"contracts",
			"legal",
			"agreements",
			"nda",
			"sow"
		],
		build: ne
	}
];
//#endregion
//#region src/components/doc-types/CookbooksModal.tsx
function ce({ cookbook: e, onPick: t }) {
	return /* @__PURE__ */ b("div", {
		"data-testid": `cookbook-card-${e.id}`,
		className: "flex flex-col gap-2 w-[220px] min-h-[200px] p-3.5 bg-surface border border-border rounded-[10px] font-inherit",
		children: [
			/* @__PURE__ */ b("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ y("span", {
					className: "text-2xl",
					"aria-hidden": !0,
					children: e.icon
				}), /* @__PURE__ */ y("div", {
					className: "text-sm font-bold text-text-primary overflow-hidden text-ellipsis",
					children: e.name
				})]
			}),
			/* @__PURE__ */ y("div", {
				className: "text-[11px] text-text-tertiary flex gap-2",
				children: /* @__PURE__ */ y("span", { children: e.category })
			}),
			/* @__PURE__ */ y("div", {
				className: "text-xs text-text-secondary leading-[1.4] flex-1",
				children: e.description
			}),
			e.tags.length > 0 && /* @__PURE__ */ y("div", {
				className: "flex flex-wrap gap-1",
				children: e.tags.map((e) => /* @__PURE__ */ y("span", {
					className: "text-[10px] font-semibold py-0.5 px-1.5 rounded bg-surface-hover text-text-secondary lowercase",
					children: e
				}, e))
			}),
			/* @__PURE__ */ y("button", {
				type: "button",
				"data-testid": `cookbook-use-${e.id}`,
				onClick: () => t(e),
				className: "mt-auto py-1.5 px-2.5 text-xs font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-inherit",
				children: "Install"
			})
		]
	});
}
function $({ open: e, onClose: t, onCreated: n, createType: r }) {
	let [i, a] = _(""), [c, u] = _("All"), [d, f] = _(!1), [m, v] = _(null), x = g(null);
	p(() => {
		if (!e) return;
		a(""), u("All");
		let t = setTimeout(() => x.current?.focus(), 30);
		return () => clearTimeout(t);
	}, [e]);
	let S = h(() => {
		let e = Q;
		c !== "All" && (e = e.filter((e) => e.category === c));
		let t = i.trim().toLowerCase();
		return t && (e = e.filter((e) => e.name.toLowerCase().includes(t) || e.description.toLowerCase().includes(t) || e.tags.some((e) => e.toLowerCase().includes(t)) || e.category.toLowerCase().includes(t))), e;
	}, [i, c]), C = async (e) => {
		if (!d) {
			f(!0), v(null);
			try {
				let i = await r(e.build());
				if (i.status === "rejected") {
					v(i.error);
					return;
				}
				t(), n(i.type.id);
			} catch (e) {
				v(e instanceof Error ? e.message : String(e));
			} finally {
				f(!1);
			}
		}
	};
	return /* @__PURE__ */ b(s, {
		open: e,
		onClose: t,
		title: "Document type cookbooks",
		maxWidth: 800,
		backdropTestId: "cookbooks-modal",
		rawChildren: !0,
		children: [
			/* @__PURE__ */ y("div", {
				className: "text-[13px] text-text-secondary mb-3",
				children: "Install a prebuilt document type. You can customize the fields after installing."
			}),
			/* @__PURE__ */ b("div", {
				role: "group",
				"aria-label": "Filter by category",
				className: "flex flex-wrap gap-1.5 mb-2.5",
				children: [/* @__PURE__ */ y("button", {
					type: "button",
					"data-testid": "cookbook-cat-all",
					"aria-pressed": c === "All",
					onClick: () => u("All"),
					className: o("py-1 px-2.5 text-[11px] font-semibold rounded-xl border-none cursor-pointer font-inherit", c === "All" ? "bg-primary text-white" : "bg-surface-hover text-text-secondary"),
					children: "All"
				}), W.map((e) => /* @__PURE__ */ y("button", {
					type: "button",
					"data-testid": `cookbook-cat-${e.toLowerCase().replace(/[^a-z]/g, "-")}`,
					"aria-pressed": c === e,
					onClick: () => u(e),
					className: o("py-1 px-2.5 text-[11px] font-semibold rounded-xl border-none cursor-pointer font-inherit", c === e ? "bg-primary text-white" : "bg-surface-hover text-text-secondary"),
					children: e
				}, e))]
			}),
			/* @__PURE__ */ y(l, {
				ref: x,
				type: "search",
				"data-testid": "cookbooks-search",
				"aria-label": "Search cookbooks",
				placeholder: "Search cookbooks...",
				value: i,
				onChange: (e) => a(e.target.value),
				onKeyDown: (e) => {
					e.key === "Enter" && S.length > 0 && (e.preventDefault(), C(S[0]));
				},
				className: "mb-3.5"
			}),
			m && /* @__PURE__ */ b("div", {
				"data-testid": "cookbooks-save-error",
				role: "alert",
				className: "mb-3 rounded border border-danger-border bg-danger-bg px-3 py-2 text-[13px] text-danger-fg",
				children: ["Couldn’t create that type: ", m]
			}),
			S.length === 0 ? /* @__PURE__ */ b("div", {
				"data-testid": "cookbooks-empty",
				className: "text-center py-8 text-[13px] text-text-tertiary",
				children: [
					"No cookbooks match \"",
					i,
					"\"."
				]
			}) : /* @__PURE__ */ y("div", {
				"data-testid": "cookbooks-grid",
				className: "grid grid-cols-[repeat(3,220px)] gap-3 justify-center max-h-[60vh] overflow-y-auto p-1",
				children: S.map((e) => /* @__PURE__ */ y(ce, {
					cookbook: e,
					onPick: C
				}, e.id))
			})
		]
	});
}
//#endregion
//#region src/components/doc-types/DocumentTypesPage.tsx
function le({ typeName: e, onConfirm: t, onCancel: n }) {
	return /* @__PURE__ */ b(s, {
		open: !0,
		onClose: n,
		maxWidth: 380,
		backdropTestId: "delete-modal",
		footer: /* @__PURE__ */ b(v, { children: [/* @__PURE__ */ y("button", {
			"data-testid": "cancel-delete",
			onClick: n,
			className: "py-[7px] px-[18px] text-[13px] font-semibold bg-surface border border-border-field rounded-[7px] cursor-pointer font-inherit",
			children: "Cancel"
		}), /* @__PURE__ */ y("button", {
			"data-testid": "confirm-delete",
			onClick: t,
			className: "py-[7px] px-[18px] text-[13px] font-semibold bg-danger text-white border-none rounded-[7px] cursor-pointer font-inherit",
			children: "Delete"
		})] }),
		children: [/* @__PURE__ */ y("div", {
			className: "text-base font-semibold text-text-primary mb-2.5",
			children: "Delete document type?"
		}), /* @__PURE__ */ b("p", {
			className: "text-[13px] text-neutral m-0",
			children: [/* @__PURE__ */ b("strong", { children: [
				"\"",
				e,
				"\""
			] }), " will be permanently removed. Documents already created from this type are unaffected."]
		})]
	});
}
function ue({ type: e, active: t, onSelect: n, onDeleteRequest: r }) {
	return /* @__PURE__ */ b("div", {
		"data-testid": `type-item-${e.id}`,
		className: o("flex items-center gap-2 py-2 px-2.5 rounded-[7px] mb-0.5 transition-colors", t ? "bg-accent-bg border border-accent-border" : "bg-transparent border border-transparent"),
		children: [
			/* @__PURE__ */ y("span", {
				className: "text-lg shrink-0",
				children: e.icon
			}),
			/* @__PURE__ */ b("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ y("div", {
					className: "text-[13px] font-medium text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.name
				}), /* @__PURE__ */ b("div", {
					className: "text-[11px] text-text-tertiary",
					children: [
						e.fields.length,
						" field",
						e.fields.length === 1 ? "" : "s"
					]
				})]
			}),
			/* @__PURE__ */ y("button", {
				"data-testid": `edit-type-${e.id}`,
				onClick: n,
				title: "Edit type",
				className: o("border border-transparent cursor-pointer text-xs px-2 py-[3px] shrink-0 leading-none rounded font-semibold font-inherit hover:bg-accent-bg hover:text-accent-fg", t ? "bg-accent-border text-accent-fg" : "bg-transparent text-text-tertiary"),
				children: "Edit"
			}),
			/* @__PURE__ */ y("button", {
				"data-testid": `delete-type-${e.id}`,
				onClick: (e) => {
					e.stopPropagation(), r();
				},
				title: "Delete type",
				className: "bg-transparent border-none text-danger-fg cursor-pointer text-base px-[5px] py-0.5 shrink-0 opacity-55 leading-none rounded hover:opacity-100",
				children: "×"
			})
		]
	});
}
function de({ idToken: e, onExportSchema: t } = {}) {
	let { types: n, source: r, error: i, createType: s, updateType: l, deleteType: u } = a({ idToken: e }), [d, f] = _("idle"), [p, m] = _(null), [h, g] = _(null), [v, x] = _(!1), [S, C] = _(null), w = p ? n.find((e) => e.id === p) : void 0, T = () => {
		m(null), f("create"), C(null);
	}, E = (e) => {
		m(e.id), f("edit"), C(null);
	}, D = async (e) => {
		let t = d === "edit" && p ? "updated" : "created", n = d === "edit" && p ? await l(p, e) : await s(e);
		if (n.status === "rejected") {
			C({
				text: `"${e.name}" NOT saved — server rejected it (${n.error})`,
				key: Date.now(),
				tone: "error"
			});
			return;
		}
		C(n.status === "synced" ? {
			text: `"${e.name}" ${t} — synced`,
			key: Date.now(),
			tone: "success"
		} : {
			text: `"${e.name}" ${t} — offline (saved locally, server unreachable)`,
			key: Date.now(),
			tone: "offline"
		}), f("idle"), m(null);
	}, O = () => {
		f("idle"), m(null);
	}, k = (e) => {
		g(e);
	}, A = async () => {
		if (!h) return;
		let e = n.find((e) => e.id === h), t = await u(h);
		if (t.status === "rejected") {
			C({
				text: `"${e?.name ?? h}" NOT deleted — server rejected it (${t.error})`,
				key: Date.now(),
				tone: "error"
			}), g(null);
			return;
		}
		p === h && (f("idle"), m(null)), g(null);
	}, j = () => {
		g(null);
	}, M = (e) => {
		m(e), f("edit"), C(null);
	}, N = h ? n.find((e) => e.id === h) : null;
	return /* @__PURE__ */ b("div", {
		className: "flex h-full overflow-hidden font-inherit",
		children: [
			/* @__PURE__ */ b("div", {
				className: "w-[264px] shrink-0 border-r border-border flex flex-col overflow-hidden bg-surface-inset",
				children: [
					/* @__PURE__ */ b("div", {
						className: "py-3.5 px-4 border-b border-border flex flex-col gap-2.5",
						children: [/* @__PURE__ */ y("span", {
							className: "text-[13px] font-bold text-text-primary",
							children: "Document Types"
						}), /* @__PURE__ */ b("div", {
							className: "flex gap-1.5",
							children: [/* @__PURE__ */ y("button", {
								"data-testid": "cookbooks-btn",
								onClick: () => x(!0),
								className: "py-[5px] px-3 text-xs font-semibold bg-surface text-primary border border-primary rounded-md cursor-pointer font-inherit whitespace-nowrap",
								children: "Cookbooks"
							}), /* @__PURE__ */ y("button", {
								"data-testid": "create-type-btn",
								onClick: T,
								className: "py-[5px] px-3 text-xs font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-inherit whitespace-nowrap",
								children: "+ New"
							})]
						})]
					}),
					/* @__PURE__ */ y("div", {
						className: "flex-1 overflow-y-auto p-2",
						"data-testid": "type-list",
						children: n.length === 0 ? /* @__PURE__ */ b("div", {
							className: "py-8 px-4 flex flex-col items-center gap-2",
							children: [/* @__PURE__ */ y("div", {
								className: "text-text-tertiary text-[13px]",
								children: "No types yet."
							}), /* @__PURE__ */ y("button", {
								onClick: T,
								className: "bg-transparent border-none text-primary text-[13px] font-medium cursor-pointer py-1 px-2 font-inherit",
								children: "Create one →"
							})]
						}) : n.map((e) => /* @__PURE__ */ y(ue, {
							type: e,
							active: p === e.id,
							onSelect: () => E(e),
							onDeleteRequest: () => k(e.id)
						}, e.id))
					}),
					r === "cache" && /* @__PURE__ */ b("div", {
						"data-testid": "types-offline-notice",
						className: "py-2 px-3.5 border-t border-warning-border bg-warning-bg text-xs text-warning-fg font-medium",
						children: [
							"⚠ Offline — showing cached types (",
							i ?? "server unreachable",
							")"
						]
					}),
					S && /* @__PURE__ */ b("div", {
						"data-testid": "save-message",
						className: o("py-2 px-3.5 border-t text-xs font-medium", S.tone === "success" && "border-success-border bg-success-bg text-success-fg", S.tone === "offline" && "border-warning-border bg-warning-bg text-warning-fg", S.tone === "error" && "border-danger-border bg-danger-bg text-danger-fg"),
						children: [
							S.tone === "error" ? "✗" : "✓",
							" ",
							S.text
						]
					}, S.key)
				]
			}),
			/* @__PURE__ */ b("div", {
				className: "flex-1 overflow-y-auto py-7 px-9",
				"data-testid": "right-panel",
				children: [d === "idle" && /* @__PURE__ */ y(c, {
					testId: "idle-panel",
					actionTestId: "idle-create-btn",
					icon: "📋",
					title: n.length > 0 ? "Select a type to edit" : "No document types yet",
					body: n.length > 0 ? "Choose a type from the list to edit its fields and view modes." : "Document types define the structure and fields for your documents.",
					actionLabel: n.length > 0 ? void 0 : "+ Create Document Type",
					onAction: n.length > 0 ? void 0 : T
				}), (d === "create" || d === "edit") && /* @__PURE__ */ y(U, {
					initialType: w,
					idToken: e,
					onSave: D,
					onCancel: O,
					onExportSchema: t
				}, p ?? "create")]
			}),
			h && N && /* @__PURE__ */ y(le, {
				typeName: N.name,
				onConfirm: A,
				onCancel: j
			}),
			/* @__PURE__ */ y($, {
				open: v,
				onClose: () => x(!1),
				onCreated: M,
				createType: s
			})
		]
	});
}
//#endregion
export { W as COOKBOOK_CATEGORIES, $ as CookbooksModal, U as DocumentTypeWizard, de as DocumentTypesPage, I as FieldDefinitionEditor, P as StepIndicator, F as WizardStepNavigation, Q as documentTypeCookbooks };
