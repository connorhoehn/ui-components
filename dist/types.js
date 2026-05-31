import { b as r } from "./registry-D1eP6Kby.js";
import { C as f, i as g } from "./fieldType-BJfRz7mO.js";
const i = [
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
    sectionIds: e.fields.map((a) => a.id)
  }];
}
function t(e) {
  return e.pageConfig ?? { showTableOfContents: !1 };
}
function o(e) {
  const a = r(e);
  return {
    id: crypto.randomUUID(),
    name: a?.label ?? e,
    sectionType: e,
    required: !1,
    defaultCollapsed: !1,
    placeholder: "",
    hiddenInModes: [],
    rendererOverrides: {}
  };
}
export {
  f as CUSTOM_FIELD_TYPE_STORAGE_KEY,
  i as DOCUMENT_TYPE_ICONS,
  t as getPageConfig,
  n as getPagesView,
  g as isValidCustomFieldType,
  o as makeEmptyField
};
