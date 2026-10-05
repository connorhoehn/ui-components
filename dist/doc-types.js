import { n as e, t } from "./registry-DbX3MVAA.js";
import { i as n, n as r, r as i } from "./documentType-rRZpKWbO.js";
import { i as a } from "./useDocumentTypes-C2XnlxHz.js";
import { t as o } from "./cn-D4QmbyEy.js";
import { v as s } from "./overlayStack-DWxp7Rsz.js";
import { n as c } from "./Stack-DNMA-_4L.js";
import { t as l } from "./Modal-R-ipbeZi.js";
import { t as u } from "./Input-CpLq80dw.js";
import { t as d } from "./EmptyState-DnbFBYDA.js";
import { t as f } from "./Textarea-Drx4YDDG.js";
import { t as p } from "./PageHeader-Dx_prus4.js";
import { t as m } from "./Select-ErGXS9Yj.js";
import { t as h } from "./Checkbox-BC03mkQI.js";
import { G as g, H as _, U as v, W as y } from "./renderers-B4G34vmP.js";
import { useEffect as b, useId as x, useMemo as S, useRef as C, useState as w } from "react";
import { Fragment as T, jsx as E, jsxs as D } from "react/jsx-runtime";
import { DndContext as O, KeyboardSensor as k, PointerSensor as A, closestCorners as j, useSensor as M, useSensors as N } from "@dnd-kit/core";
import { SortableContext as P, arrayMove as F, sortableKeyboardCoordinates as I, useSortable as L, verticalListSortingStrategy as R } from "@dnd-kit/sortable";
import { CSS as z } from "@dnd-kit/utilities";
//#region src/components/doc-types/WizardStepNavigation.tsx
var B = [
	"Basic Info",
	"Sections",
	"View Modes"
];
function V({ step: e, total: t }) {
	return /* @__PURE__ */ E("div", {
		className: "flex items-center gap-0 mb-7",
		children: Array.from({ length: t }, (n, r) => {
			let i = r + 1, a = i === e, s = i < e;
			return /* @__PURE__ */ D("div", {
				className: "flex items-center",
				children: [
					/* @__PURE__ */ E("div", {
						className: o("w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold", s && "bg-primary text-on-primary border-2 border-transparent", a && "bg-accent-bg text-accent-fg border-2 border-primary", !s && !a && "bg-surface-hover text-text-tertiary border-2 border-transparent"),
						children: s ? "✓" : i
					}),
					/* @__PURE__ */ E("span", {
						className: o("ml-1.5 text-xs whitespace-nowrap", a ? "font-semibold text-text-primary" : "font-normal text-text-tertiary"),
						children: B[r]
					}),
					i < t && /* @__PURE__ */ E("div", { className: "w-8 h-px bg-border mx-2.5 shrink-0" })
				]
			}, i);
		})
	});
}
function H({ step: e, totalSteps: t, canAdvance: n, isEditing: r, onCancel: i, onBack: a, onNext: s, onExportSchema: c, exportError: l }) {
	return /* @__PURE__ */ D("div", {
		className: "flex items-center justify-between pt-4 border-t border-border mt-4 shrink-0",
		children: [/* @__PURE__ */ D("div", {
			className: "flex gap-2",
			children: [
				/* @__PURE__ */ E("button", {
					type: "button",
					onClick: i,
					className: "px-4 py-[7px] text-[13px] font-semibold rounded-[7px] cursor-pointer font-inherit bg-transparent border-none text-neutral",
					children: "Cancel"
				}),
				c && /* @__PURE__ */ E("button", {
					type: "button",
					onClick: c,
					title: "Download JSON Schema",
					className: "px-4 py-[7px] text-[13px] font-semibold rounded-[7px] cursor-pointer font-inherit bg-surface text-text-primary border border-border-field",
					children: "Export Schema"
				}),
				l && /* @__PURE__ */ E("div", {
					"data-testid": "export-schema-error",
					role: "alert",
					className: "text-danger-fg text-[13px] self-center",
					children: l
				})
			]
		}), /* @__PURE__ */ D("div", {
			className: "flex gap-2",
			children: [e > 1 && /* @__PURE__ */ E("button", {
				type: "button",
				onClick: a,
				className: "px-4 py-[7px] text-[13px] font-semibold rounded-[7px] cursor-pointer font-inherit bg-surface text-text-primary border border-border-field",
				children: "← Back"
			}), /* @__PURE__ */ E("button", {
				type: "button",
				"data-testid": "wizard-next",
				onClick: s,
				disabled: !n,
				className: o("px-4 py-[7px] text-[13px] font-semibold rounded-[7px] font-inherit border-none bg-primary text-on-primary", n ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-50"),
				children: e === t ? r ? "Save Changes" : "Create Type" : "Next →"
			})]
		})]
	});
}
//#endregion
//#region src/components/doc-types/FieldDefinitionEditor.tsx
function U({ field: n, index: r, total: i, onRename: a, onChangeType: s, onRemove: c, onMoveUp: l, onMoveDown: d, onToggleRequired: f, onToggleCollapsed: p }) {
	let h = t(n.sectionType), g = e(), _ = n.name.trim() || `Section ${r + 1}`;
	return /* @__PURE__ */ D("div", {
		className: "flex items-center gap-2 py-2 px-2.5 rounded-lg bg-surface-panel border border-border mb-1.5",
		children: [
			/* @__PURE__ */ D("div", {
				className: "flex flex-col gap-px shrink-0",
				children: [/* @__PURE__ */ E("button", {
					type: "button",
					disabled: r === 0,
					onClick: l,
					"data-testid": `field-up-${n.id}`,
					"aria-label": `Move ${n.name} up`,
					className: o("px-1 py-px text-[10px] leading-none font-semibold rounded-[7px] font-inherit border-none bg-transparent", r === 0 ? "text-neutral opacity-50 cursor-not-allowed" : "text-neutral cursor-pointer"),
					children: "▲"
				}), /* @__PURE__ */ E("button", {
					type: "button",
					disabled: r === i - 1,
					onClick: d,
					"data-testid": `field-down-${n.id}`,
					"aria-label": `Move ${n.name} down`,
					className: o("px-1 py-px text-[10px] leading-none font-semibold rounded-[7px] font-inherit border-none bg-transparent", r === i - 1 ? "text-neutral opacity-50 cursor-not-allowed" : "text-neutral cursor-pointer"),
					children: "▼"
				})]
			}),
			/* @__PURE__ */ E("span", {
				className: "text-base shrink-0",
				children: h?.icon ?? "📄"
			}),
			/* @__PURE__ */ E(u, {
				"aria-label": `${_} name`,
				"data-testid": `field-name-${n.id}`,
				size: "sm",
				value: n.name,
				onChange: (e) => a(e.target.value),
				className: "flex-1 min-w-0 bg-transparent border-transparent focus:border-accent-border focus:bg-surface"
			}),
			/* @__PURE__ */ E(m, {
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
			/* @__PURE__ */ E("button", {
				type: "button",
				onClick: f,
				"data-testid": `field-required-${n.id}`,
				title: "Required",
				className: o("px-2 py-[3px] text-[11px] font-semibold rounded-[7px] font-inherit shrink-0 cursor-pointer", n.required ? "bg-accent-bg text-accent-fg border border-accent-border" : "bg-surface-panel text-text-tertiary border border-border"),
				children: "Required"
			}),
			/* @__PURE__ */ E("button", {
				type: "button",
				onClick: p,
				"data-testid": `field-collapsed-${n.id}`,
				title: "Collapsed by default",
				className: o("px-2 py-[3px] text-[11px] font-semibold rounded-[7px] font-inherit shrink-0 cursor-pointer", n.defaultCollapsed ? "bg-success-bg text-success-fg border border-success-border" : "bg-surface-panel text-text-tertiary border border-border"),
				children: "Collapsed"
			}),
			/* @__PURE__ */ E("button", {
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
function W({ name: e, setName: t, description: n, setDescription: r }) {
	let i = x();
	return /* @__PURE__ */ D("div", {
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ D("div", { children: [/* @__PURE__ */ D("label", {
			htmlFor: `${i}-name`,
			className: "block text-xs font-semibold text-text-primary mb-[5px] tracking-wide",
			children: ["Name ", /* @__PURE__ */ E("span", {
				"aria-hidden": "true",
				className: "text-danger-fg",
				children: "*"
			})]
		}), /* @__PURE__ */ E(u, {
			id: `${i}-name`,
			"aria-required": "true",
			"data-testid": "name-input",
			value: e,
			onChange: (e) => t(e.target.value),
			placeholder: "e.g. Sprint Planning, Retrospective, Meeting Notes…",
			maxLength: 80,
			autoFocus: !0
		})] }), /* @__PURE__ */ D("div", { children: [/* @__PURE__ */ E("label", {
			htmlFor: `${i}-description`,
			className: "block text-xs font-semibold text-text-primary mb-[5px] tracking-wide",
			children: "Description"
		}), /* @__PURE__ */ E(f, {
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
function G({ page: e, pageIdx: t, totalPages: n, isActive: r, setActivePageId: i, movePage: a, removePage: s, renamePage: c, pages: l, fieldsById: d, renderRow: f, moveSectionToPage: p }) {
	let { attributes: m, listeners: h, setNodeRef: g, transform: _, transition: v, isDragging: y } = L({ id: e.id }), b = {
		transform: z.Transform.toString(_),
		transition: v,
		opacity: y ? .5 : 1
	};
	return /* @__PURE__ */ E("div", {
		ref: g,
		style: b,
		"data-testid": `wizard-page-${e.id}`,
		children: /* @__PURE__ */ D("div", {
			className: o("bg-surface border rounded-[10px] p-4 mb-3", r ? "bg-accent-bg border-accent-border" : "border-border"),
			children: [/* @__PURE__ */ D("div", {
				className: "flex items-center gap-2 mb-2.5",
				children: [
					/* @__PURE__ */ E("button", {
						type: "button",
						"data-testid": `page-drag-handle-${e.id}`,
						...m,
						...h,
						className: "cursor-grab px-1 py-0.5 text-sm text-text-tertiary border-none bg-transparent select-none touch-none",
						title: "Drag to reorder pages",
						children: "⋮⋮"
					}),
					/* @__PURE__ */ E("button", {
						type: "button",
						"data-testid": `page-up-${e.id}`,
						disabled: t === 0,
						onClick: () => a(e.id, -1),
						className: o("px-1.5 py-0.5 text-[11px] font-semibold rounded-[7px] font-inherit border-none bg-transparent", t === 0 ? "text-neutral opacity-50 cursor-not-allowed" : "text-neutral cursor-pointer"),
						children: "▲"
					}),
					/* @__PURE__ */ E("button", {
						type: "button",
						"data-testid": `page-down-${e.id}`,
						disabled: t === n - 1,
						onClick: () => a(e.id, 1),
						className: o("px-1.5 py-0.5 text-[11px] font-semibold rounded-[7px] font-inherit border-none bg-transparent", t === n - 1 ? "text-neutral opacity-50 cursor-not-allowed" : "text-neutral cursor-pointer"),
						children: "▼"
					}),
					/* @__PURE__ */ D("span", {
						className: "text-xs font-semibold text-text-tertiary min-w-14",
						children: ["Page ", t + 1]
					}),
					/* @__PURE__ */ E(u, {
						"aria-label": `Page ${t + 1} title`,
						"data-testid": `page-title-${e.id}`,
						size: "sm",
						className: "flex-1",
						value: e.title ?? "",
						placeholder: `Page ${t + 1}`,
						onChange: (t) => c(e.id, t.target.value),
						onFocus: () => i(e.id)
					}),
					/* @__PURE__ */ E("button", {
						type: "button",
						"data-testid": `page-remove-${e.id}`,
						disabled: n <= 1,
						onClick: () => s(e.id),
						className: o("px-2 py-0.5 text-[13px] font-semibold rounded-[7px] font-inherit border-none bg-transparent text-danger-fg", n <= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"),
						title: "Remove page (sections move to first page)",
						children: "✕"
					})
				]
			}), e.sectionIds.length === 0 ? /* @__PURE__ */ E("div", {
				"data-testid": `page-empty-${e.id}`,
				className: "py-3 px-2 text-text-tertiary text-xs italic",
				children: "No sections on this page yet — click the page header to make it active, then pick a section type."
			}) : /* @__PURE__ */ E(P, {
				items: e.sectionIds,
				strategy: R,
				children: /* @__PURE__ */ E("div", {
					"data-testid": `page-sections-${e.id}`,
					children: e.sectionIds.map((t, n) => d.get(t) ? /* @__PURE__ */ E(K, {
						sectionId: t,
						page: e,
						idx: n,
						pages: l,
						renderRow: f,
						moveSectionToPage: p
					}, t) : null)
				})
			})]
		})
	});
}
function K({ sectionId: e, page: t, idx: n, pages: r, renderRow: i, moveSectionToPage: a }) {
	let { attributes: o, listeners: s, setNodeRef: c, transform: l, transition: u, isDragging: d } = L({ id: e }), f = {
		transform: z.Transform.toString(l),
		transition: u,
		opacity: d ? .4 : 1
	};
	return /* @__PURE__ */ D("div", {
		ref: c,
		style: f,
		className: "flex items-center gap-1.5",
		children: [
			/* @__PURE__ */ E("button", {
				type: "button",
				"data-testid": `section-drag-handle-${e}`,
				...o,
				...s,
				className: "cursor-grab px-1 py-0.5 text-sm text-text-tertiary border-none bg-transparent select-none touch-none shrink-0",
				title: "Drag to reorder sections (or drop on another page)",
				children: "⋮⋮"
			}),
			/* @__PURE__ */ E("div", {
				className: "flex-1",
				children: i(e, t, n)
			}),
			r.length > 1 && /* @__PURE__ */ E(m, {
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
function q({ fields: t, setFields: r, pages: i, setPages: a, pageConfig: o, setPageConfig: s }) {
	let [c, l] = w(i[0]?.id ?? "page-default");
	b(() => {
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
	}, f = (e) => {
		r(t.filter((t) => t.id !== e)), a(i.map((t) => ({
			...t,
			sectionIds: t.sectionIds.filter((t) => t !== e)
		})));
	}, p = (e, t, n) => {
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
	}, m = (e, t, n) => {
		t !== n && a(i.map((r) => r.id === t ? {
			...r,
			sectionIds: r.sectionIds.filter((t) => t !== e)
		} : r.id === n ? {
			...r,
			sectionIds: [...r.sectionIds, e]
		} : r));
	}, g = (e, t) => {
		let n = i.findIndex((t) => t.id === e), r = n + t;
		if (n < 0 || r < 0 || r >= i.length) return;
		let o = [...i];
		[o[n], o[r]] = [o[r], o[n]], a(o);
	}, _ = () => {
		let e = `page-${typeof crypto < "u" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2, 10)}`;
		a([...i, {
			id: e,
			sectionIds: []
		}]), l(e);
	}, v = (e, t) => {
		a(i.map((n) => n.id === e ? {
			...n,
			title: t || void 0
		} : n));
	}, y = (e) => {
		if (i.length <= 1) return;
		let t = i.find((t) => t.id === e)?.sectionIds ?? [], n = i.filter((t) => t.id !== e);
		t.length > 0 && n.length > 0 && (n[0] = {
			...n[0],
			sectionIds: [...n[0].sectionIds, ...t]
		}), a(n), c === e && l(n[0]?.id ?? "");
	}, x = new Map(t.map((e) => [e.id, e])), S = i.length === 1, C = (e) => {
		if (i.some((t) => t.id === e)) return e;
		for (let t of i) if (t.sectionIds.includes(e)) return t.id;
	}, T = N(M(A, { activationConstraint: { distance: 5 } }), M(k, { coordinateGetter: I })), L = (e) => {
		let { active: t, over: n } = e;
		if (!n) return;
		let r = String(t.id), o = String(n.id), s = C(r), c = C(o);
		s && c && s !== c && (i.some((e) => e.id === r) || a(i.map((e) => e.id === s ? {
			...e,
			sectionIds: e.sectionIds.filter((e) => e !== r)
		} : e.id === c ? {
			...e,
			sectionIds: [...e.sectionIds, r]
		} : e)));
	}, z = (e) => {
		let { active: t, over: n } = e;
		if (!n) return;
		let r = String(t.id), o = String(n.id);
		if (i.some((e) => e.id === r) && i.some((e) => e.id === o)) {
			let e = i.findIndex((e) => e.id === r), t = i.findIndex((e) => e.id === o);
			e !== -1 && t !== -1 && e !== t && a(F(i, e, t));
			return;
		}
		let s = C(r);
		if (!s) return;
		let c = i.find((e) => e.id === s);
		if (!c) return;
		let l = c.sectionIds.indexOf(r), u = c.sectionIds.indexOf(o);
		l !== -1 && u !== -1 && l !== u && a(i.map((e) => e.id === s ? {
			...e,
			sectionIds: F(e.sectionIds, l, u)
		} : e));
	}, B = (e, t, n) => {
		let r = x.get(e);
		return r ? /* @__PURE__ */ E(U, {
			field: r,
			index: n,
			total: t.sectionIds.length,
			onRename: (e) => d(r.id, { name: e }),
			onChangeType: (e) => d(r.id, {
				sectionType: e,
				rendererOverrides: {}
			}),
			onRemove: () => f(r.id),
			onMoveUp: () => p(t.id, r.id, -1),
			onMoveDown: () => p(t.id, r.id, 1),
			onToggleRequired: () => d(r.id, { required: !r.required }),
			onToggleCollapsed: () => d(r.id, { defaultCollapsed: !r.defaultCollapsed })
		}, r.id) : null;
	};
	return /* @__PURE__ */ D("div", {
		className: "flex gap-5 items-start",
		children: [/* @__PURE__ */ D("div", {
			className: "flex-1 min-w-0",
			children: [
				/* @__PURE__ */ D("div", {
					className: "text-xs font-semibold text-text-primary mb-2.5 tracking-wide",
					children: ["SECTIONS ", t.length > 0 && /* @__PURE__ */ D("span", {
						className: "text-primary",
						children: [
							"(",
							t.length,
							S ? "" : ` across ${i.length} pages`,
							")"
						]
					})]
				}),
				S ? t.length === 0 ? /* @__PURE__ */ D("div", {
					className: "bg-surface border border-dashed border-border rounded-[10px] text-center py-8 px-4 text-text-tertiary text-[13px]",
					children: [/* @__PURE__ */ E("div", {
						className: "text-[28px] mb-2",
						children: "📋"
					}), "No sections yet — pick a section type →"]
				}) : /* @__PURE__ */ E("div", {
					"data-testid": "fields-list",
					children: i[0].sectionIds.map((e, t) => B(e, i[0], t))
				}) : /* @__PURE__ */ E(O, {
					sensors: T,
					collisionDetection: j,
					onDragOver: L,
					onDragEnd: z,
					children: /* @__PURE__ */ E(P, {
						items: i.map((e) => e.id),
						strategy: R,
						children: i.map((e, t) => /* @__PURE__ */ E(G, {
							page: e,
							pageIdx: t,
							totalPages: i.length,
							isActive: e.id === c,
							setActivePageId: l,
							movePage: g,
							removePage: y,
							renamePage: v,
							pages: i,
							fieldsById: x,
							renderRow: B,
							moveSectionToPage: m
						}, e.id))
					})
				}),
				/* @__PURE__ */ E("button", {
					type: "button",
					"data-testid": "add-page",
					onClick: _,
					className: "mt-2 text-xs px-3 py-1.5 font-semibold rounded-md font-inherit border border-dashed border-accent-border bg-transparent text-primary cursor-pointer",
					children: "+ Add Page"
				}),
				i.length > 1 && /* @__PURE__ */ E("div", {
					"data-testid": "page-config-toc",
					className: "mt-4 p-2.5 bg-surface-panel rounded-md text-[13px]",
					children: /* @__PURE__ */ D("label", {
						className: "flex items-center gap-2 cursor-pointer",
						children: [/* @__PURE__ */ E(h, {
							checked: o.showTableOfContents,
							onChange: (e) => s({
								...o,
								showTableOfContents: e
							})
						}), /* @__PURE__ */ E("span", { children: "Show table of contents (multi-page documents only)" })]
					})
				})
			]
		}), /* @__PURE__ */ D("div", {
			className: "w-[220px] shrink-0",
			children: [/* @__PURE__ */ E("div", {
				className: "text-xs font-semibold text-text-primary mb-2.5 tracking-wide",
				children: "SECTION TYPES"
			}), /* @__PURE__ */ E("div", {
				className: "flex flex-col gap-1.5",
				children: e().map((e) => /* @__PURE__ */ D("button", {
					"data-testid": `add-field-${e.type}`,
					type: "button",
					onClick: () => u(e.type),
					className: "flex items-center gap-2.5 py-2.5 px-3 rounded-lg w-full bg-surface border border-border cursor-pointer text-left font-inherit transition-colors hover:border-accent-border hover:bg-accent-bg",
					children: [/* @__PURE__ */ E("span", {
						className: "text-xl shrink-0",
						children: e.icon
					}), /* @__PURE__ */ D("div", { children: [/* @__PURE__ */ E("div", {
						className: "text-[13px] font-semibold text-text-primary",
						children: e.label
					}), /* @__PURE__ */ E("div", {
						className: "text-[11px] text-text-tertiary mt-px",
						children: e.description
					})] })]
				}, e.type))
			})]
		})]
	});
}
function J({ field: e, mode: n, onToggleHidden: r, onOverrideChange: i }) {
	let a = (e.hiddenInModes ?? []).includes(n), s = t(e.sectionType), c = s?.rendererKeys[n] ?? [], l = (e.rendererOverrides ?? {})[n] ?? c[0] ?? "";
	return /* @__PURE__ */ E("td", {
		className: "p-[10px_12px] align-top",
		children: /* @__PURE__ */ D("div", {
			className: "flex flex-col gap-1.5",
			children: [
				/* @__PURE__ */ D("label", {
					className: "flex items-center gap-1.5 cursor-pointer select-none",
					children: [/* @__PURE__ */ E(h, {
						"data-testid": `visibility-${e.id}-${n}`,
						checked: !a,
						onChange: r
					}), /* @__PURE__ */ E("span", {
						className: o("text-xs", a ? "text-text-tertiary" : "text-text-primary"),
						children: a ? "Hidden" : "Visible"
					})]
				}),
				!a && c.length > 0 && /* @__PURE__ */ E(m, {
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
				!a && c.length === 0 && /* @__PURE__ */ E("span", {
					className: "text-[11px] text-text-tertiary",
					children: "Default renderer"
				})
			]
		})
	});
}
function Y({ fields: e, setFields: n }) {
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
	return e.length === 0 ? /* @__PURE__ */ E("div", {
		className: "bg-surface border border-border rounded-[10px] text-center py-10 px-4 text-text-tertiary",
		children: "No fields defined — go back to Step 2 and add some fields first."
	}) : /* @__PURE__ */ D("div", {
		className: "overflow-x-auto",
		children: [/* @__PURE__ */ E("p", {
			className: "text-[13px] text-neutral mb-4",
			children: "Configure which view modes each field appears in and which renderer to use."
		}), /* @__PURE__ */ D("table", {
			className: "w-full border-collapse text-[13px]",
			children: [/* @__PURE__ */ E("thead", { children: /* @__PURE__ */ D("tr", {
				className: "bg-surface-panel",
				children: [/* @__PURE__ */ E("th", {
					className: "p-[10px_12px] text-left font-semibold text-text-primary border-b-2 border-border whitespace-nowrap",
					children: "Field"
				}), r.map((e) => /* @__PURE__ */ E("th", {
					className: "p-[10px_12px] text-left font-semibold text-text-primary border-b-2 border-border min-w-[130px]",
					children: i[e]
				}, e))]
			}) }), /* @__PURE__ */ E("tbody", { children: e.map((e, n) => {
				let i = t(e.sectionType);
				return /* @__PURE__ */ D("tr", {
					className: o("border-b border-border-subtle", n % 2 == 0 ? "bg-surface" : "bg-surface-inset"),
					children: [/* @__PURE__ */ E("td", {
						className: "p-[10px_12px] align-middle",
						children: /* @__PURE__ */ D("div", {
							className: "flex items-center gap-[7px]",
							children: [
								/* @__PURE__ */ E("span", { children: i?.icon }),
								/* @__PURE__ */ E("span", {
									className: "font-medium text-text-primary",
									children: e.name
								}),
								e.required && /* @__PURE__ */ E("span", {
									className: "text-[10px] bg-accent-bg text-accent-fg px-[5px] py-px rounded",
									children: "required"
								})
							]
						})
					}), r.map((t) => /* @__PURE__ */ E(J, {
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
function X({ initialType: e, onSave: t, onCancel: n, idToken: a, onExportSchema: o }) {
	let [s, c] = w(e ? 2 : 1), [l, u] = w(e?.name ?? ""), [d, f] = w(e?.description ?? ""), p = e?.icon ?? "📄", [m, h] = w(e?.fields ?? []), [g, _] = w(() => e ? i(e) : [{
		id: "page-default",
		sectionIds: []
	}]), [v, y] = w(() => e ? r(e) : { showTableOfContents: !1 }), [b, x] = w(""), [S, C] = w(""), T = () => s !== 1 || l.trim().length > 0, O = () => {
		if (s === 1 && !l.trim()) {
			x("Name is required");
			return;
		}
		x(""), s < 3 ? c((e) => e + 1) : k();
	}, k = () => {
		t({
			name: l.trim(),
			description: d,
			icon: p,
			fields: m,
			pages: g,
			pageConfig: v
		});
	};
	return /* @__PURE__ */ D("div", {
		className: "flex flex-col h-full",
		children: [
			/* @__PURE__ */ E(V, {
				step: s,
				total: 3
			}),
			/* @__PURE__ */ D("div", {
				className: "flex-1 overflow-y-auto pr-1",
				children: [
					s === 1 && /* @__PURE__ */ E(W, {
						name: l,
						setName: (e) => {
							u(e), e.trim() && x("");
						},
						description: d,
						setDescription: f
					}),
					s === 2 && /* @__PURE__ */ E(q, {
						fields: m,
						setFields: h,
						pages: g,
						setPages: _,
						pageConfig: v,
						setPageConfig: y
					}),
					s === 3 && /* @__PURE__ */ E(Y, {
						fields: m,
						setFields: h
					}),
					b && /* @__PURE__ */ E("div", {
						className: "text-danger-fg text-[13px] mt-2",
						children: b
					})
				]
			}),
			/* @__PURE__ */ E(H, {
				step: s,
				totalSteps: 3,
				canAdvance: T(),
				isEditing: !!e,
				onCancel: n,
				onBack: () => c((e) => e - 1),
				onNext: O,
				onExportSchema: e?.id ? async () => {
					if (e?.id) {
						C("");
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
							C(`Export failed: ${e.message}`);
						}
					}
				} : void 0,
				exportError: S
			})
		]
	});
}
//#endregion
//#region src/components/doc-types/cookbooks/CookbookPicker.tsx
function Z(e) {
	return e.toLowerCase().replace(/[^a-z]/g, "-");
}
function ee({ cookbook: e, onPick: t, actionLabel: n, busy: r, cardPrefix: i, layout: a, installed: s, onOpenInstalled: c }) {
	return /* @__PURE__ */ D("div", {
		"data-testid": `${i}-card-${e.id}`,
		className: o("flex flex-col gap-2 min-h-[200px] p-3.5 bg-surface border border-border rounded-[10px]", a === "fixed" && "w-[220px]"),
		children: [
			/* @__PURE__ */ D("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ E("span", {
					className: "text-2xl",
					"aria-hidden": !0,
					children: e.icon
				}), /* @__PURE__ */ E("div", {
					className: "text-sm font-bold text-text-primary overflow-hidden text-ellipsis",
					children: e.name
				})]
			}),
			/* @__PURE__ */ E("div", {
				className: "text-[11px] text-text-tertiary flex gap-2",
				children: /* @__PURE__ */ E("span", { children: e.category })
			}),
			/* @__PURE__ */ E("div", {
				className: "text-xs text-text-secondary leading-[1.4] flex-1",
				children: e.description
			}),
			e.tags.length > 0 && /* @__PURE__ */ E("div", {
				className: "flex flex-wrap gap-1",
				children: e.tags.map((e) => /* @__PURE__ */ E("span", {
					className: "text-[10px] font-semibold py-0.5 px-1.5 rounded bg-surface-hover text-text-secondary lowercase",
					children: e
				}, e))
			}),
			s ? /* @__PURE__ */ E("button", {
				type: "button",
				"data-testid": `${i}-installed-${e.id}`,
				onClick: c ? () => c(e) : void 0,
				disabled: r || !c,
				"aria-label": `${e.name} is already added`,
				className: o("mt-auto py-1.5 px-2.5 text-xs font-semibold rounded-md border border-border bg-surface-inset text-text-secondary", r || !c ? "cursor-default" : "cursor-pointer hover:text-text-primary"),
				children: c ? "Added · Open" : "Added"
			}) : /* @__PURE__ */ E("button", {
				type: "button",
				"data-testid": `${i}-use-${e.id}`,
				onClick: () => t(e),
				disabled: r,
				className: o("mt-auto py-1.5 px-2.5 text-xs font-semibold bg-primary text-on-primary border-none rounded-md", r ? "opacity-60 cursor-not-allowed" : "cursor-pointer"),
				children: n
			})
		]
	});
}
function Q({ onPick: e, busy: t = !1, actionLabel: n = "Install", autoFocusSearch: r = !1, idPrefix: i = "cookbooks", cardPrefix: a = "cookbook", layout: s = "fixed", gridHeightClassName: c = "max-h-[60vh]", installedNames: l, onOpenInstalled: d }) {
	let f = S(() => new Set((l ?? []).map((e) => e.trim().toLowerCase())), [l]), [p, m] = w(""), [h, g] = w("All"), v = C(null);
	b(() => {
		if (!r) return;
		let e = setTimeout(() => v.current?.focus(), 30);
		return () => clearTimeout(e);
	}, [r]);
	let x = S(() => y(p, h), [p, h]);
	return /* @__PURE__ */ D(T, { children: [
		/* @__PURE__ */ D("div", {
			role: "group",
			"aria-label": "Filter by category",
			className: "flex flex-wrap gap-1.5 mb-2.5",
			children: [/* @__PURE__ */ E("button", {
				type: "button",
				"data-testid": `${a}-cat-all`,
				"aria-pressed": h === "All",
				onClick: () => g("All"),
				className: o("py-1 px-2.5 text-[11px] font-semibold rounded-xl border-none cursor-pointer", h === "All" ? "bg-primary text-on-primary" : "bg-surface-hover text-text-secondary"),
				children: "All"
			}), _.map((e) => /* @__PURE__ */ E("button", {
				type: "button",
				"data-testid": `${a}-cat-${Z(e)}`,
				"aria-pressed": h === e,
				onClick: () => g(e),
				className: o("py-1 px-2.5 text-[11px] font-semibold rounded-xl border-none cursor-pointer", h === e ? "bg-primary text-on-primary" : "bg-surface-hover text-text-secondary"),
				children: e
			}, e))]
		}),
		/* @__PURE__ */ E(u, {
			ref: v,
			type: "search",
			"data-testid": `${i}-search`,
			"aria-label": "Search cookbooks",
			placeholder: "Search cookbooks...",
			value: p,
			onChange: (e) => m(e.target.value),
			onKeyDown: (n) => {
				n.key === "Enter" && !t && x.length > 0 && (n.preventDefault(), e(x[0]));
			},
			className: "mb-3.5"
		}),
		x.length === 0 ? /* @__PURE__ */ D("div", {
			"data-testid": `${i}-empty`,
			className: "text-center py-8 text-[13px] text-text-tertiary",
			children: [
				"No cookbooks match \"",
				p,
				"\"."
			]
		}) : /* @__PURE__ */ E("div", {
			"data-testid": `${i}-grid`,
			className: o("grid gap-3 overflow-y-auto p-1", s === "fixed" ? "grid-cols-[repeat(3,220px)] justify-center" : "grid-cols-[repeat(auto-fill,minmax(210px,1fr))]", c),
			children: x.map((r) => /* @__PURE__ */ E(ee, {
				cookbook: r,
				onPick: e,
				actionLabel: n,
				busy: t,
				cardPrefix: a,
				layout: s,
				installed: f.has(r.name.trim().toLowerCase()),
				onOpenInstalled: d
			}, r.id))
		})
	] });
}
//#endregion
//#region src/components/doc-types/CookbooksModal.tsx
function $({ open: e, onClose: t, onCreated: n, createType: r }) {
	let [i, a] = w(!1), [o, s] = w(null);
	return b(() => {
		e && s(null);
	}, [e]), /* @__PURE__ */ D(l, {
		open: e,
		onClose: t,
		title: "Document type cookbooks",
		maxWidth: 800,
		backdropTestId: "cookbooks-modal",
		rawChildren: !0,
		children: [
			/* @__PURE__ */ E("div", {
				className: "text-[13px] text-text-secondary mb-3",
				children: "Install a prebuilt document type. You can customize the fields after installing."
			}),
			o && /* @__PURE__ */ D("div", {
				"data-testid": "cookbooks-save-error",
				role: "alert",
				className: "mb-3 rounded border border-danger-border bg-danger-bg px-3 py-2 text-[13px] text-danger-fg",
				children: ["Couldn’t create that type: ", o]
			}),
			/* @__PURE__ */ E(Q, {
				onPick: async (e) => {
					if (!i) {
						a(!0), s(null);
						try {
							let i = await r(e.build());
							if (i.status === "rejected") {
								s(i.error);
								return;
							}
							t(), n(i.type.id);
						} catch (e) {
							s(e instanceof Error ? e.message : String(e));
						} finally {
							a(!1);
						}
					}
				},
				busy: i,
				autoFocusSearch: !0
			})
		]
	});
}
//#endregion
//#region src/components/doc-types/DocumentTypesPage.tsx
function te({ typeName: e, onConfirm: t, onCancel: n }) {
	return /* @__PURE__ */ D(l, {
		open: !0,
		onClose: n,
		maxWidth: 380,
		backdropTestId: "delete-modal",
		footer: /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ E("button", {
			"data-testid": "cancel-delete",
			onClick: n,
			className: "py-[7px] px-[18px] text-[13px] font-semibold bg-surface border border-border-field rounded-[7px] cursor-pointer",
			children: "Cancel"
		}), /* @__PURE__ */ E("button", {
			"data-testid": "confirm-delete",
			onClick: t,
			className: "py-[7px] px-[18px] text-[13px] font-semibold bg-danger text-white border-none rounded-[7px] cursor-pointer",
			children: "Delete"
		})] }),
		children: [/* @__PURE__ */ E("div", {
			className: "text-base font-semibold text-text-primary mb-2.5",
			children: "Delete document type?"
		}), /* @__PURE__ */ D("p", {
			className: "text-[13px] text-neutral m-0",
			children: [/* @__PURE__ */ D("strong", { children: [
				"\"",
				e,
				"\""
			] }), " will be permanently removed. Documents already created from this type are unaffected."]
		})]
	});
}
function ne({ type: e, active: t, onSelect: n, onDeleteRequest: r, onCreateDocument: i }) {
	return /* @__PURE__ */ D("div", {
		"data-testid": `type-item-${e.id}`,
		className: o("flex items-center gap-2 py-2 px-2.5 rounded-[7px] mb-0.5 transition-colors", t ? "bg-accent-bg border border-accent-border" : "bg-transparent border border-transparent"),
		children: [
			/* @__PURE__ */ E("span", {
				className: "text-lg shrink-0",
				children: e.icon
			}),
			/* @__PURE__ */ D("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ E("div", {
					title: e.name,
					className: "text-[13px] font-medium text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.name
				}), /* @__PURE__ */ D("div", {
					className: "text-[11px] text-text-tertiary",
					children: [
						e.fields.length,
						" field",
						e.fields.length === 1 ? "" : "s"
					]
				})]
			}),
			i && /* @__PURE__ */ E("button", {
				"data-testid": `new-doc-from-type-${e.id}`,
				onClick: (e) => {
					e.stopPropagation(), i();
				},
				title: `Start a new ${e.name}`,
				className: "border border-transparent cursor-pointer text-xs px-2 py-[3px] shrink-0 leading-none rounded font-semibold bg-transparent text-primary hover:bg-accent-bg hover:text-accent-fg",
				children: "New"
			}),
			/* @__PURE__ */ E("button", {
				"data-testid": `edit-type-${e.id}`,
				onClick: n,
				title: "Edit type",
				className: o("border border-transparent cursor-pointer text-xs px-2 py-[3px] shrink-0 leading-none rounded font-semibold hover:bg-accent-bg hover:text-accent-fg", t ? "bg-accent-border text-accent-fg" : "bg-transparent text-text-tertiary"),
				children: "Edit"
			}),
			/* @__PURE__ */ E("button", {
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
function re({ idToken: e, onExportSchema: t, onCreateDocument: n, layout: r = "split", processingAction: i } = {}) {
	let { types: l, source: u, error: f, createType: m, updateType: h, deleteType: g } = a({ idToken: e }), [_, v] = w("idle"), [y, b] = w(null), [x, S] = w(null), [C, T] = w(!1), [O, k] = w(!1), [A, j] = w(null), M = y ? l.find((e) => e.id === y) : void 0, N = () => {
		b(null), v("create"), j(null);
	}, P = (e) => {
		b(e.id), v("edit"), j(null);
	}, F = async (e) => {
		let t = _ === "edit" && y ? "updated" : "created", n = _ === "edit" && y ? await h(y, e) : await m(e);
		if (n.status === "rejected") {
			j({
				text: `"${e.name}" NOT saved — server rejected it (${n.error})`,
				key: Date.now(),
				tone: "error"
			});
			return;
		}
		j(n.status === "synced" ? {
			text: `"${e.name}" ${t} — synced`,
			key: Date.now(),
			tone: "success"
		} : {
			text: `"${e.name}" ${t} — offline (saved locally, server unreachable)`,
			key: Date.now(),
			tone: "offline"
		}), v("idle"), b(null);
	}, I = () => {
		v("idle"), b(null);
	}, L = (e) => {
		S(e);
	}, R = async () => {
		if (!x) return;
		let e = l.find((e) => e.id === x), t = await g(x);
		if (t.status === "rejected") {
			j({
				text: `"${e?.name ?? x}" NOT deleted — server rejected it (${t.error})`,
				key: Date.now(),
				tone: "error"
			}), S(null);
			return;
		}
		y === x && (v("idle"), b(null)), S(null);
	}, z = () => {
		S(null);
	}, B = (e) => {
		b(e), v("edit"), j(null);
	}, V = async (e) => {
		if (!O) {
			k(!0), j(null);
			try {
				let t = e.build(), n = await m(t);
				j(n.status === "rejected" ? {
					text: `"${t.name}" NOT added — server rejected it (${n.error})`,
					key: Date.now(),
					tone: "error"
				} : n.status === "synced" ? {
					text: `"${t.name}" added — ready to use`,
					key: Date.now(),
					tone: "success"
				} : {
					text: `"${t.name}" added — offline (saved locally, server unreachable)`,
					key: Date.now(),
					tone: "offline"
				});
			} catch (t) {
				j({
					text: `"${e.name}" NOT added — ${t instanceof Error ? t.message : String(t)}`,
					key: Date.now(),
					tone: "error"
				});
			} finally {
				k(!1);
			}
		}
	}, H = x ? l.find((e) => e.id === x) : null, U = r === "workspace";
	return /* @__PURE__ */ D("div", {
		className: o("flex h-full min-h-0 min-w-0", U ? "flex-col overflow-y-auto" : "overflow-hidden"),
		children: [
			U && /* @__PURE__ */ E(c, {
				gap: "sm",
				className: "shrink-0 px-5 pt-4 pb-3",
				children: /* @__PURE__ */ E(p, {
					title: "Templates",
					description: "Create and manage reusable document templates. Pick a starter below or build your own.",
					actions: i
				})
			}),
			/* @__PURE__ */ D("div", {
				className: o("shrink-0 border-border flex flex-col bg-surface-inset", U ? "border-b mx-5 rounded-lg" : "w-[264px] border-r overflow-hidden"),
				children: [
					/* @__PURE__ */ D("div", {
						className: o("px-4 flex gap-2.5", U ? "py-2 items-center justify-between" : "py-3.5 border-b border-border flex-col"),
						children: [/* @__PURE__ */ E("span", {
							className: "text-[13px] font-bold text-text-primary",
							children: U ? "Your templates" : "Document Types"
						}), /* @__PURE__ */ D("div", {
							className: "flex gap-1.5",
							children: [!U && /* @__PURE__ */ E(s, {
								size: "sm",
								"data-testid": "cookbooks-btn",
								onClick: () => T(!0),
								title: "Browse the ready-made document types",
								className: "py-[5px] px-3 text-xs font-semibold bg-primary text-on-primary border-none rounded-md cursor-pointer whitespace-nowrap",
								children: "Known types"
							}), /* @__PURE__ */ E(s, {
								variant: "secondary",
								size: "sm",
								"data-testid": "create-type-btn",
								onClick: N,
								title: "Build a document type field by field",
								className: "py-[5px] px-3 text-xs bg-transparent text-text-secondary border border-border rounded-md cursor-pointer whitespace-nowrap",
								children: U ? "New template" : "From scratch"
							})]
						})]
					}),
					/* @__PURE__ */ E("div", {
						className: o(U ? "grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2 px-2 pb-2" : "flex-1 overflow-y-auto p-2"),
						"data-testid": "type-list",
						children: l.length === 0 ? /* @__PURE__ */ D("div", {
							className: U ? "px-2 py-1 text-xs text-text-secondary" : "py-8 px-4 flex flex-col items-center gap-2",
							children: [/* @__PURE__ */ E("div", {
								className: "text-text-tertiary text-[13px]",
								children: U ? "No saved templates yet. Add one from the starters below." : "No types yet."
							}), !U && /* @__PURE__ */ E("button", {
								"data-testid": "empty-browse-types-btn",
								onClick: () => T(!0),
								className: "bg-transparent border-none text-primary text-[13px] font-medium cursor-pointer py-1 px-2",
								children: "Browse known types →"
							})]
						}) : l.map((e) => /* @__PURE__ */ E(ne, {
							type: e,
							active: y === e.id,
							onSelect: () => P(e),
							onDeleteRequest: () => L(e.id),
							onCreateDocument: n ? () => n(e) : void 0
						}, e.id))
					}),
					u === "cache" && /* @__PURE__ */ D("div", {
						"data-testid": "types-offline-notice",
						className: "py-2 px-3.5 border-t border-warning-border bg-warning-bg text-xs text-warning-fg font-medium",
						children: [
							"⚠ Offline — showing cached types (",
							f ?? "server unreachable",
							")"
						]
					}),
					A && /* @__PURE__ */ D("div", {
						"data-testid": "save-message",
						className: o("py-2 px-3.5 border-t text-xs font-medium", A.tone === "success" && "border-success-border bg-success-bg text-success-fg", A.tone === "offline" && "border-warning-border bg-warning-bg text-warning-fg", A.tone === "error" && "border-danger-border bg-danger-bg text-danger-fg"),
						children: [
							A.tone === "error" ? "✗" : "✓",
							" ",
							A.text
						]
					}, A.key)
				]
			}),
			/* @__PURE__ */ D("div", {
				className: o("min-w-0", U ? "shrink-0 px-5 py-4" : "flex-1 overflow-y-auto py-7 px-9"),
				"data-testid": "right-panel",
				children: [_ === "idle" && /* @__PURE__ */ D("div", {
					"data-testid": "known-types-panel",
					className: "flex flex-col gap-4",
					children: [!U && /* @__PURE__ */ E(d, {
						testId: "idle-panel",
						className: "min-h-0 p-0 gap-1",
						icon: "📋",
						title: l.length > 0 ? "Select a type to edit" : "No document types yet",
						description: l.length > 0 ? "Choose a type from the list to edit its fields — or add another known type below." : "Start from a known type below. It installs as your own type, and you can change any of it afterwards.",
						action: /* @__PURE__ */ E("button", {
							"data-testid": "idle-create-btn",
							onClick: N,
							className: "px-3.5 py-2 text-[13px] font-medium bg-transparent text-text-secondary border border-border rounded-lg cursor-pointer",
							children: "Build a type from scratch"
						})
					}), /* @__PURE__ */ D("div", {
						className: U ? "" : "border-t border-border pt-4",
						children: [
							/* @__PURE__ */ E("div", {
								className: "text-[13px] font-bold text-text-primary mb-1",
								children: U ? "Start from a template" : "Known types"
							}),
							U && /* @__PURE__ */ E("p", {
								className: "text-[13px] text-text-secondary mt-0 mb-3",
								children: "Choose a starter to add it to Your templates. You can edit it afterwards."
							}),
							/* @__PURE__ */ E(Q, {
								onPick: V,
								busy: O,
								actionLabel: U ? "Add template" : "Add this type",
								idPrefix: "type-starters",
								cardPrefix: "type-starter",
								layout: "fluid",
								gridHeightClassName: "max-h-none",
								installedNames: l.map((e) => e.name),
								onOpenInstalled: (e) => {
									let t = l.find((t) => t.name.trim().toLowerCase() === e.name.trim().toLowerCase());
									t && (b(t.id), v("edit"));
								}
							})
						]
					})]
				}), (_ === "create" || _ === "edit") && /* @__PURE__ */ E(X, {
					initialType: M,
					idToken: e,
					onSave: F,
					onCancel: I,
					onExportSchema: t
				}, y ?? "create")]
			}),
			x && H && /* @__PURE__ */ E(te, {
				typeName: H.name,
				onConfirm: R,
				onCancel: z
			}),
			/* @__PURE__ */ E($, {
				open: C,
				onClose: () => T(!1),
				onCreated: B,
				createType: m
			})
		]
	});
}
//#endregion
export { _ as COOKBOOK_CATEGORIES, Q as CookbookPicker, $ as CookbooksModal, X as DocumentTypeWizard, re as DocumentTypesPage, U as FieldDefinitionEditor, V as StepIndicator, H as WizardStepNavigation, v as documentTypeCookbooks, y as filterCookbooks, g as matchesCookbookQuery };
