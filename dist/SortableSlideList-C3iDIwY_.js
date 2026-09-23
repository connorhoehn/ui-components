import { t as e } from "./cn-DhjIN-s0.js";
import { r as t } from "./PresentationEditor-X97_Klcq.js";
import { jsx as n } from "react/jsx-runtime";
import { DndContext as r, KeyboardSensor as i, PointerSensor as a, closestCenter as o, useSensor as s, useSensors as c } from "@dnd-kit/core";
import { SortableContext as l, sortableKeyboardCoordinates as u, useSortable as d, verticalListSortingStrategy as f } from "@dnd-kit/sortable";
//#region src/components/doc-editor/presentation/SortableSlideList.tsx
function p({ item: r, index: i, total: a, selectedId: o, readOnly: s, onSelect: c, onMove: l, onDuplicate: u, onDelete: f, canDuplicate: p, testIdPrefix: m }) {
	let { attributes: h, listeners: g, setNodeRef: _, isDragging: v, isOver: y } = d({ id: r.slide.id });
	return /* @__PURE__ */ n(t, {
		slide: r.slide,
		index: i,
		total: a,
		thumbnailSvg: r.thumbnailSvg,
		selected: r.slide.id === o,
		uncited: r.uncited,
		changed: r.changed,
		readOnly: s,
		onSelect: c,
		onMove: l,
		onDuplicate: u,
		onDelete: f,
		canDuplicate: p,
		canDelete: a > 1,
		testIdPrefix: m,
		rowRef: _,
		dragging: v,
		dragHandle: /* @__PURE__ */ n("button", {
			type: "button",
			title: "Drag to reorder slides",
			"aria-label": `Reorder slide ${i + 1}`,
			"data-testid": `${m}-drag-handle-${r.slide.id}`,
			...h,
			...g,
			className: e("mt-1 shrink-0 cursor-grab select-none touch-none border-none bg-transparent px-0.5 text-[11px] leading-none text-text-tertiary", y && !v && "text-info"),
			children: "⋮⋮"
		})
	});
}
function m({ items: e, selectedId: t, readOnly: d = !1, onSelect: m, onMove: h, onDuplicate: g, onDelete: _, canDuplicate: v, testIdPrefix: y }) {
	let b = c(s(a, { activationConstraint: { distance: 5 } }), s(i, { coordinateGetter: u })), x = e.map((e) => e.slide.id), S = (e) => {
		let { active: t, over: n } = e;
		if (!n) return;
		let r = x.indexOf(String(t.id)), i = x.indexOf(String(n.id));
		r !== -1 && i !== -1 && r !== i && h(r, i);
	}, C = /* @__PURE__ */ n("ol", {
		className: "m-0 flex list-none flex-col gap-1 p-0",
		"data-testid": `${y}-list`,
		children: e.map((r, i) => /* @__PURE__ */ n(p, {
			item: r,
			index: i,
			total: e.length,
			selectedId: t,
			readOnly: d,
			onSelect: m,
			onMove: h,
			onDuplicate: g,
			onDelete: _,
			canDuplicate: v,
			testIdPrefix: y
		}, r.slide.id))
	});
	return d ? C : /* @__PURE__ */ n(r, {
		sensors: b,
		collisionDetection: o,
		onDragEnd: S,
		children: /* @__PURE__ */ n(l, {
			items: x,
			strategy: f,
			children: C
		})
	});
}
//#endregion
export { m as SortableSlideList, m as default };
