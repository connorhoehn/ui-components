import { t as e } from "./registry-DbX3MVAA.js";
//#region src/types/documentType.ts
var t = [
	"📄",
	"📋",
	"📊",
	"📈",
	"📉",
	"🗒️",
	"📁",
	"🗂️",
	"📌",
	"📎",
	"🔖",
	"🏃",
	"🎯",
	"🚀",
	"⚡",
	"🔥",
	"💡",
	"🛠️",
	"⚙️",
	"🔍",
	"🧪",
	"🤝",
	"💼",
	"🌟",
	"✨"
];
function n(e) {
	return e.pages && e.pages.length > 0 ? e.pages : [{
		id: "page-default",
		title: void 0,
		sectionIds: e.fields.map((e) => e.id)
	}];
}
function r(e) {
	return e.pageConfig ?? { showTableOfContents: !1 };
}
function i(t) {
	let n = e(t);
	return {
		id: crypto.randomUUID(),
		name: n?.label ?? t,
		sectionType: t,
		required: !1,
		defaultCollapsed: !1,
		placeholder: "",
		hiddenInModes: [],
		rendererOverrides: {}
	};
}
//#endregion
export { i, r as n, n as r, t };
