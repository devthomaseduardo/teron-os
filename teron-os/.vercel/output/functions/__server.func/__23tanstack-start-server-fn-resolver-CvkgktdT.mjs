//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-CvkgktdT.js
var manifest = {
	"1671ccb79f47d4902512efc4ee15bd5066fe06fd23ccac9eae33d49f986cca98": {
		functionName: "registerUserFn_createServerFn_handler",
		importer: () => import("./_ssr/auth-kaXsGB4n.mjs")
	},
	"1e7399ac961726409e2b89aebb9a4ad7b568ae81140b88344569fbabf0beeab8": {
		functionName: "loginUserFn_createServerFn_handler",
		importer: () => import("./_ssr/auth-kaXsGB4n.mjs")
	},
	"2247ffda656ca3d621612e8e6a320b96f3b3cd3c0b71cfa91ecea0218926b064": {
		functionName: "createMercadoPagoPixFn_createServerFn_handler",
		importer: () => import("./_ssr/api.payment-Bpzr0xcd.mjs")
	},
	"93c407dcab07e0b4d10e9662c000461e960f7aebf301e7f4c28ac76c5d0ce817": {
		functionName: "verifySessionFn_createServerFn_handler",
		importer: () => import("./_ssr/auth-kaXsGB4n.mjs")
	},
	"a547668f53ddf64526109de74976ac7c496cb70c2c0c56958a07d1c0c2599ecd": {
		functionName: "createLeadFn_createServerFn_handler",
		importer: () => import("./_ssr/api.lead-BQYbkidU.mjs")
	},
	"baef1c7e38560abc8d0e21212351c96555d68b647fd0f0a189a255fd860d4fe8": {
		functionName: "processPaymentWebhookFn_createServerFn_handler",
		importer: () => import("./_ssr/api.payment-Bpzr0xcd.mjs")
	},
	"c00304768c0b012991436b094541087a9fd31b5291bd9c159b7cd5e9c26e5c93": {
		functionName: "logoutFn_createServerFn_handler",
		importer: () => import("./_ssr/auth-kaXsGB4n.mjs")
	},
	"ce5b78001f3c0ccd36ae21b217a65162c427476dd718afb472264b7790fa5cdc": {
		functionName: "createStripeCheckoutFn_createServerFn_handler",
		importer: () => import("./_ssr/api.payment-Bpzr0xcd.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
