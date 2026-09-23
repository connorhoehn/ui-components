import { useCallback as e, useEffect as t, useLayoutEffect as n, useRef as r } from "react";
import { jsx as i } from "react/jsx-runtime";
import { DndContext as a, PointerSensor as o, closestCenter as s, useDroppable as c, useSensor as l, useSensors as u } from "@dnd-kit/core";
import { SortableContext as d, useSortable as f, verticalListSortingStrategy as p } from "@dnd-kit/sortable";
//#region src/components/shared/GroupedListSortable.tsx
function m({ ids: e, onDrop: t, children: n }) {
	let r = u(l(o, { activationConstraint: { distance: 5 } }));
	return /* @__PURE__ */ i(a, {
		sensors: r,
		collisionDetection: s,
		onDragEnd: (e) => {
			e.over && t(String(e.active.id), String(e.over.id));
		},
		children: /* @__PURE__ */ i(d, {
			items: e,
			strategy: p,
			children: n
		})
	});
}
function h({ id: a, onStateChange: o, children: s, ...c }) {
	let { listeners: l, setNodeRef: u, setActivatorNodeRef: d, isDragging: p, isOver: m } = f({ id: a }), h = r(null), g = e((e) => {
		h.current = e, d(e);
	}, [d]);
	return n(() => (u(h.current?.closest("[data-row-id]") ?? null), () => u(null)), [u]), t(() => {
		o({
			dragging: p,
			over: m
		});
	}, [
		p,
		m,
		o
	]), /* @__PURE__ */ i("button", {
		type: "button",
		...c,
		...l,
		ref: g,
		tabIndex: -1,
		children: s
	});
}
function g({ id: e, getNode: r, onOverChange: i }) {
	let { setNodeRef: a, isOver: o } = c({ id: e });
	return n(() => (a(r()), () => a(null)), [a, e]), t(() => {
		i(o);
	}, [o]), null;
}
//#endregion
export { g as GroupDropTarget, m as GroupedListDndRoot, h as SortableHandle };
