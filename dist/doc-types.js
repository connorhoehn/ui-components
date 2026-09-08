import { n as e, t } from "./registry-DbX3MVAA.js";
import { i as n, n as r, r as i } from "./documentType-rRZpKWbO.js";
import { i as a } from "./useDocumentTypes-BUXMPyPU.js";
import { t as o } from "./cn-DhjIN-s0.js";
import { t as s } from "./Modal-CyoyiNKN.js";
import { t as c } from "./EmptyState-ClmWoqCb.js";
import { t as l } from "./Input-DLknWXri.js";
import { t as u } from "./Textarea-Dz4doxTv.js";
import { t as d } from "./Select-CqVokE2v.js";
import { t as f } from "./Checkbox-DqN9RkXK.js";
import { a as p, i as m, o as h, s as g } from "./renderers-BRBeGBB-.js";
import { useEffect as _, useId as v, useMemo as y, useRef as b, useState as x } from "react";
import { Fragment as S, jsx as C, jsxs as w } from "react/jsx-runtime";
import { DndContext as T, KeyboardSensor as E, PointerSensor as D, closestCorners as O, useSensor as k, useSensors as A } from "@dnd-kit/core";
import { SortableContext as j, arrayMove as M, sortableKeyboardCoordinates as N, useSortable as P, verticalListSortingStrategy as F } from "@dnd-kit/sortable";
import { CSS as I } from "@dnd-kit/utilities";
//#region src/components/doc-types/WizardStepNavigation.tsx
var L = [
	"Basic Info",
	"Sections",
	"View Modes"
];
function R({ step: e, total: t }) {
	return /* @__PURE__ */ C("div", {
		className: "flex items-center gap-0 mb-7",
		children: Array.from({ length: t }, (n, r) => {
			let i = r + 1, a = i === e, s = i < e;
			return /* @__PURE__ */ w("div", {
				className: "flex items-center",
				children: [
					/* @__PURE__ */ C("div", {
						className: o("w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold", s && "bg-primary text-white border-2 border-transparent", a && "bg-accent-bg text-accent-fg border-2 border-primary", !s && !a && "bg-surface-hover text-text-tertiary border-2 border-transparent"),
						children: s ? "✓" : i
					}),
					/* @__PURE__ */ C("span", {
						className: o("ml-1.5 text-xs whitespace-nowrap", a ? "font-semibold text-text-primary" : "font-normal text-text-tertiary"),
						children: L[r]
					}),
					i < t && /* @__PURE__ */ C("div", { className: "w-8 h-px bg-border mx-2.5 shrink-0" })
				]
			}, i);
		})
	});
}
function z({ step: e, totalSteps: t, canAdvance: n, isEditing: r, onCancel: i, onBack: a, onNext: s, onExportSchema: c, exportError: l }) {
	return /* @__PURE__ */ w("div", {
		className: "flex items-center justify-between pt-4 border-t border-border mt-4 shrink-0",
		children: [/* @__PURE__ */ w("div", {
			className: "flex gap-2",
			children: [
				/* @__PURE__ */ C("button", {
					type: "button",
					onClick: i,
					className: "px-4 py-[7px] text-[13px] font-semibold rounded-[7px] cursor-pointer font-inherit bg-transparent border-none text-neutral",
					children: "Cancel"
				}),
				c && /* @__PURE__ */ C("button", {
					type: "button",
					onClick: c,
					title: "Download JSON Schema",
					className: "px-4 py-[7px] text-[13px] font-semibold rounded-[7px] cursor-pointer font-inherit bg-surface text-text-primary border border-border-field",
					children: "Export Schema"
				}),
				l && /* @__PURE__ */ C("div", {
					"data-testid": "export-schema-error",
					role: "alert",
					className: "text-danger-fg text-[13px] self-center",
					children: l
				})
			]
		}), /* @__PURE__ */ w("div", {
			className: "flex gap-2",
			children: [e > 1 && /* @__PURE__ */ C("button", {
				type: "button",
				onClick: a,
				className: "px-4 py-[7px] text-[13px] font-semibold rounded-[7px] cursor-pointer font-inherit bg-surface text-text-primary border border-border-field",
				children: "← Back"
			}), /* @__PURE__ */ C("button", {
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
function B({ field: n, index: r, total: i, onRename: a, onChangeType: s, onRemove: c, onMoveUp: u, onMoveDown: f, onToggleRequired: p, onToggleCollapsed: m }) {
	let h = t(n.sectionType), g = e(), _ = n.name.trim() || `Section ${r + 1}`;
	return /* @__PURE__ */ w("div", {
		className: "flex items-center gap-2 py-2 px-2.5 rounded-lg bg-surface-panel border border-border mb-1.5",
		children: [
			/* @__PURE__ */ w("div", {
				className: "flex flex-col gap-px shrink-0",
				children: [/* @__PURE__ */ C("button", {
					type: "button",
					disabled: r === 0,
					onClick: u,
					"data-testid": `field-up-${n.id}`,
					"aria-label": `Move ${n.name} up`,
					className: o("px-1 py-px text-[10px] leading-none font-semibold rounded-[7px] font-inherit border-none bg-transparent", r === 0 ? "text-neutral opacity-50 cursor-not-allowed" : "text-neutral cursor-pointer"),
					children: "▲"
				}), /* @__PURE__ */ C("button", {
					type: "button",
					disabled: r === i - 1,
					onClick: f,
					"data-testid": `field-down-${n.id}`,
					"aria-label": `Move ${n.name} down`,
					className: o("px-1 py-px text-[10px] leading-none font-semibold rounded-[7px] font-inherit border-none bg-transparent", r === i - 1 ? "text-neutral opacity-50 cursor-not-allowed" : "text-neutral cursor-pointer"),
					children: "▼"
				})]
			}),
			/* @__PURE__ */ C("span", {
				className: "text-base shrink-0",
				children: h?.icon ?? "📄"
			}),
			/* @__PURE__ */ C(l, {
				"aria-label": `${_} name`,
				"data-testid": `field-name-${n.id}`,
				size: "sm",
				value: n.name,
				onChange: (e) => a(e.target.value),
				className: "flex-1 min-w-0 bg-transparent border-transparent focus:border-accent-border focus:bg-surface"
			}),
			/* @__PURE__ */ C(d, {
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
			/* @__PURE__ */ C("button", {
				type: "button",
				onClick: p,
				"data-testid": `field-required-${n.id}`,
				title: "Required",
				className: o("px-2 py-[3px] text-[11px] font-semibold rounded-[7px] font-inherit shrink-0 cursor-pointer", n.required ? "bg-accent-bg text-accent-fg border border-accent-border" : "bg-surface-panel text-text-tertiary border border-border"),
				children: "Required"
			}),
			/* @__PURE__ */ C("button", {
				type: "button",
				onClick: m,
				"data-testid": `field-collapsed-${n.id}`,
				title: "Collapsed by default",
				className: o("px-2 py-[3px] text-[11px] font-semibold rounded-[7px] font-inherit shrink-0 cursor-pointer", n.defaultCollapsed ? "bg-success-bg text-success-fg border border-success-border" : "bg-surface-panel text-text-tertiary border border-border"),
				children: "Collapsed"
			}),
			/* @__PURE__ */ C("button", {
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
function V({ name: e, setName: t, description: n, setDescription: r }) {
	let i = v();
	return /* @__PURE__ */ w("div", {
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ w("div", { children: [/* @__PURE__ */ w("label", {
			htmlFor: `${i}-name`,
			className: "block text-xs font-semibold text-text-primary mb-[5px] tracking-wide",
			children: ["Name ", /* @__PURE__ */ C("span", {
				"aria-hidden": "true",
				className: "text-danger-fg",
				children: "*"
			})]
		}), /* @__PURE__ */ C(l, {
			id: `${i}-name`,
			"aria-required": "true",
			"data-testid": "name-input",
			value: e,
			onChange: (e) => t(e.target.value),
			placeholder: "e.g. Sprint Planning, Retrospective, Meeting Notes…",
			maxLength: 80,
			autoFocus: !0
		})] }), /* @__PURE__ */ w("div", { children: [/* @__PURE__ */ C("label", {
			htmlFor: `${i}-description`,
			className: "block text-xs font-semibold text-text-primary mb-[5px] tracking-wide",
			children: "Description"
		}), /* @__PURE__ */ C(u, {
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
function H({ page: e, pageIdx: t, totalPages: n, isActive: r, setActivePageId: i, movePage: a, removePage: s, renamePage: c, pages: u, fieldsById: d, renderRow: f, moveSectionToPage: p }) {
	let { attributes: m, listeners: h, setNodeRef: g, transform: _, transition: v, isDragging: y } = P({ id: e.id }), b = {
		transform: I.Transform.toString(_),
		transition: v,
		opacity: y ? .5 : 1
	};
	return /* @__PURE__ */ C("div", {
		ref: g,
		style: b,
		"data-testid": `wizard-page-${e.id}`,
		children: /* @__PURE__ */ w("div", {
			className: o("bg-surface border rounded-[10px] p-4 mb-3", r ? "bg-accent-bg border-accent-border" : "border-border"),
			children: [/* @__PURE__ */ w("div", {
				className: "flex items-center gap-2 mb-2.5",
				children: [
					/* @__PURE__ */ C("button", {
						type: "button",
						"data-testid": `page-drag-handle-${e.id}`,
						...m,
						...h,
						className: "cursor-grab px-1 py-0.5 text-sm text-text-tertiary border-none bg-transparent select-none touch-none",
						title: "Drag to reorder pages",
						children: "⋮⋮"
					}),
					/* @__PURE__ */ C("button", {
						type: "button",
						"data-testid": `page-up-${e.id}`,
						disabled: t === 0,
						onClick: () => a(e.id, -1),
						className: o("px-1.5 py-0.5 text-[11px] font-semibold rounded-[7px] font-inherit border-none bg-transparent", t === 0 ? "text-neutral opacity-50 cursor-not-allowed" : "text-neutral cursor-pointer"),
						children: "▲"
					}),
					/* @__PURE__ */ C("button", {
						type: "button",
						"data-testid": `page-down-${e.id}`,
						disabled: t === n - 1,
						onClick: () => a(e.id, 1),
						className: o("px-1.5 py-0.5 text-[11px] font-semibold rounded-[7px] font-inherit border-none bg-transparent", t === n - 1 ? "text-neutral opacity-50 cursor-not-allowed" : "text-neutral cursor-pointer"),
						children: "▼"
					}),
					/* @__PURE__ */ w("span", {
						className: "text-xs font-semibold text-text-tertiary min-w-14",
						children: ["Page ", t + 1]
					}),
					/* @__PURE__ */ C(l, {
						"aria-label": `Page ${t + 1} title`,
						"data-testid": `page-title-${e.id}`,
						size: "sm",
						className: "flex-1",
						value: e.title ?? "",
						placeholder: `Page ${t + 1}`,
						onChange: (t) => c(e.id, t.target.value),
						onFocus: () => i(e.id)
					}),
					/* @__PURE__ */ C("button", {
						type: "button",
						"data-testid": `page-remove-${e.id}`,
						disabled: n <= 1,
						onClick: () => s(e.id),
						className: o("px-2 py-0.5 text-[13px] font-semibold rounded-[7px] font-inherit border-none bg-transparent text-danger-fg", n <= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"),
						title: "Remove page (sections move to first page)",
						children: "✕"
					})
				]
			}), e.sectionIds.length === 0 ? /* @__PURE__ */ C("div", {
				"data-testid": `page-empty-${e.id}`,
				className: "py-3 px-2 text-text-tertiary text-xs italic",
				children: "No sections on this page yet — click the page header to make it active, then pick a section type."
			}) : /* @__PURE__ */ C(j, {
				items: e.sectionIds,
				strategy: F,
				children: /* @__PURE__ */ C("div", {
					"data-testid": `page-sections-${e.id}`,
					children: e.sectionIds.map((t, n) => d.get(t) ? /* @__PURE__ */ C(U, {
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
function U({ sectionId: e, page: t, idx: n, pages: r, renderRow: i, moveSectionToPage: a }) {
	let { attributes: o, listeners: s, setNodeRef: c, transform: l, transition: u, isDragging: f } = P({ id: e }), p = {
		transform: I.Transform.toString(l),
		transition: u,
		opacity: f ? .4 : 1
	};
	return /* @__PURE__ */ w("div", {
		ref: c,
		style: p,
		className: "flex items-center gap-1.5",
		children: [
			/* @__PURE__ */ C("button", {
				type: "button",
				"data-testid": `section-drag-handle-${e}`,
				...o,
				...s,
				className: "cursor-grab px-1 py-0.5 text-sm text-text-tertiary border-none bg-transparent select-none touch-none shrink-0",
				title: "Drag to reorder sections (or drop on another page)",
				children: "⋮⋮"
			}),
			/* @__PURE__ */ C("div", {
				className: "flex-1",
				children: i(e, t, n)
			}),
			r.length > 1 && /* @__PURE__ */ C(d, {
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
function W({ fields: t, setFields: r, pages: i, setPages: a, pageConfig: o, setPageConfig: s }) {
	let [c, l] = x(i[0]?.id ?? "page-default");
	_(() => {
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
	}, p = (e) => {
		r(t.filter((t) => t.id !== e)), a(i.map((t) => ({
			...t,
			sectionIds: t.sectionIds.filter((t) => t !== e)
		})));
	}, m = (e, t, n) => {
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
	}, h = (e, t, n) => {
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
	}, v = () => {
		let e = `page-${typeof crypto < "u" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2, 10)}`;
		a([...i, {
			id: e,
			sectionIds: []
		}]), l(e);
	}, y = (e, t) => {
		a(i.map((n) => n.id === e ? {
			...n,
			title: t || void 0
		} : n));
	}, b = (e) => {
		if (i.length <= 1) return;
		let t = i.find((t) => t.id === e)?.sectionIds ?? [], n = i.filter((t) => t.id !== e);
		t.length > 0 && n.length > 0 && (n[0] = {
			...n[0],
			sectionIds: [...n[0].sectionIds, ...t]
		}), a(n), c === e && l(n[0]?.id ?? "");
	}, S = new Map(t.map((e) => [e.id, e])), P = i.length === 1, I = (e) => {
		if (i.some((t) => t.id === e)) return e;
		for (let t of i) if (t.sectionIds.includes(e)) return t.id;
	}, L = A(k(D, { activationConstraint: { distance: 5 } }), k(E, { coordinateGetter: N })), R = (e) => {
		let { active: t, over: n } = e;
		if (!n) return;
		let r = String(t.id), o = String(n.id), s = I(r), c = I(o);
		!s || !c || s !== c && (i.some((e) => e.id === r) || a(i.map((e) => e.id === s ? {
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
			e !== -1 && t !== -1 && e !== t && a(M(i, e, t));
			return;
		}
		let s = I(r);
		if (!s) return;
		let c = i.find((e) => e.id === s);
		if (!c) return;
		let l = c.sectionIds.indexOf(r), u = c.sectionIds.indexOf(o);
		l !== -1 && u !== -1 && l !== u && a(i.map((e) => e.id === s ? {
			...e,
			sectionIds: M(e.sectionIds, l, u)
		} : e));
	}, V = (e, t, n) => {
		let r = S.get(e);
		return r ? /* @__PURE__ */ C(B, {
			field: r,
			index: n,
			total: t.sectionIds.length,
			onRename: (e) => d(r.id, { name: e }),
			onChangeType: (e) => d(r.id, {
				sectionType: e,
				rendererOverrides: {}
			}),
			onRemove: () => p(r.id),
			onMoveUp: () => m(t.id, r.id, -1),
			onMoveDown: () => m(t.id, r.id, 1),
			onToggleRequired: () => d(r.id, { required: !r.required }),
			onToggleCollapsed: () => d(r.id, { defaultCollapsed: !r.defaultCollapsed })
		}, r.id) : null;
	};
	return /* @__PURE__ */ w("div", {
		className: "flex gap-5 items-start",
		children: [/* @__PURE__ */ w("div", {
			className: "flex-1 min-w-0",
			children: [
				/* @__PURE__ */ w("div", {
					className: "text-xs font-semibold text-text-primary mb-2.5 tracking-wide",
					children: ["SECTIONS ", t.length > 0 && /* @__PURE__ */ w("span", {
						className: "text-primary",
						children: [
							"(",
							t.length,
							P ? "" : ` across ${i.length} pages`,
							")"
						]
					})]
				}),
				P ? t.length === 0 ? /* @__PURE__ */ w("div", {
					className: "bg-surface border border-dashed border-border rounded-[10px] text-center py-8 px-4 text-text-tertiary text-[13px]",
					children: [/* @__PURE__ */ C("div", {
						className: "text-[28px] mb-2",
						children: "📋"
					}), "No sections yet — pick a section type →"]
				}) : /* @__PURE__ */ C("div", {
					"data-testid": "fields-list",
					children: i[0].sectionIds.map((e, t) => V(e, i[0], t))
				}) : /* @__PURE__ */ C(T, {
					sensors: L,
					collisionDetection: O,
					onDragOver: R,
					onDragEnd: z,
					children: /* @__PURE__ */ C(j, {
						items: i.map((e) => e.id),
						strategy: F,
						children: i.map((e, t) => /* @__PURE__ */ C(H, {
							page: e,
							pageIdx: t,
							totalPages: i.length,
							isActive: e.id === c,
							setActivePageId: l,
							movePage: g,
							removePage: b,
							renamePage: y,
							pages: i,
							fieldsById: S,
							renderRow: V,
							moveSectionToPage: h
						}, e.id))
					})
				}),
				/* @__PURE__ */ C("button", {
					type: "button",
					"data-testid": "add-page",
					onClick: v,
					className: "mt-2 text-xs px-3 py-1.5 font-semibold rounded-md font-inherit border border-dashed border-accent-border bg-transparent text-primary cursor-pointer",
					children: "+ Add Page"
				}),
				i.length > 1 && /* @__PURE__ */ C("div", {
					"data-testid": "page-config-toc",
					className: "mt-4 p-2.5 bg-surface-panel rounded-md text-[13px]",
					children: /* @__PURE__ */ w("label", {
						className: "flex items-center gap-2 cursor-pointer",
						children: [/* @__PURE__ */ C(f, {
							checked: o.showTableOfContents,
							onChange: (e) => s({
								...o,
								showTableOfContents: e
							})
						}), /* @__PURE__ */ C("span", { children: "Show table of contents (multi-page documents only)" })]
					})
				})
			]
		}), /* @__PURE__ */ w("div", {
			className: "w-[220px] shrink-0",
			children: [/* @__PURE__ */ C("div", {
				className: "text-xs font-semibold text-text-primary mb-2.5 tracking-wide",
				children: "SECTION TYPES"
			}), /* @__PURE__ */ C("div", {
				className: "flex flex-col gap-1.5",
				children: e().map((e) => /* @__PURE__ */ w("button", {
					"data-testid": `add-field-${e.type}`,
					type: "button",
					onClick: () => u(e.type),
					className: "flex items-center gap-2.5 py-2.5 px-3 rounded-lg w-full bg-surface border border-border cursor-pointer text-left font-inherit transition-colors hover:border-accent-border hover:bg-accent-bg",
					children: [/* @__PURE__ */ C("span", {
						className: "text-xl shrink-0",
						children: e.icon
					}), /* @__PURE__ */ w("div", { children: [/* @__PURE__ */ C("div", {
						className: "text-[13px] font-semibold text-text-primary",
						children: e.label
					}), /* @__PURE__ */ C("div", {
						className: "text-[11px] text-text-tertiary mt-px",
						children: e.description
					})] })]
				}, e.type))
			})]
		})]
	});
}
function G({ field: e, mode: n, onToggleHidden: r, onOverrideChange: i }) {
	let a = (e.hiddenInModes ?? []).includes(n), s = t(e.sectionType), c = s?.rendererKeys[n] ?? [], l = (e.rendererOverrides ?? {})[n] ?? c[0] ?? "";
	return /* @__PURE__ */ C("td", {
		className: "p-[10px_12px] align-top",
		children: /* @__PURE__ */ w("div", {
			className: "flex flex-col gap-1.5",
			children: [
				/* @__PURE__ */ w("label", {
					className: "flex items-center gap-1.5 cursor-pointer select-none",
					children: [/* @__PURE__ */ C(f, {
						"data-testid": `visibility-${e.id}-${n}`,
						checked: !a,
						onChange: r
					}), /* @__PURE__ */ C("span", {
						className: o("text-xs", a ? "text-text-tertiary" : "text-text-primary"),
						children: a ? "Hidden" : "Visible"
					})]
				}),
				!a && c.length > 0 && /* @__PURE__ */ C(d, {
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
				!a && c.length === 0 && /* @__PURE__ */ C("span", {
					className: "text-[11px] text-text-tertiary",
					children: "Default renderer"
				})
			]
		})
	});
}
function K({ fields: e, setFields: n }) {
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
	return e.length === 0 ? /* @__PURE__ */ C("div", {
		className: "bg-surface border border-border rounded-[10px] text-center py-10 px-4 text-text-tertiary",
		children: "No fields defined — go back to Step 2 and add some fields first."
	}) : /* @__PURE__ */ w("div", {
		className: "overflow-x-auto",
		children: [/* @__PURE__ */ C("p", {
			className: "text-[13px] text-neutral mb-4",
			children: "Configure which view modes each field appears in and which renderer to use."
		}), /* @__PURE__ */ w("table", {
			className: "w-full border-collapse text-[13px]",
			children: [/* @__PURE__ */ C("thead", { children: /* @__PURE__ */ w("tr", {
				className: "bg-surface-panel",
				children: [/* @__PURE__ */ C("th", {
					className: "p-[10px_12px] text-left font-semibold text-text-primary border-b-2 border-border whitespace-nowrap",
					children: "Field"
				}), r.map((e) => /* @__PURE__ */ C("th", {
					className: "p-[10px_12px] text-left font-semibold text-text-primary border-b-2 border-border min-w-[130px]",
					children: i[e]
				}, e))]
			}) }), /* @__PURE__ */ C("tbody", { children: e.map((e, n) => {
				let i = t(e.sectionType);
				return /* @__PURE__ */ w("tr", {
					className: o("border-b border-border-subtle", n % 2 == 0 ? "bg-surface" : "bg-surface-inset"),
					children: [/* @__PURE__ */ C("td", {
						className: "p-[10px_12px] align-middle",
						children: /* @__PURE__ */ w("div", {
							className: "flex items-center gap-[7px]",
							children: [
								/* @__PURE__ */ C("span", { children: i?.icon }),
								/* @__PURE__ */ C("span", {
									className: "font-medium text-text-primary",
									children: e.name
								}),
								e.required && /* @__PURE__ */ C("span", {
									className: "text-[10px] bg-accent-bg text-accent-fg px-[5px] py-px rounded",
									children: "required"
								})
							]
						})
					}), r.map((t) => /* @__PURE__ */ C(G, {
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
function q({ initialType: e, onSave: t, onCancel: n, idToken: a, onExportSchema: o }) {
	let [s, c] = x(e ? 2 : 1), [l, u] = x(e?.name ?? ""), [d, f] = x(e?.description ?? ""), p = e?.icon ?? "📄", [m, h] = x(e?.fields ?? []), [g, _] = x(() => e ? i(e) : [{
		id: "page-default",
		sectionIds: []
	}]), [v, y] = x(() => e ? r(e) : { showTableOfContents: !1 }), [b, S] = x(""), [T, E] = x(""), D = () => s !== 1 || l.trim().length > 0, O = () => {
		if (s === 1 && !l.trim()) {
			S("Name is required");
			return;
		}
		S(""), s < 3 ? c((e) => e + 1) : k();
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
	return /* @__PURE__ */ w("div", {
		className: "flex flex-col h-full",
		children: [
			/* @__PURE__ */ C(R, {
				step: s,
				total: 3
			}),
			/* @__PURE__ */ w("div", {
				className: "flex-1 overflow-y-auto pr-1",
				children: [
					s === 1 && /* @__PURE__ */ C(V, {
						name: l,
						setName: (e) => {
							u(e), e.trim() && S("");
						},
						description: d,
						setDescription: f
					}),
					s === 2 && /* @__PURE__ */ C(W, {
						fields: m,
						setFields: h,
						pages: g,
						setPages: _,
						pageConfig: v,
						setPageConfig: y
					}),
					s === 3 && /* @__PURE__ */ C(K, {
						fields: m,
						setFields: h
					}),
					b && /* @__PURE__ */ C("div", {
						className: "text-danger-fg text-[13px] mt-2",
						children: b
					})
				]
			}),
			/* @__PURE__ */ C(z, {
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
//#region src/components/doc-types/cookbooks/CookbookPicker.tsx
function J(e) {
	return e.toLowerCase().replace(/[^a-z]/g, "-");
}
function Y({ cookbook: e, onPick: t, actionLabel: n, busy: r, cardPrefix: i, layout: a }) {
	return /* @__PURE__ */ w("div", {
		"data-testid": `${i}-card-${e.id}`,
		className: o("flex flex-col gap-2 min-h-[200px] p-3.5 bg-surface border border-border rounded-[10px] font-inherit", a === "fixed" && "w-[220px]"),
		children: [
			/* @__PURE__ */ w("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ C("span", {
					className: "text-2xl",
					"aria-hidden": !0,
					children: e.icon
				}), /* @__PURE__ */ C("div", {
					className: "text-sm font-bold text-text-primary overflow-hidden text-ellipsis",
					children: e.name
				})]
			}),
			/* @__PURE__ */ C("div", {
				className: "text-[11px] text-text-tertiary flex gap-2",
				children: /* @__PURE__ */ C("span", { children: e.category })
			}),
			/* @__PURE__ */ C("div", {
				className: "text-xs text-text-secondary leading-[1.4] flex-1",
				children: e.description
			}),
			e.tags.length > 0 && /* @__PURE__ */ C("div", {
				className: "flex flex-wrap gap-1",
				children: e.tags.map((e) => /* @__PURE__ */ C("span", {
					className: "text-[10px] font-semibold py-0.5 px-1.5 rounded bg-surface-hover text-text-secondary lowercase",
					children: e
				}, e))
			}),
			/* @__PURE__ */ C("button", {
				type: "button",
				"data-testid": `${i}-use-${e.id}`,
				onClick: () => t(e),
				disabled: r,
				className: o("mt-auto py-1.5 px-2.5 text-xs font-semibold bg-primary text-white border-none rounded-md font-inherit", r ? "opacity-60 cursor-not-allowed" : "cursor-pointer"),
				children: n
			})
		]
	});
}
function X({ onPick: e, busy: t = !1, actionLabel: n = "Install", autoFocusSearch: r = !1, idPrefix: i = "cookbooks", cardPrefix: a = "cookbook", layout: s = "fixed", gridHeightClassName: c = "max-h-[60vh]" }) {
	let [u, d] = x(""), [f, p] = x("All"), g = b(null);
	_(() => {
		if (!r) return;
		let e = setTimeout(() => g.current?.focus(), 30);
		return () => clearTimeout(e);
	}, [r]);
	let v = y(() => h(u, f), [u, f]);
	return /* @__PURE__ */ w(S, { children: [
		/* @__PURE__ */ w("div", {
			role: "group",
			"aria-label": "Filter by category",
			className: "flex flex-wrap gap-1.5 mb-2.5",
			children: [/* @__PURE__ */ C("button", {
				type: "button",
				"data-testid": `${a}-cat-all`,
				"aria-pressed": f === "All",
				onClick: () => p("All"),
				className: o("py-1 px-2.5 text-[11px] font-semibold rounded-xl border-none cursor-pointer font-inherit", f === "All" ? "bg-primary text-white" : "bg-surface-hover text-text-secondary"),
				children: "All"
			}), m.map((e) => /* @__PURE__ */ C("button", {
				type: "button",
				"data-testid": `${a}-cat-${J(e)}`,
				"aria-pressed": f === e,
				onClick: () => p(e),
				className: o("py-1 px-2.5 text-[11px] font-semibold rounded-xl border-none cursor-pointer font-inherit", f === e ? "bg-primary text-white" : "bg-surface-hover text-text-secondary"),
				children: e
			}, e))]
		}),
		/* @__PURE__ */ C(l, {
			ref: g,
			type: "search",
			"data-testid": `${i}-search`,
			"aria-label": "Search cookbooks",
			placeholder: "Search cookbooks...",
			value: u,
			onChange: (e) => d(e.target.value),
			onKeyDown: (n) => {
				n.key === "Enter" && !t && v.length > 0 && (n.preventDefault(), e(v[0]));
			},
			className: "mb-3.5"
		}),
		v.length === 0 ? /* @__PURE__ */ w("div", {
			"data-testid": `${i}-empty`,
			className: "text-center py-8 text-[13px] text-text-tertiary",
			children: [
				"No cookbooks match \"",
				u,
				"\"."
			]
		}) : /* @__PURE__ */ C("div", {
			"data-testid": `${i}-grid`,
			className: o("grid gap-3 overflow-y-auto p-1", s === "fixed" ? "grid-cols-[repeat(3,220px)] justify-center" : "grid-cols-[repeat(auto-fill,minmax(210px,1fr))]", c),
			children: v.map((r) => /* @__PURE__ */ C(Y, {
				cookbook: r,
				onPick: e,
				actionLabel: n,
				busy: t,
				cardPrefix: a,
				layout: s
			}, r.id))
		})
	] });
}
//#endregion
//#region src/components/doc-types/CookbooksModal.tsx
function Z({ open: e, onClose: t, onCreated: n, createType: r }) {
	let [i, a] = x(!1), [o, c] = x(null);
	return _(() => {
		e && c(null);
	}, [e]), /* @__PURE__ */ w(s, {
		open: e,
		onClose: t,
		title: "Document type cookbooks",
		maxWidth: 800,
		backdropTestId: "cookbooks-modal",
		rawChildren: !0,
		children: [
			/* @__PURE__ */ C("div", {
				className: "text-[13px] text-text-secondary mb-3",
				children: "Install a prebuilt document type. You can customize the fields after installing."
			}),
			o && /* @__PURE__ */ w("div", {
				"data-testid": "cookbooks-save-error",
				role: "alert",
				className: "mb-3 rounded border border-danger-border bg-danger-bg px-3 py-2 text-[13px] text-danger-fg",
				children: ["Couldn’t create that type: ", o]
			}),
			/* @__PURE__ */ C(X, {
				onPick: async (e) => {
					if (!i) {
						a(!0), c(null);
						try {
							let i = await r(e.build());
							if (i.status === "rejected") {
								c(i.error);
								return;
							}
							t(), n(i.type.id);
						} catch (e) {
							c(e instanceof Error ? e.message : String(e));
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
function Q({ typeName: e, onConfirm: t, onCancel: n }) {
	return /* @__PURE__ */ w(s, {
		open: !0,
		onClose: n,
		maxWidth: 380,
		backdropTestId: "delete-modal",
		footer: /* @__PURE__ */ w(S, { children: [/* @__PURE__ */ C("button", {
			"data-testid": "cancel-delete",
			onClick: n,
			className: "py-[7px] px-[18px] text-[13px] font-semibold bg-surface border border-border-field rounded-[7px] cursor-pointer font-inherit",
			children: "Cancel"
		}), /* @__PURE__ */ C("button", {
			"data-testid": "confirm-delete",
			onClick: t,
			className: "py-[7px] px-[18px] text-[13px] font-semibold bg-danger text-white border-none rounded-[7px] cursor-pointer font-inherit",
			children: "Delete"
		})] }),
		children: [/* @__PURE__ */ C("div", {
			className: "text-base font-semibold text-text-primary mb-2.5",
			children: "Delete document type?"
		}), /* @__PURE__ */ w("p", {
			className: "text-[13px] text-neutral m-0",
			children: [/* @__PURE__ */ w("strong", { children: [
				"\"",
				e,
				"\""
			] }), " will be permanently removed. Documents already created from this type are unaffected."]
		})]
	});
}
function $({ type: e, active: t, onSelect: n, onDeleteRequest: r }) {
	return /* @__PURE__ */ w("div", {
		"data-testid": `type-item-${e.id}`,
		className: o("flex items-center gap-2 py-2 px-2.5 rounded-[7px] mb-0.5 transition-colors", t ? "bg-accent-bg border border-accent-border" : "bg-transparent border border-transparent"),
		children: [
			/* @__PURE__ */ C("span", {
				className: "text-lg shrink-0",
				children: e.icon
			}),
			/* @__PURE__ */ w("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ C("div", {
					className: "text-[13px] font-medium text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
					children: e.name
				}), /* @__PURE__ */ w("div", {
					className: "text-[11px] text-text-tertiary",
					children: [
						e.fields.length,
						" field",
						e.fields.length === 1 ? "" : "s"
					]
				})]
			}),
			/* @__PURE__ */ C("button", {
				"data-testid": `edit-type-${e.id}`,
				onClick: n,
				title: "Edit type",
				className: o("border border-transparent cursor-pointer text-xs px-2 py-[3px] shrink-0 leading-none rounded font-semibold font-inherit hover:bg-accent-bg hover:text-accent-fg", t ? "bg-accent-border text-accent-fg" : "bg-transparent text-text-tertiary"),
				children: "Edit"
			}),
			/* @__PURE__ */ C("button", {
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
function ee({ idToken: e, onExportSchema: t } = {}) {
	let { types: n, source: r, error: i, createType: s, updateType: l, deleteType: u } = a({ idToken: e }), [d, f] = x("idle"), [p, m] = x(null), [h, g] = x(null), [_, v] = x(!1), [y, b] = x(!1), [S, T] = x(null), E = p ? n.find((e) => e.id === p) : void 0, D = () => {
		m(null), f("create"), T(null);
	}, O = (e) => {
		m(e.id), f("edit"), T(null);
	}, k = async (e) => {
		let t = d === "edit" && p ? "updated" : "created", n = d === "edit" && p ? await l(p, e) : await s(e);
		if (n.status === "rejected") {
			T({
				text: `"${e.name}" NOT saved — server rejected it (${n.error})`,
				key: Date.now(),
				tone: "error"
			});
			return;
		}
		T(n.status === "synced" ? {
			text: `"${e.name}" ${t} — synced`,
			key: Date.now(),
			tone: "success"
		} : {
			text: `"${e.name}" ${t} — offline (saved locally, server unreachable)`,
			key: Date.now(),
			tone: "offline"
		}), f("idle"), m(null);
	}, A = () => {
		f("idle"), m(null);
	}, j = (e) => {
		g(e);
	}, M = async () => {
		if (!h) return;
		let e = n.find((e) => e.id === h), t = await u(h);
		if (t.status === "rejected") {
			T({
				text: `"${e?.name ?? h}" NOT deleted — server rejected it (${t.error})`,
				key: Date.now(),
				tone: "error"
			}), g(null);
			return;
		}
		p === h && (f("idle"), m(null)), g(null);
	}, N = () => {
		g(null);
	}, P = (e) => {
		m(e), f("edit"), T(null);
	}, F = async (e) => {
		if (!y) {
			b(!0), T(null);
			try {
				let t = e.build(), n = await s(t);
				T(n.status === "rejected" ? {
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
				T({
					text: `"${e.name}" NOT added — ${t instanceof Error ? t.message : String(t)}`,
					key: Date.now(),
					tone: "error"
				});
			} finally {
				b(!1);
			}
		}
	}, I = h ? n.find((e) => e.id === h) : null;
	return /* @__PURE__ */ w("div", {
		className: "flex h-full overflow-hidden font-inherit",
		children: [
			/* @__PURE__ */ w("div", {
				className: "w-[264px] shrink-0 border-r border-border flex flex-col overflow-hidden bg-surface-inset",
				children: [
					/* @__PURE__ */ w("div", {
						className: "py-3.5 px-4 border-b border-border flex flex-col gap-2.5",
						children: [/* @__PURE__ */ C("span", {
							className: "text-[13px] font-bold text-text-primary",
							children: "Document Types"
						}), /* @__PURE__ */ w("div", {
							className: "flex gap-1.5",
							children: [/* @__PURE__ */ C("button", {
								"data-testid": "cookbooks-btn",
								onClick: () => v(!0),
								title: "Browse the ready-made document types",
								className: "py-[5px] px-3 text-xs font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-inherit whitespace-nowrap",
								children: "Known types"
							}), /* @__PURE__ */ C("button", {
								"data-testid": "create-type-btn",
								onClick: D,
								title: "Build a document type field by field",
								className: "py-[5px] px-3 text-xs font-medium bg-transparent text-text-secondary border border-border rounded-md cursor-pointer font-inherit whitespace-nowrap",
								children: "From scratch"
							})]
						})]
					}),
					/* @__PURE__ */ C("div", {
						className: "flex-1 overflow-y-auto p-2",
						"data-testid": "type-list",
						children: n.length === 0 ? /* @__PURE__ */ w("div", {
							className: "py-8 px-4 flex flex-col items-center gap-2",
							children: [/* @__PURE__ */ C("div", {
								className: "text-text-tertiary text-[13px]",
								children: "No types yet."
							}), /* @__PURE__ */ C("button", {
								"data-testid": "empty-browse-types-btn",
								onClick: () => v(!0),
								className: "bg-transparent border-none text-primary text-[13px] font-medium cursor-pointer py-1 px-2 font-inherit",
								children: "Browse known types →"
							})]
						}) : n.map((e) => /* @__PURE__ */ C($, {
							type: e,
							active: p === e.id,
							onSelect: () => O(e),
							onDeleteRequest: () => j(e.id)
						}, e.id))
					}),
					r === "cache" && /* @__PURE__ */ w("div", {
						"data-testid": "types-offline-notice",
						className: "py-2 px-3.5 border-t border-warning-border bg-warning-bg text-xs text-warning-fg font-medium",
						children: [
							"⚠ Offline — showing cached types (",
							i ?? "server unreachable",
							")"
						]
					}),
					S && /* @__PURE__ */ w("div", {
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
			/* @__PURE__ */ w("div", {
				className: "flex-1 overflow-y-auto py-7 px-9",
				"data-testid": "right-panel",
				children: [d === "idle" && /* @__PURE__ */ w("div", {
					"data-testid": "known-types-panel",
					className: "flex flex-col gap-4",
					children: [/* @__PURE__ */ C(c, {
						testId: "idle-panel",
						className: "min-h-0 p-0 gap-1",
						icon: "📋",
						title: n.length > 0 ? "Select a type to edit" : "No document types yet",
						description: n.length > 0 ? "Choose a type from the list to edit its fields — or add another known type below." : "Start from a known type below. It installs as your own type, and you can change any of it afterwards.",
						action: /* @__PURE__ */ C("button", {
							"data-testid": "idle-create-btn",
							onClick: D,
							className: "px-3.5 py-2 text-[13px] font-medium bg-transparent text-text-secondary border border-border rounded-lg cursor-pointer font-inherit",
							children: "Build a type from scratch"
						})
					}), /* @__PURE__ */ w("div", {
						className: "border-t border-border pt-4",
						children: [/* @__PURE__ */ C("div", {
							className: "text-[13px] font-bold text-text-primary mb-2",
							children: "Known types"
						}), /* @__PURE__ */ C(X, {
							onPick: F,
							busy: y,
							actionLabel: "Add this type",
							idPrefix: "type-starters",
							cardPrefix: "type-starter",
							layout: "fluid",
							gridHeightClassName: "max-h-none"
						})]
					})]
				}), (d === "create" || d === "edit") && /* @__PURE__ */ C(q, {
					initialType: E,
					idToken: e,
					onSave: k,
					onCancel: A,
					onExportSchema: t
				}, p ?? "create")]
			}),
			h && I && /* @__PURE__ */ C(Q, {
				typeName: I.name,
				onConfirm: M,
				onCancel: N
			}),
			/* @__PURE__ */ C(Z, {
				open: _,
				onClose: () => v(!1),
				onCreated: P,
				createType: s
			})
		]
	});
}
//#endregion
export { m as COOKBOOK_CATEGORIES, X as CookbookPicker, Z as CookbooksModal, q as DocumentTypeWizard, ee as DocumentTypesPage, B as FieldDefinitionEditor, R as StepIndicator, z as WizardStepNavigation, p as documentTypeCookbooks, h as filterCookbooks, g as matchesCookbookQuery };
