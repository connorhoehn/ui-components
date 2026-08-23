import { t as e } from "./registry-DbX3MVAA.js";
import { n as t, t as n } from "./fieldType-Be2vqdKv.js";
//#region src/types/documentType.ts
var r = [
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
function i(e) {
	return e.pages && e.pages.length > 0 ? e.pages : [{
		id: "page-default",
		title: void 0,
		sectionIds: e.fields.map((e) => e.id)
	}];
}
function a(e) {
	return e.pageConfig ?? { showTableOfContents: !1 };
}
function o(t) {
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
export { n as CUSTOM_FIELD_TYPE_STORAGE_KEY, r as DOCUMENT_TYPE_ICONS, a as getPageConfig, i as getPagesView, t as isValidCustomFieldType, o as makeEmptyField };
