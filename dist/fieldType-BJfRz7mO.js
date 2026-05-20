const n = "ws_field_types_v1";
function i(e) {
  if (typeof e != "object" || e === null) return !1;
  const t = e;
  return typeof t.id == "string" && t.id.length > 0 && typeof t.name == "string" && t.name.length > 0 && typeof t.icon == "string" && typeof t.description == "string" && typeof t.baseType == "string" && t.baseType.length > 0 && typeof t.createdAt == "string" && typeof t.updatedAt == "string";
}
export {
  n as C,
  i
};
