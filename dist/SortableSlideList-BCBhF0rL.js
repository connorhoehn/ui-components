import { t as e } from "./cn-DhjIN-s0.js";
import { z as t } from "./PresentationEditor-61tQICho.js";
import { jsx as n } from "react/jsx-runtime";
import { DndContext as r, KeyboardSensor as i, PointerSensor as a, closestCenter as o, useSensor as s, useSensors as c } from "@dnd-kit/core";
import { SortableContext as l, sortableKeyboardCoordinates as u, useSortable as d, verticalListSortingStrategy as f } from "@dnd-kit/sortable";
//#region src/components/doc-editor/presentation/SortableSlideList.tsx
function p({ item: r, index: i, total: a, selectedId: o, readOnly: s, onSelect: c, onMove: l, onDuplicate: u, onDelete: f, canDuplicate: p, rowComponent: m = t, testIdPrefix: h }) {
	let { attributes: g, listeners: _, setNodeRef: v, isDragging: y, isOver: b } = d({ id: r.slide.id });
	return /* @__PURE__ */ n(m, {
		slide: r.slide,
		index: i,
		total: a,
		thumbnailSvg: r.thumbnailSvg,
		selected: r.slide.id === o,
		uncited: r.uncited,
		changed: r.changed,
		generating: r.generating,
		viewers: r.viewers,
		readOnly: s,
		onSelect: c,
		onMove: l,
		onDuplicate: u,
		onDelete: f,
		canDuplicate: p,
		canDelete: a > 1,
		testIdPrefix: h,
		rowRef: v,
		dragging: y,
		dragHandle: /* @__PURE__ */ n("button", {
			type: "button",
			title: "Drag to reorder slides",
			"aria-label": `Reorder slide ${i + 1}`,
			"data-testid": `${h}-drag-handle-${r.slide.id}`,
			...g,
			..._,
			className: e("mt-1 shrink-0 cursor-grab select-none touch-none border-none bg-transparent px-0.5 text-[11px] leading-none text-text-tertiary", b && !y && "text-info"),
			children: "⋮⋮"
		})
	});
}
function m({ items: t, selectedId: d, readOnly: m = !1, onSelect: h, onMove: g, onDuplicate: _, onDelete: v, canDuplicate: y, rowComponent: b, listClassName: x, testIdPrefix: S }) {
	let C = c(s(a, { activationConstraint: { distance: 5 } }), s(i, { coordinateGetter: u })), w = t.map((e) => e.slide.id), T = (e) => {
		let { active: t, over: n } = e;
		if (!n) return;
		let r = w.indexOf(String(t.id)), i = w.indexOf(String(n.id));
		r !== -1 && i !== -1 && r !== i && g(r, i);
	}, E = /* @__PURE__ */ n("ol", {
		className: e("m-0 flex list-none flex-col gap-1 p-0", x),
		"data-testid": `${S}-list`,
		children: t.map((e, r) => /* @__PURE__ */ n(p, {
			item: e,
			index: r,
			total: t.length,
			selectedId: d,
			readOnly: m,
			onSelect: h,
			onMove: g,
			onDuplicate: _,
			onDelete: v,
			canDuplicate: y,
			...b ? { rowComponent: b } : {},
			testIdPrefix: S
		}, e.slide.id))
	});
	return m ? E : /* @__PURE__ */ n(r, {
		sensors: C,
		collisionDetection: o,
		onDragEnd: T,
		children: /* @__PURE__ */ n(l, {
			items: w,
			strategy: f,
			children: E
		})
	});
}
//#endregion
export { m as SortableSlideList, m as default };
