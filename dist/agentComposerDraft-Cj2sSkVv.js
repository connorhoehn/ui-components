//#region src/components/social/agentComposerDraft.ts
function e(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function t(t) {
	return {
		html: t ? `<p>${e(t).replace(/\n/g, "<br>")}</p>` : "",
		files: []
	};
}
//#endregion
export { t };
