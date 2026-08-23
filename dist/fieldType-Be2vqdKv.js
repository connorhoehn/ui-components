//#region src/types/fieldType.ts
var e = "ws_field_types_v1";
function t(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return typeof t.id == "string" && t.id.length > 0 && typeof t.name == "string" && t.name.length > 0 && typeof t.icon == "string" && typeof t.description == "string" && typeof t.baseType == "string" && t.baseType.length > 0 && typeof t.createdAt == "string" && typeof t.updatedAt == "string";
}
//#endregion
export { t as n, e as t };
