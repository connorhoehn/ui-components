import { l as e, t } from "./ComputeContext-D0Dg1KRp.js";
import { useMemo as n } from "react";
import { jsx as r } from "react/jsx-runtime";
//#region src/components/social/ChatLabTerminal.tsx
function i(e) {
	let t = (e) => () => Promise.reject(/* @__PURE__ */ Error(`${e} is not available from the chat lab`));
	return {
		getStatus: t("Runtime status"),
		listComputers: t("The fleet"),
		createComputer: t("Creating a computer"),
		adoptComputer: t("Adopting a computer"),
		renameComputer: t("Renaming a computer"),
		removeComputer: t("Removing a computer"),
		stopSession: t("Stopping the session"),
		runTask: t("Running a task"),
		runCommand: t("Running a command"),
		getShellUrl: () => Promise.resolve({ url: e }),
		tail: () => ({
			url: "",
			withCredentials: !1,
			headers: {}
		})
	};
}
function a({ sessionId: a, shellUrl: o, className: s, "data-testid": c = "chat-lab-terminal" }) {
	let l = n(() => i(o), [o]);
	return /* @__PURE__ */ r("div", {
		"data-testid": c,
		className: s ?? "flex min-h-0 flex-1 flex-col",
		children: /* @__PURE__ */ r(t, {
			client: l,
			enabled: !1,
			useFixtures: !1,
			children: /* @__PURE__ */ r(e, {
				sessionId: a,
				chrome: !1,
				fillHeight: !0,
				autoConnect: !0
			})
		})
	});
}
//#endregion
export { a as ChatLabTerminal, a as default };
