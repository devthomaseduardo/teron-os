import { i as TSS_SERVER_FUNCTION } from "./createServerFn-aZmUlApV.mjs";
import { l as lazyRouteComponent, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-BAnxtZiy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/createSsrRpc-SZ3llWob.js
var $$splitComponentImporter = () => import("./login-BgyEjzaL.mjs");
var Route = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Entrar — TERON Studio" }, {
		name: "description",
		content: "Acesse o seu workspace TERON."
	}] }),
	validateSearch: (s) => ({ next: typeof s.next === "string" ? s.next : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
export { createSsrRpc as n, Route as t };
