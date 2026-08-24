//#region src/lib/activationKey.ts
function e(e) {
	return e === "Enter" || e === " " || e === "Spacebar";
}
function t(t) {
	return (n) => {
		e(n.key) && (n.preventDefault(), t(n));
	};
}
//#endregion
export { t };
