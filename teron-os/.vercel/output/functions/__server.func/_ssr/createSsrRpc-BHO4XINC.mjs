import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-CvkgktdT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/createSsrRpc-BHO4XINC.js
var $$splitComponentImporter = () => import("./login-CRawPYn-.mjs");
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
